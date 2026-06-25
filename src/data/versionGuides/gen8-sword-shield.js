import { pm, rec, assertBattle, assertLeague } from './helpers.js';
import { swordShieldLeague } from './gen8-sword-shield-league.js';

const gymMilo = {
  order: 1,
  role: 'gym',
  name: '亞洛',
  location: '草路鎮',
  badge: '青草徽章',
  badgeType: 'grass',
  party: [
    pm('幼棉棉', ['grass'], 11),
    pm('白蓬蓬', ['grass'], 12),
  ],
  recommendedTeams: [
    rec('火飛剋制隊', '炎兔兒火系對草效果絕佳；稚山雀進化後飛行系補刀。建議等級 12 以上。', [
      pm('炎兔兒', ['fire']),
      pm('稚山雀', ['flying']),
      pm('敲音猴', ['grass']),
      pm('淚眼蜥', ['water']),
      pm('來電汪', ['electric']),
    ]),
    rec('毒系補刀隊', '幼棉棉草系，火系或飛行系穩定突破；2 號道路可抓毛辮羊。', [
      pm('炎兔兒', ['fire']),
      pm('稚山雀', ['flying']),
      pm('毛辮羊', ['grass']),
      pm('淚眼蜥', ['water']),
      pm('咬咬龜', ['water', 'rock']),
    ]),
  ],
};
assertBattle(gymMilo);

const gymNessa = {
  order: 2,
  role: 'gym',
  name: '露璃娜',
  location: '水舟鎮',
  badge: '水滴徽章',
  badgeType: 'water',
  party: [
    pm('角金魚', ['water'], 18),
    pm('刺梭魚', ['water'], 18),
    pm('暴鯉龍', ['water', 'dark'], 22),
  ],
  recommendedTeams: [
    rec('草電剋制隊', '敲音猴或轟擂金剛猩草系打刺梭魚；來電汪電系穩定。', [
      pm('敲音猴', ['grass']),
      pm('來電汪', ['electric']),
      pm('毛辮羊', ['grass']),
      pm('炎兔兒', ['fire']),
      pm('稚山雀', ['flying']),
    ]),
    rec('電系核心隊', '來電汪十萬伏特打角金魚與刺梭魚；草系補刀暴鯉龍。', [
      pm('來電汪', ['electric']),
      pm('敲音猴', ['grass']),
      pm('炎兔兒', ['fire']),
      pm('淚眼蜥', ['water']),
      pm('稚山雀', ['flying']),
    ]),
  ],
};
assertBattle(gymNessa);

const gymKabu = {
  order: 3,
  role: 'gym',
  name: '卡蕪',
  location: '機擎市',
  badge: '火焰徽章',
  badgeType: 'fire',
  party: [
    pm('九尾', ['fire'], 25),
    pm('焚焰蚣', ['fire', 'bug'], 27),
  ],
  recommendedTeams: [
    rec('水地面隊', '淚眼蜥或咬咬龜水招對火效果絕佳；敲音猴草系亦可。', [
      pm('淚眼蜥', ['water']),
      pm('咬咬龜', ['water', 'rock']),
      pm('敲音猴', ['grass']),
      pm('來電汪', ['electric']),
      pm('稚山雀', ['flying']),
    ]),
    rec('岩石水系隊', '咬咬龜岩石水系；變澀蜥水招穩定突破九尾與焚焰蚣。', [
      pm('咬咬龜', ['water', 'rock']),
      pm('變澀蜥', ['water']),
      pm('來電汪', ['electric']),
      pm('堵攔熊', ['dark', 'normal']),
      pm('毛辮羊', ['grass']),
    ]),
  ],
};
assertBattle(gymKabu);

const gym4 = {
  order: 4,
  role: 'gym',
  name: '歐尼奧',
  location: '戰競鎮',
  badge: '幻影徽章',
  badgeType: 'ghost',
  notes: '劍版第 4 道館為歐尼奧（幽靈）；盾版為彩豆（格鬥）。以下以歐尼奧隊伍為代表。',
  party: [
    pm('臭臭花', ['grass', 'poison'], 24),
    pm('小山豬', ['ice', 'ground'], 24),
    pm('魔靈珊瑚', ['ghost'], 27),
  ],
  recommendedTeams: [
    rec('惡幽靈隊', '偷兒狐進化堵攔熊惡系打幽靈；炎兔兒火系打臭臭花。', [
      pm('堵攔熊', ['dark', 'normal']),
      pm('炎兔兒', ['fire']),
      pm('來電汪', ['electric']),
      pm('敲音猴', ['grass']),
      pm('稚山雀', ['flying']),
    ]),
    rec('格鬥盾版隊', '盾版彩豆為格鬥系，飛行與超能效果佳；蔥遊兵飛行可穩定突破。', [
      pm('稚山雀', ['flying']),
      pm('堵攔熊', ['dark', 'normal']),
      pm('淚眼蜥', ['water']),
      pm('炎兔兒', ['fire']),
      pm('毛辮羊', ['grass']),
    ]),
  ],
};
assertBattle(gym4);

