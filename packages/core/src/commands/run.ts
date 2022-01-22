import { create } from '@aiou/mario'
import { toListr } from '@aiou/mario/helpers'
import Listr from 'listr'
import path from 'path'
import fs from 'fs-extra'

import { debug } from '../utils/logger'
import createStore from '../store'
import { CommonOptions } from '../interface'
import { isYaml } from '../utils'
import { LogLevel } from 'consola'

type RunOptions = CommonOptions & { module: string[] }

const runMario = async (filepath: string, options: Pick<RunOptions, 'module'>) => {
  const workflow = await create(filepath, { logLevel: LogLevel.Silent, jobs: options.module })
  const tasks: Listr.ListrTask[] = toListr(workflow.schema)
  const list = new Listr(tasks, { concurrent: false, exitOnError: true })
  list.run()
  await workflow.start()
}

export const run = async (alias: string, params: RunOptions) => {
  debug.run('run options %O', params)
  if (isYaml(alias)) {
    await runMario(alias, { module: params.module })
    return
  }
  const neoTempDir = path.join(process.cwd(), '.neo')
  const isNeoExit = fs.existsSync(neoTempDir)
  const target = path.join(neoTempDir, '.mario')
  fs.ensureDirSync(target)
  const store = await createStore(params)
  const prepare = new Listr([
    {
      title: `Download mario generator ${alias}`,
      task: async () => {
        const res = await store.pm.request({ alias, latest: true })
        await store.pm.import(target, await res.files?.())
        return true
      },
    },
  ])
  await prepare.run()
  await runMario(path.join(target, 'index.yaml'), { module: params.module })
  if (isNeoExit) {
    fs.removeSync(target)
  } else {
    fs.removeSync(neoTempDir)
  }
}
