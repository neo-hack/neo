import fs from 'fs-extra'
import pc from 'picocolors'
import tl from 'terminal-link'

import { ASSETS_BANNER, HOMEPAGE } from './constants'
import { r } from './index'
import logger from './logger'

const banner = fs.readFileSync(r(ASSETS_BANNER)).toString()

export const getBanner = () => {
  return pc.green(banner)
}

export const showFooter = () => {
  const link = tl('Homepage', HOMEPAGE)
  logger.log(` ${link}`)
}
