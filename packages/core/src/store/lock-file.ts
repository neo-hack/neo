import writeYamlFile from 'write-yaml-file'
import readYamlFile from 'read-yaml-file'
import path from 'path'
import fs from 'fs-extra'

import { LOCK_FILE, STORE_PATH } from '../utils/constants'
import { CommonOptions, LockFile, Package } from '../interface'
import { debugLogger } from '../utils/logger'

const getLockFilePath = (storeDir = STORE_PATH) => {
  return path.join(storeDir, LOCK_FILE)
}

let lockFile: ReturnType<typeof createLockFile>

const isCached = (cachedTemplates: Partial<Package>[], template: Partial<Package>) => {
  const { pref } = template
  return cachedTemplates.find((tpl) => {
    return tpl.pref === pref
  })
}

export const createLockFile = ({ lockFilePath }: { lockFilePath: string }) => {
  debugLogger.lockfile('lockfilepath at %s', lockFilePath)
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
      debugLogger.lockfile('update preset %O', data)
      if (!lockfile.presets) {
        lockfile.presets = {}
      }
      lockfile.presets = { ...lockfile.presets, ...data }
      return this.write(lockfile)
    },
    async updateTemplates(data: any) {
      const lockfile: LockFile = await this.read()
      debugLogger.lockfile('update templates %O', data)
      if (!lockfile.templates) {
        lockfile.templates = {}
      }
      lockfile.templates = { ...lockfile.templates, ...data }
      return this.write(lockfile)
    },
    async readTemplates({ presetNames }: { presetNames?: string[] } = {}): Promise<
      Partial<Package>[]
    > {
      const lockFile = await this.read()
      const templates: LockFile['templates'] = lockFile.templates || {}
      const cachedTemplates = Object.values(templates).map((tpl) => ({ ...tpl, cached: true }))

      const presets: LockFile['presets'] = lockFile.presets || {}
      let presetTemplates: Partial<Package>[] = Object.keys(presets)
        .reduce((acc, cur) => {
          return acc.concat(
            presets[cur].templates.map((tpl) => ({ ...tpl, preset: cur, pref: tpl.name })),
          )
        }, [] as Partial<Package>[])
        .map((tpl) => ({ ...tpl, cached: !!isCached(cachedTemplates, tpl) }))
      debugLogger.lockfile('read templates with %O', presetNames)

      if (presetNames) {
        presetTemplates = presetTemplates.filter(
          (tpl) => !tpl.preset || presetNames.includes(tpl.preset),
        )
        return presetTemplates
      }
      const allTemplates = presetTemplates.concat(cachedTemplates)
      debugLogger.lockfile('templates list %O', allTemplates)
      return allTemplates
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
