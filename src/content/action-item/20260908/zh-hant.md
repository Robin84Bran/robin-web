---
title: "Astra升級階梯"
date: 2026-09-08
updated: 2026-09-08
section: Ouroboros
series: Daily Action Item
categories:
  - Artificial Intelligence
  - Agent Systems
  - Operating Models
tags:
  - GPT-6 Astra
  - GPT-5.6 Sol
  - One Person Company
keywords:
  - Astra escalation
  - Sol routing
  - founder interruption
  - verified outcomes
  - cost per rescue
excerpt: "當一次有邊界的救援能把停滯任務轉化為驗證結果，並把時間還給創始人，Astra的溢價才成立。"
hero: /action-item/20260908/hero.webp
ogImage: /action-item/20260908/og.webp
canonical: "https://iamrobin.ai/ouroboros/202609/20260908/action_item/zh-hant/"
author: https://iamrobin.ai/#person
inLanguage: zh-Hant
languageSlug: zh-hant
translationReview: PASS
translationOf: "https://iamrobin.ai/ouroboros/202609/20260908/action_item/"
draft: false
sourceAction: "Daily Briefing 2026-09-08, item 5"
ledgerId: ASTRA-ESCALATION-LADDER-20260908
visualHeadline: "Escalate the problem."
visualSubhead: "SOL EXECUTES · ASTRA RESCUES"
visualFooter: "VERIFY · LEARN · REROUTE"
visualNodes: "SOL|TRIGGER|ASTRA|VERIFY"
---

## 默認模型是產品選擇

**結論很直接：Astra應該先替代Robin成為升級台，而不是先替代Sol成為日常執行者。** Sol繼續處理終點清楚、邊界明確的任務；只有任務穿過既定失敗門檻，且預期救援價值高於增量成本時，Astra才接手。最終由測試、回執和外部證據判定救援是否成功。

