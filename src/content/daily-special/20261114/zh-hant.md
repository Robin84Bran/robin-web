---
title: "DTCC 通往 Solana 之路，延伸至 2027 年"
date: "2026-11-14"
updated: "2026-11-14"
section: "Ouroboros"
series: "Daily Special"
lane: "RESEARCH"
tags: ["代幣化", "市場基礎設施", "Solana"]
keywords: ["DTCC 代幣化服務", "DTC", "Solana", "Canton Network", "Besu"]
categories: ["研究", "市場基礎設施"]
excerpt: "DTCC 的代幣化服務已在 Canton 和 Besu 上運作；Solana 接入目標在 2027 年，下一項關鍵證據是一宗可公開追溯的 Solana 交易。"
hero: "/daily-special/20261114/hero.png"
ogImage: "/daily-special/20261114/og.png"
canonical: "https://iamrobin.ai/ouroboros/202611/20261114/special/zh-hant/"
author: "https://iamrobin.ai/#person"
inLanguage: "zh-Hant"
draft: false
translationReview: "PASS"
sourceSignal: 4
researchScope: "這是一項根據公開資料進行的有界研究，追蹤 DTCC 從計劃接入 Solana 到可確認歸屬交易的路徑；未執行交易、代幣化指令、公司聯絡、資本配置或任何底層投資與實施決策。"
artifactSha256: "f56fc2049471b885ce2af3186572c772e2bb29dd8366512ec02f35d3e4ee403e"
evidenceSources: ["https://www.sec.gov/files/tm/no-action/dtc-nal-121125.pdf", "https://www.dtcc.com/press-releases/2026/dtcc-turns-tokenization-into-reality", "https://www.dtcc.com/press-releases/2026/dtcc-tokenization-service-goes-live", "https://www.dtcc.com/products-and-services/digital-assets/tokenization", "https://www.dtcc.com/press-releases/2026/dtcc-tokenization-service-to-connect-with-solana", "https://dtcclearning.com/products-and-services/dtcc-digital-assets/digital-asset-solutions/tokenization-service.html", "https://dtcc-da.com/api/tokenization-service/api-reference-guide/content"]
---
# DTCC 通往 Solana 之路，延伸至 2027 年

金融市場依賴一個看似簡單的問題：誰對哪一項證券享有權益？一股股票可以多次轉手，背後始終需要有人可靠地記錄各方對它的權益、它帶來的款項，以及持有人享有的權利。這些工作大多在一些投資者螢幕上鮮有出現的機構內完成。

美國存管信託與結算公司（Depository Trust & Clearing Corporation，簡稱 DTCC）就是其中之一。旗下的證券存管機構——存管信託公司（Depository Trust Company，簡稱 DTC）——負責保管證券，並記錄參與金融機構對這些證券享有的權益。DTCC 在 2026 年 10 月的服務推出公告中表示，DTC 託管的資產超過 114 萬億美元。這個規模有助解釋，為何它的記錄基礎設施一有變動，就會引起關注。

DTCC 現正為合資格參與者提供另一種持有和轉移這些權益的方式：把權益化為區塊鏈網絡上的數碼代幣。區塊鏈是用來追蹤交易的共享電子記錄。DTCC 的代幣化服務已在兩個網絡上處理正式運作中的業務活動。2026 年 11 月 12 日，DTCC 宣布將公共區塊鏈 Solana 列為未來接入的網絡，預計於 2027 年下半年提供服務。

要理解這項公告，先要看清楚實際轉移的是甚麼。

## 證券仍由 DTC 保管

在這項服務下，相關證券仍由 DTC 持有，並以 DTC 的代名人 Cede & Co. 名義登記。代幣代表參與機構的*證券權益*：即記錄在案、該機構對 DTC 所持證券享有的權益。

合資格參與者會指示 DTC，將權益轉入一個數碼綜合帳戶，用來集中存放這項服務所涉及的權益。DTC 的軟件隨後建立、也就是「鑄造」相應代幣，並將它發送至已登記錢包——與合資格參與者相關聯、獲批准使用的數碼地址。代幣可在已登記錢包之間轉移。銷毀代幣的程序稱為「燃燒」，會將權益轉回 DTC 傳統的電子記錄。

可以想像一個倉庫：貨物留在原位，獲認可的提貨憑證則在不同持有人之間轉手。在這裏，證券繼續受到託管，代幣則透過另一套記錄系統承載參與者的權益。這個比喻說明了轉移方式；法律權利則源自實際的服務安排。DTCC 表示，其代幣化證券保留了傳統證券的所有權權利、投資者保障及經濟權益。

DTC 也在區塊鏈以外保存正式記錄。旗下 LedgerScan 系統會監察代幣流動，並記錄代幣化權益。

因此，誰可以使用服務，是一個重要界線。Solana 是公共網絡，而這項服務的使用資格仍限於採用已登記錢包的合資格 DTC 參與者。網絡的公開可用性與服務的參與者規則，分別描述了這項安排的兩個不同層面。

## 服務如何進入正式運作

監管基礎先行。2025 年 12 月 11 日，美國證券交易委員會（SEC）交易及市場部的職員，就 DTC 所描述的初步服務發出了一封附帶條件的不採取行動函。這類函件根據提交的事實與情況，說明職員對特定條文下執法行動的立場。

函件的適用範圍明確：這是一項供使用已登記錢包的 DTC 參與者自願採用的服務。當中列出的合資格證券包括羅素 1000 指數的成分股及其後新增的成分股；該指數涵蓋美國大型企業。範圍亦包括美國國債，以及追蹤主要指數的交易所買賣基金。

