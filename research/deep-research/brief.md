# Deep-Research Brief — "Kamigotchi as a Benchmark for Long-Horizon, Continuously-Learning AI Agents"

> **Purpose.** This is a **self-contained** brief you can paste, whole, into any
> deep-research agent (Claude Fable 5 research mode, Gemini Deep Research, Felo
> Fable Research, OpenAI, Perplexity, etc.). It gives the agent (A) instructions,
> (B) the project vision, (C) our best-effort paper draft, (D) candidate references
> to verify/expand, and (E) the specific questions we most need answered. Run it in
> several tools in parallel; bring the outputs back to synthesize.
>
> **Safe to share.** Contains no secrets, keys, wallet addresses, account names, or
> infrastructure details — only the research idea.
>
> **How to use.** Copy everything from "PART A" to the end into the deep-research
> tool's prompt box. If the tool has a "sources / report" mode, enable it. Ask for
> real, linked citations.

---

## PART A — INSTRUCTIONS TO THE DEEP-RESEARCH AGENT (this is your task)

You are a research assistant helping prepare an **arXiv paper** that proposes a new
kind of AI-agent benchmark. Below (Parts B–C) is our current vision and a rough
paper draft; Part D is a list of references we *believe* are relevant but have **not
verified**; Part E lists the questions we most need answered.

**Your job:**
1. **Verify and correct** every claim and reference we make. Flag anything wrong,
   overstated, or already done by prior work. Do not repeat our unverified claims —
   check them.
2. **Do a thorough literature review** across the themes in Parts D and E. Find the
   *actual* closest prior work, with real, linked, citable sources (title, authors,
   year, venue, URL). Prefer primary sources (papers, official blog posts) over
   secondary coverage.
3. **Assess our novelty claim** honestly: is "a persistent, open-source, fully
   on-chain, natively-agentic, real-stakes, multi-agent, non-stationary benchmark
   where heterogeneous frontier agents co-live and compete" genuinely unoccupied?
   What existing work is closest, and exactly how does it fall short (or not)?
4. **Identify the key areas we must explore/address** before this is publishable —
   gaps in our argument, threats to validity, related work we're missing, and
   methodological weaknesses.
5. **Recommend positioning**: what venue/track, how to frame contributions, and what
   comparable recent benchmark papers we should model the paper after.

**Quality bar:** cite real sources with links; distinguish *verified* from
*speculative*; quantify where possible; call out where evidence is thin or
contested; prefer 2023–2026 work but include foundational older work where it
anchors a concept (continual learning, self-play, open-endedness).

**Deliverable format** — return, in this order:
- **(1) Executive summary** (≤300 words): does the thesis hold up? biggest risks?
- **(2) Annotated bibliography**, grouped by theme, each entry = citation + link +
  1–3 sentences on relevance and *how our work relates/differs*.
- **(3) "Closest prior work" ranked list** (top ~10) with an explicit
  how-we-differ note for each.
- **(4) Novelty assessment**: a claim-by-claim verdict on our differentiators
  (persistent / multi-agent-adversarial / native-agentic / fully-observable /
  open-source / permissionless / real-stakes / cross-agent-competition) — for each,
  is it defensible, and what prior work threatens it?
- **(5) Gap & risk map**: what we must address before publishing (missing related
  work, validity threats, ethical/reproducibility issues).
- **(6) Recommended core citations** (~15–25 "must-cite" papers).
- **(7) Methodology & metrics suggestions** drawn from how the literature evaluates
  long-horizon adaptation, continual learning, and multi-agent performance.
- **(8) Positioning & venue** recommendation.
- **(9) Open questions you couldn't resolve** and what evidence would settle them.

---

## PART B — PROJECT CONTEXT & VISION (self-contained)

### The core thesis
The field is shifting from **isolated, one-shot benchmarks** (solve a task once,
then reset) toward benchmarks that measure whether an agent can **operate, survive,
adapt, and continuously self-improve in a persistent environment over an unbounded
horizon**. We argue that **pure on-chain games — specifically Kamigotchi** — are a
uniquely suitable, possibly one-of-a-kind substrate for this new class of benchmark,
because they let **heterogeneous frontier agents co-live and compete in the same
persistent world at the same time**.

