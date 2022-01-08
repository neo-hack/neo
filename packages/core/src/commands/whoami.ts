import { getBanner, showFooter } from '../utils/show-brand'
import logger from '../utils/logger'

import pc from 'picocolors'

/**
 * @description display neo image on terminal
 */
export const whoami = () => {
  ;(async () => {
    logger.log(`${getBanner()}\n`)
    logger.log(pc.blue(' ⎯⎯'))
    showFooter()
  })()
}
