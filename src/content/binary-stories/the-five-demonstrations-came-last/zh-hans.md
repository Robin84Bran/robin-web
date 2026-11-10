---
title: "五次示范，是最后一步"
storySlug: "the-five-demonstrations-came-last"
date: "2026-11-10"
updated: "2026-11-10"
lane: "BUILD"
excerpt: "GR00T 2 在五次目标机器人示范后达到 95% 平均成功率，但这几分钟之前，是 436,414 小时的已报告经验；而基准任务也经过了五次示范可学性的筛选。"
hero: "/binary-stories/the-five-demonstrations-came-last/hero.webp"
ogImage: "/binary-stories/the-five-demonstrations-came-last/og.webp"
keywords: ["GR00T 2", "机器人适应", "小样本学习", "Dexter-50"]
canonical: "https://iamrobin.ai/binary/stories/the-five-demonstrations-came-last/zh-hans/"
inLanguage: "zh-Hans"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202611/20261110/special/"
sourceArtifactSha256: "6f11c0e7e2d9cb750732aa18816f94f8cad7c90b85154360ffcd6a8261129089"
carouselPdf: "/carousels/the-five-demonstrations-came-last.pdf"
carouselCaption: "/carousels/the-five-demonstrations-came-last.txt"
carouselPages: 7
draft: false
---

五次示范，是最后一步。

NVIDIA 报告称，GR00T 2 在每项任务接受五次示范后，于 50 项 Dexter 任务上取得 95% 的平均成功率。目标机器人的这些数据不足三分钟；每项任务的适配器在一张 RTX 5090 上微调约 30 分钟。

听起来，就像机器人在一段咖啡休息时间里学会了一份新工作。

这个结果是真实报告的，但它只是漫长教育的最后一幕。

在 Dexter 看见那五个回合之前，GR00T 2 已经在一套混合数据上预训练。NVIDIA 报告其中包括 402,730 小时的第一人称人类视频、10,184 小时的手持夹爪示范，以及 23,500 小时的机器人遥操作。合计是 436,414 小时的先验经验。

短课并没有凭空创造技能。它教会的是一个已经高度预训练的模型：如何用一双新手，完成它在别处见过的工作。

## 一位走进陌生厨房的老厨师

想象一位经验丰富的厨师走进陌生厨房。五次示范，也许足以让他知道刀放在哪个抽屉、炉灶如何响应、盘子应该归位何处；但五次示范并不足以从头教会烹饪。

Dexter-50 更像这堂厨房入门课。

基准使用一台双臂机器人：两条七自由度机械臂，配两只 22 自由度的手。50 项任务没有出现在 Dexter 自己的训练数据里，却出现在人类视频、另一种平行夹爪机器人的数据，或两者之中。模型带着任务概念来到现场；目标机器人的回合帮助它用 Dexter 的身体把概念做出来。

![人类、手持夹爪与机器人经验汇成长河，最后收窄为五次 Dexter 示范、一个任务专用适配器与一道评估门槛。](/binary-stories/the-five-demonstrations-came-last/hero.webp)

NVIDIA 冻结了预训练权重、文本编码器、视频 VAE，以及动作与状态头；再为每项任务在 Transformer 上训练一个 rank-32 LoRA 适配器，并使用相同超参数。因此，这里的“五次示范”并不是把五段随手拍的视频交给一个万能机器人脑，而是为每项任务采集五个完整的目标机器人遥操作回合，然后分别微调。

在这个设定内，适应幅度仍然非常显著。NVIDIA 报告平均成功率从零样本的 40%，升至一次示范后的 71%，再升至五次后的 95%；50 项任务中有 37 项在所报告的评估中达到 100%。

## 基准选择了“可学会”的任务

标题背后还有一道边界。

白皮书说明，这 50 项任务是模型用五个回合能够学会的任务，也就是五次示范后至少达到 80% 成功率的任务。换句话说，Dexter-50 是从通过“五次可学性”门槛的任务中选出来的。

这不会让 95% 失效，却会改变它所回答的问题。

基准表明：对于一组经过筛选、且能被五个回合教会的跨机器人任务，预训练模型可以实现很强的快速适应。它并不估计任意一项在训练前就独立选定的新任务，有多大概率凭五次示范达到 95%。

论文也没有说明 Dexter-50 的零样本、一次和五次示范柱状结果中，每项任务究竟进行了多少次评估。因此，成功率应该被保留在论文给出的范围内，而不应被读者擅自放大。

## 真正的产品，是先验

小样本机器人学习常被说成“减少数据”。更有用的工程视角是：数据被搬到了别处。

目标机器人只贡献了不足三分钟的任务数据；先验则来自人类、手持接口与其他机器人合计数十万小时的经验。适配器再把这份先验翻译到一个具体的“机器人—任务”组合上。

所以，比“需要几次示范”更好的尽调问题是：计数开始之前，系统已经学会了什么？

- 任务概念是否已经存在于人类或其他机器人的数据中？
- 目标任务是在适应前选定，还是在观察到可学性之后选定？
- 一个适配器服务很多任务，还是每项任务分别训练？
- 报出的时间是否包含设置、遥操作、评估、失败尝试与人工恢复？
- 结果能否在一组事先登记、独立于模型选择的任务上复现？

GR00T 2 的报告之所以有意思，正是因为先验似乎能够迁移：从人类和其他机器收集的知识，帮助一副新身体快速适应。

但那五次示范不是教育本身。

它们只是入职培训。

---

**来源：** NVIDIA GEAR 的 [GR00T 2 项目页](https://research.nvidia.com/labs/gear/gr00t-2/)与 [2026 年 11 月白皮书](https://research.nvidia.com/labs/gear/gr00t-2/assets/gr00t2_whitepaper.pdf)，特别是 Dexter-50 方法与图 24；NVIDIA 公开的 [Isaac-GR00T 仓库](https://github.com/NVIDIA/Isaac-GR00T)；以及经过哈希绑定的[源 Special](https://iamrobin.ai/ouroboros/202611/20261110/special/)。这些是 NVIDIA 报告的结果；截至研究截止时间，尚无对此 GR00T 2 基准的独立复现。本次没有运行机器人实验、模型微调、硬件采购、部署或投资行动。
