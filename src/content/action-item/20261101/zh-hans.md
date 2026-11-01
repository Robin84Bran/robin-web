---
title: "出版者允许 AI 如何使用自己的作品"
date: 2026-11-01
updated: 2026-11-01
section: Ouroboros
series: Daily Action Item
categories:
  - 人工智能
  - 出版
  - 数字权利
tags:
  - AI 内容发现
  - AI 训练
  - robots.txt
  - 出版者控制
keywords:
  - AI 训练偏好
  - AI 搜索发现
  - robots.txt
  - OAI-SearchBot
  - GPTBot
excerpt: "AI 发现内容、在回答中引用内容，以及使用内容训练模型，是对出版者作品的不同用途；每一种都需要分别考虑许可与证据。"
hero: /action-item/20261101/hero.webp
ogImage: /action-item/20261101/og.webp
canonical: "https://iamrobin.ai/ouroboros/202611/20261101/action_item/zh-hans/"
author: https://iamrobin.ai/#person
inLanguage: zh-Hans
languageSlug: zh-hans
translationOf: "https://iamrobin.ai/ouroboros/202611/20261101/action_item/"
translationReview: PASS
draft: false
sourceAction: "2026-11-01 每日简报，第 5 项"
ledgerId: AI-PUBLISHER-CONTROL-20261101
visualHeadline: "你允许 AI 如何使用作品？"
visualSubhead: "发现 · 引用 · 访问 · 训练"
visualFooter: "一份文件 · 多种结果"
visualNodes: "发现|引用|访问|训练"
thesis: "出版者需要区分 AI 发现内容与模型训练的许可，并分别衡量引用、访问及有价值的关系。"
---

# 出版者允许 AI 如何使用自己的作品

对在网上发表作品的人来说，让读者找到作品本就是工作的一部分。一篇文章、一份研究指南，或一个解释得透彻的观点，都可能通过搜索结果、他人分享的链接，或越来越常见的 AI 助手回答，抵达读者面前。这带来了一个新的出版问题：当创作者欢迎 AI 服务访问自己的网站时，她究竟欢迎对方怎样使用自己的作品？

AI 服务使用网页内容的方式不止一种。它们可以找到页面，并在搜索结果中给出链接；可以参考页面内容来回答读者的问题；也可以用内容训练模型。模型是从材料中学习规律并生成回答的底层软件。这些活动各有目的，而出版者可用的控制方式也因服务商而异。

运营 ChatGPT 的 OpenAI 和运营 Gemini 的 Google，已经提供了让出版者表达相关偏好的方式。2026 年 10 月 30 日，两家公司都宣布计划支持一项共享的 AI 训练偏好信号。两项公告预示着出版者可能获得一种更通用的表达方式，不过两家公司的实施时间安排不同。

iamrobin.ai 上的一份小型公开文件，让这个问题变得具体。文件内容既展示了网站能多清楚地表明自己的意愿，也提醒我们：后续会发生什么，仍取决于其他环节。

要理解这份文件，先从网站的入口说起。

网站通常会在根地址放置一个名为 `robots.txt` 的文件，例如 `iamrobin.ai/robots.txt`。爬虫这类自动化程序会读取它，了解网站允许它们访问哪些部分。程序通过称为用户代理的名称表明身份，出版者因此可以针对不同爬虫给出不同指示。

不妨想象一本图书馆藏书。把书列入目录，能帮助人们找到它；引用书中一段文字，能帮助读者讨论其内容；用这本书编写新的培训手册，则是另一种用途。在这个类比中，每项许可对应不同的活动，每种活动也带来不同的结果。目录收录创造了发现这本书的机会；读者真正打开它，还要再经过一步。

出版者考虑 AI 内容发现时，同样需要分清这些环节。允许抓取页面、在回答中获得引用，以及潜在客户访问网站，是三个不同的步骤。

OpenAI 目前的爬虫文档明确区分了搜索与训练。`OAI-SearchBot` 用于支持内容进入 ChatGPT 搜索结果；`GPTBot` 涉及可能被用于改进生成式 AI 基础模型的内容。OpenAI 表示，对这两种爬虫的设置相互独立。

因此，出版者可以表达这样的偏好：允许内容被搜索发现，同时拒绝 GPTBot 为模型训练而抓取内容。搜索设置关系到页面是否有资格出现在结果中；某个具体页面最终是否出现，还取决于服务的实际行为。

OpenAI 还记录了 `ChatGPT-User`：它会响应用户操作而访问页面。这类访问的触发原因不同，因为有人要求服务执行某项操作。OpenAI 解释说，由用户发起的操作可能不受 `robots.txt` 规则约束。即使是同一家服务商，访问目的也很重要。

