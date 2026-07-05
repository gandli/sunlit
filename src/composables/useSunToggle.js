/**
 * useSunToggle — the interaction contract from SPEC.md §5.
 *
 * State:
 *   - dark: boolean            body.dark class
 *   - animationReady: boolean  body.animation-ready class (set true on first toggle)
 *
 * Events:
 *   - Space key → toggle()
 *   - Any click on document → toggle()
 *
 * The composable owns the body class mutations directly (no reactive DOM sync
 * through a middleman). This keeps the DOM the SPEC's source of truth.
 */
import { onMounted, onBeforeUnmount, ref } from 'vue';

/**
 * Return shape:
 *   {
 *     dark: Ref<boolean>,
 *     animationReady: Ref<boolean>,
 *     toggle: () => void,     // exported for tests
 *   }
 */
export function useSunToggle() {
  const dark = ref(false);
  const animationReady = ref(false);

  function toggle() {
    // SPEC §5: first toggle sets .animation-ready, subsequent toggles flip .dark
    if (!animationReady.value) {
      animationReady.value = true;
      document.body.classList.add('animation-ready');
    }
    dark.value = !dark.value;
    document.body.classList.toggle('dark', dark.value);
  }

  function onKeydown(event) {
    if (event.code === 'Space') {
      event.preventDefault();
      toggle();
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', onKeydown);
    document.addEventListener('click', toggle);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', onKeydown);
    document.removeEventListener('click', toggle);
  });

  return { dark, animationReady, toggle };
}
