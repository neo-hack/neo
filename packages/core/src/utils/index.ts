import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import { findUp } from 'find-up'
import minimatch from 'minimatch'
import { readPackageUpSync } from 'read-pkg-up'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const r = (pathname = '.') => path.resolve(__dirname, '..', '..', pathname)

export const isMonorepo = () => findUp('pnpm-workspace.yaml')

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
