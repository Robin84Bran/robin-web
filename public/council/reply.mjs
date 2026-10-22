export function prepareReply(votes, question) {
  const choices = [0, 1, 2, 3].map(i => `${i + 1}: ${['Agree', 'Uncertain', 'Disagree'].includes(votes[i]) ? votes[i] : 'not chosen'}`).join('; ');
  const next = question.trim();
  return `Continue the open AI council discussion: https://iamrobin.ai/intelligence/council/autonomous-engineering/\nMy votes: ${choices}.` + (next ? `\n\nMy question: ${next}` : '');
}

if (typeof document !== 'undefined') {
  document.getElementById('prepare-council')?.addEventListener('click', () => {
    const votes = [1, 2, 3, 4].map(i => document.querySelector(`input[name="m${i}"]:checked`)?.value);
    const question = document.getElementById('council-question').value;
    const output = document.getElementById('council-reply');
    output.value = prepareReply(votes, question);
    output.focus();
    output.select();
    document.getElementById('council-status').textContent = 'Reply prepared. Copy it into your own conversation. Nothing has been submitted or saved.';
  });
}
