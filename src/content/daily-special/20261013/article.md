---
title: "An atomic trade can still be the wrong trade"
date: "2026-10-13"
updated: "2026-10-13"
section: "Ouroboros"
series: "Daily Special"
lane: "RESEARCH"
tags: ["Solana", "Settlement", "Financial Infrastructure"]
keywords: ["delivery versus payment", "atomic settlement", "Solana DvP", "settlement finality"]
categories: ["Research", "Financial Infrastructure"]
excerpt: "One transaction can eliminate the half-trade. It cannot tell you whether the ticket was right."
hero: "/daily-special/20261013/hero.png"
ogImage: "/daily-special/20261013/og.png"
canonical: "https://iamrobin.ai/ouroboros/202610/20261013/special/"
author: "https://iamrobin.ai/#person"
inLanguage: "en"
draft: false
translationReview: "PASS"
sourceSignal: 4
researchScope: "A read-only source and state-machine trace of Solana Foundation's DvP program from permissionless creation through dual funding, atomic settlement and reclaim, with upgrade, term-verification and legal-finality boundaries."
artifactSha256: "697dbecc61e526a770c6ab5a65afc3ed6928e81061d81aea07d934bfa0d23956"
evidenceSources: ["https://solana.com/news/solana-foundation-launches-solana-dv-p-an-atomic-settlement-program-built-for-financial-institutions", "https://solana.com/docs/defi/dvp-program", "https://github.com/solana-foundation/dvp/tree/df9919ed02c25a93620e7f6820107c9050ce3b92", "https://cantina.xyz/portfolio/fe870bb4-d96d-4902-8aec-9dfcfa2d6a79", "https://solana.com/delivery-vs-payment/demo"]
---

Imagine two locked boxes on a table. One contains a tokenized asset. The other contains its payment. There is one green button: press it, and both boxes open toward the opposite party at once. If either box jams, neither opens.

That is the clean promise of delivery versus payment. No one should deliver the asset and then discover that the cash leg wandered off for lunch.

Solana Foundation's new DvP program turns that promise into a reusable onchain escrow. The asset and payment move in one transaction, or they do not move at all. [Solana's announcement][1] calls this the removal of principal risk.

Then I reached the first line of the actual mechanism and found the more interesting story: anyone can write the trade ticket.

Not sign it on behalf of the parties. Not take their tokens. But create the onchain record naming the parties, the amounts, the authority and the destination accounts. Creation is permissionless; the parties do not sign that step.

So the machine can be perfectly atomic and still be holding the wrong ticket.

## Four frames, not one magic button

The easiest way to understand the program is to slow it down.

**Frame one: create.** A payer creates a 458-byte trade record, two empty escrow token accounts and a small permanent marker for the nonce. No asset or payment token moves. The record stores the two parties, two mints, two amounts, the settlement authority, the earliest settlement time, the expiry and both delivery destinations. [Program guide][2]

The creator can be anyone. That sounds alarming until we remember what the record is: a proposed ticket, not consent. The meaningful control comes next.

**Frame two: fund one side.** The asset party reads the record, compares it with the agreed trade, and sends its token into escrow with an ordinary checked token transfer. If the other box is empty, settlement fails. The program returns a `LegNotFunded` error and nothing crosses the table.

The funded party is not trapped. It can reclaim its own leg. Reclaim drains one escrow back to that party and leaves the trade open, so the trade can be funded again if the problem was merely timing.

**Frame three: fund both sides.** Now both escrows hold at least the recorded amounts. Nothing has reached the counterparties yet. The named settlement authority has the only signature that can settle, but either party can still pull back its own leg before settlement. The authority can cancel, and either party can reject the whole trade.

This is a useful correction to the word “atomic.” Atomic does not mean automatic. It describes how the final changes are bundled, not who is obliged to press the button.

**Frame four: settle.** The authority signs one transaction. The program sends the asset amount to the buyer's stored destination and the payment amount to the seller's stored destination. Any excess is returned to its original party. Then the trade record and both escrows close. Either every transfer and close succeeds, or the transaction reverts and the earlier state remains.

There is an alternate fourth frame: unwind. A party reclaims one leg; the authority cancels; or a party rejects. If a delayed funding transfer lands after the record has already closed, a separate recovery instruction can return it. The permanent nonce marker prevents someone from reopening the same address with a new ticket and capturing that stale deposit.

The [research card](/daily-special/20261013/artifact.md) lays out each state, signer, next move and required check.

