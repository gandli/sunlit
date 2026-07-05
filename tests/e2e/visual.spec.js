import { test, expect } from '@playwright/test';

/**
 * Visual regression — SPEC §8.2
 *
 * Golden screenshots are captured from the production reference site
 * (https://sunlit.pages.dev) and stored in spec/reference/.
 *
 * All framework/* branches must match within 0.5% pixel diff.
 *
 * NOTE: SVG turbulence filter + animations produce nondeterministic pixels.
 * We disable animations and mask out the animated leaves region.
 */

const MASK_LEAVES = [
  // Right-side leaves region (approximate)
  { x: 480, y: 0, width: 800, height: 720 },
];

test.describe('Visual regression (SPEC §8.2)', () => {
  test('day mode matches reference', async ({ page }) => {
    await page.goto('/');
    // Ensure any hydration finished
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('day.png', {
      fullPage: false,
      mask: MASK_LEAVES.map((r) => page.locator('#leaves')),
    });
  });

  test('dark mode matches reference', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.keyboard.press('Space');
    // Wait for transition (1.7s sunset animation)
    await page.waitForTimeout(2000);

    await expect(page).toHaveScreenshot('dark.png', {
      fullPage: false,
      mask: [page.locator('#leaves')],
    });
  });
});