const gymOpal = {
  order: 5,
  role: 'gym',
  name: '波普菈',
  location: '舞姿鎮',
  badge: '妖精徽章',
  badgeType: 'fairy',
  party: [
    pm('雙彈瓦斯', ['poison'], 36),
    pm('大嘴娃', ['steel', 'fairy'], 36),
    pm('波克比', ['fairy'], 36),
    pm('烈焰馬', ['fire', 'psychic'], 36),
    pm('霜奶仙', ['fairy'], 38),
  ],
  recommendedTeams: [
    rec('毒鋼剋制隊', '毒系打妖精；大嘴娃鋼妖精，火系與地面系效果佳。', [
      pm('堵攔熊', ['dark', 'normal']),
      pm('炎兔兒', ['fire']),
      pm('來電汪', ['electric']),
      pm('轟擂金剛猩', ['grass']),
      pm('多龍巴魯托', ['dragon', 'ghost']),
    ]),
    rec('火毒雙剋隊', '炎兔兒或閃焰王牌火系；毒系打霜奶仙與波克比。', [
      pm('炎兔兒', ['fire']),
      pm('堵攔熊', ['dark', 'normal']),
      pm('來電汪', ['electric']),
      pm('千面避役', ['water']),
      pm('轟擂金剛猩', ['grass']),
    ]),
  ],
};
assertBattle(gymOpal);

const gym6 = {
  order: 6,
  role: 'gym',
  name: '瑪瓜',
  location: '漣漪鎮',
  badge: '岩石徽章',
  badgeType: 'rock',
  notes: '劍版第 6 道館為瑪瓜（岩石）；盾版為美蓉（冰）。以下以瑪瓜隊伍為代表。',
  party: [
    pm('龜腳腳', ['rock', 'water'], 36),
    pm('壺壺', ['rock', 'bug'], 36),
    pm('巨石丁', ['rock'], 38),
  ],
  recommendedTeams: [
    rec('水草雙剋隊', '敲音猴或轟擂金剛猩草系打岩石；淚眼蜥水招穩定。', [
      pm('敲音猴', ['grass']),
      pm('淚眼蜥', ['water']),
      pm('咬咬龜', ['water', 'rock']),
      pm('炎兔兒', ['fire']),
      pm('堵攔熊', ['dark', 'normal']),
    ]),
    rec('盾版冰系隊', '盾版美蓉冰系，火系與格鬥系效果佳；炎兔兒火系穩定突破。', [
      pm('炎兔兒', ['fire']),
      pm('堵攔熊', ['dark', 'normal']),
      pm('轟擂金剛猩', ['grass']),
      pm('千面避役', ['water']),
      pm('來電汪', ['electric']),
    ]),
  ],
};
assertBattle(gym6);

const gymPiers = {
  order: 7,
  role: 'gym',
  name: '聶梓',
  location: '尖釘鎮',
  badge: '惡徽章',
  badgeType: 'dark',
  party: [
    pm('頭巾混混', ['dark', 'fighting'], 44),
    pm('烏賊王', ['dark', 'psychic'], 45),
    pm('堵攔熊', ['dark', 'normal'], 46),
  ],
  recommendedTeams: [
    rec('格鬥妖精隊', '堵攔熊格鬥或惡系對拼；炎兔兒格鬥補刀頭巾混混。', [
      pm('堵攔熊', ['dark', 'normal']),
      pm('炎兔兒', ['fire']),
      pm('轟擂金剛猩', ['grass']),
      pm('千面避役', ['water']),
      pm('多龍巴魯托', ['dragon', 'ghost']),
    ]),
    rec('格鬥飛行隊', '轟擂金剛猩飛行系；來電汪打烏賊王水惡補盲。', [
      pm('堵攔熊', ['dark', 'normal']),
      pm('轟擂金剛猩', ['grass']),
      pm('來電汪', ['electric']),
      pm('閃焰王牌', ['fire']),
      pm('多龍巴魯托', ['dragon', 'ghost']),
    ]),
  ],
};
assertBattle(gymPiers);

