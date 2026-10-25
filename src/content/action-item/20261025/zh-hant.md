---
title: "第一件原型必須回答一個問題"
date: 2026-10-25
updated: 2026-10-25
section: Ouroboros
series: Daily Action Item
categories:
  - Entrepreneurship
  - One Person Company
  - Prototyping
tags:
  - Prototype
  - Simulation
  - Product Evidence
  - AI Native Company
keywords:
  - question first prototype
  - prototype evidence ladder
  - simulation validation
  - one person company
  - SimReady
excerpt: "第一件原型的價值，是在最便宜且真實的證據階段解決一個重要未知。"
hero: /action-item/20261025/hero.webp
ogImage: /action-item/20261025/og.webp
canonical: "https://iamrobin.ai/ouroboros/202610/20261025/action_item/zh-hant/"
author: https://iamrobin.ai/#person
inLanguage: zh-Hant
languageSlug: zh-hant
translationOf: "https://iamrobin.ai/ouroboros/202610/20261025/action_item/"
translationReview: PASS
draft: false
sourceAction: "Daily Briefing 2026-10-25, item 5"
ledgerId: PROTOTYPE-QUESTION-20261025
visualHeadline: "一個原型，一個問題。"
visualSubhead: "影象 · CAD · 模擬 · 實體測試"
visualFooter: "先要證據，再要精緻"
visualNodes: "問題|最便宜測試|驗收|學習"
thesis: "第一件原型應在最便宜且真實的證據階段解決一個關鍵未知，並保留結果改變了什麼。"
---

一件漂亮的原型可能毫無用處。

它可以很上鏡，讓人點頭，卻完全沒有觸碰真正的問題：手能否握住它？它會不會受熱變形？機構會不會卡住？第一次看到的人能否理解用途？如果團隊從未先選定問題，幾乎任何精緻物件都能被解釋成進展。

第一件原型需要一個更小的任務：回答一個問題。

這不是限制創造力。問題會告訴你最少要做什麼、什麼算證據、什麼時候應該停下。

## 四種看起來相近、證據卻不同的物件

影象可以檢驗想法是否易懂，也可以比較比例、風格、顏色和第一眼傳達的故事。它幾乎不能說明重量、平衡、受熱、衝擊、製造公差或反覆使用。

CAD 可以檢驗幾何。零件在切割材料之前即可測量、裝配、檢查碰撞並反覆修改。[OpenUSD](https://openusd.org/release/index.html)還能讓幾何與裝配結構在不同工具之間保留。幾何本身仍不會自動產生有效的物理行為。

模擬可以檢驗一套明確寫出的現實模型。[SimReady Foundation](https://nvidia.github.io/simready-foundation/)為模擬資產定義配置與檢查。[NVIDIA 的 CAD-to-SimReady 示例](https://developer.nvidia.com/blog/5-steps-to-create-simready-assets-for-robotics-with-frontier-ai-models/)從 ABB YuMi 的 CAD 資產開始，補充外觀、碰撞幾何、關節、質量、摩擦、驅動與執行驗證，最後在 Isaac Sim 完成四輪抓取與放置。

這是真實而有限的證據：配置後的資產在那些模擬軌跡中表現合格。它沒有證明實體機器人已經制造，沒有證明摩擦引數適合所有現實表面，也沒有證明產品能承受無控制環境。[Isaac Sim 文件](https://docs.isaacsim.omniverse.nvidia.com/latest/index.html)把它定義為開發環境；模型始終帶著假設。

實體原型才會遇到世界：抓握、重量、變形、滲漏、溫度、反光、破裂、清潔、不適和意外。它提供螢幕無法給出的材料與人體證據，也更昂貴、更難修改。

這四類物件構成證據階梯。每上一層，都能回答下一層以下無法回答的問題；若關鍵未知本來屬於低一層，向上跳也會浪費錢。

## 先寫下可能殺死想法的句子

在選擇軟體或材料之前，先寫一句：

> 這件原型存在，是為了判斷 ______ 是否成立。

空格里應該是一項會改變下一步決策的未知。

“人們是否喜歡它”太寬鬆，任何反應都能被重新解釋。“第一次使用的人能否在沒有說明的情況下，於20秒內找到握持處並開啟物件”則更清楚：它寫出了人、行為、時間與協助邊界。

“玻璃是否可行”也太寬。玻璃可能與外觀、溫度、耐化學性、清潔、重量或破裂有關，每個問題需要不同試件與驗收。黏土模型可以回答形狀與抓握；軟材料模型可以暴露變形與舒適度；玻璃試件可以檢驗光學、熱、清潔或斷裂。若真正未知是形狀，先做玻璃成品只會變貴。

最便宜且真實的測試，是能夠改變決策的最低一層。

## 在動手之前寫好結果規則

若驗收規則預先寫下，原型就更難欺騙團隊。一份緊湊記錄只需六項：

1. 問題；
2. 能回答問題的最便宜證據階段；
3. 驗收結果與失敗條件；
4. 時間與成本上限；
5. 觀察，包括尷尬或負面證據；
6. 下一步：繼續、修改、換階段或停止。

規則不需要虛假精度。五人的抓握測試無法證明市場，卻可能清楚顯示沒有人知道如何拿起物件。模擬機構不能證明工廠可靠性，卻可能顯示兩個零件在所有預定路徑上都會碰撞。

負面結果必須留下。失敗的廉價模型可能省下一輪昂貴模具；加入真實物理後拒絕工作的模擬也產生了資訊。只有當團隊掩蓋失敗，並用同一假設繼續建造時，失敗才變成浪費。

## 讓 AI 壓縮迴圈，而不是抹掉證據邊界

AI 可以減少問題與測試之間的工作。在 NVIDIA 的例子中，GPT-6 Astra 幫助編寫呼叫 Omniverse 工具的 Python，流程仍需要原始檔、規範、物理配置、驗證與檢查。[CAD-to-SimReady skill](https://github.com/NVIDIA/skills/tree/main/skills/omniverse-cad-to-simready)組織了這些工作，卻沒有替人決定模擬能證明什麼。

這正是一人公司裡代理的合適角色：整理參考資料、產生變體、準備幾何、執行檢查、儲存失敗、起草下一次測試。所有者保留問題、驗收邊界與後續決策。

代理可以幾秒鐘生成圖片，也能快速做 CAD 草稿或配置模擬。這些提速是實際投入，結論仍受證據階段約束。

## 第一件原型是一件決策工具

第一版不必像成品。它可以是一張列印圖片、一塊紙板輪廓、一團黏土、一件軟材料模型、一套 CAD 裝配，或只有一條已驗證軌跡的模擬。價值來自它消除了哪項未知。

選一個問題，選擇最便宜且真實的階段，寫好驗收規則，記錄時間、成本、結果與失敗，再讓證據決定下一件原型是否值得存在。

精緻可以稍後到來。當第一件原型讓下一步更清楚時，它已經完成了任務。
