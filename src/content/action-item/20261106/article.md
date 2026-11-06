---
title: "How Taste Becomes Training Data"
date: 2026-11-06
updated: 2026-11-06
section: Ouroboros
series: Daily Action Item
hero: /action-item/20261106/hero.webp
ogImage: /action-item/20261106/og.webp
ledgerId: TASTE-BOUNDARY-CASES-20261106
draft: false
categories:
  - Artificial Intelligence
  - Editorial Systems
  - Human Judgment
tags:
  - Agile Deliberation
  - Google Research
  - boundary cases
  - human AI collaboration
keywords:
  - subjective classification
  - editorial taste
  - boundary examples
  - human AI alignment
  - training data
excerpt: "Google Research used borderline examples to help people clarify subjective categories. The method raises a useful question about how editorial taste can become learnable."
canonical: "https://iamrobin.ai/ouroboros/202611/20261106/action_item/"
author: https://iamrobin.ai/#person
inLanguage: en
sourceAction: "2026-11-06 Daily Briefing, item 5"
visualHeadline: "Taste lives at the edge"
visualSubhead: "Example · Choice · Reason · Test"
visualFooter: "Teach the boundary"
visualNodes: "EXAMPLE|CHOICE|REASON|UNSEEN"
thesis: "Taste can become more learnable when a person explains difficult boundary cases, revises the reasons, and tests the result on fresh examples."
---

# How Taste Becomes Training Data

A photograph of a meal can seem easy to classify. Asked whether it shows “healthy food,” a person may answer almost immediately. Teaching a computer to make that judgment brings a harder task: explaining what “healthy” means across the many meals the computer might encounter.

The category depends on what a person considers important. Ingredients, preparation and portion size could all influence a decision. A written definition has to turn those priorities into instructions that hold together across different pictures. As examples accumulate, the person writing the rule may discover that their own definition is still taking shape.

Google Research, Google’s research organization, has been studying this gap between recognizing an example and explaining a category. Working with Google Ads, researchers developed a prototype called **Agile Deliberation**, which helps people define subjective visual categories through examples and revision. A subjective category is one whose boundaries involve judgment: people can reasonably weigh the same features differently.

The underlying paper appeared in the CVPR 2026 computer vision conference proceedings. On November 4, 2026, Google Research published an explanation by Otilia Stretcu and Leijie Wang, alongside links to a public implementation and an interactive demo.

The work addresses a basic problem in teaching machines. A person’s definition often becomes clearer during the very process that depends on having a definition.

## Finding the examples that make us think

An image classifier is software that assigns pictures to categories. In conventional supervised classification, people supply labeled examples—pictures marked as belonging to a category or falling outside it—and the system learns from those decisions. This process often assumes that the person applying the labels starts with a stable rule.

For subjective categories, encountering a difficult example can change the rule.

Imagine, as a hypothetical illustration, two photographs of similar meals. One includes a small amount of a rich sauce; in the other, the sauce covers most of the plate. Someone defining “healthy food” might realize that quantity matters alongside ingredients. The pair brings a previously vague preference into focus.

That is the value of a **boundary case**: an example close enough to the dividing line that deciding where it belongs forces a person to explain what matters. An obvious example confirms a rule. A boundary case can help develop it.

A familiar analogy is a child learning what counts as “too spicy.” Several bites provide points of comparison. As the child explains which bite feels comfortable and which feels overwhelming, the meaning of “too spicy” becomes more precise. The examples gradually reveal the rule. This is an analogy for the research idea; the study itself concerned images.

Agile Deliberation organizes that process into two stages.

First comes **concept scoping**. The person breaks a broad category into smaller included categories and states explicit exclusions. This gives the system a starting definition and gives the person a chance to articulate their priorities.

Then comes **concept iteration**. Vision-language models—AI systems that work with both images and text—retrieve images that challenge the current written definition. The person responds to these borderline cases. An optimization loop then revises the prompt, the written instructions that guide the classifier’s decisions.

