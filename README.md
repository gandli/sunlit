# sunlit adaptation

> **Zero JavaScript adaptation from the original [jackyzha0/sunlit](https://github.com/jackyzha0/sunlit).**

Implementation of sunlit dappled light effect based on the original jackyzha0/sunlit,
with layout pixel-aligned to [sunlit.pages.dev](https://sunlit.pages.dev/), **no JavaScript required**.

## Overview

This version keeps the original 4‑layer structure from jackyzha0/sunlit,
replaces the 23 DOM‑element blinds with a pure CSS `repeating-linear-gradient`,
and removes all JavaScript for time‑based animation.
Progressive blur is implemented with CSS scroll timeline.

## Key Differences from Original

| Feature | Original jackyzha0/sunlit | This adaptation |
|---------|---------------------------|-----------------|
| JavaScript | Required for time‑based color changes + toggle | Tiny ~20 line script **only for toggle interaction** — *all visual effects are pure CSS* |
| Layers | `glow + glow-bounce + leaves + blinds + progressive-blur` (5 layers) | **Same 5‑layer structure preserved** — (glow + glow-bounce + perspective[leaves + blinds] + progressive-blur) |
| Blinds | 23 separate DOM `<div>` elements | Pure CSS `repeating-linear-gradient`, **no extra DOM** needed |
| Animation | Time‑based sunset/sunrise color | Leaf wind animation + progressive blur on scroll via CSS |
| Toggle | Space key to toggle dark/light | **Click anywhere + Space key** both work |
| Build | Astro / Node.js | Pure HTML+CSS+tiny toggle, **no build step needed** |
| Layout | | Pixel aligned to [sunlit.pages.dev](https://sunlit.pages.dev/) |

## Features

- ✅ **Original 5‑layer structure preserved** 1:1 from jackyzha0/sunlit
- ✅ **Pure CSS visual effects** — all lighting, animation, blur done in CSS
- ✅ **Tiny toggle script** (≈20 lines) only for interaction — effects work without it
- ✅ `repeating-linear-gradient` blinds instead of 23 DOM elements — **no extra DOM**
- ✅ SVG turbulence + `billow` keyframe — natural wind animation on leaves
- ✅ Progressive blur — blur increases as you scroll via CSS scroll timeline
- ✅ **Click anywhere + Space** both toggle between day/night
- ✅ **Pixel‑aligned layout** — matches [sunlit.pages.dev](https://sunlit.pages.dev/)
- ✅ Fully accessible — respects `prefers-reduced-motion` and `prefers-contrast`

## Layout Alignment

Aligned pixel‑for‑pixel with [sunlit.pages.dev](https://sunlit.pages.dev/):
- `article` centered with `max-width: 768px`
- `h1 { font-size: 3rem; font-weight: 700; margin-bottom: 2rem; }`
- `p { font-size: 1.5rem; line-height: 1.6; }`

## Usage

Open `index.html` directly in a browser, or serve with any HTTP server:

```bash
python -m http.server 8080
# Visit http://localhost:8080
```

## Credits

- Original sunlit: [jackyzha0/sunlit](https://github.com/jackyzha0/sunlit)
- Adaptation idea and article: [Ken Hawkins – Sunlit Dappled Light Effect](https://www.allaboutken.com/posts/sunlit-dappled-light-effect/)
- Inspired by [daylight computer](https://www.youtube.com/watch?v=uDDaP-BIDWE) and [chloe yan's sunlit place](https://sunlit.place/)
- Leaves texture from the original jackyzha0/sunlit project
