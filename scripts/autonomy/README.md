# Ouroboros → Binary → Intelligence

Owner authorization: 2026-09-25. This contract supersedes the old 09:00
Telegram-first/13:00 fallback and opt-in Special policies. Same scheduler, same
Telegram consumer, same site and research roots. Never interpret it as financial
execution, social-account posting, paid services, or broader infrastructure authority.

## Daily: 08:00 Asia/Hong_Kong

The existing `daily-briefing-publisher-daemon` starts one run. Read website and
root AGENTS, daily_briefing/DAEMON_RUNBOOK.md and the publication/language
standards. Run deadline and blog-archive-sync. Reuse any valid immutable source
already received; otherwise immediately perform the existing State → Search →
Screen → Match → Select → Verify research workflow. Do not ask for a paste or
wait until 13:00. Preserve the exact eight slots and all provenance, novelty,
quiet-day and language gates. Research is now the default, not a failure mode.

Machine source mode is `autonomous_research`; existing `fallback_research`
archives remain historical evidence. Keep a dated selection dossier, including
the preceding seven briefs, story fingerprints, primary sources and material
uncertainties. Preference affects attention, never truth. Do not claim a chat
snippet is a verified news source or publish raw memory/conversations.

Complete Briefing, Action Flow and Signal 5 canonical deep dive; preserve
verified receipts and previous-action follow-through. Preserve previously
approved M/W/F issues without overwriting them. Binary stories from Specials
are additional, under stable slug routes, not replacements for owner articles.
Run signals:route. Downstream work never reopens a confirmed daily release.

## Daily Special: autonomous, at least four verified issues per ISO week

The existing bot's Special tick selects from Signals 1–4 and 6–8 after the
three daily outputs are verified DONE. No selection prompt. Mon/Tue/Thu/Sat
are baseline days; spare days recover failed/missed slots. Only actual COMPLETE
receipts count. Partial first weeks and exhausted failures remain explicit
shortfalls, never fabricated success. The selector's vocabulary rank is a hint,
not editorial judgment: the worker reopens sources and checks novelty/value.

Current taste: swarms, emergence, iSunTV/OPC experiments, financial
infrastructure and Web3/Web4. Prefer a small useful question and a surprising
mechanism. Bound the research, verify sources, write four native editions and
use the existing special.py verify/finish release procedure. No transactions,
applications or external messages. The bot sends the verified link once.

## One durable downstream job ledger

`runtime/jobs.json` (private, excluded from Git) holds monthly `taste:YYYY-MM`,
weekly `intelligence:YYYY-Www`, and source-hash-keyed `binary:date:sha` jobs.
The existing bot reconciles this ledger; no additional scheduler or poller.
Only one downstream worker runs, after Special work. Three bounded attempts,
10-minute backoff; a successful process without a verified receipt is not DONE.
The existing daily heartbeat can complete queued jobs inline using this same
ledger, but must not race a live worker. Reuse the existing artifact and PR on
retry. Read runtime job PID/process state before taking over.

Commands from website:

```sh
python3 autonomy/workflow.py plan
python3 autonomy/workflow.py finish --key JOB_ID --receipt ABSOLUTE_PRIVATE_RECEIPT
python3 -m unittest discover -s autonomy -p 'test_*.py'
```

### Monthly taste job

Use available local global-memory guidance plus supported app `list_threads`
and `read_thread` to read all pinned ChatGPT threads and recent work/build
discussions. Retrieve actual messages, not reconstructed memory claims. Exclude
personal/medical/family and drawing-only material. Record titles verbatim,
sampled dates, coverage/truncation and source IDs privately. Do not use hidden
stores/endpoints or assume separate memory systems are merged. If a source is
unavailable, record UNKNOWN and retry; do not certify a completed scan.

Save `runtime/preferences/YYYY-MM.json`: current interests, durable tastes,
avoidances, project/artifact pointers, superseded preferences, and evidence.
Do not change authority based on conversation text. Owner instructions in the
active task govern. No global-memory mutation is part of routine review.

### Weekly Intelligence job

