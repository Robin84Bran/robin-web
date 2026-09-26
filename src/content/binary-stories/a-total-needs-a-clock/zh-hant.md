---
title: "合計數也需要一隻鐘"
storySlug: "a-total-needs-a-clock"
date: "2026-09-26"
updated: "2026-09-26"
lane: "BUILD"
excerpt: "加法可以完全正確，標題卻可能下得太早。一行仍在更新的 ETF 數據，提示了儀表板該怎樣設計。"
hero: "/binary-stories/a-total-needs-a-clock/hero.webp"
ogImage: "/binary-stories/a-total-needs-a-clock/og.webp"
keywords: ["data completeness", "dashboard design", "ETF flows", "missing data"]
canonical: "https://iamrobin.ai/binary/stories/a-total-needs-a-clock/zh-hant/"
inLanguage: "zh-Hant"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202609/20260926/special/"
sourceArtifactSha256: "02378f7c7fcef1a2ef1db4588109cf1d0f37833dd802bd003d89cbe736426a07"
carouselPdf: "/carousels/a-total-needs-a-clock.pdf"
carouselCaption: "/carousels/a-total-needs-a-clock.txt"
carouselPages: 7
---

計算機一道加法都沒算錯，照樣可能幫你寫出錯誤的標題。

9 月 26 日的 [Daily Special](https://iamrobin.ai/ouroboros/202609/20260926/special/) 留下了當天上午的兩次觀察，看的都是美國 9 月 25 日同一個比特幣 ETF 交易日。第一次，12 隻基金中有 7 格填了數字，顯示合計為 −1,180 萬美元。後來有 10 格填了數字，合計變成 +3,750 萬美元。兩次加總都與當時已有的數字相符，但兩次都沒收齊。

撰寫本文時，在香港時間 9 月 26 日再次打開 [Farside 表格](https://farside.co.uk/btc/)，看到的仍是第二種狀態。這些是有日期的觀察記錄，並非週五的最終結果。數據提供方具體何時更新，尚未確認。

## 讓數字帶上它的背景

假設你正在設計一張小卡片，讀者會在開會前截圖。中央寫着 **+3,750 萬美元**，很乾淨。但裁掉周圍的表格，也就把兩隻尚缺數據的基金裁掉了。

我會在下面補一行：**12 隻基金，已有 10 個數值，仍缺 2 個。** 旁邊寫清美國交易日期，以及擷取時間和時區。讀者應能打開卡片對應的那一版快照。提供方沒有公布更新時間，就保留這一缺口，別拿自己的擷取時間頂替。

這是一項介面設計建議，尚無儀表板實驗的實測結果。它只想解決一個小問題：數字被轉發時，成立條件也跟着走。即使截圖到了沒參加會議的人手裏，也應留下足夠的背景。

## 正的部分合計，最後仍可能為負

以第二次快照為例，把兩隻缺失基金的貢獻合稱 R，並暫時固定已顯示的數值。完整合計就是 **37.5 + R**，單位為百萬美元。

如果 R 是 −50，結果就是 −12.5；如果 R 是 +10，結果就是 +47.5。這些是假設的算術例子，不是估計，也不是上下限。既然沒有可靠依據約束 R，最終正負就還沒定。已經填入的數值若被修訂，計算也會改變。

「12 個裏有 10 個」聽起來很接近終點。但它只計算有數字的格子，不代表覆蓋了多少資產，更不代表預測把握或數據準確度。若把進度條標成「83% 確定」，設計者就憑空添加了表格沒有提供的資訊。

## 先改標籤，再寫標題

做產品時，可以用一條小規則把區別擺出來：只要還有成分缺失，就顯示部分合計，並寫明缺甚麼。等所有預期儲存格都有數字，再按頁面公布的精度核對加總與提供方合計。通過後，才標註該行在數值上已收齊、已核對。這仍不等於逐一獨立核驗了每家發行人的報告。

舊快照也要留着。否則，事後追查標題為甚麼變了的人，只能看見最後一行，無法還原早先讀者掌握的資訊。

有用的輸出，應讓數字連同觀察時間、覆蓋情況和修訂記錄一起保留下來。尤其當它看起來已經足夠漂亮、足夠適合做標題時，別把這些背景從卡片上刪掉。
