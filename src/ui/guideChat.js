import { sendGuideChat } from '../api/guideChat.js';
import { isPlaceholder } from '../data/versionGuides/index.js';
import { loadChatHistory, saveChatHistory } from '../storage/guideChatHistory.js';
import { updateGuideBackToTop } from './guideBackToTop.js';

const ROLE_LABELS = {
  user: '你',
  assistant: '攻略助手',
  error: '系統',
  loading: '攻略助手',
};

/** @type {Map<string, { role: string, content: string }[]>} */
const chatSessions = new Map();

let fabEl = null;
let modalEl = null;
let mountEl = null;
let currentVersionId = null;
let currentPartId = 'main';
let currentPartLabel = '本體';
let currentDisabled = true;
let isModalOpen = false;
let lastFocusEl = null;
/** @type {(() => void) | null} */
let unbindChatUi = null;

export function initGuideChat() {
  if (fabEl) return;

  fabEl = document.createElement('button');
  fabEl.type = 'button';
  fabEl.id = 'guide-chat-fab';
  fabEl.className = 'guide-chat-fab';
  fabEl.hidden = true;
  fabEl.setAttribute('aria-label', '開啟 AI 攻略問答');
  fabEl.innerHTML = `
    <span class="guide-chat-fab-icon" aria-hidden="true">✦</span>
    <span class="guide-chat-fab-label">AI 問答</span>
  `;
  fabEl.addEventListener('click', openModal);

  modalEl = document.createElement('div');
  modalEl.id = 'guide-chat-modal';
  modalEl.className = 'guide-chat-modal';
  modalEl.hidden = true;
  modalEl.setAttribute('role', 'dialog');
  modalEl.setAttribute('aria-modal', 'true');
  modalEl.setAttribute('aria-labelledby', 'guide-chat-modal-title');
  modalEl.innerHTML = `
    <div class="guide-chat-backdrop" data-close="1"></div>
    <div class="guide-chat-panel">
      <header class="guide-chat-modal-header">
        <div class="guide-chat-modal-heading">
          <span class="guide-chat-icon" aria-hidden="true">✦</span>
          <div>
            <h2 id="guide-chat-modal-title" class="guide-chat-title">AI 攻略問答</h2>
            <p class="guide-chat-desc">依本版本完整攻略回答（道館、聯盟、隊伍、打法等）</p>
          </div>
        </div>
        <button type="button" class="guide-chat-close" aria-label="關閉">×</button>
      </header>
      <div class="guide-chat-mount"></div>
    </div>
  `;

  mountEl = modalEl.querySelector('.guide-chat-mount');
  modalEl.querySelector('.guide-chat-close')?.addEventListener('click', closeModal);
  modalEl.querySelector('.guide-chat-backdrop')?.addEventListener('click', closeModal);

  document.body.appendChild(fabEl);
  document.body.appendChild(modalEl);

  document.addEventListener('keydown', onDocumentKeydown);
}

/**
 * @param {string} versionId
 * @param {boolean} disabled
 * @param {string} [partId='main']
 * @param {string} [partLabel='本體']
 */
export async function setGuideChatVersion(versionId, disabled, partId = 'main', partLabel = '本體') {
  initGuideChat();
  currentVersionId = versionId;
  currentPartId = partId || 'main';
  currentPartLabel = partLabel || '本體';
  currentDisabled = disabled || isPlaceholder(versionId);

  if (fabEl) {
    fabEl.hidden = currentDisabled;
  }
  updateGuideBackToTop();

  const descEl = modalEl?.querySelector('.guide-chat-desc');
  if (descEl && !currentDisabled) {
    const scopeHint = currentPartId === 'main'
      ? '僅依本體攻略作答，不引用其他版本'
      : `目前瀏覽「${currentPartLabel}」；僅依本版本本體與 DLC 作答，不引用其他版本`;
    descEl.textContent = scopeHint;
  }

  if (!chatSessions.has(versionId)) {
    const history = currentDisabled ? [] : await loadChatHistory(versionId);
    chatSessions.set(versionId, history);
  }

  if (isModalOpen && mountEl) {
    mountGuideChat(mountEl, versionId, currentDisabled);
  }
}

function openModal() {
  if (!currentVersionId || currentDisabled) return;
  initGuideChat();
  isModalOpen = true;
  lastFocusEl = document.activeElement;
  modalEl.hidden = false;
  fabEl?.classList.add('is-hidden');
  document.body.classList.add('guide-chat-modal-open');
  updateGuideBackToTop();
  mountGuideChat(mountEl, currentVersionId, currentDisabled);
  requestAnimationFrame(() => {
    modalEl.querySelector('.guide-chat-input')?.focus();
  });
}

function closeModal() {
  if (!modalEl || modalEl.hidden) return;
  isModalOpen = false;
  modalEl.hidden = true;
  fabEl?.classList.remove('is-hidden');
  document.body.classList.remove('guide-chat-modal-open');
  updateGuideBackToTop();
  unbindChatUi?.();
  unbindChatUi = null;
  lastFocusEl?.focus?.();
}

