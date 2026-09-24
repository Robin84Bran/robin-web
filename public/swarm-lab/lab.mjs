import * as city from './01_cell_city/model.mjs';
import * as assembly from './02_self_assembly/model.mjs';
import * as mars from './03_mars_jar/model.mjs';
import * as islands from './04_memory_islands/model.mjs';
export {VERSION} from './shared.mjs';
export const experiments=[
 {id:city.id,folder:'01_cell_city',number:'01',title:'The city of freeloaders',chinese:'叛逃细胞城',noun:'Cooperation',unit:'share contributing',
  question:'If everyone wins individually, who keeps the city alive?',
  hook:'Two cities. The same tiny residents. In one, descendants tend to start together. In the other, everyone mixes. Guess which city still pays its maintenance bill.',
  control:'Mixing',key:'mixing',min:0,max:1,step:.05,initial:.9,labels:['Shared founders','Mixed founders'],metric:'cooperation',
  legend:'Green residents contribute; coral residents keep their share. Each small square is a colony. Population is fixed; this model measures cooperation, not survival.',
  mechanism:'Parents reproduce in proportion to payoff: max(0.05, 1 + benefit × colony cooperation − 0.6 × own contribution). Each new colony chooses one founder. A mixing draw replaces a founder-descendant with an independently sampled parent. Mutation flips the inherited choice with probability 0.015. The public-works index follows cooperation with a lag; it does not influence reproduction.',
  limits:'Founders are an assortment mechanism, not a complete genetic model. Cells have no intentions, no politics and no moral scores. The population stays at 192: neither cancer nor an actual city is simulated.',
  ask:'Try benefit = 0. With nothing useful to maintain, should shared ancestry still rescue cooperation?',
  sourceTitle:'Avida-ED · digital evolution for teaching',source:'https://avida-ed.github.io/',
 },
 {id:assembly.id,folder:'02_self_assembly',number:'02',title:'A body without a blueprint',chinese:'DNA 没写的身体',noun:'Largest connected group',unit:'share of surviving particles',
  question:'How much shape can a few local rules make?',
  hook:'Nobody receives a drawing of the finished body. Particles notice nearby particles, keep a little personal space, and sometimes stick together. Then we remove fourteen of them.',
  control:'Adhesion',key:'adhesion',min:0,max:1,step:.05,initial:.8,labels:['No adhesion','Local adhesion'],metric:'connected',
  legend:'Every dot follows the same local force rule. Lines join neighbors within the connection threshold. After step 90, fourteen central particles are removed in each arm.',
  mechanism:'72 particles start at matched positions. At distance below 0.043 they repel; between 0.043 and the signal range they attract in the adhesion arm. Positions update simultaneously with small deterministic noise and a shared boundary. Connectivity uses distance < 0.085. Damage removes the fourteen particles nearest the dish center at step 90. No particle is created afterward.',
  limits:'These are abstract particles, not biological cells. Connectivity is not intelligence, healing or a new organism. Any post-damage reconnection is rearrangement of survivors. The rules and boundary—not DNA or an AI—supply the structure.',
  ask:'Switch off damage. Then shrink the signal range. Does the cluster need long-range communication?',
  sourceTitle:'Tufts · Anthrobots research overview',source:'https://now.tufts.edu/2023/11/30/scientists-build-tiny-biological-robots-human-cells',
 },
 {id:mars.id,folder:'03_mars_jar',number:'03',title:'Mars in a jar',chinese:'一罐火星',noun:'Limiting reserve',unit:'crew-days available',
  question:'Independent—or just very well stocked?',
  hook:'The cupboard is full. The tanks look healthy. Earth stops sending supplies on day 30. A very small leak would like a word with your declaration of independence.',
  control:'Daily water leak',key:'leak',min:0,max:.01,step:.0005,initial:.001,labels:['No maintenance','Maintain the loop'],metric:'survivedDays',
  legend:'Blue is water, gold is food, green is oxygen. Each bar is usable stock as a share of its initial tank. All are abstract resource units, not real engineering quantities.',
  mechanism:'Eight residents consume eight units of each stream daily. Yesterday’s waste is processed subject to plant integrity and sunlight energy. Recovery yields are 98.5%, 98% and 97%. Two units per stream arrive daily before day 30, none afterward. Integrity wears by 0.004/day. Maintenance spends 1.2 energy to restore 0.025 integrity below 0.94. Water leakage and unrecovered material enter an explicit lost ledger. Stocks + waste + lost = initial stocks + imports for each stream.',
  limits:'This is a three-stream accounting model, not MELiSSA chemistry or a Mars habitat design. Food, oxygen and water are independent normalized ledgers. Sunlight is an external energy input. Surviving 240 days does not establish permanent closure; losses continue even when the plant is repaired.',
  ask:'Triple the starting stock. Did you repair the ecosystem—or postpone the day the bill arrives?',
  sourceTitle:'ESA · MELiSSA closed-loop concept',source:'https://www.esa.int/Enabling_Support/Space_Engineering_Technology/Melissa/Closed_Loop_Concept',
 },
 {id:islands.id,folder:'04_memory_islands',number:'04',title:'The island that forgot the manual',chinese:'Voyager 失忆岛',noun:'Successful attempts',unit:'cumulative success share',
  question:'Does experience travel—or merely repeat itself?',
  hook:'Three learners arrive on the same islands. One packs nothing. One packs working skills. One also keeps a record of what failed. On the next island, some familiar rules are wrong.',
  control:'Changed rules per island',key:'change',min:0,max:4,step:1,initial:2,labels:['Fresh learner','Skills','Skills + failure memory'],metric:'rate',
  legend:'Each learner gets exactly 120 action attempts: forty on each island. A dot is one attempt, green for success and coral for failure. Dashed lines mark the island changes.',
  mechanism:'Four contexts each require one of four actions. The first two changed contexts (default) rotate their correct action on each new island. Fresh learners clear successful-action memory at each crossing. Skill learners retain it. Both explore uniformly after a failure. The third learner additionally excludes actions that failed in the current island/context. All arms see identical task order and draw keys. Skills start with four policies learned in a previous world; that training cost is outside this comparison.',
  limits:'No LLM, Minecraft, live agent or Voyager software runs here. These are explicit rule-based learners. Failure memory has an advantage by construction when rules stay fixed within an island; this model tests that assumption, not general intelligence. Equal test budgets do not imply equal lifetime training cost.',
  ask:'Set changed rules to zero. How much of the apparent intelligence was just useful luggage?',
  sourceTitle:'Voyager · original research project',source:'https://voyager.minedojo.org/',
 }
];
export function compare(id,p={}){
 const model={ 'cell-city':city,'self-assembly':assembly,'mars-jar':mars,'memory-islands':islands }[id];
 if(!model)throw new RangeError('experiment');
 const params=id===city.id?[{...p,mixing:0},p]:id===assembly.id?[{...p,adhesion:0},p]:id===mars.id?[{...p,maintenance:false},{...p,maintenance:true}]:['fresh','skills','reflection'].map(strategy=>({...p,strategy}));
 return params.map(x=>model.run(x));
}
