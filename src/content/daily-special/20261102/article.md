---
title: "How a Robot Checks Its Own Work"
date: "2026-11-02"
updated: "2026-11-02"
section: "Ouroboros"
series: "Daily Special"
lane: "RESEARCH"
tags: ["Physical AI", "Robotics", "Agent Evaluation"]
keywords: ["Gemini Robotics ER 2", "progress classification", "step-local retry", "accepted outcomes"]
categories: ["Research", "Systems"]
excerpt: "Gemini Robotics ER 2 can check progress and retry a step, while its 57.4% five-band score keeps accepted outcomes as the real finish line."
hero: "/daily-special/20261102/hero.png"
ogImage: "/daily-special/20261102/og.png"
canonical: "https://iamrobin.ai/ouroboros/202611/20261102/special/"
author: "https://iamrobin.ai/#person"
inLanguage: "en"
draft: false
translationReview: "PASS"
sourceSignal: 2
researchScope: "A bounded public-source study of Gemini Robotics ER 2 progress classification and step-local retry, plus a proposed harmless tabletop comparison; no robot or API trial, customer-site test, purchase, trade, capital allocation, company contact or underlying decision."
artifactSha256: "958acbfb9fa39153eedf09fbd783542e3109f58c42344cafed9f77818e95fd94"
evidenceSources: ["https://cloud.google.com/blog/products/ai-machine-learning/gemini-robotics-embodied-reasoning-2-is-now-available-on-google-cloud", "https://blog.google/innovation-and-ai/models-and-research/google-deepmind/gemini-robotics-er-2/", "https://ai.google.dev/gemini-api/docs/robotics-overview", "https://ai.google.dev/gemini-api/docs/robotics-video-progress", "https://storage.googleapis.com/deepmind-media/gemini-robotics/Gemini-Robotics-2-Safety.pdf", "https://deepmind.google/models/model-cards/gemini-robotics-er-2/"]
---

# How a Robot Checks Its Own Work

A robot carrying out a job has to do more than move. It needs to understand the task, choose a sequence of actions and judge whether each action produced the intended result. Those responsibilities belong to different parts of a robotic system. One part may plan the work; another controls the arm or wheels. The connection between them matters whenever the physical world delivers a surprise.

Google DeepMind, Google’s AI research group, is developing software for that planning and reasoning role. Its Gemini Robotics Embodied Reasoning 2 model, usually shortened to ER 2, can process text, images, video and audio, then call tools that carry out robot actions. Lower-level models or hardware systems handle the movements.

Among ER 2’s documented capabilities is a deceptively simple one: looking at work in progress and estimating how far it has come. That estimate could help a robot decide whether to move on, try a step again or ask a person for help.

The promise becomes clear through an everyday illustration. Imagine a cook following a recipe that begins with cracking an egg into a bowl. Issuing the instruction and seeing the egg in the bowl are separate events. A sequence that advances as soon as the instruction is issued assumes the result. A sequence that checks the bowl has an opportunity to catch a problem while it is still small.

For a robot, that check could preserve the useful work already completed. It also introduces a new responsibility: judging the result accurately enough to choose the next action.

## From a developer release to enterprise access

Google introduced ER 2 on July 30, 2026, through the Gemini API, a software interface developers use to connect applications to the model, and Google AI Studio, its development environment. The release included standard and streaming public-preview versions.

On October 27, Google Cloud announced public-preview access through its enterprise Gemini platform. This gave businesses another route to build with ER 2. The developer overview, updated October 29, continued to label the model as preview.

The October announcement therefore extends an existing release into Google’s enterprise platform. Its significance lies in making the model available to teams exploring how to connect reasoning software with physical machines. The next question concerns what that software can actually tell them about the work a machine is doing.

Google’s video-understanding documentation describes two relevant abilities. “Moment finding” identifies the time or frame at which an event happens, such as a cup becoming full. “Progress classification” estimates how far an observed task has advanced, placing it in one of five broad brackets, from 0–20% through 80–100% complete.

These capabilities answer different questions. One asks when an event occurred. The other asks how much of a task appears complete. Together with tools for requesting actions, they could support a loop: act, observe, judge and choose the next step.

Google says progress classification can allow a robot to adjust its actions or retry a failed step inside a larger workflow. Here, retrying “locally” means returning to the affected part of the job. The word describes the scope of the retry; where the model’s computation runs is a separate design choice.

