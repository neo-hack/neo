import os from 'node:os'
import path from 'node:path'

export const STORE_PATH = path.join(os.homedir(), '.neo-store')
export const LOCK_FILE = 'neo-lock.yml'
export const CACHE_DIRNAME = '.cache'
export const NPM_REGISTRY = 'https://registry.npmjs.org/'
export const ASSETS_BANNER = 'assets/neo.txt'
export const CONFIG_FILE = '.neorc'
export const HOMEPAGE = 'https://neo-docs.netlify.app'
