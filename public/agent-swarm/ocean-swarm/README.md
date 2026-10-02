# Ocean Swarm

**Who repairs the sensing constellation when the sea breaks the plan?**

A surface mothership launches a small environmental sensing fleet over a one-kilometre synthetic seascape. Reef passages, currents, slow turns, noisy navigation, batteries and delayed acoustic packets constrain every arm. The comparison concerns coordination within this model. It is not a validated ocean engineering prediction.

The first 24-seed comparison supports keeping local repair as an option after ordinary node loss. It also gives a counterexample: unreliable evidence under compound failure makes repair worse on average. Adding a strictly bounded mothership contributes almost no additional coverage in these regimes.

## Reproduce

Node.js 22 or later; no dependencies, API keys, network calls or hardware.

```sh
npm test
npm run batch
npm run verify
```

`batch` regenerates `results.json`. `verify` reruns all 144 seed/regime worlds, compares all 432 arm outcomes plus aggregates byte-for-byte with that file, and refuses to alter it on mismatch. The artifact embeds SHA-256 hashes of the model and frozen experimental specification. The common interactive renderer and standalone page are supplied by the surrounding Agent Swarm Lab integration.

```js
import { simulate, presets } from './model.mjs';
const replay = simulate({ seed: 7, population: 25, fault: 'node-loss' });
const summaries = simulate({ seed: 7, population: 25, record: false });
```

`record:false` omits frames and produces exactly the same summaries. The module works in a browser without Node imports. `meta`, `defaults`, `controls`, `presets` and `simulate` implement the lab interface. Optional diagnostic records expose delivered commands and final local belief stamps for audit.

## What each arm knows

| Arm | Coordination | Information boundary |
| --- | --- | --- |
| Provisioned stations | Retains each launch assignment. | Common station map; its own noisy sensors. It transmits the same environmental telemetry protocol as the other arms. |
| Local repair | Keeps recent reports, reserves target sites, and moves a surplus vehicle toward a perceived vacancy. Staggered decisions and a minimum hold time reduce oscillation. | Its own sensor observation and source-stamped reports that actually arrived. Silence eventually expires a claim; there is no remote death notification. |
| Bounded assistance | Uses the same local rule; the mother may propose at most two repairs every 24 steps. Delivered proposals expire after 24 steps. | The mother receives reports through the same graph. Its commands must queue, propagate and arrive. Children use local repair after command expiry. |

Everyone receives the mission's ten station coordinates and initial launch manifest. No controller receives actual coverage, exact vehicle positions, remote survival or the future intervention schedule. The pure `controllerDecision` and `motherProposals` functions make this boundary inspectable. The simulator's physical layer knows true positions only to evolve motion, produce sensor observations, determine links and evaluate outcomes.

The reference arm still uploads environmental measurements. This controls telemetry load when comparing coordination; it is not a claim that a silent preprogrammed fleet requires the same radio energy.

## The declared world

- **Space and time:** a 1000 × 700 metre horizontal region, ten sites, three circular reefs, 360 ten-second steps. The underwater depth coordinate used for illustration is constant; there are no vertical dynamics.
- **Deployment:** 2, 5, 10, 25 or 50 children, launched at two-step intervals. At the default 25, each arm starts with 2500 modeled Wh across children. Increasing population increases total energy and payload; it is not an equal-budget comparison.
- **Motion:** a 1.35 m/s propulsion limit, 0.19 radian maximum turn per step and first-order inertia. Navigation turns before full thrust, compensates a noisy current estimate, and repels from known reefs. True currents vary with space and time. Physical contact stops most velocity and pushes the vehicle outside a reef.
- **Sensing:** noisy localization plus bounded random-walk bias, a noisy current measurement, and a noisy temperature sample from a moving synthetic plume. Reported position is never replaced with exact evaluator position in a controller.
- **Communication:** 96-byte packets; default 192 transmitted bytes per node per ten-second step; range-limited broadcast; distance fading and seeded loss; two to four steps of default hop latency; bounded queues and at most four relay forwards. Source identity and observation time survive relay. A mother command uses this same transport. A packet consumes bandwidth and energy even when it is lost.
- **Energy:** an idle term, a quadratic thrust term, and transmit/receive charges. The coefficients expose costs but are not calibrated to a vehicle. Lost vehicles retain residual battery in the conservation ledger. Mother radio energy is reported separately.
- **Exogenous randomness:** counter-based seed/tick/entity/channel draws. Changing a policy's branch does not consume another policy's future random draw. Treatment-dependent positions can properly change whether a physical link exists.

Each vehicle maintains only recent source-stamped beliefs. Reports can disagree, arrive late or vanish. Expiry prevents indefinite reliance on dead vehicles but can falsely erase living peers during isolation. This is a deliberate failure mechanism, not proof that decentralization always helps.

## Interventions and measurement

The six presets isolate ordinary operation, child loss, total acoustic blackout, mother loss, cross-current, and compound loss. Interventions start at step 170 by default. A blackout lasts 90 steps and blocks in-flight reception as well as new transmission. The compound preset also shifts the current. All arms lose the same seed-selected children. Deployed children survive mother loss; payload still aboard is stranded if mother loss occurs early.

