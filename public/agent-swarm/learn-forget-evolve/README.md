# Learn, Forget, Evolve — four seasons, one returning world

Eighteen foragers enter ecologies **A → B → C → A**. Different resources become nutritious or toxic. Agents see three noisy weather cues and fixed resource coordinates; they never receive a phase label or hidden payoff table. Successful cargo counts only after it reaches the field station. Travel, handling, toxic harvests, finite energy and paid calibration all affect useful work.

The linear search policy has twelve parameters. This is a deliberately bounded learning experiment, not an autonomous system rewriting unrestricted software or evidence for AGI. Resource heights and weather colors are illustrative 3D sketches of a 2D synthetic world.

## What changes between arms

| Arm | Mechanism |
|---|---|
| Fixed habit | Keeps its initial A-favoring linear policy. Receives the same paid field samples but does not use them. |
| Experience memory | Stores measured successes and failures in three bins derived only from observable weather. Old evidence decays; new evidence changes its resource estimates. |
| Mutation + retention gate | Proposes bounded changes to three entries in the incumbent twelve-parameter linear policy; selects on fitting/rehearsal samples, then applies independent promotion and retention gates. |
| Matched random search | Draws independent twelve-parameter policies, with the same incumbent, candidate count, fitting samples, rehearsal bank and promotion gate. |

The memory table is a serious simplicity baseline. It is allowed to outperform mutation. All arms use the same route rule to trade predicted resource quality against travel time.

## Paid evidence and independent evaluation

By default, a field calibration happens every 24 ticks. Twelve fitting observations and six independent promotion observations each measure all three resources: **54 physical resource probes**. Every arm is charged those probes, their declared calibration energy, and two lost service ticks. Full feedback is available because the experiment explicitly pays to measure all three choices. It is not an uncharged counterfactual oracle.

Calibration uses **external field-station energy**, recorded in mission `energySpent` at 0.04 modeled energy units per probe. It is not debited from the foragers’ onboard batteries. Travel and toxic-harvest costs do debit those batteries. Thus mission energy includes both onboard expenditure and field-station calibration: the default 864 probes add 34.56 external units to every arm. This ledger is not a claim that all mission energy came from the initial onboard reserve.

Mutation and random search each score 16 candidates per calibration, including the incumbent. `trainingPolicyEvaluations` counts candidate/gate/rehearsal single-observation fitness scores. `diagnosticPolicyEvaluations` counts log-only and heldout single-observation scores. Their sum is `policyEvaluations`; live navigation calls are outside this offline count. `memoryRowUpdates` separately counts table updates and is never added as though it were a policy fitness score. Computation is not converted into fabricated dollars. Memory and fixed policies are computationally cheaper; the comparison makes that visible. Keeping the field-calibration charge equal isolates algorithmic use of identical evidence, rather than claiming to find the best overall sensing budget.

Selection uses the fitting set plus a small rehearsal sample from remembered cue buckets. A proposed policy must improve the fresh promotion sample by more than 0.005 reward and lose no more than 0.10 on any retained cue bucket. Otherwise the incumbent survives. Every proposed winner, parent, promotion, rejection reason and rollback is recorded in the lineage. The gate uses observed cue buckets, so ambiguous cues can make its retention protection fail.

The **frozen evaluator** uses a disjoint seed (`seed XOR 0x6a09e667`), a separate `HELDOUT-NEVER-TRAIN` namespace, 64 trials per ecology, and 0.03 more cue noise. Its outputs are logged only and never enter training or promotion. It samples unseen weather within the declared ecology family; it does not establish generalization to an arbitrary new world. The heldout score is one-decision resource reward, distinct from delivered cargo in the physical service simulation.

At phase boundaries the evaluator runs before calibration in the incoming phase. Forgetting is measured as heldout A reward after the first A minus heldout A reward after C, before A returns. Positive values indicate loss. The final heldout table includes original A/B/C and the actual returning ecology A or A′.

## Four ways the hypothesis can fail

1. **Four seasons:** clearly observable cues should make memory useful.
2. **Foggy cues:** overlapping noisy observations can cause incorrect context retrieval and damage retention.
3. **Indistinguishable:** all phases generate exactly the same observable cue distribution. No memory or policy can recover a hidden phase label from those cues.
4. **Changed home:** A looks familiar but now pays like B. Preserving yesterday's behavior can oppose current adaptation.

**Frozen claim criterion:** claim a mutation advantage only when the paired heldout-reward improvement over matched random search has a positive 95% lower bound in at least two regimes, mean A-retention loss stays at or below 0.10 in all regimes, and candidate evaluation budgets match exactly. Always compare delivered work with the simpler memory table before recommending mutation. This criterion preceded the first batch and was not changed to fit its results.

## Reproduce and inspect

