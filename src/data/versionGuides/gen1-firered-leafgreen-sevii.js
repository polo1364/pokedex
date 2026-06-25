import { pm, rec, assertBattle } from './helpers.js';

const battleHypno = {
  order: 1,
  role: 'wild',
  name: '引夢貘人',
  location: '三之島／樹木果森林',
  notes: '劇情用野生等級30，比森林內一般引夢貘人（等級37～40）弱。打倒或捕捉皆可；完成後洛斯特爾會給你芭亞果。',
  party: [pm('引夢貘人', ['psychic'], 30)],
  recommendedTeams: [
    rec('惡系剋制隊', '惡系對超能力效果絕佳；大嘴蝠、阿柏怪或進化後御三家配合，等級 28 以上即可穩定突破。', [
      pm('大嘴蝠', ['poison', 'flying']),
      pm('阿柏怪', ['poison']),
      pm('火恐龍', ['fire']),
      pm('比雕', ['normal', 'flying']),
      pm('隆隆岩', ['rock', 'ground']),
    ]),
    rec('高速輸出隊', '比雕或雷電獸以先制或電系招式壓制；注意引夢貘人催眠與幻象光線。', [
      pm('比雕', ['normal', 'flying']),
      pm('雷電獸', ['electric']),
      pm('耿鬼', ['ghost', 'poison']),
      pm('火爆猴', ['fighting']),
      pm('水箭龜', ['water']),
    ]),
  ],
};
assertBattle(battleHypno);

const battleMoltres = {
  order: 2,
  role: 'legendary',
  name: '火焰鳥',
  location: '一之島／火焰山頂',
  notes: '夏伯後即可挑戰，與破關後紅寶石任務無關。需衝浪、怪力推石。僅一次遭遇，建議先存檔 → 削血 → 睡眠或麻痺 → 丟球；帶 30 顆以上高級球。閃焰衝特性寶可夢可完全免疫火系傷害。',
  party: [pm('火焰鳥', ['fire', 'flying'], 50)],
  recommendedTeams: [
    rec('捕捉專用隊', '雷電獸或閃電鳥以電系削血；拉普拉斯或水箭龜補刀。帶一隻閃焰衝（如九尾、風速狗）當肉盾。', [
      pm('雷電獸', ['electric']),
      pm('拉普拉斯', ['water', 'ice']),
      pm('九尾', ['fire']),
      pm('比雕', ['normal', 'flying']),
      pm('隆隆岩', ['rock', 'ground']),
      pm('卡比獸', ['normal']),
    ]),
    rec('穩定捕捉隊', '催眠或麻痺後換上閃焰衝坦克拖延；水箭龜以水系招式控血。', [
      pm('水箭龜', ['water']),
      pm('風速狗', ['fire']),
      pm('耿鬼', ['ghost', 'poison']),
      pm('比雕', ['normal', 'flying']),
      pm('雷電獸', ['electric']),
    ]),
  ],
};
assertBattle(battleMoltres);

const battleRocketEmber1 = {
  order: 3,
  role: 'trainer',
  name: '火箭隊手下',
  location: '一之島／火焰山（紅寶石洞穴入口）',
  party: [
    pm('卡拉卡拉', ['ground'], 37),
    pm('嘎啦嘎啦', ['ground'], 37),
  ],
  recommendedTeams: [
    rec('水草雙剋隊', '水招打地面效果絕佳；草系亦可穩定輸出。', [
      pm('水箭龜', ['water']),
      pm('妙蛙花', ['grass', 'poison']),
      pm('拉普拉斯', ['water', 'ice']),
      pm('比雕', ['normal', 'flying']),
      pm('雷電獸', ['electric']),
    ]),
    rec('草系速攻隊', '妙蛙花或派拉斯特以草系招式快速突破雙地面。', [
      pm('妙蛙花', ['grass', 'poison']),
      pm('派拉斯特', ['bug', 'grass']),
      pm('火爆猴', ['fighting']),
      pm('比雕', ['normal', 'flying']),
      pm('耿鬼', ['ghost', 'poison']),
    ]),
  ],
};
assertBattle(battleRocketEmber1);

