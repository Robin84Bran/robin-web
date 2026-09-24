# 08 — Shared Channel

One thousand rule-based searchers inspect 128 directions for 30 rounds. Sixteen directions contain planted signals. Isolated search samples uniformly; shared-board search can follow a promoted lead and later follows positive posts, with squared popularity weights.

Following probability is 1 − (1 − trust)^messageVolume. A noisy observation is not truth: true directions give positives with probability 0.8; false ones with probability 0.03. Accumulated positives must reach the selected threshold before a direction is flagged. False flags remain separately counted.

Effective diversity is exp(Shannon entropy)/128. The declared “collapse” line is 25%, a modeling convention, not a natural law. At default trust 0.25, tested message volumes 0, 1, 2, 4, 8, 16 first cross that line at 2 in all 32 runs. Yet all 16 true directions are still flagged at volume 2; at 8, only one is flagged. Diversity and useful coverage are different outcomes.

The isolated control and zero-volume/zero-trust shared arms are identical. The initially promoted lead can be made false without changing the number of true directions overall.

This is not a reconstruction of a named platform incident and uses no real message board, private messages or AI agents. See [how to play](../HOW_TO_PLAY.md), [rules](model.mjs), [all runs](results.json), and [CSV](results.csv).
