# Frozen experiment contract — The Useful Core

Frozen before the 2026-W44 evaluation.

## Question

When identical component failures reduce a system's capacity, should it keep
attempting the full job or deliberately preserve a narrower useful core?

## Matched world

- Eight abstract modules: three actuators, two sensors, one link and two power
  cells.
- Every policy sees the same current module state and receives one mode choice
  per tick.
- Failure, repair and correlated-shock draws are keyed only by world seed, tick
  and module. Policy actions cannot change the failure trace.
- Work tiers are fixed: full (12 units), reduced (6) and core (2).
- The graceful policy pays a fixed architecture overhead at full/reduced tiers
  and a configurable switching cost. The monolith has higher peak output.

## Policies

1. **Full job** — a learning-disabled baseline that always attempts the full
   bundle.
2. **Graceful shed** — chooses the highest feasible tier from current health.
3. **Core only** — a simple learning-disabled baseline that always attempts the
   smallest useful bundle.
4. **Random mode** — a seeded random baseline choosing one of the three tiers.

## Frozen evaluation

Ten named settings, seeds 1–64, four policies: 640 matched worlds and 2,560
policy outcomes. Development checks may use seeds 9001–9004. No evaluation seed
may be removed or replaced.

Primary outcomes remain separate: useful work, productive ticks, failed
attempts, mode switches and tier completions. There is no combined score.

## Promotion rule

Publish only if tests cover deterministic replay, matched failure schedules,
information boundaries, feasibility, accounting, correlated shocks and invalid
controls; the saved batch reproduces exactly; and the public game exposes the
trade-off on desktop and mobile. No policy must win. A calm-world loss by the
graceful architecture is expected evidence, not a failed experiment.

## Boundary

This is a synthetic teaching mechanism. Modules are not robot parts, organisms,
market positions or measured production services. Values, failures, repairs and
overheads are assumptions, not empirical calibration.
