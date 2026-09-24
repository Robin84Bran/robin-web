# Swarm Lab — Eight Small Worlds: how to play

Model 1.1.0. Educational rule-based simulations, not real AI or biological experiments.

## Your first five minutes

1. Pick a world and make a prediction.
2. Press **Play**; press it again to pause. **Step** advances one frame. Drag the time slider to inspect an earlier moment.
3. Change just one control. This prepares a new run at time zero; press Play again. **Reset** replays the current settings, not factory defaults. Reload without query parameters for defaults.
4. Keep the **Seed** while comparing a rule change. A seed selects the random world; it is not a difficulty level. **Next seed** checks another world.
5. **Share this setup** copies a link with the seed, controls and model version. **Download chart CSV** saves plotted values; **Download full run JSON** saves all frames and parameters.

The colored arms run side by side with matched seeds. The dashed chart line is the first arm. A displayed batch is always the saved default experiment over seeds 1–32, not a live average of your settings. The controls need JavaScript; the methods and saved results do not.

## 01. The city of freeloaders

Play: https://iamrobin.ai/intelligence/swarm-lab/cell-city/

**Your challenge:** Keep cooperation alive without confusing a green chart with a moral lesson.

1. Play once at the defaults. Compare the two colony grids and their contributing shares.
2. Keep seed 24. Raise Mixing toward 1, then Reset and play again.
3. Set Public benefit to 0. Check whether the shared-founder advantage survives.

### What the parameters mean

- **Seed:** chooses a reproducible random world (0–4294967295).
- **Mixing:** Mixing is the chance an offspring is drawn independently rather than from its colony founder. 0 keeps founder families together; 1 mixes completely. Only the second arm changes.
- **Public benefit:** How much payoff everyone gets from contributing neighbors. Contributors still pay 0.6. It changes both arms.

**Read the result:** The vertical axis is the fraction contributing, not population growth. Each arm always contains 192 cells.

**Where the analogy stops:** Founders are an assortment mechanism, not a complete genetic model. Cells have no intentions, no politics and no moral scores. The population stays at 192: neither cancer nor an actual city is simulated.

## 02. A body without a blueprint

Play: https://iamrobin.ai/intelligence/swarm-lab/self-assembly/

**Your challenge:** See whether local attraction reconnects a damaged cluster.

1. Play through step 90, when 14 central particles disappear.
2. Scrub backward and forward around 90. Count survivors, not just connections.
3. Try zero adhesion, a shorter signal range, or no damage. Change one thing at a time.

### What the parameters mean

- **Seed:** chooses a reproducible random world (0–4294967295).
- **Adhesion:** Adhesion sets the strength of attraction between nearby particles in the second arm. 0 means no attraction; 1 is the strongest available. Repulsion and noise remain.
- **Boundary:** The wall particles cannot cross. Shape can influence the pattern.
- **Signal range:** How far a particle can attract another, as a fraction of the unit arena width. The connectivity measuring threshold stays 0.085.
- **Remove 14 at step 90:** If checked, remove the fourteen nearest the center in each arm. If unchecked, keep all 72.

**Read the result:** The score is the largest connected group divided by survivors. Reconnection is not regrowth: removed particles never return.

**Where the analogy stops:** These are abstract particles, not biological cells. Connectivity is not intelligence, healing or a new organism. Any post-damage reconnection is rearrangement of survivors. The rules and boundary—not DNA or an AI—supply the structure.

## 03. Mars in a jar

Play: https://iamrobin.ai/intelligence/swarm-lab/mars-jar/

**Your challenge:** Separate a long runway from a genuinely closed loop.

1. Play past day 30, when Earth stops supplying material. Compare maintenance and no maintenance.
2. Try Triple starting stock. Notice that more supplies buy time without repairing losses.
3. Set Sunlight to Half. The fixed maintenance policy can now make survival shorter.

### What the parameters mean

