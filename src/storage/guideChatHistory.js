import { get, set } from 'idb-keyval';

const PREFIX = 'guide_chat_history_';

/** @typedef {{ role: 'user' | 'assistant', content: string }} ChatMessage */

/**
 * @param {string} versionId
 * @returns {Promise<ChatMessage[]>}
 */
export async function loadChatHistory(versionId) {
  try {
    const data = await get(PREFIX + versionId);
    if (!Array.isArray(data)) return [];
    return data.filter(
      (m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string',
    );
  } catch {
    return [];
  }
}

/**
 * @param {string} versionId
 * @param {ChatMessage[]} messages
 */
export async function saveChatHistory(versionId, messages) {
  try {
    const toSave = messages.filter((m) => m.role === 'user' || m.role === 'assistant');
    await set(PREFIX + versionId, toSave);
  } catch (e) {
    console.warn('攻略問答紀錄儲存失敗:', e);
  }
}
