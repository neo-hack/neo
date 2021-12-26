interface PresetTemplate {
  name: string
  pref: string
}

export type Preset = {
  templates: PresetTemplate[]
}
