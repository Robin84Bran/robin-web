---
title: "NVIDIA掌握芯片周围的一切"
date: 2026-09-01
updated: 2026-09-01
section: Ouroboros
series: Daily Action Item
tags:
  - Artificial Intelligence
  - Semiconductors
  - NVIDIA
  - MediaTek
keywords:
  - NVIDIA NVLink Fusion
  - MediaTek custom XPU
  - heterogeneous AI infrastructure
  - NVHBM
  - AI system control layer
categories:
  - Artificial Intelligence
  - Semiconductors
  - Investing
excerpt: "定制芯片可以夺回计算核心，NVIDIA仍可通过互连、内存、网络、机架验证、软件与资本保留价值。"
hero: /action-item/20260901/hero.webp
ogImage: /action-item/20260901/og.webp
canonical: "https://iamrobin.ai/ouroboros/202609/20260901/action_item/zh-hans/"
author: https://iamrobin.ai/#person
inLanguage: zh-Hans
languageSlug: zh-hans
translationOf: "https://iamrobin.ai/ouroboros/202609/20260901/action_item/"
draft: false
sourceAction: "Daily Briefing 2026-09-01, item 5"
ledgerId: NVDA-MTK-20260901
translationReview: PASS
---

## 结论是系统控制权

**结论很直接：定制芯片可以夺回计算核心，NVIDIA仍能从周围的整套系统中赚钱。** NVIDIA向MediaTek投资35亿美元，MediaTek采用NVLink Fusion，把竞争威胁转成平台策略。云厂商可以设计自己的XPU，同时继续使用NVIDIA的互连、内存架构、网络、封装支持、机架验证与运维软件。GPU单位份额可能下降，NVIDIA在整座AI工厂中的经济捕获仍可能可观。

