---
title: "智能体学会了一套做法"
date: 2026-11-20
updated: 2026-11-20
section: Ouroboros
series: Daily Action Item
hero: /action-item/20261120/hero.webp
ogImage: /action-item/20261120/og.webp
ledgerId: PROCEDURAL-MEMORY-BOUNDARY-20261120
draft: false
categories:
  - Agent Workflows
  - AI Verification
  - Editorial Systems
tags:
  - Perplexity Computer
  - Agent skills
  - Honest Agent
  - procedural memory
keywords:
  - reusable agent skills
  - skill promotion
  - procedural memory
  - approval boundaries
author: https://iamrobin.ai/#person
sourceAction: "2026-11-20 Daily Briefing, item 5"
visualHeadline: "A procedure must earn its place."
visualSubhead: "EVIDENCE · REPLAY · BOUNDARY"
visualFooter: "Keep what improves the work"
visualNodes: "EXPERIENCE|TEST|APPROVE|REVERSE"
thesis: "Promote a reusable agent procedure only when replay shows useful improvement while preserving approval boundaries and reversibility."
excerpt: "Perplexity 报告可复用技能带来改善；关键问题是一次成功何时值得成为长期指令。"
canonical: "https://iamrobin.ai/ouroboros/202611/20261120/action_item/zh-hans/"
inLanguage: zh-Hans
languageSlug: zh-hans
translationOf: "https://iamrobin.ai/ouroboros/202611/20261120/action_item/"
translationReview: PASS
---

# 智能体学会了一套做法

AI 助手能打开文件、操作软件、核对结果，再决定下一步，才算开始像智能体一样工作。重复的任务有个老问题：每次重来，都要有人把同一套做法再讲一遍。

“技能”把这些做法写成可复用的指令，有时还附带执行部分工作的脚本。个人技能服务一位用户；内置技能则可能服务很多人。

它像工人手边的清单。好的清单会提醒人寄包裹前核对地址；草率的清单也能把捷径固定下来。写进清单之后，两种做法都会更容易重复。

Perplexity 于 2026 年 11 月 18 日发表《Self-improving skills》，介绍其 Computer 智能体如何根据过往活动的证据，提出修改可复用指令的建议。这种个性化改变的是提供给模型的上下文和指令，模型本身的权重并未改变。

智能体学会了一套做法。真正重要的问题是：这套做法凭什么进入以后的工作？

## 从一次经历到长期指令

Perplexity 把流程分成证据、反思、核验和启用四步。经历提供证据，反思提出修改，核验检验修改，启用才让通过的做法投入使用。

提出建议与启用是两回事。一次成功值得调查；把它写成长期指令，则会影响细节不同的后续任务。

要自动生成新的个人技能，Perplexity 要求同一种可复用行为独立出现两次。若是更新已有技能，一次有依据的实例就可能足够。新建程序与修订旧程序，门槛不同。

个人技能提案要经过按固定规则运行的检查，部分提案还会由模型复核。每位用户最多可自动生成十项个人技能；满额后，要加入新技能，就得淘汰一项，并说明替换理由。

这个上限让程序记忆成为取舍问题。指令容易越积越多；难的是判断哪些教训仍适用、哪些互相重叠、哪些已被更好的做法取代。

内置技能可能影响许多用户，因此审查更严。Perplexity 描述的流程包括清除敏感信息后的证据、留作评估的模拟失败情境、原版与修订版的比较、以往成功的任务，以及内部人工审核。

进入人工审核前，候选版本须通过所有失败情境，在至少一个原版失败的情境中改善，同时保持对照任务的表现。这些对照任务，是旧做法原本就能完成的工作。

还是寄包裹的例子：新清单要能抓住以前漏掉的错址，也不能耽误原本寄对的包裹。检验既看修复了什么，也看有没有破坏本来顺利的工作。

## Perplexity 测到了什么

Perplexity 还报告了一项为期八周的随机实验。自动改进个人技能后，Computer 全部活动中的工具调用失败率降低了 11%；排除后台运行后，降幅约为 7%。工具调用，就是智能体要求软件执行一个动作。

