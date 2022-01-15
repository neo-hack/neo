import { replace } from './replace'
import { copy } from './copy'
import { jsonEditor } from './json-editor'
import { clean } from './clean'

export const builtIn = {
  replace,
  copy,
  clean,
  'json-editor': jsonEditor,
}
