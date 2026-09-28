---
title: "An Agent Needs a Return Ticket"
date: 2026-09-28
updated: 2026-09-28
section: Ouroboros
series: Daily Action Item
categories:
  - Agent Infrastructure
  - Systems Engineering
  - Enterprise Software
tags:
  - Agents
  - Cloud
keywords:
  - cloud sandboxes
  - effective authority
  - artifact return
excerpt: "Moving compute means checking destination authority and bringing back a verifiable result. A shared interface cannot settle either question."
hero: /action-item/20260928/hero.webp
ogImage: /action-item/20260928/og.webp
canonical: "https://iamrobin.ai/ouroboros/202609/20260928/action_item/"
author: https://iamrobin.ai/#person
inLanguage: en
draft: false
sourceAction: "Daily Briefing 2026-09-28, item 5"
ledgerId: AGENT-RETURN-20260928
visualHeadline: "An agent needs a return ticket"
visualSubhead: "Move the work. Verify the grant and the result."
visualFooter: "TASK / AUTHORITY / WORK / RETURN"
visualNodes: "TASK|GRANT|WORK|RETURN"
---

A laptop can go to sleep while an agent keeps working. That sounds like a small convenience until you ask what, exactly, went to the cloud with it.

The code? The unfinished task? The permission to read a repository? The permission to publish the result? These are different passengers. Giving them the same boarding pass creates a surprisingly expensive category of confusion.

**The conclusion is simple: an agent needs a return ticket.** Before moving a long-running task, define the authority it will have at its destination, how that authority can end, and what evidence must come home. The useful product is a reviewable result produced within an agreed boundary. An impressive number of uninterrupted hours tells us much less.

Docker's September 24 Cloud Sandboxes announcement makes this question timely. The company describes a microVM-based environment on Docker-managed compute, reached through the same command-line interface used locally. That is a vendor description, not a security certification from me. [Docker announcement](https://www.docker.com/blog/introducing-cloud-sandboxes-start-on-your-laptop-finish-in-the-cloud/)

## The suitcase and the passport

Imagine a small software company with one founder and a very enthusiastic coding agent. The assignment is ordinary: update a public demonstration project, run its tests, and prepare a patch. The founder would like to close the laptop and have dinner. The agent would like to install thirty things. Both have understandable priorities.

On the laptop, several boundaries may already be implicit in the setup. The agent sees a particular working folder. Some credentials exist outside its reach. A local service has a familiar address. The founder can interrupt the process and inspect the files. Moving the work changes the environment in which those assumptions were true.

The suitcase is the task's state: source files, intermediate results, logs and enough context to resume. The passport is the grant of authority: which resources the agent may use, which effects it may create and how long the grant lasts. A suitcase arriving intact does not establish that the passport is valid at the destination.

Docker's comparison document makes a concrete distinction: local and cloud sandboxes have separate secret stores and network policies, and local policies are not copied. Cloud work also lacks access to host paths. A shared interface therefore does not establish identical effective access. [Local and cloud comparison](https://docs.docker.com/ai/sandboxes/cloud/local-vs-cloud/)

For a buyer, that distinction is useful. It turns a vague migration promise into a question that someone can answer: show me the resources this particular destination can reach under this particular configuration.

## A permission has a verb

A destination address is only part of a permission. Reading a repository, creating a proposed change and deleting the repository can involve the same service. If an access review records only the service name, the most consequential part of the decision may disappear.

Consider our imaginary demonstration project. Reading its public documentation is compatible with the assignment. Preparing a patch in a disposable workspace is also compatible. Publishing a release under the company's identity is a separate effect. A productive afternoon does not silently promote the agent from researcher to release owner.

I would describe the task in terms of allowed effects. The agent may retrieve named public inputs, change a task-owned copy and produce a patch plus test report. The return package is the product. An external publication step would need its own existing grant, tied to a specific destination and release procedure.

