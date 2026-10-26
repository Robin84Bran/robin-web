---
title: "満点は一日を失った"
storySlug: "the-perfect-score-lost-a-day"
date: "2026-10-26"
updated: "2026-10-26"
lane: "BUILD"
excerpt: "ダッシュボードは配信率 100% を示しながら、分母に入らなかった予定実行を消してしまうことがある。"
hero: "/binary-stories/the-perfect-score-lost-a-day/hero.webp"
ogImage: "/binary-stories/the-perfect-score-lost-a-day/og.webp"
keywords: ["スケジュール型エージェント", "信頼性の分母", "受入証跡", "Agents API"]
canonical: "https://iamrobin.ai/binary/stories/the-perfect-score-lost-a-day/ja/"
inLanguage: "ja"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202610/20261026/special/"
sourceArtifactSha256: "9c958332e94b3f43b75a4996983c3ba13f3188fdc0f0232b4732b41bfcb97bf5"
carouselPdf: "/carousels/the-perfect-score-lost-a-day.pdf"
carouselCaption: "/carousels/the-perfect-score-lost-a-day.txt"
carouselPages: 7
draft: false
---

ダッシュボードは **100%** と表示している。

記録された invocation はすべて配信済み。赤い行も失敗した試行もない。完璧な一か月だ。

ただし、カレンダーが約束した朝は三十回なのに、表には二十九行しかない。

欠けた一日は失敗していない。そもそも分母に入っていない。

こうして信頼性指標は、数学的には正しくても、運用上は誤った姿を見せる。

これは説明用の例であり、実際に観測された OpenAI の障害ではない。示したいのは、あらゆるスケジュール型システムにある測定の罠だ。存在する記録から指標を作り始めると、本来あるべきなのに存在しない記録を数えられない。

![説明用の一か月には、30 回の予定実行、29 件の記録された invocation、28 件の受入済み出力がある。欠けた一回は 100% という配信率の分母の外にある。](/binary-stories/the-perfect-score-lost-a-day/hero.webp)

## プラットフォームの記録は約束の後から始まる

OpenAI の Scheduled Automations 文書は、証拠の層を明確に分けている。schedule は予定時刻と対象を保存する。各実行は invocation を作成し、session に作業を送ろうとした試行を記録する。invocation が `completed` なら、配信は成功した。対象 session が初期入力または通知を受け付けたという意味だ。

エージェントが仕事を完了したという意味ではない。

その後、アプリケーションは session events を追う。ルート turn は完了、失敗、キャンセルのいずれかに到達する。turn が完了しても、すべてのツールが成功したとは限らないため、出力とツール結果の確認が必要だ。

これは四つの別々の事実である。

1. 実行が予定されていた。
2. invocation が記録された。
3. 作業が session に配信された。
4. ルート turn が終端状態に達した。

五つ目の事実は、タスクの所有者が決める。結果は受入ルールを満たしたのか。

難しいのは最初の事実だ。それは invocation より前に存在する。invocation 履歴は、すでに作成された invocation を説明できる。しかし、それだけでは「起きるはずだったすべて」のカレンダーにはならない。

## 正直な二つの率が食い違う

純粋な説明として、三十日ある月を考える。

- 30 回の予定実行が期待されていた。
- 29 件の invocation が記録された。
- 29 件はすべて配信された。
- 28 件の出力がタスクの受入ルールを通過した。

輸送指標は正直だ。

**配信済み invocation ÷ 記録済み invocation = 29 ÷ 29 = 100%**

成果指標も正直だ。

**受入済み出力 ÷ 予定実行 = 28 ÷ 30 = 93.3%**

一方を他方の代わりに使ってはいけない。答えている質問が違うからだ。

前者は、記録された試行が session に届いたかを問う。後者は、スケジュール上の約束が利用可能な成果を生んだかを問う。前者を「ジョブ成功率」と表示し、後者の分母を作らなければ、ダッシュボードは人を誤らせる。

また、証拠がないまま欠けた実行を OpenAI の障害と呼んではならない。原因はアプリケーション状態、監視、停止中の schedule、検索範囲、あるいは別の場所にあるかもしれない。結合を調査するまでは、原因は `UNKNOWN` だ。

## 実行前に分母を作る

最小の修復は、新しいステータス表示ではない。予定実行の台帳だ。

各実行の前に一行を作り、schedule ID と `scheduled_at` の組み合わせのような安定したキーを与える。そこから invocation、session、ルート turn、成果物、受入結果へ結合していく。

どの結果でも、その行を残す。

- invocation が見つからない。
- 配信が queued または completed である。
- ルート turn が完了、失敗、キャンセルになった。
- 出力が受入、拒否、未解決になった。
- 再試行、リプレイ、人による救済が行われた。

これで欠落が見える。invocation がない状態は、見えない穴ではなく、対応先のない予定実行になる。

同時に、遅延の起点も正しくなる。OpenAI は、定期実行には小さなランダム遅延が加わり、対象 session が処理中なら配信がさらに待つ場合があると説明している。時刻が重要なら、invocation 作成から配信までではなく、予定時刻から成果物の受入までを測るべきだ。

## 三つのスコアボードを分ける

有用なシステムは、少なくとも三つの率を別々に報告する。

**輸送：**配信済み invocation ÷ 記録済み invocation。

**実行：**終端したルート turn ÷ 配信済み invocation。完了、失敗、キャンセルを分ける。

**成果：**受入済み成果物 ÷ 予定実行。

名前が重要なのは、それぞれの率に異なる責任者と修復方法があるからだ。配信問題は、より良い文章基準では直らない。拒否された成果物は、輸送を再試行しても直らない。欠けた実行は、そもそも受け取っていない invocation 表から復元できない。

再試行にも同じ規律が必要だ。OpenAI の復旧文書は、失敗した turn がすでにファイルを変更したりツールを呼んだりしている可能性を警告している。作業を繰り返す前に、保存状態と完了済みの作用を確認する。実行キーは固定し、試行ごとに別の識別子を持たせる。そうしなければ、再試行は最初の約束の復旧ではなく、二つ目の成功に見えてしまう。

## 満点には外部の証人が要る

深い教訓は、100% が怪しいということではない。約束した仕事が本当にすべて成功することもある。

問題は、障害点の後にシステム自身が作った記録だけでは、そのシステムの完全性を証明できないことだ。

schedule には invocation 表の外側の証人が必要だ。成果物には本文の外側の受入ルールが必要だ。再試行には再試行そのものの外側の台帳が必要だ。

緑は役に立つ。しかし、緑は始まるのが遅すぎる。

分子を祝う前に、誰が日数を数えたのかを問おう。

[1]: https://developers.openai.com/api/docs/guides/agents-api/sessions/automations
[2]: https://developers.openai.com/api/docs/guides/agents-api/sessions/events
[3]: https://developers.openai.com/api/docs/guides/agents-api/observability
[4]: https://developers.openai.com/api/docs/guides/agents-api/errors

出典：OpenAI 公式文書の [Scheduled Automations][1]、[Events and Items][2]、[Observability and Usage][3]、[Errors and Recovery][4]、およびハッシュで固定された[元の Special](https://iamrobin.ai/ouroboros/202610/20261026/special/)。三十日の数値は説明用である。実測の信頼性率、遅延分布、プラットフォーム障害を主張するものではない。
