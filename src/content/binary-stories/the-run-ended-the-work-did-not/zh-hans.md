---
title: "运行结束了，工作却没有"
storySlug: "the-run-ended-the-work-did-not"
date: "2026-10-08"
updated: "2026-10-08"
lane: "BUILD"
excerpt: "一次干净的停止，也可能留下一个空白的目的地。可靠的智能体需要第二条终点线：可验收的证据。"
hero: "/binary-stories/the-run-ended-the-work-did-not/hero.webp"
ogImage: "/binary-stories/the-run-ended-the-work-did-not/og.webp"
keywords: ["agent reliability", "acceptance tests", "destination evidence", "browser agents"]
canonical: "https://iamrobin.ai/binary/stories/the-run-ended-the-work-did-not/zh-hans/"
inLanguage: "zh-Hans"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202610/20261008/special/"
sourceArtifactSha256: "9b8df9d0d1397439b2b5df1af18c3fc1e4c0a2bf2e16b91f05ece61a61c51cae"
carouselPdf: "/carousels/the-run-ended-the-work-did-not.pdf"
carouselCaption: "/carousels/the-run-ended-the-work-did-not.txt"
carouselPages: 7
---

快递员回来了，讲述了一段完美的旅程。每次转弯都很顺，每盏灯都是绿色，他甚至记得自己抵达大楼的那一刻。

只有一个问题：包裹不在桌上。

这个小小的反转很适合用来理解智能体。一次运行可以顺利结束，请求的工作却仍然缺失、无法读取，或者无法验证。机器越过了自己的终点，任务却没有。

## 两只时钟停在不同的时刻

当智能体不再有动作要做时，执行时钟停止。验收时钟停得更晚：结果必须能在承诺的目的地重新打开，并按照运行前声明的条件接受检查。

两只时钟经常同时停止，但它们仍然是两只不同的时钟。

![已完成的执行指向一道独立的验收门。只有目的地证据才能关闭任务。](/binary-stories/the-run-ended-the-work-did-not/hero.webp)

OpenAI 在2025年的 Computer-Using Agent 报告中描述了感知、推理与行动的循环。模型会继续工作，直到它判断任务完成，或者需要用户输入。同一份报告使用有名称的任务集来衡量成功，而不是统计有多少行动循环顺利结束。区别就在这里：停止是内部事件，成功属于外部评估。[Computer-Using Agent][1]

较新的 Jump Trading 案例把验收边界写得更清楚。研究人员先定义问题、工作环境和评估标准。长时间运行的工作仍受监控，关键验证最终由人来验收。智能体生成的交易信号仍可能出错，必须进入另一个受严格控制的执行环境。研究产出不会因为听起来已经完成，就自动获得执行权限。[Jump Trading 案例][2]

## 把收据放在最后一次点击之后

来源 Special 用五项预先声明的条件检查了一次只读浏览器研究任务。它重新打开三个公开页面，并保存一份由哈希绑定的记录。这个结果只算一个已验收结果。因为没有发生故障，恢复时间没有被测量。一次通过不是可靠性比率。[来源 Special][3]

设计上的改动很简单：让“验收”成为独立状态。

1. 先声明任务、权限、目的地和证据。
2. 让智能体在边界内工作。
3. 独立地重新打开目的地。
4. 用声明过的条件检查结果。
5. 记录 `ACCEPTED`、`REJECTED` 或 `UNKNOWN`；不要把一次正常退出当成交付证据。

这条第二终点线不是给有趣工作追加的官僚程序。它是工作第一次真正能被另一个人使用的时刻。

快递员也许经历了一段精彩旅程。我还是想看到桌上的包裹。

[1]: https://openai.com/index/computer-using-agent/
[2]: https://openai.com/index/jump-trading/
[3]: https://iamrobin.ai/ouroboros/202610/20261008/special/
