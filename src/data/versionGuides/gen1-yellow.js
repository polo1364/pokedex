import { pm, rec, assertBattle, assertLeague } from './helpers.js';
import { yellowLeague } from './gen1-yellow-league.js';

const gymBrock = {
  order: 1,
  role: 'gym',
  name: '小剛',
  location: '尼比市',
  badge: '灰色徽章',
  badgeType: 'rock',
  party: [
    pm('小拳石', ['rock', 'ground'], 10),
    pm('大岩蛇', ['rock', 'ground'], 12),
  ],
  recommendedTeams: [
    rec(
      '草系剋制隊',
      '黃版僅有皮卡丘起步，可抓綠毛蟲進化或尼多家族以剋岩石；水槍系在取得傑尼龜前可用角金魚補位',
      [
        pm('皮卡丘', ['electric']),
        pm('綠毛蟲', ['bug', 'poison']),
        pm('尼多朗', ['poison']),
        pm('角金魚', ['water']),
        pm('波波', ['normal', 'flying']),
        pm('小拉達', ['normal']),
      ],
    ),
    rec(
      '格鬥系速攻隊',
      '猴怪在 3 號道路可取得，格鬥技對岩石效果絕佳；搭配飛行系補盲點',
      [
        pm('皮卡丘', ['electric']),
        pm('猴怪', ['fighting']),
        pm('比比鳥', ['normal', 'flying']),
        pm('小拉達', ['normal']),
        pm('阿柏蛇', ['poison']),
        pm('綠毛蟲', ['bug', 'poison']),
      ],
    ),
  ],
};
assertBattle(gymBrock);

const gymMisty = {
  order: 2,
  role: 'gym',
  name: '小霞',
  location: '華藍市',
  badge: '藍色徽章',
  badgeType: 'water',
  party: [
    pm('海星星', ['water'], 18),
    pm('寶石海星', ['water', 'psychic'], 21),
  ],
  recommendedTeams: [
    rec(
      '電草雙核隊',
      '皮卡丘十萬伏特穩定剋水；華藍可領妙蛙種子，草系技能可一路用到四天王前',
      [
        pm('皮卡丘', ['electric']),
        pm('妙蛙種子', ['grass', 'poison']),
        pm('比比鳥', ['normal', 'flying']),
        pm('小拉達', ['normal']),
        pm('綠毛蟲', ['bug', 'poison']),
        pm('尼多力諾', ['poison']),
      ],
    ),
    rec(
      '捕蟲電系隊',
      '巴大蝶帶麻痺粉與超音波干擾，皮卡丘主力輸出；避免純毒系打超能力',
      [
        pm('皮卡丘', ['electric']),
        pm('巴大蝶', ['bug', 'poison']),
        pm('猴怪', ['fighting']),
        pm('角金魚', ['water']),
        pm('波波', ['normal', 'flying']),
        pm('阿柏蛇', ['poison']),
      ],
    ),
  ],
};
assertBattle(gymMisty);

const gymLtSurge = {
  order: 3,
  role: 'gym',
  name: '馬志士',
  location: '枯葉市',
  badge: '橙色徽章',
  badgeType: 'electric',
  party: [pm('雷丘', ['electric'], 28)],
  recommendedTeams: [
    rec(
      '地面系剋制隊',
      '黃版馬志士僅有一隻雷丘，地鼠或地系技能一擊必殺；取得傑尼龜後可補水屬',
      [
        pm('地鼠', ['ground']),
        pm('妙蛙種子', ['grass', 'poison']),
        pm('小火龍', ['fire']),
        pm('皮卡丘', ['electric']),
        pm('比比鳥', ['normal', 'flying']),
        pm('尼多力諾', ['poison']),
      ],
    ),
    rec(
      '三御三家隊',
      '24 號道路可領小火龍，枯葉可領傑尼龜；地面系＋草火水覆蓋馬志士單雷丘',
      [
        pm('地鼠', ['ground']),
        pm('妙蛙草', ['grass', 'poison']),
        pm('小火龍', ['fire']),
        pm('傑尼龜', ['water']),
        pm('皮卡丘', ['electric']),
        pm('比比鳥', ['normal', 'flying']),
      ],
    ),
  ],
};
assertBattle(gymLtSurge);

