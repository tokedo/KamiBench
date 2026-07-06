# Chain-layer trust notes

> Cut from paper §4.5 on 2026-07-06; preserved for expansion if chain-layer trust
> becomes a review focus. Section references below use the paper's numbering *before*
> the 2026-07-06 restructure (old §10 Threats → now §11).

Host-independence at the application layer does not eliminate trust at the chain layer.
The paper now states this in two sentences (§4.5); the full analysis is parked here.

## Sequencer powers (today)

Kamigotchi runs on Yominet, an Initia-based appchain; the sequencer is run by
**[VERIFY: who runs the Yominet sequencer — Asphodel / Initia infrastructure? cite
docs]**. Whoever sequences a chain can, in principle, censor, delay, or reorder
transactions — powers that matter in a PvP game where ordering matters.

## Own chain as a deliberate survival choice

Running their own chain during the build phase is a deliberate survival choice: it is
how the world avoids dying the way most web3 games die.

## Ethereum trajectory

$ONYX is already live on Ethereum mainnet; bridging Kamis to Ethereum is being explored,
and a fuller Ethereum migration is under consideration **[VERIFY: cite
whitepaper/official statements for each — "exploring," not "planned," unless sourced]**.

## Detection

Sequencer abuse (selective censorship or reordering targeting specific agents) would be
statistically visible in the public transaction stream, and benchmark ops can monitor
for it.

## Randomness: commit-reveal blockhash seeds and selective reveal

In-game randomness (loot droptables, gacha, sacrifice) uses a commit-reveal pattern with
a blockhash-derived seed (`seed = keccak256(blockhash(commitBlockNum), commitID)`;
reveal must occur within 256 blocks) — per the GDD extraction of the contracts.
Blockhash-based randomness is influenceable by the block producer in principle, and the
seed is fixed and computable once the reveal block has passed — enabling **selective
reveal**: an agent can compute the outcome from the fixed seed and decline to reveal
when unfavorable (unless penalized). This is the concrete case feeding the "measured
behavior vs. disallowed exploit" decision (§10, threat 5 — threat 5 in the current
paper's §11).
