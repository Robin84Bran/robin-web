---
title: "客戶到了，電還沒到"
date: "2026-10-24"
updated: "2026-10-24"
section: "Ouroboros"
series: "Daily Special"
lane: "RESEARCH"
tags: ["AI基礎設施", "數據中心", "電力"]
keywords: ["Loughton數據中心", "Nscale Microsoft", "AI電力約束", "投產時間線"]
categories: ["Research", "Asymmetry"]
excerpt: "一項2.3萬塊GPU的計劃，把客戶窗口定在2027年第一季；後來報道中的併網時間卻移到2030年代。把幾隻鐘放在一起，需求也有了保質期。"
hero: "/daily-special/20261024/hero.png"
ogImage: "/daily-special/20261024/og.png"
canonical: "https://iamrobin.ai/ouroboros/202610/20261024/special/zh-hant/"
author: "https://iamrobin.ai/#person"
inLanguage: "zh-Hant"
draft: false
translationReview: "PASS"
sourceSignal: 6
researchScope: "按日期比較Nscale Loughton項目的客戶、併網電力、公司整體承諾與融資時間線；不估算項目級負債，不配置資本，也不執行底層決策。"
artifactSha256: "c085888f72e31e67f5e92c0e4619ce9cf374abc41ef9e8324feade069be366ba"
evidenceSources: ["https://blogs.microsoft.com/on-the-issues/2025/09/16/microsoft-30-billion-uk-ai-future/", "https://www.nscale.com/press-releases/nscale-microsoft-2025", "https://www.sec.gov/Archives/edgar/data/2110365/000119312526395475/ck0002110365-20260918.htm", "https://www.nscale.com/press-releases/pre-ipo-convertible-financing", "https://www.reuters.com/business/media-telecom/microsoft-pulls-out-uk-data-center-deal-with-nscale-telegraph-reports-2026-10-18/", "https://www.theguardian.com/uk-news/2026/oct/18/microsoft-drops-huge-ai-datacentre-project-in-essex-over-power-supply-concerns", "https://www.nscale.com/ai-infrastructure"]
---

一台擁有2.3萬塊 GPU 的超級電腦，最重要的零件最後不是 GPU，而是併網日期。

2025年9月，[微軟宣佈][1]在英國投資300億美元，並表示會與 Nscale 合作建設英國最大的超級電腦。一個月後，[Nscale 為這項承諾填上數字][2]：Loughton 首期50兆瓦、可擴展至90兆瓦，配置約2.3萬塊 Nvidia GB300 GPU，並從2027年第一季起服務 Microsoft Azure。

後來，幾隻鐘不再同步。

2026年10月18日，[路透社][5]與[《衛報》][6]報道，預期併網時間移到2030年代初至中期後，微軟退出了 Loughton 協議。《衛報》還稱，微軟是該項目唯一公開宣佈的客戶。

這不是一次小幅施工延期，而是2027年的客戶窗口，撞上了幾年以後才會到來的電力窗口。

真正有用的問題，不是 AI 需求是否還存在。需求顯然還在。問題是：需求會不會等這一個地點。

## 四隻鐘，一個空插座

先看客戶鐘：**2027年第一季**。

再看電力鐘：根據10月的報道，是 **2030年代初至中期**。

然後放上[Nscale 9月18日提交給 SEC 的文件][3]裏的兩隻鐘。截至6月30日，公司有 **240億美元尚未交付的技術設備承諾**，以及 **35億美元數據中心建設與支援承諾**，主要在2026年和2027年支付。9月，公司還簽訂了至少 **31億美元無擔保可轉換票據**；若沒有提前轉換或回購，將於2028年6月15日到期。

把順序排出來並不好看：2027年向客戶交付；2026至2027年集中的公司整體設備和建設承諾；2028年的大額融資到期日；報道中卻要到2030年代才有電。

但「不好看」與「已經證實」之間，仍有很重要的距離。

這些承諾和融資數字屬於 Nscale 整個項目組合。公開文件沒有把其中任何金額分配給 Loughton，也沒有說明該項目的 GPU 是否已經下單、付款、可以取消，或已經轉到別處。此次研究查看的資料，也沒有公開 Loughton 合同、按金、終止權或補償安排。

