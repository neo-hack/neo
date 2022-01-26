import { AsyncReturnType, CommonOptions } from '../interface'
import { debug } from '../utils/logger'
import createLockFile from './lock-file'
import createTemplatePM, { RequestOptions } from './pm'

import tempy from 'tempy'
import fs from 'fs-extra'
import path from 'path'
import parseWantedDependency from '@pnpm/parse-wanted-dependency'

let store: AsyncReturnType<typeof createStore>

const createStore = async (params: CommonOptions) => {
  debug.store('init store at %s', params.storeDir || 'default')
  const pm = await createTemplatePM(params)
  const lockFile = createLockFile(params)
  return {
    pm,
    lockFile,
    async request(params: RequestOptions) {
      const { alias, pref: parsedPref } = parseWantedDependency(params.alias!)
      const pref = params.pref || parsedPref
      const response = await pm.request({ ...params, alias, pref })
      return {
        response,
        alias,
        pref,
      }
    },
    async addPreset(params: RequestOptions) {
      const { response, alias } = await this.request(params)
      const dir = tempy.directory()
      const files = await response?.files?.()
      if (!files) {
        throw new Error(`${params.alias} response empty`)
      }
      await pm.import(dir, files)
      const pkgs = fs.readJsonSync(path.join(dir, 'index.json'))
      debug.store('preset templates list: %O', pkgs)
      // always update latest alias preset
      await lockFile.updatePreset({
        [alias!]: pkgs,
      })
    },
    async addTemplate(params: RequestOptions & { displayName?: string }) {
      const { response, alias } = await this.request(params)
      if (!response) {
        debug.store('template not found')
        return
      }
      const manifest = await response?.bundledManifest?.()
      const { id, resolvedVia } = response.body
      debug.store('add template %s', manifest!.name)
      await lockFile.updateTemplates({
        [id]: {
          name: params.displayName || manifest!.name,
          version: manifest!.version,
          resolvedVia,
          id,
          pref: alias,
        },
      })
      return response
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
