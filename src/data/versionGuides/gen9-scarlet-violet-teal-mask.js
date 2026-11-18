import { assertBattle } from './helpers.js';

/** 流程與等級來源見 sources；對策為依可取得隊員整理的建議。 */
export const tealMaskExpansion = {
  "id": "teal-mask",
  "title": "碧之假面",
  "tabLabel": "碧之假面",
  "battleSectionTitle": "北上鄉故事與赫月調查",
  "prerequisites": [
    {
      "title": "進入條件與等級",
      "rows": [
        {
          "label": "入口",
          "value": "持有對應朱／紫的「零之秘寶」擴充內容並更新；本篇尋寶開始後接吉尼亞電話，到學院與白蕾雅會合，前往北上鄉。"
        },
        {
          "label": "等級分界",
          "value": "本篇回家之路結局前／後有兩套劇情隊伍；三寶伴寶主為Lv35／85，厄鬼椪為Lv20／70。赫月任務與通關後三寶伴捕捉固定Lv70。"
        },
        {
          "label": "準備",
          "value": "先開翠綠鎮與沿線飛翔點；帶解毒、回復與多屬性打手。本篇進度不足不影響修學旅行入口，但別把固定高等級支線當作新手任務。"
        }
      ]
    }
  ],
  "sections": [
    {
      "type": "island",
      "title": "修學旅行：翠綠鎮與三塊看板",
      "number": 1,
      "intro": "到翠綠鎮入口迎戰丹瑜，入住公民館；隔天與烏栗搭檔，先完成第一次切磋。",
      "flows": [
        "依任務標記前往寶伴廣場看板並合照，跟烏栗探訪鬼山恐洞，再繼續北上六選池等看板調查；遇到烏栗挑戰時先補血。",
        "完成指定觀光與合照後回翠綠鎮，跟隨邀請換上慶典服，前往北上中心參加面具慶典。"
      ],
      "tips": []
    },
    {
      "type": "island",
      "title": "面具慶典、真相與修復",
      "number": 2,
      "intro": "與丹瑜戰鬥並體驗打鬼祭；慶典中遇見落單的厄鬼椪，拾起其碧草面具。",
      "flows": [
        "跟丹瑜回家聽祖父說明真相；按任務推進與烏栗的第三次對戰，再陪丹瑜登鬼山天池取結晶碎片。",
        "天池美納斯為合作首領戰，使用電／草招並照顧隊伍血量。帶碎片回家後發現烏栗拿走面具。",
        "追到寶伴廣場擊敗烏栗拿回面具；三寶伴甦醒，趕往北上中心確認其取得其他面具。"
      ],
      "tips": []
    },
    {
      "type": "island",
      "title": "奪回三副面具",
      "number": 3,
      "intro": "先探訪恐洞的厄鬼椪，依劇情與丹瑜合作追查；在翠綠鎮詢問村民得知三寶伴去向。",
      "flows": [
        "夠讚狗在樂土荒地，願增猿在藤花池，吉雉雞在鬼山斷崖一帶；吉雉雞會先逃進洞穴，沿通道追上。",
        "三場巨大化戰鬥只需打倒，不可當場捕捉；收回礎石、水井、火灶面具。毒鎖鏈可能附帶劇毒，每場前重新整備。",
        "帶厄鬼椪回村讓居民了解真相，再前往恐洞進入最終選擇。"
      ],
      "tips": []
    },
    {
      "type": "island",
      "title": "恐洞結局與丹瑜告別",
      "number": 4,
      "intro": "恐洞先與烏栗進行六隻完整隊伍決戰，建議以其最高等級為準，不被厄鬼椪低等級版Lv20誤導。",
      "flows": [
        "再進行厄鬼椪四面具連戰；各階段依太晶屬性應對，打完四階段才進捕捉選球畫面。",
        "隔天把厄鬼椪放入隊伍，再去寶伴廣場找丹瑜進行最後切磋，完成修學旅行收尾；之後可回帕底亞或繼續北上探索。",
        "三寶伴可回各自寶主所在地捕捉，固定Lv70；它們不必全部捕捉才算碧之假面主線完成。"
      ],
      "tips": []
    },
    {
      "type": "island",
      "title": "沙儷支線：尋找赫月熊",
      "number": 5,
      "intro": "北上圖鑑捕獲登錄150種後去翠綠鎮找沙儷，先打貓頭夜鷹與葉伊布測試戰。",
      "flows": [
        "前往永久森林與沙儷會合，依對話等待霧夜；蹲下慢移動、留意樹上與水邊，拍攝10種指定範圍內寶可夢。",
        "追蹤到赫月月月熊後用水／草／格鬥招打倒首領；心眼會無視一般招對幽靈的免疫。",
        "捕捉固定Lv70赫月月月熊後回翠綠鎮找沙儷，領取Lv15洗翠卡蒂狗。此形態不是用泥炭塊進化出來。"
      ],
      "tips": []
    },
    {
      "type": "island",
      "title": "北上後續收集與藍之圓盤銜接",
      "number": 6,
      "intro": "打鬼祭由低難度熟悉運球與防守，再挑戰更高難度；獎勵麻糬可協助培養能力。",
      "flows": [
        "探索北上鬼面眾、完成圖鑑、尋找新增進化道具；持對應道具才進化新種類，不由劇情自動送齊。",
        "藍之圓盤後續故事需本篇回家之路與碧之假面完成；赫月支線另與藍莓學園沙儷的悖謬調查銜接。"
      ],
      "tips": []
    }
  ],
  "gyms": [
    {
      "order": 1,
      "role": "trainer",
      "name": "丹瑜：抵達翠綠鎮",
      "location": "翠綠鎮入口",
      "party": [
        {
          "name": "土狼犬",
          "types": [
            "dark"
          ],
          "level": 12
        },
        {
          "name": "六尾",
          "types": [
            "fire"
          ],
          "level": 12
        },
        {
          "name": "斯魔茶",
          "types": [
            "grass",
            "ghost"
          ],
          "level": 13
        }
      ],
      "notes": "等級及部分進化形態隨本篇結局是否完成而變；兩種隊伍見分支。不是按目前隊伍平均等級縮放。",
      "recommendedTeams": [
        {
          "label": "可取得的對策候選（依需要選用）",
          "reason": "先用水系打六尾、蟲／格鬥打土狼犬；斯魔茶草／幽靈，要避開一般與格鬥攻擊。",
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
        "summary": "先用水系打六尾、蟲／格鬥打土狼犬；斯魔茶草／幽靈，要避開一般與格鬥攻擊。",
        "tips": [
          "等級及部分進化形態隨本篇結局是否完成而變；兩種隊伍見分支。不是按目前隊伍平均等級縮放。"
        ]
      },
      "variants": [
        {
          "label": "本篇「回家之路」未完成",
          "party": [
            {
              "name": "土狼犬",
              "types": [
                "dark"
              ],
              "level": 12
            },
            {
              "name": "六尾",
              "types": [
                "fire"
              ],
              "level": 12
            },
            {
              "name": "斯魔茶",
              "types": [
                "grass",
                "ghost"
              ],
              "level": 13
            }
          ]
        },
        {
          "label": "本篇「回家之路」完成",
          "party": [
            {
              "name": "土狼犬",
              "types": [
                "dark"
              ],
              "level": 60
            },
            {
              "name": "六尾",
              "types": [
                "fire"
              ],
              "level": 60
            },
            {
              "name": "斯魔茶",
              "types": [
                "grass",
                "ghost"
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
      "name": "烏栗：初次切磋",
      "location": "翠綠鎮",
      "party": [
        {
          "name": "尾立",
          "types": [
            "normal"
          ],
          "level": 12
        },
        {
          "name": "蜻蜻蜓",
          "types": [
            "bug",
            "flying"
          ],
          "level": 12
        }
      ],
      "notes": "等級及部分進化形態隨本篇結局是否完成而變；兩種隊伍見分支。不是按目前隊伍平均等級縮放。",
      "recommendedTeams": [
        {
          "label": "可取得的對策候選（依需要選用）",
          "reason": "尾立用格鬥，蜻蜻蜓用電／火／岩石；高等級版仍是尾立與蜻蜻蜓，不要自行改成進化型。",
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
        "summary": "尾立用格鬥，蜻蜻蜓用電／火／岩石；高等級版仍是尾立與蜻蜻蜓，不要自行改成進化型。",
        "tips": [
          "等級及部分進化形態隨本篇結局是否完成而變；兩種隊伍見分支。不是按目前隊伍平均等級縮放。"
        ]
      },
      "variants": [
        {
          "label": "本篇「回家之路」未完成",
          "party": [
            {
              "name": "尾立",
              "types": [
                "normal"
              ],
              "level": 12
            },
            {
              "name": "蜻蜻蜓",
              "types": [
                "bug",
                "flying"
              ],
              "level": 12
            }
          ]
        },
        {
          "label": "本篇「回家之路」完成",
          "party": [
            {
              "name": "尾立",
              "types": [
                "normal"
              ],
              "level": 59
            },
            {
              "name": "蜻蜻蜓",
              "types": [
                "bug",
                "flying"
              ],
              "level": 60
            }
          ]
        }
      ]
    },
    {
      "order": 3,
      "role": "trainer",
      "name": "烏栗：恐洞前",
      "location": "恐洞",
      "party": [
        {
          "name": "蚊香蝌蚪",
          "types": [
            "water"
          ],
          "level": 15
        },
        {
          "name": "蜻蜻蜓",
          "types": [
            "bug",
            "flying"
          ],
          "level": 16
        },
        {
          "name": "大尾立",
          "types": [
            "normal"
          ],
          "level": 16
        }
      ],
      "notes": "等級及部分進化形態隨本篇結局是否完成而變；兩種隊伍見分支。不是按目前隊伍平均等級縮放。",
      "recommendedTeams": [
        {
          "label": "可取得的對策候選（依需要選用）",
          "reason": "蜻蜻蜓怕岩石；蚊香蝌蚪／蚊香君用電，留意蓄水不能用水招。",
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
        "summary": "蜻蜻蜓怕岩石；蚊香蝌蚪／蚊香君用電，留意蓄水不能用水招。",
        "tips": [
          "等級及部分進化形態隨本篇結局是否完成而變；兩種隊伍見分支。不是按目前隊伍平均等級縮放。"
        ]
      },
      "variants": [
        {
          "label": "本篇「回家之路」未完成",
          "party": [
            {
              "name": "蚊香蝌蚪",
              "types": [
                "water"
              ],
              "level": 15
            },
            {
              "name": "蜻蜻蜓",
              "types": [
                "bug",
                "flying"
              ],
              "level": 16
            },
            {
              "name": "大尾立",
              "types": [
                "normal"
              ],
              "level": 16
            }
          ]
        },
        {
          "label": "本篇「回家之路」完成",
          "party": [
            {
              "name": "大尾立",
              "types": [
                "normal"
              ],
              "level": 62
            },
            {
              "name": "蜻蜻蜓",
              "types": [
                "bug",
                "flying"
              ],
              "level": 62
            },
            {
              "name": "蚊香君",
              "types": [
                "water"
              ],
              "level": 66
            }
          ]
        }
      ]
    },
    {
      "order": 4,
      "role": "trainer",
      "name": "丹瑜：面具慶典",
      "location": "北上中心",
      "party": [
        {
          "name": "莫魯貝可",
          "types": [
            "electric",
            "dark"
          ],
          "level": 16
        },
        {
          "name": "寶包繭",
          "types": [
            "bug",
            "grass"
          ],
          "level": 16
        },
        {
          "name": "大狼犬",
          "types": [
            "dark"
          ],
          "level": 18
        },
        {
          "name": "斯魔茶",
          "types": [
            "grass",
            "ghost"
          ],
          "level": 19
        }
      ],
      "notes": "等級及部分進化形態隨本篇結局是否完成而變；兩種隊伍見分支。不是按目前隊伍平均等級縮放。",
      "recommendedTeams": [
        {
          "label": "可取得的對策候選（依需要選用）",
          "reason": "地面打莫魯貝可，火打寶包繭，妖精打大狼犬；茶系怕火／幽靈／惡，但來悲粗茶有抗火樹果。",
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
        "summary": "地面打莫魯貝可，火打寶包繭，妖精打大狼犬；茶系怕火／幽靈／惡，但來悲粗茶有抗火樹果。",
        "tips": [
          "等級及部分進化形態隨本篇結局是否完成而變；兩種隊伍見分支。不是按目前隊伍平均等級縮放。"
        ]
      },
      "variants": [
        {
          "label": "本篇「回家之路」未完成",
          "party": [
            {
              "name": "莫魯貝可",
              "types": [
                "electric",
                "dark"
              ],
              "level": 16
            },
            {
              "name": "寶包繭",
              "types": [
                "bug",
                "grass"
              ],
              "level": 16
            },
            {
              "name": "大狼犬",
              "types": [
                "dark"
              ],
              "level": 18
            },
            {
              "name": "斯魔茶",
              "types": [
                "grass",
                "ghost"
              ],
              "level": 19
            }
          ]
        },
        {
          "label": "本篇「回家之路」完成",
          "party": [
            {
              "name": "莫魯貝可",
              "types": [
                "electric",
                "dark"
              ],
              "level": 62
            },
            {
              "name": "寶包繭",
              "types": [
                "bug",
                "grass"
              ],
              "level": 63
            },
            {
              "name": "大狼犬",
              "types": [
                "dark"
              ],
              "level": 63
            },
            {
              "name": "來悲粗茶",
              "types": [
                "grass",
                "ghost"
              ],
              "level": 64
            }
          ]
        }
      ]
    },
    {
      "order": 5,
      "role": "trainer",
      "name": "烏栗：第三次對戰",
      "location": "樂土荒地",
      "party": [
        {
          "name": "蜻蜻蜓",
          "types": [
            "bug",
            "flying"
          ],
          "level": 22
        },
        {
          "name": "蚊香君",
          "types": [
            "water"
          ],
          "level": 22
        },
        {
          "name": "大尾立",
          "types": [
            "normal"
          ],
          "level": 23
        },
        {
          "name": "裹蜜蟲",
          "types": [
            "grass",
            "dragon"
          ],
          "level": 25
        }
      ],
      "notes": "等級及部分進化形態隨本篇結局是否完成而變；兩種隊伍見分支。不是按目前隊伍平均等級縮放。",
      "recommendedTeams": [
        {
          "label": "可取得的對策候選（依需要選用）",
          "reason": "裹蜜蟲草／龍四倍弱冰；蚊香泳士可用飛行／妖精，蜻蜻蜓可用岩石。",
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
        "summary": "裹蜜蟲草／龍四倍弱冰；蚊香泳士可用飛行／妖精，蜻蜻蜓可用岩石。",
        "tips": [
          "等級及部分進化形態隨本篇結局是否完成而變；兩種隊伍見分支。不是按目前隊伍平均等級縮放。"
        ]
      },
      "variants": [
        {
          "label": "本篇「回家之路」未完成",
          "party": [
            {
              "name": "蜻蜻蜓",
              "types": [
                "bug",
                "flying"
              ],
              "level": 22
            },
            {
              "name": "蚊香君",
              "types": [
                "water"
              ],
              "level": 22
            },
            {
              "name": "大尾立",
              "types": [
                "normal"
              ],
              "level": 23
            },
            {
              "name": "裹蜜蟲",
              "types": [
                "grass",
                "dragon"
              ],
              "level": 25
            }
          ]
        },
        {
          "label": "本篇「回家之路」完成",
          "party": [
            {
              "name": "蜻蜻蜓",
              "types": [
                "bug",
                "flying"
              ],
              "level": 64
            },
            {
              "name": "大尾立",
              "types": [
                "normal"
              ],
              "level": 64
            },
            {
              "name": "蚊香泳士",
              "types": [
                "water",
                "fighting"
              ],
              "level": 66
            },
            {
              "name": "裹蜜蟲",
              "types": [
                "grass",
                "dragon"
              ],
              "level": 67
            }
          ]
        }
      ]
    },
    {
      "order": 6,
      "role": "wild",
      "name": "天池：美納斯",
      "location": "鬼山天池",
      "party": [
        {
          "name": "美納斯",
          "types": [
            "water"
          ],
          "level": 30
        }
      ],
      "notes": "取修復面具的結晶碎片時，與丹瑜合作迎戰；本篇結局前Lv30、結局後Lv73。不能捕捉，打倒後取得結晶碎片。",
      "recommendedTeams": [
        {
          "label": "可取得的對策候選（依需要選用）",
          "reason": "使用電或草招；不要以火、岩石、地面隊員承受水系招式，降雨後尤其注意水招傷害。",
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
              "name": "蘑蘑菇",
              "types": [
                "grass"
              ],
              "obtain": "北上鄉或帕底亞南區捕捉後培養",
              "moveNote": "使用自身升級草招；避免只用狀態招讓神奇鱗片強化防禦。"
            }
          ]
        }
      ],
      "strategy": {
        "level": "依下方版本／進度隊伍的最高等級準備；捕捉戰另帶削血與異常狀態手段。",
        "summary": "使用電或草招；不要以火、岩石、地面隊員承受水系招式，降雨後尤其注意水招傷害。",
        "tips": [
          "取修復面具的結晶碎片時，與丹瑜合作迎戰；本篇結局前Lv30、結局後Lv73。不能捕捉，打倒後取得結晶碎片。"
        ]
      },
      "variants": [
        {
          "label": "本篇結局前",
          "party": [
            {
              "name": "美納斯",
              "types": [
                "water"
              ],
              "level": 30
            }
          ]
        },
        {
          "label": "本篇結局後",
          "party": [
            {
              "name": "美納斯",
              "types": [
                "water"
              ],
              "level": 73
            }
          ]
        }
      ]
    },
    {
      "order": 7,
      "role": "trainer",
      "name": "烏栗：奪回碧草面具",
      "location": "寶伴廣場",
      "party": [
        {
          "name": "蜻蜻蜓",
          "types": [
            "bug",
            "flying"
          ],
          "level": 26
        },
        {
          "name": "天蠍",
          "types": [
            "ground",
            "flying"
          ],
          "level": 25
        },
        {
          "name": "古月鳥",
          "types": [
            "flying",
            "water"
          ],
          "level": 25
        },
        {
          "name": "裹蜜蟲",
          "types": [
            "grass",
            "dragon"
          ],
          "level": 26
        },
        {
          "name": "蚊香君",
          "types": [
            "water"
          ],
          "level": 28
        }
      ],
      "notes": "等級及部分進化形態隨本篇結局是否完成而變；兩種隊伍見分支。不是按目前隊伍平均等級縮放。",
      "recommendedTeams": [
        {
          "label": "可取得的對策候選（依需要選用）",
          "reason": "天蠍免疫電、四倍弱冰；古月鳥四倍弱電。不同目標換不同對策，別只帶一招掃全隊。",
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
        "summary": "天蠍免疫電、四倍弱冰；古月鳥四倍弱電。不同目標換不同對策，別只帶一招掃全隊。",
        "tips": [
          "等級及部分進化形態隨本篇結局是否完成而變；兩種隊伍見分支。不是按目前隊伍平均等級縮放。"
        ]
      },
      "variants": [
        {
          "label": "本篇「回家之路」未完成",
          "party": [
            {
              "name": "蜻蜻蜓",
              "types": [
                "bug",
                "flying"
              ],
              "level": 26
            },
            {
              "name": "天蠍",
              "types": [
                "ground",
                "flying"
              ],
              "level": 25
            },
            {
              "name": "古月鳥",
              "types": [
                "flying",
                "water"
              ],
              "level": 25
            },
            {
              "name": "裹蜜蟲",
              "types": [
                "grass",
                "dragon"
              ],
              "level": 26
            },
            {
              "name": "蚊香君",
              "types": [
                "water"
              ],
              "level": 28
            }
          ]
        },
        {
          "label": "本篇「回家之路」完成",
          "party": [
            {
              "name": "遠古巨蜓",
              "types": [
                "bug",
                "flying"
              ],
              "level": 68
            },
            {
              "name": "天蠍",
              "types": [
                "ground",
                "flying"
              ],
              "level": 66
            },
            {
              "name": "古月鳥",
              "types": [
                "flying",
                "water"
              ],
              "level": 65
            },
            {
              "name": "裹蜜蟲",
              "types": [
                "grass",
                "dragon"
              ],
              "level": 69
            },
            {
              "name": "蚊香泳士",
              "types": [
                "water",
                "fighting"
              ],
              "level": 71
            }
          ]
        }
      ]
    },
    {
      "order": 8,
      "role": "wild",
      "name": "奪回面具：夠讚狗",
      "location": "樂土荒地",
      "party": [
        {
          "name": "夠讚狗",
          "types": [
            "poison",
            "fighting"
          ],
          "level": 35
        }
      ],
      "notes": "與丹瑜合作的劇情寶主戰，不能在此捕捉；Lv35／85是此戰等級，通關後可捕捉個體另為固定Lv70。",
      "recommendedTeams": [
        {
          "label": "可取得的對策候選（依需要選用）",
          "reason": "超能四倍有效；避免惡系直接承受近身戰。 三者毒鎖鏈可能使我方劇毒，備解毒／萬靈藥；不讓持續毒傷拖垮隊伍。",
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
              "name": "沙奈朵",
              "types": [
                "psychic",
                "fairy"
              ],
              "obtain": "拉魯拉絲Lv20奇魯莉安、Lv30沙奈朵",
              "moveNote": "升級超能招對毒系，但自身怕毒，宜在安全時上場。"
            }
          ]
        }
      ],
      "strategy": {
        "level": "依下方版本／進度隊伍的最高等級準備；捕捉戰另帶削血與異常狀態手段。",
        "summary": "超能四倍有效；避免惡系直接承受近身戰。 三者毒鎖鏈可能使我方劇毒，備解毒／萬靈藥；不讓持續毒傷拖垮隊伍。",
        "tips": [
          "與丹瑜合作的劇情寶主戰，不能在此捕捉；Lv35／85是此戰等級，通關後可捕捉個體另為固定Lv70。"
        ]
      },
      "variants": [
        {
          "label": "本篇結局前寶主",
          "party": [
            {
              "name": "夠讚狗",
              "types": [
                "poison",
                "fighting"
              ],
              "level": 35
            }
          ]
        },
        {
          "label": "本篇結局後寶主",
          "party": [
            {
              "name": "夠讚狗",
              "types": [
                "poison",
                "fighting"
              ],
              "level": 85
            }
          ]
        }
      ]
    },
    {
      "order": 9,
      "role": "wild",
      "name": "奪回面具：願增猿",
      "location": "藤花池",
      "party": [
        {
          "name": "願增猿",
          "types": [
            "poison",
            "psychic"
          ],
          "level": 35
        }
      ],
      "notes": "與丹瑜合作的劇情寶主戰，不能在此捕捉；Lv35／85是此戰等級，通關後可捕捉個體另為固定Lv70。",
      "recommendedTeams": [
        {
          "label": "可取得的對策候選（依需要選用）",
          "reason": "地面／幽靈／惡有效；注意詭計後的特殊傷害。 三者毒鎖鏈可能使我方劇毒，備解毒／萬靈藥；不讓持續毒傷拖垮隊伍。",
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
              "name": "沙奈朵",
              "types": [
                "psychic",
                "fairy"
              ],
              "obtain": "拉魯拉絲Lv20奇魯莉安、Lv30沙奈朵",
              "moveNote": "升級超能招對毒系，但自身怕毒，宜在安全時上場。"
            }
          ]
        }
      ],
      "strategy": {
        "level": "依下方版本／進度隊伍的最高等級準備；捕捉戰另帶削血與異常狀態手段。",
        "summary": "地面／幽靈／惡有效；注意詭計後的特殊傷害。 三者毒鎖鏈可能使我方劇毒，備解毒／萬靈藥；不讓持續毒傷拖垮隊伍。",
        "tips": [
          "與丹瑜合作的劇情寶主戰，不能在此捕捉；Lv35／85是此戰等級，通關後可捕捉個體另為固定Lv70。"
        ]
      },
      "variants": [
        {
          "label": "本篇結局前寶主",
          "party": [
            {
              "name": "願增猿",
              "types": [
                "poison",
                "psychic"
              ],
              "level": 35
            }
          ]
        },
        {
          "label": "本篇結局後寶主",
          "party": [
            {
              "name": "願增猿",
              "types": [
                "poison",
                "psychic"
              ],
              "level": 85
            }
          ]
        }
      ]
    },
    {
      "order": 10,
      "role": "wild",
      "name": "奪回面具：吉雉雞",
      "location": "鬼山斷崖附近",
      "party": [
        {
          "name": "吉雉雞",
          "types": [
            "poison",
            "fairy"
          ],
          "level": 35
        }
      ],
      "notes": "與丹瑜合作的劇情寶主戰，不能在此捕捉；Lv35／85是此戰等級，通關後可捕捉個體另為固定Lv70。",
      "recommendedTeams": [
        {
          "label": "可取得的對策候選（依需要選用）",
          "reason": "地面／鋼／超能有效；先追過山洞再開始寶主戰。 三者毒鎖鏈可能使我方劇毒，備解毒／萬靈藥；不讓持續毒傷拖垮隊伍。",
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
              "name": "沙奈朵",
              "types": [
                "psychic",
                "fairy"
              ],
              "obtain": "拉魯拉絲Lv20奇魯莉安、Lv30沙奈朵",
              "moveNote": "升級超能招對毒系，但自身怕毒，宜在安全時上場。"
            }
          ]
        }
      ],
      "strategy": {
        "level": "依下方版本／進度隊伍的最高等級準備；捕捉戰另帶削血與異常狀態手段。",
        "summary": "地面／鋼／超能有效；先追過山洞再開始寶主戰。 三者毒鎖鏈可能使我方劇毒，備解毒／萬靈藥；不讓持續毒傷拖垮隊伍。",
        "tips": [
          "與丹瑜合作的劇情寶主戰，不能在此捕捉；Lv35／85是此戰等級，通關後可捕捉個體另為固定Lv70。"
        ]
      },
      "variants": [
        {
          "label": "本篇結局前寶主",
          "party": [
            {
              "name": "吉雉雞",
              "types": [
                "poison",
                "fairy"
              ],
              "level": 35
            }
          ]
        },
        {
          "label": "本篇結局後寶主",
          "party": [
            {
              "name": "吉雉雞",
              "types": [
                "poison",
                "fairy"
              ],
              "level": 85
            }
          ]
        }
      ]
    },
    {
      "order": 11,
      "role": "trainer",
      "name": "烏栗：厄鬼椪的選擇",
      "location": "恐洞",
      "party": [
        {
          "name": "狡猾天狗",
          "types": [
            "grass",
            "dark"
          ],
          "level": 33
        },
        {
          "name": "遠古巨蜓",
          "types": [
            "bug",
            "flying"
          ],
          "level": 37
        },
        {
          "name": "裹蜜蟲",
          "types": [
            "grass",
            "dragon"
          ],
          "level": 36
        },
        {
          "name": "大朝北鼻",
          "types": [
            "rock",
            "steel"
          ],
          "level": 33
        },
        {
          "name": "蚊香泳士",
          "types": [
            "water",
            "fighting"
          ],
          "level": 38
        },
        {
          "name": "天蠍王",
          "types": [
            "ground",
            "flying"
          ],
          "level": 37
        }
      ],
      "notes": "等級及部分進化形態隨本篇結局是否完成而變；兩種隊伍見分支。不是按目前隊伍平均等級縮放。",
      "recommendedTeams": [
        {
          "label": "可取得的對策候選（依需要選用）",
          "reason": "狡猾天狗用蟲／火、遠古巨蜓用岩石、大朝北鼻用格鬥／地面。裹蜜蟲與天蠍王用冰，但天蠍王持抗冰樹果。蚊香泳士若腹鼓成功，立即優先處理。",
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
        "summary": "狡猾天狗用蟲／火、遠古巨蜓用岩石、大朝北鼻用格鬥／地面。裹蜜蟲與天蠍王用冰，但天蠍王持抗冰樹果。蚊香泳士若腹鼓成功，立即優先處理。",
        "tips": [
          "等級及部分進化形態隨本篇結局是否完成而變；兩種隊伍見分支。不是按目前隊伍平均等級縮放。"
        ]
      },
      "variants": [
        {
          "label": "本篇「回家之路」未完成",
          "party": [
            {
              "name": "狡猾天狗",
              "types": [
                "grass",
                "dark"
              ],
              "level": 33
            },
            {
              "name": "遠古巨蜓",
              "types": [
                "bug",
                "flying"
              ],
              "level": 37
            },
            {
              "name": "裹蜜蟲",
              "types": [
                "grass",
                "dragon"
              ],
              "level": 36
            },
            {
              "name": "大朝北鼻",
              "types": [
                "rock",
                "steel"
              ],
              "level": 33
            },
            {
              "name": "蚊香泳士",
              "types": [
                "water",
                "fighting"
              ],
              "level": 38
            },
            {
              "name": "天蠍王",
              "types": [
                "ground",
                "flying"
              ],
              "level": 37
            }
          ]
        },
        {
          "label": "本篇「回家之路」完成",
          "party": [
            {
              "name": "狡猾天狗",
              "types": [
                "grass",
                "dark"
              ],
              "level": 71
            },
            {
              "name": "遠古巨蜓",
              "types": [
                "bug",
                "flying"
              ],
              "level": 72
            },
            {
              "name": "裹蜜蟲",
              "types": [
                "grass",
                "dragon"
              ],
              "level": 72
            },
            {
              "name": "大朝北鼻",
              "types": [
                "rock",
                "steel"
              ],
              "level": 71
            },
            {
              "name": "蚊香泳士",
              "types": [
                "water",
                "fighting"
              ],
              "level": 72
            },
            {
              "name": "天蠍王",
              "types": [
                "ground",
                "flying"
              ],
              "level": 76
            }
          ]
        }
      ]
    },
    {
      "order": 12,
      "role": "legendary",
      "name": "厄鬼椪：四面具連戰",
      "location": "恐洞",
      "party": [
        {
          "name": "厄鬼椪（火灶面具）",
          "types": [
            "grass",
            "fire"
          ],
          "level": 20,
          "teraType": "fire"
        },
        {
          "name": "厄鬼椪（水井面具）",
          "types": [
            "grass",
            "water"
          ],
          "level": 20,
          "teraType": "water"
        },
        {
          "name": "厄鬼椪（礎石面具）",
          "types": [
            "grass",
            "rock"
          ],
          "level": 20,
          "teraType": "rock"
        },
        {
          "name": "厄鬼椪（碧草面具）",
          "types": [
            "grass"
          ],
          "level": 20,
          "teraType": "grass"
        }
      ],
      "notes": "先打贏烏栗最終戰，厄鬼椪依火灶→水井→礎石→碧草順序連續換面具；打完才可捕捉，劇情捕捉必定成功。",
      "recommendedTeams": [
        {
          "label": "可取得的對策候選（依需要選用）",
          "reason": "依當前太晶屬性換招：岩石用水／地面／格鬥，水用電／草，火用水／地面，草用火／飛行。四個階段不能只看原始草系；低等級路線也先準備足夠回復。",
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
            }
          ]
        }
      ],
      "strategy": {
        "level": "依下方版本／進度隊伍的最高等級準備；捕捉戰另帶削血與異常狀態手段。",
        "summary": "依當前太晶屬性換招：岩石用水／地面／格鬥，水用電／草，火用水／地面，草用火／飛行。四個階段不能只看原始草系；低等級路線也先準備足夠回復。",
        "tips": [
          "先打贏烏栗最終戰，厄鬼椪依火灶→水井→礎石→碧草順序連續換面具；打完才可捕捉，劇情捕捉必定成功。"
        ]
      },
      "variants": [
        {
          "label": "本篇結局前／四連戰",
          "party": [
            {
              "name": "厄鬼椪（火灶面具）",
              "types": [
                "grass",
                "fire"
              ],
              "level": 20,
              "teraType": "fire"
            },
            {
              "name": "厄鬼椪（水井面具）",
              "types": [
                "grass",
                "water"
              ],
              "level": 20,
              "teraType": "water"
            },
            {
              "name": "厄鬼椪（礎石面具）",
              "types": [
                "grass",
                "rock"
              ],
              "level": 20,
              "teraType": "rock"
            },
            {
              "name": "厄鬼椪（碧草面具）",
              "types": [
                "grass"
              ],
              "level": 20,
              "teraType": "grass"
            }
          ]
        },
        {
          "label": "本篇結局後／四連戰",
          "party": [
            {
              "name": "厄鬼椪（火灶面具）",
              "types": [
                "grass",
                "fire"
              ],
              "level": 70,
              "teraType": "fire"
            },
            {
              "name": "厄鬼椪（水井面具）",
              "types": [
                "grass",
                "water"
              ],
              "level": 70,
              "teraType": "water"
            },
            {
              "name": "厄鬼椪（礎石面具）",
              "types": [
                "grass",
                "rock"
              ],
              "level": 70,
              "teraType": "rock"
            },
            {
              "name": "厄鬼椪（碧草面具）",
              "types": [
                "grass"
              ],
              "level": 70,
              "teraType": "grass"
            }
          ]
        }
      ]
    },
    {
      "order": 13,
      "role": "trainer",
      "name": "丹瑜：旅程最後切磋",
      "location": "寶伴廣場",
      "party": [
        {
          "name": "大狼犬",
          "types": [
            "dark"
          ],
          "level": 33
        },
        {
          "name": "莫魯貝可",
          "types": [
            "electric",
            "dark"
          ],
          "level": 33
        },
        {
          "name": "保母蟲",
          "types": [
            "bug",
            "grass"
          ],
          "level": 34
        },
        {
          "name": "九尾",
          "types": [
            "fire"
          ],
          "level": 34
        },
        {
          "name": "來悲粗茶",
          "types": [
            "grass",
            "ghost"
          ],
          "level": 35
        }
      ],
      "notes": "等級及部分進化形態隨本篇結局是否完成而變；兩種隊伍見分支。不是按目前隊伍平均等級縮放。 挑戰前須把厄鬼椪放在隊伍。",
      "recommendedTeams": [
        {
          "label": "可取得的對策候選（依需要選用）",
          "reason": "九尾引火免疫火，改用水／地面；保母蟲四倍弱火／飛行；來悲粗茶以惡／幽靈處理，別用一般與格鬥。",
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
        "summary": "九尾引火免疫火，改用水／地面；保母蟲四倍弱火／飛行；來悲粗茶以惡／幽靈處理，別用一般與格鬥。",
        "tips": [
          "等級及部分進化形態隨本篇結局是否完成而變；兩種隊伍見分支。不是按目前隊伍平均等級縮放。",
          "挑戰前須把厄鬼椪放在隊伍。"
        ]
      },
      "variants": [
        {
          "label": "本篇「回家之路」未完成",
          "party": [
            {
              "name": "大狼犬",
              "types": [
                "dark"
              ],
              "level": 33
            },
            {
              "name": "莫魯貝可",
              "types": [
                "electric",
                "dark"
              ],
              "level": 33
            },
            {
              "name": "保母蟲",
              "types": [
                "bug",
                "grass"
              ],
              "level": 34
            },
            {
              "name": "九尾",
              "types": [
                "fire"
              ],
              "level": 34
            },
            {
              "name": "來悲粗茶",
              "types": [
                "grass",
                "ghost"
              ],
              "level": 35
            }
          ]
        },
        {
          "label": "本篇「回家之路」完成",
          "party": [
            {
              "name": "大狼犬",
              "types": [
                "dark"
              ],
              "level": 70
            },
            {
              "name": "莫魯貝可",
              "types": [
                "electric",
                "dark"
              ],
              "level": 71
            },
            {
              "name": "保母蟲",
              "types": [
                "bug",
                "grass"
              ],
              "level": 72
            },
            {
              "name": "九尾",
              "types": [
                "fire"
              ],
              "level": 72
            },
            {
              "name": "來悲粗茶",
              "types": [
                "grass",
                "ghost"
              ],
              "level": 74
            }
          ]
        }
      ]
    },
    {
      "order": 14,
      "role": "trainer",
      "name": "沙儷：攝影調查前測驗",
      "location": "翠綠鎮",
      "party": [
        {
          "name": "貓頭夜鷹",
          "types": [
            "normal",
            "flying"
          ],
          "level": 68
        },
        {
          "name": "葉伊布",
          "types": [
            "grass"
          ],
          "level": 70
        }
      ],
      "notes": "北上圖鑑捕獲登錄150種後與沙儷交談，固定Lv68／70，與低等級版北上故事無關。",
      "recommendedTeams": [
        {
          "label": "可取得的對策候選（依需要選用）",
          "reason": "貓頭夜鷹用電／岩石，葉伊布用火／飛行；貓頭夜鷹不眠，不要用催眠浪費回合。",
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
        "summary": "貓頭夜鷹用電／岩石，葉伊布用火／飛行；貓頭夜鷹不眠，不要用催眠浪費回合。",
        "tips": [
          "北上圖鑑捕獲登錄150種後與沙儷交談，固定Lv68／70，與低等級版北上故事無關。"
        ]
      }
    },
    {
      "order": 15,
      "role": "legendary",
      "name": "赫月熊：月月熊（赫月）",
      "location": "永久森林",
      "party": [
        {
          "name": "月月熊（赫月）",
          "types": [
            "ground",
            "normal"
          ],
          "level": 70
        }
      ],
      "notes": "完成沙儷的霧夜攝影調查後出現，固定Lv70且有首領HP；先打倒再選球，捕捉必定成功。",
      "recommendedTeams": [
        {
          "label": "可取得的對策候選（依需要選用）",
          "reason": "以水／草／格鬥攻擊；心眼讓一般招能命中幽靈，不能靠幽靈免疫血月。血月不能連續使用，但仍要防大地之力與冥想，及時回復。",
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
              "name": "斗笠菇",
              "types": [
                "grass",
                "fighting"
              ],
              "obtain": "帕底亞蘑蘑菇升級進化",
              "moveNote": "升級格鬥招或草招處理地面／一般；別假定每隻斗笠菇已學會蘑菇孢子。"
            }
          ]
        }
      ],
      "strategy": {
        "level": "依下方版本／進度隊伍的最高等級準備；捕捉戰另帶削血與異常狀態手段。",
        "summary": "以水／草／格鬥攻擊；心眼讓一般招能命中幽靈，不能靠幽靈免疫血月。血月不能連續使用，但仍要防大地之力與冥想，及時回復。",
        "tips": [
          "完成沙儷的霧夜攝影調查後出現，固定Lv70且有首領HP；先打倒再選球，捕捉必定成功。"
        ]
      }
    }
  ],
  "sources": [
    {
      "title": "Serebii：北上面具慶典與雙階段隊伍",
      "url": "https://www.serebii.net/scarletviolet/kitakamimaskfestival.shtml"
    },
    {
      "title": "Serebii：赫月調查",
      "url": "https://www.serebii.net/scarletviolet/thebloodmoonbeast.shtml"
    },
    {
      "title": "Bulbapedia：天池美納斯兩階段資料",
      "url": "https://bulbapedia.bulbagarden.net/wiki/Crystal_Pool"
    }
  ]
};

tealMaskExpansion.gyms.forEach(assertBattle);
