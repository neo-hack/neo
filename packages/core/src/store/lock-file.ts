import writeYamlFile from 'write-yaml-file'
import readYamlFile from 'read-yaml-file'
import path from 'path'
import fs from 'fs-extra'

import { LOCK_FILE, STORE_PATH } from '../utils/constants'
import { CommonOptions, LockFile, Package, PresetPackage } from '../interface'
import { debugLogger } from '../utils/logger'

const getLockFilePath = (storeDir = STORE_PATH) => {
  return path.join(storeDir, LOCK_FILE)
}

let lockFile: ReturnType<typeof createLockFile>

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
    async readTemplates(): Promise<Partial<Package>[]> {
      const lockFile = await this.read()
      const presets: LockFile['presets'] = lockFile.presets || {}
      const templates: LockFile['templates'] = lockFile.templates || {}
      const cachedTemplates = Object.values(templates)
      const presetTemplates = Object.values(presets).reduce((acc, cur) => {
        return acc.concat(cur.templates)
      }, [] as PresetPackage[])
      return presetTemplates.concat(cachedTemplates)
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