# Complete-diary intake

The production Telegram bot remains the sole inbound consumer. This directory
mirrors its standalone diary bridge and the local publisher's completeness
gate for reproducible regression checks; it is not a second service.

1. Send `/diary_publish Title`, with the first body paragraph on the next line.
2. Paste the remaining batches. Each acknowledgment reports saved part and
   character counts. Closing Telegram or restarting the bot does not lose them.
3. Send `/diary_done` alone after the last batch. Only now is the source queued
   for the next 13:00 HKT diary publication batch.

New diary dates follow the first Telegram message's Hong Kong timestamp:
before 13:00 = today; at or after 13:00 = tomorrow. The bot displays the assigned
date in acknowledgments and `/diary_status`. Later parts, completion, retries
and processing delays do not change it. Existing entries are not redated.
Future-dated new entries remain outside today's publication queue.

`/diary_status` checks collection. `/diary_cancel` closes it as a retained private
draft. `/diary_draft` uses the same collection flow but never publishes.
There is no timeout-based completion and no new scheduler. Separate messages
are joined with a blank paragraph boundary; each original message is retained
verbatim with its checksum and update ID. The existing write-ahead inbox saves
authenticated transport before dispatch. Unrecognized text holds the cursor
for the existing recovery mechanism instead of silently skipping content.

The bot calls this bridge before Daily Briefing handling while a diary is active,
and suppresses check-in/Special reply interpretation during collection. It refuses
to start a diary while Daily Briefing intake owns the text channel. Private state,
transport envelopes, identities and receipts never enter this repository or site.

Run `pnpm run diary:check`. Tests exercise multi-batch text, restart-safe state,
duplicate delivery, interrupted completion, private drafts, authorization,
unsealed-publication rejection and first-batch-only corruption.

The September 7 and September 27, 2026 diaries received owner-supplied ending
corrections. Existing paragraphs and artwork are unchanged. Original intake
records remain archived privately; corrected source revisions have new hashes.

Held releases remain in the pending queue with their HOLD status intact. The
operator must inspect the retained candidate and resolve the failing gate before
advancing it. Discoverability does not authorize clearing a safety hold. The
existing private bot sends one preserved-content delay alert per held source;
delivery failure is retried without acknowledging it or interrupting intake.
