import { assertBattle, assertLeague } from './helpers.js';
import { diamondPearlLeague } from './gen4-diamond-pearl-league.js';

const gymRoark = {
  "order": 1,
  "role": "gym",
  "name": "瓢太",
  "location": "黑金市",
  "badge": "煤炭徽章",
  "badgeType": "rock",
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
  "recommendedTeams": [
    {
      "label": "可取得的主力與替代",
      "reason": "依開局與已培養成員挑選，不需要全部收齊。",
      "pokemon": [
        {
          "name": "含羞苞",
          "types": [
            "grass",
            "poison"
          ],
          "obtain": "204號道路",
          "moveNote": "吸取；毒屬性仍要留意對手攻擊"
        },
        {
          "name": "猛火猴",
          "types": [
            "fire",
            "fighting"
          ],
          "obtain": "小火焰猴Lv.14進化（選它開局）",
          "moveNote": "音速拳"
        },
        {
          "name": "波加曼",
          "types": [
            "water"
          ],
          "obtain": "選波加曼開局",
          "moveNote": "泡沫或泡沫光線"
        }
      ]
    }
  ],
  "strategy": {
    "level": "12～16",
    "summary": "水、草或格鬥處理岩石，頭蓋龍攻擊高，不宜拖回合。",
    "tips": [
      "小火焰猴Lv.14進化猛火猴後學音速拳；岩石系不怕一般火招。"
    ]
  }
};
assertBattle(gymRoark);

const gymGardenia = {
  "order": 2,
  "role": "gym",
  "name": "菜種",
  "location": "百代市",
  "badge": "森林徽章",
  "badgeType": "grass",
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
  "recommendedTeams": [
    {
      "label": "可取得的主力與替代",
      "reason": "依開局與已培養成員挑選，不需要全部收齊。",
      "pokemon": [
        {
          "name": "姆克鳥",
          "types": [
            "normal",
            "flying"
          ],
          "obtain": "姆克兒Lv.14進化",
          "moveNote": "翅膀攻擊"
        },
        {
          "name": "小火馬",
          "types": [
            "fire"
          ],
          "obtain": "211號道路西段（百代市東側草叢）",
          "moveNote": "火花；此時不需要Lv.40烈焰馬"
        }
      ]
    }
  ],
  "strategy": {
    "level": "20～24",
    "summary": "火或飛行對草；羅絲雷朵速度快，準備解麻與解毒。",
    "tips": [
      "含羞苞與羅絲雷朵是草／毒；不是純草。"
    ]
  }
};
assertBattle(gymGardenia);

const gymMaylene = {
  "order": 3,
  "role": "gym",
  "name": "阿李",
  "location": "帷幕市",
  "badge": "帷幕徽章",
  "badgeType": "fighting",
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
  "recommendedTeams": [
    {
      "label": "可取得的主力與替代",
      "reason": "依開局與已培養成員挑選，不需要全部收齊。",
      "pokemon": [
        {
          "name": "姆克鷹",
          "types": [
            "normal",
            "flying"
          ],
          "obtain": "姆克鳥Lv.34進化；尚未進化可用姆克鳥",
          "moveNote": "翅膀攻擊；高於此關建議等級才是姆克鷹"
        },
        {
          "name": "猛火猴",
          "types": [
            "fire",
            "fighting"
          ],
          "obtain": "小火焰猴開局",
          "moveNote": "火焰輪打路卡利歐；注意吸取拳回血"
        }
      ]
    }
  ],
  "strategy": {
    "level": "28～32",
    "summary": "飛行／超能力打格鬥；路卡利歐另有鋼屬性，改火或地面。",
    "tips": [
      "路卡利歐對飛行、超能力僅等倍；不要只靠剋制標籤。"
    ]
  }
};
assertBattle(gymMaylene);

const gymWake = {
  "order": 4,
  "role": "gym",
  "name": "吉憲",
  "location": "濱名市",
  "badge": "濕地徽章",
  "badgeType": "water",
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
  "recommendedTeams": [
    {
      "label": "可取得的主力與替代",
      "reason": "依開局與已培養成員挑選，不需要全部收齊。",
      "pokemon": [
        {
          "name": "勒克貓",
          "types": [
            "electric"
          ],
          "obtain": "202號道路小貓怪Lv.15進化",
          "moveNote": "電光；Lv.30再進化倫琴貓"
        },
        {
          "name": "毒薔薇",
          "types": [
            "grass",
            "poison"
          ],
          "obtain": "含羞苞白天高親密進化，或捕捉野生毒薔薇",
          "moveNote": "草招打沼王4倍"
        }
      ]
    }
  ],
  "strategy": {
    "level": "28～32",
    "summary": "電招打暴鯉龍4倍；沼王免疫電，必須換草。",
    "tips": [
      "浮潛鼬有冰系攻擊，草系要留意血量。"
    ]
  }
};
assertBattle(gymWake);

