import { pm, rec, assertBattle, assertLeague } from './helpers.js';
import { scarletVioletLeague } from './gen9-scarlet-violet-league.js';

const gymKaty = {
  order: 1,
  role: 'gym',
  name: '阿楓',
  location: '圓模鎮',
  badge: '道館徽章',
  badgeType: 'bug',
  notes: '帕底亞道館可自由順序挑戰；以下以等級由低到高建議路線排序。圓模道館需先完成道館測驗。',
  party: [
    pm('團珠蛛', ['bug'], 14),
    pm('豆蟋蟀', ['bug'], 14),
    pm('熊寶寶', ['normal'], 15),
  ],
  recommendedTeams: [
    rec('火飛剋制隊', '呆火鱷火系對蟲效果絕佳；刺梭魚水招補刀。建議等級 15 以上。', [
      pm('呆火鱷', ['fire']),
      pm('刺梭魚', ['water']),
      pm('新葉喵', ['grass']),
      pm('潤水鴨', ['water']),
      pm('布撥', ['electric']),
    ]),
    rec('岩石補刀隊', '南區可抓石丸子，岩石打蟲；布撥電系補刀熊寶寶。', [
      pm('呆火鱷', ['fire']),
      pm('石丸子', ['rock']),
      pm('布撥', ['electric']),
      pm('愛吃豚', ['normal']),
      pm('潤水鴨', ['water']),
    ]),
  ],
};
assertBattle(gymKaty);

const gymBrassius = {
  order: 2,
  role: 'gym',
  name: '寇沙',
  location: '深缽鎮',
  badge: '道館徽章',
  badgeType: 'grass',
  notes: '深缽道館道館測驗為尋找向日花怪；對戰為草系隊伍。',
  party: [
    pm('樹才怪', ['rock'], 15),
    pm('迷你芙', ['grass'], 16),
    pm('奧利紐', ['grass'], 17),
  ],
  recommendedTeams: [
    rec('火飛剋制隊', '呆火鱷或骨紋巨聲鱷火系對草效果絕佳；刺梭魚水招補刀。', [
      pm('呆火鱷', ['fire']),
      pm('刺梭魚', ['water']),
      pm('布撥', ['electric']),
      pm('愛吃豚', ['normal']),
      pm('新葉喵', ['grass']),
    ]),
    rec('毒系突破隊', '滋汁鼴進化塗標客毒系打草；火系穩定處理奧利紐。', [
      pm('呆火鱷', ['fire']),
      pm('塗標客', ['poison', 'normal']),
      pm('布撥', ['electric']),
      pm('刺梭魚', ['water']),
      pm('潤水鴨', ['water']),
    ]),
  ],
};
assertBattle(gymBrassius);

const gymIono = {
  order: 3,
  role: 'gym',
  name: '奇樹',
  location: '釀光市',
  badge: '道館徽章',
  badgeType: 'electric',
  party: [
    pm('電海燕', ['electric', 'flying'], 25),
    pm('電肚蛙', ['electric'], 25),
    pm('勒克貓', ['electric'], 30),
    pm('巴布土撥', ['electric', 'fighting'], 29),
  ],
  recommendedTeams: [
    rec('地面剋制隊', '海地鼠進化三海地鼠地面系免疫電；土王進化後亦穩定。', [
      pm('海地鼠', ['water']),
      pm('呆火鱷', ['fire']),
      pm('刺梭魚', ['water']),
      pm('新葉喵', ['grass']),
      pm('愛吃豚', ['normal']),
    ]),
    rec('草地面隊', '新葉喵草系打電肚蛙；地面系處理勒克貓與巴布土撥。', [
      pm('蒂蕾喵', ['grass']),
      pm('海地鼠', ['water']),
      pm('呆火鱷', ['fire']),
      pm('刺梭魚', ['water']),
      pm('布撥', ['electric']),
    ]),
  ],
};
assertBattle(gymIono);

const gymKofu = {
  order: 4,
  role: 'gym',
  name: '海岱',
  location: '玻瓶市',
  badge: '道館徽章',
  badgeType: 'water',
  party: [
    pm('輕身鱈', ['water'], 29),
    pm('海地鼠', ['water'], 30),
    pm('好勝毛蟹', ['fighting', 'ice'], 30),
  ],
  recommendedTeams: [
    rec('草電雙剋隊', '新葉喵或魔幻假面喵草系打輕身鱈；布撥電系穩定。', [
      pm('蒂蕾喵', ['grass']),
      pm('布撥', ['electric']),
      pm('呆火鱷', ['fire']),
      pm('刺梭魚', ['water']),
      pm('愛吃豚', ['normal']),
    ]),
    rec('電系核心隊', '巴布土撥電系打海地鼠；草系補刀好勝毛蟹冰屬性。', [
      pm('布土撥', ['electric', 'fighting']),
      pm('蒂蕾喵', ['grass']),
      pm('呆火鱷', ['fire']),
      pm('刺梭魚', ['water']),
      pm('墓仔狗', ['ghost']),
    ]),
  ],
};
assertBattle(gymKofu);

