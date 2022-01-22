import Replace from 'gulp-replace'
import { Action } from '../../interface'

type ReplaceOptions = {
  match: string
  replacement: string
}

export const replace: Action<ReplaceOptions> = (options) => {
  return Replace(options.match, options.replacement)
}
