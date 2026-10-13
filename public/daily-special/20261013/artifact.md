# An atomic trade can still be the wrong trade

**Daily Special · 13 October 2026 · Signal 4**

## The bounded question

What does Solana Foundation's DvP program actually guarantee as a two-leg trade moves from creation to funding, settlement or reclaim—and which risks remain outside that guarantee?

This is a read-only trace of the published program, documentation, security review and live program accounts. It did not create a wallet, request devnet funds, submit a transaction, move an asset or make an investment or legal decision.

## The mechanism in one sentence

Two parties send different tokens into two program-owned escrow accounts; a named settlement authority can then exchange the agreed amounts in one Solana transaction, so both delivery legs succeed together or neither takes effect.

That atomic final step is narrow and useful. It prevents the asset from reaching one party while the payment fails to reach the other. It does not prove that the stored ticket matches an off-chain agreement, make the authority sign, neutralize the powers attached to either token, or decide when a court or contract treats the trade as legally final.

## Read-only lifecycle trace

| Frame | Onchain state | Who acts | What can happen next | What must be checked |
| --- | --- | --- | --- | --- |
| 1. Create | One 458-byte `SwapDvp` record, two empty escrow token accounts and a permanent nonce tombstone exist. No trade token has moved. | Any rent payer can call `CreateDvp`; neither party nor the settlement authority has to sign creation. | Either leg can be funded, a party can reject, or the authority can cancel. | Program ownership and record length; both parties and mints; authority; amounts; earliest time and expiry; both settlement destinations; token programs; random single-use nonce. |
| 2. One leg funded | One escrow holds its agreed amount; the other remains short. | A party sends an ordinary checked token transfer into its escrow. | `SettleDvp` must fail with `LegNotFunded`. The funded party can reclaim its own leg. | Re-read the stored ticket before funding. Treat a funding transfer as landed only after network finalization. |
| 3. Both legs funded | Both escrow balances meet or exceed the recorded amounts. The two tokens are locked in separate escrow accounts, not yet delivered. | The second party funds; the settlement authority decides whether and when to sign. | The authority can settle within the time window. Either party can still reclaim its own leg; the authority can cancel; either party can reject. | Re-validate the record and both token configurations. Ensure recipient and surplus-refund accounts exist. Check that mint powers or transfer hooks have not made movement impossible. |
| 4A. Settle | In one transaction, the program sends `amount_a` to party B's stored destination and `amount_b` to party A's stored destination, returns any surplus, then closes the trade record and both escrows. The tombstone remains. | Only the stored settlement authority can call `SettleDvp`. | Record settlement after the transaction reaches `finalized`. Late deposits to a recreated escrow use `RecoverDvp`. | Both legs must be funded; the authority, time window, destinations, token ownership, allowed extensions and captured mint authorities must still match. |
| 4B. Reclaim or unwind | `ReclaimDvp` returns one party's own leg and leaves the trade open. `CancelDvp` or `RejectDvp` refunds funded legs and closes the trade. `RecoverDvp` handles a deposit that lands after closure. | A party reclaims or rejects; the authority cancels; the original party recovers a late deposit. | A reclaimed open trade may be funded again. A closed trade cannot reuse the same nonce because the tombstone remains. | Refunds return to the party's associated token account, not necessarily the account that originally funded the escrow. Token-level pause, freeze, hook or delegate powers can still obstruct recovery. |

## Why the record is not consent

`CreateDvp` is permissionless. Only the payer signs. The economic terms are stored inside the record but are not part of its address. Anyone can therefore create a record naming two parties, an authority and arbitrary terms.

The program is designed around this fact, not around the fiction that an address equals an agreement. Its documentation tells each party to read and compare the record before sending tokens, and tells the settlement authority to repeat the check before settling. The checked readers verify that the account belongs to the DvP program, is exactly 458 bytes and sits at the address derived from its own identity fields. The caller must still compare the parties, mints, amounts, dates and destinations with the actual deal.

