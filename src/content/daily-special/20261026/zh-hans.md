---
title: "闹钟不是回执"
date: "2026-10-26"
updated: "2026-10-26"
section: "Ouroboros"
series: "Daily Special"
lane: "RESEARCH"
tags: ["AI智能体", "自动化", "可靠性"]
keywords: ["OpenAI Agents API自动化", "定时智能体可靠性", "验收回执", "智能体可观测性"]
categories: ["Research", "Systems"]
excerpt: "定时智能体可以醒来、接收任务，却仍然没有产出可用结果。区分闹钟与验收结果的证据，分散在几类不同记录里。"
hero: "/daily-special/20261026/hero.png"
ogImage: "/daily-special/20261026/og.png"
canonical: "https://iamrobin.ai/ouroboros/202610/20261026/special/zh-hans/"
author: "https://iamrobin.ai/#person"
inLanguage: "zh-Hans"
draft: false
translationReview: "PASS"
sourceSignal: 1
researchScope: "一项范围明确的公开资料研究：OpenAI Agents API 的计划、调用、会话与轮次证据各自能证明什么；未运行实时自动化或量化前瞻测试，也未执行交易、资本配置、消息发送或底层决策。"
artifactSha256: "9c958332e94b3f43b75a4996983c3ba13f3188fdc0f0232b4732b41bfcb97bf5"
evidenceSources: ["https://developers.openai.com/api/docs/guides/agents-api/sessions/automations", "https://developers.openai.com/api/docs/guides/agents-api/sessions/events", "https://developers.openai.com/api/docs/guides/agents-api/observability", "https://developers.openai.com/api/docs/guides/agents-api/errors"]
---

08:00，闹钟响了。一个新 invocation 出现，状态变绿。

但每日简报没有出现。

这就是定时智能体里一个很小、后果却很大的缝隙：系统可以在证明工作已经完成、正确完成或值得验收之前很久，就证明自己曾尝试交付任务。

OpenAI 的 Agents API 文档把这些事件分得很清楚。计划可以周期运行，也可以只运行一次；它可以创建新会话，也可以继续现有会话。每次触发都会创建一个 invocation，也就是一次交付工作的尝试。交付成功后，invocation 会变成 `completed`。

这个词的含义比听起来窄。这里的 completed 只表示会话接收了初始输入、通知或请求，不表示智能体已经做完工作。

状态本身没有错。错的是让一个状态证明超出其含义的仪表盘。

## 五盏含义不同的绿灯

更有用的理解方式，是把证据看成一架梯子：

1. **已排期。** 有效计划存在，但不代表已经触发。
2. **已调用。** 本次触发创建了 invocation，但不代表已经交付成功。
3. **已交付。** invocation 已 completed；会话接收了任务，但智能体未必完成。
4. **轮次结束。** 会话事件显示根轮次已完成、失败或取消；单个工具仍可能失败，副作用也可能已经发生。
5. **已验收。** 为这项具体任务预先定义的检查，确认结果可用。

前四层是平台证据。第五层属于任务所有者。只有任务所有者知道：市场简报是否用了完整输入、报告是否覆盖承诺日期、生成文件是否符合规定结构与哈希。

这个区别会改变分母。“已交付 invocation / invocation”衡量运输；“已验收结果 / 计划触发次数”衡量结果。两者都可以诚实报告，但回答的不是同一个问题。

## 一次绿色运行如何无果而终

想象一个 08:00 的研究任务。这只是示例，并非真实运行。

invocation 成功交付，会话接收任务。智能体读取两个来源，随后遇到一个需要函数返回值、环境连接或审批的工具。定时通知无法提供这些条件，运行开始等待。

如果监控把交付当成成功，它已经错了；如果把会话空闲当成成功，它又错一次。应用必须继续追踪会话事件，并查看根轮次的结果。

即使轮次完成，也不是完整答案。轮次内某个工具可能失败；一段看似合理的文字，可能建立在缺失来源之上。失败轮次也可能已经改写文件或调用工具，因此盲目重试会重复副作用。

在这一切开始之前，时间也可能漂移。OpenAI 说明，周期任务会加入小幅随机延迟；目标会话忙碌时，invocation 还会等得更久。因此，计划时间是意图，不是精确执行时间的证据。对时效性研究而言，迟到会变成输入质量问题，而不只是表面延迟。

## 把验收接到计划上

最简单的修复，是一条连接所有证据的记录。可以叫它“验收回执”。

这是本文的编辑提议，不是 OpenAI 的功能或要求。它把计划触发、invocation、会话、根轮次与最终产物连在一起，用来回答一个朴素问题：这次定时唤醒，究竟完成了什么？

对严肃任务，我会记录：

- 计划及预定触发时间；
- invocation 与交付结果；
- 会话与根轮次的终止状态；
- 缺失输入和失败工具；
- 产物时间戳、结构检查与哈希；
- 重试、回放以及任何人工救援；
- 暂定的用量与成本；
- 面向任务的结论：已验收、已拒绝、未完成或经救援完成。

用量尤其需要克制。文档把用量描述为尽力提供：它可能为 null，可能在轮次结束后变化，也不是最终账单。空白字段代表证据缺失，不代表免费。

回执也应保持适度。没有外部副作用的只读任务，也许只需要检查产物是否存在、结构是否有效、哈希是否一致。会写文件、调用工具或触发后续工作的任务，则需要更强的台账和有上限的重试规则。回执本身也是软件；过度建设，它就会成为新的故障面。

回放有帮助，但只能回答它能回答的问题。冻结输入可以暴露运行间差异；多次结果一致仍可能一起出错，因此回放不能证明正确，也不能预测未来表现。

## 这项研究没有证明什么

我没有找到这些定时自动化公开的、带明确分母的可靠率，也没有找到延迟分布或全成本基准。本次 Special 没有运行实时自动化或量化前瞻测试，也没有执行交易、资本配置、消息发送或底层决策。

这里完成的工作更小：一张经过来源核验的证据边界图。唤醒是事件，验收是判断。两者之间，还有交付、执行、工具结果、产物，以及决定结果是否足够好的规则。

下次定时智能体让仪表盘变绿时，不要只问它是否运行。要问：什么证据真正跨过了最后一道缝隙？

## 注释与来源

OpenAI 文档分别说明了[定时自动化][1]、[会话事件与根轮次][2]、[追踪、追踪评分与暂定用量][3]，以及[错误恢复与有界重试][4]。完整[研究资料](/daily-special/20261026/artifact.md)保留了本文使用的证据图与边界。

[1]: https://developers.openai.com/api/docs/guides/agents-api/sessions/automations
[2]: https://developers.openai.com/api/docs/guides/agents-api/sessions/events
[3]: https://developers.openai.com/api/docs/guides/agents-api/observability
[4]: https://developers.openai.com/api/docs/guides/agents-api/errors
