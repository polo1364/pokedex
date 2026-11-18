import { readFileSync, writeFileSync } from 'node:fs';
import { pokemmoGuide } from '../src/data/versionGuides/pokemmo/index.js';

const path = new URL('../public/atlas/atlas-data.json', import.meta.url);
const atlas = JSON.parse(readFileSync(path, 'utf8'));
const baseMaps = {
  kanto: 'firered-leafgreen', johto: 'heartgold-soulsilver', hoenn: 'emerald',
  sinnoh: 'platinum', unova: 'black-white',
};
const firstLeague = { kanto: 11, johto: 13, hoenn: 13, sinnoh: 13, unova: 11 };
// Indoor places share their containing town's anchor, never invented coordinates.
const aliases = {
  kanto: { "Bill's House": 'Cerulean City', 'Rocket Hideout': 'Celadon City', 'Safari Zone': 'Fuchsia City', 'Silph Co.': 'Saffron City', 'Pokemon Mansion': 'Cinnabar Island' },
  johto: { 'Sprout Tower': 'Violet City', 'Slowpoke Well': 'Azalea Town', 'Burned Tower': 'Ecruteak City', 'Bell Tower': 'Ecruteak City', 'Tohjo Falls': 'Tohjo Falls (Kanto)', 'Victory Road': 'Tohjo Falls (Kanto)', 'Indigo Plateau': 'Tohjo Falls (Kanto)' },
  hoenn: { 'Weather Institute': 'Fortree City', 'Cave of Origin': 'Cave Of Origin', 'Ever Grande City': 'Evergrande City' },
  sinnoh: { 'Oreburgh Mine': 'Oreburgh City', 'Valley Windworks': 'Valley Windwords', 'Galactic HQ': 'Veilstone City', 'Spear Pillar': 'Mt. Coronet' },
  unova: { 'Cold Storage': 'Driftveil City' },
};
const report = [];
for (const [partId, baseId] of Object.entries(baseMaps)) {
  const part = pokemmoGuide.expansions.find(e => e.id === partId);
  const map = structuredClone(atlas.maps[baseId]);
  map.id = `pokemmo-${partId}`;
  map.title = part.title;
  map.version = 'PokeMMO';
  map.guidePart = partId;
  map.sourceMap = baseId;
  map.scope = '沿用原作地區地形定位；PokeMMO 事件、通行條件及戰鬥另依本攻略。';
  map.note = '圖形是地區總覽，不代表每個原作設施均已在 PokeMMO 開放。已核對的主線地點可跳轉；其餘位置僅供地形參考。';
  for (const point of [...map.locations, ...map.routes]) {
    const gymOrder = point.gymOrder;
    // Retain geometry and geographic provenance, discard cartridge gameplay.
    for (const key of ['gymOrder', 'battleRef', 'battleRefs', 'guidePart', 'guideSection', 'guideSectionPrefix', 'guideLinks', 'leader', 'description', 'places', 'type']) delete point[key];
    const chapters = part.sections.filter(s => s.mapPlaces?.some(name => (aliases[partId][name] || name) === point.english));
    point.guideLinks = chapters.map(s => ({ label: s.title, guidePart: partId, guideSection: s.number }));
    const chapter = chapters[0];
    const battle = gymOrder ? part.gyms.find(b => b.role === 'gym' && b.order === gymOrder) : null;
    point.description = '地形參考點；PokeMMO 的開放條件及事件以本攻略與遊戲內提示為準。';
    if (chapter) {
      point.guidePart = partId;
      point.guideSection = chapter.number;
      point.description = chapter.intro;
    }
    if (battle) {
      point.guidePart = partId;
      point.battleRef = `expansion:${partId}:${battle.order}`;
      point.leader = battle.name;
      if (battle.specialty) point.type = battle.specialty;
      point.description = `首次道館：${battle.name}。${battle.strategy.summary}`;
    } else if (point.kind === 'league') {
      point.guidePart = partId;
      point.battleRef = `expansion:${partId}:${firstLeague[partId]}`;
      point.description = partId === 'unova' ? '首次四天王後前往 N 的城堡；首次主線不打阿戴克。' : '首次聯盟入口；與通關後再戰資料分開。';
    }
    if (partId === 'johto' && point.english === 'Tohjo Falls (Kanto)') {
      point.description = '東行都城瀑布後接26號道路、冠軍之路及石英高原；此點表示出發通路，非聯盟所在地。';
      point.guideLinks.push({ label: '城都首次聯盟戰鬥', guidePart: partId, battleRef: `expansion:johto:${firstLeague.johto}` });
    }
    if (point.battleRef) delete point.guideSection;
  }
  atlas.maps[map.id] = map;
  report.push({ part: partId, points: map.locations.length, linked: map.locations.filter(p => p.guidePart).length,
    unmatched: part.sections.flatMap(s => s.mapPlaces).filter(name => !map.locations.some(p => p.english === (aliases[partId][name] || name))) });
}
atlas.versionMaps.pokemmo = Object.keys(baseMaps).map(part => `pokemmo-${part}`);
atlas.versions = atlas.versions.filter(v => v.id !== 'pokemmo');
atlas.versions.push({ id: 'pokemmo', title: 'PokeMMO', displayGeneration: null, status: 'complete' });
writeFileSync(path, JSON.stringify(atlas, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
