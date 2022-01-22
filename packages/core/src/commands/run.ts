import { create } from '@aiou/mario'
import { toListr } from '@aiou/mario/helpers'
import Listr from 'listr'
import path from 'path'
import fs from 'fs-extra'

import { debug } from '../utils/logger'
import createStore from '../store'
import { ListOptions } from '../interface'

export const run = async (alias: string, params: ListOptions) => {
  debug.list('list config options %O', params)
  const target = path.join(process.cwd(), '.neo', alias)
  fs.ensureDirSync(target)
  const store = await createStore(params)
  await store.pm.request({ alias })
  await store.pm.import(target)
  const workflow = await create(path.join(target, 'index.yaml'))
  const tasks: Listr.ListrTask[] = toListr(workflow.schema)
  const list = new Listr(tasks, { concurrent: false, exitOnError: true })
  list.run()
  await workflow.start()
}
