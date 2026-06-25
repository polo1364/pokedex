import { BASE_URL } from '../config.js';
import { fetchJson, runPool } from '../api/client.js';
import { getChineseName } from './i18n.js';
import { renderInfoCard } from './infoCards.js';

/** 版本群組由舊到新（實際發售順序，非 API 列表順序） */
export const VERSION_GROUP_ORDER = [
  'red-blue', 'red-green-japan', 'blue-japan', 'yellow',
  'gold-silver', 'crystal',
  'ruby-sapphire', 'emerald', 'firered-leafgreen',
  'diamond-pearl', 'platinum',
  'heartgold-soulsilver',
  'black-white', 'black-2-white-2',
  'colosseum', 'xd',
  'x-y', 'omega-ruby-alpha-sapphire',
  'sun-moon', 'ultra-sun-ultra-moon',
  'lets-go-pikachu-lets-go-eevee',
  'sword-shield', 'the-isle-of-armor', 'the-crown-tundra',
  'brilliant-diamond-shining-pearl',
  'legends-arceus',
  'scarlet-violet', 'the-teal-mask', 'the-indigo-disk',
  'legends-za', 'mega-dimension', 'champions',
];

/** 單一版本由新到舊（圖鑑說明等用途） */
export const VERSION_ORDER = [
  'champions', 'mega-dimension', 'legends-za',
  'scarlet', 'violet', 'the-indigo-disk', 'the-teal-mask',
  'legends-arceus', 'brilliant-diamond', 'shining-pearl',
  'sword', 'shield', 'the-isle-of-armor', 'the-crown-tundra',
  'lets-go-pikachu', 'lets-go-eevee',
  'ultra-sun', 'ultra-moon', 'sun', 'moon',
  'omega-ruby', 'alpha-sapphire', 'x', 'y',
  'black-2', 'white-2', 'black', 'white',
  'heartgold', 'soulsilver', 'platinum', 'diamond', 'pearl',
  'emerald', 'firered', 'leafgreen', 'ruby', 'sapphire',
  'crystal', 'gold', 'silver', 'yellow', 'blue', 'red',
];

/** 靜態繁中譯名（API 無譯名時的後備） */
export const VERSION_NAMES_CN = {
  red: '寶可夢 紅', blue: '寶可夢 藍', yellow: '寶可夢 黃',
  gold: '寶可夢 金', silver: '寶可夢 銀', crystal: '寶可夢 水晶',
  ruby: '寶可夢 紅寶石', sapphire: '寶可夢 藍寶石', emerald: '寶可夢 綠寶石',
  firered: '寶可夢 火紅', leafgreen: '寶可夢 葉綠',
  diamond: '寶可夢 鑽石', pearl: '寶可夢 珍珠', platinum: '寶可夢 白金',
  heartgold: '寶可夢 心金', soulsilver: '寶可夢 魂銀',
  black: '寶可夢 黑', white: '寶可夢 白',
  'black-2': '寶可夢 黑2', 'white-2': '寶可夢 白2',
  x: '寶可夢 X', y: '寶可夢 Y',
  'omega-ruby': '寶可夢 終極紅寶石', 'alpha-sapphire': '寶可夢 始源藍寶石',
  sun: '寶可夢 太陽', moon: '寶可夢 月亮',
  'ultra-sun': '寶可夢 究極之日', 'ultra-moon': '寶可夢 究極之月',
  'lets-go-pikachu': '寶可夢 Let\'s Go 皮卡丘',
  'lets-go-eevee': '寶可夢 Let\'s Go 伊布',
  sword: '寶可夢 劍', shield: '寶可夢 盾',
  'the-isle-of-armor': '寶可夢 劍 鎧之孤島',
  'the-crown-tundra': '寶可夢 劍 冠之雪原',
  'brilliant-diamond': '寶可夢 晶燦鑽石', 'shining-pearl': '寶可夢 明亮珍珠',
  'legends-arceus': '寶可夢傳說 阿爾宙斯',
  scarlet: '寶可夢 朱', violet: '寶可夢 紫',
  'the-teal-mask': '寶可夢 朱 碧之假面',
  'the-indigo-disk': '寶可夢 朱 藍之圓盤',
  'legends-za': '寶可夢傳說 Z-A',
  'mega-dimension': '超次元爆湧',
  champions: '寶可夢 Champions',
};

