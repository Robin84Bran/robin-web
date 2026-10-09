---
title: "AI同僚は権限喪失を生き残れるか"
date: 2026-10-09
updated: 2026-10-09
section: Ouroboros
series: Daily Action Item
categories:
  - Agentic AI
  - Operating Systems
tags:
  - AI Agents
  - Recovery
keywords:
  - agent autonomy
  - permission revocation
  - recovery testing
excerpt: "権限を失っても安全に復旧し、受入可能な成果を届けて初めてAI同僚は自律に近づく。"
hero: /action-item/20261009/hero.webp
ogImage: /action-item/20261009/og.webp
canonical: "https://iamrobin.ai/ouroboros/202610/20261009/action_item/ja/"
author: https://iamrobin.ai/#person
inLanguage: ja
languageSlug: ja
translationOf: "https://iamrobin.ai/ouroboros/202610/20261009/action_item/"
translationReview: PASS
draft: false
sourceAction: "Daily Briefing 2026-10-09, item 5"
ledgerId: REVOCATION-TEST-20261009
visualHeadline: "鍵を一つ外す。"
visualSubhead: "取消 / 復旧 / 検証 / 受入"
visualFooter: "自律を試す"
visualNodes: "取消|復旧|検証|受入"
---

結論は明快だ。AI同僚が自律に近づくのは、権限を失っても安全に復旧し、受入可能な成果を届けた時である。二日間動き続けたことはuptimeで、整った報告書はoutputだ。permissionが取り消され、connectorが消え、第一候補のmodelが使えなくなった後の振る舞いは、それだけでは分からない。

