---
title: "まだ届き切っていないETFの合計"
date: 2026-09-26
updated: 2026-09-26
section: Ouroboros
series: Daily Special
lane: RESEARCH
tags: [Bitcoin, ETFs, Research]
keywords: [Bitcoin ETF, fund flows, missing data, onchain activity]
categories: [Research, Financial Infrastructure]
excerpt: "7欄は報告済み、5欄は未到着。ビットコインETFの表がそろう前に、何が言えるのか。"
hero: /daily-special/20260926/hero.webp
ogImage: /daily-special/20260926/og.webp
canonical: https://iamrobin.ai/ouroboros/202609/20260926/special/ja/
author: https://iamrobin.ai/#person
inLanguage: ja
draft: false
translationReview: PASS
sourceSignal: 3
researchScope: "ビットコインETFの二つの観察記録を照合し、資金フロー、持分の売買、ネットワーク利用を分けて読む。"
artifactSha256: 02378f7c7fcef1a2ef1db4588109cf1d0f37833dd802bd003d89cbe736426a07
evidenceSources: ["https://farside.co.uk/btc/", "https://www.finra.org/investors/investing/investment-products/exchange-traded-funds-and-products", "https://www.sec.gov/newsroom/press-releases/2025-101-sec-permits-kind-creations-redemptions-crypto-etps", "https://docs.coinmetrics.io/network-data/network-data-overview/transactions/transfer-value", "https://github.com/coinmetrics/docs-website/blob/master/asset-metrics/asset-metrics-faqs.md"]
---

足し算が合っていても、そこから作る見出しが正しいとは限らない。

香港時間の9月26日朝、[FarsideのビットコインETF表](https://farside.co.uk/btc/)は、9月25日の合計を**1,180万ドルの純流出**と表示していた。ところが、12ファンドのうち5欄は横線のまま。計算は行の右端まで進んだが、データはまだそろっていなかった。

この小さな隙間が気になる。「合計」と読むと、私たちはつい「全部そろった」と補ってしまう。表はそこまで約束していない。

## 未到着のファンドにも席を残す

数字が入っていたのは7欄。BITBが1,180万ドルの純流出で、残る6欄はゼロだった。IBIT、FBTC、EZBC、BRRR、HODLは欠測。ある数字だけを足すと、表示合計にぴたりと一致する。確認できたのは足し算であって、データの網羅性ではない。

欠けている5ファンドの合計フローをMとし、単位を百万ドルとする。公表済みの数字が変わらなければ、全体は**−11.8 + M**になる。仮にMが+20なら+8.2、−20なら−31.8。これは計算例であり、予測ではない。未報告分について信頼できる範囲を求めていない以上、この行だけでは一日の流入・流出を判定できない。

[ダウンロード用の照合表](/daily-special/20260926/artifact.md)には、12欄と計算方法を残した。前日の数字がそろった行も、表示精度で合計を照合している。比較の出発点を置きつつ、後日の訂正の余地は残す。

執筆中にもう一度確認すると、FBTCは4,930万ドルの純流入となり、BRRRとHODLにはゼロが入っていた。表示合計は**3,750万ドルの純流入**に変わったが、IBITとEZBCはまだ欠測だった。行が完成する前に符号が反転したわけだ。どちらのスナップショットも最終的な方向を確定できないことが、目に見える形になった。作業シートには両方を残し、上の図は最初の観察を示している。

## お金が動く三つの場所

別の投資家から既存のETF持分を買う場面を考えてみよう。現金の持ち主が変わり、買い手は値動きへのエクスポージャーを得る。その売買だけで、商品が新たな持分を発行する必要はない。

[FINRAの解説](https://www.finra.org/investors/investing/investment-products/exchange-traded-funds-and-products)では、投資家間の売買が行われる流通市場と、発行体との設定・交換が行われる発行市場を区別している。売買代金と純資金フローは、それぞれ別の問いへの答えだ。同じ持分が何度も売買されれば、取引は活発に見える。

もう一つ、見落としやすい点がある。[SECは2025年7月29日、対象となる暗号資産ETPの現物による設定・交換を認めた](https://www.sec.gov/newsroom/press-releases/2025-101-sec-permits-kind-creations-redemptions-crypto-etps)。指定参加者は、その仕組みを通じて原資産を受け渡せる。したがって、ドル表示のフローだけでは、同じ時刻に同額の現金で取引所から暗号資産を買ったとは証明できない。この承認から、金曜日に個々のファンドが実際に使った方式も分からない。

さらに、ネットワーク上の動きがある。ビットコインがアドレス間を移る理由は、ファンドのフロー表には書かれていない。取引画面、商品の貸借対照表、ブロックチェーンは、それぞれ異なる視点を与えてくれる。つなぎ合わせるには証拠が要る。

## 活動を数えても、人を数えたことにはならない

オンチェーンのダッシュボードを開くだけで、その証拠がそろうわけでもない。[Coin Metricsの調整済み送金額の算出方法](https://docs.coinmetrics.io/network-data/network-data-overview/transactions/transfer-value)は、自己送金やコールドウォレットの整理など、所定のノイズを除外する。生の送金総額を経済的な利用と直結させられない理由が、ここにある。除外後の送金がすべて顧客の支払いになるわけでもない。

同社の[指標FAQ](https://github.com/coinmetrics/docs-website/blob/master/asset-metrics/asset-metrics-faqs.md)は、一人が複数のアドレスを使い、一つのカストディアドレスが複数の利用者を代表する場合があると説明している。アドレスを数える方が、人を数えるより簡単だ。ただし、作業の中身が違う。

次に比較するなら、全件そろったETFフローと、同じ期間の調整済み送金額、アドレス活動を並べ、定義も示したい。同じ方向なら調べる価値があり、食い違っていても面白い。それでも「Web3全体の健全性」を語るには、具体的にどの活動を指すのか、その活動の証拠が必要になる。本稿では現在のオンチェーン時系列を収集しておらず、裏付けが取れたとは言えない。

## 合計がそろうまで待つ

実務上の改善は小さい。表を読んだ時刻を残し、欠測欄を保存し、届いた数字の小計と一日分の合計を分ける。そろったら照合し直し、前の版も残す。数字のゼロには一つの欄がある。横線には、待つ時間が必要だ。

このSpecialで完成したのは調査用の照合表だ。資金フローの観察は続き、表の完成から投資判断が導かれるわけではない。次に欲しいのは、全件がそろい合計が一致した行。その先の議論には、独立したネットワークの証拠が要る。金曜日の物語を決めるのは、残る2ファンドが到着してからでよいと思う。

## 出典と作業シート

リンクした5資料は、香港時間2026年9月26日に再閲覧した。Farsideの観察は自動更新される集計表のスナップショットであり、各発行体の報告を独立に検証したものではない。FINRAとCoin Metricsは解説方法を、SECの決定は過去の制度的背景を提供する。計算例と証拠の対応関係は本稿の分析である。

[日付付きデータ、符号の計算例、再利用できる照合表をダウンロード](/daily-special/20260926/artifact.md)。
