# sunlit adaptation

> [Sunlit Dappled Light Effect](https://www.allaboutken.com/posts/sunlit-dappled-light-effect/) by Ken Hawkins adaptation.

An improved two‑layer implementation of sunlight streaming through window leaves, based on the original [jackyzha0/sunlit](https://github.com/jackyzha0/sunlit).

This is the **Ken Hawkins adaptation** — simplified from 5 layers to 2 layers using `mix-blend-mode: plus-lighter` additive blending.

## Demo

Open `index.html` in your browser. Compare:
- Original: https://sunlit.pages.dev/
- This adaptation: [github pages](https://gandli.github.io/sunlit/adaptation/) (if enabled)

## Key Improvements from original

| Feature | Original jackyzha0/sunlit | This adaptation (Ken Hawkins) |
|---------|---------------------------|-------------------------------|
| Layers | 5 (glow, glow-bounce, leaves, blinds, blur) | **2** (leaves + blinds) |
| Blending | multiply (darken) | **`plus-lighter` additive** for more natural lighting |
| JavaScript | Required for time‑based animation | **Zero** – all effects in pure CSS |
| Blinds | 23 DOM elements | Pure CSS `repeating-linear-gradient`, **no extra DOM** needed |
| Animation | Time-based color changes | Scroll-driven opacity fade + CSS parallax |
| Build | Astro / Node | Pure HTML/CSS, **no build step needed** |

## Features

- ✅ **Zero JavaScript** – all animations in pure CSS
- ✅ **Two layers only** – leaves + perspective blinds
- ✅ **Additive blending** (`mix-blend-mode: plus-lighter`) for a more natural light than multiply
- ✅ **SVG turbulence** – natural wind animation on leaves
- ✅ **Scroll‑driven fade** – opacity fades as you scroll via CSS scroll timeline (Chrome)
- ✅ **Fully accessible** – respects `prefers-reduced-motion` and `prefers-contrast`
- ✅ **Performance** – Firefox automatically disables displacement map for better performance

## Usage

Open `index.html` directly or serve with any HTTP server:

```bash
python -m http.server 8080
# Visit http://localhost:8080
```

To add just the effect to your own site:

```html
<div id="kh-dappled-light" aria-hidden="true">
  <div class="kh-ambience-leaves">
    <svg style="position: absolute; width: 0; height: 0;">
      <defs>
        <filter id="wind" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" numOctaves="2" seed="1">
            <animate attributeName="baseFrequency" dur="16s" keyTimes="0;0.33;0.66;1"
              values="0.005 0.003;0.01 0.009;0.008 0.004;0.005 0.003" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic">
            <animate attributeName="scale" dur="20s" keyTimes="0;0.25;0.5;0.75;1" values="45;55;75;55;45"
              repeatCount="indefinite" />
          </feDisplacementMap>
        </filter>
      </defs>
    </svg>
  </div>
  <div class="kh-ambience-blinds"></div>
</div>
```

```css
#kh-dappled-light {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}
.kh-ambience-leaves {
  position: absolute;
  inset: 0;
  background-image: url(leaves.png);
  background-size: cover;
  background-position: bottom right;
  mix-blend-mode: plus-lighter;
  filter: url(#wind) blur(9px);
  opacity: 0.07;
}
.kh-ambience-blinds {
  position: absolute;
  inset: 0;
  top: -30vh;
  right: 0;
  width: 80vw;
  height: 130vh;
  transform-origin: top right;
  transform: matrix3d(
    0.7500, -0.0625, 0.0000, 0.0008,
    0.0000, 1.0000, 0.0000, 0.0000,
    0.0000, 0.0000, 1.0000, 0.0000,
    0.0000, 0.0000, 0.0000, 1.0000
  );
  background: repeating-linear-gradient(
    90deg,
    transparent 0px,
    transparent 40px,
    rgba(255, 255, 255, 0.12) 40px,
    rgba(255, 255, 255, 0.12) 48px
  );
  mix-blend-mode: plus-lighter;
  animation: kh-parallax 11s ease-in-out infinite alternate;
}
```

## Layout

- Aligned to match the original [sunlit.pages.dev](https://sunlit.pages.dev/) layout
- `article` centered with `margin: 0 auto; max-width: 800px; padding: 40vh 0;`
- Font sizes matched to original: `h1 2.5rem`, `p 1.25rem`, hint `1rem monospace`

## Credits

- Original sunlit: [jackyzha0/sunlit](https://github.com/jackyzha0/sunlit)
- Adaptation idea and article: [Ken Hawkins – Sunlit Dappled Light Effect](https://www.allaboutken.com/posts/sunlit-dappled-light-effect/)
- Inspired by [daylight computer](https://www.youtube.com/watch?v=uDDaP-BIDWE) and [chloe yan's sunlit place](https://sunlit.place/)
- Leaves texture from the original jackyzha0/sunlit project
