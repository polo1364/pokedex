import { typeColors, typeNamesCN } from '../config.js';
import { MOVE_SOURCE_META } from '../data/versionGuides/helpers.js';
import { resolveMoveType } from '../data/moveTypes.js';
import {
  getAllGuideVersions, getVersionGuide, getVersionMeta,
  getLeagueOpponents, getGuideExpansion, getGuidePartTabs,
  hasExpansionContent, hasMainGuideContent,
} from '../data/versionGuides/index.js';
import { setGuideChatVersion } from './guideChat.js';
import { updateGuideBackToTop } from './guideBackToTop.js';
import {
  getGuideMap, getGymOrderForSlot, getExpansionMap,
  resolveExpansionIslandSection, resolveSeviiPlace,
} from '../data/versionGuides/guideMaps.js';
import { annotateGuideText, annotateExpansionText } from '../data/versionGuides/guideAnnotations.js';
import { initGuideAnnotateTooltips } from './guideAnnotateTooltip.js';
import { initGuideMapTooltips, bindGuideMapTooltips } from './guideMapTooltip.js';
import {
  initGuideRequestSearch, destroyGuideRequestSearch, labelChipClass,
} from './guideRequestSearch.js';
import {
  initGuideRequestCardTooltips, destroyGuideRequestCardTooltips,
} from './guideRequestCardTooltips.js';

let activeVersionId = null;

/** 攻略獨立頁：渲染單一版本的道館／四天王／冠軍攻略 */
export function initGuidePage() {
  const root = document.getElementById('guideContentRoot');
  const select = document.getElementById('guideVersionSelect');
  const titleEl = document.getElementById('guidePageTitle');
  if (!root) return;

  populateVersionSelect(select);

  const params = new URLSearchParams(location.search);
  let versionId = params.get('version') || select?.value || 'red-blue';

  if (!getVersionMeta(versionId)) {
    versionId = 'red-blue';
  }

  if (select) select.value = versionId;
  const partId = params.get('part') || params.get('region') || 'main';
  renderGuidePage(versionId, root, titleEl, partId);
  initGuideAnnotateTooltips();
  initGuideMapTooltips();

  select?.addEventListener('change', () => {
    const id = select.value;
    const url = new URL(location.href);
    url.searchParams.set('version', id);
    url.searchParams.delete('part');
    url.searchParams.delete('region');
    url.searchParams.delete('battle');
    history.replaceState(null, '', url);
    renderGuidePage(id, root, titleEl, 'main');
  });
}

function populateVersionSelect(select) {
  if (!select) return;
  select.innerHTML = '';
  getAllGuideVersions().forEach((meta) => {
    const opt = document.createElement('option');
    opt.value = meta.id;
    opt.textContent = meta.status === 'placeholder'
      ? `${meta.title}（準備中）`
      : meta.title;
    opt.disabled = meta.status === 'placeholder';
    select.appendChild(opt);
  });
}

function renderGuidePage(versionId, root, titleEl, partId = 'main') {
  activeVersionId = versionId;

  const meta = getVersionMeta(versionId);
  const guide = getVersionGuide(versionId);

  if (!guide) {
    root.innerHTML = '<p class="guide-placeholder-msg guide-page-empty">找不到攻略資料。</p>';
    setGuideChatVersion(versionId, true, 'main', '本體');
    return;
  }

  const partTabs = getGuidePartTabs(guide);
  let activePartId = partId;
  if (activePartId !== 'main' && !getGuideExpansion(guide, activePartId)) {
    activePartId = 'main';
  }

  const partLabel = partTabs?.find((t) => t.id === activePartId)?.label;
  const expansion = getGuideExpansion(guide, activePartId);
  const isMainPlaceholder = activePartId === 'main' && !hasMainGuideContent(guide);
  const isPartPlaceholder = activePartId !== 'main' && expansion && !hasExpansionContent(expansion);

  if (titleEl && meta) {
    titleEl.textContent = partLabel && activePartId !== 'main'
      ? `${meta.title} — ${partLabel}`
      : meta.title;
  }

  document.title = meta
    ? (partLabel && activePartId !== 'main' ? `${meta.title} ${partLabel}` : meta.title) + ' 攻略｜寶可夢圖鑑'
    : '版本攻略｜寶可夢圖鑑';

  root.innerHTML = '';
  root.classList.toggle('guide-page--legends-arceus', versionId === 'legends-arceus');

  if (partTabs) {
    root.appendChild(renderPartTabs(partTabs, activePartId, (newPart) => {
      switchGuidePart(versionId, root, titleEl, newPart);
    }));
  }

  const content = document.createElement('div');
  content.className = 'guide-part-content';
  renderPartContent(content, guide, activePartId, expansion);
  root.appendChild(content);

  setGuideChatVersion(versionId, isMainPlaceholder || isPartPlaceholder, activePartId, partLabel || '本體');
  if (!isMainPlaceholder && !isPartPlaceholder) applyBattleDeepLink();
  updateGuideBackToTop();

  destroyGuideRequestSearch();
  destroyGuideRequestCardTooltips();
  if (activePartId === 'requests') {
    const requestsGuide = root.querySelector('.guide-expansion-guide--requests');
    if (requestsGuide) {
      initGuideRequestSearch(requestsGuide);
      initGuideRequestCardTooltips(requestsGuide);
    }
  }
}

function switchGuidePart(versionId, root, titleEl, partId) {
  const url = new URL(location.href);
  url.searchParams.set('version', versionId);
  if (partId === 'main') {
    url.searchParams.delete('part');
    url.searchParams.delete('region');
  } else {
    url.searchParams.set('part', partId);
    url.searchParams.delete('region');
  }
  if (partId !== 'requests') {
    url.searchParams.delete('q');
    url.searchParams.delete('cat');
  }
  url.searchParams.delete('battle');
  history.replaceState(null, '', url);
  renderGuidePage(versionId, root, titleEl, partId);
}

function renderPartTabs(tabs, activePartId, onSelect) {
  const tabsEl = document.createElement('div');
  tabsEl.className = 'tabs guide-part-tabs';
  tabsEl.setAttribute('role', 'tablist');
  tabsEl.setAttribute('aria-label', '攻略內容');

  tabs.forEach((tab) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `tab${tab.id === activePartId ? ' active' : ''}`;
    btn.textContent = tab.label;
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', tab.id === activePartId ? 'true' : 'false');
    btn.addEventListener('click', () => {
      if (tab.id === activePartId) return;
      onSelect(tab.id);
    });
    tabsEl.appendChild(btn);
  });

  return tabsEl;
}

function renderPartContent(container, guide, partId, expansion) {
  if (partId === 'main') {
    if (!hasMainGuideContent(guide)) {
      const msg = document.createElement('p');
      msg.className = 'guide-placeholder-msg guide-page-empty';
      msg.textContent = guide.mainPlaceholderMessage || '本體攻略準備中，請稍後再來。';
      container.appendChild(msg);
      return;
    }

    if (guide.id === 'legends-arceus') {
      appendExpansionMap(container, { ...guide, id: 'legends-arceus', title: guide.title });
    } else {
      appendRegionMap(container, guide);
    }

    if (guide.notes) {
      const note = document.createElement('p');
      note.className = 'guide-meta guide-page-notes';
      note.textContent = guide.notes;
      container.appendChild(note);
    }

    const richGuide = guide.prerequisites?.length || guide.hms?.length || guide.sections?.length;
    if (richGuide) {
      appendExpansionGuide(container, {
        ...guide,
        id: guide.id === 'legends-arceus' ? 'legends-arceus' : (guide.id || 'main'),
        title: guide.mainPartLabel || guide.title || '本體',
      });
    }

    const annotateId = guide.id === 'legends-arceus' ? 'legends-arceus' : null;
    appendBattleSection(container, '王／女王寶可夢（鎮撫戰）', guide.nobles, 'noble', annotateId, {
      sequenceMode: guide.nobleSequenceMode || 'suggested',
    });
    appendBattleSection(container, guide.gymSectionTitle || '道館', guide.gyms, 'gym', annotateId, {
      sequenceMode: guide.gymSequenceMode || 'fixed',
    });
    appendLeagueSection(container, guide);
    return;
  }

  if (!hasExpansionContent(expansion)) {
    const msg = document.createElement('p');
    msg.className = 'guide-placeholder-msg guide-page-empty';
    msg.textContent = expansion.placeholderMessage
      || `${expansion.title || '擴充內容'} 攻略準備中，請稍後再來。`;
    container.appendChild(msg);
    return;
  }

  appendExpansionMap(container, expansion);
  appendExpansionGuide(container, expansion);
  appendBattleSection(
    container,
    expansion.battleSectionTitle || '重要戰鬥',
    expansion.gyms,
    `expansion:${partId}`,
  );
  if (expansion.league) {
    appendLeagueSection(container, {
      id: expansion.id || guide.id,
      leagueSectionTitle: expansion.leagueSectionTitle ?? guide.leagueSectionTitle,
      coverageTitle: expansion.coverageTitle ?? guide.coverageTitle,
      teamBlockTitle: expansion.teamBlockTitle ?? guide.teamBlockTitle,
      league: expansion.league,
      eliteFour: expansion.eliteFour ?? [],
      champion: expansion.champion ?? null,
    });
  }
}

const ISLAND_NUM_LABELS = ['①', '②', '③', '④', '⑤', '⑥', '⑦'];

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderAnnotated(text) {
  return annotateGuideText(text);
}

function renderExpansionAnnotated(text, expansionId) {
  return annotateExpansionText(text, expansionId);
}

function buildExpansionLegendHtml(expansion) {
  const prepChip = expansion.usePrepLegend
    ? '<span class="guide-expansion-legend-chip guide-expansion-legend-chip--prep">準備</span>'
    : '<span class="guide-expansion-legend-chip guide-expansion-legend-chip--hm">秘傳招式</span>';
  const hint = expansion.legendHint || '移至標示詞可查看說明';
  return '<span class="guide-expansion-legend-label">標示說明：</span>'
    + '<span class="guide-expansion-legend-chip guide-expansion-legend-chip--item">道具</span>'
    + prepChip
    + '<span class="guide-expansion-legend-chip guide-expansion-legend-chip--pass">通行證</span>'
    + '<span class="guide-expansion-legend-chip guide-expansion-legend-chip--place">地點</span>'
    + '<span class="guide-expansion-legend-chip guide-expansion-legend-chip--mechanic">機制</span>'
    + '<span class="guide-expansion-legend-chip guide-expansion-legend-chip--npc">人物</span>'
    + `<span class="guide-expansion-legend-hint">${escapeHtml(hint)}</span>`;
}

