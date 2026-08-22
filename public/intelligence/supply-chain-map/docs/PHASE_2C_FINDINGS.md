# Phase 2C findings — Policy shock simulator

Status: **completed for the frozen 2026-07-25 graph**.

Phase 2C does not add a commercial relationship. It stress-tests the same 41
verified cross-universe relationships under five discrete policy shocks.

## What the simulator means

- **Immediate company** — an endpoint of a verified relationship selected by the
  shock's existing policy tag or explicit relationship list.
- **Direct verified fiber** — a sourced relationship selected by that shock.
- **Second-order company** — a new node reached by following exactly one other
  verified relationship from an immediate company.
- **Substitute** — a sourced capability or operating path that may absorb part
  of the shock. It is not assumed to provide drop-in parity.
- **Bargaining-power gainer** — a candidate whose capability may become more
  valuable. This is neither a revenue forecast nor a stock-price signal.
- **Switching delay** — an analyst scenario range, not a disclosed company
  timetable.

Second-order propagation is deliberately mechanical. It exposes where a fracture
could travel next; it does not prove loss, causality or policy applicability to
every downstream product.

## Scenario result

| Scenario | Direct fibers | Immediate companies | Second-order fibers | Second-order companies | Switching estimate |
|---|---:|---:|---:|---:|---|
| Remove licensable advanced U.S. accelerator access | 14 | 13 | 12 | 7 | 12–36+ months |
| Restrict EDA updates and technical support | 3 | 4 | 3 | 3 | 18–48+ months |
| Restrict connected-vehicle software | 15 | 14 | 11 | 7 | 18–48+ months |
| Restrict graphite and gallium exports | 1 | 2 | 0 | 0 | 12–36+ months |
| Tighten cross-border data rules | 11 | 11 | 8 | 6 | 3–18 months |

Counts describe the frozen evidence graph, not the whole economy.

## 1. Advanced U.S. accelerator access

The current baseline is not a total ban. BIS guidance still requires licenses
for covered advanced-computing items to Macau and D:5-headquartered entities,
including through overseas locations. A January 2026 rule moved some
H200-equivalent and less-advanced products to case-by-case review with
certification.

The simulator therefore tests a stricter counterfactual: **remove that licensable
path entirely**.

Immediate exposure is concentrated in NVIDIA, AMD and Intel relationships with
cloud, telecom, system and vehicle platforms. One-hop propagation reaches other
compute, autonomy and device relationships attached to the same Chinese
platforms.

Partial substitute paths:

- Huawei Ascend plus CANN;
- Baidu's Kunlunxin AI-computing subsidiary;
- heterogeneous scheduling and training/inference efficiency.

None is treated as a drop-in CUDA or frontier-accelerator equivalent.

Candidate bargaining-power gainers: Huawei Ascend, Baidu/Kunlunxin and Alibaba
Cloud's fleet-optimization layer.

## 2. EDA updates and support

This scenario is narrower than the broad semiconductor-tool policy tag. Only the
three verified EDA/IP relationships are immediate:

- Synopsys → SMIC;
- Cadence → SMIC;
- Synopsys → Hua Hong.

Fabrication-equipment relationships appear only at second order through the
affected foundries. That keeps the model from turning every historical machine
sale into an immediate software-support claim.

Empyrean Technology supplies a documented domestic foundry-oriented EDA
portfolio, but the source does not establish complete full-flow parity. A
validated legacy release may bridge a mature flow temporarily, while security,
new-process and vendor-support coverage decay.

Candidate gainers: Empyrean Technology and, conditionally, Hua Hong's mature-node
specialization.

## 3. Connected-vehicle software

The current U.S. connected-vehicle rule restricts covered VCS/ADS hardware and
software with a sufficient PRC or Russia nexus in U.S. imports and sales,
phased by model year. The simulator goes further: it tests a broad cross-border
software-delivery, update and support fracture.

This is one of the graph's densest shock surfaces because compute, architecture,
radar, ranging, signal processing and autonomy co-development converge on the
same automakers.

Horizon Journey 6 is the strongest in-universe substitute path: an integrated
vehicle-compute and software platform with a named OEM ecosystem. It still
requires vehicle-level functional-safety, sensor and production validation.

Candidate gainers: Horizon Robotics and, conditionally, vertically integrated
vehicle makers such as BYD.

## 4. Graphite and gallium

This is the simulator's most important **honest gap**.

The relationship ledger sees only CATL → Tesla directly under the critical-
materials tag. It contains no verified gallium-material edge, so the interface
does not manufacture immediate semiconductor victims or listed winners.

External substitute paths include:

- synthetic graphite, alternative-geography supply and recycling;
- domestic gallium recovery from existing mineral-processing streams.

These paths face purity, scale, cost and qualification constraints. No
company-level bargaining-power gainer is established inside the frozen
Nasdaq-100 and HKEX Core-100 universes. Phase 2D should add external miners,
refiners and recyclers.

## 5. Cross-border data

The current Chinese framework includes thresholds, exemptions, security
assessment and certification routes. The simulator tests stricter localization,
consent and transfer approval.

Immediate exposure clusters around cloud, telecom, co-development and
autonomous-driving relationships. One-hop propagation reaches systems or
hardware relationships attached to those same platforms.

Substitute paths are architectural and legal rather than component swaps:

- localize cloud, data and model operations;
- minimize or anonymize transfers;
- use the applicable assessment or certification path.

Candidate gainers: Alibaba Cloud, Tencent Cloud, China Mobile and China Unicom
as localized operating perimeters. The map does not claim they automatically
capture revenue.

## Switching-delay method

The delay bands are qualitative ranges derived from the work that must be
repeated after a fracture:

- procurement and capacity reservation;
- software porting and regression testing;
- process-design-kit or library migration;
- functional-safety and vehicle validation;
- material purity and supplier qualification;
- data inventory, consent, certification and architecture separation.

The ranges are intentionally wide. They do not model inventory buffers,
stockpiling, hidden suppliers, legal waivers, policy exemptions or emergency
government coordination.

## Data outputs

- `data/policy_shock_scenarios.csv`
- `data/policy_shock_substitutes.csv`
- `data/policy_shock_gainers.csv`

The relationship ledger remains at **41**. Phase 2C changes the analytical lens,
not the established commercial evidence.
