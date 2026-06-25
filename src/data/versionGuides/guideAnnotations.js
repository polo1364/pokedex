/** @typedef {'item'|'hm'|'prep'|'pass'|'place'|'mechanic'|'npc'} AnnotateType */

/** @type {{ term: string, type: AnnotateType, tip: string }[]} */
export const FRLG_SEVII_ANNOTATIONS = [
  { term: '三島通行證', type: 'pass', tip: '打敗夏伯後由西雷發給，可搭船前往一～三之島' },
  { term: '彩虹通行證', type: 'pass', tip: '破關、取得全國圖鑑並交出紅寶石後取得，可前往四～七之島' },
  { term: '全國圖鑑', type: 'mechanic', tip: '破關後回關都找大木博士，捕獲數達標即可升級' },
  { term: '秘傳機器07', type: 'hm', tip: '四之島冰凍瀑布洞窟內取得，可教寶可夢「瀑布」' },
  { term: '紅寶石', type: 'item', tip: '一之島火焰山洞穴內取得，交給西雷後推進主線' },
  { term: '藍寶石', type: 'item', tip: '六之島點之穴取得，被吉丁搶走後需從五之島倉庫取回' },
  { term: '隕石碎片', type: 'item', tip: '二之島可找到，交給洛斯特爾父親可換月之石' },
  { term: '月之石', type: 'item', tip: '進化道具，可讓尼多娜、尼多力諾等進化' },
  { term: '高級球', type: 'item', tip: '捕捉率較高的精靈球，抓火焰鳥等傳說寶可夢建議多帶' },
  { term: '幸運蛋', type: 'item', tip: '攜帶後戰鬥經驗值增加，七之島練功必備' },
  { term: '學習裝置', type: 'item', tip: '未上場的寶可夢也能分得經驗值' },
  { term: '星之沙', type: 'item', tip: '可販賣換錢的道具，財寶海灘可再生取得' },
  { term: '大珍珠', type: 'item', tip: '高價販賣道具，財寶海灘可再生取得' },
  { term: '芭亞果', type: 'item', tip: '樹果，可恢復寶可夢體力' },
  { term: '對戰搜尋器', type: 'item', tip: '步行後可再次與已對戰過的訓練家重戰，方便練功' },
  { term: '衝浪', type: 'hm', tip: '秘傳招式，可在水上移動，七之島多處必備' },
  { term: '怪力', type: 'hm', tip: '秘傳招式，可推動巨石，火焰山與遺跡鑰匙洞窟需要' },
  { term: '居合斬', type: 'hm', tip: '秘傳招式，可砍斷小樹，點之穴入口需要' },
  { term: '瀑布', type: 'hm', tip: '秘傳招式，可攀爬瀑布，冰凍瀑布洞窟內外都需要' },
  { term: '飛天', type: 'hm', tip: '秘傳招式，可快速飛回已造訪城鎮補給' },
  { term: '財寶海灘', type: 'place', tip: '一之島南端海灘，星之沙與大珍珠可再生採集' },
  { term: '遊戲角落', type: 'place', tip: '二之島設施，交還隕石碎片可換月之石並解鎖迷你遊戲' },
  { term: '圖案叢林', type: 'place', tip: '六之島支線探索區，可遇到特定寶可夢' },
  { term: '綠色小徑', type: 'place', tip: '六之島海邊小徑，連接多個探索區域' },
  { term: '變化洞窟', type: 'place', tip: '六之島特殊洞窟，內容隨版本而異' },
  { term: '迷宮洞窟', type: 'place', tip: '五之島支線洞窟，內有紀念石柱等探索要素' },
  { term: '岩石粉碎', type: 'hm', tip: '秘傳招式，可打碎岩石開路或撿道具' },
  { term: '火焰鳥', type: 'mechanic', tip: '傳說寶可夢，一之島火焰山頂，夏伯後即可挑戰，僅一次遭遇' },
  { term: '未知圖騰', type: 'mechanic', tip: '七之島遺跡洞窟內可捕捉，需先完成推石頭謎題' },
  { term: '點之穴', type: 'place', tip: '六之島廢墟山谷內，居合斬開門，洞內跳洞順序：上→左→右→下' },
  { term: '冰凍瀑布洞窟', type: 'place', tip: '四之島東北洞穴，內有秘傳機器07與科拿劇情' },
  { term: '火箭隊倉庫', type: 'place', tip: '五之島草原內，需兩組密碼進入，主線最後大戰所在地' },
  { term: '樹木果森林', type: 'place', tip: '三之島西側，救洛斯特爾與引夢貘人事件發生地' },
  { term: '燧石路', type: 'place', tip: '一之島北側道路，通往火焰山，途中有溫泉可恢復' },
  { term: '海角峭壁', type: 'place', tip: '二之島北側，御三家可學究極招式' },
  { term: '絆橋', type: 'place', tip: '三之島西側橋梁，通往樹木果森林' },
  { term: '五之島草原', type: 'place', tip: '五之島南側草原，火箭隊倉庫入口' },
  { term: '廢墟山谷', type: 'place', tip: '六之島中央山谷，點之穴入口所在地' },
  { term: '七島峽谷', type: 'place', tip: '七之島練功區，可找到遺跡鑰匙洞窟' },
  { term: '遺跡鑰匙洞窟', type: 'place', tip: '七之島推石頭謎題，解鎖後才能進遺跡洞窟' },
  { term: '遺跡洞窟', type: 'place', tip: '七之島捕捉未知圖騰的洞窟群' },
  { term: '訓練家之塔', type: 'place', tip: '七之島對戰設施，逐層挑戰訓練家' },
  { term: '西雷', type: 'npc', tip: '一之島寶可夢網路中心研究員，七之島主線任務發放者' },
  { term: '洛斯特爾', type: 'npc', tip: '二之島少年，三之島樹木果森林失蹤事件主角' },
  { term: '吉丁', type: 'npc', tip: '火箭隊研究員，點之穴搶走藍寶石，倉庫內需對戰' },
  { term: '科拿', type: 'npc', tip: '四之島出身冰系四天王，冰凍瀑布洞窟需協助她' },
  { term: '瘋狂植物', type: 'mechanic', tip: '草系究極招式，使用後下一回合無法行動' },
  { term: '爆炸烈焰', type: 'mechanic', tip: '火系究極招式，使用後下一回合無法行動' },
  { term: '加農水砲', type: 'mechanic', tip: '水系究極招式，使用後下一回合無法行動' },
  { term: '閃焰衝', type: 'mechanic', tip: '特性，完全免疫火系招式，捕捉火焰鳥時很有用' },
  { term: '角金魚需要樹幹', type: 'mechanic', tip: '火箭隊倉庫第一組密碼（五之島草原入口）' },
  { term: '是的、不、吉利蛋', type: 'mechanic', tip: '火箭隊倉庫第二組密碼（六之島點之穴後取得）' },
];

