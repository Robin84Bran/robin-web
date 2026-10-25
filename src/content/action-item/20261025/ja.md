---
title: "最初の試作品は一つの問いに答える"
date: 2026-10-25
updated: 2026-10-25
section: Ouroboros
series: Daily Action Item
categories:
  - Entrepreneurship
  - One Person Company
  - Prototyping
tags:
  - Prototype
  - Simulation
  - Product Evidence
  - AI Native Company
keywords:
  - question first prototype
  - prototype evidence ladder
  - simulation validation
  - one person company
  - SimReady
excerpt: "最初の試作品は、最も安く正直な証拠段階で重要な不確実性を一つ解消して価値を得る。"
hero: /action-item/20261025/hero.webp
ogImage: /action-item/20261025/og.webp
canonical: "https://iamrobin.ai/ouroboros/202610/20261025/action_item/ja/"
author: https://iamrobin.ai/#person
inLanguage: ja
languageSlug: ja
translationOf: "https://iamrobin.ai/ouroboros/202610/20261025/action_item/"
translationReview: PASS
draft: false
sourceAction: "Daily Briefing 2026-10-25, item 5"
ledgerId: PROTOTYPE-QUESTION-20261025
visualHeadline: "一つの試作品。一つの問い。"
visualSubhead: "画像 · CAD · シミュレーション · 物理試験"
visualFooter: "磨く前に証拠"
visualNodes: "問い|最安の試験|受入|学習"
thesis: "最初の試作品は、最も安く正直な証拠段階で重要な不確実性を解消し、結果が何を変えたかを残すべきだ。"
---

美しい試作品が、まったく役に立たないことがある。

写真映えし、賛同を集めても、肝心の問いに触れていないかもしれない。手で握れるか。熱に耐えるか。機構は詰まらないか。初見の人は用途を理解できるか。問いを先に決めなければ、磨かれた物体は何でも進歩と呼べてしまう。

最初の試作品には、もっと小さな仕事が必要だ。一つの問いに答えることだ。

問いは創造性を狭めない。どこまで作ればよいか、何を証拠とするか、いつ止めるかを教える。

## 似て見える四つの物体が別の証拠を持つ

画像はアイデアが伝わるかを試せる。比率、スタイル、色、第一印象も比べられる。重さ、バランス、熱、衝撃、製造公差、反復使用についてはほとんど語れない。

CADは形状を試せる。材料を切る前に部品を測り、組み、衝突を調べ、修正できる。[OpenUSD](https://openusd.org/release/index.html)は形状と組立構造を複数ツール間で保てる。それでも形状だけでは有効な物理挙動にならない。

シミュレーションは、明示した現実モデルを試す。[SimReady Foundation](https://nvidia.github.io/simready-foundation/)はシミュレーション資産のプロファイルと検査を定義する。[NVIDIAのCAD-to-SimReady例](https://developer.nvidia.com/blog/5-steps-to-create-simready-assets-for-robotics-with-frontier-ai-models/)はABB YuMiのCADから始まり、外観、衝突形状、関節、質量、摩擦、駆動、実行時検証を加え、Isaac Simで4回の把持・配置を完了した。

これは有用で限定された証拠だ。設定した資産が、その模擬軌道で受入可能に動いたことを示す。物理ロボットの製造、すべての実表面での摩擦、制御不能な環境での耐久を示さない。[Isaac Sim文書](https://docs.isaacsim.omniverse.nvidia.com/latest/index.html)が示す通り、シミュレーターは開発環境であり、モデルは仮定を持つ道具だ。

物理試作品は世界との接触を試す。握り、重さ、変形、漏れ、温度、反射、破損、清掃、不快感、意外な使い方だ。画面にない材料と人体の証拠を与える一方、変更費用は高くなる。

四つは証拠の階段を作る。上の段は下の段で答えられない問いに答える。真の不確実性が下にあるのに上へ飛ぶと、費用だけが増える。

## アイデアを止め得る一文から始める

ソフトや材料を選ぶ前に、次の一文を書く。

> この試作品は、______かどうかを判断するために存在する。

空欄には、答えが次の判断を変える不確実性を入れる。

「人が好むか」は緩すぎる。「初めての利用者が説明なしで20秒以内に握る場所を見つけ、物を開けられるか」なら、人、行動、時間、支援境界がある。

「ガラスが使えるか」も広い。外観、温度、耐薬品性、清掃、重さ、破損では必要な試験片と受入が異なる。粘土は形と握り、軟質材は変形と快適さ、ガラス片は光学、熱、清掃、破壊を試せる。問いが形なら、最初からガラス完成品を作る理由はない。

最も安く正直な試験とは、判断を変えられる最低の段だ。

## 作る前に結果の規則を書く

受入規則を先に書くと、試作品で自分を欺きにくくなる。記録は六項目でよい。

1. 問い。
2. 答えられる最安の証拠段階。
3. 受入結果と失敗条件。
4. 時間と費用の上限。
5. 気まずい証拠や否定的証拠を含む観察。
6. 次の判断。継続、修正、段階変更、停止。

偽の精密さは要らない。5人の握り試験は市場を証明しないが、誰も持ち方を理解しないことは示せる。模擬機構は工場信頼性を証明しないが、予定経路すべてで部品が衝突することは示せる。

否定的結果も残す。安い模型の失敗は高い金型工程を省ける。現実的な物理を加えて動かないシミュレーションも情報を生む。失敗を隠し、同じ仮定で次を作る時にだけ無駄になる。

## AIに循環を縮めさせ、境界は消させない

AIは問いから試験までの作業を減らせる。NVIDIAの例ではGPT-6 AstraがOmniverseツールを呼ぶPythonを助けるが、元ファイル、仕様、物理設定、検証、点検は残る。[CAD-to-SimReady skill](https://github.com/NVIDIA/skills/tree/main/skills/omniverse-cad-to-simready)は作業を整理する。シミュレーションが何を証明するかは決めない。

一人会社のエージェントに適した役割はここだ。参照資料を集め、案を作り、形状を準備し、検査を走らせ、失敗を保存し、次の試験を下書きする。所有者は問い、受入境界、後続判断を保つ。

画像、CAD案、シミュレーション設定の速度向上は実在する入力だ。結論は証拠段階の境界を越えない。

## 最初の試作品は判断の道具である

最初の版は完成品に見えなくてよい。印刷画像、厚紙の輪郭、粘土、軟質材模型、CAD組立、検証済み軌道が一つだけのシミュレーションでもよい。価値は消した不確実性から来る。

問いを一つ選ぶ。最も安く正直な段階を選ぶ。受入規則を書き、時間、費用、結果、失敗を記録する。次の試作品が存在する価値を証拠に決めさせる。

磨きは後でよい。次の判断を明確にした時、最初の試作品はすでに仕事を終えている。
