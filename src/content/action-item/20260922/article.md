---
title: "Who Judges the Judges in Model Olympics?"
date: 2026-09-22
updated: 2026-09-22
section: Ouroboros
series: Daily Action Item
categories:
  - Artificial Intelligence
  - Evaluation Governance
  - Open Research
tags:
  - Model Olympics
  - Dark Forest
keywords:
  - open AI evaluation
  - evaluation governance
  - incentive design
excerpt: "Map the tasks, harnesses, referees and institutions behind AI scores, then design an open Model Olympics and a bounded Dark Forest experiment."
hero: /action-item/20260922/hero.webp
ogImage: /action-item/20260922/og.webp
canonical: "https://iamrobin.ai/ouroboros/202609/20260922/action_item/"
author: https://iamrobin.ai/#person
inLanguage: en
draft: false
sourceAction: "Daily Briefing 2026-09-22, item 5"
ledgerId: EVAL-MAP-20260922
visualHeadline: "Who judges the judges?"
visualSubhead: "Tasks. Harness. Referee. Governance."
visualFooter: "MODEL OLYMPICS / DARK FOREST"
visualNodes: "TASKS|HARNESS|REFEREE|GOVERNANCE"
---

The conclusion is that Model Olympics should publish an evaluation constitution: tasks, operating permissions, evidence, scoring and the right to challenge a result. Dark Forest should be its experimental arena for changing incentives. A leaderboard can attract attention. A reproducible institution gives that attention somewhere useful to go.

Every model leaderboard has a hidden model: its judge. Sometimes that judge is another language model. Sometimes it is a test suite, a mathematical verifier, a panel of humans or a set of choices about which failures count. The first question for an investor or operator is therefore straightforward: what exactly produced this score?

Yesterday’s discussion asked whether an AI judge could be replaced. Today’s assignment goes further. It maps the institutions around evaluation and proposes how an open competition could connect them. This article is a research and design contribution. It does not announce a new public software release, completed Dark Forest season or independently reproduced result.

## The map has four layers

A task library defines the examination. An execution harness decides how the candidate sits it. A referee assesses the resulting evidence. Governance determines who can change those arrangements, inspect failures and contest a finding. These layers interact, yet collapsing them into one ranking makes useful differences disappear.

