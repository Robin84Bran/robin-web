---
title: "The medical index is not a medical score"
storySlug: "the-medical-index-is-not-a-medical-score"
date: "2026-11-26"
updated: "2026-11-26"
lane: "BUILD"
excerpt: "A dedicated medical search index changes where a model looks. It does not tell us whether the answer preserved the source—and a second search changes the experiment again."
hero: "/binary-stories/the-medical-index-is-not-a-medical-score/hero.webp"
ogImage: "/binary-stories/the-medical-index-is-not-a-medical-score/og.webp"
keywords: ["OpenAI healthcare models", "medical search index", "model evaluation", "source verification", "Sol", "Astra"]
canonical: "https://iamrobin.ai/binary/stories/the-medical-index-is-not-a-medical-score/"
inLanguage: "en"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202611/20261126/special/"
sourceArtifactSha256: "2d902554f6fb6412df0cfa65ed01e8a057f44bcb6eb60d4b94e58271798fd814"
carouselPdf: "/carousels/the-medical-index-is-not-a-medical-score.pdf"
carouselCaption: "/carousels/the-medical-index-is-not-a-medical-score.txt"
carouselPages: 7
draft: false
---

A door marked **medical** has opened inside the model stack.

OpenAI released four healthcare model configurations for the Responses API on 24 November 2026. When these configurations use web search, OpenAI says the search runs against a dedicated index of medical sources.

That is a real product change. It is not an accuracy score.

A medical index can change the shelf a system searches first. It does not show that the model chose the right paper, preserved the studied population, carried the uncertainty into its answer, or refused a claim the source could not support.

The label tells us where the reading may begin. The score has to be earned after the reading.

## The shelf is only the first layer

Imagine a clinical question arriving at a library.

The first layer chooses the catalogue. A general search may scan the whole building. The healthcare configuration begins with a medical catalogue when it uses web search.

The second layer retrieves documents. Even a specialist catalogue can return an older guideline, a secondary summary, a study in the wrong population or several papers that disagree.

The third layer writes the answer. The model must preserve the intervention, comparator, outcome, time period, subgroup and material qualifications. A correct citation beside a broader claim is still a mismatch.

The fourth layer checks the answer against the original source. Only there can we count a material claim as source-verified.

![A medical search index feeds retrieval, answer construction and source verification. The scorecard remains empty until every material claim is checked against its original source.](/binary-stories/the-medical-index-is-not-a-medical-score/hero.webp)

These layers are connected, but they are not interchangeable. Better retrieval can improve the ingredients while synthesis still loses a qualification. A stronger model can reason carefully over an incomplete source pack. A reviewer can catch an error—or merely agree with it.

The dedicated index is an input to this chain, not the result of the chain.

## A second search changes two things

The tempting workflow is simple: let GPT-6.2 Sol healthcare search and draft, then ask GPT-6.2 Astra healthcare to review.

But what happens if Astra searches again?

The comparison no longer tests only whether a stronger second reader improves the answer. It also gives that reader another retrieval opportunity. If the final answer improves, the cause could be better review, a better source, or both.

That is not a reason to forbid the second search. It is a reason to name two experiments.

In the **reviewer-only arm**, Sol searches under a required-search rule and produces a source pack and draft. Astra receives the same question, the same source pack and the same rubric, with no fresh search. This isolates the value of a second reader as closely as the design allows.

In the **reviewer-plus-retrieval arm**, Astra may search again. Every additional search call and newly introduced source is recorded. This tests the combined workflow a production system might actually use.

The two arms answer different questions:

- Did the reviewer improve the reading of the same evidence?
- Did another chance to search improve the final evidence set and answer?

Combining them into one route would make a cleaner headline and a weaker explanation.

## Four times the token rate is not four times the evidence

At the Standard short-context rates observed on 26 November 2026, GPT-6.2 Sol healthcare was listed at $2 per million input tokens and $10 per million output tokens. GPT-6.2 Astra healthcare was listed at $8 and $40 respectively. Cached-input rates were also four times apart: $0.10 versus $0.40 per million tokens.

Hosted web search was listed at $10 per 1,000 calls, plus search-content tokens at the selected model's rate. Ten questions with one search each therefore begin with ten cents of search-call fees for one route, before model tokens, retries or human evaluation.

The arithmetic is useful because it prevents the model name from doing the economic reasoning. Astra's listed token rate is four times Sol's across those categories. The value of adding Astra remains unknown until its corrections are measured.

The useful denominator is not “answers generated.” It is **source-verified correct material claims**.

For each route, keep every generated material claim in the ledger. Unsupported claims cannot disappear from the error-rate denominator. Missing qualifications count. So do extra searches, input and output tokens, latency and reviewer minutes.

Then calculate:

**total workflow cost ÷ source-verified correct material claims**

That ratio does not make a clinical recommendation. It tells a builder whether the extra reading step bought more verified evidence per dollar under one frozen test.

## The blank scorecard is the honest launch state

The public documentation establishes the configurations, the medical search index and the dated price map. It does not disclose the full composition or coverage of the index. It does not provide a controlled comparison with general web search. It does not publish a measured Sol-versus-Astra review lift.

So the launch state has four honest lines:

1. **Search layer:** changed.
2. **Price layer:** measurable.
3. **Accuracy lift:** unknown.
4. **Value of a second reader:** unknown.

That is not an empty conclusion. It is a clean boundary between product architecture and product evidence.

A medical index can move the system into a better reading room.

Only a frozen, blinded, source-level comparison can tell us what it learned there.

---

**Sources:** OpenAI's [API changelog](https://developers.openai.com/api/docs/changelog), [API pricing](https://developers.openai.com/api/docs/pricing), [web-search guide](https://developers.openai.com/api/docs/guides/tools-web-search) and [evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices), plus the hash-bound [source Special](https://iamrobin.ai/ouroboros/202611/20261126/special/). Prices and availability are dated to 26 November 2026. The two-arm comparison is a proposed evaluation design; no paid experiment, patient-data processing, clinical recommendation, API-route change or external message was executed.
