---
title: "Who Borrowed Against Friday’s Price?"
date: 2026-11-23
updated: 2026-11-23
section: Ouroboros
series: Daily Action Item
hero: /action-item/20261123/hero.webp
ogImage: /action-item/20261123/og.webp
ledgerId: AAVE-WEEKEND-PRICE-CLOCK-20261123
draft: false
categories:
  - DeFi
  - Autonomous Systems
  - Product Design
tags:
  - Aave V4
  - tokenized stocks
  - oracle prices
  - Base
keywords:
  - stock backed loans
  - weekend oracle prices
  - Aave Equities Hub
  - autonomous finance
author: https://iamrobin.ai/#person
sourceAction: "2026-11-23 Daily Briefing, item 5"
visualHeadline: "Two clocks. One loan market."
visualSubhead: "PRICE HELD · ACTION OPEN · RECEIPT VISIBLE"
visualFooter: "What should a 24/7 market show?"
visualNodes: "MARKET CLOCK|ORACLE|POSITION|BORROW|RECEIPT"
thesis: "A 24/7 lending system needs to make a paused reference-price clock visible before a person or agent acts."
excerpt: "Base remained open while its stock reference prices held Friday’s close. A frozen event log shows what positions did, and what the chain cannot tell us."
canonical: "https://iamrobin.ai/ouroboros/202611/20261123/action_item/"
inLanguage: en
---

# Who Borrowed Against Friday’s Price?

A stock can help secure a loan even while its price feed is taking the weekend off. On a blockchain, the lending software can keep accepting transactions around the clock. The stock prices it uses follow a different schedule.

That meeting of two clocks is part of the story of Aave V4’s Equities Hub on Base. Aave is a lending protocol: software that lets participants supply assets and borrow against collateral. Base is the blockchain that records those actions. The Equities Hub supports loans backed by eligible tokenized stocks—digital assets tied to stocks and recorded on a blockchain. Collateral is the asset pledged to help secure repayment.

The borrowed asset in this market is USDC, a digital token designed to track the US dollar. A lending pool makes assets available for loans, while the system’s rules govern how much a position can borrow against its collateral.

To apply those rules, the software needs a reference value for the stocks. Chainlink supplies that information through an *oracle price feed*, a service that brings outside price information onto the blockchain.

Here, the calendar matters. Chainlink’s 24/5 US equities feed operates from Sunday at 8 p.m. Eastern Time through Friday at 8 p.m. During the weekend closure, its on-chain reading holds the last available price. This is the disclosed operating schedule. Blockchain transactions can continue throughout that pause.

**An everyday illustration:** Imagine a pawnshop that stays open over the weekend while its price labels remain fixed at Friday evening values until Sunday evening. The shop can keep making loans, enforce conservative borrowing limits and tell visitors when the labels will update. A visitor sees both an available service and a valuation attached to an earlier time. This imaginary shop illustrates the timing problem; the actual evidence comes from blockchain records.

During the weekend of November 20–22, 2026, those records show borrowing and repayment continuing through the period when the reference price was held.

## A weekend recorded in transactions

Reading the records takes one more distinction. A *position address* is a pseudonymous identifier for an on-chain lending position. It lets an observer follow activity associated with that position. Human identity is a separate question requiring separate evidence.

A *borrow event* is a record emitted by the lending contract when a borrowing action occurs. A *repay event* records a payment toward debt. Together, these events reveal amounts, positions and timing. A complete account of a position’s finances also requires its balances and other state.

