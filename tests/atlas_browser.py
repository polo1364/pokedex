"""Offline-data browser coverage for every atlas region, desktop and phone."""
import json
import sys
import subprocess
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

ROOT=Path(__file__).resolve().parents[1]
DATA=json.loads((ROOT/'public/atlas/atlas-data.json').read_text(encoding='utf-8'))
BASE=sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:5173'
OUT=ROOT/'output/map-previews/qa'
OUT.mkdir(exist_ok=True)
results=[]
catalog=json.loads(subprocess.check_output(['node','--input-type=module','-e',"import {GUIDE_VERSIONS,getVersionGuide} from './src/data/versionGuides/index.js';import {getExpansionMap} from './src/data/versionGuides/guideMaps.js';console.log(JSON.stringify(GUIDE_VERSIONS.map(v=>({id:v.id,expansions:(getVersionGuide(v.id).expansions||[]).map(e=>({id:e.id,...getExpansionMap(e.id,v.id)}))}))))"],cwd=ROOT,encoding='utf-8'))
integrations=0
def assert_readable(page,context):
    minimum=page.locator('#map').evaluate("""map=>Math.min(...[...map.querySelectorAll('text')].map(n=>parseFloat(n.getAttribute('font-size'))*n.getScreenCTM().a))""")
    assert minimum>=13.9,(context,'screen font below 14px',minimum)
    assert page.locator('#map [textLength]').count()==0,(context,'compressed text')
    overflow=page.locator('#map').evaluate("""map=>[...map.querySelectorAll('[data-label]')].flatMap(label=>{
      const box=label.querySelector('rect').getBBox();
      return [...label.querySelectorAll('text')].filter(text=>{const t=text.getBBox();return t.x<box.x-1||t.y<box.y-1||t.x+t.width>box.x+box.width+1||t.y+t.height>box.y+box.height+1;}).map(n=>n.textContent);
    })""")
    assert not overflow,(context,'text outside label',overflow)

