---
title: "Sixteen Agents Can Share One Mistake"
date: 2026-11-19
updated: 2026-11-19
section: Ouroboros
series: Daily Action Item
hero: /action-item/20261119/hero.webp
ogImage: /action-item/20261119/og.webp
ledgerId: MULTIAGENT-SHARED-ERROR-20261119
draft: false
categories:
  - Agent Workflows
  - Editorial Systems
  - AI Verification
tags:
  - Perplexity Computer
  - Multiagent
  - Model Council
  - source verification
keywords:
  - multiagent shared error
  - independent evidence checks
  - agent coordination
  - AI archive distribution
excerpt: "Shared context can speed an AI team, while independent source checks keep one mistake from becoming group consensus."
canonical: "https://iamrobin.ai/ouroboros/202611/20261119/action_item/"
author: https://iamrobin.ai/#person
inLanguage: en
sourceAction: "2026-11-19 Daily Briefing, item 5"
visualHeadline: "Shared context can carry one mistake."
visualSubhead: "COORDINATE · TRACE · VERIFY"
visualFooter: "Consensus needs a route back to evidence"
visualNodes: "SOURCE|SHARE|CHECK|CORRECT"
thesis: "Collaboration and verification solve different problems: agents can share work while load-bearing claims retain an independent route back to evidence."
---

# Sixteen Agents Can Share One Mistake

A complicated assignment usually produces more than an answer. It produces a trail of documents, calculations, revisions and decisions. Someone reads the source material. Someone builds a forecast. Someone checks whether the forecast agrees with the written explanation. As the work grows, keeping everyone aligned becomes a task of its own.

Perplexity Computer brings that kind of coordination to AI work. It connects models—the software that generates and reasons through responses—with tools, files and connected applications to carry out assignments involving several steps. An agent is an AI worker given a task and access to tools for completing it. Several agents can contribute to one finished piece of work, such as a report or forecast.

The attraction is easy to understand: divide a large assignment into manageable parts, then bring the results together. The harder question concerns what happens along the way. Each worker needs enough information to contribute. Each claim also needs a reliable route back to its evidence.

On November 17, 2026, Perplexity announced a new Computer effort level called **Multiagent**, available to Perplexity Max subscribers on the web. Its central feature is direct collaboration among agents. They can share findings, check each other’s work and contribute to shared deliverables—the files or other results the user receives.

That announcement introduces a useful distinction between three ways of organizing an AI team.

In **Ultra**, one lead model divides the assignment among supporting agents. Their findings return to the lead, which coordinates the work. In **Multiagent**, the same lead model coordinates a team whose members can also exchange findings directly. A discovery in one part of the assignment can therefore inform another agent’s work as it develops.

**Model Council** takes a different route. Several models investigate the same question independently. Computer then combines their findings and shows where they agree and disagree. This gives separate lines of investigation time to develop before the answers meet.

These arrangements serve different purposes. Ultra organizes delegation. Multiagent supports interconnected work. Model Council preserves separate investigations at the beginning. Understanding those differences matters more than imagining a room full of increasingly busy digital workers.

Perplexity presents Multiagent as suitable for assignments such as reviewing a company’s collection of business documents before an investment, or preparing forecasts under several possible futures. These tasks have many connections. A finding in a contract could change a revenue assumption. A revised assumption could affect a forecast, which could then require a change to the final report.

Direct sharing gives those changes a route through the team. It also creates the possibility that an early mistake will travel along the same route.

Imagine a newsroom using a live board of reporting notes. This is an analogy for the coordination problem. Reporters put discoveries on the board so colleagues can see what has already been learned. A writer can begin a draft while another reporter continues researching. The shared board saves time and helps everyone work toward the same story.

Now imagine that one entry gives the wrong date for a company announcement. Several writers may copy it into their drafts. Their agreement then traces back to a single entry. An assigned fact-checker who opens the original announcement has a separate opportunity to catch the error.

The board and the fact-checker each contribute something valuable. One makes the team’s work easier to coordinate. The other checks whether a claim survives contact with its source.

