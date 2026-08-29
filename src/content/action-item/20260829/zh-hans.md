---
title: "客户造出了更好的芯片"
date: 2026-08-29
updated: 2026-08-29
section: Ouroboros
series: Daily Action Item
tags:
  - Artificial Intelligence
  - Semiconductors
  - NVIDIA
  - OpenAI
keywords:
  - Jalapeño inference ASIC
  - NVIDIA inference moat
  - custom AI accelerators
  - inference economics
  - AI infrastructure capital
categories:
  - Artificial Intelligence
  - Semiconductors
  - Investing
excerpt: "OpenAI的Jalapeño证明定制推理芯片已经成为真实竞争层；NVIDIA的训练平台、部署规模与整机经济仍是决定投资判断的关键。"
hero: /action-item/20260829/hero.webp
ogImage: /action-item/20260829/og.webp
canonical: "https://iamrobin.ai/ouroboros/202608/20260829/action_item/zh-hans/"
author: https://iamrobin.ai/#person
inLanguage: zh-Hans
languageSlug: zh-hans
translationOf: "https://iamrobin.ai/ouroboros/202608/20260829/action_item/"
draft: false
sourceAction: "Daily Briefing 2026-08-29, item 5"
ledgerId: AI-20260829-JALAPENO-INFERENCE-01
translationReview: PASS
---

## 结论是护城河已经分层

**结论很直接：OpenAI的Jalapeño证明定制推理芯片已是现实竞争层；NVIDIA仍拥有强大的训练平台和巨大的部署领先。** 把这两件事强行压成“谁赢谁输”，会制造错误投资判断。大客户可以继续采购NVIDIA用于训练和快速变化的前沿负载，同时把稳定推理迁移到自研芯片。NVIDIA收入可以继续增长，长期推理份额与议价权也可以同步收窄。

