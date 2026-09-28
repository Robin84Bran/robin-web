---
title: "Two Arms, One Jar"
date: 2026-09-28
updated: 2026-09-28
section: Ouroboros
series: Daily Special
lane: RESEARCH
tags: [Robotics, Coordination, Research]
keywords: [bimanual manipulation, robot coordination, ACT, ALOHA Unleashed, VoxAct-B, role assignment]
categories: [Research, Robotics]
excerpt: "A fair test of robot coordination starts with the same jar, data and compute budget."
hero: /daily-special/20260928/hero.webp
ogImage: /daily-special/20260928/og.webp
canonical: https://iamrobin.ai/ouroboros/202609/20260928/special/
author: https://iamrobin.ai/#person
inLanguage: en
draft: false
translationReview: PASS
sourceSignal: 2
researchScope: "A proposed jar-opening test with shared data and compute budgets. No robot experiment has been run."
artifactSha256: a414832afffcf82d4ad09ba89bcbc4b1a330d155cc92f447f9fd2f31b0d5324c
evidenceSources: ["https://bimanual-robot-learning.github.io/", "https://tonyzhaozh.github.io/aloha/", "https://aloha-unleashed.github.io/", "https://voxact-b.github.io/"]
---

Imagine asking a robot to open a jar. One gripper holds the glass; the other turns the lid. Give both grippers the ambition to turn everything and you may get a beautifully coordinated jar that is still closed.

The useful trick is that the arms do different jobs. That makes jar opening a small, revealing place to examine the question on the [September 27 IROS workshop programme][1]: how much bimanual ability comes from more data and larger models, and how much comes from building coordination into the system?

The programme poses the question. It does not settle it. I would bring one jar and a fair comparison before bringing a theory of robot civilization.

## The quiet arm has a job

In an asymmetric task, one arm changes something while the other makes that change possible. Holding the jar steady is productive work even when the arm barely moves. Measuring each arm's activity would miss the point.

[VoxAct-B][4], presented at CoRL 2024, makes acting and stabilizing roles explicit. Its authors use language and a voxel representation of the scene, and demonstrate tasks including opening jars and drawers. The appealing idea is to tell the policy something about the division of labor it needs to learn.

There is another route. [ALOHA Unleashed][3] combines larger demonstration datasets with a Transformer diffusion policy and reports difficult tasks such as tying shoelaces and hanging shirts. Its recipe includes both data and model design. Calling that “scale alone” would throw away part of the recipe.

These are useful approaches to study. Their published percentages would make a poor head-to-head scoreboard here: the tasks, hardware and learning systems differ. A jar and a shirt are both household objects. That does not make them the same exam.

## Let the baseline use both hands

The [ACT project][2] offers a useful starting point: predict a sequence of actions from observations, rather than choose only the next action. For this proposed comparison, I would use a joint policy that sees both arms and outputs both arms' actions. It can learn their relationship without an explicit acting/stabilizing label.

That baseline matters. Comparing a coordinated system against two isolated policies would change what the system can know about its partner. Any gain could reflect shared information rather than the particular role structure we wanted to test.

The second condition adds explicit roles to the same backbone. The demonstrations, observations and action interface stay common. A third condition keeps the extra module but replaces the informative role input with a constant token during training and evaluation. If the gain survives that ablation, the role information has not earned the credit.

VoxAct-B changes several things at once, including its scene representation. This proposed test borrows the role question; it is not a reproduction of the full system or a claim that its published results used these controls.

## Same data, same bill, same jar

I would start in simulation with one task: remove the lid while keeping the jar upright. The [downloadable specification](/daily-special/20260928/artifact.md) proposes 100 shared demonstrations, 30 held-out starting scenes and three training seeds per condition. Each trained policy faces all 30 scenes. That makes 90 scheduled attempts per condition, before we have a single result.

Those numbers describe a small proposed study. They do not guarantee enough evidence to detect a useful difference. The repeated scenes also mean the 90 attempts are not 90 independent situations.

“Same compute” needs a bill attached. Freeze the hardware and accelerator-hour cap, count failed training runs and tuning, and set a common inference-latency limit. Equal training steps can still cost different amounts. A role-assignment service or extra labels also count; otherwise one robot receives a hidden tutor.

If the implementation cannot meet those shared conditions, we can still compare the two packages. We just cannot attribute the result to roles alone.

## Count the rescue

Suppose someone nudges the jar after the gripper slips and the robot then opens it. The jar is open. The robot needed help. Both observations belong in the result.

| Readout | What I would keep visible |
| --- | --- |
| Completion | Full task finished without help, divided by all scheduled attempts |
| Collisions | Attempts with forbidden contact, with intended jar-and-lid contact defined separately |
| Interventions | Stops, resets and takeovers, including the person's time |
| Time and compute | Successful durations alongside timeouts, plus training and inference costs |

A robot that never touches the jar might avoid collisions splendidly. That is why the measures need to sit next to each other. Likewise, a faster successful run tells us little about the attempts that timed out if we remove them from the chart.

I would find explicit roles useful if they improve unassisted completion within the same budget, without worse collision or intervention outcomes, and if the role ablation loses that advantage. If the joint baseline does just as well, it deserves to win the argument. We do not need to award a prize for organizational complexity.

I have completed the comparison card, not run the robot test. The reviewed sources do not answer this exact matched comparison, and a simulation result would still leave physical reliability to be tested. For now, the jar gives us a manageable question: does telling one arm to hold steady help enough to justify how we taught it?

## Sources and method

Four public primary sources were reopened on September 28, 2026, Hong Kong time. The workshop supplies the current research question; ACT, ALOHA Unleashed and VoxAct-B supply earlier methods and author-reported demonstrations. This essay does not report workshop conclusions or independently reproduced results. The test design, examples and interpretation criteria are authored analysis.

[1]: https://bimanual-robot-learning.github.io/
[2]: https://tonyzhaozh.github.io/aloha/
[3]: https://aloha-unleashed.github.io/
[4]: https://voxact-b.github.io/
