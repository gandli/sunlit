/**
 * useSunToggle — SPEC.md §5 interaction contract, SolidJS edition.
 *
 * SPEC §11 cross-framework pitfalls applied:
 *   - DOM (body.classList) as single source of truth
 *   - No document-level click listener; App-root onClick handles it
 *   - Solid has no StrictMode double-mount; onMount is synchronous
 *     enough for Playwright but we still attach at mount time
 */
export function useSunToggle() {
  function toggle() {
    const body = document.body;
    if (!body.classList.contains('animation-ready')) {
      body.classList.add('animation-ready');
    }
    body.classList.toggle('dark');
  }

  function attach() {
    function onKeydown(e) {
      if (e.code === 'Space') {
        e.preventDefault();
        toggle();
      }
    }
    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('keydown', onKeydown);
  }

  return { toggle, attach };
}
