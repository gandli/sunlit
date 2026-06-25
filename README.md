# sunlit adaptation

> [Sunlit Dappled Light Effect](https://www.allaboutken.com/posts/sunlit-dappled-light-effect/) by Ken Hawkins adaptation.

**Zero JavaScript, pure HTML+CSS, two-layer additive blending implementation.**

An improved two‑layer implementation of sunlight streaming through window leaves,
based on the original [jackyzha0/sunlit](https://github.com/jackyzha0/sunlit).

## Overview

This version simplifies the original jackyzha0/sunlit
from 5 layers to just **2 layers**, and uses `mix-blend-mode: plus-lighter`
additive blending for a more natural lighting effect.

## Key Differences from Original

| Feature | Original jackyzha0/sunlit | This adaptation (Ken Hawkins) |
|---------|---------------------------|-------------------------------|
| Layers | 5 (glow, glow-bounce, leaves, blinds, blur) | **2** (leaves + blinds) |
| Blending | multiply (darken) | **`plus-lighter` additive** for more natural lighting |
| JavaScript | Required for time‑based color animation | **Zero** – all effects in pure HTML+CSS |
| Blinds | 23 separate DOM elements | Pure CSS `repeating-linear-gradient`, **no extra DOM** needed |
| Animation | Time-based color changes | Scroll-driven opacity fade + CSS parallax |
| Build | Astro / Node | Pure HTML+CSS, **no build step needed** |

## Features

- ✅ **Zero JavaScript** – all animations/effects in pure CSS
- ✅ **Two layers only** – leaves + perspective blinds
- ✅ **Additive blending** (`mix-blend-mode: plus-lighter`) for a more natural light than multiply
- ✅ **SVG turbulence** – natural wind animation on leaves
- ✅ **Scroll‑driven fade** – opacity fades as you scroll via CSS scroll timeline (Chrome)
- ✅ **Pixel-aligned layout** – matches [sunlit.pages.dev](https://sunlit.pages.dev/)
- ✅ **Fully accessible** – respects `prefers-reduced-motion` and `prefers-contrast`
- ✅ **Performance** – Firefox automatically disables displacement map for better performance

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
