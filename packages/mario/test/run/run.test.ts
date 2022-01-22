import { r } from '../helpers'

import { execa } from 'execa'

describe('workflow.run', () => {
  it('run shell should work', async () => {
    const { stdout } = await execa('esmo', [r('test/run/run.ts')])
    expect(stdout).toMatchSnapshot()
  })
})
