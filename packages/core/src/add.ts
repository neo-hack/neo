import logger, { debug } from './utils/logger'
import createStore from './store'
import { STORE_PATH } from './utils/constants'
import { CommonOptions } from './interface'

type AddOptions = CommonOptions & {
  preset?: boolean
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
      await store.addPreset({ alias })
      return
    }
    store.addTemplate({ alias })
  } catch (e) {
    logger.fatal(e)
  }
}
