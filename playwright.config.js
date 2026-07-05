import { defineConfig, devices } from '@playwright/test';

/**
 * Sunlit cross-branch acceptance test config.
 *
 * The base URL is overridable per branch:
 *   SUNLIT_URL=http://localhost:5173 npx playwright test    # framework/vue dev server
 *   SUNLIT_URL=file:///path/to/index.html npx playwright test  # static main branch
 *
 * Default: production reference site https://sunlit.pages.dev
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  timeout: 30_000,
  expect: {
    timeout: 5_000,
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.005, // 0.5% tolerance (SPEC §8.2)
      animations: 'disabled',
    },
  },
  use: {
    baseURL: process.env.SUNLIT_URL || 'https://sunlit.pages.dev',
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    // Nuxt-specific: wait for SSG hydration to attach the keydown listener
    // before Playwright starts firing input events. Other branches don't
    // need this but honouring the flag is harmless — they never set it.
    navigationTimeout: 15_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
