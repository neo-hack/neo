import Copy from 'gulp-copy'
import gulp from 'gulp'
import path from 'path'

import { Action } from '../../interface'

type CopyOptions = {
  output: string
  keepDepth?: boolean
}

export const copy: Action<CopyOptions> = (options: CopyOptions, ctx) => {
  if (options.keepDepth) {
    return Copy(path.join(ctx.cwd, options.output))
  }
  return gulp.dest(options.output, { cwd: ctx.cwd })
}
