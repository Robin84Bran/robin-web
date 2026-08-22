# Methodology

## 1. Research unit

The atomic unit is a sourced relationship between one selected Nasdaq-100 issuer
and one selected HKEX Core-100 issuer. The original 20 × 20 core remains frozen;
later phases may add selected in-universe nodes without altering the core.

A company can have no verified pilot edges and still remain in the pilot. This is
intentional: a complete 20 × 20 frame makes evidence gaps visible.

Phase 2B adds navigation across the full frozen 100 × 100 universe. It does not
change the atomic research unit or promote an unresearched pair into an edge.

## 2. Universe construction

### Nasdaq-100

- Source: official Nasdaq component/weight PDF dated 2026-05-01.
- Security rows: 101.
- Issuers: 100 after combining `GOOG` and `GOOGL`.
- Combined Alphabet weight: sum of the two published share-class weights.

### HKEX Core-100

- Source: Hang Seng China (Hong Kong-listed) 100 Index.
- Constituent endpoint frozen 2026-07-25.
- Factsheet reference date: 2026-06-30.
- Constituents: 100.
- The factsheet publishes the top 50 weights. Unpublished constituent weights
  remain `UNKNOWN`, rather than being estimated from a different date.

## 3. Pilot selection

Twenty core issuers on each side are selected for relevance to at least one layer:

- AI compute;
- semiconductor design/fabrication/equipment;
- cloud and model services;
- robotics/autonomy;
- devices and manufacturing;
- sensors/optics;
- batteries and electrification.

The pilot selection is deliberately not the “top 20 by weight.” Phase 2A adds
only issuers needed to support a reviewed primary-source edge in the six dense
semiconductor/autonomy lanes.

## 4. Relationship classes

| Class | Meaning | Examples |
|---|---|---|
| Compute/IP | Processor, architecture, accelerator or licensable IP | GPU platform, CPU architecture |
| EDA/tooling | Design software or fabrication equipment | EDA, etch, deposition |
| Cloud/software | Hosted infrastructure or software stack | cloud instances, enterprise AI software |
| Component | Shipped physical input | battery cell, optical component |
| Manufacturing | Assembly/integration of another company's product | supplier manufacturing |
| Co-development | Joint engineering or platform integration | AI PC, autonomous vehicle |

## 5. Direction rules

### Physical/service view

The arrow follows the delivered capability:

`provider → recipient`

### Cash view

For a commercial supplier/customer relationship, the arrow is reversed:

`recipient → provider`

This is a **derived direction**, not evidence of a particular invoice or payment.
The amount is `UNKNOWN` unless a cited source explicitly discloses it.

Co-development can involve consideration in both directions; where the public
record does not establish a buyer, the cash rendering is labelled
`TERMS_UNDISCLOSED`.

### Policy view

Policy risk is rendered separately. It can:

- attach to a documented commercial edge; or
- connect two nodes as a policy-only chokepoint without asserting active trade.

## 6. Evidence grades

| Grade | Rule |
|---|---|
| A | Current primary source (2024–2026) |
| B | Primary but historical, indirect or scale-ambiguous |
| C | Reputable secondary source, explicitly labelled |
| D | Hypothesis; excluded from verified map |

## 7. Status

- `current` — current product documentation, filing or 2024–2026 announcement.
- `announced` — formal planned deployment/integration not necessarily shipped.
- `historical` — older primary evidence retained for installed-base/path
  dependency analysis.
- `policy-only` — no commercial relationship asserted.

## 8. Policy-fracture risk

- **High** — an existing rule or licensing regime directly targets the relevant
  item, entity, end use or transaction class.
- **Medium** — material regulatory exposure exists, but applicability to the
  exact relationship or product configuration is not established.
- **Low** — no targeted restriction found in the reviewed sources; ordinary
  country and compliance risk remains.

Risk is not a probability forecast.

## 9. Limits

Corporate supplier lists omit commercial amounts and can lag current practice.
Product announcements may describe a design win without shipment volume.
Cloud compatibility documentation shows technical availability, not customer
spend. Historical equipment relationships may imply installed-base service needs
but not current tool sales.

The map therefore reports provenance, date and negative knowledge (“does not
prove”) alongside every edge.

## 10. Phase provenance

- `core` — part of the frozen 20 × 20 baseline.
- `2A` — added by the semiconductor/autonomy evidence-density pass.
- `unmapped` — frozen-universe issuer with no pilot classification or verified
  edge yet; this is interface provenance, not a company attribute.

Every Phase 2A relationship also records its research lane. Scope provenance is
not an evidence grade; it explains why and when an edge entered the project.

