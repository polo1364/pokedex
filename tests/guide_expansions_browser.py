"""Verify the corrected Frontier/Daybreak pages and all-request search on desktop/mobile."""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

OUT=Path(__file__).resolve().parents[1]/'output/guide-review/all-generations/browser'
results=[]
with sync_playwright() as pw:
    browser=pw.chromium.launch()
    for width in [1440,390]:
        page=browser.new_page(viewport={'width':width,'height':900})
        errors=[]
        page.on('pageerror',lambda error:errors.append(str(error)))
        for version,part,total in [('emerald','battle-frontier',14),('legends-arceus','daybreak',3)]:
            page.goto(f'http://127.0.0.1:5173/guide.html?version={version}&part={part}')
            details=page.locator('.guide-battle-detail')
            expect(details).to_have_count(total)
            for detail in details.all():
                toggle=detail.locator('..').locator('.guide-battle-toggle')
                toggle.click();expect(detail).to_be_visible()
                assert detail.locator('.guide-team-row').count()>0
                assert '道館' not in toggle.inner_text()
                assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),(version,part,width)
                toggle.click()
            results.append({'version':version,'part':part,'width':width,'panels':total})
        page.goto('http://127.0.0.1:5173/guide.html?version=legends-arceus&part=requests')
        cards=page.locator('.guide-expansion-request')
        expect(cards).to_have_count(122)
        search=page.locator('.guide-requests-search-input')
        search.fill('泳圈鼬')
        expect(page.locator('.guide-expansion-request:not([hidden])').filter(has_text='海之傳說')).to_have_count(1)
        assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
        page.screenshot(path=str(OUT/f'pla-request-search-{width}.png'))
        search.fill('')
        expect(page.locator('.guide-expansion-request:not([hidden])')).to_have_count(122)
        assert not errors,errors
        results.append({'version':'legends-arceus','part':'requests','width':width,'requests':122,'search':'PASS'})
        page.close()
    browser.close()
(OUT/'expansion-results.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
print('PASS: 6 expansion views, 34 battle panels, 122 requests and search at both widths')
