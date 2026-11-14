---
title: "DTCC 通往 Solana 的路，要走到 2027 年"
date: "2026-11-14"
updated: "2026-11-14"
section: "Ouroboros"
series: "Daily Special"
lane: "RESEARCH"
tags: ["代币化", "市场基础设施", "Solana"]
keywords: ["DTCC 代币化服务", "DTC", "Solana", "Canton Network", "Besu"]
categories: ["研究", "市场基础设施"]
excerpt: "DTCC 的代币化服务已在 Canton 和 Besu 上运行；Solana 接入目标在 2027 年，下一项关键证据是一笔可公开追溯的 Solana 交易。"
hero: "/daily-special/20261114/hero.png"
ogImage: "/daily-special/20261114/og.png"
canonical: "https://iamrobin.ai/ouroboros/202611/20261114/special/zh-hans/"
author: "https://iamrobin.ai/#person"
inLanguage: "zh-Hans"
draft: false
translationReview: "PASS"
sourceSignal: 4
researchScope: "这是一项基于公开资料的有界研究，追踪 DTCC 从计划接入 Solana 到可归属交易的路径；未执行交易、代币化指令、公司联系、资金配置或任何底层投资与实施决策。"
artifactSha256: "f56fc2049471b885ce2af3186572c772e2bb29dd8366512ec02f35d3e4ee403e"
evidenceSources: ["https://www.sec.gov/files/tm/no-action/dtc-nal-121125.pdf", "https://www.dtcc.com/press-releases/2026/dtcc-turns-tokenization-into-reality", "https://www.dtcc.com/press-releases/2026/dtcc-tokenization-service-goes-live", "https://www.dtcc.com/products-and-services/digital-assets/tokenization", "https://www.dtcc.com/press-releases/2026/dtcc-tokenization-service-to-connect-with-solana", "https://dtcclearning.com/products-and-services/dtcc-digital-assets/digital-asset-solutions/tokenization-service.html", "https://dtcc-da.com/api/tokenization-service/api-reference-guide/content"]
---
# DTCC 通往 Solana 的路，要走到 2027 年

金融市场依赖一个看似简单的问题：谁对哪项证券享有权益？一股股票可能多次易手，但始终需要有人可靠地记录其背后的权益、它带来的收益，以及持有人享有的权利。这些工作有很大一部分由一些机构在内部完成，而它们的名字很少出现在投资者的屏幕上。

美国存管信托与清算公司（Depository Trust & Clearing Corporation，简称 DTCC）就是其中之一。其证券存管子公司美国存管信托公司（Depository Trust Company，简称 DTC）负责持有证券，并记录参与金融机构对这些证券享有的权益。DTCC 在 2026 年 10 月的服务上线公告中表示，DTC 托管的资产超过 114 万亿美元。这样的规模，也就解释了为什么其记账基础设施的变化会受到关注。

如今，DTCC 正在为符合条件的参与者提供另一种持有和转移这些权益的方式：将其变成区块链网络上的数字代币。区块链是一种追踪交易的共享电子账本。DTCC 的代币化服务已经在两个网络上处理了生产环境中的业务活动。2026 年 11 月 12 日，DTCC 宣布，公有区块链 Solana 将成为未来接入的网络，预计于 2027 年下半年开放使用。

要理解这则公告，首先要弄清楚实际转移的是什么。

## 证券仍由 DTC 持有

在这项服务中，底层证券仍由 DTC 持有，并登记在 DTC 的名义持有人 Cede & Co. 名下。代币代表的是参与机构的*证券权益*：即记录在册、由该机构对 DTC 所持证券享有的权益。

符合条件的参与者指示 DTC，将这项权益转入一个数字综合账户，由该账户集中管理服务中的权益。随后，DTC 的软件创建，也就是“铸造”，相应的代币，并将其发送至已登记的钱包——这是与符合条件的参与者关联、经过批准的数字地址。代币可以在已登记的钱包之间转移。销毁代币，也称“燃烧”，则会将该权益转回 DTC 的传统电子记录中。

可以打个比方：一件物品一直存放在仓库里，而代表对它享有权益的授权凭证在不同持有人之间流转。在这里，证券继续处于托管之中，代币则通过另一套记账系统承载参与者的权益。这个比喻解释了转移的过程；法律权利则来自实际的服务安排。DTCC 表示，其代币化证券保留了传统证券所具有的所有权、投资者保护和经济权益。

DTC 也在区块链之外维护一份官方记录。其 LedgerScan 系统会观察代币的流转，并记录代币化权益。

因此，准入边界十分重要。Solana 是公开网络，而这项具体服务仍仅向使用已登记钱包、符合条件的 DTC 参与者开放。网络的公开可访问性与服务的参与者规则，描述的是这套安排中的两个不同层面。

## 这项服务如何进入生产环境

监管基础先行。2025 年 12 月 11 日，美国证券交易委员会（SEC）交易与市场部工作人员就 DTC 所描述的初步服务出具了一封附带条件的不采取行动函。这类函件根据提交的事实和情况，阐明工作人员对于依据特定条款采取执法行动的立场。

函件的适用范围很具体：这是一项供 DTC 参与者自愿使用的服务，参与者须使用已登记的钱包。函件所述的合格证券包括罗素 1000 指数成分股，以及后来纳入该指数的股票；美国国债；以及追踪主要指数的交易所交易基金。罗素 1000 是一个由美国大型公司组成的指数。