with sync_playwright() as playwright:
    browser=playwright.chromium.launch()
    for width,height in [(1440,1000),(390,844)]:
        page=browser.new_page(viewport={'width':width,'height':height})
        errors=[]
        page.on('pageerror',lambda error:errors.append(str(error)))
        page.on('response',lambda response: errors.append(f'{response.status} {response.url}') if response.status>=400 and '/atlas/' in response.url else None)
        for version,keys in DATA['versionMaps'].items():
            page.goto(f'{BASE}/atlas/index.html?version={version}')
            page.wait_for_selector('.location')
            for key in keys:
                page.select_option('#region',key)
                expect(page.locator('#title')).to_have_text(DATA['maps'][key]['title'])
                if DATA['maps'][key].get('layout')=='connections':
                    expect(page.locator('#projection')).to_be_visible()
                    assert page.locator('#map image').count()==0
                    assert page.locator('#map [data-connection]').count()==len(DATA['maps'][key]['connections'])
                else:
                    page.wait_for_function("""async()=>{const image=document.querySelector('#map image');const img=new Image();img.src=image.getAttribute('href');await img.decode();return img.naturalWidth>0;}""")
                assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'), (width,key,'page overflow')
                assert_readable(page,(width,key,'default'))
                page.locator('#fit').click()
                assert_readable(page,(width,key,'fit'))
                assert page.evaluate("document.querySelector('#viewport').scrollHeight<=document.querySelector('#viewport').clientHeight+2"), (width,key,'fit height')
                issues=page.evaluate("""()=>{const labels=[...document.querySelectorAll('[data-label]')].map(n=>n.getBBox());return labels.flatMap((a,i)=>labels.slice(i+1).filter(b=>a.x<b.x+b.width&&a.x+a.width>b.x&&a.y<b.y+b.height&&a.y+a.height>b.y));}""")
                assert not issues,(width,key,'label overlap')
                first=DATA['maps'][key]['locations'][0]
                page.select_option('#place-select',first['id'])
                expect(page.locator('#place-name')).to_have_text(first['name'])
                page.locator('#all-labels').check()
                assert_readable(page,(width,key,'all labels'))
                assert not page.evaluate("""()=>{const a=[...document.querySelectorAll('[data-label]')].map(n=>n.getBBox());return a.some((r,i)=>a.slice(i+1).some(s=>r.x<s.x+s.width&&r.x+r.width>s.x&&r.y<s.y+s.height&&r.y+r.height>s.y));}"""),(width,key,'all-label overlap')
                page.locator('#all-labels').uncheck()
                marker=page.locator('.location').first
                marker.focus();marker.press('Enter')
                page.locator('#zoom').click()
                assert page.locator('#canvas').evaluate('(n)=>n.clientWidth')==2200
                assert_readable(page,(width,key,'zoom'))
                page.locator('#fit').click()
                if key in ['gold-silver','emerald','x-y','sun-moon-akala','paldea','galar','isle-of-armor','crown-tundra','battle-zone','platinum-battle-frontier','delta-episode','distortion-world','ultra-wormhole']:
                    page.screenshot(path=str(OUT/f'{key}-{width}.png'),full_page=True)
                results.append({'width':width,'version':version,'map':key,'status':'PASS'})
        assert not errors,errors
        # Integration: guide pages keep the atlas and the existing battle cards.
        for version in DATA['versionMaps']:
            page.goto(f'{BASE}/guide.html?version={version}')
            frame=page.locator('iframe.guide-atlas-frame')
            expect(frame).to_have_count(1)
            frame.scroll_into_view_if_needed()
            expect(page.frame_locator('iframe.guide-atlas-frame').locator('#title')).not_to_have_text('分版地圖集')
            assert_readable(page.frame_locator('iframe.guide-atlas-frame'),(width,version,'embedded'))
            assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),(width,version,'guide overflow')
            integrations+=1
        # Every catalog expansion must render even when its strategy is pending.
        for version in catalog:
            for expansion in version['expansions']:
                page.goto(f'{BASE}/guide.html?version={version["id"]}&part={expansion["id"]}')
                frame=page.locator('iframe.guide-atlas-frame')
                if 'mapId' not in expansion:
                    expect(frame).to_have_count(0)
                    expect(page.locator('.guide-chapter-nav')).to_have_count(1)
                    continue
                expect(frame).to_have_count(1)
                frame.scroll_into_view_if_needed()
                inner=page.frame_locator('iframe.guide-atlas-frame')
                expect(inner.locator('#region')).to_have_value(expansion['mapId'])
                expect(inner.locator('#version')).to_have_value(version['id'])
                assert_readable(inner,(width,version['id'],expansion['id']))
                assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),(width,version['id'],expansion['id'],'guide overflow')
                integrations+=1
        page.select_option('#guideVersionSelect','legends-za')
        frame=page.locator('iframe.guide-atlas-frame');frame.scroll_into_view_if_needed()
        expect(page.frame_locator('iframe.guide-atlas-frame').locator('#region')).to_have_value('lumiose-za')
        # Actual atlas links must open the intended existing guide card/section.
        page.goto(f'{BASE}/atlas/index.html?version=emerald')
        page.wait_for_selector('.location')
        gym=next(p for p in DATA['maps']['emerald']['locations'] if p.get('gymOrder')==1)
        page.select_option('#place-select',gym['id'])
        page.locator('#battle-link').click()
        expect(page.locator('.guide-battle-detail[data-battle-ref="gym:1"]')).to_be_visible()
        for version,part,key in [('firered-leafgreen','sevii','sevii'),('emerald','battle-frontier','battle-frontier'),('legends-arceus','daybreak','hisui-daybreak')]:
            page.goto(f'{BASE}/guide.html?version={version}&part={part}')
            frame=page.locator('iframe.guide-atlas-frame');frame.scroll_into_view_if_needed()
            inner=page.frame_locator('iframe.guide-atlas-frame')
            expect(inner.locator('#title')).to_have_text(DATA['maps'][key]['title'])
            linked=next(p for p in DATA['maps'][key]['locations'] if p.get('guideSection'))
            inner.locator('#place-select').select_option(linked['id'])
            inner.locator('#battle-link').click()
            section=f'#expansion-section-{part}-{linked["guideSection"]}'
            expect(page.locator(section)).to_be_visible()
        page.close()
    page=browser.new_page()
    page.goto((ROOT/'output/map-previews/index.html').as_uri())
    expect(page.locator('#version option')).to_have_count(len(DATA['versionMaps']))
    page.select_option('#version','scarlet-violet')
    expect(page.locator('#title')).to_have_text('帕底亞')
    page.locator('#search').fill('Glaseado Gym')
    expect(page.locator('#place-name')).to_have_text('霜抹山道館')
    page.select_option('#version','sword-shield')
    page.select_option('#region','isle-of-armor')
    expect(page.locator('#title')).to_have_text('鎧之孤島')
    page.wait_for_function("""async()=>{const img=new Image();img.src=document.querySelector('#map image').getAttribute('href');await img.decode();return img.naturalWidth>0;}""")
    page.select_option('#version','platinum')
    page.select_option('#region','distortion-world')
    expect(page.locator('#projection')).to_be_visible()
    assert page.locator('#map [data-connection]').count()==7
    browser.close()
(OUT/'browser-results.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
print(f'PASS: {len(results)} atlas views, {integrations} guide integrations, 8 guide/expansion links, Z-A selection, and offline preview')
