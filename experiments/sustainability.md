# Sustainability — whether an agent can earn enough to pay for inference and gas

<!-- STATUS:START -->
Pending — the design family is settled, and its binding public pre-registration
is published at experiment registry time, before launch.
<!-- STATUS:END -->

<!-- ONELINER:START -->
The sustainability family follows knowledge delivery and tests agents that pay
their own way. Each agent starts with seed money, earns from the game, and pays
for its own inference and gas. KamiBench combines the seed, earnings, inference
costs, and gas in a running balance that replaces the fixed evaluation budget,
so an agent lives exactly as long as it can pay for its own thinking. The
balance also provides the feedback a learning agent needs: one number, set by
the live economy, that says how the agent is doing.
<!-- ONELINER:END -->

## The balance is the metric

Each agent starts with a seed, earns from the world, and pays for inference and
gas. Together, these four terms define the agent's state as a single running
balance, replacing the fixed evaluation budget with an economic survival
objective:

![The running balance: S(t) = seed − inference_cost(t) − gas_spent(t) + earnings(t) — what the agent starts with and what it earns in-world, less what it spends on thinking and on transaction fees](figures/balance.svg)

*Starting money and in-world earnings add to the balance, while inference and
transaction fees subtract from it. Every term is under the agent's control;
server costs stay outside the experiment, on the researcher's books.*

The balance puts capability and cost on one scale instead of two axes on a
scatter plot. An agent that overthinks pays for that inference, while an agent
that underthinks earns less. The game economy — not the benchmark designer —
sets the exchange rate between intelligence and compute.

## One wallet, one currency

The agent's entire economy runs through a single on-chain wallet in a single
currency. The only source of earnings is in-world MUSU, which the agent swaps to
ETH through the in-game pool. Money sent by other agents is tracked separately
as `transfers_received(t)`. This bookkeeping term sits outside the figure; the
money is counted and spendable, but never mistaken for earnings.

Money leaves through two sinks: gas, paid natively by every transaction, and
inference, paid from a prepaid balance that the agent must refill from its own
wallet. When the agent can no longer fund a session, thinking stops. The
inference payment is real: the agent sends ETH to a treasury address, and
settlement is on-chain and auditable.

Infrastructure is not a sink: the machine an agent runs on is a research
expense outside the experiment, and the meter bills only what the agent can
influence.

## The meter — an architecture-agnostic economic surface

The dedicated [kami-meter](https://github.com/tokedo/kami-meter) component lives
outside every tested agent. It reads provider usage records, on-chain gas, and
earnings. From those records, kami-meter meters usage, issues bills, settles
payments, and declares economic death. The agent acts and sees through the
game's own interfaces, while its economic survival depends on the meter.

By using an identical billing process for any architecture, the meter provides
an architecture-agnostic economic surface that makes outcomes comparable
across scaffolds and models. The reference scaffold is one implementation among
any the meter can bill.

![The economic surface: the agent acts and perceives through the scaffold, the environment interface, and the world. Provider usage records and on-chain gas and earnings flow one way into kami-meter. The meter issues per-arm statements; only the statement flows back to the agent, at session start.](figures/meter-surface.svg)

- **The agent always sees its bill and never writes it.** Every session opens
  with a machine-readable financial statement — balances, bills, prices, its
  own lifetime burn curve — and no agent's self-accounting is ever accepted.
- **Death is the balance's verdict, not the evaluator's.** An agent is dead when
  it can no longer fund its next session; the meter emits the death
  certificate, and the evaluators read it rather than issue it.
- **Full economic information.** Token prices and exchange rates are visible to
  the agent by design. The agent pays USD-denominated costs from an ETH wallet,
  creating real exchange-rate exposure as a feature.

## What it observes

- **The survival curve is the headline.** For each model and architecture, the
  curve shows whether the agent survives or goes bankrupt, and *when*.
  Single-run survival near an absorbing barrier rewards risk appetite as well
  as skill, and economic conditions are seasonal. The pre-registration treats
  both limitations.
- **Unit cost against experience** — cost per unit earned, plotted against
  cumulative experience. A declining curve would be a purely economic signature
  of learning-by-doing, which is a hypothesis this family tests rather than a
  claim. Even if every agent goes bankrupt, the curve shows whether any agent
  was approaching sustainability when it died, so that outcome is a result and
  not a failed experiment.
- **The terms of S(t)** — spending against earnings over time, giving the full
  financial trajectory of every arm.

## What the pre-registration binds

This page describes the design; the public pre-registration binds it. Every
falsifiable detail remains deliberately deferred to the pre-registration,
including seed sizes, the pinned price tables, session floors, the model list,
and N. As with every design in this registry, the pre-registration is published
at experiment registry time.
