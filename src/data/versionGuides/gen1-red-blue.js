import { pm, rec, assertBattle, assertLeague } from './helpers.js';
import { redBlueLeague } from './gen1-red-blue-league.js';

const brock = {
  order: 1,
  role: 'gym',
  name: '小剛',
  location: '尼比市',
  badge: '灰色徽章',
  badgeType: 'rock',
  party: [
    pm('小拳石', ['rock', 'ground'], 12),
    pm('大岩蛇', ['rock', 'ground'], 14),
  ],
  strategy: {
    level: '12～15',
    summary: '水、草招式打岩石／地面有四倍效果；小火龍開局請補一隻對策。',
    tips: ['不必先把御三家練到進化；重點是學會有效招式。'],
  },
  recommendedTeams: [
    rec('水／草開局', '使用自己選到的那一隻即可，不需要集齊兩隻御三家。', [
      { ...pm('妙蛙種子', ['grass', 'poison']), obtain: '開局選擇妙蛙種子。', moveNote: '藤鞭：Lv.13。' },
      { ...pm('傑尼龜', ['water']), obtain: '開局選擇傑尼龜。', moveNote: '泡沫：Lv.8。' },
    ]),
    rec('小火龍開局的替代', '先培養這隻補位，避免只靠火招硬打。', [
      { ...pm('巴大蝶', ['bug', 'flying']), obtain: '常青森林捕捉綠毛蟲，Lv.10 進化成巴大蝶。', moveNote: '念力：Lv.12；打這兩隻為普通傷害。' },
    ]),
  ],
};
assertBattle(brock);

const misty = {
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
      { ...pm('皮卡丘', ['electric']), obtain: '常青森林低機率出現。', moveNote: '使用電擊；此時尚未取得馬志士的 TM24。' },
    ]),
    rec('草系替代（依版本選一隻）', '已有合適的草系就不必額外捕捉皮卡丘。', [
      { ...pm('走路草', ['grass', 'poison']), obtain: '紅版：24／25 號道路。', moveNote: '使用吸取；可進化後沿用草招。' },
      { ...pm('喇叭芽', ['grass', 'poison']), obtain: '藍版：24／25 號道路。', moveNote: '使用藤鞭；可進化後沿用草招。' },
    ]),
  ],
};
assertBattle(misty);

const surge = {
  order: 3,
  role: 'gym',
  name: '馬志士',
  location: '枯葉市',
  badge: '橙色徽章',
  badgeType: 'electric',
  party: [
    pm('霹靂電球', ['electric'], 21),
    pm('皮卡丘', ['electric'], 18),
    pm('雷丘', ['electric'], 24),
  ],
  strategy: {
    level: '22～26',
    summary: '地鼠免疫電招，學會挖洞後以地面招式反擊。',
    tips: ['先在聖安奴號取得居合斬，並持有小霞徽章，才能砍樹進入道館。', '地面系能擋電招，但霹靂電球的音爆仍會造成 20 點固定傷害。紅／藍雷丘沒有一般屬性的傷害招式。'],
  },
  recommendedTeams: [
    rec('地面主力', '地鼠已足夠；若已進化成三地鼠可直接沿用。', [
      { ...pm('地鼠', ['ground']), obtain: '枯葉市東側的地鼠洞穴捕捉。', moveNote: '挖洞：Lv.19。' },
    ]),
  ],
};
assertBattle(surge);

const erika = {
  order: 4,
  role: 'gym',
  name: '莉佳',
  location: '玉虹市',
  badge: '彩虹徽章',
  badgeType: 'grass',
  party: [
    pm('大食花', ['grass', 'poison'], 29),
    pm('蔓藤怪', ['grass'], 24),
    pm('霸王花', ['grass', 'poison'], 29),
  ],
  strategy: {
    level: '28～32',
    summary: '以飛行或火招打草系，並準備解麻與解毒道具。',
    tips: ['走草系對打容易拖長戰鬥；先確認主力有有效攻擊招式。'],
  },
  recommendedTeams: [
    rec('主力／替代擇一', '沒有火系御三家也能用大嘴雀通關。', [
      { ...pm('大嘴雀', ['normal', 'flying']), obtain: '22／3 號道路捕捉烈雀，Lv.20 進化。', moveNote: '使用啄；有學會其他飛行招式也可替換。' },
      { ...pm('火恐龍', ['fire']), obtain: '限小火龍開局，Lv.16 進化。', moveNote: '使用火花；火招對草系有效。' },
    ]),
  ],
};
assertBattle(erika);

