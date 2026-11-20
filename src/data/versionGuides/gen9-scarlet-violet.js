import { pm, rec, assertBattle, assertLeague } from './helpers.js';
import { scarletVioletLeague } from './gen9-scarlet-violet-league.js';

const gymKaty = {
  "order": 1,
  "role": "gym",
  "name": "阿楓",
  "location": "圓模鎮",
  "badge": "道館徽章",
  "badgeType": "bug",
  "notes": "可自由選擇道館順序，對手等級不隨徽章數調整。先完成橄欖滾球測驗。",
  "party": [
    {
      "name": "豆蟋蟀",
      "types": [
        "bug"
      ],
      "level": 14
    },
    {
      "name": "團珠蛛",
      "types": [
        "bug"
      ],
      "level": 14
    },
    {
      "name": "熊寶寶",
      "types": [
        "normal"
      ],
      "level": 15,
      "teraType": "bug"
    }
  ],
  "recommendedTeams": [
    {
      "label": "可取得的對策候選（依需要選用）",
      "reason": "火／飛行／岩石招可打全場；熊寶寶會太晶成蟲。",
      "pokemon": [
        {
          "name": "小箭雀",
          "types": [
            "normal",
            "flying"
          ],
          "obtain": "南區（第1區）",
          "moveNote": "飛行招對蟲、草有效；Lv.17 進化火箭雀。"
        }
      ]
    }
  ],
  "strategy": {
    "level": "建議接近 Lv.15，依隊伍狀態調整",
    "summary": "火／飛行／岩石招可打全場；熊寶寶會太晶成蟲。",
    "tips": [
      "可自由選擇道館順序，對手等級不隨徽章數調整。先完成橄欖滾球測驗。"
    ]
  }
};
assertBattle(gymKaty);

const gymBrassius = {
  "order": 2,
  "role": "gym",
  "name": "寇沙",
  "location": "深缽鎮",
  "badge": "道館徽章",
  "badgeType": "grass",
  "notes": "測驗需找齊 10 隻向日花怪。御三家只能使用自己開局選到的一隻。",
  "party": [
    {
      "name": "百合根娃娃",
      "types": [
        "grass"
      ],
      "level": 16
    },
    {
      "name": "迷你芙",
      "types": [
        "grass",
        "normal"
      ],
      "level": 16
    },
    {
      "name": "樹才怪",
      "types": [
        "rock"
      ],
      "level": 17,
      "teraType": "grass"
    }
  ],
  "recommendedTeams": [
    {
      "label": "可取得的對策候選（依需要選用）",
      "reason": "樹才怪會太晶成草；用火／飛行招但注意落石。",
      "pokemon": [
        {
          "name": "火箭雀",
          "types": [
            "fire",
            "flying"
          ],
          "obtain": "小箭雀 Lv.17 進化",
          "moveNote": "選用已學會的火／飛行招，注意岩石招。"
        }
      ]
    }
  ],
  "strategy": {
    "level": "建議接近 Lv.17，依隊伍狀態調整",
    "summary": "樹才怪會太晶成草；用火／飛行招但注意落石。",
    "tips": [
      "測驗需找齊 10 隻向日花怪。御三家只能使用自己開局選到的一隻。"
    ]
  }
};
assertBattle(gymBrassius);

const gymIono = {
  "order": 3,
  "role": "gym",
  "name": "奇樹",
  "location": "釀光市",
  "badge": "道館徽章",
  "badgeType": "electric",
  "party": [
    {
      "name": "電海燕",
      "types": [
        "electric",
        "flying"
      ],
      "level": 23
    },
    {
      "name": "電肚蛙",
      "types": [
        "electric"
      ],
      "level": 23
    },
    {
      "name": "勒克貓",
      "types": [
        "electric"
      ],
      "level": 23
    },
    {
      "name": "夢妖魔",
      "types": [
        "ghost"
      ],
      "level": 24,
      "teraType": "electric"
    }
  ],
  "recommendedTeams": [
    {
      "label": "可取得的對策候選（依需要選用）",
      "reason": "地面只處理電肚蛙、勒克貓；夢妖魔太晶電加飄浮，普通地面招無效。",
      "pokemon": [
        {
          "name": "土王",
          "types": [
            "poison",
            "ground"
          ],
          "obtain": "南區烏波（帕底亞）Lv.20 進化",
          "moveNote": "地面招打電；對夢妖魔改一般等倍招。"
        },
        {
          "name": "花葉蒂",
          "types": [
            "fairy"
          ],
          "obtain": "花蓓蓓 Lv.19 進化",
          "moveNote": "妖精招提供等倍攻擊，不依賴地面打夢妖魔。"
        }
      ]
    }
  ],
  "notes": "夢妖魔的充電光束可能提升特攻；土王可免疫電招，但地面招無法命中夢妖魔。海地鼠、三海地鼠都是純水，不能當地面系。",
  "strategy": {
    "level": "建議接近 Lv.24，依隊伍狀態調整",
    "summary": "地面只處理電肚蛙、勒克貓；夢妖魔太晶電加飄浮，普通地面招無效。",
    "tips": [
      "夢妖魔的充電光束可能提升特攻；土王可免疫電招，但地面招無法命中夢妖魔。海地鼠、三海地鼠都是純水，不能當地面系。"
    ]
  }
};
assertBattle(gymIono);

