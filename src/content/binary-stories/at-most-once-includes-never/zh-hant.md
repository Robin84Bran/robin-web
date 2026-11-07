---
title: "至多一次，也包括一次都沒有"
storySlug: "at-most-once-includes-never"
date: "2026-11-07"
updated: "2026-11-07"
lane: "BUILD"
excerpt: "一次遺失的工具呼叫可能藏著兩個相反的世界。重試次數無法判斷哪一個發生了；目標系統需要穩定的操作身分與收據。"
hero: "/binary-stories/at-most-once-includes-never/hero.webp"
ogImage: "/binary-stories/at-most-once-includes-never/og.webp"
keywords: ["至多一次執行", "冪等鍵", "遺失的工具呼叫", "持久化智能體"]
canonical: "https://iamrobin.ai/binary/stories/at-most-once-includes-never/zh-hant/"
inLanguage: "zh-Hant"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202611/20261107/special/"
sourceArtifactSha256: "95c0e59129e07c392f5cbd791b85a8e3cbe912fedb2cefafe2b43540393dc9bd"
carouselPdf: "/carousels/at-most-once-includes-never.pdf"
carouselCaption: "/carousels/at-most-once-includes-never.txt"
carouselPages: 7
draft: false
---

「至多一次」，也包括「一次都沒有」。

這是一個有用的可靠性承諾中最不舒服的一半。

Mistral 表示，部署在 Studio 中的工具至多執行一次。如果 worker 在呼叫期間崩潰，模型可能收到「呼叫遺失」結果：這個動作可能已經生效，也可能沒有生效。平台沒有悄悄重播同一個執行中的呼叫，但它也沒有憑空創造對外部世界的確定性。

同一個標籤，此時可以覆蓋兩個相反的現實。

一個現實中，工具在接收方接受請求之前停止，效果數是零。另一個現實中，接收方已經接受請求，但確認資訊在崩潰中遺失，效果數是一。

從智能體內部看，兩者都仍然未知。

## 一個上限，兩個隱藏世界

「至多一次」是執行次數的上限。它排除了該次已部署工具呼叫執行兩次，卻不保證外部效果已經發生，也不證明回應已經寫回工作階段。

復原流程必須選擇下一步。什麼都不做，會保住「零效果」的世界，卻可能放棄原本要完成的操作。盲目再試，可以修復「零效果」的世界，卻可能在「一個效果」的世界裡製造重複。

重試次數無法解決這個診斷問題。缺少的證據在接收系統裡。

![一次遺失的呼叫分叉成兩個隱藏的目標狀態：沒有被接受的效果，以及一個已被接受的效果。穩定的操作鍵和目標讀回把它們重新連接到同一個安全復原決策。](/binary-stories/at-most-once-includes-never/hero.webp)

Mistral 文件給出兩種跨越邊界的方法。如果接收系統支援冪等性，就傳入一個由預期請求生成的穩定鍵。復原時再次呼叫工具，同一個鍵仍然指向同一個操作。如果服務不支援這種鍵，就在重試前檢查原始結果。唯讀工具不需要這兩種保護，因為重複讀取不會改變目標狀態。

這個鍵不是智能體自身的魔法屬性。接收系統必須識別它，並回傳既有操作，而不是再建立一個。

## 三份記錄，三個問題

可復原的外部效果需要三份回答不同問題的記錄：

1. **工作階段檢查點：** worker 停止前，哪個模型步驟或工具步驟已經完成？
2. **操作身分：** 這次請求想執行的是哪一個外部操作？
3. **目標收據：** 接收系統接受了什麼？現在的狀態是什麼？

工作階段可以持久，目標狀態仍可不確定。操作鍵可以穩定，卻沒有任何效果被接受。收據可以證明接受，但智能體仍可能缺少原本應當帶回收據的回應。

把三份記錄壓成一個綠色狀態，會掩蓋復原真正要處理的故障。

源 Special 只示範了第一層。一個確定性的本地 harness 計算一次 SHA-256 摘要，原子保存工具完成後的檢查點，主動退出，再從已完成的計算之後復原。工具執行一次，重複動作是零，外部副作用是零，最終狀態為 `COMPLETE`。

這個結果有價值，正因為它很窄：它證明一份已保存的完成記錄讓一個本地唯讀步驟跨過中斷。它沒有測試 Mistral 託管執行環境、網路分區，也沒有測試任何會改變外部系統的工具。

## 安全重試的是同一個操作

乾淨的設計不會先問：「智能體可以呼叫工具多少次？」

它先問：「目標系統能否認出這是同一個預期操作？」

呼叫前，應用程式為業務請求建立穩定的操作 ID。工具把這個身分傳給接收系統。回應遺失後，復原流程按這個身分查詢目標。如果服務報告已經接受，智能體記錄收據並繼續；如果報告尚未接受，可以使用同一個鍵重試；如果服務無法回答，結果保持 `UNKNOWN`，系統不應虛構零或一。

這不是「恰好一次」的魔法，而是明確管理不確定性。

Mistral 的公開預覽文件把邊界寫得很清楚：已完成的步驟可以跨越 worker 存活；worker 停止時仍在執行的工作，結果可能未知。模型可能再次呼叫工具，所以有副作用的工具仍然需要可安全重試的設計。

最強的復原證據不是「智能體嘗試了一次」。

而是：預期操作擁有一個穩定身分，目標系統識別了它，復原流程拿到收據後才宣告外部效果完成。

「至多一次」限制重複。

收據告訴你，那一次是否發生。

---

**來源：** Mistral 的 [Managed Agents 概覽](https://docs.mistral.ai/studio/agents/overview)、[工具執行文件](https://docs.mistral.ai/studio/agents/learn/agent/tools)、[執行模式持久性說明](https://docs.mistral.ai/studio/agents/learn/where-it-runs/run-modes)，以及雜湊綁定的[源 Special](https://iamrobin.ai/ouroboros/202611/20261107/special/)。官方來源於 2026 年 11 月 7 日重新開啟核對。Managed Agents 與 Agents SDK 當時處於公開預覽。本文沒有使用供應商帳戶、模型呼叫、外部副作用、付款、訊息、交易或真實冪等測試；代表性效果復原仍為 `UNKNOWN`。