const gymLarry = {
  order: 5,
  role: 'gym',
  name: '青木',
  location: '錦匯鎮',
  badge: '道館徽章',
  badgeType: 'normal',
  notes: '青木同時為四天王（飛行系）；道館戰為一般系，四天王隊伍不同。',
  party: [
    pm('樹枕尾熊', ['normal'], 35),
    pm('土龍節節', ['normal'], 36),
    pm('姆克鷹', ['normal', 'flying'], 36),
  ],
  recommendedTeams: [
    rec('格鬥剋制隊', '布土撥或巴布土撥格鬥系對一般效果絕佳；墓揚犬鬼系補刀。', [
      pm('布土撥', ['electric', 'fighting']),
      pm('墓仔狗', ['ghost']),
      pm('呆火鱷', ['fire']),
      pm('刺梭魚', ['water']),
      pm('蒂蕾喵', ['grass']),
    ]),
    rec('鬼格鬥隊', '墓仔狗進化墓揚犬鬼系；格鬥系穩定突破樹枕尾熊與土龍節節。', [
      pm('墓揚犬', ['ghost']),
      pm('布土撥', ['electric', 'fighting']),
      pm('魔幻假面喵', ['grass', 'dark']),
      pm('刺梭魚', ['water']),
      pm('土王', ['poison', 'ground']),
    ]),
  ],
};
assertBattle(gymLarry);

const gymRyme = {
  order: 6,
  role: 'gym',
  name: '萊姆',
  location: '驚骨鎮',
  badge: '道館徽章',
  badgeType: 'ghost',
  party: [
    pm('謎擬Ｑ', ['ghost', 'fairy'], 41),
    pm('墓揚犬', ['ghost'], 41),
    pm('賽富豪', ['steel', 'ghost'], 42),
  ],
  recommendedTeams: [
    rec('惡鬼剋制隊', '魔幻假面喵惡系打鬼；骨紋巨聲鱷鬼火穩定突破墓揚犬。', [
      pm('魔幻假面喵', ['grass', 'dark']),
      pm('骨紋巨聲鱷', ['fire', 'ghost']),
      pm('布土撥', ['electric', 'fighting']),
      pm('刺梭魚', ['water']),
      pm('土王', ['poison', 'ground']),
    ]),
    rec('惡系核心隊', '惡系打鬼系效果絕佳；電系補刀謎擬Ｑ妖精屬性。', [
      pm('魔幻假面喵', ['grass', 'dark']),
      pm('布土撥', ['electric', 'fighting']),
      pm('骨紋巨聲鱷', ['fire', 'ghost']),
      pm('刺梭魚', ['water']),
      pm('奇麒麟', ['normal', 'psychic']),
    ]),
  ],
};
assertBattle(gymRyme);

const gymTulip = {
  order: 7,
  role: 'gym',
  name: '莉普',
  location: '焙固鎮',
  badge: '道館徽章',
  badgeType: 'psychic',
  party: [
    pm('奇麒麟', ['normal', 'psychic'], 45),
    pm('沙奈朵', ['psychic', 'fairy'], 45),
    pm('超能艷鴕', ['psychic'], 46),
  ],
  recommendedTeams: [
    rec('惡鬼剋制隊', '魔幻假面喵惡系打超能；墓揚犬鬼系穩定突破沙奈朵。', [
      pm('魔幻假面喵', ['grass', 'dark']),
      pm('墓揚犬', ['ghost']),
      pm('骨紋巨聲鱷', ['fire', 'ghost']),
      pm('布土撥', ['electric', 'fighting']),
      pm('刺梭魚', ['water']),
    ]),
    rec('鬼惡雙剋隊', '鬼系與惡系打超能效果絕佳；骨紋巨聲鱷暗影球補刀。', [
      pm('墓揚犬', ['ghost']),
      pm('魔幻假面喵', ['grass', 'dark']),
      pm('骨紋巨聲鱷', ['fire', 'ghost']),
      pm('布土撥', ['electric', 'fighting']),
      pm('土王', ['poison', 'ground']),
    ]),
  ],
};
assertBattle(gymTulip);

