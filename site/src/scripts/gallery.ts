// Native details preserve access without JavaScript. Enhancement adds discovery,
// stable links and a compact browsing view; no transcript fetches are required.
const gallery = document.querySelector<HTMLElement>('[data-research-gallery]');
if (gallery) {
  const entries = Array.from(gallery.querySelectorAll<HTMLDetailsElement>('[data-research-case]'));
  const form = gallery.querySelector<HTMLFormElement>('.gallery-filters')!;
  const search = form.elements.namedItem('q') as HTMLInputElement;
  const topic = form.elements.namedItem('topic') as HTMLSelectElement;
  const outcome = form.elements.namedItem('outcome') as HTMLSelectElement;
  const run = form.elements.namedItem('run') as HTMLSelectElement;
  const count = gallery.querySelector<HTMLElement>('[data-gallery-count]')!;
  const empty = gallery.querySelector<HTMLElement>('[data-gallery-empty]')!;
  const expand = gallery.querySelector<HTMLButtonElement>('[data-gallery-expand]')!;
  const searchable = new Map(entries.map((e) => [e, (e.textContent || '').toLowerCase()]));

  entries.forEach((e) => { e.open = false; });
  form.hidden = false;
  gallery.querySelector<HTMLElement>('.gallery-toolbar')!.hidden = false;

  function updateExpand() {
    const visible = entries.filter((e) => !e.hidden);
    const allOpen = visible.length > 0 && visible.every((e) => e.open);
    expand.disabled = visible.length === 0;
    expand.textContent = allOpen ? 'Collapse visible examples' : 'Expand visible examples';
    expand.setAttribute('aria-pressed', String(allOpen));
  }
  function filter() {
    const terms = search.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    entries.forEach((e) => {
      e.hidden = !terms.every((t) => searchable.get(e)!.includes(t))
        || !!topic.value && !e.dataset.topics!.split('|').includes(topic.value)
        || !!outcome.value && e.dataset.outcome !== outcome.value
        || !!run.value && e.dataset.run !== run.value;
    });
    const n = entries.filter((e) => !e.hidden).length;
    count.textContent = `${n} of ${entries.length} examples`;
    empty.hidden = n !== 0;
    updateExpand();
  }
  form.addEventListener('input', filter);
  form.addEventListener('change', filter);
  form.addEventListener('submit', (event) => event.preventDefault());
  form.addEventListener('reset', () => {
    // Reset values synchronously so hash navigation can reveal a filtered case.
    search.value = topic.value = outcome.value = run.value = '';
    filter();
  });
  expand.addEventListener('click', () => {
    const visible = entries.filter((e) => !e.hidden);
    const open = !visible.every((e) => e.open);
    visible.forEach((e) => { e.open = open; });
    updateExpand();
  });
  entries.forEach((e) => e.addEventListener('toggle', updateExpand));

  function followHash() {
    const entry = entries.find((e) => `#${e.dataset.caseId}` === location.hash);
    if (!entry) return;
    if (entry.hidden) form.reset();
    entry.open = true;
    requestAnimationFrame(() => entry.scrollIntoView({ block: 'start' }));
  }
  window.addEventListener('hashchange', followHash);
  // Clicking the same deep link twice must still reopen a manually closed case.
  gallery.addEventListener('click', (event) => {
    const link = (event.target as Element).closest('a');
    if (link?.getAttribute('href') === location.hash) followHash();
  });
  let printState: boolean[] = [];
  window.addEventListener('beforeprint', () => {
    printState = entries.map((e) => e.open);
    entries.forEach((e) => { if (!e.hidden) e.open = true; });
  });
  window.addEventListener('afterprint', () => {
    entries.forEach((e, i) => { e.open = printState[i] ?? e.open; });
  });
  filter();
  followHash();
}
