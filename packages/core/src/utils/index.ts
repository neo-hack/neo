import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import { findUp } from 'find-up'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const r = (pathname = '.') => path.resolve(__dirname, '..', '..', pathname)

export const isMonorepo = () => findUp('pnpm-workspace.yaml')
