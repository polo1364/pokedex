const DEFAULT_THRESHOLD = 320;

const instances = new Map();

export function initBackToTop({
  bodyClass,
  buttonId,
  buttonClass = 'back-to-top',
  threshold = DEFAULT_THRESHOLD,
  isHidden = () => false,
} = {}) {
  if (bodyClass && !document.body.classList.contains(bodyClass)) return;

  const key = buttonId || bodyClass || 'default';
  if (instances.has(key)) {
    updateBackToTop(key);
    return;
  }

  let btn = buttonId ? document.getElementById(buttonId) : null;
  if (!btn) {
    btn = document.createElement('button');
    btn.type = 'button';
    if (buttonId) btn.id = buttonId;
    btn.className = buttonClass;
    btn.setAttribute('aria-label', '返回上方');
    btn.textContent = '↑';
    document.body.appendChild(btn);
  }

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const onScroll = () => updateBackToTop(key);
  window.addEventListener('scroll', onScroll, { passive: true });

  instances.set(key, { btn, threshold, isHidden });
  updateBackToTop(key);
}

export function updateBackToTop(key = 'default') {
  const state = instances.get(key);
  if (!state?.btn) return;
  state.btn.hidden = state.isHidden() || window.scrollY < state.threshold;
}

export function initGuideBackToTop() {
  initBackToTop({
    bodyClass: 'guide-page-body',
    buttonId: 'guideBackToTop',
    buttonClass: 'guide-back-to-top back-to-top',
    isHidden: () => document.body.classList.contains('guide-chat-modal-open'),
  });
}

export function updateGuideBackToTop() {
  updateBackToTop('guideBackToTop');
}

export function initItemsBackToTop() {
  initBackToTop({
    bodyClass: 'items-page-body',
    buttonId: 'itemsBackToTop',
    buttonClass: 'items-back-to-top back-to-top',
  });
}

export function initMachinesBackToTop() {
  initBackToTop({
    bodyClass: 'machines-page-body',
    buttonId: 'machinesBackToTop',
    buttonClass: 'machines-back-to-top back-to-top',
    isHidden: () => document.body.classList.contains('learners-modal-open')
      || document.body.classList.contains('machines-type-drawer-open'),
  });
}

export function updateMachinesBackToTop() {
  updateBackToTop('machinesBackToTop');
}
