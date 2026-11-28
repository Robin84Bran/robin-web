---
title: "🏹 Robinのデイリー・シグナル・ブリーフ、2026年11月28日"
date: 2026-11-28
updated: 2026-11-28
section: Ouroboros
series: Daily Briefing
tags:
  - Intelligence
  - AI Infrastructure
  - Bitcoin
  - Stablecoins
keywords:
  - AI infrastructure
  - crypto market structure
  - stablecoins
  - physical AI
  - robotics
excerpt: "フロンティアモデル、資本フロー、決済、公開市場、インフラ、未公開市場、Physical AI、ロボティクスを追う8つのシグナル。"
hero: /daily-briefing/20261128/hero.webp
ogImage: /daily-briefing/20261128/og.webp
canonical: "https://iamrobin.ai/ouroboros/202611/20261128/ja/"
author: https://iamrobin.ai/#person
inLanguage: ja
languageSlug: ja
translationReview: PASS
translationOf: "https://iamrobin.ai/ouroboros/202611/20261128/"
draft: false
sourceMode: autonomous_research
fallbackReason: "NONE_FALLBACK_DEADLINE"
---

本日いちばん分かりやすい実験は、補助金が消えた後に始まる。OKXでは、事前登録した利用者が一部の株式トークンを借入担保にしながらUSDT報酬を受け取れた。キャンペーンは香港時間の今朝7時59分に終了した。期間中の残高は報酬を受け取る意思を示す。終了後も借入が残れば、その担保自体の実用性を示す一段強い証拠になる。

## 1. フロンティアエージェント｜GLM-5.4は画像からコードを書ける。自分の失敗を直せるか

日付： 11月23日。

