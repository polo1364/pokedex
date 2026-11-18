import { assertBattle, assertLeague } from './helpers.js';
import { goldSilverLeague } from './gen2-gold-silver-league.js';

const gymFalkner = {
  "order": 1,
  "role": "gym",
  "name": "阿速",
  "location": "桔梗市",
  "badge": "飛翼徽章",
  "badgeType": "flying",
  "party": [
    {
      "name": "波波",
      "types": [
        "normal",
        "flying"
      ],
      "level": 7
    },
    {
      "name": "比比鳥",
      "types": [
        "normal",
        "flying"
      ],
      "level": 9
    }
  ],
  "recommendedTeams": [
    {
      "label": "可取得的主力與替代",
      "reason": "依開局與已培養成員挑選，不需要全部收齊。",
      "pokemon": [
        {
          "name": "小拳石",
          "types": [
            "rock",
            "ground"
          ],
          "obtain": "暗黑洞穴或46號道路",
          "moveNote": "落石；金／銀／水晶Lv.11，心金／魂銀Lv.11"
        },
        {
          "name": "大岩蛇",
          "types": [
            "rock",
            "ground"
          ],
          "obtain": "桔梗市以喇叭芽交換",
          "moveNote": "岩石系抗一般與飛行；留意交換寶可夢服從等級"
        }
      ]
    }
  ],
  "strategy": {
    "level": "7～11",
    "summary": "用岩石招處理兩隻飛行系；地面招打不到牠們。",
    "tips": [
      "小拳石也怕對方的擲泥，先練出落石；火系對一般／飛行沒有屬性優勢。"
    ]
  }
};
assertBattle(gymFalkner);

const gymBugsy = {
  "order": 2,
  "role": "gym",
  "name": "阿筆",
  "location": "檜皮鎮",
  "badge": "昆蟲徽章",
  "badgeType": "bug",
  "party": [
    {
      "name": "鐵甲蛹",
      "types": [
        "bug"
      ],
      "level": 14
    },
    {
      "name": "鐵殼蛹",
      "types": [
        "bug",
        "poison"
      ],
      "level": 14
    },
    {
      "name": "飛天螳螂",
      "types": [
        "bug",
        "flying"
      ],
      "level": 16
    }
  ],
  "recommendedTeams": [
    {
      "label": "可取得的主力與替代",
      "reason": "依開局與已培養成員挑選，不需要全部收齊。",
      "pokemon": [
        {
          "name": "小拳石",
          "types": [
            "rock",
            "ground"
          ],
          "obtain": "暗黑洞穴／互連洞",
          "moveNote": "落石；保持血量再迎戰飛天螳螂"
        },
        {
          "name": "火岩鼠",
          "types": [
            "fire"
          ],
          "obtain": "火球鼠Lv.14進化（選它開局）",
          "moveNote": "火花打蟲；不用等Lv.36火爆獸"
        }
      ]
    }
  ],
  "strategy": {
    "level": "14～18",
    "summary": "飛天螳螂是重點，岩石招可造成4倍傷害。",
    "tips": [
      "心金／魂銀要防急速折返；金／銀／水晶則別讓連斬連續命中。",
      "鐵殼蛹是蟲／毒，鐵甲蛹才是純蟲。"
    ]
  }
};
assertBattle(gymBugsy);

const gymWhitney = {
  "order": 3,
  "role": "gym",
  "name": "小茜",
  "location": "滿金市",
  "badge": "普通徽章",
  "badgeType": "normal",
  "party": [
    {
      "name": "皮皮",
      "types": [
        "normal"
      ],
      "level": 18
    },
    {
      "name": "大奶罐",
      "types": [
        "normal"
      ],
      "level": 20
    }
  ],
  "recommendedTeams": [
    {
      "label": "可取得的主力與替代",
      "reason": "依開局與已培養成員挑選，不需要全部收齊。",
      "pokemon": [
        {
          "name": "腕力",
          "types": [
            "fighting"
          ],
          "obtain": "滿金百貨5F用催眠貘交換",
          "moveNote": "空手劈／踢倒等格鬥招；先確認服從上限"
        },
        {
          "name": "小拳石",
          "types": [
            "rock",
            "ground"
          ],
          "obtain": "前段洞窟培養",
          "moveNote": "岩石／地面組合抵抗踩踏與滾動，但別把耐久當成保證獲勝"
        }
      ]
    }
  ],
  "strategy": {
    "level": "18～22",
    "summary": "用格鬥招對付大奶罐，並避免讓滾動連續累積威力。",
    "tips": [
      "交換取得的腕力為雌性，不受這隻雌性大奶罐的迷人影響。",
      "大奶罐會喝牛奶，維持連續輸出；不要把小磁怪列作此時已取得。"
    ]
  }
};
assertBattle(gymWhitney);