Googleの新しいGemini agentで、この問いは具体的になった。Googleは、仕事がcloud上で数時間から数日続き、一時的なsubagentには固有identityを、継続的なcoworker agentには専用email、storage、限定accessを与えられると説明する。audit、sandbox、Agent Gatewayも備える。重要な運用部品だが、無介入完了率、障害復旧率、受入済み成果当たり費用の公開分母はない。[Google Cloud](https://cloud.google.com/blog/products/ai-machine-learning/welcome-to-gemini-at-work-2026)

OpenAI Agents APIも別の角度から同じ境界を示す。sessionは状態を保持し、environmentはmanagedまたはself-hostedを選べ、subagentが分担し、logでtool activityを確認できる。FAQは、turn完了が全tool成功を意味せず、idle sessionもtask完了を証明しないと明記する。[OpenAI Agents API](https://developers.openai.com/api/docs/guides/agents-api/overview) [OpenAI Agents API FAQ](https://help.openai.com/en/articles/20001551-agents-api-beta-faq)

この記事で用意したのはpermission revocation testの設計である。RobinOSでは未実行だ。protocolはREADYだが、復旧、品質、費用、自律の実測結果はUNKNOWNのままである。

## Uptimeは見栄えの良い指標だ

dashboardはagentが48時間動き、300件のeventを処理し、19個のartifactを作ったと表示できる。活動の記録にはなるが、指定成果が完成したこと、全toolが成功したこと、重要箇所を人が直していないことは証明しない。

複数systemをまたぐ仕事では錯覚が大きくなる。一つのconnector failureが、説得力のある部分成果を残す。retryが重複を作り、期限切れcredentialが元より広いfallbackへagentを向かわせることもある。processは動き続けても、authorityとevidenceの境界は変わっている。

測るべき単位はaccepted outcomeだ。deliverable、事実・安全check、destination readbackを先に決める。人の救援、権限変更、繰返しcall、捨てたartifactも全て数える。元のauthority envelope内で受理された成果だけが有用な仕事になる。

## Identityがあれば失敗の主体が分かる

固有identityを持たないagentは人のaccountで動きがちだ。audit上はRobinがdocumentを変更し、folderを開き、workflowを起動したように見える。agentだけを止めるために人のaccountを無効化したり、共有credentialを回転したりする必要が生じる。

Googleのcoworker-agent設計では、継続agentごとにidentityを持ち、teamが共有したcontextだけへaccessできる。発表は、暗号的に確認されるidentity、role-based permission、agentへ帰属するaudit recordも説明する。[Google Cloud](https://cloud.google.com/blog/products/ai-machine-learning/welcome-to-gemini-at-work-2026)

Identityがagentを信頼可能にするわけではない。authorityを読める形にする。RobinOSではdurable workerか狭いroleごとにidentityを分け、temporary workerには最小限のcontextだけを渡し、task終了時に失効させるべきだ。

## 権限取消しは通常の運用eventである

現実の組織ではpermissionが常に変わる。projectが終わり、contractorが離れ、data roomが閉じ、security alertでaccessが外れ、tokenが失効し、writeがread-onlyへ落ちる。

NIST Zero Trustはaccessを一度発行するbadgeではなく、継続的な判断として扱う。user、asset、resourceを中心にleast privilegeを適用し、policy engineが状況に応じてgrant、deny、revokeする。[NIST Zero Trust Architecture](https://www.nist.gov/publications/zero-trust-architecture) 実装architectureはpolicy enforcement pointが必要な時だけ十分な権限を与え、不要になれば外し、sessionを継続評価することを求める。[NIST ZTA Architecture](https://pages.nist.gov/zero-trust-architecture/VolumeB/architecture.html)

復旧は別のcredentialを探すことではない。同じauthorityの中で有効な経路へ戻ることだ。read accessを失ったagentがprivate inboxを検索して完成したなら、技術的には復旧しても運用上は失敗している。

## 四つの故障が四つの弱点を示す

第一はsource permissionを一つ取り消す。systemは影響するclaimを特定し、残るevidenceで進み、gapを表示し、禁止resourceへの反復要求を止める。

第二はconnectorを無効化する。transport failureとempty resultを分け、事前に決めた回数だけretryし、最後に確認したcursorまたはitem IDを保存する。第二consumerを作らず、復旧不能ならsourceをunavailableのままにする。

第三はmodelを置き換える。限定subtaskを承認済み代替modelへ移し、task state、tool policy、acceptance criteriaを保持する。permissionやevidence ruleが黙って変わるならgraceful recoveryではない。

第四はartifact準備後にdestination write grantを外す。review済みartifactをtask-owned storageへ保存し、delivery blockedと報告する。local fileをpublishedと呼ばない。permission復帰後にhashを確認し、idempotentなdeliveryを一度だけ行う。

## Run前に境界を固定する

失敗を見てから規則を変えれば、復旧testは芝居になる。task、identity、permission、tool、fallback、retry上限、budget、acceptance rubricを実行前に固定し、packetにhashを付ける。

判断を露出しつつ安全に繰り返せるtaskを選ぶ。public sourceのresearch、review、release candidate準備は適している。evidence収集、執筆、検証、deliveryを含む一方、customer data、production credential、financial executionを使わない。

normal conditionとfailure conditionは同じdeliverable、source window、model budget、time limitを使い、一度に変える変数は一つにする。failure、timeout、ambiguous outcomeを分母から外さない。

## 五つの指標を別々に見る

第一はuseful autonomous hours。人の介入なしにaccepted outcomeへ進んだ時間で、retry待ちは含めない。

第二はrecovery rate。承認経路内で復旧したfailure数を全注入failure数で割る。権限拡大、provenance喪失、task変更があれば不合格だ。

第三はhuman-rescue minutes。診断、clarification、credential repair、file cleanup、追加reviewを含む。

第四はoutcome acceptance。固定したfact、semantic、privacy、destination、duplication checkで判定する。安全なBLOCKEDは正しい運用結果になり得るが、completionではない。

第五はaccepted outcome当たり総費用。model、tool、hosted environment、retry、人の時間を含める。token priceは入力にすぎない。

## 復旧にはreceiptが要る

各runは小さなevidence packetを残す。task hash、開始identityとgrant、注入event、timestamp、影響したtool call、retry、最終artifact hash、acceptance result、人の介入、costだ。secretとprivate source bodyは公開しない。

Tool logはattemptを示す。provider responseは受付を、destination readbackはdeliveryを、public verificationは意図したbytesがrouteへ届いたことを示す。OpenAI FAQはevent stream切断後、新しい仕事を送る前に既存sessionとsaved itemを取得するよう勧める。network interruptionをduplicate workへ変えないためだ。[OpenAI Agents API FAQ](https://help.openai.com/en/articles/20001551-agents-api-beta-faq)

NISTの実装materialも継続的なpolicy validation、resource inventory、observable enforcementを重視する。[NIST Zero Trust Takeaways](https://pages.nist.gov/zero-trust-architecture/VolumeB/ZeroTrustTakeaways.html)

## 安全な失敗は強制完了より良い

自律とは上手に止まる力でもある。重要claimを支える唯一のauthorized sourceを失えば、報告完成には捏造が必要になるかもしれない。destination grantが消えれば、publishedという主張は虚偽になる。safety review toolが外れれば、続行がriskを広げる。

test前に三つの許容終了を定義する。delivered and accepted、明示的制約を伴うsafe degradation、作業を保存して不足gateを示すBLOCKEDだ。completionは最初だけだが、残る二つも良いcontrolを証明できる。

Completionだけを評価されるsystemは摩擦を迂回する。元のauthority内のaccepted outcomeで評価すれば、正直な停止を選べる。

## 最初のRobinOS権限取消し試験

48時間のpublic-source assignmentから始める。当日のinfra eventを調べ、四言語briefを作り、deterministic checkを実行してrelease candidateを準備する。実publicationは無効にし、task-owned storageとread-only sourceだけを使う。

normal baselineの後、四つのmatched variantを走らせる。source permission取消し、connector停止、承認済みmodelへのsubtask切替え、destination write grant取消しだ。

結果を見る前にpromotion criteriaを書く。authority boundaryを保持し、duplicate external actionを作らず、missing factを明示し、baselineと同じacceptance rateを保ちながらhuman rescueとtotal costを悪化させない。今日は結果がない。まずtestを操作しにくくすることが成果だ。

## 何が私たちを納得させるか

説得力のある証拠は地味でよい。hash-bound taskがidentity、permission、tool、acceptance criteriaを固定する。normal runがbaselineを作る。matched failure runは他を変えずauthorityだけを外す。systemはforbidden actionを止め、provenanceを保ち、承認経路だけで復旧し、accepted workまたは正直なBLOCKEDを返す。

複数回で同じpatternが出る。human rescueを物語の外へ隠さず、costにretryとowner timeを含める。destination readbackはreview済みartifactと一致し、一つのpermission取消しが別のpermissionを広げない。

これはgeneral autonomyの証明ではない。もっと狭く、価値のある能力の証明だ。systemは鍵を一つ失い、何が変わったかを理解し、合法な経路が残る時だけ安全に続けられる。

本当の最初の試験は、すべてが順調な時に何時間働けるかではない。鍵が扉を開けなくなった時に、どう振る舞うかである。

## カテゴリーとキーワード

**カテゴリー：** Agentic AI · Operating Systems

**キーワード：** agent autonomy, permission revocation, recovery testing, accepted outcomes, zero trust, RobinOS

**Hashtags：** #AgenticAI #AIInfrastructure #ZeroTrust #RobinOS #IAmRobin
