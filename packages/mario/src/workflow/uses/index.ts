import { replace } from 'src/workflow/uses/replace'
import { copy } from 'src/workflow/uses/copy'
import { jsonEditor } from 'src/workflow/uses/json-editor'
import { clean } from 'src/workflow/uses/clean'
import { factory } from 'src/workflow/factory'

export const builtInUses = {
  replace: factory(replace),
  copy,
  clean,
  'json-editor': factory(jsonEditor),
}
