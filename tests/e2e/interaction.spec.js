import { test, expect } from '@playwright/test';

/**
 * Interaction contract — SPEC §5
 *
 * - Space (KeyboardEvent.code === 'Space') toggles .dark on <body>
 * - Any click on document toggles .dark on <body>
 * - First toggle also adds .animation-ready (never removed)
 */
test.describe('Interaction contract (SPEC §5)', () => {
  test('Space key toggles .dark', async ({ page }) => {
    await page.goto('/');
    const body = page.locator('body');
    await expect(body).not.toHaveClass(/\bdark\b/);

    await page.keyboard.press('Space');
    await expect(body).toHaveClass(/\bdark\b/);
    await expect(body).toHaveClass(/\banimation-ready\b/);

    await page.keyboard.press('Space');
    await expect(body).not.toHaveClass(/\bdark\b/);
    // animation-ready is sticky
    await expect(body).toHaveClass(/\banimation-ready\b/);
  });

  test('click toggles .dark', async ({ page }) => {
    await page.goto('/');
    const body = page.locator('body');
    await expect(body).not.toHaveClass(/\bdark\b/);

    // Click on the article heading (a real element, not a coord)
    await page.locator('article h1').click();
    await expect(body).toHaveClass(/\bdark\b/);
    await expect(body).toHaveClass(/\banimation-ready\b/);
  });

  test('animation-ready persists across toggles', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Space'); // toggle on
    await page.keyboard.press('Space'); // toggle off
    await page.keyboard.press('Space'); // toggle on again
    await expect(page.locator('body')).toHaveClass(/\banimation-ready\b/);
  });
});
