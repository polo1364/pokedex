import { assertBattle, assertLeague } from './helpers.js';
import { sunMoonLeague } from './gen7-sun-moon-league.js';

// 首次主線；來源與逐項覆核記錄見 output/guide-review/all-generations/gen7-8-corrections.json。
export const sunMoonGuide = {
  "id": "sun-moon",
  "title": "寶可夢 太陽／月亮",
  "displayGeneration": 7,
  "status": "complete",
  "quickNavigation": true,
  "gymSectionTitle": "諸島試煉與大試煉",
  "notes": "首次聯盟四天王可自由選擇順序；擊敗四人後挑戰庫庫伊博士。哈烏屬通關後的衛冕挑戰者，不能替代首次主線。",
  "gyms": [
    {
      "location": "美樂美樂島",
      "badge": "一般 Z",
      "badgeType": "normal",
      "order": 1,
      "role": "gym",
      "name": "伊利馬試煉（霸主）",
      "notes": "太陽為貓鼬探長，月亮為阿羅拉拉達；霸主與SOS援軍分開標示。格鬥對月亮拉達為4倍。",
      "party": [
        {
          "name": "貓鼬探長",
          "types": [
            "normal"
          ],
          "level": 12
        }
      ],
      "strategy": {
        "level": "對手最高 Lv.12；依隊伍能力調整",
        "summary": "太陽為貓鼬探長，月亮為阿羅拉拉達；霸主與SOS援軍分開標示。格鬥對月亮拉達為4倍。",
        "tips": [
          "推薦為可替換候選；御三家僅在你選擇該開局時可用，不假設交換取得另外兩隻。"
        ]
      },
      "recommendedTeams": [
        {
          "label": "可取得的對策候選",
          "reason": "太陽為貓鼬探長，月亮為阿羅拉拉達；霸主與SOS援軍分開標示。格鬥對月亮拉達為4倍。",
          "pokemon": [
            {
              "name": "好勝蟹",
              "types": [
                "fighting"
              ],
              "obtain": "2號道路等地的樹果堆遭遇",
              "moveNote": "純格鬥；學會碎岩後用格鬥招，勿誤標冰系"
            },
            {
              "name": "小篤兒",
              "types": [
                "normal",
                "flying"
              ],
              "obtain": "1號道路",
              "moveNote": "啄；之後按等級進化，不要求早期銃嘴大鳥"
            }
          ]
        }
      ],
      "roleLabel": "試煉",
      "variants": [
        {
          "label": "太陽",
          "party": [
            {
              "name": "貓鼬探長",
              "types": [
                "normal"
              ],
              "level": 12
            }
          ],
          "tips": [
            "太陽為貓鼬探長，月亮為阿羅拉拉達；霸主與SOS援軍分開標示。格鬥對月亮拉達為4倍。"
          ]
        },
        {
          "label": "月亮",
          "party": [
            {
              "name": "拉達（阿羅拉）",
              "types": [
                "dark",
                "normal"
              ],
              "level": 12
            }
          ],
          "tips": [
            "太陽為貓鼬探長，月亮為阿羅拉拉達；霸主與SOS援軍分開標示。格鬥對月亮拉達為4倍。"
          ]
        }
      ]
    },
    {
      "location": "美樂美樂島",
      "badge": "格鬥 Z",
      "badgeType": "fighting",
      "order": 2,
      "role": "gym",
      "name": "哈拉大試煉",
      "notes": "飛行或妖精招打格鬥；好勝蟹不是冰系。",
      "party": [
        {
          "name": "猴怪",
          "types": [
            "fighting"
          ],
          "level": 14
        },
        {
          "name": "幕下力士",
          "types": [
            "fighting"
          ],
          "level": 14
        },
        {
          "name": "好勝蟹",
          "types": [
            "fighting"
          ],
          "level": 15
        }
      ],
      "strategy": {
        "level": "對手最高 Lv.15；依隊伍能力調整",
        "summary": "飛行或妖精招打格鬥；好勝蟹不是冰系。",
        "tips": [
          "推薦為可替換候選；御三家僅在你選擇該開局時可用，不假設交換取得另外兩隻。"
        ]
      },
      "recommendedTeams": [
        {
          "label": "可取得的對策候選",
          "reason": "飛行或妖精招打格鬥；好勝蟹不是冰系。",
          "pokemon": [
            {
              "name": "小篤兒",
              "types": [
                "normal",
                "flying"
              ],
              "obtain": "1號道路",
              "moveNote": "啄；之後按等級進化，不要求早期銃嘴大鳥"
            },
            {
              "name": "萌虻",
              "types": [
                "bug",
                "fairy"
              ],
              "obtain": "2號道路或3號道路",
              "moveNote": "妖精之風；25級進化蝶結萌虻"
            }
          ]
        }
      ],
      "roleLabel": "大試煉"
    },
    {
      "location": "阿卡拉島",
      "badge": "水 Z",
      "badgeType": "water",
      "order": 3,
      "role": "gym",
      "name": "水蓮試煉（霸主）",
      "notes": "日月是魚群形態弱丁魚；可召喚保母曼波或弱丁魚。電與草招有效，避免只打會再出現的援軍。",
      "party": [
        {
          "name": "弱丁魚",
          "types": [
            "water"
          ],
          "level": 20
        }
      ],
      "strategy": {
        "level": "對手最高 Lv.20；依隊伍能力調整",
        "summary": "日月是魚群形態弱丁魚；可召喚保母曼波或弱丁魚。電與草招有效，避免只打會再出現的援軍。",
        "tips": [
          "推薦為可替換候選；御三家僅在你選擇該開局時可用，不假設交換取得另外兩隻。"
        ]
      },
      "recommendedTeams": [
        {
          "label": "可取得的對策候選",
          "reason": "日月是魚群形態弱丁魚；可召喚保母曼波或弱丁魚。電與草招有效，避免只打會再出現的援軍。",
          "pokemon": [
            {
              "name": "小磁怪",
              "types": [
                "electric",
                "steel"
              ],
              "obtain": "訓練家學校草叢",
              "moveNote": "電擊；後期用電光或鋼系鏡光射擊"
            },
            {
              "name": "投羽梟",
              "types": [
                "grass",
                "flying"
              ],
              "obtain": "木木梟開局17級進化",
              "moveNote": "飛葉快刀"
            }
          ]
        }
      ],
      "roleLabel": "試煉"
    },
    {
      "location": "阿卡拉島",
      "badge": "火 Z",
      "badgeType": "fire",
      "order": 4,
      "role": "gym",
      "name": "卡奇試煉（霸主）",
      "notes": "水或地面打焰后蜥；地面4倍弱點，注意中毒與援軍。",
      "party": [
        {
          "name": "焰后蜥",
          "types": [
            "poison",
            "fire"
          ],
          "level": 22
        }
      ],
      "strategy": {
        "level": "對手最高 Lv.22；依隊伍能力調整",
        "summary": "水或地面打焰后蜥；地面4倍弱點，注意中毒與援軍。",
        "tips": [
          "推薦為可替換候選；御三家僅在你選擇該開局時可用，不假設交換取得另外兩隻。"
        ]
      },
      "recommendedTeams": [
        {
          "label": "可取得的對策候選",
          "reason": "水或地面打焰后蜥；地面4倍弱點，注意中毒與援軍。",
          "pokemon": [
            {
              "name": "長翅鷗",
              "types": [
                "water",
                "flying"
              ],
              "obtain": "1號道路等沿海草叢",
              "moveNote": "水之波動；25級進化大嘴鷗"
            },
            {
              "name": "泥驢仔",
              "types": [
                "ground"
              ],
              "obtain": "4號道路或歐哈納牧場",
              "moveNote": "重踏；30級進化重泥挽馬"
            }
          ]
        }
      ],
      "roleLabel": "試煉"
    },
    {
      "location": "阿卡拉島",
      "badge": "草 Z",
      "badgeType": "grass",
      "order": 5,
      "role": "gym",
      "name": "瑪奧試煉（霸主）",
      "notes": "火與飛行招有效；援軍漂浮泡泡會影響天氣，光合作用會回血。",
      "party": [
        {
          "name": "蘭螳花",
          "types": [
            "grass"
          ],
          "level": 24
        }
      ],
      "strategy": {
        "level": "對手最高 Lv.24；依隊伍能力調整",
        "summary": "火與飛行招有效；援軍漂浮泡泡會影響天氣，光合作用會回血。",
        "tips": [
          "推薦為可替換候選；御三家僅在你選擇該開局時可用，不假設交換取得另外兩隻。"
        ]
      },
      "recommendedTeams": [
        {
          "label": "可取得的對策候選",
          "reason": "火與飛行招有效；援軍漂浮泡泡會影響天氣，光合作用會回血。",
          "pokemon": [
            {
              "name": "卡蒂狗",
              "types": [
                "fire"
              ],
              "obtain": "2號道路",
              "moveNote": "火焰輪；進化前確認需要的等級招式"
            },
            {
              "name": "喇叭啄鳥",
              "types": [
                "normal",
                "flying"
              ],
              "obtain": "小篤兒14級進化",
              "moveNote": "啄食或其他已學飛行招"
            }
          ]
        }
      ],
      "roleLabel": "試煉"
    },
    {
      "location": "阿卡拉島",
      "badge": "岩石 Z",
      "badgeType": "rock",
      "order": 6,
      "role": "gym",
      "name": "麗姿大試煉",
      "notes": "水、草、格鬥或地面招有效；注意結實，不宣稱一擊清場。",
      "party": [
        {
          "name": "朝北鼻",
          "types": [
            "rock"
          ],
          "level": 26
        },
        {
          "name": "地幔岩",
          "types": [
            "rock"
          ],
          "level": 26
        },
        {
          "name": "鬃岩狼人（黑夜）",
          "types": [
            "rock"
          ],
          "level": 27
        }
      ],
      "strategy": {
        "level": "對手最高 Lv.27；依隊伍能力調整",
        "summary": "水、草、格鬥或地面招有效；注意結實，不宣稱一擊清場。",
        "tips": [
          "推薦為可替換候選；御三家僅在你選擇該開局時可用，不假設交換取得另外兩隻。"
        ]
      },
      "recommendedTeams": [
        {
          "label": "可取得的對策候選",
          "reason": "水、草、格鬥或地面招有效；注意結實，不宣稱一擊清場。",
          "pokemon": [
            {
              "name": "泥驢仔",
              "types": [
                "ground"
              ],
              "obtain": "4號道路或歐哈納牧場",
              "moveNote": "重踏；30級進化重泥挽馬"
            },
            {
              "name": "大嘴鷗",
              "types": [
                "water",
                "flying"
              ],
              "obtain": "長翅鷗25級進化",
              "moveNote": "水之波動"
            }
          ]
        }
      ],
      "roleLabel": "大試煉"
    },
    {
      "location": "烏拉烏拉島",
      "badge": "電 Z",
      "badgeType": "electric",
      "order": 7,
      "role": "gym",
      "name": "馬瑪內試煉（霸主）",
      "notes": "日月是鍬農炮蟲，飄浮使地面招無效；改用火或岩石。",
      "party": [
        {
          "name": "鍬農炮蟲",
          "types": [
            "bug",
            "electric"
          ],
          "level": 29
        }
      ],
      "strategy": {
        "level": "對手最高 Lv.29；依隊伍能力調整",
        "summary": "日月是鍬農炮蟲，飄浮使地面招無效；改用火或岩石。",
        "tips": [
          "推薦為可替換候選；御三家僅在你選擇該開局時可用，不假設交換取得另外兩隻。"
        ]
      },
      "recommendedTeams": [
        {
          "label": "可取得的對策候選",
          "reason": "日月是鍬農炮蟲，飄浮使地面招無效；改用火或岩石。",
          "pokemon": [
            {
              "name": "卡蒂狗",
              "types": [
                "fire"
              ],
              "obtain": "2號道路",
              "moveNote": "火焰輪；進化前確認需要的等級招式"
            },
            {
              "name": "鬃岩狼人",
              "types": [
                "rock"
              ],
              "obtain": "十克拉山丘岩狗狗25級依版本時段進化",
              "moveNote": "岩石封鎖等已學岩石招"
            }
          ]
        }
      ],
      "roleLabel": "試煉"
    },
    {
      "location": "烏拉烏拉島",
      "badge": "幽靈 Z",
      "badgeType": "ghost",
      "order": 8,
      "role": "gym",
      "name": "阿塞蘿拉試煉（霸主）",
      "notes": "先打破畫皮，再用鋼或幽靈招；惡招僅等倍，一般與格鬥招無效。",
      "party": [
        {
          "name": "謎擬Ｑ",
          "types": [
            "ghost",
            "fairy"
          ],
          "level": 33
        }
      ],
      "strategy": {
        "level": "對手最高 Lv.33；依隊伍能力調整",
        "summary": "先打破畫皮，再用鋼或幽靈招；惡招僅等倍，一般與格鬥招無效。",
        "tips": [
          "推薦為可替換候選；御三家僅在你選擇該開局時可用，不假設交換取得另外兩隻。"
        ]
      },
      "recommendedTeams": [
        {
          "label": "可取得的對策候選",
          "reason": "先打破畫皮，再用鋼或幽靈招；惡招僅等倍，一般與格鬥招無效。",
          "pokemon": [
            {
              "name": "三合一磁怪",
              "types": [
                "electric",
                "steel"
              ],
              "obtain": "小磁怪30級進化",
              "moveNote": "鏡光射擊；注意自身血量"
            },
            {
              "name": "臭泥（阿羅拉）",
              "types": [
                "poison",
                "dark"
              ],
              "obtain": "好奧樂市商業區等草叢",
              "moveNote": "咬住；38級進化臭臭泥，惡系招打幽靈"
            }
          ]
        }
      ],
      "roleLabel": "試煉"
    },
    {
      "location": "烏拉烏拉島",
      "badge": "惡 Z",
      "badgeType": "dark",
      "order": 9,
      "role": "gym",
      "name": "默丹大試煉",
      "notes": "勾魂眼只弱妖精，格鬥無效；混混鱷與貓老大再以格鬥或妖精處理。",
      "party": [
        {
          "name": "勾魂眼",
          "types": [
            "dark",
            "ghost"
          ],
          "level": 38
        },
        {
          "name": "混混鱷",
          "types": [
            "ground",
            "dark"
          ],
          "level": 38
        },
        {
          "name": "貓老大（阿羅拉）",
          "types": [
            "dark"
          ],
          "level": 39
        }
      ],
      "strategy": {
        "level": "對手最高 Lv.39；依隊伍能力調整",
        "summary": "勾魂眼只弱妖精，格鬥無效；混混鱷與貓老大再以格鬥或妖精處理。",
        "tips": [
          "推薦為可替換候選；御三家僅在你選擇該開局時可用，不假設交換取得另外兩隻。"
        ]
      },
      "recommendedTeams": [
        {
          "label": "可取得的對策候選",
          "reason": "勾魂眼只弱妖精，格鬥無效；混混鱷與貓老大再以格鬥或妖精處理。",
          "pokemon": [
            {
              "name": "蝶結萌虻",
              "types": [
                "bug",
                "fairy"
              ],
              "obtain": "萌虻25級進化",
              "moveNote": "吸取之吻"
            },
            {
              "name": "穿著熊",
              "types": [
                "normal",
                "fighting"
              ],
              "obtain": "8號道路童偶熊27級進化",
              "moveNote": "格鬥招只用於混混鱷/貓老大"
            }
          ]
        }
      ],
      "roleLabel": "大試煉"
    },
    {
      "location": "波尼島",
      "badge": "大地 Z",
      "badgeType": "ground",
      "order": 10,
      "role": "gym",
      "name": "哈普烏大試煉",
      "notes": "草打海兔獸，冰打沙漠蜻蜓；草打地龍僅等倍。水隊注意海兔獸引水。",
      "party": [
        {
          "name": "三地鼠（阿羅拉）",
          "types": [
            "ground",
            "steel"
          ],
          "level": 47
        },
        {
          "name": "海兔獸",
          "types": [
            "water",
            "ground"
          ],
          "level": 47
        },
        {
          "name": "沙漠蜻蜓",
          "types": [
            "ground",
            "dragon"
          ],
          "level": 47
        },
        {
          "name": "重泥挽馬",
          "types": [
            "ground"
          ],
          "level": 48
        }
      ],
      "strategy": {
        "level": "對手最高 Lv.48；依隊伍能力調整",
        "summary": "草打海兔獸，冰打沙漠蜻蜓；草打地龍僅等倍。水隊注意海兔獸引水。",
        "tips": [
          "推薦為可替換候選；御三家僅在你選擇該開局時可用，不假設交換取得另外兩隻。"
        ]
      },
      "recommendedTeams": [
        {
          "label": "可取得的對策候選",
          "reason": "草打海兔獸，冰打沙漠蜻蜓；草打地龍僅等倍。水隊注意海兔獸引水。",
          "pokemon": [
            {
              "name": "大嘴鷗",
              "types": [
                "water",
                "flying"
              ],
              "obtain": "長翅鷗25級進化",
              "moveNote": "水招打三地鼠/重泥挽馬"
            },
            {
              "name": "狙射樹梟",
              "types": [
                "grass",
                "ghost"
              ],
              "obtain": "木木梟開局34級進化",
              "moveNote": "葉刃打海兔獸"
            }
          ]
        }
      ],
      "roleLabel": "大試煉"
    },
    {
      "location": "波尼大峽谷",
      "badge": "龍 Z",
      "badgeType": "dragon",
      "order": 11,
      "role": "gym",
      "name": "波尼大峽谷龍試煉（霸主）",
      "notes": "日月也有此主線試煉；妖精4倍，飛行、冰、超能2倍。SOS援軍鱗甲龍/巨鉗螳螂不應列成雙霸主。",
      "party": [
        {
          "name": "杖尾鱗甲龍",
          "types": [
            "dragon",
            "fighting"
          ],
          "level": 45
        }
      ],
      "strategy": {
        "level": "對手最高 Lv.45；依隊伍能力調整",
        "summary": "日月也有此主線試煉；妖精4倍，飛行、冰、超能2倍。SOS援軍鱗甲龍/巨鉗螳螂不應列成雙霸主。",
        "tips": [
          "推薦為可替換候選；御三家僅在你選擇該開局時可用，不假設交換取得另外兩隻。"
        ]
      },
      "recommendedTeams": [
        {
          "label": "可取得的對策候選",
          "reason": "日月也有此主線試煉；妖精4倍，飛行、冰、超能2倍。SOS援軍鱗甲龍/巨鉗螳螂不應列成雙霸主。",
          "pokemon": [
            {
              "name": "蝶結萌虻",
              "types": [
                "bug",
                "fairy"
              ],
              "obtain": "萌虻25級進化",
              "moveNote": "魔法閃耀等已學妖精招"
            },
            {
              "name": "西獅海壬",
              "types": [
                "water",
                "fairy"
              ],
              "obtain": "球球海獅開局34級進化",
              "moveNote": "月亮之力；若尚未學會用已取得妖精招"
            }
          ]
        }
      ],
      "roleLabel": "試煉"
    }
  ],
  "eliteFour": [
    {
      "order": 1,
      "role": "eliteFour",
      "name": "哈拉",
      "party": [
        {
          "name": "鐵掌力士",
          "types": [
            "fighting"
          ],
          "level": 54
        },
        {
          "name": "火爆猴",
          "types": [
            "fighting"
          ],
          "level": 54
        },
        {
          "name": "穿著熊",
          "types": [
            "normal",
            "fighting"
          ],
          "level": 54
        },
        {
          "name": "蚊香泳士",
          "types": [
            "water",
            "fighting"
          ],
          "level": 54
        },
        {
          "name": "好勝毛蟹",
          "types": [
            "fighting",
            "ice"
          ],
          "level": 55
        }
      ],
      "notes": "飛行、妖精或超能招處理格鬥；飛行手別硬接好勝毛蟹冰招。",
      "specialty": "fighting"
    },
    {
      "order": 2,
      "role": "eliteFour",
      "name": "麗姿",
      "party": [
        {
          "name": "古空棘魚",
          "types": [
            "water",
            "rock"
          ],
          "level": 54
        },
        {
          "name": "小碎鑽",
          "types": [
            "rock",
            "fairy"
          ],
          "level": 54
        },
        {
          "name": "隆隆岩（阿羅拉）",
          "types": [
            "rock",
            "electric"
          ],
          "level": 54
        },
        {
          "name": "大朝北鼻",
          "types": [
            "rock",
            "steel"
          ],
          "level": 54
        },
        {
          "name": "鬃岩狼人（黑夜）",
          "types": [
            "rock"
          ],
          "level": 55
        }
      ],
      "notes": "古空棘魚4倍弱草；阿羅拉隆隆岩4倍弱地面；小碎鑽不弱格鬥，改水/草/鋼。",
      "specialty": "rock"
    },
    {
      "order": 3,
      "role": "eliteFour",
      "name": "阿塞蘿拉",
      "party": [
        {
          "name": "勾魂眼",
          "types": [
            "dark",
            "ghost"
          ],
          "level": 54
        },
        {
          "name": "隨風球",
          "types": [
            "ghost",
            "flying"
          ],
          "level": 54
        },
        {
          "name": "破破舵輪",
          "types": [
            "ghost",
            "grass"
          ],
          "level": 54
        },
        {
          "name": "雪妖女",
          "types": [
            "ice",
            "ghost"
          ],
          "level": 54
        },
        {
          "name": "噬沙堡爺",
          "types": [
            "ghost",
            "ground"
          ],
          "level": 55
        }
      ],
      "notes": "惡或幽靈打大部分；勾魂眼只弱妖精。不要用格鬥打幽靈。",
      "specialty": "ghost"
    },
    {
      "order": 4,
      "role": "eliteFour",
      "name": "卡希麗",
      "party": [
        {
          "name": "盔甲鳥",
          "types": [
            "steel",
            "flying"
          ],
          "level": 54
        },
        {
          "name": "叉字蝠",
          "types": [
            "poison",
            "flying"
          ],
          "level": 54
        },
        {
          "name": "花舞鳥（熱辣熱辣）",
          "types": [
            "fire",
            "flying"
          ],
          "level": 54
        },
        {
          "name": "禿鷹娜",
          "types": [
            "dark",
            "flying"
          ],
          "level": 54
        },
        {
          "name": "銃嘴大鳥",
          "types": [
            "normal",
            "flying"
          ],
          "level": 55
        }
      ],
      "notes": "全隊弱電；盔甲鳥不弱冰，花舞鳥4倍弱岩。",
      "specialty": "flying"
    }
  ],
  "champion": {
    "role": "champion",
    "name": "庫庫伊博士",
    "party": [
      {
        "name": "鬃岩狼人（白晝）",
        "types": [
          "rock"
        ],
        "level": 57
      },
      {
        "name": "九尾（阿羅拉）",
        "types": [
          "ice",
          "fairy"
        ],
        "level": 56
      },
      {
        "name": "勇士雄鷹",
        "types": [
          "normal",
          "flying"
        ],
        "level": 56
      },
      {
        "name": "自爆磁怪",
        "types": [
          "electric",
          "steel"
        ],
        "level": 56
      },
      {
        "name": "卡比獸",
        "types": [
          "normal"
        ],
        "level": 56
      },
      {
        "name": "熾焰咆哮虎",
        "types": [
          "fire",
          "dark"
        ],
        "level": 58
      }
    ],
    "notes": "首次聯盟最後是庫庫伊；御三家對玩家有利。阿羅拉九尾4倍弱鋼，自爆磁怪4倍弱地面，卡比獸用格鬥。"
  },
  league: sunMoonLeague
};

sunMoonGuide.gyms.forEach(assertBattle);
assertLeague(sunMoonLeague);
