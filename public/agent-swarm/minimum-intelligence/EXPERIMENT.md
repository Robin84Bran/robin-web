# Frozen pilot protocol — 2026-10-03

Written before this scenario's model calls or mission evaluation. The earlier transport-only one-number probe is excluded from scientific evidence.

## Question and frozen comparisons

How much model planning is useful for a finite salvage mission when every architecture has 100 identical physical bodies? Compare 100 independent `gpt-6-luna` local planners, ten independent `gpt-6-luna` sector planners (ten bodies each), one `gpt-6-sol` pooled planner, 100 deterministic local rules and a deterministic pooled assignment rule. Models use low reasoning effort through Codex CLI 0.160.0 with existing subscription authentication. Underlying immutable model snapshots are unavailable and must remain null.

Use world seeds **17, 42 and 99**, one planning epoch each: **333 successful independent model decisions**, subject to bounded, reported transport/format retries. A single response pretending to be 100 independent model instances is prohibited. Sol legitimately returns 100 coordinated routes in one call; sector planners return ten; local planners each return one. This is an architecture-plus-information comparison, not an isolated effect of model intelligence.

The local rule sees the identical local observation packet as its corresponding Luna. The pooled rule sees the identical aggregate union as Sol. All share public coordinates, physical rules, body count, cargo capacity and initial energy. No planner sees true stock/quality/risk, an environment seed, future outcomes, other planners' choices, or evaluator feedback. A route contains three distinct known depot IDs. Invalid responses do not silently become rule decisions.

## Physical mission

100 couriers, twenty depots, 240 ticks, speed 1.5, energy 120 per body, motion cost 0.25 per distance, cargo capacity four. True depot stock is finite (18–45 units), quality 2–10, and hazard probability 0.02–0.34. Initial readings are local (radius 24), noisy, and fixed across treatments. Each depot has two service slots and three-tick harvest service. A hazard costs eight energy. Cargo is useful only after returning to base. Empty sites or fifteen waiting ticks advance the route; full bodies return home. This universal execution controller never asks another model question.

Exogenous stock, quality, risk, motion perturbation and harvest hazards are keyed independently by seed/time/site/body; treatment RNG consumption cannot shift them. Congestion and depletion caused by choices are endogenous. Test counterfactual motion noise, service bottlenecks and mid-mission resource shocks by replaying **the same frozen plans**. These are robustness replays, not new model decisions or evidence of online adaptation.

## Ablations and evidence requirements

Replay 50, 10, one and zero Luna route cards among the same 100 bodies, using a deterministic seed-keyed body ranking. Remaining bodies use their original local-rule routes. Reused route cards are attributed to their original call receipts; they are not new independent trials. Count only selected calls/tokens for attribution, and separately report the full campaign cost and retry overhead. Do not sum the reused sweeps as additional independent evidence.

Primary metric: quality-weighted cargo delivered. Secondary: delivered units, energy spent, hazard failures, empty visits, queue waiting, alive bodies, calls, input/output/cached/reasoning tokens and observed call/scheduler wall time. Actual subscription dollars are **null**. An equal-dollar frontier and equal-deadline superiority are **UNKNOWN**, not free or zero-cost.

With three model seeds, report each paired outcome and means only; do not claim population-level superiority. A provisional practical advantage requires beating the same-information rule in all three seeds and at least 10% mean delivered value; this is a screening criterion, not statistical proof. A minimum-intelligence knee requires a tested mixed arm to reach at least 95% of full-local-Luna value in all three seeds; first check whether zero Luna already does so. Publish losses and failed criteria.

## Transport and reproducibility

Use no model tools, inherited project instructions, private files, apps, browser, network search, or multi-agent tools. Each invocation receives synthetic observations in an empty temporary workspace, with read-only sandbox and a short task-specific instruction file. Reject any tool-call event. Retain clean prompt/response hashes, exact public observation packets, model alias, CLI version, usage, latency, successful/failed attempt status and sanitized error class. Never publish session IDs, private paths or credentials.

At most eight concurrent calls; timeout 180 seconds, at most two attempts. Successful receipts are immutable and reused on resume. Both attempt usage and success attribution are reported. Keep raw synthetic evidence and deterministic model files beside the final results. Replaying saved decisions is deterministic; rerunning a stochastic model campaign is not guaranteed to reproduce them.

Source for task-specific system instructions: [OpenAI Codex configuration reference](https://learn.chatgpt.com/docs/config-file/config-reference), `model_instructions_file`. The file replaces the coding-oriented base instructions for this non-coding decision task; platform safeguards remain in force.