- **Seed:** chooses a reproducible random world (0–4294967295).
- **Daily water leak:** Daily water leak is the fraction of usable water lost every day. 0.001 means 0.1% per day; 0.01 means 1%. It affects both arms.
- **Starting stock:** Multiplier on initial water, oxygen and food. Daily needs do not change.
- **Sunlight:** Multiplier on incoming energy. Recycling and maintenance compete for this energy; sunlight supplies no material.

**Read the result:** The chart is the smallest usable resource reserve in crew-days. Failed arms freeze. A run still alive at day 240 has passed the observation window, not proved eternal survival.

**Where the analogy stops:** This is a three-stream accounting model, not MELiSSA chemistry or a Mars habitat design. Food, oxygen and water are independent normalized ledgers. Sunlight is an external energy input. Surviving 240 days does not establish permanent closure; losses continue even when the plant is repaired.

## 04. The island that forgot the manual

Play: https://iamrobin.ai/intelligence/swarm-lab/memory-islands/

**Your challenge:** Find out when experience transfers—and when it becomes stale advice.

1. Play through all 120 attempts. Islands change after attempts 40 and 80.
2. Set Changed rules to 0. Existing skills should now need no extra failure memory.
3. Set it to 4 and compare repeated mistakes. All learners still get 120 test attempts.

### What the parameters mean

- **Seed:** chooses a reproducible random world (0–4294967295).
- **Changed rules per island:** The number of the four context rules that change on each new island. 0 means a familiar world; 4 means every rule changes.


**Read the result:** The chart is cumulative success rate. Skills arms start with prior knowledge; the fresh arm does not. The clean extra-memory comparison is Skills versus Skills + failure memory.

**Where the analogy stops:** No LLM, Minecraft, live agent or Voyager software runs here. These are explicit rule-based learners. Failure memory has an advantage by construction when rules stay fixed within an island; this model tests that assumption, not general intelligence. Equal test budgets do not imply equal lifetime training cost.

## 05. The Already Known Trap

Play: https://iamrobin.ai/intelligence/swarm-lab/known-trap/

**Your challenge:** Catch surprises hiding beside familiar labels.

1. Play with the labels hidden on the left and visible on the right. Both inspect 60 neighborhoods.
2. Set Known-label discount to 0. The search orders should now match.
3. Try a Full scan of 120. A priority bias cannot hide a neighborhood forever if everything is inspected.

### What the parameters mean

- **Seed:** chooses a reproducible random world (0–4294967295).
- **Known-label discount:** How strongly a visible known label suppresses inspection priority. 0 ignores labels; 0.8 reduces priority by 80%; 1 almost skips it. This is the hypothesis you impose, not a measured human bias.
- **Inspection budget:** How many different neighborhoods each searcher can inspect. More search costs more work.
- **Known-label share:** Probability that a synthetic neighborhood gets a known label. The same labels exist in both arms but only one searcher sees them.
- **Evidence noise:** Maximum upward or downward perturbation of repeat and partner scores. Higher noise can both hide real anomalies and create false alarms.

**Read the result:** Recall means true finds ÷ 24 planted anomalies. False alarms are counted separately. The tiles are synthetic evidence, not real DNA.

**Where the analogy stops:** The label penalty is an explicit hypothesis, not a measured human or Claude bias. Anthropic reports that the RT was previously identified and Claude noticed its associated repeat array and partner; it does not establish why earlier researchers missed those features. No biological sequences or real discovery agents run here.

## 06. Many Small Windows vs. One Big Eye

Play: https://iamrobin.ai/intelligence/swarm-lab/attention-windows/

**Your challenge:** Find local patterns without losing the big picture.

1. Play. Compare 1, 50 and 1,000 readers: each reads exactly 12,000 records in total.
2. Read both local recall and the separate global decision. “Not enough span” is abstention, not a wrong answer.
3. Enable Pool global summaries. Check whether the trend returns, and notice the additional coordination work.

