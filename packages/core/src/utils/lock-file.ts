import writeYamlFile from 'write-yaml-file'

import { LOCK_FILE_PATH } from './constants'

const lock = {
  write(data: any) {
    return writeYamlFile(LOCK_FILE_PATH, data)
  },
}

export default lock
