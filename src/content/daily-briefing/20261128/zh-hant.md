---
title: "🏹 Robin 每日訊號簡報，2026年11月28日"
date: 2026-11-28
updated: 2026-11-28
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
excerpt: "八個訊號，覆蓋前沿模型、資本流動、支付軌道、公開市場、基礎設施、一級市場、Physical AI 與機器人。"
hero: /daily-briefing/20261128/hero.webp
ogImage: /daily-briefing/20261128/og.webp
canonical: "https://iamrobin.ai/ouroboros/202611/20261128/zh-hant/"
author: https://iamrobin.ai/#person
inLanguage: zh-Hant
languageSlug: zh-hant
translationReview: PASS
translationOf: "https://iamrobin.ai/ouroboros/202611/20261128/"
draft: false
sourceMode: autonomous_research
fallbackReason: "NONE_FALLBACK_DEADLINE"
---

**今天最值得看的實驗，是一筆補貼即將消失。** OKX 允許已報名使用者用某些股票代幣作借款抵押，同時分享 USDT 獎勵。香港時間今晨 07:59，活動按條款結束。補貼存在時，持倉說明有人願意拿獎勵；補貼消失後仍有人借款，才更能說明這種抵押品有用。

## 1. 前沿模型與一人公司：GLM-5.4 能看圖寫程式碼，RobinOS 更該測它能不能自己返工

日期： 11 月 23 日。