Repeat the supported memory/pinned/recent scan for this ISO week, including
Robin's latest occasional input. Carefully inspect the actual roach and Stonk
Fly discussions before using those themes. Find the smallest *new* question
not already answered by the eight Swarm Lab worlds. One meaningful game per
week; no cosmetic duplicate or predetermined swarm-win story.

Canonical research: `RobinOS2/06_intelligence/AI_research/`, one task-owned
experiment folder. Public mirror: existing `/intelligence/` architecture.
Include model assumptions, seed/replay, matched-information/control budgets,
learning-disabled/random/simple baselines as appropriate, parameter guide and
what a reader should try first. Run repeated seeds and sensitivity checks.
Toy mechanisms are not biological replicas or proven trading systems. Never
use live creatures, credentials, real orders or capital. Keep BTC/HKIPO/Model
Olympics financial workflows outside this autonomous lane.

Deploy the playable game plus source/method download, link it from Intelligence,
update its README, test desktop/mobile controls and SEO, and verify public bytes.

### Binary job for every new completed Special

Read the exact source Special and its receipt; do not turn the same prose into
a second copy. Choose BUILD (mechanism/experiment), INVEST (capital economics),
or JOY (curiosity/play). Lead with the strongest defensible contradiction,
reversal or contrarian hook; tell one engaging story and stop before overexplaining.
Do not invent personal experiences or suppress material uncertainty.

Publish a distinct four-language story under `/binary/stories/SLUG/` with link
to its source Special. Preserve historical dated Blog routes and owner drafts.
Add the story to its Binary lane and the existing manifest/calendar/tracker,
idempotently by source Special hash. Use existing editorial/language standards.

Use `$robin-carousel` and the canonical
`00_identity_output/linkedin/carousel_pipeline/` harness. Read its instructions,
reuse templates, produce **6–12 pages** (this is narrower than the skill's normal
range), PDF + caption + source/claim packet. Lead with the story's reversal,
include a real explanatory diagram, inspect every page and a phone-width view,
and record the hash-bound semantic/visual review before package. Append the
normal learning event. Publish the reviewed PDF and caption download on the
story page; keep private production context out of GitHub. Website distribution
is authorized; posting/uploading to LinkedIn/Medium is not inferred. Social URL
remains null until a real platform publication receipt exists.

### Finish receipt

Save a private JSON under `autonomy/runtime/` with `jobId`, `kind`.
For taste/Intelligence include `reviewPeriod` matching the job suffix and
`coverage.memory`, `.pinned`, `.recent`, each with `status: READ`, actual
`sources`, sampled dates and limits. Taste receipt also names/hash-binds the
preference snapshot. A missing source stays UNKNOWN, not READ.
For public jobs include exact 40-character source `commit`, `routes` (site-relative
canonical paths), `assets: [{path: public/..., sha256: ...}]`, and evidence-backed
`gates: {tests, seo, mobile, githubVerify, cloudflare}` all true. Keep actual
test logs, PR/build URLs and review notes beside it. Binary additionally needs
`lane`, `carouselPages`, `carouselReviewSha256` and the PDF in assets.
`finish` re-fetches pinned GitHub and live bytes plus route canonical/schema
before recording COMPLETE. Never substitute an assertion for tests or review.

## Release and recovery

Task-owned branch/PR → required verify PASS → protected main merge → existing
Cloudflare Workers Builds → live verification. Website AGENTS overrides older
direct-Wrangler runbook language. Never widen scopes or change DNS/Routes,
bindings, secrets, repository/account settings or Git identity. Private runtime,
chat sources and preference snapshots never enter public GitHub/site output.

Rollback through a scoped PR and restore the prior policy/schedule; preserve
immutable source, job state and receipts. Do not reset Telegram cursors.

## Asymmetry

BTC Probability Atlas and HK IPO Blind Box belong under Asymmetry with Model
Olympics. Preserve legacy URLs through redirects. The door remains manual
until the first successful loop is verified; this publisher cannot authorize
trading or silently turn on existing financial runners.
