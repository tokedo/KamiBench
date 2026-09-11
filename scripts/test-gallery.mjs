// Behavior checks for the actual built script, not a substitute for browser QA.
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import test from 'node:test';

const html = readFileSync(new URL('../site/dist/gallery/index.html', import.meta.url), 'utf8');
const script = [...html.matchAll(/<script type="module">([\s\S]*?)<\/script>/g)]
  .map((m) => m[1]).find((s) => s.includes('data-research-gallery'));
assert.ok(script);

class Element {
  listeners = new Map(); attributes = new Map(); hidden = false;
  addEventListener(name, fn) { this.listeners.set(name, fn); }
  fire(name, extra = {}) { this.listeners.get(name)?.({ target: this, ...extra }); }
  setAttribute(name, value) { this.attributes.set(name, value); }
  scrollIntoView() { this.scrolled = true; }
}
function fixture(hash = '') {
  const entries = [
    { caseId: 'procedure', topics: 'Memory|Planning', outcome: 'Success', run: '006' },
    { caseId: 'failure', topics: 'Memory|Stack', outcome: 'Failure', run: '004' },
    { caseId: 'repair', topics: 'Tool feedback|Stack', outcome: 'Success', run: '005' },
  ].map((dataset) => Object.assign(new Element(), { dataset, open: true, textContent: `${dataset.caseId} ${dataset.topics}` }));
  const form = new Element();
  const fields = Object.fromEntries(['q', 'topic', 'outcome', 'run'].map((k) => [k, { value: '' }]));
  form.elements = { namedItem: (k) => fields[k] };
  form.reset = () => form.fire('reset');
  const expand = new Element(), count = new Element(), empty = new Element(), toolbar = new Element();
  const nodes = new Map([
    ['.gallery-filters', form], ['[data-gallery-count]', count], ['[data-gallery-empty]', empty],
    ['[data-gallery-expand]', expand], ['.gallery-toolbar', toolbar],
  ]);
  const gallery = new Element();
  gallery.querySelector = (selector) => nodes.get(selector);
  const evidence = entries.map(() => Object.assign(new Element(), { open: false }));
  gallery.querySelectorAll = (s) => s === '[data-trace-evidence]' ? evidence : entries;
  const window = new Element(), location = { hash };
  vm.runInNewContext(script, {
    document: { querySelector: () => gallery }, window, location,
    requestAnimationFrame: (fn) => fn(),
  });
  return { entries, evidence, fields, form, expand, count, empty, gallery, window, location };
}

test('search and facets intersect; zero results can be reset', () => {
  const f = fixture();
  assert.ok(f.entries.every((e) => !e.open));
  f.fields.topic.value = 'Memory'; f.fields.outcome.value = 'Success'; f.form.fire('change');
  assert.deepEqual(f.entries.map((e) => e.hidden), [false, true, true]);
  f.fields.run.value = '004'; f.form.fire('change');
  assert.equal(f.count.textContent, '0 of 3 examples');
  assert.equal(f.empty.hidden, false); assert.equal(f.expand.disabled, true);
  f.form.reset();
  f.fields.q.value = '  REPAIR stack '; f.form.fire('input');
  assert.deepEqual(f.entries.map((e) => e.hidden), [true, true, false]);
});

test('links reveal filtered records and reopen a closed record', () => {
  const f = fixture('#procedure');
  assert.equal(f.entries[0].open, true); assert.equal(f.entries[0].scrolled, true);
  f.fields.outcome.value = 'Failure'; f.form.fire('change');
  f.location.hash = '#repair'; f.window.fire('hashchange');
  assert.equal(f.entries[2].hidden, false); assert.equal(f.entries[2].open, true);
  assert.equal(f.fields.outcome.value, '');
  f.entries[2].open = false;
  f.gallery.fire('click', { target: { closest: () => ({ getAttribute: () => '#repair' }) } });
  assert.equal(f.entries[2].open, true);
});

test('bulk expansion and printing preserve the selected subset and open state', () => {
  const f = fixture();
  f.fields.topic.value = 'Memory'; f.form.fire('change');
  f.expand.fire('click');
  assert.deepEqual(f.entries.map((e) => e.open), [true, true, false]);
  f.expand.fire('click');
  f.entries[0].open = true;
  f.evidence[0].open = true;
  f.window.fire('beforeprint');
  assert.ok(f.evidence.every((e) => e.open));
  assert.deepEqual(f.entries.map((e) => e.open), [true, true, false]);
  assert.equal(f.entries[2].hidden, true);
  f.window.fire('afterprint');
  assert.deepEqual(f.evidence.map((e) => e.open), [true, false, false]);
  assert.deepEqual(f.entries.map((e) => e.open), [true, false, false]);
});

test('all source records and citations exist in static HTML without enhancement', () => {
  const data = JSON.parse(readFileSync(new URL('../site/dist/gallery.json', import.meta.url), 'utf8'));
  assert.equal(data.cases.length, 20);
  for (const c of data.cases) {
    assert.ok(html.includes(`id="${c.id}"`), c.id);
    for (const step of c.steps) {
      const s = step.source;
      assert.ok(html.includes(`/blob/${s.revision}/${s.path}#L${s.line}`), `${c.id}: ${s.path}`);
    }
  }
  assert.equal((html.match(/<details[^>]*\sopen(?:\s|>)/g) || []).length, 20);
});


test('visual stories keep session activity distinct from persistent memory', () => {
  const data = JSON.parse(readFileSync(new URL('../site/dist/gallery.json', import.meta.url), 'utf8'));
  assert.equal((html.match(/class="trace-story"/g) || []).length, 20);
  assert.equal((html.match(/data-trace-evidence/g) || []).length >= 20, true);
  const escape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  for (const c of data.cases) {
    const article = html.split(`id="${c.id}" aria-labelledby=`)[1].split('</article>')[0];
    const story = article.split('class="trace-story"')[1].split('</ol>')[0];
    assert.equal((story.match(/class="trace-beat(?: trace-session-break)?"/g) || []).length, c.story.length);
    for (const b of c.story) {
      assert.ok(story.includes(escape(b.title)));
      if (b.highlight) assert.ok(story.includes(escape(b.highlight)));
    }
    const writes = c.steps.some((s) => s.kind === 'memory-write');
    const reads = c.steps.some((s) => s.kind === 'memory-read');
    if (writes) assert.ok(story.includes('Saved to persistent memory'));
    if (reads) assert.ok(story.includes('Retrieved from persistent memory'));
    if (writes && !reads) assert.ok(article.includes('A later read is not shown'));
    if (!writes && !reads) assert.ok(article.includes('no persistent-memory write or read is shown'));
    const sessions = c.story.map((b) => c.steps[b.steps[0]].session);
    const sessionGroups = sessions.filter((n, i) => i === 0 || n !== sessions[i - 1]);
    assert.deepEqual([...story.matchAll(/data-session="(\d+)"/g)].map((m) => Number(m[1])), sessionGroups);
    assert.equal((story.match(/class="trace-session-beats"/g) || []).length, sessionGroups.length);
    assert.ok(!story.includes('Same session'), 'Same-session actions share one session block');
    assert.equal((story.match(/trace-session-break/g) || []).length,
      sessions.filter((n, i) => i > 0 && n !== sessions[i - 1]).length);
  }
});
