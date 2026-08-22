# Phase 2E policy semantic review — 2026-08-17

## Verdict

The five policy baselines remain usable **as dated research baselines**. The bounded official-source review identified **no post-freeze policy reversal**. It did identify **three scope clarifications that existed before the 2026-07-25 freeze but were not explicit in the frozen summaries**: connected-vehicle general authorisations, detailed cross-border-data procedures, and graphite enforcement thresholds.

Evidence status is **CONFIRMED** for the five policy summaries below. Decision status is **PASS** for retaining them in a dated review layer.

This does **not** refresh the 41 listed-company relationships or 34 external bridges. Their present-day company-level continuity, product classification, licence outcome, volume, revenue, inventory, and commercial impact remain **UNKNOWN**. The operational boundary remains **RESEARCH_ONLY**.

## Five-lane review

| Sequence | Lane | Evidence | Review decision | Semantic result | Website treatment |
|---:|---|---|---|---|---|
| 1 | Advanced compute | CONFIRMED | PASS | Retain baseline | Say clearly that case-by-case and narrow exception paths do not equal free access; the simulator removes access beyond the baseline. |
| 2 | EDA and fab equipment | CONFIRMED | PASS | Retain baseline | Keep U.S. advanced-node and ECAD/TCAD controls; label Dutch treatment as case-by-case authorisation, not a stated ban. |
| 3 | Connected vehicles | CONFIRMED | PASS | Retain with clarification | Add June 2026 general-authorisation and approved-supplier pathways; preserve the China/Russia control exclusion. |
| 4 | Cross-border data | CONFIRMED | PASS | Retain with clarification | Add certification thresholds, separate-consent detail, necessity analysis, and assessment-extension criteria. |
| 5 | Critical materials | CONFIRMED | PASS | Retain with clarification | Distinguish U.S.-specific licence posture from global permit controls and add graphite technical/enforcement detail. |

## 1. Advanced compute

### Frozen claim

Covered advanced-computing items require licences for Macau and Country Group D:5-headquartered entities, including when the recipient sits elsewhere. Qualifying H200-equivalent and less-advanced items can enter case-by-case review.

### Current official read

BIS's May 2026 guidance still applies the headquarters rule worldwide. Current EAR Part 748 text preserves a certification-gated case-by-case route for qualifying commodities to China and Macau; unsupported applications fall into the presumption-of-denial path. Current Part 740 text also preserves narrow NAC/ACA licence exceptions for eligible items and destinations.

The honest conclusion is neither “chips flow freely” nor “every advanced chip is totally banned.” Classification, end user, performance, destination, certification, and licence outcome matter.

### Decision

`RETAIN_BASELINE`. The Phase 2C scenario is still a deliberately harsher counterfactual: it removes advanced-accelerator access that may remain licensable under the reviewed baseline.

### What remains unknown

- ECCN and licence treatment for every company/product pair.
- Approvals, denials, volumes, installed-base support, and commercial terms.
- Resolution evidence: product classification, licence records, and current company shipment disclosures.

## 2. EDA and semiconductor equipment

### Frozen claim

U.S. controls cover advanced-node semiconductor manufacturing equipment, HBM, and specified ECAD/TCAD tools. Dutch measures require authorisation for selected advanced manufacturing equipment.

### Current official read

Current EAR Part 744 text continues advanced-node manufacturing and ECAD/TCAD end-use controls. The reviewed Dutch national measure remains a case-by-case authorisation regime for selected equipment and technology exported outside the EU; the government's own description says it is not an export ban.

The bounded official-source search did not identify a post-freeze replacement rule that reverses this baseline.

### Decision

`RETAIN_BASELINE`. The EDA scenario remains a hypothetical loss of updates, process-design kits, and technical support layered on top of existing licensing and end-use restrictions.

### What remains unknown

- Vendor-specific licence outcomes and support entitlements.
- Current tool versions, process coverage, installed-base service access, and economics.
- Resolution evidence: named-item licence decisions and current vendor/foundry disclosures.

## 3. Connected vehicles

### Frozen claim

The U.S. final rule phases restrictions on covered vehicle-connectivity-system and automated-driving-system hardware and software with a sufficient China or Russia nexus.

