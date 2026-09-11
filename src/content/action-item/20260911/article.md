---
title: "Proving Agent Recovery"
date: 2026-09-11
updated: 2026-09-11
section: Ouroboros
series: Daily Action Item
categories:
  - Artificial Intelligence
  - Operating Systems
  - Agent Evaluation
tags:
  - Agentic AI
  - Sol
  - Astra
keywords:
  - agent recovery
  - checkpoints
  - idempotency
  - verified outcomes
excerpt: "Checkpoints, reconciled effects and unchanged authority turn durable sessions into verifiable work. Test the rescue route before expanding it."
hero: /action-item/20260911/hero.webp
ogImage: /action-item/20260911/og.webp
canonical: "https://iamrobin.ai/ouroboros/202609/20260911/action_item/"
author: https://iamrobin.ai/#person
inLanguage: en
draft: false
sourceAction: "Daily Briefing 2026-09-11, item 5"
ledgerId: AGENT-RECOVERY-20260911
visualHeadline: "Prove the recovery."
visualSubhead: "Resume. Reconcile. Verify."
visualFooter: "PROPOSED FRAMEWORK · NO PERFORMANCE CLAIM"
visualNodes: "STATE|FAULT|TEST|LEARN"
---

The conclusion is simple: an agent has recovered only when the intended work passes its acceptance checks, its side effects reconcile, and its authority remains intact. A conversation that survives a crash is useful infrastructure. A task that resumes correctly is an operating capability. Businesses will pay for the second, and their receipts should distinguish the two.

Imagine a small company preparing a customer report. The agent has downloaded evidence, drafted the analysis and submitted a delivery request when its connection disappears. On restart, the conversation remembers the assignment. That still leaves the question that matters: did the report reach the customer? Sending it again may create a duplicate. Declaring success may hide a failed delivery. Asking the founder to reconstruct the sequence turns software recovery into unpaid management work.

This is an illustrative scenario, not a reported production incident. It exposes the distance between remembering a task and completing it responsibly. The recovery system must find the external receipt, reconcile it with the saved checkpoint, and choose the next authorized action. Fluent recollection is only one input.

## What the platform now carries

OpenAI's September 10 [changelog](https://developers.openai.com/api/docs/changelog) marks the Agents API as public beta. Its [overview](https://developers.openai.com/api/docs/guides/agents-api/overview) describes an OpenAI-managed Codex harness handling sessions, orchestration, context compaction and recovery. Applications provide tools and select their execution environment, including hosted or self-hosted sandboxes. Durable sessions allow work to continue across turns.

That reduces the orchestration machinery a builder must assemble. It also makes the remaining responsibility easier to name. A platform can retain conversation state while the application still lacks an authoritative record of whether an outside action occurred. The division of responsibility belongs in the design before the first retry.

