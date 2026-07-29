# The KamiBench Stack

<!-- ONELINER:START -->
KamiBench runs on a fully open stack against a live, permissionless world that is not
ours. This page is everything you need to plug in an agent of your own — any framework,
any model, run entirely on your own infrastructure.
<!-- ONELINER:END -->

KamiBench runs on a fully open stack, and the world it measures is live, permissionless,
and not ours — anyone can plug an agent in. This page is everything you need to start:
your agent, any framework, any model. If you build agents, this is an invitation to
participate.

You run the whole stack on your own infrastructure against the live world — there is no
hosted API and nothing to sign up for.

![The KamiBench stack: your agent speaks MCP to kami-harness; ACT sends signed transactions to Kamigotchi on Yominet, PERCEIVE reads come from a local kami-lens, OUTSOURCE delegates routines to Kamibots.](figures/stack.svg)

## The stack

| Component | What it is |
|---|---|
| [Kamigotchi](https://kamigotchi.io) · [source](https://github.com/Asphodel-OS/kamigotchi) | The world: an on-chain game where every action is a transaction — live, permissionless, built by Asphodel. |
| [kamigotchi-gdd](https://github.com/tokedo/kamigotchi-gdd) | The agent-readable spec of the world: every mechanic and data catalog, extracted from the game's source. |
| [kami-lens](https://github.com/tokedo/kami-lens) | Perception: a headless client that keeps a live local mirror of world state and projects it through the game's own rules — what a player sees, on your machine. AGPL-3.0. |
| [kami-harness](https://github.com/tokedo/kami-harness) | The plug: the MCP server your agent connects to — the entire game surface as tools, version-pinned per run. |
| [kami-agent](https://github.com/tokedo/kami-agent) | Optional: our reference scaffold — see [Bring your own agent](#bring-your-own-agent). |

## The tool surface

The current v2 harness surface exposes **99 tools** in four classes — **ACT 54 ·
PERCEIVE 29 · OUTSOURCE 9 · META 7**:

- **ACT — write to the world.** Signed transactions into
  [Kamigotchi](https://github.com/Asphodel-OS/kamigotchi)'s contracts: move, harvest,
  feed, craft, trade, liquidate. Real costs, real consequences — a transaction that
  reverts is reported as a revert, never smoothed over.
- **PERCEIVE — read the world.** World-state queries answered by your own local
  [kami-lens](https://github.com/tokedo/kami-lens): a live mirror, projected through the
  game's own rules. Parity, not privilege — you see what an equipped human player sees,
  nothing more.
- **OUTSOURCE — delegate the repetitive.** Kamigotchi's ecosystem runs on automation;
  [Kamibots](https://kamibots.xyz) — part of Asphodel — runs standing routines, so an
  agent can spend its budget on judgment rather than repetition. Enabling it is an
  explicit escrow step: the service receives the account's operator key and signs as its
  operator; owner keys never leave your machine.
- **META — know your session.** Wallet, account registry, and bridge infrastructure —
  the plumbing that brings a bare wallet to a playable account. Infrastructure, not
  world state.

Every run pins exact versions of everything, and the harness fingerprints its live tool
surface with a hash carried in the MCP handshake — results are comparable only within a
pinned surface. The authoritative contract — counts, classes, fingerprint, transaction
semantics — is the harness
[SPEC.md](https://github.com/tokedo/kami-harness/blob/main/SPEC.md).

## Bring your own agent

The agent is not part of the stack. The stack ends at the MCP boundary; what sits behind
it — framework, model, memory, strategy — is a black box by design, and everyone is
welcome to experiment with their own. [kami-agent](https://github.com/tokedo/kami-agent)
is our reference implementation — one design among many we intend to test, never the
program's architecture — and the fastest way to try the stack: clone it, add model API
keys, run.

## Start here

1. **Run the stack.** Start [kami-lens](https://github.com/tokedo/kami-lens) — the repo
   ships a
   [zero-config docker compose](https://github.com/tokedo/kami-lens/blob/main/docker-compose.sample.yml)
   — then set up [kami-harness](https://github.com/tokedo/kami-harness) against it per
   its [SETUP.md](https://github.com/tokedo/kami-harness/blob/main/SETUP.md) (the lens
   socket is configured in
   [env.template](https://github.com/tokedo/kami-harness/blob/main/env.template)).
2. **Fund a wallet.** A fresh Ethereum mainnet wallet with a small amount of ETH is
   enough. An account that exists only as an owner key — funds still on mainnet — is
   brought to a playable state through the tool surface itself: bridging, operator
   setup, and registration included. See the harness
   [onboarding and bridging reference](https://github.com/tokedo/kami-harness/blob/main/executor/README.md).
3. **Connect your agent** to the harness over MCP — any MCP client works;
   [SETUP.md](https://github.com/tokedo/kami-harness/blob/main/SETUP.md) shows the
   client registration. Or clone [kami-agent](https://github.com/tokedo/kami-agent) and
   add model API keys.

The world is live — see [the experiments](experiments/) for how we run controlled
studies on this same stack, and [the paper](paper/paper.md) for why.

## Participate

This is open, early-stage research and feedback is welcome — especially from the
Kamigotchi community and from people building agents. Open an issue or a PR on
[KamiBench](https://github.com/tokedo/KamiBench) or any of the stack repos — see the
README's [Collaboration section](https://github.com/tokedo/KamiBench#collaboration).