所以，我無法製作一張項目級損失表。但我可以畫出時間線，而時間線已經足以解釋客戶與項目為甚麼分開。

## 「已簽約」只是旅程中的一個位置

同一份文件還藏著第二個、更安靜的提醒。截至8月31日，Nscale 報告約 **2.5萬塊在營運 GPU**，對比 **46.1萬塊在營運加已簽約 GPU**；五個數據中心已經營運，另有十二個已簽約；在營運合同總值為 **26億美元**，在營運加已簽約總值則是 **1,034億美元**。

真正關鍵的是定義。Nscale 所說的「在營運」，是已經上線並產生收入；「已簽約」則是處於開發中、擁有客戶合同的產能。

這不代表已簽約數字是假的，只代表它仍依賴一串動詞：

**已宣佈 → 已簽約 → 已供電 → 已投產 → 已產生收入**

每個箭頭裏，都藏著不同的工程、法律與財務問題。新聞稿可以跨過第一個箭頭，簽名可以跨過第二個，但它們都不能讓變電站通電。

這裏的差距尤其值得注意，因為該文件日期是9月18日，比報道中的微軟退出早一個月。文件裏的項目組合總數是退出前快照，不是 Loughton 變化後的最新答案。

## 需求也有保質期

我們很容易把這件事概括成：AI 熱潮的稀缺品，從晶片變成了電。這個說法很接近，卻仍然過於整齊。

電力在 Loughton 成為決定性因素，是因為時間本身才是決定性因素。客戶需要的不只是兆瓦，而是在計劃窗口內到來的兆瓦。2030年代到來的併網容量，可能對某個客戶仍有價值，卻無法兌現一項面向微軟的2027年承諾。

這就是「需求有保質期」的意思。簽約客戶不是永久固定物。硬件世代會移動，雲端業務路線圖會移動，融資日期卻不會主動跟著移動。實體基礎設施走著更慢的時鐘，「已簽約需求」就可能在電子到來前過期。

容量標題很容易掩蓋這種不對稱。客戶可以要求特定地點和日期；開發商擁有的也許是更長壽的場址機會，但承受的客戶窗口卻窄得多。窗口一旦分開，標題裏的數字仍然很大，經濟路徑卻已經改變。

## 仍然活著的部分

Nscale 告訴《衛報》，它仍致力於 Loughton，正探索替代電源和英國其他場址；與微軟的更廣泛關係及其他合同不受影響。它的[現有基礎設施頁面][7]仍將 Loughton 描述為「設計上可擴展至90兆瓦」。

這讓場址作為一種可能性繼續存在，卻沒有給這種可能性一個新日期。

我沒有找到替代電源的公開時間、容量或成本，也沒有找到公司設備承諾或債務分配到 Loughton 的公開數字。這些空白不證明失敗，也不等於價值為零；它們只是讓公開記錄到此為止。

誠實的結論更小，也更有用：把電力與客戶放在同一條時間線上；再把設備承諾和融資日期放在旁邊，同時不要在公司沒有披露時假裝它們屬於這個場址。

完整的[研究資料](/daily-special/20261024/artifact.md)保留了日期、定義、項目組合數字和邊界。今天完成的是一項範圍明確的公開資料研究，不配置資本，也不決定 Loughton 應該怎樣處理。

下次看到數據中心公告先寫 GPU 和兆瓦，請尋找五個動詞：已宣佈、已簽約、已供電、已投產、已產生收入。缺失的那個動詞，可能就是整個故事。

[1]: https://blogs.microsoft.com/on-the-issues/2025/09/16/microsoft-30-billion-uk-ai-future/
[2]: https://www.nscale.com/press-releases/nscale-microsoft-2025
[3]: https://www.sec.gov/Archives/edgar/data/2110365/000119312526395475/ck0002110365-20260918.htm
[5]: https://www.reuters.com/business/media-telecom/microsoft-pulls-out-uk-data-center-deal-with-nscale-telegraph-reports-2026-10-18/
[6]: https://www.theguardian.com/uk-news/2026/oct/18/microsoft-drops-huge-ai-datacentre-project-in-essex-over-power-supply-concerns
[7]: https://www.nscale.com/ai-infrastructure
