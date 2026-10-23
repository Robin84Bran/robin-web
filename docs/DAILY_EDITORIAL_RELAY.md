# Daily Action and Daily Special — human-readable editorial relay

Owner direction: 23 October 2026. Active for the next new daily editions, dated
24 October onward. Today's completed release and historical articles stay intact.
This supersedes older daily article length, rigid report-style opening/ending,
and forced investment-executive framing. It is not the Thursday Open Council,
the eight-signal Briefing, Action Flow, Binary calendar, Diary or evening check-in.

## The relay

1. **Codex: make the story intelligible.** Prepare a compact, coherent background
   narrative: who did what, when, why it matters, and what happened before it.
   Supply public primary-source links, dates, verified facts and material unknowns.
   Distinguish reported claims, interpretations, illustrative examples and actual
   tests. Do not pre-decide a moral or turn an open question into a safety manual.
2. **Teddy / ChatGPT: brainstorm and diverge.** Fresh standalone Chat mode in
   Robin's business account, preferred GPT-6-sol Instant when actually available.
   Record the visible model/mode; never claim an unseen backend identifier.
3. **Claude: hook and logic.** Pass Teddy's actual response plus the original fact
   packet. Find the interesting opening and a clear argumentative/story sequence.
4. **Gemini: engaging article.** Pass Claude's actual text plus the original fact
   packet. Aim for natural, human-readable prose, concrete background and a story
   worth following. No manufactured biography, quotes, facts or certainty.
5. **Codex: final factual audit, not a stylistic takeover.** Reopen load-bearing
   sources, check claims and links, repair unsupported certainty, and preserve the
   model's lively voice. Keep the audit outside the public essay. Translate the
   audited English canonical into the existing three complete native editions.

## Exact simple prompts

Teddy:
`those are the facts and resources, brainstorm and diverge for council discussion`

Claude:
`Organize the above into a sharp article with a strong hook and clear logic. No more than 3000 words.`

Gemini:
`Generate an engaging, natural-sounding blog from the below. Tell the story. No more than 3000 words.`

Append the source packet and previous actual output as clearly labeled material,
not additional long instructions. Do not force contrarianism, a conclusion,
governance framing, section quotas or a minimum word count. The published English
article body, excluding frontmatter, must be nonempty and at most 3,000 words.
Brainstorming has no word target. Shorter is fine; do not pad. If the final draft
exceeds the ceiling, request one simple shortening pass and audit it. Full
translations preserve substance; do not impose English tokenization on CJK.
Existing source, language, privacy, metadata and protected release gates remain.
Useful actions can emerge naturally or sit in a companion artifact; do not bolt
a monitoring manual onto every story.

## Access, recovery and truthful provenance

Use authenticated supported browser UI, fresh chats outside old project context.
This authoring permission does not authorize browser scraping of the upstream
pinned Daily Brief reference or hidden endpoints. Never copy credentials, alter
account settings, pay for upgrades, impersonate a provider, or bypass limits.
Try once, check the actual UI/account/session, then retry once on a transient
failure. If still unavailable, the next available model takes the missing role
before its own role. Example: Claude does brainstorming then hook if Teddy is
unavailable; Gemini can perform all three stages separately if both are absent.
If no later provider can complete a remaining stage, Codex completes that stage;
if all three are unavailable, Codex performs brainstorm → hook → engaging article.
Record actual authorship, attempts and limitations. Never let provider downtime
silently become a missing daily publication or invent a provider response.

Save the fact packet, exact prompts, unedited responses, URLs, visible model/mode,
timestamps, hashes, failures/fallbacks and final audit privately:
- Action: its existing private dated work folder, under `editorial-relay/`.
- Special: `daily_special/runtime/DATE/editorial-relay/`.
Use 0600 files/0700 folders, keep browser/chat evidence out of public GitHub/site
output, and organize completed chats in the existing provider Editorial Labs
after capture. Resume completed stages; do not repeat them on a publishing retry.
The final audit records each role's actual provider, final article hash, word
count, source checks and corrections. A plan or open browser is not a completed
relay. Publication remains owned by the existing daily/Special worker and locks;
no new daemon, consumer or schedule. Keep the 13:00 daily delivery deadline.

## Verification

`daily_briefing/bin/editorial-relay.mjs` exports the exact prompts, role-preserving
fallback plan and date-aware length checks. Its tests cover every provider
availability combination and the 3,000-word boundary. Historical Action gates
retain their old 2,000–3,500 range; newly authored editions use no minimum.

## 中文

Codex 先把背景故事、来源与事实讲清楚；Teddy 发散；Claude 抓住开头与逻辑；
Gemini 写成自然、有趣、读得下去的文章；Codex 最后核查事实，不把文风改回机器报告。
提示词保持简单，不设最低字数，英文成稿最多 3,000 词。失败核查并重试一次，
再由后续模型接替缺失环节；全不可用时由 Codex 分三步完成并如实记录。
保留真实原文与私密凭据记录，不伪造模型参与，不改写已经完成的历史版本。
