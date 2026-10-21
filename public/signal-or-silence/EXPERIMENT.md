# Signal or Silence — frozen comparison

Frozen before evaluation on 2026-10-21 HKT for `intelligence:2026-W43`.

## Question

When heartbeats disappear, can an observer distinguish a failed service from a
slow or lossy channel without either routing into an outage or declaring a
healthy service dead?

This is a synthetic failure-detector game. A service, network and heartbeat are
integer-tick rules, not observations of any live system. It authorizes no
infrastructure or account changes.

## Matched information budget

Every policy sees the exact same delivered heartbeat packets, including their
arrival ticks. Each emits one state per tick. None sees the hidden service state,
future packets, dropped packets or the evaluator's outage markers.

Three policies are fixed:

1. **Fixed timeout** emits UP until the most recent arrival is more than ten
   ticks old, then DOWN. It is the simple learning-disabled baseline.
2. **Adaptive timeout** updates a bounded moving estimate from observed arrival
   gaps and uses mean + three deviations + two ticks. It begins at eight ticks
   and remains within 8–30 ticks.
3. **Keep UNKNOWN** emits UP through age ten, UNKNOWN through age 26, then DOWN.
   It is a simple conservative baseline, not an adaptive learner.

All receive equal messages and state-decision opportunities. Compute, state
complexity and application costs are not equalized.

## Outcomes and failure checks

No combined score or universal winner is predeclared. Primary outcomes remain
separate:

- healthy ticks routed as UP (useful routing);
- healthy ticks falsely declared DOWN;
- healthy ticks withheld as UNKNOWN;
- true-outage ticks still declared UP;
- delay to first DOWN during a true outage.

Secondary outcomes are recovery delay, outage ticks labeled UNKNOWN and state
changes. `null` detection means no DOWN declaration in the observation window,
not zero delay.

The default world lasts 240 ticks. Heartbeats are attempted every four ticks.
Twelve percent are dropped; ordinary delay is 1–2 ticks; ticks 72–111 can take
1–14 ticks. The service is actually down on ticks 140–179. The expected
mechanism—not a required result—is a tradeoff between false accusation,
abstention and slow failure detection. Negative, tied and reversed results stay.

Reject or narrow the result if deterministic replay, identical evidence,
outage emission, state accounting or batch-byte verification fails. Do not
describe UNKNOWN as proof of safety, DOWN as verified causality, or this toy as
a production reliability measurement.

## Frozen batch

Seeds 1–64, all three policies, no filtering, across ten settings:

| Setting | Change from default |
|---|---|
| default | Delay burst, 12% loss and a 40-tick outage |
| clean network | No loss, no delay burst |
| no outage | Service remains up throughout |
| high loss | 30% heartbeat loss |
| long delay | Burst delay reaches 30 ticks |
| slow heartbeat | Heartbeat every eight ticks |
| short outage | Outage lasts twelve ticks |
| overlap | Delay burst overlaps the outage |
| aggressive | Fixed/UNKNOWN thresholds become 6/18 |
| patient | Fixed/UNKNOWN thresholds become 14/34 |

This is 640 matched seeded worlds and 1,920 policy outcomes. Development checks
may use seeds 9001–9004 only. Results do not change this protocol.

## Publication gate

Publication requires deterministic replay; invariants and failure-path tests;
complete retained results; source/method download; an honest parameter guide;
desktop and mobile control checks; SEO/canonical/schema checks; required GitHub
`verify`; protected merge; existing Cloudflare Workers Build; and exact live
byte verification.
