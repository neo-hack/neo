import writeYamlFile from 'write-yaml-file'
import readYamlFile from 'read-yaml-file'
import path from 'path'
import fs from 'fs-extra'
import countby from 'lodash.countby'
import compact from 'lodash.compact'

import { LOCK_FILE, STORE_PATH } from '../utils/constants'
import { CommonOptions, LockFile, Package, Config } from '../interface'
import { debug } from '../utils/logger'
import { isMatchPreset, makeUniqId } from '../utils'

const getLockFilePath = (storeDir = STORE_PATH) => {
  return path.join(storeDir, LOCK_FILE)
}

let lockFile: ReturnType<typeof createLockFile>

export const createLockFile = ({ lockFilePath }: { lockFilePath: string }) => {
  debug.lockfile('lockfilepath at %s', lockFilePath)
  return {
    getLockFilePath() {
      return lockFilePath
    },
    async read(): Promise<LockFile> {
      // make sure lockfile
      if (!fs.existsSync(lockFilePath)) {
        return {}
      }
      return readYamlFile(lockFilePath)
    },
    async write(data: LockFile) {
      return writeYamlFile(lockFilePath, data)
    },
    async updatePreset(data: any) {
      const lockfile: LockFile = await this.read()
      debug.lockfile('update preset %O', data)
      if (!lockfile.presets) {
        lockfile.presets = {}
      }
      lockfile.presets = { ...lockfile.presets, ...data }
      return this.write(lockfile)
    },
    async updateTemplates(data: any) {
      const lockfile: LockFile = await this.read()
      debug.lockfile('update templates %O', data)
      if (!lockfile.templates) {
        lockfile.templates = {}
      }
      lockfile.templates = { ...lockfile.templates, ...data }
      return this.write(lockfile)
    },
    /**
     * @description read `neo-lock` templates, flat preset template and packages.
     * will flag package if cached
     * will inject package original preset
     * uniq package by makeUniqId
     * perf cached latest version
     */
    async readTemplates({ presetNames }: { presetNames?: string[] } = {}): Promise<
      Partial<Package>[]
    > {
      const lockFile = await this.read()
      const templates: LockFile['templates'] = lockFile.templates || {}
      const cachedTemplates = new Map<string, Package>()
      Object.values(templates).forEach((tpl) => {
        cachedTemplates.set(makeUniqId(tpl), { ...tpl, cached: true })
      })

      // normalize preset template to Package
      const presets: LockFile['presets'] = lockFile.presets || {}
      let presetTemplates: Partial<Package>[] = compact(
        Object.keys(presets)
          .reduce((acc, cur) => {
            return acc.concat(
              presets[cur].templates.map((tpl) => ({
                ...tpl,
                preset: cur,
                pref: tpl.pref || tpl.name,
              })),
            )
          }, [] as Partial<Package>[])
          .map((tpl) => {
            const cachedTemplate = cachedTemplates.get(makeUniqId(tpl))
            if (cachedTemplate) {
              cachedTemplates.delete(makeUniqId(tpl))
              return { ...tpl, ...cachedTemplate, cached: true }
            }
            return { ...tpl, cached: false }
          }),
      )
      debug.lockfile('read templates with %O', presetNames)

      if (presetNames) {
        presetTemplates = presetTemplates.filter((tpl) => isMatchPreset(tpl.preset, presetNames))
        const counters = countby(presetTemplates, 'name')
        return presetTemplates.map((tpl) => {
          if (counters[tpl.name!] > 1) {
            return {
              ...tpl,
              name: makeUniqId(tpl),
            }
          }
          return tpl
        })
      }
      const allTemplates = presetTemplates.concat([...cachedTemplates.values()])
      const counters = countby(allTemplates, 'name')
      debug.lockfile('templates list %O', allTemplates)
      return allTemplates.map((tpl) => {
        if (counters[tpl.name!] > 1) {
          return {
            ...tpl,
            name: makeUniqId(tpl),
          }
        }
        return tpl
      })
    },
    /**
     * @description read `neo-lock` preset config files
     */
    async readConfigs({ presetNames }: { presetNames?: string[] } = {}) {
      const lockFile = await this.read()
      const presets: LockFile['presets'] = lockFile.presets || {}
      let configs = Object.keys(presets).reduce((acc, cur) => {
        // inject original preset
        const configs = presets[cur]?.configs || []
        return acc.concat(configs.map((config) => ({ ...config, preset: cur })))
      }, [] as Partial<Config & { preset: string }>[])
      if (presetNames) {
        configs = configs.filter((tpl) => isMatchPreset(tpl.preset, presetNames))
        return configs
      }
      return configs
    },
  }
}

const create = (params?: CommonOptions) => {
  if (lockFile) {
    return lockFile
  }
  return createLockFile({ lockFilePath: getLockFilePath(params?.storeDir) })
}

export default create
