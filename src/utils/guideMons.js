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
 * 無法由名稱規則推得的寫法（值為 [pokemon id, 物種 id]）。
 * 攻略資料一律使用官方繁中譯名（由 tests/guide-board.test.js 把關），這裡只放不是物種名稱的項目：
 * 天星隊車是普隆隆姆（966）改裝的載具；究極奈克洛茲瑪 10157（奈克洛茲瑪 800）、解放胡帕 10086（胡帕 720）是形態。
 */
const ALIASES = {
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

/* ---------- 連到其他頁面 ---------- */

/** 圖鑑詳情的連結（形態一律連到所屬物種）。 */
export function monDetailHref(resolved) {
  return resolved?.speciesId ? `./?id=${resolved.speciesId}` : '';
}

/**
 * 隊伍分析頁的連結：去掉對不到與重複的成員，最多 6 隻；沒有任何成員時回傳空字串。
 * 帶上 battle 時，連結會多出這場的對手（vs=物種編號.屬性.屬性,…，屬性用攻略裡當代的寫法）、
 * 對手名稱與世代，隊伍頁就能顯示「對這場對戰」的分析。
 * @param {Array<{speciesId:number}|null>} resolvedList
 * @param {{ opponents?: Array<{speciesId?:number, types?:string[]}>, name?: string, generation?: number|null }|null} battle
 */
export function teamAnalysisHref(resolvedList, battle = null) {
  const ids = [];
  for (const mon of resolvedList || []) {
    if (mon?.speciesId && !ids.includes(mon.speciesId)) ids.push(mon.speciesId);
    if (ids.length >= 6) break;
  }
  if (!ids.length) return '';
  let href = `./team.html?t=${ids.join(',')}`;
  const foes = [];
  for (const foe of battle?.opponents || []) {
    if (!foe?.speciesId || !foe.types?.length) continue;
    const token = `${foe.speciesId}.${foe.types.join('.')}`;
    if (!foes.includes(token)) foes.push(token);
    if (foes.length >= 6) break;
  }
  if (foes.length) {
    href += `&vs=${foes.join(',')}`;
    if (battle.name) href += `&vsName=${encodeURIComponent(battle.name)}`;
    // 沒有世代的攻略（PokeMMO）沒有妖精屬性，和弱點標示一樣當成第 5 世代
    href += `&gen=${Number.isInteger(battle.generation) ? battle.generation : 5}`;
  }
  return href;
}

/**
 * 建立「把文字裡的招式名稱找出來」的函式。
 * 名稱長的優先（「十萬伏特」不會被拆成別的招式），只認兩個字以上的名稱。
 * @param {Array<{n:string, zh:string}>} moves 招式索引的項目
 * @param {string[]} ignore 不當成招式的詞：寶可夢名稱（「噴火駝」裡的「噴火」）與和招式同名的一般用語
 * @returns {(text:string) => Array<string | {text:string, slug:string}>} 依原順序排列的文字與招式片段
 */
export function createMoveMatcher(moves, ignore = []) {
  const slugByName = new Map();
  for (const move of moves || []) {
    if (move?.zh && move.n && Array.from(move.zh).length >= 2 && !slugByName.has(move.zh)) slugByName.set(move.zh, move.n);
  }
  if (!slugByName.size) return (text) => [String(text ?? '')];
  ignore.forEach((word) => slugByName.delete(word));
  // 忽略的詞也放進比對式（長的優先），整個詞被當成一般文字吃掉，裡面的招式名稱就不會被拆出來
  const names = [...new Set([...slugByName.keys(), ...ignore.filter(Boolean)])].sort((a, b) => b.length - a.length);
  if (!names.length) return (text) => [String(text ?? '')];
  const pattern = new RegExp(names.map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g');
  return (text) => {
    const source = String(text ?? '');
    const parts = [];
    let last = 0;
    for (const match of source.matchAll(pattern)) {
      const slug = slugByName.get(match[0]);
      if (!slug) continue;
      if (match.index > last) parts.push(source.slice(last, match.index));
      parts.push({ text: match[0], slug });
      last = match.index + match[0].length;
    }
    if (last < source.length) parts.push(source.slice(last));
    return parts;
  };
}
