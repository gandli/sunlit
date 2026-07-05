/**
 * useSunToggle — the interaction contract from SPEC.md §5, Nuxt/Vue 3 edition.
 *
 * SPEC §11 cross-framework pitfalls applied:
 *   - DOM (body.classList) is the single source of truth
 *   - No document/window listeners in the composable itself — App.vue
 *     attaches the eager client keydown listener (before hydration)
 *   - Root <div @click> handles bubbled clicks (no document listener)
 *   - Nuxt SSG renders empty body → matches SPEC "initial state"
 */
import { ref } from 'vue';

export function useSunToggle() {
  const dark = ref(false);
  const animationReady = ref(false);

  function toggle() {
    if (typeof document === 'undefined') return; // SSR safety
    if (!animationReady.value) {
      animationReady.value = true;
      document.body.classList.add('animation-ready');
    }
    dark.value = !dark.value;
    document.body.classList.toggle('dark', dark.value);
  }

  return { dark, animationReady, toggle };
}
