---
title: "トークンは動く。原証券はDTCに残る。"
storySlug: "the-token-moves-the-underlying-stays"
date: "2026-11-14"
updated: "2026-11-14"
lane: "BUILD"
excerpt: "DTCCの設計は証券そのものをチェーンへ移さない。DTCに残したまま、同じ権利を持つ1対1裏付けのデジタルツインだけを登録済みウォレット間で動かす。"
hero: "/binary-stories/the-token-moves-the-underlying-stays/hero.webp"
ogImage: "/binary-stories/the-token-moves-the-underlying-stays/og.webp"
keywords: ["DTCC", "DTC", "証券トークン化", "デジタルツイン", "Canton", "Solana"]
canonical: "https://iamrobin.ai/binary/stories/the-token-moves-the-underlying-stays/ja/"
inLanguage: "ja"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202611/20261114/special/"
sourceArtifactSha256: "f56fc2049471b885ce2af3186572c772e2bb29dd8366512ec02f35d3e4ee403e"
carouselPdf: "/carousels/the-token-moves-the-underlying-stays.pdf"
carouselCaption: "/carousels/the-token-moves-the-underlying-stays.txt"
carouselPages: 7
draft: false
---

トークンは動く。原証券はDTCに残る。

証券のトークン化は、「資産そのものをブロックチェーンへ移す」話として語られがちだ。DTCC Tokenization Serviceの設計は違う。原証券はDTC（The Depository Trust Company）に残る。ネットワーク上に置かれるのは、原証券に1対1で裏付けられ、同一の法的・経済的権利を持つトークン化された権利、つまりデジタルツインだ。

## 一つの資産、二つの層

デジタルツインは、証券を二重に発行するという意味ではない。価値の根拠は、DTCに残る原証券との1対1の対応にある。一つの層が原証券を保管し、もう一つの層が参加者の権利を表現して動かす。

トークンは単なる使い捨ての受領書でもない。DTCCによれば、表章する証券と同じ所有権、投資家保護、経済的権利を保持する。トークンを焼却すれば権利はDTCの従来記録へ戻り、移転すれば別の承認済みウォレットへ渡る。

![原証券はDTCに残り、1対1で裏付けられたトークン化権利が登録済みウォレットの管理されたネットワーク上を動く。](/binary-stories/the-token-moves-the-underlying-stays/hero.webp)

保管庫を取り替えるのではない。既存の保管庫に、厳格に管理された別の扉を付ける設計である。

## 公開レールにも招待者名簿はある

重要なのは「登録済み」という条件だ。誰でも参加できる暗号資産市場を作るのではない。現在の製品資料では、適格なDTC参加者がDTC登録済みウォレットを使う。

公開実行と公開アクセスは別の設計判断である。将来、トークンがSolanaのような公開ネットワークを通っても、サービス側は誰が保有でき、どのウォレットが受け取れるかを制御できる。

ただし、Solana向けの最終仕様はまだ公表されていない。現在のDTS境界を将来の接続にも当てはめるのは、既存設計からの推論であり、実装済みシステムの観察ではない。

## 本番稼働は現在形——ただし別のレールで

サービスは現在、CantonとDTCCのプライベートBesuで本番稼働している。7月の本番活動には30社超が参加した。10月のローンチ時点では20のDTC参加者がアクセス契約に署名し、150社超が開発に意見を寄せていた。

これらは同じ数字ではない。開発への参加はアクセスではなく、契約署名は取引完了ではない。本番活動への参加も、全社が取引した証拠にはならない。

それでも、保管層とウォレット層を分ける仕組みが概念図を越え、本番環境へ入ったことは示している。

## Solanaは未来形

Solanaとの接続は11月12日に発表され、DTCトークン化資産の提供見込みは2027年後半である。

凍結した公開証拠には、公式に帰属できるDTSのSolanaプログラム、明示された本番クラスター、DTS注文から確定済みネットワーク署名まで追える参加者取引がない。DTCCの一般API資料は注文、ウォレット、取引IDを説明するが、Solana発表より前の文書であり、統合済みであることは示さない。

現在形の成果はCantonとプライベートBesuにある。Solanaはロードマップにある。

## 経済効果はまだ仮説

流動性の向上、コスト低下、担保効率の改善は、DTCCが掲げる方向である。しかし今回の資料に測定結果はない。最初のSolana取引が証明するのは新しいレールが動くことまでだ。安く、速く、流動的かを判断するには、反復取引、比較可能なコスト、明確な基準線が要る。

この仕組みの面白さは、証券を誰が保管するかと、権利をどう動かすかを分けた点にある。DTCという保管の錨を残したまま、デジタル権利の移転方法を拡張する。

トークンは動く。

原証券はDTCに残る。

---

**出典：** DTCCの[Tokenization Service開始発表](https://www.dtcc.com/press-releases/2026/dtcc-tokenization-service-goes-live)、[製品ページ](https://www.dtcc.com/products-and-services/digital-assets/tokenization)、[7月の本番活動報告](https://www.dtcc.com/press-releases/2026/dtcc-turns-tokenization-into-reality)、[Solana接続計画](https://www.dtcc.com/press-releases/2026/dtcc-tokenization-service-to-connect-with-solana)、およびハッシュで固定された[元のDaily Special](https://iamrobin.ai/ouroboros/202611/20261114/special/)。運用、参加、目標日は企業発表に基づく。証券取引やトークン化、参加者口座へのアクセス、企業への連絡は行っていない。
