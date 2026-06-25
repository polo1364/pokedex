/** @type {HTMLDivElement | null} */
let floatEl = null;
/** @type {HTMLElement | null} */
let activeTarget = null;
let initialized = false;
/** @type {number | undefined} */
let hideTimer;

function ensureFloatTip() {
  if (floatEl) return floatEl;
  floatEl = document.createElement('div');
  floatEl.id = 'guide-annotate-float-tip';
  floatEl.className = 'guide-annotate-float-tip';
  floatEl.setAttribute('role', 'tooltip');
  floatEl.hidden = true;
  document.body.appendChild(floatEl);
  return floatEl;
}

function reposition() {
  if (!activeTarget || !floatEl || floatEl.hidden) return;

  const anchor = activeTarget.getBoundingClientRect();
  floatEl.style.visibility = 'hidden';
  floatEl.hidden = false;
  const tip = floatEl.getBoundingClientRect();
  floatEl.style.visibility = '';

  const margin = 12;
  const gap = 10;
  let top = anchor.top - tip.height - gap;
  let placement = 'top';

  if (top < margin) {
    top = anchor.bottom + gap;
    placement = 'bottom';
  }

  let left = anchor.left + anchor.width / 2 - tip.width / 2;
  left = Math.max(margin, Math.min(left, window.innerWidth - tip.width - margin));

  const maxTop = window.innerHeight - tip.height - margin;
  top = Math.max(margin, Math.min(top, maxTop));

  floatEl.style.left = `${Math.round(left)}px`;
  floatEl.style.top = `${Math.round(top)}px`;
  floatEl.dataset.placement = placement;
}

function showTip(el) {
  const tipNode = el.querySelector('.guide-annotate-tip');
  if (!tipNode) return;

  clearTimeout(hideTimer);
  activeTarget = el;
  const tip = ensureFloatTip();
  tip.textContent = tipNode.textContent;
  tip.hidden = false;
  reposition();
}

function hideTip() {
  hideTimer = window.setTimeout(() => {
    activeTarget = null;
    if (floatEl) floatEl.hidden = true;
  }, 60);
}

function onPointerOver(e) {
  const el = e.target.closest?.('.guide-annotate');
  if (!el) return;
  showTip(el);
}

function onPointerOut(e) {
  const el = e.target.closest?.('.guide-annotate');
  if (!el) return;
  const next = e.relatedTarget?.closest?.('.guide-annotate');
  if (next) {
    showTip(next);
    return;
  }
  if (e.relatedTarget && el.contains(e.relatedTarget)) return;
  hideTip();
}

function onFocusIn(e) {
  const el = e.target.closest?.('.guide-annotate');
  if (el) showTip(el);
}

function onFocusOut(e) {
  const el = e.target.closest?.('.guide-annotate');
  if (!el) return;
  const next = e.relatedTarget?.closest?.('.guide-annotate');
  if (next) showTip(next);
  else hideTip();
}

/** 以 fixed 浮層顯示註解，避免表格 overflow 裁切 */
export function initGuideAnnotateTooltips() {
  if (initialized) return;
  initialized = true;
  ensureFloatTip();

  document.addEventListener('pointerover', onPointerOver, true);
  document.addEventListener('pointerout', onPointerOut, true);
  document.addEventListener('focusin', onFocusIn, true);
  document.addEventListener('focusout', onFocusOut, true);
  window.addEventListener('scroll', reposition, true);
  window.addEventListener('resize', reposition);
}
