import { assertBattle, assertLeague } from './helpers.js';
import { rubySapphireLeague } from './gen3-ruby-sapphire-league.js';

const gymRoxanne = {
  "order": 1,
  "role": "gym",
  "name": "杜娟",
  "location": "卡那茲市",
  "badge": "岩石徽章",
  "badgeType": "rock",
  "party": [
    {
      "name": "小拳石",
      "types": [
        "rock",
        "ground"
      ],
      "level": 14
    },
    {
      "name": "朝北鼻",
      "types": [
        "rock"
      ],
      "level": 15
    }
  ],
  "recommendedTeams": [
    {
      "label": "可取得的主力與替代",
      "reason": "依開局與已培養成員挑選，不需要全部收齊。",
      "pokemon": [
        {
          "name": "蘑蘑菇",
          "types": [
            "grass"
          ],
          "obtain": "橙華森林",
          "moveNote": "吸取；對小拳石4倍、朝北鼻2倍"
        },
        {
          "name": "沼躍魚",
          "types": [
            "water",
            "ground"
          ],
          "obtain": "水躍魚Lv.16進化（選它開局）",
          "moveNote": "水槍；水躍魚未進化也能使用水招"
        },
        {
          "name": "力壯雞",
          "types": [
            "fire",
            "fighting"
          ],
          "obtain": "火稚雞Lv.16進化（選它開局）",
          "moveNote": "二連踢；別用火招打岩石"
        }
      ]
    }
  ],
  "strategy": {
    "level": "13～17",
    "summary": "水、草處理岩石隊；火稚雞可先練到Lv.16進化。",
    "tips": [
      "木守宮的吸取可剋岩石；蘑蘑菇是純草，水躍魚是純水。"
    ]
  }
};
assertBattle(gymRoxanne);

const gymBrawly = {
  "order": 2,
  "role": "gym",
  "name": "藤樹",
  "location": "武鬥鎮",
  "badge": "格鬥徽章",
  "badgeType": "fighting",
  "party": [
    {
      "name": "腕力",
      "types": [
        "fighting"
      ],
      "level": 17
    },
    {
      "name": "幕下力士",
      "types": [
        "fighting"
      ],
      "level": 18
    }
  ],
  "recommendedTeams": [
    {
      "label": "可取得的主力與替代",
      "reason": "依開局與已培養成員挑選，不需要全部收齊。",
      "pokemon": [
        {
          "name": "傲骨燕",
          "types": [
            "normal",
            "flying"
          ],
          "obtain": "104／116號道路",
          "moveNote": "啄或翅膀攻擊"
        },
        {
          "name": "拉魯拉絲",
          "types": [
            "psychic"
          ],
          "obtain": "102號道路（低機率）",
          "moveNote": "念力；Lv.20才進化奇魯莉安"
        }
      ]
    }
  ],
  "strategy": {
    "level": "16～20",
    "summary": "飛行或超能力對付格鬥隊，別讓健美反覆強化。",
    "tips": [
      "綠寶石增加瑪沙那；集中攻擊可打斷真氣拳。",
      "此時拉魯拉絲可以有念力，無需等到沙奈朵。"
    ]
  }
};
assertBattle(gymBrawly);

const gymWattson = {
  "order": 3,
  "role": "gym",
  "name": "鐵旋",
  "location": "紫堇市",
  "badge": "電氣徽章",
  "badgeType": "electric",
  "party": [
    {
      "name": "小磁怪",
      "types": [
        "electric",
        "steel"
      ],
      "level": 22
    },
    {
      "name": "霹靂電球",
      "types": [
        "electric"
      ],
      "level": 20
    },
    {
      "name": "三合一磁怪",
      "types": [
        "electric",
        "steel"
      ],
      "level": 23
    }
  ],
  "recommendedTeams": [
    {
      "label": "可取得的主力與替代",
      "reason": "依開局與已培養成員挑選，不需要全部收齊。",
      "pokemon": [
        {
          "name": "沼躍魚",
          "types": [
            "water",
            "ground"
          ],
          "obtain": "水躍魚Lv.16進化",
          "moveNote": "泥巴射擊；仍須注意對手一般招"
        },
        {
          "name": "小拳石",
          "types": [
            "rock",
            "ground"
          ],
          "obtain": "石之洞窟",
          "moveNote": "震級；保留血量應付自爆"
        }
      ]
    }
  ],
  "strategy": {
    "level": "21～25",
    "summary": "地面屬性免疫電招；地面攻擊打三合一磁怪4倍。",
    "tips": [
      "沼躍魚只有選水躍魚開局才有；其他開局可在石之洞窟抓小拳石。",
      "紅／藍寶石沒有館主雷電獸；綠寶石的雷電獸Lv.24。"
    ]
  }
};
assertBattle(gymWattson);