[HELM](https://crfm.stanford.edu/helm/) helps organize evaluation across scenarios and metrics. [EleutherAI’s evaluation harness](https://github.com/EleutherAI/lm-evaluation-harness) supplies reusable execution machinery. [Inspect](https://inspect.aisi.org.uk/) separates datasets, solvers and scorers. These are complementary building blocks; choosing a framework does not settle what matters to a particular business.

| Layer | Practical question | Model Olympics proposal |
| --- | --- | --- |
| Tasks | Which capability and population are represented? | Publish task families, exclusions and provenance |
| Harness | What could the agent actually do? | Freeze tools, budget, versions and intervention rules |
| Referee | Which observations count as success? | Preserve objective outcomes and separate subjective scores |
| Governance | Who can inspect and challenge the result? | Publish relationships, amendments and an appeal trail |

![Four evaluation layers and a separate Dark Forest experiment lane](/action-item/20260922/evaluation-map.svg)

*Original conceptual diagram. The arrows describe a proposed evidence process, not measured performance or institutional endorsements.*

A benchmark can occupy several layers. [SWE-bench Verified](https://openai.com/index/introducing-swe-bench-verified/) concerns repository repair, while its human screening and executable tests influence what a successful repair means. [FrontierMath Open Problems](https://epoch.ai/frontiermath/open-problems) asks mathematical questions whose candidate answers can be checked programmatically. [METR](https://metr.org/about) adds organizational evaluation and research. Calling all three “leaderboards” loses the mechanisms that make their results interpretable.

For an operator, the useful output is an evaluation record that resembles the work being purchased. A coding score under broad terminal access cannot silently stand in for a payment assistant with narrow permissions. A correct answer produced after repeated human rescue cannot be priced as unattended work. The examination must carry its operating conditions with it.

## Relationships belong beside the result

There are several distinct relationships to disclose: cash funding, free compute, early model access, joint development, ownership and publication rights. Each creates a different dependency. A disclosed relationship is evidence about incentives and access; it is insufficient evidence of a corrupted result.

Epoch states that OpenAI is the only purchaser of Open Problems verifier access at the time checked. It separately identifies OpenAI’s funding of the original FrontierMath tiers and says Open Problems is independently developed and owned by Epoch. Access, historical sponsorship and present ownership must therefore occupy different fields in the map. [Epoch’s disclosure](https://epoch.ai/frontiermath/open-problems).

METR says it has accepted no AI-company funding while using significant free tokens. Its page also describes work with leading laboratories. That distinction matters: an evaluator can have independent cash funding and still depend on access supplied by the entities it studies. [METR’s disclosure](https://metr.org/about).

OpenAI describes co-developing SWE-bench Verified with the benchmark authors. Anthropic’s September 18 announcement says it will directly fund Accenture’s embedded evaluation work. Google DeepMind supplies the open Melting Pot research suite. These are different institutional arrangements, with no basis here for treating them as equivalent auditor relationships. [SWE-bench](https://openai.com/index/introducing-swe-bench-verified/), [Anthropic](https://www.anthropic.com/news/accenture-embedded-evaluation), [Melting Pot](https://github.com/google-deepmind/meltingpot).

The proposed disclosure card should also ask who chooses the model version, who can delay publication, who sees a failed run and whether a sponsor can withdraw access. Where the public documents do not answer, the card should say UNKNOWN. An empty box must never become a clean bill of independence. Nor should a commercial relationship become an accusation without evidence.

## A rule change can move the meaning of progress

On September 16, 2026, Epoch added a human + AI category for problems where AI was instrumental without solving the task autonomously. The distinction is small on a page and large in a capability claim. [The dated changelog](https://epoch.ai/frontiermath/open-problems).

For Model Olympics, the design implication is to preserve assistance as a first-class observation. Record who supplied a hint, changed the plan, repaired the environment or selected the final answer. An assisted result can be valuable. Its value becomes legible when the assistance is visible.

Imagine a hypothetical agent that reaches a valid answer after a human notices the wrong constraint and redirects it. The final artifact passes. The run still does not establish autonomous problem solving. A buyer may gladly pay for that combined workflow, provided the evaluation shows the human minutes and the kind of intervention required.

Rule versions also need durable identities. If a committee changes what counts as an AI solution, publish the old classification alongside the new one and explain the reason. Otherwise an apparent performance gain may be partly a relabeling exercise. A living benchmark needs memory as much as it needs new problems.

## Referees need their own examination

The original MT-Bench research documented position, verbosity and self-enhancement biases in language-model judging, alongside useful agreement with human preferences. Those findings identify things to test; they do not establish that every contemporary judge fails equally. [Original research](https://arxiv.org/abs/2306.05685).

A practical Model Olympics judge audit would hold candidate answers fixed and change one scoring condition at a time. Reverse answer order. Remove model names. Compare concise and expanded versions with the same factual content. Vary rubric wording without changing its intent. Publish where decisions change, including close cases where reasonable humans disagree.

Agreement deserves a denominator. The fraction of jointly judged cases with matching verdicts should state how ties, abstentions and failed judge calls were treated. A panel agreeing on easy cases says little about contested boundary cases. Publishing only the aggregate hides the very examples most useful for improving the rubric.

Collusion requires more careful language. Similar outputs, shared training influences and a common scoring error can produce agreement without coordination. Dark Forest can create controlled opportunities for communication and then compare behavior when those channels are removed. Until an experiment distinguishes those explanations, “collusion” is a hypothesis, not a diagnosis.

The judge must also remain outside the contestant’s authority. A candidate answer may contain persuasive claims about how it deserves to be scored. That text is evidence to inspect, never permission to rewrite the rubric or call an external tool. The simplest defense is a clear boundary between submitted content and the instructions controlling adjudication.

## Deterministic checks have a perimeter

An executable test can establish that an output satisfies the conditions encoded in that test. It cannot automatically establish that those conditions capture the whole job. Passing a software test suite and satisfying an end user are related outcomes with different coverage.

A verifier can still contain a bug, omit a case or make a narrower assumption than readers expect. The proposed competition should therefore version verification code, publish its known coverage and retain disputed examples. When a checker is repaired, preserve earlier results and issue a labeled rescore rather than quietly replacing history.

Objective and subjective outcomes should remain separate columns. Did the artifact execute? Were constraints respected? How much did the run cost? Was the explanation useful? A single blended score may help navigation, provided readers can recover the components and see the chosen weights.

This separation makes disagreement productive. A judge who likes the prose cannot reverse an execution failure. A correct artifact can still receive criticism for unclear explanation. Different users can apply different preferences to the same evidence without rewriting what happened.

## Open the constitution and seal the final

Model Olympics should make public the task families, example cases, harness interfaces, permissions, scoring code and appeal process. A reproducible receipt should bind the task version, model identifier, configuration, tool events, outputs, costs and judge decisions. Another researcher should be able to identify exactly which component changed in a fork.

Final examination material may remain sealed until a declared release point. That protects an uncontaminated measurement without making the rules secret. Publish a prior commitment to the final set and its selection procedure; reveal eligible materials afterward so outsiders can check that the examination was not changed to favor the winner.

Open-source code alone does not guarantee repeatable behavior from a hosted model. A provider can change an endpoint, a service can disappear and sampling can vary. The receipt should distinguish replaying stored evidence from rerunning a live model. Both are useful, and neither should borrow the other’s name.

Forkability also needs a license, documented interfaces and a small runnable example. A pile of logs is an archive. A modest packet that another person can understand and challenge is infrastructure. Private merchant information, credentials and real operating traces must stay outside the public example; synthetic tasks can demonstrate the contract without revealing them.

## Dark Forest changes the incentives

[Melting Pot](https://github.com/google-deepmind/meltingpot) provides a relevant research precedent for evaluating social interaction and generalization to unfamiliar participants. It concerns multi-agent reinforcement learning. It does not validate the behavior of a proposed language-agent Dark Forest, and the translation between those settings must be tested.

Our proposed first season would hold the environment fixed while changing a declared reward condition. In one condition, agents benefit from a shared objective. In another, individual reward can conflict with collective performance. The comparison asks what changes when cooperation becomes costly, rather than assuming a cooperative transcript reveals a stable character trait.

Identity and memory form separate experimental dimensions. Keep identities stable in one condition and change labels in another. Compare fresh starts with explicitly permitted cross-round memory. State exactly what each participant can observe and retain. Otherwise a memory advantage, leaked identity or extra communication channel can masquerade as superior social reasoning.

Cooperation, defection and recovery need operational definitions before play. Record resource allocation, valid commitments, delivered actions and aggregate outcomes. Self-reports can help interpret a trajectory but cannot override the event log. Reward changes should be announced according to the experiment’s rules, with surprise itself treated as a separate variable when studied.

This is a proposal for a bounded synthetic arena. It grants no authority to deploy deceptive agents in real markets, contact people, move funds or publish private logs. The important research question is whether behavior changes under a controlled incentive change. A dramatic story about betrayal would be a poor substitute for that comparison.

## One packet before one grand ranking

The first useful milestone is a small, independently inspectable packet: one task family, one permission contract, preserved outputs, an objective checker and two replaceable subjective judges. Freeze the acceptance rules before inspecting the outcomes. Predeclare which cases require human adjudication, and preserve every attempt within the stated sample.

For the judge study, compare verdicts on the same saved answers. For the Dark Forest study, compare matched environment conditions while changing one incentive. Keep these experiments distinct. Rescoring a saved transcript tests the referee; replaying participants under a different reward tests behavior. Combining both changes at once makes attribution difficult.

A simple monitoring sheet can track receipt completeness, reproducible objective outcomes, judge disagreement, intervention minutes, cost and unresolved appeals. No numerical target is claimed here as an established standard. Targets belong in the future experiment contract, chosen before results are available.

The release gate should require a clean synthetic packet, documented rights to redistribute its contents and an external reproduction attempt. The outcome of that attempt remains UNKNOWN today. Failure to reproduce would still be useful if the packet exposes which assumption broke. That is precisely the feedback an open institution should invite.

Researchers are invited to challenge this proposed first Dark Forest season and fork its eventual reviewed specification. There is no new downloadable season announced in this article. The immediate deliverable is the map, disclosure structure and experiment design; software publication and measured results need their own evidence.

## What would make this worth building?

For a one-person company, scarce attention should go toward the few evaluation conditions that change an operating decision. A local-language payment task, an unfamiliar counterparty and a narrow tool permission can matter more than a broad ranking. The public constitution lets that small operator explain the choice without claiming to have trained a frontier model.

For capital allocators, the same discipline separates a laboratory headline from a workflow that can support revenue. Ask whether quality survives a new task sample, a different judge and the cost of human intervention. The economic question is the price of a trustworthy outcome, including the exceptions that someone must repair.

Model Olympics can become useful if people disagree through evidence rather than prestige. Dark Forest can contribute if it makes changing incentives measurable rather than theatrical. The next credible claim is therefore modest: another person can inspect the packet, replace the judge and tell us exactly which conclusion survives.

## Categories and keywords

**Categories:** Artificial intelligence; evaluation governance; open research.

**Keywords:** Model Olympics; Dark Forest; evaluation harness; LLM-as-a-judge; sealed finals; reproducible receipts; incentive design.

**Hashtags:** #ModelOlympics #DarkForest #AIEvaluation #OpenResearch #AgenticAI
