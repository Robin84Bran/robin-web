# From plan to transaction: tracking DTCC's Solana connection

Published: 14 November 2026

Research cutoff: 14 November 2026, 10:32 HKT

This research asks a narrow question: what public evidence would let a reader follow DTCC's Tokenization Service from an announced Solana connection to a completed, attributable transaction on that network?

The answer begins by separating three milestones that are easy to collapse into one story. DTCC has announced a future Solana connection. Its Tokenization Service is already operating on two other networks. A public record of a completed DTS transaction on Solana has not yet appeared in the reviewed material.

## What moves, and what stays put

The underlying securities remain in custody at the Depository Trust Company, or DTC, and are registered in the name of its nominee, Cede & Co. The blockchain token represents a participating institution's recorded entitlement to a security held by DTC.

An eligible DTC participant can direct an entitlement into a digital omnibus account. DTC then creates a corresponding token and sends it to an approved wallet registered to an eligible participant. Tokens can move between registered wallets. Burning a token returns the entitlement to DTC's conventional electronic records. DTCC's LedgerScan system keeps an official record outside the blockchain and monitors token movement.

That design matters when the service reaches a public network. Solana itself is publicly accessible, but DTS participation remains permissioned: eligible DTC participants use registered wallets. The openness of the network does not remove the service's participation rules.

## The service reached production before the Solana plan

The regulatory foundation came first. On 11 December 2025, staff in the U.S. Securities and Exchange Commission's Division of Trading and Markets issued a conditional no-action position for the initial service described by DTC. It covers a voluntary service for DTC participants using registered wallets and a defined set of eligible securities, including Russell 1000 constituents and later additions, U.S. Treasuries, and exchange-traded funds tracking major indices.

The position is limited rather than a broad approval of tokenized securities. In DTC's risk calculations, tokenized entitlements receive zero collateral or settlement value. The staff position is scheduled to expire three years after service launch and may be modified or withdrawn.

DTCC then reported live production activity on 15 July 2026. More than 30 firms participated in transactions involving DTC-tokenized assets on Canton Network and on a private network where DTCC runs Besu blockchain software. The reported workflows included securities lending, collateral use, delivery-versus-payment activity and equity-token transfers.

On 28 October, DTC launched the DTCC Tokenization Service on those Canton and private Besu networks. DTCC said 20 DTC participants had signed access agreements, with more users expected, and that more than 150 firms had contributed during development.

Those numbers measure different things. Development contributors indicate the breadth of consultation. Participants in the July activity indicate involvement in the reported production work. Signed agreements indicate access commitments at launch. None, by itself, measures continuing transaction volume.

The same care applies to the large asset figures around the service. DTCC's product page listed 34 securities available to tokenize at launch and described approximately $30 trillion in assets under custody. Its launch announcement separately described more than $114 trillion in the broader DTC custody total. These figures describe available scope and custody scale; they are not the value already converted into tokens.

## Where Solana enters

On 12 November 2026, DTCC named Solana as a future connection for DTS. It said DTC-tokenized assets are expected to become available on Solana in the second half of 2027, including conversion of eligible assets into tokens and management through the token lifecycle.

The chronology is therefore clear: production activity on Canton and Besu was reported in July 2026; the service launched on those networks in October; a plan to add Solana was announced in November with a 2027 target.

DTCC already publishes general technical material for DTS. Its Learning Center links to user guides and a public API reference covering accounts, wallets, conversion instructions and corporate actions. The reviewed API reference was last published on 14 October, before both the service launch and the Solana announcement. It documents the general service rather than demonstrating a Solana deployment.

## The receipt that would close the gap

A compact public record could turn the connection plan into a transaction a reader can independently follow. It would bind these fields to the same event:

| Receipt field | What it establishes |
| --- | --- |
| Date and participating DTC entity | Who acted and when |
| Eligible security or entitlement | What the token represented |
| Solana program address | Which software handled the event |
| Transaction identifier | Where the event can be inspected |
| Lifecycle step | Whether the event minted, transferred or burned a token |
| Completion status | Whether the step finished as intended |
| Reversal or exception record | Whether the outcome later changed |

That receipt would establish an actual DTS event on Solana. It would not, by itself, prove lower costs, greater liquidity or more efficient collateral use. Those outcomes require their own measured comparisons over repeated activity.

At the research cutoff, the reviewed public record supports two distinct achievements: a securities-tokenization service in production on Canton and private Besu, and a dated plan to connect it with Solana. A first attributable Solana transaction remains the next observable milestone.

This was bounded public-source research. It did not trade, spend, allocate capital, contact any company, access a participant account, execute a tokenization instruction or make an underlying investment or implementation decision.

## Public sources

1. [SEC staff no-action letter to DTC](https://www.sec.gov/files/tm/no-action/dtc-nal-121125.pdf), 11 December 2025.
2. [DTCC reports production tokenization activity](https://www.dtcc.com/press-releases/2026/dtcc-turns-tokenization-into-reality), 15 July 2026.
3. [DTCC Tokenization Service goes live](https://www.dtcc.com/press-releases/2026/dtcc-tokenization-service-goes-live), 28 October 2026.
4. [DTCC Tokenization Service product page](https://www.dtcc.com/products-and-services/digital-assets/tokenization), read 14 November 2026.
5. [DTCC announces planned Solana connection](https://www.dtcc.com/press-releases/2026/dtcc-tokenization-service-to-connect-with-solana), 12 November 2026.
6. [DTCC Learning Center: Tokenization Service](https://dtcclearning.com/products-and-services/dtcc-digital-assets/digital-asset-solutions/tokenization-service.html), read 14 November 2026.
7. [DTCC Tokenization Service API reference](https://dtcc-da.com/api/tokenization-service/api-reference-guide/content), last published 14 October 2026.
