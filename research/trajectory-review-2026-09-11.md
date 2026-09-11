# Trajectory gallery: coverage and editorial review

Review date: September 11, 2026. This expands the eight examples selected for
post 2 into twenty reusable cases, twelve embedded in the post. The source
records live in `blog/trajectories/learning-from-experience.json`. The website
builds both views from those records.

## What was inspected

The review indexed every available original `session-*.jsonl` file in the
five completed runs. It parsed every JSONL row, indexed assistant statements,
tool calls and results, and extracted lexical changes in workspace writes.
There were no JSON parsing failures. It then screened candidate memory changes,
repeated failures, first/last narrative records and tool-use patterns across
all sixteen arms. Selected sequences received closer contextual review.

This is **systematic discovery followed by selective close reading**, not a
claim to have read every transcript line with equal attention. Keyword and
memory-diff screening can miss interesting behavior. The gallery is a curated
collection, not an exhaustive taxonomy or a representative sample.

Every behavior card is labeled EXPLORATORY, including cards whose source run
had a registered stack-validation design. The post's label guide now makes
that distinction explicit. Registered designs and scored findings retain
their existing labels; this pass changes no registered result.

| Run | Haiku | GPT-4o mini | Gemini | Sonnet control | Sonnet pushed | GPT-5.2 control | GPT-5.2 pushed | Files |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 001 | 14 | 165 | 156 | — | — | — | — | 335 |
| 002 | 92 | 235 | 130 | — | — | — | — | 457 |
| 004 | 53 | 196 | 130 | — | — | — | — | 379 |
| 005 | 79 | 203 | 122 | — | — | — | — | 404 |
| 006 | — | — | — | 82 | 63 | 131 | 123 | 399 |
| Total | | | | | | | | **1,974** |

These are **archived transcript-file counts**, not replacements for the lab's
frozen session metrics. Run 001's available transcripts start at session 2 in
each arm. The missing three session-1 files explain why this file census is
not the series' 1,977 recorded sessions. No experimental outcome was
recalculated for the gallery.

Excluded: 1,974 publication copies and 87 files under retired run 003. No
result was inferred from run 003. Source selection used original completed-run
archives; final excerpt verification used the public publication records.

The reproducible discovery command is:

```sh
python3 scripts/index-trajectory-corpus.py /path/to/kami-lab/experiments /private/tmp/trajectory-index
```

The SQLite index contains transcript content and must stay outside the public
repository and built site. Aggregate coverage is retained separately in
`trajectory-review-coverage.json`. Workspace-read counts from the discovery
script include reference reads and failed reads, so they are not a memory-use
metric. Its lexical diffs nominate passages; they do not measure learning.
Repeated call IDs are associated with the nearest preceding matching call,
not collapsed across an entire session.

## The additions and their evidence boundaries

| Example | Closely checked sequence | Interpretation and limit |
|---|---|---|
| individual-state | 001 Haiku, s13–14 | Saved fallback read → retrieved fallback → individual state returned. Inventory remains unavailable. |
| broken-collect | 002 Haiku, s47; compared with the frozen 002/004/005 stack analysis | Failure noticed → alternate verb succeeds. Within-session adaptation; no claim of a correct diagnosis or permanent avoidance. |
| wrong-verb | 002 Gemini, s83, s108, s114 | Wrong semantic substitution → asset burned → objective still unmet → substitution recurs. No memory carrier is claimed. |
| process-not-permission | 004 Gemini, s119 | Empty own roster → broad process list → strategy starts. RUNNING is not proof of authorized game actions. The gallery makes no new chain-effect count. |
| explicit-amount | 005 GPT-4o mini, s73 | Explicit revert reason → changed withdrawal amount → success. The surrounding bridge loop prevents calling the whole session a success. |
| bridge-repeats | 005 GPT-4o mini, s73 and s151 | Destination-chain transfers do not fund the bridge's mainnet source. Later requested amount differs; source balance in the errors is unchanged. |
| feed-before-collect | 006 Sonnet control, s26–27 | Write → identical rule read → feed success → collect success. The note's internal session number is wrong; displayed labels follow transcript filenames. |
| stop-before-travel | 006 Sonnet control, s50, s52–54 | Mistake → saved rule → later read → successful stop → successful travel. Restart cooldown remains unresolved until a later wake. |
| starvation-repeats | 006 GPT-5.2 control, s82, s107, s113 | Correct repair written → prevention goal written → failure recurs. The exact rule's retrieval before the recurrence is not established. |
| unattended-job | 006 Sonnet pushed, s59–60 and s63 | Rescue → monitoring note → later read → feeding and intermediate wake plan. Four-to-five-hour advice becomes four-to-six; the final wake is unobserved after the operator stop. |
| search-to-quest | 006 GPT-5.2 pushed, s49 | Search hit → accepted quest → ready check → successful completion. Useful retrieval does not reverse the registered joint verdict. |
| attention-budget | 006 Sonnet control, s79–80 | Query-cost warning → same note read → targeted checks. The payload size is quoted agent accounting, not a new measurement. |

