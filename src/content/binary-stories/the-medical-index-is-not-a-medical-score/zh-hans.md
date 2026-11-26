---
title: "医学索引不是医学分数"
storySlug: "the-medical-index-is-not-a-medical-score"
date: "2026-11-26"
updated: "2026-11-26"
lane: "BUILD"
excerpt: "专用医学搜索索引改变模型从哪里查找资料，却不能证明答案忠实保留了原始来源；让审核模型再次搜索，又会改变实验本身。"
hero: "/binary-stories/the-medical-index-is-not-a-medical-score/hero.webp"
ogImage: "/binary-stories/the-medical-index-is-not-a-medical-score/og.webp"
keywords: ["OpenAI 医疗模型", "医学搜索索引", "模型评估", "来源核验", "Sol", "Astra"]
canonical: "https://iamrobin.ai/binary/stories/the-medical-index-is-not-a-medical-score/zh-hans/"
inLanguage: "zh-Hans"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202611/20261126/special/"
sourceArtifactSha256: "2d902554f6fb6412df0cfa65ed01e8a057f44bcb6eb60d4b94e58271798fd814"
carouselPdf: "/carousels/the-medical-index-is-not-a-medical-score.pdf"
carouselCaption: "/carousels/the-medical-index-is-not-a-medical-score.txt"
carouselPages: 7
draft: false
---

模型技术栈里，打开了一扇写着 **医学** 的门。

OpenAI 于 2026 年 11 月 24 日为 Responses API 发布了四种医疗模型配置。OpenAI 表示，这些配置使用网页搜索时，会在专用医学来源索引中搜索。

这是一项真实的产品变化，却不是准确率分数。

医学索引可以改变系统优先搜索的书架。它不能证明模型选对了论文、保留了研究人群、把不确定性带入答案，或在来源不支持某项说法时拒绝作答。

标签告诉我们阅读可能从哪里开始。分数必须在阅读之后取得。

## 书架只是第一层

想象一个临床问题来到图书馆。

第一层选择目录。一般搜索可能检索整栋楼；医疗配置使用网页搜索时，从医学目录开始。

第二层提取文献。即使是专业目录，也可能返回旧版指南、二手摘要、不符合目标人群的研究，或几篇结论相互冲突的论文。

第三层撰写答案。模型必须保留干预、对照、结局、时间范围、亚组和重要限定。引用本身正确，如果旁边的说法比来源更宽，仍然不匹配。

第四层把答案逐项与原始来源核对。只有到了这里，一项实质性主张才能被计为“来源核验正确”。

![医学搜索索引依次连接资料提取、答案生成与来源核验。每项实质性主张与原始来源完成核对前，记分卡仍应保持空白。](/binary-stories/the-medical-index-is-not-a-medical-score/hero.webp)

这些层相互连接，却不能互相替代。检索质量更好，答案仍可能丢失限定条件；更强的模型也可能在不完整的资料包上认真推理；审核者可能发现错误，也可能只是赞同错误。

专用索引是链条的输入，不是链条的结果。

## 第二次搜索会同时改变两个变量

最诱人的流程很简单：先让 GPT-6.2 Sol healthcare 搜索并起草，再让 GPT-6.2 Astra healthcare 审核。

但如果 Astra 再搜一次，会发生什么？

比较不再只测试“更强的第二位读者能否改善答案”。它还给了审核者第二次检索机会。如果最终答案变好，原因可能是审核更好、来源更好，或两者兼有。

这并不是禁止第二次搜索的理由，而是应该明确区分两项实验的理由。

在 **仅审核组** 中，Sol 在“必须搜索”的规则下生成来源包和草稿。Astra 获得同一个问题、同一份来源包与同一套评分标准，但不能重新搜索。这样可以尽可能隔离第二位读者本身的价值。

在 **审核加重新检索组** 中，Astra 可以再次搜索。每次额外搜索调用和每份新增来源都要记录。这个组测试更接近生产系统可能采用的组合流程。

两组回答的问题不同：

- 审核者是否改善了对同一批证据的阅读？
- 再给一次搜索机会，是否改善了最终证据集与答案？

把两者合成一条路线，标题会更整齐，解释却会更薄弱。

## 四倍 token 费率不等于四倍证据

按 2026 年 11 月 26 日观察到的 Standard 短上下文费率，GPT-6.2 Sol healthcare 的每百万输入 token 价格为 2 美元，输出为 10 美元；GPT-6.2 Astra healthcare 分别为 8 美元和 40 美元。缓存输入价格同样相差四倍：每百万 token 0.10 美元与 0.40 美元。

托管网页搜索价格为每 1,000 次调用 10 美元，另按所选模型费率收取搜索内容 token。十个问题每题搜索一次，一条路线仅搜索调用费就从 0.10 美元起步，尚未计入模型 token、重试和人工评估。

这段算术的作用，是不让模型名称代替经济判断。Astra 在上述类别的标价是 Sol 的四倍，但加入 Astra 的价值仍要等到其修正效果被测量后才能知道。

有用的分母不是“生成了多少答案”，而是 **经来源核验的正确实质性主张数**。

每条路线都要保留全部生成的实质性主张。没有来源支持的主张不能从错误率分母中消失。缺失限定条件、额外搜索、输入和输出 token、延迟与审核时间都要记录。

然后计算：

**工作流总成本 ÷ 经来源核验的正确实质性主张数**

这个比率不会给出临床建议。它只告诉构建者：在同一项冻结测试中，额外阅读步骤是否以合理成本换来了更多经过核验的证据。

## 空白记分卡才是诚实的发布状态

公开文档证实了这些配置、医学搜索索引和带日期的价格图。它没有披露索引的完整构成与覆盖范围，没有提供与一般网页搜索的受控比较，也没有公布 Sol 与 Astra 之间实测的审核提升。

因此，发布时有四行诚实状态：

1. **搜索层：**已经改变。
2. **价格层：**可以测量。
3. **准确率提升：**未知。
4. **第二位读者的价值：**未知。

这不是空洞的结论，而是产品架构与产品证据之间的清晰边界。

医学索引可以把系统带进更合适的阅览室。

只有冻结、盲评、逐项核对来源的比较，才能告诉我们它在那里学到了什么。

---

**资料：**OpenAI [API 更新日志](https://developers.openai.com/api/docs/changelog)、[API 定价](https://developers.openai.com/api/docs/pricing)、[网页搜索指南](https://developers.openai.com/api/docs/guides/tools-web-search)、[评估最佳实践](https://developers.openai.com/api/docs/guides/evaluation-best-practices)，以及经哈希固定的[源 Special](https://iamrobin.ai/ouroboros/202611/20261126/special/)。价格与可用性截至 2026 年 11 月 26 日。双组比较是一项拟议评估设计；本文没有执行付费实验、处理患者数据、提出临床建议、更改 API 路线或发送外部消息。
