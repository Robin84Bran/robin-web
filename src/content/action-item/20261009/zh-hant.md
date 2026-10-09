---
title: "AI 同事必須經得住一次撤權"
date: 2026-10-09
updated: 2026-10-09
section: Ouroboros
series: Daily Action Item
categories:
  - Agentic AI
  - Operating Systems
tags:
  - AI Agents
  - Recovery
keywords:
  - agent autonomy
  - permission revocation
  - recovery testing
excerpt: "只有在失去權限後安全恢復並交付合格結果，AI 同事才算走向自治。"
hero: /action-item/20261009/hero.webp
ogImage: /action-item/20261009/og.webp
canonical: "https://iamrobin.ai/ouroboros/202610/20261009/action_item/zh-hant/"
author: https://iamrobin.ai/#person
inLanguage: zh-Hant
languageSlug: zh-hant
translationOf: "https://iamrobin.ai/ouroboros/202610/20261009/action_item/"
translationReview: PASS
draft: false
sourceAction: "Daily Briefing 2026-10-09, item 5"
ledgerId: REVOCATION-TEST-20261009
visualHeadline: "拿走一把鑰匙。"
visualSubhead: "撤權 / 恢復 / 驗證 / 驗收"
visualFooter: "測試自治"
visualNodes: "撤權|恢復|驗證|驗收"
---

結論很直接：AI 同事只有在失去權限後仍能安全恢復，並交付合格結果，才算接近自治。運行兩天只是在線時長，寫出漂亮報告只是輸出；它們都沒有回答權限被撤銷、連接器中斷或首選模型不可用之後會發生甚麼。

