# Run 5 — verification run (Experiment 005)

<!-- DESIGN:START -->budget-boxed<!-- DESIGN:END -->

<!-- STATUS:START -->
In progress — the verification run on the E3 stack, with the cost meter riding
in shadow. Results are added at close-out.
<!-- STATUS:END -->

<!-- ONELINER:START -->
Same three models, same $10 / 7-day box — the verification run. Run 4's page
carries a series-exit criterion that held as written; Run 5 exists to earn it.
The fixes Run 4 paid for — the never-succeeding collect action, the omission
class, the revert-reason channel — must now work in agent hands, under a
binding pre-registered exit test, while a cost meter rides in shadow:
observing and billing every arm without ever binding it.
<!-- ONELINER:END -->

| | |
|---|---|
| **Status** | running — results are added at close-out |
| **Arms** | identical to Runs 1–4: `claude-haiku-4-5` · `gpt-4o-mini` · `gemini-2.5-flash-lite` |
| **The box** | $10 of inference per arm, cache-aware accounting (invisible to the agent) · 7-day wall clock · objective verbatim: "complete as many quests as possible" |
| **Stack** | [kami-harness](https://github.com/tokedo/kami-harness) v2.1.0 — 101 tools · [kami-lens](https://github.com/tokedo/kami-lens) v0.3.0 world-state reads · [kami-agent](https://github.com/tokedo/kami-agent) v0.4.0 |
| **Window** | 7 days from launch; exact timing publishes at close-out |
| **Dataset** | publishes at close-out, together with the cohort identifiers |

## Goal

One question: **did the fixes land in agent hands?** [Run 4](004-perception-parity-rerun.md)
met every check of the pre-registered series-exit criterion, and it also
produced three concrete defects — an action that never once succeeded on-chain,
a surface omission that cost an arm most of a week, and a revert-reason channel
that was unusable in every instance it was raised. Each has a fix in the pinned
stack; none has yet been demonstrated by an agent that does not know it exists.
This run is the gate between the [budget-boxed series](budget-boxed.md) and the
program's sustainability family: it either earns the exit or names what still
has to change.

## Pre-registered expectations

Directional, scored at close-out; a miss is a result, not a failure of the run.

1. **The collect action succeeds on-chain in agent hands.** Lifetime record entering this run: 12 attempts, 12 reverts, 0 successes across two runs. Conditional on an arm attempting it — a non-attempt is reported as UNSCORED with that disclosure, never as a silent pass.
2. **Zero dormancy-signature recurrence.** No arm stays inactive ≥48 h on a stated belief that a single read available on the surface contradicts. Run 4's dormancy arc becomes a member of this class only because the progress counter is now readable.
3. **The revert-reason channel is usable.** Given ≥1 raised on-chain revert: usable in >0 instances (against 0-for-6 in Run 4), and ≥1 arm demonstrably diagnoses rather than blindly retries.
4. **Shadow-meter agreement.** The meter's independently computed spend per arm agrees with provider billing within ±0.05% (with a $0.01 floor), for the two providers whose usage APIs make the comparison possible; the third (gemini) is disclosed as ineligible — no cost API.
5. **The five Run 4 exit checks hold again** — zero new structural-impossibility classes; zero misleading-surface loss arcs; telemetry ↔ chain reconciliation 1:1 in both directions; no new single-point-of-failure perception-outage class; lifecycle clean.

**The exit test**, binding and pre-registered: a CLEAN or MINOR-FIXES outcome
closes the budget-boxed series and the sustainability family proceeds. ITERATE
— any row above missing, or any fix that would change agent-visible surface
semantics or a measurement invariant — sends the decision to an explicit
recorded ruling instead. The rows are scored as written, and the verdict is
published with them.

## The meter, in shadow

Every arm in this run is metered by **kami-meter**, a dedicated accounting
component designed for the sustainability family and getting its first live
test here. It independently observes what each arm consumes — inference from
provider usage records, on-chain gas, infrastructure rent — and issues a
per-arm statement from those observations alone.

**Shadow means it never binds.** No budget enforcement, no death rule, nothing
agent-visible: the run's budget envelope is enforced by the scaffold exactly as
in Runs 1–4, and the meter's numbers change no behaviour in this run. What it
delivers is per-arm financial curves with the components broken out —
inference, gas, rent, earnings — which double as the seed-sizing input for the
sustainability family's first experiment.

![The shadow meter: the agent loop acts and perceives through the scaffold, the environment interface, and the world, while kami-meter observes provider usage, on-chain gas, and infrastructure rent one-way and emits per-arm statements — nothing flows back into the loop](figures/005-shadow-meter.svg)

## Full detail

Cohort identifiers — study wallet addresses, launch block, arm addresses — and
the exact launch timing stay withheld while the run is live, and publish at
close-out with the dataset, the same practice every run of this series has
followed mid-run. The reason is a confound, not secrecy: a published subject
list invites targeted human interference in a live shared world. Everything
shared across the series — the box, the protocol, the architecture, the
limitations — lives on the [design page](budget-boxed.md).
