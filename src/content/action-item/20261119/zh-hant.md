---
title: "十六個代理可以共享同一個錯誤"
date: 2026-11-19
updated: 2026-11-19
section: Ouroboros
series: Daily Action Item
hero: /action-item/20261119/hero.webp
ogImage: /action-item/20261119/og.webp
ledgerId: MULTIAGENT-SHARED-ERROR-20261119
draft: false
categories:
  - 代理工作流程
  - 編輯系統
  - AI 核驗
tags:
  - Perplexity Computer
  - Multiagent
  - Model Council
  - 來源核驗
keywords:
  - 多代理共享錯誤
  - 獨立證據核查
  - 代理協作
  - AI 檔案分發
excerpt: "共享上下文讓 AI 團隊協作更快；獨立查證來源，才能防止一個錯誤變成集體共識。"
canonical: "https://iamrobin.ai/ouroboros/202611/20261119/action_item/zh-hant/"
author: https://iamrobin.ai/#person
inLanguage: zh-Hant
languageSlug: zh-hant
translationOf: "https://iamrobin.ai/ouroboros/202611/20261119/action_item/"
translationReview: PASS
sourceAction: "2026-11-19 Daily Briefing, item 5"
visualHeadline: "共享上下文，也可能共享錯誤。"
visualSubhead: "協作 · 溯源 · 核驗"
visualFooter: "共識必須能追溯到證據"
visualNodes: "來源|共享|核查|糾正"
thesis: "協作與核驗解決不同的問題：代理可以共享工作，但關鍵主張必須留有獨立的證據路徑。"
---

# 十六個代理可以共享同一個錯誤

一項複雜任務，交出的往往不只是答案，還有一串文件、計算、修訂與決定。有人讀原始材料，有人做預測，有人核對預測是否與文字解釋一致。工作越大，讓所有人保持同步就越像一項獨立任務。

Perplexity Computer 把這樣的協作帶進 AI 工作。它把模型——生成回答並進行推理的軟體——與工具、文件和已連接的應用程式接起來，處理需要多個步驟的任務。代理則是獲派任務、可使用工具完成工作的 AI 執行者。多個代理可以共同完成一份報告或預測。

好處很直觀：把大任務拆開，再彙總成果。難題發生在過程中。每個執行者都需要足夠的資訊才能貢獻工作；每項主張也都需要一條可靠路徑，回到支持它的證據。

2026 年 11 月 17 日，Perplexity 為 Computer 增設 **Multiagent** 執行級別，供 Perplexity Max 網頁訂閱者使用。核心變化是代理可以直接協作：分享發現、相互核查，並共同完成用戶最終收到的文件等交付物。

這次發布把 AI 團隊的三種組織方式區分得很清楚。

在 **Ultra** 模式中，一個主模型把任務分給輔助代理，代理把發現交回主模型，由主模型統籌。在 **Multiagent** 中，主模型仍負責協調，但代理之間也能直接交換發現。一處工作中的新發現，可以在另一名代理繼續工作時就影響其判斷。

**Model Council** 走的是另一條路。幾個模型先獨立調查同一個問題，Computer 再彙總結果，展示它們的共識與分歧。不同的調查路線可以先各自發展，之後才讓答案相遇。

三種安排各有用途：Ultra 管理分工，Multiagent 支持相互關聯的工作，Model Council 在起步階段保留獨立調查。理解這些差異，比想像一屋子越來越忙的數位員工更重要。

Perplexity 舉出的 Multiagent 用途包括：投資前審閱一家公司的整套商業文件，或針對多種未來情景編製預測。此類任務環環相扣。合約中的一項發現可能改變收入假設；假設一變，預測也要調整，最後的報告又得跟著改。

直接共享讓變更能在團隊內傳遞。早期錯誤也可能沿著同一條路擴散。

可以把這想成一家新聞編輯部共用的即時採訪板。這是用來說明協作問題的類比。記者把新發現貼上去，同事就知道哪些資訊已經找到。一人繼續採訪時，另一人可以先寫稿。共享板省時間，也讓大家朝同一篇報道推進。

現在設想板上有一條公司公告的日期寫錯了。幾位作者照著它寫進草稿，表面上彼此一致，實際卻都指向同一條錯誤記錄。若有專人打開公告原文核對，就多了一次獨立發現錯誤的機會。

共享板和事實核查員各有價值：前者讓團隊更容易協調，後者檢驗一項主張能否經得起原始來源的核對。

