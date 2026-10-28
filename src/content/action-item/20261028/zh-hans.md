---
title: "最慢的一步决定智能体"
date: 2026-10-28
updated: 2026-10-28
section: Ouroboros
series: Daily Action Item
categories:
  - 人工智能
  - 系统工程
  - 生产力
tags:
  - AI 智能体
  - 延迟
  - 可靠性
  - 评估
keywords:
  - 智能体延迟瀑布
  - 验收任务
  - AI 智能体可靠性
  - 人工介入
  - 每个验收结果成本
excerpt: "模型很快，智能体仍可能很慢。用户的时钟还包括工具、数据、审核、重试与恢复。"
hero: /action-item/20261028/hero.webp
ogImage: /action-item/20261028/og.webp
canonical: "https://iamrobin.ai/ouroboros/202610/20261028/action_item/zh-hans/"
author: https://iamrobin.ai/#person
inLanguage: zh-Hans
languageSlug: zh-hans
translationOf: "https://iamrobin.ai/ouroboros/202610/20261028/action_item/"
translationReview: PASS
draft: false
sourceAction: "Daily Briefing 2026-10-28, item 5"
ledgerId: AGENT-LATENCY-20261028
visualHeadline: "最慢的一步决定智能体。"
visualSubhead: "模型 · 工具 · 数据 · 人工 · 恢复"
visualFooter: "衡量真正验收的任务"
visualNodes: "模型|工具|数据|人工|恢复"
thesis: "智能体生产力应从请求被接受量到结果被接受，因为最慢、最不可靠的工作流环节可以主导用户体验。"
---

智能体四秒就回答了，任务却用了十一分钟。

没有发生什么戏剧性事故。模型做出合理计划，调用浏览器，等待网页，再让工具取数；随后发现会话过期，于是重试，最后停下来等人确认结果是否真的正确。每个部件单看都够快，整项工作却不快。

这正是今天追逐更快模型与基础设施时容易忽略的陷阱：我们测了短跑选手，却没有测接力赛。

