// Original synthetic teaching model. No dependencies, network, or empirical calibration.
export const VERSION = '1.0.0';
export const CAPACITY = 24;
export const FLEETS = [1, 6, 24];
export const DEFAULTS = Object.freeze({seed: 1, slots: 2, failure: 0.35, common: 0, cycle: 6});
export function random(seed) {
  let x = seed >>> 0;
  return () => { x += 0x6D2B79F5; let t = Math.imul(x ^ x >>> 15, 1 | x); t ^= t + Math.imul(t ^ t >>> 7, 61 | t); return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
export function settings(input = {}) {
  const p = {...DEFAULTS, ...input};
  for (const k of Object.keys(input)) if (!(k in DEFAULTS)) throw Error('Unknown control: '+k);
  if (!Number.isInteger(p.seed) || p.seed < 0 || p.seed > 4294967295) throw Error('Seed must be a uint32');
  if (!Number.isInteger(p.slots) || p.slots < 1 || p.slots > 24) throw Error('Door slots must be 1–24');
  if (![3,6,12].includes(p.cycle)) throw Error('Cycle must be 3, 6 or 12');
  for (const k of ['failure','common']) if (!Number.isFinite(p[k]) || p[k] < 0 || p[k] > 1) throw Error(k+' must be 0–1');
  return p;
}
export function simulate(input = {}) {
  const p = settings(input), rng = random(p.seed);
  // Pre-drawn exogenous shock; same latent draws across fleet designs and controls.
  const correlated = rng() < p.common, sharedFailure = rng() < p.failure;
  const losses = Array.from({length:24}, () => rng() < p.failure);
  const arms = FLEETS.map(n => ({n, capacity: CAPACITY/n, cursor:0, total:0, post:0, blocked:0,
    units:Array.from({length:n},(_,id)=>({id,alive:true,readyAt:1}))}));
  const frames = [{tick:0, arms:arms.map(a=>({n:a.n,total:0,post:0,blocked:0,delivered:0,served:[],units:a.units.map(u=>({...u}))}))}];
  for (let tick=1; tick<=120; tick++) {
    const frame = {tick, arms:[]};
    for (const a of arms) {
      if (tick===61) for (const u of a.units) u.alive=!(correlated ? sharedFailure : losses[u.id]);
      const ready = a.units.filter(u=>u.alive && u.readyAt<=tick).length;
      const served=[]; const start=a.cursor;
      for(let offset=0; offset<a.n && served.length<p.slots; offset++) {
        const id=(start+offset)%a.n, u=a.units[id];
        if(u.alive && u.readyAt<=tick) { served.push(id);u.readyAt=tick+p.cycle; }
      }
      if(served.length) a.cursor=(served.at(-1)+1)%a.n;
      const delivered=served.length*a.capacity;
      a.total+=delivered;if(tick>=61)a.post+=delivered;a.blocked+=ready-served.length;
      frame.arms.push({n:a.n,total:a.total,post:a.post,blocked:a.blocked,delivered,served,
        units:a.units.map(u=>({...u}))});
    }
    frames.push(frame);
  }
  return {version:VERSION,settings:p,shock:{tick:61,correlated},frames,
    summary:arms.map(a=>({n:a.n,capacity:a.capacity,total:a.total,post:a.post,
      survivors:a.units.filter(u=>u.alive).length,outage:a.post===0,blocked:a.blocked}))};
}
