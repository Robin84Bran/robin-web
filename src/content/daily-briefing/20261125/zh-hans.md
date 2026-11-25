---
title: "🏹 Robin 每日信号简报，2026年11月25日"
date: 2026-11-25
updated: 2026-11-25
section: Ouroboros
series: Daily Briefing
tags:
  - Intelligence
  - AI Infrastructure
  - Bitcoin
  - Stablecoins
keywords:
  - AI infrastructure
  - crypto market structure
  - stablecoins
  - physical AI
  - robotics
excerpt: "八个信号，覆盖前沿模型、资本流动、支付轨道、公开市场、基础设施、一级市场、Physical AI 与机器人。"
hero: /daily-briefing/20261125/hero.webp
ogImage: /daily-briefing/20261125/og.webp
canonical: "https://iamrobin.ai/ouroboros/202611/20261125/zh-hans/"
author: https://iamrobin.ai/#person
inLanguage: zh-Hans
languageSlug: zh-hans
translationOf: "https://iamrobin.ai/ouroboros/202611/20261125/"
translationReview: PASS
draft: false
sourceMode: autonomous_research
---

**今天值得拆开看的两个数字：4 美分和 400 盎司。** 4 美分是 iFood 每次智能体运行的平均推理成本，还不是交付一个通过验收的结果的成本。400 盎司是伦敦金条的规格，如今其部分所有权可以单独交易、结算和质押。一个案例要求我们衡量完整成本；另一个展示了新的可交易单位能带来什么可能。

## 1. 前沿智能体：iFood 跑了 2.5 万次代理任务，下一步该数验收件

日期： 11 月 24 日。

