---
title: The Strategy That Ate Its Own Funding
date: 2026-09-14
updated: 2026-08-21
section: Ouroboros
series: Blog
lane: BUILD
tags:
- Quant Lab
- Arbitrage
- Trading Costs
keywords:
- spot perp arbitrage
- funding rate
- trading fees
- slippage
- shadow trading
categories:
- Build
- Quantitative Research
- FinTech
excerpt: A shadow arbitrage system earned positive gross carry and lost it many times over to fees, slippage and data-health
  churn.
hero: /blog/20260914/hero.webp
ogImage: /blog/20260914/og.webp
canonical: https://iamrobin.ai/ouroboros/202609/20260914/blog/
author: https://iamrobin.ai/#person
inLanguage: en
draft: false
sourceDossier: research-dossier.md
voiceCheck: PASS
mediumUrl: null
linkedinUrl: null
thesis: An arbitrage signal is economically incomplete until fees, slippage, cashflow timing and operational churn are admitted
  before the trade.
---

## Positive Carry, Negative Business

The strategy earned **positive gross funding and basis**. It still lost roughly
**4,752 USDT** in the diagnostic shadow ledger.

The arithmetic was brutal. Across independent mainline and challenger ledgers,
2,389 closed virtual positions produced about 283 USDT of gross funding plus
basis. Fees consumed about 4,778 USDT. Modeled slippage consumed another 258
USDT.

The trade idea made money before the business of trading arrived.

Spot-perpetual arbitrage has an elegant sales pitch. Buy the underlying asset.
Short the perpetual contract. Collect funding while the two legs offset much of
the directional exposure. The screen displays a rate. The mind annualizes it.
The opportunity begins to look like rent.

Then four trading legs walk into the room.

Opening spot costs money. Opening the perpetual costs money. Closing spot costs
money. Closing the perpetual costs money. Spreads and slippage join the bill.
If stale data causes early exits and re-entries, the strategy pays the full
round trip again before collecting meaningful funding.

The funding did not disappear. The strategy ate it.

## The Popular Formula Was Missing a Company

The first formula looked like a trade:

`funding + basis convergence = expected return`

The decision-grade formula looks like a company:

`settled funding + realizable basis − fees − slippage − operational churn = fully net result`

Every term requires evidence.

Funding must settle at actual exchange timestamps. Basis convergence needs an
exit path. Fees depend on four legs and the relevant execution tier. Slippage
depends on size and liquidity. Operational churn depends on how the system
responds to stale or missing data.

The shadow system initially let several gaps hide inside configuration and
implementation. One sampling lane admitted candidates with negative modeled
net annualized return. Another lane advertised a positive entry floor while
the entry code read an exit threshold. Historical scanner records omitted the
next funding timestamp, so the evaluator prorated funding continuously instead
of proving it had crossed a settlement event.

Each issue was small enough to sound technical. Together they turned an
arbitrage narrative into an expensive turnover machine.

## The Most Expensive Trade Lasted Zero Minutes

One lane produced 974 zero-duration exits caused by stale data. Across that
lane, 1,806 exits were tied to stale or unhealthy data.

That pattern deserves more attention than any backtest Sharpe ratio.

A zero-duration position has almost no time to earn funding. It can still pay
the opening and closing costs. If the scanner immediately sees the same
candidate again, the loop repeats. The system mistakes liveness for
opportunity and converts uncertainty into turnover.

This is operational alpha in reverse. The venue earns; the strategy learns the
same lesson repeatedly.

The repair therefore had to reach beyond signal quality. The research added
persistence gates before entry, debounced selected market-quality exits and
kept immediate exits for truly unsafe states such as missing data or invalid
funding. It also carried `next_funding_time` through the pipeline so funding
could be recognized once at an evidenced settlement.

The point was restraint. A strategy should never invent carry during a missing
timestamp merely to make a report smooth.

## Fees Belong at Admission

