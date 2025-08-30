import fs from 'fs-extra'
import pc from 'picocolors'

import { STORE_PATH } from '../utils/constants'
import logger, { debug } from '../utils/logger'

export interface CleanupOptions {
  storeDir?: string
}

export const cleanup = async (params: CleanupOptions) => {
  debug.cleanup('cleanup options %O', params)
  const { storeDir = STORE_PATH } = params
  logger.success(pc.yellow(`Cleaning up store at ${pc.bold(storeDir)}`))
  fs.emptyDirSync(storeDir)
}
