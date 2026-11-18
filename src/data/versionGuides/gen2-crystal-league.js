/** 首次聯盟攻略；隊伍來源與版本核對見 output/guide-review/all-generations。 */
export const crystalLeague = {
  "intro": "以下為首次聯盟挑戰。主力約Lv.42～50，渡最高Lv.50；建議依招式、速度與耐久調整。 四天王到冠軍須用同一支隊伍連戰，先補滿HP、狀態與PP。",
  "coverage": [
    {
      "attackType": "electric",
      "label": "電",
      "uses": "天然鳥、呆殼獸、黑暗鴉與暴鯉龍"
    },
    {
      "attackType": "ice",
      "label": "冰",
      "uses": "渡的三隻快龍"
    },
    {
      "attackType": "psychic",
      "label": "超能力",
      "uses": "毒系與希巴的格鬥隊"
    },
    {
      "attackType": "water",
      "label": "水",
      "uses": "大岩蛇、黑魯加、化石翼龍"
    },
    {
      "attackType": "fire",
      "label": "火",
      "uses": "迷唇姐、椰蛋樹、佛烈托斯"
    }
  ],
  "recommendedTeams": [
    {
      "label": "首次通關六隻範例",
      "reason": "御三家依開局替換；其餘皆可於首次聯盟前取得，不要求通訊進化。候選不是必須全練，優先補自己隊伍缺少的攻擊屬性。",
      "pokemon": [
        {
          "name": "火爆獸",
          "types": [
            "fire"
          ]
        },
        {
          "name": "三合一磁怪",
          "types": [
            "electric",
            "steel"
          ],
          "obtain": "38／39號道路小磁怪Lv.30進化"
        },
        {
          "name": "拉普拉斯",
          "types": [
            "water",
            "ice"
          ],
          "obtain": "星期五互連洞地下2F，需衝浪"
        },
        {
          "name": "勇基拉",
          "types": [
            "psychic"
          ],
          "obtain": "凱西Lv.16進化，不需通訊"
        },
        {
          "name": "隆隆石",
          "types": [
            "rock",
            "ground"
          ],
          "obtain": "小拳石Lv.25進化，不需通訊"
        },
        {
          "name": "大嘴雀",
          "types": [
            "normal",
            "flying"
          ],
          "obtain": "烈雀Lv.20進化"
        }
      ]
    }
  ],
  "battles": {
    "eliteFour:1": {
      "intro": "一樹：電招打天然鳥與呆殼獸，火招打迷唇姐、椰蛋樹。勇基拉不適合用超能力招與同系硬拚；準備解眠藥。",
      "tips": [
        "本表為首次城都聯盟；關都取得的卡比獸、黑暗鴉等不列入首次通關隊。"
      ],
      "matchups": [
        {
          "opponent": "天然鳥",
          "counters": "電、冰招；超能力招不剋牠。"
        },
        {
          "opponent": "迷唇姐",
          "counters": "火招；不要用格鬥硬打冰／超能力。"
        },
        {
          "opponent": "椰蛋樹",
          "counters": "火、冰或飛行；超能力招被抵抗。"
        },
        {
          "opponent": "呆殼獸",
          "counters": "電或草；留意特殊耐久。"
        },
        {
          "opponent": "天然鳥",
          "counters": "電、冰招；超能力招不剋牠。"
        }
      ]
    },
    "eliteFour:2": {
      "intro": "阿桔：超能力打阿利多斯、摩魯蛾、臭臭泥與叉字蝠；佛烈托斯蟲／鋼怕火4倍，超能力不剋鋼。小心劇毒、影子分身及自爆。",
      "tips": [
        "本表為首次城都聯盟；關都取得的卡比獸、黑暗鴉等不列入首次通關隊。"
      ],
      "matchups": [
        {
          "opponent": "阿利多斯",
          "counters": "超能力、火或飛行。"
        },
        {
          "opponent": "摩魯蛾",
          "counters": "超能力、火或飛行。"
        },
        {
          "opponent": "佛烈托斯",
          "counters": "火招4倍；沒火招時用高威力等倍特殊攻擊。"
        },
        {
          "opponent": "臭臭泥",
          "counters": "超能力或地面。"
        },
        {
          "opponent": "叉字蝠",
          "counters": "電、冰或超能力；地面無效。"
        }
      ]
    },
    "eliteFour:3": {
      "intro": "希巴：勇基拉用超能力對格鬥；大岩蛇交給拉普拉斯衝浪4倍傷害。勇基拉防禦低，不要在殘血時換入吃拳。",
      "tips": [
        "本表為首次城都聯盟；關都取得的卡比獸、黑暗鴉等不列入首次通關隊。"
      ],
      "matchups": [
        {
          "opponent": "戰舞郎",
          "counters": "超能力或飛行。"
        },
        {
          "opponent": "飛腿郎",
          "counters": "超能力或飛行。"
        },
        {
          "opponent": "快拳郎",
          "counters": "超能力或飛行，留意屬性拳。"
        },
        {
          "opponent": "大岩蛇",
          "counters": "水或草4倍。"
        },
        {
          "opponent": "怪力",
          "counters": "超能力或飛行；脆弱隊員勿殘血換入。"
        }
      ]
    },
    "eliteFour:4": {
      "intro": "梨花：月亮伊布用高威力等倍或格鬥攻擊；霸王花用火／飛行／超能力，黑暗鴉用電，黑魯加用水。耿鬼有毒屬性、怕超能力，但惡系月亮伊布及黑魯加完全免疫超能力。",
      "tips": [
        "本表為首次城都聯盟；關都取得的卡比獸、黑暗鴉等不列入首次通關隊。"
      ],
      "matchups": [
        {
          "opponent": "月亮伊布",
          "counters": "格鬥或高威力等倍攻擊；超能力完全無效。"
        },
        {
          "opponent": "霸王花",
          "counters": "火、冰、飛行或超能力。"
        },
        {
          "opponent": "耿鬼",
          "counters": "超能力或惡；心金／魂銀有飄浮，地面無效。"
        },
        {
          "opponent": "黑暗鴉",
          "counters": "電、冰或岩；超能力與地面無效。"
        },
        {
          "opponent": "黑魯加",
          "counters": "水、地面、格鬥或岩。"
        }
      ]
    },
    "champion": {
      "intro": "渡：暴鯉龍怕電4倍，三隻快龍怕冰4倍；化石翼龍用水或電，噴火龍用水／電／岩。快龍帶覆蓋招，先補滿拉普拉斯，不要保證一擊擊倒。",
      "tips": [
        "本表為首次城都聯盟；關都取得的卡比獸、黑暗鴉等不列入首次通關隊。"
      ],
      "matchups": [
        {
          "opponent": "暴鯉龍",
          "counters": "電4倍；普通形態是水／飛行。"
        },
        {
          "opponent": "快龍",
          "counters": "冰4倍；補滿主力血量再上場。"
        },
        {
          "opponent": "快龍",
          "counters": "冰4倍；補滿主力血量再上場。"
        },
        {
          "opponent": "化石翼龍",
          "counters": "水、電或冰。"
        },
        {
          "opponent": "噴火龍",
          "counters": "水、電或岩；岩石4倍。"
        },
        {
          "opponent": "快龍",
          "counters": "冰4倍；補滿主力血量再上場。"
        }
      ]
    }
  },
  "battleOrder": [
    {
      "battle": "一樹",
      "leads": "一樹：電招打天然鳥與呆殼獸，火招打迷唇姐、椰蛋樹。勇基拉不適合用超能力招與同系硬拚；準備解眠藥。",
      "backup": "依上方實際對手屬性換人；保持冰、水、電等關鍵招的PP。"
    },
    {
      "battle": "阿桔",
      "leads": "阿桔：超能力打阿利多斯、摩魯蛾、臭臭泥與叉字蝠；佛烈托斯蟲／鋼怕火4倍，超能力不剋鋼。小心劇毒、影子分身及自爆。",
      "backup": "依上方實際對手屬性換人；保持冰、水、電等關鍵招的PP。"
    },
    {
      "battle": "希巴",
      "leads": "希巴：勇基拉用超能力對格鬥；大岩蛇交給拉普拉斯衝浪4倍傷害。勇基拉防禦低，不要在殘血時換入吃拳。",
      "backup": "依上方實際對手屬性換人；保持冰、水、電等關鍵招的PP。"
    },
    {
      "battle": "梨花",
      "leads": "梨花：月亮伊布用高威力等倍或格鬥攻擊；霸王花用火／飛行／超能力，黑暗鴉用電，黑魯加用水。耿鬼有毒屬性、怕超能力，但惡系月亮伊布及黑魯加完全免疫超能力。",
      "backup": "依上方實際對手屬性換人；保持冰、水、電等關鍵招的PP。"
    },
    {
      "battle": "渡",
      "leads": "渡：暴鯉龍怕電4倍，三隻快龍怕冰4倍；化石翼龍用水或電，噴火龍用水／電／岩。快龍帶覆蓋招，先補滿拉普拉斯，不要保證一擊擊倒。",
      "backup": "依上方實際對手屬性換人；保持冰、水、電等關鍵招的PP。"
    }
  ],
  "starterLineups": [
    {
      "starter": "火球鼠",
      "starterTypes": [
        "fire"
      ],
      "pokemon": [
        {
          "name": "火爆獸",
          "types": [
            "fire"
          ]
        },
        {
          "name": "三合一磁怪",
          "types": [
            "electric",
            "steel"
          ],
          "obtain": "38／39號道路小磁怪Lv.30進化"
        },
        {
          "name": "拉普拉斯",
          "types": [
            "water",
            "ice"
          ],
          "obtain": "星期五互連洞地下2F，需衝浪"
        },
        {
          "name": "勇基拉",
          "types": [
            "psychic"
          ],
          "obtain": "凱西Lv.16進化，不需通訊"
        },
        {
          "name": "隆隆石",
          "types": [
            "rock",
            "ground"
          ],
          "obtain": "小拳石Lv.25進化，不需通訊"
        },
        {
          "name": "大嘴雀",
          "types": [
            "normal",
            "flying"
          ],
          "obtain": "烈雀Lv.20進化"
        }
      ],
      "summary": "火爆獸補火招，優先處理佛烈托斯、迷唇姐及椰蛋樹。"
    },
    {
      "starter": "小鋸鱷",
      "starterTypes": [
        "water"
      ],
      "pokemon": [
        {
          "name": "大力鱷",
          "types": [
            "water"
          ]
        },
        {
          "name": "三合一磁怪",
          "types": [
            "electric",
            "steel"
          ],
          "obtain": "38／39號道路小磁怪Lv.30進化"
        },
        {
          "name": "拉普拉斯",
          "types": [
            "water",
            "ice"
          ],
          "obtain": "星期五互連洞地下2F，需衝浪"
        },
        {
          "name": "勇基拉",
          "types": [
            "psychic"
          ],
          "obtain": "凱西Lv.16進化，不需通訊"
        },
        {
          "name": "隆隆石",
          "types": [
            "rock",
            "ground"
          ],
          "obtain": "小拳石Lv.25進化，不需通訊"
        },
        {
          "name": "大嘴雀",
          "types": [
            "normal",
            "flying"
          ],
          "obtain": "烈雀Lv.20進化"
        }
      ],
      "summary": "大力鱷是純水；水招補大岩蛇與黑魯加，快龍仍交給冰招。"
    },
    {
      "starter": "菊草葉",
      "starterTypes": [
        "grass"
      ],
      "pokemon": [
        {
          "name": "大竺葵",
          "types": [
            "grass"
          ]
        },
        {
          "name": "三合一磁怪",
          "types": [
            "electric",
            "steel"
          ],
          "obtain": "38／39號道路小磁怪Lv.30進化"
        },
        {
          "name": "拉普拉斯",
          "types": [
            "water",
            "ice"
          ],
          "obtain": "星期五互連洞地下2F，需衝浪"
        },
        {
          "name": "勇基拉",
          "types": [
            "psychic"
          ],
          "obtain": "凱西Lv.16進化，不需通訊"
        },
        {
          "name": "隆隆石",
          "types": [
            "rock",
            "ground"
          ],
          "obtain": "小拳石Lv.25進化，不需通訊"
        },
        {
          "name": "大嘴雀",
          "types": [
            "normal",
            "flying"
          ],
          "obtain": "烈雀Lv.20進化"
        }
      ],
      "summary": "大竺葵是純草；用光牆／反射壁等已學輔助，別用草招硬打火與飛行。"
    }
  ],
  "moveSets": [
    {
      "pokemon": "三合一磁怪",
      "role": "電系輸出",
      "moves": [
        {
          "name": "打雷",
          "use": "打水與飛行；命中率70，避免當成必中招",
          "source": "tm",
          "sourceDetail": "TM25（滿金遊戲城5500代幣）",
          "type": "electric"
        },
        {
          "name": "電磁波",
          "use": "降低對手速度",
          "source": "level"
        }
      ]
    },
    {
      "pokemon": "拉普拉斯",
      "role": "冰系打快龍、水系補盲",
      "moves": [
        {
          "name": "冰凍光束",
          "use": "打快龍4倍；金銀水晶Lv.36，心金魂銀Lv.32",
          "source": "level"
        },
        {
          "name": "衝浪",
          "use": "處理大岩蛇與火系",
          "source": "hm",
          "sourceDetail": "HM03",
          "type": "water"
        },
        {
          "name": "泰山壓頂",
          "use": "等倍輸出並可能麻痺",
          "source": "level"
        }
      ]
    },
    {
      "pokemon": "勇基拉",
      "role": "對付毒、格鬥",
      "moves": [
        {
          "name": "精神強念",
          "use": "打毒與格鬥；對惡系無效",
          "source": "level"
        },
        {
          "name": "自我再生",
          "use": "需在安全時機回血",
          "source": "level"
        }
      ]
    },
    {
      "pokemon": "隆隆石",
      "role": "物理與岩石補盲",
      "moves": [
        {
          "name": "地震",
          "use": "地面輸出；飄浮與飛行免疫",
          "source": "level"
        },
        {
          "name": "滾動",
          "use": "連續命中才增威力，不是穩定必中招",
          "source": "level"
        }
      ]
    },
    {
      "pokemon": "大嘴雀",
      "role": "飛行補位",
      "moves": [
        {
          "name": "啄鑽",
          "use": "打格鬥與草；注意對手岩石招",
          "source": "level"
        },
        {
          "name": "飛翔",
          "use": "可作旅行與飛行招",
          "source": "hm",
          "sourceDetail": "HM02",
          "type": "flying"
        }
      ]
    }
  ],
  "items": [
    {
      "name": "厲害傷藥／全復藥",
      "quantity": "依資金準備10～20個",
      "note": "在兩戰之間補滿血量與狀態"
    },
    {
      "name": "活力碎片",
      "quantity": "5～10個",
      "note": "戰鬥後先復活，再補血"
    },
    {
      "name": "萬靈藥",
      "quantity": "5～10個",
      "note": "催眠、麻痺、中毒等狀態"
    },
    {
      "name": "PP回復道具",
      "quantity": "保留已拾取的存量",
      "note": "一般商店無法無限購買，不要假設必有指定數量"
    }
  ],
  "pitfalls": [
    "本表為首次城都聯盟；關都取得的卡比獸、黑暗鴉等不列入首次通關隊。",
    "水晶沒有野生咩利羊，電系改用小磁怪；耿鬼、胡地與隆隆岩通常需要通訊進化。",
    "金／銀／水晶按屬性區分物理／特殊，雷電拳與冰凍拳都是特殊；心金／魂銀則依各招式分類。"
  ],
  "conclusion": "先確認本版對手與自己的招式，再按弱點換人；建議等級與隊伍是準備方向，不代表保證勝利。"
};