/** @type {{ term: string, type: AnnotateType, tip: string }[]} */
export const EMERALD_BF_ANNOTATIONS = [
  { term: '開拓區通行證', type: 'pass', tip: '破關後於開拓區招待處登錄，記錄戰鬥點數與徽章' },
  { term: '戰鬥點數', type: 'mechanic', tip: '連勝獲得，可於開拓區兌換道具與招式' },
  { term: '等級 50 模式', type: 'mechanic', tip: '參戰寶可夢最高等級 50，對手亦為等級 50' },
  { term: '開放等級', type: 'mechanic', tip: '可帶任意等級；對手最低等級 60，並依你隊伍最高等級調整' },
  { term: '對戰背包', type: 'mechanic', tip: '對戰金字塔專用道具袋，入場不可帶持有物' },
  { term: '租借寶可夢', type: 'mechanic', tip: '對戰工廠使用，戰後可換入對手 1 隻' },
  { term: '同種限制', type: 'mechanic', tip: '隊伍中不能有兩隻同種寶可夢' },
  { term: '銀徽章', type: 'pass', tip: '首次達成設施門檻並擊敗開拓之腦取得' },
  { term: '金徽章', type: 'pass', tip: '同一設施更高門檻再次擊敗開拓之腦取得' },
  { term: '知識徽章', type: 'pass', tip: '對戰工廠達拉頒發' },
  { term: '毅力徽章', type: 'pass', tip: '對戰競技場黃瓜香頒發' },
  { term: '戰術徽章', type: 'pass', tip: '對戰巨蛋希爾斯頒發' },
  { term: '幸運徽章', type: 'pass', tip: '對戰水管小薊頒發' },
  { term: '精神徽章', type: 'pass', tip: '對戰宮殿宇康頒發' },
  { term: '勇氣徽章', type: 'pass', tip: '對戰金字塔神代頒發' },
  { term: '能力徽章', type: 'pass', tip: '對戰塔莉拉頒發' },
  { term: '對戰開拓區', type: 'place', tip: '豐緣南方破關後區域，七個對戰設施' },
  { term: '對戰金字塔', type: 'place', tip: '迷宮探索設施，使用對戰背包' },
  { term: '對戰競技場', type: 'place', tip: '三回合依心、技、體評判勝負' },
  { term: '對戰工廠', type: 'place', tip: '租借寶可夢連戰設施' },
  { term: '對戰宮殿', type: 'place', tip: '寶可夢依性格自動選招' },
  { term: '對戰水管', type: 'place', tip: '七房選路，隨機事件' },
  { term: '對戰巨蛋', type: 'place', tip: '錦標賽，帶三選二上場' },
  { term: '對戰塔', type: 'place', tip: '標準連續單打，開拓之腦僅單打出現' },
  { term: '111 號道路', type: 'place', tip: '破關後亞希達帶路至開拓區' },
  { term: '開拓區兌換處', type: 'place', tip: '以戰鬥點數兌換道具與招式' },
  { term: '未白鎮', type: 'place', tip: '破關後取得船票、全國圖鑑的起點' },
  { term: '凱那市', type: 'place', tip: '可搭破浪號前往開拓區' },
  { term: '水靜市', type: 'place', tip: '可搭破浪號；破關前亦有舊對戰塔' },
  { term: '破浪號', type: 'place', tip: '父親給的船票，往返開拓區' },
  { term: '船票', type: 'pass', tip: '破關後父親在未白鎮交給，可搭破浪號' },
  { term: '亞希達', type: 'npc', tip: '開拓區創辦人，111 號道路或船艙帶路' },
  { term: '莉拉', type: 'npc', tip: '對戰塔開拓之腦' },
  { term: '達拉', type: 'npc', tip: '對戰工廠開拓之腦，隊伍隨機' },
  { term: '希爾斯', type: 'npc', tip: '對戰巨蛋開拓之腦，帶三選二' },
  { term: '黃瓜香', type: 'npc', tip: '對戰競技場開拓之腦' },
  { term: '小薊', type: 'npc', tip: '對戰水管開拓之腦' },
  { term: '宇康', type: 'npc', tip: '對戰宮殿開拓之腦' },
  { term: '神代', type: 'npc', tip: '對戰金字塔開拓之腦' },
  { term: '小田卷博士', type: 'npc', tip: '未白鎮博士，破關後升級全國圖鑑，不帶路開拓區' },
  { term: '選擇頭帶', type: 'item', tip: '攜帶後同招式連續使用不會威力遞減，戰鬥點數極優先兌換' },
  { term: '先制之爪', type: 'item', tip: '偶爾使招式先制，戰鬥點數優先兌換' },
  { term: '吃剩飯', type: 'item', tip: '每回合結束回復體力，與剩飯相同' },
  { term: '剩飯', type: 'item', tip: '每回合結束回復體力，長連勝必備持有物' },
  { term: '亮粉', type: 'item', tip: '降低對手命中率，戰鬥點數優先兌換' },
  { term: '木子果', type: 'item', tip: '解除異常狀態，水管與狀態房必備' },
  { term: '氣球', type: 'item', tip: '地面招式無效直到被擊中' },
  { term: '努力值', type: 'prep', tip: '開拓區考驗培養，主力應練滿' },
  { term: '性格', type: 'prep', tip: '對戰宮殿影響自動選招傾向' },
  { term: '狀態招式', type: 'prep', tip: '催眠、麻痺、寄生種子等' },
  { term: '固執', type: 'mechanic', tip: '性格，攻擊上升特攻下降，宮殿宜主攻' },
  { term: '內斂', type: 'mechanic', tip: '性格，特攻上升攻擊下降' },
  { term: '膽小', type: 'mechanic', tip: '性格，速度上升攻擊下降' },
  { term: '爽朗', type: 'mechanic', tip: '性格，速度上升特攻下降' },
  { term: '心、技、體評判', type: 'mechanic', tip: '競技場三回合評判：心＝積極攻擊；技＝命中與效果；體＝剩餘體力比例' },
  { term: '（心、技、體）', type: 'mechanic', tip: '競技場三回合評判：心＝積極攻擊；技＝命中與效果；體＝剩餘體力比例' },
  { term: '心＝積極攻擊', type: 'mechanic', tip: '競技場「心」評判：攻擊意願與積極性' },
  { term: '技＝命中與效果', type: 'mechanic', tip: '競技場「技」評判：招式是否命中並造成有效打擊' },
  { term: '體＝剩餘體力', type: 'mechanic', tip: '競技場「體」評判：剩餘體力比例' },
  { term: '劍舞', type: 'item', tip: '戰鬥點數可兌換，大幅提升攻擊' },
  { term: '岩崩', type: 'item', tip: '戰鬥點數可兌換，岩石招式可能使對手畏縮' },
  { term: '電磁波', type: 'item', tip: '戰鬥點數可兌換，使對手麻痺' },
  { term: '泰山壓頂', type: 'item', tip: '戰鬥點數可兌換，一般系高威力招式' },
  { term: '地球上投', type: 'item', tip: '戰鬥點數可兌換，格鬥系必中招式' },
  { term: '脫殼忍者', type: 'mechanic', tip: '競技場與隨機對手常見，須備岩飛火幽靈惡攻擊' },
];

