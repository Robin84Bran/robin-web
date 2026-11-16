# Checkpoint or Restart?

Weekly Intelligence, 2026-W47. A deterministic queue toy about one narrow
question: when urgent work arrives, should a worker finish, discard its progress,
or spend an action to save its place?

Public game: `https://iamrobin.ai/intelligence/checkpoint-or-restart/`

## Try first

Show the default outcome. Then choose **3% interruptions**: finishing first can
protect ordinary throughput when urgency is rare. Choose **25% interruptions**:
saving a place can protect completed value, but its cost and urgent deadlines
still matter. Set checkpoint cost to three actions and watch the trade reverse
for some seeds.

## Rules and information boundary

Every policy gets one action per tick and the identical seeded urgent-arrival
trace. Normal jobs and urgent jobs have fixed work, value and deadline settings.
All policies see urgency and their own queue; none sees future arrivals.

- **Finish first** is a non-pre-emptive baseline.
- **Drop and restart** abandons ordinary progress before urgent work.
- **Checkpoint and return** preserves that progress after paying the save cost.
- **Coin flip** is a seeded random pre-emption baseline.

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
| Seed | Replays urgent arrivals and coin-flip decisions |
| Interruption chance | Chance of one new urgent job on each tick |
| Normal job work | Actions required for an ordinary job |
| Urgent deadline | Ticks before unfinished urgent work expires |
| Checkpoint cost | Save actions paid before urgent work begins |

## Limits

This is a scripted single-desk queue with perfect urgency labels and fixed job
values. It has no learning, communication, model calls, people, biology, money,
orders or capital. The original eight Swarm Lab worlds examine cooperation,
assembly, closure, memory, attention, taste and shared search. This world asks
about pre-emption and resumable work under matched interruption traces.

No empirical study has run. The Research programme records that follow-up as
upcoming.
