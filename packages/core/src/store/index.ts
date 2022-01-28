import { AsyncReturnType, CommonOptions } from '../interface'
import { debug } from '../utils/logger'
import createLockFile from './lock-file'
import createTemplatePM, { RequestOptions } from './pm'

import tempy from 'tempy'
import fs from 'fs-extra'
import path from 'path'
import { parseWantedPackage } from '../utils/find-pref-package'

let store: AsyncReturnType<typeof createStore>

type Options = RequestOptions & {
  name: string
  version?: string
}

const createStore = async (params: CommonOptions) => {
  debug.store('init store at %s', params.storeDir || 'default')
  const pm = await createTemplatePM(params)
  const lockFile = createLockFile(params)
  return {
    pm,
    lockFile,
    async add(params: { type?: 'preset' | 'template'; pref: string }) {
      const pkg = parseWantedPackage(params.pref)
      if (params.type === 'preset') {
        await this.addPreset({
          alias: pkg.alias,
          name: pkg.name,
          pref: params.pref,
          version: pkg.version,
        })
        return
      }
      await this.addTemplate({
        alias: pkg.alias,
        name: pkg.name,
        pref: params.pref,
        version: pkg.version,
      })
    },
    async addPreset(params: Options) {
      const response = await pm.request({
        alias: params.alias,
        pref: params.version,
      })
      const dir = tempy.directory()
      const files = await response?.files?.()
      await pm.import(dir, files)
      if (!fs.existsSync(path.join(dir, 'index.json'))) {
        throw new Error(`preset not found`)
      }
      const pkgs = fs.readJsonSync(path.join(dir, 'index.json'))
      debug.store('preset templates list: %O', pkgs)
      // always update latest alias preset
      await lockFile.updatePreset({
        [params.name!]: pkgs,
      })
    },
    async addTemplate(params: Options) {
      const response = await pm.request({
        alias: params.alias,
        pref: params.version,
      })
      if (!response) {
        debug.store('template not found')
        return
      }
      const manifest = await response?.bundledManifest?.()
      const { id, resolvedVia } = response.body
      debug.store('add template %s', manifest!.name)
      await lockFile.updateTemplates({
        [id]: {
          name: params.name || manifest!.name,
          version: manifest!.version,
          resolvedVia,
          id,
          pref: params.pref,
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
