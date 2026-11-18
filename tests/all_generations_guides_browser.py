"""Exercise corrected guides and version branches at desktop and phone widths."""
import json, subprocess
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'output/guide-review/all-generations/browser'
OUT.mkdir(parents=True,exist_ok=True)
catalog=json.loads(subprocess.check_output(['node','--input-type=module','-e',"import {getAllGuideVersions,getVersionGuide,getLeagueOpponents} from './src/data/versionGuides/index.js';console.log(JSON.stringify(getAllGuideVersions().filter(v=>v.displayGeneration>1&&v.id!=='legends-za').map(v=>{const g=getVersionGuide(v.id);return {id:v.id,gyms:g.gyms,nobles:g.nobles||[],opponents:getLeagueOpponents(g).map(o=>({...o,variants:g.league?.battles?.[o.battleRef]?.variants||o.battle.variants||[]}))}})))"],cwd=ROOT,encoding='utf-8'))
results=[]
with sync_playwright() as pw:
    browser=pw.chromium.launch()
    for width in [1440,390,320]:
        page=browser.new_page(viewport={'width':width,'height':1000 if width==1440 else 844})
        errors=[]
        page.on('pageerror',lambda e:errors.append(str(e)))
        for guide in catalog:
            if width==320 and guide['id'] not in ['black-white','ultra-sun-ultra-moon','sword-shield','scarlet-violet']:continue
            page.goto(f"http://127.0.0.1:5173/guide.html?version={guide['id']}")
            expect(page.locator('iframe.guide-atlas-frame')).to_have_count(1)
            battles=[(f"gym:{b['order']}",b,b.get('variants',[])) for b in guide['gyms']]
            battles += [(f"noble:{b['order']}",b,b.get('variants',[])) for b in guide['nobles']]
            battles += [(o['battleRef'],o['battle'],o['variants']) for o in guide['opponents']]
            opened=0; branches=0
            for ref,battle,variants in battles:
                detail=page.locator(f'.guide-battle-detail[data-battle-ref="{ref}"]')
                expect(detail).to_have_count(1)
                toggle=detail.locator('..').locator('.guide-battle-toggle')
                if not detail.is_visible():toggle.click()
                expect(detail).to_be_visible()
                if variants:
                    panels=detail.locator('.guide-variant-panel')
                    expect(panels).to_have_count(len(variants))
                    for i,variant in enumerate(variants):
                        panel=panels.nth(i)
                        if panel.get_attribute('open') is None:panel.locator('summary').click()
                        expected=variant.get('party',battle.get('party',[]))
                        expect(panel.locator('.guide-party-grid-row')).to_have_count(len(expected))
                        for row,mon in zip(panel.locator('.guide-party-grid-row').all(),expected):
                            assert mon['name'] in row.inner_text(), (guide['id'],ref,mon)
                            if mon.get('level'):expect(row.locator('.guide-level')).to_have_text(f"Lv.{mon['level']}")
                        branches+=1
                        assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),(guide['id'],ref,width,'branch overflow')
                else:
                    rows=detail.locator('.guide-party-grid-row')
                    expect(rows).to_have_count(len(battle.get('party',[])))
                    for row,mon in zip(rows.all(),battle.get('party',[])):
                        assert mon['name'] in row.inner_text()
                        if mon.get('teraType'):assert '太晶：' in row.inner_text()
                assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),(guide['id'],ref,width,'overflow')
                names=detail.locator('.guide-party-grid-name')
                if names.count():assert min(names.evaluate_all('(nodes)=>nodes.map(n=>parseFloat(getComputedStyle(n).fontSize))'))>=16
                if (guide['id'],ref) in [('platinum','gym:3'),('sword-shield','gym:4'),('black-white','story:1'),('scarlet-violet','gym:3'),('sun-moon','champion')]:
                    detail.locator('..').screenshot(path=str(OUT/f"{guide['id']}-{ref.replace(':','-')}-{width}.png"))
                toggle.click();opened+=1
            assert not errors,(guide['id'],errors)
            results.append({'version':guide['id'],'width':width,'battles':opened,'branches':branches})
            print(guide['id'],width,opened,branches,flush=True)
        page.close()
    # New story refs must also resolve when opened directly.
    page=browser.new_page(viewport={'width':390,'height':844})
    for version,ref in [('black-white','story:1'),('sword-shield','eliteFour:6'),('ultra-sun-ultra-moon','gym:12'),('platinum','gym:3')]:
        page.goto(f'http://127.0.0.1:5173/guide.html?version={version}&battle={ref}')
        expect(page.locator(f'.guide-battle-detail[data-battle-ref="{ref}"]')).to_be_visible()
    browser.close()
(OUT/'results.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
print(f"PASS {len(results)} views; {sum(r['battles'] for r in results)} battle panels; {sum(r['branches'] for r in results)} branch panels")
