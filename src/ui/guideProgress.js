/**
 * 攻略進度勾選：在攻略頁渲染完成後，替可完成的項目加上勾選按鈕，並在頂端顯示進度。
 * 可勾選：對戰卡片（道館、四天王、劇情戰）、章節／島嶼／設施區塊、委託卡片。
 * 進度存在 localStorage，依「版本 + 部分」分開記錄。
 */
import {
  PROGRESS_STORAGE_KEY, HIDE_DONE_STORAGE_KEY,
  parseProgress, getDoneKeys, setDone, resetPart, summarize, uniquifyKeys,
} from '../utils/guideProgress.js';

let progress = loadProgress();
let current = null; // { versionId, partId, content, items: [{key, el, title}] }

function loadProgress() {
  try {
    return parseProgress(localStorage.getItem(PROGRESS_STORAGE_KEY));
  } catch {
    return {};
  }
}

function saveProgress() {
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  } catch { /* 無法儲存時本次瀏覽仍可使用 */ }
}

function loadHideDone() {
  try {
    return localStorage.getItem(HIDE_DONE_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

function saveHideDone(on) {
  try {
    localStorage.setItem(HIDE_DONE_STORAGE_KEY, on ? '1' : '0');
  } catch { /* 忽略 */ }
}

/** 找出頁面上可勾選的項目與其基礎代碼、顯示名稱。 */
function collectItems(content) {
  const found = [];
  content.querySelectorAll('.guide-timeline-item').forEach((el) => {
    const ref = el.querySelector('.guide-battle-detail')?.dataset.battleRef;
    if (!ref) return;
    const name = el.querySelector('.guide-opponent-name')?.textContent?.trim() || ref;
    const role = el.querySelector('.guide-opponent-role')?.textContent?.trim();
    found.push({ el, base: `b:${ref}`, title: role ? `${role} ${name}` : name, kind: 'battle' });
  });
  content.querySelectorAll('article.guide-expansion-island[id]').forEach((el) => {
    const title = el.querySelector('.guide-expansion-island-title')?.textContent?.trim() || el.id;
    found.push({ el, base: `c:${el.id}`, title, kind: 'chapter' });
  });
  content.querySelectorAll('.guide-expansion-request[data-request-number]').forEach((el) => {
    const title = el.dataset.requestTitle || `委託 ${el.dataset.requestNumber}`;
    found.push({ el, base: `r:${el.dataset.requestNumber}`, title: `委託 ${el.dataset.requestNumber}：${title}`, kind: 'request' });
  });
  const keys = uniquifyKeys(found.map((f) => f.base));
  return found.map((f, i) => ({ ...f, key: keys[i] }));
}

function buttonHtml(done, title) {
  const label = done ? `標記為未完成：${title}` : `標記為已完成：${title}`;
  return `<span class="guide-done-check" aria-hidden="true">${done ? '✓' : ''}</span>`
    + `<span class="sr-only">${label.replace(/[<>&"]/g, '')}</span>`;
}

function createToggle(item, done) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = `guide-done-toggle guide-done-toggle--${item.kind}`;
  btn.dataset.progressKey = item.key;
  btn.setAttribute('aria-pressed', String(done));
  btn.title = done ? '已完成（點一下取消）' : '標記為已完成';
  btn.innerHTML = buttonHtml(done, item.title);
  btn.addEventListener('click', (e) => {
    // 不要觸發卡片本身的展開、提示框或捲動
    e.preventDefault();
    e.stopPropagation();
    toggleItem(item.key);
  });
  btn.addEventListener('keydown', (e) => e.stopPropagation());
  return btn;
}

function placeToggle(item, btn) {
  if (item.kind === 'battle') {
    const marker = item.el.querySelector('.guide-timeline-marker');
    const index = marker?.querySelector('.guide-timeline-index');
    if (index) index.insertAdjacentElement('afterend', btn);
    else (marker || item.el).appendChild(btn);
  } else if (item.kind === 'chapter') {
    (item.el.querySelector('.guide-expansion-island-header') || item.el).appendChild(btn);
  } else {
    (item.el.querySelector('.guide-expansion-request-header') || item.el).appendChild(btn);
  }
}

function applyItemState(item, done) {
  item.el.classList.toggle('is-done', done);
  const btn = item.el.querySelector(`.guide-done-toggle[data-progress-key="${CSS.escape(item.key)}"]`);
  if (!btn) return;
  btn.setAttribute('aria-pressed', String(done));
  btn.title = done ? '已完成（點一下取消）' : '標記為已完成';
  btn.innerHTML = buttonHtml(done, item.title);
}

function toggleItem(key) {
  if (!current) return;
  const done = getDoneKeys(progress, current.versionId, current.partId).has(key);
  progress = setDone(progress, current.versionId, current.partId, key, !done);
  saveProgress();
  const item = current.items.find((i) => i.key === key);
  if (item) applyItemState(item, !done);
  renderSummary();
}

function renderSummary() {
  const bar = current?.bar;
  if (!bar) return;
  const { total, completed, percent } = summarize(progress, current.versionId, current.partId, current.items.map((i) => i.key));
  bar.querySelector('.guide-progress-text').textContent = `已完成 ${completed} / ${total}`;
  bar.querySelector('.guide-progress-fill').style.width = `${percent}%`;
  bar.querySelector('.guide-progress-meter').setAttribute('aria-valuenow', String(percent));
  bar.querySelector('.guide-progress-percent').textContent = `${percent}%`;
  bar.classList.toggle('is-complete', total > 0 && completed === total);
  bar.querySelector('[data-progress-reset]').disabled = completed === 0;
}

function createSummaryBar() {
  const bar = document.createElement('section');
  bar.className = 'guide-progress-bar';
  bar.setAttribute('aria-label', '攻略進度');
  const hideDone = loadHideDone();
  bar.innerHTML = `
    <div class="guide-progress-head">
      <span class="guide-progress-title">我的進度</span>
      <span class="guide-progress-text"></span>
      <span class="guide-progress-percent"></span>
    </div>
    <div class="guide-progress-meter" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-label="完成百分比">
      <span class="guide-progress-fill"></span>
    </div>
    <div class="guide-progress-actions">
      <label class="guide-progress-hide"><input type="checkbox" data-progress-hide ${hideDone ? 'checked' : ''}> 隱藏已完成</label>
      <button type="button" class="guide-progress-reset" data-progress-reset>重設此部分進度</button>
    </div>
    <p class="guide-progress-hint">點對戰、章節或委託旁的圓圈即可標記完成；進度只存在這台裝置的瀏覽器。</p>`;

  bar.querySelector('[data-progress-hide]').addEventListener('change', (e) => {
    saveHideDone(e.target.checked);
    current?.content.classList.toggle('guide-hide-done', e.target.checked);
  });
  bar.querySelector('[data-progress-reset]').addEventListener('click', () => {
    if (!current) return;
    const label = current.partLabel ? `「${current.partLabel}」` : '這個部分';
    if (!window.confirm(`確定要清除${label}的所有完成紀錄嗎？`)) return;
    progress = resetPart(progress, current.versionId, current.partId);
    saveProgress();
    current.items.forEach((item) => applyItemState(item, false));
    renderSummary();
  });
  return bar;
}

/**
 * 在攻略內容渲染完成後呼叫。
 * @param {HTMLElement} content `.guide-part-content`
 * @param {{ versionId: string, partId: string, partLabel?: string }} context
 */
export function decorateGuideProgress(content, { versionId, partId, partLabel = '' }) {
  if (!content) return;
  progress = loadProgress();
  const items = collectItems(content);
  current = { versionId, partId, partLabel, content, items, bar: null };
  if (!items.length) return;

  const done = getDoneKeys(progress, versionId, partId);
  items.forEach((item) => {
    const isDone = done.has(item.key);
    placeToggle(item, createToggle(item, isDone));
    item.el.classList.toggle('is-done', isDone);
  });

  const bar = createSummaryBar();
  current.bar = bar;
  content.prepend(bar);
  content.classList.toggle('guide-hide-done', loadHideDone());
  renderSummary();
}
