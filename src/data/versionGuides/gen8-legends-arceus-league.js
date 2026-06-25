import { pm, rec, cov, mup, supply, assertBattle, assertLeague } from './helpers.js';

const volo = {
  order: 1,
  role: 'trainer',
  name: '望羅',
  location: '神奧神殿',
  specialty: 'mixed',
  notes: '破關後與望羅合作尋找石板，最後在神殿對戰。隊伍類似神奧冠軍級配置，打完後緊接騎拉帝納兩型態，續戰能力很重要。',
  party: [
    pm('烈咬陸鯊', ['dragon', 'ground'], 70),
    pm('路卡利歐', ['fighting', 'steel'], 70),
    pm('黏美龍', ['dragon', 'steel'], 70),
    pm('帝牙盧卡', ['steel', 'dragon'], 70),
    pm('帕路奇亞', ['water', 'dragon'], 70),
    pm('美納斯', ['water'], 70),
  ],
  recommendedTeams: [
    rec('破關後穩定隊', '烈咬陸鯊高速物攻、洗翠黏美龍超高耐久、路卡利歐打點廣；保留冰/惡/妖精對付騎拉帝納。', [
      pm('烈咬陸鯊', ['dragon', 'ground']),
      pm('黏美龍', ['dragon', 'steel']),
      pm('路卡利歐', ['fighting', 'steel']),
      pm('帝牙盧卡', ['steel', 'dragon']),
      pm('冰伊布', ['ice']),
      pm('月亮伊布', ['dark']),
    ]),
    rec('耐久續戰隊', '黏美龍拖望羅前半；月亮伊布抗超能與幽靈；冰伊布專打騎拉帝納。', [
      pm('黏美龍', ['dragon', 'steel']),
      pm('月亮伊布', ['dark']),
      pm('冰伊布', ['ice']),
      pm('帕路奇亞', ['water', 'dragon']),
      pm('路卡利歐', ['fighting', 'steel']),
      pm('烈咬陸鯊', ['dragon', 'ground']),
    ]),
  ],
};
assertBattle(volo);

const giratinaOrigin = {
  order: 2,
  role: 'legendary',
  name: '騎拉帝納（起源型態）',
  location: '神奧神殿',
  specialty: 'ghost',
  notes: '望羅戰後立即對戰。起源型態幽靈／龍，弱冰、龍、幽靈、惡、妖精。別在前半把冰系主力耗光。',
  party: [pm('騎拉帝納', ['ghost', 'dragon'], 75)],
  recommendedTeams: [
    rec('剋龍幽靈隊', '冰凍光束／冰柱墜擊打龍；惡之波動／咬碎打幽靈；妖精招式亦可。', [
      pm('冰伊布', ['ice']),
      pm('月亮伊布', ['dark']),
      pm('黏美龍', ['dragon', 'steel']),
      pm('烈咬陸鯊', ['dragon', 'ground']),
      pm('路卡利歐', ['fighting', 'steel']),
      pm('帕路奇亞', ['water', 'dragon']),
    ]),
  ],
};
assertBattle(giratinaOrigin);

const giratinaAltered = {
  order: 3,
  role: 'legendary',
  name: '騎拉帝納（別種型態）',
  location: '神奧神殿',
  specialty: 'ghost',
  notes: '緊接起源型態後第二戰。別種型態同屬幽靈／龍，打法與剋制相同；滿補藥與活力塊必帶。',
  party: [pm('騎拉帝納', ['ghost', 'dragon'], 75)],
  recommendedTeams: [
    rec('冰惡雙核', '冰伊布或瑪狃拉削血；月亮伊布或路卡利歐補刀；黏美龍可硬扛。', [
      pm('冰伊布', ['ice']),
      pm('月亮伊布', ['dark']),
      pm('黏美龍', ['dragon', 'steel']),
      pm('烈咬陸鯊', ['dragon', 'ground']),
      pm('路卡利歐', ['fighting', 'steel']),
      pm('帕路奇亞', ['water', 'dragon']),
    ]),
  ],
};
assertBattle(giratinaAltered);

export const arceusChampion = {
  role: 'champion',
  name: '阿爾宙斯',
  location: '神奧神殿',
  specialty: 'normal',
  notes: '捕捉所有必要寶可夢後，於神奧神殿吹奏天界之笛觸發。謝米、達克萊伊（外部連動）非必要；瑪納霏／霏歐納支線通常需完成。戰鬥後可捕捉，建議先存檔。',
  party: [pm('阿爾宙斯', ['normal'], 80)],
  recommendedTeams: [
    rec('捕捉專用', '阿爾宙斯無屬性弱點極少，以高級球、沉重球背刺捕捉；可先削血再丟球。', [
      pm('黏美龍', ['dragon', 'steel']),
      pm('路卡利歐', ['fighting', 'steel']),
      pm('烈咬陸鯊', ['dragon', 'ground']),
      pm('帕路奇亞', ['water', 'dragon']),
      pm('帝牙盧卡', ['steel', 'dragon']),
      pm('冰伊布', ['ice']),
    ]),
  ],
};
assertBattle(arceusChampion);

