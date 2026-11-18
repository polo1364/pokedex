/* Regional map rendering. Layout only moves labels, never source anchors. */
const $ = (id) => document.getElementById(id);
const params = new URLSearchParams(location.search);
const palette = {rock:'#576678',water:'#1263b1',electric:'#f2c329',grass:'#18733d',psychic:'#ad246e',poison:'#7532ad',fire:'#be3b27',ground:'#9a5a1b',flying:'#4659a1',bug:'#586e16',normal:'#685652',ghost:'#57316f',fighting:'#a13f32',steel:'#405b66',ice:'#116b80',dragon:'#4e399c',dark:'#303b4b',fairy:'#9e3264',mixed:'#344b65','fighting/ghost':'#793f72','rock/ice':'#396b77'};
const typeNames={rock:'岩石',water:'水',electric:'電',grass:'草',psychic:'超能力',poison:'毒',fire:'火',ground:'地面',flying:'飛行',bug:'蟲',normal:'一般',ghost:'幽靈',fighting:'格鬥',steel:'鋼',ice:'冰',dragon:'龍',dark:'惡',fairy:'妖精',mixed:'多屬性','fighting/ghost':'格鬥／幽靈','rock/ice':'岩石／冰'};
const ns='http://www.w3.org/2000/svg';
function el(tag,attrs={},text){const node=document.createElementNS(ns,tag);for(const [key,value] of Object.entries(attrs))node.setAttribute(key,String(value));if(text!==undefined)node.textContent=text;return node;}
function color(p){return p.color||palette[p.type]||(p.kind==='league'?'#25326b':p.kind==='city'?'#08786f':/Forest|Woods|Jungle|Meadow|Park/.test(p.english)?'#246b50':/Cave|Tunnel|Mountain|Mt\./.test(p.english)?'#72543e':'#344b65');}
function overlap(a,b){return a.x<b.x+b.w+8&&a.x+a.w+8>b.x&&a.y<b.y+b.h+8&&a.y+a.h+8>b.y;}
let atlas,version,current,selected;
let viewMode='readable';
const embedded=params.get('embedded')==='1';
if(embedded)document.body.classList.add('embedded');

function guideUrl(p){
  const url=new URL('../guide.html',location.href);
  url.searchParams.set('version',version);
  if(p?.gymOrder)url.searchParams.set('battle',`gym:${p.gymOrder}`);
  if(p?.battleRef)url.searchParams.set('battle',p.battleRef);
  if(p?.guidePart||current?.guidePart)url.searchParams.set('part',p?.guidePart||current.guidePart);
  if(p?.guideSection)url.hash=`expansion-section-${p.guideSectionPrefix||p.guidePart}-${p.guideSection}`;
  return url.href;
}
function showPlace(id){
  const p=current.locations.find(p=>p.id===id)||current.routes.find(p=>p.id===id);
  if(!p)return;
  selected=id;
  $('place-name').textContent=p.name;$('place-en').textContent=p.english;
  $('place-kind').textContent=({gym:'道館',challenge:'試煉／挑戰',city:'城鎮',league:'寶可夢聯盟',landmark:'地點',route:'道路',water:'水道',land:'道路'})[p.kind]||'地點';
  $('place-detail').textContent=p.description||(p.leader?p.leader+(p.type?` · ${typeNames[p.type]||p.type}`:''):'點位依本圖來源定位；詳細出入方式與版本限制請參閱攻略。');
  $('places').replaceChildren();for(const text of p.places||[]){const li=document.createElement('li');li.textContent=text;$('places').append(li);}
  for(const link of p.guideLinks||[]){const li=document.createElement('li'),a=document.createElement('a');a.textContent=link.label;a.href=guideUrl(link);a.target='_top';li.append(a);$('places').append(li);}
  $('place-select').value=id;
  $('battle-link').hidden=!(p.gymOrder||p.battleRef||p.guideSection);$('battle-link').href=guideUrl(p);
  for(const node of $('map').querySelectorAll('.selected'))node.classList.remove('selected');
  const node=[...$('map').querySelectorAll('[data-id]')].find(n=>n.dataset.id===id);node?.classList.add('selected');
}
function fillPlaces(){
  const query=$('search').value.trim().toLowerCase();$('place-select').replaceChildren();
  for(const p of [...current.locations,...current.routes].filter(p=>(p.name+' '+p.english).toLowerCase().includes(query))){const o=document.createElement('option');o.value=p.id;o.textContent=p.name;$('place-select').append(o);}
  if([...$('place-select').options].some(o=>o.value===selected))$('place-select').value=selected;
  if(query && $('place-select').options.length===1)showPlace($('place-select').value);
}

