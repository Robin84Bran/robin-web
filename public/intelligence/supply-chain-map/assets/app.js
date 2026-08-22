(function () {
  "use strict";
  const data = window.MAP_DATA;
  const policyReviewData = window.PHASE2E_POLICY_DATA;
  const svgNS = "http://www.w3.org/2000/svg";
  const state = {
    scope:"phase2a", view:"dependency", classFilter:"all", statusFilter:"all",
    search:"", focusNode:null, selectedEdge:null,
    explorerSearch:"", explorerProvenance:"all", explorerSector:"all",
    explorerClass:"all", explorerEvidence:"all", explorerStatus:"all",
    explorerLinkedOnly:false, pairNasdaq:"NVDA", pairHkex:"9866",
    shock:"gpu-access", shockDepth:"second", policyReview:"advanced-compute",
    bridgeLane:"all", bridgeView:"dependency", bridgeEdge:"B01"
  };
  const nodeById = new Map(data.pilot.map(d => [d.id,d]));
  const externalNodeById = new Map(data.externalNodes.map(d => [d.id,d]));
  const bridgeNodeById = new Map([...data.pilot,...data.externalNodes].map(d => [d.id,d]));
  const pilotByUniverseKey = new Map(data.pilot.map(d => [`${d.side}:${d.symbol}`,d]));
  const sourceById = new Map([...data.sources,...policyReviewData.sources].map(d => [d.id,d]));
  const policyById = new Map(data.policies.map(d => [d.id,d]));
  const colors = {
    "Compute/IP":"#55d6a6","Cloud/software":"#7cb6ff","Co-development":"#b7a0ff",
    "Manufacturing":"#ffbf66","Component":"#ff9a7a","EDA/tooling":"#f07068"
  };
  const riskColors = {high:"#ff796b",medium:"#ffbf66",low:"#55d6a6"};

  const el = id => document.getElementById(id);
  const createSvg = (tag, attrs={}) => {
    const node = document.createElementNS(svgNS, tag);
    Object.entries(attrs).forEach(([k,v]) => node.setAttribute(k,String(v)));
    return node;
  };

  function init() {
    policyReviewData.reviews.forEach(review => {
      const button=document.createElement("button");
      button.className="policy-lane-tab";
      button.type="button";
      button.id=`policy-tab-${review.id}`;
      button.dataset.reviewId=review.id;
      button.setAttribute("role","tab");
      button.setAttribute("aria-controls","policyReviewPanel");
      button.setAttribute("aria-selected","false");
      button.tabIndex=-1;
      button.innerHTML=`<span>${String(review.sequence).padStart(2,"0")}</span><strong>${escapeHtml(review.label_zh)}</strong><small>${escapeHtml(review.label_en)}</small><em>${review.review_disposition==="RETAIN_BASELINE"?"retained":"clarified"}</em>`;
      button.addEventListener("click",()=>{
        state.policyReview=review.id;
        renderPolicyWatch();
      });
      button.addEventListener("keydown",event=>{
        if(!["ArrowLeft","ArrowRight"].includes(event.key)) return;
        event.preventDefault();
        const reviews=policyReviewData.reviews;
        const index=reviews.findIndex(item=>item.id===state.policyReview);
        const step=event.key==="ArrowRight"?1:-1;
        const next=reviews[(index+step+reviews.length)%reviews.length];
        state.policyReview=next.id;
        renderPolicyWatch();
        document.getElementById(`policy-tab-${next.id}`)?.focus();
      });
      el("policyLaneTabs").append(button);
    });

    const relationshipClasses = [...new Set(data.relationships.map(d => d.class))].sort();
    relationshipClasses.forEach(value => {
      const option = document.createElement("option");
      option.value = value; option.textContent = value;
      el("classFilter").append(option);
      el("explorerClassFilter").append(option.cloneNode(true));
    });
    [...new Set([...data.pilot.map(d => d.sector),"Unclassified"])].sort().forEach(value => {
      const option = document.createElement("option");
      option.value = value; option.textContent = value;
      el("sectorFilter").append(option);
    });
    populatePairOptions("nasdaq");
    populatePairOptions("hkex");
    el("pairNasdaqInput").value=companyLabel(findUniverseCompany("nasdaq",state.pairNasdaq));
    el("pairHkexInput").value=companyLabel(findUniverseCompany("hkex",state.pairHkex));
    data.shockScenarios.forEach(scenario => {
      const option=document.createElement("option");
      option.value=scenario.id;
      option.textContent=scenario.title;
      el("shockSelector").append(option);
    });
    el("shockSelector").value=state.shock;
    [...new Set(data.bridgeRelationships.map(d=>d.lane))].forEach(value=>{
      const option=document.createElement("option");
      option.value=value;
      option.textContent=value;
      el("bridgeLaneFilter").append(option);
    });

    document.querySelectorAll(".view-button").forEach(button => button.addEventListener("click", () => {
      state.view = button.dataset.view;
      document.querySelectorAll(".view-button").forEach(b => {
        const active = b === button;
        b.classList.toggle("active",active);
        b.setAttribute("aria-pressed",String(active));
      });
      state.selectedEdge = null;
      updateViewCopy();
      renderAll();
    }));
    document.querySelectorAll(".scope-button").forEach(button => button.addEventListener("click", () => {
      state.scope = button.dataset.scope;
      document.querySelectorAll(".scope-button").forEach(b => {
        const active = b === button;
        b.classList.toggle("active",active);
        b.setAttribute("aria-pressed",String(active));
      });
      state.focusNode=null; state.selectedEdge=null;
      renderAll(); showEmptyDetail();
    }));
    el("classFilter").addEventListener("change", e => { state.classFilter=e.target.value; renderAll(); });
    el("statusFilter").addEventListener("change", e => { state.statusFilter=e.target.value; renderAll(); });
    el("searchInput").addEventListener("input", e => { state.search=e.target.value.trim().toLowerCase(); renderGraph(); });
    el("resetButton").addEventListener("click", () => {
      Object.assign(state,{classFilter:"all",statusFilter:"all",search:"",focusNode:null,selectedEdge:null});
      el("classFilter").value="all"; el("statusFilter").value="all"; el("searchInput").value="";
      renderAll(); showEmptyDetail();
    });

    el("universeSearch").addEventListener("input",e=>{state.explorerSearch=e.target.value.trim().toLowerCase();renderExplorer();});
    el("provenanceFilter").addEventListener("change",e=>{state.explorerProvenance=e.target.value;renderExplorer();});
    el("sectorFilter").addEventListener("change",e=>{state.explorerSector=e.target.value;renderExplorer();});
    el("explorerClassFilter").addEventListener("change",e=>{state.explorerClass=e.target.value;renderExplorer();});
    el("evidenceFilter").addEventListener("change",e=>{state.explorerEvidence=e.target.value;renderExplorer();});
    el("explorerStatusFilter").addEventListener("change",e=>{state.explorerStatus=e.target.value;renderExplorer();});
    el("linkedOnly").addEventListener("change",e=>{state.explorerLinkedOnly=e.target.checked;renderExplorer();});
    el("pairNasdaqInput").addEventListener("input",e=>{state.pairNasdaq=parseCompanyInput("nasdaq",e.target.value);renderPairResult();renderUniverse("nasdaq");});
    el("pairHkexInput").addEventListener("input",e=>{state.pairHkex=parseCompanyInput("hkex",e.target.value);renderPairResult();renderUniverse("hkex");});
    el("resetExplorer").addEventListener("click",resetExplorer);
    el("shockSelector").addEventListener("change",e=>{state.shock=e.target.value;renderShockSimulator();});
    el("openSelectedShock").addEventListener("click",()=>{
      const review=selectedPolicyReview();
      state.shock=review.scenario_id;
      el("shockSelector").value=state.shock;
      renderShockSimulator();
      el("policySimulator").scrollIntoView({behavior:"smooth",block:"start"});
    });
    document.querySelectorAll(".shock-depth-button").forEach(button=>button.addEventListener("click",()=>{
      state.shockDepth=button.dataset.depth;
      document.querySelectorAll(".shock-depth-button").forEach(candidate=>{
        const active=candidate===button;
        candidate.classList.toggle("active",active);
        candidate.setAttribute("aria-pressed",String(active));
      });
      renderShockSimulator();
    }));
    el("bridgeLaneFilter").addEventListener("change",event=>{
      state.bridgeLane=event.target.value;
      const visible=bridgeFilteredRelationships();
      if(!visible.some(edge=>edge.id===state.bridgeEdge)) state.bridgeEdge=visible[0]?.id||null;
      renderExternalBridge();
    });
    document.querySelectorAll(".bridge-view-button").forEach(button=>button.addEventListener("click",()=>{
      state.bridgeView=button.dataset.bridgeView;
      document.querySelectorAll(".bridge-view-button").forEach(candidate=>{
        const active=candidate===button;
        candidate.classList.toggle("active",active);
        candidate.setAttribute("aria-pressed",String(active));
      });
      renderExternalBridge();
    }));

    updateViewCopy();
    renderAll();
  }

  function scopedNodes() {
    return state.scope === "core" ? data.pilot.filter(d => !d.phase || d.phase === "core") : data.pilot;
  }

  function scopeNodeIds() {
    return new Set(scopedNodes().map(d => d.id));
  }

  function filteredRelationships() {
    const allowed = scopeNodeIds();
    return data.relationships.filter(r => {
      if (!allowed.has(r.from) || !allowed.has(r.to)) return false;
      if (state.scope === "core" && r.phase === "2A") return false;
      if (state.classFilter !== "all" && r.class !== state.classFilter) return false;
      if (state.statusFilter === "current" && r.status === "historical") return false;
      if (state.statusFilter === "historical" && r.status !== "historical") return false;
      return true;
    });
  }

  function updateViewCopy() {
    const copy = {
      dependency:["Capability flow","Supplier or service provider → recipient"],
      cash:["Commercial consideration","Recipient → provider · direction derived, amount usually unknown"],
      policy:["Fracture surface","Regulatory pressure on verified fibers + policy-only chokepoints"]
    }[state.view];
    el("viewKicker").textContent=copy[0]; el("viewTitle").textContent=copy[1];
  }

  function renderAll() {
    renderPolicyWatch(); renderMetrics(); renderGraph(); renderShockSimulator(); renderExternalBridge(); renderMatrix(); renderLedger(); renderLegend(); renderExplorer();
  }

  function renderMetrics() {
    const nodes=scopedNodes(), rels=filteredRelationships();
    const us=nodes.filter(d=>d.side==="nasdaq"), hk=nodes.filter(d=>d.side==="hkex");
    el("metricEdges").textContent=rels.length;
    el("metricCurrent").textContent=rels.filter(d=>d.status!=="historical").length;
    el("metricHighRisk").textContent=rels.filter(d=>d.risk==="high").length;
    el("metricSources").textContent=new Set(rels.flatMap(d=>d.source_ids)).size;
    el("headerCompanies").textContent="200 listed companies";
    el("headerScope").textContent=`100 Nasdaq + 100 HKEX · ${data.relationships.length} verified public-company fibers`;
    el("matrixKicker").textContent=state.scope==="core"?"The honest 20 × 20":`The selective ${us.length} × ${hk.length}`;
    el("matrix").setAttribute("aria-label",`Scrollable ${us.length} by ${hk.length} relationship matrix`);
  }

  function renderLegend() {
    const host=el("legend"); host.innerHTML="";
    const items = state.view === "policy"
      ? [["High",riskColors.high],["Medium",riskColors.medium],["Low",riskColors.low],["Policy-only","#d6d0c1"]]
      : Object.entries(colors);
    items.forEach(([label,color]) => {
      const item=document.createElement("span"); item.className="legend-item";
      item.innerHTML=`<span class="legend-dot" style="background:${color}"></span>${label}`;
      host.append(item);
    });
  }

  function positions() {
    const left=scopedNodes().filter(d=>d.side==="nasdaq");
    const right=scopedNodes().filter(d=>d.side==="hkex");
    const map=new Map();
    const y0=82, y1=900;
    const leftStep=left.length>1?(y1-y0)/(left.length-1):0;
    const rightStep=right.length>1?(y1-y0)/(right.length-1):0;
    left.forEach((d,i)=>map.set(d.id,{x:92,y:y0+i*leftStep,side:"left"}));
    right.forEach((d,i)=>map.set(d.id,{x:898,y:y0+i*rightStep,side:"right"}));
    return map;
  }

  function renderGraph() {
    const svg=el("networkGraph"); svg.innerHTML="";
    const defs=createSvg("defs");
    [["dep","#55d6a6"],["cash","#7cb6ff"],["policy","#ffbf66"]].forEach(([id,color])=>{
      const marker=createSvg("marker",{id:`arrow-${id}`,markerWidth:8,markerHeight:8,refX:7,refY:3.5,orient:"auto",markerUnits:"strokeWidth"});
      marker.append(createSvg("path",{d:"M0,0 L7,3.5 L0,7 z",fill:color}));
      defs.append(marker);
    });
    svg.append(defs);
    const pos=positions();
    const nodes=scopedNodes();
    const left=nodes.filter(d=>d.side==="nasdaq"),right=nodes.filter(d=>d.side==="hkex");
    svg.append(labelGroup(92,30,state.scope==="core"?"NASDAQ-100 CORE":"NASDAQ-100 PHASE 2A",left.length));
    svg.append(labelGroup(898,30,state.scope==="core"?"HKEX CORE-100 CORE":"HKEX CORE-100 PHASE 2A",right.length));

    const rels=filteredRelationships();
    const allowed=scopeNodeIds();
    const edges = state.view==="policy"
      ? [...rels.map(r=>({...r,policyOnly:false})),...data.policyLinks.filter(p=>allowed.has(p.from)&&allowed.has(p.to)).map(p=>({...p,policyOnly:true,class:"Policy",status:"policy-only",risk:policySeverity(p.policy_ids),evidence:"A"}))]
      : rels;

    const edgeLayer=createSvg("g",{class:"edge-layer"});
    edges.forEach((r,index)=>{
      const a=pos.get(r.from), b=pos.get(r.to);
      if (!a || !b) return;
      const reverse=state.view==="cash";
      const start=reverse?b:a, end=reverse?a:b;
      const path=curve(start,end,index);
      const color=state.view==="policy" ? (r.policyOnly?"#d6d0c1":riskColors[r.risk]) : colors[r.class]||"#55d6a6";
      const group=createSvg("g",{class:`edge-group${state.selectedEdge===r.id?" selected":""}`,tabindex:"0","data-id":r.id});
      const visible=createSvg("path",{d:path,class:"edge-visible",stroke:color,"marker-end":`url(#arrow-${state.view==="dependency"?"dep":state.view==="cash"?"cash":"policy"})`});
      if (state.view==="policy") visible.setAttribute("stroke-dasharray",r.policyOnly?"3 5":"7 4");
      if (r.status==="historical" && state.view!=="policy") visible.setAttribute("stroke-dasharray","3 4");
      const hit=createSvg("path",{d:path,class:"edge-hit"});
      const activeNode=state.focusNode;
      const searchMatch=searchMatchEdge(r);
      if ((activeNode && r.from!==activeNode && r.to!==activeNode) || (state.search && !searchMatch)) group.classList.add("dim");
      group.append(visible,hit);
      group.addEventListener("click",()=>selectRelationship(r));
      group.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();selectRelationship(r);}});
      edgeLayer.append(group);
    });
    svg.append(edgeLayer);

    const nodeLayer=createSvg("g",{class:"node-layer"});
    nodes.forEach(d=>{
      const p=pos.get(d.id); const g=createSvg("g",{class:"node",tabindex:"0","data-id":d.id,transform:`translate(${p.x},${p.y})`});
      const fill=d.side==="nasdaq"?"#132821":"#1a242c";
      g.append(createSvg("rect",{x:0,y:-14,width:210,height:29,rx:7,fill,stroke:d.side==="nasdaq"?"#286c57":"#355a72"}));
      const name=createSvg("text",{x:12,y:2,class:"node-name"}); name.textContent=d.name;
      const sym=createSvg("text",{x:198,y:2,class:"node-symbol","text-anchor":"end"}); sym.textContent=d.symbol;
      g.append(name,sym);
      if (d.phase==="2A") g.classList.add("phase2a");
      const incident=edges.some(r=>r.from===d.id||r.to===d.id);
      const searchMatch=!state.search || `${d.name} ${d.symbol}`.toLowerCase().includes(state.search);
      if ((state.focusNode && state.focusNode!==d.id && !edges.some(r=>(r.from===state.focusNode||r.to===state.focusNode)&&(r.from===d.id||r.to===d.id))) || !searchMatch) g.classList.add("dim");
      if (state.focusNode===d.id) g.classList.add("highlight");
      if (!incident && state.classFilter!=="all") g.classList.add("dim");
      g.addEventListener("click",()=>{state.focusNode=state.focusNode===d.id?null:d.id; state.selectedEdge=null; showNodeDetail(d); renderGraph();});
      g.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();g.dispatchEvent(new Event("click"));}});
      nodeLayer.append(g);
    });
    svg.append(nodeLayer);
  }

  function labelGroup(x,y,label,count) {
    const g=createSvg("g");
    const t=createSvg("text",{x,y,class:"side-label"}); t.textContent=label;
    const c=createSvg("text",{x:x+210,y,class:"side-count","text-anchor":"end"}); c.textContent=count;
    g.append(t,c); return g;
  }

  function curve(a,b,index) {
    const sx=a.x+(a.side==="left"?210:0), ex=b.x+(b.side==="left"?210:0);
    const bend=75 + (index%5)*8;
    const c1=sx+(ex>sx?bend:-bend), c2=ex+(ex>sx?-bend:bend);
    return `M ${sx} ${a.y} C ${c1} ${a.y}, ${c2} ${b.y}, ${ex} ${b.y}`;
  }

  function policySeverity(ids=[]) {
    const ranks={low:1,medium:2,high:3};
    return ids.map(id=>policyById.get(id)?.severity||"low").sort((a,b)=>ranks[b]-ranks[a])[0]||"low";
  }

  function searchMatchEdge(r) {
    const a=nodeById.get(r.from),b=nodeById.get(r.to);
    return `${a?.name||""} ${a?.symbol||""} ${b?.name||""} ${b?.symbol||""} ${r.label||""}`.toLowerCase().includes(state.search);
  }

  function selectRelationship(r) {
    state.selectedEdge=r.id; state.focusNode=null;
    if (r.policyOnly) showPolicyLinkDetail(r); else showRelationshipDetail(r);
    renderGraph();
  }

  function showEmptyDetail(){el("detailPanel").innerHTML=`<div class="detail-empty"><p class="kicker">Evidence detail</p><h2>Select a fiber</h2><p>Every drawn edge opens its source, date, uncertainty and policy exposure here.</p><p class="fine-print">Blank space is allowed. It means the relationship was not established by this pilot—not that it cannot exist.</p></div>`;}

  function showRelationshipDetail(r) {
    const from=nodeById.get(r.from),to=nodeById.get(r.to);
    const policies=r.policy_ids.map(id=>policyById.get(id)).filter(Boolean);
    const sources=r.source_ids.map(id=>sourceById.get(id)).filter(Boolean);
    el("detailPanel").innerHTML=`
      <p class="kicker">${r.class}</p><h2>${escapeHtml(r.label)}</h2>
      <div class="tag-row"><span class="tag">${r.status}</span><span class="tag">Evidence ${r.evidence}</span><span class="tag">${r.phase==="2A"?"Phase 2A":"Core"}</span>${r.lane?`<span class="tag">${escapeHtml(r.lane)}</span>`:""}<span class="tag ${r.risk}">${r.risk} fracture</span></div>
      <div class="route"><div><strong>${escapeHtml(from.name)}</strong><span>${escapeHtml(from.symbol)}</span></div><div class="arrow">to</div><div><strong>${escapeHtml(to.name)}</strong><span>${escapeHtml(to.symbol)}</span></div></div>
      <p>${escapeHtml(r.detail)}</p>
      <h3>Reverse consideration</h3><p>${cashExplanation(r,from,to)}</p>
      <h3>What the evidence does not prove</h3><p>${escapeHtml(r.limits)}</p>
      <h3>Policy fracture</h3>${policies.length?`<ul>${policies.map(p=>`<li><strong>${escapeHtml(p.name)}</strong> — ${escapeHtml(p.mechanism)}</li>`).join("")}</ul>`:"<p>No targeted policy linked in this pilot.</p>"}
      <h3>Sources</h3>${sources.map(sourceLink).join("")}`;
  }

  function showPolicyLinkDetail(r) {
    const from=nodeById.get(r.from),to=nodeById.get(r.to);
    const policies=r.policy_ids.map(id=>policyById.get(id)).filter(Boolean);
    el("detailPanel").innerHTML=`
      <p class="kicker">Policy-only chokepoint</p><h2>${escapeHtml(r.label)}</h2>
      <div class="tag-row"><span class="tag high">Not a trade assertion</span></div>
      <div class="route"><div><strong>${escapeHtml(from.name)}</strong><span>${escapeHtml(from.symbol)}</span></div><div class="arrow">to</div><div><strong>${escapeHtml(to.name)}</strong><span>${escapeHtml(to.symbol)}</span></div></div>
      <p>${escapeHtml(r.note)}</p>
      <h3>Policy mechanisms</h3><ul>${policies.map(p=>`<li><strong>${escapeHtml(p.name)}</strong> — ${escapeHtml(p.summary)}</li>`).join("")}</ul>
      <h3>Sources</h3>${policies.flatMap(p=>p.source_ids).map(id=>sourceById.get(id)).filter(Boolean).map(sourceLink).join("")}`;
  }

  function showNodeDetail(d) {
    const allowed=scopeNodeIds();
    const incident=data.relationships.filter(r=>allowed.has(r.from)&&allowed.has(r.to)&&(r.from===d.id||r.to===d.id));
    const outs=incident.filter(r=>r.from===d.id).length,ins=incident.length-outs;
    el("detailPanel").innerHTML=`
      <p class="kicker">${escapeHtml(d.sector)}</p><h2>${escapeHtml(d.name)} <small>${escapeHtml(d.symbol)}</small></h2>
      <p>${escapeHtml(d.summary)}</p>
      <div class="tag-row"><span class="tag">${d.side==="nasdaq"?"Nasdaq-100":"HKEX Core-100"}</span><span class="tag">${d.phase==="2A"?"Phase 2A expansion":"Core 20×20"}</span><span class="tag">${incident.length} sourced fibers</span></div>
      <h3>Role</h3><p>${escapeHtml(d.role)}</p>
      <h3>Pilot connectivity</h3><p>${outs} capability flows out · ${ins} capability flows in.</p>
      <h3>Relationships</h3>${incident.length?incident.map(r=>`<button class="source-link relation-jump" data-id="${r.id}">${escapeHtml(r.label)}<small>${escapeHtml(nodeById.get(r.from).name)} → ${escapeHtml(nodeById.get(r.to).name)}</small></button>`).join(""):"<p>No cross-side relationship was established by this pilot.</p>"}`;
    document.querySelectorAll(".relation-jump").forEach(b=>b.addEventListener("click",()=>selectRelationship(data.relationships.find(r=>r.id===b.dataset.id))));
  }

  function cashExplanation(r,from,to) {
    if (r.cash_model==="DERIVED_DIRECTION") return `${escapeHtml(to.name)} → ${escapeHtml(from.name)}. Direction is derived from the supplier/customer structure; amount: ${escapeHtml(r.amount)}.`;
    if (r.cash_model==="SOURCE_DISCLOSED_HISTORICAL") return `${escapeHtml(to.name)} → ${escapeHtml(from.name)}. The cited historical agreement disclosed ${r.amount==="DISCLOSED_HISTORICAL_1_2B_USD"?"US$1.2 billion":"more than US$100 million"}; this is not a current-flow estimate.`;
    return `Commercial terms and net direction are undisclosed. The map does not invent a payment arrow for this co-development/availability relationship.`;
  }

  function sourceLink(s) {
    return `<a class="source-link" href="${escapeAttr(s.url)}" target="_blank" rel="noreferrer">${escapeHtml(s.title)}<small>${escapeHtml(s.publisher)} · ${escapeHtml(s.date)}</small></a>`;
  }

  function selectedPolicyReview() {
    return policyReviewData.reviews.find(item=>item.id===state.policyReview)||policyReviewData.reviews[0];
  }

  function reviewDispositionLabel(review) {
    return review.review_disposition==="RETAIN_BASELINE"?"Baseline retained":"Scope clarified";
  }

  function renderPolicyWatch() {
    const review=selectedPolicyReview();
    const scenario=data.shockScenarios.find(item=>item.id===review.scenario_id);
    const impact=shockImpact(scenario);
    const tab=document.getElementById(`policy-tab-${review.id}`);

    document.querySelectorAll(".policy-lane-tab").forEach(button=>{
      const active=button.dataset.reviewId===review.id;
      button.classList.toggle("active",active);
      button.setAttribute("aria-selected",String(active));
      button.tabIndex=active?0:-1;
    });

    el("policyReviewPanel").setAttribute("aria-labelledby",tab?.id||"");
    el("policyReviewMeta").innerHTML=`<span>${escapeHtml(review.jurisdiction)}</span><span class="review-confirmed">${escapeHtml(review.evidence_status)}</span><span>${escapeHtml(reviewDispositionLabel(review))}</span>`;
    el("policyReviewTitle").textContent=`${review.label_zh} / ${review.label_en}`;
    el("policyReviewLede").textContent=review.why_it_matters;
    el("policyFrozenClaim").textContent=review.frozen_claim;
    el("policyOfficialRead").textContent=review.official_read;
    el("policyImmediate").textContent=impact.immediateIds.size;
    el("policyDirectEdges").textContent=impact.direct.length;
    el("policySecondOrder").textContent=impact.secondIds.size;
    el("policyUnknownList").innerHTML=review.unknowns.map(item=>`<li>${escapeHtml(item)}</li>`).join("");
    el("policySourceLinks").innerHTML=review.source_ids.map(id=>sourceById.get(id)).filter(Boolean).map(source=>`
      <a href="${escapeAttr(source.url)}" target="_blank" rel="noreferrer">
        <span>${escapeHtml(source.publisher)}</span>
        <small>${escapeHtml(source.date)}</small>
      </a>`).join("");
    el("openSelectedShock").setAttribute("aria-label",`Open ${review.label_en} stress test`);
  }

  function selectedShock() {
    return data.shockScenarios.find(s=>s.id===state.shock)||data.shockScenarios[0];
  }

  function shockImpact(scenario) {
    const explicit=new Set(scenario.edge_ids||[]);
    const policies=new Set(scenario.policy_ids||[]);
    const direct=data.relationships.filter(r=>explicit.size
      ?explicit.has(r.id)
      :r.policy_ids.some(id=>policies.has(id))
    );
    const directIds=new Set(direct.map(r=>r.id));
    const immediateIds=new Set(direct.flatMap(r=>[r.from,r.to]));
    const second=data.relationships.filter(r=>{
      if(directIds.has(r.id)) return false;
      const fromImmediate=immediateIds.has(r.from);
      const toImmediate=immediateIds.has(r.to);
      return (fromImmediate||toImmediate)&&!(fromImmediate&&toImmediate);
    });
    const secondIds=new Set();
    second.forEach(r=>{
      if(!immediateIds.has(r.from)) secondIds.add(r.from);
      if(!immediateIds.has(r.to)) secondIds.add(r.to);
    });
    return {direct,immediateIds,second,secondIds};
  }

  function renderShockSimulator() {
    const scenario=selectedShock();
    const impact=shockImpact(scenario);
    const showSecond=state.shockDepth==="second";
    el("shockPosture").innerHTML=`
      <div><span>${escapeHtml(scenario.jurisdiction)} · Stress scenario</span><strong>${escapeHtml(scenario.posture)}</strong></div>
      <p>${escapeHtml(scenario.caveat)}</p>`;
    el("shockImmediateCompanies").textContent=impact.immediateIds.size;
    el("shockDirectEdges").textContent=impact.direct.length;
    el("shockSecondCompanies").textContent=showSecond?impact.secondIds.size:0;
    el("shockDelay").textContent=scenario.delay.range;
    el("shockDelayReason").innerHTML=`<span>${escapeHtml(scenario.delay.confidence)}</span>${escapeHtml(scenario.delay.reason)}`;
    el("shockGraphTitle").textContent=scenario.title;

    renderShockGraph(scenario,impact,showSecond);
    renderShockGainers(scenario);
    renderShockSubstitutes(scenario);
    renderShockEdges(impact,showSecond);
    renderShockSources(scenario);
  }

  function renderShockGainers(scenario) {
    const host=el("shockGainers");
    if(!scenario.gainers.length){
      host.innerHTML=`<p class="shock-gap">${escapeHtml(scenario.gainer_gap||"No company-level gainer established.")}</p>`;
      return;
    }
    host.innerHTML=scenario.gainers.map((gainer,index)=>`
      <article>
        <div><strong>${escapeHtml(gainer.name)}</strong><span>${escapeHtml(gainer.confidence)}</span></div>
        <p>${escapeHtml(gainer.reason)}</p>
        ${gainer.node_id?`<button type="button" data-gainer="${index}">Open company</button>`:""}
      </article>`).join("");
    host.querySelectorAll("[data-gainer]").forEach(button=>button.addEventListener("click",()=>{
      const gainer=scenario.gainers[Number(button.dataset.gainer)];
      const node=nodeById.get(gainer.node_id);
      if(!node) return;
      state.focusNode=node.id;
      state.selectedEdge=null;
      showNodeDetail(node);
      renderGraph();
      el("detailPanel").scrollIntoView({behavior:"smooth",block:"start"});
    }));
  }

  function renderShockSubstitutes(scenario) {
    const host=el("shockSubstituteList");
    host.innerHTML=scenario.substitutes.map(substitute=>`
      <article>
        <div class="substitute-top"><strong>${escapeHtml(substitute.name)}</strong><span>${escapeHtml(substitute.readiness)}</span></div>
        <small>${escapeHtml(substitute.kind)}</small>
        <p>${escapeHtml(substitute.coverage)}</p>
        <p class="substitute-limit">${escapeHtml(substitute.limits)}</p>
      </article>`).join("");
  }

  function renderShockEdges(impact,showSecond) {
    const rows=[
      ...impact.direct.map(r=>({relationship:r,depth:"Immediate"})),
      ...(showSecond?impact.second.map(r=>({relationship:r,depth:"Second order"})):[])
    ];
    el("shockLedgerTitle").textContent=showSecond?"Immediate + second order":"Immediate only";
    const host=el("shockEdgeLedger");
    host.innerHTML=rows.length?rows.map(({relationship:r,depth})=>{
      const from=nodeById.get(r.from),to=nodeById.get(r.to);
      return `<button type="button" data-shock-edge="${r.id}">
        <span class="shock-edge-depth ${depth==="Immediate"?"direct":"second"}">${depth}</span>
        <span><strong>${escapeHtml(from.symbol)} → ${escapeHtml(to.symbol)}</strong>${escapeHtml(r.label)}</span>
        <small>${escapeHtml(r.status)} · Evidence ${escapeHtml(r.evidence)}</small>
      </button>`;
    }).join(""):`<p class="shock-gap">No verified relationship is selected by this scenario.</p>`;
    host.querySelectorAll("[data-shock-edge]").forEach(button=>button.addEventListener("click",()=>{
      const relationship=data.relationships.find(r=>r.id===button.dataset.shockEdge);
      selectRelationship(relationship);
      el("detailPanel").scrollIntoView({behavior:"smooth",block:"start"});
    }));
  }

  function renderShockSources(scenario) {
    const ids=new Set([
      ...scenario.policy_source_ids,
      ...scenario.substitutes.flatMap(item=>item.source_ids),
      ...scenario.gainers.flatMap(item=>item.source_ids)
    ]);
    el("shockSources").innerHTML=[...ids].map(id=>sourceById.get(id)).filter(Boolean).map(sourceLink).join("");
  }

  function renderShockGraph(scenario,impact,showSecond) {
    const svg=el("shockGraph");
    svg.innerHTML="";
    const immediate=[...impact.immediateIds].map(id=>nodeById.get(id)).filter(Boolean).sort((a,b)=>a.name.localeCompare(b.name));
    const second=showSecond?[...impact.secondIds].map(id=>nodeById.get(id)).filter(Boolean).sort((a,b)=>a.name.localeCompare(b.name)):[];
    const rows=Math.max(Math.ceil(immediate.length/2),Math.ceil(second.length/2),5);
    const height=Math.max(440,126+rows*45);
    svg.setAttribute("viewBox",`0 0 1200 ${height}`);
    const description=createSvg("desc",{id:"shockGraphDesc"});
    description.textContent=`${scenario.title}: ${impact.immediateIds.size} immediately affected companies and ${showSecond?impact.secondIds.size:0} one-hop second-order companies in the verified evidence graph.`;
    svg.append(description);

    const defs=createSvg("defs");
    [["shock-direct","#ff796b"],["shock-second","#ffbf66"]].forEach(([id,color])=>{
      const marker=createSvg("marker",{id,markerWidth:8,markerHeight:8,refX:7,refY:3.5,orient:"auto",markerUnits:"strokeWidth"});
      marker.append(createSvg("path",{d:"M0,0 L7,3.5 L0,7 z",fill:color}));
      defs.append(marker);
    });
    svg.append(defs);

    const top=83;
    const position=new Map();
    immediate.forEach((node,index)=>position.set(node.id,{x:index%2?485:255,y:top+Math.floor(index/2)*45,depth:"direct"}));
    second.forEach((node,index)=>position.set(node.id,{x:index%2?1000:770,y:top+Math.floor(index/2)*45,depth:"second"}));

    const shockY=Math.max(110,Math.min(height-70,top+(Math.ceil(immediate.length/2)-1)*22.5));
    const shockGroup=createSvg("g",{class:"shock-root",transform:`translate(20,${shockY-28})`});
    shockGroup.append(createSvg("rect",{x:0,y:0,width:175,height:56,rx:9}));
    const shockSmall=createSvg("text",{x:12,y:20,class:"shock-root-label"}); shockSmall.textContent="POLICY SHOCK";
    const shockName=createSvg("text",{x:12,y:39,class:"shock-root-name"}); shockName.textContent=scenario.short;
    shockGroup.append(shockSmall,shockName);

    const directLayer=createSvg("g",{class:"shock-links"});
    immediate.forEach(node=>{
      const p=position.get(node.id);
      directLayer.append(createSvg("path",{
        d:`M 195 ${shockY} C 220 ${shockY}, 220 ${p.y}, ${p.x} ${p.y}`,
        class:"shock-link direct","marker-end":"url(#shock-direct)"
      }));
    });
    if(showSecond){
      impact.second.forEach(r=>{
        const immediateId=impact.immediateIds.has(r.from)?r.from:r.to;
        const secondId=immediateId===r.from?r.to:r.from;
        const a=position.get(immediateId),b=position.get(secondId);
        if(!a||!b) return;
        directLayer.append(createSvg("path",{
          d:`M ${a.x+190} ${a.y} C ${a.x+245} ${a.y}, ${b.x-50} ${b.y}, ${b.x} ${b.y}`,
          class:"shock-link second","marker-end":"url(#shock-second)"
        }));
      });
    }
    svg.append(directLayer,shockGroup);

    svg.append(shockColumnLabel(255,42,"IMMEDIATE",immediate.length,"direct"));
    if(showSecond) svg.append(shockColumnLabel(770,42,"SECOND ORDER",second.length,"second"));

    [...immediate,...second].forEach(node=>{
      const p=position.get(node.id);
      const group=createSvg("g",{class:`shock-node ${p.depth}`,transform:`translate(${p.x},${p.y-15})`,tabindex:"0"});
      group.append(createSvg("rect",{x:0,y:0,width:190,height:30,rx:7}));
      const symbol=createSvg("text",{x:9,y:19,class:"shock-node-symbol"}); symbol.textContent=node.symbol;
      const name=createSvg("text",{x:58,y:19,class:"shock-node-name"}); name.textContent=truncate(node.name,21);
      const title=createSvg("title"); title.textContent=`${node.name} (${node.symbol})`;
      group.append(symbol,name,title);
      const open=()=>{
        state.focusNode=node.id;
        state.selectedEdge=null;
        showNodeDetail(node);
        renderGraph();
        el("detailPanel").scrollIntoView({behavior:"smooth",block:"start"});
      };
      group.addEventListener("click",open);
      group.addEventListener("keydown",event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();open();}});
      svg.append(group);
    });
  }

  function shockColumnLabel(x,y,label,count,kind) {
    const group=createSvg("g",{class:`shock-column-label ${kind}`});
    const text=createSvg("text",{x,y}); text.textContent=label;
    const total=createSvg("text",{x:x+190,y,"text-anchor":"end"}); total.textContent=count;
    group.append(text,total);
    return group;
  }

  function truncate(value,max) {
    const text=String(value);
    return text.length>max?`${text.slice(0,max-1)}…`:text;
  }

  function bridgeFilteredRelationships() {
    return data.bridgeRelationships.filter(edge=>state.bridgeLane==="all"||edge.lane===state.bridgeLane);
  }

  function renderExternalBridge() {
    const edges=bridgeFilteredRelationships();
    const visibleExternalIds=new Set(edges.flatMap(edge=>[edge.from,edge.to]).filter(id=>externalNodeById.has(id)));
    el("bridgeNodeCount").textContent=visibleExternalIds.size;
    el("bridgeEdgeCount").textContent=edges.length;
    el("bridgePrivateCount").textContent=[...visibleExternalIds].filter(id=>externalNodeById.get(id)?.kind==="private-ai").length;

    const copy={
      dependency:["External dependency layer","Capability flow through the missing middle","Capability, component or service → recipient"],
      cash:["Reverse consideration layer","Who would normally pay whom","Recipient → provider only when commercial structure supports it"],
      policy:["Policy fracture layer","Which external bridges are easiest to cut","Risk color is separate from physical and cash direction"]
    }[state.bridgeView];
    el("bridgeKicker").textContent=copy[0];
    el("bridgeTitle").textContent=copy[1];
    el("bridgeViewCopy").textContent=copy[2];

    renderBridgeLegend();
    renderBridgeGraph(edges);
    renderBridgeLedger(edges);

    const selected=edges.find(edge=>edge.id===state.bridgeEdge);
    if(selected) showBridgeDetail(selected);
    else el("bridgeDetail").innerHTML=`<div class="detail-empty"><p class="kicker">External bridge</p><h2>No bridge in this lane</h2><p>The evidence ledger does not contain a matching external relationship.</p></div>`;
  }

  function renderBridgeLegend() {
    const host=el("bridgeLegend");
    const items=state.bridgeView==="policy"
      ?[["High",riskColors.high],["Medium",riskColors.medium],["Low",riskColors.low]]
      :state.bridgeView==="cash"
        ?[["Derived cash direction","#7cb6ff"],["Terms undisclosed","#d6d0c1"]]
        :Object.entries(colors);
    host.innerHTML=items.map(([label,color])=>`<span><i style="background:${color}"></i>${escapeHtml(label)}</span>`).join("");
  }

  function bridgePositions(edges) {
    const incident=new Set(edges.flatMap(edge=>[edge.from,edge.to]));
    const groups={
      nasdaq:[...incident].map(id=>bridgeNodeById.get(id)).filter(node=>node?.side==="nasdaq").sort((a,b)=>a.name.localeCompare(b.name)),
      industrial:[...incident].map(id=>bridgeNodeById.get(id)).filter(node=>node?.kind==="industrial").sort((a,b)=>a.name.localeCompare(b.name)),
      private:[...incident].map(id=>bridgeNodeById.get(id)).filter(node=>node?.kind==="private-ai").sort((a,b)=>a.name.localeCompare(b.name)),
      hkex:[...incident].map(id=>bridgeNodeById.get(id)).filter(node=>node?.side==="hkex").sort((a,b)=>a.name.localeCompare(b.name))
    };
    const columns=[
      {key:"nasdaq",x:20,label:"NASDAQ-100"},
      {key:"industrial",x:340,label:"EXTERNAL INDUSTRIAL"},
      {key:"private",x:660,label:"PRIVATE AI / ROBOTICS"},
      {key:"hkex",x:980,label:"HKEX CORE-100"}
    ];
    const rowHeight=43;
    const top=76;
    const maxRows=Math.max(4,...columns.map(column=>groups[column.key].length));
    const height=top+maxRows*rowHeight+48;
    const positions=new Map();
    columns.forEach(column=>{
      groups[column.key].forEach((node,index)=>positions.set(node.id,{x:column.x,y:top+index*rowHeight,width:200,column:column.key}));
    });
    return {groups,columns,positions,height};
  }

  function renderBridgeGraph(edges) {
    const svg=el("bridgeGraph");
    svg.innerHTML="";
    const layout=bridgePositions(edges);
    svg.setAttribute("viewBox",`0 0 1200 ${layout.height}`);
    const description=createSvg("desc",{id:"bridgeGraphDesc"});
    description.textContent=`${edges.length} sourced external bridge relationships across semiconductor manufacturing, model and cloud infrastructure, and physical AI.`;
    svg.append(description);

    const defs=createSvg("defs");
    [
      ["bridge-dependency","#55d6a6"],
      ["bridge-cash","#7cb6ff"],
      ["bridge-high","#ff796b"],
      ["bridge-medium","#ffbf66"],
      ["bridge-low","#55d6a6"]
    ].forEach(([id,color])=>{
      const marker=createSvg("marker",{id,markerWidth:8,markerHeight:8,refX:7,refY:3.5,orient:"auto",markerUnits:"strokeWidth"});
      marker.append(createSvg("path",{d:"M0,0 L7,3.5 L0,7 z",fill:color}));
      defs.append(marker);
    });
    svg.append(defs);

    layout.columns.forEach(column=>{
      const label=createSvg("text",{x:column.x,y:30,class:"bridge-column-label"});
      label.textContent=column.label;
      const count=createSvg("text",{x:column.x+200,y:30,class:"bridge-column-count","text-anchor":"end"});
      count.textContent=layout.groups[column.key].length;
      svg.append(label,count);
    });

    const edgeLayer=createSvg("g",{class:"bridge-edge-layer"});
    edges.forEach((edge,index)=>{
      const from=layout.positions.get(edge.from);
      const to=layout.positions.get(edge.to);
      if(!from||!to) return;
      const reverse=state.bridgeView==="cash"&&edge.cash_model==="DERIVED_DIRECTION";
      const start=reverse?to:from;
      const end=reverse?from:to;
      const path=bridgeCurve(start,end,index);
      const termsUnknown=state.bridgeView==="cash"&&edge.cash_model==="TERMS_UNDISCLOSED";
      const color=state.bridgeView==="policy"
        ?riskColors[edge.risk]
        :state.bridgeView==="cash"
          ?(termsUnknown?"#d6d0c1":"#7cb6ff")
          :(colors[edge.class]||"#55d6a6");
      const group=createSvg("g",{class:`bridge-edge${state.bridgeEdge===edge.id?" selected":""}`,tabindex:"0","data-id":edge.id});
      const marker=state.bridgeView==="policy"
        ?`url(#bridge-${edge.risk})`
        :state.bridgeView==="cash"
          ?(termsUnknown?null:"url(#bridge-cash)")
          :"url(#bridge-dependency)";
      const visible=createSvg("path",{d:path,class:"bridge-edge-visible",stroke:color});
      if(marker) visible.setAttribute("marker-end",marker);
      if(termsUnknown||edge.status==="historical") visible.setAttribute("stroke-dasharray","4 5");
      const hit=createSvg("path",{d:path,class:"bridge-edge-hit"});
      const open=()=>{state.bridgeEdge=edge.id;showBridgeDetail(edge);renderBridgeGraph(edges);renderBridgeLedger(edges);};
      group.append(visible,hit);
      group.addEventListener("click",open);
      group.addEventListener("keydown",event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();open();}});
      edgeLayer.append(group);
    });
    svg.append(edgeLayer);

    layout.positions.forEach((position,id)=>{
      const node=bridgeNodeById.get(id);
      const external=externalNodeById.has(id);
      const group=createSvg("g",{class:`bridge-node ${external?"external":"listed"} ${node.kind==="private-ai"?"private":""}`,transform:`translate(${position.x},${position.y-14})`});
      group.append(createSvg("rect",{x:0,y:0,width:position.width,height:29,rx:7}));
      const symbol=createSvg("text",{x:9,y:18,class:"bridge-node-symbol"});
      symbol.textContent=node.symbol;
      const name=createSvg("text",{x:position.width-8,y:18,class:"bridge-node-name","text-anchor":"end"});
      name.textContent=truncate(node.name,22);
      const title=createSvg("title");
      title.textContent=`${node.name} · ${bridgeNodeMeta(node)}`;
      group.append(symbol,name,title);
      svg.append(group);
    });
  }

  function bridgeCurve(a,b,index) {
    const leftToRight=a.x<=b.x;
    const sx=leftToRight?a.x+a.width:a.x;
    const ex=leftToRight?b.x:b.x+b.width;
    const span=Math.abs(ex-sx);
    const bend=Math.max(34,span*.34)+(index%4)*4;
    const c1=sx+(leftToRight?bend:-bend);
    const c2=ex+(leftToRight?-bend:bend);
    return `M ${sx} ${a.y} C ${c1} ${a.y}, ${c2} ${b.y}, ${ex} ${b.y}`;
  }

  function bridgeNodeMeta(node) {
    if(node.side==="nasdaq") return "Nasdaq-100 listed endpoint";
    if(node.side==="hkex") return "HKEX Core-100 listed endpoint";
    return `${node.geography} · ${node.kind==="private-ai"?"Private AI / robotics":"External industrial"} · ${node.sector}`;
  }

  function showBridgeDetail(edge) {
    const from=bridgeNodeById.get(edge.from);
    const to=bridgeNodeById.get(edge.to);
    const sources=edge.source_ids.map(id=>sourceById.get(id)).filter(Boolean);
    const policies=edge.policy_ids.map(id=>policyById.get(id)).filter(Boolean);
    const cash=edge.cash_model==="DERIVED_DIRECTION"
      ?`${escapeHtml(to.name)} → ${escapeHtml(from.name)}. Direction is derived from the supplier/customer structure; amount: UNKNOWN.`
      :"No reverse-cash arrow is asserted. Commercial terms and net direction are undisclosed.";
    el("bridgeDetail").innerHTML=`
      <p class="kicker">${escapeHtml(edge.lane)}</p>
      <h2>${escapeHtml(edge.label)}</h2>
      <div class="tag-row"><span class="tag">${escapeHtml(edge.status)}</span><span class="tag">Evidence ${escapeHtml(edge.evidence)}</span><span class="tag ${edge.risk}">${escapeHtml(edge.risk)} fracture</span></div>
      <div class="route"><div><strong>${escapeHtml(from.name)}</strong><span>${escapeHtml(bridgeNodeMeta(from))}</span></div><div class="arrow">to</div><div><strong>${escapeHtml(to.name)}</strong><span>${escapeHtml(bridgeNodeMeta(to))}</span></div></div>
      <p>${escapeHtml(edge.detail)}</p>
      <h3>Reverse consideration</h3><p>${cash}</p>
      <h3>What the evidence does not prove</h3><p>${escapeHtml(edge.limits)}</p>
      <h3>Policy fracture</h3>${policies.length?`<ul>${policies.map(policy=>`<li><strong>${escapeHtml(policy.name)}</strong> — ${escapeHtml(policy.mechanism)}</li>`).join("")}</ul>`:"<p>No targeted policy mechanism is linked in this pilot.</p>"}
      <h3>Sources</h3>${sources.map(sourceLink).join("")}`;
  }

  function renderBridgeLedger(edges) {
    const host=el("bridgeEdgeList");
    host.innerHTML=edges.map(edge=>{
      const from=bridgeNodeById.get(edge.from);
      const to=bridgeNodeById.get(edge.to);
      return `<button type="button" data-bridge-edge="${edge.id}" class="${state.bridgeEdge===edge.id?"selected":""}">
        <span class="bridge-lane">${escapeHtml(edge.lane.replace(" bridge",""))}</span>
        <span><strong>${escapeHtml(from.name)} → ${escapeHtml(to.name)}</strong>${escapeHtml(edge.label)}</span>
        <small>${escapeHtml(edge.status)} · ${escapeHtml(edge.risk)} risk</small>
      </button>`;
    }).join("");
    host.querySelectorAll("[data-bridge-edge]").forEach(button=>button.addEventListener("click",()=>{
      state.bridgeEdge=button.dataset.bridgeEdge;
      const edge=data.bridgeRelationships.find(item=>item.id===state.bridgeEdge);
      showBridgeDetail(edge);
      renderBridgeGraph(edges);
      renderBridgeLedger(edges);
    }));
  }

  function renderMatrix() {
    const nodes=scopedNodes();
    const us=nodes.filter(d=>d.side==="nasdaq"),hk=nodes.filter(d=>d.side==="hkex");
    const rels=filteredRelationships();
    const byPair=new Map();
    rels.forEach(r=>{
      const key=[r.from,r.to].sort().join("|");
      if(!byPair.has(key)) byPair.set(key,[]);
      byPair.get(key).push(r);
    });
    const table=document.createElement("table"); table.className="matrix-table";
    const thead=document.createElement("thead"),hr=document.createElement("tr");
    hr.innerHTML="<th></th>"+us.map(d=>`<th class="col-head" scope="col"><span>${escapeHtml(d.symbol)} · ${escapeHtml(d.name)}</span></th>`).join("");
    thead.append(hr); table.append(thead);
    const tbody=document.createElement("tbody");
    hk.forEach(h=>{
      const tr=document.createElement("tr");
      tr.innerHTML=`<th class="row-head" scope="row">${escapeHtml(h.name)} · ${escapeHtml(h.symbol)}</th>`;
      us.forEach(u=>{
        const td=document.createElement("td");
        const rs=byPair.get([h.id,u.id].sort().join("|"))||[];
        if(rs.length){
          const r=rs[0]; td.className="has-edge"; td.style.background=state.view==="policy"?riskColors[r.risk]:(colors[r.class]||"#55d6a6");
          td.innerHTML=`<button title="${escapeAttr(r.label)}" aria-label="${escapeAttr(`${u.name} and ${h.name}: ${r.label}`)}">${rs.length}</button>`;
          td.querySelector("button").addEventListener("click",()=>selectRelationship(r));
        }
        tr.append(td);
      });
      tbody.append(tr);
    });
    table.append(tbody); el("matrix").replaceChildren(table);
  }

  function renderLedger() {
    const tbody=el("ledgerTable").querySelector("tbody"); tbody.innerHTML="";
    filteredRelationships().forEach(r=>{
      const tr=document.createElement("tr");
      tr.innerHTML=`<td>${escapeHtml(nodeById.get(r.from).name)}</td><td>${escapeHtml(nodeById.get(r.to).name)}</td><td>${escapeHtml(r.label)}</td><td>${r.status}</td><td>${r.evidence}</td><td><span class="tag ${r.risk}">${r.risk}</span></td><td>${escapeHtml(r.date)}</td><td>${escapeHtml(r.amount)}</td>`;
      tr.addEventListener("click",()=>selectRelationship(r)); tbody.append(tr);
    });
  }

  function explorerRelationships() {
    return data.relationships.filter(r=>{
      if(state.explorerClass!=="all"&&r.class!==state.explorerClass) return false;
      if(state.explorerEvidence!=="all"&&r.evidence!==state.explorerEvidence) return false;
      if(state.explorerStatus==="current"&&r.status==="historical") return false;
      if(state.explorerStatus==="historical"&&r.status!=="historical") return false;
      return true;
    });
  }

  function companyProvenance(side,symbol) {
    const node=pilotByUniverseKey.get(`${side}:${symbol}`);
    if(!node) return "unmapped";
    return node.phase==="2A"?"2A":"core";
  }

  function companySector(side,symbol) {
    return pilotByUniverseKey.get(`${side}:${symbol}`)?.sector||"Unclassified";
  }

  function findUniverseCompany(side,symbol) {
    return data.universes[side].companies.find(c=>c.symbol===symbol)||null;
  }

  function companyLabel(company) {
    return company?`${company.symbol} · ${company.name}`:"";
  }

  function populatePairOptions(side) {
    const host=el(side==="nasdaq"?"nasdaqOptions":"hkexOptions");
    data.universes[side].companies.forEach(company=>{
      const option=document.createElement("option");
      option.value=companyLabel(company);
      host.append(option);
    });
  }

  function parseCompanyInput(side,value) {
    const trimmed=value.trim();
    const prefix=trimmed.split(" · ")[0];
    const company=data.universes[side].companies.find(c=>
      c.symbol.toLowerCase()===prefix.toLowerCase() ||
      c.name.toLowerCase()===trimmed.toLowerCase() ||
      companyLabel(c).toLowerCase()===trimmed.toLowerCase()
    );
    return company?.symbol||null;
  }

  function filteredEdgeCounts() {
    const counts=new Map();
    explorerRelationships().forEach(r=>{
      [r.from,r.to].forEach(id=>counts.set(id,(counts.get(id)||0)+1));
    });
    return counts;
  }

  function renderExplorer() {
    renderUniverse("nasdaq");
    renderUniverse("hkex");
    renderPairResult();
  }

  function renderUniverse(side) {
    const universe=data.universes[side];
    const counts=filteredEdgeCounts();
    const host=el(side==="nasdaq"?"nasdaqUniverse":"hkexUniverse");
    host.innerHTML="";
    const visible=universe.companies.filter(c=>{
      const node=pilotByUniverseKey.get(`${side}:${c.symbol}`);
      const provenance=companyProvenance(side,c.symbol);
      const sector=companySector(side,c.symbol);
      const edgeCount=node?counts.get(node.id)||0:0;
      if(state.explorerSearch&&!`${c.symbol} ${c.name}`.toLowerCase().includes(state.explorerSearch)) return false;
      if(state.explorerProvenance!=="all"&&provenance!==state.explorerProvenance) return false;
      if(state.explorerSector!=="all"&&sector!==state.explorerSector) return false;
      if(state.explorerLinkedOnly&&edgeCount===0) return false;
      return true;
    });

    visible.forEach(c=>{
      const node=pilotByUniverseKey.get(`${side}:${c.symbol}`);
      const provenance=companyProvenance(side,c.symbol);
      const edgeCount=node?counts.get(node.id)||0:0;
      const button=document.createElement("button");
      const selectedSymbol=side==="nasdaq"?state.pairNasdaq:state.pairHkex;
      button.type="button";
      button.className=`universe-company${provenance==="core"?" selected":""}${provenance==="2A"?" phase2a-selected":""}${selectedSymbol===c.symbol?" pair-selected":""}`;
      button.setAttribute("aria-label",`Select ${c.name} for direct-pair check; ${edgeCount} verified ${edgeCount===1?"edge":"edges"} under current filters`);
      button.innerHTML=`<span class="sym">${escapeHtml(c.symbol)}</span><span>${escapeHtml(c.name)}</span><span class="universe-meta"><b>${edgeCount}</b> ${edgeCount===1?"edge":"edges"} · ${c.weight==null?"—":c.weight.toFixed(2)+"%"}</span>`;
      button.addEventListener("click",()=>{
        if(side==="nasdaq"){
          state.pairNasdaq=c.symbol;
          el("pairNasdaqInput").value=companyLabel(c);
        }else{
          state.pairHkex=c.symbol;
          el("pairHkexInput").value=companyLabel(c);
        }
        renderExplorer();
        el("pairResult").scrollIntoView({behavior:"smooth",block:"center"});
      });
      host.append(button);
    });
    el(side==="nasdaq"?"nasdaqUniverseCount":"hkexUniverseCount").textContent=`${visible.length} of 100`;
    if(!visible.length){
      const empty=document.createElement("p");
      empty.className="universe-empty";
      empty.textContent="No issuers match these filters.";
      host.append(empty);
    }
  }

  function renderPairResult() {
    const host=el("pairResult");
    const us=findUniverseCompany("nasdaq",state.pairNasdaq);
    const hk=findUniverseCompany("hkex",state.pairHkex);
    if(!us||!hk){
      host.innerHTML=`<p class="pair-state">Choose an exact company from each list to inspect a direct pair.</p>`;
      return;
    }
    const usNode=pilotByUniverseKey.get(`nasdaq:${us.symbol}`);
    const hkNode=pilotByUniverseKey.get(`hkex:${hk.symbol}`);
    const allDirect=usNode&&hkNode
      ?data.relationships.filter(r=>(r.from===usNode.id&&r.to===hkNode.id)||(r.from===hkNode.id&&r.to===usNode.id))
      :[];
    const visibleIds=new Set(explorerRelationships().map(r=>r.id));
    const visibleDirect=allDirect.filter(r=>visibleIds.has(r.id));
    const allCounts=new Map();
    data.relationships.forEach(r=>[r.from,r.to].forEach(id=>allCounts.set(id,(allCounts.get(id)||0)+1)));
    const usCount=usNode?allCounts.get(usNode.id)||0:0;
    const hkCount=hkNode?allCounts.get(hkNode.id)||0:0;
    const context=`${escapeHtml(us.symbol)} has ${usCount} sourced ${usCount===1?"edge":"edges"}; ${escapeHtml(hk.symbol)} has ${hkCount}.`;

    if(visibleDirect.length){
      host.innerHTML=`
        <div class="pair-verdict verified"><strong>${visibleDirect.length} verified direct ${visibleDirect.length===1?"route":"routes"}</strong><span>${context}</span></div>
        <div class="pair-routes">${visibleDirect.map(r=>{
          const from=nodeById.get(r.from),to=nodeById.get(r.to);
          return `<button type="button" class="pair-route" data-id="${r.id}">
            <span><b>${escapeHtml(from.symbol)}</b> ${escapeHtml(from.name)}</span>
            <span class="pair-route-arrow">→</span>
            <span><b>${escapeHtml(to.symbol)}</b> ${escapeHtml(to.name)}</span>
            <small>${escapeHtml(r.label)} · ${escapeHtml(r.class)} · Evidence ${r.evidence} · ${r.phase==="2A"?"Phase 2A":"Core"}</small>
          </button>`;
        }).join("")}</div>`;
      host.querySelectorAll(".pair-route").forEach(button=>button.addEventListener("click",()=>{
        const relationship=data.relationships.find(r=>r.id===button.dataset.id);
        selectRelationship(relationship);
        el("detailPanel").scrollIntoView({behavior:"smooth",block:"start"});
      }));
      return;
    }

    if(allDirect.length){
      host.innerHTML=`
        <div class="pair-verdict filtered"><strong>Verified route hidden by current filters</strong><span>${context} Reset the capability, evidence or age filter to reveal it.</span></div>`;
      return;
    }

    host.innerHTML=`
      <div class="pair-verdict unknown"><strong>NOT_ESTABLISHED</strong><span>No direct cross-universe relationship between ${escapeHtml(us.name)} and ${escapeHtml(hk.name)} is present in the current 41-edge evidence ledger. This is not proof that none exists. ${context}</span></div>`;
  }

  function resetExplorer() {
    Object.assign(state,{
      explorerSearch:"",explorerProvenance:"all",explorerSector:"all",
      explorerClass:"all",explorerEvidence:"all",explorerStatus:"all",
      explorerLinkedOnly:false,pairNasdaq:"NVDA",pairHkex:"9866"
    });
    el("universeSearch").value="";
    el("provenanceFilter").value="all";
    el("sectorFilter").value="all";
    el("explorerClassFilter").value="all";
    el("evidenceFilter").value="all";
    el("explorerStatusFilter").value="all";
    el("linkedOnly").checked=false;
    el("pairNasdaqInput").value=companyLabel(findUniverseCompany("nasdaq",state.pairNasdaq));
    el("pairHkexInput").value=companyLabel(findUniverseCompany("hkex",state.pairHkex));
    renderExplorer();
  }

  function escapeHtml(value){return String(value??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));}
  function escapeAttr(value){return escapeHtml(value);}
  init();
})();
