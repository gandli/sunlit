# Sunlit — Multi-Framework Consistency Baseline

This is the **`spec` branch** of [gandli/sunlit](https://github.com/gandli/sunlit), a fork of [jackyzha0/sunlit](https://github.com/jackyzha0/sunlit).

## Purpose

`main` and `adaptation` branches mirror upstream — **read-only**.
This branch defines the **cross-branch consistency contract** that all future `framework/*` implementations (Vue, React, Svelte, Solid, Nuxt, Next, Preact, Lit…) must satisfy.

## Contents

| File / Dir | Role |
|---|---|
| `SPEC.md` | 📐 Full consistency specification (DOM, CSS, animation, interaction, a11y) |
| `spec/dom-invariants.js` | 🧾 Machine-readable DOM/CSS constants imported by tests |
| `spec/reference/` | 📸 Golden screenshots from <https://sunlit.pages.dev/> |
| `tests/e2e/*.spec.js` | 🧪 Playwright acceptance tests (framework-agnostic) |
| `scripts/capture-reference.mjs` | 📷 Regenerate golden screenshots |
| `playwright.config.js` | ⚙️ Test runner config (baseURL overridable) |

## Usage from a `framework/*` branch

```bash
# 1. Cherry-pick this branch's test infrastructure into your framework branch
git checkout framework/vue
git checkout spec -- SPEC.md spec/ tests/ playwright.config.js scripts/

# 2. Install
npm install
npx playwright install chromium

# 3. Start your framework's dev server, then run tests against it
SUNLIT_URL=http://localhost:5173 npm test
```

Or run against production reference:
```bash
npm test              # defaults to https://sunlit.pages.dev
```

## Branch topology

```
main (read-only, jackyzha0 mirror)
  │
  └─── spec (this branch: SPEC + tests + references)
         ├─── framework/vue    (Vue 3 + Vite)
         ├─── framework/react  (React 19 + Vite)
         ├─── framework/svelte (Svelte 5 + Vite)
         └─── framework/solid  (SolidJS + Vite)
```

## Related

- Original: <https://github.com/jackyzha0/sunlit>
- Production reference: <https://sunlit.pages.dev/>
