import { r } from '../helpers'

import { execa } from 'execa'

describe('workflow.actions.replace', () => {
  it('replace action should work', async () => {
    const { stdout } = await execa('esmo', [r('test/fixtures/replace/replace.ts')])
    console.log(stdout)
  })
})
