/** 隊伍成員（物種編號，最多 6 隻），存在 localStorage，圖鑑詳情與隊伍分析頁共用。 */
import { parseTeamIds, addTeamId } from '../utils/teamAnalysis.js';

const STORAGE_KEY = 'pokedex_team_ids';

export function getTeamIds() {
  try {
    return parseTeamIds(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]').join(','));
  } catch {
    return [];
  }
}

export function setTeamIds(ids) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parseTeamIds(ids.join(','))));
  } catch { /* 無法儲存時仍可在本頁使用 */ }
}

/** @returns {{ids:number[], added:boolean, full:boolean, duplicate:boolean}} */
export function addToTeam(id) {
  const result = addTeamId(getTeamIds(), id);
  if (result.added) setTeamIds(result.ids);
  return result;
}

export function removeFromTeam(id) {
  const ids = getTeamIds().filter((x) => x !== id);
  setTeamIds(ids);
  return ids;
}
