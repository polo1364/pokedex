import { pm, rec, assertBattle, assertLeague } from './helpers.js';
import { black2White2League } from './gen5-black-2-white-2-league.js';

const gymCheren = {
  order: 1,
  role: 'gym',
  name: '共平',
  location: '檜扇市',
  badge: '基礎徽章',
  badgeType: 'normal',
  party: [
    pm('哈約克', ['normal'], 20),
    pm('長毛狗', ['normal'], 22),
  ],
  recommendedTeams: [
    rec('格鬥剋制隊', '共平為一般系；格鬥系效果絕佳。檜扇市周邊可抓小約克、探探鼠練等。', [
      pm('暖暖豬', ['fire']),
      pm('水水獺', ['water']),
      pm('藤藤蛇', ['grass']),
      pm('小約克', ['normal']),
      pm('扒手貓', ['dark']),
    ]),
    rec('屬性壓制隊', '御三家依開局穩定輸出；斑斑馬補電系。建議等級 20 以上。', [
      pm('炒炒豬', ['fire', 'fighting']),
      pm('雙刃丸', ['water']),
      pm('青藤蛇', ['grass']),
      pm('斑斑馬', ['electric']),
      pm('高傲雉雞', ['normal', 'flying']),
    ]),
  ],
};
assertBattle(gymCheren);

const gymRoxie = {
  order: 2,
  role: 'gym',
  name: '霍米加',
  location: '立湧市',
  badge: '毒性徽章',
  badgeType: 'poison',
  party: [
    pm('瓦斯彈', ['poison'], 16),
    pm('車輪毬', ['bug', 'poison'], 18),
  ],
  recommendedTeams: [
    rec('超能地面隊', '滾滾蝙蝠進化心蝙蝠超能系打毒；螺釘地鼠地面系穩定。立湧工廠前可練。', [
      pm('心蝙蝠', ['psychic', 'flying']),
      pm('螺釘地鼠', ['ground']),
      pm('高傲雉雞', ['normal', 'flying']),
      pm('炒炒豬', ['fire', 'fighting']),
      pm('雙刃丸', ['water']),
    ]),
    rec('飛行火隊', '飛行系打毒效果佳；暖暖豬火系補刀車輪毬蟲屬性。', [
      pm('高傲雉雞', ['normal', 'flying']),
      pm('炒炒豬', ['fire', 'fighting']),
      pm('青藤蛇', ['grass']),
      pm('雷電斑馬', ['electric']),
      pm('石丸子', ['rock']),
    ]),
  ],
};
assertBattle(gymRoxie);

const gymBurgh = {
  order: 3,
  role: 'gym',
  name: '亞幹',
  location: '飛雲市',
  badge: '昆蟲徽章',
  badgeType: 'bug',
  party: [
    pm('石居蟹', ['bug', 'rock'], 22),
    pm('車輪毬', ['bug', 'poison'], 22),
    pm('保母蟲', ['bug', 'grass'], 24),
  ],
  recommendedTeams: [
    rec('火飛剋制隊', '炒炒豬或炎武王對蟲效果絕佳；高傲雉雞飛行系補刀。', [
      pm('炒炒豬', ['fire', 'fighting']),
      pm('高傲雉雞', ['normal', 'flying']),
      pm('雷電斑馬', ['electric']),
      pm('龍頭地鼠', ['ground', 'steel']),
      pm('大劍鬼', ['water']),
    ]),
    rec('岩石電隊', '龐岩怪岩石打飛行蟲；雷電斑馬補電系輸出。', [
      pm('龐岩怪', ['rock']),
      pm('雷電斑馬', ['electric']),
      pm('高傲雉雞', ['normal', 'flying']),
      pm('君主蛇', ['grass']),
      pm('炎武王', ['fire', 'fighting']),
    ]),
  ],
};
assertBattle(gymBurgh);

