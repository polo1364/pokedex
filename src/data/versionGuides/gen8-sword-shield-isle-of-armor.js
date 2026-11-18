import { assertBattle } from './helpers.js';

/** 流程與等級來源見 sources；對策為依可取得隊員整理的建議。 */
export const isleOfArmorExpansion = {
  "id": "isle-of-armor",
  "title": "鎧之孤島",
  "tabLabel": "鎧之孤島",
  "battleSectionTitle": "三試煉與武館對戰",
  "prerequisites": [
    {
      "title": "進入條件與等級",
      "rows": [
        {
          "label": "購買與入口",
          "value": "持有與劍／盾版本相符的擴充票、更新遊戲；取得鎧甲車票後，於木桿鎮車站處理伽勒爾呆呆獸事件，再搭車前往鎧島。"
        },
        {
          "label": "等級分界",
          "value": "初到曠野地帶後即可開始；主要武館戰以本篇成為冠軍前／後分級。前期可拿熊徒弟與完成雙拳塔，極巨蜜及馬士德全力戰另須完成通關後王族事件：捕捉蒼響／藏瑪然特並完成微寐森林赫普最後戰。"
        },
        {
          "label": "一次選擇",
          "value": "熊徒弟進化的惡之塔／水之塔與遊戲版本無關；同一存檔只能開放所選一座塔。"
        }
      ]
    }
  ],
  "sections": [
    {
      "type": "island",
      "title": "抵達與第一試煉：追逐呆呆獸",
      "number": 1,
      "intro": "揖禮原野迎戰克拉拉（劍）或賽寶利（盾）；到馬師傅武館挑戰馬士德，取得修行服。",
      "flows": [
        "三隻高速伽勒爾呆呆獸偷走修行服；到清涼濕原觀察奔跑路線，以自行車截擊並分別打倒。",
        "集齊三件服裝返回武館；可選妙蛙種子或傑尼龜，培養到最終形態後可超極巨化。"
      ],
      "tips": []
    },
    {
      "type": "island",
      "title": "第二、三試煉：極巨菇菇與決賽",
      "number": 2,
      "intro": "從專注森林穿過鍛鍊平原前往熱身洞穴，調查極巨菇菇並打贏克拉拉／賽寶利。",
      "flows": [
        "把極巨菇菇帶回武館；完成極巨湯說明後，到武館後方對戰場進行第三試煉。",
        "決賽前補滿HP、PP並帶解毒藥；獲勝後馬士德贈送熊徒弟，島上也開放同行寶可夢。"
      ],
      "tips": []
    },
    {
      "type": "island",
      "title": "培養熊徒弟與雙拳塔分歧",
      "number": 3,
      "intro": "把熊徒弟放在隊伍，前往地圖標示的景點與武館門生一起看景，提高親密度後回報馬士德。",
      "flows": [
        "惡之塔：熊徒弟進化格鬥／惡的一擊流；水之塔：進化格鬥／水的連擊流。確認所需流派後才選塔，這不由劍／盾決定。",
        "只能以熊徒弟單獨打五層；冠軍前塔頂Lv30，冠軍後Lv70。帶回復道具；塔頂讀卷軸才進化。",
        "一擊流學暗冥強擊、連擊流學水流連打；這些進化招本身能確定要害，不必把所有資源都花在要害道具。"
      ],
      "tips": []
    },
    {
      "type": "island",
      "title": "極巨湯與極巨蜜：完成武道熊師",
      "number": 4,
      "intro": "三試煉後可用3個極巨菇菇製作極巨湯；只適用支援的超極巨化種類，喝湯能切換超極巨化資格。",
      "flows": [
        "極巨菇菇可於鎧島森林與洞穴出現；參與島上的極巨團體戰後再巡查，不是地圖上無限即時拾取。",
        "完成本篇通關後王族事件（捕捉蒼響／藏瑪然特＋微寐森林赫普最後戰）且熊徒弟進化後回武館找赫普，調查專注森林的百合根娃娃與裙兒小姐，再找啃果蟲。",
        "前往蜂巢島搖中央大樹，挑戰極巨化蜂女王取得極巨蜜。武道熊師的湯需3個極巨菇菇＋1個極巨蜜。",
        "調製後向馬士德提出全力挑戰，勝利取得其稀有聯盟卡，完成鎧島主要劇情。"
      ],
      "tips": []
    },
    {
      "type": "island",
      "title": "通關後可持續做的內容",
      "number": 5,
      "intro": "每日可再戰馬士德；克拉拉／賽寶利也有強化後對戰。",
      "flows": [
        "向蜜葉投入瓦特逐步擴建武館服務；投入前看清當次目標，不必把所有瓦特一次交完。",
        "收集150隻地鼠取得獎勵；用鎧甲礦石學島上招式、使用合成機器。",
        "限制組手為單一屬性三隻挑戰，獨立於故事通關；要另外配置回復、PP與剋制面。"
      ],
      "tips": []
    }
  ],
  "gyms": [
    {
      "order": 1,
      "role": "trainer",
      "name": "克拉拉／賽寶利：抵達鎧島",
      "location": "揖禮原野",
      "party": [
        {
          "name": "百足蜈蚣",
          "types": [
            "bug",
            "poison"
          ],
          "level": 10
        },
        {
          "name": "呆呆獸（伽勒爾）",
          "types": [
            "psychic"
          ],
          "level": 12
        }
      ],
      "notes": "劍為克拉拉；盾為賽寶利。未成為冠軍與通關後有兩套固定等級，不按隊伍最高等級動態縮放。",
      "recommendedTeams": [
        {
          "label": "可取得的對策候選（依需要選用）",
          "reason": "克拉拉以地面或超能招處理毒系，但伽勒爾雙彈瓦斯須先確認漂浮；賽寶利以惡招處理超能。前期不要要求未到迷光森林的玩家持有長毛巨魔，可先用2號道路的偷兒狐。",
          "pokemon": [
            {
              "name": "泥驢仔",
              "types": [
                "ground"
              ],
              "obtain": "伽勒爾曠野地帶滾滾山丘等區域",
              "moveNote": "升級學習地面招；地面招不能命中漂浮或飛行目標。"
            },
            {
              "name": "偷兒狐",
              "types": [
                "dark"
              ],
              "obtain": "2號道路；Lv18進化狐大盜",
              "moveNote": "升級取得惡招；不要用格鬥招打超能系。"
            }
          ]
        }
      ],
      "strategy": {
        "level": "依下方版本／進度隊伍的最高等級準備；捕捉戰另帶削血與異常狀態手段。",
        "summary": "克拉拉以地面或超能招處理毒系，但伽勒爾雙彈瓦斯須先確認漂浮；賽寶利以惡招處理超能。前期不要要求未到迷光森林的玩家持有長毛巨魔，可先用2號道路的偷兒狐。",
        "tips": [
          "劍為克拉拉；盾為賽寶利。未成為冠軍與通關後有兩套固定等級，不按隊伍最高等級動態縮放。"
        ]
      },
      "variants": [
        {
          "label": "劍／冠軍前",
          "party": [
            {
              "name": "百足蜈蚣",
              "types": [
                "bug",
                "poison"
              ],
              "level": 10
            },
            {
              "name": "呆呆獸（伽勒爾）",
              "types": [
                "psychic"
              ],
              "level": 12
            }
          ]
        },
        {
          "label": "劍／冠軍後",
          "party": [
            {
              "name": "百足蜈蚣",
              "types": [
                "bug",
                "poison"
              ],
              "level": 58
            },
            {
              "name": "呆呆獸（伽勒爾）",
              "types": [
                "psychic"
              ],
              "level": 60
            }
          ]
        },
        {
          "label": "盾／冠軍前",
          "party": [
            {
              "name": "凱西",
              "types": [
                "psychic"
              ],
              "level": 10
            },
            {
              "name": "呆呆獸（伽勒爾）",
              "types": [
                "psychic"
              ],
              "level": 12
            }
          ]
        },
        {
          "label": "盾／冠軍後",
          "party": [
            {
              "name": "凱西",
              "types": [
                "psychic"
              ],
              "level": 58
            },
            {
              "name": "呆呆獸（伽勒爾）",
              "types": [
                "psychic"
              ],
              "level": 60
            }
          ]
        }
      ]
    },
    {
      "order": 2,
      "role": "trainer",
      "name": "馬士德：入門考驗",
      "location": "馬師傅武館",
      "party": [
        {
          "name": "功夫鼬",
          "types": [
            "fighting"
          ],
          "level": 13
        },
        {
          "name": "小貓怪",
          "types": [
            "electric"
          ],
          "level": 13
        }
      ],
      "notes": "首場兩隻：冠軍前Lv13，冠軍後Lv61。打贏才開始三項試煉。",
      "recommendedTeams": [
        {
          "label": "可取得的對策候選（依需要選用）",
          "reason": "飛行招打功夫鼬；泥驢仔免疫小貓怪電招，但不要讓飛行系硬接電招。",
          "pokemon": [
            {
              "name": "稚山雀",
              "types": [
                "flying"
              ],
              "obtain": "伽勒爾1號道路；升級成藍鴉、鋼鎧鴉",
              "moveNote": "使用自身升級的飛行招；最終戰可用鋼鎧鴉抗物理傷害。"
            },
            {
              "name": "泥驢仔",
              "types": [
                "ground"
              ],
              "obtain": "伽勒爾曠野地帶滾滾山丘等區域",
              "moveNote": "升級學習地面招；地面招不能命中漂浮或飛行目標。"
            }
          ]
        }
      ],
      "strategy": {
        "level": "依下方版本／進度隊伍的最高等級準備；捕捉戰另帶削血與異常狀態手段。",
        "summary": "飛行招打功夫鼬；泥驢仔免疫小貓怪電招，但不要讓飛行系硬接電招。",
        "tips": [
          "首場兩隻：冠軍前Lv13，冠軍後Lv61。打贏才開始三項試煉。"
        ]
      },
      "variants": [
        {
          "label": "冠軍前",
          "party": [
            {
              "name": "功夫鼬",
              "types": [
                "fighting"
              ],
              "level": 13
            },
            {
              "name": "小貓怪",
              "types": [
                "electric"
              ],
              "level": 13
            }
          ]
        },
        {
          "label": "冠軍後",
          "party": [
            {
              "name": "功夫鼬",
              "types": [
                "fighting"
              ],
              "level": 61
            },
            {
              "name": "小貓怪",
              "types": [
                "electric"
              ],
              "level": 61
            }
          ]
        }
      ]
    },
    {
      "order": 3,
      "role": "trainer",
      "name": "克拉拉／賽寶利：極巨菇菇",
      "location": "熱身洞穴",
      "party": [
        {
          "name": "呆呆獸（伽勒爾）",
          "types": [
            "psychic"
          ],
          "level": 18
        },
        {
          "name": "瓦斯彈",
          "types": [
            "poison"
          ],
          "level": 18
        },
        {
          "name": "車輪毬",
          "types": [
            "bug",
            "poison"
          ],
          "level": 19
        }
      ],
      "notes": "調查洞穴中的極巨菇菇後開戰；勝利後帶菇菇回武館。",
      "recommendedTeams": [
        {
          "label": "可取得的對策候選（依需要選用）",
          "reason": "克拉拉以地面或超能招處理毒系，但伽勒爾雙彈瓦斯須先確認漂浮；賽寶利以惡招處理超能。前期不要要求未到迷光森林的玩家持有長毛巨魔，可先用2號道路的偷兒狐。",
          "pokemon": [
            {
              "name": "泥驢仔",
              "types": [
                "ground"
              ],
              "obtain": "伽勒爾曠野地帶滾滾山丘等區域",
              "moveNote": "升級學習地面招；地面招不能命中漂浮或飛行目標。"
            },
            {
              "name": "偷兒狐",
              "types": [
                "dark"
              ],
              "obtain": "2號道路；Lv18進化狐大盜",
              "moveNote": "升級取得惡招；不要用格鬥招打超能系。"
            }
          ]
        }
      ],
      "strategy": {
        "level": "依下方版本／進度隊伍的最高等級準備；捕捉戰另帶削血與異常狀態手段。",
        "summary": "克拉拉以地面或超能招處理毒系，但伽勒爾雙彈瓦斯須先確認漂浮；賽寶利以惡招處理超能。前期不要要求未到迷光森林的玩家持有長毛巨魔，可先用2號道路的偷兒狐。",
        "tips": [
          "調查洞穴中的極巨菇菇後開戰；勝利後帶菇菇回武館。"
        ]
      },
      "variants": [
        {
          "label": "劍／冠軍前",
          "party": [
            {
              "name": "呆呆獸（伽勒爾）",
              "types": [
                "psychic"
              ],
              "level": 18
            },
            {
              "name": "瓦斯彈",
              "types": [
                "poison"
              ],
              "level": 18
            },
            {
              "name": "車輪毬",
              "types": [
                "bug",
                "poison"
              ],
              "level": 19
            }
          ]
        },
        {
          "label": "劍／冠軍後",
          "party": [
            {
              "name": "呆呆獸（伽勒爾）",
              "types": [
                "psychic"
              ],
              "level": 62
            },
            {
              "name": "瓦斯彈",
              "types": [
                "poison"
              ],
              "level": 62
            },
            {
              "name": "車輪毬",
              "types": [
                "bug",
                "poison"
              ],
              "level": 63
            }
          ]
        },
        {
          "label": "盾／冠軍前",
          "party": [
            {
              "name": "呆呆獸（伽勒爾）",
              "types": [
                "psychic"
              ],
              "level": 18
            },
            {
              "name": "滾滾蝙蝠",
              "types": [
                "psychic",
                "flying"
              ],
              "level": 18
            },
            {
              "name": "勇基拉",
              "types": [
                "psychic"
              ],
              "level": 19
            }
          ]
        },
        {
          "label": "盾／冠軍後",
          "party": [
            {
              "name": "呆呆獸（伽勒爾）",
              "types": [
                "psychic"
              ],
              "level": 62
            },
            {
              "name": "滾滾蝙蝠",
              "types": [
                "psychic",
                "flying"
              ],
              "level": 62
            },
            {
              "name": "勇基拉",
              "types": [
                "psychic"
              ],
              "level": 63
            }
          ]
        }
      ]
    },
    {
      "order": 4,
      "role": "trainer",
      "name": "第三試煉：武館決賽",
      "location": "馬師傅武館對戰場",
      "party": [
        {
          "name": "鉗尾蠍",
          "types": [
            "poison",
            "bug"
          ],
          "level": 23
        },
        {
          "name": "雙彈瓦斯（伽勒爾）",
          "types": [
            "poison",
            "fairy"
          ],
          "level": 24
        },
        {
          "name": "車輪毬",
          "types": [
            "bug",
            "poison"
          ],
          "level": 24
        },
        {
          "name": "呆殼獸（伽勒爾）",
          "types": [
            "poison",
            "psychic"
          ],
          "level": 25
        }
      ],
      "notes": "克拉拉預先布下毒菱，賽寶利預先展開精神場地；對方最後的伽勒爾呆殼獸會極巨化。精神場地下不要依賴對地面目標的先制招。",
      "recommendedTeams": [
        {
          "label": "可取得的對策候選（依需要選用）",
          "reason": "克拉拉以地面或超能招處理毒系，但伽勒爾雙彈瓦斯須先確認漂浮；賽寶利以惡招處理超能。前期不要要求未到迷光森林的玩家持有長毛巨魔，可先用2號道路的偷兒狐。",
          "pokemon": [
            {
              "name": "泥驢仔",
              "types": [
                "ground"
              ],
              "obtain": "伽勒爾曠野地帶滾滾山丘等區域",
              "moveNote": "升級學習地面招；地面招不能命中漂浮或飛行目標。"
            },
            {
              "name": "偷兒狐",
              "types": [
                "dark"
              ],
              "obtain": "2號道路；Lv18進化狐大盜",
              "moveNote": "升級取得惡招；不要用格鬥招打超能系。"
            }
          ]
        }
      ],
      "strategy": {
        "level": "依下方版本／進度隊伍的最高等級準備；捕捉戰另帶削血與異常狀態手段。",
        "summary": "克拉拉以地面或超能招處理毒系，但伽勒爾雙彈瓦斯須先確認漂浮；賽寶利以惡招處理超能。前期不要要求未到迷光森林的玩家持有長毛巨魔，可先用2號道路的偷兒狐。",
        "tips": [
          "克拉拉預先布下毒菱，賽寶利預先展開精神場地；對方最後的伽勒爾呆殼獸會極巨化。精神場地下不要依賴對地面目標的先制招。"
        ]
      },
      "variants": [
        {
          "label": "劍／冠軍前",
          "party": [
            {
              "name": "鉗尾蠍",
              "types": [
                "poison",
                "bug"
              ],
              "level": 23
            },
            {
              "name": "雙彈瓦斯（伽勒爾）",
              "types": [
                "poison",
                "fairy"
              ],
              "level": 24
            },
            {
              "name": "車輪毬",
              "types": [
                "bug",
                "poison"
              ],
              "level": 24
            },
            {
              "name": "呆殼獸（伽勒爾）",
              "types": [
                "poison",
                "psychic"
              ],
              "level": 25
            }
          ]
        },
        {
          "label": "劍／冠軍後",
          "party": [
            {
              "name": "鉗尾蠍",
              "types": [
                "poison",
                "bug"
              ],
              "level": 65
            },
            {
              "name": "雙彈瓦斯（伽勒爾）",
              "types": [
                "poison",
                "fairy"
              ],
              "level": 66
            },
            {
              "name": "車輪毬",
              "types": [
                "bug",
                "poison"
              ],
              "level": 66
            },
            {
              "name": "呆殼獸（伽勒爾）",
              "types": [
                "poison",
                "psychic"
              ],
              "level": 67
            }
          ]
        },
        {
          "label": "盾／冠軍前",
          "party": [
            {
              "name": "小火馬（伽勒爾）",
              "types": [
                "psychic"
              ],
              "level": 23
            },
            {
              "name": "心蝙蝠",
              "types": [
                "psychic",
                "flying"
              ],
              "level": 24
            },
            {
              "name": "勇基拉",
              "types": [
                "psychic"
              ],
              "level": 24
            },
            {
              "name": "呆殼獸（伽勒爾）",
              "types": [
                "poison",
                "psychic"
              ],
              "level": 25
            }
          ]
        },
        {
          "label": "盾／冠軍後",
          "party": [
            {
              "name": "小火馬（伽勒爾）",
              "types": [
                "psychic"
              ],
              "level": 65
            },
            {
              "name": "心蝙蝠",
              "types": [
                "psychic",
                "flying"
              ],
              "level": 66
            },
            {
              "name": "勇基拉",
              "types": [
                "psychic"
              ],
              "level": 66
            },
            {
              "name": "呆殼獸（伽勒爾）",
              "types": [
                "poison",
                "psychic"
              ],
              "level": 67
            }
          ]
        }
      ]
    },
    {
      "order": 5,
      "role": "trainer",
      "name": "馬士德：雙拳塔頂",
      "location": "惡之塔／水之塔",
      "party": [
        {
          "name": "熊徒弟",
          "types": [
            "fighting"
          ],
          "level": 30
        }
      ],
      "notes": "只能帶熊徒弟一隻進塔。塔頂對手熊徒弟會燕返；冠軍前Lv30、冠軍後Lv70。",
      "recommendedTeams": [
        {
          "label": "可取得的對策候選（依需要選用）",
          "reason": "先把熊徒弟練到接近對手等級並補滿HP；熊徒弟Lv12學會燕返，是本戰有效飛行招。每層可用背包回復，塔頂別在低血量時貪健美。",
          "pokemon": [
            {
              "name": "熊徒弟",
              "types": [
                "fighting"
              ],
              "obtain": "完成三試煉由馬士德贈送",
              "moveNote": "Lv12升級招燕返；提升等級及親密度後單獨入塔。"
            }
          ]
        }
      ],
      "strategy": {
        "level": "依下方版本／進度隊伍的最高等級準備；捕捉戰另帶削血與異常狀態手段。",
        "summary": "先把熊徒弟練到接近對手等級並補滿HP；熊徒弟Lv12學會燕返，是本戰有效飛行招。每層可用背包回復，塔頂別在低血量時貪健美。",
        "tips": [
          "只能帶熊徒弟一隻進塔。塔頂對手熊徒弟會燕返；冠軍前Lv30、冠軍後Lv70。"
        ]
      },
      "variants": [
        {
          "label": "冠軍前",
          "party": [
            {
              "name": "熊徒弟",
              "types": [
                "fighting"
              ],
              "level": 30
            }
          ]
        },
        {
          "label": "冠軍後",
          "party": [
            {
              "name": "熊徒弟",
              "types": [
                "fighting"
              ],
              "level": 70
            }
          ]
        }
      ]
    },
    {
      "order": 6,
      "role": "trainer",
      "name": "馬士德：全力最終戰",
      "location": "馬師傅武館對戰場",
      "party": [
        {
          "name": "師父鼬",
          "types": [
            "fighting"
          ],
          "level": 73
        },
        {
          "name": "倫琴貓",
          "types": [
            "electric"
          ],
          "level": 73
        },
        {
          "name": "鬃岩狼人",
          "types": [
            "rock"
          ],
          "level": 75
        },
        {
          "name": "鋼鎧鴉",
          "types": [
            "flying",
            "steel"
          ],
          "level": 74
        },
        {
          "name": "杖尾鱗甲龍",
          "types": [
            "dragon",
            "fighting"
          ],
          "level": 75
        },
        {
          "name": "武道熊師（連擊流）",
          "types": [
            "fighting",
            "water"
          ],
          "level": 75
        }
      ],
      "notes": "須完成本篇通關後王族事件（捕捉蒼響／藏瑪然特並完成微寐森林赫普最後戰）、熊徒弟進化及赫普極巨蜜任務；馬士德使用與玩家相反流派的超極巨化武道熊師。",
      "recommendedTeams": [
        {
          "label": "可取得的對策候選（依需要選用）",
          "reason": "飛行打師父鼬；地面打倫琴貓；水打鬃岩狼人；火／電打鋼鎧鴉。妖精四倍打杖尾鱗甲龍與一擊流，但兩者有鋼招；連擊流改用電、草、飛行或妖精攻擊。保留極巨化應對末段。",
          "pokemon": [
            {
              "name": "搗蛋小妖",
              "types": [
                "dark",
                "fairy"
              ],
              "obtain": "迷光森林；升級成詐唬魔、長毛巨魔",
              "moveNote": "惡招處理超能，妖精招處理格鬥與龍；提防鋼／毒招。"
            },
            {
              "name": "泥驢仔",
              "types": [
                "ground"
              ],
              "obtain": "伽勒爾曠野地帶滾滾山丘等區域",
              "moveNote": "升級學習地面招；地面招不能命中漂浮或飛行目標。"
            },
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ],
              "obtain": "水域釣鯉魚王後Lv20進化",
              "moveNote": "升級水招打岩石；不要對倫琴貓留場。"
            }
          ]
        }
      ],
      "strategy": {
        "level": "依下方版本／進度隊伍的最高等級準備；捕捉戰另帶削血與異常狀態手段。",
        "summary": "飛行打師父鼬；地面打倫琴貓；水打鬃岩狼人；火／電打鋼鎧鴉。妖精四倍打杖尾鱗甲龍與一擊流，但兩者有鋼招；連擊流改用電、草、飛行或妖精攻擊。保留極巨化應對末段。",
        "tips": [
          "須完成本篇通關後王族事件（捕捉蒼響／藏瑪然特並完成微寐森林赫普最後戰）、熊徒弟進化及赫普極巨蜜任務；馬士德使用與玩家相反流派的超極巨化武道熊師。"
        ]
      },
      "variants": [
        {
          "label": "玩家選惡之塔→對手連擊流",
          "party": [
            {
              "name": "師父鼬",
              "types": [
                "fighting"
              ],
              "level": 73
            },
            {
              "name": "倫琴貓",
              "types": [
                "electric"
              ],
              "level": 73
            },
            {
              "name": "鬃岩狼人",
              "types": [
                "rock"
              ],
              "level": 75
            },
            {
              "name": "鋼鎧鴉",
              "types": [
                "flying",
                "steel"
              ],
              "level": 74
            },
            {
              "name": "杖尾鱗甲龍",
              "types": [
                "dragon",
                "fighting"
              ],
              "level": 75
            },
            {
              "name": "武道熊師（連擊流）",
              "types": [
                "fighting",
                "water"
              ],
              "level": 75
            }
          ]
        },
        {
          "label": "玩家選水之塔→對手一擊流",
          "party": [
            {
              "name": "師父鼬",
              "types": [
                "fighting"
              ],
              "level": 73
            },
            {
              "name": "倫琴貓",
              "types": [
                "electric"
              ],
              "level": 73
            },
            {
              "name": "鬃岩狼人",
              "types": [
                "rock"
              ],
              "level": 75
            },
            {
              "name": "鋼鎧鴉",
              "types": [
                "flying",
                "steel"
              ],
              "level": 74
            },
            {
              "name": "杖尾鱗甲龍",
              "types": [
                "dragon",
                "fighting"
              ],
              "level": 75
            },
            {
              "name": "武道熊師（一擊流）",
              "types": [
                "fighting",
                "dark"
              ],
              "level": 75
            }
          ]
        }
      ]
    }
  ],
  "sources": [
    {
      "title": "Serebii：馬士德與雙拳塔",
      "url": "https://www.serebii.net/swordshield/mustard.shtml"
    },
    {
      "title": "Serebii：劍／盾對手與階段等級",
      "url": "https://www.serebii.net/swordshield/klaraavery.shtml"
    },
    {
      "title": "Serebii：極巨湯",
      "url": "https://www.serebii.net/swordshield/maxsoup.shtml"
    },
    {
      "title": "Bulbapedia：赫普鎧島事件前置",
      "url": "https://bulbapedia.bulbagarden.net/wiki/Hop"
    },
    {
      "title": "Serebii：熊徒弟升級招式",
      "url": "https://www.serebii.net/pokedex-swsh/kubfu/"
    }
  ]
};

isleOfArmorExpansion.gyms.forEach(assertBattle);
