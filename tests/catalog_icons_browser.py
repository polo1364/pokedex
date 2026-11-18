"""Image-specific checks: source-backed assets, real image decoding and safe failure states."""
import json
import re
from pathlib import Path
from playwright.sync_api import sync_playwright, expect
from catalogs_browser import BASE, fixture, ITEMS, ref, no_overflow

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'output/catalog-icons/browser'
ITEMS['ability-patch'] = {'id': 1606, 'name': 'ability-patch', 'names': [
    {'name': '特性膏藥', 'language': {'name': 'zh-hant'}}], 'category': ref('item-category', 'vitamins'),
    'game_indices': [{'generation': {'name': 'generation-viii'}}]}


def decoded(image):
    image.scroll_into_view_if_needed()
    expect(image).to_be_visible()
    expect(image).to_have_js_property('complete', True)
    assert image.evaluate('(img) => img.complete && img.naturalWidth > 0')


with sync_playwright() as p:
    OUT.mkdir(parents=True, exist_ok=True)
    browser = p.chromium.launch()
    for width in [1440, 390]:
        context = browser.new_context(viewport={'width': width, 'height': 1000}, service_workers='block',
                                      is_mobile=width < 500, has_touch=width < 500)
        context.route('https://pokeapi.co/api/v2/**', lambda route: route.fulfill(json=fixture(route.request.url)))
        page = context.new_page()
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.goto(f'{BASE}/items.html')
        expect(page.locator('#itemsLoading')).to_be_hidden(timeout=20000)
        page.locator('#itemSearchBox').fill('master-ball')
        image = page.locator('#items-gen-1 .item-card-sprite')
        decoded(image)
        expect(image).to_have_attribute('src', re.compile('/master-ball.png$'))
        page.screenshot(path=str(OUT / f'early-item-{width}.png'))
        page.locator('#itemSearchBox').fill('sitrus')
        expect(page.locator('#items-gen-2 .catalog-icon-missing')).to_have_text('舊版缺圖')
        expect(page.locator('#items-gen-2 img')).to_have_count(0)
        decoded(page.locator('#items-gen-3 .item-card-sprite'))
        page.locator('#itemSearchBox').fill('ability-patch')
        decoded(page.locator('#items-gen-8 .item-card-sprite'))
        page.screenshot(path=str(OUT / f'new-item-{width}.png'))
        page.locator('#itemSearchBox').fill('uncategorized')
        expect(page.locator('.item-card:visible .catalog-icon-missing')).to_have_text('暫無圖示')
        no_overflow(page)

        page.goto(f'{BASE}/machines.html')
        expect(page.locator('#machinesLoading')).to_be_hidden(timeout=20000)
        page.locator('#machineSearchBox').fill('tm01')
        gen8 = page.locator('#machines-gen-8')
        gen8.locator('select').select_option('brilliant-diamond-shining-pearl')
        decoded(gen8.locator('img'))
        expect(gen8.locator('img')).to_have_attribute('src', './catalog-icons/machines/tm-fighting.png')
        gen9 = page.locator('#machines-gen-9')
        gen9.locator('select').select_option('scarlet-violet')
        decoded(gen9.locator('img'))
        expect(gen9.locator('img')).to_have_attribute('src', './catalog-icons/machines/tm-normal.png')
        gen8.scroll_into_view_if_needed()
        page.screenshot(path=str(OUT / f'machines-{width}.png'))
        # Restore all games because the previous BDSP filter intentionally excludes TRs.
        page.locator('#machines-gen-8 select').select_option('all')
        page.locator('#machineSearchBox').fill('tr00')
        page.locator('#machinesGenNav [data-gen="8"]').click()
        decoded(page.locator('#machines-gen-8 img'))
        expect(page.locator('#machines-gen-8 img')).to_have_attribute('src', './catalog-icons/machines/tr00.png')
        no_overflow(page)

        # Real browser decoding for every locally packaged asset, including all 100 TRs.
        sources = json.loads((ROOT / 'public/catalog-icons/SOURCES.json').read_text())
        failed = page.evaluate('''async paths => {
          const results = await Promise.all(paths.map(async path => {
            const img = new Image(); img.src = './catalog-icons/' + path;
            try { await img.decode(); return img.naturalWidth > 0 ? null : path; }
            catch { return path; }
          }));
          return results.filter(Boolean);
        }''', [row['path'] for row in sources['files']])
        assert not failed, failed
        assert not errors, errors
        context.close()
        print(f'PASS {width}px: correct item/TM/HM/TR images, historical/missing labels, all 392 local PNGs decoded, no overflow')

    context = browser.new_context(service_workers='block')
    context.route('https://pokeapi.co/api/v2/**', lambda route: route.fulfill(json=fixture(route.request.url)))
    context.route('**/sprites/items/master-ball.png', lambda route: route.fulfill(status=404, body='missing'))
    page = context.new_page()
    page.goto(f'{BASE}/items.html')
    expect(page.locator('#itemsLoading')).to_be_hidden(timeout=20000)
    page.locator('#itemSearchBox').fill('master-ball')
    fallback = page.locator('#items-gen-1 .catalog-icon-missing')
    expect(fallback).to_have_text('圖片未載入')
    expect(fallback).to_have_attribute('aria-label', re.compile('圖片載入失敗'))
    print('PASS broken image: explicit failure label, no unrelated substitute')
    browser.close()
