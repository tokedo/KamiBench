import galleries from '../../../blog/trajectories/learning-from-experience.json';

export const trajectoryCases = galleries.flatMap((g) => g.cases);
export type TrajectoryCase = typeof trajectoryCases[number];

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

type Step = TrajectoryCase['steps'][number];
const kinds = {
  'memory-write': { label: 'Saved to persistent memory', detail: 'File write · survives the session', icon: 'M4 2h9l5 5v15H4z M13 2v6h5 M8 13h6 M11 10v6' },
  'memory-read': { label: 'Retrieved from persistent memory', detail: 'File read · brings a saved note into this session', icon: 'M4 2h9l5 5v15H4z M13 2v6h5 M7 14h8 M12 11l3 3-3 3' },
  agent: { label: 'Agent commentary', detail: 'In-session text · not a saved note', icon: 'M3 3h18v14H9l-6 4z M7 8h10 M7 12h7' },
  tool: { label: 'Tool response', detail: 'In-session observation · not a saved note', icon: 'M3 4h18v16H3z M7 9l3 3-3 3 M13 15h4' },
  activity: { label: 'Commentary + tools', detail: 'In-session activity · not a saved note', icon: 'M3 4h18v16H3z M7 9l3 3-3 3 M13 15h4' },
};
type Kind = keyof typeof kinds;
const badge = (kind: Kind) => `<span class="trace-kind"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="${kinds[kind].icon}"/></svg>${kinds[kind].label}</span>`;
const sourceUrl = (step: Step) => {
  const s = step.source;
  return `https://huggingface.co/datasets/KamiBench/${s.dataset}/blob/${s.revision}/${s.path}#L${s.line}`;
};
const sourceLink = (step: Step, label: string) => `<a class="trace-source" href="${sourceUrl(step)}" target="_blank" rel="noopener noreferrer">${label}<span class="visually-hidden">, session ${step.session} (Hugging Face, opens in a new tab)</span> ↗</a>`;

export const trajectoryLegend = `<div class="trace-legend" aria-label="How to read the examples">
  <span data-kind="agent">${badge('agent')}<small>Text within a session</small></span>
  <span data-kind="tool">${badge('tool')}<small>A returned observation</small></span>
  <span data-kind="memory-write">${badge('memory-write')}<small>A note written to a file</small></span>
  <span data-kind="memory-read">${badge('memory-read')}<small>A saved file read back</small></span>
</div>`;

/** The visual story is editorial; only blockquotes contain verbatim agent text. */
function renderStory(example: TrajectoryCase): string {
  const sessions: { session: number; beats: TrajectoryCase['story'][number][] }[] = [];
  for (const beat of example.story) {
    const session = example.steps[beat.steps[0]].session;
    const previous = sessions.at(-1);
    if (previous?.session === session) previous.beats.push(beat);
    else sessions.push({ session, beats: [beat] });
  }
  const blocks = sessions.map(({ session, beats }, index) => {
    const previous = sessions[index - 1]?.session;
    const sessionLabel = previous === undefined ? `Session ${session}`
      : session === previous + 1 ? `Next session · ${session}` : `Later session · ${session}`;
    const sessionId = `${example.id}-session-${session}`;
    const content = beats.map((beat) => {
      const sources = beat.steps.map((i) => example.steps[i]);
      const types = [...new Set(sources.map((s) => s.kind))];
      const kind: Kind = types.length === 1 ? types[0] as Kind : 'activity';
      const highlight = 'highlight' in beat && beat.highlight;
      const highlightedStep = 'highlightStep' in beat ? example.steps[beat.highlightStep!] : undefined;
      return `<div class="trace-beat" data-kind="${kind}"><div class="trace-beat-body">
        ${badge(kind)}<h4>${escape(beat.title)}</h4><p class="trace-beat-text">${escape(beat.text)}</p>
        ${highlight && highlightedStep ? `<div class="trace-note"><p class="trace-note-label">Verbatim note · <code>${escape(highlightedStep.workspace || '')}</code></p><blockquote><p>${escape(highlight)}</p></blockquote></div>` : ''}
        <div class="trace-beat-sources">${sources.map((s) => sourceLink(s, `Transcript · line ${s.source.line}`)).join('')}</div>
        </div></div>`;
    }).join('');
    return `<li class="trace-session-block${index > 0 ? ' trace-session-break' : ''}" data-session="${session}" aria-labelledby="${sessionId}">
      <p class="trace-session" id="${sessionId}">${sessionLabel}</p><div class="trace-session-beats">${content}</div></li>`;
  }).join('');
  const writes = example.steps.some((s) => s.kind === 'memory-write');
  const reads = example.steps.some((s) => s.kind === 'memory-read');
  const scope = writes && reads ? 'Memory evidence: a saved note and a later read are both shown.'
    : writes ? 'Memory evidence: writes are shown. A later read is not shown in these excerpts.'
    : 'Session activity: no persistent-memory write or read is shown in these excerpts.';
  return `<p class="trace-story-label">The sequence <span>· editorial summary</span></p>
    <ol class="trace-story" data-beats="${example.story.length}">${blocks}</ol><p class="trace-scope">${scope}</p>`;
}

