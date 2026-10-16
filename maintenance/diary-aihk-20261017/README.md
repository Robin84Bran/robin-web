# American in Hong Kong — owner-authorized update

Date: 2026-10-17 HKT. Scope: the September 7 Diary only.

- Attach Robin's unchanged `Robin_Xie_AIHK.pdf` after the article body.
- Preserve original English bytes, body SHA-256, hero and social artwork.
- Use Robin's supplied Simplified Chinese wording verbatim (15 paragraphs),
  retaining emphasis and emoji. The corresponding Traditional Chinese edition
  was reviewed for meaning, numbers, dates, names and complete paragraph coverage.
  Translation review: PASS. This is an editorial review, not independent
  verification of the author's autobiographical claims.
- Both Chinese texts are checked-in owner copy, applied by the existing 🌐
  same-page menu. Japanese remains the existing automatic translation behavior.
- The attachment sits outside the translated body, so language switching never
  removes the link or alters its URL/filename. No new layout or scheduler.

## Source and checks

- Chinese source: Robin's direct instruction in this task; durable copy:
  `src/data/diaryAIHKChinese.json`.
- PDF: 10 pages, 2,191,564 bytes, PDF 1.7, no encryption or JavaScript.
- PDF SHA-256: `4ae5b9013c3ff50aee312f94c68199591f0534638321b1b93448ed8da86e96a6`.
- Public asset: `/diary/2026-09-07-american-in-hong-kong/Robin_Xie_AIHK.pdf`.
- Regression tests cover all paragraphs, emphasis, attachment placement and
  byte equality, repeated Chinese switching and exact English restoration.
- Release requires the existing full `release:check`, production dependency
  audit, protected PR `verify`, Workers Builds and public readback. Deployment
  is not claimed merely because a build or upload passes.
