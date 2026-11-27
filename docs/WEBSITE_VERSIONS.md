# Website version history

Keep this tracker append-only. Every future website upgrade adds a dated version
record here in the same source branch: what changed, the baseline or parent,
review/approval status, pull request, and verified deployment receipt when released.
Keep reviewed source and this record in the local RobinOS2 website worktree and
on the existing GitHub repository. Preserve Git history and earlier records.
A preview record establishes a reviewable revision; a release record establishes
only the production state supported by its actual receipts.

## 2026-11-27.1 — Homepage narrative and discovery (preview)

- Status: **PREVIEW — awaiting Robin's review; production deployment held**.
- Branch: `codex/homepage-20261127`.
- Baseline main commit: `70747c319a8e800b4e30f954ac8c7f561738c901`.
- GitHub profile: `https://github.com/robin84bran`; shared profile references agree.
- Move the existing “Read About Robin” link into the opening name/portrait section.
- Replace Now with Robin's supplied English and Simplified Chinese editions;
  retain the Chinese literary title and closing emphasis, and provide a faithful
  Traditional Chinese rendering through the existing owner-copy language layer.
- Keep the existing Past section, eight doors, portrait, motion, routes and
  automatic Japanese display-translation behavior.
- Formatting repairs: normalize pasted spacing, decode HTML paste artifacts,
  repair `https:/www.isuntv.com` to `https://www.isuntv.com`.
- Let the longer Now story use a readable column below the existing illustration.
- Previous source remains recoverable from the baseline and the commits below.
- Production approval, merge, Workers Build and live receipt: **pending**.

## Earlier homepage revisions — imported from existing Git history

These entries record existing source history, rather than new release claims.
Their full immutable revisions remain in Git locally and on GitHub. The rest of
the website's historical upgrades remain in the repository's existing commit
history and the original README sections; this tracker preserves both.

| Date | Source revision | Existing change |
| --- | --- | --- |
| 2026-11-11 | [0084555](https://github.com/Robin84Bran/robin-web/commit/0084555b3609b9b002a04cd499f362def4b85771) | Build private Intelligence library and connected Research programme |
| 2026-09-30 | [dfa4b5d](https://github.com/Robin84Bran/robin-web/commit/dfa4b5dacf301c13e3b751eda1aa4489d602a4ab) | Publish owner-approved Chinese homepage copy with same-page language support |
| 2026-09-25 | [6fdafe3](https://github.com/Robin84Bran/robin-web/commit/6fdafe3027a037522c5f108e714c351d883a66fc) | Refine homepage Now copy and add five-paragraph Past (#51) |
| 2026-09-24 | [13257cf](https://github.com/Robin84Bran/robin-web/commit/13257cf30a7eff3395540d1fa6164bfd8b8bd1c2) | Refresh homepage around entrepreneurship and current iSunTV work (#38) |
| 2026-08-30 | [bee6833](https://github.com/Robin84Bran/robin-web/commit/bee6833e7dda8f2aebb11ca032f03a2fc7b8a498) | Refine homepage Ouroboros portrait dial |
| 2026-08-30 | [3c6d70f](https://github.com/Robin84Bran/robin-web/commit/3c6d70fe2c8fcc3531b3286ba75a465570681a5b) | Refine English mobile homepage identity spacing |
| 2026-08-29 | [f604775](https://github.com/Robin84Bran/robin-web/commit/f604775dc8feeb59fd002414d7daaa30c7bedb89) | Refine English mobile homepage composition |
| 2026-08-29 | [dcebff6](https://github.com/Robin84Bran/robin-web/commit/dcebff698ec32cf9b1b176ac8409f52b713427f5) | Publish multilingual Network and finish SEO cleanup |
| 2026-08-28 | [d3fbca6](https://github.com/Robin84Bran/robin-web/commit/d3fbca68fbfd3cfa203d8cbdd2440bb872ef7356) | Refine identity loop and sakura motion |
| 2026-08-28 | [34beefc](https://github.com/Robin84Bran/robin-web/commit/34beefc8ebea775829868e5b700893e11294b939) | Refine identity portrait and Ouroboros journey |
| 2026-08-28 | [43e00f4](https://github.com/Robin84Bran/robin-web/commit/43e00f488013401d5e3581776e2b19902e035ae5) | Restore multilingual identity and SEO |
| 2026-08-24 | [e1bc3e8](https://github.com/Robin84Bran/robin-web/commit/e1bc3e8403e3799580b0a2a4bfc66cc67ff4f04c) | Organize Binary Blog lanes and automate pipeline visibility |
| 2026-08-22 | [6ff1496](https://github.com/Robin84Bran/robin-web/commit/6ff1496c6c5d160f7f454734d9a38bdcdb5ca523) | Add Meaning diary intake surface and mobile polish |
| 2026-08-22 | [7ae923d](https://github.com/Robin84Bran/robin-web/commit/7ae923d16b6ea9c074242db64746fa6ff197f868) | Publish Aug 22 Ouroboros and authored blog editions |
| 2026-08-21 | [a79831c](https://github.com/Robin84Bran/robin-web/commit/a79831c85069c9bf1cc916c912116323d929fdd3) | Make Portfolio orbits vertical on mobile |
| 2026-08-21 | [b532d17](https://github.com/Robin84Bran/robin-web/commit/b532d1726326ed768145ba2f99cd7f3d6f837294) | Add Ouroboros daily action flows |
| 2026-08-21 | [7b20e6e](https://github.com/Robin84Bran/robin-web/commit/7b20e6e5e3fe9eb79cb5782c0e482bc3d859e79b) | Refine Ouroboros archive and publisher typography |
| 2026-08-20 | [cf237f7](https://github.com/Robin84Bran/robin-web/commit/cf237f7ff57de5e9f423b3299ff4bbfc2d577a2a) | Release iamrobin.ai Website v2 |


## 2026-11-27.2 — Approved regular-weight homepage and Japanese edition

- Owner approved the preview and requested production deployment on November 27.
- Prior preview source: `1c79d921cad8da37ab255bf8b05cac0780d80c14` (record .1 retained).
- PR: https://github.com/Robin84Bran/robin-web/pull/365.
- All homepage text uses regular weight in English, both Chinese editions and Japanese;
  destination links remain links. Earlier Now emphasis tags are removed.
- Japanese Now uses Robin's supplied seven-paragraph text, including its full ending.
  Remove only the pasted bold markers around たい and normalize pasted spacing.
- The Japanese native homepage uses the shared layout and owner-copy language packet;
  the globe preserves the supplied text during same-page language changes.
- English and Chinese narrative wording remains the approved version.
- Existing public routes, weekly experiments and Open Council workflows stay intact.
- Production release follows required verify, protected merge, Workers Builds and
  exact live-source checks. The verified release event is recorded separately.
