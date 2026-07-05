import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solid()],
  build: { outDir: 'dist' },
  test: {
    environment: 'jsdom',
    globals: false,
    setupFiles: ['./tests/unit/setup.js'],
    include: ['tests/unit/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    transformMode: { web: [/\.[jt]sx?$/] },
  },
});