const gymRaihan = {
  order: 8,
  role: 'gym',
  name: '奇巴納',
  location: '拳關市',
  badge: '龍之徽章',
  badgeType: 'dragon',
  party: [
    pm('沙漠蜻蜓', ['ground', 'dragon'], 46),
    pm('鯰魚王', ['water', 'ground'], 46),
    pm('爆焰龜獸', ['fire', 'dragon'], 47),
    pm('鋁鋼龍', ['steel', 'dragon'], 48),
  ],
  recommendedTeams: [
    rec('冰妖精隊', '冰系對龍效果絕佳；霜奶仙或妖精招補刀；草系打鯰魚王。', [
      pm('轟擂金剛猩', ['grass']),
      pm('堵攔熊', ['dark', 'normal']),
      pm('千面避役', ['water']),
      pm('多龍巴魯托', ['dragon', 'ghost']),
      pm('炎兔兒', ['fire']),
    ]),
    rec('冰系核心隊', '千面避役冰凍光束或妖精系招；地面系打鋼龍。', [
      pm('千面避役', ['water']),
      pm('堵攔熊', ['dark', 'normal']),
      pm('轟擂金剛猩', ['grass']),
      pm('多龍巴魯托', ['dragon', 'ghost']),
      pm('來電汪', ['electric']),
    ]),
  ],
};
assertBattle(gymRaihan);

const cupHop = {
  order: 1,
  role: 'eliteFour',
  name: '赫普',
  specialty: 'normal',
  party: [
    pm('毛毛角羊', ['normal'], 59),
    pm('鋼鎧鴉', ['flying', 'steel'], 58),
    pm('啪嚓海膽', ['electric', 'poison'], 58),
    pm('御三家', ['normal'], 59),
  ],
};
assertBattle(cupHop);

const cupMarnie = {
  order: 2,
  role: 'eliteFour',
  name: '瑪俐',
  specialty: 'dark',
  party: [
    pm('酷豹', ['dark'], 60),
    pm('毒骷蛙', ['poison', 'fighting'], 60),
    pm('頭巾混混', ['dark', 'fighting'], 60),
    pm('劈斬司令', ['dark', 'steel'], 60),
    pm('長毛巨魔', ['dark', 'fairy'], 60),
    pm('莫魯貝可', ['electric', 'dark'], 60),
  ],
};
assertBattle(cupMarnie);

const cupRaihan = {
  order: 3,
  role: 'eliteFour',
  name: '奇巴納',
  specialty: 'dragon',
  party: [
    pm('沙漠蜻蜓', ['ground', 'dragon'], 61),
    pm('鯰魚王', ['water', 'ground'], 61),
    pm('爆焰龜獸', ['fire', 'dragon'], 61),
    pm('鋁鋼龍', ['steel', 'dragon'], 61),
    pm('老翁龍', ['normal', 'dragon'], 61),
  ],
};
assertBattle(cupRaihan);

const championLeon = {
  role: 'champion',
  name: '丹帝',
  specialty: 'fire',
  party: [
    pm('噴火龍', ['fire', 'flying'], 62),
    pm('多龍巴魯托', ['dragon', 'ghost'], 61),
    pm('超甲狂犀', ['ground', 'rock'], 61),
    pm('踏冰人偶', ['ice', 'psychic'], 61),
    pm('鰓魚龍', ['water', 'dragon'], 61),
    pm('堅果啞鈴', ['grass', 'steel'], 61),
  ],
};
assertBattle(championLeon);

const league = swordShieldLeague;
assertLeague(league);

export const swordShieldGuide = {
  id: 'sword-shield',
  title: '寶可夢 劍／盾',
  displayGeneration: 8,
  status: 'complete',
  notes: '劍版第 4／6 道館為歐尼奧／瑪瓜，盾版為彩豆／美蓉。伽勒爾無傳統四天王，通關為冠軍盃（赫普、瑪俐、奇巴納）後決戰丹帝。鎧之孤島、冠之雪原另見 DLC 書籤。',
  gyms: [
    gymMilo,
    gymNessa,
    gymKabu,
    gym4,
    gymOpal,
    gym6,
    gymPiers,
    gymRaihan,
  ],
  eliteFour: [cupHop, cupMarnie, cupRaihan],
  champion: championLeon,
  league,
};
