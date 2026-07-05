import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
      '@testing-library/react': '@testing-library/preact',
    },
  },
  build: { outDir: 'dist' },
  test: {
    environment: 'jsdom',
    globals: false,
    setupFiles: ['./tests/unit/setup.js'],
    include: ['tests/unit/**/*.{test,spec}.{js,jsx,ts,tsx}'],
  },
});
