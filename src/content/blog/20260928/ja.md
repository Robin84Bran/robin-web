---
archiveStatus: "PIPELINE"
title: 自分の資金調達を食べた戦略
date: 2026-09-28
updated: 2026-08-21
section: Ouroboros
series: Blog
lane: BUILD
tags:
- Quant Lab
- Arbitrage
- Trading Costs
keywords:
- spot perp arbitrage
- funding rate
- trading fees
- slippage
- shadow trading
categories:
- Build
- Quantitative Research
- FinTech
excerpt: 正のグロス資金調達収益を得た shadow 裁定が、手数料、スリッページ、データ不良による回転で何倍もの価値を失った。
hero: /blog/20260928/hero.webp
ogImage: /blog/20260928/og.webp
canonical: https://iamrobin.ai/ouroboros/202609/20260928/blog/ja/
author: https://iamrobin.ai/#person
inLanguage: ja
draft: false
sourceDossier: research-dossier.md
voiceCheck: PASS
mediumUrl: null
linkedinUrl: null
thesis: 手数料、スリッページ、キャッシュフロー時点、運用回転を取引前に認めるまで、裁定シグナルの経済性は完成しない。
languageSlug: ja
translationOf: https://iamrobin.ai/ouroboros/202609/20260928/blog/
translationReferences:
- https://iamrobin.ai/ouroboros/202609/20260928/blog/
- https://iamrobin.ai/ouroboros/202609/20260928/blog/zh-hans/
translationReview: PASS
---

## 正の carry、負の事業

戦略は**正のグロス資金調達収益とベーシス**を得た。それでも診断用 shadow 台帳では約 **4,752 USDT** を失った。

算数は残酷だった。独立した mainline と challenger の台帳で、2,389 件の仮想ポジションが約 283 USDT のグロス funding と basis を生んだ。手数料が約 4,778 USDT、モデル化したスリッページがさらに 258 USDT を消費した。

取引アイデアは、取引という事業が入ってくる前だけ儲かっていた。

現物・無期限先物裁定には美しい説明がある。現物を買い、perpetual を売り、方向エクスポージャーを相殺しながら funding を受け取る。画面に利率が出ると、頭はすぐ年率換算し、機会は家賃に見える。

そこへ四本の取引レッグが入ってくる。

現物を開く費用、perpetual を開く費用、現物を閉じる費用、perpetual を閉じる費用。スプレッドとスリッページも請求書へ加わる。古いデータで早期退出と再入場を繰り返せば、意味のある funding を受け取る前に往復費用を何度も払う。

funding は消えていない。戦略が食べたのだ。

## 人気の式には会社が欠けていた

最初の式は取引らしく見えた。

`funding + basis convergence = expected return`

意思決定級の式は会社に近い。

`settled funding + realizable basis − fees − slippage − operational churn = fully net result`

各項に証拠が要る。

funding は実際の取引所時刻で決済される。basis convergence には退出経路が要る。手数料は四レッグと執行階層で決まる。スリッページはサイズと流動性、運用回転は古い・欠けたデータへの応答で決まる。

初期 shadow では複数の穴が設定と実装へ隠れた。一経路はモデル上のネット年率が負でも候補を許可した。別経路は正の entry floor を掲げながら、コードが exit threshold を読んだ。過去スキャナ記録には `next_funding_time` がなく、実際の決済イベントを証明せず funding を連続按分した。

個々には技術的な小問題に見える。合わさると裁定物語を高コスト回転機械へ変えた。

## 最も高価な取引はゼロ分だった

一つの経路で stale data によるゼロ時間退出が 974 件あり、stale または unhealthy data に結び付く退出は計 1,806 件だった。

どんなバックテストの Sharpe ratio より重要なパターンである。

ゼロ時間ポジションには funding を稼ぐ時間がほぼない。それでも往復費用は払える。スキャナが同じ候補を再発見すれば、また払う。システムは稼働を機会と取り違え、不確実性を売買回転へ変える。

逆向きの operational alpha だ。取引所が稼ぎ、戦略は同じ授業料を繰り返し払う。

修復はシグナル品質を越えた。入場前に継続性ゲートを置き、一部の市場品質退出には debounce を加え、欠損や無効 funding のような本当に危険な状態では即時退出を維持した。`next_funding_time` をパイプライン全体へ通し、証拠のある決済で一度だけ funding を認識した。

