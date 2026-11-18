import { pm, rec, assertBattle } from './helpers.js';

/**
 * 校正依據：pret/pokeemerald 原作反組譯，非 ORAS 對戰屋。
 * https://github.com/pret/pokeemerald/blob/master/src/frontier_util.c
 * https://github.com/pret/pokeemerald/blob/master/src/battle_tower.c
 * https://github.com/pret/pokeemerald/blob/master/src/battle_script_commands.c
 * https://github.com/pret/pokeemerald/blob/master/src/battle_pike.c
 * 隊伍卡以等級 50 模式顯示；金銀象徵都不是固定 50／60 分級。
 */

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
  notes: '第 5 次冠軍賽出現；從巨沼怪、暴飛龍、噴火龍中選 2 隻上場。銀戰術徽章。 以下隊伍顯示等級 50 模式；開放模式等級依我方隊伍最高等級且最低 Lv60。',
  party: [
    pm('巨沼怪', ['water', 'ground'], 50),
    pm('暴飛龍', ['dragon', 'flying'], 50),
    pm('噴火龍', ['fire', 'flying'], 50),
  ],
  recommendedTeams: [
    rec('草水剋制隊', '美納斯冰凍光束打暴飛龍、衝浪打噴火龍；草招四倍打巨沼怪，注意其氣勢頭帶與雙倍奉還。', [
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
  notes: '通過 2 輪（28 房）後對戰。銀幸運徽章。 以下隊伍顯示等級 50 模式；開放模式等級依我方隊伍最高等級且最低 Lv60。',
  party: [
    pm('飯匙蛇', ['poison'], 50),
    pm('壺壺', ['bug', 'rock'], 50),
    pm('美納斯', ['water'], 50),
  ],
  recommendedTeams: [
    rec('電系突破隊', '雷電獸十萬伏特打美納斯；地面、超能打飯匙蛇。', [
      pm('雷電獸', ['electric']),
      pm('巨金怪', ['steel', 'psychic']),
      pm('美納斯', ['water']),
    ]),
    rec('耐久隊', '壺壺用水、岩石或鋼招；它有睡覺與零餘果，不能只靠劇毒。美納斯也會鏡面反射，特殊攻擊需留意反擊。', coreTeam),
  ],
};
assertBattle(battleLucySilver);

const battleGretaSilver = {
  order: 3,
  role: 'trainer',
  name: '【銀】黃瓜香',
  location: '對戰競技場',
  notes: '第 28 勝出現。三回合內依心、技、體評判。銀毅力徽章。 以下隊伍顯示等級 50 模式；開放模式等級依我方隊伍最高等級且最低 Lv60。',
  party: [
    pm('赫拉克羅斯', ['bug', 'fighting'], 50),
    pm('月亮伊布', ['dark'], 50),
    pm('脫殼忍者', ['bug', 'ghost'], 50),
  ],
  recommendedTeams: [
    rec('飛行剋制隊', '銀戰燕返四倍打赫拉克羅斯，也能穿過脫殼忍者的神奇守護；月亮伊布改用格鬥或蟲招。', [
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
  notes: '單打第 35 戰。銀能力徽章。徽章僅能於單打挑戰取得。 以下隊伍顯示等級 50 模式；開放模式等級依我方隊伍最高等級且最低 Lv60。',
  party: [
    pm('胡地', ['psychic'], 50),
    pm('炎帝', ['fire'], 50),
    pm('卡比獸', ['normal'], 50),
  ],
  recommendedTeams: [
    rec('剋制隊', '胡地使用三色拳與定身法，巨金怪仍怕火焰拳；美納斯水招打炎帝。卡比獸有腹鼓、哈欠與暗影球，保留格鬥物理招或及時壓低血量。', [
      pm('巨金怪', ['steel', 'psychic']),
      pm('美納斯', ['water']),
      pm('卡比獸', ['normal']),
    ]),
    rec('穩定隊', '拉帝歐斯對胡地改用其他覆蓋招，不用被超能力抵抗的精神強念硬打；巨金怪物攻、美納斯水招分工。', coreTeam),
  ],
};
assertBattle(battleAnabelSilver);

const battleBrandonSilver = {
  order: 5,
  role: 'trainer',
  name: '【銀】神代',
  location: '對戰金字塔',
  notes: '累計通過 21 層後對戰。入場不可帶持有物，使用對戰背包。銀勇氣徽章。 以下隊伍顯示等級 50 模式；開放模式等級依我方隊伍最高等級且最低 Lv60。',
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
  notes: '第 21 戰挑戰。招式由性格與 HP 區間決定，玩家仍可換人；加物攻或特攻的性格不等於偏好攻擊。銀精神徽章。 以下隊伍顯示等級 50 模式；開放模式等級依我方隊伍最高等級且最低 Lv60。',
  party: [
    pm('叉字蝠', ['poison', 'flying'], 50),
    pm('請假王', ['normal'], 50),
    pm('拉普拉斯', ['water', 'ice'], 50),
  ],
  recommendedTeams: [
    rec('宮殿隊', '先依性格配置攻擊、防禦與輔助三類招式；只有攻擊招仍可能因抽到其他類別而無法行動。', [
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
  notes: '單打第 21 戰出現。達拉使用隨機三隻；沒有固定名單。等級 50 模式為 Lv50，開放模式為 Lv100。銀知識徽章。',
  party: [pm('隨機租借寶可夢 ×3', [])],
  recommendedTeams: [
    rec('租借判斷隊', '以下物種只是角色範例，不保證出現在租借名單。要先看當輪六隻的實際招式、特性、持有物，再選三隻；勝場間可用一隻替換上一位對手的寶可夢。', [
      pm('胡地', ['psychic']),
      pm('美納斯', ['water']),
      pm('巨金怪', ['steel', 'psychic']),
    ]),
    rec('覆蓋隊', '依實際租借名單補電、冰、地面；不能自行指定這些物種或配招。', [
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
  notes: '第 10 次冠軍賽；從巨沼怪、巨金怪、拉帝亞斯中選 2 隻上場。金戰術徽章。 以下隊伍顯示等級 50 模式；開放模式等級依我方隊伍最高等級且最低 Lv60。',
  party: [
    pm('巨沼怪', ['water', 'ground'], 50),
    pm('巨金怪', ['steel', 'psychic'], 50),
    pm('拉帝亞斯', ['dragon', 'psychic'], 50),
  ],
  recommendedTeams: [
    rec('草系隊', '草招四倍打巨沼怪，但金戰它有鏡面反射；冰、龍或暗影球打拉帝亞斯，火／地面打巨金怪。', [
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
  notes: '通過 10 輪（140 房）後對戰。金幸運徽章。 以下隊伍顯示等級 50 模式；開放模式等級依我方隊伍最高等級且最低 Lv60。',
  party: [
    pm('飯匙蛇', ['poison'], 50),
    pm('大鋼蛇', ['steel', 'ground'], 50),
    pm('暴鯉龍', ['water', 'flying'], 50),
  ],
  recommendedTeams: [
    rec('電系隊', '金戰十萬伏特四倍打暴鯉龍，這場沒有美納斯；水、火、地面或格鬥打大鋼蛇。', [
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
  notes: '第 56 勝出現。金毅力徽章。 以下隊伍顯示等級 50 模式；開放模式等級依我方隊伍最高等級且最低 Lv60。',
  party: [
    pm('月亮伊布', ['dark'], 50),
    pm('耿鬼', ['ghost', 'poison'], 50),
    pm('斗笠菇', ['grass', 'fighting'], 50),
  ],
  recommendedTeams: [
    rec('飛行隊', '燕返四倍打斗笠菇；月亮伊布免疫超能力且抵抗惡，改用格鬥或蟲招。耿鬼有漂浮，改用超能力、惡或幽靈。', [
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
  notes: '單打第 70 戰，同一挑戰內銀戰後繼續累積。金能力徽章。 以下隊伍顯示等級 50 模式；開放模式等級依我方隊伍最高等級且最低 Lv60。',
  party: [
    pm('雷公', ['electric'], 50),
    pm('拉帝歐斯', ['dragon', 'psychic'], 50),
    pm('卡比獸', ['normal'], 50),
  ],
  recommendedTeams: [
    rec('地面電隊', '地面打雷公；冰或龍招打拉帝歐斯。金戰卡比獸有詛咒、睡覺與零餘果，不能只依賴劇毒；保留格鬥物理招與血量。', [
      pm('巨沼怪', ['water', 'ground']),
      pm('美納斯', ['water']),
      pm('巨金怪', ['steel', 'psychic']),
    ]),
    rec('滿努力值隊', '先確認每七場之間的隊伍表現再繼續；50 連勝不是任何解鎖條件。', coreTeam),
  ],
};
assertBattle(battleAnabelGold);

const battleBrandonGold = {
  order: 12,
  role: 'trainer',
  name: '【金】神代',
  location: '對戰金字塔',
  notes: '累計 70 層後對戰。金勇氣徽章。 以下隊伍顯示等級 50 模式；開放模式等級依我方隊伍最高等級且最低 Lv60。',
  party: [
    pm('急凍鳥', ['ice', 'flying'], 50),
    pm('閃電鳥', ['electric', 'flying'], 50),
    pm('火焰鳥', ['fire', 'flying'], 50),
  ],
  recommendedTeams: [
    rec('岩石四倍隊', '岩石招四倍打急凍鳥、火焰鳥，二倍打閃電鳥；冰招也二倍打閃電鳥。', [
      pm('巨金怪', ['steel', 'psychic']),
      pm('美納斯', ['water']),
      pm('雷電獸', ['electric']),
    ]),
    rec('分工應對', '閃電鳥的電／飛行讓電招只有一般效果；電招二倍打另外兩隻，岩石可覆蓋三隻。', coreTeam),
  ],
};
assertBattle(battleBrandonGold);

const battleSpenserGold = {
  order: 13,
  role: 'trainer',
  name: '【金】宇康',
  location: '對戰宮殿',
  notes: '第 42 勝出現。金精神徽章。 以下隊伍顯示等級 50 模式；開放模式等級依我方隊伍最高等級且最低 Lv60。',
  party: [
    pm('風速狗', ['fire'], 50),
    pm('請假王', ['normal'], 50),
    pm('水君', ['water'], 50),
  ],
  recommendedTeams: [
    rec('宮殿物攻隊', '不能把一般對戰的固執／爽朗直接當成宮殿最佳性格。選招偏好會隨 HP 變化，配招要對應三種類別。', [
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
  notes: '單打第 42 戰出現，隊伍仍為隨機三隻。等級依所選模式為 Lv50 或 Lv100，並非固定 Lv60。金知識徽章。',
  party: [pm('隨機租借寶可夢 ×3', [])],
  recommendedTeams: [
    rec('長連勝租借隊', '名單只是角色範例。換怪次數會影響後續較強租借選項；在不破壞當輪覆蓋的前提下評估交換。', [
      pm('美納斯', ['water']),
      pm('巨金怪', ['steel', 'psychic']),
      pm('胡地', ['psychic']),
    ]),
    rec('判斷隊', '看實際配招、速度和隊伍弱點，不只看種族名；不能保證候選中有以下寶可夢。', [
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
        { label: '未白鎮', value: '父親給船票；電視播報遊走寶可夢，回答母親紅色會出現拉帝亞斯、藍色會出現拉帝歐斯' },
        { label: '全國圖鑑', value: '離開未白鎮時小田卷博士升級（非開拓區門檻）' },
        { label: '首次搭船', value: '從凱那市或水靜市搭乘破浪號，船上會遇見亞希達並收到邀請' },
        { label: '開拓區航線', value: '完成首次船程後，再搭船選戰鬥開拓區；不需到 111 號道路找人帶路' },
        { label: '通行證', value: '招待處取得開拓區通行證，記錄戰鬥點數與七種開拓徽章' },
      ],
    },
    {
      variant: 'frontier',
      title: '共通規則',
      rows: [
        { label: '等級模式', value: '等級 50 模式不會把超過 Lv50 的隊員自動降級；開放模式一般依我方隊伍最高等級，對手最低 Lv60。工廠開放模式固定 Lv100' },
        { label: '參戰數量', value: '本攻略以單打登記 3 隻為主；巨蛋每場從 3 隻選 2 隻上場' },
        { label: '同種限制', value: '不能帶兩隻同種寶可夢' },
        { label: '道具限制', value: '不能兩隻持有同一道具' },
        { label: '背包道具', value: '一般戰鬥不可用；對戰金字塔可使用對戰背包' },
        { label: '開拓之腦', value: '有多種戰鬥模式的設施，須選單打才有開拓之腦；巨蛋是 2 對 2，其餘通常 3 對 3' },
        { label: '徽章模式', value: '對戰塔等有多種模式時，徽章僅能於單打挑戰取得' },
        { label: '獎勵', value: '連勝得戰鬥點數；擊敗開拓之腦得銀、金徽章' },
        { label: '經驗與金錢', value: '無' },
        { label: '禁用寶可夢', value: '超夢、夢幻、洛奇亞、鳳王、時拉比、蓋歐卡、固拉多、烈空坐、基拉祈、代歐奇希斯、蛋' },
      ],
    },
  ],

  hms: [
    { name: '狀態與回復招', importance: '依設施', usage: '塔、水管、金字塔可用於續航；競技場需注意三回合評判，工廠只能使用租借配招' },
    { name: '高命中攻擊', importance: '建議', usage: '競技場三回合評判重視命中、有效攻擊及 HP；先制招是選項，不是必備條件' },
    { name: '多屬性覆蓋', importance: '必帶', usage: '巨蛋、塔、水管雜戰需電、冰、地面、草等' },
    { name: '性格與招式池', importance: '建議', usage: '對戰宮殿需配合性格的攻擊／防禦／輔助機率與 HP 區間，不以加成能力值推斷' },
    { name: '持有物多樣', importance: '必帶', usage: '吃剩的東西、講究頭帶、木子果等依角色分配，隊內不重複；金字塔入場不能攜帶持有物' },
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
        '胡地可用卡比獸或暗影球應對，巨金怪需留意火焰拳；炎帝用美納斯、巨沼怪',
        '卡比獸用格鬥物理招，金戰有睡覺不宜只靠劇毒；雷公用地面招',
      ],
    },
    {
      type: 'island',
      number: 2,
      title: '對戰工廠攻略',
      intro: '不能自備寶可夢；每輪先從 6 隻租 3 隻，連戰 7 場。勝場之間可用自己 1 隻換取剛擊敗對手的 1 隻，達拉隊伍也隨機。',
      places: [
        { name: '銀徽章', content: '第 21 戰擊敗達拉' },
        { name: '金徽章', content: '同一挑戰第 42 戰' },
      ],
      flows: [
        '從 6 隻候選中選 3 隻租借',
        '每 7 連勝為一輪；一輪內勝場之間可交換 1 隻，下一輪重新選租借隊伍',
        '達到 21、42 戰分別挑戰達拉',
      ],
      tips: [
        '先看租借配招與持有物；同物種可能有不同配置，強種族不代表該組配招適合',
        '優先確保可靠攻擊與屬性覆蓋，再依隊伍選回復或狀態輔助',
        '交換次數會影響之後較強租借候選，仍須兼顧當輪勝率',
      ],
    },
    {
      type: 'island',
      number: 3,
      title: '對戰巨蛋攻略',
      intro: '16 人錦標賽，每屆需贏 4 場；登記 3 隻，每場選 2 隻上場。可先看對手情報，再決定出場。',
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
        '美納斯用冰凍光束打暴飛龍、衝浪打噴火龍；草招四倍打巨沼怪',
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
        { name: '評判', content: '心看招式的攻擊積極度；技看成功命中與效果；體比較三回合前後的 HP 比例變化，不只看結束剩餘 HP' },
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
      intro: '每輪選路 7 次，選路房與事件房合計 14 房；可能遇戰鬥、野生、狀態或回復。銀 2 輪計 28 房，金 10 輪計 140 房。',
      places: [
        { name: '櫃檯提示', content: '提示只指向一間房且各有兩種可能：有人＝單打或全回復；寶可夢氣味＝野生或強敵；懷念感＝異常或部分回復；交談聲＝空房 NPC 或雙打' },
        { name: '銀徽章', content: '飯匙蛇、壺壺、美納斯' },
        { name: '金徽章', content: '飯匙蛇、大鋼蛇、暴鯉龍' },
      ],
      flows: [
        '每輪做 7 次三選一路線，連同選路房共計 14 房',
        '完成 2 輪後對戰小薊（銀）',
        '同一挑戰累計 10 輪對戰小薊（金）',
      ],
      tips: [
        '雷電獸打美納斯、暴鯉龍；電系四倍剋暴鯉龍',
        '壺壺蟲／岩石，弱水、岩石、鋼；其睡覺與零餘果能解除劇毒，需準備實際攻擊',
        '帶木子果、剩飯應對隨機狀態房',
      ],
    },
    {
      type: 'island',
      number: 6,
      title: '對戰宮殿攻略',
      intro: '寶可夢依性格與 HP 自動選招，玩家不能指定招式但仍可換人。單打第 21、42 戰分別挑戰銀、金宇康。',
      places: [
        { name: '性格例子', content: '高 HP 時固執攻擊機率 38%、內斂 35%；低 HP 分別為 70%、34%。急躁為 58%→88%，不能把一般能力加成當成選招偏好' },
        { name: '銀徽章', content: '叉字蝠、請假王、拉普拉斯' },
        { name: '金徽章', content: '風速狗、請假王、水君' },
      ],
      flows: [
        '登記 3 隻，性格決定出招',
        '連勝至 21、42 對戰宇康',
      ],
      tips: [
        '按性格配置攻擊、防禦、輔助類；缺少抽中的類別可能無法行動，四個攻擊招不保證每回合攻擊',
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
            { name: '巨金怪', reason: '塔等一般設施可選固執或爽朗；講究頭帶；彗星拳、地震、岩崩、暗影球。50 模式需讓金屬怪延後進化，Lv50 學彗星拳後再進化；巨金怪本身 Lv55 才學。暗影球屬物理；岩崩需教學。宮殿另按選招機率配招。' },
            { name: '拉帝歐斯', reason: '膽小或內斂、木子果；精神強念、龍爪、十萬伏特、冥想。通關後電視選藍色才能在本存檔自然遇到拉帝歐斯；若選紅色可考慮拉帝亞斯或暴飛龍。' },
            { name: '美納斯', reason: '大膽或沉著、吃剩的東西；衝浪、冰凍光束、自我再生、劇毒。醜醜魚進化需美麗度，培養較費時；不能與其他隊員重複持有物。' },
          ],
        },
        {
          title: '不用傳說替補',
          members: [
            { name: '暴飛龍', reason: '物攻突破、燕返打競技場' },
            { name: '袋龍', reason: '泛用物攻；綠寶石本身無野生來源，須從其他相容版本交換取得' },
            { name: '耿鬼', reason: '干擾、免疫一般與格鬥；綠寶石本身無鬼斯家族野生來源，須外部交換，鬼斯通再經交換進化。無交換可改用其他已培養隊員' },
            { name: '雷電獸', reason: '水管對美納斯與暴鯉龍；電招打閃電鳥只有一般效果，不能包辦三神鳥' },
          ],
        },
        {
          title: '分設施範例',
          members: [
            { name: '塔／巨蛋', reason: '巨金怪、美納斯、拉帝歐斯' },
            { name: '競技場', reason: '暴飛龍、巨金怪、雷電獸（高命中爆發）' },
            { name: '水管', reason: '美納斯、巨金怪、雷電獸' },
            { name: '金字塔', reason: '巨金怪、美納斯、已取得的耿鬼（後者需要交換）；入場先移除持有物' },
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
        { tier: '極優先', text: '依隊伍選吃剩的東西或講究頭帶；隊內不能重複同一道具' },
        { tier: '優先', text: '缺少的招式教學，例如岩崩、劍舞、電磁波；先確認學習相容性與 BP 費用' },
        { tier: '依角色', text: '三色拳、泰山壓頂、地球上投等招式教學；第三世代三色拳都是特殊招式' },
      ],
    },
    {
      type: 'faq',
      title: '容易卡住的點',
      items: [
        { problem: '把紅／藍寶石的對戰塔套進綠寶石', solution: '綠寶石的對戰塔位於通關後開拓區；沒有破關前水靜市舊塔 50 連戰這個解鎖流程' },
        { problem: '通關後找不到開拓區航線', solution: '先使用父親給的船票完成首次破浪號船程並遇見亞希達，再搭船選開拓區；不用前往 111 號道路' },
        { problem: '不能帶兩隻卡比獸或兩顆剩飯', solution: '同種、同道具皆禁止，進場前檢查' },
        { problem: '對戰宮殿寶可夢亂出招', solution: '確認性格在高、低 HP 的選招比例；依攻擊、防禦、輔助類配招，不能只刪掉輔助招' },
        { problem: '競技場輸在評判', solution: '三回合內主動攻擊，勿保護、影分身摸魚' },
        { problem: '工廠越換越弱', solution: '比較實際配招與隊伍覆蓋，也考慮累積交換次數對後續租借候選的影響' },
        { problem: '打不贏脫殼忍者', solution: '隊伍須有岩、飛、火、幽靈或惡系攻擊' },
        { problem: '只靠高等級打不過', solution: '開拓區考驗努力值、性格、持有物與覆蓋面' },
      ],
    },
    {
      type: 'conclusion',
      title: '最重要結論',
      body: '先選定等級模式，再依設施調整隊伍。一般設施可從巨金怪、美納斯與拉帝歐斯／暴飛龍分工；工廠使用租借，宮殿要另看性格選招，金字塔使用專用背包。挑戰順序是建議，沒有先拿某象徵或塔 50 連勝才能開放其他設施的門檻。',
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
