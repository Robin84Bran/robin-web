---
title: "The alarm is not the receipt."
date: "2026-10-26"
updated: "2026-10-26"
section: "Ouroboros"
series: "Daily Special"
lane: "RESEARCH"
tags: ["AI Agents", "Automation", "Reliability"]
keywords: ["OpenAI Agents API automations", "scheduled agent reliability", "acceptance receipt", "agent observability"]
categories: ["Research", "Systems"]
excerpt: "A scheduled agent can wake up, accept work and still produce nothing usable. The evidence that separates an alarm from an accepted outcome lives across several records."
hero: "/daily-special/20261026/hero.png"
ogImage: "/daily-special/20261026/og.png"
canonical: "https://iamrobin.ai/ouroboros/202610/20261026/special/"
author: "https://iamrobin.ai/#person"
inLanguage: "en"
draft: false
translationReview: "PASS"
sourceSignal: 1
researchScope: "A bounded public-source study of what OpenAI Agents API schedule, invocation, session and turn evidence proves; no live automation or Quant test, trade, allocation, message or underlying decision."
artifactSha256: "9c958332e94b3f43b75a4996983c3ba13f3188fdc0f0232b4732b41bfcb97bf5"
evidenceSources: ["https://developers.openai.com/api/docs/guides/agents-api/sessions/automations", "https://developers.openai.com/api/docs/guides/agents-api/sessions/events", "https://developers.openai.com/api/docs/guides/agents-api/observability", "https://developers.openai.com/api/docs/guides/agents-api/errors"]
---

At 08:00, the alarm fires. A new invocation appears. Its status turns green.

The daily note does not.

This is the small but consequential gap inside scheduled agents: a system can prove that it tried to deliver work long before it can prove that the work finished, finished correctly, or produced something worth accepting.

OpenAI's Agents API documentation keeps those events separate. A schedule can be periodic or one-time, and it can start a new session or continue an existing one. Each occurrence creates an invocation—an attempt to send work. When delivery succeeds, that invocation becomes `completed`.

The word is narrower than it sounds. Here, completed means the session accepted the initial input, notification or request. It does not mean the agent completed the job.

That is not a flaw in the status. It is a flaw in any dashboard that asks the status to prove more than it can.

## Five green lights that mean different things

The useful mental model is an evidence ladder:

1. **Scheduled.** A valid schedule exists. Nothing has necessarily fired.
2. **Invoked.** An occurrence created an invocation. Delivery has not necessarily succeeded.
3. **Delivered.** The invocation is completed. The session accepted the work; the agent has not necessarily finished it.
4. **Turn ended.** Session events show the root turn completed, failed or was cancelled. Individual tools may still have failed, and side effects may already have happened.
5. **Accepted.** A check written for this particular task says the result is usable.

The first four are platform evidence. The fifth belongs to the owner of the task. Only that owner knows whether a market note used complete inputs, whether a report covers the promised date, or whether a generated file matches the required schema and hash.

This distinction changes the denominator. “Delivered invocations divided by invocations” measures transport. “Accepted outputs divided by scheduled occurrences” measures the outcome. Both can be reported honestly, but they answer different questions.

## How a green run can go nowhere

Imagine an 08:00 research job. This is an illustration, not a run that took place.

The invocation is delivered. The session accepts it. The agent reads two sources, then reaches a tool that needs a function result, an environment connection or an approval. A scheduled notification cannot provide any of those. The run waits.

If the monitor treats delivery as success, it is already wrong. If it treats an idle session as success, it is wrong again. The application has to follow session events and inspect the root turn outcome.

Even a completed turn is not the whole answer. A tool inside the turn may have failed. A plausible paragraph may sit on top of a missing source. A failed turn may already have changed a file or called a tool, which makes a blind retry capable of duplicating effects.

The timing can also drift before any of this begins. OpenAI says recurring runs receive a small randomized delay, and an invocation can wait longer when its target session is busy. The scheduled time is therefore an intention, not evidence of the exact execution time. For time-sensitive research, lateness can become an input-quality problem rather than a merely cosmetic delay.

## Attach acceptance to the schedule

The simplest repair is one joined record. Call it an acceptance receipt.

This is an editorial proposal, not an OpenAI feature or requirement. The receipt would connect the schedule occurrence, invocation, session, root turn and final artifact. It would preserve the facts needed to answer a plain question: what did this scheduled wake-up actually achieve?

For a serious job, I would record:

- the schedule and intended occurrence;
- the invocation and delivery result;
- the session and root turn's terminal state;
- missing inputs and failed tools;
- the artifact's timestamp, schema result and hash;
- retries, replays and any human rescue;
- provisional usage and cost; and
- a task-specific decision: accepted, rejected, unfinished or rescued.

Usage deserves special restraint. The documentation describes usage as best-effort: it can be null, can change after the turn, and is not a final bill. A blank field is missing evidence, not free work.

The receipt should also stay proportional. A read-only job with no external effects may need only an artifact check, a schema check and a hash. A job that writes files, calls tools or can trigger further work needs a stronger ledger and a bounded retry rule. The receipt itself is software; overbuild it and it becomes another failure surface.

Replay helps, but only with the question it can answer. Frozen inputs can reveal variance between runs. Several agreeing runs can still be wrong, so replay does not prove correctness or predict future performance.

## What this research does not establish

I found no public denominator-based reliability rate, latency distribution or all-in cost benchmark for these scheduled automations. No live automation or Quant forward test was run for this Special. No trade, capital allocation, message or underlying decision took place.

The completed work here is smaller: a source-verified map of the evidence boundary. A wake-up is an event. An accepted outcome is a judgment. Between them sit delivery, execution, tool results, artifacts and the rule that decides whether the result is good enough.

The next time a scheduled agent turns a dashboard green, do not ask only whether it ran. Ask what evidence crossed the final gap.

## Notes and sources

OpenAI's documentation describes [scheduled automations][1], [session events and root turns][2], [traces, trace grading and provisional usage][3], and [error recovery and bounded retries][4]. The full [research artifact](/daily-special/20261026/artifact.md) preserves the evidence map and limits used for this article.

[1]: https://developers.openai.com/api/docs/guides/agents-api/sessions/automations
[2]: https://developers.openai.com/api/docs/guides/agents-api/sessions/events
[3]: https://developers.openai.com/api/docs/guides/agents-api/observability
[4]: https://developers.openai.com/api/docs/guides/agents-api/errors
