import type { ResolveResult } from '@pnpm/package-store'
import type { PresetTemplate, Preset } from '@aiou/schema'

export type { Config } from '@aiou/schema'

export type CommonOptions = {
  storeDir?: string
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
}

export type LockFile = {
  templates?: Record<string, Package>
  presets?: Record<string, Preset>
}

export type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : any
