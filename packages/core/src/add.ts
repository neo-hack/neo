import log, { debugLogger } from './utils/logger'
import createStore from './store'
import { STORE_PATH } from './utils/constants'

type PresetOptions = {
  alias: string
  options: {
    storeDir?: string
    preset?: boolean
  }
  pref?: string
}

/**
 * @description add preset or template into the store
 */
export const add = async ({
  alias,
  pref,
  options = { storeDir: STORE_PATH, preset: false },
}: PresetOptions) => {
  try {
    const { storeDir, preset } = options
    debugLogger.add('options is alias %s / pref %s / options %O', alias, pref, options)
    // init store
    const store = await createStore({ storeDir })
    if (preset) {
      await store.addPreset({ alias, pref })
      return
    }
    store.addTemplate({ alias, pref })
  } catch (e) {
    log.fatal(e)
  }
}
