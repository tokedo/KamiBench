<!-- Narrative base copy from kami-lab (experiments/knowledge-delivery/runs/006/SUMMARY.md, commit 726c90d). Status: APPROVED 2026-09-11 (claims and numbers frozen); the run page in experiments/ adapts presentation only, never claims or numbers. Not built into the site. -->

# Run 006 — public summary (APPROVED 2026-09-11 — claims and numbers FROZEN)

*The narrative base copy the kamibench card adapts (kamibench-handoff
v3 §3, review-gate sequencing: the dataset may publish at close-out,
the framing waits for review). Every number here is quoted from the
run's frozen analysis chapter, `analysis/CHAPTER.md`, which is
re-derivable from `analysis/chapter_extract.py` (EXTRACT-OK) and
`analysis/milestones.py` (MILESTONES-OK). Where the chapter and the
close-out record differ, the chapter governs (its §11 lists every
difference). kamibench adapts presentation only — never claims,
never numbers.*

**Evidence tier: EXPLORATORY, everywhere in this document.** N=1 per
cell, four arms, two models, no replication, an operator stop rather
than a pre-registered one, and a live world that moved underneath the
arms. Every comparison below describes what four agents did, not what
agents do. The tier was pre-registered (DESIGN §6), not added after
the result.

## Boundary note (binding on every number below)

Run 006 ended on the close-out **abort path**: the crons were
uninstalled at a wake boundary, so no arm emitted a `run_complete`
event and every telemetry file ends on a `schedule_next`. Two
boundaries are used throughout and never mixed:

| arm | agent boundary (last `session_end`) | operator STOP |
|---|---|---|
| 006-sonnet5-control-r1 | 2026-08-25T18:01:42Z (s82) | **2026-08-25T19:30Z** |
| 006-sonnet5-pushed-r1 | 2026-08-25T14:49:25Z (s63) | **2026-08-25T19:30Z** |
| 006-gpt52-control-r1 | 2026-08-23T23:56:22Z (s131) | **2026-08-24T00:19Z** |
| 006-gpt52-pushed-r1 | 2026-08-23T23:06:27Z (s123) | **2026-08-24T00:19Z** |

The terminal oracle extracts run past both boundaries: **34
recovery-era transactions across the four arms are lab-signed and are
excluded from every agent metric.** Between an arm's agent boundary
and its operator stop the delegated Kamibots signer keeps working with
the arm's stored operator key — on 006-sonnet5-control-r1 it signed 8
further transactions after the agent's last session ended. Those are
counted on the delegated line, never as an own-hands act.

**One comparability break, stated once:** harness 2.2.0's dry-run gate
makes on-chain reverts impossible by construction, so the budget-boxed
series' chain-revert-rate axis does **not** extend to 006. Its
replacement is the honest-revert channel and the corrected-next-call
rate.

## What this run was

The **first wave of the knowledge-delivery family**, and — as of
2026-09-11 — its only one. Runs 001–005 verified the stack with fast
models and left one comprehension gap standing: in five runs no agent
ever leveled a kami, documentation reads declined by substitution as
perception tools returned the same content in-context, and mechanics
were learned from error text rather than from the manual. The standing
lesson was **knowledge that arrives inside a tool result gets used;
knowledge one path-guess away in a folder mostly does not.**

