---
title: "時計は動いた。表示は動かなかった。"
storySlug: "the-clock-moved-the-quote-did-not"
date: "2026-11-05"
updated: "2026-11-05"
lane: "BUILD"
excerpt: "USDY は秒単位で価格を積み上げ始めた。それでも1トークンの表示は、より粗い表示精度によって変わらなかった。"
hero: "/binary-stories/the-clock-moved-the-quote-did-not/hero.webp"
ogImage: "/binary-stories/the-clock-moved-the-quote-did-not/og.webp"
keywords: ["USDY 継続価格", "オラクル精度", "トークン化国債", "金融インフラ"]
canonical: "https://iamrobin.ai/binary/stories/the-clock-moved-the-quote-did-not/ja/"
inLanguage: "ja"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202611/20261105/special/"
sourceArtifactSha256: "8f3784bad8f0daee1fe849d49c84cfab057ae7118532766ef8e976aed2cf1fa9"
carouselPdf: "/carousels/the-clock-moved-the-quote-did-not.pdf"
carouselCaption: "/carousels/the-clock-moved-the-quote-did-not.txt"
carouselPages: 7
draft: false
---

時計は動いた。表示は動かなかった。

2026年11月1日、Ondo は USDY の公式価格計算を、毎日 00:00 UTC に一度だけ進む方式から継続的な積み上げへ変更した。新しいオラクルは、リクエスト時刻までの収益を秒単位で計算する。それなら画面の価格も毎秒動くように思える。

しかし、小数点以下6桁の USDC で1 USDY を表示すると、そうはならなかった。

この矛盾は、金融ソフトウェアが一つの数字にまとめがちな三つの時計を分けて見せる。経済の時計、会計の時計、表示の時計である。

## 三つの時計、一つの残高

経済の時計は価値の蓄積を表す。USDY は、保有トークン数を変えずに、米国債と銀行預金資産の収益に応じて1トークンの価値が上昇するよう設計されている。

会計の時計はオラクルの規則だ。旧方式は日中の価格を固定し、深夜に一日分をまとめて加えた。新しい `ContinuousPriceOracle` は価格と年率を保持し、リクエスト時点までに経過した時間の価値を計算する。

表示の時計は出力精度で決まる。USDY オラクルは小数点以下18桁、USDC 金額は6桁を使う。Ondo が公開する換算計算は、高精度の USDY 価値を USDC に変換するとき切り捨てる。

![経済的な蓄積、オラクル会計、丸めた表示は、それぞれ異なる見える速度で進む。](/binary-stories/the-clock-moved-the-quote-did-not/hero.webp)

より精密な会計の時計は、より粗い表示の時計の下で動き続けられる。

## 消えた一秒

元の Special は、Ethereum ブロック 26,345,421 の状態を固定し、署名も送信もせずに後のタイムスタンプをシミュレーションした。選んだ深夜をまたぐと、新しい公式価格は1 USDY 当たり約 1.152259433 ドルから 1.152259434 ドルへ上昇した。一秒分は約 0.000000001345 ドルだった。

旧スケジュールは深夜に約 0.00011623 ドルを一度に加えた。どちらも蓄積を表すが、時間軸上の置き方が違う。旧方式は一日を一段にまとめ、新方式は経過秒数に沿って計算する。

表示層はその差を隠した。深夜直前、深夜、その一秒後のいずれも、1 USDY のグロス表示は **1.152259 USDC** だった。オラクル値は動いていたが、切り捨て後の次の100万分の1 USDC には届いていなかった。

価格が止まったのではない。動く価値を大きな表示単位で見ている。

## 継続会計でも画面は段階的に動く

継続的な積み上げは、深夜に一日分を集中させる人工的な段差をなくし、日中、週末、休日の計算を自然にする。しかし、表示通貨、小数桁、数量、更新頻度は別の見える境界を作る。

実装では精度を一つの性質ではなく階層として扱う。オラクル値の時刻を示し、中間計算の精度を保ち、最終的な丸め方向と桁数を定義し、実際の表示資産と数量で境界をテストする。丸めた表示が変わらないことから「蓄積なし」と推測してはいけない。

## ラッパーも時計の一部

Ondo は安定した `USDYOracleWrapper` アドレスも提供する。調査時点の Ethereum では、ラッパーは切替時刻に旧オラクルから新オラクルへリクエストを送るスケジュール切替コントラクトを参照していた。

ラッパーを使うソフトウェアは同じアドレスへ問い合わせ続けられる。現在の公式価格を必要とする旧オラクルの直接利用者は移行が必要だ。Ondo は旧オラクルを 2026年12月31日に廃止する予定としているが、11月5日の調査時点では将来計画だった。

安定アドレスは履歴価格、丸め、画面表示まで解決しない。責任を分けるだけだ。ラッパーは現在価格をどこで尋ねるかを担い、アプリケーションは高精度の答えをどう見える表示へ変えるかを担う。

## 正確だが限定された結論

読み取り専用テストが確認したのは、固定設定の下での計算機構だ。償還は実行しておらず、保有者の受取額も証明していない。手数料、資格、停止、上限、流動性、決済はテスト範囲外だった。

オラクルは毎秒数えながら、画面は止まって見える。三つの時計を分ければ矛盾は消える。経済価値は蓄積し、オラクルはリクエスト時刻で計算し、表示は丸めが許したときだけ変わる。

金融の数字が止まって見えたら、どの時計を見ているかを確認しよう。

---

**出典:** [Ondo の継続価格発表](https://ondo.finance/blog/usdy-continuous-pricing)、[USDY Price Oracle 文書](https://docs.ondo.finance/general-access-products/usdy/usdy-price-oracle)、[InstantManager 統合文書](https://docs.ondo.finance/developer-guides/usdy-instant-manager-integration)、[Ondo コントラクトアドレス](https://docs.ondo.finance/addresses)、確認済みの[コントラクトソース](https://github.com/ondoprotocol/rwa-contracts/tree/4409cdac96f26bdce584c1078aa7a968dd937dc9)、ハッシュ固定された[元の Special](https://iamrobin.ai/ouroboros/202611/20261105/special/)。
