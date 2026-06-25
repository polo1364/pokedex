/** @type {HTMLDivElement | null} */
let floatEl = null;
/** @type {HTMLElement | null} */
let activeWrap = null;
let globalsBound = false;

function ensureFloatTip() {
  if (floatEl) return floatEl;
  floatEl = document.createElement('div');
  floatEl.id = 'guide-map-float-tip';
  floatEl.className = 'guide-map-tooltip guide-map-float-tooltip';
  floatEl.setAttribute('role', 'tooltip');
  floatEl.hidden = true;
  document.body.appendChild(floatEl);
  return floatEl;
}

function reposition() {
  if (!activeWrap || !floatEl || floatEl.hidden) return;

  const anchor = activeWrap.getBoundingClientRect();
  const placement = activeWrap.dataset.placement || 'top';

  floatEl.style.visibility = 'hidden';
  const tip = floatEl.getBoundingClientRect();
  floatEl.style.visibility = '';

  const margin = 12;
  const gap = 10;
  let top;
  let left;

  switch (placement) {
    case 'bottom':
      top = anchor.bottom + gap;
      left = anchor.left + anchor.width / 2 - tip.width / 2;
      break;
    case 'left':
      top = anchor.top + anchor.height / 2 - tip.height / 2;
      left = anchor.left - tip.width - gap;
      break;
    case 'right':
      top = anchor.top + anchor.height / 2 - tip.height / 2;
      left = anchor.right + gap;
      break;
    default:
      top = anchor.top - tip.height - gap;
      left = anchor.left + anchor.width / 2 - tip.width / 2;
  }

  left = Math.max(margin, Math.min(left, window.innerWidth - tip.width - margin));
  top = Math.max(margin, Math.min(top, window.innerHeight - tip.height - margin));

  floatEl.style.left = `${Math.round(left)}px`;
  floatEl.style.top = `${Math.round(top)}px`;
}

function showForWrap(wrap) {
  const source = wrap.querySelector('.guide-map-tooltip');
  if (!source) return;

  activeWrap = wrap;
  const tip = ensureFloatTip();
  tip.className = `${source.className} guide-map-float-tooltip`;
  tip.innerHTML = source.innerHTML;
  tip.hidden = false;
  reposition();
}

export function hideGuideMapTooltip() {
  activeWrap = null;
  if (floatEl) floatEl.hidden = true;
}

function bindGlobals() {
  if (globalsBound) return;
  globalsBound = true;
  ensureFloatTip();

  document.addEventListener('pointerdown', (e) => {
    if (!e.target.closest('.guide-map-hotspot-wrap')) hideGuideMapTooltip();
  }, true);

  window.addEventListener('scroll', reposition, true);
  window.addEventListener('resize', reposition);
}

/** 綁定單一地圖區塊的熱點 hover（pointerenter/leave，避免殘留） */
export function bindGuideMapTooltips(section) {
  if (!section || section.dataset.mapTooltipBound) return;
  section.dataset.mapTooltipBound = '1';
  bindGlobals();

  section.querySelectorAll('.guide-map-hotspot-wrap').forEach((wrap) => {
    const btn = wrap.querySelector('.guide-map-hotspot');
    if (!btn || btn.dataset.mapTooltipBound) return;
    btn.dataset.mapTooltipBound = '1';

    wrap.addEventListener('pointerenter', () => {
      showForWrap(wrap);
    });

    wrap.addEventListener('pointerleave', () => {
      if (activeWrap === wrap) hideGuideMapTooltip();
    });

    btn.addEventListener('focus', () => {
      showForWrap(wrap);
    });

    btn.addEventListener('blur', () => {
      window.setTimeout(() => {
        if (!wrap.contains(document.activeElement) && activeWrap === wrap) {
          hideGuideMapTooltip();
        }
      }, 0);
    });
  });
}

/** 以 fixed 浮層顯示地圖 tooltip，避免捲動容器 overflow 裁切 */
export function initGuideMapTooltips() {
  bindGlobals();
  document.querySelectorAll('.guide-region-map').forEach(bindGuideMapTooltips);
}
