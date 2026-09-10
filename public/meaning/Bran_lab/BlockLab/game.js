/* Block Lab: original local-only 3D toy. All art is procedural. */
(() => {
'use strict';
const $ = id => document.getElementById(id);
const host=$('scene');
let renderer;
try { renderer=new THREE.WebGLRenderer({antialias:true,alpha:false}); } catch(error) { document.querySelectorAll('button').forEach(b=>b.disabled=true);const failure=document.createElement('div');failure.id='readyPanel';failure.innerHTML='<div role="alert"><span class="eyebrow">THE WORLD COULD NOT START</span><h2>Let’s get 3D working.</h2><p>This browser could not start WebGL, or the local 3D library is missing. Enable hardware acceleration or try a WebGL-enabled browser. Keep the shared folder beside this game.</p><button id="retry3d">Try again</button><p>You can also return to the arcade using the link above.</p></div>';document.querySelector('.world').appendChild(failure);$('retry3d').onclick=()=>location.reload();window.MiniGame={snapshot:()=>({game:'Block Lab',status:'unavailable',progress:0,objectives:{}}),restart:()=>location.reload()};return; }
renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;host.appendChild(renderer.domElement);
const scene=new THREE.Scene();scene.background=new THREE.Color('#b9e3df');scene.fog=new THREE.Fog('#b9e3df',22,50);
const camera=new THREE.OrthographicCamera(-10,10,10,-10,.1,100);
const ambient=new THREE.HemisphereLight(0xfffdeb,0x558c89,2.1);scene.add(ambient);
const sun=new THREE.DirectionalLight(0xfff3d0,3.1);sun.position.set(-7,15,8);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-11;sun.shadow.camera.right=11;sun.shadow.camera.top=11;sun.shadow.camera.bottom=-11;sun.shadow.normalBias=.035;scene.add(sun);
const ground=new THREE.Group(),construction=new THREE.Group(),decor=new THREE.Group();scene.add(ground,construction,decor);
const hitTargets=[];const cells=new Map();const maxHeight=5;
let selected={x:-2,z:0},material='moss',started=false,paused=false,calm=matchMedia('(prefers-reduced-motion: reduce)').matches,rotation=0,done={bridge:false,tower:false,mix:false},builtTotal=0;
try{const savedMotion=localStorage.getItem('bran-blocklab-calm');if(savedMotion==='true'||savedMotion==='false')calm=savedMotion==='true';}catch{}
const key=(x,z)=>`${x},${z}`;
const baseAt=(x,z)=>(x>=-5&&x<=-1&&Math.abs(z)<=2)||(x>=3&&x<=5&&Math.abs(z)<=1);
const mats={moss:new THREE.MeshStandardMaterial({color:0x87c98d,roughness:.82}),glass:new THREE.MeshStandardMaterial({color:0x63d2e8,transparent:true,opacity:.42,roughness:.18,metalness:.18,depthWrite:false}),glow:new THREE.MeshStandardMaterial({color:0xffcc60,emissive:0xe89924,emissiveIntensity:.48,roughness:.38})};
const terrain=new THREE.MeshStandardMaterial({color:0xb5d78b,roughness:1});const edgeMat=new THREE.MeshStandardMaterial({color:0x769487,roughness:1});const waterMat=new THREE.MeshStandardMaterial({color:0x6dc5cd,roughness:.32,metalness:.15,transparent:true,opacity:.68});
const box=new THREE.BoxGeometry(.94,.88,.94);
function mesh(geometry,mat,x,y,z,parent=decor){const m=new THREE.Mesh(geometry,mat);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
const basin=mesh(new THREE.CylinderGeometry(8.1,7.6,.65,64),new THREE.MeshStandardMaterial({color:0x457c83,roughness:.8}),0,-1.2,0,ground);
mesh(new THREE.CylinderGeometry(7.95,7.95,.13,64),waterMat,0,-.83,0,ground);
for(let x=-5;x<=5;x++)for(let z=-4;z<=4;z++){
 const c={x,z,base:baseAt(x,z),blocks:[]};cells.set(key(x,z),c);
 if(c.base){const m=mesh(box,terrain,x,-.45,z,ground);m.userData.cell=c;hitTargets.push(m);mesh(new THREE.BoxGeometry(.94,.38,.94),edgeMat,x,-1.07,z,ground);}
 else {const m=mesh(new THREE.PlaneGeometry(.98,.98),new THREE.MeshBasicMaterial({color:0xb3f3e8,transparent:true,opacity:.09,side:THREE.DoubleSide}),x,-.71,z,ground);m.rotation.x=-Math.PI/2;m.userData.cell=c;hitTargets.push(m);}
}
// A clear highlighted path invites the first experiment.
const guideMat=new THREE.MeshBasicMaterial({color:0xeafce5,transparent:true,opacity:.65,side:THREE.DoubleSide});
const guides=[];for(let x=0;x<=2;x++){const g=mesh(new THREE.RingGeometry(.18,.24,32),guideMat,x,-.69,0);g.rotation.x=-Math.PI/2;guides.push(g);}
const pad=mesh(new THREE.CylinderGeometry(.43,.43,.08,6),new THREE.MeshStandardMaterial({color:0xffce5c}),-3,.02,-1);
const beacon=mesh(new THREE.OctahedronGeometry(.29),new THREE.MeshStandardMaterial({color:0xffd57c,emissive:0xfbb94c,emissiveIntensity:.8}),-3,3.6,-1);
const beaconRing=mesh(new THREE.TorusGeometry(.43,.022,8,40),new THREE.MeshBasicMaterial({color:0xfff4ca}),-3,3.6,-1);beaconRing.rotation.x=Math.PI/2;
// Original field-station plants and discovery apparatus.
const stemMat=new THREE.MeshStandardMaterial({color:0x558878});const leafMat=new THREE.MeshStandardMaterial({color:0x69ad79});
for(const [x,z,s] of [[-4.6,-1.8,.8],[-4.5,1.8,1],[-1.3,-1.8,.75],[4.8,-.6,.6]]){mesh(new THREE.CylinderGeometry(.05,.09,s,6),stemMat,x,s/2,z);mesh(new THREE.IcosahedronGeometry(.42*s,0),leafMat,x,s+.15,z);}
const found=mesh(new THREE.OctahedronGeometry(.43),new THREE.MeshStandardMaterial({color:0x9b88d8,emissive:0x7259ad,emissiveIntensity:.22}),4,.8,0);
mesh(new THREE.CylinderGeometry(.62,.7,.18,8),new THREE.MeshStandardMaterial({color:0xeaf0d3}),4,.09,0);
const cursor=mesh(new THREE.BoxGeometry(1.035,.07,1.035),new THREE.MeshBasicMaterial({color:0xfff8d5,transparent:true,opacity:.9}),-2,.04,0);
const outline=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(.98,.9,.98)),new THREE.LineBasicMaterial({color:0xffffff,transparent:true,opacity:.85}));scene.add(outline);
const drone=new THREE.Group();scene.add(drone);mesh(new THREE.SphereGeometry(.15,12,8),new THREE.MeshStandardMaterial({color:0xfff3c3}),0,0,0,drone);const eye=mesh(new THREE.BoxGeometry(.13,.055,.055),new THREE.MeshBasicMaterial({color:0x23434d}),0,.02,.135,drone);const wingMat=new THREE.MeshStandardMaterial({color:0x49a59b});mesh(new THREE.BoxGeometry(.54,.035,.13),wingMat,0,.01,0,drone);
function tell(t){$('message').textContent=t;}
function height(c){return c.blocks.length+(c.base?0:-1);}
function cursorUpdate(){const c=cells.get(key(selected.x,selected.z));const top=c.base?c.blocks.length*.9:c.blocks.length*.9-.72;cursor.position.set(c.x,Math.max(-.68,top+.035),c.z);outline.position.set(c.x,c.base?c.blocks.length*.9+.45:c.blocks.length*.9-.27,c.z);$('tile').textContent=`Tile (${c.x}, ${c.z}) · ${c.blocks.length} built`;$('build').disabled=paused||!started||c.blocks.length>=maxHeight;$('remove').disabled=paused||!started||c.blocks.length===0;}
function bridgeConnected(){const queue=[[-1,0]],seen=new Set(['-1,0']);for(let i=0;i<queue.length;i++){const [x,z]=queue[i];if(x>=3)return true;for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]){const k=key(x+dx,z+dz),c=cells.get(k);if(c&&!seen.has(k)&&(c.base||c.blocks.length)){seen.add(k);queue.push([c.x,c.z]);}}}return false;}
function check(){
 const old={...done};const set=new Set();cells.forEach(c=>c.blocks.forEach(b=>set.add(b.material)));
 const tower=cells.get('-3,-1').blocks.length;const stepping=[0,1,2].filter(x=>cells.get(key(x,0)).blocks.length).length;
 done.bridge=done.bridge||bridgeConnected();done.tower=done.tower||tower>=3;done.mix=done.mix||set.size===3;
 $('bridge-progress').textContent=done.bridge?'Discovery island connected!':`${stepping} / 3 stepping stones`;
 $('tower-progress').textContent=done.tower?'Beacon reached!':`${tower} / 3 blocks high`;
 $('mix-progress').textContent=done.mix?'Moss, glass & glow discovered!':`${set.size} / 3 materials discovered`;
 let n=0;for(const type of ['bridge','tower','mix']){if(done[type])n++;$('mission-'+type).classList.toggle('done',done[type]);$('mission-'+type).querySelector('.mission-num').textContent=done[type]?'✓':({bridge:'01',tower:'02',mix:'03'})[type];}
 $('count').textContent=`${n} / 3`;$('complete').hidden=n!==3;
 if(n===3){try{localStorage.setItem('bran-mini-BlockLab-complete','true');}catch{}tell('All discoveries unlocked! What new world will you invent?');}
 else if(done.bridge&&!old.bridge)tell('A connection! Your bridge lets the discovery island join your world.');
 else if(done.tower&&!old.tower)tell('You reached the beacon! A wider base can make a tower look sturdier.');
 else if(done.mix&&!old.mix)tell('Three materials! Glass is transparent; glow makes its own warm light.');
 found.material.emissiveIntensity=done.bridge?.9:.22;beacon.material.emissiveIntensity=done.tower?1.8:.8;guides.forEach((g,i)=>g.visible=!cells.get(key(i,0)).blocks.length);cursorUpdate();
}
function build(){if(!started||paused)return;const c=cells.get(key(selected.x,selected.z));if(c.blocks.length>=maxHeight){tell('Five blocks is our sky limit. Try a different tile!');return;}const y=c.base?c.blocks.length*.9+.45:c.blocks.length*.9-.27;const m=mesh(box,mats[material],c.x,y,c.z,construction);m.userData.cell=c;const edges=new THREE.LineSegments(new THREE.EdgesGeometry(box),new THREE.LineBasicMaterial({color:material==='glass'?0xe0ffff:0x214c43,transparent:true,opacity:material==='glass'?.8:.12}));m.add(edges);c.blocks.push({mesh:m,material});hitTargets.push(m);builtTotal++;tell(material==='glass'?'Look through it: glass reveals what is behind your block.':material==='glow'?'A warm little light! Try a glow block inside a glass tower.':'Moss makes a leafy stepping stone. Where could it lead?');check();}
function remove(){if(!started||paused)return;const c=cells.get(key(selected.x,selected.z));const b=c.blocks.pop();if(!b){tell('This is the island itself. Choose one of your blocks to remove.');return;}construction.remove(b.mesh);hitTargets.splice(hitTargets.indexOf(b.mesh),1);b.mesh.children.forEach(e=>{e.geometry.dispose();e.material.dispose();});tell('Room for a new idea. Your earned discoveries stay with you.');check();}
function move(dx,dz){if(!started||paused)return;selected.x=Math.max(-5,Math.min(5,selected.x+dx));selected.z=Math.max(-4,Math.min(4,selected.z+dz));cursorUpdate();}
function choose(m){material=m;document.querySelectorAll('[data-material]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.material===m)));}
function pause(){if(!started)return;paused=!paused;$('pause').textContent=paused?'Resume':'Pause';$('pause').setAttribute('aria-pressed',String(paused));$('pausePanel').hidden=!paused;cursorUpdate();if(!paused)host.focus({preventScroll:true});}
function resize(){const w=host.clientWidth,h=host.clientHeight;renderer.setSize(w,h);const aspect=w/h;const span=aspect<.9?8.7:8;camera.left=-span*Math.max(1,aspect);camera.right=span*Math.max(1,aspect);camera.top=span/Math.min(1,aspect);camera.bottom=-span/Math.min(1,aspect);camera.updateProjectionMatrix();camera.position.set(12*Math.cos(rotation),14,12*Math.sin(rotation));camera.lookAt(0,0,0);}
rotation=Math.PI*.3;new ResizeObserver(resize).observe(host);
const ray=new THREE.Raycaster(),pointer=new THREE.Vector2();
function point(event){const r=renderer.domElement.getBoundingClientRect();pointer.set((event.clientX-r.left)/r.width*2-1,-(event.clientY-r.top)/r.height*2+1);ray.setFromCamera(pointer,camera);const hit=ray.intersectObjects(hitTargets,false)[0];if(hit){selected={x:hit.object.userData.cell.x,z:hit.object.userData.cell.z};cursorUpdate();return true;}return false;}
host.addEventListener('pointermove',e=>{if(started&&!paused&&e.pointerType==='mouse')point(e);});host.addEventListener('pointerdown',e=>{if(!started||paused)return;if(point(e)){host.focus({preventScroll:true});if(e.pointerType==='mouse'){if(e.button===2)remove();else if(e.button===0)build();}}});host.addEventListener('contextmenu',e=>e.preventDefault());
$('build').onclick=build;$('remove').onclick=remove;$('pause').onclick=pause;$('resume').onclick=pause;$('rotate').onclick=()=>{if(paused)return;rotation+=Math.PI/2;resize();};
$('motion').setAttribute('aria-pressed',String(calm));$('motion').onclick=()=>{calm=!calm;$('motion').setAttribute('aria-pressed',String(calm));try{localStorage.setItem('bran-blocklab-calm',String(calm));}catch{}};
document.querySelectorAll('[data-move]').forEach(b=>b.onclick=()=>move(...b.dataset.move.split(',').map(Number)));document.querySelectorAll('[data-material]').forEach(b=>b.onclick=()=>choose(b.dataset.material));
window.addEventListener('keydown',e=>{if(e.target.matches('button,a,input,select,textarea'))return;const k=e.key.toLowerCase();if(['arrowup','arrowdown','arrowleft','arrowright',' ','backspace'].includes(k))e.preventDefault();if(k==='p'){pause();return;}if(!started||paused)return;if(k==='arrowup'||k==='w')move(0,-1);if(k==='arrowdown'||k==='s')move(0,1);if(k==='arrowleft'||k==='a')move(-1,0);if(k==='arrowright'||k==='d')move(1,0);if(k===' ')build();if(k==='backspace'||k==='delete')remove();if(['1','2','3'].includes(k))choose(['moss','glass','glow'][Number(k)-1]);if(k==='r'){rotation+=Math.PI/2;resize();}});
const mobile=document.createElement('div');mobile.className='mobile-controls';mobile.innerHTML='<button data-step="-1,0" aria-label="Select west tile">←</button><button data-step="0,-1" aria-label="Select north tile">↑</button><button data-step="0,1" aria-label="Select south tile">↓</button><button data-step="1,0" aria-label="Select east tile">→</button><button class="mobile-build">＋ Build</button><button class="mobile-remove">− Undo</button>';document.querySelector('.world').appendChild(mobile);mobile.querySelectorAll('[data-step]').forEach(b=>b.onclick=()=>move(...b.dataset.step.split(',').map(Number)));mobile.querySelector('.mobile-build').onclick=build;mobile.querySelector('.mobile-remove').onclick=remove;
window.addEventListener('blur',()=>{if(started&&!paused)pause();});document.addEventListener('visibilitychange',()=>{if(document.hidden&&started&&!paused)pause();});
const ready=document.createElement('div');ready.id='readyPanel';ready.innerHTML='<div><span class="eyebrow">WELCOME, WORLD MAKER</span><h2>What can a block become?</h2><p>A bridge. A tower. A tiny glowing laboratory.<br>Follow three experiments, then invent your own.</p><p class="ready-controls">Arrows select a tile · Space builds<br>Or point and click. Touch: tap, then Build.</p><button id="startGame" class="primary">Start exploring →</button></div>';document.querySelector('.world').appendChild(ready);
function begin(){started=true;paused=false;ready.hidden=true;$('pausePanel').hidden=true;$('pause').textContent='Pause';$('pause').setAttribute('aria-pressed','false');cursorUpdate();host.focus({preventScroll:true});}
$('startGame').onclick=begin;
function restart(){cells.forEach(c=>{c.blocks.forEach(b=>{construction.remove(b.mesh);hitTargets.splice(hitTargets.indexOf(b.mesh),1);b.mesh.children.forEach(e=>{e.geometry.dispose();e.material.dispose();});});c.blocks=[];});done={bridge:false,tower:false,mix:false};selected={x:-2,z:0};builtTotal=0;choose('moss');started=false;paused=false;ready.hidden=false;$('pausePanel').hidden=true;$('pause').textContent='Pause';$('pause').setAttribute('aria-pressed','false');check();tell('Try building a bridge across the water.');$('startGame').focus({preventScroll:true});}
$('restart').onclick=restart;
window.MiniGame={restart,snapshot:()=>({game:'Block Lab',status:!started?'ready':paused?'paused':Object.values(done).every(Boolean)?'complete':'playing',progress:Object.values(done).filter(Boolean).length,objectives:{...done},selected:{...selected},material,blocks:[...cells.values()].filter(c=>c.blocks.length).map(c=>({x:c.x,z:c.z,materials:c.blocks.map(b=>b.material)})),builtTotal,reducedMotion:calm})};
// Pointer toolbar actions return to play; keyboard activation retains normal button focus.
document.querySelectorAll('button').forEach(button=>button.addEventListener('click',e=>{if(e.detail>0&&started&&!paused)host.focus({preventScroll:true});}));
let tick=0;function frame(){requestAnimationFrame(frame);if(started&&!paused&&!calm)tick+=.015;beacon.rotation.y=tick*.5;found.rotation.y=-tick*.35;beacon.position.y=3.6+(calm?0:Math.sin(tick)*.08);found.position.y=.8+(calm?0:Math.sin(tick+2)*.07);drone.position.set(-1.5,1.3+(calm?0:Math.sin(tick*1.2)*.07),1.4);renderer.render(scene,camera);}check();resize();frame();
})();
