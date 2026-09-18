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
type Cost = { base: number; delta: number; cap: number; kind: 'bad' | 'ok'; label: string };
type Stage = { kind: 'stage'; session: number; date: string; beat: string; calls: Call[]; aside?: string; cost?: Cost; transcript: Source; note: Note };
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

function cost(c: Cost): string {
  const pct = (n: number) => `${((n / c.cap) * 100).toFixed(1)}%`;
  return `<div class="bh-cost" aria-label="${escape(c.label)}"><div class="bh-bar"><i style="width:${pct(c.base)}"></i><b class="bh-${c.kind}" style="left:${pct(c.base)};width:${pct(c.delta)}"></b></div><small>${escape(c.label)}</small></div>`;
}

function stage(s: Stage): string {
  return `<li class="bh-stage">
    <p class="bh-beat">${escape(s.beat)}</p>
    <div class="bh-row">
      <a class="bh-s" href="${hfUrl(s.transcript)}" title="Full session transcript on Hugging Face"><small>Session</small><b>${s.session}</b><small>${escape(s.date)}</small><small class="bh-s-link">transcript ↗</small></a>
      <div class="bh-did">${calls(s.calls)}${s.cost ? cost(s.cost) : ''}${s.aside ? `<p class="bh-aside">${escape(s.aside)}</p>` : ''}</div>
      <div class="bh-wrote">${note(s.note)}</div>
    </div>
  </li>`;
}

function gap(g: Gap): string {
  return `<li class="bh-gap"><span class="bh-dots" aria-hidden="true">···</span><span>${escape(g.text)}</span></li>`;
}

const TAB_LABELS: Record<string, string> = {
  'context-budget': 'Context budget',
  'tool-order': 'Order of operations',
  'long-goal': 'A long goal',
  'belief-correction': 'A corrected belief',
};

export function renderCase(c: Case, index: number): string {
  const rows = c.stages.map((s) => (s.kind === 'gap' ? gap(s) : stage(s))).join('\n');
  return `<section class="bh-card${index === 0 ? ' is-active' : ''}" id="${c.id}" role="tabpanel" aria-labelledby="${c.id}-tab" data-bh-panel="${c.id}">
    <header class="bh-head">
      <p class="label">Example ${index + 1} of ${cases.length} · run ${meta.run} · ${escape(meta.model)} · ${escape(meta.condition)} agent <span class="chip chip-pending">${meta.tier}</span></p>
      <h3 id="${c.id}-title">${escape(c.title)}</h3>
      <p class="bh-lede">${escape(c.lede)}</p>
    </header>
    <p class="bh-key">Each row: what to see, then the calls that matter and the note the agent wrote to itself, verbatim.</p>
    <ol class="bh-stages">${rows}</ol>
    <p class="bh-take"><strong>What it shows.</strong> ${escape(c.takeaway)}</p>
  </section>`;
}

/** Replace `<!-- BEHAVIORS -->` with one tabbed block holding all cards.
 * Without JavaScript the cards render stacked; the script shows one at a
 * time behind tabs, follows hash links, and switches on swipe and arrow keys. */
export function renderBehaviors(html: string): string {
  return html.replace(/<!-- BEHAVIORS -->/g, () => {
    const tabs = cases.map((c, i) => `<button type="button" role="tab" id="${c.id}-tab" aria-controls="${c.id}" aria-selected="${i === 0}" data-bh-tab="${c.id}"><span class="bh-tab-n">${i + 1}</span>${escape(TAB_LABELS[c.id] ?? c.title)}</button>`).join('');
    const panels = cases.map((c, i) => renderCase(c, i)).join('\n');
    return `<div class="bh-tabs" data-bh-tabs>
      <div class="bh-tablist" role="tablist" aria-label="Examples" hidden>${tabs}</div>
      ${panels}
      <p class="bh-swipe" hidden>Swipe or use ← → to move between examples</p>
    </div>`;
  });
}
