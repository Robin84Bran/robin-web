# The Useful Core

Weekly Intelligence, 2026-W44. A seeded degradation toy about one narrow
question: when component failures remove capacity, should a system keep pursuing
the full job or preserve a smaller useful core?

Public game: `https://iamrobin.ai/intelligence/useful-core/`

## Try first

Run the default world to the end, then choose **No shocks** and **0% failure**.
The full-job architecture should recover its peak-throughput advantage. Next use
a four-module shock with slow repair. Watch which modes remain feasible rather
than looking only at the final work total.

## Rules and information boundary

The world has eight abstract modules: three actuators, two sensors, one link and
two power cells. Full work needs all eight and yields 12 units. Reduced work
needs two actuators, one sensor and one power cell and yields 6. Core work needs
one actuator and one power cell and yields 2.

Every policy receives the same current module state, the same failure/repair
events and one choice per tick. Policies cannot alter or see future failures.

- **Full job** always attempts the 12-unit bundle. It is learning-disabled and
  has no reconfiguration overhead.
- **Graceful shed** chooses the highest feasible tier. Its modular architecture
  yields only 10/5/2 units before switching cost, so resilience is not free.
- **Core only** always attempts the smallest bundle. It is a simple
  learning-disabled baseline.
- **Random mode** chooses full, reduced or core from a separate seeded draw.

Independent failures, repairs and correlated shocks are explicit model inputs.
There is no hidden learning, spare inventory, maintenance queue, task priority,
human intervention or financial value.

## Reproduce

Node 22+; no dependencies, credentials, network, agents, robots, organisms or
financial systems:

```sh
node --test tests.mjs
node batch.mjs --verify
```

`results.json` retains ten settings × seeds 1–64 × four policies: **640 matched
worlds / 2,560 policy outcomes**. The browser imports the exact model used by
the batch. A fixed seed and controls reproduce every component event and policy
decision.

## Results

The batch was generated only after the frozen `EXPERIMENT.md` contract. No seed
was removed. Means across seeds 1–64:

| Setting | Full job work | Graceful work | Core work | Random work |
|---|---:|---:|---:|---:|
| Default | 128.438 | **454.906** | 203.438 | 254.875 |
| Calm | **1,440** | 1,200 | 240 | 812.125 |
| Harsh | 24 | **127.797** | 86.031 | 64.5 |
| No repair | 49.125 | **119.453** | 53.281 | 66.281 |
| Fast repair | 408.938 | **693.094** | 233.031 | 432.625 |

The graceful policy is not a free improvement. In the calm world it gives up
240 units to architecture overhead. In the default batch it remains productive
for 101.719 ticks on average, but changes mode 17.984 times; switching cost
reduces its mean work from 470 with free switching to 430.484 at cost three.

The full-job policy averages only 10.703 productive ticks in the default setting
because one missing required module blocks all 12 units. Core-only is productive
for the same 101.719 ticks as graceful shed, but deliberately leaves higher
tiers unused. These are consequences of the encoded requirements, not measured
reliability claims.

## Parameters

| Control | Meaning |
|---|---|
| Seed | Replays the exact failure, repair, shock and random-policy draws |
| Failure | Independent per-ready-module probability each tick |
| Repair | Independent per-down-module return probability each tick |
| Shock | Number of currently ready modules removed at each shock interval |
| Shock interval | Ticks between correlated shocks; zero disables shocks |
| Switch cost | Work deducted when graceful shed changes tier |

## Limits

This is an original deterministic teaching mechanism, not a robot benchmark,
biological model, reliability forecast, production architecture recommendation
or trading system. “Useful work” is an assigned integer. Failure and repair
rates are synthetic. Equal module counts do not establish equal engineering
cost, mass, energy or capability in reality.

The private weekly scan supplied the question, not public prose, facts or
authority, and is excluded from the package. The original eight Swarm Lab worlds
do not test component-level graceful degradation. W40 tests splitting carrying
capacity across bodies; W43 tests inference from missing heartbeats. This world
instead holds one abstract system's failure trace fixed while its work policy
changes.