十六個代理也可能遇到同樣的問題。這裡的「十六」只是說明用的數字；Perplexity 公告描述的是協作模式。如果每個代理都繼承了同一份錯誤摘要，最終作品可能在一個錯誤之上形成廣泛共識。真正該問的是：這份共識背後有多少次相互獨立的證據核查？

Perplexity 的共享工作區設計，解釋了資訊如何在團隊中流動。公司把 Projects 描述為可持續使用的工作區：人和代理不斷推進工作時，文件與歷史記錄仍會保留下來。

這些工作區使用 Git 記錄文件版本。每個代理在獨立的沙盒，即隔離的工作區域中操作，再提交一筆稱為 commit 的變更記錄。共享服務只接受基於最新已接納版本的提交。若代理依據的是舊版本，就必須取回最新工作、重放自己的修改，再次提交。

這解決了一個實際的協作難題：多個代理可能同時編輯相關材料。要求每項獲接納的變更都基於目前版本，有助於保持共享成果一致。提交歷史和單獨的接納記錄，也方便追查誰改了甚麼。

Perplexity 報告，在生產環境中，因基於舊版本而被拒絕的提交不到 2%；提交耗時的中位數低於 1.7 秒，也就是測量樣本中處於中間位置的那次提交用時不到 1.7 秒。這些公司提供的數據，衡量的是接納變更的機制。

事實準確性是另一層問題。一項順利接納的修改，可能包含認真核實的事實、合理估計，也可能只是複製了錯誤。文件歷史幫助人找到變更；原始來源才幫助人判斷主張是否站得住。

研究人員多年來一直在探索讓 AI 系統互相質疑答案的方法。2023 年 5 月 23 日，Du 等人提交論文 *Improving Factuality and Reasoning in Language Models through Multiagent Debate*，研究多個模型實例先提出答案，再進行多輪辯論。這為「辯論」模式提供歷史背景；研究結果只適用於論文所測試的系統與實驗。

Perplexity 現在的產品提出了一個新的實踐問題：團隊成員協作時，應保留多少獨立調查？

一種可能做法是把共同製作與獨立核驗分開。代理可以共享文件、任務進度和工作假設；核查者則獨立打開報告核心主張所依據的來源。來源連結、引入主張的代理記錄，以及可見的糾正歷史，都有助於之後覆核。

這是一種擬議中的審查方式，價值要靠實際效果驗證。公平的比較應讓不同模式處理可比任務，再評估最終作品、總成本、人工協助時間以及出錯後的恢復能力。現有產品說明仍不能回答 Ultra、Multiagent 與 Model Council 在可比條件下表現如何；工作區指標只能說明較窄範圍內的基礎設施效能。

翌日的另一項公告，也凸顯了原始來源的重要性。11 月 18 日，OpenAI 與 Le Groupe Figaro 宣布合作，涵蓋 Le Figaro 及相關刊物的當期報道與檔案。ChatGPT 可以透過摘要、摘錄和指向原文的連結，讓讀者發現這些文章。Le Figaro 保留新聞編輯獨立性及對報道的控制權。

這項合作說明，原創報道和檔案可以成為 AI 分發中的資產。它最終如何影響讀者流量和出版商經濟，仍有待觀察。對於核查主張的 AI 團隊，通往原文的連結提供了一個具體落點：人可以在那裡檢驗摘要背後的證據。

共享工作區幫助代理一起把任務往前推。獨立調查則可能揭示結論之間的分歧。設計上的關鍵，是決定這兩種能力在哪裡相接。

當 AI 團隊越來越容易組建，哪些部分應該共享上下文，哪些部分應該保持獨立？

**來源**

- Perplexity，[Introducing Computer Multiagent](https://www.perplexity.ai/en-GB/hub/blog/introducing-computer-multiagent)，2026 年 11 月 17 日；[新聞列表](https://www.perplexity.ai/en-GB/hub/blog/category/news)；[Model Council 更新記錄](https://www.perplexity.ai/en-GB/changelog/shared-workspaces-personal-computer-for-windows-and-model-council)。
- Perplexity，[Building shared workspaces for people and agents](https://www.perplexity.ai/en-GB/hub/blog/building-shared-workspaces-for-people-and-agents)。
- OpenAI，[Le Groupe Figaro and OpenAI announce partnership](https://openai.com/index/le-groupe-figaro-and-openai-announce-partnership/)，2026 年 11 月 18 日。
- Du 等人，[Improving Factuality and Reasoning in Language Models through Multiagent Debate](https://arxiv.org/abs/2305.14325)，2023 年 5 月 23 日提交。
