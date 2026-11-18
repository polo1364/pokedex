import { megaDimensionExpansion } from './gen9-legends-za-mega-dimension.js';
/** 2026-10-09 核對任務、隊伍與新 Mega 屬性；來源見攻略頁尾。 */
export const legendsZaGuide = {
  "id": "legends-za",
  "title": "寶可夢傳說 Z-A",
  "mainPartLabel": "本篇",
  "displayGeneration": 9,
  "status": "complete",
  "gymSectionTitle": "升階戰、暴走超級進化與傳說",
  "notes": "以密阿雷市即時戰鬥與Z-A登峰戰推進；收錄42個主線任務、A級結局及後日談傳說。沒有傳統道館與四天王。",
  "usePrepLegend": true,
  "legendHint": "按任務編號查看流程；戰鬥卡可展開隊伍與攻略",
  "prerequisites": [
    {
      "title": "開局與升階必讀",
      "rows": [
        {
          "label": "晝夜",
          "value": "白天捕捉、研究與支線；夜晚對戰特區賺點數，取得挑戰券後打指定升階戰。"
        },
        {
          "label": "即時戰鬥",
          "value": "招式有距離、範圍與冷卻；訓練家可移動、閃避，玩家自己被擊倒也會失敗。"
        },
        {
          "label": "路線",
          "value": "Z→Y→X→W→V，任務10直接升F，再E→D→C→B→A；不是26場逐級挑戰。"
        },
        {
          "label": "整備",
          "value": "寶可夢中心恢復、替換招式、備傷藥與活力碎片；超級進化需要對應超級石與能量。"
        },
        {
          "label": "版本",
          "value": "Nintendo Switch與Nintendo Switch 2 Edition共用本篇故事；Mega Dimension為另購追加內容。"
        },
        {
          "label": "本作規則",
          "value": "一般特性不沿用前作，招式改用冷卻而非PP；依範圍移動和換人。特定頭目的專用效果會在各戰說明，不能直接套用到捕捉後的伙伴。"
        }
      ]
    }
  ],
  "sections": [
    {
      "type": "island",
      "number": 1,
      "title": "任務 1｜取回旅行袋",
      "intro": "先選伙伴並熟悉即時招式指令。",
      "places": [
        {
          "name": "密阿雷車站周邊",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "追上拿走旅行袋的頑皮熊貓。",
        "從菊草葉、暖暖豬、小鋸鱷選一隻，打敗 Andi 取回袋子。"
      ],
      "tips": [
        "選喜歡的御三家即可；草、火、水缺口可用市內捕捉補足。"
      ]
    },
    {
      "type": "island",
      "number": 2,
      "title": "任務 2｜離開對戰特區",
      "intro": "夜晚街區會切換為對戰區。",
      "places": [
        {
          "name": "對戰特區→Z旅館",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "跟隨 Urbain／Taunie 尋找出口，擊敗擋路訓練家。",
        "花葉蒂解圍後前往Z旅館，與AZ交談並休息。"
      ],
      "tips": [
        "看到敵人視線提示先移開；下指令時也要注意自己的站位。"
      ]
    },
    {
      "type": "island",
      "number": 3,
      "title": "任務 3｜密阿雷的新生活",
      "intro": "加入MZ隊、登錄Z-A登峰戰。",
      "places": [
        {
          "name": "Z旅館→野生特區1→研究所",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "與 Urbain／Taunie 對戰：對方使用你沒選的兩隻御三家，均為Lv.5。",
        "到寶可夢中心領圖鑑，進野生特區1捕捉5隻寶可夢。",
        "帶成果到研究所找 Mable 領獎勵，之後持續回報圖鑑研究。"
      ],
      "tips": [
        "同伴姓名依主角外觀分支；御三家隊伍依你最初的選擇分支。"
      ]
    },
    {
      "type": "island",
      "number": 4,
      "title": "任務 4｜第一次升階：Y",
      "intro": "挑戰券是升階戰門票。",
      "places": [
        {
          "name": "夜間對戰特區",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "晚上擊敗訓練家並完成獎勵卡課題累積點數。",
        "取得挑戰券，依標記挑戰 Zach，獲勝升至Y級。"
      ],
      "tips": [
        "呆呆獸、波波、皮卡丘並非單一屬性隊；準備草、電與地面打點。"
      ]
    },
    {
      "type": "island",
      "number": 5,
      "title": "任務 5｜稜鏡塔下的城市",
      "intro": "城市導覽同時解鎖支線委託。",
      "places": [
        {
          "name": "稜鏡塔→野生特區3→帥哥事務所",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "隨同伴到咖啡店認識 Vinnie。",
        "前往野生特區3，擊敗正義之拳 Josée：腕力Lv.10、瑪沙那Lv.11。",
        "到帥哥事務所見瑪琪艾兒，觀看超級進化並開放支線。"
      ],
      "tips": [
        "支線可補資金與素材；主線推進仍看任務清單。"
      ]
    },
    {
      "type": "island",
      "number": 6,
      "title": "任務 6｜升至X級",
      "intro": "Yvon 的隊伍以妖精系與彩粉蝶為主。",
      "places": [
        {
          "name": "夜間對戰特區",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "夜間取得新的挑戰券。",
        "對戰 Yvon 並升至X級。"
      ],
      "tips": [
        "火招對彩粉蝶、毒或鋼招對粉香香及綿綿泡芙。"
      ]
    },
    {
      "type": "island",
      "number": 7,
      "title": "任務 7｜升至W級",
      "intro": "先完成 Naveen 的交流戰。",
      "places": [
        {
          "name": "Z旅館→對戰特區",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "擊敗圓絲蛛Lv.16、勾魂眼Lv.16、滑滑小子Lv.17。",
        "再於夜間取得券並擊敗 Xavi。"
      ],
      "tips": [
        "妖精招可處理滑滑小子；凱西的進化型勇基拉要用惡或幽靈打點。"
      ]
    },
    {
      "type": "island",
      "number": 8,
      "title": "任務 8｜升至V級",
      "intro": "替AZ把忘記的物品送給 Lida。",
      "places": [
        {
          "name": "綠色區5對戰場→Restaurant Le Nah",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "到綠色區5找 Lida；對方鐵臂槍蝦Lv.22、迷你冰Lv.22、海星星Lv.23。",
        "取得挑戰券後打 Rintaro 的花椰猿、冷水猿、爆香猿，均Lv.24。"
      ],
      "tips": [
        "三猴屬性互補；用換人與站位逐一處理，不讓同一隻硬吃三種打點。"
      ]
    },
    {
      "type": "island",
      "number": 9,
      "title": "任務 9｜追尋神秘寶可夢",
      "intro": "首次暴走超級進化戰：阿勃梭魯。",
      "places": [
        {
          "name": "餐廳附近→屋頂",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "接到瑪琪艾兒聯絡後跟隨神秘寶可夢上屋頂。",
        "接過超級環，躲開阿勃梭魯大範圍惡之波動後反擊。",
        "平息暴走後接納阿勃梭魯同行。"
      ],
      "tips": [
        "先保住訓練家；近身多段爆發出現時退開，不要只盯著宝可夢HP。"
      ]
    },
    {
      "type": "island",
      "number": 10,
      "title": "任務 10｜超級進化的秘密／直升F級",
      "intro": "此處由V級直接升F級，不需逐字母補打。",
      "places": [
        {
          "name": "Z旅館→Quasartico公司",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "用新伙伴與同伴對戰，再到Quasartico公司處理門口咚咚鼠。",
        "取得挑戰券並擊敗 Vinnie，升至F級。",
        "AZ給起始伙伴的超級石；完成任務11～13後回旅館對戰基格爾德10%形態並取得神秘石子。"
      ],
      "tips": [
        "持有對應超級石、充滿能量再超級進化；石子留待結局劇情。"
      ]
    },
    {
      "type": "island",
      "number": 11,
      "title": "任務 11｜暴走超級呆殼獸",
      "intro": "與 Urbain／Taunie 一起平息暴走。",
      "places": [
        {
          "name": "藍色區水中小島",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "依任務到小島開戰。",
        "避開水之波動、幻象光線與四周漩渦，用草、電、蟲、幽靈或惡攻擊。",
        "獲勝取得呆殼獸超級石。"
      ],
      "tips": [
        "別站在連續生成的漩渦內；招式冷卻時移到空地。"
      ]
    },
    {
      "type": "island",
      "number": 12,
      "title": "任務 12｜暴走超級噴火駝",
      "intro": "先讓施工架可以通行。",
      "places": [
        {
          "name": "黃色區屋頂",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "和 Tarragon 及工人交涉並完成對戰，上屋頂與 Lida 會合。",
        "火山岩出現後離開岩石群，避開火牆引起的連鎖爆炸。",
        "用水系打四倍弱點，獲勝取得噴火駝超級石。"
      ],
      "tips": [
        "水系站安全位置再放招；地面招也有效。"
      ]
    },
    {
      "type": "island",
      "number": 13,
      "title": "任務 13｜暴走超級大食花",
      "intro": "與 Naveen 合作。",
      "places": [
        {
          "name": "洋紅色區／北側大道旁",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "到北側大道旁找到大食花。",
        "遠離污泥炸彈留下的毒池；近身時提防強力鞭打。",
        "以火、冰、飛行或超能力打點結束戰鬥。"
      ],
      "tips": [
        "毒池會限制走位，先移動再輸出。"
      ]
    },
    {
      "type": "island",
      "number": 14,
      "title": "任務 14｜Canari 的測驗與E級升階",
      "intro": "先通過粉絲活動找出升階對手。",
      "places": [
        {
          "name": "變電所→Café Gallant→Racine Construction",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "先擊敗 Naveen，再到變電所報暗號「Let’s Go, DYN4MO!」。",
        "是非題依序選真、假、真；到Café Gallant取特製密阿雷格雷派，回來打 Mani。",
        "最後一題選爺爺；去Racine Construction擊敗 Tarragon，再取得券挑戰 Canari。"
      ],
      "tips": [
        "Canari 是電系隊；泥巴魚也有地面屬性。地面招有效，仍須避開對手招式。"
      ]
    },
    {
      "type": "island",
      "number": 15,
      "title": "任務 15｜MZ隊的新工作",
      "intro": "第二批三場暴走事件。",
      "places": [
        {
          "name": "Z旅館／各區",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "接 Vinnie 通知並與隊員分工。",
        "完成任務16大針蜂、17摔角鷹人、18詛咒娃娃。",
        "全部處理後回旅館推進D級事件。"
      ],
      "tips": [
        "三個分支都要完成；只累積挑戰券不會跳過暴走任務。"
      ]
    },
    {
      "type": "island",
      "number": 16,
      "title": "任務 16｜暴走超級大針蜂",
      "intro": "與同伴處理大針蜂與鐵殼蛹干擾。",
      "places": [
        {
          "name": "綠色區屋頂",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "上屋頂開戰，避開猛撲與追蹤飛彈針。",
        "鐵殼蛹出現時保留閃避空間，用火、飛行、超能力或岩石打點。",
        "取得大針蜂超級石。"
      ],
      "tips": [
        "連續移動避開追蹤攻擊，不在小怪群中停留。"
      ]
    },
    {
      "type": "island",
      "number": 17,
      "title": "任務 17｜暴走超級摔角鷹人",
      "intro": "先與找尋摔角鷹人的居民交談。",
      "places": [
        {
          "name": "洋紅色區屋頂",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "與Lida沿屋頂追上目標。",
        "看到牠跳起準備大型飛身重壓時，遠離落點與衝擊波。",
        "用電、冰、飛行、超能力或妖精招式反擊。"
      ],
      "tips": [
        "格鬥／飛行形態；地面招無效。"
      ]
    },
    {
      "type": "island",
      "number": 18,
      "title": "任務 18｜暴走超級詛咒娃娃",
      "intro": "分身會一起發射暗影球。",
      "places": [
        {
          "name": "黃色區",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "與Naveen會合，觀察詛咒娃娃現身。",
        "移開分身火線，避開潛靈奇襲與暗影爪衝刺後攻擊。",
        "獲勝取得超級石並聽L說明。"
      ],
      "tips": [
        "惡系能兼顧防守與輸出；一般、格鬥招不能擊中幽靈。"
      ]
    },
    {
      "type": "island",
      "number": 19,
      "title": "任務 19｜找回Gwynn／D級升階",
      "intro": "先找人，再進行 Ivor 升階戰。",
      "places": [
        {
          "name": "帥哥事務所→藍色區7噴泉→下水道→道場",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "帶挑戰券去道場得知Gwynn失蹤，向瑪琪艾兒尋求線索。",
        "再戰Canari；往藍色區7鋼炮臂蝦噴泉，用冰凍光束凍住水流進下水道。",
        "擊敗鑰圈兒後由Ivor破門，找到Gwynn並完成對戰，再回道場打Ivor。"
      ],
      "tips": [
        "提前準備能使用冰凍光束的伙伴；別把主線NPC破門誤作需要額外鑰匙。"
      ]
    },
    {
      "type": "island",
      "number": 20,
      "title": "任務 20｜鏽蝕幫的委託",
      "intro": "替同伴處理債務的主線。",
      "places": [
        {
          "name": "鏽蝕幫事務所→舊屋→下水道",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "擊敗門口成員與 Philippe，見Corbeau後回旅館。",
        "完成任務21～23的暴走事件。",
        "依次處理舊屋幽靈、Saison運河下水道超級結晶、SBC成員與保護Jett事件。"
      ],
      "tips": [
        "下水道目標是清除指定超級結晶；任務未更新時檢查尚未破壞的結晶。"
      ]
    },
    {
      "type": "island",
      "number": 21,
      "title": "任務 21｜暴走超級大嘴娃",
      "intro": "鋼／妖精的近身追擊型頭目。",
      "places": [
        {
          "name": "洋紅色區",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "與同伴抵達建築物角落開戰。",
        "躲開嬉鬧、咬碎追擊；跳出場外蓄力時專心避開能量球。",
        "用火或地面招反擊並取得超級石。"
      ],
      "tips": [
        "龍招無效；別用妖精打鋼系抗性。"
      ]
    },
    {
      "type": "island",
      "number": 22,
      "title": "任務 22｜暴走超級龜足巨鎧",
      "intro": "超級進化後改為岩石／格鬥。",
      "places": [
        {
          "name": "藍色區水邊",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "與Lida找到水中的目標。",
        "避開落石，清理造成阻礙的龜腳腳；近身連拳後還有能量束。",
        "以水、草、格鬥、地面、超能力、鋼或妖精打點，完成後聽L說明。"
      ],
      "tips": [
        "Mega形態不再是水／岩石；草招不是四倍，電招也不是弱點。"
      ]
    },
    {
      "type": "island",
      "number": 23,
      "title": "任務 23｜暴走超級電龍",
      "intro": "先處理擋住升降裝置的小木靈。",
      "places": [
        {
          "name": "紅色區屋頂",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "先與Gwynn對戰，讓她排除小木靈阻擋。",
        "上屋頂避開龍之波動、廣域破壞與蓄力放電。",
        "離開殘留電場，用地面、冰、龍或妖精招式反擊。"
      ],
      "tips": [
        "超級電龍是電／龍；水與電招都不理想。"
      ]
    },
    {
      "type": "island",
      "number": 24,
      "title": "任務 24｜Corbeau／C級升階",
      "intro": "完成委託後可挑戰Corbeau。",
      "places": [
        {
          "name": "鏽蝕幫事務所→Z旅館",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "重新取得挑戰券，挑戰四隻隊伍與超級蜈蚣王。",
        "獲勝升C級後回旅館，完成住宿及還款劇情。"
      ],
      "tips": [
        "暴鯉龍交電招；其餘毒系可用超能力，蜈蚣王也弱火、飛行、岩石。"
      ]
    },
    {
      "type": "island",
      "number": 25,
      "title": "任務 25｜正式對戰場的較量",
      "intro": "AZ將超級環交給Naveen與Lida。",
      "places": [
        {
          "name": "城市對戰場",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "先與Lida的四隻隊伍交手。",
        "再挑戰Naveen，留意超級頭巾混混。",
        "完成兩場後跟隊員繼續行動。"
      ],
      "tips": [
        "頭巾混混惡／格鬥四倍弱妖精；Lida此時仍使用海星星。"
      ]
    },
    {
      "type": "island",
      "number": 26,
      "title": "任務 26｜SBC邀請",
      "intro": "受邀参加大賽，但必須先處理危機。",
      "places": [
        {
          "name": "Nouveau Café→Verdant Avenue→Hotel Richissime",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "在咖啡店收到Lebanne邀請，到Verdant Avenue服飾店準備服裝。",
        "去Hotel Richissime出席活動。",
        "收到Vinnie聯絡後完成任務27～29。"
      ],
      "tips": [
        "大賽不是傳統四天王；先解完三場暴走才回去。"
      ]
    },
    {
      "type": "island",
      "number": 27,
      "title": "任務 27｜暴走超級雪妖女",
      "intro": "冰柱是暴風雪階段的掩體。",
      "places": [
        {
          "name": "藍色區／Amylis公園",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "與Naveen會合開戰。",
        "第一波冰柱躲開；第二波留在場上的冰柱不要全打掉。",
        "暴風雪時躲到冰柱後，空檔用火、岩石、幽靈、惡或鋼攻擊。"
      ],
      "tips": [
        "地形掩護比持續硬打重要。"
      ]
    },
    {
      "type": "island",
      "number": 28,
      "title": "任務 28｜暴走超級七夕青鳥",
      "intro": "與Lida交談後開戰。",
      "places": [
        {
          "name": "洋紅色區",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "避開追蹤月亮之力。",
        "大型龍捲風出現時遠離本體與向外擴散的小旋風。",
        "用冰、毒、鋼或妖精招式處理。"
      ],
      "tips": [
        "超級形態是龍／妖精，沒有飛行；電招與龍招都不是有效選擇。"
      ]
    },
    {
      "type": "island",
      "number": 29,
      "title": "任務 29｜暴走超級妙蛙花",
      "intro": "與同伴處理荊棘與蓄力光束。",
      "places": [
        {
          "name": "黃色區公園涼亭",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "抵達涼亭後開戰。",
        "用火或飛行招式清除種子生成的荊棘，保持通路。",
        "避開日光束蓄力方向，再用有效招式反擊。"
      ],
      "tips": [
        "清荊棘是重要工作，別把自己困在場地邊緣。"
      ]
    },
    {
      "type": "island",
      "number": 30,
      "title": "任務 30｜SBC大賽／B級升階",
      "intro": "取得挑戰券，完成整段大賽。",
      "places": [
        {
          "name": "Hotel Richissime",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "先打Lebanne，回飯店按順序挑戰Canari、Ivor、Corbeau。",
        "基格爾德50%形態插入大賽；完成後準備最終對手。",
        "打敗Jacinthe的五隻隊伍與超級皮可西，升至B級。"
      ],
      "tips": [
        "超級皮可西增加飛行屬性；鋼招仍有效，也可用電、冰、岩石。"
      ]
    },
    {
      "type": "island",
      "number": 31,
      "title": "任務 31｜Vinnie召集",
      "intro": "得知改造工程與超級能量異常。",
      "places": [
        {
          "name": "Quasartico公司→Z旅館",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "到公司聽Jett與Vinnie說明。",
        "回旅館與隊員分工，完成任務32～34。",
        "全部平息後才能繼續A級線索。"
      ],
      "tips": [
        "最末批暴走傷害高，先整備藥品與不同屬性隊員。"
      ]
    },
    {
      "type": "island",
      "number": 32,
      "title": "任務 32｜暴走超級快龍",
      "intro": "龍／飛行，冰招四倍有效。",
      "places": [
        {
          "name": "綠色區",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "與同伴找到快龍。",
        "避開暴風與隨機落雷；看到中央破壞光線要準備大範圍爆發。",
        "利用攻擊間隔放冰招並移動。"
      ],
      "tips": [
        "不要派脆弱冰系硬吃噴射火焰；會冰招的水系也能進攻。"
      ]
    },
    {
      "type": "island",
      "number": 33,
      "title": "任務 33｜暴走超級班基拉斯",
      "intro": "與Naveen合作，用格鬥招打四倍弱點。",
      "places": [
        {
          "name": "黃色區空地",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "避開沙地獄形成的沙旋風。",
        "尖石攻擊先是一條線，後段會變成三條，不要直線後退。",
        "側移後用格鬥招反擊，取得超級石。"
      ],
      "tips": [
        "水、草、地面、鋼與妖精也有效；先避開石刃再指令攻擊。"
      ]
    },
    {
      "type": "island",
      "number": 34,
      "title": "任務 34｜暴走超級寶石海星",
      "intro": "先經過鏽蝕幫的阻攔。",
      "places": [
        {
          "name": "藍色區",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "打敗成員及Philippe的四隻鋼系隊伍。",
        "Philippe給Lida水之石；完成對話後進入暴走戰。",
        "紫色蓄力後連續衝刺並接水炮，側向閃避，空檔用草、電、蟲、幽靈或惡招。"
      ],
      "tips": [
        "最後一次衝刺之後仍可能接招，不要提早停下。"
      ]
    },
    {
      "type": "island",
      "number": 35,
      "title": "任務 35｜Grisham／A級升階",
      "intro": "找出對手與塔內装置的真相。",
      "places": [
        {
          "name": "帥哥事務所→研究所→Nouveau Café→弗拉達利咖啡店",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "打敗瑪琪艾兒後找Mable，再去Nouveau Café。",
        "到弗拉達利咖啡店打Griselle，探索地下研究所取得門卡與電梯鑰匙，前往B3F讀資料。",
        "回Z旅館屋頂聽AZ說明；取得挑戰券後打Grisham六隻隊伍，升至A級。"
      ],
      "tips": [
        "最後超級噴火龍X是火／龍；不可用冰打四倍，地面、岩石或龍招較合適。"
      ]
    },
    {
      "type": "island",
      "number": 36,
      "title": "任務 36｜稜鏡塔異變",
      "intro": "與同伴決定由誰帶花葉蒂入塔。",
      "places": [
        {
          "name": "Z旅館屋頂→中央廣場",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "到屋頂確認異變，再去中央廣場。",
        "挑戰Urbain／Taunie六隻隊伍；其最終超級御三家依開局選擇而變。",
        "完成花葉蒂入塔劇情後接續救援。"
      ],
      "tips": [
        "超級大力鱷水／龍、超級大竺葵草／妖精；屬性與普通形態不同。"
      ]
    },
    {
      "type": "island",
      "number": 37,
      "title": "任務 37｜密阿雷守護作戰／本篇結局",
      "intro": "全城合作救援同伴與花葉蒂。",
      "places": [
        {
          "name": "洋紅色區→稜鏡塔",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "按支援路線穿過街區，擊敗途中暴走寶可夢，找到基格爾德與L。",
        "與完全體基格爾德合作破壞紅、藍花朵；花朵沒有屬性弱點，毀滅之光時躲到基格爾德下方。",
        "反覆破壞花朵三輪讓核心懲罰者完成蓄力；再握住石子啟動超級基格爾德，瞄準光束使出最終招式。"
      ],
      "tips": [
        "此戰是階段機關與躲避戰；不能只用妖精弱點推算塔的花朵。"
      ]
    },
    {
      "type": "island",
      "number": 38,
      "title": "任務 38｜密阿雷的未來",
      "intro": "片尾後繼續經營旅館與實現願望。",
      "places": [
        {
          "name": "Z旅館→稜鏡塔",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "依任務見Jett與Vinnie，完成願望對話。",
        "解鎖無限Z-A登峰戰。"
      ],
      "tips": [
        "後日談還有傳說捕捉與花葉蒂交付；片尾不是全部內容終點。"
      ]
    },
    {
      "type": "island",
      "number": 39,
      "title": "任務 39｜無限Z-A登峰戰",
      "intro": "持續累積挑戰券參加獎勵戰。",
      "places": [
        {
          "name": "夜間對戰特區→獎勵戰",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "完成第一場獎勵戰後回旅館接L的傳說線索，開始40與41。",
        "持續打至第15場獎勵戰，挑戰同伴與超級花葉蒂。",
        "完成家庭相認劇情後接受花葉蒂與超級石。"
      ],
      "tips": [
        "15場獎勵戰與40／41並非要求全部先做完；可交錯進行。"
      ]
    },
    {
      "type": "island",
      "number": 40,
      "title": "任務 40｜賦予生命之物／哲爾尼亞斯",
      "intro": "本篇後日談第一隻傳說。",
      "places": [
        {
          "name": "研究所→野生特區3、5、9、11",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "完成首場無限獎勵戰並聽L說明後找Mable。",
        "依序處理特區3大鋼蛇、5艾路雷朵、9流氓熊貓的異常頭目。",
        "到野生特區11擊敗並捕捉Lv.75哲爾尼亞斯。"
      ],
      "tips": [
        "妖精系弱毒與鋼；準備足量球與恢復品。"
      ]
    },
    {
      "type": "island",
      "number": 41,
      "title": "任務 41｜奪取生命之物／伊裴爾塔爾",
      "intro": "向Grisham與Vinnie調查飛來的傳說。",
      "places": [
        {
          "name": "Nouveau Café→Quasartico公司→紅色區2屋頂",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "與Grisham交談，再到公司找Vinnie。",
        "完成大食花、摔角鷹人、班基拉斯暴走模擬戰。",
        "到Galerie de la Lune屋頂捕捉Lv.75伊裴爾塔爾。"
      ],
      "tips": [
        "惡／飛行弱電、冰、岩石與妖精；地面招無效。"
      ]
    },
    {
      "type": "island",
      "number": 42,
      "title": "任務 42｜維持世界平衡／基格爾德",
      "intro": "先捕捉哲爾尼亞斯及伊裴爾塔爾。",
      "places": [
        {
          "name": "Z旅館→稜鏡塔／野生特區20",
          "content": "將此任務設為追蹤目標，再依地圖標記前往。"
        }
      ],
      "flows": [
        "回旅館接受L六隻隊伍的考驗。",
        "到稜鏡塔，連戰基格爾德10%、50%、完全體三階段。",
        "避開核心懲罰者區域，站入安全缺口，獲勝捕捉Lv.84基格爾德。"
      ],
      "tips": [
        "保留恢復品應付後段全場攻擊；冰招四倍、龍及妖精兩倍。"
      ]
    },
    {
      "type": "faq",
      "title": "本篇活動入口：蒂安希與超夢",
      "items": [
        {
          "problem": "如何接蒂安希？",
          "solution": "先透過神秘禮物取得蒂安希超級石，再到帥哥事務所和小咪互動，跟隨牠到洋紅色區8屋頂；擊敗並捕捉Lv.70蒂安希。若背包沒有石頭，先查看神秘禮物的領取狀態與官方配信公告。"
        },
        {
          "problem": "如何接超夢？",
          "solution": "先透過配信取得超夢進化石X與Y，再到弗拉達利研究所B3F觸發研究設施事件，擊敗並捕捉Lv.70超夢。活動領取條件與DLC購買分開，買DLC不會自動補發活動道具。"
        }
      ]
    }
  ],
  "gyms": [
    {
      "order": 1,
      "role": "trainer",
      "name": "Zach｜Y級升階",
      "location": "對戰特區",
      "specialty": "electric",
      "party": [
        {
          "name": "呆呆獸",
          "types": [
            "water",
            "psychic"
          ],
          "level": 8
        },
        {
          "name": "波波",
          "types": [
            "normal",
            "flying"
          ],
          "level": 9
        },
        {
          "name": "皮卡丘",
          "types": [
            "electric"
          ],
          "level": 9
        }
      ],
      "notes": "任務4。草招打呆呆獸、電招打波波，皮卡丘用地面招；避開電磁波。",
      "recommendedTeams": [
        {
          "label": "開局伙伴＋咩利羊",
          "reason": "先用自己選的伙伴對付呆呆獸與皮卡丘，再用咩利羊電招打波波；咩利羊在任務3開放的野生特區1。",
          "pokemon": [
            {
              "name": "咩利羊",
              "types": [
                "electric"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 2,
      "role": "trainer",
      "name": "Yvon｜X級升階",
      "location": "對戰特區",
      "specialty": "bug",
      "party": [
        {
          "name": "粉香香",
          "types": [
            "fairy"
          ],
          "level": 15
        },
        {
          "name": "綿綿泡芙",
          "types": [
            "fairy"
          ],
          "level": 15
        },
        {
          "name": "彩粉蝶",
          "types": [
            "bug",
            "flying"
          ],
          "level": 16
        }
      ],
      "notes": "任務6。毒或鋼攻前兩隻，火或岩石對彩粉蝶；避免用格鬥硬碰妖精。",
      "recommendedTeams": [
        {
          "label": "任務5已開放的火與鋼",
          "reason": "野生特區3小獅獅火招打彩粉蝶；特區4獨劍鞘可抗妖精招式，以影子偷襲等倍輸出；前期尚未升級學會鋼系攻擊，不預設已有鐵頭。",
          "pokemon": [
            {
              "name": "小獅獅",
              "types": [
                "fire",
                "normal"
              ]
            },
            {
              "name": "獨劍鞘",
              "types": [
                "steel",
                "ghost"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 3,
      "role": "trainer",
      "name": "Xavi｜W級升階",
      "location": "對戰特區",
      "specialty": "normal",
      "party": [
        {
          "name": "百足蜈蚣",
          "types": [
            "bug",
            "poison"
          ],
          "level": 20
        },
        {
          "name": "毒薔薇",
          "types": [
            "grass",
            "poison"
          ],
          "level": 20
        },
        {
          "name": "勇基拉",
          "types": [
            "psychic"
          ],
          "level": 21
        },
        {
          "name": "多麗米亞",
          "types": [
            "normal"
          ],
          "level": 21
        }
      ],
      "notes": "任務7。火處理蟲草、惡或幽靈打勇基拉，格鬥打多麗米亞；小心場上撒菱。",
      "recommendedTeams": [
        {
          "label": "前期火、惡與格鬥",
          "reason": "野生特區6戴魯比的火與惡打點處理前三隻；特區3頑皮熊貓格鬥招打多麗米亞。",
          "pokemon": [
            {
              "name": "戴魯比",
              "types": [
                "dark",
                "fire"
              ]
            },
            {
              "name": "頑皮熊貓",
              "types": [
                "fighting"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 4,
      "role": "trainer",
      "name": "Rintaro｜V級升階",
      "location": "Restaurant Le Nah",
      "specialty": "fire",
      "party": [
        {
          "name": "花椰猿",
          "types": [
            "grass"
          ],
          "level": 24
        },
        {
          "name": "冷水猿",
          "types": [
            "water"
          ],
          "level": 24
        },
        {
          "name": "爆香猿",
          "types": [
            "fire"
          ],
          "level": 24
        }
      ],
      "notes": "任務8。三隻都有守住，不要把長冷卻招式浪費在防守中；依草水火順序換剋制。",
      "recommendedTeams": [
        {
          "label": "早期水電火補位",
          "reason": "特區2鯉魚王Lv.20進化暴鯉龍打爆香猿；特區1咩利羊進化茸茸羊打冷水猿；特區3小獅獅打花椰猿。",
          "pokemon": [
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            },
            {
              "name": "茸茸羊",
              "types": [
                "electric"
              ]
            },
            {
              "name": "小獅獅",
              "types": [
                "fire",
                "normal"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 5,
      "role": "trainer",
      "name": "Vinnie｜F級升階",
      "location": "Quasartico公司",
      "specialty": "normal",
      "party": [
        {
          "name": "黑魯加",
          "types": [
            "dark",
            "fire"
          ],
          "level": 30
        },
        {
          "name": "巨牙鯊",
          "types": [
            "water",
            "dark"
          ],
          "level": 30
        },
        {
          "name": "捲捲耳",
          "types": [
            "normal"
          ],
          "level": 30
        },
        {
          "name": "超級老翁龍",
          "types": [
            "normal",
            "dragon"
          ],
          "level": 32
        }
      ],
      "notes": "任務10。V級直接升F級；最後老翁龍超級進化，格鬥、冰、龍、妖精有效。",
      "recommendedTeams": [
        {
          "label": "水與妖精",
          "reason": "暴鯉龍打黑魯加；特區3花蓓蓓Lv.19進化花葉蒂，妖精招對巨牙鯊與老翁龍。",
          "pokemon": [
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            },
            {
              "name": "花葉蒂",
              "types": [
                "fairy"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 6,
      "role": "trainer",
      "name": "Canari｜E級升階",
      "location": "Racine Construction",
      "specialty": "electric",
      "party": [
        {
          "name": "光電傘蜥",
          "types": [
            "electric",
            "normal"
          ],
          "level": 37
        },
        {
          "name": "電龍",
          "types": [
            "electric"
          ],
          "level": 38
        },
        {
          "name": "泥巴魚",
          "types": [
            "ground",
            "electric"
          ],
          "level": 38
        },
        {
          "name": "超級麻麻鰻魚王",
          "types": [
            "electric"
          ],
          "level": 39
        }
      ],
      "notes": "任務14。先完成測驗及Tarragon戰；地面招處理電系，泥巴魚也弱水、草、冰。不要套用前代「漂浮」而避用地面招。",
      "recommendedTeams": [
        {
          "label": "任務10可取得的地面伙伴",
          "reason": "特區8黑眼鱷進化混混鱷，用地面招處理電系；暴鯉龍水招處理泥巴魚。",
          "pokemon": [
            {
              "name": "混混鱷",
              "types": [
                "ground",
                "dark"
              ]
            },
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 7,
      "role": "trainer",
      "name": "Ivor｜D級升階",
      "location": "正義道場",
      "specialty": "fighting",
      "party": [
        {
          "name": "赫拉克羅斯",
          "types": [
            "bug",
            "fighting"
          ],
          "level": 45
        },
        {
          "name": "恰雷姆",
          "types": [
            "fighting",
            "psychic"
          ],
          "level": 46
        },
        {
          "name": "怪力",
          "types": [
            "fighting"
          ],
          "level": 46
        },
        {
          "name": "超級列陣兵",
          "types": [
            "fighting"
          ],
          "level": 47
        }
      ],
      "notes": "任務19。妖精打全隊，飛行四倍打赫拉克羅斯；岩石或冰的補盲招可能反制飛行系。",
      "recommendedTeams": [
        {
          "label": "本篇容易補齊的主力",
          "reason": "特區2鯉魚王進化暴鯉龍、特區3花蓓蓓進化花葉蒂、特區1咩利羊進化電龍；依該戰弱點換招與換人。後期可用特區16花潔夫人替換花葉蒂。",
          "pokemon": [
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            },
            {
              "name": "花葉蒂",
              "types": [
                "fairy"
              ]
            },
            {
              "name": "電龍",
              "types": [
                "electric"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 8,
      "role": "trainer",
      "name": "Corbeau｜C級升階",
      "location": "鏽蝕幫事務所",
      "specialty": "bug",
      "party": [
        {
          "name": "阿柏怪",
          "types": [
            "poison"
          ],
          "level": 50
        },
        {
          "name": "暴鯉龍",
          "types": [
            "water",
            "flying"
          ],
          "level": 51
        },
        {
          "name": "羅絲雷朵",
          "types": [
            "grass",
            "poison"
          ],
          "level": 51
        },
        {
          "name": "超級蜈蚣王",
          "types": [
            "bug",
            "poison"
          ],
          "level": 52
        }
      ],
      "notes": "任務24。電招四倍處理暴鯉龍；蜈蚣王會地震，不要讓火系停在近身區。",
      "recommendedTeams": [
        {
          "label": "本篇容易補齊的主力",
          "reason": "特區2鯉魚王進化暴鯉龍、特區3花蓓蓓進化花葉蒂、特區1咩利羊進化電龍；依該戰弱點換招與換人。後期可用特區16花潔夫人替換花葉蒂。",
          "pokemon": [
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            },
            {
              "name": "花葉蒂",
              "types": [
                "fairy"
              ]
            },
            {
              "name": "電龍",
              "types": [
                "electric"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 9,
      "role": "trainer",
      "name": "Jacinthe｜B級升階決賽",
      "location": "Hotel Richissime",
      "specialty": "fairy",
      "party": [
        {
          "name": "小碎鑽",
          "types": [
            "rock",
            "fairy"
          ],
          "level": 57
        },
        {
          "name": "大嘴娃",
          "types": [
            "steel",
            "fairy"
          ],
          "level": 58
        },
        {
          "name": "冰雪巨龍",
          "types": [
            "rock",
            "ice"
          ],
          "level": 58
        },
        {
          "name": "沙奈朵",
          "types": [
            "psychic",
            "fairy"
          ],
          "level": 58
        },
        {
          "name": "超級皮可西",
          "types": [
            "fairy",
            "flying"
          ],
          "level": 59
        }
      ],
      "notes": "任務30。小碎鑽及冰雪巨龍四倍弱鋼；大嘴娃改用火／地面。超級皮可西為妖精／飛行，鋼、毒、電、冰、岩石有效。",
      "recommendedTeams": [
        {
          "label": "本篇容易補齊的主力",
          "reason": "特區2鯉魚王進化暴鯉龍、特區3花蓓蓓進化花葉蒂、特區1咩利羊進化電龍；依該戰弱點換招與換人。後期可用特區16花潔夫人替換花葉蒂。",
          "pokemon": [
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            },
            {
              "name": "花葉蒂",
              "types": [
                "fairy"
              ]
            },
            {
              "name": "電龍",
              "types": [
                "electric"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 10,
      "role": "trainer",
      "name": "Grisham｜A級升階",
      "location": "弗拉達利咖啡店相關任務",
      "specialty": "fire",
      "party": [
        {
          "name": "流氓熊貓",
          "types": [
            "fighting",
            "dark"
          ],
          "level": 61
        },
        {
          "name": "烏賊王",
          "types": [
            "dark",
            "psychic"
          ],
          "level": 61
        },
        {
          "name": "火炎獅",
          "types": [
            "fire",
            "normal"
          ],
          "level": 61
        },
        {
          "name": "班基拉斯",
          "types": [
            "rock",
            "dark"
          ],
          "level": 62
        },
        {
          "name": "暴飛龍",
          "types": [
            "dragon",
            "flying"
          ],
          "level": 62
        },
        {
          "name": "超級噴火龍X",
          "types": [
            "fire",
            "dragon"
          ],
          "level": 63
        }
      ],
      "notes": "任務35。妖精四倍打流氓熊貓、蟲四倍打烏賊王、格鬥四倍打班基拉斯、冰四倍打暴飛龍；最後噴火龍X換地面、岩石或龍。",
      "recommendedTeams": [
        {
          "label": "本篇容易補齊的主力",
          "reason": "特區2鯉魚王進化暴鯉龍、特區3花蓓蓓進化花葉蒂、特區1咩利羊進化電龍；依該戰弱點換招與換人。後期可用特區16花潔夫人替換花葉蒂。",
          "pokemon": [
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            },
            {
              "name": "花葉蒂",
              "types": [
                "fairy"
              ]
            },
            {
              "name": "電龍",
              "types": [
                "electric"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 11,
      "role": "trainer",
      "name": "Urbain／Taunie｜稜鏡塔前",
      "location": "中央廣場",
      "specialty": "water",
      "party": [
        {
          "name": "超能妙喵",
          "types": [
            "psychic"
          ],
          "level": 62
        },
        {
          "name": "黏美龍",
          "types": [
            "dragon"
          ],
          "level": 62
        },
        {
          "name": "冰岩怪",
          "types": [
            "ice"
          ],
          "level": 62
        },
        {
          "name": "大竺葵",
          "types": [
            "grass"
          ],
          "level": 63
        },
        {
          "name": "雷電獸",
          "types": [
            "electric"
          ],
          "level": 63
        },
        {
          "name": "超級大力鱷",
          "types": [
            "water",
            "dragon"
          ],
          "level": 64
        }
      ],
      "notes": "任務36。三種御三家分支如下；同伴姓名／超能妙喵性別依主角分支，戰鬥屬性不變。",
      "recommendedTeams": [
        {
          "label": "本篇容易補齊的主力",
          "reason": "特區2鯉魚王進化暴鯉龍、特區3花蓓蓓進化花葉蒂、特區1咩利羊進化電龍；依該戰弱點換招與換人。後期可用特區16花潔夫人替換花葉蒂。",
          "pokemon": [
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            },
            {
              "name": "花葉蒂",
              "types": [
                "fairy"
              ]
            },
            {
              "name": "電龍",
              "types": [
                "electric"
              ]
            }
          ]
        }
      ],
      "variants": [
        {
          "label": "選暖暖豬",
          "party": [
            {
              "name": "超能妙喵",
              "types": [
                "psychic"
              ],
              "level": 62
            },
            {
              "name": "黏美龍",
              "types": [
                "dragon"
              ],
              "level": 62
            },
            {
              "name": "冰岩怪",
              "types": [
                "ice"
              ],
              "level": 62
            },
            {
              "name": "大竺葵",
              "types": [
                "grass"
              ],
              "level": 63
            },
            {
              "name": "雷電獸",
              "types": [
                "electric"
              ],
              "level": 63
            },
            {
              "name": "超級大力鱷",
              "types": [
                "water",
                "dragon"
              ],
              "level": 64
            }
          ],
          "tips": [
            "普通形態與超級形態屬性可能不同，確認對手變身後再選招。"
          ]
        },
        {
          "label": "選菊草葉",
          "party": [
            {
              "name": "超能妙喵",
              "types": [
                "psychic"
              ],
              "level": 62
            },
            {
              "name": "黏美龍",
              "types": [
                "dragon"
              ],
              "level": 62
            },
            {
              "name": "冰岩怪",
              "types": [
                "ice"
              ],
              "level": 62
            },
            {
              "name": "大力鱷",
              "types": [
                "water"
              ],
              "level": 63
            },
            {
              "name": "雷電獸",
              "types": [
                "electric"
              ],
              "level": 63
            },
            {
              "name": "超級炎武王",
              "types": [
                "fire",
                "fighting"
              ],
              "level": 64
            }
          ],
          "tips": [
            "普通形態與超級形態屬性可能不同，確認對手變身後再選招。"
          ]
        },
        {
          "label": "選小鋸鱷",
          "party": [
            {
              "name": "超能妙喵",
              "types": [
                "psychic"
              ],
              "level": 62
            },
            {
              "name": "黏美龍",
              "types": [
                "dragon"
              ],
              "level": 62
            },
            {
              "name": "冰岩怪",
              "types": [
                "ice"
              ],
              "level": 62
            },
            {
              "name": "炎武王",
              "types": [
                "fire",
                "fighting"
              ],
              "level": 63
            },
            {
              "name": "雷電獸",
              "types": [
                "electric"
              ],
              "level": 63
            },
            {
              "name": "超級大竺葵",
              "types": [
                "grass",
                "fairy"
              ],
              "level": 64
            }
          ],
          "tips": [
            "普通形態與超級形態屬性可能不同，確認對手變身後再選招。"
          ]
        }
      ]
    },
    {
      "order": 12,
      "role": "noble",
      "name": "暴走超級阿勃梭魯",
      "location": "屋頂",
      "specialty": "dark",
      "party": [
        {
          "name": "超級阿勃梭魯",
          "types": [
            "dark"
          ]
        }
      ],
      "notes": "任務9。惡之波動蓄力時退開，以妖精、格鬥或蟲攻擊。 先平息暴走；場上攻擊也會傷害訓練家。",
      "recommendedTeams": [
        {
          "label": "本篇容易補齊的主力",
          "reason": "特區2鯉魚王進化暴鯉龍、特區3花蓓蓓進化花葉蒂、特區1咩利羊進化電龍；依該戰弱點換招與換人。後期可用特區16花潔夫人替換花葉蒂。",
          "pokemon": [
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            },
            {
              "name": "花葉蒂",
              "types": [
                "fairy"
              ]
            },
            {
              "name": "電龍",
              "types": [
                "electric"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 13,
      "role": "noble",
      "name": "暴走超級呆殼獸",
      "location": "藍色區",
      "specialty": "water",
      "party": [
        {
          "name": "超級呆殼獸",
          "types": [
            "water",
            "psychic"
          ]
        }
      ],
      "notes": "任務11。避漩渦，以電、草、蟲、幽靈或惡進攻。 先平息暴走；場上攻擊也會傷害訓練家。",
      "recommendedTeams": [
        {
          "label": "本篇容易補齊的主力",
          "reason": "特區2鯉魚王進化暴鯉龍、特區3花蓓蓓進化花葉蒂、特區1咩利羊進化電龍；依該戰弱點換招與換人。後期可用特區16花潔夫人替換花葉蒂。",
          "pokemon": [
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            },
            {
              "name": "花葉蒂",
              "types": [
                "fairy"
              ]
            },
            {
              "name": "電龍",
              "types": [
                "electric"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 14,
      "role": "noble",
      "name": "暴走超級噴火駝",
      "location": "黃色區屋頂",
      "specialty": "fire",
      "party": [
        {
          "name": "超級噴火駝",
          "types": [
            "fire",
            "ground"
          ]
        }
      ],
      "notes": "任務12。水四倍；離開火山岩與火牆引爆區。 先平息暴走；場上攻擊也會傷害訓練家。",
      "recommendedTeams": [
        {
          "label": "本篇容易補齊的主力",
          "reason": "特區2鯉魚王進化暴鯉龍、特區3花蓓蓓進化花葉蒂、特區1咩利羊進化電龍；依該戰弱點換招與換人。後期可用特區16花潔夫人替換花葉蒂。",
          "pokemon": [
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            },
            {
              "name": "花葉蒂",
              "types": [
                "fairy"
              ]
            },
            {
              "name": "電龍",
              "types": [
                "electric"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 15,
      "role": "noble",
      "name": "暴走超級大食花",
      "location": "洋紅色區",
      "specialty": "grass",
      "party": [
        {
          "name": "超級大食花",
          "types": [
            "grass",
            "poison"
          ]
        }
      ],
      "notes": "任務13。躲毒池，用火、冰、飛行或超能力。 先平息暴走；場上攻擊也會傷害訓練家。",
      "recommendedTeams": [
        {
          "label": "本篇容易補齊的主力",
          "reason": "特區2鯉魚王進化暴鯉龍、特區3花蓓蓓進化花葉蒂、特區1咩利羊進化電龍；依該戰弱點換招與換人。後期可用特區16花潔夫人替換花葉蒂。",
          "pokemon": [
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            },
            {
              "name": "花葉蒂",
              "types": [
                "fairy"
              ]
            },
            {
              "name": "電龍",
              "types": [
                "electric"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 16,
      "role": "noble",
      "name": "暴走超級大針蜂",
      "location": "綠色區屋頂",
      "specialty": "bug",
      "party": [
        {
          "name": "超級大針蜂",
          "types": [
            "bug",
            "poison"
          ]
        }
      ],
      "notes": "任務16。連續移動躲飛彈針，提防鐵殼蛹干擾。 先平息暴走；場上攻擊也會傷害訓練家。",
      "recommendedTeams": [
        {
          "label": "本篇容易補齊的主力",
          "reason": "特區2鯉魚王進化暴鯉龍、特區3花蓓蓓進化花葉蒂、特區1咩利羊進化電龍；依該戰弱點換招與換人。後期可用特區16花潔夫人替換花葉蒂。",
          "pokemon": [
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            },
            {
              "name": "花葉蒂",
              "types": [
                "fairy"
              ]
            },
            {
              "name": "電龍",
              "types": [
                "electric"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 17,
      "role": "noble",
      "name": "暴走超級摔角鷹人",
      "location": "洋紅色區屋頂",
      "specialty": "fighting",
      "party": [
        {
          "name": "超級摔角鷹人",
          "types": [
            "fighting",
            "flying"
          ]
        }
      ],
      "notes": "任務17。大跳時躲落點，電、冰、飛行、超能力或妖精有效。 先平息暴走；場上攻擊也會傷害訓練家。",
      "recommendedTeams": [
        {
          "label": "本篇容易補齊的主力",
          "reason": "特區2鯉魚王進化暴鯉龍、特區3花蓓蓓進化花葉蒂、特區1咩利羊進化電龍；依該戰弱點換招與換人。後期可用特區16花潔夫人替換花葉蒂。",
          "pokemon": [
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            },
            {
              "name": "花葉蒂",
              "types": [
                "fairy"
              ]
            },
            {
              "name": "電龍",
              "types": [
                "electric"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 18,
      "role": "noble",
      "name": "暴走超級詛咒娃娃",
      "location": "黃色區",
      "specialty": "ghost",
      "party": [
        {
          "name": "超級詛咒娃娃",
          "types": [
            "ghost"
          ]
        }
      ],
      "notes": "任務18。避分身暗影球，用惡系穩定反擊。 先平息暴走；場上攻擊也會傷害訓練家。",
      "recommendedTeams": [
        {
          "label": "本篇容易補齊的主力",
          "reason": "特區2鯉魚王進化暴鯉龍、特區3花蓓蓓進化花葉蒂、特區1咩利羊進化電龍；依該戰弱點換招與換人。後期可用特區16花潔夫人替換花葉蒂。",
          "pokemon": [
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            },
            {
              "name": "花葉蒂",
              "types": [
                "fairy"
              ]
            },
            {
              "name": "電龍",
              "types": [
                "electric"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 19,
      "role": "noble",
      "name": "暴走超級大嘴娃",
      "location": "洋紅色區",
      "specialty": "steel",
      "party": [
        {
          "name": "超級大嘴娃",
          "types": [
            "steel",
            "fairy"
          ]
        }
      ],
      "notes": "任務21。火／地面有效；跳離場地後躲爆炸球。 先平息暴走；場上攻擊也會傷害訓練家。",
      "recommendedTeams": [
        {
          "label": "本篇容易補齊的主力",
          "reason": "特區2鯉魚王進化暴鯉龍、特區3花蓓蓓進化花葉蒂、特區1咩利羊進化電龍；依該戰弱點換招與換人。後期可用特區16花潔夫人替換花葉蒂。",
          "pokemon": [
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            },
            {
              "name": "花葉蒂",
              "types": [
                "fairy"
              ]
            },
            {
              "name": "電龍",
              "types": [
                "electric"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 20,
      "role": "noble",
      "name": "暴走超級龜足巨鎧",
      "location": "藍色區",
      "specialty": "rock",
      "party": [
        {
          "name": "超級龜足巨鎧",
          "types": [
            "rock",
            "fighting"
          ]
        }
      ],
      "notes": "任務22。Mega改岩石／格鬥；草僅兩倍，電並非弱點。 先平息暴走；場上攻擊也會傷害訓練家。",
      "recommendedTeams": [
        {
          "label": "本篇容易補齊的主力",
          "reason": "特區2鯉魚王進化暴鯉龍、特區3花蓓蓓進化花葉蒂、特區1咩利羊進化電龍；依該戰弱點換招與換人。後期可用特區16花潔夫人替換花葉蒂。",
          "pokemon": [
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            },
            {
              "name": "花葉蒂",
              "types": [
                "fairy"
              ]
            },
            {
              "name": "電龍",
              "types": [
                "electric"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 21,
      "role": "noble",
      "name": "暴走超級電龍",
      "location": "紅色區屋頂",
      "specialty": "electric",
      "party": [
        {
          "name": "超級電龍",
          "types": [
            "electric",
            "dragon"
          ]
        }
      ],
      "notes": "任務23。地面、冰、龍、妖精有效，避開殘留電場。 先平息暴走；場上攻擊也會傷害訓練家。",
      "recommendedTeams": [
        {
          "label": "本篇容易補齊的主力",
          "reason": "特區2鯉魚王進化暴鯉龍、特區3花蓓蓓進化花葉蒂、特區1咩利羊進化電龍；依該戰弱點換招與換人。後期可用特區16花潔夫人替換花葉蒂。",
          "pokemon": [
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            },
            {
              "name": "花葉蒂",
              "types": [
                "fairy"
              ]
            },
            {
              "name": "電龍",
              "types": [
                "electric"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 22,
      "role": "noble",
      "name": "暴走超級雪妖女",
      "location": "Amylis公園",
      "specialty": "ice",
      "party": [
        {
          "name": "超級雪妖女",
          "types": [
            "ice",
            "ghost"
          ]
        }
      ],
      "notes": "任務27。保留冰柱做暴風雪掩體，火、岩石、惡、幽靈、鋼有效。 先平息暴走；場上攻擊也會傷害訓練家。",
      "recommendedTeams": [
        {
          "label": "本篇容易補齊的主力",
          "reason": "特區2鯉魚王進化暴鯉龍、特區3花蓓蓓進化花葉蒂、特區1咩利羊進化電龍；依該戰弱點換招與換人。後期可用特區16花潔夫人替換花葉蒂。",
          "pokemon": [
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            },
            {
              "name": "花葉蒂",
              "types": [
                "fairy"
              ]
            },
            {
              "name": "電龍",
              "types": [
                "electric"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 23,
      "role": "noble",
      "name": "暴走超級七夕青鳥",
      "location": "洋紅色區",
      "specialty": "dragon",
      "party": [
        {
          "name": "超級七夕青鳥",
          "types": [
            "dragon",
            "fairy"
          ]
        }
      ],
      "notes": "任務28。妖精、冰、毒、鋼有效；龍招無效。 先平息暴走；場上攻擊也會傷害訓練家。",
      "recommendedTeams": [
        {
          "label": "本篇容易補齊的主力",
          "reason": "特區2鯉魚王進化暴鯉龍、特區3花蓓蓓進化花葉蒂、特區1咩利羊進化電龍；依該戰弱點換招與換人。後期可用特區16花潔夫人替換花葉蒂。",
          "pokemon": [
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            },
            {
              "name": "花葉蒂",
              "types": [
                "fairy"
              ]
            },
            {
              "name": "電龍",
              "types": [
                "electric"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 24,
      "role": "noble",
      "name": "暴走超級妙蛙花",
      "location": "黃色區公園",
      "specialty": "grass",
      "party": [
        {
          "name": "超級妙蛙花",
          "types": [
            "grass",
            "poison"
          ]
        }
      ],
      "notes": "任務29。火或飛行清荊棘，閃過日光束再攻擊。 先平息暴走；場上攻擊也會傷害訓練家。",
      "recommendedTeams": [
        {
          "label": "本篇容易補齊的主力",
          "reason": "特區2鯉魚王進化暴鯉龍、特區3花蓓蓓進化花葉蒂、特區1咩利羊進化電龍；依該戰弱點換招與換人。後期可用特區16花潔夫人替換花葉蒂。",
          "pokemon": [
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            },
            {
              "name": "花葉蒂",
              "types": [
                "fairy"
              ]
            },
            {
              "name": "電龍",
              "types": [
                "electric"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 25,
      "role": "noble",
      "name": "暴走超級快龍",
      "location": "綠色區",
      "specialty": "dragon",
      "party": [
        {
          "name": "超級快龍",
          "types": [
            "dragon",
            "flying"
          ]
        }
      ],
      "notes": "任務32。冰四倍，避開暴風、雷擊及破壞光線爆發。 先平息暴走；場上攻擊也會傷害訓練家。",
      "recommendedTeams": [
        {
          "label": "本篇容易補齊的主力",
          "reason": "特區2鯉魚王進化暴鯉龍、特區3花蓓蓓進化花葉蒂、特區1咩利羊進化電龍；依該戰弱點換招與換人。後期可用特區16花潔夫人替換花葉蒂。",
          "pokemon": [
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            },
            {
              "name": "花葉蒂",
              "types": [
                "fairy"
              ]
            },
            {
              "name": "電龍",
              "types": [
                "electric"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 26,
      "role": "noble",
      "name": "暴走超級班基拉斯",
      "location": "黃色區",
      "specialty": "rock",
      "party": [
        {
          "name": "超級班基拉斯",
          "types": [
            "rock",
            "dark"
          ]
        }
      ],
      "notes": "任務33。格鬥四倍，向側面閃避一線與三線尖石攻擊。 先平息暴走；場上攻擊也會傷害訓練家。",
      "recommendedTeams": [
        {
          "label": "本篇容易補齊的主力",
          "reason": "特區2鯉魚王進化暴鯉龍、特區3花蓓蓓進化花葉蒂、特區1咩利羊進化電龍；依該戰弱點換招與換人。後期可用特區16花潔夫人替換花葉蒂。",
          "pokemon": [
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            },
            {
              "name": "花葉蒂",
              "types": [
                "fairy"
              ]
            },
            {
              "name": "電龍",
              "types": [
                "electric"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 27,
      "role": "noble",
      "name": "暴走超級寶石海星",
      "location": "藍色區",
      "specialty": "water",
      "party": [
        {
          "name": "超級寶石海星",
          "types": [
            "water",
            "psychic"
          ]
        }
      ],
      "notes": "任務34。側向躲紫色蓄力衝刺與水炮，再用電、草、蟲、幽靈或惡。 先平息暴走；場上攻擊也會傷害訓練家。",
      "recommendedTeams": [
        {
          "label": "本篇容易補齊的主力",
          "reason": "特區2鯉魚王進化暴鯉龍、特區3花蓓蓓進化花葉蒂、特區1咩利羊進化電龍；依該戰弱點換招與換人。後期可用特區16花潔夫人替換花葉蒂。",
          "pokemon": [
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            },
            {
              "name": "花葉蒂",
              "types": [
                "fairy"
              ]
            },
            {
              "name": "電龍",
              "types": [
                "electric"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 28,
      "role": "trainer",
      "name": "L｜最後的考驗",
      "location": "Z旅館",
      "specialty": "water",
      "party": [
        {
          "name": "火炎獅",
          "types": [
            "fire",
            "normal"
          ],
          "level": 78
        },
        {
          "name": "花潔夫人",
          "types": [
            "fairy"
          ],
          "level": 78
        },
        {
          "name": "勾魂眼",
          "types": [
            "dark",
            "ghost"
          ],
          "level": 78
        },
        {
          "name": "音波龍",
          "types": [
            "flying",
            "dragon"
          ],
          "level": 79
        },
        {
          "name": "灰塵山",
          "types": [
            "poison"
          ],
          "level": 79
        },
        {
          "name": "超級暴鯉龍",
          "types": [
            "water",
            "dark"
          ],
          "level": 80
        }
      ],
      "notes": "任務42前段。妖精打勾魂眼、冰四倍打音波龍；超級暴鯉龍改水／惡，電只有兩倍，格鬥、蟲、草、妖精也有效。",
      "recommendedTeams": [
        {
          "label": "依招式範圍換人",
          "reason": "看到對手出招先移到安全位置，再用剋制招式；推薦伙伴可依目前可捕捉種類替換。",
          "pokemon": [
            {
              "name": "路卡利歐",
              "types": [
                "fighting",
                "steel"
              ]
            },
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            },
            {
              "name": "沙奈朵",
              "types": [
                "psychic",
                "fairy"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 29,
      "role": "legendary",
      "name": "哲爾尼亞斯",
      "location": "野生特區11",
      "specialty": "fairy",
      "party": [
        {
          "name": "哲爾尼亞斯",
          "types": [
            "fairy"
          ],
          "level": 75
        }
      ],
      "notes": "任務40。處理特區3、5、9異常頭目後出現；毒／鋼有效，擊敗後捕捉。",
      "recommendedTeams": [
        {
          "label": "依招式範圍換人",
          "reason": "看到對手出招先移到安全位置，再用剋制招式；推薦伙伴可依目前可捕捉種類替換。",
          "pokemon": [
            {
              "name": "路卡利歐",
              "types": [
                "fighting",
                "steel"
              ]
            },
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            },
            {
              "name": "沙奈朵",
              "types": [
                "psychic",
                "fairy"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 30,
      "role": "legendary",
      "name": "伊裴爾塔爾",
      "location": "紅色區2／Galerie de la Lune屋頂",
      "specialty": "dark",
      "party": [
        {
          "name": "伊裴爾塔爾",
          "types": [
            "dark",
            "flying"
          ],
          "level": 75
        }
      ],
      "notes": "任務41。完成Vinnie三場模擬後前往屋頂；電、冰、岩石、妖精有效。",
      "recommendedTeams": [
        {
          "label": "依招式範圍換人",
          "reason": "看到對手出招先移到安全位置，再用剋制招式；推薦伙伴可依目前可捕捉種類替換。",
          "pokemon": [
            {
              "name": "路卡利歐",
              "types": [
                "fighting",
                "steel"
              ]
            },
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            },
            {
              "name": "沙奈朵",
              "types": [
                "psychic",
                "fairy"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 31,
      "role": "legendary",
      "name": "基格爾德｜10%→50%→完全體",
      "location": "稜鏡塔／野生特區20",
      "specialty": "dragon",
      "party": [
        {
          "name": "基格爾德",
          "types": [
            "dragon",
            "ground"
          ],
          "level": 84
        }
      ],
      "notes": "任務42。三階段為同一隻，不是三隻隊伍；冰四倍、龍與妖精兩倍。避開核心懲罰者，保留恢復品供後段使用，最後捕捉。",
      "recommendedTeams": [
        {
          "label": "依招式範圍換人",
          "reason": "看到對手出招先移到安全位置，再用剋制招式；推薦伙伴可依目前可捕捉種類替換。",
          "pokemon": [
            {
              "name": "路卡利歐",
              "types": [
                "fighting",
                "steel"
              ]
            },
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            },
            {
              "name": "沙奈朵",
              "types": [
                "psychic",
                "fairy"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 32,
      "role": "trainer",
      "name": "Canari｜SBC大賽",
      "location": "Hotel Richissime",
      "specialty": "electric",
      "party": [
        {
          "name": "光電傘蜥",
          "types": [
            "electric",
            "normal"
          ],
          "level": 53
        },
        {
          "name": "電龍",
          "types": [
            "electric"
          ],
          "level": 54
        },
        {
          "name": "泥巴魚",
          "types": [
            "ground",
            "electric"
          ],
          "level": 54
        },
        {
          "name": "超級麻麻鰻魚王",
          "types": [
            "electric"
          ],
          "level": 55
        }
      ],
      "notes": "任務30；依Canari→Ivor→Corbeau順序，之後還有基格爾德50%與Jacinthe。先完成測驗及Tarragon戰；地面招處理電系，泥巴魚也弱水、草、冰。不要套用前代「漂浮」而避用地面招。",
      "recommendedTeams": [
        {
          "label": "本篇容易補齊的主力",
          "reason": "特區2鯉魚王進化暴鯉龍、特區3花蓓蓓進化花葉蒂、特區1咩利羊進化電龍；依該戰弱點換招與換人。後期可用特區16花潔夫人替換花葉蒂。",
          "pokemon": [
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            },
            {
              "name": "花葉蒂",
              "types": [
                "fairy"
              ]
            },
            {
              "name": "電龍",
              "types": [
                "electric"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 33,
      "role": "trainer",
      "name": "Ivor｜SBC大賽",
      "location": "Hotel Richissime",
      "specialty": "fighting",
      "party": [
        {
          "name": "赫拉克羅斯",
          "types": [
            "bug",
            "fighting"
          ],
          "level": 53
        },
        {
          "name": "恰雷姆",
          "types": [
            "fighting",
            "psychic"
          ],
          "level": 54
        },
        {
          "name": "怪力",
          "types": [
            "fighting"
          ],
          "level": 54
        },
        {
          "name": "超級列陣兵",
          "types": [
            "fighting"
          ],
          "level": 55
        }
      ],
      "notes": "任務30；依Canari→Ivor→Corbeau順序，之後還有基格爾德50%與Jacinthe。妖精打全隊，飛行四倍打赫拉克羅斯；岩石或冰的補盲招可能反制飛行系。",
      "recommendedTeams": [
        {
          "label": "本篇容易補齊的主力",
          "reason": "特區2鯉魚王進化暴鯉龍、特區3花蓓蓓進化花葉蒂、特區1咩利羊進化電龍；依該戰弱點換招與換人。後期可用特區16花潔夫人替換花葉蒂。",
          "pokemon": [
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            },
            {
              "name": "花葉蒂",
              "types": [
                "fairy"
              ]
            },
            {
              "name": "電龍",
              "types": [
                "electric"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 34,
      "role": "trainer",
      "name": "Corbeau｜SBC大賽",
      "location": "Hotel Richissime",
      "specialty": "bug",
      "party": [
        {
          "name": "阿柏怪",
          "types": [
            "poison"
          ],
          "level": 54
        },
        {
          "name": "暴鯉龍",
          "types": [
            "water",
            "flying"
          ],
          "level": 55
        },
        {
          "name": "羅絲雷朵",
          "types": [
            "grass",
            "poison"
          ],
          "level": 55
        },
        {
          "name": "超級蜈蚣王",
          "types": [
            "bug",
            "poison"
          ],
          "level": 56
        }
      ],
      "notes": "任務30；依Canari→Ivor→Corbeau順序，之後還有基格爾德50%與Jacinthe。電招四倍處理暴鯉龍；蜈蚣王會地震，不要讓火系停在近身區。",
      "recommendedTeams": [
        {
          "label": "本篇容易補齊的主力",
          "reason": "特區2鯉魚王進化暴鯉龍、特區3花蓓蓓進化花葉蒂、特區1咩利羊進化電龍；依該戰弱點換招與換人。後期可用特區16花潔夫人替換花葉蒂。",
          "pokemon": [
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            },
            {
              "name": "花葉蒂",
              "types": [
                "fairy"
              ]
            },
            {
              "name": "電龍",
              "types": [
                "electric"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 35,
      "role": "trainer",
      "name": "Lebanne｜大賽前攔截",
      "location": "Hotel Richissime前",
      "specialty": "poison",
      "party": [
        {
          "name": "音波龍",
          "types": [
            "flying",
            "dragon"
          ],
          "level": 53
        },
        {
          "name": "怪顎龍",
          "types": [
            "rock",
            "dragon"
          ],
          "level": 53
        },
        {
          "name": "烈咬陸鯊",
          "types": [
            "dragon",
            "ground"
          ],
          "level": 53
        },
        {
          "name": "超級毒藻龍",
          "types": [
            "poison",
            "dragon"
          ],
          "level": 54
        }
      ],
      "notes": "任務30。冰招四倍打音波龍與烈咬陸鯊；毒藻龍抵消了妖精弱點，改用冰、地面、超能力或龍。",
      "recommendedTeams": [
        {
          "label": "本篇容易補齊的主力",
          "reason": "特區2鯉魚王進化暴鯉龍、特區3花蓓蓓進化花葉蒂、特區1咩利羊進化電龍；依該戰弱點換招與換人。後期可用特區16花潔夫人替換花葉蒂。",
          "pokemon": [
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            },
            {
              "name": "花葉蒂",
              "types": [
                "fairy"
              ]
            },
            {
              "name": "電龍",
              "types": [
                "electric"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 36,
      "role": "trainer",
      "name": "Urbain／Taunie｜第15場獎勵戰",
      "location": "無限Z-A登峰戰",
      "specialty": "water",
      "party": [
        {
          "name": "超能妙喵",
          "types": [
            "psychic"
          ],
          "level": 70
        },
        {
          "name": "黏美龍",
          "types": [
            "dragon"
          ],
          "level": 70
        },
        {
          "name": "大竺葵",
          "types": [
            "grass"
          ],
          "level": 71
        },
        {
          "name": "雷電獸",
          "types": [
            "electric"
          ],
          "level": 71
        },
        {
          "name": "大力鱷",
          "types": [
            "water"
          ],
          "level": 71
        },
        {
          "name": "超級花葉蒂",
          "types": [
            "fairy"
          ],
          "level": 72
        }
      ],
      "notes": "任務39。三種隊伍都以超級花葉蒂壓軸；勝後完成劇情才交付花葉蒂。",
      "recommendedTeams": [
        {
          "label": "依招式範圍換人",
          "reason": "看到對手出招先移到安全位置，再用剋制招式；推薦伙伴可依目前可捕捉種類替換。",
          "pokemon": [
            {
              "name": "路卡利歐",
              "types": [
                "fighting",
                "steel"
              ]
            },
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            },
            {
              "name": "沙奈朵",
              "types": [
                "psychic",
                "fairy"
              ]
            }
          ]
        }
      ],
      "variants": [
        {
          "label": "選暖暖豬",
          "party": [
            {
              "name": "超能妙喵",
              "types": [
                "psychic"
              ],
              "level": 70
            },
            {
              "name": "黏美龍",
              "types": [
                "dragon"
              ],
              "level": 70
            },
            {
              "name": "大竺葵",
              "types": [
                "grass"
              ],
              "level": 71
            },
            {
              "name": "雷電獸",
              "types": [
                "electric"
              ],
              "level": 71
            },
            {
              "name": "大力鱷",
              "types": [
                "water"
              ],
              "level": 71
            },
            {
              "name": "超級花葉蒂",
              "types": [
                "fairy"
              ],
              "level": 72
            }
          ],
          "tips": [
            "最後以毒或鋼招對超級花葉蒂，避開毀滅之光。"
          ]
        },
        {
          "label": "選菊草葉",
          "party": [
            {
              "name": "超能妙喵",
              "types": [
                "psychic"
              ],
              "level": 70
            },
            {
              "name": "黏美龍",
              "types": [
                "dragon"
              ],
              "level": 70
            },
            {
              "name": "大力鱷",
              "types": [
                "water"
              ],
              "level": 71
            },
            {
              "name": "雷電獸",
              "types": [
                "electric"
              ],
              "level": 71
            },
            {
              "name": "炎武王",
              "types": [
                "fire",
                "fighting"
              ],
              "level": 71
            },
            {
              "name": "超級花葉蒂",
              "types": [
                "fairy"
              ],
              "level": 72
            }
          ],
          "tips": [
            "最後以毒或鋼招對超級花葉蒂，避開毀滅之光。"
          ]
        },
        {
          "label": "選小鋸鱷",
          "party": [
            {
              "name": "超能妙喵",
              "types": [
                "psychic"
              ],
              "level": 70
            },
            {
              "name": "黏美龍",
              "types": [
                "dragon"
              ],
              "level": 70
            },
            {
              "name": "炎武王",
              "types": [
                "fire",
                "fighting"
              ],
              "level": 71
            },
            {
              "name": "雷電獸",
              "types": [
                "electric"
              ],
              "level": 71
            },
            {
              "name": "大竺葵",
              "types": [
                "grass"
              ],
              "level": 71
            },
            {
              "name": "超級花葉蒂",
              "types": [
                "fairy"
              ],
              "level": 72
            }
          ],
          "tips": [
            "最後以毒或鋼招對超級花葉蒂，避開毀滅之光。"
          ]
        }
      ]
    },
    {
      "order": 37,
      "role": "trainer",
      "name": "瑪琪艾兒｜尋找Grisham",
      "location": "帥哥事務所",
      "specialty": "dark",
      "party": [
        {
          "name": "電龍",
          "types": [
            "electric"
          ],
          "level": 57
        },
        {
          "name": "大嘴娃",
          "types": [
            "steel",
            "fairy"
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
          "name": "路卡利歐",
          "types": [
            "fighting",
            "steel"
          ],
          "level": 57
        },
        {
          "name": "超級烏賊王",
          "types": [
            "dark",
            "psychic"
          ],
          "level": 58
        }
      ],
      "notes": "任務35。超級烏賊王四倍弱蟲；大嘴娃與路卡利歐改用地面或火。",
      "recommendedTeams": [
        {
          "label": "本篇可培養的補位",
          "reason": "黑魯加來自任務5已開放的特區6，暴鯉龍由鯉魚王進化；按對手屬性用火、惡、水招。",
          "pokemon": [
            {
              "name": "黑魯加",
              "types": [
                "dark",
                "fire"
              ]
            },
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 38,
      "role": "trainer",
      "name": "Griselle｜咖啡店入口",
      "location": "弗拉達利咖啡店",
      "specialty": "fire",
      "party": [
        {
          "name": "烈箭鷹",
          "types": [
            "fire",
            "flying"
          ],
          "level": 59
        },
        {
          "name": "噴火駝",
          "types": [
            "fire",
            "ground"
          ],
          "level": 59
        },
        {
          "name": "化石翼龍",
          "types": [
            "rock",
            "flying"
          ],
          "level": 60
        },
        {
          "name": "巨金怪",
          "types": [
            "steel",
            "psychic"
          ],
          "level": 60
        },
        {
          "name": "超級火炎獅",
          "types": [
            "fire",
            "normal"
          ],
          "level": 61
        }
      ],
      "notes": "任務35。水四倍打噴火駝、岩石四倍打烈箭鷹；巨金怪改用火、地面、惡或幽靈。",
      "recommendedTeams": [
        {
          "label": "本篇可培養的補位",
          "reason": "黑魯加來自任務5已開放的特區6，暴鯉龍由鯉魚王進化；按對手屬性用火、惡、水招。",
          "pokemon": [
            {
              "name": "黑魯加",
              "types": [
                "dark",
                "fire"
              ]
            },
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 39,
      "role": "trainer",
      "name": "Tarragon｜Canari前置",
      "location": "Racine Construction",
      "specialty": "ground",
      "party": [
        {
          "name": "河馬獸",
          "types": [
            "ground"
          ],
          "level": 36
        },
        {
          "name": "掘地兔",
          "types": [
            "normal",
            "ground"
          ],
          "level": 36
        },
        {
          "name": "超級龍頭地鼠",
          "types": [
            "ground",
            "steel"
          ],
          "level": 37
        }
      ],
      "notes": "任務14。水系招式貫穿全隊；避開岩石招，不要把飛行屬性當成全面安全。",
      "recommendedTeams": [
        {
          "label": "本篇可培養的補位",
          "reason": "黑魯加來自任務5已開放的特區6，暴鯉龍由鯉魚王進化；按對手屬性用火、惡、水招。",
          "pokemon": [
            {
              "name": "黑魯加",
              "types": [
                "dark",
                "fire"
              ]
            },
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 40,
      "role": "trainer",
      "name": "Philippe｜債務事件",
      "location": "鏽蝕幫事務所",
      "specialty": "steel",
      "party": [
        {
          "name": "大鋼蛇",
          "types": [
            "steel",
            "ground"
          ],
          "level": 46
        },
        {
          "name": "巨鉗螳螂",
          "types": [
            "bug",
            "steel"
          ],
          "level": 46
        },
        {
          "name": "超級盔甲鳥",
          "types": [
            "steel",
            "flying"
          ],
          "level": 47
        }
      ],
      "notes": "任務20。火四倍打巨鉗螳螂、水打大鋼蛇，超級盔甲鳥用火或電。",
      "recommendedTeams": [
        {
          "label": "本篇可培養的補位",
          "reason": "黑魯加來自任務5已開放的特區6，暴鯉龍由鯉魚王進化；按對手屬性用火、惡、水招。",
          "pokemon": [
            {
              "name": "黑魯加",
              "types": [
                "dark",
                "fire"
              ]
            },
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 41,
      "role": "trainer",
      "name": "Philippe｜水之石事件",
      "location": "藍色區",
      "specialty": "steel",
      "party": [
        {
          "name": "大鋼蛇",
          "types": [
            "steel",
            "ground"
          ],
          "level": 56
        },
        {
          "name": "巨鉗螳螂",
          "types": [
            "bug",
            "steel"
          ],
          "level": 56
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
          "name": "超級盔甲鳥",
          "types": [
            "steel",
            "flying"
          ],
          "level": 57
        }
      ],
      "notes": "任務34。波士可多拉四倍弱地面或格鬥；獲勝後才繼續Lida水之石與暴走寶石海星事件。",
      "recommendedTeams": [
        {
          "label": "本篇可培養的補位",
          "reason": "黑魯加來自任務5已開放的特區6，暴鯉龍由鯉魚王進化；按對手屬性用火、惡、水招。",
          "pokemon": [
            {
              "name": "黑魯加",
              "types": [
                "dark",
                "fire"
              ]
            },
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            }
          ]
        }
      ]
    },
    {
      "order": 42,
      "role": "trainer",
      "name": "Gwynn｜下水道",
      "location": "藍色區7下水道",
      "specialty": "ghost",
      "party": [
        {
          "name": "詛咒娃娃",
          "types": [
            "ghost"
          ],
          "level": 43
        },
        {
          "name": "南瓜怪人",
          "types": [
            "ghost",
            "grass"
          ],
          "level": 44
        },
        {
          "name": "超級水晶燈火靈",
          "types": [
            "ghost",
            "fire"
          ],
          "level": 45
        }
      ],
      "notes": "任務19。幽靈／惡招處理前三隻，水可打水晶燈火靈；小心南瓜怪人的萬聖夜改變屬性。",
      "recommendedTeams": [
        {
          "label": "本篇可培養的補位",
          "reason": "黑魯加來自任務5已開放的特區6，暴鯉龍由鯉魚王進化；按對手屬性用火、惡、水招。",
          "pokemon": [
            {
              "name": "黑魯加",
              "types": [
                "dark",
                "fire"
              ]
            },
            {
              "name": "暴鯉龍",
              "types": [
                "water",
                "flying"
              ]
            }
          ]
        }
      ]
    }
  ],
  "eliteFour": [],
  "champion": null,
  "expansions": [megaDimensionExpansion],
  "sources": [
    {
      "title": "官方遊戲介紹",
      "url": "https://legends.pokemon.com/en-us/gameplay"
    },
    {
      "title": "Serebii：42個主線任務與各任務完整對戰表",
      "url": "https://www.serebii.net/legendsz-a/mainmissions.shtml"
    },
    {
      "title": "Serebii：新超級進化屬性",
      "url": "https://www.serebii.net/legendsz-a/megaevolutions.shtml"
    },
    {
      "title": "Serebii：Z-A登峰戰與獎勵戰",
      "url": "https://www.serebii.net/legendsz-a/z-aroyale.shtml"
    },
    {
      "title": "Serebii：野生特區解鎖時機與可捕捉伙伴",
      "url": "https://www.serebii.net/legendsz-a/wildzones.shtml"
    },
    {
      "title": "Serebii：本作特殊被動效果",
      "url": "https://www.serebii.net/legendsz-a/passiveeffects.shtml"
    },
    {
      "title": "Serebii：傳說、幻之寶可夢與活動道具",
      "url": "https://www.serebii.net/legendsz-a/legendary.shtml"
    }
  ]
};
