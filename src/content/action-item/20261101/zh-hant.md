---
title: "出版者允許 AI 如何使用作品"
date: 2026-11-01
updated: 2026-11-01
section: Ouroboros
series: Daily Action Item
categories:
  - 人工智慧
  - 出版
  - 數位權利
tags:
  - AI 內容探索
  - AI 訓練
  - robots.txt
  - 出版者控制設定
keywords:
  - AI 訓練偏好
  - AI 搜尋曝光
  - robots.txt
  - OAI-SearchBot
  - GPTBot
excerpt: "AI 內容探索、答案引用與模型訓練，是使用出版者作品的不同方式；每一種都需要各自的許可與成效證據。"
hero: /action-item/20261101/hero.webp
ogImage: /action-item/20261101/og.webp
canonical: "https://iamrobin.ai/ouroboros/202611/20261101/action_item/zh-hant/"
languageSlug: zh-hant
translationOf: "https://iamrobin.ai/ouroboros/202611/20261101/action_item/"
translationReview: PASS
author: https://iamrobin.ai/#person
inLanguage: zh-Hant
draft: false
sourceAction: "2026-11-01 每日簡報，第 5 項"
ledgerId: AI-PUBLISHER-CONTROL-20261101
visualHeadline: "你允許 AI 如何使用作品？"
visualSubhead: "探索 · 引用 · 造訪 · 訓練"
visualFooter: "一份檔案 · 多種結果"
visualNodes: "探索|引用|造訪|訓練"
thesis: "出版者需要區分 AI 內容探索與模型訓練的許可，並分別衡量引用、網站造訪及有價值的關係。"
---

# 出版者允許 AI 如何使用作品

對在網上發表作品的人來說，讓讀者找到作品是出版工作的一部分。一篇文章、一份研究指南，或一個經過細心解釋的觀點，都可能透過搜尋結果、他人分享的連結，或愈來愈常見的 AI 助理回答，傳到讀者面前。這帶來一個新的出版問題：當創作者歡迎 AI 服務造訪自己的網站，她究竟歡迎對方如何使用自己的作品？

AI 服務可以用幾種方式使用網頁內容。它們可以找到頁面，並在搜尋結果中提供連結；可以參考頁面內容，回答讀者的問題；也可以使用內容來協助訓練模型。模型是從資料中學習規律、產生回應的底層軟體。每項活動的目的不同，出版者可用的控制設定也因服務供應商而異。

經營 ChatGPT 的 OpenAI，以及經營 Gemini 的 Google，已提供讓出版者表達這些使用偏好的方式。2026 年 10 月 30 日，兩家公司都宣布計劃支援一項共通的 AI 訓練偏好訊號。兩項公告指向一種讓出版者表達意願的共同語言，但實施時程不同。

iamrobin.ai 網站上一份公開的小檔案，讓這個問題變得具體。它的內容顯示，網站能多清楚地表達自己的意願，也顯示之後發生的事，仍有多少取決於其他環節。

要理解這份檔案，得先從網站的入口說起。

網站通常會在根目錄放置一份名為 `robots.txt` 的檔案，例如 `iamrobin.ai/robots.txt`。稱為爬蟲的自動化程式會讀取它，了解自己可以造訪網站的哪些部分。這些程式以稱為使用者代理程式（user agent）的名稱表明身分，讓出版者能對不同爬蟲給予不同指示。

想像一本圖書館藏書。把它列入目錄，有助人們找到它；引用其中一段文字，有助讀者討論內容；用它來編寫新的訓練手冊，則是另一種用途。在這個比喻中，每項許可都對應一種不同的活動，而每種活動都帶來不同結果。目錄記錄創造了發現這本書的機會；讀者真正打開書，是之後才發生的事。

出版者考慮 AI 內容探索時，也需要作出同樣區分。允許爬蟲讀取頁面、頁面獲 AI 答案引用，以及潛在客戶造訪網站，是三個不同的步驟。

OpenAI 現行的爬蟲文件，在實務上區分了搜尋與訓練。`OAI-SearchBot` 用於支援網頁出現在 ChatGPT 搜尋結果中。`GPTBot` 涉及可能用於改進生成式 AI 基礎模型的內容。OpenAI 表示，這兩個爬蟲的設定互相獨立。

這讓出版者可以表達一種偏好：歡迎作品透過搜尋被發現，同時拒絕 GPTBot 為模型訓練而爬取內容。搜尋設定關乎頁面是否有資格出現在結果中；某個特定頁面最終會否出現，仍取決於服務如何運作。

OpenAI 亦有記載 `ChatGPT-User`：它會因應使用者的操作造訪頁面。這類造訪的觸發原因不同——有人要求服務執行某件事。OpenAI 解釋，由使用者發起的操作可能不受 `robots.txt` 所規管的規則約束。即使在同一家供應商的服務內，造訪目的仍然重要。

Google 現行的安排以另一種方式連結這些選擇。其 `Google-Extended` 控制設定適用於 Gemini Apps 及模型訓練用途。Google 在 10 月 30 日的公告中，亦將允許設定與在 Gemini Apps 中取得內容依據曝光機會的資格連結起來。

