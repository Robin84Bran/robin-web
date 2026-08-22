# Phase 2D findings — external bridge layer

Frozen: **2026-07-25**

## Result

Phase 2D adds a selected external layer without changing either 100-company
universe, the 20 × 20 core, the 21 × 23 Phase 2A view or the 41 listed-company
relationships.

| Measure | Result |
|---|---:|
| External companies | 19 |
| Industrial bridge nodes | 9 |
| Private AI / robotics nodes | 10 |
| Source-backed bridge relationships | 34 |
| Semiconductor bridges | 15 |
| Model + cloud bridges | 13 |
| Physical-AI bridges | 6 |
| Historical bridge relationships | 1 |
| Commercial amounts inferred | 0 |

Every undisclosed amount remains `UNKNOWN`.

## What the external layer changes

### 1. The semiconductor graph has a missing middle

Public chip designers do not flow directly into end products. The evidence
shows a chain of specialized intermediaries:

`design / architecture → foundry → HBM → packaging and test → system assembly → end use`

The selected layer establishes:

- TSMC fabrication for Apple, NVIDIA and AMD;
- Samsung manufacturing links with Apple and AMD;
- SK hynix HBM development and supply alignment with NVIDIA;
- ASE / SPIL assembly and test collaboration with NVIDIA;
- Foxconn system manufacturing and robotics collaboration with NVIDIA;
- Tokyo Electron equipment and production support for TSMC;
- Infineon power conversion work around NVIDIA's 800 VDC architecture.

This is the structural chokepoint that a two-index-only graph hides. Compute
leadership depends on foundry, memory, packaging and systems capacity that is
mostly outside both frozen universes.

### 2. Private model labs form a multi-provider mesh

The private labs are not isolated sovereign stacks:

- OpenAI connects to Microsoft, AMD, Broadcom, NVIDIA and Amazon;
- Anthropic connects to Amazon, Alphabet and xAI compute;
- xAI connects upstream to NVIDIA and downstream to Anthropic;
- DeepSeek is distributed through Microsoft Azure, Amazon Bedrock and Alibaba
  Cloud;
- Moonshot AI's Kimi is distributed through Alibaba Cloud.

This supports Robin's game-theory framing. Model efficiency can reduce compute
per task while competition increases the number of models, providers, workloads
and duplicated capacity plans. The observed architecture is multi-cloud and
multi-silicon, not a single winner minimizing aggregate chip demand.

The map does **not** infer contract value, utilization, completed capacity or
profitability from announced gigawatts.

### 3. Physical AI is platform-dependent before robot OEMs scale

Private robotics companies rely on public platforms for different layers:

- Figure AI — NVIDIA simulation and compute;
- Apptronik — Google DeepMind embodied models;
- Agility Robotics — NVIDIA safety compute and a historical Amazon warehouse
  trial;
- Boston Dynamics — Google DeepMind foundation-model intelligence;
- Unitree — NVIDIA Jetson Thor and GR00T reference stack.

The evidence is strong enough to establish technical or program relationships,
but generally not production volumes, robot economics or commercial scale.
This is why the map labels announced integrations separately from current
deployment and historical trials.

### 4. Capability visibility is better than cash visibility

Only structurally clear supplier/customer relationships receive a reverse-cash
arrow. Co-development, platform distribution, joint-venture exploration and
multi-role partnerships remain `TERMS_UNDISCLOSED`.

Examples:

- TSMC → Apple can support the structural reverse direction Apple → TSMC.
- Sony ↔ TSMC image-sensor exploration cannot support a net payment arrow.
- Foxconn ↔ NVIDIA spans manufacturing, systems and robotics; one net direction
  would be invented.
- Microsoft ↔ OpenAI includes cloud, IP, revenue-sharing and distribution roles;
  one simple cash arrow would erase the actual structure.

## Policy-fracture interpretation

The external layer adds policy observability but not a probability forecast:

- U.S. semiconductor controls can affect equipment, advanced-compute and
  cross-border service paths without proving that every product is controlled.
- DeepSeek distribution across U.S. and Chinese clouds carries higher data and
  countermeasure exposure than a domestic catalog entry alone.
- Unitree's inclusion in a U.S. advanced robotics stack is a high-fracture
  bridge, but the source does not prove export classification or shipment.
- Taiwan, Korea, Japan and European production concentration is visible, but
  ordinary geopolitical concentration is not converted into a targeted-policy
  score without a registered mechanism.

## Deliberate gaps

The following were not promoted into graph edges:

- Huawei accelerator, packaging and foundry paths without a direct reviewed
  counterparty source;
- a current NVIDIA–Samsung HBM supply edge;
- Foxconn–Apple current manufacturing volume;
- Sony–Apple current image-sensor supply;
- additional private Chinese robotics companies without named public-platform
  evidence;
- company-level graphite and gallium material flows.

These remain `NOT_ESTABLISHED`, not “no relationship.”

## Primary-source anchors

- [Apple on TSMC Arizona advanced-chip purchases](https://www.apple.com/newsroom/2026/02/apple-accelerates-us-manufacturing-with-mac-mini-production/)
- [SK hynix and NVIDIA memory partnership](https://news.skhynix.com/multi-year-tech-partnership-with-nvidia/)
- [Foxconn and NVIDIA AI systems / robotics collaboration](https://www.honhai.com/en-us/press-center/press-releases/latest-news/2044)
- [Sony Semiconductor Solutions and TSMC image-sensor MOU](https://www.sony-semicon.com/en/news/2026/2026050801.html)
- [OpenAI infrastructure partner map](https://openai.com/index/scaling-ai-for-everyone/)
- [Anthropic and Amazon compute expansion](https://www.anthropic.com/news/anthropic-amazon-compute)
- [Google DeepMind and Apptronik](https://deepmind.google/blog/gemini-robotics-brings-ai-into-the-physical-world/)
- [Boston Dynamics and Google DeepMind](https://bostondynamics.com/blog/boston-dynamics-google-deepmind-form-new-ai-partnership/)

The complete machine-readable source ledger is in `data/sources.csv`.

## Filing label

> Phase 2D restores the missing industrial and private-company intermediaries.
> It shows a multi-foundry, multi-memory, multi-cloud and multi-platform AI
> economy whose competitive actors remain commercially entangled.
