---
title: "NVIDIA掌握芯片周圍的一切"
date: 2026-09-01
updated: 2026-09-01
section: Ouroboros
series: Daily Action Item
tags:
  - Artificial Intelligence
  - Semiconductors
  - NVIDIA
  - MediaTek
keywords:
  - NVIDIA NVLink Fusion
  - MediaTek custom XPU
  - heterogeneous AI infrastructure
  - NVHBM
  - AI system control layer
categories:
  - Artificial Intelligence
  - Semiconductors
  - Investing
excerpt: "定製芯片可以奪回計算核心，NVIDIA仍可通過互連、內存、網絡、機架驗證、軟件與資本保留價值。"
hero: /action-item/20260901/hero.webp
ogImage: /action-item/20260901/og.webp
canonical: "https://iamrobin.ai/ouroboros/202609/20260901/action_item/zh-hant/"
author: https://iamrobin.ai/#person
inLanguage: zh-Hant
languageSlug: zh-hant
translationOf: "https://iamrobin.ai/ouroboros/202609/20260901/action_item/"
draft: false
sourceAction: "Daily Briefing 2026-09-01, item 5"
ledgerId: NVDA-MTK-20260901
translationReview: PASS
---

## 結論是系統控制權

**結論很直接：定製芯片可以奪回計算核心，NVIDIA仍能從周圍的整套系統中賺錢。** NVIDIA向MediaTek投資35億美元，MediaTek採用NVLink Fusion，把競爭威脅轉成平臺策略。雲廠商可以設計自己的XPU，同時繼續使用NVIDIA的互連、內存架構、網絡、封裝支持、機架驗證與運維軟件。GPU單位份額可能下降，NVIDIA在整座AI工廠中的經濟捕獲仍可能可觀。

