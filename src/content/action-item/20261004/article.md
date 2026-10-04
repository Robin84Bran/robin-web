---
title: "Why More Agents Can Fail Together"
date: 2026-10-04
updated: 2026-10-04
section: Ouroboros
series: Daily Action Item
categories:
  - Agentic AI
  - Systems
tags:
  - Verification
  - Coordination
keywords:
  - shared failure
  - independent verification
  - agent coordination
excerpt: "A larger team can share one blind spot. Inspect the evidence path before buying another agent."
hero: /action-item/20261004/hero.webp
ogImage: /action-item/20261004/og.webp
canonical: "https://iamrobin.ai/ouroboros/202610/20261004/action_item/"
author: https://iamrobin.ai/#person
inLanguage: en
draft: false
sourceAction: "Daily Briefing 2026-10-04, item 5"
ledgerId: SHARED-FAILURE-20261004
visualHeadline: "Who checked the shared source?"
visualSubhead: "Evidence / Workers / Verification / Acceptance"
visualFooter: "COUNT INDEPENDENT CHECKS"
visualNodes: "SOURCE|TEAM|CHECK|ACCEPT"
---

Imagine hiring a hundred assistants and giving every one of them the same spreadsheet. One cell contains the wrong exchange rate. They work diligently, compare their answers and return a beautifully consistent valuation.

You have bought agreement. Whether you have bought protection depends on who checks the spreadsheet.

This is an invented example, but it captures a practical question for an AI-native company: when we add another agent, which failure can it survive that the existing team cannot? A second voice may offer another line of reasoning. A second observation may reveal something the first voice never saw. Those are different purchases, and an organization should know which one it is making.

The conclusion is practical: more agents can create useful capacity. They can divide a search, work on separate files and inspect different evidence. They can also multiply confidence in a shared mistake. The operating question is how much independent work and independent checking the architecture actually contains.

## A team can share one blind spot

Suppose our imaginary assistants use different models. That sounds reassuring. Yet all receive the same incorrect rate, the same instruction to trust the spreadsheet and the same acceptance test. Their language may differ while their failure remains identical. Changing the model addresses only one possible source of dependence.

Now keep the same model and change the information path. One assistant reads the spreadsheet; another obtains the original rate from a separate source and checks its date and currency pair. This arrangement still has weaknesses. Both might misunderstand the convention or use an unreliable feed. It has nevertheless introduced a specific opportunity to catch the original error. That is a more useful design claim than “two models are safer.”

Independence is therefore a property to examine along a route. Where did the evidence originate? Which transformation produced the number? Who chose the success condition? Which tool writes the result? A hundred conversations can sit downstream of the same dependency. Counting conversations tells us little about that dependency's behavior under stress.

The aim is not to isolate every worker from every other worker. Cooperation needs shared information. The aim is to identify the few shared assumptions that can defeat the whole team, then arrange an observation or stopping condition that does not silently inherit them.

## What the little ocean actually showed

