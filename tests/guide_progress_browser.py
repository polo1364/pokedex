"""Run against Vite: python tests/guide_progress_browser.py [http://127.0.0.1:5173].

攻略進度勾選：對戰卡片、章節、委託；重新整理後保留、隱藏已完成、重設、版本與部分分開記錄。
"""
import json
import sys
from playwright.sync_api import sync_playwright, expect

BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:5173'

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    for width, height in [(1440, 900), (390, 844)]:
        context = browser.new_context(viewport={'width': width, 'height': height}, service_workers='block')
        context.route('https://pokeapi.co/**', lambda route: route.abort())
        context.route('https://raw.githubusercontent.com/**', lambda route: route.abort())
        page = context.new_page()
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))

        # 紅／藍本體：道館與聯盟對戰卡片
        page.goto(f'{BASE}/guide.html?version=red-blue')
        bar = page.locator('.guide-progress-bar')
        expect(bar.locator('.guide-progress-text')).to_have_text('已完成 0 / 13')
        toggles = page.locator('.guide-done-toggle--battle')
        expect(toggles).to_have_count(13)
        toggles.nth(0).click()
        toggles.nth(1).click()
        expect(bar.locator('.guide-progress-text')).to_have_text('已完成 2 / 13')
        expect(bar.locator('.guide-progress-percent')).to_have_text('15%')
        first_card = page.locator('.guide-timeline-item').first
        assert 'is-done' in first_card.get_attribute('class')
        expect(first_card.locator('.guide-battle-detail')).to_be_hidden()  # 勾選不會展開卡片

        page.reload()
        expect(bar.locator('.guide-progress-text')).to_have_text('已完成 2 / 13')
        expect(toggles.nth(0)).to_have_attribute('aria-pressed', 'true')

        page.locator('[data-progress-hide]').check()
        expect(page.locator('.guide-timeline-item:visible')).to_have_count(11)
        page.reload()
        expect(page.locator('.guide-timeline-item:visible')).to_have_count(11)  # 隱藏偏好也保留
        page.locator('[data-progress-hide]').uncheck()
        expect(page.locator('.guide-timeline-item:visible')).to_have_count(13)

        # 另一個版本與部分各自獨立：綠寶石 戰鬥開拓區 有章節
        page.goto(f'{BASE}/guide.html?version=emerald&part=battle-frontier')
        expect(bar.locator('.guide-progress-text')).to_contain_text('已完成 0 /')
        chapter = page.locator('.guide-done-toggle--chapter').first
        chapter.click()
        expect(chapter).to_have_attribute('aria-pressed', 'true')

        # 阿爾宙斯委託：勾選、與搜尋並用
        page.goto(f'{BASE}/guide.html?version=legends-arceus&part=requests')
        requests = page.locator('.guide-done-toggle--request')
        expect(requests).to_have_count(122)
        requests.nth(0).click()
        assert 'is-done' in page.locator('.guide-expansion-request').first.get_attribute('class')

        saved = json.loads(page.evaluate("localStorage.getItem('pokedex_guide_progress')"))
        assert saved['red-blue']['main'] == ['b:gym:1', 'b:gym:2'], saved
        assert saved['emerald']['battle-frontier'] == ['c:expansion-section-battle-frontier-1'], saved
        assert saved['legends-arceus']['requests'] == ['r:1'], saved

        # 重設只清除目前這一部分
        page.once('dialog', lambda dialog: dialog.accept())
        page.locator('[data-progress-reset]').click()
        expect(bar.locator('.guide-progress-text')).to_contain_text('已完成 0 /')
        saved = json.loads(page.evaluate("localStorage.getItem('pokedex_guide_progress')"))
        assert 'legends-arceus' not in saved and saved['red-blue']['main'] == ['b:gym:1', 'b:gym:2'], saved

        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), 'Horizontal overflow'
        assert not errors, errors
        print(f'PASS {width}x{height}: battle/chapter/request toggles, persistence, hide done, per-part storage, reset')
        context.close()
    browser.close()
