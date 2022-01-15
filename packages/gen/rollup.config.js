import typescript from 'rollup-plugin-typescript2'
import excludeDependenciesFromBundle from 'rollup-plugin-exclude-dependencies-from-bundle'
import bundleSize from 'rollup-plugin-size'
import { defineConfig } from 'rollup'
import multiple from 'rollup-plugin-multi-input'

export default defineConfig([
  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: ['src/**/*.ts', '!src/**/*.d.ts'],
    plugins: [
      excludeDependenciesFromBundle(),
      multiple(),
      typescript({
        check: false,
        tsconfig: './tsconfig.build.json',
      }), // so Rollup can convert TypeScript to JavaScript
      bundleSize(),
    ],
    output: [{ dir: 'lib', entryFileNames: '[name].mjs', format: 'es' }],
  },
])
