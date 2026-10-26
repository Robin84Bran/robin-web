---
title: "满分丢了一天"
storySlug: "the-perfect-score-lost-a-day"
date: "2026-10-26"
updated: "2026-10-26"
lane: "BUILD"
excerpt: "仪表板可以显示 100% 送达率，同时让一次未进入分母的计划运行彻底消失。"
hero: "/binary-stories/the-perfect-score-lost-a-day/hero.webp"
ogImage: "/binary-stories/the-perfect-score-lost-a-day/og.webp"
keywords: ["定时智能体", "可靠性分母", "验收回执", "Agents API"]
canonical: "https://iamrobin.ai/binary/stories/the-perfect-score-lost-a-day/zh-hans/"
inLanguage: "zh-Hans"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202610/20261026/special/"
sourceArtifactSha256: "9c958332e94b3f43b75a4996983c3ba13f3188fdc0f0232b4732b41bfcb97bf5"
carouselPdf: "/carousels/the-perfect-score-lost-a-day.pdf"
carouselCaption: "/carousels/the-perfect-score-lost-a-day.txt"
carouselPages: 7
draft: false
---

仪表板显示：**100%**。

每一次被记录的 invocation 都已送达。没有红色行，没有失败尝试。一个完美的月份。

但日历承诺了三十个早晨，表里却只有二十九条记录。

缺失的那一天没有失败。它根本没有进入分母。

可靠性指标就这样可以在数学上正确，却在运行意义上失真。

这是一个说明性例子，并不是一次真实发生的 OpenAI 故障。它要揭示的是所有定时系统都会遇到的测量陷阱：如果指标只从已经存在的记录开始计算，它就无法统计那条本该存在、却没有出现的记录。

![一个说明性月份包含 30 次预期运行、29 次已记录 invocation 和 28 个通过验收的输出。缺失的一次运行落在 100% 送达率的分母之外。](/binary-stories/the-perfect-score-lost-a-day/hero.webp)

## 平台记录开始于承诺之后

OpenAI 的 Scheduled Automations 文档把各层证据分得很清楚。schedule 保存预定时间和目标；每次运行会创建一个 invocation，用来记录向 session 发送工作的尝试。invocation 标记为 `completed`，表示送达成功：目标 session 已接受初始输入或通知。

这不表示智能体已经完成任务。

随后，文档让应用继续查看 session events。根 turn 可能完成、失败或被取消。即使 turn 已完成，也不能保证所有工具都成功，因此仍需检查输出和工具结果。

这是四个不同事实：

1. 预期会有一次运行；
2. 系统记录了一次 invocation；
3. 工作已送达到 session；
4. 根 turn 到达终止状态。

第五个事实属于任务所有者：结果是否满足验收规则？

最棘手的是第一个事实，因为它先于 invocation 存在。invocation 历史可以描述已经创建的 invocation，却不能单独充当“所有本应发生之事”的日历。

## 两个诚实的比率可以互相矛盾

假设一个纯说明性的三十天月份：

- 预期有 30 次计划运行；
- 记录到 29 次 invocation；
- 29 次全部送达；
- 其中 28 个输出通过任务验收。

传输指标是诚实的：

**已送达 invocation ÷ 已记录 invocation = 29 ÷ 29 = 100%**

结果指标也是诚实的：

**已验收输出 ÷ 预期计划运行 = 28 ÷ 30 = 93.3%**

两者不能互相替代，因为它们回答不同的问题。

前者问的是：已记录的尝试是否到达 session？后者问的是：计划中的承诺是否产生了可用结果？如果仪表板把前者标成“任务成功率”，却没有建立后者的分母，就会误导读者。

在没有证据之前，也不应把缺失的那次运行标成 OpenAI 故障。原因可能在应用状态、监控、暂停的 schedule、查询边界，或其他位置。在完成关联调查前，原因只能是 `UNKNOWN`。

## 在运行之前建立分母

最小的修复不是增加一个状态徽章，而是建立预期运行账本。

每次预定运行开始前先创建一行记录，并赋予稳定键，例如 schedule ID 加 `scheduled_at`。然后向前关联 invocation、session、根 turn、产物和验收结果。

无论出现哪种结果，这一行都必须保留：

- 没有找到 invocation；
- 送达处于排队或完成状态；
- 根 turn 完成、失败或被取消；
- 输出已验收、被拒绝或尚未解决；
- 发生重试、重放或人工救援。

这样，缺失就会变得可见。没有 invocation 的情况会成为一条无法匹配的预期运行，而不是一个看不见的空洞。

这也为延迟提供了真实起点。OpenAI 说明，周期运行会带有轻微随机延迟；目标 session 忙碌时，送达还可能继续等待。如果时间重要，应该从预定运行时刻量到产物通过验收，而不是只计算 invocation 创建到送达的时间。

## 保留三块记分牌

一个有用的系统至少要分别报告三种比率。

**传输：**已送达 invocation ÷ 已记录 invocation。

**执行：**终止的根 turn ÷ 已送达 invocation，并分别列出完成、失败和取消。

**结果：**已验收产物 ÷ 预期计划运行。

名称很重要，因为每种比率有不同的责任边界和修复方式。送达问题不能靠更好的内容标准解决；被拒绝的产物不能靠重试传输解决；缺失的运行也无法从一张从未收到它的 invocation 表里恢复。

重试也需要同样的纪律。OpenAI 的恢复指南提醒，失败的 turn 可能已经改动文件或调用工具。重复任务之前，应先检查保存状态和已完成的外部效果。运行键必须保持稳定，同时让每次尝试拥有独立身份；否则，一次重试可能看起来像第二次成功，而不是对第一次承诺的恢复。

## 满分需要一个外部见证者

更深的一层并不是说 100% 一定可疑。有时每一项承诺确实都成功了。

真正的问题是：一个系统如果只依靠故障点之后自行产生的记录，就无法证明自己的完整性。

schedule 需要 invocation 表之外的见证；产物需要正文之外的验收规则；重试需要重试动作之外的账本。

绿色很有用，但绿色出现得太晚。

在庆祝分子之前，先问一句：是谁数了那些天？

[1]: https://developers.openai.com/api/docs/guides/agents-api/sessions/automations
[2]: https://developers.openai.com/api/docs/guides/agents-api/sessions/events
[3]: https://developers.openai.com/api/docs/guides/agents-api/observability
[4]: https://developers.openai.com/api/docs/guides/agents-api/errors

来源：OpenAI 官方文档 [Scheduled Automations][1]、[Events and Items][2]、[Observability and Usage][3]、[Errors and Recovery][4]，以及经过哈希绑定的[来源 Special](https://iamrobin.ai/ouroboros/202610/20261026/special/)。三十天的数字仅用于说明。本文不声称发现了真实的可靠性比率、延迟分布或平台故障。
