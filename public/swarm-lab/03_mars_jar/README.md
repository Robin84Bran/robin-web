# 03 · Mars in a jar

Three independent normalized streams: water, oxygen and food. Eight residents consume eight units of each per day. Waste is recovered with imperfect yields and sunlight-limited processing. Earth sends two units per stream on days 1–29, then stops. Integrity degrades daily; the treatment arm spends energy repairing the plant. All losses remain in an explicit ledger.

**Read the result:** every default no-maintenance run completes 108 days and fails on day 109. Every maintained run reaches the 240-day observation limit. That endpoint is right-censored: it is not a measured lifetime. The paired difference in **observed completed days** is 132. See [results.csv](results.csv) and inventories/parameters via the browser JSON download. [results.json](results.json) contains all seed summaries.

**Try to break it:** increase the water leak, reduce sunlight, or triple initial stock. Bigger tanks buy time; they do not fix losses. In a failed arm, inventory is frozen and the chart explicitly labels the failure rather than pretending the crew continues operating.

**Conservation:** for each stream, usable stock + waste + lost = initial stock + imported stock. Energy used never exceeds incoming energy. Sunlight is external. Chemical conversion between streams, nutrition, pathogens, hardware redundancy, pressure, thermal control and human physiology are absent. This is not a habitat design or an engineering forecast.

**The counterexample:** a second, all-32-seed batch at half sunlight reverses the apparent benefit: no maintenance averages 49.875 completed days, maintenance 46.53125. The policy reserves repair energy first, starving recycling under scarcity. This is a limitation of that fixed policy, not a universal result about repair. All sensitivity runs are in the parent `results.json`; default results remain unchanged.

Background: [ESA MELiSSA](https://www.esa.int/Enabling_Support/Space_Engineering_Technology/Melissa/Closed_Loop_Concept). Reproduce from the parent directory with `node run.mjs`; inspect [model.mjs](model.mjs).
