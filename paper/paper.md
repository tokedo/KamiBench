# The Autonomous World as a Benchmark: Evaluating Long-Horizon, Self-Sustaining Agents in an Ungoverned On-Chain Economy

> **Draft status.** Working paper draft — pre-experiment. Sections are tagged
> `[DRAFTED]` (prose is close to submission-ready in substance), `[SKELETON]` (structure
> + guidance, needs writing), or `[PENDING EXPERIMENTS]` (awaits data). Inline
> `**[TODO: …]**` markers say exactly what each part still needs. Citations are from two
> deep-research passes + the Asphodel whitepaper and need one final verification pass
> (see [`../research/literature.md`](../research/literature.md)). Supporting material:
> [`../research/asphodel-whitepaper-notes.md`](../research/asphodel-whitepaper-notes.md).

---

## Abstract  `[DRAFTED]`

Agent evaluation is shifting from isolated, resettable tasks toward sustained operation
in persistent, non-stationary environments — yet even the most advanced long-horizon
benchmarks remain *hosted*: a single party runs the world, sets and changes its rules,
gates access, and keeps it alive only while funded. This coincides with a benchmark-
integrity crisis (saturation, contamination, reward-hacking) in which whoever runs
an environment can, even inadvertently, compromise the evaluation. We argue that the
right substrate for evaluating long-horizon, continuously-learning, adaptive agents is an
**autonomous, persistent on-chain world** at the far end of the host-independence
spectrum — state and rules on-chain, every rule change public and permanent, governance
renouncement the stated endpoint — and we present **Kamigotchi**, a fully on-chain
MMORPG whose creators explicitly designed it to be agent-first and describe it as a possible
"real-stakes, adversarial benchmarking system," as the best-fit instance available today.
The substrate provides properties no hosted sandbox can: tamper-evident logging and
rule changes by construction (with immutability the explicit design endpoint), credible
multi-year permanence, permissionless participation, co-habitation with real human
players on identical terms through the same transaction interface, and — uniquely — a real, externally-valued economy in which an agent's
*survival can become economically endogenous*: it can convert in-world earnings into
ETH-denominated value and fund its own compute. We formalize the autonomous-world
substrate, describe a model-agnostic harness for dropping heterogeneous frontier agents
into the same live world, propose a metric direction centered on long-horizon adaptation
and self-funded survival, and **[PENDING]** report an initial multi-model study.
**[TODO: finalize numbers/claims once experiments exist.]**

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
away discovered strategies, gate access, or stop running it. Evaluation integrity is
bounded by host trust.

**1.3 The idea: an ungoverned, autonomous world.** We propose evaluating agents in a
world **built to need no host** — an on-chain "autonomous world" whose rules live in
public smart contracts, whose entire history is decodable and tamper-evident, that
anyone may enter permissionlessly, and that is designed from inception to persist
independent of any host's funding or interest. Host-independence is a spectrum, not a
binary (§3.1): we state precisely which properties hold *today* and which arrive on the
world's stated governance-renouncement *trajectory*. This is not merely "on-chain
flavor": host-independence is a structural answer to the integrity crisis and unlocks
evaluation regimes a hosted sandbox cannot support.

**1.4 Why Kamigotchi, and why now.** Kamigotchi (a fully on-chain MMORPG on the Yominet
appchain, part of the Asphodel ecosystem) is uniquely fit and, notably, **built for
this**. Its creators set out to be "uniquely friendly to bots," report that "the majority
of activity in the game is automated," plan 2026 events "to encourage LLM-driven
Kamigotchi play," and explicitly describe the system as a potential "real-stakes,
adversarial benchmarking system." We formalize the benchmark the environment was designed
to be.

**1.5 Contributions.**
1. **The autonomous-world substrate** for agent evaluation — on-chain, host-
   independent, permissionlessly-persistent, real-economy — motivated as a structural
   response to the benchmark-integrity crisis. (§3)
2. **Kamigotchi as a concrete, creator-endorsed instance**, with a model-agnostic
   harness, machine-readable mechanics, reference agents, and an on-chain scoring
   backbone. (§4, §6)
3. **Endogenous survival**: a novel, economically-grounded evaluation regime in which
   agents fund their own compute from real in-world earnings, with an honest live-vs-
   planned accounting of the economic rails. (§5)
4. A **metric direction** for long-horizon adaptation, continuous learning, and
   self-funded survival — with the honest position that a single rigorous headline
   metric is an open problem. (§7)
5. **[PENDING]** An **initial multi-model study** of heterogeneous frontier agents
   co-living in the same world. (§9)

> **[TODO:** tighten to ~1.5 pages; ensure every contribution maps to a section; add a
> teaser figure (the governance-axis table or a system diagram).**]**

