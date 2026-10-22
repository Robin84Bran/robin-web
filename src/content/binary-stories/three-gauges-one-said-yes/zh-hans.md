---
title: "三项指标，只有一项转正"
storySlug: "three-gauges-one-said-yes"
date: "2026-10-22"
updated: "2026-10-22"
lane: "INVEST"
excerpt: "比特币 ETP 资金流转正，但以太币 ETP 资金流与美元稳定币流通量仍为负。广度来自一致，而不是相加。"
hero: "/binary-stories/three-gauges-one-said-yes/hero.webp"
ogImage: "/binary-stories/three-gauges-one-said-yes/og.webp"
keywords: ["比特币 ETF 资金流", "以太币 ETF 资金流", "稳定币流通量", "跨渠道确认"]
canonical: "https://iamrobin.ai/binary/stories/three-gauges-one-said-yes/zh-hans/"
inLanguage: "zh-Hans"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202610/20261022/special/"
sourceArtifactSha256: "5c9f2c5496f76ca647731921be427da5c9063b60529ef6afa231de40bac4fc05"
carouselPdf: "/carousels/three-gauges-one-said-yes.pdf"
carouselCaption: "/carousels/three-gauges-one-said-yes.txt"
carouselPages: 7
draft: false
---

一个绿色数字，足以让狭窄的信号看起来很宽。

截至 10 月 20 日的最近五个完整美国交易日，美国现货比特币 ETP 资金流合计 **+2.112 亿美元**。它确实越过了零线。

但相邻的两个指标没有跟上。同一组交易日内，现货以太币 ETP 资金流合计 **-3.889 亿美元**。从 10 月 13 日到 20 日，美元锚定稳定币的流通市值减少 **23.68 亿美元**，降幅 **0.77%**。

这幅图不是一片绿色，而是 **(+,-,-)**。

## 广度来自一致，而不是相加

比特币和以太币 ETP 资金流使用相同单位，也覆盖同一个五交易日窗口，因此可以相加。两者合计为 **-1.777 亿美元**。

稳定币序列不能加入这道算式。它是以十亿美元计价、按自然日记录的存量估计。ETP 资金流则是围绕上市产品的每日申购与赎回估计，这里以百万美元计量，并按美国交易日汇总。

把稳定币存量变化与基金资金流相加，只会得到一个没有一致经济含义的数字。不过，三个指标仍能回答一个有用的问题：它们的方向是否一致？

答案是否定的。

这个区别很重要。汇总在问“有多少”；确认在问“从不同窗口看到的系统是否朝同一方向”。当单位不同时，一致性往往比一个宏大的总数更诚实。

![三个独立指标分别显示比特币 ETP 资金流为正、以太币 ETP 资金流为负、美元稳定币流通量为负，然后进入独立的广度确认门。](/binary-stories/three-gauges-one-said-yes/hero.webp)

## 一个交易日扛起了比特币的结果

比特币的正数也高度集中在时间上。

10 月 19 日贡献了 **+5.267 亿美元**。去掉这一天，其余四个交易日合计为 **-3.155 亿美元**。五日结果依然有效；集中并不会抹掉它，但会把问题从“比特币是否转正”改成“这次转正背后有多少证据”。

以太币在五个交易日里每天都为负。10 月 20 日，比特币为 **+2320 万美元**，以太币为 **-2610 万美元**，两者合计 **-290 万美元**。连窗口的最后一天也不肯配合一个整齐的故事。

这些数据都不能解释动机。表格无法告诉我们投资者是否改变了信念、授权参与者是否调整了库存，也不能证明资金从一条渠道转向另一条。贡献可见，意图仍然不可见。

## 三个指标，三只时钟

ETP 表格照亮的是一个狭窄的一级市场机制。美国证交会允许授权参与者以实物方式申购和赎回加密资产 ETP 份额。这个机制与投资者之间的二级市场交易并存，并不代表整个加密经济。

稳定币序列更宽，但性质不同。DefiLlama 报告其 `peggedUSD` 类别中流通代币的美元价值。铸造、销毁、跨链、分类调整和轻微脱锚都可能改变这个估计。它并不是“等待买入资产的美元”的直接计数器。

因此，三个指标应保持分开：

- 比特币 ETP 资金流：一个完整的五交易日基金窗口；
- 以太币 ETP 资金流：与之匹配的完整基金窗口；
- 美元稳定币流通量：与最后一个完整基金交易日对齐的七自然日存量变化。

它们不一致，并不是算式失败，而正是结果本身。

## 确认门应该很无聊

一个有用的广度确认门不必预测价格。它只需要阻止某个令人兴奋的单列数据，借用其他指标的可信度。

第一，只使用完整交易日。研究冻结时，Farside 已显示 10 月 21 日的总数，但数个基金单元格仍是破折号。缺失值没有被改写成零。

第二，让每个指标保留自己的单位。比较方向，不要虚构一个共同资金池。

第三，把三方一致当作“值得继续调查广度”的许可，而不是交易许可。价格、基差、流动性、资金所在场所与稳定币构成，仍需要各自的证据。

最克制的结论，反而最有用。比特币产品资金流越过了零线，另外两个指标没有确认。

三个指标被问了同一个方向问题。

只有一个说是。

[1]: https://farside.co.uk/btc/
[2]: https://farside.co.uk/eth/
[3]: https://stablecoins.llama.fi/stablecoincharts/all
[4]: https://github.com/DefiLlama/api-docs/blob/main/llms-free.txt
[5]: https://www.sec.gov/newsroom/press-releases/2025-101-sec-permits-kind-creations-redemptions-crypto-etps

来源：[Farside 比特币 ETP 资金流][1]、[Farside 以太币 ETP 资金流][2]、DefiLlama 的[稳定币历史端点][3]与 [API 文档][4]，以及美国证交会关于[实物申购与赎回][5]的公告。数字沿用来源 Special 中冻结的观察窗口。Farside 说明其表格会自动更新且可能出错；DefiLlama 的供应商定义历史也可能修订。这是一篇有明确日期的测量故事，不是交易、资产配置规则或价格预测。
