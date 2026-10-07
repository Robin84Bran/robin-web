---
title: "Autonomy Needs Acceptance Tests"
date: 2026-10-07
updated: 2026-10-07
section: Ouroboros
series: Daily Action Item
categories:
  - Agentic AI
  - Operating Systems
tags:
  - Autonomy
  - Acceptance Tests
keywords:
  - agent acceptance tests
  - computer use
  - autonomous workflows
excerpt: "An agent becomes useful when completion, authority, recovery and destination evidence are explicit."
hero: /action-item/20261007/hero.webp
ogImage: /action-item/20261007/og.webp
canonical: "https://iamrobin.ai/ouroboros/202610/20261007/action_item/"
author: https://iamrobin.ai/#person
inLanguage: en
draft: false
sourceAction: "Daily Briefing 2026-10-07, item 5"
ledgerId: AUTONOMY-ACCEPTANCE-20261007
visualHeadline: "Done needs proof."
visualSubhead: "State / Authority / Result / Readback"
visualFooter: "ACCEPT THE OUTCOME"
visualNodes: "STATE|AUTHORITY|RESULT|READBACK"
---

The conclusion is simple: autonomy needs acceptance tests. A capable agent can take many correct steps and still fail the job. It can stop one screen before the saved record, confuse a submitted form with an accepted form, or report success while the public destination still serves yesterday's bytes. The model may have acted intelligently at every visible moment. The business outcome remains unfinished.

