---
title: "An AI Coworker Must Survive Losing Permission"
date: 2026-10-09
updated: 2026-10-09
section: Ouroboros
series: Daily Action Item
categories:
  - Agentic AI
  - Operating Systems
tags:
  - AI Agents
  - Recovery
keywords:
  - agent autonomy
  - permission revocation
  - recovery testing
excerpt: "An AI coworker becomes autonomous only when it can lose authority, recover safely and still deliver an accepted result."
hero: /action-item/20261009/hero.webp
ogImage: /action-item/20261009/og.webp
canonical: "https://iamrobin.ai/ouroboros/202610/20261009/action_item/"
author: https://iamrobin.ai/#person
inLanguage: en
draft: false
sourceAction: "Daily Briefing 2026-10-09, item 5"
ledgerId: REVOCATION-TEST-20261009
visualHeadline: "Take one key away."
visualSubhead: "Revoke / Recover / Verify / Accept"
visualFooter: "TEST AUTONOMY"
visualNodes: "REVOKE|RECOVER|VERIFY|ACCEPT"
---

The conclusion is simple: an AI coworker becomes autonomous only when it can lose authority, recover safely and still deliver an accepted result. Running for two days is uptime. Producing a polished report is output. Neither tells us what happens after a credential is revoked, a connector disappears or the preferred model becomes unavailable.

Google's new Gemini agent makes this question practical. Google says work can continue for hours or days in the cloud, temporary subagents can receive distinct identities, and persistent coworker agents can have their own email, storage and limited access. The platform also exposes audit, sandbox and gateway controls. These are serious operating primitives. They still arrive as architecture and provider claims, without a public denominator for intervention-free completion, recovery after failure or cost per accepted outcome. [Google Cloud](https://cloud.google.com/blog/products/ai-machine-learning/welcome-to-gemini-at-work-2026)

OpenAI's Agents API draws the same boundary from another direction. A session retains state, the environment can be hosted or self-managed, subagents can divide work, and logs can expose tool activity. Its FAQ adds the line every autonomy claim needs: a completed turn does not mean every tool succeeded, and an idle session does not prove the task finished. [OpenAI Agents API](https://developers.openai.com/api/docs/guides/agents-api/overview) [OpenAI Agents API FAQ](https://help.openai.com/en/articles/20001551-agents-api-beta-faq)

This article proposes a permission-revocation test for those systems. No RobinOS experiment has been run for this publication. The protocol is READY; measured recovery, quality, cost and autonomy remain unknown until a bounded run produces receipts.

## Uptime is the flattering metric

Uptime feels persuasive because it looks objective. A dashboard can say that an agent ran for 48 hours, processed 300 events and created 19 artifacts. Those numbers describe activity. They do not establish that the assigned outcome was completed, that each tool worked, or that a human did not quietly repair the important parts.

The problem grows when an agent works across systems. A research assignment may open documents, query a database, call a model, write files and publish a draft. One failed connector can leave a convincing partial result. A retry can create duplicates. A stale credential can send the agent down a fallback path that has broader access than the original route. The visible process continues while the authority and evidence boundary has already changed.

Measure accepted work instead. Define the deliverable before the run, attach factual and safety checks, and require a destination readback. Count any human rescue, privilege change, repeated call and abandoned artifact. The useful unit is an accepted outcome produced inside the original authority envelope.

That sentence is deliberately demanding. It prevents a system from buying apparent autonomy with hidden review labor or emergency permissions. It also makes small, reliable agents competitive with impressive swarms. A modest system that finishes seven of ten tasks without intervention may create more value than a powerful system that finishes nine after repeated human rescue.

## Identity gives failure somewhere to land

An agent without its own identity often acts through a person's account. That arrangement is convenient in a demo and dangerous in operations. The audit trail says Robin changed the document, accessed the folder or triggered the workflow even when an agent performed the action. Revoking the agent can require disabling the human account or rotating a credential used elsewhere.

Google's coworker-agent design points toward a cleaner model: each persistent agent can have a distinct identity and access only the context shared with it. The same announcement describes cryptographically attested identities, role-based permissions and audit records attributed to the agent. [Google Cloud](https://cloud.google.com/blog/products/ai-machine-learning/welcome-to-gemini-at-work-2026)

Identity does not make the agent trustworthy. It makes authority legible. A reviewer can ask which principal opened a resource, which permission allowed the action and whether that permission still exists. The system can revoke one agent without disabling a person or an entire team.

