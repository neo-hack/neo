import path from 'node:path'

import fs from 'fs-extra'
import tempy from 'tempy'

import { parseWantedPackage } from '../utils/find-pref-package'
import { debug } from '../utils/logger'
import createLockFile from './lock-file'
import createTemplatePM from './pm'

import type { CommonOptions } from '../interface'
import type { RequestOptions } from './pm'

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
      debug.store('add preset with params %O', params)
      const response = await pm.request({
        alias: params.alias,
        pref: params.pref,
        latest: params.latest,
      })
      const dir = tempy.directory()
      const importedPath = await pm.import(dir, response)
      if (!fs.existsSync(path.join(importedPath, 'index.json'))) {
        throw new Error('preset not found')
      }
      const pkgs = fs.readJsonSync(path.join(importedPath, 'index.json'))
      debug.store('preset templates list: %O', pkgs)
      // always update latest alias preset
      await lockFile.updatePreset({
        [params.name!]: pkgs,
      })
    },
    async addTemplate(params: Options) {
      debug.store('add template with params %O', params)
      const response = await pm.request({
        alias: params.alias,
        pref: params.pref,
        latest: params.latest,
      })
      if (!response) {
        debug.store('template not found')
        return
      }
      const { id } = response.body
      console.log('response.body', response.body)
      // templates pkgs maybe has same name, use id as key
      // name and pref parsed from user-input
      await lockFile.updateTemplates({
        [id]: {
          name: params.name,
          version: response.body.manifest?.version,
          id,
          pref: params.pref,
        },
      })
      return response
    },
  }
}

const create = async (params: CommonOptions) => {
  const store = await createStore(params)
  return store
}

export default create
