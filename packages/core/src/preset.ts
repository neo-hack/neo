import createTemplatePM, { TemplatePackageManagerClient } from './utils/pm'
import log, { debugLogger } from './utils/logger'
import createLockFile from './utils/lock-file'
import { STORE_PATH } from './utils/constants'

import fs from 'fs-extra'
import path from 'path'
import tempy from 'tempy'

let pm: TemplatePackageManagerClient
let lockFile: ReturnType<typeof createLockFile>

type PresetOptions = {
  alias: string
  storeDir?: string
  pref?: string
}

/**
 * @description load preset/npm-package to local yaml file
 */
export const preset = async ({ alias, pref, storeDir = STORE_PATH }: PresetOptions) => {
  try {
    debugLogger.preset('fetch %s with pref %s at %s', alias, pref, storeDir)
    // init template package manager
    pm = await createTemplatePM({ storeDir })
    lockFile = createLockFile({ storeDir })
    // download
    const response = await pm.request(alias, pref)
    const dir = tempy.directory()
    const files = await response.files?.()
    if (!files) {
      throw new Error(`${alias} is empty`)
    }
    await pm.import(dir, files)
    const pkgs = fs.readJsonSync(path.join(dir, 'index.json'))
    debugLogger.preset('%O', pkgs)
    // always update latest alias preset
    await lockFile.updatePreset({
      [alias]: pkgs,
    })
  } catch (e) {
    log.fatal(e)
  }
}
