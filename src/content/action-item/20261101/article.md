---
title: "What Publishers Give AI Permission to Do"
date: 2026-11-01
updated: 2026-11-01
section: Ouroboros
series: Daily Action Item
categories:
  - Artificial Intelligence
  - Publishing
  - Digital Rights
tags:
  - AI Discovery
  - AI Training
  - robots.txt
  - Publisher Controls
keywords:
  - AI training preference
  - AI search discovery
  - robots.txt
  - OAI-SearchBot
  - GPTBot
excerpt: "AI discovery, answer citation and model training are separate uses of a publisher's work, and each needs its own permission and evidence."
hero: /action-item/20261101/hero.webp
ogImage: /action-item/20261101/og.webp
canonical: "https://iamrobin.ai/ouroboros/202611/20261101/action_item/"
author: https://iamrobin.ai/#person
inLanguage: en
draft: false
sourceAction: "Daily Briefing 2026-11-01, item 5"
ledgerId: AI-PUBLISHER-CONTROL-20261101
visualHeadline: "What permission did you give AI?"
visualSubhead: "DISCOVERY · CITATION · VISIT · TRAINING"
visualFooter: "ONE FILE · SEVERAL OUTCOMES"
visualNodes: "DISCOVERY|CITATION|VISIT|TRAINING"
thesis: "Publishers need to separate permission for AI discovery from permission for model training, then measure citations, visits and useful relationships as distinct outcomes."
---

# What Publishers Give AI Permission to Do

For someone who publishes on the web, being found is part of the work. An essay, a research guide or a carefully explained idea can reach a reader through a search result, a shared link or, increasingly, an answer from an AI assistant. That creates a new publishing question: when a creator welcomes an AI service onto her website, which uses of her work is she welcoming?

AI services can use web content in several ways. They can find a page and link to it in search results. They can draw on a page while answering a reader’s question. They can also use content to help train a model, the underlying software that learns patterns from material and generates responses. Each activity serves a different purpose, and the controls available to publishers vary across providers.

OpenAI, which operates ChatGPT, and Google, which operates Gemini, already offer ways for publishers to express preferences about these uses. On October 30, 2026, both companies announced plans to support a shared signal for AI training preferences. Their announcements point toward a more common language for publishers, with different implementation schedules.

A small public file on iamrobin.ai makes the issue concrete. Its contents show how clearly a website can state its wishes—and how much of the story still depends on what happens afterward.

To understand that file, start at the website’s front door.

Websites commonly place a file called `robots.txt` at their root address, such as `iamrobin.ai/robots.txt`. Automated programs called crawlers read it for directions about which parts of the site they may visit. These programs identify themselves through names called user agents, allowing a publisher to give different directions to different crawlers.

Think of a library book. Listing it in the catalog helps people find it. Quoting a passage helps a reader discuss its contents. Using it to prepare a new training manual serves another purpose. In this analogy, each permission concerns a separate activity, and each activity produces a different result. A catalog listing creates an opportunity for someone to discover the book; a reader opening it is a further event.

The same distinction matters when a publisher considers AI discovery. Permission to crawl a page, a citation in an answer and a visit from a potential customer are separate steps.

OpenAI’s current crawler documentation makes a practical separation between search and training. `OAI-SearchBot` supports inclusion in ChatGPT search results. `GPTBot` covers content that may be used to improve generative AI foundation models. OpenAI says the settings for these two crawlers are independent.

That gives a publisher a way to express a preference for search discovery while declining crawling for model training through GPTBot. The search setting concerns eligibility to appear in results; the eventual appearance of a particular page depends on the service’s behavior.

OpenAI also documents `ChatGPT-User`, which visits pages in response to user actions. These visits have a different trigger: someone has asked the service to do something. OpenAI explains that user-initiated actions may fall outside the rules governed by `robots.txt`. Even within a single provider, the purpose of a visit matters.

Google’s current arrangement connects the choices differently. Its `Google-Extended` control applies to Gemini Apps and model-training uses. In its October 30 announcement, Google also links the allow setting to eligibility for grounding exposure in Gemini Apps.

