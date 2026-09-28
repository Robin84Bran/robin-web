---
title: "稳住瓶子的那只手"
storySlug: "the-hand-that-holds-still"
date: "2026-09-28"
updated: "2026-09-28"
lane: "BUILD"
excerpt: "拧瓶盖时，最不显眼的动作，可能恰恰是整件事能成功的前提。"
hero: "/binary-stories/the-hand-that-holds-still/hero.webp"
ogImage: "/binary-stories/the-hand-that-holds-still/og.webp"
keywords: ["bimanual robotics", "coordination", "role ablation", "ACT", "VoxAct-B"]
canonical: "https://iamrobin.ai/binary/stories/the-hand-that-holds-still/zh-hans/"
inLanguage: "zh-Hans"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202609/20260928/special/"
sourceArtifactSha256: "a414832afffcf82d4ad09ba89bcbc4b1a330d155cc92f447f9fd2f31b0d5324c"
carouselPdf: "/carousels/the-hand-that-holds-still.pdf"
carouselCaption: "/carousels/the-hand-that-holds-still.txt"
carouselPages: 7
---

看一个人拧紧得发涩的瓶盖。拧盖子的手负责动作戏，另一只手扶着瓶身，仿佛没干多少活。

让第二只手松开，剧情就变了。瓶身可能跟着盖子一起转。动静不小，瓶子却没打开。

在这件事里，有用的工作也包括阻止不该动的东西移动。对于想让多个智能体协作的人，一个瓶子就是很好的小谜题。

## 给安静的那只手一份工作

发表于 CoRL 2024 的 [VoxAct-B][1] 明确区分了执行动作与保持稳定的机械臂。作者用两只机械臂演示了开瓶和开抽屉。方法中还包含语言、视觉语言模型和场景的体素表示。这些细节很重要：论文测试的是一整套方法，不能据此把改进单独归功于角色划分。

协调也有另一条合理的路。RSS 2023 的 [ACT][2] 根据观测预测连续的一段动作。共同控制双臂的策略可以一起学习两只手的关系，并不等于两个各自为政的脑袋抢一个瓶子。公平比较不能先让基线忘掉自己的搭档，再夸另一方会合作。

所以，值得问的问题比“结构能否战胜规模”小得多：当联合策略已经看到同样的场景，明确的角色信息还有没有帮助？

## 一个可能让设计者失望的测试

[9 月 28 日的 Daily Special][3] 提出了这样的比较。实验尚未执行。

设想同一个学习器的三个版本。A 联合控制双臂。B 加入信息，标明哪只手负责稳定、哪只手负责动作。C 保留 B 新增的模块，但在训练和评估时，都把有意义的角色输入换成同一个固定标记。

C 是演示现场那个不太讨喜的来宾。如果 B 看起来很厉害，C 却同样出色，功劳就还不能算在角色标签头上。改进可能来自新增模块的其他部分。如果 A 与 B 相当，那么在这个任务和预算下，明确角色也可能没有必要。

演示数据、观测、评估场景和总资源上限都要对齐。分配角色的计算也要计入预算。否则，所谓“更会协调”，可能只是某一方多拿了信息或算力。

失败的尝试也要留下。有人出手救场后才拧开的瓶子，属于辅助完成。成功案例再快，也不能让超时案例消失。完成率、禁止的碰撞和人工干预应当并列展示，让不方便的代价仍然看得见。

## 谁来稳住瓶身？

瓶子提出的是一个设计问题，并非 AI 团队的通用配方。软件流程中的类似角色，可能是在另一个组件修改草稿时，保留一份已核验的输入。但这样的安排是否有效，需要自己的对照实验；机器人结果不能代替证明。

这个问题倒是很适合带走：**为了让眼前的动作成功，什么必须保持稳定？**

在增加一个忙碌的参与者之前，先说清这份责任，再测试说清它是否真的改变结果。安静的那只手不该被忽略，也不该自动获奖。它需要一个能看见“松手以后会怎样”的测试。

[1]: https://voxact-b.github.io/
[2]: https://tonyzhaozh.github.io/aloha/
[3]: https://iamrobin.ai/ouroboros/202609/20260928/special/
