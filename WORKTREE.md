# sunlit — git worktree 工作流

## 目录布局

```
~/Code/sunlit/                → spec 分支（规范文档 + Playwright 测试基线）
~/Code/sunlit-worktrees/
  ├─ astro/                   → astro 分支
  ├─ vue/                     → vue 分支
  ├─ react/                   → react 分支
  ├─ svelte/                  → svelte 分支
  ├─ solid/                   → solid 分支（未创建）
  ├─ preact/                  → preact 分支（未创建）
  ├─ next/                    → next 分支（未创建）
  └─ nuxt/                    → nuxt 分支（未创建）
```

## 常用命令速查

### 查看所有 worktree

```bash
git worktree list
```

### 新增一个框架分支 worktree

```bash
# 分支还不存在时（从 spec 切出新分支）
cd ~/Code/sunlit
git worktree add -b solid ~/Code/sunlit-worktrees/solid spec

# 分支已存在（远程 pull 下来后 checkout）
git worktree add ~/Code/sunlit-worktrees/solid solid
```

### 删除一个 worktree（分支保留）

```bash
git worktree remove ~/Code/sunlit-worktrees/solid
```

### 强制删除（工作区有未提交改动时）

```bash
git worktree remove --force ~/Code/sunlit-worktrees/solid
```

### 修剪已被手动删除的 worktree 记录

```bash
git worktree prune
```

## 常见工作流

### 场景 1：并行开发两个分支

```bash
# Terminal 1
cd ~/Code/sunlit-worktrees/vue
npm run dev  # → localhost:5173

# Terminal 2
cd ~/Code/sunlit-worktrees/react
npm run dev -- --port 5174  # → localhost:5174

# Terminal 3
cd ~/Code/sunlit-worktrees/svelte
npm run dev -- --port 5175  # → localhost:5175
```

三个 dev server 同时跑，切换只是 cd，不用 git checkout / npm install。

### 场景 2：跨分支对比测试

```bash
# 检查 4 个分支的构建产物大小
for D in ~/Code/sunlit-worktrees/*/; do
  cd "$D"
  echo "=== $(basename $D) ==="
  du -sh dist/ 2>/dev/null || echo "no build"
done
```

### 场景 3：跨分支同步共享资源

`favicon.svg` + `render-og-image.mjs` 是所有框架分支共用的。若在 vue 里改进了 favicon，同步到其他分支：

```bash
cd ~/Code/sunlit-worktrees/react
git checkout vue -- public/favicon.svg scripts/render-og-image.mjs
git commit -m "chore(react): sync favicon + og-image script from vue"
```

或者用 cherry-pick 单个 commit：

```bash
cd ~/Code/sunlit-worktrees/react
git cherry-pick <sha-from-vue>
```

### 场景 4：修 SPEC 后回归所有分支

在主目录改 `SPEC.md` → 各 worktree rebase 到最新 spec：

```bash
cd ~/Code/sunlit
# 编辑 SPEC.md 修 bug
git add SPEC.md && git commit -m "docs(spec): fix X"
git push

# 各分支 rebase（保持它们领先于 spec 的历史）
for BR in vue react svelte; do
  cd ~/Code/sunlit-worktrees/$BR
  git fetch origin spec
  git rebase origin/spec
done
```

### 场景 5：新分支模板复制

```bash
# 1. 创建新 worktree（从 spec 切出）
cd ~/Code/sunlit
git worktree add -b solid ~/Code/sunlit-worktrees/solid spec

# 2. 从 vue 分支拿共享资源
cd ~/Code/sunlit-worktrees/solid
git checkout vue -- public/favicon.svg src/styles.css scripts/render-og-image.mjs tests/e2e/visual.spec.js
git show upstream/main:leaves.png > public/leaves.png

# 3. 开始实现 solid 特定的组件
```

## 陷阱与注意事项

### 1. 每个 worktree 需要独立 `node_modules`

```bash
cd ~/Code/sunlit-worktrees/vue
npm install  # 每个 worktree 首次要装
```

**为什么不用 pnpm workspace?** 各分支框架不同（Vue/React/Svelte），依赖树差异大，共享 lockfile 会互相污染。

### 2. `main` 和 `adaptation` 分支被保护

`.git/config` 里可以加 hook 阻止误签出：

```
[branch "main"]
    protect = readonly
```

`main` 和 `adaptation` 分支不要加 worktree，它们是只读镜像。

### 3. Dev server 端口冲突

默认全部 5173，多分支并行必须用 `--port` 参数：

| 分支 | 建议端口 |
|---|---|
| vue | 5173 |
| react | 5174 |
| svelte | 5175 |
| solid | 5176 |
| preact | 5177 |
| astro | 4321（Astro 默认） |

### 4. Playwright baseline 是分支专属

`tests/e2e/visual.spec.js-snapshots/*.png` **必须每分支单独生成**（渲染字体/边距有微小差异）。不要把 vue 的 baseline 复制给 react。

### 5. 快速切回主目录

```bash
alias sunlit='cd ~/Code/sunlit'
alias sunlit-vue='cd ~/Code/sunlit-worktrees/vue'
alias sunlit-react='cd ~/Code/sunlit-worktrees/react'
alias sunlit-svelte='cd ~/Code/sunlit-worktrees/svelte'
```

放到 `~/.zshrc` 里省 cd 打字。

## 快速健康检查

```bash
# 一条命令查看所有 worktree 的 git 状态
for D in ~/Code/sunlit ~/Code/sunlit-worktrees/*/; do
  cd "$D" 2>/dev/null || continue
  BR=$(git branch --show-current)
  DIRTY=$(git status --porcelain | wc -l | tr -d ' ')
  echo "$(basename $D)  [$BR]  $DIRTY files dirty"
done
```
