---
title: "Who Decides an Agent's Work Is Done?"
date: 2026-11-21
updated: 2026-11-21
section: Ouroboros
series: Daily Action Item
hero: /action-item/20261121/hero.webp
ogImage: /action-item/20261121/og.webp
ledgerId: AGENT-COMMERCE-ACCEPTANCE-20261121
draft: false
categories:
  - Agent Commerce
  - AI Verification
  - Financial Infrastructure
tags:
  - agent commerce
  - x402
  - A2A
  - ERC-8183
  - ERC-8004
keywords:
  - agent acceptance
  - machine payments
  - evaluator trust
  - digital delivery
author: https://iamrobin.ai/#person
sourceAction: "2026-11-21 Daily Briefing, item 5"
visualHeadline: "Delivery is only one event."
visualSubhead: "PAYMENT · ARTIFACT · ACCEPTANCE"
visualFooter: "Who may say the work is done?"
visualNodes: "QUOTE|PAY|DELIVER|ACCEPT"
thesis: "Agent commerce needs acceptance rules that distinguish payment, technical delivery and a buyer-approved outcome."
excerpt: "Agents can purchase services and receive files; the harder question is who has earned authority to accept the result."
canonical: "https://iamrobin.ai/ouroboros/202611/20261121/action_item/"
inLanguage: en
---

# Who Decides an Agent's Work Is Done?

Buying something online usually gives us several moments to recognize. We approve a price. A payment goes through. A delivery arrives. Then we decide whether we received what we wanted.

Software is beginning to handle more of that sequence. An AI agent is a program that can carry out steps toward a goal: find a service, request a price, arrange a purchase and retrieve the result. In agent commerce, one agent may buy a service from another on a person’s behalf. The work could involve access to data, a digital service or a commissioned report.

That brings a familiar buyer’s concern into a new setting. Payment, delivery and satisfaction each mean something different. As systems make purchasing easier for machines, they also need a way to decide when a purchase has fulfilled its purpose.

Several public workflows and proposed standards show how the pieces could fit together. Their story begins with a quote.

## From a request to a delivery

CROO, a service for purchasing through AI clients, presents a three-step process on its public product page. A user describes a job and chooses a service, confirms the quote, then receives the delivery in the conversation. CROO says its skill—a package of instructions for an AI client—works with Claude Code, Codex and other clients.

Its displayed example is concrete. A monthly image-publishing service costs 30 USDC, a digital token designed to track the US dollar. The quote adds 0.02 USDC in “gas,” the fee for processing a blockchain transaction, bringing the total to 30.02 USDC. The transaction uses Base, a blockchain network.

The example also names CAP escrow. Escrow is an arrangement that holds payment while agreed conditions are handled. It gives money a place to wait as the purchase proceeds.

The demonstration includes a service deadline of under 30 minutes and a refund if that deadline is missed. It explicitly asks the user to approve payment. CROO’s safeguards say every payment requires user approval, and a change to the service, price or requirements requires fresh approval.

The delivered item shown is a redeem code.

This sequence makes the purchase easy to follow. The buyer sees the service and price, approves the payment, and receives something usable in the conversation. CROO’s order interface further separates preview, confirmation, status and result retrieval.

The evidence here is a public product demonstration. An independently verified purchase, buyer acceptance decision or dispute resolution would provide a further kind of evidence: how the workflow performs in an actual transaction.

Even at the demonstration level, the sequence reveals an important distinction. Approval of the quote expresses agreement to buy. Arrival of the redeem code records delivery. Whether the purchase satisfies the buyer depends on the service promised and the conditions agreed.

**As an illustration**, imagine a parcel arriving at your door. The delivery record establishes that a package reached you. Opening it lets you check whether the correct item is inside. With an AI-generated report, the equivalent inspection may involve reading the evidence, checking calculations and deciding whether the report answers the original question.

## What the systems can establish

Amazon Web Services describes another part of this purchasing sequence in an architecture for AI agents buying access to products through AWS Marketplace.

The architecture uses x402, an open payment standard built around HTTP 402, “Payment Required.” HTTP is the system of requests and responses that software uses to communicate across the web. x402 gives a seller a way to state payment requirements in a form a machine can read, and gives a buyer a way to supply payment proof.

In the AWS flow, the agent receives the requirements, authorizes and submits payment through its configured payment system, then accesses the paid resource.

