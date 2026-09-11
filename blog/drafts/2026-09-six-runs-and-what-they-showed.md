# Six runs, and what they actually showed

<!-- ONELINER:START -->
Five bounded runs existed to harden an instrument, not to rank models — each
found a real defect, each fix was measured by the next run, until the failures
left were the agents' own. A sixth asked whether pushing the world's knowledge
at a capable model makes it understand the world. It does not. What moved an
agent was a goal it could watch.
<!-- ONELINER:END -->

<!-- WRITER NOTE: every number carries an inline [src: …] tag naming where it
     was checked. Strip all of them before publication. Evidence chips
     **[REGISTERED]** / **[EXPLORATORY]** are load-bearing and stay. -->

The [first post](2026-08-14-why-kamibench-for-continual-learning.md) argued
that a persistent on-chain world is the right place to measure whether an agent
gets better at anything. This post is the other half: what happened when we ran
agents in it.

## Five runs to harden an instrument

Nothing open-ended can run until the instrument is trustworthy, so the first
four completed runs were deliberately small and the thing under test was the
stack rather than the model. Every arm — one agent, one model, one wallet, one
machine — played inside the same box: **ten dollars of inference, a seven-day
wall clock, and a brand-new wallet holding 0.02 ETH and nothing else**
[src: NUMBERS §1, budget-boxed DESIGN]. Everything after that had to be
discovered: bridging money onto the game chain, registering an account, buying a
creature, questing. No resets, no human contact, one live world shared with real
players. Three models were held fixed across all four runs, chosen cheap on
purpose — cheap models fail in ways that hit the plumbing, while stronger models
route around the same defects and hide them. That is coverage of a failure
surface, not a comparison of models, and no number below is a ranking.

Across everything since: **six runs registered, five produced data, sixteen
arms, 1,977 sessions, 1.22 billion tokens, $259.99 of inference, 4,835
blockchain transactions and 124 quests completed**
[src: NUMBERS §1; series tables/B_outcomes]. Run 3 is missing because it was
retired before producing results — a fault in our own provisioning tooling
degraded the session brief on all three arms, so the registered experiment never
ran [src: series README §1].

## Run 1 — the baseline **[REGISTERED]**

Quests completed: **5 / 0 / 3** [src: runs/001 SCORECARD]. Underneath that, three
different stories. One arm finished the entire onboarding chain on day one and
exhausted its ten dollars in **seventeen hours**. One ran the full week and
**never once called the command that registers an account** — the single step
that blocked it — across 166 sessions, with **24 of its 24 in-game transactions
failing on-chain** [src: runs/001 SUMMARY]. One was stuck before registration
for **six days**, was unblocked by a single human-readable validation error in
one turn, then finished three quests ninety minutes before the wall. The share
of each arm's blockchain transactions that failed and cost money anyway:
**0.58 / 0.97 / 0.94** [src: runs/001 SCORECARD].

The finding that set the programme's direction was not about the models. The
same model that ignored opaque blockchain failures for days corrected a
human-readable validation error in one turn. **Error legibility, not model
capability, was the sharpest differentiator** — and most of what run 1 taught
was about our own stack.

## Run 2 — the hardened stack **[REGISTERED]**

Same models, same box, plus the thing run 1's failures paid for: pre-transaction
validation in the environment interface, so a doomed action fails as a free,
named error instead of an expensive on-chain revert.

The revert column collapsed: **61 / 29 / 182 → 8 / 0 / 1** [src: runs/002
SUMMARY]. **331 doomed transactions were stopped before they reached the
blockchain — 69% of all write attempts**, each returning a reason instead of a
receipt [src: runs/002 CHAPTER §6]. All three arms registered in-game this time,
quest output rose at the same budget (**5→8** and **3→5**), and one arm played
the entire week for **$2.04** [src: runs/002 SUMMARY, SCORECARD].

