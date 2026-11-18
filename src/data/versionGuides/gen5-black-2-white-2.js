import { pm, rec, assertBattle, assertLeague } from './helpers.js';
import { black2White2League } from './gen5-black-2-white-2-league.js';

/**
 * 首次主線攻略；特殊再戰階段另行標示。
 * 校正來源：
 * https://www.serebii.net/black2white2/gyms.shtml
 * https://www.serebii.net/black2white2/elitefour.shtml
 */
export const black2White2Guide = {
  id: "black-2-white-2",
  title: "寶可夢 黑2／白2",
  displayGeneration: 5,
  status: "complete",
  notes: "普通模式首次道館與聯盟；不混用挑戰模式或通關後再戰。第一館是黑連，最後冠軍是艾莉絲。",
  quickNavigation: true,
  gyms: [
    {
      order: 1,
      role: "gym",
      name: "黑連",
      location: "檜扇市",
      badge: "基礎徽章",
      badgeType: "normal",
      party: [
        pm("探探鼠", ["normal"], 11),
        pm("小約克", ["normal"], 13),
      ],
      notes: "別讓自我激勵疊太多；保住血量再收尾。",
      strategy: {
        level: "12～15",
        summary: "別讓自我激勵疊太多；保住血量再收尾。",
        tips: [
          "本頁為普通模式；不套用挑戰模式額外成員與等級。",
          "格鬥招有效，但利歐路要練到 Lv15 才有發勁，並非捕到就有。",
        ],
      },
      recommendedTeams: [
        rec("可取得的對策（擇一培養）", "以下是候選，依開局與現有隊伍選擇；建議等級不是必勝保證。", [
          {
            name: "小約克",
            types: ["normal"],
            obtain: "算木牧場捕捉。",
            moveNote: "一般主力先練至接近對手等級。",
          },
          {
            name: "利歐路",
            types: ["fighting"],
            obtain: "算木牧場低機率捕捉。",
            moveNote: "Lv15 發勁；屬可選的額外培養。",
          },
        ]),
      ],
    },
    {
      order: 2,
      role: "gym",
      name: "霍米加",
      location: "立湧市",
      badge: "毒性徽章",
      badgeType: "poison",
      party: [
        pm("瓦斯彈", ["poison"], 16),
        pm("車輪毬", ["bug", "poison"], 18),
      ],
      notes: "小磁怪的鋼屬性免疫毒招；瓦斯彈有漂浮，地面招無效。",
      strategy: {
        level: "16～20",
        summary: "小磁怪的鋼屬性免疫毒招；瓦斯彈有漂浮，地面招無效。",
        tips: ["飛行招只剋車輪毬的蟲屬性，不是剋毒。", "車輪毬會守住，留意 PP。"],
      },
      recommendedTeams: [
        rec("可取得的對策（擇一培養）", "以下是候選，依開局與現有隊伍選擇；建議等級不是必勝保證。", [
          {
            name: "小磁怪",
            types: ["electric", "steel"],
            obtain: "立湧聯合工業區捕捉。",
            moveNote: "以電招輸出，擋住毒招。",
          },
          {
            name: "卡蒂狗",
            types: ["fire"],
            obtain: "立湧聯合工業區捕捉。",
            moveNote: "火招對車輪毬有效。",
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
        pm("寶包繭", ["bug", "grass"], 22),
        pm("石居蟹", ["bug", "rock"], 22),
        pm("保母蟲", ["bug", "grass"], 24),
      ],
      notes: "火與飛行處理草／蟲；石居蟹另用水招。",
      strategy: {
        level: "22～26",
        summary: "火與飛行處理草／蟲；石居蟹另用水招。",
        tips: [
          "石居蟹有結實與岩石招，火或飛行隊員需注意。",
        ],
      },
      recommendedTeams: [
        rec("可取得的對策（擇一培養）", "以下是候選，依開局與現有隊伍選擇；建議等級不是必勝保證。", [
          {
            name: "卡蒂狗",
            types: ["fire"],
            obtain: "立湧聯合工業區捕捉。",
            moveNote: "火招處理寶包繭與保母蟲。",
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
        pm("電飛鼠", ["electric", "flying"], 28),
        pm("茸茸羊", ["electric"], 28),
        pm("雷電斑馬", ["electric"], 30),
      ],
      notes: "地面招處理茸茸羊與雷電斑馬；電飛鼠免疫地面。",
      strategy: {
        level: "28～32",
        summary: "地面招處理茸茸羊與雷電斑馬；電飛鼠免疫地面。",
        tips: ["準備岩石招打電飛鼠。", "雷電斑馬有蓄能焰襲，別只靠草、蟲或鋼。"],
      },
      recommendedTeams: [
        rec("可取得的對策（擇一培養）", "以下是候選，依開局與現有隊伍選擇；建議等級不是必勝保證。", [
          {
            name: "混混鱷",
            types: ["ground", "dark"],
            obtain: "4 號道路／沙漠地帶黑眼鱷 Lv29 進化。",
            moveNote: "地面招＋可用的岩石招。",
          },
          {
            name: "地幔岩",
            types: ["rock"],
            obtain: "古代秘道石丸子 Lv25 進化。",
            moveNote: "岩石招打電飛鼠。",
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
        pm("混混鱷", ["ground", "dark"], 31),
        pm("穿山王", ["ground"], 31),
        pm("龍頭地鼠", ["ground", "steel"], 33),
      ],
      notes: "水招覆蓋三隻；草招對龍頭地鼠只是一般效果。",
      strategy: {
        level: "31～35",
        summary: "水招覆蓋三隻；草招對龍頭地鼠只是一般效果。",
        tips: ["避免讓龍頭地鼠多次強化；保住水系主力。"],
      },
      recommendedTeams: [
        rec("可取得的對策（擇一培養）", "以下是候選，依開局與現有隊伍選擇；建議等級不是必勝保證。", [
          {
            name: "雙刃丸",
            types: ["water"],
            obtain: "水水獺開局持續培養。",
            moveNote: "水招主攻。",
          },
          {
            name: "鴨寶寶",
            types: ["water", "flying"],
            obtain: "帆巴大橋鳥影遇敵。",
            moveNote: "水招；不要把地面免疫當成免疫所有招。",
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
        pm("心蝙蝠", ["psychic", "flying"], 37),
        pm("盔甲鳥", ["steel", "flying"], 37),
        pm("舞天鵝", ["water", "flying"], 39),
      ],
      notes: "電招有效覆蓋全隊，舞天鵝四倍弱電。",
      strategy: {
        level: "37～41",
        summary: "電招有效覆蓋全隊，舞天鵝四倍弱電。",
        tips: [
          "盔甲鳥的結實可能留下 1 HP；不要預設秒殺。",
        ],
      },
      recommendedTeams: [
        rec("可取得的對策（擇一培養）", "以下是候選，依開局與現有隊伍選擇；建議等級不是必勝保證。", [
          {
            name: "電蜘蛛",
            types: ["bug", "electric"],
            obtain: "電石洞穴電電蟲 Lv36 進化。",
            moveNote: "自身電招。",
          },
          {
            name: "三合一磁怪",
            types: ["electric", "steel"],
            obtain: "立湧聯合工業區小磁怪 Lv30 進化。",
            moveNote: "電招主攻；仍要留意對手補盲。",
          },
        ]),
      ],
    },
    {
      order: 7,
      role: "gym",
      name: "夏卡",
      location: "雙龍市",
      badge: "傳說徽章",
      badgeType: "dragon",
      party: [
        pm("赤面龍", ["dragon"], 46),
        pm("沙漠蜻蜓", ["ground", "dragon"], 46),
        pm("雙斧戰龍", ["dragon"], 48),
      ],
      notes: "冰招對沙漠蜻蜓四倍，另外兩隻二倍。",
      strategy: {
        level: "46～50",
        summary: "冰招對沙漠蜻蜓四倍，另外兩隻二倍。",
        tips: [
          "此作主線不經雪花市道館；不能照搬黑白取得順序。",
          "雙斧戰龍會龍之舞，不要送太多強化回合。",
        ],
      },
      recommendedTeams: [
        rec("可取得的對策（擇一培養）", "以下是候選，依開局與現有隊伍選擇；建議等級不是必勝保證。", [
          {
            name: "拉普拉斯",
            types: ["water", "ice"],
            obtain: "村莊橋水面漣漪低機率遇到；需衝浪。",
            moveNote: "冰凍光束 Lv32；錯過可回憶。",
          },
          {
            name: "斧牙龍",
            types: ["dragon"],
            obtain: "吹寄洞穴牙牙 Lv38 進化。",
            moveNote: "龍招；自身也弱龍，需注意速度與血量。",
          },
        ]),
      ],
    },
    {
      order: 8,
      role: "gym",
      name: "西子伊",
      location: "青海波市",
      badge: "波浪徽章",
      badgeType: "water",
      party: [
        pm("肋骨海龜", ["water", "rock"], 49),
        pm("吼鯨王", ["water"], 49),
        pm("胖嘟嘟", ["water", "ghost"], 51),
      ],
      notes: "草招四倍打肋骨海龜；電招可覆蓋三隻。",
      strategy: {
        level: "49～53",
        summary: "草招四倍打肋骨海龜；電招可覆蓋三隻。",
        tips: [
          "肋骨海龜有結實與破殼；滿血時不保證一擊。",
          "胖嘟嘟的詛咒之軀可能封鎖招式，預留第二個攻擊手。",
        ],
      },
      recommendedTeams: [
        rec("可取得的對策（擇一培養）", "以下是候選，依開局與現有隊伍選擇；建議等級不是必勝保證。", [
          {
            name: "電蜘蛛",
            types: ["bug", "electric"],
            obtain: "電石洞穴電電蟲 Lv36 進化。",
            moveNote: "電招。",
          },
          {
            name: "君主蛇",
            types: ["grass"],
            obtain: "藤藤蛇 Lv36 進化，僅適用該開局。",
            moveNote: "草招，特別適合肋骨海龜。",
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
        pm("死神棺", ["ghost"], 56),
        pm("隨風球", ["ghost", "flying"], 56),
        pm("泥偶巨人", ["ground", "ghost"], 56),
        pm("水晶燈火靈", ["ghost", "fire"], 58),
      ],
    },
    {
      order: 2,
      role: "eliteFour",
      name: "連武",
      specialty: "fighting",
      party: [
        pm("投摔鬼", ["fighting"], 56),
        pm("打擊鬼", ["fighting"], 56),
        pm("師父鼬", ["fighting"], 56),
        pm("修建老匠", ["fighting"], 58),
      ],
    },
    {
      order: 3,
      role: "eliteFour",
      name: "越橘",
      specialty: "dark",
      party: [
        pm("酷豹", ["dark"], 56),
        pm("頭巾混混", ["dark", "fighting"], 56),
        pm("流氓鱷", ["ground", "dark"], 56),
        pm("劈斬司令", ["dark", "steel"], 58),
      ],
    },
    {
      order: 4,
      role: "eliteFour",
      name: "嘉德麗雅",
      specialty: "psychic",
      party: [
        pm("夢夢蝕", ["psychic"], 56),
        pm("人造細胞卵", ["psychic"], 56),
        pm("象徵鳥", ["psychic", "flying"], 56),
        pm("哥德小姐", ["psychic"], 58),
      ],
    },
  ],
  champion: {
    role: "champion",
    name: "艾莉絲",
    specialty: "dragon",
    party: [
      pm("三首惡龍", ["dark", "dragon"], 57),
      pm("赤面龍", ["dragon"], 57),
      pm("始祖大鳥", ["rock", "flying"], 57),
      pm("波士可多拉", ["steel", "rock"], 57),
      pm("拉普拉斯", ["water", "ice"], 57),
      pm("雙斧戰龍", ["dragon"], 59),
    ],
    notes: "普通模式首次聯盟。雙斧戰龍攜帶氣勢披帶；不要假定冰招可以直接一擊擊倒。隊伍另含岩石／飛行、鋼／岩石、水／冰。",
  },
  league: black2White2League,
};

for (const battle of [...black2White2Guide.gyms, ...black2White2Guide.eliteFour, ...(black2White2Guide.storyBattles || []), black2White2Guide.champion]) {
  assertBattle(battle);
}
assertLeague(black2White2League);