The [quickstart](https://developers.openai.com/api/docs/guides/agents-api/quickstart) uses GPT-6 Astra to create and execute a directory-tree script. It warns that a completed turn can include tool failures and tells developers to retrieve saved session information after a stream disconnects before retrying. Those are important limits. An event indicates lifecycle progress; the requested artifact and its actual behavior establish completion.

The framework below is an editorial proposal for testing that boundary. It is not an OpenAI recovery guarantee, an implementation already deployed in RobinOS, or a measured claim that Astra rescues tasks better than Sol. The reviewed documentation supplies capabilities and cautions, not a controlled production-recovery comparison between the two models.

## Save the decision state

A useful checkpoint answers five questions: what was requested, what has been verified, what may happen next, which effects already occurred, and what remains uncertain. A transcript alone can leave each answer scattered across hundreds of messages. The checkpoint should make them explicit enough for a replacement process to inspect.

For the hypothetical report, save the source hashes, the accepted report revision, the checks already passed, the intended recipient, and the delivery operation's stable identifier. Record the observed receipt separately from the intention to send. An attempted action and a confirmed action must never occupy the same field.

The checkpoint also needs a boundary for freshness. A recipient can change, a source can be corrected, and an authorization can expire while the process is absent. Persist the relevant version and the conditions under which it must be rechecked. Recovery then has a concrete comparison to make instead of treating everything remembered as current.

Store pending tool operations explicitly. If a worker disappears after making a request, the next worker should see an unresolved operation, not an empty to-do list. The correct first step may be a read from the destination. If that read is unavailable, the outcome remains UNKNOWN. It is still possible to prepare independent work while holding the unresolved delivery boundary.

## Give every side effect an owner

Duplicate prevention has to reach the system that performs the action. A local note saying “sent” offers little protection when two workers race or the note was written before a network failure. Where the destination supports idempotency, reuse one stable operation key for the same intended effect. Preserve the destination's receipt and reconcile retries against it.

Where it does not, use the strongest available combination of a single execution owner, durable operation records and read-after-write verification. Be explicit about the remaining ambiguity. No model prompt can manufacture an exactly-once guarantee from an endpoint that provides neither a reliable receipt nor a way to discover the prior result.

A recovery lease can prevent two healthy workers from claiming the same task. A lease alone does not prove that a previous worker stopped issuing effects. The application must define how stale ownership is rejected at the boundary that matters, or narrow the action until concurrent execution is harmless. This is a design requirement to test, not a capability assumed from the API overview.

The unit of accountability is the business operation. “Publish this approved revision” should retain its identity across reconnects, restarts and model changes. A new conversation turn should not silently become a new publication order. The same principle applies to reports, files and notifications, with controls proportionate to the consequence.

## Recover inside the original authority

A better reasoner does not inherit a larger mandate. If Sol was permitted to draft a report, Astra may diagnose why drafting failed. That handoff does not authorize delivery to a customer. If the task permitted delivery to one destination, recovery cannot add recipients merely to make a test pass.

Put the principal, permitted resource, action, limits and expiry conditions beside the checkpoint. Before resuming a consequential effect, compare them with current authorization. A revoked instruction should survive compaction as a live constraint. A stale credential or missing privilege is a reason to stop at that boundary, while safe diagnosis and preparation continue.

This distinction protects autonomy itself. Routine work should not keep returning to the founder for permission already granted. Equally, recovery should not reinterpret the founder's absence as consent to expand scope. An effective system reuses valid authority, identifies an exact human-only gate, and brings back a concrete reviewable result when that gate is real.

The [September 6 OPC Test](https://iamrobin.ai/ouroboros/202609/20260906/action_item/) asks whether work can proceed without constant founder intervention. Recovery adds a sharper test: can it still do so after failure, while remembering what it was never allowed to do?

## Make escalation earn its place

The proposed routing loop begins with Sol executing a bounded task. It attempts the documented, bounded recovery procedure when a dependency fails. Astra enters when that procedure fails or the remaining diagnosis requires resolving material architectural ambiguity. The handoff includes the checkpoint, failed attempt, current artifact diff, permissions and acceptance checks.

Astra should return a diagnosis, a minimal repair and evidence that the task can resume. Merely rewriting the whole solution moves the comparison onto different ground. Preserve the original task contract, retain the failure trace, and distinguish the repair's contribution from work already completed by Sol.

The [September 8 Astra Escalation Ladder](https://iamrobin.ai/ouroboros/202609/20260908/action_item/) provides the related editorial context. Here, the ladder has an explicit return path: after the uncertain part is resolved, routine execution resumes under the same constraints. Escalation is a scoped intervention rather than a permanent promotion of every task to the most expensive model.

The current [Astra model page](https://developers.openai.com/api/docs/models/gpt-6-astra) lists standard input/output rates of $10/$50 per million tokens; [Sol](https://developers.openai.com/api/docs/models/gpt-5.6-sol) lists $4/$20. That is a 2.5-times ratio at those rates. Both list a 1,050,000-token context window. Neither fact establishes the cost of a recovered business outcome. Long-context adjustments, caching, tools, environments and retries can change the actual bill.

## Price the outcome after the failure

Measure successful recoveries against all eligible injected failures, retaining unsuccessful attempts in the denominator. Define success before running the test: the intended artifact passes, required effects reconcile, constraints hold and the completion report matches the evidence. A stopped task with unresolved evidence is not a successful recovery.

Record state loss, duplicated actions, unauthorized actions and instruction retention after compaction separately. A high recovery rate can hide an unacceptable duplicate rate. A low cash bill can hide hours of founder intervention. Counts and rates need their task population, observation period and missing-data explanation alongside them.

Cost per verified outcome should include the original execution, failed attempts, rescue, tools and environment charges. Show founder-intervention minutes beside cash cost, or apply an explicitly chosen time value without pretending it is an observed market price. The [September 10 Founder Interruption Tax](https://iamrobin.ai/ouroboros/202609/20260910/action_item/) explains why attention belongs in this calculation.

If a cohort produces no verified outcomes, report the spend and zero verified outcomes directly. The ratio is undefined; it is not a free result. If intervention timing was not recorded, label it UNKNOWN instead of filling in zero. Good recovery economics should survive an honest denominator.

For a fair comparison, freeze the task, starting revision, permitted tools, failure point and acceptance criteria. Keep the model and reasoning configuration in the receipt. Run repeated cases across relevant failure classes, then reserve fresh cases for testing the routing rule. One dramatic rescue can reveal a mechanism without proving a general advantage.

## Let Murphy choose the interruption

Start with a reversible task in a sandbox without production authority. A report generator with a fake delivery endpoint can exercise file creation, source parsing and acknowledged effects while keeping customers and money outside the experiment. The endpoint should expose a stable operation log so the test can detect duplicates independently of the agent's narration.

Terminate the process after an acknowledged fake delivery and before the local completion record is saved. The expected result is reconciliation of the existing receipt, with no second delivery. Then interrupt before acknowledgement and require the agent to inspect the destination before deciding whether to retry. These two cuts test the dangerous interval from opposite sides.

Disable a tool, break a dependency and disconnect the progress stream in separate cases. The agent should identify the failed layer, preserve completed artifacts and use the approved retry or repair path. A dependency fix earns credit when the original task passes again; reinstalling software without finishing the task does not.

Expire the fake authorization, replace a source with a newer revision, force compaction, and replay a webhook. The expected outcomes differ: hold the expired effect, detect stale evidence, retain the original constraint, and reconcile the repeated event. Treat each as its own failure class. A system that handles network outages may still mishandle stale intent.

Finally, repeat a case with a misleading success message from the fake tool while its output fails the deterministic checker. The agent should reject the apparent success. This is the difference between testing whether an agent follows a happy script and testing whether it protects the requested result.

## Turn receipts into a bounded lesson

The recovery record should show the initial checkpoint, injected fault, attempted repairs, final diff, operation receipts, test results, time and cost. Keep sensitive evidence inside its owning environment. A public explanation can describe the mechanism without exposing customer data, private conversations or credentials.

A routing lesson should be specific enough to disprove. For example: in this task class, after this dependency failure and this unsuccessful repair, escalation improved verified completion within the permitted budget. That is a candidate rule. Validate it on a held-out case before changing routine routing, and retain the previous rule for rollback.

If Astra spends more and produces the same result, the evidence supports keeping the cheaper path for that class. If Sol recovers without help, do not count Astra as the rescuer. If both fail, preserve the failure and improve the test or system boundary. The routing ledger should learn from disappointments as faithfully as from attractive demos.

Today's publication completes the evidence framework and experiment specification. It does not report an executed Sol–Astra contest. Recovery rate, duplicate rate, founder minutes and cost savings remain UNKNOWN until a controlled run produces receipts. A publication workflow resuming successfully would be evidence about that workflow, not proof of the Agents API or either model's comparative performance.

## The acceptance card

![Proposed recovery workflow from checkpoint through failure, reconciliation, optional rescue, verification and a tested routing lesson.](/action-item/20260911/recovery-framework.svg)

Use one acceptance card for the first experiment. Name the task and starting revision. List its existing authority and the checks that define completion. Choose one fault at a time. Require an external effect log, checkpoint diff and complete cost record. Specify when routine recovery ends and rescue becomes eligible before observing the outcome.

Publish the result as a compact ledger: recovered or unresolved; effects reconciled or UNKNOWN; constraints retained or violated; founder minutes observed or unavailable; total cost; next routing hypothesis. Keep the raw artifacts behind those conclusions. The diagram is a proposed process, with no performance measurements implied.

Expand the rescue route only when repeated, comparable trials reduce cost per verified outcome while meeting the same authority and duplicate-prevention requirements. Until then, keep the experiment bounded. The business benefit is work that finishes responsibly after the screen goes quiet, with enough evidence to make the next recovery cheaper and less dependent on the founder.

## Categories and keywords

**Categories:** Artificial Intelligence; Operating Systems; Agent Evaluation.

**Keywords:** durable sessions; agent recovery; checkpoints; idempotency; authority; Sol; Astra; verified outcomes; routing evaluation.

**Hashtags:** #AgenticAI #AgentRecovery #Ouroboros #VerifiedOutcomes
