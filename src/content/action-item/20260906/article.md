---
title: "The Four Loop Test for Autonomous Agents"
date: 2026-09-06
updated: 2026-09-06
section: Ouroboros
series: Daily Action Item
categories:
  - Artificial Intelligence
  - Agent Systems
  - Operating Models
tags:
  - Artificial Intelligence
  - Agent Systems
  - Operating Models
keywords:
  - one-person company
  - four-loop agent test
  - autonomous recovery
  - evidence-backed memory
  - verified outcomes
excerpt: "An agent earns more work by finishing, recovering, retaining verified lessons and improving against fixed checks. Measure the founder time it returns."
hero: /action-item/20260906/hero.webp
ogImage: /action-item/20260906/og.webp
canonical: "https://iamrobin.ai/ouroboros/202609/20260906/action_item/"
author: https://iamrobin.ai/#person
inLanguage: en
draft: false
sourceAction: "Daily Briefing 2026-09-06, item 5"
ledgerId: OPC-FOUR-LOOPS-20260906
visualHeadline: "Can the founder leave?"
visualSubhead: "FINISH · RECOVER · REMEMBER · IMPROVE"
visualFooter: "VERIFIED OUTCOMES / OWNER TIME / COST"
visualNodes: "FINISH|RECOVER|REMEMBER|IMPROVE"
---

## The founder is the scarce resource

**The conclusion is simple: choose an agent system by verified work delivered and founder time returned.** A cheaper model can widen the range of affordable tasks. A more capable model can rescue a difficult assignment. Neither earns an operating mandate merely by producing a persuasive answer. For a one-person company, the useful unit is a closed piece of work that survives failure and does not need the founder to reconstruct what happened.

