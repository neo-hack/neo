import Shell from 'gulp-shell'

import type { Action } from '../interface'

export interface RunOptions {
  commands?: string[] | string
  quiet?: boolean
  ignoreErrors?: boolean
}

export const run: Action<RunOptions> = ({ commands = [], ...options }, ctx) => {
  return Shell(commands, { cwd: ctx.cwd, ...options })
}