/** 各地區圖鑑 → 台灣正作顯示名稱（null 表示略過） */
const POKEDEX_GAME_LABELS = {
  national: null,
  kanto: '寶可夢 關都',
  'original-johto': '寶可夢 城都',
  'updated-johto': '寶可夢 心金／魂銀',
  hoenn: '寶可夢 豐緣',
  'updated-hoenn': '寶可夢 終極紅寶石／始源藍寶石',
  'original-sinnoh': '寶可夢 神奧',
  'extended-sinnoh': '寶可夢 白金／晶燦鑽石／明亮珍珠',
  'original-unova': '寶可夢 合眾',
  'updated-unova': '寶可夢 黑2／白2',
  'conquest-gallery': null,
  'kalos-central': '寶可夢 X／Y',
  'kalos-coastal': '寶可夢 X／Y',
  'kalos-mountain': '寶可夢 X／Y',
  'original-alola': '寶可夢 太陽／月亮',
  'original-melemele': '寶可夢 太陽／月亮',
  'original-akala': '寶可夢 太陽／月亮',
  'original-ulaula': '寶可夢 太陽／月亮',
  'original-poni': '寶可夢 太陽／月亮',
  'updated-alola': '寶可夢 究極之日／究極之月',
  'updated-melemele': '寶可夢 究極之日／究極之月',
  'updated-akala': '寶可夢 究極之日／究極之月',
  'updated-ulaula': '寶可夢 究極之日／究極之月',
  'updated-poni': '寶可夢 究極之日／究極之月',
  'letsgo-kanto': '寶可夢 Let\'s Go',
  galar: '寶可夢 劍／盾',
  'isle-of-armor': '寶可夢 劍 鎧之孤島',
  'crown-tundra': '寶可夢 劍 冠之雪原',
  hisui: '寶可夢傳說 阿爾宙斯',
  paldea: '寶可夢 朱／紫',
  kitakami: '寶可夢 朱 碧之假面',
  blueberry: '寶可夢 朱 藍之圓盤',
  'lumiose-city': '寶可夢傳說 Z-A',
  hyperspace: '超次元爆湧',
  champions: '寶可夢 Champions',
};

const POKEDEX_SHORT_LABELS = {
  national: '全國',
  kanto: '關都',
  'original-johto': '城都',
  'updated-johto': '心金／魂銀',
  hoenn: '豐緣',
  'updated-hoenn': '新豐緣',
  'original-sinnoh': '神奧',
  'extended-sinnoh': '新神奧',
  'original-unova': '合眾',
  'updated-unova': '新合眾',
  'conquest-gallery': '亂戰',
  'kalos-central': '卡洛斯中部',
  'kalos-coastal': '卡洛斯海岸',
  'kalos-mountain': '卡洛斯山岳',
  'original-alola': '阿羅拉',
  'original-melemele': '美樂美樂',
  'original-akala': '阿卡拉',
  'original-ulaula': '烏拉烏拉',
  'original-poni': '波尼',
  'updated-alola': '新阿羅拉',
  'updated-melemele': '新美樂美樂',
  'updated-akala': '新阿卡拉',
  'updated-ulaula': '新烏拉烏拉',
  'updated-poni': '新波尼',
  'letsgo-kanto': 'Let\'s Go 關都',
  galar: '伽勒爾',
  'isle-of-armor': '鎧島',
  'crown-tundra': '王冠雪原',
  hisui: '洗翠',
  paldea: '帕底亞',
  kitakami: '北上',
  blueberry: '藍莓',
  'lumiose-city': '密阿雷',
  hyperspace: '超次元',
  champions: 'Champions',
};

/** 圖鑑條目排序權重（愈大愈新，顯示愈前面） */
const POKEDEX_RELEASE_RANK = {
  champions: 120,
  hyperspace: 119,
  'lumiose-city': 118,
  blueberry: 117,
  kitakami: 116,
  paldea: 115,
  hisui: 114,
  'crown-tundra': 113,
  'isle-of-armor': 112,
  galar: 111,
  'letsgo-kanto': 110,
  'updated-alola': 109,
  'updated-melemele': 109,
  'updated-akala': 109,
  'updated-ulaula': 109,
  'updated-poni': 109,
  'original-alola': 108,
  'original-melemele': 108,
  'original-akala': 108,
  'original-ulaula': 108,
  'original-poni': 108,
  'kalos-central': 107,
  'kalos-coastal': 107,
  'kalos-mountain': 107,
  'updated-unova': 106,
  'original-unova': 105,
  'extended-sinnoh': 104,
  'original-sinnoh': 103,
  'updated-johto': 102,
  'original-johto': 101,
  'updated-hoenn': 100,
  hoenn: 99,
  kanto: 98,
};

