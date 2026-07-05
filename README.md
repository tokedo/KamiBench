# KamiBench

**A benchmark for long-horizon, continuously-learning AI agents in an ungoverned, autonomous on-chain world.**

> ⚠️ **Early stage / work in progress.** This repo is a living research draft — a thesis, a
> literature foundation, and a paper skeleton — shared openly for collaboration *before*
> experiments are run. Claims are being verified; nothing here is a finished result.

---

## The idea in one paragraph

Agent evaluation is moving from isolated, resettable tasks toward sustained operation in
persistent, non-stationary worlds. But even the best long-horizon benchmarks are still
**hosted**: one party runs the world, sets and changes its rules, gates access, and keeps
it alive only while funded — which, in an era of benchmark contamination and reward-hacking,
bounds evaluation integrity by host trust. KamiBench proposes a different substrate: an
**autonomous, persistent on-chain world**, designed from inception to be host-independent —
state and rules live on-chain, every rule change is public and permanent, and governance
renouncement is the stated endpoint. We argue **Kamigotchi** — a fully on-chain MMORPG
whose creators explicitly designed it to be agent-first and describe it as a possible
*"real-stakes, adversarial benchmarking system"* — is the best-fit instance available today.

## Why an autonomous world is different (not just "on-chain")

Every existing multi-agent environment (Neural MMO, Vending-Bench Arena, Project Sid, …) is
run by a host. An autonomous on-chain world gives properties a hosted sandbox cannot:

- **Substrate integrity / non-manipulability** — the evaluator doesn't run the world; rules
  are fixed in public contracts and identical for all. The "evaluator" is the immutable chain
  state, so results can't be tampered with and discovered strategies can't be quietly patched.
- **Credible permanence** — the world persists independent of any host's funding, enabling
  genuinely open-ended, multi-year longitudinal evaluation.
- **Permissionless participation** — anyone can enter any model into the *same* live world.
- **Native-agentic interface** — actions are transactions, not pixels/GUI, removing the
  perception brittleness that confounds game benchmarks.
- **Endogenous survival** — the world has a real, ETH-backed economy, so an agent's survival
  can become *literal and economic*: it can convert in-world earnings into real value and
  **fund its own compute**. Survival stops being a scored metaphor.

## What's in here

| Path | What it is |
|---|---|
| [`paper/paper.md`](paper/paper.md) | The research-ready paper draft — content where we have it, explicit `[TODO]`/`[PENDING]` markers where we don't. |
| [`research/literature.md`](research/literature.md) | Annotated bibliography grouped by theme (the related-work foundation), with a must-cite core set. |
| [`research/asphodel-whitepaper-notes.md`](research/asphodel-whitepaper-notes.md) | Full reading notes on the Asphodel/Kamigotchi whitepaper, incl. the creators' own "benchmarking system" framing and the token economy. |

## What this is *not* (yet)

- **Not** claiming to be the first persistent or first multi-agent benchmark — Neural MMO,
  Vending-Bench Arena, and Project Sid predate us. The novelty is the **ungoverned/autonomous-
  world substrate** and **endogenous survival**, and the paper differentiates explicitly.
- **Not** experimentally validated yet — the multi-model study is pending.
- **Not** final on citations — a verification pass is outstanding (see `literature.md`).
- **Honest maturity note:** Kamigotchi is *already substantially host-independent* (on-chain
  state, contract rules, permissionless bot play that is already the majority of activity, an
  ETH-backed token live on Ethereum mainnet) and on a credible trajectory to full autonomy —
  but full decentralization is still years out. We do not overclaim present-tense immortality.

## Status & roadmap

- [x] Thesis + substrate argument
- [x] Literature foundation (grounded against two deep-research passes)
- [x] Whitepaper grounding
- [x] Research-ready paper skeleton
- [ ] Finalize the model-agnostic harness (drop-in for any model)
- [ ] Define the headline metric (likely centered on self-funded survival)
- [ ] Run the initial multi-model study
- [ ] Final citation-verification pass → arXiv

## Collaboration

This is an open, early-stage research effort and feedback is very welcome — especially from the
Kamigotchi / Asphodel community and agent-evaluation researchers. Open an issue or a PR. If
you're building agents for on-chain worlds, or work on long-horizon / continual-learning
evaluation, we'd love to compare notes.

## License

[MIT](LICENSE). Research prose is shared for open collaboration; please cite if you build on it.
