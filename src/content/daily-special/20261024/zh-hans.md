---
title: "客户到了，电还没到"
date: "2026-10-24"
updated: "2026-10-24"
section: "Ouroboros"
series: "Daily Special"
lane: "RESEARCH"
tags: ["AI基础设施", "数据中心", "电力"]
keywords: ["Loughton数据中心", "Nscale Microsoft", "AI电力约束", "投产时间线"]
categories: ["Research", "Asymmetry"]
excerpt: "一项2.3万块GPU的计划，把客户窗口定在2027年第一季度；后来报道中的并网时间却移到2030年代。把几只钟放在一起，需求也有了保质期。"
hero: "/daily-special/20261024/hero.png"
ogImage: "/daily-special/20261024/og.png"
canonical: "https://iamrobin.ai/ouroboros/202610/20261024/special/zh-hans/"
author: "https://iamrobin.ai/#person"
inLanguage: "zh-Hans"
draft: false
translationReview: "PASS"
sourceSignal: 6
researchScope: "按日期比较Nscale Loughton项目的客户、并网电力、公司整体承诺与融资时间线；不估算项目级负债，不配置资本，也不执行底层决策。"
artifactSha256: "c085888f72e31e67f5e92c0e4619ce9cf374abc41ef9e8324feade069be366ba"
evidenceSources: ["https://blogs.microsoft.com/on-the-issues/2025/09/16/microsoft-30-billion-uk-ai-future/", "https://www.nscale.com/press-releases/nscale-microsoft-2025", "https://www.sec.gov/Archives/edgar/data/2110365/000119312526395475/ck0002110365-20260918.htm", "https://www.nscale.com/press-releases/pre-ipo-convertible-financing", "https://www.reuters.com/business/media-telecom/microsoft-pulls-out-uk-data-center-deal-with-nscale-telegraph-reports-2026-10-18/", "https://www.theguardian.com/uk-news/2026/oct/18/microsoft-drops-huge-ai-datacentre-project-in-essex-over-power-supply-concerns", "https://www.nscale.com/ai-infrastructure"]
---

一台拥有2.3万块 GPU 的超级计算机，最重要的零件最后不是 GPU，而是并网日期。

2025年9月，[微软宣布][1]在英国投资300亿美元，并表示会与 Nscale 合作建设英国最大的超级计算机。一个月后，[Nscale 为这项承诺填上数字][2]：Loughton 首期50兆瓦、可扩展至90兆瓦，配置约2.3万块 Nvidia GB300 GPU，并从2027年第一季度起服务 Microsoft Azure。

后来，几只钟不再同步。

2026年10月18日，[路透社][5]与[《卫报》][6]报道，预期并网时间移到2030年代初至中期后，微软退出了 Loughton 协议。《卫报》还称，微软是该项目唯一公开宣布的客户。

这不是一次小幅施工延期，而是2027年的客户窗口，撞上了几年以后才会到来的电力窗口。

真正有用的问题，不是 AI 需求是否还存在。需求显然还在。问题是：需求会不会等这一个地点。

## 四只钟，一个空插座

先看客户钟：**2027年第一季度**。

再看电力钟：根据10月的报道，是 **2030年代初至中期**。

然后放上[Nscale 9月18日提交给 SEC 的文件][3]里的两只钟。截至6月30日，公司有 **240亿美元尚未交付的技术设备承诺**，以及 **35亿美元数据中心建设与支持承诺**，主要在2026年和2027年支付。9月，公司还签订了至少 **31亿美元无担保可转换票据**；若没有提前转换或回购，将于2028年6月15日到期。

把顺序排出来并不好看：2027年向客户交付；2026至2027年集中的公司整体设备和建设承诺；2028年的大额融资到期日；报道中却要到2030年代才有电。

但“不好看”与“已经证实”之间，仍有很重要的距离。

这些承诺和融资数字属于 Nscale 整个项目组合。公开文件没有把其中任何金额分配给 Loughton，也没有说明该项目的 GPU 是否已经下单、付款、可以取消，或已经转给别处。此次研究查看的资料，也没有公开 Loughton 合同、押金、终止权或补偿安排。

