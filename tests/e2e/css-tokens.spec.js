import { test, expect } from './fixture.js';
import { CSS_TOKENS_LIGHT } from '../../spec/dom-invariants.js';

/**
 * CSS custom property tokens — SPEC §2
 * Verify the 6 palette variables + derived tokens exist and have expected values.
 */
test.describe('CSS tokens (SPEC §2)', () => {
  test('palette tokens are defined on body', async ({ page }) => {
    await page.goto('/');
    const values = await page.evaluate((tokenNames) => {
      const style = getComputedStyle(document.body);
      const out = {};
      for (const name of tokenNames) {
        // getPropertyValue returns raw text; use a probe element to resolve to rgb
        const probe = document.createElement('div');
        probe.style.color = `var(${name})`;
        document.body.appendChild(probe);
        out[name] = getComputedStyle(probe).color;
        probe.remove();
      }
      return out;
    }, Object.keys(CSS_TOKENS_LIGHT));

    for (const [name, expected] of Object.entries(CSS_TOKENS_LIGHT)) {
      expect(values[name]).toBe(expected);
    }
  });

  test('body.dark swaps --light and --dark', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Space'); // enter dark mode
    // Wait for CSS variable swap
    await page.waitForTimeout(200);

    const dark = await page.evaluate(() => {
      const probe = document.createElement('div');
      probe.style.color = 'var(--light)';
      document.body.appendChild(probe);
      const light = getComputedStyle(probe).color;
      probe.style.color = 'var(--dark)';
      const darkVal = getComputedStyle(probe).color;
      probe.remove();
      return { light, dark: darkVal };
    });

    // In dark mode: --light should be night, --dark should be day
    expect(dark.light).toBe('rgb(15, 19, 28)'); // night
    expect(dark.dark).toBe('rgb(255, 253, 250)'); // day
  });
});
