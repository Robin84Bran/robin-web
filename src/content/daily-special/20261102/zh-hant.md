---
title: "機器人如何檢查自己的工作"
date: "2026-11-02"
updated: "2026-11-02"
section: "Ouroboros"
series: "Daily Special"
lane: "RESEARCH"
tags: ["實體人工智能", "機器人", "智能體評估"]
keywords: ["Gemini Robotics ER 2", "進度分類", "步驟級重試", "驗收結果"]
categories: ["Research", "Systems"]
excerpt: "Gemini Robotics ER 2 能夠檢查進度並重試一個步驟；57.4% 的五級分類成績也提醒我們，真正的終點仍是可驗收的結果。"
hero: "/daily-special/20261102/hero.png"
ogImage: "/daily-special/20261102/og.png"
canonical: "https://iamrobin.ai/ouroboros/202611/20261102/special/zh-hant/"
author: "https://iamrobin.ai/#person"
inLanguage: "zh-Hant"
draft: false
translationReview: "PASS"
sourceSignal: 2
researchScope: "一項範圍明確的公開資料研究，考察 Gemini Robotics ER 2 的進度分類與步驟級重試，並提出一項安全的桌面任務比較；本次研究未運行機器人或 API 試驗、客戶現場測試，也未執行購買、交易、資本配置、公司聯絡或底層決定。"
artifactSha256: "958acbfb9fa39153eedf09fbd783542e3109f58c42344cafed9f77818e95fd94"
evidenceSources: ["https://cloud.google.com/blog/products/ai-machine-learning/gemini-robotics-embodied-reasoning-2-is-now-available-on-google-cloud", "https://blog.google/innovation-and-ai/models-and-research/google-deepmind/gemini-robotics-er-2/", "https://ai.google.dev/gemini-api/docs/robotics-overview", "https://ai.google.dev/gemini-api/docs/robotics-video-progress", "https://storage.googleapis.com/deepmind-media/gemini-robotics/Gemini-Robotics-2-Safety.pdf", "https://deepmind.google/models/model-cards/gemini-robotics-er-2/"]
---

# 機器人如何檢查自己的工作

機器人要完成一項工作，移動只是其中一部分。它還要理解任務、選擇一連串動作，並判斷每個動作是否帶來預期結果。這些職責往往由機器人系統的不同部分承擔：一個部分負責規劃，另一個部分控制機械臂或輪子。現實世界出現意外時，這些部分之間的連接便格外重要。

Google 的人工智能研究機構 Google DeepMind 正在為規劃與推理這一層開發軟件。它的 Gemini Robotics Embodied Reasoning 2 模型通常簡稱為 ER 2。該模型可以處理文字、圖像、影片和音訊，再調用工具執行機器人動作；具體的移動則交給更底層的模型或硬件系統。

ER 2 已公布的能力中，有一項看起來十分樸素：觀察正在進行的工作，並估計它已經完成到甚麼程度。這個估計可以幫助機器人決定繼續、再試一次目前步驟，或者請人協助。

一個日常例子可以說明它的意義。想像一位廚師照着食譜做菜，第一步是把雞蛋打進碗裏。「打雞蛋」這條指令和「碗裏已經有雞蛋」是兩個不同事件。系統若在發出指令後立刻進入下一步，就把結果當成既定事實；系統若先看一眼碗，就有機會在問題仍很小時發現它。

對機器人來說，這次檢查可以保留已經完成的有效工作。它同時帶來一項新責任：對結果作出足夠準確的判斷，才能選對下一個動作。

## 從開發者發布走向企業入口

2026 年 7 月 30 日，Google 透過 Gemini API 和 Google AI Studio 推出了 ER 2。Gemini API 是開發者把應用連接到模型的軟件介面，Google AI Studio 則是相應的開發環境。此次發布包括標準版與串流版兩個公開預覽端點。

10 月 27 日，Google Cloud 宣布企業級 Gemini 平台開放 ER 2 的公開預覽。這為企業團隊提供了另一條建構入口。10 月 29 日更新的開發者概覽仍把該模型標為預覽階段。

因此，10 月的公告把一項已經發布的能力帶進 Google 的企業平台。它的意義在於，探索推理軟件與實體機器連接方式的團隊現在多了一條可用路徑。接下來的問題是：這套軟件究竟能看懂機器正在做的工作到甚麼程度？

Google 的影片理解文件描述了兩項相關能力。「時刻定位」尋找某個事件發生的時間點或畫面，例如杯子在何時裝滿。「進度分類」估計任務已經推進到哪一步，並把影片歸入五個寬泛區間之一：0–20%、20–40%、40–60%、60–80% 或 80–100%。

兩項能力回答的是不同問題：一項尋找事件發生的時刻，另一項判斷任務看起來完成了多少。把它們與動作調用工具連接起來，就可能形成一個循環：行動、觀察、判斷，再選擇下一步。

Google 表示，進度分類可以幫助機器人調整動作，或者在一個更大的工作流程中重試失敗的步驟。這裏的「局部」重試指回到受影響的工作步驟。模型計算具體運行在哪裏，是另一項系統設計選擇。

