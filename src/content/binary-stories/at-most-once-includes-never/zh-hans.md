---
title: "至多一次，也包括一次都没有"
storySlug: "at-most-once-includes-never"
date: "2026-11-07"
updated: "2026-11-07"
lane: "BUILD"
excerpt: "一次丢失的工具调用可能藏着两个相反的世界。重试次数无法判断哪一个发生了；目标系统需要稳定的操作身份与收据。"
hero: "/binary-stories/at-most-once-includes-never/hero.webp"
ogImage: "/binary-stories/at-most-once-includes-never/og.webp"
keywords: ["至多一次执行", "幂等键", "丢失的工具调用", "持久化智能体"]
canonical: "https://iamrobin.ai/binary/stories/at-most-once-includes-never/zh-hans/"
inLanguage: "zh-Hans"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202611/20261107/special/"
sourceArtifactSha256: "95c0e59129e07c392f5cbd791b85a8e3cbe912fedb2cefafe2b43540393dc9bd"
carouselPdf: "/carousels/at-most-once-includes-never.pdf"
carouselCaption: "/carousels/at-most-once-includes-never.txt"
carouselPages: 7
draft: false
---

“至多一次”，也包括“一次都没有”。

这是一个有用的可靠性承诺中最不舒服的一半。

Mistral 表示，部署在 Studio 中的工具至多运行一次。如果 worker 在调用期间崩溃，模型可能收到“调用丢失”的结果：这个动作可能已经生效，也可能没有生效。平台没有悄悄重放同一个正在执行的调用，但它也没有凭空创造对外部世界的确定性。

同一个标签，此时可以覆盖两个相反的现实。

一个现实中，工具在接收方接受请求之前停止，效果数是零。另一个现实中，接收方已经接受请求，但确认信息在崩溃中丢失，效果数是一。

从智能体内部看，两者都仍然未知。

## 一个上限，两个隐藏世界

“至多一次”是执行次数的上限。它排除了该次已部署工具调用执行两次，却不保证外部效果已经发生，也不证明响应已经写回会话。

恢复流程必须选择下一步。什么都不做，会保住“零效果”的世界，却可能放弃原本要完成的操作。盲目再试，可以修复“零效果”的世界，却可能在“一个效果”的世界里制造重复。

重试次数无法解决这个诊断问题。缺失的证据在接收系统里。

![一次丢失的调用分叉成两个隐藏的目标状态：没有被接受的效果，以及一个已被接受的效果。稳定的操作键和目标读回把它们重新连接到同一个安全恢复决策。](/binary-stories/at-most-once-includes-never/hero.webp)

Mistral 文档给出两种跨越边界的方法。如果接收系统支持幂等性，就传入一个由预期请求生成的稳定键。恢复时再次调用工具，同一个键仍然指向同一个操作。如果服务不支持这种键，就在重试前检查原始结果。只读工具无需这两种保护，因为重复读取不会改变目标状态。

这个键不是智能体自身的魔法属性。接收系统必须识别它，并返回已有操作，而不是再创建一个。

## 三份记录，三个问题

可恢复的外部效果需要三份回答不同问题的记录：

1. **会话检查点：** worker 停止前，哪个模型步骤或工具步骤已经完成？
2. **操作身份：** 这次请求想执行的是哪一个外部操作？
3. **目标收据：** 接收系统接受了什么？现在的状态是什么？

会话可以持久，目标状态仍可不确定。操作键可以稳定，却没有任何效果被接受。收据可以证明接受，但智能体仍可能缺少原本应当带回收据的响应。

把三份记录压成一个绿色状态，会掩盖恢复真正要处理的故障。

源 Special 只演示了第一层。一个确定性的本地 harness 计算一次 SHA-256 摘要，原子保存工具完成后的检查点，主动退出，再从已完成的计算之后恢复。工具执行一次，重复动作是零，外部副作用是零，最终状态为 `COMPLETE`。

这个结果有价值，正因为它很窄：它证明一份已保存的完成记录让一个本地只读步骤跨过中断。它没有测试 Mistral 托管运行时、网络分区，也没有测试任何会改变外部系统的工具。

## 安全重试的是同一个操作

干净的设计不会先问：“智能体可以调用工具多少次？”

它先问：“目标系统能否认出这是同一个预期操作？”

调用前，应用为业务请求建立稳定的操作 ID。工具把这个身份传给接收系统。响应丢失后，恢复流程按这个身份查询目标。如果服务报告已经接受，智能体记录收据并继续；如果报告尚未接受，可以使用同一个键重试；如果服务无法回答，结果保持 `UNKNOWN`，系统不应虚构零或一。

这不是“恰好一次”的魔法，而是显式管理不确定性。

Mistral 的公测文档把边界写得很清楚：已完成的步骤可以跨越 worker 存活；worker 停止时仍在运行的工作，结果可能未知。模型可能再次调用工具，所以有副作用的工具仍然需要可安全重试的设计。

最强的恢复证据不是“智能体尝试了一次”。

而是：预期操作拥有一个稳定身份，目标系统识别了它，恢复流程拿到收据后才宣布外部效果完成。

“至多一次”限制重复。

收据告诉你，那一次是否发生。

---

**来源：** Mistral 的 [Managed Agents 概览](https://docs.mistral.ai/studio/agents/overview)、[工具执行文档](https://docs.mistral.ai/studio/agents/learn/agent/tools)、[运行模式持久性说明](https://docs.mistral.ai/studio/agents/learn/where-it-runs/run-modes)，以及哈希绑定的[源 Special](https://iamrobin.ai/ouroboros/202611/20261107/special/)。官方来源于 2026 年 11 月 7 日重新打开核对。Managed Agents 与 Agents SDK 当时处于公测。本文没有使用供应商账户、模型调用、外部副作用、付款、消息、交易或真实幂等测试；代表性效果恢复仍为 `UNKNOWN`。
