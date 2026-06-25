import { pm, rec, assertBattle } from './helpers.js';
import {
  legendsArceusLeague,
  legendsArceusEliteFour,
  arceusChampion,
} from './gen8-legends-arceus-league.js';
import { daybreakExpansion } from './gen8-legends-arceus-daybreak.js';
import { requestsExpansion } from './legends-arceus-requests/index.js';

const nobleKleavor = {
  order: 1,
  role: 'noble',
  name: '森林王 劈斧螳螂',
  location: '黑曜原野／巨木戰場',
  specialty: 'bug',
  notes: '動作閃避＋丟鎮寶削槽。觀察衝刺，等撞樹硬直再投鎮寶；有空檔時派寶可夢戰鬥可大幅削減鎮撫槽。弱點：水、岩石、鋼。',
  party: [pm('劈斧螳螂', ['bug', 'rock'], 30)],
  recommendedTeams: [
    rec('水系剋制', '泳圈鼬／浮潛鼬水系打岩石；小貓怪電系泛用。', [
      pm('泳圈鼬', ['water']),
      pm('小貓怪', ['electric']),
      pm('小火馬', ['fire']),
    ]),
  ],
};
assertBattle(nobleKleavor);

const nobleLilligant = {
  order: 2,
  role: 'noble',
  name: '峭壁女王 裙兒小姐',
  location: '紅蓮濕地',
  specialty: 'grass',
  notes: '草／格鬥；弱飛行四倍、火、冰、毒、超能、妖精。不要貪丟鎮寶，等跳起落地硬直再投；戰鬥用飛行或火系。',
  party: [pm('裙兒小姐', ['grass', 'fighting'], 35)],
  recommendedTeams: [
    rec('飛行四倍', '姆克鳥／姆克鷹飛行系四倍剋制；火暴獸／小火馬火系剋草。', [
      pm('姆克兒', ['normal', 'flying']),
      pm('火球鼠', ['fire']),
      pm('勇基拉', ['psychic']),
    ]),
  ],
};
assertBattle(nobleLilligant);

const nobleArcanine = {
  order: 3,
  role: 'noble',
  name: '島嶼王 風速狗',
  location: '群青海岸／熔岩戰場',
  specialty: 'fire',
  notes: '火／岩石；弱水、地面四倍。不要站在火焰區，衝刺硬直後投鎮寶；戰鬥用水系或地面系。',
  party: [pm('風速狗', ['fire', 'rock'], 40)],
  recommendedTeams: [
    rec('水地面雙剋', '海殼獸水／地面雙重剋制；浮潛鼬水系穩定。', [
      pm('海殼獸', ['water', 'ground']),
      pm('浮潛鼬', ['water']),
      pm('鑽角犀獸', ['ground']),
    ]),
  ],
};
assertBattle(nobleArcanine);

const nobleElectrode = {
  order: 4,
  role: 'noble',
  name: '山道王 頑皮雷彈',
  location: '天冠山麓／迎月戰場',
  specialty: 'electric',
  notes: '電／草；弱火、冰、毒、蟲。追蹤電球需持續移動；自爆後大空檔立刻投鎮寶或進戰鬥。',
  party: [pm('頑皮雷彈', ['electric', 'grass'], 45)],
  recommendedTeams: [
    rec('火冰剋草', '火暴獸／烈焰馬火系；冰系寶可夢剋草。', [
      pm('火暴獸', ['fire', 'ghost']),
      pm('毒骷蛙', ['poison', 'fighting']),
      pm('烈焰馬', ['fire']),
    ]),
  ],
};
assertBattle(nobleElectrode);

const nobleAvalugg = {
  order: 5,
  role: 'noble',
  name: '雪原王 冰岩怪',
  location: '純白凍土',
  specialty: 'ice',
  notes: '冰／岩石；弱格鬥、鋼四倍。學會冰球與雷射節奏，橫移躲掃射；累了再派寶可夢戰鬥。',
  party: [pm('冰岩怪', ['ice', 'rock'], 50)],
  recommendedTeams: [
    rec('格鬥鋼剋制', '路卡利歐格鬥／鋼皆有效；怪力格鬥四倍剋制。', [
      pm('路卡利歐', ['fighting', 'steel']),
      pm('怪力', ['fighting']),
      pm('巨鉗螳螂', ['bug', 'steel']),
    ]),
  ],
};
assertBattle(nobleAvalugg);