The supplied capture examined one specific contract: the Base MAG7 Spoke, identified in Aave’s official address book as [`0x17905Db0e4A3514467539956c084180616AE7B8D`](https://basescan.org/address/0x17905Db0e4A3514467539956c084180616AE7B8D). The findings apply to that contract during one fixed weekend window.

The window began on Friday, November 20, at 8 p.m. Eastern Time. In Coordinated Universal Time, or UTC, that was November 21 at 01:00. It ended just before Sunday, November 22, at 8 p.m. Eastern, equivalent to November 23 at 01:00 UTC.

Nine seconds after the window began, the contract recorded a [10,000 USDC borrow event](https://basescan.org/tx/0xbfacd70849d01380a212514f8042fb818677bd7a7fd3ad3b866412ac3caace06) for position `0xcbcf8fef0896add2e0f95980253ecf9be88fed8c`.

That precise timing catches the eye. Its evidentiary meaning is equally precise: the action landed nine seconds into the observed period. The reason for choosing that moment remains an open question.

Activity continued in amounts ranging from fractions of a USDC to thousands. One position, `0x5771e9cd1f225ebde88d4815587c38899604ac2a`, appeared repeatedly during the first several hours. It recorded a 10,000 USDC borrow at 03:21:47 UTC on November 21, followed by several further borrow events. At 05:30:04 UTC, the same position recorded a [33,291.1560 USDC repayment](https://basescan.org/tx/0xb664f561a3a670c133b9a8fdc6ddd5a53234cf7fec4dd9da40f54c91b23722e0). Further repayments and borrowing followed that day.

This sequence gives the weekend a more useful shape than a simple tally of loans. Positions could appear on both sides of the activity, borrowing and repaying within the same observation period. Each event captured one action in an ongoing financial history.

On November 22 at 09:11:34 UTC, the position responsible for the opening 10,000 USDC borrow recorded a [9,999.8037 USDC repayment](https://basescan.org/tx/0x8115e6acac3d9881f7b1fefd195f99d42fae2978a35189fd15d509febdc08a9b). Establishing its remaining debt would require the position’s balance and interest accounting.

Later that Sunday, another position, `0x9a303000248c645ac7ea3d9434271086896aa646`, recorded three borrows: 11,000 USDC at 11:23:22 UTC, 12,000 at 11:44:45 and 5,000 at 12:09:29. A repayment of 1,437.6593 USDC followed at 14:17:11.

The final borrow in the capture landed at 00:53:01 UTC on November 23: 500 USDC, six minutes and 59 seconds before the scheduled reopening boundary.

Across the full window, the capture reported **88 borrow events across 51 distinct position addresses**, totaling **166,473.0636 USDC**. It also reported **42 repay events across 31 distinct position addresses**, totaling **107,668.9025 USDC**.

Subtracting those repayment flows from the borrowing flows gives **58,804.1611 USDC**. That figure measures the difference between two totals of recorded events. The change in total outstanding debt is a separate calculation, incorporating interest accounting, prior balances and other relevant state. The address counts likewise describe positions; a count of people would require verified identity information.

## Making the price’s age visible

The weekend’s central feature is straightforward: lending actions continued while the reference price remained at its last available reading.

That arrangement raises a practical question. What should a borrower—or software acting for one—see before committing to a transaction?

A displayed collateral value can look current simply because it appears on a live screen. The interface may be updating balances and accepting actions while the stock reference price follows its weekend schedule. Both things can be true at once. Making the time attached to that price visible helps a participant understand the terms under which the system is operating.

The evidence supports a modest design possibility: show that the reference price is being held, give the next scheduled refresh time, and display the borrowing limit that currently applies. A transaction receipt can preserve the action and its timing. For an autonomous agent, software that can act on a user’s behalf, the same information could be available in a form it can read before submitting a transaction.

These are proposals prompted by the difference between the two clocks. Evaluating their effect would require observing how people and agents use them. The captured events themselves establish activity during the scheduled pause; conclusions about intent or abuse require additional evidence.

So who borrowed against Friday’s price? At the level the public records support, the answer is 51 distinct position addresses in this contract’s captured borrow events. The people behind those positions and their reasons remain open questions.

The chain gives each action a time. How should a lending system that runs all weekend make the time attached to its price equally clear before a person or an agent acts?

**Sources**

- [Aave’s tokenized stocks explanation](https://aave.com/blog/coinbase-tokenized-stocks).
- [Aave V4 on Base governance proposal](https://governance.aave.com/t/arfc-deploy-aave-v4-on-base/25427), describing the proposed deployment.
- [Aave’s official Base address book](https://github.com/bgd-labs/aave-address-book/blob/main/src/AaveV4Base.sol), identifying the MAG7 Spoke.
- Supplied Base event capture for blocks **60162122–61026121**, with selected public transaction records linked above. Block **61026122** marks the first block at or after reopening. Evidence receipt hash, calculated before the hash field was appended: `a9ffb62102154b32c3414ed03a4894d7655190c6979c2b691d8da2aba31fbdf0`.
