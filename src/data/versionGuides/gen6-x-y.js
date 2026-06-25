import { pm, rec, assertBattle, assertLeague } from './helpers.js';
import { xyLeague } from './gen6-x-y-league.js';

const gymViola = {
  order: 1,
  role: 'gym',
  name: '紫羅蘭',
  location: '白檀市',
  badge: '昆蟲徽章',
  badgeType: 'bug',
  party: [
    pm('粉蝶蛹', ['bug'], 13),
    pm('彩粉蝶', ['bug', 'flying'], 14),
  ],
  recommendedTeams: [
    rec('火飛剋制隊', '火狐狸火系對蟲效果絕佳；2 號道路可抓小箭雀，進化後飛行系補刀彩粉蝶。建議等級 14 以上。', [
      pm('火狐狸', ['fire']),
      pm('小箭雀', ['normal', 'flying']),
      pm('哈力栗', ['grass']),
      pm('呱呱泡蛙', ['water']),
      pm('小獅獅', ['fire', 'normal']),
    ]),
    rec('岩石飛行隊', '3 號道路可抓獨角犀牛，岩石打蟲；御三家依開局選火或飛行補刀。', [
      pm('獨角犀牛', ['ground', 'rock']),
      pm('火狐狸', ['fire']),
      pm('呱呱泡蛙', ['water']),
      pm('哈力栗', ['grass']),
      pm('小箭雀', ['normal', 'flying']),
    ]),
  ],
};
assertBattle(gymViola);

const gymGrant = {
  order: 2,
  role: 'gym',
  name: '查克洛',
  location: '海翼市',
  badge: '岩石徽章',
  badgeType: 'rock',
  party: [
    pm('冰雪龍', ['rock', 'ice'], 25),
    pm('寶寶暴龍', ['rock', 'dragon'], 25),
  ],
  recommendedTeams: [
    rec('水草剋制隊', '呱呱泡蛙水招對岩石效果絕佳；哈力栗草系亦可穩定突破冰雪龍與寶寶暴龍。', [
      pm('呱呱泡蛙', ['water']),
      pm('哈力栗', ['grass']),
      pm('火狐狸', ['fire']),
      pm('小箭雀', ['normal', 'flying']),
      pm('獨角犀牛', ['ground', 'rock']),
    ]),
    rec('格鬥補刀隊', '海翼市前可練格鬥系招；火狐狸或布里卡隆線格鬥打岩石。', [
      pm('火狐狸', ['fire']),
      pm('呱呱泡蛙', ['water']),
      pm('火箭雀', ['fire', 'flying']),
      pm('哈力栗', ['grass']),
      pm('獨角犀牛', ['ground', 'rock']),
    ]),
  ],
};
assertBattle(gymGrant);

const gymKorrina = {
  order: 3,
  role: 'gym',
  name: '可爾妮',
  location: '娑羅市',
  badge: '格鬥徽章',
  badgeType: 'fighting',
  notes: '路卡利歐可 Mega 進化，物攻與速度皆高；建議用飛行或超能系優先處理。',
  party: [
    pm('豪力', ['fighting'], 29),
    pm('功夫鼬', ['fighting'], 29),
    pm('路卡利歐', ['fighting', 'steel'], 32),
  ],
  recommendedTeams: [
    rec('飛行超能隊', '小箭雀進化烈箭鷹，飛行系對格鬥效果絕佳；4 號道路拉魯拉絲超能系遠程輸出。', [
      pm('烈箭鷹', ['fire', 'flying']),
      pm('拉魯拉絲', ['psychic']),
      pm('呱呱泡蛙', ['water']),
      pm('火狐狸', ['fire']),
      pm('哈力栗', ['grass']),
    ]),
    rec('妖精前代飛行隊', '第六世代前無妖精系，以飛行與超能為主；呱頭蛙或長尾火狐補刀功夫鼬。', [
      pm('烈箭鷹', ['fire', 'flying']),
      pm('拉魯拉絲', ['psychic']),
      pm('呱頭蛙', ['water']),
      pm('長尾火狐', ['fire']),
      pm('胖胖哈力', ['grass']),
    ]),
  ],
};
assertBattle(gymKorrina);

