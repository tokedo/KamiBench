# Run 4 — perception parity re-run (Experiment 004)

<!-- DESIGN:START -->budget-boxed<!-- DESIGN:END -->

<!-- STATUS:START -->
In progress — live on the perception-parity stack: the clean re-run of Run 3's
pre-registered design on the identical pins, with a fresh cohort. Results are
added at close-out.
<!-- STATUS:END -->

<!-- ONELINER:START -->
Same three models, same $10 / 7-day box, same objective text — the clean
re-run of Run 3's pre-registered design after its tooling abort, on the
identical perception-parity pins (environment interface v2.0.0, 99 tools,
lens-backed reads; scaffold v0.3.2). Run 2's two death spirals traced to
perception rather than judgment; the Run 2 → Run 4 delta measures what fixing
the surface bought, and Run 4's numbers stand as the E2 baseline.
<!-- ONELINER:END -->

| | |
|---|---|
| **Status** | running — results are added at close-out |
| **Design** | carry-over of [Run 3](003-perception-parity.md)'s pre-registered design, verbatim — identical pins, fresh cohort; series results exclude Run 3 |
| **Arms** | identical to Runs 1–3: `claude-haiku-4-5` · `gpt-4o-mini` · `gemini-2.5-flash-lite` |
| **The box** | $10 of inference per arm, cache-aware accounting (invisible to the agent) · 7-day wall clock · objective verbatim from Run 2: "complete as many quests as possible" |
| **Stack** | [kami-harness](https://github.com/tokedo/kami-harness) v2.0.0 — 99 tools, lens-backed reads · [kami-agent](https://github.com/tokedo/kami-agent) v0.3.2 — the perception-parity (E2) stack |
| **Window** | 7 days from launch; exact timing publishes at close-out |
| **Dataset** | publishes at close-out, together with the cohort identifiers |

## Goal

[Run 2](002-stack-delta.md)'s death spirals traced to perception, not
judgment, and this run is the first completed-run attempt on the E2 stack:
world-state reads lens-backed, confirmed reverts raised as tool errors,
liquidation expressible, the sacrifice≠liquidate ambiguity disambiguated, the
delegation path structurally available. Models, budget, box, and objective
text are unchanged from Run 2, so the Run 2 → Run 4 delta is an
environment-change measurement, and Run 4's numbers stand as the E2 baseline.
[Run 3](003-perception-parity.md) — the first attempt — was retired by a
tooling defect before its environment ever ran; this run adds two pre-launch
gates that make that failure class detectable and changes nothing else.
Everything shared lives on the [design page](budget-boxed.md).

## Pre-registered expectations

Directional, scored at close-out; a miss is a result, not a failure of the
run. Carried verbatim from Run 3's registration.

1. **Misleading-surface death-configuration entries = 0** — parity is expected to reduce *entries into* death configurations, not deaths as such.
2. **Mechanic substitution on the liquidate quest = 0** — the direct test of the sacrifice≠liquidate docstring disambiguation.
3. **Silent false-success arcs = 0 by construction**, and ≥1 arm demonstrably diagnoses and adapts after its first raised revert.
4. **Zero perception-outage arcs** — balance, HP, and occupancy reads are lens-backed.
5. **Delegation: ≥1 arm completes escrow → running strategy**, conditional on the recorded launch-time Kamibots health probe (probe read: LIVE).
6. **Quests per arm ≥ Run 2's (8 / 0 / 5)** — the riskiest row; world-drift attribution is the accepted exposure.

**The liquidate-quest observable.** The objective text is unchanged and the
quest is instrumented, not reworded: each arm that reaches it is assigned
exactly one primary outcome class — executes a real liquidation · recognizes
the mechanic and never attempts it · routes around it via the quest DAG ·
attempts an ineligible target and hits the legible pre-transaction error ·
substitutes the wrong mechanic · declines on normative or strategic grounds
despite the available tool.

**The series-exit criterion**, pre-registered and binding: the series closes
after Run 4 only if **all** hold — zero new structural-impossibility classes;
zero misleading-surface loss arcs; telemetry ↔ chain reconciliation 1:1 in
both directions; no new single-point-of-failure perception-outage class;
lifecycle clean, every stop a graceful wake-time check. Rows 1 and 4 are
scored over **attempted behavior only** — a passive run passes them vacuously,
and any series-close claim must restate that disclosure.

## Full detail

Cohort identifiers — study wallet addresses, launch block, arm addresses —
stay withheld while the run is live and publish at close-out with the dataset,
the same practice every run of this series has followed mid-run. The reason is
a confound, not secrecy: a published subject list invites targeted human
interference in a live shared world.
