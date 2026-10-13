---
title: "アトミック決済でも、間違った取引は決済できる"
date: "2026-10-13"
updated: "2026-10-13"
section: "Ouroboros"
series: "Daily Special"
lane: "RESEARCH"
tags: ["Solana", "決済", "金融インフラ"]
keywords: ["DVP", "アトミック決済", "Solana DvP", "法的ファイナリティ"]
categories: ["リサーチ", "金融インフラ"]
excerpt: "一つのtransactionは片渡しを防げる。しかし、ticketが正しいかまでは教えてくれない。"
hero: "/daily-special/20261013/hero.png"
ogImage: "/daily-special/20261013/og.png"
canonical: "https://iamrobin.ai/ouroboros/202610/20261013/special/ja/"
author: "https://iamrobin.ai/#person"
inLanguage: "ja"
draft: false
translationReview: "PASS"
sourceSignal: 4
researchScope: "Solana FoundationのDvP programを、permissionlessな作成から両legの入金、atomic settlement、reclaimまでsourceとstate machineでread-only追跡し、upgrade権限、条件確認、法的finalityの境界を整理する。"
artifactSha256: "697dbecc61e526a770c6ab5a65afc3ed6928e81061d81aea07d934bfa0d23956"
evidenceSources: ["https://solana.com/news/solana-foundation-launches-solana-dv-p-an-atomic-settlement-program-built-for-financial-institutions", "https://solana.com/docs/defi/dvp-program", "https://github.com/solana-foundation/dvp/tree/df9919ed02c25a93620e7f6820107c9050ce3b92", "https://cantina.xyz/portfolio/fe870bb4-d96d-4902-8aec-9dfcfa2d6a79", "https://solana.com/delivery-vs-payment/demo"]
---

テーブルの上に、鍵のかかった箱が二つあると想像してみる。一つにはtokenized asset、もう一つには代金が入っている。緑のボタンは一つだけ。押せば、二つの箱が同時に相手へ開く。片方でも詰まれば、どちらも開かない。

これがdelivery versus paymentの最もきれいな約束だ。資産を渡したあとで、cash legが昼食に出かけたままだと気づく事態を防ぐ。

Solana Foundationの新しいDvP programは、この約束を再利用できるonchain escrowにした。資産と代金は一つのtransactionで一緒に動くか、まったく動かない。[Solanaの発表][1]は、これをprincipal riskの除去と説明している。

ところが仕組みの最初の一行を読むと、もっと面白い話が出てくる。取引ticketは、誰でも作れる。

当事者の代わりに署名できるわけではない。tokenを奪えるわけでもない。ただし、当事者、金額、settlement authority、受取先を書いたonchain recordを作ることはできる。作成はpermissionlessで、当事者はこの段階に署名しない。

つまり、machineは完全にatomicでありながら、間違ったticketを持っている可能性がある。

## 魔法のボタンではなく、四つの場面

このprogramを理解する一番簡単な方法は、動きをゆっくり再生することだ。

**Frame 1：作成。** payerが458-byteのtrade record、空のescrow token account二つ、そしてnonceの小さな永久markerを作る。assetもpayment tokenもまだ動かない。recordには、二当事者、二つのmint、二つの金額、settlement authority、最早settlement時刻、expiry、両方のdelivery destinationが入る。[Program guide][2]

作成者は誰でもよい。少し不穏に聞こえるが、このrecordは提案ticketであって、同意の証明ではない。意味のあるcontrolは次に来る。

**Frame 2：片方だけ入金。** asset側はrecordを読み、合意済みのtradeと照合し、通常のchecked token transferで自分のtokenをescrowへ送る。もう一方の箱が空ならsettlementは失敗する。programは`LegNotFunded`を返し、テーブルを越えるものはない。

入金した側も閉じ込められない。自分のlegをreclaimできる。一つのescrowを本人へ戻し、tradeはopenのまま残るので、単なるtiming問題なら再びfundできる。

**Frame 3：両方が入金。** 二つのescrowがrecord上の金額以上を保有する。それでもtokenはまだ相手に届いていない。settleできるsignatureを持つのはrecordに書かれたauthorityだけだが、settlement前なら各当事者は自分のlegを引き戻せる。authorityはcancelでき、どちらの当事者もtrade全体をrejectできる。

ここで「atomic」という言葉を少し修正したい。atomicはautomaticではない。最後の変化がどう一体化されるかを示すのであって、誰かが必ずボタンを押すという意味ではない。

**Frame 4：settlement。** authorityが一つのtransactionに署名する。programはasset amountをbuyerの保存済みdestinationへ、payment amountをsellerのdestinationへ送る。余分なdepositは元の当事者へ返し、最後にtrade recordと二つのescrowを閉じる。すべてのtransferとcloseが成功するか、transaction全体がrevertして直前のstateが残る。

別のFrame 4もある。unwindだ。当事者が一方のlegをreclaimする。authorityがcancelする。あるいは当事者がrejectする。recordが閉じた後に遅いfunding transferが届いた場合は、別のrecover instructionで取り戻せる。永久nonce markerが残るため、同じaddressを新しい条件で開き直し、遅れて届いたdepositを奪うことはできない。

[Research card](/daily-special/20261013/artifact.md)には、各state、signer、次の動き、必要なcheckを並べた。

## 一番鋭い場所は取引票にある

program addressはidentityから導かれる。authority、二当事者、二つのmint、そしてnonceだ。経済条件はaccount内部に保存され、addressそのものには組み込まれていない。

