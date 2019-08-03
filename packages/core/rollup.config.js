import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript'
import json from 'rollup-plugin-json'
import builtins from 'builtin-modules'
import pkg from './package.json'

const plugins = [json(), typescript(), commonjs(), resolve()]

export default [
  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: 'src/index.ts',
    plugins,
    external: builtins,
    output: [{ file: pkg.main, format: 'cjs' }, { file: pkg.module, format: 'es' }],
  },
  {
    input: 'src/create.ts',
    plugins,
    external: builtins,
    output: [
      { file: pkg.main.replace('.js', '-create.js'), format: 'cjs' },
      { file: pkg.module.replace('.js', '-create.js'), format: 'es' },
    ],
  },
  {
    input: 'src/list.ts',
    plugins,
    external: builtins,
    output: [
      { file: pkg.main.replace('.js', '-list.js'), format: 'cjs' },
      { file: pkg.module.replace('.js', '-list.js'), format: 'es' },
    ],
  },
]
