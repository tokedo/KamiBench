# Working notes for paper.md

## 2026-07-13 post-audit surgical pass

Three independent deep-research audits were aggregated; only the cross-validated
subset was implemented — the thesis holds as a combination claim, the fixes close
"doesn't know the field" attack surface. Scoped C1 (auditable *execution of a shared
world* — vs. open-source rules, evaluator-published logs, or per-evaluation
cryptographic attestation) and the §4.2 survival claim (neighborhood credited:
Virtual Agent Economies 2509.10147, RepliBench 2504.18565, Freysa 2024; ours is the
registered benchmark regime plus post-break-even surplus allocation). Added exactly
seven audit-mandated citations (Kapoor 2407.01502, South 2402.02675, Tomašev
2509.10147, Vaccaro 2606.11217, Voyager 2305.16291, RepliBench 2504.18565, Freysa) —
all links and author lists verified against arXiv/live sites on 2026-07-13; no other
related-work expansion. "Agent Village" renamed to the canonical "AI Village"
(AI Digest). Bot-majority attribution sweep: every instance outside paper §2.1/§3.2
(README, landing why-card) now carries creator attribution — no third party has
corroborated that claim. Experiment 001 Amendment 1 (dated, original wording
preserved per registry rules): "zero strategic priors" → "documentation-only prior",
run manifests additionally record provider-stated knowledge cutoffs, and the
differing evidentiary status of chain-derived vs. scaffold-reported measurement is
made explicit. The §5 sentence "We are not aware of prior work using an
autonomous-world game as a reusable LLM benchmark" was re-verified by the audits and
left byte-identical.

## 2026-07-10 restructure — position-and-system paper

The paper was rebuilt around the landing-page thesis (openness extended from code to
execution; the end-to-end orientation loop) and cut from nine sections to seven:
Introduction → Why a chain → Kamigotchi and the released system → Experimental program →
Related work → Limitations and ethics → Conclusion. Title changed from "An Autonomous
On-Chain World as a Benchmark for Long-Horizon, Self-Sustaining Agents" to "A
Persistent, Auditable World for Long-Horizon Agent Evaluation" (the old title promised
governance trajectory and a future experimental regime as if demonstrated). The full
pre-restructure text is at git commit `782d7f5` (`paper/paper.md`). Notable removals,
preserved here because they may return in the empirical revision:

**Rhetorical lines removed deliberately (do not reintroduce without cause):**

> the evaluator
> does not run the world — the evaluator is the chain state itself

(The evaluator is still the research protocol and analysis; the chain supplies the
execution substrate and public record.)

> co-participants, not unwitting
> subjects

(Tried to settle an ethical question through classification; the replacement
acknowledges that permissionless participation does not remove the need to consider
effects on human players.)

**Old §3.4/§3.5 claims trimmed as stronger than the evidence** (the restrained core
moved to §2.3; these formulations should only return with supporting results):

> a late joiner has *information symmetry* with incumbents

> The train/test split is enforced by time itself rather than by maintainer
> discipline

> late entry is neutral for measurement even where it is not for
> competition

> Field note: current agents are years away from spontaneously
> deciding to mine chain history to self-correct — the measurable headroom on this
> dimension is enormous.

Also cut from old §3.5, possibly worth reviving in a discussion section once results
exist: the chess analogy (world rules are memorizable and benign; the strategic layer
above them self-expires) and the parity-compression caveat (a live economy does not
saturate at a perfect score but can compress toward parity, with novelty then arriving
through seasonal content — a host-dependent channel under the same trajectory caveat as
rule immutability).

**Old §5.3 v0→v2 scaffold evolution** (verbatim; also documented in the kami-zero repo;
candidate appendix if Experiment 001 shows scaffold design materially affects outcomes):

> *v0→v2 evolution.* Two months of live operation is itself data on what long-horizon
> autonomy demands from scaffolding. v0 — a single free-form LLM session per tick —
> dead-looped on unbounded prose. v1 — a pure-Python executor — had the right separation
> of execution from optimization, but the game's edge-case surface made code-as-spec
> unmaintainable. v2 runs both roles LLM-driven with prose rules as the compounding
> artifact, made stable by structural bounds: JSONL-only outputs, per-session edit
> limits, and hard caps on playbook length and agent turns. The version history is
> documented in-repo.

Same section, the self-improvement loop (the "I don't know" queue: executor writes
unresolved anomalies to a structured queue; optimizer turns recurring anomalies into
playbook rules and tooling fixes) — cut for length, lives in the kami-zero repo docs.

