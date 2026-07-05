# sunlit — Nuxt branch

Nuxt 4 (SSG) port of [jackyzha0/sunlit](https://github.com/jackyzha0/sunlit).
Static site generation deployed to Cloudflare Pages.

See [SPEC.md on the `spec` branch](https://github.com/gandli/sunlit/blob/spec/SPEC.md) for the cross-branch contract.

## Quick start

```bash
bun install
bun run dev        # http://localhost:3000
bun run test:unit  # Vitest (6 tests)
bun run test:e2e   # Playwright (25 tests)
bun run generate   # → .output/public/ (SSG for Cloudflare Pages)
```

## Framework specifics

| Concern | Nuxt solution |
|---|---|
| Auto-imports | `useSunToggle` + `<DappledLight>` + `<Article>` — no explicit imports |
| SSR hydration race | `window.__sunlitReady` flag + custom `page.goto` fixture |
| Eager listener attach | `import.meta.client` block in `app.vue` script setup |
| Static deployment | `nitro.preset: 'static'` → `.output/public/` |
| Playwright timing | `tests/e2e/fixture.js` extends `page.goto` to wait for hydration |

## Test results

| Suite | Count | Status |
|---|---|---|
| Vitest — useSunToggle composable | 6 | ✅ |
| Playwright — DOM invariants | 18 | ✅ |
| Playwright — Interaction | 3 | ✅ |
| Playwright — CSS tokens | 2 | ✅ |
| Playwright — Visual regression | 2 | ✅ |
| **Total** | **31** | ✅ |

## Bundle size

- Total JS: ~144 KB raw / ~55 KB gzipped (Vue + Nuxt runtime)
- Page chunk: 3 KB / 1.5 KB gzipped
- CSS: 4 KB / 1.5 KB gzipped

Nuxt is heavier than pure Vite branches because of the Nuxt runtime,
but SSG output is pure HTML/JS with no server required — matches other
static branches on Cloudflare Pages.

## SPEC §11 pitfall discovery — hydration race

**New pitfall found while porting**: Nuxt SSG's client bundle attaches
event listeners *after* Playwright's `page.goto()` resolves. This causes
`keyboard.press('Space')` to fire before the keydown listener exists.

**Solution**:
1. `app.vue` sets `window.__sunlitReady = true` in the eager client block
2. `tests/e2e/fixture.js` extends `page.goto` to `waitForFunction` on that flag

This pattern is documented in SPEC §11 for future SSR-based framework
branches (SvelteKit, Astro Islands, Remix, etc.).
