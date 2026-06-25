import { pm, rec, assertBattle, assertLeague } from './helpers.js';
import { goldSilverLeague } from './gen2-gold-silver-league.js';

const gymFalkner = {
  order: 1,
  role: 'gym',
  name: '阿速',
  location: '桔梗市',
  badge: '飛翼徽章',
  badgeType: 'flying',
  party: [
    pm('波波', ['normal', 'flying'], 7),
    pm('比比鳥', ['normal', 'flying'], 9),
  ],
  recommendedTeams: [
    rec('電岩雙剋隊', '桔梗市北側可抓咩利羊，電系對飛行效果絕佳；若選火球鼠開局，火系也能壓制波波與比比鳥。小拳石在洞窟可補岩石系。', [
      pm('咩利羊', ['electric']),
      pm('火球鼠', ['fire']),
      pm('小拳石', ['rock', 'ground']),
      pm('波波', ['normal', 'flying']),
      pm('尾立', ['normal']),
    ]),
    rec('平衡開局隊', '御三家任一進化後等級壓制；配合捕獲的電系或岩石系，可穩定突破兩隻飛行系。建議等級 10 以上再挑戰。', [
      pm('火球鼠', ['fire']),
      pm('咩利羊', ['electric']),
      pm('小拳石', ['rock', 'ground']),
      pm('波波', ['normal', 'flying']),
      pm('綠毛蟲', ['bug', 'poison']),
    ]),
  ],
};
assertBattle(gymFalkner);

const gymBugsy = {
  order: 2,
  role: 'gym',
  name: '阿筆',
  location: '檜皮鎮',
  badge: '昆蟲徽章',
  badgeType: 'bug',
  party: [
    pm('鐵甲蛹', ['bug'], 14),
    pm('鐵殼蛹', ['bug'], 14),
    pm('飛天螳螂', ['bug', 'flying'], 16),
  ],
  recommendedTeams: [
    rec('火飛剋制隊', '火球鼠進化火爆獸對蟲效果絕佳；波波進化大比鳥以飛行系補刀，可快速處理鐵甲蛹與飛天螳螂。', [
      pm('火爆獸', ['fire']),
      pm('比比鳥', ['normal', 'flying']),
      pm('咩利羊', ['electric']),
      pm('小拳石', ['rock', 'ground']),
      pm('尾立', ['normal']),
    ]),
    rec('岩石＋電隊', '小拳石岩石系打飛天螳螂；電龍線補輸出，鐵甲蛹與鐵殼蛹防高但怕火與飛行，帶一隻火或飛即可。', [
      pm('隆隆石', ['rock', 'ground']),
      pm('咩利羊', ['electric']),
      pm('比比鳥', ['normal', 'flying']),
      pm('火球鼠', ['fire']),
      pm('烏波', ['water', 'ground']),
    ]),
  ],
};
assertBattle(gymBugsy);

const gymWhitney = {
  order: 3,
  role: 'gym',
  name: '小茜',
  location: '滿金市',
  badge: '普通徽章',
  badgeType: 'normal',
  party: [
    pm('皮皮', ['normal'], 18),
    pm('大奶罐', ['normal'], 20),
  ],
  recommendedTeams: [
    rec('格鬥剋制隊', '滿金市地下可抓腕力，格鬥對一般效果絕佳；小拳石或小磁怪坦度高能扛大奶罐滾動，再反打。務必帶解麻藥。', [
      pm('腕力', ['fighting']),
      pm('小拳石', ['rock', 'ground']),
      pm('火爆獸', ['fire']),
      pm('比比鳥', ['normal', 'flying']),
      pm('咩利羊', ['electric']),
    ]),
    rec('岩石電雙坦隊', '小磁怪與小拳石物防高，可拖過大奶罐的滾動與喝牛奶；火爆獸或電龍補輸出。皮皮會用搖晃，解麻藥必備。', [
      pm('小磁怪', ['electric', 'steel']),
      pm('小拳石', ['rock', 'ground']),
      pm('火爆獸', ['fire']),
      pm('電龍', ['electric']),
      pm('大嘴蝠', ['poison', 'flying']),
    ]),
  ],
};
assertBattle(gymWhitney);

