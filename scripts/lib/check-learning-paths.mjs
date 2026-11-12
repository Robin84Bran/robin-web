/** Read-only checks of the published learning paths, including not-yet-studied seeds. */
export function checkLearningPaths(programme, chapters, readRoute) {
  const problems=[];
  const page=route=>{try{return readRoute(route.split('#')[0]);}catch{return '';}};
  const hasLink=(html,href)=>html.includes(`href="${href}"`);
  const hub=page('/intelligence/'),research=page('/research/'),guide=page('/research/kid-edition/');
  const row=(html,attribute,id)=>html.match(new RegExp(`<li\\b[^>]*${attribute}="${id}"[^>]*>[\\s\\S]*?</li>`))?.[0]??'';
  for(const e of programme.experiments) {
    if(!/^[a-z0-9-]+$/.test(e.id)){problems.push('Invalid experiment id');continue;}
    const name=e.id,play=`/intelligence/${name}/`,kid=`/research/kid-edition/#${name}`;
    const study=e.href??programme.studies.find(s=>s.title===e.title)?.href;
    const matches=chapters.filter(q=>q.id===name),q=matches[0];
    if(matches.length!==1){problems.push(`${name}: exactly one Kid edition chapter required`);continue;}
    if(q.title!==e.title||q.direction!==e.direction||q.play!==play||q.related)problems.push(`${name}: chapter identity differs from catalogue`);
    for(const field of ['imagine','question','finding','wonder'])if(typeof q[field]!=='string'||!q[field].trim())problems.push(`${name}: missing ${field}`);
    if((q.study??null)!==(study??null))problems.push(`${name}: chapter study does not match published maturity`);
    const game=page(play),intelligenceRow=row(hub,'data-weekly-experiment',name),researchRow=row(research,'data-research-topic',name);
    for(const [label,html] of [['Intelligence',intelligenceRow],['Research',researchRow]]) {
      if(!hasLink(html,play)||!hasLink(html,kid))problems.push(`${name}: ${label} missing game/Kid link`);
      if(study&&!hasLink(html,study))problems.push(`${name}: ${label} missing empirical study link`);
    }
    if(!guide.includes(`id="${name}"`)||!hasLink(guide,play))problems.push(`${name}: missing guide section or return to game`);
    if(!hasLink(game,kid))problems.push(`${name}: game missing Kid link`);
    if(study) {
      const studyPage=page(study),fragment=study.split('#')[1];
      if(!studyPage||(fragment&&!studyPage.includes(`id="${fragment}"`)))problems.push(`${name}: study destination unavailable`);
      if(!hasLink(game,study)||!hasLink(guide,study))problems.push(`${name}: game/guide missing study link`);
      if(!hasLink(studyPage,play))problems.push(`${name}: study missing return to game`);
    } else {
      if(q.study||!game.includes('Empirical study · upcoming')||!researchRow.includes('Empirical study · upcoming'))problems.push(`${name}: unrun study must remain upcoming`);
    }
  }
  if(problems.length)throw new Error(problems.join('\n'));
  return {experiments:programme.experiments.length,chapters:chapters.length};
}
