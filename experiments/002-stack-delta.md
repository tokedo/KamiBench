# Run 2 — iterated stack (Experiment 002)

<!-- DESIGN:START -->budget-boxed<!-- DESIGN:END -->

<!-- STATUS:START -->
In progress — registered 2026-07-19; same arms, budget, and box on the iterated
stack; results will be added at close-out.
<!-- STATUS:END -->

<!-- ONELINER:START -->
Same three models, same $10 / 7-day box — on the iterated stack (scaffold
v0.2.0, environment interface v1.5.1). At fixed model and budget, the delta
against Run 1's frozen baseline measures the scaffold/harness effect: the first
point on the path to the plateau where frontier models come in.
<!-- ONELINER:END -->

> Part of the [Budget-boxed](budget-boxed.md) design. This page states the
> registered intent before results exist; run-operational details (wallet
> addresses, exact timing) stay undisclosed until the run completes.

## Why re-run the same protocol

[Run 1](001-budget-boxed.md) established the v0 baseline — and taught us more
about the instrument than about the models. Those findings became a bundle of
stack changes:

- **Scaffold v0.1.0 — prompt caching.** Run 1 never engaged provider caching;
  the audited fix cut measured session cost by ~72%.
- **Scaffold v0.2.0 — behavioral fixes.** An explicit no-human-in-the-loop
  line in the system prompt (two Run 1 arms spent hours waiting for a user who
  doesn't exist), a repetition breaker that ends looping sessions (Run 1's
  un-broken poll loops reached $0.55 per session), carried wake intents, and
  empty-response backoff.
- **Environment interface v1.4.0–v1.5.x — legible failures.** Run 1's sharpest
  lever: pre-transaction validation, so a blocked game action now fails with a
  factual precondition error before any gas is spent, instead of an opaque
  on-chain revert; plus revive paths, reserve math, empty-batch rejection, and
  reveal-transaction correctness.

Run 2 re-runs the exact protocol on the new pins. At fixed models and fixed
budget, the run-over-run delta is the stack effect. Iterating until fast-tier
performance plateaus makes the residual attributable to the model — the
plateau curve is itself a program result, and Run 2 is its first measured
point.

## Research questions

1. **Stack effect (primary).** Per model at fixed budget, what moves vs
   Run 1 — quests, onboarding milestones (completion and timing),
   invalid-attempt rate, real on-chain successes. The sharpest probe:
   `register_account` was Run 1's discriminator — gpt-4o-mini never called it
   in 166 sessions, and gemini reached it only after the one legible
   validation error it ever received. Now every blocked game write fails with
   a factual precondition error before gas is spent; whether each model acts
   on the now-reachable diagnosis is the measured capability.
2. **Cache effect.** Realized cache read/write volumes per provider, effective
   tokens per dollar, and how far the same $10 now stretches — sessions, world
   interactions, elapsed game time.
3. **Behavioral deltas.** Does the no-human line eliminate the
   waiting-for-user persona? Do Run 1's poll-loop shapes now end at the
   repetition breaker instead of burning budget? Do wake choices get cleaner?
4. **Plateau positioning (informal).** Does the fast tier look like
   diminishing returns, or does the residual failure surface point at a next
   iteration? Feeds the next-run decision, not a metric.

## What runs

| | |
|---|---|
| **Arms** | identical to Run 1: `claude-haiku-4-5` · `gpt-4o-mini` · `gemini-2.5-flash-lite` |
| **Budget** | $10 of inference per arm, cache-aware accounting — invisible to the agent |
| **Wall clock** | 7 days |
| **Start** | a fresh Ethereum mainnet wallet holding 0.02 ETH — and nothing else |
| **Objective** | unchanged: "complete as many quests as possible" |
| **Scaffold** | [kami-agent](https://github.com/tokedo/kami-agent) v0.2.0 @ `18f75d04` |
| **Environment interface** | [kami-harness](https://github.com/tokedo/kami-harness) v1.5.1 @ `27592ce` — the same 84-tool surface |
| **Game spec** | unchanged from Run 1 |

Because caching changes what a dollar buys — differently per provider — tokens
are the primary cross-run axis. Dollar curves are reported alongside, both
cache-aware (the budget that actually boxed the run) and recomputed at list
prices for a Run 1-basis view.

## Registered expectations

Directional, not pass criteria — a missed expectation is itself the result:
plateau-positioning input, not a failure of the run.

1. `register_account` becomes reachable on every arm; an arm that still never
   calls it reproduces Run 1's sharpest capability finding under better
   conditions.
2. The waiting-for-user persona disappears.
3. Run 1's poll-loop shapes end at the repetition breaker instead of burning
   budget.
4. The combined invalid-attempt rate falls on every arm.
5. The caching arm's sessions-per-dollar rises several-fold; the binding stop
   may flip from budget to wall clock.
6. Wake-choice distributions get cleaner.

## Honest limits

- **Bundled treatment.** All stack changes land at once; the measured delta is
  the stack effect, not per-change attribution. Some components can be
  isolated post hoc (token-axis curves, validation-split counts, repetition
  and carried-wake event counts).
- **Cross-epoch observation, not a controlled comparison.** The Run 1 → Run 2
  delta rides on world drift (market, population, economy), possible silent
  provider-side model updates behind unchanged API strings, and single-seed
  variance. A within-epoch control arm on Run 1's exact pins was considered at
  registration and rejected on budget grounds.
- **One seed per arm; 7-day truncation** — case-study framing, as in Run 1.
