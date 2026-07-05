import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// Vite config for sunlit-svelte branch.
export default defineConfig({
  plugins: [svelte({ hot: !process.env.VITEST })],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096,
  },
  test: {
    environment: 'jsdom',
    globals: false,
    include: ['tests/unit/**/*.{test,spec}.{js,ts,svelte.test.js}'],
    setupFiles: ['./tests/unit/setup.js'],
  },
});
