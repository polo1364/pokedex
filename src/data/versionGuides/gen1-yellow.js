import { pm, rec, assertBattle, assertLeague } from './helpers.js';
import { yellowLeague } from './gen1-yellow-league.js';

const gymBrock = {
  order: 1,
  role: 'gym',
  name: '小剛',
  location: '尼比市',
  badge: '灰色徽章',
  badgeType: 'rock',
  party: [
    pm('小拳石', ['rock', 'ground'], 10),
    pm('大岩蛇', ['rock', 'ground'], 12),
  ],
  strategy: {
    level: '10～13',
    summary: '先補猴怪的踢倒或巴大蝶的念力；皮卡丘的電招對地面系無效。',
    tips: ['大岩蛇使用忍耐時避免連續攻擊，先調整狀態。'],
  },
  recommendedTeams: [
    rec('主力／替代擇一', '猴怪用格鬥招式；巴大蝶則用念力繞過岩石系的高防禦。', [
      { ...pm('猴怪', ['fighting']), obtain: '22 號道路草叢捕捉；可在小剛前取得。', moveNote: '踢倒：Lv.9，格鬥招式對岩石有效。' },
      { ...pm('巴大蝶', ['bug', 'flying']), obtain: '常青森林捕捉綠毛蟲，Lv.10 進化成巴大蝶。', moveNote: '念力：Lv.10；打這兩隻為普通傷害。' },
    ]),
  ],
};
assertBattle(gymBrock);

const gymMisty = {
  order: 2,
  role: 'gym',
  name: '小霞',
  location: '華藍市',
  badge: '藍色徽章',
  badgeType: 'water',
  party: [
    pm('海星星', ['water'], 18),
    pm('寶石海星', ['water', 'psychic'], 21),
  ],
  strategy: {
    level: '18～22',
    summary: '用電或草招打海星星與寶石海星；先把主力補滿血再迎戰寶石海星。',
    tips: ['寶石海星速度快，水招威力也高；低等級剋屬寵仍可能被打倒。'],
  },
  recommendedTeams: [
    rec('電系主力', '先用電擊，避免把未取得的十萬伏特當作必備。', [
      { ...pm('皮卡丘', ['electric']), obtain: '開局取得。', moveNote: '電擊即可上場；Lv.26 才學十萬伏特，不必為此硬練。' },
    ]),
    rec('草系替代', '已領取並培養妙蛙種子，可用草招補位；不必為這場重練整隊。', [
      { ...pm('妙蛙種子', ['grass', 'poison']), obtain: '皮卡丘親密度足夠時，向華藍市屋內 NPC 領取。', moveNote: 'Lv.13 藤鞭；不是到城裡就無條件送。' },
    ]),
  ],
};
assertBattle(gymMisty);

const gymLtSurge = {
  order: 3,
  role: 'gym',
  name: '馬志士',
  location: '枯葉市',
  badge: '橙色徽章',
  badgeType: 'electric',
  party: [
    pm('雷丘', ['electric'], 28),
  ],
  strategy: {
    level: '25～29',
    summary: '地鼠免疫電招，學會挖洞後以地面招式反擊。',
    tips: ['先在聖安奴號取得居合斬，並持有小霞徽章，才能砍樹進入道館。', '地面系能擋十萬伏特，但黃版雷丘的百萬噸重拳、百萬噸重踢仍能命中。'],
  },
  recommendedTeams: [
    rec('地面主力', '地鼠已足夠；若已進化成三地鼠可直接沿用。', [
      { ...pm('地鼠', ['ground']), obtain: '枯葉市東側的地鼠洞穴捕捉。', moveNote: '挖洞：Lv.19。' },
    ]),
  ],
};
assertBattle(gymLtSurge);

const gymErika = {
  order: 4,
  role: 'gym',
  name: '莉佳',
  location: '玉虹市',
  badge: '彩虹徽章',
  badgeType: 'grass',
  party: [
    pm('蔓藤怪', ['grass'], 30),
    pm('口呆花', ['grass', 'poison'], 32),
    pm('臭臭花', ['grass', 'poison'], 32),
  ],
  strategy: {
    level: '30～34',
    summary: '以飛行或火招打草系，並準備解麻與解毒道具。',
    tips: ['走草系對打容易拖長戰鬥；先確認主力有有效攻擊招式。'],
  },
  recommendedTeams: [
    rec('主力／替代擇一', '沒有火系御三家也能用大嘴雀通關。', [
      { ...pm('大嘴雀', ['normal', 'flying']), obtain: '22／3 號道路捕捉烈雀，Lv.20 進化。', moveNote: '使用啄；有學會其他飛行招式也可替換。' },
      { ...pm('火恐龍', ['fire']), obtain: '24 號道路領取小火龍，Lv.16 進化。', moveNote: '使用火花；火招對草系有效。' },
    ]),
  ],
};
assertBattle(gymErika);

