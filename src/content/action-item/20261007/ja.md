---
title: "自律性には受入試験が要る"
date: 2026-10-07
updated: 2026-10-07
section: Ouroboros
series: Daily Action Item
categories:
  - Agentic AI
  - Operating Systems
tags:
  - Autonomy
  - Acceptance Tests
keywords:
  - agent acceptance tests
  - computer use
  - autonomous workflows
excerpt: "完了、権限、復旧、目的地証拠を明示して初めてエージェントは有用になる。"
hero: /action-item/20261007/hero.webp
ogImage: /action-item/20261007/og.webp
canonical: "https://iamrobin.ai/ouroboros/202610/20261007/action_item/ja/"
author: https://iamrobin.ai/#person
inLanguage: ja
languageSlug: ja
translationOf: "https://iamrobin.ai/ouroboros/202610/20261007/action_item/"
translationReview: PASS
draft: false
sourceAction: "Daily Briefing 2026-10-07, item 5"
ledgerId: AUTONOMY-ACCEPTANCE-20261007
visualHeadline: "完了には証拠が要る。"
visualSubhead: "状態 / 権限 / 結果 / 再読"
visualFooter: "成果を受け入れる"
visualNodes: "状態|権限|結果|再読"
---

結論は単純だ。自律性には受入試験が要る。高性能なエージェントが多くの手順を正しく実行しても、仕事全体は未完了になり得る。保存直前で止まり、送信を受理と誤認し、公開先が昨日の内容を返すのに成功と報告することがある。

