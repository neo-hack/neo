export type CommonOptions = {
  storeDir?: string
}

export type PresetPackage = {
  name: string
}

export type LockFile = {
  presets?: Record<string, { templates: PresetPackage[] }>
}