function appendExpansionGuide(container, expansion) {
  if (!expansion?.prerequisites?.length && !expansion?.hms?.length && !expansion?.sections?.length) {
    return;
  }

  const expansionId = expansion.id;
  const annotate = (text) => renderExpansionAnnotated(text, expansionId);

  const guide = document.createElement('section');
  guide.className = 'guide-expansion-guide';
  if (expansionId) {
    guide.classList.add(`guide-expansion-guide--${expansionId}`);
  }
  guide.setAttribute('aria-label', `${expansion.title || '擴充'}攻略`);

  const legend = document.createElement('p');
  legend.className = 'guide-expansion-legend';
  legend.innerHTML = buildExpansionLegendHtml(expansion);
  guide.appendChild(legend);

  expansion.prerequisites?.forEach((phase, phaseIndex) => {
    const block = document.createElement('div');
    let variant = 'tri';
    if (phase.variant === 'rainbow') variant = 'rainbow';
    else if (phase.variant === 'frontier') variant = 'frontier';
    else if (phase.variant === 'hisui') variant = 'hisui';
    else if (phase.variant === 'daybreak') variant = 'daybreak';
    else if (phase.variant === 'requests') variant = 'requests';
    block.className = `guide-expansion-phase guide-expansion-phase--${variant}`;
    if (expansionId === 'battle-frontier' && phase.variant === 'frontier' && phaseIndex === 0) {
      block.id = 'expansion-bf-prerequisites';
    }
    if (expansionId === 'legends-arceus' && phaseIndex === 0) {
      block.id = 'expansion-hisui-prerequisites';
    }
    block.innerHTML = `<h2 class="guide-expansion-phase-title">${escapeHtml(phase.title)}</h2>`;
    block.innerHTML += renderKeyValueTable(phase.rows, annotate);
    guide.appendChild(block);
  });

  if (expansion.hms?.length) {
    const hmBlock = document.createElement('div');
    hmBlock.className = 'guide-expansion-hm';
    const hmTitle = expansion.hmSectionTitle || '建議攜帶秘傳招式';
    const hmHeaders = expansion.hmTableHeaders || ['秘傳招式', '重要性', '用途'];
    hmBlock.innerHTML = `<h2 class="guide-expansion-section-title">${escapeHtml(hmTitle)}</h2>`;
    hmBlock.innerHTML += renderSimpleTable(
      hmHeaders,
      expansion.hms.map((row) => [
        annotate(row.name),
        renderImportanceTag(row.importance),
        annotate(row.usage),
      ]),
    );
    guide.appendChild(hmBlock);
  }

  if (expansionId === 'requests') {
    guide.appendChild(renderRequestsStickyToolbar(expansion));
    renderRequestsGuideSections(guide, expansion);
  } else {
    expansion.sections?.forEach((section) => {
      guide.appendChild(renderExpansionSection(section, expansion));
    });
  }

  container.appendChild(guide);
}

function renderImportanceTag(importance) {
  const required = importance === '必帶' || importance === '破關後必帶';
  const cls = required ? 'guide-expansion-tag guide-expansion-tag--required' : 'guide-expansion-tag guide-expansion-tag--optional';
  return `<span class="${cls}">${escapeHtml(importance)}</span>`;
}

function renderKeyValueTable(rows, annotate = renderAnnotated) {
  return renderSimpleTable(
    ['條件', '內容'],
    (rows || []).map((r) => [escapeHtml(r.label), annotate(r.value)]),
  );
}

function renderExpansionSection(section, expansion) {
  switch (section.type) {
    case 'island':
      return renderExpansionIsland(section, expansion);
    case 'summary':
      return renderExpansionSummary(section, expansion);
    case 'checklist':
      return renderExpansionChecklist(section, expansion);
    case 'teams':
      return renderExpansionTeams(section, expansion);
    case 'faq':
      return renderExpansionFaq(section, expansion);
    case 'conclusion':
      return renderExpansionConclusion(section, expansion);
    case 'request':
      return renderExpansionRequest(section, expansion);
    default:
      return document.createElement('div');
  }
}

const REQUESTS_NAV_ITEMS = [
  { section: 1, label: '1～30', category: 'main', hint: '本體前期委託' },
  { section: 2, label: '31～60', category: 'main', hint: '紅蓮濕地與群青海岸' },
  { section: 3, label: '61～88', category: 'main', hint: '天冠山麓與純白凍土' },
  { section: 4, label: '89～94', category: 'postgame', hint: '破關後傳說委託；92、93 需存檔連動' },
  { section: 5, label: '95～107', category: 'daybreak', hint: '洗翠黎明大量大發生主線' },
  { section: 6, label: '108～122', category: 'path', hint: '單隻寶可夢之道挑戰' },
];

function requestSlug(number) {
  return String(number).replace(/[～~]/g, '-');
}

function buildRequestHint(section) {
  if (section.hint) return section.hint;
  const place = section.rows?.find((r) => r.label === '地點')?.value;
  const goal = section.rows?.find((r) => r.label === '目標')?.value;
  const solution = section.rows?.find((r) => r.label === '解法')?.value;
  return [place, goal, solution].filter(Boolean).join('｜');
}

function renderRequestsStickyToolbar(expansion) {
  const sticky = document.createElement('div');
  sticky.className = 'guide-requests-sticky';

  const toolbar = document.createElement('div');
  toolbar.className = 'guide-requests-toolbar';
  toolbar.innerHTML = `
    <div class="guide-requests-search-wrap">
      <input type="search" class="guide-requests-search-input" placeholder="搜尋編號、委託名、地點、寶可夢…" autocomplete="off" aria-label="搜尋委託" />
      <button type="button" class="guide-requests-search-clear" hidden aria-label="清除搜尋">×</button>
    </div>
    <p class="guide-requests-count">共 122 筆委託</p>
    <div class="guide-requests-cat-filters" role="group" aria-label="委託分類篩選">
      <button type="button" class="guide-requests-cat-chip active" data-cat="all">全部</button>
      <button type="button" class="guide-requests-cat-chip guide-requests-cat-chip--main" data-cat="main">本體 1～88</button>
      <button type="button" class="guide-requests-cat-chip guide-requests-cat-chip--postgame" data-cat="postgame">傳說 89～94</button>
      <button type="button" class="guide-requests-cat-chip guide-requests-cat-chip--daybreak" data-cat="daybreak">黎明 95～107</button>
      <button type="button" class="guide-requests-cat-chip guide-requests-cat-chip--path" data-cat="path">單隻之道</button>
    </div>
    <p class="guide-requests-empty" hidden>找不到符合的委託，試試編號或地名</p>`;

  const nav = document.createElement('nav');
  nav.className = 'guide-requests-nav';
  nav.setAttribute('aria-label', '委託區段導覽');
  REQUESTS_NAV_ITEMS.forEach((item) => {
    const a = document.createElement('a');
    a.className = `guide-requests-nav-pill guide-requests-nav-pill--${item.category}`;
    a.href = `#expansion-section-requests-${item.section}`;
    a.textContent = item.label;
    a.title = item.hint;
    nav.appendChild(a);
  });

  sticky.appendChild(toolbar);
  sticky.appendChild(nav);
  return sticky;
}

function renderRequestsGuideSections(guide, expansion) {
  let currentGrid = null;

  const appendMeta = (section) => {
    currentGrid = null;
    const wrap = document.createElement('div');
    wrap.className = 'guide-requests-meta';
    wrap.appendChild(renderExpansionSection(section, expansion));
    guide.appendChild(wrap);
  };

  expansion.sections?.forEach((section) => {
    if (section.type === 'request') {
      if (!currentGrid) {
        const block = document.createElement('div');
        block.className = 'guide-requests-block';
        currentGrid = document.createElement('div');
        currentGrid.className = 'guide-requests-grid';
        block.appendChild(currentGrid);
        guide.appendChild(block);
      }
      currentGrid.appendChild(renderExpansionRequest(section, expansion));
      return;
    }

    if (section.type === 'island') {
      currentGrid = null;
      const block = document.createElement('div');
      block.className = 'guide-requests-block';
      block.dataset.section = String(section.number);
      block.appendChild(renderExpansionIsland(section, expansion));
      currentGrid = document.createElement('div');
      currentGrid.className = 'guide-requests-grid';
      block.appendChild(currentGrid);
      guide.appendChild(block);
      return;
    }

    appendMeta(section);
  });
}

function renderExpansionRequest(section, expansion) {
  const expansionId = expansion?.id || 'requests';
  const annotate = (text) => renderExpansionAnnotated(text, expansionId);
  const category = section.category || 'main';
  const slug = requestSlug(section.number);
  const hint = buildRequestHint(section);

  const card = document.createElement('article');
  card.className = `guide-expansion-request guide-expansion-request--${category}`;
  card.id = `request-${slug}`;
  card.tabIndex = 0;
  card.dataset.requestNumber = String(section.number);
  card.dataset.requestTitle = section.title;
  card.dataset.requestCategory = category;
  card.dataset.hint = hint;
  card.dataset.searchExtra = section.rows?.map((r) => `${r.label}${r.value}`).join(' ') || '';
  card.dataset.tooltipRows = JSON.stringify(
    section.rows?.map((r) => ({ label: r.label, value: r.value })) || [],
  );

  const displayLabels = ['地點', '目標', '解法'];
  const bodyRows = section.rows?.filter((r) => displayLabels.includes(r.label)) || section.rows?.slice(0, 3) || [];

  let bodyHtml = '';
  bodyRows.forEach((row) => {
    const chipCls = labelChipClass(row.label);
    bodyHtml += `<div class="guide-request-row guide-request-row--${chipCls}">`
      + `<span class="guide-request-row-label guide-request-row-label--${chipCls}">${escapeHtml(row.label)}</span>`
      + `<span class="guide-request-row-value">${annotate(row.value)}</span></div>`;
  });
  card.dataset.bodyHtml = bodyHtml;

  card.innerHTML = `<header class="guide-expansion-request-header">
      <span class="guide-expansion-request-num" aria-hidden="true">${escapeHtml(String(section.number))}</span>
      <h3 class="guide-expansion-request-title">${escapeHtml(section.title)}</h3>
    </header>
    <div class="guide-expansion-request-body">${bodyHtml}</div>`;

  return card;
}

