import { pm, rec, assertBattle, assertLeague } from './helpers.js';
import { sunMoonLeague } from './gen7-sun-moon-league.js';

const trialIlima = {
  order: 1,
  role: 'gym',
  name: '伊利馬',
  location: '美樂美樂島',
  badge: '一般 Z',
  badgeType: 'normal',
  notes: '試煉圖騰為阿羅拉拉達（體型增大、召喚小拉達援軍）。以下為試煉後與伊利馬的對戰隊伍。',
  party: [
    pm('貓鼬少', ['normal'], 11),
    pm('圖圖犬', ['normal'], 11),
  ],
  recommendedTeams: [
    rec('格鬥剋制隊', '美樂美樂洞穴可抓好勝蟹，格鬥系對一般效果絕佳；御三家火斑喵或木木梟早期亦可輸出。', [
      pm('好勝蟹', ['fighting', 'ice']),
      pm('火斑喵', ['fire']),
      pm('木木梟', ['grass', 'flying']),
      pm('球球海獅', ['water']),
      pm('小篤兒', ['normal', 'flying']),
    ]),
    rec('飛行補刀隊', '小篤兒進化銃嘴大鳥後飛行系穩定；圖圖犬會輔助，優先秒殺貓鼬少。', [
      pm('小篤兒', ['normal', 'flying']),
      pm('火斑喵', ['fire']),
      pm('球球海獅', ['water']),
      pm('木木梟', ['grass', 'flying']),
      pm('好勝蟹', ['fighting', 'ice']),
    ]),
  ],
};
assertBattle(trialIlima);

const grandTrialHala = {
  order: 2,
  role: 'gym',
  name: '哈拉',
  location: '美樂美樂島',
  badge: '格鬥 Z',
  badgeType: 'fighting',
  notes: '大試煉；對戰哈拉的格鬥系隊伍，無圖騰寶可夢。',
  party: [
    pm('猴怪', ['fighting'], 13),
    pm('幕下力士', ['fighting'], 13),
    pm('好勝蟹', ['fighting', 'ice'], 14),
  ],
  recommendedTeams: [
    rec('飛行超能隊', '木木梟飛行系對格鬥效果絕佳；小篤兒線亦可。好勝蟹冰系可反打好勝蟹。', [
      pm('木木梟', ['grass', 'flying']),
      pm('小篤兒', ['normal', 'flying']),
      pm('球球海獅', ['water']),
      pm('火斑喵', ['fire']),
      pm('好勝蟹', ['fighting', 'ice']),
    ]),
    rec('妖精前代飛行隊', '第七世代前期以飛行與超能為主；投羽梟或花漾海獅補刀。', [
      pm('投羽梟', ['grass', 'flying']),
      pm('花漾海獅', ['water']),
      pm('炎熱喵', ['fire']),
      pm('喇叭啄鳥', ['normal', 'flying']),
      pm('好勝蟹', ['fighting', 'ice']),
    ]),
  ],
};
assertBattle(grandTrialHala);

const trialLana = {
  order: 3,
  role: 'gym',
  name: '水蓮',
  location: '阿卡拉島',
  badge: '水 Z',
  badgeType: 'water',
  notes: '試煉圖騰滴蛛霸（水蟲，召喚滴蛛）；建議帶電系或草系打試煉。',
  party: [
    pm('弱丁魚', ['water'], 14),
    pm('鐵螯龍蝦', ['water', 'dark'], 15),
    pm('滴蛛霸', ['water', 'bug'], 16),
  ],
  recommendedTeams: [
    rec('草電剋制隊', '木木梟或狙射樹梟草系打滴蛛霸；電系打弱丁魚與鐵螯龍蝦。', [
      pm('木木梟', ['grass', 'flying']),
      pm('小篤兒', ['normal', 'flying']),
      pm('好勝蟹', ['fighting', 'ice']),
      pm('球球海獅', ['water']),
      pm('火斑喵', ['fire']),
    ]),
    rec('電系補刀隊', '阿卡拉島可抓落雷獸線；電系穩定突破水試煉隊伍。', [
      pm('落雷獸', ['electric']),
      pm('木木梟', ['grass', 'flying']),
      pm('球球海獅', ['water']),
      pm('好勝蟹', ['fighting', 'ice']),
      pm('炎熱喵', ['fire']),
    ]),
  ],
};
assertBattle(trialLana);

