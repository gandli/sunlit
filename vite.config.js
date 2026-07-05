import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config for sunlit-react branch.
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096,
  },
  test: {
    environment: 'jsdom',
    globals: false,
    include: ['tests/unit/**/*.{test,spec}.{js,jsx,ts,tsx}'],
  },
});
