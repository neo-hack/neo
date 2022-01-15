import del from 'del'
import { Action } from '../../interface'

type CleanOptions = {
  paths?: string[]
}

export const clean: Action<CleanOptions> = (options, ctx) => {
  console.log(options)
  del(options.paths || [], { cwd: ctx.cwd })
}
