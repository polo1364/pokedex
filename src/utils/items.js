import { getValidChineseName, isPlaceholderTranslation } from './i18n.js';
import { versionGroupScore } from './versions.js';
import { getVersionedFlavor } from './catalogText.js';

export const VERSION_GROUP_TO_GEN = {
  'red-blue': 1, 'red-green-japan': 1, 'blue-japan': 1, yellow: 1,
  'gold-silver': 2, crystal: 2,
  'ruby-sapphire': 3, emerald: 3, 'firered-leafgreen': 3, colosseum: 3, xd: 3,
  'diamond-pearl': 4, platinum: 4, 'heartgold-soulsilver': 4,
  'black-white': 5, 'black-2-white-2': 5,
  'x-y': 6, 'omega-ruby-alpha-sapphire': 6,
  'sun-moon': 7, 'ultra-sun-ultra-moon': 7, 'lets-go-pikachu-lets-go-eevee': 7,
  'sword-shield': 8, 'the-isle-of-armor': 8, 'the-crown-tundra': 8,
  'brilliant-diamond-shining-pearl': 8, 'legends-arceus': 8,
  'scarlet-violet': 9, 'the-teal-mask': 9, 'the-indigo-disk': 9,
  'legends-za': 9, 'mega-dimension': 9, champions: 9,
};

export const POCKET_NAMES_CN = {
  pokeballs: '精靈球',
  medicine: '回復',
  machines: '招式機',
  berries: '樹果',
  battle: '對戰',
  key: '重要',
  misc: '其他',
  mail: '郵件',
};

/** PokeAPI 道具分類大多無 zh-hant，改用手動對照 */
export const CATEGORY_NAMES_CN = {
  'all-machines': '招式機',
  'all-mail': '郵件',
  'apricorn-balls': '球果精靈球',
  'apricorn-box': '球果盒',
  'bad-held-items': '負面持有物',
  'baking-only': '烘焙專用',
  'catching-bonus': '捕捉加成',
  choice: '限定系',
  collectibles: '收藏品',
  'curry-ingredients': '咖哩食材',
  'data-cards': '資料卡',
  'dex-completion': '圖鑑完成',
  'dynamax-crystals': '極巨化水晶',
  'effort-drop': '努力值降低',
  'effort-training': '努力值訓練',
  'event-items': '活動道具',
  evolution: '進化',
  flutes: '笛子',
  gameplay: '遊戲機制',
  healing: '回復',
  'held-items': '持有物',
  'in-a-pinch': '危機回復',
  jewels: '寶石',
  loot: '戰利品',
  medicine: '樹果',
  'mega-stones': '超級進化石',
  memories: '屬性記憶',
  'miracle-shooter': '神奇射擊',
  mulch: '肥料',
  'nature-mints': '性格薄荷',
  other: '其他',
  'picky-healing': '挑剔回復',
  picnic: '野餐',
  plates: '石板',
  'plot-advancement': '劇情推進',
  'pp-recovery': 'PP 回復',
  revival: '復活',
  'sandwich-ingredients': '三明治食材',
  scarves: '圍巾',
  'special-balls': '特殊精靈球',
  'species-candies': '糖果',
  'species-specific': '特定寶可夢',
  spelunking: '探窟',
  'standard-balls': '標準精靈球',
  'stat-boosts': '能力強化',
  'status-cures': '狀態治療',
  'tera-shard': '太晶碎塊',
  'tm-materials': '招式機材料',
  training: '調整',
  'type-enhancement': '屬性強化',
  'type-protection': '屬性防護',
  unused: '未使用',
  vitamins: '強化道具',
  'z-crystals': 'Z 純晶',
};

export const ITEM_POCKET_COLORS = {
  pokeballs: '#e85d5d',
  medicine: '#3fb950',
  machines: '#58a6ff',
  berries: '#f778ba',
  battle: '#a371f7',
  key: '#f0883e',
  misc: '#8b949e',
  mail: '#d29922',
};

