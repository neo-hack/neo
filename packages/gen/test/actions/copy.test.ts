import { r } from '../helpers'

import { execa } from 'execa'

describe('workflow.actions.copy', () => {
  it('copy action should work', async () => {
    const { stdout } = await execa('esmo', [r('test/fixtures/copy/copy.ts')])
    console.log(stdout)
  })
})
