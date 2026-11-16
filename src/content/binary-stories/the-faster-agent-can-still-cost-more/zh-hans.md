---
title: "更快的智能体，仍可能更贵"
storySlug: "the-faster-agent-can-still-cost-more"
date: "2026-11-16"
updated: "2026-11-16"
lane: "INVEST"
excerpt: "更短的浏览器运行时间，还不等于更便宜的结果。真正有用的单位，是模型、运行环境与技术人员总成本除以获验收的自主完成次数。"
hero: "/binary-stories/the-faster-agent-can-still-cost-more/hero.webp"
ogImage: "/binary-stories/the-faster-agent-can-still-cost-more/og.webp"
keywords: ["计算机操作智能体", "旧式门户", "验收完成", "人工介入", "单位结果成本"]
canonical: "https://iamrobin.ai/binary/stories/the-faster-agent-can-still-cost-more/zh-hans/"
inLanguage: "zh-Hans"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202611/20261116/special/"
sourceArtifactSha256: "5ca4ea84cc150b687e922198db293153423ce171de697754363694b66aeb1cfd"
carouselPdf: "/carousels/the-faster-agent-can-still-cost-more.pdf"
carouselCaption: "/carousels/the-faster-agent-can-still-cost-more.txt"
carouselPages: 7
draft: false
---

更快的智能体，仍可能是更贵的那个。

把秒表放到账本旁边，这句话就不再矛盾。

Shield Technology Partners 报告称，GPT-6 Astra 完成其计算机操作任务的平均速度，比先前使用的模型快 35–40%。Shield 还报告失败更少、超时更少，技术人员用于编写详细指令或协助智能体的时间也更少。这些都是来自真实浏览器工作流、值得关注的公司报告信号。

但速度与成本回答的是两个问题。

速度问：被纳入统计的一次运行用了多久。每次获验收完成的成本问：整个系统为产生一项通过独立终态检查的工作，消耗了多少资源。

## 秒表先停，账本后关

设想两个浏览器智能体。A 六分钟到达最后页面，却偶尔需要技术人员救援，甚至会在底层记录尚未改变时宣布成功。B 需要八分钟，却能自行恢复更多故障，也更常抵达正确终态。

公开资料并没有说 Shield 发生了这种情况。这只是一个概念对照，用来揭示核算边界：一旦把救援时间与未通过验收的结果放回分母，更快的运行可能输掉单位经济性。

![一次浏览器运行依次经过执行、目的地复核与验收。每次尝试都会累积模型、运行环境和技术人员成本，最后才以获验收完成次数作为分母。](/binary-stories/the-faster-agent-can-still-cost-more/hero.webp)

秒表看到六分钟对八分钟。运营账本看到模型用量、浏览器基础设施、重试、技术人员主动介入分钟数，以及最终获验收的结果。

前者是运行指标，后者是单位经济指标。

## 每次尝试都留在分母里

来源研究提出：对一个冻结的旧式门户工作流，保留完整的 100 次运行记录。这 100 次运行尚未执行。设计的价值，在于不丢弃不方便的尝试。

每次运行只归入一个终态：首次通过验收、智能体恢复后通过验收、技术人员接管后完成、错误宣布完成、在审批或政策边界安全停止，或失败与超时。

只有前两类算作获验收的自主完成。人工接管仍可能为客户交付结果，但它代表不同的劳动主张。安全停止可以证明控制有效，却不等于任务已交付。错误完成尤其昂贵，因为在有人重新打开目的地之前，它看起来可能很便宜。

这套分类阻止三种好看的捷径：只对成功运行计算速度；把人工救援藏进“已完成”；把正确的安全停止写成已交付工作。

## 有用的公式故意很朴素

对于固定的一组尝试：

**每次获验收完成的成本 =（模型 + 浏览器或运行环境 + 技术人员主动介入成本）÷ 获验收的自主完成次数**

如果获验收完成为零，这个比率应标为不可得，而已经花掉的总成本仍然保留。

公式简单，难点在定义。哪些分钟算主动介入？必要审批属于任务设计，还是救援劳动？哪个系统确认最终副作用？重试是否完整计入模型与运行成本？这些规则必须在看到结果之前冻结。

耗时也需要同样的纪律。中位数描述中间一次运行，95 分位描述慢尾。两者都不能把超时、中断和接管从结果记录中抹掉。

## 其他项不恶化，速度才真正变值钱

速度不是虚荣指标。如果验收率、恢复率和人工介入保持不变，耗时降低 35–40% 可以改善产能与成本；如果技术人员投入也下降，论证会更强。

这里不是否定 Shield 的报告，而是指出：要把公司的描述转化为可迁移的经济结论，还缺哪一组证据。

冻结一项受支持任务、起始状态、权限、时限、重试规则、验收检查和基线。用相同的预选案例运行，并保留每一次尝试。然后比较验收完成率、带真实故障分母的恢复率、每次运行与每次验收完成的主动人工分钟、每次验收完成总成本，以及中位和慢尾耗时。

这份记录才能说明：更快执行带来的是更便宜的正确工作，只是更短的尝试，还是两者之间的取舍。

最快的一圈很容易让人赞叹。

真正有经济意义的事实，是正确到达的工作花了多少钱。

---

**来源：** OpenAI 的 [Shield 客户案例](https://openai.com/business/customer-stories/shield/)、Shield 的 [Forge 产品页面](https://shieldtp.com/forge)与[2026 年 9 月 Forge 公告](https://shieldtp.com/company-news/forge-building-for-it-services-from-the-inside-out)，以及经过哈希绑定的[来源 Daily Special](https://iamrobin.ai/ouroboros/202611/20261116/special/)。活动、速度与人工投入说法均为公司报告。100 次运行研究与智能体对照属于拟议测量设计，不是已观察结果。本研究没有访问或执行任何门户、客户记录、购买、资本操作、公司联系或外部消息。
