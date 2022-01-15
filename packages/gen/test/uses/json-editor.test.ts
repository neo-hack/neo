import { r } from '../helpers'

import { execa } from 'execa'

describe('workflow.actions.jsoneditor', () => {
  it('jsoneditor action should work', async () => {
    const { stdout } = await execa('esmo', [r('test/fixtures/json-editor/json-editor.ts')])
    console.log(stdout)
  })
})
