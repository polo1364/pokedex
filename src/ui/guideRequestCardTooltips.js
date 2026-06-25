/** @type {HTMLDivElement | null} */
let floatEl = null;
/** @type {HTMLElement | null} */
let activeCard = null;
/** @type {(() => void) | null} */
let unbind = null;
/** @type {number | undefined} */
let hideTimer;

function ensureFloatTip() {
  if (floatEl) return floatEl;
  floatEl = document.createElement('div');
  floatEl.id = 'guide-request-float-tip';
  floatEl.className = 'guide-request-float-tip';
  floatEl.setAttribute('role', 'tooltip');
  floatEl.hidden = true;
  document.body.appendChild(floatEl);
  return floatEl;
}

function reposition() {
  if (!activeCard || !floatEl || floatEl.hidden) return;

  const anchor = activeCard.getBoundingClientRect();
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
  top = Math.max(margin, Math.min(top, window.innerHeight - tip.height - margin));

  floatEl.style.left = `${Math.round(left)}px`;
  floatEl.style.top = `${Math.round(top)}px`;
  floatEl.dataset.placement = placement;
}

function buildTipHtml(card) {
  const num = card.dataset.requestNumber;
  const title = card.dataset.requestTitle || '';
  const hint = card.dataset.hint || '';
  const rowsJson = card.dataset.tooltipRows;
  let rowsHtml = '';
  if (rowsJson) {
    try {
      const rows = JSON.parse(rowsJson);
      rowsHtml = rows.map((r) => `<div class="guide-request-tip-row"><strong>${r.label}</strong> ${r.value}</div>`).join('');
    } catch {
      rowsHtml = '';
    }
  }
  return `<div class="guide-request-tip-title">委託 ${num} ${title}</div>`
    + (hint ? `<div class="guide-request-tip-hint">${hint}</div>` : '')
    + rowsHtml;
}

function showTip(card) {
  clearTimeout(hideTimer);
  activeCard = card;
  const tip = ensureFloatTip();
  tip.innerHTML = buildTipHtml(card);
  tip.hidden = false;
  reposition();
}

function hideTip() {
  hideTimer = window.setTimeout(() => {
    activeCard = null;
    if (floatEl) floatEl.hidden = true;
  }, 80);
}

/**
 * @param {HTMLElement} guide
 */
export function initGuideRequestCardTooltips(guide) {
  destroyGuideRequestCardTooltips();
  if (!guide?.classList.contains('guide-expansion-guide--requests')) return;

  const onOver = (e) => {
    const card = e.target.closest?.('.guide-expansion-request');
    if (!card || !guide.contains(card)) return;
    showTip(card);
  };

  const onOut = (e) => {
    const card = e.target.closest?.('.guide-expansion-request');
    if (!card) return;
    const next = e.relatedTarget?.closest?.('.guide-expansion-request');
    if (next && guide.contains(next)) {
      showTip(next);
      return;
    }
    hideTip();
  };

  const onFocusIn = (e) => {
    const card = e.target.closest?.('.guide-expansion-request');
    if (card && guide.contains(card)) showTip(card);
  };

  const onFocusOut = (e) => {
    const card = e.target.closest?.('.guide-expansion-request');
    if (!card) return;
    const next = e.relatedTarget?.closest?.('.guide-expansion-request');
    if (next && guide.contains(next)) showTip(next);
    else hideTip();
  };

  const onScroll = () => reposition();

  guide.addEventListener('pointerover', onOver);
  guide.addEventListener('pointerout', onOut);
  guide.addEventListener('focusin', onFocusIn);
  guide.addEventListener('focusout', onFocusOut);
  window.addEventListener('scroll', onScroll, true);
  window.addEventListener('resize', onScroll);

  unbind = () => {
    guide.removeEventListener('pointerover', onOver);
    guide.removeEventListener('pointerout', onOut);
    guide.removeEventListener('focusin', onFocusIn);
    guide.removeEventListener('focusout', onFocusOut);
    window.removeEventListener('scroll', onScroll, true);
    window.removeEventListener('resize', onScroll);
    hideTip();
  };
}

export function destroyGuideRequestCardTooltips() {
  unbind?.();
  unbind = null;
  activeCard = null;
  if (floatEl) floatEl.hidden = true;
}
