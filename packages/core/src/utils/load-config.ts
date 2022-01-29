import { cosmiconfig } from 'cosmiconfig'
import path from 'path'

import { AppConfig } from '../interface'
import { CONFIG_FILE } from './constants'

const app = cosmiconfig('neo')

/**
 * @description load local project config
 */
export const loadConfig = async (root: string = process.cwd()) => {
  const config = await app.load(path.join(root, CONFIG_FILE))
  return config?.config as AppConfig
}
