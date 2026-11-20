"""Click the new atlas links through the embedded map into real guide content."""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]
atlas = json.loads((ROOT/'public/atlas/atlas-data.json').read_text(encoding='utf-8'))
cases = [
    ('gold-silver','kanto','gold-silver-kanto','seafoam-islands'),
    ('crystal','kanto','crystal-kanto','cerulean-city'),
    ('heartgold-soulsilver','kanto','heartgold-soulsilver-kanto','viridian-city'),
    ('diamond-pearl','battle-zone','battle-zone','battle-tower'),
    ('brilliant-diamond-shining-pearl','battle-zone','brilliant-diamond-shining-pearl','stark-mountain'),
    ('platinum','battle-frontier','platinum-battle-frontier','hall'),
    ('platinum','distortion-world','distortion-world','giratina'),
    ('omega-ruby-alpha-sapphire','delta-episode','delta-episode','mapsec_sky_pillar'),
    ('ultra-sun-ultra-moon','ultra-wormhole','ultra-wormhole','forest'),
    ('sword-shield','isle-of-armor','isle-of-armor','tower-of-waters'),
    ('sword-shield','crown-tundra','crown-tundra','crown-shrine'),
    ('scarlet-violet','teal-mask','kitakami','dreaded-den'),
    ('scarlet-violet','indigo-disk','terarium','polar-plaza'),
    ('scarlet-violet','main','paldea','titan-ground'),
    ('scarlet-violet','main','paldea','area-zero'),
    ('legends-za','main','lumiose-za','prism-tower'),
]
results=[]
with sync_playwright() as pw:
    browser=pw.chromium.launch()
    for width in [1440,390]:
        page=browser.new_page(viewport={'width':width,'height':900})
        for version,part,map_id,point_id in cases:
            point=next(p for p in atlas['maps'][map_id]['locations'] if p['id']==point_id)
            page.goto(f'http://127.0.0.1:5173/guide.html?version={version}&part={part}')
            frame=page.frame_locator('iframe.guide-atlas-frame')
            frame.locator('#place-select').select_option(point_id)
            frame.locator('#battle-link').click()
            chapter=f"#expansion-section-{point.get('guideSectionPrefix') or point.get('guidePart')}-{point['guideSection']}"
            expect(page.locator(chapter)).to_have_count(1)
            if point.get('battleRef'):
                expect(page.locator(f'.guide-battle-detail[data-battle-ref="{point["battleRef"]}"]')).to_be_visible()
            else:
                expect(page.locator(chapter)).to_be_in_viewport()
            assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
            results.append({'version':version,'part':part,'map':map_id,'point':point_id,'width':width})
        page.close()
    browser.close()
OUT=ROOT/'output/guide-review/missing-guides/browser'
OUT.mkdir(parents=True,exist_ok=True)
(OUT/'map-link-results.json').write_text(json.dumps(results,indent=2),encoding='utf-8')
print('PASS',len(results),'embedded map links')
