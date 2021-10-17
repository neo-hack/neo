import { fileURLToPath } from 'url'
import path, { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const r = (pathname: string) => path.resolve(__dirname, '..', '..', pathname)
