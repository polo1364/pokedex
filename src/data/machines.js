import { BASE_URL } from '../config.js';
import { fetchJson, runPool } from '../api/client.js';
import { getCache, setCache } from '../api/cache.js';
import { isMachineItem, VERSION_GROUP_TO_GEN } from '../utils/items.js';
import { BDSP_TM_MOVES, BDSP_VERSION } from './bdspMachines.js';
import {
  buildMachineEntry,
  parseMachineSlug,
} from '../utils/machines.js';

const INDEX_CACHE_KEY = 'machines_by_gen_v4';
const FETCH_CONCURRENCY = 25;

function machineCacheKey(url) {
  const id = url?.match(/\/machine\/(\d+)\/?$/)?.[1];
  return id ? `machine_${id}` : `machine_${url}`;
}

function groupByGeneration(entries) {
  const byGen = {};
  for (let gen = 1; gen <= 9; gen += 1) byGen[gen] = [];

  for (const entry of entries) {
    if (entry?.generation >= 1 && entry.generation <= 9) {
      byGen[entry.generation].push(entry);
    }
  }

  for (let gen = 1; gen <= 9; gen += 1) {
    byGen[gen].sort((a, b) => {
      if (a.kind !== b.kind) return a.kind.localeCompare(b.kind);
      return a.number - b.number;
    });
  }

  return byGen;
}

async function resolveMoveFromMachine(machineRef, moveCache) {
  const machineUrl = machineRef?.machine?.url;
  if (!machineUrl) return null;

  if (moveCache.has(machineUrl)) {
    return moveCache.get(machineUrl);
  }

  const machineData = await fetchJson(machineUrl, machineCacheKey(machineUrl));
  const moveUrl = machineData?.move?.url;
  if (!moveUrl || machineData.version_group?.name !== machineRef.version_group?.name) throw new Error('招式機版本資料不符');
  const moveSlug = moveUrl.split('/').filter(Boolean).pop();
  const moveData = await fetchJson(moveUrl, `move_${moveSlug}`);
  moveCache.set(machineUrl, moveData);
  return moveData;
}

export async function buildEntriesForItem(itemData, slug, moveCache) {
  if (!parseMachineSlug(slug)) return [];

  const entries = [];
  for (const picked of itemData.machines || []) {
    if (picked.version_group?.name === BDSP_VERSION) continue;
    const gen = VERSION_GROUP_TO_GEN[picked.version_group?.name];
    if (!gen) continue;

    const moveData = await resolveMoveFromMachine(picked, moveCache);
    if (!moveData) throw new Error('招式資料未提供');

    const entry = buildMachineEntry(itemData, slug, gen, picked, moveData);
    if (entry) entries.push(entry);
  }
  const parsed = parseMachineSlug(slug);
  const bdspMove = parsed.kind === 'TM' ? BDSP_TM_MOVES[parsed.number - 1] : null;
  if (bdspMove) {
    const moveData = await fetchJson(`${BASE_URL}/move/${bdspMove}/`, `move_${bdspMove}`);
    const entry = buildMachineEntry(itemData, slug, 8, { version_group: { name: BDSP_VERSION } }, moveData);
    entry.mappingSource = 'BDSP 對照表（Serebii／Pokémon Database）';
    entries.push(entry);
  }
  return entries;
}

async function fetchAllMachineEntries(onProgress) {
  const countRes = await fetchJson(`${BASE_URL}/item?limit=0`, 'items_count');
  const total = countRes.count;
  const listData = await fetchJson(`${BASE_URL}/item?limit=${total}`, 'items_list');

  const machineSlugs = listData.results.filter((r) => {
    const slug = r.name;
    return /^(tm|hm|tr)\d+$/i.test(slug);
  });

  let completed = 0;
  const report = () => {
    completed += 1;
    onProgress?.(Math.round((completed / machineSlugs.length) * 100), completed, machineSlugs.length);
  };

  const moveCache = new Map();
  const allEntries = [];
  const failures = [];

  await runPool(machineSlugs, async (entry) => {
    try {
      const slug = entry.name;
      const itemData = await fetchJson(entry.url, `catalog_item_v2_${slug}`);
      if (!isMachineItem(itemData, slug)) {
        report();
        return;
      }
      const entries = await buildEntriesForItem(itemData, slug, moveCache);
      allEntries.push(...entries);
      report();
    } catch {
      failures.push(entry.name);
      report();
    }
  }, FETCH_CONCURRENCY);

  if (failures.length) throw new Error(`招式機資料未完整載入（${failures.length} 項），請重新整理重試`);
  return allEntries;
}

export async function loadMachinesCatalog(onProgress) {
  const cached = await getCache(INDEX_CACHE_KEY);
  if (cached?.byGen) {
    onProgress?.(100, cached.totalMachines || 0, cached.totalMachines || 0);
    return cached;
  }

  const entries = await fetchAllMachineEntries(onProgress);
  const byGen = groupByGeneration(entries);
  const catalog = {
    byGen,
    totalMachines: new Set(entries.map((e) => e.itemSlug)).size,
    totalCards: entries.length,
    generatedAt: Date.now(),
  };

  setCache(INDEX_CACHE_KEY, catalog).catch(() => {});
  return catalog;
}

export function countVisibleMachineCards(catalog, query = '', kindFilter = 'all', typeFilter = 'all') {
  const q = query.trim().toLowerCase();
  let total = 0;
  let visible = 0;

  const match = (entry) => {
    if (kindFilter !== 'all' && entry.kind !== kindFilter) return false;
    if (typeFilter !== 'all' && entry.type !== typeFilter) return false;
    if (!q) return true;
    return entry.displayLabel.toLowerCase().includes(q)
      || entry.moveName.toLowerCase().includes(q)
      || entry.moveNameEn.toLowerCase().includes(q)
      || (entry.moveEffect || '').toLowerCase().includes(q)
      || entry.moveSlug.includes(q)
      || entry.itemSlug.includes(q)
      || entry.typeLabel.includes(q);
  };

  for (let gen = 1; gen <= 9; gen += 1) {
    const items = catalog.byGen[gen] || [];
    total += items.length;
    visible += items.filter(match).length;
  }

  return { totalCards: total, visible };
}
