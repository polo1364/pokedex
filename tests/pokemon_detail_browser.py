"""Shared detail UI regression: python tests/pokemon_detail_browser.py [Vite URL].

API fixtures exercise navigation, form-specific data, missing data and small
screens without changing user storage. Artwork uses the existing public source.
"""
import json
import re
import sys
from pathlib import Path
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright, expect

BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:5173'
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'output/pokemon-detail/qa'
API = 'https://pokeapi.co/api/v2'
ART = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork'
STATS = ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed']
NAMES = {25: '皮卡丘', 6: '噴火龍', 132: '百變怪', 800: '長名稱與缺圖測試用寶可夢（特殊形態）'}
SLUGS = {25: 'pikachu', 6: 'charizard', 132: 'ditto', 800: 'long-name-test'}


def ref(kind, identity):
    return {'name': str(identity), 'url': f'{API}/{kind}/{identity}/'}


def names(text):
    return [{'language': {'name': 'zh-hant'}, 'name': text}]


def flavor(text):
    return [{'language': {'name': 'zh-hant'}, 'version': {'name': 'scarlet'}, 'flavor_text': text}]


def species(identity):
    variants = [identity, 10080] if identity == 25 else [identity]
    return {
        'id': identity, 'name': SLUGS[identity], 'names': names(NAMES[identity]),
        'genera': [{'language': {'name': 'zh-hant'}, 'genus': '鼠寶可夢' if identity == 25 else '測試分類'}],
        'varieties': [{'is_default': i == 0, 'pokemon': ref('pokemon', pid)} for i, pid in enumerate(variants)],
        'generation': ref('generation', 1), 'evolution_chain': ref('evolution-chain', identity),
        'flavor_text_entries': flavor('臉頰兩側的小小電力袋中，儲存著電力。'),
        'egg_groups': [{'name': 'ground'}], 'gender_rate': 4, 'hatch_counter': 10,
        'capture_rate': 190, 'base_happiness': 50, 'growth_rate': {'name': 'medium'},
        'habitat': {'name': 'forest'},
        'pokedex_numbers': [{'entry_number': identity, 'pokedex': {'name': k}} for k in ['national', 'kanto']],
    }


def pokemon(identity):
    sid = 25 if identity == 10080 else identity
    move_id = 45 if identity == 10080 else 84
    type_names = ['fire', 'flying'] if sid == 6 else ['electric']
    return {
        'id': identity, 'name': 'pikachu-rock-star' if identity == 10080 else SLUGS[sid],
        'species': ref('pokemon-species', sid), 'forms': [ref('pokemon-form', identity)],
        'height': 4, 'weight': 60, 'base_experience': 112,
        'types': [{'type': {'name': t}} for t in type_names],
        'stats': [{'stat': {'name': k}, 'base_stat': v} for k, v in zip(STATS, [35, 55, 40, 50, 50, 90])],
        'abilities': [{'ability': ref('ability', i), 'is_hidden': i == 31} for i in [9, 31]],
        'sprites': {} if sid == 800 else {'other': {'official-artwork': {
            'front_default': f'{ART}/{sid}.png', 'front_shiny': f'{ART}/shiny/{sid}.png'}}},
        'held_items': [], 'location_area_encounters': f'{API}/pokemon/{identity}/encounters',
        'moves': [] if sid == 132 else [{'move': ref('move', move_id), 'version_group_details': [{
            'move_learn_method': {'name': 'level-up'}, 'level_learned_at': 5,
            'version_group': {'name': 'scarlet-violet'},
        }]}],
    }