const trialKiawe = {
  order: 4,
  role: 'gym',
  name: '卡奇',
  location: '阿卡拉島',
  badge: '火 Z',
  badgeType: 'fire',
  notes: '試煉圖騰焰后蜥（火毒，召喚夜盜火蜥）；阿羅拉嘎啦嘎啦為火幽靈。',
  party: [
    pm('嘎啦嘎啦', ['fire', 'ghost'], 18),
    pm('鴨嘴火獸', ['fire'], 18),
  ],
  recommendedTeams: [
    rec('水地面隊', '球球海獅水招對火效果絕佳；好勝蟹冰系亦可打嘎啦嘎啦。', [
      pm('球球海獅', ['water']),
      pm('好勝蟹', ['fighting', 'ice']),
      pm('木木梟', ['grass', 'flying']),
      pm('小篤兒', ['normal', 'flying']),
      pm('岩狗狗', ['rock']),
    ]),
    rec('岩石水系隊', '岩狗狗進化鬃岩狼人；水替補可用球球海獅或鯉魚王進化暴鯉龍。', [
      pm('球球海獅', ['water']),
      pm('岩狗狗', ['rock']),
      pm('好勝蟹', ['fighting', 'ice']),
      pm('木木梟', ['grass', 'flying']),
      pm('暴鯉龍', ['water', 'dark']),
    ]),
  ],
};
assertBattle(trialKiawe);

const trialMallow = {
  order: 5,
  role: 'gym',
  name: '瑪奧',
  location: '阿卡拉島',
  badge: '草 Z',
  badgeType: 'grass',
  notes: '試煉圖騰蘭螳花（草，召喚投球鼠）；飛行與火系為最佳對策。',
  party: [
    pm('甜竹竹', ['grass'], 18),
    pm('甜舞妮', ['grass'], 18),
    pm('甜冷美后', ['grass'], 19),
  ],
  recommendedTeams: [
    rec('火飛剋制隊', '火斑喵或炎熱喵火系對草效果絕佳；銃嘴大鳥飛行系補刀。', [
      pm('火斑喵', ['fire']),
      pm('小篤兒', ['normal', 'flying']),
      pm('球球海獅', ['water']),
      pm('好勝蟹', ['fighting', 'ice']),
      pm('岩狗狗', ['rock']),
    ]),
    rec('飛行毒隊', '投羽梟飛行＋火；甜冷美后物攻高，優先用飛行系秒殺。', [
      pm('投羽梟', ['grass', 'flying']),
      pm('炎熱喵', ['fire']),
      pm('喇叭啄鳥', ['normal', 'flying']),
      pm('好勝蟹', ['fighting', 'ice']),
      pm('岩狗狗', ['rock']),
    ]),
  ],
};
assertBattle(trialMallow);

const grandTrialOlivia = {
  order: 6,
  role: 'gym',
  name: '麗姿',
  location: '阿卡拉島',
  badge: '岩石 Z',
  badgeType: 'rock',
  notes: '大試煉；隊伍含化石寶可夢觸手百合、太古羽蟲與大朝北鼻。',
  party: [
    pm('太古羽蟲', ['rock', 'bug'], 23),
    pm('觸手百合', ['rock', 'grass'], 23),
    pm('大朝北鼻', ['rock', 'steel'], 24),
  ],
  recommendedTeams: [
    rec('水草雙剋隊', '球球海獅或西獅海壬水招打岩石；木木梟草系打觸手百合。', [
      pm('球球海獅', ['water']),
      pm('木木梟', ['grass', 'flying']),
      pm('好勝蟹', ['fighting', 'ice']),
      pm('炎熱喵', ['fire']),
      pm('岩狗狗', ['rock']),
    ]),
    rec('格鬥水隊', '好勝蟹格鬥打大朝北鼻；水招覆蓋全隊。', [
      pm('好勝蟹', ['fighting', 'ice']),
      pm('花漾海獅', ['water']),
      pm('投羽梟', ['grass', 'flying']),
      pm('鬃岩狼人', ['rock']),
      pm('暴鯉龍', ['water', 'dark']),
    ]),
  ],
};
assertBattle(grandTrialOlivia);

