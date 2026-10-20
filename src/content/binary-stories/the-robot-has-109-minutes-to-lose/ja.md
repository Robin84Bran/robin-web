---
title: "ロボットが失えるのは109分"
storySlug: "the-robot-has-109-minutes-to-lose"
date: "2026-10-20"
updated: "2026-10-20"
lane: "BUILD"
excerpt: "90/9の電池サイクルが、理想的な稼働上限と20時間の作業目標の間に残すのは約109分。その余白でシフト全体が実力を証明する。"
hero: "/binary-stories/the-robot-has-109-minutes-to-lose/hero.webp"
ogImage: "/binary-stories/the-robot-has-109-minutes-to-lose/og.webp"
keywords: ["Digit 5", "ロボット稼働率", "急速充電", "シフト運用"]
canonical: "https://iamrobin.ai/binary/stories/the-robot-has-109-minutes-to-lose/ja/"
inLanguage: "ja"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202610/20261020/special/"
sourceArtifactSha256: "996dc33d47da5b4c7e54d570518e0ed52b7500812657aae2ee4fab4aa424a4f4"
carouselPdf: "/carousels/the-robot-has-109-minutes-to-lose.pdf"
carouselCaption: "/carousels/the-robot-has-109-minutes-to-lose.txt"
carouselPages: 7
draft: false
---

9分と聞けば、充電の話に思える。

実際には、24時間の運用物語の最初の一文だ。

Agility Roboticsによれば、Digit 5は90分動き、9分で充電し、1日に20時間を超える生産的な作業を行う予定だ。電池の算数は、驚くほど明快な試験をつくる。理想的な90/9のリズムなら、ロボットは1日に約 **21時間49分** 動ける。20時間ちょうどを目標の下限とすると、二つの数字の間に小さな余白が現れる。

そこにあるのは **109分** だけだ。

電池の時計が数えない損失は、すべてこの中に入らなければならない。

## 仕様の先で、シフトが始まる

理想的な1日では、充電は2時間11分を使う。生産的な作業が20時間なら、成果を生まない時間は合計4時間だ。理想的な充電時間を引くと、残る1時間49分が、システムのほかの部分をすべて引き受ける。

- 充電器までの往復移動
- ドッキングと位置合わせ
- 待ち行列や高温の電池
- 通路の閉塞や仕事待ち
- 計画保守、故障、復旧
- 人の介入
- 顧客が不合格にした、またはやり直したタスク

![24時間のシフトを、20時間の生産作業下限、理想的な充電時間、その他すべての損失を入れる109分の余白に分ける。](/binary-stories/the-robot-has-109-minutes-to-lose/hero.webp)

この109分は実測された停止時間ではない。20時間を下限として導いた予算であり、表計算が照れるほど都合のよい仮定に立つ。ロボットは常に準備済み。充電器は常に空き、仕事は常に待ち、ドッキングには一秒もかからない。

現実は同じ予算を受け取るが、その親切は受け取れない。

## フリートは同じ予算を一緒に使う

1台のロボットは、理想条件で充電器の時間の9.1%を使う。到着が完全にずれていれば、5台で1台の充電器の45.5%、10台で90.9%、11台で100%になる。ドッキング、ばらつき、故障に使える時間はまだ一分も入っていない。

これは推奨するロボット対充電器比ではない。AgilityもDigit 5の顧客向け比率を公開していない。役に立つのは境界を示し、「急速充電」の意味を変えるからだ。高速な電池は予備ロボットを減らせるかもしれない。一方で、フリート全体が一つの待ち行列を通じて、節約した時間を静かに返してしまうこともある。

設計単位はロボットだけではない。同じシフトを通るロボット、充電器、経路、タスクキュー、復旧手順を一つの系として扱う必要がある。

## 動いているだけでは、受領印にならない

Agilityは、以前のDigitがGXOで10万個を超えるトートを運んだと報告している。この累計量は実際に公表されたものだ。ただし、予定時間、充電時間、介入、却下されたタスクが同時に示されていないため、109分の帳簿を埋めることはできない。

最も明快な分母は **予定1時間あたりの受領済みタスク数** だ。そこに、生産的な自律作業時間を並べる。前者は顧客が受け取ったものを測り、後者はシフトの時間がどこへ行ったかを示す。

この組み合わせなら、滑らかに動くロボットが、空のコンベヤー、やり直しのトート、充電待ちの列まで成果に数えることを防げる。同時に、倉庫側の遅れをすべてロボットのせいにすることも防げる。帳簿が両者を分ける。

Agility自身の導入手順も同じ方向を向いている。シフトやワークフローを拡大する前に、90日間の運用パイロットで稼働時間、スループット、信頼性を測る。ただしDigit 5はまだ開発中で、Agilityは仕様を、社内試験と量産前構成に基づく暫定推定と位置づけている。90/9のシステムと20時間という結果は、現在のところ目標であり、顧客の完全なシフト記録ではない。

急速充電が行うのは、価値はあるがもっと狭い仕事だ。事業性を完成させるのではなく、運用に小さな損失予算を買う。

次に見るべき数字は9ではない。

顧客が109分のうち、どれだけを守れるかだ。

[1]: https://www.agilityrobotics.com/content/agility-robotics-selects-nyobolt-as-its-ultra-fast-charging-battery-technology-partner-for-digit-5
[2]: https://www.sec.gov/Archives/edgar/data/2074973/000121390026107265/ea0307857-425_churchill11.htm
[3]: https://www.agilityrobotics.com/faq
[4]: https://www.agilityrobotics.com/content/digit-moves-over-100k-totes
[5]: https://www.agilityrobotics.com/solutions/digit-5

出典：Agility Roboticsの[電池発表][1]、[SEC提出の投資家向け説明会記録][2]、Agilityの[導入FAQ][3]、[10万トートのマイルストーン][4]、[Digit 5製品ページ][5]。本文の時間予算は、公表目標から導いた説明用の計算であり、実測された導入結果や施設設計の推奨ではない。
