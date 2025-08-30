import { execa } from 'execa'

import { r } from '../helpers'

describe('workflow.run', () => {
  it('run shell should work', async () => {
    const { stdout } = await execa('tsx', [r('test/run/run.ts')])
    console.log(stdout)
  })
})
