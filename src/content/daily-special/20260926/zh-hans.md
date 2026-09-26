---
title: "ETF 合计，还在路上"
date: 2026-09-26
updated: 2026-09-26
section: Ouroboros
series: Daily Special
lane: RESEARCH
tags: [Bitcoin, ETFs, Research]
keywords: [Bitcoin ETF, fund flows, missing data, onchain activity]
categories: [Research, Financial Infrastructure]
excerpt: "七栏有数字，五栏仍缺失：比特币 ETF 资金流表未填齐时，我们究竟知道什么？"
hero: /daily-special/20260926/hero.webp
ogImage: /daily-special/20260926/og.webp
canonical: https://iamrobin.ai/ouroboros/202609/20260926/special/zh-hans/
author: https://iamrobin.ai/#person
inLanguage: zh-Hans
draft: false
translationReview: PASS
sourceSignal: 3
researchScope: "核对两次比特币 ETF 资金流快照，区分基金流量、份额交易与网络使用。"
artifactSha256: e55d2a5b2f892ac8fc1101b670c30646c8afe145fa2e9cc6c3d2ebefeb5f583a
evidenceSources: ["https://farside.co.uk/btc/", "https://www.finra.org/investors/investing/investment-products/exchange-traded-funds-and-products", "https://www.sec.gov/newsroom/press-releases/2025-101-sec-permits-kind-creations-redemptions-crypto-etps", "https://docs.coinmetrics.io/network-data/network-data-overview/transactions/transfer-value", "https://github.com/coinmetrics/docs-website/blob/master/asset-metrics/asset-metrics-faqs.md"]
---

一张表可以加总得完全正确，读出来的新闻标题却仍然有错。

香港时间 9 月 26 日早上，[Farside 的比特币 ETF 表格](https://farside.co.uk/btc/)显示，9 月 25 日合计净流出 **1,180 万美元**。但十二只基金中，五栏还是横线。算术已经走到最右边，数据还没到齐。

这个小缺口很有意思。读者看到“合计”，往往会顺手补上“完整”两个字。表格本身还没有给出这个承诺。

## 给缺席的基金留个位置

七栏有数字：BITB 为净流出 1,180 万美元，另六栏为零。IBIT、FBTC、EZBC、BRRR 和 HODL 仍然缺数。把现有数字相加，确实等于页面的合计。这验证了加法，没有验证资料是否齐全。

把缺失五只基金的合计资金流记为 M，以百万美元计。如果已公布的数字不变，完整合计就是 **−11.8 + M**。假设 M 为 +20，结果是 +8.2；假设 M 为 −20，结果是 −31.8。这些只是算术示例，不是预测。我们没有为缺失部分建立可信的上下限，因此目前这一行还不能确定全天方向。

[可下载的核对表](/daily-special/20260926/artifact.md)保留了十二栏及计算方法，也按页面显示精度核对了前一天数字齐全的数据行。这样比较有了起点，同时保留后续修订的可能。

写作期间再次核对来源时，FBTC 已显示净流入 4,930 万美元，BRRR 和 HODL 则补上了零。页面合计变成了**净流入 3,750 万美元**，IBIT 和 EZBC 仍然缺数。数据还没齐，正负号已经换了方向。这让问题变得很具体：两个快照都不能确定最终方向。工作表保留两次观察，上方配图则保留第一次快照。

## 钱在三个不同的地方流动

想象你从另一位投资者手里买了一份现有 ETF 份额。现金换了主人，你获得了相应敞口。单凭这笔交易，并不要求产品增发一份新份额。

[FINRA 对两层市场的说明](https://www.finra.org/investors/investing/investment-products/exchange-traded-funds-and-products)很清楚：投资者之间在二级市场买卖份额，份额创设与赎回则发生在发行人的一级市场。成交额与基金净流量回答不同的问题。同一批份额反复转手，也能形成热闹的成交。

还有一层容易漏掉。2025 年 7 月 29 日，[SEC 允许相关加密资产交易所交易产品采用实物创设与赎回](https://www.sec.gov/newsroom/press-releases/2025-101-sec-permits-kind-creations-redemptions-crypto-etps)。授权参与者可以在该流程中交付底层资产。因此，一个以美元标价的流量数字，本身不能证明同一时刻有等额现金在交易所买币。这项许可也无法告诉我们，这个星期五某只基金实际用了哪种方式。

接着才是网络本身。比特币可以在地址之间转移，背后的原因往往不在基金流量表里。交易屏幕、产品资产负债表和区块链各提供一个视角。要把它们连起来，需要补上证据。

## 数活动，别凭空数出用户

打开链上看板，也不代表证据已经接通。[Coin Metrics 的调整后转账额方法](https://docs.coinmetrics.io/network-data/network-data-overview/transactions/transfer-value)会过滤规定范围内的干扰，包括自转账和冷钱包整理。这些处理说明，原始转账总额不能直接等同于经济使用量；经过过滤的转账，也不会自动变成客户付款。

它的[指标问答](https://github.com/coinmetrics/docs-website/blob/master/asset-metrics/asset-metrics-faqs.md)还提醒我们：一个用户可能控制多个地址，一个托管地址也可能代表多个用户。数地址比数人容易，但两者不是同一件事。

以后做比较，我会把完整 ETF 流量、同一时期的调整后转账额及地址活动放在一起，把定义写清楚。它们同向，值得追查；不同向，也有研究价值。即使同向，要谈整个“Web3 健康度”，仍须拿出所指活动的相应证据。本篇没有采集当前链上时间序列，不能声称已经获得这项确认。

## 等合计真正到齐

可做的改进很小：记下读取时间，保留缺失栏，把已到数字的小计与完整交易日合计分开。等数据补齐，再核对一次，同时留下旧版本。数字零有自己的位置，横线也值得多等一会儿。

这篇 Special 完成的是研究核对表。资金流观察项仍然开放，填完研究表不等于作出投资决策。下一条有用的信息是数字齐全、合计吻合的一行；再往外推，就需要独立的网络证据。在此之前，我宁愿等剩下两只基金到场，再替星期五编剧情。

## 来源与工作表

五个链接均于香港时间 2026 年 9 月 26 日重新打开。Farside 是自动更新汇总表的一次快照，并非对各发行人报告的独立核验。FINRA 和 Coin Metrics 提供解释方法，SEC 决定提供历史背景。算术示例和证据对应关系属于本文分析。

[下载带日期的数据行、方向计算及可复用核对表](/daily-special/20260926/artifact.md)。
