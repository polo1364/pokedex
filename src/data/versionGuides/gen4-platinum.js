import { pm, rec, assertBattle, assertLeague } from './helpers.js';
import { platinumLeague } from './gen4-platinum-league.js';

const gymRoark = {
  order: 1,
  role: 'gym',
  name: '瓢太',
  location: '黑金市',
  badge: '煤炭徽章',
  badgeType: 'rock',
  party: [
    pm('小拳石', ['rock', 'ground'], 14),
    pm('大岩蛇', ['rock', 'ground'], 16),
  ],
  recommendedTeams: [
    rec('水草開局隊', '草苗龜或波加曼對岩石效果絕佳；百代森林可抓泳圈鼬補水。建議等級 14 以上。', [
      pm('草苗龜', ['grass']),
      pm('波加曼', ['water']),
      pm('泳圈鼬', ['water']),
      pm('小貓怪', ['electric']),
      pm('姆克兒', ['normal', 'flying']),
    ]),
    rec('格鬥補刀隊', '黑金炭坑可抓腕力，格鬥打岩石；小火焰猴早期學電光一閃補刀。', [
      pm('波加曼', ['water']),
      pm('小火焰猴', ['fire']),
      pm('腕力', ['fighting']),
      pm('小貓怪', ['electric']),
      pm('頭蓋龍', ['rock']),
    ]),
  ],
};
assertBattle(gymRoark);

const gymGardenia = {
  order: 2,
  role: 'gym',
  name: '菜種',
  location: '百代市',
  badge: '森林徽章',
  badgeType: 'grass',
  party: [
    pm('草苗龜', ['grass'], 22),
    pm('櫻花兒', ['grass'], 24),
    pm('羅絲雷朵', ['grass', 'poison'], 26),
  ],
  recommendedTeams: [
    rec('火飛剋制隊', '小火焰猴進化猛火猴對草效果絕佳；姆克兒進化姆克鷹以飛行系補刀，可壓制羅絲雷朵。', [
      pm('猛火猴', ['fire', 'fighting']),
      pm('姆克兒', ['normal', 'flying']),
      pm('小貓怪', ['electric']),
      pm('波皇子', ['water']),
      pm('頭蓋龍', ['rock']),
    ]),
    rec('毒系突破隊', '百代森林可抓不良蛙，毒系打草；飛行系姆克鷹穩定輸出。', [
      pm('不良蛙', ['poison', 'fighting']),
      pm('姆克鷹', ['normal', 'flying']),
      pm('小火焰猴', ['fire']),
      pm('波加曼', ['water']),
      pm('勒克貓', ['electric']),
    ]),
  ],
};
assertBattle(gymGardenia);

const gymMaylene = {
  order: 3,
  role: 'gym',
  name: '阿李',
  location: '帷幕市',
  badge: '帷幕徽章',
  badgeType: 'fighting',
  party: [
    pm('瑪沙那', ['fighting', 'psychic'], 28),
    pm('路卡利歐', ['fighting', 'steel'], 31),
  ],
  recommendedTeams: [
    rec('飛行超能隊', '姆克鷹飛行系對格鬥效果絕佳；蛋孵化利歐路進化路卡利歐可對拼。', [
      pm('姆克鷹', ['normal', 'flying']),
      pm('利歐路', ['fighting', 'steel']),
      pm('波皇子', ['water']),
      pm('勒克貓', ['electric']),
      pm('樹林龜', ['grass', 'ground']),
    ]),
    rec('超能剋制隊', '瑪沙那超能格鬥雙屬，飛行系優先；勒克貓補電系輸出。', [
      pm('姆克鷹', ['normal', 'flying']),
      pm('勒克貓', ['electric']),
      pm('波皇子', ['water']),
      pm('猛火猴', ['fire', 'fighting']),
      pm('無殼海兔', ['water']),
    ]),
  ],
};
assertBattle(gymMaylene);

const gymWake = {
  order: 4,
  role: 'gym',
  name: '吉憲',
  location: '濱名市',
  badge: '濕地徽章',
  badgeType: 'water',
  party: [
    pm('暴鯉龍', ['water', 'flying'], 32),
    pm('浮潛鼬', ['water'], 35),
    pm('沼王', ['water', 'ground'], 35),
  ],
  recommendedTeams: [
    rec('草電雙剋隊', '樹林龜草系打沼王與浮潛鼬；勒克貓打暴鯉龍。', [
      pm('樹林龜', ['grass', 'ground']),
      pm('勒克貓', ['electric']),
      pm('姆克鷹', ['normal', 'flying']),
      pm('猛火猴', ['fire', 'fighting']),
      pm('無殼海兔', ['water']),
    ]),
    rec('電系核心隊', '小貓怪線電系穩定；草系補刀沼王地面屬性。', [
      pm('勒克貓', ['electric']),
      pm('樹林龜', ['grass', 'ground']),
      pm('姆克鷹', ['normal', 'flying']),
      pm('波皇子', ['water']),
      pm('利歐路', ['fighting', 'steel']),
    ]),
  ],
};
assertBattle(gymWake);

