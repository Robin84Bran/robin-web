# 04 · The island that forgot the manual

Three explicit rule-based learners face 120 identical context/action tasks: 40 on each island. Four contexts require one of four actions. The selected number of contexts changes its correct action at each crossing. A successful action is remembered; a failure clears it. The third strategy also excludes failed actions for the current island/context.

**Read the result:** mean success over seeds 1–32 is 72.16% (fresh), 87.73% (skills), 93.52% (skills + failure memory). Every seed and summary is in [results.csv](results.csv) / [results.json](results.json). Failure memory avoids repeated identical mistakes within a fixed island by construction.

**Fairness boundary:** skills arms arrive with four correct policies from a previous world; fresh does not. All get 120 evaluation attempts, but prior learning cost is not charged. The clean memory comparison is skills versus skills + failure memory; fresh versus skills includes pretraining. All positive caches transfer in the skills arms; exclusions reset on each island.

**Try to break it:** set zero changed rules—existing skills score perfectly without needing reflection. Set four changed rules and watch transfer turn into obsolete advice. The model still assumes rules stay constant within each island; failure exclusion would need revision if that assumption broke.

No LLM, Minecraft or Voyager code runs. “Reflection” here is just an explicit failed-action exclusion rule, not self-awareness or natural-language reasoning. Background: [Voyager's original project](https://voyager.minedojo.org/). Reproduce from the parent directory with `node run.mjs`; inspect [model.mjs](model.mjs).
