/**
 * 備份與還原：把收藏、隊伍、攻略進度匯出成 JSON 檔，或從檔案匯入（合併或取代）。
 * 全部在瀏覽器內處理，不會上傳任何資料。
 */
import { getFavorites, setFavorites } from '../state/store.js';
import { getTeamIds, setTeamIds } from '../state/team.js';
import { PROGRESS_STORAGE_KEY, parseProgress } from '../utils/guideProgress.js';
import { closeMobileSidebar } from './sidebar.js';
import {
  buildBackup, parseBackup, applyBackup, describeData, backupFileName,
} from '../utils/backup.js';

let pending = null;
let onRestored = null;

function readCurrent() {
  let guideProgress = {};
  try {
    guideProgress = parseProgress(localStorage.getItem(PROGRESS_STORAGE_KEY));
  } catch { /* 讀不到時視為空 */ }
  return { favorites: getFavorites(), team: getTeamIds(), guideProgress };
}

function writeData(data) {
  setFavorites(data.favorites);
  setTeamIds(data.team);
  localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(data.guideProgress));
}

const $ = (id) => document.getElementById(id);

function setStatus(text, kind = 'info') {
  const el = $('backupStatus');
  el.textContent = text;
  el.dataset.kind = kind;
}

function refreshCurrent() {
  $('backupCurrent').textContent = describeData(readCurrent());
}

function resetImport() {
  pending = null;
  $('backupFile').value = '';
  $('backupPreview').hidden = true;
  $('backupApply').disabled = true;
}

function exportBackup() {
  const now = new Date();
  const backup = buildBackup(readCurrent(), now);
  const blob = new Blob([`${JSON.stringify(backup, null, 2)}\n`], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = backupFileName(now);
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  setStatus(`已匯出：${a.download}（${describeData(backup)}）`, 'ok');
}

async function readFile(file) {
  if (!file) return;
  resetImport();
  let text;
  try {
    text = await file.text();
  } catch {
    setStatus('無法讀取這個檔案', 'error');
    return;
  }
  const result = parseBackup(text);
  if (!result.ok) {
    setStatus(`無法匯入：${result.error}`, 'error');
    return;
  }
  pending = result.data;
  const when = pending.exportedAt ? new Date(pending.exportedAt) : null;
  const whenText = when && !Number.isNaN(when.getTime())
    ? `（匯出於 ${when.toLocaleString('zh-TW', { hour12: false })}）` : '';
  $('backupPreviewText').textContent = `檔案內容：${describeData(pending)}${whenText}`;
  $('backupPreview').hidden = false;
  $('backupApply').disabled = false;
  setStatus('');
}

function applyImport() {
  if (!pending) return;
  const mode = document.querySelector('input[name="backupMode"]:checked')?.value || 'merge';
  if (mode === 'replace' && !window.confirm('取代會清除目前的收藏、隊伍與攻略進度，改成備份檔的內容。確定嗎？')) return;
  const next = applyBackup(readCurrent(), pending, mode);
  try {
    writeData(next);
  } catch {
    setStatus('儲存失敗：瀏覽器空間不足或封鎖了本機儲存', 'error');
    return;
  }
  resetImport();
  refreshCurrent();
  setStatus(`${mode === 'replace' ? '已取代' : '已合併'}，目前：${describeData(next)}`, 'ok');
  onRestored?.();
}

function ensureDialog() {
  if ($('backupDialog')) return $('backupDialog');
  const dialog = document.createElement('dialog');
  dialog.id = 'backupDialog';
  dialog.className = 'backup-dialog';
  dialog.setAttribute('aria-labelledby', 'backupTitle');
  dialog.innerHTML = `
    <div class="backup-head">
      <h2 id="backupTitle">備份與還原</h2>
      <button type="button" class="backup-close" data-backup-close aria-label="關閉">×</button>
    </div>
    <p class="backup-intro">收藏、隊伍與攻略進度只存在這台裝置的瀏覽器裡。匯出成檔案後，可以在其他裝置或瀏覽器匯入；資料不會上傳到任何地方。</p>
    <p class="backup-current">目前：<strong id="backupCurrent"></strong></p>

    <section class="backup-section" aria-labelledby="backupExportTitle">
      <h3 id="backupExportTitle">匯出</h3>
      <button type="button" class="backup-btn backup-btn--primary" id="backupExport">下載備份檔（.json）</button>
    </section>

    <section class="backup-section" aria-labelledby="backupImportTitle">
      <h3 id="backupImportTitle">匯入</h3>
      <label class="backup-file">
        <span>選擇備份檔</span>
        <input type="file" id="backupFile" accept=".json,application/json">
      </label>
      <div class="backup-preview" id="backupPreview" hidden>
        <p id="backupPreviewText"></p>
        <fieldset class="backup-modes">
          <legend class="sr-only">匯入方式</legend>
          <label><input type="radio" name="backupMode" value="merge" checked> 合併：保留目前資料，再加上檔案中的內容</label>
          <label><input type="radio" name="backupMode" value="replace"> 取代：清除目前資料，改用檔案內容</label>
        </fieldset>
      </div>
      <button type="button" class="backup-btn" id="backupApply" disabled>匯入</button>
    </section>

    <p class="backup-status" id="backupStatus" role="status" aria-live="polite"></p>`;
  document.body.appendChild(dialog);

  dialog.addEventListener('click', (e) => {
    if (e.target === dialog || e.target.closest('[data-backup-close]')) dialog.close();
  });
  $('backupExport').addEventListener('click', exportBackup);
  $('backupFile').addEventListener('change', (e) => readFile(e.target.files?.[0]));
  $('backupApply').addEventListener('click', applyImport);
  dialog.addEventListener('close', () => {
    resetImport();
    setStatus('');
  });
  return dialog;
}

export function openBackupDialog() {
  // 手機版從側欄開啟時先收起側欄，匯入後關閉對話框就能直接看到更新的網格
  closeMobileSidebar();
  const dialog = ensureDialog();
  refreshCurrent();
  if (!dialog.open) dialog.showModal();
}

/** @param {{ onRestored?: () => void }} options 匯入完成後（例如重新套用收藏篩選） */
export function initBackup(options = {}) {
  onRestored = options.onRestored || null;
  $('backupBtn')?.addEventListener('click', openBackupDialog);
}
