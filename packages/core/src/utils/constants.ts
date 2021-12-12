import os from 'os'
import path from 'path'

export const STORE_PATH = path.join(os.homedir(), '.neo-store')
export const LOCK_FILE = 'neo-lock.yml'
export const CACHE_DIRNAME = '.cache'
export const NPM_REGISTRY = 'https://registry.npmjs.org/'
