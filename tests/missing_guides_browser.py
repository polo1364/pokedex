"""End-to-end checks for newly authored walkthroughs, navigation, maps and branch cards."""
import json, subprocess
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'output/guide-review/missing-guides/browser'
OUT.mkdir(parents=True,exist_ok=True)
parts=[('gold-silver','kanto'),('crystal','kanto'),('diamond-pearl','battle-zone'),('platinum','distortion-world'),('platinum','battle-frontier'),('heartgold-soulsilver','kanto'),('brilliant-diamond-shining-pearl','battle-zone'),('omega-ruby-alpha-sapphire','delta-episode'),('ultra-sun-ultra-moon','ultra-wormhole'),('sword-shield','isle-of-armor'),('sword-shield','crown-tundra'),('scarlet-violet','teal-mask'),('scarlet-violet','indigo-disk'),('legends-za','mega-dimension'),('legends-za','main'),('scarlet-violet','main')]
data=json.loads(subprocess.check_output(['node','--input-type=module','-e',"import {getVersionGuide} from './src/data/versionGuides/index.js';import {getExpansionMap,getGuideMap} from './src/data/versionGuides/guideMaps.js';const parts="+json.dumps(parts)+";console.log(JSON.stringify(parts.map(([version,part])=>{const g=getVersionGuide(version),p=part==='main'?g:g.expansions.find(e=>e.id===part);return {version,part,sections:p.sections,battles:part==='main'&&version==='scarlet-violet'?g.adventureBattles:(p.gyms||[]),map:part==='main'?getGuideMap(version):getExpansionMap(part,version)}})))"],cwd=ROOT,encoding='utf-8'))
results=[]
with sync_playwright() as pw:
    browser=pw.chromium.launch()
    for width in [1440,390,320]:
        page=browser.new_page(viewport={'width':width,'height':1000 if width==1440 else 844})
        errors=[]
        page.on('pageerror',lambda error:errors.append(str(error)))
        for entry in data:
            version,part=entry['version'],entry['part']
            if width==320 and version not in ['legends-za','scarlet-violet','sword-shield']:continue
            url=f'http://127.0.0.1:5173/guide.html?version={version}&part={part}'
            page.goto(url)
            expect(page.locator('.guide-page-empty')).to_have_count(0)
            expect(page.locator('.guide-sources a')).not_to_have_count(0)
            expect(page.locator('iframe.guide-atlas-frame')).to_have_count(1)
            frame=page.frame_locator('iframe.guide-atlas-frame')
            expect(frame.locator('#version')).to_have_value(version)
            if entry['map'].get('mapId'):expect(frame.locator('#region')).to_have_value(entry['map']['mapId'])
            chapters=[s for s in entry['sections'] if s['type']=='island']
            nav=page.locator('.guide-chapter-nav')
            expect(nav).to_have_count(1)
            nav.locator('summary').click()
            expect(nav.locator('a')).to_have_count(len(chapters))
            nav.locator('a').last.click()
            last=page.locator(f'#expansion-section-{version if part=="main" else part}-{chapters[-1]["number"]}')
            expect(last).to_be_in_viewport()
            assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),(version,part,width,'chapter overflow')
            branches=0
            for battle in entry['battles']:
                prefix='adventure' if version=='scarlet-violet' and part=='main' else ('gym' if part=='main' else f'expansion:{part}')
                ref=f"{prefix}:{battle['order']}"
                detail=page.locator(f'.guide-battle-detail[data-battle-ref="{ref}"]')
                expect(detail).to_have_count(1)
                toggle=detail.locator('..').locator('.guide-battle-toggle')
                if not detail.is_visible():toggle.click()
                expect(detail).to_be_visible()
                variants=battle.get('variants',[])
                if variants:
                    panels=detail.locator('.guide-variant-panel');expect(panels).to_have_count(len(variants))
                    for i,variant in enumerate(variants):
                        panel=panels.nth(i)
                        if panel.get_attribute('open') is None:panel.locator('summary').click()
                        expect(panel.locator('.guide-party-grid-row')).to_have_count(len(variant['party']))
                        branches+=1
                else:expect(detail.locator('.guide-party-grid-row')).to_have_count(len(battle.get('party',[])))
                assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),(version,part,width,ref,'battle overflow')
                toggle.click()
            # Direct links survive reload and select the intended expansion card.
            if entry['battles']:
                page.goto(url+'&battle='+ref)
                expect(page.locator(f'.guide-battle-detail[data-battle-ref="{ref}"]')).to_be_visible()
            else:page.goto(url+'#'+last.get_attribute('id'))
            if (version,part) in [('legends-za','main'),('legends-za','mega-dimension'),('sword-shield','isle-of-armor'),('scarlet-violet','indigo-disk')]:
                page.locator('.guide-expansion-island').first.screenshot(path=str(OUT/f'{version}-{part}-{width}.png'))
            assert not errors,(version,part,errors)
            result={'version':version,'part':part,'width':width,'chapters':len(chapters),'battles':len(entry['battles']),'branches':branches}
            results.append(result);print(json.dumps(result),flush=True)
        page.close()
    browser.close()
(OUT/'results.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
print('PASS',len(results),'views',sum(r['battles'] for r in results),'battle panels',sum(r['branches'] for r in results),'branches')
