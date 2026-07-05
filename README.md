# sunlit — Preact 10 port

Preact 10 + Vite implementation of [jackyzha0/sunlit](https://github.com/jackyzha0/sunlit).

**Live demo**: <https://sunlit-preact.pages.dev> (Cloudflare Pages)

## About this branch

This is one of several framework implementations in the [gandli/sunlit](https://github.com/gandli/sunlit) fork. All framework branches (`astro`, `vue`, `react`, `svelte`, `solid`, …) are held to the same visual, DOM, and behavioral contract defined in [SPEC.md](https://github.com/gandli/sunlit/blob/spec/SPEC.md) on the `spec` branch.

## Stack

- **Preact 10.5** with `<script setup>` Composition API
- **Vite 8** for dev server + production build
- **Vitest 4** for unit tests
- **Playwright** for E2E + visual regression

## Directory layout

```
public/
  favicon.svg       Sunlit logo (sun + blinds)
  og-image.png      1200×630 social card
  leaves.png        Foliage bitmap (from upstream)
src/
  main.js
  App.jsx           Root composition
  styles.css        Global CSS (fixes upstream U1-U4)
  components/
    DappledLight.jsx    Top-level compositor
    Leaves.jsx          SVG wind filter + foliage
    Blinds.jsx          23 shutters + 2 bars
    ProgressiveBlur.jsx 4 blur layers
    Article.jsx         Semantic copy
  hooks/
    useSunToggle.js     SPEC §5 interaction contract
tests/
  unit/               Vitest unit tests (composable)
  e2e/                Playwright cross-branch spec suite
    visual.spec.js-snapshots/  Per-branch visual baseline
spec/
  dom-invariants.js   Machine-readable DOM/CSS constants (from spec branch)
  reference/          Golden screenshots from sunlit.pages.dev
```

## Scripts

```bash
npm run dev        # Vite dev server on :5173
npm run build      # Production build → dist/
npm run preview    # Preview built dist/ on :4173

npm run test:unit                  # Vitest (7 tests)
npm run test:e2e:local             # Playwright against local dev (25 tests)
```

## Test summary

| Suite | Tests | Result |
| --- | --- | --- |
| Vitest — `useSunToggle` composable | 7 | ✅ |
| Playwright — DOM invariants (SPEC §1) | 18 | ✅ |
| Playwright — Interaction (SPEC §5) | 3 | ✅ |
| Playwright — CSS tokens (SPEC §3) | 2 | ✅ |
| Playwright — Visual regression | 2 | ✅ |
| **Total** | **32** | **32/32 ✅** |

## Upstream fixes applied

Per SPEC §9.1:

- **U1**: `.vertical > .bar { width: 5 }` → `5px` (missing unit)
- **U2**: `#progressive-blur { position: absolute }` → `position: fixed; z-index: 1`
- **U3**: Localized `leaves.png` (no cross-origin fetch to `raw.githubusercontent.com`)
- **U4**: Accessibility fallbacks — `prefers-reduced-motion`, `prefers-contrast`, `aria-hidden` on visual layers

## Deployment (Cloudflare Pages)

1. Connect this repository, select branch `vue`.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Node version: `20` or later.

The build is fully static — no runtime, no Workers required.

## License

Same as upstream. Original design by [jackyzha0](https://github.com/jackyzha0). Vue port by [gandli](https://github.com/gandli).