function expansionSectionId(expansionId, number) {
  return `expansion-section-${expansionId}-${number}`;
}

function renderExpansionIsland(section, expansion) {
  const expansionId = expansion?.id || 'sevii';
  const article = document.createElement('article');
  article.className = 'guide-expansion-island';
  if (expansionId === 'battle-frontier') {
    article.classList.add('guide-expansion-island--facility');
  }
  if (expansionId === 'legends-arceus') {
    article.classList.add('guide-expansion-island--hisui');
  }
  if (expansionId === 'daybreak') {
    article.classList.add('guide-expansion-island--daybreak');
  }
  if (expansionId === 'requests') {
    article.classList.add('guide-expansion-island--requests');
    if (section.category) {
      article.classList.add(`guide-expansion-island--cat-${section.category}`);
    }
  }
  article.id = expansionSectionId(expansionId, section.number);
  article.dataset.island = String(section.number);
  article.dataset.expansionSection = String(section.number);

  const annotate = (text) => renderExpansionAnnotated(text, expansionId);
  const numLabel = ISLAND_NUM_LABELS[section.number - 1] || String(section.number);
  let html = `<header class="guide-expansion-island-header">
    <span class="guide-expansion-island-num" aria-hidden="true">${numLabel}</span>
    <h2 class="guide-expansion-island-title">${escapeHtml(section.title)}</h2>
  </header>`;

  if (section.intro) {
    html += `<p class="guide-expansion-island-intro">${annotate(section.intro)}</p>`;
  }
  if (section.places?.length) {
    html += '<h3 class="guide-expansion-subtitle">重要地點</h3>';
    html += renderSimpleTable(
      ['地點', '內容'],
      section.places.map((p) => [annotate(p.name), annotate(p.content)]),
    );
  }
  if (section.flows?.length) {
    html += '<h3 class="guide-expansion-subtitle">流程</h3><ol class="guide-expansion-flow-list">';
    section.flows.forEach((step) => {
      html += `<li>${annotate(step)}</li>`;
    });
    html += '</ol>';
  }
  if (section.tips?.length) {
    html += '<h3 class="guide-expansion-subtitle">重點</h3><ul class="guide-expansion-tips">';
    section.tips.forEach((tip) => {
      html += `<li>${annotate(tip)}</li>`;
    });
    html += '</ul>';
  }

  article.innerHTML = html;
  return article;
}

function renderExpansionSummary(section, expansion) {
  const expansionId = expansion?.id;
  const annotate = (text) => renderExpansionAnnotated(text, expansionId);
  const block = document.createElement('div');
  block.className = 'guide-expansion-summary';
  block.innerHTML = `<h2 class="guide-expansion-section-title">${escapeHtml(section.title)}</h2>`;

  if (section.summaryMode === 'facility') {
    const headers = section.headers || ['設施', '難度', '銀條件', '金條件', '開拓之腦'];
    block.innerHTML += renderSimpleTable(
      headers,
      (section.rows || []).map((r) => [
        annotate(r.island),
        renderDifficultyChip(r.priority),
        annotate(r.task),
        annotate(r.hms),
        annotate(r.brain || ''),
      ]),
    );
  } else if (section.summaryMode === 'columns') {
    const headers = section.headers || ['項目', '內容'];
    block.innerHTML += renderSimpleTable(
      headers,
      (section.rows || []).map((r) => (r.cells
        ? r.cells.map((c) => annotate(c))
        : [annotate(r.label || r.col1), annotate(r.value || r.col2)])),
    );
  } else {
    block.innerHTML += renderSimpleTable(
      ['島嶼', '主線重要度', '主要任務', '必帶 HM'],
      (section.rows || []).map((r) => [
        escapeHtml(r.island),
        renderDifficultyChip(r.priority),
        annotate(r.task),
        annotate(r.hms),
      ]),
    );
  }
  return block;
}

function renderDifficultyChip(priority) {
  if (!priority) return '';
  let cls = 'guide-expansion-priority';
  if (priority.includes('很高')) {
    cls += ' guide-expansion-priority--extreme';
  } else if (priority.includes('中～高') || priority.includes('中高')) {
    cls += ' guide-expansion-priority--medium-high';
  } else if (priority === '高' || (priority.includes('高') && !priority.includes('中'))) {
    cls += ' guide-expansion-priority--high';
  } else if (priority === '中' || priority.startsWith('中')) {
    cls += ' guide-expansion-priority--medium';
  }
  return `<span class="${cls}">${escapeHtml(priority)}</span>`;
}

function renderPriorityChip(priority) {
  return renderDifficultyChip(priority);
}

function renderTierChip(tier) {
  let cls = 'guide-expansion-tier';
  if (tier === '極優先') cls += ' guide-expansion-tier--top';
  else if (tier === '優先') cls += ' guide-expansion-tier--mid';
  else if (tier === '次要') cls += ' guide-expansion-tier--low';
  return `<span class="${cls}">${escapeHtml(tier)}</span>`;
}

function renderExpansionChecklist(section, expansion) {
  const expansionId = expansion?.id;
  const annotate = (text) => renderExpansionAnnotated(text, expansionId);
  const block = document.createElement('div');
  block.className = `guide-expansion-checklist${section.vertical ? ' guide-expansion-checklist--vertical' : ''}`;
  if (section.tiered) block.classList.add('guide-expansion-checklist--tiered');
  if (section.title?.includes('戰鬥點數兌換')) {
    block.id = 'expansion-bf-bp-exchange';
  }
  block.innerHTML = `<h2 class="guide-expansion-section-title">${escapeHtml(section.title)}</h2>`;

  if (section.vertical) {
    let html = '<ol class="guide-expansion-step-line">';
    section.steps.forEach((step) => {
      if (section.tiered && step && typeof step === 'object' && step.tier) {
        html += `<li><span class="guide-expansion-step-tier">${renderTierChip(step.tier)}</span>`
          + `<span class="guide-expansion-step-text">${annotate(step.text)}</span></li>`;
      } else {
        const text = typeof step === 'string' ? step : `${step.location}：${step.goal}`;
        html += `<li>${annotate(text)}</li>`;
      }
    });
    html += '</ol>';
    block.innerHTML += html;
  } else {
    block.innerHTML += renderSimpleTable(
      ['步驟', '地點', '目標'],
      section.steps.map((s) => [
        escapeHtml(s.step),
        annotate(s.location),
        annotate(s.goal),
      ]),
    );
  }
  return block;
}

function renderExpansionTeams(section, expansion) {
  const expansionId = expansion?.id;
  const annotate = (text) => renderExpansionAnnotated(text, expansionId);
  const block = document.createElement('div');
  block.className = 'guide-expansion-teams';
  block.innerHTML = `<h2 class="guide-expansion-section-title">${escapeHtml(section.title)}</h2>`;

  section.groups?.forEach((group) => {
    const card = document.createElement('div');
    card.className = 'guide-expansion-team-group';
    let html = `<h3 class="guide-expansion-subtitle">${escapeHtml(group.title)}</h3>`;
    html += '<div class="guide-table-wrap"><table class="guide-league-table"><thead><tr>'
      + '<th>寶可夢</th><th>用途</th></tr></thead><tbody>';
    group.members.forEach((m) => {
      html += `<tr><td>${escapeHtml(m.name)}</td><td>${annotate(m.reason)}</td></tr>`;
    });
    html += '</tbody></table></div>';
    card.innerHTML = html;
    block.appendChild(card);
  });
  return block;
}

function renderExpansionFaq(section, expansion) {
  const expansionId = expansion?.id;
  const annotate = (text) => renderExpansionAnnotated(text, expansionId);
  const block = document.createElement('div');
  block.className = 'guide-expansion-faq';
  block.innerHTML = `<h2 class="guide-expansion-section-title">${escapeHtml(section.title)}</h2>`;
  section.items?.forEach((item) => {
    const row = document.createElement('div');
    row.className = 'guide-expansion-faq-item';
    row.innerHTML = `<p class="guide-expansion-faq-q">Q：${annotate(item.problem)}</p>`
      + `<p class="guide-expansion-faq-a">A：${annotate(item.solution)}</p>`;
    block.appendChild(row);
  });
  return block;
}

function renderExpansionConclusion(section, expansion) {
  const expansionId = expansion?.id;
  const annotate = (text) => renderExpansionAnnotated(text, expansionId);
  const block = document.createElement('div');
  block.className = 'guide-expansion-conclusion';
  block.innerHTML = `<h2 class="guide-expansion-conclusion-title">${escapeHtml(section.title)}</h2>`
    + `<p class="guide-expansion-conclusion-body">${annotate(section.body)}</p>`;
  return block;
}

const SEVII_PHASE_LABELS = {
  tri: '三島通行證',
  rainbow: '彩虹通行證',
};

function parseExpansionBattleOrder(battleRef) {
  const match = battleRef?.match(/^expansion:[^:]+:(\d+)$/);
  return match ? Number(match[1]) : null;
}

function getExpansionBattleByRef(expansion, battleRef) {
  const order = parseExpansionBattleOrder(battleRef);
  if (!order) return null;
  return expansion.gyms?.find((g) => g.order === order) || null;
}

function resolveHisuiBattleForTooltip(expansion, battleRef) {
  if (!expansion || !battleRef) return null;
  if (expansion.id === 'legends-arceus') {
    const nobleMatch = battleRef.match(/^noble:(\d+)$/);
    if (nobleMatch) {
      return expansion.nobles?.find((g) => g.order === Number(nobleMatch[1])) || null;
    }
    const gymMatch = battleRef.match(/^gym:(\d+)$/);
    if (gymMatch) {
      return expansion.gyms?.find((g) => g.order === Number(gymMatch[1])) || null;
    }
    return null;
  }
  if (expansion.id === 'daybreak') {
    return getExpansionBattleByRef(expansion, battleRef);
  }
  return null;
}