const gymMorty = {
  "order": 4,
  "role": "gym",
  "name": "松葉",
  "location": "緣朱市",
  "badge": "霧徽章",
  "badgeType": "ghost",
  "party": [
    {
      "name": "鬼斯",
      "types": [
        "ghost",
        "poison"
      ],
      "level": 21
    },
    {
      "name": "鬼斯通",
      "types": [
        "ghost",
        "poison"
      ],
      "level": 21
    },
    {
      "name": "鬼斯通",
      "types": [
        "ghost",
        "poison"
      ],
      "level": 23
    },
    {
      "name": "耿鬼",
      "types": [
        "ghost",
        "poison"
      ],
      "level": 25
    }
  ],
  "recommendedTeams": [
    {
      "label": "可取得的主力與替代",
      "reason": "依開局與已培養成員挑選，不需要全部收齊。",
      "pokemon": [
        {
          "name": "暴鯉龍",
          "types": [
            "water",
            "flying"
          ],
          "obtain": "32號道路寶可夢中心取得舊釣竿，釣鯉魚王後Lv.20進化",
          "moveNote": "咬住；金／銀／水晶惡系是特殊招，勿以物攻估算威力"
        },
        {
          "name": "催眠貘",
          "types": [
            "psychic"
          ],
          "obtain": "34號道路",
          "moveNote": "念力打毒系；也怕幽靈攻擊，勿在殘血時換入"
        }
      ]
    }
  ],
  "strategy": {
    "level": "23～27",
    "summary": "準備惡系攻擊與解眠藥，避免被催眠後連續食夢。",
    "tips": [
      "一般與格鬥攻擊打不到鬼斯一家；一般系寶可夢可免疫幽靈傷害，但仍怕催眠術、詛咒。",
      "耿鬼在金／銀／水晶沒有特性；心金／魂銀有飄浮，地面招無效。"
    ]
  }
};
assertBattle(gymMorty);

const gymChuck = {
  "order": 5,
  "role": "gym",
  "name": "阿四",
  "location": "湛藍市",
  "badge": "波浪徽章",
  "badgeType": "fighting",
  "party": [
    {
      "name": "火爆猴",
      "types": [
        "fighting"
      ],
      "level": 27
    },
    {
      "name": "蚊香泳士",
      "types": [
        "water",
        "fighting"
      ],
      "level": 30
    }
  ],
  "recommendedTeams": [
    {
      "label": "可取得的主力與替代",
      "reason": "依開局與已培養成員挑選，不需要全部收齊。",
      "pokemon": [
        {
          "name": "勇基拉",
          "types": [
            "psychic"
          ],
          "obtain": "34／35號道路凱西Lv.16進化",
          "moveNote": "念力／幻象光線；不用通訊進化胡地"
        },
        {
          "name": "大嘴雀",
          "types": [
            "normal",
            "flying"
          ],
          "obtain": "烈雀Lv.20進化",
          "moveNote": "啄或啄鑽；飛行對兩隻格鬥系有效"
        }
      ]
    }
  ],
  "strategy": {
    "level": "28～32",
    "summary": "超能力或飛行處理格鬥；蚊香泳士另有水屬性。",
    "tips": [
      "別用岩石系硬扛格鬥招；攜帶解眠藥。",
      "先到淺蔥燈塔確認阿蜜任務，再前往湛藍市取得秘傳之藥；道館與取藥均在同次航行完成。"
    ]
  }
};
assertBattle(gymChuck);