function onDocumentKeydown(e) {
  if (e.key === 'Escape' && isModalOpen) {
    e.preventDefault();
    closeModal();
  }
}

/**
 * @param {HTMLElement} mount
 * @param {string} versionId
 * @param {boolean} disabled
 */
function mountGuideChat(mount, versionId, disabled) {
  if (!mount) return;

  unbindChatUi?.();
  unbindChatUi = null;

  const sessionKey = versionId;
  if (!chatSessions.has(sessionKey)) {
    chatSessions.set(sessionKey, []);
  }

  const placeholder = disabled || isPlaceholder(versionId);
  const messages = chatSessions.get(sessionKey);

  mount.innerHTML = `
    <div class="guide-chat guide-chat-in-modal">
      ${placeholder ? '<p class="guide-chat-disabled-hint">此版本攻略準備中，暫無法使用 AI 問答</p>' : ''}
      <div class="guide-chat-messages" role="log" aria-live="polite"></div>
      <div class="guide-chat-input-row">
        <textarea class="guide-chat-input" rows="2" placeholder="例如：小火龍開局聯盟怎麼組隊？小霞道館帶什麼？" ${placeholder ? 'disabled' : ''}></textarea>
        <button type="button" class="guide-chat-send" ${placeholder ? 'disabled' : ''}>送出</button>
      </div>
    </div>
  `;

  if (placeholder) return;

  const messagesEl = mount.querySelector('.guide-chat-messages');
  const input = mount.querySelector('.guide-chat-input');
  const sendBtn = mount.querySelector('.guide-chat-send');

  function persist() {
    saveChatHistory(versionId, messages);
  }

  function renderMessages() {
    if (messages.length === 0) {
      messagesEl.innerHTML = '<p class="guide-chat-empty">有攻略疑問？可問道館、聯盟、隊伍編成、打法等，在下方輸入後送出。紀錄會保留在本機。</p>';
      return;
    }

    messagesEl.innerHTML = messages.map((m) => {
      const label = ROLE_LABELS[m.role] || '';
      const body = m.role === 'assistant'
        ? formatAssistantText(m.content)
        : escapeHtml(m.content).replace(/\n/g, '<br>');
      return `<div class="guide-chat-msg ${m.role}">
        <span class="guide-chat-role">${label}</span>
        <div class="guide-chat-bubble">${body}</div>
      </div>`;
    }).join('');
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function showLoading() {
    messagesEl.insertAdjacentHTML('beforeend', `
      <div class="guide-chat-msg loading" aria-busy="true">
        <span class="guide-chat-role">${ROLE_LABELS.loading}</span>
        <div class="guide-chat-bubble">
          <span class="guide-chat-typing"><span></span><span></span><span></span></span>
          思考中…
        </div>
      </div>`);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function removeLoading() {
    messagesEl.querySelector('.guide-chat-msg.loading')?.remove();
  }

  renderMessages();

  async function submit() {
    const text = input.value.trim();
    if (!text || sendBtn.disabled) return;
    input.value = '';
    messages.push({ role: 'user', content: text });
    persist();
    renderMessages();
    sendBtn.disabled = true;
    input.disabled = true;
    showLoading();

    try {
      const reply = await sendGuideChat({
        versionId,
        partId: currentPartId,
        messages: messages.filter((m) => m.role === 'user' || m.role === 'assistant').map((m) => ({
          role: m.role,
          content: m.content,
        })),
      });
      messages.push({ role: 'assistant', content: reply });
      persist();
    } catch (err) {
      messages.push({ role: 'error', content: err.message || '問答失敗，請稍後再試' });
    } finally {
      removeLoading();
      sendBtn.disabled = false;
      input.disabled = false;
      renderMessages();
      input.focus();
    }
  }

  const onSend = () => submit();
  const onKeydown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  sendBtn.addEventListener('click', onSend);
  input.addEventListener('keydown', onKeydown);
  unbindChatUi = () => {
    sendBtn.removeEventListener('click', onSend);
    input.removeEventListener('keydown', onKeydown);
  };
}

function formatAssistantText(text) {
  const blocks = text.split(/\n\n+/).filter(Boolean);
  return blocks.map((block) => {
    const lines = block.split('\n');
    const isList = lines.every((l) => /^[-•*]\s/.test(l.trim()) || /^\d+[.)]\s/.test(l.trim()));
    if (isList && lines.length > 1) {
      const items = lines.map((l) => {
        const item = l.replace(/^[-•*]\s|^\d+[.)]\s/, '').trim();
        return `<li>${formatInline(escapeHtml(item))}</li>`;
      }).join('');
      return `<ul class="guide-chat-list">${items}</ul>`;
    }
    const inner = formatInline(escapeHtml(block)).replace(/\n/g, '<br>');
    return `<p>${inner}</p>`;
  }).join('');
}

function formatInline(s) {
  return s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
