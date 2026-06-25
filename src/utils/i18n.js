import { typeNamesCN } from '../config.js';
import { fetchJson } from '../api/client.js';
import { versionScore } from './versions.js';

/** PokéAPI 語言代碼為小寫 zh-hant（台灣繁體） */
function isZhHant(languageName) {
  return languageName?.toLowerCase() === 'zh-hant';
}

/** 僅採用台灣繁體中文（zh-hant）官方譯名 */
export function getChineseName(names) {
  if (!names?.length) return '（無繁中譯名）';
  const zhHant = names.find((n) => isZhHant(n.language?.name));
  return zhHant?.name || '（無繁中譯名）';
}

/** PokeAPI 有時以 ???／？？？ 佔位，視為無有效繁中譯名 */
export function isPlaceholderTranslation(text) {
  if (!text || text === '（無繁中譯名）') return true;
  const stripped = String(text).replace(/[\s\u003F\uFF1F？?]/g, '');
  return stripped.length === 0;
}

/** 有效繁中譯名；佔位符、非中文或星等代碼時回傳 null */
export function getValidChineseName(names) {
  const zh = getChineseName(names);
  if (isPlaceholderTranslation(zh)) return null;
  if (!/[\u4e00-\u9fff]/.test(zh)) return null;
  return zh;
}

/** 圖鑑／特性說明：僅取繁中，並優先較新版本 */
export function getLatestZhEntry(entries) {
  if (!entries?.length) return null;
  const zh = entries.filter((e) => isZhHant(e.language?.name));
  if (!zh.length) return null;
  return zh.reduce((best, cur) => {
    const curScore = versionScore(cur.version?.name);
    const bestScore = versionScore(best.version?.name);
    if (curScore > bestScore) return cur;
    if (curScore === bestScore) return cur;
    return bestScore >= 0 ? best : cur;
  });
}

async function resolveResourceName(url, cacheKey) {
  if (!url) return '';
  try {
    const data = await fetchJson(url, cacheKey);
    return getChineseName(data.names);
  } catch {
    return '';
  }
}

/** 進化觸發條件（台灣正作常用術語，非道具名） */
const TRIGGER_NAMES = {
  'level-up': '升級',
  trade: '連線交換',
  'use-item': '使用道具',
  shed: '脫殼',
  spin: '原地旋轉',
  'tower-of-darkness': '惡之塔',
  'tower-of-waters': '水之塔',
  'three-critical-hits': '陷入三次要害攻擊',
  'take-damage': '在戰鬥中受到傷害',
  other: '特殊條件',
};

const TIME_OF_DAY = { day: '白天', night: '夜晚', dusk: '傍晚' };

async function formatOneEvolutionDetail(d) {
  const parts = [];
  if (d.min_level) parts.push(`等級 ${d.min_level} 以上`);
  if (d.min_happiness) parts.push(`友好度達 ${d.min_happiness} 以上`);
  if (d.min_affection) parts.push(`好感度達 ${d.min_affection} 以上`);
  if (d.min_beauty) parts.push(`美麗度達 ${d.min_beauty} 以上`);

  if (d.item?.url) {
    const name = await resolveResourceName(d.item.url, `item_${d.item.name}`);
    if (name) parts.push(`使用${name}`);
  }
  if (d.held_item?.url) {
    const name = await resolveResourceName(d.held_item.url, `item_${d.held_item.name}`);
    if (name) parts.push(`攜帶${name}`);
  }
  if (d.known_move?.url) {
    const name = await resolveResourceName(d.known_move.url, `move_${d.known_move.name}`);
    if (name) parts.push(`學會${name}`);
  }
  if (d.known_move_type) {
    parts.push(`學會${typeNamesCN[d.known_move_type.name] || ''}屬性招式`);
  }
  if (d.location?.url) {
    const name = await resolveResourceName(d.location.url, `loc_${d.location.name}`);
    if (name) parts.push(`在${name}`);
  }
  if (d.time_of_day) parts.push(TIME_OF_DAY[d.time_of_day] || '');
  if (d.party_species?.url) {
    const name = await resolveResourceName(d.party_species.url, `species_evo_${d.party_species.name}`);
    if (name) parts.push(`隊伍中有${name}`);
  }
  if (d.party_type) {
    const t = typeNamesCN[d.party_type.name];
    if (t) parts.push(`隊伍中有${t}屬性寶可夢`);
  }
  if (d.trade_species?.url) {
    const name = await resolveResourceName(d.trade_species.url, `species_trade_${d.trade_species.name}`);
    if (name) parts.push(`與${name}連線交換`);
  }
  if (d.needs_overworld_rain) parts.push('下雨時');
  if (d.turn_upside_down) parts.push('翻轉遊戲機');
  if (d.relative_physical_stats === 1) parts.push('攻擊高於防禦');
  if (d.relative_physical_stats === -1) parts.push('攻擊低於防禦');
  if (d.gender === 1) parts.push('雌性');
  if (d.gender === 2) parts.push('雄性');
  if (d.trigger?.name && !parts.length) {
    parts.push(TRIGGER_NAMES[d.trigger.name] || '特殊條件');
  }
  return parts.filter(Boolean).join('、') || '特殊條件';
}

/** 從 PokéAPI 解析進化條件繁中說明（道具／招式等均取官方譯名） */
export async function formatEvolutionDetails(details) {
  if (!details?.length) return '';
  const texts = await Promise.all(details.map((d) => formatOneEvolutionDetail(d)));
  return texts.filter(Boolean).join('／');
}

export function getGenerationFromSpecies(speciesData, generationMap) {
  if (speciesData?.generation?.url) {
    const id = parseInt(speciesData.generation.url.split('/').slice(-2, -1)[0], 10);
    return generationMap[id] || id;
  }
  return null;
}
