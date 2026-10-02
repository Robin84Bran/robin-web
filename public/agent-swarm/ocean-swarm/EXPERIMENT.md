# Ocean Swarm — frozen comparison, 2026-10-02

This specification precedes the first batch. Do not tune an arm to secure a preferred winner.

**Question.** Can an environmental sensor constellation repair useful coverage after failures using only noisy local observations and fallible, delayed communication? When does a mothership help enough to justify dependence on it?

**Arms.** (A) Provisioned stations: immutable launch assignments. (B) Local repair: each vehicle keeps expiring, provenance-bearing reports and makes bounded vacancy repairs. (C) Assisted repair: the same local rule, with a mothership that occasionally proposes repairs using reports it actually received. All commands traverse the acoustic graph; an issued command is not a delivered command.

**Controlled comparison.** All arms have identical bodies, initial energy, station catalogue, launch sequence, controller cadence, sensor error stream, environmental current, packet-loss draws, node-failure identities and numerical dynamics. Population sweeps change total payload and are explicitly separate. Only coordination changes. Station coordinates are a common mission map; vehicle positions, actual coverage and survival of remote vehicles are not privileged controller inputs.

**Primary outcome.** Percentage of possible station-minutes actually covered, from launch through mission end. A station is covered only by a living deployed vehicle inside its sensing footprint. Supporting outcomes: time to 80% coverage (null if never reached), final and post-fault coverage, recovery to 80% of pre-fault coverage (null if not recovered), useful sample error, motion/radio energy, transmitted bytes, command delivery/expiry, and time following delivered mother commands.

**Hypothesis and decision.** Local or assisted repair is worth retaining if its paired mean coverage improvement over provisioned stations is positive after node loss or compound failure, without losing more than two percentage points in the no-fault regime. A 95% paired bootstrap interval wholly above zero is suggestive within this simulator, not physical validation. Report regressions, intervals crossing zero, and extra communication/energy. No universal swarm winner is expected. Mother assistance is retained as a separate option only when measured gains justify its extra traffic; do not equate message counts with bits or coordination with intelligence.

**Frozen batch.** Seeds 1–24 in six regimes: calm, node loss, radio blackout, mothership loss, cross-current, compound failure. Default population 25, ten stations, 360 steps of 10 simulated seconds. Every treatment is paired by seed and regime. Code/model changes require regenerating all results and recording the change; replay verification must match the saved artifact exactly.

**Validity boundary.** Synthetic 2D horizontal motion with first-order inertia, bounded turn/thrust, currents, local reef avoidance, localization error, energy costs and a packet transport model. Depth is an illustrative rendering coordinate. This is not a validated hydrodynamic, acoustic, biological, oceanographic, military or hardware-control model. Useful evidence concerns mechanisms inside this declared model.
