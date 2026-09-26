---
title: "The Heat Bill in Space"
date: 2026-09-26
updated: 2026-09-26
section: Ouroboros
series: Daily Action Item
categories:
  - AI Infrastructure
  - Space Systems
  - Capital Economics
tags:
  - AI Infrastructure
  - Space Computing
keywords:
  - Project Suncatcher
  - thermal control
  - useful compute
excerpt: "Abundant sunlight still leaves a heat bill. An idealized radiator calculation connects orbital AI engineering to useful-work economics."
hero: /action-item/20260926/hero.webp
ogImage: /action-item/20260926/og.webp
canonical: "https://iamrobin.ai/ouroboros/202609/20260926/action_item/"
author: https://iamrobin.ai/#person
inLanguage: en
draft: false
sourceAction: "Daily Briefing 2026-09-26, item 5"
ledgerId: ORBITAL-HEAT-20260926
visualHeadline: "The heat bill in space"
visualSubhead: "Power becomes useful work only when heat can leave."
visualFooter: "POWER / HEAT / MASS / USEFUL OUTPUT"
visualNodes: "POWER|COMPUTE|HEAT|OUTPUT"
---

Space has plenty of room. A hot chip has a much smaller problem: finding somewhere to put its heat.

The conclusion is simple. Orbital computing has to earn its economics through useful work delivered over a system's life. Sunshine is an input. A radiator, a reliable workload and a way to recover from failures are part of the machine that turns that input into value.