/** Shared verbatim record for embedded carousels and the research gallery. */
export function renderTrajectoryCase(example: TrajectoryCase, catalog = false): string {
  const steps = example.steps.map((step, i) => {
    const s = step.source;
    if (!/^experiment-00[12456]-(budget-boxed|knowledge-delivery)$/.test(s.dataset)
      || s.revision !== (s.dataset.startsWith('experiment-001-') ? 'v0-baseline' : 'v0-final')
      || !/^[a-z0-9_]+\/transcripts\/session-\d{4}\.jsonl$/.test(s.path)
      || !Number.isInteger(s.line) || s.line < 1 || !step.quote.trim()) {
      throw new Error(`Invalid transcript source: ${example.id}, step ${i + 1}`);
    }
    const kind = step.kind as Kind;
    const file = 'workspace' in step && step.workspace ? step.workspace : 'tool' in step ? step.tool : '';
    return `<li class="trace-step" data-kind="${kind}"><div class="trace-step-meta"><span class="trace-step-number" aria-hidden="true">${i + 1}</span><span>Session ${step.session}</span>${badge(kind)}</div>
      <p class="trace-step-context">${kinds[kind].detail}${file ? ` · <code>${escape(file)}</code>` : ''}</p>
      <h4>${escape(step.label)}</h4><blockquote class="trace-quote"><p>${escape(step.quote)}</p></blockquote>
      <p class="trace-annotation">${escape(step.note)}</p>${sourceLink(step, `Original transcript · line ${s.line}`)}</li>`;
  }).join('\n');
  return `<article class="trace-case" id="${example.id}" aria-labelledby="${example.id}-title" data-trace-case>
    ${catalog ? '' : `<div class="trace-case-meta"><span class="chip ${example.tier === 'REGISTERED' ? 'chip-ok' : 'chip-pending'}">${example.tier}</span><span>Run ${example.run} · ${escape(example.model)}</span><a class="trace-permalink" href="#${example.id}" aria-label="Link to example: ${escape(example.title)}">Link to this example</a></div>
    <h3 id="${example.id}-title">${escape(example.title)}</h3>`}<p class="trace-intro">${escape(example.intro)}</p>
    ${renderStory(example)}<div class="trace-takeaway"><p><strong>What the sequence shows.</strong> ${escape(example.takeaway)}</p></div>
    <details class="trace-evidence" data-trace-evidence><summary>Read the ${example.steps.length} source excerpts <span>· verbatim transcripts &amp; annotations</span></summary><ol class="trace-steps">${steps}</ol></details>
    ${catalog ? `<p class="trace-question"><strong>Question beyond the game.</strong> ${escape(example.question)} This is a proposed test, not demonstrated transfer.</p>` : ''}
    </article>`;
}

/** Excerpts stay in the source record. Neither markdown nor linkification may
 * rewrite a quote; insert the escaped viewer after those transformations. */
export function renderTrajectories(html: string): string {
  return html.replace(/<!-- TRAJECTORY:([a-z-]+) -->/g, (_, id: string) => {
    const gallery = galleries.find((g) => g.id === id);
    if (!gallery) throw new Error(`Unknown trajectory gallery: ${id}`);
    const prefix = `traces-${id}`;
    const cases = gallery.cases.map((example) => renderTrajectoryCase(example)).join('\n');
    return `<section class="trajectory-gallery" id="${prefix}" aria-labelledby="${prefix}-title" data-trajectory-gallery>
      <header class="trace-gallery-header"><p class="label">From the agents’ own records</p><h3 id="${prefix}-title">${escape(gallery.title)}</h3>
      <p class="trace-guide">Read the short sequence first, then open the source excerpts. Quoted notes are verbatim; the summaries are ours. Every HF link opens a public transcript at a pinned revision.</p></header>
      <div class="trace-controls" hidden><div class="trace-paging"><button type="button" data-trace-prev aria-label="Previous example" aria-controls="${prefix}-track">←</button><span data-trace-status aria-live="polite" aria-atomic="true">1 / ${gallery.cases.length}</span><button type="button" data-trace-next aria-label="Next example" aria-controls="${prefix}-track">→</button></div><button type="button" class="trace-toggle" data-trace-all aria-pressed="false" aria-controls="${prefix}-track">Read all examples</button></div>
      <div class="trace-choices" hidden aria-label="Choose an example">${gallery.cases.map((c, i) => `<button type="button" data-trace-index="${i}" aria-controls="${c.id}" aria-pressed="${i === 0}">${i + 1}. ${escape(c.title)}</button>`).join('')}</div>
      <div class="trace-track" id="${prefix}-track" data-trace-track>${cases}</div>
      <p class="trace-swipe" hidden>Swipe to explore · Arrow keys also work when the examples are focused</p></section>`;
  });
}
