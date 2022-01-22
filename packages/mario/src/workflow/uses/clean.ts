import del from 'del'
import { Action } from '../../interface'

type CleanOptions = {
  paths?: string[]
}

export const clean: Action<CleanOptions> = async (options, ctx) => {
  await del(options.paths || [], { cwd: ctx.cwd })
}
