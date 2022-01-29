import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import { findUp } from 'find-up'
import minimatch from 'minimatch'
import pc from 'picocolors'
import { readPackageUpSync } from 'read-pkg-up'
import { Package } from '../interface'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const r = (pathname = '.') => path.resolve(__dirname, '..', '..', pathname)

export const isMonorepo = () => findUp('pnpm-workspace.yaml')
export const isYaml = (filepath: string) => ['.yaml', '.yml'].includes(path.extname(filepath))

/**
 * @description
 * - '@aiou/preset-aiou', ['@aiou/*'] true
 */
export const isMatchPreset = (preset?: string, names?: string[]) => {
  if (!preset || !names) {
    return
  }
  return names.some((name) => name === preset || minimatch(preset, name))
}

export const readPkg = () => {
  const pkg = readPackageUpSync({ cwd: r() })?.packageJson
  return pkg
}

/**
 * @description Generate pkg uniq id
 * in default
 */
export const makeUniqId = (pkg: Partial<Package>) => {
  return `${pkg.name} (${pkg.pref || pkg.name})`
}

export const colorify = (
  pkgs: Partial<{ name: string; pref: string; cached: boolean }>[],
  counters: Record<string, number> = {},
) => {
  return pkgs.map((pkg) => {
    if (pkg.cached) {
      return counters[pkg.name!] > 1 && pkg.pref
        ? `${pc.green(makeUniqId(pkg))}`
        : pc.green(pkg.name)
    }
    return counters[pkg.name!] > 1 && pkg.pref ? `${pc.gray(makeUniqId(pkg))}` : pc.gray(pkg.name)
  })
}
