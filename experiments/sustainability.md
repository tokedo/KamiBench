# Sustainability

<!-- STATUS:START -->
Pending — the design family is settled, and its binding public pre-registration
is published at experiment registry time, before launch.
<!-- STATUS:END -->

<!-- ONELINER:START -->
The sustainability family follows knowledge delivery and tests agents that pay
their own way. A running balance replaces the fixed evaluation budget, so an
agent lives exactly as long as it can pay for its own thinking. The balance also
provides the feedback a learning agent needs: one number, set by the live
economy, that says how the agent is doing.
<!-- ONELINER:END -->

## The balance is the metric

This family replaces fixed evaluation budgets with an economic survival
objective. Each agent's state is a single running balance:

![The running balance: S(t) = seed − inference_cost(t) − gas_spent(t) + earnings(t) — what the agent starts with and what it earns in-world, less what it spends on thinking and on transaction fees](figures/balance.svg)

*One line, four terms: what the agent starts with and earns, against what
thinking and acting cost it. Every term is under the agent's control —
server costs sit outside the experiment, on the researcher's books.*

The agent starts with a seed and pays its own way from there. Capability and
cost stop being two axes on a scatter plot: an agent that overthinks pays for
it, an agent that underthinks earns less, and the game economy — not the
benchmark designer — sets the exchange rate between intelligence and compute.

## One wallet, one currency

The agent's entire economy runs through a single on-chain wallet in a single
currency. One source: earn MUSU in-world, swap to ETH through the in-game pool.
Two sinks: gas, paid natively by every transaction; and thinking, a prepaid
balance the agent must refill from its own wallet — when it can no longer fund
a session, thinking stops. Infrastructure is not a sink: the machine an agent
runs on is a research expense, outside the experiment — the meter bills only
what the agent can influence.

Payment is real: the agent sends ETH to a treasury address, and settlement is
on-chain and auditable. One bookkeeping term sits outside the figure —
`transfers_received(t)`, money other agents send: counted and spendable, never
mistaken for what the agent earned.

## The meter — an architecture-agnostic economic surface

The machinery that meters usage, issues bills, settles payments, and declares
economic death is a dedicated stack component
([kami-meter](https://github.com/tokedo/kami-meter)), and it
lives outside every tested agent. The agent acts and sees through the game's
own interfaces; it exists through the meter. Because the billing rail is identical for any
architecture, economic outcomes are comparable across scaffolds and models —
the reference scaffold is one implementation among any the meter can bill.

![The economic surface: the agent loop acts and perceives through the scaffold, the environment interface, and the world, while kami-meter observes provider usage records and on-chain gas and earnings one-way and issues per-arm statements — the only thing that flows back into the loop is the statement itself, at session start](figures/meter-surface.svg)

- **The agent always sees its bill and never writes it.** Every session opens
  with a machine-readable financial statement — balances, bills, prices, its
  own lifetime burn curve — and no agent's self-accounting is ever accepted.
- **Death is the balance's verdict, not the evaluator's.** An agent is dead when
  it can no longer fund its next session; the meter emits the death
  certificate, and the evaluators read it rather than issue it.
- **Full economic information.** Prices — tokens, exchange rates — are
  agent-visible by design. The agent carries USD-denominated costs in an ETH
  wallet: real exchange-rate exposure, as a feature.

## What it observes

- **The survival curve is the headline** — per model and architecture: survive
  or go bankrupt, and *when*.
- **Underneath it, unit cost against experience** — cost per unit earned
  against cumulative experience. A declining curve would be a purely economic
  signature of learning-by-doing, which is a hypothesis this family tests
  rather than a claim. It is also why all-agents-bankrupt is a result and not a
  failed experiment: the curve says whether any agent was approaching
  sustainability when it died.
- **S(t) decomposed** into its terms — spend against earnings over
  time — the full financial trajectory of every arm.

## What the pre-registration binds

This page describes the design; the public pre-registration binds it. Every
falsifiable specific — seed sizes, the pinned price tables, session floors, the
model list, N — is deliberately deferred to the
pre-registration published at experiment registry time, as it is for every
design in this registry. The honest limitations are treated there too:
single-run survival near an absorbing barrier rewards risk appetite as well as
skill, and economic conditions are seasonal.
