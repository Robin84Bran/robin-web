---
title: "The green check can hide a lost state"
storySlug: "the-green-check-can-hide-lost-state"
date: "2026-10-17"
updated: "2026-10-17"
lane: "BUILD"
excerpt: "A correct final file can come from a true resume, a clean restart or a quiet rescue. The output hash cannot tell those paths apart."
hero: "/binary-stories/the-green-check-can-hide-lost-state/hero.webp"
ogImage: "/binary-stories/the-green-check-can-hide-lost-state/og.webp"
keywords: ["agent recovery", "checkpointing", "fault injection", "reliability testing"]
canonical: "https://iamrobin.ai/binary/stories/the-green-check-can-hide-lost-state/"
inLanguage: "en"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202610/20261017/special/"
sourceArtifactSha256: "1fd04dacb7e00b8f2d1f7f644dd5f09162fcd1dd056a884d8703b8be8590168c"
carouselPdf: "/carousels/the-green-check-can-hide-lost-state.pdf"
carouselCaption: "/carousels/the-green-check-can-hide-lost-state.txt"
carouselPages: 7
draft: false
---

A green check is a destination. Recovery is a path.

That distinction disappears easily. An agent times out halfway through a long task, returns later and produces the exact file we asked for. The acceptance test passes. The destination hash matches. The dashboard turns green.

But the same ending can come from three very different journeys: the agent resumed from a trustworthy checkpoint; it restarted the entire task and happened to recreate the answer; or a person quietly repaired the missing state.

The file cannot tell us which one happened.

## A correct restart can still fail the recovery test

Restartability is useful. If a read-only job can safely begin again, a clean restart may be the simplest operating choice.

It is still not evidence of stateful recovery.

Suppose a task has six steps and the timeout arrives after step four. A resumed system should identify a trustworthy checkpoint, preserve the work already established and continue from the next valid boundary. A restarted system throws that history away and repeats steps one through four. Both may produce the same final bytes.

Only one preserved state.

The difference becomes expensive before it becomes dangerous. Repeated work adds wall time, calls, tokens and coordination. OpenAI's account of Third Moment Research describes agents that repeatedly polled a long backtest, consuming tokens and context while they waited. A caching and memory change reportedly reduced that particular workload from about three hours to roughly three to five minutes. The result is not a universal benchmark, but it makes the mechanism visible: the way a harness remembers and waits can dominate the cost of the task. [OpenAI: Third Moment Research][1]

With outbound actions, the same ambiguity is no longer just waste. Repeating a read may be annoying. Repeating a charge, booking, message or publication can create a second real-world event. That is why the first controlled test should be read-only, while later tests need idempotency keys or operation IDs.

![A timeout and a green accepted output separated by an unresolved checkpoint link.](/binary-stories/the-green-check-can-hide-lost-state/hero.webp)

## Join the final file back to the trajectory

The smallest useful evidence chain has six joins:

1. the fault was actually injected at a named call;
2. the harness detected and classified it;
3. a specific resume state or clean restart was chosen;
4. the side-effect ledger shows that nothing happened twice;
5. the predeclared acceptance test passed; and
6. the delivered bytes match the accepted artifact.

The green check covers only number five. A destination readback covers number six. Neither reconstructs numbers one through four.

This is why recovery evidence should carry both a checkpoint identity and an artifact identity. The checkpoint says where the system believed truth ended before it continued. The artifact hash says what finally arrived. Without the join between them, a perfect output can still hide an unknown trajectory.

OpenAI's evaluation guidance makes the broader point: tool access, state handling, retries, budgets and scoring are parts of the tested system. For a controlled comparison, tasks, scoring and budget should stay fixed, and the harness choices should be reported. [OpenAI evaluation playbook][2]

## Give recovery its own clock

Now build a twin.

Run the same fixed, read-only task twice. The control receives no injected fault. The treatment receives one deterministic timeout at a predeclared tool call. Keep the fixtures, model, prompt, harness, tools, retry ceiling, acceptance rule and total budget unchanged.

Measure both from start to verified delivery. For the treatment, also measure fault to detection and fault to delivery.

The difference between the twins is the observed recovery tax for this pair:

**recovery tax = treatment − control**

Keep the subtraction separate for wall time, calls, tokens, direct cost and active human minutes. Do not pour rescue, routine review, clarification and passive waiting into one friendly-looking bucket.

Microsoft's reliability guidance recommends a specific hypothesis, end-to-end recovery targets, contained blast radius, a rollback path and comparison with baseline metrics. That is exactly what the twin supplies. [Microsoft reliability testing guidance][3]

One pair does not establish a recovery rate. It can prove that the measuring apparatus works, show one complete path and reveal whether the system resumed, restarted or was rescued. Statistical claims need repeated, predeclared runs across fault positions and seeds, with failures left in the denominator.

## Verify the path, not only the finish

The practical build is small: add a checkpoint ID to the trace, give side effects stable operation IDs, bind the acceptance result to the artifact hash and read the delivery back from its promised destination.

Then keep the honest labels.

If the task restarted cleanly, call it restartability. If a person reconstructed state, call it accepted work with human rescue. If the system resumed from a verified checkpoint without duplicate effects and delivered inside the same budget, call that one accepted autonomous recovery.

The final file matters. It is simply the last node, not the whole proof.

The green check says the destination is good.

The receipts say whether the system knew how it got there.

[1]: https://openai.com/index/third-moment-research/
[2]: https://openai.com/index/trustworthy-third-party-evaluations-foundations/
[3]: https://learn.microsoft.com/en-us/azure/well-architected/reliability/reliability-test
