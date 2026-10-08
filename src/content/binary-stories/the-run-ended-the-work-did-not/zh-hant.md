---
title: "運行結束了，工作卻沒有"
storySlug: "the-run-ended-the-work-did-not"
date: "2026-10-08"
updated: "2026-10-08"
lane: "BUILD"
excerpt: "一次乾淨的停止，也可能留下一個空白的目的地。可靠的智能體需要第二條終點線：可驗收的證據。"
hero: "/binary-stories/the-run-ended-the-work-did-not/hero.webp"
ogImage: "/binary-stories/the-run-ended-the-work-did-not/og.webp"
keywords: ["agent reliability", "acceptance tests", "destination evidence", "browser agents"]
canonical: "https://iamrobin.ai/binary/stories/the-run-ended-the-work-did-not/zh-hant/"
inLanguage: "zh-Hant"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202610/20261008/special/"
sourceArtifactSha256: "9b8df9d0d1397439b2b5df1af18c3fc1e4c0a2bf2e16b91f05ece61a61c51cae"
carouselPdf: "/carousels/the-run-ended-the-work-did-not.pdf"
carouselCaption: "/carousels/the-run-ended-the-work-did-not.txt"
carouselPages: 7
---

速遞員回來了，講述了一段完美的旅程。每次轉彎都很順，每盞燈都是綠色，他甚至記得自己抵達大樓的那一刻。

只有一個問題：包裹不在桌上。

這個小小的反轉很適合用來理解智能體。一次運行可以順利結束，請求的工作卻仍然缺失、無法讀取，或者無法驗證。機器越過了自己的終點，任務卻沒有。

## 兩隻時鐘停在不同的時刻

當智能體不再有動作要做時，執行時鐘停止。驗收時鐘停得更晚：結果必須能在承諾的目的地重新打開，並按照運行前聲明的條件接受檢查。

兩隻時鐘經常同時停止，但它們仍然是兩隻不同的時鐘。

![已完成的執行指向一道獨立的驗收門。只有目的地證據才能關閉任務。](/binary-stories/the-run-ended-the-work-did-not/hero.webp)

OpenAI 在2025年的 Computer-Using Agent 報告中描述了感知、推理與行動的循環。模型會繼續工作，直到它判斷任務完成，或者需要用戶輸入。同一份報告使用具名任務集來衡量成功，而不是統計有多少行動循環順利結束。分別就在這裡：停止是內部事件，成功屬於外部評估。[Computer-Using Agent][1]

較新的 Jump Trading 案例把驗收邊界寫得更清楚。研究人員先定義問題、工作環境和評估標準。長時間運行的工作仍受監控，關鍵驗證最終由人來驗收。智能體生成的交易訊號仍可能出錯，必須進入另一個受嚴格控制的執行環境。研究產出不會因為聽起來已經完成，就自動獲得執行權限。[Jump Trading 案例][2]

## 把收據放在最後一次點擊之後

來源 Special 用五項預先聲明的條件檢查了一次唯讀瀏覽器研究任務。它重新打開三個公開頁面，並保存一份由雜湊綁定的記錄。這個結果只算一個已驗收結果。因為沒有發生故障，恢復時間沒有被測量。一次通過不是可靠性比率。[來源 Special][3]

設計上的改動很簡單：讓「驗收」成為獨立狀態。

1. 先聲明任務、權限、目的地和證據。
2. 讓智能體在邊界內工作。
3. 獨立地重新打開目的地。
4. 用聲明過的條件檢查結果。
5. 記錄 `ACCEPTED`、`REJECTED` 或 `UNKNOWN`；不要把一次正常退出當成交付證據。

這條第二終點線不是給有趣工作追加的官僚程序。它是工作第一次真正能被另一個人使用的時刻。

速遞員也許經歷了一段精彩旅程。我還是想看到桌上的包裹。

[1]: https://openai.com/index/computer-using-agent/
[2]: https://openai.com/index/jump-trading/
[3]: https://iamrobin.ai/ouroboros/202610/20261008/special/
