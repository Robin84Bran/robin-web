# 01 · The city of freeloaders

Change colony mixing while holding payoffs, mutation, starting population and random draw keys fixed. Green cells pay a cost of 0.6; all colony residents receive benefit × the fraction contributing. Every generation rebuilds 12 colonies of 16 cells. Mixing chooses an independent payoff-weighted parent instead of the colony founder. This is an explicit assortment rule, not a genetic simulator.

**Read the result:** across seeds 1–32, mean final cooperation is 94.24% with shared founders and 3.40% at 90% mixing. The matched mean difference is −90.84 percentage points. See every seed in [results.csv](results.csv) and full parameters in [results.json](results.json).

**Try to break it:** set benefit to zero, or mixing to zero. Zero mixing makes the two arms identical; removing public benefit removes the model's reason to favor contributing colonies. The public-works index is descriptive, not a feedback mechanism. Population is fixed at 192; decline of cooperation is not population death.

**Not a claim about:** cancer, morality, genetic kinship in real tissues, or how humans ought to organize society. Individual payoff and colony composition are the complete rules here.

Source: [Avida-ED](https://avida-ed.github.io/) is a teaching inspiration, not the engine used here. Reproduce from the parent directory with `node run.mjs`; inspect [model.mjs](model.mjs).
