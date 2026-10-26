# The alarm is not the receipt

Research date: October 26, 2026, Hong Kong time. This artifact examines OpenAI's public Agents API documentation for Scheduled Automations. It proposes a bounded acceptance record for scheduled research work; it does not report a live automation test or an underlying financial decision.

## The bounded question

When a scheduled agent wakes up, what evidence distinguishes delivery from an accepted outcome?

OpenAI's documentation supplies a precise starting point. A saved automation can run once or on a cron schedule, and can either start a new session or continue an existing one. Each occurrence creates an invocation: a record of the attempt to send a task to the target session. An invocation starts as `queued` and becomes `completed` when delivery succeeds.

That word is narrower than it first appears. OpenAI states that completed delivery means a new session accepted its initial input, or an existing session accepted the notification and request to begin. It does not mean the agent completed the work.

## Five separate claims

| Evidence | What it supports | What it does not support |
| --- | --- | --- |
| Saved schedule | The timing and target were stored. | That an occurrence produced an invocation. |
| Invocation with `scheduled_at` | The API recorded an attempt for an intended time. | That the task reached a session. |
| Invocation status `completed` and a session ID | Delivery reached the target session. | That the root turn finished or produced a correct result. |
| Root turn `completed`, `failed` or `cancelled` | The turn reached a terminal state. | That every tool call succeeded or the output met the task's acceptance rule. |
| Inspected output, tool results and artifact | The application can evaluate the actual work. | That a future occurrence will behave the same way. |

OpenAI's Events and Items guide makes the middle distinction explicit: an idle session or closed stream alone is not success, and even a completed turn does not guarantee every tool succeeded. The application must inspect the output and tool results.

There is another gap between delivery and work. A session can require a function result, an environment connection or a computer-use approval. A scheduled notification does not supply those missing inputs or interrupt a turn that is already active. The alarm can ring while the work waits at the door.

## A proposed acceptance receipt

The following record is an editorial proposal, not an OpenAI API requirement. Its purpose is to join evidence that the API exposes at different layers.

| Receipt field | Why it matters |
| --- | --- |
| Schedule ID, target mode and `scheduled_at` | Identifies the intended occurrence and whether it used a new or continuing session. |
| Invocation ID, source type, status and session ID | Distinguishes a scheduled occurrence from a manual test and records delivery. |
| Root turn ID, start/end time and terminal status | Separates intended time, actual execution and completion state. |
| Input manifest and as-of timestamps | Shows whether the expected inputs were present and whether time-sensitive data arrived after the allowed window. |
| Tool results and error count | Prevents a green turn status from hiding a failed dependency. |
| Artifact path and SHA-256 | Binds the decision to the exact output that was inspected. |
| Acceptance rule and result | Records a pre-defined task test and its PASS, rejected, unfinished or unresolved result. |
| Usage, external cost and reconciliation state | Keeps a missing or late usage record from becoming a fictional zero. |
| Human-rescue minutes and intervention reason | Separates autonomous completion from a result that required recovery. |
| Retry and replay record | Shows whether recovery duplicated effects and whether a frozen rerun agreed. |

For time-sensitive research, lateness is more than an operations metric. OpenAI says recurring runs receive a small randomized delay, and work can wait longer if the target session is busy. A result labelled for 08:00 can therefore be produced later. If it reads data that did not exist at the intended snapshot and is archived as an 08:00 result, the timestamp becomes misleading.

A task-specific acceptance rule can prevent that. It might require a fixed set of inputs, a maximum quote or file age, no tool errors, an artifact hash and an as-of cutoff defined before the run. The exact rule belongs to the task. The important part is that the rule is written before the output appears.

## The denominator begins before the invocation

If reliability is measured only across recorded invocations, an occurrence that never created an invocation disappears from the denominator. A more complete measure begins with expected scheduled occurrences and joins forward:

**accepted outcomes / expected scheduled occurrences**

That ratio should not be reported from this research. No automation was run, and OpenAI's reviewed documentation does not publish a denominator-based reliability rate, a latency distribution or an all-in cost benchmark for Scheduled Automations. The formula is a proposed measurement boundary for a future test.

Human rescue also changes the meaning of success. An artifact can pass after an operator repairs a connection, supplies an approval or repeats an unfinished step. The outcome may still be useful, but it is not evidence of independent completion. Keeping rescue minutes beside the result makes that distinction visible without discarding the work.

## Cost and replay need qualifiers

OpenAI describes session and turn usage as best-effort. Usage can be `null`, can change as accounting arrives and is not a final bill. Missing usage therefore stays unavailable; it is not zero. A total cost record may also need external tools, infrastructure and human recovery, none of which can be inferred from token usage alone.

Replay answers a different question. With frozen input, acceptance rule and environment, a rerun can reveal variance. If two runs disagree, reproducibility is weak. If they agree, they can still be wrong in the same way. Replay is evidence about consistency, not automatic proof of correctness.

Recovery must also account for partial effects. OpenAI's error guidance warns that a failed turn may already have changed files or called external tools. Before retrying, an application should inspect saved work and completed effects, then use a bounded retry policy. For work with side effects, an occurrence key such as schedule ID plus `scheduled_at` can help the application recognize the same intended run; the exact idempotency design is application-specific.

## What this research establishes

The documentation supports one firm conclusion: scheduling, delivery, turn completion and task acceptance are different claims. The word `completed` on an invocation belongs to the delivery layer.

The proposed receipt is a way to connect those layers for a bounded future test. It may be more machinery than a simple read-only job needs; an artifact hash plus a deterministic schema check can sometimes be enough. The receipt should earn its complexity by exposing real gaps, not by creating a second monitoring system that is harder to trust than the work.

This public-source research completes the selected Daily Special. It does not run the proposed Quant test, place a trade, allocate capital, change a production schedule, send a message or resolve an underlying investment decision.

## Sources

1. [OpenAI, "Scheduled automations," retrieved October 26, 2026](https://developers.openai.com/api/docs/guides/agents-api/sessions/automations) — schedule types, target sessions, invocation fields, delivery meaning, randomized delay and busy-session behavior.
2. [OpenAI, "Events and items," retrieved October 26, 2026](https://developers.openai.com/api/docs/guides/agents-api/sessions/events) — terminal turn events, required actions, saved output and the limits of idle or completed status.
3. [OpenAI, "Observability and usage," retrieved October 26, 2026](https://developers.openai.com/api/docs/guides/agents-api/observability) — traces, turn inspection and best-effort usage limits.
4. [OpenAI, "Errors and recovery," retrieved October 26, 2026](https://developers.openai.com/api/docs/guides/agents-api/errors) — saved-state inspection, partial effects and bounded retries.
