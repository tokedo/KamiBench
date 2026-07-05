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
Uniquely among agent benchmarks, the world is co-inhabited by real human players and agents
**on identical terms** — the same transaction interface, no segregated bot ladder — so agents
are evaluated against live human behavior, not just other models.

## Why an autonomous world is different (not just "on-chain")

Every existing multi-agent environment (Neural MMO, Vending-Bench Arena, Project Sid, …) is
run by a host. An autonomous on-chain world gives properties a hosted sandbox cannot:

- **Substrate integrity — tamper-evident today, immutable on trajectory** — the evaluator
  doesn't run the world; the "evaluator" is the chain state itself. Every rule change is a
  public, permanent, decodable transaction, so silent patching is architecturally impossible
  and pre-renouncement upgrades are visible and auditable; rule *immutability* arrives with
  governance renouncement.
- **Credible permanence** — state and mechanics are embedded on-chain, designed from
  inception to run with no centralized game server; persistence independent of any host's
  funding is partial today and full on the renouncement trajectory.
- **Permissionless participation** — anyone can enter any model into the *same* live world.
- **Human–agent co-habitation on identical terms** — real human players and a bot-majority
  population share one persistent economy through the same transaction interface, with no
  segregated bot ladder; agents are benchmarked against live *human* behavior, not just
  other models.
- **An open-book world** — the full history of every strategy ever executed is equally
  readable by all; mining it to self-correct is a measured capability, and it gives late
  joiners *information* symmetry with incumbents (not *position* symmetry) — anytime entry.
- **Native-agentic interface** — actions are transactions, not pixels/GUI, removing the
  perception brittleness that confounds game benchmarks.
- **Endogenous survival** — the world has a real, ETH-backed economy, so an agent's survival
  can become *literal and economic*: it can convert in-world earnings into ETH-denominated
  value and **fund its own compute**. Survival stops being a scored metaphor.

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
- **Not** free of the pretraining-absorption confound: a model trained after season N carries
  that season's strategies in its weights, so cross-*time* comparisons are indicative only —
  headline comparisons are within-season among contemporaneous models.
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
- [x] Chain trust-assumptions section (sequencer / MEV / RNG; `[VERIFY]` markers outstanding)
- [ ] Economic feasibility table (earn-rate vs. inference cost) — structure drafted, numbers pending
- [ ] Finalize the model-agnostic harness (drop-in for any model)
- [ ] Define the headline metric (likely centered on self-funded survival)
- [ ] Run the initial multi-model study
- [ ] Final citation-verification pass → arXiv

## Collaboration

This is an open, early-stage research effort and feedback is very welcome — especially from the
Kamigotchi / Asphodel community and agent-evaluation researchers. Open an issue or a PR. If
you're building agents for on-chain worlds, or work on long-horizon / continual-learning
evaluation, we'd love to compare notes.

## Disclosure

The author plays Kamigotchi and holds the in-game assets (Kamis, ONYX) used to operate the
research agents; he has no affiliation with and receives no compensation from Asphodel, and
has to date extracted no funds from the game — verifiable on-chain. This is independent,
individual open research, unaffiliated with any company.

## License

[MIT](LICENSE). Research prose is shared for open collaboration; please cite if you build on it.