const gymKofu = {
  "order": 4,
  "role": "gym",
  "name": "海岱",
  "location": "玻瓶市",
  "badge": "道館徽章",
  "badgeType": "water",
  "party": [
    {
      "name": "輕身鱈",
      "types": [
        "water",
        "psychic"
      ],
      "level": 29
    },
    {
      "name": "三海地鼠",
      "types": [
        "water"
      ],
      "level": 29
    },
    {
      "name": "好勝毛蟹",
      "types": [
        "fighting",
        "ice"
      ],
      "level": 30,
      "teraType": "water"
    }
  ],
  "recommendedTeams": [
    {
      "label": "可取得的對策候選（依需要選用）",
      "reason": "用草、電招；好勝毛蟹太晶水後也怕這兩種招式。",
      "pokemon": [
        {
          "name": "布土撥",
          "types": [
            "electric",
            "fighting"
          ],
          "obtain": "布撥 Lv.18 進化",
          "moveNote": "電光打水；猛推打一般，注意飛行招。"
        },
        {
          "name": "奧利紐",
          "types": [
            "grass",
            "normal"
          ],
          "obtain": "南區（第2區）迷你芙 Lv.25 進化",
          "moveNote": "草招打水，但需確認血量與等級。"
        }
      ]
    }
  ],
  "notes": "先到漬沁鎮送錢包與完成拍賣測驗，再返回玻瓶市。輕身鱈是水／超能力，三海地鼠純水。",
  "strategy": {
    "level": "建議接近 Lv.30，依隊伍狀態調整",
    "summary": "用草、電招；好勝毛蟹太晶水後也怕這兩種招式。",
    "tips": [
      "先到漬沁鎮送錢包與完成拍賣測驗，再返回玻瓶市。輕身鱈是水／超能力，三海地鼠純水。"
    ]
  }
};
assertBattle(gymKofu);

const gymLarry = {
  "order": 5,
  "role": "gym",
  "name": "青木",
  "location": "錦匯鎮",
  "badge": "道館徽章",
  "badgeType": "normal",
  "notes": "青木道館用一般系；後續四天王是另一支飛行隊。幽靈角色可擋一般招，不能用幽靈招傷害一般系。",
  "party": [
    {
      "name": "樹枕尾熊",
      "types": [
        "normal"
      ],
      "level": 35
    },
    {
      "name": "土龍節節",
      "types": [
        "normal"
      ],
      "level": 35
    },
    {
      "name": "姆克鷹",
      "types": [
        "normal",
        "flying"
      ],
      "level": 36,
      "teraType": "normal"
    }
  ],
  "recommendedTeams": [
    {
      "label": "可取得的對策候選（依需要選用）",
      "reason": "用格鬥招打一般；幽靈攻擊無效，且姆克鷹有燕返。",
      "pokemon": [
        {
          "name": "火爆猴",
          "types": [
            "fighting"
          ],
          "obtain": "猴怪 Lv.28 進化",
          "moveNote": "用格鬥招處理一般系；避開姆克鷹燕返。"
        },
        {
          "name": "布土撥",
          "types": [
            "electric",
            "fighting"
          ],
          "obtain": "布撥 Lv.18 進化",
          "moveNote": "電光打水；猛推打一般，注意飛行招。"
        }
      ]
    }
  ],
  "strategy": {
    "level": "建議接近 Lv.36，依隊伍狀態調整",
    "summary": "用格鬥招打一般；幽靈攻擊無效，且姆克鷹有燕返。",
    "tips": [
      "青木道館用一般系；後續四天王是另一支飛行隊。幽靈角色可擋一般招，不能用幽靈招傷害一般系。"
    ]
  }
};
assertBattle(gymLarry);

