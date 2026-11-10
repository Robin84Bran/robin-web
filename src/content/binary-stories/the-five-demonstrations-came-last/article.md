---
title: "The five demonstrations came last"
storySlug: "the-five-demonstrations-came-last"
date: "2026-11-10"
updated: "2026-11-10"
lane: "BUILD"
excerpt: "GR00T 2 reached 95% average success after five target-robot demonstrations, but those minutes came after 436,414 reported hours of borrowed experience—and on a task set selected for five-shot learnability."
hero: "/binary-stories/the-five-demonstrations-came-last/hero.webp"
ogImage: "/binary-stories/the-five-demonstrations-came-last/og.webp"
keywords: ["GR00T 2", "robot adaptation", "few-shot learning", "Dexter-50"]
canonical: "https://iamrobin.ai/binary/stories/the-five-demonstrations-came-last/"
inLanguage: "en"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202611/20261110/special/"
sourceArtifactSha256: "6f11c0e7e2d9cb750732aa18816f94f8cad7c90b85154360ffcd6a8261129089"
carouselPdf: "/carousels/the-five-demonstrations-came-last.pdf"
carouselCaption: "/carousels/the-five-demonstrations-came-last.txt"
carouselPages: 7
draft: false
---

The five demonstrations came last.

NVIDIA reports that GR00T 2 reached 95% average success on 50 Dexter tasks after five demonstrations per task. Those demonstrations took less than three minutes of target-robot data. Each task adapter took about 30 minutes to fine-tune on one RTX 5090.

That sounds like a robot learning a new job during a coffee break.

It is a real result. It is also the final scene of a much longer education.

Before Dexter saw those five episodes, GR00T 2 had been pretrained on a mixture that NVIDIA describes as 402,730 hours of egocentric human video, 10,184 hours of handheld-gripper demonstrations and 23,500 hours of robot teleoperation. Together, that is 436,414 reported hours of prior experience.

The short lesson did not create the skill from nothing. It taught a heavily pretrained model how a new pair of hands should perform work it had encountered elsewhere.

## An experienced cook in a new kitchen

Imagine an experienced cook entering an unfamiliar kitchen. Five demonstrations might be enough to learn which drawer holds the knives, how the stove responds and where the plates belong. They would not be enough to teach cooking from scratch.

Dexter-50 works more like that kitchen lesson.

The benchmark used a bimanual robot with two seven-degree-of-freedom arms and two 22-degree-of-freedom hands. Its 50 tasks did not appear in Dexter's own training data, but they did appear in human video, data from another robot with parallel grippers, or both. The model arrived with the task concept. The target episodes helped it execute with Dexter's body.

![A long river of human, handheld-gripper and robot experience narrows into five Dexter demonstrations, a task-specific adapter and one evaluation gate.](/binary-stories/the-five-demonstrations-came-last/hero.webp)

NVIDIA froze the pretrained weights, text encoder, video VAE and action and state heads. It trained a rank-32 LoRA adapter on the transformer for each task, using the same hyperparameters. This matters because “five-shot” here does not mean five casual videos were shown to one universal robot brain. It means five complete teleoperated episodes on the target robot, followed by a separate fine-tune for each task.

The adaptation still worked dramatically within that setup. NVIDIA reports average success rising from 40% zero-shot to 71% after one episode and 95% after five. Thirty-seven of the 50 tasks reached 100% success in the reported evaluations.

## The benchmark chose learnable tasks

There is one more boundary hidden behind the headline.

The whitepaper says the 50 tasks were those the model learned with five episodes—defined as reaching at least 80% success. In other words, Dexter-50 was selected from tasks that passed a five-shot learnability gate.

That does not invalidate the 95% result. It changes the question the result answers.

The benchmark shows how strongly a pretrained model could adapt on a selected set of cross-embodiment tasks that five episodes could teach. It does not estimate the chance that any arbitrary new task, selected before training, will reach 95% from five demonstrations.

The paper also does not state the exact number of evaluation trials per task for the zero-, one- and five-shot Dexter-50 bars. The success percentages therefore deserve their published scope, not a wider one invented by the reader.

## The real product is the prior

Few-shot robotics is often presented as a data-minimization story. The more useful engineering view is data relocation.

The target robot supplied less than three minutes of task-specific data. The prior supplied hundreds of thousands of hours from humans, handheld interfaces and other robots. The adapter then translated that prior into one robot-task pairing.

That suggests a better diligence question than “How many demonstrations?”

Ask what had to be learned before the count began.

- Was the task concept already present in human or other-robot data?
- Was the target task selected before adaptation, or after learnability was observed?
- Is one adapter serving many tasks, or is every task trained separately?
- Does the quoted time include setup, teleoperation, evaluation, failed attempts and human recovery?
- Can the result survive a preregistered set of tasks chosen independently of the model?

GR00T 2's reported result is interesting precisely because the prior appears to travel. Knowledge gathered from people and other machines helped a new robot body adapt quickly.

But the five demonstrations were not the education.

They were the orientation.

---

**Sources:** NVIDIA GEAR's [GR00T 2 project page](https://research.nvidia.com/labs/gear/gr00t-2/) and [November 2026 whitepaper](https://research.nvidia.com/labs/gear/gr00t-2/assets/gr00t2_whitepaper.pdf), especially the Dexter-50 methods and Figure 24; NVIDIA's public [Isaac-GR00T repository](https://github.com/NVIDIA/Isaac-GR00T); and the hash-bound [source Special](https://iamrobin.ai/ouroboros/202611/20261110/special/). These are NVIDIA-reported results; independent reproduction of this exact GR00T 2 benchmark was unavailable at the research cutoff. No robot experiment, fine-tune, hardware purchase, deployment or investment action was performed.
