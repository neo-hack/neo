import { r } from '../helpers'

import { execa } from 'execa'

describe('workflow.run', () => {
  it('run shell should work', async () => {
    const { stdout } = await execa('esmrua', [r('test/run/run.ts'), 'main'])
    expect(stdout).toMatchSnapshot()
  })
})
