export interface PresetTemplate {
  name: string
  pref: string
}

export type Config = {
  pref: string
  name: string
}

export type Preset = {
  templates: PresetTemplate[]
  configs: Config[]
}
