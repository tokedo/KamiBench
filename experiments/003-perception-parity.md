# Run 3 — perception parity (Experiment 003)

<!-- DESIGN:START -->budget-boxed<!-- DESIGN:END -->

<!-- STATUS:START -->
Aborted — launched 2026-07-27 and retired at the first scheduled monitor pass,
about 17 hours later. A defect in our own run tooling, outside the published
stack, had degraded the run's instructions from the first session. The design
carries over unchanged to Run 4.
<!-- STATUS:END -->

<!-- ONELINER:START -->
Same three models, same $10 / 7-day box — the first attempt on the
perception-parity stack (environment interface v2.0.0, 99 tools, lens-backed
reads; scaffold v0.3.2). Retired at the first scheduled monitor pass: a defect
in our own run tooling, outside the published stack, degraded the run's
instructions from the first session, so every answer the run could give would
have been confounded. The stack verified clean at its pins; the identical
design re-runs as Run 4.
<!-- ONELINER:END -->

| | |
|---|---|
| **Status** | aborted — retired at the first scheduled monitor pass, about 17 hours in |
| **Arms** | identical to Runs 1 and 2: `claude-haiku-4-5` · `gpt-4o-mini` · `gemini-2.5-flash-lite` |
| **The box** | $10 of inference per arm, cache-aware accounting (invisible to the agent) · 7-day wall clock · objective unchanged: "complete as many quests as possible" |
| **Stack** | [kami-harness](https://github.com/tokedo/kami-harness) v2.0.0 — 99 tools, lens-backed reads · [kami-agent](https://github.com/tokedo/kami-agent) v0.3.2 — the perception-parity (E2) stack |
| **Window** | launched 2026-07-27; retired 2026-07-28 |
| **Dataset** | no dataset — the run was invalidated before its window closed |

## Goal

Both of [Run 2](002-stack-delta.md)'s death spirals traced to missing or
incorrect world state — to what the agents could see, not to how they reasoned.
Run 3 was registered as the first run on the E2 stack to measure what fixing
that surface bought. Because Run 3 was invalidated,
[Run 4](004-perception-parity-rerun.md) carries the same question on the
identical pre-registered design and pins. Everything shared lives on the
[design page](budget-boxed.md).

## Outcome

A defect in our own run tooling — outside the published stack — degraded the
run's instructions from the first session onward. The first scheduled monitor
pass detected the defect about 17 hours after launch.

The registered environment was therefore never actually live. Every answer
the run could give would have been confounded, and the pre-registered binding
exit criterion could not have been satisfied regardless of agent behavior.
The run was stopped and retired instead of spending its remaining budget on
unusable evidence.

The environment stack itself — the interface and scaffold at their pinned
versions — was verified clean. The design carries over unchanged, and series
results exclude this run.

## Key learnings

- **The monitoring protocol worked as designed** — a silent defect in our own run tooling was caught at the first scheduled pass, not at close-out.
- **A binding exit criterion also tells you when to stop** — once it could not be satisfied, the remaining budget could purchase no series-closing evidence.
- **The published stack was not the failure** — interface and scaffold verified clean at their pins; the defect was in run tooling on our side.
- **Two new gates now precede every launch** — an end-to-end pre-launch drill of the run tooling, and a hard stop if the registered session brief is not live by the first monitor pass.

## Full detail

An aborted pre-registered run is reported plainly, and this page is its
record. The design, the directional expectations, the liquidate-quest
observable, and the binding series-exit criterion carry over verbatim to
[Run 4](004-perception-parity-rerun.md), where they are stated in full.
