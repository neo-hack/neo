import fs from 'fs-extra'
import pc from 'picocolors'
import tl from 'terminal-link'

import { ASSETS_BANNER } from './constants'
import { r, readPkg } from './index'
import logger from './logger'

const banner = fs.readFileSync(r(ASSETS_BANNER)).toString()

export const getBanner = () => {
  return pc.green(banner)
}

export const showBanner = () => {
  console.log(getBanner())
}

export const showFooter = () => {
  const pkg = readPkg()
  const link = tl('Homepage', pkg?.homepage || '')
  logger.log(` ${link}`)
}