const trialSophocles = {
  order: 7,
  role: 'gym',
  name: '馬瑪內',
  location: '烏拉烏拉島',
  badge: '電 Z',
  badgeType: 'electric',
  notes: '試煉圖騰鍬農炮蟲（電蟲，召喚蟲電寶）；地面系免疫電且效果絕佳。',
  party: [
    pm('蟲電寶', ['bug', 'electric'], 26),
    pm('托戈德瑪爾', ['electric', 'steel'], 26),
    pm('鍬農炮蟲', ['bug', 'electric'], 28),
  ],
  recommendedTeams: [
    rec('地面剋制隊', '岩狗狗進化鬃岩狼人，地面系穩定；好勝蟹冰系亦可補刀。', [
      pm('鬃岩狼人', ['rock']),
      pm('岩狗狗', ['rock']),
      pm('木木梟', ['grass', 'flying']),
      pm('好勝蟹', ['fighting', 'ice']),
      pm('球球海獅', ['water']),
    ]),
    rec('地面主力隊', '地鼠線或地面招 TM；木木梟草系免疫電系招式。', [
      pm('鬃岩狼人', ['rock']),
      pm('木木梟', ['grass', 'flying']),
      pm('好勝蟹', ['fighting', 'ice']),
      pm('西獅海壬', ['water', 'fairy']),
      pm('熾焰咆哮虎', ['fire', 'dark']),
    ]),
  ],
};
assertBattle(trialSophocles);

const trialAcerola = {
  order: 8,
  role: 'gym',
  name: '阿塞蘿拉',
  location: '烏拉烏拉島',
  badge: '幽靈 Z',
  badgeType: 'ghost',
  notes: '試煉圖騰謎擬Ｑ（幽靈妖精，召喚謎擬Ｑ援軍）；惡系與幽靈系效果佳。',
  party: [
    pm('勾魂眼', ['dark', 'ghost'], 26),
    pm('詛咒娃娃', ['ghost'], 26),
    pm('噬沙堡爺', ['ghost', 'ground'], 28),
  ],
  recommendedTeams: [
    rec('惡幽靈隊', '好勝蟹惡格鬥或木木梟暗影爪；惡系打幽靈效果絕佳。', [
      pm('好勝蟹', ['fighting', 'ice']),
      pm('木木梟', ['grass', 'flying']),
      pm('熾焰咆哮虎', ['fire', 'dark']),
      pm('西獅海壬', ['water', 'fairy']),
      pm('鬃岩狼人', ['rock']),
    ]),
    rec('妖精補刀隊', '西獅海壬妖精招打謎擬Ｑ；投羽梟飛行補刀。', [
      pm('西獅海壬', ['water', 'fairy']),
      pm('投羽梟', ['grass', 'flying']),
      pm('好勝蟹', ['fighting', 'ice']),
      pm('熾焰咆哮虎', ['fire', 'dark']),
      pm('銃嘴大鳥', ['normal', 'flying']),
    ]),
  ],
};
assertBattle(trialAcerola);

const grandTrialNanu = {
  order: 9,
  role: 'gym',
  name: '默丹',
  location: '烏拉烏拉島',
  badge: '惡 Z',
  badgeType: 'dark',
  notes: '大試煉；貓老大為惡系，格鬥與妖精效果佳。',
  party: [
    pm('勾魂眼', ['dark', 'ghost'], 30),
    pm('混混鱷', ['ground', 'dark'], 30),
    pm('貓老大', ['dark'], 31),
  ],
  recommendedTeams: [
    rec('格鬥妖精隊', '好勝蟹格鬥打惡系；西獅海壬妖精招穩定突破貓老大。', [
      pm('好勝蟹', ['fighting', 'ice']),
      pm('西獅海壬', ['water', 'fairy']),
      pm('木木梟', ['grass', 'flying']),
      pm('熾焰咆哮虎', ['fire', 'dark']),
      pm('銃嘴大鳥', ['normal', 'flying']),
    ]),
    rec('格鬥飛行隊', '銃嘴大鳥飛行打格鬥系；好勝蟹對拼混混鱷。', [
      pm('好勝蟹', ['fighting', 'ice']),
      pm('銃嘴大鳥', ['normal', 'flying']),
      pm('狙射樹梟', ['grass', 'ghost']),
      pm('西獅海壬', ['water', 'fairy']),
      pm('鬃岩狼人', ['rock']),
    ]),
  ],
};
assertBattle(grandTrialNanu);

