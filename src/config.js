export const BASE_URL = 'https://pokeapi.co/api/v2';
export const CACHE_PREFIX = 'pokedex_pro_v2_';
export const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000;
export const CONCURRENCY_LIMIT = 10;
export const PAGE_SIZE = 50;
export const MOVE_PAGE_SIZE = 50;
export const DATA_STRATEGY = 'species'; // 'species' (1025) | 'all' (1350)

export const typeColors = {
  normal: '#A8A878', fire: '#F08030', water: '#6890F0', electric: '#F8D030',
  grass: '#78C850', ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0',
  ground: '#E0C068', flying: '#A890F0', psychic: '#F85888', bug: '#A8B820',
  rock: '#B8A038', ghost: '#705898', dragon: '#7038F8', dark: '#705848',
  steel: '#B8B8D0', fairy: '#EE99AC',
};

export const typeNamesCN = {
  normal: '一般', fire: '火', water: '水', electric: '電',
  grass: '草', ice: '冰', fighting: '格鬥', poison: '毒',
  ground: '地面', flying: '飛行', psychic: '超能力', bug: '蟲',
  rock: '岩石', ghost: '幽靈', dragon: '龍', dark: '惡',
  steel: '鋼', fairy: '妖精',
};

export const statNames = {
  hp: 'HP', attack: '攻擊', defense: '防禦',
  'special-attack': '特攻', 'special-defense': '特防', speed: '速度',
};

export const versionNamesCN = {
  red: '紅', blue: '藍', yellow: '黃', gold: '金', silver: '銀', crystal: '水晶',
  ruby: '紅寶石', sapphire: '藍寶石', emerald: '綠寶石',
  firered: '火紅', leafgreen: '葉綠',
  diamond: '鑽石', pearl: '珍珠', platinum: '白金',
  heartgold: '心金', soulsilver: '魂銀',
  black: '黑', white: '白', 'black-2': '黑2', 'white-2': '白2',
  x: 'X', y: 'Y',
  'omega-ruby': '終極紅寶石', 'alpha-sapphire': '始源藍寶石',
  sun: '太陽', moon: '月亮',
  'ultra-sun': '究極之日', 'ultra-moon': '究極之月',
  'lets-go-pikachu': "Let's Go 皮卡丘", 'lets-go-eevee': "Let's Go 伊布",
  sword: '劍', shield: '盾',
  'the-isle-of-armor': '鎧之孤島', 'the-crown-tundra': '冠之雪原',
  'brilliant-diamond': '晶燦鑽石', 'shining-pearl': '明亮珍珠',
  'legends-arceus': '傳說 阿爾宙斯',
  scarlet: '朱', violet: '紫',
  'the-teal-mask': '碧之假面', 'the-indigo-disk': '藍之圓盤',
};