Requires Node.js 22 or later, with no external dependencies or network.

```sh
npm test
npm run batch
npm run verify
```

`results.json` preserves 24 paired seeds × four regimes × four arms, every phase score, all promotion/rejection lineages, aggregate metrics, descriptive paired confidence intervals, and the exact model SHA-256. Verification recomputes 384 arm outcomes and all lineages. Source SHA-256, diagnostic policy fingerprints, promotion/rejection decisions, all work/energy/budget values, counts and structure remain exact. Explicitly named continuous evaluation fields alone have the portable rounding bounds described below; `npm run verify -- --exact` requires byte-for-byte equality everywhere. `record:false` changes only whether animation frames are retained.

The final model exports pure `policyScores()` and `policyAction()` boundaries and a standalone frozen evaluator. Policies cannot read an environment object, seed, phase label or payoff table. A fixed seed makes an experiment replayable, not an empirical claim about a deployed learning system.

## Limits and next falsification

Resource sites do not deplete and agents do not collide. Cue semantics and the broad ecology family remain stable in evaluation. A measured linear policy cannot invent new representations. Calibration is centrally collected, delivered without radio faults, and available equally to all arms: communication is isolated in the Shared Reality scenario. The retained gate bank is finite and observationally binned; it is not a guarantee against catastrophic forgetting. A next experiment should compare an explicitly priced new sensor or a small recurrent memory with the existing table, under the same unseen evaluator.

## 中文说明

觅食者依次进入 A、B、C，再回到 A。它们只能看到带噪声的天气线索，不能读取隐藏阶段或真实收益。比较固定习惯、正负经验记忆、有限参数突变与同预算随机搜索。采样、训练占用时间、候选计算、被拒绝方案和回滚都记录在案。最终评估使用独立种子与未参与训练的数据。简单记忆可以胜过复杂进化；如果世界在观察上不可区分，就不能靠增加搜索把缺失信息变出来。

校准使用外部野外站能源，每次探测计入 0.04 单位任务能耗，不扣除个体的随身电池；移动和有毒采集才从随身电池扣除。默认 864 次探测为每组增加 34.56 单位外部能耗。因此总任务能耗包含随身耗电和外部校准，两者不能混作同一初始电池预算。

Metric review (2026-10-03): computational accounting was separated by operation without changing any decision or outcome. Prior source/results are preserved in `diagnostics/pre-metric-correction/`. 中文：记忆表行更新、训练策略评分和诊断策略评分已分别计数；总策略评分只相加同单位操作，不再把行更新混作评分。所有决策和结果保持不变。

## Portable fingerprints and evaluation precision

The source/evidence pair predating this correction is preserved in `diagnostics/pre-portable-fingerprint/`, with a SHA-256 manifest. Linux x64 Node22.18.0 differed from macOS arm64 only in final-bit evaluation numbers (maximum absolute error 2.22e−16, maximum relative error 3.60e−15) and diagnostic fingerprints produced by hashing their full-precision policy serialization. No integer outcome or promotion decision differed.

Policy fingerprints now use `fnv1a32-policy-json-12-significant-digits-v1`: numeric values are represented at twelve significant decimal digits **only while constructing the diagnostic fingerprint**, with a `p12-` prefix. The policy, mutation, action selection, fitting, promotion gates and heldout evaluator retain their original full-precision numbers. Raw final policies remain available in `simulate(...).audit.finalPolicies`. This non-security fingerprint groups negligible representation noise; it is not a cryptographic identity or a claim that arbitrarily different policies are equivalent. The complete source file retains its strict cryptographic SHA-256.

The portable verifier permits a difference only in named heldout/retention summaries, continuous heldout statistics, per-epoch fitting/gate scores and phase-evaluation scores, and only when **both** absolute difference ≤ `2 * Number.EPSILON` (4.44e−16) and relative difference ≤ `32 * Number.EPSILON` (7.11e−15). Zero, null, integer counts, source hashes, normalized fingerprints, selection/promotion decisions, reasons, timestamps, useful work, energy, computational budgets and structure are exact. There is no near-zero absolute-only exemption; a tiny relative change cannot hide a gate flip. `--exact` remains available for full byte comparison.

`PORTABILITY_RECEIPT.json` records the exact transition comparison: all 384 arm summaries, aggregate statistics, phase evaluations, 6,144 non-fingerprint lineage entries and 384 raw final policies are unchanged; sixteen representative full arm trajectories also match exactly. The new evidence differs only in the declared fingerprint strings, fingerprint-method metadata and updated source hash. Tests establish stability for adjacent-float perturbations of representative policies, rejection of meaningful policy changes, and strict rejection of altered gates, fingerprints, source hashes, work, budgets or schema. Frozen unsuccessful hypotheses remain unsuccessful.