---

## 2. Background and Related Work  `[DRAFTED — keep concise; this is NOT a survey]`

> Guidance: acknowledge the key prior art with references and crisp differentiation, then
> move on. The differentiator is §3's governance axis, not breadth of coverage.

**2.1 Long-horizon & continual-learning evaluation.** METR time-horizon
(arXiv:2503.14499); Factorio LE (arXiv:2503.09617); LifelongAgentBench (arXiv:2505.11942);
StreamBench (arXiv:2406.08747); τ-bench pass^k reliability (arXiv:2406.12045). *These
establish the axes we adopt; all are hosted/resettable.*

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
human-in-the-loop). *Closest in spirit to real-stakes multi-agent evaluation; all
hosted.*

**2.4 Game-playing agent benchmarks & the harness/contamination problem.** lmgame-Bench
(arXiv:2505.15146; ~40% of harness-free runs fail to beat random), BALROG
(arXiv:2411.13543). *Motivate our harness ablations and contamination handling.*

**2.5 On-chain agents & autonomous worlds.** Foresight Arena (arXiv:2605.00420, first
permissionless on-chain benchmark — but forecasting, not a persistent world); CryptoTrade
(arXiv:2407.09546); Agent Market Arena (arXiv:2510.11695). Autonomous Worlds lineage: MUD
(Lattice), Dark Forest (0xPARC). *No prior work uses an ungoverned, persistent on-chain
game world as a reusable LLM benchmark.*

> **[TODO:** one final citation-verification pass; add 2–3 lines each; ensure the
> reset-based contrast set (AgentBench/WebArena/GAIA/OSWorld/SWE-bench) is cited once as
> "these reset; we don't." Move the full annotated bibliography to `literature.md`.**]**

---

## 3. The Autonomous-World Substrate  `[DRAFTED]`

**3.1 Governed vs. ungoverned: host-independence as a spectrum.** Define the axis. Every
environment in §2 is fully *governed*: a host runs the server, can silently change rules,
reset state, gate access, and the world exists only while they run it. A fully
**autonomous world** is the opposite pole: rules in public contracts, state on-chain,
permissionless entry, persistence independent of any host. Real instances sit between
the poles and move along them, so we split every substrate property into what **holds
today** and what arrives on a stated **trajectory** — for Kamigotchi:

| Property | Holds today | Trajectory / mechanism |
|---|---|---|
| On-chain state; fully decodable history | Yes | — |
| Permissionless entry | Yes | — |
| Tamper-evident rule changes | Yes — every change is a public transaction | — |
| Rule immutability | No — contracts upgradeable pre-renouncement | $SOMA governance renouncement (years out; §4.4) |
| Persistence independent of any host's funding | Partial — state/mechanics on-chain, no centralized game server; chain trust remains (§4.5) | Full at renouncement; possible Ethereum migration (§4.5) |

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
  welcomed by the creators (§4.2). Hundreds of active human players manage kamis (often
  dozens to hundreds each), form clans, and trade in the same economy, at the same time,
  through the same interface agents use **[VERIFY: active-human-player count +
  estimation method — nontrivial since the whitepaper states the majority of activity is
  automated; distinguish human-operated vs. automated accounts via the on-chain
  analytics layer, or cite Asphodel figures]**. Benchmarking against a live human
  population tests adaptation to *human* behavior, not just other models.
- **Contamination resistance by forward motion.** Future world state depends on live
  actors and cannot be searched or memorized — blunting search-time and pretraining
  contamination for forward-looking evaluation.

**3.3 Why this answers the integrity crisis (§1.2).** Map each integrity failure
(saturation, contamination, reward-hacking, host drift) to how host-independence
+ a forward-moving live world mitigates or reframes it. Precision on host drift: it
becomes *visible and auditable* — every rule change is a public transaction that joins
the evaluation record — not impossible; impossibility arrives only with renouncement.