OpenAI的Jalapeño已经说明，专用推理芯片可以在特定负载上胜过通用平台。[8月29日的分析](https://iamrobin.ai/ouroboros/202608/20260829/action_item/)因此把“不可分割的护城河”改成“分层护城河”：计算核心变得可竞争，训练、灵活负载与周边系统更难被替代。

[NVIDIA与MediaTek宣布](https://nvidianews.nvidia.com/news/nvidia-and-mediatek-deepen-long-standing-partnership-to-build-ai-edge-to-cloud-computing-platforms)，MediaTek将为云厂商与前沿实验室的定制XPU采用NVLink Fusion；NVIDIA同时认购35亿美元MediaTek可转债。[MediaTek的公告](https://www.mediatek.com/press-room/nvidia-and-mediatek-deepen-long-standing-partnership-to-build-ai-edge-to-cloud-computing-platforms)把合作范围扩展到芯片、封装、内存、连接与机架级系统。[Reuters报道](https://www.reuters.com/world/asia-pacific/nvidia-invests-35-billion-mediatek-convertible-bonds-2026-08-31/)，NVIDIA认购了MediaTek总额39亿美元海外可转债中的大部分，Alphabet也以未披露金额参与。

当前判断是 `WATCH — COMPUTE_CORE_CONTESTABLE / CONTROL_LAYER_EXPANDING`。客户规模、附着收入、毛利与长期定价权仍是 `UNKNOWN`。行动不是追逐公告，而是把NVIDIA估值拆成计算、互连、内存、网络、软件与资本六层，按每个已部署机架的经济捕获重新核算。

## 定制芯片改变议价边界

超大规模客户开发定制加速器，是因为规模让专用化变得经济。稳定负载允许客户删除不需要的灵活性，把算术与内存路径贴合自己的模型，并形成内部参考成本。AWS有Trainium与Inferentia，Google有TPU，OpenAI有Jalapeño。每条路线都减少了对单一商用芯片供应商的绝对依赖。

定制芯片无需拿到多数负载就能改变谈判。拥有内部成本曲线的买家可以更强硬地谈剩余采购，把通用GPU留给快速变化与前沿工作，把可预测任务送往专用机器。每一代自研芯片还会积累设计、编译器与运维数据，为下一代降低门槛。

竞争边界因此移动。NVIDIA不必让每一次矩阵运算都发生在NVIDIA GPU上；它需要让客户在足够多的系统层继续依赖NVIDIA，使整套系统仍产生收入与切换成本。

一项定制XPU计划仍需要高带宽内存、纵向互连、横向网络、主机处理器、封装、供电、液冷、固件、编排、遥测与验证。客户可以逐层自建或采购，但每增加一个接口，集成劳动与失效风险都会增加。NVIDIA出售的，是从一张新芯片图纸走到稳定生产集群的最短可靠路径。

所以投资问题要从“多少加速器是NVIDIA GPU”扩展为“AI工厂中多少经济价值仍经过NVIDIA”。两者都重要，也可能向相反方向变化。

## NVLink Fusion包围XPU

[NVIDIA把NVLink Fusion描述为](https://www.nvidia.com/en-us/data-center/nvlink-fusion/)连接第三方XPU与NVIDIA平台的半定制架构。其组件显示了NVIDIA希望掌握的控制面。

**NVLink纵向互连**让紧密耦合域中的多颗加速器协同。NVIDIA称NVLink 6可为每颗XPU提供3.6TB/s双向带宽，并把72颗XPU组成一个域；更大的配置仍属于路线图。数字在第三方生产验证前都属于厂商披露，战略意图却很清楚：客户拥有计算核心，NVIDIA提供让许多核心组成一台系统的互连。

**NVLink-C2C**连接封装或模块内的芯粒。定制加速器可以通过一致、高带宽接口连接NVIDIA CPU或其他芯粒，接口也会影响封装、数据移动与后续路线图。

**NVHBM**把控制面延伸到内存。NVIDIA为高带宽内存提供定制base die与控制器，希望提升带宽、降低功耗并节省XPU晶粒面积。AWS Annapurna Labs被列为首个合作方。AI系统常被内存约束；即使算术引擎属于客户，掌握内存路径的一部分仍可保留价值。

**网络、DPU、MGX机架与验证**覆盖纵向互连之外。Spectrum-X、ConnectX与BlueField连接不同机架，MGX提供共同的供电、冷却、网络与管理。预验证设计若能缩短调试并减少故障，就击中了真实瓶颈：一颗能工作的芯片距离一座能工作的数据中心仍很远。

| 层级 | 客户可以拥有 | NVIDIA希望保留 |
|---|---|---|
| 计算 | 定制XPU架构 | 可选GPU与CPU |
| 封装 | 加速器与芯粒 | NVLink-C2C接口 |
| 内存 | 负载专用设计 | NVHBM控制器与架构 |
| 纵向互连 | 计算拓扑 | NVLink fabric与交换机 |
| 横向网络 | 数据中心网络 | Spectrum-X、ConnectX、BlueField |
| 机架 | 部署选择 | MGX、冷却、供电与验证 |
| 运维 | 调度器 | Mission Control、遥测与软件 |

护城河变得模块化。客户可以替换一层，无需替换整个平台。

## MediaTek是异构计算的桥梁

MediaTek带来芯片设计、封装、制造与跨设备、汽车、数据中心的客户关系。NVLink Fusion需要能把客户需求变成真实芯片的伙伴。NVIDIA提供接口与系统架构，MediaTek帮助设计并交付定制XPU。

35亿美元可转债投资既对齐激励，也提供资本，同时形成资本回旋问题：NVIDIA资助伙伴，伙伴开发采用NVIDIA控制层的系统，客户部署系统，新增需求再支持NVIDIA平台收入与伙伴估值。结构有战略逻辑，却不等于经济成功。

它与[8月20日Google与Marvell分析](https://iamrobin.ai/ouroboros/202608/20260820/action_item/)中的模式相似。资本可以加速供应链、锁定设计能力与加深技术协作；若把被资助的生态活动当成独立需求验证，也会掩盖真实需求。账本必须把债券投资、伙伴交付、客户现金与NVIDIA附着收入分开。

三个检验可以保持诚实：识别无需未披露补贴也选择MediaTek与NVLink Fusion的客户；比较流片、量产、良率与机架调试时间；把NVIDIA的互连、网络、内存和软件收入与投入生态的资本对账。Alphabet参与已获报道确认，但金额与战略条款未披露，经济意义保持 `UNKNOWN`。

## Trainium与Jalapeño显示市场形态

[AWS将Trainium描述为](https://aws.amazon.com/ai/machine-learning/trainium/)用于生成式AI训练与推理的自研芯片。AWS控制负载、云分发、软件、网络与采购，足以承担多代芯片计划。NVIDIA的现实回应不是要求AWS放弃自研，而是争取周边层，以及仍重视灵活性与生态的工作负载。

Jalapeño从模型公司方向证明同一逻辑。专用推理引擎可以围绕已知模型、延迟目标与服务行为优化。生产规模、可靠性、良率与完整成本仍未披露，但技术方向可信。NVIDIA的系统策略接受这一方向，并试图把自己的接口接到下一颗定制芯片上。

异构市场因此成为基准情景：前沿训练与快速变化研究继续偏好通用系统；稳定大规模负载在节省超过设计与运维成本时迁往定制XPU；云厂商运行混合集群；NVIDIA同时以计算供应商和外部计算的共同系统层竞争。

异构性提高标准与互操作性的价值，也给开放fabric和竞争对手留下入口。只有当客户认为NVIDIA的集成收益高于替代方案的自由与价格时，NVLink Fusion才会获胜。公告只是市场路径，不是标准已经胜出。

## 资本能加速采用也能掩盖需求

产品战略与投资战略必须分开承保。资本可以缩短伙伴开发周期、预留工程资源、让客户相信生态会持续。可转债与直接购买普通股的风险结构不同，完整转换条款仍需发行文件确认。

资本也制造反身性：NVIDIA估值上升扩大融资能力，融资扩大生态，生态活动强化需求预期，预期又可能支持估值。只有当独立客户为有用系统付款、现金流超过用来创造生态的资本时，循环才健康。

若被资助伙伴互相采购却没有独立终端需求，若部署公告替代已投产系统，或同一预期收入出现在多家公司叙事中，循环会变脆弱。证据链必须按顺序建立：投资已经确认，定制XPU路径已经确认；客户订单、运行机架、附着收入和实现回报仍为未知。

## 六个指标决定护城河是否移动

第一，**第三方XPU部署**：统计客户设计、流片、量产机架与验收站点。伙伴公告只证明方向一致。

第二，**附着率**：统计外部XPU采用NVLink、NVHBM、网络、CPU、DPU、机架和软件的比例。逐层份额比单一综合份额更有用。

第三，**每机架经济捕获**：估算定制XPU机架为NVIDIA带来的收入与毛利，并与GPU机架比较。收入较低但资本强度也低仍可能有吸引力；收入与毛利同时大幅下滑，则说明控制层无法补偿计算核心。

第四，**部署优势**：记录从设计冻结、流片、交付、调试到稳定利用率所需时间。预验证应降低集成劳动、故障率与延误，必须由客户数据证实。

第五，**客户独立性**：跟踪开放互连、替代网络、自研内存控制器与软件可移植性。存在可用替代品后客户仍重复选择，才是强控制层。

第六，**资本效率**：把伙伴融资与附着收入、投资收益、现金回收和信用风险对账。战略资本应产生长期经济捕获，而不只是更大的公告管线。

| 指标 | 当前证据 | 升级触发 | 反证 |
|---|---|---|---|
| XPU部署 | MediaTek路径已公告 | 具名量产客户与机架 | 一再延期或只停留样机 |
| 附着率 | 架构已披露 | 分层出货量 | 客户避开NVIDIA各层 |
| 每机架捕获 | `UNKNOWN` | 收入与毛利披露 | 离开GPU后价值严重流失 |
| 部署优势 | 厂商声称预验证 | 调试时间实测改善 | 无成本、时间或可靠性收益 |
| 客户独立性 | 替代方案存在 | 自愿重复采用 | 锁定促使客户迁离 |
| 资本效率 | 已投入35亿美元 | 现金回报与附着收入 | 资助活动缺少终端需求 |

## 仓位纪律跟随控制层证据

NVIDIA投资论点现在需要两张记分表。计算表跟踪GPU负载份额、价格、训练需求、推理组合与路线图表现；控制层表跟踪NVLink Fusion部署、NVHBM采用、网络附着、机架验证、软件使用与第三方XPU的经济捕获。

这样可以避开两个错误：把每颗定制芯片都当作NVIDIA整机损失；把每份NVIDIA接口公告都当作永久护城河。定制硅可以扩张，NVIDIA也可以保留大量价值；开放标准也可能削弱控制层。

仓位上，保留对前沿系统的当前强度，同时下调对“不可分割推理垄断”的信心。只有外部XPU规模出货、且NVIDIA披露有意义的附着经济时，才升级系统控制论点。若大客户以非NVIDIA内存、互连、网络与编排运行自研计算，或系统收入无法补偿GPU份额压力，则降级。

Robin的行动很具体：在现有计算表旁增加季度控制层表；记录已确认量产，不记录公告容量；资本交易与客户需求分开；提高终值前，必须建立从定制XPU到NVIDIA现金流的桥。

芯片仍重要，机架决定芯片能否有用。NVIDIA对定制芯片的回答，是掌握从芯片到服务的更多路径。投资问题是：当客户拥有中心之后，是否仍愿意为这条路径付款。

## 分类与关键词

**分类：** 人工智能、半导体、投资

**关键词：** NVIDIA NVLink Fusion、MediaTek定制XPU、NVHBM、NVLink-C2C、AWS Trainium、OpenAI Jalapeño、异构AI基础设施、AI机架经济、NVIDIA系统护城河、资本回旋

**Hashtags:** #AIInfrastructure #Semiconductors #NVIDIA #MediaTek #CustomSilicon