function scrollHisuiStory(hotspot, expansionId) {
  if (hotspot.scrollTo === 'prerequisites') {
    scrollToGuideTarget(document.getElementById('expansion-hisui-prerequisites'));
    return;
  }
  if (typeof hotspot.scrollTo === 'number') {
    scrollToExpansionSection(expansionId, hotspot.scrollTo);
  }
}

/** 五大區 region-N → section number；story 點用 extra.island */
function resolveHisuiSectionNumber(hotspot) {
  if (hotspot.island) return hotspot.island;
  const m = /^region-(\d+)$/.exec(hotspot.id || '');
  return m ? Number(m[1]) : null;
}

function buildHisuiMapTooltip(hotspot, expansion) {
  const tooltip = document.createElement('div');
  tooltip.className = 'guide-map-tooltip guide-map-tooltip--hisui';
  tooltip.setAttribute('role', 'tooltip');

  const sectionNum = resolveHisuiSectionNumber(hotspot);
  const section = resolveExpansionIslandSection(sectionNum, expansion);
  const regionLabel = expansion.id === 'daybreak' ? '洗翠黎明' : '洗翠本篇';

  if (hotspot.kind === 'island') {
    const title = hotspot.label || section?.title || `區域 ${sectionNum}`;
    const intro = section?.intro || '';
    const placesHtml = (section?.places || []).slice(0, 4).map((p) => (
      `<li><span class="guide-map-tooltip-place-name">${escapeHtml(p.name)}</span></li>`
    )).join('');

    tooltip.innerHTML = `
      <div class="guide-map-tooltip-header">
        <span class="guide-map-tooltip-order">${escapeHtml(title)}</span>
        <span class="guide-map-tooltip-phase guide-map-tooltip-phase--hisui">${regionLabel}</span>
      </div>
      ${intro ? `<p class="guide-map-tooltip-sevii-intro">${escapeHtml(intro.length > 72 ? `${intro.slice(0, 72)}…` : intro)}</p>` : ''}
      ${placesHtml ? `<div class="guide-map-tooltip-places-title">重要地點</div><ul class="guide-map-tooltip-places">${placesHtml}</ul>` : ''}
      <div class="guide-map-tooltip-hint">點擊查看攻略 →</div>
    `;
    return tooltip;
  }

  const label = hotspot.label || '';
  const hintHtml = hotspot.hint
    ? `<p class="guide-map-tooltip-sevii-intro">${escapeHtml(hotspot.hint)}</p>`
    : '';

  let battlesHtml = '';
  if (hotspot.battleRefs?.length) {
    battlesHtml = '<div class="guide-map-tooltip-battles-title">相關戰鬥</div><ul class="guide-map-tooltip-battles">';
    hotspot.battleRefs.forEach((ref) => {
      const battle = resolveHisuiBattleForTooltip(expansion, ref);
      if (battle) {
        battlesHtml += `<li>${escapeHtml(battle.name)}${battle.location ? `（${escapeHtml(battle.location)}）` : ''}</li>`;
      }
    });
    battlesHtml += '</ul>';
  }

  tooltip.innerHTML = `
    <div class="guide-map-tooltip-header">
      <span class="guide-map-tooltip-order guide-map-tooltip-order--story">重點</span>
      <span class="guide-map-tooltip-phase guide-map-tooltip-phase--hisui">★</span>
    </div>
    <div class="guide-map-tooltip-leader">${escapeHtml(label)}</div>
    ${hintHtml}
    ${battlesHtml}
    <div class="guide-map-tooltip-hint">點擊查看攻略${hotspot.battleRefs?.length ? '與戰鬥' : ''} →</div>
  `;
  return tooltip;
}

function scrollToGuideTarget(el) {
  if (!el) return;
  // 部分環境（含 IDE 內建瀏覽器）smooth 捲動無效，改用即時跳轉確保熱點可達。
  el.scrollIntoView({ block: 'start' });
}

function scrollToExpansionSection(expansionId, sectionNumber) {
  scrollToGuideTarget(document.getElementById(expansionSectionId(expansionId, sectionNumber)));
}

function scrollToSeviiIsland(island) {
  scrollToExpansionSection('sevii', island);
}

function scrollToBattleFrontierStory(hotspot, expansionId) {
  const scrollTo = hotspot.scrollTo;
  if (scrollTo === 'prerequisites') {
    scrollToGuideTarget(document.getElementById('expansion-bf-prerequisites'));
    return;
  }
  if (scrollTo === 'bp-exchange') {
    scrollToGuideTarget(document.getElementById('expansion-bf-bp-exchange'));
    return;
  }
  if (typeof scrollTo === 'number') {
    scrollToExpansionSection(expansionId, scrollTo);
  }
}

function buildBattleFrontierMapTooltip(hotspot, expansion) {
  const tooltip = document.createElement('div');
  tooltip.className = 'guide-map-tooltip guide-map-tooltip--battle-frontier';
  tooltip.setAttribute('role', 'tooltip');

  const section = resolveExpansionIslandSection(hotspot.island, expansion);

  if (hotspot.kind === 'facility') {
    const title = section?.title || hotspot.label || '設施攻略';
    const intro = section?.intro || '';
    tooltip.innerHTML = `
      <div class="guide-map-tooltip-header">
        <span class="guide-map-tooltip-order">${escapeHtml(title)}</span>
        <span class="guide-map-tooltip-phase guide-map-tooltip-phase--frontier">開拓區</span>
      </div>
      ${intro ? `<p class="guide-map-tooltip-sevii-intro">${escapeHtml(intro.length > 72 ? `${intro.slice(0, 72)}…` : intro)}</p>` : ''}
      <div class="guide-map-tooltip-hint">點擊查看攻略 →</div>
    `;
    return tooltip;
  }

  const label = hotspot.label || hotspot.placeName;
  const hintHtml = hotspot.hint
    ? `<p class="guide-map-tooltip-sevii-intro">${escapeHtml(hotspot.hint)}</p>`
    : '';
  let battlesHtml = '';
  if (hotspot.battleRefs?.length) {
    battlesHtml = '<div class="guide-map-tooltip-battles-title">相關戰鬥</div><ul class="guide-map-tooltip-battles">';
    hotspot.battleRefs.forEach((ref) => {
      const battle = getExpansionBattleByRef(expansion, ref);
      if (battle) {
        battlesHtml += `<li>${escapeHtml(battle.name)}${battle.location ? `（${escapeHtml(battle.location)}）` : ''}</li>`;
      }
    });
    battlesHtml += '</ul>';
  }

  const clickHint = hotspot.scrollTo != null
    ? `點擊查看攻略${hotspot.battleRefs?.length ? '與戰鬥' : ''} →`
    : '';

  tooltip.innerHTML = `
    <div class="guide-map-tooltip-header">
      <span class="guide-map-tooltip-order guide-map-tooltip-order--story">重點</span>
      <span class="guide-map-tooltip-phase guide-map-tooltip-phase--frontier">★</span>
    </div>
    <div class="guide-map-tooltip-leader">${escapeHtml(label)}</div>
    ${hintHtml}
    ${battlesHtml}
    ${clickHint ? `<div class="guide-map-tooltip-hint">${clickHint}</div>` : ''}
  `;
  return tooltip;
}

function buildExpansionMapTooltip(hotspot, expansion) {
  if (expansion?.id === 'battle-frontier') {
    return buildBattleFrontierMapTooltip(hotspot, expansion);
  }
  if (expansion?.id === 'legends-arceus' || expansion?.id === 'daybreak') {
    return buildHisuiMapTooltip(hotspot, expansion);
  }
  return buildSeviiMapTooltip(hotspot, expansion);
}

function buildSeviiMapTooltip(hotspot, expansion) {
  const tooltip = document.createElement('div');
  tooltip.className = 'guide-map-tooltip guide-map-tooltip--sevii';
  tooltip.setAttribute('role', 'tooltip');

  const section = resolveExpansionIslandSection(hotspot.island, expansion);
  const phase = hotspot.phase || section && (hotspot.island <= 3 ? 'tri' : 'rainbow');
  const phaseLabel = SEVII_PHASE_LABELS[phase] || '';
  const phaseCls = phase === 'rainbow' ? 'guide-map-tooltip-phase--rainbow' : 'guide-map-tooltip-phase--tri';

  if (hotspot.kind === 'island') {
    const title = section?.title || `${['一', '二', '三', '四', '五', '六', '七'][hotspot.island - 1]}之島攻略`;
    const intro = section?.intro || '';
    const placesHtml = (section?.places || []).map((p) => (
      `<li><span class="guide-map-tooltip-place-name">${escapeHtml(p.name)}</span></li>`
    )).join('');

    tooltip.innerHTML = `
      <div class="guide-map-tooltip-header">
        <span class="guide-map-tooltip-order">${escapeHtml(title)}</span>
        ${phaseLabel ? `<span class="guide-map-tooltip-phase ${phaseCls}">${phaseLabel}</span>` : ''}
      </div>
      ${intro ? `<p class="guide-map-tooltip-sevii-intro">${escapeHtml(intro.length > 72 ? `${intro.slice(0, 72)}…` : intro)}</p>` : ''}
      ${placesHtml ? `<div class="guide-map-tooltip-places-title">重要地點</div><ul class="guide-map-tooltip-places">${placesHtml}</ul>` : ''}
      <div class="guide-map-tooltip-hint">點擊查看攻略 →</div>
    `;
    return tooltip;
  }

  const resolved = resolveSeviiPlace(hotspot.island, hotspot.placeName, expansion);
  const placeContent = resolved?.place?.content || section?.intro || '';
  const label = hotspot.label || hotspot.placeName;

  let battlesHtml = '';
  if (hotspot.battleRefs?.length) {
    battlesHtml = '<div class="guide-map-tooltip-battles-title">相關戰鬥</div><ul class="guide-map-tooltip-battles">';
    hotspot.battleRefs.forEach((ref) => {
      const battle = getExpansionBattleByRef(expansion, ref);
      if (battle) {
        battlesHtml += `<li>${escapeHtml(battle.name)}${battle.location ? `（${escapeHtml(battle.location)}）` : ''}</li>`;
      }
    });
    battlesHtml += '</ul>';
  }

  tooltip.innerHTML = `
    <div class="guide-map-tooltip-header">
      <span class="guide-map-tooltip-order guide-map-tooltip-order--story">主線重點</span>
      <span class="guide-map-tooltip-phase guide-map-tooltip-phase--story">★</span>
    </div>
    <div class="guide-map-tooltip-leader">${escapeHtml(label)}</div>
    ${placeContent ? `<p class="guide-map-tooltip-sevii-intro">${escapeHtml(placeContent.length > 96 ? `${placeContent.slice(0, 96)}…` : placeContent)}</p>` : ''}
    ${battlesHtml}
    <div class="guide-map-tooltip-hint">點擊查看攻略${hotspot.battleRefs?.length ? '與戰鬥' : ''} →</div>
  `;
  return tooltip;
}

