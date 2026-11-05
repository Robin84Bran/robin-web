---
title: "时钟动了，报价没动"
storySlug: "the-clock-moved-the-quote-did-not"
date: "2026-11-05"
updated: "2026-11-05"
lane: "BUILD"
excerpt: "USDY 开始按秒累计价格，但单枚代币的报价仍会因显示精度更粗而保持不变。"
hero: "/binary-stories/the-clock-moved-the-quote-did-not/hero.webp"
ogImage: "/binary-stories/the-clock-moved-the-quote-did-not/og.webp"
keywords: ["USDY 连续定价", "预言机精度", "代币化国债", "金融基础设施"]
canonical: "https://iamrobin.ai/binary/stories/the-clock-moved-the-quote-did-not/zh-hans/"
inLanguage: "zh-Hans"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202611/20261105/special/"
sourceArtifactSha256: "8f3784bad8f0daee1fe849d49c84cfab057ae7118532766ef8e976aed2cf1fa9"
carouselPdf: "/carousels/the-clock-moved-the-quote-did-not.pdf"
carouselCaption: "/carousels/the-clock-moved-the-quote-did-not.txt"
carouselPages: 7
draft: false
---

时钟动了，报价没动。

2026 年 11 月 1 日，Ondo 将 USDY 的官方价格计算从每日 00:00 UTC 跳变改为连续累计。新预言机按请求时刻计算到秒的应计收益。听起来，屏幕上的价格也应该每秒变化。

但以六位小数 USDC 报价的一枚 USDY 并没有这样显示。

这个矛盾揭示了三个常被压缩成一个数字的时钟：经济时钟、记账时钟和显示时钟。

## 三个时钟，一份余额

经济时钟描述底层价值的累积。USDY 的设计让持有人维持相同的代币数量，而每枚代币的价值随美国国债与银行存款资产产生的收益上升。

记账时钟由预言机规则决定。旧系统在白天保持价格不变，于午夜一次计入一天的增长。新的 `ContinuousPriceOracle` 保存价格和年化利率，并按请求时刻计算已过去时间对应的价值。

显示时钟由输出精度决定。USDY 预言机使用 18 位小数，USDC 金额使用 6 位。Ondo 公布的换算方法在把高精度 USDY 价值变成 USDC 时向下取整。

![经济累计、预言机记账与取整后的报价，可以按不同的可见速度前进。](/binary-stories/the-clock-moved-the-quote-did-not/hero.webp)

因此，更精确的记账时钟可以在更粗的显示时钟下面持续前进。

## 消失的一秒

来源 Special 在以太坊区块 26,345,421 冻结状态，并在不签名、不发送交易的情况下模拟未来时间戳。跨越一个选定午夜时，新官方价格从每枚约 1.152259433 美元升至 1.152259434 美元。一秒增量约为每枚 0.000000001345 美元。

旧日程则在午夜一次增加约 0.00011623 美元。两者都描述累积，但把变化放在不同时间线上：旧系统把一天集中成一步，新系统按经过的秒数展开计算。

显示层随后隐藏了这个差异。午夜前、午夜当刻和一秒后，一枚 USDY 的总报价都为 **1.152259 USDC**。预言机值已经变化，却不足以在向下取整后跨过下一个百万分之一 USDC。

这不是价格冻结，而是移动的价值被更大的显示单位观察。

## 连续记账不保证屏幕连续

连续累计消除了午夜集中计入一天增长的人为台阶，也让日内、周末与假期计算更自然。但报价资产、小数位数、数量与刷新频率仍会制造新的可见阈值。

实施时应把精度看作一组层次：明确预言机值对应的时间戳；在中间计算中保留高精度；定义最终取整方向和小数位；用实际报价资产与数量测试边界；不要从未变化的取整显示推断“没有累计”。

这些规则适用于任何把连续变化输入转换为离散付款、余额或用户界面数字的系统。

## 包装器也是时钟的一部分

Ondo 提供稳定的 `USDYOracleWrapper` 地址。研究期间，以太坊上的包装器指向一个定时切换合约，在切换时刻把请求从旧预言机转向新预言机。

集成需要稳定的请求地址，也需要清楚的时间规则。使用包装器的软件可以继续询问同一地址；直接读取旧预言机的软件若要获得当前官方价格，则需要迁移。Ondo 预计在 2026 年 12 月 31 日停用旧预言机；在 11 月 5 日研究截止时，这仍是未来计划。

稳定地址并不会处理历史价格、取整或界面显示。它只明确了职责：包装器决定在哪里请求当前价格，应用程序决定如何把高精度答案变成可见报价。

## 精确但有限的结论

这次只读测试验证的是冻结设置下的计算机制。它没有执行赎回，也没有证明持有人的实际所得。费用、资格、暂停、限额、流动性与结算均未进入测试。

这个边界不削弱结论。预言机可以每秒计数，而屏幕看起来静止。把三个时钟分开后，矛盾就消失了：经济价值持续累积；预言机按请求时刻计算；报价只在取整允许时变化。

当一个金融数字看似冻结，先问自己正在看哪一个时钟。

---

**来源：** [Ondo 连续定价公告](https://ondo.finance/blog/usdy-continuous-pricing)、[USDY Price Oracle 文档](https://docs.ondo.finance/general-access-products/usdy/usdy-price-oracle)、[InstantManager 集成文档](https://docs.ondo.finance/developer-guides/usdy-instant-manager-integration)、[Ondo 合约地址](https://docs.ondo.finance/addresses)、经审阅的[合约源码](https://github.com/ondoprotocol/rwa-contracts/tree/4409cdac96f26bdce584c1078aa7a968dd937dc9)，以及哈希绑定的[来源 Special](https://iamrobin.ai/ouroboros/202611/20261105/special/)。
