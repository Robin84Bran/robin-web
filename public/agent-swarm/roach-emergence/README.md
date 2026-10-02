# Roach Emergence

Four policies share the same bodies, planar world, nest compass, obstacles, energy, and noisy eight-unit food sensors. The question is whether local signaling repays its costs when resources can actually run out.

- **Independent wander:** correlated random walk, reacts to nearby food, returns loaded cargo.
- **Local memory:** retains its own observed patch availability for 100 ticks.
- **Fading local traces:** the same local memory plus a short-range gradient of fading environmental marks left by returning bodies. It pays for deposition even when trace strength is zero.
- **Pooled observations:** a coordinator receives the same local observations, charges energy for their transport, and spreads assignments using only this stale observed map. It has no global stock query. Links are instantaneous in this experiment.

Food is depleted on physical contact and counts as useful output only after its carrier returns to the nest. Death loses carried food. Walls reject movement; local contact detours can be inefficient. Crowding slows movement. A hazard corridor can damage bodies, and energy is a hard budget. Marks can attract traffic toward obsolete routes; the trace rule is an experimental mechanism, not an optimization guaranteed to win.

The visual scene is an illustrative 3D projection of a 100 × 70 planar model. Food sensing has missed observations and coordinate error. Ideal self-localization and nest direction are declared conveniences. Chemical diffusion, biological metabolism, 3D locomotion, perfect collision avoidance, and real cockroach behavior are not modeled. Trace cells are scalar environmental memory; visible traces show actual model state.

## Frozen comparison and criteria

Model version 1.0.0 is evaluated over the same 24 seeds in five predeclared regimes: abundant, scarce, hazardous, relocating food, and lost traces. No winner is required for acceptance. Engineering acceptance requires exact deterministic replay, food conservation, no wall crossings, finite state, bounded energy, and identical summaries with recording off.

The primary outcome is **food delivered**. Secondary outcomes are delivery per energy, coverage, mortality, stale/duplicate visits, signal energy, and crowding. Paired bootstrap intervals compare each arm with independent wander. A positive interval is conditional evidence within that specific synthetic regime, not a universal claim about swarms. Trace-vs-memory comparisons must also inspect the paired outputs; a trace implementation with worse outcomes remains useful counterevidence and is not silently tuned away.

Each arm has equal population and initial energy in a controlled run. Population sliders deliberately scale the total budget: 100 bodies are not being presented as an equal-spend comparison with one body. Signals incur modeled energy rather than an invented dollar cost.

## Commands

```sh
npm test
npm run batch
npm run verify
```

`model.mjs` runs without Node-specific imports in the browser. `batch.mjs` saves deterministic summaries, means and paired intervals to `results.json`; `--verify` recomputes the full saved evidence and model SHA-256. Source observations are synthetic; no external data, paid model calls, or private conversations are embedded.
