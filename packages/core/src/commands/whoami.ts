import { showBanner, showFooter } from '../utils/show-brand'

import pc from 'picocolors'

/**
 * @description display neo image on terminal
 */
export const whoami = () => {
  ;(async () => {
    showBanner()
    console.log()
    console.log(pc.blue(' ⎯⎯'))
    showFooter()
  })()
}