const sabrina = {
  order: 5,
  role: 'gym',
  name: '娜姿',
  location: '金黃市',
  badge: '黃金徽章',
  badgeType: 'psychic',
  party: [
    pm('勇基拉', ['psychic'], 38),
    pm('魔牆人偶', ['psychic'], 37),
    pm('摩魯蛾', ['bug', 'poison'], 38),
    pm('胡地', ['psychic'], 43),
  ],
  strategy: {
    level: '38～43',
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
assertBattle(sabrina);

const koga = {
  order: 6,
  role: 'gym',
  name: '阿桔',
  location: '淺紅市',
  badge: '粉紅徽章',
  badgeType: 'poison',
  party: [
    pm('瓦斯彈', ['poison'], 37),
    pm('臭臭泥', ['poison'], 39),
    pm('瓦斯彈', ['poison'], 37),
    pm('雙彈瓦斯', ['poison'], 43),
  ],
  strategy: {
    level: '38～43',
    summary: '以超能力招式打毒屬性；準備解毒與回復道具。',
    tips: ['阿桔的徽章可解鎖場外衝浪；可視隊伍狀況先打阿桔或娜姿。', '雙彈瓦斯會自爆；別讓殘血主力硬撐。'],
  },
  recommendedTeams: [
    rec('超能力主力／替代擇一', '選一隻練好的超能力系即可；勇基拉不必交換成胡地。', [
      { ...pm('勇基拉', ['psychic']), obtain: '24／25 號道路捕捉凱西，Lv.16 進化；不需交換。', moveNote: '幻象光線；或在金黃市取得 TM29 精神強念。' },
      { ...pm('引夢貘人', ['psychic']), obtain: '11 號道路捕捉催眠貘，Lv.26 進化。', moveNote: '念力／精神強念；可用催眠術輔助，但命中不保證。' },
    ]),
  ],
};
assertBattle(koga);

const blaine = {
  order: 7,
  role: 'gym',
  name: '夏伯',
  location: '紅蓮島',
  badge: '深紅徽章',
  badgeType: 'fire',
  party: [
    pm('卡蒂狗', ['fire'], 42),
    pm('小火馬', ['fire'], 40),
    pm('烈焰馬', ['fire'], 42),
    pm('風速狗', ['fire'], 47),
  ],
  strategy: {
    level: '43～48',
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
assertBattle(blaine);

const giovanni = {
  order: 8,
  role: 'gym',
  name: '坂木',
  location: '常青市',
  badge: '綠色徽章',
  badgeType: 'ground',
  party: [
    pm('獨角犀牛', ['ground', 'rock'], 45),
    pm('三地鼠', ['ground'], 42),
    pm('尼多后', ['poison', 'ground'], 44),
    pm('尼多王', ['poison', 'ground'], 45),
    pm('鑽角犀獸', ['ground', 'rock'], 50),
  ],
  strategy: {
    level: '45～50',
    summary: '用衝浪打地面隊伍；水招可剋制全隊。',
    tips: ['取得其他七枚徽章後，常青道館才開放。', '尼多王、尼多后受到草招為普通傷害；鑽角犀獸弱水／草四倍、弱冰兩倍。'],
  },
  recommendedTeams: [
    rec('水系主力／替代擇一', '延續夏伯戰的水系主力即可，注意回復血量。', [
      { ...pm('水伊布', ['water']), obtain: '玉虹市大樓後門取得伊布，用百貨公司的水之石進化。', moveNote: 'HM03 衝浪：狩獵地帶取得；場外使用需阿桔徽章。' },
      { ...pm('拉普拉斯', ['water', 'ice']), obtain: '西爾佛公司 7F，擊敗勁敵後向職員領取 Lv.15 拉普拉斯，需再培養。', moveNote: '使用 HM03 衝浪；水／冰受到火招為普通傷害。' },
    ]),
  ],
};
assertBattle(giovanni);

const lorelei = {
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
assertBattle(lorelei);

const bruno = {
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
assertBattle(bruno);

const agatha = {
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
assertBattle(agatha);

const lance = {
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
assertBattle(lance);

const champion = {
  role: 'champion',
  name: '青綠',
  party: redBlueLeague.battles.champion.variants[0].party,
};
assertBattle(champion);

const league = redBlueLeague;
assertLeague(league);

export const redBlueGuide = {
  id: 'red-blue',
  title: '寶可夢 紅／藍',
  displayGeneration: 1,
  status: 'complete',
  quickNavigation: true,
  gymSequenceMode: 'suggested',
  notes: '本頁列出建議挑戰路線，中段道館可調整先後；編號沿用地圖連結。等級為培養建議，不是通關保證。紅／藍使用初代規則；冠軍依玩家御三家分為三種完整隊伍。',
  gyms: [brock, misty, surge, erika, sabrina, koga, blaine, giovanni],
  eliteFour: [lorelei, bruno, agatha, lance],
  champion,
  league,
};