function appendExpansionMap(container, expansion) {
  const map = getExpansionMap(expansion?.id) ?? getGuideMap(expansion?.id);
  if (!map?.hotspots?.length) return;

  const expansionId = expansion.id || 'sevii';
  const isSevii = expansionId === 'sevii';
  const isFrontier = expansionId === 'battle-frontier';
  const isHisui = expansionId === 'legends-arceus' || expansionId === 'daybreak';

  const section = document.createElement('section');
  section.className = `guide-region-map guide-region-map--wide guide-region-map--${expansionId}`;
  section.setAttribute('aria-label', `${expansion.title || '擴充'}地圖`);

  const scroll = document.createElement('div');
  scroll.className = 'guide-region-map-scroll';

  const frame = document.createElement('div');
  frame.className = 'guide-region-map-frame';

  const img = document.createElement('img');
  img.className = 'guide-region-map-img';
  img.src = map.src;
  img.alt = map.alt;
  img.loading = 'lazy';
  img.decoding = 'async';
  img.width = map.width || 1672;
  img.height = map.height || 941;
  frame.appendChild(img);

  map.hotspots.forEach((hotspot) => {
    const isStory = hotspot.kind === 'story';
    const isFacility = hotspot.kind === 'facility' || (!isSevii && !isHisui && hotspot.kind === 'island');
    const islandSection = resolveExpansionIslandSection(hotspot.island, expansion);

    let ariaLabel;
    if (isStory) {
      ariaLabel = `重點 ${hotspot.label || hotspot.placeName}`;
    } else if (isFrontier) {
      ariaLabel = islandSection?.title || hotspot.label || `設施 ${hotspot.island}`;
    } else if (isHisui) {
      ariaLabel = hotspot.label || islandSection?.title || `區域 ${hotspot.island}`;
    } else {
      ariaLabel = `${islandSection?.title || `${hotspot.island}之島`} ${SEVII_PHASE_LABELS[hotspot.phase] || ''}`.trim();
    }

    frame.appendChild(createMapHotspotWrap(hotspot, {
      className: isStory
        ? 'guide-map-hotspot-wrap guide-map-hotspot-wrap--story'
        : 'guide-map-hotspot-wrap guide-map-hotspot-wrap--island',
      hotspotClass: isStory ? 'guide-map-hotspot guide-map-hotspot--story' : 'guide-map-hotspot',
      ariaLabel,
      tooltip: buildExpansionMapTooltip(hotspot, expansion),
      onClick: () => {
        if (isFrontier) {
          if (isFacility) {
            scrollToExpansionSection(expansionId, hotspot.island);
          } else if (isStory && hotspot.scrollTo != null) {
            scrollToBattleFrontierStory(hotspot, expansionId);
            if (hotspot.battleRefs?.[0]) {
              window.setTimeout(() => scrollToBattleCard(hotspot.battleRefs[0]), 350);
            }
          }
          return;
        }
        if (isHisui) {
          if (isStory && hotspot.scrollTo != null) {
            scrollHisuiStory(hotspot, expansionId);
            return;
          }
          const sectionNum = resolveHisuiSectionNumber(hotspot);
          if (hotspot.kind === 'island' || (isStory && sectionNum)) {
            scrollToExpansionSection(expansionId, sectionNum);
          }
          if (isStory && hotspot.battleRefs?.[0]) {
            window.setTimeout(() => scrollToBattleCard(hotspot.battleRefs[0]), 350);
          }
          return;
        }
        scrollToExpansionSection(expansionId, hotspot.island);
        if (isStory && hotspot.battleRefs?.[0]) {
          window.setTimeout(() => scrollToBattleCard(hotspot.battleRefs[0]), 350);
        }
      },
    }));
  });

  scroll.appendChild(frame);
  section.appendChild(scroll);

  if (map.caption) {
    const caption = document.createElement('p');
    caption.className = 'guide-map-caption';
    caption.textContent = map.caption;
    section.appendChild(caption);
  }

  const enlarge = document.createElement('a');
  enlarge.className = 'guide-map-enlarge';
  enlarge.href = map.src;
  enlarge.target = '_blank';
  enlarge.rel = 'noopener noreferrer';
  enlarge.textContent = '開啟大圖（新分頁）';
  section.appendChild(enlarge);

  container.appendChild(section);

  if (!container.dataset.mapFocusBound) {
    container.dataset.mapFocusBound = '1';
    document.addEventListener('pointerdown', (e) => {
      if (!e.target.closest('.guide-map-hotspot-wrap')) {
        document.querySelectorAll('.guide-map-hotspot-wrap.is-focused').forEach((el) => {
          el.classList.remove('is-focused');
        });
      }
    });
  }

  bindMapHotspotFocus(section);
  bindGuideMapTooltips(section);
}

function appendRegionMap(container, guide) {
  const map = getGuideMap(guide.id);
  if (!map) return;

  const hasGymHotspots = map.hotspots?.length && guide.gyms?.length;
  const opponents = getLeagueOpponents(guide);
  const hasLeagueHotspot = map.leagueHotspot && opponents.length && guide.league?.recommendedTeams?.length;
  if (!hasGymHotspots && !hasLeagueHotspot) return;

  const section = document.createElement('section');
  section.className = 'guide-region-map guide-region-map--wide';
  section.setAttribute('aria-label', '地區地圖');

  const scroll = document.createElement('div');
  scroll.className = 'guide-region-map-scroll';

  const frame = document.createElement('div');
  frame.className = 'guide-region-map-frame';

  const img = document.createElement('img');
  img.className = 'guide-region-map-img';
  img.src = map.src;
  img.alt = map.alt;
  img.loading = 'lazy';
  img.decoding = 'async';
  img.width = 1672;
  img.height = 941;
  frame.appendChild(img);

  if (hasGymHotspots) {
    map.hotspots.forEach((hotspot) => {
      const gymOrder = getGymOrderForSlot(guide.id, hotspot.slot);
      const gym = guide.gyms.find((g) => g.order === gymOrder);
      if (!gym) return;
      const seqMode = guide.gymSequenceMode || 'fixed';
      frame.appendChild(createMapHotspotWrap(hotspot, {
        ariaLabel: buildGymHotspotLabel(gym, seqMode),
        tooltip: buildGymMapTooltip(gym, seqMode),
        onClick: () => scrollToBattleCard(`gym:${gym.order}`),
      }));
    });
  }

  if (hasLeagueHotspot) {
    const spot = map.leagueHotspot;
    frame.appendChild(createMapHotspotWrap(spot, {
      className: 'guide-map-hotspot-wrap guide-map-hotspot-wrap--league',
      ariaLabel: `四天王與冠軍 ${spot.label}`,
      tooltip: buildLeagueMapTooltip(guide, opponents, spot),
      onClick: () => scrollToBattleCard('league'),
    }));
  }

  scroll.appendChild(frame);
  section.appendChild(scroll);

  if (map.caption) {
    const caption = document.createElement('p');
    caption.className = 'guide-map-caption';
    caption.textContent = map.caption;
    section.appendChild(caption);
  }

  const enlarge = document.createElement('a');
  enlarge.className = 'guide-map-enlarge';
  enlarge.href = map.src;
  enlarge.target = '_blank';
  enlarge.rel = 'noopener noreferrer';
  enlarge.textContent = '開啟大圖（新分頁）';
  section.appendChild(enlarge);

  container.appendChild(section);

  if (!container.dataset.mapFocusBound) {
    container.dataset.mapFocusBound = '1';
    document.addEventListener('pointerdown', (e) => {
      if (!e.target.closest('.guide-map-hotspot-wrap')) {
        document.querySelectorAll('.guide-map-hotspot-wrap.is-focused').forEach((el) => {
          el.classList.remove('is-focused');
        });
      }
    });
  }

  bindMapHotspotFocus(section);
  bindGuideMapTooltips(section);
}

function createMapHotspotWrap(hotspot, { className = 'guide-map-hotspot-wrap', hotspotClass = 'guide-map-hotspot', ariaLabel, tooltip, onClick }) {
  const wrap = document.createElement('div');
  wrap.className = className;
  wrap.style.left = hotspot.left;
  wrap.style.top = hotspot.top;
  if (hotspot.width) wrap.style.width = hotspot.width;
  if (hotspot.height) wrap.style.height = hotspot.height;
  if (hotspot.placement) wrap.dataset.placement = hotspot.placement;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = hotspotClass;
  btn.setAttribute('aria-label', ariaLabel);

  wrap.appendChild(btn);
  wrap.appendChild(tooltip);
  btn.addEventListener('click', onClick);

  return wrap;
}

function bindMapHotspotFocus(section) {
  section.querySelectorAll('.guide-map-hotspot').forEach((btn) => {
    btn.addEventListener('focus', () => {
      btn.closest('.guide-map-hotspot-wrap')?.classList.add('is-focused');
    });
    btn.addEventListener('blur', () => {
      btn.closest('.guide-map-hotspot-wrap')?.classList.remove('is-focused');
    });
  });
}