const gymRyme = {
  "order": 6,
  "role": "gym",
  "name": "萊姆",
  "location": "驚骨鎮",
  "badge": "道館徽章",
  "badgeType": "ghost",
  "party": [
    {
      "name": "詛咒娃娃",
      "types": [
        "ghost"
      ],
      "level": 41
    },
    {
      "name": "謎擬Ｑ",
      "types": [
        "ghost",
        "fairy"
      ],
      "level": 41
    },
    {
      "name": "墓揚犬",
      "types": [
        "ghost"
      ],
      "level": 41
    },
    {
      "name": "顫弦蠑螈",
      "types": [
        "electric",
        "poison"
      ],
      "level": 42,
      "teraType": "ghost"
    }
  ],
  "recommendedTeams": [
    {
      "label": "可取得的對策候選（依需要選用）",
      "reason": "雙打戰；惡／幽靈處理大部分對手，謎擬Ｑ改鋼／幽靈並先破畫皮。",
      "pokemon": [
        {
          "name": "獒教父",
          "types": [
            "dark"
          ],
          "obtain": "偶叫獒 Lv.30 進化",
          "moveNote": "惡招打鬼／超能，注意妖精招。"
        },
        {
          "name": "巨鍛匠",
          "types": [
            "fairy",
            "steel"
          ],
          "obtain": "小鍛匠 Lv.24、巧鍛匠 Lv.38 進化",
          "moveNote": "鋼招處理謎擬Ｑ；妖精招打龍。"
        }
      ]
    }
  ],
  "notes": "道館測驗及館主皆為雙打。觀眾會依戰況給能力提升；留意顫弦蠑螈的放電與巨聲。",
  "strategy": {
    "level": "建議接近 Lv.42，依隊伍狀態調整",
    "summary": "雙打戰；惡／幽靈處理大部分對手，謎擬Ｑ改鋼／幽靈並先破畫皮。",
    "tips": [
      "道館測驗及館主皆為雙打。觀眾會依戰況給能力提升；留意顫弦蠑螈的放電與巨聲。"
    ]
  }
};
assertBattle(gymRyme);

const gymTulip = {
  "order": 7,
  "role": "gym",
  "name": "莉普",
  "location": "焙固鎮",
  "badge": "道館徽章",
  "badgeType": "psychic",
  "party": [
    {
      "name": "奇麒麟",
      "types": [
        "normal",
        "psychic"
      ],
      "level": 44
    },
    {
      "name": "沙奈朵",
      "types": [
        "psychic",
        "fairy"
      ],
      "level": 44
    },
    {
      "name": "超能豔鴕",
      "types": [
        "psychic"
      ],
      "level": 44
    },
    {
      "name": "花潔夫人",
      "types": [
        "fairy"
      ],
      "level": 45,
      "teraType": "psychic"
    }
  ],
  "recommendedTeams": [
    {
      "label": "可取得的對策候選（依需要選用）",
      "reason": "奇麒麟免疫鬼招，改用惡；沙奈朵與花潔夫人的妖精招威脅惡系。",
      "pokemon": [
        {
          "name": "獒教父",
          "types": [
            "dark"
          ],
          "obtain": "偶叫獒 Lv.30 進化",
          "moveNote": "惡招打鬼／超能，注意妖精招。"
        },
        {
          "name": "墓揚犬",
          "types": [
            "ghost"
          ],
          "obtain": "墓仔狗 Lv.30 以上夜間升級",
          "moveNote": "對超能或幽靈用咬碎／潛靈奇襲；不可用鬼招打一般。"
        }
      ]
    }
  ],
  "notes": "奇麒麟的一般屬性免疫幽靈；沙奈朵受到惡招只有等倍。花潔夫人太晶超能後仍能用月亮之力。",
  "strategy": {
    "level": "建議接近 Lv.45，依隊伍狀態調整",
    "summary": "奇麒麟免疫鬼招，改用惡；沙奈朵與花潔夫人的妖精招威脅惡系。",
    "tips": [
      "奇麒麟的一般屬性免疫幽靈；沙奈朵受到惡招只有等倍。花潔夫人太晶超能後仍能用月亮之力。"
    ]
  }
};
assertBattle(gymTulip);

