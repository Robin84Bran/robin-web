# IAmRobin.ai Content & Distribution — One Action

Robin's daily loop: at 20:30 Asia/Hong_Kong, the existing private Telegram bot
asks whether she completed one content or distribution action. It offers one
small step grounded in a due, published AI article. Tap **Done** or **Carry
forward**. No answer leaves the action open. Nothing stacks up.

- **Done** records Robin's self-report and ends today's check-in.
- **Carry forward** keeps the same action for tomorrow. After two carries the
  suggestion shrinks. A smaller draft counts as its own completed step; it is
  not evidence of public distribution.
- `/one_action` shows today's action; `/one_done` and `/one_carry` work without
  buttons. `/one_done <what I actually did>` records a different completed
  action while preserving the unfinished suggestion.
- Plain `Done` or `Carry forward` works while today's prompt is open, outside
  Daily Briefing intake. Buttons and explicit commands also work during intake.
- Old buttons never complete a new day's action. Repeated clicks are idempotent.

The progression reuses existing material: a three-sentence AI explanation,
one angel-investor diligence question, then one small distribution action.
Only due packages with `DONE`/`PUBLISHED` evidence and a canonical iamrobin.ai
article URL qualify. Unpublished, future, and unrelated topics are skipped.
No suitable source means one sentence about Robin's existing AI work, with no
invented publication or claim. There is never more than one open action.

## Ownership and runtime

Source and private progress live in the existing website project under
`content_checkin/`. Source is mirrored into the same `Robin84Bran/robin-web`
repository under `scripts/content-checkin/`. Runtime is excluded from Git and
the website. Progress survives a bot restart in `runtime/state.json` (0600),
with a lock, atomic replacement, action history, per-day state, delivery
receipts, and processed-update receipts. Invalid state fails visibly in the
bot's secret-free log rather than erasing progress.

The existing `volatility_lab_bot` calls `OneAction.tick(bot)` once a minute
inside its normal loop and `OneAction.handle(bot, update)` after chat/sender
authentication and write-ahead capture, before Daily Briefing extraction.
`getUpdates` includes `callback_query`; no second poller or recurring job is
created. The adapter supplies `daily_root`, `chat_id`, `call_api`,
`configured_chat_matches`, and `configured_sender_matches`.

The scheduled window is 20:30–22:59 HKT. Active source intake defers the prompt;
restart catches up within that window. Missed days do not generate a backlog.
Delivery is persisted before sending. An uncertain network result remains
`UNKNOWN` and suppresses automatic duplicate nudges; `/one_action` retrieves
the saved action. Confirmed receipts remain inspectable. Progress saves before
acknowledgment, so a failed acknowledgment cannot erase a completion.

This is separate from Signal 5's automatic Action Item article and research
candidate pool. An automatically published article does not claim Robin did
today's personal action. No automatic LinkedIn/Medium posting, outreach,
investment execution, or public exposure of private progress is authorized.

Run `python3 -m unittest discover -s content_checkin -p 'test_*.py'` from the
website directory. In robin-web use `scripts/content-checkin` instead.
To roll back, remove the bot's One Action hook and restart that same consumer;
retain the private state. No website layout or public-content change is needed.
