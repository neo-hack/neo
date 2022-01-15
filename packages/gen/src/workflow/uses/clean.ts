import del from 'del'
import { Action } from '../../interface'

type CleanOptions = {
  paths?: string[]
}

export const clean: Action<CleanOptions> = (options, ctx) => {
  del(options.paths || [], { cwd: ctx.cwd })
}
