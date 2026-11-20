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
        expect(hero.locator('.gb-hero-step')).to_have_text('道館・建議第 2 個 ・ 華藍市')
        steps = detail.locator('.gb-step')
        expect(steps).to_have_count(4)
        assert steps.evaluate_all('n => n.map(x => x.className.split("--")[1])') == ['prep', 'do', 'do', 'warn']
        assert steps.locator('h4').all_text_contents() == ['準備', '主打', '接著', '注意']
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
        assert all(re.fullmatch(r'\./team\.html\?t=\d+(,\d+)*&vs=120\.water,121\.water\.psychic&vsName=[^&]+&gen=1', h) for h in team_hrefs), team_hrefs
        expect(analyze.first).to_have_text('用這隊分析這場對戰')
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

        # 聯盟對戰：每隻對手的對策直接寫在卡片上，不再另外列一張表
        detail = open_battle(page, 'red-blue', 'eliteFour:1')
        expect(detail.locator('.gb-hero-step')).to_contain_text('四天王')
        league_foes = detail.locator('.gb-foe')
        expect(league_foes).to_have_count(5)
        expect(detail.locator('.gb-counter')).to_have_count(5)
        expect(league_foes.nth(3).locator('.gb-counter')).to_contain_text('卡比獸一般物攻')
        expect(detail.locator('.guide-league-table')).to_have_count(0)
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), (width, 'league overflow')

        # 淺色閱讀模式：切換後換底色、圖片與屬性標籤維持原色，重新整理仍記得
        toggle = page.locator('#guideThemeToggle')
        dark_bg = page.evaluate('getComputedStyle(document.documentElement).getPropertyValue("--bg-primary").trim()')
        badge = detail.locator('.gb-foe .type-badge').first
        badge_color = badge.evaluate('n => getComputedStyle(n).backgroundColor')
        expect(toggle).to_have_attribute('aria-pressed', 'false')
        toggle.click()
        expect(toggle).to_have_attribute('aria-pressed', 'true')
        expect(page.locator('html')).to_have_class(re.compile('guide-light'))
        light_bg = page.evaluate('getComputedStyle(document.documentElement).getPropertyValue("--bg-primary").trim()')
        assert dark_bg == '#0f0f23' and light_bg == '#ececf7', (dark_bg, light_bg)
        name_color = detail.locator('.gb-foe .guide-party-grid-name').first.evaluate('n => getComputedStyle(n).color')
        r, g, b = [int(x) for x in re.findall(r'\d+', name_color)[:3]]
        assert max(r, g, b) < 90, ('names must be dark on the light theme', name_color)
        assert badge.evaluate('n => getComputedStyle(n).backgroundColor') == badge_color
        assert detail.locator('.gb-art').first.evaluate('n => getComputedStyle(n).filter') == 'none'
        # 嵌入的地圖跟著變淺色，地圖畫面本身維持深色
        atlas_frame = page.locator('iframe.guide-atlas-frame').first
        atlas_frame.scroll_into_view_if_needed()
        atlas = page.frame_locator('iframe.guide-atlas-frame').first
        expect(atlas.locator('html')).to_have_class(re.compile('atlas-light'), timeout=20000)
        expect(atlas.locator('#place-select')).to_be_visible(timeout=20000)
        body_bg = atlas.locator('body').evaluate('n => getComputedStyle(n).backgroundColor')
        assert min(int(x) for x in re.findall(r'\d+', body_bg)[:3]) > 200, ('atlas page must be light', body_bg)
        stage_color = atlas.locator('.map-controls button').first.evaluate('n => getComputedStyle(n).color')
        assert min(int(x) for x in re.findall(r'\d+', stage_color)[:3]) > 200, ('map controls keep light text', stage_color)
        detail = open_battle(page, 'red-blue', 'eliteFour:1')
        expect(page.locator('html')).to_have_class(re.compile('guide-light'))
        expect(page.locator('#guideThemeToggle')).to_have_attribute('aria-pressed', 'true')
        page.locator('#guideThemeToggle').click()
        expect(page.locator('html')).not_to_have_class(re.compile('guide-light'))
        page.locator('iframe.guide-atlas-frame').first.scroll_into_view_if_needed()
        expect(page.frame_locator('iframe.guide-atlas-frame').first.locator('html')).not_to_have_class(re.compile('atlas-light'))
        assert page.evaluate('localStorage.getItem("pokedex_guide_theme")') == 'dark'

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
        expected = len(re.search(r'[?&]t=([\d,]+)', team_link.get_attribute('href')).group(1).split(','))
        team_link.click()
        expect(page.locator('.team-slot-name')).to_have_count(expected)
        expect(page.locator('#teamLinked')).to_be_hidden()
        # 隊伍頁顯示這場對戰：對手是小霞的兩隻，皮卡丘的電招能剋
        expect(page.locator('#teamBattleTitle')).to_have_text('對這場對戰：小霞')
        expect(page.locator('.team-battle .team-card-desc')).to_contain_text('第 1 世代的相剋表')
        battle_rows = page.locator('.team-battle-row')
        expect(battle_rows).to_have_count(2)
        expect(battle_rows.nth(1).locator('.team-battle-foe strong')).to_have_text('寶石海星')
        expect(battle_rows.nth(1).locator('.team-battle-col').first).to_contain_text('皮卡丘')
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), (width, 'team battle overflow')
        page.evaluate('localStorage.clear()')

        assert not errors, errors
        print(f'PASS {width}x{height}: hero, steps, era weaknesses, tera, ace, image fallback, role/version tags, chapter tags, links to dex/moves/team, league counters, light theme')
        context.close()
    browser.close()
