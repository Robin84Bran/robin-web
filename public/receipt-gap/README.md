# The Receipt Gap

Weekly Intelligence, 2026-W41. An original synthetic experiment: when delivery succeeds but its acknowledgement disappears, should a worker retry?

Play: https://iamrobin.ai/intelligence/receipt-gap/

## Try first

Press **Show outcome** at the default seed. Compare delivered jobs, duplicate effects and confirmations separately. Then change key retention from whole run to 8 ticks. The receiver forgets protection while the outside effects remain. Finally reduce the credit budget to 24: careful bookkeeping is not free in this model. There is no combined score or universal winner.

## Rules and information boundary

18 distinct one-off jobs are ready at tick 1. Each policy gets its own identical world, 80 dispatch ticks and the same credit ceiling. At most one request may be sent per tick. Request and acknowledgement losses are independent. Each successful network leg takes an integer 1–delay ticks. After dispatch ends, 2×delay ticks drain every outstanding request and acknowledgement; later retries are not allowed.

A delivered request produces one irreversible toy effect. A received acknowledgement confirms its job. A missing acknowledgement does not distinguish lost request, slow message and completed effect. Only the evaluator and visual replay see actual effects; controllers see their own send timestamps/counts and acknowledgements. Controllers never read the hidden delivery state, packet queue or key ledger.

- **Send once:** tries each job once, never retries. Learning-disabled minimal baseline.
- **Retry oldest:** fresh jobs first, then the oldest eligible unconfirmed job. A sent job becomes eligible after the timeout.
- **Random retry:** the same eligibility/fresh-first rule, selecting randomly inside the pool. It spends the same credits per attempt as Retry oldest.
- **Retry + key:** exactly Retry oldest's dispatcher, but the receiver atomically remembers an intent key together with its effect. A repeat returns an acknowledgement without another effect while the key survives. Every keyed attempt costs 2 credits; all other attempts cost 1. This includes dropped and suppressed requests. The charge is a deliberately explicit abstraction, not a measured server price or equal CPU benchmark.

All arms have the same action opportunities and ceiling, not the same number of attempts. Receiver processing is instantaneous at arrival and unbounded per tick. There is no congestion, service outage, adaptive learning, malicious worker, payload change or key collision. Keys are unique integer job IDs; effect and key write are assumed atomic. A real system must establish that atomicity separately. No exactly-once guarantee is claimed for arbitrary external services.

The only ledger fault here deletes keys while effects persist. The global reset does not erase sender memory, drop packets or undo delivered effects. Expiry does not refresh when a duplicate is suppressed. Simultaneous requests are processed serially. This intentionally isolates retention, not a complete crash/recovery protocol.

## Parameters

| Control | Meaning |
|---|---|
| Seed | Unsigned 32-bit seed. Same controls and model version reproduce every event. Not a difficulty rank. |
| Credits | Common ceiling; keyed attempts cost two, others one. Unspent credits remain unused. |
| Request loss | Independent probability that an attempt never reaches the receiver. |
| Receipt loss | Independent probability that an acknowledgement is dropped after request arrival, including suppressed repeats. |
| One-way delay | Uniform integer travel time from 1 to this maximum for each nonlost leg. |
| Retry after | Elapsed ticks since last send before an unconfirmed job becomes eligible. A low value can retry a merely slow request. |
| Key retention | 0 means through the whole run; otherwise ticks after first recording, with expiry processed before arrivals. Only affects keyed receiver. |
| Forget keys | 0 means no reset; 40 clears only the receiver ledger before tick-40 arrivals. |

Replay is paused initially. Use Play/Pause, Step, Replay, Show outcome or the time slider. All controls support keyboard input. **Link this world** writes seed/controls into the URL. **Download run** exports all four trajectories, events and summaries. Visual numbers identify jobs; green means one effect, rust means duplicates, an underline means the sender has confirmation. Colour is supplementary to text and counts.

## Frozen batch and what happened

Before evaluation, EXPERIMENT.md fixed 10 settings × seeds 1–64 × four policies = **640 worlds / 2,560 policy outcomes**. All runs, including failures, are in results.json. Development sanity seeds were 9001–9004. No test-set parameter tuning or seed filtering. Summary ranges describe these toy draws, not uncertainty about real deployments. Paired keyed-minus-retry differences are retained for every seed.

Default means, out of 18 jobs:

| Policy | Delivered | Duplicate effects | Confirmed | Credits |
|---|---:|---:|---:|---:|
| Send once | 14.016 | 0 | 8.375 | 18 |
| Retry oldest | 18 | 13.844 | 17.844 | 40.469 |
| Random retry | 18 | 14.172 | 17.844 | 40.906 |
| Retry + key | 17.328 | 0 | 13.797 | 59.969 |

With retention reduced to 8 ticks, keyed duplicate effects average **5.281**. At a 24-credit ceiling, keyed delivery falls to **9.5** versus **15.984** for oldest retry. At 100 credits, both deliver all 18 in every sampled default-channel world; keyed effects remain unique. These are conditional tradeoffs, not a ranked winner.

Even the clean channel has **2.484** mean duplicate effects for oldest retry: the maximum round trip is 12 ticks, longer than the 8-tick timeout. Clean does not mean instantaneous. With all receipts lost, every policy has zero confirmation even while many jobs arrive. With all requests lost, none delivers anything. Protection from duplicates is not protection from non-delivery.

## Reproduce

Node 22.13+; no packages, API calls, accounts, network or credentials needed.

```sh
node --test tests.mjs
node batch.mjs --verify
```

`node batch.mjs` regenerates results.json. The verifier recomputes all outcomes and the SHA-256 of model.mjs. Only integer arithmetic, seeded hashes and exact-count statistics affect outcomes. client.mjs imports this same model. source.zip includes the model, UI, tests, batch, complete results and this guide.

This teaches a distributed-systems mechanism, not biological behavior, frontier-model performance or trading. Background: [AWS Builders' Library, Making retries safe with idempotent APIs](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/) explains request identifiers and retry semantics. The simulator is an original simplification, not a reproduction of AWS implementation or measurements.
