# Phase 2A findings

Phase 2A expands the frozen 20 × 20 core only where a primary source establishes
a named cross-universe relationship. The result is a selective **21 × 23** map:
one Nasdaq-100 addition, three HKEX Core-100 additions and twelve new edges.

## Highest-value new edges

| Lane | Provider → recipient | What the primary source establishes | Status |
|---|---|---|---|
| EDA/IP → foundries | Synopsys → Hua Hong | Validated 130 nm low-power reference flow using Hua Hong libraries and a test chip | Historical |
| Fab equipment → foundries | ASML → SMIC | DUV volume-purchase agreement and US$1.2B of orders in the disclosed 12-month period | Historical |
| Compute → cloud | NVIDIA → China Mobile | Bigcloud deployed ConnectX SmartNIC and BlueField DPU accelerated networking | Historical |
| Compute → cloud | Intel → China Unicom | Xeon/platform energy controls and Intel AI software tested in 5G-core and big-data workloads | Historical |
| Compute → cloud | AMD → Alibaba | Virtex UltraScale+ FPGA and Vitis AI used in Alibaba FaaS acceleration | Historical |
| Compute → vehicles | NVIDIA → NIO | Current NVIDIA partner page documents DRIVE Orin across NIO and ONVO vehicles | Current |
| Compute → vehicles | Qualcomm → NIO | 2026 Cockpit Elite and Ride Elite collaboration/design wins | Current |
| Compute → vehicles | Qualcomm → Leapmotor | D19 central controller using dual Snapdragon Elite platforms entering mass production | Current |
| Sensors → devices/robots | NXP → NIO | 4D imaging-radar collaboration for automated-driving perception | Historical |
| Sensors → devices/robots | NXP → Xiaomi | Trimension UWB in Xiaomi phone and vehicle-access products | Current |
| Sensors → devices/robots | Analog Devices → BYD | A2B audio bus and SHARC DSP selected for vehicle platforms | Historical |
| Sensors → devices/robots | Analog Devices → Baidu | Apollo MOU covering radar, lidar, IMU, sensor fusion and DSP | Historical |

## What the expansion changes

### 1. Autonomy is not one “AI chip” edge

The vehicle stack separates into:

- central autonomy compute;
- cockpit compute;
- radar and precise ranging;
- inertial sensing and sensor fusion;
- vehicle networking and signal processing.

NVIDIA and Qualcomm dominate the visible compute layer in this pass, while NXP
and Analog Devices expose the machine-perception and signal-chain layer.

### 2. Foundry dependence is chronologically sticky

The strongest disclosed equipment amount is old: ASML reported US$1.2B of SMIC
orders for a twelve-month period ending in 2021. It is useful as installed-base
and historical procurement evidence, not as a current revenue estimate.

The same principle applies to the older Synopsys–Hua Hong flow. Qualification,
libraries and tool/process integration can matter after an announcement goes
stale, but the map does not turn that persistence into a claim of current sales.

### 3. Cloud-platform evidence is less clean than vehicle evidence

Named customer stories establish real deployments but usually omit present fleet
size, refresh cadence and spend. Phase 2A therefore keeps the China Mobile,
China Unicom and Alibaba edges historical or scale-ambiguous.

### 4. The battery lane remains sparse

The original CATL → Tesla edge remains the clean cross-universe relationship.
Adding battery-industry announcements without a counterparty inside the frozen
Nasdaq-100 universe would make the matrix look denser while reducing its
meaning.

## Negative findings

- KLA → SMIC remains policy-only; reviewed evidence does not establish a current
  commercial sale.
- Intel → China Telecom was not added because the reviewed solution brief did
  not clearly establish China Telecom as the deployed recipient.
- Legacy Marvell deployments were not added because their age overwhelmed their
  present decision value.

## Interpretation

Phase 2A does not support a simple “U.S. supplies China” narrative. It shows
different kinds of entanglement:

- current product integration;
- historical installed base;
- co-development;
- architecture/IP dependence;
- policy-only access constraints.

The useful unit is therefore the **sourced edge with chronology and limits**, not
the company pair by itself.
