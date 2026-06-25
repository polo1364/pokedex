export const metaPrerequisites = [
  {
    title: '委託範圍',
    variant: 'requests',
    rows: [
      { label: '本體一般委託', value: '1～88' },
      { label: '本體破關後／傳說委託', value: '89～94' },
      { label: '洗翠黎明／Daybreak 追加', value: '95～122' },
    ],
  },
];

export const metaSectionsBefore = [
  {
    type: 'teams',
    title: '建議先準備的道具',
    groups: [
      {
        title: '捕捉與戰鬥',
        members: [
          { name: '高級球／飛羽球／巨重球', reason: '大量捕捉用' },
          { name: '煙霧彈', reason: '接近警戒型寶可夢' },
          { name: '黏丸', reason: '對付會攻擊你的寶可夢' },
          { name: '活力碎片／滿補藥', reason: '頭目、訓練家戰' },
        ],
      },
      {
        title: '任務與特殊進化',
        members: [
          { name: '橙橙果、蔓莓果、旺旺穀', reason: '餵食、任務、大量大發生' },
          { name: '各類進化道具', reason: '後期委託會用到' },
          { name: '泥炭塊、黑奇石、銳利之爪等', reason: '特殊進化用' },
        ],
      },
    ],
  },
];

export const metaSectionsAfter = [
  {
    type: 'faq',
    title: '最容易卡住的委託整理',
    items: [
      { problem: '4 大泳圈鼬', solution: '身高不夠 → 抓頭目或大量抓' },
      { problem: '17 櫻花寶', solution: '找不到 → 撞特定會晃的樹' },
      { problem: '22 幽火', solution: '漏收集 → 分地圖夜晚逐區清' },
      { problem: '57 三種蜂蜜', solution: '特定地區三蜜蜂難找 → 到指定地點撞樹' },
      { problem: '66 海之傳說', solution: '謎語難懂 → 帶小球飛魚、浮潛鼬、萬針魚，傍晚過海門' },
      { problem: '67 皮皮舞蹈', solution: '月相不對 → 睡覺刷滿月' },
      { problem: '73 結草兒', solution: '形態不齊 → 不同地區撞樹' },
      { problem: '83 阿羅拉六尾', solution: '找不到全部 → 純白凍土逐點找' },
      { problem: '94 化身們', solution: '天氣、捕捉難 → 等天氣，用煙霧彈＋黏丸' },
      { problem: '95～102 大大大量', solution: '不知道種類 → 餵小卡比獸旺旺穀' },
      { problem: '108～122 單隻之道', solution: '指定寶可夢太弱 → 練等＋奮鬥值拉滿' },
    ],
  },
  {
    type: 'checklist',
    title: '建議完成順序（主線中）',
    vertical: true,
    steps: [
      '【高】營地設立類委託',
      '【高】商店擴充類委託',
      '【高】農場擴充類委託',
      '【中】服飾／髮型類委託',
      '【中】圖鑑研究類委託',
      '【低】收集幽火，可慢慢做',
    ],
  },
  {
    type: 'checklist',
    title: '建議完成順序（破關後）',
    vertical: true,
    steps: [
      '先完成營地、商店、農場擴充',
      '補圖鑑與特殊進化',
      '完成 66 海之傳說',
      '完成 89～94 傳說委託',
      '完成 95～102 洗翠黎明大量大發生',
      '完成 106、107 剛石／珠貝',
      '最後挑戰 108～122 單隻寶可夢之道',
    ],
  },
  {
    type: 'conclusion',
    title: '總結懶人版',
    body: '先推主線到解鎖所有騎乘；每張地圖優先解營地委託；商店、農場、髮型、服飾委託順手做；圖鑑型委託集中在後期補；幽火、三蜜蜂、櫻花寶、結草兒放到最後慢慢查缺；破關後先抓傳說，再做洗翠黎明；最後才打 108～122 單隻寶可夢之道。最麻煩的不是打王也不是抓神獸，而是那些「找一隻剛好符合條件的寶可夢」的委託。洗翠地區表面是調查寶可夢，實際是大型行政外勤。',
  },
];
