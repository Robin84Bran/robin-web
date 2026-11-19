---
title: "The robot passed 99%. The cost column is blank."
storySlug: "the-robot-passed-99-the-cost-column-is-blank"
date: "2026-11-19"
updated: "2026-11-19"
lane: "INVEST"
excerpt: "Two factory robots completed more than 90,000 inspections with 99% mission success. That is real operating evidence. It is not yet a unit-economics result."
hero: "/binary-stories/the-robot-passed-99-the-cost-column-is-blank/hero.webp"
ogImage: "/binary-stories/the-robot-passed-99-the-cost-column-is-blank/og.webp"
keywords: ["factory robotics", "Spot robot", "GlobalFoundries", "unit economics", "physical AI"]
canonical: "https://iamrobin.ai/binary/stories/the-robot-passed-99-the-cost-column-is-blank/"
inLanguage: "en"
translationReview: "PASS"
sourceSpecial: "https://iamrobin.ai/ouroboros/202611/20261119/special/"
sourceArtifactSha256: "68028ae4d33fad8df32190dfd7f5ff8b7dffe5f42e79ff83685154ff85d39c6b"
carouselPdf: "/carousels/the-robot-passed-99-the-cost-column-is-blank.pdf"
carouselCaption: "/carousels/the-robot-passed-99-the-cost-column-is-blank.txt"
carouselPages: 7
draft: false
---

The robot passed 99%. The cost column is blank.

That is not a criticism of the robot. It is a warning about the spreadsheet.

GlobalFoundries and Boston Dynamics have published an unusually concrete factory record. Two Spot robots in Singapore travelled nearly 900 kilometres and completed more than 90,000 inspections in sub-fab areas from April 2026 to their 17 November announcement. The companies report 99% mission success. They also say 875 routine inspections were redeployed in two weeks using updated hardware and software.

These are not demo-stage numbers. They describe named robots, a named customer, a real factory setting and months of repeated work. GlobalFoundries is expanding Spot across sites in the United States, Germany and Singapore. The operating evidence deserves to be taken seriously.

But a capital decision needs a second ledger.

The first ledger asks whether the robot can repeat a route. The second asks whether each verified inspection creates more value than the full system costs. The public record fills much of the first ledger. It leaves the decisive cells in the second one empty.

## The score belongs to a mission

Boston Dynamics' Autowalk documentation describes a walk as a sequence: go to a location, perform an action, move to the next location, perform another action. A mission can contain many inspection actions.

That makes the word **success** more slippery than it looks.

A mission may finish while one gauge image is blurred. A robot may reach every location but require a remote prompt halfway through. An inspection may be captured correctly but never cause a useful maintenance action. Each event sits at a different layer of the system.

![A five-stage evidence funnel separates a completed robot mission from captured inspections, correct readings, useful maintenance actions and value that exceeds fully loaded cost. Only mission success has a published rate.](/binary-stories/the-robot-passed-99-the-cost-column-is-blank/hero.webp)

The published 99% rate applies to missions. The announcement does not disclose how many mission attempts occurred, how many inspections sit inside a typical mission, or how retries, skipped actions, remote prompts and manual takeovers are classified. It also does not publish inspection accuracy.

This does not make 99% unimportant. Reliable route execution is necessary. It simply means the number cannot be carried unchanged into the economic column.

## Ninety thousand is activity, not yet value

The operating record is still impressive.

More than 90,000 inspections over nearly 900 kilometres implies roughly 100 inspections per kilometre. The figures are rounded, so this is an orientation ratio, not a precision metric. If the work were evenly divided, each robot performed more than 45,000 inspections. The actual split is not public.

Those counts establish repetition at scale. They do not yet tell us whether the resulting readings were correct, whether engineers trusted them, or whether the program reduced downtime, scrap or labour enough to cover its cost.

Boston Dynamics' earlier GlobalFoundries case study explains why the mechanism is plausible. Semiconductor facilities contain thousands of inspection points on pumps, motors, compressed-gas systems and other long-lived equipment. Installing a fixed sensor on every asset may be uneconomic. A mobile robot can carry one sensor suite to many locations, collecting thermal data and images of analogue gauges.

This is the elegant part of the idea: move the sensor, not the factory.

