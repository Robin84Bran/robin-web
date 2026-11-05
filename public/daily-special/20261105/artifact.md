# The price clock changed

**Daily Special · 5 November 2026 · Signal 4**

USDY is an accumulating token issued by Ondo Finance. A holder keeps the same
number of tokens while the quoted value of each token is designed to rise with
income from the underlying U.S. Treasury and bank-deposit assets.

On 1 November 2026 at 00:00 UTC, the canonical USDY price on Ethereum, BNB
Chain, Mantle and Tempo moved from a daily-step oracle to a continuous-price
oracle. Ondo announced the change on 3 November. This research asks a small,
practical question: what changes at a UTC boundary and over a weekend when the
price begins accounting for elapsed time whenever it is read?

## Two ways to keep time

The former Dynamic Rate Oracle held the price flat during a UTC day and added a
full day of yield at midnight. The new `ContinuousPriceOracle` stores a price
and yearly rate, then calculates the accrued value at the timestamp of each
request.

The public `USDYOracleWrapper` is the stable address integrations are directed
to use. On Ethereum, a read-only check observed that the wrapper points to a
`ScheduledOracleSwitch` naming:

- the former oracle at `0xA0219AA5B31e65Bc920B5b6DFb8EdF0988121De0`;
- the continuous oracle at `0xbAEC2b9fE27cD054e1c0C2B720aF117d9D7eC871`;
- the cutover at 1 November 2026, 00:00:00 UTC.

Before the cutover the switch forwards reads to the old oracle. From the
cutover onward it forwards them to the new one. Integrations already reading
the wrapper keep the same address while the implementation changes behind it.

## Frozen-state simulation

The test protocol was fixed before execution. It observed Ethereum block
26,345,421 at 5 November 2026, 01:44:35 UTC. Future wrapper values were produced
with a read-only `eth_simulateV1` call over that frozen state, changing only the
block timestamp. Legacy values came from the former oracle's public
`getPriceHistorical(uint256)` function.

| UTC timestamp | Canonical wrapper, USD per USDY | Legacy schedule, USD per USDY | Gross 1-USDY quote, USDC |
| --- | ---: | ---: | ---: |
| 6 Nov 23:59:59 | 1.152259432971856068 | 1.152259429999999973 | 1.152259 |
| 7 Nov 00:00:00 | 1.152259434316880826 | 1.152375659999999913 | 1.152259 |
| 7 Nov 00:00:01 | 1.152259435661905584 | 1.152375659999999913 | 1.152259 |
| 9 Nov 00:00:00 | 1.152491902858206352 | 1.152608150000000053 | 1.152491 |

Across the selected one-second midnight boundary, the wrapper rose by
0.000000001345024778 USD per USDY. The legacy schedule took a 0.00011623 USD
daily step at midnight. From the 1 November cutover onward, the wrapper supplies
the canonical current price; the direct legacy readings illustrate the former
timing rule and are not executable terms.

The weekend calculation continued through Saturday and Sunday. From Friday at
23:59:59 to Monday at 00:00:00, the wrapper rose by 0.00023246988635029 USD. The
legacy comparison crossed three midnight steps, including the immediate
Saturday step, and rose by 0.00034872 USD over the selected timestamps.

## Continuous underneath, rounded on screen

The observed USDC oracle price was exactly 1.000000000000000000 USD. The
published Instant Manager arithmetic converts the 18-decimal USDY oracle value
into USDC's six-decimal units and rounds down.

That is why the gross one-token quote read **1.152259 USDC** immediately before
midnight, at midnight and one second later. The underlying USDY value moved on
each second; the change was smaller than one millionth of a USDC in a one-token
quote. Continuous accounting and a visibly changing screen are different
layers.

The quote is a gross arithmetic result. An actual redemption also depends on
registration and compliance, user-specific fees, pause state, rate limits,
router liquidity and settlement. No wallet was connected and no subscription,
redemption, approval, signature or transaction occurred. Future timestamps are
simulations over the 5 November state; Ondo can change the price or rate before
those timestamps arrive.

## Integration consequence

Ondo directs current-price integrations to the wrapper. Its interface has
always excluded the former oracle's `getPriceHistorical` function, so a system
that called the legacy oracle directly needs both a current-price migration and
another historical-price method. Ondo expects to deprecate the former oracle on
31 December 2026, after which direct current-price calls are expected to fail.

The change is small enough to hide inside a rounded one-token quote and large
enough to alter the meaning of every price request. A daily clock answers,
“What is today's price?” A continuous clock answers, “What is the price at this
second?” The stable wrapper makes that change survivable for software built to
ask in the right place.

## Sources

1. [Ondo Finance, “Continuous Pricing for USDY Is Now Live, Enabling Intraday Yield”](https://ondo.finance/blog/usdy-continuous-pricing), 3 November 2026.
2. [Ondo Finance, “USDY Price Oracle”](https://docs.ondo.finance/general-access-products/usdy/usdy-price-oracle), observed 5 November 2026.
3. [Ondo Finance, “Integrating with the USDY_InstantManager contract”](https://docs.ondo.finance/developer-guides/usdy-instant-manager-integration), observed 5 November 2026.
4. [Ondo Finance smart contract addresses](https://docs.ondo.finance/addresses), observed 5 November 2026.
5. [Ondo Finance RWA contract source](https://github.com/ondoprotocol/rwa-contracts/tree/4409cdac96f26bdce584c1078aa7a968dd937dc9), examined commit `4409cdac96f26bdce584c1078aa7a968dd937dc9`.

Research cutoff: **5 November 2026, 9:45 a.m. Asia/Hong_Kong**. This is a
research artifact about pricing mechanics and one read-only simulation. It is
separate from any investment decision or executed redemption.

