---
title: "AI研究所には封印試験が要る"
date: 2026-10-08
updated: 2026-10-08
section: Ouroboros
series: Daily Action Item
categories:
  - Agentic AI
  - Research Systems
tags:
  - AI Research
  - Evaluation
keywords:
  - sealed evaluation
  - agent memory
  - research agents
excerpt: "保持した経験が固定予算で未知の仕事を改善した時にだけ、研究エージェントは学習したと言える。"
hero: /action-item/20261008/hero.webp
ogImage: /action-item/20261008/og.webp
canonical: "https://iamrobin.ai/ouroboros/202610/20261008/action_item/ja/"
author: https://iamrobin.ai/#person
inLanguage: ja
languageSlug: ja
translationOf: "https://iamrobin.ai/ouroboros/202610/20261008/action_item/"
translationReview: PASS
draft: false
sourceAction: "Daily Briefing 2026-10-08, item 5"
ledgerId: SEALED-EXAM-20261008
visualHeadline: "答えを封じる。"
visualSubhead: "予算 / 課題 / 記憶 / 証拠"
visualFooter: "学習を試す"
visualNodes: "予算|課題|記憶|証拠"
---

結論は厳しい。保持した経験が、訓練、検索、採点のどこからも答えを見られない課題で性能を改善した時にだけ、AI研究所は学習したと言える。長いmemory、流暢な報告、多数のagentは進歩に見える。決定的な証拠は、総予算を固定し、課題を隠し、独立採点を行い、memoryを外したablationも実施する封印試験である。

