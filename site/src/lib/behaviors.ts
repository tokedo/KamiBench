// Renders the four "emergent behavior" cards in blog post 2 from
// ../blog/trajectories/behaviors.json (single content source). A post places
// a card with `<!-- BEHAVIOR:<id> -->`.
//
// Each card: a title naming the behavior in general terms, a short lede, then
// one row per selected session. A row pairs a plain-language beat (what the
// reader should see) with the evidence: the tool calls that matter, with what
// they returned, and the note the agent wrote to its own workspace file,
// verbatim. Quotes are stored as verbatim segments of one transcript field and
// joined here with an ellipsis; nothing inside a segment is rewritten. Every
// quote links to its line in the public transcript at a pinned revision.
import records from '../../../blog/trajectories/behaviors.json';

type Pill = { kind: 'ok' | 'err' | 'wk' | 'short' | 'long' | 'val' | 'low'; text?: string };
type Call = { name: string; pill: Pill };
type Source = { dataset: string; revision: string; path: string; line: number; field?: string; sha256?: string };
type Note =
  | { kind: 'empty'; text: string }
  | { kind: 'obs' | 'rule' | 'soft'; tag: string; quote: string[]; why?: string; source: Source };
type Stage = { kind: 'stage'; session: number; date: string; beat: string; calls: Call[]; aside?: string; transcript: Source; note: Note };
type Gap = { kind: 'gap'; text: string };
type Case = { id: string; title: string; lede: string; stages: (Stage | Gap)[]; takeaway: string };

const meta = records.meta;
const cases = records.cases as Case[];

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const hfUrl = (s: Source) => `https://huggingface.co/datasets/KamiBench/${s.dataset}/blob/${s.revision}/${s.path}#L${s.line}`;

const WRENCH = '<svg class="bh-wr" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a4 4 0 0 0 5 5L9 22l-3-3L16.7 8.3a4 4 0 0 0-2-2z"/><path d="M14.7 6.3 18 3l3 3-3.3 3.3"/></svg>';

function pill(p: Pill): string {
  if (p.kind === 'ok') return '<span class="bh-st bh-ok" aria-label="succeeded"></span>';
  if (p.kind === 'err') return '<span class="bh-st bh-err">error</span>';
  return `<span class="bh-st bh-${p.kind}">${escape(p.text ?? '')}</span>`;
}

function calls(list: Call[]): string {
  return `<ol class="bh-calls">${list.map((c) => {
    const cls = c.pill.kind === 'err' ? ' class="bh-bad"' : c.name.startsWith('set_next_wake') ? ' class="bh-wake"' : '';
    return `<li${cls}>${WRENCH}<span class="bh-nm">${escape(c.name)}</span>${pill(c.pill)}</li>`;
  }).join('')}</ol>`;
}

function note(n: Note): string {
  if (n.kind === 'empty') return `<div class="bh-note bh-empty">${escape(n.text)}</div>`;
  const quote = n.quote.map((q) => escape(q.replace(/\s+/g, ' '))).join(' … ');
  return `<div class="bh-note bh-${n.kind}"><span class="bh-tag">${escape(n.tag)}</span>
    <blockquote class="bh-q"><p>“${quote}”</p></blockquote>
    ${n.why ? `<p class="bh-why">${escape(n.why)}</p>` : ''}
    <a class="bh-src" href="${hfUrl(n.source)}">notes.md as written · transcript line ${n.source.line}<span class="visually-hidden"> (Hugging Face, opens in a new tab)</span> ↗</a>
  </div>`;
}

function stage(s: Stage): string {
  return `<li class="bh-stage">
    <p class="bh-beat">${escape(s.beat)}</p>
    <div class="bh-row">
      <div class="bh-s"><small>Session</small><b>${s.session}</b><small>${escape(s.date)}</small></div>
      <div class="bh-did">${calls(s.calls)}${s.aside ? `<p class="bh-aside">${escape(s.aside)}</p>` : ''}
        <a class="bh-src" href="${hfUrl(s.transcript)}">full session transcript<span class="visually-hidden"> (Hugging Face, opens in a new tab)</span> ↗</a></div>
      <div class="bh-wrote">${note(s.note)}</div>
    </div>
  </li>`;
}

function gap(g: Gap): string {
  return `<li class="bh-gap"><span class="bh-dots" aria-hidden="true">···</span><span>${escape(g.text)}</span></li>`;
}

export function renderCase(c: Case, index: number): string {
  const rows = c.stages.map((s) => (s.kind === 'gap' ? gap(s) : stage(s))).join('\n');
  const stages = c.stages.filter((s): s is Stage => s.kind === 'stage');
  const beats = stages.map((s) => `<li><span class="bh-beat-n">Session ${s.session}</span>${escape(s.beat)}</li>`).join('');
  return `<section class="bh-card" id="${c.id}" aria-labelledby="${c.id}-title">
    <header class="bh-head">
      <p class="label">Example ${index + 1} · run ${meta.run} · ${escape(meta.model)} · ${escape(meta.condition)} agent <span class="chip chip-pending">${meta.tier}</span></p>
      <h3 id="${c.id}-title">${escape(c.title)}</h3>
      <p class="bh-lede">${escape(c.lede)}</p>
    </header>
    <ol class="bh-beats">${beats}</ol>
    <details class="bh-evidence"${index === 0 ? ' open' : ''}>
      <summary>See the ${stages.length} sessions <span>· the calls that matter, and the note the agent wrote to itself, verbatim</span></summary>
      <ol class="bh-stages">${rows}</ol>
    </details>
    <p class="bh-take"><strong>What it shows.</strong> ${escape(c.takeaway)}</p>
  </section>`;
}

/** Replace `<!-- BEHAVIOR:id -->` markers with cards, after markdown processing. */
export function renderBehaviors(html: string): string {
  return html.replace(/<!-- BEHAVIOR:([a-z-]+) -->/g, (_, id: string) => {
    const i = cases.findIndex((c) => c.id === id);
    if (i < 0) throw new Error(`Unknown behavior card: ${id}`);
    return renderCase(cases[i]!, i);
  });
}
