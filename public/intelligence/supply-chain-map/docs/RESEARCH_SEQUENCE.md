# Recommended research sequence

This project should expand by **evidence density**, not by mechanically checking
all 10,000 Nasdaq-100 × HKEX Core-100 pairs. A sparse, defensible map is more
useful than a visually complete graph filled with inferred relationships.

## Phase 2A — Semiconductor and autonomy expansion

Status: **completed in this version**.

Start in six lanes where named product, customer, partner and deployment evidence
is most likely to exist:

1. **EDA/IP → foundries**
2. **Fab equipment → foundries**
3. **Compute → cloud platforms**
4. **Compute → vehicle manufacturers**
5. **Optics/sensors → devices and robots**
6. **Batteries → EV and energy systems**

### Phase 2A result

The research pass added one Nasdaq-100 issuer, three HKEX Core-100 issuers and
twelve cross-universe relationships:

- Analog Devices;
- NIO;
- Leapmotor;
- China Unicom;
- ASML → SMIC;
- Synopsys → Hua Hong;
- NVIDIA → China Mobile;
- Intel → China Unicom;
- AMD → Alibaba;
- NVIDIA → NIO;
- Qualcomm → NIO;
- Qualcomm → Leapmotor;
- NXP → NIO;
- NXP → Xiaomi;
- Analog Devices → BYD;
- Analog Devices → Baidu.

The expanded map is **21 × 23**, while the original **20 × 20** remains frozen
and selectable in the interface.

### What was deliberately not added

- **KLA → SMIC as a commercial edge:** policy and filing evidence establishes a
  licensing chokepoint, not a current sale.
- **Intel → China Telecom:** the reviewed solution brief includes a China
  Telecom testimonial but does not establish China Telecom as the buyer or
  deployed recipient.
- **Additional CATL edges:** the frozen cross-market universe does not contain
  enough named U.S. battery/energy-system counterparties with primary evidence.
  CATL → Tesla remains the clean edge.
- **Marvell legacy China deployments:** older named deployments were too stale
  to add enough decision value for this pass.

These exclusions are a feature. “Almost evidence” remains blank.

## Phase 2B — Sparse 100 × 100 navigation

Status: **completed in this version**.

The application now exposes all 100 companies on each side without attempting to
populate all 10,000 pairs. The existing graph remains limited to the readable
core and Phase 2A scopes; the full-universe explorer adds:

- company search and provenance filtering;
- known-sector filtering, with all non-pilot companies honestly labelled
  `Unclassified`;
- capability, evidence-grade and relationship-age filters;
- an “only issuers with verified edges” toggle;
- direct pair selection across all 100 × 100 candidates;
- explicit warnings when a verified route is merely hidden by active filters;
- explicit `NOT_ESTABLISHED` treatment when the 41-edge ledger contains no
  direct route;
- a deterministic 10,000-cell sparse CSV export.

The 41 verified relationships occupy 41 of 10,000 possible cells: **0.41% sourced
coverage**. This is a measure of what has been evidenced, not a score for actual
supply-chain completeness. No new relationship was added in Phase 2B.

Acceptance result: **passed**. Every frozen-universe issuer is selectable, while
blank pairs remain unknown rather than disproven.

## Phase 2C — Dependency quality and policy-shock model

Status: **completed in this version as a graph-propagation pilot**.

The application now models the five requested discrete shocks:

- remove licensable advanced U.S. accelerator access;
- restrict EDA updates and technical support;
- restrict connected-vehicle software;
- restrict graphite and gallium exports;
- tighten cross-border data rules.

For each shock it reports:

- immediate companies and verified fibers;
- one-hop second-order relationships and new companies;
- sourced substitution paths with readiness caveats;
- analyst-estimated switching-delay ranges;
- candidate bargaining-power gainers;
- the current policy baseline versus the hypothetical shock.

The underlying commercial ledger remains at 41 relationships. Immediate and
second-order results are deterministic selections from those relationships.
The graphite/gallium scenario deliberately reports that only CATL → Tesla is
observed and that no company-level in-universe gainer is established.

### Phase 2C acceptance result

**Passed.** Five scenarios, eleven substitution paths and eleven candidate
gainers validate against registered sources. The interface separates current
policy from hypothetical stress, and all switching clocks are labelled
`Analyst scenario estimate`.

### Still deferred

The following dependency-quality fields remain valuable but require more
consistent company-level evidence before being scored:

