import path from 'node:path'

import fs from 'fs-extra'
import { countBy } from 'lodash-es'
import readYamlFile from 'read-yaml-file'
import { compare } from 'semver'
import writeYamlFile from 'write-yaml-file'

import { isMatchPreset, makeUniqId } from '../utils'
import { LOCK_FILE, STORE_PATH } from '../utils/constants'
import { debug } from '../utils/logger'

import type {
  CommonOptions,
  Config,
  LockFile,
  Package,
} from '../interface'

const getLockFilePath = (storeDir = STORE_PATH) => {
  return path.join(storeDir, LOCK_FILE)
}

// fix: https://github.com/neo-hack/neo/issues/371
const compareVersion = (v1?: string, v2?: string) => {
  if (!v1) {
    return 1
  }
  if (!v2) {
    return -1
  }
  return compare(v1, v2)
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
      const cachedTemplates = new Map<string, Partial<Package>>()
      // latest version should be last one
      Object.values(templates)
        .sort((a, b) => compareVersion(a.version, b.version))
        .forEach((tpl) => {
          cachedTemplates.set(makeUniqId(tpl), {
            ...tpl,
            pref: tpl.pref || tpl.name,
            _name: tpl.name,
            cached: true,
          })
        })

      // normalize preset template to Package
      const presets: LockFile['presets'] = lockFile.presets || {}
      const presetTemplates: Map<string, Partial<Package>> = new Map()
      Object.keys(presets)
        .reduce((acc, cur) => {
          return acc.concat(
            presets[cur].templates.map(tpl => ({
              ...tpl,
              preset: cur,
              _name: tpl.name,
              pref: tpl.pref || tpl.name,
            })),
          )
        }, [] as Partial<Package>[])
        .forEach((tpl) => {
          const cachedTemplate = cachedTemplates.get(makeUniqId(tpl))
          if (cachedTemplate) {
            cachedTemplates.delete(makeUniqId(tpl))
            presetTemplates.set(makeUniqId(tpl), { ...tpl, ...cachedTemplate, cached: true })
            return
          }
          presetTemplates.set(makeUniqId(tpl), { ...tpl, cached: false })
        })
      debug.lockfile('read templates with %O', presetNames)

      if (presetNames) {
        const filterTemplates = [...presetTemplates.values()].filter(tpl =>
          isMatchPreset(tpl.preset, presetNames),
        )
        const counters = countBy(filterTemplates, 'name')
        return filterTemplates.map((tpl) => {
          if (counters[tpl.name!] > 1) {
            return {
              ...tpl,
              name: makeUniqId(tpl),
            }
          }
          return tpl
        })
      }
      const allTemplates = [...presetTemplates.values(), ...cachedTemplates.values()]
      const counters = countBy(allTemplates, 'name')
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
        return acc.concat(configs.map(config => ({ ...config, preset: cur })))
      }, [] as Partial<Config & { preset: string }>[])
      if (presetNames) {
        configs = configs.filter(tpl => isMatchPreset(tpl.preset, presetNames))
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