export const legendsArceusLeague = {
  intro:
    '破關後與望羅尋找石板，於神奧神殿連續對戰望羅與騎拉帝納兩型態。'
    + '取得最後石板後，捕捉所有必要寶可夢，吹奏天界之笛挑戰阿爾宙斯。',
  coverageTitle: '破關後必備攻擊面',
  teamBlockTitle: '建議攜帶隊伍（6 隻一次帶入打完全程）',
  coverage: [
    cov('ice', '冰', '打騎拉帝納龍系'),
    cov('dark', '惡', '打騎拉帝納幽靈'),
    cov('fairy', '妖精', '打龍系補刀'),
    cov('fighting', '格鬥', '打一般／岩石'),
    cov('steel', '鋼', '望羅隊伍抗性'),
    cov('dragon', '龍', '望羅龍系對拼'),
  ],
  recommendedTeams: [
    rec(
      '穩定破關後隊',
      'Lv.70～75 較穩；Lv.80 更輕鬆。黏美龍拖戰、烈咬陸鯊輸出、冰伊布專打騎拉帝納，月亮伊布補惡系。',
      [
        pm('烈咬陸鯊', ['dragon', 'ground']),
        pm('黏美龍', ['dragon', 'steel']),
        pm('路卡利歐', ['fighting', 'steel']),
        pm('冰伊布', ['ice']),
        pm('月亮伊布', ['dark']),
        pm('帕路奇亞', ['water', 'dragon']),
      ],
    ),
    rec(
      '高穩定續戰',
      '帝牙盧卡／帕路奇亞抗性好；洗翠黏美龍極硬；不要把主力全耗在望羅前半。',
      [
        pm('黏美龍', ['dragon', 'steel']),
        pm('帝牙盧卡', ['steel', 'dragon']),
        pm('帕路奇亞', ['water', 'dragon']),
        pm('冰伊布', ['ice']),
        pm('路卡利歐', ['fighting', 'steel']),
        pm('烈咬陸鯊', ['dragon', 'ground']),
      ],
    ),
  ],
  battleOrder: [
    { battle: '望羅', leads: '烈咬陸鯊、路卡利歐', backup: '黏美龍' },
    { battle: '騎拉帝納（起源）', leads: '冰伊布、月亮伊布', backup: '黏美龍' },
    { battle: '騎拉帝納（別種）', leads: '冰伊布、路卡利歐', backup: '帕路奇亞' },
  ],
  items: [
    supply('全復藥', '20+', '連戰必備'),
    supply('活力塊', '10+', '望羅戰續戰'),
    supply('好壞補藥', '10+', '長戰消耗'),
  ],
  pitfalls: [
    '望羅前半耗光冰系主力，後面騎拉帝納會很痛苦。',
    '隊伍等級不足 65 時建議先回各區刷圖鑑練等。',
    '阿爾宙斯需先完成必要圖鑑，不是破關就能直接挑戰。',
  ],
  conclusion: '破關後先穩定通過望羅＋騎拉帝納，再收集必要寶可夢與石板，最後吹奏天界之笛迎戰阿爾宙斯。',
  battles: {
    'eliteFour:1': {
      intro: '神奧神殿首戰為望羅；神奧冠軍級混合隊伍，打完緊接騎拉帝納兩型態，續戰能力很重要。',
      tips: [
        '望羅隊伍種族值高，先制與速度很重要；烈咬陸鯊燕返或龍爪穩定輸出。',
        '黏美龍可換上吸收望羅的特攻招式。',
        '別在前半耗光冰系主力；帕路奇亞、帝牙盧卡抗性佳可輪換扛傷。',
      ],
      matchups: [
        mup('烈咬陸鯊', '冰伊布／妖精系'),
        mup('路卡利歐', '地面系／火系'),
        mup('黏美龍', '格鬥系／地面系'),
        mup('帝牙盧卡', '格鬥／地面／火'),
        mup('帕路奇亞', '草／電'),
        mup('美納斯', '電／草'),
      ],
    },
    'eliteFour:2': {
      intro: '望羅戰後立即對戰騎拉帝納（起源型態）；幽靈／龍系，冰、惡、妖精為核心剋制。',
      tips: [
        '起源型態攻高，冰系優先；冰伊布冰凍光束穩定削血。',
        '別讓主力全倒；月亮伊布惡系補刀幽靈屬性。',
        '戰前用全復藥與活力塊補滿；別種型態緊接而來無休整。',
      ],
      matchups: [
        mup('騎拉帝納', '冰伊布／月亮伊布／妖精系'),
      ],
    },
    'eliteFour:3': {
      intro: '緊接起源型態的第二戰為騎拉帝納（別種型態）；弱點相同，沿用冰／惡／妖精打點。',
      tips: [
        '別種型態同弱點，沿用冰／惡／妖精打點。',
        '瑪狃拉或冰伊布專打龍系；黏美龍可硬扛拖回合。',
        '全隊 HP 與 PP 可能已偏低，活力塊與全復藥必帶。',
      ],
      matchups: [
        mup('騎拉帝納', '冰伊布／瑪狃拉／月亮伊布'),
      ],
    },
    champion: {
      intro: '完成必要圖鑑後吹奏天界之笛挑戰阿爾宙斯；一般系無明顯弱點，以捕捉為主而非秒殺。',
      tips: [
        '必要圖鑑完成後再來；捕捉戰建議存檔。',
        '外部連動寶可夢（謝米、達克萊伊）非見阿爾宙斯必要條件。',
        '先削血再丟高級球或沉重球；別用一招流把捕捉機會浪費掉。',
      ],
      matchups: [
        mup('阿爾宙斯', '任意削血後高級球／沉重球捕捉'),
      ],
    },
  },
};
assertLeague(legendsArceusLeague);

export const legendsArceusEliteFour = [volo, giratinaOrigin, giratinaAltered];
