/**
 * 攻略裡的寶可夢只有中文名稱；這裡把名稱對應到圖片用的 pokemon id（純函式）。
 * 處理的寫法：
 *   「皮卡丘」                     → 直接比對
 *   「A → B → C」                  → 取最後一隻（進化後的樣子）
 *   「超級噴火龍X」「原始蓋歐卡」   → 超級進化／原始回歸形態（找不到該形態時用一般形態）
 *   「九尾（阿羅拉）」「阿羅拉臭臭泥」→ 地區形態
 *   「鬃岩狼人（黑夜）」            → 其他括號說明：用一般形態
 * 對不到的名稱（例如「你的御三家」）回傳 null，由畫面顯示佔位圖。
 */
const REGIONS = [
  ['阿羅拉', 'alola'], ['伽勒爾', 'galar'], ['洗翠', 'hisui'], ['帕底亞', 'paldea'],
];

/**
 * 攻略資料中與官方譯名不同的寫法，或無法由名稱規則推得的形態（值為 pokemon id）。
 * 物種：大比鳥 18、焰后蜥 758、勇基拉 64、火爆獸 157、超能豔鴕 956、青銅鐘 437、仆斬將軍 983、普隆隆姆 966
 * 形態：究極奈克洛茲瑪 10157（奈克洛茲瑪 800）、解放胡帕 10086（胡帕 720）
 */
const ALIASES = {
  比雕: [18, 18],
  焰後蜥: [758, 758],
  勇吉拉: [64, 64],
  火暴獸: [157, 157],
  超能艷鴕: [956, 956],
  銅鐘: [437, 437],
  仆刀將軍: [983, 983],
  天星隊車: [966, 966],
  究極奈克洛茲瑪: [10157, 800],
  解放胡帕: [10086, 720],
};

function alias(name) {
  const hit = ALIASES[name];
  return hit ? { id: hit[0], speciesId: hit[1] } : null;
}

export function createMonResolver(index) {
  const byName = new Map((index?.entries || []).map((e) => [e.zh, e]));
  const formsBySpecies = new Map();
  for (const form of index?.forms || []) {
    if (!formsBySpecies.has(form.sp)) formsBySpecies.set(form.sp, []);
    formsBySpecies.get(form.sp).push(form);
  }
  const base = (entry) => ({ id: entry.p || entry.id, speciesId: entry.id });
  const formOf = (entry, test) => {
    const form = (formsBySpecies.get(entry.id) || []).find(test);
    return form ? { id: form.id, speciesId: entry.id, img: form.img } : null;
  };

  return function resolve(rawName) {
    if (typeof rawName !== 'string') return null;
    let name = rawName.split('→').pop().trim();
    if (!name) return null;
    if (byName.has(name)) return base(byName.get(name));
    if (alias(name)) return alias(name);

    // 超級進化／原始回歸
    const mega = name.match(/^(超級|原始)(.+?)([XYZＸＹＺ])?$/);
    if (mega && byName.has(mega[2])) {
      const entry = byName.get(mega[2]);
      const letter = (mega[3] || '').replace('Ｘ', 'X').replace('Ｙ', 'Y').replace('Ｚ', 'Z').toLowerCase();
      const wanted = mega[1] === '原始' ? /-primal$/ : letter ? new RegExp(`-mega-${letter}$`) : /-mega$/;
      return formOf(entry, (f) => wanted.test(f.n)) || base(entry);
    }

    // 地區形態：「九尾（阿羅拉）」或「阿羅拉九尾」
    for (const [zh, slug] of REGIONS) {
      const species = name.includes(`（${zh}`) ? name.replace(/（.*$/, '').trim()
        : name.startsWith(zh) ? name.slice(zh.length).trim() : null;
      if (species && byName.has(species)) {
        const entry = byName.get(species);
        return formOf(entry, (f) => new RegExp(`-${slug}(-|$)`).test(f.n)) || base(entry);
      }
    }

    // 其他括號說明（形態、屬性、備註）：用一般形態
    const plain = name.replace(/[（(].*$/, '').trim();
    if (plain !== name && byName.has(plain)) return base(byName.get(plain));
    if (plain !== name && alias(plain)) return alias(plain);
    return null;
  };
}

const SPRITE_BASE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

/** 圖片網址；resolved.img 為索引記錄的替代路徑（空字串代表沒有圖片）。 */
export function monImageUrl(resolved) {
  if (!resolved) return '';
  if (resolved.img !== undefined) {
    if (!resolved.img) return '';
    return /^https?:/.test(resolved.img) ? resolved.img : `${SPRITE_BASE}/${resolved.img}`;
  }
  return `${SPRITE_BASE}/other/official-artwork/${resolved.id}.png`;
}

const VERSION_TAGS = [
  ['紅寶石', 'ruby'], ['藍寶石', 'sapphire'], ['綠寶石', 'emerald'], ['火紅', 'red'], ['葉綠', 'green'],
  ['心金', 'gold'], ['魂銀', 'silver'], ['水晶', 'crystal'], ['鑽石', 'diamond'], ['珍珠', 'pearl'], ['白金', 'platinum'],
  ['太陽', 'sun'], ['月亮', 'moon'], ['究極之日', 'sun'], ['究極之月', 'moon'],
  ['紅', 'red'], ['藍', 'blue'], ['黃', 'yellow'], ['綠', 'green'], ['金', 'gold'], ['銀', 'silver'],
  ['黑2', 'black'], ['白2', 'white'], ['黑', 'black'], ['白', 'white'], ['X', 'x'], ['Y', 'y'],
  ['劍', 'sword'], ['盾', 'shield'], ['朱', 'scarlet'], ['紫', 'violet'],
];

/**
 * 取得方式開頭若是「紅版：…」這種版本限定寫法，拆出版本標籤。
 * @returns {{ tag: string, key: string, rest: string } | null}
 */
export function splitVersionPrefix(text) {
  const m = String(text || '').match(/^([^：:，。；\s]{1,5}?)版?[：:]\s*(.+)$/);
  if (!m) return null;
  const hit = VERSION_TAGS.find(([zh]) => zh === m[1]);
  if (!hit) return null;
  return { tag: `${m[1]}版`, key: hit[1], rest: m[2] };
}
