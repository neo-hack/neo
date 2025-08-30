import type { Preset, PresetTemplate } from '@aiou/schema'
import type { Options } from 'pacote'

export type { Config } from '@aiou/schema'

export interface CommonOptions extends Options {
  storeDir?: string
  latest?: boolean
}

export type ListOptions = CommonOptions & {
  preset: string[]
  interactive?: boolean
}

export interface Package extends PresetTemplate {
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
  version?: string
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

export interface PackageResponse {
  body: {
    id: string
    latest?: string
    manifest: any
    resolution: {
      integrity?: string
      tarball?: string
    }
  }
}
