---
title: "NVIDIA Owns Everything Around the Chip"
date: 2026-09-01
updated: 2026-09-01
section: Ouroboros
series: Daily Action Item
tags:
  - Artificial Intelligence
  - Semiconductors
  - NVIDIA
  - MediaTek
keywords:
  - NVIDIA NVLink Fusion
  - MediaTek custom XPU
  - heterogeneous AI infrastructure
  - NVHBM
  - AI system control layer
categories:
  - Artificial Intelligence
  - Semiconductors
  - Investing
excerpt: "Custom silicon can reclaim the compute core while NVIDIA retains value through interconnect, memory, networking, rack validation, software and capital."
hero: /action-item/20260901/hero.webp
ogImage: /action-item/20260901/og.webp
canonical: "https://iamrobin.ai/ouroboros/202609/20260901/action_item/"
author: https://iamrobin.ai/#person
inLanguage: en
draft: false
sourceAction: "Daily Briefing 2026-09-01, item 5"
ledgerId: NVDA-MTK-20260901
visualHeadline: "The chip is only the center."
visualSubhead: "Interconnect · memory · network · rack · software"
visualFooter: "COMPUTE CORE × CONTROL LAYER × ECONOMIC CAPTURE"
visualNodes: "CUSTOM XPU|NVLINK|NVHBM|NETWORK|RACK"
---

## The conclusion is system control

**The conclusion is direct: custom silicon can reclaim the compute core while NVIDIA keeps earning from the systems around it.** NVIDIA's $3.5 billion investment in MediaTek and MediaTek's adoption of NVLink Fusion turn a competitive threat into a platform strategy. A cloud provider may design its own XPU, yet still use NVIDIA interconnect, memory architecture, networking, packaging support, rack validation and operating software. GPU unit share can decline while NVIDIA's economic capture across the AI factory remains substantial.

That is a stronger response than defending every workload with another GPU benchmark. OpenAI's Jalapeño results showed that a specialized inference accelerator can outperform a general platform on defined workloads. [The August 29 analysis](https://iamrobin.ai/ouroboros/202608/20260829/action_item/) changed the long-term assumption from an indivisible moat to a split moat. The compute core becomes contestable. Training, flexible workloads and the wider system remain harder to displace.

