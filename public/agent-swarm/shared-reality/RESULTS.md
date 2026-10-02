# Shared Reality — observed evidence

24 paired seeds × 4 prespecified regimes × 4 arms = **384 arm outcomes**. No policy was retuned after the results. All hypotheses below are claims about this synthetic model only.

**The frozen hypothesis criterion did not pass.** Implementation tests and exact replay validation are separate and passed.

| Regime | Private work | Echoed work | Source-aware work | Collector work | Source − echo paired 95% interval |
|---|---:|---:|---:|---:|---|
| patchy-weather | 898.7 | 949.3 | 933.8 | 931.5 | [-45.3, 14.3] |
| broken-radio | 898.7 | 948.5 | 946.9 | 874.4 | [-37.6, 34.3] |
| shared-delusion | 757.5 | 790.1 | 775.1 | 770.2 | [-57.2, 27.1] |
| yesterday-map | 937.2 | 926.3 | 940.9 | 925.5 | [-21.1, 50.3] |

Source-aware gossip improves mean work over private observation by 35.2 units in patchy weather (paired 95% interval 9.4–60.9) and 48.3 under the network break (14.1–82.4). This does not imply that its extra provenance machinery beats the simpler echoed-consensus policy: none of the four work differences excludes zero.

The strongest calibration advantage appears with yesterday’s map: source-aware Brier score is 0.015 lower than echoed consensus (paired interval −0.021 to −0.009). Lower is better. With shared sensor bias, it is 0.018 worse (0.008–0.029). Knowing who produced a wrong measurement does not establish its correctness.

Shared bias produces conditional false-consensus rates of approximately 51% for echoed consensus and 70% for source-aware gossip. These denominators differ: roughly 150 versus 55 qualifying confident-consensus checks per run. Report counts with rates. In ordinary weather, source-aware gossip has only about four qualifying checks per run; only 17/24 runs have any qualifying check. The other seven rates are null. Its zero error rate among those 17 observed runs is not proof of correctness.

The bounded collector loses mean work when radios break (874.4) compared with source-aware gossip (946.9); this is an observed architectural dependency, not a universal claim about central control. No omniscient controller or perfect command channel was smuggled into the comparison.

Work and Brier intervals use all 24 paired seeds (df=23, multiplier 2.069). Conditional false-consensus intervals use only pairs with two observed rates, with df=n−1. Every metric aggregate reports valid n; no observations means null, and n<2 means no confidence interval. Multiple regimes/metrics were inspected without a multiplicity correction. Raw runs, all metric summaries, model hash and the exact criterion are in `results.json`. Numerical rounding here is presentation only.

The metric correction changes valid counts and conditional-rate summaries, not trajectories, work, forecasts, Brier scores or hypothesis acceptance. Source-aware false-consensus rates are observed in 17/24, 10/24, 24/24 and 15/24 runs across the four regimes. Private observations have no qualifying consensus checks in ordinary weather, broken radio or yesterday’s map; their rate is null, not zero. Under shared bias, private observations have 23 valid rates averaging 24.45%.

中文：这次修正只处理未定义的条件错误率。四种场景中，来源可追踪策略有共识检查的有效运行数分别为 17、10、24、15（总数各 24）。没有检查的运行记为 null；汇总与配对区间只使用有效观察。产出、路径、预测、Brier 分数与原假设结论均未改变。