That distinction matters less to the person waiting for finished work than the practical possibility behind it. If a robot can identify the step that needs attention, it may be able to recover while preserving earlier progress.

## A check can also be wrong

The usefulness of this loop depends on the quality of its judgment.

Google reports 57.4% accuracy on its five-bracket progress-classification benchmark. In everyday terms, the model selected the correct broad progress category in a little over half of the evaluated cases. Google says this result exceeded those of earlier and competing models in its comparison. It also leaves a substantial share of classifications wrong.

A broad progress category has an additional limitation built into its meaning. The highest bracket covers everything from 80% to 100%. Work assigned to that bracket may still need a final action. A workplace would therefore need an explicit definition of a completed, acceptable result.

The consequences of classification errors depend on the task. In principle, a robot could repeat a step already completed, move past a step still requiring work, or ask a person for help at an inconvenient moment. These are possible effects of a mistaken progress judgment; their frequency in a particular workplace remains an open question.

Google’s separate moment-finding result is stronger: it reports 91.3% accuracy, with an average absolute timing error of 0.96 seconds. That timing measure describes how far the predicted event time falls from the reference time, regardless of whether the prediction comes early or late.

This is useful evidence about identifying moments in video. A claim about completing 91.3% of workplace jobs would require a different evaluation, following each job through to an accepted result.

All these model results come from Google. The public release material reviewed for this story provides headline benchmark scores; translating them into workplace performance requires more detailed evidence about the tasks, the errors and their consequences.

Google’s safety evaluations offer another view of the distance between checking and finishing. They include individual tests conducted offline and longer exchanges using a simulated lower-level action model. A separate evaluation tested safe stopping on an Apptronik Apollo2 humanoid robot.

In the longer confidence-emulation tests, agents often requested assessments of their confidence as instructed. Producing every revised substep needed to finish the job proved less reliable. Reported failures included problems with replanning and tool calls made with low confidence.

That finding gets to the heart of the mechanism. Recognizing uncertainty is one part of recovery. Working out a complete, useful response is another.

The safety report also places hardware certification, backup systems and guaranteed real-time responses outside its evaluation scope. Google’s model card calls for discretion in production, commercial and public environments and prohibits safety-critical uses where a malfunction could foreseeably cause death, injury or property damage.

## What would make the retry useful?

The practical question is whether checking and selectively retrying produces more acceptable work for the time, money and human attention involved.

A small comparison could begin to answer it. The research behind this article proposes three harmless tabletop tasks, each with a clearly defined finished state. The same tasks and acceptance rules would be used to compare two approaches: restarting the whole sequence after a failure, and retrying the affected step.

That comparison remains a proposal as of the November 2 research cutoff. Its value would come from evaluating finished work against the predefined rules, separately from the robot’s own judgment.

The record would need to capture accepted completions and false declarations of success, alongside retries and human takeovers. Elapsed time and the combined cost of model use and operator attention would show what each accepted result required. A retry that saves earlier work could be valuable. Repeated attempts that consume time while leaving the task unfinished would reveal a different outcome.

Even a successful tabletop comparison would establish a bounded result under those test conditions. A claim of workplace reliability would require evidence from the intended setting, across repeated shifts and the variations that occur there. Customer-site completion rates, human intervention and cost per accepted task remain open in the evidence reviewed here.

ER 2 makes progress checking an explicit, measurable model capability. That is a meaningful step toward robots that respond to the results of their actions. The most revealing observation will come after the check: whether the next decision helps the machine deliver work a person can accept.

Sources: Google’s [July 30 introduction](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/gemini-robotics-er-2/), [October 27 Cloud announcement](https://cloud.google.com/blog/products/ai-machine-learning/gemini-robotics-embodied-reasoning-2-is-now-available-on-google-cloud), [developer overview](https://ai.google.dev/gemini-api/docs/robotics-overview), [video-understanding guide](https://ai.google.dev/gemini-api/docs/robotics-video-progress), [safety evaluation report](https://storage.googleapis.com/deepmind-media/gemini-robotics/Gemini-Robotics-2-Safety.pdf) and [model card](https://deepmind.google/models/model-cards/gemini-robotics-er-2/). Research cutoff: November 2, 2026, 10:05 a.m. Hong Kong time. Model and benchmark claims are Google-reported; independent replication falls outside this research.
