import { fetchJson, runPool } from '../api/client.js';
import { BASE_URL } from '../config.js';
import { getChineseName } from './i18n.js';

function slugMatchesQuery(slug, query) {
  const q = query.toLowerCase();
  return slug.includes(q) || slug.replace(/-/g, ' ').includes(q);
}

function nameMatchesQuery(name, query) {
  if (!name || name === '（無繁中譯名）') return false;
  return name.toLowerCase().includes(query.toLowerCase());
}

export function initFilterMeta(pokemon) {
  const heldSlugs = (pokemon?.held_items || []).map((h) => h.item.name);
  const machineSlugs = (pokemon?.moves || [])
    .filter((m) => m.version_group_details?.some((v) => v.move_learn_method?.name === 'machine'))
    .map((m) => m.move.name);
  return {
    heldSlugs,
    machineSlugs,
    heldNames: [],
    machineNames: [],
    namesLoaded: false,
  };
}

export function ensureFilterMeta(entry) {
  if (!entry?.pokemon) return null;
  if (!entry.filterMeta) entry.filterMeta = initFilterMeta(entry.pokemon);
  return entry.filterMeta;
}

export async function enrichFilterMeta(entry) {
  const meta = ensureFilterMeta(entry);
  if (!meta || meta.namesLoaded) return;

  const heldNames = await runPool(meta.heldSlugs, async (slug) => {
    try {
      const data = await fetchJson(`${BASE_URL}/item/${slug}`, `item_${slug}`);
      return getChineseName(data.names);
    } catch {
      return '';
    }
  });
  meta.heldNames = heldNames.filter(Boolean);

  const machineNames = await runPool(meta.machineSlugs, async (slug) => {
    try {
      const data = await fetchJson(`${BASE_URL}/move/${slug}`, `move_${slug}`);
      return getChineseName(data.names);
    } catch {
      return '';
    }
  });
  meta.machineNames = machineNames.filter(Boolean);
  meta.namesLoaded = true;
}

export function matchesItemFilter(entry, query) {
  const q = query?.trim().toLowerCase();
  if (!q) return true;
  if (!entry.loaded || !entry.pokemon) return true;
  const meta = ensureFilterMeta(entry);
  if (!meta) return false;
  if (meta.heldSlugs.some((slug) => slugMatchesQuery(slug, q))) return true;
  if (meta.heldNames.some((name) => nameMatchesQuery(name, q))) return true;
  return false;
}

export function matchesMachineMoveFilter(entry, query) {
  const q = query?.trim().toLowerCase();
  if (!q) return true;
  if (!entry.loaded || !entry.pokemon) return true;
  const meta = ensureFilterMeta(entry);
  if (!meta) return false;
  if (meta.machineSlugs.some((slug) => slugMatchesQuery(slug, q))) return true;
  if (meta.machineNames.some((name) => nameMatchesQuery(name, q))) return true;
  return false;
}

export async function enrichFilterMetaForEntries(entries) {
  const targets = entries.filter((e) => e.loaded && e.pokemon && !e.filterMeta?.namesLoaded);
  if (!targets.length) return;
  await runPool(targets, (entry) => enrichFilterMeta(entry), 6);
}
