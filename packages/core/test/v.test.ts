import execa from 'execa'

import pkg from '../package.json'
import { r } from '../src/utils'

const cli = r('lib/neo.js')

describe('command version', () => {
  it('print correct version', async () => {
    const { stdout } = await execa('node', [cli].concat(['-V']))
    const version = stdout.split('\n').filter((line) => !!line)[0]
    expect(version).toEqual(pkg.version)
  })
})
