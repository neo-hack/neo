import { AsyncReturnType, CommonOptions } from '../interface'
import { debugLogger } from '../utils/logger'
import createLockFile from './lock-file'
import createTemplatePM, { RequestOptions } from './pm'

import tempy from 'tempy'
import fs from 'fs-extra'
import path from 'path'

let store: AsyncReturnType<typeof createStore>

const createStore = async (params: CommonOptions) => {
  debugLogger.store('init store at %s', params.storeDir)
  const pm = await createTemplatePM(params)
  const lockFile = createLockFile(params)
  return {
    pm,
    lockFile,
    async addPreset(params: RequestOptions) {
      const response = await pm.request(params)
      const dir = tempy.directory()
      const files = await response?.files?.()
      if (!files) {
        throw new Error(`${params.alias} response empty`)
      }
      await pm.import(dir, files)
      const pkgs = fs.readJsonSync(path.join(dir, 'index.json'))
      debugLogger.store('preset templates list: %O', pkgs)
      // always update latest alias preset
      await lockFile.updatePreset({
        [params.alias!]: pkgs,
      })
    },
    async addTemplate(params: RequestOptions) {
      const fetchResponse = await pm.request(params)
      if (!fetchResponse) {
        debugLogger.store('template not found')
        return
      }
      const manifest = await fetchResponse?.bundledManifest?.()
      const { id, resolvedVia, normalizedPref } = fetchResponse.body
      debugLogger.store('add template %s', manifest!.name)
      await lockFile.updateTemplates({
        [id]: {
          name: manifest!.name,
          version: manifest!.version,
          resolvedVia,
          id,
          pref: normalizedPref || params.alias,
        },
      })
      return fetchResponse
    },
  }
}

const create = async (params: CommonOptions) => {
  if (store) {
    return store
  }
  return createStore(params)
}

export default create
