---
title: "客戶造出了更好的芯片"
date: 2026-08-29
updated: 2026-08-29
section: Ouroboros
series: Daily Action Item
tags:
  - Artificial Intelligence
  - Semiconductors
  - NVIDIA
  - OpenAI
keywords:
  - Jalapeño inference ASIC
  - NVIDIA inference moat
  - custom AI accelerators
  - inference economics
  - AI infrastructure capital
categories:
  - Artificial Intelligence
  - Semiconductors
  - Investing
excerpt: "OpenAI的Jalapeño證明定制推理芯片已經成為真實競爭層；NVIDIA的訓練平台、部署規模與整機經濟仍是決定投資判斷的關鍵。"
hero: /action-item/20260829/hero.webp
ogImage: /action-item/20260829/og.webp
canonical: "https://iamrobin.ai/ouroboros/202608/20260829/action_item/zh-hant/"
author: https://iamrobin.ai/#person
inLanguage: zh-Hant
languageSlug: zh-hant
translationOf: "https://iamrobin.ai/ouroboros/202608/20260829/action_item/"
draft: false
sourceAction: "Daily Briefing 2026-08-29, item 5"
ledgerId: AI-20260829-JALAPENO-INFERENCE-01
translationReview: PASS
---

## 結論是護城河已經分層

**結論很直接：OpenAI的Jalapeño證明定制推理芯片已是現實競爭層；NVIDIA仍擁有強大的訓練平台和巨大的部署領先。** 把這兩件事強行壓成“誰贏誰輸”，會製造錯誤投資判斷。大客戶可以繼續採購NVIDIA用於訓練和快速變化的前沿負載，同時把穩定推理遷移到自研芯片。NVIDIA收入可以繼續增長，長期推理份額與議價權也可以同步收窄。

