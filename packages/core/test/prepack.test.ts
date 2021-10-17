import execa from 'execa'
const cli = require.resolve('../lib/neo.js')

describe('command prepack', () => {
  it.todo('prepack single part should work')
  it('prepack should work', async () => {
    const { stdout, stderr } = await execa.node(cli, ['prepack'], { cwd: './fixtures/prepack' })
    expect(stderr).toBe('')
    expect(typeof stdout).toBe('string')
  })
})