/** @type {{ term: string, type: AnnotateType, tip: string }[]} */
export const LEGENDS_ARCEUS_ANNOTATIONS = [
  { term: '祝慶村', type: 'place', tip: '洗翠起點，銀河隊本部' },
  { term: '黑曜原野', type: 'place', tip: '第一個大型區域，劈斧螳螂' },
  { term: '紅蓮濕地', type: 'place', tip: '第二區，月月熊、裙兒小姐' },
  { term: '群青海岸', type: 'place', tip: '第三區，幽尾玄魚、風速狗' },
  { term: '天冠山麓', type: 'place', tip: '第四區，大狃拉、頑皮雷彈' },
  { term: '純白凍土', type: 'place', tip: '第五區，勇士雄鷹、冰岩怪' },
  { term: '神奧神殿', type: 'place', tip: '主線傳說與阿爾宙斯' },
  { term: '雪峰神殿', type: 'place', tip: '純白凍土主線相關' },
  { term: '三大湖', type: 'place', tip: '鎖鏈材料與湖之三神' },
  { term: '時空歪曲', type: 'mechanic', tip: '區域內隨機事件，稀有寶可夢與道具' },
  { term: '大量發生', type: 'mechanic', tip: '同種寶可夢大量出現，補圖鑑用' },
  { term: '研究等級', type: 'mechanic', tip: '完成課題提升，10 即完成該頁' },
  { term: '星級', type: 'mechanic', tip: '銀河隊調查員等級，影響可指揮等級' },
  { term: '鎮寶', type: 'item', tip: '王／女王戰投球削槽' },
  { term: '煙霧彈', type: 'item', tip: '接近高警戒寶可夢' },
  { term: '黏丸', type: 'item', tip: '使寶可夢硬直' },
  { term: '沉重球', type: 'item', tip: '背刺近距離捕捉率高' },
  { term: '飛羽球', type: 'item', tip: '遠距離、飛行寶可夢' },
  { term: '天界之笛', type: 'item', tip: '吹奏後可挑戰阿爾宙斯' },
  { term: '泥炭塊', type: 'item', tip: '月月熊進化圈圈熊用' },
  { term: '黑奇石', type: 'item', tip: '飛天螳螂進化劈斧螳螂' },
  { term: '銳利之爪', type: 'item', tip: '洗翠狃拉進化大狃拉' },
  { term: '迅疾', type: 'mechanic', tip: '威力降但可能更快再行動' },
  { term: '剛猛', type: 'mechanic', tip: '威力升但對手可能更快' },
  { term: '背襲', type: 'mechanic', tip: '從背後投球大幅提高成功率' },
  { term: '月月熊', type: 'prep', tip: '紅蓮濕地騎乘，可搜尋道具' },
  { term: '幽尾玄魚', type: 'prep', tip: '群青海岸騎乘，水上移動' },
  { term: '大狃拉', type: 'prep', tip: '天冠山麓騎乘，攀爬' },
  { term: '勇士雄鷹', type: 'prep', tip: '純白凍土騎乘，滑翔' },
  { term: '馬加木', type: 'npc', tip: '銀河隊隊長' },
  { term: '望羅', type: 'npc', tip: '破關後主要對手，後為騎拉帝納戰' },
  { term: '金剛隊', type: 'npc', tip: '先遇帝牙盧卡' },
  { term: '珍珠隊', type: 'npc', tip: '先遇帕路奇亞' },
  { term: '劈斧螳螂', type: 'mechanic', tip: '黑曜原野王，蟲／岩石' },
  { term: '裙兒小姐', type: 'mechanic', tip: '紅蓮濕地女王，草／格鬥' },
  { term: '風速狗', type: 'mechanic', tip: '群青海岸王，火／岩石' },
  { term: '頑皮雷彈', type: 'mechanic', tip: '天冠山麓王，電／草' },
  { term: '冰岩怪', type: 'mechanic', tip: '純白凍土王，冰／岩石' },
  { term: '洗翠黏美龍', type: 'prep', tip: '雨天進化，極高耐久' },
  { term: '必要寶可夢', type: 'mechanic', tip: '見阿爾宙斯需捕捉的圖鑑條件' },
];