A team of sixteen agents could face the same problem. Sixteen is an illustration here; Perplexity’s announcement describes the collaboration pattern. If every agent inherits the same mistaken summary, the finished work can contain broad agreement built on one error. The relevant question becomes how many separate evidence checks support that agreement.

Perplexity’s shared-workspace design helps explain how information can move through such a team. The company describes Projects as persistent workspaces: files and history remain available as people and agents continue working over time.

These workspaces use Git, a system that records versions of files. Each agent works in a separate sandbox, an isolated working area, then submits a recorded change called a commit. The shared service accepts a submission when it builds on the latest accepted version. An agent working from an older version must fetch the current work, replay its changes and submit again.

This addresses a practical coordination problem. Several agents may be editing related material at once. Requiring each accepted change to build on the current version helps keep the shared work coherent. Commit history and a separate record of accepted changes also support tracing who changed what.

Perplexity reports that fewer than 2% of production submissions are rejected because they are based on an older version. It reports a median submission time below 1.7 seconds, meaning the middle submission in the measured set took less than that. These company-reported figures describe the machinery for accepting changes.

Factual accuracy belongs to a separate layer. A smoothly accepted edit can contain a carefully checked fact, a reasonable estimate or a copied error. The file history helps someone locate a change. The underlying source helps them judge whether the claim deserves to stay.

Researchers have explored ways for AI systems to question one another’s answers for several years. On May 23, 2023, Du and coauthors submitted *Improving Factuality and Reasoning in Language Models through Multiagent Debate*. Their study examined multiple model instances proposing responses and debating them across rounds. It provides historical context for the debate pattern; its findings concern the systems and experiments studied in that paper.

Perplexity’s current products raise a fresh practical question: how much independent investigation should a team preserve while its members collaborate?

One possible approach separates shared production from independent verification. Agents could share files, task progress and working assumptions, while a checker separately opens the sources supporting the report’s central claims. A source link, a record of which agent introduced a claim and a visible correction history would make later review easier.

That is a proposed review pattern. Its value would depend on what it achieves in use. A meaningful comparison would give the different modes comparable assignments and assess the finished work, total cost, human assistance time and recovery when something goes wrong. Comparable performance across Ultra, Multiagent and Model Council remains an open question in the supplied product accounts. The workspace measurements establish a narrower picture of infrastructure performance.

The importance of the underlying sources also appeared in a separate announcement the following day. On November 18, OpenAI and Le Groupe Figaro announced a partnership covering current reporting and archive material from Le Figaro and related publications. The agreement allows ChatGPT to make articles discoverable through summaries, excerpts and links to the underlying stories. Le Figaro retains editorial independence and control over its journalism.

That agreement shows how original reporting and archives can become assets in AI distribution. Its eventual effects on readership and publisher economics remain open. For an AI team checking a claim, the link back to an underlying story provides something concrete: a place to examine the evidence behind a summary.

Shared workspaces can help agents carry an assignment forward together. Independent investigation can reveal where their conclusions diverge. The design challenge lies in deciding how those two capabilities should meet.

As AI teams become easier to assemble, which part of a team should share context, and which part should remain independent?

**Sources**

- Perplexity, [Introducing Computer Multiagent](https://www.perplexity.ai/en-GB/hub/blog/introducing-computer-multiagent), November 17, 2026; [news listing](https://www.perplexity.ai/en-GB/hub/blog/category/news); [Model Council changelog](https://www.perplexity.ai/en-GB/changelog/shared-workspaces-personal-computer-for-windows-and-model-council).
- Perplexity, [Building shared workspaces for people and agents](https://www.perplexity.ai/en-GB/hub/blog/building-shared-workspaces-for-people-and-agents).
- OpenAI, [Le Groupe Figaro and OpenAI announce partnership](https://openai.com/index/le-groupe-figaro-and-openai-announce-partnership/), November 18, 2026.
- Du et al., [Improving Factuality and Reasoning in Language Models through Multiagent Debate](https://arxiv.org/abs/2305.14325), submitted May 23, 2023.
