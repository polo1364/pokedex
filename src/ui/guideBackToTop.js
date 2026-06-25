const SCROLL_THRESHOLD = 320;

let btn = null;
let bound = false;

export function initGuideBackToTop() {
  if (!document.body.classList.contains('guide-page-body')) return;

  if (!btn) {
    btn = document.getElementById('guideBackToTop');
    if (!btn) {
      btn = document.createElement('button');
      btn.type = 'button';
      btn.id = 'guideBackToTop';
      btn.className = 'guide-back-to-top';
      btn.setAttribute('aria-label', '返回上方');
      btn.textContent = '↑';
      document.body.appendChild(btn);
    }

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (!bound) {
    window.addEventListener('scroll', updateGuideBackToTop, { passive: true });
    bound = true;
  }

  updateGuideBackToTop();
}

export function updateGuideBackToTop() {
  if (!btn) return;
  const modalOpen = document.body.classList.contains('guide-chat-modal-open');
  btn.hidden = modalOpen || window.scrollY < SCROLL_THRESHOLD;
}
