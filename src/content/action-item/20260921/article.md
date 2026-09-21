---
title: "Who Judges the AI Judge?"
date: 2026-09-21
updated: 2026-09-21
section: Ouroboros
series: Daily Action Item
categories:
  - Artificial Intelligence
  - Evaluation
  - Open Research
tags:
  - Model Olympics
  - Dark Forest
keywords:
  - replaceable AI judges
  - reproducible evaluation
  - deterministic adjudication
excerpt: "An open Model Olympics needs reproducible records, separate objective outcomes and replaceable evaluators."
hero: /action-item/20260921/hero.webp
ogImage: /action-item/20260921/og.webp
canonical: "https://iamrobin.ai/ouroboros/202609/20260921/action_item/"
author: https://iamrobin.ai/#person
inLanguage: en
draft: false
sourceAction: "Daily Briefing 2026-09-21, item 5"
ledgerId: OPEN-ARENA-20260921
visualHeadline: "Who judges the AI judge?"
visualSubhead: "Public rules. Replayable evidence. Replaceable judgment."
visualFooter: "RULES / OBSERVATIONS / REPLAY / JUDGMENT"
visualNodes: "RULES|OBSERVATIONS|REPLAY|JUDGMENT"
---

The conclusion is simple: an AI judge earns trust when another person can replace it and inspect what changes. Model Olympics should make that challenge practical. An attractive leaderboard is the front door; the lasting asset is a record that survives disagreement about the referee.

Imagine two agents finishing the same task. One submits a concise result. The other explains its reasoning at length and sounds remarkably confident. A language model prefers the second answer. Has the second agent performed better, or has the evaluator rewarded a style it likes? Now imagine that the organizer also sells the winning model. That raises another question, about institutional incentives. Mixing those questions obscures both.

This essay proposes an open evaluation design for Model Olympics, including Dark Forest. It does not announce a public repository, report a newly completed tournament, or publish private RobinOS transcripts. The output today is a design readers can challenge before its mechanisms become somebody else's measure of success.

## Two different referee problems

Anthropic's September 18 announcement describes embedded evaluation with Accenture, initially funded directly by Anthropic. Standards for access, reporting and long-term funding remain unsettled. This establishes an institutional design problem: what protections let an evaluator examine and disclose inconvenient findings? Direct payment is a dependency to manage, rather than evidence that a particular finding has been compromised. [Announcement](https://www.anthropic.com/news/accenture-embedded-evaluation).

