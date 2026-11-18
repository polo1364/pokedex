import { pm, rec } from './helpers.js';

/**
 * 首次主線攻略；特殊再戰階段另行標示。
 * 校正來源：
 * https://www.serebii.net/blackwhite/gyms.shtml
 * https://www.serebii.net/blackwhite/elitefour.shtml
 */
export const blackWhiteLeague = {
  intro: "以下四天王為首次挑戰 Lv48～50，四人的順序可自選。擊敗後進入 N 的城堡，迎戰 N 與魁奇思。阿戴克另列通關後資料；首次不是四天王＋阿戴克五連戰。",
  coverage: [
    {
      attackType: "dark",
      label: "惡",
      uses: "婉龍、嘉德麗雅",
    },
    {
      attackType: "fighting",
      label: "格鬥",
      uses: "越橘、魁奇思的劈斬司令",
    },
    {
      attackType: "psychic",
      label: "超能力",
      uses: "連武",
    },
    {
      attackType: "ice",
      label: "冰",
      uses: "N 的龍與魁奇思三首惡龍",
    },
    {
      attackType: "rock",
      label: "岩石",
      uses: "通關後阿戴克火神蛾",
    },
  ],
  recommendedTeams: [
    rec("首次聯盟可組成的六隻範例", "均可在通關前取得，無交換進化要求；不需同時持有多隻御三家。", [
      {
        name: "頭巾混混",
        types: ["dark", "fighting"],
        obtain: "4 號道路滑滑小子 Lv39 進化。",
      },
      {
        name: "電蜘蛛",
        types: ["bug", "electric"],
        obtain: "電石洞穴電電蟲 Lv36 進化。",
      },
      {
        name: "蟾蜍王",
        types: ["water", "ground"],
        obtain: "矢車森林圓蝌蚪 → Lv25 藍蟾蜍 → Lv36 蟾蜍王。",
      },
      {
        name: "達摩狒狒",
        types: ["fire"],
        obtain: "4 號道路火紅不倒翁 Lv35 進化。",
      },
      {
        name: "象徵鳥",
        types: ["psychic", "flying"],
        obtain: "沙漠地帶捕捉。",
      },
      {
        name: "雙倍多多冰",
        types: ["ice"],
        obtain: "冷凍倉庫迷你冰 → Lv35 多多冰 → Lv47 雙倍多多冰。",
      },
    ]),
  ],
  battles: {
    "eliteFour:1": {
      intro: "婉龍使用四隻幽靈寶可夢。",
      tips: [
        "一般與格鬥招不能直接打幽靈；泥偶巨人地面／幽靈，不是純地面。",
        "頭巾混混用咬碎；水晶燈火靈可用水、岩石、地面招。",
      ],
      matchups: [
        {
          opponent: "死神棺",
          counters: "咬碎；注意木乃伊改變接觸者特性。",
        },
        {
          opponent: "胖嘟嘟",
          counters: "電／草／惡招。",
        },
        {
          opponent: "泥偶巨人",
          counters: "水／草／冰／惡招。",
        },
        {
          opponent: "水晶燈火靈",
          counters: "水／岩石／地面／惡招。",
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
          counters: "象徵鳥的超能力／飛行招。",
        },
        {
          opponent: "打擊鬼",
          counters: "先處理結實並保持血量。",
        },
        {
          opponent: "修建老匠",
          counters: "超能力／飛行招。",
        },
        {
          opponent: "師父鼬",
          counters: "超能力／飛行招；留意速度。",
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
      intro: "阿戴克是通關後冠軍戰，隊伍 Lv75～77。",
      tips: [
        "火神蛾四倍弱岩石；騎士蝸牛四倍弱火。",
        "爆炸頭水牛的食草會擋草招；用格鬥。",
        "首次四天王後走 N 的城堡劇情，不會直接挑戰這隊。",
      ],
      matchups: [
        {
          opponent: "敏捷蟲",
          counters: "火／飛行／岩石。",
        },
        {
          opponent: "爆炸頭水牛",
          counters: "格鬥；避免草招。",
        },
        {
          opponent: "赤面龍",
          counters: "冰／龍。",
        },
        {
          opponent: "雙倍多多冰",
          counters: "火／格鬥／鋼／岩石。",
        },
        {
          opponent: "騎士蝸牛",
          counters: "火四倍。",
        },
        {
          opponent: "火神蛾",
          counters: "岩石四倍；注意高特攻。",
        },
      ],
    },
    "story:1": {
      intro: "黑版 N 使用捷克羅姆、白版 N 使用萊希拉姆；其他五隻相同。索羅亞克有幻覺。",
      tips: [
        "城堡內有隊伍整理與回復安排，不應宣稱從四天王一路到阿戴克完全不能整隊。",
      ],
      matchups: [],
    },
    "story:2": {
      intro: "麻麻鰻魚王與三首惡龍有漂浮，地面招無效。三首惡龍有龍之波動、大字爆炎、衝浪、真氣彈，需避免讓單一剋屬隊員硬吃補盲。",
      tips: [
        "城堡內有隊伍整理與回復安排，不應宣稱從四天王一路到阿戴克完全不能整隊。",
      ],
      matchups: [],
    },
  },
  battleOrder: [
    {
      battle: "婉龍",
      leads: "頭巾混混",
      backup: "蟾蜍王／電蜘蛛",
    },
    {
      battle: "連武",
      leads: "象徵鳥",
      backup: "保有足夠血量的其他隊員",
    },
    {
      battle: "越橘",
      leads: "頭巾混混",
      backup: "達摩狒狒",
    },
    {
      battle: "嘉德麗雅",
      leads: "頭巾混混",
      backup: "電蜘蛛",
    },
    {
      battle: "阿戴克（通關後）",
      leads: "岩石、火、冰招手",
      backup: "重新訓練至適合 Lv75～77 的隊伍",
    },
  ],
  starterLineups: [
    {
      starter: "暖暖豬",
      starterTypes: ["fire"],
      pokemon: [
        pm("炎武王", ["fire", "fighting"]),
        pm("頭巾混混", ["dark", "fighting"]),
        pm("電蜘蛛", ["bug", "electric"]),
        pm("蟾蜍王", ["water", "ground"]),
        pm("象徵鳥", ["psychic", "flying"]),
        pm("雙倍多多冰", ["ice"]),
      ],
      summary: "炎武王替代達摩狒狒；格鬥招處理越橘，火招補鋼與冰。",
    },
    {
      starter: "水水獺",
      starterTypes: ["water"],
      pokemon: [
        pm("大劍鬼", ["water"]),
        pm("頭巾混混", ["dark", "fighting"]),
        pm("電蜘蛛", ["bug", "electric"]),
        pm("達摩狒狒", ["fire"]),
        pm("象徵鳥", ["psychic", "flying"]),
        pm("雙倍多多冰", ["ice"]),
      ],
      summary: "大劍鬼替代水系位置；保留惡、超能力和冰的覆蓋。",
    },
    {
      starter: "藤藤蛇",
      starterTypes: ["grass"],
      pokemon: [
        pm("君主蛇", ["grass"]),
        pm("頭巾混混", ["dark", "fighting"]),
        pm("蟾蜍王", ["water", "ground"]),
        pm("達摩狒狒", ["fire"]),
        pm("象徵鳥", ["psychic", "flying"]),
        pm("雙倍多多冰", ["ice"]),
      ],
      summary: "君主蛇處理胖嘟嘟與水／地面對手；不要用草招硬攻蟲、鋼或龍。",
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
  pitfalls: ["龐岩怪需要交換進化，不能宣稱不用交換。", "地面招打漂浮麻麻鰻魚王／三首惡龍無效。", "不要把阿戴克通關後戰當成首次聯盟。"],
  conclusion: "先備齊惡、格鬥、超能力與冰招。建議首次主力約 Lv48～54；阿戴克需按通關後隊伍重新準備。",
};
