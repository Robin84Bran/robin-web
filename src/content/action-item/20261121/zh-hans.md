---
title: "谁有权判定智能体的工作已经完成？"
date: 2026-11-21
updated: 2026-11-21
section: Ouroboros
series: Daily Action Item
hero: /action-item/20261121/hero.webp
ogImage: /action-item/20261121/og.webp
ledgerId: AGENT-COMMERCE-ACCEPTANCE-20261121
draft: false
categories:
  - Agent Commerce
  - AI Verification
  - Financial Infrastructure
tags:
  - agent commerce
  - x402
  - A2A
  - ERC-8183
  - ERC-8004
keywords:
  - agent acceptance
  - machine payments
  - evaluator trust
  - digital delivery
author: https://iamrobin.ai/#person
sourceAction: "2026-11-21 Daily Briefing, item 5"
visualHeadline: "Delivery is only one event."
visualSubhead: "PAYMENT · ARTIFACT · ACCEPTANCE"
visualFooter: "Who may say the work is done?"
visualNodes: "QUOTE|PAY|DELIVER|ACCEPT"
thesis: "智能体商业需要可检查的验收规则，把付款、技术交付与买家认可的成果分开。"
excerpt: "智能体已经能购买服务、收取文件；更难的问题是，谁有资格判定成果可以接受。"
canonical: "https://iamrobin.ai/ouroboros/202611/20261121/action_item/zh-hans/"
inLanguage: zh-Hans
languageSlug: zh-hans
translationOf: "https://iamrobin.ai/ouroboros/202611/20261121/action_item/"
translationReview: PASS
---

# 谁有权判定智能体的工作已经完成？

网上买东西，通常有几个分明的时刻：同意价格，完成付款，收到货物，然后判断它是不是自己要的东西。

软件正逐步接手这套流程。AI 智能体是能围绕目标执行步骤的程序：寻找服务、询价、安排购买，再取回结果。在智能体商业里，一个智能体可以代表人向另一个智能体采购。标的可能是数据访问、数字服务，也可能是一份委托撰写的报告。

买家的老问题因此换了新场景。付款、交付和满意各有含义。机器越容易完成购买，系统就越需要回答：一笔订单何时才算达成了原本的目的？

几套公开流程和拟议标准，已经展示了这些环节可能如何衔接。故事从报价开始。

## 从需求走到交付

CROO 提供通过 AI 客户端购买服务的工具。其公开产品页列出三步：用户描述任务并选择服务、确认报价、在对话中接收交付。CROO 称，其 Skill——供 AI 客户端使用的一套指令——适用于 Claude Code、Codex 等客户端。

页面示例很具体：一项每月图片发布服务报价 30 USDC。USDC 是设计为跟踪美元价格的数字代币；报价另加 0.02 USDC 的“gas”，即处理区块链交易的费用，总计 30.02 USDC。交易使用名为 Base 的区块链网络。

示例还写明 CAP escrow。Escrow 即托管，在约定条件处理期间暂存款项，让钱在交易推进时有地方等待。

演示设定服务须在 30 分钟内完成，超时则退款；付款前明确请求用户批准。CROO 的保障规则称，每笔付款都需要用户批准，服务、价格或要求有变时须重新批准。

画面中的交付物是一组兑换码。

整套流程让交易容易追踪：买家看到服务与价格、批准付款、在对话中收到可使用的东西。CROO 的订单界面还把预览、确认、状态与结果获取分开。

这里的证据是公开产品演示。若有经独立核实的实际购买、买家验收决定或争议处理记录，才能进一步看到流程在真实交易中如何运作。

即便只看演示，也能看出一条关键分界。批准报价，是同意购买；收到兑换码，是记录交付。服务是否满足买家，仍要看承诺了什么，以及双方约定的条件。

**举个说明性的例子：** 快递送到门口，送达记录能证明包裹到了；拆开之后，才能核对里面是不是买的东西。AI 生成的报告也一样，只是“拆包”可能意味着核对来源、复算数据，并判断报告有没有回答原来的问题。

## 系统各自能证明什么

Amazon Web Services 描述了另一段购买流程：AI 智能体通过 AWS Marketplace 购买产品访问权限的架构。

它采用 x402。这是一项基于 HTTP 402“Payment Required”的开放支付标准。HTTP 是网络软件交换请求与响应的机制；x402 让卖家以机器可读的形式提出付款要求，让买家提交付款证明。

