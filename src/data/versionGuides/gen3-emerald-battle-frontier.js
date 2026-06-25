import { pm, rec, assertBattle } from './helpers.js';

const coreTeam = [
  pm('巨金怪', ['steel', 'psychic']),
  pm('美納斯', ['water']),
  pm('拉帝歐斯', ['dragon', 'psychic']),
];

const battleTuckerSilver = {
  order: 1,
  role: 'trainer',
  name: '【銀】希爾斯',
  location: '對戰巨蛋',
  notes: '第 5 次冠軍賽出現；從巨沼怪、暴飛龍、噴火龍中選 2 隻上場。銀戰術徽章。',
  party: [
    pm('巨沼怪', ['water', 'ground'], 50),
    pm('暴飛龍', ['dragon', 'flying'], 50),
    pm('噴火龍', ['fire', 'flying'], 50),
  ],
  recommendedTeams: [
    rec('草水剋制隊', '美納斯打暴飛龍、噴火龍；草系招式打巨沼怪。', [
      pm('美納斯', ['water']),
      pm('樂天河童', ['water', 'grass']),
      pm('巨金怪', ['steel', 'psychic']),
    ]),
    rec('泛用隊', '巨金怪壓制、拉帝歐斯補盲。', coreTeam),
  ],
};
assertBattle(battleTuckerSilver);

const battleLucySilver = {
  order: 2,
  role: 'trainer',
  name: '【銀】小薊',
  location: '對戰水管',
  notes: '通過 2 輪（28 房）後對戰。銀幸運徽章。',
  party: [
    pm('飯匙蛇', ['poison'], 50),
    pm('壺壺', ['water'], 50),
    pm('美納斯', ['water'], 50),
  ],
  recommendedTeams: [
    rec('電系突破隊', '雷電獸十萬伏特打美納斯；地面、超能打飯匙蛇。', [
      pm('雷電獸', ['electric']),
      pm('巨金怪', ['steel', 'psychic']),
      pm('美納斯', ['water']),
    ]),
    rec('耐久隊', '美納斯自我再生拖戰；劇毒磨壺壺。', coreTeam),
  ],
};
assertBattle(battleLucySilver);

const battleGretaSilver = {
  order: 3,
  role: 'trainer',
  name: '【銀】黃瓜香',
  location: '對戰競技場',
  notes: '第 28 勝出現。三回合內依心、技、體評判。銀毅力徽章。',
  party: [
    pm('赫拉克羅斯', ['bug', 'fighting'], 50),
    pm('月亮伊布', ['dark'], 50),
    pm('脫殼忍者', ['bug', 'ghost'], 50),
  ],
  recommendedTeams: [
    rec('飛行剋制隊', '燕返打赫拉克羅斯、斗笠菇；岩、飛、火打脫殼忍者。', [
      pm('暴飛龍', ['dragon', 'flying']),
      pm('巨金怪', ['steel', 'psychic']),
      pm('耿鬼', ['ghost', 'poison']),
    ]),
    rec('爆發隊', '高命中、兩回合內擊倒，避免拖評判。', [
      pm('巨金怪', ['steel', 'psychic']),
      pm('雷電獸', ['electric']),
      pm('暴飛龍', ['dragon', 'flying']),
    ]),
  ],
};
assertBattle(battleGretaSilver);

const battleAnabelSilver = {
  order: 4,
  role: 'trainer',
  name: '【銀】莉拉',
  location: '對戰塔',
  notes: '單打第 35 戰。銀能力徽章。徽章僅能於單打挑戰取得。',
  party: [
    pm('胡地', ['psychic'], 50),
    pm('炎帝', ['fire'], 50),
    pm('卡比獸', ['normal'], 50),
  ],
  recommendedTeams: [
    rec('剋制隊', '卡比獸、巨金怪打胡地；美納斯、巨沼怪打炎帝；格鬥、劇毒磨卡比獸。', [
      pm('巨金怪', ['steel', 'psychic']),
      pm('美納斯', ['water']),
      pm('卡比獸', ['normal']),
    ]),
    rec('穩定隊', '拉帝歐斯精神強念；地面系打炎帝。', coreTeam),
  ],
};
assertBattle(battleAnabelSilver);