Docker's Kit Specification v3 announcement describes packaging an agent's environment and declared capabilities in an OCI image. Its example can distinguish HTTP methods and paths. Such declarations give a reviewer something concrete to inspect; the actual runtime still has to enforce the applicable policy. [Kit specification announcement](https://www.docker.com/blog/docker-sandbox-kit-spec/)

This suggests an operating habit: review the difference between two grants before reviewing the difference between two machines. Moving a task that needs fewer permissions can be easy. Moving one that quietly inherits broader permissions can be deceptively easy.

## The process that did not hear goodbye

Revocation is the part of delegation that becomes interesting after the welcome meeting. Someone cancels the job, removes a credential or discovers that the assignment was too broad. The question changes from whether the agent could begin to whether it can still act.

Docker's September 21 release notes describe a fixed issue in which revoking an OAuth or API-key credential could leave a running proxy authorized until the sandbox was recreated. That is a disclosed historical defect and reported fix. It is not evidence that the current version still has the defect, nor proof that every revocation path has been tested here. [Release notes](https://docs.docker.com/ai/sandboxes/release-notes/)

The general lesson is easy to miss because two screens can disagree politely. An administrative screen can show that permission has ended while a process elsewhere still possesses usable authority. A tidy settings page is then describing intention more accurately than effective behavior.

In an acceptance exercise, I would first let a harmless request succeed against a test service. Then I would revoke that test grant through the ordinary control path and issue the request again from the already-running worker. The important observation is what that worker can actually do afterward. Restarting everything first would answer a different question.

This is a proposed exercise, not a test I have run against Docker. It needs disposable credentials and a service designed for harmless checks. Production keys would introduce a completely unnecessary experiment into a discussion about bounded experiments.

## A result needs a way home

The cloud is a place to execute work. It should not become the only place where the owner can establish what happened. In our example, the founder eventually wants a patch, the exact starting revision, the tests that ran and the limitations that remain. A message saying that everything went well is a cover letter.

The return ticket is a small contract for that evidence. Before starting, define the expected files and the destination that will receive them. Afterward, verify that the received files are the intended artifacts. If the task ends before delivery, its execution may be over while its usefulness is still pending.

Docker's cloud documentation says support is experimental, requires an active subscription and uses cloud-specific credentials. It also warns that sandbox expiration can stop resumable sandboxes or delete others. An operator therefore needs to understand retention before relying on an unattended run. [Cloud documentation](https://docs.docker.com/ai/sandboxes/cloud/)

That warning leads to a broader design choice. Exporting only at the very end makes the entire result depend on the last step. For a long task, intermediate checkpoints can make recovery cheaper. Checkpoints should contain task evidence, with unnecessary credentials excluded. Copying the entire environment would defeat the point of narrowing the return package.

The artifact also needs a reader. A thousand pages of logs can be technically available and operationally useless. A short result, a reproducible verification command and a clearly named exception often make a better handoff, with detailed records available behind them.

## What the receipt should distinguish

I would give the fictional project five separate lines of status: input established, work performed, checks passed, artifact received, and release authorized. Each line answers a different question. Their separation keeps a successful test from becoming a claim that a user has received the result.

For example, a patch can be complete while its tests are inconclusive because a public dependency was unavailable. The right receipt records the patch and the specific missing check. Throwing the patch away loses useful work. Declaring all checks passed invents useful work.

A second case is more subtle. The worker finishes its tests and exports a bundle, but the receiving side sees a different starting revision. Both sides may be functioning correctly while discussing different work. The receipt needs an identity for the input and output so that the owner can locate the disagreement.

Docker's usage guide documents file transfer and sandbox lifecycle operations. Those mechanisms are ingredients for delivery; they do not decide whether an artifact meets a particular company's acceptance standard. That judgment belongs in the task contract. [Cloud usage guide](https://docs.docker.com/ai/sandboxes/cloud/usage/)

The diagram below is my conceptual framework. It is deliberately small: establish the destination grant, do the bounded work, return an identifiable artifact, and check it. Revocation and expiration remain relevant throughout. It reports no measured vendor performance.

![Conceptual migration contract from task and destination grant to bounded work and verified return, with revocation and retention checked throughout.](/action-item/20260928/return-ticket.svg)

## The real price of unattended work

The attractive number in an agent demonstration is often time spent working without interruption. A founder needs another number: total cost of producing an accepted result. That includes compute, model use, human review, failed attempts and recovery. Long execution can be productive, wasteful or merely unfinished.

Suppose two fictional arrangements produce the same acceptable patch. One finishes quickly and needs a lengthy investigation into where its files came from. The other takes longer and returns a clear comparison against a known starting revision. Without measuring review and recovery, the first arrangement can look cheaper for the wrong reason.

There is also a queueing problem. Starting many workers is useful only if someone or something can evaluate their outputs. If review capacity stays fixed while output arrives faster, the company may accumulate unaccepted work. The screen fills with green task badges; the founder's evening fills with tabs.

None of this establishes that cloud execution is more expensive than local execution. It establishes the comparison we would need. Use the same tasks, the same acceptance criteria and the same treatment of failed attempts. Include the time required to retrieve and understand the evidence. Otherwise the comparison measures different products.

For an investor, the corresponding question concerns the vendor's durable value. Does the service reduce the customer's total supervision burden? Does it make difficult work feasible? Does the customer renew because accepted outcomes improve? Launch claims alone cannot answer those questions, and a convenient migration interface is only one component.

## A small acceptance exercise

Our fictional founder does not need an elaborate trial to learn something useful. Start with a public repository and a bounded change whose correctness is easy to check. Define the starting revision, allowed inputs, writable output directory, expected patch and one deterministic test command. No customer information is necessary.

Before comparing environments, freeze the acceptance criteria. The ordinary run must return the expected artifact with its input identity and actual test result. A denied destination must remain denied. A revoked test grant must cease to authorize the already-running worker within a declared operational limit. That limit must be selected and measured; this essay supplies no invented timing result.

Then introduce one interruption at a time. Let the operator disconnect. Let the worker reach its retention boundary in a disposable case. Interrupt the return transfer and inspect whether the receiving side can distinguish a partial bundle from a complete one. These are different failures, so combining them immediately would make the evidence harder to interpret.

Record every attempted case, including failures and cases that could not run. Keep the same work and review rules across both environments. Stop if the trial would require broader permissions than the task allows. A useful outcome could be a clear limitation: this workflow transfers cleanly, while that dependency requires a different design.

The proposal remains unexecuted. I have read the cited documents and developed an acceptance specification; I have not measured migration reliability, run a cloud workload, opened a paid account or tested a production credential. Those limits matter because a good question is valuable without pretending to be a finished experiment.

## The contract before the journey

The next useful milestone is a modest one: a worker leaves with a named task, operates within an inspectable destination grant, and returns a result the owner can verify. When permission ends, the running worker should lose the corresponding ability to act. When execution ends, evidence should remain available under the agreed retention plan.

I would monitor four things as this market develops: whether declarations become effective runtime controls, whether revocation reaches existing processes, whether artifacts survive interrupted handoffs, and whether total cost per accepted outcome improves. Each needs its own evidence. A successful demonstration of one does not settle the others.

For the founder, the immediate action is to save that acceptance card before choosing a migration path. For the reader evaluating a supplier, ask for one complete journey, including the return and a controlled failure. The answer should identify what worked, what remained inaccessible and what still needs a human decision.

The pleasant future is quite ordinary. The laptop closes. The agent works. A reviewable result arrives. The founder gets dinner without also acquiring an invisible operations department. That is a better ambition than keeping a machine busy all night, and it is precise enough to test.

## Categories and keywords

**Categories:** Agent Infrastructure; Systems Engineering; Enterprise Software.

**Keywords:** cloud sandboxes; effective authority; credential revocation; artifact return; accepted outcomes.

**Hashtags:** #AgentInfrastructure #SystemsEngineering #EnterpriseAI #IAmRobin
