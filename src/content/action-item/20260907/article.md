---
title: "Three Agent Workdays Still Need a Founder"
date: 2026-09-07
updated: 2026-09-07
section: Ouroboros
series: Daily Action Item
categories:
  - Artificial Intelligence
  - Agent Systems
  - Operating Models
tags:
  - Artificial Intelligence
  - Agent Systems
  - One Person Company
keywords:
  - agent workdays
  - one-person company
  - founder interruption
  - agent recovery
  - verified outcomes
excerpt: "Agent labor becomes operating leverage only when routing, execution, recovery, verification, memory and rerouting form a measurable closed loop."
hero: /action-item/20260907/hero.webp
ogImage: /action-item/20260907/og.webp
canonical: "https://iamrobin.ai/ouroboros/202609/20260907/action_item/"
author: https://iamrobin.ai/#person
inLanguage: en
draft: false
sourceAction: "Daily Briefing 2026-09-07, item 5"
ledgerId: OPC-MISSING-LOOP-20260907
visualHeadline: "More labor. Less interruption?"
visualSubhead: "ROUTE · EXECUTE · RECOVER · VERIFY"
visualFooter: "REMEMBER · REROUTE"
visualNodes: "ROUTE|EXECUTE|RECOVER|VERIFY"
---

## Three workdays are a capacity claim