Many trading systems calculate costs after the backtest. That ordering makes
the opportunity feel real before the largest constraint arrives.

The fee firewall moved economics to the door.

Before a virtual position could open, the scanner and each strategy lane had
to show that a conservative horizon of expected funding cleared the four-leg
fee burden, observed round-trip slippage and a minimum profit allowance. Basis
convergence received zero value for admission. Missing or invalid funding
timestamps blocked entry. Nonpositive funding blocked entry.

The exact thresholds belong to the private research system. The public
principle is transferable:

> A cost discovered after entry is a forecasting error.

The first deployed cycle applied the new firewall across the whole snapshot.
Zero candidates cleared. No new virtual trades opened.

That result looked disappointing only if activity was the product. The actual
product was a decision system. It found no economically admissible decision.

## Gross Profit Can Be a Dangerous Comfort

The shadow ledger had a soothing fact: gross funding plus basis was positive.

Gross profit can keep a weak mechanism alive because it proves that one part of
the thesis exists. Funding was available. The hedged structure captured some of
it. The idea was directionally coherent.

The commercial question lives one layer lower. Can the captured cashflow pay
for the machinery required to capture it?

That question applies to far more than trading.

An AI product can show positive usage while inference costs overwhelm revenue.
A lending business can earn an attractive spread while acquisition and credit
losses absorb it. A marketplace can grow gross merchandise value while
incentives buy every transaction. A hardware company can report demand while
financing terms carry the economics.

The investment professional asks for the bridge from gross signal to fully net
cash. The executive asks whether the mechanism scales without consuming its
own source of value.

Here, the bridge was negative by a wide margin.

## Conflicted Evidence Still Changes the Decision

The diagnostic result was confirmed within the shadow ledgers. Exact venue and
account economics remained conflicted because the fee identity, venue intent
and historical funding timing did not share one fully verified contract.

That uncertainty could have been used as an escape hatch. Perhaps true fees
were lower. Perhaps execution would improve. Perhaps the funding accrual model
was conservative.

The system chose a safer interpretation. The known discrepancy offered no
credible path to erase a cost gap of this size. More precise evidence might
change the exact loss. It could not authorize pretending the current mechanism
had positive fully net economics.

This is an important decision habit. Unknowns retain their label. They still
participate in policy. Under a fail-closed admission rule, missing cost evidence
creates `HOLD`; it never becomes a free trade.

## Build the Challenger Around the Failure

The response produced several shadow challengers.

One reconciled the fee contract. One required persistent market-quality
breaches before exit. One demanded repeated eligibility before entry. A common
evaluator preserved the funding settlement timestamp and stopped prorating
missing cashflow.

None became a winner on announcement.

The challengers needed comparable forward evidence across enough closes or
enough time. Their early health checks established that the machinery ran and
the new fields propagated. That proved implementation, not profitability.

This separation protects research from release theater. A passing test suite
means the intended rules execute. It does not mean the market pays those rules.
A healthy daemon means the observer is alive. It does not mean the strategy has
edge.

## The Business Question Comes First

The cleanest postmortem fits on one page:

- **Revenue:** evidenced settled funding and realizable basis.
- **Cost of revenue:** four-leg fees and slippage.
- **Operational leakage:** stale-data churn and premature recycling.
- **Working-capital timing:** capital committed before the funding event.
- **Evidence risk:** uncertain settlement timestamps and fee identity.
- **Decision:** block admission until the economics clear conservatively.

Calling the structure “arbitrage” does not waive the income statement.

The word arbitrage suggests certainty. The implementation contains vendors,
queues, clocks, partial evidence, market impact and human attention. Every one
of those elements can collect rent from the strategy.

The durable edge may eventually come from lower fees, patient entry, better
execution, higher-quality funding or a different holding horizon. The current
evidence cannot choose among them. It can choose the next correct action:
protect capital and observation quality while the challengers learn.

The strategy's first mature achievement was discovering that it had been its
own largest counterparty.

### A unit-economic test before every trade

