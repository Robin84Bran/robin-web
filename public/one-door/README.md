# One Door, Many Hands

Weekly Intelligence · 2026-W40 · 29 September 2026

Play: https://iamrobin.ai/intelligence/one-door/

**A fleet can survive and still spend its day waiting at the door.** Split 24 units of carrying capacity into one large carrier, six medium carriers, or 24 small ones. Put the same doorway in front of every fleet. At round 61, break some carriers. Measure work delivered, not just bodies left alive.

This is an original synthetic queueing experiment. Nothing here is a reconstructed animal, a trained agent, a robot performance estimate or a trading strategy. Parameters were not fitted to observations.

## Try this first

Play seed 1, then scrub to round 120. Widen the door from 2 to 24 slots while keeping the seed fixed. Next set shared failure to 100%. A crowd can share one point of failure, even when its bodies are separate. Try more seeds; the 64-seed batch is the reference, not the prettiest animation.

## Exact rules

- Each fleet starts with total payload 24. Fleet sizes 1, 6 and 24 carry 24, 4 and 1 work units per crossing respectively. Work units are synthetic, divisible payload, not money or energy.
- Time is 120 discrete rounds. Every carrier is initially ready. A crossing delivers its full payload immediately; that carrier is ready again after `cycle` rounds. The omitted return journey is represented by this delay. All fleets have the same delay, regardless of body size.
- Each fleet has its own identical door: at most `slots` ready, surviving **bodies** pass each round. A large body consumes one slot just like a small body. This assumption deliberately favors concentrated payload under a bottleneck. It is a transaction-count limit, not geometric collision physics or a claim about real door widths.
- The same simple rotating queue serves every fleet, scanning from the unit after the last grant. It skips unavailable units and uses every available slot. There is no route choice, learning, reward adaptation, communication failure or hidden controller advantage. All arms are learning-disabled by construction; random failures are not a random-policy baseline. One carrier is the simple concentrated baseline; six carriers test an intermediate partition.
- At the start of round 61, losses become permanent. Each body has the same marginal failure probability `failure`, regardless of size. With probability `common`, a single failure draw applies to every body. Otherwise bodies have independent draws. These are two different failure mechanisms, mixed once per run, not a continuously correlated biological model.
- All arms use the same latent common-mode draw and the same unit-indexed failure draws. Changing door slots or cycle preserves the exact losses. Changing failure probability thresholds the same draws. Fleet sizes are paired, but do not have identical counts of independent draws.
- Units removed while in the return cycle disappear; no cargo inventory, debris, repair, energy use or setup cost is modeled. Work already delivered is retained. Failure rate equality does not match manufacturing cost or engineering reliability.

## Budgets and controls

| Control | Range | What changes |
|---|---|---|
| Seed | integer 0–4294967295 | Exogenous failure draws; no difficulty ranking |
| Door slots | 1–24; UI 1, 2, 4, 24 | Bodies served per round in each fleet's separate door |
| Failure chance | 0–1; UI 0%, 35%, 70%, 100% | Marginal loss probability for each body at round 61 |
| Shared failure | 0–1; UI 0%, 50%, 100% | Probability this run uses one shared draw rather than independent losses |
| Return cycle | 3, 6 or 12 rounds | Earliest next crossing after service |

Initial carrying capacity, cycle time, horizon, door service rule and per-body marginal loss probability match across arms. All controllers see only current readiness and survival, with no foreknowledge. The scheduler is identical and work-conserving. **Body counts, size, potential actuation count and internal compute are not matched.** This isolates a budget partition under stipulated physical constraints; it is not an intelligence benchmark or equal-cost hardware comparison.

## Predeclared comparison and results

Before running the model, the private job record fixed the 1/6/24 designs, 24-unit payload budget, 120 rounds, round-61 shock, 64 seeds and ten settings. The primary metrics are work delivered in rounds 61–120 and the count of zero-work runs. Secondary metrics are total work, survivors and ready-unit waiting rounds. No parameter was tuned to select a winner. All 640 runs (1,920 fleet outcomes) are in `results.json`.

| Setting | One: mean post-shock work | Six | 24 | Outages, one / six / 24 |
|---|---:|---:|---:|---|
| Default: 2 slots, 35% independent loss | 138.75 | 147.50 | 119.6875 | 27 / 0 / 0 |
| Wide door: 24 slots | 138.75 | 147.50 | 152.65625 | 27 / 0 / 0 |
| No failure, 2 slots | 240 | 240 | 120 | 0 / 0 / 0 |
| Fully shared failure, 2 slots | 150 | 150 | 75 | 24 / 24 / 24 |

Each row retains seeds 1–64. Other settings are one slot, four slots, 70% failure, half common mode, and cycles 3 and 12. See min/max and all individual outcomes in the batch. Zero observed outages is not proof of zero outage probability.

With a wide door and independent 35% failures, **all three designs have the same analytic expected post-shock work: 240 × 0.65 = 156** at cycle 6. Sample means differ because 64 seeds are finite. Redundancy changes the distribution: the exact complete-outage probability is `0.35^n` for n independent bodies, versus 0.35 for every design under fully common failure. In the mixture it is `common × failure + (1-common) × failure^n`. This follows from the encoded assumptions, not observed robot reliability. At two slots the 24-body fleet cannot deliver more than 120 units in the 60 post-shock rounds.

The lesson is conditional: splitting capacity reduces all-or-nothing loss under independent damage, while a body-count bottleneck penalizes smaller payloads. Six does best in the default sample; 24 does best in the high-failure sample. Neither is a universal winner. Correlated failure can erase the redundancy benefit.

## Reproduce and audit

Node 22+; no packages, credentials or network needed:

```sh
node --test tests.mjs
node batch.mjs --verify
```

`node batch.mjs` regenerates all ten batches. `--verify` recomputes and checks exact bytes, including the model SHA-256, without overwriting the saved results. `simulate()` returns every integer-valued frame; the browser imports that exact function. Download run exports controls, version, frames and summary. Replay is exact across tested Node and Chromium runtimes. Tests cover invalid controls, analytic zero-failure throughput, complete failure, common-mode coupling, door capacity, cycle timing, permanent losses and work accounting.

Canonical research: `06_intelligence/AI_research/AI_swarm/10_one_door/`. Explicit public allowlist: `README.md`, `model.mjs`, `client.mjs`, `tests.mjs`, `batch.mjs`, `results.json`. Private sources and review notes are not distributed. Earlier Swarm Lab worlds test information herding and attention; W39 tests search with non-depleting reward and no crowding costs. This experiment instead fixes carrying capacity and adds service contention and physical unit loss.