/** @type {{ term: string, type: AnnotateType, tip: string }[]} */
export const DAYBREAK_ANNOTATIONS = [
  { term: '大大大量出現', type: 'mechanic', tip: '洗翠黎明更新現象；同一區域多點同時大量出現' },
  { term: '大量發生', type: 'mechanic', tip: '本篇既有機制；單點大量出現，與大大大量出現不同' },
  { term: '洗翠黎明', type: 'mechanic', tip: 'Ver. 1.1.0 免費更新（Daybreak）官方繁中名稱' },
  { term: '樂芭果', type: 'prep', tip: '小卡比獸最愛；餵食可推進主線委託' },
  { term: '菇誘糰', type: 'prep', tip: '委託 99 美食誘惑大作戰需攜帶×10' },
  { term: '問號點', type: 'place', tip: '地圖上大大大量出現標記' },
  { term: '星星標記', type: 'mechanic', tip: '第二波大量點；清完第一輪後出現' },
  { term: '頭目', type: 'mechanic', tip: '大大大量出現中的大型個體，研究課題加乘' },
  { term: '異變結束後', type: 'mechanic', tip: '本篇主線通關、時空異變平息後才可觸發洗翠黎明' },
  { term: '玫瑰島', type: 'place', tip: '群青海岸；委託 95 調查地點' },
  { term: '銀杏沙灘', type: 'place', tip: '群青海岸；委託 98 勁敵戰與 106 接取地' },
  { term: '秘密小洞', type: 'place', tip: '純白凍土；委託 99 使用菇誘糰誘捕' },
  { term: '金剛聚落', type: 'place', tip: '紅蓮濕地；委託 107 珠貝的願望接取地' },
  { term: '高崗營地', type: 'place', tip: '黑曜原野基地營；阿米初始接取點' },
  { term: '阿米', type: 'npc', tip: '銀河隊幹部；洗翠黎明主線引導' },
  { term: '星月', type: 'npc', tip: '銀河隊幹部；委託 95 報告對象' },
  { term: '剛石', type: 'npc', tip: '金剛隊首領；委託 106 與起源帝牙盧卡' },
  { term: '珠貝', type: 'npc', tip: '珍珠隊首領；委託 107 與起源帕路奇亞' },
  { term: '勁敵', type: 'npc', tip: '明輝或小照；委託 98 銀杏沙灘對戰' },
  { term: '明輝', type: 'npc', tip: '男性勁敵（選小照時）' },
  { term: '小照', type: 'npc', tip: '女性勁敵（選明輝時）' },
  { term: '起源帝牙盧卡', type: 'mechanic', tip: '106 戰僅上場；需本篇已捕獲帝牙盧卡' },
  { term: '起源帕路奇亞', type: 'mechanic', tip: '107 戰僅上場；需本篇已捕獲帕路奇亞' },
  { term: '夢天連戰', type: 'mechanic', tip: '主任務全完成後，住宿處可挑戰連續對戰' },
  { term: '訓練場', type: 'place', tip: '102 完成後解鎖；可調整等級練招' },
  { term: '覺醒之石', type: 'prep', tip: '委託 102 洗翠的黎明獎勵之一' },
  { term: '色違', type: 'mechanic', tip: '異色寶可夢；大大大量出現機率較一般野外高' },
  { term: '祝慶村正門', type: 'place', tip: '委託 97 向阿米接取地點' },
  { term: '暴雨', type: 'mechanic', tip: '106 剛石戰期間群青海岸天氣' },
  { term: '暴風雪', type: 'mechanic', tip: '107 珠貝戰期間純白凍土天氣' },
];

