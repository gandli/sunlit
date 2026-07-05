/**
 * Unit tests for useSunToggle (SPEC.md §5 interaction contract).
 *
 * These run in jsdom. Vitest environment is configured in vite.config.js.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, nextTick } from 'vue';
import { useSunToggle } from '../../src/composables/useSunToggle.js';

// Minimal host component so onMounted/onBeforeUnmount fire.
const Host = defineComponent({
  setup() {
    const api = useSunToggle();
    return { api };
  },
  template: '<div></div>',
});

describe('useSunToggle (SPEC §5)', () => {
  let wrapper;

  beforeEach(() => {
    document.body.className = '';
    wrapper = mount(Host, { attachTo: document.body });
  });

  afterEach(() => {
    wrapper.unmount();
    document.body.className = '';
  });

  it('initial state: dark=false, animationReady=false, body has no classes', () => {
    const { dark, animationReady } = wrapper.vm.api;
    expect(dark.value).toBe(false);
    expect(animationReady.value).toBe(false);
    expect(document.body.classList.contains('dark')).toBe(false);
    expect(document.body.classList.contains('animation-ready')).toBe(false);
  });

  it('first toggle() sets .animation-ready AND .dark on body', () => {
    wrapper.vm.api.toggle();
    expect(document.body.classList.contains('animation-ready')).toBe(true);
    expect(document.body.classList.contains('dark')).toBe(true);
  });

  it('second toggle() removes .dark but keeps .animation-ready', () => {
    wrapper.vm.api.toggle();
    wrapper.vm.api.toggle();
    expect(document.body.classList.contains('animation-ready')).toBe(true);
    expect(document.body.classList.contains('dark')).toBe(false);
  });

  it('Space keydown triggers toggle', async () => {
    const evt = new KeyboardEvent('keydown', { code: 'Space', bubbles: true });
    document.dispatchEvent(evt);
    await nextTick();
    expect(document.body.classList.contains('dark')).toBe(true);
  });

  it('document click triggers toggle', async () => {
    document.dispatchEvent(new Event('click', { bubbles: true }));
    await nextTick();
    expect(document.body.classList.contains('dark')).toBe(true);
  });

  it('non-Space keys are ignored', async () => {
    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyA', bubbles: true }));
    await nextTick();
    expect(document.body.classList.contains('dark')).toBe(false);
    expect(document.body.classList.contains('animation-ready')).toBe(false);
  });

  it('unmount cleans up listeners', async () => {
    wrapper.unmount();
    document.body.className = '';
    document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
    document.dispatchEvent(new Event('click'));
    await nextTick();
    expect(document.body.classList.contains('dark')).toBe(false);
  });
});
