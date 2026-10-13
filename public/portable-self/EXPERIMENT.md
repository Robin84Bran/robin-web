# The Portable Self — frozen comparison

Frozen before evaluation on 2026-10-13 HKT for `intelligence:2026-W42`.

## Question

When one task continues across changing bodies, what should persist: every
motor habit, nothing, or a portable task core with a separate body map?

This is a synthetic control game. A “body” is only a four-command actuator
mapping. Identity means retained controller state; it is not consciousness,
personhood, biological memory, or a claim about a real robot.

## Information and control budget

Every policy receives the same target command, endpoint label, capability
fingerprint and after-action feedback. Every policy gets exactly one actuator
choice per tick and the same seeded sequence of bodies and target commands.
No policy reads the hidden actuator mapping before acting. The evaluator can.

Five policies are fixed:

1. **Carry every habit** keeps one learned actuator map across every body.
2. **Start blank** discards its actuator map at every handoff.
3. **Portable core** keeps a separate map per advertised capability
   fingerprint and recalls it when that body returns.
4. **Frozen manual** assumes control 1/2/3/4 always means command N/E/S/W and
   never learns.
5. **Random control** chooses a seeded random control and never learns.

The three adaptive policies use the same deterministic feedback update and
bijection inference. They differ only in what state survives a handoff.

## Primary outcome and failure checks

Primary outcome: correct commands in 96 action ticks. Four correct commands
complete one toy assembly. Secondary outcomes: errors, mean/max errors before
the first correct action after each handoff, recalled body maps and fresh
calibrations.

The default comparison uses four recurring bodies, a handoff every eight ticks,
fully different mappings, fresh capability fingerprints and no firmware drift.
The expected mechanism—not a required result—is that the portable core can
reuse a body-specific map. A negative, tied or reversed result remains valid.

The claim must be narrowed or rejected if:

- deterministic replay, equal action counts or mapping-bijection tests fail;
- a controller obtains the hidden mapping before feedback;
- the portable core is presented as universally best when identical bodies,
  one-use bodies or stale capability labels erase its advantage;
- any result is described as empirical robot, mind, biological or trading
  evidence.

## Frozen batch

Seeds 1–64, all five policies, no seed filtering, across ten settings:

| Setting | Change from default |
|---|---|
| default | Four recurring bodies; swap every 8; full remapping |
| same mapping | Every body exposes the same controls |
| mild remapping | Each body swaps only two controls |
| slow handoff | Swap every 24 ticks |
| rapid handoff | Swap every 4 ticks |
| one-use bodies | Twelve bodies, each used once |
| fresh drift | Mappings change at tick 48 and fingerprints update |
| stale drift | Mappings change at tick 48 but labels do not |
| short run | 32 ticks |
| long run | 192 ticks |

This is 640 matched seeded worlds and 3,200 policy outcomes. Development checks
may use seeds 9001–9004 only. Results do not change this protocol.

## Publication gate

Publication requires deterministic replay; unit and invariant tests; complete
batch results; source/method download; an honest parameter guide; desktop and
mobile control checks; SEO/canonical/schema checks; required GitHub `verify`;
protected merge; existing Cloudflare Workers Build; and exact live-byte checks.