const gymGrusha = {
  "order": 8,
  "role": "gym",
  "name": "古魯夏",
  "location": "霜抹山",
  "badge": "道館徽章",
  "badgeType": "ice",
  "party": [
    {
      "name": "雪絨蛾",
      "types": [
        "ice",
        "bug"
      ],
      "level": 47
    },
    {
      "name": "凍原熊",
      "types": [
        "ice"
      ],
      "level": 47
    },
    {
      "name": "浩大鯨",
      "types": [
        "ice"
      ],
      "level": 47
    },
    {
      "name": "七夕青鳥",
      "types": [
        "dragon",
        "flying"
      ],
      "level": 48,
      "teraType": "ice"
    }
  ],
  "recommendedTeams": [
    {
      "label": "可取得的對策候選（依需要選用）",
      "reason": "七夕青鳥會太晶冰；火／格鬥／鋼／岩石有效，浩大鯨厚脂肪削弱火招。",
      "pokemon": [
        {
          "name": "烈箭鷹",
          "types": [
            "fire",
            "flying"
          ],
          "obtain": "火箭雀 Lv.35 進化",
          "moveNote": "火招打冰／鋼；凍原熊水流噴射、地震與浩大鯨水招要留意。"
        },
        {
          "name": "巴布土撥",
          "types": [
            "electric",
            "fighting"
          ],
          "obtain": "布土撥在 Let’s Go 模式走 1,000 步後升級",
          "moveNote": "以物理電招與近身戰補攻擊面。"
        }
      ]
    }
  ],
  "notes": "太晶會改變防守屬性；七夕青鳥此戰應按冰系應對，電招不會效果絕佳。",
  "strategy": {
    "level": "建議接近 Lv.48，依隊伍狀態調整",
    "summary": "七夕青鳥會太晶冰；火／格鬥／鋼／岩石有效，浩大鯨厚脂肪削弱火招。",
    "tips": [
      "太晶會改變防守屬性；七夕青鳥此戰應按冰系應對，電招不會效果絕佳。"
    ]
  }
};
assertBattle(gymGrusha);

const eliteRika = {
  "order": 1,
  "role": "eliteFour",
  "name": "辛俐",
  "specialty": "ground",
  "party": [
    {
      "name": "鯰魚王",
      "types": [
        "water",
        "ground"
      ],
      "level": 57
    },
    {
      "name": "噴火駝",
      "types": [
        "fire",
        "ground"
      ],
      "level": 57
    },
    {
      "name": "頓甲",
      "types": [
        "ground"
      ],
      "level": 57
    },
    {
      "name": "三地鼠",
      "types": [
        "ground"
      ],
      "level": 57
    },
    {
      "name": "土王",
      "types": [
        "poison",
        "ground"
      ],
      "level": 58,
      "teraType": "ground"
    }
  ],
  "notes": "土王特性儲水，太晶地面後水招仍完全無效，推薦草／冰；鯰魚王草4倍、噴火駝水4倍。土王是毒地面，不是水地面。"
};
assertBattle(eliteRika);

const elitePoppy = {
  "order": 2,
  "role": "eliteFour",
  "name": "波琵",
  "specialty": "steel",
  "party": [
    {
      "name": "大王銅象",
      "types": [
        "steel"
      ],
      "level": 58
    },
    {
      "name": "自爆磁怪",
      "types": [
        "electric",
        "steel"
      ],
      "level": 58
    },
    {
      "name": "青銅鐘",
      "types": [
        "steel",
        "psychic"
      ],
      "level": 58
    },
    {
      "name": "鋼鎧鴉",
      "types": [
        "flying",
        "steel"
      ],
      "level": 58
    },
    {
      "name": "巨鍛匠",
      "types": [
        "fairy",
        "steel"
      ],
      "level": 59,
      "teraType": "steel"
    }
  ],
  "notes": "青銅鐘飄浮、鋼鎧鴉飛行都免疫一般地面招；火系好用但需留意敵方地面／岩石招。巨鍛匠太晶鋼後火地面格鬥2倍。"
};
assertBattle(elitePoppy);

