---
title: "机器人只有109分钟可失去"
storySlug: "the-robot-has-109-minutes-to-lose"
date: "2026-10-20"
updated: "2026-10-20"
lane: "BUILD"
excerpt: "90/9电池循环在理想运行上限与20小时工作目标之间留下约109分钟。整班系统必须在这段余量里证明自己。"
hero: "/binary-stories/the-robot-has-109-minutes-to-lose/hero.webp"
ogImage: "/binary-stories/the-robot-has-109-minutes-to-lose/og.webp"
keywords: ["Digit 5", "机器人正常运行时间", "快速充电", "班次运营"]
canonical: "https://iamrobin.ai/binary/stories/the-robot-has-109-minutes-to-lose/zh-hans/"
inLanguage: "zh-Hans"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202610/20261020/special/"
sourceArtifactSha256: "996dc33d47da5b4c7e54d570518e0ed52b7500812657aae2ee4fab4aa424a4f4"
carouselPdf: "/carousels/the-robot-has-109-minutes-to-lose.pdf"
carouselCaption: "/carousels/the-robot-has-109-minutes-to-lose.txt"
carouselPages: 7
draft: false
---

九分钟，听上去像一个充电故事。

其实，它只是一个24小时运营故事的第一句。

Agility Robotics表示，Digit 5将运行90分钟、充电九分钟，并在一天内完成超过20小时的生产性工作。电池算术给出了一道格外清楚的检验：按照理想的90/9节奏，机器人每天最多可运行约 **21小时49分钟**。如果把20小时当作目标下限，两者之间会出现一个很小的空间。

它只有 **109分钟**。

所有电池时钟没有计算的损失，都要挤进这里。

## 规格结束，班次才开始

理想的一天里，充电占2小时11分钟。20小时生产性工作意味着还有四小时没有产出。扣掉理想充电时间，剩余1小时49分钟必须容纳系统的其他部分：

- 前往与离开充电器；
- 对位与停靠；
- 排队或电池过热；
- 路径受阻与任务断供；
- 计划维护、故障与恢复；
- 人工干预；以及
- 被客户拒收或要求重做的任务。

![24小时班次被拆成20小时生产性工作下限、理想充电时间，以及容纳其他全部损失的109分钟余量。](/binary-stories/the-robot-has-109-minutes-to-lose/hero.webp)

这109分钟不是实测停机时间。它是在20小时下限上推导出来的预算，而且假设好得足以让电子表格脸红：机器人永远准备就绪，充电器永远空着，任务永远排在面前，停靠不花时间。

现实拿到同一份预算，却没有这些好意。

## 车队一起花掉这份预算

一台机器人在理想状态下占用充电器时钟的9.1%。如果到达时间完美错开，五台消耗一台充电器45.5%的容量，十台消耗90.9%，十一台消耗100%。这还没给停靠、波动或故障留出一分钟。

这不是推荐的机器人与充电器配比。Agility也没有公布Digit 5的客户配比。它的价值在于划出边界，并改变“快速充电”的含义。更快的电池也许能少配一台备用机器人，但整支车队可能通过一条共享队列，把省下来的时间悄悄还回去。

设计单位不再只是机器人，而是同一班次里的机器人、充电器、路线、任务队列与恢复流程。

## 动作不能替客户签收

Agility表示，早期版本的Digit在GXO搬运了超过10万个料箱。这个累计数量是真实披露，但它无法填满109分钟的账，因为公开里程碑没有同时给出计划工时、充电时间、干预次数或被拒收的任务。

最干净的分母是 **每个计划小时的验收任务数**。再把生产性自主运行分钟放在旁边。前者衡量客户收到什么，后者说明整个班次去了哪里。

这组指标不会让动作优美的机器人为一条空传送带、一次重复搬运或一条充电队列领功，也不会把仓库的每次延误都怪到机器人头上。账本可以把它们分开。

Agility自己的部署流程已经指向这个方向：在扩大班次或工作流之前，用90天运营试点测量正常运行时间、吞吐量与可靠性。不过，Digit 5仍处于开发阶段，Agility也把相关规格称为基于内部测试与预生产配置的初步估计。90/9系统与20小时结果目前是目标，不是已经公开的完整客户班次记录。

所以，快速充电确实完成了一件有价值但范围更窄的事：它没有完成商业论证，而是给运营买来了一小份损失预算。

接下来最值得看的数字不是九。

而是客户能保住多少个109分钟。

[1]: https://www.agilityrobotics.com/content/agility-robotics-selects-nyobolt-as-its-ultra-fast-charging-battery-technology-partner-for-digit-5
[2]: https://www.sec.gov/Archives/edgar/data/2074973/000121390026107265/ea0307857-425_churchill11.htm
[3]: https://www.agilityrobotics.com/faq
[4]: https://www.agilityrobotics.com/content/digit-moves-over-100k-totes
[5]: https://www.agilityrobotics.com/solutions/digit-5

来源：Agility Robotics的[电池公告][1]、[SEC备案的投资者日文字稿][2]、Agility的[部署常见问题][3]、[10万个料箱里程碑][4]与[Digit 5产品页][5]。文中的时间预算由公开目标推导，是说明性计算，不是实测部署结果或设施建议。
