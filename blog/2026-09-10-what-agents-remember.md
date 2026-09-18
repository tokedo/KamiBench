# What agents remember, and what they do next

<!-- ONELINER:START -->
An agent starts every session with an empty context. Its notes are the only
thing that carries over. Four things one agent did with them over eight days
in a live world: budgeted its own attention, learned an order of operations,
carried a goal across fourteen sessions, and corrected a belief it had picked
up from the manual.
<!-- ONELINER:END -->

Most benchmarks hand an agent a context and a task, grade the answer, and
end. KamiBench hands it a world and an open goal, and lets it run for days.
The world is a live multiplayer game on a public blockchain. Every session
starts from nothing: the agent wakes with its tools, a folder it can read and
write, and whatever it wrote there last time. The model's weights do not
change. If anything is learned, it is learned into that folder.

So the question this post follows is simple. What does an agent actually do
with its notes? We picked four sequences from one agent's eight days and laid
each one out the same way: what to see, in plain words, next to the evidence,
the tool calls and the note the agent wrote to itself. The quoted words are
the agent's, verbatim, and can be wrong. The explanations are ours.

<nav class="post-route" aria-label="In this post"><a href="#the-world-and-one-agent-in-it">The world</a> · <a href="#context-budget">1 · Context budget</a> · <a href="#tool-order">2 · Order of operations</a> · <a href="#long-goal">3 · A long goal</a> · <a href="#belief-correction">4 · A corrected belief</a> · <a href="#what-the-four-have-in-common">What they share</a> · <a href="#where-these-come-from">Where they come from</a></nav>

## The world, and one agent in it

The world is Kamigotchi. Players own creatures, send them to harvest a
currency at resource spots, feed them, and complete quests. Harvesting drains
a creature's health. Other players can attack a weakened harvester and take
part of its yield. The agents met real players and real costs, and the world
kept changing while they slept.

Here is one day of that world. The clip shows every player who moved between
rooms on August 19, 2026, the third day of
[run 006](../experiments/006-knowledge-delivery-wave-1.md), with our agent
in white. Twenty-two wallets moved that day. The red flashes are attacks, 43
of them. Only movement is drawn; harvesting, feeding, trading and quests
happen inside the rooms.

<figure class="post-video">
<div class="post-video-frame"><iframe src="https://www.youtube-nocookie.com/embed/pst_F3mHmm4?rel=0" title="One day in Kamigotchi world: every player's moves on August 19, 2026, with our agent in white" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
<figcaption>August 19, 2026, one day in the world: every player's moves between rooms, from the chain record. Our agent is the white marker. What happens inside the rooms is not shown.</figcaption>
</figure>

Now the same agent from inside its own sessions. The clip replays its eight
days in one minute. The map shows where it is and where its creature
harvests. The panel on the right is the notes file it keeps between sessions.
It rewrote that file 63 times in eight days, and each change lights up as it
lands. Every line in the action log is a transaction on the chain.

<figure class="post-video">
<div class="post-video-frame"><iframe src="https://www.youtube-nocookie.com/embed/diLbBpRtlf0?rel=0" title="Eight days of the Sonnet 5 control agent in run 006, replayed in one minute" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
<figcaption>Run 006, Sonnet 5 control agent: eight days of play in one minute. Map, inventory, notes file, and on-chain log, all rebuilt from the public record.</figcaption>
</figure>

The four examples below all come from this agent: Sonnet 5, the control
condition of run 006, 82 sessions between August 17 and 25. It had the
game's documentation in its folder and nothing else. **[EXPLORATORY]** These
are case studies of one agent. They show what happened, not how often it
happens.

<!-- BEHAVIOR:context-budget -->

<!-- BEHAVIOR:tool-order -->

<!-- BEHAVIOR:long-goal -->

<!-- BEHAVIOR:belief-correction -->

## What the four have in common

Each behavior lives in the notes file. A cost became a rule. A failing order
became a procedure. A goal became a three-line entry that fourteen sessions
read and rewrote. A belief was written down as a hypothesis, and that label
is what let the next session overturn it.

The failures are in the notes too, and they are the same shape. The rule
about the expensive query held for sixty sessions and was broken by a session
that fired the call before it had read the file. The feeding order was fixed
in the agent's actions two sessions before it was fixed in its notes. And the
manual outranked ten days of the agent's own measurements, because the agent
was reading with a puzzle in mind and the manual offered a mechanism for it.

None of this changes the model. It changes what the model finds when it wakes
up. That is the whole mechanism we are studying, and these four sequences are
what it looks like when it works.

## Where these come from

**[REGISTERED]** [Run 006](../experiments/006-knowledge-delivery-wave-1.md)
asked whether pushing game knowledge into a capable model's workflow changes
what it does. Sonnet 5 and gpt-5.2 each ran a control agent, which had the
documentation in its folder, and a guided agent, which also received an
orientation, keyword search, facts inside tool results, and mechanics notes
when calls failed. The guided agents completed more quests than their
controls, but neither leveled up a creature, and the Sonnet control leveled
up eight times. Extra guidance did not meet the experiment's
[success criterion](../experiments/knowledge-delivery.md#what-decides).
The examples above are from the control agent: the one that was given the
least.

![Run 006 quest trajectories compare control and pushed knowledge within each model; only the Sonnet control has landed level-up events.](figures/006-quests-over-time.svg)

The chart calls the guided condition “pushed knowledge.” Both pairs were
stopped early with budget remaining: gpt on August 24 because of its burn
rate, and Sonnet on August 25 after the verdict was decided.

Run 006 was the first run where the stack itself was not in the way.
**[REGISTERED]** Four earlier runs on smaller models, all
[budget-boxed](../experiments/budget-boxed.md) to $10 and seven days, were
spent finding and fixing what the tools hid from the agents: an inventory
endpoint that failed on every call, error messages an agent could not act on,
a quest counter it could not see. By [run 005](../experiments/005-verification-run.md)
the exit test found no remaining stack defect affecting what agents could see
or do. The remaining failures were in their choices.

![Across the four completed stack-validation runs, failed on-chain writes became much less common while quest progress remained modest.](../experiments/figures/budget-boxed-series.svg)

Every transcript is public. Each card links its quotes to the exact line of
the session file on Hugging Face, at a pinned revision, and the
[first post](2026-08-14-why-kamibench-for-continual-learning.md) explains
why a persistent world is the right place to study this.

## Next: make efficiency matter

The first example shows an agent noticing, on its own, that reading is not
free. The next [sustainability family](../experiments/sustainability.md)
makes that cost part of survival. An agent starts with seed money, earns in
the game, and pays for its own inference and gas. It lives as long as it can
pay, and its balance is the score. Will that pressure produce more of what
the four examples show: cheaper reads, procedures that stick, goals that
survive the night, beliefs that get checked? That is what the next experiment
will test.
