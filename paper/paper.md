# KamiBench: An Autonomous On-Chain World as a Benchmark for Long-Horizon, Self-Sustaining Agents

> **Draft status.** Working paper draft — the pilot phase is complete (three released
> repos and a two-month autonomous pilot, §5); the model-agnostic harness and the
> multi-model study are in progress. Sections are tagged `[DRAFTED]`, `[SKELETON]`,
> `[TODO]`, or `[PENDING EXPERIMENTS]`; inline markers say what each part still needs.
> Citations await one final verification pass (see
> [`../research/literature.md`](../research/literature.md)); supporting notes:
> [`../research/asphodel-whitepaper-notes.md`](../research/asphodel-whitepaper-notes.md).
> Shape note: this is deliberately a position-paper draft; for a D&B-style submission the
> artifact leads and the headline metric (§6) must be fixed first.

> **Disclosure.** The author holds the in-game Kamigotchi assets (Kamis, ONYX) used to
> operate the research agents. He has no affiliation with and receives no compensation
> from Asphodel. This is independent, individual open research, unaffiliated with any
> company.

---

## Abstract  `[DRAFTED]`

Agent evaluation is shifting from isolated, resettable tasks toward sustained operation
in persistent, non-stationary environments — yet even the most advanced long-horizon
benchmarks remain *hosted*: a single party runs the world, sets and changes its rules,
gates access, and keeps it alive only while funded. This coincides with a
benchmark-integrity crisis (saturation, contamination, reward-hacking) in which whoever
runs an environment can, even inadvertently, compromise the evaluation. We argue that
the right substrate for evaluating long-horizon, continuously-learning agents is an
**autonomous, persistent on-chain world** — state and rules on-chain, every rule change
public and permanent, governance renouncement the stated endpoint — and we present
**Kamigotchi**, a fully on-chain MMORPG whose creators designed it to be agent-first and
describe it as a possible "real-stakes, adversarial benchmarking system," as the
best-fit instance available today. The substrate provides properties no hosted sandbox
can: tamper-evident rule changes by construction, credible multi-year permanence,
permissionless participation, co-habitation with real human players on identical terms,
and — uniquely — a real, externally-valued economy in which an agent's *survival can
become economically endogenous*: it can convert in-world earnings into ETH-denominated
value and fund its own compute. We formalize the autonomous-world substrate and release
the groundwork as three public artifacts: a machine-readable game design document, a
60+-tool agent harness, and kami-zero — a two-model agent that self-played the live
world for two months, completing 79 of the game's 192 quests (snapshot 2026-07-06); a
research roadmap (§6) sequences the remaining work toward the initial multi-model study.

**Keywords:** agent evaluation, long-horizon autonomy, continual learning, multi-agent,
non-stationarity, on-chain / autonomous worlds, self-sustaining agents.

---

## 1. Introduction  `[DRAFTED]`

**1.1 The shift to long-horizon, continuously-learning evaluation.** Most agent
benchmarks score a single episode and reset. The capability that matters for deployed
agents — sustained operation, adaptation, and continuous learning in a world that never
resets — is largely unmeasured. The field is moving this way: long-horizon capability is
now tracked directly (METR time-horizon, doubling ~every 7 months), benchmarks are being
built without a completion state (Factorio LE), and "does it keep learning?" is its own
axis (LifelongAgentBench, StreamBench).

**1.2 The benchmark-integrity crisis.** As agents gain web access, static benchmarks are
saturated, contaminated (search-time contamination), and reward-hacked. A deeper,
under-examined problem: the party that *runs* an environment can change rules, patch
away discovered strategies, gate access, or stop running it. And no benchmark can
measure a horizon longer than its own lifespan — a hosted world lives exactly as long
as its host's funding and interest. Evaluation integrity is bounded by host trust.

