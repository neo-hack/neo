import alias from '@rollup/plugin-alias'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { defineConfig } from 'rollup'
import esbuild from 'rollup-plugin-esbuild'
import size from 'rollup-plugin-size'
import replace from '@rollup/plugin-replace'

export default defineConfig([
  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/cli.ts',
    external: ['readable-stream', 'source-map-support/register.js'],
    plugins: [
      esbuild({
        target: 'es2022',
        minify: false,
      }),
      replace({
        delimiters: ['', ''],
        preventAssignment: true,
        values: {
          'readable-stream/readable': 'readable-stream/readable.js',
          'readable-stream/readable.js': 'readable-stream/readable.js',
        },
      }),
      // TODO: external or include
      // fix: https://github.com/rollup/rollup/issues/1507
      // replace({
      //   delimiters: ['', ''],
      //   preventAssignment: true,
      //   values: {
      //     [`require('readable-stream/transform')`]: `require('stream').Transform`,
      //     [`require('readable-stream/readable')`]: `require('stream').Readable`,
      //     [`require('readable-stream/passthrough')`]: `require('stream').PassThrough`,
      //     'readable-stream': 'stream',
      //   },
      // }),
      alias({
        entries: [
          { find: '@/', replacement: './src/' },
          // fix: https://github.com/SamVerschueren/stream-to-observable/issues/2
          { find: 'any-observable', replacement: 'zen-observable' },
        ],
      }),
      nodeResolve({
        preferBuiltins: true,
        exportConditions: ['node'],
      }),
      commonjs(),
      json(),
      size(),
    ],
    output: [
      {
        sourcemap: true,
        entryFileNames: '[name].mjs',
        manualChunks: (id) => {
          if (id.includes('listr')) {
            return 'listr'
          }
        },
        dir: 'lib',
        chunkFileNames: 'chunks/[name].mjs',
        format: 'esm',
      },
    ],
  },
])