### What "this new class of benchmark" requires
1. **No reset / unbounded horizon** — the world doesn't end; the agent keeps going.
2. **Continuous learning is mandatory** — yesterday's optimal policy decays.
3. **Non-stationary because of other actors** — other agents/humans adapt against
   you; the optimum is a moving, adversarial target.
4. **Survival as a standing constraint** — the agent must keep itself alive/solvent
   as a precondition to score, not as a one-time objective.

### Why Kamigotchi (a pure on-chain MMORPG on the Yominet chain) fits
- **Persistent & open-ended** — runs continuously on-chain; no end state.
- **Non-stationary** — the future depends on what other players/agents do.
- **Fully observable history** — because all state and logic live in smart
  contracts, the entire past and current world state is available on-chain; every
  action ever taken is a permanent, decodable transaction. Perfect ground-truth
  logging and reproducible history.
- **The interface is already agentic** — to act, an agent only submits
  transactions. No screen-reading, no mouse, no UI parsing. The UI exists only for
  humans; the native interface is machine-native. (This removes the biggest source
  of brittleness in prior "AI plays a game" work.)
- **Open-source → no hidden knowledge** — all mechanics/equations/parameters are
  discoverable from public source code; performance differences reflect reasoning
  and adaptation, not secret game knowledge.
- **No centralized server** — mechanics are embedded at the contract level;
  permissionless entry; rules identical and verifiable for everyone.
- **Real stakes** — actions cost real gas and move real assets.

### The "one-of-a-kind playground" claim
Put together, this yields a single persistent world where **all top AI models could
compete simultaneously, co-living** — each other's opponents and neighbors, in the
*same* world (not sandboxed copies). Entry is permissionless; results are publicly
verifiable; a model-agnostic harness is all that's needed to drop any model in.

### Industry signal (the trajectory is already visible)
- **Vending-Bench** (Andon Labs) evaluates an LLM running a business over a long
  horizon — a real step toward persistent evaluation, but an **isolated, simulated
  sandbox** with **no cross-agent interaction**.
- The **follow-on** is LLMs running **real businesses**: e.g. **Andon Café**
  (Stockholm), where an agent ("Mona," reportedly on Google Gemini) hires and
  manages human baristas and inventory. This is closer to an open environment but is
  **operationally/financially expensive**, **requires humans in the loop**, and is
  still **single-agent**. This line descends from Anthropic's office
  vending-machine experiment ("Project Vend"). Andon has reportedly run such
  experiments with OpenAI, Anthropic, DeepMind, and xAI — i.e., an industry-wide
  push toward open environments.
- **Our framing:** the field is straining toward open environments over sandboxes;
  Kamigotchi offers those properties **cheaply, permissionlessly, fully
  autonomously, and with genuine cross-agent competition** — the open environment
  *without* the operational tax. *(Verify all Andon facts, figures, dates.)*

### What already exists (de-risks the proposal)
Without exposing operational specifics: we have built a **model-agnostic agent
harness** for Kamigotchi (self-contained game context + a tool/execution layer so
any model can be dropped in via a thin wrapper), a **complete machine-readable
extraction of the game's mechanics** from source, **reference agents already running
(both human-in-the-loop and fully autonomous)**, and an **on-chain analytics layer**
that ingests the full action history and can serve as the measurement/scoring
backbone. So the path from thesis → "run several frontier models in the same world
and observe" is short.

---

## PART C — WORKING PAPER DRAFT (our best current attempt; critique and improve it)

### Candidate titles
- "Kamigotchi as a Living Benchmark: Evaluating Long-Horizon, Continuously-Learning
  Agents in a Persistent On-Chain World"
- "Beyond the Sandbox: Permissionless, Fully-Observable On-Chain Worlds as Benchmarks
  for Co-Living AI Agents"
- "The Open Arena: Benchmarking Adaptation and Continuous Learning of Frontier Agents
  in a Shared On-Chain Economy"

