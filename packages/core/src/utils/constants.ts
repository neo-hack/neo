import { createRequire } from 'node:module'
import os from 'node:os'
import path, { dirname } from 'node:path'

const require = createRequire(import.meta.url)

const PKG_ROOT = dirname(require.resolve('@aiou/neo/package.json'))
export const STORE_PATH = path.join(os.homedir(), '.neo-store')
export const LOCK_FILE = 'neo-lock.yml'
export const CACHE_DIRNAME = '.cache'
export const NPM_REGISTRY = 'https://registry.npmjs.org/'
export const ASSETS_BANNER = path.join(PKG_ROOT, 'assets/neo.txt')
export const CONFIG_FILE = '.neorc'
export const HOMEPAGE = 'https://neo-docs.netlify.app'