这一框架也对初步服务设置了限制。在 DTC 的风险管理计算中，代币化权益的抵押品价值或结算价值均计为零。工作人员的这一立场计划在服务上线三年后到期，并可能被修改或撤销。其法律适用范围仍限于函件涉及的条款和情况。

下一个里程碑出现在实际运营层面。DTCC 表示，2026 年 7 月 15 日，它处理了涉及 DTC 代币化资产的生产环境真实交易，有超过 30 家机构参与。

这些转换发生在 Canton Network 和 DTCC 运行 Besu 区块链软件的私有网络上。Canton Network 是一个用于金融活动的区块链网络。据报告，相关业务流程包括证券借贷、将资产质押为抵押品，以及协调证券交付与付款的交易，也包括股票代币的转移。

这些是这项更广泛服务在上述两个网络上的具体应用。它们表明，由 DTC 持有的证券所对应的权益已经进入生产环境中的区块链业务流程。

10 月 28 日，DTC 正式推出 DTCC 代币化服务（DTCC Tokenization Service，简称 DTS），并已完成与 Canton 和私有 Besu 网络的集成。DTCC 表示，已有 20 家 DTC 参与者签署了服务接入协议，后续还会有更多用户陆续加入。开发期间，有超过 150 家机构提供了意见。

每个数字回答的问题都不同。参与开发咨询的机构数量反映了征求意见的广度。7 月的参与者数量反映了有多少机构参与了所报告的生产活动。已签署的协议则反映了服务上线时的接入承诺。持续使用的情况，还需要专门的活动指标来衡量。

看待这项服务涉及的巨额资产数字时，也需要同样审慎。DTCC 的产品页面显示，上线时有 34 只证券可供代币化，并在服务介绍中列出了约 30 万亿美元的托管资产。上线公告则另行给出了 DTC 更广泛的托管资产总额：超过 114 万亿美元。

这些数字描述了可用范围和托管规模。衡量采用情况，需要看实际转换为代币的价值，以及使用这些代币完成的交易。衡量经济效益，则需要有关成本、耗时，以及参与者完成同类业务所需资金量的证据。

## Solana 在哪里加入这段进程

11 月 12 日的公告明确了一个未来将接入的网络，以及目标时间窗口。DTCC 表示，预计 DTC 代币化资产将于 2027 年下半年在 Solana 上开放使用，功能包括将符合条件的资产转换为代币，以及对这些代币进行全生命周期管理。

这将增加符合条件的参与者持有和转移 DTC 记录权益的场所。其意义在于，将成熟的证券托管体系与另一个区块链的交易系统连接起来。

时间上的区别很清楚：2026 年 7 月，DTCC 报告了 Canton 和 Besu 上的生产活动；10 月，整体服务正式上线；11 月，Solana 的计划接入安排随后公布，目标时间定在 2027 年。

公开技术文档有助于理解现有服务。DTCC 学习中心日期为 10 月 30 日的页面提供了用户指南和公开应用程序编程接口参考文档的链接，后者是供软件开发者连接系统时使用的说明。这份参考文档涵盖账户、钱包、转换指令和公司行动，也就是服务必须处理的证券相关事件。

这份参考文档最近一次发布于 10 月 14 日，早于服务上线和 Solana 公告。它提供的是服务的通用文档。要确认 Solana 的生产运行状态，还需要专门针对该网络的证据。

截至研究截止时间，即香港时间 2026 年 11 月 14 日上午 10 时 32 分，所审阅的公开来源表明，Solana 是计划于 2027 年下半年接入的网络。任何非公开工程开发或测试进展如何，仍是一个有待回答的问题。

首笔来源可明确追溯的 Solana 交易，将为这段进程带来另一类具体信息。一份带日期的记录，会将参与的 DTC 实体和一只符合条件的证券，与一个 Solana 程序地址及一个交易标识符关联起来。程序地址用于标识处理这笔交易的软件。这份记录还会显示完成了哪一步：铸造、转移或销毁代币，以及该步骤的完成状态和任何撤销或异常情况。

这样的记录将证实 Solana 上发生了一次实际的 DTS 业务事件。至于成本更低、流动性更强或抵押品使用效率更高等说法，届时还各有需要通过实测业务活动回答的问题。

目前，这段进程有两项不同的成果：一项已经进入生产环境的证券代币化服务，以及一项明确了网络和目标时间的未来接入安排。当某项具体的 DTC 权益在 Solana 上完成某个具体步骤，并且公开记录能让读者追踪这一过程时，下一章就会变得切实可见。

来源：[SEC 工作人员函件，2025 年 12 月 11 日](https://www.sec.gov/files/tm/no-action/dtc-nal-121125.pdf)；DTCC 的[7 月生产活动报告](https://www.dtcc.com/press-releases/2026/dtcc-turns-tokenization-into-reality)、[10 月上线公告](https://www.dtcc.com/press-releases/2026/dtcc-tokenization-service-goes-live)、[11 月 Solana 公告](https://www.dtcc.com/press-releases/2026/dtcc-tokenization-service-to-connect-with-solana)和[服务页面](https://www.dtcc.com/products-and-services/digital-assets/tokenization)；[DTCC 学习中心](https://dtcclearning.com/products-and-services/dtcc-digital-assets/digital-asset-solutions/tokenization-service.html)和[API 参考文档](https://dtcc-da.com/api/tokenization-service/api-reference-guide/content)。
