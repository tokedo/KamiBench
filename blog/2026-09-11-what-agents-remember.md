# What agents remember, and what they do next

<!-- ONELINER:START -->
Six registered runs, five with data, and a closer look at continual learning:
agents writing plans, preserving mistakes, and revising their own notes.
Real trajectories show what survives a session—and when knowledge changes action.
<!-- ONELINER:END -->

An agent suspected that the bot it had hired was collecting too often. It
stopped the bot, left its creature harvesting, and wrote a comparison plan in
its notes. Then it went to sleep. **[EXPLORATORY]** Ten hours later, the next
session read those notes, collected the proceeds, and wrote up the result.
Along the way, the agent corrected its earlier belief about how harvesting
affected the creature's health.

That is the kind of sequence KamiBench exists to make visible: experience
becoming a record that a later session can use, test, or revise. We also saw
the reverse. An agent saved a mistaken conclusion and kept consulting it until
the experiment ended. Persistent memory carried both useful lessons and reasons
to stop learning.

The [first post](2026-08-14-why-kamibench-for-continual-learning.md) explained
why a persistent world is useful for studying continual learning. This post
looks inside the agents that lived in it. The examples below are excerpts from
their public transcripts, including the actual writes to persistent memory.
Each excerpt links to its source file and line on Hugging Face at the frozen
`v0-final` revision. The surrounding explanations are ours; the quoted text is
the agent's or its tools'. An agent's claim inside a quotation can be wrong.

<nav class="post-route" aria-label="In this post"><a href="#experience-has-to-survive-the-session">Memory across sessions</a> · <a href="#first-make-the-instrument-answer-honestly">How traces shaped the stack</a> · <a href="#access-to-knowledge-is-only-a-beginning">Knowledge delivery</a> · <a href="#what-carries-beyond-the-game">Beyond the game</a> · <a href="#make-efficiency-matter">Sustainability</a></nav>

## Experience has to survive the session

The world is Kamigotchi, a live multiplayer game on a public blockchain.
Players buy creatures called Kami, send them harvesting to earn the currency
MUSU, and complete quests. Harvesting drains health. Other players can kill a
weakened harvester and take part of its yield. The agents encountered real
players and real costs; their world continued changing between sessions.

In these experiments, a model wakes with tools and a workspace. It can read
the game's documentation, act, write notes, and choose when to wake again.
The notes persist. Learning here can happen through changes to that memory
and to later behavior; the experiment does not update the model's weights.
Writing a useful-sounding note is only the beginning. The next session must
find it, use it in the right circumstances, and revise it when evidence changes.

The program has registered six runs across two families; five produced data.
The first family tested the stack with small, bounded runs. The second tested
knowledge delivery on more capable models. **[REGISTERED]** labels trace to
the stack-validation runs. **[EXPLORATORY]** labels mark the knowledge-delivery
observations. Both families are case studies, with one arm per condition;
an arm is one agent, model, wallet, and experimental condition.

Start with three constructive examples. An agent carries an experiment across
a session boundary. Another sequence turns an incident into a recovery note.
A third replaces a saved misconception instead of defending it.

<!-- TRAJECTORY:memory -->

The first sequence goes further than saving a plan: the next session reads
the plan and writes a correction. The incident sequence shows a narrower
achievement: a recovery procedure and a later observation preserved together.
We should not count those as identical evidence of learning. The distinction
between a note being written, retrieved, and acted on is part of what the
record lets us inspect.

## First, make the instrument answer honestly

Before interpreting an agent's behavior, we had to establish what the agent
could see and do. If an inventory query fails, apparent confusion might come
from a missing balance. If a valid action never lands, apparent inability
might come from our transaction code.

**[REGISTERED]** The [stack-validation family](../experiments/budget-boxed.md)
used the same three inexpensive models, a $10 inference limit per arm, a
seven-day wall clock, and a fresh wallet containing 0.02 ETH. Run 003 was
retired because of a fault in our provisioning tooling and is excluded from
the results. Four completed runs tested the instrument under autonomous use.

