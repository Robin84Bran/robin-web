# Phase 2B findings — Sparse 100 × 100 navigation

Phase 2B is a navigation and coverage-infrastructure pass. It does **not** add
new commercial relationships, infer sectors for previously unresearched
companies or claim that the full 100 × 100 space has been investigated.

## Result

- Frozen Nasdaq-100 issuers selectable: **100**
- Frozen HKEX Core-100 issuers selectable: **100**
- Possible cross-universe pairs: **10,000**
- Verified relationship cells: **41**
- Sourced coverage: **0.41%**
- New speculative edges added: **0**

The original **20 × 20 core**, the selective **21 × 23 Phase 2A map** and all
**41 sourced relationships** remain unchanged.

## What the explorer adds

The full-universe explorer supports:

- search by issuer name or symbol;
- core, Phase 2A and not-yet-mapped provenance;
- known-sector filtering without guessing sectors for non-pilot companies;
- capability-class, evidence-grade and relationship-age filters;
- an “only issuers with verified edges” view;
- direct selection of one Nasdaq issuer and one HKEX issuer;
- a clear route card when a verified relationship exists;
- a warning when a verified route is hidden by active filters;
- an explicit `NOT_ESTABLISHED` result when no direct route is in the ledger.

Selecting a company from either frozen list also places it into the direct-pair
checker. Verified routes can be opened in the existing source-and-policy detail
panel.

## How to interpret 0.41%

The 0.41% figure is **evidenced coverage**, calculated as:

```text
41 verified cross-universe cells ÷ 10,000 possible cells
```

It is not:

- the actual share of companies with commercial ties;
- a decoupling score;
- evidence that the other 9,959 pairs have no relationship;
- a completeness estimate for indirect, subsidiary or private-company routes.

Corporate disclosure is selective. Many economically important relationships
run through subsidiaries, distributors, foundries, contract manufacturers or
private companies outside the two frozen universes.

## Why the graph was not expanded to 200 nodes

A 200-node force or bipartite graph with only 41 verified edges would turn
absence into visual noise. The readable graph therefore remains scoped to:

- the frozen 20 × 20 core; or
- the selective 21 × 23 Phase 2A expansion.

The 100 × 100 layer is a sparse navigator and deterministic matrix export. This
preserves both readability and epistemic honesty.

## Durable export

`data/relationship_matrix_full_100x100.csv` contains all 10,000 candidate cells.
Cells contain relationship IDs only when the evidence ledger establishes a
direct pair. Blank cells mean `NOT_ESTABLISHED`.

## Phase 2B conclusion

The map can now answer two different questions without conflating them:

1. **What sourced relationships can we inspect today?** — the graph, selective
   matrix and ledger.
2. **Where does any issuer sit inside the frozen research frame?** — the sparse
   100 × 100 explorer.

The next research work should improve dependency quality and policy-shock
analysis, not cosmetically fill blank cells.
