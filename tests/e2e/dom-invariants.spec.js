import { test, expect } from '@playwright/test';
import { INVARIANTS } from '../../spec/dom-invariants.js';

/**
 * DOM invariants — SPEC §1
 * Every framework/* branch's rendered DOM must satisfy these counts.
 */
test.describe('DOM invariants (SPEC §1)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  for (const [selector, expected] of Object.entries(INVARIANTS)) {
    test(`${selector} → ${expected}`, async ({ page }) => {
      await expect(page.locator(selector)).toHaveCount(expected);
    });
  }
});

test.describe('Initial state (SPEC §5)', () => {
  test('body does NOT have .dark on first load', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('body')).not.toHaveClass(/\bdark\b/);
  });

  test('body does NOT have .animation-ready on first load', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('body')).not.toHaveClass(/\banimation-ready\b/);
  });

  test('article contains "sunlit" heading', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('article h1')).toHaveText(/sunlit/i);
  });
});