function buildGymHotspotLabel(gym, sequenceMode = 'fixed') {
  const typeLabel = typeNamesCN[gym.badgeType] || gym.badgeType || '';
  if (sequenceMode === 'suggested') {
    return `道館 ${gym.name}${typeLabel ? `（${typeLabel}系）` : ''} ${gym.location || ''}`.trim();
  }
  return `第 ${gym.order} 道館 ${gym.name} ${gym.location || ''} ${typeLabel}系`.trim();
}

function buildGymMapTooltip(gym, sequenceMode = 'fixed') {
  const tooltip = document.createElement('div');
  tooltip.className = 'guide-map-tooltip';
  tooltip.setAttribute('role', 'tooltip');

  const typeBg = typeColors[gym.badgeType] || '#666';
  const typeLabel = typeNamesCN[gym.badgeType] || gym.badgeType || '';

  let partyHtml = '';
  gym.party.forEach((p) => {
    partyHtml += `<li>
      <span class="guide-pokemon-name">${p.name}</span>
      ${p.level ? `<span class="guide-level">等級${p.level}</span>` : ''}
      <span class="guide-type-badges">${renderTypeBadges(p.types)}</span>
    </li>`;
  });

  let noteHtml = '';
  if (gym.notes) {
    const noteText = gym.notes.length > 40 ? `${gym.notes.slice(0, 40)}…` : gym.notes;
    noteHtml = `<div class="guide-map-tooltip-note">${noteText}</div>`;
  }

  const orderLabel = sequenceMode === 'suggested'
    ? `道館 · ${gym.name}`
    : `第 ${gym.order} 道館`;

  tooltip.innerHTML = `
    <div class="guide-map-tooltip-header">
      <span class="guide-map-tooltip-order">${orderLabel}</span>
      <span class="guide-map-tooltip-type type-badge" style="background:${typeBg}">${typeLabel}</span>
    </div>
    <div class="guide-map-tooltip-leader">${gym.name}</div>
    <div class="guide-map-tooltip-meta">
      ${gym.location ? `<span>📍 ${gym.location}</span>` : ''}
      ${gym.badge ? `<span>🏅 ${gym.badge}</span>` : ''}
    </div>
    ${noteHtml}
    <div class="guide-map-tooltip-divider"></div>
    <div class="guide-map-tooltip-party-title">對手隊伍</div>
    <ul class="guide-map-tooltip-party">${partyHtml}</ul>
    <div class="guide-map-tooltip-hint">點擊查看攻略 →</div>
  `;

  return tooltip;
}

function buildLeagueMapTooltip(guide, opponents, spot) {
  const tooltip = document.createElement('div');
  tooltip.className = 'guide-map-tooltip guide-map-tooltip--league';
  tooltip.setAttribute('role', 'tooltip');

  let rosterHtml = '';
  opponents.forEach(({ battle, battleRef }, index) => {
    const isChampion = battleRef === 'champion';
    const roleLabel = isChampion ? '冠軍' : `四天王 ${index + 1}`;
    const typeKey = battle.specialty || battle.badgeType;
    const typeBg = typeKey ? (typeColors[typeKey] || '#666') : '';
    const typeLabel = typeKey ? (typeNamesCN[typeKey] || typeKey) : '';
    const typeBadge = typeLabel
      ? `<span class="type-badge" style="background:${typeBg}">${typeLabel}</span>`
      : '';

    rosterHtml += `<li class="guide-map-tooltip-roster-row">
      <span class="guide-map-tooltip-roster-role">${roleLabel}</span>
      <span class="guide-map-tooltip-roster-name">${battle.name}</span>
      ${typeBadge}
    </li>`;
  });

  const intro = guide.league?.intro || guide.league?.note;
  const introHtml = intro
    ? `<p class="guide-map-tooltip-league-intro">${intro.length > 48 ? `${intro.slice(0, 48)}…` : intro}</p>`
    : '';

  tooltip.innerHTML = `
    <div class="guide-map-tooltip-header">
      <span class="guide-map-tooltip-order">四天王＋冠軍</span>
    </div>
    <div class="guide-map-tooltip-meta">
      <span>📍 ${spot.label || '石英高原'}</span>
      <span>連續 ${opponents.length} 場</span>
    </div>
    ${introHtml}
    <ul class="guide-map-tooltip-roster">${rosterHtml}</ul>
    <div class="guide-map-tooltip-hint">點擊查看攻略 →</div>
  `;

  return tooltip;
}

function scrollToBattleCard(battleRef) {
  if (battleRef === 'league') {
    const section = document.querySelector('.guide-league-section');
    if (!section) return;
    updateBattleInUrl(null);
    scrollToGuideTarget(section);
    return;
  }

  const detail = document.querySelector(`.guide-battle-detail[data-battle-ref="${battleRef}"]`);
  if (!detail) return;

  const card = detail.closest('.guide-battle-card');
  if (!card) return;

  if (detail.hidden) {
    card.querySelector('.guide-battle-toggle')?.click();
  } else {
    updateBattleInUrl(battleRef);
  }

  scrollToGuideTarget(card);
}

function scrollToGymBattle(gymOrder) {
  scrollToBattleCard(`gym:${gymOrder}`);
}

function appendLeagueSection(container, guide) {
  const league = guide.league;
  const opponents = getLeagueOpponents(guide);
  if (!league?.recommendedTeams?.length) return;

  const section = document.createElement('section');
  section.className = 'guide-league-section';
  section.dataset.battleRef = 'league';

  const heading = document.createElement('h2');
  heading.className = 'guide-page-section-heading';
  heading.textContent = guide.leagueSectionTitle || '四天王＋冠軍（連戰）';
  section.appendChild(heading);

  const introText = league.intro || league.note;
  if (introText) {
    const note = document.createElement('p');
    note.className = 'guide-league-note';
    note.textContent = introText;
    section.appendChild(note);
  }

  if (league.coverage?.length) {
    section.appendChild(renderLeagueSubsection(
      league.coverageTitle || '聯盟必備攻擊面',
      renderCoverageTable(league.coverage),
    ));
  }

  section.appendChild(renderRecommendedTeamsBlock(
    league.recommendedTeams,
    league.teamBlockTitle || '建議攜帶隊伍（6 隻一次帶入打完全程）',
  ));

  if (league.battleOrder?.length) {
    section.appendChild(renderLeagueSubsection(
      '連戰上場分配',
      renderSimpleTable(
        ['戰鬥', '主要打手', '備用'],
        league.battleOrder.map((row) => [row.battle, row.leads, row.backup]),
      ),
    ));
  }

  if (opponents.length) {
    const oppHeading = document.createElement('h3');
    oppHeading.className = 'guide-section-title guide-league-opponents-title';
    oppHeading.textContent = '各戰打法與對手情報';
    section.appendChild(oppHeading);

    const oppWrap = document.createElement('div');
    oppWrap.className = 'guide-battle-timeline-section guide-league-opponents';
    oppWrap.appendChild(renderBattleTimeline(opponents, {
      mode: 'league',
      sequenceMode: 'fixed',
      guideId: guide.id,
      league,
    }));
    section.appendChild(oppWrap);
  }

  if (league.starterLineups?.length) {
    section.appendChild(renderLeagueSubsection(
      '依御三家推薦編成',
      renderStarterLineups(league.starterLineups),
    ));
  }

  if (league.moveSets?.length) {
    section.appendChild(renderLeagueCollapsible('招式配置建議', renderMoveSets(league.moveSets)));
  }

  if (league.items?.length) {
    section.appendChild(renderLeagueCollapsible('進聯盟前道具準備', renderItemsTable(league.items)));
  }

  if (league.pitfalls?.length || league.conclusion) {
    let extra = '';
    if (league.pitfalls?.length) {
      extra += '<ul class="guide-league-tips">';
      league.pitfalls.forEach((tip) => { extra += `<li>${tip}</li>`; });
      extra += '</ul>';
    }
    if (league.conclusion) {
      extra += `<p class="guide-league-conclusion">${league.conclusion}</p>`;
    }
    section.appendChild(renderLeagueSubsection('連戰注意與結論', extra));
  }

  container.appendChild(section);
}

function renderLeagueSubsection(title, innerHtml) {
  const block = document.createElement('section');
  block.className = 'guide-detail-section guide-league-block';
  block.innerHTML = `<h3 class="guide-section-title">${title}</h3>${innerHtml}`;
  return block;
}

function renderLeagueCollapsible(title, innerHtml) {
  const wrap = document.createElement('details');
  wrap.className = 'guide-league-collapsible';
  wrap.innerHTML = `<summary class="guide-league-collapsible-summary">${title}</summary><div class="guide-league-collapsible-body">${innerHtml}</div>`;
  return wrap;
}

function renderCoverageTable(coverage) {
  let html = '<div class="guide-table-wrap"><table class="guide-league-table"><thead><tr>'
    + '<th>攻擊屬性</th><th>用途</th></tr></thead><tbody>';
  coverage.forEach((row) => {
    const typeBadge = row.attackType && row.attackType !== 'normal'
      ? renderTypeBadges([row.attackType])
      : `<span class="guide-table-label">${row.label}</span>`;
    html += `<tr><td>${typeBadge}</td><td>${row.uses}</td></tr>`;
  });
  html += '</tbody></table></div>';
  return html;
}

function renderSimpleTable(headers, rows) {
  let html = '<div class="guide-table-wrap"><table class="guide-league-table"><thead><tr>';
  headers.forEach((h) => { html += `<th>${h}</th>`; });
  html += '</tr></thead><tbody>';
  rows.forEach((row) => {
    html += '<tr>';
    row.forEach((cell) => { html += `<td>${cell}</td>`; });
    html += '</tr>';
  });
  html += '</tbody></table></div>';
  return html;
}