**1.3 The idea: an ungoverned, autonomous world.** We propose evaluating agents in a
world **built to need no host** — an on-chain "autonomous world" whose rules live in
public smart contracts, whose entire history is decodable and tamper-evident, that
anyone may enter permissionlessly, and that is designed from inception to persist
independent of any host's funding or interest. Host-independence is a spectrum, not a
binary (§3.1): we state precisely which properties hold *today* and which arrive on the
world's stated trajectory of **governance renouncement** — the creators permanently
relinquishing the ability to change the rules. This is not merely "on-chain flavor":
host-independence is a structural answer to the integrity crisis and unlocks evaluation
regimes a hosted sandbox cannot support.

**1.4 Why Kamigotchi, and why now.** Kamigotchi (a fully on-chain MMORPG on the Yominet
appchain, part of the Asphodel ecosystem) is uniquely fit and, notably, **built for
this**. Its creators set out to be "uniquely friendly to bots," report that "the majority
of activity in the game is automated," plan 2026 events "to encourage LLM-driven
Kamigotchi play," and explicitly describe the system as a potential "real-stakes,
adversarial benchmarking system." We formalize the benchmark the environment was designed
to be.

**1.5 Contributions.**
1. **The autonomous-world substrate** formalization — on-chain, host-independent,
   permissionlessly-persistent, real-economy — motivated as a structural response to the
   benchmark-integrity crisis. (§3)
2. **Kamigotchi as a concrete, creator-endorsed instance**, with a precise
   today-vs-trajectory accounting of its substrate properties. (§4)
3. **Three released artifacts and a two-month autonomous pilot** in the live world: a
   machine-readable game design document, a 60+-tool agent harness, and the kami-zero
   pilot (79 of 192 quests; snapshot 2026-07-06). (§5)

The remaining components — the model-agnostic harness, the endogenous-solvency headline
metric, the experimental protocol, and the initial multi-model study — are sequenced in
the Research Roadmap (§6).

---

## 2. Background and Related Work  `[DRAFTED]`

**2.1 Long-horizon & continual-learning evaluation.** METR time-horizon
(arXiv:2503.14499); Factorio LE (arXiv:2503.09617); LifelongAgentBench (arXiv:2505.11942);
StreamBench (arXiv:2406.08747); τ-bench pass^k reliability (arXiv:2406.12045). *These
establish the axes we adopt; all are hosted/resettable.* The reset-based contrast set,
cited once: AgentBench (arXiv:2308.03688), WebArena (arXiv:2307.13854), GAIA
(arXiv:2311.12983), ALFWorld (arXiv:2010.03768), OSWorld (arXiv:2404.07972), SWE-bench
(arXiv:2310.06770) — *these reset between episodes; we don't.*

**2.2 Multi-agent & open-ended environments.** Neural MMO (arXiv:2110.07594, persistent
massively-multiagent — but simulated, hosted); Project Sid (arXiv:2411.00114, 1000+ LLM
agents co-living in Minecraft — hosted, a study); Generative Agents (arXiv:2304.03442);
Melting Pot 2.0 (arXiv:2211.13746, cross-play evaluation). *We are not first on
persistence or multi-agent competition — we say so — and differentiate on governance.*
AI has faced real humans live before — **Cicero** (human-level Diplomacy against humans
on webDiplomacy.net; Meta AI, Science 2022) and **AlphaStar** (anonymized ranked play on
the Battle.net ladder; DeepMind, Nature 2019) — but as *episodic matches*; no prior
benchmark has agents and humans co-inhabiting a persistent shared economy over months.

**2.3 Real-stakes & business agents.** Vending-Bench (arXiv:2502.15840) and Vending-Bench
Arena (heterogeneous frontier models competing — already showing cartels/deception);
Project Vend and Andon Café (real businesses; real stakes but run by a single party, costly,
human-in-the-loop); Agent Village (AI Digest, 2025 — heterogeneous frontier agents
co-living for weeks–months with computer use and real-money charity goals, publicly
observable; cooperative not adversarial, hosted, no shared persistent economy).
*Closest in spirit to real-stakes multi-agent evaluation; all hosted.*

**2.4 Game-playing agent benchmarks & the harness/contamination problem.** lmgame-Bench
(arXiv:2505.15146; ~40% of harness-free runs fail to beat random), BALROG
(arXiv:2411.13543). *Motivate our harness ablations and contamination handling.*