10 月 26 日，OpenAI 在 ChatGPT Work、Codex 与 API 中发布 [GPT-6.1 Terra](https://openai.com/index/introducing-gpt-6-1-terra/)。标准 API 价格为每百万输入 token 1 美元、缓存输入 0.05 美元、输出 5 美元。OpenAI 也公布了视觉、电脑使用、编码与事实性评测的提升。这些变化可能让许多工作流更便宜、更有能力。

一天后，NVIDIA 与 Oracle 描述了另一个瓶颈。[Vera Rubin 公告](https://nvidianews.nvidia.com/news/nvidia-and-oracle-expand-nvidia-vera-rubin-to-multi-gigawatt-scale-and-bring-nvidia-vera-cpu-to-oracle-cloud-infrastructure)指出，模型调用之间的工具执行、代码与数据检索，可能让昂贵的加速器等待。Cerebras 与 Oracle 则宣布计划在 2027 年于 OCI 提供[快速推理](https://cerebras.gcs-web.com/news-releases/news-release-details/cerebras-and-oracle-team-bring-cerebras-ai-inference-oracle)。T-Mobile 也介绍了与 Figure、Serve Robotics、AWS 及公共部门伙伴进行的[边缘 Physical AI 评估](https://www.t-mobile.com/news/network/physical-ai-is-leaving-the-lab)。

这些进展改进了机器的不同部位，但它们都没有提供同一种证据：真实用户等待一项任务通过验收，究竟要多久。

## 用户的时钟有五根指针

模型延迟最容易看见。提示进去，token 出来；在交互循环里，这当然重要。但模型停止输出后，智能体的时钟仍在走。

一张有用的任务级延迟瀑布，至少应有五根柱：

```text
请求 ── 模型 ── 工具 ── 数据 ── 人工 ── 恢复 ── 验收结果
          8秒      41秒      6秒      95秒      0秒
```

这些数字只是示意，不是生产测量；重点在形状。如果人工审核用了 95 秒，把模型从八秒缩到四秒，用户几乎感受不到变化。一次浏览器交接失败若触发三分钟恢复，再快的推理引擎也会沦为背景噪声。

第一根柱是**模型工作**：规划、生成、视觉推理与重复调用。第二根是**工具工作**：浏览器、API、文件操作、代码执行与权限边界。第三根是**数据工作**：检索、解析、同步，以及等待权威状态。第四根是**人工工作**：澄清、批准与事实验收。第五根是**恢复**：重试、重新认证、重建上下文，以及局部失败后重复已经完成的工作。

最慢的一根柱不只增加等待。它往往也是系统丢失上下文、花两次钱，或让人类去抢救本应由智能体负责的行动之处。

## 更快的层会移动瓶颈

假设 Terra 把某段模型成本减半，这很有价值；它也可能让我们发现，真正主导工作流的是一个缓慢网站或设计不良的批准边界。假设 Cerebras 通过 OCI 提供更快推理，等待可能移到数据检索。假设 Vera CPU 加快模型调用之间的工作，新瓶颈也许变成无法迅速看懂证据变化的审核者。

这不是反对更快的模型、CPU、网络或推理系统，而是要求衡量用户真正购买的单位。

用户买的不是每秒 token。她买的是对账完成的发票、经过核实的简报、解决的客服问题、安全完成的机器人交接，或通过验收测试的代码。部件基准证明的是部件，不是完整结果。

边缘机器人把这种差别变得更具体。把计算移近机器人，可能降低网络延迟，改变重量、散热与电池约束；也可能引入交接失败、断网状态与新的恢复行为。T-Mobile 的公告描述了真实评估，却没有披露生产 P99 延迟、介入减少量或商业条款。工程问题不只是边缘是否更快，而是机器人能否以可接受成本、更少救援，安全完成更多有用工作。

## 改系统之前先重放一项任务

最干净的实验很小。

选择一个只读工作流，冻结输入，并写下清楚的验收规则。研究简报可以要求八条有来源的信号、四个语言版本和全部发布检查通过；客服工作流可以要求正确分类、有引用的回答，以及没有越权行动。

记录六个边界的时间：

1. 请求被接受；
2. 模型工作完成；
3. 工具完成；
4. 权威数据到达；
5. 人工审核完成；
6. 结果通过验收。

再记录单纯时长隐藏的事件：重试、恢复、人工分钟、成本、被拒草稿，以及任务最终是否通过。用同一输入跑几次；一次只改一层，再重放。

决策指标不是“回复更快”，而是**每个验收结果的成本与总时长**，旁边同时放上人工介入次数。便宜但需要两次救援的运行，可能不如贵一点却能正确完成的运行。很快但不通过验收，不是一次快速成功。

这样也能让基础设施故事保持诚实。正式可用不等于实际利用；2027 年计划不等于已交付容量；厂商评测不等于另一个工作流中的结果。它们都可以成为测试理由，却不应仅凭标题获得生产权限。

## 优化最高的那根柱

瀑布一旦可见，下一步会变得出奇朴素。

工具时间最高，就修工具契约或删掉一次往返；数据时间最高，就改进权威路径，只缓存允许过期的内容；人工时间最高，就让证据更容易快速判断，而不是试图隐藏审核者；恢复时间最高，就保留可续跑状态，不要重复已完成工作；如果模型真是最高的柱，更快或更便宜的模型才终于有了清楚目标。

目标不是零延迟。有些等待保护质量、隐私或权限。目标是知道哪些等待创造价值，哪些等待只暴露了断裂的交接。

智能体真正有用，是因为它能把任务走完整段路：从请求到证据，穿过工具与不确定性，最后交付一个别人能够接受的结果。栈里最快的模型会帮忙，但用户体验仍由最慢的一步决定。

## 说明与来源

- 开头时间与瀑布数字均为示意，并非 RobinOS 生产测量。
- OpenAI 的价格与评测结果来自厂商发布，不能证明 RobinOS 的验收率、任务时长或每个验收结果成本。参见[产品公告](https://openai.com/index/introducing-gpt-6-1-terra/)与[模型发布说明](https://help.openai.com/en/articles/9624314-model-release-notes)。
- NVIDIA/Oracle、Cerebras/Oracle 与 T-Mobile 的来源描述可用性、计划或评估，没有提供共享的端到端智能体基准，也未披露本文提到的经济数据。
- 建议的重放为只读，不授权更换生产模型。[NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)是更广泛的风险管理参考，并不为本文的五柱框架背书。
