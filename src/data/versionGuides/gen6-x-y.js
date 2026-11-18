import { pm, rec, assertBattle, assertLeague } from './helpers.js';
import { xyLeague } from './gen6-x-y-league.js';

/**
 * 首次主線攻略；特殊再戰階段另行標示。
 * 校正來源：
 * https://www.serebii.net/xy/gyms.shtml
 * https://www.serebii.net/xy/elitefour.shtml
 */
export const xyGuide = {
  id: "x-y",
  title: "寶可夢 X／Y",
  displayGeneration: 6,
  status: "complete",
  notes: "首次道館與聯盟。第六世代已有妖精；道館不使用 Mega 進化，可爾妮的 Mega 教學是另一場事件。",
  quickNavigation: true,
  gyms: [
    {
      order: 1,
      role: "gym",
      name: "紫羅蘭",
      location: "白檀市",
      badge: "蟲子徽章",
      badgeType: "bug",
      party: [
        pm("溜溜糖球", ["bug", "water"], 10),
        pm("彩粉蝶", ["bug", "flying"], 12),
      ],
      notes: "飛行與電招都能處理兩隻；溜溜糖球的水屬性讓火招只有一般效果。",
      strategy: {
        level: "10～14",
        summary: "飛行與電招都能處理兩隻；溜溜糖球的水屬性讓火招只有一般效果。",
        tips: ["小箭雀不必先進化就可學啄。", "3 號道路沒有可供此時捕捉的獨角犀牛。"],
      },
      recommendedTeams: [
        rec("可取得的對策（擇一培養）", "以下是候選，依開局與現有隊伍選擇；建議等級不是必勝保證。", [
          {
            name: "小箭雀",
            types: ["normal", "flying"],
            obtain: "2 號道路捕捉。",
            moveNote: "Lv10 啄。",
          },
          {
            name: "皮卡丘",
            types: ["electric"],
            obtain: "白檀森林低機率捕捉。",
            moveNote: "電擊打水／蟲與蟲／飛行。",
          },
        ]),
      ],
    },
    {
      order: 2,
      role: "gym",
      name: "查克洛",
      location: "遙香市",
      badge: "岩壁徽章",
      badgeType: "rock",
      party: [
        pm("冰雪龍", ["rock", "ice"], 25),
        pm("寶寶暴龍", ["rock", "dragon"], 25),
      ],
      notes: "格鬥或鋼招更直接；冰雪龍四倍弱格鬥與鋼。",
      strategy: {
        level: "24～28",
        summary: "格鬥或鋼招更直接；冰雪龍四倍弱格鬥與鋼。",
        tips: ["寶寶暴龍岩／龍，水與草招是一般效果。", "本戰前尚未取得可爾妮贈送的路卡利歐。"],
      },
      recommendedTeams: [
        rec("可取得的對策（擇一培養）", "以下是候選，依開局與現有隊伍選擇；建議等級不是必勝保證。", [
          {
            name: "腕力",
            types: ["fighting"],
            obtain: "閃耀洞窟捕捉。",
            moveNote: "空手劈等格鬥招對兩隻均有效。",
          },
          {
            name: "利歐路",
            types: ["fighting"],
            obtain: "22 號道路捕捉。",
            moveNote: "培養格鬥招；友情白天進化路卡利歐也可。",
          },
        ]),
      ],
    },
    {
      order: 3,
      role: "gym",
      name: "可爾妮",
      location: "娑羅市",
      badge: "打鬥徽章",
      badgeType: "fighting",
      party: [
        pm("功夫鼬", ["fighting"], 29),
        pm("豪力", ["fighting"], 28),
        pm("摔角鷹人", ["fighting", "flying"], 32),
      ],
      notes: "這是道館戰，不是精煉之塔的 Mega 路卡利歐教學。",
      strategy: {
        level: "29～33",
        summary: "這是道館戰，不是精煉之塔的 Mega 路卡利歐教學。",
        tips: [
          "第六世代已有妖精系，可用妖精／超能力／飛行招。",
          "豪力有岩石封鎖，火箭雀需留意。",
        ],
      },
      recommendedTeams: [
        rec("可取得的對策（擇一培養）", "以下是候選，依開局與現有隊伍選擇；建議等級不是必勝保證。", [
          {
            name: "奇魯莉安",
            types: ["psychic", "fairy"],
            obtain: "4 號道路拉魯拉絲 Lv20 進化；Lv30 可成沙奈朵。",
            moveNote: "超能力或妖精招。",
          },
          {
            name: "火箭雀",
            types: ["fire", "flying"],
            obtain: "小箭雀 Lv17 進化。",
            moveNote: "飛行招；不必勉強練至 Lv35 烈箭鷹。",
          },
        ]),
      ],
    },
    {
      order: 4,
      role: "gym",
      name: "福爺",
      location: "比翼市",
      badge: "植物徽章",
      badgeType: "grass",
      party: [
        pm("毽子棉", ["grass", "flying"], 30),
        pm("口呆花", ["grass", "poison"], 31),
        pm("坐騎山羊", ["grass"], 34),
      ],
      notes: "火、飛行可穩定覆蓋草系；注意口呆花毒屬性。",
      strategy: {
        level: "31～35",
        summary: "火、飛行可穩定覆蓋草系；注意口呆花毒屬性。",
        tips: ["毒招打草／毒口呆花只是一般效果。", "火箭雀還沒進化也能上場，不需更換整隊。"],
      },
      recommendedTeams: [
        rec("可取得的對策（擇一培養）", "以下是候選，依開局與現有隊伍選擇；建議等級不是必勝保證。", [
          {
            name: "火箭雀",
            types: ["fire", "flying"],
            obtain: "小箭雀 Lv17 進化，Lv35 成烈箭鷹。",
            moveNote: "火或飛行招。",
          },
          {
            name: "長尾火狐",
            types: ["fire"],
            obtain: "火狐狸開局 Lv16 進化。",
            moveNote: "火招，僅適用該開局。",
          },
        ]),
      ],
    },
    {
      order: 5,
      role: "gym",
      name: "希特隆",
      location: "密阿雷市",
      badge: "電壓徽章",
      badgeType: "electric",
      party: [
        pm("電飛鼠", ["electric", "flying"], 35),
        pm("三合一磁怪", ["electric", "steel"], 35),
        pm("光電傘蜥", ["electric", "normal"], 37),
      ],
      notes: "地面招打三合一磁怪與光電傘蜥；電飛鼠免疫地面。",
      strategy: {
        level: "35～39",
        summary: "地面招打三合一磁怪與光電傘蜥；電飛鼠免疫地面。",
        tips: ["三合一磁怪有結實；電飛鼠另用岩石招。", "光電傘蜥有乾燥皮膚，不要用水招回復它。"],
      },
      recommendedTeams: [
        rec("可取得的對策（擇一培養）", "以下是候選，依開局與現有隊伍選擇；建議等級不是必勝保證。", [
          {
            name: "混混鱷",
            types: ["ground", "dark"],
            obtain: "9 號道路黑眼鱷 Lv29 進化。",
            moveNote: "挖洞等地面招；配合岩石招打電飛鼠。",
          },
          {
            name: "路卡利歐",
            types: ["fighting", "steel"],
            obtain: "可爾妮在精煉之塔贈送。",
            moveNote: "格鬥招打三合一磁怪與光電傘蜥。",
          },
        ]),
      ],
    },
    {
      order: 6,
      role: "gym",
      name: "瑪綉",
      location: "香薰市",
      badge: "妖精徽章",
      badgeType: "fairy",
      party: [
        pm("大嘴娃", ["steel", "fairy"], 38),
        pm("魔牆人偶", ["psychic", "fairy"], 39),
        pm("仙子伊布", ["fairy"], 42),
      ],
      notes: "鋼招打魔牆人偶與仙子伊布；火或地面打大嘴娃。",
      strategy: {
        level: "39～43",
        summary: "鋼招打魔牆人偶與仙子伊布；火或地面打大嘴娃。",
        tips: [
          "瑪綉在道館戰不使用 Mega 進化。",
          "大嘴娃免疫毒；惡招對超能力／妖精的魔牆人偶只是一般效果。",
        ],
      },
      recommendedTeams: [
        rec("可取得的對策（擇一培養）", "以下是候選，依開局與現有隊伍選擇；建議等級不是必勝保證。", [
          {
            name: "路卡利歐",
            types: ["fighting", "steel"],
            obtain: "精煉之塔贈送；TM84 可在娑羅市購買。",
            moveNote: "教毒擊打仙子伊布／魔牆人偶；不要對免疫毒的大嘴娃使用。",
          },
          {
            name: "烈箭鷹",
            types: ["fire", "flying"],
            obtain: "火箭雀 Lv35 進化。",
            moveNote: "火招打大嘴娃。",
          },
        ]),
      ],
    },
    {
      order: 7,
      role: "gym",
      name: "葛吉花",
      location: "百刻市",
      badge: "靈力徽章",
      badgeType: "psychic",
      party: [
        pm("象徵鳥", ["psychic", "flying"], 44),
        pm("呆呆王", ["water", "psychic"], 45),
        pm("超能妙喵", ["psychic"], 48),
      ],
      notes: "惡與幽靈招覆蓋全隊；隊伍沒有烏賊王。",
      strategy: {
        level: "45～49",
        summary: "惡與幽靈招覆蓋全隊；隊伍沒有烏賊王。",
        tips: [
          "電招也能打象徵鳥與呆呆王。",
          "超能妙喵可能先放牆，別假定低傷害就是招式無效。",
        ],
      },
      recommendedTeams: [
        rec("可取得的對策（擇一培養）", "以下是候選，依開局與現有隊伍選擇；建議等級不是必勝保證。", [
          {
            name: "流氓鱷",
            types: ["ground", "dark"],
            obtain: "9 號道路黑眼鱷 → 混混鱷 Lv40 進化。",
            moveNote: "咬碎等惡招。",
          },
          {
            name: "雷丘",
            types: ["electric"],
            obtain: "白檀森林皮卡丘，學好電招後用 10 號道路雷之石。",
            moveNote: "電招對象徵鳥與呆呆王。",
          },
        ]),
      ],
    },
    {
      order: 8,
      role: "gym",
      name: "得撫",
      location: "映雪市",
      badge: "冰山徽章",
      badgeType: "ice",
      party: [
        pm("暴雪王", ["grass", "ice"], 56),
        pm("幾何雪花", ["ice"], 55),
        pm("冰岩怪", ["ice"], 59),
      ],
      notes: "暴雪王四倍弱火；冰岩怪是純冰，物防很高。",
      strategy: {
        level: "56～60",
        summary: "暴雪王四倍弱火；冰岩怪是純冰，物防很高。",
        tips: [
          "本戰王牌 Lv59，不是 Lv49。",
          "幾何雪花特防高，可用物理格鬥／鋼；冰岩怪可用特殊火招。",
        ],
      },
      recommendedTeams: [
        rec("可取得的對策（擇一培養）", "以下是候選，依開局與現有隊伍選擇；建議等級不是必勝保證。", [
          {
            name: "路卡利歐",
            types: ["fighting", "steel"],
            obtain: "精煉之塔贈送。",
            moveNote: "格鬥或鋼招。",
          },
          {
            name: "妖火紅狐",
            types: ["fire", "psychic"],
            obtain: "火狐狸開局 Lv36 最終進化；火／超能力。",
            moveNote: "特殊火招打冰岩怪；也可改用已培養的火系。",
          },
        ]),
      ],
    },
  ],
  eliteFour: [
    {
      order: 1,
      role: "eliteFour",
      name: "帕琦拉",
      specialty: "fire",
      party: [
        pm("火炎獅", ["fire", "normal"], 63),
        pm("煤炭龜", ["fire"], 63),
        pm("水晶燈火靈", ["ghost", "fire"], 63),
        pm("烈箭鷹", ["fire", "flying"], 65),
      ],
    },
    {
      order: 2,
      role: "eliteFour",
      name: "志米",
      specialty: "water",
      party: [
        pm("鋼炮臂蝦", ["water"], 63),
        pm("寶石海星", ["water", "psychic"], 63),
        pm("暴鯉龍", ["water", "flying"], 63),
        pm("龜足巨鎧", ["water", "rock"], 65),
      ],
    },
    {
      order: 3,
      role: "eliteFour",
      name: "雁鎧",
      specialty: "steel",
      party: [
        pm("鑰圈兒", ["steel", "fairy"], 63),
        pm("大朝北鼻", ["rock", "steel"], 63),
        pm("巨鉗螳螂", ["bug", "steel"], 63),
        pm("堅盾劍怪", ["steel", "ghost"], 65),
      ],
    },
    {
      order: 4,
      role: "eliteFour",
      name: "朵拉塞娜",
      specialty: "dragon",
      party: [
        pm("毒藻龍", ["poison", "dragon"], 63),
        pm("七夕青鳥", ["dragon", "flying"], 63),
        pm("赤面龍", ["dragon"], 63),
        pm("音波龍", ["flying", "dragon"], 65),
      ],
    },
  ],
  champion: {
    role: "champion",
    name: "卡露妮",
    specialty: "fairy",
    party: [
      pm("摔角鷹人", ["fighting", "flying"], 64),
      pm("怪顎龍", ["rock", "dragon"], 65),
      pm("冰雪巨龍", ["rock", "ice"], 65),
      pm("南瓜怪人", ["ghost", "grass"], 65),
      pm("黏美龍", ["dragon"], 66),
      pm("沙奈朵", ["psychic", "fairy"], 68),
    ],
    notes: "沙奈朵會 Mega 進化，Lv68；其他五隻不會在這場 Mega 進化。",
  },
  league: xyLeague,
};

for (const battle of [...xyGuide.gyms, ...xyGuide.eliteFour, ...(xyGuide.storyBattles || []), xyGuide.champion]) {
  assertBattle(battle);
}
assertLeague(xyLeague);
