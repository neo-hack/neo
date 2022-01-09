import commonjs from '@rollup/plugin-commonjs'
import alias from '@rollup/plugin-alias'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import { defineConfig } from 'rollup'
import size from 'rollup-plugin-size'
import ts from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

export default defineConfig([
  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/cli.ts',
    preserveEntrySignatures: 'strict',
    plugins: [
      ts({
        check: false,
      }),
      alias({
        resolve: ['.ts', '.js', '.tsx', '.jsx'],
        entries: [
          { find: '@/', replacement: './src/' },
          // fix: https://github.com/MatrixAI/js-virtualfs/issues/4
          { find: 'readable-stream', replacement: 'stream' },
          // fix: https://github.com/SamVerschueren/stream-to-observable/issues/2
          { find: 'any-observable', replacement: 'zen-observable' },
        ],
      }),
      nodeResolve({ preferBuiltins: true, exportConditions: ['node'] }),
      commonjs(),
      json(),
      terser(),
      size(),
    ],
    output: [
      {
        sourcemap: false,
        entryFileNames: '[name].mjs',
        manualChunks: (id) => {
          if (id.includes('listr')) {
            return 'listr'
          }
        },
        dir: 'lib',
        chunkFileNames: 'chunks/[name].js',
        format: 'esm',
      },
    ],
  },
])
