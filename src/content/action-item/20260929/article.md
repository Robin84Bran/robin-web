---
title: "The Interface Is Part of the Model"
date: 2026-09-29
updated: 2026-09-29
section: Ouroboros
series: Daily Action Item
categories:
  - Agent Infrastructure
  - Enterprise Software
  - Evaluation
tags:
  - Agents
  - Computer Use
keywords:
  - interface choice
  - matched evaluation
  - cost per accepted result
excerpt: "A shorter path can beat a smarter model. Evaluate the interface, the task and the acceptance rule together."
hero: /action-item/20260929/hero.webp
ogImage: /action-item/20260929/og.webp
canonical: "https://iamrobin.ai/ouroboros/202609/20260929/action_item/"
author: https://iamrobin.ai/#person
inLanguage: en
draft: false
sourceAction: "Daily Briefing 2026-09-29, item 5"
ledgerId: AGENT-INTERFACE-20260929
visualHeadline: "The interface is part of the model"
visualSubhead: "Same task. Different routes. Verify the result."
visualFooter: "MODEL / INTERFACE / TASK / ACCEPTANCE"
visualNodes: "MODEL|INTERFACE|TASK|RESULT"
---

Imagine hiring two assistants to update a customer record. One receives a browser, a mouse and a password. The other receives a small function called “update customer.” The second finishes first. Have you found a better assistant, or given one of them a shorter corridor?

