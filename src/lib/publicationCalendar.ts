interface Entry {date:string;title:string;href:string;lane:string}
export function initPublicationCalendars() {
  document.querySelectorAll<HTMLElement>('[data-publication-calendar]').forEach(root=>{
    if(root.dataset.ready) return;
    const entries:Entry[]=JSON.parse(root.querySelector('[data-calendar-entries]')!.textContent!);
    const lanes:{key:string;name:string}[]=JSON.parse(root.querySelector('[data-calendar-lanes]')!.textContent!);
    const select=root.querySelector<HTMLSelectElement>('[data-month]')!;
    if(!entries.length) return;
    let lane='all'; let selected='';
    const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Hong_Kong',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
    const current=[...select.options].find(o=>o.value===today.slice(0,7));
    if(current) select.value=current.value;
    const grid=root.querySelector<HTMLElement>('.calendar-grid')!;
    const prev=root.querySelector<HTMLButtonElement>('[data-month-prev]')!;
    const next=root.querySelector<HTMLButtonElement>('[data-month-next]')!;
    function render(reset=true) {
      const month=select.value;
      const visible=entries.filter(e=>e.date.startsWith(month)&&(lane==='all'||e.lane===lane));
      if(reset || !visible.some(e=>e.date===selected)) selected=visible[0]?.date||month+'-01';
      prev.disabled=select.selectedIndex===select.options.length-1;next.disabled=select.selectedIndex===0;
      grid.replaceChildren();
      const [y,m]=month.split('-').map(Number);const offset=(new Date(Date.UTC(y,m-1,1)).getUTCDay()+6)%7;
      for(let i=0;i<offset;i++){const blank=document.createElement('span');blank.setAttribute('aria-hidden','true');grid.append(blank);}
      const count=new Date(Date.UTC(y,m,0)).getUTCDate();
      for(let d=1;d<=count;d++){
        const date=month+'-'+String(d).padStart(2,'0');const items=visible.filter(e=>e.date===date);
        const button=document.createElement('button');button.type='button';button.textContent=String(d);button.disabled=!items.length;button.dataset.date=date;button.dataset.hasEntry=String(!!items.length);button.setAttribute('aria-pressed',String(date===selected));button.setAttribute('aria-label',`${date}, ${items.length} publications`);
        const dots=document.createElement('span');dots.setAttribute('aria-hidden','true');for(const _ of new Set(items.map(e=>e.lane))){dots.append(document.createElement('i'));}button.append(dots);
        button.addEventListener('click',()=>{selected=date;render(false);root.querySelector<HTMLButtonElement>(`[data-date="${date}"]`)?.focus();});grid.append(button);
      }
      root.querySelector('[data-selected-date]')!.textContent=new Date(selected+'T12:00:00Z').toLocaleDateString('en-US',{weekday:'long',day:'numeric',month:'long',timeZone:'UTC'});
      const agenda=root.querySelector('[data-agenda]')!;agenda.replaceChildren();
      const chosen=visible.filter(e=>e.date===selected);
      for(const e of chosen){const a=document.createElement('a');a.href=e.href;const small=document.createElement('small');small.textContent=lanes.find(l=>l.key===e.lane)?.name||e.lane;const h=document.createElement('h3');h.textContent=e.title+' →';a.append(small,h);agenda.append(a);}
      if(!chosen.length){const p=document.createElement('p');p.textContent='No publications in this selection.';agenda.append(p);}
    }
    select.addEventListener('change',()=>render());prev.addEventListener('click',()=>{select.selectedIndex++;render();});next.addEventListener('click',()=>{select.selectedIndex--;render();});
    root.querySelectorAll<HTMLButtonElement>('[data-lane]').forEach(button=>button.addEventListener('click',()=>{lane=button.dataset.lane!;root.querySelectorAll('[data-lane]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));render();}));
    render();root.querySelector<HTMLElement>('.calendar-interactive')!.hidden=false;root.dataset.ready='true';
  });
}
