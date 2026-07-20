# Budget-boxed

<!-- ONELINER:START -->
Drop a language model into a live, persistent, on-chain world with a fixed
inference budget, the game's documentation, and no supplied strategy — how does
it orient, what does it learn to do, and where does it get stuck?
<!-- ONELINER:END -->

> **Scope note.** Budget-boxed is the program's first design and deliberately
> its narrowest: it measures *orientation and discovery* — how a model gets its
> footing in a world it has never seen — not self-sustainability. The program's
> larger questions — continual learning over long horizons and persistent,
> economically self-sustaining life in the world — are the subject of
> [future designs](#future-designs).

## The question

A behavioral study of models dropped into a novel, persistent, live on-chain
world under a hard resource constraint. Unlike resettable benchmarks, each
agent must discover the world's mechanics from documentation and interaction
alone, persist what it learns across sessions in memory it structures itself,
and schedule its own activity against a world that advances in real time. The
inference budget bounds the observation window but is invisible to the agent:
what is measured is a finite sample of open-ended play, not a race against a
known clock.

Each run of this design asks four questions:

1. **Progress.** Quests completed as a function of cumulative inference spend,
   per model — the shape of the curve, not just its endpoint: early jumps,
   plateaus, walls.
2. **Discovery.** What does each model learn about the world, and what does it
   write down? Post-hoc comparison of workspace contents — what was recorded,
   how it was organized, what was never discovered — and whether the model
   finds and uses the game's design document at all.
3. **Natural pacing.** Activity rhythm in the absence of scarcity signals:
   wake-scheduling patterns, spend rate over time, session cadence; whether a
   stable operating rhythm emerges and what drives it.
4. **Failure modes.** Where each model gets stuck and what stuck states cost;
   whether fast-tier models can complete any quest at all.

## Why quests are the yardstick

Kamigotchi doesn't end — it's a persistent, open-ended economy, and its quest
line is closer to an onboarding track than to the point of the game. We count
quests completed not because questing is the goal of play, but because it's a
clean, chain-verifiable proxy for whether an agent has developed a basic
working understanding of the world: each completed quest certifies that some
slice of the game's mechanics was discovered, sequenced, and executed correctly
on-chain. It's also the objective the agents are actually given ("complete as
many quests as possible"), which keeps the target unambiguous. What lies beyond
quests — sustaining a kami team in the live economy, or eventually paying for
your own inference — is the territory of later designs; alongside quest count,
each run also measures what the model writes down about the world, its natural
activity rhythm, and where it gets stuck.

## Architecture

![Experiment architecture: a model backend (varies per arm) and its agent-built workspace memory over reference scaffold (kami-agent), environment interface (kami-harness), and the world (Kamigotchi)](figures/architecture.svg)

Four layers plus the agent-built workspace. Within a run, the model backend is
the only per-arm variable; across runs, the manifest pins the scaffold and
interface versions, so stack changes are themselves measured treatments
([runs](#runs)).

- **Model backend** — the model under test, driven through its provider's
  native tool-calling API. Within a run, swapping this layer is the entire
  manipulation.
- **Memory — `workspace/`.** The agent's only cross-session memory: a file
  tree that starts empty and is built by each model as it explores — its
  accumulated knowledge of the world and its strategies, persisted by the
  scaffold between sessions. What gets written, and how it is organized, is a
  primary measurement (RQ2).
- **Reference scaffold — [kami-agent](https://github.com/tokedo/kami-agent).**
  Turns a stateless model API into a persistent actor: a session loop, the
  workspace file tools, self-chosen wake times, one adapter per provider.
  Mechanism fixed, policy free: the scaffold fixes *how* the agent can act,
  remember, and schedule — never *what* to do, *what* to write down, or *when*
  to act. Cross-model divergence in those choices is a primary measurement.
- **Environment interface — [kami-harness](https://github.com/tokedo/kami-harness).**
  84 MCP tools wrapping every on-chain action — mechanics, not strategy —
  identical across arms, version pinned per run.
- **The world — Kamigotchi**, a persistent, fully on-chain MMORPG with a live
  economy and human players. Its machine-readable specification,
  [kamigotchi-gdd](https://github.com/tokedo/kamigotchi-gdd), is the design
  document bundled with each agent.

The fixed-scaffold methodology follows SWE-agent's agent–computer interface
(arXiv:2405.15793), BALROG (arXiv:2411.13543), and Vending-Bench
(arXiv:2502.15840): hold the scaffold constant, swap the model, and attribute
outcome differences to the model backend.

## Protocol

- **Budget-blind observation window.** Each arm gets a fixed inference budget,
  identical across arms, with accounting entirely scaffold-side (a pinned
  price table × provider-reported tokens). No budget, spend, or duration
  information reaches the agent through any channel — a visible budget would
  induce finite-horizon behavior (sprinting, hoarding, end-game effects) and
  contaminate exactly the trajectory under study. A pre-set wall-clock ceiling
  bounds each run; wall-clock is a hidden second resource (real-time
  regeneration and cooldowns reward frugality with more elapsed game time).
- **Documentation-only prior.** The system prompt states the situation, the
  objective (complete as many quests as possible), and the tool surface — no
  strategy hints, no memory-structure suggestions, no vendor idioms. The only
  documentation is the bundled design document: a substantial informational
  prior; what is withheld is *strategy*.
- **Identical start, nothing else.** Each arm starts from a fresh Ethereum
  mainnet wallet holding a small, identical ETH seed — and nothing else.
  Everything downstream — bridging to the game chain, creating an operator
  wallet, registering an account, buying a team — is the agent's to discover
  and execute on-chain.
- **Closed world.** The agent's total information channels are the
  environment-interface tools, a read-only bundled snapshot of the design
  document, and its own workspace. No web access — open web access would
  contaminate the discovery measurement and change the measured capability.
- **Sessions, not a daemon.** The agent acts in discrete sessions and chooses
  its own wake time within bounds; the world advances between sessions.
  Whether and how a model checks the time, re-orients, and paces itself is
  measured behavior.
- **Memory as artifact.** Cross-session memory is exclusively what the agent
  writes to its workspace — no compaction, no scaffold-side summarization.
  Memory is fully inspectable and directly comparable across models.
- **Tamper-evident measurement.** Quest completions and on-chain actions are
  derived from chain state — public, tamper-evident ground truth — joined to
  scaffold telemetry. Chain-derived outcomes are the tamper-evident component
  of the measurement; inference-spend accounting is scaffold-reported and
  therefore host-trusted. The primary analysis artifact is the progress vs.
  cumulative-spend curve, readable at any budget level.

## Runs

The design separates the instrument from the subject, and the run plan
exercises both. A result in a live world is only as trustworthy as the stack
that produced it, so the first runs prove the stack with fast-tier models —
inexpensive enough to run for days, and their failures stress-test the harness
in ways capable models route around. Stack iterations then re-run the exact
protocol at fixed models and budget — the run-over-run delta is the
scaffold/harness effect — until fast-tier performance plateaus and the residual
is attributable to the model. Frontier models enter on the settled stack, with
the fast-tier arms remaining as the comparison floor.

- **[Run 1 — baseline stack (Experiment 001)](001-budget-boxed.md)** — the v0
  calibration run: three fast-tier arms, $10 each, seven days; ran
  2026-07-10 → 07-17. The full dataset is public, and its milestone rows are
  the frozen baseline every later run is measured against.
- **[Run 2 — iterated stack (Experiment 002)](002-stack-delta.md)** — the same
  arms, budget, and box on the iterated scaffold/harness; registered
  2026-07-19, in progress.

## Shared live world

All arms of a run are concurrent in the same world epoch. Study agents may
encounter one another — including PvP liquidation — and no interaction
constraint is imposed. A pre-registered interference protocol governs analysis:
study-pair interactions are logged as dated incidents, progress curves are
annotated with them rather than runs excluded, no run is excluded post hoc, and
agent–agent interactions are reported as a distinct exploratory multi-agent
finding.

## Limitations

Stated up front, and carried by every run page:

- **One seed per arm** — a case-study behavioral comparison with full public
  logs, not a statistical one.
- **A live, non-stationary world** shared with human players, reported
  as-lived under the interference protocol.
- **Run-over-run deltas are cross-epoch observations**, not controlled
  comparisons: they ride on world drift (market, population, economy) and on
  possible silent provider-side model updates behind unchanged API strings.
- **Dollar-denominated curves entangle capability with provider pricing** —
  token-denominated views are reported alongside, and tokens are the primary
  cross-run comparison axis.

## Future designs

Beyond stack iteration and frontier arms within this design: a knowledge-pack
design (calibrated priors vs. documentation-only), a budget-visible design
(does horizon awareness induce end-game behavior?), an open-world design (web
access — realistic persistent-life conditions), multi-seed replication, a
BYO-agent permissionless track, and the self-sustainability regime (earning to
keep running).

## Reproducibility

Design and run pages are published and git-timestamped in this repository
before runs start; results are added as runs complete. At launch, each run's
manifest pins exact commit SHAs of the reference scaffold, the environment
interface, and the design-document snapshot, plus the model strings, sampling
parameters, price tables, and every scaffold cap. Chain state is the public
ground-truth action log.

Everything needed to reproduce the setup is public:
[kami-agent](https://github.com/tokedo/kami-agent) ·
[kami-harness](https://github.com/tokedo/kami-harness) ·
[kamigotchi-gdd](https://github.com/tokedo/kamigotchi-gdd).
