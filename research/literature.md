# Literature Review Collection

> Annotated bibliography for the "Kamigotchi as a benchmark for long-horizon,
> continuously-learning agents" thesis (see `kamigotchi-as-benchmark.md`). Feeds the
> paper's related-work section.

> **Status.** Updated 2026-07-04 from two independent deep-research passes. One pass
> verified most entries below with arXiv IDs and explicit VERIFIED tags; the other
> corroborated the themes. **Still do one final independent citation check before
> camera-ready** — a few IDs/claims were flagged unverified (noted inline).
> Lower-confidence items surfaced by only one pass are quarantined in section H.
> 2026-07-13: seven audit-mandated entries added (post-audit surgical pass); their
> links and author lists were verified against arXiv/the live sites that day.

---

## A. Closest prior art — MUST cite and differentiate (reviewers will know these)

- **Neural MMO Platform** — Suarez et al., NeurIPS 2021 D&B, arXiv:2110.07594 (+ 2019
  arXiv:1903.00784; 2.0 at AAMAS 2024). Persistent, 1–1024 agents, open-ended,
  long-horizon, global market. **The most threatening prior art for the "persistent +
  massively multi-agent + open-ended" bundle.** *Differ:* RL/simulation, centrally
  hosted, no real economy, not permissionless, not LLM-native. → our wedge is on-chain
  + native-agentic + real stakes.
- **Vending-Bench Arena** — Andon Labs, 2025 (andonlabs.com/evals/vending-bench-arena).
  Heterogeneous frontier models run competing machines in a shared economy; already
  shows spontaneous cartels, deception, exploitation. **Closest prior art to "frontier
  agents co-live and compete."** *Differ:* closed single-host simulation, not
  permissionless, not on-chain, no real assets.
- **Project Sid** — Altera (Yang et al.), 2024, arXiv:2411.00114. 10–1000+ persistent
  LLM agents co-living in Minecraft (PIANO arch); emergent roles, in-game currency.
  *Differ:* off-chain, centrally hosted, a study not a reusable competitive benchmark.
- **Foresight Arena** — Nechepurenko & Shuvalov, 2026, arXiv:2605.00420. "First
  permissionless, on-chain benchmark" for AI **forecasting** agents (Polymarket via
  commit-reveal contracts on Polygon). **The single most important on-chain benchmark to
  cite/differentiate.** *Differ:* forecasting/prediction markets, not a persistent
  multi-agent game world; agents don't co-live/adapt against each other in shared state.

---

## B. Long-horizon business / economic agents (Andon Labs cluster — VERIFIED)

- **Vending-Bench** — Backlund & Petersson (Andon Labs), 2025, arXiv:2502.15840.
  Simulated vending business over ~20M-token runs; tests long-term *coherence* (failure
  modes: looping, identity drift, hallucinated supplier emails). Claude 3.5 Sonnet led
  original results; all models eventually fail; high variance. Anchors the "no reset /
  unbounded horizon" requirement — single-agent, simulated.
- **Vending-Bench 2 / Arena** — Andon Labs, 2025 (see A for Arena). VB2: one simulated
  year, scored on final balance; adversarial suppliers. Useful for no-ceiling scoring
  with a human anchor.
- **Project Vend (Phase 1 & 2)** — Anthropic + Andon Labs, 2025
  (anthropic.com/research/project-vend-1, -2). Real office shop run by "Claudius"
  (Claude Sonnet 3.7); lost money, identity-crisis episode, sold tungsten cubes at a
  loss; Phase 2 added a CEO agent + expansion. Verifies "real stakes" + real-world
  messiness; helpfulness-vs-profit tension.
- **Andon Café ("Mona")** — Andon Labs, opened mid-April 2026, Stockholm
  (andonlabs.com/cafe; PBS/AP coverage). Agent on **Google Gemini** hires/manages two
  human baristas via Slack, handles permits/pricing/inventory; humans brew. Reportedly
  >$5.7k sales vs. <$5k left of a $21k+ budget; failure modes (impersonation,
  over-ordering). **Our anchor for "open environment, but expensive + human-in-loop +
  single-agent."** *(Exact Gemini version behind "Mona" not authoritatively confirmed;
  reported as Gemini, possibly "Gemini 3.1 Pro Preview" — verify.)*
- **CoffeeBench** — Sugiura et al. (Sakana AI + KPMG), 2026, arXiv:2606.16613. 90-day
  simulated **heterogeneous** multi-agent economy (farmers/roasters/retailers). A
  complementary 2026 preprint; pure simulation, fixed reference agents, no on-chain —
  "still simulated" contrast.