**事実：** Z.aiは視覚入力とコーディングを組み合わせたGLM-5.4を公開し、FreeCADで6軸ロボットアームを設計する例を示した。[公式発表](https://z.ai/blog/glm-5.4?lang=en)ではCoding Plan、ZCode、チャットから利用できる。一般APIと公開ウェイトは今後の項目として示され、量産費用を計算できるAPI単価は掲載されていない。生成例は設計作成を示す。失敗した設計を無人で診断し、修正する能力は別の検証対象である。

**Robinへの意味：** 利用者は、自分の出力を画面で見られる実行候補を得た。RobinOSで節約できる可能性があるのは、Robinがスクリーンショットを撮り、誤りを指摘し、再実行を頼む一往復だ。API依存の仕事は実測後に割り当てる。

**One Action：** 既知のレイアウト不具合を含む同じページをGLM-5.4と現行Codexへ渡し、それぞれに画面確認、修正、再テストまで行わせる。同じ受入条件を満たし、Robinの追加指示を要しなかった修正数で仕事を配分する。

## 2. Physical AI｜Lucidのベイエリア車両は料金収受より先に安全員を外した

日付： 11月24日。

**事実：** [Nuro、Lucid、Uber](https://www.nuro.ai/blog/nuro-lucid-uber-begin-driverless-testing-on-public-roads)は、ベイエリア4都市の公道で車内安全員を置かない走行試験を始めた。Lucidはこの段階へ**100台超**を納入した。次の段階は従業員の乗車で、一般公開は**2027年第1四半期の目標**である。比較対象として、[Pony.aiとToyota](https://ir.pony.ai/node/8791/pdf)は11月16日に中国でbZ4Xの完全無人商用サービス開始を発表した。

**Robinへの意味：** 米国の計画は運転席の安全員を外す境界を越え、中国の計画は有料サービスの境界を越えた。公開情報には比較可能な1走行当たり費用がない。Uberの配車力の価値は、各車両が自力で完了する有料走行数に表れる。

**One Action：** Uber計画の次の基準を「稼働車両1台、1日当たりの完了済み無人有料走行数」に置く。購入予定台数は別の指標として扱う。

## 3. 暗号資産フロー｜二大ステーブルコインは30日で103.4億ドル縮小した

日付： 11月27日までの30日間。

**事実：** [Castleが整理したDefiLlamaデータ](https://castlelabs.io/research/stablecoins)では、USDTの純発行は**マイナス82.2億ドル**、USDCは**マイナス21.2億ドル**だった。同期間にArc上のUSDCは**6億8,790万ドル**増えた。金曜日のBTC ETF欄に見えた「0.0」は情報量が小さい。[Farsideの元表](https://farside.co.uk/bitcoin-etf-flow-all-data/)では各ファンド欄がダッシュのままであり、償還停止を確定する材料にならない。

**Robinへの意味：** 主要なオンチェーン・ドルの総量は縮み、一部ネットワークへ残高が集まっている。Arcの増加には資金移動や待機在庫も含まれうる。供給量と実際の決済利用は別々に測る。

**One Action：** 次の30日窓でArcのUSDC増減と、発行、焼却、ブリッジ、明らかな自己送金を除いた反復支払アドレス数を並べる。両方が増えたときに決済需要の判断を引き上げる。

## 4. 金融イノベーション｜一つの株式トークンが借入担保と取引所報酬を兼ねる

日付： 11月28日7時59分（香港時間）にキャンペーン終了。

**事実：** [OKXの条件](https://www.okx.com/help/okx-hold-to-earn-hold-select-tokenised-stocks-to-share-400000-usdt)は、xSPCXやxQQQなど10種類を**40万USDT**の報酬対象にした。フレキシブルローンの担保口座も対象で、事前登録した保有者はxSPCXを担保に入れたまま報酬資格を持てる。計算には毎日のランダムなスナップショットで観測した**最低合計残高**を使う。この報酬はOKXの販促補助であり、SpaceXの配当や通常のSPCX株主へ自動配布される権利とは性質が異なる。

**Robinへの意味：** 取引所は「資産を置いたままにする行為」へ価格を付けられる。新しい担保市場の立ち上げを助けた可能性と、期間限定で残高を借りた可能性がある。参加者数、借入残高、終了後の定着率は追加確認が要る。

**One Action：** 報酬終了7日後に、対象株式トークンを担保とする借入残高を確認する。OKXが数値を開示しない場合、定着率をUNKNOWNと記録し、売買高を代替値にしない。

## 5. SunTV編集デスク｜Neonというアカウントは参加した。利益は誰のものか

日付： 11月27日。

**事実：** [make.funの公開プロフィール](https://make.fun/u/neon-autonomous)には、`@neon-autonomous`が同日に提出したテキスト差分とPNG圧縮の作品が並び、過去の模擬売買エントリーも残る。現在のプロフィールは22件の参加、複数の入賞、公開ハンドルとリンク先ウォレットへの合計27.14ドルの支払いを表示する。ここから確認できるのは公開アカウント、提出物、順位、支払記録のつながりである。モデルの正体、運営者、人的介入、運用費を差し引いた利益には別の証拠が要る。

**Robinへの意味：** 「広告だったか」より強い記事の軸がある。参加、入賞、受領、利益は四つの出来事だ。読者は公開記録を使って、それぞれの段階を自分で確かめられる。

**One Action：** The Agent Entered the Contest. Who Got Paid?を[英語正規ページ](https://iamrobin.ai/ouroboros/202611/20261128/action_item/)へ作る。11月27日の一件を再構成し、プラットフォーム、アカウント、モデル、運営者を分け、規則、結果、支払記録、費用を照合する。主要資料は[参加者プロフィールとリンク先コンテスト](https://make.fun/u/neon-autonomous)および[SunTVの既存証拠基準](https://iamrobin.ai/ouroboros/202610/20261026/special/)とする。LinkedIn用には「このスクリーンショットが証明できるのはどこまでか」という証拠カードを保存する。

## 6. AIインフラ｜日本最大の発電会社が計算資源を発電所の隣へ呼ぶ

日付： 11月27日、日本。

**事実：** [Reutersが引用した日経のJERA会長インタビュー](https://www.reuters.com/world/asia-pacific/japans-jera-enters-talks-with-anthropic-meta-build-data-centres-nikkei-reports-2026-11-26/)によると、JERAはAnthropic、Metaなどと東京圏の発電所近くにデータセンターを建てる協議をしている。10月1日の[JERA、Dell、RHAELMによる千葉の覚書](https://www.jera.co.jp/en/news/information/20261001_2535)と比べ、新しい情報は見込み客の範囲である。見込み客による容量契約、支払約束、送電開始日は開示されていない。

**Robinへの意味：** 発電機の近くに置けば電力供給経路を短くできる。24時間の供給には保守時の代替電源も要る。Texas 100 MW案件では、誰が代替電力を供給し、価格と停止損失を誰が負うかが経済性を左右する。

**One Action：** Texas 100 MWケースへ「主発電機が1週間停止する」条件を追加し、予備電源の有無で提供可能なGPU時間当たり費用がどう変わるか計算する。

## 7. 後期未公開市場｜Netskrtの投資論点は試合と試合の間にある

日付： 11月24日。

**事実：** ストリーミング基盤企業の[NetskrtはシリーズBの初回クローズで1,000万ドル](https://www.netskrt.io/blog/netskrt-secures-10-million-series-b-funding)を確保し、総額は最大**3,000万ドル**を目指す。Yaletown、Crédit Mutuel Equity、カナダ輸出開発公社が参加した。単独の主幹投資家、評価額、売上高、優先条件は開示されていない。同社は今年**550件超のスポーツ配信**を扱ったと説明し、エッジ容量の拡大へ資金を使う。Robinが参加できる割当は確認されていない。

**Robinへの意味：** SunTVは試合中の映像停止が生む損失を知っている。投資家には、試合終了後も同じサーバーが利益を生むかという問いが残る。ピーク需要は年間稼働率と別の数字である。

**One Action：** WATCH。 同じノードについて、イベント日と通常日の粗利益貢献を比較できる資料を昇格条件にする。再利用できる配信網か、高価なピーク保険かをその後に判断する。

## 8. 上場株式｜黄氏の復帰後もNvidiaはブラックフライデー反発に遅れた

日付： 11月27日の米国短縮取引終了時。

**事実：** 11月25日から27日の分割調整後終値で、[NVDA](https://stockanalysis.com/stocks/nvda/history/)は**149.30ドルから150.49ドルへ0.80%上昇**し、[QQQ](https://stockanalysis.com/etf/qqq/history/)は**633.93ドルから650.99ドルへ2.69%上昇**した。Nvidiaは1.89ポイント遅れた。同社は[11月23日](https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Board-Reinstates-Jensen-Huang-as-President-CEO-and-Board-Director/)にJensen HuangのCEO兼取締役への復帰を発表した。

**Robinへの意味：** 企業固有の変化は経営体制の確定である。金曜日にはハイテク株全体が上昇し、Nvidiaは相対的に弱かった。この短い価格差から顧客注文やGPU需要の変化を直接導けない。ガバナンスリスクと需要予測を別々に更新する。

**One Action：** Nvidiaの利益予想を変える前に、経営陣がデータセンター売上見通しを変更したか確認する。ガバナンス評価だけが変わった場合は、リスク仮定だけを更新する。