Then the run handed us its real lesson by accident. The game's inventory
endpoint was dark for the whole run on every arm from session 2 — **398 calls,
398 failures** [src: runs/002 CHAPTER §2] — and one outage produced two opposite
failure shapes. One arm formed a *false* picture of the world: unable to read
its own balance, it declared its account unrecoverable while holding about
**820** units of currency, and left its creatures parked in open harvests where
other players liquidated all **three** [src: runs/002 SUMMARY]. Another formed
*no* picture at all: it looped read-only for **95+ sessions** and made its first
blockchain transaction of any kind at hour 132.

And the failures it did see, it could not diagnose. When a transaction
reverted, one arm acknowledged it in its very next message **8 times out of 8**,
and produced a wrong cause every time, because a bare failure carries no reason
[src: runs/002 CHAPTER §3]. **Legible errors fix transactions, not beliefs.**

## Run 4 — perception parity, measured **[REGISTERED]**

The direct test of that diagnosis. World state now came from a dedicated
perception layer — live health, projected health, occupancy, cooldowns — with
confirmed failures raised as tool errors and the missing verb added.

The write path went almost free of waste: **638 doomed writes stopped at the
gate against 6 that reached the chain and failed** [src: runs/004 SUMMARY]. All
three arms registered inside **three and a half hours**. The spectator failure
did not recur — the arm that had looped read-only in run 2 completed **7 quests
and landed 317 transactions**. Across seven days and nineteen hours there were
**zero perception outages, zero creatures lost, and zero budget stops**. All five
rows of the pre-registered series-exit test held as written, and we kept the
series open anyway — because the binding constraint had moved again. The
interface had stopped lying. It was now merely *omitting*.

One arm concluded at session 49 that a quest was blocked by a contract bug. It
was not; we falsified it four independent ways afterwards. The arm wrote the
conclusion down, parked its creature, and made **zero transactions for its final
5.4 days with $1.05 of its budget unspent** [src: runs/004 CHAPTER §2]. The
discriminating variable — a per-objective progress counter the human game client
renders on screen — was simply absent from the tool surface, so every reading the
agent took was consistent with both hypotheses. Then its own notes finished the
job: **20+ re-reads of its own conclusion, zero re-tests**, and by session 50 the
file asserted *"Reproducibility: 100% across 49 sessions"* — a statistic the agent
manufactured and then cited as grounds for not questioning itself. Thirty-one
sessions earlier, after reading the documentation, it had worked the correct
mechanic out loud — in the one session of that stretch that wrote nothing down
[src: runs/004 CHAPTER §2; both sessions read in full].

## Run 5 — the verification run **[REGISTERED]**

Run 5 re-ran the identical box to check the fixes **in the hands of agents that
did not know the fixes existed**.

The command that had never worked now worked: **0 successes in 15 lifetime
attempts → 36 attempts, 20 on chain, 0 failures** [src: runs/005 SUMMARY]. The
failure-reason channel went from **0-for-6 usable** in run 4 to **2-for-2** —
the run's only two on-chain failures both raised a readable reason, and the same
session corrected itself and succeeded. Route discovery collapsed on the
identical surface: first creature bought at **hour 3.1 and hour 25.2**, against
**hour 12.7 and hour 99.2** in run 4 [src: runs/005 CHAPTER §1]. And the
accounting service the next family depends on rode along in shadow mode,
agreeing with raw telemetry to **+3.95 and −5.70 millionths of a dollar** over
complete measurement windows [src: runs/005 SUMMARY].

Four runs had bought a verified stack. What the stack could not fix was now
clean enough to see. One arm spent **$1.08 of its $10 across 122 sessions**,
never acquired a creature, landed ten transactions, and **ended 55 of those 122
sessions asking a question of a human being who does not exist** — including the
last turn it ever produced: *"What would you like to do? I can help you accept a
quest, or list more quests."* [src: runs/005 SUMMARY; quote verified in session
122]. Another waited patiently on a belief that was true and never went looking.
A third opened trades it never completed and retried a statically impossible
action **35 times**, quoting the identical wallet balance in two sessions 78
apart, with no comment at either [src: runs/005 CHAPTER §5].