const gymByron = {
  order: 5,
  role: 'gym',
  name: '東瓜',
  location: '水脈市',
  badge: '礦山徽章',
  badgeType: 'steel',
  party: [
    pm('三合一磁怪', ['electric', 'steel'], 41),
    pm('大鋼蛇', ['steel', 'ground'], 42),
    pm('護城龍', ['steel', 'rock'], 43),
  ],
  recommendedTeams: [
    rec('火格鬥隊', '猛火猴或烈焰猴火系打鋼；路卡利歐格鬥穩定突破護城龍。', [
      pm('猛火猴', ['fire', 'fighting']),
      pm('路卡利歐', ['fighting', 'steel']),
      pm('樹林龜', ['grass', 'ground']),
      pm('勒克貓', ['electric']),
      pm('姆克鷹', ['normal', 'flying']),
    ]),
    rec('地面水系隊', '樹林龜地震打三合一磁怪；海兔獸水地面雙屬扛傷反打。', [
      pm('樹林龜', ['grass', 'ground']),
      pm('海兔獸', ['water', 'ground']),
      pm('勒克貓', ['electric']),
      pm('姆克鷹', ['normal', 'flying']),
      pm('烈焰猴', ['fire', 'fighting']),
    ]),
  ],
};
assertBattle(gymByron);

const gymFantina = {
  order: 6,
  role: 'gym',
  name: '梅麗莎',
  location: '緣之市',
  badge: '幻覺徽章',
  badgeType: 'ghost',
  party: [
    pm('夢妖魔', ['ghost'], 46),
    pm('耿鬼', ['ghost', 'poison'], 48),
    pm('隨風球', ['ghost', 'flying'], 48),
    pm('耿鬼', ['ghost', 'poison'], 50),
    pm('黑夜魔靈', ['ghost'], 50),
  ],
  recommendedTeams: [
    rec('惡系剋制隊', '鬼系怕惡與鬼；姆克鷹飛行打夢妖魔，路卡利歐波導彈破耿鬼。', [
      pm('姆克鷹', ['normal', 'flying']),
      pm('路卡利歐', ['fighting', 'steel']),
      pm('勒克貓', ['electric']),
      pm('土台龜', ['grass', 'ground']),
      pm('烈焰猴', ['fire', 'fighting']),
    ]),
    rec('超能暗影隊', '利歐路暗影球打鬼系；電系補刀隨風球飛行屬性。', [
      pm('路卡利歐', ['fighting', 'steel']),
      pm('勒克貓', ['electric']),
      pm('姆克鷹', ['normal', 'flying']),
      pm('烈焰猴', ['fire', 'fighting']),
      pm('海兔獸', ['water', 'ground']),
    ]),
  ],
};
assertBattle(gymFantina);

const gymCandice = {
  order: 7,
  role: 'gym',
  name: '小菘',
  location: '雪峰市',
  badge: '冰凍徽章',
  badgeType: 'ice',
  party: [
    pm('雪笠怪', ['grass', 'ice'], 42),
    pm('狃拉', ['dark', 'ice'], 42),
    pm('長毛豬', ['ice', 'ground'], 44),
    pm('暴雪王', ['grass', 'ice'], 46),
  ],
  recommendedTeams: [
    rec('火格鬥隊', '烈焰猴火系打冰效果絕佳；路卡利歐格鬥打暴雪王與狃拉。', [
      pm('烈焰猴', ['fire', 'fighting']),
      pm('路卡利歐', ['fighting', 'steel']),
      pm('倫琴貓', ['electric']),
      pm('姆克鷹', ['normal', 'flying']),
      pm('海兔獸', ['water', 'ground']),
    ]),
    rec('鋼火雙剋隊', '帝王拿波鋼系抗冰並反打；烈焰猴處理雪笠怪草冰雙屬。', [
      pm('帝王拿波', ['water', 'steel']),
      pm('烈焰猴', ['fire', 'fighting']),
      pm('倫琴貓', ['electric']),
      pm('姆克鷹', ['normal', 'flying']),
      pm('土台龜', ['grass', 'ground']),
    ]),
  ],
};
assertBattle(gymCandice);

