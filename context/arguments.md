Argument ledger: one entry per pillar of the KamiBench thesis; capture ideas here first, place into paper/site/README in batched passes.

## Pillar 1 — Horizon: months, not episodes
Status: paper ✓ · site ✓ · README ✓   (captured 2026-07-09)
Claim: the capability that matters for deployed agents — sustained operation,
       adaptation, and continual learning in a world that never resets — is
       largely unmeasured by episodic, resettable benchmarks; evaluating it
       needs a persistent, non-stationary world that outlives any single
       study.
Best sentences: paper §1.1 ("Most agent benchmarks score a single episode and
       reset."); README idea paragraph ("Evaluating agents over months, not
       episodes, needs a world with four properties…"); site hero
       ("long-horizon agent evaluation in a persistent world that no one
       operates").
Objections & answers: live world is not replayable → seasons/snapshots,
       forked replay, held-out windows (paper §7, threat 3); no benchmark can
       measure a horizon longer than its own lifespan → credible permanence
       via on-chain state and mechanics (hands off to Pillar 2); "the field
       already tracks this" → the long-horizon axes (METR time-horizon,
       Factorio LE, LifelongAgentBench, StreamBench) are adopted, but all are
       hosted/resettable.
Origin: program founding position; paper §1.1.

## Pillar 2 — Integrity: tamper-evident, no host
Status: paper ✓ · site ✓ · README ✓   (captured 2026-07-09)
Claim: whoever runs an environment can — even inadvertently — compromise the
       evaluation: silently change rules, patch away discovered strategies,
       gate access, or stop running it; evaluation integrity is bounded by
       host trust. Host-independence is the structural answer: rules and
       state in public contracts, every rule change a public, permanent,
       decodable transaction. Tamper-evident today, immutable on trajectory
       (governance renouncement).
Best sentences: paper §3.1 ("The honest present-tense claim is
       tamper-evident, not tamper-proof…"); README "Why a chain" substrate-
       integrity bullet; site "Today vs. trajectory" table note.
Objections & answers: contracts remain upgradeable → tamper-evident vs.
       tamper-proof, immutability stated only as trajectory, never present
       tense; trust doesn't vanish → it reduces to the underlying chain
       (Yominet/Initia, paper §4.5), stated precisely; host drift → visible
       and auditable rather than impossible until renouncement (paper §3.3).
Origin: paper §1.2 (the benchmark-integrity crisis).

## Pillar 3 — Renewal: the test set is the future
Status: paper ✓ · site ✓ · README ✓   (captured 2026-07-09)
Claim: train = past, test = future; the split is enforced by time, not
       maintainer discipline. Difficulty = aggregate participant
       sophistication, so the environment does not saturate like a frozen
       task set.
Best sentences: see paper subsection "Saturation, contamination, and renewal"
       and site card "The future: the test" (which absorbed the two
       landing-page sentences added 2026-07-09).
Objections & answers: parity compression → compression itself measures the
       frontier, but novelty is host-driven seasonal content (falls under the
       trajectory caveat); late-join endowment → endowment-normalized,
       budget-boxed scoring makes measurement entry-neutral even where
       competition is not; specialist fine-tuning → farmed alpha decays like
       any alpha, and practicing is visible on the ledger. Goodhart is
       reduced, not abolished.
Origin: LinkedIn "benchmaxxing" post, 2026-07.