The admission test can be written as a small bridge.

Start with the cashflow that can settle inside the intended holding period.
Apply the funding direction and actual settlement schedule. Give basis
convergence zero value unless the strategy owns a tested exit mechanism.

Then subtract the full round trip. Count every leg, the relevant fee schedule,
spread, observed slippage and any borrow or financing cost. Add a buffer for
model error and a minimum absolute profit that justifies operational attention.

The candidate can enter only when the conservative cashflow exceeds that stack.
If a required value is missing, the answer is `HOLD`. If the economics fail, the
answer is `NO_TRADE`. The scanner should record which term decided.

This bridge creates comparability across markets. A candidate with a spectacular
annualized rate and a tiny absolute cashflow can fail. A lower rate with durable
settlement, deep liquidity and low friction can pass. Annualization no longer
gets to hide scale or timing.

### Questions for a future challenger

A challenger deserves promotion only after it answers the failure directly.

Does persistence reduce churn without trapping the system in unhealthy data?
Does the candidate survive full costs at observed size? Does the funding arrive
at evidenced settlement events? Does the exit policy preserve enough carry
before paying another round trip? Are results comparable across the same forward
window?

The review should also examine inactivity. A challenger that trades frequently
may simply have weakened admission. A challenger that waits may be improving
economic selectivity. Trade count is descriptive; fully net outcomes and failure
behavior decide.

### Why this matters to AI infrastructure

The same unit-economic mistake appears in fashionable businesses. Gross demand
can be positive while subsidies, financing, inference and customer acquisition
consume the value. Revenue may settle long after the capital requirement.
Operational churn can create repeated cost without durable use.

The lesson from a small shadow arbitrage system scales cleanly: trace the
settled cash, charge every leg, and make the opportunity pay for the machine
before the machine acts.

### The monthly economic close

The lab should close its books like a small trading company. Reconcile settled
funding, basis realization, fees, slippage, open exposure and data-quality exits
for one completed period. Keep gross, fully net and modeled components separate.

Then attribute leakage. How much came from admission quality? How much from
turnover? Which cost terms were observed and which remained modeled? Did any
configuration differ from the value read by code?

This close keeps engineering improvements tied to economics. Fewer stale exits
matter when they reduce churn. Better settlement fields matter when they prevent
invented carry. A healthier process matters when it produces more trustworthy
evidence.

The company earns promotion only when the cash bridge improves under comparable
forward conditions.

### The name should follow the cash

“Arbitrage” is a hypothesis about relationships. The ledger should name the
actual business it observes: funding collection, basis exposure, fee burden and
execution risk. Each label earns its place through settled evidence.

The vocabulary keeps the strategy humble. It also lets a future improvement
show exactly which part of the company became viable.

If costs later fall or funding quality rises, the ledger can show the transition
without rewriting the loss. A better business emerges through a new evidence
window, rather than through a new adjective applied to old cashflows.

That is the standard: improved settled economics, comparable evidence and a
clear causal bridge from the change to the result.

Anything else is a promising research note waiting for cash.

### The investment transfer

When reviewing an asset-light story, ask whether the company truly avoids
capital or simply rents it through vendors, credits and customer incentives.
When reviewing infrastructure, trace who pays before the asset earns and who
refinances if utilization arrives late.

The gross signal can still be valuable. The investable question is whether the
system preserves value after every required participant collects its share. The
cash bridge should answer before the multiple does.

If the bridge never closes, growth remains a customer for capital.

The ledger should say so before the market does.

Truth is cheaper at the admission gate.

### Decision Notes

- **Category:** Quantitative research, trading economics, operational systems
- **Keywords:** spot-perpetual arbitrage, funding, fees, slippage, stale data
- **Evidence:** shadow diagnostics only; no live trading result is claimed
- **Decision:** retain the fee firewall and require forward comparable evidence
  before selecting any challenger

#QuantLab #Arbitrage #TradingCosts #FinTech #RobinOS
