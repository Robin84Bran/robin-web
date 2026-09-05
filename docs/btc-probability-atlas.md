# BTC Probability Atlas

Canonical page: https://iamrobin.ai/resonance/btc_probability_atlas/

This bilingual static research page presents dated public-market forecasts for
BTC, ETH, SOL, XRP, BNB and TRX. It is not an account dashboard, live market feed,
trade recommendation, or order interface.

- P is a volatility-adjusted historical simulation, not a calibrated certainty.
- Q is an options-implied risk-neutral distribution; it includes risk pricing.
- Q baseline uses the forward and near-ATM volatility without the full smile.
- Median and central 80%/95% intervals describe the selected ending-price
  distribution, not the path or confidence that the model is correct.
- Currency, index, averaging window, exact UTC target and quality/HOLD state
  remain visible. No unsupported option curve is invented.

## Static publication boundary

The public edition is a **frozen snapshot**. Its as-of stamp is visible and the
page flags evidence older than two days as stale for current-market use. Public
updates are not automatic. Other target dates require a separately verified
research calculation; there is no public calculation API or local-server proxy.

The public export excludes private campaign amounts, strategies tied to a
private ledger, actual fills, account data, machine paths and conversation
provenance. Only allowlisted probability/scoring data and aggregate public-market
scan counts are included. The existing site's security and aggregate analytics
configuration is unchanged.

## Source map and verification

- `src/pages/resonance/btc_probability_atlas.astro`: page and shared SEO helper.
- `src/components/probability-atlas/atlas-body.html`: approved chart interface.
- `public/resonance/btc_probability_atlas/`: per-asset JSON, metadata, CSS, JS
  and a `release.json` with artifact and source-receipt hashes.
- `src/components/IdentityDirectory.astro`: Resonance discovery link.
- Sitemap and robot discovery include the exact canonical page.

Run the complete `pnpm run release:check`, production dependency audit and
scoped secret scan. Verify desktop/mobile, the BTC median threshold, P/Q
switches, missing BNB Q, failed data loads and rapid asset changes. Compare
published data hashes and quantiles with the frozen receipt before release.
Source synchronization must preserve current remote main as parent and exclude
unrelated work; deployment uses only the existing Worker and static assets.

## 中文

公开版本是有日期的六币种概率研究快照，不是实时行情、私人账户页面或交易接口。
P 为历史统计模拟，Q 为包含风险定价的期权隐含分布，简单 Q 基准用于比较复杂模型。
区间描述目标时点价格，不表示价格路径或模型正确的把握。币种、指数、结算窗口、
精确 UTC 目标与 HOLD 状态都保留。

不公开内部资金计划、真实成交、账户、机器路径或对话来源。不自动更新公开版本，
也不代理本地服务。新发布必须先核验冻结数据、隐私、整站构建与实际浏览器行为。