/** @type {{ term: string, type: AnnotateType, tip: string }[]} */
export const REQUESTS_ANNOTATIONS = [
  ...LEGENDS_ARCEUS_ANNOTATIONS,
  ...DAYBREAK_ANNOTATIONS,
  { term: '幽火', type: 'mechanic', tip: '委託 22 收集 107 個；夜晚各地圖出現' },
  { term: '奮鬥等級', type: 'mechanic', tip: '提升能力值的洗翠機制；單隻之道委託必練' },
  { term: '現形鏡', type: 'item', tip: '委託 94 獎勵；可改變土地雲等形態' },
  { term: '親密度', type: 'mechanic', tip: '委託 28 解鎖查看；伊布等進化條件' },
  { term: '歸途洞窟', type: 'place', tip: '群青海岸；騎拉帝納委託 91' },
  { term: '農場', type: 'place', tip: '祝慶村；田地擴充系列委託' },
  { term: '謝米', type: 'mechanic', tip: '委託 92；需劍／盾存檔' },
  { term: '達克萊伊', type: 'mechanic', tip: '委託 93；需晶燦鑽／明亮珍珠存檔' },
  { term: '花岩怪', type: 'mechanic', tip: '委託 22 完成獎勵' },
  { term: '瑪納霏', type: 'mechanic', tip: '委託 66 海之傳說可捕捉' },
  { term: '霏歐納', type: 'mechanic', tip: '委託 66 海之傳說可捕捉' },
  { term: '旺旺穀', type: 'item', tip: '餵小卡比獸可確認大大大量出現種類' },
  { term: '互換點心', type: 'item', tip: '委託 54 解鎖；改變能力傾向' },
  { term: '結草兒', type: 'mechanic', tip: '不同地形撞樹有不同蓑衣形態' },
  { term: '結草貴婦', type: 'mechanic', tip: '結草兒進化；形態依所在地' },
  { term: '單隻寶可夢之道', type: 'mechanic', tip: '委託 108～122；僅用指定寶可夢對戰' },
  { term: '土地雲', type: 'mechanic', tip: '委託 94；黑曜原野玫瑰島' },
  { term: '眷戀雲', type: 'mechanic', tip: '委託 94；完成前三雲後於紅蓮濕地' },
];

