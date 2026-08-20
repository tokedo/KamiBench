# Knowledge delivery — how the game's knowledge reaches the agent

<!-- ONELINER:START -->
The design keeps the world, tools, and objective fixed while changing only how
the game's knowledge reaches the agent: through a folder to read, a search
tool, facts pushed inside tool results, or a plan file. The design asks which
delivery method turns a capable model into a player that understands the game.
<!-- ONELINER:END -->

## The problem

Five [budget-boxed](budget-boxed.md) runs proved the stack works, but they also
showed the agents playing blind. The game's design document was bundled in a
folder next to the agent, yet two of three models never opened it. The third
model guessed at file paths and got them wrong up to a quarter of the time.

The agents learned rules from error messages ("requires RESTING" → try
resting), not from the documentation. They had leveling tools in front of them
in every session but used those tools only four times in 15,815 calls. One arm
banked 2,121 MUSU and closed at level 1–2, with the experience to level up
sitting unspent.

Taken together, these observations support one lesson from the runs:
**knowledge that arrives inside a tool result gets used; knowledge one
file-read away in a folder mostly does not.**

The observations also motivate the hypothesis tested here: the bottleneck may
be knowledge delivery rather than the model. The design tests that hypothesis
directly.

## The method

The world, tool surface, starting wallet, and objective stay fixed across all
arms. The objective remains "complete as many quests as possible"; only the way
knowledge reaches the agent changes. The models are one tier up from
budget-boxed (Sonnet 5, gpt-5.2), so a null result is not "the model was too
small".

Each delivery variant is a rung in a cumulative ladder. Rung A is the control,
and every later rung adds one delivery path to those before it. The table shows
what each rung adds and where the agent receives it:

| rung | adds | where it lives |
|---|---|---|
| **A control** | today's scaffold: the agent can read the design document from a read-only folder. At each session, the agent also sees its remaining ETH and is told that every action costs gas | scaffold |
| **B orientation** | one fixed paragraph in the system prompt explaining the core loop: kamis harvest, harvesting drains health, food restores it, experience levels up, and quests count across all your kamis. The paragraph gives rules only, with no advice | scaffold |
| **C search** | a deterministic `search_reference` tool that searches the bundled design document by keyword and returns snippets with their paths | scaffold |
| **D pushed knowledge** | item and room descriptions appear inline in what the agent perceives. When a tool call fails, the result includes a short note explaining why and naming the action that applies now. The descriptions and failure notes come from the environment's own rules, never from prose | environment (lens + harness) |
| **E planning** | a plan file that the agent is asked to maintain and receives again at the start of each session | scaffold |

Rung D is the only one that changes the environment side, and it changes only
tool *results*. Schemas, descriptions, and tool count are byte-identical across
arms. Nothing in any rung tells the agent what to do; strategy content is
excluded on purpose.

## The box

| | |
|---|---|
| **Arms** | ladder rung × model, one arm per cell (N=1) |
| **Models** | Sonnet 5 · gpt-5.2 — capability- and price-matched |
| **Session cap** | 150,000 tokens |
| **Wall clock** | up to 14 days; an arm stops early once its verdict is clear |
| **Start** | a fresh Ethereum mainnet wallet holding 0.03 ETH |
| **Objective** | "complete as many quests as possible" |
| **Cost** | a $200-per-arm planning ceiling, invisible to the agent; no cost meter |
| **Stack** | one pinned version of scaffold, environment interface and lens for the whole family; rungs are flags, not branches |

## What decides

The primary outcome and the pre-registered verdict rule determine the
experimental result. The other process measurements help explain how each arm
reached its outcome, although one of them — a landed level-up — also appears in the
verdict rule. This is the distinction behind the shorthand: outcomes decide;
process observables explain.

- **Primary:** quests completed at stop, from the chain.
- **Comprehension indicators:** whether any level-up landed, and how soon;
  experience left unspent; how many kamis the agent owns over time and how much
  ETH it spent buying them; MUSU banked; gas per quest; and survival. Quest
  objectives count across all your kamis, so an agent that understands the
  game should grow its roster.

The verdict moves through three levels. First, check whether each model landed
a level-up and compare its quest count with its own control. Next, determine
whether both models satisfy the rung-level rule. Finally, use the rung results
to reach the family conclusion. The exact pre-registered rule is:

- **Verdict rule, pre-registered:** a rung *works* if **both** models on it
  land at least one level-up **and** match or beat their own control on
  quests. One model only = suggestive. The family's answer is the lowest rung
  that works — or "delivery is not the bottleneck at this tier" if the top
  rung moves neither model.
- **Not a metric:** how often the agent read the documentation. Reading
  without acting is a null result, and reported as one.

## Waves

Cheapest decisive test first.

The experiment launches arms in sequence rather than all at once. A cell is
one rung–model combination, and each wave depends on the result of the previous
wave:

1. **Wave 1** — control (A) and the full pushed rung (A+B+C+D) on both models:
   four arms. If the top rung moves neither model, the family stops there.
2. **Wave 2** — only if Wave 1 shows a gap: bisect (B and C alone on the more
   responsive model; E on top of the best on both).
3. **Wave 3** — replicate the winning cell.

Wave 1 decides whether the family stops or proceeds to Wave 2. If the family
proceeds, Wave 2 runs the intermediate tests above before Wave 3 replicates the
winning cell.

Because arms launch in waves and run in the live world, cells are not
synchronized. Every arm's record names the other arms live during its window
and the world era in which it started. Cells are **exploratory** by grade; only
a synchronized replication earns a registered comparison.

## Reproducibility

Design and run pages publish before launch. Each run's manifest pins exact
commit SHAs of [kami-agent](https://github.com/tokedo/kami-agent),
[kami-harness](https://github.com/tokedo/kami-harness),
[kami-lens](https://github.com/tokedo/kami-lens) and
[kamigotchi-gdd](https://github.com/tokedo/kamigotchi-gdd). The manifest also
pins model strings, reasoning settings, price tables, and every scaffold cap.
Chain state is the public ground-truth action log.
