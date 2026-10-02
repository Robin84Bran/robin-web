# Learn, Forget, Evolve — observed evidence

24 paired seeds × 4 prespecified regimes × 4 arms = **384 arm outcomes**. No policy was retuned after the results. All hypotheses below are claims about this synthetic model only.

**The frozen hypothesis criterion did not pass.** Implementation tests and exact replay validation are separate and passed.

| Regime | Fixed work | Memory work | Mutation work | Random work | Mutation − memory paired 95% interval |
|---|---:|---:|---:|---:|---|
| four-seasons | 754.8 | 1149.5 | 931.0 | 864.8 | [-262.8, -174.3] |
| foggy-cues | 754.8 | 1015.3 | 738.4 | 723.0 | [-315.5, -238.2] |
| indistinguishable | 754.8 | 732.2 | 613.4 | 520.0 | [-161.5, -76.1] |
| changed-home | 485.4 | 996.3 | 768.5 | 799.6 | [-300.6, -154.9] |

In clearly distinguishable seasons, the memory table delivers 1,149.5 units versus 931.0 for mutation. The mutation-minus-memory paired interval is −262.8 to −174.3. Mutation uses 6,132 training policy scores plus 1,280 diagnostic/heldout scores, totaling 7,412 offline single-observation policy evaluations. Memory performs 192 separate table row updates, zero training policy scores, and 1,568 diagnostic scores. Fixed also has 1,568 diagnostic scores; those measurements do not train it. Both search arms have exactly matched training and diagnostic budgets. Every arm receives and pays for 864 physical calibration probes and 32 paused service ticks.

Mutation has a positive heldout-reward interval against matched random search in two regimes (foggy cues and indistinguishable cues). The latter advantage is tiny and does not restore useful identification of an unobservable phase. The full criterion fails because average retention loss exceeds 0.10 under ambiguity: approximately 0.236 with foggy cues and 0.611 with indistinguishable cues.

When every ecology has the same observable cue distribution, the fixed habit delivers 754.8 units versus 613.4 for mutation and 732.2 for memory. A remembered label cannot solve missing information; recency can erase formerly good behavior. The failed retention gate remains in the result, with its rejected candidates and rollbacks.

Changed home does not certify evolution either: simple memory delivers 996.3 units, mutation 768.5 and random search 799.6. The public interface should show these counterexamples rather than animate only successful learning episodes.

Intervals are descriptive paired t intervals over seeds (df=23, multiplier 2.069). Multiple regimes/metrics were inspected without a multiplicity correction. Raw runs, all metric summaries, model hash and the exact criterion are in `results.json`. Numerical rounding here is presentation only.

The accounting correction changes computation counters only. All trajectories, delivered work, toxicity, energy, heldout rewards, retention losses, lineages and acceptance decisions remain identical to the preserved pre-correction results. 中文：本次只修正计算计量：突变策略为 6,132 次训练评分加 1,280 次诊断评分；记忆策略的 192 次行更新另列，诊断评分为 1,568 次。所有实际行为和实验结论未改变。
