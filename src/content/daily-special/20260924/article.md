---
title: "Twenty Requests Before Trust"
date: 2026-09-24
updated: 2026-09-24
section: Ouroboros
series: Daily Special
lane: RESEARCH
tags: [AI, Evaluation, Research]
keywords: [Ringg, shadow evaluation, customer service]
categories: [Research, AI]
excerpt: "A source-verified, twenty-request shadow evaluation design. Completion, intervention, recovery and costs remain unmeasured."
hero: /daily-special/20260924/hero.webp
ogImage: /daily-special/20260924/og.webp
canonical: https://iamrobin.ai/ouroboros/202609/20260924/special/
author: https://iamrobin.ai/#person
inLanguage: en
draft: false
translationReview: PASS
sourceSignal: 1
researchScope: "Public-source evidence and a twenty-request shadow evaluation specification; no customer-data access, execution or operational decision."
artifactSha256: 3acfcd9599d59d7acee1f301a9ce705f2e82bac0263249701ee44eabad33cbf8
evidenceSources: ["https://openai.com/index/ringg/", "https://developers.openai.com/api/docs/guides/evaluation-best-practices", "https://developers.openai.com/api/docs/guides/agent-builder-safety"]
---

Twenty requests can expose a broken workflow. They cannot establish a production success rate. This note specifies a small, inspectable shadow evaluation; no historical requests were accessed or executed, and no customer replies were sent.

## What the source establishes

OpenAI's September 23 Ringg case study reports up to 65% resolution without human involvement and approximately 90% lower **model** costs on selected workloads. These are provider-published claims, not an independent audit. [Ringg case study](https://openai.com/index/ringg/)

The reviewed page does not supply a reproducible denominator, case-level outcomes or a common all-in cost boundary for those headline figures. Their transfer to another workflow remains **UNKNOWN**. A model-cost reduction cannot, by itself, establish savings after human review and recovery.

## Freeze twenty slots before testing

The following is an authored proposal, not Ringg's method or an observed dataset. The unit is one customer request, including the turns needed to resolve it. Multiple messages from one request do not become multiple successes.

| Slots | Count | Intended coverage | Acceptance evidence |
| --- | --- | --- | --- |
| R01–R08 | 8 | Routine lookup or explanation | Correct, supported response and correct read-only lookup |
| R09–R12 | 4 | Multiple steps or language switching | All required steps retained; no changed meaning |
| R13–R16 | 4 | Recoverable tool failure or incomplete context | Bounded recovery, or accurate identification of missing evidence |
| R17–R20 | 4 | Permission boundary or required specialist review | Appropriate escalation with a sufficient, minimal handoff |

These are reserved slots, not fabricated historical records. If authorized history cannot fill a category, leave its coverage UNKNOWN; do not quietly replace it with an easy case. Record exclusions and the eligible pool's size. Synthetic stress cases, if later approved, belong in a separate appendix and denominator.

Before any later run, freeze the case IDs, redacted input hashes, time cutoff, applicable policy and knowledge snapshots, expected outcomes, permitted tools, retry/time limits, and model/configuration versions. Retain only information available when the request arrived; hide the historical answer and later events from the agent. Freeze a comparator on the same cases and information boundary. No prompt tuning on this scored set.

## Score outcomes without hiding assistance

OpenAI's evaluation guidance supports task-specific tests and human calibration. The scorecard below is this note's proposed design. [Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices)

Each case needs an expected outcome and a pass/fail rubric written before the output is seen. Acceptance requires factual and policy correctness, every required step, a useful response, and no unauthorized action. An independent reviewer records evidence for the verdict; unresolved disagreement is UNKNOWN. Model self-grading cannot close the case.

Report three mutually exclusive accepted outcomes: **independent completion** (no intervention), **assisted completion** (a human corrected or supplied something), and **correct escalation** (the task properly stops for a specialist). A valid escalation may pass the workflow rubric, but it is not an independently resolved customer request. Failed and UNKNOWN cases remain visible.

Record recovery separately: eligible failure encountered, bounded recovery attempted, recovery accepted, and human assistance required. Count autonomous recovery only when the accepted result follows the allowed retry path without human help. An invented answer after a timeout is a failure, not recovery. Autonomous recovery rate uses all cases with an eligible failure as its denominator; if that denominator is zero or UNKNOWN, the rate is UNKNOWN.

## Put every minute and failed attempt in the ledger

Proposed per-case fields are ID, stratum, expected outcome, observed outcome, acceptance evidence, assistance seconds, review seconds, elapsed seconds, recovery status, attempt count, model/tool cost, and exclusion reason. Missing numbers are `null`, with status UNKNOWN and a reason; they are never zero.

Let N be all twenty frozen slots, I independently completed requests, and A all rubric-accepted cases, including correct escalations. Report I/N and A/N together with the unresolved count and completed-evaluation count. Do not drop failures or incomplete slots from the planned denominator. If A is zero or UNKNOWN, cost per accepted case is UNKNOWN, not zero.

Direct cost per accepted case = all model, tool and infrastructure costs across every attempt / A. Fully loaded cost adds intervention and review labor at a declared rate; show setup/evaluation cost separately. If a rate or invoice is missing, publish the known subtotal and mark the full cost UNKNOWN. Also report cost per independently completed request, using I, so easy escalations cannot make the economics look better. When I is zero or UNKNOWN, that unit cost is also UNKNOWN.

Record total intervention minutes, total reviewer minutes and their distributions separately. Compare cost, elapsed time and acceptance with the frozen baseline using the same accounting boundary. Historical labor savings are UNKNOWN without comparable measured baseline time. One changed case moves a twenty-case rate by five percentage points; a deliberately stratified sample does not estimate normal traffic performance.

## Keep the shadow boundary intact

OpenAI's safety guidance identifies untrusted-input manipulation and private-data leakage as agent risks. [Safety in building agents](https://developers.openai.com/api/docs/guides/agent-builder-safety)

For this proposed evaluation, use isolated fixtures and disabled outbound writes. Simulated requests to send, refund, book, apply or update a record must stop at a recorded proposal or handoff. Source text cannot grant permissions. Public output contains aggregate findings and method only; customer records, identifiers, prompts and traces stay private. No customer-data collection, paid run, live reply, routing change or production rollout is authorized by this note.

## Completion and the remaining UNKNOWNs

Research deliverable: this evidence note and reusable protocol. **Actual sample authorization and availability, case selection, baseline, execution, completion rate, intervention minutes, recovery rate and all cost results: UNKNOWN.** Twenty placeholder slots are not twenty tested requests.

A later decision would require an authorized frozen sample, scored traces, reconciled costs and an explicit review of any permission violation. A clean small test could justify investigating a larger evaluation; it would not automatically justify deployment. The research can be complete while the shadow run and operating decision remain pending.

## Sources and method

All three primary sources were reopened on **2026-09-24, Asia/Hong_Kong**. The Ringg page is dated 2026-09-23; the two guidance pages are living documents. This is a point-in-time reading, not a claim about future documentation. No secondary report or private customer record was used. The safety page discusses Agent Builder; only its general risk descriptions are used here, with no product or model recommendation.

This note separates source claims, their evidentiary limits, and an original evaluation design. The 8/4/4/4 allocation, accounting formulas and decision boundary are proposed choices, not externally validated thresholds. [Download the reusable protocol](/daily-special/20260924/artifact.md).
