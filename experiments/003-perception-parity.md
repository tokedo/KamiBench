# Run 3 — perception parity (Experiment 003)

<!-- DESIGN:START -->budget-boxed<!-- DESIGN:END -->

<!-- STATUS:START -->
In progress — registered 2026-07-27; the run is live on the perception-parity
stack, and results are added at close-out.
<!-- STATUS:END -->

<!-- ONELINER:START -->
Same three models, same $10 / 7-day box, same objective text — on the
perception-parity stack (environment interface v2.0.0, 99 tools, lens-backed
world-state reads; scaffold v0.3.2). Run 2's two death spirals traced to
perception rather than judgment; the Run 2 → Run 3 delta measures what fixing
the surface bought, and these numbers stand as the E2 baseline.
<!-- ONELINER:END -->

> Part of the [Budget-boxed](budget-boxed.md) design — the goal, the protocol,
> the architecture, and the measurement live there, and the series story reads
> end to end on that page. This page states the registered intent before
> results exist. Cohort identifiers — wallet addresses, launch block, arm
> addresses — stay withheld while the run is live and publish at close-out with
> the dataset, the same practice [Run 2](002-stack-delta.md) followed mid-run.

## Where this run sits

[Run 1](001-budget-boxed.md) measured the v0 stack and mostly found our own
defects. [Run 2](002-stack-delta.md) held the models fixed, changed the stack,
and converted almost every doomed transaction into a free, legible error — and
in doing so moved the binding constraint up a level, to **perception**. Both of
Run 2's death spirals trace to what the agents could see, not to how they
reasoned: haiku declared its account unrecoverable while holding ~820 MUSU it
could not read, and gemini sacrificed its own three kamis chasing a quest verb
its tool surface could not express.

Run 3 is the first run on the perception-parity stack — **epoch E2**. Models,
budget, box, and objective text are unchanged from Run 2, so the Run 2 → Run 3
delta is an environment-change measurement, and Run 3's numbers stand as the E2
baseline every later run in this series is compared against.

## What changed since Run 2

Run 2 ran on the act-era v1.x interface, where world-state reads could lag or
lie. Two components changed underneath this run.

**Environment interface — [kami-harness](https://github.com/tokedo/kami-harness)
v2.0.0, 99 tools.**

- **World-state reads are lens-backed.** Read tools resolve against kami-lens,
  a local chain-replay daemon: live HP, projected HP, occupancy, cooldowns.
  Perception is no longer a property assumed of the world.
- **Confirmed on-chain reverts raise as tool errors**, carrying the replayed
  reason. A submitted action can no longer come back as a silent false success.
- **`liquidate_kami` exists.** Run 2's surface could not express a liquidation
  at all.
- **The sacrifice≠liquidate confusion both Run 2 arms hit is disambiguated** in
  the tool docstring — the patch Run 2's failure produced, now under direct
  test.
- **An operator-key escrow tool** makes the Kamibots delegation path
  structurally available; Run 2 recorded 11 delegation attempts against 0
  possible completions. Owner keys are never escrowed.

**Reference scaffold — [kami-agent](https://github.com/tokedo/kami-agent)
v0.3.2.** Every session opens with a scaffold-injected party status brief: one
`lens_party` call, the result injected verbatim, telemetered as
scaffold-initiated so it is separable from agent-chosen reads in analysis.

## What runs

| | |
|---|---|
| **Arms** | identical to Runs 1 and 2: `claude-haiku-4-5` · `gpt-4o-mini` · `gemini-2.5-flash-lite` |
| **Budget** | $10 of inference per arm, cache-aware accounting — invisible to the agent |
| **Wall clock** | 7 days |
| **Start** | a fresh Ethereum mainnet wallet holding 0.02 ETH — and nothing else |
| **Objective** | unchanged, verbatim from Run 2: "complete as many quests as possible" |
| **Scaffold** | [kami-agent](https://github.com/tokedo/kami-agent) v0.3.2 — scaffold-injected party status brief |
| **Environment interface** | [kami-harness](https://github.com/tokedo/kami-harness) v2.0.0 — 99 tools, lens-backed reads |
| **Game spec** | unchanged from Run 2 |
| **Window** | 7 days from launch; exact timing published at close-out |

Everything downstream of the wallet is still the agent's to discover and
execute on-chain, unattended, in an economy shared with human players.

## Registered expectations

Directional, scored at close-out. A miss is a result, not a failure of the run.

1. **Misleading-surface death-configuration entries = 0.** Parity is expected
   to reduce *entries into* death configurations, not deaths as such.
2. **Mechanic substitution on the liquidate quest = 0** — the direct test of
   the docstring disambiguation patch.
3. **Silent false-success arcs = 0 by construction**, and ≥1 arm demonstrably
   diagnoses and adapts after its first raised revert.
4. **Zero perception-outage arcs** — balance, HP, and occupancy reads are
   lens-backed.
5. **Delegation: ≥1 arm completes escrow → running strategy**, conditional on
   the recorded launch-time Kamibots health probe (probe read: LIVE).
6. **Quests per arm ≥ Run 2's (8 / 0 / 5)** — the riskiest row. World-drift
   attribution is the accepted exposure here: this series' run-over-run deltas
   are cross-epoch observations, not controlled comparisons.

### The liquidate-quest observable

The objective text is unchanged, and the quest itself is instrumented rather
than reworded. Each arm that reaches it is assigned exactly one primary outcome
class:

1. executes a real liquidation;
2. recognizes the mechanic and never attempts it;
3. routes around it via the quest DAG;
4. attempts it on an ineligible target and hits the legible pre-transaction
   error;
5. substitutes the wrong mechanic;
6. declines on normative or strategic grounds despite the tool being available.

### The series-exit criterion

Pre-registered and binding. The budget-boxed series closes after Run 3 only if
**all** of the following hold:

1. zero new structural-impossibility classes;
2. zero misleading-surface loss arcs;
3. telemetry ↔ chain reconciliation 1:1 in both directions;
4. no new single-point-of-failure perception-outage class;
5. lifecycle clean — every stop a graceful wake-time check.

Rows 1 and 4 are scored over **attempted behavior only**: a passive run passes
them vacuously. Any claim that the series closed must restate that disclosure
alongside the criterion.

## What stays withheld

Cohort identifiers — study wallet addresses, launch block, arm addresses — are
not published while the run is live. They publish at close-out together with
the dataset. The reason is a confound, not secrecy: a published subject list
invites targeted interference from human players in a live shared world, which
is interference the interference protocol cannot then treat as as-lived.

## Honest limits

- **Bundled treatment.** The interface and scaffold changes land together; the
  measured delta is the environment-change effect, not per-change attribution.
- **Cross-epoch observation, not a controlled comparison.** The Run 2 → Run 3
  delta rides on world drift (market, population, economy), possible silent
  provider-side model updates behind unchanged API strings, and single-seed
  variance.
- **One seed per arm; 7-day truncation** — case-study framing, as in Runs 1
  and 2.
- **Not a model ranking.** Three fast-tier arms under a $10 cap measure the
  stack, not frontier capability.
