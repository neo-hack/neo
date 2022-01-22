import { fileURLToPath } from 'url'
import path, { dirname } from 'path'

export const __dirname = dirname(fileURLToPath(import.meta.url))

export const r = (pathname = '.') => path.resolve(__dirname, '..', '..', pathname)
