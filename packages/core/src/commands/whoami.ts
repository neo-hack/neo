import pc from 'picocolors'

import logger from '../utils/logger'
import { getBanner, showFooter } from '../utils/show-brand'

/**
 * @description display neo image on terminal
 */
export const whoami = () => {
  (async () => {
    logger.log(`${getBanner()}\n`)
    logger.log(pc.blue(' ⎯⎯'))
    showFooter()
  })()
}
