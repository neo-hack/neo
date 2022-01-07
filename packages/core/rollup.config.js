import commonjs from '@rollup/plugin-commonjs'
import alias from '@rollup/plugin-alias'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import { defineConfig } from 'rollup'
import size from 'rollup-plugin-size'
import esbuild from 'rollup-plugin-esbuild'
// import ts from 'rollup-plugin-typescript2'

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
    external: [
      'listr'
    ],
    plugins: [
      // ts({
      //   check: false,
      // }),
      alias({
        resolve: ['.ts', '.js', '.tsx', '.jsx'],
        entries: [
          { find: '@/', replacement: './src/' },
          // https://github.com/MatrixAI/js-virtualfs/issues/4
          { find: 'readable-stream', replacement: 'stream' },
        ],
      }),
      nodeResolve({ preferBuiltins: true }),
      commonjs(),
      esbuild({
        minify: false, // process.env.BUILD === 'production',
        sourceMap: true,
        target: 'ES2020',
      }),
      json(),
      size(),
    ],
    output: [
      {
        sourcemap: true,
        entryFileNames: '[name].mjs',
        dir: 'lib',
        chunkFileNames: 'chunks/[name].mjs',
        format: 'esm',
      },
    ],
  },
])
