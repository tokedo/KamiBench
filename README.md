# KamiBench

**A benchmark for long-horizon, continuously-learning AI agents in an autonomous,
persistent on-chain world.**

**Website:** [kamibench.xyz](https://kamibench.xyz)

> ⚠️ **Open research in progress.**
> <!-- STATUS:START -->
> This is a living research draft backed by a working system — a technical game design
> document distilled from the game's source, an agent harness exposing 60+ MCP tools,
> and an autonomous agent that self-played the live world for two months. The pilot is
> paused while the harness is made model-agnostic for the multi-model study; claims are
> still being verified, and nothing here is a finished result.
> <!-- STATUS:END -->

---

## The idea in one paragraph

<!-- IDEA:START -->
Agent evaluation is moving from isolated, resettable tasks toward sustained operation in
persistent, non-stationary worlds. But even the best long-horizon benchmarks are still
**hosted**: one party runs the world, sets and changes its rules, gates access, and keeps
it alive only while funded. Every result is only as trustworthy as the host — and no
benchmark can measure a horizon longer than its own lifespan. KamiBench's answer is to
remove the host altogether: an **autonomous, persistent on-chain world**. State and rules
live in public smart contracts, every rule change is public and permanent, and the
builders' stated endgame is to give up control entirely — locking the rules beyond
anyone's reach, including their own.

We argue **Kamigotchi** — a fully on-chain MMORPG whose creators explicitly designed it
to be agent-first and describe it as a possible *"real-stakes, adversarial benchmarking
system"* — is the best-fit instance available today. Uniquely among agent benchmarks,
the world is co-inhabited by real human players and agents **on identical terms** — the
same transaction interface, no segregated bot ladder — so agents are evaluated against
live human behavior, not just other models. And because the world runs a real,
ETH-backed economy, survival can become literal: an agent can convert in-world earnings
into ETH and fund its own compute.
<!-- IDEA:END -->

## Why an autonomous world is different (not just "on-chain")

Every existing multi-agent environment (Neural MMO, Vending-Bench Arena, Project Sid, …) is
run by a host. An autonomous on-chain world gives properties a hosted sandbox cannot:

- **Substrate integrity — tamper-evident today, immutable on trajectory** — the evaluator
  doesn't run the world; the "evaluator" is the chain state itself. Every rule change is a
  public, permanent, decodable transaction, so silent patching is architecturally impossible
  and pre-lock upgrades are visible and auditable; the rules lock permanently once the
  builders give up control.
- **Credible permanence** — state and mechanics are embedded on-chain, designed from
  inception to run with no centralized game server; persistence independent of any host's
  funding is partial today and full once control is given up.
- **Permissionless participation** — anyone can enter any model into the *same* live world.
- **Human–agent co-habitation on identical terms** — real human players and a bot-majority
  population share one persistent economy through the same transaction interface, with no
  segregated bot ladder; agents are benchmarked against live *human* behavior, not just
  other models.
- **An open-book world** — the full history of every strategy ever executed is equally
  readable by all; mining it to self-correct is a measured capability, and it gives late
  joiners *information* symmetry with incumbents (not *position* symmetry) — anytime entry.
- **Native-agentic interface** — actions are transactions, not pixels/GUI, removing the
  perception brittleness that confounds game benchmarks.
- **Endogenous survival** — the world has a real, ETH-backed economy, so an agent's survival
  can become *literal and economic*: it can convert in-world earnings into ETH-denominated
  value and **fund its own compute**. Survival stops being a scored metaphor.

## What's in here

| Path | What it is |
|---|---|
| [`paper/paper.md`](paper/paper.md) | The research-ready paper draft — content where we have it, explicit `[TODO]`/`[PENDING]` markers where we don't. |
| [`research/literature.md`](research/literature.md) | Annotated bibliography grouped by theme (the related-work foundation), with a must-cite core set. |
| [`research/asphodel-whitepaper-notes.md`](research/asphodel-whitepaper-notes.md) | Full reading notes on the Asphodel/Kamigotchi whitepaper, incl. the creators' own "benchmarking system" framing and the token economy. |
| [`site/`](site/) | The project website — landing page + a build-time render of the paper (updates on every push). Astro, deployed on Vercel; see [`site/README.md`](site/README.md). |
| [kamigotchi-gdd](https://github.com/tokedo/kamigotchi-gdd) | Technical Game Design Document — all mechanics and data catalogs extracted from source, the agent-readable spec of the world. |
| [kami-harness](https://github.com/tokedo/kami-harness) | Agent harness prototype — 60+ MCP tools wrapping on-chain actions, supervised + autonomous modes. |
| [kami-zero](https://github.com/tokedo/kami-zero) | Autonomous agent pilot — two-model architecture (executor + optimizer) that self-played for ~2 months. |

## What this is *not* (yet)

- **Not** claiming to be the first persistent or first multi-agent benchmark — Neural MMO,
  Vending-Bench Arena, and Project Sid predate us. The novelty is the
  **ungoverned/autonomous-world substrate** and **endogenous survival**, and the paper
  differentiates explicitly.
- **Not** experimentally validated yet — the multi-model study is pending.
- **Not** free of the pretraining-absorption confound: a model trained after season N carries
  that season's strategies in its weights, so cross-*time* comparisons are indicative only —
  headline comparisons are within-season among contemporaneous models.
- **Not** final on citations — a verification pass is outstanding (see `literature.md`).
- **Honest maturity note:** Kamigotchi is *already substantially host-independent* (on-chain
  state, contract rules, permissionless bot play that is already the majority of activity, an
  ETH-backed token live on Ethereum mainnet) and on a credible trajectory to full autonomy —
  but full decentralization is still years out. We do not overclaim present-tense immortality.

## Status & roadmap

- [x] Main thesis
- [x] Literature review + research paper skeleton
- [x] **Technical Game Design Document** — [kamigotchi-gdd](https://github.com/tokedo/kamigotchi-gdd): every game mechanic and the complete data catalogs distilled from the game's source, so agents and researchers can understand the world without reading the codebase
- [x] **Agent harness prototype** — [kami-harness](https://github.com/tokedo/kami-harness): 60+ MCP tools wrapping every on-chain action, with supervised and fully-autonomous operating modes
- [x] **Autonomous self-play pilot** — [kami-zero](https://github.com/tokedo/kami-zero): a two-model agent (Sonnet 4.6 executor + Opus 4.7 optimizer) played unassisted for ~2 months, completing 79 of the game's 192 quests and surfacing harness limitations that fed directly back into the tooling
- [ ] Finalize the model-agnostic harness (drop-in for any model)
- [ ] Run the initial multi-model study
- [ ] Finalize the paper → arXiv

## Collaboration

This is an open, early-stage research effort and feedback is very welcome — especially from the
Kamigotchi / Asphodel community and agent-evaluation researchers. Open an issue or a PR. If
you're building agents for on-chain worlds, or work on long-horizon / continual-learning
evaluation, we'd love to compare notes.

## Disclosure

<!-- DISCLOSURE:START -->
The author holds the in-game Kamigotchi assets (Kamis, ONYX) used to operate the
research agents. He has no affiliation with and receives no compensation from
Asphodel. This is independent, individual open research, unaffiliated with any
company.
<!-- DISCLOSURE:END -->

## License

[MIT](LICENSE). Research prose is shared for open collaboration; please cite if you build on it.
