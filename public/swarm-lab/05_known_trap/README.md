# 05 — The Already Known Trap

Two searchers inspect the same 120 synthetic neighborhoods with 24 planted anomalies and 24 repeat-only decoys. One sees a “known” label; the other does not. A label discount is an explicit imposed priority rule, not a claim that people or AI actually use it. Ranking uses observable repeat evidence, never the hidden truth label.

With defaults, each search inspects 60 neighborhoods. Across seeds 1–32, mean true-anomaly recall is 62.76% with labels hidden and 56.77% with labels visible. The gap depends on the finite budget and imposed discount. At discount zero, trajectories match. A full scan removes the end-point coverage gap.

Noise can create false alarms, reported separately. Known-label assignment is independent of truth. These are abstract feature scores, not simulated DNA sequences or biological discoveries.

See [how to play](../HOW_TO_PLAY.md), [rules](model.mjs), [all runs](results.json), and [CSV](results.csv). Background: [Anthropic’s ART report](https://www.anthropic.com/news/claude-discovers-novel-enzyme-system). That report does not establish why humans missed the pattern; this experiment tests one proposed mechanism.
