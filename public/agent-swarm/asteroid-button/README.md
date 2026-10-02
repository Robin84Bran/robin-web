# The Asteroid Button

Press a synthetic catastrophe and count useful material delivered to the depot. Three frozen fleets have the same total payload capacity (120) and initial energy (18,000): one carrier of 120, twenty-four carriers of 5, or six carriers of 10 plus twelve of 5. All use the same sensing, route, loading, return, and contact-detour rules.

Deposits contain 800 total units. Every policy begins knowing planned deposit locations; current availability arrives only within a ten-unit sensor radius or through peers. A body must mine and transport material home. Loading rate is proportional to payload, movement has a small capacity-dependent speed penalty, and every body pays a per-body movement overhead. Distribution is therefore not free.

Independent body damage uses keyed Bernoulli draws. Correlated damage uses one circular spatial footprint shared across all fleets; the loss control sets nominal circle area relative to the world, not guaranteed realized mortality. The footprint can overlap world edges or miss carriers. This deliberately exposes correlated co-location rather than inventing independent redundancy.

Separate controls remove resources, kill bodies, corrupt sensors, interrupt reports for 90 ticks, or create a rubble barrier. Compound catastrophe applies all five. Controllers are unchanged after shock. Radio failure does not delete memory or prevent local action. Material lost with bodies and removed deposits is separately counted.

## Frozen comparison and criteria

Version 1.0.0 is evaluated across 24 matched seeds and eight declared regimes: calm clustered bulk work, independent body loss, clustered correlated loss, compound catastrophe with 90% of remaining resources removed, isolated radio silence, isolated resource loss, isolated sensor corruption, and isolated rubble. The last three were added before evaluating their batch results to cover every single fault mechanism; they were not selected by performance. No architecture must win. Engineering acceptance requires material conservation, matched initial budgets, no budget overspend, deterministic replay, fault isolation, and identical pre-shock actions in shocked and unshocked runs.

The primary displayed outcome is **absolute material delivered**. Report post-shock work beside retention: retention divides actual post-shock work by a same-seed, same-fleet simulation with all faults removed. That counterfactual is evaluator-only. A ratio can exceed one when disruption redirects an inefficient frozen route; it is not clipped. A high ratio with low useful output is not success.

Recovery is the first 40-tick delivery window reaching 90% of the fleet’s own pre-shock 40-tick rate. `recoveryTicks: null` and `recoveryCensored: 1` mean the run ended without establishing recovery, or the pre-shock rate was zero; these cases are never assigned zero or averaged as recovery. Tail zero-post-work frequency is reported. Paired bootstrap intervals compare each fleet against the concentrated fleet within each regime, alongside all absolute outcomes.

## What the illustration does and does not claim

The scene projects planar logistics into an illustrative 3D sketch. This is not asteroid-impact physics, autonomous robot field validation, evolutionary morphology, or biological survival evidence. Damage is abrupt and abstract; carriers have ideal self-localization. A large carrier cannot split itself, and each small carrier has its own overhead. Results identify consequences of these explicit mechanisms and chosen geography, not an inevitable swarm victory.

## Commands

```sh
npm test
npm run batch
npm run verify
```

`model.mjs` is dependency-free browser/Node ESM. `batch.mjs` saves source hashes, run-level summaries, aggregate distributions and paired intervals; verification exactly regenerates saved results.
