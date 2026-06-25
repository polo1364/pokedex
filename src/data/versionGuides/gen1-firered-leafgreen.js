import { pm, rec, assertBattle, assertLeague } from './helpers.js';
import { frlgLeague } from './gen1-firered-leafgreen-league.js';
import { seviiExpansion } from './gen1-firered-leafgreen-sevii.js';

const gymBrock = {
  order: 1,
  role: 'gym',
  name: '小剛',
  location: '尼比市',
  badge: '灰色徽章',
  badgeType: 'rock',
  party: [
    pm('小拳石', ['rock', 'ground'], 12),
    pm('大岩蛇', ['rock', 'ground'], 14),
  ],
  recommendedTeams: [
    rec(
      '草系御三家開局',
      '妙蛙種子／妙蛙草以草系招式穩定剋制岩石；搭配速度較快的一般系補刀。',
      [
        pm('妙蛙草', ['grass', 'poison']),
        pm('小拉達', ['normal']),
        pm('波波', ['normal', 'flying']),
        pm('尼多朗', ['poison']),
      ],
    ),
    rec(
      '水斗雙屬性隊',
      '選擇傑尼龜時以水系招式為主，可順路捕捉小拳石作為岩石系備援。',
      [
        pm('卡咪龜', ['water']),
        pm('小拳石', ['rock', 'ground']),
        pm('波波', ['normal', 'flying']),
        pm('小拉達', ['normal']),
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
      '草電雙核',
      '草系剋水；華藍市前可於常磐森林取得皮卡丘，電系可對海星星與寶石海星造成有效傷害。',
      [
        pm('妙蛙草', ['grass', 'poison']),
        pm('皮卡丘', ['electric']),
        pm('比比鳥', ['normal', 'flying']),
        pm('派拉斯', ['bug', 'grass']),
        pm('小拳石', ['rock', 'ground']),
      ],
    ),
    rec(
      '純草系推進',
      '妙蛙草學會飛葉快刀後可單挑全場；派拉斯補蟲草盲點並對超能力副屬性寶石海星仍有優勢。',
      [
        pm('妙蛙草', ['grass', 'poison']),
        pm('派拉斯', ['bug', 'grass']),
        pm('喇叭芽', ['grass', 'poison']),
        pm('波波', ['normal', 'flying']),
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
  party: [
    pm('霹靂電球', ['electric'], 21),
    pm('皮卡丘', ['electric'], 18),
    pm('雷丘', ['electric'], 24),
  ],
  recommendedTeams: [
    rec(
      '地面系主力',
      '地鼠洞可捕捉地鼠；地面免疫電系且對枯葉市前的電系道館極為關鍵。',
      [
        pm('三地鼠', ['ground']),
        pm('妙蛙花', ['grass', 'poison']),
        pm('大岩蛇', ['rock', 'ground']),
        pm('比比鳥', ['normal', 'flying']),
        pm('派拉斯特', ['bug', 'poison']),
      ],
    ),
    rec(
      '地面＋岩石雙保險',
      '穿山鼠與地鼠皆可在關都西部取得；地面系可穩定吸收電系招式。',
      [
        pm('地鼠', ['ground']),
        pm('穿山鼠', ['ground']),
        pm('小拳石', ['rock', 'ground']),
        pm('妙蛙草', ['grass', 'poison']),
        pm('大嘴蝠', ['poison', 'flying']),
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
    pm('大食花', ['grass', 'poison'], 29),
    pm('蔓藤怪', ['grass'], 24),
    pm('霸王花', ['grass', 'poison'], 29),
  ],
  recommendedTeams: [
    rec(
      '火飛剋制',
      '彩虹市北可捕捉六尾或卡蒂狗；火系剋草，飛行系可壓制大食花與霸王花的毒系副屬性。',
      [
        pm('噴火駝', ['fire']),
        pm('比比鳥', ['normal', 'flying']),
        pm('大嘴蝠', ['poison', 'flying']),
        pm('雷丘', ['electric']),
        pm('三地鼠', ['ground']),
      ],
    ),
    rec(
      '火系＋超能力',
      '派拉斯特或勇基拉以物理招式突破；火系處理草系，超能力系可對毒系造成壓力。',
      [
        pm('風速狗', ['fire']),
        pm('勇基拉', ['psychic']),
        pm('大嘴蝠', ['poison', 'flying']),
        pm('三地鼠', ['ground']),
        pm('海刺龍', ['water', 'poison']),
      ],
    ),
  ],
};
assertBattle(gymErika);

const gymSabrina = {
  order: 5,
  role: 'gym',
  name: '娜姿',
  location: '金黃市',
  badge: '黃金徽章',
  badgeType: 'psychic',
  party: [
    pm('勇基拉', ['psychic'], 38),
    pm('魔牆人偶', ['psychic'], 37),
    pm('摩魯蛾', ['bug', 'poison'], 38),
    pm('胡地', ['psychic'], 43),
  ],
  recommendedTeams: [
    rec(
      '惡系前夜：蟲幽雙打',
      '第一世代以蟲系、幽靈系、高攻物理系應對；大嘴蝠學會咬住後對超能力系有實質威脅。',
      [
        pm('大嘴蝠', ['poison', 'flying']),
        pm('耿鬼', ['ghost', 'poison']),
        pm('隆隆岩', ['rock', 'ground']),
        pm('風速狗', ['fire']),
        pm('海刺龍', ['water', 'poison']),
        pm('雷丘', ['electric']),
      ],
    ),
    rec(
      '高速物理突破',
      '風速狗與隆隆岩以物理招式突破；勇基拉速度雖快但防禦偏低，先制電系可處理摩魯蛾。',
      [
        pm('風速狗', ['fire']),
        pm('隆隆岩', ['rock', 'ground']),
        pm('雷丘', ['electric']),
        pm('大比鳥', ['normal', 'flying']),
        pm('耿鬼', ['ghost', 'poison']),
      ],
    ),
  ],
};
assertBattle(gymSabrina);

const gymKoga = {
  order: 6,
  role: 'gym',
  name: '阿桔',
  location: '淺紅市',
  badge: '粉紅徽章',
  badgeType: 'poison',
  party: [
    pm('瓦斯彈', ['poison'], 37),
    pm('瓦斯彈', ['poison'], 37),
    pm('臭臭泥', ['poison'], 39),
    pm('雙彈瓦斯', ['poison'], 43),
  ],
  recommendedTeams: [
    rec(
      '超能力掃毒',
      '超能力系對毒系效果絕佳；胡地或勇基拉可快速清除瓦斯彈與臭臭泥。',
      [
        pm('胡地', ['psychic']),
        pm('隆隆岩', ['rock', 'ground']),
        pm('風速狗', ['fire']),
        pm('大比鳥', ['normal', 'flying']),
        pm('雷丘', ['electric']),
      ],
    ),
    rec(
      '地面＋超能力',
      '三地鼠免疫毒系並以地震收尾；超能力系補足對雙彈瓦斯的穩定輸出。',
      [
        pm('三地鼠', ['ground']),
        pm('胡地', ['psychic']),
        pm('風速狗', ['fire']),
        pm('耿鬼', ['ghost', 'poison']),
        pm('大比鳥', ['normal', 'flying']),
      ],
    ),
  ],
};
assertBattle(gymKoga);

const gymBlaine = {
  order: 7,
  role: 'gym',
  name: '夏伯',
  location: '紅蓮島',
  badge: '深紅徽章',
  badgeType: 'fire',
  party: [
    pm('卡蒂狗', ['fire'], 42),
    pm('小火馬', ['fire'], 40),
    pm('烈焰馬', ['fire'], 42),
    pm('風速狗', ['fire'], 47),
  ],
  recommendedTeams: [
    rec(
      '水系主力',
      'Surf 取得後以水系穩定剋火；拉普拉斯或海刺龍可同時應對夏伯全隊。',
      [
        pm('水箭龜', ['water']),
        pm('拉普拉斯', ['water', 'ice']),
        pm('海刺龍', ['water', 'poison']),
        pm('三地鼠', ['ground']),
        pm('胡地', ['psychic']),
      ],
    ),
    rec(
      '水＋地面雙保',
      '三地鼠以地震處理風速狗；水箭龜或拉普拉斯吸收火系招式並反打。',
      [
        pm('拉普拉斯', ['water', 'ice']),
        pm('三地鼠', ['ground']),
        pm('隆隆岩', ['rock', 'ground']),
        pm('胡地', ['psychic']),
        pm('大比鳥', ['normal', 'flying']),
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
    pm('獨角犀牛', ['ground', 'rock'], 45),
    pm('三地鼠', ['ground'], 42),
    pm('尼多后', ['poison', 'ground'], 44),
    pm('尼多王', ['poison', 'ground'], 45),
    pm('鑽角犀獸', ['ground', 'rock'], 50),
  ],
  recommendedTeams: [
    rec(
      '水＋草剋地',
      '水箭龜 Surf 可覆蓋坂木全隊；妙蛙花補打尼多王／尼多后，並以草系剋地面。',
      [
        pm('水箭龜', ['water']),
        pm('妙蛙花', ['grass', 'poison']),
        pm('拉普拉斯', ['water', 'ice']),
        pm('胡地', ['psychic']),
        pm('大比鳥', ['normal', 'flying']),
        pm('耿鬼', ['ghost', 'poison']),
      ],
    ),
    rec(
      '純水系壓制',
      '拉普拉斯與水箭龜輪替吸收地面招式；冰系招式可對鑽角犀獸造成四倍傷害。',
      [
        pm('拉普拉斯', ['water', 'ice']),
        pm('水箭龜', ['water']),
        pm('海刺龍', ['water', 'poison']),
        pm('胡地', ['psychic']),
        pm('大比鳥', ['normal', 'flying']),
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
    pm('白海獅', ['water', 'ice'], 52),
    pm('刺甲貝', ['water', 'ice'], 51),
    pm('呆殼獸', ['water', 'psychic'], 52),
    pm('迷唇姐', ['ice', 'psychic'], 54),
    pm('拉普拉斯', ['water', 'ice'], 54),
  ],
};
assertBattle(eliteLorelei);

const eliteBruno = {
  order: 2,
  role: 'eliteFour',
  name: '希巴',
  specialty: 'fighting',
  party: [
    pm('大岩蛇', ['rock', 'ground'], 51),
    pm('快拳郎', ['fighting'], 53),
    pm('飛腿郎', ['fighting'], 53),
    pm('大岩蛇', ['rock', 'ground'], 54),
    pm('怪力', ['fighting'], 56),
  ],
};
assertBattle(eliteBruno);

const eliteAgatha = {
  order: 3,
  role: 'eliteFour',
  name: '菊子',
  specialty: 'ghost',
  party: [
    pm('耿鬼', ['ghost', 'poison'], 54),
    pm('大嘴蝠', ['poison', 'flying'], 54),
    pm('鬼斯通', ['ghost', 'poison'], 53),
    pm('阿柏怪', ['poison'], 56),
    pm('耿鬼', ['ghost', 'poison'], 58),
  ],
};
assertBattle(eliteAgatha);

const eliteLance = {
  order: 4,
  role: 'eliteFour',
  name: '渡',
  specialty: 'dragon',
  party: [
    pm('暴鯉龍', ['water', 'flying'], 56),
    pm('哈克龍', ['dragon'], 54),
    pm('哈克龍', ['dragon'], 54),
    pm('化石翼龍', ['rock', 'flying'], 58),
    pm('快龍', ['dragon', 'flying'], 60),
  ],
};
assertBattle(eliteLance);

const championBlue = {
  role: 'champion',
  name: '青綠',
  party: [
    pm('大比鳥', ['normal', 'flying'], 59),
    pm('胡地', ['psychic'], 57),
    pm('鑽角犀獸', ['ground', 'rock'], 59),
    pm('椰蛋樹', ['grass', 'psychic'], 59),
    pm('暴鯉龍', ['water', 'flying'], 61),
    pm('噴火龍', ['fire', 'flying'], 63),
  ],
};
assertBattle(championBlue);

const league = frlgLeague;
assertLeague(league);

export const fireredLeafgreenGuide = {
  id: 'firered-leafgreen',
  title: '寶可夢 火紅／葉綠',
  displayGeneration: 1,
  status: 'complete',
  mainRegionLabel: '關都',
  notes: '關都 8 個道館；等級與隊伍和紅／藍版略有不同。',
  gyms: [
    gymBrock,
    gymMisty,
    gymLtSurge,
    gymErika,
    gymSabrina,
    gymKoga,
    gymBlaine,
    gymGiovanni,
  ],
  eliteFour: [eliteLorelei, eliteBruno, eliteAgatha, eliteLance],
  champion: championBlue,
  league,
  expansions: [seviiExpansion],
};
