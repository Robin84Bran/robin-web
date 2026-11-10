# Five demonstrations after a long education

Published: 10 November 2026  
Source signal: 2  
Research cutoff: 10 November 2026, 09:58 HKT  
Scope: A public-source explanation of NVIDIA's reported GR00T 2 Dexter-50 adaptation result. This research did not run a robot test, fine-tune a model, purchase hardware, deploy a system, or make an underlying adoption or capital decision.

## Question

NVIDIA reports that GR00T 2 reached 95% average success across 50 robot tasks after five demonstrations per task. This artifact asks what those five demonstrations contained, what work happened before and after them, and how broadly the result can be interpreted.

## What was studied

The reported evaluation used Dexter, a Tianji robot with two seven-degree-of-freedom arms and two 22-degree-of-freedom Sharpa hands. Its 50 tasks were absent from Dexter's own training data, while appearing in human video, data from another robot called YAM, or both.

NVIDIA evaluated three conditions:

| Target-robot teaching per task | Reported average success |
| --- | ---: |
| No Dexter episode; instruction only | 40% |
| One teleoperated Dexter episode | 71% |
| Five teleoperated Dexter episodes | 95% |

The five episodes contained under three minutes of Dexter data per task. NVIDIA then trained a separate rank-32 LoRA adapter for each task, keeping the base model and several other components frozen. It reports about 30 minutes of fine-tuning on one RTX 5090 for each adaptation. Thirty-seven of the 50 tasks reportedly succeeded in every evaluation trial.

## Why five is only the final lesson

GR00T 2 arrived with extensive prior training. NVIDIA reports a pretraining mixture of 402,730 hours of egocentric human video, 10,184 hours of handheld-gripper demonstrations across 2,897 tasks, and 23,500 hours of robot teleoperation.

An experienced cook entering a new kitchen provides a useful analogy. The cook already understands ingredients, tools and the order of a recipe. A short tour connects that experience to the location and behavior of this kitchen's equipment. In Dexter-50, the target tasks already existed in another robot's data, human video, or both. The five Dexter episodes helped connect that prior experience to Dexter's particular hands.

This makes the result more precise than the headline can sound. “Five demonstrations” means five complete teleoperated episodes on the target robot for each task, followed by a task-specific fine-tune. It does not describe a blank-slate robot learning any arbitrary task from five casual videos.

## The selection qualifier

The GR00T 2 whitepaper states that researchers chose the 50 tasks from tasks the model learned with five episodes at a success rate of at least 80%. It adds that the five-episode rate is high partly by construction.

The benchmark therefore shows a large improvement on a selected set of learnable tasks. It does not estimate success on every new task a factory, laboratory or home might choose in advance.

The 40%, 71% and 95% figures are averages across the selected collection. The project page and the whitepaper's Dexter-50 section do not state the number of evaluation trials per task, which limits how confidently the “every trial” result can describe longer-run reliability.

## What the evidence supports

The published result supports a useful mechanism: broad pretraining can leave a robot model close enough to a task that a few target-robot examples produce a large improvement. That could reduce the demonstration-data portion of adapting a robot.

The full economic question remains wider. Total adaptation effort also includes task and workcell setup, teleoperation, failed attempts, human intervention, evaluation, robot hardware and the original pretraining program. NVIDIA's current GR00T 2 project page says code will be available in December; at the research cutoff, the public Isaac-GR00T repository described N1.7 as the available general-release model. Independent reproduction of the exact Dexter-50 result was therefore still a future test.

The selected action proposed running one repeatable bimanual task and recording adaptation time, success and recovery minutes. This artifact completes the source research around that proposal. It does not claim that the experiment or an adoption decision occurred.

## Sources

1. [NVIDIA GEAR — GR00T 2 project page](https://research.nvidia.com/labs/gear/gr00t-2/), November 2026; read 10 November 2026.
2. [NVIDIA — GR00T 2 whitepaper](https://research.nvidia.com/labs/gear/gr00t-2/assets/gr00t2_whitepaper.pdf), especially pp. 6–8 and 41–42; retrieved 10 November 2026. Retrieved PDF SHA-256: `a7316845d53aa61db023de15ca4f4fad422ed071f256d9fa7e8801aa7376dd50`.
3. [NVIDIA — Isaac-GR00T public repository](https://github.com/NVIDIA/Isaac-GR00T), current N1.7 release description; read 10 November 2026.
4. [NVIDIA et al. — GR00T N1](https://arxiv.org/abs/2503.14734), 18 March 2025, background on the preceding open model generation.
