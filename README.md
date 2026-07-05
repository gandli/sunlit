# sunlit — Next.js branch

Next.js 15 (App Router) port of [jackyzha0/sunlit](https://github.com/jackyzha0/sunlit).
Static export deployed to Cloudflare Pages.

See [SPEC.md on the `spec` branch](https://github.com/gandli/sunlit/blob/spec/SPEC.md) for the cross-branch contract.

## Quick start

```bash
bun install
bun run dev        # http://localhost:3000
bun run test:unit  # Vitest (7 tests)
bun run test:e2e   # Playwright (25 tests)
bun run build      # → out/ (static export for Cloudflare Pages)
```

## Framework specifics

| Concern | Next.js solution |
|---|---|
| Server/client boundary | `'use client'` on `useSunToggle.js` and `App.jsx` |
| SSR hydration mismatch | `<body suppressHydrationWarning>` on layout |
| Static deployment | `output: 'export'` + `trailingSlash: true` |
| Playwright timing | `useLayoutEffect` (SPEC §11 pattern reused from react) |

## Test results

| Suite | Count | Status |
|---|---|---|
| Vitest — useSunToggle hook | 7 | ✅ |
| Playwright — DOM invariants | 18 | ✅ |
| Playwright — Interaction | 3 | ✅ |
| Playwright — CSS tokens | 2 | ✅ |
| Playwright — Visual regression | 2 | ✅ |
| **Total** | **32** | ✅ |

## Bundle size

- First Load JS: **104 KB**
- Page-specific: 1.08 KB
- Note: Next.js runtime is larger than pure Vite branches, but static export
  means Cloudflare Pages serves plain HTML/JS with no Node.js server needed.