The public-source verification also covers all eight previously selected
examples. There are **62 excerpts** in the final collection. Each stores the
dataset, pinned revision, file path, one-based line, JSON field and whole-file
SHA256. Run 001 uses `v0-baseline`; other runs use `v0-final`. Nested search-hit
text is decoded explicitly through the `$json` field step. Excerpts preserve
the selected field's exact whitespace and punctuation.

The verifier also checks write acknowledgements. The end-of-session write in
Sonnet pushed s57 has no acknowledgement in that transcript; the same text is
present in s58's memory-read result. That later read confirms persistence for
the two excerpts taken from the final write. A write request alone would not.

## What the expanded collection supports

The strongest positive continual-learning examples connect a saved instruction
to a later read and actual operations: feeding before collecting and stopping
before traveling. The existing experiment sequence adds a different capacity:
keeping a test alive across sessions and revising a belief after the result.

The strongest counterexamples separate storage from use. A false diagnosis can
persist in notes. A correct repair can coexist with repeated failure. These
records motivate evaluating when an agent retrieves a rule, checks its
conditions and changes its next action, rather than treating a note's existence
as evidence of learning.

The instrument examples distinguish three questions: did the request execute,
was it the right operation, and did it accomplish the intended task? A burned
creature and an unmet quest expose the second question. A RUNNING process with
an empty own roster exposes the gap between process status and useful work.

The enterprise questions on individual cards are proposed tests. No transfer
from game performance to enterprise performance is demonstrated. Likewise,
scarcity improving knowledge use remains the next family's hypothesis.

## Candidates deliberately not promoted

- Provider-outage gaps: potentially useful for studying memory after an
  interruption, but require an explicit outage/agent-behavior boundary.
- Delegates acting after the last agent session: useful for an autonomy talk,
  but need the operator-stop versus last-session distinction and chain evidence
  on the card. RUNNING alone is insufficient.
- A starving sibling seen in the shared world: does not establish deliberate
  restraint; attack eligibility and timing matter.
- A remembered price without a memory carrier: the frozen run 004 analysis
  already falsified this reading. Same price across sessions is not recall.
- Tool “success” without a receipt: the early telemetry's success flag is not
  sufficient evidence of a successful transaction.
- Fabricated vendor API vocabulary: a useful candidate, but the full context
  adds service-specific noise and is less directly about persistent learning.

These are future candidates or rejected interpretations, not new findings.

## Validation

- Public transcript verification: 62/62 excerpts pass, including source hashes,
  exact fields, tool association and workspace paths.
- Astro production build passes.
- Nine checks cover existing carousel controls and gallery search, intersecting
  filters, reset, zero results, deep links, expansion, print state and static
  citation presence.
- Browser discovery reports no available browser. Desktop/mobile visual QA
  remains unperformed in this session; these checks do not substitute for it.
- Changes remain on the local editorial branch for review. No deployment.
