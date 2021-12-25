import fs from 'fs-extra'
import pc from 'picocolors'

import { r } from './index'

const banner = fs.readFileSync(r('assets/neo.txt')).toString()

export const showBanner = () => {
  console.log(pc.green(banner))
}
