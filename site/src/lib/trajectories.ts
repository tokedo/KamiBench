import galleries from '../../../blog/trajectories/learning-from-experience.json';

export const trajectoryCases = galleries.flatMap((g) => g.cases);
export type TrajectoryCase = typeof trajectoryCases[number];

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

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
    const href = `https://huggingface.co/datasets/KamiBench/${s.dataset}/blob/${s.revision}/${s.path}#L${s.line}`;
    const kind = step.kind === 'memory-write' ? `Memory write · ${step.workspace}`
      : step.kind === 'memory-read' ? `Memory read · ${step.workspace}`
      : step.kind === 'agent' ? 'Agent text' : `Tool result · ${'tool' in step ? step.tool : ''}`;
    return `<li class="trace-step"><div class="trace-step-meta"><span class="trace-step-number" aria-hidden="true">${i + 1}</span><span>Session ${step.session} · ${escape(kind)}</span></div>
      <h4>${escape(step.label)}</h4><blockquote class="trace-quote"><p>${escape(step.quote)}</p></blockquote>
      <p class="trace-annotation">${escape(step.note)}</p><a class="trace-source" href="${href}" target="_blank" rel="noopener noreferrer">Original transcript · line ${s.line}<span class="visually-hidden">, session ${step.session}, ${escape(example.arm)} (Hugging Face, opens in a new tab)</span> ↗</a></li>`;
  }).join('\n');
  return `<article class="trace-case" id="${example.id}" aria-labelledby="${example.id}-title" data-trace-case>
    ${catalog ? '' : `<div class="trace-case-meta"><span class="chip ${example.tier === 'REGISTERED' ? 'chip-ok' : 'chip-pending'}">${example.tier}</span><span>Run ${example.run} · ${escape(example.model)}</span></div>
    <h3 id="${example.id}-title">${escape(example.title)}</h3>`}<p class="trace-intro">${escape(example.intro)}</p>
    <ol class="trace-steps">${steps}</ol><div class="trace-takeaway"><p><strong>What the sequence shows.</strong> ${escape(example.takeaway)}</p></div>
    ${catalog ? `<p class="trace-question"><strong>Question beyond the game.</strong> ${escape(example.question)} This is a proposed test, not demonstrated transfer.</p>` : ''}
    <p class="trace-record">${escape(example.arm)} · <a href="#${example.id}" aria-label="Link to example: ${escape(example.title)}">Link to this example</a></p></article>`;
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
      <p class="trace-guide">Verbatim excerpts from public transcripts. The explanations around them are ours. Each source opens the session file at a pinned dataset revision.</p></header>
      <div class="trace-controls" hidden><div class="trace-paging"><button type="button" data-trace-prev aria-label="Previous example" aria-controls="${prefix}-track">←</button><span data-trace-status aria-live="polite" aria-atomic="true">1 / ${gallery.cases.length}</span><button type="button" data-trace-next aria-label="Next example" aria-controls="${prefix}-track">→</button></div><button type="button" class="trace-toggle" data-trace-all aria-pressed="false" aria-controls="${prefix}-track">Read all examples</button></div>
      <div class="trace-choices" hidden aria-label="Choose an example">${gallery.cases.map((c, i) => `<button type="button" data-trace-index="${i}" aria-controls="${c.id}" aria-pressed="${i === 0}">${i + 1}. ${escape(c.title)}</button>`).join('')}</div>
      <div class="trace-track" id="${prefix}-track" data-trace-track>${cases}</div>
      <p class="trace-swipe" hidden>Swipe to explore · Arrow keys also work when the examples are focused</p></section>`;
  });
}