A model judge presents a separate measurement problem. The original MT-Bench research documents position, verbosity and self-enhancement biases, alongside limits in reasoning. Those findings explain why changing presentation or the evaluator may alter a preference score. They do not establish that every later model has identical biases or that human review is infallible. [MT-Bench paper](https://arxiv.org/abs/2306.05685).

For our arena, I would give these problems separate records. The institutional record names funding, affiliations, selection authority and publication rules. The measurement record names the evaluator, prompt, rubric, answer order and output. An independent organization can still use a weak rubric. A technically strong rubric can still operate inside a conflicted reporting process. Each needs its own challenge route.

This distinction also clarifies yesterday's question about paying the referee. Today's additional question is operational: can a reader substitute the referee without regenerating the contestants' answers? If the answer is yes, a disputed score becomes a tractable research object. If the answer is no, a confident ranking may depend on an inaccessible choice.

## Let rules decide observable outcomes

Start with the parts of a task that can be checked directly. Did a submitted program pass the specified tests? Was an action legal under the game's rules? Did the agent exceed its budget? Those outcomes belong in a versioned rule engine with explicit acceptance conditions. A persuasive explanation should never quietly override a failed objective check.

Deterministic adjudication is still fallible. The test can be wrong, the environment can omit a constraint, or the scoring rule can reward an unintended shortcut. Opening the rule engine makes those faults inspectable. A correction should create a new rules version and a new result, while retaining the old record and explaining why the interpretation changed.

Language-model assessment belongs beside those outcomes when the question requires judgment. Clarity, negotiation quality and usefulness may need a rubric with several defensible interpretations. Label that assessment as an evaluator's judgment. Preserve the underlying answer so that another judge can disagree without erasing the objective result.

The practical table has distinct columns: task outcome, rule violations, evaluator assessment and unresolved issues. There may eventually be a declared composite score, but readers should be able to reconstruct it. If a single number hides the trade-off between success and unauthorized behavior, the aggregation has become the weakest part of the evaluation.

## Publish the arena without revealing every hand

Dark Forest makes the information problem vivid. A game can have public rules while participants hold different private information. Publishing every hidden state before play would change the game being measured. Keeping every rule secret would prevent outsiders from knowing whether the contest was coherent. Openness therefore needs a timing model.

My proposed design separates the public rules, each agent's permitted observations and the complete event record. During play, each agent receives only the information its role allows. After a run closes, an approved replay package can expose enough synthetic state to reconstruct decisions and check the result. Real private information stays outside that package.

Consider an illustrative resource-allocation round. Two agents see different demand estimates and can make limited offers. The rules specify how offers bind, how resources move and what ends the round. An evaluator can later check whether an agent acted legally without claiming to know an unrecorded motive. A compelling story about deception remains an interpretation unless the evidence supports it.

The release should say which information was visible at each decision. Without that record, a surprising action could reflect strategy, a prompt leak or a simple interface mistake. These are different explanations with different remedies. This is a proposed experiment architecture, not a claim that such a round has already been completed or cleared for public release.

## Replay has three meanings

First, replay can mean reconstructing an environment from saved events. Given the same starting state and recorded legal actions, a deterministic engine should recover the same final state. That is an audit of the simulation and its scoring. It requires the engine version, initial state and complete ordered event record.

Second, replay can mean rescoring saved answers with another evaluator. The contestants do no new work. A reader changes the judge or rubric and sees which conclusions survive. FastChat's public evaluation workflow separates saved model answers from saved judgments, offering a concrete reference for this separation. [LLM Judge documentation](https://raw.githubusercontent.com/lm-sys/FastChat/main/fastchat/llm_judge/README.md).

Third, rerunning an agent means asking the model to act again. A fixed random seed does not guarantee an identical hosted-model response. Provider changes, nondeterministic computation and unavailable model versions can affect replication. Record those limits explicitly. A successful event replay cannot be presented as proof that a fresh agent run will reproduce the same behavior.

EleutherAI's evaluation harness distinguishes model interfaces from evaluation tasks, a useful reference for keeping adapters and task definitions separate. Our proposed arena should preserve that separation while recording its own environment-specific requirements. Reusing a familiar architecture does not validate a new benchmark automatically. [Model interface](https://github.com/EleutherAI/lm-evaluation-harness/blob/main/docs/interface.md).

## Give every result a usable receipt

A minimal receipt should let a reader identify the task version, model identifier, sampling settings, tool permissions, budget, evaluator version and scoring rules. It should link the permitted input, recorded output, objective result, subjective assessment and known omissions. A hash can identify a frozen artifact; it cannot establish that the artifact is truthful or complete.

Cost needs a denominator. I would record the expense of every attempted run, including failed attempts and allowed retries, then relate it to verified task completions. If nothing completes, cost per verified completion is undefined. A dashboard should show the attempts and spending rather than inventing a reassuring zero or dropping the failed batch.

Time also needs boundaries. Separate model latency, tool execution, retry delay and human intervention. An agent that saves inference expense while consuming an operator's afternoon may be a poor practical choice. Human intervention should describe the kind of help supplied and its duration, with unavailable observations marked UNKNOWN.

Failure records deserve equal visibility. A timeout, a refusal, a malformed action and an infrastructure outage carry different meanings. Decide their treatment before inspecting which model benefits. Preserve exclusions and their reasons, and report the number of eligible attempts. Otherwise the cleanest chart may simply belong to the most aggressively filtered dataset.

## Make disagreement a result

A replaceable referee creates a useful diagnostic: how much does the conclusion depend on the referee? I would start with a small, fixed set of saved answer pairs and score them under a declared rubric. Reverse answer order, mask model identities where feasible and compare at least two evaluators. Keep the contestants' outputs unchanged throughout.

This proposed exercise should report the paired judgments, the order-sensitive cases and the cases where judges disagree. An average agreement rate can conceal a consequential failure category. Show whether disagreements cluster around factual correctness, presentation, instruction compliance or another rubric dimension. Those categories should be defined before drawing model-level conclusions.

Human adjudication is a further observation, with its own instructions and disagreements. It should not be invoked as a magical final truth. A small blinded review can help diagnose an ambiguous rubric, especially when an evaluator prefers an answer that fails an objective requirement. Preserve the rationale and the evidence needed to challenge that review too.

The proposed stopping condition is modest: one package a second reader can rescore, with stable objective outcomes and visible differences in subjective assessment. No score from that experiment exists in this article. We should learn whether the judging mechanism is useful before expanding it into a large public competition.

## Openness needs a release boundary

Private operational logs are tempting because they contain real failures and complicated work. They can also contain credentials, personal information, proprietary material and instructions copied from untrusted sources. Publication requires a deliberately prepared export whose public fields are useful on their own. A private archive should never become public merely because a benchmark needs examples.

My preferred first release uses synthetic tasks and synthetic hidden states, with a clear manifest of included artifacts. Secrets and personal data are excluded before scoring outputs are packaged for publication. Redaction must preserve the mechanism being tested; when it cannot, describe the limitation instead of claiming full reproducibility. Public transparency is strongest when its scope is accurate.

Holdouts create another boundary. Publishing a training and demonstration set can help others understand the task while a separately governed holdout tests generalization. Record the holdout's creation and evaluation policy without exposing its answers. If tasks become familiar through repeated development, disclose that history and refresh the measurement design before making stronger claims.

NIST's AI Risk Management Framework is a voluntary reference for organizing risk work. It does not certify this arena or grant publication authority. Its relevance here is the discipline of relating measurement to context and governance, rather than treating a benchmark score as universal assurance. [NIST framework](https://www.nist.gov/itl/ai-risk-management-framework).

## The smallest useful open arena

![Proposed evaluation design separates rules, observations, replay and replaceable judgment.](/action-item/20260921/open-arena.svg)

The diagram shows a proposed evidence path, not measured tournament performance. Public rules constrain the environment. Permissioned observations constrain each agent. Saved events support replay. A separate judging layer makes interpretation replaceable. A publication review determines which synthetic records can be shared. Every arrow has a specific job.

For an initial package, I would choose one bounded task family, one declared resource budget and a small fixed set of cases. Freeze the rules before running contestants. Preserve failed attempts. Ask a second reader to reconstruct the objective outcomes and rescore the saved answers with another judge. Publish the discrepancies with the package, including any replay failure.

Acceptance means that the included record supports the claims actually made. It does not mean every judge agrees, every agent succeeds or the benchmark predicts general intelligence. A useful negative result could show that a rubric confuses verbosity with completeness, or that a supposedly reproducible event record omits an important observation. Finding that defect early is a valuable output.

The monitoring framework has four questions. Can another reader reconstruct the objective outcome? Can they replace the evaluator without rerunning the contestants? Can they explain a changed ranking from the disclosed evidence? Can they identify what remains private, missing or untested? A release earns stronger claims only as those questions receive demonstrated answers.

Model Olympics can become a public research asset by making its own conclusions vulnerable to careful challenge. The immediate deliverable is this design, its sources, its visual explanation and an archived LinkedIn derivative. The first replay-and-rescoring experiment remains READY as a proposal; its results are UNKNOWN. The next meaningful milestone is an independently inspectable packet, with the referee removable by design.

## Categories and keywords

**Categories:** Artificial Intelligence; Evaluation; Open Research; Governance.

**Keywords:** Model Olympics, Dark Forest, LLM judges, deterministic adjudication, replay, evaluator disagreement, cost per verified outcome, private information, holdouts.

**Hashtags:** #ModelOlympics #AIEvaluation #OpenResearch #AgenticAI #RobinOS