Codex CLI 0.153.4在未明確指定模型時把Astra設為內置默認。這是面向廣泛用戶的產品選擇，卻不足以成為一人公司的運營政策。[Codex Changelog](https://learn.chatgpt.com/docs/changelog)。OpenAI報告Astra相對Sol在Terminal‑Bench 4.0為57.9%對37.3%、AutomationBench為41.4%對18.1%、OSWorld為72.6%對65.7%；DeepSWE則只有74.1%對72.7%。這些是供應商評測，只能支持測試假設，不能替代RobinOS實績。[Astra發佈與評測](https://openai.com/index/gpt-6-astra/)。

價格差同樣明確：Astra每百萬輸入、輸出Token分別為10美元和50美元，Sol為4美元和20美元，即對應單價均相差2.5倍。[Astra模型頁](https://developers.openai.com/api/docs/models/gpt-6-astra)。[Sol模型頁](https://developers.openai.com/api/docs/models/gpt-5.6-sol)。真實任務成本還取決於緩存、工具、重試、上下文及模型完成任務所需Token。

## 計算救援成本，而不是模型價格

Token價格是採購數據；每個驗證結果的總成本才是經營數據。便宜模型若失敗兩次、破壞工作狀態、耗掉一小時審查並把收尾留給Robin，最終並不便宜。高價模型若憑一個精確救援包一次修復難點，並通過外部驗證，反而可能更經濟。

每個任務至少記錄總模型與工具成本、總耗時、Robin介入分鐘、打斷次數、修復循環及驗證完成。還要記錄恢復是否製造重復後果：重復發佈、重復發送或覆蓋新源，即使最終頁面正確，也屬於控制失敗。

9月4日的[Capability Is Not Authority](https://iamrobin.ai/ouroboros/202609/20260904/action_item/)區分了能力、授權、權限、執行和驗證結果。升級只改變執行者及其上下文，不改變文件、目的地、權限和停止門禁。9月6日的[Four Loop Test](https://iamrobin.ai/ouroboros/202609/20260906/action_item/)提出完成、恢復、記憶與改進；9月7日的[Three Agent Workdays Still Need a Founder](https://iamrobin.ai/ouroboros/202609/20260907/action_item/)加入創始人注意力和空白十任務賬本。今天的階梯補上閉環中的交接規則。

本次發佈不改變生產路由。20項任務記分表從空白開始，缺失觀察一律保持UNKNOWN。

## 四種觸發器值得升級

第一是架構歧義。Sol可以完成局部修改，卻可能遺漏跨組件、Schema、部署規則和持久狀態的合同。只有執行者已指出衝突與所需證據，仍無法形成一致改動邊界時才升級。“任務很大”不是觸發器；必須寫明未解決接口，以及再試一次為何只會重復同一不確定性。

第二是同一驗收門檻連續兩次修復失敗。第一次失敗通常帶來可行動信息，執行者應先診斷、修復。第二次仍失敗才說明當前方法卡住。升級前要保存兩次失敗、命令、改動文件和最近正確狀態。

第三是困難computer use或跨系統執行。OpenAI報告的OSWorld與AutomationBench差距，使其成為最清晰的Astra測試候選。確定性Shell修改仍留在日常通道；跨瀏覽器狀態、本地文件和遠端記錄的脆弱流程，可以更早升級，以減少人工重建和重復副作用。

第四是靜默錯誤代價很高的最終證據審查。這是審查通道，不是重寫通道。Astra只接收成品、權限邊界、預期證據與改動清單，檢查矛盾、缺證、越界及回滾；確定性門禁在審查前後都要運行。

## 救援包就是控制面

Astra應收到結構化救援包，而非聊天摘要。救援包包括任務編號、精確目標、凍結終點、允許與禁止範圍、確認工件、源版本、觀察到的失敗、已嘗試修復、最近正確狀態及下一項安全驗證。

它不包含隱藏推理，也不寫“Sol為什麼失敗”的自信故事。“SEO門禁因三個語言路由缺失而失敗”是證據；“Sol不懂Astro”只是猜測。遠端狀態可能已改變時，第一步必須只讀確認；外部副作用必須攜帶冪等證據。沒有響應絕不等於遠端動作失敗。

救援後，Astra返回緊湊回執：改動文件、執行命令、通過測試、未解決事實、外部效果、回滾點及是否滿足原終點。模型說明只能用於診斷，不能成為唯一證明。

OpenAI研究團隊報告約3.1個Agent工作日對應一個人類工作日，同時超過一半成功的4至8小時任務仍需要人工介入。這是OpenAI內部數據，不可直接外推到RobinOS，卻證明更多機器勞動與更少人類協調是兩項不同結果。[OpenAI研究工作流證據](https://openai.com/index/research-acceleration-view-inside-openai/)。

## 評測20項真實任務

在查看結果前凍結20項RobinOS真實任務，分為日常、跨文件架構、恢復和證據四類，每類五項。每項任務跨所有嘗試保持同一編號，不能用“救援任務”另起分母。

記錄由哪條通道閉環：Sol單獨完成、Sol後Astra救援，或Sol後Astra證據復核。首要指標是每項分配任務的驗證完成；第二是Robin介入分鐘與打斷次數；第三是包含全部失敗、工具和審查的每個驗證結果總成本。同時報告總耗時、修復循環、自動恢復和未授權改動。

負面證據也必須記錄：Sol本可完成的錯誤升級、需要Robin介入的延遲升級、擴大改動面的救援、重放失敗的經驗。供應商benchmark可以設計實驗，只有RobinOS回執才能改變RobinOS路由。

## 把救援變成路由證據

成功救援進入候選經驗，攜帶來源、日期、任務類別、觸發器、結果、成本和驗證；第二個相似任務確認前只能保持試用狀態。“Astra在Sol兩次失敗後修復這個跨文件Schema衝突”是觀察；“Schema永遠用Astra”是過度概括。

若某觸發器持續預測成功救援，可對該類別更早升級；若Sol持續無干預過線，則繼續留給Sol。每次路由變更都保存前一規則、促成變化的證據、生效日與復核門檻，使後續失敗能夠重放當時為何這樣分配。

Murphy測試應覆蓋誘人的錯誤觸發、昂貴死循環、提出無關改動的救援、遠端寫入成功後的超時，以及單個故事形成的“經驗”。正確系統會拒絕擴權、先查遠端狀態、限制修復次數，並讓孤例保持試用。

## 決策規則

20項賬本為空時，Sol保持日常執行者。只有命中四個觸發器之一，並附完整救援包時才升級；接受前必須通過確定性驗證或獨立、有證據的人類判斷，未知事實保持UNKNOWN。

當重復救援提高完成率，或減少的Robin介入足以覆蓋全部增量成本，且權限、來源、恢復、回滾、防重與記憶質量沒有重大退化時，才擴大Astra通道。樣本和任務類別必須公開保留。

若任務終點移動、源版本不清、權限衝突、後果性動作後無法確認遠端狀態，或驗證器受同一份未審查輸出控制，應暫停升級並先修復狀態。

Astra每次只憑一個驗證救援賺取溢價。Sol保留日常通道，直到證據改變判斷。Robin只處理真正需要Robin的決定。

## 類別與關鍵詞

**Categories:** Artificial Intelligence; Agent Systems; Operating Models; One-Person Company

**Keywords:** GPT-6 Astra; GPT-5.6 Sol; escalation ladder; rescue packet; founder interruption; verified outcomes; cost per rescue; deterministic verification; model routing

**Hashtags:** #AI #AgentSystems #RobinOS #OnePersonCompany #VerifiedOutcomes