## 11. Full-universe navigation

The sparse 100 × 100 explorer uses the same frozen constituent records and
relationship ledger as the core map.

- A company receives a sector only if it is already a researched pilot node.
- All other companies are shown as `Unclassified`; the interface does not infer
  a sector from the company name.
- Capability, evidence and age filters operate on verified relationships.
- A direct pair with no ledger entry returns `NOT_ESTABLISHED`.
- If filters hide a known edge, the interface says so rather than returning a
  false blank.
- The full matrix export contains 10,000 candidate cells and 41 verified cells
  in this version.

Coverage is therefore descriptive:

`verified cells ÷ possible cells`

It is not a probability, decoupling score or estimate of actual commercial
connectivity.

## 12. Phase 2C policy-shock propagation

Phase 2C applies a discrete shock to the existing 41-edge relationship ledger.
It does not create a new commercial edge.

### Immediate selection

A scenario selects relationships in one of two ways:

1. all verified relationships carrying a named policy tag; or
2. an explicit relationship list when the scenario is narrower than the policy
   tag, as with EDA software updates and support.

Every endpoint of a selected relationship is an **immediate company**.

### Second-order selection

A **second-order relationship**:

- is not already an immediate relationship;
- touches exactly one immediate company; and
- introduces at least one new company.

The simulator follows one hop only. It does not repeatedly flood the graph, and
it does not treat a path as proof of loss.

### Current baseline versus hypothetical shock

Every scenario states whether it extends beyond current rules. Examples:

- advanced-compute licenses remain required for covered destinations/end users,
  while some H200-equivalent and less-advanced items receive case-by-case review;
- the current connected-vehicle rule concerns U.S. imports and sales of covered
  VCS/ADS systems, while the simulator tests broader cross-border software and
  support restrictions.

### Substitutes and bargaining power

A substitute must cite a primary source establishing the capability. The project
does not infer parity, capacity, qualification or migration time from capability
alone.

A bargaining-power gainer is labelled `Candidate` or `Conditional candidate`.
It is not a revenue estimate, market-share forecast or investment signal. When
no company-level gainer is established, the interface shows the gap.

### Switching-delay ranges

Switching delays are explicitly labelled `Analyst scenario estimate`. They
combine the likely sequence of procurement, porting, requalification,
regression testing, process/library migration, safety validation, material
qualification or data-compliance redesign.

They do not include a probabilistic policy model, inventory estimates or
undisclosed company contingency plans.

### Critical-material visibility

The graphite/gallium scenario exposes a limitation of the current frozen graph:
CATL → Tesla is the only verified relationship with the critical-material policy
tag. No gallium-material relationship or in-universe winner is invented. This
gap is a priority for external bridge-node research in Phase 2D.

## 13. Phase 2D external bridge layer

Phase 2D changes the graph boundary, not either frozen universe. External nodes
are stored separately and carry:

- industrial or private-AI/robotics classification;
- legal or operating geography;
- sector, role and short capability description.

The listed-company `pilot` and `relationships` arrays remain unchanged.
External bridge relationships are stored in their own ledger and never enter the
100 × 100 matrix coverage calculation.

### Bridge lanes

| Lane | Included capability |
|---|---|
| Semiconductor bridge | Foundry, memory, packaging/test, fab equipment, contract manufacturing, sensing and power |
| Model + cloud bridge | Private model labs connected to public compute, cloud and distribution platforms |
| Physical AI bridge | Private robotics companies connected to public compute, embodied models, simulation, safety systems or customer trials |

### Endpoint rule

Every Phase 2D edge must touch at least one registered external node. An
external-to-external edge is allowed only when it is part of the missing middle,
such as equipment → foundry, sensor co-development, HBM/packaging co-development
or private compute provider → private model developer.

### Cash and policy treatment

The three-layer rule remains unchanged:

- physical/service flow follows the delivered capability;
- reverse cash is shown only when supplier/customer structure supports
  `DERIVED_DIRECTION`;
- `TERMS_UNDISCLOSED` relationships receive no invented reverse-cash arrow;
- policy-fracture color does not change the physical or cash direction.

All undisclosed amounts remain `UNKNOWN`. Announced capacity in gigawatts, chip
counts or program scale is not converted into a contract value.

### Selection boundary

The external layer is selected, not exhaustive. It privileges primary-source
relationships that clarify one of three structural questions:

1. Who makes, packages or powers public-company silicon?
2. Which public platforms supply or distribute private model labs?
3. Which public compute, model, safety or customer systems enable private
   robotics companies?

An “ecosystem” logo, general compatibility claim or plausible supplier position
is insufficient without a named company-level relationship.
