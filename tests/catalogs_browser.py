"""Desktop/mobile catalog regression using captured source data and controlled learnsets."""
import json
import re
import sys
from pathlib import Path
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]
FIX = ROOT / 'tests/fixtures/catalogs'
OUT = ROOT / 'output/catalog-audit/browser'
BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:5173'
API = 'https://pokeapi.co/api/v2'


def read(name):
    return json.loads((FIX / f'{name}.json').read_text(encoding='utf-8-sig'))


def ref(kind, name):
    return {'name': str(name), 'url': f'{API}/{kind}/{name}/'}


ITEMS = {slug: read(f'item--{slug}') for slug in ['master-ball', 'sitrus-berry', 'tm01', 'hm01', 'tr00']}
ITEMS['uncategorized'] = {'id': 9000, 'name': 'uncategorized', 'names': [], 'game_indices': [], 'category': ref('item-category', 'unknown')}
RELATIONS = {row['url']: row for row in read('tm01-live')}
MOVES = {p.stem.removeprefix('move--'): json.loads(p.read_text(encoding='utf-8-sig')) for p in FIX.glob('move--*.json')}


def fixture(url):
    path = urlparse(url).path.removeprefix('/api/v2/').strip('/')
    if path == 'item':
        return {'count': len(ITEMS), 'results': [ref('item', slug) for slug in ITEMS]}
    if path in ['version', 'generation']:
        return {'results': []}
    kind, name = path.split('/')[:2]
    if kind == 'item':
        return ITEMS[name]
    if kind == 'item-category':
        return {'names': [], 'pocket': ref('item-pocket', 'berries' if name == 'medicine' else 'pokeballs')}
    if kind == 'machine':
        relation = RELATIONS.get(url)
        if relation:
            return {'item': ref('item', relation['item']), 'version_group': ref('version-group', relation['version']), 'move': ref('move', relation['move'])}
        for slug in ['hm01', 'tr00']:
            for entry in ITEMS[slug]['machines']:
                if entry['machine']['url'] == url:
                    return {'version_group': entry['version_group'], 'move': ref('move', 'cut' if slug == 'hm01' else 'swords-dance')}
        raise AssertionError(f'Unknown machine: {url}')
    if kind == 'move':
        data = dict(MOVES.get(name, {'name': name, 'type': {'name': 'normal'}, 'names': []}))
        data['learned_by_pokemon'] = [ref('pokemon', i) for i in [25, 6, 133, 10025]]
        return data
    if kind == 'pokemon':
        identity = int(name)
        version = 'sword-shield' if identity == 6 else 'scarlet-violet'
        return {'id': identity, 'name': f'pokemon-{identity}', 'types': [{'type': {'name': 'electric'}}],
                'species': ref('pokemon-species', 25 if identity == 10025 else identity),
                'moves': [{'move': ref('move', 'take-down'), 'version_group_details': [{
                    'version_group': ref('version-group', version),
                    'move_learn_method': {'name': 'level-up' if identity == 133 else 'machine'}}]}]}
    if kind == 'pokemon-species':
        identity = int(name)
        return {'names': [{'name': {25: '皮卡丘', 6: '噴火龍', 133: '伊布'}[identity], 'language': {'name': 'zh-hant'}}],
                'varieties': [{'pokemon': {'name': f'pokemon-{i}'}, 'is_default': i == identity}
                              for i in ([25, 10025] if identity == 25 else [identity])]}
    raise AssertionError(f'Unhandled API route: {url}')