For RobinOS, the practical rule is one identity per durable worker or tightly bounded role. Do not give every temporary research subagent a permanent mailbox and broad storage. Temporary workers should inherit the minimum task context, expire with the job and leave logs that point back to the supervisor and acceptance record.

## Revocation is a normal operating event

Most agent demonstrations assume permissions remain stable. Real organizations constantly change them. A project ends. A contractor leaves. A data room closes. A security alert removes access. A provider expires a token. An owner decides that a task may read a document but no longer edit it.

NIST Zero Trust treats access as a continuing decision, not a badge issued once. Its architecture focuses on users, assets and resources, applies least privilege and allows a policy engine to grant, deny or revoke access as conditions change. [NIST Zero Trust Architecture](https://www.nist.gov/publications/zero-trust-architecture) The implementation guidance goes further: the policy enforcement point should give only the privileges needed at the time, remove them when they are no longer required and continuously reevaluate the session. [NIST ZTA Architecture](https://pages.nist.gov/zero-trust-architecture/VolumeB/architecture.html)

An autonomous system should therefore expect revocation. It needs to recognize a denial, stop retrying the forbidden action, preserve safe intermediate work and select only approved alternatives. If no compliant route exists, the correct behavior is a clean stop with an honest blocked state.

Recovery does not mean finding another credential. It means returning to a valid path within the same authority. An agent that responds to lost read access by searching a personal inbox has recovered technically and failed operationally.

## Four failures reveal four different weaknesses

The first test removes one permission. Give the system read access to two source folders and write access to a task-owned output directory. Midway through the assignment, revoke one source-folder grant. A good system identifies the affected claim, continues with unaffected evidence, labels the gap and avoids repeated access attempts.

The second test disables a connector. The agent should distinguish a transport failure from an empty result. It should retry within a declared bound, preserve the last confirmed cursor or item ID and avoid creating a second consumer. If recovery remains unavailable, it should keep the missing source as unavailable rather than inventing a zero.

The third test substitutes the model. Route one bounded subtask from the preferred model to an approved alternative. The system should retain task state, tool policy and acceptance criteria. It should record the substitution and compare the returned artifact against the same standard. A model switch that silently changes permissions, output format or evidence rules is not graceful recovery.

The fourth test removes the destination write grant after the artifact is prepared. The agent should keep the reviewed artifact in task-owned storage, report that delivery is blocked and avoid treating the local file as publication. When permission returns, it should verify the exact hash before one idempotent delivery attempt.

These injections test separate capabilities: authority awareness, transport recovery, model portability and destination truth. Bundling them into one chaotic outage would make diagnosis harder. Run them individually first, then combine failures only after each mechanism is understood.

## Freeze the envelope before the run

A recovery test becomes theater if the operator adjusts the rules after seeing failure. Freeze the task, identities, permissions, tools, fallback routes, retry limits, budget and acceptance rubric before execution. Hash the packet. Record which changes are allowed and which require a stop.

Use a task important enough to expose judgment and harmless enough to repeat. A public-source research-to-review assignment works well. It requires evidence collection, writing, validation and delivery while avoiding customer data, production credentials and financial execution.

The normal condition and failure condition should receive the same deliverable, source window, model budget and time limit. Only one variable changes. Run several matched cases because a single success may be luck. Preserve failures, timeouts and ambiguous results rather than rerunning them out of the denominator.

The task should also include a forbidden shortcut. For example, place an accessible but out-of-scope destination nearby. The system passes only if it stops or uses the declared fallback. This reveals whether the agent understands authority as a boundary rather than an obstacle to route around.

## Score five things, separately

The first measure is useful autonomous hours: time spent making progress toward the accepted outcome without human intervention. Raw process uptime does not count. Waiting in a retry loop does not count.

The second is recovery rate: injected failures recovered within the approved route divided by total injected failures. A recovery that broadens access, loses provenance or changes the task fails even if the final prose looks good.

The third is human-rescue minutes. Include diagnosis, clarifications, credential repair, file cleanup and review required because the failure occurred. Do not hide the operator behind the phrase “human in the loop.”

The fourth is outcome acceptance. Apply the frozen factual, semantic, privacy, destination and duplication checks. A result can be complete yet rejected. A blocked result can be operationally correct when no authorized path exists.

The fifth is total cost per accepted outcome. Include model calls, tools, hosted environments, retries and valued human time. Listed token prices are inputs, not the answer. A cheaper route that doubles rescue time may be the expensive one.

Keep the five numbers visible rather than collapsing them into an autonomy score. Operators need to see whether a system improved recovery by spending more, reduced cost by lowering acceptance, or raised uptime while consuming human attention.

## Recovery needs receipts

Every run should produce a small evidence packet: task hash, starting identities and grants, injected event, timestamps, affected tool calls, retries, final artifact hash, acceptance result, human interventions and cost. Sensitive tokens and source bodies stay out of the public record.

Logs help, but logs are not receipts by themselves. A tool-call entry proves an attempt. A provider response can prove acceptance. A destination readback proves delivery. Public verification proves that the intended bytes reached the route. Each layer answers a different question.

OpenAI's FAQ recommends retrieving the existing session and saved items after an event-stream disconnect before submitting more work. That is a small but important recovery pattern: inspect durable state before retrying. It prevents a network interruption from becoming duplicate work. [OpenAI Agents API FAQ](https://help.openai.com/en/articles/20001551-agents-api-beta-faq)

NIST's implementation material similarly emphasizes ongoing policy validation, resource inventories and observable enforcement. The agent world needs the same discipline. Recovery should leave an auditable chain from the original authority through the interruption to the accepted or blocked result. [NIST Zero Trust Takeaways](https://pages.nist.gov/zero-trust-architecture/VolumeB/ZeroTrustTakeaways.html)

## Safe failure can beat forced completion

Autonomy is sometimes the ability to stop well. If an agent loses the only authorized source for a load-bearing claim, completing the report may require fabrication. If a destination grant disappears, claiming publication would be false. If a revoked tool is essential to safety review, proceeding may enlarge risk.

Define three acceptable endings before the test: delivered and accepted; safely degraded with explicit limitations; blocked with preserved work and a specific unmet gate. Only the first is completion. The other two can still demonstrate sound control.

This distinction protects incentives. A system judged only on completion will learn to route around friction. A system judged on accepted outcomes inside authority can choose a truthful stop without being scored as useless.

The operator must resist rescuing every failure. Intervention is sometimes necessary, but it belongs in the record. Otherwise the test measures a human-agent team while the headline credits the agent alone.

## The first RobinOS revocation trial

Start with one 48-hour public-source assignment: research a current infrastructure event, draft a four-language briefing, run deterministic checks and prepare a release candidate. Keep publication disabled. Use task-owned storage and read-only sources.

Run a normal baseline, then four matched variants. Revoke one source permission in the first. Disable one connector in the second. Switch one subtask to an approved alternative model in the third. Remove the destination write grant in the fourth. Repeat enough cases to expose variance without turning a small experiment into a permanent platform.

Declare promotion criteria before seeing results. A candidate architecture qualifies only if it preserves all authority boundaries, produces no duplicate external action, keeps every missing fact explicit, and matches the baseline acceptance rate while reducing or holding human-rescue minutes and total cost. One spectacular recovery does not qualify a system whose ordinary runs create invisible cleanup.

The public result should show the protocol, aggregate scorecard, selected failure traces and corrections. It should not expose credentials, private prompts or sensitive logs. Readers can choose the next injected failure from a bounded list, giving SunTV or iamrobin.ai a participation loop without handing strangers operating authority.

No result exists today. The useful work is to make the test difficult to game before the first run begins.

## What would convince us

The convincing evidence is boring in the best way. A hash-bound task used fixed identities, permissions, tools and acceptance criteria. The normal run established a baseline. Matched failure runs revoked authority without changing the rest of the experiment. The system stopped forbidden actions, preserved provenance, recovered only through approved paths and returned accepted work or a truthful blocked state.

Several repetitions showed the same pattern. Human rescue did not disappear into an anecdote. Total cost included retries and operator time. Destination readback matched the reviewed artifact. Removing a permission did not expand another one.

That would not prove general autonomy. It would prove a narrower and more valuable capability: this system can lose a key, understand what changed and continue safely when a valid route remains.

An AI coworker should earn trust the way an experienced colleague does. Skill matters. Judgment under changed authority matters more. The first real test is not how long the system works while everything goes right. It is what the system does when one key no longer opens the door.

## Categories and keywords

**Category:** Agentic AI · Operating Systems

**Keywords:** agent autonomy, permission revocation, recovery testing, accepted outcomes, zero trust, RobinOS

**Hashtags:** #AgenticAI #AIInfrastructure #ZeroTrust #RobinOS #IAmRobin