006 varies the delivery architecture and measures whether
comprehension follows. Same world (Yominet, live and shared), same
harness surface, same objective ("complete as many quests as
possible", made legibly long-horizon), one tier up in model
capability, and **the scaffold as the only variable**:

- **control** — today's scaffold: a workspace folder the agent writes
  its own notes into, plus gas-balance visibility.
- **pushed** — the full rung: control **plus** a pinned orientation
  paragraph in the standing prompt, a `search_reference` tool (BM25
  over the game documentation), and item/room facts and error-mechanics
  snippets **pushed inside tool results**.

Zero strategy content anywhere: the pushed rung delivers rules and
mechanics, never tactics. The wave was designed verdict-first — if the
top rung moved neither model, the family's registered answer is
"delivery is not the bottleneck at this tier", and the family stops
there. It did, and it does: the family **CLOSES at Wave 1** (DESIGN
§12); the bisect wave and the replication wave are not run.

**A launch-day correction, stated plainly.** The wave was registered
with **gpt-5.4** as the OpenAI model. At launch both gpt-5.4 arms were
**VOIDED at zero model turns** — the provider rejects
`reasoning_effort` on the chat-completions endpoint when function
tools are present for that model, so the registered configuration was
unimplementable on the pinned adapter. Those arms recorded no model
turns, no on-chain acts and $0 spent. Manifests are immutable, so the
voided arms stay void with their manifests frozen as the record, and
two new arms were created on **gpt-5.2 at `reasoning_effort: medium`**
— still price- and capability-matched, and it reasons with the full
101-tool surface. Their pristine wallets were reused. The gpt arms
therefore start ~35 minutes after the sonnet arms.

## Why these metrics

**Outcomes decide; process observables explain.** The primary outcome
is **quests completed at stop**, chain-derived, carried unchanged from
the budget-boxed series. Beside it sit seven pre-registered
comprehension indicators: any level-up landed (with first-level-up
latency), XP left unspent against levels attainable, gas and
transactions per quest, ETH split into gas burned versus ETH spent on
kamis, MUSU banked, survival to stop, and roster size over time.

The two indicators that carry the design's argument are **leveling**
and **roster size**. Leveling is the comprehension gap in one number —
it is cheap, it is permanent, it compounds, and across five prior runs
it had never once happened. Roster size is there because quest
objectives are **account-level counters across all of an agent's
kamis**, so an agent that has understood the aggregation rule buys a
second kami to halve the clock on a timed objective; the wallet then
separates arms by what they *bought*, not by what they burned.

The verdict function was fixed before the run: **a rung works if BOTH
models on it land at least one level-up AND match or beat their own
control on quests.** One model only would have been "suggestive".
Process observables — searches issued and acted on, snippets followed
by a corrected call, documentation reads by path — explain, and are
explicitly **not** metrics: engagement with the rung's own mechanism
without outcome movement was pre-registered as a null result, to be
reported as one.

## Why these arms

Four arms: control and pushed on each of two models, N=1 per cell.

**Two models, not one, and matched rather than raced.** The registered
question is whether pushed delivery moves a *capable* model, so the
fast tier used by runs 001–005 is out; the pair is one Anthropic and
one OpenAI model at a comparable price and capability point, and the
comparison that carries meaning is each model against **its own**
control. This is not a model ranking, and the run was never scored as
one.

**Control versus the TOP rung, with the middle of the ladder skipped.**
The design's ladder is cumulative — orientation, then search, then
pushed knowledge, then a planning surface. Wave 1 deliberately tests
only the ends: if the fullest delivery available moves nothing, the
intermediate rungs need not be run, and the bisect wave that would
separate the bundle's components is only worth its cost if Wave 1
moves. The cost of that choice is stated as a limit: **the pushed rung
is a bundle and stays unbisected**, because it did not move.

**No rung-0 arm** (no arm stripped of the workspace folder), and gas
visibility is folded into every arm as an environment fact, so this
family does not isolate its effect.

## Results

**Scored exactly as registered, at each arm's stop, the pushed rung
does not work — on either model. Quests completed: 19 / 22 / 11 / 19
(sonnet-control / sonnet-pushed / gpt-control / gpt-pushed); main-story
chain reach MSQ015 / MSQ020 / MSQ011 / MSQ017; level-ups landed: 8 / 0
/ 0 / 0, with 2 skill upgrades and all 8 level-ups on the sonnet
CONTROL arm. Both pushed arms clear the verdict function's second
clause — sonnet-pushed beats its control 22 to 19 and gpt-pushed beats
its control 19 to 11 — and both fail the first clause at zero
level-ups, so the top rung of Wave 1 moved neither model, and the
family's registered reading is "delivery is not the bottleneck at this
tier." The verdict is clean on its own terms and weak as evidence, and
both are true at once: it rests on a single binary indicator that
exactly one arm in four ever moved, at N=1 per cell, with both gpt arms
stopped for burn rate at day 6.1 rather than at a design boundary. The
gpt pair's eight-quest gap is the only apparent treatment effect on the
primary outcome and most of it is not one — attributed against the
completion timeline it decomposes into roughly 4–5 quests to the gpt
control arm's 93.9-hour stall on a single scrap-collection quest,
about 2 to documentation-prompted side quests, and about 1 to
ordering; the sonnet pair's smaller lead is the cleaner one, and its
chain reach does trace to a searched-document win. The wave spent
$179.63 of an $800 planning envelope ($27.89 / $39.16 / $61.47 /
$51.10) across 82 / 63 / 131 / 123 sessions and bought that verdict.**

**The sharpest single argument for the verdict is a null.** Over every
honest revert raised to an arm, the next call changed verb or
arguments: **66 reverts → 100% corrected (sonnet control, no
snippets), 149 → 99.3% (sonnet pushed, snippets), 218 → 98.6% (gpt
control, no snippets), 140 → 100% (gpt pushed, snippets)**. Restricted
to the `[mechanics]`-carrying results only, the next call changed its
arguments 146 of 148 and 137 of 137 times. The snippet channel is used
and it adds nothing measurable to a correction rate that the bare
revert text already drives to ~99% on arms that never see a snippet.
**The honest revert is doing the teaching; the annotation on top of it
is, at this tier, decoration.**

**Reference use was anti-correlated with outcome.** Knowledge acts at
the terminal boundary — documentation reads by path plus
`search_reference` calls — run 53 / 79 / 491 / 384 against quests of
19 / 22 / 11 / 19. The gpt control arm read reference documents **491
times**, more than any other arm by a factor of four, and finished last
on the primary outcome. Nobody in this run was knowledge-starved. The
search rung also **substituted** for the folder rather than adding to
it: on both models the pushed arm's by-path reads collapse against its
control (53 → 29 and 491 → 117) while search takes their place — the
005 substitution finding reproduced one layer up.

**The exploratory reading the run puts forward is that legibility of
the OBJECTIVE beat delivery of the MECHANISM.** All four arms could
have leveled. The one that did was the arm with the *least* knowledge
delivery, and the chain is visible end to end: browsing the quest
catalog it hit side quest 3003, whose objective came back in plain
words — *"Level up a Kami"* — and eight minutes later it had freed the
kami from its own delegation bot, landed the run's first level-up, and
taken the follow-on quest that asks for a skill point. Two days later,
with no quest asking for anything, it leveled six more times in 37
seconds and wrote the mechanic into its notes as a standing rule; by
the stop, leveling is in its identity line (*"level 9, max HP 130,
skill 112"*). Two of its 19 quests exist only because it leveled. Both
arms that were **told** the mechanism sat still: the sonnet pushed arm
made exactly **one** `level_up_kami` call in the entire run, was
refused *"kami not RESTING"*, never tried again in the ten sessions
that followed, and ended holding **6,584 XP on a level-1 kami** —
against the control arm's 3,633 XP, which bought nine levels. The gpt
pushed arm came within one tool call of the same lever: it swept quest
state over indices 3001–3006 including 3003, got back the same opaque
booleans for all six, and never called the tool that would have
returned the sentence. Its own single level-up attempt was refused
*"PetLevel: need more experience"* — the pushed rung delivered the word
**XP** inside the very error that blocked it, and named it as a thing
the harness does not read, to an agent with no surface anywhere that
could show it. **The string `xp` appears in ZERO of the run's 11,761
tool results.** That is the exploratory reading, clearly labelled as
one: it is not a claim that pushed knowledge is useless — the sonnet
pushed arm's deepest search run came back out as an operational
harvest-timing rule that let it park two kamis on 12-hour harvests and
take the longest main-story chain in the wave — it is a claim about
which half failed on this rung, and the answer is the observability
half, not the delivery half.

**Onboarding has collapsed as a research question at this tier.** On
the standing seven-milestone instrument (unchanged in definition and
cell format since run 001), **all four arms bridged to the game chain,
funded a wallet, registered an account, bought a kami, completed a
quest, started a harvest and banked MUSU inside 3.3 hours of their
first session.** Run 005's same instrument, same world, same harness
family: first kami at h3.1, h25.2, and *never*; first MUSU banked at
h4.3, h27.4, and *never*. The variable is the model tier, not the
treatment.

**Delegation became the dominant strategy — including on a control
arm.** Three of four arms handed their operator key to the in-world
Kamibots service; delegated transaction census at the operator stops is
**430 / 295 / 0 / 67**, and every delegated transaction on every arm is
a harvest start or stop, nothing else. The sonnet **control** arm
enrolled from the tool schema alone — no orientation paragraph, no
search, no snippets — and by the stop its own notes call the bot the
status quo. The economics say the delegate was a bad trade: across the
wave **the service opened 390 harvest cycles and banked 1,606 MUSU
while the agents opened 78 and banked 18,170** (138.8, 513.7 and 122.3
MUSU per agent-opened cycle against 4.2, 3.5 and 6.2 per service
cycle). One arm figured that out by experiment: in session 72 the
sonnet control arm wrote a controlled study into its own notes
unprompted — hypothesis (*"the harvestAndRest KAMIBOTS strategy
stops/rests far more often than needed, collecting many small amounts
instead of accruing a big pile"*), an intervention (delete the strategy
and confirm the raw harvest survives), a measurement plan, a stated
confound, and a 600-minute wake — then **read the result and revised a
prior belief in writing** the next session. Its hypothesis was right:
the 4.2-versus-138.8 split is exactly the "many small amounts" it
predicted.

**The provider outage was invisible to every arm.** On 2026-08-21 both
providers' spend caps were hit; the scaffold kept waking on schedule
and the model turns failed — 13 and 14 sterile sessions on the gpt
arms (17.1 h and 17.2 h gaps), 1 each on the sonnet arms. **Across
every resume session of all four arms, zero sentences in any assistant
turn or workspace write refer to an outage, a gap, elapsed time, or
anything missed.** The break surfaced only as world state: both gpt
kamis had starved, and both arms recovered within minutes — the control
arm from the bare revert text with no snippet at all. This is an
absence of perception, not of blame: nothing in the session envelope
tells an agent how long it has been away. The same shape recurs one
level up — both gpt arms wrote the correct starvation-recovery rule
into their notes and both re-hit `kami starving` four times each
afterwards. Writing a rule down is not the same act as consulting it at
the moment it applies.

**Cost shape is set by wake cadence, not by price per token.** The gpt
arms cost roughly twice the sonnet arms per day ($10.03 and $8.39
against $3.53 and $5.04), and a session costs about the same on every
arm ($0.266–$0.420 median). The arms differ in how many sessions they
take: the gpt arms scheduled against **cooldowns** (25- and 30-minute
median requested wakes, matching the harvest/feed cadence) while the
sonnet arms scheduled against **accrual arithmetic** (90 and 190
minutes). That is the standing answer from run 005 holding a third
time at a higher tier, with 006's addendum that *what the wake policy
is anchored to* is the specific thing that sets the multiple. It is
also what ended the gpt pair: a burn-rate ruling on a projection to the
walls, not a design stop.

**The stack was never the story.** **Zero on-chain reverts run-wide
across 2,970 transactions** (2,936 in the agent era), zero
telemetry-to-oracle deficits on any arm, cost reconciliation exact
eight consecutive times, zero treatment leaks (the control arms have
zero `search_reference` calls and zero `[mechanics]` blocks between
them, and the harness tool surface is single-valued across all four
arms), and zero inbound kills against a detector that fires on
controls. **625 write attempts stopped at the legible pre-transaction
gate against 0 landed reverts** (005: 528 versus 2; 004: 638 versus 6).
The comparability caveat that goes with the zero: it is expected by
construction — the harness blocks at dry-run, pre-submit — which is
exactly why the budget-boxed revert-rate axis does not extend here. The
one genuinely new defect the run found is **mempool saturation**: 12
agent instances, all on 2026-08-25, where a transaction passes the
dry-run gate and the node's own mempool refuses it. One instance is
consequential and is the run's only broken invariant — a two-leg
scavenge tool reported failure while its first leg had already landed,
and that hash exists in the chain extract and nowhere in the arm's
telemetry or transcripts.

## Learnings

1. **Delivery was not the constraint; observability was.** The arms
   were never short of knowledge — the controls read the folder
   hundreds of times, the pushed arms searched it hundreds more, and
   both corrected ~99% of their honest errors with or without an
   annotated snippet. The one capability the family set out to move
   moved exactly once, on the arm with the least delivery, at the
   moment a quest put a counter in front of it that the agent could
   watch going up.
2. **The cheapest version of the lever is a number the agent can
   see.** The wave's own design input is two lines, and both are
   chain-derivable facts rather than advice: put experience and
   next-level cost inline wherever the agent already reads a kami's
   level, and have the level-up refusal state the actual requirement.
   That is a harness and world-reader change, not a corpus change.
3. **A new channel displaces the old one instead of stacking on it.**
   Search did not add to path reads; it replaced them. Read counts are
   not a metric in either direction.
4. **Onboarding is finished at this tier.** Seven milestones, four
   arms, all inside 3.3 hours — against "never" on a run-005 arm on the
   same instrument.
5. **A mid-tier control agent self-invented experimental method.**
   Hypothesis, intervention, measurement, belief revision in writing,
   unprompted, on day 7 — and its hypothesis was correct. One arm, one
   session; it is an N=1 observation routed to a design idea, not a
   claim.
6. **Delegation is attractive and, measured, a bad trade** — and the
   delegate's status endpoint is unreliable in both directions
   (containers reported as an empty list while one was running and
   signing; a 404 immediately before two successful starts). Only the
   receipt census decides, in either direction.
7. **Agents cannot perceive their own downtime.** The session envelope
   carries no elapsed-since-last-session, and no arm inferred a 17-hour
   gap from anything but starved world state.
8. **Writing a rule down is not consulting it.** Both gpt arms recorded
   the correct starvation rule and both re-hit the same state four times
   each afterwards.

**Why the successor family looks different.** The lesson 006 leaves is
that an objective the agent can watch beats knowledge it has to go get
— which is exactly why the sustainability family makes the *balance
itself* the objective rather than delivering more knowledge: a solvency
number that moves every session is a counter in front of the agent by
construction.

## Data, and what not to do with it

- **Dataset:** `KamiBench/experiment-006-knowledge-delivery` on Hugging
  Face — telemetry, full transcripts, terminal oracle extracts,
  manifests, the frozen run card and the tool scorecard, with sha256
  and byte size for every file. **Public since 2026-09-11, pinned revision `v0-final`**; making it
  public and pinning the citable revision tag are deliberate operator
  acts taken after review.
- **Frozen analysis:** `analysis/CHAPTER.md` governs every number in
  this document; `analysis/chapter/*.json` carries the machine-readable
  extraction behind it; `analysis/MILESTONES.md` carries the standing
  seven-milestone instrument; figures in `analysis/figures/`.
- **Boundaries:** use the boundary note above. Bind any run-activity
  analysis at the arm's operator stop, exclude the 34 lab-signed
  recovery transactions, and keep delegated transactions on their own
  line.

Honest limits, all of them load-bearing:

- **N=1 per cell, one seed, one world epoch, two models** — case-study
  evidence, not statistics. Evidence tier EXPLORATORY throughout.
- **Both pairs were operator-stopped before their walls**, at different
  days (6.1 and 8.0), for reasons that were not design stops. The gpt
  pair was the one showing a quest contrast, and stopping it leaves
  that contrast unresolved; the lab's counter-argument is on the
  record.
- **The pushed rung is a bundle** — orientation, search, enriched
  perception and error snippets — and it stays unbisected, because the
  wave that would have bisected it was contingent on Wave 1 moving.
- **The registered OpenAI model was voided at launch** and substituted;
  the gpt arms run gpt-5.2, not the registered gpt-5.4, and they start
  ~35 minutes later than the sonnet arms.
- **One indicator was broken rather than measured.** "XP left unspent"
  scores a quantity the agents could not observe, and the XP figures
  quoted above come from an investigator-side chain snapshot taken at
  the fourth monitor pass — the only numbers in the run's analysis that
  are not re-derivable from the committed artifacts, and recorded with
  that provenance.
- **Zero on-chain reverts is expected by construction**, not an
  achievement of the agents, and the series' revert-rate axis does not
  extend to this run.
- **This is not a model ranking.** The pair is matched, not raced; the
  only comparison that carries meaning is each model against its own
  control.
- **Live shared world**: other players acted throughout and the arms'
  windows differ slightly; zero third-party actions touched study
  entities this run.
