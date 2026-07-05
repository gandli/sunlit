/**
 * useSunToggle — SPEC.md §5 interaction contract, Svelte 5 (Runes) edition.
 *
 * Cross-framework lessons applied (SPEC §11):
 *   - $effect runs after mount but is synchronous re: DOM (paint hasn't
 *     happened yet), matching Vue onMounted — no useLayoutEffect analog
 *     needed. Svelte 5 has no StrictMode double-mount either.
 *   - DOM is the single source of truth: body.classList is read and
 *     written directly.
 *   - Click is NOT attached to document; App-level on:click on the root
 *     div satisfies "any click on document toggles" while keeping body
 *     free of listeners (Playwright body-clickable pitfall).
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
