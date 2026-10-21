# Signal or Silence

Weekly Intelligence, 2026-W43. A seeded failure-detector toy about a precise
ambiguity: when heartbeats stop arriving, the observer cannot directly see
whether the service failed, the channel slowed, or packets disappeared.

Public game: `https://iamrobin.ai/intelligence/signal-or-silence/`

## Try first

Show the default outcome, then scrub through ticks 72–111: the service remains
healthy while the synthetic network delays packets. Compare how often each rule
says DOWN. Next choose **No outage** with 30% loss. Finally choose a twelve-tick
outage: a patient detector may never say DOWN before the service returns.

## Rules and information boundary

The service attempts a numbered heartbeat every four ticks while it is UP. Each
packet independently receives a seeded drop draw and a seeded integer delay.
The default channel has 12% loss, 1–2 tick ordinary delay and a 1–14 tick delay
burst. The service is truly DOWN on ticks 140–179 and emits nothing then.

All three policies receive the same arrivals and emit one state per tick. None
can inspect true service state, undelivered packets, the future, or the outage
markers visible to the reader.

- **Fixed timeout** says UP until the last arrival is more than ten ticks old,
  then DOWN. It is learning-disabled.
- **Adaptive timeout** updates a bounded moving arrival-gap estimate. Its DOWN
  threshold is `mean gap + 3 × deviation + 2`, clamped to 8–30 ticks.
- **Keep UNKNOWN** says UP through age ten, UNKNOWN through age 26, then DOWN.
  It is a fixed conservative rule, not learning.

All policies have the same evidence and decision count. The adaptive rule uses
more state and arithmetic. No CPU, memory, application-loss or safety cost is
converted into a common score.

## Frozen results

`EXPERIMENT.md` fixed ten settings and seeds 1–64 before evaluation: **640
worlds / 1,920 policy outcomes**. Every run remains in `results.json`.

Default means, in ticks:

| Policy | Healthy UP | False DOWN while healthy | UNKNOWN while healthy | UP during outage | Delay to DOWN |
|---|---:|---:|---:|---:|---:|
| Fixed timeout | 193.156 | 4.516 | 2.328 | 7.844 | 7.844 |
| Adaptive timeout | 193.922 | 3.750 | 2.328 | 9.625 | 9.625 |
| Keep UNKNOWN | 193.156 | 2.047 | 4.797 | 7.844 | 23.844 |

The adaptive rule retained 0.766 more healthy routing ticks than fixed in the
default batch, but kept routing 1.781 ticks longer into the outage. At 30% loss,
it cut mean false-DOWN time from 14.141 to 7.484 while increasing outage-UP time
from 6.750 to 12.516. Adaptation traded one error for another; it did not infer
the hidden cause.

The UNKNOWN rule reduced false-DOWN time by withholding a binary claim. In the
no-outage stress it made zero false-DOWN declarations but spent 5.047 healthy
ticks UNKNOWN. In the default outage it spent exactly 16 outage ticks UNKNOWN
and reached DOWN after 23.844 ticks on average. During twelve-tick outages it
never reached DOWN in any of 64 runs; the adaptive rule reached DOWN in 49/64.
Missing detections remain `null`, not zero.

“Healthy UP” means a tick was eligible for useful routing in the toy; no request,
revenue, production traffic or user impact is simulated. A false DOWN, an
UNKNOWN abstention and an outage-UP tick are different outcomes and are not
silently combined.

## Parameters

| Control | Meaning |
|---|---|
| Seed | Replays the exact packet drops and delays; not a difficulty rank |
| Heartbeat | Attempt interval while the hidden service is UP |
| Packet loss | Independent synthetic drop percentage |
| Burst delay | Maximum seeded delay during the marked congestion window |
| Outage | Length of the hidden service outage; zero means no outage |
| Burst timing | Places congestion before or across the outage |
| Decision tempo | Changes fixed and UNKNOWN thresholds; adaptive bounds stay fixed |

## Reproduce

Node 22+, no dependencies, credentials, services, agents, financial systems or
network access:

```sh
node --test tests.mjs
node batch.mjs --verify
```

`client.mjs` imports the same model as the tests and batch. `source.zip` contains
the frozen contract, model, UI, tests, batch, complete results and this guide.

## Boundary and background

This is an original deterministic teaching model, not a φ accrual failure
detector implementation, service-level objective, production benchmark or
operational recommendation. Delay and loss are independent seeded abstractions;
clocks are perfect; one observer watches one service; there is no quorum,
Byzantine behavior, correlated packet loss, retry traffic, autoscaling, routing
topology, cost model or human escalation.

Hayashibara et al.'s [φ accrual failure detector](https://dspace.jaist.ac.jp/dspace/handle/10119/4784?locale=en)
motivates the distinction between a binary verdict and a continuous suspicion
level that can adapt to network conditions. This game uses a simpler bounded
moving timeout and a literal UNKNOWN state; it reproduces neither the paper's
algorithm nor its measurements.

The private weekly source scan supplied the question, not public prose, facts or
authority, and is absent from this package. W41 tested retries after missing
acknowledgements. W42 tested controller-state transfer across bodies. The eight
earlier Swarm Lab worlds do not test failure detection from silence.
