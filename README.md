# KamiBench

**A research program: benchmarking long-horizon, continuously-learning AI
agents in a persistent world that no one operates.**

**Website:** [kamibench.ai](https://kamibench.ai)

> ⚠️ **Open research in progress.**
> <!-- STATUS:START -->
> The first controlled run is complete and its full dataset is public:
> [Experiment 001](experiments/001-budget-boxed.md) dropped three fast-tier
> models into the live world with $10 of inference each.
> [Experiment 002](experiments/002-stack-delta.md) — the same protocol on the
> iterated scaffold/harness stack — is in progress. The paper's results
> synthesis is next.
> <!-- STATUS:END -->

---

## The idea

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
today, co-inhabited by human players and agents on identical terms.

**The game is the substrate, not the research question.** The loop under test is the
one every long-running deployment eventually depends on: an agent enters an
unfamiliar domain with documentation and an accumulated operational history, absorbs
that prior knowledge, acts over months, observes what succeeds and fails — for
itself and for others — and revises its strategy. To our knowledge, no existing
benchmark measures that loop end to end. Here it exists by construction: open source
is the documentation, the chain is the history, and the economy makes the
consequences real.
<!-- IDEA:END -->

## The world

<!-- WORLD:START -->
Kamigotchi is a live on-chain MMORPG — in effect, a never-ending board game in
which every move is recorded on a public ledger. Players operate Kami —
persistent creatures that harvest MUSU, the in-game currency, at shared
locations. Harvesting drains health, and a weakened harvester can be liquidated
by other players, who claim a share of its unclaimed yield. Liquidation costs
yield, not the Kami, which persists and can be revived. Around that loop sits a
rich strategic surface — currently ~70 locations, 74 skills, 178 items — and
every choice (where to harvest, which skills to level, how much liquidation
risk to carry) compounds over long horizons.

No strategy stays dominant: payoffs depend on the live population, and
advantages decay as tactics spread. The test is not finding a strategy once,
but re-finding one as the world evolves.

Participants — human or agent, acting through the same transaction interface —
pay per action and acquire Kamis; skilled play can, in principle, be
profitable. MUSU is intended to connect, through a conversion pool under
development, to ONYX, an ETH-reserve-backed asset live on Ethereum mainnet.
Most strategies, even good long-horizon ones, run negative before they run
positive, like any real business. Real stakes require real losses; self-funding
means out-competing other participants in a live economy.
<!-- WORLD:END -->

## Why a chain — and why this world

<!-- WHY:START -->
That world runs on a permissionless chain — and the chain is doing more than
record-keeping. A public log can expose what a hosted benchmark reports, but it
does not remove the host from execution: the host still applies actions,
determines the resulting state, and publishes the record. In an on-chain world,
execution and the record of execution belong to the same shared system. Neural
MMO, Vending-Bench Arena, and Project Sid retain this hosted structure — a host
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
  underlying transaction layer — no segregated bot ladder.
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

The definition is general and the program is portable: Kamigotchi is the
best-fit instance we know of today, and if a more autonomous world emerges, the
same experiments transfer. The paper develops the argument in full — the
formalization, the instance analysis, and the associated threats to validity.
See [`paper/paper.md`](paper/paper.md).

## The program

The program runs downstream from that position: **idea → experiments →
paper**. Experiments are designed, published, and git-timestamped in the
registry before they run — each design specifies its own instrument, from
agent architecture to measurement; the paper is the synthesis layer across
their results.

## Experiments

The registry of controlled experiments, grouped by design: a design fixes the
protocol — the question, the architecture, the measurement — and each run
executes it with a pinned manifest of models and stack versions. Designs are
published and git-timestamped before their first run; run pages record what
ran and what came out. Internally, runs keep the program's linear experiment
numbering.

- **[Budget-boxed](experiments/budget-boxed.md)** — drop a language model into
  the live world with a fixed inference budget, the game's documentation, and
  no supplied strategy: how does it orient, what does it learn to do, and
  where does it get stuck? The program's first and narrowest design —
  continual learning over long horizons and persistent, self-sustaining life
  in the world are the subject of future designs.
  - **[Run 1 — baseline stack (Experiment 001)](experiments/001-budget-boxed.md)**
    — *complete*: three fast-tier arms ($10 each, 7 days) on the v0 stack;
    haiku-4.5 completed the full onboarding chain on day one; the full dataset
    is [public](https://huggingface.co/datasets/KamiBench/experiment-001-budget-boxed).
  - **[Run 2 — iterated stack (Experiment 002)](experiments/002-stack-delta.md)**
    — *in progress*: the same arms and budget on scaffold v0.2.0 + harness
    v1.5.1, measuring the stack effect against Run 1's frozen baseline.

## The paper

[`paper/paper.md`](paper/paper.md) argues the substrate case — why an
autonomous, persistent on-chain world is the right place to evaluate
long-horizon agents — and is the synthesis layer across registered
experiments: results land there as runs complete. Rendered at
[kamibench.ai/paper](https://kamibench.ai/paper).

## What's in here

| Path | What it is |
|---|---|
| [`experiments/`](experiments/) | The experiment registry — one public, git-timestamped doc per design and per run; [Budget-boxed](experiments/budget-boxed.md) is the first design, with [Run 1](experiments/001-budget-boxed.md) complete and [Run 2](experiments/002-stack-delta.md) in progress. |
| [`paper/paper.md`](paper/paper.md) | The paper — the position argument and the synthesis layer across experiments; everything still in progress is sequenced in its Experimental Program section. |
| [`paper/NOTES.md`](paper/NOTES.md) | Working notes — the draft scaffolding (status tags, TODO/VERIFY markers, stub sections) relocated out of the paper, preserved verbatim. |
| [`research/literature.md`](research/literature.md) | Annotated bibliography grouped by theme (the related-work foundation), with a must-cite core set. |
| [`research/asphodel-whitepaper-notes.md`](research/asphodel-whitepaper-notes.md) | Full reading notes on the Asphodel/Kamigotchi whitepaper, incl. the creators' own "benchmarking system" framing and the token economy. |
| [`site/`](site/) | The project website — landing page + build-time renders of the paper and the experiment registry (updates on every push). Astro, deployed on Vercel; see [`site/README.md`](site/README.md). |
| [kamigotchi-gdd](https://github.com/tokedo/kamigotchi-gdd) | Technical Game Design Document — all mechanics and data catalogs extracted from source, the agent-readable spec of the world. |
| [kami-harness](https://github.com/tokedo/kami-harness) | Environment interface — 84 MCP tools wrapping every on-chain action; version pinned per run. |
| [kami-agent](https://github.com/tokedo/kami-agent) | Reference scaffold — turns a stateless model API into a persistent actor; model-agnostic by construction (v0.2.x). |
| [kami-zero](https://github.com/tokedo/kami-zero) | The exploratory pilot that preceded the controlled program — ~2 months in the live world while the stack was built and rebuilt around it; superseded by the experiment registry. |

## What this is *not* (yet)

- **Not** claiming to be the first persistent or first multi-agent benchmark — Neural MMO,
  Vending-Bench Arena, and Project Sid predate us — nor the first agents to hold real
  capital (Freysa, 2024), nor the first study of agent resource acquisition (RepliBench,
  UK AI Security Institute, 2025). The novelty is the **ungoverned/autonomous-world
  substrate** and the **formalization of endogenous survival into a benchmark regime** —
  with surplus allocation after break-even as the open question — and the paper
  differentiates explicitly.
- **Not** a statistical claim — Experiment 001 ran one seed per arm: a case-study
  behavioral comparison with full public logs. Stack iteration against its frozen
  baseline (Experiment 002, in progress) and replication come before any
  statistical claim.
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
- [x] **Environment interface** — [kami-harness](https://github.com/tokedo/kami-harness): 84 MCP tools wrapping every on-chain action, version pinned per run
- [x] **Exploratory pilot** — [kami-zero](https://github.com/tokedo/kami-zero): an agent played the live world for ~2 months (79/192 quests) while the harness, tools, and agent were reworked around it mid-run — not a clean result, and superseded by the controlled experiments
- [x] **Reference scaffold** — [kami-agent](https://github.com/tokedo/kami-agent): the model-agnostic scaffold for controlled studies (v0.2.x)
- [x] **Experiment 001 — run and published** — [Budget-boxed, Run 1](experiments/001-budget-boxed.md): three fast-tier arms, $10 each; full dataset public ([`v0-baseline`](https://huggingface.co/datasets/KamiBench/experiment-001-budget-boxed/tree/v0-baseline))
- [ ] **Experiment 002 — in progress** — [Budget-boxed, Run 2](experiments/002-stack-delta.md): the iterated stack against Run 1's frozen baseline
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
