---
title: "The perfect score lost a day."
storySlug: "the-perfect-score-lost-a-day"
date: "2026-10-26"
updated: "2026-10-26"
lane: "BUILD"
excerpt: "A dashboard can report 100% delivery while a missing scheduled occurrence never enters its denominator."
hero: "/binary-stories/the-perfect-score-lost-a-day/hero.webp"
ogImage: "/binary-stories/the-perfect-score-lost-a-day/og.webp"
keywords: ["scheduled agents", "reliability denominator", "acceptance receipts", "Agents API"]
canonical: "https://iamrobin.ai/binary/stories/the-perfect-score-lost-a-day/"
inLanguage: "en"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202610/20261026/special/"
sourceArtifactSha256: "9c958332e94b3f43b75a4996983c3ba13f3188fdc0f0232b4732b41bfcb97bf5"
carouselPdf: "/carousels/the-perfect-score-lost-a-day.pdf"
carouselCaption: "/carousels/the-perfect-score-lost-a-day.txt"
carouselPages: 7
draft: false
---

The dashboard says **100%**.

Every recorded invocation was delivered. No red rows. No failed attempts. A perfect month.

Except the calendar promised thirty mornings, and the table contains only twenty-nine.

The missing day did not fail. It never entered the denominator.

That is how a reliability metric can be mathematically correct and operationally false.

This is an illustration, not an observed OpenAI incident. Its purpose is to expose a measurement trap in any scheduled system: if the metric begins with the records that exist, it cannot count the record that should exist but does not.

![An illustrative month shows 30 expected occurrences, 29 recorded invocations and 28 accepted outputs. The missing occurrence sits outside the 100% delivery denominator.](/binary-stories/the-perfect-score-lost-a-day/hero.webp)

## The platform starts after the promise

OpenAI's Scheduled Automations documentation separates the layers carefully. A schedule stores the intended timing and target. Each run creates an invocation, which records an attempt to send work to a session. An invocation marked `completed` means delivery succeeded: the target session accepted the initial input or notification.

It does not mean the agent finished the job.

The documentation then points the application to session events. A root turn can complete, fail or be cancelled. Even a completed turn does not guarantee that every tool succeeded, so the output and tool results still need inspection.

Those are four distinct facts:

1. an occurrence was expected;
2. an invocation was recorded;
3. delivery reached a session; and
4. the turn reached a terminal state.

The fifth fact belongs to the task owner: did the result meet the acceptance rule?

The awkward part is the first fact. It exists before the invocation. Invocation history can describe invocations already created. It is not, by itself, the calendar of everything that should have happened.

## Two honest rates can disagree

Take a purely illustrative thirty-day month.

- 30 scheduled occurrences were expected.
- 29 invocations were recorded.
- All 29 were delivered.
- 28 produced outputs that passed the task's acceptance rule.

The transport metric is honest:

**delivered invocations ÷ recorded invocations = 29 ÷ 29 = 100%**

The outcome metric is also honest:

**accepted outputs ÷ expected occurrences = 28 ÷ 30 = 93.3%**

Neither number should replace the other. They answer different questions.

The first asks whether recorded attempts reached a session. The second asks whether the scheduled promise produced usable work. A dashboard becomes misleading when it labels the first number “job success” and leaves the second denominator unbuilt.

The missing occurrence also should not be labelled an OpenAI failure without evidence. The cause could sit in application state, monitoring, a paused schedule, a query boundary or somewhere else entirely. Until the join is investigated, the cause is `UNKNOWN`.

## Build the denominator before the run

The smallest repair is not another status badge. It is an expected-occurrence ledger.

For each intended run, create one row before work begins. Give it a stable key such as the schedule ID plus `scheduled_at`. Then join forward to the invocation, session, root turn, artifact and acceptance result.

The row should survive every outcome:

- no invocation found;
- delivery queued or completed;
- root turn completed, failed or cancelled;
- output accepted, rejected or unresolved; and
- retry, replay or human rescue.

Absence is now visible. A missing invocation becomes an unmatched expected occurrence, not an invisible hole.

This also gives latency a truthful starting point. OpenAI notes that recurring runs receive a small randomized delay and that delivery can wait when the target session is busy. If timing matters, measure from intended occurrence to accepted artifact, not merely from invocation creation to delivery.

## Keep three scoreboards

A useful system reports at least three rates separately.

**Transport:** delivered invocations divided by recorded invocations.

**Execution:** terminal root turns divided by delivered invocations, split into completed, failed and cancelled.

**Outcome:** accepted artifacts divided by expected scheduled occurrences.

The labels matter because each rate has a different owner and a different remedy. A delivery problem is not repaired with a better content rubric. A rejected artifact is not repaired by retrying transport. A missing occurrence cannot be recovered from an invocation table that never received it.

Retries need the same discipline. OpenAI's recovery guidance warns that a failed turn may already have changed files or called tools. Before repeating work, inspect saved state and completed effects. The occurrence key should remain stable while attempts get their own identities; otherwise a retry can look like a second success instead of recovery for the first promise.

## Perfect scores need an outside witness

The deeper lesson is not that 100% is suspicious. Sometimes every promised job really does succeed.

The lesson is that a system cannot prove its own completeness using only the records it produced after the point of failure.

The schedule needs a witness outside the invocation table. The artifact needs a rule outside the prose. The retry needs a ledger outside the retry itself.

Green is useful. But green begins too late.

Before celebrating the numerator, ask who counted the days.

[1]: https://developers.openai.com/api/docs/guides/agents-api/sessions/automations
[2]: https://developers.openai.com/api/docs/guides/agents-api/sessions/events
[3]: https://developers.openai.com/api/docs/guides/agents-api/observability
[4]: https://developers.openai.com/api/docs/guides/agents-api/errors

Sources: OpenAI's official documentation for [Scheduled Automations][1], [Events and Items][2], [Observability and Usage][3], and [Errors and Recovery][4], plus the hash-bound [source Special](https://iamrobin.ai/ouroboros/202610/20261026/special/). The thirty-day example is illustrative. No live reliability rate, latency distribution or platform failure is claimed.