**事實：** 智譜釋出 GLM-5.4，將視覺輸入與程式設計結合，展示了用 FreeCAD 建立六軸機械臂的案例。釋出時已開放 Coding Plan、ZCode 和聊天入口；[官方公告](https://z.ai/blog/glm-5.4?lang=en)把通用 API 和開放權重列為後續事項，未給出可用於核算生產成本的 API 單價。案例證明它生成過設計，不證明它能無人值守地修好失敗設計。

**Robin為何在意：** 現有訂閱使用者先得到的是一個能看見自己工作結果的候選執行者。對 RobinOS，真正可能省掉的是你截圖、指出錯誤、再催它改的那一輪；依賴通用 API 的工作流還不能按演示效果直接切換。

**One Action：** 取同一個帶有已知佈局錯誤的頁面，讓 GLM-5.4 與現用 Codex 各自讀截圖、修復並複驗；以無需 Robin 提示且透過相同驗收的修復數，決定是否給它分配任務。

## 2. 實體 AI：灣區的 Lucid 無人車撤走了車內安全員，尚未開始收費載客

日期： 11 月 24 日。

**事實：** [Nuro、Lucid 與 Uber](https://www.nuro.ai/blog/nuro-lucid-uber-begin-driverless-testing-on-public-roads)在灣區四座城市啟動無車內安全員的道路測試。Lucid 已為這一階段交付超過 **100 輛**汽車；員工乘車是下一步，向公眾開放仍是 **2027 年第一季度目標**。中國的對照更進一步：[小馬智行與豐田](https://ir.pony.ai/node/8791/pdf)已於 11 月 16 日啟動 bZ4X 無人商業服務。

**Robin為何在意：** 美國這個專案跨過了撤走車內安全員的門檻，中國這個專案跨過了收費服務的門檻。兩者都沒有給出可比的單均成本。Uber 的分發優勢是否值錢，最終取決於一輛車能獨立完成多少付費訂單。

**One Action：** 把 Uber 專案的下一道驗證門檻定為每輛上線車每天完成的無人付費行程數，不用採購承諾代替。

## 3. 加密資金流：兩大穩定幣一個月少了 103.4 億美元，Arc 上的 USDC 卻增加了

日期： 截至 11 月 27 日的 30 天。

**事實：** 按 [Castle 對 DefiLlama 資料的整理](https://castlelabs.io/research/stablecoins)，USDT 淨髮行 **−82.2 億美元**，USDC **−21.2 億美元**；同一口徑下，Arc 上的 USDC 卻增加 **6.879 億美元**。另一個容易誤讀的數字是週五 BTC ETF 的“0.0”：核對 [Farside 原表](https://farside.co.uk/bitcoin-etf-flow-all-data/)時，基金分項仍是橫線，不能據此宣佈贖回停止。

**Robin為何在意：** 行業內最主要的兩種鏈上美元在收縮，同時餘額正向部分網路集中。Arc 值得跟蹤，但供給增加既可能是資金遷移或庫存，也可能是結算需求；它本身不證明交易更活躍。

**One Action：** 在下一期 30 日讀數里，將 Arc 的 USDC 增量與剔除鑄造、銷燬、跨鏈搬遷及明顯自轉後的重複付款地址數對照；兩者同升才上調支付需求判斷。

## 4. 可程式設計金融：同一份股票代幣，既能抵押借款，還能領平臺補貼

日期： 11 月 28 日 07:59 香港時間，活動截止。

**事實：** [OKX 條款](https://www.okx.com/help/okx-hold-to-earn-hold-select-tokenised-stocks-to-share-400000-usdt)把 xSPCX、xQQQ 等十種代幣列入 **40 萬 USDT** 獎池，且彈性借貸抵押賬戶裡的合資格餘額也可計入。舉例說，已提前報名的人可以拿 xSPCX 作抵押，同時憑持倉分獎勵；當日資格按隨機快照中的**最低合計持倉**計算。獎勵是平臺補貼，不是 SpaceX 股息，也不是普通 SPCX 股票持有人自動獲得的空投。

**Robin為何在意：** 有意思的是平臺能為“把資產留下來”單獨定價。樂觀解釋是它幫新抵押品度過冷啟動；另一種解釋是餘額只是被臨時買來的。實際參與人數、借款額和留存尚未核實。

**One Action：** 看獎勵結束七天後，合資格股票代幣的抵押借款餘額還剩多少；若平臺不披露，就把留存記為未知，不拿成交量代替。

## 5. SunTV 編輯臺：一個叫 Neon 的賬號參賽了，誰證明它賺了錢？

日期： 11 月 27 日。

**事實：** [make.fun 的公開參賽檔案](https://make.fun/u/neon-autonomous)列出了 `@neon-autonomous` 當日提交的文字差分和 PNG 壓縮作品，也保留了此前的模擬交易參賽記錄。頁面能證明這個賬號提交了作品；它不能單獨證明 Google 運營該賬號、模型開發了平臺、全程無人介入，或參賽者取得了扣除成本後的現金利潤。

**Robin為何在意：** 你發現的報道切口比“這是不是廣告”更強：即使帖子完全屬實，**參賽、獲獎、收款、盈利仍是四件事**。這很適合 SunTV 做成讀者能親自複核的短調查。

**One Action：** 新建 The Agent Entered the Contest. Who Got Paid?／《智慧體參賽了，錢付給了誰？》，擬定[英文主頁面](https://iamrobin.ai/ouroboros/202611/20261128/action_item/)。論點： 只有把作品、歸屬、實際到賬和執行成本連起來，才能從“參賽”推到“賺錢”。證據線： ① 復原一條 11 月 27 日參賽記錄；② 分開平臺、賬號、模型與運營者；③ 對照比賽規則、結果、付款憑據及成本，查不到的留白；④ 以一項獲准公開的 Alpha Lab 失敗實驗作反例。主來源： [參賽賬號及所連結的單場賽事](https://make.fun/u/neon-autonomous)、Robin 的原始實驗日誌、[SunTV 既有證據標準](https://iamrobin.ai/ouroboros/202610/20261026/special/)。首個衍生內容： LinkedIn 發一張“這張截圖最多證明哪一步？”證據卡；把讀者提交的最強反證按日期補回主文。

## 6. AI 基建：日本最大電力公司想把算力客戶帶到電廠旁邊

日期： 11 月 27 日，日本。

**事實：** 據[路透引述日經對 JERA 董事長的採訪](https://www.reuters.com/world/asia-pacific/japans-jera-enters-talks-with-anthropic-meta-build-data-centres-nikkei-reports-2026-11-26/)，JERA 正與 Anthropic、Meta 等討論在東京圈電廠附近建設資料中心。與 10 月 1 日 [JERA、Dell、RHAELM 的千葉諒解備忘錄](https://www.jera.co.jp/en/news/information/20261001_2535)相比，新資訊是潛在客戶範圍擴大；沒有披露這些客戶簽了容量合同、承諾付款或確定送電日。

**Robin為何在意：** 靠近發電機可能縮短供電路徑，卻不自動取得全天候可用的電力。對你的 Texas 100 MW 研究和美國基建戰略崗位，真正有價值的是能說清：電廠檢修時誰補電、按什麼價格、誰承擔停機。

**One Action：** 給 Texas 100 MW 案例補一個“主機組檢修一週”的情景，算出有無備用電源時每個可交付 GPU 小時的成本差。

## 7. 後期私募：Netskrt 的投資問題，藏在兩場比賽之間

日期： 11 月 24 日。

**事實：** 內容分發商 [Netskrt 的 B 輪首關](https://www.netskrt.io/blog/netskrt-secures-10-million-series-b-funding)到賬 **1,000 萬美元**，整輪目標最高 **3,000 萬美元**。參與者有 Yaletown、Crédit Mutuel Equity 和加拿大出口發展局；未單列領投方，估值、收入和優先條款未披露。公司稱今年已分發逾 **550 場**體育直播，資金用於擴張靠近使用者的網路節點；未核實 Robin 可認購的份額。

**Robin為何在意：** SunTV 知道直播卡頓的代價，資本配置者還要問：終場哨後，伺服器由誰付錢？裝置與容量需要投入，賽事尖峰不等於全年利用率。被電信商或大型分發平臺收購是可能的退出路徑，不是已知交易。

**One Action：** 等一份同一節點在賽事日與非賽事日的毛利貢獻對照，再決定這究竟是能複用的分發網路，還是昂貴的峰值保險。

## 8. 上市公司：黃仁勳復任後，英偉達仍跑輸黑五反彈

日期： 11 月 27 日美股提前收盤。

**事實：** 從 11 月 25 日至 27 日復權收盤，[NVDA](https://stockanalysis.com/stocks/nvda/history/) 從 **149.30** 升至 **150.49 美元（+0.80%）**，[QQQ](https://stockanalysis.com/etf/qqq/history/) 從 **633.93** 升至 **650.99 美元（+2.69%）**；英偉達落後 **1.89 個百分點**。公司於 [11 月 23 日公告](https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Board-Reinstates-Jensen-Huang-as-President-CEO-and-Board-Director/)黃仁勳恢復 CEO 和董事職務。

**Robin為何在意：** 公司特有的變化是領導層重新確定。週五科技股普漲，而 NVDA 相對落後；一天的價差既不能證明客戶削單，也不能證明整個板塊只是折現率變化。把治理判斷與 GPU 需求預測分開，才不會對同一條訊息改兩次估值。

**One Action：** 下一次調整 NVDA 盈利預測前，先查公司是否改變資料中心收入指引；若只變了治理判斷，就只調整風險假設。

---