const gymVolkner = {
  order: 8,
  role: 'gym',
  name: '電次',
  location: '濱海市',
  badge: '電氣徽章',
  badgeType: 'electric',
  party: [
    pm('雷伊布', ['electric'], 48),
    pm('雷丘', ['electric'], 48),
    pm('倫琴貓', ['electric'], 50),
    pm('電擊魔獸', ['electric'], 52),
  ],
  recommendedTeams: [
    rec('地面剋制隊', '土台龜或海兔獸地面系免疫電且效果絕佳；草系補刀雷伊布。', [
      pm('土台龜', ['grass', 'ground']),
      pm('海兔獸', ['water', 'ground']),
      pm('烈焰猴', ['fire', 'fighting']),
      pm('路卡利歐', ['fighting', 'steel']),
      pm('姆克鷹', ['normal', 'flying']),
    ]),
    rec('地面主力隊', '土台龜地震穩定輸出；路卡利歐近身戰補刀電擊魔獸。', [
      pm('土台龜', ['grass', 'ground']),
      pm('路卡利歐', ['fighting', 'steel']),
      pm('帝王拿波', ['water', 'steel']),
      pm('姆克鷹', ['normal', 'flying']),
      pm('瑪狃拉', ['dark', 'ice']),
    ]),
  ],
};
assertBattle(gymVolkner);

const eliteAaron = {
  order: 1,
  role: 'eliteFour',
  name: '阿柳',
  specialty: 'bug',
  party: [
    pm('毒粉蛾', ['bug', 'poison'], 53),
    pm('狩獵鳳蝶', ['bug', 'flying'], 53),
    pm('毒粉蛾', ['bug', 'poison'], 54),
    pm('蜂女王', ['bug', 'flying'], 55),
    pm('赫拉克羅斯', ['bug', 'fighting'], 57),
  ],
};
assertBattle(eliteAaron);

const eliteBertha = {
  order: 2,
  role: 'eliteFour',
  name: '菊野',
  specialty: 'ground',
  party: [
    pm('鯰魚王', ['water', 'ground'], 55),
    pm('河馬獸', ['ground'], 56),
    pm('隆隆岩', ['rock', 'ground'], 56),
    pm('天蠍王', ['ground', 'flying'], 57),
    pm('超甲狂犀', ['ground', 'rock'], 59),
  ],
};
assertBattle(eliteBertha);

const eliteFlint = {
  order: 3,
  role: 'eliteFour',
  name: '大葉',
  specialty: 'fire',
  party: [
    pm('黑魯加', ['dark', 'fire'], 59),
    pm('火伊布', ['fire'], 59),
    pm('烈焰馬', ['fire'], 60),
    pm('鴨嘴炎獸', ['fire'], 61),
    pm('烈焰猴', ['fire', 'fighting'], 61),
  ],
};
assertBattle(eliteFlint);

const eliteLucian = {
  order: 4,
  role: 'eliteFour',
  name: '悟松',
  specialty: 'psychic',
  party: [
    pm('魔牆人偶', ['psychic'], 57),
    pm('麒麟奇', ['normal', 'psychic'], 57),
    pm('青銅鐘', ['steel', 'psychic'], 60),
    pm('胡地', ['psychic'], 60),
    pm('艾路雷朵', ['psychic', 'fighting'], 63),
  ],
};
assertBattle(eliteLucian);

const championCynthia = {
  role: 'champion',
  name: '竹蘭',
  specialty: 'dragon',
  party: [
    pm('花岩怪', ['ghost', 'dark'], 60),
    pm('羅絲雷朵', ['grass', 'poison'], 60),
    pm('海兔獸', ['water', 'ground'], 60),
    pm('路卡利歐', ['fighting', 'steel'], 62),
    pm('美納斯', ['water'], 62),
    pm('烈咬陸鯊', ['dragon', 'ground'], 64),
  ],
};
assertBattle(championCynthia);

const league = platinumLeague;
assertLeague(league);

export const platinumGuide = {
  id: 'platinum',
  title: '寶可夢 白金',
  displayGeneration: 4,
  status: 'complete',
  notes: '白金版道館順序與鑽石／珍珠不同：第 5 道館為東瓜、第 6 為梅麗莎，等級整體較高。通關後反轉世界與戰鬥開拓區為 DLC 書籤。',
  gyms: [
    gymRoark,
    gymGardenia,
    gymMaylene,
    gymWake,
    gymByron,
    gymFantina,
    gymCandice,
    gymVolkner,
  ],
  eliteFour: [eliteAaron, eliteBertha, eliteFlint, eliteLucian],
  champion: championCynthia,
  league,
};
