/** 洗翠破關後戰鬥；對手與流程依原作資料校正。 */
const volo = {
  "order": 1,
  "role": "trainer",
  "name": "望羅",
  "location": "神奧神殿",
  "specialty": "mixed",
  "notes": "神奧神殿的望羅全隊 Lv.68。勝利後立即接騎拉帝納別種、起源兩場 Lv.70；三段之間沒有自由休整。",
  "party": [
    {
      "name": "花岩怪",
      "types": [
        "ghost",
        "dark"
      ],
      "level": 68
    },
    {
      "name": "羅絲雷朵",
      "types": [
        "grass",
        "poison"
      ],
      "level": 68
    },
    {
      "name": "波克基斯",
      "types": [
        "fairy",
        "flying"
      ],
      "level": 68
    },
    {
      "name": "風速狗",
      "types": [
        "fire",
        "rock"
      ],
      "level": 68
    },
    {
      "name": "路卡利歐",
      "types": [
        "fighting",
        "steel"
      ],
      "level": 68
    },
    {
      "name": "烈咬陸鯊",
      "types": [
        "dragon",
        "ground"
      ],
      "level": 68
    }
  ],
  "recommendedTeams": [
    {
      "label": "破關後穩定隊",
      "reason": "烈咬陸鯊高速物攻、洗翠黏美龍超高耐久、路卡利歐打點廣；保留冰/惡/妖精對付騎拉帝納。",
      "pokemon": [
        {
          "name": "烈咬陸鯊",
          "types": [
            "dragon",
            "ground"
          ]
        },
        {
          "name": "黏美龍",
          "types": [
            "dragon",
            "steel"
          ]
        },
        {
          "name": "路卡利歐",
          "types": [
            "fighting",
            "steel"
          ]
        },
        {
          "name": "帝牙盧卡",
          "types": [
            "steel",
            "dragon"
          ]
        },
        {
          "name": "冰伊布",
          "types": [
            "ice"
          ]
        },
        {
          "name": "月亮伊布",
          "types": [
            "dark"
          ]
        }
      ]
    },
    {
      "label": "耐久續戰隊",
      "reason": "依敵人屬性輪換；望羅的格鬥與地面招會威脅鋼系。保留冰、惡或妖精打騎拉帝納，不能只靠耐久硬扛。",
      "pokemon": [
        {
          "name": "黏美龍",
          "types": [
            "dragon",
            "steel"
          ]
        },
        {
          "name": "月亮伊布",
          "types": [
            "dark"
          ]
        },
        {
          "name": "冰伊布",
          "types": [
            "ice"
          ]
        },
        {
          "name": "帕路奇亞",
          "types": [
            "water",
            "dragon"
          ]
        },
        {
          "name": "路卡利歐",
          "types": [
            "fighting",
            "steel"
          ]
        },
        {
          "name": "烈咬陸鯊",
          "types": [
            "dragon",
            "ground"
          ]
        }
      ]
    }
  ]
};
const giratinaAltered = {
  "order": 2,
  "role": "legendary",
  "name": "騎拉帝納（別種型態）",
  "location": "神奧神殿",
  "specialty": "ghost",
  "notes": "望羅後立即出場的第一型態；擊敗後緊接起源型態，無場間回復。",
  "party": [
    {
      "name": "騎拉帝納",
      "types": [
        "ghost",
        "dragon"
      ],
      "level": 70
    }
  ],
  "recommendedTeams": [
    {
      "label": "冰／惡／妖精候選",
      "reason": "冰、惡、妖精、幽靈、龍招有效；騎拉帝納有波導彈與大地之力，月亮伊布或鋼系不是安全無傷的擋法。",
      "pokemon": [
        {
          "name": "冰伊布",
          "types": [
            "ice"
          ]
        },
        {
          "name": "仙子伊布",
          "types": [
            "fairy"
          ]
        },
        {
          "name": "月亮伊布",
          "types": [
            "dark"
          ]
        }
      ]
    }
  ]
};
const giratinaOrigin = {
  "order": 3,
  "role": "legendary",
  "name": "騎拉帝納（起源型態）",
  "location": "神奧神殿",
  "specialty": "ghost",
  "notes": "別種型態被擊敗後轉為起源型態再戰。兩型態均 Lv.70；這裡不能捕捉，勝利後到歸途洞窟另行捕捉。",
  "party": [
    {
      "name": "騎拉帝納",
      "types": [
        "ghost",
        "dragon"
      ],
      "level": 70
    }
  ],
  "recommendedTeams": [
    {
      "label": "冰／惡／妖精候選",
      "reason": "冰、惡、妖精、幽靈、龍招有效；騎拉帝納有波導彈與大地之力，月亮伊布或鋼系不是安全無傷的擋法。",
      "pokemon": [
        {
          "name": "冰伊布",
          "types": [
            "ice"
          ]
        },
        {
          "name": "仙子伊布",
          "types": [
            "fairy"
          ]
        },
        {
          "name": "月亮伊布",
          "types": [
            "dark"
          ]
        }
      ]
    }
  ]
};
export const arceusChampion = {
  "role": "champion",
  "name": "阿爾宙斯",
  "location": "神奧神殿",
  "specialty": "normal",
  "notes": "捕捉必要寶可夢後，在神奧神殿吹奏天界之笛。霏歐納、瑪納霏、謝米、達克萊伊與阿爾宙斯本身不列入先決清單；無需每頁研究滿分。首戰對戰階段 Lv.75，靠神秘鎮寶完成挑戰後獲贈阿爾宙斯。",
  "party": [
    {
      "name": "阿爾宙斯",
      "types": [
        "normal"
      ],
      "level": 75
    }
  ],
  "recommendedTeams": [
    {
      "label": "鎮撫與對戰空檔",
      "reason": "動作閃避與投鎮寶是主軸；出現對戰空檔可派寶可夢。不是削血後丟球捕捉。一般屬性弱格鬥，但要小心阿爾宙斯的超能力招。",
      "pokemon": [
        {
          "name": "路卡利歐",
          "types": [
            "fighting",
            "steel"
          ]
        },
        {
          "name": "黏美龍",
          "types": [
            "steel",
            "dragon"
          ]
        }
      ]
    }
  ]
};
export const legendsArceusLeague = {
  "intro": "望羅 Lv.68 六隻之後，立即接騎拉帝納別種與起源兩場 Lv.70；三段間不能自由休整，戰中使用回復道具仍會耗費行動。阿爾宙斯是之後完成必要捕捉清單才解鎖的獨立鎮撫挑戰，無需沿用同一隊。",
  "coverageTitle": "破關後必備攻擊面",
  "teamBlockTitle": "望羅與騎拉帝納連戰準備（阿爾宙斯可另行整隊）",
  "coverage": [
    {
      "attackType": "ice",
      "label": "冰",
      "uses": "打騎拉帝納龍系"
    },
    {
      "attackType": "dark",
      "label": "惡",
      "uses": "打騎拉帝納幽靈"
    },
    {
      "attackType": "fairy",
      "label": "妖精",
      "uses": "打龍系補刀"
    },
    {
      "attackType": "fighting",
      "label": "格鬥",
      "uses": "打一般／岩石"
    },
    {
      "attackType": "steel",
      "label": "鋼",
      "uses": "望羅隊伍抗性"
    },
    {
      "attackType": "dragon",
      "label": "龍",
      "uses": "望羅龍系對拼"
    }
  ],
  "recommendedTeams": [
    {
      "label": "穩定破關後隊",
      "reason": "Lv.70～75 較穩；Lv.80 更輕鬆。黏美龍拖戰、烈咬陸鯊輸出、冰伊布專打騎拉帝納，月亮伊布補惡系。",
      "pokemon": [
        {
          "name": "烈咬陸鯊",
          "types": [
            "dragon",
            "ground"
          ]
        },
        {
          "name": "黏美龍",
          "types": [
            "dragon",
            "steel"
          ]
        },
        {
          "name": "路卡利歐",
          "types": [
            "fighting",
            "steel"
          ]
        },
        {
          "name": "冰伊布",
          "types": [
            "ice"
          ]
        },
        {
          "name": "月亮伊布",
          "types": [
            "dark"
          ]
        },
        {
          "name": "帕路奇亞",
          "types": [
            "water",
            "dragon"
          ]
        }
      ]
    },
    {
      "label": "高穩定續戰",
      "reason": "帝牙盧卡／帕路奇亞抗性好；洗翠黏美龍極硬；不要把主力全耗在望羅前半。",
      "pokemon": [
        {
          "name": "黏美龍",
          "types": [
            "dragon",
            "steel"
          ]
        },
        {
          "name": "帝牙盧卡",
          "types": [
            "steel",
            "dragon"
          ]
        },
        {
          "name": "帕路奇亞",
          "types": [
            "water",
            "dragon"
          ]
        },
        {
          "name": "冰伊布",
          "types": [
            "ice"
          ]
        },
        {
          "name": "路卡利歐",
          "types": [
            "fighting",
            "steel"
          ]
        },
        {
          "name": "烈咬陸鯊",
          "types": [
            "dragon",
            "ground"
          ]
        }
      ]
    }
  ],
  "battleOrder": [
    {
      "battle": "望羅",
      "leads": "依六隻敵人切換剋制招",
      "backup": "保留冰／妖精與回復道具"
    },
    {
      "battle": "騎拉帝納（別種）",
      "leads": "冰伊布、仙子伊布",
      "backup": "注意波導彈、大地之力"
    },
    {
      "battle": "騎拉帝納（起源）",
      "leads": "冰／惡／妖精主力",
      "backup": "戰中回復會消耗行動"
    }
  ],
  "items": [
    {
      "name": "全復藥",
      "quantity": "依隊伍準備",
      "note": "戰中使用耗行動，並非免費場間回復"
    },
    {
      "name": "活力塊",
      "quantity": "數個備用",
      "note": "救回主力後仍要留意敵方下一次行動"
    },
    {
      "name": "厲害傷藥",
      "quantity": "數個備用",
      "note": "補回部分 HP"
    }
  ],
  "pitfalls": [
    "望羅前半耗光冰系主力，後面騎拉帝納會很痛苦。",
    "隊伍等級不足 65 時建議先回各區刷圖鑑練等。",
    "阿爾宙斯需先完成必要圖鑑，不是破關就能直接挑戰。"
  ],
  "conclusion": "先完成望羅→騎拉帝納別種→起源連戰，再前往歸途洞窟捕捉騎拉帝納並補必要圖鑑。阿爾宙斯為另一次鎮撫挑戰，勝利後獲贈。",
  "battles": {
    "eliteFour:1": {
      "intro": "神奧神殿的望羅全隊 Lv.68。勝利後立即接騎拉帝納別種、起源兩場 Lv.70；三段之間沒有自由休整。",
      "tips": [
        "花岩怪弱妖精；洗翠風速狗弱水與地面 4 倍。",
        "波克基斯飛行／妖精免疫地面與龍；烈咬陸鯊怕冰 4 倍。",
        "在擊倒最後一隻前評估 HP／PP；騎拉帝納會立刻接戰。"
      ],
      "matchups": [
        {
          "opponent": "花岩怪",
          "counters": "妖精"
        },
        {
          "opponent": "羅絲雷朵",
          "counters": "火／冰／飛行／超能"
        },
        {
          "opponent": "波克基斯",
          "counters": "電／冰／岩石／毒／鋼"
        },
        {
          "opponent": "風速狗",
          "counters": "水／地面 4 倍"
        },
        {
          "opponent": "路卡利歐",
          "counters": "火／格鬥／地面"
        },
        {
          "opponent": "烈咬陸鯊",
          "counters": "冰 4 倍／妖精"
        }
      ]
    },
    "eliteFour:2": {
      "intro": "望羅後立即出場的第一型態；擊敗後緊接起源型態，無場間回復。",
      "tips": [
        "弱冰、惡、妖精、幽靈、龍；不要因對方是幽靈而誤用一般或格鬥攻擊。",
        "看行動順序決定迅疾／剛猛；過度剛猛可能讓對手連續行動。"
      ],
      "matchups": [
        {
          "opponent": "騎拉帝納",
          "counters": "冰／惡／妖精等有效攻擊"
        }
      ]
    },
    "eliteFour:3": {
      "intro": "別種型態被擊敗後轉為起源型態再戰。兩型態均 Lv.70；這裡不能捕捉，勝利後到歸途洞窟另行捕捉。",
      "tips": [
        "保留有效打點的 PP，必要時在戰中用藥。",
        "捕捉要在後續委託的歸途洞窟；此處只需擊倒。"
      ],
      "matchups": [
        {
          "opponent": "騎拉帝納",
          "counters": "冰／惡／妖精等有效攻擊"
        }
      ]
    },
    "champion": {
      "intro": "捕捉必要寶可夢後，在神奧神殿吹奏天界之笛。霏歐納、瑪納霏、謝米、達克萊伊與阿爾宙斯本身不列入先決清單；無需每頁研究滿分。首戰對戰階段 Lv.75，靠神秘鎮寶完成挑戰後獲贈阿爾宙斯。",
      "tips": [
        "取得天界之笛後完成必要捕捉，不是只看到寶可夢。",
        "閃避光束、衝擊波與落下攻擊，在安全空檔丟神秘鎮寶。",
        "完成鎮撫後獲贈阿爾宙斯與傳說石板，不使用高級球捕捉。"
      ],
      "matchups": [
        {
          "opponent": "阿爾宙斯",
          "counters": "鎮寶與閃避；對戰空檔再派寶可夢"
        }
      ]
    }
  }
};
export const legendsArceusEliteFour = [volo, giratinaAltered, giratinaOrigin];
