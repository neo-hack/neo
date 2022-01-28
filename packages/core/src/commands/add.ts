import logger, { debug } from '../utils/logger'
import createStore from '../store'
import { STORE_PATH } from '../utils/constants'
import { CommonOptions } from '../interface'

import Listr from 'listr'
import pc from 'picocolors'

type AddOptions = CommonOptions & {
  preset?: boolean
}

const showSuccessInfo = (alias: string, type: 'preset' | 'template') => {
  console.log()
  logger.success(
    `  ${type} ${pc.green(alias)} already added, try \`${pc.green(
      'neo',
    )} list\` to checkout templates. Happy hacking!`,
  )
}

/**
 * @description add preset or template into the store
 */
export const add = async (
  pref: string,
  options: AddOptions = { storeDir: STORE_PATH, preset: false },
) => {
  try {
    const { storeDir, preset } = options
    debug.add('options is alias %s / options %O', pref, options)
    // init store
    const store = await createStore({ storeDir })
    if (preset) {
      const task = new Listr([
        {
          title: `Add preset ${pref}`,
          task: () => store.add({ pref, type: 'preset' }),
        },
      ])
      await task.run()
      showSuccessInfo(pref, 'preset')
      return
    }
    const task = new Listr([
      {
        title: `Add template ${pref}`,
        task: () => store.add({ pref, type: 'template' }),
      },
    ])
    await task.run()
    showSuccessInfo(pref, 'template')
  } catch (e) {
    logger.fatal(e)
  }
}
