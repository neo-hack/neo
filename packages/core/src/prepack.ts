/**
 * @fileoverview prepack ci, lint, etc...
 */

import { r } from './utils'
import fs from 'fs-extra'
import path from 'path'
import { readPackageUpSync } from 'read-pkg-up'
import type { NormalizedPackageJson } from 'read-pkg-up'

const root = process.cwd()

/**
 * @description prepack github ci
 */
const ci = (pkg: NormalizedPackageJson) => {
  // read templates
  // write to .github/workflows
  const target = path.resolve(root, '.github/workflows')
  fs.copy(r('assets/workflows'), target)
  // setup package scripts
  pkg.scripts!['ci:publish'] =
    pkg.scripts!['ci:publish'] || 'pnpm run build && pnpx changeset publish'
  pkg.scripts!['ci:version'] = pkg.scripts!['ci:version'] || 'pnpx changeset version'
  pkg.scripts!['ci:snapshot'] =
    pkg.scripts!['ci:snapshot'] || 'pnpx changeset version --snapshot beta'
  pkg.scripts!['ci:prerelease'] =
    pkg.scripts!['ci:prerelease'] || 'pnpx changeset publish --tag beta'
}

/**
 * @description prepack eslint with `@aiou`
 */
const lint = (pkg: NormalizedPackageJson) => {
  fs.copySync(r('assets/eslint'), root)
  fs.renameSync(path.resolve(root, './.eslintrc.js.tpl'), path.resolve(root, './.eslintrc.js'))
  // setup package scripts
  pkg.scripts!['lint:fix'] = 'eslint . --fix'
  // lint-staged
  pkg['lint-staged'] = {
    '**/**/*.{js,ts,tsx,vue,json}': ['eslint --fix'],
  }
  // install aiou
  pkg.devDependencies!['@aiou/eslint-config'] =
    pkg.devDependencies!['@aiou/eslint-config'] || 'latest'
  pkg.devDependencies!.eslint = pkg.devDependencies!.eslint || '^7.x'
  pkg.devDependencies!['lint-staged'] = pkg.devDependencies!['lint-staged'] || '^11.1.0'
}

const preprepack = () => {
  // read pkg
  const pkg = readPackageUpSync({ cwd: root })?.packageJson
  if (!pkg) {
    console.warn('pkg required')
    return {}
  }
  if (!pkg?.scripts) {
    pkg!.scripts = {}
  }
  if (!pkg.devDependencies) {
    pkg.devDependencies = {}
  }
  return { pkg }
}

const postprepack = (pkg: NormalizedPackageJson) => {
  fs.writeJSONSync(
    path.resolve(root, './package.json'),
    { ...pkg, _id: undefined, readme: undefined },
    { spaces: 2 },
  )
}

const parts = {
  ci,
  lint,
}

export const prepack = async (options: { module: string[] }) => {
  const { module = Object.keys(parts) } = options
  const { pkg } = preprepack()
  if (!pkg) {
    return
  }
  for (const m of module) {
    parts[m]?.(pkg)
  }
  postprepack(pkg)
}