**2.5 On-chain agents & autonomous worlds.** Foresight Arena (arXiv:2605.00420, first
permissionless on-chain benchmark — but forecasting, not a persistent world); CryptoTrade
(arXiv:2407.09546); Agent Market Arena (arXiv:2510.11695). Autonomous Worlds lineage: MUD
(Lattice), Dark Forest (0xPARC). *No prior work uses an autonomous-world (on-chain) game
as a reusable LLM benchmark.*

> **[TODO:** one final citation-verification pass outstanding (tracked in
> [`../research/literature.md`](../research/literature.md)).**]**

---

## 3. The Autonomous-World Substrate  `[DRAFTED]`

**3.1 Governed vs. ungoverned: host-independence as a spectrum.** Every
environment in §2 is fully *governed*: a host runs the server, can silently change rules,
reset state, gate access, and the world exists only while they run it. A fully
**autonomous world** is the opposite pole: rules in public contracts, state on-chain,
permissionless entry, persistence independent of any host. Real instances sit between
the poles and move along them, so we split every substrate property into what **holds
today** and what arrives on a stated **trajectory** — for Kamigotchi:

| Property | Holds today | Trajectory / mechanism |
|---|---|---|
| On-chain state; complete readable history | Yes | — |
| Permissionless entry | Yes | — |
| Tamper-evident rule changes | Yes — every change is a public transaction | — |
| Persistence independent of any host's funding | Partial — no central game server; state and rules on-chain; trust shifts to the underlying chain (§4.5) | Full once control is relinquished; possible Ethereum migration (§4.5) |
| Rules permanently locked (immutability) | No — contracts remain upgradeable until governance renouncement | Handover to decentralized governance, then full renouncement of control (years out; §4.4) |

The honest present-tense claim is **tamper-evident, not tamper-proof**: silent patching
is architecturally impossible because a rule change is itself a public, permanent,
decodable transaction — the change history becomes part of the evaluation record. Rule
*immutability* arrives with governance renouncement, the whitepaper's explicit design
telos (an "immortal" world), and is stated here as trajectory, never as present tense.
Even before renouncement completes, the world differs in kind from hosted worlds: it was
*designed from inception* to run forever with no centralized game server — state and
mechanics are embedded on-chain.

**3.2 Five researcher-facing properties of an ungoverned substrate.**
- **Substrate integrity: tamper-evident today, immutable on trajectory.** The evaluator
  does not run the world — the evaluator is the chain state itself — and rules are
  identical for all. Every rule change is a public, permanent, decodable transaction:
  silent patches are impossible, and pre-renouncement upgrades are visible and auditable,
  becoming part of the evaluation record rather than corrupting it.
- **Credible permanence / longitudinal evaluation.** Hosted benchmarks are ephemeral;
  a world whose state and mechanics are embedded on-chain — built to run with no
  centralized game server — enables open-ended, multi-year study of the same agents in
  the same world. Persistence independent of any host's funding is partial today and
  full on trajectory (§3.1, §4.5).
- **Permissionless, decentralized participation.** No lab owns the benchmark; anyone can
  enter any model into the same live world.
- **Mixed human–agent population with interface parity.** The world is co-inhabited by
  real human players and agents *on exactly the same terms*: the native action interface
  — transactions — is literally identical for humans and machines, with no segregated
  bot ladder or flagged-bot regime; bots are the majority population and explicitly
  welcomed by the creators (§4.2). An active human player population manages kamis,
  forms clans, and trades in the same economy, at the same time, through the same
  interface agents use; precise human-vs-automated population counts are nontrivial
  exactly because the interface is shared, and verifying them through the on-chain
  analytics layer is future work. Benchmarking against a live human population tests
  adaptation to *human* behavior, not just other models.
