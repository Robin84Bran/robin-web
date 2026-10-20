# Nine minutes cannot prove a shift

Research date: October 20, 2026, Hong Kong time. This note evaluates a disclosed product target. It does not report a completed Digit 5 customer trial.

## The small question

Agility Robotics says Digit 5 will run for 90 minutes, recharge in nine, and work more than 20 hours in a 24-hour day. The arithmetic is plausible. The business claim is larger than the arithmetic.

This artifact asks what the battery target can establish by itself, where whole-system evidence must begin, and how a fleet can lose the apparent advantage even when every individual charge meets nine minutes.

## The battery ceiling

One ideal cycle contains 90 running minutes and nine charging minutes:

| Derived quantity | Formula | Result |
| --- | --- | ---: |
| Battery-only work fraction | `90 / (90 + 9)` | 90.91% |
| Battery-only charge fraction | `9 / (90 + 9)` | 9.09% |
| Ideal runtime in 24 hours | `24 × 90 / 99` | 21.82 hours |
| Ideal charging in 24 hours | `24 × 9 / 99` | 2.18 hours |

In a steady-state thought experiment with instant docking, an always-free charger, no cooling delay, no faults, no service and work waiting at every moment, the battery ratio supports about **21 hours 49 minutes of runtime** per day.

Agility's public target is more than 20 hours, or more than 83.33% of a day. At exactly 20 hours, the difference from the ideal battery ceiling is about **109 minutes**, or **7.58 percentage points**. That interval is not measured downtime. It is the maximum space, at the stated floor, in which every non-charging loss would have to fit.

## The bottleneck moved

Agility describes Digit 4 as having an approximately 2:1 run-to-charge ratio. That produces a 66.67% ideal battery-only ceiling, or 16 runtime hours in a day before any other loss. Moving to 10:1 raises the theoretical ceiling by about 5 hours 49 minutes.

That is material. It also changes the question. Once charging occupies roughly one-eleventh of the ideal cycle, these become load-bearing:

- time to leave the workflow, dock and resume;
- charger waiting and imperfect fleet staggering;
- cooling or charge derating under the customer's load and temperature;
- blocked paths, empty input queues and task changeovers;
- planned service, faults and recovery;
- human interventions; and
- rejected or repeated work.

A robot can be powered on without producing an accepted task. Productive availability therefore needs both a time ledger and an output denominator.

## One charger becomes a queue

The same 90/9 target creates a simple fleet bound. Under perfect staggering, one robot occupies one charger for 9.09% of steady-state time.

| Robots per charger | Ideal charger occupancy | Buffer before docking, variability or faults |
| ---: | ---: | ---: |
| 1 | 9.09% | 90.91% |
| 5 | 45.45% | 54.55% |
| 10 | 90.91% | 9.09% |
| 11 | 100.00% | 0.00% |

This is a queueing boundary, not a proposed deployment design. Eleven perfectly synchronized demand streams consume the whole charger clock; real docking and arrival variability would require slack. Agility has not published a customer charger ratio, queue distribution or docking-time series for Digit 5.

## The smallest customer ledger

Agility's own deployment FAQ says its 90-day operational pilot measures uptime, throughput and reliability. A useful full-shift result can connect those words with one shared ledger:

| Field | What to record | Why it changes the claim |
| --- | --- | --- |
| Scheduled minutes | Start and end of the customer shift | Defines the denominator |
| Accepted task count | Tasks accepted by the customer's normal quality rule | Separates motion from useful output |
| Productive autonomous minutes | Time performing eventually accepted work | Connects availability to output |
| Charging minutes | Plugged-in time, including any derating | Tests the nine-minute target |
| Docking and queue minutes | Travel, alignment and waiting for a charger | Tests fleet coordination |
| Blocked and waiting minutes | No work, path obstruction or upstream delay | Separates robot failure from system delay |
| Fault and recovery minutes | Failure, diagnosis and restoration | Reveals operational resilience |
| Human interventions | Count, duration and reason | Prices hidden labor |
| Planned service minutes | Inspection, cleaning and scheduled maintenance | Keeps maintenance inside availability |
| Rejected or repeated tasks | Customer-quality failures and rework | Prevents gross motion from becoming accepted throughput |
| Battery state of health | Start, end and cycle count under the same duty profile | Connects day-one speed to life-cycle performance |

The primary output is `accepted tasks / scheduled hour`. The companion availability number is `productive autonomous minutes / scheduled minutes`. Both should be reported across complete shifts, not only during the cleanest continuous run.

## What the current evidence does and does not establish

Agility reports that Digit 4 moved more than 100,000 totes at GXO. That is useful cumulative volume evidence. The cited page does not provide the elapsed scheduled hours, intervention count, rejected-task count or charging ledger needed to calculate accepted tasks per scheduled hour.

Digit 5 is still described by Agility as being in development, with preliminary specifications based on internal testing and benchmarking of pre-production configurations. Early customer access is expected in the first half of 2027. Agility's announcement also identifies the Digit 5 battery system's runtime, recharge time, cycle life, uptime and fleet economics as forward-looking statements and names the risk that commercial performance may differ.

The honest conclusion is narrow. A nine-minute charge can remove a large battery bottleneck. It cannot, by itself, prove more than 20 productive customer hours, a charger plan for a fleet, durable cycle life in the integrated robot, or attractive cost per accepted task.

## Method and limits

The announced runtime and recharge targets were converted into steady-state time fractions. The fleet table multiplies the ideal charger demand by the robot count and assumes perfect staggering, zero docking time, no derating and no faults. It is a capacity bound, not an observed queue or a facility recommendation.

No robot, charger, battery pack, customer shift, service record or contract was inspected. No customer operation was contacted. The note does not estimate purchase price, labor substitution, maintenance cost, energy cost, depreciation or return on investment. It completes a public-source measurement map and leaves the underlying commercial judgment on watch.

## Sources

1. [Agility Robotics and Nyobolt battery announcement](https://www.agilityrobotics.com/content/agility-robotics-selects-nyobolt-as-its-ultra-fast-charging-battery-technology-partner-for-digit-5) — October 15, 2026; 90-minute runtime, nine-minute recharge, 10:1 ratio, 20-plus-hour target, early-access timing and forward-looking limits; reopened October 20, 2026.
2. [Agility Robotics investor-day transcript filed with the SEC](https://www.sec.gov/Archives/edgar/data/2074973/000121390026107265/ea0307857-425_churchill11.htm) — filed October 6, 2026; Digit 4 comparison, battery rationale and multi-shift claim; reopened October 20, 2026.
3. [Agility Robotics deployment FAQ](https://www.agilityrobotics.com/faq) — 90-day pilot and stated uptime, throughput and reliability measures; reopened October 20, 2026.
4. [Agility Robotics, Digit moves over 100,000 totes](https://www.agilityrobotics.com/content/digit-moves-over-100k-totes) — cumulative Digit 4 deployment milestone and its disclosed denominator limits; reopened October 20, 2026.
5. [Agility Robotics, Digit 5 product page](https://www.agilityrobotics.com/solutions/digit-5) — development status and preliminary-specification qualifier; reopened October 20, 2026.
