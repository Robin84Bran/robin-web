---
title: "智能體學會了一套做法"
date: 2026-11-20
updated: 2026-11-20
section: Ouroboros
series: Daily Action Item
hero: /action-item/20261120/hero.webp
ogImage: /action-item/20261120/og.webp
ledgerId: PROCEDURAL-MEMORY-BOUNDARY-20261120
draft: false
categories:
  - Agent Workflows
  - AI Verification
  - Editorial Systems
tags:
  - Perplexity Computer
  - Agent skills
  - Honest Agent
  - procedural memory
keywords:
  - reusable agent skills
  - skill promotion
  - procedural memory
  - approval boundaries
author: https://iamrobin.ai/#person
sourceAction: "2026-11-20 Daily Briefing, item 5"
visualHeadline: "A procedure must earn its place."
visualSubhead: "EVIDENCE · REPLAY · BOUNDARY"
visualFooter: "Keep what improves the work"
visualNodes: "EXPERIENCE|TEST|APPROVE|REVERSE"
thesis: "Promote a reusable agent procedure only when replay shows useful improvement while preserving approval boundaries and reversibility."
excerpt: "Perplexity 報告可重用技能帶來改善；關鍵問題是一次成功何時值得成為長期指令。"
canonical: "https://iamrobin.ai/ouroboros/202611/20261120/action_item/zh-hant/"
inLanguage: zh-Hant
languageSlug: zh-hant
translationOf: "https://iamrobin.ai/ouroboros/202611/20261120/action_item/"
translationReview: PASS
---

# 智能體學會了一套做法

AI 助手能打開檔案、操作軟件、核對結果，再決定下一步，才算開始像智能體一樣工作。重複的任務有個老問題：每次重來，都要有人把同一套做法再講一遍。

「技能」把這些做法寫成可重用的指令，有時還附帶執行部分工作的腳本。個人技能服務一位用戶；內建技能則可能服務很多人。

它像工人手邊的清單。好的清單會提醒人寄包裹前核對地址；草率的清單也能把捷徑固定下來。寫進清單之後，兩種做法都會更容易重複。

Perplexity 於 2026 年 11 月 18 日發表《Self-improving skills》，介紹其 Computer 智能體如何根據過往活動的證據，提出修改可重用指令的建議。這種個人化改變的是提供給模型的上下文和指令，模型本身的權重並未改變。

智能體學會了一套做法。真正重要的問題是：這套做法憑甚麼進入以後的工作？

## 從一次經歷到長期指令

Perplexity 把流程分成證據、反思、核驗和啟用四步。經歷提供證據，反思提出修改，核驗檢驗修改，啟用才讓通過的做法投入使用。

提出建議與啟用是兩回事。一次成功值得調查；把它寫成長期指令，則會影響細節不同的後續任務。

要自動產生新的個人技能，Perplexity 要求同一種可重用行為獨立出現兩次。若是更新已有技能，一次有依據的實例就可能足夠。新建程序與修訂舊程序，門檻不同。

個人技能提案要經過按固定規則運行的檢查，部分提案還會由模型覆核。每位用戶最多可自動產生十項個人技能；滿額後，要加入新技能，就得淘汰一項，並說明替換理由。

這個上限讓程序記憶成為取捨問題。指令容易越積越多；難的是判斷哪些教訓仍適用、哪些互相重疊、哪些已被更好的做法取代。

內建技能可能影響許多用戶，因此審查更嚴。Perplexity 描述的流程包括清除敏感資料後的證據、留作評估的模擬失敗情境、原版與修訂版的比較、以往成功的任務，以及內部人工審核。

進入人工審核前，候選版本須通過所有失敗情境，在至少一個原版失敗的情境中改善，同時保持對照任務的表現。這些對照任務，是舊做法原本就能完成的工作。

還是寄包裹的例子：新清單要能抓住以前漏掉的錯址，也不能耽誤原本寄對的包裹。檢驗既看修復了甚麼，也看有沒有破壞本來順利的工作。

## Perplexity 測到了甚麼

Perplexity 還報告了一項為期八周的隨機實驗。自動改進個人技能後，Computer 全部活動中的工具調用失敗率降低了 11%；排除背景運行後，降幅約為 7%。工具調用，就是智能體要求軟件執行一個動作。

