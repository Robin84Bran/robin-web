---
title: "🏹 Robin 每日訊號簡報，2026年11月25日"
date: 2026-11-25
updated: 2026-11-25
section: Ouroboros
series: Daily Briefing
tags:
  - Intelligence
  - AI Infrastructure
  - Bitcoin
  - Stablecoins
keywords:
  - AI infrastructure
  - crypto market structure
  - stablecoins
  - physical AI
  - robotics
excerpt: "八個訊號，涵蓋前沿模型、資本流動、支付軌道、公開市場、基礎設施、私募資本、Physical AI 與機器人。"
hero: /daily-briefing/20261125/hero.webp
ogImage: /daily-briefing/20261125/og.webp
canonical: "https://iamrobin.ai/ouroboros/202611/20261125/zh-hant/"
author: https://iamrobin.ai/#person
inLanguage: zh-Hant
languageSlug: zh-hant
translationOf: "https://iamrobin.ai/ouroboros/202611/20261125/"
translationReview: PASS
draft: false
sourceMode: autonomous_research
---

**今天值得拆開看的兩個數字：4 美分和 400 盎司。** 4 美分是 iFood 每次智能體執行的平均推論成本，還不是交付一個通過驗收的結果的成本。400 盎司是倫敦金條的規格，如今其部分所有權可以單獨交易、結算和質押。一個案例要求我們衡量完整成本；另一個展示了新的可交易單位能帶來什麼可能。

## 1. 前沿智能體：iFood 報告執行了 25,000 次，下一個數字是通過驗收的工作

日期： 11 月 24 日。

