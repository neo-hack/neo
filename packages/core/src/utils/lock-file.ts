import writeYamlFile from 'write-yaml-file'
import readYamlFile from 'read-yaml-file'
import path from 'path'
import fs from 'fs-extra'

import { LOCK_FILE, STORE_PATH } from './constants'
import { CommonOptions, LockFile, PresetPackage } from '../interface'
import { debugLogger } from './logger'

const getLockFilePath = (storeDir = STORE_PATH) => {
  return path.join(storeDir, LOCK_FILE)
}

let lockFile: ReturnType<typeof createLockFile>

export const createLockFile = ({ lockFilePath }: { lockFilePath: string }) => {
  return {
    getLockFilePath() {
      return lockFilePath
    },
    getTemplateId(name: string, version: string) {
      return `/${name}/${version}`
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
      debugLogger.lockfile(lockFilePath)
      debugLogger.lockfile('update preset %O', data)
      if (!lockfile.presets) {
        lockfile.presets = {}
      }
      lockfile.presets = { ...lockfile.presets, ...data }
      return this.write(lockfile)
    },
    async updateTemplates(data: any) {
      const lockfile: LockFile = await this.read()
      debugLogger.lockfile(lockFilePath)
      debugLogger.lockfile('update templates %O', data)
      if (!lockfile.templates) {
        lockfile.templates = {}
      }
      lockfile.templates = { ...lockfile.templates, ...data }
      return this.write(lockfile)
    },
    async readTemplates() {
      const lockFile = await this.read()
      const presets: LockFile['presets'] = lockFile.presets || {}
      // TODO: merge cached packages and preset packages
      const packages = Object.values(presets).reduce((acc, cur) => {
        return acc.concat(cur.templates)
      }, [] as PresetPackage[])
      return packages
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
