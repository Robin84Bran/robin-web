---
title: "誰有權判定智能體的工作已經完成？"
date: 2026-11-21
updated: 2026-11-21
section: Ouroboros
series: Daily Action Item
hero: /action-item/20261121/hero.webp
ogImage: /action-item/20261121/og.webp
ledgerId: AGENT-COMMERCE-ACCEPTANCE-20261121
draft: false
categories:
  - Agent Commerce
  - AI Verification
  - Financial Infrastructure
tags:
  - agent commerce
  - x402
  - A2A
  - ERC-8183
  - ERC-8004
keywords:
  - agent acceptance
  - machine payments
  - evaluator trust
  - digital delivery
author: https://iamrobin.ai/#person
sourceAction: "2026-11-21 Daily Briefing, item 5"
visualHeadline: "Delivery is only one event."
visualSubhead: "PAYMENT · ARTIFACT · ACCEPTANCE"
visualFooter: "Who may say the work is done?"
visualNodes: "QUOTE|PAY|DELIVER|ACCEPT"
thesis: "智能體商務需要可檢查的驗收規則，把付款、技術性交付與買家認可的成果分開。"
excerpt: "智能體已能購買服務、收取檔案；更難的問題是，誰有資格判定成果可以接受。"
canonical: "https://iamrobin.ai/ouroboros/202611/20261121/action_item/zh-hant/"
inLanguage: zh-Hant
languageSlug: zh-hant
translationOf: "https://iamrobin.ai/ouroboros/202611/20261121/action_item/"
translationReview: PASS
---

# 誰有權判定智能體的工作已經完成？

網上買東西，通常有幾個分明的時刻：同意價格、完成付款、收到貨物，然後判斷它是不是自己要的東西。

軟件正逐步接手這套流程。AI 智能體是能圍繞目標執行步驟的程式：尋找服務、詢價、安排購買，再取回結果。在智能體商務裏，一個智能體可以代表人向另一個智能體採購。買的可能是數據存取權、數碼服務，也可能是一份委託撰寫的報告。

買家的老問題因此換了新場景。付款、交付和滿意各有含義。機器愈容易完成購買，系統就愈需要回答：一張訂單何時才算達成原本的目的？

幾套公開流程和擬議標準，已展示這些環節可能如何銜接。故事從報價開始。

## 從需求走到交付

CROO 提供透過 AI 客戶端購買服務的工具。其公開產品頁列出三步：用戶描述任務並選擇服務、確認報價、在對話中接收交付。CROO 稱，其 Skill——供 AI 客戶端使用的一套指令——適用於 Claude Code、Codex 等客戶端。

頁面示例很具體：一項每月圖片發佈服務報價 30 USDC。USDC 是設計來追蹤美元價格的數碼代幣；報價另加 0.02 USDC 的「gas」，即處理區塊鏈交易的費用，總計 30.02 USDC。交易使用名為 Base 的區塊鏈網絡。

示例還寫明 CAP escrow。Escrow 即託管，在處理約定條件期間暫存款項，讓資金在交易推進時有地方等待。

演示設定服務須在 30 分鐘內完成，逾時則退款；付款前明確請求用戶批准。CROO 的保障規則稱，每筆付款都需要用戶批准，服務、價格或要求有變時須重新批准。

畫面中的交付物是一組兌換碼。

整套流程讓交易容易追蹤：買家看到服務與價格、批准付款、在對話中收到可使用的東西。CROO 的訂單介面還把預覽、確認、狀態與結果擷取分開。

這裏的證據是公開產品演示。若有經獨立核實的實際購買、買家驗收決定或爭議處理紀錄，才能進一步看到流程在真實交易中如何運作。

即使只看演示，也能看到一條關鍵分界。批准報價，是同意購買；收到兌換碼，是記錄交付。服務是否滿足買家，仍要看承諾了甚麼，以及雙方約定的條件。

**舉個說明性的例子：** 快遞送到門口，送達紀錄能證明包裹到了；拆開之後，才能核對裏面是不是買的東西。AI 生成的報告也一樣，只是「拆包」可能意味核對來源、重算數字，並判斷報告有沒有回答原來的問題。

## 系統各自能證明甚麼

Amazon Web Services 描述了另一段購買流程：AI 智能體透過 AWS Marketplace 購買產品存取權的架構。

它採用 x402，一項以 HTTP 402「Payment Required」為基礎的開放支付標準。HTTP 是網絡軟件交換請求與回應的機制；x402 讓賣家以機器可讀的形式提出付款要求，讓買家提交付款證明。

在 AWS 的流程裏，智能體接收付款要求，透過已設定的支付系統授權並提交付款，然後存取已付費資源。

