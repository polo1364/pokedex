/**
 * 寶可夢比較：純函式（解析網址、整理種族值與屬性相剋），方便在 Node 測試。
 */
import { TYPE_ORDER } from '../config.js';
import { getEffectiveness } from './typeChart.js';

export const MAX_COMPARE = 3;

export const COMPARE_STATS = [
  ['hp', 'HP'],
  ['attack', '攻擊'],
  ['defense', '防禦'],
  ['special-attack', '特攻'],
  ['special-defense', '特防'],
  ['speed', '速度'],
];

/** 解析 ?compare=6,9,3：只取正整數、去重、最多 MAX_COMPARE 筆。 */
export function parseCompareIds(value) {
  if (!value) return [];
  const ids = [];
  for (const part of String(value).split(',')) {
    const n = Number(part.trim());
    if (Number.isInteger(n) && n > 0 && !ids.includes(n)) ids.push(n);
    if (ids.length >= MAX_COMPARE) break;
  }
  return ids;
}

/** 在比較清單中加入或移除；已滿時不加入並回報 full。 */
export function toggleCompareId(ids, id) {
  if (ids.includes(id)) return { ids: ids.filter((x) => x !== id), added: false, full: false };
  if (ids.length >= MAX_COMPARE) return { ids, added: false, full: true };
  return { ids: [...ids, id], added: true, full: false };
}

function statValue(pokemon, key) {
  return pokemon?.stats?.find((s) => s.stat.name === key)?.base_stat ?? 0;
}

/**
 * 種族值比較列：每列含各隻數值與是否為該列最高（只有一隻時不標記）。
 * @returns {{key:string,label:string,values:number[],best:boolean[]}[]}
 */
export function buildStatRows(pokemons) {
  const rows = COMPARE_STATS.map(([key, label]) => ({
    key, label, values: pokemons.map((p) => statValue(p, key)),
  }));
  rows.push({
    key: 'total',
    label: '總和',
    values: pokemons.map((p) => COMPARE_STATS.reduce((sum, [key]) => sum + statValue(p, key), 0)),
  });
  return rows.map((row) => {
    const max = Math.max(...row.values);
    const best = row.values.map((v) => pokemons.length > 1 && v === max && row.values.some((x) => x !== max));
    return { ...row, best };
  });
}

/** 防禦面屬性相剋分組：4 倍、2 倍、1/2、1/4、無效。 */
export function defensiveProfile(types) {
  const groups = { quad: [], double: [], half: [], quarter: [], immune: [] };
  for (const attack of TYPE_ORDER) {
    const mult = getEffectiveness(attack, types);
    if (mult === 4) groups.quad.push(attack);
    else if (mult === 2) groups.double.push(attack);
    else if (mult === 0.5) groups.half.push(attack);
    else if (mult === 0.25) groups.quarter.push(attack);
    else if (mult === 0) groups.immune.push(attack);
  }
  return groups;
}
