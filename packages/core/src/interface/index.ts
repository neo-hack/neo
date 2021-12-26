import type { ResolveResult } from '@pnpm/package-store'
import type { PresetTemplate } from '@aiou/schema'

export type CommonOptions = {
  storeDir?: string
}

export interface PresetPackage extends PresetTemplate {
  resolvedVia?: ResolveResult['resolvedVia']
}

export interface Package extends PresetPackage {
  version: string
  pref: string
  id: string
  cached?: boolean
  // package from which preset
  preset?: string
}

export type LockFile = {
  templates?: Record<string, Package>
  presets?: Record<string, { templates: PresetPackage[] }>
}

export type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : any
