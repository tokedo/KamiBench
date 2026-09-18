// Tabs for the behavior cards in post 2. Progressive: the HTML stacks all
// cards; this shows one at a time, follows #id links, and adds swipe + arrow
// keys. No runtime data; nothing here changes the content.
for (const root of document.querySelectorAll<HTMLElement>('[data-bh-tabs]')) {
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-bh-tab]'));
  const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-bh-panel]'));
  if (tabs.length < 2) continue;
  const ids = panels.map((p) => p.dataset.bhPanel!);
  const current = () => ids.findIndex((id) => panels.find((p) => p.dataset.bhPanel === id)!.classList.contains('is-active'));
  const show = (id: string, focus = false) => {
    panels.forEach((p) => p.classList.toggle('is-active', p.dataset.bhPanel === id));
    tabs.forEach((t) => {
      const on = t.dataset.bhTab === id;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      if (on && focus) t.focus();
    });
  };
  root.classList.add('is-enhanced');
  root.querySelector<HTMLElement>('.bh-tablist')!.hidden = false;
  root.querySelector<HTMLElement>('.bh-swipe')!.hidden = false;
  tabs.forEach((t) => t.addEventListener('click', () => { show(t.dataset.bhTab!); history.replaceState(null, '', `#${t.dataset.bhTab}`); }));
  root.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    const j = (current() + (e.key === 'ArrowRight' ? 1 : ids.length - 1)) % ids.length;
    show(ids[j]!, true); e.preventDefault();
  });
  let x0 = 0; let y0 = 0;
  root.addEventListener('touchstart', (e) => { x0 = e.touches[0]!.clientX; y0 = e.touches[0]!.clientY; }, { passive: true });
  root.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0]!.clientX - x0; const dy = e.changedTouches[0]!.clientY - y0;
    if (Math.abs(dx) < 60 || Math.abs(dy) > Math.abs(dx)) return;
    show(ids[(current() + (dx < 0 ? 1 : ids.length - 1)) % ids.length]!);
  }, { passive: true });
  const fromHash = () => { const id = location.hash.slice(1); if (ids.includes(id)) show(id); };
  window.addEventListener('hashchange', fromHash);
  fromHash();
}
