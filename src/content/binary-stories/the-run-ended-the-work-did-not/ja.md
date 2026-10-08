---
title: "実行は終わった。仕事は終わっていない"
storySlug: "the-run-ended-the-work-did-not"
date: "2026-10-08"
updated: "2026-10-08"
lane: "BUILD"
excerpt: "きれいに停止しても、届け先が空のままということはある。信頼できるエージェントには、検収できる証拠という二本目のゴールが要る。"
hero: "/binary-stories/the-run-ended-the-work-did-not/hero.webp"
ogImage: "/binary-stories/the-run-ended-the-work-did-not/og.webp"
keywords: ["agent reliability", "acceptance tests", "destination evidence", "browser agents"]
canonical: "https://iamrobin.ai/binary/stories/the-run-ended-the-work-did-not/ja/"
inLanguage: "ja"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202610/20261008/special/"
sourceArtifactSha256: "9b8df9d0d1397439b2b5df1af18c3fc1e4c0a2bf2e16b91f05ece61a61c51cae"
carouselPdf: "/carousels/the-run-ended-the-work-did-not.pdf"
carouselCaption: "/carousels/the-run-ended-the-work-did-not.txt"
carouselPages: 7
---

配達員が戻り、完璧な道のりを語る。曲がり角はすべて滑らかで、信号はすべて青。建物に着いた瞬間まで覚えている。

問題は一つだけ。机の上に荷物がない。

この小さな逆転は、エージェントを考えるときに役立つ。実行が正常に終わっても、頼んだ仕事が見つからない、読めない、あるいは検証できないことがある。機械は自分のゴールを越えた。仕事はまだ越えていない。

## 二つの時計は別の瞬間に止まる

エージェントに次の操作がなくなれば、実行の時計は止まる。検収の時計が止まるのはその後だ。結果を約束した届け先で開き直し、実行前に決めた条件と照合できなければならない。

二つの時計は同時に止まることが多い。それでも別の時計である。

![完了した実行の先に独立した検収ゲートがある。届け先の証拠があって初めて仕事は閉じる。](/binary-stories/the-run-ended-the-work-did-not/hero.webp)

OpenAI の2025年の Computer-Using Agent 報告は、知覚、推論、行動のループを説明している。モデルは、タスクが完了したと判断するか、ユーザー入力が必要になるまで動く。同じ報告は、行動ループが何回正常終了したかではなく、名前の付いたタスク集合で成功率を測る。停止は内部の出来事で、成功は評価に属する。[Computer-Using Agent][1]

新しい Jump Trading の事例では、検収の境界がさらに明確だ。研究者が問題、環境、評価基準を定義する。長時間の仕事も監視され、重要な検証は人による受け入れで終わる。エージェントが作った取引シグナルは誤り得る情報のままで、別の厳格に管理された実行環境へ入る。研究結果は、完成したように聞こえるだけで実行権限を得るわけではない。[Jump Trading 事例][2]

## 最後のクリックの後に受領証を置く

元の Special は、読み取り専用のブラウザー調査を、事前に決めた五つの条件で検査した。三つの公開ページを開き直し、ハッシュで結び付けた記録を残した。数えられるのは、検収済みの結果が一件だけだ。障害は起きなかったので、復旧時間は測っていない。一回の成功は信頼性の比率ではない。[元の Special][3]

設計上の工夫は単純だ。「検収」を独立した状態にする。

1. タスク、権限、届け先、証拠を先に決める。
2. その境界内でエージェントを動かす。
3. 届け先を独立に開き直す。
4. 結果を事前の条件と照合する。
5. `ACCEPTED`、`REJECTED`、`UNKNOWN` を記録する。正常終了を配送証拠に置き換えない。

二本目のゴールは、面白い作業の後に加える官僚主義ではない。仕事が初めて、ほかの誰かにとって現実になる瞬間だ。

配達員の旅が素晴らしかったとしても、私は机の上の荷物を見たい。

[1]: https://openai.com/index/computer-using-agent/
[2]: https://openai.com/index/jump-trading/
[3]: https://iamrobin.ai/ouroboros/202610/20261008/special/
