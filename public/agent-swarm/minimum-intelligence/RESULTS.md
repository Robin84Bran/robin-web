# Minimum Intelligence — real decisions, observed outcomes

**333 genuine model calls completed; no failures, retries or accepted tool events.** Three Sol pooled plans, thirty Luna sector plans and three hundred independent local Luna plans were frozen before physical replay. The campaign took 1,069.025 seconds (17.8 minutes) with at most eight concurrent invocations.

| Strategy | Calls per world | Seed 17 | Seed 42 | Seed 99 | Mean delivered value |
|---|---:|---:|---:|---:|---:|
| 100 local rules | 0 | 2120.4 | 2913.4 | 2556.6 | 2530.1 |
| Pooled assignment rule | 0 | 2172.1 | 2756.2 | 2631.8 | 2520.1 |
| 1 Sol, pooled | 1 | 2401.5 | 2976.4 | 2312.1 | 2563.3 |
| 10 Luna, sectors | 10 | 2403.8 | 3069.2 | 2694.3 | 2722.4 |
| 100 Luna, local | 100 | 2423.8 | 3041.3 | 2744.2 | 2736.4 |
| 50 Luna + 50 rules | 50 | 2309.9 | 2960.6 | 2790.6 | 2687.0 |
| 10 Luna + 90 rules | 10 | 2173.4 | 2927.9 | 2611.1 | 2570.8 |
| 1 Luna + 99 rules | 1 | 2120.4 | 2921.1 | 2556.6 | 2532.7 |

The most useful observed contrast is architectural: **ten sector Luna calls retain 98.2%–100.9% of the value of one hundred independent local Luna calls** across these three worlds. They consume about 10.2% as many input tokens on average. Sector planners coordinate ten bodies and see pooled sector observations, so this is not a clean causal estimate of model size or agent count.

One hundred local Luna calls beat local rules in all three worlds, but the mean gain is **8.16%**, below the preregistered 10% practical screen. Sol gains 1.72% over the pooled rule on mean value and loses in seed 99. Both frozen practical screening criteria therefore fail. Three seeds support these recorded outcomes, not a broad superiority claim.

For the **replacement ablation**, fifty retained Luna cards are the smallest tested subset that reaches 95% of full-local-Luna value in every original world: 95.3%, 97.3% and 101.7%. Ten retained local Luna cards fail that screen on seed 17. These numbers must not be confused with the ten sector-planner architecture. A fifty-call observed knee is a pilot result for these subsets and worlds, not a universal optimum.

## What the models actually consumed

- Input tokens: **3,164,593**, including CLI/runtime overhead; **1,678,080** were reported cached.
- Output tokens: **18,557**; reasoning-output tokens reported separately by the CLI: **2,189**. Do not add categories without checking provider accounting semantics.
- Exactly **333** successful attempts; zero retries. Underlying immutable model snapshot: `null`.
- Actual subscription dollars: **null**. Equal-dollar frontier and equal-deadline superiority: **UNKNOWN**.

`modelCallWallMs` in each arm sums original successful call latencies; parallel campaign wall time is separately recorded. Mixed arms and altered-world replays reuse existing route cards. Their attributed costs are not additional calls and cannot be summed into independent campaign expenditure.

## Verification and retained limitations

**Ten tests pass.** All **288 physical arm outcomes** replay exactly: three genuine model seeds × four physical regimes × eight arms, plus twenty-four rule-only seeds × four regimes × two arms. The extra rule seeds do not increase the model sample size. All original outcomes, physical counterfactuals, call receipts and hypotheses remain inspectable.

Independent review validated all 333 receipts and rejected eleven deliberately corrupted receipt variants in memory. It identified two pre-release physical engine bugs: expenditure exceeding a depleted battery, and a double route advance after returning with partial cargo. Both were corrected before final evaluation and tested; prior source and diagnostic evidence are preserved. Frozen observations, model route cards and the preregistered comparison were unchanged.

The models plan once. They do not observe later depletion or shocks and cannot replan. Shared execution rules respond locally to empty depots, queues and energy; that common machinery is not model adaptation. The browser illustration is a 3D projection of a bounded 2D mechanism, not validated robot dynamics.

## 中文说明

333 次真实调用全部完成，没有失败或重试。三个世界中，十个 Luna 分区规划保留了一百个独立局部 Luna 约 98.2%–100.9% 的收益，但同时改变了信息汇总与协调方式，不能只归因为代理数量。局部一百 Luna 比同信息规则平均多 8.16%，未达到预先规定的 10% 门槛；Sol 也未通过全部世界胜出的门槛。替换消融中，五十个保留的 Luna 决定是达到全部世界 95% 收益的最小已测子集。这里没有持续重规划，也没有伪造美元成本或普遍优越性。
