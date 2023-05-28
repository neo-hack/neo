import path from 'node:path'

import gulp from 'gulp'
import CopyTo from 'gulp-copy'
import rename from 'gulp-rename'

import type { Action } from '../../interface'

export interface CopyOptions {
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