const gymFantina = {
  "order": 5,
  "role": "gym",
  "name": "梅麗莎",
  "location": "緣之市",
  "badge": "幻覺徽章",
  "badgeType": "ghost",
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
  "recommendedTeams": [
    {
      "label": "可取得的主力與替代",
      "reason": "依開局與已培養成員挑選，不需要全部收齊。",
      "pokemon": [
        {
          "name": "勒克貓",
          "types": [
            "electric"
          ],
          "obtain": "小貓怪Lv.15進化",
          "moveNote": "咬住；別因電屬性就誤認電招剋幽靈"
        },
        {
          "name": "暴鯉龍",
          "types": [
            "water",
            "flying"
          ],
          "obtain": "舊釣竿釣鯉魚王後Lv.20進化",
          "moveNote": "咬住；夢妖魔可能有電系覆蓋，需留意換場"
        }
      ]
    }
  ],
  "strategy": {
    "level": "34～38",
    "summary": "幽靈不受一般、格鬥攻擊；咬住等惡招可反制。",
    "tips": [
      "白金第3館為夜巡靈、鬼斯通、夢妖魔；鑽石／珍珠第5館則為隨風球、耿鬼、夢妖魔。",
      "飄浮的鬼斯通／耿鬼／夢妖魔免疫地面，不能用地面剋毒一概處理。"
    ]
  }
};
assertBattle(gymFantina);

const gymByron = {
  "order": 6,
  "role": "gym",
  "name": "東瓜",
  "location": "水脈市",
  "badge": "礦山徽章",
  "badgeType": "steel",
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
  "recommendedTeams": [
    {
      "label": "可取得的主力與替代",
      "reason": "依開局與已培養成員挑選，不需要全部收齊。",
      "pokemon": [
        {
          "name": "烈焰猴",
          "types": [
            "fire",
            "fighting"
          ],
          "obtain": "猛火猴Lv.36進化（火開局）",
          "moveNote": "火焰輪／近身戰；別用飛行招打鋼"
        },
        {
          "name": "浮潛鼬",
          "types": [
            "water"
          ],
          "obtain": "泳圈鼬Lv.26進化",
          "moveNote": "衝浪；打大鋼蛇與護城龍有效"
        }
      ]
    }
  ],
  "strategy": {
    "level": "37～41",
    "summary": "火、地面或格鬥打鋼；護城龍怕地面／格鬥4倍。",
    "tips": [
      "鑽石／珍珠的銅鏡怪有飄浮，地面無效；白金則換成三合一磁怪。"
    ]
  }
};
assertBattle(gymByron);

const gymCandice = {
  "order": 7,
  "role": "gym",
  "name": "小菘",
  "location": "雪峰市",
  "badge": "冰凍徽章",
  "badgeType": "ice",
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
  "recommendedTeams": [
    {
      "label": "可取得的主力與替代",
      "reason": "依開局與已培養成員挑選，不需要全部收齊。",
      "pokemon": [
        {
          "name": "烈焰馬",
          "types": [
            "fire"
          ],
          "obtain": "小火馬Lv.40進化",
          "moveNote": "火焰輪；白金雪妖女免疫格鬥，鋼招則有2倍效果"
        },
        {
          "name": "烈焰猴",
          "types": [
            "fire",
            "fighting"
          ],
          "obtain": "小火焰猴開局後進化",
          "moveNote": "火焰輪；近身戰打非幽靈冰系"
        }
      ]
    }
  ],
  "strategy": {
    "level": "40～44",
    "summary": "火系主攻；暴雪王草／冰怕火4倍，留意冰雹。",
    "tips": [
      "鑽石／珍珠隊中恰雷姆不弱火；白金換成長毛豬與雪妖女。",
      "冰系對草、地面有效，土台龜不宜留場。"
    ]
  }
};
assertBattle(gymCandice);

