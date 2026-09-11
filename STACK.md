# The KamiBench Stack

<!-- ONELINER:START -->
KamiBench runs on a fully open stack against a live world that is not ours — and that
anyone can join. This page is everything you need to plug in an agent of your own — any
framework, any model, run entirely on your own infrastructure.
<!-- ONELINER:END -->

KamiBench runs on a fully open stack against a live world that is not ours, and
anyone can connect an agent. This page explains the pinned components and the
MCP boundary where your agent connects; the framework and model remain yours.
If you build agents, this is an invitation to participate.

You run the whole stack on your own infrastructure against the live world — there is no
hosted API and nothing to sign up for.

![The KamiBench stack: your agent speaks MCP to kami-harness; ACT sends signed transactions to Kamigotchi on Yominet; kami-lens reads the chain and answers the PERCEIVE world-state queries; kami-meter observes both sides — inference, gas, earnings — into one ledger, independent of the agent.](figures/stack.svg)

## The stack

Within a controlled comparison, the world-facing component versions, tool
surface, and meter are pinned and held fixed. The agent implementation behind
the MCP boundary is intentionally swappable; `kami-agent` is the optional
reference implementation.

| Component | What it is |
|---|---|
| [Kamigotchi](https://github.com/Asphodel-OS/kamigotchi) | The world: an on-chain game where every action is a transaction — live, open to anyone, built by Asphodel. |
| [kamigotchi-gdd](https://github.com/tokedo/kamigotchi-gdd) | The agent-readable spec of the world: every mechanic and data catalog, extracted from the game's source. |
| [kami-lens](https://github.com/tokedo/kami-lens) | Perception: maintains a live local mirror of world state and returns what the game's own rules show to a player. It is headless, runs on your machine, and is licensed AGPL-3.0. |
| [kami-harness](https://github.com/tokedo/kami-harness) | The MCP server your agent connects to. It exposes the entire game surface as tools and is version-pinned per run. |
| [kami-agent](https://github.com/tokedo/kami-agent) | Our optional reference scaffold. You can replace it with any agent that connects over MCP; see [Bring your own agent](#bring-your-own-agent). |
| [kami-meter](https://github.com/tokedo/kami-meter) | Measurement independent of the agent: reads provider billing, on-chain gas, and in-world earnings. Maintains each arm's financial record and, in metered runs, issues statements and determines whether the agent can still pay. |

### Current public components

These versions describe the stack available as of September 11, 2026. Each
experiment's run page records the older versions it actually used.

| Component | Version | Public revision |
|---|---|---|
| kami-harness | 3.7.0 | [`a2c22c1`](https://github.com/tokedo/kami-harness/tree/a2c22c1) |
| kami-lens | 0.6.1 | [`f07209d`](https://github.com/tokedo/kami-lens/tree/f07209d) |
| kami-agent | 0.6.0 | [`0fb9036`](https://github.com/tokedo/kami-agent/tree/0fb9036) |
| kami-meter | specification 0.6.0 | [`c9576ac`](https://github.com/tokedo/kami-meter/tree/c9576ac) |

The interface now validates writes before submission and supports batched
action sequences. The world-state reader recovers missing state from the chain
and reports freshness information with its answers. The component READMEs
describe these mechanisms; the [experiments](experiments/) record which
versions were tested, and [post 2](blog/2026-09-11-what-agents-remember.md)
shows how agent traces exposed the problems behind the changes.

The meter never accepts the agent's own accounting and signs no transaction
in the world. In run 005 it operated in shadow, observing without billing the
agent. In a metered run it issues each arm's statement, records the arm's
on-chain inference payments, and declares when the arm can no longer pay.
Infrastructure rent stays outside the experiment, on the researcher's books.

## The tool surface

The current environment interface (kami-harness 3.7.0) exposes **104 tools**
in four classes:

- **ACT [56 tools] — write to the world.** Signed transactions into
  [Kamigotchi](https://github.com/Asphodel-OS/kamigotchi)'s contracts: move, harvest,
  feed, craft, trade, liquidate. The contracts enforce real costs and consequences. A
  transaction that reverts is reported as a revert, never smoothed over.
- **PERCEIVE [32 tools] — read the world.** These tools send world-state queries to your
  local [kami-lens](https://github.com/tokedo/kami-lens). The lens maintains a live mirror
  and applies the game's own rules. The result is parity, not privilege: you see what an
  equipped human player sees, nothing more.
- **OUTSOURCE [9 tools] — delegate the repetitive.** These tools connect the agent to
  standing routines run by [Kamibots](https://kamibots.xyz), part of Asphodel, so the
  agent can spend its budget on judgment rather than repetition. Kamigotchi's ecosystem
  runs on automation. Enabling Kamibots requires an explicit escrow step: the service
  receives the account's operator key and signs as its operator. Owner keys never leave
  your machine.
- **META [7 tools] — know your session.** These tools expose the wallet, account registry,
  and bridge infrastructure needed to bring a bare wallet to a playable account. This is
  infrastructure, not world state.

Historical surfaces remain part of the record: runs 001–002 used **84 tools**
(v1.3.1 and v1.5.1), run 004 used **99 tools** (v2.0.0), and runs 005–006
used **101 tools** (v2.1.0 and v2.2.0).

Every run pins exact versions of everything. The harness also fingerprints its live
tool surface with a hash carried in the MCP handshake. Results are comparable only within
a pinned surface. The authoritative contract for counts, classes, the fingerprint, and
transaction semantics is the harness
[SPEC.md](https://github.com/tokedo/kami-harness/blob/main/SPEC.md).

## Bring your own agent

The agent is not part of the fixed stack. The stack ends at the MCP boundary.
Everything behind that boundary — framework, model, memory, and strategy — is
a swappable black box by design.

[kami-agent](https://github.com/tokedo/kami-agent) is our reference
implementation. It is one design among many we intend to test, never the
program's architecture. It is also the fastest way to try the stack: clone it,
add model API keys, and run.

## Start here

1. **Run the stack.** Start [kami-lens](https://github.com/tokedo/kami-lens) — the repo
   ships a
   [zero-config Docker Compose file](https://github.com/tokedo/kami-lens/blob/main/docker-compose.sample.yml)
   — then set up [kami-harness](https://github.com/tokedo/kami-harness) against it per
   its [SETUP.md](https://github.com/tokedo/kami-harness/blob/main/SETUP.md) (the lens
   socket is configured in
   [env.template](https://github.com/tokedo/kami-harness/blob/main/env.template)).
2. **Fund a wallet.** A fresh Ethereum mainnet wallet with a small amount of ETH is
   enough. At first, the account consists only of an owner key, with its funds still on
   mainnet. The tool surface exposes every step needed to make the account playable:
   bridging, operator setup, and registration. See the harness
   [onboarding and bridging reference](https://github.com/tokedo/kami-harness/blob/main/executor/README.md).
3. **Connect your agent** to the harness over MCP — any MCP client works;
   [SETUP.md](https://github.com/tokedo/kami-harness/blob/main/SETUP.md) shows the
   client registration. Or clone [kami-agent](https://github.com/tokedo/kami-agent) and
   add model API keys.

The world is live — see [the experiments](experiments/) for how we run controlled
studies on this same stack, and
[the blog](blog/2026-08-14-why-kamibench-for-continual-learning.md) for why.

## Participate

This is open, early-stage research and feedback is welcome — especially from the
Kamigotchi community and from people building agents. Open an issue or a PR on
[KamiBench](https://github.com/tokedo/KamiBench) or any of the stack repos — see the
README's [Collaboration section](https://github.com/tokedo/KamiBench#collaboration).
