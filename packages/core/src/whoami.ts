import terminalImage from 'terminal-image'

import { r } from './utils'

/**
 * @description display neo image on terminal
 */
export const whoami = () => {
  ;(async () => {
    console.log(
      await terminalImage.file(r('assets/neo.jpg'), {
        width: '10%',
        height: '10%',
      }),
    )
  })()
}
