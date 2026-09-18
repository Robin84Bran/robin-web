import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const root = new URL('../../public/meaning/Bran_lab/', import.meta.url);
function runtime(game) {
  const element = () => ({ width:1280, height:720, style:{}, dataset:{}, children:[], classList:{toggle(){},add(){},remove(){},contains(){return false;}}, addEventListener(){}, setAttribute(){}, appendChild(child){this.children.push(child);}, append(child){this.children.push(child);}, getContext(){return {};}, querySelector(){return element();}, querySelectorAll(){return [];}, focus(){}, getBoundingClientRect(){return {width:1280,height:720,left:0,top:0};} });
  const nodes = new Map();
  const c = {console,Math,performance:{now:()=>0},requestAnimationFrame(){},setTimeout(){},clearTimeout(){},Event:class{},addEventListener(){},dispatchEvent(){},localStorage:{getItem:()=>null,setItem(){}},document:{body:element(),addEventListener(){},getElementById(id){if(!nodes.has(id))nodes.set(id,element());return nodes.get(id);},createElement:element,querySelector:element,querySelectorAll:()=>[]}};
  c.window=c;vm.createContext(c);
  for(const file of ['shared/platform-safety.js','shared/grade4-questions.js',...(game==='SuperRun'?['SuperRun/enemies.js','SuperRun/powerups.js','SuperRun/questions.js','SuperRun/levels.js']:['GeoDash/questions.js','GeoDash/data.js'])])vm.runInContext(readFileSync(new URL(file,root),'utf8'),c);
  // Expose closure state only in this test VM; no debug mutation API is shipped.
  const code=readFileSync(new URL(`${game}/main.js`,root),'utf8').replace(/\}\)\(\);\s*$/, 'window.qa={state,startLevel,updateWorld,updateCheckpoints,loseLife,takePlayerHit,onKeyDown,updatePlayer,updateFinish,rectsOverlap};})();');
  vm.runInContext(code,c);c.qa.state.save.settings.sound=false;return c;
}
for(const game of ['SuperRun','GeoDash'])test(`${game}: every checkpoint survives repeated falls, held keys, and auto movement`,()=>{
 const c=runtime(game), q=c.qa, levels=vm.runInContext('LEVELS',c);
 for(let level=0;level<levels.length;level++)for(const auto of [false,true]){
  q.state.save.settings[game==='SuperRun'?'autoRun':'autoForward']=auto;
  for(let checkpoint=-1;checkpoint<levels[level].checkpoints.length;checkpoint++){
   q.startLevel(level);const w=q.state.world,p=w.player;
   if(checkpoint>=0){const point=w.checkpoints[checkpoint];p.x=point.x;p.y=point.y-30;q.updateCheckpoints(w);assert(w.checkpoints[checkpoint].active);}
   const originalLives=p.lives;
   for(let fall=1;fall<=2;fall++){
    p.awaitingMove=false;q.state.screen='playing';q.state.keys.right=true;p.vy=900;p.y=w.level.height+400;q.updateWorld(1/60);
    assert.equal(p.lives,originalLives-fall,`${game} level ${level+1}, checkpoint ${checkpoint}: exactly one life per fall`);
    assert(p.awaitingMove);assert(!q.state.keys.right);assert(w.platforms.some(t=>p.x>=t.x+16&&p.x+p.w<=t.x+t.w-16&&Math.abs(p.y+p.h-t.y)<0.001));
    const at={x:p.x,y:p.y,lives:p.lives,hp:p.hp};
    for(let tick=0;tick<600;tick++)q.updateWorld(1/60);
    q.takePlayerHit(99,'test hazard');
    assert.deepEqual({x:p.x,y:p.y,lives:p.lives,hp:p.hp},at,'Recovery waits safely even with auto movement enabled');
    q.onKeyDown({key:'ArrowUp',repeat:false,preventDefault(){}});assert(!p.awaitingMove);q.updateWorld(1/60);assert(p.vy<0,'A fresh jump resumes play');
   }
  }
 }
});
test('Grade 4 content reaches both platformers and every Pac-Man math/Chinese slot',()=>{
 const c=runtime('SuperRun'),bank=c.BranGrade4;assert.equal(bank.math.length,30);assert.equal(bank.chinese.length,30);
 for(const q of [...bank.math,...bank.chinese]){assert.equal(q.grade,4);assert.equal(new Set(q.choices).size,4);assert(q.answer>=0&&q.answer<4);assert(q.explanation.length>12);}
 const expected=['6334','4325','6000','38000','345','1 h 35 min','864','104','26 boxes, 1 left','48','50 cm','12 cm','6/8','7/8','1/2','5/6','21','0.74','0.6','55°','24','1, 2, 3, 4, 6, 8, 12, 24','109','245','158','4 kg 200 g','81 square cm','16','34','4738'];
 bank.math.forEach((q,i)=>assert.equal(q.choices[q.answer].replaceAll(',',''),expected[i].replaceAll(',',''),q.prompt));
 for(const game of ['SuperRun','GeoDash']){const c=runtime(game);for(const cat of ['math','chinese'])assert.equal(c.QUESTION_BANK.filter(q=>q.category===cat&&q.grade===4).length,30);}
 const pac=readFileSync(new URL('PacMan/script.js',root),'utf8');const from=0,to=pac.indexOf('const directions =');
 const p={window:{BranGrade4:bank}};vm.createContext(p);vm.runInContext(pac.slice(from,to)+';globalThis.testLevels=LEVELS;globalThis.testMazes=MAZES;',p);
 for(const level of p.testLevels){assert.equal(level.questions.length, p.testMazes[level.maze].join('').split('o').length - 1);for(const q of level.questions.filter(q=>['Math','Chinese'].includes(q.subject)))assert.equal(q.grade,4);}
});