function fitMap(){
  viewMode='fit';
  const viewport=$('viewport');
  const ratio=(200+2000*current.height/current.width)/2200;
  const maxHeight=parseFloat(getComputedStyle(viewport).maxHeight);
  $('canvas').style.width=`${Math.min(viewport.clientWidth-2,(maxHeight-2)/ratio)}px`;
  draw();
  viewport.scrollTo(0,0);
}

function readableMap(){
  viewMode='readable';
  $('canvas').style.width=`${Math.max(1100,$('viewport').clientWidth-2)}px`;
  draw();
}

function textWidth(text,font){
  return Array.from(text).reduce((sum,c)=>sum+(/[\x00-\x7F]/.test(c)?font*.6:font),0);
}

function wrapLabel(text,font,maxWidth){
  const lines=[];
  let line='';
  for(const char of text){
    if(line && textWidth(line+char,font)>maxWidth){lines.push(line);line='';}
    line+=char;
  }
  if(line)lines.push(line);
  return lines;
}

function draw(){
  const map=$('map');map.replaceChildren();
  const scale=2000/current.width, height=200+current.height*scale;
  const pos=(p)=>[100+p.x*scale,100+p.y*scale];
  map.setAttribute('viewBox',`0 0 2200 ${height}`);map.setAttribute('aria-label',current.title+'・'+current.version);
  // Typography is sized in screen pixels, independently of the map's zoom.
  const unit=2200/map.getBoundingClientRect().width;
  const maxLabelWidth=Math.min(240*unit,2200-24*unit);
  if(current.terrainViewport){
    const v=current.terrainViewport;
    const crop=el('svg',{x:100,y:100,width:2000,height:height-200,viewBox:`${v.x} ${v.y} ${current.width} ${current.height}`,overflow:'hidden'});
    crop.append(el('image',{href:current.terrain,width:v.sourceWidth,height:v.sourceHeight}));map.append(crop);
  }else if(current.terrain){
    map.append(el('image',{href:current.terrain,x:100,y:100,width:2000,height:height-200,preserveAspectRatio:'none'}));
  }else{
    map.append(el('rect',{x:100,y:100,width:2000,height:height-200,rx:30,fill:'#192e43'}));
  }
  for(const [from,to] of current.connections||[]){
    const a=current.locations.find(p=>p.id===from),b=current.locations.find(p=>p.id===to);
    if(!a||!b)continue;
    const bends=(current.connectionBends?.[`${from}/${to}`]||[]).map(([x,y])=>pos({x,y}));
    const points=[pos(a),...bends,pos(b)].map(p=>p.join(',')).join(' ');
    map.append(el('polyline',{points,fill:'none','data-connection':`${from}/${to}`,stroke:'#8eafc9','stroke-width':3*unit,'stroke-dasharray':`${6*unit} ${5*unit}`}));
  }
  const boxes=[];
  // Use the source route footprint. These are regional bands, not navigation paths.
  for(const r of current.routes){
    const water=r.kind==='water'||(/hoenn/.test(current.terrain)&&[105,106,107,108,109,122,124,125,126,127,128,129,130,131,132,133,134].includes(Number(r.english.match(/\d+/)?.[0])))||(/johto/.test(current.terrain)&&[40,41].includes(Number(r.english.match(/\d+/)?.[0])));
    const c=water?'#53e2f7':'#efb64b',edge=water?'#075572':'#633d19';
    if(r.points){const points=r.points.map(([x,y])=>[100+x*scale,100+y*scale].join(',')).join(' ');map.append(el('polyline',{points,fill:'none',stroke:edge,'stroke-width':15}));map.append(el('polyline',{points,fill:'none',stroke:c,'stroke-width':8,...(water?{'stroke-dasharray':'14 12'}:{})}));}
    else if(r.polygon){map.append(el('polygon',{points:r.polygon.map(([x,y])=>[100+x*scale,100+y*scale].join(',')).join(' '),fill:c,'fill-opacity':.78,stroke:edge,'stroke-width':2}));}
  }
  const priority={gym:0,challenge:0,league:1,city:2,landmark:3,route:4};
  const locations=[...current.locations].sort((a,b)=>(priority[a.kind]??3)-(priority[b.kind]??3));
  const visible=locations.filter(p=>p.featured||$('landmarks').checked||['gym','challenge','city','league'].includes(p.kind));
  const anchorRadius=Math.max(18,5*unit);
  const anchorBoxes=visible.map(p=>{const [x,y]=pos(p);return{x:x-anchorRadius,y:y-anchorRadius,w:2*anchorRadius,h:2*anchorRadius};});
  for(const p of visible){
    const [x,y]=pos(p),major=p.featured||['gym','challenge','league','city'].includes(p.kind),fill=color(p),ink=p.type==='electric'?'#27303a':'#fff';
    const g=el('g',{class:'location',role:'button',tabindex:0,'aria-label':p.name+(p.leader?'，'+p.leader:''),'data-id':p.id,'data-source-x':p.x,'data-source-y':p.y});
    g.append(el('title',{},p.name+(p.leader?' · '+p.leader:'')));
    g.append(el('circle',{cx:x,cy:y,r:major?anchorRadius:Math.max(11,3*unit),fill,stroke:'#fff5df','stroke-width':3,class:'anchor'}));
    if(p.kind==='gym'||p.kind==='challenge')g.append(el('path',{d:`M${x-8} ${y-8}h16v12l-8 7-8-7Z`,fill:'none',stroke:ink,'stroke-width':2.5}));
    if(major||$('all-labels').checked){
      const font=(major?18:16)*unit,leaderFont=14*unit,padding=8*unit;
      const nameLines=wrapLabel(p.name,font,maxLabelWidth-2*padding);
      const leaderLines=p.leader?wrapLabel(p.leader,leaderFont,maxLabelWidth-2*padding):[];
      const w=Math.max(72*unit,...nameLines.map(line=>textWidth(line,font)+2*padding),...leaderLines.map(line=>textWidth(line,leaderFont)+2*padding));
      const h=2*padding+nameLines.length*font*1.25+leaderLines.length*leaderFont*1.3;
      let chosen;
      for(const dy of [-h-27,30,-h-85,88,-h-145,148]){
        for(const dx of [0,w*.6,-w*.6,w,-w]){
          const b={x:Math.min(2190-w,Math.max(10,x-w/2+dx)),y:Math.min(height-h-10,Math.max(10,y+dy)),w,h};
          if(!boxes.some(a=>overlap(a,b))&&!anchorBoxes.some(a=>overlap(a,b))){chosen=b;break;}
        }
        if(chosen)break;
      }
      // Dense POIs retain their exact marker and accessible name if no free label fits.
      if(chosen){
        boxes.push(chosen);const b=chosen;
        g.append(el('line',{x1:x,y1:y,x2:b.x+b.w/2,y2:b.y>y?b.y:b.y+b.h,stroke:'#fff1cf','stroke-width':2}));
        const label=el('g',{'data-label':p.id});label.append(el('rect',{x:b.x,y:b.y,width:b.w,height:b.h,rx:9,fill,stroke:'#fff5df','stroke-width':2}));
        let baseline=b.y+padding+font;
        for(const line of nameLines){label.append(el('text',{x:b.x+b.w/2,y:baseline,'font-size':font,'font-weight':'bold','text-anchor':'middle',fill:ink},line));baseline+=font*1.25;}
        if(leaderLines.length)baseline-=font;
        for(const line of leaderLines){baseline+=leaderFont;label.append(el('text',{x:b.x+b.w/2,y:baseline,'font-size':leaderFont,'text-anchor':'middle',fill:ink},line));baseline+=leaderFont*.3;}
        g.append(label);
      }
    }
    map.append(g);
  }
  for(const r of current.routes){
    const [x,y]=pos(r),number=r.english.match(/\d+/)?.[0]||r.name;
    const font=14*unit,w=textWidth(number,font)+12*unit,h=22*unit,b={x:x-w/2,y:y-h/2,w,h};
    if(boxes.some(a=>overlap(a,b))||anchorBoxes.some(a=>overlap(a,b)))continue;
    boxes.push(b);const g=el('g',{class:'location',tabindex:0,role:'button','data-id':r.id,'aria-label':r.name});
    g.append(el('rect',{x:b.x,y:b.y,width:w,height:h,rx:5,fill:'#ffce65',stroke:'#633d19','stroke-width':2}));g.append(el('text',{x,y:y+font*.35,'text-anchor':'middle','font-size':font,fill:'#3e2c16'},number));map.append(g);
  }
  if(current.layout!=='connections')map.append(el('text',{x:2200-12*unit,y:25*unit,'text-anchor':'end','font-size':14*unit,fill:'#f7efd7'},'↑ 北'));
  if(selected)showPlace(selected);
}

