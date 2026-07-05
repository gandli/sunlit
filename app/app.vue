<script setup>
/**
 * App root — Nuxt 4 auto-imports composables/components.
 *
 * SPEC §11 cross-framework pitfall discipline:
 *   - useSunToggle owns state + toggle logic (no DOM listener)
 *   - keydown listener attached in this file's client-side eager block
 *     BEFORE hydration completes so Playwright's keyboard.press('Space')
 *     is caught even when fired immediately after page.goto()
 *   - Root <div @click> handles bubbled clicks (no document listener)
 *   - window.__sunlitReady flag lets Playwright waitForFunction sync
 */
const { toggle } = useSunToggle();

// Eager client attach — fires before onMounted, before hydration finishes.
// Nuxt equivalent of React's useLayoutEffect trick from SPEC §11.
if (import.meta.client) {
  const onKeydown = (event) => {
    if (event.code === 'Space') {
      event.preventDefault();
      toggle();
    }
  };
  window.addEventListener('keydown', onKeydown);
  window.__sunlitReady = true;

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeydown);
    delete window.__sunlitReady;
  });
}
</script>

<template>
  <div class="app-root" @click="toggle" :style="{ minHeight: '100vh' }">
    <DappledLight />
    <Article />
  </div>
</template>
