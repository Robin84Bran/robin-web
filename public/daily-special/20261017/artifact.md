# One timeout, six receipts

**Daily Special · 17 October 2026 · Signal 1**

## The bounded question

What can one deliberately injected tool timeout establish about an agent recovery layer, and what evidence keeps a successful retry from hiding lost state, duplicate work, human rescue or a much larger bill?

This is a protocol for a later read-only test. No eight-hour task, production workflow or fault injection was run for this research note.

## Why the final green check is not enough

OpenAI's Third Moment Research account describes an outer harness that examines unfinished agent trajectories and chooses whether to retry, terminate or escalate. It also describes a practical failure of a different kind: agents repeatedly polled a slow backtest, spending tokens and filling context while waiting. Together, those examples make the harness part of the system being evaluated, not background plumbing.

OpenAI's evaluation playbook makes the same point more formally. Tool access, state handling, retries, scoring and resource budgets can change measured performance. For a controlled comparison, the task, scoring rule and budget should stay fixed, and reports should expose attempts, wall time, cost and harness choices.

Reliability practice adds two further disciplines. Google's SRE guidance says a replayed fault does not by itself prove a repair and recommends retaining the exact action log or random seed, then repeating enough runs for the intended inference. Microsoft's reliability guidance calls for a clear hypothesis, a baseline, a contained blast radius, an abort path and comparison of degraded-state metrics with normal operation.

The combined lesson is simple: a timeout is only the stimulus. Recovery is the whole chain from detection to an accepted, delivered result with state and side effects intact.

## Freeze the pair before either run

Choose one task whose output has an objective acceptance test and whose tools can be replaced with read-only fixtures. Freeze these items before looking at either result:

- task input and input hash;
- model, reasoning setting, harness version and prompt;
- permitted tools, network boundary and read-only fixture versions;
- token, attempt, wall-time and cost budgets;
- acceptance test and delivery destination;
- the exact tool call that may time out;
- timeout shape, duration and injection rule; and
- abort conditions for unexpected side effects, scope expansion or state corruption.

Run a clean control and an injected treatment under that shared setup. In the treatment, return one deterministic timeout at the predeclared tool call. Do not secretly add a larger retry budget, a better prompt or a human hint. If the control and treatment receive different help, they are not a matched pair.

One pair is enough to test whether the measurement plumbing works and to inspect one recovery path. It is not enough to estimate a recovery rate or claim that the mechanism generalizes to eight-hour work.

## The six receipts

| Receipt | Evidence to retain | What it prevents |
| --- | --- | --- |
| 1. Fault | Timestamp, target call, injected response, duration and injection rule | Calling a naturally slow request an intentional test |
| 2. Detection | First trace event that recognizes the timeout and classifies it as retryable, terminal or escalation-worthy | Treating a blind repeat as diagnosis |
| 3. Resume | Checkpoint or state hash before the fault, state selected for resume and the reason for restart versus continuation | Hiding lost context or an accidental clean restart |
| 4. Side effects | Idempotency key or operation ID, write ledger and duplicate count; for this first test, outbound writes disabled | Finishing twice, messaging twice or charging twice |
| 5. Acceptance | Predeclared test result, output hash and reviewer evidence where judgment is unavoidable | Equating process exit with correct work |
| 6. Delivery | Destination URL or file, read-back hash, completion time and final receipt | Confusing local success with delivered value |

These receipts create a causal spine. They show that the selected fault occurred, the recovery layer noticed it, the system resumed from a known state, the result remained correct, and the requested artifact actually arrived.

## Measure the recovery tax, not only the rescue

For the control run record:

- accepted result: yes or no;
- wall time, model/tool calls, tokens and direct cost;
- active human minutes;
- duplicate or unauthorized side effects; and
- delivery proof.

Record the same fields for the injected run, plus fault-to-detection time and fault-to-accepted-delivery time.

The observed tax for this pair is:

```text
wall-time tax       = injected wall time - control wall time
machine-cost tax    = injected direct cost - control direct cost
human-attention tax = injected human minutes - control human minutes
duplicate-effect tax = injected duplicates - control duplicates
```

Negative values can occur, especially in stochastic systems; they are a warning not to overread one pair, not proof that a timeout makes an agent faster. Keep the raw values beside the differences.

Coordination burden is not merely whether a person touched the run. Separate active rescue, clarification, approval, review and passive waiting. A recovery layer that finishes autonomously but requires forty minutes of forensic review may still be expensive. Conversely, a correct escalation can be the best outcome when the state cannot be trusted.

## Four possible results from one injected timeout

1. **Accepted autonomous recovery.** The treatment detects the timeout, resumes within budget, preserves state and side-effect integrity, and delivers an accepted result without human rescue.
2. **Accepted assisted completion.** The final result passes, but a person supplies information, restarts work, repairs state or changes the plan. This is delivery evidence, not autonomous recovery.
3. **Correct stop or escalation.** The system refuses to continue from uncertain state and produces a usable handoff. This can be operationally valuable, but it is not task completion.
4. **Failed or unresolved recovery.** The result is wrong, missing, duplicated, outside budget, not delivered, or cannot be attributed to the recovery layer.

A clean exit code belongs inside the evidence. It does not choose among these four outcomes.

## What one pair can change

If both runs are accepted and the injected run has traceable recovery with no extra human attention or side effects, the pair shows that this particular recovery path worked once under the frozen setup. It also supplies an observed recovery tax.

If the injected run needs rescue, loses state, duplicates an operation, breaches a budget or fails delivery, the pair reveals a concrete weakness worth repairing. That negative result is often more useful than a smooth demo.

To make a broader reliability claim, repeat the pair across predeclared seeds and failure positions, then across a representative task set. Report the denominator, unresolved runs and confidence interval. A new harness, retry budget or task distribution creates a new comparison.

## Method and limits

The selected action was treated as a research lead, not authority to run a long task or alter an operating system. Four public first-party sources were reopened on 17 October 2026. The design above combines their published principles with an original six-receipt measurement card.

The protocol has not been executed here. There is no measured baseline, injected trajectory, recovery rate, coordination saving, latency or cost result. The research artifact is complete; the underlying experiment and any operating decision remain separate.

## Sources

1. [OpenAI — How Third Moment Research runs 10,000 agents for 36+ hours, 14 October 2026](https://openai.com/index/third-moment-research/)
2. [OpenAI — A shared playbook for trustworthy third party evaluations, 29 May 2026](https://openai.com/index/trustworthy-third-party-evaluations-foundations/)
3. [Google SRE — Testing for Reliability](https://sre.google/sre-book/testing-reliability/)
4. [Microsoft Azure Well-Architected Framework — Reliability testing strategy](https://learn.microsoft.com/en-us/azure/well-architected/reliability/reliability-test)