const battleBrandonSilver = {
  order: 5,
  role: 'trainer',
  name: '【銀】神代',
  location: '對戰金字塔',
  notes: '累計通過 21 層後對戰。入場不可帶持有物，使用對戰背包。銀勇氣徽章。',
  party: [
    pm('雷吉洛克', ['rock'], 50),
    pm('雷吉斯奇魯', ['steel'], 50),
    pm('雷吉艾斯', ['ice'], 50),
  ],
  recommendedTeams: [
    rec('三神柱隊', '水、草、格鬥、地面打雷吉洛克；火、地面打雷吉斯奇魯；格鬥、岩、鋼打雷吉艾斯。', [
      pm('美納斯', ['water']),
      pm('巨金怪', ['steel', 'psychic']),
      pm('怪力', ['fighting']),
    ]),
    rec('探索隊', '巨金怪抗毒；美納斯自我再生。', coreTeam),
  ],
};
assertBattle(battleBrandonSilver);

const battleSpenserSilver = {
  order: 6,
  role: 'trainer',
  name: '【銀】宇康',
  location: '對戰宮殿',
  notes: '第 21 勝出現。寶可夢自動選招，宜固執、內斂等主動攻擊性格。銀精神徽章。',
  party: [
    pm('叉字蝠', ['poison', 'flying'], 50),
    pm('請假王', ['normal'], 50),
    pm('拉普拉斯', ['water', 'ice'], 50),
  ],
  recommendedTeams: [
    rec('宮殿隊', '巨金怪、暴飛龍物攻型；避免純輔助招。', [
      pm('巨金怪', ['steel', 'psychic']),
      pm('暴飛龍', ['dragon', 'flying']),
      pm('美納斯', ['water']),
    ]),
    rec('剋制隊', '電、岩打叉字蝠；格鬥打請假王；電、格鬥打拉普拉斯。', coreTeam),
  ],
};
assertBattle(battleSpenserSilver);

const battleNolandSilver = {
  order: 7,
  role: 'trainer',
  name: '【銀】達拉',
  location: '對戰工廠',
  notes: '第 21 戰出現。達拉與對手皆為隨機租借隊伍，重視戰後換怪判斷。銀知識徽章。',
  party: [pm('隨機租借寶可夢', ['normal'], 50)],
  recommendedTeams: [
    rec('租借判斷隊', '優先租高速輸出、高耐久水系；打贏後換入對手強力寶可夢補覆蓋；勿亂換穩定核心。', [
      pm('胡地', ['psychic']),
      pm('美納斯', ['water']),
      pm('巨金怪', ['steel', 'psychic']),
    ]),
    rec('覆蓋隊', '補電、冰、地面；避免低命中怪招。', [
      pm('雷電獸', ['electric']),
      pm('耿鬼', ['ghost', 'poison']),
      pm('暴飛龍', ['dragon', 'flying']),
    ]),
  ],
};
assertBattle(battleNolandSilver);

const battleTuckerGold = {
  order: 8,
  role: 'trainer',
  name: '【金】希爾斯',
  location: '對戰巨蛋',
  notes: '第 10 次冠軍賽；從巨沼怪、巨金怪、拉帝亞斯中選 2 隻上場。金戰術徽章。',
  party: [
    pm('巨沼怪', ['water', 'ground'], 60),
    pm('巨金怪', ['steel', 'psychic'], 60),
    pm('拉帝亞斯', ['dragon', 'psychic'], 60),
  ],
  recommendedTeams: [
    rec('草系隊', '草系打巨沼怪；冰、龍、影子球打拉帝亞斯。', [
      pm('樂天河童', ['water', 'grass']),
      pm('美納斯', ['water']),
      pm('巨金怪', ['steel', 'psychic']),
    ]),
    rec('穩定隊', '努力值滿的巨金怪、美納斯、拉帝歐斯。', coreTeam),
  ],
};
assertBattle(battleTuckerGold);