OpenAI的Jalapeño已經說明，專用推理芯片可以在特定負載上勝過通用平臺。[8月29日的分析](https://iamrobin.ai/ouroboros/202608/20260829/action_item/)因此把“不可分割的護城河”改成“分層護城河”：計算核心變得可競爭，訓練、靈活負載與周邊系統更難被替代。

[NVIDIA與MediaTek宣佈](https://nvidianews.nvidia.com/news/nvidia-and-mediatek-deepen-long-standing-partnership-to-build-ai-edge-to-cloud-computing-platforms)，MediaTek將為雲廠商與前沿實驗室的定製XPU採用NVLink Fusion；NVIDIA同時認購35億美元MediaTek可轉債。[MediaTek的公告](https://www.mediatek.com/press-room/nvidia-and-mediatek-deepen-long-standing-partnership-to-build-ai-edge-to-cloud-computing-platforms)把合作範圍擴展到芯片、封裝、內存、連接與機架級系統。[Reuters報道](https://www.reuters.com/world/asia-pacific/nvidia-invests-35-billion-mediatek-convertible-bonds-2026-08-31/)，NVIDIA認購了MediaTek總額39億美元海外可轉債中的大部分，Alphabet也以未披露金額參與。

當前判斷是 `WATCH — COMPUTE_CORE_CONTESTABLE / CONTROL_LAYER_EXPANDING`。客戶規模、附著收入、毛利與長期定價權仍是 `UNKNOWN`。行動不是追逐公告，而是把NVIDIA估值拆成計算、互連、內存、網絡、軟件與資本六層，按每個已部署機架的經濟捕獲重新核算。

## 定製芯片改變議價邊界

超大規模客戶開發定製加速器，是因為規模讓專用化變得經濟。穩定負載允許客戶刪除不需要的靈活性，把算術與內存路徑貼合自己的模型，並形成內部參考成本。AWS有Trainium與Inferentia，Google有TPU，OpenAI有Jalapeño。每條路線都減少了對單一商用芯片供應商的絕對依賴。

定製芯片無需拿到多數負載就能改變談判。擁有內部成本曲線的買家可以更強硬地談剩餘採購，把通用GPU留給快速變化與前沿工作，把可預測任務送往專用機器。每一代自研芯片還會積累設計、編譯器與運維數據，為下一代降低門檻。

競爭邊界因此移動。NVIDIA不必讓每一次矩陣運算都發生在NVIDIA GPU上；它需要讓客戶在足夠多的系統層繼續依賴NVIDIA，使整套系統仍產生收入與切換成本。

一項定製XPU計劃仍需要高帶寬內存、縱向互連、橫向網絡、主機處理器、封裝、供電、液冷、固件、編排、遙測與驗證。客戶可以逐層自建或採購，但每增加一個接口，集成勞動與失效風險都會增加。NVIDIA出售的，是從一張新芯片圖紙走到穩定生產集群的最短可靠路徑。

所以投資問題要從“多少加速器是NVIDIA GPU”擴展為“AI工廠中多少經濟價值仍經過NVIDIA”。兩者都重要，也可能向相反方向變化。

## NVLink Fusion包圍XPU

[NVIDIA把NVLink Fusion描述為](https://www.nvidia.com/en-us/data-center/nvlink-fusion/)連接第三方XPU與NVIDIA平臺的半定製架構。其組件顯示了NVIDIA希望掌握的控制面。

**NVLink縱向互連**讓緊密耦合域中的多顆加速器協同。NVIDIA稱NVLink 6可為每顆XPU提供3.6TB/s雙向帶寬，並把72顆XPU組成一個域；更大的配置仍屬於路線圖。數字在第三方生產驗證前都屬於廠商披露，戰略意圖卻很清楚：客戶擁有計算核心，NVIDIA提供讓許多核心組成一臺系統的互連。

**NVLink-C2C**連接封裝或模塊內的芯粒。定製加速器可以通過一致、高帶寬接口連接NVIDIA CPU或其他芯粒，接口也會影響封裝、數據移動與後續路線圖。

**NVHBM**把控制面延伸到內存。NVIDIA為高帶寬內存提供定製base die與控制器，希望提升帶寬、降低功耗並節省XPU晶粒面積。AWS Annapurna Labs被列為首個合作方。AI系統常被內存約束；即使算術引擎屬於客戶，掌握內存路徑的一部分仍可保留價值。

**網絡、DPU、MGX機架與驗證**覆蓋縱向互連之外。Spectrum-X、ConnectX與BlueField連接不同機架，MGX提供共同的供電、冷卻、網絡與管理。預驗證設計若能縮短調試並減少故障，就擊中了真實瓶頸：一顆能工作的芯片距離一座能工作的數據中心仍很遠。

| 層級 | 客戶可以擁有 | NVIDIA希望保留 |
|---|---|---|
| 計算 | 定製XPU架構 | 可選GPU與CPU |
| 封裝 | 加速器與芯粒 | NVLink-C2C接口 |
| 內存 | 負載專用設計 | NVHBM控制器與架構 |
| 縱向互連 | 計算拓撲 | NVLink fabric與交換機 |
| 橫向網絡 | 數據中心網絡 | Spectrum-X、ConnectX、BlueField |
| 機架 | 部署選擇 | MGX、冷卻、供電與驗證 |
| 運維 | 調度器 | Mission Control、遙測與軟件 |

護城河變得模塊化。客戶可以替換一層，無需替換整個平臺。

## MediaTek是異構計算的橋樑

MediaTek帶來芯片設計、封裝、製造與跨設備、汽車、數據中心的客戶關係。NVLink Fusion需要能把客戶需求變成真實芯片的夥伴。NVIDIA提供接口與系統架構，MediaTek幫助設計並交付定製XPU。

35億美元可轉債投資既對齊激勵，也提供資本，同時形成資本回旋問題：NVIDIA資助夥伴，夥伴開發採用NVIDIA控制層的系統，客戶部署系統，新增需求再支持NVIDIA平臺收入與夥伴估值。結構有戰略邏輯，卻不等於經濟成功。

它與[8月20日Google與Marvell分析](https://iamrobin.ai/ouroboros/202608/20260820/action_item/)中的模式相似。資本可以加速供應鏈、鎖定設計能力與加深技術協作；若把被資助的生態活動當成獨立需求驗證，也會掩蓋真實需求。賬本必須把債券投資、夥伴交付、客戶現金與NVIDIA附著收入分開。

三個檢驗可以保持誠實：識別無需未披露補貼也選擇MediaTek與NVLink Fusion的客戶；比較流片、量產、良率與機架調試時間；把NVIDIA的互連、網絡、內存和軟件收入與投入生態的資本對賬。Alphabet參與已獲報道確認，但金額與戰略條款未披露，經濟意義保持 `UNKNOWN`。

## Trainium與Jalapeño顯示市場形態

[AWS將Trainium描述為](https://aws.amazon.com/ai/machine-learning/trainium/)用於生成式AI訓練與推理的自研芯片。AWS控制負載、雲分發、軟件、網絡與採購，足以承擔多代芯片計劃。NVIDIA的現實回應不是要求AWS放棄自研，而是爭取周邊層，以及仍重視靈活性與生態的工作負載。

Jalapeño從模型公司方向證明同一邏輯。專用推理引擎可以圍繞已知模型、延遲目標與服務行為優化。生產規模、可靠性、良率與完整成本仍未披露，但技術方向可信。NVIDIA的系統策略接受這一方向，並試圖把自己的接口接到下一顆定製芯片上。

異構市場因此成為基準情景：前沿訓練與快速變化研究繼續偏好通用系統；穩定大規模負載在節省超過設計與運維成本時遷往定製XPU；雲廠商運行混合集群；NVIDIA同時以計算供應商和外部計算的共同系統層競爭。

異構性提高標準與互操作性的價值，也給開放fabric和競爭對手留下入口。只有當客戶認為NVIDIA的集成收益高於替代方案的自由與價格時，NVLink Fusion才會獲勝。公告只是市場路徑，不是標準已經勝出。

## 資本能加速採用也能掩蓋需求

產品戰略與投資戰略必須分開承保。資本可以縮短夥伴開發週期、預留工程資源、讓客戶相信生態會持續。可轉債與直接購買普通股的風險結構不同，完整轉換條款仍需發行文件確認。

資本也製造反身性：NVIDIA估值上升擴大融資能力，融資擴大生態，生態活動強化需求預期，預期又可能支持估值。只有當獨立客戶為有用系統付款、現金流超過用來創造生態的資本時，循環才健康。

若被資助夥伴互相採購卻沒有獨立終端需求，若部署公告替代已投產系統，或同一預期收入出現在多家公司敘事中，循環會變脆弱。證據鏈必須按順序建立：投資已經確認，定製XPU路徑已經確認；客戶訂單、運行機架、附著收入和實現回報仍為未知。

## 六個指標決定護城河是否移動

第一，**第三方XPU部署**：統計客戶設計、流片、量產機架與驗收站點。夥伴公告只證明方向一致。

第二，**附著率**：統計外部XPU採用NVLink、NVHBM、網絡、CPU、DPU、機架和軟件的比例。逐層份額比單一綜合份額更有用。

第三，**每機架經濟捕獲**：估算定製XPU機架為NVIDIA帶來的收入與毛利，並與GPU機架比較。收入較低但資本強度也低仍可能有吸引力；收入與毛利同時大幅下滑，則說明控制層無法補償計算核心。

第四，**部署優勢**：記錄從設計凍結、流片、交付、調試到穩定利用率所需時間。預驗證應降低集成勞動、故障率與延誤，必須由客戶數據證實。

第五，**客戶獨立性**：跟蹤開放互連、替代網絡、自研內存控制器與軟件可移植性。存在可用替代品後客戶仍重複選擇，才是強控制層。

第六，**資本效率**：把夥伴融資與附著收入、投資收益、現金回收和信用風險對賬。戰略資本應產生長期經濟捕獲，而不只是更大的公告管線。

| 指標 | 當前證據 | 升級觸發 | 反證 |
|---|---|---|---|
| XPU部署 | MediaTek路徑已公告 | 具名量產客戶與機架 | 一再延期或只停留樣機 |
| 附著率 | 架構已披露 | 分層出貨量 | 客戶避開NVIDIA各層 |
| 每機架捕獲 | `UNKNOWN` | 收入與毛利披露 | 離開GPU後價值嚴重流失 |
| 部署優勢 | 廠商聲稱預驗證 | 調試時間實測改善 | 無成本、時間或可靠性收益 |
| 客戶獨立性 | 替代方案存在 | 自願重複採用 | 鎖定促使客戶遷離 |
| 資本效率 | 已投入35億美元 | 現金回報與附著收入 | 資助活動缺少終端需求 |

## 倉位紀律跟隨控制層證據

NVIDIA投資論點現在需要兩張記分表。計算表跟蹤GPU負載份額、價格、訓練需求、推理組合與路線圖表現；控制層表跟蹤NVLink Fusion部署、NVHBM採用、網絡附著、機架驗證、軟件使用與第三方XPU的經濟捕獲。

這樣可以避開兩個錯誤：把每顆定製芯片都當作NVIDIA整機損失；把每份NVIDIA接口公告都當作永久護城河。定製硅可以擴張，NVIDIA也可以保留大量價值；開放標準也可能削弱控制層。

倉位上，保留對前沿系統的當前強度，同時下調對“不可分割推理壟斷”的信心。只有外部XPU規模出貨、且NVIDIA披露有意義的附著經濟時，才升級系統控制論點。若大客戶以非NVIDIA內存、互連、網絡與編排運行自研計算，或系統收入無法補償GPU份額壓力，則降級。

Robin的行動很具體：在現有計算表旁增加季度控制層表；記錄已確認量產，不記錄公告容量；資本交易與客戶需求分開；提高終值前，必須建立從定製XPU到NVIDIA現金流的橋。

芯片仍重要，機架決定芯片能否有用。NVIDIA對定製芯片的回答，是掌握從芯片到服務的更多路徑。投資問題是：當客戶擁有中心之後，是否仍願意為這條路徑付款。

## 分類與關鍵詞

**分類：** 人工智能、半導體、投資

**關鍵詞：** NVIDIA NVLink Fusion、MediaTek定製XPU、NVHBM、NVLink-C2C、AWS Trainium、OpenAI Jalapeño、異構AI基礎設施、AI機架經濟、NVIDIA系統護城河、資本回旋

**Hashtags:** #AIInfrastructure #Semiconductors #NVIDIA #MediaTek #CustomSilicon