const gymFlannery = {
  "order": 4,
  "role": "gym",
  "name": "亞莎",
  "location": "釜炎鎮",
  "badge": "炎熱徽章",
  "badgeType": "fire",
  "party": [
    {
      "name": "熔岩蟲",
      "types": [
        "fire"
      ],
      "level": 26
    },
    {
      "name": "熔岩蟲",
      "types": [
        "fire"
      ],
      "level": 26
    },
    {
      "name": "煤炭龜",
      "types": [
        "fire"
      ],
      "level": 28
    }
  ],
  "recommendedTeams": [
    {
      "label": "可取得的主力與替代",
      "reason": "依開局與已培養成員挑選，不需要全部收齊。",
      "pokemon": [
        {
          "name": "大嘴鷗",
          "types": [
            "water",
            "flying"
          ],
          "obtain": "海邊長翅鷗Lv.25進化",
          "moveNote": "水槍；羽棲尚未存在，別套用後代配招"
        },
        {
          "name": "沼躍魚",
          "types": [
            "water",
            "ground"
          ],
          "obtain": "選水躍魚開局",
          "moveNote": "水槍／泥巴射擊，水招打噴火駝4倍"
        }
      ]
    }
  ],
  "strategy": {
    "level": "26～30",
    "summary": "水系主攻；晴天下水招威力下降，煤炭龜物防也很高。",
    "tips": [
      "帶灼傷藥；水／地面對呆火駝、噴火駝有優勢，但後兩者只出現在綠寶石館主隊。"
    ]
  }
};
assertBattle(gymFlannery);

const gymNorman = {
  "order": 5,
  "role": "gym",
  "name": "千里",
  "location": "橙華市",
  "badge": "平衡徽章",
  "badgeType": "normal",
  "party": [
    {
      "name": "請假王",
      "types": [
        "normal"
      ],
      "level": 28
    },
    {
      "name": "過動猿",
      "types": [
        "normal"
      ],
      "level": 30
    },
    {
      "name": "請假王",
      "types": [
        "normal"
      ],
      "level": 31
    }
  ],
  "recommendedTeams": [
    {
      "label": "可取得的主力與替代",
      "reason": "依開局與已培養成員挑選，不需要全部收齊。",
      "pokemon": [
        {
          "name": "斗笠菇",
          "types": [
            "grass",
            "fighting"
          ],
          "obtain": "橙華森林蘑蘑菇Lv.23進化",
          "moveNote": "音速拳；想要蘑菇孢子需蘑蘑菇Lv.54才進化，不是主線現成招"
        },
        {
          "name": "鐵掌力士",
          "types": [
            "fighting"
          ],
          "obtain": "石之洞窟幕下力士Lv.24進化",
          "moveNote": "猛推等格鬥招；硬撐仍會造成高傷害"
        }
      ]
    }
  ],
  "strategy": {
    "level": "29～33",
    "summary": "格鬥打一般；請假王每攻擊一回合後會懶惰。",
    "tips": [
      "在懶惰回合補血或進攻；守住可擋它的行動回合。",
      "不要主動給對手異常狀態，硬撐會加倍威力。"
    ]
  }
};
assertBattle(gymNorman);

