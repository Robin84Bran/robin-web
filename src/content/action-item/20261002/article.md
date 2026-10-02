---
title: "The Price of Leaving Your Compute Supplier"
date: 2026-10-02
updated: 2026-10-02
section: Ouroboros
series: Daily Action Item
categories:
  - AI Infrastructure
  - Capital Allocation
tags:
  - Compute Financing
  - Supplier Switching
keywords:
  - GPU collateral
  - cash collection
  - contractual flexibility
excerpt: "Supplier choice becomes useful freedom when contracts, financing and cash permit the move."
hero: /action-item/20261002/hero.webp
ogImage: /action-item/20261002/og.webp
canonical: "https://iamrobin.ai/ouroboros/202610/20261002/action_item/"
author: https://iamrobin.ai/#person
inLanguage: en
draft: false
sourceAction: "Daily Briefing 2026-10-02, item 5"
ledgerId: COMPUTE-EXIT-20261002
visualHeadline: "What follows you when you leave?"
visualSubhead: "Workloads can move. Obligations need their own review."
visualFooter: "SUPPLY / COLLECTIONS / DEBT / EXIT"
visualNodes: "COMPUTE|CASH|CREDIT|EXIT"
---

An AI company can move to a different chip and still discover that its freedom has a repayment schedule. The interesting price is the one attached to leaving: engineering work, overlapping capacity, remaining commitments, and any financing that cannot travel with the workload.