const gymErika = {
  order: 4,
  role: 'gym',
  name: '莉佳',
  location: '玉虹市',
  badge: '彩虹徽章',
  badgeType: 'grass',
  party: [
    pm('蔓藤怪', ['grass'], 30),
    pm('口呆花', ['grass', 'poison'], 32),
    pm('臭臭花', ['grass', 'poison'], 32),
  ],
  recommendedTeams: [
    rec(
      '火飛雙核隊',
      '火系剋草，飛行系免疫地面且剋草；彩虹市可抓小火馬或用已進化的小火龍',
      [
        pm('火恐龍', ['fire']),
        pm('比比鳥', ['normal', 'flying']),
        pm('大比鳥', ['normal', 'flying']),
        pm('皮卡丘', ['electric']),
        pm('傑尼龜', ['water']),
        pm('地鼠', ['ground']),
      ],
    ),
    rec(
      '毒系速攻隊',
      '毒系剋草，毛球或瓦斯彈在彩虹市附近可取得；搭配超音波與睡眠粉干擾',
      [
        pm('毛球', ['bug', 'poison']),
        pm('瓦斯彈', ['poison']),
        pm('火恐龍', ['fire']),
        pm('大比鳥', ['normal', 'flying']),
        pm('皮卡丘', ['electric']),
        pm('地鼠', ['ground']),
      ],
    ),
  ],
};
assertBattle(gymErika);

const gymKoga = {
  order: 5,
  role: 'gym',
  name: '阿桔',
  location: '淺紅市',
  badge: '粉紅徽章',
  badgeType: 'poison',
  party: [
    pm('毛球', ['bug', 'poison'], 44),
    pm('毛球', ['bug', 'poison'], 46),
    pm('毛球', ['bug', 'poison'], 48),
    pm('摩魯蛾', ['bug', 'poison'], 50),
  ],
  recommendedTeams: [
    rec(
      '超能力剋制隊',
      '阿桔四隻蟲毒，超能力系效果絕佳；胡地或勇基拉在黃版可交易取得，凱西也可自行練',
      [
        pm('勇基拉', ['psychic']),
        pm('大比鳥', ['normal', 'flying']),
        pm('火恐龍', ['fire']),
        pm('皮卡丘', ['electric']),
        pm('傑尼龜', ['water']),
        pm('地鼠', ['ground']),
      ],
    ),
    rec(
      '火系清場隊',
      '火系剋蟲，大比鳥補飛行剋毒；注意毛球可能用睡眠粉，帶解眠藥',
      [
        pm('噴火龍', ['fire']),
        pm('大比鳥', ['normal', 'flying']),
        pm('皮卡丘', ['electric']),
        pm('水箭龜', ['water']),
        pm('隆隆石', ['rock', 'ground']),
        pm('勇基拉', ['psychic']),
      ],
    ),
  ],
};
assertBattle(gymKoga);

const gymSabrina = {
  order: 6,
  role: 'gym',
  name: '娜姿',
  location: '金黃市',
  badge: '黃金徽章',
  badgeType: 'psychic',
  party: [
    pm('凱西', ['psychic'], 50),
    pm('勇基拉', ['psychic'], 50),
    pm('胡地', ['psychic'], 50),
  ],
  recommendedTeams: [
    rec(
      '惡系剋制隊',
      '黃版娜姿三隻超能力系且等級 50，耿鬼的惡系（Gen1 以鬼系招式）或高攻擊鬼系可剋制',
      [
        pm('耿鬼', ['ghost', 'poison']),
        pm('大比鳥', ['normal', 'flying']),
        pm('噴火龍', ['fire']),
        pm('水箭龜', ['water']),
        pm('皮卡丘', ['electric']),
        pm('隆隆岩', ['rock', 'ground']),
      ],
    ),
    rec(
      '高速物理隊',
      '凱西無攻擊技可優先處理；大比鳥或大比鳥以物理技突破，地系防胡地',
      [
        pm('大比鳥', ['normal', 'flying']),
        pm('耿鬼', ['ghost', 'poison']),
        pm('隆隆岩', ['rock', 'ground']),
        pm('水箭龜', ['water']),
        pm('噴火龍', ['fire']),
        pm('皮卡丘', ['electric']),
      ],
    ),
  ],
};
assertBattle(gymSabrina);

const gymBlaine = {
  order: 7,
  role: 'gym',
  name: '夏伯',
  location: '紅蓮島',
  badge: '深紅徽章',
  badgeType: 'fire',
  party: [
    pm('九尾', ['fire'], 48),
    pm('烈焰馬', ['fire'], 50),
    pm('風速狗', ['fire'], 54),
  ],
  recommendedTeams: [
    rec(
      '水系剋制隊',
      '三隻火系，水箭龜或拉普拉斯穩定剋制；地系也可但風速狗學習招較廣需留意',
      [
        pm('水箭龜', ['water']),
        pm('拉普拉斯', ['water', 'ice']),
        pm('隆隆岩', ['rock', 'ground']),
        pm('耿鬼', ['ghost', 'poison']),
        pm('大比鳥', ['normal', 'flying']),
        pm('皮卡丘', ['electric']),
      ],
    ),
    rec(
      '地面岩石隊',
      '地系與岩石系雙剋火；紅蓮町前可抓小拳石或地鼠進化',
      [
        pm('隆隆岩', ['rock', 'ground']),
        pm('三地鼠', ['ground']),
        pm('水箭龜', ['water']),
        pm('耿鬼', ['ghost', 'poison']),
        pm('大比鳥', ['normal', 'flying']),
        pm('胡地', ['psychic']),
      ],
    ),
  ],
};
assertBattle(gymBlaine);