**事实：** 据 [OpenAI 与 iFood 的客户案例](https://openai.com/business/customer-stories/ifood/)，iFood 的平台已完成逾 **25,000 次运行**，平均每次推理费 **0.04 美元**。GPT‑5.6 Luna 在隔离环境中异步执行任务，返回 GitLab 合并请求；内部安全平台报告修复的漏洞数超过原来的两倍。案例没有给出无人干预验收率，这 4 美分也不包括执行基础设施、跨运行重试及对产出工作的人工复核。

**Robin为何在意 —** 这给 Honest Agent 提供了一个现实对照：格式正确的完成报告能让下一个程序继续，却不能证明改动有效。对一人公司，较便宜的模型只有在不把验证负担交回给你时才算胜出。

**One Action：** 回放一批已知验收条件的 RobinOS 维护任务，计算：含失败重跑、基础设施和复核的总成本 ÷ 无需 Robin 补救且通过独立测试的交付数。

## 2. 物理 AI：文远知行的 Robotaxi 季收入破亿，九成以上来自海外

日期： 11 月 20 日。

**事实：** [文远知行三季报](https://weride.gcs-web.com/news-releases/news-release-details/overseas-revenue-1715-yoy-contributing-nearly-half-total-revenue)首次披露 Robotaxi 单季收入超过 **1 亿元人民币**，同比增长 **204%**，其中逾九成来自海外。公司另称广州业务已实现正向单位经济效益；它没有把整个业务的收入拆成乘客车费、车辆销售和合作服务，也没有说全车队已盈利。

**Robin为何在意 —** 大部分商业收入来自中国以外，单位经济效益的里程碑则来自中国的一座城市。把两者合并，就会制造出全球盈利的说法。这两个指标都不能直接与美国运营商的付费乘次相比。

**One Action：** 寻找一个跨地区可比的数字：在一座成熟城市，扣除远程协助和车队运营成本后的每付费车小时贡献利润。

## 3. 加密资本流：美国 BTC 与 ETH 现货 ETF 一个交易日合计净流出 6.546 亿美元

日期： 11 月 23 日美国交易日；11 月 24 日核对。

**事实：** Farside 完整的[比特币 ETF 表](https://farside.co.uk/BTC/)显示净流出 **5.697 亿美元**，其中 IBIT 一只流出 **5.093 亿美元**；[以太坊 ETF 表](https://farside.co.uk/ethereum-etf-flow-all-data/)显示净流出 **8,490 万美元**。截稿时，11 月 24 日两表的基金栏仍是横线，合计栏显示的零不能当成当日零流量。

**Robin为何在意 —** 资金正从这两条受监管的敞口渠道撤出，而且 BTC 赎回高度集中于一家基金。它比「巨鲸在卖」更精确，但不能据此判断赎回资金去了哪里，更不能推出链上应用的真实使用量也在下降。

**One Action：** 用下一张填齐的基金表检验：剔除 IBIT 后，BTC ETF 合计是否仍净流出？ 这能区分单一产品赎回与更广泛的撤资。

## 4. 可编程金融：金条不用出库，也能质押其中一部分

日期： 11 月 24 日。

**事实：** [世界黄金协会](https://www.gold.org/news-and-events/press-releases/world-gold-council-facilitates-first-live-transactions-using-pooled)称，汇丰、摩根大通和 StoneX 在具有法律约束力的批发试点交易中，交易、结算并质押了「汇集黄金权益」（PGI）。伦敦 400 盎司金条进入隔离的资产池；参与者取得对金属的财产权，并通过实物提取完成整个生命周期。这超出了合成价格敞口的范畴，但并非零售公链产品的推出。[CoinDesk](https://www.coindesk.com/business/2026/11/24/jpmorgan-hsbc-and-stonex-complete-first-digital-gold-trades-in-london)提供了市场背景。

**Robin为何在意 —** 假设借款人还缺相当于半根金条的抵押品。它可以质押一份可分割的权益，无须切割或搬动整根金条。更值得关注的流通问题是：另一家贷款人是否会在原有安排之外接受这份权益。

**One Action：** 跟踪首笔由试点三家以外的贷款人接受 PGI、且公开抵押折扣的交易。折扣比名义成交额更能说明这项权益有多好用。

## 5. iamrobin.ai 编辑台：如果 SpaceX 收购 Tesla，谁会多一票？

日期： 11 月 24 日。

**事实：** [《金融时报》原始报道](https://www.ft.com/content/2585e45e-9133-4215-a2d8-e1275e1033b9)称，Tesla 三名董事和 SpaceX 两名董事分别参与特别委员会谈判。委员会本身并非新消息：[SpaceX 的 10‑Q](https://www.sec.gov/Archives/edgar/data/1181412/000162828026066880/spcx-20260930.htm)已披露评估潜在合并。今天新增的是谈判人员信息，仍没有可核实的最终换股比例或对价。

**Robin为何在意 —** 你的假设是，马斯克会倾向于让 SpaceX 做收购方，因为他在那里拥有更强的控制权。SunTV 可以把它变成读者能够计算、也可能证伪的命题，这比猜测 Tesla 的收购价更适合讲成一个故事。

One Action｜Codex 出版任务：在[预定正篇地址](https://iamrobin.ai/ouroboros/202611/20261125/action_item/)创建《如果 SpaceX 收购 Tesla，谁会多一票？》。论点：收购方的名字不能决定谁增加控制权；决定因素是所发行股份的类别、数量和接收者。四部分主线：（1）区分申报事实与 FT 报道；（2）根据 [SpaceX 招股书](https://www.sec.gov/Archives/edgar/data/1181412/000162828026039276/spaceexplorationtechnologi.htm)与 [Tesla 委托投票文件](https://www.sec.gov/Archives/edgar/data/1318605/000110465926116718/tm2626016d2_ars.pdf)重建交易前的投票权；（3）固定假设对价，比较两种股份类别情景下的经济所有权和投票权，明确标示为示例；（4）发布注明日期的 SunTV 来源卡，保留读者反例与更正。首个衍生内容：在 LinkedIn 发起投票，询问在相同收购价下创始人的控制权是否可能*下降*，并附上计算链接。

## 6. AI 基建：一份光通信合同把成品模块和激光器的采购年份分开了

日期： 11 月 24 日。

**事实：** [Applied Optoelectronics（AOI）](https://investors.ao-inc.com/2026-11-24-AOI-Announces-Multi-Year-Long-Term-Agreement-with-Tier-1-Hyperscale-Datacenter-Customer?asPDF=1)与一家既有超大规模数据中心客户签订多年协议：客户承诺在 **2027 年至少采购约 15 亿美元的 800G 光收发模块**，另在 **2028–2029 年采购约 7 亿美元的激光二极管**。这是最低采购承诺，尚非出货或已确认收入。

**Robin为何在意 —** 成品光模块与其中的光源，未必具有相同的利润率。按不同时间表采购它们，为 Token Factory 提出了一个工程与资本配置问题：谁获得集成价值，谁先为产能与制造良率投入资金？协议没有解决这个问题。

**One Action：** 给 Token Factory 模型加一张模块与激光器的分年收入桥，并用首次披露的实际出货及毛利率检验它。

## 7. 后期私募：Peak Energy 扩大 B 轮，把融资重点推向电池交付

日期： 11 月 24 日。

**事实：** [Peak Energy 公告](https://www.prnewswire.com/news-releases/peak-energy-expands-series-b-total-financing-to-157-million-to-accelerate-manufacturing-amid-growing-customer-backlog-302949087.html)将本轮融资更新为 **1.32 亿美元股权＋汇丰 2,500 万美元债务额度**；这是 [GM Ventures 领投的 10 月 B 轮](https://peakenergy.com/news/latest/peak-raises-108-million-new-capital)的扩充，不是再融 1.57 亿美元。公司自报客户协议逾 **25 亿美元**，资金用于萨克拉门托 4 GWh 工厂爬坡、数据中心试点及 2027 年起交付；协议金额不是收入，工厂规格也不是实际产量。

**Robin为何在意 —** 被动冷却钠离子储能必须证明制造良率、现场可用率和服务成本。制造在验收前就会消耗现金；延误会拉长这个周期。估值、优先权、债务定价、收入和可取得的投资份额均未披露。若交付能扩大规模，战略性收购是合理的可能退出路径。

One Action｜WATCH：等待首个商业客户披露已验收 MWh 占合同 MWh 的比例，再寻找二级市场投资机会。

## 8. 上市股票与生命科学：Cogent 获批的关键，是肿瘤进展被推迟了多久

日期： 11 月 24 日。

**事实：** [FDA 批准](https://www.fda.gov/drugs/cancer-approvals/fda-approves-bezuclastinib-combination-sunitinib-advanced-gastrointestinal-stromal-tumors) bezuclastinib 联合舒尼替尼治疗接受过伊马替尼的成人晚期胃肠道间质瘤。413 人随机试验中，相比单用舒尼替尼，中位无进展生存期由 **9.2 个月增至 16.5 个月**，风险比 **0.50（95% CI 0.39–0.65）**；总生存数据尚未成熟。11 月 23→24 日复权收盘，[COGT](https://stockanalysis.com/stocks/cogt/history/) **28.11→33.01 美元（+17.43%）**，[QQQ](https://stockanalysis.com/etf/qqq/history/) **651.03→638.10 美元（−1.99%）**，相差 **19.42 个百分点**。

**Robin为何在意 —** 这是相对于有效治疗的患者临床终点改善，并已改变产品的商业准入。跑赢大盘有明确的公司基本面事件可解释，但不能把中位无进展期差值理解为患者多活了 7.3 个月，也没有证据需要把成功归功于 AI。

**One Action：** 将下一项临床观察锁定为 PEAK 成熟总生存分析，特别看对照组进展后获准交叉用药如何影响解释。

---
