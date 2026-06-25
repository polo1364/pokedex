import { pm, rec, assertBattle, assertLeague } from './helpers.js';
import { omegaRubyAlphaSapphireLeague } from './gen6-omega-ruby-alpha-sapphire-league.js';

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
    pm('腕力', ['fighting'], 17),
    pm('幕下力士', ['fighting'], 18),
    pm('鐵掌力士', ['fighting'], 19),
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
  notes: '雷電獸可 Mega 進化，特攻與速度大幅提升；地面系仍為最佳對策。',
  party: [
    pm('落雷獸', ['electric'], 22),
    pm('頑皮雷彈', ['electric'], 22),
    pm('雷電獸', ['electric'], 24),
  ],
  recommendedTeams: [
    rec('地面剋制隊', '水躍魚地面屬性免疫電且效果絕佳；蓮葉童子草系也可打電。紫堇市前可抓落雷獸備用。', [
      pm('水躍魚', ['water', 'ground']),
      pm('蓮葉童子', ['water', 'grass']),
      pm('蘑蘑菇', ['grass', 'fighting']),
      pm('落雷獸', ['electric']),
      pm('傲骨燕', ['normal', 'flying']),
    ]),
    rec('草系免疫隊', '蘑蘑菇、木守宮草系免疫電系招式；配合地面系水躍魚可穩定突破。', [
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
  notes: '呆火駝可 Mega 進化，火地面雙屬；水系優先秒殺。',
  party: [
    pm('熔岩蟲', ['fire'], 26),
    pm('熔岩蟲', ['fire'], 26),
    pm('呆火駝', ['fire', 'ground'], 28),
  ],
  recommendedTeams: [
    rec('水地面隊', '水躍魚冲浪對火效果絕佳；蓮葉童子同樣有效。呆火駝火地面，用水系優先秒殺。', [
      pm('水躍魚', ['water', 'ground']),
      pm('蓮葉童子', ['water', 'grass']),
      pm('落雷獸', ['electric']),
      pm('傲骨燕', ['normal', 'flying']),
      pm('拉魯拉絲', ['psychic']),
    ]),
    rec('岩石水系隊', '釜炎鎮洞窟可抓可可多拉；水躍魚或樂天河童為核心，雷電獸補電系輸出。', [
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
  notes: '請假王物攻極高且會用哈欠；趁懶人獺或過動猿休息回合換格鬥系上場。',
  party: [
    pm('晃晃斑', ['normal'], 28),
    pm('過動猿', ['normal'], 30),
    pm('請假王', ['normal'], 32),
  ],
  recommendedTeams: [
    rec('格鬥剋制隊', '蘑蘑菇斗笠菇線格鬥打一般效果絕佳；力壯雞或火焰雞格鬥招穩定突破。', [
      pm('蘑蘑菇', ['grass', 'fighting']),
      pm('力壯雞', ['fire', 'fighting']),
      pm('水躍魚', ['water', 'ground']),
      pm('樂天河童', ['water', 'grass']),
      pm('雷電獸', ['electric']),
    ]),
    rec('鬼系戰術隊', '懶人獺或請假王休息時用鬼系或格鬥系上場集火；橙華森林可抓蘑蘑菇。', [
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
  notes: '七夕青鳥可 Mega 進化；電系與冰系為主要對策。',
  party: [
    pm('大王燕', ['normal', 'flying'], 33),
    pm('大嘴鷗', ['water', 'flying'], 33),
    pm('盔甲鳥', ['steel', 'flying'], 33),
    pm('七夕青鳥', ['dragon', 'flying'], 35),
  ],
  recommendedTeams: [
    rec('電冰雙剋隊', '雷電獸打大嘴鷗與大王燕；冰系打七夕青鳥；力壯雞打火系剋盔甲鳥。', [
      pm('雷電獸', ['electric']),
      pm('力壯雞', ['fire', 'fighting']),
      pm('水躍魚', ['water', 'ground']),
      pm('樂天河童', ['water', 'grass']),
      pm('蘑蘑菇', ['grass', 'fighting']),
    ]),
    rec('岩石電隊', '可可多拉岩石打飛行；雷電獸穩定電系輸出，等級建議 34 以上。', [
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
  notes: '雙打道館，須同時派出兩隻寶可夢上場；念力土偶為新增威脅。',
  party: [
    pm('念力土偶', ['ground', 'psychic'], 45),
    pm('月石', ['rock', 'psychic'], 45),
    pm('太陽岩', ['rock', 'psychic'], 45),
  ],
  recommendedTeams: [
    rec('惡草雙打隊', '勾魂眼惡系打超能；樂天河童草系補刀。雙打建議一坦一攻或雙特攻。', [
      pm('勾魂眼', ['dark', 'ghost']),
      pm('樂天河童', ['water', 'grass']),
      pm('雷電獸', ['electric']),
      pm('水躍魚', ['water', 'ground']),
      pm('蘑蘑菇', ['grass', 'fighting']),
    ]),
    rec('地面超能隊', '水躍魚地震打念力土偶；奇魯莉安或沙奈朵超能對拼。', [
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
    pm('吼鯨王', ['water'], 46),
    pm('鯰魚王', ['water', 'ground'], 46),
    pm('愛心魚', ['water'], 46),
    pm('海豹球', ['ice', 'water'], 47),
    pm('刺龍王', ['water', 'dragon'], 48),
  ],
  recommendedTeams: [
    rec('草電雙剋隊', '樂天河童草系對水效果絕佳；雷電獸打愛心魚與海豹球。鯰魚王水地面，用草系優先。', [
      pm('樂天河童', ['water', 'grass']),
      pm('雷電獸', ['electric']),
      pm('蘑蘑菇', ['grass', 'fighting']),
      pm('水躍魚', ['water', 'ground']),
      pm('火焰雞', ['fire', 'fighting']),
    ]),
    rec('草系核心隊', '蓮葉童子一路進化樂天河童；電系補刀。刺龍王水龍，用草系或妖精系高威力招秒殺。', [
      pm('樂天河童', ['water', 'grass']),
      pm('雷電獸', ['electric']),
      pm('木守宮', ['grass']),
      pm('沙奈朵', ['psychic', 'fairy']),
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
    pm('大狼犬', ['dark'], 57),
    pm('狡猾天狗', ['grass', 'dark'], 57),
    pm('巨牙鯊', ['water', 'dark'], 57),
    pm('夢歌仙人掌', ['grass', 'dark'], 57),
    pm('鐵螯龍蝦', ['water', 'dark'], 57),
    pm('阿勃梭魯', ['dark'], 59),
  ],
};
assertBattle(eliteSidney);

const elitePhoebe = {
  order: 2,
  role: 'eliteFour',
  name: '芙蓉',
  specialty: 'ghost',
  party: [
    pm('彷徨夜靈', ['ghost'], 57),
    pm('詛咒娃娃', ['ghost'], 57),
    pm('勾魂眼', ['dark', 'ghost'], 57),
    pm('詛咒娃娃', ['ghost'], 59),
    pm('黑夜魔靈', ['ghost'], 59),
  ],
};
assertBattle(elitePhoebe);

const eliteGlacia = {
  order: 3,
  role: 'eliteFour',
  name: '波妮',
  specialty: 'ice',
  party: [
    pm('冰鬼護', ['ice'], 57),
    pm('雪妖女', ['ice', 'ghost'], 57),
    pm('雙倍多多冰', ['ice'], 57),
    pm('冰鬼護', ['ice'], 59),
    pm('象牙豬', ['ice', 'ground'], 59),
  ],
};
assertBattle(eliteGlacia);

const eliteDrake = {
  order: 4,
  role: 'eliteFour',
  name: '源治',
  specialty: 'dragon',
  party: [
    pm('甲殼龍', ['dragon'], 57),
    pm('七夕青鳥', ['dragon', 'flying'], 57),
    pm('沙漠蜻蜓', ['ground', 'dragon'], 57),
    pm('沙漠蜻蜓', ['ground', 'dragon'], 57),
    pm('暴飛龍', ['dragon', 'flying'], 59),
  ],
};
assertBattle(eliteDrake);

const championSteven = {
  role: 'champion',
  name: '大吾',
  specialty: 'steel',
  notes: '巨金怪可 Mega 進化，為最終威脅；波士可多拉亦可 Mega。',
  party: [
    pm('盔甲鳥', ['steel', 'flying'], 65),
    pm('念力土偶', ['ground', 'psychic'], 65),
    pm('波士可多拉', ['steel', 'rock'], 65),
    pm('搖籃百合', ['rock', 'grass'], 65),
    pm('太古盔甲', ['rock', 'bug'], 65),
    pm('巨金怪', ['steel', 'psychic'], 67),
  ],
};
assertBattle(championSteven);

const league = omegaRubyAlphaSapphireLeague;
assertLeague(league);

export const omegaRubyAlphaSapphireGuide = {
  id: 'omega-ruby-alpha-sapphire',
  title: '寶可夢 終極紅寶石／始源藍寶石',
  displayGeneration: 6,
  status: 'complete',
  notes: '道館順序與綠寶石相同（第 8 館亞當），但隊伍為 ORAS 重製版且含 Mega 進化；冠軍為大吾。Δ篇章為後日談，另見 DLC 書籤。',
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
  champion: championSteven,
  league,
};