That question becomes practical with H Company’s September 28 Holo4 release. The provider describes models that can work through graphical interfaces, code, MCP and APIs. Its comparison notes acknowledge differences in benchmark versions, task subsets and execution frameworks. The release is a useful invitation to examine the whole working system. It does not give us a controlled experiment of our own. [Holo4 release](https://huggingface.co/blog/Hcompany/holo4)

The conclusion is simple: the interface belongs inside the evaluation. When we buy an agent, we buy a way of completing work. The model is one ingredient. What it can see, what actions it can take, and how we decide the job is finished can change the outcome before the first token is generated.

## The shorter corridor can be valuable

Return to the imaginary customer record. The browser assistant searches for a name, opens a profile, finds an edit control, changes a field and saves it. The function assistant supplies an identifier and a new value. Both might leave exactly the same final record. The difference in effort can be commercially useful even if the underlying reasoning ability is identical.

A business should welcome that saving when the function is available, authorized and reliable. Forcing every task through a mouse to make the competition look sporting would be an odd way to run a company. A procurement exercise should reflect the environment the buyer can actually operate. Better integration is a legitimate part of a better product.

The trouble starts when the conclusion changes. “This configured system completed our workflow more cheaply” is a defensible statement after a suitable test. “This model reasons better” requires a different comparison. An interface can remove several opportunities to make a mistake. That is a system advantage whose cause deserves a name.

This distinction creates two useful questions. Which complete product should I use for this job? And which component caused the improvement? The first guides deployment. The second guides engineering and helps predict whether the advantage will survive a different customer, an absent integration or a changed application.

## The same screen can hide different information

Even a browser comparison needs more detail than a screenshot of two matching windows. One assistant might receive only pixels. Another might also receive the page’s accessible structure, including labels and roles. A third might search stored records directly. They can appear to use the same application while receiving different evidence about its state.

For a hypothetical invoice task, imagine a reference number clipped inside a narrow column. A person can widen the column. An assistant reading structured text might already have the full number. The visual assistant must discover an extra step; the structured assistant begins with the answer to that small subproblem. A failure in the first route tells us something about the observation channel as well as the model.

BrowserGym provides a shared environment for browser-agent research across supported benchmarks. Its existence is useful context for treating the environment as something we can specify and compare. It does not make two arbitrary experiments equivalent merely because both use the library. [BrowserGym](https://github.com/ServiceNow/BrowserGym)

My proposed evaluation card would therefore record the observation channel alongside the model name. Screenshots, accessible text, tool responses and files should be explicit. If one configuration sees additional information, keep that advantage in the product comparison and label it. For the causal comparison, give both sides the same relevant evidence wherever the experiment permits.

## A tool call is a bundle of work

One click and one API call are convenient counters, yet they can represent very different amounts of work. A click might open a menu. A single tool call might validate a customer, update several fields and return a structured confirmation. Dividing the same business task into different action units changes the meaning of a step budget.

Suppose an imaginary evaluation permits each assistant ten steps. The assistant with the larger tool could finish within the allowance while the other times out halfway through navigation. That result could be entirely correct under the rules. It would still be a poor basis for claiming equal opportunities to complete the underlying work.

I would keep the action count because it helps explain the trajectory. I would also record elapsed time, model usage, tool charges and human attention. The buyer needs the total bill and an understandable failure path. The engineer needs enough detail to distinguish a costly reasoning loop from a badly chosen interface.

This is also where a small company can find an advantage. Improving a repetitive interface may be more useful than replacing a model. That is a hypothesis to test in a particular workflow, with maintenance and integration costs included. It is not a promise that an API always wins. A brittle integration can turn a short corridor into a locked door.

## Completion deserves its own column

A nearly finished task can look impressive in a replay. A report has been drafted, the right customer is open, and the final field is correct. Then the assistant saves the wrong version or leaves the work unsubmitted. Whether that counts as success depends on the acceptance rule, and that rule should be visible before anyone sees the score.

OSWorld 2.0 distinguishes partial reward from binary completion in its evaluation interface. The distinction is useful: progress through a long workflow and completion of the required outcome answer different questions. I am using the benchmark as methodological context, without presenting any of its historical model scores as today’s ranking. [OSWorld 2.0](https://osworld-v2.xlang.ai/)

For our imaginary customer task, completion might require the correct record, the requested change, no unauthorized edits and an independently readable final state. A friendly message saying “done” would be evidence of what the assistant reported. It would need to agree with the application before the task could pass.

Partial credit still has a place. It can reveal whether a system fails at finding the record, interpreting the instruction or completing the last operation. Keep those diagnostic results beside the final acceptance rate. Otherwise a useful debugging measure can quietly become an economic claim about work the buyer still has to finish.

## Public tasks and private tasks are different samples

The next comparison problem is quieter. Two reports can use the same benchmark name while testing different task sets. A public collection may be available for development. A held-out collection may test generalization. Both can be carefully built, yet their scores are observations on different samples.

AutomationBench explicitly separates its public task set from the private set used for the official leaderboard, and cautions that local scores need not match official scores directly. That source gives us a concrete reason to retain the task-set label rather than copying only the benchmark name. [AutomationBench](https://github.com/zapier/AutomationBench)

Imagine two candidates taking driving tests in different towns. One route contains a complicated junction; the other has roadworks and temporary signs. A percentage alone cannot tell us which driver would perform better on the same route. The sensible next step is a matched comparison, or a narrower statement about the evidence we actually have.

A buyer can use published benchmarks to build a shortlist. The final choice should lean on a small, representative set of the buyer’s own authorized tasks. Preserve some cases for evaluation after configuration decisions are finished. If every disappointing case becomes another opportunity to tune the system, the test gradually turns into a rehearsal.

## An evaluator can improve while a model stands still

An evaluation rule is software and a specification. It can contain an ambiguous instruction, an overly permissive check or an environmental dependency that changes between runs. A correction can alter the reported score even when the model and its behavior remain unchanged. That makes evaluator version part of the evidence.

WebArena-Verified describes audited tasks and deterministic evaluation using agent responses and captured network traces. This is a concrete example of work on the measurement instrument itself. Its documentation does not certify every possible customer workflow or remove the need to inspect what a particular evaluator accepts. [WebArena-Verified](https://github.com/ServiceNow/webarena-verified)

For the customer-record example, an evaluator that checks only the final field might overlook a second record changed by mistake. Adding a check for untouched records would make the test stricter. A lower score under the corrected rule could reveal a problem that was always there. It would be misleading to call that change a sudden loss of intelligence.

I would therefore save the evaluator revision, the initial state and the expected final state with each result. When a rule changes, rerun the relevant comparison or mark the old result as belonging to the old rule. This bookkeeping is small compared with explaining why yesterday’s champion fails an ordinary acceptance test today.

## Give the comparison two lanes

The most useful evaluation would have two lanes. In the first, compare complete configurations as they would actually be used. Allow each product its supported interfaces within the same business authority. Count integration, operation and review costs. This lane answers the buyer’s question about the best available system for a defined task distribution.

In the second lane, change one component at a time. Keep the model fixed while changing the interface, then keep the interface fixed while changing the model. Hold initial data, task instructions, completion rules and resource limits stable enough to make the differences interpretable. This lane answers the builder’s question about where the gain came from.

![Two evaluation lanes separate product choice from causal explanation.](/action-item/20260929/interface-comparison.svg)

*Author-designed comparison framework. The diagram specifies a proposed evaluation; it reports no model experiment or measured improvement.*

A mixed-interface system adds an interesting third possibility: choosing which route to use for each subtask. That choice has a cost and can itself fail. A product may be excellent at calling an API once the correct function is known, yet poor at deciding when the graphical route is necessary. Record route selection and switching in the trajectory instead of treating them as invisible plumbing.

The limits should remain comparable in meaning, even when they cannot be identical in every unit. Equal money, equal time and equal step counts are different constraints. Choose the constraint that fits the question, state it before running, and show the other quantities alongside it. Avoid changing the budget only for a favored candidate after seeing its failures.

## Put a small price on a complete result

Here is a deliberately invented example. Configuration A costs US$20 across ten attempted tasks and produces eight accepted results. Configuration B costs US$12 across ten attempts and produces four accepted results. Before adding integration or review, their costs per accepted result are US$2.50 and US$3.00 respectively. The arithmetic is 20 divided by eight and 12 divided by four.

The cheaper set of attempts therefore has the higher cost per accepted outcome in this example. Nothing here measures Holo4 or any other product. The numbers illustrate why the denominator matters. If no result is accepted, report that fact; do not manufacture a finite cost-per-success figure by replacing the missing denominator.

Now give A an expensive integration and B a workflow an owner can maintain in minutes. The practical preference could change again. Fixed costs belong over a realistic volume and lifetime. Human review belongs at an explicit cost assumption. Keep cash expenditure and estimated labor cost distinguishable so that another reader can recompute the comparison with their own situation.

There is no universal cheapest agent hiding inside this calculation. There is a configuration that may be attractive for a stated workload, horizon and acceptance rule. That is a narrower conclusion, and it is much more useful when someone has to pay the bill.

## The first experiment should fit on one page

My next step would be a proposed, unexecuted acceptance exercise using synthetic customer records. Choose a small frozen set of update tasks, including an ambiguous name, a missing record and a field the assistant is forbidden to alter. Provide two authorized interfaces to the same simulated state. Neither route touches a real customer or sends a message.

Define success before choosing a winner. The required update must be correct, protected fields unchanged, and the final record independently checked. Appropriate refusal or clarification should pass on cases deliberately made impossible or ambiguous. A system that changes the wrong account confidently should fare worse than one that identifies the missing information.

Run the complete-product comparison separately from the controlled component comparison. Preserve unsuccessful trajectories and record cost, duration, interventions and acceptance. Repeat enough cases and runs to see whether an apparent advantage depends on one fortunate attempt. Publish the limits alongside any result. This article proposes that work; it does not claim to have performed it.

The monitoring rule is equally small: revisit the choice when the model, interface, workload or evaluator changes materially. A new connector can matter as much as a new model release. A removed permission can invalidate an old performance claim. A changed customer task can make the old winner irrelevant without making it worse at what it previously did.

The assistant at the end of the shorter corridor may be the one worth hiring. Just write down who shortened the corridor. That is how a persuasive demonstration becomes a result another person can use.

## Categories and keywords

Categories: Agent Infrastructure; Enterprise Software; Evaluation.

Keywords: computer-use agents, interface choice, matched evaluation, completion criteria, cost per accepted result.

**Hashtags:** #AgentInfrastructure #ComputerUse #Evaluation #IAmRobin
