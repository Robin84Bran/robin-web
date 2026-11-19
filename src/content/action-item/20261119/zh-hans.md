---
title: "十六个代理可以共享同一个错误"
date: 2026-11-19
updated: 2026-11-19
section: Ouroboros
series: Daily Action Item
hero: /action-item/20261119/hero.webp
ogImage: /action-item/20261119/og.webp
ledgerId: MULTIAGENT-SHARED-ERROR-20261119
draft: false
categories:
  - 代理工作流程
  - 编辑系统
  - AI 核验
tags:
  - Perplexity Computer
  - Multiagent
  - Model Council
  - 来源核验
keywords:
  - 多代理共享错误
  - 独立证据核查
  - 代理协作
  - AI 档案分发
excerpt: "共享上下文让 AI 团队协作更快；独立查证来源，才能防止一个错误变成集体共识。"
canonical: "https://iamrobin.ai/ouroboros/202611/20261119/action_item/zh-hans/"
author: https://iamrobin.ai/#person
inLanguage: zh-Hans
languageSlug: zh-hans
translationOf: "https://iamrobin.ai/ouroboros/202611/20261119/action_item/"
translationReview: PASS
sourceAction: "2026-11-19 Daily Briefing, item 5"
visualHeadline: "共享上下文，也可能共享错误。"
visualSubhead: "协作 · 溯源 · 核验"
visualFooter: "共识必须能追溯到证据"
visualNodes: "来源|共享|核查|纠正"
thesis: "协作与核验解决不同的问题：代理可以共享工作，但关键主张必须留有独立的证据路径。"
---

# 十六个代理可以共享同一个错误

一项复杂任务，交出的往往不只是答案，还有一串文件、计算、修订与决定。有人读原始材料，有人做预测，有人核对预测是否与文字解释一致。工作越大，让所有人保持同步就越像一项独立任务。

Perplexity Computer 把这样的协作带进 AI 工作。它把模型——生成回答并进行推理的软件——与工具、文件和已连接的应用程序接起来，处理需要多个步骤的任务。代理则是获派任务、可使用工具完成工作的 AI 执行者。多个代理可以共同完成一份报告或预测。

好处很直观：把大任务拆开，再汇总成果。难题发生在过程中。每个执行者都需要足够的信息才能贡献工作；每项主张也都需要一条可靠路径，回到支持它的证据。

2026 年 11 月 17 日，Perplexity 为 Computer 增设 **Multiagent** 执行档位，供 Perplexity Max 网页订阅者使用。核心变化是代理可以直接协作：分享发现、相互核查，并共同完成用户最终收到的文件等交付物。

这次发布把 AI 团队的三种组织方式区分得很清楚。

在 **Ultra** 模式中，一个主模型把任务分给辅助代理，代理把发现交回主模型，由主模型统筹。在 **Multiagent** 中，主模型仍负责协调，但代理之间也能直接交换发现。一处工作中的新发现，可以在另一名代理继续工作时就影响其判断。

**Model Council** 走的是另一条路。几个模型先独立调查同一个问题，Computer 再汇总结果，展示它们的共识与分歧。不同的调查路线可以先各自发展，之后才让答案相遇。

三种安排各有用途：Ultra 管理分工，Multiagent 支持相互关联的工作，Model Council 在起步阶段保留独立调查。理解这些差异，比想象一屋子越来越忙的数字员工更重要。

Perplexity 举出的 Multiagent 用途包括：投资前审阅一家公司的整套商业文件，或针对多种未来情景编制预测。此类任务环环相扣。合同中的一项发现可能改变收入假设；假设一变，预测也要调整，最后的报告又得跟着改。

直接共享让变更能在团队内传递。早期错误也可能沿着同一条路扩散。

可以把这想成一家新闻编辑部共用的实时采访板。这是用来说明协作问题的类比。记者把新发现贴上去，同事就知道哪些信息已经找到。一人继续采访时，另一人可以先写稿。共享板省时间，也让大家朝同一篇报道推进。

现在设想板上有一条公司公告的日期写错了。几位作者照着它写进草稿，表面上彼此一致，实际却都指向同一条错误记录。若有专人打开公告原文核对，就多了一次独立发现错误的机会。

共享板和事实核查员各有价值：前者让团队更容易协调，后者检验一项主张能否经得起原始来源的核对。

