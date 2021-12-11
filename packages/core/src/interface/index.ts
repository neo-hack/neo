export type CommonOptions = {
  storeDir?: string
}

export type PresetPackage = {
  name: string
}

export type LockFile = {
  templates?: Record<string, any>
  presets?: Record<string, { templates: PresetPackage[] }>
}

export type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : any
