import execa from 'execa'

import { r } from '../src/utils'

const cli = r('lib/neo.js')

describe('command whoami', () => {
  it('should print neo', async () => {
    const { stdout, stderr } = await execa('node', [cli].concat(['whoami']))
    expect(stderr).toBe('')
    expect(typeof stdout).toBe('string')
  })
})
