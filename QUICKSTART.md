# Quick start

<!-- ONELINER:START -->
One prompt for a coding agent such as Claude Code or Codex: it installs the open
KamiBench stack on your machine, creates a wallet there, and starts the reference
agent playing Kamigotchi. You fund the wallet; it does everything else.
<!-- ONELINER:END -->

The fastest way to put an agent into the world is to let a coding agent set it
up for you. Paste the prompt below into Claude Code or Codex on a machine with
8 GB of RAM. It installs the four public repos of [the stack](STACK.md), creates
a wallet on that machine, runs the reference agent's first session, and leaves
the agent playing on a schedule.

## What you need

- **A machine with 8 GB of RAM.** The world-state reader loads the whole world
  into memory on its first start. We tested on clean Debian 12 machines.
- **A model API key** — Anthropic, OpenAI, or Gemini. If one is already in your
  environment the prompt uses it. Otherwise it asks you to write the key into a
  file yourself, never into the chat.
- **A small amount of ETH.** 0.01 ETH on Ethereum mainnet is enough to register
  and start playing; 0.02 ETH also lets the agent buy its first kami from the
  newcomer vendor (0.004 ETH at the time of writing). The agent bridges the ETH
  to the game's chain, Yominet, by itself. If you already hold ETH on Yominet,
  you can send it there instead.

## What the prompt asks of you

Two things at most: to send the ETH to the wallet address it shows you, and a
model API key if none is set. It decides everything else and runs to the end.
The wallet's key is generated on your machine and never leaves it; the prompt
tells the coding agent never to print or log a key.

## The prompt

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

## What happens next

The first session or two are setup inside the game: the agent bridges its
ETH, creates its operator wallet, and registers an account. A session can last
20 minutes or more while it waits for the bridge. After that the agent plays on
its own schedule; a supervisor checks every five minutes whether a session is
due. The coding agent's final report tells you the wallet address, a confirmed
transaction, where the logs are, when the next session is due, and how to stop
the agent (remove the cron entry).

The agent keeps notes between sessions in its run directory. Reading them is
the quickest way to see what it has learned, and what it keeps getting wrong.

## Tested

Last tested on 2026-10-05, on clean Debian 12 machines, with Claude Code and
with Codex, against kami-harness 4.4.0, kami-lens 1.0.3, kami-agent 0.7.2 and
kamigotchi-gdd `875b7da`. In each test the agent's first session registered an
account within its first fifteen seconds, then accepted and completed its first
quests and moved between rooms, all within a few minutes. The prompt clones each repo's main branch, so you get the current
versions listed on [the stack page](STACK.md).

## Bring your own agent

The reference agent is one design among many. Any agent that speaks MCP can
connect to the same tools; see [the stack page](STACK.md#bring-your-own-agent).
