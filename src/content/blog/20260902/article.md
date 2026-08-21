---
title: Future Data Is a Time Machine
date: 2026-09-02
updated: 2026-08-21
section: Ouroboros
series: Blog
lane: INVEST
tags:
- HKEX IPO
- Point in Time Data
- Investment Research
keywords:
- Hong Kong IPO one lot
- lookahead bias
- point in time data
- IPO base rates
categories:
- Investment Research
- Capital Markets
- Data
excerpt: A polished IPO backtest can borrow tomorrow's facts and make the past look smarter. Point-in-time evidence closes
  the time machine.
hero: /blog/20260902/hero.webp
ogImage: /blog/20260902/og.webp
canonical: https://iamrobin.ai/ouroboros/202609/20260902/blog/
author: https://iamrobin.ai/#person
inLanguage: en
draft: false
sourceDossier: research-dossier.md
voiceCheck: PASS
mediumUrl: null
linkedinUrl: null
thesis: An IPO decision can use only information available before the subscription deadline, and every later fact must remain
  outside the feature set.
---

## The Backtest Knew Too Much

Future data is a time machine. It takes a polished backtest into the past and
quietly hands it tomorrow's newspaper.

The result can look brilliant. The model avoids weak IPOs, favors strong ones
and explains its choices with elegant factors. Every row is real. Every formula
works. The fraud occurs in time.

Our Hong Kong IPO study began with a deliberately small investor: one board lot,
fully cash-funded, no heroic leverage. The decision question sounded simple.
Given the information available before the retail subscription deadline, should
a person apply for one lot or pass?

The word **before** became the center of the entire architecture.

Offer price can be known by a date. Subscription demand may be published later.
Allocation results arrive after the application closes. First-day price exists
after listing. An issuer can reuse a stock code years later. Adjusted price data
can incorporate corporate actions that no applicant knew at the time.

If those facts leak backward, the study becomes a machine for remembering the
future.

## One Lot Is Two Outcomes

A retail IPO application is not simply an investment return from offer price to
first close.

The applicant faces two outcomes.

If allocated, the investor receives a board lot and earns the market return
after fees.

If unallocated, the investor earns no stock return and has tied up cash during
the application window.

The first-lot success probability links those outcomes. A headline showing a
40% listing gain can coexist with a modest expected application return if the
chance of receiving one lot is small. A flat listing can still be costly if cash
was reserved at the maximum price for little chance of allocation.

The study therefore preserves several quantities:

- gross stock return from the final offer price;
- net return conditional on receiving one board lot;
- expected return on the cash reserved;
- the exact allocated and unallocated payoff mixture.

This forces the analysis to live at the applicant's altitude. The investor
cannot spend a spectacular listing-day return that she had almost no chance of
receiving.

## 1,257 IPOs and a Broken First-Day Label

The dataset eventually covered 1,257 eligible IPOs from 2016 through 2026 YTD.
The first version of the price history looked rich. It also carried a structural
problem: adjusted data could rewrite listing-day prices after later corporate
actions.

The warning surfaced in extreme returns. Sixty-one legacy records showed gains
above 400%. That may happen in an IPO market. It may also signal a denominator
that traveled through a split, consolidation or code-reuse problem.

We rebuilt the first-day close from independent unadjusted sources. Most came
from official HKEX Daily Quotations Sheets preserved in a historical archive.
Current official pages covered another segment. A secondary listing-day table
filled recent gaps only after it matched the official history across overlapping
observations.

The repair removed 60 of the 61 extreme returns. They were adjustment artifacts.
One genuine return above 400% survived because the raw quotation evidence
confirmed it.

This was a useful humiliation. The model had not discovered an exotic corner of
market behavior. The data pipeline had manufactured excitement.

## Even the Calendar Can Leak

Three scheduled listing dates fell on full-market typhoon closures.

A casual pipeline might treat the next calendar day as the first trading day or
leave the row missing. The correct answer requires the market's historical
special-day record. The observation should roll to the next actual trading
session.

This sounds like housekeeping. Housekeeping determines labels.

The same discipline applies to benchmark regimes. If a feature says the market
was bullish at the application deadline, it can use only benchmark closes
available by that deadline. A later weekly close, a revised index series or a
convenient end-of-month classification gives the backtest an information
advantage unavailable to the applicant.

Every feature needs four things:

1. a source;
2. an earliest-public timestamp;
3. a cutoff rule;
4. a hash or preserved snapshot.

Without those, “available at the time” becomes a story the researcher tells
after seeing the result.

## The Repair Passed and the Strategy Stayed Blocked

The repaired first-day dataset passed its descriptive quality gate. All 1,257
eligible IPOs had an independent unadjusted first-trading-day close. The regime
report could describe historical base rates.

The larger strategy remained blocked.

Longer-horizon D5 and D20 histories still had gaps involving delisted and
right-censored securities. Cash opportunity cost needed re-verification. The
manual decision card preserved `decision_authorized=false` and
`order_action=NONE`.

This separation is one of the project's most valuable outputs.

A dataset can be good enough for one conclusion and inadequate for another. A
descriptive result can pass while an Apply rule remains on hold. A repaired
label can improve understanding without granting trading authority.

Research teams often want one global status: valid or invalid. Evidence works
better with jurisdiction. The D1 label passed. The full decision pipeline had
more work to do.

## Base Rates Before Stories

IPO marketing is a story machine. Founders describe a future. Sponsors present
comparables. Grey-market prices create urgency. Retail demand becomes a social
signal. The application clock converts curiosity into action.

The base-rate study slows the sequence.

How often did one-lot applicants receive stock? What was the distribution of
net outcomes after allocation and fees? How did results vary across market
regimes using information available at the deadline? Which features survived a
holdout sample? Which apparent patterns disappeared after data repair?

