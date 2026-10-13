# The Portable Self

Weekly Intelligence, 2026-W42. A seeded control toy about continuity across
changing bodies: should a controller carry every motor habit, start blank, or
keep a portable task core with body-specific maps?

Public game: `https://iamrobin.ai/intelligence/portable-self/`

## Try first

Run the default seed to the end. Four bodies return in sequence, each with a
different hidden control mapping. **Portable core** learns a separate map for
each advertised fingerprint. Then choose **Same controls**: carrying one shared
habit becomes useful, while body-specific memory repeats avoidable calibration.
Finally choose **Stale labels after drift**. The cached map is wrong after tick
48, but the controller can repair it from feedback. Stale recalls create errors;
in this toy, avoiding a full blank-slate calibration can still offset them.

## Rules and information boundary

Each tick asks for one of four abstract commands: north, east, south or west.
The controller selects one of four physical controls. A body's hidden bijection
decides which command that control actually produces. Correct commands advance
the shared assembly recipe; four correct commands complete one toy assembly.

All five policies receive the same target, body label, advertised capability
fingerprint and after-action result. Each receives one action per tick and the
same seeded body/target sequence. Only the evaluator knows the hidden mapping
before an action. There is no extra calibration round, oracle or private sensor.

- **Carry every habit** keeps one learned map across all bodies.
- **Start blank** deletes the map at every handoff.
- **Portable core** stores one map per advertised capability fingerprint.
- **Frozen manual** assumes control 1/2/3/4 always means N/E/S/W and never
  learns.
- **Random control** chooses a seeded random control and never learns.

The three adaptive policies share the same feedback update. A tried control
records its observed command. Conflicting old entries are removed. If three
controls reveal three different commands, the remaining bijection is inferred.
The architectures differ only in which map survives a handoff.

## Frozen results

Before evaluation, `EXPERIMENT.md` fixed ten settings × seeds 1–64 × five
policies: **640 worlds / 3,200 policy outcomes**. There was no seed filtering or
post-result parameter search. Means below are correct commands out of 96 action
ticks unless noted.

| Setting | Carry all | Start blank | Portable core | Frozen | Random |
|---|---:|---:|---:|---:|---:|
| Default recurring bodies | 72.797 | 72.938 | **87.938** | 2.281 | 24.484 |
| Same mapping | 94.156 | 73.141 | 88.344 | **96** | 23.578 |
| Rapid handoff | 49.922 | 50.984 | **88.094** | 3.047 | 24.156 |
| One-use bodies | 72.875 | **72.406** | **72.406** | 3.813 | 24.078 |
| Fresh labels after drift | 72.875 | 72.969 | **80.125** | 3.359 | 23.938 |
| Stale labels after drift | 72.875 | 72.969 | **80.406** | 3.359 | 23.938 |

Portable-minus-reset is +15.0 commands in the default setting and +37.109
under rapid handoffs. It is exactly zero for slow handoffs in this 96-tick
design because each of four bodies appears only once, and exactly zero for
one-use bodies by construction. With identical mappings, carrying a shared map
beats the portable core by 5.813 commands; the learning-disabled frozen manual
is perfect because its assumed mapping is true.

Stale labels after drift create 7.547 mean errors from recalled obsolete maps.
Yet that arm averages 0.281 more correct commands than fresh labels because a
fresh fingerprint forces four new calibrations. That tiny reversal is a warning:
versioning and safe probing are separate design choices, and this toy does not
price the severity of a wrong action. A hazardous actuator could make one stale
move unacceptable regardless of throughput.

## Parameters

| Control | Meaning |
|---|---|
| Seed | Unsigned 32-bit world seed; same controls and model version replay exactly |
| Handoff | Action ticks before switching to the next body |
| Bodies | Number of body identities before the sequence repeats |
| Control difference | Same mapping, one swapped pair, or a full seeded permutation |
| Firmware drift | No drift, or remap every body from tick 48 onward |
| Capability label | Fresh adds a new version to the fingerprint; stale retains the old label |

`bodyCount=12` with a 96-step/eight-tick run means every body appears once.
`divergence=0` makes every mapping the identity. Firmware drift changes hidden
mappings for all bodies at the fixed boundary. This is an intentionally sharp
stress test, not a measured update process.

## Reproduce

Node 22+; no dependencies, network, API calls, credentials, live agents,
robots, organisms or financial systems.

```sh
node --test tests.mjs
node batch.mjs --verify
```

`node batch.mjs` regenerates `results.json`. The verifier recomputes every
outcome and model hash. `client.mjs` imports the same model used by the batch.
The downloadable source package contains the experiment contract, model, UI,
tests, batch and complete results.

## Limits

This is an original deterministic teaching mechanism, not a benchmark of an
LLM, robot, companion, child, animal or human identity. Commands have equal and
reversible cost. Bodies advertise a stable label unless the stale-label stress
is selected. There is no perception noise, latency, damage, safety envelope,
personality measure, language memory or semantic task transfer. “Portable self”
means scoped controller state only.

The private conversation scan supplied the question, not facts or authority;
no chat text or private project context is in the public package. W41 studied
lost acknowledgements and duplicate effects. This experiment instead isolates
motor-state transfer under actuator remapping. The eight earlier Swarm Lab
worlds do not test changing embodiments.