這解決了一個具體問題：程式遇到收費服務後，可以按明確流程購買存取權。x402 白皮書也把這種模式用於 API——程式請求服務的介面——以及數據和其他數碼服務。

由此產生的證據有明確邊界：付款方滿足了賣家的付款要求。至於買來的工作是否有用、內容是否準確，還要再判斷。

Google 的 Agent2Agent 協議，簡稱 A2A，處理協作和交付。它讓智能體按標準方式發現能力、交換工作。Google 的實作文章描述任務從 *submitted*、*working* 走向 *completed* 或 *failed* 等狀態。

任務產物稱為 **artifact**，通俗說就是檔案、報告或其他交付成果。

A2A 任務顯示 completed，意味遠端智能體產出了 artifact，方便請求方安排下一步。商業上的驗收仍取決於買家要求，以及評價成果的規則。

合起來看，這些系統讓軟件讀懂多個事件：收到付款要求、完成付款、工作進行中、成果已交付。交付之後才是決定整筆交易意義的問題：誰來判斷成果是否符合委託？

## 把驗收權交給誰

ERC-8183 是一項擬議中的以太坊標準，名為 Agentic Commerce。它把驗收決定設為一個明確角色。

提案引入 **evaluator（評估者）**：被指定按照要求判斷交付工作的個人、程式或區塊鏈合約。區塊鏈合約是在鏈上按規則執行的軟件。按照提案，評估者或評估合約可決定提交的任務是 *Completed* 還是 *Rejected*；生命週期中還有 *Expired* 這一最終狀態。

在這裏，完成包含了指定角色對提交成果作出的判斷。提案為分配這項權力提供了一套語言。它仍是擬議標準，不能把已發表的設計當成實際採用或評估者準確性的證據。

合適的評估者要看任務性質。

對規格嚴格的數碼交付，程式可以核對檔案是否符合約定的指紋、是否包含必需欄位、能否通過測試。期限同樣容易量度。這些檢查各自回答一個事前定義清楚的問題。

研究、設計和寫作需要更廣的判斷。報告可以準時送達並正常打開，來源和推理仍須細審；設計可以符合尺寸要求，卻未必適合目標讀者。買家覆核、專業評估者，或軟件檢查與人工判斷結合，都可能適用。

付款前寫下驗收標準，雙方才有共同參照。保留交付的 artifact，才能檢視同一份成果；事先約定申訴或退款途徑，才能在意見不一致時有處理辦法。

評估者本身也成為買賣雙方必須信任的一方。身份、誘因、判斷依據和過往錯誤都重要，因為它的決定可能決定交易結果。

另一項以太坊提案 ERC-8004 涉及智能體身份、聲譽和驗證紀錄。它容許附帶質素、成功率、正常運作時間、回應時間等數值和標籤的回饋。ERC-8183 則建議把任務結果接入聲譽信號。

這些紀錄或可幫助未來買家挑選服務方，價值卻部分取決於回饋是誰給的。ERC-8004 警告，未經篩選的回饋會受到垃圾訊息和 Sybil 攻擊：同一人用多個身份影響系統。因此，它的彙總功能要求按客戶端地址篩選。

聲譽記錄過去的判斷；驗收決定眼前這一單。兩者都可能幫助市場運作，也各自需要與用途相稱的證據。

目前審閱的資料包括產品流程、支付機制、協作協議和擬議標準。它們支持多種可能的驗收方法；不同工作類型下哪種方法表現更好，仍是開放的研究問題。

機器可以收到付款指令、購買存取權、取回 artifact。任務足夠精確時，預先約定的測試或可決定驗收；任務開放時，買家或專家可能要承擔更多判斷。

當一台機器能向另一台機器付款並收到檔案，究竟誰有資格說：工作完成了？

資料來源：

- [CROO 公開產品流程](https://agent.croo.network/skill)
- [AWS Marketplace 與 x402 支付架構](https://aws.amazon.com/blogs/machine-learning/enable-ai-agents-to-pay-for-aws-marketplace-x402-products-with-amazon-bedrock-agentcore-payments/)
- [x402 白皮書](https://x402.org/wp-content/uploads/sites/10/2026/06/x402-whitepaper.pdf)
- Google 的 [A2A 介紹](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/)與[實作文章](https://developers.googleblog.com/build-cross-language-multi-agent-team-with-google-agent-development-kit-and-a2a/)
- [ERC-8183 Agentic Commerce 提案](https://eips.ethereum.org/EIPS/eip-8183)
- [ERC-8004 身份、聲譽與驗證提案](https://eips.ethereum.org/EIPS/eip-8004)
