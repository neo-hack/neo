import type { Preset, PresetTemplate } from '@aiou/schema'
import type { ResolveResult } from '@pnpm/package-store'

export type { Config } from '@aiou/schema'

export interface CommonOptions {
  storeDir?: string
}

export type ListOptions = CommonOptions & {
  preset: string[]
  interactive?: boolean
}

export interface Package extends PresetTemplate {
  resolvedVia?: ResolveResult['resolvedVia']
  version: string
  pref: string
  id: string
  cached?: boolean
  // package from which preset
  preset?: string
  // inject from read lock file
  displayName?: string
  // inject from read lock file
  _name?: string
}

export interface LockFile {
  templates?: Record<string, Package>
  presets?: Record<string, Preset>
}

export type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : any

export interface AppConfig {
  mario: string
}
