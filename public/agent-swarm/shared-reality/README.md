# Shared Reality — a storm map nobody sees in full

Twenty couriers carry supplies to eight shelters in a changing synthetic storm field. They know coordinates and their own position, but sense risk only within 20 distance units. Measurements are noisy; gossip must cross real geometric radio links, delayed and sometimes lost. A shelter visit earns 5–7 useful units or incurs a four-unit storm loss. Couriers spend energy travelling, pause after service/injury and return to their departure base before another mission.

This is an executable test of **agreement sufficient for action**, with an explicit possibility that agreement makes things worse. The animation is a 3D projection of a declared 2D model. It is not atmospheric physics, a real distributed deployment, or a theory of human belief.

## The controlled comparison

| Treatment | Knowledge and communication |
|---|---|
| Private observations | Latest private local instrument reading. No radio sharing. |
| Echoed consensus | Up to two nearby peers receive three posterior summaries per transmission. The summaries are relabeled as fresh independent evidence: the deliberate rumor-amplification baseline. |
| Source-aware gossip | Same local peer budget, but reports preserve original source, sensing time, uncertainty and expiry. Latest readings deduplicate by source, uncertainty ages, and independent-source confidence is conservatively capped. |
| Bounded collector | Couriers send their own readings to a fixed relay. The relay aggregates only delivered reports and broadcasts a rotating three-shelter bulletin. Its return channel has the same loss, delay, range and partition model. |

Each agent senses every three ticks and moves at 1.5 units per tick. Distributed methods send at most two three-record packets per sensing tick; the collector uses one uplink and one downlink per courier. Unused bandwidth remains unused. Report actual messages, bytes and motion/injury energy separately: communication has no invented universal energy conversion.

`controllerView()` admits own coordinates, station coordinates/yields and evidence estimates only. `chooseTarget()` receives that object, never truth, a world-state object, the environment seed, or future observations. The central collector has no privileged risk map or position-based bulletin selector. The environment uses positions to calculate whether a physical radio link works, just as it uses positions to calculate sensing range.

Radio range, packet loss and the west/east partition are checked **at send time**. The partition prevents new cross-boundary transmissions; packets already accepted into transit may still arrive after the partition begins, subject to evidence expiry. This is delayed delivery with send-time connectivity, not an immediate cancellation of every packet in flight.

The common random field, sensor noise, common bias, binary mission outcomes and link failures are keyed by seed/time/entity/link. A treatment cannot advance another treatment's random stream. Movement-induced changes in sensing are legitimate downstream effects and are not erased by the pairing.

## Predictions, consensus and failure

Every departure predicts the probability that its arrival action fails. The prediction regresses toward the prior with travel time. Brier score measures the realized binary outcome; a separate evaluator compares predicted probability with hidden risk at the predicted arrival tick. Five fixed probability bins produce calibration error. Report useful work as the main behavioral outcome, not confidence or number of messages.

False consensus is a **conditional** statistic. A check occurs only if at least half the couriers are confident (standard deviation below 0.16) and their estimates span less than 0.18. It is false if their mean misses evaluator risk by more than 0.25. Zero qualifying checks produce `null`, not a zero error rate. Aggregates exclude null, show valid sample count `n`, and compute paired rate differences only where both rates exist. Confidence intervals use the valid sample degrees of freedom; fewer than two values have no interval.

Four preregistered regimes:

1. Independent sensor noise with moderate channel delay.
2. A west/east send-time network partition from 42% to 78% of the mission, 40% loss and delayed packets; packets already in transit may still arrive.
3. A regional calibration bias shared by neighboring sensors. Honest, source-preserving observations can all be wrong together.
4. Rapidly drifting storms with long-lived records and slow messages.

**Frozen claim criterion:** source-aware evidence must beat echoed-consensus net work with a positive paired 95% lower bound and lower mean Brier score in at least two regimes, and must avoid more than a 10% mean-work loss to private sensing in every regime. This criterion was written before the first batch. It is not an implementation success requirement and no winner was tuned to meet it.

## Reproduce and inspect

Requires Node.js 22 or later; no dependencies or network access.

```sh
npm test
npm run batch
npm run verify
```

`results.json` contains 24 fixed paired seeds × four regimes × four arms, every numerical outcome, aggregates, descriptive paired t intervals and the exact `model.mjs` SHA-256. `--verify` reruns all 384 arm outcomes. It requires exact structure, source hash, decisions, counts, costs, work and missing-value status. A narrowly scoped machine-rounding allowance applies only to `brier`, `forecastRMSE`, `calibrationError`, their continuous aggregate statistics and the `sourceVsEchoBrier` paired statistics: absolute difference ≤ `Number.EPSILON / 2` (1.11e−16) **and** relative difference ≤ `8 * Number.EPSILON` (1.78e−15). Aggregate sample counts stay exact. `npm run verify -- --exact` additionally requires byte-for-byte equality everywhere. The browser calls the identical ESM model. `record:false` skips animation snapshots without changing a result.

Read the exported `audit` object for the actual information boundary, prediction definition and bandwidth accounting. The saved batch report retains failed hypotheses as evidence. A graphical scene cannot establish distributed intelligence on its own.

## Limits and next falsification

The model assumes honest source identities, known station coordinates, exact self-localization, calibrated independent sensor variance and deterministic policy choices. Source-aware fusion cannot identify shared calibration error from source names alone. Evidence forwarding uses the newest three records, so heavily sensed sites can crowd out remote information. Dead nodes stop sensing and transmitting; collisions and acoustic/atmospheric propagation are absent. The next justified extension would add independent calibration references or actively diverse sensors, with their cost charged, rather than simply raising the agent count.

## 中文说明

二十名配送员在八座避难站之间行动，只能看到附近带噪声的风险读数。比较私有观察、反复转述形成的共识、保留来源与时间的证据共享，以及受同样通信故障限制的中央收集器。主指标是实际净有效工作；另记预测校准、消息成本和错误共识。共同的传感器偏差可以同时欺骗所有方案。三维动画只是二维机制的示意，不是气象或人类认知模型。完整结果保留未通过的假说，不把仿真做成预定的 swarm 胜利。

通信范围、丢包和东西分区只在发送时检查。分区开始后不再接受新的跨区发送；此前已经进入传输队列的消息仍可能送达，并继续受证据有效期限制。因此，这不是立即清除所有在途消息的物理断网模型。

Metric review (2026-10-03): undefined-rate handling was corrected without changing controllers or outcomes. Prior source/results are preserved in `diagnostics/pre-metric-correction/`. 中文：没有符合条件的共识检查时，错误率为 null；汇总显示有效样本数，不把缺少证据当成零错误。控制器和实际结果未改变。

## Portable numerical replay

The saved results and model are unchanged. Node22.18.0 and Node26.7.0 on macOS arm64 reproduce the saved JSON byte-for-byte. Ubuntu x64 Node22.18.0 produced seventeen final-bit differences in continuous forecast/calibration values, with maximum absolute error 5.55e−17 and relative error 8.51e−16; source hashes, all integer outcomes, structure and hypothesis decisions matched. This is observed cross-platform floating-point rounding, not a changed simulation treatment. The declared portable bounds are only twice that observed scale and apply to explicitly named paths, never a blanket approximate comparison. Tests reject changed hashes, work, energy, counts, nulls, schema, material forecast errors and near-zero relative errors. The default verifier reports any accepted rounding count; strict `--exact` mode remains available. No frozen evidence is rounded or regenerated to hide the difference.