This gap matters more as computer-use systems become faster and more persuasive. OpenAI's Ironclad case study describes an enterprise workflow that combines computer use with validation, approvals and exception handling. That operating pattern is more important than the spectacle of a cursor moving by itself. It treats the model as one component in a process whose result must survive review. [OpenAI's Ironclad case study](https://openai.com/index/advancing-computer-use-with-ironclad/)

Acceptance testing gives a one-person research department a practical way to delegate without surrendering judgment. Before the run starts, define the state that counts as finished, the authority the agent may exercise, the evidence required at the destination and the response to ambiguity. Then judge the run against those conditions. This turns autonomy from a promise into a measurable operating contract.

## A task is a state transition

Most prompts describe activity: research this topic, update that page, submit this record, publish today's edition. Activity is easy to observe and hard to settle. A state transition is sharper. It names what was true before, what must be true after and which evidence proves the change.

Consider a publication. The initial state may contain a dated source, an unpublished draft and a protected production branch. The accepted final state requires four complete language editions, a passing build on the proposed revision, a merged commit, a production deployment and a public readback from each canonical route. Drafting is only one transition. A successful local build is only another. Each can pass while publication remains incomplete.

This framing prevents a familiar mistake: treating the last visible action as the final result. A button press may create a request, queue a job or open a confirmation screen. The task ends when the defined state exists and can be independently read. If the state cannot be read, its status is UNKNOWN. That word protects the process from optimistic storytelling.

The state definition should be small enough to inspect. Avoid a vague requirement such as "make the site good." Prefer conditions such as "the canonical route returns HTTP 200, contains the dated title, declares the correct language and matches the merged revision." The agent can then gather exact evidence instead of guessing what satisfaction looks like.

## Authority belongs inside the test

An acceptance test also defines what the agent must leave unchanged. A system can produce the requested page and still fail by altering a repository setting, exposing a credential or sending an unauthorized message. Outcome and authority are one contract.

Write the allowed verbs beside the forbidden ones. Read public sources, edit task-owned files, create a branch and open a pull request may be allowed. Changing DNS, purchasing a service, sending a job application or placing a trade may remain prohibited. The test should verify both sides: the requested state exists and restricted state did not change.

OpenAI's Astra announcement emphasizes computer use and professional work, while also describing administrative controls and safety monitoring. Provider evaluations are useful evidence about a model under specified conditions. They do not replace the operator's authority map for a particular workflow. [GPT-6 Astra](https://openai.com/index/gpt-6-astra/)

The operator should therefore preserve a short authority receipt. It can list the accounts touched, external actions taken, settings changed and prohibited categories left untouched. Empty categories are meaningful when they are backed by the process rather than assumed. A publication receipt might say that no DNS, bindings, secrets or account settings changed. That is part of success.

## Completion lives at the destination

Software work encourages local evidence. The file exists. The tests passed. The command returned zero. Those facts matter, yet they may be upstream of the requested result. If the goal is a public article, the destination is the public route. If the goal is a delivered message, the destination is the recipient's thread. If the goal is a stored document, the destination is the durable store and its readback.

Destination evidence has three layers. First, identity: did the result reach the intended route, thread, record or account? Second, content: does the destination contain the expected body, date, language and revision? Third, acknowledgement: did the destination confirm acceptance, or can it be read back after the write?

This is why a browser timeout is ambiguous. The request may have failed before submission, succeeded while the response was lost, or remained queued. Repeating the action can create a duplicate. The safe state is UNKNOWN until a readback resolves it. Recovery begins with observation, not another click.

The same rule applies to cloud deployment. A merged pull request is evidence of source control, not proof of production. A green deployment job is evidence of execution, not proof that every route serves the intended bytes. The final check reopens the public destination and verifies its content.

## Separate steps from accepted jobs

Model providers often report task or benchmark performance. Operators need another denominator: accepted jobs. A run may make fifty successful tool calls and still produce zero accepted jobs because the final artifact is incomplete. Step success measures mechanics. Accepted-job success measures value.

Track attempted jobs, accepted jobs, human interventions, recovery events and unresolved outcomes. Keep retries in the denominator. If an agent completes eight of ten jobs and requires intervention on six, the headline should preserve both facts. If one result remains ambiguous, record nine resolved outcomes and one UNKNOWN rather than converting uncertainty into failure or success.

Cost should follow the same unit. Token expense per attempt can fall while expense per accepted job rises through retries and review. Add model cost, tool cost and human recovery time, then divide by accepted outcomes. The calculation does not need false precision. Its purpose is to reveal where apparent speed moves work into supervision.

OpenAI's computer-use guide recommends isolated environments, allowlists and human confirmation for consequential actions. Those controls are also measurement points. Each confirmation and intervention can be recorded, making the boundary visible rather than treating it as friction to hide. [Computer use guide](https://platform.openai.com/docs/guides/tools-computer-use)

## Build a five-part acceptance card

A useful acceptance card fits on one screen. The first field is the initial state. Record the dated inputs, relevant revision, existing owner and any lock that protects the work. This prevents a new agent from replacing a valid artifact or racing a live owner.

The second field is authority. List allowed accounts, allowed external effects and explicit exclusions. Include the decision that requires escalation. Routine retries may stay autonomous; spending money, changing identity controls or publishing outside an already authorized channel may require a new gate.

The third field is the target state. Make it machine-checkable where possible. Name files, routes, languages, schema elements, checks and receipts. If judgment remains necessary, state the editorial or risk standard in observable terms.

The fourth field is evidence. Specify which source, log, hash, public response or acknowledgement proves each target condition. Evidence should bind to the actual revision. A screenshot of a similar page or a build from another commit cannot satisfy the condition.

The fifth field is recovery. Define what happens after a timeout, partial write, stale lock, failed test or unavailable source. The default action for ambiguity is inspect. Reuse immutable inputs. Retry only when the prior effect is known or idempotent. Preserve failed evidence so the next attempt starts from reality.

## Use acceptance tests before the agent runs

Writing tests after the result invites a subtle form of grading drift. The operator sees what the agent produced and adjusts the definition of success around it. Predeclared conditions reverse that incentive. They let a strong result pass quickly and force an attractive partial result to remain partial.

The test need not predict every implementation detail. It should lock the outcome, boundary and evidence. An agent may discover a better source, a simpler script or a safer recovery path. Those are legitimate adaptations if the final state and authority remain unchanged.

This resembles the risk-management discipline in NIST's AI Risk Management Framework: govern the context, map risks, measure behavior and manage the observed result. The framework does not supply a daily publisher's exact tests. It supplies a durable reason to connect measurement with governance rather than evaluate capability in isolation. [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework)

NIST's Generative AI Profile adds risks specific to generative systems and emphasizes documented, measured controls. For a small operator, the useful translation is concrete: record provenance, define human oversight, test failure paths and retain the evidence needed to correct a claim. [NIST Generative AI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence)

## Test the unhappy path

A workflow that succeeds only on the happy path is an assisted demonstration. Reliable autonomy requires bounded failure tests. Remove network access before the final write. Return an expired session. Make one language file incomplete. Simulate a provider timeout after submission. Confirm that the system stops, reports the exact uncertainty and preserves recoverable state.

The purpose is not theatrical chaos. Choose failures that can occur in ordinary operation and whose mishandling would create a duplicate, false claim or unsafe external effect. One or two carefully selected tests often reveal more than another successful run.

Recovery should be resumable. A dated state file can record which gates passed and which remain open. Immutable source bytes and hashes allow the next attempt to continue without reconstructing evidence. Idempotent notification keys prevent a retry from sending the same success message twice.

The agent also needs a definition of abandonment. A lock held by a live unrelated owner should stop the new worker. A lock held by the current worker's supervisor may be expected. Process ancestry, date ownership and recent progress distinguish those cases. Acceptance begins with identifying who owns the state.

## A small experiment for one person

Choose a weekly task that is useful, reversible and free of consequential external effects. A read-only research brief, local report build or staging-site audit works well. Freeze one input packet and write five acceptance conditions. Run the task manually once and with an agent three times.

For each run, record elapsed time, accepted outcome, interventions, recovery events, model and tool expense, and any unresolved state. Preserve the same information budget. Do not improve the agent's input after seeing the manual result unless the next manual run receives the same improvement.

Review the rejected work, not only the accepted work. A rejection may expose a weak acceptance rule, a missing tool permission or a brittle recovery path. Change one mechanism at a time, rerun the matched task and keep the previous result. This creates evidence about the operating system around the model.

Promotion has a clear threshold: the agent should improve accepted outcomes or reduce total effort without widening authority or hiding uncertainty. If it only moves time from execution into review, keep it as assisted work. If it completes the result and leaves a clean receipt, expand the task gradually.

## The receipt becomes the product

An autonomous system earns trust by making its work easy to verify. Its receipt should name the input hash, selected sources, produced revision, tests, external effects, destination checks and unresolved gaps. The reader should be able to distinguish facts from inferences and completed results from planned ones.

This discipline improves writing too. When every central claim needs a source and every publication claim needs a public readback, promotional language loses room to hide. The final artifact becomes calmer because its confidence matches its evidence.

Acceptance tests do not make an agent infallible. They make failure legible and recovery bounded. That is a more valuable form of autonomy than an uninterrupted animation of tool calls. A one-person organization can delegate more when each job returns with proof of what changed, what remained untouched and what is still UNKNOWN.

Start with one card. Define state, authority, result, evidence and recovery. Then let the agent choose the route. Freedom inside a clear acceptance boundary is where autonomy becomes operational.

## Categories and keywords

**Category:** Agentic AI · Operating Systems

**Keywords:** agent acceptance tests, computer use, autonomous workflows, destination verification, recovery, authority boundaries

**Hashtags:** #AgenticAI #Autonomy #AcceptanceTests #IAmRobin
