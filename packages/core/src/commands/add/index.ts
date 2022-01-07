import logger, { debug } from '../../utils/logger'
import createStore from '../../store'
import { STORE_PATH } from '../../utils/constants'
import { CommonOptions } from '../../interface'

import Listr from 'listr'
import pc from 'picocolors'

type AddOptions = CommonOptions & {
  preset?: boolean
}

const showSuccessInfo = (alias: string, type: 'preset' | 'template') => {
  console.log()
  logger.success(
    `  Happy hacking, ${type} ${pc.green(alias)} already added, try \`${pc.green(
      'neo',
    )} list\` to checkout templates`,
  )
}

/**
 * @description add preset or template into the store
 */
export const add = async (
  alias: string,
  options: AddOptions = { storeDir: STORE_PATH, preset: false },
) => {
  try {
    const { storeDir, preset } = options
    debug.add('options is alias %s / options %O', alias, options)
    // init store
    const store = await createStore({ storeDir })
    if (preset) {
      const task = new Listr([
        {
          title: `Add preset ${alias}`,
          task: () => store.addPreset({ alias, latest: true }),
        },
      ])
      await task.run()
      showSuccessInfo(alias, 'preset')
      return
    }
    const task = new Listr([
      {
        title: `Add template ${alias}`,
        task: () => store.addTemplate({ alias, latest: true }),
      },
    ])
    await task.run()
    showSuccessInfo(alias, 'template')
  } catch (e) {
    logger.fatal(e)
  }
}
