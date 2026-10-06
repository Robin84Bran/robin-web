# The Receipt Gap — frozen comparison

Frozen before simulation evaluation, 6 October 2026.
Question: under a fixed action-credit budget, how do lost acknowledgements turn retries into missed or duplicate effects?
18 one-off delivery intents, 80 dispatch ticks, followed by a bounded drain. Four fixed controllers: send once, oldest-timeout retry, random eligible retry, oldest-timeout retry with an atomic receiver key ledger. No learning, models, biological or financial claims.
Primary outcomes: distinct intents delivered, duplicate effects, confirmed intents, action credits used. No composite winner. Same initial intents, horizon, credit ceiling, request/ack channel draws keyed by seed/job/attempt. All decisions see only local send history and received acknowledgements. Receiver ledger is a treatment, not extra controller information. Every keyed attempt costs two credits versus one; no claim of equal physical compute.
Default: budget 60, request loss .2, acknowledgement loss .4, maximum one-way delay 6 ticks, timeout 8 ticks, key retention whole run, no ledger reset.
Predeclared 64 seeds (1–64) for each setting: default; clean channel; all requests lost; all acknowledgements lost; tight budget 24; ample budget 100; timeout 2; delay 12; retention 8; reset ledger at tick 40. All arms retained. Development sanity checks use seeds 9001–9004 only. Report mean/range and paired differences; finite toy samples, no empirical confidence claims.
Promotion to the website requires deterministic replay, conservation/budget/no-oracle tests, boundary cases, source download, desktop/mobile controls, discoverability/SEO and protected verified publication. Negative and counterexample results are valid outcomes. No tuning to force a keyed or swarm win.