const battleRocketEmber2 = {
  order: 4,
  role: 'trainer',
  name: '火箭隊手下',
  location: '一之島／火焰山（紅寶石洞穴入口）',
  party: [
    pm('小拉達', ['normal'], 35),
    pm('拉達', ['normal'], 35),
    pm('穿山鼠', ['ground'], 35),
    pm('穿山王', ['ground'], 35),
  ],
  recommendedTeams: [
    rec('格鬥地面隊', '格鬥系打一般；水系打穿山王與穿山鼠。', [
      pm('火爆猴', ['fighting']),
      pm('水箭龜', ['water']),
      pm('三地鼠', ['ground']),
      pm('比雕', ['normal', 'flying']),
      pm('雷電獸', ['electric']),
    ]),
    rec('泛用隊', '御三家進化後等級壓制；注意拉達速度。', [
      pm('水箭龜', ['water']),
      pm('火恐龍', ['fire']),
      pm('妙蛙花', ['grass', 'poison']),
      pm('比雕', ['normal', 'flying']),
      pm('隆隆岩', ['rock', 'ground']),
    ]),
  ],
};
assertBattle(battleRocketEmber2);

const battleRocketIcefall = {
  order: 5,
  role: 'trainer',
  name: '火箭隊手下',
  location: '四之島／冰凍瀑布洞窟',
  party: [
    pm('超音蝠', ['poison', 'flying'], 38),
    pm('超音蝠', ['poison', 'flying'], 38),
    pm('大嘴蝠', ['poison', 'flying'], 38),
  ],
  recommendedTeams: [
    rec('電冰雙剋隊', '電系打飛行；冰系亦可穩定突破。', [
      pm('雷電獸', ['electric']),
      pm('拉普拉斯', ['water', 'ice']),
      pm('比雕', ['normal', 'flying']),
      pm('水箭龜', ['water']),
      pm('火爆猴', ['fighting']),
    ]),
    rec('岩石電系隊', '隆隆岩扛毒系招式；雷電獸清場。', [
      pm('隆隆岩', ['rock', 'ground']),
      pm('雷電獸', ['electric']),
      pm('比雕', ['normal', 'flying']),
      pm('水箭龜', ['water']),
      pm('耿鬼', ['ghost', 'poison']),
    ]),
  ],
};
assertBattle(battleRocketIcefall);

const battleRocketAdminF = {
  order: 6,
  role: 'trainer',
  name: '火箭隊幹部♀',
  location: '五之島／火箭隊倉庫',
  party: [
    pm('臭臭泥', ['poison'], 52),
    pm('阿柏怪', ['poison'], 53),
    pm('霸王花', ['grass', 'poison'], 54),
  ],
  recommendedTeams: [
    rec('超能地面隊', '胡地或引夢貘人打毒系；地面系補刀霸王花。', [
      pm('胡地', ['psychic']),
      pm('三地鼠', ['ground']),
      pm('水箭龜', ['water']),
      pm('比雕', ['normal', 'flying']),
      pm('噴火龍', ['fire', 'flying']),
    ]),
    rec('火飛剋制隊', '火系打草；飛行系打霸王花與阿柏怪。', [
      pm('噴火龍', ['fire', 'flying']),
      pm('比雕', ['normal', 'flying']),
      pm('拉普拉斯', ['water', 'ice']),
      pm('胡地', ['psychic']),
      pm('尼多王', ['poison', 'ground']),
    ]),
  ],
};
assertBattle(battleRocketAdminF);

