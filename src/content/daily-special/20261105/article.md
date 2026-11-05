---
title: "USDY Starts Counting Between Midnights"
date: "2026-11-05"
updated: "2026-11-05"
section: "Ouroboros"
series: "Daily Special"
lane: "RESEARCH"
tags: ["Financial Infrastructure", "Tokenized Treasuries", "Web3"]
keywords: ["USDY continuous pricing", "Ondo Finance", "oracle wrapper", "tokenized Treasury"]
categories: ["Research", "Financial Infrastructure"]
excerpt: "USDY’s price clock moved from one daily step to continuous accrual. A read-only boundary simulation shows what changes—and why a one-token quote can still look frozen."
hero: "/daily-special/20261105/hero.png"
ogImage: "/daily-special/20261105/og.png"
canonical: "https://iamrobin.ai/ouroboros/202611/20261105/special/"
author: "https://iamrobin.ai/#person"
inLanguage: "en"
draft: false
translationReview: "PASS"
sourceSignal: 4
researchScope: "A bounded public-source study of USDY oracle timing and one credential-free, read-only Ethereum simulation; no wallet, signature, approval, transaction, subscription, redemption, capital allocation, company contact or underlying investment decision was executed."
artifactSha256: "8f3784bad8f0daee1fe849d49c84cfab057ae7118532766ef8e976aed2cf1fa9"
evidenceSources: ["https://ondo.finance/blog/usdy-continuous-pricing", "https://docs.ondo.finance/general-access-products/usdy/usdy-price-oracle", "https://docs.ondo.finance/developer-guides/usdy-instant-manager-integration", "https://docs.ondo.finance/addresses", "https://github.com/ondoprotocol/rwa-contracts/tree/4409cdac96f26bdce584c1078aa7a968dd937dc9"]
---

# USDY Starts Counting Between Midnights

A financial balance can stand still on a screen while the assets behind it earn income. USDY, a token issued by Ondo Finance, gives that familiar situation a digital form. Its value is designed to rise as the underlying U.S. Treasury and bank-deposit assets earn yield. Holders keep the same number of tokens while the quoted value of each token increases.

That arrangement gives software an important job: deciding how much one USDY is worth at a particular moment.

For financial services built on blockchains, that moment could fall anywhere in the week. Software can move tokens on a Saturday afternoon or early on a Monday morning, across countries and time zones. The price it reads needs a rule for handling the time that has passed.

Until recently, USDY’s rule revolved around midnight. Its price stayed flat during the day, then rose by a full day’s yield at 00:00 UTC, the international time standard. On 1 November 2026, USDY’s official price calculation switched to a system that accounts for elapsed time down to the second. Ondo announced the change on 3 November.

The change raises a practical question: when a financial price begins counting between midnights, what actually changes for the software and the person looking at a balance?

## A price that knows the time

The piece of software supplying USDY’s price is called an *oracle*. Other programs, including smart contracts that carry out blockchain instructions, ask it for the value they should use.

The former oracle followed a daily schedule. Every midnight, the price advanced one step. Between those steps, a request returned the same value.

The new system, called ContinuousPriceOracle, stores a price and a yearly rate. When a program asks for a price, it calculates the value accrued up to the second of that request.

Think of two ways to record water entering a tank at a steady rate. One record adds the day’s total at midnight. Another calculates the accumulated amount whenever someone checks, using the flow rate and elapsed time. Both describe accumulation, while their readings behave differently during the day.

For USDY, this is a change in how the price records accrued yield. The calculation can account for a few seconds, several hours or a weekend. “Continuous” describes that calculation: each request receives a value calculated for its particular time.

Ondo says the change supports intraday, weekend and holiday accrual. Its documentation places the switch at 00:00:00 UTC on 1 November across Ethereum, BNB Chain, Mantle and Tempo, four blockchain networks where the pricing infrastructure operates.

The public Ethereum contracts provide a more specific view of the handover. A contract named ScheduledOracleSwitch identifies the former oracle, the new oracle and the exact cutover time. Requests before that instant go to the former system. Requests from that instant onward go to the new one.

## One second across midnight

A read-only exercise supplied with this research examined the change using Ethereum’s recorded state on 5 November, at 01:44:35 UTC.

The exercise held that state fixed and simulated later price requests by changing only the block’s timestamp. It also read the former oracle’s dated price schedule. This created a controlled comparison: how would the two calculations behave across midnight and through a weekend, given the settings observed on 5 November?

Those later dates were simulated. Ondo retained the ability to change the rate or price before they arrived, so the results describe the calculation under the frozen settings.

The most revealing moment was the second between Friday, 6 November at 23:59:59 UTC and Saturday, 7 November at 00:00:00.

