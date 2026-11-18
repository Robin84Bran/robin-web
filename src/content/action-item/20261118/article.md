---
title: "Two Clocks for Overnight AI"
date: 2026-11-18
updated: 2026-11-18
section: Ouroboros
series: Daily Action Item
hero: /action-item/20261118/hero.webp
ogImage: /action-item/20261118/og.webp
ledgerId: OVERNIGHT-AI-TWO-CLOCKS-20261118
draft: false
categories:
  - AI Infrastructure
  - Agent Workflows
  - AI Economics
tags:
  - GPT-6.2
  - background mode
  - completion windows
  - workflow economics
keywords:
  - GPT-6.2 background completion windows
  - overnight AI workflows
  - model token pricing
  - AI workflow delivery
excerpt: "A longer completion window can lower model-token rates, while useful autonomy still runs on the broader clock of successful delivery."
canonical: "https://iamrobin.ai/ouroboros/202611/20261118/action_item/"
author: https://iamrobin.ai/#person
inLanguage: en
sourceAction: "2026-11-18 Daily Briefing, item 5"
visualHeadline: "Overnight AI runs on two clocks."
visualSubhead: "INITIAL RESPONSE · SUCCESSFUL DELIVERY"
visualFooter: "Measure the clock that stops at useful work"
visualNodes: "REQUEST|RESPONSE|TOOLS|VALIDATION|DELIVERY"
thesis: "A completion window prices the model response; useful autonomy must be measured through successful delivery."
---

# Two Clocks for Overnight AI

Some work is valuable even when the answer arrives hours later. A report prepared for the next morning, a proposed software repair or a review of a long document can leave room for waiting. For people building AI into software, that flexibility creates an economic question: how much could the work cost if the service had more time to respond?

OpenAI, the company that develops the GPT family of AI models, now offers a concrete way to make that trade. Its background processing options give a model request a longer completion window in exchange for lower model-token rates. An eight-hour window sounds particularly suited to overnight work: send a task in the evening and collect the result in the morning.

Understanding what “the result” means takes a closer look. An AI response can be a finished answer. It can also be a request for information that the surrounding software must fetch before the work continues. Both count as responses, while each leaves the overall task at a different stage.

That distinction matters because overnight AI involves two related clocks. One measures the arrival of a model response. The other measures the arrival of something useful and complete.

OpenAI’s November 17, 2026 release brought two new models into this picture. GPT-6.2 Sol is its efficient model for everyday coding and agent workflows—sequences of work in which software uses an AI model to help carry out a task. GPT-6.2 Astra is its higher-priced frontier model for demanding reasoning and coding.

Applications reach these models through an API, a structured doorway through which one program asks another service to do work. A developer can use OpenAI’s Responses API to send instructions to a model, retrieve its answer and handle requests to use tools. A tool might look up a document, for example. The application runs that lookup and passes the information back to the model.

The Responses API also supports background mode. This lets a request run while the application checks its progress and retrieves the response later. The application can therefore manage work whose answer takes time to arrive.

For a reader encountering these systems for the first time, the division of labour is important. The model produces responses. The application manages the larger sequence: supplying information, running tools, making further requests, checking results and delivering the finished work. The usefulness of the whole arrangement depends on how those pieces work together.

The prices show why an operator might pay attention to waiting time. OpenAI charges for tokens, the small pieces of text a model processes or produces. Input tokens cover material sent to the model; output tokens cover material it generates.

At Standard rates for shorter requests, Sol costs $2 per million input tokens and $10 per million output tokens. Astra costs $8 and $40 respectively—four times Sol’s corresponding rates. Requests exceeding 272,000 input tokens enter a higher pricing tier: input and cached-input rates double, and output rates rise to 1.5 times the shorter-request rate across the full request.

Those are the starting prices. OpenAI’s background-mode documentation describes two completion windows, currently in public beta: two hours and eight hours. The two-hour option offers model-token rates 30% below Standard. The eight-hour option offers rates 40% below Standard.

Delay has become a pricing input. An operator with a flexible schedule can accept a longer response window and receive a lower rate for the model’s work. The documented benefit is the price reduction; any effect of the longer window on answer quality remains an open empirical question.

The timing language deserves equal attention. OpenAI says the API targets completion of the **initial response** within the selected window, starting when it accepts the request. That is a target for a particular response. A finished application-managed task has a broader timeline.

OpenAI’s own documented example makes the difference concrete. An application sends a request with an eight-hour completion window. The model’s first response asks the application to look up a document. The application performs the lookup, then submits the retrieved information in a follow-up request.

At that point, the first response has arrived and the larger job is continuing. The application still manages whatever follows: additional exchanges, checks, recovery from problems and final delivery. Eligible follow-up requests can also receive the discount when the application reuses the completion window, continuation ID, model and project. Those conditions preserve pricing eligibility as the sequence continues; the initial response target retains its specific scope.

Think of an overnight bakery promising that its first tray will come out by morning. A complete breakfast delivery also involves packing the food, assigning a driver, checking the address and finding another route if a road closes.

In this illustration, the first tray is the model response. The breakfast arriving at the correct address is the finished workflow. The first tray’s timing matters to delivery, and delivery has several further dependencies. A perfectly timed tray can still be followed by a difficult journey.

The same distinction gives an eight-hour AI window its practical meaning. An initial response containing a complete answer may put the application close to delivery. A response asking for a document starts another exchange. Validation might lead to revisions. A failed tool call might require recovery. The application carries responsibility for coordinating that work, and the documented window provides a response target rather than an end-to-end delivery guarantee.

This also changes how to read the discount. A 40% reduction in model-token rates lowers one component of the bill. The cost of a useful result can also include tool charges, repeated requests, retries, application computing and human review. Unsuccessful attempts consume resources too.

Astra’s higher token price and Sol’s lower token price therefore establish the cost of purchasing model output under the stated rates. Which model produces a successful deliverable more economically depends on the full task. OpenAI’s benchmark comparisons and early-tester accounts offer provider evidence under their stated conditions. Measuring a particular application’s delivery cost requires evidence from that application.

For RobinOS, a controlled comparison of these new background windows remains future work. Cost per successful deliverable, human intervention time, recovery burden and the duration of useful unattended operation remain open measurements.

A meaningful comparison would hold one real task fixed and run it with Sol and Astra, then follow the work through to successful delivery. The important observations would include the total cost, the minutes a person spends helping and what happens when part of the sequence fails. That would connect the model’s price and response time to the operator’s actual purpose.

The November 17 release supplies new model choices, and the background windows offer a clear exchange between response timing and token rates. The larger promise of overnight work depends on the journey from the accepted request to the completed deliverable.

When judging useful autonomy, which clock should an operator use: the clock that stops at the first model response, or the one that stops when the work is successfully delivered?

## Sources

- OpenAI, November 17 release: https://openai.com/index/introducing-gpt-6-2-astra-sol/
- API changelog: https://developers.openai.com/api/docs/changelog
- GPT-6.2 Sol documentation: https://developers.openai.com/api/docs/models/gpt-6.2-sol
- GPT-6.2 Astra documentation: https://developers.openai.com/api/docs/models/gpt-6.2-astra
- Background mode and completion windows: https://developers.openai.com/api/docs/guides/background