[NVIDIA and MediaTek announced](https://nvidianews.nvidia.com/news/nvidia-and-mediatek-deepen-long-standing-partnership-to-build-ai-edge-to-cloud-computing-platforms) that MediaTek will adopt NVLink Fusion for custom XPUs used by cloud providers and frontier laboratories. NVIDIA also invested $3.5 billion in MediaTek convertible bonds. [MediaTek's parallel announcement](https://www.mediatek.com/press-room/nvidia-and-mediatek-deepen-long-standing-partnership-to-build-ai-edge-to-cloud-computing-platforms) describes a collaboration spanning silicon, packaging, memory, connectivity and rack-scale systems. [Reuters reported](https://www.reuters.com/world/asia-pacific/nvidia-invests-35-billion-mediatek-convertible-bonds-2026-08-31/) that NVIDIA took most of MediaTek's $3.9 billion overseas convertible-bond offering, while Alphabet also participated for an undisclosed amount.

The evidence supports `WATCH — COMPUTE_CORE_CONTESTABLE / CONTROL_LAYER_EXPANDING`. It does not yet prove customer volume, revenue attachment, gross margin or durable pricing power. Those variables remain `UNKNOWN`. The action is to rebuild NVIDIA underwriting around economic capture per deployed rack, separated into compute, interconnect, memory, networking, software and capital.

## Custom silicon changes the bargaining boundary

A hyperscaler builds a custom accelerator for a simple reason: scale makes specialization economic. Stable training or inference workloads allow the customer to remove unused flexibility, tune arithmetic and memory paths, coordinate silicon with its models and create an internal reference cost. AWS built Trainium and Inferentia. Google built TPUs. OpenAI built Jalapeño. Each program creates a credible alternative to buying every unit of compute from one merchant supplier.

The strategic effect begins before a custom chip gains majority workload share. A buyer with an internal cost curve can negotiate the remaining purchases more aggressively. It can reserve general-purpose GPUs for fast-changing or frontier work and send predictable workloads to purpose-built machines. It also collects design, compiler and operations data that improve the next generation.

That moves the competitive boundary. NVIDIA no longer needs every matrix multiplication to happen on an NVIDIA GPU. It needs the customer to depend on enough NVIDIA-controlled layers that the full system continues to produce revenue and switching costs.

The distinction is visible in procurement. A custom XPU program still needs high-bandwidth memory, scale-up connectivity, scale-out networking, host processors, packaging, power delivery, liquid cooling, firmware, orchestration, telemetry and validation. Customers can build or source each layer independently, although every additional interface adds integration labor and failure risk. NVIDIA's opportunity is to sell the shortest reliable path from a new accelerator design to an operating fleet.

The correct investment question therefore changes from “What percentage of accelerators are NVIDIA GPUs?” to “What percentage of the AI factory's economic value still passes through NVIDIA?” Both numbers matter, and they can move in opposite directions.

## NVLink Fusion surrounds the XPU

[NVIDIA describes NVLink Fusion](https://www.nvidia.com/en-us/data-center/nvlink-fusion/) as a semi-custom architecture for connecting third-party XPUs with NVIDIA's platform. The components reveal the intended control surface.

**NVLink scale-up fabric** connects accelerators inside a tightly coupled compute domain. NVIDIA says NVLink 6 can provide 3.6 terabytes per second of bidirectional bandwidth per XPU and scale a domain to 72 XPUs, with larger roadmap configurations. Those figures are issuer claims until measured in third-party production. The strategic point is clear: the customer's chip can become the compute core while NVIDIA supplies the fabric that lets many chips act as one system.

**NVLink-C2C** connects chips within a package or module. A custom accelerator can attach to NVIDIA CPUs or other chiplets through a coherent, high-bandwidth interface. The interface shapes packaging choices, memory movement and the surrounding silicon roadmap.

**NVHBM** extends the strategy into memory. NVIDIA offers a custom base die and controller around high-bandwidth memory so an XPU designer can gain bandwidth and potentially save die area or power. NVIDIA names AWS Annapurna Labs as the first collaborator on NVHBM. Memory architecture is a critical constraint in modern AI systems. Owning part of that path can preserve value even when the arithmetic engine belongs to the customer.

**Networking and data processing** extend beyond the scale-up domain. Spectrum-X, ConnectX and BlueField cover Ethernet, InfiniBand and infrastructure processing. A rack filled with third-party XPUs can still attach to NVIDIA switches, network adapters and DPUs. The more heterogeneous the fleet becomes, the more valuable reliable interconnection and management may become.

**MGX rack architecture and validation** make the offer operational. NVIDIA presents a common rack with shared power, cooling, networking, management and the ability to reprovision GPU and XPU resources. Prequalified designs can reduce commissioning time and integration risk. The claim needs customer-level evidence, but it addresses a real bottleneck: a working chip is far from a working data center.

These layers form a control stack:

| Layer | Customer can own | NVIDIA seeks to retain |
|---|---|---|
| Compute | custom XPU architecture | optional GPUs and CPUs |
| Package | accelerator and chiplets | NVLink-C2C interfaces |
| Memory | workload-specific design | NVHBM controller and architecture |
| Scale-up | compute topology | NVLink fabric and switches |
| Scale-out | data-center network | Spectrum-X, ConnectX and BlueField |
| Rack | deployment choices | MGX, cooling, power and validation |
| Operations | workload scheduler | Mission Control, telemetry and software |

The moat becomes modular. A customer can replace one layer without replacing the whole platform.

## MediaTek is a bridge into heterogeneous compute

MediaTek brings design, packaging, manufacturing and customer relationships across devices, automotive systems and data-center silicon. Its role matters because NVLink Fusion needs partners capable of turning customer requirements into real chips. NVIDIA can provide interfaces and system architecture; MediaTek can help design and deliver custom XPUs.

The $3.5 billion convertible-bond investment aligns incentives and supplies capital. It also creates a circularity question. NVIDIA funds a partner, the partner develops systems that use NVIDIA control-layer technology, customers deploy those systems, and the resulting demand can support NVIDIA's platform revenue and the partner's value. This is strategic financing, not proof of economic success.

The structure resembles a broader pattern examined in [the August 20 Google and Marvell analysis](https://iamrobin.ai/ouroboros/202608/20260820/action_item/). Capital can accelerate a supply chain, secure design capacity and deepen technical alignment. It can also obscure organic demand if investors count funded ecosystem activity as independent validation. The accounting must separate the bond investment, the partner's delivered silicon, customer cash payments and NVIDIA's attached revenue.

Three tests keep the analysis honest. First, identify customers that choose MediaTek and NVLink Fusion without relying on undisclosed subsidies. Second, measure time to tape-out, production yield and rack commissioning against credible alternatives. Third, reconcile NVIDIA revenue from interconnect, networking, memory and software with the capital committed to create the ecosystem.

Alphabet's participation adds another layer. Google is both a major custom-silicon operator and a potential beneficiary of broader supply-chain capacity. The amount and strategic terms were not disclosed in the cited reporting. Its involvement should be recorded as confirmed participation with `UNKNOWN` economics rather than interpreted as proof of a shared architecture.

## Trainium and Jalapeño show the likely market

[AWS presents Trainium](https://aws.amazon.com/ai/machine-learning/trainium/) as purpose-built silicon for generative-AI training and inference inside AWS. The important lesson is organizational. AWS controls workloads, cloud distribution, software services, networking and procurement at enough scale to justify a multi-generation chip program. NVIDIA's response cannot depend on persuading AWS to abandon custom silicon. It can compete for the surrounding layers and for workloads that still value NVIDIA's flexibility or ecosystem.

OpenAI's Jalapeño demonstrates the same logic from a model company. A specialized inference engine can be optimized around known models, latency targets and serving behavior. Production fleet size, reliability, yield and full cost remain undisclosed, yet the technical direction is credible. NVIDIA's system strategy accepts that direction and seeks to attach its interfaces to the next custom design.

This produces a heterogeneous base case:

1. Frontier training and rapidly changing research continue to favor broad programmable systems.
2. Stable, high-volume workloads migrate toward custom XPUs when savings exceed design and operations costs.
3. Cloud providers operate mixed fleets and route workloads by economics, availability and software compatibility.
4. NVIDIA competes both as a compute supplier and as the common system layer around external compute.

Heterogeneity increases the importance of standards and interoperability. It also creates an opening for open fabrics and rival vendors. NVLink Fusion wins only if customers prefer NVIDIA's integration benefits to the freedom and price of alternatives. The announcement creates a route to market, not a guaranteed standard.

## Capital can accelerate adoption and hide demand

NVIDIA's investment strategy deserves separate underwriting from its product strategy. Capital can shorten partner development cycles, reserve engineering resources and reassure customers that an ecosystem will survive. Convertible bonds preserve downside structure differently from a direct common-equity purchase, although the full terms and conversion economics require the offering documents.

Capital also creates reflexivity. A rising NVIDIA valuation increases financing capacity. Financing expands the ecosystem. Ecosystem activity supports demand expectations. Stronger expectations can reinforce valuation. The loop is productive when customers pay for useful systems and the resulting cash flows exceed the capital used to create them.

The loop becomes fragile when funded partners buy from one another without independent end demand, when deployment announcements substitute for commissioned systems, or when the same projected revenue appears in several company narratives. The correct ledger therefore separates:

```text
NVIDIA capital → MediaTek design capacity → customer XPU order
       ↓                                      ↓
investment asset                    deployed, accepted rack
       ↓                                      ↓
realized return ← customer cash ← NVIDIA attached revenue
```

Every arrow requires evidence. The investment is confirmed. The custom-XPU route is confirmed. Customer orders, operating racks, attachment revenue and realized returns remain unknown. No amount of strategic coherence should convert those unknowns into revenue.

## Six metrics decide whether the moat moved

The first metric is **third-party XPU deployments**. Count disclosed customer designs, tape-outs, production racks and accepted sites using NVLink Fusion. A partner announcement without operating hardware proves alignment only.

The second is **attachment rate**. Measure how often external XPUs use NVIDIA scale-up fabric, NVHBM, networking, CPUs, DPUs, rack architecture and software. Unit share at each layer is more informative than one blended market-share number.

The third is **economic capture per rack**. Estimate NVIDIA revenue and gross profit from a custom-XPU rack and compare it with a GPU-centered rack. Lower revenue with lower capital intensity may still be attractive. A large revenue decline with weak margins would show that system control cannot replace compute-core economics.

The fourth is **deployment advantage**. Track time from design freeze to tape-out, rack delivery, commissioning and stable utilization. Prevalidated systems should reduce integration labor, failure rates and commissioning delays. Customers need to disclose or corroborate those savings.

The fifth is **customer independence**. Record open-fabric adoption, alternative networking, in-house memory controllers and software portability. NVIDIA's control layer is strongest when customers choose it repeatedly despite viable alternatives.

The sixth is **capital efficiency**. Reconcile partner financing with attached revenue, investment gains, cash collection and credit exposure. Strategic capital should produce durable economic capture rather than a larger announcement pipeline.

| Metric | Current evidence | Upgrade trigger | Falsifier |
|---|---|---|---|
| XPU deployments | MediaTek path announced | named production customers and racks | repeated delay or prototype-only use |
| Attachment rate | architecture disclosed | layer-level shipped volumes | customers avoid NVIDIA layers |
| Capture per rack | `UNKNOWN` | revenue and margin disclosure | severe value loss outside GPU core |
| Deployment advantage | prevalidation claimed | measured commissioning improvement | no time, cost or reliability benefit |
| Customer independence | alternatives exist | voluntary repeat adoption | lock-in drives migration away |
| Capital efficiency | $3.5B invested | cash returns and attached revenue | funded activity without end demand |

## Position discipline follows the control layer

The NVIDIA thesis should now use two scorecards. The compute scorecard tracks GPU workload share, accelerator pricing, training demand, inference mix and roadmap performance. The control-layer scorecard tracks NVLink Fusion deployments, NVHBM adoption, networking attachment, rack validation, software use and economic capture from third-party XPUs.

This avoids two errors. The first error is treating every custom chip as a lost NVIDIA system. The second is treating every NVIDIA interface announcement as proof that the platform moat is permanent. Custom silicon can expand and NVIDIA can retain significant value. Open standards can also weaken the control layer. Both outcomes remain possible.

For position sizing, preserve current strength in frontier systems while reducing confidence in an indivisible inference monopoly. Upgrade the system-control thesis only when external XPUs ship at scale and NVIDIA discloses meaningful attached economics. Downgrade it when major customers use custom compute with non-NVIDIA memory, fabric, networking and orchestration, or when system revenue fails to offset GPU share pressure.

Robin's action is specific: add a quarterly control-layer worksheet beside the existing compute worksheet. Record confirmed production, not announced capacity. Keep capital transactions separate from customer demand. Require a cash-flow bridge from custom XPU to NVIDIA revenue before increasing terminal value.

The chip remains important. The rack decides whether the chip becomes useful. NVIDIA's answer to custom silicon is to own more of the route from silicon to service. The investment question is whether customers keep paying for that route after they own the center.

## Categories and keywords

**Categories:** Artificial Intelligence, Semiconductors, Investing

**Keywords:** NVIDIA NVLink Fusion, MediaTek custom XPU, NVHBM, NVLink-C2C, AWS Trainium, OpenAI Jalapeño, heterogeneous AI infrastructure, AI rack economics, NVIDIA system moat, capital circularity

**Hashtags:** #AIInfrastructure #Semiconductors #NVIDIA #MediaTek #CustomSilicon
