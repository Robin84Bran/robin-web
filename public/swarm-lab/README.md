# Swarm Lab — Eight Small Worlds

Eight reproducible teaching models inspired by Robin's September 24, 2026 diary, **From ART to Immortal Cells**, and her follow-up questions about discovery. They turn analogies into adjustable rules—not claims that cells, societies, ecosystems and AI are the same thing. Start with [How to play](HOW_TO_PLAY.md): every control explained, one challenge per world.

Public lab: https://iamrobin.ai/intelligence/swarm-lab/

| Experiment | Question | Folder |
|---|---|---|
| The city of freeloaders | When does assortment protect cooperation? | [01_cell_city](01_cell_city/README.md) |
| A body without a blueprint | What can local adhesion assemble? | [02_self_assembly](02_self_assembly/README.md) |
| Mars in a jar | Is survival independence, or a long runway? | [03_mars_jar](03_mars_jar/README.md) |
| The island that forgot the manual | Which kind of memory survives changed rules? | [04_memory_islands](04_memory_islands/README.md) |
| The Already Known Trap | Do familiar labels hide surprising neighbors? | [05_known_trap](05_known_trap/README.md) |
| Many Small Windows vs. One Big Eye | What does attention geometry lose? | [06_attention_windows](06_attention_windows/README.md) |
| Taste Drift | Can unusual true ideas survive a familiar judge? | [07_taste_drift](07_taste_drift/README.md) |
| Shared Channel | When does a useful lead become a crowd? | [08_shared_channel](08_shared_channel/README.md) |

## Run it yourself

Node 22+; no dependencies, credentials, network, API calls, live agents or biological material.

```sh
node --test tests.mjs
node run.mjs
node verify.mjs
node write-guide.mjs
```

`run.mjs` regenerates the complete 32-seed batch (seeds 1–32, default controls, no seed filtering), each experiment's CSV/JSON, and aggregate `results.json`. `verify.mjs` reruns every comparison and checks committed results and model hashes without changing files. The browser imports these exact model files. A fixed seed plus controls plus model version determines the trajectory. Share links preserve them; JSON downloads include every frame. CSV exports contain the plotted metric, not every internal variable.

Within one JavaScript runtime, replay is exact. Across engines, transcendental math in the particle model can differ at floating-point roundoff: the inspected Chromium/Node run differed by at most 1.67e-16 in particle coordinates, with identical summaries. Browser-download QA uses a 1e-10 numeric tolerance and exact categorical comparisons; do not assume byte-identical trajectories across engines.

## What happened in version 1.0.0

- Cell city: mean contributing share **94.24%** with shared founders versus **3.40%** with 90% mixing. This outcome depends on how the model assigns group benefits and creates colonies; it does not establish a social or biological law.
- Assembly: mean largest connected share **50.70% → 96.93%** with adhesion, after removing 14 of 72 particles. Nothing regrows. The surviving particles rearrange.
- Mars: no-maintenance arms completed **108 days**; maintained arms completed **all 240 observed days**, across all seeds. The maintained result is **right-censored at 240**, not a 240-day lifespan or proof of closure. Weather randomness changes inventories but did not change these default survival endpoints.
- Islands: mean success **72.16% / 87.73% / 93.52%** for fresh / skills / skills plus failure memory, over 120 attempts. The first comparison includes prior training; the second isolates a simple exclusion rule. No language model was evaluated.

Means and ranges summarize toy runs, not confidence intervals for reality. No parameters were fitted to empirical data. The UI can change assumptions; the printed batch always uses the published defaults.

### Sensitivity checks, not just favorable defaults

Three additional all-seed batches are retained in `results.json` under `sensitivities`: zero public benefit, half sunlight, and zero changed rules. With half sunlight, the fixed maintenance policy **reduces** mean completed days from 49.875 to 46.53125: repair takes energy before recycling can use it. This is a failure of the fixed allocation policy under scarcity, not evidence against maintenance in general. Zero benefit reduces both city arms to low cooperation; unchanged islands make both skill-bearing learners perfect without needing failure memory. These checks were added after the default batch to probe its interpretation; they did not tune or replace the models or default results.

## Public/private and publication

This folder is the canonical source. Its public teaching files are mirrored byte-for-byte into `robin-web/public/swarm-lab/` by `sync-public.mjs` with an explicit allowlist. `PROJECT_STATE.md`, local QA output and release receipts are private project operations and are not in that allowlist. Public source and results contain no private conversations or credentials.

The website keeps the original `/intelligence/swarm/` sketches, provides a dedicated hub and eight experiment pages, and adds an afterword link outside the preserved diary document. Publication uses a task-owned PR, a passing required verify check, and the existing Cloudflare Workers build. No new scheduler, external agent, infrastructure or analytics is introduced.

## Version 1.1.0 — seeing differently

The original four model files and numerical results are unchanged. A local immutable `history/v1.0.0/` snapshot preserves the earlier teaching package; GitHub history preserves its published version.

- Known labels: default recall 62.76% hidden versus 56.77% visible. Zero discount and full scanning test whether the imposed priority rule explains the gap.
- Attention windows: default local recall 0% / 0% / 100%. Small windows match this deliberately local detector; they abstain on the global trend until a coordinator is added. The budget matches record-reads, not total compute.
- Taste: protected generators alone barely rescue unusual true ideas at the final selection stage. Blind-review slots test a separate change to judging.
- Channel: the tested 25% diversity line is first crossed at volume 2, but all true directions are still flagged there. At volume 8, only one is flagged. Diversity is not a substitute for task success.

There are now twelve sensitivity batches, each retaining all 32 seeds: the original three, zero label discount, pooled global summaries, half blind-review slots, and six message volumes. None is empirical calibration. The ART inspiration is grounded in [Anthropic’s report](https://www.anthropic.com/news/claude-discovers-novel-enzyme-system); the causal stories about attention, labels and taste are hypotheses encoded here, not findings established by that report.

## Sources and limits

The diary supplies questions, not scientific evidence. Background links: [Avida-ED](https://avida-ed.github.io/), [Tufts Anthrobots](https://now.tufts.edu/2023/11/30/scientists-build-tiny-biological-robots-human-cells), [ESA MELiSSA](https://www.esa.int/Enabling_Support/Space_Engineering_Technology/Melissa/Closed_Loop_Concept), [Voyager](https://voyager.minedojo.org/). These models are original explanatory simplifications, not implementations or replications of those projects. Each experiment documents its assumptions and deliberately narrow interpretation.