---

## C. Open-ended / lifelong embodied game agents (VERIFIED)

- **Voyager** — Wang et al., 2023, arXiv:2305.16291. First LLM embodied lifelong learner
  in Minecraft: auto-curriculum, growing executable **skill library**, self-verification.
  Anchors "continuous learning / skill accumulation." *Differ:* single-agent,
  non-competitive, resettable, no survival/solvency constraint.
- **Factorio Learning Environment** — Hopkins et al., 2025, arXiv:2503.09617. Open-ended,
  **no natural completion state**; explicitly motivated by benchmark saturation /
  unbounded evaluation. Strongest anchor for "unbounded horizon / no ceiling." *Differ:*
  single-agent, simulation.
- **BALROG** — Paglieri et al., ICLR 2025, arXiv:2411.13543. Six RL game envs; procedural
  generation for contamination resistance; fine-grained progress metrics. Good model for
  game-based agent eval + contamination mitigation; episodic/resettable.
- **lmgame-Bench** — Hu et al., 2025, arXiv:2505.15146. Six games via unified Gym-style
  API with toggleable perception/memory/reasoning scaffolds. **Key for the
  harness-sensitivity threat:** "~40% of game runs without the harness fail to outperform a
  random-play baseline"; prompt sensitivity + contamination confound naive game evals.
- Contrast points (perception/GUI brittleness — cite briefly): **MineDojo** (Fan et al.,
  2022), **SIMA** (DeepMind, 2024), **Cradle** (2024, GUI/AAA control), **OSWorld** (Xie
  et al., 2024). Kamigotchi's native-transaction interface bypasses all of this.

---

## D. Massively-multiagent / social-economic simulation with LLMs (VERIFIED)

- **Generative Agents** — Park et al., UIST 2023, arXiv:2304.03442. 25 agents in
  "Smallville"; memory/reflection/planning; emergent coordination. Foundational
  multi-agent LLM sandbox; cooperative, not persistent-benchmark, not real-stakes.
- **Melting Pot / 2.0** — Leibo et al., ICML 2021 + arXiv:2211.13746. Canonical
  multi-agent *evaluation* suite (generalization to novel co-players, mixed-motive).
  Motivates cross-play / non-stationarity metrics.
- **Concordia** — Vezhnevets et al., 2023, arXiv:2312.03664 (+ NeurIPS 2024 contest).
  LLM agents in physical/social/digital space via a game-master; mixed-motive eval.

**Live mixed-population and co-living precedents:**
- **Cicero** — Bakhtin et al. (Meta AI), Science 2022. Human-level Diplomacy playing
  against real humans on webDiplomacy.net. *Differ:* episodic matches with fixed
  endpoints; no persistent shared economy, no stakes carried across games.
- **AlphaStar** — Vinyals et al. (DeepMind), Nature 2019. Grandmaster StarCraft II via
  anonymized ranked matches against humans on the Battle.net ladder. *Differ:* episodic
  ladder games; RL not LLM; no persistence or economy — vs. our persistent shared
  economy co-inhabited by humans and agents over months.
- **AI Village** — AI Digest, launched April 2025 (theaidigest.org/village — canonical
  name; "Agent Village" appeared only in early materials; best citable artifact: the
  2025 recap, theaidigest.org/village/blog/what-we-learned-2025). Multiple
  heterogeneous frontier agents (Anthropic/OpenAI/Google models) co-existing for
  weeks–months with computer use, publicly observable, pursuing real-money goals
  (charity fundraising). `[VERIFY: exact agent lineup, duration, amounts from
  theaidigest.org before citing]` *Differ:* cooperative not adversarial; hosted; no
  shared persistent economy; agents don't transact against each other — but it IS
  heterogeneous frontier agents co-living long-horizon with real stakes in public, so
  it must be cited and differentiated.

---

## E. Continual / lifelong / streaming learning for LLM agents (VERIFIED)

- **LifelongAgentBench** — Zheng et al., 2025, arXiv:2505.11942. "First unified
  benchmark" for lifelong learning of LLM agents (DB/OS/KG); finds naive experience
  replay weak. Supports "continuous learning mandatory" — sequential tasks, not a live
  adversarial world.
- **StreamBench** — Wu et al., 2024, arXiv:2406.08747. Online input-feedback stream;
  improvement post-deployment. Anchors test-time/streaming-learning metric design.
- **Lifelong Learning of LLM-based Agents: A Roadmap** — 2025, arXiv:2501.07278. Survey;
  continual-learning taxonomy, catastrophic forgetting, stability–plasticity.

---

