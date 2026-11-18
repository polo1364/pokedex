"""Run against Vite: python tests/browser_smoke.py [http://127.0.0.1:5173].

Requires Python Playwright and Chromium. PokéAPI is stubbed so these UI checks
are deterministic and never invoke the paid chat API.
"""
import json
import sys
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright, expect

BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:5173'
API = 'https://pokeapi.co/api/v2'


def pokeapi(route):
    path = urlparse(route.request.url).path.rstrip('/')
    resource = path.split('/')[-1]
    if resource in ('version', 'generation'):
        data = {'results': []}
    elif resource == 'pokemon-species':
        data = {'count': 30, 'results': [
            {'name': f'pokemon-{i}', 'url': f'{API}/pokemon-species/{i}/'}
            for i in range(1, 31)
        ]}
    elif '/pokemon-species/' in path:
        i = int(resource)
        data = {
            'id': i, 'names': [{'language': {'name': 'zh-hant'}, 'name': f'測試寶可夢{i}'}],
            'generation': {'url': f'{API}/generation/1/'},
            'varieties': [{'is_default': True, 'pokemon': {'url': f'{API}/pokemon/{i}/'}}],
        }
    elif '/pokemon/' in path:
        i = int(resource)
        data = {
            'id': i, 'name': f'pokemon-{i}', 'species': {'url': f'{API}/pokemon-species/{i}/'},
            'types': [{'type': {'name': 'fire' if i % 2 else 'water'}}],
            'stats': [{'stat': {'name': 'hp'}, 'base_stat': i}], 'held_items': [], 'moves': [],
        }
    else:
        raise AssertionError(f'Unexpected API request: {route.request.url}')
    route.fulfill(content_type='application/json', body=json.dumps(data))


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    for width, height in [(1440, 900), (390, 844)]:
        context = browser.new_context(viewport={'width': width, 'height': height},
                                      service_workers='block')
        context.route('https://pokeapi.co/**', pokeapi)
        # 這組情境測「沒有預建索引」時逐筆抓 PokéAPI 的備援流程（固定 30 筆假資料）。
        context.route('**/data/species-index.json', lambda route: route.fulfill(status=404, body=''))
        page = context.new_page()
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.goto(BASE)
        page.wait_for_load_state('networkidle')
        cards = page.locator('.pokemon-card')
        expect(cards).to_have_count(30)

        def open_sidebar():
            if width < 768:
                page.locator('#menuBtn').click()

        open_sidebar()
        page.locator('[data-type="fire"]').click()
        expect(cards).to_have_count(15)
        open_sidebar()
        page.locator('[data-type="fire"]').click()
        expect(cards).to_have_count(30)
        expect(page.locator('#typeFilterAll')).to_have_class('type-btn type-btn--all active')

        page.locator('#sortSelect').select_option('hp')
        expect(cards.first).to_have_attribute('data-id', '30')
        open_sidebar()
        page.locator('#searchBox').fill('測試寶可夢25')
        expect(cards).to_have_count(1)
        expect(cards.first).to_have_attribute('data-id', '25')
        page.locator('#searchBox').fill('')
        if width < 768:
            page.locator('#sidebarOverlay').click(position={'x': width - 5, 'y': 200})
        page.get_by_role('button', name='列表', exact=True).click()
        expect(page.locator('.pokemon-list-row')).to_have_count(30)
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), 'Horizontal overflow'
        page.get_by_role('button', name='網格', exact=True).click()
        expect(cards).to_have_count(30)
        assert not errors, errors
        print(f'PASS {width}x{height}: type toggle, sort, search, list/grid, layout, no JS errors')
        context.close()

    # 預建索引：完全不連 PokéAPI 也要能立即顯示完整、可篩選排序的網格。
    context = browser.new_context(viewport={'width': 1440, 'height': 900}, service_workers='block')
    api_requests = []

    def block_api(route):
        api_requests.append(route.request.url)
        route.abort()

    context.route('https://pokeapi.co/**', block_api)
    context.route('https://raw.githubusercontent.com/**', lambda route: route.abort())
    page = context.new_page()
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.goto(BASE)
    cards = page.locator('.pokemon-card')
    expect(cards).to_have_count(1025, timeout=10000)
    expect(page.locator('.type-badge--skeleton')).to_have_count(0)
    expect(page.locator('#statCount')).to_have_text('1025')
    expect(page.locator('#loadingContainer')).to_be_hidden()
    page.locator('#genFilters [data-gen="3"]').click()
    expect(cards).to_have_count(135)
    page.locator('[data-type="water"]:not(.type-btn--all)').click()
    expect(cards.first).to_have_attribute('data-id', '258')
    page.locator('[data-type="water"]:not(.type-btn--all)').click()
    page.locator('#genFilters [data-gen="all"]').click()
    page.locator('#sortSelect').select_option('total')
    expect(cards.first).to_have_attribute('data-id', '493')
    page.locator('#searchBox').fill('charizard')
    expect(cards).to_have_count(1)
    expect(cards.first.locator('.pokemon-name')).to_have_text('噴火龍')
    # 篩選狀態寫進網址：分享連結可還原，上一頁可回到前一個篩選。
    page.goto(f'{BASE}/?gen=3&type=water&sort=speed&view=list')
    rows = page.locator('.pokemon-list-row')
    expect(rows).to_have_count(28, timeout=10000)
    expect(page.locator('#genFilters [data-gen="3"]')).to_have_class('filter-btn active')
    expect(page.locator('#sortSelect')).to_have_value('speed')
    page.get_by_role('button', name='網格', exact=True).click()
    page.locator('[data-type="water"]:not(.type-btn--all)').click()
    expect(cards).to_have_count(135)
    assert page.evaluate('location.search') == '?gen=3&sort=speed', page.evaluate('location.search')
    page.go_back()
    expect(cards).to_have_count(28)
    expect(page.locator('[data-type="water"]:not(.type-btn--all)')).to_have_class('type-btn active')
    page.go_back()
    expect(rows).to_have_count(28)
    # 進階篩選：網址還原（雙屬性＋特性）、蛋群、種族值範圍、重設
    page.goto(f'{BASE}/?type=fire&type2=flying&ability=solar-power')
    expect(cards).to_have_count(1, timeout=10000)
    expect(cards.first.locator('.pokemon-name')).to_have_text('噴火龍')
    expect(page.locator('#advAbility')).to_have_value('太陽之力')
    expect(page.locator('#advancedDrawerBody')).to_be_visible()
    expect(page.locator('#advCount')).to_have_text('2')
    page.locator('#advReset').click()
    expect(cards).to_have_count(81)
    page.locator('#advEgg').select_option('undiscovered')
    expect(cards).to_have_count(12)
    params = page.evaluate('Object.fromEntries(new URLSearchParams(location.search))')
    assert params.get('type') == 'fire' and params.get('egg') == 'undiscovered', params
    page.locator('#advReset').click()
    page.locator('#typeFilterAll').click()
    page.locator('#advStat').select_option('hp')
    page.locator('#advMin').fill('255')
    page.locator('#advMin').press('Enter')
    page.locator('#advMin').blur()
    expect(cards).to_have_count(1)
    expect(cards.first).to_have_attribute('data-id', '242')
    page.locator('#advAbility').fill('不存在的特性')
    page.locator('#advAbility').press('Enter')
    page.locator('#advAbility').blur()
    expect(page.locator('#advAbilityHint')).to_contain_text('找不到')
    page.locator('#advReset').click()
    expect(cards).to_have_count(1025)
    species_requests = [u for u in api_requests if '/pokemon-species' in u]
    assert not species_requests, f'Prebuilt index still fetched species: {species_requests[:3]}'
    assert not errors, errors
    print('PASS prebuilt index: 1025 cards, filters, sort, English search, URL state, back button and advanced filters with PokeAPI blocked')
    context.close()
    browser.close()
