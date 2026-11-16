export const VERSION='1.0.0';
export const POLICY_IDS=Object.freeze(['finish','restart','checkpoint','random']);
export const POLICY_LABELS=Object.freeze({finish:'Finish first',restart:'Drop and restart',checkpoint:'Checkpoint and return',random:'Coin flip'});
export const DEFAULTS=Object.freeze({steps:180,interruptRate:12,normalWork:9,urgentWork:3,urgentWindow:7,checkpointCost:1,normalValue:9,urgentValue:16});

function integer(name,value,min,max){if(!Number.isInteger(value)||value<min||value>max)throw new RangeError(`${name} must be an integer from ${min} to ${max}`);return value;}
export function normalizeConfig(input={}){const c={...DEFAULTS,...input};integer('steps',c.steps,20,2000);integer('interruptRate',c.interruptRate,0,100);integer('normalWork',c.normalWork,2,40);integer('urgentWork',c.urgentWork,1,20);integer('urgentWindow',c.urgentWindow,1,60);integer('checkpointCost',c.checkpointCost,0,12);integer('normalValue',c.normalValue,1,100);integer('urgentValue',c.urgentValue,1,200);return c;}
function mix32(value){let x=value>>>0;x^=x>>>16;x=Math.imul(x,0x7feb352d);x^=x>>>15;x=Math.imul(x,0x846ca68b);x^=x>>>16;return(x^x>>>16)>>>0;}
function saltHash(text){let x=2166136261;for(const char of text)x=Math.imul(x^char.charCodeAt(0),16777619);return x>>>0;}
export function draw(seed,tick,index,salt){return mix32((seed>>>0)^Math.imul(tick+1,0x9e3779b1)^Math.imul(index+17,0x85ebca6b)^saltHash(salt))/0x100000000;}
export function makeArrivalTrace(input=DEFAULTS,seed=1){const c=normalizeConfig(input);integer('seed',seed,0,0xffffffff);return Array.from({length:c.steps},(_,tick)=>draw(seed,tick,0,'urgent-arrival')*100<c.interruptRate);}
const normalJob=c=>({kind:'normal',remaining:c.normalWork,progress:0});

function runPolicy(policy,arrivals,c,seed,includeFrames){
 const s={actionBudget:0,arrivals:0,normalCompleted:0,urgentCompleted:0,urgentExpired:0,usefulValue:0,discardedWork:0,checkpointActions:0,unfinishedWork:0,maxUrgentQueue:0};
 const frames=[];let current=normalJob(c),saved=null,saving=0,urgentId=0;let queue=[];
 const resume=()=>{if(queue.length)return queue.shift();if(saved){const job=saved;saved=null;return job;}return normalJob(c);};
 const expire=(tick)=>{
  const kept=[];for(const job of queue){if(job.deadline<=tick)s.urgentExpired+=1;else kept.push(job);}queue=kept;
  if(current?.kind==='urgent'&&current.deadline<=tick){s.urgentExpired+=1;s.discardedWork+=current.progress;current=resume();}
 };
 for(let tick=0;tick<c.steps;tick+=1){
  if(arrivals[tick]){queue.push({kind:'urgent',remaining:c.urgentWork,progress:0,deadline:tick+c.urgentWindow,id:urgentId++});s.arrivals+=1;}
  expire(tick);s.maxUrgentQueue=Math.max(s.maxUrgentQueue,queue.length+(current?.kind==='urgent'?1:0));
  if(saving>0){saving-=1;s.checkpointActions+=1;s.actionBudget+=1;if(saving===0)current=resume();if(includeFrames)frames.push({tick,...s,queue:queue.length,current:current?.kind??'saving'});continue;}
  if(!current)current=resume();
  if(current.kind==='normal'&&queue.length){
   const preempt=policy==='restart'||policy==='checkpoint'||(policy==='random'&&draw(seed,tick,queue[0].id,'coin-flip')<.5);
   if(preempt){
    if(policy==='checkpoint'&&current.progress>0){saved=current;if(c.checkpointCost>0){current=null;saving=c.checkpointCost-1;s.checkpointActions+=1;s.actionBudget+=1;if(saving===0)current=resume();if(includeFrames)frames.push({tick,...s,queue:queue.length,current:current?.kind??'saving'});continue;}}
    else{s.discardedWork+=current.progress;saved=null;}
    current=queue.shift();
   }
  }
  current.remaining-=1;current.progress+=1;s.actionBudget+=1;
  if(current.remaining===0){
   if(current.kind==='urgent'){s.urgentCompleted+=1;s.usefulValue+=c.urgentValue;}
   else{s.normalCompleted+=1;s.usefulValue+=c.normalValue;}
   current=resume();
  }
  if(includeFrames)frames.push({tick,...s,queue:queue.length,current:current?.kind??'none'});
 }
 s.unfinishedWork=(current?.progress??0)+(saved?.progress??0);
 return {summary:s,frames};
}

export function simulateWorld(input=DEFAULTS,seed=1,includeFrames=true){const config=normalizeConfig(input);integer('seed',seed,0,0xffffffff);const arrivals=makeArrivalTrace(config,seed);const policies={};for(const id of POLICY_IDS)policies[id]=runPolicy(id,arrivals,config,seed,includeFrames);return{version:VERSION,seed,config,arrivalTicks:arrivals.flatMap((hit,tick)=>hit?[tick]:[]),policies};}
