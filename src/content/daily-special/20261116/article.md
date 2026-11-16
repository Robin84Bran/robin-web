---
title: "What Happens After an AI Clicks Finish"
date: "2026-11-16"
updated: "2026-11-16"
section: "Ouroboros"
series: "Daily Special"
lane: "RESEARCH"
tags: ["AI Agents", "Computer Use", "Evaluation"]
keywords: ["legacy portal", "computer-use agent", "accepted completion", "human intervention", "cost per outcome"]
categories: ["Research", "AI Systems"]
excerpt: "Shield reports faster computer-use agents in live legacy portals. A complete 100-run record would connect speed to accepted work, recovery, human time and cost."
hero: "/daily-special/20261116/hero.png"
ogImage: "/daily-special/20261116/og.png"
canonical: "https://iamrobin.ai/ouroboros/202611/20261116/special/"
author: "https://iamrobin.ai/#person"
inLanguage: "en"
draft: false
translationReview: "PASS"
sourceSignal: 1
researchScope: "A bounded public-source measurement design for one frozen legacy-portal workflow. The proposed 100 runs were not executed; no customer system, production workflow, purchase, capital allocation, company contact or external message occurred."
artifactSha256: "5ca4ea84cc150b687e922198db293153423ce171de697754363694b66aeb1cfd"
evidenceSources: ["https://openai.com/business/customer-stories/shield/", "https://shieldtp.com/forge", "https://shieldtp.com/company-news/forge-building-for-it-services-from-the-inside-out", "https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/", "https://openai.com/index/computer-using-agent/"]
---
# What Happens After an AI Clicks Finish

An IT support ticket can send a technician through several different systems before the work is done. The technician may need customer records, device details, software licences and a procedure explaining what to change. IT services providers handle this work for other businesses, often across a mix of modern software and older websites.

Shield Technology Partners describes its Forge platform as a way to bring that information and those procedures together. Its AI Engineer can also assign supported browser tasks to an AI agent. The technician sets the boundaries: which actions the agent may take, and which require review or approval.

That arrangement offers a practical route into a stubborn corner of office work. Older websites, often called legacy portals, sometimes offer access mainly through their screens. A direct connection between software systems—an application programming interface, or API—can make automation straightforward. Where that connection is absent, the screen becomes the route.

OpenAI describes computer use as an AI model reading screen pixels and operating a virtual mouse and keyboard. Think of the difference between sending an order directly to a shop’s order system and working through its checkout page. The second route requires interpreting what appears, entering information and responding to the next screen. A computer-use agent follows that visible path.

Shield says this kind of automation is already doing recurring work. Its account raises an appealing prospect for technicians: hand over a browser task and spend less time guiding every click. It also raises a question about what happens between assigning the task and accepting the result.

On September 24, 2026, Shield announced Forge and described one shared runbook—a reusable set of instructions—that had run nearly 300 times at another Shield provider. That example showed how a procedure could travel across its providers. Its connection to the legacy-portal work described later remains unspecified.

The more specific account appeared in an OpenAI customer story on November 13. Shield said its browser workflows were live across its IT providers, performing thousands of runs each month. Forge’s AI Engineer assigned supported browser tasks, and GPT-6 Astra navigated legacy portals.

Shield’s Head of Technology reported that Astra was **35–40% faster on average** than the older models Shield had used for computer-use tasks. Shield also reported fewer failures, fewer timeouts and less technician effort spent writing detailed instructions or helping an agent through a task.

Those are consequential claims. A technician’s workload includes both doing the job and rescuing automation when it gets stuck. Faster execution and less supervision could each make a difference.

The scope of the figures matters, too. Shield’s Forge product page, read on November 16, reported more than 3,750 businesses served, 50% of eligible tickets resolved autonomously and 3,800 custom agent runs daily. Those figures describe Forge broadly. The legacy-portal story concerns a particular use of computer-use agents within that larger platform.

The public account therefore establishes Shield’s report of recurring activity and improved speed. The published detail leaves the precise size and composition of the speed comparison open. The accepted result for a particular portal task also remains to be defined publicly.

