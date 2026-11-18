import { pm, rec } from './helpers.js';

/**
 * 首次主線攻略；特殊再戰階段另行標示。
 * 校正來源：
 * https://www.serebii.net/omegarubyalphasapphire/gyms.shtml
 * https://www.serebii.net/omegarubyalphasapphire/elitefour.shtml
 */
export const omegaRubyAlphaSapphireLeague = {
  intro: "首次聯盟四天王 Lv50～55，依花月、芙蓉、波妮、源治固定順序；冠軍大吾 Lv57～59。首次只有大吾巨金怪 Mega，四天王 Mega 與升級隊伍屬於通關後再戰。",
  coverage: [
    {
      attackType: "fairy",
      label: "妖精",
      uses: "花月、芙蓉勾魂眼、源治",
    },
    {
      attackType: "dark",
      label: "惡",
      uses: "芙蓉除勾魂眼外，以及巨金怪、念力土偶",
    },
    {
      attackType: "electric",
      label: "電",
      uses: "巨牙鯊、帝牙海獅、盔甲鳥",
    },
    {
      attackType: "ice",
      label: "冰",
      uses: "源治除刺龍王外多數四倍弱冰",
    },
    {
      attackType: "fighting",
      label: "格鬥",
      uses: "花月、帝牙海獅、波士可多拉",
    },
    {
      attackType: "ground",
      label: "地面",
      uses: "波士可多拉、巨金怪",
    },
  ],
  recommendedTeams: [
    rec("兩版本皆可取得的六隻範例", "不用交換與版本限定勾魂眼／樂天河童；使用原本御三家並補妖精與惡招。", [
      pm("你的御三家", []),
      {
        name: "雷電獸",
        types: ["electric"],
        obtain: "110 號道路落雷獸 Lv26。",
      },
      {
        name: "沙奈朵",
        types: ["psychic", "fairy"],
        obtain: "102 號道路拉魯拉絲進化鏈。",
      },
      {
        name: "斗笠菇",
        types: ["grass", "fighting"],
        obtain: "橙華森林蘑蘑菇 Lv23。",
      },
      {
        name: "大狼犬",
        types: ["dark"],
        obtain: "早期土狼犬 Lv18。",
      },
      {
        name: "大嘴鷗",
        types: ["water", "flying"],
        obtain: "早期長翅鷗 Lv25；衝浪與冰凍光束可補覆蓋。",
      },
    ]),
  ],
  battles: {
    "eliteFour:1": {
      intro: "花月首次隊伍五隻，沒有 Mega 進化。",
      tips: [
        "格鬥與妖精可覆蓋惡系；狡猾天狗與夢歌仙人掌四倍弱蟲。",
        "大狼犬有威嚇，物理攻擊可能降低。",
      ],
      matchups: [
        {
          opponent: "大狼犬",
          counters: "格鬥／妖精／蟲。",
        },
        {
          opponent: "狡猾天狗",
          counters: "火／飛行／格鬥／妖精，蟲四倍。",
        },
        {
          opponent: "夢歌仙人掌",
          counters: "火／飛行／格鬥／妖精，蟲四倍。",
        },
        {
          opponent: "巨牙鯊",
          counters: "電／草／格鬥／妖精。",
        },
        {
          opponent: "阿勃梭魯",
          counters: "格鬥／妖精／蟲。",
        },
      ],
    },
    "eliteFour:2": {
      intro: "芙蓉幽靈隊；勾魂眼只有妖精這個屬性弱點。",
      tips: [
        "勾魂眼免疫格鬥，不能用斗笠菇格鬥招打。",
        "首次戰不會出現 Mega 詛咒娃娃或 Mega 勾魂眼。",
      ],
      matchups: [
        {
          opponent: "彷徨夜靈",
          counters: "惡／幽靈。",
        },
        {
          opponent: "詛咒娃娃",
          counters: "惡／幽靈。",
        },
        {
          opponent: "勾魂眼",
          counters: "妖精。",
        },
        {
          opponent: "第二隻詛咒娃娃",
          counters: "惡／幽靈。",
        },
        {
          opponent: "黑夜魔靈",
          counters: "惡／幽靈。",
        },
      ],
    },
    "eliteFour:3": {
      intro: "波妮有兩隻冰鬼護、兩隻雪妖女和帝牙海獅。",
      tips: [
        "雪妖女為冰／幽靈，格鬥招無效。",
        "帝牙海獅水／冰，火招只有一般效果；電或格鬥有效。",
        "首次沒有 Mega 冰鬼護，亦沒有雙倍多多冰與象牙豬。",
      ],
      matchups: [
        {
          opponent: "冰鬼護",
          counters: "火／格鬥／鋼／岩石。",
        },
        {
          opponent: "雪妖女",
          counters: "火／岩石／鋼／惡／幽靈。",
        },
        {
          opponent: "第二隻冰鬼護",
          counters: "火／格鬥／鋼／岩石。",
        },
        {
          opponent: "第二隻雪妖女",
          counters: "火／岩石／鋼／惡／幽靈。",
        },
        {
          opponent: "帝牙海獅",
          counters: "電／草／格鬥／岩石。",
        },
      ],
    },
    "eliteFour:4": {
      intro: "源治首次隊伍有刺龍王，沒有甲殼龍。",
      tips: [
        "冰招對七夕青鳥、沙漠蜻蜓與暴飛龍四倍。",
        "刺龍王水／龍，冰招只有一般效果；妖精或龍有效。",
        "首次暴飛龍不會 Mega。",
      ],
      matchups: [
        {
          opponent: "七夕青鳥",
          counters: "冰四倍／妖精。",
        },
        {
          opponent: "沙漠蜻蜓",
          counters: "冰四倍／妖精，漂浮免疫地面。",
        },
        {
          opponent: "刺龍王",
          counters: "妖精／龍。",
        },
        {
          opponent: "第二隻沙漠蜻蜓",
          counters: "冰四倍／妖精。",
        },
        {
          opponent: "暴飛龍",
          counters: "冰四倍／妖精；留意威嚇。",
        },
      ],
    },
    champion: {
      intro: "大吾以鋼與化石寶可夢混編，只有巨金怪 Mega。",
      tips: [
        "念力土偶有漂浮，地面招無效。",
        "波士可多拉仍是鋼／岩石，四倍弱格鬥、地面。",
        "搖籃百合岩／草，水與火招都只是一般效果。",
      ],
      matchups: [
        {
          opponent: "盔甲鳥",
          counters: "電／火。",
        },
        {
          opponent: "念力土偶",
          counters: "水／草／冰／惡／幽靈。",
        },
        {
          opponent: "波士可多拉",
          counters: "格鬥或地面四倍。",
        },
        {
          opponent: "搖籃百合",
          counters: "格鬥／冰／鋼／蟲。",
        },
        {
          opponent: "太古盔甲",
          counters: "水／岩石／鋼；不是岩／草。",
        },
        {
          opponent: "巨金怪",
          counters: "火／地面／惡／幽靈；注意 Mega 後速度與物攻。",
        },
      ],
    },
  },
  battleOrder: [
    {
      battle: "花月",
      leads: "沙奈朵／斗笠菇",
      backup: "雷電獸對巨牙鯊",
    },
    {
      battle: "芙蓉",
      leads: "大狼犬",
      backup: "沙奈朵妖精招對勾魂眼",
    },
    {
      battle: "波妮",
      leads: "雷電獸／火招手",
      backup: "斗笠菇只對可命中的對手使用格鬥",
    },
    {
      battle: "源治",
      leads: "沙奈朵／冰招手",
      backup: "留意刺龍王不弱冰",
    },
    {
      battle: "大吾",
      leads: "依雙屬性分工",
      backup: "保住能有效攻擊 Mega 巨金怪的隊員",
    },
  ],
  starterLineups: [
    {
      starter: "火稚雞",
      starterTypes: ["fire"],
      pokemon: [
        pm("火焰雞", ["fire", "fighting"]),
        pm("雷電獸", ["electric"]),
        pm("沙奈朵", ["psychic", "fairy"]),
        pm("斗笠菇", ["grass", "fighting"]),
        pm("大狼犬", ["dark"]),
        pm("大嘴鷗", ["water", "flying"]),
      ],
      summary: "火焰雞補火與格鬥；大嘴鷗提供水招，沙奈朵處理龍與勾魂眼。",
    },
    {
      starter: "水躍魚",
      starterTypes: ["water"],
      pokemon: [
        pm("巨沼怪", ["water", "ground"]),
        pm("雷電獸", ["electric"]),
        pm("沙奈朵", ["psychic", "fairy"]),
        pm("斗笠菇", ["grass", "fighting"]),
        pm("大狼犬", ["dark"]),
        pm("大嘴鷗", ["water", "flying"]),
      ],
      summary: "巨沼怪地面招打大吾部分鋼隊；盔甲鳥與漂浮念力土偶須換招或換人。",
    },
    {
      starter: "木守宮",
      starterTypes: ["grass"],
      pokemon: [
        pm("蜥蜴王", ["grass"]),
        pm("雷電獸", ["electric"]),
        pm("沙奈朵", ["psychic", "fairy"]),
        pm("斗笠菇", ["grass", "fighting"]),
        pm("大狼犬", ["dark"]),
        pm("大嘴鷗", ["water", "flying"]),
      ],
      summary: "蜥蜴王可打念力土偶，但留意冰招；主要龍系戰交給沙奈朵。",
    },
  ],
  moveSets: [
    {
      pokemon: "沙奈朵",
      role: "妖精對策與特殊輸出",
      moves: [
        {
          name: "精神強念",
          use: "打格鬥、毒。",
          source: "level",
          sourceDetail: "Lv31",
          type: "psychic",
        },
        {
          name: "月亮之力",
          use: "打龍、惡、格鬥。",
          source: "tutor",
          sourceDetail: "用心之鱗片回憶 Lv1 招式；不是等待高等級才可用。",
          type: "fairy",
        },
        {
          name: "冥想",
          use: "提高特攻、特防；先評估對手物理招。",
          source: "level",
          sourceDetail: "Lv26",
          type: "psychic",
        },
        {
          name: "暗影球",
          use: "打幽靈、超能力，不能當惡系招。",
          source: "tm",
          sourceDetail: "TM30",
          type: "ghost",
        },
      ],
    },
    {
      pokemon: "雷電獸",
      role: "電系與火系補盲",
      moves: [
        {
          name: "放電",
          use: "電系主力；對龍／飛行僅一般效果。",
          source: "level",
          sourceDetail: "ORAS Lv30",
          type: "electric",
        },
        {
          name: "咬住",
          use: "惡系補刀；物攻並非主力長處。",
          source: "level",
          sourceDetail: "ORAS Lv24",
          type: "dark",
        },
        {
          name: "電磁波",
          use: "控速；地面免疫，第六世代電系也免疫麻痺。",
          source: "level",
          sourceDetail: "早期習得，錯過可回憶。",
          type: "electric",
        },
        {
          name: "噴射火焰",
          use: "打鋼、冰與草，不用虛構 TM23 雷電拳。",
          source: "tm",
          sourceDetail: "TM35",
          type: "fire",
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
  pitfalls: [
    "勾魂眼與樂天河童是始源藍寶石版本取得；終極紅寶石需交換。",
    "蘑蘑菇純草、水躍魚純水、可可多拉鋼／岩石。",
    "格鬥招打勾魂眼與雪妖女無效。",
    "不要把再戰 Mega 四天王混入首次聯盟。",
  ],
  conclusion: "建議主力約 Lv54～60；妖精、惡、電、水與地面分工，冠軍前回復關鍵招式 PP。",
};