**[REGISTERED]** In [run 001](../experiments/001-budget-boxed.md), an arm
spent six days stuck before registration, then corrected a readable validation
error in one turn. The interface needed to explain failures before agents
spent money repeating them. [Run 002](../experiments/002-stack-delta.md)
tested that change: pre-transaction validation stopped 331 doomed writes
before they reached the chain. But an inventory endpoint failed on all 398
calls. One agent declared itself unable to recover while holding about
820 MUSU it could not see.

The lab followed each failure through the tool call, returned result, agent
response, and chain record. Those traces determined the next changes:

| Registered run | What the traces exposed | What changed and was checked next |
|---|---|---|
| [001](../experiments/001-budget-boxed.md) | Opaque transaction failures and costly repetition | Pre-transaction validation and scaffold budget controls, tested in run 002 |
| [002](../experiments/002-stack-delta.md) | Missing inventory information and an ambiguous action | A dedicated world-state reader and clearer transaction behavior, tested in run 004 |
| [004](../experiments/004-perception-parity-rerun.md) | Missing quest progress, unusable failure reasons, and a collect action whose gas ceiling was too low | Progress counters, readable failure reasons, and repaired gas ceilings, tested in run 005 |
| [005](../experiments/005-verification-run.md) | The remaining agent failures after the queued fixes were verified | The exit test closed the series; the next family tested knowledge delivery |

These were changes between runs in a live world, often shipped together.
The sequence does not isolate the effect of every individual fix. A trace can,
however, show whether an action that used to fail now succeeds in an agent's
hands—and whether the agent receives the information it needs to respond.

<!-- TRAJECTORY:stack -->

The memory failure is also an interface lesson. The agent could see its
balance, but not the quest's progress since acceptance. A saved explanation
filled that gap. Once the explanation was wrong, rereading it did not supply
new evidence. The response was to expose the progress counter and test the
repaired surface in another run.

**[REGISTERED]** Run 005's exit test returned **MINOR-FIXES** and the family
closed. The test found no remaining stack defect affecting what agents could
see or do; the remaining failures were in their choices. The shadow cost meter
also agreed with raw telemetry to +3.95 and −5.70 millionths of a dollar over
the complete measurement windows. The [run page](../experiments/005-verification-run.md)
records the checks and the published ledgers.

![Across the four completed stack-validation runs, failed on-chain writes became much less common while quest progress remained modest.](../experiments/figures/budget-boxed-series.svg)