For a technician considering a handoff, the natural question is: **Across every attempt at one task, how often does the agent finish correctly, how much help does it consume, and what does the finished work cost?**

A speed figure answers one part of that question. It describes time across the runs included in the calculation. A complete record would connect that time to the work actually delivered.

Imagine assessing a parcel service. Faster journeys are useful. So are records showing which parcels reached the correct address, which required another delivery attempt and which needed a person to intervene. The same distinction applies to an agent navigating a portal: reaching the final screen and reaching the required result are separate things to verify.

The research behind this article proposes a modest way to examine that distinction: keep a complete record of 100 runs through one defined workflow. The study remains a proposal, with execution still pending. Its purpose is to make the question measurable.

The task would be supported, reversible and suitable for a test environment or synthetic records. Before the first run, the study would define exactly what counts as success, including any required change in the underlying system. A success message on a screen would be one observation; the required final state would determine acceptance.

The starting page, account permissions, portal version, browser setup and kind of test data would also be fixed. So would the time limit, retry allowance, approval boundaries and conditions that require a stop. A comparison system would be selected in advance, alongside a consistent method for counting computing and technician costs.

All 100 cases would be chosen before reviewing results. Every attempted run would stay in the record. A timeout, an interruption or a technician takeover would remain part of the total.

The number 100 has a useful simplicity: each run represents one percentage point. It also leaves room to examine individual failures. The confidence a study deserves would still depend on the cases selected and the conditions tested.

Each run would end in one of six categories. The agent could finish correctly on its first attempt, or finish correctly after detecting trouble and recovering by itself. A technician could take over and complete the work. The agent could claim success while leaving the required result wrong. It could stop at an approval or policy boundary exactly as designed. Or it could fail through a timeout, a navigation problem or another incomplete outcome.

These categories preserve important differences. A safe stop can demonstrate that a control worked while leaving the task awaiting further action. A technician’s rescue can deliver the required result while consuming human time. An agent’s successful recovery can show resilience while adding delay and computing cost.

Recording where trouble began and how recovery unfolded would make those differences easier to understand.

From that record, four measures would describe the handoff.

The first is accepted completion: the share of all 100 runs that the agent completed correctly, either immediately or after its own recovery. Technician-completed work would appear separately.

The second is recovery: among runs that encountered a recorded recoverable failure, how many did the agent bring to an accepted finish? If the study encountered zero such failures, recovery performance would remain unmeasured, with that zero clearly shown.

The third is active technician time. Counting minutes per run and per accepted completion would reveal the human work surrounding the automation, including help and required reviews.

The fourth is total cost per accepted completion. It would combine model usage, computer infrastructure and attributable technician time, then divide by accepted completions. If accepted completions totalled zero, the record would show the money spent and leave the per-completion ratio unavailable.

Elapsed time would still matter. The middle run’s duration and the time covering 95% of runs would show both typical speed and the slower end of the experience. Applying the same measurements to the fixed comparison system would give the reported improvement a practical frame.

Shield’s account offers a reason to investigate: the company reports that computer-use agents are handling recurring browser work with greater speed and less assistance. A complete 100-run record would let a reader follow one workflow from assignment through trouble, recovery and final acceptance.

The most revealing number might turn out to be the time saved. It might be the technician minutes returned to other work, or the share of attempts that quietly reached the correct result. Keeping every attempt visible would allow that answer to emerge from the work itself.

Sources:

- [OpenAI, “Shield helps technicians hand off legacy portal work with OpenAI,” November 13, 2026](https://openai.com/business/customer-stories/shield/)
- [Shield Technology Partners, “Forge,” read November 16, 2026](https://shieldtp.com/forge)
- [Shield Technology Partners, “Forge: Building for IT Services from the Inside Out,” September 24, 2026](https://shieldtp.com/company-news/forge-building-for-it-services-from-the-inside-out)
- [OpenAI, “A practical guide to building AI agents,” read November 16, 2026](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/)
