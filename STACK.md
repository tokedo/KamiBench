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
| [kami-meter](https://github.com/tokedo/kami-meter) | Measurement: maintains one standardized ledger of costs and earnings per agent: inference (provider billing), gas, and in-world income. It operates independently of the agent under test. It is observe-only: the meter reads the chain and billing APIs and writes nothing. |

## The tool surface

The current harness surface (v2.1.0) exposes **101 tools** in four classes:

- **ACT [55 tools] — write to the world.** Signed transactions into
  [Kamigotchi](https://github.com/Asphodel-OS/kamigotchi)'s contracts: move, harvest,
  feed, craft, trade, liquidate. The contracts enforce real costs and consequences. A
  transaction that reverts is reported as a revert, never smoothed over.
- **PERCEIVE [30 tools] — read the world.** These tools send world-state queries to your
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