Perplexity 同時報告，測得的用戶不滿程度下降了 7.6%。成本和回應時間則沒有可測得的變化。

這些指標衡量的是不同環節。軟件動作失敗可能打斷任務；不滿程度反映提供方所測得的用戶感受；成本和速度又是另外的實際後果。分開看，才能知道實驗測到了哪些改善，以及哪些指標在其測量能力內保持穩定。

另一項範圍較窄的 SkillLearnBench 評估，測試可重用技能的學習效果。九類任務中的 16 組配對實例顯示：沒有生成技能時，報告的任務成功率為 43.8%；提供技能後升至 62.5%。

在這個小型測試裏，結果值得關注。但軟件基準測試只涵蓋特定條件下的特定任務。職場裏的幫助程度，還取決於最終成果質素、人的監督時間，以及出錯之後如何處理。

兩項評估均由 Perplexity 自行運行。已審閱的證據中沒有獨立重現；產品文章也只部分披露任務構成、評估提示、評分方式和統計不確定性。結果能否遷移到其他智能體系統，仍是未知數。

這些結果支持繼續研究可重用指令能否提升智能體表現。它們的實際適用範圍，還需要更廣泛、獨立審視的使用經驗來釐清。

## 成功與許可是兩種判斷

一套做法即使交出了成果，也可能有嚴重缺陷：依賴脆弱捷徑、耗費過多資源，或越過審批邊界。

設想一個例子：智能體受託準備一份供人審閱的文件。文件準確無誤，它卻又擅自發佈，而發佈本應先獲批准。成果質素和越權發佈都是事實；把整段經歷當作成功程序保存，會把越權一併保存。

Honest Agent 的公開協議在這裏提供了有用的區分：一是任務是否針對正確對象完成；二是每一項需要批准的操作，是否在執行前獲得了針對該對象的批准。兩項判斷彼此獨立。證據不足時，協議容許標記為 `unknown`。

因此，協議的結果類別區分合規成功、伴隨違規的成功、虛假的成功宣稱，以及其他結果。擬議研究將比較兩種判斷依據：只看智能體報告，或同時查看報告和行動紀錄。這仍是一份次級研究的協議草案；此處借用的是它的設計原則。

這一原則改變了可重用技能所需的證據。智能體的總結可能聲稱工作完成；可重放的行動紀錄則能顯示它接觸了哪些資源、哪些步驟失敗、如何恢復，以及哪些地方需要批准。

總結提出主張，紀錄讓審查者有辦法核實。

## 一套做法何時值得留下

問題至此更清楚了：一次成功，何時值得獲得長期影響未來工作的資格？

合理的起點，是先把它當作待檢驗的教訓。固定現有做法作為基線，讓舊版與候選版在同樣的任務上比較。既納入促成修改的失敗案例，也納入過去已成功的任務，取捨才看得見。

成果質素、總成本、人工介入時間、故障恢復和邊界遵守，都應分別判斷。太早合成一個分數，會掩蓋看似改進的原因：完成率提高，可能伴隨更多監督；速度變快，可能犧牲恢復能力。

若重放發現脆弱捷徑、成果退步或越權操作，候選方案就應被否決。證據還太薄時，可以繼續評估。只有反覆、可檢查的結果顯示確有改善，並守住必要邊界，才有理由啟用。

啟用也應可逆。版本紀錄說明改了甚麼；回滾路徑讓實際使用暴露問題時能夠恢復舊版；退役標準則幫助清除假設過時或已被更好方案取代的技能。

核驗的力度應與影響範圍相稱。個人指令影響較小；很多人共用的內建指令，在啟用前需要更廣的證據。

對 RobinOS 而言，這樣的重放比較仍只是一個有邊界的實驗提議，結果未知。Perplexity 報告的收益給出了調查理由；Honest Agent 的區分則幫助定義調查該測量甚麼。

持久記憶會讓昨天的經歷影響明天的決定。一套做法只有在重放顯示淨改善，同時保住安全、證據質素和撤回或退役的能力時，才值得擁有這種影響力。

資料來源：

- Perplexity，[*Self-improving skills*](https://www.perplexity.ai/en-GB/hub/blog/self-improving-skills)，2026 年 11 月 18 日。
- Honest Agent，[公開協議](https://github.com/Robin84Bran/honest-agent/blob/main/v0.3/PROTOCOL.md)，次級研究協議草案。
