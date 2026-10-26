---
title: "滿分遺失了一天"
storySlug: "the-perfect-score-lost-a-day"
date: "2026-10-26"
updated: "2026-10-26"
lane: "BUILD"
excerpt: "儀表板可以顯示 100% 送達率，同時讓一次未進入分母的排程執行徹底消失。"
hero: "/binary-stories/the-perfect-score-lost-a-day/hero.webp"
ogImage: "/binary-stories/the-perfect-score-lost-a-day/og.webp"
keywords: ["排程智能體", "可靠性分母", "驗收收據", "Agents API"]
canonical: "https://iamrobin.ai/binary/stories/the-perfect-score-lost-a-day/zh-hant/"
inLanguage: "zh-Hant"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202610/20261026/special/"
sourceArtifactSha256: "9c958332e94b3f43b75a4996983c3ba13f3188fdc0f0232b4732b41bfcb97bf5"
carouselPdf: "/carousels/the-perfect-score-lost-a-day.pdf"
carouselCaption: "/carousels/the-perfect-score-lost-a-day.txt"
carouselPages: 7
draft: false
---

儀表板顯示：**100%**。

每一次已記錄的 invocation 都已送達。沒有紅色列，沒有失敗嘗試。這是一個完美的月份。

但日曆承諾了三十個早晨，表格裡卻只有二十九筆記錄。

遺失的那一天沒有失敗。它根本沒有進入分母。

可靠性指標就這樣可以在數學上正確，卻在運作意義上失真。

這是一個說明性例子，並不是一次真實發生的 OpenAI 事故。它要揭示的是所有排程系統都會遇到的測量陷阱：如果指標只從已經存在的記錄開始計算，它就無法統計那筆本應存在、卻沒有出現的記錄。

![一個說明性月份包含 30 次預期執行、29 次已記錄 invocation 和 28 個通過驗收的輸出。缺失的一次執行落在 100% 送達率的分母之外。](/binary-stories/the-perfect-score-lost-a-day/hero.webp)

## 平台記錄開始於承諾之後

OpenAI 的 Scheduled Automations 文件把各層證據分得很清楚。schedule 保存預定時間和目標；每次執行會建立一個 invocation，用來記錄向 session 發送工作的嘗試。invocation 標記為 `completed`，表示送達成功：目標 session 已接受初始輸入或通知。

這不表示智能體已經完成任務。

接著，文件要求應用繼續查看 session events。根 turn 可能完成、失敗或被取消。即使 turn 已完成，也不能保證所有工具都成功，因此仍要檢查輸出和工具結果。

這是四個不同事實：

1. 預期會有一次執行；
2. 系統記錄了一次 invocation；
3. 工作已送達 session；
4. 根 turn 到達終止狀態。

第五個事實屬於任務擁有者：結果是否符合驗收規則？

最棘手的是第一個事實，因為它先於 invocation 存在。invocation 歷史可以描述已經建立的 invocation，卻不能單獨充當「所有本應發生之事」的日曆。

## 兩個誠實的比率可以彼此矛盾

假設一個純說明性的三十天月份：

- 預期有 30 次排程執行；
- 記錄到 29 次 invocation；
- 29 次全部送達；
- 其中 28 個輸出通過任務驗收。

傳輸指標是誠實的：

**已送達 invocation ÷ 已記錄 invocation = 29 ÷ 29 = 100%**

結果指標也是誠實的：

**已驗收輸出 ÷ 預期排程執行 = 28 ÷ 30 = 93.3%**

兩者不能互相取代，因為它們回答不同問題。

前者問的是：已記錄的嘗試是否到達 session？後者問的是：排程中的承諾是否產生了可用結果？如果儀表板把前者標成「任務成功率」，卻沒有建立後者的分母，就會誤導讀者。

在沒有證據之前，也不應把缺失的那次執行標成 OpenAI 故障。原因可能在應用狀態、監控、暫停的 schedule、查詢邊界，或其他位置。在完成關聯調查前，原因只能是 `UNKNOWN`。

## 在執行之前建立分母

最小的修復不是增加一個狀態徽章，而是建立預期執行帳本。

每次預定執行開始前先建立一列記錄，並賦予穩定鍵，例如 schedule ID 加 `scheduled_at`。然後向前關聯 invocation、session、根 turn、產物和驗收結果。

無論出現哪種結果，這一列都必須保留：

- 沒有找到 invocation；
- 送達處於排隊或完成狀態；
- 根 turn 完成、失敗或被取消；
- 輸出已驗收、被拒絕或尚未解決；
- 發生重試、重播或人工救援。

這樣，缺失就會變得可見。沒有 invocation 的情況會成為一筆無法匹配的預期執行，而不是看不見的空洞。

這也為延遲提供真實起點。OpenAI 說明，週期執行會帶有輕微隨機延遲；目標 session 忙碌時，送達還可能繼續等待。如果時間重要，應該從預定執行時刻量到產物通過驗收，而不是只計算 invocation 建立到送達的時間。

## 保留三塊記分板

一個有用的系統至少要分別報告三種比率。

**傳輸：**已送達 invocation ÷ 已記錄 invocation。

**執行：**終止的根 turn ÷ 已送達 invocation，並分別列出完成、失敗和取消。

**結果：**已驗收產物 ÷ 預期排程執行。

名稱很重要，因為每種比率有不同的責任邊界和修復方式。送達問題不能靠更好的內容標準解決；被拒絕的產物不能靠重試傳輸解決；缺失的執行也無法從一張從未收到它的 invocation 表裡恢復。

重試也需要同樣的紀律。OpenAI 的恢復指南提醒，失敗的 turn 可能已經改動檔案或呼叫工具。重複任務之前，應先檢查保存狀態和已完成的外部效果。執行鍵必須保持穩定，同時讓每次嘗試擁有獨立身分；否則，一次重試可能看起來像第二次成功，而不是對第一次承諾的恢復。

## 滿分需要一個外部見證者

更深的一層並不是說 100% 一定可疑。有時每一項承諾確實都成功了。

真正的問題是：一個系統如果只依靠故障點之後自行產生的記錄，就無法證明自己的完整性。

schedule 需要 invocation 表之外的見證；產物需要正文之外的驗收規則；重試需要重試動作之外的帳本。

綠色很有用，但綠色出現得太晚。

在慶祝分子之前，先問一句：是誰數了那些天？

[1]: https://developers.openai.com/api/docs/guides/agents-api/sessions/automations
[2]: https://developers.openai.com/api/docs/guides/agents-api/sessions/events
[3]: https://developers.openai.com/api/docs/guides/agents-api/observability
[4]: https://developers.openai.com/api/docs/guides/agents-api/errors

來源：OpenAI 官方文件 [Scheduled Automations][1]、[Events and Items][2]、[Observability and Usage][3]、[Errors and Recovery][4]，以及經過雜湊綁定的[來源 Special](https://iamrobin.ai/ouroboros/202610/20261026/special/)。三十天的數字僅用於說明。本文不聲稱發現了真實的可靠性比率、延遲分布或平台故障。
