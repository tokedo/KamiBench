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

These versions describe the stack available as of October 7, 2026. Each
experiment's run page records the older versions it actually used.

| Component | Version | Public revision |
|---|---|---|
| kami-harness | 4.6.0 | [`cf8c1bf`](https://github.com/tokedo/kami-harness/tree/cf8c1bf) |
| kami-lens | 1.0.3 | [`7f9be7b`](https://github.com/tokedo/kami-lens/tree/7f9be7b) |
| kami-agent | 0.7.4 | [`32fc4e9`](https://github.com/tokedo/kami-agent/tree/32fc4e9) |
| kamigotchi-gdd | game source `ffda3963` | [`875b7da`](https://github.com/tokedo/kamigotchi-gdd/tree/875b7da) |
| kami-meter | specification 0.6.0 | [`c9576ac`](https://github.com/tokedo/kami-meter/tree/c9576ac) |

These versions follow the game's October 2026 release, which opened a path
from in-game earnings to ETH. The interface carries the token portal (items to
their ERC-20 token and back), reports what each transaction actually paid out
and cost, and lets a read wait until the local mirror has applied your own
transaction's block. Every call fits a time box, and a read with no account
named is a read of your own account. The world-state reader marks
an answer it cannot give in full instead of showing it as complete, and keeps
its clock in step with the chain. Use kami-lens 1.0.1 or newer: 1.0.0 could
serve a stale value when several transactions in one block wrote it.

The component READMEs describe these mechanisms; the
[experiments](experiments/) record which versions were tested, and
[post 2](blog/2026-09-10-what-agents-remember.md) shows how agent traces
exposed the problems behind earlier changes.

The meter never accepts the agent's own accounting and signs no transaction
in the world. In run 005 it operated in shadow, observing without billing the
agent. In a metered run it issues each arm's statement, records the arm's
on-chain inference payments, and declares when the arm can no longer pay.
Infrastructure rent stays outside the experiment, on the researcher's books.

## The tool surface

The current environment interface (kami-harness 4.6.0) exposes **109 tools**
in four classes:

- **ACT [59 tools] — write to the world.** Signed transactions into
  [Kamigotchi](https://github.com/Asphodel-OS/kamigotchi)'s contracts: move, harvest,
  feed, craft, trade, liquidate. The contracts enforce real costs and consequences. A
  transaction that reverts is reported as a revert, never smoothed over.
- **PERCEIVE [34 tools] — read the world.** Most of these tools send world-state queries
  to your local [kami-lens](https://github.com/tokedo/kami-lens); seven read the chain or
  the local catalogs directly. The lens maintains a live mirror and applies the game's own
  rules. The result is parity, not privilege: you see what an equipped human player sees,
  nothing more.
- **OUTSOURCE [9 tools] — delegate the repetitive.** These tools connect the agent to
  standing routines run by [Kamibots](https://kamibots.xyz), the game team's own
  automation service, so an agent can spend its budget on judgment rather than
  repetition. Enabling them is an explicit step the agent takes: the service receives the
  account's operator key and signs as its operator until the agent stops the strategy.
  Owner keys never leave your machine. The class is optional — an agent that never calls
  it contacts no third-party service.
- **META [7 tools] — know your session.** These tools expose the wallet, account registry,
  and bridge infrastructure needed to bring a bare wallet to a playable account. This is
  infrastructure, not world state.

The OUTSOURCE class left in 4.0.0 and returned in 4.6.0, so that agents
without automation of their own can delegate the way the run-006 agents did.

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

### One paste

If you use a coding agent such as Claude Code or Codex, the
[quick start](QUICKSTART.md) is one prompt to paste. It installs the stack on
a machine with 8 GB of RAM, creates a wallet there, and runs the reference
agent's first session. It asks you for one thing — to fund the wallet it
creates — and for a model API key only if none is in your environment.

### Step by step

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
