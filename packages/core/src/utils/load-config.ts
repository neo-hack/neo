import path from 'node:path'

import { cosmiconfig } from 'cosmiconfig'
import { existsSync } from 'fs-extra'

import { CONFIG_FILE } from './constants'

import type { AppConfig } from '../interface'

const app = cosmiconfig('neo')

/**
 * @description load local project config
 */
export const loadConfig = async (root: string = process.cwd()) => {
  if (!existsSync(path.join(root, CONFIG_FILE))) {
    return undefined
  }
  const config = await app.load(path.join(root, CONFIG_FILE))
  return config?.config as AppConfig
}
