/**
 * 個人資料備份（純函式）：收藏、隊伍、攻略進度的匯出、驗證與合併。
 * 檔案格式：{ app: 'pokedex', version: 1, exportedAt, favorites: number[], team: number[], guideProgress: {...} }
 */
import { parseTeamIds, TEAM_SIZE } from './teamAnalysis.js';
import { parseProgress } from './guideProgress.js';

export const BACKUP_APP = 'pokedex';
export const BACKUP_VERSION = 1;
export const MAX_BACKUP_BYTES = 1024 * 1024;
const MAX_POKEMON_ID = 20000;

/** 收藏：正整數 pokemon id（含形態），去重。 */
export function cleanFavorites(list) {
  if (!Array.isArray(list)) return [];
  const out = [];
  for (const v of list) {
    const n = Number(v);
    if (Number.isInteger(n) && n > 0 && n <= MAX_POKEMON_ID && !out.includes(n)) out.push(n);
  }
  return out;
}

export function countProgress(progress) {
  return Object.values(progress || {}).reduce(
    (sum, parts) => sum + Object.values(parts).reduce((s, keys) => s + keys.length, 0), 0,
  );
}

export function buildBackup({ favorites = [], team = [], guideProgress = {} }, now = new Date()) {
  return {
    app: BACKUP_APP,
    version: BACKUP_VERSION,
    exportedAt: now.toISOString(),
    favorites: cleanFavorites(favorites),
    team: parseTeamIds(team.join(',')),
    guideProgress: parseProgress(guideProgress),
  };
}

export function backupFileName(now = new Date()) {
  const pad = (n) => String(n).padStart(2, '0');
  return `pokedex-backup-${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}.json`;
}

/**
 * 解析匯入檔：回傳 { ok, data?, error? }。只接受本站格式；格式內的壞資料會被丟棄而非整份拒絕。
 * @param {string} text
 */
export function parseBackup(text) {
  if (typeof text !== 'string' || !text.trim()) return { ok: false, error: '檔案是空的' };
  if (text.length > MAX_BACKUP_BYTES) return { ok: false, error: '檔案太大，不像是本站的備份檔' };
  let raw;
  try {
    raw = JSON.parse(text);
  } catch {
    return { ok: false, error: '不是有效的 JSON 檔案' };
  }
  if (!raw || typeof raw !== 'object' || Array.isArray(raw) || raw.app !== BACKUP_APP) {
    return { ok: false, error: '不是本站匯出的備份檔' };
  }
  if (typeof raw.version !== 'number' || raw.version > BACKUP_VERSION) {
    return { ok: false, error: '備份檔版本較新，請先更新網站後再匯入' };
  }
  const data = {
    favorites: cleanFavorites(raw.favorites),
    team: parseTeamIds(Array.isArray(raw.team) ? raw.team.join(',') : ''),
    guideProgress: parseProgress(raw.guideProgress),
    exportedAt: typeof raw.exportedAt === 'string' ? raw.exportedAt : '',
  };
  return { ok: true, data };
}

/**
 * 套用匯入資料。
 * - replace：完全以備份檔取代
 * - merge：收藏聯集；隊伍保留目前成員再補上備份中的（最多 6 隻）；攻略進度逐項聯集
 */
export function applyBackup(current, incoming, mode = 'merge') {
  if (mode === 'replace') {
    return {
      favorites: [...incoming.favorites],
      team: [...incoming.team],
      guideProgress: parseProgress(incoming.guideProgress),
    };
  }
  const favorites = cleanFavorites([...(current.favorites || []), ...incoming.favorites]);
  const team = parseTeamIds([...(current.team || []), ...incoming.team].join(','));
  const merged = parseProgress(current.guideProgress || {});
  for (const [version, parts] of Object.entries(incoming.guideProgress)) {
    merged[version] ||= {};
    for (const [part, keys] of Object.entries(parts)) {
      merged[version][part] = [...new Set([...(merged[version][part] || []), ...keys])];
    }
  }
  return { favorites, team: team.slice(0, TEAM_SIZE), guideProgress: merged };
}

/** 給使用者看的摘要文字。 */
export function describeData({ favorites, team, guideProgress }) {
  return `收藏 ${favorites.length} 隻、隊伍 ${team.length} 隻、攻略進度 ${countProgress(guideProgress)} 項`;
}
