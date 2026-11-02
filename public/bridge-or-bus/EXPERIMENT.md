# Frozen experiment contract — Bridge or Bus?

Frozen before the 2026-W45 evaluation.

## Question

When tool interfaces keep changing, should a multi-stage system maintain direct
pairwise adapters or translate every service through one shared layer?

## Matched world

- A seeded queue receives abstract jobs. Each job names an ordered route through
  distinct services.
- A direct handoff works only when every adjacent service pair has an adapter for
  both services' current schema versions.
- A shared-layer handoff works only when every service on the route has a current
  shared adapter and the hub is available.
- Schema changes, job arrivals and hub availability are generated once per world
  and held identical across policies.
- Every policy sees the current queue, schema versions, hub state and past
  outcomes. No policy sees future arrivals, drift or outages.
- Every policy receives the same number of repair opportunities and delivery
  attempts per tick. An unused opportunity is not reassigned.

## Policies

1. **Direct bridges** repairs the first stale pair needed by the oldest queued
   job, then uses direct handoffs.
2. **Shared layer** repairs the first stale service adapter needed by the oldest
   queued job, then routes through the hub.
3. **Static bridges** is a learning-disabled baseline. It starts with current
   direct adapters and never repairs them after drift.
4. **Random repair** is a seeded simple baseline. It repairs one stale direct
   pair selected from current queued demand.

The direct and shared architectures do not have equal adapter counts or equal
failure domains; those are the mechanisms under test. Equal repair and delivery
opportunities do not establish equal compute, latency, engineering effort or
real-world cost.

## Frozen evaluation

Default world: 160 ticks, eight services, three-service routes, two arrivals and
three delivery attempts per tick, one repair opportunity, 3% per-service schema
drift, a 2% hub-outage chance while up, 35% recovery chance while down, 24-tick
job deadline and 64-job queue.

Ten named settings, seeds 1–64, four policies: **640 matched worlds / 2,560
policy outcomes**. Development checks may use seeds 9001–9004. No evaluation
seed may be removed or replaced.

Primary outcomes remain separate: delivered jobs, expired jobs, queue overflow,
blocked attempts, repair actions and delivery latency. There is no combined
score and no policy is required to win.

Settings: default; stable schemas; rapid drift; four services; twelve services;
stable hub; fragile hub; no repair; two repairs; two repeated routes.

## Promotion rule

Publish only if tests cover deterministic replay, matched world traces,
information and action boundaries, adapter invalidation, hub failure,
conservation, queue limits and invalid controls; the full saved batch reproduces
exactly; and the public game exposes the trade-off on desktop and mobile.

## Boundary

This is an original deterministic teaching mechanism, not a benchmark of an
agent framework, API gateway, service mesh, biological swarm, production system
or trading workflow. A schema version is an integer, a repair is one abstract
action and a delivered job has no assigned financial value. The private source
scan supplied the question only; it supplies no public fact or authority.
