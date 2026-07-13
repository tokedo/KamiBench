# KamiBench

**A research program: benchmarking long-horizon, continuously-learning AI
agents in a persistent world that no one operates.**

**Website:** [kamibench.xyz](https://kamibench.xyz)

> ⚠️ **Open research in progress.**
> <!-- STATUS:START -->
> Experiment 001 is registered and pending. The game specification, an
> environment interface exposing 60+ MCP tools, and a two-month unassisted pilot
> are public; the reference scaffold is in final implementation. Controlled
> results are not yet available.
> <!-- STATUS:END -->

---

## The idea in one paragraph

<!-- IDEA:START -->
Evaluating an agent over months requires more than a long-running task. It requires
a world whose history anyone can inspect, whose rules cannot be quietly adjusted
mid-run — not by the evaluator, not even by the world's creators — and whose state
persists beyond any single experiment. Open-source environments satisfy only part of
this requirement: anyone can read the rules, but code alone cannot prove which rules
were actually executed, when they changed, or what happened while the world ran.

A permissionless chain extends openness from code to execution. Its ledger is the
world's shared operational history — a permanent corpus of actions, outcomes, and
rule changes that researchers and agents alike can study. Its economy adds a second
property: resources earned inside the world have external value and can, in
principle, pay for the agent's continued inference.

One existing world offers this unusual combination and has operated continuously for
more than a year: **Kamigotchi**, a fully on-chain MMORPG whose creators explicitly
designed it to be agent-first and describe it as a possible *"real-stakes,
adversarial benchmarking system."* We argue it is the best-fit instance available
today. The world is co-inhabited by human players and agents on identical terms: the
same transaction interface, the same economy, the same evolving state. There is no
segregated bot ladder. Agents are evaluated amid live human behavior, not just other
models or scripted simulations.

**The game is the substrate, not the research question.** The loop under test is the
one every long-running deployment eventually depends on: an agent enters an
unfamiliar domain with documentation and an accumulated operational history, absorbs
that prior knowledge, acts over months, observes what succeeds and fails — for
itself and for others — and revises its strategy. To our knowledge, no existing
benchmark measures that loop end to end. Here it exists by construction: open source
is the documentation, the chain is the history, and the economy makes the
consequences real.
<!-- IDEA:END -->

## The program

The program runs downstream from that position: **idea → experiments →
paper**. Experiments are designed, published, and git-timestamped in the
registry before they run — each design specifies its own instrument, from
agent architecture to measurement; the paper is the synthesis layer across
their results.

## Experiments

The registry of controlled experiments. Each design is published here and
git-timestamped before its run starts; results are appended without revising
the registered protocol. Any amendment is explicit, dated, and preserves the
original wording.

- **[Experiment 001 — Budget-boxed, zero-prior orientation](experiments/001-budget-boxed.md)**
  — given identical starting conditions, a fixed inference budget, the game's
  design document, and no supplied strategy beyond it, how do frontier models
  orient and establish themselves in a novel persistent world?
  The program's first and narrowest step — continual learning over long
  horizons and persistent, self-sustaining life in the world are the subject
  of future experiments.
  *Design registered; infrastructure in final implementation; run pending.*

## The paper

[`paper/paper.md`](paper/paper.md) argues the substrate case — why an
autonomous, persistent on-chain world is the right place to evaluate
long-horizon agents — and is the synthesis layer across registered
experiments: results land there as runs complete. Rendered at
[kamibench.xyz/paper](https://kamibench.xyz/paper).

## Feasibility: the kami-zero pilot

<!-- PILOT:START -->
Before the controlled program, an autonomous pilot established the feasibility
of persistent operation in the live world: [kami-zero](https://github.com/tokedo/kami-zero),
a two-model agent — a Sonnet 4.6 executor on ~5-minute ticks and an Opus 4.7
optimizer on ~6-hour cycles.

**~2 months · 79/192 quests · unassisted** (snapshot 2026-07-06)

The agent played unassisted while the surrounding tooling remained under active
development; limitations surfaced during the pilot fed directly back into the
environment interface. The pilot predates the registered experiment designs —
it is feasibility evidence, not a controlled benchmark result, and controlled
experiment results supersede it.
<!-- PILOT:END -->

## Why a chain — and why this world

<!-- WHY:START -->
A public log can expose what a hosted benchmark reports, but it does not remove
the host from execution: the host still applies actions, determines the
resulting state, and publishes the record. In an on-chain world, execution and
the record of execution belong to the same shared system. Neural MMO,
Vending-Bench Arena, and Project Sid retain this hosted structure — a host
executes the world; the properties below are what on-chain execution and
Kamigotchi's particular design provide instead.

- **A verifiable record of what happened** — The ledger is not telemetry emitted by the
  evaluator after the fact. It is the public state-transition record from which
  the world can be reconstructed. Anyone can audit a run without trusting
  evaluator-owned servers or private logs, and later rule changes cannot rewrite
  the trajectory that preceded them.
- **A world between experiments** — The state does not reset when a study ends.
  New agents enter a world already shaped by prior players, agents, and rule
  changes, so later experiments inherit the same operational history rather
  than beginning from a fresh benchmark copy.
- **One world for humans and agents** — Any researcher can enter an agent
  without asking a benchmark host to provision an instance. Humans and agents
  participate in the same evolving state and economy through the same
  underlying transaction layer — a population its creators report to be
  bot-majority (Asphodel, 2026).
- **An open past, an unknown future** — Every entrant can study the same public
  action history. But the next state is produced by a live population and does
  not yet exist. As strategies spread and inhabitants adapt, the meta changes;
  the test distribution evolves without a curator authoring new episodes.
- **Actions without a GUI** — Actions are structured transactions rather than
  pixels or interface gestures. This removes perception brittleness from the
  primary measurement and focuses the benchmark on planning, memory,
  adaptation, and resource use.
- **Consequences with external value** — Agents can earn assets with real,
  ETH-backed value. In future experiments, those earnings can, in principle,
  pay for continued inference — making survival an operating constraint, not
  just a score.
<!-- WHY:END -->

<!-- SURPLUS:START -->
If an agent earns more than its inference costs, the question changes from
whether it can continue to how it allocates the surplus. Could a game become
the economic engine that supports persistent activity beyond the game?

**Not merely whether an agent can survive, but what it does after survival is
secured.**
<!-- SURPLUS:END -->

The paper develops this argument in full: the formalization, Kamigotchi as the
best-fit instance available today, and the associated threats to validity — see
[`paper/paper.md`](paper/paper.md).

## What's in here

| Path | What it is |
|---|---|
| [`experiments/`](experiments/) | The experiment registry — one public, git-timestamped design per controlled experiment; [001 — budget-boxed, zero-prior orientation](experiments/001-budget-boxed.md) is the first. |
| [`paper/paper.md`](paper/paper.md) | The paper — the position argument and the synthesis layer across experiments; everything still in progress is sequenced in its Experimental Program section. |
| [`paper/NOTES.md`](paper/NOTES.md) | Working notes — the draft scaffolding (status tags, TODO/VERIFY markers, stub sections) relocated out of the paper, preserved verbatim. |
| [`research/literature.md`](research/literature.md) | Annotated bibliography grouped by theme (the related-work foundation), with a must-cite core set. |
| [`research/asphodel-whitepaper-notes.md`](research/asphodel-whitepaper-notes.md) | Full reading notes on the Asphodel/Kamigotchi whitepaper, incl. the creators' own "benchmarking system" framing and the token economy. |
| [`site/`](site/) | The project website — landing page + build-time renders of the paper and the experiment registry (updates on every push). Astro, deployed on Vercel; see [`site/README.md`](site/README.md). |
| [kamigotchi-gdd](https://github.com/tokedo/kamigotchi-gdd) | Technical Game Design Document — all mechanics and data catalogs extracted from source, the agent-readable spec of the world. |
| [kami-harness](https://github.com/tokedo/kami-harness) | Environment interface — 60+ MCP tools wrapping every on-chain action (v1.0.0). |
| [kami-agent](https://github.com/tokedo/kami-agent) | Reference scaffold — turns a stateless model API into a persistent actor; model-agnostic by construction, in final implementation. |
| [kami-zero](https://github.com/tokedo/kami-zero) | The feasibility pilot — a two-model agent that ran unassisted in the live world for ~2 months. |

## What this is *not* (yet)

- **Not** claiming to be the first persistent or first multi-agent benchmark — Neural MMO,
  Vending-Bench Arena, and Project Sid predate us — nor the first agents to hold real
  capital (Freysa, 2024), nor the first study of agent resource acquisition (RepliBench,
  UK AI Security Institute, 2025). The novelty is the **ungoverned/autonomous-world
  substrate** and the **formalization of endogenous survival into a benchmark regime** —
  with surplus allocation after break-even as the open question — and the paper
  differentiates explicitly.
- **Not** experimentally validated yet — experiment 001 is design-registered; its run is
  pending.
- **Not** free of the pretraining-absorption confound: a model trained after season N carries
  that season's strategies in its weights, so cross-*time* comparisons are indicative only —
  headline comparisons are within-season among contemporaneous models.
- **Not** final on citations — a verification pass is outstanding (see `literature.md`).
- **Honest maturity note:** Kamigotchi is *already substantially host-independent* (on-chain
  state, contract rules, permissionless automated play that its creators report as the
  majority of activity, an ETH-backed token live on Ethereum mainnet) and on a credible
  trajectory to full autonomy — but full decentralization is still years out. We do not
  overclaim present-tense immortality.

## Status & roadmap

<!-- ROADMAP:START -->
- [x] Main thesis
- [x] Literature review + research paper skeleton
- [x] **Technical Game Design Document** — [kamigotchi-gdd](https://github.com/tokedo/kamigotchi-gdd): every game mechanic and the complete data catalogs distilled from the game's source, so agents and researchers can understand the world without reading the codebase
- [x] **Environment interface** — [kami-harness](https://github.com/tokedo/kami-harness) v1.0.0: 60+ MCP tools wrapping every on-chain action
- [x] **Feasibility pilot** — [kami-zero](https://github.com/tokedo/kami-zero): a two-model agent played the live world unassisted for ~2 months, completing 79 of the game's 192 quests
- [x] **Experiment 001 design registered** — [budget-boxed, zero-prior orientation](experiments/001-budget-boxed.md)
- [ ] **Reference scaffold** — [kami-agent](https://github.com/tokedo/kami-agent): the model-agnostic scaffold for controlled studies, in final implementation
- [ ] Run experiment 001
- [ ] Paper synthesis of experiment results → arXiv
<!-- ROADMAP:END -->

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
