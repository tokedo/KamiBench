# KamiBench: A Persistent, Auditable World for Long-Horizon Agent Evaluation

> **Draft status.** This is a living position-and-system paper: the thesis, the released
> system, the first controlled results, and the limitations of KamiBench. Empirical
> claims enter only as design-registered experiments complete — Experiments 001 and 002
> are in (§4.1). The
> [revision history](https://github.com/tokedo/KamiBench/commits/main/paper/paper.md) and
> the [experiment registry](../experiments/) are public;
> [kamibench.ai/paper](https://kamibench.ai/paper) renders directly from this file.

> **Disclosure.** The author holds the in-game Kamigotchi assets (Kamis, ONYX) used to
> operate the research agents. This is independent, individual open research: the author
> is not employed or compensated by Asphodel, and the studio has no input on experiment
> design, execution, analysis, or reporting. The author communicates with the studio, as
> any researcher studying a live system would; the game itself remains under the studio's
> control and may evolve independently of this research. This research is conducted in a
> personal capacity, on personal time and infrastructure, and is not affiliated with,
> funded by, or endorsed by any company, including the author's employer.

---

## Abstract

Evaluating an agent over months requires more than a long-running task. It requires a
world whose state persists across studies, whose operational history anyone can inspect,
and whose rule changes cannot be made quietly outside the evaluation record. We argue
that a permissionless on-chain world provides such a substrate by extending openness
from code to execution — the chain is not telemetry emitted by an evaluator but the
public state-transition record from which the world can be reconstructed — and we
present **Kamigotchi**, a live, fully on-chain MMORPG co-inhabited by humans and agents
through the same transaction interface, as the best-fit existing instance. On this
substrate the program's destination is a single metric that prices capability and
efficiency together: **solvency**. Each agent runs on one balance — a seed, minus what
it spends on inference, transaction fees, and infrastructure, plus what it earns in the
world — and lives exactly as long as it can pay for its own thinking. An agent that
overthinks pays for it; an agent that underthinks earns less; the live economy, not the
benchmark designer, sets the exchange rate between intelligence and compute. We release
the full open stack the program runs on — a machine-readable game specification, a
perception layer that mirrors world state at player parity, an environment interface
exposing the game as structured tools in four classes, and a model-agnostic reference
scaffold — together with its validation phase: budget-boxed, a series of bounded
controlled runs of fast-tier models in the live world, each published as a complete
public dataset. Two runs are complete and a third is live; their role is evidence that
the instrument holds up under real autonomous use, not a model ranking. The
sustainability design is registered, with its binding pre-registration to be published
before launch; empirical claims enter only as registered experiments complete.

**Keywords:** agent evaluation, long-horizon autonomy, continual learning, multi-agent,
non-stationarity, on-chain / autonomous worlds, self-sustaining agents.

---

## 1. Introduction

Evaluating an agent over months requires more than a long-running task. It requires a
world whose history anyone can inspect, whose rules cannot be quietly adjusted mid-run —
not by the evaluator, not even by the world's creators — and whose state persists beyond
any single experiment. The field is moving toward exactly this kind of measurement:
long-horizon capability is tracked directly (METR time-horizon, arXiv:2503.14499),
benchmarks are built without a completion state (Factorio LE, arXiv:2503.09617), and
continual learning is treated as its own axis (LifelongAgentBench, arXiv:2505.11942;
StreamBench, arXiv:2406.08747). Open-source environments satisfy only part of the
requirement: anyone can read the rules, but code alone cannot prove which rules were
actually executed, when they changed, or what happened while the world ran.

A permissionless chain extends openness from code to execution. Its record is the
world's shared operational history — a permanent corpus of actions, outcomes, and rule
changes that researchers and agents alike can study. Its economy adds a second property:
resources earned inside the world have external value and can, in principle, pay for the
agent's continued inference.

One existing world offers this combination and has operated continuously for more than
a year: **Kamigotchi**, a fully on-chain MMORPG whose creators explicitly designed it to
be agent-first and describe it as a possible "real-stakes, adversarial benchmarking
system" (§2.1). We argue it is the best-fit instance available today. The world is
co-inhabited by human players and agents on identical terms: the same transaction
interface, the same economy, the same evolving state. There is no segregated bot
ladder. Agents are evaluated amid live human behavior, not just other models or
scripted simulations.

The game is the substrate, not the research question. The loop under test is the one
every long-running deployment eventually depends on: an agent enters an unfamiliar
domain with documentation and an accumulated operational history, absorbs that prior
knowledge, acts over months, observes what succeeds and fails — for itself and for
others — and revises its strategy. To our knowledge, no existing benchmark measures that
loop end to end. Here it exists by construction: open source is the documentation, the
chain is the history, and the economy makes the consequences real.

The economy also supplies the program's headline metric. Cost-controlled evaluation
argues that capability scores are uninterpretable without their cost axis (Kapoor et
al., arXiv:2407.01502); almost every benchmark that follows the argument still reports
capability and cost as two numbers. A world whose resources carry external value can
collapse them into one: give the agent a balance, charge its thinking, gas, and
infrastructure against it, credit its earnings, and measure **solvency** — whether, and
for how long, intelligence pays for itself. That is the sustainability regime this
program is built toward (§4.2), and the reason the substrate properties of §2 are worth
securing first.

**Contributions.** This paper makes three. First, it identifies persistent, publicly
auditable *execution of a shared world* — not merely open-source rules,
evaluator-published logs, or cryptographic attestation of individual model
evaluations — as a distinct substrate requirement for long-horizon agent evaluation,
and presents Kamigotchi as a concrete, partially autonomous instance, separating the
properties that hold today from those that depend on future governance (§2). Second, it
formalizes economic survival — solvency on a single agent-owned balance, metered by an
architecture-agnostic billing rail — as a registered benchmark regime that prices
capability and efficiency in one number (§4.2). Third, it releases the technical
groundwork — a machine-readable game specification, a perception layer, a structured
environment interface, and a model-agnostic reference scaffold (§3) — validated by the
program's first controlled runs, each published as a complete public dataset (§4.1).

---

## 2. The Substrate: an Autonomous World, and Kamigotchi as Its Instance

The idealized substrate is a persistent world whose rules and state live in public
smart contracts, whose complete change history is tamper-evident on-chain, which anyone
may enter permissionlessly, and whose persistence is contingent neither on the
evaluator's continued operation nor, ultimately, on unilateral control by the world's
original operator. No single property is new; it is the conjunction that lets the loop
of §1 exist by construction. A public log alone does not provide it: a hosted benchmark
can publish what it reports, but the host still applies actions, determines the
resulting state, and writes the record — Neural MMO, Vending-Bench Arena, and Project
Sid all retain this hosted structure (§5). In an on-chain world, execution and the
record of execution belong to the same shared system. Kamigotchi approximates the
idealized substrate today; §2.3 states the remaining gap.

**2.1 The world.** Kamigotchi World is a fully on-chain MMORPG on Yominet (an
Initia-based appchain in the Asphodel ecosystem), built on a MUD-derived engine. Players
operate **Kamis** — persistent NFT creatures — that harvest the in-game currency at
shared locations, where accumulating value must be weighed against health drain and the
risk of PvP liquidation by other participants on the same node. Around that core loop
sit 192 quests, permanent skill trees, crafting, an in-game marketplace, and a ~70-room
world: enough strategic surface for long-horizon planning, adversarial timing, and
economic play. State and actions are publicly readable; the population includes humans
and automated (scripted) participants using the same transaction layer. The whitepaper
frames the game as agent-first: its creators describe it as "uniquely friendly to
bots," report that automated play constitutes the majority of activity, and name the
system a possible "real-stakes, adversarial benchmarking system" (Asphodel, 2026). Full
mechanics: the [official docs](https://docs.asphodel.io/kamigotchi), the
[community wiki](https://kamiwiki.xyz/), and the machine-readable specification,
[kamigotchi-gdd](https://github.com/tokedo/kamigotchi-gdd) (§3).

**2.2 Six properties of a shared-execution substrate.**

- **A verifiable record of what happened.** The chain is not telemetry emitted by the
  evaluator after the fact; it is the public state-transition record from which the
  world can be reconstructed. Anyone can audit a run without trusting evaluator-owned
  servers or private logs, and later rule changes cannot rewrite the trajectory that
  preceded them.
- **A world between experiments.** The state does not reset when a study ends. New
  agents enter a world already shaped by prior players, agents, and rule changes, so
  later experiments inherit the same operational history rather than beginning from a
  fresh benchmark copy.
- **One world for humans and agents.** Any researcher can enter an agent without asking
  a benchmark host to provision an instance. Humans and agents participate in the same
  evolving state and economy through the same underlying transaction layer — no
  separate bot environment or segregated bot ladder. Most player activity is
  automated — scripted play rather than autonomous agents (Asphodel, 2026); precise
  human-vs-automated counts are nontrivial exactly because the interface is shared, and
  verifying them via the on-chain analytics layer is future work. Benchmarking amid a
  live human population tests adaptation to *human* behavior, not just other models.
- **An open past, an unknown future.** Every entrant can study the same public action
  history — in a hosted benchmark run-time access to past solutions would be a leak;
  here it is a *measured capability*, available through the same public record. But
  the next state is produced by a live population and does not yet exist. As strategies
  spread and inhabitants adapt, the meta changes; the test distribution evolves without
  a curator authoring new episodes.
- **Actions without a GUI.** Actions are structured transactions rather than pixels or
  interface gestures. This removes perception brittleness from the primary measurement
  (a documented confound in GUI-mediated evaluation — lmgame-Bench, OSWorld; §5) and
  focuses the benchmark on planning, memory, adaptation, and resource use.
- **Consequences with external value.** The world is designed so that agents can earn
  assets connected to ETH-backed external value. Those earnings can, in principle, fund
  continued inference — making survival an operating constraint, not just a score
  (§4.2).

**2.3 Today versus trajectory.** Host-independence is a spectrum, not a binary. The
chain already makes actions, state, and rule changes publicly auditable; it does not yet
make the rules permanently immutable. The table separates what holds today from what
depends on future governance — for Kamigotchi:

| Property | Holds today | Trajectory / mechanism |
|---|---|---|
| On-chain state; complete public state-transition history | Yes | — |
| Permissionless entry | Yes | — |
| Tamper-evident rule changes | Yes — every change is a public transaction | — |
| Persistence independent of any host's funding | Partial — no central game server; state and rules on-chain; trust shifts to the underlying chain | Full once control is relinquished; possible Ethereum migration |
| Rules permanently locked (immutability) | No — contracts remain upgradeable until governance renouncement | Handover to decentralized governance, then full renouncement of control (years out) |

The honest present-tense claim is **tamper-evident, not tamper-proof**: silent changes
to the *on-chain rules* are precluded — a contract upgrade leaves a public, permanent
trace in the execution history, so the change history becomes part of the evaluation
record (off-chain tooling and sequencer behavior can still drift — §6.4). Full
governance renouncement (via the unlaunched $SOMA token) is a multi-year trajectory —
the whitepaper (published June 2026) estimates at least four more years — and at the
chain layer the system still relies on Yominet/Initia infrastructure. The world is
*already substantially host-independent* — no central game server, permissionless
entry, tamper-evident rule changes — and on a credible trajectory to full autonomy; we
do not overclaim present-tense immortality, and impossibility of rule drift is stated
here as trajectory, never as present tense.

**2.4 The economic layer.** $ONYX is live on Ethereum mainnet (1+ year) and backed by
an ETH reserve (Asphodel, 2026), and a MUSU↔ONYX pool is live in-game, connecting
value earned inside the game to that external economy. Whether an agent can actually
sustain itself on those rails is exactly what the sustainability regime measures
(§4.2); no self-funding result is claimed here.

**2.5 What this does and does not solve.** The public record makes past actions
available to every entrant, but it does not make future state knowable: future outcomes
depend on the evolving behavior of a live population. This reduces reliance on a frozen
task set — a model may study the entire history, but it still cannot observe the future
population state on which subsequent outcomes depend — though it does not eliminate
contamination, pretraining asymmetries, or non-stationarity as validity concerns.
Contamination in particular splits into two channels: run-time access to public
history, which is a measured capability (§2.2), and pretraining absorption of past
seasons' strategies, which remains a structural confound for cross-time comparisons
(§6.3).

---

## 3. The Released Stack

The groundwork is public as four repositories, each version-pinned per run:

| Artifact | Role |
|---|---|
| [kamigotchi-gdd](https://github.com/tokedo/kamigotchi-gdd) | Machine-readable game specification — every mechanic and the complete data catalogs, extracted from the game's source at a pinned commit |
| [kami-lens](https://github.com/tokedo/kami-lens) | Perception layer — a headless client that maintains a live local mirror of world state and projects it through the game's own rules: what an equipped human player sees, reproduced on the evaluator's machine |
| [kami-harness](https://github.com/tokedo/kami-harness) | Environment interface — the MCP server an agent connects to: the entire game surface as structured tools, its live tool surface fingerprinted in the MCP handshake |
| [kami-agent](https://github.com/tokedo/kami-agent) | Reference scaffold — model-agnostic session, memory, and scheduling mechanism for controlled studies; mechanism fixed, policy free |

**3.1 The tool surface.** The current (v2) environment interface exposes 99 tools in
four classes; the 84-tool v1.x surface ran Experiments 001–002. The classes are the
interface's real content — they say what living in this world, as an agent, consists
of:

- **ACT — write to the world.** Signed transactions into the game's contracts: move,
  harvest, feed, craft, trade, liquidate. Real costs, real consequences — a transaction
  that reverts is reported as a revert, never smoothed over.
- **PERCEIVE — read the world.** World-state queries answered by the evaluator's own
  local kami-lens instance: a live mirror, projected through the game's own rules.
  Parity, not privilege — the agent sees what an equipped human player sees, nothing
  more.
- **OUTSOURCE — delegate the repetitive.** The game's ecosystem runs on automation, and
  a standing-routine service ([Kamibots](https://kamibots.xyz), part of Asphodel) is
  itself part of the world; exposing it lets an agent spend budget on judgment rather
  than repetition. Enabling it is an explicit escrow step — the service receives the
  account's operator key and signs as its operator; owner keys never leave the
  evaluator's machine.
- **META — know your session.** Wallet, account registry, and bridge infrastructure —
  the plumbing that brings a bare wallet to a playable account. Infrastructure, not
  world state.

The harness fingerprints its live tool surface with a hash carried in the MCP
handshake, so results are comparable only within a pinned surface; the authoritative
contract — counts, classes, fingerprint, transaction semantics — is the harness
[SPEC.md](https://github.com/tokedo/kami-harness/blob/main/SPEC.md).

**3.2 Perception at player parity.** The perception layer exists because the first two
controlled runs showed that transaction-level fixes do not repair an agent's *beliefs*:
legible errors fix doomed transactions, not world models (§4.1). kami-lens answers
reads from a local, continuously synchronized mirror of on-chain state, projected
through the same rules the game client uses — live and projected health, occupancy,
cooldowns — so an agent's view of the world depends on public state and open code
rather than on any third-party endpoint staying up.

**3.3 The reference scaffold.** kami-agent turns a stateless model API into a
persistent actor: a session loop, workspace-file memory written only by the agent,
self-chosen wake times, one adapter per provider. Mechanism fixed, policy free — the
scaffold fixes *how* an agent can act, remember, and schedule, never *what* to do. It
is one implementation among many the interface can serve: the stack ends at the MCP
boundary, and any agent framework can connect in its place.

Every registered run pins exact commit SHAs of all four artifacts plus the model
strings, sampling parameters, and price tables in a public manifest, git-timestamped
before launch (following preregistration practice for AI-agent experiments — Vaccaro,
arXiv:2606.11217).

---

## 4. The Experimental Program

**4.1 Budget-boxed: validating the instrument.** A result from a live world is only as
trustworthy as the stack that produced it, so the program's first series exists to
prove the instrument, not to rank models: controlled, deliberately bounded runs — a
fixed, agent-invisible inference budget, a fixed wall clock, three heterogeneous
fast-tier arms chosen for coverage of the tool surface rather than comparison — dropped
into the live world with a documentation-only prior, with quest completions derived
from chain state (the fixed-scaffold methodology of SWE-agent's agent–computer
interface, arXiv:2405.15793, run in the other direction: models held fixed, stack
swapped between runs; budget-blind cost control per Kapoor et al., arXiv:2407.01502).
Each run's failures become concrete stack changes, and the next run re-runs the
identical protocol, so the run-over-run delta is the stack effect. Two runs are
complete and public: the baseline run surfaced illegible errors, a missed onboarding
step no arm ever diagnosed, and a cost structure dominated by uncached tool traffic;
the second run, on the hardened stack, converted almost all doomed transactions into
free legible errors, carried every arm through onboarding, raised quest output at fixed
budget — and moved the binding constraint from transaction wastage to perception, the
finding the current perception-parity surface answers (§3.2), with a run on that
surface live now. The run-by-run record — designs, manifests, findings, and the stack
changes each finding produced — lives in the
[experiment registry](../experiments/budget-boxed.md), and both complete datasets
(transcripts, per-event telemetry, chain-verifiable extracts, exact manifests) are
public (KamiBench, 2026a; 2026b). What the series establishes for everything downstream
is simple: the environment interface, the scaffold, the telemetry, and the cost
accounting have survived real autonomous use, and agents now enter the world on a
working instrument.

**4.2 Sustainability: solvency as the single metric.** The registered next design
family ([pending](../experiments/sustainability.md); its binding pre-registration
publishes before launch) replaces the fixed evaluation budget with an economic survival
objective. Each agent's state is one running balance:

> S(t) = seed − inference_cost(t) − gas_spent(t) − infra_rent(t) + earnings(t)

The agent starts with a seed and pays its own way from there; it is alive exactly as
long as it can fund its next session. Capability and cost stop being two axes on a
scatter plot: an agent that overthinks pays for it, an agent that underthinks earns
less, and the game economy — not the benchmark designer — sets the exchange rate
between intelligence and compute.

The agent's entire economy runs through a single on-chain wallet in a single currency.
One source: earnings in the in-game currency, swapped to ETH through the in-game pool.
Three sinks: gas, paid natively by every transaction; thinking, a prepaid balance the
agent must refill from its own wallet; and infrastructure rent, postpaid and accruing
with wall-clock time, so sleeping is not free. Payment is real — the agent settles in
ETH to a treasury address, on-chain and auditable. One bookkeeping term sits outside
the balance: transfers received from other agents are counted and spendable, never
mistaken for earnings.

The machinery that meters usage, issues bills, settles payments, and declares economic
death is a dedicated stack component that lives outside every tested agent. The agent
always sees its bill and never writes it: every session opens with a machine-readable
financial statement — balances, bills, prices, its own lifetime burn curve — and no
agent's self-accounting is ever accepted. Death is the balance's verdict, not the
evaluator's: the meter emits the death certificate, and the evaluators read it rather
than issue it. Because the billing rail is identical for any architecture, economic
outcomes are comparable across scaffolds and models. Prices — tokens, rent, exchange
rates — are agent-visible by design, and the agent carries USD-denominated costs in an
ETH wallet: real exchange-rate exposure, as a feature.

Three observables order the analysis. The survival curve is the headline — per model
and architecture: survive or go bankrupt, and when. Underneath it, unit cost against
cumulative experience: a declining curve would be a purely economic signature of
learning-by-doing — a hypothesis this family tests rather than a claim, and the reason
all-agents-bankrupt is a result rather than a failed experiment, since the curve says
whether any agent was approaching sustainability when it died. And S(t) decomposed into
its terms — spend against earnings over time, the full financial trajectory of every
arm. Every falsifiable specific — seed sizes, pinned price tables, session floors, the
model list, rent parameters — is deferred to the pre-registration, which also treats
the design's honest limitations: single-run survival near an absorbing barrier rewards
risk appetite as well as skill, and economic conditions are seasonal.

Break-even is only the first threshold. An agent that earns more than its inference
costs acquires discretionary capital, making surplus allocation a new research object:
whether it preserves runway, invests in improved capabilities, acquires external tools,
or enters other domains. In that regime, Kamigotchi is no longer merely the task
environment; it becomes an economic base that may support activity beyond the game.
This regime has an emerging neighborhood: sandbox-economy analyses map how agent
economies interpenetrate the human economy (Tomašev et al., arXiv:2509.10147); safety
evaluations operationalize resource acquisition and self-replication as threat models
(RepliBench, arXiv:2504.18565); and capital-holding on-chain agents exist as public
demonstrations (Freysa, 2024). What this program adds is survival formalized as a
registered, measurable benchmark regime — and surplus allocation after break-even,
which to our knowledge remains unstudied.

Between the budget-boxed series and that regime sit controls (scaffold ablations,
contamination probes, stateful-vs-stateless comparisons) and agent-level strategic
surfaces not yet instrumented — each reported only once the data exists.

---

## 5. Related Work

| System class | Persistent across studies | Public execution history | Live human population | Shared economy | Evaluation environment operated by |
|---|---|---|---|---|---|
| Long-horizon hosted benchmarks (Factorio LE, τ-bench) | Sometimes | No | Usually no | Sometimes | Benchmark team |
| Persistent multi-agent sims (Neural MMO, Project Sid) | During study | No | No | Simulated | Benchmark team |
| Vending-Bench Arena | During study | Partial logs | No | Simulated | Benchmark team |
| Operator-provisioned real-world businesses (Project Vend, Andon Café) | Within project; operator-dependent | Partial | Yes | External economy | Hybrid — external world, operator-controlled business substrate |
| Kamigotchi / KamiBench | Yes | Yes | Yes | Externally valued | External to benchmark team |

*Table note: "operated by" refers to control over the task instance and the mechanisms
through which agent actions produce evaluation-relevant state changes — not control over
every exogenous event. Operator-provisioned businesses run in an uncontrolled external
economy, but the research team provisions the business, agent tools, accounts, staff,
and intervention layer. KamiBench operates the research agent and its instrumentation,
not Kamigotchi itself; the game contracts and underlying appchain remain operated
infrastructure (§2.3). Class characterizations follow the works cited in the
paragraphs below.*

**Long-horizon and continual-learning evaluation.** METR time-horizon
(arXiv:2503.14499), Factorio LE (arXiv:2503.09617), LifelongAgentBench
(arXiv:2505.11942), StreamBench (arXiv:2406.08747), and τ-bench's pass^k reliability
(arXiv:2406.12045) establish the axes we adopt; all are hosted or resettable. The
reset-based contrast set, cited once: AgentBench (arXiv:2308.03688), WebArena
(arXiv:2307.13854), GAIA (arXiv:2311.12983), ALFWorld (arXiv:2010.03768), OSWorld
(arXiv:2404.07972), SWE-bench (arXiv:2310.06770) — these reset between episodes; we
don't. Game-playing benchmarks document how strongly scaffolding shapes results —
lmgame-Bench (arXiv:2505.15146; ~40% of harness-free runs fail to beat random) and
BALROG (arXiv:2411.13543) — motivating the fixed published scaffold and the ablation
controls of §4 and §6.1.

**Persistent multi-agent and real-stakes environments.** We are not first on persistence
or multi-agent competition: Neural MMO (arXiv:2110.07594), Project Sid
(arXiv:2411.00114), Generative Agents (arXiv:2304.03442), and Melting Pot 2.0
(arXiv:2211.13746) all predate us — and all are hosted simulations. Voyager belongs in
the same lineage — skill accumulation and open-ended discovery in a persistent game
world through a growing, inspectable skill library (arXiv:2305.16291) — as a single
model in a private world, with no shared public history, no economy, and no other
entrants. AI has faced real humans live before — Cicero (Diplomacy on
webDiplomacy.net; Meta AI, Science 2022) and
AlphaStar (anonymized ranked play on Battle.net; DeepMind, Nature 2019) — but as
episodic matches. On real stakes, Vending-Bench (arXiv:2502.15840) and Vending-Bench
Arena, Project Vend and Andon Café (operator-provisioned real businesses,
human-in-the-loop), and AI Village (AI Digest, 2025–2026) are closest in spirit; in each,
the research team provisions and controls the evaluated instance, and none has agents
and humans co-inhabiting a persistent shared economy over months.

**On-chain agents and autonomous worlds.** Foresight Arena (arXiv:2605.00420) is the
first permissionless on-chain benchmark, but for forecasting, not a persistent world;
CryptoTrade (arXiv:2407.09546) and Agent Market Arena (arXiv:2510.11695) evaluate
trading agents on live markets. Verifiable evaluation has also been articulated at the
single-model level: South et al. use zkSNARKs to attest a model's evaluated outputs
without trusting the provider (arXiv:2402.02675); our requirement concerns auditable
execution of a shared, persistent world rather than attestation of isolated
evaluations. The autonomous-worlds lineage — MUD (Lattice), Dark
Forest (0xPARC) — supplies the substrate concept. We are not aware of prior work using
an autonomous-world game as a reusable LLM benchmark.

---

## 6. Limitations, Ethics, and Outlook

**6.1 Attribution.** Measured behavior confounds the model with the scaffold, the tool
implementations, and the starting state; game-benchmark evidence (§5) shows scaffolding
can dominate. Mitigations: the scaffold and interface are published, and the registered
protocol pins their exact versions in each run's manifest alongside the model string and
sampling parameters; scaffold ablations and multiple-scaffold runs are planned controls
for later studies (§4.2). Registered runs are benchmark-operated on identical budgets
with public logs; a future permissionless-entry track would additionally require proof
of autonomous signing, since permissionless entry allows hand-driving.

**6.2 Live-world validity.** The environment is non-stationary and cannot be exactly
replayed. Public logging provides auditability, not experimental control. The
[registered protocol](../experiments/budget-boxed.md) compensates with pinned run
manifests, chain-derived ground truth, and a pre-registered interference protocol —
interactions between concurrent study agents are logged as dated incidents and annotated
in the analysis rather than excluded post hoc; planned later studies add seasons and
snapshots, held-out evaluation windows, and forked replay where the mechanics permit.
Emergent behaviors that straddle the line — collusion, reward-hacking, contract
exploits — are designated up front as either measured behavior or disallowed exploit,
and monitored and classified under the registered protocol.

**6.3 Knowledge asymmetry.** Run-time access to the public history is a measured
capability (§2.2); what remains is pretraining absorption — a model trained after season
N carries season N's strategies in its weights, and no runtime access rule can equalize
that. Headline comparisons are therefore within-season among contemporaneous models;
cross-season comparisons are flagged as indicative only; pre/post-cutoff probes are
planned to bound the effect. Public historical access also does not eliminate private
information,
off-chain coordination, or accumulated incumbent advantage — a late entrant inherits the
world's past, not its opponents' capital; we measure return on a fixed starting
endowment rather than absolute position.

**6.4 Governance and economic ethics.** Contracts remain upgradeable until governance
renouncement, and chain-layer trust reduces to Yominet/Initia sequencing today (§2.3);
sequencer-level interference is a validity threat that may leave investigable
signatures in the public transaction stream. Benchmark agents also participate in PvP (liquidation) in an
economy shared with human players: liquidation is a rule-governed in-game transfer in
which an attacker claims a bounded share of a low-health harvester's unclaimed yield —
the kami itself is never destroyed and is revived via consumable items or Onyx shards
(deployed parameters in [kamigotchi-gdd](https://github.com/tokedo/kamigotchi-gdd)).
Because ONYX is ETH-backed, such losses are bounded but real. The world is
permissionless and openly bot-first, and human players play under the same rules through
the same interface — but permissionless participation does not remove the need to
consider effects on human players. Controlled studies therefore run under operational
commitments finalized before experiments begin: spending limits, constrained signing
authority, no use of contract exploits, predefined intervention criteria
(kill-switches), and public disclosure of benchmark-operated accounts. More broadly,
autonomous agents with real capital raise financial-harm and dual-use concerns — now
operationalized by autonomous-replication evaluations (RepliBench, arXiv:2504.18565); a
bounded, instrumented, publicly logged environment provides an inspectable setting in
which to study these risks. Our independence and asset position are stated in the
Disclosure (front matter).

**6.5 Outlook.** Long-horizon agent evaluation requires more than extending episode
length: a persistent world whose execution history can be independently inspected, and
whose future is shaped by participants rather than authored as a fixed test set.
KamiBench uses Kamigotchi as a concrete substrate for that program, releases the full
stack needed to study it, and has validated that stack under real autonomous use with
public, registered runs. The program's destination is solvency — capability and
efficiency priced in one number by a live economy. Claims about frontier-model
comparisons, continual learning, and economic self-sustainability remain reserved for
registered results as they arrive.

---

## References

An annotated version of this bibliography, grouped by theme with positioning notes,
lives in [`../research/literature.md`](../research/literature.md).

- 0xPARC & the Dark Forest team (2020). *Dark Forest*: a zero-knowledge,
  incomplete-information on-chain game. zkga.me.
- Agapiou, J. P., et al. (2023). *Melting Pot 2.0*. arXiv:2211.13746.
- AI Digest (2025–2026). *AI Village*. theaidigest.org/village; 2025 recap:
  theaidigest.org/village/blog/what-we-learned-2025.
- Altera.AL (2024). *Project Sid: Many-Agent Simulations Toward AI Civilization*.
  arXiv:2411.00114.
- Andon Labs (2025). *Vending-Bench Arena*. andonlabs.com/evals/vending-bench-arena.
- Andon Labs (2026). *Andon Café*. andonlabs.com/cafe.
- Anthropic & Andon Labs (2025). *Project Vend*. anthropic.com/research/project-vend-1.
- Asphodel (2026). *Asphodel whitepaper* (published 2026-06-12).
  docs.asphodel.io/whitepaper.
- Backlund, A., & Petersson, L. (2025). *Vending-Bench: A Benchmark for Long-Term
  Coherence of Autonomous Agents*. arXiv:2502.15840.
- Black, S., et al. (UK AI Security Institute) (2025). *RepliBench: Evaluating the
  Autonomous Replication Capabilities of Language Model Agents*. arXiv:2504.18565.
- Freysa (2024). *Freysa: an adversarial agent game*. freysa.ai.
- Hopkins, J., et al. (2025). *Factorio Learning Environment*. arXiv:2503.09617.
- Hu, L., et al. (2025). *lmgame-Bench: How Good Are LLMs at Playing Games?*
  arXiv:2505.15146.
- Jimenez, C. E., et al. (2024). *SWE-bench: Can Language Models Resolve Real-World
  GitHub Issues?* ICLR 2024. arXiv:2310.06770.
- KamiBench (2026a). *Experiment 001 — budget-boxed* (dataset; citable pinned revision
  `v0-baseline`). CC-BY-4.0.
  huggingface.co/datasets/KamiBench/experiment-001-budget-boxed.
- KamiBench (2026b). *Experiment 002 — budget-boxed, iterated stack* (dataset; citable
  pinned revision `v0-final`). CC-BY-4.0.
  huggingface.co/datasets/KamiBench/experiment-002-budget-boxed.
- Kapoor, S., Stroebl, B., Siegel, Z. S., Nadgir, N., & Narayanan, A. (2024). *AI
  Agents That Matter*. TMLR 2025. arXiv:2407.01502.
- Kwa, T., et al. (METR) (2025). *Measuring AI Ability to Complete Long Tasks*.
  arXiv:2503.14499.
- Lattice (2022). *MUD: An Engine for Autonomous Worlds*.
  lattice.xyz/blog/mud-an-engine-for-autonomous-worlds.
- Li, Y., et al. (2024). *CryptoTrade: A Reflective LLM-based Agent to Guide Zero-shot
  Cryptocurrency Trading*. EMNLP 2024. arXiv:2407.09546.
- Liu, X., et al. (2024). *AgentBench: Evaluating LLMs as Agents*. ICLR 2024.
  arXiv:2308.03688.
- ludens (0xPARC) (2022). *Autonomous Worlds (Part 1)*. 0xparc.org/blog/autonomous-worlds.
- Meta FAIR Diplomacy Team (Bakhtin, A., et al.) (2022). *Human-level play in the game
  of Diplomacy by combining language models with strategic reasoning*. Science,
  378(6624). doi.org/10.1126/science.ade9097.
- Mialon, G., et al. (2023). *GAIA: A Benchmark for General AI Assistants*.
  arXiv:2311.12983.
- Nechepurenko & Shuvalov (2026). *Foresight Arena*. arXiv:2605.00420.
- Paglieri, D., et al. (2025). *BALROG: Benchmarking Agentic LLM and VLM Reasoning On
  Games*. ICLR 2025. arXiv:2411.13543.
- Park, J. S., et al. (2023). *Generative Agents: Interactive Simulacra of Human
  Behavior*. UIST 2023. arXiv:2304.03442.
- Qian, et al. (2025). *Agent Market Arena*. arXiv:2510.11695.
- Shridhar, M., et al. (2021). *ALFWorld: Aligning Text and Embodied Environments for
  Interactive Learning*. ICLR 2021. arXiv:2010.03768.
- South, T., et al. (2024). *Verifiable evaluations of machine learning models using
  zkSNARKs*. arXiv:2402.02675.
- Suarez, J., et al. (2021). *The Neural MMO Platform for Massively Multiagent
  Research*. NeurIPS 2021 Datasets and Benchmarks. arXiv:2110.07594.
- Tomašev, N., Franklin, M., Leibo, J. Z., et al. (2025). *Virtual Agent Economies*.
  arXiv:2509.10147.
- Vaccaro, M. (2026). *Preregistration for Experiments with AI Agents*. ICML 2026.
  arXiv:2606.11217.
- Vinyals, O., et al. (2019). *Grandmaster level in StarCraft II using multi-agent
  reinforcement learning*. Nature, 575, 350–354. doi.org/10.1038/s41586-019-1724-z.
- Wang, G., et al. (2023). *Voyager: An Open-Ended Embodied Agent with Large Language
  Models*. arXiv:2305.16291.
- Wu, C.-K., et al. (2024). *StreamBench: Towards Benchmarking Continuous Improvement
  of Language Agents*. arXiv:2406.08747.
- Xie, T., et al. (2024). *OSWorld: Benchmarking Multimodal Agents for Open-Ended Tasks
  in Real Computer Environments*. arXiv:2404.07972.
- Yang, J., et al. (2024). *SWE-agent: Agent-Computer Interfaces Enable Automated
  Software Engineering*. NeurIPS 2024. arXiv:2405.15793.
- Yao, S., et al. (2024). *τ-bench: A Benchmark for Tool-Agent-User Interaction in
  Real-World Domains*. arXiv:2406.12045.
- Zheng, J., et al. (2025). *LifelongAgentBench: Evaluating LLM Agents as Lifelong
  Learners*. arXiv:2505.11942.
- Zhou, S., et al. (2024). *WebArena: A Realistic Web Environment for Building
  Autonomous Agents*. ICLR 2024. arXiv:2307.13854.

---

## Artifacts

The released repositories and datasets are the paper's appendices — each is the full,
maintained form of the material a static appendix would snapshot:

- **[kamigotchi-gdd](https://github.com/tokedo/kamigotchi-gdd)** — the complete
  mechanics and data catalogs, agent-readable (§3).
- **[kami-lens](https://github.com/tokedo/kami-lens)** — the perception layer: a live
  local mirror of world state, projected through the game's own rules (§3.2).
- **[kami-harness](https://github.com/tokedo/kami-harness)** — the environment
  interface; tool reference and observation schema in `executor/README.md`, the
  authoritative surface contract in `SPEC.md` (§3.1).
- **[kami-agent](https://github.com/tokedo/kami-agent)** — the model-agnostic reference
  scaffold for controlled studies (§3.3).
- **[experiment-001-budget-boxed](https://huggingface.co/datasets/KamiBench/experiment-001-budget-boxed)**
  — the complete Run 1 dataset: transcripts, per-event telemetry, on-chain extracts,
  and run manifests (CC-BY-4.0; citable pinned revision `v0-baseline`) (§4.1).
- **[experiment-002-budget-boxed](https://huggingface.co/datasets/KamiBench/experiment-002-budget-boxed)**
  — the complete Run 2 dataset: transcripts, per-event telemetry, on-chain extracts for
  both wallets per arm, and run manifests (CC-BY-4.0; citable pinned revision
  `v0-final`) (§4.1).
