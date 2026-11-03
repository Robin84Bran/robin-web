# The folder behind a five-minute thread

**Daily Special · 3 November 2026 · Signal 1**

Anthropic released Message Threads in beta on 2 November 2026. The feature lets
an application send a complete conversation once, then send only the newest
messages on later turns while Anthropic temporarily retains the earlier context.
Anthropic says this can produce smaller follow-up requests and a faster first
token. Its current release material describes those benefits qualitatively;
their size across everyday agent work remains a measurement question.

This bounded study asks what happens after the temporary context expires. It
reviews Anthropic's current documentation and tests one client-side recovery
path with a deterministic local service. The local run used no Claude request,
provider credential, model inference, production permission, external action or
provider charge.

## The documented contract

The first request uses `create` and includes the full conversation. The service
returns a response ID. A later `continue` request sends that ID together with
only the new messages.

Anthropic describes the retained thread as best-effort state. It expires five
minutes after the last request, while retained data is deleted within one hour
of its last use. A continuation may return HTTP 404 with the error code
`thread_not_found`; documented causes include expiry, regional unavailability,
and a referenced thread that failed or was deleted.

Recovery means creating a fresh thread and replaying the complete conversation.
The application therefore remains the source of truth for the history. The
TypeScript SDK helper keeps its copy in the running process's memory and sends
only new messages after the first turn. An application that must survive a
process restart needs its own durable ledger.

An everyday analogy is a folder left on a library desk. During a short break,
the reader can return with one new page because the earlier papers remain on the
desk. After the desk is cleared, the complete folder has to return. The desk is
a temporary convenience; the reader still owns the folder.

## One deliberate expiry

The test protocol was frozen before execution. A deterministic fake thread
service accepted two additions, 17 and 5. Its state lifetime was 300 seconds.
The client created the first thread, waited 360 seconds of real wall-clock time,
then attempted to continue. The fake service returned the documented
`thread_not_found` code. The client replayed its complete ledger in a fresh
create request.

| Measure | Observed local result |
| --- | ---: |
| Configured thread lifetime | 300 seconds |
| Deliberate pause | 360 seconds |
| Total wall-clock time | 360.104 seconds |
| Accepted final value | 22 |
| Expiry recoveries | 1 |
| Duplicate user-message IDs | 0 |
| Human interventions after start | 0 |
| Provider API calls | 0 |
| Provider cost | USD 0 |
| Local request attempts | 3 |

The three local attempts were a successful create, a continuation that received
the injected error, and a successful replay-create. The client produced one
accepted result and preserved each user turn once.

The test establishes a narrow result: this client recovered from this injected
expiry by replaying its ledger. The service, expiry and arithmetic response were
simulated locally. Live Claude latency, input-token savings, billing, storage
timing, output quality and duplicate behavior require measurements against the
actual platform.

## The larger design question

Message Threads changes how much history an application transmits during a
healthy exchange. Durable responsibility stays with the application. A useful
implementation needs a trustworthy conversation record and a bounded replay
rule.

External actions create a second responsibility. A replay creates another model
request. An application that books a trip, writes a database record or operates
a tool needs its own way to recognize an action that already completed. The
local arithmetic test exercised the conversation path; it made no external
change.

The most practical reading of the feature is therefore modest and useful.
Short-lived server state can reduce repeated transport while it remains
available. The application's own folder is what makes recovery possible when
the five-minute desk is cleared.

## Sources

1. [Anthropic Claude Platform release notes](https://platform.claude.com/docs/en/release-notes/overview), announcement dated 2 November 2026.
2. [Anthropic Message Threads documentation](https://platform.claude.com/docs/en/build-with-claude/message-threads), observed 3 November 2026.
3. [Anthropic TypeScript SDK helpers documentation](https://github.com/anthropics/anthropic-sdk-typescript/blob/main/helpers.md), observed 3 November 2026.

Research cutoff: **3 November 2026, 9:05 a.m. Asia/Hong_Kong**. The local result
is a credential-free failure injection, separate from live platform validation
or any adoption decision.