def no_overflow(page):
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), page.evaluate('[innerWidth,document.documentElement.scrollWidth]')


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for width in [1440, 768, 390, 320]:
            context = browser.new_context(viewport={'width': width, 'height': 1000}, is_mobile=width < 500,
                                          has_touch=width < 500, service_workers='block')
            failures = []
            context.route('https://pokeapi.co/api/v2/**', lambda route: route.fulfill(json=fixture(route.request.url)))
            context.route('https://raw.githubusercontent.com/**', lambda route: route.abort())
            page = context.new_page()
            page.on('pageerror', lambda error: failures.append(str(error)))
            page.goto(f'{BASE}/items.html')
            expect(page.locator('#itemsLoading')).to_be_hidden(timeout=20000)
            no_overflow(page)
            page.locator('#itemSearchBox').fill('sitrus')
            card = page.locator('#items-gen-3 [data-slug="sitrus-berry"]')
            expect(card).to_be_visible()
            expect(card.locator('.item-card-effect')).to_contain_text('30')
            expect(card.locator('.catalog-version-badge')).to_contain_text('火紅／葉綠')
            # 這個版本只有英文說明：保留本版原文，另外附上標明出處的中文參考
            reference = card.locator('.catalog-reference').first
            expect(reference.locator('.catalog-reference-tag')).to_have_text('中文參考・太陽／月亮')
            expect(reference).to_contain_text('回復少量')
            expect(page.locator('#items-gen-2 .item-card-name')).to_have_text('GOLD BERRY')
            expect(page.locator('#itemsGenNav [data-gen="uncategorized"]')).to_have_text('未分類 (0)')
            if width < 500:
                card.tap()
                expect(card).to_have_class(re.compile('is-expanded'))
                card.tap()
                expect(card).not_to_have_class(re.compile('is-expanded'))
            else:
                card.focus()
                card.press('Enter')
                expect(card).to_have_class(re.compile('is-expanded'))
            expect(card.locator('.item-inline-detail')).to_have_attribute('aria-hidden', 'false' if width >= 500 else 'true')
            page.locator('#itemSearchBox').fill('master-ball')
            first = page.locator('#items-gen-1 [data-slug="master-ball"]')
            expect(first).to_be_visible()
            expect(first).to_contain_text('買價：不可購買')
            expect(first).to_contain_text('賣價：0 寶可元')
            page.screenshot(path=str(OUT / f'items-{width}.png'), full_page=True)
            page.locator('#itemSearchBox').fill('uncategorized')
            expect(page.locator('#items-gen-uncategorized .item-card')).to_be_visible()
            page.locator('#itemSearchBox').fill('no-such-item')
            expect(page.locator('#itemsCount')).to_have_text('找不到符合的道具')
            no_overflow(page)

            page.goto(f'{BASE}/machines.html')
            expect(page.locator('#machinesLoading')).to_be_hidden(timeout=20000)
            page.locator('#machineSearchBox').fill('tm01')
            gen9 = page.locator('#machines-gen-9')
            expect(gen9.locator('.machine-card')).to_have_count(2)
            gen9.locator('select').select_option('scarlet-violet')
            expect(gen9.locator('.machine-card')).to_have_count(1)
            expect(gen9.locator('.machine-card-move')).to_have_text('猛撞')
            gen9.locator('.machine-card-filter-link').click()
            expect(page.locator('.learners-modal-count')).to_contain_text('2 種', timeout=10000)
            expect(page.locator('.learners-modal-subtitle')).to_contain_text('朱／紫')
            expect(page.locator('[data-pokemon-id="25"]')).to_be_visible()
            expect(page.locator('[data-pokemon-id="10025"]')).to_be_visible()
            expect(page.locator('[data-pokemon-id="6"]')).to_have_count(0)
            expect(page.locator('[data-pokemon-id="133"]')).to_have_count(0)
            expect(page.locator('.learners-modal-dex-link')).to_contain_text('跨版本')
            no_overflow(page)
            page.screenshot(path=str(OUT / f'learners-{width}.png'))
            page.locator('.learners-modal-close').click()
            gen9.locator('select').select_option('legends-za')
            expect(gen9.locator('.machine-card-move')).to_have_text('頭錘')
            gen8 = page.locator('#machines-gen-8')
            gen8.locator('select').select_option('brilliant-diamond-shining-pearl')
            expect(gen8.locator('.machine-card-move')).to_have_text('真氣拳')
            page.screenshot(path=str(OUT / f'machines-{width}.png'), full_page=True)
            page.locator('#machineSearchBox').fill('')
            page.locator('[data-kind="HM"]').click()
            expect(page.locator('#machines-gen-8 .machine-card')).to_have_count(0)
            no_overflow(page)
            assert not failures, failures
            print(f'PASS {width}px: item history/prices/search, version switch, scoped form learners, touch/keyboard, no overflow/errors')
            context.close()

        # Real IndexedDB: failed downloads must not be cached as complete catalogs.
        for name, key, target in [('items', 'items_by_gen_v10', '/item/sitrus-berry/'),
                                  ('machines', 'machines_by_gen_v5', '/item/tm01/')]:
            context = browser.new_context(service_workers='block')
            fail = [True]

            def route_api(route):
                if fail[0] and target in route.request.url:
                    route.fulfill(status=503, body='temporary failure')
                else:
                    route.fulfill(json=fixture(route.request.url))

            context.route('https://pokeapi.co/api/v2/**', route_api)
            context.route('https://raw.githubusercontent.com/**', lambda route: route.abort())
            page = context.new_page()
            page.goto(f'{BASE}/{name}.html')
            expect(page.locator(f'#{name}ProgressText')).to_contain_text('未完整載入', timeout=20000)
            expect(page.locator(f'#{name}ContentRoot')).to_be_hidden()
            assert page.evaluate("async key => (await import('/src/api/cache.js')).getCache(key)", key) is None
            fail[0] = False
            page.reload()
            expect(page.locator(f'#{name}Loading')).to_be_hidden(timeout=20000)
            assert page.evaluate("async key => (await import('/src/api/cache.js')).getCache(key)", key)['byGen']
            print(f'PASS {name}: incomplete download not cached; reload retries and caches complete data')
            context.close()
        browser.close()


if __name__ == '__main__':
    main()