That is a useful accomplishment. A program can encounter a paid service and follow a defined process to purchase access. The x402 white paper describes this approach for APIs—interfaces through which programs request services—as well as data and other digital services.

The evidence produced has a specific meaning: the payer satisfied the seller’s payment requirement. Evaluating the usefulness or factual quality of the purchased work belongs to a further step.

Google’s Agent2Agent protocol, called A2A, addresses collaboration and delivery. It gives agents a standard way to discover capabilities and exchange work. Google’s implementation article describes a task moving through states such as *submitted*, *working*, *completed* and *failed*.

The output is called an **artifact**. In everyday language, that means the thing the task produced: a file, report or another deliverable.

A completed A2A task communicates that the remote agent produced its artifact. This helps the requesting system coordinate its next action. Business acceptance then depends on the buyer’s requirements and the rule used to evaluate the result.

Together, these systems make several events legible to software: payment requirements received, payment supplied, work underway, output delivered. After delivery comes the question that gives the whole purchase its meaning: who decides whether the output fulfills the brief?

## Giving someone the authority to accept

ERC-8183, a proposed Ethereum standard called Agentic Commerce, makes that decision an explicit role.

It introduces an **evaluator**: a person, program or blockchain contract assigned to judge submitted work against requirements. A blockchain contract is software that executes rules on the network. Under the proposal, an evaluator or evaluator contract can decide whether a submitted job becomes *Completed* or *Rejected*. *Expired* is another final outcome in its job lifecycle.

Here, completion incorporates a designated decision about the submission. The proposal supplies a vocabulary for assigning that authority. Its status as a proposed standard keeps the distinction clear between a published design and evidence of adoption or evaluator accuracy.

The appropriate evaluator may depend on the job.

For a tightly specified digital delivery, a program might check whether a file matches an agreed fingerprint, contains the required fields or passes a test suite. A deadline is similarly measurable. Each check can answer a precise question established beforehand.

Research, design and writing call for broader judgment. A report can arrive on time and open successfully while still requiring careful review of its sources and reasoning. A design can meet size requirements while its suitability for the intended audience remains a matter for evaluation. Buyer review, a specialist evaluator or a combination of software checks and human judgment may suit these jobs.

Writing acceptance criteria before payment gives that judgment a shared reference. Preserving the delivered artifact allows the parties to examine the same work. An agreed appeal or refund path gives them a process when their assessments diverge.

The evaluator also becomes someone the buyer and seller must trust. Its identity, incentives, evidence and history of errors matter because its decision can determine the outcome of the purchase.

ERC-8004, another Ethereum proposal, addresses identity, reputation and validation records for agents. It allows feedback with values and tags such as quality, success rate, uptime and response time. ERC-8183 recommends connecting job outcomes to reputation signals.

Such records could help future buyers choose whom to hire. Their value depends partly on who supplied the feedback. ERC-8004 warns that unfiltered feedback is exposed to spam and Sybil attacks, in which one actor uses multiple identities to influence a system. Its summary function therefore requires filtering by client addresses.

Reputation records earlier judgments. Acceptance decides the present job. Both can help a market function, and each requires evidence appropriate to its purpose.

The reviewed sources offer product workflows, payment mechanisms, collaboration protocols and proposed standards. Their evidence supports several possible approaches to acceptance; comparative performance across different kinds of work remains an open research question.

A machine can receive payment instructions, purchase access and collect an artifact. For a precise job, an agreed test may settle acceptance. For an open-ended assignment, the buyer or a specialist may carry more of the judgment.

When a machine can pay another machine and receive a file, who has earned the authority to say the work is done?

Sources:

- [CROO public product workflow](https://agent.croo.network/skill)
- [AWS Marketplace and x402 payment architecture](https://aws.amazon.com/blogs/machine-learning/enable-ai-agents-to-pay-for-aws-marketplace-x402-products-with-amazon-bedrock-agentcore-payments/)
- [x402 white paper](https://x402.org/wp-content/uploads/sites/10/2026/06/x402-whitepaper.pdf)
- Google’s [A2A introduction](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/) and [implementation account](https://developers.googleblog.com/build-cross-language-multi-agent-team-with-google-agent-development-kit-and-a2a/)
- [ERC-8183 Agentic Commerce proposal](https://eips.ethereum.org/EIPS/eip-8183)
- [ERC-8004 identity, reputation and validation proposal](https://eips.ethereum.org/EIPS/eip-8004)