Google 新發布的 Gemini agent 讓問題變得具體。Google 稱任務可在雲端持續數小時或數日，臨時子代理可擁有獨立身分，長期 coworker agent 可擁有自己的電郵、儲存與受限權限。平台亦提供稽核、沙盒與 Agent Gateway。這些是重要運行原語，卻沒有公開無人介入完成率、故障恢復率或每項合格成果成本。[Google Cloud](https://cloud.google.com/blog/products/ai-machine-learning/welcome-to-gemini-at-work-2026)

OpenAI Agents API 從另一側畫出同一邊界：session 保留狀態，環境可託管或自建，子代理可分工，日誌可查看工具活動。FAQ 明確提醒，turn 完成不等於每項工具成功，idle session 亦不證明任務完成。[OpenAI Agents API](https://developers.openai.com/api/docs/guides/agents-api/overview) [OpenAI Agents API FAQ](https://help.openai.com/en/articles/20001551-agents-api-beta-faq)

本文提供撤權測試方案。RobinOS 尚未執行實驗。協議狀態為 READY；恢復、品質、成本與自治結果仍是 UNKNOWN。

## 在線時長是最討喜的指標

儀表板可顯示代理運行48小時、處理300個事件、生成19個檔案。數字證明活動發生過，卻不證明成果完成、工具全部成功，或關鍵環節沒有由人悄悄修復。

跨系統任務尤其容易製造假象。一個連接器失敗便可能留下貌似完整的半成品；重試可能製造重複；過期憑證可能把代理引向權限更大的備用路線。程序繼續運行，權限與證據邊界卻已改變。

應衡量合格成果：先定義交付物、事實與安全檢查、目的地回讀，再把人工救援、權限改動、重複呼叫與廢棄產物全部計入。

## 獨立身分讓失敗有據可查

沒有獨立身分的代理常借用人的帳戶。稽核紀錄看起來像 Robin 打開檔案、修改文件或觸發流程；撤銷代理可能迫使團隊停用人的帳戶或輪換共用憑證。

Google 的 coworker-agent 設計更清楚：每個長期代理可有獨立身分，只存取團隊分享的內容；公告亦描述加密證明身分、角色權限與歸屬代理的稽核紀錄。[Google Cloud](https://cloud.google.com/blog/products/ai-machine-learning/welcome-to-gemini-at-work-2026)

身分不會讓代理自動可信，卻會讓權限可讀。RobinOS 應為長期 worker 或嚴格限定角色分配獨立身分；臨時研究代理只承接最少上下文，到期失效，並留下指向 supervisor 與驗收紀錄的日誌。

## 撤權是正常營運事件

真實組織一直改變權限：項目結束、合約到期、數據室關閉、安全警報觸發、token 過期，或 owner 把寫入降為唯讀。自治系統應把撤權視作正常事件。

NIST Zero Trust 把存取視為持續決策，而非一次發出的通行證。架構圍繞使用者、資產與資源執行最小權限，並允許 policy engine 隨條件變化批准、拒絕或撤銷存取。[NIST Zero Trust Architecture](https://www.nist.gov/publications/zero-trust-architecture) 實施架構要求 policy enforcement point 只在需要時提供足夠權限，不再需要時移除，並持續複核 session。[NIST ZTA Architecture](https://pages.nist.gov/zero-trust-architecture/VolumeB/architecture.html)

恢復不是尋找另一把鑰匙，而是在同一權限範圍內回到有效路線。失去讀取權限後轉搜私人郵箱，技術上可能完成任務，營運上已經失敗。

## 四種故障暴露四種弱點

第一，撤銷一個來源權限。系統應識別受影響主張，處理其餘證據，標記缺口，停止反覆請求禁止資源。

第二，關閉一個連接器。代理要區分傳輸失敗與空結果，在預定次數內重試，保留最後確認的 cursor 或 item ID，避免啟動第二個 consumer。無法恢復時，來源保持 unavailable。

第三，替換模型。把一個受限子任務切換至已批准替代模型，保留任務狀態、工具政策與驗收標準。

第四，在產物完成後移除目的地寫入權限。代理應保留已審稿的任務專屬檔案，誠實報告交付受阻，絕不把本地檔案寫成已發布。權限恢復後先核對 hash，再作一次冪等交付。

## 運行前先凍結邊界

若營運者看見失敗後才調整規則，恢復測試只是一場表演。執行前須凍結任務、身分、權限、工具、備用路線、重試上限、預算與驗收標準，並為整個 packet 計算 hash。

選擇足以暴露判斷又能安全重複的任務。公開來源的研究、審稿與準備發布很合適：它需要證據、寫作、驗證與交付，又不碰客戶數據、生產憑證或金融執行。

正常組與故障組使用相同交付物、來源窗口、模型預算與時限，每次只改變一個變數。失敗、超時與模糊結果全部保留在分母。

## 五個指標必須分開看

第一是有效自治時數：無人介入並確實推動合格成果的時間。第二是批准路線內的恢復率。第三是人工救援分鐘。第四是按固定規則計算的成果接受率。第五是每項合格成果總成本，包括模型、工具、環境、重試與人工時間。

不要把五項壓成一個自治分數。營運者需要看見系統是否用更多成本換取恢復、用較低接受率換取便宜，或用在線時長消耗人類注意力。

## 恢復必須留下收據

每次運行應保存小型證據包：任務 hash、起始身分與權限、注入事件、時間戳、受影響工具呼叫、重試、最終產物 hash、驗收結果、人工介入與成本。憑證與敏感正文不進公共紀錄。

工具日誌只證明嘗試。供應商回執可證明接受，目的地回讀可證明交付，公共驗證可證明指定 bytes 到達指定路徑。OpenAI FAQ 建議 event stream 中斷後先讀取現有 session 與已保存 items，再提交新工作，避免網絡中斷變成重複任務。[OpenAI Agents API FAQ](https://help.openai.com/en/articles/20001551-agents-api-beta-faq)

NIST 的實施經驗亦強調持續驗證政策、清點資源並觀察 enforcement。[NIST Zero Trust Takeaways](https://pages.nist.gov/zero-trust-architecture/VolumeB/ZeroTrustTakeaways.html)

## 安全失敗可能勝過強行完成

自治有時代表會好好停下。失去支撐核心主張的唯一合法來源時，完成報告可能只能靠捏造；失去目的地權限時，聲稱已發布便是虛假；安全審查工具被撤銷時，繼續執行可能擴大風險。

測試前定義三種可接受結局：交付並驗收；帶明確限制的安全降級；保存工作並指出缺口的 BLOCKED。只有第一種叫完成，後兩種仍可能證明控制良好。

## 第一場 RobinOS 撤權實驗

從一次48小時公開來源任務開始：研究當日基礎設施事件，起草四語簡報，運行確定性檢查並準備 release candidate；關閉真實發布，只用任務專屬儲存與唯讀來源。

先跑正常基線，再跑四個匹配變體：撤銷來源權限、關閉連接器、替換批准模型、移除目的地寫入權限。看結果前寫下 promotion 條件：權限邊界不變，不製造重複外部動作，缺失事實保持明確；接受率匹配基線，人工救援與總成本不惡化。

今天沒有實驗結果。眼下最有價值的工作，是先把測試設計得不容易作弊。

## 甚麼證據足以說服我們

可信證據應很樸素：hash 綁定的任務固定身分、權限、工具與驗收條件；正常運行提供基線；匹配故障組只撤銷權限；系統停止禁止動作，保留來源，只沿批准路線恢復，並交付合格結果或誠實的 BLOCKED。

多次重複出現同一模式。人工救援沒有藏進故事，總成本包括重試與 owner 時間，目的地回讀與已審稿產物一致，拿走一項權限沒有讓另一項變大。

這仍不證明通用自治。它只證明一項更窄、更有價值的能力：系統丟了一把鑰匙，知道甚麼改變了，並在仍有合法路線時安全繼續。

真正的第一場考試，不是萬事順利時能工作多久，而是一把鑰匙打不開門之後會怎樣做。

## 分類與關鍵詞

**分類：** Agentic AI · Operating Systems

**關鍵詞：** agent autonomy, permission revocation, recovery testing, accepted outcomes, zero trust, RobinOS

**Hashtags：** #AgenticAI #AIInfrastructure #ZeroTrust #RobinOS #IAmRobin
