---
title: "The Cart Is Not the Transaction"
date: 2026-09-03
updated: 2026-09-03
section: Ouroboros
series: Daily Action Item
tags:
  - Artificial Intelligence
  - Payments
  - Agentic Commerce
  - Risk Controls
keywords:
  - agentic commerce control layer
  - AI agent payments
  - verifiable intent
  - delegated payment authority
  - agent transaction audit trail
categories:
  - Artificial Intelligence
  - Payments
  - Financial Technology
excerpt: "A shopping agent completes an underwritable transaction only when identity, intent, authority, credentials, liability and recovery work as one control plane."
hero: /action-item/20260903/hero.webp
ogImage: /action-item/20260903/og.webp
canonical: "https://iamrobin.ai/ouroboros/202609/20260903/action_item/"
author: https://iamrobin.ai/#person
inLanguage: en
draft: false
sourceAction: "Daily Briefing 2026-09-03, item 5"
ledgerId: AGENT-COMMERCE-20260903
visualHeadline: "The cart is not the transaction."
visualSubhead: "IDENTITY · INTENT · AUTHORITY · RECOVERY"
visualFooter: "INTELLIGENCE × CONTROL × PAYMENT × RECOURSE"
visualNodes: "IDENTITY|INTENT|AUTHORITY|RECOVERY"
---

## The conclusion comes before the checkout

**The conclusion is simple: a shopping agent becomes commercially trustworthy only when six controls travel with every purchase: identity, intent, authority, credentials, liability and recovery.** Product discovery and cart construction are intelligence problems. Moving money is a governed act. A system that recommends the right product can still create the wrong transaction when the price changes, the authority expires, the cart duplicates, or the refund fails.

Anthropic’s new commerce blueprint makes this boundary unusually visible. Its shopping agent can search a catalog, compare products, remember preferences, assemble a cart and hand the result to checkout. Anthropic explicitly leaves payment to the merchant’s existing checkout or an agentic-payment provider. That is a sensible architectural boundary. The model supplies intelligence while the transaction still needs a separate control and settlement layer.