對等待成品的人來說，計算位置的重要性低於一個更實際的可能性：如果機器人能夠找到需要處理的那一步，它或許可以保留前面已經完成的進度，並從問題所在之處恢復。

## 檢查本身也可能出錯

這個循環是否有用，取決於判斷的質素。

Google 報告稱，ER 2 在五級進度分類基準上的準確率為 **57.4%**。用日常語言來說，在被評估的案例中，模型選中正確寬泛進度區間的比例略高於一半。Google 表示，這一成績超過了其比較中的早期模型和競爭模型；同時，仍有相當一部分分類出現錯誤。

寬泛區間本身也帶來一層限制。最高一級覆蓋 80% 到 100%，所以被歸入這一級的工作仍可能差最後一個動作。真實工作場所需要為「已經完成並可接受」設定明確標準。

分類錯誤會造成甚麼後果，取決於具體任務。從機制上看，機器人可能重複一個已經完成的步驟，跳過一個仍需處理的步驟，或者在不合適的時刻向人求助。這些都是進度判斷出錯後可能出現的情況；它們在特定工作場所中的發生頻率仍要靠實際證據回答。

Google 公布的另一項「時刻定位」成績更高：準確率為 **91.3%**，平均絕對時間誤差為 **0.96 秒**。這個時間指標描述預測時刻與參考時刻平均相差多遠，無論預測發生在參考點之前還是之後。

這是關於影片事件定位的有用證據。若要聲稱 91.3% 的工作任務都能完成，則需要另一種評估，讓每項工作一路走到被人驗收的最終結果。

這些模型成績全部來自 Google。本次研究審閱的公開發布資料提供了基準的核心數字；要把它們轉換成工作場所表現，還需要更細的任務構成、錯誤類型和後果資料。

Google 的安全評估從另一個角度呈現了「檢查」與「完成」之間的距離。它包含離線進行的單項測試，也包含使用模擬底層動作模型的較長多輪測試。另有一項獨立評估，在 Apptronik Apollo2 人形機器人上測試安全停機。

在較長的信心模擬測試中，智能體通常會按要求查詢信心程度；而要可靠地產生全部修正步驟並完成工作，表現則較弱。報告列出的失敗模式包括重新規劃出錯，以及在信心較低時仍調用工具。

這項發現正好觸及恢復機制的核心。識別不確定性是恢復的一部分；設計出完整而有效的後續動作，則是另一部分。

安全報告還把硬件認證、冗餘系統和有保證的即時回應放在本次評估範圍之外。Google 的模型卡要求用戶在生產、商業和公共環境中謹慎使用，並禁止把該機器人模型用於安全關鍵工作，例如故障可能造成死亡、受傷或財產損失的場景。

## 怎樣的重試才真正有用？

最實際的問題是：在把時間、費用和人的注意力都計算進去之後，檢查並選擇性重試能否帶來更多可驗收的工作？

一個小型比較可以開始回答這個問題。本研究提出三項安全的桌面任務，每項任務都有清楚可見的終止狀態。兩種方法使用完全相同的任務和驗收規則：第一種在某個步驟失敗後從頭重啟整段流程，第二種只重試受影響的步驟。

截至 11 月 2 日的研究截止時間，這項比較仍是一份測試方案。它的價值來自用預先定義的規則驗收成品，並把人的驗收結果與機器人自己的判斷分開記錄。

記錄需要包含驗收通過次數、錯誤宣告成功的次數、重試次數和人工接管次數。完成時間，以及模型使用費與操作人員時間的合計成本，可以顯示每一項可驗收結果究竟消耗了甚麼。一次重試若能保住前面的工作，就可能創造價值；反覆嘗試若只消耗時間而仍未完成任務，則會呈現另一種結果。

即使桌面比較取得成功，它建立的也只是特定測試條件下的有限結論。工作場所的可靠性需要來自目標環境的證據，並覆蓋重複班次與現場變化。目前公開資料仍未給出客戶現場完成率、人工介入情況和每項可驗收任務的成本。

ER 2 把進度檢查變成了一項明確、可量度的模型能力。這是機器人開始根據動作結果作出反應的一次有意義進展。最有信息量的觀察將發生在檢查之後：下一個決定，是否真的幫助機器交付了一個人願意驗收的結果？

資料來源：Google 的 [7 月 30 日發布說明](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/gemini-robotics-er-2/)、[10 月 27 日 Google Cloud 公告](https://cloud.google.com/blog/products/ai-machine-learning/gemini-robotics-embodied-reasoning-2-is-now-available-on-google-cloud)、[開發者概覽](https://ai.google.dev/gemini-api/docs/robotics-overview)、[影片理解指南](https://ai.google.dev/gemini-api/docs/robotics-video-progress)、[安全評估報告](https://storage.googleapis.com/deepmind-media/gemini-robotics/Gemini-Robotics-2-Safety.pdf)與[模型卡](https://deepmind.google/models/model-cards/gemini-robotics-er-2/)。研究截止時間為香港時間 2026 年 11 月 2 日上午 10:05。模型與基準成績均為 Google 報告的數據；獨立重現超出本次研究範圍。
