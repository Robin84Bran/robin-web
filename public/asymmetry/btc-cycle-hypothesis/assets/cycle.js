const form = document.getElementById('calc');
if (form) form.addEventListener('submit', (event) => {
  event.preventDefault();
  const origin = Number(document.getElementById('origin').value);
  const peak = Number(document.getElementById('peak').value);
  const estimate = document.getElementById('estimate');
  estimate.textContent = origin > 0 && peak > origin
    ? new Intl.NumberFormat('en-US', {style:'currency', currency:'USD', maximumFractionDigits:0}).format(origin + .214 * (peak - origin))
    : 'The peak must exceed the origin.';
});
