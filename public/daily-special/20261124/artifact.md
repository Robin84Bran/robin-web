# The Durable Resolution Ledger

**Daily Special · Signal 7 · 24 November 2026**

Sierra announced on 23 November that it is raising a $1.75 billion Series F at a $30 billion valuation. The enterprise AI-agent company also reported annual recurring revenue above $400 million and described a commercial model that charges for outcomes such as a resolved problem, an originated loan, an onboarded driver, a paid insurance claim, or a retained subscriber.

The financing is the headline. The useful research question sits inside one ordinary word: **resolved**.

When an AI agent closes a customer-service case, three things can differ. The customer’s issue may stay solved or return. The contract may treat the interaction as billable or reverse the charge. The provider may retain a positive financial contribution after model usage, software tools, and human repair. A durable-resolution ledger connects those three views.

## Evidence map

| Public evidence | What it establishes | Material limit |
| --- | --- | --- |
| Sierra announced a $1.75 billion Series F at a $30 billion valuation, led by Greenoaks and Lightspeed. | A large new financing event and its announced valuation. | The announcement leaves the pre-money or post-money basis, security preferences, and use of proceeds unspecified. |
| Sierra reported ARR above $400 million in November 2026, after reporting ARR above $150 million in February. | Two company-reported snapshots show a large increase in disclosed scale. | Both figures are lower bounds. They do not yield an exact growth rate, profit, or cash flow. |
| Sierra says successful outcomes are agreed in advance; unresolved or escalated interactions generally carry no charge. | The published pricing design ties revenue to defined business results and allows blended pricing for some work. | Public sources omit outcome prices, blended-pricing mix, credits, refunds, and cohort revenue. |
| Sierra’s AOL customer account reports a 64% case-resolution rate and says most inquiries were handled entirely by the AI agent. | A named deployment and a stated operational result across described support tasks. | The vendor-hosted page omits the measurement period, eligible-case denominator, reopen window, later repeat contacts, and case-level costs. |

All four sources reviewed for this artifact are Sierra publications, including its customer account of AOL. They provide direct company and customer claims. They are separate from audited financial statements or an independent cohort study.

## The three connected ledgers

### 1. The customer ledger

Start with every eligible case assigned to the agent under a fixed task definition. Record which cases meet the agreed resolution rule at the end of the interaction. Then observe those cases for a period appropriate to the task—seven days or 30 days, for example.

A **lasting resolution** is an initially resolved case that remains settled through that frozen window. A return contact for the same issue, reversal, refund, or human repair changes its status. The matching rule for “same issue” belongs in the design because customers may return through another channel or use different words.

### 2. The contract ledger

For the same cases, record the outcome fee, any credit or refund, and the treatment of a case that was initially billable and later reopened. This produces **retained cohort revenue** rather than an invoice snapshot.

### 3. The delivery-cost ledger

Record the variable work used across every attempt in the cohort:

- model inference;
- tool and data-provider calls;
- variable platform expense;
- human review and remediation;
- other case-level delivery costs.

Unsuccessful attempts remain in the cost base because they also consume resources.

## The bounded calculation

For one frozen cohort:

```text
lasting resolution rate
= lasting resolutions / eligible cases

contribution profit per lasting resolution
= (retained cohort revenue - variable delivery cost across all attempts)
   / lasting resolutions
```

This contribution measure excludes fixed research, engineering, sales, and corporate costs. A positive result would show that a cohort produced money after its variable delivery work. Company-wide profitability would still depend on covering the fixed cost base and capital needs.

## Minimum cohort record

| Field | Why it matters |
| --- | --- |
| Task definition and eligible cases | Prevents the denominator from shrinking around easier work. |
| Observation window | Gives “lasting” a stated duration. |
| Initial resolution rule | Connects the interaction to the contract. |
| Same-issue matching rule | Distinguishes a reopened problem from a new request. |
| Transfers, exclusions, and human repairs | Keeps difficult work visible. |
| Outcome fees, credits, reversals, and refunds | Converts billing into retained cohort revenue. |
| Inference, tools, variable platform, and human cost | Captures delivery work across successful and unsuccessful attempts. |
| Lasting resolutions | Supplies the denominator for durable unit economics. |

## What the public record supports today

The reviewed sources support four observations: Sierra reports rapid revenue scale; it announced a very large financing; its commercial design includes outcome pricing; and AOL appears as a named deployment with a reported 64% resolution rate.

The public record does not provide a durable-resolution cohort, the variable cost bridge, or contribution profit per lasting resolution. Those figures would turn “resolved” from an interaction label into an economic measurement shared by the customer, the contract, and the provider.

## Method and scope

The research reopened Sierra’s financing announcement, its outcome-pricing explanation, its February 2026 company review, and its AOL customer account. Claims were kept at the level stated in those sources. Company-reported figures and vendor-hosted customer evidence remain attributed. The cohort design and formulas above are research proposals, rather than disclosed Sierra practices or results.

This public-source artifact did not contact Sierra, AOL, investors, or customers; buy a service; allocate capital; trade; or execute an underlying business or investment decision. Completion records research only.

## Public sources

1. Sierra, [“Building the digital front door”](https://sierra.ai/blog/series-f-30b), 23 November 2026; observed 24 November 2026.
2. Sierra, [“Outcome-based pricing for AI agents”](https://sierra.ai/blog/outcome-based-pricing-for-ai-agents), 10 December 2024; observed 24 November 2026.
3. Sierra, [“Year two in review”](https://sierra.ai/blog/year-two-in-review), 6 February 2026; observed 24 November 2026.
4. Sierra, [“How AOL modernizes a heritage brand using AI-powered customer service with Sierra”](https://sierra.ai/customers/aol), observed 24 November 2026.
