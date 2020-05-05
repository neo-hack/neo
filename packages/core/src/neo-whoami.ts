import * as terminalImage from 'terminal-image'
import * as path from 'path'
;(async () => {
  console.log(await terminalImage.file(path.resolve(__dirname, './assets/neo.jpg')))
})()
