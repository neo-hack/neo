import CopyTo from 'gulp-copy'
import gulp from 'gulp'
import rename from 'gulp-rename'
import path from 'path'

import { Action } from '../../interface'

type CopyOptions = {
  output: string
  'keep-depth'?: boolean
}

export const copy: Action<CopyOptions> = (
  options: CopyOptions = { output: process.cwd() },
  ctx,
) => {
  if (options['keep-depth']) {
    return CopyTo(path.resolve(ctx.cwd, options.output))
  }
  return [rename({ dirname: '' }), gulp.dest(options.output, { cwd: ctx.cwd })]
}
