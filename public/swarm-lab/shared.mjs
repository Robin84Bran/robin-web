export const VERSION='1.0.0';
export const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
export const mean=a=>a.reduce((x,y)=>x+y,0)/a.length;
export function rng(seed=1){let s=seed>>>0;return()=>{s+=0x6D2B79F5;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};}
export function weighted(values,weights,u){const target=u*weights.reduce((a,b)=>a+b,0);let sum=0;for(let i=0;i<weights.length;i++){sum+=weights[i];if(target<sum)return values[i];}return values.at(-1);}
export function checked(p,key,fallback,min,max){const x=Number(p[key]??fallback);if(!Number.isFinite(x)||x<min||x>max)throw new RangeError(key);return x;}
export function seedOf(p){return Math.floor(checked(p,'seed',24,0,4294967295));}
export function snapshot(x){return JSON.parse(JSON.stringify(x));}
export function stats(values){const a=[...values].sort((x,y)=>x-y);const q=p=>a[Math.floor((a.length-1)*p)];return {n:a.length,mean:mean(a),min:a[0],p10:q(.1),median:q(.5),p90:q(.9),max:a.at(-1)};}
