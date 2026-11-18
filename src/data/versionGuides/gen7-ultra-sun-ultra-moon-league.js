// 首次聯盟攻略；版本分支與招式來源已分開核對。
export const ultraSunUltraMoonLeague = {
  "intro": "首次聯盟四天王可自由選擇順序；馬睿因取代日月的哈拉，最後對手是哈烏。與日月不同的霸主與隊伍不能只把等級上調。",
  "coverage": [
    {
      "attackType": "electric",
      "label": "電",
      "uses": "卡希麗的飛行隊"
    },
    {
      "attackType": "dark",
      "label": "惡",
      "uses": "阿塞蘿拉大部分幽靈；SM勾魂眼改妖精"
    },
    {
      "attackType": "ground",
      "label": "地面",
      "uses": "岩/鋼/電對策；不能命中飛行或飄浮"
    },
    {
      "attackType": "fairy",
      "label": "妖精",
      "uses": "格鬥、惡與龍；留意鋼/毒補盲"
    },
    {
      "attackType": "water",
      "label": "水",
      "uses": "岩石對策；USUM搖籃百合水等倍"
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
          "obtain": "開局選擇；不假設交換另兩隻",
          "moveNote": "保留本系招與適合的補盲"
        },
        {
          "name": "臭臭泥（阿羅拉）",
          "types": [
            "poison",
            "dark"
          ],
          "obtain": "阿羅拉臭泥38級進化",
          "moveNote": "惡招處理阿塞蘿拉"
        },
        {
          "name": "自爆磁怪",
          "types": [
            "electric",
            "steel"
          ],
          "obtain": "三合一磁怪磁場進化；日月波尼大峽谷，究極版另可火特力山",
          "moveNote": "放電；對飛行核心"
        },
        {
          "name": "重泥挽馬",
          "types": [
            "ground"
          ],
          "obtain": "泥驢仔30級進化",
          "moveNote": "地震為等級招；打鋼岩電"
        },
        {
          "name": "大嘴鷗",
          "types": [
            "water",
            "flying"
          ],
          "obtain": "長翅鷗25級進化",
          "moveNote": "水與飛行攻擊"
        },
        {
          "name": "蝶結萌虻",
          "types": [
            "bug",
            "fairy"
          ],
          "obtain": "萌虻25級進化",
          "moveNote": "妖精招補格鬥/惡/龍"
        }
      ]
    }
  ],
  "battles": {
    "eliteFour:1": {
      "intro": "究極版用馬睿因取代哈拉；火與地面主攻，劈斬司令4倍弱格鬥，自爆磁怪4倍弱地面但留意結實。",
      "tips": [
        "究極版用馬睿因取代哈拉；火與地面主攻，劈斬司令4倍弱格鬥，自爆磁怪4倍弱地面但留意結實。"
      ],
      "matchups": [
        {
          "opponent": "自爆磁怪",
          "counters": "地面（4倍）/火/格鬥；注意結實"
        },
        {
          "opponent": "三地鼠（阿羅拉）",
          "counters": "火/水/格鬥/地面"
        }
      ]
    },
    "eliteFour:2": {
      "intro": "水打太古盔甲/龐岩怪/鬃岩狼人；搖籃百合草岩使水草等倍，改格鬥或鋼。",
      "tips": [
        "水打太古盔甲/龐岩怪/鬃岩狼人；搖籃百合草岩使水草等倍，改格鬥或鋼。"
      ],
      "matchups": [
        {
          "opponent": "太古盔甲",
          "counters": "水/岩石/鋼"
        },
        {
          "opponent": "搖籃百合",
          "counters": "冰/格鬥/蟲/鋼；水草等倍"
        },
        {
          "opponent": "大朝北鼻",
          "counters": "地面/格鬥（4倍）；注意結實"
        }
      ]
    },
    "eliteFour:3": {
      "intro": "全隊怕惡與幽靈；噬沙堡爺受水招會提升防禦，使用特攻或草招更直接。",
      "tips": [
        "全隊怕惡與幽靈；噬沙堡爺受水招會提升防禦，使用特攻或草招更直接。"
      ],
      "matchups": [
        {
          "opponent": "破破舵輪",
          "counters": "火/冰/飛行/幽靈/惡"
        },
        {
          "opponent": "噬沙堡爺",
          "counters": "草/冰/惡/幽靈；水招會觸發遇水凝固加防禦"
        }
      ]
    },
    "eliteFour:4": {
      "intro": "全隊弱電；不要用地面打飛行，注意銃嘴大鳥鳥嘴加農炮灼傷接觸攻擊者。",
      "tips": [
        "全隊弱電；不要用地面打飛行，注意銃嘴大鳥鳥嘴加農炮灼傷接觸攻擊者。"
      ],
      "matchups": [
        {
          "opponent": "摔角鷹人",
          "counters": "電/冰/超能/飛行/妖精"
        },
        {
          "opponent": "花舞鳥（熱辣熱辣）",
          "counters": "岩石（4倍）/水/電"
        }
      ]
    },
    "champion": {
      "intro": "首次爭奪冠軍資格的最後一戰。哈烏御三家在本系相剋上被玩家剋制，伊布進化型補其弱點；阿羅拉雷丘怕地面/惡/幽靈，音波龍4倍弱冰。",
      "tips": [
        "首次爭奪冠軍資格的最後一戰。哈烏御三家在本系相剋上被玩家剋制，伊布進化型補其弱點；阿羅拉雷丘怕地面/惡/幽靈，音波龍4倍弱冰。"
      ],
      "matchups": [
        {
          "opponent": "雷丘（阿羅拉）",
          "counters": "地面/惡/幽靈"
        },
        {
          "opponent": "好勝毛蟹",
          "counters": "火/飛行/超能/鋼/妖精/格鬥"
        }
      ],
      "variants": [
        {
          "id": "branch-1",
          "label": "玩家選木木梟",
          "party": [
            {
              "name": "雷丘（阿羅拉）",
              "types": [
                "electric",
                "psychic"
              ],
              "level": 59
            },
            {
              "name": "火伊布",
              "types": [
                "fire"
              ],
              "level": 58
            },
            {
              "name": "肯泰羅",
              "types": [
                "normal"
              ],
              "level": 58
            },
            {
              "name": "音波龍",
              "types": [
                "dragon",
                "flying"
              ],
              "level": 58
            },
            {
              "name": "好勝毛蟹",
              "types": [
                "fighting",
                "ice"
              ],
              "level": 59
            },
            {
              "name": "西獅海壬",
              "types": [
                "water",
                "fairy"
              ],
              "level": 60
            }
          ],
          "tips": [
            "首次爭奪冠軍資格的最後一戰。哈烏御三家在本系相剋上被玩家剋制，伊布進化型補其弱點；阿羅拉雷丘怕地面/惡/幽靈，音波龍4倍弱冰。"
          ],
          "matchups": [
            {
              "opponent": "雷丘（阿羅拉）",
              "counters": "地面/惡/幽靈"
            },
            {
              "opponent": "好勝毛蟹",
              "counters": "火/飛行/超能/鋼/妖精/格鬥"
            }
          ]
        },
        {
          "id": "branch-2",
          "label": "玩家選火斑喵",
          "party": [
            {
              "name": "雷丘（阿羅拉）",
              "types": [
                "electric",
                "psychic"
              ],
              "level": 59
            },
            {
              "name": "水伊布",
              "types": [
                "water"
              ],
              "level": 58
            },
            {
              "name": "肯泰羅",
              "types": [
                "normal"
              ],
              "level": 58
            },
            {
              "name": "音波龍",
              "types": [
                "dragon",
                "flying"
              ],
              "level": 58
            },
            {
              "name": "好勝毛蟹",
              "types": [
                "fighting",
                "ice"
              ],
              "level": 59
            },
            {
              "name": "狙射樹梟",
              "types": [
                "grass",
                "ghost"
              ],
              "level": 60
            }
          ],
          "tips": [
            "首次爭奪冠軍資格的最後一戰。哈烏御三家在本系相剋上被玩家剋制，伊布進化型補其弱點；阿羅拉雷丘怕地面/惡/幽靈，音波龍4倍弱冰。"
          ],
          "matchups": [
            {
              "opponent": "雷丘（阿羅拉）",
              "counters": "地面/惡/幽靈"
            },
            {
              "opponent": "好勝毛蟹",
              "counters": "火/飛行/超能/鋼/妖精/格鬥"
            }
          ]
        },
        {
          "id": "branch-3",
          "label": "玩家選球球海獅",
          "party": [
            {
              "name": "雷丘（阿羅拉）",
              "types": [
                "electric",
                "psychic"
              ],
              "level": 59
            },
            {
              "name": "葉伊布",
              "types": [
                "grass"
              ],
              "level": 58
            },
            {
              "name": "肯泰羅",
              "types": [
                "normal"
              ],
              "level": 58
            },
            {
              "name": "音波龍",
              "types": [
                "dragon",
                "flying"
              ],
              "level": 58
            },
            {
              "name": "好勝毛蟹",
              "types": [
                "fighting",
                "ice"
              ],
              "level": 59
            },
            {
              "name": "熾焰咆哮虎",
              "types": [
                "fire",
                "dark"
              ],
              "level": 60
            }
          ],
          "tips": [
            "首次爭奪冠軍資格的最後一戰。哈烏御三家在本系相剋上被玩家剋制，伊布進化型補其弱點；阿羅拉雷丘怕地面/惡/幽靈，音波龍4倍弱冰。"
          ],
          "matchups": [
            {
              "opponent": "雷丘（阿羅拉）",
              "counters": "地面/惡/幽靈"
            },
            {
              "opponent": "好勝毛蟹",
              "counters": "火/飛行/超能/鋼/妖精/格鬥"
            }
          ]
        }
      ]
    }
  },
  "battleOrder": [
    {
      "battle": "馬睿因",
      "leads": "究極版用馬睿因取代哈拉；火與地面主攻，劈斬司令4倍弱格鬥，自爆磁怪4倍弱地面但留意結實。",
      "backup": "依剩餘HP、狀態與PP換人"
    },
    {
      "battle": "麗姿",
      "leads": "水打太古盔甲/龐岩怪/鬃岩狼人；搖籃百合草岩使水草等倍，改格鬥或鋼。",
      "backup": "依剩餘HP、狀態與PP換人"
    },
    {
      "battle": "阿塞蘿拉",
      "leads": "全隊怕惡與幽靈；噬沙堡爺受水招會提升防禦，使用特攻或草招更直接。",
      "backup": "依剩餘HP、狀態與PP換人"
    },
    {
      "battle": "卡希麗",
      "leads": "全隊弱電；不要用地面打飛行，注意銃嘴大鳥鳥嘴加農炮灼傷接觸攻擊者。",
      "backup": "依剩餘HP、狀態與PP換人"
    },
    {
      "battle": "哈烏",
      "leads": "首次爭奪冠軍資格的最後一戰。哈烏御三家在本系相剋上被玩家剋制，伊布進化型補其弱點；阿羅拉雷丘怕地面/惡/幽靈，音波龍4倍弱冰。",
      "backup": "依玩家御三家分支準備"
    }
  ],
  "starterLineups": [
    {
      "starter": "木木梟",
      "starterTypes": [
        "grass",
        "flying"
      ],
      "pokemon": [
        {
          "name": "狙射樹梟",
          "types": [
            "grass",
            "ghost"
          ]
        },
        {
          "name": "臭臭泥（阿羅拉）",
          "types": [
            "poison",
            "dark"
          ]
        },
        {
          "name": "自爆磁怪",
          "types": [
            "electric",
            "steel"
          ]
        },
        {
          "name": "重泥挽馬",
          "types": [
            "ground"
          ]
        },
        {
          "name": "大嘴鷗",
          "types": [
            "water",
            "flying"
          ]
        },
        {
          "name": "蝶結萌虻",
          "types": [
            "bug",
            "fairy"
          ]
        }
      ],
      "summary": "保留已培養的御三家；其餘五格補齊電、地面、惡或幽靈等需求。下方逐戰重點與版本分支優先於單靠等級。"
    },
    {
      "starter": "火斑喵",
      "starterTypes": [
        "fire"
      ],
      "pokemon": [
        {
          "name": "熾焰咆哮虎",
          "types": [
            "fire",
            "dark"
          ]
        },
        {
          "name": "臭臭泥（阿羅拉）",
          "types": [
            "poison",
            "dark"
          ]
        },
        {
          "name": "自爆磁怪",
          "types": [
            "electric",
            "steel"
          ]
        },
        {
          "name": "重泥挽馬",
          "types": [
            "ground"
          ]
        },
        {
          "name": "大嘴鷗",
          "types": [
            "water",
            "flying"
          ]
        },
        {
          "name": "蝶結萌虻",
          "types": [
            "bug",
            "fairy"
          ]
        }
      ],
      "summary": "保留已培養的御三家；其餘五格補齊電、地面、惡或幽靈等需求。下方逐戰重點與版本分支優先於單靠等級。"
    },
    {
      "starter": "球球海獅",
      "starterTypes": [
        "water"
      ],
      "pokemon": [
        {
          "name": "西獅海壬",
          "types": [
            "water",
            "fairy"
          ]
        },
        {
          "name": "臭臭泥（阿羅拉）",
          "types": [
            "poison",
            "dark"
          ]
        },
        {
          "name": "自爆磁怪",
          "types": [
            "electric",
            "steel"
          ]
        },
        {
          "name": "重泥挽馬",
          "types": [
            "ground"
          ]
        },
        {
          "name": "大嘴鷗",
          "types": [
            "water",
            "flying"
          ]
        },
        {
          "name": "蝶結萌虻",
          "types": [
            "bug",
            "fairy"
          ]
        }
      ],
      "summary": "保留已培養的御三家；其餘五格補齊電、地面、惡或幽靈等需求。下方逐戰重點與版本分支優先於單靠等級。"
    }
  ],
  "moveSets": [
    {
      "pokemon": "自爆磁怪",
      "role": "卡希麗的電系對策",
      "moves": [
        {
          "name": "放電",
          "type": "electric",
          "use": "攻擊飛行系",
          "source": "level"
        },
        {
          "name": "加農光炮",
          "type": "steel",
          "use": "攻擊岩石或妖精",
          "source": "level"
        },
        {
          "name": "電磁波",
          "type": "electric",
          "use": "控速；對地面和電系無效",
          "source": "tm",
          "sourceDetail": "TM73"
        },
        {
          "name": "光牆",
          "type": "psychic",
          "use": "減少特殊傷害",
          "source": "tm",
          "sourceDetail": "TM16"
        }
      ],
      "note": "以下為可用招式範例；依現有招式與隊伍調整。"
    },
    {
      "pokemon": "臭臭泥（阿羅拉）",
      "role": "幽靈系對策",
      "moves": [
        {
          "name": "咬碎",
          "type": "dark",
          "use": "攻擊大部分幽靈",
          "source": "level"
        },
        {
          "name": "毒擊",
          "type": "poison",
          "use": "妖精補盲",
          "source": "tm",
          "sourceDetail": "TM84"
        },
        {
          "name": "劈瓦",
          "type": "fighting",
          "use": "岩石/鋼補盲，不能打幽靈",
          "source": "tm",
          "sourceDetail": "TM31"
        },
        {
          "name": "睡覺",
          "type": "psychic",
          "use": "回復但會睡眠兩回合",
          "source": "tm",
          "sourceDetail": "TM44"
        }
      ],
      "note": "以下為可用招式範例；依現有招式與隊伍調整。"
    },
    {
      "pokemon": "重泥挽馬",
      "role": "地面主攻",
      "moves": [
        {
          "name": "十萬馬力",
          "type": "ground",
          "use": "單體地面輸出",
          "source": "level"
        },
        {
          "name": "地震",
          "type": "ground",
          "use": "高威力地面招",
          "source": "level"
        },
        {
          "name": "重磅衝撞",
          "type": "steel",
          "use": "依體重差造成傷害",
          "source": "level"
        },
        {
          "name": "岩崩",
          "type": "rock",
          "use": "飛行補盲",
          "source": "tm",
          "sourceDetail": "TM80"
        }
      ],
      "note": "以下為可用招式範例；依現有招式與隊伍調整。"
    },
    {
      "pokemon": "大嘴鷗",
      "role": "水與飛行補盲",
      "moves": [
        {
          "name": "衝浪",
          "type": "water",
          "use": "攻擊岩石/地面",
          "source": "tm",
          "sourceDetail": "TM94"
        },
        {
          "name": "冰凍光束",
          "type": "ice",
          "use": "龍與飛行補盲",
          "source": "tm",
          "sourceDetail": "TM13"
        },
        {
          "name": "羽棲",
          "type": "flying",
          "use": "回復HP",
          "source": "tm",
          "sourceDetail": "TM19"
        },
        {
          "name": "飛翔",
          "type": "flying",
          "use": "飛行輸出，需兩回合",
          "source": "tm",
          "sourceDetail": "TM76"
        }
      ],
      "note": "以下為可用招式範例；依現有招式與隊伍調整。"
    },
    {
      "pokemon": "蝶結萌虻",
      "role": "妖精與蟲特殊輸出",
      "moves": [
        {
          "name": "魔法閃耀",
          "type": "fairy",
          "use": "攻擊惡/格鬥/龍",
          "source": "level"
        },
        {
          "name": "蟲鳴",
          "type": "bug",
          "use": "攻擊草/超能/惡；隔音會阻擋",
          "source": "level"
        },
        {
          "name": "吸取之吻",
          "type": "fairy",
          "use": "攻擊兼回復",
          "source": "level"
        },
        {
          "name": "麻痺粉",
          "type": "grass",
          "use": "控速；草系與電系等目標無效",
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
    "入場前恢復HP/PP並帶傷藥、萬靈藥、活力碎片；具體數量依道具使用習慣。",
    "六隻推薦為可替換範例，不要求取得另外兩隻御三家。",
    "刪除舊文的格鬥打幽靈、電氣球改屬性、縫影先制等錯誤。"
  ],
  "conclusion": "先確認對手版本與完整隊伍，再挑能命中的招式；以技能來源、特性、持有道具和目前血量調整，不以推薦隊伍保證一擊通關。"
};