const gymRamos = {
  order: 4,
  role: 'gym',
  name: '福爾可',
  location: '香薰市',
  badge: '植物徽章',
  badgeType: 'grass',
  party: [
    pm('毽子棉', ['grass', 'flying'], 30),
    pm('口呆花', ['grass', 'poison'], 31),
    pm('坐騎山羊', ['grass'], 34),
  ],
  recommendedTeams: [
    rec('火飛剋制隊', '火狐狸或烈箭鷹火系對草效果絕佳；飛行系打毽子棉與口呆花。', [
      pm('烈箭鷹', ['fire', 'flying']),
      pm('火狐狸', ['fire']),
      pm('呱頭蛙', ['water']),
      pm('拉魯拉絲', ['psychic']),
      pm('獨角犀牛', ['ground', 'rock']),
    ]),
    rec('毒系補刀隊', '坐騎山羊純草，火飛雙剋；毒系打口呆花同屬性優勢。', [
      pm('烈箭鷹', ['fire', 'flying']),
      pm('長尾火狐', ['fire']),
      pm('甲賀忍蛙', ['water', 'dark']),
      pm('拉魯拉絲', ['psychic']),
      pm('光電傘蜥', ['electric', 'normal']),
    ]),
  ],
};
assertBattle(gymRamos);

const gymClemont = {
  order: 5,
  role: 'gym',
  name: '希特隆',
  location: '密阿雷市',
  badge: '電氣徽章',
  badgeType: 'electric',
  party: [
    pm('電飛鼠', ['electric', 'flying'], 35),
    pm('三合一磁怪', ['electric', 'steel'], 35),
    pm('光電傘蜥', ['electric', 'normal'], 37),
  ],
  recommendedTeams: [
    rec('地面剋制隊', '獨角犀牛地面系免疫電且效果絕佳；哈力栗草系亦可打電飛鼠與光電傘蜥。', [
      pm('獨角犀牛', ['ground', 'rock']),
      pm('哈力栗', ['grass']),
      pm('烈箭鷹', ['fire', 'flying']),
      pm('呱頭蛙', ['water']),
      pm('拉魯拉絲', ['psychic']),
    ]),
    rec('草地面隊', '坐騎山羊或布里卡隆補草；獨角犀牛地震穩定突破三隻電系。', [
      pm('獨角犀牛', ['ground', 'rock']),
      pm('布里卡隆', ['grass', 'fighting']),
      pm('黏黏寶', ['dragon']),
      pm('烈箭鷹', ['fire', 'flying']),
      pm('妖火紅狐', ['fire']),
    ]),
  ],
};
assertBattle(gymClemont);

const gymValerie = {
  order: 6,
  role: 'gym',
  name: '瑪袙芙',
  badge: '妖精徽章',
  badgeType: 'fairy',
  notes: '大嘴娃可 Mega，鋼妖精雙屬；火系與地面系效果佳。仙子伊布純妖精。',
  party: [
    pm('大嘴娃', ['steel', 'fairy'], 38),
    pm('魔牆人偶', ['psychic', 'fairy'], 39),
    pm('仙子伊布', ['fairy'], 42),
  ],
  recommendedTeams: [
    rec('火鋼剋制隊', '火狐狸或烈箭鷹火系打鋼妖精大嘴娃；毒系打仙子伊布。', [
      pm('烈箭鷹', ['fire', 'flying']),
      pm('妖火紅狐', ['fire']),
      pm('甲賀忍蛙', ['water', 'dark']),
      pm('獨角犀牛', ['ground', 'rock']),
      pm('黏美龍', ['dragon']),
    ]),
    rec('鋼毒雙剋隊', '毒系打妖精；鋼系打妖精同樣有效。魔牆人偶超能妖精，惡系或鋼系優先。', [
      pm('甲賀忍蛙', ['water', 'dark']),
      pm('大嘴娃', ['steel', 'fairy']),
      pm('烈箭鷹', ['fire', 'flying']),
      pm('沙奈朵', ['psychic', 'fairy']),
      pm('獨角犀牛', ['ground', 'rock']),
    ]),
  ],
};
assertBattle(gymValerie);

const gymOlympia = {
  order: 7,
  role: 'gym',
  name: '葛吉花',
  location: '映雪市',
  badge: '超能力徽章',
  badgeType: 'psychic',
  party: [
    pm('呆呆王', ['water', 'psychic'], 44),
    pm('烏賊王', ['dark', 'psychic'], 44),
    pm('象徵鳥', ['psychic', 'flying'], 46),
  ],
  recommendedTeams: [
    rec('惡鬼剋制隊', '烏賊王惡超雙屬，惡系與蟲系效果佳；甲賀忍蛙惡系穩定突破。', [
      pm('甲賀忍蛙', ['water', 'dark']),
      pm('沙奈朵', ['psychic', 'fairy']),
      pm('烈箭鷹', ['fire', 'flying']),
      pm('大嘴娃', ['steel', 'fairy']),
      pm('黏美龍', ['dragon']),
    ]),
    rec('惡鋼雙剋隊', '呆呆王水超，草系或電系；象徵鳥飛超，電系或岩系補刀。', [
      pm('甲賀忍蛙', ['water', 'dark']),
      pm('烈箭鷹', ['fire', 'flying']),
      pm('光電傘蜥', ['electric', 'normal']),
      pm('沙奈朵', ['psychic', 'fairy']),
      pm('布里卡隆', ['grass', 'fighting']),
    ]),
  ],
};
assertBattle(gymOlympia);

