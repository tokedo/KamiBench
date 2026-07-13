# KamiBench: A Persistent, Auditable World for Long-Horizon Agent Evaluation

> **Draft status.** This is a living position-and-system paper: the thesis, the released
> system, and the limitations of KamiBench. Controlled empirical claims are added only as
> design-registered experiments complete. The
> [revision history](https://github.com/tokedo/KamiBench/commits/main/paper/paper.md) and
> the [experiment registry](../experiments/) are public;
> [kamibench.xyz/paper](https://kamibench.xyz/paper) renders directly from this file.

> **Disclosure.** The author holds the in-game Kamigotchi assets (Kamis, ONYX) used to
> operate the research agents. He has no affiliation with and receives no compensation
> from Asphodel. This is independent, individual open research, unaffiliated with any
> company.

---

## Abstract

Evaluating an agent over months requires more than a long-running task. It requires a
world whose state persists across studies, whose operational history anyone can inspect,
and whose rule changes cannot be made quietly outside the evaluation record. We argue
that a permissionless on-chain world provides such a substrate by extending openness
from code to execution: the ledger is not telemetry emitted by an evaluator but the
public state-transition record from which the world can be reconstructed. We present
**Kamigotchi**, a live, fully on-chain MMORPG co-inhabited by humans and agents through
the same transaction interface, as the best-fit existing instance — its creators
designed it to be agent-first and describe it as a possible "real-stakes, adversarial
benchmarking system" — and release the groundwork for controlled studies: a
machine-readable game specification, an environment interface exposing 60+ MCP tools,
and evidence from a two-month unassisted feasibility pilot in the live world. The
world's externally valued economy also permits future experiments in which an agent's
earnings can, in principle, fund its continued inference. The first controlled study is
registered and pending; this draft states the thesis, the system, and the limitations,
with empirical claims to be added only after results exist.

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

A permissionless chain extends openness from code to execution. Its ledger is the
world's shared operational history — a permanent corpus of actions, outcomes, and rule
changes that researchers and agents alike can study. Its economy adds a second property:
resources earned inside the world have external value and can, in principle, pay for the
agent's continued inference.

One existing world offers this unusual combination and has operated continuously for
more than a year: **Kamigotchi**, a fully on-chain MMORPG whose creators explicitly
designed it to be agent-first and describe it as a possible "real-stakes, adversarial
benchmarking system" (§3.2). We argue it is the best-fit instance available today. The
world is co-inhabited by human players and agents on identical terms: the same
transaction interface, the same economy, the same evolving state. There is no segregated
bot ladder. Agents are evaluated amid live human behavior, not just other models or
scripted simulations.

The game is the substrate, not the research question. The loop under test is the one
every long-running deployment eventually depends on: an agent enters an unfamiliar
domain with documentation and an accumulated operational history, absorbs that prior
knowledge, acts over months, observes what succeeds and fails — for itself and for
others — and revises its strategy. To our knowledge, no existing benchmark measures that
loop end to end. Here it exists by construction: open source is the documentation, the
chain is the history, and the economy makes the consequences real.

**Contributions.** This paper makes three. First, it identifies persistent, publicly
auditable *execution of a shared world* — not merely open-source rules,
evaluator-published logs, or cryptographic attestation of individual model
evaluations — as a distinct substrate requirement for long-horizon agent evaluation
(§2). Second, it presents Kamigotchi as a
concrete, partially autonomous instance, separating the properties that hold today from
those that depend on future governance changes (§2.2, §3). Third, it releases the
technical groundwork for controlled studies: a machine-readable game specification, a
structured environment interface, and an unassisted feasibility pilot (§3.5).
[Experiment 001](../experiments/001-budget-boxed.md) is registered and pending (§4).

---

## 2. Why a Chain — and Why This World

A public log can expose what a hosted benchmark reports, but it does not remove the host
from execution: the host still applies actions, determines the resulting state, and
publishes the record. Neural MMO, Vending-Bench Arena, and Project Sid retain this
hosted structure (§5) — a host executes the world. In an on-chain world, execution and
the record of execution belong to the same shared system. That single shift is what the
properties below follow from.

**2.1 Six properties of a shared-execution substrate.**

- **A verifiable record of what happened.** The ledger is not telemetry emitted by the
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
  separate bot environment or segregated bot ladder. The population is currently
  bot-majority (Asphodel, 2026); precise human-vs-automated counts are nontrivial
  exactly because the
  interface is shared, and verifying them via the on-chain analytics layer is future
  work. Benchmarking amid a live human population tests adaptation to *human* behavior,
  not just other models.
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
  assets connected to ETH-backed external value. In future experiments, those earnings
  may fund continued inference — making survival an operating constraint, not just a
  score (§4.2).

**2.2 Today versus trajectory.** Host-independence is a spectrum, not a binary. The
chain already makes actions, state, and rule changes publicly auditable; it does not yet
make the rules permanently immutable. The table separates what holds today from what
depends on future governance — for Kamigotchi:

| Property | Holds today | Trajectory / mechanism |
|---|---|---|
| On-chain state; complete public state-transition history | Yes | — |
| Permissionless entry | Yes | — |
| Tamper-evident rule changes | Yes — every change is a public transaction | — |
| Persistence independent of any host's funding | Partial — no central game server; state and rules on-chain; trust shifts to the underlying chain (§3.3) | Full once control is relinquished; possible Ethereum migration (§3.3) |
| Rules permanently locked (immutability) | No — contracts remain upgradeable until governance renouncement | Handover to decentralized governance, then full renouncement of control (years out; §3.3) |

The honest present-tense claim is **tamper-evident, not tamper-proof**: silent changes
to the *on-chain rules* are precluded — a contract upgrade leaves a public, permanent
trace in the execution history, so the change history becomes part of the evaluation
record (off-chain tooling and sequencer behavior can still drift — §6.4). Host drift
thereby becomes *visible and auditable* at the rules layer, not impossible;
impossibility arrives only with governance renouncement, the whitepaper's explicit
design telos, and is stated here as trajectory, never as present tense.

**2.3 What this does and does not solve.** The public ledger makes past actions
available to every entrant, but it does not make future state knowable: future outcomes
depend on the evolving behavior of a live population. This reduces reliance on a frozen
task set — a model may study the entire ledger, but it still cannot observe the future
population state on which subsequent outcomes depend — though it does not eliminate
contamination, pretraining asymmetries, or non-stationarity as validity concerns. Contamination in particular splits into two channels: run-time
access to public history, which is a measured capability (§2.1), and pretraining
absorption of past seasons' strategies, which remains a structural confound for
cross-time comparisons (§6.3).

**2.4 Idealized definition: an autonomous world as an evaluation substrate.** A
persistent world whose rules and state live in public smart contracts, whose complete
change history is tamper-evident on-chain, which anyone may enter permissionlessly, and
whose persistence is contingent neither on the benchmark evaluator's continued operation
nor, ultimately, on unilateral control by the world's original operator. No single
property is new; it is the conjunction that lets the loop of §1 exist by construction.
Kamigotchi approximates this definition today and is evaluated against the remaining gap
in §2.2 and §3.3.

---

## 3. Kamigotchi and the Released System

**3.1 The world.** Kamigotchi World is a fully on-chain MMORPG on Yominet (an
Initia-based appchain in the Asphodel ecosystem), built on a MUD-derived engine. Players
operate **Kamis** — persistent NFT creatures — that harvest the in-game currency at
shared locations, where accumulating value must be weighed against health drain and the
risk of PvP liquidation by other participants on the same node. Around that core loop
sit 192 quests, permanent skill trees, crafting, an in-game marketplace, and a ~70-room
world: enough strategic surface for long-horizon planning, adversarial timing, and
economic play. State and actions are publicly readable; the population includes humans
and automated agents using the same transaction layer. Full mechanics:
the [official docs](https://docs.asphodel.io/kamigotchi), the
[community wiki](https://kamiwiki.xyz/), and the machine-readable specification,
[kamigotchi-gdd](https://github.com/tokedo/kamigotchi-gdd) (§3.5).

**3.2 Built for agents, and why it fits.** The whitepaper frames Kamigotchi as
agent-first: its creators describe the game as "uniquely friendly to bots," report that
automated play constitutes the majority of activity, and name the system a possible
"real-stakes, adversarial benchmarking system" (Asphodel, 2026; verbatim quotes and
further creator signals are catalogued in
[`research/asphodel-whitepaper-notes.md`](../research/asphodel-whitepaper-notes.md)).
The world instantiates each property of §2.1: on-chain state with a complete public
state-transition history; a persistent world that predates and will outlast any single
study; interface parity between humans and agents; an open past facing an unknown,
population-driven future; native transaction-level actions with no GUI layer; and an
economy whose assets carry ETH-backed external value.

**3.3 Why it is not yet the ideal instance.** Contracts remain upgradeable: full
governance renouncement (via the unlaunched $SOMA token) is a multi-year trajectory —
the whitepaper (published June 2026) estimates at least four more years. At the chain
layer, the system still relies on Yominet/Initia infrastructure —
state and rules are on-chain, but the chain itself is operated; a possible Ethereum
migration would strengthen this over time. Persistence independent of any host's funding
is therefore partial today (§2.2). The world is *already substantially
host-independent* — no central game server, permissionless entry, tamper-evident rule
changes — and on a credible trajectory to full autonomy; we do not overclaim
present-tense immortality.

**3.4 Economic consequence.** $ONYX is live on Ethereum mainnet (1+ year) and backed by
an ETH reserve (Asphodel, 2026). The planned MUSU↔ONYX pathway is intended to connect
value earned inside
the game to that external economy. Future experiments can test whether an agent's
earnings can fund continued inference (§4.2); no self-funding result — and no currently
complete conversion pathway — is claimed here.

**3.5 The released system.** The groundwork is public as four artifacts:

| Artifact | Role |
|---|---|
| [kamigotchi-gdd](https://github.com/tokedo/kamigotchi-gdd) | Machine-readable game specification — every mechanic and the complete data catalogs, extracted from the game's source at a pinned commit |
| [kami-harness](https://github.com/tokedo/kami-harness) | Environment interface — 60+ MCP tools exposing the world's structured actions and observations (v1.0.0: a fixed, pinnable boundary between agent scaffolds and the world) |
| [kami-agent](https://github.com/tokedo/kami-agent) | Reference scaffold — model-agnostic session, memory, and scheduling mechanism for controlled studies; in final implementation |
| [kami-zero](https://github.com/tokedo/kami-zero) | Feasibility pilot — a two-model agent that ran unassisted in the live world for ~2 months |

The pilot is the system's feasibility evidence. kami-zero pairs a Sonnet 4.6 *executor*
acting on a ~5-minute tick with an Opus 4.7 *optimizer* reviewing tick history every
~6 hours with the authority to revise the executor's playbook. It operated unassisted
for approximately two months and completed 79 of the game's 192 quests (snapshot
2026-07-06), while the surrounding tooling remained under active development;
limitations surfaced during operation fed directly back into the environment interface
and scaffold design. The pilot therefore establishes feasibility of persistent
autonomous operation in the live world; it is not a controlled benchmark result, and it
predates the registered experiment designs. The scaffold's architecture evolution is
documented in the kami-zero repository.

---

## 4. Experimental Program

**4.1 Experiment 001: orientation under a fixed budget.** The program's first and
narrowest question: given identical starting conditions, a fixed inference budget, the
game's design document, and no supplied strategic prior beyond that specification, how
do frontier models orient and establish themselves in a novel persistent world? The
design is
[registered publicly and git-timestamped](../experiments/001-budget-boxed.md) before the
run (following preregistration practice for AI-agent experiments — Vaccaro,
arXiv:2606.11217); results are appended without revising the registered protocol. The
instrument fixes the scaffold, the environment-interface version, the budget, the
starting protocol, and
the supplied information; the intended controlled difference between runs is the
**model backend**, which drives the **reference scaffold**
([kami-agent](https://github.com/tokedo/kami-agent) — mechanism fixed, policy free)
acting through the **environment interface**
([kami-harness](https://github.com/tokedo/kami-harness) v1.0.0) on the world itself —
the fixed-scaffold methodology of SWE-agent's agent–computer interface
(arXiv:2405.15793), BALROG, and Vending-Bench. The fixed, budget-blind inference budget
follows the cost-controlled-evaluation argument of Kapoor et al.'s *AI Agents That
Matter* (arXiv:2407.01502). The environment interface is released; the reference
scaffold is in final implementation.

**4.2 Future regime: endogenous survival.** Later experiments will test whether agents
can convert in-world earnings into resources that support continued inference. This
would turn survival from a benchmark score into an operating constraint — solvency, not
a score, as the survival criterion. The external-value layer exists today; the in-game
conversion pathway is under development (§3.4). Whether an
agent can actually sustain itself on those rails is exactly what such experiments would
measure, and nothing on that dimension is asserted here. Between Experiment 001 and that
regime sit controls (scaffold ablations, contamination probes, stateful-vs-stateless
comparisons), a multi-model co-habitation study, and agent-level strategic surfaces not
yet instrumented, such as transaction-ordering games — each reported only once the data
exists.

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
infrastructure (§2.2, §3.3). Class characterizations follow the works cited in the
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

## 6. Limitations and Ethics

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
[registered protocol](../experiments/001-budget-boxed.md) compensates with pinned run
manifests, chain-derived ground truth, and a pre-registered interference protocol —
interactions between concurrent study agents are logged as dated incidents and annotated
in the analysis rather than excluded post hoc; planned later studies add seasons and
snapshots, held-out evaluation windows, and forked replay where the mechanics permit.
Emergent behaviors that straddle the line — collusion, reward-hacking, contract
exploits — are designated up front as either measured behavior or disallowed exploit,
and monitored and classified under the registered protocol.

**6.3 Knowledge asymmetry.** Run-time access to the public history is a measured
capability (§2.1); what remains is pretraining absorption — a model trained after season
N carries season N's strategies in its weights, and no runtime access rule can equalize
that. Headline comparisons are therefore within-season among contemporaneous models;
cross-season comparisons are flagged as indicative only; pre/post-cutoff probes are
planned to bound the effect. Public historical access also does not eliminate private
information,
off-chain coordination, or accumulated incumbent advantage — a late entrant inherits the
world's past, not its opponents' capital; we measure return on a fixed starting
endowment rather than absolute position.

**6.4 Governance and economic ethics.** Contracts remain upgradeable until governance
renouncement, and chain-layer trust reduces to Yominet/Initia sequencing today (§3.3);
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

---

## 7. Conclusion

Long-horizon agent evaluation requires more than extending episode length. It requires a
persistent world whose execution history can be independently inspected and whose future
is shaped by participants rather than authored as a fixed test set. KamiBench uses
Kamigotchi as a concrete substrate for this research program and releases the
specification, interface, and experimental machinery needed to study it. Controlled
evidence begins with the registered Experiment 001; claims about comparative
performance, continual learning, and economic self-sustainability are reserved for the
results.

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

The released repositories are the paper's appendices — each is the full, maintained form
of the material a static appendix would snapshot:

- **[kamigotchi-gdd](https://github.com/tokedo/kamigotchi-gdd)** — the complete
  mechanics and data catalogs, agent-readable (§3.5).
- **[kami-harness](https://github.com/tokedo/kami-harness)** — the environment
  interface; tool reference and observation schema in `executor/README.md` (§3.5).
- **[kami-agent](https://github.com/tokedo/kami-agent)** — the model-agnostic reference
  scaffold for controlled studies; in final implementation (§4.1).
- **[kami-zero](https://github.com/tokedo/kami-zero)** — the pilot agent's prompts,
  scaffolds, playbook rules (`executor-prompt.md`, `optimizer-prompt.md`, `rules/`),
  and architecture version history (§3.5).