OpenAIのIronclad事例は、コンピューター操作を検証、承認、例外処理と組み合わせる企業工程を示す。大切なのはカーソルが動く光景ではなく、結果が工程全体の審査を通ることだ。 [OpenAI Ironclad事例](https://openai.com/index/advancing-computer-use-with-ironclad/)

一人の研究部門でも、実行前に完了状態、許される権限、目的地の証拠、曖昧な状態からの復旧を定義すれば、判断を保ったまま委任できる。自律性は約束から測定可能な運用契約になる。

## 仕事を状態遷移として書く

「調べる」「更新する」「公開する」は活動を表す。状態遷移は、実行前の状態、実行後に必要な状態、変化を証明する証拠を表す。

公開作業なら、日付付き資料と草稿から始まり、四言語、候補版でのビルド合格、保護されたmainへの統合、本番展開、各正規URLの再読で終わる。草稿やローカルビルドは途中の節目である。

最後のクリックを最終結果と見なしてはいけない。ボタンは依頼を作っただけかもしれない。定義した状態を独立して読める時に完了する。読めない状態はUNKNOWNと記録し、希望を事実に変換しない。

条件は検査できる大きさにする。「サイトを良くする」ではなく、正規URLがHTTP 200を返し、日付、言語、統合済み版と一致する、と書く。

## 権限も試験対象にする

必要なページを作っても、設定変更、秘密の露出、未承認メッセージがあれば失敗だ。成果と権限は同じ契約に属する。

公開資料の読取、作業ファイル編集、ブランチとPR作成を許可し、DNS変更、購入、応募、取引を禁止する、と動詞で書く。必要な状態が生まれ、制限された状態が変わっていないことを両方確認する。

Astraの発表はコンピューター操作、管理者制御、安全監視を扱う。提供者評価は特定条件での証拠であり、個別工程の権限地図を置き換えない。 [GPT-6 Astra](https://openai.com/index/gpt-6-astra/)

権限受領票には、触れたアカウント、外部作用、変更設定、未変更の禁止領域を書く。DNS、binding、secret、アカウント設定を変えなかったことも公開成功の一部だ。

## 完了は目的地にある

ファイル、テスト、終了コードは重要だが、依頼された結果より上流かもしれない。公開記事の目的地は公開URL、メッセージの目的地は受信スレッド、保存文書の目的地は永続ストアとその再読である。

目的地証拠は三層ある。正しいURLやスレッドに着いたという同一性、期待する本文、日付、言語、版があるという内容、書込後に受理または再読できるという確認である。

ブラウザーのtimeoutは曖昧だ。送信前失敗、送信済みで応答喪失、待機中のいずれもあり得る。再実行は重複を作る。再読で解決するまでUNKNOWNにし、復旧は再クリックより観察から始める。

PR統合は本番の証拠ではない。緑の展開ジョブも全URLの正しい内容を証明しない。最後に公開先を開いて内容を照合する。

## 手順成功と受入済み仕事を分ける

五十回のtool callが成功しても、最終成果が不完全なら受入済み仕事はゼロである。手順成功は機構を測り、受入済み仕事は価値を測る。

試行数、受入数、人の介入、復旧、未解決結果を記録し、retryも分母に残す。十件中八件完了、六件介入なら両方を書く。一件が曖昧なら九件解決、一件UNKNOWNとする。

費用も受入済み成果で割る。model、tool、人の復旧時間を合計する。試行単価が下がっても、retryと審査で成果単価が上がることがある。

OpenAIのコンピューター操作ガイドは隔離環境、allowlist、重大操作の人による確認を勧める。各確認と介入は境界を見える測定点になる。 [コンピューター操作ガイド](https://platform.openai.com/docs/guides/tools-computer-use)

## 五項目の受入票を作る

第一は初期状態。日付付き入力、版、既存owner、lockを記録し、有効資料の上書きや生きているownerとの競合を避ける。

第二は権限。許可するaccountと外部作用、除外事項、escalationが必要な判断を書く。通常retryは自律化できても、支出やidentity変更や新しい公開先には別の境界が要る。

第三は目標状態。file、route、language、schema、check、receiptを可能な限り機械検査できる形にする。

第四は証拠。source、log、hash、公開応答、acknowledgementを各条件に結び、実際のrevisionに固定する。似た画面や別commitのbuildは代替にならない。

第五は復旧。timeout、部分書込、古いlock、test失敗、source欠落への動作を決める。曖昧なら観察し、不変入力を再利用し、前の作用が既知またはidempotentな時だけretryする。

## 実行前に受入試験を書く

結果を見てから基準を書くと、できた物に合わせて成功を定義しやすい。事前条件なら優れた成果は早く通り、魅力的な半完成は半完成のまま残る。

実装の全詳細を予測する必要はない。成果、境界、証拠を固定する。より良い資料や簡単なscriptや安全な復旧経路を見つけても、最終状態と権限が同じなら採用できる。

NIST AI Risk Management Frameworkは、文脈をgovernし、riskをmapし、behaviorをmeasureし、結果をmanageする考え方を示す。日次パブリッシャーの具体試験を与える文書ではないが、能力だけを孤立評価せず測定と統治を結ぶ理由になる。 [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework)

Generative AI Profileは生成系固有のriskと文書化されたcontrolを加える。小規模運用では、provenance、人の監督、failure path、claim修正の証拠に翻訳できる。 [NIST Generative AI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence)

## 失敗する経路を試す

成功経路だけで動くworkflowは補助付き実演に近い。最終書込前のnetwork断、期限切れsession、不完全な言語file、送信後timeoutを試し、停止、正確な不確実性、復旧可能状態を確認する。

劇的な混乱は不要だ。通常起こり得て、誤処理すると重複、虚偽、安全でない外部作用を生むfailureを一、二件選ぶ。

日付付きstate file、不変sourceとhash、idempotentな通知keyが再開を支える。無関係な生きたownerのlockなら止まり、自分のsupervisorなら正常な場合もある。process ancestry、date ownership、直近progressで区別する。

## 一人でできる小さな実験

有用で可逆、重大な外部作用のない週次作業を選ぶ。読み取り専用brief、local report、staging auditがよい。一つのinputを固定し、五つの受入条件を書き、人で一回、agentで三回実行する。

各runの時間、受入、介入、復旧、model/tool費用、未解決状態を記録する。情報budgetを揃え、manualの結果を見た後でagentだけに追加情報を与えない。

不採用成果も読む。弱い基準、欠けた権限、脆い復旧を示すことがある。一度に一機構を変え、同じ条件で再実行し、以前の結果を残す。

昇格条件は、権限を広げず不確実性を隠さず、受入成果を増やすか総作業を減らすことだ。実行時間が審査時間へ移るだけなら補助運用を続ける。きれいなreceiptまで返すなら徐々に範囲を広げる。

## 受領票が製品になる

信頼できる自律系は検証を容易にする。receiptにはinput hash、source、revision、test、external effect、destination check、未解決gapを書く。factとinference、完了と計画を区別できるようにする。

この規律は文章も改善する。中心claimにsource、公開claimにpublic readbackを求めれば、宣伝表現が隠れにくい。confidenceがevidenceと揃うため、成果は静かになる。

受入試験は誤りをゼロにしない。failureを読みやすくし、recoveryを限定する。一人の組織は、何を変え、何を変えず、何がUNKNOWNかを証明する仕事だけを安全に広げられる。

一枚のcardから始める。state、authority、result、evidence、recoveryを定義し、経路はagentに選ばせる。明確な受入境界の中の自由が、運用可能な自律性である。

## 分類とキーワード

**分類:** Agentic AI · Operating Systems

**キーワード:** agent受入試験、コンピューター操作、自律workflow、目的地検証、復旧、権限境界

**Hashtags:** #AgenticAI #Autonomy #AcceptanceTests #IAmRobin
