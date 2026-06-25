import { BASE_URL } from '../config.js';
import { fetchJson, runPool } from '../api/client.js';
import { getCache, setCache } from '../api/cache.js';
import { getValidChineseName } from '../utils/i18n.js';
import {
  formatSlug,
  getCategoryDisplayName,
  getItemDisplayName,
  getItemGenerations,
  getItemPlaceholderIcon,
  getItemSpriteUrl,
  getLatestItemEffect,
  isDynamaxCrystal,
  isMachineItem,
  POCKET_NAMES_CN,
} from '../utils/items.js';

const INDEX_CACHE_KEY = 'items_by_gen_v6';
const ITEMS_FETCH_CONCURRENCY = 25;
const categoryCache = new Map();

async function loadCategoryMeta(categoryRef) {
  const slug = categoryRef?.name;
  if (!slug) return { categorySlug: 'unknown', categoryZh: '未知', pocketSlug: 'misc', pocketZh: POCKET_NAMES_CN.misc };
  if (categoryCache.has(slug)) return categoryCache.get(slug);

  try {
    const data = await fetchJson(categoryRef.url, `item_category_${slug}`);
    const categoryZhRaw = getValidChineseName(data.names);
    const categoryZh = categoryZhRaw || getCategoryDisplayName(slug);
    const pocketSlug = data.pocket?.name || 'misc';
    const pocketZh = POCKET_NAMES_CN[pocketSlug] || '其他';
    const meta = { categorySlug: slug, categoryZh, pocketSlug, pocketZh };
    categoryCache.set(slug, meta);
    return meta;
  } catch {
    const meta = { categorySlug: slug, categoryZh: getCategoryDisplayName(slug), pocketSlug: 'misc', pocketZh: POCKET_NAMES_CN.misc };
    categoryCache.set(slug, meta);
    return meta;
  }
}

function buildItemView(itemData, slug, categoryMeta) {
  const attributes = (itemData.attributes || []).map((a) => a.name);
  const generations = getItemGenerations(itemData, slug);
  const zhName = getValidChineseName(itemData.names);
  const displayName = getItemDisplayName(itemData, slug);
  const spriteUrl = getItemSpriteUrl(itemData, slug);

  return {
    slug,
    zhName,
    hasChineseName: Boolean(zhName),
    enName: formatSlug(slug),
    displayName,
    sprite: itemData.sprites?.default ? spriteUrl : '',
    spriteFallback: spriteUrl,
    placeholderIcon: getItemPlaceholderIcon(categoryMeta.pocketSlug, categoryMeta.categorySlug),
    categorySlug: categoryMeta.categorySlug,
    categoryZh: categoryMeta.categoryZh,
    pocketSlug: categoryMeta.pocketSlug,
    pocketZh: categoryMeta.pocketZh,
    effect: getLatestItemEffect(itemData),
    cost: itemData.cost ?? 0,
    attributes,
    generations,
  };
}

function groupByGeneration(items) {
  const byGen = {};
  const uncategorized = [];

  for (let gen = 1; gen <= 9; gen += 1) byGen[gen] = [];

  for (const item of items) {
    if (!item.generations.length) {
      uncategorized.push(item);
      continue;
    }
    for (const gen of item.generations) {
      if (gen >= 1 && gen <= 9) {
        byGen[gen].push({ ...item, currentGen: gen });
      }
    }
  }

  for (let gen = 1; gen <= 9; gen += 1) {
    byGen[gen].sort((a, b) => a.displayName.localeCompare(b.displayName, 'zh-Hant'));
  }
  uncategorized.sort((a, b) => a.displayName.localeCompare(b.displayName, 'zh-Hant'));

  return { byGen, uncategorized };
}

async function fetchAllItemViews(onProgress) {
  const countRes = await fetchJson(`${BASE_URL}/item?limit=0`, 'items_count');
  const total = countRes.count;
  const listData = await fetchJson(`${BASE_URL}/item?limit=${total}`, 'items_list');

  let completed = 0;
  const report = () => {
    completed += 1;
    onProgress?.(Math.round((completed / total) * 100), completed, total);
  };

  const views = await runPool(listData.results, async (entry) => {
    try {
      const slug = entry.name;
      const itemData = await fetchJson(entry.url);
      if (isMachineItem(itemData, slug) || isDynamaxCrystal(slug)) {
        report();
        return null;
      }
      const categoryMeta = await loadCategoryMeta(itemData.category);
      report();
      return buildItemView(itemData, slug, categoryMeta);
    } catch {
      report();
      return null;
    }
  }, ITEMS_FETCH_CONCURRENCY);

  return views.filter(Boolean);
}

export async function loadItemsCatalog(onProgress) {
  const cached = await getCache(INDEX_CACHE_KEY);
  if (cached?.byGen) {
    onProgress?.(100, cached.totalItems || 0, cached.totalItems || 0);
    return cached;
  }

  const items = await fetchAllItemViews(onProgress);
  const { byGen, uncategorized } = groupByGeneration(items);
  const catalog = {
    byGen,
    uncategorized,
    totalItems: items.length,
    generatedAt: Date.now(),
  };

  setCache(INDEX_CACHE_KEY, catalog).catch(() => {});
  return catalog;
}

export function countVisibleCards(catalog, query = '') {
  const q = query.trim().toLowerCase();
  let total = 0;
  let visible = 0;

  const match = (item) => {
    if (!q) return true;
    return item.displayName.toLowerCase().includes(q)
      || item.slug.includes(q)
      || item.enName.toLowerCase().includes(q)
      || item.categoryZh.toLowerCase().includes(q);
  };

  for (let gen = 1; gen <= 9; gen += 1) {
    const items = catalog.byGen[gen] || [];
    total += items.length;
    visible += items.filter(match).length;
  }

  const uncategorized = catalog.uncategorized || [];
  total += uncategorized.length;
  visible += uncategorized.filter(match).length;

  return { totalUnique: catalog.totalItems || 0, totalCards: total, visible };
}