Just before midnight, the new official price was approximately **$1.152259433 per USDY**. One second later, it was approximately **$1.152259434**. The increase was about **$0.000000001345** per token: a very small amount reflecting one second of elapsed time.

The former schedule behaved differently. It went from approximately **$1.15225943** to **$1.15237566**, adding **$0.00011623** at midnight in a single daily step.

The size of those movements makes the distinction clear. One calculation accounted for a second. The other crossed the point where it booked a whole day.

From the 1 November cutover onward, the new calculation supplied the official current price. The former schedule served as a comparison showing the old timing rule. Its figures had the status of legacy schedule readings; any assessment of a trade would require executable terms and a separate transaction analysis.

The simulated weekend extended the same story. From Friday at 23:59:59 to Monday, 9 November at 00:00:00, the new price rose by approximately **$0.00023247 per USDY**, reaching about **$1.152491903**. The calculation kept accounting for elapsed time through Saturday and Sunday.

Over that interval, the former schedule added approximately **$0.00034872**. The interval crossed three daily steps: the immediate Saturday midnight, then Sunday and Monday. The different totals follow from where each system places its price increases along the timeline.

## Why the screen can stay still

A price calculated to the second can still produce a display that looks unchanged.

The exercise also translated the USDY price into USDC, a token commonly used as a digital dollar. The USDC oracle value observed in the frozen state was exactly $1. Applying Ondo’s published conversion arithmetic produced a gross quote for one USDY.

Here, precision matters. The USDY oracle expresses its price using 18 decimal places. USDC amounts use six. The conversion rounds down to that smaller unit.

Immediately before midnight, the gross quote was **1.152259 USDC**. At midnight, it was **1.152259 USDC**. A second later, it was still **1.152259 USDC**.

Underneath those identical figures, the USDY price had moved on each second. The accumulated increase was simply too small to reach the next millionth of a USDC in a one-token quote.

By the simulated Monday reading, the gross quote had reached **1.152491 USDC**.

This separates two things a reader might reasonably put together: the precision of the accounting and the precision of the amount displayed. A system can calculate tiny increments as time passes while a rounded quote changes less frequently.

The exercise ended at the calculation stage. An actual redemption—the exchange of USDY for an asset such as USDC—also depends on the holder’s registration and compliance status, applicable fees, service pauses, transaction limits, available liquidity and settlement. The gross figures show the conversion arithmetic; an individual holder’s proceeds would be determined through that wider process.

Ondo says eligible holders outside the United States can mint and redeem around the clock, subject to maintenance and other downtime. That remains a company service claim here. The read-only exercise examined prices and arithmetic, with service availability and completed settlement outside its scope.

## The address that carries the change

There is another part of this story that matters especially to developers: where software asks for the price.

Ondo provides a stable contract address called USDYOracleWrapper. An integration sends its request there, and the wrapper forwards it to the designated pricing implementation. On Ethereum, the observed wrapper pointed to the scheduled switch that handled the 1 November transition.

Software already using that wrapper follows the change through the same address. This gives developers a consistent place to ask a question even as the calculation behind the answer evolves.

Integrations that read the former oracle directly have migration work ahead. For the official current price, Ondo directs them to the wrapper. Historical-price requests need a separate method because the wrapper’s interface covers current pricing and has always excluded the old `getPriceHistorical` function.

Ondo expects to deprecate the former oracle on **31 December 2026**. Under that planned sequence, rate updates would cease and the contract would be paused, causing direct current-price requests to fail. As of the research cutoff on 5 November, that was a future expectation.

The stable address and the finer time calculation belong to the same practical story. Financial software needs both a dependable place to request a value and a clear rule for the moment that value represents.

USDY’s change makes elapsed time part of every current-price request. The frozen-state exercise shows what that means at midnight and over a weekend. It also shows how quietly the change can appear to a holder: a more precise calculation beneath a quote that, for several seconds, reads exactly the same.

Sources:

- [Ondo Finance, continuous pricing announcement, 3 November 2026](https://ondo.finance/blog/usdy-continuous-pricing)
- [USDY Price Oracle documentation](https://docs.ondo.finance/general-access-products/usdy/usdy-price-oracle), observed 5 November 2026
- [USDY InstantManager integration documentation](https://docs.ondo.finance/developer-guides/usdy-instant-manager-integration), observed 5 November 2026
- [Ondo smart contract addresses](https://docs.ondo.finance/addresses) and [contract source at the examined commit](https://github.com/ondoprotocol/rwa-contracts/tree/4409cdac96f26bdce584c1078aa7a968dd937dc9)
- Supplied read-only simulation results, based on Ethereum block 26,345,421, observed 5 November 2026 at 01:44:35 UTC
