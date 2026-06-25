import { fetchJson } from '../api/client.js';
import { getChineseName } from './i18n.js';
import { store } from '../state/store.js';

const varietyLabelCache = new Map();

/** 完整形態譯名（台灣繁中／正作用語） */
const POKEMON_FORM_LABELS = {
  koraidon: '頂尖型態',
  'koraidon-limited-build': '限制型態',
  'koraidon-sprinting-build': '衝刺型態',
  'koraidon-swimming-build': '游泳型態',
  'koraidon-gliding-build': '滑翔型態',
  miraidon: '終極型態',
  'miraidon-low-power-mode': '節能型態',
  'miraidon-drive-mode': '駕駛型態',
  'miraidon-aquatic-mode': '浮游型態',
  'miraidon-glide-mode': '滑翔型態',
};

/** 依寶可夢 ID 的形態譯名（同步顯示用） */
const POKEMON_ID_LABELS = {
  1007: '頂尖型態', 10264: '限制型態', 10265: '衝刺型態', 10266: '游泳型態', 10267: '滑翔型態',
  1008: '終極型態', 10268: '節能型態', 10269: '駕駛型態', 10270: '浮游型態', 10271: '滑翔型態',
};

/** 形態後綴後備譯名（API 無 form_names 時） */
const FORM_SUFFIX_CN = {
  heat: '加熱', wash: '清洗', frost: '冰霜', fan: '旋轉', mow: '切割',
  plant: '草木', sandy: '砂土', trash: '垃圾',
  'red-striped': '紅條紋', 'blue-striped': '藍條紋', 'white-striped': '白條紋',
  'baile-style': '熱辣熱辣風格', 'pom-pom-style': '啪滋啪滋風格',
  'pau-style': '呼拉呼拉風格', 'sensu-style': '輕盈輕盈風格',
  'midday-form': '白晝', 'midnight-form': '黑夜', 'dusk-form': '黃昏',
  'red-meteor': '紅色核心', 'orange-meteor': '橙色核心', 'yellow-meteor': '黃色核心',
  'green-meteor': '綠色核心', 'blue-meteor': '藍色核心', 'indigo-meteor': '靛色核心',
  'violet-meteor': '紫色核心', 'red-core': '紅色核心', 'orange-core': '橙色核心',
  'yellow-core': '黃色核心', 'green-core': '綠色核心', 'blue-core': '藍色核心',
  'indigo-core': '靛色核心', 'violet-core': '紫色核心',
  'ice-face': '結凍頭', 'noice-face': '解凍頭',
  'full-belly-mode': '飽腹花紋', 'hangry-mode': '空腹花紋',
  'male': '雄性', female: '雌性',
  'single-strike': '一擊', 'rapid-strike': '連擊',
  'amped': '高調', 'low-key': '低調',
  gmax: '超極巨化',
  'rock-star': '搖滾巨星', belle: '貴婦', 'pop-star': '偶像', phd: '博士',
  libre: '面罩摔角手', cosplay: '扮裝', starter: '搭檔',
  'original-cap': '初始帽子', 'hoenn-cap': '豐緣帽子', 'sinnoh-cap': '神奧帽子',
  'unova-cap': '合眾帽子', 'kalos-cap': '卡洛斯帽子', 'alola-cap': '阿羅拉帽子',
  'partner-cap': '搭檔帽子', 'world-cap': '世界帽子',
  'limited-build': '限制型態', 'sprinting-build': '衝刺型態',
  'swimming-build': '游泳型態', 'gliding-build': '滑翔型態',
  'low-power-mode': '節能型態', 'drive-mode': '駕駛型態',
  'aquatic-mode': '浮游型態', 'glide-mode': '滑翔型態',
  'apex-build': '頂尖型態', 'ultimate-mode': '終極型態',
};

function isZhHant(lang) {
  return lang?.toLowerCase() === 'zh-hant';
}

async function getFormLabelFromApi(pokemon) {
  const formRef = pokemon.forms?.[0];
  if (!formRef?.url) return null;
  try {
    const form = await fetchJson(formRef.url, `pokemon_form_${formRef.name}`);
    const zh = form.form_names?.find((n) => isZhHant(n.language?.name));
    return zh?.name || null;
  } catch {
    return null;
  }
}

function getFormLabelFromName(pokemonName, speciesName) {
  if (POKEMON_FORM_LABELS[pokemonName]) return POKEMON_FORM_LABELS[pokemonName];
  if (pokemonName === speciesName) return '一般';
  if (!pokemonName.startsWith(`${speciesName}-`)) return pokemonName;
  const suffix = pokemonName.slice(speciesName.length + 1);
  return FORM_SUFFIX_CN[suffix] || suffix.replace(/-/g, ' ');
}

export function getFormLabelByPokemonId(pokemonId, pokemonName, speciesName) {
  if (POKEMON_ID_LABELS[pokemonId]) return POKEMON_ID_LABELS[pokemonId];
  if (pokemonName && POKEMON_FORM_LABELS[pokemonName]) return POKEMON_FORM_LABELS[pokemonName];
  if (pokemonName && speciesName) return getFormLabelFromName(pokemonName, speciesName);
  return null;
}

/** 取得單一形態的繁中顯示名稱 */
export async function getPokemonFormLabel(pokemon, speciesData) {
  const speciesName = speciesData?.name || pokemon.species?.name;
  const fromApi = await getFormLabelFromApi(pokemon);
  if (fromApi) return fromApi;
  if (speciesName) return getFormLabelFromName(pokemon.name, speciesName);
  return getChineseName(speciesData?.names) || pokemon.name;
}

/** 同步產生形態按鈕（不發 API，開啟模態框時立即顯示） */
export function getVarietyButtonsSync(speciesData, currentPokemonId) {
  const varieties = speciesData?.varieties || [];
  if (varieties.length <= 1) return [];

  const speciesName = speciesData.name;
  const cached = varietyLabelCache.get(speciesData.id);

  return varieties.map((v, i) => {
    const pokemonId = parseInt(v.pokemon.url.split('/').slice(-2, -1)[0], 10);
    const fromCache = cached?.find((b) => b.pokemonId === pokemonId);
    if (fromCache) {
      return { ...fromCache, isActive: pokemonId === currentPokemonId };
    }
    const known = store.allPokemon.find((p) => p.id === pokemonId);
    const label = getFormLabelByPokemonId(pokemonId, known?.name, speciesName)
      || (known ? getFormLabelFromName(known.name, speciesName) : null)
      || `形態 ${i + 1}`;
    return {
      url: v.pokemon.url,
      pokemonId,
      label,
      isActive: pokemonId === currentPokemonId,
    };
  });
}

/** 載入物種所有形態按鈕資料（含 API 繁中譯名，結果會快取） */
export async function getVarietyButtons(speciesData, currentPokemonId) {
  const varieties = speciesData?.varieties || [];
  if (varieties.length <= 1) return [];

  const cached = varietyLabelCache.get(speciesData.id);
  if (cached) {
    return cached.map((b) => ({ ...b, isActive: b.pokemonId === currentPokemonId }));
  }

  const buttons = await Promise.all(varieties.map(async (v, i) => {
    const pokemonId = parseInt(v.pokemon.url.split('/').slice(-2, -1)[0], 10);
    const pokemon = await fetchJson(v.pokemon.url, `pokemon_${pokemonId}`);
    const label = await getPokemonFormLabel(pokemon, speciesData);
    return { url: v.pokemon.url, pokemonId, label };
  }));

  varietyLabelCache.set(speciesData.id, buttons);
  return buttons.map((b) => ({ ...b, isActive: b.pokemonId === currentPokemonId }));
}
