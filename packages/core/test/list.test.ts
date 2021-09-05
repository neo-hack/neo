import execa from 'execa'

const cli = require.resolve('../lib/neo.js')

describe('command list', () => {
  it('should contain all templates listed in constants', async () => {
    const { stdout } = await execa('node', [cli].concat(['list']))
    expect(stdout).toMatchSnapshot()
  })
})