## F. Long-horizon capability & tool/agent benchmarks (VERIFIED)

- **Measuring AI Ability to Complete Long Tasks** — Kwa et al. (METR), 2025,
  arXiv:2503.14499. "50%-task-completion time horizon"; frontier horizon doubling ~every
  7 months. Best citation for *why* long-horizon eval matters + a time-horizon metric.
- **τ-bench / τ²-bench** — Yao et al. (Sierra), 2024, arXiv:2406.12045. Tool-agent-user
  interaction; **pass^k** reliability metric; SOTA <50%, inconsistent. Model for
  reliability-over-trials.
- **AI Agents That Matter** — Kapoor, Stroebl, Siegel, Nadgir & Narayanan, TMLR 2025,
  arXiv:2407.01502. Cost-controlled evaluation: report accuracy jointly with dollar
  cost. *Relates:* grounds Experiment 001's fixed, budget-blind inference budget
  (capability per unit of inference).
- **Preregistration for Experiments with AI Agents** — Vaccaro, ICML 2026 position
  paper, arXiv:2606.11217. *Relates:* the methodological anchor for our registered,
  git-timestamped experiment designs (results appended without revising the protocol).
- **Reset-based contrast set** ("these reset; we don't"): AgentBench (Liu et al., 2023,
  arXiv:2308.03688), WebArena (arXiv:2307.13854), GAIA (Mialon et al., 2023,
  arXiv:2311.12983), ALFWorld (arXiv:2010.03768), OSWorld (arXiv:2404.07972), SWE-bench
  (arXiv:2310.06770). Cite from primary sources. IDs verified against arXiv 2026-07-05.

---

## G. On-chain / crypto-native agents + Autonomous Worlds substrate (VERIFIED)

- **CryptoTrade** — Li et al., EMNLP 2024, arXiv:2407.09546. Reflective LLM trading agent
  (on-/off-chain data). Trading benchmark, not a game.
- **Agent Market Arena** — Qian et al., 2025, arXiv:2510.11695. "First lifelong,
  real-time" multi-market LLM trading benchmark (incl. crypto). Live-data trading, not
  an on-chain game.
- **Empirical/security studies** (agents as *subjects*): "Paper Agents, Paper Gains"
  (arXiv:2605.29174, DeFi agents trade poorly without human insight); "SoK: Security and
  Privacy of AI Agents for Blockchain" (arXiv:2509.07131).
- **Verifiable evaluations of ML models using zkSNARKs** — South et al., 2024,
  arXiv:2402.02675. zk-attestation of a single model's evaluated outputs without
  trusting the provider. *Differ:* attests isolated evaluations; our requirement is
  auditable execution of a shared, persistent world.
- **Named on-chain agent projects with NO rigorous benchmark paper** (press/whitepaper
  only): Freysa (adversarial treasury game, Base, 2024), ElizaOS/ai16z, Virtuals
  Protocol, Olas/Autonolas. Mention to show the *gap*.
- **Freysa** — freysa.ai, Base, 2024 (gray literature; URL verified 2026-07-13).
  Adversarial agent game — a capital-holding on-chain agent as a public demonstration.
  *Differ:* one-off game, no benchmark protocol; cited so "agents holding real capital"
  is never claimed as our first.
- **Virtual Agent Economies** — Tomašev, Franklin, Leibo, et al., 2025,
  arXiv:2509.10147. Sandbox-economy analysis of how agent economies interpenetrate the
  human economy. *Relates:* maps the neighborhood of the endogenous-survival regime;
  position/analysis, not a benchmark.
- **RepliBench** — Black et al. (UK AI Security Institute), 2025, arXiv:2504.18565.
  Safety evaluation operationalizing resource acquisition and self-replication as
  threat models. *Differ:* staged capability eval; ours formalizes survival as a
  registered benchmark regime in a live economy — also grounds the paper's §6.4
  dual-use clause.
- **Autonomous Worlds substrate:** MUD engine (Lattice,
  lattice.xyz/blog/mud-an-engine-for-autonomous-worlds); Dark Forest (0xPARC — first zk
  incomplete-info on-chain game, attracted bot players; an ungoverned on-chain world,
  but not an LLM benchmark); 0xPARC/Ludens "Autonomous Worlds" essay (2022) — anchors
  the **ungoverned / host-independent** framing that is now our central novelty axis.
