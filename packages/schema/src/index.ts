export interface PresetTemplate {
  name: string
  pref: string
}

export type RC = {
  pref: string
  name: string
}

export type Preset = {
  templates: PresetTemplate[]
  configs: RC[]
}
