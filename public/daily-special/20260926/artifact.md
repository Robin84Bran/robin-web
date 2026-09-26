# Reading a Bitcoin ETF flow total before the row is complete

Research date: September 26, 2026, Hong Kong time. Observation: the Farside page reopened during the morning research window. US session: September 25, 2026. This is a frozen observation of a changing table, not a final daily flow report.

## The observed row

Units: US$ million. Parentheses in the source mean negative values. A dash is preserved as missing, not converted to zero. Numeric entries establish table completeness only; they have not been independently reconciled to every issuer.

| Fund | Displayed September 25 value |
| --- | ---: |
| IBIT | Missing (dash) |
| FBTC | Missing (dash) |
| BITB | -11.8 |
| ARKB | 0.0 |
| BTCO | 0.0 |
| EZBC | Missing (dash) |
| BRRR | Missing (dash) |
| HODL | Missing (dash) |
| BTCW | 0.0 |
| MSBT | 0.0 |
| GBTC | 0.0 |
| BTC | 0.0 |

Seven numeric cells, five missing cells; numeric-cell coverage = 7/12 = 58.3%, rounded. This is a count, not an asset-weighted coverage measure. The available-cell sum and displayed Total both equal -11.8. Their agreement does not prove a complete day.

Comparison row: September 24 had twelve numeric cells. Its nonzero entries were IBIT +162.6, FBTC +12.9, BITB +4.1, EZBC +4.9, BTCW -4.0 and MSBT +10.2. The other six entries were 0.0. Sum = +190.7, agreeing with the displayed total at the displayed precision. Six positive funds, one negative, five zero. This does not certify the row against underlying issuer reports or rule out later corrections.

## A second observation during preparation

A subsequent September 26 morning source check showed FBTC +49.3, BRRR 0.0 and HODL 0.0. IBIT and EZBC still showed dashes. The other previously numeric cells were unchanged. Ten of twelve cells now contained numbers (83.3%, count-based coverage); their sum and the displayed total both equalled +37.5 million. The observed sign changed before the row was complete. This is an update to the observation, not evidence of Friday's final direction. With the two missing contributions called R, the same method now gives T = 37.5 + R, holding displayed values fixed. Neither R nor the final total has been established.

The two source openings establish observation order; no precise earlier provider-update time was published or inferred. Both observations refer to the same US session and were retrieved September 26 HKT. The visual and initial sign examples below intentionally retain the first snapshot.

## A sign test, not a forecast

Let M be the combined contribution of the five missing funds. Holding already displayed entries fixed, full total T = -11.8 + M (US$ million).

| Assumed M | Calculated T | Meaning |
| ---: | ---: | --- |
| +20.0 | +8.2 | Hypothetical inflow |
| -20.0 | -31.8 | Hypothetical outflow |
| +11.8 | 0.0 | Hypothetical break-even |

These are arithmetic scenarios, not estimates, bounds or probabilities. No defensible bound on M was established. Revisions to reported entries would also change the calculation.

## Reusable reconciliation sheet

For a later snapshot, record session date, retrieval time and timezone, provider, fund universe, each signed value, each missing entry, available-cell sum, displayed total, and their difference at published precision. Preserve the earlier snapshot and any revisions. Only compare daily directions after all constituent entries are present and the sum agrees; numerical completeness remains weaker than issuer-level verification.

Keep three questions separate:

| Question | Evidence to collect | What it does not establish |
| --- | --- | --- |
| What changed inside the listed products? | Complete fund-flow row and issuer creation/redemption disclosures | Each buyer's identity or motive; a same-minute exchange purchase |
| How much did shares trade? | Secondary-market turnover for a specified session | Net additions to the products |
| What happened on the network? | Same-period adjusted transfer value and address measures with methodology | Unique people, commercial payments, or all of Web3 |

FINRA describes primary creation/redemption and secondary trading as separate layers. The SEC's July 29, 2025 approval permits in-kind creation/redemption by authorized participants for covered crypto ETPs; permission does not identify which mechanism a particular fund used on September 25. Coin Metrics documents filters for self-churn and other transfer artifacts and warns that users and addresses do not map one-to-one. No current onchain series was collected here, so the research makes no finding about current network activity or broad Web3 health.

Research output: a dated reconciliation method and evidence map. The underlying flow watchpoint remains open. No portfolio change, trade, account action or empirical network-activity test is represented by this artifact.

## Sources and method

All five sources reopened September 26, 2026. Farside is the publisher of the observed aggregation, not an issuer-level audit. FINRA supplies educational market structure; the SEC supplies a dated permission; Coin Metrics supplies methodology. Calculations and the comparison framework above are authored analysis.
1. https://farside.co.uk/btc/
2. https://www.finra.org/investors/investing/investment-products/exchange-traded-funds-and-products
3. https://www.sec.gov/newsroom/press-releases/2025-101-sec-permits-kind-creations-redemptions-crypto-etps
4. https://docs.coinmetrics.io/network-data/network-data-overview/transactions/transfer-value
5. https://github.com/coinmetrics/docs-website/blob/master/asset-metrics/asset-metrics-faqs.md
