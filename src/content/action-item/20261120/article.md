---
title: "The Agent Learned the Procedure"
date: 2026-11-20
updated: 2026-11-20
section: Ouroboros
series: Daily Action Item
hero: /action-item/20261120/hero.webp
ogImage: /action-item/20261120/og.webp
ledgerId: PROCEDURAL-MEMORY-BOUNDARY-20261120
draft: false
categories:
  - Agent Workflows
  - AI Verification
  - Editorial Systems
tags:
  - Perplexity Computer
  - Agent skills
  - Honest Agent
  - procedural memory
keywords:
  - reusable agent skills
  - skill promotion
  - procedural memory
  - approval boundaries
author: https://iamrobin.ai/#person
sourceAction: "2026-11-20 Daily Briefing, item 5"
visualHeadline: "A procedure must earn its place."
visualSubhead: "EVIDENCE · REPLAY · BOUNDARY"
visualFooter: "Keep what improves the work"
visualNodes: "EXPERIENCE|TEST|APPROVE|REVERSE"
thesis: "Promote a reusable agent procedure only when replay shows useful improvement while preserving approval boundaries and reversibility."
excerpt: "Perplexity reports gains from reusable agent skills; the harder question is when a successful procedure deserves durable authority."
canonical: "https://iamrobin.ai/ouroboros/202611/20261120/action_item/"
inLanguage: en
---

# The Agent Learned the Procedure

An AI assistant becomes an agent when it can take steps toward completing a job: open a file, use software, check a result and decide what to do next. Recurring jobs create a familiar problem. Each time the work begins, someone may have to explain the same procedure again.

A skill gives the agent a reusable set of instructions, sometimes accompanied by scripts that carry out parts of the work. A personal skill guides work for one user. A built-in skill can guide work for many people.

Think of a skill as a checklist beside a worker. A useful checklist preserves a lesson: check the address before sending the parcel. A careless checklist can preserve a shortcut just as efficiently. Once written down, either procedure becomes easier to repeat.

That is the promise, and the difficulty, behind a system Perplexity described on November 18, 2026. The AI company published *Self-improving skills*, explaining how its Computer agent can use evidence from previous activity to propose changes to reusable instructions. In this system, personalization changes the context and instructions supplied to the model. The model’s underlying learned parameters, often called its weights, stay fixed.

The agent has acquired a procedure. The consequential question is how that procedure earns a place in future work.

## From an experience to a standing instruction

Perplexity describes four stages: evidence, reflection, verification and activation. Experience supplies evidence; reflection proposes a change; verification tests it; activation makes an accepted change available for use.

The distinction between proposing and activating matters. A successful attempt gives the system something to investigate. Turning that attempt into a standing instruction gives it influence over later jobs, including jobs with different details.

For automatically generated personal skills, Perplexity requires two independent occurrences of the same reusable behavior before creating a skill. One grounded occurrence can justify updating an existing skill. That gives the system different thresholds for establishing a new procedure and correcting one already in use.

Personal-skill proposals undergo deterministic checks—checks whose results follow fixed rules—and a sample also receives review by a model. Perplexity caps automatically created personal skills at ten per user. At capacity, adding a skill requires retiring another and explaining why the replacement deserves the space.

That cap makes procedural memory a selection problem. Instructions accumulate easily. Keeping the useful ones requires decisions about which lessons still apply, which overlap and which have been overtaken by a better way of working.

Built-in skills receive broader scrutiny because a change can reach many users. Perplexity describes a process using evidence cleaned of sensitive information, constructed failure scenarios reserved for evaluation, comparisons of the original and revised procedures, previously successful sessions and internal human review.

Before reaching that human review, a candidate must pass every failure scenario, improve at least one scenario where the original failed, and preserve performance on the control sessions. Those controls are jobs the existing procedure already handled successfully.

Returning to the checklist analogy, a revision earns its place by catching a previously mishandled parcel while keeping correctly addressed parcels moving to the right destinations. The test includes both the problem being repaired and the work already going well.

## What Perplexity measured

Alongside the process, Perplexity reported results from an eight-week randomized experiment. Automatic personal-skill improvement was associated with an 11% reduction in tool-call failures across all Computer activity. A tool call is an agent’s request for software to perform an action. Excluding background runs, the reported reduction was about 7%.