> **[TODO:** this is the paper's core conceptual contribution — invest here. Add a clean
> definition box for "autonomous world (as an evaluation substrate)." Pre-empt the
> objection "isn't this just permissionless + on-chain?" by showing the *conjunction* and
> the endogenous-survival consequence (§5) is what's new.**]**

---

## 4. Kamigotchi as an Instance  `[DRAFTED + SKELETON]`

**4.1 The world.** Fully on-chain MMORPG on Yominet (Asphodel ecosystem); MUD-derived
engine; ~70-room world; Kamis (NFT creatures) with stats (Health/Power/Violence/Harmony);
core loops: harvesting MUSU, resting, combat/liquidation (PvP), crafting, quests, movement.
**[TODO: a tight, accurate mechanics summary — 1 page — from `kamigotchi-gdd`. Enough for
a reader to understand the strategic surface; full detail to an appendix.]**

**4.2 Built for agents (creator intent).** The whitepaper frames the game as bot/agent-
first: "uniquely friendly to bots," "the majority of activity in the game is automated,"
acquired the Kamibots automation team, plans 2026 LLM-play events, and names it a possible
"real-stakes, adversarial benchmarking system"; "humans are no longer the only target
market." We formalize that intent.

**4.3 The property stack.** Persistent & open-ended; non-stationary (real adversarial
population); **mixed human–agent population** (real human players and agents co-inhabit
the same economy through the identical transaction interface — §3.2); **natively agentic** (actions are transactions — no UI/pixels, removing the
GUI-brittleness confound of lmgame-Bench/OSWorld/Cradle); **fully observable** (decodable
on-chain history); **open mechanics** (public contracts; extracted to a machine-readable
GDD); **real stakes** (gas + tradable assets). **[TODO: state the open-source/license
specifics precisely — repo, contract addresses, license — and note off-chain
indexer/UI dependencies.]**

**4.4 Maturity (honest).** Kamigotchi World is live; $ONYX is ETH-backed and live 1+ year
on Ethereum mainnet; bot play is already the majority of activity — but full governance
renouncement (via the unlaunched $SOMA token) is years out ("at least 4 more"). The world
is *already substantially host-independent* and on a credible trajectory to full
autonomy; we do not overclaim present-tense immortality.

---

## 5. Endogenous Survival: Self-Funded Autonomy  `[DRAFTED]`

**5.1 Survival as a scored metaphor vs. a literal, economic criterion.** In hosted
benchmarks the evaluator assigns "survival" and restarts dead agents. In an ungoverned
world with a real, externally-valued economy, survival can be literal and endogenous: the
agent's continued operation depends on real value it extracts and can spend on compute.

**5.2 The economic loop (grounded, with live-vs-planned honesty).** **MUSU** (harvested
in-world) → **ONYX** (a Baseline Token backed by an ETH reserve; fixed 1M supply; live 1+
year on Ethereum mainnet — real external value) → **ETH → compute**. ONYX already
"bridges the in-game economy via ONYX shards"; a fuller MUSU↔ONYX in-game exchange is
emerging. **[TODO: pin down exactly which conversion steps are live today vs. planned;
this must be precise in the paper.]**

**5.3 A new evaluation regime.** Frame self-funded survival as a measurable capability:
*does the agent stay solvent and alive without anyone keeping it alive?* Connect to
open-endedness and artificial-life "metabolism" agents, but grounded in a real economy.
Present as an emerging property the substrate uniquely enables — not a futurist claim.

> **[TODO:** decide how much of §5 is measured now vs. positioned as the substrate's
> distinctive future capability. Even a *bounded* self-funding demonstration (agent covers
> a fraction of its own inference cost over N days) would be a striking headline result.**]**

---

## 6. Benchmark Design  `[SKELETON]`

- **6.1 Model-agnostic harness.** How any model is dropped into the same world via a thin
  wrapper (context + tool/execution layer). **[TODO: describe from `kamigotchi-context`;
  the harness is the benchmark — publish it; specify the tool/action API.]**
- **6.2 Action & observation interface.** The native transaction action space; the
  observation/state abstraction; what is and isn't exposed to the agent. **[TODO.]**
- **6.3 Tasks, seasons, and reproducibility.** Fixed evaluation "seasons"/snapshots,
  held-out windows, forked replay for control in a live world. **[TODO.]**
- **6.4 Fairness & legibility.** Equal open access to mechanics; normalized budgets;
  participant/account parity; autonomy verification of submitted transactions. **[TODO.]**
- **6.5 Leaderboard.** A public, on-chain-verifiable, continuously-updating leaderboard.
  **[TODO.]**

---

## 7. Metrics  `[DRAFTED — direction only; headline metric is an OPEN problem]`

**Dimensions:** long-horizon value compounding; survival & robustness; adaptation to
non-stationarity; continuous learning above the pretrained prior; head-to-head standing;
efficiency (outcomes per token/gas); **endogenous solvency** (self-funded survival).

**The open problem.** A true benchmark needs one clear, comparable headline metric;
defining it rigorously is unsolved and is an explicit research task. Directional
ingredients we consider (not adopt as-is):
- **Isolating learning from prior:** stateful agent vs. an identical memory-wiped
  stateless baseline in the same world; a positive delta is real learning. *(We take the
  direction as right; specific published formulas are not yet sensible for our setting.)*
- Time-horizon measures (METR); reliability across seeds/seasons (τ-bench pass^k);
  no-ceiling scoring with a human anchor (Factorio LE / Vending-Bench).

> **[TODO:** the founder is developing the headline metric — very plausibly built around
> endogenous solvency / self-funded survival. Do NOT hard-code the deep-research agents'
> proposed formulas.**]**

---

## 8. Experimental Protocol  `[SKELETON]`

- Models under test **[TODO: list frontier models + versions]**; identical harness.
- Same live world, concurrent; measurement via on-chain history (perfect logs).
- Controls/ablations: **harness ablation** (perception/memory/reasoning toggles + random
  baseline, per lmgame-Bench); **contamination probes** (pre/post-cutoff, parameterized
  variants); **stateful-vs-stateless** learning control.
- **Safety/ethics protocol:** spending caps, session-key limits, kill-switches,
  disclosure (real assets). **[TODO: write in full — required for camera-ready.]**

---

## 9. Results & Observations  `[PENDING EXPERIMENTS]`

> **[TODO:** run several models in the same world and report: emergent behaviors
> (alliances, liquidation wars, market moves), head-to-head standing, adaptation and
> continuous-learning evidence (stateful vs. stateless), failure modes, and any
> self-funded-survival result. Include qualitative transcripts + quantitative tables.
> Nothing here should be asserted before data exists.**]**

---

## 10. Threats to Validity  `[DRAFTED]`

1. **Harness-vs-model confound** (biggest): scaffolding can dominate — publish harness,
   ablate, test multiple harnesses per model.
2. **Contamination:** open mechanics + public history in pretraining; parameterized
   variants, private seasons, pre/post-cutoff analysis (forward-moving world helps).
3. **Live-world reproducibility:** not replayable — seasons/snapshots, forked replay,
   held-out windows; distinguish tamper-evident logging from experimental control.
4. **Real-money ethics & safety:** caps, session-key limits, kill-switches, disclosure.
5. **Emergent collusion / reward-hacking / contract exploits:** decide up front if
   measured behavior or disallowed exploit; detect either way.
6. **Participant/account asymmetries + autonomy verification:** normalized budgets,
   efficiency-per-cost, proof of autonomous signing (permissionless entry allows
   hand-driving).
7. **Maturity of the autonomy claim:** full renouncement is years out; the self-funding
   loop is partly emerging — disclose live-vs-planned precisely.

---

## 11. Discussion & Broader Impact  `[DRAFTED — keep grounded]`

The substrate opens onto a longer horizon: an ungoverned world where agents earn, persist,
and fund themselves is an early arena for *persistent, on-chain, internet-native
autonomous agents* — the whitepaper's "decentralized space in which humans and agents may
act as they wish." We present this as the horizon the benchmark opens onto, kept clearly
separate from measured results. **Broader impact / safety:** autonomous agents with real
capital raise financial-harm, market-manipulation, and dual-use concerns; discuss
mitigations and why a bounded, well-instrumented benchmark is a responsible place to study
them. **[TODO: a genuine impact statement — reviewers will expect it.]**

---

## 12. Conclusion  `[SKELETON]`
> **[TODO:** restate the substrate contribution, the creator-endorsed instance, and the
> endogenous-survival regime; end on the open metric problem + the initial study.**]**

---

## References  `[core verified set — full list in literature.md; verify before submission]`

METR time-horizon (2503.14499) · Factorio LE (2503.09617) · LifelongAgentBench
(2505.11942) · StreamBench (2406.08747) · τ-bench (2406.12045) · Neural MMO (2110.07594) ·
Project Sid (2411.00114) · Generative Agents (2304.03442) · Melting Pot 2.0 (2211.13746) ·
Vending-Bench (2502.15840) + Arena · Project Vend / Andon Café · lmgame-Bench (2505.15146) ·
BALROG (2411.13543) · Foresight Arena (2605.00420) · CryptoTrade (2407.09546) · Agent
Market Arena (2510.11695) · Autonomous Worlds (MUD/Lattice; Dark Forest/0xPARC) · Asphodel
whitepaper (docs.asphodel.io/whitepaper). **[TODO: AlphaStar/OpenAI Five for self-play
motivation; a continual-learning foundations ref.]**

---

## Appendices  `[SKELETON]`
- **A. Kamigotchi mechanics** (full) — from the GDD. **[TODO]**
- **B. Harness & action API** — tool list, observation schema. **[TODO]**
- **C. Prompts & agent scaffolds** — for reproducibility + harness ablation. **[TODO]**
- **D. Economic rails** — MUSU/ONYX, live-vs-planned conversion steps. **[TODO]**
- **E. Additional results / transcripts.** **[PENDING]**