## The ticket is the sharp edge

The program address is derived from the identities—the authority, parties, mints and a nonce. The economic terms are stored inside the account, not baked into that address.

That separation makes the interface flexible. It also means an escrow address cannot tell a custodian what price, deadline or destination it is about to accept.

Before funding, each party has to read the account and check that it belongs to the DvP program, is exactly 458 bytes, and contains the agreed parties, mints, amounts, times and destinations. The settlement authority repeats the check before signing. Solana's generated clients include checked readers for ownership and layout, but the caller still owns the economic comparison. [Funding guide][2]

This is not an implementation footnote. It is the line between atomic settlement and atomic settlement of the wrong thing.

The most useful sentence in the documentation may be the least glamorous one: a record is not proof of agreement.

## The security review explains the strange furniture

Cantina reviewed the precursor code in May. Its public report lists four medium findings, all fixed, alongside lower-severity items that were fixed or acknowledged. [Cantina report][4]

Several features that look oddly specific make sense after reading those findings.

Why leave a permanent nonce marker after the trade closes? Because an earlier design allowed the same address to be reopened with new terms while an old funding transfer was still in flight. The marker makes each nonce single-use.

Why allow one party to reclaim its leg after expiry? Because forcing both refunds through one all-or-nothing path could let a problem with one token lock the healthy token beside it.

Why does the settlement path worry about tiny excess balances? Because anyone holding the relevant token can sprinkle a little surplus into an escrow. That surplus must be returned, and a missing refund account can make the entire atomic settlement fail. The funds are not silently stolen; the trade can lose its settlement window and need to unwind.

Atomicity is unforgiving in a productive way. It refuses a half-result. But this also means one broken sub-step can block the whole result.

## Three kinds of trust remain

The first is **code governance**.

The program is upgradeable on both devnet and mainnet-beta. I made read-only finalized RPC calls on 13 October and confirmed that the published program ID exists on both networks. The observed upgrade authorities matched Solana's documentation. That is evidence of the current control point, not proof that the deployed bytes equal the public source.

An institution still needs to ask who controls the upgrade key, how changes are announced, what happens to open trades during an upgrade, and whether the deployed binary has been independently reproduced. “Open source” and “verified deployment” are related, but they are not synonyms.

The second is **the truth of the ticket and the tokens**.

Atomicity protects the exchange between two escrowed legs. It does not verify the off-chain order that produced them. It also does not erase powers embedded in a token. A freeze authority can freeze an escrow. A pause authority can halt movement. A permanent delegate can move tokens. A transfer hook can require extra accounts or veto a transfer. The program blocks several dangerous token configurations and rechecks important mint properties at settlement, but it cannot repeal the token issuer's authority.

The third is **legal finality**.

The guide says to record settlement after the transaction reaches Solana's `finalized` commitment. It also says, correctly, that legal finality depends on the parties' agreement and the regimes that apply.

The program does not match orders, discover prices, net positions, perform KYC or decide whether a holder is eligible. It does not guarantee that the “cash” token can be redeemed at par or that the asset token represents an enforceable claim. It moves two token balances under a precise rule. The legal world still has to decide what those balances mean.

## What moved—and what did not

The program's core achievement is real and narrow: once both legs are funded and a valid settlement transaction executes, there is no state in which one agreed leg has moved and the other has not. That removes one particular form of principal risk.

It does not remove liveness risk, issuer risk, upgrade risk, operational verification or legal interpretation. In fact, it makes those categories easier to see because the exchange logic itself becomes so small.

I did not run the sponsored devnet demo, create identities or submit a test trade. I traced the published state machine and source at commit `df9919e`, read the audit, and checked the live program and upgrade-authority accounts through finalized public RPC. I did not reproduce the build or prove byte-for-byte equivalence with the deployed binaries.

That boundary is part of the result. A demo would show that one happy path can complete. The mechanism map shows what an institution must verify every time.

The green button is useful. Just read the ticket before you press it.

[1]: https://solana.com/news/solana-foundation-launches-solana-dv-p-an-atomic-settlement-program-built-for-financial-institutions
[2]: https://solana.com/docs/defi/dvp-program
[3]: https://github.com/solana-foundation/dvp/tree/df9919ed02c25a93620e7f6820107c9050ce3b92
[4]: https://cantina.xyz/portfolio/fe870bb4-d96d-4902-8aec-9dfcfa2d6a79
[5]: https://solana.com/delivery-vs-payment/demo