const gymElesa = {
  order: 4,
  role: 'gym',
  name: '小菊兒',
  location: '雷文市',
  badge: '伏特徽章',
  badgeType: 'electric',
  party: [
    pm('電飛鼠', ['electric', 'flying'], 27),
    pm('電飛鼠', ['electric', 'flying'], 27),
    pm('雷電斑馬', ['electric'], 29),
  ],
  recommendedTeams: [
    rec('地面剋制隊', '龍頭地鼠地面系免疫電且效果絕佳，為合眾電系道館標準答案。', [
      pm('龍頭地鼠', ['ground', 'steel']),
      pm('龐岩怪', ['rock']),
      pm('炎武王', ['fire', 'fighting']),
      pm('高傲雉雞', ['normal', 'flying']),
      pm('君主蛇', ['grass']),
    ]),
    rec('地面主力隊', '地幔岩或龐岩怪補岩石；龍頭地鼠地震穩定突破。', [
      pm('龍頭地鼠', ['ground', 'steel']),
      pm('地幔岩', ['rock']),
      pm('大劍鬼', ['water']),
      pm('君主蛇', ['grass']),
      pm('頭巾混混', ['dark', 'fighting']),
    ]),
  ],
};
assertBattle(gymElesa);

const gymClay = {
  order: 5,
  role: 'gym',
  name: '冬沁',
  location: '帆巴市',
  badge: '地平線徽章',
  badgeType: 'ground',
  party: [
    pm('黑眼鱷', ['ground', 'dark'], 31),
    pm('混混鱷', ['ground', 'dark'], 33),
    pm('龍頭地鼠', ['ground', 'steel'], 35),
  ],
  recommendedTeams: [
    rec('水草雙剋隊', '君主蛇草系、大劍鬼水系打地面；避免帶龍頭地鼠同屬對拼。', [
      pm('君主蛇', ['grass']),
      pm('大劍鬼', ['water']),
      pm('高傲雉雞', ['normal', 'flying']),
      pm('炎武王', ['fire', 'fighting']),
      pm('雷電斑馬', ['electric']),
    ]),
    rec('冰水系隊', '大劍鬼水招穩定；高傲雉雞飛行補刀混混鱷。', [
      pm('大劍鬼', ['water']),
      pm('高傲雉雞', ['normal', 'flying']),
      pm('君主蛇', ['grass']),
      pm('炎武王', ['fire', 'fighting']),
      pm('凍原熊', ['ice', 'fighting']),
    ]),
  ],
};
assertBattle(gymClay);

const gymSkyla = {
  order: 6,
  role: 'gym',
  name: '風露',
  location: '吹寄市',
  badge: '噴射徽章',
  badgeType: 'flying',
  party: [
    pm('心蝙蝠', ['psychic', 'flying'], 31),
    pm('高傲雉雞', ['normal', 'flying'], 33),
    pm('舞天鵝', ['water', 'flying'], 35),
  ],
  recommendedTeams: [
    rec('電岩雙剋隊', '雷電斑馬打舞天鵝；龐岩怪岩石打高傲雉雞與心蝙蝠。', [
      pm('雷電斑馬', ['electric']),
      pm('龐岩怪', ['rock']),
      pm('龍頭地鼠', ['ground', 'steel']),
      pm('炎武王', ['fire', 'fighting']),
      pm('君主蛇', ['grass']),
    ]),
    rec('電系核心隊', '雷電斑馬十萬伏特穩定突破飛行隊。', [
      pm('雷電斑馬', ['electric']),
      pm('龍頭地鼠', ['ground', 'steel']),
      pm('大劍鬼', ['water']),
      pm('頭巾混混', ['dark', 'fighting']),
      pm('凍原熊', ['ice', 'fighting']),
    ]),
  ],
};
assertBattle(gymSkyla);

const gymDrayden = {
  order: 7,
  role: 'gym',
  name: '夏卡',
  location: '龍之橋',
  badge: '傳說徽章',
  badgeType: 'dragon',
  party: [
    pm('斧牙龍', ['dragon'], 39),
    pm('雙斧戰龍', ['dragon'], 41),
  ],
  recommendedTeams: [
    rec('冰系剋制隊', '凍原熊或幾何雪花冰系打龍效果絕佳；雪花市後必練冰招。', [
      pm('凍原熊', ['ice', 'fighting']),
      pm('龐岩怪', ['rock']),
      pm('炎武王', ['fire', 'fighting']),
      pm('君主蛇', ['grass']),
      pm('高傲雉雞', ['normal', 'flying']),
    ]),
    rec('冰岩雙核隊', '冰系主力＋龐岩怪補岩石；龍頭地鼠補地面傷害。', [
      pm('凍原熊', ['ice', 'fighting']),
      pm('龐岩怪', ['rock']),
      pm('大劍鬼', ['water']),
      pm('雷電斑馬', ['electric']),
      pm('頭巾混混', ['dark', 'fighting']),
    ]),
  ],
};
assertBattle(gymDrayden);

