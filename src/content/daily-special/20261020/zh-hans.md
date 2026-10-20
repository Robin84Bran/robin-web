---
title: "九分钟充电，证明不了一个班次"
date: "2026-10-20"
updated: "2026-10-20"
section: "Ouroboros"
series: "Daily Special"
lane: "RESEARCH"
tags: ["Physical AI", "Robotics", "Operations"]
keywords: ["Digit 5", "机器人稼动率", "快速充电", "每小时合格任务"]
categories: ["Research", "Physical AI"]
excerpt: "Digit 5 的 90/9 电池目标可推导出 90.9% 的理想运行上限。真正的客户结果，藏在这道上限与合格工作之间。"
hero: "/daily-special/20261020/hero.png"
ogImage: "/daily-special/20261020/og.png"
canonical: "https://iamrobin.ai/ouroboros/202610/20261020/special/zh-hans/"
author: "https://iamrobin.ai/#person"
inLanguage: "zh-Hans"
draft: false
translationReview: "PASS"
sourceSignal: 2
researchScope: "依据公开资料，把 Digit 5 公布的运行90分钟、充电9分钟，换算成仅由电池决定的上限、充电桩队列边界，以及仍待客户完整班次验证的运营账本；没有部署、购买、投资、联络或交易。"
artifactSha256: "996dc33d47da5b4c7e54d570518e0ed52b7500812657aae2ee4fab4aa424a4f4"
evidenceSources: ["https://www.agilityrobotics.com/content/agility-robotics-selects-nyobolt-as-its-ultra-fast-charging-battery-technology-partner-for-digit-5", "https://www.sec.gov/Archives/edgar/data/2074973/000121390026107265/ea0307857-425_churchill11.htm", "https://www.agilityrobotics.com/faq", "https://www.agilityrobotics.com/content/digit-moves-over-100k-totes", "https://www.agilityrobotics.com/solutions/digit-5"]
---

九分钟充电，回答了一个很小、也很重要的问题：机器人要在充电桩上待多久？

工厂问的是更大的问题：一个班次结束时，究竟交付了多少合格工作？

Agility Robotics 说，Digit 5 可运行90分钟、充电9分钟，并争取在24小时内工作超过20小时。[电池合作公告][1]把这次升级描述为从 Digit 4 约2:1的运行充电比，跃升到10:1。看上去，一个小数点已经把整个班次解决了。

电池这道算术确实成立。它同时告诉我们，真正的验证应该从哪里开始。

## 上限是21小时49分钟

一个理想循环包含90分钟运行与9分钟充电。也就是说，在99分钟里，机器人有90分钟可以运行，仅由电池决定的运行占比为 **90.9%**。

把这套完美节奏铺满一天，得到约 **21小时49分钟运行** 与2小时11分钟充电。用同一套理想假设计算，Digit 4 公布的2:1比例只能给出16小时的电池上限。新系统在纸面上多拿回接近六小时。

这是实质性的工程进步。不过，上限所在的世界非常干净：对接不花时间，充电桩永远空着，电池无需散热，机器人不维护、不故障、没有通道阻塞、无需人工干预，而且每一秒都有任务等着它。

Agility 的目标是每天工作超过20小时，也就是超过全天的83.3%。如果先用整整20小时作为下限，它与理想电池上限之间只剩约 **109分钟**。所有非充电损耗都要挤进这段时间：前往充电桩、对位、排队、散热、保养、故障恢复、等待任务，以及返工。

九分钟缩小了一个瓶颈，没有让其他瓶颈消失。相反，它让那些瓶颈更容易被看见。

## 十台机器人，会把充电变成交通问题

在理想循环中，一台机器人每99分钟占用充电桩9分钟，因此消耗充电桩时间的9.1%。

假设到站时间完美错开，五台机器人占45.5%，十台占90.9%，十一台刚好占满100%。此时，对接慢几秒、某台迟到、电池过热或充电桩短暂停机，都没有缓冲。

这只是容量边界，不是 Agility 公布的部署方案。公司尚未披露 Digit 5 客户现场的机器人充电桩配比，也没有公布排队记录。这个小推演仍然有用，因为机器人队伍不会生活在“平均值”里。它们会遇到星期一早上：两台同时到站，其中一台只好等。

快充可以减少备用机器人的需求，也可能把协调风险推到充电通道。没有到站分布和安全余量，“九分钟”就会变成九分钟再加一段队伍。

## 动起来，还需要客户盖章

Agility 披露，上一代 Digit 已在 GXO [搬运超过10万个料箱][4]。这是有意义的累计工作量。可是公开页面没有给出对应的排班小时、人工干预次数、充电停机，也没有说明多少次搬运需要重做。

这些分母决定了数字的用途。通电时间、行走时间与有效工作不是一回事。机器人可以走得很漂亮，仓库却仍在等一只合格料箱。

Agility 自己的[客户部署流程][3]已经指向正确方法：在为期90天的运营试点中，测量稼动率、吞吐量与可靠性，再决定是否扩展班次或流程。我会把这三个词放进同一本班次账：

- 完整排班分钟；
- 最终被客户验收工作的自主生产分钟；
- 充电、对接与排队分钟；
- 阻塞、等待、计划维护、故障与恢复分钟；
- 人工干预次数、时长与原因；
- 不合格或重复任务；
- 同一负载与温度条件下的电池健康状态。

第一个有用分母很朴素：**每排班小时的合格任务数**。旁边再放一项“自主生产分钟／排班分钟”。前者说明客户拿到了什么，后者说明机器人把多少班次真正变成了结果。

## 公告仍然是一项目标

Agility 在[提交给 SEC 的投资者日记录][2]中解释了为何放弃可更换电池：机械结构更复杂，还要加入人或另一台机器，并管理备用电池。这是合理的设计判断。记录使用的时态也很清楚：90/9电池是 Digit 5 将要采用的方案。

Agility 的 [Digit 5 页面][5]写明，产品仍在开发中，规格来自预生产软硬件的内部测试与基准测量，属于初步估计。早期客户使用预计要到2027年上半年。电池公告还把运行时间、充电时间、循环寿命、稼动率与队伍经济性列入前瞻性陈述。

所以，目前证据支持的是一个更窄、也更有用的结论：九分钟快充可能消除 Digit 4 很大一块电池惩罚；公司尚未公布客户完整班次账本，无法把设计目标直接变成每天超过20小时的有效工作、持久循环寿命，或每项合格任务的成本。

这条边界并不令人失望。很多好工程，就是把瓶颈一直往前推，直到下一个瓶颈终于可以被测量。

下一份证据最好“无聊”得很扎实：具名客户、完整班次、正常负载、正常温度、每一次人工干预、每一个不合格任务，以及完整充电队列。90/9若能穿过这本账，小数字才真正配得上大结论。

完整[研究资料](/daily-special/20261020/artifact.md)收录了计算、队伍充电边界、建议班次账本与来源限制。今天完成的是公开资料测量图，没有部署机器人、联络客户、采购设备，也没有改变任何投资决定。

[1]: https://www.agilityrobotics.com/content/agility-robotics-selects-nyobolt-as-its-ultra-fast-charging-battery-technology-partner-for-digit-5
[2]: https://www.sec.gov/Archives/edgar/data/2074973/000121390026107265/ea0307857-425_churchill11.htm
[3]: https://www.agilityrobotics.com/faq
[4]: https://www.agilityrobotics.com/content/digit-moves-over-100k-totes
[5]: https://www.agilityrobotics.com/solutions/digit-5
