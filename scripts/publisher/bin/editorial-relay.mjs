// Owner-approved daily article relay. Provider transport remains the existing browser UI.
export const effectiveDate = '2026-10-24';
export const prompts = Object.freeze({
  brainstorm: 'those are the facts and resources, brainstorm and diverge for council discussion',
  hook: 'Organize the above into a sharp article with a strong hook and clear logic. No more than 3000 words.',
  article: 'Generate an engaging, natural-sounding blog from the below. Tell the story. No more than 3000 words.',
});
export function actionLengthOK(words, date) {
  if (!Number.isInteger(words) || words <= 0 || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  return date >= effectiveDate ? words <= 3000 : words >= 2000 && words <= 3500;
}
export function specialLengthOK(words, date) {
  return Number.isInteger(words) && words > 0 && /^\d{4}-\d{2}-\d{2}$/.test(date)
    && (date < effectiveDate || words <= 3000);
}
// false means two observed unsuccessful attempts, not an untested assumption.
// A later provider inherits each missing responsibility as a separate stage.
export function relayPlan(available = {}) {
  const providers = ['ChatGPT', 'Claude', 'Gemini'];
  return ['brainstorm', 'hook', 'article'].map((role, index) => ({
    role, provider: providers.slice(index).find(provider => available[provider] !== false) ?? 'Codex',
    prompt: prompts[role],
  }));
}
