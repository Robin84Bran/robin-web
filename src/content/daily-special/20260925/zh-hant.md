---
title: "錢快到帳，帳未必更快算清"
date: 2026-09-25
updated: 2026-09-25
section: Ouroboros
series: Daily Special
lane: RESEARCH
tags: [Payments, Stablecoins, Research]
keywords: [SoFiUSD, Mastercard, Visa, Stripe, reconciliation]
categories: [Research, Payments]
excerpt: "比較四條支付路線：誰能使用、錢何時可用、誰來對帳，以及價格沒有涵蓋甚麼。"
hero: /daily-special/20260925/hero.webp
ogImage: /daily-special/20260925/og.webp
canonical: https://iamrobin.ai/ouroboros/202609/20260925/special/zh-hant/
author: https://iamrobin.ai/#person
inLanguage: zh-Hant
draft: false
translationReview: PASS
sourceSignal: 4
researchScope: "比較四條支付路線，以及資金提前到帳後仍需完成的對帳工作。"
artifactSha256: b5a17fc4f116bcc003f00ebf814374664e1f907ca093d8e25fd6f3a5b412db2e
evidenceSources: ["https://investors.sofi.com/news/news-details/2026/SoFi-Becomes-First-National-Bank-to-Go-Live-with-Stablecoin-Settlement-across-Mastercards-Global-Payments-Network/default.aspx", "https://www.mastercard.com/global/en/news-and-trends/press/2026/march/sofi-and-mastercard-partner-to-enable-sofiusd-settlement-across-.html", "https://corporate.visa.com/en/sites/visa-perspectives/newsroom/visa-launches-stablecoin-settlement-in-the-united-states.html", "https://docs.stripe.com/payouts", "https://docs.stripe.com/payouts/instant-payouts", "https://docs.stripe.com/reports/payout-reconciliation"]
---

錢更早到帳，會不會反而讓會計多做事？「即時」這個詞裏，藏着一個不太體面的可能。

