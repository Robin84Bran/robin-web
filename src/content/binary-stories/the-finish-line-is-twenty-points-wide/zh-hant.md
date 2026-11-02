---
title: "終點線有二十個百分點寬"
storySlug: "the-finish-line-is-twenty-points-wide"
date: "2026-11-02"
updated: "2026-11-02"
lane: "BUILD"
excerpt: "機械人可以估計某一步已完成 80–100%。真正的工程問題由這個區間的盡頭開始：誰來簽發驗收回執？"
hero: "/binary-stories/the-finish-line-is-twenty-points-wide/hero.webp"
ogImage: "/binary-stories/the-finish-line-is-twenty-points-wide/og.webp"
keywords: ["機械人進度分類", "終態驗收", "Gemini Robotics ER 2", "選擇性重試"]
canonical: "https://iamrobin.ai/binary/stories/the-finish-line-is-twenty-points-wide/zh-hant/"
inLanguage: "zh-Hant"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202611/20261102/special/"
sourceArtifactSha256: "958acbfb9fa39153eedf09fbd783542e3109f58c42344cafed9f77818e95fd94"
carouselPdf: "/carousels/the-finish-line-is-twenty-points-wide.pdf"
carouselCaption: "/carousels/the-finish-line-is-twenty-points-wide.txt"
carouselPages: 7
draft: false
---

終點線有二十個百分點寬。

這不是比喻。Google 關於 Gemini Robotics Embodied Reasoning 2 的文件把進度分成五級：完成 0–20%、20–40%、40–60%、60–80% 及 80–100%。

最高一級同時容納兩種對工作系統意義完全不同的狀態：接近完成，以及真正完成。

想像一項無害的桌面任務：十件物品最終都要放進標記區域。正確放好八件，與十件全部放好，都可能落入 80–100% 這一級。這只是說明例子，並非已執行或已報告的實驗。它揭示一條設計邊界：進度估計可以指引下一個動作，卻不是任務已獲驗收的回執。

## 有用的估計不等於終態

進度當然有價值。系統若能觀察工作結果，而不是發出指令後盲目前進，就在「行動」與「繼續」之間多了一個重要動詞：**檢查**。

Google 表示，ER 2 可以透過影片找出關鍵時刻並分類任務進度。機械人因而可以調整動作，或只重試失敗步驟，而不必重新開始整套流程。這是實質的編排改進。如果第四步失敗，未必需要重做前三步。

不過，「重試第四步」與「宣布任務完成」是兩個不同決定。

前者可以把模型估計當作控制訊號。後者則需要與實體終態綁定的驗收規則：物品是否全在標記區域內、門閂是否關好、量度值是否在容差內，或是否已由人明確簽收。

![五級進度形成模型估計，另一個獨立的外部關口才簽發終態驗收回執。](/binary-stories/the-finish-line-is-twenty-points-wide/hero.webp)

清晰的架構會保留兩種信號：

1. 模型估計進度；
2. 控制器選擇繼續、重試、暫停或升級；
3. 外部檢查按預先定義的終態作出判斷；
4. 只有這項檢查才記錄「驗收完成」。

外部檢查不一定複雜。它可以是確定性的感應器門檻、為單一任務設計的視覺規則、工裝夾具、類似校驗和的數量核對，或人工簽收。關鍵是完成回執必須獨立於模型的寬闊進度區間來定義。

## 兩組基準回答兩個問題

Google 報告五級進度分類的準確率為 **57.4%**；同時報告關鍵時刻識別準確率為 **91.3%**，平均絕對時間距離為 **0.96 秒**。

這些結果必須分開，因為它們回答的問題不同。

關鍵時刻識別是在影片中定位某事件何時發生，例如杯子何時注滿。進度分類則判斷任務大約完成到哪個區間。兩組數字都不是客戶現場、一個更次，甚至上面假設桌面任務的驗收完成率。

57.4% 尤其有用，因為它讓能力保持現實，而不是被寫成魔法。進度分類器可能出錯：重複已成功的步驟、跳過尚未完成的步驟，或在錯誤時點求助。即使分類本身正確，闊達二十個百分點的最後一級仍然含有歧義。

Google 的安全評估進一步說明這項差別。在長時序信心測試中，智能體往往會按要求索取信心評估，但未必能可靠地產生完成任務所需的全部重新規劃子步驟。索取信心訊號，不等於成功恢復工作流程。報告亦明確表示，它沒有評估合規實體部署所需的認證硬件、冗餘及實時保證。

模型卡更要求用戶在生產、商業及公共環境中審慎使用，並禁止把 Robotics Models 用於一旦故障可能導致死亡、受傷或財產損失的安全關鍵工作。

## 重試改變成本結構

儘管如此，選擇性重試仍可能是很強的系統積木。

全面重啟策略會再次支付之前每個動作的成本，即使那些動作已經通過驗收。局部重試策略只在不確定步驟附近增加推理與動作。在長流程裏，它可能減少重複工作。

但它亦可能只增加嘗試次數，沒有改善結果。

所以，重試應被核算，而不是單獨慶祝。正確的分母是已驗收產出，不是已發出指令。一個系統可以變得更忙，卻沒有變得更有效。

一項邊界清楚的對照測試，可以凍結相同的無害任務與驗收標準，再比較兩種策略：

- 偵測失敗後重新開始整段流程；
- 只重試受影響步驟，並採用相同的升級次數上限。

兩邊都應記錄驗收完成、錯誤完成、重試次數、人工接管、耗時，以及每項已驗收任務的推理與操作員成本。終態檢查必須完全相同。

這裏**沒有**執行這項對照。因此結果仍然未知。客戶現場的已驗收產出、非計劃重試率、人工接管率、每項已驗收任務的耗時與完整成本，同樣未知。

## 把回執放在估計之外

結果感知機械人最強的版本，並不是一個更有信心說「完成」的模型。

而是一個知道「完成」需要甚麼證據的系統。

進度分類可以決定下一步查看哪裏、嘗試甚麼。關鍵時刻識別可以定位狀態切換。選擇性重試可以避免重播整段流程。它們都很有用。

但它們都不應悄悄繼承認證終態的權限。

在模型內部，終點線可以有二十個百分點寬。在實體工作流程裏，驗收仍應是一條線。

[1]: https://cloud.google.com/blog/products/ai-machine-learning/gemini-robotics-embodied-reasoning-2-is-now-available-on-google-cloud
[2]: https://blog.google/innovation-and-ai/models-and-research/google-deepmind/gemini-robotics-er-2/
[3]: https://ai.google.dev/gemini-api/docs/robotics-overview
[4]: https://ai.google.dev/gemini-api/docs/robotics-video-progress
[5]: https://storage.googleapis.com/deepmind-media/gemini-robotics/Gemini-Robotics-2-Safety.pdf
[6]: https://deepmind.google/models/model-cards/gemini-robotics-er-2/

來源：Google Cloud 的[公開預覽公告][1]、Google 的 [ER 2 發布文章][2]、Gemini API 的[機械人概覽][3]和[影片進度指南][4]、Google DeepMind 的[安全評估][5]與[模型卡][6]，以及經雜湊綁定的[源 Daily Special](https://iamrobin.ai/ouroboros/202611/20261102/special/)。六項一手來源均於 2026 年 11 月 2 日重新讀取。模型及基準數字來自 Google 與 Google DeepMind；本次邊界研究沒有作獨立複現。本文討論系統設計，並不構成已完成實體試驗或安全認證的證據。
