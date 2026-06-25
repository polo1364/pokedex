import { typeColors, typeNamesCN } from '../config.js';
import { findMoveLearners } from '../data/moveLearners.js';
import { escapeHtml } from '../utils/infoCards.js';
import { ensurePokemonDetailModal, showDetail } from './modal.js';
import { updateMachinesBackToTop } from './backToTop.js';

let modalEl = null;
let isOpen = false;
let lastFocusEl = null;
let activeRequestId = 0;
/** @type {AbortController | null} */
let activeController = null;

function renderTypeLine(types) {
  if (!types?.length) return '—';
  return types.map((typeKey) => {
    const color = typeColors[typeKey] || '#888';
    const label = typeNamesCN[typeKey] || typeKey;
    return `<span class="learners-chip-type" style="color:${color}">${escapeHtml(label)}</span>`;
  }).join('<span class="learners-chip-type-sep">·</span>');
}

function renderLearnersList(learners) {
  if (!learners.length) {
    return '<p class="learners-modal-empty">沒有寶可夢可透過招式機學會此招式</p>';
  }

  return `<div class="learners-modal-grid" role="list">
    ${learners.map((learner) => `
      <button type="button" class="learners-chip-btn" role="listitem" data-pokemon-id="${learner.id}"
        aria-label="${escapeHtml(learner.chineseName)}">
        <span class="learners-chip-name">${escapeHtml(learner.chineseName)}</span>
        <span class="learners-chip-types">${renderTypeLine(learner.types)}</span>
      </button>
    `).join('')}
  </div>`;
}

function formatProgress({ phase, done, total, pct }) {
  if (phase === 'bootstrap') {
    return `正在載入寶可夢索引… ${pct ?? 0}% (${done}/${total})`;
  }
  return `正在比對可學習寶可夢… (${done}/${total})`;
}

function setLoadingState(message) {
  const body = modalEl?.querySelector('.learners-modal-body');
  if (!body) return;
  body.innerHTML = `
    <div class="learners-modal-loading">
      <div class="loader"></div>
      <p class="learners-modal-progress">${escapeHtml(message)}</p>
    </div>
  `;
}

function setResultState({ count, learners, moveSlug }) {
  const body = modalEl?.querySelector('.learners-modal-body');
  const footer = modalEl?.querySelector('.learners-modal-footer');
  if (!body) return;

  body.innerHTML = `
    <p class="learners-modal-count">共 ${count} 隻寶可夢可學習</p>
    ${renderLearnersList(learners)}
  `;

  if (footer) {
    footer.innerHTML = count
      ? `<a href="./index.html?tm=${encodeURIComponent(moveSlug)}" class="learners-modal-dex-link">在主圖鑑中篩選 →</a>`
      : '';
  }
}

export function initMachineLearnersModal() {
  if (modalEl) return;

  modalEl = document.createElement('div');
  modalEl.id = 'learners-modal';
  modalEl.className = 'learners-modal';
  modalEl.hidden = true;
  modalEl.setAttribute('role', 'dialog');
  modalEl.setAttribute('aria-modal', 'true');
  modalEl.setAttribute('aria-labelledby', 'learners-modal-title');
  modalEl.innerHTML = `
    <div class="learners-modal-backdrop" data-close="1"></div>
    <div class="learners-modal-panel">
      <header class="learners-modal-header">
        <div class="learners-modal-heading">
          <h2 id="learners-modal-title" class="learners-modal-title"></h2>
          <p class="learners-modal-subtitle"></p>
        </div>
        <button type="button" class="learners-modal-close" aria-label="關閉">×</button>
      </header>
      <div class="learners-modal-body"></div>
      <footer class="learners-modal-footer"></footer>
    </div>
  `;

  modalEl.querySelector('.learners-modal-close')?.addEventListener('click', closeMachineLearnersModal);
  modalEl.querySelector('.learners-modal-backdrop')?.addEventListener('click', closeMachineLearnersModal);
  modalEl.querySelector('.learners-modal-body')?.addEventListener('click', onLearnerClick);
  document.body.appendChild(modalEl);
  document.addEventListener('keydown', onDocumentKeydown);
}

async function onLearnerClick(e) {
  const btn = e.target.closest('.learners-chip-btn');
  if (!btn) return;
  const id = parseInt(btn.dataset.pokemonId, 10);
  if (!id) return;
  ensurePokemonDetailModal();
  await showDetail(id);
}

export async function openMachineLearnersModal({ moveName, moveSlug, displayLabel, typeLabel }) {
  initMachineLearnersModal();
  if (!modalEl || !moveSlug) return;

  activeController?.abort();
  activeController = new AbortController();
  const requestId = ++activeRequestId;
  const { signal } = activeController;

  lastFocusEl = document.activeElement;
  isOpen = true;
  modalEl.hidden = false;
  document.body.classList.add('learners-modal-open');
  updateMachinesBackToTop();

  modalEl.querySelector('.learners-modal-title').textContent = `可學習「${moveName || moveSlug}」的寶可夢`;
  const subtitleParts = [displayLabel, typeLabel ? `屬性 ${typeLabel}` : ''].filter(Boolean);
  modalEl.querySelector('.learners-modal-subtitle').textContent = subtitleParts.join(' · ');
  modalEl.querySelector('.learners-modal-footer').innerHTML = '';
  setLoadingState('正在比對可學習寶可夢…');

  try {
    const result = await findMoveLearners(
      { moveSlug },
      {
        signal,
        onProgress: (progress) => {
          if (requestId !== activeRequestId) return;
          setLoadingState(formatProgress(progress));
        },
      },
    );

    if (requestId !== activeRequestId || signal.aborted) return;
    setResultState({ ...result, moveSlug });
  } catch (err) {
    if (requestId !== activeRequestId || signal.aborted) return;
    console.error(err);
    setLoadingState('載入失敗，請稍後再試');
  }
}

export function closeMachineLearnersModal() {
  if (!modalEl || modalEl.hidden) return;

  activeController?.abort();
  activeController = null;
  activeRequestId += 1;
  isOpen = false;
  modalEl.hidden = true;
  document.body.classList.remove('learners-modal-open');
  updateMachinesBackToTop();
  lastFocusEl?.focus?.();
}

function onDocumentKeydown(e) {
  if (e.key !== 'Escape' || !isOpen) return;
  if (document.getElementById('modal')?.classList.contains('active')) return;
  e.preventDefault();
  closeMachineLearnersModal();
}
