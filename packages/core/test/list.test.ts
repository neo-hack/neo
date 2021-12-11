import execa from 'execa'

import { r } from '../src/utils'

const cli = r('lib/neo.js')

describe('command list', () => {
  it('should contain all templates listed in constants', async () => {
    const { stdout } = await execa('node', [cli].concat(['list']))
    expect(stdout).toMatchSnapshot()
  })
  it.todo('list template from presets and packages')
})