const battleRocketAdminM = {
  order: 7,
  role: 'trainer',
  name: '火箭隊幹部♂',
  location: '五之島／火箭隊倉庫',
  party: [
    pm('大嘴蝠', ['poison', 'flying'], 53),
    pm('雙彈瓦斯', ['poison'], 54),
    pm('黑魯加', ['dark', 'fire'], 55),
  ],
  recommendedTeams: [
    rec('地面電系隊', '地面打毒系；電系打飛行。黑魯加用地面或水系招式優先處理。', [
      pm('三地鼠', ['ground']),
      pm('尼多王', ['poison', 'ground']),
      pm('雷電獸', ['electric']),
      pm('水箭龜', ['water']),
      pm('胡地', ['psychic']),
    ]),
    rec('平衡隊', '拉普拉斯扛火系；雷電獸與三地鼠輪替輸出。', [
      pm('拉普拉斯', ['water', 'ice']),
      pm('雷電獸', ['electric']),
      pm('三地鼠', ['ground']),
      pm('比雕', ['normal', 'flying']),
      pm('胡地', ['psychic']),
    ]),
  ],
};
assertBattle(battleRocketAdminM);

const battleGideon = {
  order: 8,
  role: 'trainer',
  name: '研究員吉丁',
  location: '五之島／火箭隊倉庫',
  notes: '點之穴僅搶走藍寶石不對戰；此戰在倉庫奪回藍寶石。注意頑皮雷彈與霹靂電球自爆、污泥炸彈。',
  party: [
    pm('霹靂電球', ['electric'], 46),
    pm('頑皮雷彈', ['electric'], 46),
    pm('小磁怪', ['electric', 'steel'], 46),
    pm('三合一磁怪', ['electric', 'steel'], 46),
    pm('多邊獸', ['normal'], 46),
  ],
  recommendedTeams: [
    rec('地面火系隊', '地面系免疫電系並剋電屬；火系打鋼磁怪。', [
      pm('三地鼠', ['ground']),
      pm('尼多王', ['poison', 'ground']),
      pm('噴火龍', ['fire', 'flying']),
      pm('火爆猴', ['fighting']),
      pm('拉普拉斯', ['water', 'ice']),
    ]),
    rec('格鬥地面隊', '格鬥打一般多邊獸；地面清電系。優先處理頑皮雷彈。', [
      pm('三地鼠', ['ground']),
      pm('火爆猴', ['fighting']),
      pm('水箭龜', ['water']),
      pm('胡地', ['psychic']),
      pm('比雕', ['normal', 'flying']),
    ]),
  ],
};
assertBattle(battleGideon);

