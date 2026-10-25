---
title: "The First Prototype Must Answer a Question"
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
excerpt: "A first prototype earns its keep by resolving one important uncertainty at the cheapest truthful evidence stage."
hero: /action-item/20261025/hero.webp
ogImage: /action-item/20261025/og.webp
canonical: "https://iamrobin.ai/ouroboros/202610/20261025/action_item/"
author: https://iamrobin.ai/#person
inLanguage: en
draft: false
sourceAction: "Daily Briefing 2026-10-25, item 5"
ledgerId: PROTOTYPE-QUESTION-20261025
visualHeadline: "One prototype. One question."
visualSubhead: "IMAGE · CAD · SIMULATION · PHYSICAL TEST"
visualFooter: "EVIDENCE BEFORE POLISH"
visualNodes: "QUESTION|CHEAPEST TEST|ACCEPT|LEARN"
thesis: "A first prototype should resolve one critical uncertainty at the cheapest truthful evidence stage and preserve what the result changes."
---

A beautiful prototype can be completely useless.

It can photograph well, gather approving nods, and still leave the important question untouched. Can a hand grip it? Does it survive heat? Will the mechanism bind? Does anyone understand what it is for? If the team never chose a question, almost any polished object can be called progress.

The first prototype needs a smaller job. It must answer one question.

That sounds restrictive. In practice, it is what makes prototyping fast. A question tells you how little you need to build, what counts as evidence, and when to stop.

## Four objects that look more similar than they are

An image can test whether an idea is legible. It can compare proportions, style, color, and the story a product tells at first glance. The image says very little about weight, balance, heat, impact, manufacturing tolerance, or repeated use.

A CAD model can test geometry. Parts can be measured, assembled, collided, and revised before material is cut. [OpenUSD](https://openusd.org/release/index.html) can preserve geometry and assembly structure across tools. Geometry still does not automatically create valid physical behavior.

A simulation can test a specified model of reality. That last phrase matters. The [SimReady Foundation](https://nvidia.github.io/simready-foundation/) defines profiles and checks for assets intended for simulation. [NVIDIA's CAD-to-SimReady walkthrough](https://developer.nvidia.com/blog/5-steps-to-create-simready-assets-for-robotics-with-frontier-ai-models/) begins with an ABB YuMi CAD asset, then adds appearance, collision geometry, joints, mass, friction, drives, and runtime validation. The final scene completes four pick-and-place cycles in Isaac Sim.

That is useful evidence. It shows that the configured asset behaved acceptably on those simulated trajectories. It does not show that a physical robot was built, that the friction values match every real surface, or that a product survives an uncontrolled environment. [Isaac Sim documentation](https://docs.isaacsim.omniverse.nvidia.com/latest/index.html) is explicit about the simulator as a development environment. The model remains an instrument with assumptions.

A physical prototype can test contact with the world: grip, weight, deformation, leakage, temperature, reflection, breakage, cleaning, discomfort, surprise. It introduces material and human evidence that a screen cannot supply. It also costs more to change.

The four objects form an evidence ladder. Each step can answer questions the prior step cannot. Each step can also waste money when the real uncertainty belonged lower down.

## Start with the sentence that could kill the idea

Before choosing software or material, write one sentence:

> This prototype exists to determine whether ______.

The blank should contain an uncertainty whose answer changes the next decision.

“Whether people like it” is too loose. A small team can reinterpret every reaction. “Whether a first-time user can identify the grip and open the object within 20 seconds without instruction” is sharper. It names the person, behavior, time, and assistance boundary.

“Whether glass works” is also too broad. Glass may be relevant to appearance, temperature, chemical resistance, cleaning, weight, or breakage. Each question calls for a different specimen and acceptance test. A clay model may answer shape and grip. A soft-material mock-up may expose deformation and comfort. A glass sample may test optical, thermal, cleaning, or fracture behavior. Building the glass object first is expensive if the unresolved question concerns shape.

The cheapest truthful test is the lowest rung that can change the decision.

## Write the result before building

A prototype becomes harder to fool when the acceptance rule is written in advance. A compact record needs only six fields:

1. the question;
2. the cheapest evidence stage that can answer it;
3. the acceptance result and failure condition;
4. the time and cost limit;
5. the observation, including awkward or negative evidence;
6. the next decision: continue, revise, change stage, or stop.

The rule does not need false precision. A first grip test with five people cannot establish a market. It may still reveal that nobody understands where to hold the object. A simulated mechanism does not establish factory reliability. It may still show that two parts collide under every intended path.

Negative results deserve a place in the record. A failed cheap mock-up may save a costly tooling cycle. A simulation that refuses to behave after realistic physics are added has produced information. The failure becomes waste only when the team hides it and builds the next version from the same assumption.

## Let AI compress the loop without erasing the boundary

AI can reduce the work between question and test. In NVIDIA's example, GPT-6 Astra helps write Python that calls Omniverse tools, while the workflow still requires source files, specifications, physics configuration, validation, and inspection. The [CAD-to-SimReady skill](https://github.com/NVIDIA/skills/tree/main/skills/omniverse-cad-to-simready) organizes the work. It does not remove the need to decide what the simulation proves.

That is the useful role for an agent in a one-person company. It can assemble references, produce variants, prepare geometry, run checks, capture failures, and draft the next test. The owner keeps the question, the acceptance boundary, and the decision that follows.

An agent can make a picture in seconds. It can make a CAD draft quickly. It can help configure a simulator. Those speedups are real inputs. The result is still bounded by the evidence stage.

## A first prototype is a decision instrument

The first version does not need to resemble a finished product. It may be a printed image, a cardboard outline, a clay form, a soft-material mock-up, a CAD assembly, or a simulation with one validated trajectory. Its value comes from the uncertainty it removes.

Choose one question. Select the cheapest truthful stage. Write the acceptance rule. Record time, cost, result, and failure. Then let the evidence decide whether the next prototype deserves to exist.

Polish can come later. The first prototype has already earned its place when it makes the next decision clearer.