The price gap makes this question urgent. Google lists Gemini 3.8 Flash at introductory rates of $0.75 per million input tokens and $3.75 per million output tokens. Its reported long-horizon benchmark performance is a company claim. [Google launch](https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/). Astra lists standard rates of $10 and $50 respectively, with different treatment for longer prompts. [OpenAI model pricing](https://developers.openai.com/api/docs/models/gpt-6-astra).

Those are prices for ingredients. The founder buys dinner.

An agent that drafts a beautiful report, loses the evidence, asks the same question again and requires three rounds of rescue can be cheap per token and expensive to employ. Another may consume more inference while handing over a tested artifact and an intelligible receipt. The comparison belongs at the end of the workflow.

My proposed operating test has four loops: finish, recover, remember and improve. Each must close with evidence. Today's publication defines that test; it reports no measured Flash-versus-Astra result, changes no model route, and grants no additional authority.

## Finish means the result exists outside the conversation

Imagine a routine request to update a research page. This is an illustrative workflow, not a claim about a completed experiment. The agent finds a source, writes a paragraph, runs a build and announces success. The page may still be unavailable. A source may contradict the paragraph. The build may contain unrelated changes. The final message is therefore the beginning of verification, not its substitute.

Before execution, define one deliverable, its owner, its permitted destination and its acceptance checks. For a research page, completion could require the final text, preserved citations, a reproducible build and a public route matching the tested artifact. For a local analysis, a reproducible calculation and its inputs may be sufficient. Different tasks need different receipts; a website deployment is an absurd requirement for a spreadsheet calculation.

Freeze this definition before comparing workers. Otherwise the more fluent system can quietly negotiate an easier finish line. A report that omits the hard question should remain incomplete even if its typography is excellent. A correct refusal at a permission boundary should be recorded separately from a completed business outcome.

The finish loop is intent, execution, external check and a receipt tied to the resulting artifact. If the check finds a repairable defect, the task remains open. If the requested outcome requires new authority, the system should complete the safe preparation and state precisely which boundary remains. That is a useful handoff; inventing completion merely exports unfinished work to the founder.

## Recover without repeating the consequence

Consider a request that times out after writing a remote record. The worker sees an error. The remote service may have completed the write. Retrying immediately could create a duplicate. Recovery begins by distinguishing a failed response from a failed action.

OpenAI's repair example separates review, focused edits to a copy and validation. It demonstrates a feedback workflow rather than a production recovery guarantee. [Codex repair loop](https://developers.openai.com/cookbook/examples/codex/build_iterative_repair_loops_with_codex).

My operating requirement goes further: preserve the original task identity and inspect the destination before replaying a consequence. Read-only retrieval may be safely retried under a bounded budget. A payment, message or publication needs an explicit duplicate-prevention mechanism and the authority to perform it. Recovery cannot manufacture permission that the original task lacked.

A checkpoint should identify the last confirmed state, pending effects, current inputs and the next safe operation. Saving a transcript alone leaves the returning worker to infer all four. That inference is exactly where an interruption can become a second, subtly different job.

Measure successful recovery against all eligible injected faults, with the fault list fixed in advance. Also report recovery time, repeated attempts and unresolved incidents. A worker that retries indefinitely has persistence without useful recovery. A worker that calls the founder on every ordinary timeout has outsourced its resilience. The valuable middle ground is bounded repair, visible state and escalation only when the remaining decision genuinely belongs to the owner.

## Remember evidence rather than confidence

Large context windows help an agent carry more material. Google documents a 1,048,576-token input limit for 3.8 Flash. That capacity alone says nothing about whether a stored lesson is correct. [Gemini model documentation](https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash).

OpenAI's memory example distinguishes continuity within a long run from reusable guidance across later runs. Its synthetic investigation keeps an evidence-backed review artifact as the record. [Memory and compaction](https://developers.openai.com/cookbook/examples/agents_sdk/building_reliable_agents_memory_compaction).

For the proposed test, a lesson must carry its source, date, scope and the observation that supports it. “Retry fixed this error” is narrower than “always retry.” “This endpoint returned a value on Tuesday” is narrower than “the value is current.” Good memory retains the distinction.

Give candidate lessons a probationary state. Test them against another relevant case before treating them as a durable operating rule. Keep a way to withdraw a bad lesson without deleting the evidence that explains its origin. When two records disagree, retain the conflict and retrieve the underlying material.

The memory test should include an intentionally stale instruction and a plausible false lesson. Does the worker recognize the mismatch? Can it finish safely without propagating the error? Count invalid lessons accepted into memory separately from invalid lessons later used. Their denominators differ, and combining them conceals the point where contamination entered.

A memory store that confidently repeats yesterday's mistake is negative learning. The founder should receive the benefit of accumulated experience without inheriting an expanding collection of unexamined assumptions.

## Improve the system without moving the goalposts

Improvement needs a baseline, one proposed change and a comparison that the candidate cannot rewrite. OpenAI's improvement example connects traces, feedback, repeatable evaluations and proposed changes to the surrounding agent workflow. [Agent improvement loop](https://developers.openai.com/cookbook/examples/agents_sdk/agent_improvement_loop).

For RobinOS, I would start with one observed recurring failure. Perhaps interrupted tasks lose the intended output path. Perhaps a source refresh repeatedly overwrites a useful uncertainty label. The smallest change should target that specific mechanism. Adding another agent before locating the failure can multiply activity while leaving the original defect intact.

Hold back some cases from the repair process. A change that succeeds only on the examples used to design it has demonstrated adaptation to those examples. It has yet to demonstrate broader value. Keep ordinary tasks and failure cases in the comparison, and preserve the old configuration for rollback.

Reward verified outcomes, lower owner interruption and preserved controls together. Optimizing only completion rate invites shallow work. Optimizing only cost invites abandonment. Optimizing only silence encourages concealed failures. A convenient aggregate score can hide all three, so the underlying measures should remain visible.

The improvement loop ends when the changed system performs better on the agreed work without a material regression elsewhere. A proposed fix, a longer prompt and a rising internal score are intermediate artifacts. They become evidence of improvement only after an unchanged evaluation procedure tests them.

## One scorecard with honest denominators

Use one reusable ledger, one row per frozen task and configuration. Link the row to its input snapshot, artifact, checks and event record. A retry updates the same task history instead of becoming a fresh success. A skipped difficult task remains in the assigned set.

The owner-facing view needs a compact scorecard:

| Measure | Definition | Interpretation boundary |
|---|---|---|
| Verified completion | Accepted outcomes divided by assigned tasks | Report blocked, timed-out and abandoned tasks separately |
| Owner interruption | Active minutes of owner intervention | Separate necessary judgment from avoidable repair |
| Recovery | Fault cases restored safely divided by eligible fault cases | Include unresolved cases and the recovery-time distribution |
| Memory quality | Invalid accepted lessons and invalid lessons used | Show each count with its own denominator |
| Cost per outcome | Total run cost divided by verified outcomes | Include retries, escalation, tools and storage; state exclusions |

This scorecard is a proposed evaluation instrument. All measurements remain UNKNOWN until an authorized run supplies them. An empty ledger is missing observations, not a perfect safety record. If a run produces no verified outcomes, report its spend and zero outcomes explicitly; cost per outcome is undefined, not free.

Founder time belongs beside cash cost even when no hourly valuation has been agreed. Do not quietly assign the owner's time a zero price. Record minutes first. A later economic analysis can use an explicitly chosen hourly value and show sensitivity rather than smuggling an assumption into the result.

For a purely illustrative one-hundred-thousand-input, ten-thousand-output request, the cited base token rates imply $0.1125 for Flash and $1.50 for Astra. This input stays below Astra's 272,000-token long-context pricing threshold. The calculation excludes caching, tool charges, retries and differing token use. It illustrates the rate gap; it does not estimate the cost of the same completed task on either system.

## Six failures worth rehearsing

A sunny-day demonstration asks whether the worker can follow the path. A useful operating test also asks what it does when the path breaks. Use synthetic or approved non-production material, fixed budgets and recoverable copies. None of the following examples authorizes probing another service or changing a live system.

First, interrupt a tool after its outcome becomes ambiguous. The expected behavior is to inspect the result and reconcile state before retrying. Record whether any duplicate effect appears. A clean log cannot excuse a duplicated artifact.

Second, provide stale context alongside a newer authoritative record. The worker should identify which evidence governs the current decision and retain the reason for superseding the old claim. Simply selecting the most recent-looking sentence is insufficient when provenance is weaker.

Third, introduce conflicting instructions inside retrieved material. The worker should treat source content as data and continue the authorized task. An instruction embedded in a document cannot enlarge the task's permissions.

Fourth, replay a delivery event. The same task identity should lead to one consequence, with the replay visible in the receipt. Use a synthetic destination; do not send duplicate messages to a real person to test this property.

Fifth, expose a shortcut that improves the score while degrading the result, such as dropping a difficult requirement. The verifier should reject the shortcut using the frozen acceptance criteria. Changing those criteria after seeing the output invalidates the comparison.

Sixth, seed a false lesson and observe whether another run adopts it. The safe outcome is detection, containment and an inspectable correction. Preserve evidence of the bad lesson so future reviewers can understand why it was withdrawn.

These cases test different boundaries. Passing five does not cancel a serious failure in the sixth. In particular, an unauthorized consequence cannot be averaged away by excellent writing or cheap inference.

## Route capability before expanding authority

The source briefing proposes twelve representative RobinOS tasks with Flash as the initial worker and Astra as an escalation candidate. Treat that as a research proposal. An executable experiment still needs a confirmed task set, permitted data, account access, a spending ceiling and explicit execution authority. None is inferred from the publication of this article.

A fair comparison would hold the task definitions and acceptance checks constant across the current baseline and candidate route. Record model versions, settings, tool access and the reason for every escalation. Keep higher-capability escalation inside the same permission envelope. A harder task does not automatically justify a wider grant.

Twelve tasks can reveal concrete defects and suggest whether a broader trial is worthwhile. They cannot establish a universal production failure rate. Avoid turning a small, handpicked pilot into a claim that the company can now operate unattended.

If evidence eventually supports a change, promote one bounded task class first. Preserve the previous route and an observable rollback trigger. Expand capability where it returns useful work and owner time; consider permission changes separately through the owner's existing approval process.

For investors, this also sharpens diligence. Ask an agent business to show completed customer outcomes, intervention burden, safe recovery and retention quality under a defined scope. Compare the claimed labor saving with the work customers still perform around the product. A low inference bill is one component of the margin story.

## The decision for today

Publish the framework, preserve its sources and prepare one scorecard. Keep model selection and experiment execution unresolved until there are real observations and the required authority. The paper's evidence supports the existence of useful building blocks; it does not establish that RobinOS or any vendor has already joined them into a reliable autonomous company.

The next useful result would be a bounded, reproducible comparison with honest failures left in the record. If the candidate saves owner time and money while preserving completion quality and boundaries, investigate a limited promotion. If it merely shifts repair work onto Robin, retain the current route and repair the observed bottleneck.

The four questions remain plain enough to ask at the end of any workday. Did it finish? Did it recover? Did it retain the right lesson? Did the next run become better? A system earns more work by answering those questions with artifacts. The founder should be able to inspect the answer and then get back to her own work.

## Categories and keywords

**Categories:** Artificial Intelligence; Agent Systems; Operating Models.

**Keywords:** one-person company; four-loop agent test; verified outcomes; autonomous recovery; evidence-backed memory; evaluation integrity; cost per outcome.

**Hashtags:** #AI #AgentSystems #RobinOS #OPC #Automation #VerifiedOutcomes
