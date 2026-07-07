# Working notes for paper.md

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
