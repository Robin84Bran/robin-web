const ROOT='/resonance/btc_probability_atlas/';
const cache=new Map();
async function readJSON(file){const response=await fetch(ROOT+file);if(!response.ok)throw Error('Evidence unavailable');return response.json()}
async function loadAsset(asset){if(!['BTC','ETH','SOL','XRP','BNB','TRX'].includes(asset))throw Error('Unknown asset');if(!cache.has(asset))cache.set(asset,await readJSON(asset+'.json'));return cache.get(asset)}
async function start(){const DATA=await readJSON('metadata.json');DATA.bundle.forecasts=await loadAsset('BTC');

const $=id=>document.getElementById(id), fmt=v=>v==null?'n/a':Number(v).toLocaleString('en-US',{maximumFractionDigits:v<10?4:0}),pct=v=>(v*100).toFixed(1)+'%';let current;
function option(select,values,label=x=>x){select.replaceChildren();values.forEach(v=>{const o=document.createElement('option');o.value=v;o.textContent=label(v);select.append(o)})}
function base(){return DATA.bundle.forecasts.filter(r=>r.asset===$('asset').value&&r.probability_measure===$('measure').value)}
function refreshGroup(){option($('group'),[...new Set(base().map(r=>r.group))]);refreshTarget()}
function refreshTarget(){const r=base().filter(r=>r.group===$('group').value);option($('target'),r.map(r=>r.target),t=>t.slice(0,19).replace('T',' ')+' · '+Math.round((Date.parse(t)-Date.parse(DATA.bundle.as_of))/864e5)+'d');if(r.length)$('target').value=r.reduce((a,b)=>Math.abs((Date.parse(a.target)-Date.parse(DATA.bundle.as_of))/864e5-90)<Math.abs((Date.parse(b.target)-Date.parse(DATA.bundle.as_of))/864e5-90)?a:b).target;draw()}
function normalCdf(x){const t=1/(1+.2316419*Math.abs(x)),a=.3989422804014327*Math.exp(-x*x/2)*t*(.319381530+t*(-.356563782+t*(1.781477937+t*(-1.821255978+t*1.330274429))));return x>=0?1-a:a}
function below(d,k){if(k<=0)return 0;if(d.samples){let l=0,h=d.samples.length;while(l<h){let m=(l+h)>>1;if(d.samples[m]<=k)l=m+1;else h=m}return l/d.samples.length}if(d.parameters){const {theta,rho,eta}=d.parameters,z=Math.log(k/d.forward),phi=eta/Math.sqrt(theta*(1+theta)),u=phi*z+rho,rad=Math.sqrt(u*u+1-rho*rho),w=theta/2*(1+rho*phi*z+rad),wk=theta*phi/2*(rho+u/rad),d2=-z/Math.sqrt(w)-Math.sqrt(w)/2;return Math.max(0,Math.min(1,normalCdf(-d2)+Math.exp(-d2*d2/2)/Math.sqrt(2*Math.PI)*wk/(2*Math.sqrt(w))))}const x=d.x,y=d.cdf;let i=x.findIndex(v=>v>=k);if(i<0)return y[y.length-1];if(i===0)return y[0];return y[i-1]+(y[i]-y[i-1])*(k-x[i-1])/(x[i]-x[i-1])}
function threshold(){if(!current?.distribution||$('threshold').value.trim()===''||!Number.isFinite(Number($('threshold').value))){$('below').textContent=$('above').textContent='n/a';return}const p=below(current.distribution,Number($('threshold').value));$('below').textContent=pct(p);$('above').textContent=pct(1-p)}
function node(name,attrs,text){let e=document.createElementNS('http://www.w3.org/2000/svg',name);for(const[k,v]of Object.entries(attrs))e.setAttribute(k,v);if(text!==undefined)e.textContent=text;return e}
function draw(){current=base().find(r=>r.group===$('group').value&&r.target===$('target').value);const r=current, d=r?.distribution;$('chart').replaceChildren();$('empty').classList.toggle('hidden',!!d);$('chart').classList.toggle('hidden',!d);$('status').textContent=r?(r.decision_status+' · '+(r.reason||'Conditional research; superiority unproven / 条件性研究，尚未证明更优')):'No matching evidence / 没有匹配证据';$('reference').textContent=r?`${r.settlement_definition||'n/a'} · ${r.quote_currency||'n/a'} · ${r.target} · ${r.forward?'Forward / 远期 '+fmt(r.forward):'Last close / 上次收盘 '+fmt(r.spot)} · Grade / 等级 ${r.quality_grade||'n/a'}`:'';$('audit').textContent=r?JSON.stringify({...r,distribution:d?{quantiles:d.quantiles,diagnostics:d.diagnostics}:null,source_hashes:r.source_hashes},null,2):'n/a';if(!d){$('currency').textContent='';$('empty').textContent=r?.reason||'Data unavailable / 数据不可用';['median','interval80','interval95','interval50'].forEach(id=>$(id).textContent='n/a');threshold();return}const q=d.quantiles;$('median').textContent=fmt(q['0.5']);$('currency').textContent=r.quote_currency;$('interval80').textContent=fmt(q['0.1'])+' – '+fmt(q['0.9']);$('interval95').textContent=fmt(q['0.025'])+' – '+fmt(q['0.975']);$('interval50').textContent=fmt(q['0.25'])+' – '+fmt(q['0.75']);$('threshold').value=Number(r.spot||r.forward||q['0.5']).toFixed(2);$('threshold').step=q['0.5']<10?.01:100;
 const xmin=Math.max(0,q['0.025']*.75),xmax=q['0.975']*1.2,pts=d.x.map((x,i)=>[x,d.pdf[i]]).filter(p=>p[0]>=xmin&&p[0]<=xmax),ymax=Math.max(...pts.map(p=>p[1]))*1.12;const sx=x=>65+(x-xmin)/(xmax-xmin)*960,sy=y=>290-y/ymax*250;
 for(let i=0;i<=5;i++){let x=xmin+(xmax-xmin)*i/5;$('chart').append(node('line',{x1:sx(x),x2:sx(x),y1:35,y2:290,stroke:'#e9eeeb'}),node('text',{x:sx(x),y:318,'text-anchor':'middle',fill:'#647578','font-size':12},fmt(x)))}
 const inside=pts.filter(p=>p[0]>=q['0.1']&&p[0]<=q['0.9']);if(inside.length)$('chart').append(node('path',{d:`M${sx(inside[0][0])},290 `+inside.map(p=>`L${sx(p[0])},${sy(p[1])}`).join(' ')+` L${sx(inside.at(-1)[0])},290 Z`,fill:'#d7e9e1'}));
 $('chart').append(node('path',{d:pts.map((p,i)=>(i?'L':'M')+sx(p[0])+','+sy(p[1])).join(' '),fill:'none',stroke:'#276477','stroke-width':2.5}),node('line',{x1:sx(q['0.5']),x2:sx(q['0.5']),y1:35,y2:290,stroke:'#a76830','stroke-dasharray':'4 5'}));threshold()}
option($('asset'),['BTC','ETH','SOL','XRP','BNB','TRX']);$('asset').onchange=changeAsset;$('measure').onchange=refreshGroup;$('group').onchange=refreshTarget;$('target').onchange=draw;$('threshold').oninput=threshold;refreshGroup();
function table(id,rows){for(const row of rows){let tr=document.createElement('tr');row.forEach(t=>{let td=document.createElement('td');td.textContent=t;tr.append(td)});$(id).append(tr)}}
table('scores',DATA.scores.filter(r=>r.split==='OOS'&&r.horizon===90).map(r=>[r.asset,r.horizon,r.model,r.n,r.crps_normalized?.toFixed(4)||'n/a',r.coverage_80==null?'n/a':pct(r.coverage_80)]));$('marketinfo').textContent=`Observed draft events / 已观察事件草稿: ${DATA.markets.events}. Inspected binary books / 已检查二元盘口: ${DATA.markets.books}. No verified net arbitrage claim / 未声称已验证净套利。`;$('asof').textContent=`Frozen evidence / 冻结证据: ${DATA.bundle.as_of} · Run ${DATA.bundle.run_id} · Q ≠ P · No orders or live allocation changes / 不下单、不修改实盘配置`;

function snapshotStatus(){
 const age=(Date.now()-Date.parse(DATA.bundle.as_of))/864e5;
 $('snapshot').textContent=`Frozen public snapshot / 冻结公开快照: ${DATA.bundle.as_of} · ${age>2?'STALE for current-market use / 用于当前行情已过期':'Not a live feed / 不是实时行情'} · No automatic public refresh / 不自动公开更新`;
}
snapshotStatus();setInterval(snapshotStatus,60000);
let loadGeneration=0;
async function changeAsset(){
 const selected=$('asset').value, generation=++loadGeneration;
 current=null;['median','interval80','interval95','interval50','below','above'].forEach(id=>$(id).textContent='—');
 $('chart').replaceChildren();$('audit').textContent='';$('reference').textContent='';$('currency').textContent='';
 option($('group'),[]);option($('target'),[]);$('status').textContent='Loading / 加载中…';
 try {const rows=await loadAsset(selected);if(generation!==loadGeneration)return;DATA.bundle.forecasts=rows;refreshGroup()}
 catch(e){if(generation!==loadGeneration)return;DATA.bundle.forecasts=[];refreshGroup();$('status').textContent='Evidence unavailable; retry by selecting an asset. / 证据加载失败，可重新选择币种重试。'}
}

}
start().catch(()=>{document.getElementById('snapshot').textContent='Evidence unavailable. Reload to retry; no forecast can be shown. / 证据加载失败，请刷新重试，目前不能显示预测。'});