### What the parameters mean

- **Seed:** chooses a reproducible random world (0–4294967295).
- **Background noise:** Amplitude of background noise around the planted signals. 0 is clean data; 1.5 can produce many false local alarms. Every arm receives the same noisy dataset.
- **Global trend:** End-to-end change across the dataset before noise and local motifs. None is a useful false-positive control.
- **Pool global summaries:** Let a coordinator merge position-aware summaries after all reading. No records are reread, but coordinator work is additional—not free compute.

**Read the result:** The local chart counts how many of 48 planted patterns were recovered. Global trend detection is a different task. More readers do not guarantee better reasoning.

**Where the analogy stops:** Equal record-reads are not equal FLOPs, tokens or wall time. Pooling costs additional coordinator work, recorded as summary merges. These fixed detectors compress information differently; no claim is made that more agents are intrinsically smarter. Tiny windows can also create false alarms and split patterns at boundaries.

## 07. Taste Drift

Play: https://iamrobin.ai/intelligence/swarm-lab/taste-drift/

**Your challenge:** Keep unusual true ideas alive without rewarding nonsense.

1. Play ten rounds. Watch both unusual proposals generated and unusual true ideas retained.
2. Raise the protected explorer share. See whether protecting generation alone changes the judge’s choices.
3. Add 50% blind-review slots. This changes selection rather than only who proposes ideas.

### What the parameters mean

- **Seed:** chooses a reproducible random world (0–4294967295).
- **Preference for familiar ideas:** Bonus given to familiar-looking proposals by the fixed judge. 0 ranks evidence only; 1 adds the largest familiar bonus. Both arms face the same judge.
- **Protected explorer share:** Fraction of the second arm that keeps its original 50:50 unusual/familiar proposal mix instead of learning taste feedback.
- **Blind-review slots:** Fraction of the 24 kept proposals chosen by evidence alone before taste-based selection fills remaining places. Applies to both arms.

**Read the result:** The main chart is a count, not a percentage: unusual AND true ideas among the 24 retained that round. Purple is unusual, not automatically correct.

**Where the analogy stops:** The judge is a transparent scoring rule, not an actual scientist. Unusual does not mean true; truth is planted independently. Protected generation does not guarantee fair selection. This model cannot demonstrate that real expert feedback necessarily suppresses discovery, or that ignoring experts is beneficial.

## 08. Shared Channel

Play: https://iamrobin.ai/intelligence/swarm-lab/shared-channel/

**Your challenge:** Share useful leads without turning the whole swarm into one searcher.

1. Play isolated and shared-board search together. Watch effective diversity and true/false flagged directions.
2. Raise Messages per decision from 0 to 1, 2, 4, 8 and 16. Compare with the saved sweep below.
3. Uncheck First lead is true. Does attention stay trapped around a noisy mistake?

### What the parameters mean

- **Seed:** chooses a reproducible random world (0–4294967295).
- **Messages per decision:** Number of modeled message exposures before a choice. With trust p and volume m, following probability is 1 − (1 − p)^m. More messages can reinforce the same lead, not add new evidence.
- **Trust per message:** Chance one exposure persuades an agent to follow the shared board. 0 makes the two arms identical.
- **Evidence threshold:** Positive observations required to flag a direction. Even false directions occasionally yield positives, so flagged does not mean proven.
- **First lead is true:** Whether the initially promoted direction contains a planted anomaly. There are always 16 true directions overall.

**Read the result:** Diversity is effective directions ÷ 128. It accounts for crowding; 70 barely visited directions can coexist with nearly everyone in one. Below 25% is this model’s declared collapse line, not a universal law.

**Where the analogy stops:** Popularity amplification, trust and evidence noise are chosen rules, not measured swarm behavior. The 25% collapse line is a declared convention, not a universal threshold. Evidence counts can flag false directions. No Hugging Face incident, actual message platform or live AI swarm is recreated here.
