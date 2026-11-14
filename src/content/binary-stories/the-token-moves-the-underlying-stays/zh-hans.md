---
title: "代币在流转，底层证券仍留在 DTC"
storySlug: "the-token-moves-the-underlying-stays"
date: "2026-11-14"
updated: "2026-11-14"
lane: "BUILD"
excerpt: "DTCC 没有把证券搬出 DTC。它让一比一支持的代币化权益在注册钱包之间流转：改变的是交付轨道，不是底层资产的托管地点。"
hero: "/binary-stories/the-token-moves-the-underlying-stays/hero.webp"
ogImage: "/binary-stories/the-token-moves-the-underlying-stays/og.webp"
keywords: ["DTCC", "DTC", "证券代币化", "数字孪生", "注册钱包", "Solana"]
canonical: "https://iamrobin.ai/binary/stories/the-token-moves-the-underlying-stays/zh-hans/"
inLanguage: "zh-Hans"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202611/20261114/special/"
sourceArtifactSha256: "f56fc2049471b885ce2af3186572c772e2bb29dd8366512ec02f35d3e4ee403e"
carouselPdf: "/carousels/the-token-moves-the-underlying-stays.pdf"
carouselCaption: "/carousels/the-token-moves-the-underlying-stays.txt"
carouselPages: 7
draft: false
---

代币在流转，底层证券仍留在 DTC。

“证券上链”很容易让人想象资产被搬进了另一个仓库。DTCC 的设计并不是搬仓：底层证券继续留在 DTC，由它托管；网络上移动的是一比一支持的代币化权益。这个数字孪生承载与对应证券相同的法律与经济权利。变化的是权利如何表达、交付和记录，不是证券存放在哪里。

## 一项资产，两个层次

DTC 是整个结构的锚。每一份数字权益都有对应证券支持，并非脱离底层资产另造一套经济权利。当代币化权益从一个注册钱包转到另一个，底层证券无须跟随每次转移离开 DTC。托管层保持稳定，转移层获得一条新的技术轨道。

代币也不只是一张可以丢弃的收据。DTCC 表示，它保留所代表证券的所有权利、投资者保护和经济权益。销毁代币，会把权益重新放回 DTC 的传统记录；转移代币，则把权益交给另一个获准钱包。

![底层证券留在 DTC，一比一支持的代币化权益则在受控的注册钱包网络中流转。](/binary-stories/the-token-moves-the-underlying-stays/hero.webp)

这更像是在原有金库上增加一扇受控的新门，而不是把金库换掉。

## 公共轨道也可以保留私有名单

重点在“注册”二字。这不是任何地址都能自由接收的开放式代币。现行产品资料限定由合资格的 DTC 参与者使用 DTC 注册钱包。访问控制因此是机制本身，而不是系统外的一页合规说明。

公共执行与公共访问，是两个不同的设计选择。即使代币将来沿着 Solana 这类公共网络移动，服务仍可以决定谁有资格持有、哪些钱包可以接收。

不过，Solana 的最终实现尚未公布。把现行 DTS 的参与边界延伸到未来的 Solana 连接，是依据当前设计作出的推断，并不是对已部署系统的观察。

## 生产已经发生——但在别的轨道上

服务目前已在 Canton 和 DTCC 私有 Besu 网络投入生产。7 月的生产活动有超过 30 家公司参与；10 月正式推出时，20 个 DTC 参与者签署了接入协议，超过 150 家公司曾为开发提供意见。

这些数字不能折叠成一个采用率。参与开发不等于取得访问权，签署协议也不等于完成交易，加入某次生产活动更不能证明每一家机构都做过交易。

但它们至少说明，这套托管与钱包分层的机制已经越过概念图，进入了生产环境。

## Solana 仍是将来时

DTCC 在 11 月 12 日公布了 Solana 连接计划，预计 DTC 代币化资产会在 2027 年下半年登陆该网络。

冻结的公开证据中，没有可由官方归属的 DTS Solana program、明确的生产集群，或能够从 DTS 订单追踪到最终网络签名的已完成参与者交易。DTCC 的通用 API 资料解释了订单、钱包与交易标识符，却早于 Solana 公告，不能证明这条连接已经存在。

现在时属于 Canton 和私有 Besu；Solana 属于路线图。

## 机制先于经济效果

流动性提高、成本降低和抵押品效率改善，都是公司提出的方向，尚不是现有资料中的测量结果。第一次 Solana 交易只能证明新轨道可以运作；要判断它是否更便宜、更快或更具流动性，还需要重复活动、可比成本和清楚的基线。

这套架构真正有意思的地方，是把两个经常被混写的问题拆开：证券由谁托管，权利如何流转。DTC 的托管锚可以保持不变，同时让数字权益沿着受许可的钱包网络交付。

代币在流转。

底层证券仍留在 DTC。

---

**来源：** DTCC 的[代币化服务上线公告](https://www.dtcc.com/press-releases/2026/dtcc-tokenization-service-goes-live)、[产品页面](https://www.dtcc.com/products-and-services/digital-assets/tokenization)、[7 月生产报告](https://www.dtcc.com/press-releases/2026/dtcc-turns-tokenization-into-reality)、[Solana 连接计划](https://www.dtcc.com/press-releases/2026/dtcc-tokenization-service-to-connect-with-solana)，以及经过哈希绑定的[来源 Daily Special](https://iamrobin.ai/ouroboros/202611/20261114/special/)。产品运行、参与情况和目标日期均来自公司报告。本研究没有交易或代币化任何证券，没有访问参与者账户，也没有联系公司。