[OpenAI首次公開結果](https://openai.com/index/jalapeno-first-results/)顯示，Jalapeño在GPT‑OSS 120B、DeepSeek R1 670B與Kimi K2.5 1T上，峰值吞吐時每瓦完成的AI工作比對比的GB200或GB300系統高1.5至1.9倍，端到端延遲低1.7至3.6倍。芯片封裝額定功率為700W，測試負載下持續實測功率不超過550W。OpenAI計劃在年底前將其部署到內部基礎設施，第二代正在開發，第三代已經成形。

這是有意義的工程證據，也是第一代、由發行方主導、圍繞OpenAI自身服務需求設計的系統證據。生產集群規模、可用率、良率、網絡與內存成本、軟件維護、覆蓋負載尚未披露。正確狀態是 `WATCH — VALIDATED_INFERENCE_CHALLENGER / NOT_YET_SCALED`。

Jalapeño立即改變一項前提：Blackwell不再等同於不可逾越的推理效率上限。另一項前提仍成立：通用加速計算、CUDA軟件、機架級網絡與快速迭代路線圖，讓NVIDIA平台的覆蓋面遠大於單顆專用芯片。

## 用整機口徑閱讀benchmark

標題數字比較每單位電力完成的有效AI工作，以及用戶實際感受到的延遲。這正是推理經濟應該採用的方向。採購者支付的是完成的請求、電力、冷卻、內存、網絡、軟件和可靠性，而不是紙面峰值算力。

OpenAI採用SemiAnalysis開發的公開InferenceX benchmark。[SemiAnalysis說明瞭其測試參與方式](https://newsletter.semianalysis.com/p/openai-jalapeno-better-than-nvidia)，[Tom's Hardware的技術審查](https://www.tomshardware.com/tech-industry/semiconductors/openai-says-its-jalapeno-chip-beats-nvidias-gb300-in-first-published-benchmarks)補充了比較邊界。三款公開模型覆蓋不同規模與服務特徵，測試也包含多個運行點。

證據必須分層。OpenAI發佈Jalapeño數據並選擇系統配置；SemiAnalysis提供benchmark方法並參與實驗室測試；NVIDIA沒有在這次披露中提交對比系統；Vera Rubin未進入測試；Jalapeño不能訓練；OpenAI內部前沿模型結果仍是公司陳述。

投資台賬應記錄三個層級：`CONFIRMED_PUBLIC_RESULT`用於公開InferenceX結果與封裝功率歸一化；`COMPANY_DISCLOSURE`用於OpenAI內部結果、部署計劃和多代路線圖；`UNKNOWN_PRODUCTION_ECONOMICS`用於集群規模、利用率、可靠性、良率、裝機成本、軟件人力和每個有效token的整機成本。

[MLCommons的MLPerf Inference v6.0](https://mlcommons.org/2026/04/mlperf-inference-v6-0-results/)提供另一組控制證據。它加入GPT‑OSS 120B並擴展DeepSeek-R1交互測試，共有24家機構提交。MLPerf與InferenceX用途不同，不能拼成一張虛構排名表。兩者共同說明：推理比較必須明確負載、延遲約束與系統邊界。

## 專用推理與通用訓練承擔不同工作

Jalapeño是推理ASIC。專用化可以刪去OpenAI穩定服務負載不需要的電路、靈活性和軟件路徑，換取更低功耗、更低延遲，以及圍繞既定模型、精度、內存、網絡和請求模式的整機優化。代價是適用面更窄，對負載變化更敏感。

NVIDIA出售的是平台。[NVIDIA Blackwell架構頁面](https://www.nvidia.com/en-gb/data-center/technologies/blackwell-architecture/)覆蓋GB200、GB300、DGX SuperPOD、HGX及企業系統，支持訓練、微調、科學計算、Physical AI、圖形與多種推理負載。CUDA、TensorRT、網絡、庫、編排與開發者生態共同構成平台價值。

模型結構快速變化、訓練規模巨大、客戶需要一套集群吸收多類負載時，這種廣度價值最高。超大客戶擁有龐大而穩定的請求流，並能把設計、編譯和運維成本分攤到數十億token上時，專用芯片的經濟性開始成立。

因此，前沿預訓練與快速變化研究仍偏向NVIDIA平台；穩定的大規模推理可以由定制ASIC爭奪；長尾企業推理仍依賴NVIDIA與雲分發；OpenAI原生產品最能發揮全棧協同。真實市場很可能長期異構。OpenAI可以同時是定制芯片建設者和NVIDIA最大的客戶之一。

## OpenAI只需遷移可預測負載

達到經濟門檻不需要全面替代。ChatGPT、Codex與Agent產品產生大量重復服務模式，其中一部分負載足夠穩定，可以圍繞模型族、上下文長度、精度、批處理和延遲目標優化。每遷移一個請求，都在邊際上減少外部加速器需求，並為仍留在NVIDIA上的負載建立內部參考價。

客戶由此獲得四種槓桿：把供應商報價與內部成本曲線比較；把稀缺GPU留給訓練和快速變化負載；協同設計模型、編譯器、內存、網絡與芯片；讓每一代自研芯片沈澱下一代所需的運行經驗。

規模決定這些優勢能否穿過會計報表。定制芯片包含一次性工程、掩膜、軟件、驗證、良率、庫存與運維成本。利用率下降或外圍系統更貴，芯片級優勢就會消失。OpenAI需要足夠穩定的token基數來攤薄這些成本。

公開合作說明共存才是基準情形。[OpenAI與Broadcom宣佈](https://www.broadcom.com/company/news/product-releases/63631)共同部署10GW OpenAI設計加速器與以太網系統，計劃2026年下半年開始上架、2029年底完成。[OpenAI與NVIDIA另行披露](https://openai.com/index/openai-nvidia-systems-partnership/)擬建設10GW NVIDIA系統，並從Vera Rubin開始。2026年2月，[OpenAI又說明](https://openai.com/index/scaling-ai-for-everyone/)計劃使用3GW NVIDIA專用推理與2GW Vera Rubin訓練容量。

這些是合作與計劃，不是已交付利用率。它們仍揭示組合策略：採購一切可信算力來源；在NVIDIA平台值得溢價的地方使用NVIDIA；在自身負載能產生經濟優勢的地方建設定制容量。

## 資本回旋最終變成議價權

關係形成一條迴路：NVIDIA資本與系統進入OpenAI；OpenAI獲得算力；算力產生前沿模型和產品需求；模型、編譯器與運行數據進入Jalapeño；更低的內部推理參考成本再回到NVIDIA供應談判。

這不意味著NVIDIA資助自身毀滅。NVIDIA的資本用於擴大AI需求並鎖定系統部署；OpenAI利用所有資源建設產品與基礎設施。當一個客戶擁有足夠負載和工程能力，自研芯片是理性結果。

關鍵變量是參考成本。如果Jalapeño每個有效token的可靠內部成本低於NVIDIA整機價格，OpenAI就能對仍在GPU上的負載提出更強價格要求。定制集群無需佔據多數份額，就能改變商業條款。可信的外部選項在改變總量之前，先改變談判。

NVIDIA可以用更快代際、更強軟件、一體化網絡、供應保障和更低客戶運維負擔回應，也可以讓客戶把自研全成本與即用平台比較。Vera Rubin重要，因為今天只比較到GB300。耐久的定制芯片論點必須經得起下一代NVIDIA系統。

## 五個變量決定投資判斷

第一是**實際部署芯片數**。OpenAI宣佈年底部署與多代路線圖，運行中的加速器、機架和站點數量仍是 `UNKNOWN`。計劃GW不能算作已運行容量。

第二是**負載份額**。按產品和模型記錄Jalapeño承擔的OpenAI推理比例。穩定Agent負載中的持續佔比增長能證明商業意義；狹窄內部試點只能證明技術能力。

第三是**整機TCO**。分母應是給定延遲和質量目標下，每次成功請求的成本。加速器、內存、網絡、主機、電力、冷卻、利用率、停機、軟件工程、模型轉換和庫存都要進入。OpenAI發佈的電力效率只是其中一項。

第四是**可靠性與量產學習**。跟蹤可用率、錯誤、良率、維修、利用率、部署節奏和代際改善。第二代、第三代能否按時複製循環，決定Jalapeño是一次芯片還是一套平台。

第五是**NVIDIA經濟性**。跟蹤數據中心收入、推理組合、毛利率、定價、供應承諾、HBM可得性與大客戶自研比例。客戶ASIC可以在總收入下降之前，先影響產品組合與毛利率。

當前可確認的只有公開benchmark、年底部署計劃與多代路線圖。工作負載份額、整機TCO、生產可靠性、NVIDIA毛利影響仍為 `UNKNOWN`。只有這些項目得到可比證據，投資評級才升級。

## 倉位紀律跟隨證據

對NVIDIA，近期需求邏輯依然強。OpenAI本身就預計大量部署NVIDIA推理與訓練系統。Jalapeño不等於GPU需求立即坍塌；它意味著長期估值模型應刪除“永久推理壟斷”假設。

對Broadcom，這一披露確認定制加速器和以太網系統已進入戰略核心。10GW仍是路線圖，實際收入、毛利、部署里程碑與客戶集中度仍需證據。

對OpenAI，Jalapeño是成本控制與談判資產。它的價值應通過產品延遲、容量、每次有效請求成本和連續迭代能力衡量，技術自豪感沒有獨立現金流科目。

倉位還必須分開份額與絕對增長。如果總推理市場擴張速度高於定制芯片搶份額速度，NVIDIA可以賣出更多系統、賺到更多美元，同時在最大客戶中的百分比下降。只用收入增長證明護城河，會漏掉這項變化；把每顆內部芯片都視為損失GPU收入，也會漏掉計算池擴張及NVIDIA在訓練、網絡和溢出容量中的作用。

實務上採用雙軸評分。第一軸衡量市場規模：推理容量、token需求與客戶支出。第二軸衡量NVIDIA經濟捕獲：負載份額、每單位有效工作價格、毛利率、軟件與網絡附著。市場強增長、捕獲下降是混合結果；市場強增長、捕獲穩定確認平台邏輯；市場變弱、捕獲下降才是真正危險情形。

benchmark改變長期假設，量產證據才改變倉位。Robin應把NVIDIA保留為護城河分層的強平台：訓練與快速變化的前沿負載仍是高確信層；穩定超大規模推理成為可競爭層。每季只更新五個變量，不把段子翻譯成交易。

客戶為一個明確工作造出了更好的芯片。這足以改變談判，遠不足以宣佈平台戰爭結束。

## 分類與關鍵詞

**分類：** 人工智能、半導體、投資

**關鍵詞：** Jalapeño推理ASIC、NVIDIA推理護城河、OpenAI定制芯片、AI加速器經濟、GB300、Vera Rubin、Broadcom、推理TCO、資本回旋

**Hashtags:** #AIInfrastructure #Semiconductors #NVIDIA #OpenAI #CustomSilicon
