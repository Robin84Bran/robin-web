# 06 — Many Small Windows vs. One Big Eye

The same 12,000 records are split into 1, 50 or 1,000 disjoint windows. Every arm reads each record once. Forty-eight local eight-record alternating motifs are planted alongside a global trend.

The local detector averages alternating offsets across its entire window. Short windows suit this particular detector; long windows dilute its signal. At defaults, local recall is 0%, 0% and 100% across all 32 seeds. That is a consequence of specified motif and detector geometry, not proof that more agents are smarter. Inspect false alarms as well as recall.

Global detection requires a window spanning at least half the dataset. Short-window readers abstain rather than invent an answer. Optional position-aware summaries restore global coverage by adding coordination work.

Equal record-reads are not equal FLOPs, tokens, latency or wall-clock cost. The coordinator merges summaries accumulated during reading; it does not reread input, but merging is additional work. No actual language model is evaluated.

See [how to play](../HOW_TO_PLAY.md), [rules](model.mjs), [all runs](results.json), and [CSV](results.csv).