中心は抑制である。欠けた時刻を埋めてレポートを滑らかにするため、carry を発明してはならない。

## 手数料は入場ゲートに置く

多くのシステムはバックテスト後に費用を計算する。最大の制約が届く前に、機会を本物に見せる順序だ。

fee firewall は経済性を入口へ移した。

仮想ポジションを開く前に、スキャナと全戦略経路が、保守的な期間内の期待 funding で四レッグ手数料、観測往復スリッページ、最低利益余裕を超えると示す。basis convergence は入場時ゼロ評価。funding 時刻が欠落・無効なら遮断し、非正 funding も遮断する。

具体的な閾値は非公開研究に属する。公開原則は他へ移せる。

> 入場後に見つかる費用は、予測の誤りである。

新しい firewall の最初の実行では、全候補が不合格で、新しい仮想取引はゼロだった。

活動を商品だと思うと失望する。商品が意思決定システムなら、経済的に適格な判断がなかったという正しい結果である。

## グロス利益は危険な安心になる

shadow 台帳には安心材料があった。グロス funding と basis は正だった。

グロス利益は弱い仕組みを延命する。仮説の一部が存在した証拠になるからだ。funding はあり、ヘッジ構造は一部を捕捉し、方向の考え方には筋があった。

商業上の問いは一段下にある。捕捉したキャッシュフローは、それを捕る機械の費用を払えるか。

取引だけの問題ではない。

AI 製品は利用が伸びても推論費用が売上を超え得る。融資事業はスプレッドが良くても獲得費と貸倒れで消える。市場型事業は GMV を伸ばしても奨励金で全取引を買っているかもしれない。ハードウェア企業は需要を報告できても、融資条件が経済性を担っている場合がある。

投資家はグロス信号から fully net cash への橋を求める。経営者は、自分の価値源を食べずに拡張できるかを問う。

今回、その橋は大幅なマイナスだった。

## 矛盾した証拠でも判断は変わる

診断結果は shadow 台帳内で確認済みだった。正確な取引所・口座経済は `CONFLICTED` のまま。fee identity、venue intent、過去 funding timing が一つの検証済み契約を共有していなかったからだ。

不確実性を逃げ道にできる。真の手数料は低いかもしれない。執行は改善するかもしれない。funding accrual model は保守的かもしれない。

システムは安全側を選んだ。既知の差異から、この規模の費用差を消す信頼できる経路は見えなかった。精密な証拠は損失額を変えても、現在の仕組みに正の fully net economics があると仮定する権限を与えない。

未知はラベルを保ちつつ、方針には参加する。fail-closed の入場規則では、費用証拠が欠ければ `HOLD` になる。無料取引にはならない。

## 失敗を中心に challenger を作る

複数の shadow challenger を作った。

一つは費用契約を照合する。一つは市場品質の悪化が続いた後だけ退出する。一つは適格性の反復を入場条件にする。共通 evaluator は funding 決済時刻を保ち、欠けたキャッシュフローの按分を止める。

発表しただけで勝者にはならない。

十分な決済件数または期間を通じた比較可能な前向き証拠が要る。初期 health check は機械が動き、新フィールドが届くことだけを示す。実装証明であり、収益性ではない。

この分離がリリース演出から研究を守る。test suite 合格は規則が実行されること、healthy daemon は観察者が生きていることを示す。市場が支払うことも、edge があることも示さない。

## 事業の問いを先に置く

事後検証は一枚で足りる。

- **売上：** 証拠のある settled funding と実現可能 basis。
- **売上原価：** 四レッグ手数料とスリッページ。
- **運用漏れ：** stale-data churn と早すぎる再循環。
- **運転資本時点：** funding 発生前に拘束する資本。
- **証拠リスク：** 未検証の決済時刻と fee identity。
- **判断：** 保守的な経済性を超えるまで入場を遮断。

構造を「裁定」と呼んでも、損益計算書は免除されない。

裁定という語は確実性を感じさせる。実装には vendor、queue、clock、部分証拠、market impact、人間の注意がある。全てが戦略から家賃を取れる。

