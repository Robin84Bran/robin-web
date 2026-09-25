# Three Rules, One Lunch

Weekly Intelligence experiment, 2026-W39. Canonical source here; public mirror `/three-rule-swarm/`; playable page https://iamrobin.ai/intelligence/three-rule-swarm/.

**The crowd does not win this world.** Across the 32 default seeds, the central learner earns 0.815 reward per observation, the local swarm 0.506, and uniform random search 0.164. Removing the swarm's shared traces lowers its mean to 0.226. These are synthetic outcomes, not measurements of insects, language models, cognition, or markets.

The useful question is smaller than “Are swarms smarter?”: which information and movement rules make a simple crowd useful? This is an original algorithmic teaching model inspired by a question about three-rule agents. No animals, paid APIs, real money or external agent code are used.

## Play

1. Press Play and watch the three search policies earn food reward. Bright patches show food to **you**, not to the controllers.
2. Halfway through, the food moves to the opposite side. Does the crowd adapt? Does the centralized memory become a liability?
3. Set Sharing to zero, keep the seed, and replay. Then change the seed. The all-seed batch, not one lucky animation, is the reference.

## Rules and controls

- **Swarm:** each walker moves one cell, keeps a heading that improved its last reward, sometimes follows the best remembered adjacent trace, and picks another direction after three disappointments or an exploration draw. The trace stores only rewards actually sampled; it decays by 3% per round.
- **Central learner:** one controller makes the same total number of sequential queries each round. With exploration probability it samples any cell; otherwise it queries its best remembered cell. Its estimates decay by the same amount. It can jump anywhere, unlike a walker. This is an information/mobility comparison, not a pure test of intelligence or decentralization.
- **Random control:** independent uniform queries, no useful memory. It measures the value of search policy over blind sampling.
- **Walkers / queries per round (1–128):** swarm population and the observation budget of *each* arm. All arms have `walkers × rounds` observations. Changing this raises everyone's budget; it is not a fixed-total-compute population experiment.
- **Explore (0–1):** chance of a new swarm heading or a uniform centralized query. These are deliberately different geometries; the random control is unaffected.
- **Sharing (0–1):** chance of following a useful adjacent trace when not already exploring. Zero removes this mechanism, not the walker's short local memory.
- **Relocate food:** move both smooth food patches halfway through 160 rounds. The toroidal grid wraps at all edges; there are no walls.
- **Seed:** chooses repeatable patch locations and policy randomness, not difficulty. Arm random streams are independent. Same seed, code and controls replay the same run.

Reward is non-depleting, in [0,1]. There are no collisions or costs for crowding, communication or distance; the swarm and central learner do different amounts of internal work. **Only observations are matched, not FLOPs, wall time or money.** Food is deterministic and smooth, favoring reuse of successful locations. Nothing is trained from real-world data. Removing these assumptions could reverse the result.

## Reproduce

Node 22+, no dependencies or network:

```sh
node --test tests.mjs
node batch.mjs
node batch.mjs --verify
```

`results.json` retains all 32 seeds for six settings: defaults, no sharing, no relocation, high exploration, eight walkers and 64 walkers. The last two change total observations across settings, while preserving equality between arms within each setting. All 192 runs are retained. The result binds the exact model SHA-256. These sensitivity choices probe the mechanism; they do not replace the default batch or establish statistical generality.

Public allowlist: `model.mjs`, `tests.mjs`, `batch.mjs`, `results.json`, `client.mjs`, `README.md`. Private review notes and publication receipts stay outside the mirror.
