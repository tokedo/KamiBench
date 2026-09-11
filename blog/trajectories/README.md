# Transcript excerpts for post 2

`learning-from-experience.json` is the content source for the eight examples
in [What agents remember, and what they do next](../2026-09-11-what-agents-remember.md).
The post places galleries with `<!-- TRAJECTORY:memory -->`,
`<!-- TRAJECTORY:stack -->`, and `<!-- TRAJECTORY:knowledge -->`.

Every step stores an exact substring of a transcript field, the public dataset,
the pinned `v0-final` revision, the file path, the one-based JSONL line number,
the JSON field path, and the whole-file SHA256. All excerpts were verified
against the public files, not only the local research copy. `memory-write`
quotes are from `workspace_write` arguments; `memory-read` quotes are from
the corresponding `workspace_read` result. An excerpt is not evidence that
the agent's assertion was correct. The step annotations and takeaways are
editorial explanations.

The renderer HTML-escapes quotes and inserts them after markdown processing.
It does not rewrite punctuation, linkify tool names, or interpret markdown
inside a quotation. Excerpts retain their original whitespace. Omitted context
is available through the original-transcript link on every step.

To verify again, download each referenced file from
`https://huggingface.co/datasets/KamiBench/<dataset>/resolve/v0-final/<path>`
into `<directory>/<dataset>/<path>`, then run:

```sh
python3 scripts/verify-trajectories.py <directory>
```

The galleries are complete HTML before enhancement. JavaScript adds native
horizontal scrolling, buttons, keyboard navigation, and a read-all toggle.
There is no autoplay or runtime dataset dependency. Print and no-JavaScript
views show all examples vertically.

The quest figure uses the lab's supplied frozen CSVs in `../figures/data/`.
`scripts/plot-006-quests.py` styles those series and the supplied stop boundaries;
it does not extract new experiment outcomes. Scientific corrections follow
the lab's September 11, 2026 errata: eight level-ups in sessions 60 (one),
70 (six in 37 seconds), and 74 (one); the control had access to documentation;
the treatment failed the joint rule but did produce useful quest behavior.