def api_data(url):
    path = urlparse(url).path.removeprefix('/api/v2/').strip('/')
    if path in ['generation', 'version']:
        return {'results': []}
    if path == 'item':
        return {'count': 0, 'results': []}
    if path == 'pokemon-species':
        return {'count': len(NAMES), 'results': [ref('pokemon-species', i) for i in NAMES]}
    kind, identity, *tail = path.split('/')
    if tail == ['encounters']:
        return [{'location_area': ref('location-area', 1), 'version_details': [
            {'version': {'name': v}, 'encounter_details': [{
                'method': {'name': 'walk'}, 'min_level': 3, 'max_level': 5, 'chance': 10,
            }]} for v in ['red', 'blue']]}]
    identity = int(identity)
    if kind == 'pokemon-species':
        return species(identity)
    if kind == 'pokemon':
        return pokemon(identity)
    if kind == 'pokemon-form':
        return {'form_names': names('搖滾巨星' if identity == 10080 else '一般')}
    if kind == 'ability':
        return {'names': names('靜電' if identity == 9 else '避雷針'),
                'flavor_text_entries': flavor('受到接觸招式攻擊時，有時會讓對手陷入麻痺狀態。' if identity == 9 else '將電屬性的招式吸引到自己身上，不會受到傷害，且會提高特攻。')}
    if kind == 'move':
        return {'names': names('電擊' if identity == 84 else '叫聲'), 'type': {'name': 'electric' if identity == 84 else 'normal'}}
    if kind == 'evolution-chain':
        return {'chain': {'species': ref('pokemon-species', identity), 'evolves_to': [], 'evolution_details': []}}
    if kind == 'location-area':
        return {'names': names('草叢'), 'location': ref('location', 1)}
    if kind == 'location':
        return {'names': names('常磐森林'), 'region': ref('region', 1)}
    if kind == 'region':
        return {'names': names('關都')}
    raise AssertionError(f'Unexpected API request: {url}')


def assert_layout(page):
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), 'Page overflow'
    assert page.locator('#modal .modal-body').evaluate('(el) => el.scrollWidth <= el.clientWidth'), 'Dialog overflow'
    for selector in ['#closeModalBtn', '#modal .detail-tabs']:
        box = page.locator(selector).bounding_box()
        assert box and box['x'] >= 0 and box['x'] + box['width'] <= page.viewport_size['width'], selector


def select_tab(page, name):
    button = page.locator('#modal .detail-tabs').get_by_role('button', name=name, exact=True)
    button.click()
    expect(button).to_have_attribute('aria-pressed', 'true')
    expect(page.locator('#modal .tab-content:visible')).to_have_count(1)
    assert_layout(page)


