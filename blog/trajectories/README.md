# Behavior cards

`behaviors.json` is the single content source for the four example cards in
[What agents remember, and what they do next](../2026-09-10-what-agents-remember.md).
The post places a card with `<!-- BEHAVIOR:<id> -->`; the renderer is
`site/src/lib/behaviors.ts`.

All four cards come from one arm: run 006, Sonnet 5, control condition
(`sonnet5_control` in the public dataset `experiment-006-knowledge-delivery`,
revision `v0-final`). The card titles, beats, asides, tags, ledes and
takeaways are editorial. Quotes are the agent's own words from the
`workspace_write` call that wrote `notes.md` in that session, stored as one or
more verbatim segments of that single field and joined with an ellipsis when
rendered; whitespace is collapsed for display and nothing else is changed.
Every quote carries the dataset, revision, file path, one-based JSONL line,
JSON field path and whole-file SHA256; every stage links the full session
file. Tool-call rows list the calls that matter for the beat, with a short
label of what they returned; they are a selection, not the session's full
call list. Token figures on pills are the change in prompt size between the
model call before and after the tool result, from the run's telemetry.

An excerpt is not evidence that the agent's assertion was correct. All
interpretations on the cards are exploratory (one agent, one run). The
delegation service used by the agent is not named on public pages; a quote
segment may start or end so as to omit it.

To verify, download each referenced file from
`https://huggingface.co/datasets/KamiBench/<dataset>/resolve/<revision>/<path>`
into `<directory>/<dataset>/<path>`, then run:

```sh
python3 scripts/verify-trajectories.py <directory>
```

The generator that produced the file from the lab's transcript copies lives in
the lab repo; the public file is the record.
