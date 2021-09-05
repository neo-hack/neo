import path, { dirname } from 'path'
import terminalImage from 'terminal-image'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * @description display neo image on terminal
 */
export const whoami = () => {
  ;(async () => {
    console.log(
      await terminalImage.file(path.resolve(__dirname, '../assets/neo.jpg'), {
        width: '10%',
        height: '10%',
      }),
    )
  })()
}