OpenAIのJump Trading事例は長時間動くmulti-agent研究を紹介する。BioStudyBenchは25件の生物医学再現課題を設計し、分析と既知の答えの検索を分けようとする。どちらも有用な仕組みを示すが、昨日の経験が今日の未知課題を改善したかは別に試さなければならない。 [OpenAI Jump Trading](https://openai.com/index/jump-trading/) [BioStudyBench](https://arxiv.org/abs/2610.07614)

この記事で確定したのはprotocolだけである。RobinOSで封印試験はまだ実行しておらず、結果もない。「設計済み」と「実験成功」を分けることが最初の試験になる。

## 答えの漏洩はmodelより先に起きる

研究評価は、答えがsystemの手の届く所にあるだけで静かに壊れる。modelが論文を訓練で記憶し、後日の要約を検索し、repositoryの名前や期待されるchartから結論を知り、共有noteから前のagentの答えを受け取ることがある。正答しても、測りたい研究過程が起きたとは限らない。

BioStudyBenchは文献の締切、data、toolを制限し、歴史的にあり得る情報境界を作る。[BioStudyBench](https://arxiv.org/abs/2610.07614) 各課題には作成日、source packet、検索締切、不変IDとhashが要る。どのmemoryを読み、どのURLやfileを開いたかも残す。

出所の境界がなければ、学習という主張はtransferの証拠ではなく能力の物語に留まる。

## Memory方針を固定してから課題を開く

比較するsystemとmemory方針を先に固定し、その後にheld-out課題を開く。順序を逆にすると、operatorは答えに合わせてprompt、例、検索規則を調整できる。

評価runの外でtask poolを作り、各課題にhashを付ける。次に三つの条件を固定する。memoryなしsingle agent、memoryなしmulti-agent、同じmulti-agentにcurated memoryを加えたものだ。base instruction、tool、source access、総予算は同じにする。

新しさは言い換えではなくmechanismに置く。同じ計算で会社名だけ変えるとtemplate再利用を測る。AI基盤で学んだ証拠規則をrobot製造へ移せるかなら、cross-domain learningに近い。

## 総予算は一つにする

五つのagentが各五回検索すれば、一つのagentが五回検索するより多くの情報と計算を使う。この差をemergenceと呼ぶ前に分母を揃える。

token、API費用、wall-clock、tool call、人の時間を並べて保存する。retry、手動修復、clarification、rescue promptも予算に含める。上限を使い切った結果は未解決または不合格のままにし、静かにbudgetを更新しない。

Haiku 5.5の低料金はsubagentを使いやすくする一方、reviewとretryが増えれば受入済み研究の単価は上がり得る。[Anthropic Claude Haiku 5.5](https://www.anthropic.com/claude-haiku-5-5) token単価よりaccepted outcomeの経済性を見る。

## 二つではなく三つのsystemを比べる

第一はmemoryなしsingle agentで、単独の有能な研究者の基準を作る。第二はmemoryなしmulti-agentで、役割分担、並列検索、内部反論の価値を測る。第三は同じmulti-agentにcurated memoryだけを追加する。

両方のmulti-agentがsingle agentを上回れば、coordinationが寄与した可能性がある。curated memoryがmemoryなしmulti-agentも上回って初めて、保持経験の追加効果が見える。memory条件だけに良いtoolや多いbudgetを与えてはいけない。

memoryは手順、過去の失敗、source品質規則、短い例を含み、held-out課題の答え、締切後の記事、今回の採点意見を除く。無関係な過去memoryを同量入れるrandom-memory controlも有効だ。

## 文章ではなく研究を採点する

流暢な文章は弱い研究を完成品に見せる。採点は事実精度、source品質、重要な代替説明、不確実性、計算再現性、意思決定への有用性を先に見る。

「sourceが良い」は検査できない。「重要な数字が一次資料へlinkし、日付が一致し、矛盾は解消または未解決と明示される」なら検査できる。出力を匿名化し、順序をrandomにして、system名を知らずに主採点を行う。

架空source、欠損値の隠蔽、未承認の外部作用、虚偽の完了報告はboundary failureである。美しい他の段落と平均して消してはいけない。

## Memoryを外して差を見る

memory ablationが中心になる。同じarchitectureでcurated memoryの有無だけを変え、課題、budget、tool、gradingを固定する。一回の差だけでは因果を証明できないが、想定mechanismを除いた時に優位が消えるかを確かめられる。

複数課題と複数seedで分布を報告し、最良runだけを選ばない。どのmemoryを実際に取得したかも見る。良い教訓を使わない場合も、正しい規則を別domainへ誤用する場合もある。

反復失敗は別ledgerにする。三条件が同じ誤りをすればsource accessかrubricの問題かもしれない。memory条件だけが古いframeを繰り返せば、経験がbiasとして固定された可能性がある。

## 研究、system学習、distributionを分ける

一つの実験でも三つのscorecardを保つ。Quant Labは結論の精度、再現性、意思決定価値を見る。RobinOSは手順transferと総労力を見る。SunTVやiamrobin.aiは読者がmechanismを理解し、良い質問を返すかを見る。

人気は研究を検証せず、研究得点はOSの学習を証明せず、system学習はcapital actionを許可しない。protocol設計、実験実行、memory効果、読者理解には別々のreceiptが必要だ。今日は最初の一つだけが成立する。

distribution試験は同じ証拠から二つの説明を作り、impressionだけでなく実質的訂正、質問、再訪を見る。読者反応で研究gradeを後から変えない。

## 最初の封印試験

小さく再実行でき、判断を必要とする課題から始める。例として、締切前の公開一次資料だけで二つのAI基盤projectのdelivery riskを比較する。

entityとdate、重要数字の一次source、欠損値、重複排除、反証観察、再現計算、限定結論、権限維持、source packet、他者が検査できるartifactを事前条件にする。少なくとも五つのheld-out課題を使い、可能なら複数seedを走らせる。

promotion条件も先に書く。curated memoryはboundary failureを増やさず、accepted scoreの中央値を上げ、総budget内に収まり、複数課題で安定して優位な時だけ採用する。文章だけ良くなった場合は結論を保留する。

## 何が学習の証拠になるか

説得力ある結果は簡潔だ。日付とhashを持つtask setがsystem固定まで隠され、三条件が同じ総budgetを使う。独立採点でcurated memoryが受入済み研究を繰り返し改善し、memoryを外すと優位が減る。複数課題とseedで再現し、人のrescueとboundary failureは増えない。

それより弱い結果には狭い名前を使う。良い文書はeditorial improvement、速いrunはefficiency observation、多いnote検索はsystem behavior、provider benchmarkはその条件での外部証拠である。

否定的結果も価値を持つ。投資すべき場所がmodel、coordination、source access、memory curation、evaluation、recoveryのどこかを示すからだ。封印試験を通らないmemoryはarchiveである。archiveは有用だが、learningと呼ぶ必要はない。

## カテゴリーとキーワード

**Category:** Agentic AI · Research Systems

**Keywords:** sealed evaluation, agent memory, research agents, memory ablation, fixed-budget comparison, unseen tasks

**Hashtags:** #AgenticAI #AIResearch #Evaluation #RobinOS #IAmRobin
