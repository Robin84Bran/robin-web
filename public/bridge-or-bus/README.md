# Bridge or Bus?

Weekly Intelligence, 2026-W45. A seeded integration toy about one narrow
question: when interfaces drift, should heterogeneous services maintain direct
pairwise adapters or share one translation layer?

Public game: `https://iamrobin.ai/intelligence/bridge-or-bus/`

## Try first

Run the default world to the end. Then choose **Stable schemas** by setting drift
to zero. Direct bridges now deliver all 320 jobs while the shared layer averages
319.344 across the saved batch because its hub can still go down. Restore drift
and choose **Two repeated routes**. Direct repair can now reuse a small adapter
surface and narrowly leads the shared layer.

## Rules and information boundary

Each job is an ordered route through distinct abstract services. A direct route
needs current adapters for every adjacent pair. A shared route needs one current
adapter per service and an available hub. Schema drift increments a service's
integer version and invalidates adapters that mention the old version.

Every policy receives the same job arrivals, schema versions, hub state, queue
state, repair opportunities and delivery-attempt budget. None sees future drift,
arrivals or outages.

- **Direct bridges** repairs the first stale pair needed by the oldest job.
- **Shared layer** repairs the first stale service adapter needed by the oldest
  job and depends on one recoverable hub.
- **Static bridges** never repairs after drift. It is the learning-disabled
  baseline.
- **Random repair** patches a seeded random stale pair from current demand.

Direct and shared architectures deliberately have different adapter counts and
failure domains. Equal action opportunities are not equal compute, latency,
implementation work or real-world cost.

## Reproduce

Node 22+; no dependencies, credentials, networks, agents, organisms or financial
systems:

```sh
node --test tests.mjs
node batch.mjs --verify
```

`results.json` retains ten settings × seeds 1–64 × four policies: **640 matched
worlds / 2,560 policy outcomes**. The browser imports the exact model used by
the batch. A fixed seed and controls reproduce every arrival, version change,
hub event and policy action.

## Results

The batch was generated only after `EXPERIMENT.md` froze the comparison. No seed
was removed. Mean delivered jobs out of 320 arrivals:

| Setting | Direct | Shared | Static | Random |
|---|---:|---:|---:|---:|
| Default | 127.234 | **319.344** | 15.719 | 70.922 |
| Stable schemas | **320** | 319.344 | **320** | **320** |
| Rapid drift | 53.828 | **317.438** | 7.047 | 20.359 |
| Four services | 310.703 | **319.344** | 21.453 | 286.281 |
| Twelve services | 39.562 | **319.281** | 11.156 | 21.250 |
| Fragile hub | 127.234 | **284.859** | 15.719 | 70.922 |
| Two repairs | 308.359 | **319.344** | 15.719 | 199.859 |
| Two repeated routes | **319.688** | 319.328 | 20.719 | 319.547 |

In the default setting, the shared layer averages 37.156 repairs and 0.326 ticks
of delivery latency. Direct bridges average 152.625 repairs and 15.357 ticks of
latency because each schema change can stale many demanded pairs. That is the
encoded fan-out mechanism, not a measured platform result.

The result reverses when schemas are stable: direct, static and random pairwise
policies deliver every job, while shared routing still loses some time to hub
outages. With only two repeated routes, direct repair reuses its small working
set and averages 319.688 deliveries versus 319.328 for the shared layer. A hub
reduces adapter fan-out; it also creates a shared failure domain.

## Parameters

| Control | Meaning |
|---|---|
| Seed | Replays arrivals, routes, drift, hub events and random repairs |
| Services | Number of distinct interfaces that jobs may traverse |
| Route length | Services required by each multi-stage job |
| Schema drift | Per-service chance of changing version each tick |
| Hub outage | Chance the shared layer becomes unavailable while up |
| Repairs | Adapter-update opportunities available to every policy per tick |
| Route pool | Zero creates broad demand; a small pool repeats known routes |

Jobs wait at most 24 ticks. The queue holds 64 jobs. Every policy attempts the
first three queued jobs per tick; blocked jobs remain until delivered or expired.
Primary measures remain separate: delivery, expiry, overflow, blocked attempts,
repairs and latency. There is no composite winner.

## Limits

This is an original deterministic teaching mechanism, not an agent-framework
benchmark, API-gateway test, service-mesh recommendation, production reliability
forecast, biological model or trading system. Services and schemas are integers.
Network latency, payload transformation, security boundaries, partial failures,
version negotiation, compute and engineering cost are absent.

The private current-week scan supplied the question, not public prose, facts or
authority, and is excluded from this package. The original eight Swarm Lab worlds
test cooperation, assembly, memory, attention, taste and shared search—not
interface compatibility. W43 tests inference from missing heartbeats; W44 tests
graceful degradation inside one modular system. This world instead holds demand
and schema changes fixed while its integration topology changes.
