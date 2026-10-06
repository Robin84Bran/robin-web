export const VERSION='1.0.0';
export const POLICIES=['once','retry','random','keyed'];
export const LABELS={once:'Send once',retry:'Retry oldest',random:'Random retry',keyed:'Retry + key'};
export const DEFAULTS=Object.freeze({seed:1,jobs:18,horizon:80,budget:60,requestLoss:.2,ackLoss:.4,delay:6,timeout:8,retention:0,resetAt:0});
function bounded(x,lo,hi,name){if(!Number.isFinite(x)||x<lo||x>hi)throw new RangeError(name);return x;}
export function config(input={}){const c={...DEFAULTS,...input};for(const [k,lo,hi] of [['seed',0,4294967295],['jobs',1,40],['horizon',1,200],['budget',0,200],['delay',1,20],['timeout',1,40],['retention',0,200],['resetAt',0,200]]){bounded(c[k],lo,hi,k);if(!Number.isInteger(c[k]))throw new RangeError(k);}for(const k of ['requestLoss','ackLoss'])bounded(c[k],0,1,k);return c;}
// Stateless integer hash: policy order and playback never consume world randomness.
export function draw(seed,job,attempt,channel){let x=(seed^Math.imul(job+1,0x9e3779b1)^Math.imul(attempt+1,0x85ebca6b)^Math.imul(channel+1,0xc2b2ae35))>>>0;x=Math.imul(x^(x>>>16),0x7feb352d);x=Math.imul(x^(x>>>15),0x846ca68b);return ((x^(x>>>16))>>>0)/4294967296;}
// Deliberately has no access to effects, in-flight packets, or receiver keys.
export function choose(policy,local,t,c){const eligible=local.map((s,id)=>({id,...s})).filter(s=>!s.acked&&(s.sent===0||(policy!=='once'&&t-s.last>=c.timeout)));if(!eligible.length)return null;const fresh=eligible.filter(s=>s.sent===0);const pool=fresh.length?fresh:eligible;if(policy==='random')return pool[Math.floor(draw(c.seed,t,0,9)*pool.length)].id;pool.sort((a,b)=>a.last-b.last||a.id-b.id);return pool[0].id;}
export function simulate(input={},policy='retry'){
 if(!POLICIES.includes(policy))throw new RangeError('policy');const c=config(input),local=Array.from({length:c.jobs},()=>({sent:0,last:-1,acked:false})),effects=Array(c.jobs).fill(0),keys=new Map(),pending=[],frames=[];let credits=0,attempts=0,suppressed=0;
 const totalTicks=c.horizon+2*c.delay;
 function snapshot(t,events){const delivered=effects.filter(x=>x>0).length,executions=effects.reduce((a,b)=>a+b,0);return {tick:t,delivered,duplicates:executions-delivered,confirmed:local.filter(x=>x.acked).length,missed:c.jobs-delivered,credits,attempts,suppressed,effects:[...effects],acked:local.map(x=>x.acked),events};}
 frames.push(snapshot(0,[]));
 for(let t=1;t<=totalTicks;t++){
  const events=[];
  if(t===c.resetAt){keys.clear();events.push({type:'ledger-reset'});}
  for(const [key,expiry] of keys)if(expiry<=t)keys.delete(key);
  const due=pending.filter(p=>p.at===t);
  for(const packet of due){const {id,n}=packet;if(packet.type==='ack'){local[id].acked=true;events.push({type:'ack',id});continue;}
   const duplicate=effects[id]>0;
   if(policy==='keyed'&&keys.has(id)){suppressed++;events.push({type:'suppressed',id});}
   else{effects[id]++;if(policy==='keyed')keys.set(id,c.retention===0?Infinity:t+c.retention);events.push({type:duplicate?'duplicate':'delivered',id});}
   if(draw(c.seed,id,n,1)>=c.ackLoss)pending.push({type:'ack',id,n,at:t+1+Math.floor(draw(c.seed,id,n,3)*c.delay)});
   else events.push({type:'ack-lost',id});
  }
  // One dispatch opportunity per tick, all policies subject to the same ceiling.
  const cost=policy==='keyed'?2:1;
  if(t<=c.horizon&&credits+cost<=c.budget){const id=choose(policy,local,t,c);if(id!==null){const n=local[id].sent++;local[id].last=t;credits+=cost;attempts++;events.push({type:'send',id});if(draw(c.seed,id,n,0)>=c.requestLoss)pending.push({type:'request',id,n,at:t+1+Math.floor(draw(c.seed,id,n,2)*c.delay)});else events.push({type:'request-lost',id});}}
  frames.push(snapshot(t,events));
 }
 return {version:VERSION,policy,config:c,frames,summary:frames.at(-1)};
}
export function compare(input={}){return POLICIES.map(p=>simulate(input,p));}
