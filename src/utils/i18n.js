import { typeNamesCN } from '../config.js';

export function getChineseName(names) {
  if (!names) return 'Unknown';
  const zhHant = names.find((n) => n.language.name === 'zh-Hant');
  const zhHans = names.find((n) => n.language.name === 'zh-Hans');
  const en = names.find((n) => n.language.name === 'en');
  return (zhHant || zhHans || en)?.name || 'Unknown';
}

const VERSION_ORDER = [
  'red', 'blue', 'yellow', 'gold', 'silver', 'crystal',
  'ruby', 'sapphire', 'emerald', 'firered', 'leafgreen',
  'diamond', 'pearl', 'platinum', 'heartgold', 'soulsilver',
  'black', 'white', 'black-2', 'white-2', 'x', 'y',
  'omega-ruby', 'alpha-sapphire', 'sun', 'moon',
  'ultra-sun', 'ultra-moon', 'lets-go-pikachu', 'lets-go-eevee',
  'sword', 'shield', 'the-isle-of-armor', 'the-crown-tundra',
  'brilliant-diamond', 'shining-pearl', 'legends-arceus',
  'scarlet', 'violet', 'the-teal-mask', 'the-indigo-disk',
];

function versionScore(name) {
  const i = VERSION_ORDER.indexOf(name);
  return i >= 0 ? i : 0;
}

export function getLatestZhEntry(entries) {
  if (!entries?.length) return null;
  const zh = entries.filter(
    (e) => e.language?.name === 'zh-Hant' || e.language?.name === 'zh-Hans'
  );
  if (!zh.length) return null;
  return zh.reduce((best, cur) => {
    const curScore = versionScore(cur.version?.name);
    const bestScore = versionScore(best.version?.name);
    return curScore >= bestScore ? cur : best;
  });
}

const ITEM_NAMES = {
  'fire-stone': '火之石', 'water-stone': '水之石', 'thunder-stone': '雷之石',
  'leaf-stone': '葉之石', 'moon-stone': '月之石', 'sun-stone': '日之石',
  'shiny-stone': '光之石', 'dusk-stone': '暗之石', 'dawn-stone': '覺醒之石',
  'ice-stone': '冰之石', 'oval-stone': '渾圓之石', 'kings-rock': '王者之證',
  'metal-coat': '金屬膜', 'dragon-scale': '龍之鱗片', 'upgrade': '升級資料',
  'protector': '護具', 'electirizer': '電力增幅器', 'magmarizer': '熔岩增幅器',
  'dubious-disc': '可疑補丁', 'reaper-cloth': '靈界之布', 'razor-claw': '銳利之爪',
  'razor-fang': '銳利之牙', 'prism-scale': '美麗鱗片', 'sachet': '香袋',
  'whipped-dream': '泡沫奶油', 'tart-apple': '酸酸蘋果', 'sweet-apple': '甜甜蘋果',
  'cracked-pot': '破裂的茶壺', 'chipped-pot': '缺壺', 'galarica-cuff': '伽勒豆蔻腕環',
  'galarica-wreath': '伽勒豆蔻花圈', 'auspicious-armor': '祝願盔甲', 'malicious-armor': '詛咒之鎧',
  'peat-block': '泥炭塊', 'black-augurite': '黑奇石', 'linking-cord': '聯繫繩',
};

const TRIGGER_NAMES = {
  'level-up': '升級', trade: '交換', 'use-item': '使用道具',
  shed: '蛻皮', spin: '旋轉', 'tower-of-darkness': '惡之塔',
  'tower-of-waters': '水之塔', 'three-critical-hits': '三次要害攻擊',
  'take-damage': '受到傷害', other: '其他',
};

const TIME_OF_DAY = { day: '白天', night: '夜晚', dusk: '黃昏' };

export function formatEvolutionDetails(details) {
  if (!details?.length) return '';
  return details
    .map((d) => {
      const parts = [];
      if (d.min_level) parts.push(`Lv. ${d.min_level}`);
      if (d.min_happiness) parts.push(`親密度 ${d.min_happiness}+`);
      if (d.min_affection) parts.push(`好感度 ${d.min_affection}+`);
      if (d.item) parts.push(ITEM_NAMES[d.item.name] || d.item.name);
      if (d.held_item) parts.push(`持有 ${ITEM_NAMES[d.held_item.name] || d.held_item.name}`);
      if (d.known_move) parts.push(`學會 ${d.known_move.name}`);
      if (d.location) parts.push(d.location.name);
      if (d.time_of_day) parts.push(TIME_OF_DAY[d.time_of_day] || d.time_of_day);
      if (d.party_species) parts.push(`隊伍有 ${d.party_species.name}`);
      if (d.party_type) parts.push(`隊伍有 ${typeNamesCN[d.party_type.name] || d.party_type.name} 屬性`);
      if (d.trade_species) parts.push(`與 ${d.trade_species.name} 交換`);
      if (d.needs_overworld_rain) parts.push('下雨時');
      if (d.turn_upside_down) parts.push('翻轉裝置');
      if (d.trigger) parts.push(TRIGGER_NAMES[d.trigger.name] || d.trigger.name);
      if (d.gender === 1) parts.push('雌性');
      if (d.gender === 2) parts.push('雄性');
      return parts.join(' + ') || '特殊條件';
    })
    .filter(Boolean)
    .join(' / ');
}

export function getGenerationFromSpecies(speciesData, generationMap) {
  if (speciesData?.generation?.url) {
    const id = parseInt(speciesData.generation.url.split('/').slice(-2, -1)[0], 10);
    return generationMap[id] || id;
  }
  return null;
}
