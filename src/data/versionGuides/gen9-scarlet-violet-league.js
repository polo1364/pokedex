/** 朱／紫首次冠軍測驗；來源與校正紀錄見 output/guide-review/all-generations。 */
export const scarletVioletLeague = {
  "intro": "取得八枚道館徽章後參加冠軍測驗，先完成面試再依序挑戰四天王；場間可使用背包回復道具。四天王打完後辛俐會在也慈戰前回復隊伍。也慈之後還要與妮莫完成最終戰，才結束勝利之路；本篇另有傳說之路、星塵之路與第零區。建議主力約 Lv.60～65，依配招與耐久調整。",
  "coverage": [
    {
      "attackType": "grass",
      "label": "草",
      "uses": "鯰魚王四倍、儲水土王太晶地面後二倍"
    },
    {
      "attackType": "water",
      "label": "水",
      "uses": "噴火駝四倍、晶光花太晶岩石後二倍；不能打儲水土王"
    },
    {
      "attackType": "fire",
      "label": "火",
      "uses": "波琵多數鋼系、也慈坐騎山羊與冰岩怪"
    },
    {
      "attackType": "electric",
      "label": "電",
      "uses": "姆克鷹、鋼鎧鴉、太晶飛行纏紅鶴與輕身鱈"
    },
    {
      "attackType": "ice",
      "label": "冰",
      "uses": "熱帶龍、七夕青鳥、音波龍、蘋裹龍四倍"
    },
    {
      "attackType": "fighting",
      "label": "格鬥",
      "uses": "仆斬將軍四倍；巨鍛匠太晶鋼後二倍"
    }
  ],
  "recommendedTeams": [
    {
      "label": "一般單機隊伍示例",
      "reason": "只帶你自己的御三家；用奧利瓦提供草、烈箭鷹提供火、哥達鴨提供水與冰招，巴布土撥與巨鍛匠補電／格鬥／妖精。角色重複可替換，但需保留儲水土王與龍系對策。",
      "pokemon": [
        {
          "name": "你的御三家最終進化",
          "types": []
        },
        {
          "name": "巴布土撥",
          "types": [
            "electric",
            "fighting"
          ],
          "obtain": "布土撥在 Let’s Go 模式走 1,000 步後升級",
          "moveNote": "以物理電招與近身戰補攻擊面。"
        },
        {
          "name": "奧利瓦",
          "types": [
            "grass",
            "normal"
          ],
          "obtain": "迷你芙 Lv.25、奧利紐 Lv.35 進化"
        },
        {
          "name": "烈箭鷹",
          "types": [
            "fire",
            "flying"
          ],
          "obtain": "火箭雀 Lv.35 進化",
          "moveNote": "火招打冰／鋼；凍原熊水流噴射、地震與浩大鯨水招要留意。"
        },
        {
          "name": "哥達鴨",
          "types": [
            "water"
          ],
          "obtain": "可達鴨 Lv.33 進化"
        },
        {
          "name": "巨鍛匠",
          "types": [
            "fairy",
            "steel"
          ],
          "obtain": "小鍛匠 Lv.24、巧鍛匠 Lv.38 進化",
          "moveNote": "鋼招處理謎擬Ｑ；妖精招打龍。"
        }
      ]
    }
  ],
  "battles": {
    "eliteFour:1": {
      "intro": "土王有儲水，禁止用水招打牠；太晶地面後用草或冰。",
      "tips": [
        "土王特性儲水，太晶地面後水招仍完全無效，推薦草／冰；鯰魚王草4倍、噴火駝水4倍。土王是毒地面，不是水地面。"
      ],
      "matchups": [
        {
          "opponent": "鯰魚王",
          "counters": "草招 4 倍"
        },
        {
          "opponent": "噴火駝",
          "counters": "水招 4 倍"
        },
        {
          "opponent": "頓甲",
          "counters": "水／草／冰招"
        },
        {
          "opponent": "三地鼠",
          "counters": "水／草／冰招"
        },
        {
          "opponent": "土王",
          "counters": "太晶地面＋儲水；草／冰招，水無效"
        }
      ]
    },
    "eliteFour:2": {
      "intro": "火招可處理鋼隊；青銅鐘飄浮與鋼鎧鴉飛行都免疫一般地面招。",
      "tips": [
        "青銅鐘飄浮、鋼鎧鴉飛行都免疫一般地面招；火系好用但需留意敵方地面／岩石招。巨鍛匠太晶鋼後火地面格鬥2倍。"
      ],
      "matchups": [
        {
          "opponent": "大王銅象",
          "counters": "火／格鬥／地面"
        },
        {
          "opponent": "自爆磁怪",
          "counters": "地面 4 倍；結實可能保留 1 HP"
        },
        {
          "opponent": "青銅鐘",
          "counters": "火／幽靈／惡；飄浮免地面"
        },
        {
          "opponent": "鋼鎧鴉",
          "counters": "火／電；地面無效"
        },
        {
          "opponent": "巨鍛匠",
          "counters": "太晶鋼後火／格鬥／地面"
        }
      ]
    },
    "eliteFour:3": {
      "intro": "冰招處理草飛與龍飛；電招不是對全隊都效果絕佳。",
      "tips": [
        "熱帶龍和七夕青鳥冰4倍而電等倍；電飛花舞鳥冰／岩石2倍、電等倍；纏紅鶴太晶飛行後電冰岩2倍。"
      ],
      "matchups": [
        {
          "opponent": "熱帶龍",
          "counters": "冰 4 倍"
        },
        {
          "opponent": "花舞鳥（啪滋啪滋風格）",
          "counters": "電／飛行；冰或岩石"
        },
        {
          "opponent": "七夕青鳥",
          "counters": "冰 4 倍"
        },
        {
          "opponent": "姆克鷹",
          "counters": "電／冰／岩石"
        },
        {
          "opponent": "纏紅鶴",
          "counters": "太晶飛行；電／冰／岩石"
        }
      ]
    },
    "eliteFour:4": {
      "intro": "戟脊龍太晶龍後弱冰、龍、妖精；毒藻龍可用冰／地面／超能。",
      "tips": [
        "朱與紫的八朔隊伍相同。戟脊龍太晶龍後冰／龍／妖精2倍，格鬥鋼等倍；熱交換不怕燒傷且被火招打中加物攻。毒藻龍對妖精只有等倍且有污泥炸彈威脅妖精。"
      ],
      "matchups": [
        {
          "opponent": "音波龍",
          "counters": "冰 4 倍"
        },
        {
          "opponent": "雙斧戰龍",
          "counters": "冰／妖精；留意鐵頭"
        },
        {
          "opponent": "毒藻龍",
          "counters": "地面／冰／超能；妖精等倍"
        },
        {
          "opponent": "蘋裹龍",
          "counters": "冰 4 倍"
        },
        {
          "opponent": "戟脊龍",
          "counters": "太晶龍；冰／妖精／龍"
        }
      ]
    },
    "champion": {
      "intro": "混合隊伍，按每隻切換打點；晶光花最後太晶岩石。",
      "tips": [
        "也慈使用多種屬性的隊伍。冰岩怪是一般形態純冰，輕身鱈水／超能；最後晶光花太晶岩石，水草格鬥地面鋼2倍。仆斬將軍格鬥4倍，火地面2倍。超能豔鴕可跟上對手能力提升，別無腦強化。"
      ],
      "matchups": [
        {
          "opponent": "超能豔鴕",
          "counters": "惡／幽靈／蟲；小心跟上能力提升"
        },
        {
          "opponent": "坐騎山羊",
          "counters": "火／飛行／冰／毒／蟲"
        },
        {
          "opponent": "輕身鱈",
          "counters": "電／草／惡／幽靈／蟲"
        },
        {
          "opponent": "冰岩怪",
          "counters": "火／格鬥／岩石／鋼；優先特殊攻擊"
        },
        {
          "opponent": "仆斬將軍",
          "counters": "格鬥 4 倍，火／地面 2 倍"
        },
        {
          "opponent": "晶光花",
          "counters": "太晶岩石；水／草／格鬥／地面／鋼"
        }
      ]
    }
  },
  "battleOrder": [
    {
      "battle": "辛俐",
      "leads": "奧利瓦處理鯰魚王；哥達鴨處理噴火駝",
      "backup": "太晶土王交給草／冰招"
    },
    {
      "battle": "波琵",
      "leads": "烈箭鷹火招",
      "backup": "巴布土撥格鬥；青銅鐘不可用地面"
    },
    {
      "battle": "青木",
      "leads": "哥達鴨冰招",
      "backup": "巴布土撥電招打姆克鷹與纏紅鶴"
    },
    {
      "battle": "八朔",
      "leads": "冰招與巨鍛匠妖精招",
      "backup": "毒藻龍改冰／地面／超能"
    },
    {
      "battle": "也慈",
      "leads": "依場上對手換打點",
      "backup": "格鬥留給仆斬將軍、水草留給晶光花"
    }
  ],
  "starterLineups": [
    {
      "starter": "新葉喵",
      "starterTypes": [
        "grass"
      ],
      "pokemon": [
        {
          "name": "魔幻假面喵",
          "types": [
            "grass",
            "dark"
          ]
        },
        {
          "name": "巴布土撥",
          "types": [
            "electric",
            "fighting"
          ],
          "obtain": "布土撥在 Let’s Go 模式走 1,000 步後升級",
          "moveNote": "以物理電招與近身戰補攻擊面。"
        },
        {
          "name": "奧利瓦",
          "types": [
            "grass",
            "normal"
          ],
          "obtain": "迷你芙 Lv.25、奧利紐 Lv.35 進化"
        },
        {
          "name": "烈箭鷹",
          "types": [
            "fire",
            "flying"
          ],
          "obtain": "火箭雀 Lv.35 進化",
          "moveNote": "火招打冰／鋼；凍原熊水流噴射、地震與浩大鯨水招要留意。"
        },
        {
          "name": "哥達鴨",
          "types": [
            "water"
          ],
          "obtain": "可達鴨 Lv.33 進化"
        },
        {
          "name": "巨鍛匠",
          "types": [
            "fairy",
            "steel"
          ],
          "obtain": "小鍛匠 Lv.24、巧鍛匠 Lv.38 進化",
          "moveNote": "鋼招處理謎擬Ｑ；妖精招打龍。"
        }
      ],
      "summary": "御三家只占一格，其餘五隻均可在帕底亞主線取得。確認草招處理儲水土王、火招處理鋼隊、冰／妖精打龍，格鬥打仆斬將軍；不需另外交換其他御三家。"
    },
    {
      "starter": "呆火鱷",
      "starterTypes": [
        "fire"
      ],
      "pokemon": [
        {
          "name": "骨紋巨聲鱷",
          "types": [
            "fire",
            "ghost"
          ]
        },
        {
          "name": "巴布土撥",
          "types": [
            "electric",
            "fighting"
          ],
          "obtain": "布土撥在 Let’s Go 模式走 1,000 步後升級",
          "moveNote": "以物理電招與近身戰補攻擊面。"
        },
        {
          "name": "奧利瓦",
          "types": [
            "grass",
            "normal"
          ],
          "obtain": "迷你芙 Lv.25、奧利紐 Lv.35 進化"
        },
        {
          "name": "烈箭鷹",
          "types": [
            "fire",
            "flying"
          ],
          "obtain": "火箭雀 Lv.35 進化",
          "moveNote": "火招打冰／鋼；凍原熊水流噴射、地震與浩大鯨水招要留意。"
        },
        {
          "name": "哥達鴨",
          "types": [
            "water"
          ],
          "obtain": "可達鴨 Lv.33 進化"
        },
        {
          "name": "巨鍛匠",
          "types": [
            "fairy",
            "steel"
          ],
          "obtain": "小鍛匠 Lv.24、巧鍛匠 Lv.38 進化",
          "moveNote": "鋼招處理謎擬Ｑ；妖精招打龍。"
        }
      ],
      "summary": "御三家只占一格，其餘五隻均可在帕底亞主線取得。確認草招處理儲水土王、火招處理鋼隊、冰／妖精打龍，格鬥打仆斬將軍；不需另外交換其他御三家。"
    },
    {
      "starter": "潤水鴨",
      "starterTypes": [
        "water"
      ],
      "pokemon": [
        {
          "name": "狂歡浪舞鴨",
          "types": [
            "water",
            "fighting"
          ]
        },
        {
          "name": "巴布土撥",
          "types": [
            "electric",
            "fighting"
          ],
          "obtain": "布土撥在 Let’s Go 模式走 1,000 步後升級",
          "moveNote": "以物理電招與近身戰補攻擊面。"
        },
        {
          "name": "奧利瓦",
          "types": [
            "grass",
            "normal"
          ],
          "obtain": "迷你芙 Lv.25、奧利紐 Lv.35 進化"
        },
        {
          "name": "烈箭鷹",
          "types": [
            "fire",
            "flying"
          ],
          "obtain": "火箭雀 Lv.35 進化",
          "moveNote": "火招打冰／鋼；凍原熊水流噴射、地震與浩大鯨水招要留意。"
        },
        {
          "name": "哥達鴨",
          "types": [
            "water"
          ],
          "obtain": "可達鴨 Lv.33 進化"
        },
        {
          "name": "巨鍛匠",
          "types": [
            "fairy",
            "steel"
          ],
          "obtain": "小鍛匠 Lv.24、巧鍛匠 Lv.38 進化",
          "moveNote": "鋼招處理謎擬Ｑ；妖精招打龍。"
        }
      ],
      "summary": "御三家只占一格，其餘五隻均可在帕底亞主線取得。確認草招處理儲水土王、火招處理鋼隊、冰／妖精打龍，格鬥打仆斬將軍；不需另外交換其他御三家。"
    }
  ],
  "moveSets": [
    {
      "pokemon": "巴布土撥",
      "role": "物理電／格鬥",
      "moves": [
        {
          "name": "瘋狂伏特",
          "use": "對飛行／水；有反作用傷害",
          "source": "level",
          "sourceDetail": "回想",
          "type": "electric"
        },
        {
          "name": "近身戰",
          "use": "打鋼與仆斬將軍；使用後雙防降低",
          "source": "level",
          "sourceDetail": "Lv.44",
          "type": "fighting"
        },
        {
          "name": "電光一閃",
          "use": "收殘血",
          "source": "level",
          "sourceDetail": "Lv.6",
          "type": "normal"
        },
        {
          "name": "電磁波",
          "use": "控速；地面／電系無效",
          "source": "level",
          "sourceDetail": "Lv.29",
          "type": "electric"
        }
      ]
    },
    {
      "pokemon": "骨紋巨聲鱷",
      "role": "呆火鱷開局的火／幽靈主力",
      "moves": [
        {
          "name": "閃焰高歌",
          "use": "火傷害並提高特攻",
          "source": "level",
          "sourceDetail": "進化時",
          "type": "fire"
        },
        {
          "name": "暗影球",
          "use": "打超能豔鴕與青銅鐘",
          "source": "level",
          "sourceDetail": "Lv.38",
          "type": "ghost"
        },
        {
          "name": "大地之力",
          "use": "補打地面弱點；不要對飄浮／飛行使用",
          "source": "tm",
          "sourceDetail": "TM133",
          "type": "ground"
        },
        {
          "name": "鬼火",
          "use": "降低可灼傷對手物理壓力；戟脊龍熱交換免疫",
          "source": "level",
          "sourceDetail": "Lv.47",
          "type": "fire"
        }
      ]
    },
    {
      "pokemon": "魔幻假面喵",
      "role": "新葉喵開局草／惡打點",
      "moves": [
        {
          "name": "千變萬花",
          "use": "處理鯰魚王與太晶土王",
          "source": "level",
          "sourceDetail": "進化時",
          "type": "grass"
        },
        {
          "name": "暗襲要害",
          "use": "惡系補盲",
          "source": "level",
          "sourceDetail": "Lv.38",
          "type": "dark"
        },
        {
          "name": "急速折返",
          "use": "攻擊後換場",
          "source": "level",
          "sourceDetail": "Lv.24",
          "type": "bug"
        },
        {
          "name": "嬉鬧",
          "use": "打龍；注意命中率",
          "source": "level",
          "sourceDetail": "Lv.47",
          "type": "fairy"
        }
      ]
    },
    {
      "pokemon": "土王",
      "role": "可替換的毒／地面耐久角色",
      "moves": [
        {
          "name": "毒擊",
          "use": "物理毒招",
          "source": "level",
          "sourceDetail": "Lv.24",
          "type": "poison"
        },
        {
          "name": "地震",
          "use": "地面打點；雙打會傷隊友",
          "source": "level",
          "sourceDetail": "Lv.48",
          "type": "ground"
        },
        {
          "name": "哈欠",
          "use": "施加睡眠壓力",
          "source": "level",
          "sourceDetail": "Lv.21",
          "type": "normal"
        },
        {
          "name": "健忘",
          "use": "提高特防",
          "source": "level",
          "sourceDetail": "進化時／回想",
          "type": "psychic"
        }
      ],
      "note": "毒／地面而非水／地面；自我再生要蛋招或模仿香草野餐，並非升級習得。"
    },
    {
      "pokemon": "墓揚犬",
      "role": "可替換的幽靈／妖精補位",
      "moves": [
        {
          "name": "潛靈奇襲",
          "use": "兩回合幽靈招；一般系無效",
          "source": "level",
          "sourceDetail": "Lv.46",
          "type": "ghost"
        },
        {
          "name": "嬉鬧",
          "use": "妖精招打龍",
          "source": "level",
          "sourceDetail": "Lv.36",
          "type": "fairy"
        },
        {
          "name": "咬碎",
          "use": "惡系打超能／幽靈",
          "source": "level",
          "sourceDetail": "Lv.28",
          "type": "dark"
        },
        {
          "name": "替身",
          "use": "消耗 HP 建替身",
          "source": "tm",
          "sourceDetail": "TM103",
          "type": "normal"
        }
      ],
      "note": "朱紫不會劍舞與暗影爪；不要混用其他作品招式表。"
    },
    {
      "pokemon": "哥達鴨",
      "role": "示例隊伍的水／冰特殊打點",
      "moves": [
        {
          "name": "衝浪",
          "use": "水系主力，不能打辛俐儲水土王",
          "source": "tm",
          "sourceDetail": "TM123",
          "type": "water"
        },
        {
          "name": "冰凍光束",
          "use": "打熱帶龍、七夕青鳥與龍隊",
          "source": "tm",
          "sourceDetail": "TM135",
          "type": "ice"
        }
      ],
      "note": "入場前準備好 TM 並確認習得；不是只有水招就能處理整個聯盟。"
    }
  ],
  "items": [
    {
      "name": "全復藥",
      "quantity": "20～30"
    },
    {
      "name": "厲害傷藥／好傷藥",
      "quantity": "20～25"
    },
    {
      "name": "萬靈藥",
      "quantity": "10～15"
    },
    {
      "name": "解麻藥",
      "quantity": "8～10"
    },
    {
      "name": "復活草",
      "quantity": "8～10"
    },
    {
      "name": "PP 回復",
      "quantity": "5～8"
    }
  ],
  "pitfalls": [
    "把拿滿八徽章當成已完成整個本篇。",
    "用水招打辛俐儲水土王，或用地面招打飄浮青銅鐘。",
    "忽略太晶後的防守屬性，仍按原本雙屬性選招。",
    "一隊塞入多隻開局御三家卻沒有交換來源。",
    "把青木道館隊伍和四天王隊伍混為一談。"
  ],
  "conclusion": "先準備草、水、火、電、冰／妖精與格鬥打點，再按各隻實際屬性、太晶與特性換人。四天王後也慈前會回復，勿把所有五場當成完全無休整；擊敗也慈後再去完成妮莫最終戰。"
};