Payment networks and infrastructure providers are building pieces of that layer. [Stripe Shared Payment Tokens](https://docs.stripe.com/agentic-commerce/concepts/shared-payment-tokens) can transmit a payment method to a seller with constraints such as currency, maximum amount and expiry. [Visa’s Trusted Agent Protocol](https://developer.visa.com/use-cases/trusted-agent-protocol) gives merchants a cryptographic way to recognize an approved agent and its stated purpose. [Mastercard Verifiable Intent](https://www.mastercard.com/global/en/news-and-trends/stories/2026/verifiable-intent.html) links the consumer, instructions and resulting action into an auditable record. [UPI Circle](https://www.npci.org.in/product/upi-circle) shows how delegated payment authority can operate with a primary user, a secondary actor and defined limits.

These are meaningful components. They do not yet form one universal, end-to-end contract. The missing product is a network-independent control plane that can answer, before money moves and after something goes wrong, who acted, what was authorized, which limits applied, what changed, who bears loss and how the user recovers.

## A cart records selection, not authority

[Anthropic’s commerce-agent release](https://claude.com/blog/claude-for-commerce-agents) describes a useful division of labor. The agent searches, compares, plans multi-item purchases, renders products in the conversation, constructs the cart and supports post-purchase questions. Its tools remain grounded in catalog data, and the blueprint includes controls intended to prevent invented products or prices. The corresponding [open-source repository](https://github.com/anthropics/commerce-agents) is a reference implementation rather than a supported payment product or service-level commitment.

The release also reports carts up to 35% larger and shoppers around 60% more likely to complete a purchase for participating enterprises. Those figures are company-reported. Anthropic does not publish the sample, control group, confidence interval or exact attribution method, so they are evidence of partner experience rather than an independent experimental result.

The architecture correctly stops at checkout. A cart says which items an agent selected at one moment. It does not prove that a particular user authorized those exact items at the final price, for delivery to the final address, under the final return policy. It does not establish whether substitution was allowed, whether a recurring charge was permitted, or whether the authorization remained valid after inventory and tax changed.

The transaction begins when selection meets enforceable authority. That boundary is where an intelligent assistant becomes a financial actor and where product design must become control design.

## The six-layer control plane

The smallest useful architecture has six layers. Each layer answers a different question, and no single token or signature should be treated as evidence for all six.

### 1. Identity asks who is acting

The merchant needs to distinguish an approved commerce agent from a scraper, replay tool or malicious bot. The payment provider needs to identify the consumer or business whose funds are at risk. The agent platform must identify the exact runtime and key that produced the request.

Visa’s protocol addresses agent recognition through signed HTTP messages. Its documentation describes timestamps, session and key identifiers, algorithm information, merchant binding and operation-specific purpose. The merchant reconstructs the signature base and verifies it with a public key. This establishes that the request came from a recognized signer and was not altered in transit. It does not establish that every commercial choice inside the request was wise or current.

### 2. Intent asks what the user meant

“Buy a tent” is not enough. Useful intent includes product constraints, quantity, maximum total cost, acceptable substitutions, delivery deadline, merchant restrictions and whether recurring billing is allowed. The record should preserve the user’s approved meaning without exposing unrelated private context.

Mastercard describes Verifiable Intent as a privacy-preserving link among identity, instructions and action. In a human-in-the-loop purchase, it can record that the user reviewed the cart and approved the transaction. In a more autonomous purchase, it can carry the instruction set that the agent must follow. Selective disclosure matters because a merchant needs enough information to validate authority, rather than the user’s complete conversation history.

### 3. Authority asks what the agent may do

Intent expresses a goal. Authority sets executable boundaries. It should identify allowed merchants or categories, spending limits, currency, time window, frequency, geography, delivery destinations and the conditions requiring fresh human confirmation.

UPI Circle provides a useful delegated-authority pattern. A primary user can grant a secondary user payment capability within defined limits and retain visibility. NPCI has also extended the concept to certain IoT devices and software profiles under controlled conditions. The important idea is separable authority: the delegated actor receives a bounded power, while the owner retains the power to inspect and revoke it.

### 4. Credentials ask how value may move

A card number, bank credential or stablecoin key should never become general-purpose agent memory. The credential must be tokenized, scoped to the intended seller or network, limited in value and time, revocable, and useless outside the authorized context.

Stripe’s private-preview Shared Payment Tokens illustrate this layer. An agent can grant a token to a seller account with usage limits for currency, maximum amount and expiry. The seller receives a constrained payment object rather than the underlying credential. This reduces exposure, although the documentation alone does not prove interoperability across providers or resolve every dispute.

### 5. Liability asks who absorbs a failure

Cryptographic validity does not decide commercial responsibility. If an agent follows an ambiguous instruction, a merchant accepts an expired price, an issuer approves a duplicated token, or a platform hides a substitution, the ecosystem needs an explicit loss-allocation rule.

The record must distinguish user-authorized choice, agent interpretation, merchant representation, payment authorization and network settlement. Chargeback rights, merchant terms, platform warranties and negligence standards may point in different directions. A safe launch therefore defines liability by failure class before volume grows.

### 6. Recovery asks how the user gets back to safety

Recovery includes stopping an in-flight task, revoking authority, cancelling an order, returning goods, obtaining a refund, correcting delivery and disputing a charge. It also includes restoring the agent to a known state so the same error does not repeat.

An agentic transaction is incomplete until its recovery path is as machine-readable as its purchase path. The agent should know the merchant’s cancellation window, return method and refund status. The user should have one visible place to see what happened, halt further action and escalate to a human when automated recovery fails.

## What each current approach solves

The emerging products should be compared by control coverage rather than brand promise.

Anthropic supplies the intelligence and application harness. It addresses catalog grounding, product reasoning, cart construction, customer care and merchant-side analysis. Its own design leaves final payment elsewhere. That means identity, payment authority, settlement liability and cross-provider recovery remain integration responsibilities.

Stripe Shared Payment Tokens address credential minimization. Limits on amount, currency and expiry make a payment method safer to share with a specific seller. The current documentation labels the capability private preview. Public evidence is therefore sufficient to study the object model, while production coverage, cross-network portability and dispute behavior remain unverified here.

Visa Trusted Agent Protocol addresses recognition and signed purpose at the merchant boundary. Domain and operation binding, freshness and replay resistance are valuable. Visa also states that the product is still being developed and deployed, so public specifications should be read as an emerging control contract rather than universal merchant adoption.

Mastercard Verifiable Intent addresses the evidentiary link between user permission, instructions and the resulting action. Mastercard says the specification is standards-based and designed across protocols, devices, wallets, platforms and payment networks. Its public description makes intent portable in principle; live consistency across issuers, merchants and dispute systems remains the evidence to watch.

UPI Circle addresses delegation in an account-to-account environment. It demonstrates primary and secondary roles, bounded use and revocation within one governed scheme. Its strength is explicit delegated authority. Its limitation for this framework is scope: one domestic payment system does not create a universal identity, merchant-recognition or cross-network liability standard.

The combined picture is constructive. Intelligence, identity, intent, delegation and constrained credentials all exist as concrete building blocks. The integration contract connecting them across the full transaction lifecycle remains fragmented.

## Five Murphy tests before launch

Control becomes real when the unhappy path behaves predictably. Five tests expose most of the gap.

**Wrong price.** The user authorizes an item at $80 with a $100 ceiling. Tax and delivery raise the total to $104. The system must reject or request fresh approval. A broad token with a $120 maximum would technically clear while violating the user’s intended ceiling. The durable record therefore needs both payment limits and the authorized commercial terms.

**Inventory substitution.** The selected item sells out and the merchant proposes a similar model. The agent may consider it reasonable, while size, allergy, compatibility or brand restrictions make it unacceptable. Substitution authority must be explicit, with material attributes frozen or reapproved.

**Expired authority.** The agent receives permission at breakfast and purchases after a material price or delivery change at night. Every authorization needs an expiry and a policy for which changes invalidate it. A fresh signature cannot revive stale user intent.

**Duplicate purchase.** Network retry, tool timeout or agent-loop repetition sends the same order twice. A transaction-specific idempotency key must bind the intent record, merchant order and payment request. The second request should return the first result rather than create a second obligation.

**Failed refund.** The merchant marks an item returned while the payment rail has not completed the credit. The agent must preserve the original authorization, order, return event, refund reference and expected deadline. It should escalate when the deadline passes and prevent the same merchant failure from being silently accepted again.

These are ordinary commerce failures. Agent autonomy raises their speed and scale. A human may make one mistaken purchase; a persistent agent can repeat a misunderstood rule across merchants in minutes.

## The minimum verifiable transaction record

A cross-network agent transaction should create one compact record that each participant can verify without receiving every private input. The minimum fields are:

1. **Actors:** user or business identifier, agent platform, exact agent instance, merchant and payment provider.
2. **Intent:** a hash or selectively disclosed statement of item, quantity, price ceiling, substitutions, destination and timing.
3. **Authority:** grantor, permitted action, merchant or category scope, amount, currency, frequency, expiry and revocation endpoint.
4. **Credential reference:** token or mandate identifier, never the raw payment secret.
5. **Commercial snapshot:** final cart, price, tax, delivery, return terms and merchant timestamp.
6. **Decision trace:** material tool outputs, policy checks, exceptions and any human confirmation.
7. **Payment state:** authorization, capture, settlement and reversal identifiers with timestamps.
8. **Recovery state:** cancellation, return, refund, dispute and escalation references.
9. **Integrity:** signatures, key identifiers, nonce or idempotency key, and hashes linking every stage.

The record should support selective disclosure. A merchant can verify authority and transaction terms without seeing unrelated conversation. An issuer can inspect intent and payment evidence during a dispute. The user can reconstruct what the agent did in plain language.

## The operating rule

Robin’s control plane should treat intelligence as advisory until the six layers close. The agent may search, compare and build a cart under ordinary application permissions. Crossing into payment requires an independently verified identity, a current intent record, bounded authority and a scoped credential. Completion requires liability mapping and a working recovery path.

No provider needs to solve every layer alone. A merchant agent, payment processor, card network, bank scheme and identity provider can cooperate through open records. The hard requirement is composability: each layer must expose evidence that the next layer can verify, and failures must stop at the narrowest boundary.

The commercial opportunity sits in that seam. Better recommendations may increase basket size. Trust determines whether merchants, issuers and users will allow agents to act repeatedly with real money. The durable product is therefore a transaction that can explain itself before authorization, prove itself after settlement and recover when reality diverges from the plan.

## Categories and keywords

**Categories:** Artificial Intelligence, Payments, Financial Technology

**Keywords:** agentic commerce control layer, AI agent payments, verifiable intent, trusted agent protocol, shared payment tokens, UPI Circle, delegated payment authority, payment credential scope, agent transaction audit trail, dispute recovery

**Hashtags:** #AgenticCommerce #Payments #ArtificialIntelligence #FinTech #DigitalTrust
