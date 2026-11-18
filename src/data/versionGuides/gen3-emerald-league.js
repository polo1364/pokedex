/** 首次聯盟攻略；隊伍來源與版本核對見 output/guide-review/all-generations。 */
export const emeraldLeague = {
  "intro": "以下為首次聯盟挑戰。主力約Lv.50～58，冠軍最高Lv.58；首次隊伍與再戰不可混用。 四天王到冠軍須用同一支隊伍連戰，先補滿HP、狀態與PP。",
  "coverage": [
    {
      "attackType": "fighting",
      "label": "格鬥",
      "uses": "花月與波妮"
    },
    {
      "attackType": "electric",
      "label": "電",
      "uses": "水系與飛行"
    },
    {
      "attackType": "ice",
      "label": "冰",
      "uses": "源治的龍／飛行及龍／地面"
    },
    {
      "attackType": "water",
      "label": "水",
      "uses": "岩石、地面與等倍補盲"
    },
    {
      "attackType": "flying",
      "label": "飛行",
      "uses": "草系與樂天河童"
    }
  ],
  "recommendedTeams": [
    {
      "label": "首次通關六隻範例",
      "reason": "御三家依開局替換；其餘皆可於首次聯盟前取得，不要求通訊進化。候選不是必須全練，優先補自己隊伍缺少的攻擊屬性。",
      "pokemon": [
        {
          "name": "巨沼怪",
          "types": [
            "water",
            "ground"
          ]
        },
        {
          "name": "雷電獸",
          "types": [
            "electric"
          ],
          "obtain": "110號道路落雷獸Lv.26進化"
        },
        {
          "name": "帝牙海獅",
          "types": [
            "ice",
            "water"
          ],
          "obtain": "淺灘洞穴海豹球進化，Lv.44成帝牙海獅"
        },
        {
          "name": "沙奈朵",
          "types": [
            "psychic"
          ],
          "obtain": "102號道路拉魯拉絲進化"
        },
        {
          "name": "斗笠菇",
          "types": [
            "grass",
            "fighting"
          ],
          "obtain": "橙華森林蘑蘑菇Lv.23進化"
        },
        {
          "name": "大王燕",
          "types": [
            "normal",
            "flying"
          ],
          "obtain": "傲骨燕Lv.22進化"
        }
      ]
    }
  ],
  "battles": {
    "eliteFour:1": {
      "intro": "花月：格鬥對大狼犬、狡猾天狗、夢歌仙人掌及阿勃梭魯有效。紅／藍寶石有巨牙鯊，綠寶石換成鐵螯龍蝦，兩者都可用電或格鬥。沙奈朵的超能力攻擊對惡系無效。",
      "tips": [
        "第三世代沒有妖精屬性；沙奈朵純超能力，普通暴鯉龍水／飛行。"
      ],
      "matchups": [
        {
          "opponent": "大狼犬",
          "counters": "格鬥；注意威嚇降低物攻。"
        },
        {
          "opponent": "狡猾天狗",
          "counters": "格鬥、火、冰或飛行；蟲4倍。"
        },
        {
          "opponent": "夢歌仙人掌",
          "counters": "格鬥、火、冰或飛行；蟲4倍。"
        },
        {
          "opponent": "鐵螯龍蝦",
          "counters": "格鬥、電或草。"
        },
        {
          "opponent": "阿勃梭魯",
          "counters": "格鬥或蟲；第三世代沒有妖精。"
        }
      ]
    },
    "eliteFour:2": {
      "intro": "芙蓉：一般、格鬥招對幽靈無效；彷徨夜靈與詛咒娃娃怕惡／幽靈。勾魂眼在第三世代沒有屬性弱點，用高威力等倍攻擊。準備解燒傷及回PP道具，留意壓迫感。",
      "tips": [
        "第三世代沒有妖精屬性；沙奈朵純超能力，普通暴鯉龍水／飛行。"
      ],
      "matchups": [
        {
          "opponent": "彷徨夜靈",
          "counters": "雷電獸咬住等惡招；壓迫感會消耗額外PP。"
        },
        {
          "opponent": "詛咒娃娃",
          "counters": "惡招；避免燒傷削弱物理輸出。"
        },
        {
          "opponent": "勾魂眼",
          "counters": "第三世代沒有屬性弱點，用可靠等倍招。"
        },
        {
          "opponent": "詛咒娃娃",
          "counters": "惡招；避免燒傷削弱物理輸出。"
        },
        {
          "opponent": "彷徨夜靈",
          "counters": "雷電獸咬住等惡招；壓迫感會消耗額外PP。"
        }
      ]
    },
    "eliteFour:3": {
      "intro": "波妮：格鬥打全隊冰系；電招打海魔獅、帝牙海獅，火招適合冰鬼護，但對水／冰只等倍。不要把海魔獅誤認海豹球。",
      "tips": [
        "第三世代沒有妖精屬性；沙奈朵純超能力，普通暴鯉龍水／飛行。"
      ],
      "matchups": [
        {
          "opponent": "海魔獅",
          "counters": "電或格鬥；火招只是等倍。"
        },
        {
          "opponent": "冰鬼護",
          "counters": "火或格鬥。"
        },
        {
          "opponent": "海魔獅",
          "counters": "電或格鬥；火招只是等倍。"
        },
        {
          "opponent": "冰鬼護",
          "counters": "火或格鬥。"
        },
        {
          "opponent": "帝牙海獅",
          "counters": "電或格鬥；水屬性抵消火弱點。"
        }
      ]
    },
    "eliteFour:4": {
      "intro": "源治：冰招打七夕青鳥、沙漠蜻蜓、暴飛龍4倍，甲殼龍2倍。綠寶石的刺龍王水／龍只弱龍，冰僅等倍；紅／藍寶石則有兩隻沙漠蜻蜓。",
      "tips": [
        "第三世代沒有妖精屬性；沙奈朵純超能力，普通暴鯉龍水／飛行。"
      ],
      "matchups": [
        {
          "opponent": "甲殼龍",
          "counters": "冰2倍。"
        },
        {
          "opponent": "七夕青鳥",
          "counters": "冰4倍；電只等倍。"
        },
        {
          "opponent": "刺龍王",
          "counters": "第三世代只弱龍；冰、草、電皆等倍。"
        },
        {
          "opponent": "沙漠蜻蜓",
          "counters": "冰4倍；電完全無效。"
        },
        {
          "opponent": "暴飛龍",
          "counters": "冰4倍。"
        }
      ]
    },
    "champion": {
      "intro": "米可利：電招處理吼鯨王、毒刺水母、暴鯉龍、美納斯；鯰魚王免疫電，草招4倍。樂天河童草／水不弱電或草，改飛行。",
      "tips": [
        "第三世代沒有妖精屬性；沙奈朵純超能力，普通暴鯉龍水／飛行。"
      ],
      "matchups": [
        {
          "opponent": "吼鯨王",
          "counters": "電或草。"
        },
        {
          "opponent": "毒刺水母",
          "counters": "電或超能力；草僅等倍。"
        },
        {
          "opponent": "樂天河童",
          "counters": "飛行；電、草與冰皆等倍。"
        },
        {
          "opponent": "鯰魚王",
          "counters": "草4倍；電完全無效。"
        },
        {
          "opponent": "暴鯉龍",
          "counters": "電4倍；普通形態是水／飛行。"
        },
        {
          "opponent": "美納斯",
          "counters": "電或草；留意自我再生。"
        }
      ]
    }
  },
  "battleOrder": [
    {
      "battle": "花月",
      "leads": "花月：格鬥對大狼犬、狡猾天狗、夢歌仙人掌及阿勃梭魯有效。紅／藍寶石有巨牙鯊，綠寶石換成鐵螯龍蝦，兩者都可用電或格鬥。沙奈朵的超能力攻擊對惡系無效。",
      "backup": "依上方實際對手屬性換人；保持冰、水、電等關鍵招的PP。"
    },
    {
      "battle": "芙蓉",
      "leads": "芙蓉：一般、格鬥招對幽靈無效；彷徨夜靈與詛咒娃娃怕惡／幽靈。勾魂眼在第三世代沒有屬性弱點，用高威力等倍攻擊。準備解燒傷及回PP道具，留意壓迫感。",
      "backup": "依上方實際對手屬性換人；保持冰、水、電等關鍵招的PP。"
    },
    {
      "battle": "波妮",
      "leads": "波妮：格鬥打全隊冰系；電招打海魔獅、帝牙海獅，火招適合冰鬼護，但對水／冰只等倍。不要把海魔獅誤認海豹球。",
      "backup": "依上方實際對手屬性換人；保持冰、水、電等關鍵招的PP。"
    },
    {
      "battle": "源治",
      "leads": "源治：冰招打七夕青鳥、沙漠蜻蜓、暴飛龍4倍，甲殼龍2倍。綠寶石的刺龍王水／龍只弱龍，冰僅等倍；紅／藍寶石則有兩隻沙漠蜻蜓。",
      "backup": "依上方實際對手屬性換人；保持冰、水、電等關鍵招的PP。"
    },
    {
      "battle": "米可利",
      "leads": "米可利：電招處理吼鯨王、毒刺水母、暴鯉龍、美納斯；鯰魚王免疫電，草招4倍。樂天河童草／水不弱電或草，改飛行。",
      "backup": "依上方實際對手屬性換人；保持冰、水、電等關鍵招的PP。"
    }
  ],
  "starterLineups": [
    {
      "starter": "水躍魚",
      "starterTypes": [
        "water"
      ],
      "pokemon": [
        {
          "name": "巨沼怪",
          "types": [
            "water",
            "ground"
          ]
        },
        {
          "name": "雷電獸",
          "types": [
            "electric"
          ],
          "obtain": "110號道路落雷獸Lv.26進化"
        },
        {
          "name": "帝牙海獅",
          "types": [
            "ice",
            "water"
          ],
          "obtain": "淺灘洞穴海豹球進化，Lv.44成帝牙海獅"
        },
        {
          "name": "沙奈朵",
          "types": [
            "psychic"
          ],
          "obtain": "102號道路拉魯拉絲進化"
        },
        {
          "name": "斗笠菇",
          "types": [
            "grass",
            "fighting"
          ],
          "obtain": "橙華森林蘑蘑菇Lv.23進化"
        },
        {
          "name": "大王燕",
          "types": [
            "normal",
            "flying"
          ],
          "obtain": "傲骨燕Lv.22進化"
        }
      ],
      "summary": "巨沼怪補衝浪與地面招，草系會造成4倍傷害。"
    },
    {
      "starter": "火稚雞",
      "starterTypes": [
        "fire"
      ],
      "pokemon": [
        {
          "name": "火焰雞",
          "types": [
            "fire",
            "fighting"
          ]
        },
        {
          "name": "雷電獸",
          "types": [
            "electric"
          ],
          "obtain": "110號道路落雷獸Lv.26進化"
        },
        {
          "name": "帝牙海獅",
          "types": [
            "ice",
            "water"
          ],
          "obtain": "淺灘洞穴海豹球進化，Lv.44成帝牙海獅"
        },
        {
          "name": "沙奈朵",
          "types": [
            "psychic"
          ],
          "obtain": "102號道路拉魯拉絲進化"
        },
        {
          "name": "斗笠菇",
          "types": [
            "grass",
            "fighting"
          ],
          "obtain": "橙華森林蘑蘑菇Lv.23進化"
        },
        {
          "name": "大王燕",
          "types": [
            "normal",
            "flying"
          ],
          "obtain": "傲骨燕Lv.22進化"
        }
      ],
      "summary": "火焰雞補火、格鬥；不要在水系面前硬上火招。"
    },
    {
      "starter": "木守宮",
      "starterTypes": [
        "grass"
      ],
      "pokemon": [
        {
          "name": "蜥蜴王",
          "types": [
            "grass"
          ]
        },
        {
          "name": "雷電獸",
          "types": [
            "electric"
          ],
          "obtain": "110號道路落雷獸Lv.26進化"
        },
        {
          "name": "帝牙海獅",
          "types": [
            "ice",
            "water"
          ],
          "obtain": "淺灘洞穴海豹球進化，Lv.44成帝牙海獅"
        },
        {
          "name": "沙奈朵",
          "types": [
            "psychic"
          ],
          "obtain": "102號道路拉魯拉絲進化"
        },
        {
          "name": "斗笠菇",
          "types": [
            "grass",
            "fighting"
          ],
          "obtain": "橙華森林蘑蘑菇Lv.23進化"
        },
        {
          "name": "大王燕",
          "types": [
            "normal",
            "flying"
          ],
          "obtain": "傲骨燕Lv.22進化"
        }
      ],
      "summary": "蜥蜴王補草系；冰系與飛行改交給隊友。"
    }
  ],
  "moveSets": [
    {
      "pokemon": "雷電獸",
      "role": "電系主力",
      "moves": [
        {
          "name": "十萬伏特",
          "use": "水與飛行輸出",
          "source": "tm",
          "sourceDetail": "TM24（衝浪後完成新紫堇委託）",
          "type": "electric"
        },
        {
          "name": "電磁波",
          "use": "速度控制",
          "source": "level"
        },
        {
          "name": "咬住",
          "use": "惡系招打彷徨夜靈／詛咒娃娃；第三世代屬特殊攻擊",
          "source": "level"
        }
      ]
    },
    {
      "pokemon": "帝牙海獅",
      "role": "冰與水輸出",
      "moves": [
        {
          "name": "冰凍光束",
          "use": "對源治多數龍系",
          "source": "tm",
          "sourceDetail": "TM13（廢棄船或遊戲城）",
          "type": "ice"
        },
        {
          "name": "衝浪",
          "use": "等倍主力與打大吾岩地面",
          "source": "hm",
          "sourceDetail": "HM03",
          "type": "water"
        },
        {
          "name": "極光束",
          "use": "尚未取得冰凍光束時的替代",
          "source": "level"
        }
      ]
    },
    {
      "pokemon": "沙奈朵",
      "role": "特殊補位",
      "moves": [
        {
          "name": "精神強念",
          "use": "打非惡系的等倍或弱點",
          "source": "level"
        },
        {
          "name": "冥想",
          "use": "安全時強化；勿在惡系面前硬留",
          "source": "level"
        }
      ]
    },
    {
      "pokemon": "斗笠菇",
      "role": "格鬥與草補盲",
      "moves": [
        {
          "name": "音速拳",
          "use": "收掉殘血惡／冰系",
          "source": "level"
        },
        {
          "name": "超級吸取",
          "use": "鯰魚王4倍；第三世代草是特殊，威力受特攻影響",
          "source": "level"
        }
      ],
      "note": "蘑菇孢子要蘑蘑菇Lv.54才學會，不能假設一般Lv.23進化就有。"
    },
    {
      "pokemon": "大王燕",
      "role": "高速飛行",
      "moves": [
        {
          "name": "飛翔",
          "use": "打草或格鬥",
          "source": "hm",
          "sourceDetail": "HM02",
          "type": "flying"
        },
        {
          "name": "燕返",
          "use": "必中飛行招",
          "source": "tm",
          "sourceDetail": "TM40（擊敗娜琪）",
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
    "第三世代沒有妖精屬性；沙奈朵純超能力，普通暴鯉龍水／飛行。",
    "屬性決定物理／特殊：惡、龍與冰是特殊，幽靈是物理；不要照搬重製版配招。",
    "TM一次使用後消耗；TM13與TM24可在紫堇遊戲城反覆兌換，但需要代幣。"
  ],
  "conclusion": "先確認本版對手與自己的招式，再按弱點換人；建議等級與隊伍是準備方向，不代表保證勝利。"
};