所謂「內容依據」（grounding），是指參考來源資料來支援 AI 回應。對出版者而言，這為作品提供了另一條呈現在讀者面前的途徑。由於 Google 現行的控制設定同時影響這項資格與訓練用途，出版者必須一併考慮兩種效果。OpenAI 將搜尋與訓練分別交由獨立爬蟲設定控制，安排有所不同。

因此，共通偏好訊號的構想便有了用處。創作者對訓練用途可能有一個明確意願，但讀取她網站的公司各有自己的控制設定。

2026 年 10 月，一份由 IETF 託管、題為《Machine-Readable Training Preference Signal》的 Internet-Draft，提出以共通方式表達這種意願。IETF 是制定互聯網技術標準的社群；Internet-Draft 則是仍在制定中的提案。這份草案定義了政策標記 `__usage_ai-training`，供軟體讀取作為訓練偏好。草案列出的到期日為 2027 年 5 月 3 日；這個日期與其草案制定狀態有關。

提案仍在制定中。供應商的公告說明了下一步：OpenAI 於 10 月 30 日表示，計劃在未來數個月支援這項訊號；Google 同日的公告則指向 2027 年。在過渡期間，現有的供應商專屬控制設定仍是出版者可用的實務工具。

公告發布兩天後，iamrobin.ai 的個案呈現了一幅出版者當前公開聲明的快照。

根據所提供的驗證資料，於 2026 年 11 月 1 日香港時間進行的一次檢查發現，網站即時提供的 `robots.txt`，與 GitHub 公開儲存庫 `main` 分支上的檔案相符。相關內容如下：

```text
User-agent: *
Content-Signal: search=yes, ai-input=yes, ai-train=yes, use=reference
Allow: /
```

星號代表一般爬蟲，而 `Allow: /` 允許爬蟲讀取整個網站。`Content-Signal` 一行則表達了廣泛的允許偏好，涵蓋搜尋、AI 輸入、訓練及參考用途。

即時檔案與儲存庫檔案一致，確立了一項有用但範圍有限的事實：檢查當時，網站公開提供的聲明與已發布的原始檔案相符。這個個案討論的是當時觀察到的聲明。供應商是否識別每個欄位，以及如何依照訊號行事，仍取決於各自的實作。

這項聲明亦讓創作者原本的問題變得更尖銳：如果目標是讓 AI 服務展示並引用她的作品，她為此給予了甚麼許可？

就 iamrobin.ai 而言，這份檔案表達了廣泛的歡迎態度，包括訓練用途。OpenAI 文件所述的控制設定顯示，搜尋與訓練偏好也可以分別表達。Google 現行的控制設定，則把訓練偏好與在 Gemini Apps 中取得內容依據曝光機會的資格連結起來。因此，實際答案取決於供應商、具體的控制設定，以及出版者寫下的內容。

至於創作者之後得到甚麼，則需要另一類證據。

頁面出現在搜尋結果中，顯示作品獲得曝光。答案引用該頁面，顯示那則答案有標示來源。引薦造訪顯示有人循連結進入網站。符合條件的查詢則顯示，有人進一步走向一段可能有價值的關係。每項觀察回答的問題都不同。

這些區別提供了一種適度評估成效的方法：保留引用與連結的例子、在來源可見時檢視引薦流量，並記錄相關查詢。這些觀察有助出版者了解 AI 內容探索帶來的價值。若要確立許可設定的變更是否導致成效增加，仍需進一步比較。

就 iamrobin.ai 而言，所提供的證據確立了這項聲明，以及它與儲存庫檔案的一致性。這份紀錄尚未衡量引用、引薦造訪或查詢的增長。某個特定模型是否曾使用某個特定頁面進行訓練，也仍未有定論。

共通的訓練偏好訊號，或可讓出版者更容易向不同服務表達意願。它是否有用，取決於實際實作；而內容探索的價值，則會從可觀察的結果中逐漸顯現。網站入口的檔案告訴爬蟲出版者歡迎甚麼。故事接下來如何發展，要看隨之而來的連結、讀者與關係。

**資料來源**

- [OpenAI 公告，2026 年 10 月 30 日](https://openai.com/index/helping-websites-express-ai-training-preferences/)及[爬蟲文件](https://developers.openai.com/api/docs/bots)。
- [Google Search Central 公告，2026 年 10 月 30 日](https://developers.google.com/search/blog/2026/10/ai-training-control)。
- [IETF Internet-Draft：《Machine-Readable Training Preference Signal》](https://datatracker.ietf.org/doc/draft-kelley-aipref-training-preference-signal/)。
- [iamrobin.ai robots.txt](https://iamrobin.ai/robots.txt) 及[公開儲存庫檔案](https://github.com/Robin84Bran/robin-web/blob/main/public/robots.txt)；兩者於 2026 年 11 月 1 日香港時間在所提供的驗證紀錄中作比較。