const gymGrusha = {
  order: 8,
  role: 'gym',
  name: '古魯夏',
  location: '霜抹山',
  badge: '道館徽章',
  badgeType: 'ice',
  party: [
    pm('幾何雪花', ['ice'], 47),
    pm('凍原熊', ['ice'], 47),
    pm('七夕青鳥', ['dragon', 'flying'], 48),
    pm('雪妖女', ['ice', 'ghost'], 48),
    pm('浩大鯨', ['ice'], 49),
  ],
  recommendedTeams: [
    rec('火格鬥隊', '骨紋巨聲鱷火系打冰效果絕佳；布土撥格鬥補刀浩大鯨。', [
      pm('骨紋巨聲鱷', ['fire', 'ghost']),
      pm('布土撥', ['electric', 'fighting']),
      pm('魔幻假面喵', ['grass', 'dark']),
      pm('墓揚犬', ['ghost']),
      pm('土王', ['poison', 'ground']),
    ]),
    rec('火鋼雙剋隊', '火系處理冰系全隊；電系打七夕青鳥飛行龍。', [
      pm('骨紋巨聲鱷', ['fire', 'ghost']),
      pm('布土撥', ['electric', 'fighting']),
      pm('刺梭魚', ['water']),
      pm('墓揚犬', ['ghost']),
      pm('狂歡浪舞鴨', ['water', 'fighting']),
    ]),
  ],
};
assertBattle(gymGrusha);

const eliteRika = {
  order: 1,
  role: 'eliteFour',
  name: '辛俐',
  specialty: 'ground',
  party: [
    pm('鯰魚王', ['water', 'ground'], 57),
    pm('噴火駝', ['fire', 'ground'], 57),
    pm('頓甲', ['ice', 'ground'], 57),
    pm('土龍弟弟', ['normal'], 57),
    pm('土王', ['poison', 'ground'], 58),
  ],
};
assertBattle(eliteRika);

const elitePoppy = {
  order: 2,
  role: 'eliteFour',
  name: '波琵',
  specialty: 'steel',
  party: [
    pm('鋼鎧鴉', ['flying', 'steel'], 58),
    pm('巨鍛匠', ['fairy', 'steel'], 58),
    pm('拖拖蚓', ['steel'], 59),
    pm('大鋼蛇', ['steel', 'ground'], 60),
  ],
};
assertBattle(elitePoppy);

const eliteLarry = {
  order: 3,
  role: 'eliteFour',
  name: '青木',
  specialty: 'flying',
  party: [
    pm('七夕青鳥', ['dragon', 'flying'], 59),
    pm('姆克鷹', ['normal', 'flying'], 59),
    pm('纏紅鶴', ['flying', 'fighting'], 59),
    pm('花舞鳥', ['fire', 'flying'], 60),
  ],
};
assertBattle(eliteLarry);

const eliteHassel = {
  order: 4,
  role: 'eliteFour',
  name: '八朔',
  specialty: 'dragon',
  party: [
    pm('麻花犬', ['fairy'], 59),
    pm('毒藻龍', ['poison', 'dragon'], 60),
    pm('雙斧戰龍', ['dragon'], 60),
    pm('蘋裹龍', ['grass', 'dragon'], 60),
    pm('戟脊龍', ['dragon', 'ice'], 61),
  ],
  notes: '紫版八朔最後一隻可能為豐蜜龍，屬性與剋制相同。',
};
assertBattle(eliteHassel);

const championGeeta = {
  role: 'champion',
  name: '也慈',
  specialty: 'psychic',
  party: [
    pm('超能艷鴕', ['psychic'], 61),
    pm('晶光花', ['rock', 'poison'], 61),
    pm('冰岩怪', ['ice', 'rock'], 62),
    pm('輕身鱈', ['water'], 62),
    pm('仆刀將軍', ['dark', 'steel'], 63),
  ],
};
assertBattle(championGeeta);

const league = scarletVioletLeague;
assertLeague(league);

export const scarletVioletGuide = {
  id: 'scarlet-violet',
  title: '寶可夢 朱／紫',
  displayGeneration: 9,
  status: 'complete',
  notes: '帕底亞道館可自由順序挑戰，攻略以等級建議路線排序。通關需完成勝利之路後挑戰四天王與首席冠軍也慈；妮莫為通關後宿敵對戰。碧綠掩面、藍之圓盤另見 DLC 書籤。',
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
