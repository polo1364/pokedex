"""Run against Vite: python tests/move_catalog_browser.py [http://127.0.0.1:5173].

招式與特性圖鑑：列表只用預建索引；展開招式時才請求 PokéAPI（此處以假資料回應）。
"""
import json
import sys
from playwright.sync_api import sync_playwright, expect

BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:5173'
API = 'https://pokeapi.co/api/v2'

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    for width, height in [(1440, 900), (390, 844)]:
        context = browser.new_context(viewport={'width': width, 'height': height}, service_workers='block')
        requested = []

        def pokeapi(route):
            requested.append(route.request.url)
            if '/move/thunderbolt' in route.request.url:
                body = {'learned_by_pokemon': [
                    {'name': 'pikachu', 'url': f'{API}/pokemon/25/'},
                    {'name': 'raichu', 'url': f'{API}/pokemon/26/'},
                    {'name': 'pikachu-rock-star', 'url': f'{API}/pokemon/10080/'},
                ]}
                route.fulfill(content_type='application/json', body=json.dumps(body))
            else:
                route.abort()

        context.route('https://pokeapi.co/**', pokeapi)
        context.route('https://raw.githubusercontent.com/**', lambda route: route.abort())
        page = context.new_page()
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))

        page.goto(f'{BASE}/moves.html')
        rows = page.locator('.mc-row')
        expect(page.locator('#mcCount')).to_have_text('共 919 筆')
        assert not requested, f'List must not call PokeAPI: {requested}'

        # 英文搜尋也會找到 Z 招式「千萬伏特」（10-000-000-volt-thunderbolt）
        page.locator('#mcSearch').fill('thunderbolt')
        expect(rows).to_have_count(2)
        # 中文搜尋＋展開：可學會的寶可夢（形態只計數）
        page.locator('#mcSearch').fill('十萬伏特')
        expect(rows).to_have_count(1)
        expect(rows.first.locator('.mc-name strong')).to_have_text('十萬伏特')
        rows.first.locator('.mc-row-head').click()
        learners = rows.first.locator('.mc-learners')
        expect(learners.locator('.mc-sub')).to_contain_text('2 種（另有 1 種形態）')
        expect(learners.locator('.mc-mon')).to_have_count(2)
        expect(learners.locator('.mc-mon').first).to_have_attribute('href', './index.html?id=25')
        params = page.evaluate('Object.fromEntries(new URLSearchParams(location.search))')
        assert params == {'q': '十萬伏特', 'open': 'thunderbolt'}, params

        # 篩選＋排序，並由網址還原
        page.locator('#mcSearch').fill('')
        page.locator('#mcType').select_option('dragon')
        page.locator('#mcClass').select_option('special')
        page.locator('#mcSort').select_option('power')
        expect(rows.first.locator('.mc-name strong')).to_have_text('熾魂熱舞烈音爆')
        page.reload()
        expect(page.locator('#mcType')).to_have_value('dragon')
        expect(rows.first.locator('.mc-name strong')).to_have_text('熾魂熱舞烈音爆')

        # 特性分頁：從網址直接展開，持有者來自物種索引，可連到圖鑑篩選
        page.goto(f'{BASE}/moves.html?tab=abilities&open=solar-power')
        opened = page.locator('.mc-row.is-open')
        expect(opened).to_have_attribute('data-slug', 'solar-power')
        expect(page.locator('#mcType')).to_be_hidden()
        expect(opened.locator('.mc-mon.is-hidden[href="./index.html?id=6"]')).to_have_count(1)
        expect(opened.locator('.mc-dex-link')).to_have_attribute('href', './index.html?ability=solar-power')
        page.locator('#mcSearch').fill('飄浮')
        expect(rows).to_have_count(1)
        page.locator('#mcTabMoves').click()
        expect(page.locator('#mcType')).to_be_visible()
        assert page.evaluate('location.search') == '?q=%E9%A3%84%E6%B5%AE', page.evaluate('location.search')

        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), 'Horizontal overflow'
        assert not errors, errors
        print(f'PASS {width}x{height}: index-only list, search, learners on demand, filters+sort+URL restore, abilities tab, dex links')
        context.close()
    browser.close()
