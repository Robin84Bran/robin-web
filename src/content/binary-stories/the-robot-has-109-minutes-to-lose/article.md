---
title: "The robot has 109 minutes to lose"
storySlug: "the-robot-has-109-minutes-to-lose"
date: "2026-10-20"
updated: "2026-10-20"
lane: "BUILD"
excerpt: "A 90/9 battery cycle leaves about 109 minutes between the ideal runtime ceiling and a 20-hour work claim. That margin is where the whole shift has to prove itself."
hero: "/binary-stories/the-robot-has-109-minutes-to-lose/hero.webp"
ogImage: "/binary-stories/the-robot-has-109-minutes-to-lose/og.webp"
keywords: ["Digit 5", "robot uptime", "fast charging", "shift operations"]
canonical: "https://iamrobin.ai/binary/stories/the-robot-has-109-minutes-to-lose/"
inLanguage: "en"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202610/20261020/special/"
sourceArtifactSha256: "996dc33d47da5b4c7e54d570518e0ed52b7500812657aae2ee4fab4aa424a4f4"
carouselPdf: "/carousels/the-robot-has-109-minutes-to-lose.pdf"
carouselCaption: "/carousels/the-robot-has-109-minutes-to-lose.txt"
carouselPages: 7
draft: false
---

Nine minutes sounds like a charging story.

It is really the opening line of a 24-hour operations story.

Agility Robotics says Digit 5 will run for 90 minutes, recharge in nine and deliver more than 20 hours of productive work per day. The battery arithmetic creates an unusually clear test. Under an ideal 90/9 rhythm, the robot could run for about **21 hours 49 minutes**. Use exactly 20 hours as the claimed floor and a small envelope appears between the two numbers.

It contains **109 minutes**.

That is all the room left for everything the battery clock does not count.

## The shift starts after the specification

An ideal day gives charging 2 hours 11 minutes. A 20-hour productive day leaves four hours outside productive work. Subtract the ideal charging time and the remaining 1 hour 49 minutes has to absorb the rest of the system:

- travel to and from the charger;
- docking and alignment;
- a queue or a hot battery;
- blocked paths and missing work;
- planned service, faults and recovery;
- human intervention; and
- tasks the customer rejects or sends back.

![A 24-hour shift separates a 20-hour productive floor, an ideal charging allowance, and a 109-minute envelope for every other loss.](/binary-stories/the-robot-has-109-minutes-to-lose/hero.webp)

The 109 minutes are not measured downtime. They are a derived budget at the 20-hour floor, under assumptions kind enough to make a spreadsheet blush. The robot is always ready. The charger is always free. Work is always waiting. Docking takes no time.

Reality gets the same budget without the kindness.

## A fleet spends the budget together

One robot occupies an ideal charger for 9.1% of the clock. Five consume 45.5% of one charger's capacity if their arrivals are perfectly staggered. Ten consume 90.9%. Eleven consume 100%, before docking, variation or failure gets a single minute.

This is not a recommended robots-per-charger ratio. Agility has not published one for Digit 5. It is a useful boundary because it changes what “fast charging” means. The faster battery may remove the need for a spare robot, yet a fleet can quietly give the saved time back through one shared queue.

The unit of design is no longer only the robot. It is the robot, charger, route, task queue and recovery process moving through the same shift.

## Motion cannot sign the receipt

Agility says an earlier Digit moved more than 100,000 totes at GXO. That cumulative volume is real. It is not enough to fill the 109-minute envelope because the published milestone does not include scheduled hours, charging time, interventions or rejected tasks.

The clean denominator is **accepted tasks per scheduled hour**. Put productive autonomous minutes beside it. One measures what the customer received. The other shows where the shift went.

That pairing prevents a graceful robot from receiving credit for an empty conveyor, a repeated tote or a charger queue. It also prevents every warehouse delay from being blamed on the robot. The ledger can separate them.

Agility's own deployment process points in this direction: a 90-day operational pilot measures uptime, throughput and reliability before scaling. Digit 5, however, remains in development, and Agility labels its specifications as preliminary estimates based on internal testing and pre-production configurations. The 90/9 system and the 20-hour result are targets, not a published complete-shift customer record.

Fast charging therefore does something valuable but narrower than finishing the business case. It buys the operation a small loss budget.

The next number to watch is not nine.

It is how much of the 109 minutes the customer gets to keep.

[1]: https://www.agilityrobotics.com/content/agility-robotics-selects-nyobolt-as-its-ultra-fast-charging-battery-technology-partner-for-digit-5
[2]: https://www.sec.gov/Archives/edgar/data/2074973/000121390026107265/ea0307857-425_churchill11.htm
[3]: https://www.agilityrobotics.com/faq
[4]: https://www.agilityrobotics.com/content/digit-moves-over-100k-totes
[5]: https://www.agilityrobotics.com/solutions/digit-5

Sources: Agility Robotics' [battery announcement][1], the [SEC-filed investor-day transcript][2], Agility's [deployment FAQ][3], the [100,000-tote milestone][4] and the [Digit 5 product page][5]. The time budget is an illustration derived from the announced targets. It is not an observed deployment result or a facility recommendation.
