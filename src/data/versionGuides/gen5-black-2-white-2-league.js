import { pm, rec } from './helpers.js';

/**
 * 首次主線攻略；特殊再戰階段另行標示。
 * 校正來源：
 * https://www.serebii.net/black2white2/gyms.shtml
 * https://www.serebii.net/black2white2/elitefour.shtml
 */
export const black2White2League = {
  intro: "普通模式首次聯盟：四天王各四隻 Lv56～58，順序可自選，之後挑戰艾莉絲 Lv57～59。入場前備齊隊伍與補給；挑戰模式和通關後再戰使用不同隊伍／等級。",
  coverage: [
    {
      attackType: "dark",
      label: "惡",
      uses: "婉龍、嘉德麗雅",
    },
    {
      attackType: "psychic",
      label: "超能力",
      uses: "連武",
    },
    {
      attackType: "fighting",
      label: "格鬥",
      uses: "越橘、波士可多拉與拉普拉斯",
    },
    {
      attackType: "ice",
      label: "冰",
      uses: "艾莉絲的龍與始祖大鳥",
    },
    {
      attackType: "electric",
      label: "電",
      uses: "隨風球、始祖大鳥、拉普拉斯",
    },
  ],
  recommendedTeams: [
    rec("普通模式首次聯盟範例", "皆可在首次聯盟前培養，沒有交換進化要求。", [
      {
        name: "頭巾混混",
        types: ["dark", "fighting"],
        obtain: "4 號道路滑滑小子 Lv39。",
      },
      {
        name: "拉普拉斯",
        types: ["water", "ice"],
        obtain: "村莊橋水面漣漪。",
      },
      {
        name: "電龍",
        types: ["electric"],
        obtain: "算木牧場咩利羊 → 茸茸羊 → Lv30 電龍。",
      },
      {
        name: "達摩狒狒",
        types: ["fire"],
        obtain: "4 號道路火紅不倒翁 Lv35。",
      },
      {
        name: "象徵鳥",
        types: ["psychic", "flying"],
        obtain: "沙漠地帶。",
      },
      {
        name: "你的御三家",
        types: [],
        obtain: "開局的同一隻，持續培養。",
      },
    ]),
  ],
  battles: {
    "eliteFour:1": {
      intro: "婉龍使用死神棺、隨風球、泥偶巨人與水晶燈火靈。",
      tips: [
        "惡招可覆蓋全隊；隨風球飛行屬性免疫地面。",
        "隨風球的引爆可能傷害用接觸招擊倒它的隊員。",
      ],
      matchups: [
        {
          opponent: "死神棺",
          counters: "咬碎；注意木乃伊。",
        },
        {
          opponent: "隨風球",
          counters: "電／冰／岩石／惡招。",
        },
        {
          opponent: "泥偶巨人",
          counters: "水／冰／惡招。",
        },
        {
          opponent: "水晶燈火靈",
          counters: "水／地面／岩石／惡招。",
        },
      ],
    },
    "eliteFour:2": {
      intro: "連武四隻格鬥隊，準備飛行或超能力。",
      tips: [
        "飛行屬性不是免疫格鬥；一般／飛行的高傲雉雞甚至是一般效果。",
        "對手有岩石招；打擊鬼有結實，不能假定一擊擊倒。",
      ],
      matchups: [
        {
          opponent: "投摔鬼",
          counters: "超能力／飛行招；留意岩石補盲與打擊鬼的結實。",
        },
        {
          opponent: "打擊鬼",
          counters: "超能力／飛行招；留意岩石補盲與打擊鬼的結實。",
        },
        {
          opponent: "師父鼬",
          counters: "超能力／飛行招；留意岩石補盲與打擊鬼的結實。",
        },
        {
          opponent: "修建老匠",
          counters: "超能力／飛行招；留意岩石補盲與打擊鬼的結實。",
        },
      ],
    },
    "eliteFour:3": {
      intro: "越橘使用惡系；格鬥能有效覆蓋全隊。",
      tips: ["流氓鱷為地面／惡，並非水／地面。", "劈斬司令四倍弱格鬥。"],
      matchups: [
        {
          opponent: "頭巾混混",
          counters: "格鬥／飛行招。",
        },
        {
          opponent: "酷豹",
          counters: "格鬥／蟲招。",
        },
        {
          opponent: "流氓鱷",
          counters: "水／草／冰／格鬥招。",
        },
        {
          opponent: "劈斬司令",
          counters: "格鬥四倍；火或地面也有效。",
        },
      ],
    },
    "eliteFour:4": {
      intro: "嘉德麗雅使用四隻超能力寶可夢。",
      tips: [
        "惡系免疫超能力攻擊，但人造細胞卵有真氣彈，不能視為無風險。",
        "頭巾混混走物攻咬碎，不需使用低特攻的惡之波動。",
      ],
      matchups: [
        {
          opponent: "人造細胞卵",
          counters: "惡／幽靈招，留意真氣彈。",
        },
        {
          opponent: "夢夢蝕",
          counters: "惡／幽靈／蟲招。",
        },
        {
          opponent: "象徵鳥",
          counters: "電／冰／岩石／惡招。",
        },
        {
          opponent: "哥德小姐",
          counters: "惡／幽靈／蟲招。",
        },
      ],
    },
    champion: {
      intro: "艾莉絲是混合隊，冰、格鬥與電招分工。",
      tips: [
        "三首惡龍有漂浮，地面招無效。",
        "雙斧戰龍有氣勢披帶和龍之舞，滿血時可能撐住後強化。",
        "拉普拉斯有儲水，不用水招；波士可多拉四倍弱格鬥與地面。",
      ],
      matchups: [
        {
          opponent: "三首惡龍",
          counters: "冰／格鬥／蟲／龍；第五世代沒有妖精。",
        },
        {
          opponent: "赤面龍",
          counters: "冰／龍招。",
        },
        {
          opponent: "始祖大鳥",
          counters: "水／電／冰／岩石／鋼；削到半血以下觸發軟弱。",
        },
        {
          opponent: "波士可多拉",
          counters: "格鬥或地面四倍。",
        },
        {
          opponent: "拉普拉斯",
          counters: "電／草／格鬥／岩石；避免水招。",
        },
        {
          opponent: "雙斧戰龍",
          counters: "先處理氣勢披帶，再以冰或龍招收尾。",
        },
      ],
    },
  },
  battleOrder: [
    {
      battle: "婉龍",
      leads: "頭巾混混",
      backup: "拉普拉斯／電龍",
    },
    {
      battle: "連武",
      leads: "象徵鳥",
      backup: "保有足夠血量的主力",
    },
    {
      battle: "越橘",
      leads: "頭巾混混",
      backup: "達摩狒狒",
    },
    {
      battle: "嘉德麗雅",
      leads: "頭巾混混",
      backup: "電龍對象徵鳥",
    },
    {
      battle: "艾莉絲",
      leads: "拉普拉斯／頭巾混混",
      backup: "電龍",
    },
  ],
  starterLineups: [
    {
      starter: "暖暖豬",
      starterTypes: ["fire"],
      pokemon: [
        pm("炎武王", ["fire", "fighting"]),
        pm("頭巾混混", ["dark", "fighting"]),
        pm("拉普拉斯", ["water", "ice"]),
        pm("電龍", ["electric"]),
        pm("象徵鳥", ["psychic", "flying"]),
        pm("達摩狒狒", ["fire"]),
      ],
      summary: "炎武王補格鬥；如不需要第二火系，可沿用已培養的隊員替代達摩狒狒。",
    },
    {
      starter: "水水獺",
      starterTypes: ["water"],
      pokemon: [
        pm("大劍鬼", ["water"]),
        pm("頭巾混混", ["dark", "fighting"]),
        pm("拉普拉斯", ["water", "ice"]),
        pm("電龍", ["electric"]),
        pm("象徵鳥", ["psychic", "flying"]),
        pm("達摩狒狒", ["fire"]),
      ],
      summary: "拉普拉斯保留冰招職責；大劍鬼提供另一個水系攻擊手。",
    },
    {
      starter: "藤藤蛇",
      starterTypes: ["grass"],
      pokemon: [
        pm("君主蛇", ["grass"]),
        pm("頭巾混混", ["dark", "fighting"]),
        pm("拉普拉斯", ["water", "ice"]),
        pm("電龍", ["electric"]),
        pm("象徵鳥", ["psychic", "flying"]),
        pm("達摩狒狒", ["fire"]),
      ],
      summary: "君主蛇對拉普拉斯可用草招，龍系對手交給冰招手。",
    },
  ],
  moveSets: [
    {
      pokemon: "頭巾混混",
      role: "惡與格鬥物理輸出",
      moves: [
        {
          name: "咬碎",
          use: "打幽靈與超能力；注意反擊招式。",
          source: "level",
          sourceDetail: "滑滑小子／頭巾混混 Lv38",
          type: "dark",
        },
        {
          name: "劈瓦",
          use: "打惡、一般、岩石和鋼；不能打幽靈。",
          source: "level",
          sourceDetail: "滑滑小子 Lv20 習得後保留",
          type: "fighting",
        },
        {
          name: "岩崩",
          use: "補飛行、火、冰；並非必中。",
          source: "tm",
          sourceDetail: "TM80",
          type: "rock",
        },
        {
          name: "守住",
          use: "偵察招式；連續使用容易失敗。",
          source: "tm",
          sourceDetail: "TM17",
          type: "normal",
        },
      ],
    },
    {
      pokemon: "拉普拉斯",
      role: "水與冰特殊輸出",
      moves: [
        {
          name: "衝浪",
          use: "水系主力。",
          source: "hm",
          sourceDetail: "HM03",
          type: "water",
        },
        {
          name: "冰凍光束",
          use: "打龍、地面和飛行。",
          source: "level",
          sourceDetail: "Lv32",
          type: "ice",
        },
        {
          name: "泰山壓頂",
          use: "一般物理補刀；幽靈免疫。",
          source: "level",
          sourceDetail: "Lv18；錯過可找招式回憶。",
          type: "normal",
        },
        {
          name: "奇異之光",
          use: "混亂輔助，不能保證封鎖對手。",
          source: "level",
          sourceDetail: "Lv7；錯過可找招式回憶。",
          type: "ghost",
        },
      ],
    },
  ],
  items: [
    {
      name: "全復藥",
      quantity: "10～15",
      note: "依預算調整；戰鬥間補血與異常。",
    },
    {
      name: "活力碎片",
      quantity: "5～8",
    },
    {
      name: "萬靈藥",
      quantity: "5～8",
    },
    {
      name: "PP 回復道具",
      quantity: "現有庫存",
      note: "多屬拾取資源，入場前分配給主力招式。",
    },
  ],
  pitfalls: ["不要使用黑白的道館等級。", "雙斧戰龍的氣勢披帶會留下 1 HP。", "三首惡龍漂浮；拉普拉斯儲水。"],
  conclusion: "建議主力約 Lv56～60，先確保冰、惡、格鬥與超能力招都有實際使用者。",
};
