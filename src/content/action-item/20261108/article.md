---
title: "Can Framing Change an AI Résumé"
date: 2026-11-08
updated: 2026-11-08
section: Ouroboros
series: Daily Action Item
hero: /action-item/20261108/hero.webp
ogImage: /action-item/20261108/og.webp
ledgerId: MODEL-OLYMPICS-RESUME-FRAMING-20261108
draft: false
categories:
  - Artificial Intelligence
  - Evaluation
  - Career Systems
tags:
  - AI evaluation
  - résumé
  - framing effects
  - LLM judge
  - experimental design
keywords:
  - AI resume framing
  - LLM judge bias
  - position bias
  - controlled experiment
  - resume evaluation
excerpt: "A controlled method can separate résumé framing effects from factual quality—and judge preferences from writer performance."
canonical: "https://iamrobin.ai/ouroboros/202611/20261108/action_item/"
author: https://iamrobin.ai/#person
inLanguage: en
sourceAction: "2026-11-08 Daily Briefing, item 5"
visualHeadline: "Freeze facts. Test framing."
visualSubhead: "Write · Blind · Reorder · Repeat"
visualFooter: "Separate writer from judge"
visualNodes: "FACTS|FRAMING|WRITER|JUDGE"
thesis: "Résumé framing effects should be tested with fixed facts, blinded reordering and repeated multi-judge scoring."
---

# Can Framing Change an AI Résumé

A résumé turns a person’s experience and skills into a short account for a potential employer. The facts supply the substance: work completed, responsibilities held, skills acquired. The writing helps a reader see how that experience connects to a particular job.

A large language model—the kind of AI system that generates text in response to instructions—can help with that writing. Give it a factual record and a job description, and it can select relevant details, organize them and produce a draft. That leaves an intriguing question about the instructions themselves. Could an upbeat request produce a better résumé than a neutral or cautious one, even when all three contain exactly the same facts?

Answering that question involves more than comparing three pieces of writing. Someone has to decide what “better” means. If another AI model scores the drafts, its preferences become part of the experiment.

The proposed experiment described here brings those two processes into view: how a model writes, and how a model judges. Its current output is a method for investigating the question. Any results would belong in a later, dated account.

## The judge has preferences too

Using a model to evaluate another model’s writing creates two distinct roles. The generating model acts as the writer. The judging model acts as the evaluator, reading drafts and assigning scores or choosing between them.

A score can appear reassuringly precise. Yet the evaluator receives instructions and text in a particular arrangement, just as the writer does. That arrangement can affect its response.

Researchers Lin Shi, Chiyu Ma, Wenhua Liang, Xingjian Diao, Weicheng Ma and Soroush Vosoughi examined this problem in *Judging the Judges: A Systematic Study of Position Bias in LLM-as-a-Judge*. The first arXiv version was submitted on June 12, 2024. A peer-reviewed version appeared in the December 2025 proceedings of IJCNLP-AACL, an academic conference on computational linguistics.

The authors report evaluating 15 model judges across two evaluation collections, MT-Bench and DevBench. Their study covered 22 tasks, approximately 40 models that generated solutions, and more than 150,000 evaluation instances.

Their subject was **position bias**: the tendency of a judge to favor an answer partly because of where it appears in the prompt. Two answers can remain identical while their order changes. If that switch changes the verdict, presentation order has become part of the score.

The researchers examined whether judges repeated their decisions reliably, whether their preferences survived changes in answer order, and how fairly they treated different positions. They reported that position bias varied across judges and tasks, with the quality gap between answers strongly affecting it.

Those findings concern model evaluation broadly. Their relevance to the résumé proposal is a reason to examine the scoring process carefully. The effect of positive, neutral or cautious framing on résumé quality remains an open question for the proposed experiment.

That distinction matters because a higher score can have several explanations. The writer may have produced a clearer, more relevant draft. The evaluator may prefer its tone. Its place in the comparison may also have helped. A useful experiment needs a way to examine those possibilities separately.

## Three chefs and a fair tasting

Imagine three chefs receiving the same basket of ingredients and the same recipe target. Each also receives a short message. One message is upbeat, one neutral and one cautious.

This is a cooking analogy for the proposed experiment. The ingredients stand for the résumé facts, the recipe target for the job description, and the messages for the three emotional frames.

