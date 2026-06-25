import { getAllGuideVersions } from '../data/versionGuides/index.js';

/** 側欄「版本」抽屜：列出版本連結，攻略內容在 guide.html */
export function initVersionDrawer() {
  const root = document.getElementById('versionDrawerRoot');
  if (!root) return;

  const versions = getAllGuideVersions();
  const byGen = new Map();
  versions.forEach((v) => {
    if (!byGen.has(v.displayGeneration)) byGen.set(v.displayGeneration, []);
    byGen.get(v.displayGeneration).push(v);
  });

  root.innerHTML = '';
  [...byGen.keys()].sort((a, b) => a - b).forEach((gen) => {
    const group = document.createElement('div');
    group.className = 'version-drawer-gen';

    const label = document.createElement('div');
    label.className = 'version-drawer-gen-label';
    label.textContent = `第 ${gen} 世代`;
    group.appendChild(label);

    const list = document.createElement('div');
    list.className = 'version-drawer-list';

    byGen.get(gen).forEach((meta) => {
      const link = document.createElement('a');
      link.href = `./guide.html?version=${encodeURIComponent(meta.id)}`;
      link.className = 'version-drawer-link';
      if (meta.status === 'placeholder') link.classList.add('is-placeholder');
      link.appendChild(document.createTextNode(meta.title));
      if (meta.status === 'placeholder') {
        const badge = document.createElement('span');
        badge.className = 'version-drawer-badge';
        badge.textContent = '準備中';
        link.appendChild(badge);
      }
      list.appendChild(link);
    });

    group.appendChild(list);
    root.appendChild(group);
  });
}
