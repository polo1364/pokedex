import { pm, rec } from './helpers.js';

/**
 * 首次主線攻略；特殊再戰階段另行標示。
 * 校正來源：
 * https://www.serebii.net/xy/gyms.shtml
 * https://www.serebii.net/xy/elitefour.shtml
 */
export const xyLeague = {
  intro: "首次聯盟四天王各四隻 Lv63～65，順序可自選；冠軍卡露妮 Lv64～68。入場前備齊補給與隊伍。只有卡露妮的沙奈朵在本次聯盟使用 Mega 進化。",
  coverage: [
    {
      attackType: "water",
      label: "水",
      uses: "帕琦拉",
    },
    {
      attackType: "electric",
      label: "電",
      uses: "志米，尤其暴鯉龍",
    },
    {
      attackType: "fire",
      label: "火",
      uses: "巨鉗螳螂、鑰圈兒、南瓜怪人",
    },
    {
      attackType: "ground",
      label: "地面",
      uses: "大朝北鼻、堅盾劍怪",
    },
    {
      attackType: "ice",
      label: "冰",
      uses: "朵拉塞娜龍隊",
    },
    {
      attackType: "steel",
      label: "鋼",
      uses: "卡露妮沙奈朵、冰雪巨龍",
    },
  ],
  recommendedTeams: [
    rec("首次聯盟的六隻範例", "不用交換進化；路卡利歐、拉普拉斯可由劇情 NPC 取得。保留既有御三家，再補缺少的屬性。", [
      pm("你的御三家", []),
      {
        name: "路卡利歐",
        types: ["fighting", "steel"],
        obtain: "精煉之塔贈送。",
      },
      {
        name: "拉普拉斯",
        types: ["water", "ice"],
        obtain: "12 號道路 NPC 贈送，隊伍須有空位。",
      },
      {
        name: "雷丘",
        types: ["electric"],
        obtain: "白檀森林皮卡丘＋10 號道路雷之石；先學好電招。",
      },
      {
        name: "沙奈朵",
        types: ["psychic", "fairy"],
        obtain: "4 號道路拉魯拉絲 → Lv20 奇魯莉安 → Lv30 沙奈朵。",
      },
      {
        name: "流氓鱷",
        types: ["ground", "dark"],
        obtain: "9 號道路黑眼鱷 → 混混鱷 → Lv40 流氓鱷。",
      },
    ]),
  ],
  battles: {
    "eliteFour:1": {
      intro: "帕琦拉四隻火系，水招可覆蓋；煤炭龜是純火。",
      tips: [
        "烈箭鷹免疫地面且四倍弱岩石。",
        "水晶燈火靈為幽靈／火，一般與格鬥招無效。",
      ],
      matchups: [
        {
          opponent: "火炎獅",
          counters: "水／地面／岩石／格鬥。",
        },
        {
          opponent: "煤炭龜",
          counters: "水系特殊招較容易突破物防。",
        },
        {
          opponent: "水晶燈火靈",
          counters: "水／地面／岩石／惡。",
        },
        {
          opponent: "烈箭鷹",
          counters: "岩石四倍，水或電也有效。",
        },
      ],
    },
    "eliteFour:2": {
      intro: "志米水系隊，電與草分工。",
      tips: [
        "暴鯉龍是水／飛行，四倍弱電；本戰不 Mega。",
        "龜足巨鎧水／岩石，四倍弱草。",
      ],
      matchups: [
        {
          opponent: "鋼炮臂蝦",
          counters: "電／草。",
        },
        {
          opponent: "寶石海星",
          counters: "電／草／惡／幽靈／蟲。",
        },
        {
          opponent: "暴鯉龍",
          counters: "電四倍。",
        },
        {
          opponent: "龜足巨鎧",
          counters: "草四倍；電或格鬥也有效。",
        },
      ],
    },
    "eliteFour:3": {
      intro: "雁鎧鋼系隊，火與地面分工。",
      tips: [
        "巨鉗螳螂四倍弱火。",
        "堅盾劍怪是幽靈，格鬥招無效；注意王者盾牌。",
        "大朝北鼻有結實，不保證一擊。",
      ],
      matchups: [
        {
          opponent: "鑰圈兒",
          counters: "火／地面。",
        },
        {
          opponent: "大朝北鼻",
          counters: "格鬥／地面四倍。",
        },
        {
          opponent: "巨鉗螳螂",
          counters: "火四倍。",
        },
        {
          opponent: "堅盾劍怪",
          counters: "火／地面／惡／幽靈；避免在盾牌回合使用接觸招。",
        },
      ],
    },
    "eliteFour:4": {
      intro: "朵拉塞娜龍隊用冰或妖精；毒藻龍另看毒屬性。",
      tips: [
        "毒藻龍毒／龍，妖精招只是一般效果；冰、地面、超能力有效。",
        "七夕青鳥與音波龍四倍弱冰。",
      ],
      matchups: [
        {
          opponent: "毒藻龍",
          counters: "冰／地面／超能力／龍。",
        },
        {
          opponent: "七夕青鳥",
          counters: "冰四倍或妖精。",
        },
        {
          opponent: "赤面龍",
          counters: "冰／妖精。",
        },
        {
          opponent: "音波龍",
          counters: "冰四倍或妖精。",
        },
      ],
    },
    champion: {
      intro: "卡露妮需要按雙屬性分工，最後保留鋼或幽靈招對 Mega 沙奈朵。",
      tips: [
        "沙奈朵超能力／妖精，惡招只是一般效果。",
        "冰雪巨龍四倍弱格鬥與鋼。",
        "不要把黏美龍當成物防高的對手；它更擅長承受特殊攻擊。",
      ],
      matchups: [
        {
          opponent: "摔角鷹人",
          counters: "電／冰／飛行／超能力／妖精。",
        },
        {
          opponent: "怪顎龍",
          counters: "格鬥／鋼／地面／冰／妖精。",
        },
        {
          opponent: "冰雪巨龍",
          counters: "格鬥或鋼四倍。",
        },
        {
          opponent: "南瓜怪人",
          counters: "火／冰／飛行／惡／幽靈。",
        },
        {
          opponent: "黏美龍",
          counters: "冰／龍／妖精，物理招可避開其高特防。",
        },
        {
          opponent: "沙奈朵",
          counters: "鋼／幽靈／毒；留意 Mega 後高特攻。",
        },
      ],
    },
  },
  battleOrder: [
    {
      battle: "帕琦拉",
      leads: "拉普拉斯",
      backup: "流氓鱷；烈箭鷹改用水或電",
    },
    {
      battle: "志米",
      leads: "雷丘",
      backup: "拉普拉斯的電招或其他草招手",
    },
    {
      battle: "雁鎧",
      leads: "流氓鱷",
      backup: "火招手／路卡利歐",
    },
    {
      battle: "朵拉塞娜",
      leads: "拉普拉斯／沙奈朵",
      backup: "流氓鱷對毒藻龍",
    },
    {
      battle: "卡露妮",
      leads: "路卡利歐／拉普拉斯",
      backup: "依剩餘對手換人",
    },
  ],
  starterLineups: [
    {
      starter: "火狐狸",
      starterTypes: ["fire"],
      pokemon: [
        pm("妖火紅狐", ["fire", "psychic"]),
        pm("路卡利歐", ["fighting", "steel"]),
        pm("拉普拉斯", ["water", "ice"]),
        pm("雷丘", ["electric"]),
        pm("沙奈朵", ["psychic", "fairy"]),
        pm("流氓鱷", ["ground", "dark"]),
      ],
      summary: "妖火紅狐火招補雁鎧；妖火紅狐為火／超能力。",
    },
    {
      starter: "呱呱泡蛙",
      starterTypes: ["water"],
      pokemon: [
        pm("甲賀忍蛙", ["water", "dark"]),
        pm("路卡利歐", ["fighting", "steel"]),
        pm("拉普拉斯", ["water", "ice"]),
        pm("雷丘", ["electric"]),
        pm("沙奈朵", ["psychic", "fairy"]),
        pm("流氓鱷", ["ground", "dark"]),
      ],
      summary: "甲賀忍蛙補水／惡輸出；仍需保留冰與鋼招。",
    },
    {
      starter: "哈力栗",
      starterTypes: ["grass"],
      pokemon: [
        pm("布里卡隆", ["grass", "fighting"]),
        pm("路卡利歐", ["fighting", "steel"]),
        pm("拉普拉斯", ["water", "ice"]),
        pm("雷丘", ["electric"]),
        pm("沙奈朵", ["psychic", "fairy"]),
        pm("流氓鱷", ["ground", "dark"]),
      ],
      summary: "布里卡隆草招針對志米，但避開暴鯉龍飛行與寶石海星超能力攻擊。",
    },
  ],
  moveSets: [
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
    {
      pokemon: "沙奈朵",
      role: "妖精對策與特殊輸出",
      moves: [
        {
          name: "精神強念",
          use: "打格鬥、毒。",
          source: "level",
          sourceDetail: "Lv40",
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
          sourceDetail: "Lv33",
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
    "毒藻龍不弱妖精，Mega 沙奈朵不弱惡。",
    "暴鯉龍不是水／惡；冰岩怪不是洗翠冰／岩石。",
    "不要把精煉之塔教學戰混成可爾妮道館。",
  ],
  conclusion: "主力約 Lv63～68，水、電、冰、地面與鋼招分工；保留足夠補給給冠軍。",
};