“Grounding” means drawing on source material to support an AI response. For a publisher, that creates another possible route for her work to appear before a reader. Because Google’s current control affects this eligibility as well as training uses, a publisher has to consider both effects together. OpenAI’s independent search and training crawler settings offer a different arrangement.

This is where the idea of a shared preference signal becomes useful. A creator may have one clear wish about training, while the companies reading her website each operate their own controls.

In October 2026, an IETF-hosted Internet-Draft titled “Machine-Readable Training Preference Signal” proposed a shared way to express that wish. The IETF is a community that develops Internet technical standards; an Internet-Draft is a proposal under development. This draft defines a policy token, `__usage_ai-training`, that software could read as a training preference. Its listed expiry date is May 3, 2027, a date attached to the draft’s development status.

The proposal remains in development. Provider announcements describe the next steps: OpenAI said on October 30 that it planned to support the signal over the coming months. Google’s announcement that day pointed to support in 2027. During this transition, the existing provider-specific controls remain the practical tools publishers can use.

Two days after those announcements, the iamrobin.ai case offered a snapshot of a publisher’s current declaration.

On November 1, 2026, Hong Kong time, a check recorded in the supplied verification packet found that the site’s live `robots.txt` matched the public repository file on GitHub’s `main` branch. The relevant lines read:

```text
User-agent: *
Content-Signal: search=yes, ai-input=yes, ai-train=yes, use=reference
Allow: /
```

The asterisk addresses crawlers generally, and `Allow: /` permits crawling across the site. The `Content-Signal` line expresses broad preferences in favor of search, AI input, training and reference use.

The match between the live file and the repository establishes a useful, narrow fact: the publicly served declaration agreed with the published source file at the time of the check. This case concerns that observed declaration. Whether a provider recognizes each field and how it acts on the signal remain questions for that provider’s implementation.

The declaration also raises the creator’s original question in a sharper form. If the aim is to have AI services surface and cite her work, what permission is she giving in exchange?

For iamrobin.ai, the file expresses a broad welcome that includes training. OpenAI’s documented controls show that search and training preferences can also be expressed independently. Google’s present control connects training preferences with eligibility for grounding exposure in Gemini Apps. The practical answer therefore depends on the provider and the specific control, as well as the publisher’s words.

What the creator receives afterward requires a different kind of evidence.

A page appearing in search results shows discovery. An answer citing that page shows attribution in that answer. A referral visit shows that someone followed a link to the website. A qualified inquiry shows that a person took a further step toward a potentially useful relationship. Each observation answers its own question.

Those distinctions suggest a proportionate way to assess results: retain examples of citations and links, examine referral traffic where its source is visible, and record relevant inquiries. Such observations would help a publisher understand the value arriving through AI discovery. Establishing that a change in permissions caused an increase would require further comparison.

For iamrobin.ai, the supplied evidence establishes the declaration and its consistency with the repository. Citation, referral and inquiry gains remain unmeasured in this record. Whether a particular model trained on a particular page also remains unresolved.

A shared training-preference signal could make a publisher’s wishes easier to express across services. Its usefulness will depend on implementation, while the value of discovery will emerge through observable results. The file at the website’s front door tells crawlers what the publisher welcomes. The next part of the story belongs to the links, readers and relationships that follow.

**Sources**

- [OpenAI announcement, October 30, 2026](https://openai.com/index/helping-websites-express-ai-training-preferences/) and [crawler documentation](https://developers.openai.com/api/docs/bots).
- [Google Search Central announcement, October 30, 2026](https://developers.google.com/search/blog/2026/10/ai-training-control).
- [IETF Internet-Draft, Machine-Readable Training Preference Signal](https://datatracker.ietf.org/doc/draft-kelley-aipref-training-preference-signal/).
- [iamrobin.ai robots.txt](https://iamrobin.ai/robots.txt) and [public repository file](https://github.com/Robin84Bran/robin-web/blob/main/public/robots.txt), compared in the supplied verification record on November 1, 2026 HKT.