const gymGiovanni = {
  order: 8,
  role: 'gym',
  name: '坂木',
  location: '常青市',
  badge: '綠色徽章',
  badgeType: 'ground',
  party: [
    pm('三地鼠', ['ground'], 50),
    pm('貓老大', ['normal'], 53),
    pm('尼多后', ['poison', 'ground'], 53),
    pm('尼多王', ['poison', 'ground'], 55),
    pm('隆隆岩', ['ground', 'rock'], 55),
  ],
  recommendedTeams: [
    rec(
      '水冰剋制隊',
      '水箭龜與拉普拉斯剋地系；大比鳥處理貓老大，耿鬼或胡地對付尼多家族',
      [
        pm('水箭龜', ['water']),
        pm('拉普拉斯', ['water', 'ice']),
        pm('大比鳥', ['normal', 'flying']),
        pm('耿鬼', ['ghost', 'poison']),
        pm('胡地', ['psychic']),
        pm('皮卡丘', ['electric']),
      ],
    ),
    rec(
      '草系剋地隊',
      '妙蛙花四倍剋地鼠，也可對付部分地面系；搭配水與飛行補盲點',
      [
        pm('妙蛙花', ['grass', 'poison']),
        pm('水箭龜', ['water']),
        pm('大比鳥', ['normal', 'flying']),
        pm('耿鬼', ['ghost', 'poison']),
        pm('胡地', ['psychic']),
        pm('皮卡丘', ['electric']),
      ],
    ),
  ],
};
assertBattle(gymGiovanni);

const eliteLorelei = {
  order: 1,
  role: 'eliteFour',
  name: '科拿',
  specialty: 'ice',
  party: [
    pm('白海獅', ['water', 'ice'], 54),
    pm('刺甲貝', ['water', 'ice'], 53),
    pm('呆殼獸', ['water', 'psychic'], 54),
    pm('迷唇姐', ['ice', 'psychic'], 56),
    pm('拉普拉斯', ['water', 'ice'], 56),
  ],
};
assertBattle(eliteLorelei);

const eliteBruno = {
  order: 2,
  role: 'eliteFour',
  name: '希巴',
  specialty: 'fighting',
  party: [
    pm('大岩蛇', ['rock', 'ground'], 53),
    pm('快拳郎', ['fighting'], 55),
    pm('飛腿郎', ['fighting'], 55),
    pm('大岩蛇', ['rock', 'ground'], 56),
    pm('怪力', ['fighting'], 58),
  ],
};
assertBattle(eliteBruno);

const eliteAgatha = {
  order: 3,
  role: 'eliteFour',
  name: '菊子',
  specialty: 'ghost',
  party: [
    pm('耿鬼', ['ghost', 'poison'], 56),
    pm('大嘴蝠', ['poison', 'flying'], 56),
    pm('鬼斯通', ['ghost', 'poison'], 55),
    pm('阿柏怪', ['poison'], 58),
    pm('耿鬼', ['ghost', 'poison'], 60),
  ],
};
assertBattle(eliteAgatha);

const eliteLance = {
  order: 4,
  role: 'eliteFour',
  name: '渡',
  specialty: 'dragon',
  party: [
    pm('暴鯉龍', ['water', 'flying'], 58),
    pm('哈克龍', ['dragon'], 56),
    pm('哈克龍', ['dragon'], 56),
    pm('化石翼龍', ['rock', 'flying'], 60),
    pm('快龍', ['dragon', 'flying'], 62),
  ],
};
assertBattle(eliteLance);

const championBlue = {
  role: 'champion',
  name: '青綠',
  notes: '依前期對戰結果，伊布進化為水／雷／火伊布（此處為連贏兩場→雷伊布路線）；與紅藍冠軍隊完全不同',
  party: [
    pm('穿山王', ['ground'], 61),
    pm('胡地', ['psychic'], 59),
    pm('椰蛋樹', ['grass', 'psychic'], 61),
    pm('刺甲貝', ['water', 'ice'], 61),
    pm('九尾', ['fire'], 63),
    pm('雷伊布', ['electric'], 65),
  ],
};
assertBattle(championBlue);

const league = yellowLeague;
assertLeague(league);

export const yellowGuide = {
  id: 'yellow',
  title: '寶可夢 黃',
  displayGeneration: 1,
  status: 'complete',
  notes: '道館順序與隊伍與紅／藍不同（阿桔在娜姿之前）；玩家固定隨行皮卡丘，青綠依伊布進化路線組隊',
  gyms: [
    gymBrock,
    gymMisty,
    gymLtSurge,
    gymErika,
    gymKoga,
    gymSabrina,
    gymBlaine,
    gymGiovanni,
  ],
  eliteFour: [eliteLorelei, eliteBruno, eliteAgatha, eliteLance],
  champion: championBlue,
  league,
};
