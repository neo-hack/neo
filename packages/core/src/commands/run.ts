import { create } from '@aiou/gen'
import { toListr } from '@aiou/gen/helpers'
import Listr from 'listr'
import path from 'path'

export const run = async (alias: string) => {
  // 1. import alias(if alias = npm package)
  // 2. alias is relative workflow filepath
  const workflow = await create(path.resolve(process.cwd(), alias))
  const tasks: Listr.ListrTask[] = toListr(workflow.schema)
  const list = new Listr(tasks, { concurrent: false })
  list.run()
  await workflow.start()
}
