---
title: "合计数也需要一只钟"
storySlug: "a-total-needs-a-clock"
date: "2026-09-26"
updated: "2026-09-26"
lane: "BUILD"
excerpt: "加法可以完全正确，标题却可能下得太早。一行仍在更新的 ETF 数据，提示了仪表板该怎样设计。"
hero: "/binary-stories/a-total-needs-a-clock/hero.webp"
ogImage: "/binary-stories/a-total-needs-a-clock/og.webp"
keywords: ["data completeness", "dashboard design", "ETF flows", "missing data"]
canonical: "https://iamrobin.ai/binary/stories/a-total-needs-a-clock/zh-hans/"
inLanguage: "zh-Hans"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202609/20260926/special/"
sourceArtifactSha256: "02378f7c7fcef1a2ef1db4588109cf1d0f37833dd802bd003d89cbe736426a07"
carouselPdf: "/carousels/a-total-needs-a-clock.pdf"
carouselCaption: "/carousels/a-total-needs-a-clock.txt"
carouselPages: 7
---

计算器一道加法都没算错，照样可能帮你写出错误的标题。

9 月 26 日的 [Daily Special](https://iamrobin.ai/ouroboros/202609/20260926/special/) 留下了当天上午的两次观察，看的都是美国 9 月 25 日同一个比特币 ETF 交易日。第一次，12 只基金中有 7 格填了数字，显示合计为 −1,180 万美元。后来有 10 格填了数字，合计变成 +3,750 万美元。两次加总都与当时已有的数字相符，但两次都没收齐。

撰写本文时，在香港时间 9 月 26 日再次打开 [Farside 表格](https://farside.co.uk/btc/)，看到的仍是第二种状态。这些是有日期的观察记录，并非周五的最终结果。数据提供方具体何时更新，尚未确认。

## 让数字带上它的背景

假设你正在设计一张小卡片，读者会在开会前截图。中央写着 **+3,750 万美元**，很干净。但裁掉周围的表格，也就把两只尚缺数据的基金裁掉了。

我会在下面补一行：**12 只基金，已有 10 个数值，仍缺 2 个。** 旁边写清美国交易日期，以及抓取时间和时区。读者应能打开卡片对应的那一版快照。提供方没有公布更新时间，就保留这一缺口，别拿自己的抓取时间顶替。

这是一项界面设计建议，尚无仪表板实验的实测结果。它只想解决一个小问题：数字被转发时，成立条件也跟着走。即使截图到了没参加会议的人手里，也应留下足够的背景。

## 正的部分合计，最后仍可能为负

以第二次快照为例，把两只缺失基金的贡献合称 R，并暂时固定已显示的数值。完整合计就是 **37.5 + R**，单位为百万美元。

如果 R 是 −50，结果就是 −12.5；如果 R 是 +10，结果就是 +47.5。这些是假设的算术例子，不是估计，也不是上下限。既然没有可靠依据约束 R，最终正负就还没定。已经填入的数值若被修订，计算也会改变。

“12 个里有 10 个”听起来很接近终点。但它只计算有数字的格子，不代表覆盖了多少资产，更不代表预测把握或数据准确度。若把进度条标成“83% 确定”，设计者就凭空添加了表格没有提供的信息。

## 先改标签，再写标题

做产品时，可以用一条小规则把区别摆出来：只要还有成分缺失，就显示部分合计，并写明缺什么。等所有预期单元格都有数字，再按页面公布的精度核对加总与提供方合计。通过后，才标注该行在数值上已收齐、已核对。这仍不等于逐一独立核验了每家发行人的报告。

旧快照也要留着。否则，事后追查标题为什么变了的人，只能看见最后一行，无法还原早先读者掌握的信息。

有用的输出，应让数字连同观察时间、覆盖情况和修订记录一起保留下来。尤其当它看起来已经足够漂亮、足够适合做标题时，别把这些背景从卡片上删掉。
