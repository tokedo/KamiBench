// Progressive enhancement: without JavaScript every excerpt and citation is
// ordinary document content. No library, autoplay, network request, or storage.
for (const gallery of document.querySelectorAll<HTMLElement>('[data-trajectory-gallery]')) {
  const track = gallery.querySelector<HTMLElement>('[data-trace-track]')!;
  const cases = Array.from(track.querySelectorAll<HTMLElement>('[data-trace-case]'));
  const previous = gallery.querySelector<HTMLButtonElement>('[data-trace-prev]')!;
  const next = gallery.querySelector<HTMLButtonElement>('[data-trace-next]')!;
  const toggle = gallery.querySelector<HTMLButtonElement>('[data-trace-all]')!;
  const status = gallery.querySelector<HTMLElement>('[data-trace-status]')!;
  const choices = Array.from(gallery.querySelectorAll<HTMLButtonElement>('[data-trace-index]'));
  const swipe = gallery.querySelector<HTMLElement>('.trace-swipe')!;
  let current = 0;
  let showAll = false;
  let frame = 0;

  gallery.classList.add('is-enhanced');
  gallery.querySelector<HTMLElement>('.trace-controls')!.hidden = false;
  gallery.querySelector<HTMLElement>('.trace-choices')!.hidden = false;
  swipe.hidden = false;
  track.tabIndex = 0;
  track.setAttribute('aria-label', 'Trajectory examples');

  function update() {
    previous.disabled = current === 0 || showAll;
    next.disabled = current === cases.length - 1 || showAll;
    status.textContent = showAll ? `${cases.length} examples` : `${current + 1} / ${cases.length}`;
    choices.forEach((b, i) => b.setAttribute('aria-pressed', String(i === current && !showAll)));
    track.style.height = showAll ? '' : `${Math.ceil(cases[current].getBoundingClientRect().height)}px`;
  }

  function goTo(index: number, immediate = false) {
    current = Math.max(0, Math.min(index, cases.length - 1));
    if (showAll) {
      cases[current].scrollIntoView({ block: 'start', behavior: 'auto' });
      return;
    }
    update();
    const left = cases[current].offsetLeft - cases[0].offsetLeft;
    track.scrollTo({ left, behavior: immediate || matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }

  previous.addEventListener('click', () => goTo(current - 1));
  next.addEventListener('click', () => goTo(current + 1));
  choices.forEach((b, i) => b.addEventListener('click', () => goTo(i)));
  track.addEventListener('keydown', (event) => {
    if (event.target !== track || showAll) return;
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    goTo(event.key === 'Home' ? 0 : event.key === 'End' ? cases.length - 1 : current + (event.key === 'ArrowRight' ? 1 : -1));
  });
  track.addEventListener('scroll', () => {
    if (showAll || frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const x = track.getBoundingClientRect().left;
      current = cases.reduce((best, card, i) => Math.abs(card.getBoundingClientRect().left - x) < Math.abs(cases[best].getBoundingClientRect().left - x) ? i : best, 0);
      update();
    });
  }, { passive: true });
  toggle.addEventListener('click', () => {
    showAll = !showAll;
    gallery.classList.toggle('show-all', showAll);
    toggle.setAttribute('aria-pressed', String(showAll));
    toggle.textContent = showAll ? 'Show one at a time' : 'Read all examples';
    swipe.hidden = showAll;
    track.tabIndex = showAll ? -1 : 0;
    update();
    if (!showAll) goTo(current, true);
  });

  function followHash() {
    const index = cases.findIndex((c) => `#${c.id}` === location.hash);
    if (index !== -1) goTo(index, true);
  }
  window.addEventListener('hashchange', followHash);
  let width = gallery.clientWidth;
  const observer = new ResizeObserver(() => {
    // A slide-height update also resizes the gallery. Only a width change
    // needs re-alignment; re-scrolling on height changes interrupts swipes.
    const nextWidth = gallery.clientWidth;
    if (nextWidth !== width) {
      width = nextWidth;
      if (!showAll) goTo(current, true);
    }
    update();
  });
  observer.observe(gallery);
  // Opening source excerpts changes the card even when the track has a fixed height.
  cases.forEach((card) => observer.observe(card));

  const evidence = Array.from(gallery.querySelectorAll<HTMLDetailsElement>('[data-trace-evidence]'));
  let printState: boolean[] = [];
  window.addEventListener('beforeprint', () => {
    printState = evidence.map((e) => e.open);
    evidence.forEach((e) => { e.open = true; });
  });
  window.addEventListener('afterprint', () => {
    evidence.forEach((e, i) => { e.open = printState[i] ?? e.open; });
    update();
  });
  followHash();
  update();
}
