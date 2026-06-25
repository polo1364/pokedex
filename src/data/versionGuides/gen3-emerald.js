import { pm, rec, assertBattle, assertLeague } from './helpers.js';
import { emeraldLeague } from './gen3-emerald-league.js';
import { battleFrontierExpansion } from './gen3-emerald-battle-frontier.js';

const gymRoxanne = {
  order: 1,
  role: 'gym',
  name: '杜娟',
  location: '卡那茲市',
  badge: '岩石徽章',
  badgeType: 'rock',
  party: [
    pm('小拳石', ['rock', 'ground'], 12),
    pm('朝北鼻', ['rock'], 15),
  ],
  recommendedTeams: [
    rec('水草開局隊', '水躍魚對岩石效果絕佳；蓮葉童子草水雙屬也可穩定突破。卡那茲市北側可抓蓮葉童子。', [
      pm('水躍魚', ['water', 'ground']),
      pm('蓮葉童子', ['water', 'grass']),
      pm('木守宮', ['grass']),
      pm('傲骨燕', ['normal', 'flying']),
      pm('蘑蘑菇', ['grass', 'fighting']),
    ]),
    rec('格鬥補刀隊', '藤樹道館前可抓腕力，格鬥打岩石；火稚雞早期學電光一閃補刀。建議等級 14 以上。', [
      pm('水躍魚', ['water', 'ground']),
      pm('火稚雞', ['fire']),
      pm('蘑蘑菇', ['grass', 'fighting']),
      pm('傲骨燕', ['normal', 'flying']),
      pm('拉魯拉絲', ['psychic']),
    ]),
  ],
};
assertBattle(gymRoxanne);

const gymBrawly = {
  order: 2,
  role: 'gym',
  name: '藤樹',
  location: '武鬥鎮',
  badge: '格鬥徽章',
  badgeType: 'fighting',
  party: [
    pm('腕力', ['fighting'], 16),
    pm('幕下力士', ['fighting'], 19),
  ],
  recommendedTeams: [
    rec('飛行超能隊', '傲骨燕飛行系對格鬥效果絕佳；拉魯拉絲超能系遠程輸出，武鬥鎮洞窟可遇。', [
      pm('傲骨燕', ['normal', 'flying']),
      pm('拉魯拉絲', ['psychic']),
      pm('水躍魚', ['water', 'ground']),
      pm('蓮葉童子', ['water', 'grass']),
      pm('力壯雞', ['fire', 'fighting']),
    ]),
    rec('平衡推進隊', '以進化後御三家為主，飛行系必備；水躍魚學冲浪後可遠程削血。', [
      pm('傲骨燕', ['normal', 'flying']),
      pm('水躍魚', ['water', 'ground']),
      pm('力壯雞', ['fire', 'fighting']),
      pm('拉魯拉絲', ['psychic']),
      pm('蘑蘑菇', ['grass', 'fighting']),
    ]),
  ],
};
assertBattle(gymBrawly);

const gymWattson = {
  order: 3,
  role: 'gym',
  name: '鐵旋',
  location: '紫堇市',
  badge: '電氣徽章',
  badgeType: 'electric',
  party: [
    pm('小磁怪', ['electric', 'steel'], 20),
    pm('頑皮雷彈', ['electric'], 20),
    pm('三合一磁怪', ['electric', 'steel'], 22),
  ],
  recommendedTeams: [
    rec('地面剋制隊', '水躍魚地面屬性免疫電且效果絕佳；蓮葉童子草系也可打電。紫堇市前可抓落雷獸備用。', [
      pm('水躍魚', ['water', 'ground']),
      pm('蓮葉童子', ['water', 'grass']),
      pm('蘑蘑菇', ['grass', 'fighting']),
      pm('落雷獸', ['electric']),
      pm('傲骨燕', ['normal', 'flying']),
    ]),
    rec('草系免疫隊', '蘑蘑菇、木守宮草系免疫電系招式；配合地面系水躍魚可穩定突破三隻電系。', [
      pm('蘑蘑菇', ['grass', 'fighting']),
      pm('木守宮', ['grass']),
      pm('水躍魚', ['water', 'ground']),
      pm('拉魯拉絲', ['psychic']),
      pm('傲骨燕', ['normal', 'flying']),
    ]),
  ],
};
assertBattle(gymWattson);

