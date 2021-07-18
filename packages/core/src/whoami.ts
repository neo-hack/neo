import path from 'path'
import terminalImage from 'terminal-image'

/**
 * @description display neo image on terminal
 */
export const whoami = () => {
  ;(async () => {
    console.log(await terminalImage.file(path.resolve(__dirname, './assets/neo.jpg')))
  })()
}