const battleLucyGold = {
  order: 9,
  role: 'trainer',
  name: '【金】小薊',
  location: '對戰水管',
  notes: '通過 10 輪（140 房）後對戰。金幸運徽章。',
  party: [
    pm('飯匙蛇', ['poison'], 60),
    pm('大鋼蛇', ['steel', 'ground'], 60),
    pm('暴鯉龍', ['water', 'dark'], 60),
  ],
  recommendedTeams: [
    rec('電系隊', '十萬伏特打暴鯉龍、美納斯；水、火、地面打大鋼蛇。', [
      pm('雷電獸', ['electric']),
      pm('美納斯', ['water']),
      pm('巨金怪', ['steel', 'psychic']),
    ]),
    rec('泛用隊', '地面、超能打飯匙蛇。', coreTeam),
  ],
};
assertBattle(battleLucyGold);

const battleGretaGold = {
  order: 10,
  role: 'trainer',
  name: '【金】黃瓜香',
  location: '對戰競技場',
  notes: '第 56 勝出現。金毅力徽章。',
  party: [
    pm('月亮伊布', ['dark'], 60),
    pm('耿鬼', ['ghost', 'poison'], 60),
    pm('斗笠菇', ['grass', 'fighting'], 60),
  ],
  recommendedTeams: [
    rec('飛行隊', '燕返打斗笠菇；超能、惡打月亮伊布；地面無效耿鬼，用超能、惡、幽靈。', [
      pm('暴飛龍', ['dragon', 'flying']),
      pm('巨金怪', ['steel', 'psychic']),
      pm('耿鬼', ['ghost', 'poison']),
    ]),
    rec('速攻隊', '三回合內高火力輸出。', coreTeam),
  ],
};
assertBattle(battleGretaGold);

const battleAnabelGold = {
  order: 11,
  role: 'trainer',
  name: '【金】莉拉',
  location: '對戰塔',
  notes: '單打第 70 戰，同一挑戰內銀戰後繼續累積。金能力徽章。',
  party: [
    pm('雷公', ['electric'], 60),
    pm('拉帝歐斯', ['dragon', 'psychic'], 60),
    pm('卡比獸', ['normal'], 60),
  ],
  recommendedTeams: [
    rec('地面電隊', '地面打雷公；冰凍光束、龍爪打拉帝歐斯；格鬥、劇毒對卡比獸。', [
      pm('巨沼怪', ['water', 'ground']),
      pm('美納斯', ['water']),
      pm('巨金怪', ['steel', 'psychic']),
    ]),
    rec('滿努力值隊', '塔穩定 50 連勝後再衝金。', coreTeam),
  ],
};
assertBattle(battleAnabelGold);

const battleBrandonGold = {
  order: 12,
  role: 'trainer',
  name: '【金】神代',
  location: '對戰金字塔',
  notes: '累計 70 層後對戰。金勇氣徽章。',
  party: [
    pm('急凍鳥', ['ice', 'flying'], 60),
    pm('閃電鳥', ['electric', 'flying'], 60),
    pm('火焰鳥', ['fire', 'flying'], 60),
  ],
  recommendedTeams: [
    rec('岩石四倍隊', '岩石招式打急凍鳥、火焰鳥；電、冰打閃電鳥。', [
      pm('巨金怪', ['steel', 'psychic']),
      pm('美納斯', ['water']),
      pm('雷電獸', ['electric']),
    ]),
    rec('電系清場', '三聖鳥皆怕電系與岩石。', coreTeam),
  ],
};
assertBattle(battleBrandonGold);

const battleSpenserGold = {
  order: 13,
  role: 'trainer',
  name: '【金】宇康',
  location: '對戰宮殿',
  notes: '第 42 勝出現。金精神徽章。',
  party: [
    pm('風速狗', ['fire'], 60),
    pm('請假王', ['normal'], 60),
    pm('水君', ['water'], 60),
  ],
  recommendedTeams: [
    rec('宮殿物攻隊', '固執巨金怪、爽朗暴飛龍；純攻擊招式。', [
      pm('巨金怪', ['steel', 'psychic']),
      pm('暴飛龍', ['dragon', 'flying']),
      pm('美納斯', ['water']),
    ]),
    rec('剋制隊', '水、地面打風速狗；電、草、劇毒打水君。', coreTeam),
  ],
};
assertBattle(battleSpenserGold);

