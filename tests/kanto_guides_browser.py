"""Exercise Kanto guide cards and version-specific champion parties in Chromium."""
import json
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]
BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:5173'
OUT = ROOT / 'output/guide-review/qa'
OUT.mkdir(parents=True, exist_ok=True)
FIXTURE = json.loads((ROOT / 'tests/fixtures/kanto-parties.json').read_text(encoding='utf-8'))
results = []

with sync_playwright() as pw:
    browser = pw.chromium.launch()
    for width, height in [(1440, 1000), (390, 844), (320, 740)]:
        page = browser.new_page(viewport={'width': width, 'height': height}, reduced_motion='reduce')
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        for version, fixture in FIXTURE['versions'].items():
            page.goto(f'{BASE}/guide.html?version={version}')
            expect(page.locator('.guide-gym-card')).to_have_count(8)
            expect(page.locator('.guide-quick-nav button')).to_have_count(9)
            expect(page.locator('iframe.guide-atlas-frame')).to_have_count(1)
            card_heights = []
            for order in range(1, 9):
                page.locator(f'[data-guide-target="gym:{order}"]').click()
                detail = page.locator(f'.guide-battle-detail[data-battle-ref="gym:{order}"]')
                expect(detail).to_be_visible()
                expect(page.locator('.guide-gym-card .guide-battle-detail:visible')).to_have_count(1)
                assert f'battle=gym%3A{order}' in page.url
                expect(detail.locator('.guide-gym-strategy')).to_be_visible()
                assert detail.locator('.guide-detail-section').first.locator('h3').inner_text() == '先看打法'
                assert 1 <= detail.locator('.guide-team-row').count() <= 3
                assert detail.locator('.guide-pokemon-note').count() == 2 * detail.locator('.guide-team-row').count()
                fonts = detail.locator('.guide-strategy-summary, .guide-pokemon-note, .guide-battle-tip').evaluate_all('(nodes) => nodes.map(n => parseFloat(getComputedStyle(n).fontSize))')
                assert min(fonts) >= 16, (width, version, order, fonts)
                assert min(detail.locator('.guide-party-grid-name').evaluate_all('(nodes) => nodes.map(n => parseFloat(getComputedStyle(n).fontSize))')) >= 16
                assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), (width, version, order, 'overflow')
                card_heights.append(detail.locator('..').bounding_box()['height'])
                if order == 1:
                    detail.locator('..').screenshot(path=str(OUT / f'{version}-{width}-brock.png'))

            page.locator('[data-guide-target="league"]').click()
            for order in range(1, 5):
                detail = page.locator(f'.guide-battle-detail[data-battle-ref="eliteFour:{order}"]')
                detail.locator('..').locator('.guide-battle-toggle').click()
                expect(detail).to_be_visible()
                assert detail.locator('.guide-party-grid-row').count() == 5

            champion = page.locator('.guide-battle-detail[data-battle-ref="champion"]')
            champion.locator('..').locator('.guide-battle-toggle').click()
            expect(champion).to_be_visible()
            panels = champion.locator('.guide-variant-panel')
            expect(panels).to_have_count(3)
            assert champion.locator('.guide-opponent-detail-inner > .guide-detail-section > .guide-party-grid').count() == 0, 'misleading shared party'
            # UI order is by player starter in originals/remakes, Eeveelution in Yellow.
            keys = ['jolteon', 'flareon', 'vaporeon'] if version == 'yellow' else ['bulbasaur', 'charmander', 'squirtle']
            for i, key in enumerate(keys):
                panel = panels.nth(i)
                if panel.get_attribute('open') is None:
                    panel.locator('summary').click()
                expect(panel.locator('.guide-party-grid')).to_be_visible()
                expected = fixture['champion'][key]
                assert panel.locator('.guide-party-grid-name').all_text_contents() == [p['name'] for p in expected]
                assert panel.locator('.guide-party-grid .guide-level').all_text_contents() == [f'Lv.{p["level"]}' for p in expected]
                assert min(panel.locator('.guide-party-grid-name, .guide-league-table td').evaluate_all('(nodes) => nodes.map(n => parseFloat(getComputedStyle(n).fontSize))')) >= 16
                assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), (width, version, key, 'overflow')
                if i > 0:
                    panel.locator('summary').click()
            champion.screenshot(path=str(OUT / f'{version}-{width}-champion.png'))

            page.get_by_text('招式配置建議', exact=True).click()
            expect(page.locator('.guide-movesets')).to_be_visible()
            assert page.locator('.guide-moveset-card').count() == 5
            assert page.locator('.guide-move-row').count() == 20
            assert page.locator('.guide-move-row .type-badge').count() == 20
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), (width, version, 'moves overflow')
            page.get_by_text('進聯盟前道具準備', exact=True).click()
            expect(page.get_by_text('活力碎片', exact=True)).to_be_visible()

            # Reload and direct links must keep working after using new quick navigation.
            page.reload()
            expect(page.locator('.guide-battle-detail[data-battle-ref="champion"]')).to_be_visible()
            page.goto(f'{BASE}/guide.html?version={version}&battle=gym:3')
            expect(page.locator('.guide-battle-detail[data-battle-ref="gym:3"]')).to_be_visible()
            results.append({'version': version, 'width': width, 'gymHeights': card_heights, 'status': 'PASS'})

        # Shared-renderer fallback for an unchanged generation and expansion.
        page.select_option('#guideVersionSelect', 'gold-silver')
        expect(page.locator('.guide-quick-nav')).to_have_count(0)
        assert 'guide-page--kanto' not in page.locator('#guideContentRoot').get_attribute('class')
        page.locator('.guide-gym-card .guide-battle-toggle').first.click()
        expect(page.locator('.guide-gym-card .guide-team-row').first).to_be_visible()
        page.goto(f'{BASE}/guide.html?version=firered-leafgreen&part=sevii')
        expect(page.locator('iframe.guide-atlas-frame')).to_have_count(1)
        expect(page.locator('.guide-quick-nav')).to_have_count(0)
        assert 'guide-page--kanto' not in page.locator('#guideContentRoot').get_attribute('class')
        assert not errors, errors
        page.close()
    browser.close()

(OUT / 'browser-results.json').write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding='utf-8')
print(f'PASS: {len(results)} Kanto viewport/version combinations; 72 gym cards, 27 champion branches, league cards, deep links and shared-renderer regression')