**事實：** 在 [OpenAI 客戶案例](https://openai.com/business/customer-stories/ifood/)中，iFood 報告平台已完成逾 **25,000 次執行**，平均每次推論成本為 **0.04 美元**。GPT‑5.6 Luna 在隔離環境中非同步工作，並提交 GitLab 合併請求；內部安全平台報告修復的漏洞數超過原來的兩倍。案例沒有提供無人干預驗收率，而這 4 美分不包括執行基礎設施、跨次執行的重試，以及對產出工作的人工覆核。

**Robin為何在意 —** 這為 Honest Agent 提供了實地對照。格式正確的完成報告能讓下一個程式繼續，卻不能證明改動有效。對一人公司而言，較便宜的模型只有在不把驗證負擔交回給你時才算勝出。

**One Action：** 重播一批驗收條件已知的 RobinOS 維護任務，計算包含失敗重跑、基礎設施與覆核的總成本，再除以通過獨立測試且無需 Robin 補救的交付數。

## 2. 物理 AI：文遠知行季度 Robotaxi 收入突破人民幣 1 億元，逾九成來自海外

日期： 11 月 20 日。

**事實：** [文遠知行第三季公告](https://weride.gcs-web.com/news-releases/news-release-details/overseas-revenue-1715-yoy-contributing-nearly-half-total-revenue)報告，季度 Robotaxi 收入首次超過**人民幣 1 億元**，同比增長 **204%**，其中逾九成來自海外。公司另稱廣州業務已實現正向單位經濟效益。它沒有將 Robotaxi 總收入拆分為車費、車輛銷售和合作夥伴服務，也沒有宣稱全球車隊已盈利。

**Robin為何在意 —** 大部分商業收入來自中國以外，單位經濟效益的里程碑則來自中國的一座城市。把兩者合併，就會製造出全球盈利的說法。這兩個指標都不能直接與美國營運商的付費乘次相比。

**One Action：** 尋找一個跨地區可比的數字：在一座成熟城市，扣除遠端協助和車隊營運成本後，每付費車輛小時的貢獻利潤。

## 3. 加密資本流：美國比特幣與以太幣現貨 ETF 單日合計淨流出 6.546 億美元

日期： 11 月 23 日美國交易時段；11 月 24 日核對。

**事實：** Farside 已填齊的[比特幣表](https://farside.co.uk/BTC/)顯示淨贖回 **5.697 億美元**，其中 **IBIT 為 5.093 億美元**。[以太幣表](https://farside.co.uk/ethereum-etf-flow-all-data/)顯示流出 **8,490 萬美元**。截稿時，兩張表的 11 月 24 日列在基金欄仍是橫線；顯示為零的合計並不能證明資金流為零。

**Robin為何在意 —** 資金離開了這兩條受監管的投資敞口渠道，而比特幣贖回集中於一隻基金。這比「巨鯨在賣出」更精確。它沒有指出資金去了哪裡，也沒有顯示鏈上使用量下降。

**One Action：** 在下一列資料填齊後追問：剔除 IBIT，比特幣 ETF 是否仍為淨流出？這能區分單一產品贖回與更廣泛的撤資。

## 4. 可程式化金融：金條不用出庫，也能質押其中一部分

日期： 11 月 24 日。

**事實：** [世界黃金協會](https://www.gold.org/news-and-events/press-releases/world-gold-council-facilitates-first-live-transactions-using-pooled)稱，滙豐、摩根大通和 StoneX 在具有法律約束力的批發試點交易中，交易、結算並質押了「匯集黃金權益」（PGI）。倫敦 400 盎司金條進入隔離的資產池；參與者取得對金屬的財產權，並透過實物提取完成整個生命週期。這超出了合成價格敞口的範疇，但並非零售公鏈產品的推出。[CoinDesk](https://www.coindesk.com/business/2026/11/24/jpmorgan-hsbc-and-stonex-complete-first-digital-gold-trades-in-london)提供了市場背景。

**Robin為何在意 —** 假設借款人還缺相當於半根金條的抵押品。它可以質押一份可分割的權益，無須切割或搬動整根金條。更值得關注的流通問題是：另一家貸款人是否會在原有安排之外接受這份權益。

**One Action：** 追蹤第一家在三家試點公司之外、接受 PGI 並披露抵押折扣的貸款人。這個折扣比名義成交額更能說明這份權益的實用性。

## 5. iamrobin.ai 編輯台：如果 SpaceX 收購 Tesla，誰會多一票？

日期： 11 月 24 日。

**事實：** [《金融時報》的原始報道](https://www.ft.com/content/2585e45e-9133-4215-a2d8-e1275e1033b9)指出，Tesla 三名董事及 SpaceX 兩名董事參與各自的談判委員會。[SpaceX 的 10‑Q](https://www.sec.gov/Archives/edgar/data/1181412/000162828026066880/spcx-20260930.htm)已披露評估程序的存在。新增細節是誰在談判；最終換股比例或對價尚未獲得核實。

**Robin為何在意 —** 你的假設是，馬斯克會傾向於讓 SpaceX 做收購方，因為他在那裡擁有更強的控制權。SunTV 可以把它變成讀者能夠計算、也可能證偽的命題，這比猜測 Tesla 的收購價更適合講成一個故事。

One Action｜Codex 出版任務：在[預定正篇地址](https://iamrobin.ai/ouroboros/202611/20261125/action_item/)建立《如果 SpaceX 收購 Tesla，誰會多一票？》。論點：收購方的名字不能決定誰增加控制權；決定因素是所發行股份的類別、數量和接收者。四部分主線：（1）區分申報事實與 FT 報道；（2）根據 [SpaceX 招股書](https://www.sec.gov/Archives/edgar/data/1181412/000162828026039276/spaceexplorationtechnologi.htm)與 [Tesla 委託投票文件](https://www.sec.gov/Archives/edgar/data/1318605/000110465926116718/tm2626016d2_ars.pdf)重建交易前的投票權；（3）固定假設對價，比較兩種股份類別情境下的經濟所有權和投票權，明確標示為示例；（4）發布註明日期的 SunTV 來源卡，保留讀者反例與更正。首個衍生內容：在 LinkedIn 發起投票，詢問在相同收購價下創辦人的控制權是否可能*下降*，並附上計算連結。

## 6. AI 基礎設施：一份光通訊合約讓成品模組與雷射二極體採用不同採購時間表

日期： 11 月 24 日。

**事實：** [Applied Optoelectronics](https://investors.ao-inc.com/2026-11-24-AOI-Announces-Multi-Year-Long-Term-Agreement-with-Tier-1-Hyperscale-Datacenter-Customer?asPDF=1)與一家既有超大規模資料中心客戶簽訂多年協議。最低承諾包括 **2027 年約 15 億美元的 800G 光收發模組**，以及 **2028–29 年間 7 億美元的雷射二極體**。這些是採購承諾，並非出貨或已確認收入。

**Robin為何在意 —** 成品光模組與其中的光源，未必具有相同的利潤率。按不同時間表採購它們，為 Token Factory 提出了一個工程與資本配置問題：誰獲得整合價值，誰先為產能與製造良率投入資金？協議沒有解決這個問題。

**One Action：** 為 Token Factory 模型加入模組與雷射的逐年收入橋，並用首次披露的實際出貨及毛利率檢驗它。

## 7. 後期私募市場：Peak Energy 擴大 B 輪，為電池交付籌資

日期： 11 月 24 日。

**事實：** [Peak Energy](https://www.prnewswire.com/news-releases/peak-energy-expands-series-b-total-financing-to-157-million-to-accelerate-manufacturing-amid-growing-customer-backlog-302949087.html)將其 [10 月由 GM Ventures 領投的 B 輪](https://peakenergy.com/news/latest/peak-raises-108-million-new-capital)擴大至 **1.32 億美元股權融資，加上滙豐 2,500 萬美元債務額度**。1.57 億美元是更新後的融資總額，並非額外融資。Peak 報告客戶協議金額超過 **25 億美元**，正為其沙加緬度 4 GWh 工廠的產能爬坡、資料中心試點及 2027 年開始的交付投入資金。協議金額不是收入；工廠產能不是產量。

**Robin為何在意 —** 被動冷卻鈉離子儲能必須證明製造良率、現場可用率及服務成本。製造在驗收前就會消耗現金；延誤會拉長這個週期。估值、優先權、債務定價、收入及可取得的投資份額均未披露。若交付能擴大規模，策略性收購是合理的可能退出路徑。

One Action｜WATCH：等待首個商業客戶披露已驗收 MWh 佔合約 MWh 的比例，再尋找次級市場投資機會。

## 8. 上市股票與生命科學：Cogent 獲批的依據，是腫瘤進展被延緩了多久

日期： 11 月 24 日。

**事實：** [FDA 批准](https://www.fda.gov/drugs/cancer-approvals/fda-approves-bezuclastinib-combination-sunitinib-advanced-gastrointestinal-stromal-tumors) bezuclastinib 聯合舒尼替尼，用於曾接受伊馬替尼治療的成人晚期胃腸道間質瘤患者。在一項 413 人隨機試驗中，中位無進展存活期為 **16.5 個月，單用舒尼替尼則為 9.2 個月**；風險比為 **0.50（95% CI 0.39–0.65）**。總存活期資料尚未成熟。從 11 月 23 日至 24 日的調整後收盤價看，[COGT](https://stockanalysis.com/stocks/cogt/history/)由 **28.11 美元升至 33.01 美元（+17.43%）**，相對地，[QQQ](https://stockanalysis.com/etf/qqq/history/)由 **651.03 美元降至 638.10 美元（−1.99%）**，兩者相差 **19.42 個百分點**。

**Robin為何在意 —** 這是與有效治療相比的臨床終點，批准也改變了商業准入。走勢分歧背後有公司特定的基本面事件。中位數差距不代表患者多活了 7.3 個月，現有證據也不足以把成功歸功於 AI。

**One Action：** 追蹤 PEAK 成熟的總存活期資料，包括進展後獲准交叉用藥如何影響解讀。
