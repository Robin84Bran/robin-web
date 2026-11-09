# Work or Proof?

Weekly Intelligence, 2026-W46. A seeded workflow toy about one narrow question:
when only reviewed candidates count, how should a fixed team divide its action
budget between producing work and verifying it?

Public game: `https://iamrobin.ai/intelligence/work-or-proof/`

## Try first

Run the default world to the end. Then choose **Three candidates per review**.
The maker-heavy team changes from a clogged queue to the highest fixed-policy
accepted total. Restore one candidate per review and choose a 16-item queue.
Production can be busy while accepted work stands still.

## Rules and information boundary

Every policy receives the same number of action opportunities and draws from the
same seeded candidate-quality sequence. Producing places one hidden-validity
candidate in a FIFO queue. Reviewing inspects the oldest candidates perfectly;
valid items are accepted and invalid items are rejected. Items that wait too
long expire. A full queue blocks production.

- **Six make, two check** assigns 75% of actions to production.
- **Four make, four check** splits the budget evenly.
- **Two make, six check** is a verification-heavy, learning-disabled baseline.
- **Queue-aware** produces below a visible target and reviews otherwise.
- **Random split** makes a seeded 50/50 action choice.

Fixed policies produce first and review second within each tick. Queue-aware and
random act sequentially. Policies see queue state and past reviews, never hidden
quality or future candidates. Review has no false positives or negatives in
this model.

## Reproduce

Node 22+; no dependencies, credentials, networks, agents, organisms, employment
systems or financial systems:

```sh
node --test tests.mjs
node batch.mjs --verify
```

`results.json` retains ten settings × seeds 1–64 × five policies: **640 matched
worlds / 3,200 policy outcomes**. The browser imports the exact model used by the
batch. A fixed seed and controls reproduce every candidate bit and action.

## Results

The batch was generated only after `EXPERIMENT.md` froze the comparison. No seed
was removed. Mean accepted valid candidates:

| Setting | Six make, two check | Four and four | Two make, six check | Queue-aware | Random |
|---|---:|---:|---:|---:|---:|
| Default | 167.25 | **334.75** | 167.50 | 331.828 | 317.031 |
| Perfect quality | 240 | **480** | 240 | 476 | 454.828 |
| Noisy candidates | 83.734 | **167.281** | 84.625 | 165.859 | 158.391 |
| Review batch two | 334.734 | 334.75 | 167.50 | **443.891** | 333.063 |
| Review batch three | **503.234** | 334.75 | 167.50 | 499 | 333.516 |

In the default setting, maker-heavy averages 346 expiries, 72 blocked production
actions and 62 candidates still waiting. Balanced reviews every candidate with
no expiry or final queue. Checker-heavy accepts almost the same total as
maker-heavy but spends 480 review actions idle. Similar accepted totals conceal
very different failure modes.

The result reverses when one review action handles three candidates: maker-heavy
accepts 503.234 on average, versus 334.75 for balanced. Queue-aware is close at
499 while retaining eight unreviewed items by design. Review capacity, not a
universal maker/checker ratio, determines the useful split.

## Parameters

| Control | Meaning |
|---|---|
| Seed | Replays candidate quality and random-policy actions; not a difficulty rank |
| Actions | Total production-or-review opportunities per policy each tick |
| Candidate quality | Seeded probability that a produced candidate is valid |
| Review batch | Oldest candidates inspected per review action |
| Review deadline | Ticks an unreviewed candidate may wait before expiry |
| Queue limit | Maximum unreviewed candidates retained |
| Queue-aware target | Visible queue level where the adaptive policy switches to review |

Accepted, rejected, expired, blocked, idle and queued outcomes remain separate.
There is no composite winner.

## Limits

This is an original deterministic teaching mechanism, not an employee or model
productivity benchmark, quality-assurance prescription, agent-framework test,
biological model or financial system. Candidate validity is a seeded bit. Review
is perfect and equally difficult for every candidate. Rework, correlated errors,
reviewer mistakes, task heterogeneity, learning, safety severity, compute, money
and human judgment are absent.

No private conversation text is included. The original eight Swarm Lab worlds
test cooperation, assembly, memory, attention, taste and shared search. W40
tests a physical service bottleneck; W41 tests ambiguous delivery; W45 tests
integration topology. This world instead fixes one team's action budget and
counts only work that crosses an explicit verification boundary.