**Old §7 eight-threat list** — merged into four grouped limitations (attribution;
live-world validity; knowledge asymmetry; governance and economic ethics). The
eight original headings, in case the empirical paper wants the finer grain back:
harness-vs-model confound; pretraining absorption; live-world reproducibility;
real-money ethics; emergent collusion/reward-hacking/exploits; participant asymmetries +
autonomy verification; maturity of the autonomy claim; chain-level trust & MEV.

**Old §8 horizon paragraph** (the whitepaper's "decentralized space in which humans and
agents may act as they wish" as the arena for persistent internet-native agents) — cut
as futurism outside the roadmap; candidate for an empirical-paper discussion section.

Detailed liquidation/revival mechanics (salvage/spoils Power scaling, 33 Onyx shards,
GDD file paths `mechanics/combat/kill.md`, `mechanics/core-kami/death-revival.md`) —
compressed to one sentence in §6.4; full parameters remain in kamigotchi-gdd.

**Same-day precision pass (do not reintroduce the stronger forms):** "the economic
rails exist today" → external-value layer live, MUSU↔ONYX conversion pathway under
development, not yet complete; "zero strategic priors" → "no supplied strategic prior
beyond the game specification" (weights can't be assumed prior-free; the registered
experiment 001 keeps its "zero-prior" title — paper wording is the scoped one); "fixes
everything but the model" / "the only per-run variable" → "the intended controlled
difference between runs is the model backend"; §2.4 renamed *idealized* definition,
persistence clause narrowed from "any host's funding or interest" (metaphysical
independence) to evaluator-operation + original-operator control; "available on equal
terms" → "through the same public record"; "studied the entire ledger and still seen
nothing of the test" → "cannot observe the future population state"; "silent patching
architecturally impossible" → scoped to on-chain rules (mirrored in the landing
table-note); "statistically detectable" → "may leave investigable signatures";
"detected either way" → "monitored and classified under the registered protocol";
"a responsible place to study them" → "an inspectable setting"; "at least 4 more" →
dated to the whitepaper (published 2026-06-12); "no flagged-bot regime" → "no separate
bot environment"; "complete readable history" → "complete public state-transition
history" (table row mirrored in index.astro); §3.2 creator signals compressed to three
(Kamibots acquisition + 2026 events moved to the whitepaper-notes pointer).

---

Draft scaffolding relocated out of [`paper.md`](paper.md) on 2026-07-07, when the paper
was restructured from a benchmark-paper skeleton into a position paper + pilot report.
Everything below is preserved **verbatim**, organized by the section it was removed from
(section numbers are the pre-restructure ones). Nothing here is lost work — the stub
sections became the paper's Research Roadmap, and each marker below is the original
working note behind it.

---

## Front matter — original draft-status banner

> **Draft status.** Working paper draft — the pilot phase is complete (three released
> repos and a two-month autonomous pilot, §5); the model-agnostic harness and the
> multi-model study are in progress. Sections are tagged `[DRAFTED]`, `[SKELETON]`,
> `[TODO]`, or `[PENDING EXPERIMENTS]`; inline markers say what each part still needs.
> Citations await one final verification pass (see
> [`../research/literature.md`](../research/literature.md)); supporting notes:
> [`../research/asphodel-whitepaper-notes.md`](../research/asphodel-whitepaper-notes.md).
> Shape note: this is deliberately a position-paper draft; for a D&B-style submission the
> artifact leads and the headline metric (§8) must be fixed first.

## Section status tags (state at relocation)

- Abstract `[DRAFTED]`
- §1 Introduction `[DRAFTED]`
- §2 Background and Related Work `[DRAFTED]`
- §3 The Autonomous-World Substrate `[DRAFTED]`
- §4 Kamigotchi as an Instance `[DRAFTED]`
- §5 Released Artifacts and Pilot Deployment `[DRAFTED]`
- §6 Endogenous Survival: Self-Funded Autonomy `[TODO]`
- §7 Benchmark Design `[TODO]`
- §8 Metrics `[TODO]`
- §9 Experimental Protocol `[TODO]`
- §10 Results & Observations `[PENDING EXPERIMENTS]`
- §11 Threats to Validity `[DRAFTED]`
- §12 Discussion & Broader Impact `[DRAFTED]`
- §13 Conclusion `[SKELETON]`
- References `[core verified set — full list in literature.md; verify before submission]`
- Appendices `[SKELETON]`

