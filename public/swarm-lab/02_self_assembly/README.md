# 02 · A body without a blueprint

72 particles share initial positions, short-range repulsion and deterministic noise. In the treatment arm they also attract locally. Choose a circular or square boundary, signal range and whether to remove the 14 particles nearest the center at step 90. Each arm receives the same removal rule, not necessarily the same particle identities after trajectories diverge.

**Read the result:** the largest connected component at step 160 contains on average 50.70% of survivors without adhesion and 96.93% with adhesion 0.8. The paired mean gain is 46.23 percentage points; treatment outcomes range from 51.72% to 100%. See [results.csv](results.csv) and [results.json](results.json). Not every seed produces one intact cluster.

**Try to break it:** turn adhesion down to zero (identical paths), reduce interaction range, remove damage, or change the boundary. Connectivity is determined by a distance threshold of 0.085; it is a measurement choice, not proof of biological function. Attractive force uses distance up to the chosen interaction range; positions update synchronously.

**Not a claim about:** living cells, intelligence, spontaneous organisms or healing. After damage there are exactly 58 particles; none grow back. An increase in connectivity is rearrangement, not regeneration.

Background: [Tufts Anthrobots research](https://now.tufts.edu/2023/11/30/scientists-build-tiny-biological-robots-human-cells) motivates the question; these particles do not model that biology. Reproduce from the parent directory with `node run.mjs`; inspect [model.mjs](model.mjs).
