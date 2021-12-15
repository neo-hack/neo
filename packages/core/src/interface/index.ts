import type { ResolveResult } from '@pnpm/package-store'

export type CommonOptions = {
  storeDir?: string
}

export interface PresetPackage {
  name: string
  resolvedVia?: ResolveResult['resolvedVia']
}

export interface Package extends PresetPackage {
  version: string
  pref: string
  id: string
  cached?: boolean
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