const grandTrialHapu = {
  order: 10,
  role: 'gym',
  name: '哈普烏',
  location: '波尼島',
  badge: '大地 Z',
  badgeType: 'ground',
  notes: '大試煉；重泥挽馬地面系物攻高，草系與水招為最佳對策。',
  party: [
    pm('泥偶巨人', ['ground', 'ghost'], 45),
    pm('沙漠蜻蜓', ['ground', 'dragon'], 45),
    pm('重泥挽馬', ['ground'], 46),
  ],
  recommendedTeams: [
    rec('水草雙剋隊', '西獅海壬或狙射樹梟草系打重泥挽馬；水招穩定。', [
      pm('西獅海壬', ['water', 'fairy']),
      pm('狙射樹梟', ['grass', 'ghost']),
      pm('銃嘴大鳥', ['normal', 'flying']),
      pm('好勝蟹', ['fighting', 'ice']),
      pm('熾焰咆哮虎', ['fire', 'dark']),
    ]),
    rec('冰水系隊', '好勝蟹冰凍拳打沙漠蜻蜓；水招打泥偶巨人。', [
      pm('西獅海壬', ['water', 'fairy']),
      pm('好勝蟹', ['fighting', 'ice']),
      pm('銃嘴大鳥', ['normal', 'flying']),
      pm('狙射樹梟', ['grass', 'ghost']),
      pm('穿著熊', ['normal', 'fighting']),
    ]),
  ],
};
assertBattle(grandTrialHapu);

const eliteHala = {
  order: 1,
  role: 'eliteFour',
  name: '哈拉',
  specialty: 'fighting',
  party: [
    pm('蚊香泳士', ['water', 'fighting'], 54),
    pm('鐵掌力士', ['fighting'], 54),
    pm('穿著熊', ['normal', 'fighting'], 55),
    pm('音波龍', ['dragon', 'flying'], 55),
    pm('好勝毛蟹', ['fighting', 'ice'], 56),
  ],
};
assertBattle(eliteHala);

const eliteOlivia = {
  order: 2,
  role: 'eliteFour',
  name: '麗姿',
  specialty: 'rock',
  party: [
    pm('古空棘魚', ['water', 'rock'], 54),
    pm('小碎鑽', ['rock', 'fairy'], 54),
    pm('隆隆岩', ['rock', 'ground'], 55),
    pm('鬃岩狼人', ['rock'], 55),
    pm('大朝北鼻', ['rock', 'steel'], 56),
  ],
};
assertBattle(eliteOlivia);

const eliteAcerola = {
  order: 3,
  role: 'eliteFour',
  name: '阿塞蘿拉',
  specialty: 'ghost',
  party: [
    pm('勾魂眼', ['dark', 'ghost'], 54),
    pm('飄飄球', ['ghost', 'flying'], 54),
    pm('噬沙堡爺', ['ghost', 'ground'], 55),
    pm('耿鬼', ['ghost', 'poison'], 55),
    pm('謎擬Ｑ', ['ghost', 'fairy'], 56),
  ],
};
assertBattle(eliteAcerola);

const eliteKahili = {
  order: 4,
  role: 'eliteFour',
  name: '卡希麗',
  specialty: 'flying',
  party: [
    pm('勇士雄鷹', ['normal', 'flying'], 54),
    pm('鐵掌力士', ['fighting'], 54),
    pm('銃嘴大鳥', ['normal', 'flying'], 55),
    pm('雷丘', ['electric', 'psychic'], 55),
    pm('禿鷹娜', ['dark', 'flying'], 56),
  ],
};
assertBattle(eliteKahili);

const championHau = {
  role: 'champion',
  name: '哈烏',
  specialty: 'normal',
  notes: '成為冠軍後的首次衛冕戰；皮卡丘持有電氣球為飛行系。',
  party: [
    pm('皮卡丘', ['electric'], 58),
    pm('音波龍', ['dragon', 'flying'], 58),
    pm('雷丘', ['electric', 'psychic'], 59),
    pm('卡比獸', ['normal'], 59),
    pm('怪力', ['fighting'], 59),
    pm('御三家', ['normal'], 60),
  ],
};
assertBattle(championHau);

const league = sunMoonLeague;
assertLeague(league);

export const sunMoonGuide = {
  id: 'sun-moon',
  title: '寶可夢 太陽／月亮',
  displayGeneration: 7,
  status: 'complete',
  notes: '阿羅拉以島嶼試煉取代傳統道館（10 場試煉／大試煉）。馬睿因妖精試煉為通關後。四天王為哈拉、麗姿、阿塞蘿拉、卡希麗；衛冕戰對手為哈烏。',
  gyms: [
    trialIlima,
    grandTrialHala,
    trialLana,
    trialKiawe,
    trialMallow,
    grandTrialOlivia,
    trialSophocles,
    trialAcerola,
    grandTrialNanu,
    grandTrialHapu,
  ],
  eliteFour: [eliteHala, eliteOlivia, eliteAcerola, eliteKahili],
  champion: championHau,
  league,
};