Our public [Agent Swarm Lab](https://iamrobin.ai/intelligence/agent-swarm/) offers a useful counterexample to easy stories about self-repair. In its Ocean Swarm world, small simulated vehicles cover sensing stations while currents, energy limits and delayed messages interfere with the plan. A local repair rule moves a surplus vehicle toward a station believed to be vacant. A bounded mothership can suggest repairs through the same constrained communications system.

After ordinary child loss, mean station uptime increased from 77.24% with provisioned stations to 80.70% with local repair. Under the compound-failure regime, local repair produced 75.65%, below the provisioned arm's 77.15%. These are outcomes from paired seeded simulations, with 24 seeds per regime. The [published method](https://iamrobin.ai/agent-swarm/ocean-swarm/README.md) retains the model, comparisons and limitations.

The important feature is the reversal. A mechanism that helps when a vehicle disappears can hurt when the evidence used to infer vacancies becomes unreliable. A delayed report is part of the world. It can change where a repair goes and what useful work it displaces.

This does not demonstrate correlated language-model errors. The ocean experiment is a synthetic coordination model, without a real ocean trial or continuously reasoning agents. Its narrow contribution is a counterexample: adding a recovery mechanism does not guarantee a better outcome across failure conditions. Transferring that question to an AI organization requires a separate test.

## Keep the other experiment in its own box

The lab also contains Minimum Intelligence, which used real model calls to produce plans before replaying physical outcomes. Its [results record](https://iamrobin.ai/agent-swarm/minimum-intelligence/RESULTS.md) reports 333 successful calls across three model worlds. The plans were frozen. The models did not observe later shocks and replan during execution.

That distinction changes what we can say. A frozen plan surviving a replay is evidence about the plan and the execution rules in that replay. It is not a measurement of an always-on employee recovering from a live surprise. Successful model calls establish that requests returned; they do not establish that every resulting plan was superior.

The study also warns that the sector-planner comparison changes information pooling and coordination together. A difference between ten sector planners and a hundred local planners cannot be assigned to agent count alone. A cheaper-looking arrangement may be benefiting from better information, a different decomposition or both.

There is no need to merge every count in the laboratory into one impressive number. Tests, physical outcomes and model calls answer different questions. Keeping their denominators separate makes the work more useful: another builder can see which conclusion to challenge and which experiment would resolve it.

## Failure travels through the organization

The research literature gives us language for the same design problem. Cemri and colleagues' [multi-agent failure study](https://arxiv.org/abs/2503.13657) organizes observed failures into system-design issues, inter-agent misalignment and task verification. These categories describe different places where a team can lose the plot; adding participants does not automatically repair any of them.

For example, a precise answer to the wrong task can survive several reviewers if all inherit the same mistaken specification. An accurate observation can become useless when it is handed to the wrong worker. A correct intermediate result can still produce an unacceptable delivery if nobody checks the actual finish condition.

Huang and colleagues' [faulty-agent study](https://arxiv.org/abs/2408.00989) examines how deliberately introduced errors interact with different collaboration structures. The result supports asking how messages and checks are arranged. It does not establish a universally best organization for every contemporary model, workload or real business.

These studies are earlier research, not new October product releases. Their value here is methodological. They tell an operator to examine the route a mistake takes through a system. Our spreadsheet example, the simulated ocean and a language-model collaboration are different settings. The shared question is where incorrect information can become accepted action.

## Draw the common dependency before drawing the swarm

An organization chart invites us to count boxes. A failure map asks what all those boxes depend on. Start with evidence, tools, memory, acceptance and authority. Connect each worker to the things it actually uses, including any common summarizer that sits between the original source and the worker.

In our invented valuation task, the rate cell would have arrows into every analyst. A vote among the analysts would return to the same cell through those arrows. The map would show why another vote adds less protection than a separate rate check. No elaborate model evaluation is needed to see that dependency.

![Conceptual comparison of a shared source feeding multiple agents and a separate source check before acceptance. No measured performance is implied.](/action-item/20261004/shared-failure.svg)

The diagram is a design sketch, not a measured improvement. A separate check can be wrong too. Its advantage must come from a defined difference: another original source, a different observation channel, a deterministic calculation or an acceptance condition grounded outside the agent's own explanation.

This is where diversity earns its budget. Ask which mistake the proposed reviewer can detect, what information makes that possible and how its disagreement changes the workflow. If the only answer is that the reviewer has a different name, the organization has added a role without yet specifying a protection.

## Give disagreement somewhere to go

A critic that can only write another paragraph may increase reading time without changing the result. Before adding one, decide what happens when it objects. Does the case return for correction? Does a deterministic test run? Does the workflow stop with the missing fact identified? Who can clear that stop, and on what evidence?

Consider the imaginary exchange-rate dispute again. The useful output is a record of the two rates, their timestamps, the currency convention and the valuation's sensitivity. “I disagree” is too weak. “I am confident” is weaker still when confidence comes from the same original cell.

Disagreement should also have a cost limit. Repeated reviews can turn a small uncertainty into an endless conversation. A bounded process can request one independent observation, retain the unresolved difference and return a clear decision boundary. That is a proposal for an operating rule, not a claim that every case will resolve automatically.

The same discipline applies when everyone agrees. Agreement can close a check only when the check was designed to test the relevant failure. A chorus of approvals cannot substitute for an observation that nobody made. The missing observation should remain visible to the person using the result.

## Separate the ability to notice from permission to act

The worker that discovers a problem does not necessarily need authority to change production. A research assistant may identify a broken link, while a release process owns the change. A financial assistant may detect inconsistent assumptions, while the owner retains capital decisions. That separation makes findings usable without silently enlarging the consequences of a mistake.

A useful reviewer can therefore be powerful in observation and narrow in action. It can inspect evidence, preserve a discrepancy and prevent a candidate from passing a stated gate. It need not possess the same credentials as the worker it is checking. Giving every member the same write access creates another shared dependency: one mistaken instruction can now reach every actuator.

Recovery deserves an equally concrete boundary. Preserve the last accepted artifact, identify the changed evidence and make the next attempt distinguishable from the previous one. If a message disappears, retain uncertainty about delivery until the receiving system supplies evidence. These are design choices to specify for the workload, not an excuse for unrelated access or endless permission prompts.

A small company should feel the benefit in fewer ambiguous handoffs. The owner should receive a result, its material limits and the exact decision that still belongs to them. A bigger swarm that simply generates a bigger pile of unresolved decisions has not yet earned its place.

## Test one dependency at a time

Here is a bounded experiment I would run next. Choose a harmless research-to-draft task using public information and a fixed set of synthetic cases. Compare one worker, a team sharing the same evidence packet and a team with a separately sourced verification step. Freeze the task, cases and acceptance criteria before reading outcomes.

Introduce a known defect into one field of the shared packet. Include clean cases as well, so a system that rejects everything cannot appear successful. Keep the injected defect separate from ordinary task difficulty, and disclose exactly which arm can obtain the independent observation. That extra access is part of the treatment, not a hidden advantage.

Record accepted correct outputs, accepted incorrect outputs, unresolved cases, elapsed time, model usage and human review minutes. Keep failures and abandoned runs in the denominator. A local demonstration with a few cases would establish only those cases; it would not justify a claim about every model or all business tasks.

The promotion rule should be written first: fewer accepted errors at comparable usefulness, with the extra cost and review burden visible. If the verification arm catches the injected defect while harming clean-case performance, that tradeoff belongs in the result. If the simpler single worker meets the requirement, the team has to justify its added machinery.

This experiment has not been executed for this essay. It is a reusable specification, deliberately small enough to distinguish shared evidence from headcount. No paid service, live account, security attack or production change is required to ask the question clearly.

## Buy a failure you can survive

The next time a team proposes another agent, ask for a sentence: “This addition protects us against this failure because it can observe this evidence, and its finding changes this decision.” That sentence is more informative than a diagram with fifty new faces.

Keep a short operating card beside it: the shared dependency, independent observation, acceptance owner, permitted response and measured outcome. Leave the outcome blank until the test has run. Revisit the card when the source, model or tool changes, because a once-separate path can quietly become shared again.

There will be tasks where parallel work wins decisively. There will be tasks where a single capable worker with a strong external check is easier to trust. The architecture should earn its complexity through the failures it catches and the useful work it delivers.

A hundred assistants can be a formidable team. Before celebrating their agreement, find out whether anyone looked at the exchange rate.

## Categories and keywords

**Categories:** Agentic AI; Systems; Productivity.

**Keywords:** shared failure; independent verification; agent coordination; bounded experiments.

**Hashtags:** #AgenticAI #SystemsThinking #AIProductivity #IAmRobin
