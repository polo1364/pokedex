/**
 * 攻略進度（純函式）：每個版本、每個部分各自記錄已完成的項目代碼。
 * 資料形狀：{ [versionId]: { [partId]: string[] } }
 */
export const PROGRESS_STORAGE_KEY = 'pokedex_guide_progress';
export const HIDE_DONE_STORAGE_KEY = 'pokedex_guide_hide_done';

const MAX_KEY_LENGTH = 120;

function isValidKey(key) {
  return typeof key === 'string' && key.length > 0 && key.length <= MAX_KEY_LENGTH;
}

/** 解析儲存內容；格式不符的部分丟棄，避免壞資料讓攻略頁出錯。 */
export function parseProgress(raw) {
  let data;
  try {
    data = typeof raw === 'string' ? JSON.parse(raw) : raw;
  } catch {
    return {};
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) return {};
  const out = {};
  for (const [version, parts] of Object.entries(data)) {
    if (!parts || typeof parts !== 'object' || Array.isArray(parts)) continue;
    for (const [part, keys] of Object.entries(parts)) {
      if (!Array.isArray(keys)) continue;
      const clean = [...new Set(keys.filter(isValidKey))];
      if (clean.length) {
        out[version] ||= {};
        out[version][part] = clean;
      }
    }
  }
  return out;
}

export function getDoneKeys(progress, versionId, partId) {
  return new Set(progress?.[versionId]?.[partId] || []);
}

/** 回傳新的進度物件（不修改原物件）。 */
export function setDone(progress, versionId, partId, key, done) {
  if (!isValidKey(key)) return progress;
  const keys = getDoneKeys(progress, versionId, partId);
  if (done) keys.add(key);
  else keys.delete(key);
  const next = { ...progress, [versionId]: { ...(progress[versionId] || {}) } };
  if (keys.size) next[versionId][partId] = [...keys];
  else delete next[versionId][partId];
  if (!Object.keys(next[versionId]).length) delete next[versionId];
  return next;
}

export function resetPart(progress, versionId, partId) {
  if (!progress?.[versionId]?.[partId]) return progress;
  const next = { ...progress, [versionId]: { ...progress[versionId] } };
  delete next[versionId][partId];
  if (!Object.keys(next[versionId]).length) delete next[versionId];
  return next;
}

/**
 * 統計目前頁面上的項目中有幾個已完成（舊版攻略資料移除的項目不計入）。
 * @param {string[]} pageKeys 本頁可勾選的項目代碼
 */
export function summarize(progress, versionId, partId, pageKeys) {
  const done = getDoneKeys(progress, versionId, partId);
  const total = pageKeys.length;
  const completed = pageKeys.filter((k) => done.has(k)).length;
  return { total, completed, percent: total ? Math.round((completed / total) * 100) : 0 };
}

/**
 * 同一頁面出現多次相同基礎代碼時加上序號（第 2 次起為 key~2），讓每個項目都有唯一且穩定的代碼。
 * @param {string[]} baseKeys
 */
export function uniquifyKeys(baseKeys) {
  const seen = new Map();
  return baseKeys.map((key) => {
    const n = (seen.get(key) || 0) + 1;
    seen.set(key, n);
    return n === 1 ? key : `${key}~${n}`;
  });
}
