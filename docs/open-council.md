# Open AI Council · 22 October 2026

Owner-approved public discussion: `/intelligence/council/autonomous-engineering/`.
Discoverable from `/intelligence/` and the XML sitemap.

## Editorial contract

- Preserve Teddy's opening, Robin's four actual positions, and the independent
  Claude and Grok replies. The existing Teddy follow-up is expandable and was
  not used to prime the independent respondents.
- Leave Gemini's seat and positions open. No substitute response, invented vote,
  council consensus, ranking, or forced final conclusion.
- Keep forecasts and proposed experiments open to challenge. Public source links
  and qualifications accompany the transcript; private chat links, account
  details, prompts and operational receipts are excluded.
- Markdown source text is preserved from the approved reading edition, with
  terminal whitespace normalized. Heading levels are adjusted only for the
  containing page. Transcript hashes are pinned in the regression test.

## Interaction contract

Four optional radio groups and an optional question prepare copyable text in the
reader's browser. There is no vote submission, aggregate tally, remote storage,
AI call, or backend. Values are written as text, never interpreted as HTML.
Incomplete choices remain `not chosen`. Reloading clears the exercise.
The shared globe menu provides the existing same-page translation; form inputs
and prepared replies are excluded from translation.

## Verification and release

`pnpm run release:check` includes `scripts/tests/open-council.test.mjs` after
the build: source integrity, incomplete choices, Unicode/text safety, rendered
controls, empty Gemini seat, privacy, navigation, canonical URL and sitemap.
Run `pnpm audit --prod` as well. Check mobile and desktop controls in a browser.

Publish through a task branch and protected PR with GitHub `verify` passing.
The existing Cloudflare Workers Build publishes merged main. Verify the live
page and `/council/reply.mjs` against the tested build before reporting success.
Do not change account settings, DNS, bindings, or unrelated content.

Recovery: revert the scoped council commit through the same protected workflow.