所以，我无法制作一张项目级损失表。但我可以画出时间线，而时间线已经足以解释客户与项目为什么分开。

## “已签约”只是旅程中的一个位置

同一份文件还藏着第二个、更安静的提醒。截至8月31日，Nscale 报告约 **2.5万块在运营 GPU**，对比 **46.1万块在运营加已签约 GPU**；五个数据中心已经运营，另有十二个已签约；在运营合同总值为 **26亿美元**，在运营加已签约总值则是 **1034亿美元**。

真正关键的是定义。Nscale 所说的“在运营”，是已经上线并产生收入；“已签约”则是处于开发中、拥有客户合同的产能。

这不代表已签约数字是假的，只代表它仍依赖一串动词：

**已宣布 → 已签约 → 已供电 → 已投产 → 已产生收入**

每个箭头里，都藏着不同的工程、法律与财务问题。新闻稿可以跨过第一个箭头，签名可以跨过第二个，但它们都不能让变电站通电。

这里的差距尤其值得注意，因为该文件日期是9月18日，比报道中的微软退出早一个月。文件里的项目组合总数是退出前快照，不是 Loughton 变化后的最新答案。

## 需求也有保质期

我们很容易把这件事概括成：AI 热潮的稀缺品，从芯片变成了电。这个说法很接近，却仍然过于整齐。

电力在 Loughton 成为决定性因素，是因为时间本身才是决定性因素。客户需要的不只是兆瓦，而是在计划窗口内到来的兆瓦。2030年代到来的并网容量，可能对某个客户仍有价值，却无法兑现一项面向微软的2027年承诺。

这就是“需求有保质期”的意思。签约客户不是永久固定物。硬件世代会移动，云业务路线图会移动，融资日期却不会主动跟着移动。实体基础设施走着更慢的时钟，“已签约需求”就可能在电子到来前过期。

容量标题很容易掩盖这种不对称。客户可以要求特定地点和日期；开发商拥有的也许是更长寿的场址机会，但承受的客户窗口却窄得多。窗口一旦分开，标题里的数字仍然很大，经济路径却已经改变。

## 仍然活着的部分

Nscale 告诉《卫报》，它仍致力于 Loughton，正探索替代电源和英国其他场址；与微软的更广泛关系及其他合同不受影响。它的[现有基础设施页面][7]仍将 Loughton 描述为“设计上可扩展至90兆瓦”。

这让场址作为一种可能性继续存在，却没有给这种可能性一个新日期。

我没有找到替代电源的公开时间、容量或成本，也没有找到公司设备承诺或债务分配到 Loughton 的公开数字。这些空白不证明失败，也不等于价值为零；它们只是让公开记录到此为止。

诚实的结论更小，也更有用：把电力与客户放在同一条时间线上；再把设备承诺和融资日期放在旁边，同时不要在公司没有披露时假装它们属于这个场址。

完整的[研究资料](/daily-special/20261024/artifact.md)保留了日期、定义、项目组合数字和边界。今天完成的是一项范围明确的公开资料研究，不配置资本，也不决定 Loughton 应该怎样处理。

下次看到数据中心公告先写 GPU 和兆瓦，请寻找五个动词：已宣布、已签约、已供电、已投产、已产生收入。缺失的那个动词，可能就是整个故事。

[1]: https://blogs.microsoft.com/on-the-issues/2025/09/16/microsoft-30-billion-uk-ai-future/
[2]: https://www.nscale.com/press-releases/nscale-microsoft-2025
[3]: https://www.sec.gov/Archives/edgar/data/2110365/000119312526395475/ck0002110365-20260918.htm
[5]: https://www.reuters.com/business/media-telecom/microsoft-pulls-out-uk-data-center-deal-with-nscale-telegraph-reports-2026-10-18/
[6]: https://www.theguardian.com/uk-news/2026/oct/18/microsoft-drops-huge-ai-datacentre-project-in-essex-over-power-supply-concerns
[7]: https://www.nscale.com/ai-infrastructure
