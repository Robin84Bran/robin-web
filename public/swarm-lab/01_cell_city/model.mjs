import {rng,mean,weighted,checked,seedOf} from '../shared.mjs';
export const id='cell-city';
export function run(p={}){
 const seed=seedOf(p),mixing=checked(p,'mixing',.9,0,1),benefit=checked(p,'benefit',1.6,0,4),cost=.6,mutation=.015;
 const random=rng(seed),groups=12,size=16,history=[];
 let cells=Array.from({length:groups*size},(_,i)=>i%2),infrastructure=.5;
 function frame(t){const cooperation=mean(cells);return {t,value:cooperation,cooperation,infrastructure,output:benefit*cooperation,cells:[...cells]};}
 history.push(frame(0));
 for(let t=1;t<=100;t++){
  const means=Array.from({length:groups},(_,g)=>mean(cells.slice(g*size,(g+1)*size)));
  const fitness=cells.map((x,i)=>Math.max(.05,1+benefit*means[Math.floor(i/size)]-cost*x));
  const next=[];
  for(let g=0;g<groups;g++){
   const founder=weighted(cells,fitness,random());
   for(let i=0;i<size;i++){
    // Consume the same three random draws in each arm, even when unused.
    const mix=random(),parent=weighted(cells,fitness,random()),mut=random();
    const allele=mix<mixing?parent:founder;
    next.push(mut<mutation?1-allele:allele);
   }
  }
  cells=next;infrastructure=.92*infrastructure+.08*mean(cells);history.push(frame(t));
 }
 return {id,seed,params:{mixing,benefit,cost,mutation,groups,size},history,summary:{cooperation:history.at(-1).cooperation,infrastructure,output:history.at(-1).output}};
}
