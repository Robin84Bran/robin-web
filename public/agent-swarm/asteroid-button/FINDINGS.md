# Findings — frozen model 1.0.0

Distribution improves average absolute output in these synthetic worlds, but the large carrier is substantially more energy efficient in the calm clustered case. Shared geography still produces catastrophic zero-output tails for distributed fleets. No fleet is universally preferable.

Twenty-four paired seeds per regime; mean total material delivered:

| Regime | One large | 24 small | Mixed fleet |
|---|---:|---:|---:|
| Calm clustered bulk | 300.00 | 320.00 | 320.00 |
| Independent body loss | 241.67 | 301.88 | 308.75 |
| Shared spatial scar | 108.33 | 202.50 | 193.54 |
| Compound catastrophe | 170.83 | 188.54 | 193.96 |
| Isolated radio silence | 300.00 | 470.00 | 485.00 |
| Isolated resource loss | 210.00 | 269.00 | 282.50 |
| Isolated sensor corruption | 300.00 | 469.79 | 485.00 |
| Isolated rubble | 200.00 | 440.00 | 430.00 |

Calm work yields 0.133 delivered units per energy for the large carrier, versus 0.080 small and 0.089 mixed. Its slightly lower throughput buys materially better energy efficiency. Equal initial energy does not mean equal energy used.

Independent losses produce zero post-shock work in 9/24 large-carrier runs, versus 0/24 small and 0/24 mixed. The shared spatial scar produces zero post-shock work in 23/24 large, **11/24 small and 11/24 mixed** runs. Redundancy is not immunity to shared geography. The correlated regime also uses clustered geography, so its difference from the independent regime is not a one-factor estimate of correlation alone. The common damage field is identical across fleets within each paired run; its nominal area is not guaranteed realized mortality.

In compound catastrophe, mean post-shock retention is only 0.083 large, 0.135 small and 0.150 mixed, relative to each fleet’s own no-fault continuation. Small-versus-large total work improves by 17.71 units (paired bootstrap 95% interval 1.98 to 33.85); that modest average advantage coexists with zero post-shock work in 7/24 small and mixed runs. Recovery is censored unless a full 40-tick delivery window reaches 90% of the pre-shock rate; censored outcomes are never treated as fast recovery.

Radio silence has little effect on final delivered work in this model because local plans remain viable and own observations override absent peer reports. This is a negative control, not proof that communication never matters. Sensor corruption is similarly weak here because the shared static deposit map and physical loading contact preserve much of the task structure. Rubble has a larger effect on the frozen route policy. These differences help identify which additional environmental assumptions would actually make a harder experiment.

A pre-release liveness defect was discovered, preserved under `diagnostics/`, and corrected before freezing these results: partially loaded carriers need persistent return state. The same repair applies to every fleet, and a regression requires healthy carriers to complete deliveries in feasible worlds.

## 中文

在这些合成场景中，分散配置的平均绝对产出较高，但集中大载具在平静聚集场景明显更省能量：每单位能量送回 0.133 单位物料，小载具为 0.080，混合为 0.089。初始能源相同，不代表实际耗能相同。

独立失效时，大载具有 9/24 次震后零产出，小载具与混合均为 0/24；共同空间损伤下，小载具与混合也各有 **11/24 次震后零产出**。共同地理风险可以消灭冗余优势。这个共同损伤场景同时采用聚集资源，因此不能把与独立失效的差别全部归因于相关性。

复合灾难下，震后产出相对各自无灾难继续运行的保留率只有 0.083、0.135、0.150。小载具相对大载具的总产出平均多 17.71 单位，95% 配对区间 1.98–33.85，但小载具和混合仍各有 7/24 次震后零产出。无线电中断及传感器腐蚀影响较弱，暴露了已知静态地图、局部计划和物理接触反馈这些简化条件。它们是有意义的负面对照，不是“通信或传感器不重要”的结论。

发布前发现并修复了部分载荷返航状态的控制器缺陷；失败版本与结果保留在 `diagnostics/`，修复同样适用于所有配置，并有可行任务必须成功交付的回归测试。完整数据和限制见同目录文件。