function renderMatchupTable(matchups, party = []) {
  let html = '<div class="guide-matchup-card"><div class="guide-table-wrap"><table class="guide-league-table"><thead><tr>'
    + '<th>對手</th><th>推薦上場</th></tr></thead><tbody>';
  matchups.forEach((m) => {
    const member = findPartyMember(party, m.opponent);
    const opponentCell = member
      ? `<span class="guide-matchup-opponent"><span class="guide-pokemon-name">${m.opponent}</span>`
        + `<span class="guide-type-badges">${renderTypeBadges(member.types)}</span></span>`
      : m.opponent;
    html += `<tr><td>${opponentCell}</td><td>${m.counters}</td></tr>`;
  });
  html += '</tbody></table></div></div>';
  return html;
}

function renderBattleTips(tips) {
  if (!tips?.length) return '';
  let html = '<div class="guide-battle-tips">';
  tips.forEach((tip) => { html += `<div class="guide-battle-tip">${tip}</div>`; });
  html += '</div>';
  return html;
}

function findPartyMember(party, opponentLabel) {
  if (!party?.length) return null;
  const stripped = opponentLabel.replace(/^第[一二三四1-4１-４]隻/, '').trim();
  return party.find((p) => opponentLabel.includes(p.name) || stripped === p.name) || null;
}

function getOpponentRoleLabel(guideId, battleRef, index) {
  if (guideId === 'legends-arceus') {
    return battleRef === 'champion' ? '最終戰' : `連戰 ${index + 1}`;
  }
  if (battleRef === 'champion') return '冠軍';
  return `四天王 ${index + 1}`;
}

function getBattleGuidePreview(battleGuide) {
  if (battleGuide?.intro) return battleGuide.intro;
  if (battleGuide?.tips?.[0]) return battleGuide.tips[0];
  return '';
}

function getSpecialtyKey(battle) {
  return battle.badgeType || battle.specialty || null;
}

function isSequenceNumbered(battle, sequenceMode) {
  if (battle.sequential === false) return false;
  return sequenceMode === 'fixed';
}

function getBattlePreview(battle, battleGuide, mode) {
  if (mode === 'league') return getBattleGuidePreview(battleGuide);
  if (!battle.notes) return '';
  const firstSentence = battle.notes.split(/[。！？\n]/)[0];
  return firstSentence.length > 80 ? `${firstSentence.slice(0, 80)}…` : firstSentence;
}

function getTimelineMode(battle, rolePrefix) {
  if (rolePrefix === 'noble' || battle.role === 'noble') return 'noble';
  return 'gym';
}

function getTimelineRoleLabel(battle, mode, sequenceMode, index, guideId, battleRef) {
  if (mode === 'league') return getOpponentRoleLabel(guideId, battleRef, index);
  if (mode === 'gym') {
    return isSequenceNumbered(battle, sequenceMode) ? `道館 ${battle.order}` : '道館';
  }
  if (mode === 'noble') return '王／女王';
  switch (battle.role) {
    case 'trainer':
      return isSequenceNumbered(battle, sequenceMode) ? `戰鬥 ${battle.order}` : '戰鬥';
    case 'wild':
      return '事件';
    case 'legendary':
      return '傳說';
    default:
      return battle.name;
  }
}

function getTimelineMarkerContent(index, battle, sequenceMode, isChampion) {
  if (isChampion) {
    return { className: ' guide-timeline-index--champion', text: '★' };
  }
  if (isSequenceNumbered(battle, sequenceMode)) {
    return { className: '', text: String(index + 1) };
  }
  return { className: ' guide-timeline-index--dot', text: '' };
}

function renderBattleTimeline(entries, options) {
  const timeline = document.createElement('div');
  timeline.className = 'guide-battle-timeline guide-league-timeline';
  entries.forEach((entry, index) => {
    timeline.appendChild(renderTimelineItem({ ...entry, index }, options));
  });
  return timeline;
}

function renderTimelineItem(entry, options) {
  const {
    battle, battleRef, index,
    mode, sequenceMode = 'fixed', guideId,
    league, annotationId, rolePrefix,
  } = { ...options, ...entry };

  const isChampion = battleRef === 'champion';
  const battleGuide = mode === 'league' ? league?.battles?.[battleRef] : null;
  const specialtyKey = getSpecialtyKey(battle);
  const accent = specialtyKey ? (typeColors[specialtyKey] || '#666') : '#888';
  const roleLabel = getTimelineRoleLabel(battle, mode, sequenceMode, index, guideId, battleRef);
  const preview = getBattlePreview(battle, battleGuide, mode);
  const markerInfo = getTimelineMarkerContent(index, battle, sequenceMode, isChampion);

  const extraClasses = [
    mode === 'league' ? 'guide-opponent-card' : '',
    mode === 'gym' ? 'guide-gym-card' : '',
    battle.role === 'legendary' ? 'guide-battle-card--legendary' : '',
    battle.role === 'noble' ? 'guide-battle-card--noble' : '',
    isChampion ? 'guide-timeline-item--champion' : '',
  ].filter(Boolean).join(' ');

  const item = document.createElement('article');
  item.className = `guide-timeline-item guide-battle-card ${extraClasses}`.trim();
  item.style.setProperty('--timeline-accent', accent);

  const marker = document.createElement('div');
  marker.className = 'guide-timeline-marker';
  marker.innerHTML = `<span class="guide-timeline-index${markerInfo.className}"`
    + ` aria-hidden="true">${markerInfo.text}</span>`;

  const body = document.createElement('div');
  body.className = 'guide-timeline-body';

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'guide-opponent-toggle guide-battle-toggle';
  toggle.setAttribute('aria-expanded', 'false');

  const specialtyBadge = specialtyKey
    ? `<span class="guide-type-badges">${renderTypeBadges([specialtyKey])}</span>`
    : '';
  const locationHtml = (mode === 'gym' && sequenceMode === 'suggested' && battle.location)
    ? `<span class="guide-opponent-location">${battle.location}</span>`
    : '';
  const previewHtml = preview
    ? `<span class="guide-opponent-preview">${preview}</span>`
    : '';

  toggle.innerHTML = `<span class="guide-opponent-toggle-main">`
    + `<span class="guide-opponent-role">${roleLabel}</span>`
    + `<span class="guide-opponent-name">${battle.name}</span>`
    + locationHtml
    + specialtyBadge
    + `</span>${previewHtml}`;

  const detail = document.createElement('div');
  detail.className = 'guide-opponent-detail guide-battle-detail';
  detail.dataset.battleRef = battleRef;
  detail.hidden = true;

  const closeUrlValue = mode === 'league' ? 'league' : null;

  toggle.addEventListener('click', () => {
    const opening = detail.hidden;
    const timeline = item.closest('.guide-battle-timeline');
    timeline?.querySelectorAll('.guide-timeline-item .guide-battle-detail').forEach((d) => {
      d.hidden = true;
    });
    timeline?.querySelectorAll('.guide-timeline-item .guide-battle-toggle').forEach((t) => {
      t.classList.remove('is-open');
      t.setAttribute('aria-expanded', 'false');
    });
    if (opening) {
      detail.hidden = false;
      toggle.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      if (!detail.dataset.rendered) {
        let expansionId = rolePrefix?.startsWith('expansion:')
          ? rolePrefix.slice('expansion:'.length)
          : null;
        if (!expansionId && annotationId) expansionId = annotationId;
        detail.innerHTML = mode === 'league'
          ? renderOpponentDetail(battle, battleRef, battleGuide)
          : renderBattleDetail(battle, expansionId);
        detail.dataset.rendered = '1';
      }
      updateBattleInUrl(battleRef);
    } else {
      updateBattleInUrl(closeUrlValue);
    }
  });

  body.appendChild(toggle);
  body.appendChild(detail);
  item.appendChild(marker);
  item.appendChild(body);
  return item;
}

function renderOpponentSummary(battleGuide) {
  if (!battleGuide?.intro) return '';
  return `<div class="guide-opponent-summary">${battleGuide.intro}</div>`;
}

function renderOpponentParty(party) {
  if (!party?.length) return '';
  let html = '<ul class="guide-party-grid">';
  party.forEach((p, i) => {
    const isLead = i === party.length - 1;
    html += `<li class="guide-party-grid-row${isLead ? ' guide-party-grid-row--lead' : ''}">`
      + `<span class="guide-party-grid-name">${p.name}</span>`
      + `${p.level ? `<span class="guide-level">Lv.${p.level}</span>` : ''}`
      + `<span class="guide-type-badges">${renderTypeBadges(p.types)}</span>`
      + `</li>`;
  });
  html += '</ul>';
  return html;
}

function renderStarterLineups(lineups) {
  let html = '<div class="guide-starter-lineups">';
  lineups.forEach((row) => {
    const starterTypes = row.starterTypes?.length
      ? `<span class="guide-type-badges">${renderTypeBadges(row.starterTypes)}</span>`
      : '';
    html += `<div class="guide-starter-card">
      <div class="guide-starter-title"><span>開局：${row.starter}</span>${starterTypes}</div>
      <ol class="guide-starter-slots">`;
    row.pokemon.forEach((entry, i) => {
      const p = typeof entry === 'string' ? { name: entry, types: [] } : entry;
      const badges = p.types?.length
        ? `<span class="guide-type-badges">${renderTypeBadges(p.types)}</span>`
        : '';
      html += `<li>
        <span class="guide-starter-num">${i + 1}</span>
        <span class="guide-pokemon-name">${p.name}</span>
        ${badges}
      </li>`;
    });
    html += `</ol><p class="guide-starter-summary">${row.summary}</p></div>`;
  });
  html += '</div>';
  return html;
}

function renderMoveSourceBadge(move) {
  if (!move.source || !MOVE_SOURCE_META[move.source]) return '';
  const meta = MOVE_SOURCE_META[move.source];
  let label = meta.label;
  let tip = meta.tip || '';
  if ((move.source === 'tm' || move.source === 'hm') && move.sourceDetail) {
    label = move.sourceDetail;
    tip = `${meta.tipPrefix} ${move.sourceDetail}`;
  }
  return `<span class="guide-move-source guide-move-source--${move.source}" title="${tip}">${label}</span>`;
}

function renderMoveSourceLegend() {
  const items = ['level', 'tm', 'hm', 'tutor'].map((key) => {
    const meta = MOVE_SOURCE_META[key];
    const tip = meta.tip || `${meta.tipPrefix}（編號）`;
    const demoLabel = key === 'tm' ? 'TM##' : key === 'hm' ? 'HM##' : meta.label;
    return `<span class="guide-move-source guide-move-source--${key}" title="${tip}">${demoLabel}</span>`;
  }).join('');
  return `<div class="guide-move-source-legend"><span class="guide-move-source-legend-label">學習方式</span>${items}</div>`;
}

