import pkg from '../package.json'
import { execNeo } from './helpers'

describe('command version', () => {
  it('print correct version', async () => {
    const { stdout } = await execNeo(['-v'])
    const version = stdout.split('\n').filter(line => !!line)[0]
    expect(version).toEqual(pkg.version)
  })
})
