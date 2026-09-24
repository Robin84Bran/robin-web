import * as city from './01_cell_city/model.mjs';
import * as assembly from './02_self_assembly/model.mjs';
import * as mars from './03_mars_jar/model.mjs';
import * as islands from './04_memory_islands/model.mjs';
import * as known from './05_known_trap/model.mjs';
import * as windows from './06_attention_windows/model.mjs';
import * as taste from './07_taste_drift/model.mjs';
import * as channel from './08_shared_channel/model.mjs';
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
 },
 {id:known.id,folder:'05_known_trap',number:'05',title:'The Already Known Trap',chinese:'「早就知道了」陷阱',noun:'Anomalies recovered',unit:'planted anomalies recovered',
  question:'Does a familiar label make its neighbors disappear?',
  hook:'A tiny synthetic genome-like map contains 24 planted surprises. Some sit beside a label saying “already characterized.” Give two searchers the same inspection budget. Let only one see the labels.',
  control:'Known-label discount',key:'bias',min:0,max:1,step:.05,initial:.8,labels:['Labels hidden','Labels visible'],metric:'recall',
  legend:'Each tile is one synthetic neighborhood, not a DNA sequence. Pale tiles are uninspected; gray tiles were checked; green means a true find and coral a false alarm. Outlined tiles carry visible known labels.',
  mechanism:'120 neighborhoods contain 24 planted anomalies and 24 repeat-only decoys. Noisy repeat and partner scores are observable; truth is used only for evaluation. Inspection order is a seeded weighted race based on repeat evidence. A visible known label multiplies priority by max(0.001, 1 − discount). Both arms inspect the same number of neighborhoods. A candidate is flagged when both observed scores exceed 0.65.',
  limits:'The label penalty is an explicit hypothesis, not a measured human or Claude bias. Anthropic reports that the RT was previously identified and Claude noticed its associated repeat array and partner; it does not establish why earlier researchers missed those features. No biological sequences or real discovery agents run here.',
  ask:'Set the label discount to zero. If the gap disappears, what did the experiment actually test?',
  sourceTitle:'Anthropic · reported ART discovery and research process',source:'https://www.anthropic.com/news/claude-discovers-novel-enzyme-system'
 },
 {id:windows.id,folder:'06_attention_windows',number:'06',title:'Many Small Windows vs. One Big Eye',chinese:'小窗口与大眼睛',noun:'Local patterns recovered',unit:'planted local patterns recovered',
  question:'What disappears when you divide attention?',
  hook:'One reader, fifty readers, a thousand readers. Exactly 12,000 record-reads each. The data hide 48 short alternating patterns and a broad trend. Everyone sees the same data; nobody gets the same view.',
  control:'Background noise',key:'noise',min:0,max:1.5,step:.1,initial:.6,labels:['1 reader','50 readers','1,000 readers'],metric:'recall',
  legend:'The strip is the complete dataset. Colored marks locate local alarms: green overlaps a planted pattern; coral is a false alarm. Gray shading shows records read. A global decision appears separately, never inside the local-recall score.',
  mechanism:'The 12,000 records are partitioned into 1, 50 or 1,000 disjoint windows. Each record is read once. A local alarm requires an absolute difference > 0.45 between mean even- and odd-indexed values in a window. It recovers a planted motif only if at least four of its eight records fall in that window. A global test compares the first and last quarters of a window and requires a span of at least half the dataset. Short windows abstain unless a coordinator pools position-aware summaries after reading finishes.',
  limits:'Equal record-reads are not equal FLOPs, tokens or wall time. Pooling costs additional coordinator work, recorded as summary merges. These fixed detectors compress information differently; no claim is made that more agents are intrinsically smarter. Tiny windows can also create false alarms and split patterns at boundaries.',
  ask:'Turn on global summary pooling. Can coordination recover the broad trend without rereading the records?',
  sourceTitle:'Anthropic · inspiration for distributed search, not a benchmark specification',source:'https://www.anthropic.com/news/claude-discovers-novel-enzyme-system'
 },
 {id:taste.id,folder:'07_taste_drift',number:'07',title:'Taste Drift',chinese:'品味漂移',noun:'Weird but true ideas retained',unit:'weird-but-true ideas retained',scale:'count',
  question:'Can a good student inherit a teacher’s blind spot?',
  hook:'A fixed judge likes familiar ideas. The searchers learn to please it. Keep a quarter of them outside the feedback loop—and see whether protecting the search also protects what gets published.',
  control:'Preference for familiar ideas',key:'bias',min:0,max:1,step:.05,initial:.6,labels:['Everyone adapts','Protected explorers'],metric:'weirdTrueKept',
  legend:'120 proposals arrive each round. Purple dots are unusual ideas; green dots are familiar ideas. Dark dots are synthetically true, pale dots false. A gold ring marks one of the 24 retained proposals. Truth is visible to you for scoring, not to the judge.',
  mechanism:'Each round samples 120 proposals, with truth probability 0.35 independent of unusualness. True evidence scores are uniform 0.55–0.95; false scores 0.10–0.65. The judge adds 0.45 × familiar preference to familiar candidates. It keeps 24; optional blind-review slots rank by evidence alone. Adaptive agents update their unusual-proposal probability to 0.6 × old probability + 0.4 × retained unusual share. Protected explorers keep their original 50% unusual-proposal rate. Both arms face the same judge and draws for ten rounds.',
  limits:'The judge is a transparent scoring rule, not an actual scientist. Unusual does not mean true; truth is planted independently. Protected generation does not guarantee fair selection. This model cannot demonstrate that real expert feedback necessarily suppresses discovery, or that ignoring experts is beneficial.',
  ask:'Protect half the explorers, then add blind-review slots. Which bottleneck did each intervention change?',
  sourceTitle:'Anthropic · scientific taste as feedback into agent instructions',source:'https://www.anthropic.com/news/claude-discovers-novel-enzyme-system'
 },
 {id:channel.id,folder:'08_shared_channel',number:'08',title:'Shared Channel',chinese:'共享频道',noun:'Effective exploration',unit:'effective direction diversity',
  question:'A shared lead—or a very crowded rabbit hole?',
  hook:'A thousand searchers have 128 directions to explore. Someone posts an exciting lead. Open the message board, turn up the volume, and watch whether the room becomes a conversation or an echo.',
  control:'Messages per decision',key:'volume',min:0,max:20,step:1,initial:8,labels:['Isolated search','Shared board'],metric:'diversity',
  legend:'Each dot is a research direction. Size reflects the number of searchers there. Green directions contain a planted anomaly; coral ones do not. A gold ring means accumulated positive observations reached the evidence threshold—not that the direction is proven true.',
  mechanism:'1,000 searchers make 30 choices among 128 directions, 16 of which contain planted anomalies. The board initially promotes direction zero. A searcher follows it with probability 1 − (1 − trust)^message volume, choosing proportional to squared previous positive-vote counts plus a smoothing term. Otherwise it explores uniformly. A true direction yields positive evidence with probability 0.8; a false one with probability 0.03. Diversity is exp(Shannon entropy)/128; collapse means this modeled measure falls below 25%. Both arms receive identical draw keys and 30,000 attempts.',
  limits:'Popularity amplification, trust and evidence noise are chosen rules, not measured swarm behavior. The 25% collapse line is a declared convention, not a universal threshold. Evidence counts can flag false directions. No Hugging Face incident, actual message platform or live AI swarm is recreated here.',
  ask:'Make the first lead false. Does the board correct itself—or reward the loudest mistake?',
  sourceTitle:'Origin · Robin’s diary questions about swarms',source:'https://iamrobin.ai/meaning/diary/202609/2026-09-24-from-art-to-immortal-cells/'
 }
];
export function compare(id,p={}){
 const model={ 'cell-city':city,'self-assembly':assembly,'mars-jar':mars,'memory-islands':islands,'known-trap':known,'attention-windows':windows,'taste-drift':taste,'shared-channel':channel }[id];
 if(!model)throw new RangeError('experiment');
 const params=id===city.id?[{...p,mixing:0},p]:id===assembly.id?[{...p,adhesion:0},p]:id===mars.id?[{...p,maintenance:false},{...p,maintenance:true}]:id===islands.id?['fresh','skills','reflection'].map(strategy=>({...p,strategy})):id===known.id?[{...p,labelsVisible:false},{...p,labelsVisible:true}]:id===windows.id?[1,50,1000].map(agents=>({...p,agents})):id===taste.id?[{...p,protectedSlice:false},{...p,protectedSlice:true}]:[{...p,shared:false},{...p,shared:true}];
 return params.map(x=>model.run(x));
}
export const sensitivityCases=[['cell-city',{benefit:0}],['mars-jar',{solar:.5}],['memory-islands',{change:0}],['known-trap',{bias:0}],['attention-windows',{pool:true}],['taste-drift',{blindSlots:.5}],...[0,1,2,4,8,16].map(volume=>['shared-channel',{volume}])];