const gymWinona = {
  "order": 6,
  "role": "gym",
  "name": "娜琪",
  "location": "茵郁市",
  "badge": "羽毛徽章",
  "badgeType": "flying",
  "party": [
    {
      "name": "大王燕",
      "types": [
        "normal",
        "flying"
      ],
      "level": 31
    },
    {
      "name": "大嘴鷗",
      "types": [
        "water",
        "flying"
      ],
      "level": 30
    },
    {
      "name": "盔甲鳥",
      "types": [
        "steel",
        "flying"
      ],
      "level": 32
    },
    {
      "name": "七夕青鳥",
      "types": [
        "dragon",
        "flying"
      ],
      "level": 33
    }
  ],
  "recommendedTeams": [
    {
      "label": "可取得的主力與替代",
      "reason": "依開局與已培養成員挑選，不需要全部收齊。",
      "pokemon": [
        {
          "name": "雷電獸",
          "types": [
            "electric"
          ],
          "obtain": "110號道路落雷獸Lv.26進化",
          "moveNote": "電光；衝浪後完成新紫堇委託可得TM24十萬伏特"
        },
        {
          "name": "大嘴鷗",
          "types": [
            "water",
            "flying"
          ],
          "obtain": "長翅鷗Lv.25進化",
          "moveNote": "冰凍光束TM13對七夕青鳥4倍；不要用地面招打飛行"
        }
      ]
    }
  ],
  "strategy": {
    "level": "31～35",
    "summary": "電招處理大部分飛行系；七夕青鳥改用冰招。",
    "tips": [
      "七夕青鳥的龍屬性抵消電弱點，電只等倍；它有地震，電系別硬留場。",
      "冰凍光束TM13可在紫堇遊戲城兌換，需代幣；不是免費必備。"
    ]
  }
};
assertBattle(gymWinona);

const gymTateLiza = {
  "order": 7,
  "role": "gym",
  "name": "小楓與小南",
  "location": "綠嶺市",
  "badge": "心靈徽章",
  "badgeType": "psychic",
  "party": [
    {
      "name": "月石",
      "types": [
        "rock",
        "psychic"
      ],
      "level": 42
    },
    {
      "name": "太陽岩",
      "types": [
        "rock",
        "psychic"
      ],
      "level": 42
    }
  ],
  "recommendedTeams": [
    {
      "label": "可取得的主力與替代",
      "reason": "依開局與已培養成員挑選，不需要全部收齊。",
      "pokemon": [
        {
          "name": "巨牙鯊",
          "types": [
            "water",
            "dark"
          ],
          "obtain": "以好釣竿在118號道路等水域釣利牙魚，Lv.30進化",
          "moveNote": "咬碎；惡屬性免疫超能力招"
        },
        {
          "name": "巨沼怪",
          "types": [
            "water",
            "ground"
          ],
          "obtain": "沼躍魚Lv.36進化（選水開局）",
          "moveNote": "衝浪；第三世代雙打不會打中隊友，卻有分散傷害修正"
        }
      ]
    }
  ],
  "strategy": {
    "level": "40～44",
    "summary": "雙打集中火力；水、惡對岩石／超能力有效。",
    "tips": [
      "太陽岩能放晴天削弱水招；月石與太陽岩飄浮，地面招無效。",
      "綠寶石改成念力土偶、天然鳥開場，再接月石與太陽岩；天然鳥不弱水。"
    ]
  }
};
assertBattle(gymTateLiza);

const gymWallace = {
  "order": 8,
  "role": "gym",
  "name": "米可利",
  "location": "琉璃市",
  "badge": "雨滴徽章",
  "badgeType": "water",
  "party": [
    {
      "name": "愛心魚",
      "types": [
        "water"
      ],
      "level": 40
    },
    {
      "name": "鯰魚王",
      "types": [
        "water",
        "ground"
      ],
      "level": 42
    },
    {
      "name": "海魔獅",
      "types": [
        "ice",
        "water"
      ],
      "level": 40
    },
    {
      "name": "金魚王",
      "types": [
        "water"
      ],
      "level": 42
    },
    {
      "name": "美納斯",
      "types": [
        "water"
      ],
      "level": 43
    }
  ],
  "recommendedTeams": [
    {
      "label": "可取得的主力與替代",
      "reason": "依開局與已培養成員挑選，不需要全部收齊。",
      "pokemon": [
        {
          "name": "雷電獸",
          "types": [
            "electric"
          ],
          "obtain": "落雷獸Lv.26進化",
          "moveNote": "十萬伏特TM24；對鯰魚王完全無效"
        },
        {
          "name": "斗笠菇",
          "types": [
            "grass",
            "fighting"
          ],
          "obtain": "蘑蘑菇Lv.23進化",
          "moveNote": "超級吸取打鯰魚王；面對冰招需換場"
        }
      ]
    }
  ],
  "strategy": {
    "level": "41～45",
    "summary": "電系打一般水系；鯰魚王必須換草系。",
    "tips": [
      "鯰魚王水／地面免疫電、怕草4倍。",
      "紅／藍寶石館主米可利的美納斯Lv.43；別套用綠寶石亞當隊。"
    ]
  }
};
assertBattle(gymWallace);

