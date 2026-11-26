# The medical reading room and the empty scorecard

Published: 26 November 2026

Research cutoff: 26 November 2026, 09:10 HKT

This bounded public-source note asks what OpenAI's newly released healthcare model configurations change at the search layer, what the dated prices imply for a Sol-first and Astra-review workflow, and what evidence would still be needed before choosing a default route.

## What launched

OpenAI's API changelog records four healthcare model configurations released on 24 November 2026 for the Responses API:

- `gpt-6.2-astra-healthcare`
- `gpt-6.2-sol-healthcare`
- `gpt-6-astra-healthcare`
- `gpt-6.1-sol-healthcare`

OpenAI describes these as select models paired with a harness tailored to clinical questions. When a healthcare configuration uses web search, the search runs against a dedicated index of medical sources.

The distinction is easiest to picture as a library. A general web search can begin with the catalog for the whole building. The healthcare route begins in a medical reading room. That changes the shelf the system looks at first. A model still has to select the right paper, read it accurately, preserve its qualifications and connect each claim to evidence.

Search is an explicit part of the API request. OpenAI's web-search guide says an automatic tool choice makes search optional. A developer can require web search when every case needs it.

## The dated price map

The table below uses Standard short-context rates observed on 26 November 2026. OpenAI says the healthcare promotional prices are available at least through 31 December 2026.

| Healthcare configuration | Input per 1M tokens | Cached input per 1M | Output per 1M |
| --- | ---: | ---: | ---: |
| GPT-6.2 Sol | $2.00 | $0.10 | $10.00 |
| GPT-6.2 Astra | $8.00 | $0.40 | $40.00 |

Across these listed token categories, Astra costs four times Sol. Hosted web search adds $10 per 1,000 calls, equal to one cent per call, plus search-content tokens charged at the selected model's rate. Model input and output tokens add to the bill.

A ten-question comparison with one search per question and route therefore begins with ten cents of search-call fees for a single route, before token charges or retries. If an Astra reviewer searches again, it adds another search call and another set of search-content tokens. If it reviews the supplied sources without searching, its own input and output tokens still carry the Astra rate.

## The proposed blind comparison

The comparison should freeze ten historical clinical claims whose original public sources are already known and which require no private patient data. Cases should cover treatment effects, diagnostic performance, adverse events, subgroup limits and guideline or regulatory status. At least two cases should have a correct answer that the available source does not support the claim.

Route A would use GPT-6.2 Sol healthcare with search required. Route B would begin with the same Sol retrieval output and add an independent GPT-6.2 Astra healthcare review under the same question, rubric and source-access rule. Any second search by Astra would be recorded.

Evaluators would receive the outputs in randomized order with route identity concealed. Each material claim would be checked against the cited original source. The check would preserve the studied population, intervention, comparator, measured outcome, time period and material qualifications.

The primary measure would be:

`total API cost / source-verified correct material claims`

Supporting measures would include unsupported-claim rate, missing-qualification rate, citation precision, whole-case pass rate, latency, search calls, input/output/search-content tokens and reviewer minutes. Every generated material claim, including unsupported ones, belongs in the denominator used to calculate error rates.

## What this edition establishes

The dedicated medical index is a real, dated API feature. The listed Sol and Astra prices create a measurable tradeoff. A second reader earns its place only if its corrections reduce source-level errors enough to justify the added cost and time.

The reviewed public documentation does not disclose the complete composition or coverage of the medical index. It provides no controlled accuracy comparison with general web search and no measured Sol-versus-Astra review lift. This edition did not run the paid ten-case experiment, process patient data, make a clinical recommendation or change an API route.

The scorecard is ready. Its cells remain empty until both workflows face the same frozen cases and their claims are checked against the original sources.

## Public sources

1. [OpenAI API changelog](https://developers.openai.com/api/docs/changelog), healthcare model configurations entry dated 24 November 2026; observed 26 November 2026.
2. [OpenAI API pricing](https://developers.openai.com/api/docs/pricing), healthcare configuration and web-search rates; observed 26 November 2026.
3. [OpenAI web-search guide](https://developers.openai.com/api/docs/guides/tools-web-search), Responses API tool-choice behavior; observed 26 November 2026.
4. [OpenAI evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices), task-specific, blinded and human-calibrated evaluation guidance; observed 26 November 2026.