export const ITEM_CATEGORY_COLOR_OVERRIDES = {
  'held-items': '#d29922',
  evolution: '#e3a008',
  choice: '#d29922',
  plates: '#d29922',
  'mega-stones': '#d29922',
  'z-crystals': '#d29922',
  'effort-training': '#3ddbd9',
  'standard-balls': '#e85d5d',
  'special-balls': '#e85d5d',
  'all-machines': '#58a6ff',
};

export const ATTRIBUTE_LABELS_CN = {
  holdable: '可持有',
  'holdable-active': '可持有（主動）',
  'holdable-passive': '可持有（被動）',
  'usable-in-battle': '戰鬥中可用',
  'usable-overworld': '場地使用',
  consumable: '消耗品',
  countable: '可堆疊',
};

export const GEN_ACCENT_COLORS = {
  1: '#8b949e',
  2: '#7d8590',
  3: '#6e7681',
  4: '#58a6ff',
  5: '#3ddbd9',
  6: '#a371f7',
  7: '#f778ba',
  8: '#ffa657',
  9: '#00d9ff',
};

export const POCKET_PLACEHOLDER_ICONS = {
  pokeballs: '⚪',
  medicine: '💊',
  machines: '💿',
  berries: '🍇',
  battle: '⚔️',
  key: '🔑',
  misc: '📦',
  mail: '✉️',
};

export const CATEGORY_PLACEHOLDER_ICONS = {
  'dynamax-crystals': '💎',
  plates: '🔶',
  'held-items': '🎒',
  evolution: '✨',
  'standard-balls': '⚪',
  'special-balls': '⚪',
};

export function formatSlug(slug) {
  if (!slug) return '—';
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function getCategoryDisplayName(categorySlug) {
  if (!categorySlug) return '未知';
  return CATEGORY_NAMES_CN[categorySlug] || '其他';
}

export function isMachineItem(itemData, slug = itemData?.name || '') {
  if (itemData?.category?.name === 'all-machines') return true;
  return /^(tm|hm|tr)\d+$/i.test(slug);
}

/** 無有效 zh-hant 時的手動繁中譯名 */
export const ITEM_NAME_OVERRIDES_CN = {
  'laheavy-ball': '沉重球',
  'laleaden-ball': '超重球',
  'lagigaton-ball': '巨重球',
  'lafeather-ball': '飛羽球',
  'lawing-ball': '飛翼球',
  'lajet-ball': '疾速球',
  'strange-ball': '奇異球',
};

/** 極巨化水晶依星等命名，共 300 項且無圖示，不列入一般道具圖鑑 */
export function isDynamaxCrystal(slug = '') {
  return /^dynamax-crystal-/i.test(slug);
}

export function parseGenerationNumber(name) {
  const match = /^generation-([ivx]+|\d+)$/i.exec(name || '');
  if (!match) return null;
  const token = match[1].toLowerCase();
  const roman = { i: 1, ii: 2, iii: 3, iv: 4, v: 5, vi: 6, vii: 7, viii: 8, ix: 9 };
  if (roman[token] !== undefined) return roman[token];
  const num = parseInt(token, 10);
  return Number.isFinite(num) ? num : null;
}

export function getLatestItemEffect(itemData) {
  const entries = itemData?.flavor_text_entries?.filter((entry) =>
    entry.language?.name?.toLowerCase() === 'zh-hant'
  ) || [];
  if (!entries.length) return '無繁中效果說明';

  const latest = entries.reduce((best, current) => {
    const curScore = versionGroupScore(current.version_group?.name);
    const bestScore = versionGroupScore(best.version_group?.name);
    return curScore >= bestScore ? current : best;
  });

  const text = latest.text
    .replace(/\s+/g, ' ')
    .replace(/\[VAR[^\]]*]/gi, '寶可夢')
    .trim();
  return isPlaceholderTranslation(text) ? '無繁中效果說明' : text;
}

/** Index presence is not proof that an item is obtainable in that game. Never guess from IDs. */
export function getItemGenerations(itemData) {
  const gens = new Set((itemData?.game_indices || [])
    .map((index) => parseGenerationNumber(index.generation?.name))
    .filter((gen) => gen >= 1 && gen <= 9));
  for (const entry of [...(itemData?.flavor_text_entries || []), ...(itemData?.prices || [])]) {
    const gen = VERSION_GROUP_TO_GEN[entry.version_group?.name];
    if (gen) gens.add(gen);
  }
  return [...gens].sort((a, b) => a - b);
}

