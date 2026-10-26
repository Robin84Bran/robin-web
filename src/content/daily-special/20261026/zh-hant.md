---
title: "鬧鐘不是回執"
date: "2026-10-26"
updated: "2026-10-26"
section: "Ouroboros"
series: "Daily Special"
lane: "RESEARCH"
tags: ["AI智能體", "自動化", "可靠性"]
keywords: ["OpenAI Agents API自動化", "定時智能體可靠性", "驗收回執", "智能體可觀測性"]
categories: ["Research", "Systems"]
excerpt: "定時智能體可以醒來、接收任務，卻仍然沒有產出可用結果。區分鬧鐘與驗收結果的證據，散落在幾類不同紀錄裡。"
hero: "/daily-special/20261026/hero.png"
ogImage: "/daily-special/20261026/og.png"
canonical: "https://iamrobin.ai/ouroboros/202610/20261026/special/zh-hant/"
author: "https://iamrobin.ai/#person"
inLanguage: "zh-Hant"
draft: false
translationReview: "PASS"
sourceSignal: 1
researchScope: "一項範圍明確的公開資料研究：OpenAI Agents API 的排程、呼叫、工作階段與輪次證據各自能證明什麼；未執行即時自動化或量化前瞻測試，也未進行交易、資本配置、訊息傳送或底層決策。"
artifactSha256: "9c958332e94b3f43b75a4996983c3ba13f3188fdc0f0232b4732b41bfcb97bf5"
evidenceSources: ["https://developers.openai.com/api/docs/guides/agents-api/sessions/automations", "https://developers.openai.com/api/docs/guides/agents-api/sessions/events", "https://developers.openai.com/api/docs/guides/agents-api/observability", "https://developers.openai.com/api/docs/guides/agents-api/errors"]
---

08:00，鬧鐘響了。一個新的 invocation 出現，狀態轉綠。

但每日簡報沒有出現。

這就是定時智能體裡一個很小、後果卻很大的縫隙：系統可以在證明工作已經完成、正確完成或值得驗收之前很久，就證明自己曾嘗試交付任務。

OpenAI 的 Agents API 文件把這些事件分得很清楚。排程可以週期執行，也可以只執行一次；它可以建立新工作階段，也可以繼續現有工作階段。每次觸發都會建立一個 invocation，也就是一次交付工作的嘗試。交付成功後，invocation 會變成 `completed`。

這個詞的含義比聽起來窄。這裡的 completed 只表示工作階段接收了初始輸入、通知或要求，不表示智能體已經做完工作。

狀態本身沒有錯。錯的是讓一個狀態證明超出其含義的儀表板。

## 五盞含義不同的綠燈

更有用的理解方式，是把證據看成一架梯子：

1. **已排程。** 有效排程存在，但不代表已經觸發。
2. **已呼叫。** 本次觸發建立了 invocation，但不代表已經交付成功。
3. **已交付。** invocation 已 completed；工作階段接收了任務，但智能體未必完成。
4. **輪次結束。** 工作階段事件顯示根輪次已完成、失敗或取消；單一工具仍可能失敗，副作用也可能已經發生。
5. **已驗收。** 為這項具體任務預先定義的檢查，確認結果可用。

前四層是平台證據。第五層屬於任務所有者。只有任務所有者知道：市場簡報是否用了完整輸入、報告是否涵蓋承諾日期、產生的檔案是否符合規定結構與雜湊。

這個區別會改變分母。「已交付 invocation／invocation」衡量運送；「已驗收結果／排程觸發次數」衡量結果。兩者都可以誠實報告，但回答的不是同一個問題。

## 一次綠色執行如何無果而終

想像一個 08:00 的研究任務。這只是例子，並非真實執行。

invocation 成功交付，工作階段接收任務。智能體讀取兩個來源，隨後遇到一個需要函式回傳值、環境連線或核准的工具。定時通知無法提供這些條件，執行開始等待。

如果監控把交付當成成功，它已經錯了；如果把工作階段閒置當成成功，它又錯一次。應用程式必須繼續追蹤工作階段事件，並查看根輪次的結果。

即使輪次完成，也不是完整答案。輪次內某個工具可能失敗；一段看似合理的文字，可能建立在缺失來源之上。失敗輪次也可能已經改寫檔案或呼叫工具，因此盲目重試會重複副作用。

在這一切開始之前，時間也可能漂移。OpenAI 說明，週期任務會加入小幅隨機延遲；目標工作階段忙碌時，invocation 還會等得更久。因此，排程時間是意圖，不是精確執行時間的證據。對時效性研究而言，遲到會變成輸入品質問題，而不只是表面延遲。

## 把驗收接到排程上

最簡單的修復，是一條連接所有證據的紀錄。可以叫它「驗收回執」。

這是本文的編輯提議，不是 OpenAI 的功能或要求。它把排程觸發、invocation、工作階段、根輪次與最終產物連在一起，用來回答一個樸素問題：這次定時喚醒，究竟完成了什麼？

對嚴肅任務，我會記錄：

- 排程及預定觸發時間；
- invocation 與交付結果；
- 工作階段與根輪次的終止狀態；
- 缺失輸入和失敗工具；
- 產物時間戳、結構檢查與雜湊；
- 重試、重播以及任何人工救援；
- 暫定的用量與成本；
- 面向任務的結論：已驗收、已拒絕、未完成或經救援完成。

用量尤其需要克制。文件把用量描述為盡力提供：它可能是 null，可能在輪次結束後變化，也不是最終帳單。空白欄位代表證據缺失，不代表免費。

回執也應保持適度。沒有外部副作用的唯讀任務，也許只需要檢查產物是否存在、結構是否有效、雜湊是否一致。會寫檔案、呼叫工具或觸發後續工作的任務，則需要更強的台帳和有上限的重試規則。回執本身也是軟體；過度建設，它就會成為新的故障面。

重播有幫助，但只能回答它能回答的問題。凍結輸入可以暴露執行間差異；多次結果一致仍可能一起出錯，因此重播不能證明正確，也不能預測未來表現。

## 這項研究沒有證明什麼

我沒有找到這些定時自動化公開的、帶明確分母的可靠率，也沒有找到延遲分布或全成本基準。本次 Special 沒有執行即時自動化或量化前瞻測試，也沒有進行交易、資本配置、訊息傳送或底層決策。

這裡完成的工作更小：一張經過來源核驗的證據邊界圖。喚醒是事件，驗收是判斷。兩者之間，還有交付、執行、工具結果、產物，以及決定結果是否足夠好的規則。

下次定時智能體讓儀表板轉綠時，不要只問它是否執行。要問：什麼證據真正跨過了最後一道縫隙？

## 註釋與來源

OpenAI 文件分別說明了[定時自動化][1]、[工作階段事件與根輪次][2]、[追蹤、追蹤評分與暫定用量][3]，以及[錯誤復原與有界重試][4]。完整[研究資料](/daily-special/20261026/artifact.md)保留了本文使用的證據圖與邊界。

[1]: https://developers.openai.com/api/docs/guides/agents-api/sessions/automations
[2]: https://developers.openai.com/api/docs/guides/agents-api/sessions/events
[3]: https://developers.openai.com/api/docs/guides/agents-api/observability
[4]: https://developers.openai.com/api/docs/guides/agents-api/errors