const gymFlannery = {
  order: 4,
  role: 'gym',
  name: '亞莎',
  location: '釜炎鎮',
  badge: '炎熱徽章',
  badgeType: 'fire',
  party: [
    pm('熔岩蟲', ['fire'], 26),
    pm('熔岩蟲', ['fire'], 26),
    pm('煤炭龜', ['fire', 'rock'], 28),
  ],
  recommendedTeams: [
    rec('水地面隊', '水躍魚冲浪對火效果絕佳；蓮葉童子同樣有效。煤炭龜岩火，用水系優先秒殺。', [
      pm('水躍魚', ['water', 'ground']),
      pm('蓮葉童子', ['water', 'grass']),
      pm('落雷獸', ['electric']),
      pm('傲骨燕', ['normal', 'flying']),
      pm('拉魯拉絲', ['psychic']),
    ]),
    rec('岩石水系隊', '釜炎鎮洞窟可抓可可多拉；水躍魚或蓮帽小童為核心，雷電獸補電系輸出。', [
      pm('水躍魚', ['water', 'ground']),
      pm('樂天河童', ['water', 'grass']),
      pm('雷電獸', ['electric']),
      pm('可可多拉', ['rock', 'ground']),
      pm('蘑蘑菇', ['grass', 'fighting']),
    ]),
  ],
};
assertBattle(gymFlannery);

const gymNorman = {
  order: 5,
  role: 'gym',
  name: '千里',
  location: '橙華市',
  badge: '平衡徽章',
  badgeType: 'normal',
  party: [
    pm('懶人獺', ['normal'], 30),
    pm('過動猿', ['normal'], 29),
    pm('直衝熊', ['normal'], 28),
  ],
  recommendedTeams: [
    rec('格鬥剋制隊', '蘑蘑菇斗笠菇線格鬥打一般效果絕佳；懶人獺請假特性會休息，趁休息回合換格鬥手上場。', [
      pm('蘑蘑菇', ['grass', 'fighting']),
      pm('力壯雞', ['fire', 'fighting']),
      pm('水躍魚', ['water', 'ground']),
      pm('樂天河童', ['water', 'grass']),
      pm('雷電獸', ['electric']),
    ]),
    rec('鬼系戰術隊', '懶人獺請假時用鬼系或格鬥系上場集火；橙華森林可抓蘑蘑菇。帶解麻藥與全復藥。', [
      pm('蘑蘑菇', ['grass', 'fighting']),
      pm('勾魂眼', ['dark', 'ghost']),
      pm('水躍魚', ['water', 'ground']),
      pm('力壯雞', ['fire', 'fighting']),
      pm('傲骨燕', ['normal', 'flying']),
    ]),
  ],
};
assertBattle(gymNorman);

const gymWinona = {
  order: 6,
  role: 'gym',
  name: '娜琪',
  location: '茵郁市',
  badge: '羽毛徽章',
  badgeType: 'flying',
  party: [
    pm('大王燕', ['normal', 'flying'], 29),
    pm('大嘴鷗', ['water', 'flying'], 29),
    pm('盔甲鳥', ['steel', 'flying'], 31),
    pm('七夕青鳥', ['dragon', 'flying'], 33),
  ],
  recommendedTeams: [
    rec('電冰雙剋隊', '雷電獸打大嘴鷗與大王燕；冰系打七夕青鳥；力壯雞打火系剋盔甲鳥。', [
      pm('雷電獸', ['electric']),
      pm('力壯雞', ['fire', 'fighting']),
      pm('水躍魚', ['water', 'ground']),
      pm('樂天河童', ['water', 'grass']),
      pm('蘑蘑菇', ['grass', 'fighting']),
    ]),
    rec('岩石電隊', '可可多拉岩石打飛行；雷電獸穩定電系輸出，等級建議 32 以上。', [
      pm('雷電獸', ['electric']),
      pm('可可多拉', ['rock', 'ground']),
      pm('力壯雞', ['fire', 'fighting']),
      pm('水躍魚', ['water', 'ground']),
      pm('拉魯拉絲', ['psychic']),
    ]),
  ],
};
assertBattle(gymWinona);

const gymTateLiza = {
  order: 7,
  role: 'gym',
  name: '小楓與小南',
  location: '綠嶺市',
  badge: '心靈徽章',
  badgeType: 'psychic',
  notes: '雙打道館，須同時派出兩隻寶可夢上場。',
  party: [
    pm('月石', ['rock', 'psychic'], 42),
    pm('太陽岩', ['rock', 'psychic'], 42),
  ],
  recommendedTeams: [
    rec('惡草雙打隊', '勾魂眼惡系打超能；樂天河童草系補刀。雙打建議一坦一攻或雙特攻。', [
      pm('勾魂眼', ['dark', 'ghost']),
      pm('樂天河童', ['water', 'grass']),
      pm('雷電獸', ['electric']),
      pm('水躍魚', ['water', 'ground']),
      pm('蘑蘑菇', ['grass', 'fighting']),
    ]),
    rec('地面超能隊', '水躍魚地震打雙岩；奇魯莉安超能對拼。注意月石與太陽岩會用輔助招式。', [
      pm('水躍魚', ['water', 'ground']),
      pm('奇魯莉安', ['psychic']),
      pm('雷電獸', ['electric']),
      pm('火焰雞', ['fire', 'fighting']),
      pm('勾魂眼', ['dark', 'ghost']),
    ]),
  ],
};
assertBattle(gymTateLiza);

