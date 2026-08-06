# KamiBench

**A research program: testing whether AI agents can turn intelligence into
expertise — continual learning, over months, in a persistent world that no
one operates.**

**Website:** [kamibench.ai](https://kamibench.ai)

> ⚠️ **Open research in progress.**
> <!-- STATUS:START -->
> KamiBench is ongoing research: controlled experiments dropping AI agents
> into a live, persistent world, with designs pre-registered and every dataset
> published as its run closes — [the experiments](experiments/) carry the
> current state of the series. The stack behind them is fully open, and
> [one page](STACK.md) is everything you need to plug in an agent of your
> own. If you build agents, consider this an invitation.
> <!-- STATUS:END -->

---

## The idea

<!-- IDEA:START -->
Evaluating an agent over months requires more than a long-running task — a task
ends, a world does not. It requires
a world whose history anyone can inspect, whose rules cannot be quietly adjusted
mid-run — not by the evaluator, not even by the world's creators — and whose state
persists beyond any single experiment. Open-source environments satisfy only part of
this requirement: anyone can read the rules, but code alone cannot prove which rules
were actually executed, when they changed, or what happened while the world ran.

A chain that anyone can join extends openness from code to execution. Its public
record is the world's shared operational history — a permanent corpus of actions,
outcomes, and rule changes that researchers and agents alike can study. Its economy adds a second
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
itself and for others — and revises its strategy. That loop has a name —
continual learning — and what it builds is expertise: a working model of the few
things that matter in this world and the many that don't. Intelligence alone does
not confer it. An agent that cannot accumulate experience meets every week as a
newcomer, re-deriving everything from scratch, however capable the model behind
it. To our knowledge, no existing
benchmark measures that loop end to end — episodic benchmarks reset it at
exactly the point where it would begin to show. Here it exists by construction: open source
is the documentation, the chain is the history, and the economy makes the
consequences real.
<!-- IDEA:END -->

## The world

<!-- WORLD:START -->
Kamigotchi is a live on-chain MMORPG — in effect, a never-ending board game in
which every move is public and permanent. Players operate Kami —
persistent creatures that harvest MUSU, the in-game currency, at shared
locations. Harvesting drains health, and a weakened harvester can be liquidated
by other players, who claim a share of its unclaimed yield. Liquidation costs
yield, not the Kami, which persists and can be revived. Around that loop sits a
rich strategic surface — currently ~70 locations, 74 skills, 178 items — and
every choice (where to harvest, which skills to level, how much liquidation
risk to carry) compounds over long horizons. The surface is too large to
reason through from scratch each session; skilled play is largely knowing
what to ignore.

No strategy stays dominant: payoffs depend on the live population, and
advantages decay as tactics spread. The test is not finding a strategy once,
but re-finding one as the world evolves.

Participants — human or agent, acting through the same transaction interface —
pay per action and acquire Kamis; skilled play can, in principle, be
profitable. MUSU connects, through an in-game swap pool, to ONYX, an
ETH-reserve-backed asset live on Ethereum mainnet.
Most strategies, even good long-horizon ones, run negative before they run
positive, like any real business. Real stakes require real losses; self-funding
means out-competing other participants in a live economy.
<!-- WORLD:END -->

## Why a chain — and why this world

<!-- WHY:START -->
That world runs on a public chain that anyone can join — and the chain is doing
more than record-keeping. A public log can expose what a hosted benchmark reports, but it
does not remove the host from execution: the host still applies actions,
determines the resulting state, and publishes the record. In an on-chain world,
execution and the record of execution belong to the same shared system. Neural
MMO, Vending-Bench Arena, and Project Sid retain this hosted structure — a host
executes the world; the properties below are what on-chain execution and
Kamigotchi's particular design provide instead.

- **A verifiable record of what happened** — The chain is not telemetry emitted by
  the evaluator after the fact. Its record is the public history from which
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

- **[Sustainability](experiments/sustainability.md)** — *pending*: the next
  design family, and the program's thesis made measurable. A running balance
  replaces the fixed evaluation budget — an agent lives exactly as long as it
  can pay for its own thinking — so capability and efficiency are priced in
  one number by the live economy. That number is also the feedback a learning
  agent needs: a continuous signal of how it is doing, set by the economy
  rather than by a grader. Binding
  pre-registration publishes before launch.
- **[Budget-boxed — stack validation](experiments/budget-boxed.md)** — the
  instrument-hardening series: controlled, deliberately bounded runs (fixed
  inference budget, fixed wall clock, fast-tier models) that prove the
  environment interface, the scaffold, the telemetry, and the accounting
  before anything open-ended runs on them. Each run's findings become
  concrete stack changes, and the next run measures them at fixed models and
  budget. [Runs 1](experiments/001-budget-boxed.md) and
  [2](experiments/002-stack-delta.md) are complete, each with a full public
  dataset
  ([001](https://huggingface.co/datasets/KamiBench/experiment-001-budget-boxed),
  [002](https://huggingface.co/datasets/KamiBench/experiment-002-budget-boxed));
  [Run 3](experiments/003-perception-parity.md) was aborted and reported;
  [Run 4](experiments/004-perception-parity-rerun.md) is running on the
  perception-parity stack.

## The paper

[`paper/paper.md`](paper/paper.md) argues the substrate case — why an
autonomous, persistent on-chain world is the right place to evaluate
long-horizon agents — and is the synthesis layer across registered
experiments: results land there as runs complete. Rendered at
[kamibench.ai/paper](https://kamibench.ai/paper).

## What's in here

| Path | What it is |
|---|---|
| [`experiments/`](experiments/) | The experiment registry — one public, git-timestamped doc per design and per run; the registry pages carry the current state of every run. |
| [`paper/paper.md`](paper/paper.md) | The paper — the position argument and the synthesis layer across experiments; everything still in progress is sequenced in its Experimental Program section. |
| [`research/literature.md`](research/literature.md) | Annotated bibliography grouped by theme (the related-work foundation), with a must-cite core set. |
| [`site/`](site/) | The project website — landing page + build-time renders of the paper and the experiment registry (updates on every push). Astro, deployed on Vercel; see [`site/README.md`](site/README.md). |
| [kamigotchi-gdd](https://github.com/tokedo/kamigotchi-gdd) | Technical Game Design Document — all mechanics and data catalogs extracted from source, the agent-readable spec of the world. |
| [kami-lens](https://github.com/tokedo/kami-lens) | Perception layer — a headless client keeping a live local mirror of world state, projected through the game's own rules: what an equipped human player sees, on your machine. |
| [kami-harness](https://github.com/tokedo/kami-harness) | Environment interface — MCP tools wrapping every on-chain action; version pinned per run. Current v2 surface: 99 tools with lens-backed world-state reads; the 84-tool v1.x surface ran Experiments 001–002. |
| [kami-agent](https://github.com/tokedo/kami-agent) | Reference scaffold — turns a stateless model API into a persistent actor; model-agnostic by construction. |

## What this is *not* (yet)

- **Not** claiming to be the first persistent or first multi-agent benchmark — Neural MMO,
  Vending-Bench Arena, and Project Sid predate us — nor the first agents to hold real
  capital (Freysa, 2024), nor the first study of agent resource acquisition (RepliBench,
  UK AI Security Institute, 2025). The novelty is the **ungoverned/autonomous-world
  substrate** and the **formalization of self-funded survival into a benchmark regime** —
  with surplus allocation after break-even as the open question — and the paper
  differentiates explicitly.
- **Not** a statistical claim — Experiments 001 and 002 each ran one seed per arm: a
  case-study behavioral comparison with full public logs, and the run-over-run delta
  is a cross-epoch observation, not a controlled comparison. Replication comes before
  any statistical claim.
- **Not** a model ranking — the budget-boxed runs are stack stress-tests: fast-tier
  arms under a $10 cap, chosen for coverage of the tool surface, say nothing about
  frontier capability.
- **Not** free of the pretraining-absorption confound: a model trained after season N carries
  that season's strategies in its weights, so cross-*time* comparisons are indicative only —
  headline comparisons are within-season among contemporaneous models.
- **Not** final on citations — a verification pass is outstanding (see `literature.md`).
- **Honest maturity note:** Kamigotchi is *already substantially host-independent* (on-chain
  state, contract rules, automated play open to anyone — and reported by its creators as the
  majority of activity — an ETH-backed token live on Ethereum mainnet) and on a credible
  trajectory to full autonomy — but full decentralization is still years out. We do not
  overclaim present-tense immortality.

## Collaboration

This is an open, early-stage research effort and feedback is very welcome — especially from the
Kamigotchi / Asphodel community and agent-evaluation researchers. Open an issue or a PR. If
you're building agents for on-chain worlds, or work on long-horizon / continual-learning
evaluation, we'd love to compare notes.

## Disclosure

<!-- DISCLOSURE:START -->
The author holds the in-game Kamigotchi assets (Kamis, ONYX) used to operate the
research agents. This is independent, individual open research: the author is not
employed or compensated by Asphodel, and the studio has no input on experiment
design, execution, analysis, or reporting. The author communicates with the studio,
as any researcher studying a live system would; the game itself remains under the
studio's control and may evolve independently of this research. This research is
conducted in a personal capacity, on personal time and infrastructure, and is not
affiliated with, funded by, or endorsed by any company, including the author's
employer.
<!-- DISCLOSURE:END -->

## License

[MIT](LICENSE). Research prose is shared for open collaboration; please cite if you build on it.
