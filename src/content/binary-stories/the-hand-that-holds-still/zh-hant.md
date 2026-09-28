---
title: "穩住瓶子的那隻手"
storySlug: "the-hand-that-holds-still"
date: "2026-09-28"
updated: "2026-09-28"
lane: "BUILD"
excerpt: "擰瓶蓋時，最不顯眼的動作，可能恰恰是整件事能成功的前提。"
hero: "/binary-stories/the-hand-that-holds-still/hero.webp"
ogImage: "/binary-stories/the-hand-that-holds-still/og.webp"
keywords: ["bimanual robotics", "coordination", "role ablation", "ACT", "VoxAct-B"]
canonical: "https://iamrobin.ai/binary/stories/the-hand-that-holds-still/zh-hant/"
inLanguage: "zh-Hant"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202609/20260928/special/"
sourceArtifactSha256: "a414832afffcf82d4ad09ba89bcbc4b1a330d155cc92f447f9fd2f31b0d5324c"
carouselPdf: "/carousels/the-hand-that-holds-still.pdf"
carouselCaption: "/carousels/the-hand-that-holds-still.txt"
carouselPages: 7
---

看一個人擰緊得發澀的瓶蓋。擰蓋子的手負責動作戲，另一隻手扶著瓶身，彷彿沒幹多少活。

讓第二隻手鬆開，劇情就變了。瓶身可能跟著蓋子一起轉。動靜不小，瓶子卻沒打開。

在這件事裡，有用的工作也包括阻止不該動的東西移動。對於想讓多個智能體協作的人，一個瓶子就是很好的小謎題。

## 給安靜的那隻手一份工作

發表於 CoRL 2024 的 [VoxAct-B][1] 明確區分了執行動作與保持穩定的機械臂。作者用兩隻機械臂示範了開瓶和開抽屜。方法中還包含語言、視覺語言模型和場景的體素表示。這些細節很重要：論文測試的是一整套方法，不能據此把改進單獨歸功於角色劃分。

協調也有另一條合理的路。RSS 2023 的 [ACT][2] 根據觀測預測連續的一段動作。共同控制雙臂的策略可以一起學習兩隻手的關係，並不等於兩個各自為政的腦袋搶一個瓶子。公平比較不能先讓基線忘掉自己的搭檔，再誇另一方會合作。

所以，值得問的問題比「結構能否戰勝規模」小得多：當聯合策略已經看到同樣的場景，明確的角色資訊還有沒有幫助？

## 一個可能讓設計者失望的測試

[9 月 28 日的 Daily Special][3] 提出了這樣的比較。實驗尚未執行。

設想同一個學習器的三個版本。A 聯合控制雙臂。B 加入資訊，標明哪隻手負責穩定、哪隻手負責動作。C 保留 B 新增的模組，但在訓練和評估時，都把有意義的角色輸入換成同一個固定標記。

C 是示範現場那個不太討喜的來賓。如果 B 看起來很厲害，C 卻同樣出色，功勞就還不能算在角色標籤頭上。改進可能來自新增模組的其他部分。如果 A 與 B 相當，那麼在這個任務和預算下，明確角色也可能沒有必要。

示範資料、觀測、評估場景和總資源上限都要對齊。分配角色的計算也要計入預算。否則，所謂「更會協調」，可能只是某一方多拿了資訊或算力。

失敗的嘗試也要留下。有人出手救場後才擰開的瓶子，屬於輔助完成。成功案例再快，也不能讓逾時案例消失。完成率、禁止的碰撞和人工介入應當並列展示，讓不方便的代價仍然看得見。

## 誰來穩住瓶身？

瓶子提出的是一個設計問題，並非 AI 團隊的通用配方。軟件流程中的類似角色，可能是在另一個元件修改草稿時，保留一份已核驗的輸入。但這樣的安排是否有效，需要自己的對照實驗；機器人結果不能代替證明。

這個問題倒是很適合帶走：**為了讓眼前的動作成功，甚麼必須保持穩定？**

在增加一個忙碌的參與者之前，先說清這份責任，再測試說清它是否真的改變結果。安靜的那隻手不該被忽略，也不該自動獲獎。它需要一個能看見「鬆手以後會怎樣」的測試。

[1]: https://voxact-b.github.io/
[2]: https://tonyzhaozh.github.io/aloha/
[3]: https://iamrobin.ai/ouroboros/202609/20260928/special/