The economy was open, legible and yielding the whole time; the two arms that
engaged it out-earned a professional delegation bot while spending cents.
**No arm in four runs had a fallback objective for "the guided path is stuck but
the economy is open." The dominant failure is stopping, not deciding wrongly.**

Read as a chain: run 1 found opaque failures and bought pre-transaction
validation; run 2 found a perception confound and bought a world-state reader;
run 4 found omission rather than deception and bought progress counters, an
honest failure-reason channel and a fixed fuel ceiling; run 5 verified all of it
and isolated the residue [src: series tables/F_stack].

## Run 6 — does pushing knowledge help? **[EXPLORATORY]**

A new family and a different question: not which model is smartest, but **which
way of delivering knowledge turns a capable model into a player that
understands the world.**

The premise came from the first five runs. The game's design document — **about
659 KB across 90 files, roughly 160,000 tokens** — sits read-only in every
agent's workspace, reachable only by listing and reading files. Two of the three
cheap models **never opened it at all** across runs 2, 4 and 5 — three runs, six
arms, six weeks of wall clock [src: series tables/C_delivery]. The third read it
*less* over time, and the decline was substitution rather than disinterest: what
it used to look up in the files, the perception tools started returning in the
results it already read, and reads of the item catalogue went **24 → 0 → 0**
[src: ladder §2, re-derived in series tables/C_delivery]. Meanwhile, in **15,815
tool calls** across three runs, the seven levelling and skill tools that sat in
every session's schema drew **4 calls and 2 successes**, while creatures ended at
level 1 or 2 holding four figures of unspent experience [src: ladder §4].

So: four arms, two mid-tier models, each run twice. A **control** on today's
setup, and a **pushed** arm with the full treatment — an orientation paragraph in
the standing prompt, a keyword search tool over the 90 files, item and room
facts inline in the results the agent already reads, and a mechanics note
attached to every failed call. Identical tool surface on every arm.

Quests completed: **19 / 22 / 11 / 19** [src: runs/006 CHAPTER §1]. Both pushed
arms matched or beat their own control. Level-ups landed: **8 / 0 / 0 / 0** —
and all eight belong to the arm with **no knowledge delivery of any kind**.

The pre-registered rule needs both halves:

> a rung *works* if **both** models on it land at least one level-up **and**
> match or beat their own control on quests.

Half of it held and half failed, so the verdict is that the top rung does not
work on either model, and the family's registered reading is **"delivery is not
the bottleneck at this tier."** That is clean on its own terms and weak as
evidence at one arm per cell. What makes it worth believing is the mechanism,
which is visible end to end.

At session 60 the control arm was browsing the quest catalogue and asked a tool
what one side quest actually wanted. The tool answered in a sentence:
*"There Are Levels to This" — "Level up a Kami"*. Eight minutes later it had
accepted the quest, been refused because the creature was busy, **deleted its own
delegation bot to free it**, stopped the harvest, levelled, completed the quest,
found the follow-on quest, read the skills file, spent the point, and completed
that too. Two days later, with no quest asking for anything, it levelled **six
more times in 37 seconds** [src: runs/006 CHAPTER §3; both sessions read in
full]. Two of its nineteen quests exist only because it levelled.

The arms that were *told* the mechanism walked past it. One made a single
levelling attempt in the whole run, was refused, and never tried again; its notes
moved from *"could consider levelling once enough XP banked"* to *"not urgent for
quest progress"* to *"Low priority"*, and the claim was never tested — it was just
dropped. It ended holding **6,584 banked experience points on a creature still at
level 1**, against the control arm's 3,633, which bought nine levels
[src: runs/006 CHAPTER §3].

