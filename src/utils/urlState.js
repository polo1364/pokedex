/**
 * 首頁篩選狀態 ↔ 網址參數。
 *
 * 只管理 gen / type / q / fav / sort / view 這幾個參數；
 * id、tm、heldItem 等其他參數原樣保留。預設值不寫進網址，讓網址保持乾淨。
 */
import { TYPE_ORDER } from '../config.js';
import { normalizeAdvanced, EMPTY_ADVANCED } from './advancedFilters.js';
import { FORM_MODES } from './entrySummary.js';

export const SORT_KEYS = [
  'id', 'name', 'generation', 'total', 'hp', 'attack', 'defense',
  'special-attack', 'special-defense', 'speed', 'height', 'weight', 'capture_rate',
];
export const VIEW_MODES = ['grid', 'list'];
export const MAX_GENERATION = 9;

export const DEFAULT_URL_STATE = Object.freeze({
  gen: 'all', type: 'all', q: '', fav: false, sort: 'id', view: 'grid', adv: EMPTY_ADVANCED, forms: 'none',
});

const MANAGED_KEYS = ['gen', 'type', 'q', 'fav', 'sort', 'view'];
/** 進階篩選參數：type2、stat（僅在有範圍時寫入）、min、max、ability、egg */
const ADV_KEYS = ['type2', 'stat', 'min', 'max', 'ability', 'egg'];

/**
 * 解析網址參數；不合法或缺少的欄位不出現在回傳物件中（交由呼叫端沿用目前值）。
 * @param {string | URLSearchParams} search
 */
export function readUrlState(search) {
  const params = search instanceof URLSearchParams ? search : new URLSearchParams(search);
  const state = {};

  const gen = params.get('gen');
  if (gen !== null) {
    const n = Number(gen);
    if (gen === 'all') state.gen = 'all';
    else if (Number.isInteger(n) && n >= 1 && n <= MAX_GENERATION) state.gen = String(n);
  }

  const type = params.get('type')?.toLowerCase();
  if (type && (type === 'all' || TYPE_ORDER.includes(type))) state.type = type;

  const q = params.get('q');
  if (q !== null) state.q = q.trim().slice(0, 100);

  const fav = params.get('fav');
  if (fav !== null) state.fav = fav === '1' || fav === 'true';

  const sort = params.get('sort');
  if (sort && SORT_KEYS.includes(sort)) state.sort = sort;

  const view = params.get('view');
  if (view && VIEW_MODES.includes(view)) state.view = view;

  const forms = params.get('forms');
  if (forms && FORM_MODES.includes(forms)) state.forms = forms;

  if (ADV_KEYS.some((key) => params.has(key))) {
    state.adv = normalizeAdvanced(Object.fromEntries(ADV_KEYS.map((key) => [key, params.get(key) ?? undefined])));
  }

  return state;
}

/**
 * 將狀態寫回網址字串（保留非管理的參數與 hash）。
 * @param {string} href 目前完整網址
 * @param {{gen:string,type:string,q:string,fav:boolean,sort:string,view:string}} state
 */
export function buildUrlWithState(href, state) {
  const url = new URL(href);
  const values = {
    gen: state.gen,
    type: state.type,
    q: (state.q || '').trim(),
    fav: state.fav ? '1' : '',
    sort: state.sort,
    view: state.view,
  };
  for (const key of MANAGED_KEYS) {
    const value = values[key];
    const isDefault = key === 'fav'
      ? !state.fav
      : !value || value === DEFAULT_URL_STATE[key];
    if (isDefault) url.searchParams.delete(key);
    else url.searchParams.set(key, value);
  }

  if (state.forms && state.forms !== 'none' && FORM_MODES.includes(state.forms)) url.searchParams.set('forms', state.forms);
  else url.searchParams.delete('forms');

  const adv = normalizeAdvanced(state.adv || {});
  const hasRange = adv.min !== null || adv.max !== null;
  const advValues = {
    type2: adv.type2 !== 'all' ? adv.type2 : '',
    stat: hasRange && adv.stat !== 'total' ? adv.stat : '',
    min: adv.min !== null ? String(adv.min) : '',
    max: adv.max !== null ? String(adv.max) : '',
    ability: adv.ability,
    egg: adv.egg,
  };
  for (const key of ADV_KEYS) {
    if (advValues[key]) url.searchParams.set(key, advValues[key]);
    else url.searchParams.delete(key);
  }
  return url.toString();
}

/**
 * 判斷兩個網址之間的變化應該新增歷史紀錄（push）、取代（replace），或不需更新（null）。
 * 修改進行中的搜尋字串（前後都有 q）用 replace，避免每打一個字就多一筆上一頁紀錄；
 * 開始搜尋或清空搜尋仍新增紀錄，上一頁才能回到搜尋前的狀態。
 */
export function urlChangeKind(fromHref, toHref) {
  if (fromHref === toHref) return null;
  const a = new URL(fromHref).searchParams;
  const b = new URL(toHref).searchParams;
  const keys = new Set([...a.keys(), ...b.keys()]);
  for (const key of keys) {
    if (key === 'q') continue;
    if (a.get(key) !== b.get(key)) return 'push';
  }
  return a.get('q') && b.get('q') ? 'replace' : 'push';
}
