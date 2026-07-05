#!/usr/bin/env node
/**
 * Capture golden reference screenshots from https://sunlit.pages.dev
 * Output: spec/reference/day.png and dark.png
 *
 * Run: npm run capture-reference
 */
import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, '../spec/reference');
const REFERENCE_URL = 'https://sunlit.pages.dev/';

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();

  console.log(`→ Capturing ${REFERENCE_URL} (day mode)`);
  await page.goto(REFERENCE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: resolve(OUT_DIR, 'day.png'),
    fullPage: false,
  });

  console.log('→ Toggling to dark mode');
  await page.keyboard.press('Space');
  await page.waitForTimeout(2500); // sunset transition = 1.7s
  await page.screenshot({
    path: resolve(OUT_DIR, 'dark.png'),
    fullPage: false,
  });

  await browser.close();
  console.log(`✓ Reference screenshots saved to ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
