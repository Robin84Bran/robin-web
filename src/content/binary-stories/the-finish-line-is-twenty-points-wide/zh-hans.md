---
title: "终点线有二十个百分点宽"
storySlug: "the-finish-line-is-twenty-points-wide"
date: "2026-11-02"
updated: "2026-11-02"
lane: "BUILD"
excerpt: "机器人可以估计某一步已经完成 80–100%。真正的工程问题从这个区间的尽头开始：谁来签发验收回执？"
hero: "/binary-stories/the-finish-line-is-twenty-points-wide/hero.webp"
ogImage: "/binary-stories/the-finish-line-is-twenty-points-wide/og.webp"
keywords: ["机器人进度分类", "终态验收", "Gemini Robotics ER 2", "选择性重试"]
canonical: "https://iamrobin.ai/binary/stories/the-finish-line-is-twenty-points-wide/zh-hans/"
inLanguage: "zh-Hans"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202611/20261102/special/"
sourceArtifactSha256: "958acbfb9fa39153eedf09fbd783542e3109f58c42344cafed9f77818e95fd94"
carouselPdf: "/carousels/the-finish-line-is-twenty-points-wide.pdf"
carouselCaption: "/carousels/the-finish-line-is-twenty-points-wide.txt"
carouselPages: 7
draft: false
---

终点线有二十个百分点宽。

这不是比喻。Google 关于 Gemini Robotics Embodied Reasoning 2 的文档把进度分为五档：完成 0–20%、20–40%、40–60%、60–80% 和 80–100%。

最高一档同时容纳了两种对工作系统意义完全不同的状态：接近完成，以及确实完成。

想象一个无害的桌面任务：十件物品最终都要放进标记区域。正确放好八件，与十件全部放好，都可能落入 80–100% 这一档。这只是用于解释的例子，并非已经执行或报告的实验。它揭示了一条设计边界：进度估计可以指导下一步动作，却不等于任务已获验收的回执。

## 有用的估计不等于终态

进度当然有价值。系统若能观察工作结果，而不是发出命令后盲目前进，就在“行动”和“继续”之间多了一个重要动词：**检查**。

Google 表示，ER 2 可以通过视频识别关键时刻并分类任务进度。机器人因此可以调整动作，或只重试失败步骤，而不必重新开始整套流程。这是实质性的编排改进。如果第四步失败，未必需要重做前三步。

但是，“重试第四步”和“宣布任务完成”是两个不同决定。

前者可以把模型估计作为控制信号。后者则需要与物理终态绑定的验收规则：物品是否都在标记区域内、门闩是否闭合、测量值是否在容差内，或是否由人明确签收。

![五档进度形成模型估计，另一个独立的外部关口才签发终态验收回执。](/binary-stories/the-finish-line-is-twenty-points-wide/hero.webp)

清晰的架构会保留两种信号：

1. 模型估计进度；
2. 控制器选择继续、重试、暂停或升级；
3. 外部检查对预先定义的终态进行判断；
4. 只有这项检查才能记录“验收完成”。

外部检查不一定复杂。它可以是确定性的传感器阈值、针对单一任务设计的视觉规则、工装夹具、类似校验和的数量核对，或人工签收。关键是：完成回执必须独立于模型的宽泛进度区间来定义。

## 两组基准回答两个问题

Google 报告五档进度分类的准确率为 **57.4%**；同时报告关键时刻识别准确率为 **91.3%**，平均绝对时间距离为 **0.96 秒**。

这些结果必须分开，因为它们回答的问题不同。

关键时刻识别是在视频中定位某个事件何时发生，例如杯子何时装满。进度分类则判断任务大致完成到哪个区间。两组数字都不是客户现场、一个班次，甚至上面假设桌面任务的验收完成率。

57.4% 尤其有用，因为它让能力保持现实，而不是被写成魔法。进度分类器可能出错：重复已经成功的步骤、跳过尚未完成的步骤，或在错误时点求助。即使分类本身正确，宽达二十个百分点的最后一档仍然包含歧义。

Google 的安全评估进一步说明了这种差别。在长时序置信度测试中，智能体往往会按要求请求置信度评估，但未必能可靠生成完成任务所需的全部重规划子步骤。请求置信度信号，不等于成功恢复工作流。报告也明确表示，它没有评估合规物理部署所需的认证硬件、冗余和实时保证。

模型卡还要求用户在生产、商业及公共环境中谨慎使用，并禁止把 Robotics Models 用于一旦故障可能导致死亡、伤害或财产损失的安全关键工作。

## 重试改变成本结构

尽管如此，选择性重试仍可能是很强的系统积木。

全量重启策略会再次支付之前每个动作的成本，即使这些动作已经通过验收。局部重试策略只在不确定步骤附近追加推理与动作。在长流程里，它可能减少重复工作。

但它也可能只是增加尝试次数，而没有改善结果。

因此，重试应被核算，而不是单独庆祝。正确的分母是已验收产出，而不是已发出命令。一个系统可以变得更忙，却没有变得更有效。

一项边界清楚的对照测试，可以冻结相同的无害任务与验收标准，再比较两种策略：

- 检测失败后重启整段流程；
- 只重试受影响步骤，并使用相同的升级次数上限。

两边都应记录验收完成、误判完成、重试次数、人工接管、耗时，以及每项已验收任务的推理与操作员成本。终态检查必须完全相同。

这里**没有**执行这项对照。因此结果仍然未知。客户现场的已验收产出、非计划重试率、人工接管率、每项已验收任务的耗时与完整成本，同样未知。

## 把回执放在估计之外

结果感知机器人最强的版本，并不是一个更有信心说“完成”的模型。

而是一个知道“完成”需要什么证据的系统。

进度分类可以决定接下来查看哪里、尝试什么。关键时刻识别可以定位状态切换。选择性重试可以避免重放整段流程。它们都很有用。

但它们都不应悄悄继承认证终态的权限。

在模型内部，终点线可以有二十个百分点宽。在物理工作流里，验收仍应是一条线。

[1]: https://cloud.google.com/blog/products/ai-machine-learning/gemini-robotics-embodied-reasoning-2-is-now-available-on-google-cloud
[2]: https://blog.google/innovation-and-ai/models-and-research/google-deepmind/gemini-robotics-er-2/
[3]: https://ai.google.dev/gemini-api/docs/robotics-overview
[4]: https://ai.google.dev/gemini-api/docs/robotics-video-progress
[5]: https://storage.googleapis.com/deepmind-media/gemini-robotics/Gemini-Robotics-2-Safety.pdf
[6]: https://deepmind.google/models/model-cards/gemini-robotics-er-2/

来源：Google Cloud 的[公开预览公告][1]、Google 的 [ER 2 发布文章][2]、Gemini API 的[机器人概览][3]和[视频进度指南][4]、Google DeepMind 的[安全评估][5]与[模型卡][6]，以及经哈希绑定的[源 Daily Special](https://iamrobin.ai/ouroboros/202611/20261102/special/)。六项一手来源均于 2026 年 11 月 2 日重新读取。模型与基准数字来自 Google 和 Google DeepMind；本次边界研究没有进行独立复现。本文讨论系统设计，并不构成已完成物理试验或安全认证的证据。
