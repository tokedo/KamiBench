# Asphodel Whitepaper — Reading Notes (for the benchmark paper)

> Source: https://docs.asphodel.io/whitepaper (published **2026-06-12**). Full read of
> all sections, 2026-07-04. Verbatim quotes in "quotes"; use these to ground the paper's
> substrate/motivation sections. Verify quotes against the live page before final cite.

## Why this matters
The whitepaper independently states the paper's core thesis **in the creators' own
words** — the environment is purpose-built to be agent/bot-first and is explicitly framed
as a possible *"real-stakes, adversarial benchmarking system."* This turns our claim from
"we project a benchmark onto a game" into "we formalize the benchmark the environment was
built to be."

---

## Intro / Immortal Worlds (`/whitepaper/intro/immortal-worlds`)
- Centralized MMOs are "fragile, prone to censorship and restriction, and doomed to one
  day be shut down." "When a world is forever at risk of disappearing overnight, it places
  a cap on how seriously users can take the system."
- Vision: **"Worlds that live forever, that have no centralized owners, that cannot be
  censored, where players own their characters and assets and where that matters."**
- Frames Ethereum's original purpose as "hosting immortal, immutable, uncensorable virtual
  worlds" (Vitalik/WoW-nerf origin story).
- Abstract elsewhere: **"an immortal virtual world"**; **"immortal because it lives on
  Ethereum… designed to run forever as a World Computer"**; **"renouncing human ownership
  creates a true virtual world: a decentralized space in which humans _and agents_ may act
  as they wish, bound only by the world's intrinsic ruleset."**

## Intro / Decentralized Economies (`/whitepaper/intro/decentralized-economies`)
- "decentralization enhances everything about the *economic* side of MMORPGs."
- "We dream of a world where MMORPG auction-house arbitrage is more profitable than trading
  commodities." Goal: "the first digital economies capable of reaching trillion-dollar GDP
  scale." Blockchain is "the only practical way to maintain game state in a decentralized
  manner" at that scale.

## Architecture / Bots and Agents (`/whitepaper/architecture/bots-and-agents`) ★ KEY PAGE
- **"we had the idea that we'd be uniquely friendly to bots."**
- "In a permissionless onchain system, you can't stop bots playing" → chose to "lean into
  this and accept that some players would bot the game."
- **"the majority of activity in the game is automated."**
- "acquired the Kamibots team and begun to build their features into our core UX."
- **"We reached that far-future somewhere in 2025."**
- Will **"run a few events during 2026 to encourage LLM-driven Kamigotchi play"** and view
  the system as potentially a **"real-stakes, adversarial benchmarking system."**
- "a fully-transparent, decentralized system that any internet user can access without
  censorship."
- **"humans are no longer the only target market when it comes to gaming."**
- "almost uniquely positioned as we head toward the singularity" via being "a fundamentally
  bot and agent friendly project." Bot-swarm managers "have been our best customers."

## Economics / $ONYX (`/whitepaper/economics/usdonyx`)
- "one of the key economic primitives"; "a digital commodity used as a means of exchange";
  "the Asphodel equivalent of real-world Oil."
- **Baseline Token: "a reserve of ETH which sets a maximum drawdown (in ETH) and serves to
  provide a permanent, thick basis of liquidity"** → "less volatile than traditional,
  unbacked ERC20s"; "decentralized liquidity on Ethereum forever." Trades on **Baseline
  Markets on Ethereum**.
- Fixed supply **1,000,000, no inflation**. Presale: 2000 slots @ 0.5 ETH → 500 ONYX/slot
  (1010 playtesters / 800 private / 150 team / 40 marketing). "All ONYX has been
  distributed, and is either with holders or in the LP."
- In Kamigotchi: enables player-to-player value exchange; "bridges the in-game economy via
  **ONYX shards**." (This is the MUSU↔ONYX in-game link — confirm live vs. planned detail.)

## Economics / $SOMA (`/whitepaper/economics/usdsoma`)
- Governance/ownership token, **not launched yet (possibly 2027+)**. "ownership and
  governance over the Asphodel ecosystem."
- Decentralization mechanism: team intends to "progressively renounce control for this
  project to succeed"; eventually a "permanent, user-run organization." **≥60% of supply to
  active users.**

## Architecture / Ethereum + Yominet; Economics / Worlds, NFTs (not deep-read)
- Multi-world ecosystem: **Kamigotchi World** (live on Yominet) + **Asphodel Prologue**
  (ETH mainnet). Cross-game assets planned ("the Kamigotchi in Asphodel, and perhaps the
  Taruchi in Kamigotchi"). → supports substrate-generality (a *family* of worlds, not one
  game).

## Intro / Where We Are Today (`/whitepaper/intro/where-we-are-today`)
- Kamigotchi World live on Yominet — "the richest and most complex fully onchain videogame
  that currently exists."
- **$ONYX live 1+ year, recently moved from Yominet to Ethereum mainnet**, liquidity "proven
  resilient under harsh conditions."
- Asphodel Prologue → ETH mainnet ~a few weeks after 2026-06-12. 4 years of (mostly stealth)
  development.

## Close / What Comes Next (`/whitepaper/close/what-comes-next`)
- Reject roadmaps ("usually either dishonest or a waste of time"); "we don't plan
  development more than 2-3 months ahead of time."
- Ultimate goal: **"the main Asphodel world as the first true example of a fully
  decentralized MMORPG."** 4 years in, **"at least 4 more"** estimated.
- Daily updates: @0xl3th3 on X.

---

## How to use in the paper (and honesty guardrails)
- **Motivation / substrate section:** cite the immortal-world + bots-and-agents pages —
  especially the creators' "real-stakes, adversarial benchmarking system" framing and the
  planned 2026 LLM events. Strongest single piece of external validation we have.
- **Economics / endogenous-survival section:** ONYX is ETH-backed on Ethereum mainnet
  (real, external value, live 1+ yr) → the "agent funds its own compute" loop is grounded;
  the MUSU↔ONYX in-game link is via ONYX shards (state live-vs-planned precisely).
- **Maturity caveat (must disclose):** full decentralization/renouncement (SOMA) is years
  out ("at least 4 more"); today Asphodel Studios still defines rules. So: *already
  substantially host-independent* (on-chain state, ETH-backed token on mainnet,
  permissionless bot play that is already the majority of activity) **on a credible
  trajectory to full autonomy** — do not overclaim present-tense immortality.