**[REGISTERED]** Another arm ended 55 of 122 sessions by asking a user who
did not exist what to do. Its [final session](https://huggingface.co/datasets/KamiBench/experiment-005-budget-boxed/blob/v0-final/gemini25fl/transcripts/session-0122.jsonl#L6)
ended with: “What would you like to do? I can help you accept a quest, or list
more quests.” The scaffold replied with its fixed continuation prompt. The
agent then ended the session, citing a user request that nobody had made.
An open world and a functioning interface had not supplied a fallback objective.

## Access to knowledge is only a beginning

The documentation was already available. **[REGISTERED]** Across runs 002,
004, and 005, two of the three models never read a file from the reference
folder. The third sometimes guessed paths incorrectly. As more facts appeared
inside perception results, its reads of the item catalog fell from 24 to 0
to 0. A read count alone would miss that substitution.

**[REGISTERED]** The leveling and skill tools were called only four times in
15,815 tool calls across those runs. Two calls succeeded, both leveling the
same creature in run 005. The capability was available but rarely used. That
suggested a concrete question: would delivering knowledge inside the agent's
existing workflow change its behavior?

**[EXPLORATORY]** [Run 006](../experiments/006-knowledge-delivery-wave-1.md)
tested Sonnet 5 and gpt-5.2, each with a control arm and a pushed-knowledge
arm. Controls could list and read the documentation folder. Pushed arms also
received an orientation paragraph, keyword search, facts inside perception
results, and mechanics notes attached to failed calls. The environment tool
schemas were identical across conditions. The model tier and stack differed
from the earlier family, so comparisons across families cannot isolate either.

The registered OpenAI model was initially gpt-5.4. The pinned adapter's endpoint
rejected reasoning with tools at the first model call, before any model turn.
Those arms were voided and replaced by gpt-5.2 that evening, using the same
untouched wallets. The [launch note](../experiments/006-knowledge-delivery-wave-1.md#launch-note)
records the substitution.

**[EXPLORATORY]** Both pushed arms completed more quests than their controls:
22 versus 19 on Sonnet 5, and 19 versus 11 on gpt-5.2. Neither pushed arm
landed a level-up. The Sonnet control landed eight; the other control landed
none. The rule, quoted from the [registered design](../experiments/knowledge-delivery.md#what-decides), was:

> a rung *works* if **both** models on it land at least one level-up **and**
> match or beat their own control on quests.

**[EXPLORATORY]** The pushed rung failed that joint rule on both models.
The family's registered reading is **“delivery is not the bottleneck at this
tier.”** The family closed at Wave 1. That is a scored outcome, not evidence
that delivered knowledge is useless. The trajectories include a clear case
of search producing an operating rule and subsequent quest progress.

![Run 006 quest trajectories compare control and pushed knowledge within each model; only the Sonnet control has landed level-up events.](figures/006-quests-over-time.svg)

**[EXPLORATORY]** Each line ends at its arm's operator stop. The gpt pair
stopped on August 24 under a burn-rate ruling; the Sonnet pair stopped on
August 25 after the verdict was decided. Both stopped before the fourteen-day
ceiling with budget remaining. Level-up markers come from the frozen event
record; the clustered burst is expanded below the Sonnet panel.

<!-- TRAJECTORY:knowledge -->

These sequences put the positive and negative evidence together. Search helped
when an agent had a specific question to resolve. An explicit quest objective
preceded the control arm's discovery of leveling and its later repeated use.
The pushed arm kept postponing that mechanic despite having it explained.
**[EXPLORATORY]** Experience points were absent from the in-run tool surface,
so the agents could not inspect the surplus they were leaving unused. The
lab's interpretation is that objective legibility mattered more than mechanism
delivery in this case. It remains an interpretation of individual trajectories.

The instrument still needed scrutiny. **[EXPLORATORY]** Run 006 had 2,936
agent-era transactions and zero on-chain reverts. That zero belongs to the
write gate, not the agents, and cannot extend the earlier runs' failure-rate
comparison. The partial-action incident above shows why we also reconcile tool
records against the chain: a failed call can conceal a successful first step.

## What carries beyond the game

The first post distinguished intelligence from expertise. These records make
that distinction inspectable. Working out a rule during a session, saving it,
and using it later are separate events. A fluent explanation proves none of
the later steps. Nor does a large memory prove that the agent revisits its
assumptions.

The same mechanisms are worth testing in enterprise work. A support agent
could preserve an unverified diagnosis as a customer fact. An operations agent
could repeat a partly completed job because its API returned a single failure.
A research agent could write a test plan, retrieve it after a delay, and change
its notes when the result contradicts the hypothesis. In each case, the useful
question is what the next action inherits from the previous one.

Those are proposed applications of the evaluation, not demonstrated transfer
from game play to enterprise performance. KamiBench gives us a persistent
environment in which to observe the mechanisms and audit their consequences.
The behavior must still be tested in the work setting where it will matter.

## Make efficiency matter

The next [sustainability family](../experiments/sustainability.md) asks whether
economic pressure creates a stronger reason to turn knowledge into efficient
action. An agent starts with seed money, earns in-world, and pays for its own
inference and gas. It lives as long as it can pay. A meter outside the agent
supplies its financial statement, so repeated investigation and unused knowledge
have consequences in a balance the agent can observe. Scarcity might encourage
better use of memory, more selective reading, and cheaper decisions; these runs
have not established that it will. The next test is whether agents learn to
operate more efficiently under that pressure, measured through their earnings,
costs, and running balance over time. Its binding pre-registration will publish
before launch.