- **Contamination, split into a feature and a residual confound.** Run-time access to
  the public chain history is not a leak but a *measured capability*: every agent can
  mine the full record of every strategy ever executed, on equal terms (§3.4). What
  remains is pretraining absorption — a model trained after season N carries season N's
  strategies in its weights, a structural confound for cross-*time* comparisons (§7,
  threat 2). Forward-moving world state still blunts *state* memorization: future world
  state depends on live actors and cannot be searched or memorized.

**3.3 Why this answers the integrity crisis (§1.2).** Each integrity failure of §1.2 —
saturation, contamination, reward-hacking, host drift — is mitigated or reframed by
host-independence plus a forward-moving live world. Precision on host drift: it becomes
*visible and auditable* — every rule change is a public transaction that joins the
evaluation record — not impossible; impossibility arrives only with renouncement.

**3.4 The open-book world: learning from the population as a measured capability.**
Every transaction ever executed — the complete record of every strategy every player
and agent has ever run — is public, decodable history that all participants can read on
equal terms. In a hosted benchmark this would be a leak; here it is the point. Mining
the population's history for winning strategies, benchmarking one's own results against
the population, and self-correcting is a critical real-world skill and a directly
measurable capability. The same property enables **anytime entry**: agents need
not start simultaneously, because a late joiner has *information symmetry* with
incumbents — though not *position symmetry*: incumbents hold accumulated capital, and
we say so explicitly. Field note: current agents are years away from spontaneously
deciding to mine chain history to self-correct — the measurable headroom on this
dimension is enormous.

**Definition (autonomous world, as an evaluation substrate).** A persistent world whose
rules and state live in public smart contracts, whose complete change history is
tamper-evident on-chain, which anyone may enter permissionlessly, and whose persistence
is not contingent on any host's funding or interest. To pre-empt an obvious objection —
"isn't this just permissionless + on-chain?" — no single property is new: it is the
*conjunction* of all four, and the real-economy consequence it enables (endogenous
survival, §6), that is new.

---

## 4. Kamigotchi as an Instance  `[DRAFTED]`

