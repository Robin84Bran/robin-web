---
title: "OpenAI Gives Medical Search a Dedicated Reading Room"
date: "2026-11-26"
updated: "2026-11-26"
section: "Ouroboros"
series: "Daily Special"
lane: "RESEARCH"
tags: ["AI", "Medical Evidence", "Evaluation"]
keywords: ["OpenAI healthcare", "medical search", "GPT-6.2 Sol", "GPT-6.2 Astra", "cost per correct claim"]
categories: ["Research", "Artificial Intelligence"]
excerpt: "A dedicated medical search index changes the first shelf an AI reads. The empty ten-case scorecard will show whether a second reader earns its cost."
hero: "/daily-special/20261126/hero.png"
ogImage: "/daily-special/20261126/og.png"
canonical: "https://iamrobin.ai/ouroboros/202611/20261126/special/"
author: "https://iamrobin.ai/#person"
inLanguage: "en"
draft: false
translationReview: "PASS"
sourceSignal: 1
researchScope: "A bounded public-source study of OpenAI's healthcare model configurations, dated pricing and a proposed blinded ten-case comparison. The paid experiment was not run; no API spend, clinical recommendation, patient-data processing, account change or default-route change occurred."
artifactSha256: "2d902554f6fb6412df0cfa65ed01e8a057f44bcb6eb60d4b94e58271798fd814"
evidenceSources: ["https://developers.openai.com/api/docs/changelog", "https://developers.openai.com/api/docs/pricing", "https://developers.openai.com/api/docs/guides/tools-web-search", "https://developers.openai.com/api/docs/guides/evaluation-best-practices"]
---
# OpenAI Gives Medical Search a Dedicated Reading Room

A medical paper can be easy to find and hard to read correctly. Its headline result might describe a benefit for one group of patients, at one dose, over a particular period. Carry that result into an answer and each detail matters. A sentence can sound clear while stretching the evidence beyond the people or circumstances the researchers studied.

This is part of the challenge facing applications that use artificial intelligence to answer medical questions. They need a way to find relevant evidence, then a way to turn that evidence into faithful explanations. OpenAI, which supplies AI models and tools to application developers, has made a change to the first part of that process.

On November 24, 2026, OpenAI announced healthcare configurations for four of its models. When these configurations use web search, the company says they search a dedicated index of medical sources. That gives the search a healthcare-focused starting point. It also raises a question that reaches beyond finding papers: once the evidence arrives, how much is a second AI reader worth?

## A different place to begin searching

The new configurations work through OpenAI’s Responses API. An API is a connection through which one piece of software asks another to do something. Here, an application sends a question to an AI model and receives an answer. It can also give the model tools, including web search.

A model configuration is a named setup pairing a model with supporting instructions and tools tailored to a task. OpenAI describes the new healthcare setups as tailored to clinical questions. The release covers GPT-6.2 Astra, GPT-6.2 Sol, GPT-6 Astra and GPT-6.1 Sol.

Think of the search process as a visit to a library. A general search begins with the catalog for the whole building. The healthcare route directs the researcher toward a medical reading room. Its **index** is the catalog the search system consults to locate material.

That distinction matters because the search determines which evidence the model gets to read. A carefully chosen collection could help it reach useful sources. The size, selection and coverage of that collection also shape what it can find.

OpenAI’s announcement establishes the dedicated medical index as a feature. Its complete contents and coverage remain open questions in the reviewed public documentation. A controlled comparison would be needed to establish how its accuracy compares with general web search.

The library analogy also separates two jobs. Choosing the shelves is one job; understanding a paper is another. Even in a specialist reading room, a reader can confuse a preliminary finding with an established result, or carry a conclusion from one patient group into a broader claim.

A **citation** is a reference pointing back to the source behind an answer. It gives a reviewer a place to check. Establishing that the source supports the sentence still requires reading it.

There is one further detail about how the new route works. Search remains an explicit choice in the application’s request. OpenAI’s automatic tool setting lets the model decide whether to search. A developer can instead require a search. The dedicated medical catalog comes into play when the healthcare configuration actually uses that tool.