在 AWS 的流程里，智能体接收付款要求，通过配置好的支付系统授权并提交付款，然后访问已付费资源。

这解决了一个具体问题：程序遇到收费服务后，可以按明确流程购买访问权限。x402 白皮书也将这种模式用于 API——程序请求服务的接口——以及数据和其他数字服务。

由此生成的证据有明确边界：付款方满足了卖家的付款要求。至于买来的工作是否有用、内容是否准确，还要再判断。

Google 的 Agent2Agent 协议，简称 A2A，处理协作和交付。它让智能体按标准方式发现能力、交换工作。Google 的实现文章描述了任务从 *submitted*、*working* 走向 *completed* 或 *failed* 等状态。

任务产物称为 **artifact**，通俗说就是文件、报告或其他交付成果。

A2A 任务显示 completed，意味着远端智能体产出了 artifact，方便请求方安排下一步。商业上的验收仍取决于买家要求，以及评价成果的规则。

合起来看，这些系统让软件读懂多个事件：收到付款要求、完成付款、工作进行中、成果已交付。交付之后才是决定整笔交易意义的问题：谁来判断成果是否符合委托？

## 把验收权交给谁

ERC-8183 是一项拟议中的以太坊标准，名为 Agentic Commerce。它把验收决定设为一个明确角色。

提案引入 **evaluator（评估者）**：被指定按照要求判断交付工作的个人、程序或区块链合约。区块链合约是在链上按规则执行的软件。按照提案，评估者或评估合约可决定提交的任务是 *Completed* 还是 *Rejected*；生命周期中还有 *Expired* 这一最终状态。

在这里，完成包含了指定角色对提交成果作出的判断。提案为分配这项权力提供了一套语言。它仍是拟议标准，不能把已发表的设计当成实际采用或评估者准确性的证据。

合适的评估者要看任务性质。

对规格严格的数字交付，程序可以核对文件是否符合约定的指纹、是否包含必需字段、能否通过测试。期限同样容易测量。这些检查各自回答一个事前定义清楚的问题。

研究、设计和写作需要更宽的判断。报告可以准时送达并正常打开，来源和推理仍须细审；设计可以符合尺寸要求，却未必适合目标读者。买家复核、专业评估者，或软件检查与人工判断结合，都可能适用。

付款前写下验收标准，双方才有共同参照。保留交付的 artifact，才能检视同一份成果；事先约定申诉或退款路径，才能在意见不一致时有处理办法。

评估者本身也成为买卖双方必须信任的一方。身份、激励、判断依据和过往错误都重要，因为它的决定可能决定交易结果。

另一项以太坊提案 ERC-8004 涉及智能体身份、声誉和验证记录。它容许附带质量、成功率、正常运行时间、响应时间等数值和标签的反馈。ERC-8183 则建议把任务结果接入声誉信号。

这些记录或可帮助未来买家挑选服务方，价值却部分取决于反馈是谁给的。ERC-8004 警告，未经筛选的反馈会受到垃圾信息和 Sybil 攻击：同一人用多个身份影响系统。因此，它的汇总功能要求按客户端地址筛选。

声誉记录过去的判断；验收决定眼前这一单。两者都可能帮助市场运转，也各自需要与用途相称的证据。

目前审阅的资料包括产品流程、支付机制、协作协议和拟议标准。它们支持多种可能的验收方法；不同工作类型下哪种方法表现更好，仍是开放的研究问题。

机器可以收到付款指令、购买访问权限、取回 artifact。任务足够精确时，预先约定的测试或可决定验收；任务开放时，买家或专家可能要承担更多判断。

当一台机器能向另一台机器付款并收到文件，究竟谁有资格说：工作完成了？

资料来源：

- [CROO 公开产品流程](https://agent.croo.network/skill)
- [AWS Marketplace 与 x402 支付架构](https://aws.amazon.com/blogs/machine-learning/enable-ai-agents-to-pay-for-aws-marketplace-x402-products-with-amazon-bedrock-agentcore-payments/)
- [x402 白皮书](https://x402.org/wp-content/uploads/sites/10/2026/06/x402-whitepaper.pdf)
- Google 的 [A2A 介绍](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/)与[实现文章](https://developers.googleblog.com/build-cross-language-multi-agent-team-with-google-agent-development-kit-and-a2a/)
- [ERC-8183 Agentic Commerce 提案](https://eips.ethereum.org/EIPS/eip-8183)
- [ERC-8004 身份、声誉与验证提案](https://eips.ethereum.org/EIPS/eip-8004)
