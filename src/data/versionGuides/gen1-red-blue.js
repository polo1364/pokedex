import { pm, rec, assertBattle, assertLeague } from './helpers.js';
import { redBlueLeague } from './gen1-red-blue-league.js';

const brock = {
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
    rec('草系開局隊', '妙蛙種子對岩石效果絕佳；角金魚補水屬、猴怪補格鬥，可穩定突破小拳石與大岩蛇。', [
      pm('妙蛙草', ['grass', 'poison']),
      pm('角金魚', ['water']),
      pm('猴怪', ['fighting']),
      pm('比比鳥', ['normal', 'flying']),
      pm('皮卡丘', ['electric']),
    ]),
    rec('水系開局隊', '卡咪龜以水系招式克制岩石；腕力與地鼠提供格鬥／地面補刀，適合小火龍或傑尼龜路線。', [
      pm('卡咪龜', ['water']),
      pm('腕力', ['fighting']),
      pm('地鼠', ['ground']),
      pm('波波', ['normal', 'flying']),
      pm('綠毛蟲', ['bug', 'poison']),
    ]),
  ],
};
assertBattle(brock);

const misty = {
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
    rec('電草雙核隊', '皮卡丘或妙蛙草對水屬效果絕佳；比比鳥與派拉斯補物理輸出，可快速處理海星星與寶石海星。', [
      pm('皮卡丘', ['electric']),
      pm('妙蛙草', ['grass', 'poison']),
      pm('比比鳥', ['normal', 'flying']),
      pm('派拉斯', ['bug', 'grass']),
      pm('猴怪', ['fighting']),
    ]),
    rec('平衡推進隊', '以進化後御三家為主，搭配捕獲的草系或電系，覆蓋雙水屬對手並保留後續道館彈性。', [
      pm('妙蛙草', ['grass', 'poison']),
      pm('皮可西', ['normal']),
      pm('大針蜂', ['bug', 'poison']),
      pm('小磁怪', ['electric']),
      pm('地鼠', ['ground']),
    ]),
  ],
};
assertBattle(misty);

const surge = {
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
    rec('地面剋制隊', '三地鼠或地鼠免疫電系且地面效果絕佳；大岩蛇亦可扛電並以地面招式反打，是此館最穩解法。', [
      pm('三地鼠', ['ground']),
      pm('地鼠', ['ground']),
      pm('大岩蛇', ['rock', 'ground']),
      pm('尼多力諾', ['poison']),
      pm('妙蛙草', ['grass', 'poison']),
    ]),
    rec('地面＋物攻隊', '尼多家族進化後具地面屬性；配合格鬥系與一般飛行系補刀，可應付三隻純電系。', [
      pm('尼多力諾', ['poison']),
      pm('尼多娜', ['poison']),
      pm('腕力', ['fighting']),
      pm('比比鳥', ['normal', 'flying']),
      pm('角金魚', ['water']),
    ]),
  ],
};
assertBattle(surge);

const erika = {
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
    rec('火飛剋制隊', '火恐龍或風速狗對草效果絕佳；大比鳥提供飛行補刀，可壓制大食花、蔓藤怪與霸王花。', [
      pm('火恐龍', ['fire']),
      pm('大比鳥', ['normal', 'flying']),
      pm('風速狗', ['fire']),
      pm('派拉斯特', ['bug', 'poison']),
      pm('雷丘', ['electric']),
    ]),
    rec('毒系＋特攻隊', '以毒系與飛行系突破草系防線；九尾或火系備援處理蔓藤怪，整體等級建議 28 以上。', [
      pm('九尾', ['fire']),
      pm('大嘴蝠', ['poison', 'flying']),
      pm('臭臭泥', ['poison']),
      pm('比比鳥', ['normal', 'flying']),
      pm('皮可西', ['normal']),
    ]),
  ],
};
assertBattle(erika);

const sabrina = {
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
    rec('高速物攻隊', '紅／藍中幽靈對超能力無效；以三地鼠挖洞、大比鳥物理技或雷系高速輸出硬打，等級需接近館主。', [
      pm('三地鼠', ['ground']),
      pm('大比鳥', ['normal', 'flying']),
      pm('雷丘', ['electric']),
      pm('風速狗', ['fire']),
      pm('隆隆石', ['rock', 'ground']),
    ]),
    rec('超能力對策隊', '自身胡地或勇基拉以速度與特攻對拼；呆呆獸可學健忘堆特防後反打，適合有準備的玩家。', [
      pm('勇基拉', ['psychic']),
      pm('呆呆獸', ['water', 'psychic']),
      pm('三地鼠', ['ground']),
      pm('風速狗', ['fire']),
      pm('大比鳥', ['normal', 'flying']),
    ]),
  ],
};
assertBattle(sabrina);