These questions do not remove judgment. They give judgment a floor.

One-lot sizing also matters. A small, cash-funded application can be a bounded
experiment. The opportunity cost, allocation odds and fees still belong inside
the expected return. “Only one lot” is a risk limit, not an excuse to ignore
arithmetic.

## A Point-in-Time Constitution

The study adopted several laws.

**Facts published after the retail deadline cannot become features.** They may
be labels or outcome evidence.

**A later issuer using the same stock code cannot donate its history to an
earlier IPO.** Identity must include issuer and time.

**Adjusted data cannot replace the unadjusted price the first-day investor
actually faced.** Corporate actions belong in a separate reconciliation layer.

**Unknown data stays unknown.** A missing close, allocation probability or cash
assumption cannot become zero.

**A descriptive pass grants no application authority.** Decision gates remain
explicit.

These laws make the research slower. They also make the result usable.

## The Real Investment Edge

The most seductive model is often the one that has seen the future without
admitting it.

Point-in-time discipline removes that magic. Performance becomes less smooth.
Sample sizes shrink. Some factors lose significance. More rows remain unknown.

That loss of beauty is a gain in truth.

The HKEX project may eventually identify a useful one-lot framework. Its first
achievement is more basic: it learned how to keep tomorrow out of yesterday's
decision.

Future data will always offer a ride. The investor's edge begins by refusing
the time machine.

### The five clocks of an IPO study

An IPO backtest needs at least five clocks.

The **publication clock** says when a prospectus, allocation result or exchange
notice became public. The **application clock** says when the investor had to
commit capital. The **listing clock** identifies the first actual trading
session. The **price clock** separates the offer, open, close and later marks.
The **corporate-action clock** determines when splits, consolidations and other
adjustments become valid for comparison.

A single database row can contain values from all five clocks. Joining on the
ticker and current company name may look natural and quietly import later
knowledge. The correct join uses the information set available at the decision
cutoff.

The Hong Kong study found a vivid example in first-day returns above 400%.
Sixty of sixty-one legacy observations at that scale traced to adjustment
artifacts rather than the unadjusted first-day experience. A spectacular tail
of apparent winners was mostly a data transformation traveling backward in
time.

Three listing dates carried another lesson. Weather closures meant the printed
date was not the first tradable session. Rolling to the next actual exchange
day preserved the investor's experience. Treating the planned date as a normal
session would pair the IPO with an unavailable price.

### A point-in-time evidence packet

Before calculating a return, the study should freeze a small packet for each
issue:

- offer terms and publication timestamp;
- application deadline and known allocation mechanics;
- listing notice and actual first trading day;
- unadjusted first-day open and close;
- later corporate actions kept in a separate lineage;
- source URL or archive hash;
- missing fields preserved as unavailable;
- exact formula and unit.

The packet makes revisions possible without rewriting the past. A corrected
source can produce a new version. The old version remains inspectable. A later
name change or split enriches current analysis while staying outside the
original decision view.

### One-lot research needs two denominators

A one-lot strategy can look attractive when returns are calculated only on
allocated capital. The investor may have committed far more cash than the
shares finally received, or received no allocation at all. Financing costs and
cash lockup can dominate a tiny allocation.

The research therefore needs both the **security return** and the **applicant
return on committed resources**. The first asks how the allotted shares moved.
The second asks what the opportunity earned after allocation probability,
financing, fees, refund timing and capital occupation.

The descriptive D1 pass established part of the first denominator across 1,257
eligible issues. The full D1–D20 and applicant-economics study remained blocked
at the project cutoff. That boundary matters. A clean first-day table cannot
authorize an application rule whose capital denominator is still unknown.

The time machine often hides inside the denominator. A future analyst knows
which issues were allocated, liquid and successful. The applicant knew only the
offer terms, available evidence and the possibility of receiving nothing.

Decision-grade IPO research has to stand beside that applicant, before the bell.

### A falsifier before a factor

Every proposed IPO signal should name the evidence that would make it disappear.
If the return depends on adjusted prices, later company classifications or only
successful allocations, the factor has borrowed the future. If performance
vanishes after financing, fees and capital lockup, the security return never
became an applicant return.

The falsifier belongs in the study specification before results are viewed. That
sequence reduces the temptation to explain away a beautiful backtest after its
clock errors are discovered.

Point-in-time research feels austere because it removes information we genuinely
know today. Its purpose is to recreate what the decision maker could have known
then. That humility is the price of an honest time machine test.

### The publication rule

Any public chart should carry its evidence cutoff, return definition and
applicant denominator in the caption. Readers can then see whether they are
looking at first-day security performance, allocated-capital performance or a
full cash-on-cash result.

The rule is small and unforgiving. It prevents one elegant line from blending
three different economic questions.

It also lets another researcher reproduce the table without inheriting the
author's assumptions. A caption with clocks and denominators is a tiny audit
trail, and a powerful defense against accidental foresight.

### The investment transfer

The same clocks govern factor research, credit studies and private-market
comparables. A current database knows who survived, refinanced, restated and
changed segments. The historical investor did not. Every backtest should freeze
identity, availability and units at the decision date before it calculates
performance.

That discipline may reduce the apparent edge. The remaining edge deserves more
trust because it survived contact with the actual information set. A smaller
truth compounds better than a beautiful result financed by tomorrow.

It can also be reproduced by someone who never saw the future outcome.

## Source note

Figures and status labels come from the HKEX Retail IPO Base-Rate Study's
sanitized project record. The study remains manual research. It cannot submit
applications or orders and does not disclose private applicant or capital data.

#HKEX #IPO #PointInTimeData #InvestmentResearch #CapitalMarkets
