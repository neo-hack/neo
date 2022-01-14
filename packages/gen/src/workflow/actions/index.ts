import { replace } from './replace'
import { copy } from './copy'
import { jsonEditor } from './json-editor'

export const builtIn = {
  replace,
  copy,
  'json-editor': jsonEditor,
}