Perplexity 同时报告，测得的用户不满程度下降了 7.6%。成本和响应时间则没有可测得的变化。

这些指标衡量的是不同环节。软件动作失败可能打断任务；不满程度反映提供方所测得的用户感受；成本和速度又是另外的实际后果。分开看，才能知道实验测到了哪些改善，以及哪些指标在其测量能力内保持稳定。

另一项范围较窄的 SkillLearnBench 评估，测试可复用技能的学习效果。九类任务中的 16 组配对实例显示：没有生成技能时，报告的任务成功率为 43.8%；提供技能后升至 62.5%。

在这个小型测试里，结果值得关注。但软件基准测试只覆盖特定条件下的特定任务。职场里的帮助程度，还取决于最终成果质量、人的监督时间，以及出错之后如何收拾。

两项评估均由 Perplexity 自行运行。已审阅的证据中没有独立复现；产品文章也只部分披露任务构成、评估提示、判分方式和统计不确定性。结果能否迁移到其他智能体系统，仍是未知数。

这些结果支持继续研究可复用指令能否提升智能体表现。它们的实际适用范围，还需要更广泛、独立审视的使用经验来厘清。

## 成功与许可是两种判断

一套做法即使交出了成果，也可能有严重缺陷：依赖脆弱捷径、耗费过多资源，或越过审批边界。

设想一个例子：智能体受托准备一份供人审阅的文件。文件准确无误，它却又擅自发布，而发布本应先获批准。成果质量和越权发布都是事实；把整段经历当作成功程序保存，会把越权一并保存。

Honest Agent 的公开协议在这里提供了有用的区分：一是任务是否针对正确对象完成；二是每一项需要批准的操作，是否在执行前获得了针对该对象的批准。两项判断彼此独立。证据不足时，协议允许标记为 `unknown`。

因此，协议的结果类别区分合规成功、伴随违规的成功、虚假的成功宣称，以及其他结果。拟议研究将比较两种判断依据：只看智能体报告，或同时查看报告和行动记录。这仍是一份次级研究的协议草案；此处借用的是它的设计原则。

这一原则改变了可复用技能所需的证据。智能体的总结可能声称工作完成；可重放的行动记录则能显示它碰了哪些资源、哪些步骤失败、如何恢复，以及哪些地方需要批准。

总结提出主张，记录让审查者有办法核实。

## 一套做法何时值得留下

问题至此更清楚了：一次成功，何时值得获得长期影响未来工作的资格？

合理的起点，是先把它当作待检验的教训。固定现有做法作为基线，让旧版与候选版在同样的任务上比较。既纳入促成修改的失败案例，也纳入过去已成功的任务，取舍才看得见。

成果质量、总成本、人工介入时间、故障恢复和边界遵守，都应分别判断。太早合成一个分数，会掩盖看似改进的原因：完成率提高，可能伴随更多监督；速度变快，可能牺牲恢复能力。

若重放发现脆弱捷径、成果退步或越权操作，候选方案就应被否决。证据还太薄时，可以继续评估。只有反复、可检查的结果显示确有改善，并守住必要边界，才有理由启用。

启用也应可逆。版本记录说明改了什么；回滚路径让实际使用暴露问题时能够恢复旧版；退役标准则帮助清除假设过时或已被更好方案取代的技能。

核验的力度应与影响范围相称。个人指令影响较小；很多人共用的内置指令，在启用前需要更广的证据。

对 RobinOS 而言，这样的重放比较仍只是一个有边界的实验提议，结果未知。Perplexity 报告的收益给出了调查理由；Honest Agent 的区分则帮助定义调查该测量什么。

持久记忆会让昨天的经历影响明天的决定。一套做法只有在重放显示净改善，同时保住安全、证据质量和撤回或退役的能力时，才值得拥有这种影响力。

资料来源：

- Perplexity，[*Self-improving skills*](https://www.perplexity.ai/en-GB/hub/blog/self-improving-skills)，2026 年 11 月 18 日。
- Honest Agent，[公开协议](https://github.com/Robin84Bran/honest-agent/blob/main/v0.3/PROTOCOL.md)，次级研究协议草案。
