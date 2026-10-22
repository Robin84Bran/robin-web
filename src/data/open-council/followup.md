# Council Session II: The Judgment Bottleneck

Council verdict: Your votes form a coherent thesis: autonomous engineering may become economically transformative, institutional memory may become a competitive moat, and human judgment may become the scarce resource. Yet there is a contradiction worth investigating.

If judgment is the bottleneck, why assume humans must remain the principal judges?

The strongest challenge to your position is that AI may automate much of the evaluation process before autonomous coding becomes a default workflow.

Google's October 13 experiment provides a useful starting point: six proposed optimizations, two accepted after review, and measurable framework improvements. It establishes neither an optimal acceptance rate nor a general economic advantage.

Let's put your four positions under adversarial examination.

## I. Council cross-examination

Motion 1 — Overnight autonomy becomes standard

Uncertain

The challenge: Why would companies adopt an overnight rhythm when agents could work continuously, triggered by events rather than clocks?

Overnight coding may be a transitional metaphor inherited from human work schedules. Continuous integration already operates around events. Future agents could investigate a performance regression immediately, run tests, and submit a candidate fix within minutes.

Counterargument: Long-running agents still face context degradation, ambiguous objectives, permission boundaries, and review queues. Continuous execution could generate more unfinished work than useful results.

Experiment: Compare three workflows on matched tickets: human-triggered two-hour runs, scheduled overnight runs, and event-triggered agents with fixed compute budgets. Measure accepted improvements, total cost, and reviewer interruptions.

Motion 2 — Human review becomes the bottleneck

Agree

The challenge: This may be true only during the transition.

Suppose a coding agent produces 100 proposals. A separate testing agent checks correctness, a security agent examines dependencies, a benchmark agent tests performance, and a skeptical agent searches for counterexamples. Only five reach a human reviewer.

Human review capacity could become less restrictive as automated evidence improves.

Counterargument: Evaluators may share the generator's blind spots. A hundred agreeing agents can still be wrong, especially when they rely on the same tests, models, or assumptions.

Experiment: Compare human-only review with AI-assisted review on a blinded set of changes containing known defects. Track defect detection, false approvals, reviewer time, and the kinds of failures both approaches miss.

Motion 3 — Institutional memory becomes a moat

Agree

The challenge: What if institutional memory becomes cheap to reconstruct?

An advanced model could inspect repository history, tests, architecture, issue discussions, and past pull requests, then infer many conventions automatically. Competitors might acquire similar capabilities without maintaining elaborate instruction systems.

Furthermore, stored knowledge can become stale. Yesterday's best practice may become tomorrow's constraint.

Counterargument: Tacit knowledge about customer risk, strategic intent, regulatory commitments, and acceptable tradeoffs may remain difficult to infer from code.

Experiment: Give matched agents three information environments: source code only, source code plus retrieved history, and source code plus curated institutional guidance. Compare decision quality on new, previously unseen tasks.

Motion 4 — Optimization creates compounding value

Agree

The challenge: Software optimization may face diminishing returns much sooner than expected.

The first few changes remove obvious inefficiencies. Later improvements become smaller, harder to validate, and increasingly dependent on workload assumptions. Some optimizations also create maintenance costs or regressions.

The total economic value could plateau even while agents continue finding measurable benchmark gains.

Counterargument: Optimization opportunities may expand as software systems grow, workloads evolve, and new hardware or algorithms become available.

Experiment: Run repeated optimization cycles on the same repository with a fixed budget per cycle. Track marginal net value, regression risk, and whether later rounds continue to produce economically meaningful improvements.

## II. The most dangerous hidden assumption: More intelligence means better judgment

The council should distinguish three capabilities.

## Generation

Find potential improvements

## Verification

Establish what works, under which conditions

## Authorization

Decide what risks the organization may accept

These functions need different forms of evidence and authority.

A coding agent can generate a plausible patch. A benchmark can establish that it improves a particular workload. Neither automatically establishes that the organization should deploy it.

The deeper distinction is between epistemic judgment (is this true?) and normative judgment (is this acceptable?).

AI may increasingly perform the first. The second depends on organizational objectives, risk appetite, accountability, and legitimate decision rights.

That is where your judgment-bottleneck thesis becomes more defensible.

## III. A practical experiment portfolio

I would avoid starting with a grand autonomous enterprise. Instead, run four controlled experiments that directly test your votes.

