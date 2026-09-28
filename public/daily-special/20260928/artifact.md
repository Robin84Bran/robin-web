# Two arms, one jar

Bimanual comparison specification · 28 September 2026 · Daily Special, Signal 2

## Question and evidence

Does explicitly assigning acting and stabilizing roles improve jar opening when task, observations, demonstrations and total compute budgets are held constant?

This is a proposed comparison, not a robot experiment or a benchmark result. No training, simulation rollout or physical robot test was performed for this artifact. The narrow claim at stake concerns one asymmetric task, not all bimanual intelligence.

Four public primary sources were reopened on 28 September 2026, Hong Kong time:

| Source | What it establishes for this note | What it does not settle |
| --- | --- | --- |
| IROS 2026 workshop website [1] | A September 27 programme organized around scaling, structure and their combination | The programme does not establish a scientific consensus or the outcome of the comparison proposed here |
| ACT / ALOHA project, RSS 2023 [2] | ACT predicts sequences of actions from observations; a useful joint-policy starting point | A joint policy is not equivalent to two independent single-arm policies |
| ALOHA Unleashed [3] | The authors combine scaled demonstration collection with a Transformer diffusion policy for difficult bimanual tasks | Its results do not isolate data scaling from architecture or compare against this role ablation |
| VoxAct-B, CoRL 2024 [4] | Explicit acting/stabilizing roles, language and voxel representations; demonstrated jar and drawer tasks | This package changes more than role structure; its results alone cannot attribute a gain to roles |

The workshop is the current prompt. The earlier methods are background, not September 2026 discoveries. The source pages report their authors' work. This note does not independently reproduce their results or rank them by success percentages across different tasks.

## One task, two conditions, one ablation

Use a simulated two-arm jar-opening task first. Both grippers start in fixed poses; vary the jar pose and lid resistance within a predeclared, physically valid range. Success requires separating the lid while keeping the jar upright and within the workspace, before a common timeout, without human help. Freeze the geometry, separation threshold, upright tolerance and timeout before training. Archive simulator/version and collision geometry. This is a specification for future work; those implementation values have not been selected here.

- **A, joint baseline:** one policy observes both arms and the same scene, then predicts both arms' action sequences. It can learn coordination implicitly. Use an ACT-style action-chunking baseline, adapted identically for all conditions.
- **B, explicit roles:** use the same backbone, inputs, action interface and training objective, adding a role representation that distinguishes the arm stabilizing the jar from the arm acting on the lid. Roles are fixed within an attempt. Count extra parameters and role-assignment work inside the budget.
- **C, role ablation:** retain B's extra module and parameter count, but replace its informative role input with the same constant token in training and evaluation. This tests the value of role information within that implementation; it does not remove every architectural difference from A.

Precommit the exact module and role-assignment rule. Do not give B extra object poses, segmentation, language-model calls, labels or oracle information unavailable to A. Any annotations must be derived from the same demonstrations and made available to all conditions; log annotation effort separately. If these constraints cannot be met, describe the comparison as a bundle of changes, not an isolated test of roles.

## Freeze the shared resources

Proposed small design: 100 shared demonstration episodes, split by episode before extracting training frames; a separate validation set for checkpoint choice; 30 held-out initial scenes for evaluation; three training seeds per condition. Every trained policy receives the same 30 scenes. That yields 90 scheduled evaluation attempts per condition, 270 across A/B/C. These are design choices, not measured sample counts or a claim of statistical power.

Use the same camera views, image resolution, proprioception, pretraining, augmentations, demonstration ordering and training-data access. Prevent frames from the same episode crossing splits. Evaluate held-out poses and resistance settings, with the same seeded scene list across conditions. The result applies only to that scene distribution.

Freeze the hardware type, total accelerator-hour cap, parameter envelope, search-trial allowance, checkpoint rule and inference-latency ceiling before training. Apply the same caps to every condition, including failed runs and tuning. Log measured usage; unused budget remains visible. Equal training steps alone do not establish equal compute. Exceeding a cap makes that run ineligible for the matched-budget comparison; retain it as an over-budget observation. No numerical compute cap is invented here without a chosen implementation and hardware.

## Keep the unsuccessful attempts

| Measure | Definition for every condition |
| --- | --- |
| Unassisted completion | Attempts meeting the full success predicate without help / all scheduled attempts; publish numerator and denominator |
| Collision incidence | Attempts with any forbidden contact / all scheduled attempts; separately record inter-arm contacts, other forbidden contacts and peak impulse |
| Interventions | Attempts needing a stop, reset, manual correction or takeover / all scheduled attempts; report events and operator time separately |
| Completion time | Time to success for successful attempts, alongside all timeouts and time-to-stop for failures; never replace a timeout with a fast successful duration |
| Resource use | Training plus tuning accelerator hours, peak memory, inference latency and annotation effort, with stated measurement methods |

Define allowed contacts first: gripping the jar and lid is part of the task. A collision metric that counts those as failures would reward a robot for avoiding its job. Predeclare forbidden pairs and thresholds. Publish both the fraction of attempts affected and event counts; time-step contact counts alone can inflate a persistent contact into thousands of apparent collisions.

An operator rescue ends the unassisted attempt. Record assisted completion separately; do not silently restart its clock. A scheduled attempt that never starts stays in the ledger with its reason. Missing collision or intervention telemetry leaves that outcome unresolved, never zero. Provide both the scheduled denominator and the executed denominator where they differ.

## Read the result without choosing the winner first

Publish per-scene paired differences and results by training seed, not only pooled averages. The same 30 scenes repeat across seeds; 90 attempts are not 90 independent scene draws. Any interval or resampling method must preserve scene grouping and expose variation across training seeds. This small design is diagnostic, not certification for deployment.

A higher completion rate alongside more collisions or intervention is a tradeoff. Do not conceal it in a weighted score chosen after the result. A useful signal for explicit roles would be improved unassisted completion under the fixed budget, without worse collision or intervention outcomes, with B also improving on C. If A matches B, or the improvement survives removal of role information, the evidence does not justify assigning the gain to explicit roles. Inconclusive differences warrant a larger preregistered comparison, not a winner.

This card completes the research specification. Execution remains unperformed. Physical validation would require a separate authorized, safety-reviewed protocol; simulation alone would not establish robot safety, commercial reliability or an investment case.

## Sources

[1]: https://bimanual-robot-learning.github.io/
[2]: https://tonyzhaozh.github.io/aloha/
[3]: https://aloha-unleashed.github.io/
[4]: https://voxact-b.github.io/
