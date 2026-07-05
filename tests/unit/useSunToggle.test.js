/**
 * Unit tests for useSunToggle (SPEC §5) — SolidJS edition.
 * Follows RED-GREEN-REFACTOR: these tests written before hook impl.
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { useSunToggle } from '../../src/hooks/useSunToggle.js';

describe('useSunToggle (SPEC §5) — Solid', () => {
  beforeEach(() => {
    document.body.className = '';
  });

  it('initial body has no classes', () => {
    useSunToggle();
    expect(document.body.classList.contains('dark')).toBe(false);
    expect(document.body.classList.contains('animation-ready')).toBe(false);
  });

  it('first toggle() adds .animation-ready AND .dark', () => {
    const { toggle } = useSunToggle();
    toggle();
    expect(document.body.classList.contains('animation-ready')).toBe(true);
    expect(document.body.classList.contains('dark')).toBe(true);
  });

  it('second toggle() removes .dark, keeps .animation-ready', () => {
    const { toggle } = useSunToggle();
    toggle();
    toggle();
    expect(document.body.classList.contains('animation-ready')).toBe(true);
    expect(document.body.classList.contains('dark')).toBe(false);
  });

  it('Space keydown after attach() triggers toggle', () => {
    const { attach } = useSunToggle();
    const cleanup = attach();
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space', bubbles: true }));
    expect(document.body.classList.contains('dark')).toBe(true);
    cleanup();
  });

  it('non-Space keys ignored', () => {
    const { attach } = useSunToggle();
    const cleanup = attach();
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyA', bubbles: true }));
    expect(document.body.classList.contains('dark')).toBe(false);
    cleanup();
  });

  it('cleanup() removes keydown listener', () => {
    const { attach } = useSunToggle();
    const cleanup = attach();
    cleanup();
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
