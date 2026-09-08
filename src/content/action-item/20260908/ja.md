---
title: "Astraエスカレーション・ラダー"
date: 2026-09-08
updated: 2026-09-08
section: Ouroboros
series: Daily Action Item
categories:
  - Artificial Intelligence
  - Agent Systems
  - Operating Models
tags:
  - GPT-6 Astra
  - GPT-5.6 Sol
  - One Person Company
keywords:
  - Astra escalation
  - Sol routing
  - founder interruption
  - verified outcomes
  - cost per rescue
excerpt: "境界を定めた救援が停滞した仕事を検証済み成果へ変え、創業者に時間を返すとき、Astraの価格差は正当化される。"
hero: /action-item/20260908/hero.webp
ogImage: /action-item/20260908/og.webp
canonical: "https://iamrobin.ai/ouroboros/202609/20260908/action_item/ja/"
author: https://iamrobin.ai/#person
inLanguage: ja
languageSlug: ja
translationReview: PASS
translationOf: "https://iamrobin.ai/ouroboros/202609/20260908/action_item/"
draft: false
sourceAction: "Daily Briefing 2026-09-08, item 5"
ledgerId: ASTRA-ESCALATION-LADDER-20260908
visualHeadline: "Escalate the problem."
visualSubhead: "SOL EXECUTES · ASTRA RESCUES"
visualFooter: "VERIFY · LEARN · REROUTE"
visualNodes: "SOL|TRIGGER|ASTRA|VERIFY"
---

## 既定モデルは製品上の選択である

**結論は明快だ。Astraは日常の実行者としてSolを置き換える前に、エスカレーションデスクとしてRobinを置き換えるべきである。** 終点と境界が明確な仕事はSolが担う。定めた失敗条件を越え、救援の期待価値が追加費用を上回る場合だけAstraへ引き継ぐ。救援の成否はテスト、領収記録、外部証拠で判定する。

