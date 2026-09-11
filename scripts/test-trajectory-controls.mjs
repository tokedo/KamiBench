// Exercise the actual built client script against a small DOM contract.
// This checks behavior and the resize regression; it is not browser/layout QA.
// Run after pnpm build: node --test scripts/test-trajectory-controls.mjs
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import test from 'node:test';

const html = readFileSync(new URL('../site/dist/blog/what-agents-remember/index.html', import.meta.url), 'utf8');
const script = [...html.matchAll(/<script type="module">([\s\S]*?)<\/script>/g)]
  .map((m) => m[1]).find((s) => s.includes('data-trajectory-gallery'));
assert.ok(script, 'The post must include its controls');

class Element {
  constructor() {
    this.listeners = new Map(); this.attributes = new Map(); this.style = {};
    this.classes = new Set(); this.hidden = true; this.disabled = false;
    this.classList = { add: (c) => this.classes.add(c), toggle: (c, on) => on ? this.classes.add(c) : this.classes.delete(c) };
  }
  setAttribute(k, v) { this.attributes.set(k, v); }
  addEventListener(type, fn) { this.listeners.set(type, fn); }
  fire(type, event = {}) { this.listeners.get(type)?.({ target: this, ...event }); }
}

function fixture(hash = '') {
  const gallery = new Element(); gallery.clientWidth = 340;
  const track = new Element(); track.scrollLeft = 0;
  const cards = ['first', 'second', 'third'].map((id, i) => {
    const card = new Element(); card.id = id; card.offsetLeft = i * 340;
    card.height = [520, 680, 590][i];
    card.getBoundingClientRect = () => ({ left: card.offsetLeft - track.scrollLeft, height: card.height });
    card.scrollIntoView = () => { card.wasScrolledIntoView = true; };
    return card;
  });
  const previous = new Element(), next = new Element(), toggle = new Element(), status = new Element();
  const choices = cards.map(() => new Element());
  const nodes = new Map([
    ['[data-trace-track]', track], ['[data-trace-prev]', previous], ['[data-trace-next]', next],
    ['[data-trace-all]', toggle], ['[data-trace-status]', status], ['.trace-swipe', new Element()],
    ['.trace-controls', new Element()], ['.trace-choices', new Element()],
  ]);
  gallery.querySelector = (s) => nodes.get(s);
  const evidence = cards.map(() => { const e = new Element(); e.open = false; return e; });
  gallery.querySelectorAll = (s) => s === '[data-trace-evidence]' ? evidence : choices;
  track.querySelectorAll = () => cards;
  track.getBoundingClientRect = () => ({ left: 0 });
  track.scrollCalls = [];
  track.scrollTo = (options) => { track.scrollCalls.push(options); track.scrollLeft = options.left; };
  const window = new Element();
  const location = { hash };
  const frames = [];
  let onResize;
  const observed = [];
  vm.runInNewContext(script, {
    document: { querySelectorAll: () => [gallery] }, window, location,
    matchMedia: () => ({ matches: false }),
    requestAnimationFrame: (fn) => { frames.push(fn); return frames.length; },
    ResizeObserver: class { constructor(fn) { onResize = fn; } observe(e) { observed.push(e); } },
  });
  return { gallery, track, cards, evidence, observed, previous, next, toggle, status, choices, location, window,
    resize: () => onResize(), flush: () => { while (frames.length) frames.shift()(); } };
}

test('buttons and keyboard navigate within bounds', () => {
  const f = fixture();
  assert.equal(f.previous.disabled, true);
  f.next.fire('click');
  assert.equal(f.status.textContent, '2 / 3');
  assert.equal(f.track.scrollLeft, 340);
  f.track.fire('keydown', { key: 'End', preventDefault() {} });
  assert.equal(f.status.textContent, '3 / 3'); assert.equal(f.next.disabled, true);
  f.track.fire('keydown', { key: 'Home', preventDefault() {} });
  assert.equal(f.track.scrollLeft, 0);
  const count = f.track.scrollCalls.length;
  f.track.fire('keydown', { key: 'ArrowRight', target: {}, preventDefault() {} });
  assert.equal(f.track.scrollCalls.length, count, 'Do not steal arrow keys from child controls');
});

test('read-all mode preserves selection and all source content', () => {
  const f = fixture(); f.choices[2].fire('click'); f.toggle.fire('click');
  assert.equal(f.gallery.classes.has('show-all'), true);
  assert.equal(f.track.style.height, ''); assert.equal(f.toggle.attributes.get('aria-pressed'), 'true');
  assert.equal(f.previous.disabled, true); assert.equal(f.next.disabled, true);
  f.toggle.fire('click');
  assert.equal(f.status.textContent, '3 / 3'); assert.equal(f.track.scrollLeft, 680);
});

test('height changes do not interrupt a smooth scroll', () => {
  const f = fixture(); f.next.fire('click');
  const count = f.track.scrollCalls.length;
  f.resize();
  assert.equal(f.track.scrollCalls.length, count);
  f.gallery.clientWidth = 390; f.cards.forEach((card, i) => { card.offsetLeft = i * 390; });
  f.resize();
  assert.equal(f.track.scrollLeft, 390, 'Keep the selected example after a width change');
});

test('swiping updates the selection and height', () => {
  const f = fixture(); f.track.scrollLeft = 680; f.track.fire('scroll'); f.flush();
  assert.equal(f.status.textContent, '3 / 3'); assert.equal(f.next.disabled, true);
  assert.equal(f.track.style.height, '590px');
});

test('per-example links select the right slide', () => {
  const f = fixture('#second');
  assert.equal(f.track.scrollLeft, 340);
  f.location.hash = '#third'; f.window.fire('hashchange');
  assert.equal(f.track.scrollLeft, 680);
});


test('expanding evidence resizes its observed card without re-scrolling', () => {
  const f = fixture();
  assert.ok(f.cards.every((card) => f.observed.includes(card)));
  const calls = f.track.scrollCalls.length;
  f.cards[0].height = 1800;
  f.resize();
  assert.equal(f.track.style.height, '1800px');
  assert.equal(f.track.scrollCalls.length, calls);
  f.cards[0].height = 520;
  f.resize();
  assert.equal(f.track.style.height, '520px');
});

test('printing opens all source excerpts and restores their state', () => {
  const f = fixture(); f.evidence[1].open = true;
  f.window.fire('beforeprint');
  assert.ok(f.evidence.every((e) => e.open));
  f.window.fire('afterprint');
  assert.deepEqual(f.evidence.map((e) => e.open), [false, true, false]);
});
