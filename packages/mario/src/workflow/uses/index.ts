import { factory } from '../factory'
import { clean } from './clean'
import { copy } from './copy'
import { jsonEditor } from './json-editor'
import { replace } from './replace'

import type { Action } from '../../interface'
import type { CleanOptions } from './clean'
import type { CopyOptions } from './copy'

export const builtInUses = {
  replace: factory(replace),
  copy: copy as Action<CopyOptions>,
  clean: clean as Action<CleanOptions>,
  'json-editor': factory(jsonEditor),
}