const gymMorty = {
  order: 4,
  role: 'gym',
  name: '松葉',
  location: '緣朱市',
  badge: '霧徽章',
  badgeType: 'ghost',
  party: [
    pm('鬼斯', ['ghost', 'poison'], 21),
    pm('鬼斯', ['ghost', 'poison'], 21),
    pm('鬼斯通', ['ghost', 'poison'], 23),
    pm('耿鬼', ['ghost', 'poison'], 25),
  ],
  recommendedTeams: [
    rec('惡系免疫隊', '城都幽靈攻擊對一般系無效，但惡系可打幽靈；緣朱市可遇黑暗鴉，或用大嘴蝠、鬼斯通對拼。', [
      pm('鬼斯通', ['ghost', 'poison']),
      pm('大嘴蝠', ['poison', 'flying']),
      pm('火爆獸', ['fire']),
      pm('電龍', ['electric']),
      pm('比比鳥', ['normal', 'flying']),
    ]),
    rec('超能剋制隊', '超能力對毒效果佳，也能打部分鬼系；天然雀進化天然鳥或勇基拉線皆可。耿鬼出場前優先清鬼斯與鬼斯通。', [
      pm('天然鳥', ['normal', 'flying']),
      pm('勇基拉', ['psychic']),
      pm('火爆獸', ['fire']),
      pm('電龍', ['electric']),
      pm('大奶罐', ['normal']),
    ]),
  ],
};
assertBattle(gymMorty);

const gymChuck = {
  order: 5,
  role: 'gym',
  name: '阿四',
  location: '湛藍市',
  badge: '波浪徽章',
  badgeType: 'fighting',
  party: [
    pm('火爆猴', ['fighting'], 27),
    pm('蚊香泳士', ['water', 'fighting'], 30),
  ],
  recommendedTeams: [
    rec('超能飛行隊', '超能力對格鬥效果絕佳；天然鳥或勇基拉可穩定突破；飛行系補刀火爆猴，水系打蚊香泳士。', [
      pm('天然鳥', ['normal', 'flying']),
      pm('勇基拉', ['psychic']),
      pm('電龍', ['electric']),
      pm('大力鱷', ['water']),
      pm('大嘴蝠', ['poison', 'flying']),
    ]),
    rec('特攻遠程隊', '以電龍與御三家特攻遠程輸出，避免與格鬥系硬碰；大嘴蝠或比比鳥補飛行，等級建議 28 以上。', [
      pm('電龍', ['electric']),
      pm('火爆獸', ['fire']),
      pm('大竺葵', ['grass', 'poison']),
      pm('比比鳥', ['normal', 'flying']),
      pm('鬼斯通', ['ghost', 'poison']),
    ]),
  ],
};
assertBattle(gymChuck);

const gymJasmine = {
  order: 6,
  role: 'gym',
  name: '阿蜜',
  location: '淺蔥市',
  badge: '鋼鐵徽章',
  badgeType: 'steel',
  party: [
    pm('小磁怪', ['electric', 'steel'], 30),
    pm('小磁怪', ['electric', 'steel'], 30),
    pm('大鋼蛇', ['steel', 'ground'], 35),
  ],
  recommendedTeams: [
    rec('火地面隊', '火系對鋼效果絕佳；火爆獸或風速狗（燈火山）可秒小磁怪；地面系打電系並對大鋼蛇造成壓力。', [
      pm('火爆獸', ['fire']),
      pm('長毛豬', ['ice', 'ground']),
      pm('電龍', ['electric']),
      pm('大力鱷', ['water']),
      pm('隆隆石', ['rock', 'ground']),
    ]),
    rec('格鬥＋火隊', '格鬥系打鋼；腕力或快泳蛙補格鬥，火爆獸處理小磁怪。大鋼蛇物攻高，優先用火或地面招秒殺。', [
      pm('火爆獸', ['fire']),
      pm('腕力', ['fighting']),
      pm('長毛豬', ['ice', 'ground']),
      pm('電龍', ['electric']),
      pm('天然鳥', ['normal', 'flying']),
    ]),
  ],
};
assertBattle(gymJasmine);

const gymPryce = {
  order: 7,
  role: 'gym',
  name: '柳伯',
  location: '卡吉鎮',
  badge: '冰凍徽章',
  badgeType: 'ice',
  party: [
    pm('小海獅', ['water', 'ice'], 30),
    pm('白海獅', ['water', 'ice'], 32),
    pm('長毛豬', ['ice', 'ground'], 34),
  ],
  recommendedTeams: [
    rec('火格鬥隊', '火系對冰效果絕佳；火爆獸可壓制三隻冰系；格鬥系補刀白海獅與長毛豬，電龍也可打白海獅。', [
      pm('火爆獸', ['fire']),
      pm('電龍', ['electric']),
      pm('腕力', ['fighting']),
      pm('大竺葵', ['grass', 'poison']),
      pm('天然鳥', ['normal', 'flying']),
    ]),
    rec('電草雙核隊', '電龍打白海獅；大竺葵或草系打長毛豬的水面弱點；火爆獸或火系備援處理冰系，等級建議 33 以上。', [
      pm('電龍', ['electric']),
      pm('大竺葵', ['grass', 'poison']),
      pm('火爆獸', ['fire']),
      pm('大力鱷', ['water']),
      pm('鬼斯通', ['ghost', 'poison']),
    ]),
  ],
};
assertBattle(gymPryce);