### Abstract (draft)
Most agent benchmarks evaluate isolated, one-shot tasks that reset to a clean state,
poorly capturing the capability that matters for deployed agents: sustained
operation, adaptation, and continuous learning in a persistent, adversarial world.
Recent work (e.g., long-horizon business simulations and real-world business agents)
moves toward persistence but remains sandboxed, expensive, human-dependent, or
single-agent. We argue that **pure on-chain games** are a uniquely suitable
substrate for a new class of benchmark, and present **Kamigotchi**, a pure on-chain
MMORPG, as a concrete instance. It is persistent and open-ended; fully observable
(all state/history on-chain); natively agentic (actions are transactions, no UI);
open-source (no hidden knowledge); permissionless and decentralized (verifiable,
identical rules for all); real-stakes; and genuinely multi-agent — enabling
heterogeneous frontier models to **co-live and compete in the same world
simultaneously**. We propose a benchmark design and metrics for long-horizon value
compounding, survival/robustness, adaptation to non-stationarity, and continuous
learning, and [report initial observations from running multiple models in the same
world / outline an experimental protocol]. *(finalize once experiments exist.)*

### Contributions (draft)
1. Articulate the evaluation gap and the criteria for **persistent, continuous-
   learning, multi-agent** agent benchmarks.
2. Argue **pure on-chain games** as a uniquely suited substrate; give the property
   stack and contrast with sandboxes and real-world business agents.
3. Present **Kamigotchi** as a concrete, ready benchmark environment, with a
   model-agnostic harness.
4. Propose a **benchmark design + metric suite** for long-horizon adaptation and
   continuous learning in a shared adversarial economy.
5. *(if available)* Report **initial multi-model co-living observations** and
   emergent behaviors.

### Proposed metrics (draft — critique / extend from literature)
- Long-horizon value compounding (net worth / resource growth over weeks).
- Survival & robustness (uptime of a healthy, solvent operation; recovery from
  shocks).
- Adaptation to non-stationarity (detects & responds to population/meta shifts).
- Continuous learning (performance improves over time from the agent's own
  accumulated experience, controlling for its pretrained prior).
- Head-to-head standing (leaderboard vs. other agents and humans sharing the world).
- Strategic depth (task/quest completion, combat/market outcomes, multi-account
  orchestration).
- Efficiency (outcomes per token / per dollar of inference and gas).

### Related-work skeleton (to be filled by your review — see Parts D, E)
LLM agents in open-ended/embodied worlds · long-horizon operation & agentic
coherence · continual/lifelong learning · multi-agent, self-play, non-stationarity,
open-endedness · general LLM-agent benchmarks · on-chain/crypto-native agents (likely
a gap = our novelty).

### Methodology (draft)
Instantiate N frontier models behind the same model-agnostic harness; place them in
the same live world; measure via the on-chain action history (perfect logs). Compare
across models and against human players.

### Limitations / threats to validity (draft — help us expand)
Real-money stakes and ethics; reproducibility of a *live* non-stationary world (a
feature that complicates controlled comparison); possible collusion/coordination
among agents; single-game specificity vs. generality; gas costs and rate limits;
sensitivity to harness/tooling quality (is it measuring the model or the harness?);
contamination (open-source mechanics in pretraining data); operator/account
asymmetries.

---

## PART D — CANDIDATE REFERENCES (UNVERIFIED — verify, correct, and expand)

Treat all of these as *leads*, not facts. Confirm exact title/authors/year/venue and
whether each actually supports the point. Add the strongest works we're missing.

**Named as important by us:**
- *Voyager: An Open-Ended Embodied Agent with Large Language Models* — Minecraft;
  automatic curriculum; a growing skill library; lifelong learning. (~2023)
- *LMGAME-BENCH: How Good are LLMs at Playing Games?* — LLMs playing games benchmark.
  (get exact scope/metrics)

**Real-world / long-horizon business agents:**
- *Vending-Bench* (Andon Labs, ~2025) — long-horizon simulated business.
- *Andon Café* (Andon Labs) — real café run by an LLM agent; and Anthropic's
  *Project Vend* ("Claudius") vending-machine experiment. (verify facts/figures)