const eliteSidney = {
  "order": 1,
  "role": "eliteFour",
  "name": "花月",
  "specialty": "dark",
  "party": [
    {
      "name": "大狼犬",
      "types": [
        "dark"
      ],
      "level": 46
    },
    {
      "name": "狡猾天狗",
      "types": [
        "grass",
        "dark"
      ],
      "level": 48
    },
    {
      "name": "夢歌仙人掌",
      "types": [
        "grass",
        "dark"
      ],
      "level": 46
    },
    {
      "name": "巨牙鯊",
      "types": [
        "water",
        "dark"
      ],
      "level": 48
    },
    {
      "name": "阿勃梭魯",
      "types": [
        "dark"
      ],
      "level": 49
    }
  ]
};
assertBattle(eliteSidney);

const elitePhoebe = {
  "order": 2,
  "role": "eliteFour",
  "name": "芙蓉",
  "specialty": "ghost",
  "party": [
    {
      "name": "彷徨夜靈",
      "types": [
        "ghost"
      ],
      "level": 48
    },
    {
      "name": "詛咒娃娃",
      "types": [
        "ghost"
      ],
      "level": 49
    },
    {
      "name": "勾魂眼",
      "types": [
        "dark",
        "ghost"
      ],
      "level": 50
    },
    {
      "name": "詛咒娃娃",
      "types": [
        "ghost"
      ],
      "level": 49
    },
    {
      "name": "彷徨夜靈",
      "types": [
        "ghost"
      ],
      "level": 51
    }
  ]
};
assertBattle(elitePhoebe);

const eliteGlacia = {
  "order": 3,
  "role": "eliteFour",
  "name": "波妮",
  "specialty": "ice",
  "party": [
    {
      "name": "冰鬼護",
      "types": [
        "ice"
      ],
      "level": 50
    },
    {
      "name": "海魔獅",
      "types": [
        "ice",
        "water"
      ],
      "level": 50
    },
    {
      "name": "海魔獅",
      "types": [
        "ice",
        "water"
      ],
      "level": 52
    },
    {
      "name": "冰鬼護",
      "types": [
        "ice"
      ],
      "level": 52
    },
    {
      "name": "帝牙海獅",
      "types": [
        "ice",
        "water"
      ],
      "level": 53
    }
  ]
};
assertBattle(eliteGlacia);

const eliteDrake = {
  "order": 4,
  "role": "eliteFour",
  "name": "源治",
  "specialty": "dragon",
  "party": [
    {
      "name": "甲殼龍",
      "types": [
        "dragon"
      ],
      "level": 52
    },
    {
      "name": "七夕青鳥",
      "types": [
        "dragon",
        "flying"
      ],
      "level": 54
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
      "name": "沙漠蜻蜓",
      "types": [
        "ground",
        "dragon"
      ],
      "level": 53
    },
    {
      "name": "暴飛龍",
      "types": [
        "dragon",
        "flying"
      ],
      "level": 55
    }
  ]
};
assertBattle(eliteDrake);

const championSteven = {
  "role": "champion",
  "name": "大吾",
  "specialty": "steel",
  "party": [
    {
      "name": "盔甲鳥",
      "types": [
        "steel",
        "flying"
      ],
      "level": 57
    },
    {
      "name": "念力土偶",
      "types": [
        "ground",
        "psychic"
      ],
      "level": 55
    },
    {
      "name": "波士可多拉",
      "types": [
        "steel",
        "rock"
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
      "name": "太古盔甲",
      "types": [
        "rock",
        "bug"
      ],
      "level": 56
    },
    {
      "name": "巨金怪",
      "types": [
        "steel",
        "psychic"
      ],
      "level": 58
    }
  ]
};
assertBattle(championSteven);

const league = rubySapphireLeague;
assertLeague(league);

export const rubySapphireGuide = {
  id: 'ruby-sapphire',
  title: '寶可夢 紅寶石／藍寶石',
  displayGeneration: 3,
  status: 'complete',
  notes: "紅寶石／藍寶石首次道館與聯盟。琉璃市館主為米可利、冠軍為大吾；不可套用綠寶石或終極紅寶石／始源藍寶石隊伍。",
  gyms: [
    gymRoxanne,
    gymBrawly,
    gymWattson,
    gymFlannery,
    gymNorman,
    gymWinona,
    gymTateLiza,
    gymWallace,
  ],
  eliteFour: [eliteSidney, elitePhoebe, eliteGlacia, eliteDrake],
  champion: championSteven,
  league,
};
