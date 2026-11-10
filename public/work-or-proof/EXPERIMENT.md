# Frozen experiment contract — Work or Proof?

Frozen before the 2026-W46 evaluation.

## Question

When only reviewed candidates count, how should a fixed team divide its action
budget between producing work and verifying it?

## Matched world

- Every policy receives eight action opportunities per tick for 120 ticks.
- A shared seeded candidate stream determines whether each newly produced item
  is valid. Policies see validity only when an item is reviewed.
- Review is perfect inside this toy and processes a configurable number of the
  oldest queued candidates per review action.
- Unreviewed candidates expire after a fixed deadline or remain explicitly in
  the final queue. A bounded queue records blocked production actions.
- Policies see the current queue and past review outcomes. None sees future
  candidate quality or hidden validity before review.

## Policies

1. **Six make, two check** uses six production and two review actions per tick.
2. **Four make, four check** splits the action budget evenly.
3. **Two make, six check** is the verification-heavy, learning-disabled
   baseline.
4. **Queue-aware** produces while the queue is below a visible target and
   reviews otherwise. It uses no quality oracle or future information.
5. **Random split** makes a seeded 50/50 choice for every action slot.

Fixed policies always assign production slots before review slots within a
tick. Queue-aware and random act sequentially. This ordering is explicit and
part of the mechanism. Equal action opportunities do not establish equal skill,
compute, latency, review depth, or real-world cost.

## Frozen evaluation

Default world: 120 ticks, eight actions per tick, 70% candidate validity, one
candidate per review action, 12-tick expiry, queue limit 64, queue-aware target
eight.

Ten named settings, seeds 1–64, five policies: **640 matched worlds / 3,200
policy outcomes**. Development checks may use seeds 9001–9004. No evaluation
seed may be removed or replaced.

Primary outcomes remain separate: accepted valid candidates, rejected invalid
candidates, expired candidates, blocked production actions, idle review actions,
review actions, and final unverified queue. There is no composite score and no
policy is required to win.

Settings: default; perfect quality; noisy candidates; review batch two; review
batch three; long deadline; short deadline; small queue; four actions; sixteen
actions.

## Promotion rule

Publish only if tests cover deterministic replay, shared candidate traces,
information and action boundaries, fixed policy allocation, candidate and action
conservation, expiry, queue limits, review batching and invalid controls; the
saved batch reproduces exactly; and the public game exposes the trade-off on
desktop and mobile.

## Boundary

This is an original deterministic teaching mechanism, not an employee or model
productivity benchmark, quality-assurance prescription, agent-framework test,
biological model, or financial system. Candidate validity is a seeded bit,
review is perfect, and every action has equal duration. Rework, correlated
errors, reviewer mistakes, task heterogeneity, learning, safety severity,
compute, money, and human judgment are outside the model. Private source text is
not part of this contract or public package.
