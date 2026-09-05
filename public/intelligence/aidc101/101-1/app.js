import { COPY } from './i18n.js';

(()=>{
'use strict';
const root=document.getElementById('ai-factory-cinema'),canvas=root.querySelector('canvas');

const lesson=document.getElementById('aidc-factory-lesson'),languageSelect=document.getElementById('af-language');
let language=new URLSearchParams(location.search).get('lang')||'en';if(!COPY[language])language='en';let L=COPY[language];
function localizePage(){
  lesson.lang=language;languageSelect.value=language;
  lesson.querySelectorAll('[data-factory-copy]').forEach(el=>el.textContent=L[el.dataset.factoryCopy]);
  canvas.setAttribute('aria-label',L.canvas);canvas.textContent=L.canvas;
  root.querySelector('.af-top>span').textContent=L.banner;
  root.querySelector('.af-end-title').textContent=L.end;root.querySelector('.af-end-note').textContent=L.note;
  root.querySelectorAll('.af-chain span').forEach((el,i)=>el.textContent=L.chain[i]);
  root.querySelector('.af-error').textContent=L.error;root.querySelector('.af-replay').textContent=L.replay;
  root.querySelector('.af-scrub').setAttribute('aria-label',L.timeline);root.querySelector('.af-scrub-label .sr-only').textContent=L.timeline;
  const back=lesson.querySelector('.af-back');back.href='/intelligence/aidc101/'+(language==='en'?'':'?lang='+language);
  root.querySelector('.af-play').textContent=root.factory?.isPlaying()?L.pause:L.play;
}
languageSelect.onchange=()=>{language=languageSelect.value;L=COPY[language];localizePage();root.factory?.refreshLanguage();try{const url=new URL(location.href);if(language==='en')url.searchParams.delete('lang');else url.searchParams.set('lang',language);history.replaceState(null,'',url);}catch{}};
localizePage();

const gl=canvas.getContext('webgl',{antialias:true,alpha:false,preserveDrawingBuffer:true});
if(!gl){root.querySelector('.af-error').hidden=false;root.querySelector('.af-caption').hidden=true;root.querySelectorAll('button,input').forEach(el=>el.disabled=true);return;}
const v=(x=0,y=0,z=0)=>[x,y,z],add=(a,b)=>a.map((n,i)=>n+b[i]),sub=(a,b)=>a.map((n,i)=>n-b[i]),mul=(a,s)=>a.map(n=>n*s),dot=(a,b)=>a.reduce((s,n,i)=>s+n*b[i],0),cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],norm=a=>mul(a,1/(Math.hypot(...a)||1)),mix=(a,b,t)=>a.map((n,i)=>n+(b[i]-n)*t),smooth=t=>t*t*(3-2*t);
const palette={steel:[.26,.34,.4],dark:[.055,.085,.12],edge:[.39,.49,.55],floor:[.06,.09,.12],gold:[.95,.55,.12],cyan:[.29,.65,.75],blue:[.07,.31,.9],red:[.94,.21,.08],white:[.6,.75,.83],violet:[.62,.48,.67],green:[.13,.82,.53]};
const VS=`attribute vec3 aP;attribute vec3 aN;attribute vec3 aC;attribute float aE;uniform mat4 uVP;varying vec3 wP;varying vec3 wN;varying vec3 col;varying float em;void main(){wP=aP;wN=aN;col=aC;em=aE;gl_Position=uVP*vec4(aP,1.);}`;
const FS=`precision mediump float;varying vec3 wP;varying vec3 wN;varying vec3 col;varying float em;uniform vec3 uEye;void main(){vec3 n=normalize(wN);vec3 l=normalize(vec3(-.4,1.,.65));vec3 view=normalize(uEye-wP);float diffuse=max(0.,dot(n,l));float rim=pow(1.-max(0.,dot(n,view)),3.);float spec=pow(max(0.,dot(n,normalize(l+view))),55.);vec3 c=col*(.3+.7*diffuse)+vec3(.06,.14,.2)*rim+vec3(.36,.46,.5)*spec*.5;c=mix(c,col*1.65,em);float fog=1.-exp(-length(uEye-wP)*.0035);c=mix(c,vec3(.012,.026,.048),fog);c=c/(c+vec3(.7));gl_FragColor=vec4(pow(c,vec3(.82)),1.);}`;
function shader(type,source){let s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s;}
function program(vs,fs){let p=gl.createProgram();gl.attachShader(p,shader(gl.VERTEX_SHADER,vs));gl.attachShader(p,shader(gl.FRAGMENT_SHADER,fs));gl.linkProgram(p);if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(p));return p;}
const prog=program(VS,FS),attrs=['aP','aN','aC','aE'].map(n=>gl.getAttribLocation(prog,n)),uVP=gl.getUniformLocation(prog,'uVP'),uEye=gl.getUniformLocation(prog,'uEye');
const staticData=[],dyn=[];let target=staticData;
function tri(a,b,c,color,em=0){let n=norm(cross(sub(b,a),sub(c,a)));for(let p of[a,b,c])target.push(...p,...n,...color,em);}
function quad(a,b,c,d,color,em=0){tri(a,b,c,color,em);tri(a,c,d,color,em);}
function box(p,s,c,em=0,rot=0){let points=[];for(let y of[-1,1])for(let z of[-1,1])for(let x of[-1,1]){let px=x*s[0]/2,pz=z*s[2]/2;points.push([p[0]+px*Math.cos(rot)+pz*Math.sin(rot),p[1]+y*s[1]/2,p[2]-px*Math.sin(rot)+pz*Math.cos(rot)]);}for(let f of[[0,1,3,2],[4,6,7,5],[0,4,5,1],[2,3,7,6],[0,2,6,4],[1,5,7,3]])quad(...f.map(i=>points[i]),c,em);}
function rod(a,b,r,c,em=0,sides=8,r2=r){let axis=norm(sub(b,a)),u=norm(cross(axis,Math.abs(axis[1])>.95?[1,0,0]:[0,1,0])),w=cross(axis,u);for(let i=0;i<sides;i++){let aa=i/sides*Math.PI*2,bb=(i+1)/sides*Math.PI*2,ra=add(mul(u,Math.cos(aa)),mul(w,Math.sin(aa))),rb=add(mul(u,Math.cos(bb)),mul(w,Math.sin(bb))),p=add(a,mul(ra,r)),q=add(a,mul(rb,r)),rr=add(b,mul(rb,r2)),ss=add(b,mul(ra,r2));quad(p,q,rr,ss,c,em);tri(a,q,p,c,em);tri(b,ss,rr,c,em);}}
function pipe(points,r,c,em=0){for(let i=1;i<points.length;i++)rod(points[i-1],points[i],r,c,em);}
function sphere(p,r,c,em=0){for(let j=0;j<6;j++)for(let i=0;i<10;i++){let get=(a,b)=>[p[0]+r*Math.sin(a)*Math.cos(b),p[1]+r*Math.cos(a),p[2]+r*Math.sin(a)*Math.sin(b)];quad(get(j*Math.PI/6,i*Math.PI/5),get(j*Math.PI/6,(i+1)*Math.PI/5),get((j+1)*Math.PI/6,(i+1)*Math.PI/5),get((j+1)*Math.PI/6,i*Math.PI/5),c,em);}}
const routes=[];function route(points,c,start=0,speed=.16,count=12,r=.075){pipe(points,r*.3,mul(c,.45),.35);routes.push({points,c,start,speed,count,r,lengths:points.slice(1).map((p,i)=>Math.hypot(...sub(p,points[i])))});}
function pointOn(path,t){let total=path.lengths.reduce((a,b)=>a+b,0),d=t*total;for(let i=0;i<path.lengths.length;i++){if(d<=path.lengths[i])return mix(path.points[i],path.points[i+1],d/path.lengths[i]);d-=path.lengths[i];}return path.points[path.points.length-1];}
// Industrial campus: generation, high-voltage delivery, AI hall, cooling and outputs.
box([0,-.36,0],[92,.55,36],palette.floor);
for(let x=-44;x<=44;x+=2)box([x,-.074,0],[.012,.012,34],[.085,.12,.15]);
for(let z=-16;z<=16;z+=2)box([0,-.074,z],[90,.012,.012],[.085,.12,.15]);
// Power station with turbine hall, vessels, piping and fluted exhaust stacks.
box([-34,1.6,-1],[9,3.2,6],palette.steel);box([-34,3.3,-1],[9.4,.25,6.4],palette.edge);
for(let x=-37;x<-30;x+=.42)box([x,1.7,2.025],[.1,2.6,.04],palette.dark);
for(let x of[-36,-33]){rod([x,0,-6],[x,7.2,-6],.7,palette.steel,0,18,.55);rod([x,7.1,-6],[x,7.5,-6],.65,palette.edge,0,18);}
for(let x of[-36.8,-33.8,-30.8]){rod([x,.8,3.7],[x,2.3,3.7],.85,palette.edge,0,16);pipe([[x,2.3,3.7],[x,2.9,3.7],[x,2.9,1]],.12,palette.gold);}
for(let i=0;i<8;i++)box([-38.5+i,2.1,2.06],[.55,.4,.02],palette.cyan,.55);
// Lattice grid pylons and suspended conductors.
function pylon(x){for(let z of[-1.7,1.7]){rod([x-.95,0,z],[x-.26,6.3,z*.35],.07,palette.edge);rod([x+.95,0,z],[x+.26,6.3,z*.35],.07,palette.edge);for(let j=0;j<5;j++){let y=j*1.2;rod([x-.9+y*.1,y,z*(1-y*.09)],[x+.78-y*.1,y+1.2,z*(1-(y+1.2)*.09)],.035,palette.steel);rod([x+.9-y*.1,y,z*(1-y*.09)],[x-.78+y*.1,y+1.2,z*(1-(y+1.2)*.09)],.035,palette.steel);}}rod([x,5.7,-3.1],[x,5.7,3.1],.1,palette.edge);rod([x,6.6,-2.3],[x,6.6,2.3],.085,palette.edge);for(let z of[-2.8,0,2.8])rod([x,5.7,z],[x,5.15,z],.1,palette.dark);}
for(let x of[-26,-18])pylon(x);
for(let z of[-2.8,0,2.8]){let points=[[-30,3,z]];for(let x=-26;x<=-18;x+=.5)points.push([x,5.1-.7*Math.sin((x+26)/8*Math.PI),z]);points.push([-12,2.8,z]);route(points,palette.gold,0,.08,14,.075);}
// Substation, transformer cooling fins, bushings and switchgear.
box([-10,.05,0],[9,.15,10],palette.steel);
for(let z of[-2.5,2.5]){box([-10,1.15,z],[2.9,2,2.5],palette.dark);for(let x=-11.3;x<-8.6;x+=.21)box([x,1.2,z+1.35],[.08,1.7,.4],palette.edge);for(let x of[-10.8,-10,-9.2]){rod([x,2.1,z],[x,3.2,z],.12,palette.white);for(let y=2.2;y<3.1;y+=.15)rod([x,y,z],[x,y+.04,z],.22,palette.steel);}pipe([[-10,3.2,z],[-6.5,3.2,z],[-6.5,.5,z],[-4,.5,z]],.11,palette.gold);}
for(let z=-4;z<=4;z+=2)box([-6.8,1,z],[.65,1.8,1.1],palette.steel);
route([[-12,2.8,0],[-10,2.8,0],[-10,.3,0],[-5,.3,0],[-5,.3,7],[2,.3,7],[2,3.4,7],[18,3.4,7]],palette.gold,7,.12,22,.075);
// Cutaway data center: structural posts, raised floor, overhead busways.
box([10,.16,0],[24,.35,14],palette.steel);box([10,.38,0],[23.4,.08,13.4],palette.dark);
for(let x of[-1,5,11,17,21]){box([x,2.6,-6.6],[.18,4.6,.18],palette.edge);box([x,4.9,0],[.16,.2,13.4],palette.steel);}
box([10,4.9,-6.6],[23,.2,.18],palette.edge);
for(let z of[-4,0,4]){box([10,4.55,z],[23,.12,.42],palette.dark);box([10,4.46,z],[23,.025,.055],palette.cyan,.6);}
const rackCenters=[],chips=[];
for(let z of[-4.2,0,4.2])for(let x=1;x<=19;x+=2){rackCenters.push([x,z]);box([x,1.95,z],[1.25,3,1.45],palette.dark);for(let xx of[x-.61,x+.61])box([xx,1.95,z+.76],[.06,3.1,.06],palette.edge);box([x,3.47,z],[1.3,.1,1.55],palette.edge);
 for(let j=0;j<12;j++){let y=.63+j*.232;box([x,y,z+.72],[1.12,.185,.09],palette.steel);for(let g=0;g<8;g++){let xx=x-.47+g*.135;box([xx,y,z+.782],[.077,.105,.015],palette.dark);chips.push([xx,y,z+.8]);}box([x+.53,y,z+.78],[.028,.045,.022],palette.green,.8);}
 for(let side of[-1,1]){let xx=x+side*.51;pipe([[xx,.5,z-.78],[xx,3.3,z-.78],[xx,3.3,z-1]],.045,side<0?palette.blue:palette.red);}
 rod([x,3.5,z],[x,4.48,z],.035,palette.cyan,.6);
}
// Spine-leaf fabric: two elevated switching spines connect every rack.
for(let z of[-2.1,2.1]){box([10,4.05,z],[16,.16,.32],palette.steel);for(let x=2;x<=18;x+=1)box([x,4.15,z],[.25,.015,.14],palette.cyan,.9);}
for(let [x,z] of rackCenters){let zz=z<0?-2.1:2.1;route([[x,3.5,z],[x,3.9,z],[x,4.05,zz],[10,4.05,zz]],palette.cyan,17,.25,4,.045);}
// Facility cooling loop: CDUs, liquid manifolds, dry cooler radiators and fans.
const fans=[];
for(let x of[3,8,13,18]){box([x,1.1,-11],[3.2,1.5,3.4],palette.steel);for(let k=0;k<12;k++)box([x-1.4+k*.25,1.94,-11],[.065,.07,3],palette.dark);for(let z of[-11.9,-10.2]){rod([x,1.95,z],[x,2.12,z],.66,palette.dark,0,20);fans.push([x,2.15,z]);}}
for(let x of[1,10,19]){box([x,1.4,-7.6],[1.1,2,1],palette.edge);box([x,1.8,-7.075],[.7,.4,.01],palette.cyan,.7);}
const coolingA=[[2,.6,-10],[2,.6,-8.5],[20,.6,-8.5],[20,.6,5],[0,.6,5],[0,.6,-8.5],[2,.6,-8.5],[2,.6,-10]],coolingB=[[18,1,-10],[18,1,-9],[21,1,-9],[21,1,5.5],[-.6,1,5.5],[-.6,1,-9],[18,1,-9],[18,1,-10]];
pipe(coolingA,.11,palette.blue);pipe(coolingB,.11,palette.red);
route(coolingA,palette.cyan,25,.09,25,.09);route(coolingB,palette.red,25,-.09,25,.09);
for(let [x,z]of rackCenters){pipe([[x-.51,.65,z-.78],[x-.51,.65,5]],.045,palette.blue);pipe([[x+.51,1,z-.78],[x+.51,1,5.5]],.045,palette.red);}
// Software layer: translucent-looking physical task plane assembled in motion.
const scheduler=[10,6.3,0];
// Output gallery: tokens, video surface, agent graph, articulated robot.
for(let x of[27,34])for(let z of[-4,3])box([x,.15,z],[5.3,.25,5],palette.steel);
box([27,2.2,-5.4],[4.4,2.5,.18],palette.edge);box([27,2.2,-5.28],[4.1,2.2,.05],palette.dark);
box([34,2.2,-5.4],[4.4,2.5,.18],palette.edge);box([34,2.2,-5.28],[4.1,2.2,.05],palette.dark);
box([27,.5,3],[3,.5,3],palette.dark);
rod([34,.3,3],[34,.75,3],.72,palette.dark,0,20);box([36,.65,3.2],[1.3,.65,1.3],palette.edge);
for(let z of[-4,3])route([[20,3.5,0],[23,3.5,0],[23,1,z],[27,1,z],[34,1,z]],palette.violet,41,.15,12,.08);
// Discreet surface labels, drawn as textures on camera-facing signs.
const signs=[];function sign(text,pos,color='#b9d8ec',scale=1){let c=document.createElement('canvas');c.width=512;c.height=64;let q=c.getContext('2d');q.font='500 30px Arial';q.textAlign='center';q.textBaseline='middle';q.fillStyle=color;q.fillText(L.signs[signs.length],256,32,480);let tex=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,tex);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,c);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);signs.push({pos,tex,scale,text,c,q,color});}
sign('POWER PLANT',[-34,4.3,1],'#ecc17d',1.2);sign('GRID',[-22,7.2,0],'#ecc17d',.8);sign('SUBSTATION',[-10,4.3,0],'#ecc17d',1.1);sign('GPU CLUSTER',[10,5.3,0],'#8cdfff',1.3);sign('HEAT REJECTION',[10,3.1,-11],'#f6a18e',1.2);sign('TEXT TOKENS',[27,4,-4],'#c6bdff',.9);sign('GENERATED VIDEO',[34,4,-4],'#c6bdff',1);sign('AI AGENTS',[27,3.9,3],'#c6bdff',.9);sign('ROBOT ACTIONS',[34,4,3],'#c6bdff',1);sign('SCHEDULER',[10,7.2,0],'#c6bdff',1);
function refreshSigns(){for(let i=0;i<signs.length;i++){const s=signs[i];s.q.clearRect(0,0,512,64);s.q.fillStyle=s.color;s.q.fillText(L.signs[i],256,32,480);gl.bindTexture(gl.TEXTURE_2D,s.tex);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,s.c);}}
const staticBuf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,staticBuf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(staticData),gl.STATIC_DRAW);const dynBuf=gl.createBuffer();
const textProg=program(`attribute vec3 aP;attribute vec2 aUV;uniform mat4 uVP;varying vec2 uv;void main(){uv=aUV;gl_Position=uVP*vec4(aP,1.);}`,`precision mediump float;varying vec2 uv;uniform sampler2D tex;void main(){vec4 c=texture2D(tex,uv);if(c.a<.01)discard;gl_FragColor=c;}`),textBuf=gl.createBuffer(),taP=gl.getAttribLocation(textProg,'aP'),taUV=gl.getAttribLocation(textProg,'aUV'),tuVP=gl.getUniformLocation(textProg,'uVP');
function matMult(a,b){let o=new Float32Array(16);for(let c=0;c<4;c++)for(let r=0;r<4;r++)for(let k=0;k<4;k++)o[c*4+r]+=a[k*4+r]*b[c*4+k];return o;}
function viewProjection(eye,look,aspect){let z=norm(sub(eye,look)),x=norm(cross([0,1,0],z)),y=cross(z,x),view=[x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-dot(x,eye),-dot(y,eye),-dot(z,eye),1],f=1/Math.tan(46*Math.PI/360),near=.1,far=240,proj=[f/aspect,0,0,0,0,f,0,0,0,0,(far+near)/(near-far),-1,0,0,2*far*near/(near-far),0];return {vp:matMult(proj,view),right:x,up:y};}
const scenes=[
{k:'ELECTRICITY',title:'The factory starts with power.',sub:'Generation supplies the grid.',a:[-44,13,19],b:[-23,10,17],lookA:[-33,2,0],lookB:[-22,2.5,0]},
{k:'DELIVERABLE POWER',title:'Power must reach the rack.',sub:'Grid connection → substation → transformers → distribution.',a:[-22,11,17],b:[-4,8,14],lookA:[-12,1.5,0],lookB:[-5,1.6,0]},
{k:'GPU COMPUTE',title:'A connected compute factory.',sub:'Thousands of GPUs work together through a high-speed fabric.',a:[29,16,22],b:[11,6.6,10],lookA:[10,1.5,0],lookB:[9,1.8,0]},
{k:'LIQUID COOLING',title:'Computation becomes heat.',sub:'Liquid carries heat away from GPUs. Cooling rejects it outside.',a:[15,12,-22],b:[3,7,-17],lookA:[10,1,-4],lookB:[7,1.6,-8]},
{k:'ORCHESTRATION',title:'Software turns capacity into work.',sub:'The scheduler places jobs; the fabric coordinates the cluster.',a:[23,15,17],b:[14,12,16],lookA:[10,3.3,0],lookB:[10,3.5,0]},
{k:'USEFUL AI OUTPUT',title:'Tokens. Video. Agents. Actions.',sub:'Computation creates outputs people and machines can use.',a:[39,12,18],b:[27,8,14],lookA:[30,1.5,-1],lookB:[30,1.7,-1]},
{k:'ECONOMIC VALUE',title:'Useful output earns revenue.',sub:'When customers pay for useful results, computation becomes a business.',a:[32,16,26],b:[-1,28,44],lookA:[27,2,0],lookB:[4,1,0]},
{k:'THE VALUE CHAIN',title:'The product is useful computation.',sub:'MW and GPUs are inputs.',a:[-1,28,44],b:[-4,33,49],lookA:[2,1,0],lookB:[0,1,0]}
];
let time=0,playing=!matchMedia('(prefers-reduced-motion: reduce)').matches,last=performance.now(),lastChapter=-1;
const play=root.querySelector('.af-play'),replay=root.querySelector('.af-replay'),scrub=root.querySelector('.af-scrub'),clock=root.querySelector('.af-time');play.textContent=playing?L.pause:L.play;
play.onclick=()=>{if(time>=64)time=0;playing=!playing;play.textContent=playing?L.pause:L.play;};replay.onclick=()=>{time=0;playing=true;play.textContent=L.pause;};scrub.oninput=()=>{time=Number(scrub.value);render(time);};
function drawMesh(buffer,count,vp,eye){gl.useProgram(prog);gl.uniformMatrix4fv(uVP,false,vp);gl.uniform3fv(uEye,eye);gl.bindBuffer(gl.ARRAY_BUFFER,buffer);for(let i=0;i<4;i++){gl.enableVertexAttribArray(attrs[i]);gl.vertexAttribPointer(attrs[i],i===3?1:3,gl.FLOAT,false,40,[0,12,24,36][i]);}gl.drawArrays(gl.TRIANGLES,0,count);for(let a of attrs)gl.disableVertexAttribArray(a);}
function drawSigns(vp,right,up,t,eye){gl.useProgram(textProg);gl.uniformMatrix4fv(tuVP,false,vp);gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.depthMask(false);gl.bindBuffer(gl.ARRAY_BUFFER,textBuf);gl.enableVertexAttribArray(taP);gl.enableVertexAttribArray(taUV);gl.vertexAttribPointer(taP,3,gl.FLOAT,false,20,0);gl.vertexAttribPointer(taUV,2,gl.FLOAT,false,20,12);
for(let s of signs){if(s.text==='SCHEDULER'&&(t<32||t>40))continue;if(s.text==='GPU CLUSTER'&&t>=32&&t<40)continue;let distance=Math.hypot(...sub(s.pos,eye));if(distance>41)continue;let w=2.7*s.scale,h=.35*s.scale,data=[];for(let [xx,yy,uu,vv]of[[-1,-1,0,1],[1,-1,1,1],[1,1,1,0],[-1,-1,0,1],[1,1,1,0],[-1,1,0,0]])data.push(...add(s.pos,add(mul(right,xx*w),mul(up,yy*h))),uu,vv);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.DYNAMIC_DRAW);gl.bindTexture(gl.TEXTURE_2D,s.tex);gl.drawArrays(gl.TRIANGLES,0,6);}
gl.disableVertexAttribArray(taP);gl.disableVertexAttribArray(taUV);gl.depthMask(true);gl.disable(gl.BLEND);}
function render(t){let chapter=Math.min(7,Math.floor(t/8)),s=scenes[chapter],u=smooth(Math.min(1,(t-chapter*8)/8)),eye=mix(s.a,s.b,u),look=mix(s.lookA,s.lookB,u);if(chapter>0){let transition=smooth(Math.min(1,(t-chapter*8)/1.5));eye=mix(scenes[chapter-1].b,eye,transition);look=mix(scenes[chapter-1].lookB,look,transition);}if(canvas.clientWidth<480){eye=add(look,mul(sub(eye,look),1.55));}eye[0]+=.18*Math.sin(t*.35);let {vp,right,up}=viewProjection(eye,look,canvas.width/canvas.height);
gl.viewport(0,0,canvas.width,canvas.height);gl.clearColor(.012,.025,.045,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.enable(gl.DEPTH_TEST);gl.disable(gl.CULL_FACE);drawMesh(staticBuf,staticData.length/10,vp,eye);
target=dyn;dyn.length=0;
for(let p of routes){if(t<p.start)continue;for(let i=0;i<p.count;i++){let phase=((t-p.start)*p.speed+i/p.count)%1;if(phase<0)phase+=1;let pos=pointOn(p,phase);box(pos,[p.r*1.7,p.r*1.7,p.r*1.7],p.c,1);}}
// Activity is illustrative, not a utilization benchmark.
if(t>=16)for(let i=0;i<chips.length;i++){if((i+Math.floor(t*6))%7<2)box(chips[i],[.06,.05,.025],palette.cyan,1);}
for(let p of fans){sphere(p,.14,palette.edge);for(let i=0;i<3;i++){let a=t*3+i*Math.PI*2/3;box([p[0]+.27*Math.cos(a),p[1],p[2]+.27*Math.sin(a)],[.62,.045,.15],palette.edge,0,-a);}}
if(t>=24){for(let i=0;i<40;i++){let phase=(t*.28+i*.037)%1;box([2+(i%4)*5+Math.sin(i)*.25,2.4+phase*3.2,-11+(i%3-1)*.6],[.018,.25,.018],mul(palette.red,1-phase*.75),.9);}}
if(t>=32&&t<41){for(let i=0;i<20;i++){let x=6+(i%5)*2,z=-2+Math.floor(i/5)*1.3,y=6.25;box([x,y,z],[1.4,.035,.75],palette.violet,.5);let id=(i*7)%rackCenters.length,[rx,rz]=rackCenters[id],p=(t*.6+i*.13)%1;box(mix([x,y,z],[rx,3.6,rz],p),[.18,.18,.18],palette.violet,1);pipe([[x,y,z],[rx,3.6,rz]],.009,mul(palette.violet,.5),.2);}}
if(t>=40){let tt=t-40;for(let row=0;row<5;row++)for(let col=0;col<6;col++){let k=row*6+col;if(k<tt*6%34)box([25.4+col*.55,2.9-row*.34,-5.22],[.38+((k*3)%4)*.025,.09,.025],row%2?palette.cyan:palette.violet,.8);}
// Procedural video: a moving luminous sun above animated terrain.
sphere([34.6+Math.sin(tt*.3)*.65,2.7,-5.11],.33,palette.gold,.85);for(let i=0;i<25;i++){let x=32.1+i*.16,y=1.2+.5*(Math.sin(i*.32+tt*.35)+1);box([x,1.15+y*.3,-5.15],[.15,y*.6,.03],i%2?palette.violet:palette.blue,.5);}
let nodes=[[26,1.4,2],[28,1.4,2],[27,2.7,3],[26,1.4,4],[28,1.4,4]];for(let i=0;i<nodes.length;i++){sphere(nodes[i],.19,palette.violet,.8);for(let j=i+1;j<nodes.length;j++)if((i+j)%2)pipe([nodes[i],nodes[j]],.025,palette.cyan,.6);}sphere(mix(nodes[0],nodes[2],(tt*.6)%1),.085,palette.white,1);
}
// Robot's end effector follows a repeatable pick-and-place arc.
let armT=Math.max(0,t-40),angle=Math.sin(armT*.8)*.55,shoulder=[34,1,3],elbow=[34+Math.sin(angle)*1.15,2.25,3],hand=[35.05+Math.sin(armT*.8)*.55,1.6+.35*Math.cos(armT*1.6),3];rod(shoulder,elbow,.22,palette.white,0,12);rod(elbow,hand,.15,palette.white,0,12);sphere(shoulder,.3,palette.dark);sphere(elbow,.25,palette.dark);sphere(hand,.17,palette.dark);for(let dx of[-.13,.13])rod(add(hand,[dx,0,0]),add(hand,[dx,-.3,0]),.045,palette.edge);if(t>40)box(add(hand,[0,-.25,0]),[.22,.22,.22],palette.gold,.35);
if(t>=48){for(let i=0;i<12;i++){let ph=(t*.25+i*.08)%1;box([37+ph*5,.4+ph*3,-1],[.14,.14,.14],palette.gold,1);}for(let i=0;i<5;i++)box([39+i*.6,.3+i*.25,-1],[.4,.3+i*.5,.4],palette.gold,.45);}
gl.bindBuffer(gl.ARRAY_BUFFER,dynBuf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(dyn),gl.DYNAMIC_DRAW);drawMesh(dynBuf,dyn.length/10,vp,eye);drawSigns(vp,right,up,t,eye);
if(chapter!==lastChapter){lastChapter=chapter;root.querySelector('.af-index').textContent=String(chapter+1).padStart(2,'0')+' / 08';root.querySelector('.af-kicker').textContent=String(chapter+1).padStart(2,'0')+' · '+L.scenes[chapter][0];root.querySelector('.af-title').textContent=L.scenes[chapter][1];root.querySelector('.af-sub').textContent=L.scenes[chapter][2];root.querySelector('.af-caption').hidden=chapter===7;root.querySelector('.af-end').hidden=chapter!==7;}
scrub.value=t;clock.textContent=Math.floor(t/60)+':'+String(Math.floor(t%60)).padStart(2,'0')+' / 1:04';root.dataset.time=t.toFixed(2);root.dataset.chapter=String(chapter);target=staticData;
}
function resize(){let dpr=Math.min(devicePixelRatio||1,1.75);canvas.width=Math.round(canvas.clientWidth*dpr);canvas.height=Math.round(canvas.clientHeight*dpr);render(time);}
new ResizeObserver(resize).observe(canvas);resize();
function tick(now){let dt=Math.min(.08,(now-last)/1000);last=now;if(playing&&!document.hidden){time=Math.min(64,time+dt);render(time);if(time>=64){playing=false;play.textContent=L.play;}}requestAnimationFrame(tick);}requestAnimationFrame(tick);
root.factory={isPlaying:()=>playing,refreshLanguage:()=>{refreshSigns();lastChapter=-1;render(time);},seek:t=>{time=Math.max(0,Math.min(64,t));render(time);},pause:()=>{playing=false;play.textContent=L.play;},play:()=>{playing=true;play.textContent=L.pause;},duration:64};localizePage();
})();