Codex CLI 0.153.4は、モデルを明示しない場合の組み込み既定値をAstraにした。これは幅広い利用者に向けた製品判断であり、一人会社の運営方針としては十分ではない。[Codex changelog](https://learn.chatgpt.com/docs/changelog)。OpenAI報告値では、Astra対SolはTerminal‑Bench 4.0で57.9%対37.3%、AutomationBenchで41.4%対18.1%、OSWorldで72.6%対65.7%。DeepSWEは74.1%対72.7%と差が小さい。これはベンダー評価であり、RobinOSの実績ではない。[Astraの発表と評価](https://openai.com/index/gpt-6-astra/)。

価格も明確だ。100万入力・出力トークン当たりAstraは10ドルと50ドル、Solは4ドルと20ドルで、対応する単価は2.5倍である。[Astraモデルページ](https://developers.openai.com/api/docs/models/gpt-6-astra)。[Solモデルページ](https://developers.openai.com/api/docs/models/gpt-5.6-sol)。実際の仕事ではキャッシュ、ツール、再試行、コンテキスト、必要トークン数も含めて判断する。

## モデル価格ではなく救援費用を測る

トークン価格は調達データである。検証済み成果1件当たりの総費用が運営データだ。安い試行でも、2回失敗し、作業状態を壊し、1時間のレビューを要し、最後をRobinへ戻すなら高くつく。高価な試行でも、正確な救援パケットから1回で難所を直し、外部検証まで閉じれば経済的になり得る。

各タスクには、モデルとツールの総費用、経過時間、Robinの介入分数、割り込み回数、修復回数、検証済み完了を記録する。復旧が重複結果を生んだかも残す。二重公開、二重送信、新しい情報源の上書きは、最終成果が正しくても統制上の失敗である。

9月4日の[Capability Is Not Authority](https://iamrobin.ai/ouroboros/202609/20260904/action_item/)は能力、委任、権限、実行、検証済み成果を分けた。引き継ぎは実行者と文脈を変えるだけで、ファイル、宛先、権限、停止条件は変えない。9月6日の[Four Loop Test](https://iamrobin.ai/ouroboros/202609/20260906/action_item/)は完了、復旧、記憶、改善を定義し、9月7日の[Three Agent Workdays Still Need a Founder](https://iamrobin.ai/ouroboros/202609/20260907/action_item/)は創業者の注意と空の10タスク台帳を加えた。本稿はその循環に引き継ぎ規則を加える。

本日の公開で本番ルーティングは変えない。20タスクの記録は空から始まり、未観測値はUNKNOWNのままにする。

## 四つの条件が引き継ぎを正当化する

第一は設計上の曖昧さである。Solが局所修正を終えても、コンポーネント、スキーマ、配備規則、永続状態にまたがる契約を見落とすことがある。関連する衝突と必要証拠を示しても一貫した変更境界を作れない場合に限り引き継ぐ。「大きな仕事」は条件ではない。

第二は同じ受け入れ条件に対する2回の修復失敗である。1回目は通常、テスト名、依存関係、古い仮定などの情報を与える。まず診断して直す。2回目も同じ条件を満たせないとき、失敗、コマンド、変更ファイル、最後の正常状態を保存してAstraへ渡す。

第三は難しいコンピューター操作やシステム横断実行である。OpenAIが報告するOSWorldとAutomationBenchの差から、最も明確な候補となる。決定論的なシェル編集は日常レーンに残す。ブラウザー状態、ローカルファイル、遠隔記録をまたぐ壊れやすい手順は、再構築と重複の危険を減らすため早めに引き継げる。

第四は、見逃しの費用が高い最終証拠レビューである。これは救援よりレビューのレーンだ。完成物、権限境界、必要証拠、変更一覧を渡し、矛盾、証拠欠落、範囲逸脱、ロールバックを調べる。決定論的チェックはレビュー前後に動かす。

## 救援パケットが統制面になる

Astraへ渡すのは会話の要約ではなく、構造化した救援パケットである。タスクID、正確な目的、固定した終点、許可・禁止範囲、確認済み成果物、情報源の版、観測した失敗、試した修復、最後の正常状態、次の安全な確認を含める。

隠れた推論や、Solが失敗した理由を断定する物語は含めない。「三つの言語ルートが無いためSEO検査が失敗」は証拠である。「SolはAstroが苦手」は推測にすぎない。遠隔状態が変わった可能性がある場合、最初に読み取り確認を行う。返答が無いことは遠隔操作の失敗を証明しない。

救援後は、変更ファイル、コマンド、通過テスト、未解決事実、外部効果、戻し地点、当初の終点達成を短い領収記録として返す。モデル自身の説明だけでは受け入れない。

OpenAIは研究組織で、人間の1労働日当たり約3.1エージェント労働日を報告し、成功した4～8時間タスクの半数超がなお人間の介入を必要とした。これはOpenAI内部の資料で、RobinOSへ直接外挿できない。機械労働の増加と人間調整の減少が別の成果であることを示す。[OpenAI研究ワークフロー資料](https://openai.com/index/research-acceleration-view-inside-openai/)。

## 20件の実務で採点する

結果を見る前に20件のRobinOS実務を固定し、日常、設計、復旧、証拠の四クラスへ5件ずつ分ける。全試行で同じIDを維持し、救援を別タスクとして分母から外してはいけない。

Sol単独、SolからAstra救援、SolからAstra証拠レビューのどのレーンが閉じたかを記録する。第一指標は割当タスク当たりの検証済み完了。第二はRobinの介入分数と回数。第三は失敗、ツール、レビューを含む成果当たり総費用である。経過時間、修復回数、自律復旧、未承認変更も併記する。

誤った早期引き継ぎ、遅すぎた引き継ぎ、変更範囲を広げた救援、再現できない学びも保存する。公開ベンチマークは実験設計を支える。RobinOSの経路を変えられるのはRobinOS自身の領収記録だけだ。

## 救援をルーティング証拠へ変える

成功した救援は、出典、日付、タスク種別、条件、結果、費用、検証を持つ候補知識になる。二つ目の類似例が確認するまで試用状態に置く。「Solの2回失敗後、Astraがこのスキーマ衝突を修復した」は観測である。「スキーマは常にAstraへ」は過剰一般化である。

ある条件が救援成功を繰り返し予測すれば、そのクラスは早く引き継げる。Solが介入無しで継続して通過すればSolに残す。変更前の規則、変更を支えた証拠、発効日、再評価条件を保存し、後の失敗から当時の割当を再現できるようにする。

Murphyテストは、魅力的な偽条件、高価な無限ループ、無関係な変更を提案する救援、遠隔書き込み成功後のタイムアウト、1件だけの物語から作った学びを含める。正しい仕組みは権限拡大を拒み、遠隔状態を先に確認し、修復回数を制限し、単発事例を試用に留める。

## 判断規則

20件の台帳が空の間、Solを日常実行者に保つ。四条件の一つを満たし、完全な救援パケットがある場合だけ引き継ぐ。受け入れ前に決定論的検証、または独立した証拠付き人間判断を要求し、不明な事実はUNKNOWNとする。

繰り返すAstra救援が完了率を上げるか、Robinの介入削減が追加費用を十分に上回り、権限、出典、復旧、ロールバック、重複防止、記憶品質に重大な悪化が無い場合だけ対象を広げる。標本とタスク種別は見える形で残す。

終点が動く、情報源の版が不明、権限が衝突する、結果を伴う遠隔操作後の状態を確認できない、または同じ未レビュー出力が検証器を支配する場合、引き継ぎを止めて状態を直す。

Astraは検証済み救援ごとに価格差を獲得する。証拠が動くまでSolが日常レーンを維持する。RobinにはRobinにしかできない判断だけを残す。

## カテゴリーとキーワード

**Categories:** Artificial Intelligence; Agent Systems; Operating Models; One-Person Company

**Keywords:** GPT-6 Astra; GPT-5.6 Sol; escalation ladder; rescue packet; founder interruption; verified outcomes; cost per rescue; deterministic verification; model routing

**Hashtags:** #AI #AgentSystems #RobinOS #OnePersonCompany #VerifiedOutcomes
