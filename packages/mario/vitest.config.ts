import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    watch: false,
    setupFiles: ['./setup.config.ts'],
    testTimeout: 100000,
  },
})