This is the most important operational reversal in the design: atomicity can make the execution indivisible, but it cannot make the input truthful.

## What the audit changed—and what it left visible

Cantina reviewed the precursor implementation from 21–28 May 2026. Its published report lists four medium findings, all fixed; six low findings, three fixed and three acknowledged; and eleven informational findings, five fixed and six acknowledged.

The fixed medium findings explain several pieces of the current state machine: a permanent nonce tombstone blocks reuse of a closed trade address; a party can reclaim one leg even after expiry; memo-required accounts are supported; and a closed, unfunded mint on one side no longer prevents the other funded side from being returned.

The acknowledged low findings are not an argument that atomic exchange is fake. They show where liveness can still become awkward. An unexpected surplus can require a refund account that does not yet exist. A transfer hook whose required accounts depend on destination or amount can fail on the surplus-refund path. A permissionless creator can squat a predictable nonce, which is why clients need a cryptographically random 64-bit nonce and must read the stored terms.

## Three residual risks that matter

### 1. The code can change

The program is upgradeable. On 13 October 2026, finalized read-only RPC responses showed the published program ID `dvp34bdbcEm4f4FCUjGV4mDAkDshaQR4LkK8fdcsyZq` on devnet and mainnet-beta. The observed upgrade authorities matched the documentation: `5EX1…UgYU` on devnet and `DXtF…nXMVv` on mainnet-beta. An institution therefore depends not only on today's interface but also on governance around those keys, upgrade notice, open-trade compatibility and independent deployed-binary verification.

### 2. Atomic execution does not verify the deal

The record's creator does not need the parties' signatures. Funding is an ordinary token transfer. A client that derives an escrow address and sends without reading the program-owned record can fund terms or destinations it never accepted. The critical control is not another blockchain slogan; it is a pre-funding and pre-settlement comparison against the agreed ticket.

Token powers also survive the escrow wrapper. The program accepts some Token-2022 configurations whose freeze, pause, permanent-delegate, close or transfer-hook authorities can still affect escrowed tokens. The program re-checks several conditions at settlement, but it cannot force an external token authority to cooperate.

### 3. Network finality is not legal finality

The documentation says to treat a settlement as onchain-complete at Solana's `finalized` commitment. It also states that legal finality depends on the parties' agreements and applicable regimes. The program does not perform matching, price discovery, netting, KYC or holder-eligibility checks. It cannot decide whether a token is good delivery, whether redemption claims are sound, or which law governs a dispute.

## Evidence boundary

The published source at commit `df9919ed02c25a93620e7f6820107c9050ce3b92` contains the six instructions, generated clients, IDL and integration-test fixtures described above. The official documentation says its examples target that commit and that the program was audited by Cantina.

This review confirmed the live program accounts and upgrade authorities through finalized public RPC reads. It did not reproduce the Solana build, prove byte-for-byte equivalence between the public source and either deployed binary, run the official devnet demo, test a transfer hook, review private legal agreements or measure production settlement volume. Those limits matter: this is a mechanism map, not certification of an institution's end-to-end settlement process.

## Sources opened on 13 October 2026

1. [Solana Foundation launch announcement, 6 October 2026](https://solana.com/news/solana-foundation-launches-solana-dv-p-an-atomic-settlement-program-built-for-financial-institutions)
2. [Solana DvP program guide](https://solana.com/docs/defi/dvp-program)
3. [Solana Foundation DvP source, commit `df9919e`](https://github.com/solana-foundation/dvp/tree/df9919ed02c25a93620e7f6820107c9050ce3b92)
4. [Cantina security report](https://cantina.xyz/portfolio/fe870bb4-d96d-4902-8aec-9dfcfa2d6a79)
5. [Official devnet demo description](https://solana.com/delivery-vs-payment/demo)

Public Solana JSON-RPC endpoints for devnet and mainnet-beta were queried read-only at finalized commitment on 13 October 2026 to check the program account, program-data account, deployment slot and upgrade authority.
