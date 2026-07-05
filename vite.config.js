import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// Vite config for sunlit-vue branch.
// - Vue 3 SFC support via @vitejs/plugin-vue
// - Vitest test config sits alongside (jsdom for composable unit tests)
// - Build output goes to dist/ for Cloudflare Pages
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',
    // Small project — inline everything for faster first paint
    assetsInlineLimit: 4096,
  },
  test: {
    environment: 'jsdom',
    globals: false,
    include: ['tests/unit/**/*.{test,spec}.{js,ts}'],
  },
});