const gymMarlon = {
  order: 8,
  role: 'gym',
  name: '西子伊',
  location: '青海波市',
  badge: '波浪徽章',
  badgeType: 'water',
  party: [
    pm('胖嘟嘟', ['water', 'ghost'], 37),
    pm('保母曼波', ['water'], 39),
    pm('肋骨海龜', ['water', 'rock'], 41),
  ],
  recommendedTeams: [
    rec('草電雙剋隊', '君主蛇草系打水效果絕佳；雷電斑馬打胖嘟嘟與保母曼波。', [
      pm('君主蛇', ['grass']),
      pm('雷電斑馬', ['electric']),
      pm('凍原熊', ['ice', 'fighting']),
      pm('高傲雉雞', ['normal', 'flying']),
      pm('炎武王', ['fire', 'fighting']),
    ]),
    rec('草系核心隊', '君主蛇飛葉風暴穩定；電系補刀保母曼波。肋骨海龜岩水，用草系優先。', [
      pm('君主蛇', ['grass']),
      pm('雷電斑馬', ['electric']),
      pm('龍頭地鼠', ['ground', 'steel']),
      pm('頭巾混混', ['dark', 'fighting']),
      pm('炎武王', ['fire', 'fighting']),
    ]),
  ],
};
assertBattle(gymMarlon);

const eliteShauntal = {
  order: 1,
  role: 'eliteFour',
  name: '嘉德麗雅',
  specialty: 'ghost',
  party: [
    pm('死神棺', ['ghost'], 55),
    pm('泥偶巨人', ['ground', 'ghost'], 55),
    pm('水晶燈火靈', ['ghost', 'fire'], 57),
  ],
};
assertBattle(eliteShauntal);

const eliteMarshal = {
  order: 2,
  role: 'eliteFour',
  name: '連武',
  specialty: 'fighting',
  party: [
    pm('投摔鬼', ['fighting'], 55),
    pm('打擊鬼', ['fighting'], 55),
    pm('修建老匠', ['fighting'], 57),
  ],
};
assertBattle(eliteMarshal);

const eliteGrimsley = {
  order: 3,
  role: 'eliteFour',
  name: '越橘',
  specialty: 'dark',
  party: [
    pm('頭巾混混', ['dark', 'fighting'], 55),
    pm('流氓鱷', ['ground', 'dark'], 55),
    pm('劈斬司令', ['dark', 'steel'], 57),
  ],
};
assertBattle(eliteGrimsley);

const eliteCaitlin = {
  order: 4,
  role: 'eliteFour',
  name: '卡特萊娜',
  specialty: 'psychic',
  party: [
    pm('哥德小姐', ['psychic'], 55),
    pm('夢夢蝕', ['psychic'], 55),
    pm('人造細胞卵', ['psychic'], 57),
  ],
};
assertBattle(eliteCaitlin);

const championIris = {
  role: 'champion',
  name: '艾莉絲',
  specialty: 'dragon',
  party: [
    pm('赤面龍', ['dragon'], 57),
    pm('混混鱷', ['ground', 'dark'], 57),
    pm('始祖大鳥', ['rock', 'flying'], 57),
    pm('雙斧戰龍', ['dragon'], 58),
    pm('三首惡龍', ['dark', 'dragon'], 58),
    pm('龍頭地鼠', ['ground', 'steel'], 57),
  ],
};
assertBattle(championIris);

const league = black2White2League;
assertLeague(league);

export const black2White2Guide = {
  id: 'black-2-white-2',
  title: '寶可夢 黑2／白2',
  displayGeneration: 5,
  status: 'complete',
  notes: '黑2／白2版道館順序與館主與黑／白不同（共平、霍米加、西子伊等）。冠軍為艾莉絲而非阿戴克。',
  gyms: [
    gymCheren,
    gymRoxie,
    gymBurgh,
    gymElesa,
    gymClay,
    gymSkyla,
    gymDrayden,
    gymMarlon,
  ],
  eliteFour: [eliteShauntal, eliteMarshal, eliteGrimsley, eliteCaitlin],
  champion: championIris,
  league,
};
