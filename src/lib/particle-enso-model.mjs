const TAU=Math.PI*2,N=1000,cycle=40,colors=['#766248','#a78350','#c29b93','#8e8778'];
const clamp=x=>Math.max(0,Math.min(1,x)),ease=x=>{x=clamp(x);return x*x*x*(x*(x*6-15)+10);},lerp=(a,b,t)=>a+(b-a)*t;
const random=n=>{const x=Math.sin(n*127.1+93.7)*43758.5453123;return x-Math.floor(x);};
const particles=Array.from({length:N},(_,i)=>({u:i/N,a:random(i+1),b:random(i+2048),c:random(i+4096)}));
function state(t){const p=Math.floor(t/10)%4,local=t%10;const coherence=local<2?ease(local/2):local<6.5?1:1-ease((local-6.5)/3.5);return{p,local,coherence};}
// Sample the same closed rounded pipeline continuously, including all four bends.
function pipeline(u,offset){const hw=126+offset,hh=93+offset,r=29,a=hw-r,b=hh-r;const parts=[2*a,Math.PI*r/2,2*b,Math.PI*r/2,2*a,Math.PI*r/2,2*b,Math.PI*r/2],total=parts.reduce((a,b)=>a+b,0);let d=(u%1)*total,j=0;while(j<7&&d>parts[j]){d-=parts[j];j++;}const f=d/parts[j];switch(j){case 0:return[-a+2*a*f,-hh];case 1:return[a+r*Math.cos(-Math.PI/2+f*Math.PI/2),-b+r*Math.sin(-Math.PI/2+f*Math.PI/2)];case 2:return[hw,-b+2*b*f];case 3:return[a+r*Math.cos(f*Math.PI/2),b+r*Math.sin(f*Math.PI/2)];case 4:return[a-2*a*f,hh];case 5:return[-a+r*Math.cos(Math.PI/2+f*Math.PI/2),b+r*Math.sin(Math.PI/2+f*Math.PI/2)];case 6:return[-hw,b-2*b*f];default:return[-a+r*Math.cos(Math.PI+f*Math.PI/2),-b+r*Math.sin(Math.PI+f*Math.PI/2)];}}
function target(p,s,t,local){const angle=s.u*TAU,band=(s.a-.5)*11,phase=t/cycle*TAU;let x,y;
 if(p===0){[x,y]=pipeline(s.u+t*.023,band);}
 else if(p===1){const a=angle+t*.07,w=1+.035*Math.sin(phase),off=(s.a-.5)*19;x=(143+off)*Math.sin(a)*w;y=(65+off*.9)*Math.sin(2*a)+off*Math.cos(a);const tilt=-.20;[x,y]=[x*Math.cos(tilt)-y*Math.sin(tilt),x*Math.sin(tilt)+y*Math.cos(tilt)];}
 else if(p===2){if(s.u<.13){const a=s.u/.13*TAU,r=5+Math.sqrt(s.a)*11;x=r*Math.cos(a);y=r*Math.sin(a);}else{const u=(s.u-.13)/.87,a=-1.4+u*TAU*1.65,r=20+128*Math.pow(u,.88),growth=.82+.18*ease((local-1.4)/2.5);x=(r+band*.6)*Math.cos(a)*growth;y=(r+band*.6)*Math.sin(a)*growth;}}
 else{const a=angle,r=43*(Math.exp(Math.cos(a))-2*Math.cos(4*a)-Math.pow(Math.sin(a/12),5));x=(r+band*.7)*Math.sin(a);y=-(r+band*.7)*Math.cos(a)*.91;const opening=.94+.06*Math.sin(local*.65);x*=opening;y+=22;}
 return[x,y];}
function cloud(s,t){const phase=t/cycle*TAU,a=s.u*TAU+.28*Math.sin(phase+s.b*TAU),r=112+66*s.a+21*Math.sin(phase*2+s.c*TAU);return[r*Math.cos(a)+14*Math.sin(phase+s.c*TAU),r*Math.sin(a)+14*Math.cos(phase+s.b*TAU)];}
export { N, cycle, colors, particles, state, target, cloud, lerp };
