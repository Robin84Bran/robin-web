---
title: "机器人如何检查自己的工作"
date: "2026-11-02"
updated: "2026-11-02"
section: "Ouroboros"
series: "Daily Special"
lane: "RESEARCH"
tags: ["实体人工智能", "机器人", "智能体评估"]
keywords: ["Gemini Robotics ER 2", "进度分类", "步骤级重试", "验收结果"]
categories: ["Research", "Systems"]
excerpt: "Gemini Robotics ER 2 能够检查进度并重试一个步骤；57.4% 的五档分类成绩也提醒我们，真正的终点仍是可验收的结果。"
hero: "/daily-special/20261102/hero.png"
ogImage: "/daily-special/20261102/og.png"
canonical: "https://iamrobin.ai/ouroboros/202611/20261102/special/zh-hans/"
author: "https://iamrobin.ai/#person"
inLanguage: "zh-Hans"
draft: false
translationReview: "PASS"
sourceSignal: 2
researchScope: "一项范围明确的公开资料研究，考察 Gemini Robotics ER 2 的进度分类与步骤级重试，并提出一项安全的桌面任务比较；本次研究未运行机器人或 API 试验、客户现场测试，也未执行购买、交易、资本配置、公司联络或底层决定。"
artifactSha256: "958acbfb9fa39153eedf09fbd783542e3109f58c42344cafed9f77818e95fd94"
evidenceSources: ["https://cloud.google.com/blog/products/ai-machine-learning/gemini-robotics-embodied-reasoning-2-is-now-available-on-google-cloud", "https://blog.google/innovation-and-ai/models-and-research/google-deepmind/gemini-robotics-er-2/", "https://ai.google.dev/gemini-api/docs/robotics-overview", "https://ai.google.dev/gemini-api/docs/robotics-video-progress", "https://storage.googleapis.com/deepmind-media/gemini-robotics/Gemini-Robotics-2-Safety.pdf", "https://deepmind.google/models/model-cards/gemini-robotics-er-2/"]
---

# 机器人如何检查自己的工作

机器人要完成一项工作，移动只是其中一部分。它还要理解任务，选择一连串动作，并判断每个动作是否带来了预期结果。这些职责往往由机器人系统的不同部分承担：一个部分负责规划，另一个部分控制机械臂或轮子。现实世界出现意外时，这些部分之间的连接就变得格外重要。

Google 的人工智能研究机构 Google DeepMind 正在为规划与推理这一层开发软件。它的 Gemini Robotics Embodied Reasoning 2 模型通常简称为 ER 2。该模型可以处理文字、图像、视频和音频，再调用工具来执行机器人动作；具体的移动则交给更底层的模型或硬件系统。

ER 2 已公布的能力中，有一项看起来十分朴素：观察正在进行的工作，并估计它已经完成到什么程度。这个估计可以帮助机器人决定继续、再试一次当前步骤，或者请人协助。

一个日常例子可以说明它的意义。想象一位厨师照着食谱做菜，第一步是把鸡蛋打进碗里。“打鸡蛋”这条指令和“碗里已经有鸡蛋”是两个不同事件。系统若在发出指令后立刻进入下一步，就把结果当成了既定事实；系统若先看一眼碗，就有机会在问题还很小时发现它。

对于机器人来说，这次检查可以保留已经完成的有效工作。它同时带来一项新责任：对结果作出足够准确的判断，才能选对下一个动作。

## 从开发者发布走向企业入口

2026 年 7 月 30 日，Google 通过 Gemini API 和 Google AI Studio 推出了 ER 2。Gemini API 是开发者把应用连接到模型的软件接口，Google AI Studio 则是相应的开发环境。此次发布包括标准版与流式版两个公开预览端点。

10 月 27 日，Google Cloud 宣布企业级 Gemini 平台开放 ER 2 的公开预览。这为企业团队提供了另一条构建入口。10 月 29 日更新的开发者概览仍把该模型标为预览阶段。

因此，10 月的公告把一项已经发布的能力带进了 Google 的企业平台。它的意义在于，探索推理软件与实体机器连接方式的团队现在多了一条可用路径。接下来的问题是：这套软件究竟能看懂机器正在做的工作到什么程度？

Google 的视频理解文档描述了两项相关能力。“时刻定位”寻找某个事件发生的时间点或画面，例如杯子在什么时候装满。“进度分类”估计任务已经推进到哪一步，并把视频归入五个宽泛区间之一：0–20%、20–40%、40–60%、60–80% 或 80–100%。

两项能力回答的是不同问题：一项寻找事件发生的时刻，另一项判断任务看起来完成了多少。把它们与动作调用工具连接起来，就可能形成一个循环：行动、观察、判断，再选择下一步。

Google 表示，进度分类可以帮助机器人调整动作，或者在一个更大的工作流程中重试失败的步骤。这里的“局部”重试指回到受影响的工作步骤。模型计算具体运行在哪里，是另一项系统设计选择。

