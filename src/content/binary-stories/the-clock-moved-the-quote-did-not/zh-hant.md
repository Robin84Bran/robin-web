---
title: "時鐘動了，報價沒動"
storySlug: "the-clock-moved-the-quote-did-not"
date: "2026-11-05"
updated: "2026-11-05"
lane: "BUILD"
excerpt: "USDY 開始按秒累計價格，但單枚代幣的報價仍會因顯示精度較粗而保持不變。"
hero: "/binary-stories/the-clock-moved-the-quote-did-not/hero.webp"
ogImage: "/binary-stories/the-clock-moved-the-quote-did-not/og.webp"
keywords: ["USDY 連續定價", "預言機精度", "代幣化國債", "金融基礎設施"]
canonical: "https://iamrobin.ai/binary/stories/the-clock-moved-the-quote-did-not/zh-hant/"
inLanguage: "zh-Hant"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202611/20261105/special/"
sourceArtifactSha256: "8f3784bad8f0daee1fe849d49c84cfab057ae7118532766ef8e976aed2cf1fa9"
carouselPdf: "/carousels/the-clock-moved-the-quote-did-not.pdf"
carouselCaption: "/carousels/the-clock-moved-the-quote-did-not.txt"
carouselPages: 7
draft: false
---

時鐘動了，報價沒動。

2026 年 11 月 1 日，Ondo 把 USDY 的官方價格計算由每日 00:00 UTC 跳變改為連續累計。新預言機按請求時刻計算至秒的應計收益。聽起來，螢幕上的價格也應該每秒變化。

但以六位小數 USDC 報價的一枚 USDY 並沒有這樣顯示。

這個矛盾揭示了三個常被壓縮成一個數字的時鐘：經濟時鐘、記帳時鐘和顯示時鐘。

## 三個時鐘，一份餘額

經濟時鐘描述底層價值累積。USDY 的設計讓持有人維持相同代幣數量，而每枚代幣的價值隨美國國債與銀行存款資產產生的收益上升。

記帳時鐘由預言機規則決定。舊系統在日間保持價格不變，午夜一次計入一天增長。新的 `ContinuousPriceOracle` 保存價格和年化利率，按請求時刻計算已過時間對應的價值。

顯示時鐘由輸出精度決定。USDY 預言機使用 18 位小數，USDC 金額使用 6 位。Ondo 公布的換算方法把高精度 USDY 價值換成 USDC 時向下取整。

![經濟累積、預言機記帳與取整後的報價，可以按不同的可見速度前進。](/binary-stories/the-clock-moved-the-quote-did-not/hero.webp)

因此，更精確的記帳時鐘可以在較粗的顯示時鐘下面持續前進。

## 消失的一秒

來源 Special 在以太坊區塊 26,345,421 凍結狀態，並在不簽名、不傳送交易下模擬未來時間戳。跨越一個選定午夜時，新官方價格由每枚約 1.152259433 美元升至 1.152259434 美元。一秒增量約為每枚 0.000000001345 美元。

舊日程則在午夜一次增加約 0.00011623 美元。兩者都描述累積，但把變化放在不同時間線：舊系統把一天集中成一步，新系統按經過秒數展開計算。

顯示層隨後隱藏了差異。午夜前、午夜當刻和一秒後，一枚 USDY 的總報價均為 **1.152259 USDC**。預言機值已變化，卻不足以在向下取整後跨過下一個百萬分之一 USDC。

這不是價格凍結，而是移動價值被較大的顯示單位觀察。

## 連續記帳不保證螢幕連續

連續累計消除了午夜集中計入一天增長的人為階梯，也讓日內、週末與假期計算更自然。但報價資產、小數位、數量與更新頻率仍會建立新的可見門檻。

實作時應把精度視為一組層次：標明預言機值的時間戳；在中間運算保留高精度；定義最終取整方向與小數位；用實際報價資產及數量測試邊界；不要從未變的取整顯示推斷「沒有累計」。

## 包裝器也是時鐘的一部分

Ondo 提供穩定的 `USDYOracleWrapper` 地址。研究期間，以太坊上的包裝器指向定時切換合約，在切換時刻把請求由舊預言機轉向新預言機。

使用包裝器的軟件可以繼續查詢同一地址；直接讀取舊預言機的軟件若要取得目前官方價格，便需要遷移。Ondo 預計於 2026 年 12 月 31 日停用舊預言機；在 11 月 5 日研究截止時，這仍是未來計劃。

穩定地址不會處理歷史價格、取整或介面顯示。它只明確分工：包裝器決定在哪裡請求目前價格，應用程式決定如何把高精度答案變成可見報價。

## 精確但有限的結論

這次只讀測試驗證的是凍結設定下的計算機制。它沒有執行贖回，也沒有證明持有人的實際所得。費用、資格、暫停、限額、流動性與結算均未進入測試。

預言機可以每秒計數，而螢幕看起來靜止。分開三個時鐘後，矛盾便消失：經濟價值持續累積；預言機按請求時刻計算；報價只在取整允許時變化。

當一個金融數字看似凍結，先問自己正在看哪一個時鐘。

---

**來源：** [Ondo 連續定價公告](https://ondo.finance/blog/usdy-continuous-pricing)、[USDY Price Oracle 文件](https://docs.ondo.finance/general-access-products/usdy/usdy-price-oracle)、[InstantManager 整合文件](https://docs.ondo.finance/developer-guides/usdy-instant-manager-integration)、[Ondo 合約地址](https://docs.ondo.finance/addresses)、經審閱的[合約源碼](https://github.com/ondoprotocol/rwa-contracts/tree/4409cdac96f26bdce584c1078aa7a968dd937dc9)，以及雜湊綁定的[來源 Special](https://iamrobin.ai/ouroboros/202611/20261105/special/)。