Google 目前以另一种方式关联这些选择。其 `Google-Extended` 控制项适用于 Gemini Apps 和模型训练用途。在 10 月 30 日的公告中，Google 还将允许设置与内容在 Gemini Apps 中获得基于来源材料的展示资格联系起来。

这里的“基于来源材料”，指 AI 回答参考资料来源来支撑内容。对出版者而言，这让作品有了另一条出现在读者面前的途径。由于 Google 当前的控制项同时影响这种展示资格和训练用途，出版者必须一并考虑两方面的效果。OpenAI 则通过彼此独立的搜索和训练爬虫设置，提供了不同的安排。

这正是共享偏好信号可能发挥作用的地方。创作者对训练用途也许有一个明确意愿，但读取她网站的公司各自运行着不同的控制机制。

2026 年 10 月，一份由 IETF 托管、题为“Machine-Readable Training Preference Signal”的 Internet-Draft，提出了表达这一意愿的共享方式。IETF 是制定互联网技术标准的社群；Internet-Draft 则是仍在开发中的提案。该草案定义了一个政策标记 `__usage_ai-training`，供软件读取为训练偏好。草案列出的到期日期是 2027 年 5 月 3 日；这个日期与其草案开发状态有关。

提案仍在开发中。服务商公告说明了接下来的安排：OpenAI 于 10 月 30 日表示，计划在未来几个月支持这项信号；Google 当天的公告则指向 2027 年。在过渡期间，现有的服务商专属控制项仍是出版者可以实际使用的工具。

公告发布两天后，iamrobin.ai 的案例提供了一份出版者当前声明的快照。

根据所提供的核验记录，2026 年 11 月 1 日香港时间进行的一次检查发现，网站线上提供的 `robots.txt` 与 GitHub 公开仓库 `main` 分支中的文件一致。相关内容如下：

```text
User-agent: *
Content-Signal: search=yes, ai-input=yes, ai-train=yes, use=reference
Allow: /
```

星号面向一般爬虫，`Allow: /` 允许抓取整个网站。`Content-Signal` 这一行则表达了对搜索、AI 输入、训练和参考使用均持开放态度的广泛偏好。

线上文件与仓库文件一致，确立了一个有用但范围有限的事实：在检查当时，网站公开提供的声明与已发布的源文件相符。这个案例讨论的正是当时观察到的声明。服务商是否识别其中每个字段、又会如何依据这项信号行动，仍取决于各自的实现。

这份声明也让创作者最初的问题变得更尖锐：如果目标是让 AI 服务展示并引用自己的作品，她为此授予了什么使用许可？

对 iamrobin.ai 而言，文件表达的广泛欢迎包含训练用途。OpenAI 的文档表明，搜索与训练偏好也可以分别表达。Google 现行的控制项则把训练偏好与内容在 Gemini Apps 中获得基于来源材料的展示资格联系起来。因此，实际答案既取决于出版者写下的话，也取决于服务商及所用的具体控制项。

至于创作者随后获得了什么，则需要另一类证据。

页面出现在搜索结果中，说明它被发现了；某个回答引用该页面，说明该回答标明了出处；一次引荐访问，说明有人顺着链接进入网站；一项合格的咨询，则说明有人进一步走向可能有价值的关系。每种观察结果回答的都是不同问题。

依照这些区别，评估结果可以采取相称的办法：保存引用和链接的实例，在来源可见时查看引荐流量，并记录相关咨询。这些观察能帮助出版者了解 AI 内容发现带来的价值。若要确认许可设置的变化是否导致增长，还需要进一步比较。

就 iamrobin.ai 而言，现有证据确立了声明内容，以及它与仓库文件的一致性。这份记录尚未衡量引用、引荐访问或咨询的增长。某个具体模型是否曾用某个具体页面训练，也仍无定论。

共享的训练偏好信号，可能让出版者更容易跨服务表达意愿。它能发挥多大作用，取决于实际实施；内容发现的价值，则会通过可观察的结果逐渐显现。网站入口处的文件告诉爬虫，出版者欢迎什么。接下来的故事，要由随之而来的链接、读者和关系来书写。

**来源**

- [OpenAI 公告，2026 年 10 月 30 日](https://openai.com/index/helping-websites-express-ai-training-preferences/)及[爬虫文档](https://developers.openai.com/api/docs/bots)。
- [Google Search Central 公告，2026 年 10 月 30 日](https://developers.google.com/search/blog/2026/10/ai-training-control)。
- [IETF Internet-Draft：Machine-Readable Training Preference Signal](https://datatracker.ietf.org/doc/draft-kelley-aipref-training-preference-signal/)。
- [iamrobin.ai robots.txt](https://iamrobin.ai/robots.txt)及[公开仓库文件](https://github.com/Robin84Bran/robin-web/blob/main/public/robots.txt)；两者已在所提供的核验记录中于 2026 年 11 月 1 日香港时间进行比对。
