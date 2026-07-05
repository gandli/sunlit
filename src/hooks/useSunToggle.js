'use client';
/**
 * useSunToggle — SPEC.md §5 interaction contract, React edition.
 *
 * DOM is the source of truth (per SPEC): body.classList is both read and
 * written directly. Under React StrictMode this avoids ref drift between
 * the double-mounted hook instances.
 *
 * Listeners are attached at the WINDOW level for keys, and returned as an
 * onClick handler that App wires to a root wrapper. This avoids the body-
 * level click listener that causes Playwright's keyboard.press('Space') to
 * synthesize an extra click.
 */
import { useEffect, useLayoutEffect, useCallback } from 'react';

export function useSunToggle() {
  const toggle = useCallback(() => {
    const body = document.body;
    if (!body.classList.contains('animation-ready')) {
      body.classList.add('animation-ready');
    }
    body.classList.toggle('dark');
  }, []);

  // useLayoutEffect runs synchronously after DOM mutations but before the
  // browser paints — this ensures the keydown handler is attached before
  // any user input can arrive after `page.goto` returns.
  useLayoutEffect(() => {
    function onKeydown(e) {
      if (e.code === 'Space') {
        e.preventDefault();
        toggle();
      }
    }
    window.addEventListener('keydown', onKeydown);
    return () => {
      window.removeEventListener('keydown', onKeydown);
    };
  }, [toggle]);

  return { toggle };
}