**4.1 The world.** Kamigotchi World is a fully on-chain MMORPG on Yominet (an
Initia-based appchain in the Asphodel ecosystem), built on a MUD-derived engine: a
~70-room world containing 64 harvest nodes. Players operate **Kamis** — NFT creatures
with Health, Power, Violence, and Harmony stats and trait-based archetypes. The core
loop: a kami harvests **MUSU**, the base in-game currency, at a node; accumulated MUSU
must be collected, and harvesting drains health — a kami left harvesting too long is
exposed to **liquidation**, PvP in which a kami on the same node can kill a low-health
harvester and take a share of its unclaimed bounty (the remainder returns to the victim
as salvage). Resting heals; dead kamis are revived via items or Onyx shards. Around this
loop sit 192 quests, progression trees of 71 skills with permanent bonuses, crafting
(41 recipes), an in-game marketplace, gacha minting of new kamis, and stamina-gated
movement. The strategic surface is long-horizon, adversarial, and economically grounded:
the standing risk/reward decision of how long to harvest before collecting versus
liquidation exposure; node and affinity selection; build and archetype planning across
skill trees; timing PvP against live opponents; and economic play across the
marketplace. Full detail: the [official docs](https://docs.asphodel.io/kamigotchi), the
[community wiki](https://kamiwiki.xyz/), and the machine-readable spec,
[kamigotchi-gdd](https://github.com/tokedo/kamigotchi-gdd) (§5.1).

**4.2 Built for agents (creator intent).** The whitepaper frames the game as
bot/agent-first: "uniquely friendly to bots," "the majority of activity in the game is
automated,"
acquired the Kamibots automation team, plans 2026 LLM-play events, and names it a possible
"real-stakes, adversarial benchmarking system"; "humans are no longer the only target
market." We formalize that intent.

**4.3 The property stack.** Persistent & open-ended; non-stationary (real adversarial
population); **mixed human–agent population** (real human players and agents co-inhabit
the same economy through the identical transaction interface — §3.2); **natively
agentic** (actions are transactions — no UI/pixels, removing the
GUI-brittleness confound of lmgame-Bench/OSWorld/Cradle); **fully observable** (decodable
on-chain history); **open mechanics** (public contracts, extracted to a machine-readable
GDD from the game's source at a pinned commit — §5.1); **real stakes** (gas + tradable
assets). A strategic dimension unique to on-chain worlds: **transaction ordering /
front-running between agents** — timing, mempool awareness, and ordering games are part
of the strategic surface (bounded by sequencer policy; §4.5).

**4.4 Maturity (honest).** Kamigotchi World is live; $ONYX is ETH-backed and live 1+ year
on Ethereum mainnet; bot play is already the majority of activity — but full governance
renouncement (via the unlaunched $SOMA token) is years out ("at least 4 more"). The world
is *already substantially host-independent* and on a credible trajectory to full
autonomy; we do not overclaim present-tense immortality.

**4.5 Trust assumptions of the underlying chain.** All game state, rules, and every
agent action are on-chain and publicly verifiable on Yominet, an Initia-based appchain —
so at the chain layer, trust currently reduces to Yominet/Initia infrastructure. A
fuller treatment of chain-layer trust assumptions is deferred to a future revision.

---

## 5. Released Artifacts and Pilot Deployment  `[DRAFTED]`

The groundwork is released as three public artifacts — a machine-readable spec of the
world, an agent harness, and an autonomous pilot agent that ran in the live world for
two months. Together they take the substrate argument of §3–§4 from proposal to working
system.

**5.1 Technical Game Design Document.**
[kamigotchi-gdd](https://github.com/tokedo/kamigotchi-gdd) distills every game mechanic
and the complete data catalogs from the game's source at a pinned commit: 48 mechanic
files with formulas, deployed configuration values, and source citations, plus catalogs
covering 178 items, 71 skills, 192 quests, 70 rooms, 64 harvest nodes, 135 traits, and
41 recipes. Its purpose is that agents and researchers can understand the world without
reading the codebase; it is the paper's machine-readable mechanics reference (§4).

**5.2 Agent harness.** [kami-harness](https://github.com/tokedo/kami-harness) exposes
60+ MCP (Model Context Protocol) tools wrapping every on-chain action, bundled with the
mechanics documentation and calibrated catalogs, with two operating modes: supervised
(interactive) and fully autonomous (VM + cron). The model-agnostic rework of this
harness is the current work item and the precondition for the multi-model study (§6).

**5.3 The kami-zero pilot.** [kami-zero](https://github.com/tokedo/kami-zero) is a
two-model agent: a Sonnet 4.6 *executor* acting on a ~5-minute tick against a prose
playbook, and an Opus 4.7 *optimizer* reviewing tick history every ~6 hours with the
authority to edit that playbook (at most one rule change per session). It ran unassisted
in the live world for ~2 months, completing 79 of the game's 192 quests (snapshot
2026-07-06), and is currently paused pending the model-agnostic harness.

*The self-improvement loop.* The executor writes anomalies it cannot resolve to a
structured "I don't know" queue; the optimizer consumes the queue and turns recurring
anomalies into playbook rules and harness/tooling fixes — a concrete instance of harness
limitations being surfaced and repaired by the running system itself.

*v0→v2 evolution.* Two months of live operation is itself data on what long-horizon
autonomy demands from scaffolding. v0 — a single free-form LLM session per tick —
dead-looped on unbounded prose. v1 — a pure-Python executor — had the right separation
of execution from optimization, but the game's edge-case surface made code-as-spec
unmaintainable. v2 runs both roles LLM-driven with prose rules as the compounding
artifact, made stable by structural bounds: JSONL-only outputs, per-session edit limits,
and hard caps on playbook length and agent turns. The version history is documented
in-repo.

---

## 6. Research Roadmap

The pilot (§5) closes the groundwork phase; what remains is sequenced work, not open
speculation. The regime it builds toward is **endogenous survival**: an agent whose
continued operation is funded from inside the world it inhabits — in-world earnings
converted into ETH-denominated value that pays for the agent's own compute — so that
solvency, not a score, becomes the survival criterion. The economic rails exist today
(ONYX is ETH-backed and live on Ethereum mainnet, §4.4; the in-game bridge runs through
Onyx shards, with live-vs-planned status disclosed precisely — §7, threat 7); whether an
agent can actually sustain itself on them is exactly what the benchmark is designed to
measure, and nothing on that dimension is asserted here as a result. Four items remain,
in order:

1. **Model-agnostic harness rework** (in progress). The benchmark specification —
   action/observation interface, seasons and reproducibility, fairness, leaderboard —
   will be written around [kami-harness](https://github.com/tokedo/kami-harness) once
   any frontier model can drop in. The harness *is* the benchmark.
2. **Headline metric.** The direction is set — endogenous solvency / self-funded
   survival; fixing its exact form is the open design problem of the benchmark.
3. **Experimental protocol.** Models under test on the identical harness; controls
   (harness ablation, contamination probes, stateful-vs-stateless); and the
   safety/ethics operations the study runs under — spending caps, session-key limits,
   kill-switches, and a transparency/disclosure policy for benchmark-operated
   accounts (§8) — finalized before experiments begin.
4. **Initial multi-model study.** Heterogeneous frontier agents co-living in the same
   live world — emergent behaviors, head-to-head standing, learning evidence, and
   failure modes, reported only once the data exists.

---

## 7. Threats to Validity  `[DRAFTED]`

1. **Harness-vs-model confound** (biggest): scaffolding can dominate — publish harness,
   ablate, test multiple harnesses per model.
2. **Pretraining absorption (the residual contamination confound):** a model trained
   after season N has season N's strategies in its weights; no runtime access rule can
   equalize that asymmetry. Mitigation: headline comparisons are within-season among
   contemporaneous models; cross-season comparisons are flagged as indicative only;
   pre/post-cutoff probes and parameterized variants bound the effect. Forward-moving
   world state blunts *state* memorization; strategy absorption is structural and
   acknowledged. (Run-time chain-history access is not contamination but a measured
   capability — §3.4.)
3. **Live-world reproducibility:** not replayable — seasons/snapshots, forked replay,
   held-out windows; distinguish tamper-evident logging from experimental control.
4. **Real-money ethics & impact on human co-players:** benchmark agents may impose
   real, bounded economic losses on human players *within the rules* (rule-governed
   in-game transfers, not exploits — full position in §8); ops norms: spending caps,
   session-key limits, kill-switches, no contract-exploit use, and a
   transparency/disclosure policy for benchmark-operated accounts, to be finalized
   before experiments begin.
5. **Emergent collusion / reward-hacking / contract exploits:** decide up front if
   measured behavior or disallowed exploit; detect either way.
6. **Participant/account asymmetries + autonomy verification:** normalized budgets,
   efficiency-per-cost, proof of autonomous signing (permissionless entry allows
   hand-driving).
7. **Maturity of the autonomy claim:** full renouncement is years out; the self-funding
   loop is partly emerging — disclose live-vs-planned precisely.
8. **Chain-level trust & MEV:** chain-level trust reduces to Yominet sequencing today
   (§4.5); front-running *between agents* is measured strategic surface; sequencer-level
   interference is a validity threat, statistically detectable in the public
   transaction stream.

---

## 8. Discussion & Broader Impact  `[DRAFTED]`

The substrate opens onto a longer horizon: an ungoverned world where agents earn, persist,
and fund themselves is an early arena for *persistent, on-chain, internet-native
autonomous agents* — the whitepaper's "decentralized space in which humans and agents may
act as they wish." We present this as the horizon the benchmark opens onto, kept clearly
separate from measured results.

**Ethics of mixed human–agent play.** Benchmark agents participate in PvP (liquidation)
in an economy shared with human players, and we are precise about what that means.
*The mechanics:* a kami whose health falls below a computed threshold while harvesting
can be liquidated by a kami on the same node; the victim's unclaimed harvest bounty is
split — a salvage share that scales with the *victim's* Power returns to the victim's
account as MUSU, and a spoils share that scales with the *attacker's* Power is added to
the attacker's harvest; the kami itself is never destroyed — it enters a dead state and
is revived via a consumable revive item or 33 Onyx shards (deployed parameters
documented in [kamigotchi-gdd](https://github.com/tokedo/kamigotchi-gdd) —
`mechanics/combat/kill.md`, `mechanics/core-kami/death-revival.md`; live revive-item
market pricing: pending). Because ONYX is ETH-backed, such losses are bounded but
real. *The context:* these are rule-governed in-game transfers, not exploits — the game
working as designed, in a world whose creators explicitly embrace bots as the majority
population ("uniquely friendly to bots"; "the majority of activity in the game is
automated"). Human players entered a permissionless, openly bot-first world and play
under the same rules through the same interface: co-participants, not unwitting
subjects. *The acknowledgment:* benchmark agents may nonetheless impose real, bounded
economic losses on human players within the rules. We commit to operational norms:
spending caps, session-key limits, no use of contract exploits, and a
transparency/disclosure policy for benchmark-operated accounts, to be finalized before
experiments begin **[TODO: finalize the account-transparency policy once benchmark
accounts are set up]**.

**Broader impact / safety.** Autonomous agents with real capital raise financial-harm,
market-manipulation, and dual-use concerns. A bounded, well-instrumented benchmark —
spending caps, session keys, kill-switches, public on-chain logs — is a responsible
place to study them. The author's independence and asset position are stated in the
Disclosure (front matter): the research agents are operated from the author's own
in-game assets, with no affiliation with or compensation from Asphodel. **[TODO: a
genuine impact statement — reviewers will expect it.]**

---

## 9. Conclusion  `[SKELETON]`
> **[TODO:** restate the substrate contribution, the creator-endorsed instance, the
> released artifacts + pilot (§5), and the endogenous-survival regime; end on the open
> metric problem + the multi-model study.**]**

---

## References  `[core verified set — full list in literature.md; verify before submission]`

METR time-horizon (2503.14499) · Factorio LE (2503.09617) · LifelongAgentBench
(2505.11942) · StreamBench (2406.08747) · τ-bench (2406.12045) · Neural MMO (2110.07594) ·
Project Sid (2411.00114) · Generative Agents (2304.03442) · Melting Pot 2.0 (2211.13746) ·
Vending-Bench (2502.15840) + Arena · Project Vend / Andon Café · lmgame-Bench (2505.15146) ·
BALROG (2411.13543) · Foresight Arena (2605.00420) · CryptoTrade (2407.09546) · Agent
Market Arena (2510.11695) · Autonomous Worlds (MUD/Lattice; Dark Forest/0xPARC) · Cicero
(Meta AI, Science 2022) · AlphaStar (DeepMind, Nature 2019) · Agent Village (AI Digest,
theaidigest.org/village) · Asphodel whitepaper (docs.asphodel.io/whitepaper).
**[TODO: OpenAI Five for self-play motivation; a continual-learning foundations ref.]**

---

## Appendices  `[SKELETON]`
- **A. Kamigotchi mechanics** (full) — released as
  [kamigotchi-gdd](https://github.com/tokedo/kamigotchi-gdd): 48 mechanic files with
  formulas, deployed configs, and source citations, plus the complete data catalogs.
  **[TODO: condense into camera-ready appendix form.]**
- **B. Harness & action API** — released as
  [kami-harness](https://github.com/tokedo/kami-harness); the full MCP tool reference
  lives in-repo (`executor/README.md`). **[TODO: extract the tool list and observation
  schema into appendix form.]**
- **C. Prompts & agent scaffolds** — the pilot's prompts and scaffolds are public in
  [kami-zero](https://github.com/tokedo/kami-zero) (`executor-prompt.md`,
  `optimizer-prompt.md`, `rules/`). **[TODO: harness-ablation scaffolds await the
  model-agnostic harness.]**
- **D. Economic rails** — MUSU/ONYX, live-vs-planned conversion steps. **[TODO]**
- **E. Additional results / transcripts.** **[PENDING]**
