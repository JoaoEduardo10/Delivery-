import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ['tests/setup.ts'],
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      exclude: [
        'src/**/**/**/*.stories.tsx',
        'src/helpers/**/*.ts',
        'src/interfaces/*.ts',
        'src/app',
        'node_modules',
        '*.js',
        '.next',
        'next-env*',
        '.story*',
      ],
    },
  },
});