const gymKoga = {
  order: 5,
  role: 'gym',
  name: '阿桔',
  location: '淺紅市',
  badge: '粉紅徽章',
  badgeType: 'poison',
  party: [
    pm('毛球', ['bug', 'poison'], 44),
    pm('毛球', ['bug', 'poison'], 46),
    pm('毛球', ['bug', 'poison'], 48),
    pm('摩魯蛾', ['bug', 'poison'], 50),
  ],
  strategy: {
    level: '45～50',
    summary: '以超能力招式打毒屬性；毛球與摩魯蛾也弱飛行、火。',
    tips: ['阿桔的徽章可解鎖場外衝浪；可視隊伍狀況先打阿桔或娜姿。', '摩魯蛾 Lv.50，留意影子分身、劇毒與精神強念；牠在這場沒有催眠招式。'],
  },
  recommendedTeams: [
    rec('超能力主力／替代擇一', '選一隻練好的超能力系即可；勇基拉不必交換成胡地。', [
      { ...pm('勇基拉', ['psychic']), obtain: '5／6 號道路捕捉凱西，Lv.16 進化；不需交換。', moveNote: '幻象光線；或在金黃市取得 TM29 精神強念。' },
      { ...pm('引夢貘人', ['psychic']), obtain: '11 號道路捕捉催眠貘，Lv.26 進化。', moveNote: '念力／精神強念；可用催眠術輔助，但命中不保證。' },
    ]),
  ],
};
assertBattle(gymKoga);

const gymSabrina = {
  order: 6,
  role: 'gym',
  name: '娜姿',
  location: '金黃市',
  badge: '黃金徽章',
  badgeType: 'psychic',
  party: [
    pm('凱西', ['psychic'], 50),
    pm('勇基拉', ['psychic'], 50),
    pm('胡地', ['psychic'], 50),
  ],
  strategy: {
    level: '45～50',
    summary: '以一般物理攻擊突破超能力系；卡比獸可作為主力。',
    tips: ['先解決西爾佛公司事件，再挑戰金黃道館。', '耿鬼帶毒屬性，會被超能力招式剋制，並非安全換入對策。初代幽靈屬性的相剋判定不能套用後世代規則。'],
  },
  recommendedTeams: [
    rec('物理主力／替代', '已有練好的拉達可補位；不要為了館別強制重練整隊。', [
      { ...pm('卡比獸', ['normal']), obtain: '救出富士老人取得寶可夢之笛，喚醒 12／16 號道路的卡比獸。', moveNote: '使用泰山壓頂等一般物理招式。' },
      { ...pm('拉達', ['normal']), obtain: '前期道路的小拉達 Lv.20 進化。', moveNote: '使用必殺門牙等一般物理招式；需留意自身血量。' },
    ]),
  ],
};
assertBattle(gymSabrina);

const gymBlaine = {
  order: 7,
  role: 'gym',
  name: '夏伯',
  location: '紅蓮島',
  badge: '深紅徽章',
  badgeType: 'fire',
  party: [
    pm('九尾', ['fire'], 48),
    pm('烈焰馬', ['fire'], 50),
    pm('風速狗', ['fire'], 54),
  ],
  strategy: {
    level: '49～54',
    summary: '用衝浪打火系；水伊布抗火，拉普拉斯則是受到普通傷害。',
    tips: ['先從寶可夢屋取得秘密鑰匙，才能打開紅蓮道館。'],
  },
  recommendedTeams: [
    rec('水系主力／替代擇一', '若已練好水箭龜，可直接用水箭龜衝浪，不必重練。', [
      { ...pm('水伊布', ['water']), obtain: '玉虹市大樓後門取得伊布，用百貨公司的水之石進化。', moveNote: 'HM03 衝浪：狩獵地帶取得；場外使用需阿桔徽章。' },
      { ...pm('拉普拉斯', ['water', 'ice']), obtain: '西爾佛公司 7F，擊敗勁敵後向職員領取 Lv.15 拉普拉斯，需再培養。', moveNote: '使用 HM03 衝浪；水／冰受到火招為普通傷害。' },
    ]),
  ],
};
assertBattle(gymBlaine);