const battleNolandGold = {
  order: 14,
  role: 'trainer',
  name: '【金】達拉',
  location: '對戰工廠',
  notes: '第 42 戰出現。隊伍仍為隨機租借。金知識徽章。',
  party: [pm('隨機租借寶可夢', ['normal'], 60)],
  recommendedTeams: [
    rec('長連勝租借隊', '維持穩定核心不亂換；補齊電、冰、地面覆蓋後再挑戰。', [
      pm('美納斯', ['water']),
      pm('巨金怪', ['steel', 'psychic']),
      pm('胡地', ['psychic']),
    ]),
    rec('判斷隊', '只換入明顯優於現有戰力的租借寶可夢。', [
      pm('耿鬼', ['ghost', 'poison']),
      pm('雷電獸', ['electric']),
      pm('暴飛龍', ['dragon', 'flying']),
    ]),
  ],
};
assertBattle(battleNolandGold);

export const battleFrontierExpansion = {
  id: 'battle-frontier',
  title: '戰鬥開拓區',
  tabLabel: '戰鬥開拓區',
  battleSectionTitle: '開拓之腦戰鬥',
  hmSectionTitle: '建議準備',
  hmTableHeaders: ['準備項目', '重要性', '用途'],
  legendHint: '移至標示詞可查看說明',
  usePrepLegend: true,

  prerequisites: [
    {
      variant: 'frontier',
      title: '如何進入戰鬥開拓區',
      rows: [
        { label: '進度', value: '打倒四天王與冠軍米可利，登入名人堂' },
        { label: '未白鎮', value: '父親給船票；電視播開拓區新聞；母親詢問寶可夢顏色（拉帝亞斯／拉帝歐斯遊走）' },
        { label: '全國圖鑑', value: '離開未白鎮時小田卷博士升級（非開拓區門檻）' },
        { label: '路線甲', value: '111 號道路遇亞希達，帶路至開拓區' },
        { label: '路線乙', value: '凱那市或水靜市搭破浪號；首次船艙遇亞希達，第二次起可直達' },
        { label: '通行證', value: '招待處取得開拓區通行證，記錄戰鬥點數與七種開拓徽章' },
      ],
    },
    {
      variant: 'frontier',
      title: '共通規則',
      rows: [
        { label: '等級模式', value: '等級 50 模式 或 開放等級（對手最低等級 60）' },
        { label: '參戰數量', value: '多數設施 3 隻' },
        { label: '同種限制', value: '不能帶兩隻同種寶可夢' },
        { label: '道具限制', value: '不能兩隻持有同一道具' },
        { label: '背包道具', value: '一般戰鬥不可用；對戰金字塔可使用對戰背包' },
        { label: '開拓之腦', value: '僅 3 對 3 單打；銀、金條件因設施而異' },
        { label: '徽章模式', value: '對戰塔等有多種模式時，徽章僅能於單打挑戰取得' },
        { label: '獎勵', value: '連勝得戰鬥點數；擊敗開拓之腦得銀、金徽章' },
        { label: '經驗與金錢', value: '無' },
        { label: '禁用寶可夢', value: '超夢、夢幻、洛奇亞、鳳王、時拉比、蓋歐卡、固拉多、烈空坐、基拉祈、代歐奇希斯、蛋' },
      ],
    },
  ],

  hms: [
    { name: '狀態招式', importance: '必帶', usage: '催眠、麻痺、寄生種子；塔、工廠、金字塔長連勝必備' },
    { name: '高命中先制招', importance: '必帶', usage: '競技場三回合評判（心、技、體）需積極輸出' },
    { name: '多屬性覆蓋', importance: '必帶', usage: '巨蛋、塔、水管雜戰需電、冰、地面、草等' },
    { name: '性格與招式池', importance: '建議', usage: '對戰宮殿寶可夢自動選招，宜固執、內斂、膽小、爽朗' },
    { name: '持有物多樣', importance: '必帶', usage: '剩飯、選擇頭帶、亮粉、先制之爪、木子果；不可重複' },
  ],

  sections: [
    {
      type: 'island',
      number: 1,
      title: '對戰塔攻略',
      intro: '最標準的連續單打設施；開拓之腦莉拉僅在單打模式第 35、70 戰出現。檢驗隊伍強度的最佳試煉場。',
      places: [
        { name: '對戰規則', content: '亦有雙打、多人模式，但徽章僅單打可取得' },
        { name: '銀徽章', content: '第 35 戰擊敗莉拉；隊伍：胡地、炎帝、卡比獸' },
        { name: '金徽章', content: '同一挑戰內第 70 戰；隊伍：雷公、拉帝歐斯、卡比獸' },
      ],
      flows: [
        '登記等級 50 模式或開放等級，選擇單打',
        '連續 7 場為一組，累積至第 35 戰對戰莉拉',
        '銀戰勝後不重置，繼續至第 70 戰挑戰金徽章',
      ],
      tips: [
        '對戰塔 20 連勝不穩時先練努力值再衝金徽章',
        '胡地用卡比獸、巨金怪、影子球；炎帝用美納斯、巨沼怪',
        '卡比獸用格鬥招、劇毒；雷公用地面系',
      ],
    },
    {
      type: 'island',
      number: 2,
      title: '對戰工廠攻略',
      intro: '不能自備寶可夢，租借 3 隻連戰；每場勝利可將對手 1 隻換入隊伍。達拉隊伍亦隨機。',
      places: [
        { name: '銀徽章', content: '第 21 戰擊敗達拉' },
        { name: '金徽章', content: '同一挑戰第 42 戰' },
      ],
      flows: [
        '從 6 隻候選中選 3 隻租借',
        '每 3 連勝為一輪，可換入剛擊敗對手的 1 隻',
        '達到 21、42 戰分別挑戰達拉',
      ],
      tips: [
        '優先租胡地、耿鬼、美納斯、巨金怪、暴飛龍',
        '避免低命中怪招、純狀態型、弱點過多慢速手',
        '有穩定核心時勿貪換怪',
      ],
    },
    {
      type: 'island',
      number: 3,
      title: '對戰巨蛋攻略',
      intro: '八強錦標賽；帶 3 隻、每場選 2 隻上場。可看對手資料，最適合先拿銀徽章。',
      places: [
        { name: '銀徽章', content: '第 5 次冠軍賽；希爾斯從巨沼怪、暴飛龍、噴火龍選 2 隻' },
        { name: '金徽章', content: '第 10 次冠軍賽；巨沼怪、巨金怪、拉帝亞斯選 2 隻' },
      ],
      flows: [
        '登記 3 隻參加錦標賽',
        '每輪開打前查看對手紀錄與隊伍',
        '依剋制選 2 隻出戰直至冠軍賽',
      ],
      tips: [
        '美納斯打暴飛龍、噴火龍；草系打巨沼怪',
        '巨金怪泛用壓制；拉帝歐斯補盲',
        '比對戰塔更仁慈，可先閱讀對手情報',
      ],
    },
    {
      type: 'island',
      number: 4,
      title: '對戰競技場攻略',
      intro: '每隻寶可夢最多戰 3 回合，未擊倒則依心、技、體評判；不可替換，依登錄順序出場。',
      places: [
        { name: '評判', content: '心＝積極攻擊；技＝命中與效果；體＝剩餘體力比例' },
        { name: '銀徽章', content: '第 28 勝；赫拉克羅斯、月亮伊布、脫殼忍者' },
        { name: '金徽章', content: '第 56 勝；月亮伊布、耿鬼、斗笠菇' },
      ],
      flows: [
        '登記 3 隻，按順序逐一出戰',
        '三回合內求擊倒或評判得分',
        '累積勝場至 28、56 對戰黃瓜香',
      ],
      tips: [
        '高命中、高火力、明確剋制；勿拖回合保護、影分身',
        '脫殼忍者須帶岩、飛、火、幽靈、惡攻擊',
        '燕返打赫拉克羅斯、斗笠菇',
      ],
    },
    {
      type: 'island',
      number: 5,
      title: '對戰水管攻略',
      intro: '每輪 7 個房間三選一路線；可能遇戰鬥、雙打、野生、狀態、回血或空房。銀 2 輪（28 房）、金 10 輪（140 房）。',
      places: [
        { name: '櫃檯提示', content: '感覺有人＝訓練家；有氣味＝野生或強敵；懷念感＝異常狀態' },
        { name: '銀徽章', content: '飯匙蛇、壺壺、美納斯' },
        { name: '金徽章', content: '飯匙蛇、大鋼蛇、暴鯉龍' },
      ],
      flows: [
        '每輪選 7 次路線通過房間',
        '完成 2 輪後對戰小薊（銀）',
        '同一挑戰累計 10 輪對戰小薊（金）',
      ],
      tips: [
        '雷電獸打美納斯、暴鯉龍；電系四倍剋暴鯉龍',
        '壺壺用劇毒磨，勿被拖死',
        '帶木子果、剩飯應對隨機狀態房',
      ],
    },
    {
      type: 'island',
      number: 6,
      title: '對戰宮殿攻略',
      intro: '寶可夢依性格自動選招，玩家無法下指令。銀、金各需 21、42 勝。',
      places: [
        { name: '推薦性格', content: '固執、內斂、膽小、爽朗；主攻擊傾向' },
        { name: '銀徽章', content: '叉字蝠、請假王、拉普拉斯' },
        { name: '金徽章', content: '風速狗、請假王、水君' },
      ],
      flows: [
        '登記 3 隻，性格決定出招',
        '連勝至 21、42 對戰宇康',
      ],
      tips: [
        '招式池以攻擊為主，少帶純輔助',
        '巨金怪、暴飛龍、美納斯為宮殿常客',
        '水、地面打風速狗；電、草打水君',
      ],
    },
    {
      type: 'island',
      number: 7,
      title: '對戰金字塔攻略',
      intro: '迷宮探索型；入場不可帶持有物，道具放對戰背包。銀 21 層、金 70 層對戰神代。',
      places: [
        { name: '對戰背包', content: '金字塔內撿到的道具專用；部分可帶入下一輪' },
        { name: '銀徽章', content: '雷吉洛克、雷吉斯奇魯、雷吉艾斯' },
        { name: '金徽章', content: '急凍鳥、閃電鳥、火焰鳥' },
      ],
      flows: [
        '選 3 隻入場（無持有物）',
        '探索樓層、連戰、收集對戰背包道具',
        '累計 21、70 層對戰神代',
      ],
      tips: [
        '各輪可能有麻痺、中毒、燒傷、一擊必殺等主題風險',
        '美納斯自我再生、巨金怪抗毒穩定',
        '打三神鳥備岩石、電系招式',
      ],
    },
    {
      type: 'summary',
      title: '七大設施總覽',
      summaryMode: 'facility',
      headers: ['設施', '難度', '銀條件', '金條件', '開拓之腦'],
      rows: [
        { island: '對戰工廠', priority: '很高', task: '第 21 戰', hms: '第 42 戰', brain: '達拉' },
        { island: '對戰競技場', priority: '高', task: '第 28 勝', hms: '第 56 勝', brain: '黃瓜香' },
        { island: '對戰巨蛋', priority: '中', task: '第 5 次冠軍賽', hms: '第 10 次冠軍賽', brain: '希爾斯' },
        { island: '對戰水管', priority: '中～高', task: '2 輪（28 房）', hms: '10 輪（140 房）', brain: '小薊' },
        { island: '對戰宮殿', priority: '很高', task: '第 21 勝', hms: '第 42 勝', brain: '宇康' },
        { island: '對戰金字塔', priority: '高', task: '21 層', hms: '70 層', brain: '神代' },
        { island: '對戰塔', priority: '很高', task: '第 35 戰', hms: '第 70 戰', brain: '莉拉' },
      ],
    },
    {
      type: 'checklist',
      title: '建議銀徽章挑戰順序',
      vertical: true,
      steps: [
        '對戰巨蛋 — 可看對手資料，節奏最快',
        '對戰水管 — 有機率回血，銀徽章路線較短',
        '對戰競技場 — 規則固定，爆發型好打',
        '對戰塔 — 標準單打，檢驗隊伍強度',
        '對戰金字塔 — 迷宮與道具管理',
        '對戰宮殿 — 自動選招，很吃性格',
        '對戰工廠 — 租借寶可夢，運氣與判斷並重',
      ],
    },
    {
      type: 'teams',
      title: '推薦隊伍配置',
      groups: [
        {
          title: '穩定三核心',
          members: [
            { name: '巨金怪', reason: '固執或爽朗；剩飯或選擇頭帶；彗星拳、地震、岩崩、影子球。物攻主力，抗性多。' },
            { name: '拉帝歐斯', reason: '膽小或內斂；亮粉或木子果；精神強念、龍爪、十萬伏特、冥想。高速特攻。' },
            { name: '美納斯', reason: '大膽或沉著；剩飯；衝浪、冰凍光束、自我再生、劇毒。耐久水系。' },
          ],
        },
        {
          title: '不用傳說替補',
          members: [
            { name: '暴飛龍', reason: '物攻突破、燕返打競技場' },
            { name: '袋龍', reason: '泛用物攻' },
            { name: '耿鬼', reason: '干擾、免疫一般與格鬥' },
            { name: '雷電獸', reason: '水管、三聖鳥對策' },
          ],
        },
        {
          title: '分設施範例',
          members: [
            { name: '塔／巨蛋', reason: '巨金怪、美納斯、拉帝歐斯' },
            { name: '競技場', reason: '暴飛龍、巨金怪、雷電獸（高命中爆發）' },
            { name: '水管', reason: '美納斯、巨金怪、雷電獸' },
            { name: '金字塔', reason: '巨金怪、美納斯、耿鬼（抗毒、清場）' },
          ],
        },
      ],
    },
    {
      type: 'checklist',
      title: '戰鬥點數兌換優先順序',
      vertical: true,
      tiered: true,
      steps: [
        { tier: '極優先', text: '剩飯、選擇頭帶' },
        { tier: '優先', text: '亮粉、先制之爪、劍舞、岩崩、電磁波' },
        { tier: '次要', text: '三色拳、泰山壓頂、地球上投' },
      ],
    },
    {
      type: 'faq',
      title: '容易卡住的點',
      items: [
        { problem: '破關前水靜市對戰塔與開拓區對戰塔混淆', solution: '破關前為舊設施 50 連戰；開拓區塔在破關後南方，莉拉為開拓之腦' },
        { problem: '111 號道路找不到人帶路', solution: '應找亞希達，不是小田卷博士；小田卷僅升級全國圖鑑' },
        { problem: '不能帶兩隻卡比獸或兩顆剩飯', solution: '同種、同道具皆禁止，進場前檢查' },
        { problem: '對戰宮殿寶可夢亂出招', solution: '換固執、爽朗等性格，減少輔助招' },
        { problem: '競技場輸在評判', solution: '三回合內主動攻擊，勿保護、影分身摸魚' },
        { problem: '工廠越換越弱', solution: '只換入明顯更強的租借寶可夢，勿手癢亂換' },
        { problem: '打不贏脫殼忍者', solution: '隊伍須有岩、飛、火、幽靈或惡系攻擊' },
        { problem: '只靠高等級打不過', solution: '開拓區考驗努力值、性格、持有物與覆蓋面' },
      ],
    },
    {
      type: 'conclusion',
      title: '最重要結論',
      body: '四天王是期末考，戰鬥開拓區是研究所口試。銀徽章懶人路線：巨金怪＋美納斯＋拉帝歐斯（或暴飛龍），順序巨蛋→水管→競技場→塔→金字塔→宮殿→工廠。金徽章需滿努力值主力、多套持有物、熟記開拓之腦隊伍；工廠、宮殿、塔、金字塔最難。先在對戰塔穩定 50 連勝再衝金。',
    },
  ],

  gyms: [
    battleTuckerSilver,
    battleLucySilver,
    battleGretaSilver,
    battleAnabelSilver,
    battleBrandonSilver,
    battleSpenserSilver,
    battleNolandSilver,
    battleTuckerGold,
    battleLucyGold,
    battleGretaGold,
    battleAnabelGold,
    battleBrandonGold,
    battleSpenserGold,
    battleNolandGold,
  ],
};
