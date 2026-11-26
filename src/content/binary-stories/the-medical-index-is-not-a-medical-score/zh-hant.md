---
title: "醫學索引不是醫學分數"
storySlug: "the-medical-index-is-not-a-medical-score"
date: "2026-11-26"
updated: "2026-11-26"
lane: "BUILD"
excerpt: "專用醫學搜尋索引改變模型從哪裡查找資料，卻不能證明答案忠實保留了原始來源；讓審核模型再次搜尋，又會改變實驗本身。"
hero: "/binary-stories/the-medical-index-is-not-a-medical-score/hero.webp"
ogImage: "/binary-stories/the-medical-index-is-not-a-medical-score/og.webp"
keywords: ["OpenAI 醫療模型", "醫學搜尋索引", "模型評估", "來源核驗", "Sol", "Astra"]
canonical: "https://iamrobin.ai/binary/stories/the-medical-index-is-not-a-medical-score/zh-hant/"
inLanguage: "zh-Hant"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202611/20261126/special/"
sourceArtifactSha256: "2d902554f6fb6412df0cfa65ed01e8a057f44bcb6eb60d4b94e58271798fd814"
carouselPdf: "/carousels/the-medical-index-is-not-a-medical-score.pdf"
carouselCaption: "/carousels/the-medical-index-is-not-a-medical-score.txt"
carouselPages: 7
draft: false
---

模型技術棧裡，打開了一扇寫著 **醫學** 的門。

OpenAI 於 2026 年 11 月 24 日為 Responses API 發布了四種醫療模型配置。OpenAI 表示，這些配置使用網頁搜尋時，會在專用醫學來源索引中搜尋。

這是一項真實的產品變化，卻不是準確率分數。

醫學索引可以改變系統優先搜尋的書架。它不能證明模型選對了論文、保留了研究人群、把不確定性帶入答案，或在來源不支持某項說法時拒絕作答。

標籤告訴我們閱讀可能從哪裡開始。分數必須在閱讀之後取得。

## 書架只是第一層

想像一個臨床問題來到圖書館。

第一層選擇目錄。一般搜尋可能檢索整棟樓；醫療配置使用網頁搜尋時，從醫學目錄開始。

第二層提取文獻。即使是專業目錄，也可能返回舊版指南、二手摘要、不符合目標人群的研究，或幾篇結論相互衝突的論文。

第三層撰寫答案。模型必須保留干預、對照、結局、時間範圍、亞組和重要限定。引用本身正確，如果旁邊的說法比來源更寬，仍然不匹配。

第四層把答案逐項與原始來源核對。只有到了這裡，一項實質性主張才能被計為「來源核驗正確」。

![醫學搜尋索引依次連接資料提取、答案生成與來源核驗。每項實質性主張與原始來源完成核對前，記分卡仍應保持空白。](/binary-stories/the-medical-index-is-not-a-medical-score/hero.webp)

這些層相互連接，卻不能互相替代。檢索品質更好，答案仍可能遺失限定條件；更強的模型也可能在不完整的資料包上認真推理；審核者可能發現錯誤，也可能只是贊同錯誤。

專用索引是鏈條的輸入，不是鏈條的結果。

## 第二次搜尋會同時改變兩個變數

最誘人的流程很簡單：先讓 GPT-6.2 Sol healthcare 搜尋並起草，再讓 GPT-6.2 Astra healthcare 審核。

但如果 Astra 再搜一次，會發生什麼？

比較不再只測試「更強的第二位讀者能否改善答案」。它還給了審核者第二次檢索機會。如果最終答案變好，原因可能是審核更好、來源更好，或兩者兼有。

這並不是禁止第二次搜尋的理由，而是應該明確區分兩項實驗的理由。

在 **僅審核組** 中，Sol 在「必須搜尋」的規則下生成來源包和草稿。Astra 獲得同一個問題、同一份來源包與同一套評分標準，但不能重新搜尋。這樣可以盡可能隔離第二位讀者本身的價值。

在 **審核加重新檢索組** 中，Astra 可以再次搜尋。每次額外搜尋調用和每份新增來源都要記錄。這個組測試更接近生產系統可能採用的組合流程。

兩組回答的問題不同：

- 審核者是否改善了對同一批證據的閱讀？
- 再給一次搜尋機會，是否改善了最終證據集與答案？

把兩者合成一條路線，標題會更整齊，解釋卻會更薄弱。

## 四倍 token 費率不等於四倍證據

按 2026 年 11 月 26 日觀察到的 Standard 短上下文費率，GPT-6.2 Sol healthcare 的每百萬輸入 token 價格為 2 美元，輸出為 10 美元；GPT-6.2 Astra healthcare 分別為 8 美元和 40 美元。快取輸入價格同樣相差四倍：每百萬 token 0.10 美元與 0.40 美元。

託管網頁搜尋價格為每 1,000 次調用 10 美元，另按所選模型費率收取搜尋內容 token。十個問題每題搜尋一次，一條路線僅搜尋調用費就從 0.10 美元起步，尚未計入模型 token、重試和人工評估。

這段算術的作用，是不讓模型名稱代替經濟判斷。Astra 在上述類別的標價是 Sol 的四倍，但加入 Astra 的價值仍要等到其修正效果被測量後才能知道。

有用的分母不是「生成了多少答案」，而是 **經來源核驗的正確實質性主張數**。

每條路線都要保留全部生成的實質性主張。沒有來源支持的主張不能從錯誤率分母中消失。缺失限定條件、額外搜尋、輸入和輸出 token、延遲與審核時間都要記錄。

然後計算：

**工作流程總成本 ÷ 經來源核驗的正確實質性主張數**

這個比率不會給出臨床建議。它只告訴構建者：在同一項凍結測試中，額外閱讀步驟是否以合理成本換來了更多經過核驗的證據。

## 空白記分卡才是誠實的發布狀態

公開文件證實了這些配置、醫學搜尋索引和帶日期的價格圖。它沒有披露索引的完整構成與覆蓋範圍，沒有提供與一般網頁搜尋的受控比較，也沒有公布 Sol 與 Astra 之間實測的審核提升。

因此，發布時有四行誠實狀態：

1. **搜尋層：**已經改變。
2. **價格層：**可以測量。
3. **準確率提升：**未知。
4. **第二位讀者的價值：**未知。

這不是空洞的結論，而是產品架構與產品證據之間的清晰邊界。

醫學索引可以把系統帶進更合適的閱覽室。

只有凍結、盲評、逐項核對來源的比較，才能告訴我們它在那裡學到了什麼。

---

**資料：**OpenAI [API 更新日誌](https://developers.openai.com/api/docs/changelog)、[API 定價](https://developers.openai.com/api/docs/pricing)、[網頁搜尋指南](https://developers.openai.com/api/docs/guides/tools-web-search)、[評估最佳實踐](https://developers.openai.com/api/docs/guides/evaluation-best-practices)，以及經雜湊固定的[源 Special](https://iamrobin.ai/ouroboros/202611/20261126/special/)。價格與可用性截至 2026 年 11 月 26 日。雙組比較是一項擬議評估設計；本文沒有執行付費實驗、處理患者資料、提出臨床建議、更改 API 路線或發送外部訊息。
