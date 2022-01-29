import Replace from 'gulp-replace'
import { Action } from '../../interface'

type Pattern = {
  match: string
  replacement: string
}

type ReplaceOptions = {
  match: string
  replacement: string
  pairs?: Pattern[]
}

export const replace: Action<ReplaceOptions> = (options) => {
  const pipe = Replace(options.match, options.replacement)
  if (options.pairs) {
    const pipes = options.pairs.map((pattern) => {
      return Replace(pattern.match, pattern.replacement)
    })
    return [pipe].concat(pipes)
  }
  return pipe
}
