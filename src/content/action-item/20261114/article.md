---
title: "A Robot Model Needs a Shop Floor Test"
date: 2026-11-14
updated: 2026-11-14
section: Ouroboros
series: Daily Action Item
hero: /action-item/20261114/hero.webp
ogImage: /action-item/20261114/og.webp
ledgerId: PRAXIS-SHOP-FLOOR-ACCEPTANCE-20261114
draft: false
categories:
  - Physical AI
  - Robotics
  - AI Engineering
tags:
  - Praxis-1
  - world action models
  - robot policy
  - acceptance testing
keywords:
  - robot model acceptance
  - open-weight robotics
  - embodiment testing
  - cost per accepted task
excerpt: "Open weights let a robot model reach a new workbench; a frozen task and complete acceptance record determine what it has earned the right to do."
canonical: "https://iamrobin.ai/ouroboros/202611/20261114/action_item/"
author: https://iamrobin.ai/#person
inLanguage: en
sourceAction: "2026-11-14 Daily Briefing, item 5"
visualHeadline: "Access opens the door."
visualSubhead: "TASK · COMPLETION · RECOVERY · COST"
visualFooter: "Acceptance earns responsibility"
visualNodes: "TASK|COMPLETION|RECOVERY|COST"
thesis: "Open weights move robotics from an access problem to an acceptance problem; production value comes from complete evidence on one frozen task."
---

# A Robot Model Needs a Shop Floor Test

A robot asked to move an object has several decisions to make before its gripper closes. It must connect the instruction to something in its camera image, judge where that object sits, and choose movements that its arm can carry out. The software that turns the instruction, images and the robot’s current state into actions is called a robot policy.

Runway, an AI company known for generative video and research into models that predict how scenes change, is bringing video prediction into this process. Its robot model, Praxis-1, imagines a short sequence of future images and produces movements intended to make that future happen. Runway calls this a *world action model*. Its imagined scene is a forecast whose accuracy gets tested when the robot moves.

That approach connects two demanding abilities: learning how the world looks as things move, and controlling a particular machine. A useful everyday analogy is an apprentice who has watched many instructional videos and can imagine the next movement. The apprentice still takes a practical test at each new workbench before receiving responsibility for that task.

Praxis-1 has now become easier to bring to a new workbench. The question is what evidence earns it responsibility there.

Runway introduced the model in September 2026. On November 2, the company ran a physical-robot comparison at a tabletop station. On November 11, it made Praxis-1 generally available, releasing downloadable model weights—the learned numerical settings that shape its behavior—alongside code for running and adapting it.

The release contains three saved versions of the model, called checkpoints: one adapted using DROID robot data, one adapted for a two-armed YAM robot, and a base version ready for further training. According to Runway, the release also includes a policy server, simulation software and tools for fine-tuning, the additional training that adjusts a model to a particular use. Runway released the described code and weights under Apache 2.0; hardware, datasets and third-party components can carry their own obligations.

Public access gives researchers and robot builders something substantial to inspect, modify and test. The next stage is establishing what a chosen version can reliably do on their machine.

## What the tests establish

The evidence starts in simulation. In NVIDIA’s RoboLab-120 benchmark, a collection of simulated tabletop tasks, Runway reports that its DROID-adapted Praxis-1 solved 555 of 1,200 episodes, or 46.2%. The evaluation covered 120 tasks, with ten trials for each.

Runway described Praxis-1 as the leading world action model and open-source robot foundation model on that leaderboard at publication. Four entries scored higher overall. The distinction matters because each description answers a different question: the category ranking compares Praxis-1 with particular kinds of systems; the completion count shows how often it succeeded under the benchmark’s conditions.

The strongest physical-robot comparison in the packet moves the story to a Franka FR3 station operated by Positronic. Runway tested Praxis-1 and another robot model, FLUX 3 Action, on the same equipment across ten constrained tabletop tasks. Each task received ten episodes, divided into two sessions of five on November 2.

Runway reports that Praxis-1 completed 88 of 100 episodes, compared with 80 of 100 for FLUX 3 Action. This is useful evidence from a provider-run comparison on a specified station. Its reach is also specific: one setup, ten tasks and a hundred attempts per model.

Timing adds another part of the picture. Runway says a default policy call on a single NVIDIA H100 computing chip takes about 0.55–0.60 seconds round trip and returns 1.6 seconds of intended movement. That measures how quickly the model supplies a short stretch of motion. A complete workplace task also includes the time spent moving, checking the result, recovering from trouble and preparing for another attempt.

