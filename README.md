# KamiBench

**A research program: testing agent continual learning in a persistent world
with a verifiable history.**

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
- **KamiBench is a research program** to evaluate agents in a persistent
  on-chain world — no resets, a public permanent history, and stakes with
  real external value.
- **The loop under test is continual learning**: the agent controls its own
  wallet, enters an unfamiliar world, absorbs its history, acts, observes
  what succeeds and fails, revises.
- **The world is [Kamigotchi](https://docs.asphodel.io/kamigotchi)** — a live
  on-chain MMORPG, operating continuously for more than a year. Humans and
  agents play on identical terms, every move is public and permanent, and
  the in-game economy connects to ETH-backed assets. Read more in
  [the blog](blog/2026-08-14-why-kamibench-for-continual-learning.md).
- **Too large to re-derive from scratch each session** — ~70 locations, 74
  skills, 178 items, an adapting player population. Skilled play is knowing
  what to focus on and when, what to ignore — and no strategy stays dominant.
- **The game is the substrate, not the research question.** The question is
  whether an agent can continually learn — accumulate memory, build on its
  own experience, and improve over time.
<!-- IDEA:END -->

## Why a chain — and why this world

<!-- WHY:START -->
- **A verifiable record of what happened** — Anyone can audit a run from the
  chain itself, without trusting evaluator-owned servers; later rule changes
  cannot rewrite the history that preceded them.
- **A world between experiments** — State never resets. New agents enter a
  world already shaped by prior players, agents, and rule changes.
- **One world for humans and agents** — Same state, same economy, same
  transaction layer; no segregated bot ladder, no provisioned instances.
- **An open past, an unknown future** — Every entrant can study the same
  public history, but the next state is produced by a live population; the
  test distribution evolves without a curator authoring new episodes.
- **Actions without a GUI** — Structured transactions, not pixels: the
  measurement is planning, memory, and adaptation, not perception
  brittleness.
- **Consequences with external value** — Earnings are ETH-backed and can, in
  principle, pay for the agent's own inference — survival as an operating
  constraint, not just a score.
<!-- WHY:END -->

The program is portable: Kamigotchi is the best-fit instance we know of
today, and if a more autonomous world emerges, the same experiments transfer.
The full argument — including what holds today versus what depends on future
governance — is in the blog:
[Why KamiBench for continual learning](blog/2026-08-14-why-kamibench-for-continual-learning.md).

## The program

The program runs **idea → experiments → posts**. Experiments are designed,
published, and git-timestamped in the registry before they run — each design
specifies its own instrument, from agent architecture to measurement. Results
and research arguments publish as [blog posts](blog/) at research cadence; a
formal publication is being prepared offline and will be completed in one
effort once enough experimental material has accumulated.

## Experiments

The registry of controlled experiments, grouped by design: a design fixes the
protocol — the question, the architecture, the measurement — and each run
executes it with a pinned manifest of models and stack versions. Designs are
published and git-timestamped before their first run; run pages record what
ran and what came out. Internally, runs keep the program's linear experiment
numbering.

- **[Knowledge delivery](experiments/knowledge-delivery.md)** — *running*:
  same world, same tools, same objective; only how the game's knowledge
  reaches the agent changes — a folder to read, a search tool, facts pushed
  inside tool results, a plan file. Five budget-boxed runs never leveled a
  kami; this design asks whether delivery, not the model, was the bottleneck.
  Wave 1 (control vs. pushed knowledge, Sonnet 5 and gpt-5.2) launched
  2026-08-17.
- **[Sustainability](experiments/sustainability.md)** — *pending*: the design
  family after it, and the program's thesis made measurable. A running balance
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
  [Run 4](experiments/004-perception-parity-rerun.md) completed on the
  perception-parity stack; [Run 5](experiments/005-verification-run.md) —
  the verification run, with the cost meter in shadow — is in progress.

## The blog

Research arguments and results publish as posts in [`blog/`](blog/), rendered
at [kamibench.ai/blog](https://kamibench.ai/blog). Posts comment; the
[registry](experiments/) registers — a post may cite an experiment card but
never replaces one. A formal publication is in preparation offline.

## What's in here

| Path | What it is |
|---|---|
| [`experiments/`](experiments/) | The experiment registry — one public, git-timestamped doc per design and per run; the registry pages carry the current state of every run. |
| [`blog/`](blog/) | Research posts — the arguments and results, at research cadence; rendered at [kamibench.ai/blog](https://kamibench.ai/blog). |
| [`research/literature.md`](research/literature.md) | Annotated bibliography grouped by theme (the related-work foundation), with a must-cite core set. |
| [`site/`](site/) | The project website — landing page + build-time renders of the blog and the experiment registry (updates on every push). Astro, deployed on Vercel; see [`site/README.md`](site/README.md). |
| [kamigotchi-gdd](https://github.com/tokedo/kamigotchi-gdd) | Technical Game Design Document — all mechanics and data catalogs extracted from source, the agent-readable spec of the world. |
| [kami-lens](https://github.com/tokedo/kami-lens) | Perception layer — a headless client keeping a live local mirror of world state, projected through the game's own rules: what an equipped human player sees, on your machine. |
| [kami-harness](https://github.com/tokedo/kami-harness) | Environment interface — MCP tools wrapping every on-chain action; version pinned per run. Current surface (v2.1.0): 101 tools with lens-backed world-state reads; the 84-tool v1.x surface ran Experiments 001–002. |
| [kami-agent](https://github.com/tokedo/kami-agent) | Reference scaffold — turns a stateless model API into a persistent actor; model-agnostic by construction. |

## What this is *not* (yet)

- **Not** claiming to be the first persistent or first multi-agent benchmark — Neural MMO,
  Vending-Bench Arena, and Project Sid predate us — nor the first agents to hold real
  capital (Freysa, 2024), nor the first study of agent resource acquisition (RepliBench,
  UK AI Security Institute, 2025). The novelty is the **ungoverned/autonomous-world
  substrate** and the **formalization of self-funded survival into a benchmark regime** —
  with surplus allocation after break-even as the open question.
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
The author holds the in-game assets used to operate the research agents. This is
independent open research, conducted in a personal capacity: the author is not
employed or compensated by Asphodel, which has no input on experiment design or
reporting, and the work is not affiliated with, funded by, or endorsed by any
company, including the author's employer.
<!-- DISCLOSURE:END -->

## License

[MIT](LICENSE). Research prose is shared for open collaboration; please cite if you build on it.
