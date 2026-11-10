---
title: "What Five Demonstrations Can Teach a Robot"
date: "2026-11-10"
updated: "2026-11-10"
section: "Ouroboros"
series: "Daily Special"
lane: "RESEARCH"
tags: ["Robotics", "Physical AI", "Robot Learning"]
keywords: ["NVIDIA GR00T 2", "Dexter-50", "few-shot robot adaptation", "robot demonstrations"]
categories: ["Research", "Robotics"]
excerpt: "NVIDIA reports 95% average success after five robot demonstrations per task. The longer story begins with extensive pretraining and a selected set of learnable tasks."
hero: "/daily-special/20261110/hero.png"
ogImage: "/daily-special/20261110/og.png"
canonical: "https://iamrobin.ai/ouroboros/202611/20261110/special/"
author: "https://iamrobin.ai/#person"
inLanguage: "en"
draft: false
translationReview: "PASS"
sourceSignal: 2
researchScope: "A bounded public-source explanation of NVIDIA's reported GR00T 2 Dexter-50 adaptation result; no robot test, model fine-tune, hardware purchase, deployment, capital allocation or underlying adoption decision was executed."
artifactSha256: "6f11c0e7e2d9cb750732aa18816f94f8cad7c90b85154360ffcd6a8261129089"
evidenceSources: ["https://research.nvidia.com/labs/gear/gr00t-2/", "https://research.nvidia.com/labs/gear/gr00t-2/assets/gr00t2_whitepaper.pdf", "https://github.com/NVIDIA/Isaac-GR00T", "https://arxiv.org/abs/2503.14734"]
---

# What Five Demonstrations Can Teach a Robot

A robot with two hands has a learning problem that people can easily underestimate. Knowing what a task looks like is one challenge. Making a particular set of arms and fingers carry it out is another. Each new machine brings its own movements, reach and controls, and teaching it can require people to spend valuable time guiding it through demonstrations.

NVIDIA’s Generalist Embodied Agent Research group is working on a way to make that teaching go further. Its robot model, GR00T 2, draws on a large collection of human video and physical demonstrations before receiving lessons on a particular robot. The ambition is to give the machine a store of useful experience that it can carry from one body to another.

In November 2026, NVIDIA reported a striking result: with five demonstrations per task, GR00T 2 reached 95% average success across a collection of 50 tasks on a two-handed robot called Dexter.

Understanding that number means following the learning process backward. The five demonstrations were the final, local lesson in a much longer education. And the researchers chose the 50 tasks partly because the model could already learn them well with that lesson.

Those details make the story more interesting. They help reveal what a short lesson can accomplish when a robot arrives prepared.

## A short lesson after a long education

GR00T 2 belongs to a family of robot foundation models: systems trained on broad collections of data so that their learned abilities can support many physical tasks. NVIDIA published its earlier GR00T N1 paper in March 2025. The November 2026 GR00T 2 work introduced a newer model and the Dexter-50 evaluation.

NVIDIA calls GR00T 2 a “world-action model.” It learns to predict future camera views alongside the robot’s actions. In everyday terms, it tries to picture the next moments of a task while deciding how the robot should move.

Its preparation was extensive. NVIDIA reports training on roughly 403,000 hours of video recorded from people’s viewpoints, around 10,000 hours of demonstrations using handheld grippers, and 23,500 hours of robot teleoperation, in which people controlled robots through tasks. The handheld-gripper collection covered 2,897 tasks.

These sources give the model different kinds of experience: how physical activities look to a person, how objects move when handled by a gripper, and how a robot acts under human control.

An experienced cook learning a new kitchen offers a useful analogy. The cook brings knowledge of ingredients, tools and the order in which work happens. A short introduction helps connect those skills to the equipment and arrangement of this particular kitchen.

For GR00T 2, the change is more physical still. The model must connect its prior experience to the arms and hands of the robot receiving the lesson.

Dexter is a Tianji robot with two arms and two Sharpa hands. Each arm has seven degrees of freedom—seven independent ways its joints can move—and each hand has 22. That gives the model a complex body to control.

