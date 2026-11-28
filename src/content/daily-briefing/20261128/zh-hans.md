---
title: "🏹 Robin 每日信号简报，2026年11月28日"
date: 2026-11-28
updated: 2026-11-28
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
hero: /daily-briefing/20261128/hero.webp
ogImage: /daily-briefing/20261128/og.webp
canonical: "https://iamrobin.ai/ouroboros/202611/20261128/zh-hans/"
author: https://iamrobin.ai/#person
inLanguage: zh-Hans
languageSlug: zh-hans
translationReview: PASS
translationOf: "https://iamrobin.ai/ouroboros/202611/20261128/"
draft: false
sourceMode: autonomous_research
fallbackReason: "NONE_FALLBACK_DEADLINE"
---

**今天最值得看的实验，是一笔补贴即将消失。** OKX 允许已报名用户用某些股票代币作借款抵押，同时分享 USDT 奖励。香港时间今晨 07:59，活动按条款结束。补贴存在时，持仓说明有人愿意拿奖励；补贴消失后仍有人借款，才更能说明这种抵押品有用。

## 1. 前沿模型与一人公司：GLM-5.4 能看图写代码，RobinOS 更该测它能不能自己返工

日期： 11 月 23 日。

**事实：** 智谱发布 GLM-5.4，将视觉输入与编程结合，展示了用 FreeCAD 创建六轴机械臂的案例。发布时已开放 Coding Plan、ZCode 和聊天入口；[官方公告](https://z.ai/blog/glm-5.4?lang=en)把通用 API 和开放权重列为后续事项，未给出可用于核算生产成本的 API 单价。案例证明它生成过设计，不证明它能无人值守地修好失败设计。

**Robin为何在意：** 现有订阅用户先得到的是一个能看见自己工作结果的候选执行者。对 RobinOS，真正可能省掉的是你截屏、指出错误、再催它改的那一轮；依赖通用 API 的工作流还不能按演示效果直接切换。

**One Action：** 取同一个带有已知布局错误的页面，让 GLM-5.4 与现用 Codex 各自读截图、修复并复验；以无需 Robin 提示且通过相同验收的修复数，决定是否给它分配任务。

## 2. 实体 AI：湾区的 Lucid 无人车撤走了车内安全员，尚未开始收费载客

日期： 11 月 24 日。

**事实：** [Nuro、Lucid 与 Uber](https://www.nuro.ai/blog/nuro-lucid-uber-begin-driverless-testing-on-public-roads)在湾区四座城市启动无车内安全员的道路测试。Lucid 已为这一阶段交付超过 **100 辆**汽车；员工乘车是下一步，向公众开放仍是 **2027 年第一季度目标**。中国的对照更进一步：[小马智行与丰田](https://ir.pony.ai/node/8791/pdf)已于 11 月 16 日启动 bZ4X 无人商业服务。

**Robin为何在意：** 美国这个项目跨过了撤走车内安全员的门槛，中国这个项目跨过了收费服务的门槛。两者都没有给出可比的单均成本。Uber 的分发优势是否值钱，最终取决于一辆车能独立完成多少付费订单。

**One Action：** 把 Uber 项目的下一道验证门槛定为每辆上线车每天完成的无人付费行程数，不用采购承诺代替。

## 3. 加密资金流：两大稳定币一个月少了 103.4 亿美元，Arc 上的 USDC 却增加了

日期： 截至 11 月 27 日的 30 天。

**事实：** 按 [Castle 对 DefiLlama 数据的整理](https://castlelabs.io/research/stablecoins)，USDT 净发行 **−82.2 亿美元**，USDC **−21.2 亿美元**；同一口径下，Arc 上的 USDC 却增加 **6.879 亿美元**。另一个容易误读的数字是周五 BTC ETF 的“0.0”：核对 [Farside 原表](https://farside.co.uk/bitcoin-etf-flow-all-data/)时，基金分项仍是横线，不能据此宣布赎回停止。

**Robin为何在意：** 行业内最主要的两种链上美元在收缩，同时余额正向部分网络集中。Arc 值得跟踪，但供给增加既可能是资金迁移或库存，也可能是结算需求；它本身不证明交易更活跃。

**One Action：** 在下一期 30 日读数里，将 Arc 的 USDC 增量与剔除铸造、销毁、跨链搬迁及明显自转后的重复付款地址数对照；两者同升才上调支付需求判断。

## 4. 可编程金融：同一份股票代币，既能抵押借款，还能领平台补贴

日期： 11 月 28 日 07:59 香港时间，活动截止。

**事实：** [OKX 条款](https://www.okx.com/help/okx-hold-to-earn-hold-select-tokenised-stocks-to-share-400000-usdt)把 xSPCX、xQQQ 等十种代币列入 **40 万 USDT** 奖池，且弹性借贷抵押账户里的合资格余额也可计入。举例说，已提前报名的人可以拿 xSPCX 作抵押，同时凭持仓分奖励；当日资格按随机快照中的**最低合计持仓**计算。奖励是平台补贴，不是 SpaceX 股息，也不是普通 SPCX 股票持有人自动获得的空投。

**Robin为何在意：** 有意思的是平台能为“把资产留下来”单独定价。乐观解释是它帮新抵押品度过冷启动；另一种解释是余额只是被临时买来的。实际参与人数、借款额和留存尚未核实。

**One Action：** 看奖励结束七天后，合资格股票代币的抵押借款余额还剩多少；若平台不披露，就把留存记为未知，不拿成交量代替。

## 5. SunTV 编辑台：一个叫 Neon 的账号参赛了，谁证明它赚了钱？

日期： 11 月 27 日。

**事实：** [make.fun 的公开参赛档案](https://make.fun/u/neon-autonomous)列出了 `@neon-autonomous` 当日提交的文本差分和 PNG 压缩作品，也保留了此前的模拟交易参赛记录。页面能证明这个账号提交了作品；它不能单独证明 Google 运营该账号、模型开发了平台、全程无人介入，或参赛者取得了扣除成本后的现金利润。

**Robin为何在意：** 你发现的报道切口比“这是不是广告”更强：即使帖子完全属实，**参赛、获奖、收款、盈利仍是四件事**。这很适合 SunTV 做成读者能亲自复核的短调查。

**One Action：** 新建 The Agent Entered the Contest. Who Got Paid?／《智能体参赛了，钱付给了谁？》，拟定[英文主页面](https://iamrobin.ai/ouroboros/202611/20261128/action_item/)。论点： 只有把作品、归属、实际到账和运行成本连起来，才能从“参赛”推到“赚钱”。证据线： ① 复原一条 11 月 27 日参赛记录；② 分开平台、账号、模型与运营者；③ 对照比赛规则、结果、付款凭据及成本，查不到的留白；④ 以一项获准公开的 Alpha Lab 失败实验作反例。主来源： [参赛账号及所链接的单场赛事](https://make.fun/u/neon-autonomous)、Robin 的原始实验日志、[SunTV 既有证据标准](https://iamrobin.ai/ouroboros/202610/20261026/special/)。首个衍生内容： LinkedIn 发一张“这张截图最多证明哪一步？”证据卡；把读者提交的最强反证按日期补回主文。

## 6. AI 基建：日本最大电力公司想把算力客户带到电厂旁边

日期： 11 月 27 日，日本。

**事实：** 据[路透引述日经对 JERA 董事长的采访](https://www.reuters.com/world/asia-pacific/japans-jera-enters-talks-with-anthropic-meta-build-data-centres-nikkei-reports-2026-11-26/)，JERA 正与 Anthropic、Meta 等讨论在东京圈电厂附近建设数据中心。与 10 月 1 日 [JERA、Dell、RHAELM 的千叶谅解备忘录](https://www.jera.co.jp/en/news/information/20261001_2535)相比，新信息是潜在客户范围扩大；没有披露这些客户签了容量合同、承诺付款或确定送电日。

**Robin为何在意：** 靠近发电机可能缩短供电路径，却不自动取得全天候可用的电力。对你的 Texas 100 MW 研究和美国基建战略岗位，真正有价值的是能说清：电厂检修时谁补电、按什么价格、谁承担停机。

**One Action：** 给 Texas 100 MW 案例补一个“主机组检修一周”的情景，算出有无备用电源时每个可交付 GPU 小时的成本差。

## 7. 后期私募：Netskrt 的投资问题，藏在两场比赛之间

日期： 11 月 24 日。

**事实：** 内容分发商 [Netskrt 的 B 轮首关](https://www.netskrt.io/blog/netskrt-secures-10-million-series-b-funding)到账 **1,000 万美元**，整轮目标最高 **3,000 万美元**。参与者有 Yaletown、Crédit Mutuel Equity 和加拿大出口发展局；未单列领投方，估值、收入和优先条款未披露。公司称今年已分发逾 **550 场**体育直播，资金用于扩张靠近用户的网络节点；未核实 Robin 可认购的份额。

**Robin为何在意：** SunTV 知道直播卡顿的代价，资本配置者还要问：终场哨后，服务器由谁付钱？设备与容量需要投入，赛事尖峰不等于全年利用率。被电信商或大型分发平台收购是可能的退出路径，不是已知交易。

**One Action：** 等一份同一节点在赛事日与非赛事日的毛利贡献对照，再决定这究竟是能复用的分发网络，还是昂贵的峰值保险。

## 8. 上市公司：黄仁勋复任后，英伟达仍跑输黑五反弹

日期： 11 月 27 日美股提前收盘。

**事实：** 从 11 月 25 日至 27 日复权收盘，[NVDA](https://stockanalysis.com/stocks/nvda/history/) 从 **149.30** 升至 **150.49 美元（+0.80%）**，[QQQ](https://stockanalysis.com/etf/qqq/history/) 从 **633.93** 升至 **650.99 美元（+2.69%）**；英伟达落后 **1.89 个百分点**。公司于 [11 月 23 日公告](https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Board-Reinstates-Jensen-Huang-as-President-CEO-and-Board-Director/)黄仁勋恢复 CEO 和董事职务。

**Robin为何在意：** 公司特有的变化是领导层重新确定。周五科技股普涨，而 NVDA 相对落后；一天的价差既不能证明客户削单，也不能证明整个板块只是折现率变化。把治理判断与 GPU 需求预测分开，才不会对同一条消息改两次估值。

**One Action：** 下一次调整 NVDA 盈利预测前，先查公司是否改变数据中心收入指引；若只变了治理判断，就只调整风险假设。

---