[OpenAI首次公开结果](https://openai.com/index/jalapeno-first-results/)显示，Jalapeño在GPT‑OSS 120B、DeepSeek R1 670B与Kimi K2.5 1T上，峰值吞吐时每瓦完成的AI工作比对比的GB200或GB300系统高1.5至1.9倍，端到端延迟低1.7至3.6倍。芯片封装额定功率为700W，测试负载下持续实测功率不超过550W。OpenAI计划在年底前将其部署到内部基础设施，第二代正在开发，第三代已经成形。

这是有意义的工程证据，也是第一代、由发行方主导、围绕OpenAI自身服务需求设计的系统证据。生产集群规模、可用率、良率、网络与内存成本、软件维护、覆盖负载尚未披露。正确状态是 `WATCH — VALIDATED_INFERENCE_CHALLENGER / NOT_YET_SCALED`。

Jalapeño立即改变一项前提：Blackwell不再等同于不可逾越的推理效率上限。另一项前提仍成立：通用加速计算、CUDA软件、机架级网络与快速迭代路线图，让NVIDIA平台的覆盖面远大于单颗专用芯片。

## 用整机口径阅读benchmark

标题数字比较每单位电力完成的有效AI工作，以及用户实际感受到的延迟。这正是推理经济应该采用的方向。采购者支付的是完成的请求、电力、冷却、内存、网络、软件和可靠性，而不是纸面峰值算力。

OpenAI采用SemiAnalysis开发的公开InferenceX benchmark。[SemiAnalysis说明了其测试参与方式](https://newsletter.semianalysis.com/p/openai-jalapeno-better-than-nvidia)，[Tom's Hardware的技术审查](https://www.tomshardware.com/tech-industry/semiconductors/openai-says-its-jalapeno-chip-beats-nvidias-gb300-in-first-published-benchmarks)补充了比较边界。三款公开模型覆盖不同规模与服务特征，测试也包含多个运行点。

证据必须分层。OpenAI发布Jalapeño数据并选择系统配置；SemiAnalysis提供benchmark方法并参与实验室测试；NVIDIA没有在这次披露中提交对比系统；Vera Rubin未进入测试；Jalapeño不能训练；OpenAI内部前沿模型结果仍是公司陈述。

投资台账应记录三个层级：`CONFIRMED_PUBLIC_RESULT`用于公开InferenceX结果与封装功率归一化；`COMPANY_DISCLOSURE`用于OpenAI内部结果、部署计划和多代路线图；`UNKNOWN_PRODUCTION_ECONOMICS`用于集群规模、利用率、可靠性、良率、装机成本、软件人力和每个有效token的整机成本。

[MLCommons的MLPerf Inference v6.0](https://mlcommons.org/2026/04/mlperf-inference-v6-0-results/)提供另一组控制证据。它加入GPT‑OSS 120B并扩展DeepSeek-R1交互测试，共有24家机构提交。MLPerf与InferenceX用途不同，不能拼成一张虚构排名表。两者共同说明：推理比较必须明确负载、延迟约束与系统边界。

## 专用推理与通用训练承担不同工作

Jalapeño是推理ASIC。专用化可以删去OpenAI稳定服务负载不需要的电路、灵活性和软件路径，换取更低功耗、更低延迟，以及围绕既定模型、精度、内存、网络和请求模式的整机优化。代价是适用面更窄，对负载变化更敏感。

NVIDIA出售的是平台。[NVIDIA Blackwell架构页面](https://www.nvidia.com/en-gb/data-center/technologies/blackwell-architecture/)覆盖GB200、GB300、DGX SuperPOD、HGX及企业系统，支持训练、微调、科学计算、Physical AI、图形与多种推理负载。CUDA、TensorRT、网络、库、编排与开发者生态共同构成平台价值。

模型结构快速变化、训练规模巨大、客户需要一套集群吸收多类负载时，这种广度价值最高。超大客户拥有庞大而稳定的请求流，并能把设计、编译和运维成本分摊到数十亿token上时，专用芯片的经济性开始成立。

因此，前沿预训练与快速变化研究仍偏向NVIDIA平台；稳定的大规模推理可以由定制ASIC争夺；长尾企业推理仍依赖NVIDIA与云分发；OpenAI原生产品最能发挥全栈协同。真实市场很可能长期异构。OpenAI可以同时是定制芯片建设者和NVIDIA最大的客户之一。

## OpenAI只需迁移可预测负载

达到经济门槛不需要全面替代。ChatGPT、Codex与Agent产品产生大量重复服务模式，其中一部分负载足够稳定，可以围绕模型族、上下文长度、精度、批处理和延迟目标优化。每迁移一个请求，都在边际上减少外部加速器需求，并为仍留在NVIDIA上的负载建立内部参考价。

客户由此获得四种杠杆：把供应商报价与内部成本曲线比较；把稀缺GPU留给训练和快速变化负载；协同设计模型、编译器、内存、网络与芯片；让每一代自研芯片沉淀下一代所需的运行经验。

规模决定这些优势能否穿过会计报表。定制芯片包含一次性工程、掩膜、软件、验证、良率、库存与运维成本。利用率下降或外围系统更贵，芯片级优势就会消失。OpenAI需要足够稳定的token基数来摊薄这些成本。

公开合作说明共存才是基准情形。[OpenAI与Broadcom宣布](https://www.broadcom.com/company/news/product-releases/63631)共同部署10GW OpenAI设计加速器与以太网系统，计划2026年下半年开始上架、2029年底完成。[OpenAI与NVIDIA另行披露](https://openai.com/index/openai-nvidia-systems-partnership/)拟建设10GW NVIDIA系统，并从Vera Rubin开始。2026年2月，[OpenAI又说明](https://openai.com/index/scaling-ai-for-everyone/)计划使用3GW NVIDIA专用推理与2GW Vera Rubin训练容量。

这些是合作与计划，不是已交付利用率。它们仍揭示组合策略：采购一切可信算力来源；在NVIDIA平台值得溢价的地方使用NVIDIA；在自身负载能产生经济优势的地方建设定制容量。

## 资本回旋最终变成议价权

关系形成一条回路：NVIDIA资本与系统进入OpenAI；OpenAI获得算力；算力产生前沿模型和产品需求；模型、编译器与运行数据进入Jalapeño；更低的内部推理参考成本再回到NVIDIA供应谈判。

这不意味着NVIDIA资助自身毁灭。NVIDIA的资本用于扩大AI需求并锁定系统部署；OpenAI利用所有资源建设产品与基础设施。当一个客户拥有足够负载和工程能力，自研芯片是理性结果。

关键变量是参考成本。如果Jalapeño每个有效token的可靠内部成本低于NVIDIA整机价格，OpenAI就能对仍在GPU上的负载提出更强价格要求。定制集群无需占据多数份额，就能改变商业条款。可信的外部选项在改变总量之前，先改变谈判。

NVIDIA可以用更快代际、更强软件、一体化网络、供应保障和更低客户运维负担回应，也可以让客户把自研全成本与即用平台比较。Vera Rubin重要，因为今天只比较到GB300。耐久的定制芯片论点必须经得起下一代NVIDIA系统。

## 五个变量决定投资判断

第一是**实际部署芯片数**。OpenAI宣布年底部署与多代路线图，运行中的加速器、机架和站点数量仍是 `UNKNOWN`。计划GW不能算作已运行容量。

第二是**负载份额**。按产品和模型记录Jalapeño承担的OpenAI推理比例。稳定Agent负载中的持续占比增长能证明商业意义；狭窄内部试点只能证明技术能力。

第三是**整机TCO**。分母应是给定延迟和质量目标下，每次成功请求的成本。加速器、内存、网络、主机、电力、冷却、利用率、停机、软件工程、模型转换和库存都要进入。OpenAI发布的电力效率只是其中一项。

第四是**可靠性与量产学习**。跟踪可用率、错误、良率、维修、利用率、部署节奏和代际改善。第二代、第三代能否按时复制循环，决定Jalapeño是一次芯片还是一套平台。

第五是**NVIDIA经济性**。跟踪数据中心收入、推理组合、毛利率、定价、供应承诺、HBM可得性与大客户自研比例。客户ASIC可以在总收入下降之前，先影响产品组合与毛利率。

当前可确认的只有公开benchmark、年底部署计划与多代路线图。工作负载份额、整机TCO、生产可靠性、NVIDIA毛利影响仍为 `UNKNOWN`。只有这些项目得到可比证据，投资评级才升级。

## 仓位纪律跟随证据

对NVIDIA，近期需求逻辑依然强。OpenAI本身就预计大量部署NVIDIA推理与训练系统。Jalapeño不等于GPU需求立即坍塌；它意味着长期估值模型应删除“永久推理垄断”假设。

对Broadcom，这一披露确认定制加速器和以太网系统已进入战略核心。10GW仍是路线图，实际收入、毛利、部署里程碑与客户集中度仍需证据。

对OpenAI，Jalapeño是成本控制与谈判资产。它的价值应通过产品延迟、容量、每次有效请求成本和连续迭代能力衡量，技术自豪感没有独立现金流科目。

仓位还必须分开份额与绝对增长。如果总推理市场扩张速度高于定制芯片抢份额速度，NVIDIA可以卖出更多系统、赚到更多美元，同时在最大客户中的百分比下降。只用收入增长证明护城河，会漏掉这项变化；把每颗内部芯片都视为损失GPU收入，也会漏掉计算池扩张及NVIDIA在训练、网络和溢出容量中的作用。

实务上采用双轴评分。第一轴衡量市场规模：推理容量、token需求与客户支出。第二轴衡量NVIDIA经济捕获：负载份额、每单位有效工作价格、毛利率、软件与网络附着。市场强增长、捕获下降是混合结果；市场强增长、捕获稳定确认平台逻辑；市场变弱、捕获下降才是真正危险情形。

benchmark改变长期假设，量产证据才改变仓位。Robin应把NVIDIA保留为护城河分层的强平台：训练与快速变化的前沿负载仍是高确信层；稳定超大规模推理成为可竞争层。每季只更新五个变量，不把段子翻译成交易。

客户为一个明确工作造出了更好的芯片。这足以改变谈判，远不足以宣布平台战争结束。

## 分类与关键词

**分类：** 人工智能、半导体、投资

**关键词：** Jalapeño推理ASIC、NVIDIA推理护城河、OpenAI定制芯片、AI加速器经济、GB300、Vera Rubin、Broadcom、推理TCO、资本回旋

**Hashtags:** #AIInfrastructure #Semiconductors #NVIDIA #OpenAI #CustomSilicon
