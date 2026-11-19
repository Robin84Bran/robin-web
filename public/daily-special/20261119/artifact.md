# Mission, inspection, takeover, cost

Published: 19 November 2026

Research cutoff: 19 November 2026, 09:22 HKT

This bounded research note asks what GlobalFoundries' reported Singapore Spot record establishes about useful factory robotics, and which operating denominator is still needed before repetition becomes an economic result.

## The disclosed operating record

GlobalFoundries and Boston Dynamics announced on 17 November 2026 that Spot deployments would expand across GlobalFoundries semiconductor manufacturing sites in Singapore, Burlington, Malta and Dresden. Their joint announcement reports that two Spot robots in Singapore have travelled nearly 900 kilometres and completed more than 90,000 inspections in sub-fab areas since April 2026. The companies report a 99% mission success rate.

The same release says GlobalFoundries redeployed 875 routine inspections in two weeks using updated hardware and software, with a road map to more than double that number through visual inspection. GlobalFoundries also says it has used Spot at its Burlington facility for more than four years.

This is substantial operating evidence. It names the customer, factory setting, number of robots, operating period, travel distance, inspection volume and one reliability measure. The planned expansion across several sites also supports the interpretation that GlobalFoundries sees enough operating value to continue.

The figures are company-reported. No independent factory log or audit was reviewed.

## Why a walking inspection robot fits a fab

Boston Dynamics' earlier GlobalFoundries case study explains the mechanism. A semiconductor fab has thousands of inspection points across pumps, motors, compressed-gas systems and other long-lived equipment. Installing fixed sensors on every asset can be uneconomical. A mobile robot can bring one sensor suite to many locations.

Spot can collect thermal information and images of analogue gauges. Software can then turn those images into readings for maintenance teams. Repeated readings can reveal change over time and support earlier maintenance decisions.

The earlier case study described this as a proof of concept and an expected path toward better maintenance planning. It did not publish a GlobalFoundries-specific cost comparison or measured downtime reduction.

## The unit inside the headline

Boston Dynamics' Autowalk documentation describes a mission at its core as a sequence: travel to a location, perform an action, continue to another location, perform another action. Its product documentation distinguishes the mission from the individual inspection actions inside it.

That distinction changes how the 99% figure should be read. Mission success and inspection success are different units. A single mission may contain many inspections.

The analogy is a school bus. Completing the route matters. A complete operating record also asks what happened at every stop and how often another adult had to help. Route completion, service at each stop and human assistance describe different layers of the same operation.

The joint announcement does not define its mission-success denominator. It does not state how many inspections appear in a typical mission or how retries, skipped actions, remote prompts and manual takeovers are classified. The 99% rate therefore cannot be converted into inspection accuracy, autonomous uptime, avoided downtime or financial return.

## What can be calculated

More than 90,000 inspections over nearly 900 kilometres implies roughly 100 inspections per kilometre. Both source figures are rounded, so this is an orientation ratio rather than a precise operating rate.

Two robots implies more than 45,000 inspections per robot if the work was evenly divided. The actual workload split, operating days, shifts, inspection duration and robot availability were not published. An hourly productivity rate cannot be calculated from the disclosed figures.

A 99% mission success rate would mean roughly one unsuccessful mission per 100 mission attempts if the denominator and classification rules were known. It says nothing by itself about failed inspection actions because the number of inspections per mission is unavailable.

## Two measures that would complete the operating picture

The first is human takeovers per thousand inspections. A useful definition would include remote prompts, manual driving, resets, route edits and other human interventions needed to restore or complete a mission. Using inspection volume as the denominator would allow comparison across sites and fleets of different sizes.

The second is fully loaded cost per successful inspection. That cost should include robots, sensor payloads, docks, software, systems integration, route creation and redeployment, connectivity, maintenance, spares, monitoring, intervention and review time.

Those measures do not require a robot to operate without people. Occasional human support can coexist with meaningful value. The frequency and duration of that support determine how much work remains with people as inspection volume grows.

GlobalFoundries-specific takeover and cost figures have not been published in the reviewed sources. No cost estimate is inferred from generic vendor marketing.

## Separate the next trial from the current record

GlobalFoundries and Boston Dynamics also plan to begin onsite Atlas humanoid testing in early 2027. The stated work will explore potential tasks, readiness and integration needs before early task-specific testing and training.

That is a planned trial. Spot's Singapore inspection history is an operating record. The two belong to different evidence stages.

## Research boundary

This research used public sources only. It did not contact either company, operate a robot, inspect a factory, purchase equipment, allocate capital or make an adoption decision. Completion records a research artifact; it does not execute the underlying robotics or investment decision.

## Public sources

1. [GlobalFoundries and Boston Dynamics, joint collaboration announcement](https://gf.com/news-and-events/news/boston-dynamics-and-globalfoundries-expand-robotics-collaboration/), 17 November 2026; observed 19 November 2026.
2. [Boston Dynamics, GlobalFoundries case study](https://bostondynamics.com/case-studies/globalfoundries/), observed 19 November 2026.
3. [Boston Dynamics developer documentation, Autowalk Service](https://dev.bostondynamics.com/docs/concepts/autonomy/autowalk_service), observed 19 November 2026.
4. [Boston Dynamics support documentation, What Is a Site Map?](https://support.bostondynamics.com/s/article/what-is-a-site-map), observed 19 November 2026.
5. [Boston Dynamics support documentation, Monitor Your Site Map](https://support.bostondynamics.com/s/article/monitor-your-site-map), observed 19 November 2026.