| Experiment                         | Primary hypothesis                                                                                  | Key measurement                      | Duration |
| ---------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------ | -------- |
| A. Night Shift vs Event Trigger    | Overnight scheduling offers no inherent advantage over event-triggered autonomy                     | Net accepted value per dollar        | 2 weeks  |
| B. AI Review Council               | Independent AI-assisted evaluation reduces human review workload without increasing escaped defects | Human minutes and defect escape rate | 3 weeks  |
| C. Institutional Memory Tournament | Curated guidance improves decisions beyond retrieval alone                                          | Correct decisions on blinded tasks   | 2 weeks  |
| D. Recursive Optimization          | Repeated optimization rounds continue producing positive marginal returns                           | Net value by successive round        | 4 weeks  |

These are proposed durations, not established estimates of how long each experiment must take.

### Experiment B deserves priority

It tests the core of your thesis: whether judgment truly becomes the binding constraint.

Use a nonproduction repository with seeded defects and historical patches whose outcomes are known. Include security issues, stale-cache problems, performance regressions, and maintenance traps.

Test three review configurations:

1. Human reviewer without AI assistance.
2. Human reviewer with a single AI-generated assessment.
3. Human reviewer receiving independently generated assessments from specialized agents.

Randomize review order and blind reviewers to defect labels. Include clean changes so the system cannot simply reject everything.

Measure sensitivity to real defects, false-positive rates, review duration, and severity-weighted missed defects. For high-severity security cases, require a separate safety gate regardless of experimental outcome.

Decision rule: Expand AI-assisted review only if it meaningfully reduces reviewer time while meeting a predeclared noninferiority threshold for defect detection. The threshold and sample size should be set before the experiment.

## IV. The economics of the review bottleneck

A useful model is:

\\[ V\_{\text{net}}=V\_{\text{accepted}}-C\_{\text{generation}}-C\_{\text{evaluation}}-C\_{\text{review}}-C\_{\text{failures}} \\]

The interesting variable is the cost of evaluation.

If generation costs fall rapidly while evaluation remains expensive, producing more candidates can reduce overall efficiency.

Consider a hypothetical organization where 100 generated proposals cost $100 in total. Human review costs $50 per proposal. Reviewing all 100 would cost $5,000 before deployment or failure costs.

If an automated evaluation system safely narrows the set to 10 candidates, human review costs fall to $500. Yet the savings are worthwhile only if the automated filter does not discard too many valuable improvements or admit dangerous ones.

The ideal system therefore optimizes value recovered per unit of evaluation cost, with strict constraints on unacceptable failures.

## V. A new hypothesis: The real moat is a learning organization

Your third and fourth votes suggest a more powerful combined thesis.

Institutional memory and recursive optimization could reinforce each other through an evidence loop:

Institutional memory

Rules, architecture, history, constraints

Autonomous experiments

Hypotheses, implementations, benchmarks

Independent evaluation

Correctness, security, cost, risk

Human authorization

Deploy, reject, defer, or request evidence

Updated institutional memory

Record outcomes, failed assumptions, and new rules

Repeat with new evidence

The competitive advantage may come from how quickly an organization converts experiments into reliable knowledge.

A rival can purchase access to the same foundation model. Reproducing years of verified decisions, risk assessments, and operational feedback may be harder.

However, that advantage exists only if the memory system remains accurate, accessible, and adaptable. A repository of stale instructions can become technical debt disguised as wisdom.

## VI. Three questions I would force the council to resolve

First: Can verification become more autonomous than generation? If yes, the future engineering organization may have many generators, fewer specialized evaluators, and a small group of accountable human authorizers.

Second: Who evaluates the evaluators? Agent consensus is insufficient when models share training data, toolchains, assumptions, or test blind spots. We need independent ground truth, adversarial testing, production telemetry, and periodic human audits.

Third: What should never be autonomously optimized? In a fintech context, performance optimization must respect accounting invariants, customer-fund segregation, authorization boundaries, and auditability. Some decisions warrant explicit human approval regardless of model confidence.

## VII. Revised council motions

Your initial votes remain reasonable, but I would refine the propositions before another vote.

1\. AI evaluation will automate much of technical review, while humans retain responsibility for consequential authorization.

Agree

Uncertain

Disagree

2\. Curated institutional memory will outperform raw repository retrieval on complex, organization-specific decisions.

Agree

Uncertain

Disagree

3\. Autonomous optimization will deliver positive marginal returns across at least five consecutive cycles on a mature repository.

Agree

Uncertain

Disagree

4\. Continuous event-triggered engineering will become more valuable than a scheduled overnight AI shift.

Agree

Uncertain

Disagree

Submit revised council votes&#x20;

My proposed council resolution is to fund verification infrastructure before scaling autonomous code generation.

The experiment should determine whether AI can help us identify safe, valuable improvements with less human effort. Once that capability is established, increasing the number and duration of autonomous coding runs becomes a much more defensible investment.

The strategic question is no longer simply how many agents we can employ.

It is how much trustworthy change our organization can produce per dollar, per day, and per unit of human attention.
