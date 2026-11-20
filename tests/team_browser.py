"""Run against Vite: python tests/team_browser.py [http://127.0.0.1:5173].

隊伍屬性分析頁：只用預建物種索引，PokéAPI 與圖片全部封鎖也必須能運作。
"""
import sys
from playwright.sync_api import sync_playwright, expect

BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:5173'

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    for width, height in [(1440, 900), (390, 844)]:
        context = browser.new_context(viewport={'width': width, 'height': height},
                                      service_workers='block',
                                      permissions=['clipboard-read', 'clipboard-write'])
        api_requests = []

        def block_api(route):
            api_requests.append(route.request.url)
            route.abort()

        context.route('https://pokeapi.co/**', block_api)
        context.route('https://raw.githubusercontent.com/**', lambda route: route.abort())
        page = context.new_page()
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))

        # 分享連結還原：噴火龍、暴鯉龍、水箭龜都怕電
        page.goto(f'{BASE}/team.html?t=6,130,9')
        slots = page.locator('.team-slot-name')
        expect(slots).to_have_text(['噴火龍', '暴鯉龍', '水箭龜'])
        expect(page.locator('#teamCount')).to_have_text('3 / 6')
        first_weak = page.locator('.team-chip--weak').first
        expect(first_weak).to_contain_text('電')
        expect(first_weak).to_contain_text('3 隻怕（1 隻 4 倍）・0 隻能抗')
        electric_row = page.locator('.team-defense-table tbody tr').nth(3)
        expect(electric_row).to_have_class('is-shared-weak')
        expect(electric_row.locator('td.m-quad')).to_have_text('4')

        # 搜尋（英文）+ 鍵盤選取加入天蠍（地面，免疫電）
        search = page.locator('#teamSearch')
        search.fill('gligar')
        expect(page.locator('.team-suggestion-name').first).to_have_text('天蠍')
        search.press('Enter')
        expect(slots).to_have_text(['噴火龍', '暴鯉龍', '水箭龜', '天蠍'])
        expect(first_weak).to_contain_text('1 隻能抗')
        assert page.evaluate('location.search') == '?t=6,130,9,207', page.evaluate('location.search')

        # 重複加入有提示、不重複
        search.fill('6')
        page.locator('.team-suggestion[data-add="6"]').click()
        expect(page.locator('#teamStatus')).to_contain_text('已在隊伍中')
        expect(slots).to_have_count(4)

        # 移除、重新整理後由 localStorage 還原
        page.locator('[data-remove="130"]').click()
        expect(slots).to_have_text(['噴火龍', '水箭龜', '天蠍'])
        page.goto(f'{BASE}/team.html')
        expect(slots).to_have_text(['噴火龍', '水箭龜', '天蠍'])
        assert page.evaluate('location.search') == '?t=6,9,207'

        # 連結帶入不同的隊伍：只預覽，不蓋掉已儲存的隊伍；可以回到原隊伍，也可以存下來
        linked = page.locator('#teamLinked')
        expect(linked).to_be_hidden()
        page.goto(f'{BASE}/team.html?t=25,26')
        expect(slots).to_have_text(['皮卡丘', '雷丘'])
        expect(linked).to_be_visible()
        page.locator('#teamLinkedBack').click()
        expect(slots).to_have_text(['噴火龍', '水箭龜', '天蠍'])
        expect(linked).to_be_hidden()
        assert page.evaluate('location.search') == '?t=6,9,207'
        page.goto(f'{BASE}/team.html?t=25,26')
        page.locator('#teamLinkedKeep').click()
        expect(linked).to_be_hidden()
        page.goto(f'{BASE}/team.html')
        expect(slots).to_have_text(['皮卡丘', '雷丘'])
        # 修改成員也算採用連結帶入的隊伍
        page.goto(f'{BASE}/team.html?t=6,9,207,130')
        expect(linked).to_be_visible()
        page.locator('[data-remove="130"]').click()
        expect(linked).to_be_hidden()
        page.goto(f'{BASE}/team.html')
        expect(slots).to_have_text(['噴火龍', '水箭龜', '天蠍'])

        # 打擊面：龍屬性沒有人能用本系招式剋制
        dragon = page.locator('.team-cover').filter(has_text='龍').first
        expect(dragon).to_have_class('team-cover is-gap')
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), 'Horizontal overflow'

        page.locator('#teamClear').click()
        expect(slots).to_have_count(0)
        expect(page.locator('.team-empty')).to_be_visible()
        assert page.evaluate('location.search') == ''

        assert not api_requests, f'Team page must not call PokeAPI: {api_requests[:3]}'
        assert not errors, errors
        print(f'PASS {width}x{height}: URL restore, weaknesses, search+keyboard add, duplicate guard, remove, storage, linked-team preview, coverage, clear, no PokeAPI')
        context.close()
    browser.close()
