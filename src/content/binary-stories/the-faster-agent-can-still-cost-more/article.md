---
title: "The faster agent can still cost more"
storySlug: "the-faster-agent-can-still-cost-more"
date: "2026-11-16"
updated: "2026-11-16"
lane: "INVEST"
excerpt: "A shorter browser run is not yet a cheaper outcome. The useful unit is total model, runtime and technician cost divided by accepted completions."
hero: "/binary-stories/the-faster-agent-can-still-cost-more/hero.webp"
ogImage: "/binary-stories/the-faster-agent-can-still-cost-more/og.webp"
keywords: ["computer-use agents", "legacy portals", "accepted completion", "human intervention", "cost per outcome"]
canonical: "https://iamrobin.ai/binary/stories/the-faster-agent-can-still-cost-more/"
inLanguage: "en"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202611/20261116/special/"
sourceArtifactSha256: "5ca4ea84cc150b687e922198db293153423ce171de697754363694b66aeb1cfd"
carouselPdf: "/carousels/the-faster-agent-can-still-cost-more.pdf"
carouselCaption: "/carousels/the-faster-agent-can-still-cost-more.txt"
carouselPages: 7
draft: false
---

A faster agent can still be the expensive one.

That sounds wrong until the stopwatch is placed beside the invoice.

Shield Technology Partners reports that GPT-6 Astra completed its computer-use tasks 35–40% faster on average than the older models it had used. Shield also reports fewer failures, fewer timeouts and less technician effort. Those are promising company-reported signals from live browser workflows.

But speed and cost answer different questions.

Speed asks how long an included run took. Cost per accepted completion asks how much the whole system consumed to produce work that passed an independent final-state check.

The distinction matters most in the old websites where computer-use agents are useful. A legacy portal may have no API. The agent reads the screen, clicks, types and responds to whatever appears next. A quick path through that interface is valuable. It is not yet proof that the intended licence, ticket or device record ended in the right state.

## The stopwatch stops before the ledger closes

Imagine two browser agents.

Agent A reaches the final screen in six minutes. It sometimes needs a technician to rescue a stalled form, and occasionally declares success before the underlying record changes.

Agent B takes eight minutes. It recovers more failures itself and reaches the required final state more often.

Nothing in the public Shield material says this is what happened. It is a conceptual comparison that exposes the accounting problem: the faster run can lose once rescue time and rejected outcomes enter the denominator.

![A browser run flows through execution, destination readback and acceptance. Model, runtime and technician costs accumulate across every attempt before accepted completions become the denominator.](/binary-stories/the-faster-agent-can-still-cost-more/hero.webp)

The stopwatch sees six minutes versus eight. The operating ledger sees model usage, browser infrastructure, retries, active technician minutes and accepted outcomes.

One is a run metric. The other is a unit-economics metric.

## Put every attempt in the denominator

The source research proposes a complete record of 100 runs through one frozen legacy-portal workflow. The 100 runs have not been executed. The value of the design is its refusal to discard inconvenient attempts.

Each run would finish in one of six mutually exclusive states:

1. accepted on the first pass;
2. accepted after the agent recovered;
3. completed by a technician after takeover;
4. falsely declared complete;
5. stopped safely at an approval or policy boundary; or
6. failed or timed out.

Only the first two count as accepted autonomous completions. Human-completed work still matters to the customer, but it carries a different labor claim. A safe stop can prove that a control worked while leaving the task unfinished. A false completion is especially costly because it can look cheap until someone reopens the destination.

This classification prevents three flattering shortcuts: calculating speed only on successful runs, hiding human rescues inside “completed,” and treating a correct safety stop as delivered work.

## The useful equation is deliberately boring

For a fixed set of attempts:

**cost per accepted completion = (model + browser/runtime + active technician cost) ÷ accepted autonomous completions**

If accepted completions equal zero, the ratio is unavailable. The money spent remains visible.

The formula is simple because the hard work is in the definitions. What counts as active technician time? Does a required approval belong in the task design or in rescue labor? Which system confirms the final side effect? Are retries included in model and runtime cost? Those rules must be frozen before the results appear.

The same discipline applies to elapsed time. Median duration describes the middle run. A 95th-percentile duration exposes the slow tail. Neither should erase timeouts, interruptions or takeovers from the outcome record.

## Faster becomes valuable when the other terms hold

Speed is not a vanity metric. If acceptance, recovery and intervention remain equal, a 35–40% reduction in elapsed time can improve capacity and cost. If technician effort also falls, the case becomes stronger.

The point is not to dismiss Shield’s report. It is to identify the evidence that would make the economic conclusion portable beyond the company’s own account.

Freeze one supported task, its start state, permissions, time limit, retry rule, acceptance check and baseline. Run the same preselected cases. Keep every attempt. Then compare:

- accepted completion rate;
- recovery rate with its actual failure denominator;
- active technician minutes per run and per accepted completion;
- total cost per accepted completion; and
- median and tail elapsed time.

That record can show whether faster execution creates cheaper accepted work, merely shorter attempts, or a tradeoff between the two.

The fastest lap is easy to admire.

The investable operating fact is the cost of work that arrived correctly.

---

**Sources:** OpenAI’s [Shield customer story](https://openai.com/business/customer-stories/shield/), Shield’s [Forge product page](https://shieldtp.com/forge) and [September 2026 Forge announcement](https://shieldtp.com/company-news/forge-building-for-it-services-from-the-inside-out), plus the hash-bound [source Special](https://iamrobin.ai/ouroboros/202611/20261116/special/). Shield’s activity, speed and effort statements are company-reported. The 100-run study and agent comparison are proposed measurement designs, not observed results. No portal, customer record, purchase, capital, company contact or external message was accessed or executed.
