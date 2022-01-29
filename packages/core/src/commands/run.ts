import Listr from 'listr'
import path from 'path'
import fs from 'fs-extra'

import { debug } from '../utils/logger'
import { usage } from '../utils/show-usage'
import createStore from '../store'
import { CommonOptions } from '../interface'
import { isYaml } from '../utils'
import { runMario } from '../utils/mario'

export type RunOptions = CommonOptions & { module?: string[] }

export const run = async (alias: string, params: RunOptions) => {
  debug.run('run options %O', params)
  if (!alias) {
    console.log(usage.run())
    return
  }
  const store = await createStore(params)
  if (isYaml(alias)) {
    await runMario(alias, { module: params.module })
    return
  }
  const neoTempDir = path.join(process.cwd(), '.neo')
  const isNeoExit = fs.existsSync(neoTempDir)
  const target = path.join(neoTempDir, '.mario')
  fs.ensureDirSync(target)
  const prepare = new Listr([
    {
      title: `Download mario generator ${alias}`,
      task: async () => {
        const response = await store.pm.request({ alias, latest: true })
        await store.pm.import(target, await response.files?.())
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
