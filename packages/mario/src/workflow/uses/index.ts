import { replace } from './replace'
import { copy } from './copy'
import { jsonEditor } from './json-editor'
import { clean } from './clean'

export const builtInUses = {
  replace,
  copy,
  clean,
  'json-editor': jsonEditor,
}
