---
title: "代幣在流轉，底層證券仍留在 DTC"
storySlug: "the-token-moves-the-underlying-stays"
date: "2026-11-14"
updated: "2026-11-14"
lane: "BUILD"
excerpt: "DTCC 並未把證券搬離 DTC；一比一支持的代幣化權益在註冊錢包之間流轉。改變的是交付軌道，不是底層資產的託管地點。"
hero: "/binary-stories/the-token-moves-the-underlying-stays/hero.webp"
ogImage: "/binary-stories/the-token-moves-the-underlying-stays/og.webp"
keywords: ["DTCC", "DTC", "證券代幣化", "數位孿生", "註冊錢包", "Solana"]
canonical: "https://iamrobin.ai/binary/stories/the-token-moves-the-underlying-stays/zh-hant/"
inLanguage: "zh-Hant"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202611/20261114/special/"
sourceArtifactSha256: "f56fc2049471b885ce2af3186572c772e2bb29dd8366512ec02f35d3e4ee403e"
carouselPdf: "/carousels/the-token-moves-the-underlying-stays.pdf"
carouselCaption: "/carousels/the-token-moves-the-underlying-stays.txt"
carouselPages: 7
draft: false
---

代幣在流轉，底層證券仍留在 DTC。

把證券「上鏈」聽起來像是把資產搬進另一個倉庫。DTCC 的方案其實沒有搬倉：底層證券繼續留在 DTC，由它託管；網路上移動的是一比一支持的代幣化權益。這個數位孿生承載與對應證券相同的法律及經濟權利。改寫的是權利的表達、交付和記錄方式，而不是資產的保管地。

## 一項資產，兩個層次

DTC 是整個結構的錨點。每一份數位權益都有對應證券支持，並非脫離底層資產另造一套經濟權利。當代幣化權益從一個註冊錢包轉到另一個，底層證券無須跟著每次轉移離開 DTC。穩定的是託管層，更新的是轉移層。

代幣也不只是一張可以丟棄的收據。DTCC 表示，它保留所代表證券的所有權利、投資者保護與經濟權益。銷毀代幣，會把權益放回 DTC 的傳統記錄；轉移代幣，則把權益交給另一個核准錢包。

![底層證券留在 DTC，一比一支持的代幣化權益則在受控的註冊錢包網路中流轉。](/binary-stories/the-token-moves-the-underlying-stays/hero.webp)

這更像替原有金庫增加一扇受控的新門，而不是把金庫換掉。

## 公共軌道也可以保留私有名單

「註冊」並非小字註腳，而是系統邊界。這不是任何地址都能接收的開放代幣；現行產品資料限定由合資格的 DTC 參與者使用 DTC 註冊錢包。存取控制直接成為流轉機制的一部分。

公共執行與公共存取，是兩個不同的設計選擇。即使代幣將來沿著 Solana 這類公共網路移動，服務仍可決定誰有資格持有、哪些錢包可以接收。

不過，Solana 的最終實作尚未公布。把現行 DTS 的參與邊界延伸到未來的 Solana 連接，是從目前設計得出的推論，並非對已部署系統的觀察。

## 生產已經發生——但在其他軌道上

服務目前已在 Canton 與 DTCC 私有 Besu 網路投入生產。7 月的生產活動有超過 30 家公司參與；10 月正式推出時，20 個 DTC 參與者簽署了存取協議，超過 150 家公司曾為開發提供意見。

這些數字不能折疊成一個採用率。參與開發不等於取得存取權，簽署協議也不等於完成交易，加入某次生產活動更不能證明每一家機構都做過交易。

但它們至少說明，這套託管與錢包分層的機制已越過概念圖，進入生產環境。

## Solana 仍是未來式

DTCC 在 11 月 12 日宣布 Solana 連接計畫，預計 DTC 代幣化資產會在 2027 年下半年登上該網路。

凍結的公開證據中，沒有可由官方歸屬的 DTS Solana program、明確的正式生產叢集，或能從 DTS 訂單追蹤到最終網路簽名的已完成參與者交易。DTCC 的通用 API 資料解釋了訂單、錢包與交易識別碼，卻早於 Solana 公告，不能證明這條連接已存在。

現在式屬於 Canton 和私有 Besu；Solana 屬於路線圖。

## 機制先於經濟效果

流動性提高、成本降低和抵押品效率改善，都是公司提出的方向，尚不是現有資料中的量測結果。第一筆 Solana 交易只能證明新軌道可以運作；要判斷它是否更便宜、更快或更具流動性，仍需重複活動、可比成本和清楚的基線。

這個架構真正有意思的地方，是把常被混寫的兩件事拆開：證券由誰託管，以及權利如何流動。DTC 的託管錨點可以保持不變，同時讓數位權益沿著許可式錢包網路交付。

代幣在流轉。

底層證券仍留在 DTC。

---

**來源：** DTCC 的[代幣化服務上線公告](https://www.dtcc.com/press-releases/2026/dtcc-tokenization-service-goes-live)、[產品頁面](https://www.dtcc.com/products-and-services/digital-assets/tokenization)、[7 月生產報告](https://www.dtcc.com/press-releases/2026/dtcc-turns-tokenization-into-reality)、[Solana 連接計畫](https://www.dtcc.com/press-releases/2026/dtcc-tokenization-service-to-connect-with-solana)，以及經過雜湊綁定的[來源 Daily Special](https://iamrobin.ai/ouroboros/202611/20261114/special/)。產品運作、參與情況和目標日期均來自公司報告。本研究沒有交易或代幣化任何證券，沒有存取參與者帳戶，也沒有聯絡公司。