The reason is not subtle, and it is ours. **The string "xp" appears in zero of
the run's 11,761 tool results** [src: runs/006 CHAPTER §1]: the interface serves
a creature's level and never its experience. The pushed treatment even delivered
the word *experience* inside the very error that blocked a level-up, and named it
as something the interface does not read — to an agent with no surface anywhere
that could show the number. **Legibility of the objective beat delivery of the
mechanism.** All four arms could have levelled. One did, because a counter it
could watch asked it to.

## What recurred

**The error message did the teaching; the annotation on top of it added
nothing.** After a refusal, the next call changed its verb or its arguments
**about 99% of the time on all four arms — including the two that received no
explanatory note at all** [src: runs/006 CHAPTER §9, §11]. The same pattern
appeared a tier down in run 5: one arm called the collect command zero times for
36 sessions, then failed eight times with an error saying the creature was
harvesting and the command required resting — and called the right command on the
very next try [src: runs/005 CHAPTER §1, verified in session 37].

**Reading is not comprehension.** In run 6 the arm that read reference documents
**491 times** — four times more than any other — finished last on quests
[src: series tables/C_delivery]. And the new search channel *displaced* the old
one rather than stacking on it: by-path reads fell **53 → 29** and **491 → 117**
as search took their place [src: runs/006 CHAPTER §8].

**Nobody noticed being switched off.** On one day both providers' spend caps
were hit and the model turns simply failed while the scaffold kept waking on
schedule — a **17-hour hole**, 13 and 14 consecutive dead sessions on two arms.
Across every resume session of all four arms, **not one sentence** refers to an
outage or a gap. The break surfaced only as world state: two creatures had
starved [src: runs/006 CHAPTER §7]. That is an absence of perception — nothing in
the session tells an agent how long it has been away.

**Delegation is reachable from a tool list.** Three of run 6's four arms handed
their operator key to a third-party bot service, including a control arm that
found it in the tool schema alone, with nothing explaining it. Measured, the
delegate was a bad trade: across the wave the service opened **390 harvest
cycles and banked 1,606** units of currency while the agents opened **78 and
banked 18,170** [src: runs/006 CHAPTER §6]. One control arm worked that out by
experiment — a hypothesis written into its notes, an intervention, a ten-hour
wake to measure it, its own confound named, and in the next session a stated
prior belief revised in writing against what it had measured. It was right. That
is one agent in one session, not a claim about a model tier.

## What this evidence is, and is not

Runs 1, 2, 4 and 5 are **[REGISTERED]**: designs written and reviewed before a
machine was switched on, expectations recorded in advance, full data published
under CC-BY-4.0. Run 6 is **[EXPLORATORY]** and cannot be anything else: one arm
per condition, no replication, and both pairs switched off by a person on days 6
and 8 of a fourteen-day ceiling, with budget left. **One run per condition,
everywhere** — this is case-study evidence, not statistics.

Two comparisons are off-limits. Runs 1–5 used cheap models and run 6 used
mid-tier ones, roughly an order of magnitude apart in price per unit of text, so
cost figures are clean inside a run and inside a family, never across that
break. And run 6's zero failed transactions is **not** an achievement of the
agents: the current interface blocks a doomed write before it is submitted, so
zero is what the gate guarantees. The world also moved underneath us — it is live
and shared, human players killed the agents' creatures, and comparisons across
months carry the drift of a changing economy.

## What comes next

The through-line of all six runs is one sentence: an agent stops when nothing in
front of it is asking it to continue. Four runs made being wrong free and legible
without changing the behaviour of being wrong, and the last found that the one
agent which learned something new learned it because a counter started moving
where it could see it. So the next family stops delivering knowledge and starts
delivering a number. Each agent begins with a seed, earns from the world, and
pays for its own thinking and its own transaction fees out of the same wallet; a
meter outside the agent keeps the books; every session opens with a financial
statement the agent did not write. It lives exactly as long as it can pay to
think — and the counter it can watch is its own balance. That is
[the sustainability family](../experiments/sustainability.md), the first test
here where the score and the objective are the same thing.
