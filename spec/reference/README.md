# Reference screenshots

This directory holds the **golden screenshots** captured from the production reference site <https://sunlit.pages.dev/>.

- `day.png` — initial state (no `.dark` on body)
- `dark.png` — after pressing `Space` once (sunset transition complete)

## Regenerating

```bash
npm install
npx playwright install chromium
npm run capture-reference
```

The screenshots are committed to git so downstream framework/* branches can validate against them offline.

## Notes on determinism

- **Animations**: The leaves SVG filter (`feTurbulence` + `feDisplacementMap`) is inherently non-deterministic; Playwright screenshot tests mask the `#leaves` region.
- **Fonts**: system-ui varies across OS. Reference is captured on macOS.
- **Tolerance**: SPEC §8.2 allows 0.5% pixel diff.

If a framework/* branch cannot match within tolerance despite correct implementation, capture a per-framework baseline in that branch and document the deviation in that branch's README.
