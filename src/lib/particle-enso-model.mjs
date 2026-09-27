const TAU=Math.PI*2,N=1000,cycle=40,colors=['#766248','#a78350','#c29b93','#8e8778'];
const clamp=x=>Math.max(0,Math.min(1,x)),ease=x=>{x=clamp(x);return x*x*x*(x*(x*6-15)+10);},lerp=(a,b,t)=>a+(b-a)*t;
const random=n=>{const x=Math.sin(n*127.1+93.7)*43758.5453123;return x-Math.floor(x);};
const particles=Array.from({length:N},(_,i)=>({u:i/N,a:random(i+1),b:random(i+2048),c:random(i+4096)}));
function state(t){const p=Math.floor(t/10)%4,local=t%10;const coherence=local<2?ease(local/2):local<6.5?1:1-ease((local-6.5)/3.5);return{p,local,coherence};}
// A conceptual ROV: pressure hull, optical port, outboard thrusters,
// articulated manipulator, landing skids, and a flowing umbilical.
function segment(u, points) {
 const lengths=points.slice(1).map((p,i)=>Math.hypot(p[0]-points[i][0],p[1]-points[i][1]));
 let d=u*lengths.reduce((a,b)=>a+b,0),i=0;
 while(i<lengths.length-1&&d>lengths[i]){d-=lengths[i];i++;}
 const f=d/lengths[i];return[lerp(points[i][0],points[i+1][0],f),lerp(points[i][1],points[i+1][1],f)];
}
function subseaRobot(s,t){
 let u=s.u,x,y; const jitter=(s.a-.5)*4;
 if(u<.28){const a=u/.28*TAU; x=79*Math.cos(a);y=-8+40*Math.sin(a);}
 else if(u<.51){const v=(u-.28)/.23,side=v<.5?-1:1,a=(v% .5)*2*TAU; x=side*111+24*Math.cos(a);y=-5+24*Math.sin(a);}
 else if(u<.60){const a=(u-.51)/.09*TAU;x=25+19*Math.cos(a);y=-8+19*Math.sin(a);}
 else if(u<.67){const a=(u-.60)/.07*TAU;x=25+8*Math.cos(a);y=-8+8*Math.sin(a);}
 else if(u<.79){[x,y]=segment((u-.67)/.12,[[44,27],[68,58],[35,91],[54,116],[78,103],[63,91],[54,116],[43,134]]);}
 else if(u<.87){[x,y]=segment((u-.79)/.08,[[-63,25],[-84,58],[-27,62],[11,60]]);}
 else if(u<.94){const v=(u-.87)/.07; x=-29-43*Math.sin(v*5)+v*13;y=-47-v*104;}
 else {const v=(u-.94)/.06,side=v<.5?-1:1,a=(v% .5)*2*TAU+t*.5;const r=18*(.3+.7*s.b);x=side*111+r*Math.cos(a);y=-5+r*Math.sin(a);}
 return[x+jitter,y+jitter*.6+2*Math.sin(t*.4)];
}
function target(p,s,t,local){const angle=s.u*TAU,band=(s.a-.5)*11,phase=t/cycle*TAU;let x,y;
 if(p===0){[x,y]=subseaRobot(s,t);}
 else if(p===1){const a=angle+t*.07,w=1+.035*Math.sin(phase),off=(s.a-.5)*19;x=(143+off)*Math.sin(a)*w;y=(65+off*.9)*Math.sin(2*a)+off*Math.cos(a);const tilt=-.20;[x,y]=[x*Math.cos(tilt)-y*Math.sin(tilt),x*Math.sin(tilt)+y*Math.cos(tilt)];}
 else if(p===2){if(s.u<.13){const a=s.u/.13*TAU,r=5+Math.sqrt(s.a)*11;x=r*Math.cos(a);y=r*Math.sin(a);}else{const u=(s.u-.13)/.87,a=-1.4+u*TAU*1.65,r=20+128*Math.pow(u,.88),growth=.82+.18*ease((local-1.4)/2.5);x=(r+band*.6)*Math.cos(a)*growth;y=(r+band*.6)*Math.sin(a)*growth;}}
 else{const a=angle,r=43*(Math.exp(Math.cos(a))-2*Math.cos(4*a)-Math.pow(Math.sin(a/12),5));x=(r+band*.7)*Math.sin(a);y=-(r+band*.7)*Math.cos(a)*.91;const opening=.94+.06*Math.sin(local*.65);x*=opening;y+=22;}
 return[x,y];}
function cloud(s,t){const phase=t/cycle*TAU,a=s.u*TAU+.28*Math.sin(phase+s.b*TAU),r=112+66*s.a+21*Math.sin(phase*2+s.c*TAU);return[r*Math.cos(a)+14*Math.sin(phase+s.c*TAU),r*Math.sin(a)+14*Math.cos(phase+s.b*TAU)];}
export { N, cycle, colors, particles, state, target, cloud, lerp };
