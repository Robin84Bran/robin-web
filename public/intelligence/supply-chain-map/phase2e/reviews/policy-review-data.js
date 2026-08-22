/* Generated from policy_semantic_review_20260817.json. Do not edit by hand. */
window.PHASE2E_POLICY_DATA = {
  "schema_version": "phase2e-policy-review-v1",
  "review_id": "POLICY_REVIEW_20260817",
  "reviewed_at": "2026-08-17",
  "baseline_frozen_at": "2026-07-25",
  "review_scope": "Bounded official-source semantic review of five policy lanes. This is not a relationship, price, licence-outcome, or investment refresh.",
  "official_sources_only": true,
  "policy_reversals_identified": 0,
  "scope_clarifications": 3,
  "policy_evidence_status": "CONFIRMED",
  "relationship_freshness": "UNKNOWN",
  "operational_decision": "RESEARCH_ONLY",
  "sources": [
    {
      "id": "S_BIS_EAR740_20260817",
      "type": "policy-current",
      "date": "2026-08-17",
      "publisher": "U.S. Bureau of Industry and Security",
      "title": "EAR Part 740 — NAC and ACA advanced-computing licence exceptions",
      "url": "https://www.bis.gov/regulations/ear/740"
    },
    {
      "id": "S_BIS_EAR748_20260817",
      "type": "policy-current",
      "date": "2026-08-17",
      "publisher": "U.S. Bureau of Industry and Security",
      "title": "EAR Part 748 — AI commodity certification for China and Macau applications",
      "url": "https://www.bis.gov/regulations/ear/748"
    },
    {
      "id": "S_BIS_EAR744_20260817",
      "type": "policy-current",
      "date": "2026-08-17",
      "publisher": "U.S. Bureau of Industry and Security",
      "title": "EAR Part 744 — semiconductor manufacturing and ECAD/TCAD end-use controls",
      "url": "https://www.bis.gov/regulations/ear/744"
    },
    {
      "id": "S_BIS_CV_GA3_20260618",
      "type": "policy",
      "date": "2026-06-18",
      "publisher": "U.S. Bureau of Industry and Security",
      "title": "Connected Vehicles General Authorization 3 — Approved Supplier Registry",
      "url": "https://www.bis.gov/media/documents/general-authorization-3-dtd-20260618-final.pdf"
    },
    {
      "id": "S_CN_DATA_QA_20260724",
      "type": "policy-guidance",
      "date": "2026-07-24",
      "publisher": "Cyberspace Administration of China",
      "title": "Cross-border data security policy Q&A — July 2026",
      "url": "https://www.cac.gov.cn/2026-07/24/c_1786638883119336.htm"
    },
    {
      "id": "S_CN_GRAPHITE_CASE_202605",
      "type": "policy-enforcement",
      "date": "2026-05",
      "publisher": "Ministry of Commerce of the PRC",
      "title": "Graphite export-control compliance case and technical thresholds",
      "url": "https://exportcontrol.mofcom.gov.cn/article/hgfw/hgal/202605/1289.html"
    }
  ],
  "reviews": [
    {
      "id": "advanced-compute",
      "sequence": 1,
      "label_zh": "先进芯片",
      "label_en": "Advanced compute",
      "scenario_id": "gpu-access",
      "policy_ids": [
        "P_US_ADV"
      ],
      "jurisdiction": "United States",
      "evidence_status": "CONFIRMED",
      "decision_status": "PASS",
      "review_disposition": "RETAIN_BASELINE",
      "change_class": "NO_POLICY_REVERSAL_IDENTIFIED",
      "frozen_claim": "Covered advanced-computing items require licences for Macau and D:5-headquartered entities, while qualifying H200-equivalent and less-advanced items can enter case-by-case review.",
      "official_read": "Current BIS guidance still applies the worldwide headquarters rule. Current EAR text also preserves narrow NAC/ACA exceptions and a certification-gated case-by-case route; this is a controlled path, not blanket free access and not a blanket global ban.",
      "why_it_matters": "The existing stress test remains intentionally harsher than the reviewed baseline: it removes access that may still be licensable today.",
      "source_ids": [
        "S_BIS_ADV_GUIDANCE_26",
        "S_BIS_ADV_H200_26",
        "S_BIS_EAR740_20260817",
        "S_BIS_EAR748_20260817"
      ],
      "unknowns": [
        "The ECCN and licence treatment of each named company product is UNKNOWN.",
        "Actual approvals, denials, volumes, installed-base continuity, and commercial terms are UNKNOWN."
      ],
      "resolution_evidence": [
        "Product-level classification and licence records.",
        "Current company disclosures that name the shipped product, customer, jurisdiction, and timing."
      ]
    },
    {
      "id": "eda-equipment",
      "sequence": 2,
      "label_zh": "EDA / 半导体设备",
      "label_en": "EDA and fab equipment",
      "scenario_id": "eda-support",
      "policy_ids": [
        "P_US_SEMI",
        "P_NL_SEMI"
      ],
      "jurisdiction": "United States + Netherlands",
      "evidence_status": "CONFIRMED",
      "decision_status": "PASS",
      "review_disposition": "RETAIN_BASELINE",
      "change_class": "NO_POLICY_REVERSAL_IDENTIFIED",
      "frozen_claim": "U.S. controls cover advanced-node equipment, HBM, and specified ECAD/TCAD tools; Dutch measures require authorisation for selected advanced manufacturing equipment.",
      "official_read": "Current EAR text continues advanced-node manufacturing and ECAD/TCAD end-use controls. The Dutch national measure remains an authorisation regime decided case by case for exports outside the EU; it is not described as an export ban.",
      "why_it_matters": "The EDA shock should continue to model a hypothetical loss of updates and support on top of existing licensing and end-use controls.",
      "source_ids": [
        "S_BIS_SEMI",
        "S_NL_EXPORT",
        "S_BIS_EAR744_20260817"
      ],
      "unknowns": [
        "Vendor-by-vendor licence outcomes and support entitlements are UNKNOWN.",
        "Current tool versions, process coverage, installed-base service access, and revenue exposure are UNKNOWN."
      ],
      "resolution_evidence": [
        "Licence decisions or official advisory opinions tied to a named item and end user.",
        "Current vendor or foundry disclosures naming tool, node, version, and support status."
      ]
    },
    {
      "id": "connected-vehicles",
      "sequence": 3,
      "label_zh": "智能汽车",
      "label_en": "Connected vehicles",
      "scenario_id": "connected-vehicle",
      "policy_ids": [
        "P_US_CV"
      ],
      "jurisdiction": "United States",
      "evidence_status": "CONFIRMED",
      "decision_status": "PASS",
      "review_disposition": "RETAIN_WITH_CLARIFICATION",
      "change_class": "PRE_FREEZE_SCOPE_CLARIFICATION",
      "frozen_claim": "The U.S. final rule phases restrictions on covered VCS and ADS hardware and software with a sufficient China or Russia nexus by model year.",
      "official_read": "The final-rule baseline still stands, but the frozen summary omitted June 18 general authorisations. Eligible actors can use limited-use pathways or an approved-supplier registry; entities owned by, controlled by, or subject to China or Russia are excluded from those general authorisations.",
      "why_it_matters": "The simulator remains a broader software-support fracture than the live U.S. import-and-sale rule, and the new website now makes that difference explicit.",
      "source_ids": [
        "S_BIS_CONNECTED",
        "S_BIS_CV_GUIDE_26",
        "S_BIS_CV_GA3_20260618"
      ],
      "unknowns": [
        "Whether a named component is covered software or VCS hardware is UNKNOWN without item-level facts.",
        "Registry inclusion, mitigation conditions, model-year treatment, and specific authorisations are UNKNOWN for every mapped company."
      ],
      "resolution_evidence": [
        "Approved Supplier Registry entries or specific-authorisation decisions.",
        "Vehicle-level declarations identifying supplier, component, model year, and jurisdictional nexus."
      ]
    },
    {
      "id": "cross-border-data",
      "sequence": 4,
      "label_zh": "跨境数据",
      "label_en": "Cross-border data",
      "scenario_id": "cross-border-data",
      "policy_ids": [
        "P_CN_DATA"
      ],
      "jurisdiction": "China",
      "evidence_status": "CONFIRMED",
      "decision_status": "PASS",
      "review_disposition": "RETAIN_WITH_CLARIFICATION",
      "change_class": "PRE_FREEZE_SCOPE_CLARIFICATION",
      "frozen_claim": "Important-data and large-scale personal-information exports can require assessment or certification; thresholds, exemptions, consent, and impact assessment matter.",
      "official_read": "The certification route applies to non-CIIO handlers exporting at least 100,000 but fewer than 1 million people’s non-sensitive personal information, or fewer than 10,000 people’s sensitive information, excluding important data. A July 24 Q&A adds separate-consent, necessity, and assessment-extension detail.",
      "why_it_matters": "A cloud or collaboration edge is only a possible data-governance exposure. It is not proof that regulated personal information or important data crosses a border.",
      "source_ids": [
        "S_CN_DATA",
        "S_CN_DATA_CERT_26",
        "S_CN_DATA_QA_20260724"
      ],
      "unknowns": [
        "The data type, volume, sensitivity, location, and legal transfer path for each company edge are UNKNOWN.",
        "Whether an exemption, standard contract, certification, or security assessment applies is UNKNOWN."
      ],
      "resolution_evidence": [
        "A company data-flow inventory with classification, volumes, recipients, and storage locations.",
        "The applicable contract, certification, assessment, or exemption record."
      ]
    },
    {
      "id": "critical-materials",
      "sequence": 5,
      "label_zh": "关键材料",
      "label_en": "Critical materials",
      "scenario_id": "critical-materials",
      "policy_ids": [
        "P_CN_MATERIALS"
      ],
      "jurisdiction": "China",
      "evidence_status": "CONFIRMED",
      "decision_status": "PASS",
      "review_disposition": "RETAIN_WITH_CLARIFICATION",
      "change_class": "PRE_FREEZE_SCOPE_CLARIFICATION",
      "frozen_claim": "Graphite, gallium, and germanium exports are controlled, and the December 2024 measure tightened destination-specific treatment for the United States.",
      "official_read": "The U.S.-specific rule says gallium, germanium, antimony, and superhard-material dual-use exports will in principle not be licensed, while graphite faces stricter end-user and end-use review. A 2026 enforcement case confirms licence-first treatment and gives product thresholds for synthetic graphite.",
      "why_it_matters": "The scenario is still a stress case. The evidence graph observes only CATL to Tesla as a broad materials-sensitive edge and contains no verified gallium-material company edge.",
      "source_ids": [
        "S_CN_MATERIALS",
        "S_CN_MATERIALS_US_24",
        "S_CN_GRAPHITE_CASE_202605"
      ],
      "unknowns": [
        "Product-level classification, origin, purity, strength, density, destination, and licence outcome are UNKNOWN.",
        "Company-level gallium, germanium, graphite, refining, recycling, and inventory dependencies are mostly UNOBSERVED."
      ],
      "resolution_evidence": [
        "Bills of material and supplier declarations tied to controlled technical parameters.",
        "Licence records, end-user statements, inventory disclosures, and verified refiner or recycler relationships."
      ]
    }
  ]
};
