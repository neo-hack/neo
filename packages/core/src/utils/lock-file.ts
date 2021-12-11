import writeYamlFile from 'write-yaml-file'
import path from 'path'

import { LOCK_FILE, STORE_PATH } from './constants'

const lock = {
  write(data: any, lockFilePath = path.join(STORE_PATH, LOCK_FILE)) {
    console.log(lockFilePath)
    return writeYamlFile(lockFilePath, data)
  },
}

export default lock
