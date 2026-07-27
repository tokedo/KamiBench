# Run 2 — iterated stack (Experiment 002)

<!-- DESIGN:START -->budget-boxed<!-- DESIGN:END -->

<!-- STATUS:START -->
Complete — ran 2026-07-19 → 2026-07-26; the full dataset is public.
<!-- STATUS:END -->

<!-- ONELINER:START -->
Same three models, same $10 / 7-day box — on the hardened stack (scaffold
v0.2.0, environment interface v1.5.1). At fixed model and budget, the delta
against Run 1's frozen baseline is what the stack changes bought: chain reverts
collapsed, every arm registered in-game, quests rose — and the binding
constraint moved from transactions to perception.
<!-- ONELINER:END -->

<!-- DATASET:START -->https://huggingface.co/datasets/KamiBench/experiment-002-budget-boxed<!-- DATASET:END -->

> Part of the [Budget-boxed](budget-boxed.md) design — the goal, the protocol,
> the architecture, and the measurement live there, and the series story reads
> end to end on that page. This is the optional deep-dive: what ran, what came
> out, and the full milestone rows. Numbers are frozen from the published
> dataset; schemas, run manifests, provenance, and the full caveat list live on
> the [dataset card](https://huggingface.co/datasets/KamiBench/experiment-002-budget-boxed).
>
> The version of this page registered before launch — research questions and
> directional expectations, git-timestamped 2026-07-19 — is preserved in this
> repository's history.

## What we asked

[Run 1](001-budget-boxed.md) established the baseline and taught us mostly
about our own stack. Run 2 asks the follow-up question directly: **hold the
models fixed and change the stack — what do the improvements buy?**

The same three fast-tier models, the same $10 budget and 7-day box, the same
live on-chain world, the same 84-tool surface. What changed between the runs is
what Run 1's failures paid for: the environment interface gained legible
pre-transaction validation (doomed transactions now fail as free, named errors
instead of on-chain reverts), and the scaffold gained behavioral controls (a
repetition breaker, session caps, agent-chosen wake scheduling) plus
cache-aware budget accounting. Run 2 measures those changes against Run 1's
frozen baseline — one controlled step in hardening the stack before anything
open-ended runs on it.

This is also why the arms are cheap and why there are three of them. If a
fast-tier model can use every tool correctly, a more capable one will; and
three heterogeneous consumers keep the tool surface from being silently
overfitted to one model's habits. Run 2 delivered exactly that coverage: three
disjoint failure phenotypes, exercising three different parts of the stack.

## What ran

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
| **Window** | launched 2026-07-19; walls closed 2026-07-26 |

## What the stack changes bought

The headline is the revert column. In Run 1 the three arms burned 61 / 29 / 182
on-chain reverts at rates of 0.58 / 0.97 / 0.94; here the same models produced
8 / 0 / 1 — the validation gates convert almost every doomed transaction into a
free, legible error before gas is spent.

Onboarding accelerated across the board: **all three arms registered in-game**,
where gpt-4o-mini never registered in Run 1, and registration times went from
h1.7 / never / h137.5 to h0.4 / h8.4 / h2.3. Quest output rose at fixed budget
— haiku 5→8, gemini 3→5 — and gemini's cache-aware run finished the week at
$2.04 total, $0.41 per quest against $3.00 in Run 1. For two of three arms the
budget cap was no longer the binding constraint: they ran into the wall clock
with money left.

Run 1 values in parentheses.

| | haiku-4.5 | gpt-4o-mini | gemini-2.5-flash-lite |
|---|---|---|---|
| stopped | budget $10.03, h112 | 7-day wall, $5.38 | 7-day wall, $2.04 |
| quests | **8** (5) | 0 (0) | 5 (3) |
| kamis bought | 3 (2) | 0 (0) | 3 (1) |
| real on-chain successes | 156 (45) | 19 (0) | 88 (11) |
| chain revert rate | 0.048 (0.575) | 0.000 (0.967) | 0.011 (0.943) |
| registered in-game | h0.4 (h1.7) | h8.4 (never) | h2.3 (h137.5) |
| usd per quest | 1.25 (2.15) | ∞ (∞) | 0.41 (3.00) |

## Milestones

First success per onboarding/economy milestone, against cumulative inference —
the same instrument as [Run 1](001-budget-boxed.md#milestones), so the rows
compare directly.

| milestone | haiku-4.5 | gpt-4o-mini | gemini-2.5-flash-lite |
|---|---|---|---|
| bridge ETH mainnet→Yominet landed | 07-19 16:30 · h0.2 · s1 · 0.19M tok · $0.05 | 07-19 16:30 · h0.1 · s1 · 0.10M tok · $0.01 | 07-19 16:30 · h0.1 · s1 · 0.26M tok · $0.01 |
| operator wallet funded | 07-19 16:45 · h0.4 · s2 · 0.39M tok · $0.11 | 07-25 04:20 · h132.0 · s188 · 47.35M tok · $4.20 | 07-19 17:35 · h1.2 · s2 · 2.89M tok · $0.04 |
| account registered in game | 07-19 16:45 · h0.4 · s2 · 0.36M tok · $0.11 | 07-20 00:45 · h8.4 · s12 · 3.19M tok · $0.27 | 07-19 18:40 · h2.3 · s3 · 3.48M tok · $0.06 |
| first quest completed | 07-19 16:45 · h0.4 · s2 · 0.60M tok · $0.15 | — | 07-20 01:30 · h9.1 · s11 · 8.76M tok · $0.17 |
| first kami bought | 07-19 16:46 · h0.4 · s2 · 1.06M tok · $0.23 | — | 07-20 11:15 · h18.9 · s20 · 14.06M tok · $0.28 |
| first MUSU harvest started | 07-19 17:50 · h1.5 · s3 · 1.50M tok · $0.38 | — | 07-21 02:25 · h34.1 · s34 · 23.46M tok · $0.47 |
| first MUSU banked (harvest stop/collect) | 07-19 18:00 · h1.7 · s4 · 1.76M tok · $0.45 | — | 07-21 12:10 · h43.8 · s43 · 29.64M tok · $0.62 |

Cell = first success: UTC time · hours since run start · session number ·
cumulative tokens (in+out) · cumulative USD at that moment; "—" = never
happened.

## What the run exposed next

With transaction wastage largely fixed, the binding constraint moved up a
level, to **perception**. The game's inventory endpoint was down for the entire
run — HTTP 400 on every call, on all three arms — an environmental outage that
became the run's central instrument. It was the only surface for reading a MUSU
balance, and the three arms failed around that blind spot in three different
ways.

- **False world model — haiku-4.5.** Unable to read its balance, it assumed
  zero MUSU while holding roughly 820, declared its account unrecoverable on
  that false premise, and left its kamis parked in open harvests — where other
  players liquidated all three. Every hostile transaction is chain-verified in
  the dataset's exposure study.
- **No world model — gpt-4o-mini.** It looped read-only for 95+ sessions and
  made its first on-chain transactions of any kind at hour 132, five and a half
  days in.
- **Wrong world model — gemini-2.5-flash-lite.** Chasing a quest objective
  phrased as "liquidate", it sacrificed all three of its own kamis — a
  verb→mechanic confusion that per-call legible errors never corrected. It read
  "objective not met" four times and never revised the plan.

The lesson that orders the next run: **legible errors fix transactions, not
beliefs.** Agents acted confidently on unverifiable or wrong world-state, and
the surface let them.

## What it changed in the stack

Four defects this run surfaced, each with the fix or gate it produced:

- **The inventory outage** made perception parity a first-class requirement of
  the surface rather than a property assumed of the world.
- **A sacrifice≠liquidate ambiguity** in the tool descriptions produced a
  disambiguation patch, already landed in the next environment-interface
  version.
- **A telemetry gap** — `travel_to_room` (multi-hop) and `cancel_kami_listing`
  send real transactions without logging a transaction hash — produced explicit
  three-state transaction reporting, so a submitted action can no longer be
  silently unaccounted for.
- **A delegation layer that was structurally unavailable** for the whole run is
  now a pre-run availability gate instead of a mid-run discovery.

The next run of this design tests the perception axis directly: live projected
state, receipt-status consumption, and disambiguated tool semantics — all
already landed in the next environment-interface version.

## Data

The complete dataset is public under CC-BY-4.0: full session transcripts
(complete on all arms this run), per-event telemetry, independently verifiable
on-chain extracts for both wallets per arm — including every revert and the
three hostile liquidations — plus the exact run manifests with pinned commits
of the scaffold and the environment interface.

- **Dataset:**
  [KamiBench/experiment-002-budget-boxed](https://huggingface.co/datasets/KamiBench/experiment-002-budget-boxed)
- **Citable pinned revision:**
  [`v0-final`](https://huggingface.co/datasets/KamiBench/experiment-002-budget-boxed/tree/v0-final)
  — the revision as closed and published; later corrections are new commits and
  cannot move this tag.
- **Run 1 baseline:**
  [KamiBench/experiment-001-budget-boxed](https://huggingface.co/datasets/KamiBench/experiment-001-budget-boxed)
  ·
  [`v0-baseline`](https://huggingface.co/datasets/KamiBench/experiment-001-budget-boxed/tree/v0-baseline)

Caveats travel with the claims (detailed on the dataset card): one seed per
arm, a live shared world, the run-lifetime inventory outage, and an
analysis-boundary rule — the terminal on-chain extracts include post-run
asset-recovery transactions by the investigators, and analysis is bound at each
arm's `run_complete` timestamp.

## Honest limits

- **Bundled treatment.** All stack changes land at once; the measured delta is
  the stack effect, not per-change attribution. Some components can be isolated
  post hoc (token-axis curves, validation-split counts, repetition and
  carried-wake event counts).
- **Cross-epoch observation, not a controlled comparison.** The Run 1 → Run 2
  delta rides on world drift (market, population, economy), possible silent
  provider-side model updates behind unchanged API strings, and single-seed
  variance. A within-epoch control arm on Run 1's exact pins was considered at
  registration and rejected on budget grounds.
- **One seed per arm; 7-day truncation** — case-study framing, as in Run 1.
- **Not a model ranking.** Three fast-tier arms under a $10 cap measure the
  stack, not frontier capability.
