import { pm, rec, assertBattle, assertLeague } from './helpers.js';
import { omegaRubyAlphaSapphireLeague } from './gen6-omega-ruby-alpha-sapphire-league.js';

/**
 * 首次主線攻略；特殊再戰階段另行標示。
 * 校正來源：
 * https://www.serebii.net/omegarubyalphasapphire/gyms.shtml
 * https://www.serebii.net/omegarubyalphasapphire/elitefour.shtml
 */
export const omegaRubyAlphaSapphireGuide = {
  id: "omega-ruby-alpha-sapphire",
  title: "寶可夢 終極紅寶石／始源藍寶石",
  displayGeneration: 6,
  status: "complete",
  notes: "首次道館與聯盟；第八館米可利、冠軍大吾。道館無 Mega，首次四天王也無 Mega。Δ篇章為通關後事件。",
  quickNavigation: true,
  gyms: [
    {
      order: 1,
      role: "gym",
      name: "杜娟",
      location: "卡那茲市",
      badge: "岩石徽章",
      badgeType: "rock",
      party: [
        pm("小拳石", ["rock", "ground"], 12),
        pm("朝北鼻", ["rock"], 14),
      ],
      notes: "水與草招剋岩石；小拳石四倍弱水、草。",
      strategy: {
        level: "12～16",
        summary: "水與草招剋岩石；小拳石四倍弱水、草。",
        tips: [
          "朝北鼻 Lv14，沒有 Mega 進化。",
          "蘑蘑菇是純草，進化斗笠菇才有格鬥屬性。",
        ],
      },
      recommendedTeams: [
        rec("可取得的對策（擇一培養）", "以下是候選，依開局與現有隊伍選擇；建議等級不是必勝保證。", [
          {
            name: "蘑蘑菇",
            types: ["grass"],
            obtain: "橙華森林捕捉。",
            moveNote: "草招。",
          },
          {
            name: "水躍魚",
            types: ["water"],
            obtain: "僅適用水躍魚開局；本階段純水。",
            moveNote: "水槍。",
          },
        ]),
      ],
    },
    {
      order: 2,
      role: "gym",
      name: "藤樹",
      location: "武鬥鎮",
      badge: "拳擊徽章",
      badgeType: "fighting",
      party: [
        pm("腕力", ["fighting"], 14),
        pm("幕下力士", ["fighting"], 16),
      ],
      notes: "飛行、超能力與妖精招可處理格鬥隊。",
      strategy: {
        level: "14～18",
        summary: "飛行、超能力與妖精招可處理格鬥隊。",
        tips: [
          "這場沒有鐵掌力士。",
          "不要讓健美堆太多，保留穩定特殊攻擊也有幫助。",
        ],
      },
      recommendedTeams: [
        rec("可取得的對策（擇一培養）", "以下是候選，依開局與現有隊伍選擇；建議等級不是必勝保證。", [
          {
            name: "傲骨燕",
            types: ["normal", "flying"],
            obtain: "104 或 116 號道路捕捉。",
            moveNote: "飛行招。",
          },
          {
            name: "拉魯拉絲",
            types: ["psychic", "fairy"],
            obtain: "102 號道路低機率捕捉；超能力／妖精。",
            moveNote: "念力等超能力招。",
          },
        ]),
      ],
    },
    {
      order: 3,
      role: "gym",
      name: "鐵旋",
      location: "紫堇市",
      badge: "電力徽章",
      badgeType: "electric",
      party: [
        pm("小磁怪", ["electric", "steel"], 19),
        pm("霹靂電球", ["electric"], 19),
        pm("三合一磁怪", ["electric", "steel"], 21),
      ],
      notes: "三合一磁怪四倍弱地面；本戰沒有雷電獸或 Mega。",
      strategy: {
        level: "20～24",
        summary: "三合一磁怪四倍弱地面；本戰沒有雷電獸或 Mega。",
        tips: [
          "小磁怪與三合一磁怪為電／鋼；鋼屬性也弱火與格鬥。",
          "霹靂電球純電，格鬥招只有一般效果。",
        ],
      },
      recommendedTeams: [
        rec("可取得的對策（擇一培養）", "以下是候選，依開局與現有隊伍選擇；建議等級不是必勝保證。", [
          {
            name: "沼躍魚",
            types: ["water", "ground"],
            obtain: "水躍魚 Lv16 進化，水／地面。",
            moveNote: "地面招覆蓋全隊，且免疫電招。",
          },
          {
            name: "幕下力士",
            types: ["fighting"],
            obtain: "石之洞窟捕捉。",
            moveNote: "格鬥招處理兩隻磁怪；霹靂電球交給耐打主力。",
          },
        ]),
      ],
    },
    {
      order: 4,
      role: "gym",
      name: "亞莎",
      location: "釜炎鎮",
      badge: "烈焰徽章",
      badgeType: "fire",
      party: [
        pm("熔岩蟲", ["fire"], 26),
        pm("呆火駝", ["fire", "ground"], 26),
        pm("煤炭龜", ["fire"], 28),
      ],
      notes: "水招打呆火駝四倍；煤炭龜是純火，不是火／岩石。",
      strategy: {
        level: "26～30",
        summary: "水招打呆火駝四倍；煤炭龜是純火，不是火／岩石。",
        tips: [
          "本戰沒有 Mega 進化，呆火駝也不能 Mega。",
          "煤炭龜會大晴天，晴天下水招威力下降。",
        ],
      },
      recommendedTeams: [
        rec("可取得的對策（擇一培養）", "以下是候選，依開局與現有隊伍選擇；建議等級不是必勝保證。", [
          {
            name: "瑪力露麗",
            types: ["water", "fairy"],
            obtain: "117 號道路瑪力露 Lv18 進化。",
            moveNote: "水招；先確認實際招式。",
          },
          {
            name: "沼躍魚",
            types: ["water", "ground"],
            obtain: "水躍魚開局持續培養。",
            moveNote: "水或地面招，晴天下可優先考慮地面。",
          },
        ]),
      ],
    },
    {
      order: 5,
      role: "gym",
      name: "千里",
      location: "橙華市",
      badge: "天秤徽章",
      badgeType: "normal",
      party: [
        pm("請假王", ["normal"], 28),
        pm("過動猿", ["normal"], 28),
        pm("請假王", ["normal"], 30),
      ],
      notes: "利用請假王懶惰回合；過動猿不會每隔一回合休息。",
      strategy: {
        level: "28～32",
        summary: "利用請假王懶惰回合；過動猿不會每隔一回合休息。",
        tips: [
          "請假王有一般強攻與惡系補盲，幽靈隊員不能視為完全安全。",
          "守住若已學會，可用來擋請假王行動回合。",
        ],
      },
      recommendedTeams: [
        rec("可取得的對策（擇一培養）", "以下是候選，依開局與現有隊伍選擇；建議等級不是必勝保證。", [
          {
            name: "斗笠菇",
            types: ["grass", "fighting"],
            obtain: "橙華森林蘑蘑菇 Lv23 進化。",
            moveNote: "格鬥招；不是未進化蘑蘑菇。",
          },
          {
            name: "大嘴鷗",
            types: ["water", "flying"],
            obtain: "長翅鷗 Lv25 進化。",
            moveNote: "已學會守住時可利用懶惰；搭配主力輪替。",
          },
        ]),
      ],
    },
    {
      order: 6,
      role: "gym",
      name: "娜琪",
      location: "茵郁市",
      badge: "白羽徽章",
      badgeType: "flying",
      party: [
        pm("大王燕", ["normal", "flying"], 33),
        pm("大嘴鷗", ["water", "flying"], 33),
        pm("盔甲鳥", ["steel", "flying"], 33),
        pm("七夕青鳥", ["dragon", "flying"], 35),
      ],
      notes: "電招打前三隻；七夕青鳥用妖精或冰招更有效。",
      strategy: {
        level: "33～37",
        summary: "電招打前三隻；七夕青鳥用妖精或冰招更有效。",
        tips: [
          "七夕青鳥在本戰不 Mega；電招打龍／飛行只有一般效果。",
          "七夕青鳥有地震，雷電獸不能盲目留場。",
        ],
      },
      recommendedTeams: [
        rec("可取得的對策（擇一培養）", "以下是候選，依開局與現有隊伍選擇；建議等級不是必勝保證。", [
          {
            name: "雷電獸",
            types: ["electric"],
            obtain: "110 號道路落雷獸 Lv26 進化。",
            moveNote: "電招；大嘴鷗四倍弱電。",
          },
          {
            name: "沙奈朵",
            types: ["psychic", "fairy"],
            obtain: "102 號道路拉魯拉絲進化鏈，Lv30 成沙奈朵。",
            moveNote: "已學妖精招打七夕青鳥。",
          },
        ]),
      ],
    },
    {
      order: 7,
      role: "gym",
      name: "小楓與小南",
      location: "綠嶺市",
      badge: "心靈徽章",
      badgeType: "psychic",
      party: [
        pm("月石", ["rock", "psychic"], 45),
        pm("太陽岩", ["rock", "psychic"], 45),
      ],
      notes: "雙打只派月石與太陽岩；水、草、惡、幽靈或鋼招有效。",
      strategy: {
        level: "43～47",
        summary: "雙打只派月石與太陽岩；水、草、惡、幽靈或鋼招有效。",
        tips: [
          "兩隻都有漂浮，地震無效；隊伍沒有念力土偶。",
          "衝浪在雙打也會打中隊友；注意太陽岩大晴天與日光束。",
        ],
      },
      recommendedTeams: [
        rec("可取得的對策（擇一培養）", "以下是候選，依開局與現有隊伍選擇；建議等級不是必勝保證。", [
          {
            name: "大狼犬",
            types: ["dark"],
            obtain: "早期土狼犬 Lv18 進化。",
            moveNote: "咬碎等惡招；免疫超能力攻擊。",
          },
          {
            name: "瑪力露麗",
            types: ["water", "fairy"],
            obtain: "117 號道路瑪力露 Lv18 進化。",
            moveNote: "單體水招避免打傷隊友，晴天下水招減弱。",
          },
        ]),
      ],
    },
    {
      order: 8,
      role: "gym",
      name: "米可利",
      location: "琉璃市",
      badge: "雨滴徽章",
      badgeType: "water",
      party: [
        pm("愛心魚", ["water"], 44),
        pm("鯰魚王", ["water", "ground"], 44),
        pm("海魔獅", ["water", "ice"], 44),
        pm("金魚王", ["water"], 44),
        pm("美納斯", ["water"], 46),
      ],
      notes: "館主是米可利，不是綠寶石亞當；草、電招分工。",
      strategy: {
        level: "44～48",
        summary: "館主是米可利，不是綠寶石亞當；草、電招分工。",
        tips: [
          "鯰魚王水／地面，四倍弱草且免疫電。",
          "美納斯有高特防與自我再生，保留足夠 PP。",
        ],
      },
      recommendedTeams: [
        rec("可取得的對策（擇一培養）", "以下是候選，依開局與現有隊伍選擇；建議等級不是必勝保證。", [
          {
            name: "雷電獸",
            types: ["electric"],
            obtain: "110 號道路落雷獸 Lv26 進化。",
            moveNote: "電招處理除鯰魚王外四隻。",
          },
          {
            name: "斗笠菇",
            types: ["grass", "fighting"],
            obtain: "橙華森林蘑蘑菇 Lv23 進化。",
            moveNote: "草招處理鯰魚王；留意對手冰招。",
          },
        ]),
      ],
    },
  ],
  eliteFour: [
    {
      order: 1,
      role: "eliteFour",
      name: "花月",
      specialty: "dark",
      party: [
        pm("大狼犬", ["dark"], 50),
        pm("狡猾天狗", ["grass", "dark"], 50),
        pm("夢歌仙人掌", ["grass", "dark"], 50),
        pm("巨牙鯊", ["water", "dark"], 50),
        pm("阿勃梭魯", ["dark"], 52),
      ],
    },
    {
      order: 2,
      role: "eliteFour",
      name: "芙蓉",
      specialty: "ghost",
      party: [
        pm("彷徨夜靈", ["ghost"], 51),
        pm("詛咒娃娃", ["ghost"], 51),
        pm("勾魂眼", ["dark", "ghost"], 51),
        pm("詛咒娃娃", ["ghost"], 51),
        pm("黑夜魔靈", ["ghost"], 53),
      ],
    },
    {
      order: 3,
      role: "eliteFour",
      name: "波妮",
      specialty: "ice",
      party: [
        pm("冰鬼護", ["ice"], 52),
        pm("雪妖女", ["ice", "ghost"], 52),
        pm("冰鬼護", ["ice"], 52),
        pm("雪妖女", ["ice", "ghost"], 52),
        pm("帝牙海獅", ["water", "ice"], 54),
      ],
    },
    {
      order: 4,
      role: "eliteFour",
      name: "源治",
      specialty: "dragon",
      party: [
        pm("七夕青鳥", ["dragon", "flying"], 53),
        pm("沙漠蜻蜓", ["ground", "dragon"], 53),
        pm("刺龍王", ["water", "dragon"], 53),
        pm("沙漠蜻蜓", ["ground", "dragon"], 53),
        pm("暴飛龍", ["dragon", "flying"], 55),
      ],
    },
  ],
  champion: {
    role: "champion",
    name: "大吾",
    specialty: "steel",
    party: [
      pm("盔甲鳥", ["steel", "flying"], 57),
      pm("念力土偶", ["ground", "psychic"], 57),
      pm("波士可多拉", ["steel", "rock"], 57),
      pm("搖籃百合", ["rock", "grass"], 57),
      pm("太古盔甲", ["bug", "rock"], 57),
      pm("巨金怪", ["steel", "psychic"], 59),
    ],
    notes: "首次聯盟只有大吾的巨金怪會 Mega 進化；波士可多拉不會在這場 Mega。四天王的 Mega 進化是通關後再戰內容。",
  },
  league: omegaRubyAlphaSapphireLeague,
};

for (const battle of [...omegaRubyAlphaSapphireGuide.gyms, ...omegaRubyAlphaSapphireGuide.eliteFour, ...(omegaRubyAlphaSapphireGuide.storyBattles || []), omegaRubyAlphaSapphireGuide.champion]) {
  assertBattle(battle);
}
assertLeague(omegaRubyAlphaSapphireLeague);