The cycle makes a particular image the focus of the conversation. A broad instruction such as “make the category more precise” leaves much of the thinking to the person. A carefully chosen example gives that thinking a concrete object: does this belong, and what feature explains the choice?

Traditional prompt editing asks people to anticipate the ways an instruction could fail. Agile Deliberation searches for examples likely to expose an unsettled boundary. Each response can sharpen both the person’s definition and the instructions used by the software.

## What the study showed

The researchers evaluated the prototype in **18 live user sessions, each lasting 1.5 hours**. Participants worked on two subjective image-classification domains, called Healthy Food and Pay-to-Play. They used Agile Deliberation and alternative comparison methods in randomized order.

Google reports greater consistency in labeling, stronger classifier performance than the tested comparison methods, and lower participant-reported effort and stress.

These findings concern related but distinct parts of the task. Labeling consistency concerns how coherently people apply a category. Classifier performance concerns the software’s ability to assign labels in the evaluation. Effort and stress concern participants’ reported experience of doing the work.

That distinction matters because a better software score and a more manageable human task answer different questions. In this evaluation, the research team reports improvements in both. The evidence comes from bounded, live sessions involving subjective image classification. Longer-term use and broader workplace effects remain questions for further research.

The approach also suggests an interesting interpretation of what useful assistance can look like. AI can help by finding the example that makes a person pause and clarify their thinking. The value lies partly in the resulting answer and partly in the more precise question that produced it.

This brings the story beyond image labels to a possibility worth testing: can a person’s hard-to-explain taste become learnable through concrete edge cases and revision?

## From image categories to editorial taste

Editorial selection offers a tempting setting for that question. Choosing a story involves judgments about relevance, substance, clarity and what a particular audience would find worth reading. A person may recognize a promising article quickly while needing several comparisons to explain why it deserves attention.

Robin Xie’s identity and publishing site, iamrobin.ai, provides a possible setting for a future experiment. The proposal is to explore whether paired editorial boundary cases could help agents learn Robin’s selection taste. As of this November 6, 2026 edition, that transfer experiment remains a proposal, with its outcome open.

The connection to Agile Deliberation is methodological. In the Google study, difficult images help a person refine a visual category. In an editorial experiment, closely matched story candidates could help a person make a selection preference more explicit. Editorial judgment adds its own demands, including language, context and the changing importance of a subject. Its learnability through this method deserves a separate test.

Consider a hypothetical pair of article pitches about the same research announcement. One centers on the researchers’ long-term ambition. The other centers on what their experiment demonstrated. A choice between them could reveal how an editor weighs promise against present evidence. The explanation would be as valuable as the selection itself: it would tell an agent which distinction mattered in that pair.

Further pairs could reveal when that preference holds and when context changes its weight. Over time, the written guidance could become more specific, grounded in actual choices and revised reasons.

A meaningful test would then move to fresh examples. The agent could make its selection before seeing Robin’s decision, allowing a comparison of choices and explanations. Agreement on those later cases would provide evidence about whether the revised guidance carries useful information beyond the examples that shaped it. Differences would identify where the preference still needs clarification.

The aim would be to discover how much of a person’s editorial judgment can travel through examples and explanation. Some preferences may become easy to express. Others may depend heavily on circumstances. Both outcomes would help define what an agent can reliably learn.

Agile Deliberation gives this possibility a concrete starting point: a prototype, a published method and reported results from 18 sessions of subjective image classification. The next question is whether the same kind of conversation can make editorial choices more understandable and more predictable.

Taste may become teachable one difficult comparison at a time. The evidence will come from what an agent does with the next example.

### Sources

- Google Research, [“Agile Deliberation: How AI helps humans define the gray areas”](https://www.research.google/blog/agile-deliberation-how-ai-helps-humans-define-the-gray-areas/), November 4, 2026.
- [“Agile Deliberation,” CVPR 2026 paper page](https://openaccess.thecvf.com/content/CVPR2026/html/Stretcu_Agile_Deliberation_CVPR_2026_paper.html).
- Google Research, [Agile Deliberation public implementation](https://github.com/google-research/agile-deliberation).
