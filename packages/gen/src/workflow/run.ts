import Shell from 'gulp-shell'
import { Action } from 'src/interface'

export type RunOptions = {
  commands?: string[] | string
  quiet?: boolean
}

export const run: Action<RunOptions> = ({ commands = [], ...options }, ctx) => {
  return Shell(typeof commands === 'string' ? [commands] : commands, { cwd: ctx.cwd, ...options })
}
