import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import { findUp } from 'find-up'
import minimatch from 'minimatch'

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
