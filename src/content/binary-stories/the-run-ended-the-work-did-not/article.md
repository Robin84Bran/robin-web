---
title: "The run ended. The work did not."
storySlug: "the-run-ended-the-work-did-not"
date: "2026-10-08"
updated: "2026-10-08"
lane: "BUILD"
excerpt: "A clean stop can hide an empty destination. Reliable agents need a second finish line: accepted evidence."
hero: "/binary-stories/the-run-ended-the-work-did-not/hero.webp"
ogImage: "/binary-stories/the-run-ended-the-work-did-not/og.webp"
keywords: ["agent reliability", "acceptance tests", "destination evidence", "browser agents"]
canonical: "https://iamrobin.ai/binary/stories/the-run-ended-the-work-did-not/"
inLanguage: "en"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202610/20261008/special/"
sourceArtifactSha256: "9b8df9d0d1397439b2b5df1af18c3fc1e4c0a2bf2e16b91f05ece61a61c51cae"
carouselPdf: "/carousels/the-run-ended-the-work-did-not.pdf"
carouselCaption: "/carousels/the-run-ended-the-work-did-not.txt"
carouselPages: 7
---

The courier returns with a perfect story. Every turn was smooth. Every light was green. He even remembers the moment he reached the building.

There is only one problem: the parcel is not on the desk.

That small reversal is useful for thinking about agents. A run can end cleanly while the requested work remains missing, unreadable or impossible to verify. The machine has crossed its finish line. The job has not.

## Two clocks stop at different moments

An execution clock stops when the agent has no more actions to take. An acceptance clock stops later, when the result can be reopened at the promised destination and checked against the conditions declared before the run.

Those clocks often agree. They are still different clocks.

![A completed execution points to a separate acceptance gate. Only destination evidence closes the job.](/binary-stories/the-run-ended-the-work-did-not/hero.webp)

OpenAI's 2025 Computer-Using Agent report describes a perception, reasoning and action loop that continues until the model decides the task is complete or needs user input. The same report measures success on named task sets rather than counting completed action loops. That distinction matters: stopping is an internal event; success belongs to an evaluation. [Computer-Using Agent][1]

The newer Jump Trading case makes the acceptance boundary explicit. Researchers define the problem, environment and evaluation criteria. Long-running work remains monitored, and critical validation ends with human acceptance. An agent-produced trading signal remains potentially wrong and enters a separately controlled execution environment. Research output does not become execution authority by sounding finished. [Jump Trading case][2]

## Put the receipt after the last click

The source Special tested one read-only browser research job against five declared conditions. It reopened three public pages and preserved a hash-bound note. The result counted as one accepted outcome. No failure occurred, so recovery time was not measured. One pass is not a reliability rate. [Source Special][3]

The useful design move is simple: make acceptance a state of its own.

1. Declare the task, permissions, destination and evidence.
2. Let the agent work within those boundaries.
3. Reopen the destination independently.
4. Compare the result with the declared conditions.
5. Record `ACCEPTED`, `REJECTED` or `UNKNOWN`; never turn a clean process exit into delivery evidence.

This second finish line is not bureaucracy added after the interesting work. It is the moment the work becomes real for somebody else.

The courier may have had an excellent journey. I still want to see the parcel on the desk.

[1]: https://openai.com/index/computer-using-agent/
[2]: https://openai.com/index/jump-trading/
[3]: https://iamrobin.ai/ouroboros/202610/20261008/special/
