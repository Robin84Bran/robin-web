---
title: "記憶功能只是轉移了記憶問題"
storySlug: "the-memory-feature-moved-the-memory-problem"
date: "2026-11-03"
updated: "2026-11-03"
lane: "BUILD"
excerpt: "五分鐘的伺服器端執行緒可以減輕正常路徑的負擔，卻不能取代復原所需的持久帳本。"
hero: "/binary-stories/the-memory-feature-moved-the-memory-problem/hero.webp"
ogImage: "/binary-stories/the-memory-feature-moved-the-memory-problem/og.webp"
keywords: ["Claude Message Threads", "代理復原", "對話帳本", "冪等性"]
canonical: "https://iamrobin.ai/binary/stories/the-memory-feature-moved-the-memory-problem/zh-hant/"
inLanguage: "zh-Hant"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202611/20261103/special/"
sourceArtifactSha256: "7729c30c2b7caf0724e960feb26cf985de2dfd46b5115546f3f19354931d59c4"
carouselPdf: "/carousels/the-memory-feature-moved-the-memory-problem.pdf"
carouselCaption: "/carousels/the-memory-feature-moved-the-memory-problem.txt"
carouselPages: 7
draft: false
---

記憶功能只是轉移了記憶問題。

Anthropic 於 2026 年 11 月 2 日發布 Message Threads 測試版。用戶端建立執行緒時傳送完整對話；後續輪次只需傳送新增訊息和上一個回應 ID。只要執行緒仍可用，每次請求便不必重複攜帶全部上下文。

這很有用，但它不是應用程式的持久記憶。

伺服器端執行緒只是一份短期工作副本。Anthropic 文件寫明：執行緒在最後一次請求後可用五分鐘，保留資料會在最後一次使用後一小時內刪除。執行緒消失後，應用程式必須以完整對話建立新執行緒。捷徑因此依賴一份比它更長壽的帳本。

## 兩份副本，兩種職責

伺服器端副本負責加速正常路徑：先接收一次完整歷史，再在執行緒 ID 有效期間接收增量訊息。

應用程式副本負責失敗路徑：它保存有序的使用者、助理與工具訊息，讓系統在執行緒過期、暫時不可用或程序中斷後仍可重建對話。

![五分鐘的臨時伺服器端執行緒加速正常路徑，持久的應用程式帳本負責重播與復原。](/binary-stories/the-memory-feature-moved-the-memory-problem/hero.webp)

這個分工來自復原協議，而不是個人偏好。`thread_not_found` 無法找回只存在於失效執行緒內的歷史；復原只能建立新執行緒，再由應用程式保存的完整記錄開始。

TypeScript SDK 輔助器會在目前程序中保留對話歷史，讓後續請求只傳送新增訊息。但程序記憶體仍是一道邊界。若系統崩潰、重啟或把任務交給另一個程序，而對話又必須可復原，持久來源就必須位於程序之外。

把執行緒 ID 當成持久記憶，會令架構倒置：可替換的參照成為事實來源，真正能執行復原的副本反而可能消失。

## 過期會把增量協議變回完整重播

最小機制可以清楚寫成六步：

1. 在應用程式帳本中持久保存完整、有序的對話。
2. 以完整歷史建立伺服器端執行緒。
3. 把執行緒與回應 ID 保存為可替換狀態。
4. 在執行緒有效期間只傳送新增輪次。
5. 收到 `thread_not_found` 後，以完整帳本建立新執行緒。
6. 從新的回應 ID 繼續，並避免重複寫入同一使用者輪次。

第五步是關鍵。只有雙方共享相同的先前狀態時，增量協議才成立。伺服器端副本一旦消失，用戶端就必須以自己的記錄重新建立共享狀態。

因此，「執行緒只有五分鐘」不等於「對話只有五分鐘」。只要應用程式擁有足夠的重建狀態，對話就可以跨越多次執行緒生命週期。

## 一次本機故障注入

來源 Special 使用一個確定性、無需憑證的模擬服務測試復原形態。執行緒壽命為 300 秒，用戶端暫停 360 秒，強制下一次請求跨越過期邊界。

觀測結果很窄，也很清楚：第一次結果為 17；復原後的輪次增加 5，返回 22；發生一次重播；帳本沒有重複使用者輪次；供應商 API 呼叫為零。

這只證明本機用戶端從一次過期中復原，並沒有重複對話輪次。它沒有證明真實 Claude 服務中的延遲、請求位元組節省、token、帳單、模型品質或儲存行為。這些結果在代表性線上循環被實際量度前都保持 **UNKNOWN**。

Anthropic 發布說明定性描述了更小的後續請求與更低的首 token 時間。這支持機制，卻不足以支持普遍的節省結論。應量度的不是單次正常請求省下多少位元組，而是正常輪次、過期、程序遺失與復原之後，每個獲接受任務的成本與可靠性。

## 對話復原不等於外部動作復原

代理可以復原文字，卻仍可能重複動作。

假設過期前最後一輪要求工具建立工單、傳送指令或更新外部記錄。如果外部系統已接受動作，但供應商回應在確認前遺失，重播對話並不能回答最關鍵的問題：動作是否已經發生？

這需要獨立的動作帳本。每個外部動作都應保存冪等鍵或動作 ID、請求內容、已觀測的接受憑證，以及用來區分 `ACCEPTED`、`NOT_ACCEPTED` 和 `UNKNOWN` 的回讀證據。

四層職責應該分開：

- **對話帳本**重建上下文；
- **執行緒參照**加速目前遠端工作階段；
- **動作帳本**避免靜默重複已完成的外部動作；
- **回讀**在宣告復原完成前驗證目標狀態。

本機過期測試只覆蓋對話復原，沒有執行任何外部動作。因此，生產環境中的去重能力仍是 **UNKNOWN**，不能因為有了執行緒功能便假定已經解決。

## 最小可復原設計

可復原系統不一定需要宏大的「記憶平台」，但必須明確誰擁有狀態：先持久記錄對話事件，再依賴遠端參照；把執行緒與回應 ID 當作可替換快取鍵；讓重播具確定性且可觀測；為外部動作建立獨立冪等鍵與憑證；同時測試過期與程序重啟；在線上經濟性有實測之前，不把定性效益升級為生產結論。

執行緒的價值在於它可以短暫而輕量。應用程式帳本的價值在於它不假裝自己是效能捷徑。

把執行緒當捷徑，把帳本當事實。

---

**來源：** [Claude Platform 發布說明](https://platform.claude.com/docs/en/release-notes/overview)、[Anthropic Message Threads 文件](https://platform.claude.com/docs/en/build-with-claude/message-threads)、[Anthropic TypeScript SDK message helpers](https://github.com/anthropics/anthropic-sdk-typescript/blob/main/helpers.md)，以及經雜湊綁定的[來源 Special](https://iamrobin.ai/ouroboros/202611/20261103/special/)。