### Current official read

The final-rule baseline still stands. The frozen summary, however, did not explicitly include the June 18, 2026 general authorisations. Eligible parties can use limited-use pathways or an approved-supplier registry. Parties owned by, controlled by, or subject to the jurisdiction or direction of China or Russia are excluded from those general authorisations.

This is a **pre-freeze scope clarification**, not evidence of a post-freeze policy change.

### Decision

`RETAIN_WITH_CLARIFICATION`. Keep the simulator's broader software-support shock, but show that it extends beyond the live U.S. import-and-sale rule and its authorisation pathways.

### What remains unknown

- Whether any named component is covered software or VCS hardware.
- Registry inclusion, mitigation conditions, model-year treatment, and specific authorisations.
- Resolution evidence: registry entries, authorisation decisions, and vehicle-level declarations.

## 4. Cross-border data

### Frozen claim

Important-data and large-scale personal-information exports can require assessment or certification. Thresholds, exemptions, consent, and impact assessment determine the route.

### Current official read

The certification route applies to a non-critical-information-infrastructure operator that, from January 1 of the relevant year, exports personal information for at least 100,000 but fewer than 1 million people, excluding sensitive personal information, or sensitive personal information for fewer than 10,000 people. Important data is excluded from that route.

The July 24, 2026 CAC Q&A adds detail on separate consent, assessment-result extensions, necessity in recruitment, and the need to select the applicable assessment, standard-contract, or certification path.

This is a **pre-freeze scope clarification**, not evidence of a post-freeze policy change.

### Decision

`RETAIN_WITH_CLARIFICATION`. A cloud, model, or engineering edge is a possible exposure marker only; it does not prove a regulated transfer.

### What remains unknown

- Data category, volume, sensitivity, location, recipient, and transfer path for every company edge.
- Whether an exemption, contract, certification, or security assessment applies.
- Resolution evidence: company data-flow inventories and the applicable compliance record.

## 5. Critical materials

### Frozen claim

Graphite, gallium, and germanium exports are controlled, and the December 2024 measure tightened destination-specific treatment for the United States.

### Current official read

The U.S.-specific measure says gallium, germanium, antimony, and superhard-material dual-use exports to the United States will **in principle not be licensed**. Graphite dual-use exports to the United States face stricter end-user and end-use review.

A May 2026 compliance case reinforces licence-first treatment. It says natural flake graphite and its products are controlled, while synthetic graphite is controlled when purity exceeds 99.9%, flexural strength exceeds 30 MPa, and density exceeds 1.73 g/cm³. It also describes due diligence and five-year recordkeeping.

This is a **pre-freeze scope and enforcement clarification**, not evidence of a post-freeze policy change.

### Decision

`RETAIN_WITH_CLARIFICATION`. Keep the materials shock as a stress case. Do not pretend the graph has gallium visibility: the 41-edge listed-company ledger only observes CATL → Tesla as a broad materials-sensitive relationship.

### What remains unknown

- Product classification, origin, technical parameters, destination, and licence outcome.
- Company-level material, refiner, recycler, and inventory dependencies.
- Resolution evidence: bills of material, technical declarations, licence records, and verified supply relationships.

## Source additions in the dated review layer

The frozen 90-source ledger is unchanged. Six successor sources are registered separately in `phase2e/reviews/policy_sources_20260817.csv` and mirrored into the static website data file:

1. Current EAR Part 740.
2. Current EAR Part 748.
3. Current EAR Part 744.
4. Connected Vehicles General Authorization 3, issued 2026-06-18.
5. CAC cross-border-data Q&A, published 2026-07-24.
6. MOFCOM graphite export-control compliance case, published 2026-05.

## Promotion and history

Each lane is recorded as a separate append-only `SEMANTIC_REVIEW_RECORDED` event. The original 2026-07-25 baseline remains recoverable from Git commit `448dd18e6138fa8d257b7fde5364385bcfd4f0a4` and its Phase 2E baseline manifest.

No relationship evidence grade, relationship status, amount, company membership, licence outcome, or investment conclusion is promoted by this review.
