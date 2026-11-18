import { assertBattle, assertLeague } from './helpers.js';
import { swordShieldLeague } from './gen8-sword-shield-league.js';

// 首次主線；來源與逐項覆核記錄見 output/guide-review/all-generations/gen7-8-corrections.json。
export const swordShieldGuide = {
  "id": "sword-shield",
  "title": "寶可夢 劍／盾",
  "displayGeneration": 8,
  "status": "complete",
  "quickNavigation": true,
  "notes": "伽勒爾使用冠軍盃；準決賽為瑪俐→赫普，決賽彼特插入後為露璃娜→彩豆（劍）或歐尼奧（盾）→奇巴納。其間有劇情中斷，最後再挑戰丹帝；不可描述成不能恢復的傳統五連戰。",
  "gyms": [
    {
      "location": "草路鎮",
      "badge": "青草徽章",
      "badgeType": "grass",
      "order": 1,
      "role": "gym",
      "name": "亞洛",
      "notes": "火或飛行攻擊；對方白蓬蓬極巨化，12級並非合理基準。",
      "party": [
        {
          "name": "幼棉棉",
          "types": [
            "grass"
          ],
          "level": 19
        },
        {
          "name": "白蓬蓬",
          "types": [
            "grass"
          ],
          "level": 20
        }
      ],
      "strategy": {
        "level": "對手最高 Lv.20；依隊伍能力調整",
        "summary": "火或飛行攻擊；對方白蓬蓬極巨化，12級並非合理基準。",
        "tips": [
          "推薦為可替換候選；御三家僅在你選擇該開局時可用，不假設交換取得另外兩隻。"
        ]
      },
      "recommendedTeams": [
        {
          "label": "可取得的對策候選",
          "reason": "火或飛行攻擊；對方白蓬蓬極巨化，12級並非合理基準。",
          "pokemon": [
            {
              "name": "藍鴉",
              "types": [
                "flying"
              ],
              "obtain": "1/2號道路稚山雀18級進化",
              "moveNote": "啄食等飛行招；不是轟擂金剛猩"
            },
            {
              "name": "巴大蝶",
              "types": [
                "bug",
                "flying"
              ],
              "obtain": "1號道路綠毛蟲7級鐵甲蛹、10級巴大蝶",
              "moveNote": "起風等飛行招"
            }
          ]
        }
      ]
    },
    {
      "location": "水舟鎮",
      "badge": "水滴徽章",
      "badgeType": "water",
      "order": 2,
      "role": "gym",
      "name": "露璃娜",
      "notes": "草電處理前兩隻；暴噬龜水岩4倍弱草。",
      "party": [
        {
          "name": "角金魚",
          "types": [
            "water"
          ],
          "level": 22
        },
        {
          "name": "刺梭魚",
          "types": [
            "water"
          ],
          "level": 23
        },
        {
          "name": "暴噬龜",
          "types": [
            "water",
            "rock"
          ],
          "level": 24
        }
      ],
      "strategy": {
        "level": "對手最高 Lv.24；依隊伍能力調整",
        "summary": "草電處理前兩隻；暴噬龜水岩4倍弱草。",
        "tips": [
          "推薦為可替換候選；御三家僅在你選擇該開局時可用，不假設交換取得另外兩隻。"
        ]
      },
      "recommendedTeams": [
        {
          "label": "可取得的對策候選",
          "reason": "草電處理前兩隻；暴噬龜水岩4倍弱草。",
          "pokemon": [
            {
              "name": "白蓬蓬",
              "types": [
                "grass"
              ],
              "obtain": "3號道路幼棉棉20級進化",
              "moveNote": "魔法葉；草招4倍打暴噬龜"
            },
            {
              "name": "來電汪",
              "types": [
                "electric"
              ],
              "obtain": "2/4號道路",
              "moveNote": "電光等電招；25級進化逐電犬，不要求早期十萬伏特"
            }
          ]
        }
      ]
    },
    {
      "location": "機擎市",
      "badge": "火焰徽章",
      "badgeType": "fire",
      "order": 3,
      "role": "gym",
      "name": "卡蕪",
      "notes": "水打九尾/風速狗，焚焰蚣4倍弱岩；注意鬼火降低物攻。",
      "party": [
        {
          "name": "九尾",
          "types": [
            "fire"
          ],
          "level": 25
        },
        {
          "name": "風速狗",
          "types": [
            "fire"
          ],
          "level": 25
        },
        {
          "name": "焚焰蚣",
          "types": [
            "fire",
            "bug"
          ],
          "level": 27
        }
      ],
      "strategy": {
        "level": "對手最高 Lv.27；依隊伍能力調整",
        "summary": "水打九尾/風速狗，焚焰蚣4倍弱岩；注意鬼火降低物攻。",
        "tips": [
          "推薦為可替換候選；御三家僅在你選擇該開局時可用，不假設交換取得另外兩隻。"
        ]
      },
      "recommendedTeams": [
        {
          "label": "可取得的對策候選",
          "reason": "水打九尾/風速狗，焚焰蚣4倍弱岩；注意鬼火降低物攻。",
          "pokemon": [
            {
              "name": "暴噬龜",
              "types": [
                "water",
                "rock"
              ],
              "obtain": "2號道路咬咬龜22級進化",
              "moveNote": "岩石封鎖等已學岩石招；咬咬龜本體純水"
            },
            {
              "name": "變澀蜥",
              "types": [
                "water"
              ],
              "obtain": "淚眼蜥開局16級進化",
              "moveNote": "水之波動等水招"
            }
          ]
        }
      ]
    },
    {
      "location": "戰競鎮",
      "badge": "格鬥／幽靈徽章",
      "badgeType": "mixed",
      "order": 4,
      "role": "gym",
      "name": "彩豆／歐尼奧",
      "notes": "劍版由彩豆出戰；盾版由歐尼奧出戰。",
      "party": [
        {
          "name": "戰舞郎",
          "types": [
            "fighting"
          ],
          "level": 34
        },
        {
          "name": "流氓熊貓",
          "types": [
            "fighting",
            "dark"
          ],
          "level": 34
        },
        {
          "name": "蔥遊兵",
          "types": [
            "fighting"
          ],
          "level": 35
        },
        {
          "name": "怪力",
          "types": [
            "fighting"
          ],
          "level": 36
        }
      ],
      "strategy": {
        "level": "對手最高 Lv.36；依隊伍能力調整",
        "summary": "劍版由彩豆出戰；盾版由歐尼奧出戰。",
        "tips": [
          "推薦為可替換候選；御三家僅在你選擇該開局時可用，不假設交換取得另外兩隻。"
        ]
      },
      "recommendedTeams": [
        {
          "label": "可取得的對策候選",
          "reason": "劍版由彩豆出戰；盾版由歐尼奧出戰。",
          "pokemon": [
            {
              "name": "藍鴉",
              "types": [
                "flying"
              ],
              "obtain": "1/2號道路稚山雀18級進化",
              "moveNote": "啄食等飛行招；不是轟擂金剛猩"
            },
            {
              "name": "狐大盜",
              "types": [
                "dark"
              ],
              "obtain": "1號道路偷兒狐18級進化",
              "moveNote": "惡招打盾版幽靈；謎擬Q對惡僅等倍"
            }
          ]
        }
      ],
      "variants": [
        {
          "label": "劍：彩豆",
          "party": [
            {
              "name": "戰舞郎",
              "types": [
                "fighting"
              ],
              "level": 34
            },
            {
              "name": "流氓熊貓",
              "types": [
                "fighting",
                "dark"
              ],
              "level": 34
            },
            {
              "name": "蔥遊兵",
              "types": [
                "fighting"
              ],
              "level": 35
            },
            {
              "name": "怪力",
              "types": [
                "fighting"
              ],
              "level": 36
            }
          ],
          "strategy": "飛行/妖精招；流氓熊貓免疫超能，妖精4倍。",
          "tips": [
            "飛行/妖精招；流氓熊貓免疫超能，妖精4倍。"
          ]
        },
        {
          "label": "盾：歐尼奧",
          "party": [
            {
              "name": "哭哭面具（伽勒爾）",
              "types": [
                "ground",
                "ghost"
              ],
              "level": 34
            },
            {
              "name": "謎擬Ｑ",
              "types": [
                "ghost",
                "fairy"
              ],
              "level": 34
            },
            {
              "name": "魔靈珊瑚",
              "types": [
                "ghost"
              ],
              "level": 35
            },
            {
              "name": "耿鬼",
              "types": [
                "ghost",
                "poison"
              ],
              "level": 36
            }
          ],
          "strategy": "惡招打多數；謎擬Ｑ改鋼招。一般/格鬥招對幽靈無效。",
          "tips": [
            "惡招打多數；謎擬Ｑ改鋼招。一般/格鬥招對幽靈無效。"
          ]
        }
      ]
    },
    {
      "location": "舞姿鎮",
      "badge": "妖精徽章",
      "badgeType": "fairy",
      "order": 5,
      "role": "gym",
      "name": "波普菈",
      "notes": "鋼打波克基斯/霜奶仙；大嘴娃免疫毒，改火或地面。伽勒爾雙彈瓦斯毒妖精，不可當純毒。",
      "party": [
        {
          "name": "雙彈瓦斯（伽勒爾）",
          "types": [
            "poison",
            "fairy"
          ],
          "level": 36
        },
        {
          "name": "大嘴娃",
          "types": [
            "steel",
            "fairy"
          ],
          "level": 36
        },
        {
          "name": "波克基斯",
          "types": [
            "fairy",
            "flying"
          ],
          "level": 37
        },
        {
          "name": "霜奶仙",
          "types": [
            "fairy"
          ],
          "level": 38
        }
      ],
      "strategy": {
        "level": "對手最高 Lv.38；依隊伍能力調整",
        "summary": "鋼打波克基斯/霜奶仙；大嘴娃免疫毒，改火或地面。伽勒爾雙彈瓦斯毒妖精，不可當純毒。",
        "tips": [
          "推薦為可替換候選；御三家僅在你選擇該開局時可用，不假設交換取得另外兩隻。"
        ]
      },
      "recommendedTeams": [
        {
          "label": "可取得的對策候選",
          "reason": "鋼打波克基斯/霜奶仙；大嘴娃免疫毒，改火或地面。伽勒爾雙彈瓦斯毒妖精，不可當純毒。",
          "pokemon": [
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
              "name": "龍頭地鼠",
              "types": [
                "ground",
                "steel"
              ],
              "obtain": "伽勒爾礦山螺釘地鼠31級進化",
              "moveNote": "挖洞/地震等地面招；後期可用鋼招"
            }
          ]
        }
      ]
    },
    {
      "location": "漣漪鎮",
      "badge": "岩石／冰徽章",
      "badgeType": "mixed",
      "order": 6,
      "role": "gym",
      "name": "瑪瓜／美蓉",
      "notes": "劍是瑪瓜，盾是美蓉；需兩套名單。",
      "party": [
        {
          "name": "龜足巨鎧",
          "types": [
            "rock",
            "water"
          ],
          "level": 40
        },
        {
          "name": "壺壺",
          "types": [
            "bug",
            "rock"
          ],
          "level": 40
        },
        {
          "name": "巨石丁",
          "types": [
            "rock"
          ],
          "level": 41
        },
        {
          "name": "巨炭山",
          "types": [
            "rock",
            "fire"
          ],
          "level": 42
        }
      ],
      "strategy": {
        "level": "對手最高 Lv.42；依隊伍能力調整",
        "summary": "劍是瑪瓜，盾是美蓉；需兩套名單。",
        "tips": [
          "推薦為可替換候選；御三家僅在你選擇該開局時可用，不假設交換取得另外兩隻。"
        ]
      },
      "recommendedTeams": [
        {
          "label": "可取得的對策候選",
          "reason": "劍是瑪瓜，盾是美蓉；需兩套名單。",
          "pokemon": [
            {
              "name": "暴噬龜",
              "types": [
                "water",
                "rock"
              ],
              "obtain": "2號道路咬咬龜22級進化",
              "moveNote": "岩石封鎖等已學岩石招；咬咬龜本體純水"
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
              "name": "白蓬蓬",
              "types": [
                "grass"
              ],
              "obtain": "3號道路幼棉棉20級進化",
              "moveNote": "魔法葉；草招4倍打暴噬龜"
            }
          ]
        }
      ],
      "variants": [
        {
          "label": "劍：瑪瓜",
          "party": [
            {
              "name": "龜足巨鎧",
              "types": [
                "rock",
                "water"
              ],
              "level": 40
            },
            {
              "name": "壺壺",
              "types": [
                "bug",
                "rock"
              ],
              "level": 40
            },
            {
              "name": "巨石丁",
              "types": [
                "rock"
              ],
              "level": 41
            },
            {
              "name": "巨炭山",
              "types": [
                "rock",
                "fire"
              ],
              "level": 42
            }
          ],
          "strategy": "龜足巨鎧4倍弱草，巨炭山4倍弱水/地面；壺壺用水/鋼。",
          "tips": [
            "龜足巨鎧4倍弱草，巨炭山4倍弱水/地面；壺壺用水/鋼。"
          ]
        },
        {
          "label": "盾：美蓉",
          "party": [
            {
              "name": "雪絨蛾",
              "types": [
                "ice",
                "bug"
              ],
              "level": 40
            },
            {
              "name": "達摩狒狒（伽勒爾）",
              "types": [
                "ice"
              ],
              "level": 40
            },
            {
              "name": "冰砌鵝",
              "types": [
                "ice"
              ],
              "level": 41
            },
            {
              "name": "拉普拉斯",
              "types": [
                "water",
                "ice"
              ],
              "level": 42
            }
          ],
          "strategy": "正確第三隻冰砌鵝；物理招先破結凍頭，再攻本體；拉普拉斯用電/草/格鬥，火僅等倍。",
          "tips": [
            "正確第三隻冰砌鵝；物理招先破結凍頭，再攻本體；拉普拉斯用電/草/格鬥，火僅等倍。"
          ]
        }
      ]
    },
    {
      "location": "尖釘鎮",
      "badge": "惡徽章",
      "badgeType": "dark",
      "order": 7,
      "role": "gym",
      "name": "聶梓",
      "notes": "此戰不能極巨化。頭巾混混4倍弱妖精，烏賊王4倍弱蟲，坦克臭鼬只弱地面，堵攔熊4倍弱格鬥。",
      "party": [
        {
          "name": "頭巾混混",
          "types": [
            "dark",
            "fighting"
          ],
          "level": 44
        },
        {
          "name": "烏賊王",
          "types": [
            "dark",
            "psychic"
          ],
          "level": 45
        },
        {
          "name": "坦克臭鼬",
          "types": [
            "poison",
            "dark"
          ],
          "level": 45
        },
        {
          "name": "堵攔熊",
          "types": [
            "dark",
            "normal"
          ],
          "level": 46
        }
      ],
      "strategy": {
        "level": "對手最高 Lv.46；依隊伍能力調整",
        "summary": "此戰不能極巨化。頭巾混混4倍弱妖精，烏賊王4倍弱蟲，坦克臭鼬只弱地面，堵攔熊4倍弱格鬥。",
        "tips": [
          "推薦為可替換候選；御三家僅在你選擇該開局時可用，不假設交換取得另外兩隻。"
        ]
      },
      "recommendedTeams": [
        {
          "label": "可取得的對策候選",
          "reason": "此戰不能極巨化。頭巾混混4倍弱妖精，烏賊王4倍弱蟲，坦克臭鼬只弱地面，堵攔熊4倍弱格鬥。",
          "pokemon": [
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
              "name": "龍頭地鼠",
              "types": [
                "ground",
                "steel"
              ],
              "obtain": "伽勒爾礦山螺釘地鼠31級進化",
              "moveNote": "挖洞/地震等地面招；後期可用鋼招"
            },
            {
              "name": "穿著熊",
              "types": [
                "normal",
                "fighting"
              ],
              "obtain": "5號道路童偶熊27級進化",
              "moveNote": "格鬥招；絨毛遇火須注意"
            }
          ]
        }
      ]
    },
    {
      "location": "拳關市",
      "badge": "龍之徽章",
      "badgeType": "dragon",
      "order": 8,
      "role": "gym",
      "name": "奇巴納",
      "notes": "雙打沙暴隊。沙漠蜻蜓4倍弱冰，鋁鋼龍只弱地面/格鬥；火冰妖精均等倍。別寫成四隻純龍。",
      "party": [
        {
          "name": "龐岩怪",
          "types": [
            "rock"
          ],
          "level": 46
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
          "name": "沙螺蟒",
          "types": [
            "ground"
          ],
          "level": 46
        },
        {
          "name": "鋁鋼龍",
          "types": [
            "steel",
            "dragon"
          ],
          "level": 48
        }
      ],
      "strategy": {
        "level": "對手最高 Lv.48；依隊伍能力調整",
        "summary": "雙打沙暴隊。沙漠蜻蜓4倍弱冰，鋁鋼龍只弱地面/格鬥；火冰妖精均等倍。別寫成四隻純龍。",
        "tips": [
          "推薦為可替換候選；御三家僅在你選擇該開局時可用，不假設交換取得另外兩隻。"
        ]
      },
      "recommendedTeams": [
        {
          "label": "可取得的對策候選",
          "reason": "雙打沙暴隊。沙漠蜻蜓4倍弱冰，鋁鋼龍只弱地面/格鬥；火冰妖精均等倍。別寫成四隻純龍。",
          "pokemon": [
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
              "name": "大嘴鷗",
              "types": [
                "water",
                "flying"
              ],
              "obtain": "沿海長翅鷗25級進化",
              "moveNote": "水招打龐岩怪/沙螺蟒，降雨特性可改天氣；小心沙漠蜻蜓雷電拳"
            }
          ]
        }
      ]
    }
  ],
  "eliteFour": [
    {
      "order": 2,
      "role": "eliteFour",
      "name": "瑪俐（準決賽）",
      "party": [
        {
          "name": "酷豹",
          "types": [
            "dark"
          ],
          "level": 47
        },
        {
          "name": "毒骷蛙",
          "types": [
            "poison",
            "fighting"
          ],
          "level": 47
        },
        {
          "name": "頭巾混混",
          "types": [
            "dark",
            "fighting"
          ],
          "level": 47
        },
        {
          "name": "莫魯貝可",
          "types": [
            "electric",
            "dark"
          ],
          "level": 48
        },
        {
          "name": "長毛巨魔",
          "types": [
            "dark",
            "fairy"
          ],
          "level": 49
        }
      ],
      "notes": "妖精打惡；毒骷蛙4倍弱超能。長毛巨魔不弱格鬥，莫魯貝可換形態不改自身電惡屬性。",
      "roleLabel": "冠軍盃"
    },
    {
      "order": 1,
      "role": "eliteFour",
      "name": "赫普（準決賽）",
      "party": [
        {
          "name": "毛毛角羊",
          "types": [
            "normal"
          ],
          "level": 48
        },
        {
          "name": "鋼鎧鴉",
          "types": [
            "flying",
            "steel"
          ],
          "level": 48
        },
        {
          "name": "啪嚓海膽",
          "types": [
            "electric"
          ],
          "level": 47
        },
        {
          "name": "卡比獸",
          "types": [
            "normal"
          ],
          "level": 47
        },
        {
          "name": "千面避役",
          "types": [
            "water"
          ],
          "level": 49
        }
      ],
      "notes": "末隻是被玩家御三家剋制的最終進化。鋼鎧鴉弱火電不弱冰，啪嚓海膽純電。",
      "roleLabel": "冠軍盃",
      "variants": [
        {
          "label": "玩家選炎兔兒",
          "party": [
            {
              "name": "毛毛角羊",
              "types": [
                "normal"
              ],
              "level": 48
            },
            {
              "name": "鋼鎧鴉",
              "types": [
                "flying",
                "steel"
              ],
              "level": 48
            },
            {
              "name": "啪嚓海膽",
              "types": [
                "electric"
              ],
              "level": 47
            },
            {
              "name": "卡比獸",
              "types": [
                "normal"
              ],
              "level": 47
            },
            {
              "name": "轟擂金剛猩",
              "types": [
                "grass"
              ],
              "level": 49
            }
          ],
          "strategy": "",
          "tips": [
            "末隻是被玩家御三家剋制的最終進化。鋼鎧鴉弱火電不弱冰，啪嚓海膽純電。"
          ]
        },
        {
          "label": "玩家選敲音猴",
          "party": [
            {
              "name": "毛毛角羊",
              "types": [
                "normal"
              ],
              "level": 48
            },
            {
              "name": "鋼鎧鴉",
              "types": [
                "flying",
                "steel"
              ],
              "level": 48
            },
            {
              "name": "啪嚓海膽",
              "types": [
                "electric"
              ],
              "level": 47
            },
            {
              "name": "卡比獸",
              "types": [
                "normal"
              ],
              "level": 47
            },
            {
              "name": "千面避役",
              "types": [
                "water"
              ],
              "level": 49
            }
          ],
          "strategy": "",
          "tips": [
            "末隻是被玩家御三家剋制的最終進化。鋼鎧鴉弱火電不弱冰，啪嚓海膽純電。"
          ]
        },
        {
          "label": "玩家選淚眼蜥",
          "party": [
            {
              "name": "毛毛角羊",
              "types": [
                "normal"
              ],
              "level": 48
            },
            {
              "name": "鋼鎧鴉",
              "types": [
                "flying",
                "steel"
              ],
              "level": 48
            },
            {
              "name": "啪嚓海膽",
              "types": [
                "electric"
              ],
              "level": 47
            },
            {
              "name": "卡比獸",
              "types": [
                "normal"
              ],
              "level": 47
            },
            {
              "name": "閃焰王牌",
              "types": [
                "fire"
              ],
              "level": 49
            }
          ],
          "strategy": "",
          "tips": [
            "末隻是被玩家御三家剋制的最終進化。鋼鎧鴉弱火電不弱冰，啪嚓海膽純電。"
          ]
        }
      ]
    },
    {
      "order": 4,
      "role": "eliteFour",
      "name": "彼特（決賽前插入戰）",
      "party": [
        {
          "name": "大嘴娃",
          "types": [
            "steel",
            "fairy"
          ],
          "level": 51
        },
        {
          "name": "沙奈朵",
          "types": [
            "psychic",
            "fairy"
          ],
          "level": 51
        },
        {
          "name": "烈焰馬（伽勒爾）",
          "types": [
            "psychic",
            "fairy"
          ],
          "level": 52
        },
        {
          "name": "布莉姆溫",
          "types": [
            "psychic",
            "fairy"
          ],
          "level": 53
        }
      ],
      "notes": "火/地面打大嘴娃，鋼或幽靈打其餘超能妖精。",
      "roleLabel": "冠軍盃"
    },
    {
      "order": 5,
      "role": "eliteFour",
      "name": "露璃娜（決賽）",
      "party": [
        {
          "name": "具甲武者",
          "types": [
            "bug",
            "water"
          ],
          "level": 51
        },
        {
          "name": "大嘴鷗",
          "types": [
            "water",
            "flying"
          ],
          "level": 51
        },
        {
          "name": "戽斗尖梭",
          "types": [
            "water"
          ],
          "level": 52
        },
        {
          "name": "金魚王",
          "types": [
            "water"
          ],
          "level": 52
        },
        {
          "name": "暴噬龜",
          "types": [
            "water",
            "rock"
          ],
          "level": 53
        }
      ],
      "notes": "大嘴鷗4倍弱電、暴噬龜4倍弱草；具甲武者草等倍。",
      "roleLabel": "冠軍盃"
    },
    {
      "order": 6,
      "role": "eliteFour",
      "name": "彩豆／歐尼奧（決賽）",
      "party": [
        {
          "name": "摔角鷹人",
          "types": [
            "fighting",
            "flying"
          ],
          "level": 52
        },
        {
          "name": "八爪武師",
          "types": [
            "fighting"
          ],
          "level": 52
        },
        {
          "name": "蔥遊兵",
          "types": [
            "fighting"
          ],
          "level": 53
        },
        {
          "name": "列陣兵",
          "types": [
            "fighting"
          ],
          "level": 53
        },
        {
          "name": "怪力",
          "types": [
            "fighting"
          ],
          "level": 54
        }
      ],
      "notes": "依遊戲版本分支，並非同時連戰。",
      "roleLabel": "冠軍盃",
      "variants": [
        {
          "label": "劍：彩豆",
          "party": [
            {
              "name": "摔角鷹人",
              "types": [
                "fighting",
                "flying"
              ],
              "level": 52
            },
            {
              "name": "八爪武師",
              "types": [
                "fighting"
              ],
              "level": 52
            },
            {
              "name": "蔥遊兵",
              "types": [
                "fighting"
              ],
              "level": 53
            },
            {
              "name": "列陣兵",
              "types": [
                "fighting"
              ],
              "level": 53
            },
            {
              "name": "怪力",
              "types": [
                "fighting"
              ],
              "level": 54
            }
          ],
          "strategy": "",
          "tips": [
            "依遊戲版本分支，並非同時連戰。"
          ]
        },
        {
          "label": "盾：歐尼奧",
          "party": [
            {
              "name": "黑夜魔靈",
              "types": [
                "ghost"
              ],
              "level": 52
            },
            {
              "name": "水晶燈火靈",
              "types": [
                "ghost",
                "fire"
              ],
              "level": 52
            },
            {
              "name": "魔靈珊瑚",
              "types": [
                "ghost"
              ],
              "level": 53
            },
            {
              "name": "怖思壺",
              "types": [
                "ghost"
              ],
              "level": 53
            },
            {
              "name": "耿鬼",
              "types": [
                "ghost",
                "poison"
              ],
              "level": 54
            }
          ],
          "strategy": "",
          "tips": [
            "依遊戲版本分支，並非同時連戰。"
          ]
        }
      ]
    },
    {
      "order": 3,
      "role": "eliteFour",
      "name": "奇巴納（決賽）",
      "party": [
        {
          "name": "煤炭龜",
          "types": [
            "fire"
          ],
          "level": 53
        },
        {
          "name": "黏美龍",
          "types": [
            "dragon"
          ],
          "level": 54
        },
        {
          "name": "爆焰龜獸",
          "types": [
            "fire",
            "dragon"
          ],
          "level": 54
        },
        {
          "name": "沙漠蜻蜓",
          "types": [
            "ground",
            "dragon"
          ],
          "level": 54
        },
        {
          "name": "鋁鋼龍",
          "types": [
            "steel",
            "dragon"
          ],
          "level": 55
        }
      ],
      "notes": "此戰單打，多種天氣；冰打沙漠蜻蜓，地面/格鬥打鋁鋼龍，火招打鋁鋼龍僅等倍。",
      "roleLabel": "冠軍盃"
    }
  ],
  "champion": {
    "role": "champion",
    "name": "丹帝",
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
    "notes": "最後噴火龍65級超極巨化，需水/電/岩石；注意其日光束對水岩的反制。雙斧戰龍有毒/鋼補盲，妖精不是無條件安全。"
  },
  "leagueTitle": "冠軍盃與丹帝",
  league: swordShieldLeague
};

swordShieldGuide.gyms.forEach(assertBattle);
assertLeague(swordShieldLeague);
