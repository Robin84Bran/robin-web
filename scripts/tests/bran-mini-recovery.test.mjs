import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
const root=new URL('../../public/meaning/Bran_lab/',import.meta.url);
function runtime(game){
 const events=new Map(),nodes=new Map();
 const element=()=>({style:{},dataset:{},clientWidth:1280,clientHeight:720,classList:{add(){},remove(){},toggle(){}},appendChild(){},addEventListener(){},setAttribute(){},focus(){},querySelector(){return element();}});
 const c={console,Math,performance:{now:()=>0},requestAnimationFrame(){},devicePixelRatio:1,matchMedia:()=>({matches:false}),localStorage:{getItem:()=>null,setItem(){}},HTMLButtonElement:class{},ResizeObserver:class{observe(){}},document:{hidden:false,getElementById(id){if(!nodes.has(id))nodes.set(id,element());return nodes.get(id);},querySelectorAll:()=>[],addEventListener(){}},addEventListener(name,fn){events.set(name,fn);}};
 c.window=c;c.self=c;vm.createContext(c);
 vm.runInContext(readFileSync(new URL('shared/vendor/three.min.js',root),'utf8'),c);
 c.THREE={...c.THREE,WebGLRenderer:class{constructor(){this.domElement=element();this.shadowMap={};}setPixelRatio(){}setSize(){}render(){}}};
 const api=game==='WonderTrail'?'restart,update,interact,place:(px,py,pz)=>{x=px;y=py;z=pz;vy=0;},hold:code=>keys[code]=true':'restart,update,place:(px,py,pz)=>{x=px;y=py;z=pz;vy=0;},hold:code=>keys[code]=true';
 const source=readFileSync(new URL(game+'/game.js',root),'utf8').replace(/\}\)\(\);\s*$/,`window.qa={${api}};})();`);
 vm.runInContext(source,c);return{q:c.qa,snap:c.MiniGame.snapshot,key:(code,repeat=false)=>events.get('keydown')({code,repeat,target:{},preventDefault(){}})};
}
for(const game of ['WonderTrail','BounceTrials'])test(`${game}: every checkpoint waits safely after held-input falls, until a fresh key resumes`,()=>{
 const {q,snap,key}=runtime(game);
 for(const dt of [1/30,1/60,.08])for(let checkpoint=0;checkpoint<4;checkpoint++){
  q.restart();
  if(game==='WonderTrail')for(const [x,y] of [[3.4,0],[13.4,2.2],[27.2,1.2]].slice(0,checkpoint)){q.place(x,y,0);q.interact();}
  else for(const x of [10,20.7,29.6].slice(0,checkpoint)){q.place(x,0,0);q.update(dt);}
  for(const held of ['KeyW','KeyS','KeyD','KeyA','Space']){
   const before=snap();q.hold(held);q.place(before.checkpoint.x,-10,2.8);q.update(dt);
   const recovered=snap();assert(recovered.awaitingMove);assert.equal(recovered.recoveries,before.recoveries+1);assert.equal(recovered.position.x,recovered.checkpoint.x);assert.equal(recovered.position.z,0);
   key(held,true);for(let tick=0;tick<600;tick++)q.update(dt);
   assert.deepEqual(snap().position,recovered.position);assert.equal(snap().recoveries,recovered.recoveries);
   key('Space');q.update(dt);assert(!snap().awaitingMove);assert(snap().position.y>recovered.position.y,'fresh jump resumes safely');
  }
 }
});
