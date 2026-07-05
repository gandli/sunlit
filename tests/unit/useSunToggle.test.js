/**
 * Unit tests for useSunToggle (SPEC §5) — Svelte 5 edition.
 * Runs in jsdom. Tests the pure JS helper — Svelte-specific $effect.pre
 * lifecycle is covered by the E2E suite.
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { useSunToggle } from '../../src/lib/useSunToggle.js';

describe('useSunToggle (SPEC §5)', () => {
  beforeEach(() => {
    document.body.className = '';
  });

  it('initial state: body has no classes', () => {
    useSunToggle();
    expect(document.body.classList.contains('dark')).toBe(false);
    expect(document.body.classList.contains('animation-ready')).toBe(false);
  });

  it('first toggle() sets both .animation-ready AND .dark on body', () => {
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

  it('Space keydown on window triggers toggle after attach()', () => {
    const { attach } = useSunToggle();
    const cleanup = attach();
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space', bubbles: true }));
    expect(document.body.classList.contains('dark')).toBe(true);
    cleanup();
  });

  it('non-Space keys are ignored', () => {
    const { attach } = useSunToggle();
    const cleanup = attach();
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyA', bubbles: true }));
    expect(document.body.classList.contains('dark')).toBe(false);
    expect(document.body.classList.contains('animation-ready')).toBe(false);
    cleanup();
  });

  it('cleanup() removes keydown listener', () => {
    const { attach } = useSunToggle();
    const cleanup = attach();
    cleanup();
    document.body.className = '';
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
    expect(document.body.classList.contains('dark')).toBe(false);
  });

  it('multiple keydowns toggle in sequence', () => {
    const { attach } = useSunToggle();
    const cleanup = attach();
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
    expect(document.body.classList.contains('dark')).toBe(true);
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
    expect(document.body.classList.contains('dark')).toBe(false);
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
    expect(document.body.classList.contains('dark')).toBe(true);
    cleanup();
  });
});
