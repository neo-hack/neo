import typescript from 'rollup-plugin-typescript2'
import { externals } from 'rollup-plugin-node-externals'
import bundleSize from 'rollup-plugin-size'
import { defineConfig } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
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
      externals({
        devDeps: false,
      }),
      multiple(),
      typescript({
        check: false,
        tsconfig: './tsconfig.build.json',
      }), // so Rollup can convert TypeScript to JavaScript
      nodeResolve({ preferBuiltins: true }),
      bundleSize(),
    ],
    output: [{ dir: 'lib', entryFileNames: '[name].mjs', format: 'es' }],
  },
])