この分離はinterfaceを柔軟にする。一方で、escrow addressだけを見ても、custodianは価格、期限、受取先のどれに同意しようとしているのか分からない。

fundする前に、各当事者はaccountを読み、それがDvP program所有であること、長さが正確に458 bytesであること、そして当事者、mint、金額、時刻、destinationが合意と一致することを確かめる。settlement authorityも署名前に同じ確認を繰り返す。Solanaのgenerated clientにはownershipとlayoutを確認するchecked readerがあるが、経済条件の比較はcallerの責任だ。[Funding guide][2]

これは実装上の脚注ではない。atomic settlementと、間違ったものをatomicにsettleすることの境界線だ。

文書で最も有用な一文は、最も地味な一文かもしれない。recordはagreementの証明ではない。

## セキュリティ審査を読むと、不思議な家具の理由が分かる

Cantinaは5月に、このcodeの前身をreviewした。公開reportにはmedium findingが四件あり、すべて修正済みだ。より低いseverityの項目には、修正済みのものとacknowledgedのものがある。[Cantina report][4]

それを読むと、現在のdesignにある妙に具体的な仕掛けが理解できる。

なぜtradeを閉じた後もnonce markerを永久に残すのか。以前のdesignでは、古いfunding transferがまだ飛んでいる間に、同じaddressを新しい条件で再作成できたからだ。markerはnonceを一回限りにする。

なぜexpiry後も一方の当事者が自分のlegだけをreclaimできるのか。両方のrefundを一つのall-or-nothing pathに強制すると、一方のtokenの問題が、正常なもう一方までlockするからだ。

なぜsettlementは小さなsurplusまで気にするのか。該当tokenを持つ誰かがescrowへ少量を追加できる。その余分はrefundされる必要があり、refund accountが存在しなければatomic settlement全体が失敗する。資金がひそかに盗まれるわけではないが、settlement windowを逃してunwindが必要になることはある。

Atomicityは生産的なほど容赦がない。半分だけの結果を拒む。その代わり、一つのsub-stepの故障が全体を止める。

## 三種類の信頼は残る

一つ目は**code governance**だ。

programはdevnetでもmainnet-betaでもupgradeableである。10月13日、私はread-onlyのfinalized RPCで、公開されたprogram IDが両networkに存在することを確認した。観測したupgrade authorityもSolanaの文書と一致した。これは現在のcontrol pointを示す証拠だが、deployed byteがpublic sourceと一致する証明ではない。

機関はまだ尋ねる必要がある。upgrade keyを誰が管理するのか。変更はどう通知されるのか。upgrade時のopen tradeはどう扱われるのか。deployed binaryは独立にreproducible verificationされたのか。「open source」と「verified deployment」は関係しているが、同じ意味ではない。

二つ目は**ticketとtokenの真実性**だ。

Atomicityが守るのは、escrowされた二つのlegの交換である。その元になったoffchain orderを検証するわけではない。tokenに組み込まれた権限も消えない。freeze authorityはescrowを凍結できる。pause authorityは移動を止められる。permanent delegateはtokenを動かせる。transfer hookは追加accountを要求し、transferを拒否できる。programはいくつかの危険な構成を拒み、settlement時にも重要なmint propertyを再確認するが、issuer authorityを無効にはできない。

三つ目は**legal finality**だ。

guideは、transactionがSolanaの`finalized` commitmentに達した時点でonchain settlementを記録するよう求めている。同時に、legal finalityは当事者間契約と適用法制に依存すると正しく明記している。

programはorder matchingもprice discoveryもnettingもKYCも行わず、holder eligibilityも判断しない。「cash」tokenが額面で償還できる保証も、asset tokenが法的にenforceableな権利を表す保証もない。正確なruleで二つのtoken balanceを動かす。法の世界は、そのbalanceが何を意味するかを別に決めなければならない。

## 動いたもの、動かなかったもの

このprogramの中心的な成果は、本物であり、範囲が狭い。両legがfundされ、有効なsettlement transactionが実行されれば、一方の合意済みlegだけが動き、もう一方が動かないstateは存在しない。除去されるのは、特定のprincipal riskである。

Liveness risk、issuer risk、upgrade risk、operational verification、legal interpretationまで消えるわけではない。むしろexchange logicが小さくなったからこそ、それらのcategoryが見えやすくなる。

私はsponsored devnet demoを実行せず、identityを作らず、test tradeも送信しなかった。commit `df9919e`の公開sourceとstate machineを追跡し、auditを読み、public RPCでlive program accountとupgrade authorityを確認した。buildを再現せず、deployed binaryとのbyte-for-byte一致も証明していない。

この境界も結果の一部だ。demoは一つのhappy pathが通ることを示す。mechanism mapは、機関が毎回何を確認すべきかを示す。

緑のボタンは役に立つ。ただし、押す前にticketを読もう。

[1]: https://solana.com/news/solana-foundation-launches-solana-dv-p-an-atomic-settlement-program-built-for-financial-institutions
[2]: https://solana.com/docs/defi/dvp-program
[3]: https://github.com/solana-foundation/dvp/tree/df9919ed02c25a93620e7f6820107c9050ce3b92
[4]: https://cantina.xyz/portfolio/fe870bb4-d96d-4902-8aec-9dfcfa2d6a79
[5]: https://solana.com/delivery-vs-payment/demo
