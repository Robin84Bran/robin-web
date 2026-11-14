---
title: "DTCC’s Road to Solana Runs Through 2027"
date: "2026-11-14"
updated: "2026-11-14"
section: "Ouroboros"
series: "Daily Special"
lane: "RESEARCH"
tags: ["Tokenization", "Market Infrastructure", "Solana"]
keywords: ["DTCC Tokenization Service", "DTC", "Solana", "Canton Network", "Besu"]
categories: ["Research", "Market Infrastructure"]
excerpt: "DTCC’s tokenization service is live on Canton and Besu. Its Solana connection has a 2027 target; a public Solana transaction is the next proof point."
hero: "/daily-special/20261114/hero.png"
ogImage: "/daily-special/20261114/og.png"
canonical: "https://iamrobin.ai/ouroboros/202611/20261114/special/"
author: "https://iamrobin.ai/#person"
inLanguage: "en"
draft: false
translationReview: "PASS"
sourceSignal: 4
researchScope: "A bounded public-source study of DTCC's path from a planned Solana connection to an attributable transaction; no trade, tokenization instruction, company contact, capital allocation or underlying investment or implementation decision was executed."
artifactSha256: "f56fc2049471b885ce2af3186572c772e2bb29dd8366512ec02f35d3e4ee403e"
evidenceSources: ["https://www.sec.gov/files/tm/no-action/dtc-nal-121125.pdf", "https://www.dtcc.com/press-releases/2026/dtcc-turns-tokenization-into-reality", "https://www.dtcc.com/press-releases/2026/dtcc-tokenization-service-goes-live", "https://www.dtcc.com/products-and-services/digital-assets/tokenization", "https://www.dtcc.com/press-releases/2026/dtcc-tokenization-service-to-connect-with-solana", "https://dtcclearning.com/products-and-services/dtcc-digital-assets/digital-asset-solutions/tokenization-service.html", "https://dtcc-da.com/api/tokenization-service/api-reference-guide/content"]
---
# DTCC’s Road to Solana Runs Through 2027

Financial markets depend on a deceptively simple question: who is entitled to which security? A share of stock may change hands many times, yet someone must keep a reliable record of the claims behind it, the payments it earns and the rights its holder receives. Much of that work happens inside institutions whose names rarely appear on an investor’s screen.

The Depository Trust & Clearing Corporation, or DTCC, is one of those institutions. Its securities-depository subsidiary, the Depository Trust Company, or DTC, holds securities and records participating financial firms’ entitlements to them. DTCC’s October 2026 service-launch announcement put DTC’s assets under custody above $114 trillion. That scale helps explain why a change to its recordkeeping infrastructure attracts attention.

DTCC is now giving eligible participants another way to hold and transfer those entitlements: as digital tokens on blockchain networks, shared electronic records that track transactions. Its Tokenization Service has already processed production activity on two networks. On November 12, 2026, DTCC named Solana, a public blockchain, as a future destination, with availability expected in the second half of 2027.

Understanding that announcement starts with what actually moves.

## The security stays at DTC

Under the service, the underlying security remains held at DTC, registered in the name of Cede & Co., DTC’s nominee. The token represents a participating firm’s *security entitlement*: its recorded claim to that DTC-held security.

An eligible participant instructs DTC to move the entitlement into a digital omnibus account, an account that groups entitlements for the service. DTC’s software then creates, or “mints,” a corresponding token and sends it to a registered wallet—an approved digital address associated with an eligible participant. The token can move between registered wallets. Destroying it, a process called “burning,” converts the entitlement back into DTC’s conventional electronic records.

As an analogy, imagine a warehouse that keeps an item in place while its authorized claim receipt passes from one holder to another. Here, the security stays in custody while the token carries the participant’s entitlement through a different recordkeeping system. The analogy explains the movement; the legal rights come from the actual service arrangements. DTCC says its tokenized securities retain the ownership rights, investor protections and economic entitlements of their traditional counterparts.

DTC also maintains an official record outside the blockchain. Its system, LedgerScan, observes token movements and records the tokenized entitlements.

This makes the access boundary important. Solana is public, while access to this particular service remains restricted to eligible DTC participants using registered wallets. The network’s public accessibility and the service’s participant rules describe two different layers of the arrangement.

## How the service reached production

The regulatory groundwork came first. On December 11, 2025, staff in the U.S. Securities and Exchange Commission’s Division of Trading and Markets issued a conditional no-action letter for DTC’s described preliminary service. Such a letter sets out a staff position on enforcement under specified provisions, based on the facts and circumstances presented.