const gymClair = {
  order: 8,
  role: 'gym',
  name: '小椿',
  location: '煙墨市',
  badge: '升龍徽章',
  badgeType: 'dragon',
  party: [
    pm('迷你龍', ['dragon'], 37),
    pm('哈克龍', ['dragon'], 37),
    pm('哈克龍', ['dragon'], 37),
    pm('刺龍王', ['water', 'dragon'], 40),
  ],
  recommendedTeams: [
    rec('冰電雙剋隊', '冰系對龍效果絕佳；長毛豬或迷唇姐冰招可秒哈克龍；電龍打刺龍王的水屬面。進館前建議等級 40 左右。', [
      pm('長毛豬', ['ice', 'ground']),
      pm('電龍', ['electric']),
      pm('火爆獸', ['fire']),
      pm('鬼斯通', ['ghost', 'poison']),
      pm('天然鳥', ['normal', 'flying']),
    ]),
    rec('冰系核心隊', '冰凍洞窟可抓長毛豬或迷唇姐；電龍補電系；御三家提供穩定輸出。刺龍王會用龍之怒，注意血量管理。', [
      pm('長毛豬', ['ice', 'ground']),
      pm('迷唇姐', ['ice', 'psychic']),
      pm('電龍', ['electric']),
      pm('大力鱷', ['water']),
      pm('火爆獸', ['fire']),
    ]),
  ],
};
assertBattle(gymClair);

const eliteWill = {
  order: 1,
  role: 'eliteFour',
  name: '一樹',
  specialty: 'psychic',
  party: [
    pm('天然鳥', ['normal', 'flying'], 40),
    pm('迷唇姐', ['ice', 'psychic'], 41),
    pm('椰蛋樹', ['grass', 'psychic'], 41),
    pm('呆殼獸', ['water', 'psychic'], 42),
    pm('天然鳥', ['normal', 'flying'], 42),
  ],
};
assertBattle(eliteWill);

const eliteKoga = {
  order: 2,
  role: 'eliteFour',
  name: '阿桔',
  specialty: 'poison',
  party: [
    pm('瓦斯彈', ['poison'], 40),
    pm('臭臭泥', ['poison'], 42),
    pm('瓦斯彈', ['poison'], 40),
    pm('雙彈瓦斯', ['poison'], 43),
    pm('雙彈瓦斯', ['poison'], 44),
  ],
};
assertBattle(eliteKoga);

const eliteBruno = {
  order: 3,
  role: 'eliteFour',
  name: '希巴',
  specialty: 'fighting',
  party: [
    pm('戰舞郎', ['fighting'], 42),
    pm('快拳郎', ['fighting'], 42),
    pm('飛腿郎', ['fighting'], 42),
    pm('大岩蛇', ['rock', 'ground'], 43),
    pm('怪力', ['fighting'], 46),
  ],
};
assertBattle(eliteBruno);

const eliteKaren = {
  order: 4,
  role: 'eliteFour',
  name: '梨花',
  specialty: 'dark',
  party: [
    pm('月亮伊布', ['dark'], 42),
    pm('霸王花', ['grass', 'poison'], 42),
    pm('黑暗鴉', ['dark', 'flying'], 44),
    pm('耿鬼', ['ghost', 'poison'], 45),
    pm('黑魯加', ['dark', 'fire'], 47),
  ],
};
assertBattle(eliteKaren);

const championLance = {
  role: 'champion',
  name: '渡',
  specialty: 'dragon',
  party: [
    pm('暴鯉龍', ['water', 'flying'], 44),
    pm('快龍', ['dragon', 'flying'], 47),
    pm('噴火龍', ['fire', 'flying'], 46),
    pm('化石翼龍', ['rock', 'flying'], 46),
    pm('快龍', ['dragon', 'flying'], 50),
  ],
};
assertBattle(championLance);

const league = goldSilverLeague;
assertLeague(league);

export const goldSilverGuide = {
  id: 'gold-silver',
  title: '寶可夢 金／銀',
  displayGeneration: 2,
  status: 'complete',
  notes: '金版與銀版道館、四天王、冠軍隊伍相同。城都 8 個道館後挑戰寶可夢聯盟；冠軍為渡而非青綠。',
  gyms: [
    gymFalkner,
    gymBugsy,
    gymWhitney,
    gymMorty,
    gymChuck,
    gymJasmine,
    gymPryce,
    gymClair,
  ],
  eliteFour: [eliteWill, eliteKoga, eliteBruno, eliteKaren],
  champion: championLance,
  league,
};