const gymJuan = {
  order: 8,
  role: 'gym',
  name: '亞當',
  location: '琉璃市',
  badge: '雨滴徽章',
  badgeType: 'water',
  party: [
    pm('愛心魚', ['water'], 41),
    pm('鯰魚王', ['water', 'ground'], 43),
    pm('帝牙海獅', ['ice', 'water'], 44),
  ],
  recommendedTeams: [
    rec('草電雙剋隊', '樂天河童草系對水效果絕佳；雷電獸打愛心魚與帝牙海獅。鯰魚王水地面，用草系優先。', [
      pm('樂天河童', ['water', 'grass']),
      pm('雷電獸', ['electric']),
      pm('蘑蘑菇', ['grass', 'fighting']),
      pm('水躍魚', ['water', 'ground']),
      pm('火焰雞', ['fire', 'fighting']),
    ]),
    rec('草系核心隊', '蓮葉童子一路進化樂天河童；電系補刀。帝牙海獅水冰，用電或草高威力招秒殺。', [
      pm('樂天河童', ['water', 'grass']),
      pm('雷電獸', ['electric']),
      pm('木守宮', ['grass']),
      pm('奇魯莉安', ['psychic']),
      pm('傲骨燕', ['normal', 'flying']),
    ]),
  ],
};
assertBattle(gymJuan);

const eliteSidney = {
  order: 1,
  role: 'eliteFour',
  name: '花月',
  specialty: 'dark',
  party: [
    pm('勾魂眼', ['dark', 'ghost'], 46),
    pm('大狼犬', ['dark'], 48),
    pm('狡猾天狗', ['grass', 'dark'], 46),
    pm('夢歌仙人掌', ['grass', 'dark'], 49),
    pm('鐵螯龍蝦', ['water', 'dark'], 48),
  ],
};
assertBattle(eliteSidney);

const elitePhoebe = {
  order: 2,
  role: 'eliteFour',
  name: '芙蓉',
  specialty: 'ghost',
  party: [
    pm('彷徨夜靈', ['ghost'], 48),
    pm('詛咒娃娃', ['ghost'], 49),
    pm('勾魂眼', ['dark', 'ghost'], 50),
    pm('詛咒娃娃', ['ghost'], 49),
    pm('彷徨夜靈', ['ghost'], 51),
  ],
};
assertBattle(elitePhoebe);

const eliteGlacia = {
  order: 3,
  role: 'eliteFour',
  name: '波妮',
  specialty: 'ice',
  party: [
    pm('海豹球', ['ice', 'water'], 48),
    pm('海豹球', ['ice', 'water'], 50),
    pm('海豹球', ['ice', 'water'], 52),
    pm('帝牙海獅', ['ice', 'water'], 53),
  ],
};
assertBattle(eliteGlacia);

const eliteDrake = {
  order: 4,
  role: 'eliteFour',
  name: '源治',
  specialty: 'dragon',
  party: [
    pm('寶貝龍', ['dragon'], 52),
    pm('七夕青鳥', ['dragon', 'flying'], 54),
    pm('沙漠蜻蜓', ['ground', 'dragon'], 53),
    pm('沙漠蜻蜓', ['ground', 'dragon'], 53),
    pm('暴飛龍', ['dragon', 'flying'], 55),
  ],
};
assertBattle(eliteDrake);

const championWallace = {
  role: 'champion',
  name: '米可利',
  specialty: 'water',
  party: [
    pm('吼鯨王', ['water'], 57),
    pm('毒刺水母', ['water', 'poison'], 57),
    pm('樂天河童', ['water', 'grass'], 58),
    pm('鯰魚王', ['water', 'ground'], 58),
    pm('暴鯉龍', ['water', 'dark'], 56),
    pm('美納斯', ['water'], 58),
  ],
};
assertBattle(championWallace);

const league = emeraldLeague;
assertLeague(league);

export const emeraldGuide = {
  id: 'emerald',
  title: '寶可夢 綠寶石',
  displayGeneration: 3,
  status: 'complete',
  notes: '綠寶石道館 1～7 與四天王與紅／藍相同；第 8 道館為亞當，冠軍為米可利。另有道館重戰機制與三聖獸劇情；戰鬥開拓區另見 DLC 書籤。',
  gyms: [
    gymRoxanne,
    gymBrawly,
    gymWattson,
    gymFlannery,
    gymNorman,
    gymWinona,
    gymTateLiza,
    gymJuan,
  ],
  eliteFour: [eliteSidney, elitePhoebe, eliteGlacia, eliteDrake],
  champion: championWallace,
  league,
  expansions: [battleFrontierExpansion],
};