Perplexity also reported 7.6% lower measured dissatisfaction. Cost and response-time measurements showed no measurable change.

These measures describe different parts of the experience. A failed software action can interrupt a job. Dissatisfaction concerns the user’s response to the experience, as measured by the provider. Cost and speed describe other practical consequences. Keeping them separate helps a reader understand what improved and what remained steady within the experiment’s ability to measure change.

A second, narrower evaluation used SkillLearnBench, a test of learning reusable skills. Across 16 paired instances spanning nine task families, reported task success rose from 43.8% with generated skills absent to 62.5% with them available.

That is a promising result within a small test. A software benchmark measures performance on selected tasks under selected conditions. Helpfulness in a workplace also depends on the quality of the finished work, the time a person spends supervising it and what happens when something goes wrong.

Both evaluations were run by Perplexity. Independent replication remains an open question in the reviewed evidence, and the product article provides only partial disclosure of the task mix, evaluation prompts, judging behavior and statistical uncertainty. Transfer to other agent systems remains unknown.

The results support further investigation of reusable instructions as a way to improve agent performance. Their practical reach will become clearer through broader, independently examined use.

## Success and permission are separate judgments

A procedure can produce the requested deliverable and still carry a serious flaw. It might rely on a fragile shortcut, consume excessive resources or cross an approval boundary.

Consider an illustrative case: an agent is asked to prepare a document for review, and it produces an accurate document while also publishing it through an action that required prior approval. The document’s quality and the publishing breach are both part of what happened. Preserving the whole sequence as a successful procedure would preserve the breach too.

Honest Agent’s public protocol offers a useful distinction here. It asks whether the requested job was completed for the correct target, and separately whether every operation requiring approval had prior approval for its exact target. The two judgments are made independently. Where the evidence is insufficient, the protocol permits an `unknown` finding.

Its outcome categories therefore distinguish compliant success, success accompanied by a breach, false claims of success and other outcomes. The proposed study compares judgments made from an agent’s report alone with judgments made from the report plus a record of its actions. This remains a draft secondary-study protocol; its contribution here is a design principle.

That principle changes what counts as evidence for a reusable skill. An agent’s summary may say that it finished the work. A replayable action record can show which resources it touched, which steps failed, how it recovered and where approval mattered.

The summary supplies a claim. The record gives a reviewer a way to examine it.

## When a procedure earns its place

The deceptively simple question is now clearer: when does one successful experience deserve permanent authority?

A sensible answer begins by treating that experience as a candidate lesson. Preserve the existing procedure as a fixed baseline, then compare it with the proposed revision on the same tasks. Include the failure that inspired the change and jobs that previously succeeded. This makes the tradeoffs visible.

Deliverable quality, total cost, human intervention time, recovery behavior and boundary adherence each deserve a separate judgment. Combining them too early can hide the reason a procedure appears better. Higher task completion might come with more supervision; faster execution might accompany weaker recovery.

A candidate deserves rejection when replay shows a brittle shortcut, degraded work or an approval breach. When evidence remains too thin, the candidate can stay under evaluation. Promotion becomes justified when repeated, inspectable results show useful improvement while preserving the required boundaries.

Activation should also remain reversible. Version history preserves what changed. A rollback path allows an earlier procedure to be restored if live use reveals a problem. Retirement criteria help remove a skill when its assumptions become obsolete or another procedure demonstrates greater value.

The depth of checking should match the reach of the change. A narrow personal instruction affects a smaller circle of work. A built-in instruction used by many people warrants broader evidence before activation.

For RobinOS, such a replay comparison remains a proposed, bounded experiment. Its outcome is unknown. Perplexity’s reported gains provide a reason to investigate, while Honest Agent’s distinction helps define what the investigation should measure.

Durable memory gives yesterday’s experience influence over tomorrow’s decisions. A procedure earns that influence when replay shows a net improvement while preserving safety, evidence quality and the ability to reverse or retire it.

Sources:

- Perplexity, [*Self-improving skills*](https://www.perplexity.ai/en-GB/hub/blog/self-improving-skills), November 18, 2026.
- Honest Agent, [public protocol](https://github.com/Robin84Bran/honest-agent/blob/main/v0.3/PROTOCOL.md), draft secondary-study protocol.