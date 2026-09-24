# 07 — Taste Drift

Each of ten rounds generates 120 proposals. A fixed judge retains 24 using noisy evidence plus a familiarity bonus. Adaptive generators move their unusual/familiar mix toward what was retained. Protected explorers retain their original 50:50 proposal mix.

Truth is planted independently of unusualness. Purple means unusual, not correct. At default settings, final-round unusual true ideas retained average 0 with full adaptation and 0.28125 with 25% protected explorers over 32 seeds. Protecting generation alone leaves the selection bottleneck almost intact.

Blind-review slots test a different intervention: reserve some selections for evidence-only ranking. The saved 50% sensitivity batch is in [aggregate results](../results.json). Both arms get the same judge and selection budget.

This is a fixed scoring rule, not a model of human scientific judgment or measured expert bias. The hypothesis comes from Robin’s discussion; it is not a conclusion of the ART report.

See [how to play](../HOW_TO_PLAY.md), [rules](model.mjs), [all runs](results.json), and [CSV](results.csv).
