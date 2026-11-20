"""Run against Vite: python tests/guide_board_browser.py [http://127.0.0.1:5173].

攻略「對戰看板」排版：橫幅、編號步驟、對手（圖片佔位、等級、當代弱點、王牌）、推薦隊伍標籤。
寶可夢圖片來自外部圖庫，這裡全部封鎖，確認沒有圖片時版面仍完整。
"""
import re
import sys
from playwright.sync_api import sync_playwright, expect

BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:5173'


def open_battle(page, version, ref, part=''):
    page.goto(f'{BASE}/guide.html?version={version}{"&part=" + part if part else ""}&battle={ref}')
    detail = page.locator(f'.guide-battle-detail[data-battle-ref="{ref}"]').first
    expect(detail).to_be_visible(timeout=15000)
    return detail


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    for width, height in [(1280, 900), (390, 844)]:
        context = browser.new_context(viewport={'width': width, 'height': height}, service_workers='block')
        context.route('https://raw.githubusercontent.com/**', lambda route: route.abort())
        page = context.new_page()
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))

        # 第 1 世代道館：橫幅、步驟、初代相剋（寶石海星只怕電／草／蟲）
        detail = open_battle(page, 'red-blue', 'gym:2')
        hero = detail.locator('.gb-hero')
        expect(hero.locator('.gb-hero-name')).to_have_text('小霞')
        expect(hero.locator('.gb-pill--level')).to_have_text('建議 Lv.18–22')
        expect(hero.locator('.gb-hero-step')).to_contain_text('華藍市')
        steps = detail.locator('.gb-step')
        expect(steps).to_have_count(4)
        assert steps.evaluate_all('n => n.map(x => x.className.split("--")[1])') == ['prep', 'do', 'do', 'warn']
        foes = detail.locator('.gb-foe')
        expect(foes).to_have_count(2)
        expect(foes.nth(1).locator('.gb-ace')).to_have_text('王牌')
        expect(foes.nth(0).locator('.gb-ace')).to_have_count(0)
        assert foes.nth(1).locator('.gb-weak-chip').all_text_contents() == ['電', '草', '蟲']
        expect(foes.nth(1).locator('.guide-level')).to_have_text('Lv.21')
        # 圖片被封鎖：顯示佔位圖，不留破圖
        expect(detail.locator('.gb-art.is-empty')).not_to_have_count(0)
        expect(detail.locator('.gb-art img')).to_have_count(0)
        # 推薦隊伍：首選／替代、取得／招式標籤、版本標籤
        assert detail.locator('.gb-role').all_text_contents() == ['首選', '替代']
        allies = detail.locator('.gb-ally')
        expect(allies).to_have_count(3)
        assert allies.nth(1).locator('.gb-k').all_text_contents() == ['取得', '招式']
        expect(allies.nth(1).locator('.gb-ver--red')).to_have_text('紅版')
        expect(allies.nth(2).locator('.gb-ver--blue')).to_have_text('藍版')
        # 連結：對手連到圖鑑詳情、招式連到招式圖鑑、推薦隊伍可帶到隊伍分析
        expect(foes.nth(1).locator('a.gb-mon-link')).to_have_attribute('href', './?id=121')
        expect(allies.locator('a.gb-mon-link')).to_have_count(3)
        moves = detail.locator('a.gb-move-link')
        expect(moves).not_to_have_count(0)
        move_hrefs = moves.evaluate_all('n => n.map(a => a.getAttribute("href"))')
        assert all(re.fullmatch(r'\./moves\.html\?open=[a-z0-9-]+', h) for h in move_hrefs), move_hrefs
        analyze = detail.locator('a.gb-team-analyze')
        expect(analyze).to_have_count(2)
        team_hrefs = analyze.evaluate_all('n => n.map(a => a.getAttribute("href"))')
        assert all(re.fullmatch(r'\./team\.html\?t=\d+(,\d+)*', h) for h in team_hrefs), team_hrefs
        if width >= 900:
            foe_box = detail.locator('.gb-sec--foes').bounding_box()
            step_box = detail.locator('.gb-sec--steps').bounding_box()
            assert foe_box['x'] < step_box['x'] and abs(foe_box['y'] - step_box['y']) < 4, '對手在左、步驟在右'
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), (width, 'gym overflow')

        # 同一隻寶可夢在第 9 世代相剋表下多了幽靈、惡；太晶化的對手改用太晶屬性算弱點
        detail = open_battle(page, 'scarlet-violet', 'gym:1')
        tera = detail.locator('.gb-foe').last
        expect(tera.locator('.gb-tera')).to_have_text('太晶：蟲')
        expect(tera.locator('.gb-weak-label')).to_have_text('太晶後怕')
        assert tera.locator('.gb-weak-chip').all_text_contents() == ['火', '飛行', '岩石']

        # 冠軍戰：分支內的隊伍也用看板列，四倍弱點有標示
        detail = open_battle(page, 'red-blue', 'champion')
        expect(detail.locator('.gb-hero .gb-hero-name')).to_have_text('青綠')
        panel = detail.locator('.guide-variant-panel').first
        rhydon = panel.locator('.gb-foe').filter(has_text='鑽角犀獸')
        assert rhydon.locator('.gb-weak-chip.is-quad').all_text_contents() == ['水×4', '草×4']
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), (width, 'champion overflow')

        # 章節區塊：色塊小標與編號流程
        page.goto(f'{BASE}/guide.html?version=emerald&part=battle-frontier')
        island = page.locator('.guide-expansion-island').first
        expect(island.locator('.gx-tag')).to_have_text(['重要地點', '流程', '重點'])
        expect(island.locator('.gx-flow > li')).to_have_count(3)

        # 實際點過去：招式圖鑑打開該招式、隊伍分析頁帶入整隊
        detail = open_battle(page, 'red-blue', 'gym:2')
        move_link = detail.locator('a.gb-move-link').first
        expect(move_link).to_be_visible()
        move_name = move_link.inner_text()
        move_link.click()
        expect(page).to_have_url(re.compile(r'/moves\.html\?open='))
        expect(page.locator('body')).to_contain_text(move_name)
        detail = open_battle(page, 'red-blue', 'gym:2')
        team_link = detail.locator('a.gb-team-analyze').first
        expect(team_link).to_be_visible()
        expected = len(team_link.get_attribute('href').split('=')[1].split(','))
        team_link.click()
        expect(page.locator('.team-slot-name')).to_have_count(expected)
        expect(page.locator('#teamLinked')).to_be_hidden()
        page.evaluate('localStorage.clear()')

        assert not errors, errors
        print(f'PASS {width}x{height}: hero, steps, era weaknesses, tera, ace, image fallback, role/version tags, chapter tags, links to dex/moves/team')
        context.close()
    browser.close()