**LLM agents in open-ended / embodied game worlds:**
- *Generative Agents: Interactive Simulacra of Human Behavior* (~2023) — multi-agent
  "Smallville" sandbox; memory/planning; co-living (simulated, cooperative).
- *MineDojo* (~2022) — large-scale Minecraft benchmark + knowledge base.
- *SIMA* (DeepMind, ~2024) — instructable multi-world agent playing commercial games
  from pixels + language.
- *Cradle* (~2024) — general computer control / GUI game-playing.

**General LLM-agent benchmarks:**
- *AgentBench* (~2023) — multi-environment LLM-agent evaluation.
- Web/OS/tool-agent benchmarks: *WebArena*, *GAIA*, *ALFWorld*, *OSWorld* (survey for
  the "these reset; we don't" contrast).

**Foundational concepts to anchor:**
- Continual / lifelong learning; catastrophic forgetting.
- Open-endedness (e.g., *POET* / paired open-ended trailblazer; open-ended learning).
- Self-play milestones (AlphaGo / AlphaStar / OpenAI Five) as motivation.
- Learning in non-stationary / adversarial multi-agent settings.

**Deep-research-agent methodology (relevant to how we run this very process):**
- *DeepResearch Bench*; work on *search-time contamination in deep-research agents*
  (be alert to contamination when verifying our own claims).

**On-chain / crypto-native agents (search hard — likely thin = our novelty):**
- Any serious academic or industrial work on autonomous LLM agents operating in
  fully on-chain worlds / DeFi / on-chain economies. Characterize the gap honestly.

---

## PART E — KEY RESEARCH QUESTIONS TO EXPLORE (prioritized — what we most need)

1. **Persistent / continual-operation benchmarks:** What benchmarks evaluate agents
   over *unbounded, non-resetting* horizons? How do they handle the absence of a
   reset? Which is the closest prior art to our thesis, and how does it fall short?
2. **Multi-agent, co-inhabited, adversarial environments:** What benchmarks put
   *multiple, heterogeneous* agents in the *same* environment competing against each
   other (not self-play copies, not scripted opponents)? How is performance measured
   there?
3. **On-chain / crypto-native agents:** Is there serious research on autonomous
   agents in fully on-chain worlds? If it's thin, that supports our novelty — but
   confirm rigorously and cite whatever exists.
4. **Real-world business agents (Andon Café / Project Vend):** Verify the facts —
   which models, what the agent controls, costs, results, human-in-the-loop extent,
   dates. What do these experiments claim to measure, and what are their documented
   limitations?
5. **Lifelong learning & skill acquisition (Voyager-style):** State of the art in
   agents that *accumulate* skills/knowledge over time. How is "it keeps learning"
   measured?
6. **Game-playing LLM benchmarks (LMGAME-BENCH & peers):** How do they measure
   game-playing ability? What do they *not* capture that a persistent, multi-agent
   world would?
7. **Metrics for long-horizon adaptation & continuous learning:** How has the field
   quantified adaptation to non-stationarity and continual improvement? What metrics
   should we adopt?
8. **Open-endedness & non-stationarity theory:** What frameworks (open-ended
   learning, POET-style, coevolution) should we cite to ground our claims?
9. **Evaluation integrity / desiderata:** Is *full observability / open-source /
   permissionlessness / verifiability* recognized as desirable in benchmark design?
   Conversely, does open-source-mechanics-in-pretraining create a contamination
   problem for us, and how do others mitigate it?
10. **Positioning & venue:** Where do benchmark/environment papers like this land
    (e.g., NeurIPS Datasets & Benchmarks, ICLR, workshops)? What are 3–5 recent
    comparable papers we should model our structure and framing after?

---

## PART F — AFTER YOU RUN THIS

*(Note to ourselves, not the deep-research agent.)* Collect each tool's report, then
bring them back to synthesize: reconcile overlapping findings, keep the strongest
verified citations, fold confirmed related work into `literature.md`, update the
novelty table and claims in `kamigotchi-as-benchmark.md`, and log which of our
differentiators survived scrutiny.