def run():
    OUT.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True)
        for width, height in [(1440, 1000), (768, 1024), (390, 844), (320, 740)]:
            context = browser.new_context(viewport={'width': width, 'height': height},
                                          service_workers='block', reduced_motion='reduce',
                                          permissions=['clipboard-read', 'clipboard-write'])
            requested = []
            def route_api(route):
                requested.append(route.request.url)
                route.fulfill(content_type='application/json', body=json.dumps(api_data(route.request.url)))
            context.route('https://pokeapi.co/**', route_api)
            # 用測試自己的物種清單（預建索引含 1025 筆真實資料，相鄰預載會超出假資料範圍）
            context.route('**/data/species-index.json', lambda route: route.fulfill(status=404, body=''))
            page = context.new_page()
            errors = []
            page.on('pageerror', lambda error: errors.append(str(error)))
            page.goto(f'{BASE}/?id=25')
            page.wait_for_load_state('networkidle')
            expect(page.locator('#overviewTab')).to_be_visible()
            expect(page.locator('#pokemonDetailTitle')).to_have_text('皮卡丘')
            expect(page.locator('.stat-total')).to_have_text('總和320')
            expect(page.locator('#abilitiesSection .ability-item')).to_have_count(2)
            assert not any('/move/' in url for url in requested), 'Moves should load on demand'
            assert_layout(page)
            page.screenshot(path=str(OUT / f'pikachu-{width}.png'))

            # 上一隻／下一隻：依首頁目前排序（假資料 6, 25, 132, 800），網址 id 同步
            nav = page.locator('#modalNav')
            expect(nav.locator('.modal-nav-pos')).to_have_text('2 / 4')
            expect(nav.locator('[data-nav="prev"]')).to_contain_text('噴火龍')
            page.keyboard.press('ArrowRight')
            expect(page.locator('#pokemonDetailTitle')).to_have_text('百變怪')
            assert page.evaluate('location.search') == '?id=132', page.evaluate('location.search')
            nav.locator('[data-nav="prev"]').click()
            expect(page.locator('#pokemonDetailTitle')).to_have_text('皮卡丘')
            expect(nav.locator('.modal-nav-pos')).to_have_text('2 / 4')

            if width == 1440:
                # 寶可夢比較：從詳情加入兩隻 → 底部清單 → 比較視窗 → 網址 → 移除
                compare_btn = page.locator('#compareBtn')
                compare_btn.click()
                expect(compare_btn).to_have_attribute('aria-pressed', 'true')
                page.keyboard.press('ArrowLeft')
                expect(page.locator('#pokemonDetailTitle')).to_have_text('噴火龍')
                page.locator('#compareBtn').click()
                page.locator('#closeModalBtn').click()
                tray = page.locator('#compareTray')
                expect(tray.locator('.compare-chip-name')).to_have_text(['皮卡丘', '噴火龍'])
                tray.get_by_role('button', name='開始比較').click()
                dialog = page.locator('#compareModal')
                expect(dialog.locator('.compare-head-name')).to_have_text(['皮卡丘', '噴火龍'])
                assert page.evaluate('location.search') == '?compare=25,6', page.evaluate('location.search')
                expect(dialog.locator('[data-abilities="25"]')).to_contain_text('靜電')
                expect(dialog.locator('.compare-weak td').nth(1)).to_contain_text('岩石')
                dialog.locator('[data-remove="6"]').click()
                expect(dialog.locator('.compare-head-name')).to_have_text(['皮卡丘'])
                page.keyboard.press('Escape')
                expect(dialog).not_to_be_visible()
                assert page.evaluate('location.search') == '', page.evaluate('location.search')
                tray.get_by_role('button', name='清空').click()
                expect(tray).to_be_hidden()
                page.goto(f'{BASE}/?id=25')
                page.wait_for_load_state('networkidle')
                expect(page.locator('#pokemonDetailTitle')).to_have_text('皮卡丘')

            page.locator('#favoriteBtn').click()
            expect(page.locator('#favoriteBtn')).to_have_attribute('aria-pressed', 'true')
            page.locator('#shinyToggleBtn').click()
            expect(page.locator('#modalMainImage')).to_have_attribute('src', f'{ART}/shiny/25.png')
            page.locator('#shinyToggleBtn').click()
            expect(page.locator('#modalMainImage')).to_have_attribute('src', f'{ART}/25.png')
            page.once('dialog', lambda dialog: dialog.accept())
            page.locator('#shareBtn').click()
            assert page.evaluate('navigator.clipboard.readText()').endswith('?id=25')

            select_tab(page, '招式')
            expect(page.locator('#movesList')).to_contain_text('電擊')
            # 招式名稱連到招式圖鑑（測試資料的招式代碼就是編號）
            move_link = page.locator('#movesList .move-name a').filter(has_text='電擊').first
            assert move_link.get_attribute('href').startswith('./moves.html?open='), move_link.get_attribute('href')
            select_tab(page, '進化')
            expect(page.locator('#evolutionChain .evolution-name')).to_have_text('皮卡丘')
            select_tab(page, '相剋')
            expect(page.locator('.type-chart-cell')).to_have_count(18)
            select_tab(page, '地點')
            expect(page.locator('#encountersList')).to_contain_text('常磐森林')
            page.locator('#encounterVersionFilter').select_option('red')
            expect(page.locator('.encounter-version-panel:visible')).to_have_attribute('data-version', 'red')

            select_tab(page, '招式')
            page.locator('.detail-forms > summary').click()
            page.locator('.form-btn[data-pid="10080"]').click()
            expect(page.locator('#movesTab')).to_be_visible()
            expect(page.locator('#movesList')).to_contain_text('叫聲')
            expect(page.locator('#movesList')).not_to_contain_text('電擊')
            expect(page.locator('#pokemonDetailTitle')).to_have_text('皮卡丘')
            expect(page.locator('.modal-form-label')).to_have_text('搖滾巨星')
            select_tab(page, '總覽')
            page.locator('.detail-disclosure > summary').first.click()
            expect(page.locator('.breeding-section')).to_be_visible()
            expect(page.locator('#heldItemsSection')).to_contain_text('無野生持有道具資料')
            page.locator('.detail-disclosure > summary').last.click()
            expect(page.locator('.pokedex-section')).to_be_visible()
            expect(page.locator('#versionsSection')).to_contain_text('寶可夢 關都')
            assert_layout(page)
            page.keyboard.press('Escape')
            expect(page.locator('#modal')).not_to_be_visible()

            page.locator('.pokemon-card[data-id="25"]').click()
            expect(page.locator('#favoriteBtn')).to_have_attribute('aria-pressed', 'true')
            expect(page.locator('#overviewTab')).to_be_visible()
            page.locator('#favoriteBtn').click()  # Test browser storage only.
            page.locator('#closeModalBtn').click()
            for identity in [6, 132, 800]:
                page.locator(f'.pokemon-card[data-id="{identity}"]').click()
                expect(page.locator('#pokemonDetailTitle')).to_have_text(NAMES[identity])
                assert_layout(page)
                if identity == 6:
                    expect(page.locator('#modalHeader .type-badge')).to_have_count(2)
                if identity == 132:
                    select_tab(page, '招式')
                    expect(page.locator('#movesList')).to_contain_text('無招式資料')
                if identity == 800:
                    expect(page.locator('#modalMainImage')).to_have_attribute('src', re.compile('data:image/svg'))
                    page.screenshot(path=str(OUT / f'long-name-{width}.png'))
                page.locator('#closeModalBtn').click()
            assert not errors, errors
            print(f'PASS {width}x{height}: prev/next nav, compare, tabs, forms, stats, favorite, shiny, share, disclosures, encounters, long name, missing image, no overflow/errors')
            context.close()
        # The machines page creates the same dialog dynamically (no index.html markup).
        page = browser.new_page(viewport={'width': 390, 'height': 844}, service_workers='block')
        page.route('https://pokeapi.co/**', lambda route: route.fulfill(
            content_type='application/json', body=json.dumps(api_data(route.request.url))))
        page.goto(f'{BASE}/machines.html')
        page.wait_for_load_state('networkidle')
        # Existing hidden kind tooltips extend the machines page at 390px.
        # The shared dialog must not increase that pre-existing page width.
        initial_page_width = page.evaluate('document.documentElement.scrollWidth')
        await_detail = """async () => {
            const { ensurePokemonDetailModal, showDetail } = await import('/src/ui/modal.js');
            ensurePokemonDetailModal();
            await showDetail(25);
        }"""
        page.evaluate(await_detail)
        expect(page.locator('#overviewTab')).to_be_visible()
        expect(page.locator('#pokemonDetailTitle')).to_have_text('皮卡丘')
        expect(page.locator('#modalNav')).to_be_hidden()
        expect(page.locator('#compareBtn')).to_have_count(0)
        assert page.locator('#modal .modal-header').evaluate('(el) => getComputedStyle(el).backgroundColor') == 'rgb(66, 45, 62)'
        page.locator('#modal .detail-tabs').get_by_role('button', name='招式', exact=True).click()
        expect(page.locator('#movesList')).to_contain_text('電擊')
        assert page.locator('#modal .modal-body').evaluate('(el) => el.scrollWidth <= el.clientWidth')
        assert page.evaluate('document.documentElement.scrollWidth') == initial_page_width
        page.locator('#closeModalBtn').click()
        expect(page.locator('#modal')).not_to_be_visible()
        print('PASS machines page: dynamically mounted shared detail dialog, theme and tabs')
        browser.close()


if __name__ == '__main__':
    run()
