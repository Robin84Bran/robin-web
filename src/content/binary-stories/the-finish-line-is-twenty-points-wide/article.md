---
title: "The finish line is twenty points wide"
storySlug: "the-finish-line-is-twenty-points-wide"
date: "2026-11-02"
updated: "2026-11-02"
lane: "BUILD"
excerpt: "A robot can estimate that a step is 80–100% complete. The useful engineering question begins where that band ends: who issues the acceptance receipt?"
hero: "/binary-stories/the-finish-line-is-twenty-points-wide/hero.webp"
ogImage: "/binary-stories/the-finish-line-is-twenty-points-wide/og.webp"
keywords: ["robot progress classification", "terminal-state acceptance", "Gemini Robotics ER 2", "selective retry"]
canonical: "https://iamrobin.ai/binary/stories/the-finish-line-is-twenty-points-wide/"
inLanguage: "en"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202611/20261102/special/"
sourceArtifactSha256: "958acbfb9fa39153eedf09fbd783542e3109f58c42344cafed9f77818e95fd94"
carouselPdf: "/carousels/the-finish-line-is-twenty-points-wide.pdf"
carouselCaption: "/carousels/the-finish-line-is-twenty-points-wide.txt"
carouselPages: 7
draft: false
---

The finish line is twenty points wide.

That is not a metaphor. Google’s documentation for Gemini Robotics Embodied Reasoning 2 describes progress classification in five bands: 0–20%, 20–40%, 40–60%, 60–80% and 80–100% complete.

The top band contains two states that matter very differently in a working system: almost finished and actually finished.

Imagine a harmless tabletop task with ten objects that must end inside marked spaces. Eight objects placed correctly and all ten placed correctly could both sit inside the same 80–100% class. This is an illustration, not a reported experiment. Its purpose is to expose a design boundary: a progress estimate can guide the next action without being the receipt that the task was accepted.

## A useful estimate is not a terminal state

Progress is valuable. A system that can observe work instead of advancing blindly gains an important verb between “act” and “continue”: **check**.

Google says ER 2 can use video to identify moments and classify progress. It can support a robot that adjusts its actions or retries a failed step rather than restarting the entire workflow. That is a material orchestration improvement. If step four failed, there may be no reason to repeat steps one through three.

But “retry step four” and “declare the job complete” are different decisions.

The first can use a model estimate as a control signal. The second needs an acceptance rule tied to the physical terminal state: the objects are inside their marked spaces, the latch is closed, the measured quantity is within tolerance, or a human has explicitly accepted the result.

![Five progress bands feed a model estimate, while a separate external gate issues the terminal-state acceptance receipt.](/binary-stories/the-finish-line-is-twenty-points-wide/hero.webp)

The clean architecture keeps both signals:

1. the model estimates progress;
2. the controller chooses continue, retry, pause or escalate;
3. an external check evaluates the defined terminal state; and
4. only that check records accepted completion.

The external check does not have to be elaborate. It can be a deterministic sensor threshold, a vision rule built for one narrow task, a fixture, a checksum-like inventory count, or a human sign-off. What matters is that the completion receipt is defined independently from the model’s broad progress class.

## Two benchmarks answer two questions

Google reports **57.4% accuracy** for five-band progress classification. It also reports **91.3% accuracy** and **0.96-second mean absolute distance** for moment finding.

Those results should remain separate because the questions are separate.

Moment finding asks whether the model can locate when an event occurred in a video: when a cup became full, for example. Progress classification asks which broad portion of the task has been completed. Neither number is an accepted-completion rate for a customer site, a shift, or even the hypothetical tabletop task above.

The 57.4% result is especially useful because it prevents the capability from becoming magic in the story. A progress classifier can be wrong. It can repeat a step that already succeeded, skip a step that did not, or ask for help at the wrong time. A broad final band adds another ambiguity even when the classification itself is correct.

Google’s safety evaluation reinforces the distinction. In long-horizon confidence tests, agents often requested confidence assessments as instructed but were less reliable at producing all the replanned substeps needed to finish. Requesting a confidence signal is not the same as recovering the workflow. The safety report also says it does not evaluate the certified hardware, redundancy or real-time guarantees required for a compliant physical deployment.

The model card goes further: users must exercise discretion in production, commercial and public settings, and the Robotics Models must not be used for safety-critical work where malfunction could foreseeably cause death, injury or property damage.

## Retry changes the cost shape

Selective retry can still be a strong building block.

A full-restart policy pays again for every earlier action, even when those actions were already accepted. A step-local policy spends additional inference and motion only around the uncertain step. In a long workflow, that can reduce repeated work.

It can also add attempts without improving the outcome.

That is why retries should be accounted for, not celebrated in isolation. The relevant denominator is accepted output, not issued commands. A system can become more active while becoming no more productive.

A bounded comparison would freeze the same harmless tasks and acceptance criteria, then test two policies:

- restart the whole sequence after a detected failure;
- retry only the affected step, with the same escalation limit.

For each policy, record accepted completion, false completion, retries, human takeover, elapsed time, and inference plus operator cost per accepted task. The terminal-state check must be identical on both sides.

That comparison has **not** been run here. Its results remain unknown. So do customer-site accepted output, unplanned retry rate, human takeover rate, time per accepted task and full cost per accepted task.

## Put the receipt outside the estimate

The strongest version of outcome-aware robotics is not a model that says “done” more confidently.

It is a system that knows what evidence “done” requires.

Progress classification can decide where to look and what to try next. Moment finding can help locate the transition. Selective retry can avoid replaying an entire sequence. Each is useful.

None should quietly inherit the authority to certify the terminal state.

The finish line can be twenty points wide inside the model. In the physical workflow, acceptance should still be a line.

[1]: https://cloud.google.com/blog/products/ai-machine-learning/gemini-robotics-embodied-reasoning-2-is-now-available-on-google-cloud
[2]: https://blog.google/innovation-and-ai/models-and-research/google-deepmind/gemini-robotics-er-2/
[3]: https://ai.google.dev/gemini-api/docs/robotics-overview
[4]: https://ai.google.dev/gemini-api/docs/robotics-video-progress
[5]: https://storage.googleapis.com/deepmind-media/gemini-robotics/Gemini-Robotics-2-Safety.pdf
[6]: https://deepmind.google/models/model-cards/gemini-robotics-er-2/

Sources: Google Cloud’s [public-preview announcement][1], Google’s [ER 2 release post][2], the Gemini API [robotics overview][3] and [video-progress guide][4], Google DeepMind’s [safety evaluation][5] and [model card][6], plus the hash-bound [source Special](https://iamrobin.ai/ouroboros/202611/20261102/special/). All six primary sources were reopened on November 2, 2026. Google and Google DeepMind are the source of the model and benchmark claims; independent replication was outside this bounded research. This is a systems-design story, not evidence of a completed physical trial or a safety certification.
