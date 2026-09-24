import {rng,clamp,checked,seedOf} from '../shared.mjs';
export const id='mars-jar';
export function run(p={}){
 const seed=seedOf(p),leak=checked(p,'leak',.001,0,.01),maintenance=p.maintenance!==false,stockScale=checked(p,'stockScale',1,.5,3),solar=checked(p,'solar',1,.5,1.5);
 const random=rng(seed),initial=[140,110,90].map(x=>x*stockScale),stock=[...initial],waste=[0,0,0],lost=[0,0,0],imports=[0,0,0],history=[];
 const need=[8,8,8],yieldRate=[.985,.98,.97];let integrity=1,alive=true,failedAt=null,energyUsed=0,energyIn=0,repairDays=0;
 const frame=t=>({t,value:Math.min(...stock.map((v,i)=>v/need[i])),daysReserve:Math.min(...stock.map((v,i)=>v/need[i])),stock:[...stock],waste:[...waste],lost:[...lost],imports:[...imports],integrity,alive,energyUsed,energyIn,repairDays});
 history.push(frame(0));
 for(let t=1;t<=240;t++){
  const sunlight=solar*(.9+.2*random())*8; // common weather in paired arms
  if(alive){
   energyIn+=sunlight;let energy=sunlight;integrity=Math.max(.25,integrity-.004);
   if(maintenance&&integrity<.94&&energy>=1.2){integrity=clamp(integrity+.025);energy-=1.2;energyUsed+=1.2;repairDays++;}
   if(t<30){for(let i=0;i<3;i++){stock[i]+=2;imports[i]+=2;}} // documented Earth trickle, cut at day 30
   const escaped=stock[0]*leak;stock[0]-=escaped;lost[0]+=escaped;
   // Process yesterday's waste; sunlight caps the plant, not a magical source of matter.
   const demand=waste.map(v=>Math.min(v,9*integrity));const total=demand.reduce((a,b)=>a+b,0),fraction=total?Math.min(1,energy/(total*.25)):0;
   for(let i=0;i<3;i++){const processed=demand[i]*fraction;waste[i]-=processed;stock[i]+=processed*yieldRate[i];lost[i]+=processed*(1-yieldRate[i]);energyUsed+=processed*.25;}
   if(stock.some((v,i)=>v<need[i])){alive=false;failedAt=t;}else for(let i=0;i<3;i++){stock[i]-=need[i];waste[i]+=need[i];}
  }
  history.push(frame(t));
 }
 return {id,seed,params:{leak,maintenance,stockScale,solar,initial,need,yieldRate,horizon:240,supportCutDay:30},history,summary:{survivedDays:failedAt===null?240:failedAt-1,failedAt,daysReserve:history.at(-1).daysReserve,integrity,energyUsed,energyIn,repairDays}};
}