const dialga = {
  order: 1,
  role: 'legendary',
  name: '帝牙盧卡',
  location: '神奧神殿',
  specialty: 'steel',
  notes: '金剛隊路線先捕捉帝牙盧卡；珍珠隊則後期以特殊球取得。兩者最終都能取得，不必過度焦慮。',
  party: [pm('帝牙盧卡', ['steel', 'dragon'], 50)],
  recommendedTeams: [
    rec('剋鋼龍', '格鬥、地面、火系打鋼；地面系打點穩定。', [
      pm('海殼獸', ['water', 'ground']),
      pm('路卡利歐', ['fighting', 'steel']),
      pm('怪力', ['fighting']),
    ]),
  ],
};
assertBattle(dialga);

const palkia = {
  order: 2,
  role: 'legendary',
  name: '帕路奇亞',
  location: '神奧神殿',
  specialty: 'water',
  notes: '珍珠隊路線先捕捉帕路奇亞；金剛隊後期取得。時空裂縫事件後於三大湖取得紅色鎖鏈材料。',
  party: [pm('帕路奇亞', ['water', 'dragon'], 50)],
  recommendedTeams: [
    rec('剋水龍', '草系、電系打水系；路卡利歐格鬥補刀。', [
      pm('羅絲雷朵', ['grass', 'poison']),
      pm('小貓怪', ['electric']),
      pm('路卡利歐', ['fighting', 'steel']),
    ]),
  ],
};
assertBattle(palkia);