const koga = {
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
    rec('超能剋制隊', '超能力對毒效果絕佳；胡地或勇基拉可快速清場，地面系補盲並防毒系招式。', [
      pm('胡地', ['psychic']),
      pm('勇基拉', ['psychic']),
      pm('三地鼠', ['ground']),
      pm('大比鳥', ['normal', 'flying']),
      pm('風速狗', ['fire']),
    ]),
    rec('地面＋特攻隊', '三地鼠與尼多後／尼多王具地面屬性；搭配火系與飛行系補刀，穩定突破四隻毒系。', [
      pm('三地鼠', ['ground']),
      pm('尼多后', ['poison', 'ground']),
      pm('九尾', ['fire']),
      pm('大比鳥', ['normal', 'flying']),
      pm('雷丘', ['electric']),
    ]),
  ],
};
assertBattle(koga);

const blaine = {
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
    rec('水系核心隊', '水箭龜或哥達鴨以水系效果絕佳；三地鼠與隆隆石補地面，可應付四隻火系。', [
      pm('水箭龜', ['water']),
      pm('哥達鴨', ['water']),
      pm('三地鼠', ['ground']),
      pm('隆隆石', ['rock', 'ground']),
      pm('大比鳥', ['normal', 'flying']),
    ]),
    rec('水＋地面隊', '角金魚或海星進化後學習冲浪；搭配地鼠／三地鼠與急凍鳥（若已取得）形成雙保險。', [
      pm('寶石海星', ['water', 'psychic']),
      pm('三地鼠', ['ground']),
      pm('急凍鳥', ['ice', 'flying']),
      pm('胡地', ['psychic']),
      pm('大比鳥', ['normal', 'flying']),
    ]),
  ],
};
assertBattle(blaine);

const giovanni = {
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
    rec('水草雙剋隊', '水箭龜剋地面、妙蛙花剋地面與岩石；急凍鳥補冰系，可覆蓋坂木全隊。', [
      pm('水箭龜', ['water']),
      pm('妙蛙花', ['grass', 'poison']),
      pm('急凍鳥', ['ice', 'flying']),
      pm('胡地', ['psychic']),
      pm('大比鳥', ['normal', 'flying']),
    ]),
    rec('平衡終盤隊', '以御三家最高進化為核心，搭配超能力與飛行補盲；等級建議 48 以上再挑戰。', [
      pm('水箭龜', ['water']),
      pm('妙蛙花', ['grass', 'poison']),
      pm('胡地', ['psychic']),
      pm('大比鳥', ['normal', 'flying']),
      pm('雷丘', ['electric']),
      pm('風速狗', ['fire']),
    ]),
  ],
};
assertBattle(giovanni);

const lorelei = {
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
assertBattle(lorelei);

const bruno = {
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
assertBattle(bruno);

const agatha = {
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
assertBattle(agatha);

const lance = {
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
assertBattle(lance);

const champion = {
  role: 'champion',
  name: '青綠',
  party: [
    pm('大比鳥', ['normal', 'flying'], 61),
    pm('胡地', ['psychic'], 59),
    pm('鑽角犀獸', ['ground', 'rock'], 61),
    pm('風速狗', ['fire'], 63),
    pm('椰蛋樹', ['grass', 'psychic'], 65),
    pm('噴火龍', ['fire', 'flying'], 65),
  ],
};
assertBattle(champion);

const league = redBlueLeague;
assertLeague(league);

export const redBlueGuide = {
  id: 'red-blue',
  title: '寶可夢 紅／藍',
  displayGeneration: 1,
  status: 'complete',
  notes: '紅版與藍版道館、四天王、冠軍隊伍相同。道館順序為娜姿（第 5 館）早於阿桔（第 6 館）。冠軍青綠隊伍依玩家選擇妙蛙種子為準；選小火龍或傑尼龜時，最後一隻分別為水箭龜或妙蛙花。',
  gyms: [brock, misty, surge, erika, sabrina, koga, blaine, giovanni],
  eliteFour: [lorelei, bruno, agatha, lance],
  champion,
  league,
};
