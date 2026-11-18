/** 首次聯盟攻略；隊伍來源與版本核對見 output/guide-review/all-generations。 */
export const platinumLeague = {
  "intro": "以下為首次聯盟挑戰。鑽石／珍珠主力約Lv.58～66；白金約Lv.54～62。 四天王到冠軍須用同一支隊伍連戰，先補滿HP、狀態與PP。",
  "coverage": [
    {
      "attackType": "fire",
      "label": "火",
      "uses": "蟲、青銅鐘、路卡利歐"
    },
    {
      "attackType": "grass",
      "label": "草",
      "uses": "菊野水／地面及美納斯"
    },
    {
      "attackType": "water",
      "label": "水",
      "uses": "大葉與岩／地面"
    },
    {
      "attackType": "ice",
      "label": "冰",
      "uses": "烈咬陸鯊；白金天蠍王"
    },
    {
      "attackType": "ground",
      "label": "地面",
      "uses": "龍王蠍與路卡利歐"
    }
  ],
  "recommendedTeams": [
    {
      "label": "首次通關六隻範例",
      "reason": "御三家依開局替換；其餘皆可於首次聯盟前取得，不要求通訊進化。候選不是必須全練，優先補自己隊伍缺少的攻擊屬性。",
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
          ],
          "obtain": "姆克兒進化，Lv.34姆克鷹"
        },
        {
          "name": "倫琴貓",
          "types": [
            "electric"
          ],
          "obtain": "小貓怪進化，Lv.30倫琴貓"
        },
        {
          "name": "浮潛鼬",
          "types": [
            "water"
          ],
          "obtain": "泳圈鼬Lv.26進化"
        },
        {
          "name": "羅絲雷朵",
          "types": [
            "grass",
            "poison"
          ],
          "obtain": "毒薔薇使用光之石（鋼鐵島可取得）"
        },
        {
          "name": "青銅鐘",
          "types": [
            "steel",
            "psychic"
          ],
          "obtain": "銅鏡怪Lv.33進化"
        }
      ]
    }
  ],
  "battles": {
    "eliteFour:1": {
      "intro": "阿柳：火、飛行打蟲；龍王蠍毒／惡只有地面弱點，超能力無效。白金的巨鉗螳螂怕火4倍，鑽石／珍珠則是毒粉蛾與狩獵鳳蝶。",
      "tips": [
        "此處是NDS鑽石／珍珠或白金，不含晶燦鑽石／明亮珍珠的特性、道具與配招。"
      ],
      "matchups": [
        {
          "opponent": "遠古巨蜓",
          "counters": "岩4倍，火、電、冰或飛行2倍。"
        },
        {
          "opponent": "巨鉗螳螂",
          "counters": "火4倍。"
        },
        {
          "opponent": "蜂女王",
          "counters": "岩4倍，火、電、冰或飛行2倍。"
        },
        {
          "opponent": "赫拉克羅斯",
          "counters": "飛行4倍；火或超能力2倍。"
        },
        {
          "opponent": "龍王蠍",
          "counters": "只有地面弱點；超能力無效。"
        }
      ]
    },
    "eliteFour:2": {
      "intro": "菊野：草招打水／地面4倍，水招處理岩／地面。白金的天蠍王地面／飛行怕冰4倍、免疫地面；不能套用到鑽石／珍珠名單。",
      "tips": [
        "此處是NDS鑽石／珍珠或白金，不含晶燦鑽石／明亮珍珠的特性、道具與配招。"
      ],
      "matchups": [
        {
          "opponent": "鯰魚王",
          "counters": "草4倍；電完全無效。"
        },
        {
          "opponent": "天蠍王",
          "counters": "冰4倍，水2倍；電與地面無效。"
        },
        {
          "opponent": "隆隆岩",
          "counters": "水或草4倍。"
        },
        {
          "opponent": "超甲狂犀",
          "counters": "水或草；堅硬岩石會降低效果絕佳招式傷害。"
        },
        {
          "opponent": "河馬獸",
          "counters": "水、草或冰。"
        }
      ]
    },
    "eliteFour:3": {
      "intro": "大葉：白金全隊火系，水／地面最有效；鑽石／珍珠混有大鋼蛇、隨風球、長耳兔，隨風球要用電／冰／惡／幽靈，地面無效。",
      "tips": [
        "此處是NDS鑽石／珍珠或白金，不含晶燦鑽石／明亮珍珠的特性、道具與配招。"
      ],
      "matchups": [
        {
          "opponent": "黑魯加",
          "counters": "水、地面、格鬥或岩。"
        },
        {
          "opponent": "火伊布",
          "counters": "水或地面。"
        },
        {
          "opponent": "烈焰馬",
          "counters": "水或地面。"
        },
        {
          "opponent": "烈焰猴",
          "counters": "水、地面、飛行或超能力。"
        },
        {
          "opponent": "鴨嘴炎獸",
          "counters": "水或地面。"
        }
      ]
    },
    "eliteFour:4": {
      "intro": "悟松：惡或幽靈打超能力；青銅鐘有飄浮，地面無效，火招才是弱點。鋼在第四世代還抵抗惡與幽靈，因此這兩類對青銅鐘僅等倍。",
      "tips": [
        "此處是NDS鑽石／珍珠或白金，不含晶燦鑽石／明亮珍珠的特性、道具與配招。"
      ],
      "matchups": [
        {
          "opponent": "魔牆人偶",
          "counters": "惡或幽靈；第四世代純超能力。"
        },
        {
          "opponent": "太陽伊布",
          "counters": "惡或幽靈。"
        },
        {
          "opponent": "青銅鐘",
          "counters": "火招；飄浮使地面無效。"
        },
        {
          "opponent": "胡地",
          "counters": "惡或幽靈；先判斷速度與血量。"
        },
        {
          "opponent": "艾路雷朵",
          "counters": "飛行或幽靈；惡招僅等倍。"
        }
      ]
    },
    "champion": {
      "intro": "竹蘭：第四世代花岩怪沒有屬性弱點，用可靠的等倍輸出。羅絲雷朵怕火／飛行／冰，路卡利歐怕火／地面／格鬥，美納斯怕電／草，烈咬陸鯊怕冰4倍但速度很高。白金的波克基斯是一般／飛行，鑽石／珍珠此位置是海兔獸（草4倍）。",
      "tips": [
        "此處是NDS鑽石／珍珠或白金，不含晶燦鑽石／明亮珍珠的特性、道具與配招。"
      ],
      "matchups": [
        {
          "opponent": "花岩怪",
          "counters": "第四世代沒有屬性弱點，以高威力等倍攻擊。"
        },
        {
          "opponent": "羅絲雷朵",
          "counters": "火、冰、飛行或超能力。"
        },
        {
          "opponent": "波克基斯",
          "counters": "電、冰或岩；第四世代為一般／飛行。"
        },
        {
          "opponent": "路卡利歐",
          "counters": "火、地面或格鬥。"
        },
        {
          "opponent": "美納斯",
          "counters": "電或草；留意自我再生。"
        },
        {
          "opponent": "烈咬陸鯊",
          "counters": "冰4倍；不能保證低等級一擊擊倒。"
        }
      ]
    }
  },
  "battleOrder": [
    {
      "battle": "阿柳",
      "leads": "阿柳：火、飛行打蟲；龍王蠍毒／惡只有地面弱點，超能力無效。白金的巨鉗螳螂怕火4倍，鑽石／珍珠則是毒粉蛾與狩獵鳳蝶。",
      "backup": "依上方實際對手屬性換人；保持冰、水、電等關鍵招的PP。"
    },
    {
      "battle": "菊野",
      "leads": "菊野：草招打水／地面4倍，水招處理岩／地面。白金的天蠍王地面／飛行怕冰4倍、免疫地面；不能套用到鑽石／珍珠名單。",
      "backup": "依上方實際對手屬性換人；保持冰、水、電等關鍵招的PP。"
    },
    {
      "battle": "大葉",
      "leads": "大葉：白金全隊火系，水／地面最有效；鑽石／珍珠混有大鋼蛇、隨風球、長耳兔，隨風球要用電／冰／惡／幽靈，地面無效。",
      "backup": "依上方實際對手屬性換人；保持冰、水、電等關鍵招的PP。"
    },
    {
      "battle": "悟松",
      "leads": "悟松：惡或幽靈打超能力；青銅鐘有飄浮，地面無效，火招才是弱點。鋼在第四世代還抵抗惡與幽靈，因此這兩類對青銅鐘僅等倍。",
      "backup": "依上方實際對手屬性換人；保持冰、水、電等關鍵招的PP。"
    },
    {
      "battle": "竹蘭",
      "leads": "竹蘭：第四世代花岩怪沒有屬性弱點，用可靠的等倍輸出。羅絲雷朵怕火／飛行／冰，路卡利歐怕火／地面／格鬥，美納斯怕電／草，烈咬陸鯊怕冰4倍但速度很高。白金的波克基斯是一般／飛行，鑽石／珍珠此位置是海兔獸（草4倍）。",
      "backup": "依上方實際對手屬性換人；保持冰、水、電等關鍵招的PP。"
    }
  ],
  "starterLineups": [
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
          ],
          "obtain": "姆克兒進化，Lv.34姆克鷹"
        },
        {
          "name": "倫琴貓",
          "types": [
            "electric"
          ],
          "obtain": "小貓怪進化，Lv.30倫琴貓"
        },
        {
          "name": "浮潛鼬",
          "types": [
            "water"
          ],
          "obtain": "泳圈鼬Lv.26進化"
        },
        {
          "name": "羅絲雷朵",
          "types": [
            "grass",
            "poison"
          ],
          "obtain": "毒薔薇使用光之石（鋼鐵島可取得）"
        },
        {
          "name": "青銅鐘",
          "types": [
            "steel",
            "psychic"
          ],
          "obtain": "銅鏡怪Lv.33進化"
        }
      ],
      "summary": "烈焰猴補火與格鬥，能處理青銅鐘、巨鉗螳螂及路卡利歐。"
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
          ],
          "obtain": "姆克兒進化，Lv.34姆克鷹"
        },
        {
          "name": "倫琴貓",
          "types": [
            "electric"
          ],
          "obtain": "小貓怪進化，Lv.30倫琴貓"
        },
        {
          "name": "浮潛鼬",
          "types": [
            "water"
          ],
          "obtain": "泳圈鼬Lv.26進化"
        },
        {
          "name": "羅絲雷朵",
          "types": [
            "grass",
            "poison"
          ],
          "obtain": "毒薔薇使用光之石（鋼鐵島可取得）"
        },
        {
          "name": "青銅鐘",
          "types": [
            "steel",
            "psychic"
          ],
          "obtain": "銅鏡怪Lv.33進化"
        }
      ],
      "summary": "帝王拿波補水／鋼；對烈咬陸鯊的地震要換走，別因抗龍就硬扛。"
    },
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
          ],
          "obtain": "姆克兒進化，Lv.34姆克鷹"
        },
        {
          "name": "倫琴貓",
          "types": [
            "electric"
          ],
          "obtain": "小貓怪進化，Lv.30倫琴貓"
        },
        {
          "name": "浮潛鼬",
          "types": [
            "water"
          ],
          "obtain": "泳圈鼬Lv.26進化"
        },
        {
          "name": "羅絲雷朵",
          "types": [
            "grass",
            "poison"
          ],
          "obtain": "毒薔薇使用光之石（鋼鐵島可取得）"
        },
        {
          "name": "青銅鐘",
          "types": [
            "steel",
            "psychic"
          ],
          "obtain": "銅鏡怪Lv.33進化"
        }
      ],
      "summary": "土台龜補地震打龍王蠍；冰系4倍弱點，慎防竹蘭冰凍光束。"
    }
  ],
  "moveSets": [
    {
      "pokemon": "姆克鷹",
      "role": "飛行與格鬥",
      "moves": [
        {
          "name": "近身戰",
          "use": "打一般、岩、鋼；用後雙防下降",
          "source": "level"
        },
        {
          "name": "飛翔",
          "use": "飛行輸出",
          "source": "hm",
          "sourceDetail": "HM02",
          "type": "flying"
        }
      ]
    },
    {
      "pokemon": "倫琴貓",
      "role": "電系補盲",
      "moves": [
        {
          "name": "電光",
          "use": "物理電招",
          "source": "level"
        },
        {
          "name": "咬碎",
          "use": "打超能力；留意反擊",
          "source": "level"
        }
      ]
    },
    {
      "pokemon": "浮潛鼬",
      "role": "水與冰補盲",
      "moves": [
        {
          "name": "衝浪",
          "use": "打火、地面、岩",
          "source": "hm",
          "sourceDetail": "HM03",
          "type": "water"
        },
        {
          "name": "冰凍牙",
          "use": "打烈咬陸鯊4倍；不保證一擊擊倒",
          "source": "tutor",
          "sourceDetail": "野原市招式回憶，需要心之鱗片",
          "type": "ice"
        },
        {
          "name": "咬碎",
          "use": "超能力／幽靈對策",
          "source": "level"
        }
      ]
    },
    {
      "pokemon": "羅絲雷朵",
      "role": "草系特攻",
      "moves": [
        {
          "name": "終極吸取",
          "use": "對水／地面；毒薔薇階段先學會",
          "source": "level"
        },
        {
          "name": "打草結",
          "use": "對重型目標",
          "source": "tm",
          "sourceDetail": "TM86（擊敗菜種）",
          "type": "grass"
        }
      ],
      "note": "先讓毒薔薇學會需要的升級招再使用光之石。"
    },
    {
      "pokemon": "青銅鐘",
      "role": "防禦支援",
      "moves": [
        {
          "name": "催眠術",
          "use": "有落空風險的控場",
          "source": "level"
        },
        {
          "name": "神通力",
          "use": "對毒／格鬥",
          "source": "level"
        },
        {
          "name": "光牆",
          "use": "減少特殊攻擊傷害",
          "source": "tm",
          "sourceDetail": "TM16（帷幕百貨）",
          "type": "psychic"
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
    "此處是NDS鑽石／珍珠或白金，不含晶燦鑽石／明亮珍珠的特性、道具與配招。",
    "第四世代招式逐項分物理／特殊，且尚無妖精屬性。",
    "鑽石／珍珠首次竹蘭最高Lv.66；白金最高Lv.62。不要把再戰名單或等級混入。"
  ],
  "conclusion": "先確認本版對手與自己的招式，再按弱點換人；建議等級與隊伍是準備方向，不代表保證勝利。"
};