test('platform top caps do not share an exposed face with the base',()=>{
 const code=readFileSync(new URL('shared/arcade-3d.js',root),'utf8');
 const fn=code.slice(code.indexOf('    function platform('),code.indexOf('    function platformScene('));
 for(const kind of ['run','dash']){
  const meshes=new Map(), c={kind,S:50,Math,mesh:(id,shape,color,x,y,z,w,h,d)=>meshes.set(id,{x,y,z,w,h,d})};vm.createContext(c);vm.runInContext(fn+';globalThis.draw=platform;',c);
  for(const height of [28,60,160,800]){
   c.draw('base',{x:0,y:760,w:900,h:height},{level:{palette:{terrainSide:'#519e91',terrainTop:'#83d6a0'}}});
   const body=meshes.get('base'),top=meshes.get('basetop');
   assert(body.h>0);assert(body.y+body.h/2<top.y+top.h/2-0.1,'top face must sit above the base, not fight it for depth');
  }
 }
});

// Diagnose geometry with enemies cleared and no power-ups. These tests execute
// the real movement/collision code; only the VM can access closure state.
for (const game of ['SuperRun', 'GeoDash']) test(`${game}: every finish is reachable with ordinary jumps at 30 and 60 Hz`, () => {
 const c=runtime(game),q=c.qa,levels=vm.runInContext('LEVELS',c);
 for(const dt of [1/30,1/60]) for(let li=0;li<levels.length;li++){
  q.startLevel(li);const w=q.state.world, original={...w.player},plats=w.platforms,gate=w.level.finish;
  w.hazards=[];w.enemies=[];w.bossCleared=true;
  const edges=plats.map(()=>new Set()),gateFrom=new Map();
  for(let i=0;i<plats.length;i++){
   const plat=plats[i];const positions=[];for(let x=plat.x-original.w+2;x<=plat.x+plat.w-2;x+=12)positions.push(x);
   positions.push(plat.x+plat.w-original.w,plat.x,plat.x+plat.w-2);
   for(const x of positions)for(const dir of [-1,0,1])for(const jumping of [false,true]){
    const p=w.player={...original,effects:original.effects?{...original.effects}:undefined,x,y:plat.y-original.h,vx:dir*(dir<0?272:320),vy:0,grounded:true,coyote:.15,awaitingMove:false};
    if(plats.some(t=>q.rectsOverlap(p,t)))continue;
    q.state.keys={left:dir<0,right:dir>0};q.state.jumpQueued=jumping;w.particles=[];
    let minY=p.y;
    for(let tick=0;tick<150;tick++){
     if(game==='SuperRun'){p.coyote=Math.max(0,p.coyote-dt);p.jumpBuffer=Math.max(0,p.jumpBuffer-dt);}
     q.updatePlayer(w,dt);minY=Math.min(minY,p.y);
     if(q.rectsOverlap(p,gate)){gateFrom.set(i,{platform:i,x,dir,jumping,tick,player:{x:p.x,y:p.y},minY});break;}
     if(p.grounded && tick>0){const j=plats.findIndex(t=>Math.abs(p.y+p.h-t.y)<.01&&p.x+p.w>t.x&&p.x<t.x+t.w);if(j>=0&&j!==i){edges[i].add(j);}if(j!==i||jumping)break;}
     if(p.y>w.level.height+200)break;
    }
   }
  }
  const initial=plats.findIndex(t=>Math.abs(original.y+original.h-t.y)<.01&&original.x+original.w>t.x&&original.x<t.x+t.w);
  const seen=new Set([initial]),queue=[initial],parent={};while(queue.length){const i=queue.shift();for(const j of edges[i])if(!seen.has(j)){seen.add(j);parent[j]=i;queue.push(j);}}
  const fin=[...gateFrom.keys()].find(i=>seen.has(i));const route=[];if(fin!==undefined){let j=fin;while(j!==undefined){route.unshift(j);j=parent[j];}}

  assert.notEqual(fin,undefined,`${game} level ${li+1}: no ordinary-jump finish route at ${Math.round(1/dt)} Hz`);
  // Replay the final approach through the real completion trigger.
  q.startLevel(li);const finalWorld=q.state.world, p=finalWorld.player, step=gateFrom.get(fin), platform=finalWorld.platforms[fin];
  finalWorld.hazards=[];finalWorld.enemies=[];finalWorld.bossCleared=true;
  Object.assign(p,{x:step.x,y:platform.y-p.h,vx:step.dir*(step.dir<0?272:320),vy:0,grounded:true,coyote:.15,awaitingMove:false});
  q.state.keys={left:step.dir<0,right:step.dir>0};q.state.jumpQueued=step.jumping;
  for(let tick=0;tick<=step.tick;tick++){
   if(game==='SuperRun'){p.coyote=Math.max(0,p.coyote-dt);p.jumpBuffer=Math.max(0,p.jumpBuffer-dt);}
   q.updatePlayer(finalWorld,dt);q.updateFinish(finalWorld);
   if(q.state.screen==='result')break;
  }
  assert.equal(q.state.screen,'result',`${game} level ${li+1}: touching the gate must complete the level`);
 }
});