十六个代理也可能遇到同样的问题。这里的“十六”只是说明用的数字；Perplexity 公告描述的是协作模式。如果每个代理都继承了同一份错误摘要，最终作品可能在一个错误之上形成广泛共识。真正该问的是：这份共识背后有多少次相互独立的证据核查？

Perplexity 的共享工作区设计，解释了信息如何在团队中流动。公司把 Projects 描述为可持续使用的工作区：人和代理不断推进工作时，文件与历史记录仍会保留下来。

这些工作区使用 Git 记录文件版本。每个代理在独立的沙盒，即隔离的工作区域中操作，再提交一笔称为 commit 的变更记录。共享服务只接受基于最新已接纳版本的提交。若代理依据的是旧版本，就必须取回最新工作、重放自己的修改，再次提交。

这解决了一个实际的协作难题：多个代理可能同时编辑相关材料。要求每项获接纳的变更都基于当前版本，有助于保持共享成果一致。提交历史和单独的接纳记录，也方便追查谁改了什么。

Perplexity 报告，在生产环境中，因基于旧版本而被拒绝的提交不到 2%；提交耗时的中位数低于 1.7 秒，也就是测量样本中处于中间位置的那次提交用时不到 1.7 秒。这些公司提供的数据，衡量的是接纳变更的机制。

事实准确性是另一层问题。一项顺利接纳的修改，可能包含认真核实的事实、合理估计，也可能只是复制了错误。文件历史帮助人找到变更；原始来源才帮助人判断主张是否站得住。

研究人员多年来一直在探索让 AI 系统互相质疑答案的方法。2023 年 5 月 23 日，Du 等人提交论文 *Improving Factuality and Reasoning in Language Models through Multiagent Debate*，研究多个模型实例先提出答案，再进行多轮辩论。这为“辩论”模式提供历史背景；研究结果只适用于论文所测试的系统与实验。

Perplexity 现在的产品提出了一个新的实践问题：团队成员协作时，应保留多少独立调查？

一种可能做法是把共同生产与独立核验分开。代理可以共享文件、任务进度和工作假设；核查者则独立打开报告核心主张所依据的来源。来源链接、引入主张的代理记录，以及可见的纠正历史，都有助于之后复核。

这是一种拟议中的审查方式，价值要靠实际效果验证。公平的比较应让不同模式处理可比任务，再评估最终作品、总成本、人工协助时间以及出错后的恢复能力。现有产品说明仍不能回答 Ultra、Multiagent 与 Model Council 在可比条件下表现如何；工作区指标只能说明较窄范围内的基础设施性能。

次日的另一项公告，也凸显了原始来源的重要性。11 月 18 日，OpenAI 与 Le Groupe Figaro 宣布合作，涵盖 Le Figaro 及相关刊物的当期报道与档案。ChatGPT 可以通过摘要、摘录和指向原文的链接，让读者发现这些文章。Le Figaro 保留新闻编辑独立性及对报道的控制权。

这项合作说明，原创报道和档案可以成为 AI 分发中的资产。它最终如何影响读者流量和出版商经济，仍有待观察。对于核查主张的 AI 团队，通往原文的链接提供了一个具体落点：人可以在那里检验摘要背后的证据。

共享工作区帮助代理一起把任务往前推。独立调查则可能揭示结论之间的分歧。设计上的关键，是决定这两种能力在哪里相接。

当 AI 团队越来越容易组建，哪些部分应该共享上下文，哪些部分应该保持独立？

**来源**

- Perplexity，[Introducing Computer Multiagent](https://www.perplexity.ai/en-GB/hub/blog/introducing-computer-multiagent)，2026 年 11 月 17 日；[新闻列表](https://www.perplexity.ai/en-GB/hub/blog/category/news)；[Model Council 更新记录](https://www.perplexity.ai/en-GB/changelog/shared-workspaces-personal-computer-for-windows-and-model-council)。
- Perplexity，[Building shared workspaces for people and agents](https://www.perplexity.ai/en-GB/hub/blog/building-shared-workspaces-for-people-and-agents)。
- OpenAI，[Le Groupe Figaro and OpenAI announce partnership](https://openai.com/index/le-groupe-figaro-and-openai-announce-partnership/)，2026 年 11 月 18 日。
- Du 等人，[Improving Factuality and Reasoning in Language Models through Multiagent Debate](https://arxiv.org/abs/2305.14325)，2023 年 5 月 23 日提交。
