# One hundred runs for one legacy portal workflow

Published: 16 November 2026

Research cutoff: 16 November 2026, 10:58 HKT

This research asks a narrow question: what would a complete 100-run record reveal about one computer-use workflow through a legacy portal that a speed claim alone cannot reveal?

The public evidence gives the question real weight. OpenAI's 13 November customer story says Shield Technology Partners uses GPT-6 Astra inside its Forge platform to navigate older websites that may lack application programming interfaces, or APIs. Shield reports that these browser workflows are live across its IT providers and perform thousands of runs each month. Its Head of Technology says Astra was 35–40% faster on average than the legacy models Shield had used for computer-use tasks. Shield also reports fewer failures, fewer timeouts and less technician effort spent writing instructions or helping an agent through a task.

Shield's broader Forge page, read on 16 November, separately reports more than 3,750 businesses served, 50% of eligible tickets resolved autonomously and 3,800 custom agent runs each day. A 24 September Forge announcement says one shared runbook had run nearly 300 times at another Shield provider.

These are company-reported figures at different levels. The broader Forge figures cover a platform. The 35–40% figure concerns computer-use tasks. The nearly 300 runs concern a shared runbook whose relationship to the later legacy-portal story is unspecified. The reviewed public pages do not provide a complete denominator for one frozen portal workflow, a definition of accepted completion, intervention minutes, recovery rates or cost per accepted completion.

## Why speed needs a destination

A browser agent sees the same surface a person sees: pages, buttons, form fields and messages. Reaching a final screen can look like completion while the underlying record remains unchanged or incorrect. The accepted final state therefore needs to include the intended side effect, such as a licence assignment or a correctly updated ticket, rather than relying only on the page the agent reached.

The simplest analogy is a parcel service. Journey time matters. Delivery quality also depends on which parcels reached the correct address, which needed another attempt and which required a person to step in. An agent workflow has the same shape: elapsed time becomes useful when it is attached to accepted work.

## Freeze the comparison before seeing the result

The proposed study uses one supported, reversible, non-sensitive task in a test environment or with synthetic records. Before the first run, it freezes:

- the exact task and accepted final state, including any required side effect;
- the starting page, account permissions, portal version, browser configuration and test-data class;
- the time limit, allowed retry count, approval boundary and stop conditions; and
- the baseline system and the method for counting model, infrastructure and active technician cost.

The 100 cases are fixed before results are reviewed. Every attempted run remains in the denominator. Interruptions, timeouts, incorrect completions and technician takeovers remain visible. One hundred has a practical property: each run is one percentage point, while the set stays small enough for failure-by-failure review. The cases and conditions still determine how broadly the result can be used.

## Give every run one final outcome

Each attempted run receives one mutually exclusive final outcome:

| Outcome | Meaning |
| --- | --- |
| Accepted first pass | The agent reached the correct final state on its first attempt within the allowed approval policy. |
| Accepted after recovery | The agent encountered trouble, recovered by itself and reached the correct final state. |
| Human completed | A technician took over execution and reached the correct final state. |
| False completion | The agent claimed success while the required final state or side effect was wrong. |
| Stopped safely | The workflow reached an approval, policy or scope boundary and stopped as designed. |
| Failed | The run timed out, hit an unrecovered navigation or tool error, or ended incomplete for another reason. |

The first failure point and recovery sequence are recorded separately. This preserves the distinction between a correct result, a safe control, a human rescue and an agent recovery.

## The four measures

1. **Accepted completion rate** = accepted first-pass runs plus accepted-after-recovery runs, divided by 100.
2. **Recovery rate** = accepted-after-recovery runs divided by runs that encountered a recorded recoverable failure. A zero failure denominator leaves recovery unmeasured and visible.
3. **Technician intervention minutes** = total active technician minutes divided by 100, with a second view per accepted completion.
4. **Total cost per accepted completion** = model usage, computer/runtime infrastructure and attributable active technician cost across the 100 runs, divided by accepted completions. If accepted completions equal zero, total cost remains reportable while the per-completion ratio remains unavailable.

First-pass completion, false completions, safe stops, median elapsed time and 95th-percentile elapsed time add context. The same measures applied to the frozen baseline turn a relative speed claim into a comparison of delivered work.

## What this research completes

This public-source study produces a measurement design and an evidence boundary. It does not establish Shield's private workflow results or validate GPT-6 Astra on the proposed task. The 100-run experiment remains unexecuted. A later implementation would require a suitable test environment, synthetic or authorized records, fixed cases and promotion thresholds declared before results are examined.

No customer account, Shield system, legacy portal, production workflow, purchase, capital allocation, company contact or external message was accessed or executed for this research.

## Public sources

1. [OpenAI, “Shield helps technicians hand off legacy portal work with OpenAI”](https://openai.com/business/customer-stories/shield/), 13 November 2026.
2. [Shield Technology Partners, “Forge”](https://shieldtp.com/forge), read 16 November 2026.
3. [Shield Technology Partners, “Forge: Building for IT Services from the Inside Out”](https://shieldtp.com/company-news/forge-building-for-it-services-from-the-inside-out), 24 September 2026.
4. [OpenAI, “A practical guide to building AI agents”](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/), read 16 November 2026.
5. [OpenAI, “Computer-Using Agent”](https://openai.com/index/computer-using-agent/), published 23 January 2025 and read 16 November 2026.
