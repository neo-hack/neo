import { r } from './helpers'

import { execa } from 'execa'

describe('workflow.run', () => {
  it('run shell should work', async () => {
    const { stdout } = await execa('esmo', [r('test/fixtures/run/run.ts')])
    console.log(stdout)
    expect(stdout).toMatchSnapshot()
  })
})