**Station uptime** is the mean covered-site percentage over mission steps 1 through 360, including deployment. A site is covered only by a living deployed child within 48 true metres. It is an evaluator metric, never a controller input.

Supporting metrics include:

- Instantaneous, final, pre-intervention and post-intervention coverage.
- First time reaching 80% coverage, or `null` if never reached.
- Time until ten consecutive post-intervention steps retain at least 80% of pre-intervention coverage. Zero means this threshold was already retained; `null` means censored or undefined. Censor counts accompany aggregate recovery means.
- Child motion/radio energy, mother radio energy, transmitted bytes, received bytes, queue drops, reef contacts and exhaustion.
- Issued, delivered, expired-undelivered and still-pending mother commands. The ledger conserves command counts. Central dependency is the percentage of living deployed vehicle-steps spent following a delivered command, not a claim about organizational dependence.
- Sampled-site temperature mean absolute error: the onboard sample compared with the true nearby station's temperature. Sensor noise, sample timing and the vehicle's offset within a site's footprint contribute.

`null` is not zero. In particular, a mean over uncensored recovery times must be read with its denominator and censor count.

## Frozen batch findings

`EXPERIMENT.md` records the question, matched conditions, seed plan and acceptance criteria before the first batch. There are 24 paired seeds in each regime. Intervals below are 95% paired percentile bootstrap intervals over those seeds, with 2000 deterministic resamples. They describe this model's sampled worlds, not real-ocean confidence.

| Regime | Provisioned uptime | Local uptime | Assisted uptime | Local change vs provisioned, percentage points [95% interval] |
| --- | ---: | ---: | ---: | ---: |
| Calm | 83.89% | 83.88% | 83.88% | −0.00 [−0.01, 0.00] |
| Child loss | 77.24% | 80.70% | 80.73% | +3.47 [+2.33, +4.63] |
| Acoustic blackout | 83.89% | 83.32% | 83.31% | −0.56 [−0.69, −0.45] |
| Mother loss | 83.89% | 83.88% | 83.88% | −0.00 [−0.01, 0.00] |
| Cross-current | 83.75% | 83.75% | 83.75% | 0.00 [0.00, 0.00] |
| Compound failure | 77.15% | 75.65% | 75.65% | −1.50 [−3.14, +0.21] |

Local repair passes the declared retention criterion through ordinary node loss: a positive paired interval, with no material calm-regime penalty. After child loss, it adds 6.53 percentage points of **post-intervention** coverage while consuming about 31.61 additional modeled Wh and 18,480 additional transmitted bytes per mission. It wins 17 seeds, ties five and loses two against provisioned stations.

That result does not transfer to every failure. During blackout, partial reports expire at different times and can create false vacancies. Local repair loses coverage and consumes about 185.86 extra modeled Wh. Under compound failure it loses 17 of 24 seeds; the mean penalty is 1.50 percentage points and the interval crosses zero. Retain this counterevidence.

The bounded mother improves node-loss mean uptime by only about 0.029 percentage points beyond local repair. No material advantage is established. Mother loss itself has little effect because the children already have viable local controllers and a mission map; this is a property of this architecture, not a universal claim about motherships.

## Validation and limits

Fifteen tests check deterministic replay, recording invariance, energy conservation, matched failure identities, population budgets, finite positions, reef exclusion, maximum turn, information boundaries, future/expired records, command timing and accounting, blackout behavior, mother-loss survival, final-step intervention accounting, frame independence and bounded inputs. The full batch is regenerated and verified independently after tests.

The model omits inter-vehicle collisions, calibrated acoustic propagation, wave dynamics, six-degree-of-freedom motion, docking, real bathymetry and actual vehicle failure data. The scalar plume is synthetic. Broadcast flooding is intentionally simple and sometimes expensive; a different radio protocol would be a new treatment. Site coordinates are preplanned, so this does not test discovering an unknown seafloor. These omissions bound the conclusions.

`CHANGELOG.md` records a post-batch command-expiry accounting correction. The first model and results are preserved under `evidence/`; controller outcomes were unchanged. No controller was tuned after observing the batch.

## 中文摘要

这个实验比较三种水下环境监测编队：固定站位、局部补位、有限母船协助。所有控制器只能使用带噪的自身观测和确实收到、带来源与时间戳的信息；母船指令也必须经过同一条会延迟、丢包、断联的声学网络。三种方案拥有相同艇体、能量、地图、运动限制与外部随机条件。

24 个种子、6 种环境、3 种方案，共 432 个结果。普通节点损失后，局部补位使全程覆盖率平均提高 3.47 个百分点，95% 配对区间为 +2.33 至 +4.63；但声学中断时下降 0.56 个百分点，复合故障时平均下降 1.50 个百分点。有限母船协助几乎没有带来额外收益。保留这组反例：信息过期能够清除失效节点，也可能把仍然存在的同伴误认为消失。

这是有惯性、转向、推力、洋流、定位误差、通信和能量约束的二维简化模型；三维深度仅用于说明。结果支持研究这些机制，不构成真实水动力或硬件性能验证。15 项测试与全批次逐字节重放用于验证实现与证据。
