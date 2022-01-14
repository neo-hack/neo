import Copy from 'gulp-copy'
import path from 'path'
import { Action } from '../../interface'

type CopyOptions = {
  output: string
}

export const copy: Action<CopyOptions> = (options: CopyOptions, ctx) => {
  return Copy(path.join(ctx.cwd, options.output))
}
