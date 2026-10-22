# The total turned green. The rails did not.

Research date: October 22, 2026, Hong Kong time. ETF observation window: the five latest fully reported U.S. sessions through October 20. Stablecoin observation window: seven calendar days from October 13 through October 20. ETF amounts are US$ millions; stablecoin amounts are US$ billions.

## The bounded question

Did the recent improvement in U.S. spot-Bitcoin and spot-Ether ETP flows broaden across both products and the USD-stablecoin supply measure?

No. Bitcoin-product flows crossed above zero, while Ether-product flows and the stablecoin measure remained negative. Adding the two ETP groups together would hide that disagreement.

## Three gauges

| Gauge | Window | Start | End | Net change | Direction |
| --- | --- | ---: | ---: | ---: | --- |
| U.S. spot-Bitcoin ETP flow | Oct 14, 15, 16, 19, 20 | daily flows | daily flows | **+$211.2m** | positive |
| U.S. spot-Ether ETP flow | Oct 14, 15, 16, 19, 20 | daily flows | daily flows | **-$388.9m** | negative |
| USD-pegged stablecoin circulation, USD value | Oct 13 to Oct 20 | $306.106bn | $303.738bn | **-$2.368bn (-0.77%)** | negative |

The two ETP groups sum to **-$177.7 million**. Bitcoin's positive window therefore did not make the matched two-product window positive. The stablecoin series also contracted.

These figures are not one pool of money and should not be added together. ETP flow estimates describe creations and redemptions around listed products. The DefiLlama series is a stock estimate for circulating USD-pegged tokens, valued in U.S. dollars. The comparison tests whether their directions agree; it does not claim that dollars moved from one rail into another.

## The five complete ETP sessions

| Session | Bitcoin ETPs | Ether ETPs | Together |
| --- | ---: | ---: | ---: |
| Oct 14 | -261.4 | -129.5 | -390.9 |
| Oct 15 | +5.1 | -60.3 | -55.2 |
| Oct 16 | -82.4 | -69.7 | -152.1 |
| Oct 19 | +526.7 | -103.3 | +423.4 |
| Oct 20 | +23.2 | -26.1 | -2.9 |
| **Five-session sum** | **+211.2** | **-388.9** | **-177.7** |

October 19 did most of the work in the Bitcoin column. Without that session, the other four Bitcoin sessions sum to -$315.5 million. This is arithmetic concentration, not evidence about the motives of investors or authorized participants.

The Farside tables displayed October 21 headline totals when this research was conducted, but several fund cells still contained dashes. The session was excluded rather than treating unreported cells as zero or accepting an automatically calculated partial total. If those cells are later completed, they belong in the next dated window, not in a retroactive rewrite of this one.

## The stablecoin clock

DefiLlama's `stablecoincharts/all` endpoint reported the following USD-valued circulation for tokens in its `peggedUSD` category:

| Date | USD-valued circulation |
| --- | ---: |
| Oct 13 | $306.106bn |
| Oct 14 | $306.101bn |
| Oct 15 | $305.516bn |
| Oct 16 | $305.201bn |
| Oct 17 | $304.867bn |
| Oct 18 | $304.653bn |
| Oct 19 | $304.622bn |
| Oct 20 | $303.738bn |

The seven-day change is -$2.368 billion, or -0.77%. This is a market-value estimate, not a direct measure of cash entering trading venues. Minting, burning, bridging, classification changes and small peg-price moves can all affect the series. It also says nothing by itself about where a stablecoin sits or what its holder intends to do with it.

## What the cross-rail test does—and does not—say

The latest complete evidence does not show broad confirmation. One of the three gauges is positive. Two are negative.

That result is useful because a single combined headline can tell the opposite story. Bitcoin and Ether ETPs together would still be negative, despite a positive Bitcoin number. Adding the positive October 21 partial totals would turn the ETP headline green, but doing so would violate the complete-session rule. The stablecoin stock would still be moving in the other direction.

The test is deliberately modest. It cannot establish a market regime, predict price, or identify a transfer between rails. ETP flows measure a primary-market channel around funds; stablecoin circulation is broader and follows a calendar-day clock. Agreement would be a reason to investigate breadth, not proof of economic activity or a trading signal. Disagreement is a reason to keep the labels separate.

## Method and limits

The Farside Bitcoin and Ether tables were reopened on October 22, 2026. The latest five sessions with numeric entries across every displayed fund column in both tables were October 14, 15, 16, 19 and 20. Daily totals were summed without filling dashes. The stablecoin start and end values came from DefiLlama's official historical endpoint and were aligned to the last complete ETP session. Percentage change is `(303.738026162 / 306.105855529) - 1`.

Farside says its tables update automatically and may contain errors. This work did not reconstruct each issuer's creation and redemption files. DefiLlama's aggregate is provider-defined and can be revised as token histories or classifications change. The two datasets have different clocks, coverage and economic meanings, so only their signs are compared.

This is a public-source research artifact. It completes a dated breadth check. It does not execute or recommend a trade, change a portfolio, transfer funds, contact anyone, or establish that the underlying neutral decision should change.

## Sources

1. [Farside Investors, Bitcoin ETF Flow](https://farside.co.uk/btc/) — displayed fund cells and daily totals; reopened October 22, 2026.
2. [Farside Investors, Ethereum ETF Flow](https://farside.co.uk/eth/) — displayed fund cells and daily totals; reopened October 22, 2026.
3. [DefiLlama, Stablecoins dashboard](https://defillama.com/stablecoins) — current aggregate context and seven-day direction; reopened October 22, 2026.
4. [DefiLlama, official free API documentation](https://github.com/DefiLlama/api-docs/blob/main/llms-free.txt) and [historical stablecoin endpoint](https://stablecoins.llama.fi/stablecoincharts/all) — field definition and dated series; reopened October 22, 2026.
5. [U.S. Securities and Exchange Commission, in-kind creations and redemptions for crypto ETPs](https://www.sec.gov/newsroom/press-releases/2025-101-sec-permits-kind-creations-redemptions-crypto-etps) — primary-market mechanism context; July 29, 2025; reopened October 22, 2026.
