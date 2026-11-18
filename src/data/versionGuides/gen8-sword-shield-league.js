// 首次聯盟攻略；版本分支與招式來源已分開核對。
export const swordShieldLeague = {
  "intro": "伽勒爾使用冠軍盃；準決賽為瑪俐→赫普，決賽彼特插入後為露璃娜→彩豆（劍）或歐尼奧（盾）→奇巴納。其間有劇情中斷，最後再挑戰丹帝；不可描述成不能恢復的傳統五連戰。",
  "coverage": [
    {
      "attackType": "electric",
      "label": "電",
      "uses": "露璃娜水隊與丹帝噴火龍"
    },
    {
      "attackType": "fairy",
      "label": "妖精",
      "uses": "惡/格鬥與龍；鋁鋼龍只受等倍"
    },
    {
      "attackType": "ground",
      "label": "地面",
      "uses": "鋁鋼龍與堅盾劍怪"
    },
    {
      "attackType": "rock",
      "label": "岩石",
      "uses": "噴火龍4倍弱點"
    },
    {
      "attackType": "dark",
      "label": "惡",
      "uses": "盾版幽靈館主與丹帝幽靈成員"
    }
  ],
  "recommendedTeams": [
    {
      "label": "免交換通關範例",
      "reason": "六格是搭配範例，可沿用已練好的同職能隊友；不要求額外御三家。",
      "pokemon": [
        {
          "name": "你的御三家",
          "types": [],
          "obtain": "開局選擇",
          "moveNote": "進化至最終型，保留本系招"
        },
        {
          "name": "鋼鎧鴉",
          "types": [
            "flying",
            "steel"
          ],
          "obtain": "稚山雀→藍鴉38級進化",
          "moveNote": "鋼翼或其他已學鋼招；本系飛行打格鬥"
        },
        {
          "name": "逐電犬",
          "types": [
            "electric"
          ],
          "obtain": "來電汪25級進化",
          "moveNote": "電招打水飛；咬碎可補幽靈"
        },
        {
          "name": "龍頭地鼠",
          "types": [
            "ground",
            "steel"
          ],
          "obtain": "伽勒爾礦山螺釘地鼠31級進化",
          "moveNote": "挖洞/地震等地面招；後期可用鋼招"
        },
        {
          "name": "長毛巨魔",
          "types": [
            "dark",
            "fairy"
          ],
          "obtain": "迷光森林搗蛋小妖→詐唬魔32→長毛巨魔42",
          "moveNote": "靈魂衝擊等妖精招；格鬥打惡妖精僅等倍"
        },
        {
          "name": "暴噬龜",
          "types": [
            "water",
            "rock"
          ],
          "obtain": "2號道路咬咬龜22級進化",
          "moveNote": "岩石封鎖等已學岩石招；咬咬龜本體純水"
        }
      ]
    }
  ],
  "battles": {
    "eliteFour:2": {
      "intro": "妖精打惡；毒骷蛙4倍弱超能。長毛巨魔不弱格鬥，莫魯貝可換形態不改自身電惡屬性。",
      "tips": [
        "妖精打惡；毒骷蛙4倍弱超能。長毛巨魔不弱格鬥，莫魯貝可換形態不改自身電惡屬性。"
      ],
      "matchups": [
        {
          "opponent": "毒骷蛙",
          "counters": "超能（4倍）/飛行/地面"
        },
        {
          "opponent": "頭巾混混",
          "counters": "妖精（4倍）/飛行/格鬥"
        },
        {
          "opponent": "長毛巨魔",
          "counters": "鋼/毒/妖精；格鬥僅等倍"
        }
      ]
    },
    "eliteFour:1": {
      "intro": "末隻是被玩家御三家剋制的最終進化。鋼鎧鴉弱火電不弱冰，啪嚓海膽純電。",
      "tips": [
        "末隻是被玩家御三家剋制的最終進化。鋼鎧鴉弱火電不弱冰，啪嚓海膽純電。"
      ],
      "matchups": [
        {
          "opponent": "鋼鎧鴉",
          "counters": "電/火；冰招等倍"
        },
        {
          "opponent": "啪嚓海膽",
          "counters": "地面"
        }
      ]
    },
    "eliteFour:4": {
      "intro": "火/地面打大嘴娃，鋼或幽靈打其餘超能妖精。",
      "tips": [
        "火/地面打大嘴娃，鋼或幽靈打其餘超能妖精。"
      ],
      "matchups": [
        {
          "opponent": "大嘴娃",
          "counters": "火/地面；毒招無效"
        }
      ]
    },
    "eliteFour:5": {
      "intro": "大嘴鷗4倍弱電、暴噬龜4倍弱草；具甲武者草等倍。",
      "tips": [
        "大嘴鷗4倍弱電、暴噬龜4倍弱草；具甲武者草等倍。"
      ],
      "matchups": [
        {
          "opponent": "具甲武者",
          "counters": "電/飛行/岩石；草等倍"
        },
        {
          "opponent": "大嘴鷗",
          "counters": "電（4倍）/岩石"
        },
        {
          "opponent": "暴噬龜",
          "counters": "草（4倍）/電/格鬥/地面"
        }
      ]
    },
    "eliteFour:6": {
      "intro": "依遊戲版本分支，並非同時連戰。",
      "tips": [
        "依遊戲版本分支，並非同時連戰。"
      ],
      "matchups": [
        {
          "opponent": "摔角鷹人",
          "counters": "電/冰/超能/飛行/妖精"
        }
      ]
    },
    "eliteFour:3": {
      "intro": "此戰單打，多種天氣；冰打沙漠蜻蜓，地面/格鬥打鋁鋼龍，火招打鋁鋼龍僅等倍。",
      "tips": [
        "此戰單打，多種天氣；冰打沙漠蜻蜓，地面/格鬥打鋁鋼龍，火招打鋁鋼龍僅等倍。"
      ],
      "matchups": [
        {
          "opponent": "鋁鋼龍",
          "counters": "地面/格鬥；火/冰/妖精只是等倍"
        }
      ]
    },
    "champion": {
      "intro": "最後噴火龍65級超極巨化，需水/電/岩石；注意其日光束對水岩的反制。雙斧戰龍有毒/鋼補盲，妖精不是無條件安全。",
      "tips": [
        "最後噴火龍65級超極巨化，需水/電/岩石；注意其日光束對水岩的反制。雙斧戰龍有毒/鋼補盲，妖精不是無條件安全。"
      ],
      "matchups": [
        {
          "opponent": "多龍巴魯托",
          "counters": "冰/妖精/惡/幽靈；龍招互剋"
        },
        {
          "opponent": "雙斧戰龍",
          "counters": "冰/妖精；注意毒擊與鐵尾"
        },
        {
          "opponent": "蟾蜍王",
          "counters": "草（4倍）"
        },
        {
          "opponent": "噴火龍",
          "counters": "岩石（4倍）/水/電；注意日光束"
        }
      ],
      "variants": [
        {
          "id": "branch-1",
          "label": "玩家選敲音猴",
          "party": [
            {
              "name": "堅盾劍怪",
              "types": [
                "steel",
                "ghost"
              ],
              "level": 62
            },
            {
              "name": "多龍巴魯托",
              "types": [
                "dragon",
                "ghost"
              ],
              "level": 62
            },
            {
              "name": "雙斧戰龍",
              "types": [
                "dragon"
              ],
              "level": 63
            },
            {
              "name": "蟾蜍王",
              "types": [
                "water",
                "ground"
              ],
              "level": 64
            },
            {
              "name": "閃焰王牌",
              "types": [
                "fire"
              ],
              "level": 64
            },
            {
              "name": "噴火龍",
              "types": [
                "fire",
                "flying"
              ],
              "level": 65
            }
          ],
          "tips": [
            "最後噴火龍65級超極巨化，需水/電/岩石；注意其日光束對水岩的反制。雙斧戰龍有毒/鋼補盲，妖精不是無條件安全。"
          ],
          "matchups": [
            {
              "opponent": "多龍巴魯托",
              "counters": "冰/妖精/惡/幽靈；龍招互剋"
            },
            {
              "opponent": "雙斧戰龍",
              "counters": "冰/妖精；注意毒擊與鐵尾"
            },
            {
              "opponent": "蟾蜍王",
              "counters": "草（4倍）"
            },
            {
              "opponent": "噴火龍",
              "counters": "岩石（4倍）/水/電；注意日光束"
            }
          ]
        },
        {
          "id": "branch-2",
          "label": "玩家選炎兔兒",
          "party": [
            {
              "name": "堅盾劍怪",
              "types": [
                "steel",
                "ghost"
              ],
              "level": 62
            },
            {
              "name": "多龍巴魯托",
              "types": [
                "dragon",
                "ghost"
              ],
              "level": 62
            },
            {
              "name": "雙斧戰龍",
              "types": [
                "dragon"
              ],
              "level": 63
            },
            {
              "name": "踏冰人偶",
              "types": [
                "ice",
                "psychic"
              ],
              "level": 64
            },
            {
              "name": "千面避役",
              "types": [
                "water"
              ],
              "level": 64
            },
            {
              "name": "噴火龍",
              "types": [
                "fire",
                "flying"
              ],
              "level": 65
            }
          ],
          "tips": [
            "最後噴火龍65級超極巨化，需水/電/岩石；注意其日光束對水岩的反制。雙斧戰龍有毒/鋼補盲，妖精不是無條件安全。"
          ],
          "matchups": [
            {
              "opponent": "多龍巴魯托",
              "counters": "冰/妖精/惡/幽靈；龍招互剋"
            },
            {
              "opponent": "雙斧戰龍",
              "counters": "冰/妖精；注意毒擊與鐵尾"
            },
            {
              "opponent": "踏冰人偶",
              "counters": "火/岩石/蟲/惡/幽靈/鋼；格鬥等倍"
            },
            {
              "opponent": "噴火龍",
              "counters": "岩石（4倍）/水/電；注意日光束"
            }
          ]
        },
        {
          "id": "branch-3",
          "label": "玩家選淚眼蜥",
          "party": [
            {
              "name": "堅盾劍怪",
              "types": [
                "steel",
                "ghost"
              ],
              "level": 62
            },
            {
              "name": "多龍巴魯托",
              "types": [
                "dragon",
                "ghost"
              ],
              "level": 62
            },
            {
              "name": "雙斧戰龍",
              "types": [
                "dragon"
              ],
              "level": 63
            },
            {
              "name": "超甲狂犀",
              "types": [
                "ground",
                "rock"
              ],
              "level": 64
            },
            {
              "name": "轟擂金剛猩",
              "types": [
                "grass"
              ],
              "level": 64
            },
            {
              "name": "噴火龍",
              "types": [
                "fire",
                "flying"
              ],
              "level": 65
            }
          ],
          "tips": [
            "最後噴火龍65級超極巨化，需水/電/岩石；注意其日光束對水岩的反制。雙斧戰龍有毒/鋼補盲，妖精不是無條件安全。"
          ],
          "matchups": [
            {
              "opponent": "多龍巴魯托",
              "counters": "冰/妖精/惡/幽靈；龍招互剋"
            },
            {
              "opponent": "雙斧戰龍",
              "counters": "冰/妖精；注意毒擊與鐵尾"
            },
            {
              "opponent": "超甲狂犀",
              "counters": "水/草（4倍），若堅硬岩石會減傷"
            },
            {
              "opponent": "噴火龍",
              "counters": "岩石（4倍）/水/電；注意日光束"
            }
          ]
        }
      ]
    }
  },
  "battleOrder": [
    {
      "battle": "瑪俐（準決賽）",
      "leads": "妖精打惡；毒骷蛙4倍弱超能。長毛巨魔不弱格鬥，莫魯貝可換形態不改自身電惡屬性。",
      "backup": "依剩餘HP、狀態與PP換人"
    },
    {
      "battle": "赫普（準決賽）",
      "leads": "末隻是被玩家御三家剋制的最終進化。鋼鎧鴉弱火電不弱冰，啪嚓海膽純電。",
      "backup": "依剩餘HP、狀態與PP換人"
    },
    {
      "battle": "彼特（決賽前插入戰）",
      "leads": "火/地面打大嘴娃，鋼或幽靈打其餘超能妖精。",
      "backup": "依剩餘HP、狀態與PP換人"
    },
    {
      "battle": "露璃娜（決賽）",
      "leads": "大嘴鷗4倍弱電、暴噬龜4倍弱草；具甲武者草等倍。",
      "backup": "依剩餘HP、狀態與PP換人"
    },
    {
      "battle": "彩豆／歐尼奧（決賽）",
      "leads": "依遊戲版本分支，並非同時連戰。",
      "backup": "依剩餘HP、狀態與PP換人"
    },
    {
      "battle": "奇巴納（決賽）",
      "leads": "此戰單打，多種天氣；冰打沙漠蜻蜓，地面/格鬥打鋁鋼龍，火招打鋁鋼龍僅等倍。",
      "backup": "依剩餘HP、狀態與PP換人"
    },
    {
      "battle": "丹帝",
      "leads": "最後噴火龍65級超極巨化，需水/電/岩石；注意其日光束對水岩的反制。雙斧戰龍有毒/鋼補盲，妖精不是無條件安全。",
      "backup": "依玩家御三家分支準備"
    }
  ],
  "starterLineups": [
    {
      "starter": "敲音猴",
      "starterTypes": [
        "grass"
      ],
      "pokemon": [
        {
          "name": "轟擂金剛猩",
          "types": [
            "grass"
          ]
        },
        {
          "name": "鋼鎧鴉",
          "types": [
            "flying",
            "steel"
          ]
        },
        {
          "name": "逐電犬",
          "types": [
            "electric"
          ]
        },
        {
          "name": "龍頭地鼠",
          "types": [
            "ground",
            "steel"
          ]
        },
        {
          "name": "長毛巨魔",
          "types": [
            "dark",
            "fairy"
          ]
        },
        {
          "name": "暴噬龜",
          "types": [
            "water",
            "rock"
          ]
        }
      ],
      "summary": "保留已培養的御三家；其餘五格補齊電、地面、惡或幽靈等需求。下方逐戰重點與版本分支優先於單靠等級。"
    },
    {
      "starter": "炎兔兒",
      "starterTypes": [
        "fire"
      ],
      "pokemon": [
        {
          "name": "閃焰王牌",
          "types": [
            "fire"
          ]
        },
        {
          "name": "鋼鎧鴉",
          "types": [
            "flying",
            "steel"
          ]
        },
        {
          "name": "逐電犬",
          "types": [
            "electric"
          ]
        },
        {
          "name": "龍頭地鼠",
          "types": [
            "ground",
            "steel"
          ]
        },
        {
          "name": "長毛巨魔",
          "types": [
            "dark",
            "fairy"
          ]
        },
        {
          "name": "暴噬龜",
          "types": [
            "water",
            "rock"
          ]
        }
      ],
      "summary": "保留已培養的御三家；其餘五格補齊電、地面、惡或幽靈等需求。下方逐戰重點與版本分支優先於單靠等級。"
    },
    {
      "starter": "淚眼蜥",
      "starterTypes": [
        "water"
      ],
      "pokemon": [
        {
          "name": "千面避役",
          "types": [
            "water"
          ]
        },
        {
          "name": "鋼鎧鴉",
          "types": [
            "flying",
            "steel"
          ]
        },
        {
          "name": "逐電犬",
          "types": [
            "electric"
          ]
        },
        {
          "name": "龍頭地鼠",
          "types": [
            "ground",
            "steel"
          ]
        },
        {
          "name": "長毛巨魔",
          "types": [
            "dark",
            "fairy"
          ]
        },
        {
          "name": "暴噬龜",
          "types": [
            "water",
            "rock"
          ]
        }
      ],
      "summary": "保留已培養的御三家；其餘五格補齊電、地面、惡或幽靈等需求。下方逐戰重點與版本分支優先於單靠等級。"
    }
  ],
  "moveSets": [
    {
      "pokemon": "逐電犬",
      "role": "水/飛行對策",
      "moves": [
        {
          "name": "電光",
          "type": "electric",
          "use": "電系物理輸出",
          "source": "level"
        },
        {
          "name": "咬碎",
          "type": "dark",
          "use": "幽靈補盲",
          "source": "level"
        },
        {
          "name": "蹭蹭臉頰",
          "type": "electric",
          "use": "傷害並造成麻痺，地面/電系不適用",
          "source": "level"
        },
        {
          "name": "嬉鬧",
          "type": "fairy",
          "use": "Lv.55習得，前段以既有招式替代",
          "source": "level"
        }
      ],
      "note": "以下為可用招式範例；依現有招式與隊伍調整。"
    },
    {
      "pokemon": "龍頭地鼠",
      "role": "地面/鋼補盲",
      "moves": [
        {
          "name": "地震",
          "type": "ground",
          "use": "Lv.52習得；雙打會波及隊友",
          "source": "level"
        },
        {
          "name": "岩崩",
          "type": "rock",
          "use": "飛行補盲",
          "source": "level"
        },
        {
          "name": "金屬爪",
          "type": "steel",
          "use": "妖精補盲",
          "source": "level"
        },
        {
          "name": "劍舞",
          "type": "normal",
          "use": "提高物攻，確認安全才強化",
          "source": "level"
        }
      ],
      "note": "以下為可用招式範例；依現有招式與隊伍調整。"
    },
    {
      "pokemon": "鋼鎧鴉",
      "role": "飛行/鋼耐久位",
      "moves": [
        {
          "name": "啄鑽",
          "type": "flying",
          "use": "格鬥對策",
          "source": "level"
        },
        {
          "name": "鋼翼",
          "type": "steel",
          "use": "妖精對策",
          "source": "tm",
          "sourceDetail": "TM30"
        },
        {
          "name": "挑釁",
          "type": "dark",
          "use": "阻止對手變化招",
          "source": "level"
        },
        {
          "name": "鬼面",
          "type": "normal",
          "use": "降低對手速度",
          "source": "level"
        }
      ],
      "note": "以下為可用招式範例；依現有招式與隊伍調整。"
    },
    {
      "pokemon": "長毛巨魔",
      "role": "妖精/惡補盲",
      "moves": [
        {
          "name": "靈魂衝擊",
          "type": "fairy",
          "use": "進化時習得，並降低目標特攻",
          "source": "level"
        },
        {
          "name": "假跪真撞",
          "type": "dark",
          "use": "惡系輸出",
          "source": "level"
        },
        {
          "name": "嬉鬧",
          "type": "fairy",
          "use": "高威力妖精輸出",
          "source": "level"
        },
        {
          "name": "健美",
          "type": "fighting",
          "use": "提升物攻與防禦",
          "source": "tm",
          "sourceDetail": "TR48；曠野商人或對應極巨團體戰"
        }
      ],
      "note": "以下為可用招式範例；依現有招式與隊伍調整。"
    },
    {
      "pokemon": "暴噬龜",
      "role": "水與岩石輸出",
      "moves": [
        {
          "name": "水流裂破",
          "type": "water",
          "use": "Lv.48習得，攻擊火/岩/地面",
          "source": "level"
        },
        {
          "name": "岩石封鎖",
          "type": "rock",
          "use": "進化時習得，攻擊噴火龍4倍",
          "source": "level"
        },
        {
          "name": "咬住",
          "type": "dark",
          "use": "幽靈補盲",
          "source": "level"
        },
        {
          "name": "頭錘",
          "type": "normal",
          "use": "等倍補刀",
          "source": "level"
        }
      ],
      "note": "以下為可用招式範例；依現有招式與隊伍調整。"
    }
  ],
  "items": [
    {
      "name": "全復藥／厲害傷藥",
      "quantity": "依資金攜帶",
      "note": "戰前補滿；數量依是否使用道具與隊伍耐久調整。"
    },
    {
      "name": "萬靈藥",
      "quantity": "數個",
      "note": "處理主要異常狀態。"
    },
    {
      "name": "活力碎片",
      "quantity": "數個",
      "note": "可選；不適用自訂禁用復活挑戰。"
    },
    {
      "name": "PP回復道具",
      "quantity": "沿途收集",
      "note": "不是每個商店都可無限購買。"
    }
  ],
  "pitfalls": [
    "到丹帝戰時隊伍等級約60～65為建議，不是勝利保證。",
    "曠野TR販售/極巨團體戰取得不保證固定時點；配招若使用TR須寫取得方式。",
    "多龍巴魯托需60級且多龍梅西亞受天氣限制，不應當成中盤必備平民隊。"
  ],
  "conclusion": "先確認對手版本與完整隊伍，再挑能命中的招式；以技能來源、特性、持有道具和目前血量調整，不以推薦隊伍保證一擊通關。"
};
