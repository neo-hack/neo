import { r } from '../../src/utils'

import execa from 'execa'
const cli = r('lib/neo.js')

export const execNeo = (...args: any[]) => execa('node', [cli].concat(args || []))