- criticality to the recipient;
- installed-base or integration burden by relationship;
- geography of production and delivery;
- cash-direction confidence beyond the current structural labels;
- inventory buffers and stockpiling;
- relationship-specific switching time rather than scenario ranges.

## Phase 2D — External bridge nodes

Status: **completed in this version as a selected external bridge pilot**.

The two frozen listed universes omit decisive intermediaries. Phase 2D registers
them as clearly marked external nodes rather than pretending they belong to
either index.

### Phase 2D result

Nineteen external nodes and 34 source-backed bridges were added in three lanes:

1. **Semiconductor bridge** — TSMC, Samsung Electronics, SK hynix, ASE
   Technology, Foxconn, Sony Semiconductor Solutions, Bosch, Infineon and Tokyo
   Electron.
2. **Model + cloud bridge** — OpenAI, Anthropic, xAI, DeepSeek and Moonshot AI,
   connected to public compute, cloud and distribution platforms.
3. **Physical AI bridge** — Figure AI, Apptronik, Agility Robotics, Boston
   Dynamics and Unitree Robotics, connected to public compute, model,
   simulation, safety and customer platforms.

The layer supports physical/service, reverse-cash and policy-fracture views.
Cash arrows are drawn only for `DERIVED_DIRECTION` supplier/customer structures.
Co-development, distribution and multi-role partnerships remain
`TERMS_UNDISCLOSED`.

### Phase 2D acceptance result

**Passed.** Every bridge:

- touches at least one registered external node;
- cites at least one registered primary source;
- carries an evidence grade, date, status, lane, cash model and negative-
  knowledge statement;
- uses `UNKNOWN` for undisclosed commercial amounts;
- remains outside the 41-edge listed-company ledger and 10,000-cell frozen
  matrix.

### Deliberate gaps

- Huawei, domestic Chinese accelerator packaging and additional private Chinese
  robotics companies require direct counterparty evidence before graph entry.
- GlobalFoundries, additional memory suppliers and equipment vendors remain
  candidates for the next external pass.
- A company-level gallium or graphite materials chain is still not established.
- Partnership announcements do not prove production scale, switching burden or
  counterparty revenue concentration.

External nodes never change the membership of the frozen 100-company universes.

## Phase 2E — Monitoring and change history

Status: **v0 monitor and five-lane policy semantic review completed 2026-08-17**.

The first implementation registers the frozen baseline in Git, watches 17
official index and policy control-plane sources, records response fingerprints
without retaining raw bodies, writes immutable dated observation runs and keeps
an append-only event ledger. Retrieval success is not semantic confirmation;
research freshness remains `UNKNOWN` until a human-reviewed event is recorded.

Create dated successor snapshots rather than overwriting history:

- new relationship;
- current → historical;
- announced → shipped;
- source upgraded or contradicted;
- policy exposure changed;
- company entered or exited a frozen-universe successor snapshot.

The second control-plane observation distinguished normalized unchanged content,
the current HSCHK100 membership matched the frozen 100 codes, and the five
requested policy lanes received a dated official-source semantic review. The
review identified no post-freeze policy reversal and added three pre-freeze
scope clarifications without changing the original ledgers. See
`phase2e/reports/PHASE_2E_POLICY_SEMANTIC_REVIEW_20260817.md`.

The next acceptance step is a relationship-source pass across the 41
listed-company edges and 34 external bridges. The original 2026-07-25 dataset
remains frozen.

Each change should preserve the previous record and explain why the status moved.

## Research operating procedure

For each lane:

1. Generate candidate counterparties from official customer, partner, supplier,
   product and filing disclosures.
2. Match named counterparties to the two frozen universes.
3. Open the primary source and determine the exact product or service delivered.
4. Record capability direction separately from reverse cash direction.
5. Record what the source does **not** establish.
6. Attach only directly relevant policy mechanisms.
7. Reject the edge if the named recipient, deployment, product or relationship
   cannot be established.
8. Run `node scripts/export-and-validate.cjs`.

## Edge acceptance standard

A rendered listed-universe edge must contain:

- two valid endpoints from opposite frozen universes;
- capability direction;
- relationship class;
- date and status;
- evidence grade A or B;
- at least one registered primary source;
- cash model and explicit amount treatment;
- policy-risk label;
- a negative-knowledge statement.

Blank continues to mean **NOT_ESTABLISHED**, never **NO_RELATIONSHIP**.

For Phase 2D, both endpoints must be registered and at least one must be an
external node. External-to-external links are allowed only when the evidence
establishes a bridge that materially connects the semiconductor, model/cloud or
physical-AI stack.
