/**
 * Unit tests for useSunToggle (SPEC §5) — Nuxt 4 edition.
 *
 * Nuxt-specific: composable is a pure state store. Keydown listener
 * lives in app.vue's eager client block (before hydration completes).
 * Tests here only exercise the toggle contract + DOM side effects.
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { useSunToggle } from '../../app/composables/useSunToggle.js';

describe('useSunToggle (SPEC §5) — Nuxt', () => {
  beforeEach(() => {
    document.body.className = '';
  });

  it('initial state: dark=false, animationReady=false, body has no classes', () => {
    const { dark, animationReady } = useSunToggle();
    expect(dark.value).toBe(false);
    expect(animationReady.value).toBe(false);
    expect(document.body.classList.contains('dark')).toBe(false);
    expect(document.body.classList.contains('animation-ready')).toBe(false);
  });

  it('first toggle() sets .animation-ready AND .dark on body', () => {
    const { toggle } = useSunToggle();
    toggle();
    expect(document.body.classList.contains('animation-ready')).toBe(true);
    expect(document.body.classList.contains('dark')).toBe(true);
  });

  it('second toggle() removes .dark but keeps .animation-ready', () => {
    const { toggle } = useSunToggle();
    toggle();
    toggle();
    expect(document.body.classList.contains('animation-ready')).toBe(true);
    expect(document.body.classList.contains('dark')).toBe(false);
  });

  it('toggle() updates dark ref state', () => {
    const { dark, toggle } = useSunToggle();
    expect(dark.value).toBe(false);
    toggle();
    expect(dark.value).toBe(true);
    toggle();
    expect(dark.value).toBe(false);
  });

  it('animationReady ref only flips once (sticky)', () => {
    const { animationReady, toggle } = useSunToggle();
    toggle();
    expect(animationReady.value).toBe(true);
    toggle();
    toggle();
    expect(animationReady.value).toBe(true);
  });

  it('multiple toggles in sequence: odd count = dark', () => {
    const { toggle } = useSunToggle();
    toggle();
    toggle();
    toggle();
    expect(document.body.classList.contains('dark')).toBe(true);
  });
});
