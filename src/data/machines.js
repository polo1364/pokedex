import { BASE_URL } from '../config.js';
import { fetchJson, runPool } from '../api/client.js';
import { getCache, setCache } from '../api/cache.js';
import { isMachineItem } from '../utils/items.js';
import {
  buildMachineEntry,
  parseMachineSlug,
  pickMachineForGen,
} from '../utils/machines.js';

const INDEX_CACHE_KEY = 'machines_by_gen_v3';
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

  try {
    const machineData = await fetchJson(machineUrl, machineCacheKey(machineUrl));
    const moveUrl = machineData?.move?.url;
    if (!moveUrl) {
      moveCache.set(machineUrl, null);
      return null;
    }
    const moveSlug = moveUrl.split('/').filter(Boolean).pop();
    const moveData = await fetchJson(moveUrl, `move_${moveSlug}`);
    moveCache.set(machineUrl, moveData);
    return moveData;
  } catch {
    moveCache.set(machineUrl, null);
    return null;
  }
}

async function buildEntriesForItem(itemData, slug, moveCache) {
  if (!parseMachineSlug(slug)) return [];

  const entries = [];
  for (let gen = 1; gen <= 9; gen += 1) {
    const picked = pickMachineForGen(itemData.machines, gen);
    if (!picked) continue;

    const moveData = await resolveMoveFromMachine(picked, moveCache);
    if (!moveData) continue;

    const entry = buildMachineEntry(itemData, slug, gen, picked, moveData);
    if (entry) entries.push(entry);
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

  await runPool(machineSlugs, async (entry) => {
    try {
      const slug = entry.name;
      const itemData = await fetchJson(entry.url, `item_${slug}`);
      if (!isMachineItem(itemData, slug)) {
        report();
        return;
      }
      const entries = await buildEntriesForItem(itemData, slug, moveCache);
      allEntries.push(...entries);
      report();
    } catch {
      report();
    }
  }, FETCH_CONCURRENCY);

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
