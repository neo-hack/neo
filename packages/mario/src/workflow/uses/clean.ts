import del from 'del'

import type { Action } from '../../interface'

export interface CleanOptions {
  paths?: string[]
}

export const clean: Action<CleanOptions> = async (options, ctx) => {
  await del(options.paths || [], { cwd: ctx.cwd })
}