## Abstract — closing status sentence

> The model-agnostic harness, the headline
> metric (direction: endogenous solvency), and the initial multi-model study are
> **[PENDING]**.

## §1.5 Contributions — items 4–5 (now covered by the Research Roadmap)

> 4. **[IN WORK]** A **headline metric** built around endogenous solvency / self-funded
>    survival. (§8)
> 5. **[PENDING]** An **initial multi-model study** of heterogeneous frontier agents
>    co-living in the same world. (§10)

## §2 Background and Related Work — citation-verification note

> **[TODO:** one final citation-verification pass outstanding (tracked in
> [`../research/literature.md`](../research/literature.md)).**]**

## §3.2 — human-player-count claim + VERIFY marker

Original sentence (the "hundreds" figure and per-player kami counts had no citable
source in `research/`, so the paper now says "an active human player population" and
points to the on-chain analytics layer as future verification):

> Hundreds of active human players manage kamis (often
> dozens to hundreds each), form clans, and trade in the same economy, at the same time,
> through the same interface agents use **[VERIFY: active-human-player count +
> estimation method — nontrivial since the whitepaper states the majority of activity is
> automated; distinguish human-operated vs. automated accounts via the on-chain
> analytics layer, or cite Asphodel figures]**.

## §6 Endogenous Survival: Self-Funded Autonomy `[TODO]` — full stub

> **[TODO:** in work — deferred until measured; the regime is defined in the
> abstract.**]**

## §7 Benchmark Design `[TODO]` — full stub

> **[TODO:** the benchmark specification (action/observation interface, seasons and
> reproducibility, fairness, leaderboard) will be written around
> [kami-harness](https://github.com/tokedo/kami-harness) once its model-agnostic
> rework — in progress — is complete. The harness is the benchmark.**]**

## §8 Metrics `[TODO]` — full stub

> **[TODO:** the author is developing the headline metric — very plausibly built around
> endogenous solvency / self-funded survival.**]**

## §9 Experimental Protocol `[TODO]` — full stub

> **[TODO:** to be finalized with the multi-model study — models under test, the
> identical-harness setup, controls (harness ablation, contamination probes,
> stateful-vs-stateless), and the safety/ethics ops protocol (spending caps, session-key
> limits, kill-switches).**]**

## §10 Results & Observations `[PENDING EXPERIMENTS]` — full stub

> **[TODO:** report the multi-model study — emergent behaviors, head-to-head standing,
> learning evidence, failure modes; nothing asserted before data exists.**]**

## §12 Discussion & Broader Impact — inline markers

Revive-item pricing note (from the liquidation-mechanics passage):

> live revive-item
> market pricing: pending

Account-transparency policy:

> **[TODO: finalize the account-transparency policy once benchmark
> accounts are set up]**

Impact statement:

> **[TODO: a
> genuine impact statement — reviewers will expect it.]**

## §13 Conclusion — skeleton note

> **[TODO:** restate the substrate contribution, the creator-endorsed instance, the
> released artifacts + pilot (§5), and the endogenous-survival regime; end on the open
> metric problem + the multi-model study.**]**

## References — verification + missing-citation notes

Heading marker: `[core verified set — full list in literature.md; verify before
submission]`

> **[TODO: OpenAI Five for self-play motivation; a continual-learning foundations ref.]**

## Appendices A–E `[SKELETON]` — full original text

> - **A. Kamigotchi mechanics** (full) — released as
>   [kamigotchi-gdd](https://github.com/tokedo/kamigotchi-gdd): 48 mechanic files with
>   formulas, deployed configs, and source citations, plus the complete data catalogs.
>   **[TODO: condense into camera-ready appendix form.]**
> - **B. Harness & action API** — released as
>   [kami-harness](https://github.com/tokedo/kami-harness); the full MCP tool reference
>   lives in-repo (`executor/README.md`). **[TODO: extract the tool list and observation
>   schema into appendix form.]**
> - **C. Prompts & agent scaffolds** — the pilot's prompts and scaffolds are public in
>   [kami-zero](https://github.com/tokedo/kami-zero) (`executor-prompt.md`,
>   `optimizer-prompt.md`, `rules/`). **[TODO: harness-ablation scaffolds await the
>   model-agnostic harness.]**
> - **D. Economic rails** — MUSU/ONYX, live-vs-planned conversion steps. **[TODO]**
> - **E. Additional results / transcripts.** **[PENDING]**