**The conclusion is simple: three agent-workdays per human workday become leverage only when they return verified outcomes and reduce founder interruption.** OpenAI Research now reports roughly 3.1 agent-workdays for every human workday by mid-August. Code and experiments increased while demand for internal technical support declined. The same evidence says high-level planning remains a small share of agent output, and more than half of successful four-to-eight-hour tasks still required human intervention. [OpenAI research evidence](https://openai.com/index/research-acceleration-view-inside-openai/).

That combination matters more than either number alone. The labor multiplier is real inside the measured organization. Autonomy remains incomplete. A one-person company can acquire far more machine time than founder time, yet the founder may still become the dispatcher, exception handler, reviewer and memory repair crew for every difficult job.

The practical question is therefore narrower than “How many agents can I run?” It is: how many accepted outcomes can the system deliver per hour of founder attention, without weakening evidence, authority or recovery?

This publication turns that question into a ten-task experiment. It records no test result today. The scorecard is empty by design. No model route, paid API budget or production permission changes through publication. The experiment becomes evidence only after fixed tasks, fixed checks and actual receipts exist.

## Output can rise while coordination gets worse

Agent labor is easy to count because every session has duration, tokens and tool calls. Coordination burden hides between those records. A model can produce more code while also creating more review queues, ambiguous handoffs and partially completed work. If the founder must reconstruct intent after each interruption, machine output has grown while operating leverage has not.

The OpenAI report gives an unusually useful split. Agent use correlates with more experiments and fewer internal support requests, which supports a real productivity hypothesis. It also shows that long successful tasks commonly include human intervention. A successful task can therefore contain expensive founder repair. Completion and independence are different measurements.

For a one-person company, the scarce resource is the owner’s uninterrupted judgment. Five short interventions can destroy a morning even when their combined duration is twenty minutes. The experiment should record both active intervention minutes and interruption events. The first captures labor. The second captures fragmentation.

This is why a fluent final answer is weak proof. The proof object is an accepted artifact connected to its input, authority, checks and destination. A useful system keeps that chain inspectable after the conversation disappears.

## Route work by marginal value

Astra’s published evaluations suggest a clear candidate role. OpenAI reports 72.6% on OSWorld versus 65.7% for 5.6 Sol, with roughly 47% less time, and 57.9% versus 37.3% on Terminal-Bench. DeepSWE is much closer at 74.1% versus 72.7%. [Astra launch and evaluations](https://openai.com/index/gpt-6-astra/). Standard token pricing is 2.5 times Sol’s. [OpenAI API pricing](https://developers.openai.com/api/docs/pricing).

Those numbers support a routing hypothesis, not a universal promotion. Sol can remain the routine executor when the task is clear and checks are deterministic. Astra can enter when work crosses files, intent is ambiguous, tools fail or the first worker cannot recover. Final review belongs wherever the cost of a silent error exceeds the review cost.

The ten-task comparison needs at least three lanes:

1. Sol completes the task without escalation.
2. Sol attempts the task and Astra receives a bounded rescue package.
3. Astra performs a final review only after deterministic checks pass.

Each lane needs the same acceptance criteria. The experiment should report which lane closed each task, how much founder attention it consumed and the full cost of all attempts. Comparing token price in isolation would answer the procurement question and miss the operating question.

## Execute against a frozen finish line

Every task starts with one deliverable, one destination, one authority envelope and a short acceptance checklist. “Improve the website” is too elastic. “Correct the four locale canonicals, pass the SEO check and verify the public routes without changing DNS” is testable.

The finish line must be frozen before the model sees the task. Otherwise a persuasive worker can redefine success around the work it happened to complete. The task receipt should identify the exact artifact, commit or immutable file hash, tests, public or local verification, and any boundary that remained outside authority.

An authorized refusal can be correct behavior. It is still not a completed business outcome. Record it as a safe boundary event, then measure whether the worker finished all safe preparation before escalating. This keeps safety and usefulness visible on separate axes.

OpenAI’s iterative repair example demonstrates a valuable pattern: review the target, make focused edits to a copy and validate the result. [Codex repair loop](https://developers.openai.com/cookbook/examples/codex/build_iterative_repair_loops_with_codex). The experiment should apply the same discipline to every task, even when the first attempt looks convincing.

## Recovery is part of the product

Long tasks fail in ordinary ways. A process times out after a remote write. A source changes during editing. A build succeeds locally while deployment fails. A second agent inherits a summary that omits the actual acceptance condition.

Recovery begins by identifying the last confirmed state and the next operation that cannot duplicate a consequence. A missing response does not prove a failed action. Before repeating a publication, message, payment or remote write, the worker must inspect the destination or use an idempotency record. Read-only retrieval can use bounded retries. Consequential actions require stronger duplicate prevention.

The rescue package for Astra should contain the original task identity, frozen finish line, permitted scope, confirmed artifacts, observed failure, attempted repairs and next safe check. It should exclude speculative storytelling about why the first model failed. Evidence helps the rescuer; confidence does not.

Measure recovery only on eligible failures. Record successful restoration, unresolved cases, time to recovery and repeated consequences. A worker that eventually succeeds after duplicating a remote effect has not recovered safely. A worker that asks Robin to solve every ordinary timeout has transferred its resilience burden to the founder.

## Verification must live outside the model

The model that produced the output can explain why it believes the output is correct. That explanation is useful diagnostic material. It cannot serve as the only acceptance check.

Choose checks that survive model substitution: schema validation, tests, file hashes, build output, route status, content canaries, reconciled totals and explicit human judgment only where judgment is genuinely required. A stronger model may design a better repair. It should not rewrite the score after seeing the result.

Verification should also test the absence of unauthorized changes. A passing page route does not excuse altered secrets, unrelated files or widened permissions. The receipt must enumerate what changed and preserve the original state needed for rollback.

OpenAI’s examples for agent improvement connect traces, feedback and repeatable evaluation. [Agent improvement loop](https://developers.openai.com/cookbook/examples/agents_sdk/agent_improvement_loop). The useful lesson is procedural: improvement claims need a stable comparison. RobinOS performance remains UNKNOWN until its own tasks run under its own checks.

## Remember evidence instead of slogans

A closed loop retains lessons that improve the next route. It must also prevent a plausible mistake from becoming policy.

Every candidate memory should carry a source, date, scope and observed result. “Retrying this read-only endpoint once resolved a transient timeout” is evidence. “Always retry” is a slogan. The difference becomes critical when the next action can publish, send, delete or spend.

OpenAI’s memory and compaction example separates within-run continuity from reusable cross-run knowledge. [Memory and compaction](https://developers.openai.com/cookbook/examples/agents_sdk/building_reliable_agents_memory_compaction). The ten-task experiment should test both. Can a worker resume the same task from a compact state? Can a later task retrieve a prior lesson without importing stale assumptions?

Give new lessons probationary status. Reuse them in a second relevant case before promoting them to durable guidance. Preserve conflicts and the underlying records. Count false lessons accepted into memory separately from false lessons later used. One measures contamination; the other measures harm.

The founder should receive compound learning without accumulating invisible operational folklore.

## Rerouting closes the loop

The final step is not remembering. It is changing the next decision from verified experience.

If Sol finishes a task cheaply and cleanly, the next similar task should stay with Sol. If a particular failure class repeatedly needs Astra rescue, the router can escalate earlier for that class. If Astra’s review catches no material defects across enough comparable tasks, the system can reduce that review lane while retaining random checks. If either model creates corrupted memory or silent scope expansion, capability gains cannot offset the control regression.

This is where the one-person company becomes an operating system instead of a stack of chats. Route, execute, recover, verify, remember and reroute form one measurable cycle. Each stage produces a small evidence object that the next stage can use.

The proposed experiment uses ten tasks this week. It should include routine edits, cross-file diagnosis, one interrupted process, one stale instruction, one ambiguous handoff and one task that correctly stops at an authority boundary. Freeze the set before results. Reuse current RobinOS tasks where possible so the comparison measures valuable work rather than synthetic cleverness.

## The founder interruption ledger

Use one row per task and preserve every attempt inside the same task record. A retry cannot become a new denominator. An abandoned hard task remains assigned.

| Measure | Definition | Decision use |
|---|---|---|
| Verified completion | Accepted outcomes divided by ten assigned tasks | Shows delivered work, including blocked and unresolved tasks |
| First-pass completion | Tasks accepted without rescue divided by assigned tasks | Separates routine reliability from eventual success |
| Autonomous recovery | Eligible fault cases restored safely | Shows whether failure returns to the machine or the founder |
| Founder interruption | Active minutes and interruption events | Measures owner labor and fragmented attention |
| Memory quality | False lessons accepted and false lessons used | Locates contamination and downstream harm |
| Cost per outcome | All model and tool cost divided by verified outcomes | Includes retries, rescue and review |
| Elapsed time | Start to accepted receipt | Prevents low-touch work from hiding excessive delay |

No observation should be prefilled. Missing data remains UNKNOWN. If a task produces zero verified outcomes, report the spend and the zero. Cost per outcome is undefined for that slice.

## Decision rules for the first ten tasks

Keep the current route unless the experiment supplies contrary evidence. Expand Astra rescue when it raises verified completion or cuts founder interruption enough to justify its full incremental cost, with no material regression in authority, provenance, recovery or memory quality.

Review results task by task before calculating an aggregate. A single average can reward the wrong system when easy work dominates the sample. Show the routine lane, ambiguous lane and recovery lane separately, then report the combined portfolio. Preserve wall-clock time alongside active model time, since a low-cost task that waits six hours for manual reconstruction may be economically worse than a faster expensive rescue. Record the founder's intervention reason as judgment, missing context, tool failure, evidence repair or permission boundary. Only the avoidable categories indicate an autonomy defect.

The review also needs a counterfactual. For each intervention, ask whether the task would have reached an accepted result without it. Advice that improves an already acceptable artifact is different from rescue required for completion. This distinction prevents ordinary editorial taste from being counted as system failure while still exposing work that depends on Robin to notice a hidden defect. Keep the raw receipt links beside every classification so later review can challenge the label.

Do not promote Astra from one dramatic save. Do not demote Sol from one difficult task outside its intended lane. Compare task classes, disclose small samples and retain every unresolved case.

The first useful outcome may be a map of where coordination accumulates. That alone can improve task design. A vague assignment that fails under both models is a specification problem. A task that passes checks and still disappoints Robin may have the wrong acceptance criteria. The experiment should improve the operating contract as well as the router.

Three agent-workdays are promising capacity. The closed loop decides whether that capacity returns time to the founder.

## Categories and keywords

**Categories:** Artificial Intelligence; Agent Systems; Operating Models; One-Person Company

**Keywords:** agent workdays; founder interruption; Astra; Sol; task routing; autonomous recovery; deterministic verification; evidence-backed memory; cost per verified outcome

**Hashtags:** #AI #AgentSystems #RobinOS #OnePersonCompany #VerifiedOutcomes