Google's September 24 update makes this question timely. The company says its first Project Suncatcher TPU experiment, developed with Planet, is planned for the Transporter-18 mission. An orbital test can teach engineers something a presentation cannot. It still leaves a considerable distance between a chip surviving space and a customer buying dependable computing. [Google's test update](https://blog.google/innovation-and-ai/models-and-research/google-research/google-project-suncatcher-facts/)

That distance is where I would spend my attention. The interesting spreadsheet begins with the heat bill.

## The radiator gets a vote

Imagine putting a server beside an open window on a freezing day. Air carries heat away. Now remove the air. The darkness outside the window has not supplied a fan.

Inside a spacecraft, heat can move through solid materials and engineered thermal paths. To leave the craft for the surrounding vacuum, it must be radiated away. NASA's small-spacecraft thermal guide distinguishes internal conduction from external radiation and discusses the surfaces that control heat absorption and emission. A cold environment alone does not tell us how quickly a working machine can reject heat. [NASA thermal-control guide](https://www.nasa.gov/smallsat-institute/sst-soa/thermal-control/)

For a computing system, that makes the radiator a capacity constraint. Give the electronics more power and they can produce more heat. Unless the thermal system can remove it, some other part of the operating plan must change. Perhaps the machine runs less intensely. Perhaps the radiator gets larger. Perhaps the architecture tolerates a higher heat-rejection temperature. Each option asks a different question of the design.

This is a useful correction to the picture of a data center floating in a cosmic refrigerator. The refrigerator metaphor leaves out the plumbing. It also leaves out the outside surface that finally hands the heat to space. Those parts belong in the same drawing as the chips and solar panels.

![An original conceptual diagram links power, useful computation and rejected heat, with idealized radiator areas at three temperatures. It is not a Google system design.](/action-item/20260926/thermal-budget.svg)

## A one-megawatt thought experiment

We can put a rough scale on the problem without pretending to design Google's satellite. Start with an imaginary system that must reject one megawatt of heat. Assume a uniform radiator, emissivity of 0.9, an unobstructed view of a negligibly cold sink and no absorbed sunlight or Earth radiation. Ignore the mass and power of all supporting equipment. These are deliberately generous simplifications.

The Stefan–Boltzmann relation gives emitted thermal power as emissivity multiplied by the radiation constant, emitting area and absolute temperature to the fourth power. The NASA-hosted spacecraft thermal-control reference explains the heat balance and uses a radiation constant of approximately 5.67 × 10⁻⁸ W m⁻² K⁻⁴. For our assumptions, area is heat divided by emissivity, that constant and temperature to the fourth power. [Spacecraft thermal-control reference](https://ntrs.nasa.gov/api/citations/20010091676/downloads/20010091676.pdf)

| Assumed radiator temperature | Emitted power per square metre | Emitting area for 1 MW |
| --- | ---: | ---: |
| 300 K, about 27°C | About 413 W | About 2,420 m² |
| 350 K, about 77°C | About 766 W | About 1,306 m² |
| 400 K, about 127°C | About 1,306 W | About 765 m² |

The figures are calculated examples, rounded to sensible precision. They describe total emitting surface under the stated assumptions, not a satellite's footprint, its solar-panel area or a construction quotation. Two usable emitting faces would count as two surfaces. A face looking at a warm object would need a different heat balance.

Raising the assumed radiator temperature from 300 K to 400 K cuts this example's required emitting area to roughly 32% of its former size. That is the fourth-power relationship doing work. It is also where an attractive spreadsheet can become a bad engineering memo: a smaller calculated surface does not establish that the electronics, thermal interfaces and materials can operate at the required temperatures.

The radiator temperature is not the processor's junction temperature. Heat must travel from the source to the radiator, across real temperature differences and imperfect interfaces. A permitted temperature at one point is not automatically available everywhere else. We have calculated a sensitivity, not approved a design.

## Turn area into an honest capital question

The temptation is to multiply the table by a launch price and announce the winner. One ingredient is missing: mass per unit of usable thermal capacity. We have not established it for Suncatcher.

A square metre of emitting surface is not a kilogram. Supports, deployment hardware, heat transport, protection and redundancy could matter to the final assembly. Their contribution depends on the actual architecture. Quoting an area without that architecture cannot produce a reliable launch bill, and a launch bill alone cannot produce the cost of a delivered computing hour.

I would keep three columns separate in a first underwriting sheet. The first contains measured values from a particular design. The second contains the assumptions used to fill gaps. The third shows which conclusion changes if an assumption moves. A blank measured-value cell is useful: it tells the next engineer or investor exactly what evidence could alter the argument.

Suppose two hypothetical designs have equal launch mass. One supports more installed processing hardware; the other delivers less peak capacity but runs reliably for longer. We cannot choose between them from installed capacity alone. The answer depends on completed work, service life and the cost of keeping that work usable. An impressive launch photograph cannot fill those cells.

The thermal table earns its place by identifying a question. It does not answer the whole investment case. If a supplier can demonstrate more dependable heat rejection per unit of deployed mass, that improvement might change the economics of several possible compute architectures. Whether any particular supplier can capture that value remains a separate commercial question.

## A test earns one claim at a time

Google introduced Suncatcher in November 2025 as research into interconnected solar-powered satellites carrying TPUs, with a planned two-satellite learning mission with Planet. That announcement establishes the program's earlier intent. It is historical context, not fresh deployment evidence. [Original Suncatcher announcement](https://blog.google/innovation-and-ai/technology/research/google-project-suncatcher/)

The September update adds the planned first orbital hardware experiment and retains a later two-satellite test in 2027. It discusses hardware survival, cooling and interconnection. At this writing, those plans do not establish that the first flight has occurred or that a fleet has delivered commercial workloads.

For evaluation, I would draw a short ladder: hardware operates; a defined workload runs; output passes a correctness check; the result repeats across operating conditions; a customer can rely on an economically useful service. Each rung needs its own observation. Evidence on an earlier rung can justify the next experiment without proving the final business.

This is not a demand that a research team prove a mature business before launching its first test. Early experiments are valuable precisely because important answers are missing. The discipline is to give a successful experiment the credit it earned. A hardware-survival result deserves recognition as a hardware-survival result. A continuous workload record deserves a different kind of recognition.

That approach also makes disappointing results more informative. If a test runs correctly at low load but encounters a thermal limit at higher load, the evidence narrows the design problem. It need not settle the long-term idea in either direction. The useful next question is what changed, which limit appeared and whether an affordable revision can address it.

## Useful output is the denominator

Power is easy to describe. A computing service needs a job definition. For a hypothetical orbital deployment, I would first specify the input, required output, correctness test, deadline and recovery behavior. Only then would I compare the cost with a terrestrial alternative that meets those same conditions.

A batch task that tolerates a delay and a request that needs a quick response pose different service questions. So does a workload with data already in orbit compared with one that must move large inputs from the ground. These are candidate comparison cases, not claims that Suncatcher currently serves either market. Their purpose is to stop a broad phrase such as “AI compute” from hiding the product being evaluated.

A simple proposed denominator is accepted work returned to the user over the system's useful life. The numerator should include the costs assigned to making and sustaining that service: hardware, launch, operations, communications, replacement and retirement. Financing and the timing of cash flows matter when an investor turns the comparison into a return calculation. We have not populated those inputs for Google.

Failure handling belongs in the product definition too. An output that arrives after its deadline, an unnoticed corrupted result and a successfully retried job have different value. A fair comparison needs to say what the customer receives and who carries the cost when the system has to try again. Raw processing time is an incomplete receipt.

This gives a small team a practical way to study a large ambition. Instead of forecasting an entire orbital industry, freeze one workload and list the evidence needed to price its delivery. The resulting sheet may have many empty fields. If they are the right fields, the research has already become more useful.

## The last day belongs in the first model

A satellite's economics continue after the exciting part of the mission. ESA's debris-mitigation material includes system design, operation and disposal, as well as collision, failure and safe-reentry considerations. These are useful lifecycle questions. ESA's own policy does not, by itself, establish the legal requirements that apply to Google's particular mission. [ESA lifecycle framework](https://technology.esa.int/page/space-debris-mitigation)

For our proposed evidence card, retirement is a cost and reliability question from the beginning. What capability remains available near the end of service? What happens when the unit cannot complete its planned disposal? Who has responsibility for the response? Those are questions for mission-specific evidence, not opportunities to invent a universal disposal price.

Replacement deserves the same treatment. A terrestrial comparison and an orbital comparison should each state their assumed useful life and how new hardware enters service. Otherwise one scenario may quietly receive several upgrades while the other carries its first generation forever. An apparently precise unit cost can then be an artifact of inconsistent assumptions.

There is a constructive implication here. An infrastructure career does not have to start with predicting which orbital-compute company wins. It can start with getting good at the interfaces: electrical power to heat, heat to mass, workload to service level, and service life to cash recovery. Those questions travel well between ambitious architectures. This is a research direction, not an assertion that a particular employer is hiring.

## The evidence card I would carry forward

The bounded next artifact is one workload-specific card. It records the mission and test date; sustained load and thermal conditions; accepted output and recovery behavior; usable lifetime assumptions; and the mass, communications and lifecycle costs required for comparison. Every entry needs a source and a clear distinction between measurement and assumption.

The first update should follow actual in-orbit evidence. A launch confirmation would change the mission's status. A verified workload result would change the capability assessment. A repeatable service record, priced against a matched alternative, would begin to change the economic argument. These are separate updates; they should never be rolled into one optimistic check mark.

For now, this article has done a narrower piece of work: assembled public primary sources, explained a physical constraint and calculated an idealized sensitivity. It has not tested hardware, observed the coming flight or estimated Google's commercial return. The thermal diagram is an explanatory model, and the evidence card is a specification for subsequent research.

That is enough to make the next announcement easier to read. When someone offers abundant power in orbit, ask what useful work can be sustained, at what temperature and with what complete system. Sunshine may open the door. The heat still has to leave the room.

## Categories and keywords

Categories: AI infrastructure; space systems; capital economics.

Keywords: Project Suncatcher; thermal control; radiators; useful compute; lifecycle cost.

**Hashtags:** #AIInfrastructure #SpaceComputing #ThermalEngineering #CapitalAllocation