function chooseMap(id){
  current=atlas.maps[id];if(!current)return;
  $('title').textContent=current.title;$('version-note').textContent=current.version||'';
  $('map-note').textContent=current.note||'';$('scope').textContent=current.scope;
  $('projection').hidden=current.layout!=='connections';
  $('projection').textContent=current.layout==='connections'?'連接示意圖：線段表示入口或劇情關係，不代表方位、距離或逐層行走路線。':'';
  $('source').href=current.source;$('counts').textContent=current.layout==='connections'?`${current.locations.length} 個節點 · ${current.connections.length} 組連接`:`${current.locations.length} 個地點 · ${current.routes.length} 條道路`;
  $('search').value='';selected=null;fillPlaces();readableMap();showPlace(current.locations[0]?.id);
  $('viewport').scrollTo(0,0);
  const url=new URL(location.href);url.searchParams.set('version',version);url.searchParams.set('map',id);history.replaceState(null,'',url);
  document.title=current.title+'・'+current.version+'｜地圖集';
  $('guide-link').href=guideUrl();
}
function chooseVersion(id,mapId){
  version=id;$('version').value=id;$('region').replaceChildren();
  for(const key of atlas.versionMaps[id]){const option=document.createElement('option');option.value=key;option.textContent=atlas.maps[key].title;$('region').append(option);}
  const choice=atlas.versionMaps[id].includes(mapId)?mapId:atlas.versionMaps[id][0];$('region').value=choice;
  chooseMap(choice);
}
async function start(){
  atlas=window.ATLAS_DATA||await fetch('atlas-data.json?v=pokemmo-1').then(r=>{if(!r.ok)throw new Error('地圖資料載入失敗');return r.json();});
  for(const v of atlas.versions){if(!atlas.versionMaps[v.id])continue;const o=document.createElement('option');o.value=v.id;o.textContent=v.displayGeneration==null?v.title:`第 ${v.displayGeneration} 世代 · ${v.title.replace('寶可夢 ','')}`;$('version').append(o);}
  const id=params.get('version');chooseVersion(atlas.versionMaps[id]?id:'gold-silver',params.get('map'));
  $('version').addEventListener('change',e=>chooseVersion(e.target.value));$('region').addEventListener('change',e=>chooseMap(e.target.value));
  $('fit').addEventListener('click',fitMap);
  $('zoom').addEventListener('click',()=>{viewMode='zoom';$('canvas').style.width='2200px';draw();});
  window.addEventListener('resize',()=>{if(viewMode==='fit')fitMap();else if(viewMode==='readable')readableMap();});
  $('landmarks').addEventListener('change',draw);$('all-labels').addEventListener('change',draw);
  $('search').addEventListener('input',fillPlaces);$('place-select').addEventListener('change',e=>showPlace(e.target.value));
  $('map').addEventListener('click',e=>{const t=e.target.closest('[data-id]');if(t)showPlace(t.dataset.id);});
  $('map').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){const t=e.target.closest('[data-id]');if(t){e.preventDefault();showPlace(t.dataset.id);}}});
}
start().catch(error=>{$('version-note').textContent=error.message;console.error(error);});
