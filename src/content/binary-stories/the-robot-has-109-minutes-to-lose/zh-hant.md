---
title: "機器人只有109分鐘可失去"
storySlug: "the-robot-has-109-minutes-to-lose"
date: "2026-10-20"
updated: "2026-10-20"
lane: "BUILD"
excerpt: "90/9電池循環在理想運行上限與20小時工作目標之間留下約109分鐘。整個班次系統必須在這段餘量裡證明自己。"
hero: "/binary-stories/the-robot-has-109-minutes-to-lose/hero.webp"
ogImage: "/binary-stories/the-robot-has-109-minutes-to-lose/og.webp"
keywords: ["Digit 5", "機器人正常運行時間", "快速充電", "班次營運"]
canonical: "https://iamrobin.ai/binary/stories/the-robot-has-109-minutes-to-lose/zh-hant/"
inLanguage: "zh-Hant"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202610/20261020/special/"
sourceArtifactSha256: "996dc33d47da5b4c7e54d570518e0ed52b7500812657aae2ee4fab4aa424a4f4"
carouselPdf: "/carousels/the-robot-has-109-minutes-to-lose.pdf"
carouselCaption: "/carousels/the-robot-has-109-minutes-to-lose.txt"
carouselPages: 7
draft: false
---

九分鐘，聽起來像一個充電故事。

其實，它只是一個24小時營運故事的第一句。

Agility Robotics表示，Digit 5將運行90分鐘、充電九分鐘，並在一天內完成超過20小時的生產性工作。電池算術給出了一道格外清楚的檢驗：按照理想的90/9節奏，機器人每天最多可運行約 **21小時49分鐘**。如果把20小時當作目標下限，兩者之間會出現一個很小的空間。

它只有 **109分鐘**。

所有電池時鐘沒有計算的損失，都要擠進這裡。

## 規格結束，班次才開始

理想的一天裡，充電占2小時11分鐘。20小時生產性工作意味著還有四小時沒有產出。扣掉理想充電時間，剩餘1小時49分鐘必須容納系統的其他部分：

- 前往與離開充電器；
- 對位與停靠；
- 排隊或電池過熱；
- 路徑受阻與任務中斷；
- 計畫維護、故障與恢復；
- 人工介入；以及
- 被客戶拒收或要求重做的任務。

![24小時班次被拆成20小時生產性工作下限、理想充電時間，以及容納其他全部損失的109分鐘餘量。](/binary-stories/the-robot-has-109-minutes-to-lose/hero.webp)

這109分鐘不是實測停機時間。它是在20小時下限上推導出來的預算，而且假設好得足以讓試算表臉紅：機器人永遠準備就緒，充電器永遠空著，任務永遠排在面前，停靠不花時間。

現實拿到同一份預算，卻沒有這些好意。

## 車隊一起花掉這份預算

一台機器人在理想狀態下占用充電器時鐘的9.1%。如果到達時間完美錯開，五台消耗一台充電器45.5%的容量，十台消耗90.9%，十一台消耗100%。這還沒給停靠、波動或故障留出一分鐘。

這不是建議的機器人與充電器配比。Agility也沒有公布Digit 5的客戶配比。它的價值在於劃出邊界，並改變「快速充電」的含義。更快的電池也許能少配一台備用機器人，但整支車隊可能透過一條共享佇列，把省下來的時間悄悄還回去。

設計單位不再只是機器人，而是同一班次裡的機器人、充電器、路線、任務佇列與恢復流程。

## 動作不能替客戶簽收

Agility表示，早期版本的Digit在GXO搬運了超過10萬個料箱。這個累計數量是真實披露，但它無法填滿109分鐘的帳，因為公開里程碑沒有同時給出計畫工時、充電時間、介入次數或被拒收的任務。

最乾淨的分母是 **每個計畫小時的驗收任務數**。再把生產性自主運行分鐘放在旁邊。前者衡量客戶收到什麼，後者說明整個班次去了哪裡。

這組指標不會讓動作優美的機器人為一條空輸送帶、一次重複搬運或一條充電佇列領功，也不會把倉庫的每次延誤都怪到機器人頭上。帳本可以把它們分開。

Agility自己的部署流程已經指向這個方向：在擴大班次或工作流程之前，用90天營運試點測量正常運行時間、吞吐量與可靠性。不過，Digit 5仍處於開發階段，Agility也把相關規格稱為基於內部測試與預生產配置的初步估計。90/9系統與20小時結果目前是目標，不是已經公開的完整客戶班次紀錄。

所以，快速充電確實完成了一件有價值但範圍更窄的事：它沒有完成商業論證，而是給營運買來了一小份損失預算。

接下來最值得看的數字不是九。

而是客戶能保住多少個109分鐘。

[1]: https://www.agilityrobotics.com/content/agility-robotics-selects-nyobolt-as-its-ultra-fast-charging-battery-technology-partner-for-digit-5
[2]: https://www.sec.gov/Archives/edgar/data/2074973/000121390026107265/ea0307857-425_churchill11.htm
[3]: https://www.agilityrobotics.com/faq
[4]: https://www.agilityrobotics.com/content/digit-moves-over-100k-totes
[5]: https://www.agilityrobotics.com/solutions/digit-5

來源：Agility Robotics的[電池公告][1]、[SEC備案的投資者日文字稿][2]、Agility的[部署常見問題][3]、[10萬個料箱里程碑][4]與[Digit 5產品頁][5]。文中的時間預算由公開目標推導，是說明性計算，不是實測部署結果或設施建議。