The chefs might use the same ingredients differently. One might emphasize a particular flavor; another might prepare a simpler dish. Similarly, an AI writer could give certain achievements more prominence, choose more confident language or organize the material differently.

Now imagine the tasting. Knowing which chef received the encouraging message could influence a taster’s expectations. The sequence of the plates could influence the judgment too. A fair comparison would hide the message labels and change the serving order.

The analogy makes the central difficulty tangible. Variation can enter through the preparation of the dish and through the tasting. In the résumé proposal, generation and judging are likewise separate sources of variation.

## What the proposed experiment would do

The experiment would begin with one fixed packet of résumé facts and one fixed job description. It would use synthetic facts—details created for the exercise—or sensitivity-cleared facts reviewed as safe to use. Private career records and applications would remain outside its scope.

Freezing these inputs would give every draft the same factual foundation and the same intended role. The model could change how it presented the material while remaining accountable to that shared record.

Next would come three prompts: positive, neutral and cautious. Their only intended difference would be emotional framing. Each would ask for an independent draft.

Holding the rest steady is essential to making that comparison meaningful. The proposed method would keep the model, its effort setting, available tools, supplied context, output format and number of generations fixed. Where a temperature setting controls variation in the model’s responses, that setting would also stay fixed.

The exact wording of each prompt would deserve particular attention. A cautious instruction that additionally requested a different format would change two things at once. The experiment’s purpose calls for the same task, expressed through three emotional frames.

Each prompt and response would be preserved alongside its timestamp, model label and a digital fingerprint, called a hash, that helps establish which exact text belongs to the record. These records would make a later comparison traceable to the drafts actually produced.

Before scoring, every draft would be checked against the frozen facts. An invented achievement would count as a factual error, however persuasive the sentence sounded. This check gives factual accuracy priority before an evaluator rewards polish.

The planned measures would also be defined before observing results. They would cover fidelity to the facts, relevance to the job, specificity and clarity, alongside a count of unsupported claims. The evaluation would additionally record agreement among judges and sensitivity to presentation order.

These measures address different parts of résumé quality. Clarity concerns how easily a reader can understand the account. Specificity concerns how concretely it describes the supplied experience. Job relevance concerns how well it connects that experience to the stated role. Factual fidelity keeps all three tied to the underlying record.

For scoring, the positive, neutral and cautious labels would be hidden. Draft order would be randomized or swapped, judgments repeated, and several judge models used. The record would retain both the scores and the disagreements.

Hiding the labels would reduce the influence of knowing how a draft was prompted. The writing itself would remain visible, including whatever tone the generation process produced. Swapping order would then test whether the same text received a different assessment when moved. Repeated judging would help reveal how steady those assessments were.

## What a future score could tell us

Suppose, in a future run, one frame received stronger scores across repeated judgments and different presentation orders. That would support a finding about those drafts, those inputs and those evaluators. Factual review would still determine whether the writing stayed true to the record.

Suppose instead that changing the draft order frequently changed the preferred résumé. That would reveal instability in the comparison and give the disagreement a central place in interpreting the scores.

Both possibilities remain hypothetical. The published research establishes reasons to investigate judge bias; the cooking example illustrates the mechanism; the résumé protocol proposes a specific test. Results would require the protocol and inputs to be frozen, the experiment conducted, and the findings presented in a separate dated update. The current proposal is a method, with formal preregistration remaining a separate step.

Even a consistent model score would describe performance in a text evaluation. Human hiring judgment involves a person reading the account in the context of a real role, and hiring outcomes would require their own evidence.

The appeal of this experiment lies in its small, understandable question. Keep the facts steady, change the emotional framing, and examine what happens to the writing. Then examine the judging with equal care. If a résumé receives a higher score, how much of that change belongs to the draft—and how much belongs to the reader evaluating it?

Sources:

- Shi and colleagues, *Judging the Judges: A Systematic Study of Position Bias in LLM-as-a-Judge*, [arXiv record and abstract](https://arxiv.org/abs/2406.07791), first submitted June 12, 2024.
- Shi and colleagues, [peer-reviewed IJCNLP-AACL version](https://aclanthology.org/2025.ijcnlp-long.18/), December 2025.
