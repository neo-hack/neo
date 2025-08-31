import { nodeResolve } from '@rollup/plugin-node-resolve'
import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import multiple from 'rollup-plugin-multi-input'
import { nodeExternals as externals } from 'rollup-plugin-node-externals'
import bundleSize from 'rollup-plugin-size'

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
        include: ['readable-stream'],
      }),
      multiple(),
      esbuild({
        target: 'es2022',
        minify: false,
      }), // so Rollup can convert TypeScript to JavaScript
      nodeResolve({ preferBuiltins: true }),
      bundleSize(),
    ],
    output: [{ dir: 'lib', entryFileNames: '[name].mjs', format: 'es' }],
  },
])
