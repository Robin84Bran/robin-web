# The outflow slowed. It did not reverse.

Research date: October 19, 2026, Hong Kong time. Observation window: the ten completed U.S. trading sessions from October 5 through October 16, split into two adjacent five-session blocks. Amounts are US$ millions.

## The small question

When a negative number becomes less negative, two statements can be true at once: conditions improved, and the direction did not change.

This note tests that distinction using Farside Investors' displayed U.S. spot-Bitcoin and spot-Ether ETP flow tables. It asks whether the latest five-session window crossed into positive territory, then decomposes the change so a smaller outflow is not mistaken for an inflow.

## Two windows, two clocks

| Completed sessions | Bitcoin | Ether | Combined |
| --- | ---: | ---: | ---: |
| October 5-9 | -678.9 | -542.2 | -1,221.1 |
| October 12-16 | -228.4 | -320.1 | -548.5 |
| Change | +450.5 | +222.1 | +672.6 |

The combined outflow shrank by **US$672.6 million**, or **55.1%**. Bitcoin's outflow magnitude fell 66.4%; Ether's fell 41.0%.

That is a real change in velocity. It is not a change in sign. The latest Bitcoin sum is still **-$228.4 million** and the latest Ether sum is still **-$320.1 million**. A rule that waits for both rolling sums to turn positive therefore remains unmet.

## The ten displayed daily totals

| Session | Bitcoin | Ether | Together |
| --- | ---: | ---: | ---: |
| October 5 | -89.8 | -50.8 | -140.6 |
| October 6 | +118.8 | -201.9 | -83.1 |
| October 7 | -484.9 | -160.9 | -645.8 |
| October 8 | -244.1 | -72.5 | -316.6 |
| October 9 | +21.1 | -56.1 | -35.0 |
| October 12 | -65.4 | -85.4 | -150.8 |
| October 13 | +175.7 | +24.8 | +200.5 |
| October 14 | -261.4 | -129.5 | -390.9 |
| October 15 | +5.1 | -60.3 | -55.2 |
| October 16 | -82.4 | -69.7 | -152.1 |

October 13 was the only session in the ten-day sample when both asset groups were positive. Three of the next four combined daily totals were negative. One green day did not carry the five-session window across zero.

## Who moved the latest window?

| Asset group | Largest displayed contributors, October 12-16 | Net flow |
| --- | --- | ---: |
| Bitcoin | IBIT | -165.4 |
| Bitcoin | FBTC | -60.2 |
| Bitcoin | All other displayed funds combined | -2.8 |
| Ether | ETHA | -299.0 |
| Ether | All other displayed funds combined | -21.1 |

The latest Bitcoin result was concentrated in IBIT and FBTC. Together they accounted for -$225.6 million against the group's -$228.4 million total. The Ether result was even more concentrated: ETHA contributed -$299.0 million of the -$320.1 million total.

This arithmetic describes contribution, not motive. It does not show whether one investor moved money between products, whether an authorized participant acted for inventory reasons, or whether secondary-market sellers caused a redemption. No causal story can be recovered from these rows alone.

## What the table measures

The SEC permits authorized participants to create and redeem crypto-asset ETP shares in kind. A daily net-flow estimate is therefore evidence about the primary-market creation and redemption channel around these listed products.

It is not a headcount of buyers and sellers. It does not measure how many people used Bitcoin or Ethereum, how much economic activity occurred on either network, or whether the next price move will be up or down. Fund shares also trade between investors in the secondary market without every trade becoming a creation or redemption.

The useful reading is modest: the displayed ETP outflow remained broad enough to keep both five-session sums below zero, but its pace slowed sharply from the previous window. Direction and velocity now disagree.

## Method and limits

The two Farside tables were reopened on October 19, 2026. For each asset group, the displayed daily totals were summed across October 5-9 and October 12-16. Issuer contributions for the latest window were summed from the displayed fund cells. Percent reduction uses the absolute size of each negative total: `(prior outflow magnitude - latest outflow magnitude) / prior outflow magnitude`.

Farside says its tables update automatically and may contain errors or inaccuracies. This note did not independently reconstruct every issuer's creation and redemption records, establish the provider's exact update times, or collect a matching onchain, basis, liquidity or price series. Those omissions matter if someone tries to turn the comparison into a market regime or causal claim.

This is a research artifact. It records one completed comparison and leaves the underlying classification at watch. It does not execute or recommend a trade, change a portfolio, or predict the next session.

## Sources

1. [Farside Investors, Bitcoin ETF Flow](https://farside.co.uk/btc/) - displayed fund and daily totals; reopened October 19, 2026.
2. [Farside Investors, Ethereum ETF Flow](https://farside.co.uk/eth/) - displayed fund and daily totals; reopened October 19, 2026.
3. [U.S. Securities and Exchange Commission, in-kind creations and redemptions for crypto ETPs](https://www.sec.gov/newsroom/press-releases/2025-101-sec-permits-kind-creations-redemptions-crypto-etps) - mechanism context; July 29, 2025; reopened October 19, 2026.
