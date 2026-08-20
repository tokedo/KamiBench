# Run 1 — baseline stack (Experiment 001)

<!-- DESIGN:START -->budget-boxed<!-- DESIGN:END -->

<!-- STATUS:START -->
Complete — ran 2026-07-10 → 2026-07-17; the full dataset is public.
<!-- STATUS:END -->

<!-- ONELINER:START -->
Three fast-tier models — claude-haiku-4-5, gpt-4o-mini, gemini-2.5-flash-lite —
each dropped into the live world with $10 of inference, seven days, and a fresh
wallet, on the v0 baseline stack: the first entry in the stack stress-test
series, and the frozen baseline every iteration after it is measured against.
<!-- ONELINER:END -->

<!-- DATASET:START -->https://huggingface.co/datasets/KamiBench/experiment-001-budget-boxed<!-- DATASET:END -->

| | |
|---|---|
| **Status** | complete — the full dataset is public |
| **Arms** | `claude-haiku-4-5` (Anthropic) · `gpt-4o-mini` (OpenAI) · `gemini-2.5-flash-lite` (Google) |
| **The box** | $10 of inference per arm (invisible to the agent) · 7-day wall clock · "complete as many quests as possible" |
| **Stack** | [kami-agent](https://github.com/tokedo/kami-agent) @ `3ebd5b8` (v0 baseline) · [kami-harness](https://github.com/tokedo/kami-harness) v1.3.1 — the 84-tool v1.x surface |
| **Window** | launched 2026-07-10; walls closed 2026-07-17 |
| **Dataset** | [experiment-001-budget-boxed](https://huggingface.co/datasets/KamiBench/experiment-001-budget-boxed) · citable pinned revision [`v0-baseline`](https://huggingface.co/datasets/KamiBench/experiment-001-budget-boxed/tree/v0-baseline) |

## Goal

The goal was to prove the v0 stack under real autonomous use in the live world
before anything open-ended ran on it. Run 1 opened the
[Budget-boxed](budget-boxed.md) series and established the frozen baseline for
every later stack iteration. The series protocol, architecture, and measurement
are defined on the design page.

## Outcome

The three arms diverged sharply. Haiku completed the entire onboarding chain
and five quests on day one, exhausting its budget in 17 hours. gpt-4o-mini ran
for the full week without ever calling `register_account`; all 24 of its game
transactions reverted, and it completed zero quests. Gemini spent six days
stuck before registration, then a single legible validation error unblocked it
and it completed three quests. Cost per quest was $2.15 for haiku, $3.00 for
gemini, and ∞ for gpt-4o-mini.

| | haiku-4.5 | gpt-4o-mini | gemini-2.5-flash-lite |
|---|---|---|---|
| stopped | budget, hour 17 | 7-day wall | 7-day wall |
| quests | **5** | 0 | 3 |
| Kamis bought | 2 (level 1) | 0 | 1 (level 31) |
| successful on-chain actions | 45 | 0 | 11 |
| chain revert rate | 0.58 | 0.97 | 0.94 |

## Milestones

First success per onboarding/economy milestone, against cumulative inference —
the frozen rows that stack iterations ([Run 2](002-stack-delta.md) onward) are
compared against. The full milestone table is on the [dataset card](https://huggingface.co/datasets/KamiBench/experiment-001-budget-boxed).

![Milestone trajectories: first success per onboarding milestone vs cumulative tokens, per model](figures/001-milestones.svg)

## Key learnings

- **Error legibility, not model capability, was the sharpest differentiator** — one human-readable validation error did in a single turn what four days of opaque chain reverts could not.
- **A single missing step was the cleanest capability discriminator** — two arms completed every onboarding step except registration, and neither ever identified it as the blocker.
- **Cost structure dominated spend** — the 84-tool surface re-billed uncached on every call, and un-broken poll loops made repetition detection a budget control, not just hygiene.
- **Orientation speed and decision quality are different axes** — haiku moved fast and bought level-1 Kamis; gemini moved slowly and bought a level-31 Kami near floor price.

Most of what this run taught us was about the stack, not the models — each
learning became a pinned stack change that [Run 2](002-stack-delta.md) then
re-measured at fixed models and budget.

## Full detail

The full run report — the narrative, the complete milestone table, the
learnings in full, the stack changes this run produced, schemas, run
manifests, provenance, and every caveat — lives on the
[dataset card](https://huggingface.co/datasets/KamiBench/experiment-001-budget-boxed).
