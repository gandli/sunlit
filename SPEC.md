# Sunlit 跨框架一致性规范 (SPEC v1.0)

> **目的**：`sunlit` 项目由本仓库 fork 自 [jackyzha0/sunlit](https://github.com/jackyzha0/sunlit)。本仓库计划提供**多种前端框架的等价实现**：`framework/vue`、`framework/react`、`framework/svelte`、`framework/solid`、`framework/nuxt`、`framework/next`、`framework/preact`、`framework/lit` 等。本规范定义**所有框架分支必须共同遵守的视觉、DOM、行为契约**，作为跨分支验收测试（Playwright）的唯一真理源（Single Source of Truth, SSoT）。
>
> 📌 **视觉基准**：<https://sunlit.pages.dev>（jackyzha0 生产站，原作者维护）
>
> 🔒 **只读分支**：`main` 分支保持与上游 `jackyzha0/sunlit` 完全一致，**永不修改**。所有修复和扩展在其它分支进行。
>
> 🧭 **本分支（`spec`）职责**：仅承载规范文档、Playwright 测试骨架、参考截图。不包含任何框架实现代码。所有 `framework/*` 分支从本分支切出，继承 `SPEC.md` + `tests/` + `spec/reference/`。

---

## 目录

1. [DOM 不变量（Structural Invariants）](#1-dom-不变量)
2. [CSS 变量与主题令牌](#2-css-变量与主题令牌)
3. [布局与几何常量](#3-布局与几何常量)
4. [动画与过渡](#4-动画与过渡)
5. [交互行为](#5-交互行为)
6. [无障碍与降级](#6-无障碍与降级)
7. [资源引用](#7-资源引用)
8. [跨分支验收测试](#8-跨分支验收测试)
9. [已知偏差与修复清单](#9-已知偏差与修复清单)

---

## 1. DOM 不变量

**每个分支的最终渲染 DOM 必须包含以下结构**（可用 `document.querySelectorAll` 断言）：

| 选择器 | 数量 | 说明 |
|---|---:|---|
| `#dappled-light` | 1 | 顶层光影容器 |
| `#dappled-light > #glow` | 1 | 主光晕层 |
| `#dappled-light > #glow-bounce` | 1 | 反弹光层 |
| `#dappled-light > .perspective` | 1 | 3D 透视容器 |
| `.perspective > #leaves` | 1 | 树叶层 |
| `#leaves > svg > defs > filter#wind` | 1 | 风滤镜 |
| `filter#wind > feTurbulence` | 1 | 分形噪声 |
| `filter#wind > feDisplacementMap` | 1 | 位移贴图 |
| `.perspective > #blinds` | 1 | 百叶窗容器 |
| `#blinds > .shutters > .shutter` | **23** | 水平百叶片（严格 23 片） |
| `#blinds > .vertical > .bar` | **2** | 垂直分隔杆（严格 2 根） |
| `#progressive-blur > div` | **4** | 渐进模糊层（严格 4 层） |
| `article > h1` | 1 | 文本内容 `sunlit` |
| `article > p > a` | 3 | 3 个外链 |
| `article > pre > code` | 1 | `space` 提示 |

**验证脚本**（`spec/dom-invariants.js`）：
```js
export const INVARIANTS = {
  '#dappled-light': 1,
  '#glow': 1,
  '#glow-bounce': 1,
  '.perspective': 1,
  '#leaves': 1,
  '#wind feTurbulence': 1,
  '#wind feDisplacementMap': 1,
  '#blinds': 1,
  '.shutters .shutter': 23,
  '.vertical .bar': 2,
  '#progressive-blur > div': 4,
  'article h1': 1,
  'article p a': 3,
};
```

---

## 2. CSS 变量与主题令牌

**必须挂在 `body` 上，命名与值严格一致**：

```css
body {
  /* 时段色板 */
  --day:      #fffdfa;
  --evening:  #fccc83;
  --dusk:     #db7a2a;
  --night:    #0f131c;
  --dawn:     #16132b;
  --morning:  #9fb3bf;

  /* 派生令牌（浅色态） */
  --light:         var(--day);
  --dark:          var(--night);
  --shadow:        #1a1917;
  --bounce-light:  #f5d7a6;
  --timing-fn:     cubic-bezier(0.455, 0.190, 0.000, 0.985);
}

body.dark {
  --light:        var(--night);
  --dark:         var(--day);
  --shadow:       #030307;
  --bounce-light: #1b293f;
}
```

⚠️ 不允许各分支自定义色板；如需扩展主题，另开变量文件并在 SPEC v2 讨论。

---

## 3. 布局与几何常量

| 元素 | 属性 | 值 | 说明 |
|---|---|---|---|
| `article` | `max-width` | `800px` | 内容容器 |
| `article` | `padding` | `40vh 0` | 上下留白 |
| `.perspective` | `top` | `-30vh` | |
| `.perspective` | `right` | `0` | |
| `.perspective` | `width` | `80vw` | |
| `.perspective` | `height` | `130vh` | |
| `.perspective` | `opacity` | `0.07`（day）/ `0.3`（dark） | |
| `.perspective` | `transform` | `matrix3d(0.75, -0.0625, ...)` day / `matrix3d(0.8333, 0.0833, ...)` dark | 见附录 A |
| `#leaves` | `width` × `height` | `1600px × 1400px` | |
| `#leaves` | `bottom` / `right` | `-20px` / `-700px` | |
| `.shutter` | `height` | `40px`（day）/ `80px`（dark） | |
| `.shutters` | `gap` | `60px`（day）/ `20px`（dark） | |
| `.vertical > .bar` | `width` | `5px` | ⚠️ **main 分支存在 `width: 5;` 缺单位 bug，见 §9** |
| `#progressive-blur > div:nth-child(1)` | `blur` | `6px`, stops `0%/0%` | |
| `#progressive-blur > div:nth-child(2)` | `blur` | `12px`, stops `40%/80%` | |
| `#progressive-blur > div:nth-child(3)` | `blur` | `48px`, stops `40%/70%` | |
| `#progressive-blur > div:nth-child(4)` | `blur` | `96px`, stops `70%/80%` | |
| `#dappled-light` | `position` | `fixed` | 视口锚定 |
| `#progressive-blur` | `position` | `fixed`, `z-index: 1` | ⚠️ **main 用 `absolute`，见 §9** |

**渐变角度**（不允许改）：
- `#glow`：`linear-gradient(309deg, ...)`
- `#glow-bounce`：`linear-gradient(355deg, ...)`
- `#progressive-blur mask`：`linear-gradient(252deg, ...)`

---

## 4. 动画与过渡

| Keyframe | 时长 | Timing | 触发 |
|---|---|---|---|
| `sunrise` | `1s` linear | `body.animation-ready:not(.dark)` |
| `sunset` | `1.7s` linear | `body.animation-ready.dark` |
| `billow` | `8s ease-in-out infinite` | `#leaves` |
| `.perspective` transform | `1.7s var(--timing-fn)` | 主题切换 |
| `.perspective` opacity | `4s ease` | 主题切换 |
| `.shutters` gap | `1.0s var(--timing-fn)` | 主题切换 |
| `.shutter` height | `1.0s var(--timing-fn)` | 主题切换 |
| `#glow`, `#glow-bounce` background | `1.0s var(--timing-fn)` | 主题切换 |
| SVG `feTurbulence baseFrequency` | `16s` `0;0.33;0.66;1` | 无限 |
| SVG `feDisplacementMap scale` | `20s` `0;0.25;0.5;0.75;1`，值 `45;55;75;55;45` | 无限 |

---

## 5. 交互行为

**统一的用户交互合约**（所有分支必须一致）：

| 交互 | 行为 |
|---|---|
| 首次加载 | `body` **不含** `.animation-ready`，**不含** `.dark` |
| 按下 `Space`（keyCode 32 / code `Space`） | 添加 `.animation-ready` + toggle `.dark` |
| 点击 `document`（任何位置） | 添加 `.animation-ready` + toggle `.dark` |
| 触摸 `document`（移动端） | 同上（`click` 事件已覆盖） |

**参考实现**（伪代码，各框架适配）：
```js
function toggle() {
  document.body.classList.add('animation-ready');
  document.body.classList.toggle('dark');
}
window.addEventListener('keydown', e => { if (e.code === 'Space') toggle(); });
window.addEventListener('click', toggle);
```

⚠️ `astro` 分支目前**注释掉了 click**，属于偏差，见 §9。

---

## 6. 无障碍与降级

**所有分支必须实现**：

```css
/* 减弱动画 */
@media (prefers-reduced-motion: reduce) {
  #dappled-light { display: none; }
}

/* 高对比度 */
@media (prefers-contrast: more) {
  #dappled-light { display: none; }
}
```

**HTML 层**：
- `#dappled-light` 和 `#progressive-blur` 加 `aria-hidden="true"`
- `<html lang="en">`
- `<meta name="viewport" content="width=device-width, initial-scale=1">`

⚠️ `main` 分支目前缺失以上所有，见 §9。

---

## 7. 资源引用

| 资源 | 引用方式 |
|---|---|
| `leaves.png` | **本仓库内 `/leaves.png` 或框架 public 目录**，禁止外链 GitHub raw |
| 字体 | `system-ui, -apple-system, sans-serif` |
| favicon | `/favicon.svg`（可选） |

⚠️ `astro` 分支用了 `https://raw.githubusercontent.com/jackyzha0/sunlit/main/leaves.png`，属于偏差。

---

## 8. 跨分支验收测试

### 8.1 单元测试（Vitest / 框架无关）

**逻辑合约**（`tests/unit/toggle.test.ts`）：
- 初始 body 无 `.dark`、无 `.animation-ready`
- 调用 `toggle()` 一次 → 两个 class 都存在
- 再次调用 → `.dark` 消失，`.animation-ready` 保留

### 8.2 E2E 与视觉回归（Playwright）

**`tests/e2e/dom-invariants.spec.ts`**：
```ts
import { INVARIANTS } from '../../spec/dom-invariants';
test.describe('DOM invariants', () => {
  for (const [sel, count] of Object.entries(INVARIANTS)) {
    test(`${sel} × ${count}`, async ({ page }) => {
      await page.goto('/');
      await expect(page.locator(sel)).toHaveCount(count as number);
    });
  }
});
```

**`tests/e2e/interaction.spec.ts`**：
- Space → `.dark` 切换
- Click → `.dark` 切换
- 首次触发后 `.animation-ready` 存在

**`tests/e2e/visual.spec.ts`**（像素级基准，容差 0.5%）：
- 白天态截图 vs `spec/reference/day.png`
- 夜晚态截图 vs `spec/reference/night.png`
- 视口锁定：`1280 × 720`，`devicePixelRatio: 1`

### 8.3 CI 门槛
```yaml
# .github/workflows/consistency.yml（每个分支都运行）
- npm ci
- npm run build
- npx playwright test --reporter=list
```
**任一测试失败 → PR 阻塞**。

---

## 9. 上游状态与偏差记录

`main` 分支**保持与上游 `jackyzha0/sunlit` 完全一致，永不修改**。以下记录上游存在的问题以及 `astro` 分支的偏差，作为 framework/* 分支实现时的**警示清单**——新分支不得引入这些偏差。

### 9.1 上游 `main` 的已知问题（framework 分支必须避免）

| # | 位置 | 现象 | framework/* 分支应采用 |
|---|---|---|---|
| U1 | `index.css` `.vertical > .bar` | `width: 5;` **缺 `px` 单位**，垂直分隔杆渲染宽度为 0 | `width: 5px;` |
| U2 | `index.css` `#progressive-blur` | `position: absolute`，随文档滚动 | `position: fixed; z-index: 1;` |
| U3 | `index.html` | 缺 `aria-hidden`、`lang`、`viewport` | 见 §6 |
| U4 | 无降级 | 缺 `prefers-reduced-motion` / `prefers-contrast` | 必须实现 |

> 📌 U1 是**明确的 CSS 错误**（缺失单位），非设计选择。生产站 <https://sunlit.pages.dev> 的黄金截图仍以 main 分支为基准，垂直杆的"消失"是既定视觉效果的一部分。framework/* 分支可自行选择：**A) 复刻 bug 求像素一致**；**B) 修正为 5px 求视觉正确**。建议 **B**，并在该分支 README 声明。

### 9.2 `astro` 分支已知偏差（需修复）

| # | 位置 | 现象 | 修复动作 |
|---|---|---|---|
| A1 | `Sunlit.astro:252` | `leaves.png` 外链 `https://raw.githubusercontent.com/jackyzha0/sunlit/main/leaves.png` | 改为本地 `/leaves.png`，`public/leaves.png` 从 upstream 拷入 |
| A2 | `Sunlit.astro:352-355` | 点击切换被注释禁用 | 恢复 `document.addEventListener('click', toggle)` |

### 9.3 framework/* 分支实现要求

所有新框架分支必须：
1. ✅ 修正 U1（`width: 5px`）
2. ✅ 修正 U2（`position: fixed`）
3. ✅ 实现 U3、U4（无障碍与降级）
4. ✅ 支持 `Space` **和** `click` 两种切换（不接受 astro 早期的偏差）
5. ✅ `leaves.png` 使用**本地资源**，禁止外链
6. ✅ Playwright 测试全部通过

---

## 附录 A：`.perspective` matrix3d 值

**Day**：
```
matrix3d(
   0.7500, -0.0625,  0.0000,  0.0008,
   0.0000,  1.0000,  0.0000,  0.0000,
   0.0000,  0.0000,  1.0000,  0.0000,
   0.0000,  0.0000,  0.0000,  1.0000
)
```

**Dark**：
```
matrix3d(
   0.8333,  0.0833,  0.0000,  0.0003,
   0.0000,  1.0000,  0.0000,  0.0000,
   0.0000,  0.0000,  1.0000,  0.0000,
   0.0000,  0.0000,  0.0000,  1.0000
)
```

---

## 附录 B：分支路线图

| 分支 | 状态 | 角色 |
|---|---|---|
| `main` | 🔒 只读 | 上游 `jackyzha0/sunlit` 原版镜像，永不修改 |
| `adaptation` | 🔒 只读 | Ken Hawkins 零 JS 版实现，独立保留 |
| `astro` | 🛠 需修复 | Astro 版；按 §9.2 修复 A1、A2 |
| `spec` | ✅ 本分支 | 规范文档 + Playwright 测试 + 参考截图 |
| `framework/vue` | ⏳ 待建 | Vue 3 + Vite + `<script setup>` |
| `framework/react` | ⏳ 待建 | React 19 + Vite |
| `framework/svelte` | ⏳ 待建 | Svelte 5 Runes + Vite |
| `framework/solid` | ⏳ 待建 | SolidJS + Vite |
| `framework/nuxt` | 🕐 后续 | Nuxt 3 静态生成 |
| `framework/next` | 🕐 后续 | Next 15 静态导出 |
| `framework/preact` | 🕐 后续 | Preact + Vite |
| `framework/lit` | 🕐 后续 | Lit 3 Web Component |

**新增框架分支流程**：
1. 从 `spec` 分支切出 `framework/<name>`（继承 SPEC.md + tests/ + spec/reference/）
2. 从 upstream `main` 拷贝 `leaves.png` 到该分支的静态资源目录
3. 组件化拆分：`DappledLight` / `Blinds` / `Leaves` / `ProgressiveBlur` / `SunToggle`
4. 交互逻辑抽离到 `useSunToggle`（composable / hook / store）
5. 遵守 §9.3 的全部要求
6. 运行 `npm test` 全部通过
7. 部署到 `sunlit-<name>.pages.dev`

---

**版本历史**：
- v1.0（2026-07-05）：初版规范，包含 DOM 不变量、主题令牌、交互合约、跨分支验收测试
