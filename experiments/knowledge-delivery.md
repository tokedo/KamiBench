# Knowledge delivery — how the game's knowledge reaches the agent

<!-- ONELINER:START -->
Same world, same tools, same objective; the thing that changes is how the
game's knowledge is delivered to the agent — a folder to read, a search tool,
facts pushed inside tool results, a plan file. The question: which delivery
turns a capable model into a player that understands the game.
<!-- ONELINER:END -->

## The problem

Five [budget-boxed](budget-boxed.md) runs proved the stack works. They also
showed the agents playing blind. The game's design document was bundled in a
folder next to the agent; two of three models never opened it, and the one
that did guessed at file paths and got them wrong up to a quarter of the time. Rules
were learned from error messages ("requires RESTING" → try resting), not from
the documentation. Every agent had leveling tools in front of it every session
and used them four times in 15,815 calls. One arm banked 2,121 MUSU and closed
at level 1–2, with the experience to level up sitting unspent.

The lesson from those runs, in one line: **knowledge that arrives inside a
tool result gets used; knowledge one file-read away in a folder mostly does
not.**

So the bottleneck may not be the model. It may be delivery. This design tests
that directly.

## The method

Hold everything fixed — world, tool surface, objective ("complete as many
quests as possible"), starting wallet — and vary only how knowledge reaches
the agent. Models are one tier up from budget-boxed (Sonnet 5, gpt-5.2), so a
null result is not "the model was too small".

The variants form a ladder; each rung adds one delivery path on top of the
last:

| rung | adds | where it lives |
|---|---|---|
| **A control** | today's scaffold: the design document as a read-only folder, plus the agent sees its remaining ETH each session and is told every action costs gas | scaffold |
| **B orientation** | one fixed paragraph in the system prompt stating what the core loop *is* — kamis harvest, harvesting drains health, food restores it, experience levels up, quests count across all your kamis. Rules only, no advice | scaffold |
| **C search** | a `search_reference` tool: keyword search over the bundled design document, deterministic, returns snippets with paths | scaffold |
| **D pushed knowledge** | item and room descriptions inline in what the agent perceives; and when a tool call fails, a short note on why and which action applies now — generated from the environment's own rules, never from prose | environment (lens + harness) |
| **E planning** | a plan file the agent is asked to maintain, re-injected at each session start | scaffold |

Rung D is the only one that changes the environment side, and only tool
*results* — schemas, descriptions and tool count are byte-identical across
arms. Nothing in any rung says what to do; strategy content is excluded on
purpose.

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

Outcomes decide; process observables explain.

- **Primary:** quests completed at stop, from the chain.
- **Comprehension indicators:** any level-up landed (and how soon); experience
  left unspent; how many kamis the agent owns over time and ETH spent buying
  them (quest objectives count across all your kamis, so an agent that
  understands the game should grow its roster); MUSU banked; gas per quest; survival.
- **Verdict rule, pre-registered:** a rung *works* if **both** models on it
  land at least one level-up **and** match or beat their own control on
  quests. One model only = suggestive. The family's answer is the lowest rung
  that works — or "delivery is not the bottleneck at this tier" if the top
  rung moves neither model.
- **Not a metric:** how often the agent read the documentation. Reading
  without acting is a null result, and reported as one.

## Waves

Cheapest decisive test first.

1. **Wave 1** — control (A) and the full pushed rung (A+B+C+D) on both models:
   four arms. If the top rung moves neither model, the family stops there.
2. **Wave 2** — only if Wave 1 shows a gap: bisect (B and C alone on the more
   responsive model; E on top of the best on both).
3. **Wave 3** — replicate the winning cell.

Arms launch in waves and run in the live world, so cells are not
synchronized; every arm's record names the other arms live during its window
and the world era it started in. Cells are **exploratory** by grade; only a
synchronized replication earns a registered comparison.

## Reproducibility

Design and run pages publish before launch. Each run's manifest pins exact
commit SHAs of [kami-agent](https://github.com/tokedo/kami-agent),
[kami-harness](https://github.com/tokedo/kami-harness),
[kami-lens](https://github.com/tokedo/kami-lens) and
[kamigotchi-gdd](https://github.com/tokedo/kamigotchi-gdd), plus model
strings, reasoning settings, price tables and every scaffold cap. Chain state
is the public ground-truth action log.
