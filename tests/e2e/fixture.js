import { test as base, expect } from '@playwright/test';

/**
 * Nuxt-specific fixture: after each page.goto, wait for
 * window.__sunlitReady flag set by app.vue's eager client block.
 *
 * This solves the SSG hydration race: without waiting, Playwright's
 * keyboard.press('Space') fires before the keydown listener attaches.
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    const origGoto = page.goto.bind(page);
    page.goto = async (url, opts) => {
      const res = await origGoto(url, opts);
      try {
        await page.waitForFunction(() => window.__sunlitReady === true, {
          timeout: 5000,
        });
      } catch (e) {
        // Fallthrough: pre-hydration tests (DOM invariants) don't need it.
      }
      return res;
    };
    await use(page);
  },
});

export { expect };