Runway’s own account of failures helps explain why those additional measures matter. The company identifies look-alike objects as the most common physical-robot failure. Sometimes the wrong object already appears in the model’s imagined future. The prediction and the movement can therefore agree with each other while pursuing the wrong target.

Runway also reports that instructions naming an object’s color, size or another distinguishing attribute help selection. Long sequences remain difficult when issued as one prompt; separate instructions for individual steps produce better results. Instruction wording is consequently part of the tested system, alongside the arm and camera.

## A different workbench changes the question

Praxis-1’s architecture is designed to share learning across robots. Runway describes a common video-prediction core and an action component, connected to smaller input and output components tailored to each robot. Those components translate a machine’s positions and movements into the model’s shared format.

Adaptation still takes data and computing resources. For the RT-1 embodiment, which was absent from the model’s earlier pretraining and mid-training data, Runway reports additional training using about 78,000 episodes representing 95 hours of robot data. That process took about 28 hours on 32 H100s. The adapted model then achieved a reported 80.0% success rate over 864 episodes across four tasks in SimplerEnv, a simulation environment. Runway compared that with a published 52.4% result for RT-1.

This shows a route for adapting the model and evaluating the result in simulation. A physical machine brings a further set of conditions.

Move the camera and an object appears from a different angle. Change the gripper and the contact needed to hold it changes. Change the work surface and an object may slide differently. Alter the instruction and the target may become easier or harder to distinguish. These are ordinary features of a robot’s job, and each affects what a successful trial means.

Runway names Noble Machines, Standard Bots and Ultra as launch partners working with a legged humanoid, a six-axis industrial arm and a dual-arm warehouse robot. That partner work broadens the hardware-testing context. Production-scale performance and accepted customer economics remain separate claims requiring evidence from those operating conditions.

Open weights thus move the central challenge from gaining access to earning acceptance. Once a team can download and adapt the model, the practical question becomes precise: what would justify trusting this checkpoint, on this machine, to perform this task?

## Fifty attempts that keep the whole story

A small, bounded acceptance test could begin to answer that question. Consider a proposed low-energy tabletop transfer task whose failures stay contained. Before observing results, the test designer would fix the object set, starting positions, camera placement, lighting range and exact instruction. The definition of a pass and the maximum allowed time would be fixed too.

Fifty trials could provide an initial record, with every attempt preserved. This is an explanatory design; its results would have to be gathered through an actual, appropriately controlled experiment. Any physical test would require the applicable engineering, operational and legal safeguards.

The record would follow each attempt beyond its final pose. Did the robot select the correct object? Did it attempt a wrong pickup, damage anything or have a near miss? When an attempt went wrong, did the system recover by itself, or did a person take over? How long did recovery and resetting consume?

Those details connect completion to useful work. A task that finishes after repeated human assistance places a different demand on a workplace from one that finishes autonomously. Both outcomes belong in the evidence.

The same record would connect model response time to total elapsed time and measure hardware use. Cost per accepted task would include the resources consumed across all attempts, along with human assistance, energy and an appropriate share of maintenance and equipment costs. That makes the cost figure reflect the work actually delivered.

A threshold declared before the trials would establish what result justifies a broader test. Passing would support a claim about the tested task, robot, setup and checkpoint. A broader claim would earn its own controlled test.

Praxis-1’s release gives more people access to a model that can predict a scene and attempt to bring it about. The shop-floor question begins where that prediction meets a particular gripper, camera, object and instruction. A preserved record of completion, recovery, human involvement, time and cost is how that encounter becomes evidence someone else can assess—and how the next workbench gets a useful starting point.

Sources:

- Runway, [Praxis-1 Is Now Available](https://runway.com/news/company-news/praxis-1-is-now-available), November 11, 2026.
- Runway, [Praxis-1: From Video Pretraining to Robot Control](https://runway.com/research/praxis-1-video-pretraining-to-robot-control), November 2026.
- Runway, [Introducing Praxis-1](https://runway.com/research/introducing-praxis-1) and [public code repository](https://github.com/runwayml/praxis-1-oss).
- NVIDIA, [RoboLab-120](https://research.nvidia.com/labs/gear/robocasa/robolab120/); [SimplerEnv evaluation environment](https://github.com/simpler-env/SimplerEnv).
