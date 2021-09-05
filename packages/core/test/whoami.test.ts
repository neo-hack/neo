import execa from 'execa'

const cli = require.resolve('../lib/neo.js')

describe('command whoami', () => {
  it('should print neo', async () => {
    const { stdout, stderr } = await execa('node', [cli].concat(['whoami']))
    expect(stderr).toBe('')
    expect(typeof stdout).toBe('string')
  })
})
