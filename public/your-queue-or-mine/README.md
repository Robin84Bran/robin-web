# Your Queue or Mine?

A dependency-free, seeded queue game about when an idle worker should take a
job from somebody else's lane.

## Finding

At the default uneven load, always-help completed **136.789** jobs on average
across seeds 1–128, versus **41.852** for stay-in-lane. Threshold-help completed
**135.266** with 63.398 handoffs, versus 97.625 for always-help. When arrivals
were balanced and each handoff cost eight actions, stay-in-lane completed
**132.445**, beating always-help at **131.313** and random-help at **129.695**;
threshold-help still completed **134.234**. Helping is useful here, but the rule
and transfer price matter.

## Rules and information boundary

Every policy gets four worker-actions per tick and the identical seeded job
trace. Jobs have fixed work, value and deadlines. All policies see their own
queues and current queue lengths; none sees future arrivals.

- **Stay in lane** is a no-transfer baseline.
- **Always help** takes the oldest job from the longest waiting queue.
- **Help a long queue** transfers only when a queue reaches the threshold.
- **Pick a queue** is a seeded random-help baseline.

## Reproduce

Node 22+; no dependencies or network:

```sh
node --test tests.mjs
node batch.mjs --verify
```

`results.json` retains nine settings × seeds 1–128 × four policies: **1,152
matched worlds / 4,608 policy outcomes**. The browser imports this exact model.

## Parameters

| Control | Meaning |
|---|---|
| Seed | Replays assignments and random-help choices |
| Arrival pressure | Chance that one job arrives on a tick |
| Load imbalance | Chance that a job lands in one seeded hotspot lane |
| Job work | Actions needed to finish one job |
| Deadline | Ticks before unfinished work expires |
| Handoff cost | Helper actions spent before transferred work begins |
| Help threshold | Waiting jobs required before threshold-help acts |

## Limits

This is a scripted four-lane queue with perfect queue visibility, fixed job
sizes and no communication failures. It has no learning, model calls, people,
biology, money, orders or capital. Earlier Swarm Lab worlds study shared search,
memory and coordination. This world isolates load transfer under matched jobs
and a fixed action budget.

No empirical study has run. The Research programme records that follow-up as
upcoming.