## The price of a second reader

Two days after the announcement, the published prices gave this story a second dimension.

A **token** is a small unit of text used to measure what a model reads and writes. A word may occupy one token or several. Input tokens measure incoming material; output tokens measure the response.

At the Standard short-context rates checked on November 26, GPT-6.2 Sol healthcare cost $2 per million input tokens and $10 per million output tokens. GPT-6.2 Astra healthcare cost $8 and $40 respectively. Previously processed input eligible for caching carried lower rates: $0.10 per million tokens for Sol and $0.40 for Astra.

Across those categories, Astra’s listed token rate was four times Sol’s. These were promotional healthcare prices, stated to apply at least through December 31, 2026.

Search adds its own charges. The hosted web-search tool was listed at $10 per thousand calls, or one cent per call, plus charges for the text returned by search at the selected model’s rates. Other model input and output also contribute to the bill.

For ten questions with one search each, a single route would therefore begin with ten cents in search-call fees. Token charges and any retries would add to that amount. If a reviewing model searched again, that would add another search call and another set of search-content tokens.

These prices make a Sol-first workflow worth examining. Sol could search and produce an answer, then Astra could review the work against the sources. The economic question is whether the extra pass corrects enough consequential mistakes to earn its added cost and time.

A fourfold token rate tells us the price of a unit of work. The value of that work depends on what the review changes. Perhaps it recovers a qualification that alters the meaning of a treatment claim. Perhaps it finds that a cited paper supports a narrower conclusion. Perhaps it produces little measurable improvement. Each possibility belongs in the test.

## Ten questions and an empty scorecard

The proposed comparison begins with ten historical clinical claims whose original public sources are already known. Fixing the cases in advance gives both routes the same task and prevents the questions from drifting toward whichever system happens to look stronger.

The cases would cover treatment effects, diagnostic performance, adverse events, limits affecting particular patient groups, and the status of guidelines or regulatory decisions. At least two would involve claims that exceed the support available in their sources. Those cases test whether a system can recognize the boundary of the evidence.

The first route would use GPT-6.2 Sol healthcare with search required. The second would begin with the same Sol retrieval output and add an independent GPT-6.2 Astra healthcare review. Both would use the same question, grading rules and source-access rules. Any additional Astra search would be recorded.

The answers would then enter a **blinded test**: evaluators would see them in randomized order, with the producing route concealed. That helps keep expectations about model names and prices from influencing judgment.

Qualified reviewers would check every material claim against its original source. For a treatment claim, that means preserving who was studied, what treatment they received, what it was compared with, which outcome was measured and when. These details carry the meaning of the evidence.

The proposed main measure is total API cost divided by the number of correct claims verified against their sources. Every material claim generated would be graded, including unsupported claims; only verified correct claims would enter that denominator. Separate measures of errors, omitted qualifications and whole-answer success would help interpret the cost figure. Response time and human reviewer minutes would show the practical effort involved.

This design follows OpenAI’s evaluation guidance: use cases suited to the task, define success clearly and calibrate human judgment. A change in the default workflow would call for a material, repeatable reduction in source-level errors that justified the extra cost and delay. Ten cases could provide an initial view of that tradeoff. Clinical validation would require a broader study designed for that purpose.

As of the November 26 source review, the proposed comparison remained a design. The work covered documentation verification; the paid healthcare-model experiment remained pending.

OpenAI has described a new medical reading room. The price list tells us what two possible readers charge. The next question concerns what happens at the desk: how faithfully does each workflow carry the evidence into an answer, and what does each verified claim cost?

The scorecard is still empty, waiting for the ten blinded cases.

Sources: [OpenAI API changelog](https://developers.openai.com/api/docs/changelog), November 24, 2026 entry; [API pricing](https://developers.openai.com/api/docs/pricing); [web-search guide](https://developers.openai.com/api/docs/guides/tools-web-search); [evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices). Documentation and pricing checked November 26, 2026, according to the supplied source review.