export const seviiExpansion = {
  id: 'sevii',
  title: '七之島',
  tabLabel: '七之島',
  battleSectionTitle: '重要戰鬥',

  prerequisites: [
    {
      variant: 'tri',
      title: '第一次開放：一之島～三之島',
      rows: [
        { label: '進度', value: '打敗紅蓮島道館館長夏伯' },
        { label: '觸發人物', value: '比爾' },
        { label: '通行證', value: '三島通行證' },
        { label: '可去島嶼', value: '一、二、三之島' },
      ],
    },
    {
      variant: 'rainbow',
      title: '破關後開放：四之島～七之島',
      rows: [
        { label: '進度', value: '第一次打敗四天王＋冠軍' },
        { label: '圖鑑', value: '回關都找大木博士取得全國圖鑑（捕獲數達標）' },
        { label: '通行證', value: '彩虹通行證（交還紅寶石後取得）' },
        { label: '可去島嶼', value: '一～七之島' },
      ],
    },
  ],

  hms: [
    { name: '衝浪', importance: '必帶', usage: '多數島嶼、水路、洞穴探索' },
    { name: '怪力', importance: '必帶', usage: '火焰山頂（火焰鳥／紅寶石洞穴推石）、七之島遺跡鑰匙洞窟' },
    { name: '居合斬', importance: '必帶', usage: '六之島點之穴入口' },
    { name: '瀑布', importance: '破關後必帶', usage: '四之島冰凍瀑布洞窟（取得秘傳機器07後立刻使用）' },
    { name: '飛天', importance: '建議', usage: '回關都補給' },
    { name: '岩石粉碎', importance: '建議', usage: '火焰山部分捷徑、撿道具' },
  ],

  sections: [
    {
      type: 'island',
      number: 1,
      title: '一之島攻略',
      intro: '七之島支線中樞；寶可夢網路中心與西雷所在地。北有燧石路、火焰山，南有財寶海灘。',
      places: [
        { name: '寶可夢網路中心', content: '西雷所在地，後期紅寶石／藍寶石任務核心' },
        { name: '財寶海灘', content: '南邊海灘，可撿會再生的星之沙、大珍珠等' },
        { name: '燧石路／溫泉', content: '通往火焰山；溫泉可恢復寶可夢，部分版本可學岩石粉碎' },
        { name: '火焰山', content: '火焰鳥所在地；破關後火箭隊出現，洞穴內有紅寶石' },
      ],
      flows: [
        '打敗夏伯後，跟比爾到一之島',
        '進入寶可夢網路中心，與西雷對話，取得三島通行證',
        '前往二之島找人，再前往三之島救洛斯特爾',
      ],
      tips: ['火焰鳥建議等級50以上隊伍、多帶高級球與狀態招式', '破關後紅寶石任務需怪力進入洞穴'],
    },
    {
      type: 'island',
      number: 2,
      title: '二之島攻略',
      intro: '第一次到一～三島時的中繼站，主線為洛斯特爾失蹤線索。',
      places: [
        { name: '遊戲角落', content: '洛斯特爾父親在附近；交還隕石碎片可得月之石，解鎖迷你遊戲' },
        { name: '海角峭壁', content: '北側招式教學：妙蛙花（瘋狂植物）、噴火龍（爆炸烈焰）、水箭龜（加農水砲）' },
      ],
      flows: [
        '從一之島搭船到二之島',
        '到遊戲角落找洛斯特爾的爸爸',
        '得知洛斯特爾往三之島方向失蹤後，前往三之島',
      ],
      tips: ['究極招式使用後硬直一回合，適合收尾'],
    },
    {
      type: 'island',
      number: 3,
      title: '三之島攻略',
      intro: '第一次七之島支線重點；需先處理飆車族，再進樹木果森林救洛斯特爾。',
      places: [
        { name: '絆橋', content: '西側通往樹木果森林' },
        { name: '樹木果森林', content: '多種樹果可再生採集；深處有引夢貘人事件' },
      ],
      flows: [
        '到三之島，擊退飆車族',
        '經絆橋進入樹木果森林',
        '森林西北角找到洛斯特爾，打倒引夢貘人',
        '回二之島找父親，再回一之島找比爾與西雷，返回關都繼續主線',
      ],
      tips: ['森林易繞路但無複雜機關', '救完洛斯特爾會自動傳回二之島'],
    },
    {
      type: 'island',
      number: 4,
      title: '四之島攻略',
      intro: '破關後第二階段起點；科拿故鄉，冰凍瀑布洞窟為重點。',
      places: [
        { name: '四之島鎮', content: '科拿故鄉；培育屋可生蛋' },
        { name: '冰凍瀑布洞窟', content: '取得秘傳機器07（瀑布）、協助科拿擊退火箭隊' },
      ],
      flows: [
        '進入右上冰凍瀑布洞窟，注意踩兩次會破的冰地板',
        '地下層取得瀑布，教會寶可夢後爬上洞內瀑布',
        '深處協助科拿打敗火箭隊手下',
      ],
      tips: ['野生小海獅、白海獅等；瀑布取得後立刻使用'],
    },
    {
      type: 'island',
      number: 5,
      title: '五之島攻略',
      intro: '火箭隊倉庫所在地，藍寶石任務收尾地點。',
      places: [
        { name: '五之島草原', content: '火箭隊倉庫入口，需兩組密碼' },
        { name: '火箭隊倉庫', content: '打倒幹部與吉丁，取回藍寶石' },
        { name: '迷宮洞窟／度假區等', content: '迷宮洞窟、紀念石柱等支線探索' },
      ],
      flows: [
        '取得兩組密碼後進入倉庫（旋轉地板謎題）',
        '擊敗倉庫內火箭隊與吉丁，拿回藍寶石',
        '回一之島交給西雷',
      ],
      tips: ['倉庫內另有 3 場雜兵戰，建議帶超能力、地面、水系覆蓋', '密碼一：角金魚需要樹幹；密碼二：是的、不、吉利蛋'],
    },
    {
      type: 'island',
      number: 6,
      title: '六之島攻略',
      intro: '藍寶石任務核心；廢墟山谷與點之穴。',
      places: [
        { name: '廢墟山谷', content: '點之穴入口；需先完成四之島科拿事件，吉丁才會讓路' },
        { name: '點之穴', content: '居合斬開門；洞內順序：上→左→右→下' },
        { name: '水路一帶', content: '圖案叢林、綠色小徑、變化洞窟等探索區' },
      ],
      flows: [
        '完成四之島冰凍瀑布洞窟事件',
        '到廢墟山谷，門前使用居合斬',
        '依序跳洞取得藍寶石（吉丁搶走並給第二密碼）',
        '前往五之島火箭隊倉庫',
      ],
      tips: ['點之穴吉丁不對戰，僅在倉庫對戰'],
    },
    {
      type: 'island',
      number: 7,
      title: '七之島攻略',
      intro: '後期探索、練功與未知圖騰；主線壓力較五、六島輕。',
      places: [
        { name: '訓練家之塔', content: '對戰塔型設施（本攻略不列逐層戰鬥）' },
        { name: '七島峽谷', content: '練功好地方；對戰搜尋器可反覆挑戰訓練家' },
        { name: '遺跡鑰匙洞窟', content: '怪力推石頭解謎，解鎖未知圖騰遺跡' },
        { name: '遺跡洞窟', content: '捕捉未知圖騰' },
      ],
      flows: [
        '到七島峽谷找到遺跡鑰匙洞窟',
        '怪力推石頭進指定坑洞，觸發地震感',
        '前往遺跡洞窟捕捉未知圖騰',
      ],
      tips: ['帶幸運蛋與學習裝置練等', '附近的路人可恢復隊伍'],
    },
    {
      type: 'summary',
      title: '各島攻略總表',
      rows: [
        { island: '一之島', priority: '很高', task: '西雷、火焰山、紅寶石、火焰鳥', hms: '衝浪、怪力、岩碎' },
        { island: '二之島', priority: '中', task: '洛斯特爾線索、究極招式', hms: '—' },
        { island: '三之島', priority: '高', task: '飆車族、救洛斯特爾', hms: '衝浪' },
        { island: '四之島', priority: '很高', task: '冰瀑洞窟、瀑布、科拿', hms: '衝浪' },
        { island: '五之島', priority: '很高', task: '火箭隊倉庫、藍寶石', hms: '衝浪' },
        { island: '六之島', priority: '很高', task: '點之穴、藍寶石被搶', hms: '居合斬、衝浪' },
        { island: '七之島', priority: '中～高', task: '遺跡洞窟、未知圖騰、練功', hms: '怪力、衝浪' },
      ],
    },
    {
      type: 'checklist',
      title: '紅寶石／藍寶石任務總流程',
      vertical: false,
      steps: [
        { step: '1', location: '一之島', goal: '找西雷接任務' },
        { step: '2', location: '火焰山', goal: '擊退火箭隊，拿紅寶石' },
        { step: '3', location: '一之島', goal: '把紅寶石交給西雷' },
        { step: '4', location: '四之島', goal: '冰凍瀑布洞窟拿秘傳機器07（瀑布）' },
        { step: '5', location: '四之島', goal: '幫科拿擊退火箭隊' },
        { step: '6', location: '六之島', goal: '點之穴找藍寶石' },
        { step: '7', location: '六之島', goal: '藍寶石被吉丁搶走，得第二密碼' },
        { step: '8', location: '五之島', goal: '進火箭隊倉庫' },
        { step: '9', location: '五之島', goal: '打敗火箭隊與吉丁，拿回藍寶石' },
        { step: '10', location: '一之島', goal: '交藍寶石給西雷，完成網路機器' },
      ],
    },
    {
      type: 'checklist',
      title: '主線最短完成路線',
      vertical: true,
      steps: [
        '破關聯盟',
        '取得全國圖鑑（回關都找大木博士）',
        '一之島找西雷',
        '火焰山打火箭隊，拿紅寶石',
        '回一之島交紅寶石',
        '四之島冰瀑洞窟拿瀑布',
        '幫科拿打火箭隊',
        '六之島點之穴，居合斬開門',
        '洞內順序：上 → 左 → 右 → 下',
        '藍寶石被吉丁搶走，取得第二密碼',
        '五之島火箭隊倉庫',
        '打敗火箭隊與吉丁，拿回藍寶石',
        '回一之島交給西雷，完成七之島主線',
      ],
    },
    {
      type: 'teams',
      title: '推薦隊伍配置',
      groups: [
        {
          title: '穩定隊伍',
          members: [
            { name: '拉普拉斯', reason: '衝浪、冰系輸出、耐久高' },
            { name: '雷電獸／閃電鳥', reason: '打水系、飛行系' },
            { name: '胡地／引夢貘人', reason: '打火箭隊毒系、格鬥系' },
            { name: '尼多王／尼多后', reason: '地面、毒、格鬥覆蓋面好' },
            { name: '噴火龍／風速狗', reason: '打草、蟲、冰' },
            { name: '怪力工具位', reason: '學衝浪／居合斬／怪力／瀑布等秘傳招式' },
          ],
        },
        {
          title: '不交換平民隊',
          members: [
            { name: '拉普拉斯', reason: '劇情可得，七之島超泛用' },
            { name: '雷電獸', reason: '伊布進化即可，電系穩定' },
            { name: '引夢貘人', reason: '不用交換的超能力系' },
            { name: '尼多王／尼多后', reason: '技能機相容性高' },
            { name: '卡比獸', reason: '坦、能打、可學多種招式' },
            { name: '御三家', reason: '補隊伍缺口' },
          ],
        },
      ],
    },
    {
      type: 'faq',
      title: '容易卡住的點',
      items: [
        { problem: '不能去四～七島', solution: '先破關、取得全國圖鑑，再找西雷' },
        { problem: '火箭隊倉庫進不去', solution: '少一組密碼；先去六之島點之穴' },
        { problem: '點之穴門打不開', solution: '站在門前使用居合斬' },
        { problem: '點之穴吉丁不讓路', solution: '先完成四之島冰凍瀑布洞窟科拿事件' },
        { problem: '找不到瀑布', solution: '在四之島冰凍瀑布洞窟內拿秘傳機器07' },
        { problem: '找不到未知圖騰', solution: '先完成七之島遺跡鑰匙洞窟推石頭謎題' },
        { problem: '火焰鳥沒抓到', solution: '讀檔重來；傳說鳥不要手滑打死' },
        { problem: '密碼輸入錯誤', solution: '第一組：角金魚需要樹幹；第二組：是的、不、吉利蛋' },
      ],
    },
    {
      type: 'conclusion',
      title: '最重要結論',
      body: '七之島真正主線：一之島接任務 → 火焰山拿紅寶石 → 四之島救科拿 → 六之島找藍寶石 → 五之島打火箭隊倉庫 → 回一之島修好機器。完成後尚有火焰鳥、未知圖騰、培育屋、練功與補圖鑑等價值。',
    },
  ],

  gyms: [
    battleHypno,
    battleMoltres,
    battleRocketEmber1,
    battleRocketEmber2,
    battleRocketIcefall,
    battleRocketAdminF,
    battleRocketAdminM,
    battleGideon,
  ],
};
