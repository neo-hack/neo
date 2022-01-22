import { create } from '@aiou/mario'
import { toListr } from '@aiou/mario/helpers'
import Listr from 'listr'
import path from 'path'
import fs from 'fs-extra'

import { debug } from '../utils/logger'
import createStore from '../store'
import { ListOptions } from '../interface'
import { isYaml } from '../utils'

const runMario = async (filepath: string) => {
  const workflow = await create(filepath)
  const tasks: Listr.ListrTask[] = toListr(workflow.schema)
  const list = new Listr(tasks, { concurrent: false, exitOnError: true })
  list.run()
  await workflow.start()
}

export const run = async (alias: string, params: ListOptions) => {
  debug.run('run options %O', params)
  if (isYaml(alias)) {
    await runMario(alias)
    return
  }
  const neoTempDir = path.join(process.cwd(), '.neo')
  // const isNeoExit = fs.existsSync(neoTempDir)
  const target = path.join(neoTempDir, alias)
  fs.ensureDirSync(target)
  const store = await createStore(params)
  const prepare = new Listr([
    {
      title: `Download mario generator ${alias}`,
      task: async () => {
        const res = await store.pm.request({ alias })
        await store.pm.import(target, await res.files?.())
        return true
      },
    },
  ])
  await prepare.run()
  await runMario(path.join(target, 'index.yaml'))
  // if (isNeoExit) {
  //   fs.removeSync(target)
  // } else {
  //   fs.removeSync(neoTempDir)
  // }
}
