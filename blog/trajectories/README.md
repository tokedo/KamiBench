# Transcript excerpts and research gallery

`learning-from-experience.json` is the single content source for twenty examples.
Twelve appear in [What agents remember, and what they do next](../2026-09-10-what-agents-remember.md);
all twenty appear at `/gallery`. The `archive` group is gallery-only.
The post places galleries with `<!-- TRAJECTORY:memory -->`,
`<!-- TRAJECTORY:stack -->`, and `<!-- TRAJECTORY:knowledge -->`.

Every step stores an exact substring of a transcript field, the public dataset,
the pinned revision (`v0-baseline` for run 001, `v0-final` for the other runs),
the file path, the one-based JSONL line number,
the JSON field path, and the whole-file SHA256. All excerpts were verified
against the public files, not only the local research copy. `memory-write`
quotes are from `workspace_write` arguments; `memory-read` quotes are from
the corresponding `workspace_read` result. An excerpt is not evidence that
the agent's assertion was correct. The step annotations and takeaways are
editorial explanations. `content.$json.hits.0.text` means decode the JSON in
the content string and select the first search hit's text. No other quote
normalization is permitted.

Outcome labels describe the selected sequence, not the model or run. All
gallery interpretations are exploratory. Topic labels and questions beyond
the game are editorial aids, not benchmark outcomes or demonstrated transfer.
The collection's coverage and selection limits are recorded in
`research/trajectory-review-2026-09-11.md`.

The renderer HTML-escapes quotes and inserts them after markdown processing.
It does not rewrite punctuation, linkify tool names, or interpret markdown
inside a quotation. Excerpts retain their original whitespace. Omitted context
is available through the original-transcript link on every step.

To verify again, download each referenced file from
`https://huggingface.co/datasets/KamiBench/<dataset>/resolve/<revision>/<path>`
into `<directory>/<dataset>/<path>`, then run:

```sh
python3 scripts/verify-trajectories.py <directory>
```

The galleries are complete HTML before enhancement. JavaScript adds native
horizontal scrolling, buttons, keyboard navigation, and a read-all toggle.
There is no autoplay or runtime dataset dependency. Print and no-JavaScript
views show all examples vertically.

The full gallery uses native expandable records with search and topic,
outcome and run filters. Every example has a stable fragment URL. Without
JavaScript all records are expanded. Printing expands the currently filtered
selection and restores the prior open state afterward. `/gallery.json`
exports the same source records for reuse; it is generated at build time.

The quest figure uses the lab's supplied frozen CSVs in `../figures/data/`.
`scripts/plot-006-quests.py` styles those series and the supplied stop boundaries;
it does not extract new experiment outcomes. Scientific corrections follow
the lab's September 11, 2026 errata: eight level-ups in sessions 60 (one),
70 (six in 37 seconds), and 74 (one); the control had access to documentation;
the treatment failed the joint rule but did produce useful quest behavior.
