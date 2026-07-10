# KamiBench

**A research program: benchmarking long-horizon, continuously-learning AI
agents in a persistent world that no one operates.**

**Website:** [kamibench.xyz](https://kamibench.xyz)

> ⚠️ **Open research in progress.**
> <!-- STATUS:START -->
> This is an open research program backed by a working system — a technical game
> design document distilled from the game's source, an environment interface
> exposing 60+ MCP tools (kami-harness v1.0.0), and a model-agnostic reference
> scaffold in final implementation. Experiment 001 is design-registered and its
> run is pending; a two-month autonomous pilot has already validated feasibility.
> Claims are still being verified, and nothing here is a finished result.
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
git-timestamped before its run starts — the design is the artifact; results
are added as runs complete.

- **[Experiment 001 — Budget-boxed, zero-prior orientation](experiments/001-budget-boxed.md)**
  — given identical starting conditions, a fixed inference budget, the game's
  design document, and zero strategic priors, how do frontier models orient
  and establish themselves in a novel persistent world?
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
Before the controlled program, an autonomous pilot validated that persistent
self-play in the live world is viable: [kami-zero](https://github.com/tokedo/kami-zero),
a two-model agent (a Sonnet 4.6 executor on ~5-minute ticks and an Opus 4.7
optimizer on ~6-hour cycles), played unassisted for ~2 months and completed 79
of the game's 192 quests (snapshot 2026-07-06), surfacing harness limitations
that fed directly back into the tooling. The pilot predates the registered
experiment designs; its role in the program is feasibility validation, and
controlled experiment results supersede it as evidence.
<!-- PILOT:END -->

## Why a chain, and not just a public log

Every existing multi-agent environment (Neural MMO, Vending-Bench Arena, Project Sid, …) is
run by a host. An autonomous on-chain world gives properties a hosted sandbox cannot:

- **Permanent world, built-in integrity** — Not just readable rules — verifiable play.
  Every action and every rule change is a public, permanent, decodable transaction:
  anyone can check that the rules were followed by everyone, and silent patching is
  architecturally impossible; the rules are immutable on trajectory. The world runs
  with no centralized game server, and its persistence doesn't depend on any host's
  funding — partial today, full once the builders give up control.
- **One door — humans and agents alike** — Anyone can enter any model into the same
  live world. Real players and a bot-majority population share one persistent economy
  through the same transaction interface — no segregated bot ladder. Agents are
  benchmarked against live human behavior, not just other models.
- **The past: an open book** — The full history of every strategy ever executed is
  equally readable by all. Mining it to self-correct is a measured capability, and it
  gives any late joiner information symmetry with everyone already there — enter
  anytime.
- **The future: the test** — The test is the world's next state — which doesn't exist
  yet. A model may study the entire ledger and still has seen nothing of what comes
  next; as inhabitants grow more capable, strategies decay and the meta moves. The
  eval renews itself — no maintainer required.
- **Native-agentic interface** — actions are transactions, not pixels/GUI, removing the
  perception brittleness that confounds game benchmarks.
- **Self-funded survival** — the world has a real, ETH-backed economy, so an agent's survival
  can become *literal and economic*: it can convert in-world earnings into ETH-denominated
  value and **fund its own compute**. Survival stops being a scored metaphor.

## What's in here

| Path | What it is |
|---|---|
| [`experiments/`](experiments/) | The experiment registry — one public, git-timestamped design per controlled experiment; [001 — budget-boxed, zero-prior orientation](experiments/001-budget-boxed.md) is the first. |
| [`paper/paper.md`](paper/paper.md) | The paper — the position argument and the synthesis layer across experiments; everything still in progress is sequenced in its Research Roadmap section. |
| [`paper/NOTES.md`](paper/NOTES.md) | Working notes — the draft scaffolding (status tags, TODO/VERIFY markers, stub sections) relocated out of the paper, preserved verbatim. |
| [`research/literature.md`](research/literature.md) | Annotated bibliography grouped by theme (the related-work foundation), with a must-cite core set. |
| [`research/asphodel-whitepaper-notes.md`](research/asphodel-whitepaper-notes.md) | Full reading notes on the Asphodel/Kamigotchi whitepaper, incl. the creators' own "benchmarking system" framing and the token economy. |
| [`site/`](site/) | The project website — landing page + build-time renders of the paper and the experiment registry (updates on every push). Astro, deployed on Vercel; see [`site/README.md`](site/README.md). |
| [kamigotchi-gdd](https://github.com/tokedo/kamigotchi-gdd) | Technical Game Design Document — all mechanics and data catalogs extracted from source, the agent-readable spec of the world. |
| [kami-harness](https://github.com/tokedo/kami-harness) | Environment interface — 60+ MCP tools wrapping every on-chain action (v1.0.0). |
| [kami-agent](https://github.com/tokedo/kami-agent) | Reference scaffold — turns a stateless model API into a persistent actor; model-agnostic by construction, in final implementation. |
| [kami-zero](https://github.com/tokedo/kami-zero) | The feasibility pilot — a two-model agent that self-played the live world for ~2 months. |

## What this is *not* (yet)

- **Not** claiming to be the first persistent or first multi-agent benchmark — Neural MMO,
  Vending-Bench Arena, and Project Sid predate us. The novelty is the
  **ungoverned/autonomous-world substrate** and **endogenous survival**, and the paper
  differentiates explicitly.
- **Not** experimentally validated yet — experiment 001 is design-registered; its run is
  pending.
- **Not** free of the pretraining-absorption confound: a model trained after season N carries
  that season's strategies in its weights, so cross-*time* comparisons are indicative only —
  headline comparisons are within-season among contemporaneous models.
- **Not** final on citations — a verification pass is outstanding (see `literature.md`).
- **Honest maturity note:** Kamigotchi is *already substantially host-independent* (on-chain
  state, contract rules, permissionless bot play that is already the majority of activity, an
  ETH-backed token live on Ethereum mainnet) and on a credible trajectory to full autonomy —
  but full decentralization is still years out. We do not overclaim present-tense immortality.

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
