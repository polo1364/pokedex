// 首次聯盟攻略；版本分支與招式來源已分開核對。
export const brilliantDiamondShiningPearlLeague = {
  "intro": "此處為BDSP首次聯盟，四天王與竹蘭五場連戰。名單取自重製版首次隊伍，不能混入白金或通關後再戰。對手有持有道具、特性與完整配招，建議主力約60～66級並準備恢復道具。",
  "coverage": [
    {
      "attackType": "flying",
      "label": "飛行",
      "uses": "阿柳前四隻；赫拉克羅斯4倍"
    },
    {
      "attackType": "grass",
      "label": "草",
      "uses": "菊野沼王/鯰魚王與竹蘭海兔獸"
    },
    {
      "attackType": "dark",
      "label": "惡",
      "uses": "超能與幽靈；注意副屬性"
    },
    {
      "attackType": "ground",
      "label": "地面",
      "uses": "龍王蠍與路卡利歐；青銅鐘飄浮無效"
    },
    {
      "attackType": "ice",
      "label": "冰",
      "uses": "烈咬陸鯊；首次抗冰果減傷"
    },
    {
      "attackType": "electric",
      "label": "電",
      "uses": "隨風球與美納斯"
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
          "moveNote": "保留已培養主力"
        },
        {
          "name": "姆克鷹",
          "types": [
            "normal",
            "flying"
          ],
          "obtain": "姆克兒→姆克鳥→姆克鷹34級",
          "moveNote": "飛行招及近身戰"
        },
        {
          "name": "倫琴貓",
          "types": [
            "electric"
          ],
          "obtain": "202號道路小貓怪→勒克貓15→倫琴貓30",
          "moveNote": "電光/咬住；咬碎需56級，別預設前期已學會"
        },
        {
          "name": "海兔獸",
          "types": [
            "water",
            "ground"
          ],
          "obtain": "205號道路無殼海兔30級進化",
          "moveNote": "水之波動/大地之力等本系招"
        },
        {
          "name": "羅絲雷朵",
          "types": [
            "grass",
            "poison"
          ],
          "obtain": "毒薔薇使用鋼鐵島拾取光之石",
          "moveNote": "草招打沼王/鯰魚王/海兔獸"
        },
        {
          "name": "黑魯加",
          "types": [
            "dark",
            "fire"
          ],
          "obtain": "取得探險套裝後地下大洞窟熔岩等對應空洞",
          "moveNote": "火與惡招；需確認出現洞窟與已学招式"
        }
      ]
    }
  ],
  "battles": {
    "eliteFour:1": {
      "intro": "飛行/火打前四隻；赫拉克羅斯4倍弱飛行，蜂女王4倍弱岩。龍王蠍只弱地面且免疫超能。",
      "tips": [
        "飛行/火打前四隻；赫拉克羅斯4倍弱飛行，蜂女王4倍弱岩。龍王蠍只弱地面且免疫超能。"
      ],
      "matchups": [
        {
          "opponent": "龍王蠍",
          "counters": "地面；超能無效"
        }
      ]
    },
    "eliteFour:2": {
      "intro": "沼王儲水、水招無效；沼王/鯰魚王4倍弱草。其餘用水草；隆隆岩有結實。",
      "tips": [
        "沼王儲水、水招無效；沼王/鯰魚王4倍弱草。其餘用水草；隆隆岩有結實。"
      ],
      "matchups": [
        {
          "opponent": "沼王",
          "counters": "草（4倍）；菊野的儲水沼王免疫水"
        }
      ]
    },
    "eliteFour:3": {
      "intro": "火系只有兩隻；水打烈焰馬/大鋼蛇/烈焰猴，隨風球改電/惡，長耳兔改格鬥。",
      "tips": [
        "火系只有兩隻；水打烈焰馬/大鋼蛇/烈焰猴，隨風球改電/惡，長耳兔改格鬥。"
      ],
      "matchups": []
    },
    "eliteFour:4": {
      "intro": "麒麟奇免疫幽靈，魔牆人偶與恰雷姆對惡等倍。青銅鐘飄浮免疫地面，改火/惡/幽靈。",
      "tips": [
        "麒麟奇免疫幽靈，魔牆人偶與恰雷姆對惡等倍。青銅鐘飄浮免疫地面，改火/惡/幽靈。"
      ],
      "matchups": [
        {
          "opponent": "魔牆人偶",
          "counters": "鋼/毒/幽靈；惡招僅等倍"
        },
        {
          "opponent": "麒麟奇",
          "counters": "惡/蟲；幽靈無效"
        },
        {
          "opponent": "恰雷姆",
          "counters": "飛行/妖精/幽靈"
        },
        {
          "opponent": "青銅鐘",
          "counters": "火/惡/幽靈；此戰飄浮免疫地面"
        }
      ]
    },
    "champion": {
      "intro": "花岩怪弱妖精；海兔獸引水，水招無效且4倍弱草；美納斯火焰寶珠+神奇鱗片，優先特殊電/草攻擊。烈咬陸鯊4倍弱冰但抗冰果減首次冰傷，粗糙皮膚反傷接觸招，不能宣稱冰礫一擊必倒。",
      "tips": [
        "花岩怪弱妖精；海兔獸引水，水招無效且4倍弱草；美納斯火焰寶珠+神奇鱗片，優先特殊電/草攻擊。烈咬陸鯊4倍弱冰但抗冰果減首次冰傷，粗糙皮膚反傷接觸招，不能宣稱冰礫一擊必倒。"
      ],
      "matchups": [
        {
          "opponent": "花岩怪",
          "counters": "妖精；一般/格鬥/超能無效"
        },
        {
          "opponent": "海兔獸",
          "counters": "草（4倍）；本指南對手有引水時水招無效"
        },
        {
          "opponent": "美納斯",
          "counters": "優先特殊電/草招；火焰寶珠配神奇鱗片提高物防"
        },
        {
          "opponent": "烈咬陸鯊",
          "counters": "冰（4倍但抗冰果減首次傷害）或妖精；注意速度與粗糙皮膚"
        }
      ]
    }
  },
  "battleOrder": [
    {
      "battle": "阿柳",
      "leads": "飛行/火打前四隻；赫拉克羅斯4倍弱飛行，蜂女王4倍弱岩。龍王蠍只弱地面且免疫超能。",
      "backup": "依剩餘HP、狀態與PP換人"
    },
    {
      "battle": "菊野",
      "leads": "沼王儲水、水招無效；沼王/鯰魚王4倍弱草。其餘用水草；隆隆岩有結實。",
      "backup": "依剩餘HP、狀態與PP換人"
    },
    {
      "battle": "大葉",
      "leads": "火系只有兩隻；水打烈焰馬/大鋼蛇/烈焰猴，隨風球改電/惡，長耳兔改格鬥。",
      "backup": "依剩餘HP、狀態與PP換人"
    },
    {
      "battle": "悟松",
      "leads": "麒麟奇免疫幽靈，魔牆人偶與恰雷姆對惡等倍。青銅鐘飄浮免疫地面，改火/惡/幽靈。",
      "backup": "依剩餘HP、狀態與PP換人"
    },
    {
      "battle": "竹蘭",
      "leads": "花岩怪弱妖精；海兔獸引水，水招無效且4倍弱草；美納斯火焰寶珠+神奇鱗片，優先特殊電/草攻擊。烈咬陸鯊4倍弱冰但抗冰果減首次冰傷，粗糙皮膚反傷接觸招，不能宣稱冰礫一擊必倒。",
      "backup": "依玩家御三家分支準備"
    }
  ],
  "starterLineups": [
    {
      "starter": "草苗龜",
      "starterTypes": [
        "grass"
      ],
      "pokemon": [
        {
          "name": "土台龜",
          "types": [
            "grass",
            "ground"
          ]
        },
        {
          "name": "姆克鷹",
          "types": [
            "normal",
            "flying"
          ]
        },
        {
          "name": "倫琴貓",
          "types": [
            "electric"
          ]
        },
        {
          "name": "海兔獸",
          "types": [
            "water",
            "ground"
          ]
        },
        {
          "name": "羅絲雷朵",
          "types": [
            "grass",
            "poison"
          ]
        },
        {
          "name": "黑魯加",
          "types": [
            "dark",
            "fire"
          ]
        }
      ],
      "summary": "保留已培養的御三家；其餘五格補齊電、地面、惡或幽靈等需求。下方逐戰重點與版本分支優先於單靠等級。"
    },
    {
      "starter": "小火焰猴",
      "starterTypes": [
        "fire"
      ],
      "pokemon": [
        {
          "name": "烈焰猴",
          "types": [
            "fire",
            "fighting"
          ]
        },
        {
          "name": "姆克鷹",
          "types": [
            "normal",
            "flying"
          ]
        },
        {
          "name": "倫琴貓",
          "types": [
            "electric"
          ]
        },
        {
          "name": "海兔獸",
          "types": [
            "water",
            "ground"
          ]
        },
        {
          "name": "羅絲雷朵",
          "types": [
            "grass",
            "poison"
          ]
        },
        {
          "name": "黑魯加",
          "types": [
            "dark",
            "fire"
          ]
        }
      ],
      "summary": "保留已培養的御三家；其餘五格補齊電、地面、惡或幽靈等需求。下方逐戰重點與版本分支優先於單靠等級。"
    },
    {
      "starter": "波加曼",
      "starterTypes": [
        "water"
      ],
      "pokemon": [
        {
          "name": "帝王拿波",
          "types": [
            "water",
            "steel"
          ]
        },
        {
          "name": "姆克鷹",
          "types": [
            "normal",
            "flying"
          ]
        },
        {
          "name": "倫琴貓",
          "types": [
            "electric"
          ]
        },
        {
          "name": "海兔獸",
          "types": [
            "water",
            "ground"
          ]
        },
        {
          "name": "羅絲雷朵",
          "types": [
            "grass",
            "poison"
          ]
        },
        {
          "name": "黑魯加",
          "types": [
            "dark",
            "fire"
          ]
        }
      ],
      "summary": "保留已培養的御三家；其餘五格補齊電、地面、惡或幽靈等需求。下方逐戰重點與版本分支優先於單靠等級。"
    }
  ],
  "moveSets": [
    {
      "pokemon": "倫琴貓",
      "role": "水與飛行對策",
      "moves": [
        {
          "name": "電光",
          "type": "electric",
          "use": "物理電招",
          "source": "level"
        },
        {
          "name": "咬碎",
          "type": "dark",
          "use": "幽靈/超能補盲",
          "source": "level"
        },
        {
          "name": "充電",
          "type": "electric",
          "use": "提高特防並強化下一次電招；確認能承受對手攻擊再用",
          "source": "level"
        },
        {
          "name": "鬼面",
          "type": "normal",
          "use": "降低速度",
          "source": "level"
        }
      ],
      "note": "以下為可用招式範例；依現有招式與隊伍調整。"
    },
    {
      "pokemon": "海兔獸",
      "role": "水/地面及冰補盲",
      "moves": [
        {
          "name": "衝浪",
          "type": "water",
          "use": "火/岩/地面對策",
          "source": "tm",
          "sourceDetail": "TM95；神和鎮劇情"
        },
        {
          "name": "大地之力",
          "type": "ground",
          "use": "特殊地面輸出",
          "source": "level"
        },
        {
          "name": "冰凍光束",
          "type": "ice",
          "use": "烈咬陸鯊對策，注意抗冰果",
          "source": "tm",
          "sourceDetail": "TM13；帷幕百貨等來源"
        },
        {
          "name": "自我再生",
          "type": "normal",
          "use": "回復HP；需要時找回憶招式",
          "source": "level"
        }
      ],
      "note": "以下為可用招式範例；依現有招式與隊伍調整。"
    },
    {
      "pokemon": "姆克鷹",
      "role": "阿柳與格鬥輸出",
      "moves": [
        {
          "name": "勇鳥猛攻",
          "type": "flying",
          "use": "高威力但有反作用傷害",
          "source": "level"
        },
        {
          "name": "近身戰",
          "type": "fighting",
          "use": "進化時習得，會降低自身雙防",
          "source": "level"
        },
        {
          "name": "燕返",
          "type": "flying",
          "use": "不受命中降低影響",
          "source": "level"
        },
        {
          "name": "電光一閃",
          "type": "normal",
          "use": "先制補刀；打不到幽靈",
          "source": "level"
        }
      ],
      "note": "以下為可用招式範例；依現有招式與隊伍調整。"
    },
    {
      "pokemon": "黑魯加",
      "role": "火/惡補盲",
      "moves": [
        {
          "name": "噴射火焰",
          "type": "fire",
          "use": "阿柳/青銅鐘對策",
          "source": "tm",
          "sourceDetail": "TM35；帷幕百貨"
        },
        {
          "name": "惡之波動",
          "type": "dark",
          "use": "特殊惡系攻擊",
          "source": "tm",
          "sourceDetail": "TM79；冠軍之路"
        },
        {
          "name": "咬碎",
          "type": "dark",
          "use": "物理惡招替代",
          "source": "level"
        },
        {
          "name": "火焰牙",
          "type": "fire",
          "use": "物理火招替代",
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
    "海兔獸可帶TM13冰凍光束；冰招打烈咬陸鯊要計入抗冰果與速度。",
    "地下大洞窟捕獲黑魯加可補火惡；已有烈焰猴時可用其他能承接幽靈/超能的隊友替換。",
    "TM消耗使用，配給主力前先確認；秘傳功能靠寶可錶，不必為過圖固定占隊伍格。"
  ],
  "conclusion": "先確認對手版本與完整隊伍，再挑能命中的招式；以技能來源、特性、持有道具和目前血量調整，不以推薦隊伍保證一擊通關。"
};
