---
title: "五次示範，是最後一步"
storySlug: "the-five-demonstrations-came-last"
date: "2026-11-10"
updated: "2026-11-10"
lane: "BUILD"
excerpt: "GR00T 2 在五次目標機器人示範後達到 95% 平均成功率，但這幾分鐘之前，是 436,414 小時的已報告經驗；而基準任務也經過五次示範可學性的篩選。"
hero: "/binary-stories/the-five-demonstrations-came-last/hero.webp"
ogImage: "/binary-stories/the-five-demonstrations-came-last/og.webp"
keywords: ["GR00T 2", "機器人適應", "少樣本學習", "Dexter-50"]
canonical: "https://iamrobin.ai/binary/stories/the-five-demonstrations-came-last/zh-hant/"
inLanguage: "zh-Hant"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202611/20261110/special/"
sourceArtifactSha256: "6f11c0e7e2d9cb750732aa18816f94f8cad7c90b85154360ffcd6a8261129089"
carouselPdf: "/carousels/the-five-demonstrations-came-last.pdf"
carouselCaption: "/carousels/the-five-demonstrations-came-last.txt"
carouselPages: 7
draft: false
---

五次示範，是最後一步。

NVIDIA 報告稱，GR00T 2 在每項任務接受五次示範後，於 50 項 Dexter 任務上取得 95% 的平均成功率。目標機器人的這些資料不足三分鐘；每項任務的適配器在一張 RTX 5090 上微調約 30 分鐘。

聽起來，就像機器人在一段咖啡休息時間裡學會了一份新工作。

這個結果是真實報告的，但它只是漫長教育的最後一幕。

在 Dexter 看見那五個回合之前，GR00T 2 已經在一套混合資料上預訓練。NVIDIA 報告其中包括 402,730 小時的第一人稱人類影片、10,184 小時的手持夾爪示範，以及 23,500 小時的機器人遙操作。合計是 436,414 小時的先驗經驗。

短課並沒有憑空創造技能。它教會的是一個已高度預訓練的模型：如何用一雙新手，完成它在別處見過的工作。

## 一位走進陌生廚房的老廚師

想像一位經驗豐富的廚師走進陌生廚房。五次示範，也許足以讓他知道刀放在哪個抽屜、爐灶如何回應、盤子應該歸位何處；但五次示範並不足以從頭教會烹飪。

Dexter-50 更像這堂廚房入門課。

基準使用一台雙臂機器人：兩條七自由度機械臂，配兩隻 22 自由度的手。50 項任務沒有出現在 Dexter 自己的訓練資料裡，卻出現在人類影片、另一種平行夾爪機器人的資料，或兩者之中。模型帶著任務概念來到現場；目標機器人的回合幫助它用 Dexter 的身體把概念做出來。

![人類、手持夾爪與機器人經驗匯成長河，最後收窄為五次 Dexter 示範、一個任務專用適配器與一道評估門檻。](/binary-stories/the-five-demonstrations-came-last/hero.webp)

NVIDIA 凍結了預訓練權重、文字編碼器、影片 VAE，以及動作與狀態頭；再為每項任務在 Transformer 上訓練一個 rank-32 LoRA 適配器，並使用相同超參數。因此，這裡的「五次示範」並不是把五段隨手拍的影片交給一個萬能機器人腦，而是為每項任務收集五個完整的目標機器人遙操作回合，然後分別微調。

在這個設定內，適應幅度仍然非常顯著。NVIDIA 報告平均成功率從零樣本的 40%，升至一次示範後的 71%，再升至五次後的 95%；50 項任務中有 37 項在所報告的評估中達到 100%。

## 基準選擇了「可學會」的任務

標題背後還有一道邊界。

白皮書說明，這 50 項任務是模型用五個回合能夠學會的任務，也就是五次示範後至少達到 80% 成功率的任務。換句話說，Dexter-50 是從通過「五次可學性」門檻的任務中選出來的。

這不會讓 95% 失效，卻會改變它所回答的問題。

基準表明：對於一組經過篩選、且能被五個回合教會的跨機器人任務，預訓練模型可以實現很強的快速適應。它並不估計任意一項在訓練前就獨立選定的新任務，有多大機率憑五次示範達到 95%。

論文也沒有說明 Dexter-50 的零樣本、一次和五次示範柱狀結果中，每項任務究竟進行了多少次評估。因此，成功率應被保留在論文給出的範圍內，而不應被讀者擅自放大。

## 真正的產品，是先驗

少樣本機器人學習常被說成「減少資料」。更有用的工程視角是：資料被搬到了別處。

目標機器人只貢獻了不足三分鐘的任務資料；先驗則來自人類、手持介面與其他機器人合計數十萬小時的經驗。適配器再把這份先驗翻譯到一個具體的「機器人—任務」組合上。

所以，比「需要幾次示範」更好的盡調問題是：計數開始之前，系統已經學會了甚麼？

- 任務概念是否已經存在於人類或其他機器人的資料中？
- 目標任務是在適應前選定，還是在觀察到可學性之後選定？
- 一個適配器服務很多任務，還是每項任務分別訓練？
- 報出的時間是否包含設置、遙操作、評估、失敗嘗試與人工恢復？
- 結果能否在一組事先登記、獨立於模型選擇的任務上重現？

GR00T 2 的報告之所以有意思，正是因為先驗似乎能夠遷移：從人類和其他機器收集的知識，幫助一副新身體快速適應。

但那五次示範不是教育本身。

它們只是入職培訓。

---

**來源：** NVIDIA GEAR 的 [GR00T 2 專案頁](https://research.nvidia.com/labs/gear/gr00t-2/)與 [2026 年 11 月白皮書](https://research.nvidia.com/labs/gear/gr00t-2/assets/gr00t2_whitepaper.pdf)，特別是 Dexter-50 方法與圖 24；NVIDIA 公開的 [Isaac-GR00T 儲存庫](https://github.com/NVIDIA/Isaac-GR00T)；以及經過雜湊綁定的[來源 Special](https://iamrobin.ai/ouroboros/202611/20261110/special/)。這些是 NVIDIA 報告的結果；截至研究截止時間，尚無對此 GR00T 2 基準的獨立重現。本次沒有運行機器人實驗、模型微調、硬件採購、部署或投資行動。
