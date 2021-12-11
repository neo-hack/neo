import writeYamlFile from 'write-yaml-file'
import readYamlFile from 'read-yaml-file'
import path from 'path'
import fs from 'fs-extra'

import { LOCK_FILE, STORE_PATH } from './constants'
import { CommonOptions } from '../interface'
import { debugLogger } from './logger'

const getLockFilePath = (storeDir = STORE_PATH) => {
  return path.join(storeDir, LOCK_FILE)
}

let lockFile: ReturnType<typeof createLockFile>

type LockFile = {
  presets?: Record<string, { templates: string[] }>
}

const createLockFile = ({ storeDir = STORE_PATH }: CommonOptions) => {
  const lockFilePath = getLockFilePath(storeDir)
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
      debugLogger.lockfile(lockFilePath)
      debugLogger.lockfile('update preset %O', data)
      if (!lockfile.presets) {
        lockfile.presets = {}
      }
      lockfile.presets = { ...lockfile.presets, ...data }
      return this.write(lockfile)
    },
  }
}

const create = (params: CommonOptions) => {
  if (lockFile) {
    return lockFile
  }
  return createLockFile(params)
}

export default create
