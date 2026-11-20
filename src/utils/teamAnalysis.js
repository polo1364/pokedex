/**
 * 隊伍屬性分析（純函式）：防禦弱點、本系招式打擊面、補強建議。
 * 成員以屬性陣列表示，例如 [['fire','flying'], ['water']]。
 */
import { TYPE_ORDER } from '../config.js';
import { getEffectiveness } from './typeChart.js';

export const TEAM_SIZE = 6;

/** 解析 ?t=6,9,3：只取正整數、去重、最多 6 筆。 */
export function parseTeamIds(value) {
  if (!value) return [];
  const ids = [];
  for (const part of String(value).split(',')) {
    const n = Number(part.trim());
    if (Number.isInteger(n) && n > 0 && !ids.includes(n)) ids.push(n);
    if (ids.length >= TEAM_SIZE) break;
  }
  return ids;
}

/** 加入隊伍；已在隊伍中或已滿時不變。 */
export function addTeamId(ids, id) {
  if (ids.includes(id)) return { ids, added: false, full: false, duplicate: true };
  if (ids.length >= TEAM_SIZE) return { ids, added: false, full: true, duplicate: false };
  return { ids: [...ids, id], added: true, full: false, duplicate: false };
}

/**
 * 防禦表：每個攻擊屬性對每位成員的倍率，以及怕（>1）、抗（<1，含無效）的人數。
 * @param {string[][]} team
 */
export function defensiveMatrix(team) {
  return TYPE_ORDER.map((attack) => {
    const multipliers = team.map((types) => getEffectiveness(attack, types));
    return {
      attack,
      multipliers,
      weak: multipliers.filter((m) => m > 1).length,
      resist: multipliers.filter((m) => m < 1).length,
      immune: multipliers.filter((m) => m === 0).length,
    };
  });
}

/**
 * 隊伍共同弱點：怕的人數多於抗的人數，且至少 2 人怕（或有人 4 倍弱、沒人能抗）。
 * 依嚴重度排序：淨弱點數、4 倍弱人數。
 */
export function sharedWeaknesses(team) {
  if (!team.length) return [];
  return defensiveMatrix(team)
    .map((row) => ({ ...row, quad: row.multipliers.filter((m) => m >= 4).length }))
    .filter((row) => (row.weak >= 2 && row.weak > row.resist) || (row.quad >= 1 && row.resist === 0))
    .sort((a, b) => (b.weak - b.resist) - (a.weak - a.resist) || b.quad - a.quad || b.weak - a.weak);
}

/**
 * 本系招式（與自身屬性相同的招式）對每個防守屬性的最佳倍率與能打出效果絕佳的成員索引。
 * @param {string[][]} team
 */
export function offensiveCoverage(team) {
  return TYPE_ORDER.map((defense) => {
    let best = team.length ? 0 : 1;
    const hitters = [];
    team.forEach((types, i) => {
      const memberBest = Math.max(...types.map((attack) => getEffectiveness(attack, [defense])));
      best = Math.max(best, memberBest);
      if (memberBest > 1) hitters.push(i);
    });
    return { defense, best, hitters };
  });
}

/** 沒有任何成員能用本系招式打出效果絕佳的屬性。 */
export function uncoveredTypes(team) {
  if (!team.length) return [];
  return offensiveCoverage(team).filter((row) => row.hitters.length === 0).map((row) => row.defense);
}

/**
 * 補強建議：能同時抵抗（或免疫）最多個共同弱點的單一屬性。
 * @param {string[]} weaknessTypes 需要補強的攻擊屬性
 * @returns {{type:string, covers:string[]}[]}
 */
export function suggestDefensiveTypes(weaknessTypes, limit = 4) {
  if (!weaknessTypes.length) return [];
  return TYPE_ORDER
    .map((type) => ({
      type,
      covers: weaknessTypes.filter((attack) => getEffectiveness(attack, [type]) < 1),
      exposed: weaknessTypes.filter((attack) => getEffectiveness(attack, [type]) > 1).length,
    }))
    .filter((s) => s.covers.length > 0)
    .sort((a, b) => b.covers.length - a.covers.length || a.exposed - b.exposed
      || TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type))
    .slice(0, limit)
    .map(({ type, covers }) => ({ type, covers }));
}

/** 能用本系招式打出效果絕佳、覆蓋最多個未涵蓋屬性的單一屬性。 */
export function suggestOffensiveTypes(uncovered, limit = 4) {
  if (!uncovered.length) return [];
  return TYPE_ORDER
    .map((type) => ({ type, covers: uncovered.filter((defense) => getEffectiveness(type, [defense]) > 1) }))
    .filter((s) => s.covers.length > 0)
    .sort((a, b) => b.covers.length - a.covers.length || TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type))
    .slice(0, limit);
}

/* ---------- 針對一場對戰 ---------- */

/**
 * 解析 ?vs=121.water.psychic,120.water：物種編號加上該場對戰裡的屬性（攻略當代的屬性，可能和現行不同）。
 * 編號不是正整數、沒有合法屬性的項目略過；最多 6 隻。
 * @returns {{ id: number, types: string[] }[]}
 */
export function parseOpponents(value) {
  if (!value) return [];
  const opponents = [];
  for (const part of String(value).split(',')) {
    const [rawId, ...rawTypes] = part.trim().split('.');
    const id = Number(rawId);
    const types = [...new Set(rawTypes.filter((type) => TYPE_ORDER.includes(type)))].slice(0, 2);
    if (Number.isInteger(id) && id > 0 && types.length) opponents.push({ id, types });
    if (opponents.length >= TEAM_SIZE) break;
  }
  return opponents;
}

/**
 * 隊伍對上每一隻對手：誰的本系招式能剋牠（hitters）、誰會被牠的本系招式剋（threatened），都附上最高倍率。
 * @param {string[][]} team 隊伍成員的屬性
 * @param {string[][]} opponents 對手的屬性
 * @param {(attack: string, defenseTypes: string[]) => number} multiplier 相剋倍率（預設現行相剋表）
 */
export function battleMatchups(team, opponents, multiplier = getEffectiveness) {
  const best = (attackTypes, defenseTypes) => (attackTypes.length && defenseTypes.length
    ? Math.max(...attackTypes.map((attack) => multiplier(attack, defenseTypes)))
    : 1);
  return opponents.map((foe) => ({
    hitters: team.map((member, index) => ({ index, mult: best(member, foe) })).filter((row) => row.mult > 1),
    threatened: team.map((member, index) => ({ index, mult: best(foe, member) })).filter((row) => row.mult > 1),
  }));
}