const gymWulfric = {
  order: 8,
  role: 'gym',
  name: '得撫',
  location: '雪風鎮',
  badge: '冰山徽章',
  badgeType: 'ice',
  party: [
    pm('暴雪王', ['grass', 'ice'], 46),
    pm('幾何雪花', ['ice'], 47),
    pm('冰岩怪', ['ice', 'rock'], 49),
  ],
  recommendedTeams: [
    rec('火格鬥隊', '火狐狸或烈箭鷹火系打冰效果絕佳；布里卡隆格鬥打暴雪王草冰。', [
      pm('妖火紅狐', ['fire']),
      pm('烈箭鷹', ['fire', 'flying']),
      pm('甲賀忍蛙', ['water', 'dark']),
      pm('沙奈朵', ['psychic', 'fairy']),
      pm('黏美龍', ['dragon']),
    ]),
    rec('鋼火雙剋隊', '鋼系打冰；火系處理幾何雪花與冰岩怪。暴雪王草冰，火系四倍剋制。', [
      pm('烈箭鷹', ['fire', 'flying']),
      pm('妖火紅狐', ['fire']),
      pm('大嘴娃', ['steel', 'fairy']),
      pm('甲賀忍蛙', ['water', 'dark']),
      pm('光電傘蜥', ['electric', 'normal']),
    ]),
  ],
};
assertBattle(gymWulfric);

const eliteMalva = {
  order: 1,
  role: 'eliteFour',
  name: '帕琦拉',
  specialty: 'fire',
  party: [
    pm('火炎獅', ['fire', 'normal'], 55),
    pm('煤炭龜', ['fire', 'rock'], 55),
    pm('水晶燈火靈', ['ghost', 'fire'], 57),
  ],
};
assertBattle(eliteMalva);

const eliteSiebold = {
  order: 2,
  role: 'eliteFour',
  name: '志米',
  specialty: 'water',
  party: [
    pm('鋼炮臂蝦', ['water'], 55),
    pm('寶石海星', ['water', 'psychic'], 55),
    pm('暴鯉龍', ['water', 'dark'], 57),
  ],
};
assertBattle(eliteSiebold);

const eliteWikstrom = {
  order: 3,
  role: 'eliteFour',
  name: '雁尾',
  specialty: 'steel',
  party: [
    pm('鑰圈兒', ['steel', 'fairy'], 55),
    pm('大朝北鼻', ['rock', 'steel'], 55),
    pm('堅盾劍怪', ['steel', 'ghost'], 57),
  ],
};
assertBattle(eliteWikstrom);

const eliteDrasna = {
  order: 4,
  role: 'eliteFour',
  name: '朵夫蘭',
  specialty: 'dragon',
  party: [
    pm('毒藻龍', ['poison', 'dragon'], 56),
    pm('赤面龍', ['dragon'], 56),
    pm('七夕青鳥', ['dragon', 'flying'], 58),
    pm('音波龍', ['dragon', 'flying'], 60),
  ],
};
assertBattle(eliteDrasna);

const championDiantha = {
  role: 'champion',
  name: '卡露妮',
  specialty: 'fairy',
  notes: '沙奈朵可 Mega 進化，特攻極高；隊伍混合格鬥、岩石龍與鬼。',
  party: [
    pm('摔角鷹人', ['fighting', 'flying'], 64),
    pm('怪顎龍', ['rock', 'dragon'], 65),
    pm('冰雪巨龍', ['rock', 'ice'], 65),
    pm('南瓜怪人', ['ghost', 'grass'], 65),
    pm('黏美龍', ['dragon'], 66),
    pm('沙奈朵', ['psychic', 'fairy'], 66),
  ],
};
assertBattle(championDiantha);

const league = xyLeague;
assertLeague(league);

export const xyGuide = {
  id: 'x-y',
  title: '寶可夢 X／Y',
  displayGeneration: 6,
  status: 'complete',
  notes: 'X 版與 Y 版道館、四天王、冠軍隊伍相同。部分道館館主會使用 Mega 進化（路卡利歐、大嘴娃、沙奈朵等）。',
  gyms: [
    gymViola,
    gymGrant,
    gymKorrina,
    gymRamos,
    gymClemont,
    gymValerie,
    gymOlympia,
    gymWulfric,
  ],
  eliteFour: [eliteMalva, eliteSiebold, eliteWikstrom, eliteDrasna],
  champion: championDiantha,
  league,
};
