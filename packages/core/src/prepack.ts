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
  pkg.scripts!['ci:publish'] = 'pnpm run build && pnpx changeset publish'
  pkg.scripts!['ci:version'] = 'pnpx changeset version'
  pkg.scripts!['ci:snapshot'] = 'pnpx changeset version --snapshot beta'
  pkg.scripts!['ci:prerelease'] = 'pnpx changeset publish --tag beta'
}

/**
 * @description prepack eslint with `@aiou`
 */
const lint = (pkg: NormalizedPackageJson) => {
  fs.copy(r('assets/eslint'), root)
  // setup package scripts
  pkg.scripts!['lint:fix'] = 'eslint . --fix'
  pkg['lint-staged'] = {
    '**/**/*.{js,ts,tsx,vue,json}': ['eslint --fix'],
  }
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
  return { pkg }
}

const postprepack = (pkg: NormalizedPackageJson) => {
  fs.writeJSONSync(path.resolve(root, './package.json'), pkg)
}

const parts = {
  ci,
  lint,
}

export const prepack = async (modules: string[] = Object.keys(parts)) => {
  const { pkg } = preprepack()
  if (!pkg) {
    return
  }
  for (const m of modules) {
    parts[m]?.(pkg)
  }
  postprepack(pkg)
}