const gymVolkner = {
  "order": 8,
  "role": "gym",
  "name": "電次",
  "location": "濱海市",
  "badge": "電氣徽章",
  "badgeType": "electric",
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
      "level": 48
    },
    {
      "name": "倫琴貓",
      "types": [
        "electric"
      ],
      "level": 49
    }
  ],
  "recommendedTeams": [
    {
      "label": "可取得的主力與替代",
      "reason": "依開局與已培養成員挑選，不需要全部收齊。",
      "pokemon": [
        {
          "name": "河馬獸",
          "types": [
            "ground"
          ],
          "obtain": "214號道路等地的沙河馬Lv.34進化",
          "moveNote": "地震；DP沙河馬在遺跡迷洞穴，白金也可在洞內找"
        },
        {
          "name": "海兔獸",
          "types": [
            "water",
            "ground"
          ],
          "obtain": "海邊無殼海兔Lv.30進化",
          "moveNote": "泥巴炸彈；地面屬性免疫電，草招會造成4倍傷害"
        }
      ]
    }
  ],
  "strategy": {
    "level": "47～51",
    "summary": "地面招打電系，並先判斷版本的非電系成員。",
    "tips": [
      "鑽石／珍珠有章魚桶與雙尾怪手；白金才是全電系。",
      "不要讓水／飛行暴鯉龍扛電招；冰系覆蓋也會威脅土台龜。"
    ]
  }
};
assertBattle(gymVolkner);

const eliteAaron = {
  "order": 1,
  "role": "eliteFour",
  "name": "阿柳",
  "specialty": "bug",
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
      "name": "赫拉克羅斯",
      "types": [
        "bug",
        "fighting"
      ],
      "level": 54
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
      "name": "狩獵鳳蝶",
      "types": [
        "bug",
        "flying"
      ],
      "level": 53
    },
    {
      "name": "龍王蠍",
      "types": [
        "poison",
        "dark"
      ],
      "level": 57
    }
  ]
};
assertBattle(eliteAaron);

const eliteBertha = {
  "order": 2,
  "role": "eliteFour",
  "name": "菊野",
  "specialty": "ground",
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
      "name": "河馬獸",
      "types": [
        "ground"
      ],
      "level": 59
    },
    {
      "name": "樹才怪",
      "types": [
        "rock"
      ],
      "level": 57
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
      "name": "隆隆岩",
      "types": [
        "rock",
        "ground"
      ],
      "level": 56
    }
  ]
};
assertBattle(eliteBertha);

const eliteFlint = {
  "order": 3,
  "role": "eliteFour",
  "name": "大葉",
  "specialty": "fire",
  "party": [
    {
      "name": "烈焰馬",
      "types": [
        "fire"
      ],
      "level": 58
    },
    {
      "name": "烈焰猴",
      "types": [
        "fire",
        "fighting"
      ],
      "level": 61
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
      "name": "長耳兔",
      "types": [
        "normal"
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
    }
  ]
};
assertBattle(eliteFlint);

const eliteLucian = {
  "order": 4,
  "role": "eliteFour",
  "name": "悟松",
  "specialty": "psychic",
  "party": [
    {
      "name": "魔牆人偶",
      "types": [
        "psychic"
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
  ]
};
assertBattle(eliteLucian);

const championCynthia = {
  "role": "champion",
  "name": "竹蘭",
  "specialty": "dragon",
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
      "name": "烈咬陸鯊",
      "types": [
        "dragon",
        "ground"
      ],
      "level": 66
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
      "name": "美納斯",
      "types": [
        "water"
      ],
      "level": 63
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
      "name": "路卡利歐",
      "types": [
        "fighting",
        "steel"
      ],
      "level": 63
    }
  ]
};
assertBattle(championCynthia);

const league = diamondPearlLeague;
assertLeague(league);

export const diamondPearlGuide = {
  id: 'diamond-pearl',
  title: '寶可夢 鑽石／珍珠',
  displayGeneration: 4,
  status: 'complete',
  notes: "NDS鑽石／珍珠首次主線；梅麗莎是第5館，竹蘭最高Lv.66。通關後戰鬥地區為遊戲內建內容，不是付費DLC。",
  gyms: [
    gymRoark,
    gymGardenia,
    gymMaylene,
    gymWake,
    gymFantina,
    gymByron,
    gymCandice,
    gymVolkner,
  ],
  eliteFour: [eliteAaron, eliteBertha, eliteFlint, eliteLucian],
  champion: championCynthia,
  league,
};
