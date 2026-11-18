// 核實來源列於頁尾；版本隊伍不得跨版本合併。
export const platinumDistortionWorldExpansion = {
  "id": "distortion-world",
  "title": "毀壞的世界",
  "status": "complete",
  "prerequisites": [
    {
      "title": "開始前確認",
      "rows": [
        {
          "label": "進度",
          "value": "白金主線，完成銀河隊總部救出湖之眾神，從天冠山登上槍之柱並完成夥星、歲星戰。"
        },
        {
          "label": "必備",
          "value": "攀岩、衝浪與怪力用於登山及內部機關；攀瀑不是內部瀑布的門檻。"
        },
        {
          "label": "補給",
          "value": "建議主力接近Lv48～50，準備全復藥、活力碎片與捕捉用球；沒有一般野生戰可在內部練等。"
        }
      ]
    }
  ],
  "sections": [
    {
      "type": "island",
      "number": 1,
      "title": "進入異世界與移動平台",
      "intro": "槍之柱事件後，跟竹蘭進入口。",
      "flows": [
        "踩平台中央的圓點切換樓層；四周圓點控制可行的平移方向。",
        "畫面翻轉時仍按螢幕方向行走；先觀察竹蘭與湖之眾神所在的位置。",
        "走近看似斷路的突出處，平台可能才會現形；擋路樹石也可能在靠近後消失。",
        "沿可移動平台逐層向下，直到遇到三隻湖之眾神與巨石。"
      ],
      "tips": [
        "不要在外觀會改變的路段只按固定羅盤方向硬走；每層都以落腳平台與升降圓點判斷。"
      ],
      "places": []
    },
    {
      "type": "island",
      "number": 2,
      "title": "三顆巨石解謎",
      "intro": "先把上層石頭落到下層，再對應三隻寶可夢的位置推入洞。",
      "flows": [
        "在由克希、艾姆利多、亞克諾姆提示附近，用怪力把巨石推入落穴。",
        "沿平台回到下層；水面以衝浪通過，倒掛瀑布依劇情道路前進。",
        "下層每隻湖神都指示一個洞，把附近落下的石頭推進該洞；三處全部完成。",
        "回竹蘭身旁的新平台，向底層移動，準備與赤日決戰。"
      ],
      "tips": [
        "石頭要完成上下兩段，光把三顆推離上層還沒有解鎖。"
      ],
      "places": []
    },
    {
      "type": "island",
      "number": 3,
      "title": "赤日、騎拉帝納與返回現實",
      "intro": "赤日隊伍有五隻，騎拉帝納另為獨立捕捉戰。",
      "flows": [
        "先與赤日交戰，電系優先處理暴鯉龍，格鬥招對瑪狃拉非常有效。",
        "和竹蘭完成對話、確認隊伍回復後，在騎拉帝納前存檔。",
        "騎拉帝納Lv47為起源形態；壓低HP、催眠後投球，避免毒／燒傷使它倒下。",
        "完成捕捉或擊倒事件後，從出口回到送行之泉。去真砂鎮找山梨博士，接著前往濱海市取得第八枚徽章。"
      ],
      "tips": [
        "暗影潛襲有消失回合，不要在消失時浪費重要攻擊；龍與幽靈攻擊會剋制它，也容易打過頭。"
      ],
      "places": []
    },
    {
      "type": "island",
      "number": 4,
      "title": "通關後回訪與白金寶珠",
      "intro": "首次主線出口不等於永久失去探索機會。",
      "flows": [
        "完成寶可夢聯盟後返回送行之泉的歸途洞窟。",
        "在走過30個房間前找到三根石柱，前往深處的入口。",
        "進入小型毀壞世界區域，沿平台取得白金寶珠，讓騎拉帝納在外界維持起源形態。"
      ],
      "tips": [
        "回訪區域與首次主線迷宮不同，不需再解同一套三石機關。"
      ],
      "places": []
    }
  ],
  "gyms": [
    {
      "order": 1,
      "role": "trainer",
      "name": "赤日",
      "location": "毀壞的世界底層",
      "party": [
        {
          "name": "黑魯加",
          "types": [
            "dark",
            "fire"
          ],
          "level": 45
        },
        {
          "name": "叉字蝠",
          "types": [
            "poison",
            "flying"
          ],
          "level": 46
        },
        {
          "name": "暴鯉龍",
          "types": [
            "water",
            "flying"
          ],
          "level": 46
        },
        {
          "name": "烏鴉頭頭",
          "types": [
            "dark",
            "flying"
          ],
          "level": 47
        },
        {
          "name": "瑪狃拉",
          "types": [
            "dark",
            "ice"
          ],
          "level": 48
        }
      ],
      "notes": "主線最後一戰；沒有妖精屬性。",
      "recommendedTeams": [
        {
          "label": "可用候選",
          "reason": "倫琴貓電招打暴鯉龍與叉字蝠；浮潛鼬水招打黑魯加；路卡利歐格鬥打瑪狃拉，留意對手火招。",
          "pokemon": [
            {
              "name": "倫琴貓",
              "types": [
                "electric"
              ]
            },
            {
              "name": "浮潛鼬",
              "types": [
                "water"
              ]
            },
            {
              "name": "路卡利歐",
              "types": [
                "fighting",
                "steel"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 2,
      "role": "legendary",
      "name": "騎拉帝納（起源形態）",
      "location": "毀壞的世界",
      "party": [
        {
          "name": "騎拉帝納",
          "types": [
            "ghost",
            "dragon"
          ],
          "level": 47
        }
      ],
      "notes": "捕捉戰；先存檔。起源形態有飄浮，地面招無效。",
      "recommendedTeams": [
        {
          "label": "可用候選",
          "reason": "姆克鷹免疫幽靈但不免疫龍招；用已培養的隊員承傷，睡眠後投球，切勿用高威力冰／龍招直接擊倒。",
          "pokemon": [
            {
              "name": "姆克鷹",
              "types": [
                "normal",
                "flying"
              ]
            },
            {
              "name": "青銅鐘",
              "types": [
                "steel",
                "psychic"
              ]
            },
            {
              "name": "大尾狸",
              "types": [
                "normal",
                "water"
              ]
            }
          ]
        }
      ]
    }
  ],
  "sources": [
    {
      "title": "毀壞世界移動、解謎與隊伍",
      "url": "https://www.serebii.net/platinum/tornworld.shtml"
    }
  ]
};
