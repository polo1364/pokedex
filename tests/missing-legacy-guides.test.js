import test from 'node:test';
import assert from 'node:assert/strict';
import { goldSilverKantoExpansion as gs, crystalKantoExpansion as c } from '../src/data/versionGuides/gen2-kanto.js';
import { heartgoldSoulsilverKantoExpansion as hg } from '../src/data/versionGuides/gen4-heartgold-soulsilver-kanto.js';
import { platinumDistortionWorldExpansion as dw } from '../src/data/versionGuides/gen4-platinum-distortion-world.js';
import { platinumBattleFrontierExpansion as bf } from '../src/data/versionGuides/gen4-platinum-battle-frontier.js';
import { diamondPearlBattleZoneExpansion as dp } from '../src/data/versionGuides/gen4-diamond-pearl-battle-zone.js';
import { brilliantDiamondShiningPearlBattleZoneExpansion as bd } from '../src/data/versionGuides/gen8-brilliant-diamond-shining-pearl-battle-zone.js';
import { omegaRubyAlphaSapphireDeltaEpisodeExpansion as de } from '../src/data/versionGuides/gen6-omega-ruby-alpha-sapphire-delta-episode.js';
import { ultraSunUltraMoonUltraWormholeExpansion as uw } from '../src/data/versionGuides/gen7-ultra-sun-ultra-moon-ultra-wormhole.js';
const guides={gs,c,hg,dw,bf,dp,bd,de,uw};
for(const [name,g] of Object.entries(guides)) test(`${name}: standalone guide schema, steps, battle cards and sources`,()=>{
 assert.ok(g.prerequisites[0].rows.length>=3);
 const chapters=g.sections.filter(s=>s.type==='island');
 assert.ok(chapters.length>=4);
 assert.equal(new Set(chapters.map(s=>s.number)).size,chapters.length);
 assert.ok(chapters.every(s=>s.flows.length>=2 && s.intro));
 assert.equal(new Set(g.gyms.map(b=>b.order)).size,g.gyms.length);
 for(const b of g.gyms){assert.ok(b.party.length>=1&&b.party.length<=6);assert.ok(b.notes&&b.recommendedTeams.length);for(const p of b.party)assert.ok(Number.isInteger(p.level)||/隨機/.test(p.name));}
 assert.ok(g.sources.every(s=>s.title&&s.url.startsWith('https://')));
 assert.ok(!/TODO|待補|開發中/.test(JSON.stringify(g)));
});
test('GSC and HGSS Kanto have eight complete distinct first-challenge gym rosters and Red',()=>{
 assert.equal(gs.gyms.filter(b=>b.role==='gym').length,8);assert.equal(hg.gyms.filter(b=>b.role==='gym').length,8);
 assert.deepEqual(gs.gyms[0].party.map(p=>p.level),[44,40,40,40,45]);assert.deepEqual(hg.gyms[0].party.map(p=>p.level),[51,47,47,47,53]);
 assert.deepEqual(gs.gyms.at(-1).party.map(p=>p.level),[81,73,75,77,77,77]);assert.deepEqual(hg.gyms.at(-1).party.map(p=>p.level),[88,84,84,84,80,82]);
 assert.equal(c.gyms.flatMap(b=>b.recommendedTeams).flatMap(t=>t.pokemon).some(p=>p.name==='電龍'),false);
});
test('BDSP Palmer master variants are distinct complete teams, not DP reuse',()=>{
 assert.equal(bd.gyms.length,6);assert.equal(dp.gyms.length,3);
 assert.deepEqual(bd.gyms.slice(3).map(b=>b.party.map(p=>p.name)),[['快龍','席多藍恩','克雷色利亞'],['雷吉奇卡斯','快龍','美納斯'],['席多藍恩','超甲狂犀','快龍']]);
 assert.match(bd.gyms[1].notes,/輔助力量/);assert.match(bd.gyms[0].notes,/多重鱗片/);
});
test('Platinum frontier uses its own thresholds and random bosses',()=>{
 const text=JSON.stringify(bf);assert.match(text,/170/);assert.match(text,/49/);assert.equal(bf.gyms.filter(b=>b.party[0].name.startsWith('隨機')).length,2);
 assert.deepEqual(dw.gyms[0].party.map(p=>p.level),[45,46,46,47,48]);assert.equal(dw.gyms[1].party[0].level,47);
});
test('Delta major battles include full version-specific doubles, Wallace and Zinnia',()=>{
 assert.equal(de.gyms.find(b=>b.name==='米可利').party.length,6);
 assert.equal(de.gyms.find(b=>b.name==='希嘉娜：傳承者決戰').party.length,5);
 assert.deepEqual(de.gyms.filter(b=>b.name.includes('與手下')).map(b=>b.party.map(p=>p.level)),[[51,55],[51,55]]);
 assert.equal(de.gyms.at(-1).party[0].level,80);
});
test('Wormholes contain all 37 legendary species, 7 Ultra Beasts, and required forest trainers',()=>{
 const legends=uw.gyms.filter(b=>b.role==='legendary');assert.equal(legends.length,44);
 assert.equal(new Set(legends.map(b=>b.party[0].name)).size,44);assert.ok(legends.every(b=>b.party[0].level===60));
 assert.equal(uw.gyms.filter(b=>b.name.startsWith('究極森林使者')).length,2);
 assert.match(uw.gyms.find(b=>b.name==='水君').notes,/雷公＋炎帝/);
 assert.match(uw.gyms.find(b=>b.name==='騎拉帝納').notes,/帝牙盧卡＋帕路奇亞/);
});