export const legendsArceusGuide = {
  id: 'legends-arceus',
  title: '寶可夢傳說 阿爾宙斯',
  mainPartLabel: '本篇',
  displayGeneration: 8,
  status: 'complete',
  notes: '本作目標為完成洗翠圖鑑、鎮撫王／女王寶可夢，最終與阿爾宙斯相遇。無道館與傳統聯盟，以五大原野調查與星級試驗推進主線。',
  gymSectionTitle: '主線傳說戰',
  nobleSequenceMode: 'suggested',
  leagueSectionTitle: '破關後連戰',
  usePrepLegend: true,
  legendHint: '移至標示詞可查看說明',

  prerequisites: [
    {
      title: '核心玩法與五大區域',
      variant: 'hisui',
      rows: [
        { label: '道館', value: '無；改為銀河隊星級試驗與王／女王鎮撫' },
        { label: '捕捉', value: '可直接野外投球，背襲成功率大幅提高' },
        { label: '圖鑑', value: '需完成研究課題，等級 10 即完成該頁' },
        { label: '戰鬥', value: '有迅疾／剛猛招式，行動順序較傳統作品更變動' },
        { label: '黑曜原野', value: '① 新手區、劈斧螳螂' },
        { label: '紅蓮濕地', value: '② 沼澤、月月熊、裙兒小姐' },
        { label: '群青海岸', value: '③ 海域、幽尾玄魚、風速狗' },
        { label: '天冠山麓', value: '④ 山地、大狃拉、頑皮雷彈' },
        { label: '純白凍土', value: '⑤ 雪原、勇士雄鷹、冰岩怪' },
      ],
    },
    {
      title: '御三家推薦',
      variant: 'hisui',
      rows: [
        { label: '水水獭', value: '最穩；前期水系好用，大劍鬼（水／惡）打點廣' },
        { label: '火球鼠', value: '泛用；火暴獸（火／幽靈）特攻輸出舒服' },
        { label: '木木梟', value: '稍吃操作；狙射樹梟（草／格鬥）打點特殊但弱點多' },
        { label: '建議', value: '順通關選水水獭或火球鼠；木木梟需較熟悉屬性剋制' },
      ],
    },
    {
      title: '圖鑑研究等級',
      variant: 'hisui',
      rows: [
        { label: '課題類型', value: '捕捉次數、擊倒、觀察招式、特定捕捉方式、進化、餵食等' },
        { label: '完成條件', value: '單頁研究等級 10 即算完成該寶可夢圖鑑' },
        { label: '見阿爾宙斯', value: '需捕捉所有必要寶可夢，非每隻都需完美研究' },
      ],
    },
    {
      title: '星級提升',
      variant: 'hisui',
      rows: [
        { label: '效果', value: '可指揮更高等級寶可夢、解鎖配方、推進主線' },
        { label: '優先抓新種', value: '新登錄給大量點數' },
        { label: '常回博士報告', value: '不要屯著不交報告' },
        { label: '頭目登錄', value: '不一定要打贏，能抓最好' },
      ],
    },
    {
      title: '捕捉技巧',
      variant: 'hisui',
      rows: [
        { label: '背襲', value: '從背後投球大幅提高成功率' },
        { label: '煙霧彈', value: '接近高警戒寶可夢' },
        { label: '黏丸', value: '讓寶可夢硬直，頭目戰必備' },
        { label: '推薦流程', value: '蹲下接近→煙霧彈→餌食→繞背→沉重球／高級球' },
      ],
    },
    {
      title: '迅疾與剛猛招式',
      variant: 'hisui',
      rows: [
        { label: '迅疾', value: '威力下降，但可能更快再行動' },
        { label: '剛猛', value: '威力上升，但可能讓對手更快行動' },
        { label: '收掉殘血', value: '用迅疾' },
        { label: '一擊必殺', value: '用剛猛' },
        { label: '王／女王戰', value: '不要亂剛猛以免被連打' },
      ],
    },
  ],

  hmSectionTitle: '騎乘與探索能力',
  hms: [
    { name: '月月熊', importance: '必帶', usage: '紅蓮濕地解鎖；可搜尋地下道具（泥炭塊等）' },
    { name: '幽尾玄魚', importance: '必帶', usage: '群青海岸解鎖；水上移動' },
    { name: '大狃拉', importance: '必帶', usage: '天冠山麓解鎖；攀爬峭壁' },
    { name: '勇士雄鷹', importance: '必帶', usage: '純白凍土解鎖；滑翔，探索效率大增' },
  ],

  sections: [
    {
      type: 'island',
      number: 1,
      title: '黑曜原野',
      intro: '第一個大型區域。加入銀河隊調查組、選御三家、學會捕捉與圖鑑研究後前往。避開早期頭目烈焰馬。',
      places: [
        { name: '原野基地', content: '初始營地' },
        { name: '蹄鐵草原', content: '初期練等；小貓怪、小火馬、泳圈鼬' },
        { name: '巨木戰場', content: '森林王劈斧螳螂鎮撫戰' },
        { name: '險林', content: '蟲、草、飛行系較多' },
      ],
      flows: [
        '祝慶村選御三家並完成基礎教學',
        '前往黑曜原野完成調查任務',
        '提升星級後挑戰劈斧螳螂',
      ],
      tips: ['先抓小貓怪、姆克兒、泳圈鼬', '頭目烈焰馬前期別硬碰'],
    },
    {
      type: 'island',
      number: 2,
      title: '紅蓮濕地',
      intro: '地形更複雜，等級提高。解鎖月月熊騎乘，可搜尋地下道具。',
      places: [
        { name: '緋紅沼', content: '毒、地面、水系多' },
        { name: '雲霧遺跡', content: '主線劇情地點' },
        { name: '試煉沙洲', content: '頭目與稀有寶可夢' },
      ],
      flows: ['解鎖紅蓮濕地', '取得月月熊', '鎮撫裙兒小姐'],
      tips: ['抓玫瑰苞、不良蛙', '用月月熊搜尋泥炭塊'],
    },
    {
      type: 'island',
      number: 3,
      title: '群青海岸',
      intro: '水域探索變重要，解鎖幽尾玄魚可在水上移動。',
      places: [
        { name: '銀杏沙灘', content: '初始區' },
        { name: '鬼枯原', content: '幽靈系相關' },
        { name: '熔岩戰場', content: '島嶼王風速狗' },
      ],
      flows: ['解鎖群青海岸', '取得幽尾玄魚', '鎮撫風速狗'],
      tips: ['抓卡蒂狗、野蠻鱸魚（幽尾玄魚進化）', '波加曼可在此捕捉'],
    },
    {
      type: 'island',
      number: 4,
      title: '天冠山麓',
      intro: '山區探索，解鎖大狃拉可攀爬峭壁。',
      places: [
        { name: '古代採石場', content: '主線地點' },
        { name: '迷幻洞窟', content: '洞穴探索' },
        { name: '迎月戰場', content: '山道王頑皮雷彈' },
      ],
      flows: ['解鎖天冠山麓', '取得大狃拉', '鎮撫頑皮雷彈'],
      tips: ['抓圓陸鯊、小磁怪、銅鏡怪', '時空歪曲常出稀有寶可夢'],
    },
    {
      type: 'island',
      number: 5,
      title: '純白凍土',
      intro: '最後大型區域，解鎖勇士雄鷹可滑翔。',
      places: [
        { name: '雪峰神殿', content: '主線與神柱相關' },
        { name: '心形岩山', content: '稀有寶可夢' },
        { name: '酷寒荒地', content: '頭目多' },
      ],
      flows: ['解鎖純白凍土', '取得勇士雄鷹', '鎮撫冰岩怪'],
      tips: ['抓狃拉、路卡利歐', '冰伊布可在冰岩塊進化'],
    },
    {
      type: 'island',
      number: 6,
      title: '神奧神殿與時空裂縫',
      intro: '鎮撫五王／女王後，依金剛隊或珍珠隊同行，捲入時空裂縫。三大湖取得紅色鎖鏈，於神殿處理帝牙盧卡與帕路奇亞。',
      places: [
        { name: '神奧神殿', content: '主線傳說戰與破關後事件' },
        { name: '三大湖', content: '鎖鏈材料與湖之三神' },
      ],
      flows: [
        '選擇金剛隊或珍珠隊（先遇對應傳說寶可夢）',
        '完成三大湖試煉',
        '神殿捕捉帝牙盧卡／帕路奇亞',
      ],
      tips: ['兩隻傳說最終都能取得', '破關後另見下方破關後總覽'],
    },
    {
      type: 'checklist',
      title: '破關後總覽',
      vertical: true,
      steps: [
        '收集石板（與傳說寶可夢相關）',
        '捕捉湖之三神、席多藍恩、雷吉奇卡斯等傳說',
        '與望羅合作尋找石板',
        '神奧神殿對戰望羅與騎拉帝納',
        '捕捉所有必要寶可夢',
        '吹奏天界之笛挑戰阿爾宙斯',
      ],
    },
    {
      type: 'checklist',
      title: '特殊進化條件',
      vertical: true,
      steps: [
        '幽尾玄魚：野蠻鱸魚累積反作用傷害且不瀕死進化',
        '大狃拉：洗翠狃拉白天持有銳利之爪進化（格鬥／毒）',
        '月月熊：圈圈熊滿月夜晚使用泥炭塊',
        '劈斧螳螂：飛天螳螂使用黑奇石',
        '洗翠黏美龍：黏美兒雨天達指定等級（鋼／龍）',
        '詭角鹿：驚角鹿使用一定次數迅疾屏障猛攻',
      ],
    },
    {
      type: 'checklist',
      title: '時空歪曲準備',
      vertical: true,
      steps: [
        '區域內等待歪曲出現（勿一直進出刷新）',
        '攜帶高級球、飛羽球、沉重球',
        '帶黏丸、煙霧彈、補藥',
        '留空背包格子',
        '可抓化石、御三家、進化道具與星星碎片',
      ],
    },
    {
      type: 'teams',
      title: '推薦通關隊伍',
      groups: [
        {
          title: '穩定通關隊',
          members: [
            { name: '御三家', reason: '主力輸出' },
            { name: '倫琴貓', reason: '電系，前後期皆可用' },
            { name: '姆克鷹', reason: '飛行打草／格鬥／蟲' },
            { name: '海殼獸', reason: '水系補位' },
            { name: '路卡利歐', reason: '格鬥／鋼，後期強' },
            { name: '黏美龍', reason: '後期耐久主力' },
          ],
        },
        {
          title: '破關後高穩定隊',
          members: [
            { name: '帝牙盧卡', reason: '鋼／龍抗性好' },
            { name: '帕路奇亞', reason: '水／龍輸出強' },
            { name: '烈咬陸鯊', reason: '速度物攻' },
            { name: '洗翠黏美龍', reason: '極硬，打望羅' },
            { name: '冰伊布', reason: '對付騎拉帝納' },
          ],
        },
      ],
    },
    {
      type: 'checklist',
      title: '各區探索順序',
      vertical: true,
      steps: [
        '黑曜：抓小貓怪、姆克兒、泳圈鼬→避開頭目烈焰馬→劈斧螳螂',
        '紅蓮：月月熊→抓玫瑰苞、不良蛙→裙兒小姐',
        '群青：幽尾玄魚→卡蒂狗、波加曼→風速狗',
        '天冠：大狃拉→圓陸鯊、小磁怪→頑皮雷彈',
        '純白：勇士雄鷹→路卡利歐、狃拉→冰岩怪→神殿主線',
      ],
    },
    {
      type: 'checklist',
      title: '道具優先製作',
      vertical: true,
      steps: [
        '精靈球／超級球／高級球',
        '飛羽球、沉重球系列',
        '煙霧彈、黏丸',
        '活力碎片、全復藥',
        '誘餌食物',
      ],
    },
    {
      type: 'faq',
      title: '容易卡關的地方',
      items: [
        { problem: '星級不夠', solution: '回舊區域補圖鑑研究、抓新種' },
        { problem: '王／女王打不過', solution: '先專心閃避，硬直再投鎮寶；不要貪丟' },
        { problem: '頭目抓不到', solution: '煙霧彈＋背刺＋高級球' },
        { problem: '望羅打不過', solution: '全隊 Lv.70 以上，帶冰／惡／妖精' },
        { problem: '找不到阿爾宙斯', solution: '先捕捉所有必要寶可夢' },
        { problem: '一般大量發生', solution: '破關前後即有；回村看地圖標記，前往該區捕捉（大大大量出現見洗翠黎明書籤）' },
        { problem: '時空歪曲不出', solution: '在區域內等待，勿一直進出刷新' },
        { problem: '錢不夠', solution: '賣星星碎片、刷時空歪曲' },
      ],
    },
    {
      type: 'checklist',
      title: '懶人通關路線',
      vertical: true,
      steps: [
        '選御三家（水水獭或火球鼠）',
        '黑曜補圖鑑→劈斧螳螂',
        '紅蓮月月熊→裙兒小姐',
        '群青幽尾玄魚→風速狗',
        '天冠大狃拉→頑皮雷彈',
        '純白勇士雄鷹→冰岩怪',
        '三大湖→神殿帝牙盧卡／帕路奇亞→破關',
        '石板→望羅＋騎拉帝納→必要圖鑑→阿爾宙斯',
      ],
    },
    {
      type: 'conclusion',
      title: '最重要結論',
      body: '本作核心不是「練一隊打到底」，而是大量捕捉、補圖鑑、解鎖騎乘、擴大探索，最後完成必要圖鑑見阿爾宙斯。順通關：水水獭或火球鼠開局，前期抓小貓怪、姆克兒、泳圈鼬，中期補海殼獸、黏黏寶，後期路卡利歐、烈咬陸鯊、洗翠黏美龍；破關後備冰／惡／妖精打騎拉帝納。',
    },
  ],

  nobles: [nobleKleavor, nobleLilligant, nobleArcanine, nobleElectrode, nobleAvalugg],
  gyms: [dialga, palkia],
  eliteFour: legendsArceusEliteFour,
  champion: arceusChampion,
  league: legendsArceusLeague,
  expansions: [daybreakExpansion, requestsExpansion],
};
