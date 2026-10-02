# Findings — frozen model 1.0.0

The simple trace policy does **not** earn promotion in this implementation. Local memory improves delivered food in the abundant, hazardous and relocating regimes, while its small scarcity advantage is uncertain. Pooling the same local observations improves delivery, but aggressive exploitation has a severe survival cost in the hazard regime. These are bounded synthetic results, not claims about biological swarms.

Twenty-four paired seeds per regime; mean food delivered:

| Regime | Independent wander | Local memory | Local traces | Pooled observations |
|---|---:|---:|---:|---:|
| Abundant | 50.88 | 57.54 | 39.79 | 69.33 |
| Scarce | 17.21 | 17.50 | 7.42 | 18.83 |
| Hazard corridor | 34.33 | 35.79 | 26.25 | 38.96 |
| Food moves | 42.96 | 45.50 | 32.63 | 61.33 |
| Trace disappears | 39.21 | 43.96 | 43.96 | 57.50 |

In abundance, memory adds 6.67 food versus wander (paired bootstrap 95% interval 4.75 to 8.50); the trace arm loses 11.08 (−12.96 to −9.29). Under scarcity, memory’s interval spans zero (−0.08 to +0.71). Disabling trace strength restores memory-like routing while retaining deposition cost, providing a causal ablation of the trace mechanism rather than a renamed policy.

The hazard regime exposes a real tradeoff: pooled observations deliver 38.96 food but lose a mean 33 of 40 bodies; local memory delivers 35.79 and loses 14.71. The trace arm loses only 3.58 bodies but delivers less food, partly because it remains concentrated on limited routes. Survival alone is not sufficient evidence of useful emergence.

The recorded environmental marks are actual internal trace cells. Their local attraction and stale persistence create crowding and discourage broader exploration. This mechanism is retained as counterevidence; no post-result parameter search was used to turn it into a winner. A future intervention could compare directional/repellent/expiry-aware traces under a newly declared test, preserving this baseline.

## 中文

这个简单的痕迹策略没有达到升级条件。局部记忆在食物充足、危险走廊及食物迁移场景提高送回食物量；在稀缺场景的小幅优势并不确定。汇总相同局部观察能提高产出，但危险场景平均损失 33/40 个体，局部记忆则损失 14.71/40。痕迹策略虽然少死，却送回较少食物；生存率本身不能代表有用的群体智能。

每种场景使用 24 个配对种子。充足场景中，局部记忆比随机探索多送回 6.67 单位食物，95% 配对自助法区间为 4.75–8.50；痕迹策略反而少 11.08。关闭痕迹强度后，路径恢复为局部记忆行为，但仍支付分泌成本。我们保留这个负面结果，没有为了制造 swarm 胜利而调参。完整数据、方法和限制见同目录 `results.json` 与 `README.md`。
