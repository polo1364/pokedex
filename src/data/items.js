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
  getItemVersionDetails,
  getHistoricalItemName,
  isDynamaxCrystal,
  isMachineItem,
  POCKET_NAMES_CN,
} from '../utils/items.js';

const INDEX_CACHE_KEY = 'items_by_gen_v10';
const ITEMS_FETCH_CONCURRENCY = 25;
const categoryCache = new Map();

async function loadCategoryMeta(categoryRef) {
  const slug = categoryRef?.name;
  if (!slug) return { categorySlug: 'unknown', categoryZh: '未知', pocketSlug: 'misc', pocketZh: POCKET_NAMES_CN.misc };
  if (categoryCache.has(slug)) return categoryCache.get(slug);

  const data = await fetchJson(categoryRef.url, `item_category_${slug}`);
  const categoryZhRaw = getValidChineseName(data.names);
  const categoryZh = categoryZhRaw || getCategoryDisplayName(slug);
  const pocketSlug = data.pocket?.name || 'misc';
  const pocketZh = POCKET_NAMES_CN[pocketSlug] || '其他';
  const meta = { categorySlug: slug, categoryZh, pocketSlug, pocketZh };
  categoryCache.set(slug, meta);
  return meta;
}

export function buildItemView(itemData, slug, categoryMeta) {
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
    currentName: displayName,
    historicalNames: Object.fromEntries(generations.map((gen) => [gen, getHistoricalItemName(itemData, gen)])),
    sprite: itemData.sprites?.default ? spriteUrl : '',
    spriteFallback: spriteUrl,
    placeholderIcon: getItemPlaceholderIcon(categoryMeta.pocketSlug, categoryMeta.categorySlug),
    categorySlug: categoryMeta.categorySlug,
    categoryZh: categoryMeta.categoryZh,
    pocketSlug: categoryMeta.pocketSlug,
    pocketZh: categoryMeta.pocketZh,
    versionDetails: Object.fromEntries(generations.map((gen) => [gen, getItemVersionDetails(itemData, gen)])),
    attributes,
    generations,
    heldByCount: countDefaultHolders(itemData),
  };
}

/**
 * 野生時會攜帶此道具的寶可夢數（只算預設形態 id ≤ 1025，與主圖鑑網格一致；
 * 形態專屬持有者如帽子皮卡丘在主圖鑑篩不到，不計入以免連過去是空結果）。
 */
function countDefaultHolders(itemData) {
  const ids = new Set();
  for (const holder of itemData.held_by_pokemon || []) {
    const id = parseInt(holder.pokemon?.url?.split('/').filter(Boolean).pop(), 10);
    if (id > 0 && id <= 1025) ids.add(id);
  }
  return ids.size;
}

function groupByGeneration(items) {
  const byGen = {};
  const uncategorized = [];

  for (let gen = 1; gen <= 9; gen += 1) byGen[gen] = [];

  for (const item of items) {
    if (!item.generations.length) {
      uncategorized.push({ ...item, versionDetails: [], effect: '世代及版本效果資料尚未提供' });
      continue;
    }
    for (const gen of item.generations) {
      if (gen >= 1 && gen <= 9) {
        const versionDetails = item.versionDetails[gen] || [];
        const summary = versionDetails.find((detail) => detail.language);
        byGen[gen].push({ ...item, currentGen: gen, versionDetails,
          displayName: item.historicalNames[gen] || item.displayName,
          historicalName: item.historicalNames[gen] || '',
          effect: summary?.text || '此世代尚無效果說明',
          effectVersion: summary?.versionGroup || '', effectLanguage: summary?.language || '',
          effectReference: summary?.reference || null,
        });
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
  const failures = [];
  const report = () => {
    completed += 1;
    onProgress?.(Math.round((completed / total) * 100), completed, total);
  };

  const views = await runPool(listData.results, async (entry) => {
    try {
      const slug = entry.name;
      if (isMachineItem(null, slug) || isDynamaxCrystal(slug)) { report(); return null; }
      const itemData = await fetchJson(entry.url, `catalog_item_v2_${slug}`);
      if (isMachineItem(itemData, slug) || isDynamaxCrystal(slug)) {
        report();
        return null;
      }
      const categoryMeta = await loadCategoryMeta(itemData.category);
      report();
      return buildItemView(itemData, slug, categoryMeta);
    } catch {
      failures.push(entry.name);
      report();
      return null;
    }
  }, ITEMS_FETCH_CONCURRENCY);

  if (failures.length) throw new Error(`道具資料未完整載入（${failures.length} 項），請重新整理重試`);
  return views.filter((view) => view && !view.error);
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
      || (item.currentName || '').toLowerCase().includes(q)
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
