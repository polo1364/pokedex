import { pm, rec, assertBattle, assertLeague } from './helpers.js';
import { blackWhiteLeague } from './gen5-black-white-league.js';

/**
 * 首次主線攻略；特殊再戰階段另行標示。
 * 校正來源：
 * https://www.serebii.net/blackwhite/gyms.shtml
 * https://www.serebii.net/blackwhite/elitefour.shtml
 */
export const blackWhiteGuide = {
  id: "black-white",
  title: "寶可夢 黑／白",
  displayGeneration: 5,
  status: "complete",
  notes: "首次道館及四天王；第八館黑版夏卡、白版艾莉絲。首次四天王之後是 N／魁奇思，阿戴克為通關後冠軍戰。",
  quickNavigation: true,
  gyms: [
    {
      order: 1,
      role: "gym",
      name: "天桐／伯特／寇恩",
      location: "三曜市",
      badge: "三星徽章",
      badgeType: "grass",
      party: [
        pm("小約克", ["normal"], 12),
        pm("花椰猴", ["grass"], 14),
      ],
      notes: "館主會使用剋制你御三家的屬性；先領夢之跡贈送的猴寶可夢。",
      strategy: {
        level: "12～15",
        summary: "館主會使用剋制你御三家的屬性；先領夢之跡贈送的猴寶可夢。",
        tips: [
          "藤藤蛇開局對伯特的爆香猴；暖暖豬開局對寇恩的冷水猴；水水獺開局對天桐的花椰猴。",
          "顯示隊伍以天桐為代表。三位館主皆為小約克 Lv12＋屬性猴 Lv14；留意自我激勵。",
        ],
      },
      recommendedTeams: [
        rec("可取得的對策（擇一培養）", "以下是候選，依開局與現有隊伍選擇；建議等級不是必勝保證。", [
          {
            name: "冷水猴",
            types: ["water"],
            obtain: "選藤藤蛇時，夢之跡 NPC 贈送。",
            moveNote: "水招對爆香猴有效。",
          },
          {
            name: "花椰猴",
            types: ["grass"],
            obtain: "選暖暖豬時，夢之跡 NPC 贈送。",
            moveNote: "草招對冷水猴有效。",
          },
          {
            name: "爆香猴",
            types: ["fire"],
            obtain: "選水水獺時，夢之跡 NPC 贈送。",
            moveNote: "火招對花椰猴有效。",
          },
        ]),
      ],
      variants: [
        {
          id: "snivy",
          label: "藤藤蛇開局 → 伯特",
          party: [
            pm("小約克", ["normal"], 12),
            pm("爆香猴", ["fire"], 14),
          ],
          tips: ["夢之跡贈送冷水猴，可用水招對爆香猴。"],
        },
        {
          id: "tepig",
          label: "暖暖豬開局 → 寇恩",
          party: [
            pm("小約克", ["normal"], 12),
            pm("冷水猴", ["water"], 14),
          ],
          tips: ["夢之跡贈送花椰猴，可用草招對冷水猴。"],
        },
        {
          id: "oshawott",
          label: "水水獺開局 → 天桐",
          party: [
            pm("小約克", ["normal"], 12),
            pm("花椰猴", ["grass"], 14),
          ],
          tips: ["夢之跡贈送爆香猴，可用火招對花椰猴。"],
        },
      ],
    },
    {
      order: 2,
      role: "gym",
      name: "蘆薈",
      location: "七寶市",
      badge: "基礎徽章",
      badgeType: "normal",
      party: [
        pm("哈約克", ["normal"], 18),
        pm("步哨鼠", ["normal"], 20),
      ],
      notes: "準備格鬥招與解眠藥，留意步哨鼠的報仇。",
      strategy: {
        level: "18～22",
        summary: "準備格鬥招與解眠藥，留意步哨鼠的報仇。",
        tips: [
          "對手倒下一隻後，報仇在下一回合威力提高；先保住血量。",
          "岩石系可抵抗一般招，但岩石招打一般並不剋制。",
        ],
      },
      recommendedTeams: [
        rec("可取得的對策（擇一培養）", "以下是候選，依開局與現有隊伍選擇；建議等級不是必勝保證。", [
          {
            name: "搬運小匠",
            types: ["fighting"],
            obtain: "矢車森林外圍捕捉。",
            moveNote: "學會格鬥招後再挑戰。",
          },
          {
            name: "炒炒豬",
            types: ["fire", "fighting"],
            obtain: "暖暖豬 Lv17 進化，僅適用該開局。",
            moveNote: "使用格鬥招，不必換掉原本主力。",
          },
        ]),
      ],
    },
    {
      order: 3,
      role: "gym",
      name: "亞堤",
      location: "飛雲市",
      badge: "甲蟲徽章",
      badgeType: "bug",
      party: [
        pm("車輪毬", ["bug", "poison"], 21),
        pm("石居蟹", ["bug", "rock"], 21),
        pm("保母蟲", ["bug", "grass"], 23),
      ],
      notes: "保母蟲四倍弱火與飛行；石居蟹用水或岩石招處理。",
      strategy: {
        level: "21～25",
        summary: "保母蟲四倍弱火與飛行；石居蟹用水或岩石招處理。",
        tips: [
          "石居蟹的岩石屬性讓火招只有一般效果，且有結實。",
          "不要用火／飛行隊員硬吃石居蟹的岩石招。",
        ],
      },
      recommendedTeams: [
        rec("可取得的對策（擇一培養）", "以下是候選，依開局與現有隊伍選擇；建議等級不是必勝保證。", [
          {
            name: "火紅不倒翁",
            types: ["fire"],
            obtain: "4 號道路捕捉。",
            moveNote: "火招處理車輪毬和保母蟲。",
          },
          {
            name: "雙刃丸",
            types: ["water"],
            obtain: "水水獺 Lv17 進化，僅適用該開局。",
            moveNote: "水招處理石居蟹。",
          },
        ]),
      ],
    },
    {
      order: 4,
      role: "gym",
      name: "小菊兒",
      location: "雷文市",
      badge: "伏特徽章",
      badgeType: "electric",
      party: [
        pm("電飛鼠", ["electric", "flying"], 25),
        pm("電飛鼠", ["electric", "flying"], 25),
        pm("雷電斑馬", ["electric"], 27),
      ],
      notes: "地面系擋電；電飛鼠必須另用岩石招，不能用地面招。",
      strategy: {
        level: "25～29",
        summary: "地面系擋電；電飛鼠必須另用岩石招，不能用地面招。",
        tips: [
          "兩隻電飛鼠為電／飛行，免疫地面。",
          "雷電斑馬會蓄能焰襲；草、蟲、鋼隊員仍有風險。",
        ],
      },
      recommendedTeams: [
        rec("可取得的對策（擇一培養）", "以下是候選，依開局與現有隊伍選擇；建議等級不是必勝保證。", [
          {
            name: "混混鱷",
            types: ["ground", "dark"],
            obtain: "4 號道路／沙漠地帶黑眼鱷 Lv29 進化；未進化也可使用。",
            moveNote: "地面招對雷電斑馬。",
          },
          {
            name: "地幔岩",
            types: ["rock"],
            obtain: "地下水脈之穴石丸子 Lv25 進化，無須交換。",
            moveNote: "岩石招對電飛鼠。",
          },
        ]),
      ],
    },
    {
      order: 5,
      role: "gym",
      name: "菊老大",
      location: "帆巴市",
      badge: "震動徽章",
      badgeType: "ground",
      party: [
        pm("混混鱷", ["ground", "dark"], 29),
        pm("藍蟾蜍", ["water", "ground"], 29),
        pm("龍頭地鼠", ["ground", "steel"], 31),
      ],
      notes: "草招對藍蟾蜍四倍；龍頭地鼠優先用水、格鬥或地面招。",
      strategy: {
        level: "29～33",
        summary: "草招對藍蟾蜍四倍；龍頭地鼠優先用水、格鬥或地面招。",
        tips: ["藍蟾蜍水／地面，電招無效。", "草招打地面／鋼的龍頭地鼠只有一般效果。"],
      },
      recommendedTeams: [
        rec("可取得的對策（擇一培養）", "以下是候選，依開局與現有隊伍選擇；建議等級不是必勝保證。", [
          {
            name: "藍蟾蜍",
            types: ["water", "ground"],
            obtain: "矢車森林外圍圓蝌蚪 Lv25 進化。",
            moveNote: "水招打混混鱷與龍頭地鼠。",
          },
          {
            name: "青藤蛇",
            types: ["grass"],
            obtain: "藤藤蛇 Lv17 進化，僅適用該開局。",
            moveNote: "草招對藍蟾蜍。",
          },
        ]),
      ],
    },
    {
      order: 6,
      role: "gym",
      name: "風露",
      location: "吹寄市",
      badge: "噴射徽章",
      badgeType: "flying",
      party: [
        pm("心蝙蝠", ["psychic", "flying"], 33),
        pm("高傲雉雞", ["normal", "flying"], 33),
        pm("舞天鵝", ["water", "flying"], 35),
      ],
      notes: "電招可覆蓋全隊，舞天鵝四倍弱電。",
      strategy: {
        level: "33～37",
        summary: "電招可覆蓋全隊，舞天鵝四倍弱電。",
        tips: ["地面招打三隻飛行寶可夢皆無效。", "先清理天堂之塔事件，再回道館。"],
      },
      recommendedTeams: [
        rec("可取得的對策（擇一培養）", "以下是候選，依開局與現有隊伍選擇；建議等級不是必勝保證。", [
          {
            name: "電電蟲",
            types: ["bug", "electric"],
            obtain: "電石洞穴捕捉；Lv36 進化電蜘蛛。",
            moveNote: "使用已習得的電招。",
          },
          {
            name: "雷電斑馬",
            types: ["electric"],
            obtain: "3 號道路斑斑馬 Lv27 進化。",
            moveNote: "不用等通關後 TM24；使用自身升級電招。",
          },
        ]),
      ],
    },
    {
      order: 7,
      role: "gym",
      name: "哈奇庫",
      location: "雪花市",
      badge: "冰柱徽章",
      badgeType: "ice",
      party: [
        pm("多多冰", ["ice"], 37),
        pm("幾何雪花", ["ice"], 37),
        pm("凍原熊", ["ice"], 39),
      ],
      notes: "火、格鬥、岩石、鋼招打純冰隊都有效。",
      strategy: {
        level: "37～41",
        summary: "火、格鬥、岩石、鋼招打純冰隊都有效。",
        tips: ["凍原熊是純冰，不是冰／格鬥。", "幾何雪花特防較高，可用物理火或格鬥招。"],
      },
      recommendedTeams: [
        rec("可取得的對策（擇一培養）", "以下是候選，依開局與現有隊伍選擇；建議等級不是必勝保證。", [
          {
            name: "達摩狒狒",
            types: ["fire"],
            obtain: "4 號道路火紅不倒翁 Lv35 進化。",
            moveNote: "火系物理招。",
          },
          {
            name: "頭巾混混",
            types: ["dark", "fighting"],
            obtain: "4 號道路滑滑小子 Lv39 進化。",
            moveNote: "格鬥招；注意不要吃太多反擊。",
          },
        ]),
      ],
    },
    {
      order: 8,
      role: "gym",
      name: "夏卡／艾莉絲",
      location: "雙龍市",
      badge: "傳說徽章",
      badgeType: "dragon",
      party: [
        pm("斧牙龍", ["dragon"], 41),
        pm("赤面龍", ["dragon"], 41),
        pm("雙斧戰龍", ["dragon"], 43),
      ],
      notes: "黑版夏卡、白版艾莉絲；兩版首次隊伍與等級相同。",
      strategy: {
        level: "41～45",
        summary: "黑版夏卡、白版艾莉絲；兩版首次隊伍與等級相同。",
        tips: [
          "第五世代沒有妖精系；用冰、龍招應對。",
          "君主蛇不能靠攜帶冰之石取得冰招；本世代也沒有冰之石。",
        ],
      },
      recommendedTeams: [
        rec("可取得的對策（擇一培養）", "以下是候選，依開局與現有隊伍選擇；建議等級不是必勝保證。", [
          {
            name: "多多冰",
            types: ["ice"],
            obtain: "冷凍倉庫迷你冰 Lv35 進化。",
            moveNote: "冰招對三隻龍都有效。",
          },
          {
            name: "凍原熊",
            types: ["ice"],
            obtain: "螺旋山噴嚏熊 Lv37 進化。",
            moveNote: "冰招；純冰不抵抗龍招。",
          },
        ]),
      ],
    },
  ],
  eliteFour: [
    {
      order: 1,
      role: "eliteFour",
      name: "婉龍",
      specialty: "ghost",
      party: [
        pm("死神棺", ["ghost"], 48),
        pm("胖嘟嘟", ["water", "ghost"], 48),
        pm("泥偶巨人", ["ground", "ghost"], 48),
        pm("水晶燈火靈", ["ghost", "fire"], 50),
      ],
    },
    {
      order: 2,
      role: "eliteFour",
      name: "連武",
      specialty: "fighting",
      party: [
        pm("投摔鬼", ["fighting"], 48),
        pm("打擊鬼", ["fighting"], 48),
        pm("修建老匠", ["fighting"], 48),
        pm("師父鼬", ["fighting"], 50),
      ],
    },
    {
      order: 3,
      role: "eliteFour",
      name: "越橘",
      specialty: "dark",
      party: [
        pm("頭巾混混", ["dark", "fighting"], 48),
        pm("酷豹", ["dark"], 48),
        pm("流氓鱷", ["ground", "dark"], 48),
        pm("劈斬司令", ["dark", "steel"], 50),
      ],
    },
    {
      order: 4,
      role: "eliteFour",
      name: "嘉德麗雅",
      specialty: "psychic",
      party: [
        pm("人造細胞卵", ["psychic"], 48),
        pm("夢夢蝕", ["psychic"], 48),
        pm("象徵鳥", ["psychic", "flying"], 48),
        pm("哥德小姐", ["psychic"], 50),
      ],
    },
  ],
  storyBattles: [
    {
      name: "N",
      role: "trainer",
      notes: "黑版 N 使用捷克羅姆、白版 N 使用萊希拉姆；其他五隻相同。索羅亞克有幻覺。",
      variants: [
        {
          id: "black",
          label: "黑版",
          party: [
            pm("捷克羅姆", ["dragon", "electric"], 52),
            pm("肋骨海龜", ["water", "rock"], 50),
            pm("雙倍多多冰", ["ice"], 50),
            pm("始祖大鳥", ["rock", "flying"], 50),
            pm("索羅亞克", ["dark"], 50),
            pm("齒輪怪", ["steel"], 50),
          ],
        },
        {
          id: "white",
          label: "白版",
          party: [
            pm("萊希拉姆", ["dragon", "fire"], 52),
            pm("肋骨海龜", ["water", "rock"], 50),
            pm("雙倍多多冰", ["ice"], 50),
            pm("始祖大鳥", ["rock", "flying"], 50),
            pm("索羅亞克", ["dark"], 50),
            pm("齒輪怪", ["steel"], 50),
          ],
        },
      ],
      order: 1,
      roleLabel: "主線決戰",
      location: "N 的城堡",
      recommendedTeams: [
        rec("沿用首次聯盟隊伍", "依對手雙屬性調整上場順序；不是重新組六隻。", [
          pm("頭巾混混", ["dark", "fighting"]),
          pm("雙倍多多冰", ["ice"]),
          pm("蟾蜍王", ["water", "ground"]),
        ]),
      ],
      party: [],
    },
    {
      name: "魁奇思",
      role: "trainer",
      party: [
        pm("死神棺", ["ghost"], 52),
        pm("爆炸頭水牛", ["normal"], 52),
        pm("蟾蜍王", ["water", "ground"], 52),
        pm("劈斬司令", ["dark", "steel"], 52),
        pm("麻麻鰻魚王", ["electric"], 52),
        pm("三首惡龍", ["dark", "dragon"], 54),
      ],
      notes: "麻麻鰻魚王與三首惡龍有漂浮，地面招無效。三首惡龍有龍之波動、大字爆炎、衝浪、真氣彈，需避免讓單一剋屬隊員硬吃補盲。",
      order: 2,
      roleLabel: "主線決戰",
      location: "N 的城堡",
      recommendedTeams: [
        rec("沿用首次聯盟隊伍", "依對手雙屬性調整上場順序；不是重新組六隻。", [
          pm("頭巾混混", ["dark", "fighting"]),
          pm("雙倍多多冰", ["ice"]),
          pm("蟾蜍王", ["water", "ground"]),
        ]),
      ],
    },
  ],
  champion: {
    role: "champion",
    name: "阿戴克",
    specialty: "bug",
    party: [
      pm("敏捷蟲", ["bug"], 75),
      pm("爆炸頭水牛", ["normal"], 75),
      pm("赤面龍", ["dragon"], 75),
      pm("雙倍多多冰", ["ice"], 75),
      pm("騎士蝸牛", ["bug", "steel"], 75),
      pm("火神蛾", ["bug", "fire"], 77),
    ],
    notes: "這是通關後重返聯盟的冠軍戰；不能接在上列首次 Lv48～50 四天王後當作首次五連戰。重返聯盟時四天王也會升級為六隻隊伍。",
    roleLabel: "冠軍（通關後）",
  },
  league: blackWhiteLeague,
};

for (const battle of [...blackWhiteGuide.gyms, ...blackWhiteGuide.eliteFour, ...(blackWhiteGuide.storyBattles || []), blackWhiteGuide.champion]) {
  assertBattle(battle);
}
assertLeague(blackWhiteLeague);
