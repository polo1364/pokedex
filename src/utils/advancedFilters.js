/**
 * 首頁進階篩選（純函式）：第二屬性、種族值範圍、特性、蛋群。
 * 讀取欄位一律透過 entrySummary，完整資料未載入時改用預建索引。
 */
import { TYPE_ORDER } from '../config.js';
import {
  entryTypes, entryStat, entryTotalStats, entryAbilities, entryEggGroups,
} from './entrySummary.js';

export const STAT_FILTER_KEYS = ['total', 'hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'];
export const STAT_FILTER_LABELS = {
  total: '種族值總和', hp: 'HP', attack: '攻擊', defense: '防禦',
  'special-attack': '特攻', 'special-defense': '特防', speed: '速度',
};

/** 蛋群篩選選項（「未發現」與「無法孵化」視為同一組）。 */
export const EGG_FILTER_KEYS = [
  'monster', 'water1', 'water2', 'water3', 'bug', 'flying', 'ground', 'fairy',
  'plant', 'humanshape', 'mineral', 'indeterminate', 'dragon', 'ditto', 'undiscovered',
];

export const EMPTY_ADVANCED = Object.freeze({
  type2: 'all', stat: 'total', min: null, max: null, ability: '', egg: '',
});

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** 解析數值輸入：空白或非數字回傳 null，其餘限制在 0–999 的整數。 */
export function parseStatBound(value) {
  if (value === null || value === undefined || String(value).trim() === '') return null;
  const n = Number(value);
  if (!Number.isFinite(n)) return null;
  return Math.min(999, Math.max(0, Math.round(n)));
}

/** 正規化進階篩選狀態（網址、輸入框都經過這裡）。 */
export function normalizeAdvanced(raw = {}) {
  const type2 = TYPE_ORDER.includes(raw.type2) ? raw.type2 : 'all';
  const stat = STAT_FILTER_KEYS.includes(raw.stat) ? raw.stat : 'total';
  let min = parseStatBound(raw.min);
  let max = parseStatBound(raw.max);
  if (min !== null && max !== null && min > max) [min, max] = [max, min];
  const ability = typeof raw.ability === 'string' && SLUG_RE.test(raw.ability) ? raw.ability : '';
  const egg = EGG_FILTER_KEYS.includes(raw.egg) ? raw.egg : '';
  return { type2, stat, min, max, ability, egg };
}

export function hasAdvancedFilter(adv) {
  return adv.type2 !== 'all' || adv.min !== null || adv.max !== null || Boolean(adv.ability) || Boolean(adv.egg);
}

/**
 * 是否符合進階篩選。資料尚未取得（未載入、也沒有索引）時先保留，載入後再判斷。
 * @param {object} entry 物種條目
 * @param {ReturnType<typeof normalizeAdvanced>} adv
 */
export function matchesAdvanced(entry, adv) {
  if (adv.type2 !== 'all') {
    const types = entryTypes(entry);
    if (types ? !types.includes(adv.type2) : entry.loaded) return false;
  }

  if (adv.min !== null || adv.max !== null) {
    const value = adv.stat === 'total' ? entryTotalStats(entry) : entryStat(entry, adv.stat);
    if (value < 0) {
      if (entry.loaded) return false;
    } else {
      if (adv.min !== null && value < adv.min) return false;
      if (adv.max !== null && value > adv.max) return false;
    }
  }

  if (adv.ability) {
    const abilities = entryAbilities(entry);
    if (abilities ? !abilities.some((a) => a.slug === adv.ability) : entry.loaded) return false;
  }

  if (adv.egg) {
    const groups = entryEggGroups(entry);
    const wanted = adv.egg === 'undiscovered' ? ['undiscovered', 'no-eggs'] : [adv.egg];
    if (groups ? !groups.some((g) => wanted.includes(g)) : Boolean(entry.speciesData)) return false;
  }

  return true;
}

/**
 * 由使用者輸入找出特性代碼：可輸入繁中全名、英文代碼或英文名稱（空白、大小寫不拘）。
 * @param {string} text
 * @param {Record<string,string>} abilityNames 代碼 → 繁中名稱
 */
export function resolveAbility(text, abilityNames = {}) {
  const q = String(text || '').trim();
  if (!q) return '';
  for (const [slug, zh] of Object.entries(abilityNames)) {
    if (zh === q) return slug;
  }
  const slug = q.toLowerCase().replace(/[\s_]+/g, '-');
  if (!SLUG_RE.test(slug)) return '';
  // 沒有特性名稱表（預建索引不可用）時，接受任何代碼格式的輸入
  const known = Object.keys(abilityNames).length === 0
    || Object.prototype.hasOwnProperty.call(abilityNames, slug);
  return known ? slug : '';
}