export function getItemVersionDetails(itemData, gen) {
  const flavors = itemData?.flavor_text_entries || [];
  const prices = itemData?.prices || [];
  const versions = [...new Set([...flavors, ...prices].map((entry) => entry.version_group?.name))]
    .filter((version) => VERSION_GROUP_TO_GEN[version] === gen)
    .sort((a, b) => versionGroupScore(b) - versionGroupScore(a));
  return versions.map((versionGroup) => ({
    ...getVersionedFlavor(flavors, versionGroup, 'text', { chineseReference: true }),
    prices: prices.filter((price) => price.version_group?.name === versionGroup),
  }));
}

// PokeAPI merges Gen II berries into their successors. Preserve the original
// identities by verified Gen II item index, not by assuming every berry existed.
// https://github.com/pret/pokecrystal/blob/master/constants/item_constants.asm
const GEN2_BERRY_NAMES = {
  74: 'PSNCUREBERRY', 78: 'PRZCUREBERRY', 79: 'BURNT BERRY', 80: 'ICE BERRY',
  83: 'BITTER BERRY', 84: 'MINT BERRY', 109: 'MIRACLEBERRY', 150: 'MYSTERYBERRY',
  173: 'BERRY', 174: 'GOLD BERRY',
};

export function getHistoricalItemName(itemData, gen) {
  if (gen !== 2) return '';
  const index = itemData?.game_indices?.find((entry) => entry.generation?.name === 'generation-ii');
  return GEN2_BERRY_NAMES[index?.game_index] || '';
}

export function formatItemPrice(price) {
  const currency = { 'poke-dollar': '寶可元', 'battle-point': 'BP', 'league-point': 'LP' };
  const unit = currency[price.currency?.name] || price.currency?.name || '貨幣未提供';
  const amount = (key, unavailable) => price[key] === null ? unavailable
    : Number.isFinite(price[key]) && price[key] >= 0 ? `${price[key]} ${unit}` : '未提供';
  return `買價：${amount('purchase_price', '不可購買')} · 賣價：${amount('sell_price', '不可出售')}`;
}

export function getItemSpriteUrl(itemData, slug) {
  if (itemData?.sprites?.default) return itemData.sprites.default;
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${slug}.png`;
}

export function getItemPlaceholderIcon(pocketSlug, categorySlug) {
  return CATEGORY_PLACEHOLDER_ICONS[categorySlug]
    || POCKET_PLACEHOLDER_ICONS[pocketSlug]
    || POCKET_PLACEHOLDER_ICONS.misc;
}

export function getItemDisplayName(itemData, slug) {
  const zh = getValidChineseName(itemData?.names);
  if (zh) return zh;
  if (ITEM_NAME_OVERRIDES_CN[slug]) return ITEM_NAME_OVERRIDES_CN[slug];
  return formatSlug(slug);
}

export function getItemAccentColor(pocketSlug, categorySlug) {
  if (categorySlug && ITEM_CATEGORY_COLOR_OVERRIDES[categorySlug]) {
    return ITEM_CATEGORY_COLOR_OVERRIDES[categorySlug];
  }
  if (pocketSlug && ITEM_POCKET_COLORS[pocketSlug]) {
    return ITEM_POCKET_COLORS[pocketSlug];
  }
  return ITEM_POCKET_COLORS.misc;
}

export function cssSafeSlug(slug) {
  return (slug || 'unknown').replace(/[^a-z0-9-]/gi, '-');
}

export function formatAttributeLabels(attributes = []) {
  return attributes
    .map((name) => ATTRIBUTE_LABELS_CN[name])
    .filter(Boolean);
}

export function formatOtherGenerations(allGenerations, currentGen) {
  const others = allGenerations.filter((g) => g !== currentGen);
  if (!others.length) return '';
  return `其他有資料的世代：${others.map((g) => `第 ${g} 世代`).join('、')}`;
}
