/**
 * @fileoverview prepack ci, lint, etc...
 */

import { r } from './utils'

import Listr from 'listr'
import pc from 'picocolors'
import fs from 'fs-extra'
import path from 'path'
import { readPackageUpSync } from 'read-pkg-up'
import type { NormalizedPackageJson } from 'read-pkg-up'
import { updatePkg } from 'husky-init'
import { install, set } from 'husky'

const root = process.cwd()

/**
 * @description setup issue template
 */
const issue = async () => {
  const target = path.resolve(root, '.github/ISSUE_TEMPLATE')
  fs.copy(r('assets/templates/ISSUE_TEMPLATE'), target)
}

/**
 * @description setup pr template
 */
const pr = async () => {
  const target = path.resolve(root, '.github/PULL_REQUEST_TEMPLATE.md')
  fs.copy(r('assets/templates/PULL_REQUEST_TEMPLATE.md'), target)
}

/**
 * @description prepack github ci
 */
const ci = async (pkg: NormalizedPackageJson) => {
  // read templates
  // write to .github/workflows
  const target = path.resolve(root, '.github/workflows')
  fs.copy(r('assets/workflows'), target)
  // setup package
  pkg.devDependencies!['@changesets/cli'] = pkg.devDependencies!['@changesets/cli'] || '^2.16.0'
  // setup ci scripts
  pkg.scripts!['ci:publish'] =
    pkg.scripts!['ci:publish'] || 'pnpm run build && pnpx changeset publish'
  pkg.scripts!['ci:version'] = pkg.scripts!['ci:version'] || 'pnpx changeset version'
  pkg.scripts!['ci:snapshot'] =
    pkg.scripts!['ci:snapshot'] || 'pnpx changeset version --snapshot beta'
  pkg.scripts!['ci:prerelease'] =
    pkg.scripts!['ci:prerelease'] || 'pnpm run build && pnpx changeset publish --tag beta'
}

/**
 * @description prepack eslint with `@aiou`
 */
const lint = async (pkg: NormalizedPackageJson) => {
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

const husky = async (pkg: NormalizedPackageJson) => {
  updatePkg(pkg, false)
  pkg.husky = undefined
  try {
    install()
    set('.husky/pre-commit', 'pnpx lint-staged')
  } catch (e) {
    throw new Error('make sure .git exited')
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
  if (!pkg.devDependencies) {
    pkg.devDependencies = {}
  }
  return { pkg }
}

const postparts = {
  ci() {
    if (!fs.existsSync(path.resolve(root, './.changeset'))) {
      console.log()
      console.log(`It\'s almost done...`)
      console.log()
      console.log(`  ${pc.blue('•')} pnpm add @changesets/cli`)
      console.log(`  ${pc.blue('•')} pnpx changeset init`)
    }
  },
}

const postprepack = (pkg: NormalizedPackageJson) => {
  fs.writeJSONSync(
    path.resolve(root, './package.json'),
    { ...pkg, _id: undefined, readme: undefined },
    { spaces: 2 },
  )
}

const parts = {
  ci: {
    title: 'Setup release.yml, snapshot-release, ci.yml',
    task: ci,
  },
  lint: {
    title: 'Setup eslint',
    task: lint,
  },
  issue: {
    title: 'Setup github issue template',
    task: issue,
  },
  pr: {
    title: 'Setup github pr template',
    task: pr,
  },
  husky: {
    title: 'Setup husky with lint-staged',
    task: husky,
  },
}

export const prepack = async (options: { module: string[] }) => {
  const { module = Object.keys(parts) } = options
  const { pkg } = preprepack()
  if (!pkg) {
    return
  }
  const tasks = new Listr(
    module.map((m) => {
      return {
        title: parts[m]?.title,
        task: () => parts[m]?.task(pkg),
      }
    }),
  )
  await tasks
    .run()
    .then(() => {
      postprepack(pkg)
      module.forEach((m) => {
        postparts[m]?.()
      })
    })
    .catch(() => {})
}
