export const VERSION='1.0.0';
export const POLICY_IDS=Object.freeze(['stay','always','threshold','random']);
export const POLICY_LABELS=Object.freeze({stay:'Stay in lane',always:'Always help',threshold:'Help a long queue',random:'Pick a queue'});
export const DEFAULTS=Object.freeze({steps:240,workers:4,arrivalRate:58,imbalance:75,jobWork:5,deadlineWindow:24,handoffCost:1,helpThreshold:3,jobValue:10});

function integer(name,value,min,max){if(!Number.isInteger(value)||value<min||value>max)throw new RangeError(`${name} must be an integer from ${min} to ${max}`);return value;}
export function normalizeConfig(input={}){const c={...DEFAULTS,...input};integer('steps',c.steps,40,2000);integer('workers',c.workers,2,8);integer('arrivalRate',c.arrivalRate,0,100);integer('imbalance',c.imbalance,0,100);integer('jobWork',c.jobWork,1,30);integer('deadlineWindow',c.deadlineWindow,2,200);integer('handoffCost',c.handoffCost,0,12);integer('helpThreshold',c.helpThreshold,1,20);integer('jobValue',c.jobValue,1,100);return c;}
function mix32(value){let x=value>>>0;x^=x>>>16;x=Math.imul(x,0x7feb352d);x^=x>>>15;x=Math.imul(x,0x846ca68b);x^=x>>>16;return(x^x>>>16)>>>0;}
function saltHash(text){let x=2166136261;for(const char of text)x=Math.imul(x^char.charCodeAt(0),16777619);return x>>>0;}
export function draw(seed,tick,index,salt){return mix32((seed>>>0)^Math.imul(tick+1,0x9e3779b1)^Math.imul(index+17,0x85ebca6b)^saltHash(salt))/0x100000000;}

export function makeArrivalTrace(input=DEFAULTS,seed=1){
 const c=normalizeConfig(input);integer('seed',seed,0,0xffffffff);const jobs=[];let id=0;const hotspot=Math.floor(draw(seed,0,1,'hotspot')*c.workers);
 for(let tick=0;tick<c.steps;tick+=1){
  if(draw(seed,tick,0,'arrival')*100>=c.arrivalRate)continue;
  const worker=draw(seed,tick,2,'skew')*100<c.imbalance?hotspot:Math.floor(draw(seed,tick,3,'worker')*c.workers);
  jobs.push({id:id++,arrival:tick,owner:worker,work:c.jobWork,deadline:tick+c.deadlineWindow,value:c.jobValue});
 }
 return jobs;
}

function runPolicy(policy,trace,c,seed,includeFrames){
 const workers=Array.from({length:c.workers},(_,id)=>({id,queue:[],current:null,transferLeft:0}));
 const s={actionBudget:c.steps*c.workers,arrivals:trace.length,completed:0,completedValue:0,expired:0,transferActions:0,transfers:0,workActions:0,idleActions:0,maxBacklog:0,unfinished:0};
 const frames=[];let nextArrival=0;
 const expire=tick=>{for(const w of workers){const kept=[];for(const job of w.queue){if(job.deadline<=tick)s.expired+=1;else kept.push(job);}w.queue=kept;if(w.current&&w.current.deadline<=tick){s.expired+=1;w.current=null;w.transferLeft=0;}}};
 const donorCandidates=helper=>workers.filter(w=>w.id!==helper.id&&w.queue.length>0);
 const chooseDonor=(helper,tick)=>{
  const donors=donorCandidates(helper);if(!donors.length)return null;
  if(policy==='threshold'){const eligible=donors.filter(w=>w.queue.length>=c.helpThreshold);if(!eligible.length)return null;return eligible.sort((a,b)=>b.queue.length-a.queue.length||a.id-b.id)[0];}
  if(policy==='always')return donors.sort((a,b)=>b.queue.length-a.queue.length||a.id-b.id)[0];
  if(policy==='random')return donors[Math.floor(draw(seed,tick,helper.id,'random-donor')*donors.length)];
  return null;
 };
 for(let tick=0;tick<c.steps;tick+=1){
  while(nextArrival<trace.length&&trace[nextArrival].arrival===tick){const job=trace[nextArrival++];workers[job.owner].queue.push({...job,remaining:job.work,source:job.owner});}
  expire(tick);
  for(const w of workers){
   if(w.current&&w.transferLeft>0){w.transferLeft-=1;s.transferActions+=1;continue;}
   if(!w.current){
    if(w.queue.length)w.current=w.queue.shift();
    else{const donor=chooseDonor(w,tick);if(donor){w.current=donor.queue.shift();w.transferLeft=c.handoffCost;s.transfers+=1;if(w.transferLeft>0){w.transferLeft-=1;s.transferActions+=1;continue;}}}
   }
   if(!w.current){s.idleActions+=1;continue;}
   w.current.remaining-=1;s.workActions+=1;
   if(w.current.remaining===0){s.completed+=1;s.completedValue+=w.current.value;w.current=null;}
  }
  s.maxBacklog=Math.max(s.maxBacklog,...workers.map(w=>w.queue.length+(w.current?1:0)));
  if(includeFrames)frames.push({tick,completed:s.completed,expired:s.expired,transfers:s.transfers,queues:workers.map(w=>w.queue.length+(w.current?1:0))});
 }
 expire(c.steps);s.unfinished=workers.reduce((n,w)=>n+w.queue.length+(w.current?1:0),0);
 return{summary:s,frames};
}

export function simulateWorld(input=DEFAULTS,seed=1,includeFrames=true){const config=normalizeConfig(input);integer('seed',seed,0,0xffffffff);const arrivals=makeArrivalTrace(config,seed);const policies={};for(const id of POLICY_IDS)policies[id]=runPolicy(id,arrivals,config,seed,includeFrames);return{version:VERSION,seed,config,arrivals,policies};}