const eliteLarry = {
  "order": 3,
  "role": "eliteFour",
  "name": "青木",
  "specialty": "flying",
  "party": [
    {
      "name": "熱帶龍",
      "types": [
        "grass",
        "flying"
      ],
      "level": 59
    },
    {
      "name": "花舞鳥（啪滋啪滋風格）",
      "types": [
        "electric",
        "flying"
      ],
      "level": 59
    },
    {
      "name": "七夕青鳥",
      "types": [
        "dragon",
        "flying"
      ],
      "level": 59
    },
    {
      "name": "姆克鷹",
      "types": [
        "normal",
        "flying"
      ],
      "level": 59
    },
    {
      "name": "纏紅鶴",
      "types": [
        "flying",
        "fighting"
      ],
      "level": 60,
      "teraType": "flying"
    }
  ],
  "notes": "熱帶龍和七夕青鳥冰4倍而電等倍；電飛花舞鳥冰／岩石2倍、電等倍；纏紅鶴太晶飛行後電冰岩2倍。"
};
assertBattle(eliteLarry);

const eliteHassel = {
  "order": 4,
  "role": "eliteFour",
  "name": "八朔",
  "specialty": "dragon",
  "party": [
    {
      "name": "音波龍",
      "types": [
        "flying",
        "dragon"
      ],
      "level": 60
    },
    {
      "name": "雙斧戰龍",
      "types": [
        "dragon"
      ],
      "level": 60
    },
    {
      "name": "毒藻龍",
      "types": [
        "poison",
        "dragon"
      ],
      "level": 60
    },
    {
      "name": "蘋裹龍",
      "types": [
        "grass",
        "dragon"
      ],
      "level": 60
    },
    {
      "name": "戟脊龍",
      "types": [
        "dragon",
        "ice"
      ],
      "level": 61,
      "teraType": "dragon"
    }
  ],
  "notes": "朱與紫的八朔隊伍相同。戟脊龍太晶龍後冰／龍／妖精2倍，格鬥鋼等倍；熱交換不怕燒傷且被火招打中加物攻。毒藻龍對妖精只有等倍且有污泥炸彈威脅妖精。"
};
assertBattle(eliteHassel);

const championGeeta = {
  "role": "champion",
  "name": "也慈",
  "specialty": "mixed",
  "party": [
    {
      "name": "超能豔鴕",
      "types": [
        "psychic"
      ],
      "level": 61
    },
    {
      "name": "坐騎山羊",
      "types": [
        "grass"
      ],
      "level": 61
    },
    {
      "name": "輕身鱈",
      "types": [
        "water",
        "psychic"
      ],
      "level": 61
    },
    {
      "name": "冰岩怪",
      "types": [
        "ice"
      ],
      "level": 61
    },
    {
      "name": "仆斬將軍",
      "types": [
        "dark",
        "steel"
      ],
      "level": 61
    },
    {
      "name": "晶光花",
      "types": [
        "rock",
        "poison"
      ],
      "level": 62,
      "teraType": "rock"
    }
  ],
  "notes": "也慈使用多種屬性的隊伍。冰岩怪是一般形態純冰，輕身鱈水／超能；最後晶光花太晶岩石，水草格鬥地面鋼2倍。仆斬將軍格鬥4倍，火地面2倍。超能豔鴕可跟上對手能力提升，別無腦強化。"
};
assertBattle(championGeeta);

const league = scarletVioletLeague;
assertLeague(league);

export const scarletVioletGuide = {
  id: 'scarlet-violet',
  title: '寶可夢 朱／紫',
  displayGeneration: 9,
  status: 'complete',
  notes: '道館依等級提供建議順序，敵人等級不會隨進度調整。八枚徽章後通過冠軍測驗、擊敗也慈，再與妮莫完成最終戰才結束勝利之路。本篇結局還需完成傳說之路、星塵之路與第零區劇情。',
  gymSequenceMode: 'suggested',
  gyms: [
    gymKaty,
    gymBrassius,
    gymIono,
    gymKofu,
    gymLarry,
    gymRyme,
    gymTulip,
    gymGrusha,
  ],
  eliteFour: [eliteRika, elitePoppy, eliteLarry, eliteHassel],
  champion: championGeeta,
  league,
};