function renderMoveSets(moveSets) {
  let html = '<div class="guide-movesets">';
  html += renderMoveSourceLegend();
  moveSets.forEach((set) => {
    html += `<div class="guide-moveset-card">
      <div class="guide-moveset-name">${set.pokemon}</div>`;
    if (set.role) html += `<p class="guide-moveset-role">${set.role}</p>`;
    html += '<ul class="guide-move-list">';
    set.moves.forEach((m) => {
      const moveType = resolveMoveType(m);
      const typeBadge = moveType
        ? `<span class="guide-type-badges">${renderTypeBadges([moveType])}</span>`
        : '';
      html += `<li class="guide-move-row">
        ${renderMoveSourceBadge(m)}
        <span class="guide-move-name-wrap">
          <span class="guide-move-name">${m.name}</span>${typeBadge}
        </span>
        <span class="guide-move-use">${m.use}</span>
      </li>`;
    });
    html += '</ul>';
    if (set.note) html += `<p class="guide-moveset-note">${set.note}</p>`;
    html += '</div>';
  });
  html += '</div>';
  return html;
}

function renderItemsTable(items) {
  return renderSimpleTable(
    ['道具', '建議數量'],
    items.map((i) => [i.name, i.quantity + (i.note ? `（${i.note}）` : '')]),
  );
}

function renderChampionVariants(championGuide, party = []) {
  if (!championGuide?.variants?.length) return '';
  let html = '<div class="guide-champion-variants">';
  championGuide.variants.forEach((variant, index) => {
    const open = index === 0 ? ' open' : '';
    html += `<details class="guide-variant-panel"${open}>
      <summary class="guide-variant-summary">
        <span class="guide-variant-label">${variant.label}</span>
        <span class="guide-variant-sub">${variant.subtitle || ''}</span>
      </summary>
      <div class="guide-variant-body">`;
    if (variant.tips?.length) html += renderBattleTips(variant.tips);
    if (variant.essentials?.length) {
      html += '<div class="guide-table-wrap"><table class="guide-league-table"><thead><tr>'
        + '<th>必備</th><th>原因</th></tr></thead><tbody>';
      variant.essentials.forEach((e) => {
        html += `<tr><td>${e.name}</td><td>${e.reason}</td></tr>`;
      });
      html += '</tbody></table></div>';
    }
    if (variant.matchups?.length) {
      html += '<h4 class="guide-variant-subtitle">推薦處理</h4>';
      html += renderMatchupTable(variant.matchups, party);
    }
    html += '</div></details>';
  });
  html += '</div>';
  return html;
}

function renderRecommendedTeamsBlock(teams, title) {
  const block = document.createElement('section');
  block.className = 'guide-detail-section';
  block.innerHTML = `<h3 class="guide-section-title">${title}</h3>`;
  const grid = document.createElement('div');
  grid.className = 'guide-teams-grid';
  grid.innerHTML = teams.map((team) => {
    let html = `<div class="guide-team-block"><div class="guide-team-label">${team.label}</div><ul class="guide-team-list">`;
    team.pokemon.forEach((p) => {
      html += `<li class="guide-team-row">
        <span class="guide-pokemon-name">${p.name}</span>
        <span class="guide-type-badges">${renderTypeBadges(p.types)}</span>
      </li>`;
    });
    html += `</ul><p class="guide-team-reason">${team.reason}</p></div>`;
    return html;
  }).join('');
  block.appendChild(grid);
  return block;
}

function renderOpponentDetail(battle, battleRef, battleGuide) {
  const metaItems = [];
  if (battle.specialty) {
    metaItems.push(`<span class="guide-meta-chip">專長：${typeNamesCN[battle.specialty] || battle.specialty}</span>`);
  }
  if (battle.notes) {
    metaItems.push(`<span class="guide-meta-chip">${battle.notes}</span>`);
  }

  let html = '<div class="guide-battle-detail-inner guide-opponent-detail-inner">';
  html += `<div class="guide-leader-name">${battle.name}</div>`;
  if (metaItems.length) html += `<div class="guide-meta-row">${metaItems.join('')}</div>`;

  if (battleRef === 'champion' && battleGuide?.variants) {
    if (battleGuide.intro) html += renderOpponentSummary(battleGuide);
    html += '<section class="guide-detail-section"><h3 class="guide-section-title">對手隊伍</h3>';
    html += renderOpponentParty(battle.party);
    html += '</section>';
    html += '<section class="guide-detail-section"><h3 class="guide-section-title">冠軍戰打法（依御三家）</h3>';
    html += renderChampionVariants(battleGuide, battle.party);
    html += '</section>';
  } else if (battleGuide) {
    html += renderOpponentSummary(battleGuide);
    html += '<section class="guide-detail-section"><h3 class="guide-section-title">對手隊伍</h3>';
    html += renderOpponentParty(battle.party);
    html += '</section>';
    if (battleGuide.tips?.length) {
      html += '<section class="guide-detail-section"><h3 class="guide-section-title">注意事項</h3>';
      html += renderBattleTips(battleGuide.tips);
      html += '</section>';
    }
    if (battleGuide.matchups?.length) {
      html += '<section class="guide-detail-section"><h3 class="guide-section-title">推薦上場</h3>';
      html += renderMatchupTable(battleGuide.matchups, battle.party);
      html += '</section>';
    }
  } else {
    html += '<section class="guide-detail-section"><h3 class="guide-section-title">對手隊伍</h3>';
    html += renderOpponentParty(battle.party);
    html += '</section>';
  }

  html += '</div>';
  return html;
}

function appendBattleSection(container, title, battles, rolePrefix, annotationId = null, options = {}) {
  if (!battles?.length) return;
  const { sequenceMode = 'fixed' } = options;

  const heading = document.createElement('h2');
  heading.className = 'guide-page-section-heading';
  heading.textContent = title;
  container.appendChild(heading);

  const entries = battles.map((b) => ({
    battle: b,
    battleRef: b.order != null ? `${rolePrefix}:${b.order}` : 'champion',
    mode: getTimelineMode(b, rolePrefix),
  }));

  const wrap = document.createElement('div');
  wrap.className = 'guide-battle-timeline-section';
  wrap.appendChild(renderBattleTimeline(entries, {
    sequenceMode,
    annotationId,
    rolePrefix,
  }));
  container.appendChild(wrap);
}

function renderBattleDetail(battle, expansionId = null) {
  const annotateNotes = expansionId
    ? (text) => renderExpansionAnnotated(text, expansionId)
    : renderAnnotated;

  let html = '<div class="guide-battle-detail-inner">';

  if (battle.notes) {
    html += `<div class="guide-opponent-summary">${annotateNotes(battle.notes)}</div>`;
  }

  const metaItems = [];
  if (battle.location) metaItems.push(`<span class="guide-meta-chip">📍 ${battle.location}</span>`);
  if (battle.badge) metaItems.push(`<span class="guide-meta-chip">🏅 ${battle.badge}</span>`);
  const specialtyKey = getSpecialtyKey(battle);
  if (specialtyKey) {
    metaItems.push(`<span class="guide-meta-chip">專長：${typeNamesCN[specialtyKey] || specialtyKey}</span>`);
  }

  html += `<div class="guide-leader-name">${battle.name}</div>`;
  if (metaItems.length) html += `<div class="guide-meta-row">${metaItems.join('')}</div>`;

  const isWildEncounter = battle.role === 'wild' || battle.role === 'legendary';
  const partyTitle = isWildEncounter ? '野生寶可夢' : '對手隊伍';

  html += `<section class="guide-detail-section"><h3 class="guide-section-title">${partyTitle}</h3>`;
  html += renderOpponentParty(battle.party);
  html += '</section>';

  html += '<section class="guide-detail-section"><h3 class="guide-section-title">建議攜帶隊伍</h3><div class="guide-teams-grid">';
  battle.recommendedTeams.forEach((team) => {
    html += `<div class="guide-team-block">
      <div class="guide-team-label">${team.label}</div>
      <ul class="guide-team-list">`;
    team.pokemon.forEach((p) => {
      html += `<li class="guide-team-row">
        <span class="guide-pokemon-name">${p.name}</span>
        <span class="guide-type-badges">${renderTypeBadges(p.types)}</span>
      </li>`;
    });
    html += `</ul><p class="guide-team-reason">${team.reason}</p></div>`;
  });
  html += '</div></section>';
  html += '</div>';
  return html;
}

function renderTypeBadges(types) {
  return types.map((t) => {
    const bg = typeColors[t] || '#666';
    const label = typeNamesCN[t] || t;
    return `<span class="type-badge" style="background:${bg}">${label}</span>`;
  }).join('');
}

function updateBattleInUrl(battleRef) {
  const url = new URL(location.href);
  if (battleRef) url.searchParams.set('battle', battleRef);
  else url.searchParams.delete('battle');
  history.replaceState(null, '', url);
}

function applyBattleDeepLink() {
  const battleRef = new URLSearchParams(location.search).get('battle');
  if (!battleRef) return;
  requestAnimationFrame(() => {
    if (battleRef === 'league') return;
    const isLeagueOpponent = battleRef === 'champion' || battleRef.startsWith('eliteFour:');
    if (isLeagueOpponent) {
      document.querySelectorAll('.guide-opponent-card').forEach((item) => {
        const detail = item.querySelector('.guide-battle-detail');
        if (detail?.dataset.battleRef === battleRef) {
          item.querySelector('.guide-battle-toggle')?.click();
        }
      });
      return;
    }
    document.querySelectorAll('.guide-battle-card:not(.guide-opponent-card)').forEach((item) => {
      const detail = item.querySelector('.guide-battle-detail');
      if (detail?.dataset.battleRef === battleRef) {
        item.querySelector('.guide-battle-toggle')?.click();
      }
    });
  });
}

export function getActiveGuideContext() {
  return { versionId: activeVersionId };
}
