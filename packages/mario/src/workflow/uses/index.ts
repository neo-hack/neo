import { replace } from './replace'
import { copy } from './copy'
import { jsonEditor } from './json-editor'
import { clean } from './clean'
import { factory } from '../factory'

export const builtInUses = {
  replace: factory(replace),
  copy,
  clean,
  'json-editor': jsonEditor,
}
