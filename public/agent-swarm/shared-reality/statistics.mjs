/** Descriptive two-sided Student-t intervals. Missing observations remain missing. */
const t95 = [null,12.706,4.303,3.182,2.776,2.571,2.447,2.365,2.306,2.262,2.228,2.201,2.179,2.160,2.145,2.131,2.120,2.110,2.101,2.093,2.086,2.080,2.074,2.069];
export function stats(values) {
 const xs=values.filter(Number.isFinite),n=xs.length;
 if(!n)return {n:0,mean:null,sd:null,min:null,max:null,ci95:[null,null]};
 const mean=xs.reduce((s,x)=>s+x,0)/n,sd=n>1?Math.sqrt(xs.reduce((s,x)=>s+(x-mean)**2,0)/(n-1)):null;
 const critical=n>1?t95[Math.min(n-1,23)]:null;
 return {n,mean,sd,min:Math.min(...xs),max:Math.max(...xs),ci95:n>1?[mean-critical*sd/Math.sqrt(n),mean+critical*sd/Math.sqrt(n)]:[null,null]};
}
export function pairedStats(pairs){return stats(pairs.filter(([left,right])=>Number.isFinite(left)&&Number.isFinite(right)).map(([left,right])=>left-right));}
