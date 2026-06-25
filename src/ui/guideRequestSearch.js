/** @type {HTMLElement | null} */
let rootEl = null;
/** @type {(() => void) | null} */
let unbind = null;

const CATEGORY_LABELS = {
  main: '本體 1～88',
  postgame: '傳說 89～94',
  daybreak: '黎明 95～107',
  path: '單隻之道 108～122',
};

function normalizeText(text) {
  return String(text || '').toLowerCase().replace(/\s+/g, ' ').trim();
}

function buildSearchText(card) {
  const parts = [
    card.dataset.requestNumber,
    card.dataset.requestTitle,
    card.dataset.searchExtra || '',
  ];
  return normalizeText(parts.join(' '));
}

function labelChipClass(label) {
  if (label === '地點') return 'place';
  if (label === '目標') return 'goal';
  if (label === '解法' || label.startsWith('詳細流程')) return 'solution';
  if (label === '注意' || label === '難點') return 'warn';
  if (label === '條件' || label === '建議等級') return 'condition';
  return 'default';
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightText(text, tokens) {
  if (!tokens.length || !text) return escapeHtml(text);
  const pattern = tokens.map(escapeRegExp).join('|');
  const re = new RegExp(`(${pattern})`, 'gi');
  return escapeHtml(text).replace(re, '<mark class="guide-request-mark">$1</mark>');
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function cardMatches(card, query, category) {
  const cat = card.dataset.requestCategory;
  if (category && category !== 'all' && cat !== category) return false;

  const num = card.dataset.requestNumber || '';
  const tokens = query ? normalizeText(query).split(/\s+/).filter(Boolean) : [];
  if (!tokens.length) return true;

  const searchText = card.dataset.searchText || buildSearchText(card);

  return tokens.every((t) => {
    if (/^\d+$/.test(t)) return num === t;
    return searchText.includes(t);
  });
}

function applyFilter(guide) {
  if (!guide) return;

  const input = guide.querySelector('.guide-requests-search-input');
  const countEl = guide.querySelector('.guide-requests-count');
  const emptyEl = guide.querySelector('.guide-requests-empty');
  const query = input?.value.trim() || '';
  const activeChip = guide.querySelector('.guide-requests-cat-chip.active');
  const category = activeChip?.dataset.cat || 'all';
  const tokens = query ? normalizeText(query).split(/\s+/).filter(Boolean) : [];
  const hasFilter = Boolean(query) || category !== 'all';

  const cards = guide.querySelectorAll('.guide-expansion-request');
  let visible = 0;

  cards.forEach((card) => {
    const match = cardMatches(card, query, category);
    card.hidden = !match;
    if (match) {
      visible += 1;
      if (tokens.length) {
        const titleEl = card.querySelector('.guide-expansion-request-title');
        if (titleEl && card.dataset.requestTitle) {
          titleEl.innerHTML = highlightText(card.dataset.requestTitle, tokens);
        }
      }
    } else if (card.dataset.requestTitle) {
      const titleEl = card.querySelector('.guide-expansion-request-title');
      if (titleEl) titleEl.textContent = card.dataset.requestTitle;
    }
  });

  guide.querySelectorAll('.guide-requests-block').forEach((block) => {
    const anyVisible = block.querySelector('.guide-expansion-request:not([hidden])');
    block.hidden = !anyVisible;
  });

  guide.querySelectorAll('.guide-requests-meta').forEach((meta) => {
    meta.hidden = hasFilter;
  });

  if (countEl) {
    countEl.textContent = hasFilter ? `顯示 ${visible} / 122` : '共 122 筆委託';
  }
  if (emptyEl) {
    emptyEl.hidden = visible > 0 || !hasFilter;
  }

  const url = new URL(location.href);
  if (query) url.searchParams.set('q', query);
  else url.searchParams.delete('q');
  if (category !== 'all') url.searchParams.set('cat', category);
  else url.searchParams.delete('cat');
  history.replaceState(null, '', url);
}

function focusFirstVisible(guide) {
  const first = guide.querySelector('.guide-expansion-request:not([hidden])');
  if (first) {
    first.focus({ preventScroll: true });
    first.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

/**
 * @param {HTMLElement} guide
 */
export function initGuideRequestSearch(guide) {
  destroyGuideRequestSearch();
  if (!guide?.classList.contains('guide-expansion-guide--requests')) return;

  rootEl = guide;
  const input = guide.querySelector('.guide-requests-search-input');
  const clearBtn = guide.querySelector('.guide-requests-search-clear');
  if (!input) return;

  guide.querySelectorAll('.guide-expansion-request').forEach((card) => {
    card.dataset.searchText = buildSearchText(card);
  });

  const params = new URLSearchParams(location.search);
  const q = params.get('q');
  const cat = params.get('cat');
  if (q) input.value = q;
  if (cat) {
    guide.querySelectorAll('.guide-requests-cat-chip').forEach((chip) => {
      chip.classList.toggle('active', chip.dataset.cat === cat);
    });
  }

  let debounceTimer;
  const onInput = () => {
    clearBtn.hidden = !input.value;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => applyFilter(guide), 120);
  };

  const onClear = () => {
    input.value = '';
    clearBtn.hidden = true;
    applyFilter(guide);
    input.focus();
  };

  const onKeydown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      applyFilter(guide);
      focusFirstVisible(guide);
    }
  };

  const onChipClick = (e) => {
    const chip = e.target.closest('.guide-requests-cat-chip');
    if (!chip) return;
    guide.querySelectorAll('.guide-requests-cat-chip').forEach((c) => c.classList.remove('active'));
    chip.classList.add('active');
    applyFilter(guide);
  };

  input.addEventListener('input', onInput);
  input.addEventListener('keydown', onKeydown);
  clearBtn?.addEventListener('click', onClear);
  guide.querySelector('.guide-requests-cat-filters')?.addEventListener('click', onChipClick);

  unbind = () => {
    clearTimeout(debounceTimer);
    input.removeEventListener('input', onInput);
    input.removeEventListener('keydown', onKeydown);
    clearBtn?.removeEventListener('click', onClear);
    guide.querySelector('.guide-requests-cat-filters')?.removeEventListener('click', onChipClick);
  };

  applyFilter(guide);
}

export function destroyGuideRequestSearch() {
  unbind?.();
  unbind = null;
  rootEl = null;
}

export { labelChipClass, CATEGORY_LABELS };