const gymJasmine = {
  "order": 6,
  "role": "gym",
  "name": "阿蜜",
  "location": "淺蔥市",
  "badge": "鋼鐵徽章",
  "badgeType": "steel",
  "party": [
    {
      "name": "小磁怪",
      "types": [
        "electric",
        "steel"
      ],
      "level": 30
    },
    {
      "name": "小磁怪",
      "types": [
        "electric",
        "steel"
      ],
      "level": 30
    },
    {
      "name": "大鋼蛇",
      "types": [
        "steel",
        "ground"
      ],
      "level": 35
    }
  ],
  "recommendedTeams": [
    {
      "label": "可取得的主力與替代",
      "reason": "依開局與已培養成員挑選，不需要全部收齊。",
      "pokemon": [
        {
          "name": "隆隆石",
          "types": [
            "rock",
            "ground"
          ],
          "obtain": "小拳石Lv.25進化",
          "moveNote": "震級等地面招對小磁怪；不用通訊"
        },
        {
          "name": "暴鯉龍",
          "types": [
            "water",
            "flying"
          ],
          "obtain": "憤怒之湖固定遭遇，或鯉魚王Lv.20進化",
          "moveNote": "衝浪對大鋼蛇；電系小磁怪需換走"
        }
      ]
    }
  ],
  "strategy": {
    "level": "33～37",
    "summary": "地面招打小磁怪4倍；大鋼蛇改用水系特殊攻擊。",
    "tips": [
      "先把湛藍市取得的秘傳之藥送回燈塔，阿蜜才回道館。",
      "小磁怪會用電招，水系不要從滿血硬扛；大鋼蛇的物防很高。"
    ]
  }
};
assertBattle(gymJasmine);

const gymPryce = {
  "order": 7,
  "role": "gym",
  "name": "柳伯",
  "location": "卡吉鎮",
  "badge": "冰凍徽章",
  "badgeType": "ice",
  "party": [
    {
      "name": "小海獅",
      "types": [
        "water"
      ],
      "level": 27
    },
    {
      "name": "白海獅",
      "types": [
        "water",
        "ice"
      ],
      "level": 29
    },
    {
      "name": "長毛豬",
      "types": [
        "ice",
        "ground"
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
          "name": "三合一磁怪",
          "types": [
            "electric",
            "steel"
          ],
          "obtain": "38／39號道路小磁怪Lv.30進化",
          "moveNote": "金／銀／水晶用電擊或TM25打雷；心金／魂銀用電光。只打水系兩隻"
        },
        {
          "name": "暴鯉龍",
          "types": [
            "water",
            "flying"
          ],
          "obtain": "憤怒之湖",
          "moveNote": "衝浪打長毛豬，別用冰招期待剋制冰／地面"
        }
      ]
    }
  ],
  "strategy": {
    "level": "29～33",
    "summary": "電系處理小海獅與白海獅；長毛豬改用水或草。",
    "tips": [
      "長毛豬的地面屬性免疫電招，不能整場只按電系。",
      "這是柳伯首次戰，不要混入重賽的象牙豬。"
    ]
  }
};
assertBattle(gymPryce);

const gymClair = {
  "order": 8,
  "role": "gym",
  "name": "小椿",
  "location": "煙墨市",
  "badge": "升龍徽章",
  "badgeType": "dragon",
  "party": [
    {
      "name": "哈克龍",
      "types": [
        "dragon"
      ],
      "level": 37
    },
    {
      "name": "哈克龍",
      "types": [
        "dragon"
      ],
      "level": 37
    },
    {
      "name": "哈克龍",
      "types": [
        "dragon"
      ],
      "level": 37
    },
    {
      "name": "刺龍王",
      "types": [
        "water",
        "dragon"
      ],
      "level": 40
    }
  ],
  "recommendedTeams": [
    {
      "label": "可取得的主力與替代",
      "reason": "依開局與已培養成員挑選，不需要全部收齊。",
      "pokemon": [
        {
          "name": "拉普拉斯",
          "types": [
            "water",
            "ice"
          ],
          "obtain": "取得衝浪後，星期五到互連洞地下2F",
          "moveNote": "冰凍光束；打哈克龍，對刺龍王換等倍招"
        },
        {
          "name": "暴鯉龍",
          "types": [
            "water",
            "flying"
          ],
          "obtain": "憤怒之湖",
          "moveNote": "心金／魂銀可用冰凍牙；金／銀／水晶改用其他已會的等倍攻擊對刺龍王"
        }
      ]
    }
  ],
  "strategy": {
    "level": "38～42",
    "summary": "冰招打哈克龍；刺龍王是水／龍，冰與電僅等倍。",
    "tips": [
      "此世代沒有妖精屬性，刺龍王只有龍系弱點；可用高威力等倍招配合耐久。",
      "心金／魂銀還有暴鯉龍，交給電系；金／銀／水晶則有三隻哈克龍。",
      "獲勝後仍須完成龍穴考驗才取得徽章。"
    ]
  }
};
assertBattle(gymClair);

