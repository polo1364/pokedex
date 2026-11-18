"""PokeMMO guide, maps and mocked chat: python tests/pokemmo_browser.py [base URL]."""
import json
import subprocess
import sys
from pathlib import Path
from urllib.parse import parse_qs, urlparse
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]
BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:5173'
OUT = ROOT / 'output/guide-review/pokemmo/browser'
OUT.mkdir(parents=True, exist_ok=True)
guide = json.loads(subprocess.check_output(['node', '--input-type=module', '-e',
    "import {pokemmoGuide} from './src/data/versionGuides/pokemmo/index.js';console.log(JSON.stringify(pokemmoGuide));"], cwd=ROOT, encoding='utf-8'))
atlas = json.loads((ROOT / 'public/atlas/atlas-data.json').read_text(encoding='utf-8'))
parts = [('main', guide)] + [(p['id'], p) for p in guide['expansions']]
results = []
payloads = []

def chat(route):
    payloads.append(route.request.post_data_json)
    route.fulfill(content_type='application/json', body=json.dumps({'reply': '測試回覆：已收到目前地區。'}))

def no_overflow(page, context):
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), context

with sync_playwright() as pw:
    browser = pw.chromium.launch()
    for width in [1440, 390, 320]:
        context = browser.new_context(viewport={'width': width, 'height': 900 if width == 1440 else 844}, service_workers='block')
        context.route('**/api/chat', chat)
        context.route('https://pokeapi.co/**', lambda route: route.fulfill(content_type='application/json', body='{"results":[],"count":0}'))
        page = context.new_page()
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.goto(BASE)
        expect(page.locator('.version-drawer-gen-label').last).to_have_text('線上遊戲')
        if width < 768:
            page.locator('#menuBtn').click()
        page.locator('[aria-controls="versionDrawerBody"]').click()
        page.locator('.version-drawer-link', has_text='PokeMMO').click()
        expect(page.locator('#guideVersionSelect')).to_have_value('pokemmo')
        expect(page.get_by_role('tab')).to_have_count(8)
        for part_id, part in parts:
            label = '新手入門' if part_id == 'main' else part['tabLabel']
            page.get_by_role('tab', name=label, exact=True).click()
            expect(page.get_by_role('tab', name=label, exact=True)).to_have_attribute('aria-selected', 'true')
            expect(page.locator('.guide-page-empty')).to_have_count(0)
            expect(page.locator('.guide-expansion-island')).to_have_count(len(part['sections']))
            expect(page.locator('.guide-sources a')).to_have_count(len(part['sources']))
            no_overflow(page, (width, part_id, 'page'))
            nav = page.locator('.guide-chapter-nav')
            nav.locator('summary').click()
            nav.locator('a').last.click()
            chapter_id = f'expansion-section-{guide["id"] if part_id == "main" else part_id}-{part["sections"][-1]["number"]}'
            expect(page.locator('#' + chapter_id)).to_be_in_viewport()
            page.reload()
            expect(page.locator('#' + chapter_id)).to_be_in_viewport()
            battle_list = part.get('gyms', [])
            to_test = battle_list if width == 1440 else battle_list[:1] + battle_list[-1:]
            for battle in to_test:
                ref = f'expansion:{part_id}:{battle["order"]}'
                detail = page.locator(f'[data-battle-ref="{ref}"]')
                toggle = detail.locator('..').locator('.guide-battle-toggle')
                toggle.click()
                expect(detail).to_be_visible()
                expect(detail).to_contain_text('尚未核實')
                expect(detail.locator('.guide-team-row')).not_to_have_count(0)
                no_overflow(page, (width, part_id, ref))
                toggle.click()
            if battle_list:
                ref = f'expansion:{part_id}:{battle_list[-1]["order"]}'
                page.goto(f'{BASE}/guide.html?version=pokemmo&part={part_id}&battle={ref}')
                expect(page.locator(f'[data-battle-ref="{ref}"]')).to_be_visible()
                page.reload()
                expect(page.locator(f'[data-battle-ref="{ref}"]')).to_be_visible()
            frame = page.locator('iframe.guide-atlas-frame')
            expect(frame).to_have_count(0 if part.get('mapMode') == 'none' else 1)
            if part.get('mapMode') != 'none':
                frame.scroll_into_view_if_needed()
                inner = page.frame_locator('iframe.guide-atlas-frame')
                expect(inner.locator('#version')).to_have_value('pokemmo')
                expect(inner.locator('#version option:checked')).to_have_text('PokeMMO')
                expect(inner.locator('#region option')).to_have_count(5)
                if part_id == 'main':
                    inner.locator('#region').select_option('pokemmo-unova')
                    expect(inner.locator('#title')).to_have_text('合眾')
                    inner.locator('#region').select_option('pokemmo-kanto')
                else:
                    expect(inner.locator('#region')).to_have_value('pokemmo-' + part_id)
                    m = atlas['maps']['pokemmo-' + part_id]
                    gym = next(p for p in m['locations'] if p.get('battleRef', '').endswith(':1'))
                    inner.locator('#place-select').select_option(gym['id'])
                    inner.locator('#battle-link').click()
                    assert parse_qs(urlparse(page.url).query)['part'] == [part_id]
                    expect(page.locator(f'[data-battle-ref="{gym["battleRef"]}"]')).to_be_visible()
                    # Indoor / repeated-city events have separate links at their existing anchor.
                    page.locator('iframe.guide-atlas-frame').scroll_into_view_if_needed()
                    point = next(p for p in m['locations'] if len(p.get('guideLinks', [])) >= 2)
                    inner.locator('#place-select').select_option(point['id'])
                    link = point['guideLinks'][-1]
                    inner.locator('#places a').last.click()
                    if link.get('guideSection'):
                        expect(page.locator(f'#expansion-section-{part_id}-{link["guideSection"]}')).to_be_in_viewport()
                    else:
                        expect(page.locator(f'[data-battle-ref="{link["battleRef"]}"]')).to_be_visible()
                page.locator('iframe.guide-atlas-frame').scroll_into_view_if_needed()
                inner.locator('#fit').click()
                inner.locator('#zoom').click()
                assert inner.locator('#canvas').evaluate('(n)=>n.clientWidth') == 2200
                inner.locator('#fit').click()
            # The actual UI passes the selected PokeMMO part; reply is a local mock.
            page.locator('#guide-chat-fab').click()
            expect(page.locator('.guide-chat-desc')).not_to_contain_text('DLC')
            page.locator('.guide-chat-input').fill('目前這個分頁要怎麼開始？')
            page.locator('.guide-chat-input').press('Enter')
            expect(page.locator('.guide-chat-input')).to_be_enabled()
            assert payloads[-1]['versionId'] == 'pokemmo'
            assert payloads[-1]['partId'] == part_id
            page.locator('.guide-chat-close').click()
            if part_id in ['main', 'johto', 'training-economy']:
                first = page.locator('.guide-expansion-island').first
                first.scroll_into_view_if_needed()
                first.screenshot(path=str(OUT / f'{part_id}-{width}.png'))
            no_overflow(page, (width, part_id, 'end'))
            assert not errors, errors
            row = {'width': width, 'part': part_id, 'chapters': len(part['sections']), 'testedBattles': len(to_test), 'status': 'PASS'}
            results.append(row)
            print(json.dumps(row), flush=True)
        page.select_option('#guideVersionSelect', 'red-blue')
        expect(page.locator('#guidePageTitle')).to_have_text('寶可夢 紅／藍')
        page.goto(BASE + '/guide.html?version=pokemmo&part=unknown')
        expect(page.get_by_role('tab', name='新手入門', exact=True)).to_have_attribute('aria-selected', 'true')
        context.close()
    # Existing installs may cache unversioned atlas assets. Seed stale entries
    # under the real service worker, then verify the new versioned assets win.
    cached = browser.new_context(service_workers='allow')
    page = cached.new_page()
    page.goto(BASE + '/guide.html?version=pokemmo')
    page.wait_for_function('navigator.serviceWorker.controller !== null')
    awaitable = """async data => {
      const cache = await caches.open('pokedex-pro-v4');
      await cache.put('/atlas/atlas.js', new Response('window.oldAtlasWasUsed = true;', {headers: {'content-type':'text/javascript'}}));
      delete data.versionMaps.pokemmo;
      await cache.put('/atlas/atlas-data.json', new Response(JSON.stringify(data), {headers: {'content-type':'application/json'}}));
    }"""
    page.evaluate(awaitable, atlas)
    page.goto(BASE + '/atlas/index.html?version=pokemmo&map=pokemmo-unova')
    expect(page.locator('#version')).to_have_value('pokemmo')
    expect(page.locator('#title')).to_have_text('合眾')
    assert page.evaluate('window.oldAtlasWasUsed !== true')
    cached.close()
    browser.close()
(OUT / 'results.json').write_text(json.dumps({'views': results, 'mockChatRequests': len(payloads), 'staleCacheUpgrade': 'PASS'}, ensure_ascii=False, indent=2), encoding='utf-8')
print('PASS', len(results), 'views;', sum(r['testedBattles'] for r in results), 'battle cards;', len(payloads), 'mocked chat requests')