Sharon AI has supplied a timely example of the financing side. On October 1 it announced a US$356 million committed GPU-backed debt facility at a fixed 9.95%, excluding fees. That is a useful number precisely because it tells us so little on its own. It prices one layer of capital. It does not tell us whether the customer will pay on time, how long the equipment will remain competitive, or what happens when someone wants a different machine. [Sharon AI announcement](https://www.prnewswire.com/news-releases/sharon-ai-enters-into-gpu-backed-debt-facility-expanding-funding-flexibility-for-ai-factory-deployments-302895839.html)

The conclusion is that financing belongs beside the usual comparison of accelerators. A cheaper hour of computation can sit inside a less flexible business. A more expensive hour can sometimes buy a useful right to stop. Neither conclusion follows from a vendor logo.

## The supplier menu is only the beginning

Anthropic’s April 6 announcement names Google and Broadcom in an agreement for additional TPU capacity expected to begin coming online in 2027. It establishes a real alternative capacity relationship. It does not provide a public exit-price schedule for every workload or financing arrangement. [Anthropic announcement](https://www.anthropic.com/news/google-broadcom-partnership-compute)

That distinction changes the question from “Can another chip run the model?” to “Can this business move this job, at this time, on acceptable terms?” A compiler port might be feasible while the delivery deadline makes it impractical. A substitute cluster might be cheaper while its capacity remains unavailable. A service contract might be portable while the financing attached to the original equipment remains outstanding.

Think of a restaurant deciding to replace its ovens. The new oven can cook the menu perfectly. That leaves the old lease, installation time, staff retraining and the evening’s bookings. The analogy has limits: compute workloads differ enormously in their portability, and this is an illustrative business problem. Still, the dinner guests are a useful reminder that a technical migration has to fit inside an operating company.

Supplier diversity creates options. Exercising an option consumes time and sometimes cash. The value of that option depends on the conditions under which it can actually be used.

## Read the financing clock separately

Broadcom’s September 10 Form 10-Q contains an instructive disclosure about an unnamed compute customer. It describes conditional convertible promissory notes of up to US$42 billion, restricted to that customer’s lease obligations. As of August 2, no such notes had been issued. This is an earlier disclosure, not a newly completed October loan, and that passage does not name Anthropic. [Broadcom Form 10-Q, commitments section](https://investors.broadcom.com/static-files/96641754-401f-4090-a4ab-210728c83a28)

The distinction between a ceiling and a draw is essential. An available financing mechanism can enable capacity procurement before all the money changes hands. Once used, its conditions can influence later decisions. We cannot infer the borrower’s complete freedom to refinance, migrate or terminate from the ceiling alone.

There are several clocks to place on the same page: the financing term, the capacity commitment, the customer contract, and the period during which the equipment performs useful work at a competitive cost. They can all show different times. A contract renewal can arrive before debt maturity. A new model can change hardware requirements before a capacity commitment expires. Collections can arrive after an interest payment is due.

This is why a diagram with arrows between company names needs a second pass. One arrow may represent chips, another capacity, another credit and another cash already received. Drawing all four as money moving now creates a much tidier picture than the evidence supports.

## What 9.95% can tell us

Sharon AI says its senior secured SPV facility is backed by GPUs and associated cash flows. It also reports customer total contract value above US$8.8 billion. The announcement supplies a financing commitment and a company-reported commercial aggregate. It does not turn that aggregate into immediate cash available for debt service. [Sharon AI announcement](https://www.prnewswire.com/news-releases/sharon-ai-enters-into-gpu-backed-debt-facility-expanding-funding-flexibility-for-ai-factory-deployments-302895839.html)

Here is deliberately narrow arithmetic. If US$356 million were drawn for a full year at 9.95%, simple annual interest would be US$35.422 million. At half that principal, US$178 million, it would be US$17.711 million. These are illustrations, not estimates of Sharon AI’s actual interest expense. Fees, the draw schedule, amortization, principal repayment and other contractual terms can change the cash requirement.

| Illustrative principal outstanding for one year | Stated annual rate | Simple interest only |
| --- | --- | --- |
| US$178 million | 9.95% | US$17.711 million |
| US$356 million | 9.95% | US$35.422 million |

The arithmetic is easy. The hard question is what cash reaches the borrower before those obligations fall due. A model that compares total contract value with one year’s interest mixes a multi-period commercial promise with a dated cash payment. It can appear reassuring while saying very little about liquidity.

That is also why I would leave a debt-service coverage ratio blank without the required cash-flow and principal schedule. An empty cell can be more informative than a precise ratio built from the wrong numerator.

## Follow one customer payment

Imagine a hypothetical compute operator whose customer pays after accepting a completed installation. Equipment arrives first. Power and networking have to work. The customer runs its acceptance process. An invoice then becomes collectible under the contract. None of those stages guarantees that the next one happens on schedule.

For a simple illustration, suppose monthly cash operating costs are US$2 million and collections move two months later than planned. Holding everything else constant, that delay requires US$4 million of additional cash just to cover those operating costs during the gap. This invented example excludes financing payments, taxes, capital expenditure and existing cash reserves. It is a way to expose timing, not a forecast about any named company.

Now add a decision to move part of the workload. The operator may pay for both environments during testing. The new system needs acceptance while the old one must keep serving users. Savings shown at the end of a spreadsheet can coexist with an uncomfortable cash trough near its beginning.

Three different records help: what was signed, what was delivered and accepted, and what was collected. Each answers a different question. The practical investment skill is keeping those records connected without allowing one to impersonate the others.

## Collateral has a next customer

NVIDIA’s August 11 compute-financing discussion argues that a broad ecosystem of users and workloads can support equipment redeployment and residual value. That is the supplier’s economic case, rather than a guarantee of any particular resale price. [NVIDIA financing discussion](https://blogs.nvidia.com/blog/nvidia-ai-factory-compute/)

The idea is worth testing. Equipment with several plausible next customers may give a lender more recovery choices than equipment tied to one unusual workload. Yet the next customer needs power, connectivity, compatible software, installation capacity and a reason to buy at the offered price. A machine can be technically useful while expensive to relocate or difficult to sell quickly.

For a hypothetical lender, the useful question is therefore specific: who could use these assets after this borrower stops paying, and how long would it take to earn or recover cash? The answer could differ by site, generation and configuration. An attractive market for one accelerator does not establish equal liquidity for every system carrying its brand.

The same logic applies to a borrower considering a switch. Hardware value, contract flexibility and financing flexibility interact. They should remain separate assumptions until evidence connects them. A graceful software migration cannot by itself settle a secured obligation.

## Growth capital and credit answer different questions

PaleBlueDot’s October 1 release announces US$200 million of Series C financing at a US$3.2 billion valuation. It says signed customer contracts exceeded US$5 billion by September-end and that the new money will support additional capacity. Those company disclosures establish a funding event and management’s commercial description. They leave realized cash generation and investor preference terms unresolved. [PaleBlueDot announcement](https://www.prnewswire.com/news-releases/palebluedot-ai-raises-200m-series-c-round-to-scale-super-intelligence-infrastructure-platform-302896601.html)

Equity and debt can both fund equipment, while asking different things from the business. Equity investors can accept uncertainty in exchange for participation in future value. Creditors need a contractual path to repayment and whatever protection their documents provide. A large equity round does not remove the need to understand debt maturity; a secured facility does not establish attractive equity returns.

For an investor comparing platforms, adding headline funding amounts together would hide the most interesting differences. One structure may bear more utilization risk. Another may depend more on customer credit. A third may carry a larger refinancing gap. The relevant comparison is how the business survives a plausible disappointment, using the actual terms when they are available.

A valuation also says little about whether a specific outside investor can participate or on what terms. There is no verified allocation here. This is a framework for deciding what evidence to seek, not an invitation to buy a financing headline.

## Put a price on the decision to leave

I would build an exit worksheet around a specific workload and a specific date. Start with the remaining cash obligations that survive leaving. Add migration engineering, parallel operation during acceptance, and any termination or refinancing costs supported by the contracts. Then identify recoverable value, with the timing and conditions under which it could be realized.

The worksheet needs a second column for uncertainty. If termination rights are unavailable, the answer is unresolved. If a supplier offers capacity only on a future schedule, that capacity cannot rescue today’s deadline. If resale proceeds are hypothetical, show the sensitivity rather than treating them as cash in the bank.

For example, imagine an alternative saves US$1 million per month once fully accepted. If migration and overlapping operations require US$6 million, simple recovery takes six months before financing, tax and risk adjustments. Add an enforceable US$3 million exit payment and the same simplified recovery becomes nine months. All figures are invented. They show how a financing or contract term can dominate an apparently obvious hardware saving.

That calculation still needs a feasibility check. Can the company fund the transition? Can customers tolerate the change? Does the new system meet the same acceptance criteria? A positive long-run saving can be impossible to reach if the business cannot cross the initial cash gap.

![Conceptual map of compute supply, customer collections, debt service and the conditional exit path. This is a framework, not a map of a disclosed transaction.](/action-item/20261002/compute-exit.svg)

The diagram keeps useful computation, incoming collections and financing obligations on distinct paths. The exit path asks what can move and what remains payable. It deliberately leaves undisclosed terms blank rather than using arrows to invent a complete transaction.

## A small evidence packet beats a grand independence claim

The first useful artifact is one page for one business, with links to the supporting documents. Record the customer and supplier identities only where disclosed. Distinguish commitments from funds drawn, forecasts from realized collections, and owned assets from contracted access. Give every number a period and a currency.

Next record the rights that matter under stress: cancellation, assignment, refinancing, security and acceptance. Some will be public; others will remain unavailable. The purpose is to identify which missing term could reverse the judgment. An unavailable clause deserves a question, not a confident story about someone’s motives.

Finally, write one condition for changing the view. That might be a disclosed draw schedule, evidence of cash collections, a completed deployment, or contractual portability that makes an alternative usable. Choose the condition that closes the largest decision-relevant gap. Ten attractive charts cannot compensate for one missing term that controls the entire exit.

For the current examples, the immediate work is documentary. Preserve the distinction between Anthropic’s named capacity partnership and Broadcom’s unnamed financing disclosure. Keep Sharon AI’s commitment, rate and contract value separate. Keep PaleBlueDot’s financing and commercial claims separate from realized cash. No trade, application, customer contact or paid capacity is part of this exercise.

The rewarding possibility is that better financing can expand the range of useful suppliers and make more infrastructure possible. The discipline is to ask what freedom remains after the deal is signed. Before celebrating an escape from a chip supplier, open the payment schedule and see which obligations are coming along.

## Categories and keywords

**Keywords:** compute financing, supplier switching, GPU collateral, cash collection, contractual flexibility.

**Categories:** AI Infrastructure; Capital Allocation; Systems.

**Hashtags:** #AIInfrastructure #ComputeFinance #CapitalAllocation #IAmRobin