- **Artificial-life / self-sustaining-autonomy framing** (for "endogenous survival —
  agents fund their own compute"): connect to open-endedness (Factorio LE, POET-style)
  and ALife "metabolism/budget" agents, but grounded in a *real* economy. `[find the
  strongest 1–2 anchors; keep it rigorous, not futurist]`

---

## H. Unverified leads (surfaced by Report 2 only — CHECK before citing)

Report 1's rigorous pass did **not** independently surface these; treat as low-confidence
until verified (some may be real, some may be hallucinated titles):
- "Emergence World" (claimed persistent multi-agent sim); "OpenLife / Open-world ALIFE";
  "CL-Bench (Continual Learning Bench)"; "SkillLearnBench"; "TAMAS" (multi-agent
  adversarial safety); "BenchJack" (benchmark red-teaming / reward hacking); "EVMbench"
  (smart-contract security agents); "ERC-8004" (agent identity/reputation standard —
  plausibly real, verify). Also verify: Search-Time Contamination paper (Report 1 gave
  arXiv:2606.05241; Report 2 corroborates the concept).

---

## I. Kamigotchi / Asphodel substrate facts (verify repo/license precisely)

Fully on-chain idle/MMORPG by **Asphodel**; NFT "Kamis" on the **Yominet** appchain
(Initia-based, Celestia DA; early testnet a Caldera rollup). Built on a **MUD-derived**
engine. Testnet ~July 7 2024 (Delphi). Core stats (Health/Power/Violence/Harmony),
liquidation/farming PvP. Verified: fully on-chain, MUD-based, Yominet, Asphodel.
**Caveat (Report 1):** "fully open-source, no hidden knowledge" is only partially
verified — substantiate with the public repo/contract addresses + license and note any
off-chain indexer/UI dependencies.

**Asphodel whitepaper** (docs.asphodel.io/whitepaper) — the anchor for the *ungoverned,
autonomous world* framing (now our central novelty). Verbatim: "an immortal virtual
world"; "immortal because it lives on Ethereum… designed to run forever as a World
Computer"; "a living game that lasts forever… in ten thousand years"; **"renouncing
human ownership creates a true virtual world: a decentralized space in which humans _and
agents_ may act as they wish, bound only by the world's intrinsic ruleset"**; goal to
build "the most economically significant virtual economy in history." *Maturity caveat:*
currently team-incubated ("Our team… defines the mechanisms, rules, and lore"), with
intent to "hand them over to permanent decentralized governance" — i.e. autonomy is the
telos/trajectory, not a finished state. Frame accordingly.

**Token economy (grounds the "agents fund their own compute" loop):**
- **MUSU** — in-game harvested currency.
- **ONYX** — a **bToken (Baseline Markets) backed by an underlying ETH reserve** (has a
  BLV price floor); **DEX-traded on Initia** (ONYX/INIT); used for reroll / resurrect /
  rename / respec. → real, external, ETH-denominated value *today*.
- **Planned MUSU↔ONYX bridge** — "a bridge will be added to allow ONYX to exist as an
  item ingame, exchangeable with other players for MUSU." Closes the loop **MUSU → ONYX
  (ETH-backed) → ETH → compute**. *(Live vs. planned must be stated precisely in the
  paper.)* Sources: CoinGecko/GeckoTerminal (ONYX ETH-backed, Initia DEX); community
  wiki; play2moon (Asphodel $1.3M seed).
- **Founder provenance:** publicly articulated the self-funding-compute thesis on X
  (@0xTokedo, 2026-02-26) — agents plugging into a pure-web3 game, learning from
  open-source code, earning autonomously; "it's about the fact that it is already
  possible." Motivation/provenance, not a citation.

---

## Recommended core citations (~18 must-cite)

Vending-Bench (2502.15840) · Vending-Bench 2/Arena · Project Vend 1&2 · Voyager
(2305.16291) · Neural MMO Platform (2110.07594) · Project Sid (2411.00114) · Factorio LE
(2503.09617) · BALROG (2411.13543) · lmgame-Bench (2505.15146) · Generative Agents
(2304.03442) · Melting Pot 2.0 (2211.13746) · Concordia (2312.03664) · LifelongAgentBench
(2505.11942) · StreamBench (2406.08747) · METR time-horizon (2503.14499) · τ-bench
(2406.12045) · Foresight Arena (2605.00420) · CoffeeBench (2606.16613). Plus: MUD/Lattice +
0xPARC Autonomous Worlds; AlphaStar (Vinyals et al., Nature 2019) / OpenAI Five as
self-play motivation; lifelong-learning roadmap (2501.07278).

---

## How to use this file

- One bullet per work + a one-line "how we position against it."
- Section A = the differentiation table's rows in `kamigotchi-as-benchmark.md`.
- Sections B–G map onto related-work subsections.
- Before submission: one final pass to confirm every arXiv ID/claim; clear section H.
