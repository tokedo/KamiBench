# Run 1 — knowledge delivery, wave 1 (Experiment 006)

<!-- DESIGN:START -->knowledge-delivery<!-- DESIGN:END -->

<!-- STATUS:START -->
In progress — launched 2026-08-17; four arms playing. Results are added as
arms stop.
<!-- STATUS:END -->

<!-- ONELINER:START -->
The cheapest decisive test of the design: the control rung against the full
pushed-knowledge rung, on two mid-tier models. Four arms, one per cell. If
pushed knowledge moves neither model, delivery is not the bottleneck at this
tier and the family stops; if it moves them, wave 2 finds out which piece did
it.
<!-- ONELINER:END -->

| | |
|---|---|
| **Status** | running — results are added as arms stop |
| **Arms** | `claude-sonnet-5` × {control, pushed} · `gpt-5.2` × {control, pushed} — one arm per cell |
| **The box** | 150,000-token session cap · up to 14 days, early stop once an arm's verdict is clear · 0.03 ETH per arm · objective verbatim: "complete as many quests as possible" · $200-per-arm planning ceiling, invisible to the agent |
| **Reasoning** | Sonnet 5 at the provider default; gpt-5.2 at `medium` (its default is no reasoning) |
| **Stack** | [kami-agent](https://github.com/tokedo/kami-agent) v0.5.1 · [kami-harness](https://github.com/tokedo/kami-harness) v2.2.0 — 101 tools, identical surface on every arm · [kami-lens](https://github.com/tokedo/kami-lens) v0.4.0 · design document pinned at launch |
| **Window** | launched 2026-08-17 ≈20:20 UTC; ceiling 2026-08-31 |
| **Dataset** | publishes at close-out, together with the cohort identifiers |

## Goal

Wave 1 compares two knowledge-delivery conditions, called rungs, on Sonnet 5
and gpt-5.2. In the control rung, the agent can read the game knowledge from a
folder. The pushed rung keeps that folder and also delivers knowledge through
the system prompt, search, inline facts, and notes after failed tool calls.

Each model runs once on each rung, creating four model–rung pairs, or cells.
Each cell has one arm. This wave is the first test in the broader Knowledge
Delivery family, the multi-wave experiment described on the design page; the
two selected models define the tier tested here.

One question: **does pushing the game's knowledge to a capable model change
how it plays?** Five [budget-boxed](budget-boxed.md) runs failed to level a
single kami. The [design](knowledge-delivery.md) argues that the failure came
not because the models were small but because the knowledge sat in a folder
nobody read. This wave tests that interpretation by comparing the control and
pushed outcomes for each model.

## The two rungs

- **Control** — today's scaffold: the design document as a read-only folder,
  the agent's remaining ETH shown each session, one sentence that every
  action costs gas.
- **Pushed** — control plus: a fixed rules-only paragraph on what the core
  loop is; a keyword search tool over the design document; item and room
  facts inline in what the agent perceives; and, on every failed tool call, a
  short note on why it failed and which action applies now.

Both rungs see the same 101 tools with byte-identical schemas. Nothing tells
the agent what to do.

## What we're watching

Quests completed is the primary outcome. The other observations help explain
how each arm behaved, although a landed level-up also appears in the
pre-registered verdict rule.

- Quests completed (decides).
- Any level-up, and how many sessions it took.
- Kamis owned over time, and ETH spent buying them.
- Experience left unspent, MUSU banked, gas per quest, survival.
- On the pushed arms: does the agent search, and act on what it finds; after
  an error note, is the next call the right one.

**Pre-registered verdict:** the pushed rung *works* if both models land at
least one level-up and match or beat their own control on quests. Both moving
→ wave 2 bisects. Neither → "delivery is not the bottleneck at this tier."
One → suggestive; wave 2 on that model.

The arrows specify the next step for each possible result: both models moving,
neither model moving, or one model moving. In that order, the family proceeds
to a Wave 2 bisection, stops with the stated conclusion for this model tier, or
continues Wave 2 on the one model as suggestive evidence.

## Launch note

The wave registered with `gpt-5.4` for the two OpenAI cells: one control arm
and one pushed arm. When those arms reached their first model call, the
provider rejected the combination of reasoning and tool use on the endpoint
used by the pinned adapter.

That incompatibility voided both `gpt-5.4` arms at zero model turns. The
Sonnet 5 arms were unaffected.

The two invalid OpenAI arms were replaced the same evening with `gpt-5.2`
arms using reasoning `medium`. The replacement model is price- and
capability-matched and reasons with the full tool surface. The replacement
arms reused the same untouched wallets and kept the same pins.

The resulting wave again has four arms: control and pushed for Sonnet 5, and
control and pushed for `gpt-5.2`.

Cohort identifiers (wallets, accounts) are embargoed until close-out.