長期的な edge は、低い費用、忍耐強い entry、良い execution、高品質 funding、別の holding horizon から来るかもしれない。今の証拠は選べない。ただし、challenger が学ぶ間に資本と観察品質を守る、という次の行動は選べる。

戦略の最初の成熟は、自分が最大の取引相手だったと知ることだった。

### 全取引前のユニットエコノミクス

入場テストを小さな橋として書く。

予定保有期間内に決済できるキャッシュフローから始め、方向と実決済日程を適用する。検証済み退出機構がなければ basis convergence はゼロ評価する。

全往復費用を引く。全レッグ、適用手数料、spread、観測 slippage、借入・融資費用。モデル誤差の余裕と、運用注意に値する最低絶対利益も加える。

保守的キャッシュフローが全費用を超える場合だけ入場する。必要値がなければ `HOLD`、経済性不合格なら `NO_TRADE`。何が判断したかも記録する。

この橋なら市場を比較できる。年率が派手でも絶対額が小さければ落ちる。低い率でも決済が安定し、流動性が深く、摩擦が小さければ通る。年率で規模や時間を隠せない。

### 将来の challenger への質問

失敗へ直接答えた challenger だけを昇格させる。

継続性は churn を減らし、unhealthy data に閉じ込めないか。実サイズ・全費用後で候補は生きるか。funding は証拠のある決済で届くか。退出方針は次の往復費用前に十分な carry を保つか。同じ前向き期間で比較できるか。

不活動も調べる。高頻度は入場を弱めただけかもしれない。待つ戦略は経済選択性を上げているかもしれない。取引件数は記述値であり、fully net result と障害挙動が判断する。

### AI インフラにも同じことが起きる

流行事業にも同じユニットエコノミクスの誤りがある。グロス需要は正でも、補助金、融資、推論、顧客獲得が価値を消費する。収入は資本需要より遅く決済され、運用 churn は持続利用なしに費用を繰り返す。

小さな shadow 裁定の教訓は拡張できる。決済現金を追跡し、全レッグへ課金し、機械が動く前に機会自身へ機械費用を払わせる。

### 毎月の経済クローズ

ラボを小さな取引会社として締める。一期間の settled funding、basis realization、fees、slippage、open exposure、data-quality exit を照合する。gross、fully net、modeled を分ける。

次に漏れを帰属する。入場品質と回転のどちらから来たか。観測費用とモデル費用は何か。設定値とコード読取値に差があるか。

工程改善を経済へ結ぶ。stale exit の減少は churn を減らしたとき、決済フィールドの改善は架空 carry を防いだとき、健全なプロセスは信頼できる証拠を増やしたときに価値を持つ。

比較可能な前向き条件で cash bridge が改善して、初めて事業は昇格できる。

### 名前は現金に従う

「裁定」は関係についての仮説だ。台帳は観察した事業を呼ぶ。funding collection、basis exposure、fee burden、execution risk。各ラベルは settled evidence で地位を得る。

語彙が戦略を謙虚にし、将来の改善で事業のどこが成立したかを示す。

費用低下や funding 品質向上が起きれば、新しい証拠期間で移行を示せる。古い損失は書き換えない。古いキャッシュフローに新しい形容詞を付けても、良い事業にはならない。

基準は、改善した決済経済、比較可能な証拠、変更から結果までの因果橋である。

それ以外は、現金検証を待つ有望な研究メモだ。

### 投資への移植

asset-light 企業を見るとき、資本を避けたのか、vendor、credit、顧客 incentive 経由で借りているのかを問う。インフラでは資産が稼ぐ前に誰が払い、稼働率が遅れたら誰が借換えるかを追う。

グロス信号には価値があり得る。投資可能性を決めるのは、必要な参加者が全て取り分を得た後にも価値が残るかだ。valuation multiple より cash bridge が先に答える。

橋が閉じなければ、成長は資本の顧客であり続ける。

市場より先に台帳が言うべきだ。

真実は入場ゲートで最も安い。

### 意思決定メモ

- **分類：** 量的研究、取引経済、運用システム
- **キーワード：** 現物・無期限先物裁定、funding、fees、slippage、stale data
- **証拠：** shadow diagnostics のみ。live trading result は主張しない
- **判断：** fee firewall を維持し、challenger 選択前に比較可能な前向き証拠を要求

#QuantLab #Arbitrage #TradingCosts #FinTech #RobinOS