对于等待成品的人来说，计算位置的重要性低于一个更实际的可能性：如果机器人能够找到需要处理的那一步，它或许可以保留前面已经完成的进度，并从问题所在之处恢复。

## 检查本身也可能出错

这个循环是否有用，取决于判断的质量。

Google 报告称，ER 2 在五档进度分类基准上的准确率为 **57.4%**。用日常语言来说，在被评估的案例中，模型选中正确宽泛进度区间的比例略高于一半。Google 表示，这一成绩超过了其比较中的早期模型和竞争模型；同时，仍有相当一部分分类出现错误。

宽泛区间本身也带来一层限制。最高一档覆盖 80% 到 100%，所以被归入这一档的工作仍可能差最后一个动作。真实工作场所需要为“已经完成并可接受”设定明确标准。

分类错误会造成什么后果，取决于具体任务。从机制上看，机器人可能重复一个已经完成的步骤，跳过一个仍需处理的步骤，或者在不合适的时刻向人求助。这些都是进度判断出错后可能出现的情况；它们在特定工作场所中的发生频率仍要靠实际证据回答。

Google 公布的另一项“时刻定位”成绩更高：准确率为 **91.3%**，平均绝对时间误差为 **0.96 秒**。这个时间指标描述预测时刻与参考时刻平均相差多远，无论预测发生在参考点之前还是之后。

这是关于视频事件定位的有用证据。若要声称 91.3% 的工作任务都能完成，则需要另一种评估，让每项工作一路走到被人验收的最终结果。

这些模型成绩全部来自 Google。本次研究审阅的公开发布资料提供了基准的核心数字；要把它们转换成工作场所表现，还需要更细的任务构成、错误类型和后果资料。

Google 的安全评估从另一个角度呈现了“检查”与“完成”之间的距离。它包含离线进行的单项测试，也包含使用模拟底层动作模型的较长多轮测试。另有一项独立评估，在 Apptronik Apollo2 人形机器人上测试安全停机。

在较长的置信度模拟测试中，智能体通常会按要求查询置信度；而要可靠地产生全部修正步骤并完成工作，表现则更弱。报告列出的失败模式包括重新规划出错，以及在置信度较低时仍调用工具。

这项发现正好触及恢复机制的核心。识别不确定性是恢复的一部分；设计出完整而有效的后续动作，则是另一部分。

安全报告还把硬件认证、冗余系统和有保证的实时响应放在本次评估范围之外。Google 的模型卡要求用户在生产、商业和公共环境中谨慎使用，并禁止把该机器人模型用于安全关键工作，例如故障可能造成死亡、受伤或财产损失的场景。

## 怎样的重试才真正有用？

最实际的问题是：在把时间、费用和人的注意力都计算进去之后，检查并选择性重试能否带来更多可验收的工作？

一个小型比较可以开始回答这个问题。本研究提出三项安全的桌面任务，每项任务都有清楚可见的终止状态。两种方法使用完全相同的任务和验收规则：第一种在某个步骤失败后从头重启整段流程，第二种只重试受影响的步骤。

截至 11 月 2 日的研究截止时间，这项比较仍是一份测试方案。它的价值来自用预先定义的规则验收成品，并把人的验收结果与机器人自己的判断分开记录。

记录需要包含验收通过次数、错误宣告成功的次数、重试次数和人工接管次数。完成时间，以及模型使用费与操作人员时间的合计成本，可以显示每一项可验收结果究竟消耗了什么。一次重试若能保住前面的工作，就可能创造价值；反复尝试若只消耗时间而仍未完成任务，则会呈现另一种结果。

即使桌面比较取得成功，它建立的也只是特定测试条件下的有限结论。工作场所的可靠性需要来自目标环境的证据，并覆盖重复班次与现场变化。当前公开资料仍未给出客户现场完成率、人工介入情况和每项可验收任务的成本。

ER 2 把进度检查变成了一项明确、可度量的模型能力。这是机器人开始根据动作结果作出反应的一次有意义进展。最有信息量的观察将发生在检查之后：下一个决定，是否真的帮助机器交付了一个人愿意验收的结果？

资料来源：Google 的 [7 月 30 日发布说明](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/gemini-robotics-er-2/)、[10 月 27 日 Google Cloud 公告](https://cloud.google.com/blog/products/ai-machine-learning/gemini-robotics-embodied-reasoning-2-is-now-available-on-google-cloud)、[开发者概览](https://ai.google.dev/gemini-api/docs/robotics-overview)、[视频理解指南](https://ai.google.dev/gemini-api/docs/robotics-video-progress)、[安全评估报告](https://storage.googleapis.com/deepmind-media/gemini-robotics/Gemini-Robotics-2-Safety.pdf)与[模型卡](https://deepmind.google/models/model-cards/gemini-robotics-er-2/)。研究截止时间为香港时间 2026 年 11 月 2 日上午 10:05。模型与基准成绩均为 Google 报告的数据；独立复现超出本次研究范围。
