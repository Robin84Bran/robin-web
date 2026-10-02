# Development record

2026-10-03: first frozen 144-world / 432-arm batch completed. A subsequent accounting audit found that counting only command packets received after expiry necessarily returns zero: the transport correctly discards those packets before reception. Added an explicit issued-command ledger and disjoint delivered / expired-undelivered / still-pending totals. This is an accounting correction; it changes no controller decision, dynamics, randomness, coverage or energy outcome. The original model and batch are preserved in `evidence/`. Added a conservation assertion for command counts and regenerated and replay-verified the full batch.

The same boundary audit corrected summary bookkeeping when an intervention occurs exactly at the final recorded step: the intervention is counted and its unobserved ten-step recovery window is censored. Added a dedicated regression test. Default frozen batch outcomes are unchanged; all results were regenerated and verified against the final source hash.

Before the first frozen batch, the common navigation controller was corrected to turn before applying full thrust, and tick zero was made a true initial condition. These corrections applied identically to every arm. No arm was tuned after batch outcomes were observed.