const expansionAnnotationSets = {
  sevii: FRLG_SEVII_ANNOTATIONS,
  'battle-frontier': EMERALD_BF_ANNOTATIONS,
  'legends-arceus': LEGENDS_ARCEUS_ANNOTATIONS,
  daybreak: DAYBREAK_ANNOTATIONS,
  requests: REQUESTS_ANNOTATIONS,
};

let sortedDefaultCache = null;
const sortedExpansionCache = {};

function getSortedList(list) {
  return [...list].sort((a, b) => b.term.length - a.term.length);
}

function getSortedAnnotations() {
  if (!sortedDefaultCache) {
    sortedDefaultCache = getSortedList(FRLG_SEVII_ANNOTATIONS);
  }
  return sortedDefaultCache;
}

function getSortedExpansionAnnotations(expansionId) {
  if (!expansionId) return getSortedAnnotations();
  if (!sortedExpansionCache[expansionId]) {
    const list = expansionAnnotationSets[expansionId] || [];
    sortedExpansionCache[expansionId] = getSortedList(list);
  }
  return sortedExpansionCache[expansionId];
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function wrapAnnotateTerm(escapedTerm, type, tip) {
  return `<span class="guide-annotate guide-annotate--${type}" tabindex="0">`
    + `<span class="guide-annotate-label">${escapedTerm}</span>`
    + `<span class="guide-annotate-tip" role="tooltip">${escapeHtml(tip)}</span>`
    + '</span>';
}

/** 單字詞條避免誤標（如「心」誤標「核心」、「體」誤標「體力」） */
function isSafeTermMatch(text, start, term) {
  if (term.length > 1) return true;
  const before = start > 0 ? text[start - 1] : '';
  const after = start + term.length < text.length ? text[start + term.length] : '';
  const cjk = /[\u4e00-\u9fff]/;
  const hasBefore = Boolean(before);
  const hasAfter = Boolean(after);
  if (hasBefore && cjk.test(before) && (!hasAfter || cjk.test(after))) return false;
  if (hasAfter && cjk.test(after) && (!hasBefore || cjk.test(before))) return false;
  return true;
}

function replaceTermInPlainText(text, term, replacement) {
  if (!text.includes(term)) return text;
  let result = '';
  let i = 0;
  while (i < text.length) {
    const idx = text.indexOf(term, i);
    if (idx === -1) {
      result += text.slice(i);
      break;
    }
    if (isSafeTermMatch(text, idx, term)) {
      result += text.slice(i, idx) + replacement;
      i = idx + term.length;
    } else {
      result += text.slice(i, idx + 1);
      i = idx + 1;
    }
  }
  return result;
}

/** 僅在未標註的純文字區段替換，避免 tooltip 內再嵌套標註 */
function replaceOutsideAnnotateBlocks(html, escapedTerm, type, tip) {
  const wrapped = wrapAnnotateTerm(escapedTerm, type, tip);
  const blocks = html.split(/(<span class="guide-annotate[\s\S]*?<\/span>)/g);
  return blocks.map((block) => {
    if (block.startsWith('<span class="guide-annotate')) return block;
    if (!block.includes(escapedTerm)) return block;
    return replaceTermInPlainText(block, escapedTerm, wrapped);
  }).join('');
}

function annotateWithList(text, list) {
  if (!text) return '';
  let result = escapeHtml(String(text));
  for (const { term, type, tip } of list) {
    const escapedTerm = escapeHtml(term);
    if (!result.includes(escapedTerm)) continue;
    result = replaceOutsideAnnotateBlocks(result, escapedTerm, type, tip);
  }
  return result;
}

/**
 * 將攻略文字中的關鍵詞標上色並加上 hover 註解
 * @param {string} text
 * @returns {string}
 */
export function annotateGuideText(text) {
  return annotateWithList(text, getSortedAnnotations());
}

/**
 * 擴充攻略專用註解（依 expansionId 選詞庫）
 * @param {string} text
 * @param {string} [expansionId]
 * @returns {string}
 */
export function annotateExpansionText(text, expansionId) {
  return annotateWithList(text, getSortedExpansionAnnotations(expansionId));
}
