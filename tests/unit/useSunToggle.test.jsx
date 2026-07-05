/**
 * Unit tests for useSunToggle hook (SPEC §5).
 * Runs in jsdom.
 *
 * NOTE: click behavior is now tested via App-level onClick wiring; here
 * we only unit-test the hook's toggle() + Space keydown handler.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, act, cleanup } from '@testing-library/react';
import { StrictMode } from 'react';
import { useSunToggle } from '../../src/hooks/useSunToggle.js';

let capturedApi = null;
function Host() {
  capturedApi = useSunToggle();
  return null;
}

describe('useSunToggle (SPEC §5)', () => {
  beforeEach(() => {
    document.body.className = '';
    capturedApi = null;
  });

  afterEach(() => {
    cleanup();
    document.body.className = '';
  });

  it('initial state: body has no classes', () => {
    render(<Host />);
    expect(document.body.classList.contains('dark')).toBe(false);
    expect(document.body.classList.contains('animation-ready')).toBe(false);
  });

  it('first toggle() sets .animation-ready AND .dark on body', () => {
    render(<Host />);
    act(() => capturedApi.toggle());
    expect(document.body.classList.contains('animation-ready')).toBe(true);
    expect(document.body.classList.contains('dark')).toBe(true);
  });

  it('second toggle() removes .dark but keeps .animation-ready', () => {
    render(<Host />);
    act(() => {
      capturedApi.toggle();
      capturedApi.toggle();
    });
    expect(document.body.classList.contains('animation-ready')).toBe(true);
    expect(document.body.classList.contains('dark')).toBe(false);
  });

  it('Space keydown on window triggers toggle', () => {
    render(<Host />);
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space', bubbles: true }));
    });
    expect(document.body.classList.contains('dark')).toBe(true);
  });

  it('non-Space keys are ignored', () => {
    render(<Host />);
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyA', bubbles: true }));
    });
    expect(document.body.classList.contains('dark')).toBe(false);
    expect(document.body.classList.contains('animation-ready')).toBe(false);
  });

  it('unmount cleans up keydown listener', () => {
    const { unmount } = render(<Host />);
    unmount();
    document.body.className = '';
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
    expect(document.body.classList.contains('dark')).toBe(false);
  });

  it('StrictMode: single toggle per keydown despite double-mount', () => {
    render(
      <StrictMode>
        <Host />
      </StrictMode>
    );
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space', bubbles: true }));
    });
    expect(document.body.classList.contains('dark')).toBe(true);
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space', bubbles: true }));
    });
    expect(document.body.classList.contains('dark')).toBe(false);
  });
});
