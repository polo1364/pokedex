import { pm, rec, assertBattle, assertLeague } from './helpers.js';
import { blackWhiteLeague } from './gen5-black-white-league.js';

const gymTriplet = {
  order: 1,
  role: 'gym',
  name: '天桐／伯特／寇恩',
  location: '三曜市',
  badge: '基礎徽章',
  badgeType: 'grass',
  notes: '依御三家開局對戰剋制屬性館主：藤藤蛇開局對伯特（火）、暖暖豬對寇恩（水）、水水獺對天桐（草）。以下隊伍以天桐（草）為代表。',
  party: [
    pm('小約克', ['normal'], 13),
    pm('花椰猴', ['grass'], 13),
  ],
  recommendedTeams: [
    rec('屬性剋制隊', '選擇能剋制館主屬性的御三家進化形態；1 號道路可抓小約克、探探鼠補位。建議等級 13 以上。', [
      pm('暖暖豬', ['fire']),
      pm('水水獺', ['water']),
      pm('藤藤蛇', ['grass']),
      pm('小約克', ['normal']),
      pm('探探鼠', ['normal']),
    ]),
    rec('電系補刀隊', '夢之境前可抓斑斑馬，電系穩定輸出；御三家依開局選剋制屬性上場。', [
      pm('斑斑馬', ['electric']),
      pm('暖暖豬', ['fire']),
      pm('水水獺', ['water']),
      pm('藤藤蛇', ['grass']),
      pm('扒手貓', ['dark']),
    ]),
  ],
};
assertBattle(gymTriplet);

const gymLenora = {
  order: 2,
  role: 'gym',
  name: '蘭莓',
  location: '鹿子鎮',
  badge: '基礎徽章',
  badgeType: 'normal',
  party: [
    pm('哈約克', ['normal'], 18),
    pm('步哨鼠', ['normal'], 20),
  ],
  recommendedTeams: [
    rec('格鬥剋制隊', '鹿子鎮道館內可練格鬥系；格鬥對一般效果絕佳，可穩定突破哈約克與步哨鼠。', [
      pm('炒炒豬', ['fire', 'fighting']),
      pm('頭巾混混', ['dark', 'fighting']),
      pm('高傲雉雞', ['normal', 'flying']),
      pm('龍頭地鼠', ['ground', 'steel']),
      pm('石丸子', ['rock']),
    ]),
    rec('岩石飛行隊', '石丸子線岩石打一般；高傲雉雞飛行補刀。步哨鼠會用催眠，帶解眠藥。', [
      pm('石丸子', ['rock']),
      pm('高傲雉雞', ['normal', 'flying']),
      pm('青藤蛇', ['grass']),
      pm('雙刃丸', ['water']),
      pm('雷電斑馬', ['electric']),
    ]),
  ],
};
assertBattle(gymLenora);