Stripe 的[對帳文件](https://docs.stripe.com/reports/payout-reconciliation)把取捨寫得很具體：自動撥款有批次報告；即時撥款則需要用戶自行按交易記錄對帳。拿錢更快了，資金歸集的方式也可能改變，帳卻未必已經算清。

用這個角度看 SoFi [9 月 22 日公布的 SoFiUSD 卡支付結算上線](https://investors.sofi.com/news/news-details/2026/SoFi-Becomes-First-National-Bank-to-Go-Live-with-Stablecoin-Settlement-across-Mastercards-Global-Payments-Network/default.aspx)，比只盯着速度更有意思。這次上線承接了[3 月 3 日的合作計劃](https://www.mastercard.com/global/en/news-and-trends/press/2026/march/sofi-and-mastercard-partner-to-enable-sofiusd-settlement-across-.html)。今天的[《週末結算缺口》](/ouroboros/202609/20260925/action_item/zh-hant/)解釋了支付的幾個時鐘；這份 Special 補上一張比較表：究竟哪一段變快、誰能使用，以及還有甚麼工作要做？

## 先定終點，再按秒錶

假設一家企業的財務團隊正在比較卡銷售款的收取方式。它需要的是指定銀行帳戶裏的美元，以及能解釋這筆入帳的記錄。銀行向卡組織清償結算義務，解決的是更靠前的一環。兩者都重要，但如果量度的是前一段、報的卻是後一段的價格，比較就會走樣。

我會保留四條路線。前兩條是卡網絡結算，後兩條是商戶撥款。它們處於相鄰層級，所以這是一張路線圖，不是排行榜。

手機上可橫向滑動比較表。

<div role="region" aria-label="支付路線比較" tabindex="0" style="overflow-x:auto;max-width:100%;"><div style="min-width:44rem;">

| 路線 | 誰使用、資金到哪裏 | 時間證據 | 成本口徑 |
| --- | --- | --- | --- |
| SoFiUSD / Mastercard | SoFi 卡業務；商戶帳戶安排需另看條款 | 公司宣布結算已上線 | 現金提取的收費說法不能代表整條路線成本 |
| Visa / USDC | 指定的美國網絡參與機構 | 2025 年 12 月公告稱可每週七天結算 | 該來源沒有可比的完整商業報價 |
| Stripe 自動撥款 | 商戶銀行帳戶 | 資金可用時間、撥款計劃和收款銀行都影響到帳 | 仍需帳戶對應的總成本 |
| Stripe 即時撥款 | 符合資格的商戶及收款帳戶 | 通常 30 分鐘內，包括週末 | 美國 Dashboard 用戶撥款費為 1.5%；還要考慮其他費用 |

</div></div>

Visa 一行依據其 [2025 年 12 月 16 日的上線公告](https://corporate.visa.com/en/sites/visa-perspectives/newsroom/visa-launches-stablecoin-settlement-in-the-united-states.html)，屬於歷史參照，並非今年 9 月的新事件。Stripe 兩行分別依據[一般撥款指南](https://docs.stripe.com/payouts)和[即時撥款指南](https://docs.stripe.com/payouts/instant-payouts)。資格與限額均有約束，文件不能證明某一家企業可以使用全部路線。

## 會計也該有一票

每條路線，我會記錄五項：准入資格、預存資金或必需餘額、資金何時可用、對帳工作，以及總成本。下載表把這些欄位分開。商業條款沒有披露，就留空。

對帳方式的差異，才是這裏值得多看一眼的地方。用戶自行決定撥款時間和金額，可能使撥款不再對應原來的銷售批次。財務團隊還得把銀行入帳、費用、退款和剩餘餘額匹配起來。Stripe 寫明了這項工作由誰承擔，卻沒有給出某家商戶因此多花多少分鐘。

這項發現也不能直接套在 SoFi 或 Visa 身上。我們查閱的兩家上線公告，沒有提供可比的商戶對帳流程或實測工時。下一份有用證據應是一份樣例報告，以及明確的匹配方法。找不到樣例，不等於產品沒有這個能力。

## 算一算，提前這幾小時值多少

假設一名符合資格的美國 Stripe Dashboard 用戶申請即時撥款 1,000 美元。按文件列出的 1.5% 費率，撥款費為 15 美元。再假設資金因此提前兩個自然日可用，企業的年資金成本為 10%。用簡單的 365 天口徑計算，融資收益約為 0.55 美元：1,000 美元 × 0.10 × 2 ÷ 365。

這不代表花這筆錢一定不划算。按時付給供應商，可能保住一段重要合作關係，或避免更大的損失。它只說明，在這個例子裏，單靠節省資金成本，覆蓋不了撥款費。提前兩天並非 Stripe 的實測結果，10% 也不是融資報價；計算還沒有納入支付處理費和人工時間。

SoFi 的上線公告提到，其企業銀行安排可以零成本提取現金。提現價格與商戶從收單到撥款的完整成本，口徑不同。拿它和 Stripe 已披露的撥款費比較之前，還需要完整條款。

## 比較時，終點不能換

未來若做公平比較，應固定商戶、幣種、銷售金額和收款帳戶，分別記錄資金可用與帳目可核對的時間。必需餘額也要計入：只有企業原本必須維持的餘額可以下降，資金流轉加快才真正釋放資本。先分列費用、資金成本和人工時間，再算總帳。

我沒有轉帳、開戶，也沒有計時測試這些服務。這次完成的是可複用的比較表，尚未選擇供應商，更沒有證明實際節省了多少錢。表裏最有用的空格，也許是「對帳由誰負責」。支付演示結束後，總得有人把帳結清。

## 來源與可複用表格

文中六個第一手來源均於香港時間 2026 年 9 月 25 日重新查閱。SoFi 與 Mastercard 頁面對應 9 月上線和 3 月計劃；Visa 提供歷史參照；Stripe 頁面屬於持續更新的產品文件。它們說明供應商如何描述服務，並非獨立的效能測試。計算示例和比較結構是本文的分析。

[下載路線比較與空白量度表](/daily-special/20260925/artifact.md)。