const eliteWill = {
  "order": 1,
  "role": "eliteFour",
  "name": "一樹",
  "specialty": "psychic",
  "party": [
    {
      "name": "天然鳥",
      "types": [
        "psychic",
        "flying"
      ],
      "level": 40
    },
    {
      "name": "迷唇姐",
      "types": [
        "ice",
        "psychic"
      ],
      "level": 41
    },
    {
      "name": "椰蛋樹",
      "types": [
        "grass",
        "psychic"
      ],
      "level": 41
    },
    {
      "name": "呆殼獸",
      "types": [
        "water",
        "psychic"
      ],
      "level": 41
    },
    {
      "name": "天然鳥",
      "types": [
        "psychic",
        "flying"
      ],
      "level": 42
    }
  ]
};
assertBattle(eliteWill);

const eliteKoga = {
  "order": 2,
  "role": "eliteFour",
  "name": "阿桔",
  "specialty": "poison",
  "party": [
    {
      "name": "阿利多斯",
      "types": [
        "bug",
        "poison"
      ],
      "level": 40
    },
    {
      "name": "摩魯蛾",
      "types": [
        "bug",
        "poison"
      ],
      "level": 41
    },
    {
      "name": "佛烈托斯",
      "types": [
        "bug",
        "steel"
      ],
      "level": 43
    },
    {
      "name": "臭臭泥",
      "types": [
        "poison"
      ],
      "level": 42
    },
    {
      "name": "叉字蝠",
      "types": [
        "poison",
        "flying"
      ],
      "level": 44
    }
  ]
};
assertBattle(eliteKoga);

const eliteBruno = {
  "order": 3,
  "role": "eliteFour",
  "name": "希巴",
  "specialty": "fighting",
  "party": [
    {
      "name": "戰舞郎",
      "types": [
        "fighting"
      ],
      "level": 42
    },
    {
      "name": "飛腿郎",
      "types": [
        "fighting"
      ],
      "level": 42
    },
    {
      "name": "快拳郎",
      "types": [
        "fighting"
      ],
      "level": 42
    },
    {
      "name": "大岩蛇",
      "types": [
        "rock",
        "ground"
      ],
      "level": 43
    },
    {
      "name": "怪力",
      "types": [
        "fighting"
      ],
      "level": 46
    }
  ]
};
assertBattle(eliteBruno);

const eliteKaren = {
  "order": 4,
  "role": "eliteFour",
  "name": "梨花",
  "specialty": "dark",
  "party": [
    {
      "name": "月亮伊布",
      "types": [
        "dark"
      ],
      "level": 42
    },
    {
      "name": "霸王花",
      "types": [
        "grass",
        "poison"
      ],
      "level": 42
    },
    {
      "name": "耿鬼",
      "types": [
        "ghost",
        "poison"
      ],
      "level": 45
    },
    {
      "name": "黑暗鴉",
      "types": [
        "dark",
        "flying"
      ],
      "level": 44
    },
    {
      "name": "黑魯加",
      "types": [
        "dark",
        "fire"
      ],
      "level": 47
    }
  ]
};
assertBattle(eliteKaren);

const championLance = {
  "role": "champion",
  "name": "渡",
  "specialty": "dragon",
  "party": [
    {
      "name": "暴鯉龍",
      "types": [
        "water",
        "flying"
      ],
      "level": 44
    },
    {
      "name": "快龍",
      "types": [
        "dragon",
        "flying"
      ],
      "level": 47
    },
    {
      "name": "快龍",
      "types": [
        "dragon",
        "flying"
      ],
      "level": 47
    },
    {
      "name": "化石翼龍",
      "types": [
        "rock",
        "flying"
      ],
      "level": 46
    },
    {
      "name": "噴火龍",
      "types": [
        "fire",
        "flying"
      ],
      "level": 46
    },
    {
      "name": "快龍",
      "types": [
        "dragon",
        "flying"
      ],
      "level": 50
    }
  ]
};
assertBattle(championLance);

const league = goldSilverLeague;
assertLeague(league);

export const goldSilverGuide = {
  id: 'gold-silver',
  title: '寶可夢 金／銀',
  displayGeneration: 2,
  status: 'complete',
  notes: "金／銀首次城都8道館、四天王與冠軍渡。道館後半可有不同挑戰次序，本頁採常見路線；通關後關都不是付費DLC。",
  gyms: [
    gymFalkner,
    gymBugsy,
    gymWhitney,
    gymMorty,
    gymChuck,
    gymJasmine,
    gymPryce,
    gymClair,
  ],
  eliteFour: [eliteWill, eliteKoga, eliteBruno, eliteKaren],
  champion: championLance,
  league,
};
