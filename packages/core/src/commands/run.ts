import { create } from '@aiou/gen'
import { toListr } from '@aiou/gen/helpers'
import Listr from 'listr'

import { r } from '../utils'

export const run = async (alias: string) => {
  const workflow = await create(alias)
  const tasks: Listr.ListrTask[] = toListr(workflow.schema)
  const list = new Listr(tasks, { concurrent: false })
  list.run()
  await workflow.start()
}

run(r('assets/prepack.yaml'))