const gymBurgh = {
  order: 3,
  role: 'gym',
  name: '亞幹',
  location: '飛雲市',
  badge: '昆蟲徽章',
  badgeType: 'bug',
  party: [
    pm('石居蟹', ['bug', 'rock'], 18),
    pm('車輪毬', ['bug', 'poison'], 20),
    pm('保母蟲', ['bug', 'grass'], 22),
  ],
  recommendedTeams: [
    rec('火飛剋制隊', '暖暖豬進化炒炒豬對蟲效果絕佳；高傲雉雞飛行系補刀，可壓制保母蟲與車輪毬。', [
      pm('炒炒豬', ['fire', 'fighting']),
      pm('高傲雉雞', ['normal', 'flying']),
      pm('雷電斑馬', ['electric']),
      pm('龍頭地鼠', ['ground', 'steel']),
      pm('雙刃丸', ['water']),
    ]),
    rec('岩石電隊', '石居蟹岩蟲雙屬，水招或岩石招皆可；雷電斑馬打飛行系補刀。', [
      pm('龐岩怪', ['rock']),
      pm('雷電斑馬', ['electric']),
      pm('高傲雉雞', ['normal', 'flying']),
      pm('雙刃丸', ['water']),
      pm('青藤蛇', ['grass']),
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
    pm('電飛鼠', ['electric', 'flying'], 25),
    pm('電飛鼠', ['electric', 'flying'], 25),
    pm('雷電斑馬', ['electric'], 27),
  ],
  recommendedTeams: [
    rec('地面剋制隊', '螺釘地鼠進化龍頭地鼠，地面系免疫電且效果絕佳；合眾主線最好練的電系對策。', [
      pm('龍頭地鼠', ['ground', 'steel']),
      pm('石丸子', ['rock']),
      pm('炒炒豬', ['fire', 'fighting']),
      pm('高傲雉雞', ['normal', 'flying']),
      pm('雙刃丸', ['water']),
    ]),
    rec('地面主力隊', '地幔岩或龐岩怪補岩石；龍頭地鼠地震穩定突破三隻電系。', [
      pm('龍頭地鼠', ['ground', 'steel']),
      pm('地幔岩', ['rock']),
      pm('君主蛇', ['grass']),
      pm('炎武王', ['fire', 'fighting']),
      pm('大劍鬼', ['water']),
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
    pm('黑眼鱷', ['ground', 'dark'], 29),
    pm('混混鱷', ['ground', 'dark'], 31),
    pm('龍頭地鼠', ['ground', 'steel'], 33),
  ],
  recommendedTeams: [
    rec('水草雙剋隊', '君主蛇或青藤蛇草系打地面；大劍鬼水招穩定；避免再帶龍頭地鼠同屬對拼。', [
      pm('君主蛇', ['grass']),
      pm('大劍鬼', ['water']),
      pm('高傲雉雞', ['normal', 'flying']),
      pm('炎武王', ['fire', 'fighting']),
      pm('雷電斑馬', ['electric']),
    ]),
    rec('冰水系隊', '雙刃丸或蟾蜍王水系；冷凍工廠前可練冰系招補刀混混鱷。', [
      pm('大劍鬼', ['water']),
      pm('高傲雉雞', ['normal', 'flying']),
      pm('君主蛇', ['grass']),
      pm('炎武王', ['fire', 'fighting']),
      pm('保母蟲', ['bug', 'grass']),
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
    pm('心蝙蝠', ['psychic', 'flying'], 29),
    pm('高傲雉雞', ['normal', 'flying'], 31),
    pm('舞天鵝', ['water', 'flying'], 33),
  ],
  recommendedTeams: [
    rec('電岩雙剋隊', '雷電斑馬打舞天鵝與心蝙蝠；石丸子或龐岩怪岩石打高傲雉雞。', [
      pm('雷電斑馬', ['electric']),
      pm('龐岩怪', ['rock']),
      pm('龍頭地鼠', ['ground', 'steel']),
      pm('炎武王', ['fire', 'fighting']),
      pm('君主蛇', ['grass']),
    ]),
    rec('電系核心隊', '雷電斑馬十萬伏特穩定；冰系或岩石招補刀飛行系。', [
      pm('雷電斑馬', ['electric']),
      pm('龍頭地鼠', ['ground', 'steel']),
      pm('大劍鬼', ['water']),
      pm('頭巾混混', ['dark', 'fighting']),
      pm('炎武王', ['fire', 'fighting']),
    ]),
  ],
};
assertBattle(gymSkyla);

const gymBrycen = {
  order: 7,
  role: 'gym',
  name: '哈奇庫',
  location: '雪花市',
  badge: '凍結徽章',
  badgeType: 'ice',
  party: [
    pm('多多冰', ['ice'], 33),
    pm('幾何雪花', ['ice'], 33),
    pm('凍原熊', ['ice', 'fighting'], 35),
  ],
  recommendedTeams: [
    rec('火格鬥隊', '炎武王火系打冰效果絕佳；炒炒豬或頭巾混混格鬥打凍原熊。', [
      pm('炎武王', ['fire', 'fighting']),
      pm('頭巾混混', ['dark', 'fighting']),
      pm('龐岩怪', ['rock']),
      pm('雷電斑馬', ['electric']),
      pm('龍頭地鼠', ['ground', 'steel']),
    ]),
    rec('岩火雙剋隊', '龐岩怪岩石打冰；炎武王處理幾何雪花與多多冰。', [
      pm('龐岩怪', ['rock']),
      pm('炎武王', ['fire', 'fighting']),
      pm('雷電斑馬', ['electric']),
      pm('高傲雉雞', ['normal', 'flying']),
      pm('大劍鬼', ['water']),
    ]),
  ],
};
assertBattle(gymBrycen);

const gymDrayden = {
  order: 8,
  role: 'gym',
  name: '夏卡',
  location: '龍之橋',
  badge: '傳說徽章',
  badgeType: 'dragon',
  notes: '黑版第 8 道館為夏卡；白版為艾莉絲（斧牙龍、赤面龍、雙斧戰龍，龍系對策相同）。',
  party: [
    pm('斧牙龍', ['dragon'], 37),
    pm('雙斧戰龍', ['dragon'], 39),
  ],
  recommendedTeams: [
    rec('冰系剋制隊', '冰系對龍效果絕佳；雪花市後可抓幾何雪花或凍原熊學冰招，或君主蛇帶冰之石。', [
      pm('凍原熊', ['ice', 'fighting']),
      pm('龐岩怪', ['rock']),
      pm('炎武王', ['fire', 'fighting']),
      pm('龍頭地鼠', ['ground', 'steel']),
      pm('高傲雉雞', ['normal', 'flying']),
    ]),
    rec('妖精前代冰岩隊', '第五世代無妖精系，以冰系與岩石系為主；龍頭地鼠不剋龍但可補地面傷害。', [
      pm('凍原熊', ['ice', 'fighting']),
      pm('龐岩怪', ['rock']),
      pm('君主蛇', ['grass']),
      pm('大劍鬼', ['water']),
      pm('雷電斑馬', ['electric']),
    ]),
  ],
};
assertBattle(gymDrayden);

const eliteShauntal = {
  order: 1,
  role: 'eliteFour',
  name: '嘉德麗雅',
  specialty: 'ghost',
  party: [
    pm('死神棺', ['ghost'], 49),
    pm('泥偶巨人', ['ground', 'ghost'], 49),
    pm('水晶燈火靈', ['ghost', 'fire'], 51),
  ],
};
assertBattle(eliteShauntal);

const eliteMarshal = {
  order: 2,
  role: 'eliteFour',
  name: '連武',
  specialty: 'fighting',
  party: [
    pm('投摔鬼', ['fighting'], 49),
    pm('打擊鬼', ['fighting'], 49),
    pm('修建老匠', ['fighting'], 51),
  ],
};
assertBattle(eliteMarshal);

const eliteGrimsley = {
  order: 3,
  role: 'eliteFour',
  name: '越橘',
  specialty: 'dark',
  party: [
    pm('頭巾混混', ['dark', 'fighting'], 49),
    pm('流氓鱷', ['ground', 'dark'], 49),
    pm('劈斬司令', ['dark', 'steel'], 51),
  ],
};
assertBattle(eliteGrimsley);

const eliteCaitlin = {
  order: 4,
  role: 'eliteFour',
  name: '卡特萊娜',
  specialty: 'psychic',
  party: [
    pm('哥德小姐', ['psychic'], 49),
    pm('人造細胞卵', ['psychic'], 51),
  ],
};
assertBattle(eliteCaitlin);

const championAlder = {
  role: 'champion',
  name: '阿戴克',
  specialty: 'fire',
  party: [
    pm('爆炸頭水牛', ['normal'], 65),
    pm('赤面龍', ['dragon'], 66),
    pm('雙倍多多冰', ['ice'], 65),
    pm('雙倍多多冰', ['ice'], 65),
    pm('勇士雄鷹', ['normal', 'flying'], 63),
    pm('火神蛾', ['bug', 'fire'], 67),
  ],
};
assertBattle(championAlder);

const league = blackWhiteLeague;
assertLeague(league);

export const blackWhiteGuide = {
  id: 'black-white',
  title: '寶可夢 黑／白',
  displayGeneration: 5,
  status: 'complete',
  notes: '黑版第 8 道館為夏卡，白版為艾莉絲（隊伍含赤面龍）。第 1 道館依御三家開局對戰三兄弟之一。冠軍為阿戴克。',
  gyms: [
    gymTriplet,
    gymLenora,
    gymBurgh,
    gymElesa,
    gymClay,
    gymSkyla,
    gymBrycen,
    gymDrayden,
  ],
  eliteFour: [eliteShauntal, eliteMarshal, eliteGrimsley, eliteCaitlin],
  champion: championAlder,
  league,
};
