import { assertBattle } from './helpers.js';

/** 流程與等級來源見 sources；對策為依可取得隊員整理的建議。 */
export const scarletVioletStory = {
  "sections": [
    {
      "type": "island",
      "title": "三條主線並行：依等級安排路程",
      "number": 1,
      "intro": "八道館完整隊伍見「道館」；天星隊、寶主與各線結局見本頁「其他路線與結局戰」。這些目標等級固定，不會依徽章自動調整。",
      "flows": [
        "建議前段：阿楓Lv15→毛崖蟹16→寇沙17→下石鳥20→皮拿21→奇樹24→梅洛可27→拖拖蚓29→海岱30→秋明33。",
        "中後段：青木36→萊姆42→土震寶主45／莉普45→古魯夏48→奧爾迪加51→枇琶56→偽龍寶主56／57。",
        "完成五寶主仍須派帕戰；五基地仍須校長、牡丹與收尾對話；八道館仍須聯盟與妮莫。三路全部結束才開放第零區結局。"
      ],
      "tips": []
    },
    {
      "type": "island",
      "title": "寶主、秘傳調味料與坐騎能力",
      "number": 2,
      "intro": "每名寶主第一階段退走後須追蹤至洞穴，再與派帕共鬥。取得調味料做三明治時分給坐騎，依序取得衝刺、游泳、高跳、滑翔、攀崖。",
      "flows": [
        "吃吼霸／米立龍在大鍋湖，先有游泳能力才方便到島上；寶主劇情後回原地另找可捕捉個體，劇情戰本身不丟球。"
      ],
      "tips": []
    },
    {
      "type": "island",
      "title": "第零區：四觀測站與回家之路",
      "number": 3,
      "intro": "在第零區閘口會合後依道路下行；依序到第1～4觀測站啟動解除鎖定，站內可休息，結局前補好PP與回復。",
      "flows": [
        "第二站為朱吼叫尾／紫鐵包袱Lv62；第三站為朱雄偉牙／紫鐵轍跡Lv63。研究所門前同伴分工處理Lv64悖謬寶可夢。",
        "進入零區研究所前先存檔；博士與最後防衛程序是兩種規則不同的戰鬥。結局後可把坐騎切為戰鬥形態，亦可再探第零區。"
      ],
      "tips": []
    },
    {
      "type": "island",
      "title": "本篇通關後與DLC銜接",
      "number": 4,
      "intro": "回學院接受也慈委託重戰八道館，再參加校園最強大賽；其第一輪完成是桃歹郎番外的重要前置。",
      "flows": [
        "歷史課與四座祠堂對應災厄四寶；拔出同色八根樁才解除各祠堂封印。其探索不取代三線結局。",
        "碧之假面可從尋寶開始後遊玩；藍之圓盤後續主線需本篇與碧之假面結束。"
      ],
      "tips": []
    }
  ],
  "battles": [
    {
      "order": 1,
      "role": "wild",
      "name": "岩壁寶主：毛崖蟹",
      "location": "南區（第3區）",
      "party": [
        {
          "name": "毛崖蟹",
          "types": [
            "rock"
          ],
          "level": 16
        }
      ],
      "notes": "沿岩壁追上逃跑的毛崖蟹，第二階段與派帕共鬥；獎勵坐騎衝刺。 寶主戰不直接捕捉；事後可回現場找普通大小的原寶主。",
      "recommendedTeams": [
        {
          "label": "可取得的對策候選（依需要選用）",
          "reason": "以水／草／格鬥攻擊；憤怒甲殼在低血量時強化攻擊與速度，盡快收尾。",
          "pokemon": [
            {
              "name": "可達鴨",
              "types": [
                "water"
              ],
              "obtain": "南區（第1區）水邊；Lv33進化哥達鴨",
              "moveNote": "水招使用自身升級招式，對岩石／地面有效；不要拿去承受電招。"
            }
          ]
        }
      ],
      "strategy": {
        "level": "依下方版本／進度隊伍的最高等級準備；捕捉戰另帶削血與異常狀態手段。",
        "summary": "以水／草／格鬥攻擊；憤怒甲殼在低血量時強化攻擊與速度，盡快收尾。",
        "tips": [
          "沿岩壁追上逃跑的毛崖蟹，第二階段與派帕共鬥；獎勵坐騎衝刺。 寶主戰不直接捕捉；事後可回現場找普通大小的原寶主。"
        ]
      }
    },
    {
      "order": 2,
      "role": "wild",
      "name": "長空寶主：下石鳥",
      "location": "西區（第1區）",
      "party": [
        {
          "name": "下石鳥",
          "types": [
            "flying",
            "dark"
          ],
          "level": 20
        }
      ],
      "notes": "閃避山坡落石前往山頂；第二階段與派帕合作，勝利開放水上移動。 寶主戰不直接捕捉；事後可回現場找普通大小的原寶主。",
      "recommendedTeams": [
        {
          "label": "可取得的對策候選（依需要選用）",
          "reason": "以電／岩石／妖精招；下石鳥有岩石攻擊，別只帶火箭雀。",
          "pokemon": [
            {
              "name": "布撥",
              "types": [
                "electric"
              ],
              "obtain": "南區（第1區）；沿進化條件培養為巴布土撥",
              "moveNote": "電招由升級取得；對地面系無效，對手有蓄電時也須換招。"
            },
            {
              "name": "瑪力露",
              "types": [
                "water",
                "fairy"
              ],
              "obtain": "南區河川；Lv18進化瑪力露麗",
              "moveNote": "升級妖精招對惡／格鬥／龍；推薦大力士特性，仍須防草／電／毒。"
            }
          ]
        }
      ],
      "strategy": {
        "level": "依下方版本／進度隊伍的最高等級準備；捕捉戰另帶削血與異常狀態手段。",
        "summary": "以電／岩石／妖精招；下石鳥有岩石攻擊，別只帶火箭雀。",
        "tips": [
          "閃避山坡落石前往山頂；第二階段與派帕合作，勝利開放水上移動。 寶主戰不直接捕捉；事後可回現場找普通大小的原寶主。"
        ]
      }
    },
    {
      "order": 3,
      "role": "wild",
      "name": "潛鋼寶主：拖拖蚓",
      "location": "東區（第3區）",
      "party": [
        {
          "name": "拖拖蚓",
          "types": [
            "steel"
          ],
          "level": 29
        }
      ],
      "notes": "在礦區追逐拖拖蚓、進隧道觸發第二階段；勝利開放更高跳躍。 寶主戰不直接捕捉；事後可回現場找普通大小的原寶主。",
      "recommendedTeams": [
        {
          "label": "可取得的對策候選（依需要選用）",
          "reason": "使用火或格鬥。食土使地面攻擊回復其HP，不能因鋼系弱地就選地面招。",
          "pokemon": [
            {
              "name": "小箭雀",
              "types": [
                "normal",
                "flying"
              ],
              "obtain": "南區（第1區）；Lv17火箭雀、Lv35烈箭鷹",
              "moveNote": "火／飛行招由升級取得；適合草、蟲與格鬥目標。"
            }
          ]
        }
      ],
      "strategy": {
        "level": "依下方版本／進度隊伍的最高等級準備；捕捉戰另帶削血與異常狀態手段。",
        "summary": "使用火或格鬥。食土使地面攻擊回復其HP，不能因鋼系弱地就選地面招。",
        "tips": [
          "在礦區追逐拖拖蚓、進隧道觸發第二階段；勝利開放更高跳躍。 寶主戰不直接捕捉；事後可回現場找普通大小的原寶主。"
        ]
      }
    },
    {
      "order": 4,
      "role": "wild",
      "name": "土震寶主：雄偉牙／鐵轍跡",
      "location": "烘烘沙漠",
      "party": [
        {
          "name": "雄偉牙",
          "types": [
            "ground",
            "fighting"
          ],
          "level": 45
        }
      ],
      "notes": "朱為雄偉牙；紫為鐵轍跡。勝利開放滑翔，建議接近Lv45再挑戰。 寶主戰不直接捕捉；事後可回現場找普通大小的原寶主。",
      "recommendedTeams": [
        {
          "label": "可取得的對策候選（依需要選用）",
          "reason": "兩版本都可用水；朱版另弱妖精／飛行，紫版另弱火／格鬥。不要把故勒頓／密勒頓當成本戰敵人。",
          "pokemon": [
            {
              "name": "可達鴨",
              "types": [
                "water"
              ],
              "obtain": "南區（第1區）水邊；Lv33進化哥達鴨",
              "moveNote": "水招使用自身升級招式，對岩石／地面有效；不要拿去承受電招。"
            },
            {
              "name": "瑪力露",
              "types": [
                "water",
                "fairy"
              ],
              "obtain": "南區河川；Lv18進化瑪力露麗",
              "moveNote": "升級妖精招對惡／格鬥／龍；推薦大力士特性，仍須防草／電／毒。"
            }
          ]
        }
      ],
      "strategy": {
        "level": "依下方版本／進度隊伍的最高等級準備；捕捉戰另帶削血與異常狀態手段。",
        "summary": "兩版本都可用水；朱版另弱妖精／飛行，紫版另弱火／格鬥。不要把故勒頓／密勒頓當成本戰敵人。",
        "tips": [
          "朱為雄偉牙；紫為鐵轍跡。勝利開放滑翔，建議接近Lv45再挑戰。 寶主戰不直接捕捉；事後可回現場找普通大小的原寶主。"
        ]
      },
      "variants": [
        {
          "label": "朱",
          "party": [
            {
              "name": "雄偉牙",
              "types": [
                "ground",
                "fighting"
              ],
              "level": 45
            }
          ]
        },
        {
          "label": "紫",
          "party": [
            {
              "name": "鐵轍跡",
              "types": [
                "ground",
                "steel"
              ],
              "level": 45
            }
          ]
        }
      ]
    },
    {
      "order": 5,
      "role": "wild",
      "name": "偽龍寶主：吃吼霸與米立龍",
      "location": "大鍋湖",
      "party": [
        {
          "name": "吃吼霸",
          "types": [
            "water"
          ],
          "level": 56
        },
        {
          "name": "米立龍",
          "types": [
            "dragon",
            "water"
          ],
          "level": 57
        }
      ],
      "notes": "先取得水上移動；到湖中島找會說「寶主」的米立龍，先兩階段吃吼霸，再戰米立龍Lv57。勝利開放攀崖。 寶主戰不直接捕捉；事後可回現場找普通大小的原寶主。",
      "recommendedTeams": [
        {
          "label": "可取得的對策候選（依需要選用）",
          "reason": "電／草處理吃吼霸，妖精處理龍／水的米立龍。戰鬥連續，兩隻都要有對策。",
          "pokemon": [
            {
              "name": "布撥",
              "types": [
                "electric"
              ],
              "obtain": "南區（第1區）；沿進化條件培養為巴布土撥",
              "moveNote": "電招由升級取得；對地面系無效，對手有蓄電時也須換招。"
            },
            {
              "name": "瑪力露",
              "types": [
                "water",
                "fairy"
              ],
              "obtain": "南區河川；Lv18進化瑪力露麗",
              "moveNote": "升級妖精招對惡／格鬥／龍；推薦大力士特性，仍須防草／電／毒。"
            }
          ]
        }
      ],
      "strategy": {
        "level": "依下方版本／進度隊伍的最高等級準備；捕捉戰另帶削血與異常狀態手段。",
        "summary": "電／草處理吃吼霸，妖精處理龍／水的米立龍。戰鬥連續，兩隻都要有對策。",
        "tips": [
          "先取得水上移動；到湖中島找會說「寶主」的米立龍，先兩階段吃吼霸，再戰米立龍Lv57。勝利開放攀崖。 寶主戰不直接捕捉；事後可回現場找普通大小的原寶主。"
        ]
      }
    },
    {
      "order": 6,
      "role": "trainer",
      "name": "天星隊 皮拿",
      "location": "西區（第1區）",
      "party": [
        {
          "name": "駒刀小兵",
          "types": [
            "dark",
            "steel"
          ],
          "level": 21
        },
        {
          "name": "天星隊車（惡）",
          "types": [
            "dark"
          ],
          "level": 20
        }
      ],
      "notes": "先打基地門口守衛，再以隊伍前三隻在10分鐘內自主對戰打倒30隻；可向自動販賣機或聶凱補血。車是特殊單屬性首領，不等於普通鋼／毒普隆隆姆。",
      "recommendedTeams": [
        {
          "label": "可取得的對策候選（依需要選用）",
          "reason": "格鬥、妖精、蟲招處理惡系戰車；駒刀小兵可用格鬥四倍弱點。",
          "pokemon": [
            {
              "name": "瑪力露",
              "types": [
                "water",
                "fairy"
              ],
              "obtain": "南區河川；Lv18進化瑪力露麗",
              "moveNote": "升級妖精招對惡／格鬥／龍；推薦大力士特性，仍須防草／電／毒。"
            }
          ]
        }
      ],
      "strategy": {
        "level": "依下方版本／進度隊伍的最高等級準備；捕捉戰另帶削血與異常狀態手段。",
        "summary": "格鬥、妖精、蟲招處理惡系戰車；駒刀小兵可用格鬥四倍弱點。",
        "tips": [
          "先打基地門口守衛，再以隊伍前三隻在10分鐘內自主對戰打倒30隻；可向自動販賣機或聶凱補血。車是特殊單屬性首領，不等於普通鋼／毒普隆隆姆。"
        ]
      }
    },
    {
      "order": 7,
      "role": "trainer",
      "name": "天星隊 梅洛可",
      "location": "東區（第1區）",
      "party": [
        {
          "name": "煤炭龜",
          "types": [
            "fire"
          ],
          "level": 27
        },
        {
          "name": "天星隊車（火）",
          "types": [
            "fire"
          ],
          "level": 26
        }
      ],
      "notes": "先打基地門口守衛，再以隊伍前三隻在10分鐘內自主對戰打倒30隻；可向自動販賣機或聶凱補血。車是特殊單屬性首領，不等於普通鋼／毒普隆隆姆。",
      "recommendedTeams": [
        {
          "label": "可取得的對策候選（依需要選用）",
          "reason": "煤炭龜開日照會削弱水招；重泥挽馬的地面招不受日照減傷，戰車加速後要以耐久應付。",
          "pokemon": [
            {
              "name": "泥驢仔",
              "types": [
                "ground"
              ],
              "obtain": "南區（第1區）等地；Lv30進化重泥挽馬",
              "moveNote": "升級地面招對鋼／毒／電；拖拖蚓的食土會吸收地面招。"
            },
            {
              "name": "可達鴨",
              "types": [
                "water"
              ],
              "obtain": "南區（第1區）水邊；Lv33進化哥達鴨",
              "moveNote": "水招使用自身升級招式，對岩石／地面有效；不要拿去承受電招。"
            }
          ]
        }
      ],
      "strategy": {
        "level": "依下方版本／進度隊伍的最高等級準備；捕捉戰另帶削血與異常狀態手段。",
        "summary": "煤炭龜開日照會削弱水招；重泥挽馬的地面招不受日照減傷，戰車加速後要以耐久應付。",
        "tips": [
          "先打基地門口守衛，再以隊伍前三隻在10分鐘內自主對戰打倒30隻；可向自動販賣機或聶凱補血。車是特殊單屬性首領，不等於普通鋼／毒普隆隆姆。"
        ]
      }
    },
    {
      "order": 8,
      "role": "trainer",
      "name": "天星隊 秋明",
      "location": "印記樹林",
      "party": [
        {
          "name": "坦克臭鼬",
          "types": [
            "poison",
            "dark"
          ],
          "level": 32
        },
        {
          "name": "臭臭泥",
          "types": [
            "poison"
          ],
          "level": 32
        },
        {
          "name": "普隆隆姆",
          "types": [
            "steel",
            "poison"
          ],
          "level": 33
        },
        {
          "name": "天星隊車（毒）",
          "types": [
            "poison"
          ],
          "level": 32
        }
      ],
      "notes": "先打基地門口守衛，再以隊伍前三隻在10分鐘內自主對戰打倒30隻；可向自動販賣機或聶凱補血。車是特殊單屬性首領，不等於普通鋼／毒普隆隆姆。",
      "recommendedTeams": [
        {
          "label": "可取得的對策候選（依需要選用）",
          "reason": "地面招兼顧坦克臭鼬、臭臭泥、普隆隆姆及毒車；不要用超能打惡系的坦克臭鼬。",
          "pokemon": [
            {
              "name": "泥驢仔",
              "types": [
                "ground"
              ],
              "obtain": "南區（第1區）等地；Lv30進化重泥挽馬",
              "moveNote": "升級地面招對鋼／毒／電；拖拖蚓的食土會吸收地面招。"
            }
          ]
        }
      ],
      "strategy": {
        "level": "依下方版本／進度隊伍的最高等級準備；捕捉戰另帶削血與異常狀態手段。",
        "summary": "地面招兼顧坦克臭鼬、臭臭泥、普隆隆姆及毒車；不要用超能打惡系的坦克臭鼬。",
        "tips": [
          "先打基地門口守衛，再以隊伍前三隻在10分鐘內自主對戰打倒30隻；可向自動販賣機或聶凱補血。車是特殊單屬性首領，不等於普通鋼／毒普隆隆姆。"
        ]
      }
    },
    {
      "order": 9,
      "role": "trainer",
      "name": "天星隊 奧爾迪加",
      "location": "北區（第3區）",
      "party": [
        {
          "name": "瑪力露麗",
          "types": [
            "water",
            "fairy"
          ],
          "level": 50
        },
        {
          "name": "胖可丁",
          "types": [
            "normal",
            "fairy"
          ],
          "level": 50
        },
        {
          "name": "麻花犬",
          "types": [
            "fairy"
          ],
          "level": 51
        },
        {
          "name": "天星隊車（妖精）",
          "types": [
            "fairy"
          ],
          "level": 50
        }
      ],
      "notes": "先打基地門口守衛，再以隊伍前三隻在10分鐘內自主對戰打倒30隻；可向自動販賣機或聶凱補血。車是特殊單屬性首領，不等於普通鋼／毒普隆隆姆。",
      "recommendedTeams": [
        {
          "label": "可取得的對策候選（依需要選用）",
          "reason": "以鋼／毒招為主；麻花犬焦香之軀免疫火。別用龍系隊硬扛妖精招。",
          "pokemon": [
            {
              "name": "小鍛匠",
              "types": [
                "fairy",
                "steel"
              ],
              "obtain": "帕底亞各地遺跡；升級為巨鍛匠",
              "moveNote": "升級鋼招對妖精；本戰後期可使用巨力錘。"
            }
          ]
        }
      ],
      "strategy": {
        "level": "依下方版本／進度隊伍的最高等級準備；捕捉戰另帶削血與異常狀態手段。",
        "summary": "以鋼／毒招為主；麻花犬焦香之軀免疫火。別用龍系隊硬扛妖精招。",
        "tips": [
          "先打基地門口守衛，再以隊伍前三隻在10分鐘內自主對戰打倒30隻；可向自動販賣機或聶凱補血。車是特殊單屬性首領，不等於普通鋼／毒普隆隆姆。"
        ]
      }
    },
    {
      "order": 10,
      "role": "trainer",
      "name": "天星隊 枇琶",
      "location": "北區（第2區）",
      "party": [
        {
          "name": "毒骷蛙",
          "types": [
            "poison",
            "fighting"
          ],
          "level": 55
        },
        {
          "name": "投擲猴",
          "types": [
            "fighting"
          ],
          "level": 55
        },
        {
          "name": "路卡利歐",
          "types": [
            "fighting",
            "steel"
          ],
          "level": 55
        },
        {
          "name": "棄世猴",
          "types": [
            "fighting",
            "ghost"
          ],
          "level": 56
        },
        {
          "name": "天星隊車（格鬥）",
          "types": [
            "fighting"
          ],
          "level": 56
        }
      ],
      "notes": "先打基地門口守衛，再以隊伍前三隻在10分鐘內自主對戰打倒30隻；可向自動販賣機或聶凱補血。車是特殊單屬性首領，不等於普通鋼／毒普隆隆姆。",
      "recommendedTeams": [
        {
          "label": "可取得的對策候選（依需要選用）",
          "reason": "用飛行／超能處理格鬥；毒骷蛙四倍弱超能，棄世猴免疫一般及格鬥。戰車持久力會因物理命中提高防禦，改用特殊招更穩。",
          "pokemon": [
            {
              "name": "奇魯莉安",
              "types": [
                "psychic",
                "fairy"
              ],
              "obtain": "南區捕捉拉魯拉絲後培養",
              "moveNote": "升級成沙奈朵，使用升級超能／妖精招；須防毒骷蛙毒招。"
            },
            {
              "name": "小箭雀",
              "types": [
                "normal",
                "flying"
              ],
              "obtain": "南區（第1區）；Lv17火箭雀、Lv35烈箭鷹",
              "moveNote": "火／飛行招由升級取得；適合草、蟲與格鬥目標。"
            }
          ]
        }
      ],
      "strategy": {
        "level": "依下方版本／進度隊伍的最高等級準備；捕捉戰另帶削血與異常狀態手段。",
        "summary": "用飛行／超能處理格鬥；毒骷蛙四倍弱超能，棄世猴免疫一般及格鬥。戰車持久力會因物理命中提高防禦，改用特殊招更穩。",
        "tips": [
          "先打基地門口守衛，再以隊伍前三隻在10分鐘內自主對戰打倒30隻；可向自動販賣機或聶凱補血。車是特殊單屬性首領，不等於普通鋼／毒普隆隆姆。"
        ]
      }
    },
    {
      "order": 11,
      "role": "trainer",
      "name": "派帕：傳說之路結局",
      "location": "小匙小徑燈塔",
      "party": [
        {
          "name": "藏飽栗鼠",
          "types": [
            "normal"
          ],
          "level": 58
        },
        {
          "name": "刺甲貝",
          "types": [
            "water",
            "ice"
          ],
          "level": 59
        },
        {
          "name": "狠辣椒",
          "types": [
            "grass",
            "fire"
          ],
          "level": 60
        },
        {
          "name": "陸地水母",
          "types": [
            "ground",
            "grass"
          ],
          "level": 61
        },
        {
          "name": "鹽石巨靈",
          "types": [
            "rock"
          ],
          "level": 62
        },
        {
          "name": "獒教父",
          "types": [
            "dark"
          ],
          "level": 63,
          "teraType": "dark"
        }
      ],
      "notes": "完成五名寶主後到燈塔研究所，再接受派帕挑戰；獒教父太晶惡。",
      "recommendedTeams": [
        {
          "label": "可取得的對策候選（依需要選用）",
          "reason": "刺甲貝物防高宜用特殊電／草；狠辣椒用飛行，陸地水母用冰／飛行，鹽石巨靈用水／格鬥，獒教父用妖精。此戰Lv63上限明顯高於部分寶主。",
          "pokemon": [
            {
              "name": "瑪力露",
              "types": [
                "water",
                "fairy"
              ],
              "obtain": "南區河川；Lv18進化瑪力露麗",
              "moveNote": "升級妖精招對惡／格鬥／龍；推薦大力士特性，仍須防草／電／毒。"
            },
            {
              "name": "小箭雀",
              "types": [
                "normal",
                "flying"
              ],
              "obtain": "南區（第1區）；Lv17火箭雀、Lv35烈箭鷹",
              "moveNote": "火／飛行招由升級取得；適合草、蟲與格鬥目標。"
            },
            {
              "name": "布撥",
              "types": [
                "electric"
              ],
              "obtain": "南區（第1區）；沿進化條件培養為巴布土撥",
              "moveNote": "電招由升級取得；對地面系無效，對手有蓄電時也須換招。"
            }
          ]
        }
      ],
      "strategy": {
        "level": "依下方版本／進度隊伍的最高等級準備；捕捉戰另帶削血與異常狀態手段。",
        "summary": "刺甲貝物防高宜用特殊電／草；狠辣椒用飛行，陸地水母用冰／飛行，鹽石巨靈用水／格鬥，獒教父用妖精。此戰Lv63上限明顯高於部分寶主。",
        "tips": [
          "完成五名寶主後到燈塔研究所，再接受派帕挑戰；獒教父太晶惡。"
        ]
      }
    },
    {
      "order": 12,
      "role": "trainer",
      "name": "克拉韋爾：天星隊決戰前",
      "location": "學院門前",
      "party": [
        {
          "name": "智揮猩",
          "types": [
            "normal",
            "psychic"
          ],
          "level": 60
        },
        {
          "name": "暴雪王",
          "types": [
            "grass",
            "ice"
          ],
          "level": 60
        },
        {
          "name": "怖思壺",
          "types": [
            "ghost"
          ],
          "level": 60
        },
        {
          "name": "黑魯加",
          "types": [
            "dark",
            "fire"
          ],
          "level": 60
        },
        {
          "name": "敗露球菇",
          "types": [
            "grass",
            "poison"
          ],
          "level": 60
        },
        {
          "name": "狂歡浪舞鴨",
          "types": [
            "water",
            "fighting"
          ],
          "level": 61,
          "teraType": "water"
        }
      ],
      "notes": "清除五座基地後，赴約前迎戰校長；三個御三家分支連帶改變兩隻配角。",
      "recommendedTeams": [
        {
          "label": "可取得的對策候選（依需要選用）",
          "reason": "以惡招對智揮猩與怖思壺；暴雪王四倍弱火。對方御三家太晶回自身主屬性；避免讓怖思壺破殼後連續攻擊。",
          "pokemon": [
            {
              "name": "小箭雀",
              "types": [
                "normal",
                "flying"
              ],
              "obtain": "南區（第1區）；Lv17火箭雀、Lv35烈箭鷹",
              "moveNote": "火／飛行招由升級取得；適合草、蟲與格鬥目標。"
            },
            {
              "name": "泥驢仔",
              "types": [
                "ground"
              ],
              "obtain": "南區（第1區）等地；Lv30進化重泥挽馬",
              "moveNote": "升級地面招對鋼／毒／電；拖拖蚓的食土會吸收地面招。"
            },
            {
              "name": "戴魯比",
              "types": [
                "dark",
                "fire"
              ],
              "obtain": "小匙小徑洞穴等地；Lv24進化黑魯加",
              "moveNote": "升級惡／火招，但不宜留場面對水系分支。"
            }
          ]
        }
      ],
      "strategy": {
        "level": "依下方版本／進度隊伍的最高等級準備；捕捉戰另帶削血與異常狀態手段。",
        "summary": "以惡招對智揮猩與怖思壺；暴雪王四倍弱火。對方御三家太晶回自身主屬性；避免讓怖思壺破殼後連續攻擊。",
        "tips": [
          "清除五座基地後，赴約前迎戰校長；三個御三家分支連帶改變兩隻配角。"
        ]
      },
      "variants": [
        {
          "label": "玩家選新葉喵",
          "party": [
            {
              "name": "智揮猩",
              "types": [
                "normal",
                "psychic"
              ],
              "level": 60
            },
            {
              "name": "暴雪王",
              "types": [
                "grass",
                "ice"
              ],
              "level": 60
            },
            {
              "name": "怖思壺",
              "types": [
                "ghost"
              ],
              "level": 60
            },
            {
              "name": "黑魯加",
              "types": [
                "dark",
                "fire"
              ],
              "level": 60
            },
            {
              "name": "敗露球菇",
              "types": [
                "grass",
                "poison"
              ],
              "level": 60
            },
            {
              "name": "狂歡浪舞鴨",
              "types": [
                "water",
                "fighting"
              ],
              "level": 61,
              "teraType": "water"
            }
          ]
        },
        {
          "label": "玩家選潤水鴨",
          "party": [
            {
              "name": "智揮猩",
              "types": [
                "normal",
                "psychic"
              ],
              "level": 60
            },
            {
              "name": "暴雪王",
              "types": [
                "grass",
                "ice"
              ],
              "level": 60
            },
            {
              "name": "怖思壺",
              "types": [
                "ghost"
              ],
              "level": 60
            },
            {
              "name": "敗露球菇",
              "types": [
                "grass",
                "poison"
              ],
              "level": 60
            },
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ],
              "level": 60
            },
            {
              "name": "骨紋巨聲鱷",
              "types": [
                "fire",
                "ghost"
              ],
              "level": 61,
              "teraType": "fire"
            }
          ]
        },
        {
          "label": "玩家選呆火鱷",
          "party": [
            {
              "name": "智揮猩",
              "types": [
                "normal",
                "psychic"
              ],
              "level": 60
            },
            {
              "name": "暴雪王",
              "types": [
                "grass",
                "ice"
              ],
              "level": 60
            },
            {
              "name": "怖思壺",
              "types": [
                "ghost"
              ],
              "level": 60
            },
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ],
              "level": 60
            },
            {
              "name": "黑魯加",
              "types": [
                "dark",
                "fire"
              ],
              "level": 60
            },
            {
              "name": "魔幻假面喵",
              "types": [
                "grass",
                "dark"
              ],
              "level": 61,
              "teraType": "grass"
            }
          ]
        }
      ]
    },
    {
      "order": 13,
      "role": "trainer",
      "name": "牡丹：仙后",
      "location": "夜間學院操場",
      "party": [
        {
          "name": "月亮伊布",
          "types": [
            "dark"
          ],
          "level": 62
        },
        {
          "name": "水伊布",
          "types": [
            "water"
          ],
          "level": 62
        },
        {
          "name": "雷伊布",
          "types": [
            "electric"
          ],
          "level": 62
        },
        {
          "name": "火伊布",
          "types": [
            "fire"
          ],
          "level": 62
        },
        {
          "name": "葉伊布",
          "types": [
            "grass"
          ],
          "level": 62
        },
        {
          "name": "仙子伊布",
          "types": [
            "fairy"
          ],
          "level": 63,
          "teraType": "fairy"
        }
      ],
      "notes": "校長戰後依約在夜間進入學院操場；打贏後到校長室，再到學院台階完成對話才結算路線。",
      "recommendedTeams": [
        {
          "label": "可取得的對策候選（依需要選用）",
          "reason": "水伊布蓄水、火伊布引火，避免用相應屬性補血；雷伊布用地面、仙子伊布用鋼／毒，其餘用屬性剋制逐隻換位。",
          "pokemon": [
            {
              "name": "泥驢仔",
              "types": [
                "ground"
              ],
              "obtain": "南區（第1區）等地；Lv30進化重泥挽馬",
              "moveNote": "升級地面招對鋼／毒／電；拖拖蚓的食土會吸收地面招。"
            },
            {
              "name": "小箭雀",
              "types": [
                "normal",
                "flying"
              ],
              "obtain": "南區（第1區）；Lv17火箭雀、Lv35烈箭鷹",
              "moveNote": "火／飛行招由升級取得；適合草、蟲與格鬥目標。"
            },
            {
              "name": "巨鍛匠",
              "types": [
                "fairy",
                "steel"
              ],
              "obtain": "小鍛匠升級進化",
              "moveNote": "升級鋼招處理太晶妖精仙子伊布。"
            }
          ]
        }
      ],
      "strategy": {
        "level": "依下方版本／進度隊伍的最高等級準備；捕捉戰另帶削血與異常狀態手段。",
        "summary": "水伊布蓄水、火伊布引火，避免用相應屬性補血；雷伊布用地面、仙子伊布用鋼／毒，其餘用屬性剋制逐隻換位。",
        "tips": [
          "校長戰後依約在夜間進入學院操場；打贏後到校長室，再到學院台階完成對話才結算路線。"
        ]
      }
    },
    {
      "order": 14,
      "role": "trainer",
      "name": "妮莫：冠軍之路最後對戰",
      "location": "桌台市中央廣場",
      "party": [
        {
          "name": "鬃岩狼人",
          "types": [
            "rock"
          ],
          "level": 65
        },
        {
          "name": "黏美龍",
          "types": [
            "dragon"
          ],
          "level": 65
        },
        {
          "name": "土龍節節",
          "types": [
            "normal"
          ],
          "level": 65
        },
        {
          "name": "拖拖蚓",
          "types": [
            "steel"
          ],
          "level": 65
        },
        {
          "name": "巴布土撥",
          "types": [
            "electric",
            "fighting"
          ],
          "level": 65
        },
        {
          "name": "魔幻假面喵",
          "types": [
            "grass",
            "dark"
          ],
          "level": 66,
          "teraType": "grass"
        }
      ],
      "notes": "先通過八道館、四天王與也慈，回桌台市接受妮莫最終挑戰；她保留被玩家御三家剋制的御三家。",
      "recommendedTeams": [
        {
          "label": "可取得的對策候選（依需要選用）",
          "reason": "水招打鬃岩狼人；妖精處理黏美龍，格鬥處理土龍節節。拖拖蚓食土免疫地面、巴布土撥蓄電免疫電；用火打拖拖蚓、地面打巴布土撥。",
          "pokemon": [
            {
              "name": "可達鴨",
              "types": [
                "water"
              ],
              "obtain": "南區（第1區）水邊；Lv33進化哥達鴨",
              "moveNote": "水招使用自身升級招式，對岩石／地面有效；不要拿去承受電招。"
            },
            {
              "name": "瑪力露",
              "types": [
                "water",
                "fairy"
              ],
              "obtain": "南區河川；Lv18進化瑪力露麗",
              "moveNote": "升級妖精招對惡／格鬥／龍；推薦大力士特性，仍須防草／電／毒。"
            },
            {
              "name": "泥驢仔",
              "types": [
                "ground"
              ],
              "obtain": "南區（第1區）等地；Lv30進化重泥挽馬",
              "moveNote": "升級地面招對鋼／毒／電；拖拖蚓的食土會吸收地面招。"
            }
          ]
        }
      ],
      "strategy": {
        "level": "依下方版本／進度隊伍的最高等級準備；捕捉戰另帶削血與異常狀態手段。",
        "summary": "水招打鬃岩狼人；妖精處理黏美龍，格鬥處理土龍節節。拖拖蚓食土免疫地面、巴布土撥蓄電免疫電；用火打拖拖蚓、地面打巴布土撥。",
        "tips": [
          "先通過八道館、四天王與也慈，回桌台市接受妮莫最終挑戰；她保留被玩家御三家剋制的御三家。"
        ]
      },
      "variants": [
        {
          "label": "玩家選呆火鱷",
          "party": [
            {
              "name": "鬃岩狼人",
              "types": [
                "rock"
              ],
              "level": 65
            },
            {
              "name": "黏美龍",
              "types": [
                "dragon"
              ],
              "level": 65
            },
            {
              "name": "土龍節節",
              "types": [
                "normal"
              ],
              "level": 65
            },
            {
              "name": "拖拖蚓",
              "types": [
                "steel"
              ],
              "level": 65
            },
            {
              "name": "巴布土撥",
              "types": [
                "electric",
                "fighting"
              ],
              "level": 65
            },
            {
              "name": "魔幻假面喵",
              "types": [
                "grass",
                "dark"
              ],
              "level": 66,
              "teraType": "grass"
            }
          ]
        },
        {
          "label": "玩家選新葉喵",
          "party": [
            {
              "name": "鬃岩狼人",
              "types": [
                "rock"
              ],
              "level": 65
            },
            {
              "name": "黏美龍",
              "types": [
                "dragon"
              ],
              "level": 65
            },
            {
              "name": "土龍節節",
              "types": [
                "normal"
              ],
              "level": 65
            },
            {
              "name": "拖拖蚓",
              "types": [
                "steel"
              ],
              "level": 65
            },
            {
              "name": "巴布土撥",
              "types": [
                "electric",
                "fighting"
              ],
              "level": 65
            },
            {
              "name": "狂歡浪舞鴨",
              "types": [
                "water",
                "fighting"
              ],
              "level": 66,
              "teraType": "water"
            }
          ]
        },
        {
          "label": "玩家選潤水鴨",
          "party": [
            {
              "name": "鬃岩狼人",
              "types": [
                "rock"
              ],
              "level": 65
            },
            {
              "name": "黏美龍",
              "types": [
                "dragon"
              ],
              "level": 65
            },
            {
              "name": "土龍節節",
              "types": [
                "normal"
              ],
              "level": 65
            },
            {
              "name": "拖拖蚓",
              "types": [
                "steel"
              ],
              "level": 65
            },
            {
              "name": "巴布土撥",
              "types": [
                "electric",
                "fighting"
              ],
              "level": 65
            },
            {
              "name": "骨紋巨聲鱷",
              "types": [
                "fire",
                "ghost"
              ],
              "level": 66,
              "teraType": "fire"
            }
          ]
        }
      ]
    },
    {
      "order": 15,
      "role": "trainer",
      "name": "第零區：AI博士",
      "location": "第零區零區研究所",
      "party": [
        {
          "name": "爬地翅",
          "types": [
            "bug",
            "fighting"
          ],
          "level": 66
        },
        {
          "name": "吼叫尾",
          "types": [
            "fairy",
            "psychic"
          ],
          "level": 66
        },
        {
          "name": "猛惡菇",
          "types": [
            "grass",
            "dark"
          ],
          "level": 66
        },
        {
          "name": "振翼髮",
          "types": [
            "ghost",
            "fairy"
          ],
          "level": 66
        },
        {
          "name": "沙鐵皮",
          "types": [
            "electric",
            "ground"
          ],
          "level": 66
        },
        {
          "name": "轟鳴月",
          "types": [
            "dragon",
            "dark"
          ],
          "level": 67
        }
      ],
      "notes": "完成三路結局後在第零區閘口集合，走訪四個觀測站並解除鎖定；博士戰無法用道館順序代替前置。",
      "recommendedTeams": [
        {
          "label": "可取得的對策候選（依需要選用）",
          "reason": "朱：飛行打爬地翅，鋼打吼叫尾與振翼髮，火／蟲打猛惡菇，水／地面打沙鐵皮，妖精四倍打轟鳴月。紫：地面打鐵毒蛾與鐵荊棘，電打鐵包袱，地面／妖精打鐵臂膀，電／妖精打鐵脖頸，鋼／毒／飛行打鐵武者。",
          "pokemon": [
            {
              "name": "瑪力露",
              "types": [
                "water",
                "fairy"
              ],
              "obtain": "南區河川；Lv18進化瑪力露麗",
              "moveNote": "升級妖精招對惡／格鬥／龍；推薦大力士特性，仍須防草／電／毒。"
            },
            {
              "name": "泥驢仔",
              "types": [
                "ground"
              ],
              "obtain": "南區（第1區）等地；Lv30進化重泥挽馬",
              "moveNote": "升級地面招對鋼／毒／電；拖拖蚓的食土會吸收地面招。"
            },
            {
              "name": "巨鍛匠",
              "types": [
                "fairy",
                "steel"
              ],
              "obtain": "帕底亞遺跡的小鍛匠進化",
              "moveNote": "升級鋼招兼顧朱版振翼髮、紫版鐵武者；不要接地面／火招。"
            }
          ]
        }
      ],
      "strategy": {
        "level": "依下方版本／進度隊伍的最高等級準備；捕捉戰另帶削血與異常狀態手段。",
        "summary": "朱：飛行打爬地翅，鋼打吼叫尾與振翼髮，火／蟲打猛惡菇，水／地面打沙鐵皮，妖精四倍打轟鳴月。紫：地面打鐵毒蛾與鐵荊棘，電打鐵包袱，地面／妖精打鐵臂膀，電／妖精打鐵脖頸，鋼／毒／飛行打鐵武者。",
        "tips": [
          "完成三路結局後在第零區閘口集合，走訪四個觀測站並解除鎖定；博士戰無法用道館順序代替前置。"
        ]
      },
      "variants": [
        {
          "label": "朱／AI奧琳",
          "party": [
            {
              "name": "爬地翅",
              "types": [
                "bug",
                "fighting"
              ],
              "level": 66
            },
            {
              "name": "吼叫尾",
              "types": [
                "fairy",
                "psychic"
              ],
              "level": 66
            },
            {
              "name": "猛惡菇",
              "types": [
                "grass",
                "dark"
              ],
              "level": 66
            },
            {
              "name": "振翼髮",
              "types": [
                "ghost",
                "fairy"
              ],
              "level": 66
            },
            {
              "name": "沙鐵皮",
              "types": [
                "electric",
                "ground"
              ],
              "level": 66
            },
            {
              "name": "轟鳴月",
              "types": [
                "dragon",
                "dark"
              ],
              "level": 67
            }
          ]
        },
        {
          "label": "紫／AI弗圖",
          "party": [
            {
              "name": "鐵毒蛾",
              "types": [
                "fire",
                "poison"
              ],
              "level": 66
            },
            {
              "name": "鐵包袱",
              "types": [
                "ice",
                "water"
              ],
              "level": 66
            },
            {
              "name": "鐵臂膀",
              "types": [
                "fighting",
                "electric"
              ],
              "level": 66
            },
            {
              "name": "鐵脖頸",
              "types": [
                "dark",
                "flying"
              ],
              "level": 66
            },
            {
              "name": "鐵荊棘",
              "types": [
                "rock",
                "electric"
              ],
              "level": 66
            },
            {
              "name": "鐵武者",
              "types": [
                "fairy",
                "fighting"
              ],
              "level": 67
            }
          ]
        }
      ]
    },
    {
      "order": 16,
      "role": "trainer",
      "name": "樂園防衛程序：坐騎決戰",
      "location": "零區研究所最深處",
      "party": [
        {
          "name": "故勒頓",
          "types": [
            "fighting",
            "dragon"
          ],
          "level": 72,
          "teraType": "fighting"
        }
      ],
      "notes": "博士戰後一般精靈球被鎖定；從隊伍選自己的故勒頓（朱）／密勒頓（紫）切換戰鬥形態，不需要另外捕捉一隻。",
      "recommendedTeams": [
        {
          "label": "可取得的對策候選（依需要選用）",
          "reason": "依夥伴提示戰鬥，進行劇情所需回合後太晶化，以太晶爆發完成決戰。這是固定劇情戰，不是讓普通隊員突破Lv72首領。",
          "pokemon": [
            {
              "name": "故勒頓",
              "types": [
                "dragon",
                "fighting"
              ],
              "obtain": "朱版本篇同行坐騎",
              "moveNote": "從戰鬥選單選坐騎上場，依提示太晶化和使用太晶爆發。"
            },
            {
              "name": "密勒頓",
              "types": [
                "dragon",
                "electric"
              ],
              "obtain": "紫版本篇同行坐騎",
              "moveNote": "從戰鬥選單選坐騎上場，依提示太晶化和使用太晶爆發。"
            }
          ]
        }
      ],
      "strategy": {
        "level": "依下方版本／進度隊伍的最高等級準備；捕捉戰另帶削血與異常狀態手段。",
        "summary": "依夥伴提示戰鬥，進行劇情所需回合後太晶化，以太晶爆發完成決戰。這是固定劇情戰，不是讓普通隊員突破Lv72首領。",
        "tips": [
          "博士戰後一般精靈球被鎖定；從隊伍選自己的故勒頓（朱）／密勒頓（紫）切換戰鬥形態，不需要另外捕捉一隻。"
        ]
      },
      "variants": [
        {
          "label": "朱／對方故勒頓",
          "party": [
            {
              "name": "故勒頓",
              "types": [
                "fighting",
                "dragon"
              ],
              "level": 72,
              "teraType": "fighting"
            }
          ]
        },
        {
          "label": "紫／對方密勒頓",
          "party": [
            {
              "name": "密勒頓",
              "types": [
                "electric",
                "dragon"
              ],
              "level": 72,
              "teraType": "electric"
            }
          ]
        }
      ]
    }
  ],
  "sources": [
    {
      "title": "Serebii：傳說之路",
      "url": "https://www.serebii.net/scarletviolet/pathoflegends.shtml"
    },
    {
      "title": "Serebii：星塵之路",
      "url": "https://www.serebii.net/scarletviolet/starfallstreet.shtml"
    },
    {
      "title": "Serebii：冠軍之路",
      "url": "https://www.serebii.net/scarletviolet/victoryroad.shtml"
    },
    {
      "title": "Serebii：回家之路",
      "url": "https://www.serebii.net/scarletviolet/thewayhome.shtml"
    }
  ]
};

scarletVioletStory.battles.forEach(assertBattle);