const gymGiovanni = {
  order: 8,
  role: 'gym',
  name: '坂木',
  location: '常青市',
  badge: '綠色徽章',
  badgeType: 'ground',
  party: [
    pm('三地鼠', ['ground'], 50),
    pm('貓老大', ['normal'], 53),
    pm('尼多后', ['poison', 'ground'], 53),
    pm('尼多王', ['poison', 'ground'], 55),
    pm('鑽角犀獸', ['ground', 'rock'], 55),
  ],
  strategy: {
    level: '50～55',
    summary: '用衝浪打地面隊伍；貓老大是一般系，沒有水系弱點。',
    tips: ['取得其他七枚徽章後，常青道館才開放。', '黃版尼多王與尼多后都帶打雷；水系主力弱電，換入前先確認血量。', '尼多王、尼多后受到草招為普通傷害；鑽角犀獸弱水／草四倍、弱冰兩倍。'],
  },
  recommendedTeams: [
    rec('水系主力／替代擇一', '延續夏伯戰的水系主力即可，注意回復血量。', [
      { ...pm('水伊布', ['water']), obtain: '玉虹市大樓後門取得伊布，用百貨公司的水之石進化。', moveNote: 'HM03 衝浪：狩獵地帶取得；場外使用需阿桔徽章。' },
      { ...pm('拉普拉斯', ['water', 'ice']), obtain: '西爾佛公司 7F，擊敗勁敵後向職員領取 Lv.15 拉普拉斯，需再培養。', moveNote: '使用 HM03 衝浪；水／冰受到火招為普通傷害。' },
    ]),
  ],
};
assertBattle(gymGiovanni);

const eliteLorelei = {
  order: 1,
  role: 'eliteFour',
  name: '科拿',
  specialty: 'ice',
  party: [
    pm('白海獅', ['water', 'ice'], 54),
    pm('刺甲貝', ['water', 'ice'], 53),
    pm('呆殼獸', ['water', 'psychic'], 54),
    pm('迷唇姐', ['ice', 'psychic'], 56),
    pm('拉普拉斯', ['water', 'ice'], 56),
  ],
};
assertBattle(eliteLorelei);

const eliteBruno = {
  order: 2,
  role: 'eliteFour',
  name: '希巴',
  specialty: 'fighting',
  party: [
    pm('大岩蛇', ['rock', 'ground'], 53),
    pm('快拳郎', ['fighting'], 55),
    pm('飛腿郎', ['fighting'], 55),
    pm('大岩蛇', ['rock', 'ground'], 56),
    pm('怪力', ['fighting'], 58),
  ],
};
assertBattle(eliteBruno);

const eliteAgatha = {
  order: 3,
  role: 'eliteFour',
  name: '菊子',
  specialty: 'ghost',
  party: [
    pm('耿鬼', ['ghost', 'poison'], 56),
    pm('大嘴蝠', ['poison', 'flying'], 56),
    pm('鬼斯通', ['ghost', 'poison'], 55),
    pm('阿柏怪', ['poison'], 58),
    pm('耿鬼', ['ghost', 'poison'], 60),
  ],
};
assertBattle(eliteAgatha);

const eliteLance = {
  order: 4,
  role: 'eliteFour',
  name: '渡',
  specialty: 'dragon',
  party: [
    pm('暴鯉龍', ['water', 'flying'], 58),
    pm('哈克龍', ['dragon'], 56),
    pm('哈克龍', ['dragon'], 56),
    pm('化石翼龍', ['rock', 'flying'], 60),
    pm('快龍', ['dragon', 'flying'], 62),
  ],
};
assertBattle(eliteLance);

const championBlue = {
  role: 'champion',
  name: '青綠',
  notes: '依勁敵伊布進化分支選擇下方隊伍。',
  party: yellowLeague.battles.champion.variants[0].party,
};
assertBattle(championBlue);

const league = yellowLeague;
assertLeague(league);

export const yellowGuide = {
  id: 'yellow',
  title: '寶可夢 黃',
  displayGeneration: 1,
  status: 'complete',
  quickNavigation: true,
  gymSequenceMode: 'suggested',
  notes: '本頁列出建議挑戰路線，中段道館可調整先後；編號沿用地圖連結。等級為培養建議，不是通關保證。黃版使用初代規則；冠軍依勁敵伊布進化分為三種完整隊伍。',
  gyms: [
    gymBrock,
    gymMisty,
    gymLtSurge,
    gymErika,
    gymKoga,
    gymSabrina,
    gymBlaine,
    gymGiovanni,
  ],
  eliteFour: [eliteLorelei, eliteBruno, eliteAgatha, eliteLance],
  champion: championBlue,
  league,
};