The tasks in Dexter-50 were new to Dexter’s own training data. They had, however, appeared in demonstrations from another robot, called YAM, which uses simpler parallel grippers, in human video, or in both sources. The experiment therefore examined how experience with a task could transfer into a different robot body.

The natural question was how much direct teaching Dexter would need to make that transfer work.

## What happened after five demonstrations

NVIDIA evaluated three amounts of task-specific teaching.

First, the pretrained model received the task instruction alone. Across the 50 tasks, NVIDIA reports average success of 40%.

Next, a human teleoperator provided one complete demonstration on Dexter for each task. NVIDIA used that episode to train a separate task-specific adapter—a small set of learned adjustments attached to the larger model. Average success rose to 71%.

Finally, the researchers used five complete Dexter demonstrations per task. NVIDIA describes those episodes as containing under three minutes of robot data for each task. With an adapter trained on those five demonstrations, reported average success reached 95%. NVIDIA also says 37 of the 50 tasks succeeded in every evaluation trial.

The improvement is substantial within this evaluation. A small amount of experience on Dexter helped the model apply skills that its earlier training had prepared it to learn.

“Five demonstrations” has a precise meaning here. Each demonstration was a complete episode performed through human control of the target robot. Each task received its own adapter. The model then went through a separate training step before evaluation.

The method is called LoRA, a way of adapting a large model by training a smaller set of adjustments while keeping its underlying pretrained parameters fixed. NVIDIA used the same training settings for each task and reports about 30 minutes of adaptation on one RTX 5090 graphics card per task.

There are therefore several clocks running in this story. Under three minutes describes the demonstration data. About half an hour describes the adapter training. The full effort also includes preparing the robot and task, collecting the demonstrations, evaluating attempts, and providing hardware and human support. The model’s large initial training program sits further upstream.

For anyone thinking about putting a robot to work, that distinction matters. A brief lesson can be an important saving within a longer process. The total cost depends on the whole process.

## Why the task selection matters

The whitepaper supplies an essential detail about the 95% result: researchers chose the 50 tasks from those the model could learn with five episodes at a success rate of at least 80%.

In other words, the collection was assembled with demonstrated learnability as a condition of entry. That selection helps explain its high final score.

Return to the cook analogy. Imagine assessing how quickly an experienced cook adapts to a new kitchen, using dishes selected because the cook has already shown they can prepare them well after a short introduction. The assessment can reveal how much that introduction helps. Its scope remains tied to those selected dishes.

Dexter-50 similarly shows a strong improvement on a set of tasks suited to five-demonstration adaptation. The 40%, 71% and 95% figures describe average performance across that collection. Applying the result to a new task, a different robot or a working environment requires evidence from those settings.

The report that 37 tasks succeeded in every trial also deserves a clear reading. It describes the evaluation runs NVIDIA conducted. The cited project page and Dexter-50 whitepaper section leave the number of trials per task unspecified, so the result offers a bounded view of repeatability. Reliability over longer periods remains an open question.

As of 10 November 2026, the evidence came from NVIDIA’s own real-robot evaluation. Independent reproduction remained an open step. The GR00T 2 project page said its code would become available in December; NVIDIA’s public Isaac-GR00T repository described N1.7 as the available general-release model.

The practical promise is nevertheless clear. Broad prior training may allow a robot to learn how its particular hands should perform a familiar task from a few carefully collected examples. That could reduce one expensive part of teaching robots.

The next question is how often this advantage survives when someone chooses the task in advance because it needs doing. Dexter-50 gives a vivid account of what five demonstrations can achieve on prepared ground. How far that ground extends is the larger story still unfolding.

Sources:

- NVIDIA GEAR, [GR00T 2 project page](https://research.nvidia.com/labs/gear/gr00t-2/), November 2026; read 10 November 2026.
- NVIDIA, [GR00T 2 whitepaper](https://research.nvidia.com/labs/gear/gr00t-2/assets/gr00t2_whitepaper.pdf), especially pp. 6–8 and 41–42.
- NVIDIA, [Isaac-GR00T public repository](https://github.com/NVIDIA/Isaac-GR00T), release information read 10 November 2026.
- NVIDIA et al., [GR00T N1](https://arxiv.org/abs/2503.14734), 18 March 2025.
