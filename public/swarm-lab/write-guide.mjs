import {writeFileSync} from 'node:fs';
import {experiments,VERSION} from './lab.mjs';
import {guides} from './guides.mjs';
const intro=`# Swarm Lab — Eight Small Worlds: how to play

Model ${VERSION}. Educational rule-based simulations, not real AI or biological experiments.

## Your first five minutes

1. Pick a world and make a prediction.
2. Press **Play**; press it again to pause. **Step** advances one frame. Drag the time slider to inspect an earlier moment.
3. Change just one control. This prepares a new run at time zero; press Play again. **Reset** replays the current settings, not factory defaults. Reload without query parameters for defaults.
4. Keep the **Seed** while comparing a rule change. A seed selects the random world; it is not a difficulty level. **Next seed** checks another world.
5. **Share this setup** copies a link with the seed, controls and model version. **Download chart CSV** saves plotted values; **Download full run JSON** saves all frames and parameters.

The colored arms run side by side with matched seeds. The dashed chart line is the first arm. A displayed batch is always the saved default experiment over seeds 1–32, not a live average of your settings. The controls need JavaScript; the methods and saved results do not.

`;
const chapters=experiments.map(e=>{const g=guides[e.id];return `## ${e.number}. ${e.title}

Play: https://iamrobin.ai/intelligence/swarm-lab/${e.id}/

**Your challenge:** ${g.goal}

${g.steps.map((s,i)=>`${i+1}. ${s}`).join('\n')}

### What the parameters mean

- **Seed:** chooses a reproducible random world (0–4294967295).
- **${e.control}:** ${g.main}
${g.extras.map(c=>`- **${c.label}:** ${c.meaning}`).join('\n')}

**Read the result:** ${g.read}

**Where the analogy stops:** ${e.limits}
`;}).join('\n');
writeFileSync(new URL('HOW_TO_PLAY.md',import.meta.url),intro+chapters);
console.log('Generated HOW_TO_PLAY.md from the same guide data used by the website.');