這個框架也對初步服務設下限制。在 DTC 的風險管理計算中，代幣化權益的抵押品價值或交收價值均計為零。職員的立場預定於服務推出三年後失效，期間仍可修改或撤銷。其法律適用範圍限於函件所處理的條文及情況。

下一個里程碑來自實際運作。DTCC 表示，已於 2026 年 7 月 15 日處理涉及 DTC 代幣化資產的正式交易，參與機構超過 30 家。

這些轉換在 Canton Network，以及 DTCC 運行 Besu 區塊鏈軟件的私人網絡上進行。Canton Network 是一個用於金融活動的區塊鏈網絡。據報，相關業務流程包括證券借貸、將資產質押作抵押品，以及協調證券交付與付款的交易，亦包括股票代幣的轉移。

這些都是整項服務在上述兩個網絡上的具體用途，證明由 DTC 保管的證券所對應的權益，已進入正式運作的區塊鏈業務流程。

10 月 28 日，DTC 正式推出 DTCC 代幣化服務（DTCC Tokenization Service，簡稱 DTS），並已接入 Canton 及私人 Besu 網絡。DTCC 表示，已有 20 家 DTC 參與機構簽署服務接入協議，往後將有更多用戶加入。開發期間，超過 150 家機構曾提供意見。

每個數字回答的問題都不同。參與開發諮詢的機構數目，反映徵詢意見的廣度。7 月的參與機構數目，反映對所報告正式運作活動的參與情況。已簽署的協議，反映服務推出時的接入承諾。持續使用的情況，則需要另行以活動數據衡量。

看待這項服務涉及的龐大金額時，也需要同樣仔細。DTCC 的產品頁面顯示，服務推出時有 34 隻證券可供代幣化，服務介紹中亦列出約 30 萬億美元的託管資產。推出公告則另外列出 DTC 整體託管資產總額，超過 114 萬億美元。

這些數字描述的是可用範圍與託管規模。衡量採用程度，需要知道實際轉換成代幣的價值，以及利用這些代幣完成的交易。衡量經濟效益，則需要有關成本、所需時間，以及參與者完成同類工作所需資本的證據。

## Solana 在哪裏加入這個故事

11 月 12 日的公告，明確列出一個未來接入的網絡及目標時間。DTCC 表示，預計 DTC 代幣化資產將於 2027 年下半年在 Solana 上提供，功能包括將合資格資產轉換成代幣，以及在代幣整個生命週期內進行管理。

這將增加合資格參與者可持有及轉移 DTC 所記錄權益的網絡選擇。其意義在於，把既有的證券託管體系與另一個區塊鏈的交易系統連接起來。

時間上的區別很清楚：Canton 和 Besu 的正式運作活動於 2026 年 7 月公布；整項服務於 10 月推出；Solana 的接入計劃隨後於 11 月公布，目標定於 2027 年。

公開技術文件有助理解現有服務。DTCC 學習中心日期為 10 月 30 日的頁面，提供使用者指南及公開應用程式介面（API）參考文件的連結。API 參考文件是軟件開發人員用來連接系統的說明，涵蓋帳戶、錢包、轉換指令，以及服務必須處理、與證券相關的公司行動。

這份參考文件最近一次發布是在 10 月 14 日，早於服務推出及 Solana 公告。它提供的是一般服務文件。要確認 Solana 的正式運作狀態，需要該網絡的具體證據。

截至研究截點，即香港時間 2026 年 11 月 14 日上午 10 時 32 分，所審閱的公開來源確認，Solana 是一項預定於 2027 年下半年接入的計劃。任何非公開工程開發或測試的進展，仍有待了解。

首宗能確認歸屬的 Solana 交易，會為這個故事帶來另一種具體細節。一份附有日期的記錄，會把參與的 DTC 機構及一項合資格證券，與一個 Solana 程式地址和一個交易識別碼連結起來。程式地址用來識別處理交易的軟件。這份記錄會顯示完成了哪個步驟：鑄造、轉移或銷毀代幣，並列明其完成狀態，以及任何交易逆轉或例外情況。

這樣的記錄，將證實 Solana 上發生了一項實際 DTS 活動。至於降低成本、提高流動性或更有效運用抵押品等說法，屆時仍各有問題，需要透過實際活動的量度來回答。

目前，這個故事有兩項不同的成果：一項已進入正式運作的證券代幣化服務，以及一項已確定網絡名稱和目標時間的未來連接計劃。當某項具體的 DTC 權益在 Solana 上完成某個具體步驟，而且公開記錄讓讀者可以追蹤，下一章就會變得真切可見。

資料來源：[SEC 職員函件，2025 年 12 月 11 日](https://www.sec.gov/files/tm/no-action/dtc-nal-121125.pdf)；DTCC 的[7 月正式運作報告](https://www.dtcc.com/press-releases/2026/dtcc-turns-tokenization-into-reality)、[10 月服務推出公告](https://www.dtcc.com/press-releases/2026/dtcc-tokenization-service-goes-live)、[11 月 Solana 公告](https://www.dtcc.com/press-releases/2026/dtcc-tokenization-service-to-connect-with-solana)及[服務頁面](https://www.dtcc.com/products-and-services/digital-assets/tokenization)；[DTCC 學習中心](https://dtcclearning.com/products-and-services/dtcc-digital-assets/digital-asset-solutions/tokenization-service.html)及 [API 參考文件](https://dtcc-da.com/api/tokenization-service/api-reference-guide/content)。
