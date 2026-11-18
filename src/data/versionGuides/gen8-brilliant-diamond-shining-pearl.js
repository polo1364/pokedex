import { assertBattle, assertLeague } from './helpers.js';
import { brilliantDiamondShiningPearlLeague } from './gen8-brilliant-diamond-shining-pearl-league.js';

// 首次主線；來源與逐項覆核記錄見 output/guide-review/all-generations/gen7-8-corrections.json。
export const brilliantDiamondShiningPearlGuide = {
  "id": "brilliant-diamond-shining-pearl",
  "title": "寶可夢 晶燦鑽石／明亮珍珠",
  "displayGeneration": 8,
  "status": "complete",
  "quickNavigation": true,
  "notes": "此處為BDSP首次聯盟，四天王與竹蘭五場連戰。名單取自重製版首次隊伍，不能混入白金或通關後再戰。對手有持有道具、特性與完整配招，建議主力約60～66級並準備恢復道具。",
  "gyms": [
    {
      "location": "黑金市",
      "badge": "煤炭徽章",
      "badgeType": "rock",
      "order": 1,
      "role": "gym",
      "name": "瓢太",
      "notes": "草或水打前兩隻4倍；小火焰猴14級進化猛火猴學音速拳，另一選擇207號道路腕力。",
      "party": [
        {
          "name": "小拳石",
          "types": [
            "rock",
            "ground"
          ],
          "level": 12
        },
        {
          "name": "大岩蛇",
          "types": [
            "rock",
            "ground"
          ],
          "level": 12
        },
        {
          "name": "頭蓋龍",
          "types": [
            "rock"
          ],
          "level": 14
        }
      ],
      "strategy": {
        "level": "對手最高 Lv.14；依隊伍能力調整",
        "summary": "草或水打前兩隻4倍；小火焰猴14級進化猛火猴學音速拳，另一選擇207號道路腕力。",
        "tips": [
          "推薦為可替換候選；御三家僅在你選擇該開局時可用，不假設交換取得另外兩隻。"
        ]
      },
      "recommendedTeams": [
        {
          "label": "可取得的對策候選",
          "reason": "草或水打前兩隻4倍；小火焰猴14級進化猛火猴學音速拳，另一選擇207號道路腕力。",
          "pokemon": [
            {
              "name": "猛火猴",
              "types": [
                "fire",
                "fighting"
              ],
              "obtain": "小火焰猴開局14級進化",
              "moveNote": "音速拳"
            },
            {
              "name": "腕力",
              "types": [
                "fighting"
              ],
              "obtain": "207號道路草叢",
              "moveNote": "踢倒"
            }
          ]
        }
      ]
    },
    {
      "location": "百代市",
      "badge": "森林徽章",
      "badgeType": "grass",
      "order": 2,
      "role": "gym",
      "name": "菜種",
      "notes": "飛行/火對草有效；羅絲雷朵的毒屬性使毒招等倍，不能把毒隊當全隊剋制。",
      "party": [
        {
          "name": "櫻花寶",
          "types": [
            "grass"
          ],
          "level": 19
        },
        {
          "name": "草苗龜",
          "types": [
            "grass"
          ],
          "level": 19
        },
        {
          "name": "羅絲雷朵",
          "types": [
            "grass",
            "poison"
          ],
          "level": 22
        }
      ],
      "strategy": {
        "level": "對手最高 Lv.22；依隊伍能力調整",
        "summary": "飛行/火對草有效；羅絲雷朵的毒屬性使毒招等倍，不能把毒隊當全隊剋制。",
        "tips": [
          "推薦為可替換候選；御三家僅在你選擇該開局時可用，不假設交換取得另外兩隻。"
        ]
      },
      "recommendedTeams": [
        {
          "label": "可取得的對策候選",
          "reason": "飛行/火對草有效；羅絲雷朵的毒屬性使毒招等倍，不能把毒隊當全隊剋制。",
          "pokemon": [
            {
              "name": "姆克鳥",
              "types": [
                "normal",
                "flying"
              ],
              "obtain": "201/202號道路姆克兒14級進化",
              "moveNote": "翅膀攻擊等飛行招；34級才進化姆克鷹"
            },
            {
              "name": "猛火猴",
              "types": [
                "fire",
                "fighting"
              ],
              "obtain": "小火焰猴14級進化",
              "moveNote": "火焰輪"
            }
          ]
        }
      ]
    },
    {
      "location": "帷幕市",
      "badge": "帷幕徽章",
      "badgeType": "fighting",
      "order": 3,
      "role": "gym",
      "name": "阿李",
      "notes": "路卡利歐在首次道館就登場。前兩隻用飛行，路卡利歐鋼格鬥令飛行等倍，改火/地面/格鬥。",
      "party": [
        {
          "name": "瑪沙那",
          "types": [
            "fighting",
            "psychic"
          ],
          "level": 27
        },
        {
          "name": "豪力",
          "types": [
            "fighting"
          ],
          "level": 27
        },
        {
          "name": "路卡利歐",
          "types": [
            "fighting",
            "steel"
          ],
          "level": 30
        }
      ],
      "strategy": {
        "level": "對手最高 Lv.30；依隊伍能力調整",
        "summary": "路卡利歐在首次道館就登場。前兩隻用飛行，路卡利歐鋼格鬥令飛行等倍，改火/地面/格鬥。",
        "tips": [
          "推薦為可替換候選；御三家僅在你選擇該開局時可用，不假設交換取得另外兩隻。"
        ]
      },
      "recommendedTeams": [
        {
          "label": "可取得的對策候選",
          "reason": "路卡利歐在首次道館就登場。前兩隻用飛行，路卡利歐鋼格鬥令飛行等倍，改火/地面/格鬥。",
          "pokemon": [
            {
              "name": "姆克鳥",
              "types": [
                "normal",
                "flying"
              ],
              "obtain": "201/202號道路姆克兒14級進化",
              "moveNote": "翅膀攻擊等飛行招；34級才進化姆克鷹"
            },
            {
              "name": "小火馬",
              "types": [
                "fire"
              ],
              "obtain": "206/210/211號道路",
              "moveNote": "火焰輪；40級進化烈焰馬"
            }
          ]
        }
      ]
    },
    {
      "location": "濕原市",
      "badge": "濕地徽章",
      "badgeType": "water",
      "order": 4,
      "role": "gym",
      "name": "吉憲",
      "notes": "城市為濕原市。暴鯉龍4倍弱電，沼王免疫電但4倍弱草；浮潛鼬有冰牙，草手注意血量。",
      "party": [
        {
          "name": "暴鯉龍",
          "types": [
            "water",
            "flying"
          ],
          "level": 27
        },
        {
          "name": "沼王",
          "types": [
            "water",
            "ground"
          ],
          "level": 27
        },
        {
          "name": "浮潛鼬",
          "types": [
            "water"
          ],
          "level": 30
        }
      ],
      "strategy": {
        "level": "對手最高 Lv.30；依隊伍能力調整",
        "summary": "城市為濕原市。暴鯉龍4倍弱電，沼王免疫電但4倍弱草；浮潛鼬有冰牙，草手注意血量。",
        "tips": [
          "推薦為可替換候選；御三家僅在你選擇該開局時可用，不假設交換取得另外兩隻。"
        ]
      },
      "recommendedTeams": [
        {
          "label": "可取得的對策候選",
          "reason": "城市為濕原市。暴鯉龍4倍弱電，沼王免疫電但4倍弱草；浮潛鼬有冰牙，草手注意血量。",
          "pokemon": [
            {
              "name": "勒克貓",
              "types": [
                "electric"
              ],
              "obtain": "小貓怪15級進化",
              "moveNote": "電光打暴鯉龍"
            },
            {
              "name": "毒薔薇",
              "types": [
                "grass",
                "poison"
              ],
              "obtain": "204號道路含羞苞白天高友好度進化，或212號道路野生",
              "moveNote": "草招；光之石取得前不要求羅絲雷朵"
            }
          ]
        }
      ]
    },
    {
      "location": "緣之市",
      "badge": "幻覺徽章",
      "badgeType": "ghost",
      "order": 5,
      "role": "gym",
      "name": "梅麗莎",
      "notes": "幽靈免疫一般/格鬥；咬住等惡招有效。耿鬼為詛咒之軀，夢妖魔飄浮免疫地面。",
      "party": [
        {
          "name": "隨風球",
          "types": [
            "ghost",
            "flying"
          ],
          "level": 32
        },
        {
          "name": "耿鬼",
          "types": [
            "ghost",
            "poison"
          ],
          "level": 34
        },
        {
          "name": "夢妖魔",
          "types": [
            "ghost"
          ],
          "level": 36
        }
      ],
      "strategy": {
        "level": "對手最高 Lv.36；依隊伍能力調整",
        "summary": "幽靈免疫一般/格鬥；咬住等惡招有效。耿鬼為詛咒之軀，夢妖魔飄浮免疫地面。",
        "tips": [
          "推薦為可替換候選；御三家僅在你選擇該開局時可用，不假設交換取得另外兩隻。"
        ]
      },
      "recommendedTeams": [
        {
          "label": "可取得的對策候選",
          "reason": "幽靈免疫一般/格鬥；咬住等惡招有效。耿鬼為詛咒之軀，夢妖魔飄浮免疫地面。",
          "pokemon": [
            {
              "name": "倫琴貓",
              "types": [
                "electric"
              ],
              "obtain": "202號道路小貓怪→勒克貓15→倫琴貓30",
              "moveNote": "電光/咬住；咬碎需56級，別預設前期已學會"
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
      ]
    },
    {
      "location": "水脈市",
      "badge": "礦山徽章",
      "badgeType": "steel",
      "order": 6,
      "role": "gym",
      "name": "東瓜",
      "notes": "銅鏡怪飄浮免疫地面，用火；大鋼蛇水/火/格鬥，護城龍4倍弱地面/格鬥但結實可留1HP。",
      "party": [
        {
          "name": "銅鏡怪",
          "types": [
            "steel",
            "psychic"
          ],
          "level": 36
        },
        {
          "name": "大鋼蛇",
          "types": [
            "steel",
            "ground"
          ],
          "level": 36
        },
        {
          "name": "護城龍",
          "types": [
            "rock",
            "steel"
          ],
          "level": 39
        }
      ],
      "strategy": {
        "level": "對手最高 Lv.39；依隊伍能力調整",
        "summary": "銅鏡怪飄浮免疫地面，用火；大鋼蛇水/火/格鬥，護城龍4倍弱地面/格鬥但結實可留1HP。",
        "tips": [
          "推薦為可替換候選；御三家僅在你選擇該開局時可用，不假設交換取得另外兩隻。"
        ]
      },
      "recommendedTeams": [
        {
          "label": "可取得的對策候選",
          "reason": "銅鏡怪飄浮免疫地面，用火；大鋼蛇水/火/格鬥，護城龍4倍弱地面/格鬥但結實可留1HP。",
          "pokemon": [
            {
              "name": "黑魯加",
              "types": [
                "dark",
                "fire"
              ],
              "obtain": "取得探險套裝後地下大洞窟熔岩等對應空洞",
              "moveNote": "火與惡招；需確認出現洞窟與已学招式"
            },
            {
              "name": "海兔獸",
              "types": [
                "water",
                "ground"
              ],
              "obtain": "205號道路無殼海兔30級進化",
              "moveNote": "水之波動/大地之力等本系招"
            }
          ]
        }
      ]
    },
    {
      "location": "雪峰市",
      "badge": "冰凍徽章",
      "badgeType": "ice",
      "order": 7,
      "role": "gym",
      "name": "小菘",
      "notes": "雪笠怪/暴雪王4倍弱火，狃拉4倍弱格鬥；恰雷姆不是冰系，改飛行/幽靈/妖精。",
      "party": [
        {
          "name": "雪笠怪",
          "types": [
            "grass",
            "ice"
          ],
          "level": 38
        },
        {
          "name": "狃拉",
          "types": [
            "dark",
            "ice"
          ],
          "level": 38
        },
        {
          "name": "恰雷姆",
          "types": [
            "fighting",
            "psychic"
          ],
          "level": 40
        },
        {
          "name": "暴雪王",
          "types": [
            "grass",
            "ice"
          ],
          "level": 42
        }
      ],
      "strategy": {
        "level": "對手最高 Lv.42；依隊伍能力調整",
        "summary": "雪笠怪/暴雪王4倍弱火，狃拉4倍弱格鬥；恰雷姆不是冰系，改飛行/幽靈/妖精。",
        "tips": [
          "推薦為可替換候選；御三家僅在你選擇該開局時可用，不假設交換取得另外兩隻。"
        ]
      },
      "recommendedTeams": [
        {
          "label": "可取得的對策候選",
          "reason": "雪笠怪/暴雪王4倍弱火，狃拉4倍弱格鬥；恰雷姆不是冰系，改飛行/幽靈/妖精。",
          "pokemon": [
            {
              "name": "小火馬",
              "types": [
                "fire"
              ],
              "obtain": "206/210/211號道路",
              "moveNote": "火焰輪；40級進化烈焰馬"
            },
            {
              "name": "姆克鷹",
              "types": [
                "normal",
                "flying"
              ],
              "obtain": "姆克鳥34級進化",
              "moveNote": "飛行招打恰雷姆；近身戰打狃拉"
            }
          ]
        }
      ]
    },
    {
      "location": "濱海市",
      "badge": "電氣徽章",
      "badgeType": "electric",
      "order": 8,
      "role": "gym",
      "name": "電次",
      "notes": "兩隻電系用地面；章魚桶需草/電，不能把整隊當純電。雙尾怪手用格鬥。",
      "party": [
        {
          "name": "雷丘",
          "types": [
            "electric"
          ],
          "level": 46
        },
        {
          "name": "雙尾怪手",
          "types": [
            "normal"
          ],
          "level": 47
        },
        {
          "name": "章魚桶",
          "types": [
            "water"
          ],
          "level": 47
        },
        {
          "name": "倫琴貓",
          "types": [
            "electric"
          ],
          "level": 49
        }
      ],
      "strategy": {
        "level": "對手最高 Lv.49；依隊伍能力調整",
        "summary": "兩隻電系用地面；章魚桶需草/電，不能把整隊當純電。雙尾怪手用格鬥。",
        "tips": [
          "推薦為可替換候選；御三家僅在你選擇該開局時可用，不假設交換取得另外兩隻。"
        ]
      },
      "recommendedTeams": [
        {
          "label": "可取得的對策候選",
          "reason": "兩隻電系用地面；章魚桶需草/電，不能把整隊當純電。雙尾怪手用格鬥。",
          "pokemon": [
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
              "name": "倫琴貓",
              "types": [
                "electric"
              ],
              "obtain": "202號道路小貓怪→勒克貓15→倫琴貓30",
              "moveNote": "電光/咬住；咬碎需56級，別預設前期已學會"
            },
            {
              "name": "毒薔薇",
              "types": [
                "grass",
                "poison"
              ],
              "obtain": "204號道路含羞苞白天高友好度進化，或212號道路野生",
              "moveNote": "草招；光之石取得前不要求羅絲雷朵"
            }
          ]
        }
      ]
    }
  ],
  "eliteFour": [
    {
      "order": 1,
      "role": "eliteFour",
      "name": "阿柳",
      "party": [
        {
          "name": "毒粉蛾",
          "types": [
            "bug",
            "poison"
          ],
          "level": 53
        },
        {
          "name": "狩獵鳳蝶",
          "types": [
            "bug",
            "flying"
          ],
          "level": 53
        },
        {
          "name": "蜂女王",
          "types": [
            "bug",
            "flying"
          ],
          "level": 54
        },
        {
          "name": "赫拉克羅斯",
          "types": [
            "bug",
            "fighting"
          ],
          "level": 54
        },
        {
          "name": "龍王蠍",
          "types": [
            "poison",
            "dark"
          ],
          "level": 57
        }
      ],
      "notes": "飛行/火打前四隻；赫拉克羅斯4倍弱飛行，蜂女王4倍弱岩。龍王蠍只弱地面且免疫超能。",
      "specialty": "bug"
    },
    {
      "order": 2,
      "role": "eliteFour",
      "name": "菊野",
      "party": [
        {
          "name": "沼王",
          "types": [
            "water",
            "ground"
          ],
          "level": 55
        },
        {
          "name": "樹才怪",
          "types": [
            "rock"
          ],
          "level": 56
        },
        {
          "name": "隆隆岩",
          "types": [
            "rock",
            "ground"
          ],
          "level": 56
        },
        {
          "name": "鯰魚王",
          "types": [
            "water",
            "ground"
          ],
          "level": 55
        },
        {
          "name": "河馬獸",
          "types": [
            "ground"
          ],
          "level": 59
        }
      ],
      "notes": "沼王儲水、水招無效；沼王/鯰魚王4倍弱草。其餘用水草；隆隆岩有結實。",
      "specialty": "ground"
    },
    {
      "order": 3,
      "role": "eliteFour",
      "name": "大葉",
      "party": [
        {
          "name": "烈焰馬",
          "types": [
            "fire"
          ],
          "level": 58
        },
        {
          "name": "大鋼蛇",
          "types": [
            "steel",
            "ground"
          ],
          "level": 57
        },
        {
          "name": "隨風球",
          "types": [
            "ghost",
            "flying"
          ],
          "level": 58
        },
        {
          "name": "長耳兔",
          "types": [
            "normal"
          ],
          "level": 57
        },
        {
          "name": "烈焰猴",
          "types": [
            "fire",
            "fighting"
          ],
          "level": 61
        }
      ],
      "notes": "火系只有兩隻；水打烈焰馬/大鋼蛇/烈焰猴，隨風球改電/惡，長耳兔改格鬥。",
      "specialty": "fire"
    },
    {
      "order": 4,
      "role": "eliteFour",
      "name": "悟松",
      "party": [
        {
          "name": "魔牆人偶",
          "types": [
            "psychic",
            "fairy"
          ],
          "level": 59
        },
        {
          "name": "麒麟奇",
          "types": [
            "normal",
            "psychic"
          ],
          "level": 59
        },
        {
          "name": "恰雷姆",
          "types": [
            "fighting",
            "psychic"
          ],
          "level": 60
        },
        {
          "name": "胡地",
          "types": [
            "psychic"
          ],
          "level": 60
        },
        {
          "name": "青銅鐘",
          "types": [
            "steel",
            "psychic"
          ],
          "level": 63
        }
      ],
      "notes": "麒麟奇免疫幽靈，魔牆人偶與恰雷姆對惡等倍。青銅鐘飄浮免疫地面，改火/惡/幽靈。",
      "specialty": "psychic"
    }
  ],
  "champion": {
    "role": "champion",
    "name": "竹蘭",
    "party": [
      {
        "name": "花岩怪",
        "types": [
          "ghost",
          "dark"
        ],
        "level": 61
      },
      {
        "name": "羅絲雷朵",
        "types": [
          "grass",
          "poison"
        ],
        "level": 60
      },
      {
        "name": "海兔獸",
        "types": [
          "water",
          "ground"
        ],
        "level": 60
      },
      {
        "name": "路卡利歐",
        "types": [
          "fighting",
          "steel"
        ],
        "level": 63
      },
      {
        "name": "美納斯",
        "types": [
          "water"
        ],
        "level": 63
      },
      {
        "name": "烈咬陸鯊",
        "types": [
          "dragon",
          "ground"
        ],
        "level": 66
      }
    ],
    "notes": "花岩怪弱妖精；海兔獸引水，水招無效且4倍弱草；美納斯火焰寶珠+神奇鱗片，優先特殊電/草攻擊。烈咬陸鯊4倍弱冰但抗冰果減首次冰傷，粗糙皮膚反傷接觸招，不能宣稱冰礫一擊必倒。"
  },
  league: brilliantDiamondShiningPearlLeague
};

brilliantDiamondShiningPearlGuide.gyms.forEach(assertBattle);
assertLeague(brilliantDiamondShiningPearlLeague);
