import { r } from '../helpers'

import { execa } from 'execa'

describe('workflow.actions.clean', () => {
  it('clean action should work', async () => {
    const { stdout } = await execa('esmo', [r('test/fixtures/clean/clean.ts')])
    console.log(stdout)
  })
})
