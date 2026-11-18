"""Run against Vite: python tests/backup_browser.py [http://127.0.0.1:5173].

備份與還原：匯出下載、清空後匯入（合併／取代）、收藏篩選即時更新、錯誤檔案提示。
"""
import json
import sys
import tempfile
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:5173'
SEED = {
    'pokedex_favorites': [25, 6, 10034],
    'pokedex_team_ids': [6, 9, 3],
    'pokedex_guide_progress': {'red-blue': {'main': ['b:gym:1', 'b:gym:2']}},
}

with sync_playwright() as p, tempfile.TemporaryDirectory() as tmp:
    browser = p.chromium.launch(headless=True)
    for width, height in [(1440, 900), (390, 844)]:
        context = browser.new_context(viewport={'width': width, 'height': height}, service_workers='block',
                                      accept_downloads=True)
        context.route('https://pokeapi.co/**', lambda route: route.abort())
        context.route('https://raw.githubusercontent.com/**', lambda route: route.abort())
        page = context.new_page()
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.goto(BASE)
        page.evaluate("seed => { for (const [k, v] of Object.entries(seed)) localStorage.setItem(k, JSON.stringify(v)); }", SEED)
        page.reload()
        expect(page.locator('.pokemon-card')).to_have_count(1025, timeout=10000)

        def open_dialog():
            if width < 768:
                page.locator('#menuBtn').click()
            page.locator('#backupBtn').click()
            dialog = page.locator('#backupDialog')
            expect(dialog).to_be_visible()
            return dialog

        # 匯出
        dialog = open_dialog()
        expect(dialog.locator('#backupCurrent')).to_have_text('收藏 3 隻、隊伍 3 隻、攻略進度 2 項')
        box = dialog.bounding_box()
        assert abs(box['x'] - (width - box['x'] - box['width'])) <= 2, f'dialog not centred: {box}'
        with page.expect_download() as info:
            dialog.locator('#backupExport').click()
        download = info.value
        assert download.suggested_filename.startswith('pokedex-backup-') and download.suggested_filename.endswith('.json')
        path = Path(tmp) / f'backup-{width}.json'
        download.save_as(path)
        data = json.loads(path.read_text(encoding='utf-8'))
        assert data['app'] == 'pokedex' and data['version'] == 1, data
        assert data['favorites'] == [25, 6, 10034] and data['team'] == [6, 9, 3], data
        assert data['guideProgress'] == SEED['pokedex_guide_progress'], data
        page.keyboard.press('Escape')
        expect(dialog).not_to_be_visible()

        # 清空後匯入（合併）：收藏篩選立即反映
        page.evaluate("Object.keys(localStorage).filter(k => k.startsWith('pokedex_')).forEach(k => localStorage.removeItem(k)); localStorage.setItem('pokedex_favorites', '[1]')")
        page.reload()
        expect(page.locator('.pokemon-card')).to_have_count(1025, timeout=10000)
        if width < 768:
            page.locator('#menuBtn').click()
        page.locator('#favoritesFilter').click()
        if width < 768:
            page.locator('#sidebarOverlay').click(position={'x': width - 5, 'y': 200})
        expect(page.locator('.pokemon-card')).to_have_count(1)
        dialog = open_dialog()
        expect(dialog.locator('#backupApply')).to_be_disabled()
        dialog.locator('#backupFile').set_input_files(str(path))
        expect(dialog.locator('#backupPreviewText')).to_contain_text('收藏 3 隻、隊伍 3 隻、攻略進度 2 項')
        dialog.locator('#backupApply').click()
        expect(dialog.locator('#backupStatus')).to_contain_text('已合併')
        expect(dialog.locator('#backupCurrent')).to_have_text('收藏 4 隻、隊伍 3 隻、攻略進度 2 項')
        page.keyboard.press('Escape')
        expect(page.locator('.pokemon-card')).to_have_count(3)  # 1、6、25（形態 10034 未顯示）
        saved = page.evaluate("({ fav: JSON.parse(localStorage.getItem('pokedex_favorites')), team: JSON.parse(localStorage.getItem('pokedex_team_ids')), prog: JSON.parse(localStorage.getItem('pokedex_guide_progress')) })")
        assert saved['fav'] == [1, 25, 6, 10034] and saved['team'] == [6, 9, 3], saved
        assert saved['prog'] == SEED['pokedex_guide_progress'], saved

        # 取代（需確認）
        dialog = open_dialog()
        dialog.locator('#backupFile').set_input_files(str(path))
        dialog.locator('input[name="backupMode"][value="replace"]').check()
        page.once('dialog', lambda d: d.accept())
        dialog.locator('#backupApply').click()
        expect(dialog.locator('#backupStatus')).to_contain_text('已取代')
        expect(dialog.locator('#backupCurrent')).to_have_text('收藏 3 隻、隊伍 3 隻、攻略進度 2 項')

        # 錯誤檔案
        bad = Path(tmp) / 'bad.json'
        bad.write_text(json.dumps({'app': 'something-else'}), encoding='utf-8')
        dialog.locator('#backupFile').set_input_files(str(bad))
        expect(dialog.locator('#backupStatus')).to_contain_text('不是本站匯出的備份檔')
        expect(dialog.locator('#backupApply')).to_be_disabled()
        dialog.locator('[data-backup-close]').click()
        expect(dialog).not_to_be_visible()

        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), 'Horizontal overflow'
        assert not errors, errors
        print(f'PASS {width}x{height}: export download, merge import, live favorites filter, replace with confirm, invalid file')
        context.close()
    browser.close()
