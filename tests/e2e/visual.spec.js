import { test, expect } from '@playwright/test';

/**
 * Visual regression — SPEC §8.2
 *
 * Per-branch baseline: each framework branch stores its own golden
 * screenshot under tests/e2e/visual.spec.js-snapshots/. This catches
 * regressions *within* a branch, while cross-branch parity is enforced
 * by the SPEC-derived DOM + CSS + interaction tests.
 *
 * To stabilise pixels across runs:
 *   - reducedMotion='reduce' pauses billow + gradient animations
 *   - full turbulence disabled via CSS media query (SPEC §9.1 U4 fix)
 *
 * On first run (or after intentional changes), pass --update-snapshots.
 */

test.describe('Visual regression (SPEC §8.2)', () => {
  test.use({ reducedMotion: 'reduce' });

  test('day mode matches reference', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('day.png', {
      fullPage: false,
      // Small threshold for antialiasing / subpixel drift only.
      maxDiffPixelRatio: 0.005,
      animations: 'disabled',
    });
  });

  test('dark mode matches reference', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.keyboard.press('Space');
    // Even with reducedMotion, wait for class settles.
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('dark.png', {
      fullPage: false,
      maxDiffPixelRatio: 0.005,
      animations: 'disabled',
    });
  });
});
