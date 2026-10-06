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

These versions describe the stack available as of October 5, 2026. Each
experiment's run page records the older versions it actually used.

| Component | Version | Public revision |
|---|---|---|
| kami-harness | 4.4.0 | [`dfa0860`](https://github.com/tokedo/kami-harness/tree/dfa0860) |
| kami-lens | 1.0.3 | [`7f9be7b`](https://github.com/tokedo/kami-lens/tree/7f9be7b) |
| kami-agent | 0.7.2 | [`fff4113`](https://github.com/tokedo/kami-agent/tree/fff4113) |
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

The current environment interface (kami-harness 4.4.0) exposes **100 tools**
in three classes:

- **ACT [59 tools] — write to the world.** Signed transactions into
  [Kamigotchi](https://github.com/Asphodel-OS/kamigotchi)'s contracts: move, harvest,
  feed, craft, trade, liquidate. The contracts enforce real costs and consequences. A
  transaction that reverts is reported as a revert, never smoothed over.
- **PERCEIVE [34 tools] — read the world.** Most of these tools send world-state queries
  to your local [kami-lens](https://github.com/tokedo/kami-lens); seven read the chain or
  the local catalogs directly. The lens maintains a live mirror and applies the game's own
  rules. The result is parity, not privilege: you see what an equipped human player sees,
  nothing more.
- **META [7 tools] — know your session.** These tools expose the wallet, account registry,
  and bridge infrastructure needed to bring a bare wallet to a playable account. This is
  infrastructure, not world state.

Earlier versions carried a fourth class, OUTSOURCE: tools that connected the
agent to standing routines run by Kamibots, a third-party automation service.
They were removed in 4.0.0. The stack now contacts no third-party strategy
service, and no private key leaves your machine.

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

If you use a coding agent such as Claude Code or Codex, paste the prompt
below into it on a machine with 8 GB of RAM. It installs the stack, creates
a wallet on that machine, and runs the reference agent's first session. It
asks you for one thing: to fund the wallet it creates (0.01 ETH on Ethereum
mainnet, or ETH you already hold on Yominet), and for a model API key only
if none is in your environment. 0.01 ETH is enough to register and start
playing; 0.02 ETH also lets the agent buy its first kami from the newcomer
vendor (0.004 ETH at the time of writing). We tested it on 2026-10-05 on clean Linux
machines with Claude Code and with Codex; each time the agent's first
session registered an account and completed its first quests within a few
minutes. Your wallet's key never leaves your machine.

```text
Set up an autonomous Kamigotchi player on this machine with the open KamiBench stack, start it, and confirm its first transaction on chain.

Kamigotchi is a live on-chain game on the Yominet chain. The stack is four public repos. Clone the main branch of each into ~/kamibench/ and treat their own docs as the authority on details:

- github.com/tokedo/kami-lens — local world-state daemon (Node). Must be 1.0.1 or newer; main is 1.0.3.
- github.com/tokedo/kami-harness — MCP server that exposes the game as tools (Python). Must be 4.4.0 or newer. Read SETUP.md and env.template.
- github.com/tokedo/kami-agent — the agent itself: scheduled sessions around a model API (Python, uv). Read README.md, docs/packaging.md and manifests/example.yaml.
- github.com/tokedo/kamigotchi-gdd — the game's design document, the agent's read-only reference.

Ground rules:

- Secrets never enter this conversation. Do not print, echo, cat or log a private key or an API key, and do not pass one as a command-line argument. Inspect secret files by variable name only.
- Ask me for two things at most: to fund the wallet (step 6), and a model API key — only if none of ANTHROPIC_API_KEY, OPENAI_API_KEY, GEMINI_API_KEY is set in the environment, and then have me write it into the file myself instead of pasting it here. Decide everything else yourself and keep going to the end.
- Install natively, no Docker. Prefer user-level installs. Use sudo only if it works without a password; otherwise give me the one command to run.
- The agent plays by itself. Do not edit its prompts, write into its workspace, or change the cloned repos.

Steps:

1. Machine. It needs 8 GB of RAM (the lens loads the whole world into memory on its first start), git, Node 22.15 or newer, and uv. Install what is missing.

2. kami-lens. Build it and run its daemon as a background service that outlives this session (systemd unit, launchd agent, or the equivalent here), with the default data directory. It reports LIVE (its health command exits 0) a minute or two after a first start; carry on meanwhile.

3. kami-harness. Create a Python 3.13 virtualenv inside the clone and install executor/requirements.txt. Run executor/kwob_bootstrap.py once. Do not register the server with your own MCP client and do not create accounts/roster.yaml: the agent starts the harness itself, and the harness writes the roster.

4. Wallet. With the harness virtualenv (eth_account), generate a new keypair and write MAIN_OWNER_KEY=<private key> to ~/.blocklife-keys/.env (directory mode 700, file mode 600), in one script whose only output is the address. This is the agent's owner wallet. Nothing else goes in that file.

5. kami-agent. Run uv sync. Make the run directory ~/kamibench/run with:
   - reference/ — a copy of the gdd clone, without .git;
   - .env (mode 600) — the model API key under its standard variable name, and MAINNET_RPC_URL=https://ethereum-rpc.publicnode.com, as plain NAME=value lines with no quotes;
   - a manifest copied from manifests/example.yaml, changing only: run_id (your choice), budget_usd: 5, harness.command (the harness virtualenv's python), harness.cwd (the harness clone), and the four pins (the commits you cloned). With an Anthropic key keep the example's model. With another provider's key also set provider, model and price_table (its list prices): pick a current model that is strong at multi-step tool use, not the smallest tier — the agent has to work out for itself how to bridge, create its operator wallet and register.
   Then run kami-agent init. Every connectivity check must pass. The lens line may say the roster query is not answered yet; that is expected at this point.

6. Funding — the one thing I do. Show me the wallet address and ask me to send 0.01 ETH to it on Ethereum mainnet (the agent bridges it to Yominet by itself; if I already hold ETH on Yominet I may send it there instead). Wait for my reply, then confirm on chain that the balance arrived.

7. First session. Start kami-agent run-session --run-dir ~/kamibench/run --manual in the background and wait for session_end in run/telemetry.jsonl: a session can last 20 minutes or more while the agent waits for its bridge. Then find the transaction hashes in run/telemetry.jsonl and confirm one on chain. A new account has to bridge, create its operator wallet and register before it can play, so expect the first session or two to be about that. If a session ends with no transaction, read run/errors.jsonl and the transcript and fix the setup if the setup is at fault, then run one more. If two sessions end with no transaction and the setup is sound, stop and tell me what the transcripts show.

8. Schedule. Install the supervisor cron entry from docs/packaging.md (5-minute poll), with the absolute path of the kami-agent executable and its output appended to run/logs/runner.log.

Finish with a short report: the wallet address and where its key lives; a confirmed transaction hash; the balance of each wallet on each chain, as read from the chain; what is running and where its logs are; when the next session is due (kami-agent status); how to stop the agent (remove the cron entry); and anything that went wrong on the way.
```

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