export function getPokedexFullLabel(key, { includeNational = false } = {}) {
  if (key === 'national') return includeNational ? '全國圖鑑' : null;
  return POKEDEX_GAME_LABELS[key] || null;
}

export function getPokedexRank(key) {
  if (key === 'national') return -1;
  return POKEDEX_RELEASE_RANK[key] ?? 0;
}

export function versionScore(name) {
  const i = VERSION_ORDER.indexOf(name);
  return i >= 0 ? VERSION_ORDER.length - i : -1;
}

export function versionGroupScore(name) {
  const i = VERSION_GROUP_ORDER.indexOf(name);
  return i >= 0 ? i : -1;
}

/** 招式／進化：取最新版本群組的學習條件 */
export function getLatestVersionGroupDetail(details, method) {
  if (!details?.length) return null;
  const matching = details.filter((d) => d.move_learn_method?.name === method);
  if (!matching.length) return null;
  return matching.reduce((best, cur) => {
    const curScore = versionGroupScore(cur.version_group?.name);
    const bestScore = versionGroupScore(best.version_group?.name);
    return curScore >= bestScore ? cur : best;
  });
}

/** 從物種圖鑑登錄推導出現正作（新→舊） */
export function getSpeciesAppearanceGames(speciesData) {
  if (!speciesData?.pokedex_numbers?.length) return [];

  const seen = new Set();
  const games = [];

  for (const entry of speciesData.pokedex_numbers) {
    const key = entry.pokedex?.name;
    const label = POKEDEX_GAME_LABELS[key];
    if (!label || seen.has(label)) continue;
    seen.add(label);
    games.push({ label, rank: POKEDEX_RELEASE_RANK[key] ?? 0 });
  }

  games.sort((a, b) => b.rank - a.rank);
  return games.map((g) => g.label);
}

export function getRegionalPokedexEntries(speciesData) {
  if (!speciesData?.pokedex_numbers?.length) return [];

  return speciesData.pokedex_numbers
    .map((entry) => {
      const key = entry.pokedex?.name;
      const fullLabel = getPokedexFullLabel(key, { includeNational: true });
      if (!key || !fullLabel) return null;
      return {
        key,
        label: POKEDEX_SHORT_LABELS[key] || fullLabel,
        fullLabel,
        number: entry.entry_number,
        rank: getPokedexRank(key),
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.rank - a.rank || a.label.localeCompare(b.label, 'zh-Hant'));
}

export function renderPokedexNumbersHtml(speciesData) {
  const entries = getRegionalPokedexEntries(speciesData);
  if (!entries.length) return '';

  const cards = entries.map((entry) => renderInfoCard({
    label: entry.label,
    value: `#${String(entry.number).padStart(3, '0')}`,
    kind: 'pokedex',
    tip: `${entry.fullLabel}的圖鑑編號`,
    className: 'pokedex-card',
  })).join('');

  return `<div class="detail-panel detail-section pokedex-section">
    <h3 class="section-title">各地區圖鑑編號</h3>
    <div class="info-grid pokedex-grid">${cards}</div>
  </div>`;
}

let versionNamesCache = null;

/** 從 PokéAPI 載入版本官方繁中譯名並快取 */
export async function loadVersionNames() {
  if (versionNamesCache) return versionNamesCache;

  try {
    const list = await fetchJson(`${BASE_URL}/version?limit=50`, 'version_list');
    const pairs = await runPool(list.results, async (item) => {
      const data = await fetchJson(item.url, `version_${item.name}`);
      const zh = getChineseName(data.names);
      const name = zh !== '（無繁中譯名）' ? zh : (VERSION_NAMES_CN[item.name] || null);
      return name ? [item.name, name] : null;
    });
    versionNamesCache = {
      ...VERSION_NAMES_CN,
      ...Object.fromEntries(pairs.filter(Boolean)),
    };
  } catch {
    versionNamesCache = { ...VERSION_NAMES_CN };
  }

  return versionNamesCache;
}

export function getVersionDisplayName(versionKey) {
  return versionNamesCache?.[versionKey] || VERSION_NAMES_CN[versionKey] || versionKey;
}