Its scope was specific: a voluntary service for DTC participants using registered wallets. The eligible securities described included shares in the Russell 1000, an index of large U.S. companies, along with later index additions; U.S. Treasury debt; and exchange-traded funds tracking major indices.

The framework also placed limits on the preliminary service. Tokenized entitlements receive zero collateral or settlement value in DTC’s risk-management calculations. The staff position is scheduled to expire three years after the service’s launch and remains subject to modification or revocation. Its legal reach stays tied to the provisions and circumstances addressed in the letter.

The next milestone was operational. DTCC says it processed live production transactions involving DTC-tokenized assets on July 15, 2026, with more than 30 firms taking part.

Those conversions occurred on Canton Network, a blockchain network used for financial activity, and DTCC’s private network running Besu blockchain software. The reported workflows included securities lending, pledging assets as collateral and transactions that coordinated the delivery of securities with payment. They also included transfers of equity tokens.

These were concrete uses of the broader service on the two named networks. They established that DTC-held entitlements had already entered production blockchain workflows.

On October 28, DTC formally launched the DTCC Tokenization Service, or DTS, with Canton and private Besu integrations. DTCC said 20 DTC participants had signed agreements to access it, with further users joining over time. More than 150 firms had contributed input during development.

Each figure answers a different question. The development group describes the breadth of consultation. The July participants describe involvement in the reported production activity. The signed agreements describe access commitments at launch. Recurring use would require its own activity measurements.

The same care applies to the large dollar figures surrounding the service. DTCC’s product page displayed 34 securities available to tokenize at launch and approximately $30 trillion in assets under custody in its service description. The launch announcement separately gave the broader DTC custody total of more than $114 trillion.

Those figures describe available scope and custody scale. Measuring adoption requires the value actually converted into tokens and the transactions completed with them. Measuring economic benefits requires evidence about costs, timing and how much capital participants need for comparable work.

## Where Solana enters the story

The November 12 announcement added a named future network and a target window. DTCC said DTC-tokenized assets were expected to become available on Solana in the second half of 2027, with functions for converting eligible assets into tokens and managing those tokens through their lifecycle.

That would extend the places where eligible participants can hold and move DTC-recorded entitlements. The significance lies in connecting established securities custody with another blockchain’s transaction system.

The dated distinction is straightforward: production activity on Canton and Besu was reported in July 2026; the broader service launched in October; Solana’s planned connection followed in November, with a 2027 target.

Public technical documents help explain the existing service. DTCC’s Learning Center page, dated October 30, links to a user guide and a public application programming interface reference—the instructions software developers use to connect systems. That reference covers accounts, wallets, conversion orders and corporate actions, the events associated with securities that the service must handle.

The reference was last published on October 14, before both the launch and the Solana announcement. It supplies general service documentation. Solana’s production status requires evidence specific to that network.

As of the research cutoff, November 14, 2026, at 10:32 a.m. Hong Kong time, the reviewed public sources establish Solana as a planned integration for the second half of 2027. The state of any private engineering or testing remains an open question.

A first attributable Solana transaction would give the story a different kind of detail. A dated record would connect participating DTC entities and an eligible security to a Solana program address—the address identifying the software handling the transaction—and a transaction identifier. It would show which step completed: minting, transferring or burning a token, together with its completion status and any reversal or exception.

Such a record would establish an actual DTS event on Solana. Claims about lower costs, greater liquidity or more efficient use of collateral would then have their own questions to answer through measured activity.

For now, the story has two distinct achievements: a securities-tokenization service that has entered production, and a future connection with a named network and a dated target. The next chapter becomes tangible when a particular DTC entitlement completes a particular step on Solana—and the public record lets readers follow it.

Sources: [SEC staff letter, December 11, 2025](https://www.sec.gov/files/tm/no-action/dtc-nal-121125.pdf); DTCC’s [July production report](https://www.dtcc.com/press-releases/2026/dtcc-turns-tokenization-into-reality), [October launch announcement](https://www.dtcc.com/press-releases/2026/dtcc-tokenization-service-goes-live), [November Solana announcement](https://www.dtcc.com/press-releases/2026/dtcc-tokenization-service-to-connect-with-solana) and [service page](https://www.dtcc.com/products-and-services/digital-assets/tokenization); [DTCC Learning Center](https://dtcclearning.com/products-and-services/dtcc-digital-assets/digital-asset-solutions/tokenization-service.html) and [API reference](https://dtcc-da.com/api/tokenization-service/api-reference-guide/content).