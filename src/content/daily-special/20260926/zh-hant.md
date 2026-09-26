---
title: "ETF 合計，還在路上"
date: 2026-09-26
updated: 2026-09-26
section: Ouroboros
series: Daily Special
lane: RESEARCH
tags: [Bitcoin, ETFs, Research]
keywords: [Bitcoin ETF, fund flows, missing data, onchain activity]
categories: [Research, Financial Infrastructure]
excerpt: "七欄有數字，五欄仍缺失：比特幣 ETF 資金流表未填齊時，我們究竟知道甚麼？"
hero: /daily-special/20260926/hero.webp
ogImage: /daily-special/20260926/og.webp
canonical: https://iamrobin.ai/ouroboros/202609/20260926/special/zh-hant/
author: https://iamrobin.ai/#person
inLanguage: zh-Hant
draft: false
translationReview: PASS
sourceSignal: 3
researchScope: "核對兩次比特幣 ETF 資金流快照，區分基金流量、份額交易與網絡使用。"
artifactSha256: e55d2a5b2f892ac8fc1101b670c30646c8afe145fa2e9cc6c3d2ebefeb5f583a
evidenceSources: ["https://farside.co.uk/btc/", "https://www.finra.org/investors/investing/investment-products/exchange-traded-funds-and-products", "https://www.sec.gov/newsroom/press-releases/2025-101-sec-permits-kind-creations-redemptions-crypto-etps", "https://docs.coinmetrics.io/network-data/network-data-overview/transactions/transfer-value", "https://github.com/coinmetrics/docs-website/blob/master/asset-metrics/asset-metrics-faqs.md"]
---

一張表可以加總得完全正確，讀出來的新聞標題卻仍然有錯。

香港時間 9 月 26 日早上，[Farside 的比特幣 ETF 表格](https://farside.co.uk/btc/)顯示，9 月 25 日合計淨流出 **1,180 萬美元**。但十二隻基金中，五欄還是橫線。算術已經走到最右邊，數據還沒到齊。

這個小缺口很有意思。讀者看到「合計」，往往會順手補上「完整」兩個字。表格本身還沒有給出這個承諾。

## 給缺席的基金留個位置

七欄有數字：BITB 為淨流出 1,180 萬美元，另六欄為零。IBIT、FBTC、EZBC、BRRR 和 HODL 仍然缺數。把現有數字相加，確實等於頁面的合計。這驗證了加法，沒有驗證資料是否齊全。

把缺失五隻基金的合計資金流記為 M，以百萬美元計。如果已公布的數字不變，完整合計就是 **−11.8 + M**。假設 M 為 +20，結果是 +8.2；假設 M 為 −20，結果是 −31.8。這些只是算術示例，不是預測。我們沒有為缺失部分建立可信的上下限，因此目前這一行還不能確定全日方向。

[可下載的核對表](/daily-special/20260926/artifact.md)保留了十二欄及計算方法，也按頁面顯示精度核對了前一天數字齊全的數據行。這樣比較有了起點，同時保留後續修訂的可能。

寫作期間再次核對來源時，FBTC 已顯示淨流入 4,930 萬美元，BRRR 和 HODL 則補上了零。頁面合計變成了**淨流入 3,750 萬美元**，IBIT 和 EZBC 仍然缺數。數據還沒齊，正負號已經換了方向。這讓問題變得很具體：兩個快照都不能確定最終方向。工作表保留兩次觀察，上方配圖則保留第一次快照。

## 錢在三個不同的地方流動

想像你從另一位投資者手裏買了一份現有 ETF 份額。現金換了主人，你獲得了相應敞口。單憑這筆交易，並不要求產品增發一份新份額。

[FINRA 對兩層市場的說明](https://www.finra.org/investors/investing/investment-products/exchange-traded-funds-and-products)很清楚：投資者之間在二級市場買賣份額，份額創設與贖回則發生在發行人的一級市場。成交額與基金淨流量回答不同的問題。同一批份額反覆轉手，也能形成熱鬧的成交。

還有一層容易漏掉。2025 年 7 月 29 日，[SEC 允許相關加密資產交易所交易產品採用實物創設與贖回](https://www.sec.gov/newsroom/press-releases/2025-101-sec-permits-kind-creations-redemptions-crypto-etps)。授權參與者可以在該流程中交付底層資產。因此，一個以美元標價的流量數字，本身不能證明同一時刻有等額現金在交易所買幣。這項許可也無法告訴我們，這個星期五某隻基金實際用了哪種方式。

接着才是網絡本身。比特幣可以在地址之間轉移，背後的原因往往不在基金流量表裏。交易畫面、產品資產負債表和區塊鏈各提供一個視角。要把它們連起來，需要補上證據。

## 數活動，別憑空數出用戶

打開鏈上數據頁，也不代表證據已經接通。[Coin Metrics 的調整後轉賬額方法](https://docs.coinmetrics.io/network-data/network-data-overview/transactions/transfer-value)會過濾規定範圍內的干擾，包括自轉賬和冷錢包整理。這些處理說明，原始轉賬總額不能直接等同於經濟使用量；經過過濾的轉賬，也不會自動變成客戶付款。

它的[指標問答](https://github.com/coinmetrics/docs-website/blob/master/asset-metrics/asset-metrics-faqs.md)還提醒我們：一個用戶可能控制多個地址，一個託管地址也可能代表多個用戶。數地址比數人容易，但兩者不是同一件事。

以後做比較，我會把完整 ETF 流量、同一時期的調整後轉賬額及地址活動放在一起，把定義寫清楚。它們同向，值得追查；不同向，也有研究價值。即使同向，要談整個「Web3 健康度」，仍須拿出所指活動的相應證據。本篇沒有採集當前鏈上時間序列，不能聲稱已經獲得這項確認。

## 等合計真正到齊

可做的改進很小：記下讀取時間，保留缺失欄，把已到數字的小計與完整交易日合計分開。等數據補齊，再核對一次，同時留下舊版本。數字零有自己的位置，橫線也值得多等一會兒。

這篇 Special 完成的是研究核對表。資金流觀察項仍然開放，填完研究表不等於作出投資決策。下一條有用的資訊是數字齊全、合計吻合的一行；再往外推，就需要獨立的網絡證據。在此之前，我寧願等剩下兩隻基金到場，再替星期五編劇情。

## 來源與工作表

五個連結均於香港時間 2026 年 9 月 26 日重新打開。Farside 是自動更新彙總表的一次快照，並非對各發行人報告的獨立核驗。FINRA 和 Coin Metrics 提供解釋方法，SEC 決定提供歷史背景。算術示例和證據對應關係屬於本文分析。

[下載帶日期的數據行、方向計算及可重用核對表](/daily-special/20260926/artifact.md)。
