import createTemplatePM, { TemplatePackageManagerClient } from './utils/pm'
import lockFile from './utils/lock-file'
import { STORE_PATH } from './utils/constants'

import fs from 'fs-extra'
import path from 'path'
import tempy from 'tempy'

let pm: TemplatePackageManagerClient

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
    console.log(alias, pref, storeDir)
    // init template package manager
    pm = await createTemplatePM({ storeDir })
    // download
    const response = await pm.request(alias, pref)
    console.log(response)
    // import
    const dir = tempy.directory()
    const files = await response.files?.()
    console.log(files)
    if (!files) {
      // TODO: throw error
      return
    }
    await pm.import(dir, files)
    const pkgs = fs.readJsonSync(path.join(dir, 'index.json'))
    console.log(pkgs)
    lockFile.write({
      presets: {
        [alias]: pkgs,
      },
    })
  } catch (e) {
    console.error(e)
  }
}
