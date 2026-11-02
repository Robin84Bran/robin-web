# The check between act and continue

**Daily Special · 2 November 2026 · Signal 2**

This bounded public-source study asks what changes when a robot can estimate whether a step actually finished and retry that step inside a larger job. It also asks what evidence would be needed before treating that mechanism as reliable workplace performance.

The research reviewed six primary Google and Google DeepMind sources. It ran no robot, API task, tabletop comparison or customer-site trial. The proposed experiment remains a design for future testing. Completing this artifact records research progress only; the underlying robotics decision and experiment remain separate.

## The narrow finding

Google DeepMind describes Gemini Robotics Embodied Reasoning 2, or ER 2, as a high-level reasoning model for robots. It can interpret text, images, video and audio, plan a sequence, and call lower-level robot or navigation tools. Those lower layers carry out the physical movement.

ER 2 adds an explicit observation step between issuing an action and moving to the next one. Google's video documentation describes two relevant capabilities:

- **Moment finding** identifies the frame or timestamp at which an event occurs, such as a cup becoming full.
- **Progress classification** places observed work into one of five completion bands: 0–20%, 20–40%, 40–60%, 60–80%, or 80–100%.

Google says a system can use the progress estimate to adjust its actions or retry a failed step while keeping the rest of the workflow intact. In this artifact, **step-local retry** means returning to the affected step. It says nothing about where the ER 2 computation runs. Google discusses edge or local execution separately for latency-sensitive functions such as SLAM and path planning.

The simplest analogy is a cook cracking an egg into a bowl. Issuing the instruction is one event. Seeing the egg in the bowl is evidence about the result. A recipe loop that checks the bowl can decide to continue, retry, pause, or ask for help.

## What changed in the release

Google introduced ER 2 through the Gemini API and Google AI Studio on **30 July 2026**. The Gemini API changelog recorded a standard public-preview endpoint and a streaming public-preview endpoint on that date.

On **27 October 2026**, Google Cloud announced ER 2 in public preview through its enterprise Gemini platform. The API overview, updated **29 October UTC**, continued to label the robotics model as preview. The October event therefore widened the enterprise route to an existing model and its documented orchestration capabilities.

The two endpoints have different operating shapes. The standard endpoint supports function calling and several non-streaming tools. The streaming endpoint supports bidirectional Live API input and function calling, with a narrower listed tool set. A deployed robotics system still needs its own low-level controls, safety architecture, acceptance rules and operating environment.

## The benchmark makes the opportunity and limit visible

Google reports **57.4% accuracy** for progress classification across the five completion bands. Google says this exceeded earlier and competing models in its comparison. The same number also means the correct broad band appeared in a little over half of the evaluated cases.

The band design matters. Its highest category spans 80% through 100%, so a task can enter that band while a final action remains. A workplace therefore needs an external definition of an acceptable finished state. The robot's own progress label cannot serve as the only acceptance receipt.

Google reports a stronger result for the narrower moment-finding task: **91.3% accuracy** and **0.96 seconds mean absolute distance** from the reference event time. The company also reports four-times execution speed relative to the larger model categories in its comparison.

These measures answer different questions. Moment finding asks when an event appeared in video. Progress classification asks which broad completion band best describes the work. Neither score measures the share of customer jobs that reached an accepted final outcome.

The reviewed release material provides headline benchmark results. It leaves the case-level task mix, error severity and connection to a specific workplace outside the public account. Customer-site accepted completion, false completion, human takeover, time per accepted task and full cost per accepted task also remain beyond the published evidence.

## Recovery requires more than recognizing uncertainty

Google's safety report describes an ER agent that can delegate to a lower-level vision-language-action model, ask a human for clarification, or trigger a safety tool. Its evaluations combine offline one-step tests, multi-turn tests with an emulated lower-level action model, and a separate real-world safe-stopping evaluation on an Apptronik Apollo2 humanoid.

In the report's longer confidence-emulation test, agents often requested confidence assessments as instructed. Producing every revised substep required for task completion proved less reliable. The report identifies replanning failures and low-confidence tool calls among the failure modes.

That distinction is central to selective retry. Detecting doubt can stop a system from charging ahead. Useful recovery also requires a correct next step and a reliable route to completion.

The report draws another boundary around its claims. Its evaluation focuses on high-level semantic reasoning and orchestration. Certified hardware, redundancy mechanisms and real-time guarantees required for a compliant physical deployment sit outside that scope. Google's ER 2 model card also bars use in safety-critical settings where malfunction could foreseeably cause death, injury or property damage.

## A bounded comparison that could answer the next question

A harmless tabletop comparison could test whether selective retry improves accepted outcomes under fixed conditions:

| Element | Frozen definition |
| --- | --- |
| Tasks | Three tabletop tasks with visible terminal states and no people inside the robot workspace. |
| Policies | Full sequence restart after a failed step versus retry of the affected step. |
| Acceptance | A human-defined final-state check, applied identically to both policies. |
| Outcome measures | Accepted completion and false declaration of success. |
| Recovery measures | Retry count, failed retry, and human takeover. |
| Resource measures | Elapsed time, model usage, and operator time per accepted completion. |

The comparison should use the same task instances and acceptance rules for both policies. Repeated trials would expose whether selective retry preserves useful work or simply creates more attempts. Recording false declarations of success is essential because an apparent completion can be more costly than an honest request for help.

The selected action proposed this comparison. The research completed on 2 November prepared the evidence and test design; it performed none of the trials. Even a successful tabletop result would describe those test conditions. Workplace claims would require repeated customer-site evidence across real shifts, changing objects, interruptions and operating constraints.

## What the evidence supports today

ER 2 makes progress checking an explicit, measurable model capability. Google has published APIs, documentation, examples, benchmark results and an enterprise public-preview route. The documented interfaces can support a loop that acts, observes, judges and chooses whether to continue or retry.

The evidence also keeps the finish line clear. A 57.4% five-band progress score leaves ample room for a mistaken judgment. A 91.3% moment-finding score measures event timing rather than accepted job completion. The safety work shows that asking for confidence and replanning all the way to completion are separate abilities.

The useful question therefore sits one step after the check: does the next decision increase accepted output after time, model usage and human attention are counted?

## Sources

1. [Google Cloud — Gemini Robotics Embodied Reasoning 2 is now available on Google Cloud](https://cloud.google.com/blog/products/ai-machine-learning/gemini-robotics-embodied-reasoning-2-is-now-available-on-google-cloud), 27 October 2026.
2. [Google / Google DeepMind — Introducing Gemini Robotics ER 2](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/gemini-robotics-er-2/), 30 July 2026.
3. [Google AI for Developers — Gemini Robotics ER overview](https://ai.google.dev/gemini-api/docs/robotics-overview), observed 2 November 2026; page updated 29 October 2026 UTC.
4. [Google AI for Developers — Video understanding](https://ai.google.dev/gemini-api/docs/robotics-video-progress), observed 2 November 2026; page updated 4 September 2026 UTC.
5. [Google DeepMind — Gemini Robotics 2: Safety Evaluations](https://storage.googleapis.com/deepmind-media/gemini-robotics/Gemini-Robotics-2-Safety.pdf), 29 July 2026.
6. [Google DeepMind — Gemini Robotics ER 2 model card](https://deepmind.google/models/model-cards/gemini-robotics-er-2/), 30 July 2026.

Research cutoff: **2 November 2026, 10:05 Asia/Hong_Kong**. Model and benchmark results are Google-reported. Independent replication falls outside this bounded research.
