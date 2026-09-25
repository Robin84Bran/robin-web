export const VERSION = '1.0.0';
export const DEFAULTS = Object.freeze({seed: 1, agents: 32, rounds: 160, explore: 0.15, share: 0.35, shift: true});
export const WIDTH = 24, HEIGHT = 16;
const N = WIDTH * HEIGHT;
export function random(seed) {
  let x = seed >>> 0;
  return () => { x += 0x6D2B79F5; let t = Math.imul(x ^ x >>> 15, 1 | x); t ^= t + Math.imul(t ^ t >>> 7, 61 | t); return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
function settings(input) {
  const p = {...DEFAULTS, ...input};
  for (const k of ['seed', 'agents', 'rounds']) if (!Number.isInteger(p[k])) throw new Error(`${k} must be an integer`);
  if (p.seed < 0 || p.seed > 4294967295 || p.agents < 1 || p.agents > 128 || p.rounds < 20 || p.rounds > 400) throw new Error('Parameter outside documented limits');
  for (const k of ['explore', 'share']) if (!Number.isFinite(p[k]) || p[k] < 0 || p[k] > 1) throw new Error(`${k} must be 0–1`);
  if (typeof p.shift !== 'boolean') throw new Error('shift must be boolean');
  return p;
}
const neighbor = (cell, direction) => {
  const x = cell % WIDTH, y = Math.floor(cell / WIDTH);
  return ((y + [0,1,0,-1][direction] + HEIGHT) % HEIGHT) * WIDTH + (x + [1,0,-1,0][direction] + WIDTH) % WIDTH;
};
function fieldAt(centers) {
  return Array.from({length:N}, (_,i) => Math.max(...centers.map(([x,y]) => {
    const dx = Math.min(Math.abs(i % WIDTH-x), WIDTH-Math.abs(i % WIDTH-x));
    const dy = Math.min(Math.abs(Math.floor(i/WIDTH)-y), HEIGHT-Math.abs(Math.floor(i/WIDTH)-y));
    return Math.exp(-(dx*dx+dy*dy)/12);
  })));
}
export function simulate(input = {}) {
  const p = settings(input), world = random(p.seed);
  const centers = Array.from({length:2},()=>[Math.floor(world()*WIDTH), Math.floor(world()*HEIGHT)]);
  const moved = centers.map(([x,y])=>[(x+WIDTH/2)%WIDTH,(y+HEIGHT/2)%HEIGHT]);
  const fields = [fieldAt(centers), fieldAt(moved)];
  const arms = ['swarm','solo','random'].map((name,index)=>({name, rng:random(p.seed+7919*(index+1)), total:0, pre:0, post:0, queries:0,
    memory:new Float64Array(N), seen:new Uint8Array(N), positions:[], history:[],
    agents:Array.from({length:p.agents},()=>({cell:Math.floor(world()*N), direction:Math.floor(world()*4), last:0, failures:0}))}));
  const frames = [], changeAt = Math.floor(p.rounds/2);
  for (let t=0; t<p.rounds; t++) {
    const field = fields[p.shift && t>=changeAt ? 1 : 0];
    for (const arm of arms) {
      // One field query per walker or central-controller query; no hidden field look-ahead.
      for(let i=0;i<N;i++) arm.memory[i] *= 0.97;
      arm.positions=[]; let reward=0;
      for (let j=0;j<p.agents;j++) {
        let cell;
        if (arm.name==='random') cell=Math.floor(arm.rng()*N);
        else if(arm.name==='solo') {
          if(arm.rng()<p.explore || !arm.seen.some(Boolean)) cell=Math.floor(arm.rng()*N);
          else { cell=0; for(let i=1;i<N;i++) if(arm.memory[i]>arm.memory[cell]) cell=i; }
        } else {
          const agent=arm.agents[j];
          // Rule 1: continue a improving heading. Rule 2: sometimes follow a useful local trace.
          if (arm.rng()<p.explore || agent.failures>=3) {agent.direction=Math.floor(arm.rng()*4); agent.failures=0;}
          else if(arm.rng()<p.share) {
            let best=agent.direction;
            for(let d=0;d<4;d++) if(arm.memory[neighbor(agent.cell,d)]>arm.memory[neighbor(agent.cell,best)]) best=d;
            agent.direction=best;
          }
          // Rule 3: after repeated disappointments, explore again (above).
          cell=neighbor(agent.cell,agent.direction); agent.cell=cell;
        }
        const value=field[cell]; // This is the only observation from the environment.
        if(arm.name==='swarm') {const a=arm.agents[j]; a.failures=value>a.last?0:a.failures+1; a.last=value;}
        arm.memory[cell]=value; arm.seen[cell]=1; arm.positions.push(cell); arm.queries++; reward+=value;
      }
      arm.total+=reward; if(t<changeAt) arm.pre+=reward; else arm.post+=reward;
      arm.history.push(reward/p.agents);
    }
    frames.push({round:t+1,centers:p.shift&&t>=changeAt?moved:centers,arms:arms.map(a=>({name:a.name,positions:[...a.positions],reward:a.history[t],mean:a.total/a.queries}))});
  }
  return {version:VERSION,settings:p,changeAt,frames,summary:arms.map(a=>({name:a.name,queries:a.queries,mean:a.total/a.queries,
    before:a.pre/(changeAt*p.agents),after:a.post/((p.rounds-changeAt)*p.agents),coverage:a.seen.reduce((s,v)=>s+v,0)/N}))};
}