Yet the case study described an expected path toward better maintenance planning. It did not publish a GlobalFoundries-specific cost comparison or a measured reduction in downtime or scrap. The latest announcement says Spot has helped prevent downtime and improve efficiency, but it still does not give the outcome denominator needed to calculate the return.

## The economic unit is a verified inspection

For a buyer, the useful denominator is not kilometres walked or even missions completed. It is successful inspections that produce trustworthy data at an acceptable total cost.

A fully loaded numerator would include more than the robot body. It would include sensor payloads, docks, software, systems integration, route creation and redeployment, connectivity, maintenance, spares, monitoring, human intervention and review time.

The denominator also needs discipline. An inspection should count as successful only when the robot reaches the point, captures usable data, the reading meets the required accuracy, and the result enters the maintenance workflow. If the system needs a person to rescue the mission or re-read the gauge, that work belongs in the cost.

The equation is simple:

**Fully loaded program cost ÷ verified successful inspections**

The measurement is not.

Two missing statistics would change the picture quickly. The first is human takeovers per thousand inspections, including remote prompts, manual driving, resets and route edits. The second is fully loaded cost per successful inspection, ideally compared with the same work done manually or with fixed sensors.

Neither needs the robot to be people-free. Occasional assistance may be economically sensible. The point is to count it.

## The most valuable robot may still look expensive

A fab is a peculiar place to judge automation. The avoided event can matter far more than the average inspection. One early warning that prevents downtime or scrap may create substantial value. That possibility is exactly why the programme is worth studying.

It is also why a generic per-inspection price can mislead.

An economic review should connect three layers:

1. **operating reliability** — missions, inspections, interventions and uptime;
2. **measurement quality** — usable readings, false alarms and missed anomalies; and
3. **factory consequence** — labour displaced or redirected, downtime avoided, scrap prevented and maintenance improved.

The first layer is partly disclosed. The second and third are not quantified in the reviewed public sources.

That leaves room for two opposite mistakes. A sceptic can dismiss a real operating programme because the robot still needs humans. An enthusiast can turn a mission-success percentage into a return on investment. Both skip the same accounting work.

## Scaling creates a better test

GlobalFoundries plans to expand Spot across several sites. That expansion can make the economics easier to see, not harder.

The same robot programme running in Singapore, Burlington, Malta and Dresden creates natural questions. How much route-building work repeats at each site? Which inspection types transfer cleanly? Does human intervention fall as teams learn? Do spares, monitoring and integration become cheaper per inspection as the fleet grows? Does inspection accuracy hold across different equipment and lighting?

A useful scale report would publish the same small set of measures for every site: missions attempted, inspections attempted, usable readings, human interventions, robot and operator hours, fully loaded cost, and the maintenance outcomes tied to those readings.

No universal benchmark is needed. Consistent definitions would already reveal whether scale is producing a learning curve or merely a larger activity count.

The planned Atlas testing in early 2027 belongs to a different evidence stage. It is an early trial of potential humanoid tasks. It should not inherit the operating record of Spot, and Spot should not borrow the novelty of Atlas. One is an established inspection programme. The other is a future experiment.

## A score worth keeping, in the right column

The reported 99% mission success rate matters. It says a mobile robot can repeatedly traverse a difficult industrial environment and finish its programmed routes often enough for a major manufacturer to expand the programme.

That is a strong engineering signal.

The investment signal remains narrower. The public evidence does not yet show inspection accuracy, intervention load, fully loaded cost or verified factory savings. It cannot establish that the programme is uneconomic, either. The economics are simply not public enough to grade.

Keep the 99%.

Just do not let it fill the cost column by itself.

---

**Sources:** GlobalFoundries' [17 November 2026 collaboration announcement](https://gf.com/news-and-events/news/boston-dynamics-and-globalfoundries-expand-robotics-collaboration/), Boston Dynamics' [GlobalFoundries case study](https://bostondynamics.com/case-studies/globalfoundries/) and [Autowalk documentation](https://dev.bostondynamics.com/docs/concepts/autonomy/autowalk_service), plus the hash-bound [source Special](https://iamrobin.ai/ouroboros/202611/20261119/special/). Operating results are company-reported. The reviewed sources do not publish the mission denominator, inspection accuracy, human-intervention rate or GlobalFoundries-specific fully loaded programme cost. No robot trial, purchase, deployment, company contact or capital allocation was performed for this story.
