/**
 * 招式／特性圖鑑（純函式）：搜尋、篩選、排序、網址狀態與學習者整理。
 */
import { TYPE_ORDER } from '../config.js';

export const MOVE_CLASSES = ['physical', 'special', 'status'];
export const MOVE_CLASS_LABELS = { physical: '物理', special: '特殊', status: '變化' };
export const MOVE_SORTS = ['id', 'name', 'power', 'accuracy', 'pp', 'gen'];
export const ABILITY_SORTS = ['id', 'name', 'count', 'gen'];
export const MAX_GEN = 9;
export const MAX_SPECIES_ID = 1025;

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function normalizeText(text) {
  return String(text || '').trim().toLowerCase();
}

function compact(text) {
  return normalizeText(text).replace(/[\s\-_.'’]/g, '');
}

/** 名稱搜尋：繁中、英文代碼（空白／連字號不拘）、編號。 */
export function matchesName(entry, query) {
  const q = normalizeText(query);
  if (!q) return true;
  if (entry.zh?.toLowerCase().includes(q)) return true;
  if (compact(entry.n).includes(compact(q))) return true;
  const digits = q.replace(/^#/, '');
  return /^\d+$/.test(digits) && String(entry.id) === String(Number(digits));
}

export function filterMoves(entries, { q = '', type = 'all', cls = 'all', gen = 'all' } = {}) {
  return entries.filter((m) => matchesName(m, q)
    && (type === 'all' || m.t === type)
    && (cls === 'all' || m.c === cls)
    && (gen === 'all' || m.g === Number(gen)));
}

/** 命中為 null 代表必定命中，排序時視為最高。威力、PP 為 null 時排最後。 */
export function sortMoves(list, sort = 'id') {
  const out = [...list];
  const desc = (get) => (a, b) => {
    const va = get(a);
    const vb = get(b);
    if (va === vb) return a.id - b.id;
    if (va === null) return 1;
    if (vb === null) return -1;
    return vb - va;
  };
  const sorters = {
    id: (a, b) => a.id - b.id,
    name: (a, b) => a.zh.localeCompare(b.zh, 'zh-Hant') || a.id - b.id,
    power: desc((m) => m.p),
    accuracy: desc((m) => (m.a === null ? 101 : m.a)),
    pp: desc((m) => m.pp),
    gen: (a, b) => a.g - b.g || a.id - b.id,
  };
  return out.sort(sorters[sort] || sorters.id);
}

/**
 * 每個特性有哪些寶可夢（預建物種索引的 a 欄位，隱藏特性以 * 開頭）。
 * @returns {Map<string, {id:number, hidden:boolean}[]>}
 */
export function buildAbilityHolders(speciesEntries) {
  const map = new Map();
  for (const e of speciesEntries) {
    for (const raw of e.a || []) {
      const hidden = raw.startsWith('*');
      const slug = hidden ? raw.slice(1) : raw;
      if (!map.has(slug)) map.set(slug, []);
      const list = map.get(slug);
      if (!list.some((h) => h.id === e.id)) list.push({ id: e.id, hidden });
    }
  }
  return map;
}

export function filterAbilities(entries, { q = '', gen = 'all' } = {}) {
  return entries.filter((a) => matchesName(a, q) && (gen === 'all' || a.g === Number(gen)));
}

export function sortAbilities(list, sort = 'id', holders = new Map()) {
  const count = (a) => holders.get(a.n)?.length || 0;
  const sorters = {
    id: (a, b) => a.id - b.id,
    name: (a, b) => a.zh.localeCompare(b.zh, 'zh-Hant') || a.id - b.id,
    count: (a, b) => count(b) - count(a) || a.id - b.id,
    gen: (a, b) => a.g - b.g || a.id - b.id,
  };
  return [...list].sort(sorters[sort] || sorters.id);
}

/**
 * PokéAPI move.learned_by_pokemon → 物種編號（只取一般形態 id ≤ 1025）與形態數。
 * @param {{learned_by_pokemon?: {url:string}[]}} moveData
 */
export function learnersFromMove(moveData) {
  const ids = new Set();
  let forms = 0;
  for (const p of moveData?.learned_by_pokemon || []) {
    const id = parseInt(p.url.split('/').filter(Boolean).pop(), 10);
    if (id > 0 && id <= MAX_SPECIES_ID) ids.add(id);
    else if (id > MAX_SPECIES_ID) forms += 1;
  }
  return { ids: [...ids].sort((a, b) => a - b), forms };
}

export const DEFAULT_CATALOG_STATE = Object.freeze({
  tab: 'moves', q: '', type: 'all', cls: 'all', gen: 'all', sort: 'id', open: '',
});

/** 解析網址參數；不合法的值回到預設。 */
export function readCatalogState(search) {
  const params = search instanceof URLSearchParams ? search : new URLSearchParams(search);
  const tab = params.get('tab') === 'abilities' ? 'abilities' : 'moves';
  const gen = Number(params.get('gen'));
  const sorts = tab === 'moves' ? MOVE_SORTS : ABILITY_SORTS;
  const open = params.get('open') || '';
  return {
    tab,
    q: (params.get('q') || '').trim().slice(0, 60),
    type: TYPE_ORDER.includes(params.get('type')) ? params.get('type') : 'all',
    cls: MOVE_CLASSES.includes(params.get('cls')) ? params.get('cls') : 'all',
    gen: Number.isInteger(gen) && gen >= 1 && gen <= MAX_GEN ? String(gen) : 'all',
    sort: sorts.includes(params.get('sort')) ? params.get('sort') : 'id',
    open: SLUG_RE.test(open) ? open : '',
  };
}

/** 將狀態寫成網址參數字串（預設值省略；招式專用條件在特性分頁不寫入）。 */
export function catalogStateToSearch(state) {
  const params = new URLSearchParams();
  if (state.tab === 'abilities') params.set('tab', 'abilities');
  if (state.q) params.set('q', state.q);
  if (state.tab === 'moves') {
    if (state.type !== 'all') params.set('type', state.type);
    if (state.cls !== 'all') params.set('cls', state.cls);
  }
  if (state.gen !== 'all') params.set('gen', state.gen);
  if (state.sort !== 'id') params.set('sort', state.sort);
  if (state.open) params.set('open', state.open);
  const text = params.toString();
  return text ? `?${text}` : '';
}
