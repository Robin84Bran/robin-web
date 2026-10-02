# Minimum Intelligence — a hundred bodies, how many minds?

This experiment records **real model decisions** and lets physics judge their usefulness. One `gpt-6-sol` planner coordinates a hundred bodies; ten independent `gpt-6-luna` calls each coordinate ten; a hundred separate Luna calls each plan one. Every team then executes a finite salvage mission with exactly one hundred identical bodies.

The language models do not run inside the public page. The page replays their recorded route cards in a deterministic synthetic environment. Model API keys, paid API calls, private conversations and credentials are absent from this repository and from the website.

## The actual pilot

The frozen protocol in `EXPERIMENT.md` preceded scenario calls and evaluation. Three world seeds (17, 42, 99) require **333 successful calls**: three Sol, thirty sector Luna and three hundred local Luna. Each invocation has its own empty temporary workspace and context, uses low reasoning effort, and receives only its allowed synthetic packet. Separate contexts do not establish statistical independence of the underlying service, and three seeds cannot establish general scientific superiority.

The transport is Codex CLI 0.160.0 with existing subscription authentication, inherited user configuration and project instructions disabled, a short decision-specific instruction file, read-only sandbox, no browser/apps/search/shell/multi-agent tools, JSON schema output and rejection of any observed tool event. Up to eight invocations run concurrently. Format/transport failures are retained and receive at most one retry. Valid model decisions are never replaced or repaired using a rule controller.

Model aliases are exact requested identifiers. The CLI does not expose an immutable underlying model snapshot; that field remains `null`. The actual campaign records alias, CLI version, reasoning effort, prompt/instruction/protocol hashes, clean synthetic observations, clean responses, usage, elapsed time, retries and tool-event rejection. Session UUIDs, local private paths and credentials are excluded.

## Information is part of the comparison

| Planner | Calls per world | Controlled bodies | Observations |
|---|---:|---:|---|
| Local rule | 0 | 100 | Each body’s own initial local readings |
| Pooled assignment rule | 0 | 100 | Aggregated union of the same local readings |
| Sol pooled planner | 1 | 100 | Same pooled packet as the pooled rule |
| Luna sector planners | 10 | 100 | Each sector’s ten bodies and their aggregated readings |
| Luna local planners | 100 | 100 | Each body’s own local packet, same as local rule |

All planners know site coordinates, their permitted body positions, the base and physical rules. Their readings are noisy estimates of stock, quality and hazard; no true state, environment seed, future outcome, other independent planner’s decision or evaluator feedback enters a prompt. The Sol versus local-Luna comparison changes both architecture and information access. The same-information rule controls are needed to interpret it.

Local rules use estimated value, risk, distance and a conservative default for unseen depots. The pooled rule adds explicit reservation of estimated stock while assigning bodies. It is a substantive coordinated baseline, not random behavior designed to lose.

## The physical world

Twenty depots contain finite stock, with hidden quality and hazard probability. Couriers move at 1.5 distance units per tick, start with 120 energy and carry at most four units. Movement costs energy. Depots have two simultaneous loading positions and three-tick service; congestion causes waiting and eventually a route advance. Hazards consume energy and the attempted unit. Cargo counts only when returned to base, where unloading takes three ticks. Empty sites trigger a route advance. A low-energy body attempts to return to base using the common execution controller. Dead bodies cannot work.

The language model chooses only an ordered list of three depots. The same low-level execution logic handles motion, loading, empty depots, waiting, returning and exhaustion in every arm. It follows the list cyclically and never asks the model to replan. Initial true stock equals harvested units plus remaining stock plus shock-destroyed stock. Harvested units equal delivered cargo plus carried cargo, lost cargo and hazard-destroyed units; the tests enforce both identities.

The baseline world described to the models has 240 ticks, low motion disturbance and two loading positions. Additional modes replay the **same decisions** with stronger motion disturbance, a mid-mission stock loss, or one loading position. These modes test the robustness of frozen plans. They are not new inference, adaptation, or evidence that a model detected a change.

The 3D sketch illustrates the two-dimensional world. Depot height represents remaining stock and body height represents carried cargo; it is not 3D mechanics or a real robotic deployment.

## Replacement sweeps and costs

The mixed teams retain 50, ten or one of the hundred genuine local Luna decisions. A seed-keyed body ranking chooses the subset; remaining bodies follow their original local-rule cards. Zero Luna is the local-rule baseline. These are controlled ablations of existing decisions, not new independent model runs. Only the selected original call receipts are attributed to each mixed arm; do not sum all sweeps and counterfactuals as separate campaign expenditure.

Record full input/output/cached/reasoning usage, including CLI/runtime prompt overhead. `modelCallWallMs` is the sum of successful invocation latencies, including transport overhead. `CAMPAIGN.json` separately records actual eight-worker scheduler wall time. Neither quantity is a simulator tick or an equal-deadline benchmark. Retried attempts are counted separately from successful attribution.

Actual subscription dollars are unavailable, so `actualDollars` is **null**. Equal-dollar frontier and equal-deadline superiority remain **UNKNOWN**. Zero direct API billing is not a claim that model inference has zero cost.

## Evidence and commands

Node.js 22 or later runs every model, test and replay with no package dependencies. The model campaign additionally requires the exact authenticated CLI version; normal visitors and tests never need it.

```sh
npm test
npm run batch
npm run verify
```

`results.json` separates three genuine model world seeds from a 24-seed × four-regime **rule-only** invariant sweep. Counterfactuals and mixed arms reuse original tapes. Every model-seed paired outcome is retained; means are descriptive and no three-seed confidence interval is dressed up as proof. The frozen practical screen requires a model to beat its same-information rule in all three seeds and by at least 10% in mean delivered value. The sparse knee requires at least 95% of full local-Luna value in every seed, first checking whether zero Luna already qualifies.

For a deliberately authorized fresh model campaign, `npm run models` resumes immutable successful receipts rather than making duplicate calls. It expects CLI 0.160.0 on `PATH`, or an explicit `SWARM_CODEX_CLI` executable path. `npm run assemble` verifies observation hashes and builds `tapes.mjs` plus `MODEL_RECEIPT.json` solely from genuine valid receipts. A partial campaign may be inspected with `node assemble.mjs --partial`, but the final batch refuses to freeze incomplete model evidence.

`MODEL_RECEIPT.json` is the compact public receipt. The `receipts/` directory preserves each synthetic input, clean output and attempt usage. `EXPERIMENT.md` is immutable protocol evidence. Rerunning physical playback must reproduce exact saved results; rerunning a stochastic model campaign need not regenerate the same route cards.

## 中文说明

这是三个世界种子的真实模型试验：一次 Sol 统一规划、十次 Luna 分区规划、一百次独立 Luna 局部规划，总共 333 次有效调用。所有方案实际控制同样的一百个身体；各自只能读取获准的带噪声观察。确定性规则拥有相同信息，作为认真的比较对象。网页重播真实路线决定，不伪造实时模型或持续自适应。

50／10／1 Luna 的混合方案复用原始记录，属于消融，不是新的独立试验。旅行、装载拥堵、资源耗尽、能量和返程决定实际收益。美元成本与等预算优势保持未知；完整 token、延迟、重试与失败证据保留，规则也可以赢。
