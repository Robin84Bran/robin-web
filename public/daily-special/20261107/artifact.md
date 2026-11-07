# The bookmark and the outside world

**Daily Special · 7 November 2026 · Signal 1**

Mistral AI introduced Managed Agents in public preview on 5 November 2026.
Its documentation describes a deployed agent continuing from its last finished
model call or tool call after a worker crash. That promise separates the
process doing today's work from the session record that survives it.

This research asks one bounded question: what does a tiny crash-and-resume test
show about the boundary between durable agent state and safe external action?

## The documented boundary

Mistral describes an agent as a model plus a harness. The harness runs the
model-and-tool loop, while a session records messages, tool calls and results.
In a Studio deployment, the session is stored separately from one worker
process, so another worker can pick up the record.

The tool documentation adds an important qualification. It says a deployed
tool runs at most once, while a lost call can leave the model unsure whether
the call took effect. For a tool that changes an outside system, Mistral
recommends a stable idempotency key so a repeated request refers to the same
operation. When the receiving service offers no key, the documentation
recommends checking for the original result before trying again. A read-only
tool needs neither safeguard because it leaves the outside system unchanged.

## One controlled interruption

The local test used a deterministic Python harness and one fixed string:

`managed-agent-recovery-2026-11-07`

Its only tool calculated the SHA-256 digest of that string. Immediately after
the harness atomically saved the tool result and the checkpoint
`after:sha256-local-string`, the first process intentionally exited with code
75. A second invocation loaded the checkpoint, verified the saved digest and
continued after the completed tool step.

| Observation | Result |
| --- | --- |
| Tool executions | 1 |
| Resume point | `after:sha256-local-string` |
| Repeated tool actions | 0 |
| External side effects | 0 |
| Final status | `COMPLETE` |
| Final digest | `f1e2734bd9b4b2971c2d610fef9d9b13592ca6b329b91f848436063b29631f49` |

The saved completion record worked like a bookmark placed after a finished
page. The replacement process opened the task at the next page instead of
performing the calculation again.

## What the test establishes

This single run establishes one narrow result: the tested harness resumed from
a persisted post-tool checkpoint and produced the expected result with zero
repeated tool actions. The test used local computation, local state and no
provider account, API key, model call or paid service.

The run does not validate Mistral's hosted runtime. It also does not measure
network partitions, overlapping workers, damaged state, cost, completion rate
or tools that change an external system.

An outside action creates a second ledger. A parcel service, payment system or
publisher may accept a request while its confirmation gets lost on the return
trip. The agent's session answers where processing should resume; the receiving
service's record answers what it already did. Reliable recovery keeps those two
answers connected through a stable request identity and an observable receipt.

## Evidence record

- Test script SHA-256:
  `f6836e5423a9d33caee7b3e193b9f006edf30c85add5ff502cbf69cf4381e638`
- Final state SHA-256:
  `58b31f9dbb140520edc34330d14d68f825f0a39df7a38d01c9c389abdffb4f9e`
- First invocation: intentional exit 75 after the completed tool checkpoint.
- Second invocation: exit 0 with the expected digest and `repeatedToolActions: 0`.

## Sources

1. [Mistral AI, “Le Chonk brings the brains. Studio puts it to work.”](https://mistral.ai/news/build-with-studio/), observed 7 November 2026.
2. [Mistral, “Managed Agents”](https://docs.mistral.ai/studio/agents/overview), observed 7 November 2026.
3. [Mistral, Agents SDK tool documentation](https://docs.mistral.ai/studio/agents/learn/agent/tools), especially “How a tool runs when deployed,” observed 7 November 2026.
4. [Mistral release notes](https://docs.mistral.ai/resources/release-notes), entry dated 5 November 2026, observed 7 November 2026.

Research cutoff: **7 November 2026, 09:10 Asia/Hong_Kong**. This is a
research artifact about one local recovery pattern. It is separate from any
production deployment, payment, publication action, transaction or underlying
vendor decision.
