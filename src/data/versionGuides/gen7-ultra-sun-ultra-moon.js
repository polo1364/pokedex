import { assertBattle, assertLeague } from './helpers.js';
import { ultraSunUltraMoonLeague } from './gen7-ultra-sun-ultra-moon-league.js';

// 首次主線；來源與逐項覆核記錄見 output/guide-review/all-generations/gen7-8-corrections.json。
export const ultraSunUltraMoonGuide = {
  "id": "ultra-sun-ultra-moon",
  "title": "寶可夢 究極之日／究極之月",
  "displayGeneration": 7,
  "status": "complete",
  "quickNavigation": true,
  "gymSectionTitle": "諸島試煉與大試煉",
  "notes": "首次聯盟四天王可自由選擇順序；馬睿因取代日月的哈拉，最後對手是哈烏。與日月不同的霸主與隊伍不能只把等級上調。",
  "gyms": [
    {
      "location": "美樂美樂島",
      "badge": "一般 Z",
      "badgeType": "normal",
      "order": 1,
      "role": "gym",
      "name": "伊利馬試煉（霸主）",
      "notes": "究極之日為貓鼬探長，究極之月為阿羅拉拉達；不是伊利馬的訓練家隊伍。",
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
        "summary": "究極之日為貓鼬探長，究極之月為阿羅拉拉達；不是伊利馬的訓練家隊伍。",
        "tips": [
          "推薦為可替換候選；御三家僅在你選擇該開局時可用，不假設交換取得另外兩隻。"
        ]
      },
      "recommendedTeams": [
        {
          "label": "可取得的對策候選",
          "reason": "究極之日為貓鼬探長，究極之月為阿羅拉拉達；不是伊利馬的訓練家隊伍。",
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
          "label": "究極之日",
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
            "究極之日為貓鼬探長，究極之月為阿羅拉拉達；不是伊利馬的訓練家隊伍。"
          ]
        },
        {
          "label": "究極之月",
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
            "究極之日為貓鼬探長，究極之月為阿羅拉拉達；不是伊利馬的訓練家隊伍。"
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
          "name": "腕力",
          "types": [
            "fighting"
          ],
          "level": 15
        },
        {
          "name": "幕下力士",
          "types": [
            "fighting"
          ],
          "level": 15
        },
        {
          "name": "好勝蟹",
          "types": [
            "fighting"
          ],
          "level": 16
        }
      ],
      "strategy": {
        "level": "對手最高 Lv.16；依隊伍能力調整",
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
      "notes": "究極版改成滴蛛霸；草招僅等倍。水泡提高水招並降低火招傷害，雨天更危險；電、飛行與岩石有效。",
      "party": [
        {
          "name": "滴蛛霸",
          "types": [
            "water",
            "bug"
          ],
          "level": 20
        }
      ],
      "strategy": {
        "level": "對手最高 Lv.20；依隊伍能力調整",
        "summary": "究極版改成滴蛛霸；草招僅等倍。水泡提高水招並降低火招傷害，雨天更危險；電、飛行與岩石有效。",
        "tips": [
          "推薦為可替換候選；御三家僅在你選擇該開局時可用，不假設交換取得另外兩隻。"
        ]
      },
      "recommendedTeams": [
        {
          "label": "可取得的對策候選",
          "reason": "究極版改成滴蛛霸；草招僅等倍。水泡提高水招並降低火招傷害，雨天更危險；電、飛行與岩石有效。",
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
              "name": "喇叭啄鳥",
              "types": [
                "normal",
                "flying"
              ],
              "obtain": "小篤兒14級進化",
              "moveNote": "飛行招；不要硬接冰系極光束"
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
      "notes": "究極版為阿羅拉嘎啦嘎啦；水、地面、岩石、惡、幽靈有效，格鬥與一般無效。",
      "party": [
        {
          "name": "嘎啦嘎啦（阿羅拉）",
          "types": [
            "fire",
            "ghost"
          ],
          "level": 22
        }
      ],
      "strategy": {
        "level": "對手最高 Lv.22；依隊伍能力調整",
        "summary": "究極版為阿羅拉嘎啦嘎啦；水、地面、岩石、惡、幽靈有效，格鬥與一般無效。",
        "tips": [
          "推薦為可替換候選；御三家僅在你選擇該開局時可用，不假設交換取得另外兩隻。"
        ]
      },
      "recommendedTeams": [
        {
          "label": "可取得的對策候選",
          "reason": "究極版為阿羅拉嘎啦嘎啦；水、地面、岩石、惡、幽靈有效，格鬥與一般無效。",
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
      "notes": "蘭螳花24級，SOS援軍改為變隱龍/花療環環；後者可能治療霸主。用火或飛行攻擊。",
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
        "summary": "蘭螳花24級，SOS援軍改為變隱龍/花療環環；後者可能治療霸主。用火或飛行攻擊。",
        "tips": [
          "推薦為可替換候選；御三家僅在你選擇該開局時可用，不假設交換取得另外兩隻。"
        ]
      },
      "recommendedTeams": [
        {
          "label": "可取得的對策候選",
          "reason": "蘭螳花24級，SOS援軍改為變隱龍/花療環環；後者可能治療霸主。用火或飛行攻擊。",
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
      "notes": "觸手百合草岩使水、草僅等倍；格鬥/冰/蟲/鋼有效。太古羽蟲與鬃岩狼人可用水。",
      "party": [
        {
          "name": "太古羽蟲",
          "types": [
            "rock",
            "bug"
          ],
          "level": 27
        },
        {
          "name": "觸手百合",
          "types": [
            "rock",
            "grass"
          ],
          "level": 27
        },
        {
          "name": "鬃岩狼人（黑夜）",
          "types": [
            "rock"
          ],
          "level": 28
        }
      ],
      "strategy": {
        "level": "對手最高 Lv.28；依隊伍能力調整",
        "summary": "觸手百合草岩使水、草僅等倍；格鬥/冰/蟲/鋼有效。太古羽蟲與鬃岩狼人可用水。",
        "tips": [
          "推薦為可替換候選；御三家僅在你選擇該開局時可用，不假設交換取得另外兩隻。"
        ]
      },
      "recommendedTeams": [
        {
          "label": "可取得的對策候選",
          "reason": "觸手百合草岩使水、草僅等倍；格鬥/冰/蟲/鋼有效。太古羽蟲與鬃岩狼人可用水。",
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
      "notes": "究極版改成托戈德瑪爾，地面4倍；注意尖刺防守與盔甲鳥援軍，地面招打不到盔甲鳥。",
      "party": [
        {
          "name": "托戈德瑪爾",
          "types": [
            "electric",
            "steel"
          ],
          "level": 33
        }
      ],
      "strategy": {
        "level": "對手最高 Lv.33；依隊伍能力調整",
        "summary": "究極版改成托戈德瑪爾，地面4倍；注意尖刺防守與盔甲鳥援軍，地面招打不到盔甲鳥。",
        "tips": [
          "推薦為可替換候選；御三家僅在你選擇該開局時可用，不假設交換取得另外兩隻。"
        ]
      },
      "recommendedTeams": [
        {
          "label": "可取得的對策候選",
          "reason": "究極版改成托戈德瑪爾，地面4倍；注意尖刺防守與盔甲鳥援軍，地面招打不到盔甲鳥。",
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
              "name": "卡蒂狗",
              "types": [
                "fire"
              ],
              "obtain": "2號道路",
              "moveNote": "火焰輪；進化前確認需要的等級招式"
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
      "notes": "35級謎擬Ｑ，援軍詛咒娃娃/胖嘟嘟；先破畫皮再用鋼招，勿把惡招寫成剋制。",
      "party": [
        {
          "name": "謎擬Ｑ",
          "types": [
            "ghost",
            "fairy"
          ],
          "level": 35
        }
      ],
      "strategy": {
        "level": "對手最高 Lv.35；依隊伍能力調整",
        "summary": "35級謎擬Ｑ，援軍詛咒娃娃/胖嘟嘟；先破畫皮再用鋼招，勿把惡招寫成剋制。",
        "tips": [
          "推薦為可替換候選；御三家僅在你選擇該開局時可用，不假設交換取得另外兩隻。"
        ]
      },
      "recommendedTeams": [
        {
          "label": "可取得的對策候選",
          "reason": "35級謎擬Ｑ，援軍詛咒娃娃/胖嘟嘟；先破畫皮再用鋼招，勿把惡招寫成剋制。",
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
          "level": 43
        },
        {
          "name": "混混鱷",
          "types": [
            "ground",
            "dark"
          ],
          "level": 43
        },
        {
          "name": "貓老大（阿羅拉）",
          "types": [
            "dark"
          ],
          "level": 44
        }
      ],
      "strategy": {
        "level": "對手最高 Lv.44；依隊伍能力調整",
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
      "location": "波尼大峽谷",
      "badge": "龍 Z",
      "badgeType": "dragon",
      "order": 10,
      "role": "gym",
      "name": "波尼大峽谷龍試煉（霸主）",
      "notes": "只有一隻霸主，SOS援軍為巨鉗螳螂46或音波龍48；隔音使聲音招式無效，妖精4倍。",
      "party": [
        {
          "name": "杖尾鱗甲龍",
          "types": [
            "dragon",
            "fighting"
          ],
          "level": 49
        }
      ],
      "strategy": {
        "level": "對手最高 Lv.49；依隊伍能力調整",
        "summary": "只有一隻霸主，SOS援軍為巨鉗螳螂46或音波龍48；隔音使聲音招式無效，妖精4倍。",
        "tips": [
          "推薦為可替換候選；御三家僅在你選擇該開局時可用，不假設交換取得另外兩隻。"
        ]
      },
      "recommendedTeams": [
        {
          "label": "可取得的對策候選",
          "reason": "只有一隻霸主，SOS援軍為巨鉗螳螂46或音波龍48；隔音使聲音招式無效，妖精4倍。",
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
    },
    {
      "location": "海洋居民之村",
      "badge": "妖精 Z",
      "badgeType": "fairy",
      "order": 12,
      "role": "gym",
      "name": "茉莉試煉（霸主）",
      "notes": "主線中先完成茉莉花瓣任務，再戰蝶結萌虻；有全能力提升氣場與幸福蛋/大嘴鷗援軍。火、鋼、岩石、毒有效，須準備速度與耐久。",
      "party": [
        {
          "name": "蝶結萌虻",
          "types": [
            "bug",
            "fairy"
          ],
          "level": 55
        }
      ],
      "strategy": {
        "level": "對手最高 Lv.55；依隊伍能力調整",
        "summary": "主線中先完成茉莉花瓣任務，再戰蝶結萌虻；有全能力提升氣場與幸福蛋/大嘴鷗援軍。火、鋼、岩石、毒有效，須準備速度與耐久。",
        "tips": [
          "推薦為可替換候選；御三家僅在你選擇該開局時可用，不假設交換取得另外兩隻。"
        ]
      },
      "recommendedTeams": [
        {
          "label": "可取得的對策候選",
          "reason": "主線中先完成茉莉花瓣任務，再戰蝶結萌虻；有全能力提升氣場與幸福蛋/大嘴鷗援軍。火、鋼、岩石、毒有效，須準備速度與耐久。",
          "pokemon": [
            {
              "name": "臭臭泥（阿羅拉）",
              "types": [
                "poison",
                "dark"
              ],
              "obtain": "阿羅拉臭泥38級進化",
              "moveNote": "毒招；17號道路TM84毒擊"
            },
            {
              "name": "自爆磁怪",
              "types": [
                "electric",
                "steel"
              ],
              "obtain": "三合一磁怪在火特力山等磁場升級",
              "moveNote": "鋼招；注意援軍雨天"
            }
          ]
        }
      ],
      "roleLabel": "試煉"
    },
    {
      "location": "波尼島",
      "badge": "大地 Z",
      "badgeType": "ground",
      "order": 11,
      "role": "gym",
      "name": "哈普烏大試煉",
      "notes": "草打海兔獸，冰打沙漠蜻蜓；草打地龍僅等倍。水隊注意海兔獸引水。",
      "party": [
        {
          "name": "泥偶巨人",
          "types": [
            "ground",
            "ghost"
          ],
          "level": 53
        },
        {
          "name": "海兔獸",
          "types": [
            "water",
            "ground"
          ],
          "level": 53
        },
        {
          "name": "沙漠蜻蜓",
          "types": [
            "ground",
            "dragon"
          ],
          "level": 53
        },
        {
          "name": "重泥挽馬",
          "types": [
            "ground"
          ],
          "level": 54
        }
      ],
      "strategy": {
        "level": "對手最高 Lv.54；依隊伍能力調整",
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
    }
  ],
  "eliteFour": [
    {
      "order": 1,
      "role": "eliteFour",
      "name": "馬睿因",
      "party": [
        {
          "name": "鑰圈兒",
          "types": [
            "steel",
            "fairy"
          ],
          "level": 56
        },
        {
          "name": "劈斬司令",
          "types": [
            "dark",
            "steel"
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
          "name": "巨金怪",
          "types": [
            "steel",
            "psychic"
          ],
          "level": 56
        },
        {
          "name": "三地鼠（阿羅拉）",
          "types": [
            "ground",
            "steel"
          ],
          "level": 57
        }
      ],
      "notes": "究極版用馬睿因取代哈拉；火與地面主攻，劈斬司令4倍弱格鬥，自爆磁怪4倍弱地面但留意結實。",
      "specialty": "steel"
    },
    {
      "order": 2,
      "role": "eliteFour",
      "name": "麗姿",
      "party": [
        {
          "name": "太古盔甲",
          "types": [
            "rock",
            "bug"
          ],
          "level": 56
        },
        {
          "name": "搖籃百合",
          "types": [
            "rock",
            "grass"
          ],
          "level": 56
        },
        {
          "name": "龐岩怪",
          "types": [
            "rock"
          ],
          "level": 56
        },
        {
          "name": "大朝北鼻",
          "types": [
            "rock",
            "steel"
          ],
          "level": 56
        },
        {
          "name": "鬃岩狼人（黑夜）",
          "types": [
            "rock"
          ],
          "level": 57
        }
      ],
      "notes": "水打太古盔甲/龐岩怪/鬃岩狼人；搖籃百合草岩使水草等倍，改格鬥或鋼。",
      "specialty": "rock"
    },
    {
      "order": 3,
      "role": "eliteFour",
      "name": "阿塞蘿拉",
      "party": [
        {
          "name": "詛咒娃娃",
          "types": [
            "ghost"
          ],
          "level": 56
        },
        {
          "name": "隨風球",
          "types": [
            "ghost",
            "flying"
          ],
          "level": 56
        },
        {
          "name": "破破舵輪",
          "types": [
            "ghost",
            "grass"
          ],
          "level": 56
        },
        {
          "name": "雪妖女",
          "types": [
            "ice",
            "ghost"
          ],
          "level": 56
        },
        {
          "name": "噬沙堡爺",
          "types": [
            "ghost",
            "ground"
          ],
          "level": 57
        }
      ],
      "notes": "全隊怕惡與幽靈；噬沙堡爺受水招會提升防禦，使用特攻或草招更直接。",
      "specialty": "ghost"
    },
    {
      "order": 4,
      "role": "eliteFour",
      "name": "卡希麗",
      "party": [
        {
          "name": "勇士雄鷹",
          "types": [
            "normal",
            "flying"
          ],
          "level": 56
        },
        {
          "name": "摔角鷹人",
          "types": [
            "fighting",
            "flying"
          ],
          "level": 56
        },
        {
          "name": "花舞鳥（熱辣熱辣）",
          "types": [
            "fire",
            "flying"
          ],
          "level": 56
        },
        {
          "name": "禿鷹娜",
          "types": [
            "dark",
            "flying"
          ],
          "level": 56
        },
        {
          "name": "銃嘴大鳥",
          "types": [
            "normal",
            "flying"
          ],
          "level": 57
        }
      ],
      "notes": "全隊弱電；不要用地面打飛行，注意銃嘴大鳥鳥嘴加農炮灼傷接觸攻擊者。",
      "specialty": "flying"
    }
  ],
  "champion": {
    "role": "champion",
    "name": "哈烏",
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
    "notes": "首次爭奪冠軍資格的最後一戰。哈烏御三家在本系相剋上被玩家剋制，伊布進化型補其弱點；阿羅拉雷丘怕地面/惡/幽靈，音波龍4倍弱冰。"
  },
  league: ultraSunUltraMoonLeague
};

ultraSunUltraMoonGuide.gyms.forEach(assertBattle);
assertLeague(ultraSunUltraMoonLeague);
